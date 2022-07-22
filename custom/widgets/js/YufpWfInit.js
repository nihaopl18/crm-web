(function (vue, $, name) {
    vue.component(name, {
        template: '<div>\
                <el-dialog-x title="下一步骤(单选)" :visible.sync="dialogFormVisible" height="370px" width="700px" @close="beforeClose">\
                    <el-form ref="nextNodeForm" :model="nextNodeForm" label-width="110px" :inline="true">\
                        <el-row>\
                            <el-col :span="4">\
                                &nbsp;\
                            </el-col>\
                            <el-col :span="20">\
                                <table>\
                                    <tbody>\
                                        <tr v-for="(item,index) in nextNodeList">\
                                            <td>\
                                                <el-radio :label="item.nodeId" v-model="radioModel" @change.native="onAgreeRadioNodeSelect">{{item.nodeName}}</el-radio>\
                                            </td>\
                                            <td>\
                                                <el-input v-model="item.showUsers" placeholder="" size="small" :disabled="disabled"></el-input>\
                                            </td>\
                                            <td>\
                                                <el-button size="small" v-if="item.selected==\'1\'" :disabled="item.selected==\'0\'" @click="openNodeUsersFn(item.nodeId,index)">选择人员</el-button>\
                                            </td>\
                                        </tr>\
                                    </tbody>\
                                </table>\
                            </el-col>\
                        </el-row>\
                    </el-form>\
                    <div slot="footer" align="center">\
                        <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>\
                        <el-button type="primary" @click="saveCreateFn()">确 定</el-button>\
                    </div>\
                </el-dialog-x>\
                <el-dialog-x title="下一步骤(多选)" :visible.sync="dialogFormVisible_check" height="370px" width="700px" @close="beforeClose">\
                    <el-form ref="nextNodeFormCheck" :model="nextNodeFormCheck" label-width="110px" :inline="true">\
                        <el-row>\
                            <el-col :span="4">\
                                &nbsp;\
                            </el-col>\
                            <el-col :span="20">\
                                <table>\
                                    <tbody>\
                                        <tr v-for="(item,index) in nextNodeList">\
                                            <td>\
                                                <el-checkbox :label="item.nodeId" true-label="1" false-label="0" v-model="item.selected">{{item.nodeName}}</el-checkbox>\
                                            </td>\
                                            <td>\
                                                <el-input v-model="item.users" placeholder="" size="small" :disabled="disabled"></el-input>\
                                            </td>\
                                            <td>\
                                                <el-button v-if="item.selected==\'1\'" size="mini" :disabled="item.selected==\'0\'" @click="openNodeUsersFn(item.nodeId,index)">选择人员</el-button>\
                                            </td>\
                                        </tr>\
                                    </tbody>\
                                </table>\
                            </el-col>\
                        </el-row>\
                    </el-form>\
                    <div slot="footer" align="center">\
                        <el-button type="primary" @click="dialogFormVisible_check = false">关闭</el-button>\
                        <el-button type="primary" @click="saveCreateFn()">确 定</el-button>\
                    </div>\
                </el-dialog-x>\
                <el-dialog-x title="节点处理人(单选)" :visible.sync="dialogVisible_nodeUser" height="360px" width="550px">\
                    <el-table-x ref="nodeUserList" :data-url="urls.wfGetNodeUsers" :pageable=false request-type="POST" :default-load=false :data-params="nodeUserParams"\
                        :table-columns="nodeUserTableColumns">\
                    </el-table-x>\
                    <div slot="footer" align="center">\
                        <el-button type="primary" @click="returnNodeUser">选取返回</el-button>\
                    </div>\
                </el-dialog-x>\
                <el-dialog-x title="节点处理人(多选)" :visible.sync="dialogVisible_nodeUserCheck" height="360px" width="550px">\
                    <el-table-x ref="nodeUserCheckList" :checkbox=true :pageable=false :data-url="urls.wfGetNodeUsers" request-type="POST" :default-load=false\
                        :data-params="nodeUserParams" :table-columns="nodeUserTableColumns">\
                    </el-table-x>\
                    <div slot="footer" align="center">\
                        <el-button type="primary" @click="returnNodeUserCheck">选取返回</el-button>\
                    </div>\
                </el-dialog-x>\
                <el-dialog-x title="委托模式" :visible.sync="dialogVisible_agent" height="360px" width="550px">\
                    <el-radio-group v-model="agent" @change="agentChange">\
                        <el-row v-for="(item,index) in agentList" :key="item.key">\
                            <el-col>\
                                <el-radio :label="item.key" :key="item.value">{{item.value}}</el-radio>\
                            </el-col>\
                        </el-row>\
                    </el-radio-group>\
                    <div slot="footer" align="center">\
                        <el-button type="primary" @click="saveAgent()">确 定</el-button>\
                    </div>\
                </el-dialog-x>\
            </div>',
        props: {
            commonParams: {
                type: Object,
                required: true
            },
            echainServerName: {
                type: String,
                default: backend.echainService
            }
        },
        data: function () {
            var me = this;
            return {
                nodeRouterType: '',
                wfSign: '',
                radioModel: '',
                checkList: [],
                nodeId: '',
                instanceId: '',
                applType: '',
                logicseq: '',
                index: '',
                agent: '0',
                agentModel: '0',
                users: '',
                disabled: true,
                nextNodeForm: {
                    radioModel: '',
                    radioInput: ''
                },
                nextNodeFormCheck: {
                    checkModel: '',
                    checkInput: ''
                },
                nextNodeList: [],
                exv10: '',
                agentList: [
                    { key: '0', value: '代办人办理' },
                    { key: '1', value: '办理人代人都可以办理' },
                    { key: '2', value: '原办理人办理' }
                ],
                urls: {
                    wfInit: me.echainServerName + '/api/joincore/wfInit',
                    wfGetInstanceInfo: me.echainServerName + '/api/joincore/wfGetInstanceInfo',
                    wfSave: me.echainServerName + '/api/joincore/wfSave',
                    wfGetNextNodes: me.echainServerName + '/api/joincore/wfGetNextNodes',
                    wfGetNodeUsers: me.echainServerName + '/api/joincore/wfGetNodeUsers',
                    wfCheckAgent: me.echainServerName + '/api/joincore/wfCheckAgent',
                    wfComplete: me.echainServerName + '/api/joincore/wfComplete'
                },
                nodeUserParams: {},
                nextNodeUserForTip: '',
                dialogFormVisible: false,
                dialogFormVisible_check: false,
                dialogVisible_nodeUser: false,
                dialogVisible_nodeUserCheck: false,
                dialogVisible_agent: false,
                nodeUserTableColumns: [
                    { label: '办理人ID', prop: 'loginCode', resizable: true },
                    { label: '办理人名称', prop: 'userName', resizable: true }
                ]
            };
        },
        methods: {
            beforeClose: function () {
                this.nextNodeList = [];
                this.radioModel = '';
                this.checkList = [];
                this.agent = '0';
                this.$emit('afterclose');
            },
            // 撤回
            withdraw: function (wfInitData, load, callback) {
                var me = this;
                var comitData = wfInitData;
                yufp.extend(comitData, me.commonParams);
                me.instanceId = comitData.instanceId;
                yufp.service.request({ // 获取实例信息
                    url: me.urls.wfGetInstanceInfo,
                    data: comitData,
                    method: 'POST',
                    callback: function (code, message, response) {
                        me.nodeRouterType = response.data.nodeRouterType;
                        me.wfSign = response.data.wfSign;
                        if (response.data != null) {
                            comitData.nodeId = response.data.nodeId;
                            me.nodeId = response.data.nodeId;
                            yufp.service.request({
                                method: 'POST',
                                data: comitData,
                                url: backend.echainService + '/api/joincore/wfTakeBack',
                                callback: function (code, message, response) {
                                    var sign = response.data.sign;
                                    if (sign == '0') {
                                        me.$message({ message: response.data.tip, type: 'success' });
                                        // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                                        // yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                                        me.$emit('afterclose', 4, response.data);
                                    } else {
                                        me.$message({ message: response.data.tip, type: 'error' });
                                    }
                                }
                            });
                        } else {
                            me.$message({ message: '获取实例信息失败', type: 'error' });
                        }
                    }
                });
            },
            wfInit: function (wfInitData, load, callback) {
                var me = this;
                var comitData = wfInitData;
                me.exv10 = comitData.exv10;
                yufp.extend(comitData, me.commonParams);
                yufp.service.request({ // 初始化流程
                    url: me.urls.wfInit,
                    data: wfInitData,
                    method: 'POST',
                    callback: function (code, message, response) {
                        if (response.data != null) {
                            comitData.instanceId = response.data.instanceId;
                            comitData.nodeId = response.data.nodeId;
                            me.nodeId = response.data.nodeId;
                            me.instanceId = response.data.instanceId;
                            me.$emit('afterclose', 99);
                            yufp.service.request({ // 获取实例信息
                                url: me.urls.wfGetInstanceInfo,
                                data: comitData,
                                method: 'POST',
                                callback: function (code, message, response) {
                                    me.nodeRouterType = response.data.nodeRouterType;
                                    me.wfSign = response.data.wfSign;
                                    if (response.data != null) {
                                        comitData.commentSign = '10';
                                        comitData.commentContent = '发起流程';
                                        yufp.service.request({ // 保存流程意见
                                            url: me.urls.wfSave,
                                            data: comitData,
                                            method: 'POST',
                                            callback: function (code, message, response) {
                                                if (response.data != null) {
                                                    me.openNodeFn(load, callback);
                                                } else {
                                                    me.$message({ message: '保存流程意见失败', type: 'error' });
                                                }
                                            }
                                        });
                                    } else {
                                        me.$message({ message: '获取实例信息失败', type: 'error' });
                                    }
                                }
                            });
                        } else {
                            me.closeLoading(load);
                            me.$message({ message: '初始化流程失败', type: 'error' });
                        }
                    }
                });
            },
            wfSave: function (wfSaveData, load, callback) {
                var me = this;
                var comitData = wfSaveData;
                yufp.extend(comitData, me.commonParams);
                me.instanceId = comitData.instanceId;
                yufp.service.request({ // 获取实例信息
                    url: me.urls.wfGetInstanceInfo,
                    data: comitData,
                    method: 'POST',
                    callback: function (code, message, response) {
                        me.nodeRouterType = response.data.nodeRouterType;
                        me.wfSign = response.data.wfSign;
                        if (response.data != null) {
                            if (response.data.comment && response.data.comment.commentId) {
                                comitData.commentSign = '10';
                                comitData.commentContent = '发起流程';
                            } else {
                                comitData.commentSign = '10';
                                comitData.commentContent = '同意';
                            }
                            comitData.nodeId = response.data.nodeId;
                            me.nodeId = response.data.nodeId;
                            yufp.service.request({ // 保存流程意见
                                url: me.urls.wfSave,
                                data: comitData,
                                method: 'POST',
                                callback: function (code, message, response) {
                                    if (response.data != null) {
                                        me.openNodeFn(load, callback);
                                    } else {
                                        me.$message({ message: '保存流程意见失败', type: 'error' });
                                    }
                                }
                            });
                        } else {
                            me.$message({ message: '获取实例信息失败', type: 'error' });
                        }
                    }
                });


            },
            onAgreeRadioNodeSelect: function () {
                var me = this;
                for (var index = 0; index < me.nextNodeList.length; index++) {
                    var node = me.nextNodeList[index];
                    if (node.nodeId == me.radioModel) {
                        node.selected = '1';
                    } else {
                        node.selected = '0';
                    }
                }
            },
            agentChange: function (val) { // 委托模式
                this.agent = val;
            },
            closeLoading: function (load) {
                load ? load.close() : '';
            },
            openNodeFn: function (load, callback) { // 节点选择
                var me = this;
                var param = {};
                yufp.extend(param, me.commonParams);
                param.nodeId = this.nodeId;
                param.instanceId = this.instanceId;
                yufp.service.request({
                    url: me.urls.wfGetNextNodes,
                    data: param,
                    method: 'POST',
                    callback: function (code, message, response) {
                        if (response.data.length > 0) {
                            for (var i = 0; i < response.data.length; i++) { // 获取节点列表
                                var nextNode = {
                                    nodeId: response.data[i].nodeId,
                                    nodeName: response.data[i].nodeName,
                                    selected: '0',
                                    users: ''
                                };
                                me.nextNodeList.push(nextNode);
                            }
                            if (me.nodeRouterType == '2' || me.nodeRouterType == '4') { // 判断节点是单选还是多选
                                me.dialogFormVisible_check = true;
                            } else {
                                me.dialogFormVisible = true;
                            }
                            callback && callback();
                            me.closeLoading(load);
                        } else {
                            me.closeLoading(load);
                            me.$message({ message: '没有下一节点', type: 'error' });
                        }
                    }
                });
            },
            openNodeUsersFn: function (val, index) { // 下一节点处理人选择
                var me = this;
                var param = {};
                me.index = index;
                yufp.extend(param, me.commonParams);
                param.nodeId = val;
                param.instanceId = me.instanceId;
                param.orgId = yufp.session.org.code;
                param.size = 9999;
                param.page = 1;
                yufp.service.request({
                    url: me.urls.wfGetNodeUsers,
                    data: param,
                    method: 'POST',
                    callback: function (code, message, response) {
                        if (response.data.length >= 1) {
                            if (response.data[0].isMulteit == '0') { // 判断节点处理人是单选还是多选
                                // var paramss = {
                                //   condition: JSON.stringify({
                                //     data: response.data
                                //   })
                                // };
                                me.dialogVisible_nodeUser = true;
                                me.$nextTick(function () {
                                    me.$refs.nodeUserList.data = response.data;
                                });
                                // yufp.service.request({
                                //   url: '/api/joindemo/getUserByOrg',
                                //   data: paramss,
                                //   method: 'POST',
                                //   callback: function (code, message, response) {
                                //     if (response.data.length > 0) {
                                //       me.dialogVisible_nodeUser = true;
                                //       me.$nextTick(function () {
                                //         me.$refs.nodeUserList.data = response.data;
                                //       });
                                //     } else {
                                //       me.$message('没有可选择的审批人');
                                //     }
                                //   }
                                // });
                            } else {
                                me.dialogVisible_nodeUserCheck = true;
                                me.$nextTick(function () {
                                    me.$refs.nodeUserCheckList.remoteData(param);
                                });
                            }
                        } else {
                            me.$message({ message: '没有下一节点处理人', type: 'error' });
                        }
                    }
                });
            },
            saveAgent: function () { // 保存委托模式
                var me = this;
                me.agentModel = me.agent;
                me.dialogVisible_agent = false;
                me.dialogVisible_nodeUser = false;
                me.nextNodeList[me.index].users = me.users;
            },
            returnNodeUser: function () { // 选取下一节点处理人（单选）
                var me = this;
                if (this.$refs.nodeUserList.selections.length !== 1) {
                    this.$message({ message: '请选择一条数据!', type: 'warning' });
                    return false;
                }
                var row = this.$refs.nodeUserList.selections[0];
                if (row.loginCode == yufp.session.user.loginCode) {
                    this.$message({ message: '下一节点处理人不能为自己!', type: 'warning' });
                    return false;
                }
                me.users = row.loginCode;
                me.nextNodeUserForTip = row.userName;
                var param = {};
                yufp.extend(param, me.commonParams);
                param.applType = me.applType;
                param.users = row.loginCode;
                yufp.service.request({
                    url: me.urls.wfCheckAgent,
                    data: param,
                    method: 'POST',
                    callback: function (code, message, response) {
                        if (response.data == 1) { // 判断是否设置了委托
                            me.dialogVisible_agent = true;
                        } else {
                            me.nextNodeList[me.index].users = row.loginCode;
                            me.nextNodeList[me.index].showUsers = row.userName;
                            me.dialogVisible_nodeUser = false;
                        }
                    }
                });
            },
            returnNodeUserCheck: function () { // 选取下一节点处理人（多选）
                var me = this;
                if (this.$refs.nodeUserCheckList.selections.length < 1) {
                    this.$message({ message: '请至少选择一条数据!', type: 'warning' });
                    return false;
                }
                var list = this.$refs.nodeUserCheckList.selections;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].loginCode == yufp.session.user.loginCode) {
                        this.$message({ message: '下一节点处理人不能为自己!', type: 'warning' });
                        return false;
                    }
                }
                var data = '';
                var userTemp = '';
                for (var i = 0; i < list.length; i++) {
                    if (i < list.length - 1) {
                        data = data + list[i].loginCode + ';';
                        userTemp = userTemp + list[i].userName + ';';
                    } else {
                        data = data + list[i].loginCode;
                        userTemp = userTemp + list[i].userName;
                    }
                }
                me.nextNodeUserForTip = userTemp;
                me.users = data;
                var param = {};
                yufp.extend(param, me.commonParams);
                param.applType = me.applType;
                param.users = data;
                yufp.service.request({
                    url: me.urls.wfCheckAgent,
                    data: param,
                    method: 'POST',
                    callback: function (code, message, response) {
                        if (response.data == 1) { // 判断是否设置了委托
                            me.dialogVisible_agent = true;
                        } else {
                            me.nextNodeList[me.index].users = data;
                            me.dialogVisible_nodeUserCheck = false;
                        }
                    }
                });
            },
            saveCreateFn: function () { // 流程提交
                var me = this;
                var nextUsers = '';
                var nextNodeId = '';
                var nextNodeName = '';
                var nextNodeListTemp = [];
                if (me.nextNodeList != null) {
                    for (var k = 0; k < me.nextNodeList.length; k++) {
                        if (me.nextNodeList[k].selected == '1') {
                            var option = {
                                nodeId: me.nextNodeList[k].nodeId,
                                nodeName: me.nextNodeList[k].nodeName,
                                users: me.nextNodeList[k].users
                            };
                            nextNodeListTemp.push(option);
                        }
                    }
                }
                if (nextNodeListTemp) {
                    for (var i = 0; i < nextNodeListTemp.length; i++) {
                        if (i < nextNodeListTemp.length - 1) {
                            nextUsers = nextUsers + nextNodeListTemp[i].users + '@';
                            nextNodeId = nextNodeId + nextNodeListTemp[i].nodeId + '@';
                            nextNodeName = nextNodeName + nextNodeListTemp[i].nodeName + '@';
                        } else {
                            nextUsers = nextUsers + nextNodeListTemp[i].users;
                            nextNodeId = nextNodeId + nextNodeListTemp[i].nodeId;
                            nextNodeName = nextNodeName + nextNodeListTemp[i].nodeName;
                        }
                    }
                }
                var param = {};
                yufp.extend(param, me.commonParams);
                param.nextNodeUser = nextUsers;
                param.nodeId = me.nodeId;
                param.instanceId = me.instanceId;
                param.nextNodeId = nextNodeId;
                param.entrustModel = me.agentModel;
                param.bizSeqNo = me.logicseq;
                param.applType = me.applType;
                param.wfSign = me.wfSign;
                param.exv10 = me.exv10;
                me.instanceInfo = param;
                if (!nextNodeId) {
                    me.$message({ message: '请选择下一节点', type: 'error' });
                    return false;
                }
                if (!me.nextNodeUserForTip) {
                    me.$message({ message: '请选择下一节点处理人', type: 'error' });
                    return false;
                }
                yufp.service.request({
                    url: me.echainServerName + '/api/joincore/wfComplete',
                    data: param,
                    method: 'POST',
                    callback: function (code, message, response) {
                        if (response.data != null) {
                            var resData = response.data;
                            if (resData.nextNodeName === '结束') {
                                me.$confirm('流程发起成功', '提示', {
                                    confirmButtonText: '确定',
                                    showCancelButton: false,
                                    type: 'success',
                                    center: true
                                }).then(function () {
                                    me.radioModel = '';
                                    me.dialogFormVisible = false;
                                    me.dialogFormVisible_check = false;
                                    me.$emit('afterinit');
                                });
                            } else {
                                // me.$confirm('流程发起成功，下一节点为:' + resData.nextNodeName + ' ( ' + resData.nextNodeId + ' )' + ',下一节点处理人为:' + me.nextNodeUserForTip + ' (' + resData.nextNodeUser + ')', '提示', {
                                me.$confirm('流程发起成功，下一节点为:' + resData.nextNodeName + ' ( ' + me.nextNodeUserForTip + ' ' + resData.nextNodeUser + ' )', '提示', {
                                    confirmButtonText: '确定',
                                    showCancelButton: false,
                                    type: 'success',
                                    center: true
                                }).then(function () {
                                    me.radioModel = '';
                                    me.dialogFormVisible = false;
                                    me.dialogFormVisible_check = false;
                                    me.$emit('afterinit');
                                });
                            }
                        } else {
                            me.$message({ message: '流程提交失败', type: 'error' });
                        }
                    }
                });
                // 撤回状态不选审批节点可以直接通过bug修复
                me.nextNodeUserForTip = '';
            }
        },
        mounted: function () {

        }

    });
}(Vue, yufp.$, 'yufp-wf-init'));