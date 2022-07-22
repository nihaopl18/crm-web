
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('WF_SIGN_RESULT');
    yufp.lookup.reg('WF_SIGN_STATUS');
    yufp.lookup.reg('ZB_BIZ_CATE');
    yufp.custom.vue({
      el: '#WfiSignVoteList',
      data: function () {
        var me = this;
        return {
          height: yufp.custom.viewSize().height - 100,
          urls: {
            dataUrl: backend.echainService + '/api/joincore/wfGetSignTaskVoteInfosByModel', // 会签投票列表
            wfGetSignVoteInfoUrl: backend.echainService + '/api/joincore/wfGetSignVoteInfo', // 会签基本信息
            wfSubmitSignVoteUrl: backend.echainService + '/api/joincore/wfSubmitSignVote'
          },
          WfiSignVoteButtons: [
            {label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              show: true,
              click: function (model, valid) {
                if (valid) {
                  var param = {
                    condition: JSON.stringify(model)
                  };
                  me.$refs.WfiSignVoteList.remoteData(param);
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
            svVoteId: '',
            stTaskId: ''
          },
          commonParams: {// 基本参数
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          nodeUserResquestType: 'POST',
          dataParams: {},
          formDisabled: false,
          dialogFormVisible: false,
          title: '会签投票',
          stTaskId: '',
          tableColumns: [
            { label: '业务流水号', prop: 'serno', resizable: true },
            { label: '投票ID', prop: 'svVoteId', resizable: true },
            { label: '任务名称', prop: 'stTaskName', resizable: true },
            { label: '任务执行人', prop: 'svExeUser', resizable: true },
            { label: '投票结果', prop: 'svResult', resizable: true, dataCode: 'WF_SIGN_RESULT'},
            { label: '任务状态', prop: 'svStatus', resizable: true, dataCode: 'WF_SIGN_STATUS'},
            { label: '任务开始时间', prop: 'svStartTime', resizable: true },
            { label: '任务结束时间', prop: 'svEndTime', resizable: true },
            { label: '要求完成时间', prop: 'svRequestTime', resizable: true, hidden: true}
          ],
          updateFields: [{
            columnCount: 2,
            fields: [
              { field: 'serno', label: '业务流水号', disabled: true, type: 'input'},
              { field: 'bizType', label: '业务类型', disabled: true, type: 'select', dataCode: 'ZB_BIZ_CATE'},
              { field: 'stTaskName', label: '任务名称', disabled: true, type: 'input'},
              { field: 'stExeUser', label: '会签秘书', disabled: true, type: 'input'}
            ]},
          {
            columnCount: 1,
            fields: [
              { field: 'svResult',
                label: '投票结果',
                type: 'select',
                dataCode: 'WF_SIGN_RESULT',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur'}
                ]},
              { field: 'svAdvice',
                label: '投票意见',
                type: 'textarea',
                rows: 2,
                rules: [
                  {required: true, message: '必填项', trigger: 'blur'}
                ]
              }
            ]
          }, {
            columnCount: 2,
            fields: [
              { field: 'svStartTime', label: '任务开始时间', type: 'input', disabled: true},
              { field: 'svStatus', label: '任务状态', type: 'select', dataCode: 'WF_SIGN_STATUS', disabled: true}
            ]
          }]
        };
      },
      methods: {
        voteWfiSignTask: function () { // 投票
          var me = this;
          if (this.$refs.WfiSignVoteList.selections.length !== 1) {
            this.$message({message: '请选择一条数据!', type: 'warning'});
            return false;
          }
          var row = this.$refs.WfiSignVoteList.selections[0];
          if (row.svStatus == '211') {
            var comitData = {};
            yufp.extend(comitData, me.commonParams);
            comitData.stTaskId = row.stTaskId;
            comitData.svVoteId = row.svVoteId;
            me.stTaskId = row.stTaskId;
            yufp.service.request({
              method: 'POST',
              data: comitData,
              url: me.urls.wfGetSignVoteInfoUrl,
              callback: function (code, message, response) {
                me.dialogFormVisible = true;
                me.$nextTick(function () {
                  me.$refs.WfiSignVoteForm.formModel = response.data;
                });
              }
            });
          } else {
            me.$message({message: '对不起！该任务已经投票或者任务已结束', type: 'warning'});
          }
        },
        saveFn: function () { // 保存
          var me = this;
          var myform = me.$refs.WfiSignVoteForm;
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, me.commonParams);
              yufp.extend(comitData, myform.formModel);
              var saveUrl = me.urls.wfSubmitSignVoteUrl;
              yufp.service.request({
                url: saveUrl,
                data: comitData,
                method: 'POST',
                callback: function (code, message, response) {
                  me.$message({message: '投票成功', type: 'success'});
                  me.dialogFormVisible = false;
                  me.$refs.WfiSignVoteList.remoteData();
                }
              });
            } else {
              me.$message({message: '请检查输入项是否合法', type: 'warning'});
              return false;
            }
          });
        },
        resetForm: function () {
          var me = this;
          me.$refs.WfiSignVoteForm.formModel.svResult = '';
          me.$refs.WfiSignVoteForm.formModel.svAdvice = '';
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