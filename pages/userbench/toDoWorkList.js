define(function(require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('WF_NODE_STATUS');
        yufp.custom.vue({
            el: '#toDoWorkList',
            data: function() {
                var me = this;
                return {
                    urls: {
                        dataUrl: backend.echainService + '/api/remindinfo/getUserTodos'
                            // 列表数据查询
                    },
                    WorkListButtons: [{
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
                                    me.$refs.WorkListTodoList.remoteData(param);
                                    yufp.util.butLogInfo(hashCode, '待审批事项', '查询');
                                }
                            }
                        },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'el-icon-edit', show: this.resetButton }
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
                        {
                            label: '申请流水号',
                            prop: 'bizSeqNo',
                            hidden: true
                                // template: function () {
                                //   return '<template scope="scope">\
                                //                   <a style="text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-click\', scope.row)">{{ scope.row.bizSeqNo }}</a>\
                                //                  </template>';
                                // }
                        },
                        { label: '流程实例号', prop: 'instanceId', hidden: true },
                        { label: '流程标识', prop: 'wfSign', hidden: true },
                        { label: '主题名称', prop: 'custName' },
                        { label: '前一节点', prop: 'preNodeName' },
                        { label: '当前节点Id', prop: 'nodeId', hidden: true },
                        { label: '当前节点', prop: 'nodeName' },
                        { label: '当前办理人', prop: 'currentNodeUser',
                            template: function() {
                                return '<template scope="scope">\
                                {{ scope.row.userName + "-" + scope.row.currentNodeUser.split(";")[0] }}\
                             </template>';
                        }
                        },
                        { label: '节点状态', prop: 'nodeStatus', dataCode: 'WF_NODE_STATUS' },
                        { label: '节点开始时间', prop: 'nodeStartTime' }
                    ]
                };
            },

            methods: {
                rowDblclick: function(reqData) {
                    var action = {
                        save: '1',
                        submit: '1',
                        signin: '1',
                        signoff: '1',
                        tasksignoff: '1',
                        wake: '1',
                        callsubflow: '1'
                    };
                    reqData.action = action;
                    reqData.returnBackFuncId = cite.id;
                    reqData.returnBackRootId = cite.rootId;
                    yufp.router.to('echainInstanceInfo', reqData, cite.rootId);
                    yufp.util.butLogInfo(hashCode, '待审批事项', '流程名称');
                    // yufp.router.to("logicAndInstanceInfo",reqData,'toDoWorkList');
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