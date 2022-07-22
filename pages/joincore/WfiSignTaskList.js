
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('ZB_BIZ_CATE');
    yufp.lookup.reg('WF_SIGN_STATUS');
    yufp.lookup.reg('WF_SIGN_RESULT');
    yufp.custom.vue({
      el: '#WfiSignTaskList',
      data: function () {
        var me = this;
        return {
          height: yufp.custom.viewSize().height - 100,
          urls: {
            dataUrl: backend.echainService + '/api/joinbeanch/getUserSignTasks', // 会签列表
            signTaskInfoUrl: backend.echainService + '/api/joincore/wfGetSignTaskInfo', // 会签基本信息
            stMembersUrl: backend.echainService + '/api/joincore/wfGetSignTaskUsers', // 会议成员选择
            saveUrl: backend.echainService + '/api/joincore/wfSaveSignTask', // 保存
            wfBeginSignTaskUrl: backend.echainService + '/api/joincore/wfBeginSignTask', // 开始会议
            wfCancleSignTaskUrl: backend.echainService + '/api/joincore/wfCancleSignTask', // 取消会议
            wfEndSignTaskUrl: backend.echainService + '/api/joincore/wfFinishSignTask', // 终止会议
            wfFinishSignTaskUrl: backend.echainService + '/api/joincore/wfEndSignTask', // 结束会议
            wfReBeginSignTaskUrl: backend.echainService + '/api/joincore/wfReBeginSignTask', // 重开会议
            signTaskVotesUrl: backend.echainService + '/api/joincore/wfGetSignTaskVoteInfosByModel'// 会议成员信息
          },
          WfiSignTaskButtons: [
            {label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              show: true,
              click: function (model, valid) {
                if (valid) {
                  model.sessionLoginCode = yufp.session.user.loginCode;
                  var param = {
                    condition: JSON.stringify(model)
                  };
                  me.$refs.WfiSignTaskList.remoteData(param);
                }
              }
            },
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
          ],
          queryFields: [
            {placeholder: '业务流水号', field: 'serno', type: 'input'},
            {placeholder: '任务名称', field: 'stTaskName', type: 'input'}
          ],
          query: {
            serno: '',
            stTaskName: ''
          },
          commonParams: {// 基本参数
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          dataParams: {condition: JSON.stringify({sessionLoginCode: yufp.session.user.loginCode})},
          stMembersParams: {condition: JSON.stringify({stTaskId: me.stTaskId})},
          formDisabled: false,
          dialogFormVisible: false,
          // dialogVisible_stMembers:false,
          nodeUserResquestType: 'POST',
          dialogStatus: '',
          dutyCde: '',
          stTaskId: '',
          disabled: true,
          cardHidden: true,
          saveHidden: true,
          wfBeginSignTaskHidden: true,
          wfReBeginSignTaskHidden: true,
          wfEndSignTaskHidden: true,
          wfFinishSignTaskHidden: true,
          wfCancleSignTaskHidden: false,
          memberDisabled: false,
          textMap: {
            wfSign: '会签事项处理',
            stMembers: '会议成员选择'
          },
          formTitle: '会签任务',
          userTitle: '会签成员',
          tableColumns: [
            { label: '业务流水号', prop: 'serno', resizable: true },
            { label: '业务类型', prop: 'bizType', resizable: true, dataCode: 'ZB_BIZ_CATE'},
            { label: '任务ID', prop: 'stTaskId', resizable: true, hidden: true},
            { label: '任务名称', prop: 'stTaskName', resizable: true },
            { label: '会议安排人', prop: 'stExeUser', resizable: true },
            { label: '执行机构', prop: 'stExeOrg', resizable: true },
            { label: '会议状态', prop: 'stTaskStatus', resizable: true, dataCode: 'WF_SIGN_STATUS'},
            { label: '开始时间', prop: 'stStartTime', resizable: true},
            { label: '结束时间', prop: 'stEndTime', resizable: true },
            { label: '会议结果', prop: 'stResult', resizable: true, dataCode: 'WF_SIGN_RESULT'},
            { label: '流程节点ID', prop: 'wfiNodeId', resizable: true, hidden: true},
            { label: '流程实例号', prop: 'wfiInstanceId', resizable: true, hidden: true}
          ],
          stMembersTableColumns: [
            { label: '任务执行人', prop: 'svExeUser', resizable: true },
            { label: '投票结果', prop: 'svResult', resizable: true, dataCode: 'WF_SIGN_RESULT'},
            { label: '任务状态', prop: 'svStatus', resizable: true, dataCode: 'WF_SIGN_STATUS'},
            { label: '任务开始时间', prop: 'svStartTime', resizable: true },
            { label: '任务结束时间', prop: 'svEndTime', resizable: true},
            { label: '意见', prop: 'svAdvice', resizable: true }
          ],
          wfSignApproveForm: {
            stTaskName: '',
            stConfig: '',
            serno: '',
            bizType: '',
            stExeUser: '',
            stExeOrg: '',
            stStartTime: '',
            stMembers: [],
            stLeader: '',
            stTotalCount: '',
            stVoteCount: '',
            stTaskStatus: ''
          },
          stTaskStatusOptions: [
            {key: '210', value: '未开始'},
            {key: '212', value: '正在投票'},
            {key: '213', value: '投票结束'},
            {key: '214', value: '会议重开'},
            {key: '216', value: '会议取消'},
            {key: '217', value: '会议结束'}
          ],
          stLeaderOptions: [],
          stMembersOptions: [],
          rules: {// 验证规则
            stLeader: [
              { required: true, message: '必填项', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        doWfiSignTask: function () {
          var me = this;
          if (this.$refs.WfiSignTaskList.selections.length !== 1) {
            this.$message({message: '请选择一条数据!', type: 'warning'});
            return false;
          }
          var row = this.$refs.WfiSignTaskList.selections[0];
          var stTaskStatus = row.stTaskStatus;
          var stResult = row.stResult;
          if (stTaskStatus == '214' || stTaskStatus == '216' || stTaskStatus == '217') {
            me.$message({message: '会议已经结束，不能进行修改!', type: 'warning'});
            return false;
          } else if (stTaskStatus == '210') {
            me.memberDisabled = false;
            me.saveHidden = false;
            me.wfBeginSignTaskHidden = false;
            me.wfCancleSignTaskHidden = false;
          } else if (stTaskStatus == '212') {
            me.cardHidden = false;
            me.wfReBeginSignTaskHidden = false;
            me.wfEndSignTaskHidden = false;
            me.wfCancleSignTaskHidden = false;
            me.memberDisabled = true;
          } else if (stTaskStatus == '213') {
            if (stResult == '112') {
              me.wfReBeginSignTaskHidden = false;
              me.wfCancleSignTaskHidden = false;
              me.wfFinishSignTaskHidden = true;
            } else {
              me.wfFinishSignTaskHidden = false;
              me.wfCancleSignTaskHidden = true;
              me.wfReBeginSignTaskHidden = true;
            }
            me.cardHidden = false;
            me.memberDisabled = true;
          }
          var comitData = {};
          yufp.extend(comitData, me.commonParams);
          comitData.stTaskId = row.stTaskId;
          me.stTaskId = row.stTaskId;
          yufp.service.request({
            method: 'POST',
            data: comitData,
            url: me.urls.signTaskInfoUrl,
            callback: function (code, message, response) {
              me.dutyCde = response.data.stDuty;
              var params = {
                condition: JSON.stringify({dutyCde: me.dutyCde})
              };
              var stleader = response.data.stLeader;
              yufp.service.request({
                method: 'GET',
                data: params,
                url: me.urls.stMembersUrl,
                callback: function (code, message, response) {
                  if (response.data) {
                    var members = response.data;
                    for (var i = 0; i < members.length; i++) {
                      var option = {};
                      option.key = members[i].loginCode;
                      option.value = members[i].userName;
                      me.stMembersOptions.push(option);
                      if (stleader) {
                        if (option.key == stleader) {
                          me.stLeaderOptions.push(option);
                        }
                      }
                    }
                  }
                }
              });
              me.dialogFormVisible = true;
              me.dialogStatus = 'wfSign';
              var s = [];
              if (response.data.stMembers) {
                var m = response.data.stMembers.split(',');
                for (var i = 0; i < m.length; i++) {
                  s.push(m[i]);
                }
              }
              response.data.stMembers = s;
              me.wfSignApproveForm = response.data;
              var param = {condition: JSON.stringify({stTaskId: me.stTaskId})};
              if (!me.cardHidden) {
                me.$nextTick(function () {
                  me.$refs.stMembersList.remoteData(param);
                });
              }
            }
          });
        },
        memberChange: function (val) {
          var me = this;
          if (val) {
            me.wfSignApproveForm.stTotalCount = val.length;
            for (var i = 0; i < val.length; i++) {
              var item = val[i];
              for (var k = 0; k < me.stMembersOptions.length; k++) {
                var option = {};
                option.key = item;
                if (me.stMembersOptions[k].key == item) {
                  option.value = me.stMembersOptions[k].value;
                }
                if (me.stLeaderOptions) {
                  var flag = false;
                  for (var j = 0; j < me.stLeaderOptions.length; j++) {
                    var leader = me.stLeaderOptions[j].key;
                    if (leader == option.key) {
                      flag = true;
                    }
                  }
                  if (!flag) {
                    me.stLeaderOptions.push(option);
                  }
                } else {
                  me.stLeaderOptions.push(option);
                }
              }
            }
          } else {
            me.wfSignApproveForm.stTotalCount = '0';
          }
        },
        removeTag: function (val) {
          var me = this;
          me.wfSignApproveForm.stLeader = '';
          me.stLeaderOptions = [];
          if (me.wfSignApproveForm.stMembers) {
            var value = me.wfSignApproveForm.stMembers;
            if (value) {
              me.wfSignApproveForm.stTotalCount = value.length;
              for (var i = 0; i < value.length; i++) {
                var item = value[i];
                for (var k = 0; k < me.stMembersOptions.length; k++) {
                  var option = {};
                  option.key = item;
                  if (me.stMembersOptions[k].key == item) {
                    option.value = me.stMembersOptions[k].value;
                  }
                  me.stLeaderOptions.push(option);
                }
              }
            }
          } else {
            me.wfSignApproveForm.stTotalCount = '0';
          }
        },
        beforeClose: function () {
          var me = this;
          me.stMembersOptions = [];
          me.stLeaderOptions = [];
          me.$refs.wfSignApproveForm.resetFields();
          me.dialogFormVisible = false;
          me.$refs.WfiSignTaskList.remoteData(me.dataParams);
          me.saveHidden = true;
          me.wfBeginSignTaskHidden = true;
          me.wfReBeginSignTaskHidden = true;
          me.wfEndSignTaskHidden = true;
          me.wfFinishSignTaskHidden = true;
          me.wfCancleSignTaskHidden = false;
        },
        saveFn: function () { // 保存
          var me = this;
          var myform = me.$refs.wfSignApproveForm;
          if (!me.wfSignApproveForm.stMembers) {
            me.$message({message: '请选择本次会议成员', type: 'warning'});
            return false;
          }
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, me.wfSignApproveForm);
              var member = comitData.stMembers;
              var param = '';
              for (var i = 0; i < member.length; i++) {
                if (i < member.length - 1) {
                  param = param + member[i] + ',';
                }
                param = param + member[i];
              }
              comitData.stMembers = param;
              var saveUrl = me.urls.saveUrl;
              yufp.service.request({
                url: saveUrl,
                data: comitData,
                method: 'POST',
                callback: function (code, message, response) {
                  var sign = response.data;
                  if (sign == '1') {
                    me.$message({message: '保存成功', type: 'success'});
                  } else {
                    me.$message({message: '保存失败', type: 'error'});
                  }
                }
              });
            } else {
              me.$message({message: '请检查输入项是否合法', type: 'warning'});
              return false;
            }
          });
        },
        wfBeginSignTask: function () { // 开始会议
          var me = this;
          var myform = me.$refs.wfSignApproveForm;
          if (!me.wfSignApproveForm.stMembers) {
            me.$message({message: '请选择本次会议成员', type: 'warning'});
            return false;
          }
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, me.wfSignApproveForm);
              var member = comitData.stMembers;
              var param = member.join(',');
              comitData.stMembers = param;
              var saveUrl = me.urls.saveUrl;
              yufp.service.request({
                url: saveUrl,
                data: comitData,
                method: 'POST',
                callback: function (code, message, response) {
                  var sign = response.data;
                  if (sign == '1') {
                    var param = {};
                    yufp.extend(param, me.commonParams);
                    param.stTaskId = me.stTaskId;
                    yufp.service.request({
                      url: me.urls.wfBeginSignTaskUrl,
                      data: param,
                      method: 'POST',
                      callback: function (code, message, response) {
                        var sign = response.data;
                        if (sign == '1') {
                          me.$message({message: '开始会议成功', type: 'success'});
                          me.memberDisabled = true;
                          me.cardHidden = false;
                          var params = {condition: JSON.stringify({stTaskId: me.stTaskId})};
                          me.$nextTick(function () {
                            me.$refs.stMembersList.remoteData(params);
                          });
                          me.saveHidden = true;
                          me.wfBeginSignTaskHidden = true;
                          me.wfReBeginSignTaskHidden = false;
                          me.wfEndSignTaskHidden = false;
                          me.memberDisabled = false;
                        } else {
                          me.$message({message: '开始会议失败', type: 'error'});
                        }
                      }
                    });
                  } else {
                    me.$message({message: '保存失败', type: 'error'});
                  }
                }
              });
            } else {
              me.$message({message: '请检查输入项是否合法', type: 'warning'});
              return false;
            }
          });
        },
        wfCancleSignTask: function () { // 取消会议
          var me = this;
          var param = {};
          yufp.extend(param, me.commonParams);
          param.stTaskId = me.stTaskId;
          yufp.service.request({
            url: me.urls.wfCancleSignTaskUrl,
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              var sign = response.data;
              if (sign == '1') {
                me.$message({message: '取消会议成功', type: 'success'});
                me.dialogFormVisible = false;
                var params = {condition: JSON.stringify({sessionLoginCode: yufp.session.user.loginCode})};
                me.$refs.WfiSignTaskList.remoteData(params);
              } else {
                me.$message({message: '取消会议失败', type: 'error'});
              }
            }
          });
        },

        wfReBeginSignTask: function () { // 重开会议
          var me = this;
          var param = {};
          yufp.extend(param, me.commonParams);
          param.stTaskId = me.stTaskId;
          yufp.service.request({
            url: me.urls.wfReBeginSignTaskUrl,
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              me.$message({message: '重开会议成功', type: 'success'});
              // me.beforeClose();
              me.wfBeginSignTaskHidden = false;
              me.memberDisabled = false;
              me.cardHidden = true;
              me.saveHidden = false;
              me.wfReBeginSignTaskHidden = true;
              me.wfEndSignTaskHidden = true;
              me.memberDisabled = false;
              me.stLeaderOptions = [];
              me.wfSignApproveForm.stMembers = [];
              me.wfSignApproveForm.stLeader = '';
            }
          });
        },
        wfEndSignTask: function () { // 终止会议会议
          var me = this;
          var param = {};
          yufp.extend(param, me.commonParams);
          param.stTaskId = me.stTaskId;
          yufp.service.request({
            url: me.urls.wfEndSignTaskUrl,
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              var sign = response.data;
              if (sign == '1') {
                me.$message({message: '终止会议成功', type: 'success'});
                me.dialogFormVisible = false;
                me.$refs.WfiSignTaskList.remoteData(me.dataParams);
              } else {
                me.$message({message: '终止会议失败', type: 'error'});
              }
            }
          });
        },
        wfFinishSignTask: function () { // 结束会议wfFinishSignTaskUrl
          var me = this;
          var param = {};
          yufp.extend(param, me.commonParams);
          param.stTaskId = me.stTaskId;
          yufp.service.request({
            url: me.urls.wfFinishSignTaskUrl,
            data: param,
            method: 'POST',
            callback: function (code, message, response) {
              var sign = response.data;
              if (sign == '1') {
                me.$message({message: '结束会议成功', type: 'success'});
                me.dialogFormVisible = false;
                me.$refs.WfiSignTaskList.remoteData(me.dataParams);
              } else {
                me.$message({message: '结束会议失败', type: 'error'});
              }
            }
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