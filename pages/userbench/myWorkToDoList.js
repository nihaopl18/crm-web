
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('WF_NODE_STATUS');
    yufp.custom.vue({
      el: '#myWorkToDoList',
      data: function () {
        var me = this;
        return {
          urls: {
            dataUrl: backend.echainService + '/api/joinbeanch/getUserInitTodos'
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
                  me.$refs.myWorkListToDoList.remoteData(param);
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
            { label: '前一结点', prop: 'preNodeName' },
            { label: '当前结点Id', prop: 'nodeId', hidden: 'true'},
            { label: '当前结点', prop: 'nodeName' },
            { label: '当前办理人', prop: 'currentNodeUser' },
            { label: '节点状态', prop: 'nodeStatus', dataCode: 'WF_NODE_STATUS'},
            { label: '节点开始时间', prop: 'nodeStartTime' },
            { label: '流程名称', prop: 'wfName'}
          ]
        };
      },
      methods: {
        customClick: function (reqData) {
          var action = {
            urge: '1',
            hang: '1'
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