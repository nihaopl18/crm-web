
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: '#MyTaskPool',
      data: function () {
        var me = this;
        return {
          height: yufp.custom.viewSize().height - 100,
          urls: {
            dataUrl: backend.echainService + '/api/joinbeanch/getUserTaskPools'
          },
          MyTaskPoolButtons: [
            {label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              show: true,
              click: function (model, valid) {
                if (valid) {
                  model.sessionLoginCode = yufp.session.user.loginCode;
                  model.sessionInstuCde = yufp.session.instu.code;
                  var param = {
                    condition: JSON.stringify(model)
                  };
                  me.$refs.MyTaskPoolList.remoteData(param);
                }
              }
            },
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
          ],
          queryFields: [
            {placeholder: '项目池编号', field: 'tpid', type: 'input'},
            {placeholder: '项目池名称', field: 'tpname', type: 'input'}
          ],
          query: {
            signId: '',
            signName: ''
          },
          dataParams: {condition: JSON.stringify({
            sessionLoginCode: yufp.session.user.loginCode,
            sessionInstuCde: yufp.session.instu.code
          })},
          tableColumns: [
            { label: '项目池编号',
              prop: 'tpid',
              resizable: true,
              template: function () {
                return '<template scope="scope">\
                                <a style="text-decoration:underline;cursor:pointer;" @click="_$event(\'custom-click\', scope.row)">{{ scope.row.tpid }}</a>\
                               </template>';
              }},
            { label: '项目池名称', prop: 'tpname', resizable: true},
            { label: '任务数量', prop: 'todoCount', resizable: true },
            { label: '描述', prop: 'tpdsc', resizable: true }
          ]
        };
      },
      methods: {
        rowDblclick: function (reqData) {
          reqData.returnBackRootId = cite.rootId;
          yufp.router.to('toDoTaskPoolList', reqData, cite.rootId);
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