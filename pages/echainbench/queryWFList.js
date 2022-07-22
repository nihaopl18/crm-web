
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: '#queryWFList',
      data: function () {
        var me = this;
        return {
          urls: {
            dataUrl: backend.echainService + '/api/bench/queryWfList',
            reloadUrl: backend.echainService + '/api/bench/reloadWfCache'
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
                  var param = {
                    condition: JSON.stringify(model),
                    sessionOrgCode: yufp.session.org.code,
                    sessionLoginCode: yufp.session.user.loginCode
                  };
                  me.$refs.WFList.remoteData(param);
                }
              }
            },
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
          ],
          dataParams: {
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          queryFields: [
            {placeholder: '流程标识', field: 'wfSign', type: 'input'},
            {placeholder: '流程名称', field: 'wfName', type: 'input'}
          ],
          tableColumns: [
            { label: '流程ID', prop: 'wfId' },
            { label: '流程标识', prop: 'wfSign'},
            { label: '流程名称', prop: 'wfName'},
            { label: '版本', prop: 'wfVer' }
          ]
        };
      },
      methods: {

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