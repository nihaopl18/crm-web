
define(function (require, exports) {
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          urls: {
            dataUrl: backend.echainService + '/api/joincore/wfGetInstanceHistory'
          },
          requestType: 'POST',
          dataParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode,
            instanceId: data.instanceId
          },
          tableColumns: [
            { label: '处理步骤', prop: 'nodeName'},
            { label: '办理人', prop: 'userName' },
            { label: '下一处理步骤', prop: 'nextNodeName'},
            { label: '下一办理人', prop: 'nextNodeUser' },
            { label: '节点开始时间', prop: 'nodeStartTime'},
            { label: '处理说明', prop: 'methods'},
            { label: '意见', prop: 'fieldContent'}
          ]
        };
      },
      methods: {

      }
    });
  };

  exports.onmessage = function (type, message) {
  };
  exports.destroy = function (id, cite) {
  };
});