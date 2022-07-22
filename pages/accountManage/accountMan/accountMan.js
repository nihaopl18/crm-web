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
        yufp.lookup.reg('ASSIGN');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    mgrType: 1,
                    searchForm: {
                        searchKeywords: ''
                    },
                    baseParams: {},
                    orgIdAuth: '',
                    hashCode: hashCode,
                    hashCodeMap: {
                        'cc1a8b5006db41b090e698061dba18f3': '理财管户分配',
                        '6b7158cc8e7144b4ac065eef1b9a9ff0': '理财管户调整',
                        'ca9f398ebbd247a0a76904d0979cda89': '理财管户托管',
                        '71149efec0b84c5fbbb9ebce4ec12808': '个贷管户分配',
                        '3caecf1c12a346729b6cdddfe228fbbc': '个贷管户调整',
                        'f48d3dad6bc04026ab35324e7145c08a': '个贷管户托管'
                    },
                    urlMap: {
                        // 理财
                        'cc1a8b5006db41b090e698061dba18f3': '/api/ocrmfciadmitbelong/qrybelonglist',
                        '6b7158cc8e7144b4ac065eef1b9a9ff0': '/api/ocrmfciadmitbelong/qrybelonglist',
                        'ca9f398ebbd247a0a76904d0979cda89': '/api/trusteeship/mycustlist',
                        // 个贷
                        '71149efec0b84c5fbbb9ebce4ec12808': '/api/ocrmfciadmitbelong/qrybelonglist',
                        '3caecf1c12a346729b6cdddfe228fbbc': '/api/ocrmfciadmitbelong/qrybelonglist',
                        'f48d3dad6bc04026ab35324e7145c08a': '/api/trusteeship/mycustlist'
                    },
                    historyUrlMap: {
                        // 理财
                        'cc1a8b5006db41b090e698061dba18f3': '/api/ocrmfciadmitbelong/qrybelonghis',
                        '6b7158cc8e7144b4ac065eef1b9a9ff0': '/api/ocrmfciadmitbelong/qrybelonghis',
                        'ca9f398ebbd247a0a76904d0979cda89': '/api/trusteeship/custtrustlist',
                        // 个贷
                        '71149efec0b84c5fbbb9ebce4ec12808': '/api/ocrmfciadmitbelong/qrybelonghis',
                        '3caecf1c12a346729b6cdddfe228fbbc': '/api/ocrmfciadmitbelong/qrybelonghis',
                        'f48d3dad6bc04026ab35324e7145c08a': '/api/trusteeship/custtrustlist'
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
                    custId: '',
                    custName: '',
                    trustStat: '' // 托管状态
                };
            },
            created: function() {
                var _this = this;
                _this.mgrType = this.hashCodeMap[this.hashCode].indexOf('理财') != -1 ? 1 : 2;
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
                                _this.getTableList();
                            }
                        } else {
                            _this.$message.error('查询失败');
                        }
                    }
                });
            },
            mounted: function() {
                this.assignTypes = yufp.lookup.find('ASSIGN', false);
            },
            methods: {
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
                /**
                 * 客户经理选择筛选
                 */
                mgrSelectFn: function(val) {
                    this.searchForm.mgrId = val.userId;
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
                    this.optionDialogVisible = false;
                },
                /**
                 * @param type 操作类型 {distribute, hosting, justify}
                 * @param val 传递的数据，若无：则为执行批量操作
                 */
                optionFn: function(type, val) {
                    this.titleType = type;
                    if (val) {
                        this.custId = val.custId;
                        this.custName = val.custName;
                        this.trustStat = val.trustStat;
                        this.optionDialogVisible = true;
                    } else {
                        var selections = this.$refs.listTable.selections;
                        if (!selections.length) {
                            this.$message.warning('请至少选择一条数据');
                            return;
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
                        var ids = [],
                            names = [];
                        for (var i = 0; i < selections.length; i++) {
                            ids.push(selections[i].custId);
                            names.push(selections[i].custName);
                        }
                        this.custId = ids.join();
                        this.custName = names.join();
                        this.trustStat = selections[0].trustStat;
                        this.optionDialogVisible = true;
                    }
                },
                canBeAllocated: function(list) {
                    var flag = true;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].custAssignStat) { // 如果分配状态不为未分配
                            flag = false;
                        }
                    }
                    return flag;
                },
                canBeAdjusted: function(list) {
                    var flag = true;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].custAssignStat) { // 如果状态为待分配则不可以调整
                            flag = false;
                        }
                    }
                    return flag;
                },
                canBeHosting: function(list) {
                    var flag = true;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].trustStutas) { // 如果状态为不能托管
                            flag = false;
                        }
                    }
                    return flag;
                },
                mgrSelectFnChange: function(val) {
                    this.optionForm.trustMgrId = val.userId;
                    this.optionForm.trustOrgId = val.orgId;
                    this.optionForm.trustOrgName = val.orgName;
                },
                /**
                 * 提交
                 */
                confirmFn: function(type) {
                    this.submitCommonFn(type, '02');
                },
                /**
                 * 保存
                 */
                saveFn: function(type) {
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
                            form.custId = _this.custId;
                            form.mgrType = _this.mgrType;
                            form.trustMgrId = _this.trustMgrId;
                            form.trustMgrName = _this.trustMgrName;
                            if (optionType === 'distribute' || optionType === 'justify') {
                                form.assignStatus = buttonType;
                            } else {
                                form.trustStat = buttonType;
                            }
                            _this[optionType + 'Fn'](form);
                        }
                    });
                },
                /**
                 * 客户分配
                 */
                distributeFn: function(params) {
                    this.postData('01', params);
                },
                /**
                 * 客户调整
                 */
                justifyFn: function() {
                    this.postData('02', params);
                },
                postData: function(type, params) {
                    var _this = this;
                    params.assignType = type;
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/ocrmfciadmitbelong/savebelong',
                        data: params,
                        callback: function(code, message, response) {
                            if (code === 0 && response.code === 0) {
                                _this.$message.success('操作成功');
                                _this.$refs.listTable.remoteData(_this.baseParams);
                            }
                        }
                    });
                },
                /**
                 * 客户托管
                 */
                hostingFn: function(params) {
                    var _this = this;
                    params.deadLine = params.deadLine.toJSON();
                    params.mgrId = yufp.session.userId;
                    params.mgrName = yufp.session.userName;
                    // 向后台发送保存请求
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/trusteeship/add',
                        data: params,
                        callback: function(code, message, response) {
                            if (code == 0 && response.code === 0) {
                                _this.$refs.listTable.remoteData();
                                _this.$message('托管成功');
                                _this.optionDialogVisible = false;
                            } else {
                                _this.$message.error('托管失败');
                            }
                        }
                    });
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
                    } else {
                        params.applyNo = val.applyNo;
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