
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('WF_NODE_STATUS');
    yufp.lookup.reg('ZB_BIZ_CATE');
    yufp.custom.vue({
      el: '#WfAgentLogEndList',
      data: function () {
        var me = this;
        return {
          height: yufp.custom.viewSize().height - 100,
          buttons: [
            {label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              show: true,
              click: function (model, valid) {
                if (valid) {
                  model.sessionLoginCode = yufp.session.user.loginCode;
                  me.$refs.WfAgentLogEndList.remoteData(model);
                }
              }
            },
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
          ],
          urls: {
            dataUrl: backend.echainService + '/api/joinbeanch/getUserAgentEnds'
          },
          queryFields: [
            {placeholder: '申请流水号', field: 'bizSeqNo', type: 'input'},
            {placeholder: '客户名称', field: 'custName', type: 'input'}
          ],
          mainGrid: {
            query: {
              vicar: '',
              vicarname: ''
            }
          },
          dataParams: {condition: JSON.stringify({sessionLoginCode: yufp.session.user.loginCode})},
          tableColumns: [
            { label: '申请流水号',
              prop: 'bizSeqNo',
              resizable: true,
              template: function () {
                return '<template scope="scope">\
                                <a style="text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-click\', scope.row)">{{ scope.row.bizSeqNo }}</a>\
                               </template>';
              }},
            // { label: '申请类型', prop: 'appid', resizable: true ,dataCode: 'ZB_BIZ_CATE'},
            { label: '客户名称', prop: 'custName', resizable: true},
            { label: '代办人', prop: 'replacer', resizable: true},
            { label: '委托节点受理时间', prop: 'nodeAcceptTime', resizable: true},
            { label: '节点状态', prop: 'nodeStatus', resizable: true, dataCode: 'WF_NODE_STATUS'},
            { label: '节点ID', prop: 'nodeId', resizable: true, hidden: true},
            { label: '流程标识', prop: 'wfSign', resizable: true, hidden: true},
            { label: '实例号', prop: 'instanceId', resizable: true, hidden: true}
          ]
        };
      },
      methods: {
        customClick: function (reqData) {
          var action = {};
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