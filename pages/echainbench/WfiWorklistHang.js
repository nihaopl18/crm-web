
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: '#WfiWorklistHang',
      data: function () {
        var me = this;
        return {
          urls: {
            dataUrl: backend.echainService + '/api/bench/queryWfInstanceHang'
            // 列表数据查询
          },
          WFListButtons: [
            {label: '查询',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              show: true,
              click: function (model, valid) {
                if (valid) {
                  model.sessionInstuCde = yufp.session.instu.code;
                  var param = {
                    condition: JSON.stringify(model)
                  };
                  me.$refs.WfiWorklistHangList.remoteData(param);
                }
              }
            },
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
          ],
          dataParams: {condition: JSON.stringify({sessionInstuCde: yufp.session.instu.code, author: yufp.session.user.loginCode})},
          queryFields: [
            {placeholder: '业务流水号', field: 'bizSeqNo', type: 'input'}
          ],
          tableColumns: [
            { label: '业务流水号',
              prop: 'bizseqno',
              template: function () {
                return '<template scope="scope">\
                                <a style="text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-click\', scope.row)">{{ scope.row.bizseqno }}</a>\
                               </template>';
              }},
            { label: '流程实例号', prop: 'instanceid'},
            { label: '前一节点', prop: 'prenodename' },
            { label: '当前结点ID', prop: 'nodeid', hidden: true},
            { label: '当前结点', prop: 'nodename' },
            { label: '当前办理人', prop: 'currentnodeuser' },
            { label: '节点开始时间', prop: 'nodestarttime' },
            { label: '流程标识', prop: 'wfsign', hidden: true},
            { label: '流程名称', prop: 'wfname'}
          ]
        };
      },
      methods: {
        customClick: function (reqData) {
          var action = {
            wake: '1'
          };
          var param = {
            action: action,
            nodeId: reqData.nodeid,
            instanceId: reqData.instanceid,
            bizSeqNo: reqData.bizseqno,
            wfSign: reqData.wfsign,
            returnBackFuncId: cite.id,
            returnBackRootId: cite.rootId
          };
          yufp.router.to('echainInstanceInfo', param, cite.rootId);
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