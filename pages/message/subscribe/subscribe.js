define(function(require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('CHANNEL_TYPE');
        yufp.custom.vue({
            el: '#templateSubscribe',
            data: function() {
                var me = this;
                return {
                    height: yufp.custom.viewSize().height,
                    messageType: '',
                    channelType: '',
                    subscribeType: '',
                    subscribeTypeMap: {
                        O: '机构',
                        U: '用户',
                        G: '岗位',
                        R: '角色'
                    },
                    channelTypes: [],
                    channelTypeMap: {
                        system: '系统消息',
                        mobile: '短信',
                        email: '邮件'
                    },
                    dialogVisible: false,
                    urls: {
                        dataUrl: backend.messageService + '/api/template/getChannelSubscribeList/',
                        saveSubscribeUrl: backend.messageService + '/api/template/saveSubscribe/',
                        getSubscribeUrl: backend.messageService + '/api/template/getSubscribe/',
                        userUrl: backend.messageService + '/api/template/selectAllUser/'
                    },
                    tableColumns: [
                        { label: '消息类型', prop: 'messageType', resizable: true },
                        { label: '描述', prop: 'messageDesc', resizable: true },
                        { label: '渠道类型', prop: 'channelType', resizable: true }
                    ],
                    queryButtons: [{
                            label: '搜索',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            show: true,
                            click: function(model, valid) {
                                if (valid) {
                                    var param = {
                                        condition: JSON.stringify(model)
                                    };
                                    me.$refs.templateSubscribeTable.remoteData(param);
                                }
                            }
                        },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
                    ],
                    queryFields: [
                        { placeholder: '消息类型', field: 'messageType', type: 'input' },
                        { placeholder: '描述', field: 'messageDesc', type: 'input' }
                    ],
                    activeFlag: '',
                    mainGrid_first: {
                        height: 270,
                        checkbox: true,
                        dataUrl: backend.messageService + '/api/template/selectAllUser/',
                        tableColumns: [
                            { label: '用户码', prop: 'userNo', resizable: true, width: 290 },
                            { label: '用户名', prop: 'userName', resizable: true, width: 280 }
                        ]
                    },
                    mainGrid_role: {
                        height: 270,
                        checkbox: true,
                        dataUrl: backend.messageService + '/api/template/selectAllRole/',
                        tableColumns: [
                            { label: '角色ID', prop: 'roleId', resizable: true, width: 210 },
                            { label: '角色码', prop: 'roleCode', resizable: true, width: 80 },
                            { label: '角色名称', prop: 'roleName', resizable: true, width: 200 },
                            { label: '所属机构', prop: 'orgId', resizable: true, width: 80 }
                        ]
                    },
                    mainGrid_post: {
                        height: 270,
                        checkbox: true,
                        dataUrl: backend.messageService + '/api/template/selectAllDuty/',
                        tableColumns: [
                            { label: '岗位ID', prop: 'dutyId', resizable: true, width: 210 },
                            { label: '岗位码', prop: 'dutyCde', resizable: true, width: 80 },
                            { label: '岗位名称', prop: 'dutyName', resizable: true, width: 200 },
                            { label: '所属机构', prop: 'belongOrgId', resizable: true, width: 80 }
                        ]
                    },
                    mainGrid_fifth: {
                        Relationship: ''
                    },
                    orgUrl: backend.messageService + '/api/template/selectAllOrg/',
                    orgRootId: yufp.session.org.code, // 根据节点ID,
                    param: {}
                };
            },
            methods: {
                userSubscribe: function() {
                    var em = this;
                    var row = this.$refs.templateSubscribeTable.selections;
                    if (row.length != 1) {
                        this.$message({ message: '请选择一条数据', type: 'warning' });
                        return;
                    }
                    if (this.$refs.templateSubscribeTable.selections[0].channelType == '') {
                        this.$message({ message: '未配置模板，无法订阅', type: 'warning' });
                        return;
                    }
                    this.messageType = this.$refs.templateSubscribeTable.selections[0].messageType;
                    this.channelTypes = this.$refs.templateSubscribeTable.selections[0].channelType.split(',');
                    this.activeFlag = 'first';
                    this.dialogVisible = true;
                    this.$nextTick(function() {
                        em.$refs.userTable.remoteData();
                        em.$refs.dutyTable.remoteData();
                        em.$refs.roleTable.remoteData();
                        em.$refs.orgUsertree.remoteData();
                    });
                },
                handleClick: function(tab, event) {
                    var rows = this.$refs.templateSubscribeTable.selections;
                    var em = this;
                    console.info(this.channelType);

                    if (tab.name === 'first') {
                        var comitData = { messageType: this.messageType, channelType: this.channelType, subscribeType: 'U' };
                        yufp.service.request({
                            method: 'POST',
                            url: this.urls.getSubscribeUrl,
                            data: comitData,
                            callback: function(code, message, response) {
                                var infos = response.data.split(',');
                                em.$refs.userTable.clearSelection();
                                for (var i = 0; i < infos.length; i++) {
                                    em.$refs.userTable.data.filter(function(item) {
                                        if (item.userNo === infos[i]) {
                                            em.$refs.userTable.toggleRowSelection(item, true);
                                        }
                                    });
                                }
                                yufp.util.butLogInfo(hashCode, '消息订阅', '保存(用户)');
                            }
                        });
                    } else if (tab.name === 'second') {
                        var comitData = { messageType: this.messageType, channelType: this.channelType, subscribeType: 'G' };
                        yufp.service.request({
                            method: 'POST',
                            url: this.urls.getSubscribeUrl,
                            data: comitData,
                            callback: function(code, message, response) {
                                var infos = response.data.split(',');
                                em.$refs.dutyTable.clearSelection();
                                for (var i = 0; i < infos.length; i++) {
                                    em.$refs.dutyTable.data.filter(function(item) {
                                        if (item.dutyId === infos[i]) {
                                            em.$refs.dutyTable.toggleRowSelection(item, true);
                                        }
                                    });
                                }
                                yufp.util.butLogInfo(hashCode, '消息订阅', '保存(岗位)');
                            }
                        });
                    } else if (tab.name === 'third') {
                        var comitData = { messageType: this.messageType, channelType: this.channelType, subscribeType: 'R' };
                        yufp.service.request({
                            method: 'POST',
                            url: this.urls.getSubscribeUrl,
                            data: comitData,
                            callback: function(code, message, response) {
                                var infos = response.data.split(',');
                                em.$refs.roleTable.clearSelection();
                                for (var i = 0; i < infos.length; i++) {
                                    em.$refs.roleTable.data.filter(function(item) {
                                        if (item.roleId === infos[i]) {
                                            em.$refs.roleTable.toggleRowSelection(item, true);
                                        }
                                    });
                                }
                                yufp.util.butLogInfo(hashCode, '消息订阅', '保存(角色)');
                            }
                        });
                    } else if (tab.name === 'fourth') {
                        var comitData = { messageType: this.messageType, channelType: this.channelType, subscribeType: 'O' };
                        yufp.service.request({
                            method: 'POST',
                            url: this.urls.getSubscribeUrl,
                            data: comitData,
                            callback: function(code, message, response) {
                                var infos = response.data.split(',');
                                var keys = [];
                                for (var i = 0; i < infos.length; i++) {
                                    keys.push(infos[i]);
                                }
                                em.$refs.orgUsertree.setCheckedKeys(keys);
                                yufp.util.butLogInfo(hashCode, '消息订阅', '保存(机构)');
                            }
                        });
                    } else if (tab.name === 'fifth') {
                        var comitData = { messageType: this.messageType, channelType: this.channelType, subscribeType: 'X' };
                        yufp.service.request({
                            method: 'POST',
                            url: this.urls.getSubscribeUrl,
                            data: comitData,
                            callback: function(code, message, response) {
                                var infos = response.data.split(',');
                                var keys = [];
                                for (var i = 0; i < infos.length; i++) {
                                    keys.push(infos[i]);
                                }
                                em.mainGrid_fifth.Relationship = keys[0];
                                yufp.util.butLogInfo(hashCode, '消息订阅', '保存(关系)');
                            }
                        });
                    }
                },
                saveSubscribe: function(subscribeType, subscribeValue) {
                    var me = this;
                    if (me.channelType == '') {
                        me.$message({ message: '选择渠道类型', type: 'error' });
                        return;
                    }
                    var comitData = { messageType: this.messageType, channelType: this.channelType, subscribeType: subscribeType, subscribeValue: subscribeValue };
                    var saveUrl = me.urls.saveSubscribeUrl;
                    yufp.service.request({
                        url: saveUrl,
                        data: comitData,
                        method: 'POST',
                        callback: function(code, message, response) {
                            if (response.data == 0) {
                                // me.dialogVisible = false;
                                me.$message({ message: '成功', type: 'success' });
                                yufp.util.butLogInfo(hashCode, '消息订阅', '消息订阅');
                            } else {
                                me.$message({ message: '失败', type: 'error' });
                            }
                        }
                    });
                },
                saveUserSubscribe: function() {
                    var users = '';
                    if (this.$refs.userTable.selections.length >= 1) {
                        for (var i = 0; i < this.$refs.userTable.selections.length; i++) {
                            users = users + this.$refs.userTable.selections[i].userNo + ',';
                        }
                    }
                    this.saveSubscribe('U', users);
                },
                saveOrgSubscribe: function() {
                    var checks = this.$refs.orgUsertree.getCheckedKeys();
                    var orgs = '';
                    for (var i = 0; i < checks.length; i++) {
                        orgs = orgs + checks[i] + ',';
                    }
                    this.saveSubscribe('O', orgs);
                },
                saveRoleSubscribe: function() {
                    var roles = '';
                    if (this.$refs.roleTable.selections.length >= 1) {
                        for (var i = 0; i < this.$refs.roleTable.selections.length; i++) {
                            roles = roles + this.$refs.roleTable.selections[i].roleId + ',';
                        }
                    }
                    this.saveSubscribe('R', roles);
                },
                saveDutySubscribe: function() {
                    var dutys = '';
                    if (this.$refs.dutyTable.selections.length >= 1) {
                        for (var i = 0; i < this.$refs.dutyTable.selections.length; i++) {
                            dutys = dutys + this.$refs.dutyTable.selections[i].dutyId + ',';
                        }
                    }
                    this.saveSubscribe('G', dutys);
                },
                saveRelationshipSubscribe: function() {
                    var relationship = this.mainGrid_fifth.Relationship;
                    this.saveSubscribe('X', relationship);
                }
            }
        });
    };

    // 消息处理
    exports.onmessage = function(type, message) {

    };

    // page销毁时触发destroy方法
    exports.destroy = function(id, cite) {

    };
});