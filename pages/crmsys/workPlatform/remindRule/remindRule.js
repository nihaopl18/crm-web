/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2019-2-18 15:30:14.
 * @updated by
 * @description 提醒规则设计
 */
define([
    './custom/widgets/js/yufpRoleSelector.js',
    './custom/widgets/js/yufpOrgTree.js'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,CD0238,CD0016,CD0032');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    curTypeId: '',
                    curTypeName: '',
                    custTypeOptions: [{
                        key: '1',
                        value: '个人客户'
                    }, {
                        key: '2',
                        value: '对公客户'
                    }, {
                        key: '3',
                        value: '全部'
                    }],
                    typeTreeParams: {
                        placeholder: '所属类别',
                        dataUrl: backend.remindService + '/api/inforeminderrule/querytree',
                        dataId: 'typeId',
                        dataLabel: 'typeName',
                        dataPid: 'upTypeId'
                    },
                    rule: {
                        requireRule: [
                            { required: true, message: '字段不能为空', trigger: 'change' }
                        ],
                        messageModel: [
                            { required: true, message: '字段不能为空', trigger: 'blur' },
                            { max: 300, message: '最大长度不超过300个字符', trigger: 'blur' }
                        ],
                        remindModel: [
                            { required: true, message: '字段不能为空', trigger: 'blur' },
                            { max: 300, message: '最大长度不超过300个字符', trigger: 'blur' }
                        ],
                        checkNum: [
                            { validator: yufp.validator.number, message: '输入整数', trigger: 'blur' }
                        ],
                        checkDigit: [
                            { validator: yufp.validator.digit, message: '输入小数', trigger: 'blur' }
                        ]
                    },
                    treeUrl: backend.remindService + '/api/inforeminderrule/querytree',
                    dataUrl: backend.remindService + '/api/inforeminderrule/querylist',
                    saveBtnShow: true,
                    cancelBtnShow: true,
                    formdata: {},
                    height: yufp.frame.size().height,
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    isSendMes: false, // 是否需要发短信
                    isPer: false,
                    isCor: false
                };
            },
            methods: {
                custTypeChgFn: function(val) {
                    if (val == '1') {
                        this.isPer = true;
                        this.isCor = false;
                    } else if (val == '2') {
                        this.isPer = false;
                        this.isCor = true;
                    } else if (val == '3') {
                        this.isPer = true;
                        this.isCor = true;
                    }
                },
                isSendChgFn: function(val) {
                    if (val == '1') {
                        this.isSendMes = true;
                    } else {
                        this.isSendMes = false;
                    }
                },
                // 刷新table数据 -- common
                refreshTable: function(typeId) {
                    var conditionKey = this.$refs.refTable.$props.conditionKey;
                    var qParam = {};
                    qParam[conditionKey] = { typeId: typeId };
                    this.$refs.refTable.queryParam = qParam;
                    this.$refs.refTable.remoteData();
                },
                // 清空obj对象 -- common
                clearObj: function(obj) {
                    for (var key in obj) {
                        obj[key] = null;
                    }
                    return obj;
                },
                /**
                 * 角色放大镜 回调
                 */
                rolSelFn: function(data) {
                    if (!data || data.length != 1) {
                        return;
                    }
                    this.formdata.receRoleId = data[0].roleCode;
                    this.formdata.receRoleName = data[0].roleName;
                },
                /**
                 * 机构下拉树 回调
                 */
                orgSelFn: function(data) {
                    if (!data || data.orgName == null || data.orgName == '') {
                        return;
                    }
                    this.formdata.adjustOrgName = data.orgName;
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
                    yufp.clone(_this.formdata, model);
                    var validate = false;
                    _this.$refs.refForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    if (!model.ruleId) {
                        // 生成 创建人id  创建人机构id 创建日期
                        model.createUser = yufp.session.user.loginCode;
                        model.createOrg = yufp.session.org.code;
                        // model.createDate = new Date();
                        // 新增请求
                        yufp.service.request({
                            method: 'POST',
                            url: backend.remindService + '/api/inforeminderrule/insert',
                            data: model,
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    _this.refreshTable(_this.curTypeId);
                                    _this.$message('操作成功');
                                    _this.dialogVisible = false;
                                    yufp.util.butLogInfo(hashCode, '提醒规则设计', '新增');
                                }
                            }
                        });
                    } else {
                        // 生成 修改人id 修改人机构id 修改日期
                        model.updateUser = yufp.session.user.loginCode;
                        model.updateOrg = yufp.session.org.code;
                        // 修改请求
                        yufp.service.request({
                            method: 'POST',
                            url: backend.remindService + '/api/inforeminderrule/update',
                            data: model,
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    _this.refreshTable(_this.curTypeId);
                                    _this.$message('操作成功');
                                    _this.dialogVisible = false;
                                    yufp.util.butLogInfo(hashCode, '提醒规则设计', '修改');
                                }
                            }
                        });
                    }
                },
                /**
                 * 控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function(viewType, editable) {
                    var _this = this;
                    _this.viewType = viewType;
                    _this.dialogVisible = true;
                    _this.formDisabled = !editable;
                    _this.saveBtnShow = editable;
                    _this.cancelBtnShow = editable;
                },
                nodeClickFn: function(nodeData, node, self) {
                    if (nodeData.id != 'R01') {
                        this.curTypeId = nodeData.id;
                        this.curTypeName = nodeData.label;
                        this.refreshTable(this.curTypeId);
                    }
                },
                /**
                 * 新增
                 */
                addFn: function() {
                    var _this = this;
                    var tableDatas = _this.$refs.refTable.tabledata;
                    if (tableDatas != null && tableDatas != undefined && tableDatas.length > 0) {
                        //说明提醒规则已经存在一条
                        _this.$message('已经存在提醒规则，不能新增');
                        return;
                    }
                    _this.switchStatus('ADD', true);
                    _this.$nextTick(function() {
                        _this.clearObj(_this.formdata);
                        _this.$refs.refForm.resetFields();
                        _this.formdata.typeId = _this.curTypeId;
                        _this.formdata.typeName = _this.curTypeName;
                    });
                },
                /**
                 * 修改
                 */
                modifyFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (selections[0].createUser != yufp.session.user.loginCode) {
                        _this.$message({ message: '只能修改自己创建的数据', type: 'warning' });
                        return;
                    }
                    _this.switchStatus('EDIT', true);
                    _this.$nextTick(function() {
                        _this.clearObj(_this.formdata);
                        _this.$refs.refForm.resetFields();
                        yufp.clone(selections[0], _this.formdata);
                    });
                },
                /**
                 * 详情
                 */
                infoFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.switchStatus('DETAIL', false);
                    _this.$nextTick(function() {
                        _this.clearObj(_this.formdata);
                        _this.$refs.refForm.resetFields();
                        yufp.clone(selections[0], _this.formdata);
                    });
                }
            }
        });
    };
});