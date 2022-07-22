/**
 * @created by 冉珣 on 2021-10-18 13:59:05
 * @updated by
 * @description 客户分层
 */
define(function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('ASSIGN,CUST_GRADE');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                var roles = yufp.session.roles;
                var selectRoleId = yufp.sessionStorage.get('selectRole');
                var selectRoleCode = '';
                var selectRoleName = '';
                for (let index = 0; index < roles.length; index++) {
                    const element = roles[index];
                    if (element.id == selectRoleId) {
                        selectRoleCode = element.code;
                        selectRoleName = element.name;
                    }
                };
                return {
                    isseqno: '',
                    instanceId: '',
                    status: '',
                    dataUrl: '/api/ocrmfciadmitbelong/qrybelonglist',
                    baseParams: {},
                    optionDialogVisible: false,
                    orgIdAuth: '',
                    searchForm: {
                        searchKeywords: ''
                    },
                    optionForm: {},
                    custId: '',
                    befModGrade: '',
                    wfCommonParams: {
                        sessionInstuCde: yufp.session.instu.code,
                        sessionOrgCode: yufp.session.org.code,
                        sessionLoginCode: yufp.session.user.loginCode
                    },
                    isTeam: '',
                    selectRoleCode: selectRoleCode
                };
            },
            created: function() {
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
                                _this.orgIdAuth = response.data.orgIdAuth;
                                // _this.getTableList();
                            }
                        } else {
                            _this.$message.error('查询失败');
                        }
                    }
                });
                yufp.service.request({
                    method: 'GET',
                    url: '/api/ocrmfciadmitbelong/isatTeam',
                    callback: function(code, message, response) {
                        if (code == 0 && response.code === 0) {
                            _this.isTeam = response.data;
                        }
                    }
                })
            },
            methods: {


                // 撤回
                withdrawfn: function(instanceId) {
                    var _this = this;
                    params = {
                        'instanceId': instanceId
                    }
                    this.$confirm('确定要执行撤回操作吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(function() {
                        _this.$refs.yufpWfInit.withdraw(params);
                        yufp.util.butLogInfo(hashCode, '客户分层', '撤回');
                    })
                },
                getTableList: function(obj) {
                    var params = {
                        orgIdAuth: this.orgIdAuth,
                        assignType: '02'
                    };
                    if (obj) {
                        for (var key in obj) {
                            if (key !== 'searchKeywords') {
                                params[key] = obj[key];
                            }
                        }
                    }
                    this.baseParams = { condition: JSON.stringify(params) };
                    this.$refs.listTable.remoteData(this.baseParams);
                },
                searchListCust: function() {
                    var obj = {};
                    yufp.extend(obj, this.searchForm);
                    let value = obj.searchKeywords + ''.replace('/(^\s*)|(\s*$)', ''); // 去除字符串前后空格
                    let num = Number(value); // 将字符串转换为数字
                    if (isNaN(num) || value === '' || value === null) {
                        obj.characterCode = obj.searchKeywords;
                    } else {
                        obj.figureCode = obj.searchKeywords;
                    }
                    this.getTableList(obj);
                },
                toCust360View: function(data) {
                    var _this = this;
                    yufp.util.valid2jump(data.custId, function(val) {
                        if (val) {
                            var customKey = 'custom_view' + data.custId; // 请以custom_view前缀开头，并且全局唯一
                            yufp.frame.addTab({
                                id: 'customer360View', // 菜单功能ID（路由ID）
                                key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                                title: '客户360视图:' + data.custName, // 页签名称
                                data: {
                                    cust: data,
                                    custId: data.custId,
                                    custName: data.custName
                                } // 传递的业务数据，可选配置
                            });
                        } else {
                            _this.$message.warning('该客户不能查看客户360视图');
                        }
                    });
                },
                handleOptionClose: function() {
                    this.optionDialogVisible = false;
                },
                clearObj: function(obj) {
                    for (var key in obj) {
                        obj[key] = null;
                    }
                    return obj;
                },
                /**
                 * @param type 操作类型 {distribute, hosting, justify}
                 * @param val 传递的数据，若无：则为执行批量操作
                 */
                optionFn: function(val) {
                    var _this = this;
                    if (val.id == null || val.id.length == 0 || val.status == '04') {
                        _this.isseqno = String(new Date().getTime()); // 随机时间戳
                    } else {
                        _this.isseqno = val.id;
                    }
                    this.instanceId = '';
                    if (val.gradeinstanceid && val.gradeinstanceid.length != 0 && val.status != '04') {
                        this.instanceId = val.gradeinstanceid;
                    }
                    this.status = val.status;
                    this.custId = val.custId;
                    this.befModGrade = val.aumGrade;
                    this.optionDialogVisible = true;
                    this.$nextTick(function() {
                        // this.clearObj(this.searchForm); // 搜索框内容不清空
                        // this.$refs.refSearchForm.resetFields();
                        // 回显的时候判断当前的值
                        switch (val.aumGrade) {
                            case 1:
                                this.optionForm.aftModGrade = '一般客户'
                                break;
                            case 2:
                                this.optionForm.aftModGrade = '有效客户'
                                break;
                            case 3:
                                this.optionForm.aftModGrade = '优慧客户'
                                break;
                            case 4:
                                this.optionForm.aftModGrade = '显卓客户'
                                break;
                            case 5:
                                this.optionForm.aftModGrade = '私行客户'
                                break;
                            case 6:
                                this.optionForm.aftModGrade = '显卓钻石客户'
                                break;
                        }
                    })

                    // this.optionForm.aftModGrade = val.aumGrade;
                },
                /**
                 * 提交
                 */
                confirmFn: function() {
                    $("#confirmqd").addClass("yu-disable");
                    setTimeout(function() {
                        $("#confirmqd").removeClass("yu-disable");
                    }, 3000);
                    if (!this.optionForm.aftModGrade){
                        this.$message.warning('请选择一条数据');
                        return
                    }
                    // this.postData('02');
                    var roles = yufp.session.roles;
                    var roleCodes = '';
                    for (let index = 0; index < roles.length; index++) {
                        const element = roles[index];
                        roleCodes += element.code;
                    }
                    var flagzh = (roleCodes.indexOf('R016') != -1 || roleCodes.indexOf('R015') != -1);
                    if (flagzh) {
                        this.postData('04');
                    } else {
                        this.postData('02');
                    }
                },
                /**
                 * 保存
                 */
                saveFn: function() {
                    $("#savebc").addClass("yu-disable");
                    setTimeout(function() {
                        $("#savebc").removeClass("yu-disable");
                    }, 3000);
                    if (!this.optionForm.aftModGrade){
                        this.$message.warning('请选择一条数据');
                        return
                    }
                    this.postData('01');
                },

                postData: function(type) {
                    var _this = this;
                    var params = {};
                    if (typeof(_this.optionForm.aftModGrade) == 'string') {
                        switch (_this.optionForm.aftModGrade) {
                            case '一般客户':
                                this.optionForm.aftModGrade = '1'
                                break;
                            case '有效客户':
                                this.optionForm.aftModGrade = '2'
                                break;
                            case '优慧客户':
                                this.optionForm.aftModGrade = '3'
                                break;
                            case '显卓客户':
                                this.optionForm.aftModGrade = '4'
                                break;
                            case '私行客户':
                                this.optionForm.aftModGrade = '5'
                                break;
                            case '显卓钻石客户':
                                this.optionForm.aftModGrade = '6'
                                break;
                        }
                    }
                    yufp.extend(params, _this.optionForm);
                    // if (_this.status == '03') {
                    //     params.instanceId = _this.instanceId;
                    // }
                    params.instanceId = _this.instanceId;
                    params.custId = _this.custId;
                    params.befModGrade = this.befModGrade;
                    params.status = type;
                    params.id = _this.isseqno;
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/ocrmfciadmitbelong/updateaumGrade',
                        data: params,
                        callback: function(code, message, response) {
                            if (code === 0 && response.code === 0) {
                                // 在确定事件中再执行组件提交方法
                                if (type == '02') {
                                    var commitData = {};
                                    commitData.instanceId = _this.instanceId;
                                    commitData.bizSeqNo = _this.isseqno; // 关联业务编号
                                    commitData.applType = 'WFCLA'; // 工作报告审批流程
                                    commitData.custName = yufp.session.userName; // 展示主题名称
                                    commitData.custId = yufp.session.userId;
                                    commitData.paramMap = {
                                        selectRole: _this.selectRoleCode, // 当前用户角色
                                        atItem: _this.isTeam // 当前属于哪个团队
                                    };
                                    // 申请上架
                                    var load = _this.$loading();
                                    if (commitData.instanceId && commitData.instanceId.length != 0) {
                                        _this.$refs.yufpWfInit.wfSave(commitData, load);
                                    } else {
                                        _this.$refs.yufpWfInit.wfInit(commitData, load);
                                    }
                                    _this.optionDialogVisible = false;
                                    yufp.util.butLogInfo(hashCode, '客户分层', '提交');
                                } else {
                                    yufp.util.butLogInfo(hashCode, '客户分层', '保存');
                                }
                                _this.$message.success('操作成功');
                                _this.$refs.listTable.remoteData(_this.baseParams);
                                _this.optionDialogVisible = false;
                            } else {
                                _this.$refs.listTable.remoteData(_this.baseParams);

                            }
                        }
                    });
                },
                onAfterInit: function(data) {},
                // 审批页面关闭后
                onAfterClose: function() {
                    var _this = this;
                    _this.$refs.listTable.remoteData();
                },
                refreshfn: function() {
                    this.$refs.listTable.remoteData();
                },
            }
        });
    };

    /**
     * 页面传递消息处理
     * @param type 消息类型
     * @param message 消息内容
     */
    exports.onmessage = function(type, message) {};

    /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
    exports.destroy = function(id, cite) {};
});