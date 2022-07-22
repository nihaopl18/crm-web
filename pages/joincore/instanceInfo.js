
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var me = this;
        var nodeStatusYJ;
        var WfSign;
        return {
          height: yufp.custom.viewSize().height - 100,
          logicPageId: 'logicPageId',
          historyPageId: 'historyPageId',
          activeName: 'first',
          backNodeFormActiveName: 'first',
          commonParams: {// 基本参数
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode,
            instanceId: data.instanceId,
            nodeId: data.nodeId
          },
          jumpOptions: [], // 跳转节点
          commentSignOptions: [], // 审批结论
          saveHidden: true,
          submitHidden: true,
          wfSignInHidden: true,
          wfSignOffHidden: true,
          wfTaskSignOffHidden: true,
          wfWakeHidden: true,
          wfHangHidden: true,
          wfTakeBackHidden: true,
          wfUrgeHidden: true,
          callSubFlowHidden: true,
          assistUserButtons: [// 协助办理人页面按钮
            {
              label: '',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              show: true,
              click: function (model, valid) {
                if (valid) {
                  model.instuCde = yufp.session.instu.code;
                  var param = {
                    condition: JSON.stringify(model)
                  };
                  me.$refs.assistUserList.remoteData(param);
                }
              }
            },
            { label: '', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
          ],
          jumpUserButtons: [// 跳转办理人页面按钮
            {
              label: '',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              show: true,
              click: function (model, valid) {
                if (valid) {
                  model.instuCde = yufp.session.instu.code;
                  var param = {
                    condition: JSON.stringify(model)
                  };
                  me.$refs.jumpUserList.remoteData(param);
                }
              }
            },
            { label: '', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
          ],
          title: '',
          jumpNodeId: '', // 跳转节点
          backNodeModel: '', // 打回节点
          userModel: '', // 打回节点人员
          callBackModel: '1', // 打回后提交方式
          radioModel: '', // 下一步骤节点
          jumpUserForm: {// 流程跳转表单
            nextNodeId: '',
            nextNodeUser: '',
            flag: false
          },
          checkList: [],
          applType: '',
          index: '',
          agent: '0',
          agentModel: '3',
          users: '',
          instanceId: data.instanceId,
          nodeId: data.nodeId,
          wfSign: data.wfSign,
          bizSeqNo: data.bizSeqNo,
          authAction: data.action,
          returnBackFuncId: data.returnBackFuncId,
          returnBackRootId: data.returnBackRootId,
          isDraft: '',
          subWfType: '', // 子流程异步/同步
          subWfSign: '',
          subInstanceId: '', // 子流程返回实例号
          subNodeId: '', // 子流程返回节点ID
          subFlag: false,
          cardHidden: false,
          callSubFlow: '', // 子流程
          nodeRouterType: '', // 下一节点单/多选判断
          nodeUserResquestType: 'POST',
          nextNodeUserForTip: '',
          backNodeList: [],
          usersList: [],
          nextNodeList: [],
          agentList: [
            { key: '0', value: '代办人办理' },
            { key: '1', value: '办理人代办人都可以办理' },
            { key: '2', value: '原办理人办理' }
          ],
          urls: {
            saveUrl: backend.echainService + '/api/joincore/wfSave', // 保存
            returnBackUrl: backend.echainService + '/api/joincore/wfRetrunBack', // 退回
            getCallBackNodesUrl: backend.echainService + '/api/joincore/wfGetCallBackNodes', // 打回节点列表
            callBackUrl: backend.echainService + '/api/joincore/wfCallBack', // 打回
            getAssistUsersUrl: backend.echainService + '/api/joincore/wfGetAssistUsers', // 协办处理人
            wfAssistUrl: backend.echainService + '/api/joincore/wfAssist', // 协办
            getChangeUsersUrl: backend.echainService + '/api/joincore/wfGetChangeUsers', // 转办处理人
            wfChangeUrl: backend.echainService + '/api/joincore/wfChange', // 转办
            getJumpNodesUrl: backend.echainService + '/api/joincore/wfGetJumpNodes', // 跳转节点
            getJumpUsersUrl: backend.echainService + '/api/joincore/wfGetJumpUsers', // 跳转处理人
            wfJumpUrl: backend.echainService + '/api/joincore/wfJump', // 跳转
            wfHangUrl: backend.echainService + '/api/joincore/wfHang', // 挂起
            nodeUserUrl: backend.echainService + '/api/joincore/wfGetNodeUsers', // 下一步骤页面选择办理人
            callSubFlowUrl: backend.echainService + '/api/joincore/wfCheckAsynSub', // 异步子流程校验
            wfSubSubmitUrl: backend.echainService + '/api/joincore/wfSubSubmit'// 子流程发起
          },
          queryFields: [
            { placeholder: '登录代码', field: 'userCode', type: 'input' },
            { placeholder: '用户名', field: 'username', type: 'input' }
          ],
          jumpUserQueryFields: [
            { placeholder: '登录代码', field: 'userCode', type: 'input' },
            { placeholder: '用户名', field: 'username', type: 'input' }
          ],
          query: {
            userCode: '',
            userName: ''
          },
          jumpUserQuery: {
            userCode: '',
            userName: ''
          },
          nextNodeForm: {},
          nextNodeFormCheck: {},
          backNodeForm: {},
          jumpUserForTip: '',
          jumpUserParams: { instuCde: yufp.session.instu.code },
          nodeUserParams: {},
          dialogFormVisible: false,
          dialogVisibleAssistUser: false,
          dialogVisibleChangeUser: false,
          dialogVisibleJump: false,
          dialogVisibleJumpUser: false,
          dialogFormVisibleRadio: false,
          dialogFormVisibleCheck: false,
          dialogVisibleNodeUser: false,
          dialogVisibleNodeUserCheck: false,
          dialogVisibleAgent: false,
          dialogStatus: '',
          assistUserParams: { instuCde: yufp.session.instu.code },
          textMap: {
            backNode: '打回节点选择',
            assist: '协办人选择',
            changeUser: '转办人选择',
            jump: '跳转选择',
            jumpUser: '跳转办理人选择',
            nextNode: '下一步骤*办理人(单选)',
            nextNodeCheck: '下一步骤*办理人(多选)',
            nextUser: '办理人(单选)',
            nextUserCheck: '办理人(多选)',
            agent: '委托模式'
          },
          assistUserTableColumns: [
            { label: '登录代码', prop: 'loginCode', resizable: true },
            { label: '用户名', prop: 'userName', resizable: true },
            { label: '机构代码', prop: 'orgCode', resizable: true },
            { label: '机构名', prop: 'orgName', resizable: true }
          ],
          changeUserTableColumns: [
            { label: '登录代码', prop: 'loginCode', resizable: true },
            { label: '用户名', prop: 'userName', resizable: true }
          ],
          jumpUserTableColumns: [
            { label: '登录代码', prop: 'loginCode', resizable: true },
            { label: '用户名', prop: 'userName', resizable: true },
            { label: '机构代码', prop: 'orgCode', resizable: true },
            { label: '机构名', prop: 'orgName', resizable: true }
          ],
          nodeUserTableColumns: [
            { label: '办理人ID', prop: 'loginCode', resizable: true },
            { label: '办理人名称', prop: 'userName', resizable: true }
          ],
          WfOperationForm: {
            commentSign: '',
            commentContent: ''
          },
          rules: {// 验证规则
            commentSign: [
              { required: true, message: '必填项', trigger: 'blur' }
            ],
            commentContent: [
              { required: true, message: '必填项', trigger: 'blur' },
              { max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
            ]
          }
        };
      },
      created: function () {
        var me = this;
        var authAction = me.authAction;
        var params = {
          sessionInstuCde: yufp.session.instu.code,
          sessionOrgCode: yufp.session.org.code,
          sessionLoginCode: yufp.session.user.loginCode,
          instanceId: me.instanceId,
          nodeId: me.nodeId
        };
        yufp.service.request({// 获取流程实例
          method: 'POST',
          data: params,
          async: false,
          url: backend.echainService + '/api/joincore/wfGetInstanceInfo',
          callback: function (code, message, response) {
            me.title = '当前审批节点为:' + response.data.nodeName;
            // yufp.router.to("exampleinfo",data,"logicPage");
            var funcId = response.data.funcId;
            me.logicPageId = me.logicPageId + '_' + new Date().getTime();
            me.historyPageId = me.historyPageId + '_' + new Date().getTime();
            me.nodeStatusYJ = response.data.nodeStatus;
            me.wfSign = response.data.wfSign;
            me.$nextTick(function () {
              try {
                if (funcId) {
                  yufp.router.to(funcId, response.data, me.logicPageId);
                }
                yufp.router.to('historyListPage', { instanceId: me.instanceId }, me.historyPageId);
              } catch (e) { }
            });
            var action = response.data.action;
            var ext = response.data.ext;
            me.applType = response.data.applType;
            me.isDraft = response.data.isDraft;
            me.subWfType = response.data.subWfType;
            me.subWfSign = response.data.subWfSign;
            me.nodeRouterType = response.data.nodeRouterType;
            // 下拉框
            if (action['submit'] == '1') {
              me.commentSignOptions.push({ key: '10', value: '同意' });
            }
            if (action['returnback'] == '1') {
              me.commentSignOptions.push({ key: '40', value: '驳回' });
            }
            if (action['callback'] == '1') {
              me.commentSignOptions.push({ key: '30', value: '打回' });
            }
            if (action['assist'] == '1') {
              me.commentSignOptions.push({ key: '21', value: '协办' });
            }
            if (action['change'] == '1') {
              me.commentSignOptions.push({ key: '11', value: '转办' });
            }
            if (action['jump'] == '1') {
              me.commentSignOptions.push({ key: '50', value: '跳转' });
            }
            /* if(action['hang'] == '1' ){
                                        me.commentSignOptions.push({key:'80',value:'挂起'});
                                    }*/
            /* if(action['cancel'] == '1' ){
                                        me.commentSignOptions.push({key:'cancel',value:'撤销'});
                                    }*/
            if (ext['canexe20'] == '1') { // 否决
              me.commentSignOptions.push({ key: '20', value: '否决' });
            }
            // 按钮
            if (action['save'] == '1' && authAction['save'] == '1') {
              me.saveHidden = false;
              me.cardHidden = false;
            } else {
              me.cardHidden = true;
            }
            if (action['submit'] == '1' && authAction['submit'] == '1') {
              me.submitHidden = false;
            }
            if (action['signin'] == '1' && authAction['signin'] == '1') {
              me.wfSignInHidden = false;
            }
            if (action['signoff'] == '1' && authAction['signoff'] == '1') {
              me.wfSignOffHidden = false;
            }
            if (action['tasksignoff'] == '1' && authAction['tasksignoff'] == '1') {
              me.wfTaskSignOffHidden = false;
            }
            if (action['wake'] == '1' && authAction['wake'] == '1') {
              me.wfWakeHidden = false;
            }
            if (action['hang'] == '1' && authAction['hang'] == '1') {
              me.wfHangHidden = false;
            }
            if (action['again'] == '1' && authAction['again'] == '1') {
              me.wfTakeBackHidden = false;
            }
            if (action['urge'] == '1' && authAction['urge'] == '1') {
              me.wfUrgeHidden = false;
            }
            if (action['callsubflow'] && authAction['callsubflow']) {
              me.callSubFlowHidden = false;
              me.callSubFlow = action['callsubflow'];
            }
            if (response.data.comment && response.data.comment.commentId) {
              me.WfOperationForm.commentId = response.data.comment.commentId;
              me.WfOperationForm.commentSign = response.data.comment.commentSign;
              me.WfOperationForm.commentContent = response.data.comment.commentContent;
            }
          }
        });
      },
      methods: {
        commentChange: function () {
          var _this = this;
          for (var i = 0; i < _this.commentSignOptions.length; i++) {
            if (_this.commentSignOptions[i].key == _this.WfOperationForm.commentSign) {
              _this.WfOperationForm.commentContent = _this.commentSignOptions[i].value;
            }
          }
        },
        closeFn: function () {
          yufp.router.to(this.returnBackFuncId, null, this.returnBackRootId);
        },
        callSubFlowFn: function () { // 发起子流程
          var me = this;
          var comitData = {};
          yufp.extend(comitData, me.commonParams);
          comitData.subWfType = me.subWfType;
          comitData.subWfSign = me.subWfSign;
          me.$confirm('确定要发起子流程吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            if (me.subWfType == '2') { // 异步子流程
              yufp.service.request({
                method: 'POST',
                data: me.commonParams,
                url: me.urls.callSubFlowUrl,
                callback: function (code, message, response) {
                  if (response.data == '0') {
                    me.wfSubSubmit();
                  } else {
                    me.$confirm('已经存在子流程', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning',
                      center: true
                    }).then(function () {
                      me.wfSubSubmit();
                    });
                  }
                }
              });
            } else {
              me.wfSubSubmit();
            }
          });
        },
        wfSubSubmit: function () { // 子流程提交
          var me = this;
          var comitData = {};
          yufp.extend(comitData, me.commonParams);
          comitData.subWfType = me.subWfType;
          comitData.subWfSign = me.subWfSign;
          comitData.applType = me.applType;
          yufp.service.request({
            method: 'POST',
            data: comitData,
            url: me.urls.wfSubSubmitUrl,
            callback: function (code, message, response) {
              var sign = response.data.sign;
              if (sign == '0') {
                me.$message({ message: response.data.tip, type: 'success' });
                me.subNodeId = response.data.nodeId;
                me.subInstanceId = response.data.instanceId;
                me.subFlag = true;
                me.openNodeFn();
              } else {
                me.$message({ message: response.data.tip, type: 'error' });
              }
            }
          });
        },
        jumpUserRadioChange: function (val) { // 流程跳转节点选择
          var me = this;
          me.jumpNodeId = val;
          me.jumpUserForm.flag = true;
        },
        radioChange: function (val) { // 打回节点选择
          this.userModel = '';
          for (var i = 0; i < this.backNodeList.length; i++) {
            this.backNodeList[i].selected = false;
            var id = this.backNodeList[i].nodeId;
            if (id == val) {
              this.backNodeList[i].selected = true;
            }
          }
        },
        wfCallBackClose: function () {
          var me = this;
          me.backNodeList = [];
          me.usersList = [];
          me.dialogFormVisible = false;
        },
        jumpUserFn: function () { // 跳转处理人
          var me = this;
          if (this.jumpNodeId == '') {
            this.$message({ message: '请先选择跳转节点!', type: 'warning' });
          } else {
            this.dialogVisibleJumpUser = true;
            var param = {
              instuCde: yufp.session.instu.code,
              wfSign: this.wfSign
            };
            var tempParam = {
              condition: JSON.stringify(param)
            };
            me.$nextTick(function () {
              me.$refs.jumpUserList.remoteData(tempParam);
            });
          }
        },
        jumpUserClose: function () { // 跳转选择框关闭
          this.jumpUserForm.nextNodeUser = '';
          this.jumpUserForm.nextNodeId = '';
          this.dialogVisibleJump = false;
          this.jumpOptions = [];
        },
        saveFn: function () { // 保存按钮
          var me = this;
          var myform = me.$refs.WfOperationForm;
          var myformData = me.WfOperationForm;
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, myformData);
              yufp.extend(comitData, me.commonParams);
              var saveUrl = me.urls.saveUrl;
              yufp.service.request({
                url: saveUrl,
                data: comitData,
                method: 'POST',
                callback: function (code, message, response) {
                  var sign = response.data.sign;
                  if (sign == '0') {
                    me.$message({ message: response.data.tip, type: 'success' });
                  } else {
                    me.$message({ message: response.data.tip, type: 'error' });
                  }
                }
              });
            } else {
              me.$message({ message: '请检查输入项是否合法', type: 'warning' });
              return false;
            }
          });
        },
        returnAssistUser: function () { // 确认协办
          var me = this;
          if (this.$refs.assistUserList.selections.length !== 1) {
            this.$message({ message: '请选择一条数据!', type: 'warning' });
            return false;
          }
          var row = this.$refs.assistUserList.selections[0];
          var param = {};
          yufp.extend(param, me.commonParams);
          param.nextNodeUser = row.loginCode;
          var user = row.userName;
          yufp.service.request({
            url: me.urls.wfAssistUrl,
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              var sign = response.data.sign;
              if (sign == '0') {
                me.dialogVisibleAssistUser = false;
                me.$message({ message: '执行流程协作办理操作成功，协办人为' + user + '(' + param.nextNodeUser + ')', type: 'success' });
                // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
              } else {
                me.$message({ message: response.data.tip, type: 'error' });
              }
            }
          });
        },
        returnChangeUser: function () { // 确认转办
          var me = this;
          if (this.$refs.changeUserList.selections.length < 1) {
            this.$message({ message: '请至少选择一条数据!', type: 'warning' });
            return false;
          }
          var list = this.$refs.changeUserList.selections;
          var data = '';
          var user = '';
          for (var i = 0; i < list.length; i++) {
            if (i < list.length - 1) {
              data = data + list[i].loginCode + ';';
              user = user + list[i].userName + ';';
            } else {
              data = data + list[i].loginCode;
              user = user + list[i].userName;
            }
          }
          var param = {};
          yufp.extend(param, me.commonParams);
          param.nextNodeUser = data;
          yufp.service.request({
            url: me.urls.wfChangeUrl,
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              var sign = response.data.sign;
              if (sign == '0') {
                me.dialogVisibleChangeUser = false;
                me.$message({ message: '执行流程转办操作成功，转人为' + user + '(' + param.nextNodeUser + ')', type: 'success' });
                // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
              } else {
                me.$message({ message: response.data.tip, type: 'error' });
              }
            }
          });
        },
        returnJumpUser: function () { // 确认跳转
          if (this.$refs.jumpUserList.selections.length !== 1) {
            this.$message({ message: '请选择一条数据!', type: 'warning' });
            return false;
          }
          var row = this.$refs.jumpUserList.selections[0];
          this.jumpUserForTip = row.userName;
          this.$nextTick(function () {
            this.jumpUserForm.nextNodeUser = row.loginCode;
            this.dialogVisibleJumpUser = false;
          });
        },
        submitFn: function () { // 提交
          var me = this;
          var myform = me.$refs.WfOperationForm;
          var myformData = me.WfOperationForm;
          var commentSign = me.WfOperationForm.commentSign;
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, myformData);
              yufp.extend(comitData, me.commonParams);
              if (me.wfSign == 'YJKHSP') {
                // 打回操作
                yufp.service.request({
                  method: 'POST',
                  url: backend.custpubService + '/api/ocrmfcitransapply/getbelongOrgId',
                  data: {
                    instanceId: data.instanceId
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.code === 0) {
                      if (me.nodeStatusYJ == '5') { // 退回操作
                        comitData.paramMap = {
                          belongOrgId: response.data.belongOrgId,
                          belongOrgId1: response.data.belongOrgId1,
                          'beatBack': '1'
                        };
                      } else if (me.commonParams.nodeId == '58_a22' && commentSign == '10') {
                        comitData.paramMap = {
                          belongOrgId: response.data.belongOrgId,
                          belongOrgId1: response.data.belongOrgId1,
                          'beatBack': '0',
                          'apply': '1'
                        };
                      } else {
                        comitData.paramMap = {
                          belongOrgId: response.data.belongOrgId,
                          belongOrgId1: response.data.belongOrgId1,
                          'beatBack': '0'
                        };
                      }
                      yufp.service.request({// 先进行保存
                        url: me.urls.saveUrl,
                        data: comitData,
                        method: 'POST',
                        callback: function (code, message, response) {
                          var sign = response.data.sign;
                          if (sign == '0') {
                            comitData.wfSign = me.wfSign;
                            if (commentSign == '10') { // 同意
                              me.openNodeFn();
                            } else if (commentSign == '40') { // 退回
                              comitData.isDraft = me.isDraft;
                              me.$confirm('确定要执行退回操作吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                                center: true
                              }).then(function () {
                                yufp.service.request({
                                  method: 'POST',
                                  data: comitData,
                                  url: me.urls.returnBackUrl,
                                  callback: function (code, message, response) {
                                    var sign = response.data.sign;
                                    if (sign == '0') {
                                      me.$message({ message: response.data.tip, type: 'success' });
                                      // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                                      yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                                    } else {
                                      me.$message({ message: response.data.tip, type: 'error' });
                                    }
                                  }
                                });
                              });
                            } else if (commentSign == '30') {
                              yufp.service.request({// 打回节点选择列表
                                method: 'POST',
                                data: comitData,
                                url: me.urls.getCallBackNodesUrl,
                                callback: function (code, message, response) {
                                  if (response.data.length != '0') {
                                    for (var i = 0; i < response.data.length; i++) {
                                      var backNode = {
                                        nodeId: response.data[i].nodeId,
                                        nodeName: response.data[i].nodeName,
                                        selected: false
                                      };
                                      me.backNodeList.push(backNode);
                                      var user = [];
                                      var userList = response.data[i].userInfos;
                                      if (userList.length != '0') {
                                        for (var k = 0; k < userList.length; k++) {
                                          var userParam = {
                                            userId: userList[k].loginCode,
                                            userName: userList[k].userName
                                          };
                                          user.push(userParam);
                                        }
                                        me.usersList.push(user);
                                      } else {
                                        me.usersList = [];
                                      }
                                    }
                                    me.dialogFormVisible = true;
                                    me.dialogStatus = 'backNode';
                                  } else {
                                    me.$message({ message: '没有打回节点可以选择', type: 'warning' });
                                  }
                                }
                              });
                            } else if (commentSign == '21') { // 协办
                              me.dialogVisibleAssistUser = true;
                              me.dialogStatus = 'assist';
                              var assistParam = {
                                instuCde: yufp.session.instu.code
                              };
                              var tempParam = {
                                condition: JSON.stringify(assistParam)
                              };
                              me.$nextTick(function () {
                                me.$refs.assistUserList.remoteData(tempParam);
                              });
                            } else if (commentSign == '11') { // 转办
                              me.dialogVisibleChangeUser = true;
                              me.dialogStatus = 'changeUser';
                              me.$nextTick(function () {
                                me.$refs.changeUserList.remoteData(me.commonParams);
                              });
                            } else if (commentSign == '50') { // 跳转
                              // 获取跳转节点列表
                              yufp.service.request({
                                method: 'POST',
                                data: comitData,
                                async: false,
                                url: backend.echainService + '/api/joincore/wfGetJumpNodes',
                                callback: function (code, message, response) {
                                  var jumpUser = response.data;
                                  for (var i = 0; i < jumpUser.length; i++) {
                                    var option = {};
                                    option.key = jumpUser[i].nodeId;
                                    option.value = jumpUser[i].nodeName;
                                    me.jumpOptions.push(option);
                                  }
                                  me.dialogVisibleJump = true;
                                  me.dialogStatus = 'jump';
                                }
                              });
                            } else if (commentSign == '80') { // 挂起
                              me.$confirm('确定要执行挂起操作吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                                center: true
                              }).then(function () {
                                yufp.service.request({
                                  method: 'POST',
                                  data: comitData,
                                  url: me.urls.wfHangUrl,
                                  callback: function (code, message, response) {
                                    var sign = response.data.sign;
                                    if (sign == '0') {
                                      me.$message({ message: response.data.tip, type: 'success' });
                                      // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                                      yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                                    } else {
                                      me.$message({ message: response.data.tip, type: 'error' });
                                    }
                                  }
                                });
                              });
                            } else if (commentSign == '20') { // 否决
                              me.$confirm('确定要执行否决操作吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                                center: true
                              }).then(function () {
                                me.refuseFn();
                              });
                            } else {
                              me.$message({ message: '提交失败', type: 'error' });
                            }
                          } else {
                            me.$message({ message: response.data.tip, type: 'error' });
                          }
                        }
                      });
                    }
                  }
                });
              } else {
                yufp.service.request({// 先进行保存
                  url: me.urls.saveUrl,
                  data: comitData,
                  method: 'POST',
                  callback: function (code, message, response) {
                    var sign = response.data.sign;
                    if (sign == '0') {
                      comitData.wfSign = me.wfSign;
                      if (commentSign == '10') { // 同意
                        me.openNodeFn();
                      } else if (commentSign == '40') { // 退回
                        comitData.isDraft = me.isDraft;
                        me.$confirm('确定要执行退回操作吗？', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning',
                          center: true
                        }).then(function () {
                          yufp.service.request({
                            method: 'POST',
                            data: comitData,
                            url: me.urls.returnBackUrl,
                            callback: function (code, message, response) {
                              var sign = response.data.sign;
                              if (sign == '0') {
                                me.$message({ message: response.data.tip, type: 'success' });
                                // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                                yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                              } else {
                                me.$message({ message: response.data.tip, type: 'error' });
                              }
                            }
                          });
                        });
                      } else if (commentSign == '30') {
                        yufp.service.request({// 打回节点选择列表
                          method: 'POST',
                          data: comitData,
                          url: me.urls.getCallBackNodesUrl,
                          callback: function (code, message, response) {
                            if (response.data.length != '0') {
                              for (var i = 0; i < response.data.length; i++) {
                                var backNode = {
                                  nodeId: response.data[i].nodeId,
                                  nodeName: response.data[i].nodeName,
                                  selected: false
                                };
                                me.backNodeList.push(backNode);
                                var user = [];
                                var userList = response.data[i].userInfos;
                                if (userList.length != '0') {
                                  for (var k = 0; k < userList.length; k++) {
                                    var userParam = {
                                      userId: userList[k].loginCode,
                                      userName: userList[k].userName
                                    };
                                    user.push(userParam);
                                  }
                                  me.usersList.push(user);
                                } else {
                                  me.usersList = [];
                                }
                              }
                              me.dialogFormVisible = true;
                              me.dialogStatus = 'backNode';
                            } else {
                              me.$message({ message: '没有打回节点可以选择', type: 'warning' });
                            }
                          }
                        });
                      } else if (commentSign == '21') { // 协办
                        me.dialogVisibleAssistUser = true;
                        me.dialogStatus = 'assist';
                        var assistParam = {
                          instuCde: yufp.session.instu.code
                        };
                        var tempParam = {
                          condition: JSON.stringify(assistParam)
                        };
                        me.$nextTick(function () {
                          me.$refs.assistUserList.remoteData(tempParam);
                        });
                      } else if (commentSign == '11') { // 转办
                        me.dialogVisibleChangeUser = true;
                        me.dialogStatus = 'changeUser';
                        me.$nextTick(function () {
                          me.$refs.changeUserList.remoteData(me.commonParams);
                        });
                      } else if (commentSign == '50') { // 跳转
                        // 获取跳转节点列表
                        yufp.service.request({
                          method: 'POST',
                          data: comitData,
                          async: false,
                          url: backend.echainService + '/api/joincore/wfGetJumpNodes',
                          callback: function (code, message, response) {
                            var jumpUser = response.data;
                            for (var i = 0; i < jumpUser.length; i++) {
                              var option = {};
                              option.key = jumpUser[i].nodeId;
                              option.value = jumpUser[i].nodeName;
                              me.jumpOptions.push(option);
                            }
                            me.dialogVisibleJump = true;
                            me.dialogStatus = 'jump';
                          }
                        });
                      } else if (commentSign == '80') { // 挂起
                        me.$confirm('确定要执行挂起操作吗？', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning',
                          center: true
                        }).then(function () {
                          yufp.service.request({
                            method: 'POST',
                            data: comitData,
                            url: me.urls.wfHangUrl,
                            callback: function (code, message, response) {
                              var sign = response.data.sign;
                              if (sign == '0') {
                                me.$message({ message: response.data.tip, type: 'success' });
                                // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                                yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                              } else {
                                me.$message({ message: response.data.tip, type: 'error' });
                              }
                            }
                          });
                        });
                      } else if (commentSign == '20') { // 否决
                        me.$confirm('确定要执行否决操作吗？', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning',
                          center: true
                        }).then(function () {
                          me.refuseFn();
                        });
                      } else {
                        me.$message({ message: '提交失败', type: 'error' });
                      }
                    } else {
                      me.$message({ message: response.data.tip, type: 'error' });
                    }
                  }
                });
              }
              // var saveUrl = me.urls.saveUrl;
            } else {
              me.$message({ message: '请检查输入项是否合法', type: 'warning' });
              return false;
            }
          });
        },
        openNodeFn: function () { // 下一步骤页面节点选择
          var me = this;
          var param = {};
          yufp.extend(param, me.commonParams);
          if (me.subFlag) { // 子流程发起判断
            me.subFlag = false;
            param.instanceId = me.subInstanceId;
            param.nodeId = me.subNodeId;
          }
          yufp.service.request({
            url: backend.echainService + '/api/joincore/wfGetNextNodes',
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              if (response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) { // 获取节点列表
                  var nextNode = {
                    nodeId: response.data[i].nodeId,
                    nodeName: response.data[i].nodeName,
                    selected: '0',
                    users: '',
                    nodeType: response.data[i].nodeType
                  };
                  me.nextNodeList.push(nextNode);
                }
                if (me.nodeRouterType == '2' || me.nodeRouterType == '4') { // 判断节点是单选还是多选
                  me.dialogFormVisibleCheck = true;
                  me.dialogStatus = 'nextNodeCheck';
                } else {
                  if (response.data[0].nodeName.indexOf('结束') != -1) {
                    me.nextNodeList[0].selected = '1';
                    me.saveCreateFn();
                  } else {
                    me.dialogFormVisibleRadio = true;
                    me.dialogStatus = 'nextNode';
                  }
                }
              } else {
                me.$message({ message: '没有下一节点', type: 'error' });
              }
            }
          });
        },
        openNodeUsersFn: function (val, index) { // 下一节点处理人选择
          var me = this;
          var param = {};
          me.index = index;
          param.sessionInstuCde = yufp.session.instu.code;
          param.sessionOrgCode = yufp.session.org.code;
          param.sessionLoginCode = yufp.session.user.loginCode;
          param.nodeId = val;
          param.instanceId = me.instanceId;
          yufp.service.request({
            url: backend.echainService + '/api/joincore/wfGetNodeUsers',
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              if (response.data.length >= 1) {
                if (response.data[0].isMulteit == '0') { // 判断节点处理人是单选还是多选
                  me.dialogVisibleNodeUser = true;
                  me.dialogStatus = 'nextUser';
                  if (me.wfSign == 'YJKHSP' && param.nodeId == '58_a22') {
                    me.nodeUserParams = { applyNo: me.bizSeqNo };
                    me.urls.nodeUserUrl = backend.custpubService + 'api/ocrmfcitransapply/getUsersNode';
                  }
                  me.$nextTick(function () {
                    me.$refs.nodeUserList.remoteData(param);
                  });
                } else {
                  me.dialogVisibleNodeUserCheck = true;
                  me.dialogStatus = 'nextUserCheck';
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
          param.nextNodeId = nextNodeId;
          param.entrustModel = me.agentModel;
          param.bizSeqNo = me.bizSeqNo;
          param.applType = me.applType;
          param.wfSign = me.wfSign;
          var messageTip = '';
          if (!nextNodeId) {
            me.$message({ message: '请选择下一节点', type: 'error' });
            return false;
          }
          if (nextNodeName.indexOf('结束') == -1) {
            if (!me.nextNodeUserForTip || !nextUsers) {
              me.$message({ message: '请选择下一节点处理人', type: 'error' });
              return false;
            }
            // messageTip = '流程发起成功，下一节点为:' + nextNodeName + ' ( ' + nextNodeId + ' )' + ',下一节点处理人为:' + me.nextNodeUserForTip;
            messageTip = '流程发起成功，下一节点为:' + nextNodeName + ' ( ' + me.nextNodeUserForTip + ' ' + nextUsers + ' )';
          } else {
            messageTip = '流程审批结束';
          }
          yufp.service.request({
            url: backend.echainService + '/api/joincore/wfComplete',
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              if (response.data != null) {
                if (nextNodeName.indexOf('结束') != -1) {
                  me.$confirm(messageTip, '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: 'success',
                    center: true
                  }).then(function () {
                    me.dialogFormVisibleRadio = false;
                    me.dialogFormVisibleCheck = false;
                    // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                    yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                    yufp.util.butLogInfo(hashCode, '申请信息流程', '提交');
                  });
                } else {
                  me.$confirm(messageTip, '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: 'success',
                    center: true
                  }).then(function () {
                    me.dialogFormVisibleRadio = false;
                    me.dialogFormVisibleCheck = false;
                    // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                    yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                    yufp.util.butLogInfo(hashCode, '申请信息流程', '提交');
                  });
                }
              } else {
                me.$message({ message: response.data.tip, type: 'error' });
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
        returnNodeUser: function () { // 选取下一节点处理人（单选）
          var me = this;
          if (this.$refs.nodeUserList.selections.length !== 1) {
            this.$message({ message: '请选择一条数据!', type: 'warning' });
            return false;
          }
          var row = this.$refs.nodeUserList.selections[0];
          me.users = row.loginCode;
          me.userNames = row.userName;
          me.nextNodeUserForTip = row.userName;
          var param = {};
          param.sessionInstuCde = yufp.session.instu.code;
          param.sessionOrgCode = yufp.session.org.code;
          param.sessionLoginCode = yufp.session.user.loginCode;
          param.applType = me.applType;
          param.users = row.loginCode;
          yufp.service.request({
            url: backend.echainService + '/api/joincore/wfCheckAgent',
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              if (response.data == 1) { // 判断是否设置了委托
                me.dialogVisibleAgent = true;
                me.dialogStatus = 'agent';
              } else {
                me.nextNodeList[me.index].users = row.loginCode;
                me.nextNodeList[me.index].userNames = row.userName;
                me.dialogVisibleNodeUser = false;
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
          param.sessionInstuCde = yufp.session.instu.code;
          param.sessionOrgCode = yufp.session.org.code;
          param.sessionLoginCode = yufp.session.user.loginCode;
          param.applType = me.applType;
          param.users = data;
          yufp.service.request({
            url: backend.echainService + '/api/joincore/wfCheckAgent',
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              if (response.data == 1) { // 判断是否设置了委托
                me.dialogVisibleAgent = true;
                me.dialogStatus = 'agent';
              } else {
                me.nextNodeList[me.index].users = data;
                me.nextNodeList[me.index].userNames = userTemp;
                me.dialogVisibleNodeUserCheck = false;
              }
            }
          });
        },
        agentChange: function (val) { // 委托模式
          this.agent = val;
        },
        saveAgent: function () { // 保存委托模式
          var me = this;
          me.agentModel = me.agent;
          me.dialogVisibleAgent = false;
          me.dialogVisibleNodeUser = false;
          me.nextNodeList[me.index].users = me.users;
        },
        wfCallBack: function () { // 确定打回
          var me = this;
          var param = {};
          yufp.extend(param, me.commonParams);
          param.callBackModel = me.callBackModel;
          param.nextNodeId = me.backNodeModel;
          param.nextNodeUser = me.userModel;
          if (param.callBackModel == '') {
            me.$message({ message: '请选择打回后提交方式', type: 'error' });
            return false;
          }
          if (param.nextNodeId == '') {
            me.$message({ message: '请选择打回节点', type: 'error' });
            return false;
          }
          if (param.nextNodeUser == '') {
            me.$message({ message: '请选择打回处理人员', type: 'error' });
            return false;
          }
          var user = '';
          if (me.backNodeList) {
            for (var i = 0; i < me.backNodeList.length; i++) {
              var item = me.backNodeList[i];
              if (item.nodeId == param.nextNodeId) {
                user = item.nodeName;
              }
            }
          }
          var userName = '';
          if (me.usersList) {
            for (var i = 0; i < me.usersList.length; i++) {
              var uitem = me.usersList[i];
              for (var k = 0; k < uitem.length; k++) {
                var uuitem = uitem[k];
                if (uuitem.userId == param.nextNodeUser) {
                  userName = uuitem.userName;
                }
              }
            }
          }
          yufp.service.request({
            method: 'POST',
            data: param,
            url: me.urls.callBackUrl,
            callback: function (code, message, response) {
              var sign = response.data.sign;
              if (sign == '0') {
                me.dialogFormVisible = false;
                me.$message({ message: '流程打回成功，打回节点为' + user + ' ( ' + param.nextNodeId + ' )' + ',打回处理人为' + userName, type: 'success' });
                // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
              } else {
                me.$message({ message: response.data.tip, type: 'error' });
              }
            }
          });
        },
        wfJumpFn: function () { // 确定跳转
          var me = this;
          var myform = me.$refs.jumpUserForm;
          var jumpForm = {
            nextNodeId: me.jumpUserForm.nextNodeId,
            nextNodeUser: me.jumpUserForm.nextNodeUser
          };
          if (jumpForm.nextNodeId == '') {
            me.$message({ message: '请选择跳转节点', type: 'error' });
            return false;
          }
          if (jumpForm.nextNodeUser == '') {
            me.$message({ message: '请选择跳转节点处理人员', type: 'error' });
            return false;
          }
          var user = '';
          if (me.jumpOptions) {
            for (var i = 0; i < me.jumpOptions.length; i++) {
              var item = me.jumpOptions[i];
              if (item.key == jumpForm.nextNodeId) {
                user = item.value;
              }
            }
          }
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, jumpForm);
              yufp.extend(comitData, me.commonParams);
              yufp.service.request({
                method: 'POST',
                data: comitData,
                url: me.urls.wfJumpUrl,
                callback: function (code, message, response) {
                  var sign = response.data.sign;
                  if (sign == '0') {
                    me.dialogVisibleJump = false;
                    me.$message({ message: '流程跳转成功，跳转节点为' + user + ' ( ' + jumpForm.nextNodeId + ' )' + ',跳转节点处理人为' + me.jumpUserForTip, type: 'success' });
                    // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                    yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                  } else {
                    me.$message({ message: response.data.tip, type: 'error' });
                  }
                }
              });
            }
          });
        },
        beforeNextClose: function () {
          var me = this;
          me.nextNodeList = [];
          me.radioModel = '';
          me.dialogFormVisibleRadio = false;
          me.dialogFormVisibleCheck = false;
        },
        wfSignInFn: function () { // 签收
          var me = this;
          this.$confirm('确定要执行签收操作吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              data: me.commonParams,
              url: backend.echainService + '/api/joincore/wfSignIn',
              callback: function (code, message, response) {
                var sign = response.data.sign;
                if (sign == '0') {
                  me.$message({ message: response.data.tip, type: 'success' });
                  // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                  yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                  yufp.util.butLogInfo(hashCode, '申请信息流程', '签收');
                } else {
                  me.$message({ message: response.data.tip, type: 'error' });
                }
              }
            });
          });
        },
        wfSignOffFn: function () { // 撤销签收
          var me = this;
          this.$confirm('确定要执行撤销签收操作吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              data: me.commonParams,
              url: backend.echainService + '/api/joincore/wfSignOff',
              callback: function (code, message, response) {
                var sign = response.data.sign;
                if (sign == '0') {
                  me.$message({ message: response.data.tip, type: 'success' });
                  // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                  yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                  yufp.util.butLogInfo(hashCode, '申请信息流程', '撤销签收');
                } else {
                  me.$message({ message: response.data.tip, type: 'error' });
                }
              }
            });
          });
        },
        wfTaskSignOffFn: function () { // 放回项目池
          var me = this;
          this.$confirm('确定要执行放回项目池操作吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              data: me.commonParams,
              url: backend.echainService + '/api/joincore/wfTaskSignOff',
              callback: function (code, message, response) {
                var sign = response.data.sign;
                if (sign == '0') {
                  me.$message({ message: response.data.tip, type: 'success' });
                  // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                  yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                  yufp.util.butLogInfo(hashCode, '申请信息流程', '放回项目池');
                } else {
                  me.$message({ message: response.data.tip, type: 'error' });
                }
              }
            });
          });
        },
        wfHangFn: function () { // 挂起
          var me = this;
          me.$confirm('确定要执行挂起操作吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              data: me.commonParams,
              url: me.urls.wfHangUrl,
              callback: function (code, message, response) {
                var sign = response.data.sign;
                if (sign == '0') {
                  me.$message({ message: response.data.tip, type: 'success' });
                  yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                  yufp.util.butLogInfo(hashCode, '申请信息流程', '挂起');
                } else {
                  me.$message({ message: response.data.tip, type: 'error' });
                }
              }
            });
          });
        },
        wfWakeFn: function () { // 唤醒或者激活
          var me = this;
          this.$confirm('确定要执行激活操作吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              data: me.commonParams,
              url: backend.echainService + '/api/joincore/wfWake',
              callback: function (code, message, response) {
                var sign = response.data.sign;
                if (sign == '0') {
                  me.$message({ message: response.data.tip, type: 'success' });
                  yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                  yufp.util.butLogInfo(hashCode, '申请信息流程', '唤醒/激活');
                } else {
                  me.$message({ message: response.data.tip, type: 'error' });
                }
              }
            });
          });
        },
        wfTakeBackFn: function () { // 拿回/收回
          var me = this;
          this.$confirm('确定要执行收回操作吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              data: me.commonParams,
              url: backend.echainService + '/api/joincore/wfTakeBack',
              callback: function (code, message, response) {
                var sign = response.data.sign;
                if (sign == '0') {
                  me.$message({ message: response.data.tip, type: 'success' });
                  // yufp.router.to("toDoWorkList",null,'toDoWorkList');
                  yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                  yufp.util.butLogInfo(hashCode, '申请信息流程', '拿回/收回');
                } else {
                  me.$message({ message: response.data.tip, type: 'error' });
                }
              }
            });
          });
        },
        refuseFn: function () { // 流程否决
          var me = this;
          var param = {};
          yufp.extend(param, me.commonParams);
          param.nextNodeUser = 'wfiSysNodeUser';
          param.nextNodeId = 'e0000';
          param.entrustModel = me.agentModel;
          param.bizSeqNo = me.bizSeqNo;
          param.applType = me.applType;
          param.wfSign = me.wfSign;
          param.commentSign = me.WfOperationForm.commentSign;// 操作标识

          yufp.service.request({
            url: backend.echainService + '/api/joincore/wfComplete',
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              if (response.data != null) {
                me.$confirm(response.data.tip, '提示', {
                  confirmButtonText: '确定',
                  showCancelButton: false,
                  type: 'success',
                  center: true
                }).then(function () {
                  yufp.router.to(me.returnBackFuncId, null, me.returnBackRootId);
                  yufp.util.butLogInfo(hashCode, '申请信息流程', '流程否决');
                });
              } else {
                me.$message({ message: response.data.tip, type: 'error' });
              }
            }
          });
        },
        wfUrgeFn: function () { // 催办
          var me = this;
          this.$confirm('确定要执行催办操作吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              data: me.commonParams,
              url: backend.echainService + '/api/joincore/wfUrge',
              callback: function (code, message, response) {
                var sign = response.data.sign;
                if (sign == '0') {
                  me.$message({ message: response.data.tip, type: 'success' });
                  yufp.router.to('toDoWorkList', null, 'toDoWorkList');
                  yufp.util.butLogInfo(hashCode, '申请信息流程', '催办');
                } else {
                  me.$message({ message: response.data.tip, type: 'error' });
                }
              }
            });
          });
        }
      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});
