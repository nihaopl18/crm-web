
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('WF_APP_STATUS');
    yufp.custom.vue({
      el: '#myWorkEndList',
      data: function () {
        var me = this;
        return {
          urls: {
            dataUrl: backend.echainService + '/api/joinbeanch/getUserInitEnds'
            // 列表数据查询
          },
          myWorkListButtons: [
            {label: '查询',
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
                  me.$refs.myWorkListEndList.remoteData(param);
                }
              }
            },
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
          ],
          dataParams: {condition: JSON.stringify({sessionLoginCode: yufp.session.user.loginCode})},
          queryFields: [
            {placeholder: '申请流水号', field: 'bizSeqNo', type: 'input'},
            {placeholder: '客户名称', field: 'custName', type: 'input'}
          ],
          tableColumns: [
            { label: '申请流水号',
              prop: 'bizSeqNo',
              template: function () {
                return '<template scope="scope">\
                                <a style="text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-click\', scope.row)">{{ scope.row.bizSeqNo }}</a>\
                               </template>';
              }},
            { label: '流程实例号', prop: 'instanceId'},
            { label: '流程标识', prop: 'wfSign'},
            { label: '客户名称', prop: 'custName' },
            { label: '流程开始时间', prop: 'wfStartTime' },
            { label: '流程结束时间', prop: 'wfEndTime' },
            { label: '花费时间', prop: 'costTimes' },
            { label: '最后办理人', prop: 'lastUser' },
            { label: '流程名称', prop: 'wfName'},
            { label: '审批状态', prop: 'spStatus', dataCode: 'WF_APP_STATUS'}
          ]
        };
      },
      methods: {
        customClick: function (reqData) {
          var action = {
            urge: '1'
          };
          reqData.action = action;
          reqData.returnBackFuncId = cite.id;
          reqData.returnBackRootId = cite.rootId;
          yufp.router.to('echainInstanceInfo', reqData, cite.rootId);
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