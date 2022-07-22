/**
 * @created by 冉珣 on 2021-10-11 11:38:38
 * @updated by
 * @description 理财管户
 */
define(function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        console.log(hashCode);
        yufp.lookup.reg('ASSIGN,ASSIGN_CODE');
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
                    newseqno: '',
                    newapplyId: '',
                    tgapplyid: '',
                    isseqno: '',
                    mgrType: 1,
                    searchForm: {
                        searchKeywords: ''
                    },
                    baseParams: {},
                    orgIdAuth: '',
                    hashCode: hashCode,
                    hashCodeMap: {
                        'ebfd8bb813044c899408f2aaeafe638d': '理财管户分配',
                        '6b7158cc8e7144b4ac065eef1b9a9ff0': '理财管户调整',
                        'ca9f398ebbd247a0a76904d0979cda89': '理财管户托管',
                        '71149efec0b84c5fbbb9ebce4ec12808': '个贷管户分配',
                        '3caecf1c12a346729b6cdddfe228fbbc': '个贷管户调整',
                        'f48d3dad6bc04026ab35324e7145c08a': '个贷管户托管'
                    },
                    urlMap: {
                        // 理财
                        'ebfd8bb813044c899408f2aaeafe638d': '/api/ocrmfciadmitbelong/qrybelonglist', // 分配
                        '6b7158cc8e7144b4ac065eef1b9a9ff0': '/api/ocrmfciadmitbelong/qrybelonglist', // 调整
                        'ca9f398ebbd247a0a76904d0979cda89': '/api/trusteeship/mycustlist', // 托管
                        // 个贷
                        '71149efec0b84c5fbbb9ebce4ec12808': '/api/ocrmfciadmitbelong/qrybelonglist', // 分配
                        '3caecf1c12a346729b6cdddfe228fbbc': '/api/ocrmfciadmitbelong/qrybelonglist', // 调整
                        'f48d3dad6bc04026ab35324e7145c08a': '/api/trusteeship/mycustlist' // 托管
                    },
                    historyUrlMap: {
                        // 理财
                        'ebfd8bb813044c899408f2aaeafe638d': '/api/ocrmfciadmitbelong/qrybelonghis', // 分配
                        '6b7158cc8e7144b4ac065eef1b9a9ff0': '/api/ocrmfciadmitbelong/qrybelonghis', // 调整
                        'ca9f398ebbd247a0a76904d0979cda89': '/api/trusteeship/list', // 托管
                        // 个贷
                        '71149efec0b84c5fbbb9ebce4ec12808': '/api/ocrmfciadmitbelong/qrybelonghis', // 分配
                        '3caecf1c12a346729b6cdddfe228fbbc': '/api/ocrmfciadmitbelong/qrybelonghis', // 调整
                        'f48d3dad6bc04026ab35324e7145c08a': '/api/trusteeship/list' // 托管
                    },
                    titleViews: {
                        'distribute': '客户分配',
                        'justify': '客户调整',
                        'hosting': '客户托管'
                    },
                    titleType: 'distribute',
                    optionDialogVisible: false,
                    optionForm: {},
                    historyDialogVisible: false,
                    historyUrl: '',
                    historyBaseParam: {},
                    tagTypes: {
                        '02': 'primary',
                        '': 'warning',
                        '01': 'danger'
                    },
                    assignTypes: [],
                    mgrId: '',
                    mgrName: '',
                    instanceId: '',
                    orgId: '',
                    orgName: '',
                    custId: '',
                    custName: '',
                    trustStat: '', // 托管状态
                    wfCommonParams: {
                        sessionInstuCde: yufp.session.instu.code,
                        sessionOrgCode: yufp.session.org.code,
                        sessionLoginCode: yufp.session.user.loginCode
                    },
                    isTeam: '',
                    selectRoleCode: selectRoleCode,
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                        }
                    },
                    pltz: false,
                    justifyall: false
                };
            },
            created: function() {
                var _this = this;
                _this.mgrType = this.hashCodeMap[this.hashCode].indexOf('理财') != -1 ? 1 : 2;
                let orgCode = yufp.sessionStorage.get('YUFP-SESSION-USER');
                _this.orgIdAuth = JSON.parse(orgCode).org.code || JSON.parse(orgCode).org.id || '';
                // _this.$nextTick(function() {
                //     _this.getTableList();
                // })
                yufp.service.request({
                    method: 'GET',
                    url: '/api/ocrmfciadmitbelong/isatTeam',
                    callback: function(code, message, response) {
                        if (code == 0 && response.code === 0) {
                            _this.isTeam = response.data;
                        }
                    }
                });
            },
            mounted: function() {
                this.assignTypes = yufp.lookup.find('ASSIGN', false);
            },
            methods: {
                // 撤回
                withdrawfn: function(val, type) {
                    var _this = this;
                    if (val.assignUserId != yufp.session.userId && type == undefined) {
                        _this.$message.warning('您不是上一节点办理人，不可进行撤回操作');
                        return;
                    }
                    params = {
                        'instanceId': val.instanceid
                    }
                    this.$confirm('如果当前流程存在多条客户信息将全部执行，确定要执行撤回操作吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(function() {
                        _this.$refs.yufpWfInit.withdraw(params);
                    })
                },
                /**
                 * 日期格式化
                 */
                dateFormatter: function(row, column, cellValue) {
                    var datetime = cellValue;
                    if (!datetime) {
                        return '';
                    }
                    return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
                },
                getTableList: function(obj) {
                    var name = this.hashCodeMap[this.hashCode];
                    var params = {
                        mgrType: this.mgrType,
                        orgIdAuth: this.orgIdAuth
                    };
                    if (obj) {
                        for (var key in obj) {
                            if (key !== 'searchKeywords') {
                                params[key] = obj[key];
                            }
                        }
                    }
                    if (name.indexOf('托管') == -1) {
                        params.assignType = name.indexOf('分配') != -1 ? '01' : '02';
                        this.titleType = name.indexOf('分配') != -1 ? 'distribute' : 'justify';
                        this.baseParams = { condition: JSON.stringify(params) };
                        this.$refs.listTable.remoteData(this.baseParams);
                    } else {
                        this.titleType = 'hosting';
                        this.baseParams = { condition: JSON.stringify(params) };
                        this.$refs.listTable.remoteData(this.baseParams);
                    }
                },
                // 分配调整状态改变
                stutasChange: function(val) {
                    this.searchForm.assignStatus = val;
                    this.getTableList(this.searchForm);
                },
                // 托管状态改变
                tgstutasChange: function(val) {
                    this.searchForm.trustStat = val;
                    this.getTableList(this.searchForm);
                },
                /**
                 * 客户经理选择筛选
                 */
                mgrSelectFnToSearch: function(val) {
                    this.searchForm.mgrName = val[0].userName;
                    this.getTableList(this.searchForm);
                },
                resetFn: function() {
                    var selDom = this.$refs.mgrSel.$children[0].$children[0];
                    selDom.selectedVal = '';
                    this.searchForm.mgrId = '';
                    this.searchForm.mgrName = '';
                    this.getTableList(this.searchForm);
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
                    var _this = this;
                    _this.$nextTick(function() {
                        _this.$refs.refDialogForm.resetFields();
                        _this.optionDialogVisible = false;
                    });
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
                optionFn: function(type, val) {
                    this.titleType = type;
                    this.justifyall = false;
                    if (val) {
                        if (val.applyId && val.applyId.length != 0 && val.trustStat != '04') {
                            this.tgapplyid = val.applyId;
                        }
                        if (val.seqno && val.seqno.length && val.assignStatus != '04') {
                            this.isseqno = val.seqno;
                        }
                        this.instanceId = '';
                        // if (val.instanceid && val.instanceid.length != 0 && val.trustStat != '04') {
                        //     this.instanceId = val.instanceid;
                        // }
                        // if (val.instanceid && val.instanceid.length && val.assignStatus != '04') {
                        //     this.instanceId = val.instanceid;
                        // }
                        // this.instanceId = val.instanceid;
                        this.mgrId = val.mgrId;
                        this.mgrName = val.mgrName;
                        this.orgId = val.orgId;
                        this.orgName = val.orgName;
                        this.custId = val.custId;
                        this.custName = val.custName;
                        this.trustStat = val.trustStat;
                        this.optionDialogVisible = true;
                        this.$nextTick(function() {
                            this.clearObj(this.optionForm);
                            this.$refs.refDialogForm.resetFields();
                            this.optionForm.trustMgrName = val.trustmgrname;
                            this.optionForm.trustMgrId = val.trustmgrid || '';
                            this.optionForm.trustOrgId = val.trustorgid || '';
                            this.optionForm.trustOrgName = val.trustorgname || '';
                            if (type === 'hosting') {
                                this.optionForm.changeReason = val.trustReason;
                                this.optionForm.deadLine = val.deadline;
                            } else {
                                this.optionForm.changeReason = val.changeReason;
                            }
                        })
                    } else {
                        var selections = this.$refs.listTable.selections;
                        var justifyselections = this.$refs.listTable.tabledata;
                        var approvalselections = false;
                        if (!justifyselections.length) { //调整没有数据
                            this.$message.warning('没有数据可以调整');
                            return;
                        } else if (justifyselections.length && !selections.length) { //调整全部
                            if (type === 'hosting') {
                                for (let i = 0; i < justifyselections.length; i++) {
                                    if (justifyselections[i].assignStatus == '02') {
                                        approvalselections = true;
                                    }
                                }
                            } else {
                                for (let i = 0; i < justifyselections.length; i++) {
                                    if (justifyselections[i].trustStat == '02') {
                                        approvalselections = true;
                                    }
                                }
                            }
                            if (approvalselections) {
                                this.$message.warning('当前流程中存在审批中的流程');
                                return;
                            } else {
                                selections = justifyselections;
                                this.justifyall = true;
                            }
                        }
                        if (type === 'distribute' && !this.canBeAllocated(selections)) {
                            this.$message.warning('有不能分配的选项，请重新选择');
                            return;
                        }
                        if (type === 'justify' && !this.canBeAdjusted(selections)) {
                            this.$message.warning('有不能调整的选项，请重新选择');
                            return;
                        }
                        if (type === 'hosting' && !this.canBeHosting(selections)) {
                            this.$message.warning('有不能托管的选项，请重新选择');
                            return;
                        }
                        // var ableflag = false;
                        if (selections.length > 1) {
                            // if (type === 'distribute' || type === 'justify') {
                            //     var selectionsfirst = selections[0].seqno;
                            //     for (let i = 1; i < selections.length; i++) {
                            //         if (selectionsfirst != selections[i].seqno) {
                            //             ableflag = true;
                            //         }
                            //     }
                            // }
                            // if (type === 'hosting') {
                            //     var selectionstg = selections[0].applyId;
                            //     for (let i = 1; i < selections.length; i++) {
                            //         if (selectionstg != selections[i].applyId) {
                            //             ableflag = true;
                            //         }
                            //     }
                            // }
                            // if (ableflag) {
                            //     this.$message.warning('不同流程，不能同时一条流程提交');
                            //     return
                            // } else {
                            // var val = selections[0];
                            if (type === 'hosting') {
                                // this.tgapplyid = selections[0].applyId || '';
                                this.tgapplyid = '';
                                for (let i = 0; i < selections.length; i++) {
                                    if (selections[i].applyId != '' && selections[i].applyId != undefined) {
                                        if (this.tgapplyid.length > 0) {
                                            this.tgapplyid = this.tgapplyid + ',' + selections[i].applyId;
                                        } else {
                                            this.tgapplyid += selections[i].applyId;
                                        }

                                    }
                                }
                            } else {
                                // this.isseqno = selections[0].seqno || '';
                                this.isseqno = '';
                                for (let i = 0; i < selections.length; i++) {
                                    if (selections[i].seqno != '' && selections[i].seqno != undefined) {
                                        if (this.isseqno.length > 0) {
                                            this.isseqno = this.isseqno + ',' + selections[i].seqno;
                                        } else {
                                            this.isseqno += selections[i].seqno;
                                        }
                                    }
                                }
                            }
                            this.instanceId = '';
                            this.$nextTick(function() {
                                    this.clearObj(this.optionForm);
                                    this.$refs.refDialogForm.resetFields();
                                    this.optionForm.trustMgrName = val.trustmgrname || '';
                                    this.optionForm.trustMgrId = val.trustmgrid || '';
                                    this.optionForm.trustOrgId = val.trustorgid || '';
                                    this.optionForm.trustOrgName = val.trustorgname || '';
                                    if (type === 'hosting') {
                                        this.optionForm.changeReason = val.trustReason;
                                        this.optionForm.deadLine = val.deadline;
                                    } else {
                                        this.optionForm.changeReason = val.changeReason;
                                    }
                                })
                                // }
                        } else {
                            var val = selections[0];
                            this.tgapplyid = '';
                            this.isseqno = '';
                            if (type === 'hosting') {
                                this.tgapplyid = selections[0].applyId || '';
                            } else {
                                this.isseqno = selections[0].seqno || '';
                            }
                            this.instanceId = '';
                            this.$nextTick(function() {
                                this.clearObj(this.optionForm);
                                this.$refs.refDialogForm.resetFields();
                                this.optionForm.trustMgrName = val.trustmgrname;
                                this.optionForm.trustMgrId = val.trustmgrid || '';
                                this.optionForm.trustOrgId = val.trustorgid || '';
                                this.optionForm.trustOrgName = val.trustorgname || '';
                                if (type === 'hosting') {
                                    this.optionForm.changeReason = val.trustReason;
                                    this.optionForm.deadLine = val.deadline;
                                } else {
                                    this.optionForm.changeReason = val.changeReason;
                                }
                            })
                        }
                        var ids = [];
                        var names = [];
                        var mgrIds = [];
                        var mgrNames = [];
                        for (var i = 0; i < selections.length; i++) {
                            ids.push(selections[i].custId);
                            names.push(selections[i].custName);
                            mgrIds.push(selections[i].mgrId);
                            mgrNames.push(selections[i].mgrName);
                        }
                        // 调整全部
                        if (this.justifyall && this.searchForm.mgrId) {
                            this.mgrId = this.searchForm.mgrId;
                            this.mgrName = this.searchForm.mgrName;
                        } else if (this.justifyall && !this.searchForm.mgrId) {
                            this.mgrId = '';
                            this.mgrName = '';
                        } else {
                            this.mgrId = mgrIds.join();
                            this.mgrName = mgrNames.join();
                        }
                        if (this.justifyall) {
                            this.custId = '';
                            this.custName = '';
                        } else {
                            this.custId = ids.join();
                            this.custName = names.join();
                        }
                        // this.mgrName = mgrNames.join();
                        // this.custId = ids.join();
                        // this.custName = names.join();
                        this.trustStat = selections[0].trustStat;
                        this.optionDialogVisible = true;
                    }
                },
                canBeAllocated: function(list) {
                    var flag = true;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].assignStatus === '02') { // 如果分配状态不为未分配
                            flag = false;
                        }
                    }
                    return flag;
                },
                canBeAdjusted: function(list) {
                    var flag = true;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].assignStatus === '02') { // 如果状态为待分配则不可以调整
                            flag = false;
                        }
                    }
                    return flag;
                },
                canBeHosting: function(list) {
                    var flag = true;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].trustStat === '02') { // 如果状态为不能托管
                            flag = false;
                        }
                    }
                    return flag;
                },
                /**
                 * 选择客户经理后处理其返回值
                 */
                mgrSelectFnChange: function(val) {
                    var obj = val[0];
                    this.optionForm.trustMgrId = obj.userId;
                    this.optionForm.trustOrgId = obj.orgId;
                    this.optionForm.trustOrgName = obj.orgName;
                    this.optionForm.trustMgrName = obj.userName;
                },
                /**
                 * 提交
                 */
                confirmFn: function(type) {
                    $("#saveqd").addClass("yu-disable");
                    // setTimeout(function() {
                    //     $("#saveqd").removeClass("yu-disable");
                    // }, 3000);
                    var roles = yufp.session.roles;
                    var roleCodes = '';
                    for (let index = 0; index < roles.length; index++) {
                        const element = roles[index];
                        roleCodes += element.code;
                    }
                    var flagzh;
                    if (type === 'distribute' || type === 'justify') {
                        flagzh = (roleCodes.indexOf('R016') != -1 || roleCodes.indexOf('R015') != -1);
                    } else {
                        flagzh = (roleCodes.indexOf('R017') != -1);
                    }
                    if (flagzh) {
                        this.submitCommonFn(type, '04');
                    } else {
                        this.submitCommonFn(type, '02');
                    }
                },
                /**
                 * 保存
                 */
                saveFn: function(type) {
                    $("#savebc").addClass("yu-disable");
                    setTimeout(function() {
                        $("#savebc").removeClass("yu-disable");
                    }, 3000);
                    this.submitCommonFn(type, '01');
                },
                /**
                 * @param optionType 分配/调整/托管
                 * @param buttonType 按钮类型:保存/提交
                 */
                submitCommonFn: function(optionType, buttonType) {
                    var _this = this;
                    _this.$refs.refDialogForm.validate(function(valid) {
                        if (valid) {
                            var form = {};
                            yufp.extend(form, _this.optionForm);
                            // if (_this.trustStat == '03') {// 驳回
                            //     form.instanceId = _this.instanceId;
                            // }
                            form.instanceId = _this.instanceId;
                            form.mgrId = _this.mgrId;
                            form.mgrName = _this.mgrName;
                            form.orgId = _this.orgId;
                            form.orgName = _this.orgName;
                            form.custId = _this.custId;
                            form.custName = _this.custName;
                            form.mgrType = _this.mgrType;
                            form.toWfInit = buttonType;
                            // 分配、调整
                            if (optionType === 'distribute' || optionType === 'justify') {
                                if (buttonType == '04') {
                                    form.assignStatus = buttonType;
                                } else {
                                    form.assignStatus = _this.optionForm.assignStatus;
                                }
                            } else {
                                // 托管 01保存，02提交
                                if (buttonType == '04') {
                                    form.trustStat = buttonType;
                                } else {
                                    form.trustStat = _this.optionForm.trustStat;
                                }
                                form.trustReason = _this.optionForm.changeReason;
                            }
                            _this[optionType + 'Fn'](form);
                        } else {
                            $("#saveqd").removeClass("yu-disable");
                        }
                    });
                },
                /**
                 * 外面直接提交
                 */
                // submittableFn: function(optionType, val) { // val为当前行数据
                //     var _this = this;
                //     var buttonType = '02';
                //     var form = {};
                //     yufp.extend(form, _this.optionForm);
                //     form.custId = _this.custId || val.custId;
                //     form.custName = _this.custName || val.custName;
                //     form.mgrType = _this.mgrType || val.mgrType;
                //     form.toWfInit = buttonType;
                //     form.seqno = val.seqno;
                //     form.assignStatus = '02';
                //     form.assignType = '01';
                //     // 分配、调整
                //     if (optionType === 'distribute' || optionType === 'justify') {
                //         if (buttonType == '04') {
                //             form.assignStatus = buttonType;
                //         } else {
                //             form.assignStatus = _this.optionForm.assignStatus;
                //         }
                //     } else {
                //         // 托管 01保存，02提交
                //         if (buttonType == '04') {
                //             form.trustStat = buttonType;
                //         } else {
                //             form.trustStat = _this.optionForm.trustStat;
                //         }
                //         form.trustReason = _this.optionForm.changeReason;
                //     }
                //     _this[optionType + 'Fn'](form);
                // },
                /**
                 * 客户分配
                 */
                distributeFn: function(params) {
                    this.postData('01', params);
                },
                /**
                 * 客户调整
                 */
                justifyFn: function(params) {
                    this.postData('02', params);
                },
                // 确定提交 （分配/调整）
                postData: function(type, params) {
                    var _this = this;
                    // if (this.isseqno == null || this.isseqno.length == 0) {
                    //     _this.isseqno = String(new Date().getTime()); // 随机时间戳
                    // }
                    this.newseqno = String(new Date().getTime());
                    params.assignType = type;
                    params.seqno = _this.isseqno;
                    params.newseqno = _this.newseqno;
                    if (_this.justifyall) {
                        params.seqno = '';
                    }
                    if (_this.justifyall) {
                        _this.pltz = true;
                        params.assignStatus = _this.searchForm.assignStatus;
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/ocrmfciadmitbelong/savebelong',
                        data: params,
                        timeout: 3000000,
                        callback: function(code, message, response) {
                            if (code === 0 && response.code === 0) {
                                _this.pltz = false;
                                _this.$message.success('操作成功');
                                $("#saveqd").removeClass("yu-disable");
                                if (params.toWfInit == '02') {
                                    var commitData = {};
                                    commitData.instanceId = params.instanceId || ''; // 关联业务编号
                                    commitData.bizSeqNo = _this.newseqno; // 关联业务编号
                                    commitData.applType = type == '01' ? 'WFMCD' : 'WFMCC'; // 工作报告审批流程
                                    commitData.custName = yufp.session.userName; // 展示主题名称
                                    commitData.custId = yufp.session.userId;
                                    commitData.paramMap = {
                                        selectRole: _this.selectRoleCode, // 当前用户角色
                                        atTeam: _this.isTeam // 当前属于哪个团队
                                    };
                                    // 申请上架
                                    var load = _this.$loading();
                                    if (commitData.instanceId && commitData.instanceId.length != 0) {
                                        _this.$refs.yufpWfInit.wfSave(commitData, load);
                                    } else {
                                        _this.$refs.yufpWfInit.wfInit(commitData, load);
                                    }
                                    _this.isseqno = '';
                                    _this.newseqno = '';
                                }
                                _this.$refs.listTable.remoteData(_this.baseParams);
                                _this.optionDialogVisible = false;
                            } else {
                                $("#saveqd").removeClass("yu-disable");
                                _this.isseqno = '';
                                _this.newseqno = '';
                                _this.$refs.listTable.remoteData(_this.baseParams);
                            }
                        }
                    });
                },
                /**
                 * 客户托管
                 */
                hostingFn: function(params) { // trustStat传入是02就是提交
                    var _this = this;
                    _this.newapplyId = String(new Date().getTime());
                    // params.deadLine = params.deadLine.toJSON() || '';
                    params.deadLine = params.deadLine || '';
                    params.mgrId = yufp.session.userId;
                    params.mgrName = yufp.session.userName;
                    // if (_this.tgapplyid.length != 0) {
                    //     params.applyId = _this.tgapplyid;
                    // }
                    params.applyId = _this.tgapplyid;
                    params.newapplyId = _this.newapplyId;
                    if (_this.justifyall) {
                        params.assignStatus = _this.searchForm.trustStat;
                    }
                    // 向后台发送保存请求
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/trusteeship/add',
                        timeout: 3000000,
                        data: params,
                        callback: function(code, message, response) {
                            if (code == 0 && response.code === 0) {
                                _this.$refs.listTable.remoteData();
                                _this.$message('托管成功');
                                $("#saveqd").removeClass("yu-disable");
                                // _this.tgapplyid = response.data;
                                if (params.toWfInit == '02') { // 02走审批 ，01不走审批
                                    var commitData = {};
                                    commitData.instanceId = params.instanceId || ''; // 关联业务编号
                                    commitData.bizSeqNo = _this.newapplyId; // 关联业务编号
                                    commitData.applType = 'WFCH'; // 工作报告审批流程
                                    commitData.custName = yufp.session.userName; // 展示主题名称
                                    commitData.custId = yufp.session.userId;
                                    commitData.paramMap = {
                                        selectRole: _this.selectRoleCode, // 当前用户角色
                                        atTeam: _this.isTeam // 当前所属团队
                                    };
                                    // 申请上架
                                    var load = _this.$loading();
                                    if (commitData.instanceId && commitData.instanceId.length != 0) {
                                        _this.$refs.yufpWfInit.wfSave(commitData, load);
                                    } else {
                                        _this.$refs.yufpWfInit.wfInit(commitData, load);
                                    }
                                    _this.tgapplyid = '';
                                    _this.newapplyId = '';
                                }
                                _this.optionDialogVisible = false;
                            } else {
                                $("#saveqd").removeClass("yu-disable");
                                _this.tgapplyid = '';
                                _this.newapplyId = '';
                                _this.$refs.listTable.remoteData();
                                _this.$message.error('托管失败');
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
                    var _this = this;
                    _this.$refs.listTable.remoteData();
                },
                handleHistoryClose: function() {
                    this.historyDialogVisible = false;
                },
                custHistory: function(val) {
                    var _this = this;
                    _this.historyDialogVisible = true;
                    _this.custName = val.custName;
                    _this.custId = val.custId;
                    var params = {
                        mgrType: _this.mgrType,
                        custId: val.custId
                    };
                    if (_this.titleType === 'distribute' || _this.titleType === 'justify') {
                        params.assignType = _this.titleType === 'distribute' ? '01' : '02';
                        params.seqno = val.seqno || '';
                    } else {
                        params.applyNo = val.applyNo;
                        params.applyId = val.applyId || '';
                    }
                    _this.$nextTick(function() {
                        _this.$refs.historyListTable.remoteData({ condition: JSON.stringify(params) });
                    });
                }
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