/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2019-1-17 10:17:00.
 * @updated by
 * @description 客户流失预警
 */
define([
    './custom/widgets/js/yufpGovernedCustSelector.js',
    './custom/plugins/yufp.watermark.js'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('CD0016,CD0336,CD0238,CD0448,CD0449');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    modifyButton: !yufp.session.checkCtrl('modify'),
                    viewButton: !yufp.session.checkCtrl('view'),
                    dataUrl: backend.custlosswarnService + '/api/infocustlosswarn/querylist',
                    selectCustParams: { // 客户 放大镜 参数
                        user: {
                            dataParams: {
                                belongOrg: yufp.session.org.code,
                                belongMgr: yufp.session.user.loginCode
                            },
                            checkbox: false // 是否支持多选
                        }
                    },
                    listdata: [{}],
                    formdata: {},
                    rule: {
                        ifDetention: [
                            { required: true, message: '字段不能为空', trigger: 'blur' }
                        ],
                        detentionResult: [
                            { max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }
                        ]
                    },
                    dialogVisible: false,
                    formDisabled: false,
                    isCorType: false, // 判断选中的数据是否对公客户类型
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    saveBtnShow: true,
                    // 查询表单数据
                    queryFormdata: {}
                };
            },
            mounted: function() {
                var _this = this;
                yufp.service.request({
                    method: 'GET',
                    url: backend.custpubService + '/api/governedcust/getbusitype',
                    data: {
                        condition: JSON.stringify({ userId: yufp.session.userId })
                    },
                    callback: function(code, message, response) {
                        if (code == 0 && response.code === 0) {
                            if (response.data) {
                                var data = response.data;
                                // _this.parambusiType = data.busiType;
                                // _this.paramorgIdAuth = data.orgIdAuth;
                                if (data.userCustType == '2') {
                                    _this.queryFormdata.custType = '2';
                                    _this.queryFormdata.isAdmitEnter = '1';
                                } else {
                                    _this.queryFormdata.custType = '1';
                                    _this.queryFormdata.isAdmitEnter = '1';
                                };
                            }
                        } else {
                            _this.$message.error('查询失败');
                        }
                    }
                });
            },
            methods: {
                searchFn: function() {
                    var _this = this;
                    var validate = false;
                    _this.url = '';
                    _this.$refs.custSearchForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    // var ld1 = _this.$loading({
                    //   target: '.div1',
                    //   body: true,
                    //   text: '拼命加载中'
                    // });
                    var model = {};
                    yufp.clone(_this.queryFormdata, model);
                    // model.userId = yufp.session.userId;
                    // model.orgCode = yufp.session.org.code;
                    // model.orgId = _this.paramOrgId;
                    // 条线
                    // model.busiType = _this.parambusiType;
                    // 授权机构
                    // model.orgIdAuth = _this.paramorgIdAuth;
                    var param = {
                        condition: JSON.stringify(model)
                    };
                    // _this.$nextTick(function () {
                    this.$refs.refTable.remoteData(param);
                    // ld1.close();
                    // });
                },
                resetMainFn: function() {
                    this.$refs.custSearchForm.resetFields();
                },
                // 清空obj对象 -- common
                clearObj: function(obj) {
                    for (var key in obj) {
                        obj[key] = null;
                    }
                    return obj;
                },
                /**
                 * 取消
                 */
                cancelFn: function() {
                    var _this = this;
                    _this.dialogVisible = false;
                },
                /**
                 * 保存
                 */
                saveFn: function() {
                    var _this = this;
                    var model = {};
                    model.lossId = _this.formdata.lossId;
                    // yufp.clone(_this.formdata, model);
                    var validate = false;
                    _this.$refs.refForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    model.ifDetention = _this.formdata.ifDetention;
                    model.detentionResult = _this.formdata.detentionResult;
                    var updateUrlTemp = '';
                    if (_this.formdata.custType == '1') { // 个人客户
                        updateUrlTemp = '/api/infocustlosswarn/updateperresult';
                    } else if (_this.formdata.custType == '2') { // 对公客户
                        updateUrlTemp = '/api/infocustlosswarn/updatecorresult';
                    }
                    if (updateUrlTemp == '') {
                        _this.$message({ message: '所选数据客户类型有误，请重新选择', type: 'warning' });
                        return;
                    }
                    // 向后台发送保存请求
                    yufp.service.request({
                        method: 'POST',
                        url: backend.custlosswarnService + updateUrlTemp,
                        data: model,
                        callback: function(code, message, response) {
                            _this.$refs.refTable.remoteData();
                            _this.$message('操作成功');
                            _this.dialogVisible = false;
                            yufp.util.butLogInfo(hashCode, '客户流失预警', '维护挽留结果');
                        }
                    });
                },
                /**
                 * 控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function(viewType, editable) {
                    var _this = this;
                    _this.viewType = viewType;
                    _this.saveBtnShow = editable;
                    _this.dialogVisible = true;
                    _this.formDisabled = !editable;
                },
                /**
                 * 维护挽留结果
                 */
                modifyFn: function() {
                    var _this = this;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.switchStatus('EDIT', true);
                    _this.$nextTick(function() {
                        _this.clearObj(_this.formdata);
                        _this.$refs.refForm.resetFields();
                        var obj = _this.$refs.refTable.selections[0];
                        yufp.clone(obj, _this.formdata);
                    });
                },
                /**
                 * 详情
                 */
                infoFn: function() {
                    var _this = this;
                    var selectionsAry = _this.$refs.refTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.infoComFn(selectionsAry[0]);
                },
                /**
                 * 列表双击事件
                 */
                tableDbClick: function(row) {
                    if (!row) {
                        return;
                    }
                    this.infoComFn(row);
                },
                /**
                 * 详情展示 - 公共方法
                 */
                infoComFn: function(obj) {
                    var _this = this;
                    if (!obj.lossId || !obj.custType) {
                        _this.$message({ message: '数据无效，请重新选择', type: 'warning' });
                        return;
                    }
                    if (obj.custType == '1') { // 个人客户
                        _this.isCorType = false;
                    } else if (obj.custType == '2') { // 对公客户
                        _this.isCorType = true;
                    } else {
                        _this.isCorType = false;
                    }
                    _this.switchStatus('DETAIL', false);
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        yufp.service.request({
                            method: 'GET',
                            url: backend.custlosswarnService + '/api/infocustlosswarn/querydetail',
                            data: {
                                custType: obj.custType,
                                lossId: obj.lossId
                            },
                            callback: function(code, message, response) {
                                if (response.code == 0) {
                                    yufp.clone(response.data, _this.formdata);
                                }
                            }
                        });
                    });
                }
            }
        });
    };
});