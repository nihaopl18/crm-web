define(function(require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('WF_APP_STATUS');
        var lastUserName = '';
        yufp.custom.vue({
            el: '#endWorkList',
            data: function() {
                var me = this;
                return {
                    urls: {
                        dataUrl: backend.echainService + '/api/remindinfo/getUserEnds'
                            // 列表数据查询
                    },
                    endListButtons: [{
                            label: '查询',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            show: true,
                            click: function(model, valid) {
                                if (valid) {
                                    model.sessionLoginCode = yufp.session.user.loginCode;
                                    var param = {
                                        condition: JSON.stringify(model)
                                    };
                                    me.$refs.WorkListEndList.remoteData(param);
                                    yufp.util.butLogInfo(hashCode, '已办结事项', '查询');
                                }
                            }
                        },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'endWorkList', show: this.resetButton }
                    ],
                    dataParams: { condition: JSON.stringify({ sessionLoginCode: yufp.session.user.loginCode }) },
                    queryFields: [
                        { placeholder: '流程名称', field: 'wfName', type: 'input', clearable: true },
                        { placeholder: '主题名称', field: 'custName', type: 'input', clearable: true }
                    ],
                    tableColumns: [{
                            label: '流程名称',
                            prop: 'wfName',
                            template: function() {
                                return '<template scope="scope">\
                                <a style="text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-click\', scope.row)">{{ scope.row.wfName }}</a>\
                               </template>';
                            }
                        },
                        { label: '流程实例号', prop: 'instanceId', hidden: true },
                        { label: '流程标识', prop: 'wfSign', hidden: true },
                        { label: '主题名称', prop: 'custName' },
                        { label: '流程开始时间', prop: 'wfStartTime' },
                        { label: '流程结束时间', prop: 'wfEndTime' },
                        {
                            label: '花费时间(min)',
                            prop: 'costTimes',
                            formatter: function(row, me) {
                                var minutes1 = row.costTimes / 60;
                                var index = minutes1.toString().indexOf('.');
                                if (index == -1) {
                                    return minutes1;
                                }
                                return (row.costTimes / 60).toString().substring(0, index + 3);
                            }
                        },
                        {
                            label: '最后办理人',
                            prop: 'lastUser',
                            template: function() {
                                return '<template scope="scope">\
                                {{ scope.row.userName + "-" + scope.row.lastUser.split(";")[0] }}\
                            </template>';
                            }
                            // scope.row.userName.split(';')[0]
                                // ,
                                // formatter: function (row, me) {
                                //   yufp.service.request({
                                //     url: backend.echainService + '/api/allcust/getUserNameByUserId',
                                //     data: { lastUser: row.lastUser },
                                //     method: 'GET',
                                //     callback: function (code, message, response) {
                                //       var lastName = '';
                                //       lastName = response.data.userName;
                                //       row.lastUser = lastName;
                                //     }
                                //   });}

                        },
                        // {
                        //   label: '最后办理人名称',
                        //   prop: 'userName'
                        // },
                        { label: '审批状态', prop: 'spStatus', dataCode: 'WF_APP_STATUS' }
                    ]
                };
            },
            methods: {
                customClick: function(reqData) {
                    var action = {};
                    reqData.action = action;
                    reqData.returnBackFuncId = cite.id;
                    reqData.returnBackRootId = cite.rootId;
                    yufp.router.to('echainInstanceInfo', reqData, cite.rootId);
                    yufp.util.butLogInfo(hashCode, '已办结事项', '流程名称');
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