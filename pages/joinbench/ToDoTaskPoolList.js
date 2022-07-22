
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('WF_NODE_STATUS');
    yufp.custom.vue({
      el: '#ToDoTaskPoollist',
      data: function () {
        var me = this;
        return {
          height: yufp.custom.viewSize().height - 100,
          tpid: data.tpid,
          urls: {
            dataUrl: backend.echainService + '/api/joinbeanch/getUserTaskPoolTodos',
            taskSignInUrl: backend.echainService + '/api/joincore/wfTaskSignIn'
          },
          MyTaskPoolButtons: [
            {label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              show: true,
              click: function (model, valid) {
                if (valid) {
                  model.tpid = me.tpid;
                  var param = {
                    condition: JSON.stringify(model)
                  };
                  me.$refs.ToDoTaskPoolList.remoteData(param);
                }
              }
            },
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
          ],
          queryFields: [
            {placeholder: '申请流水号', field: 'bizSeqNo', type: 'input'},
            {placeholder: '客户名称', field: 'custName', type: 'input'}
          ],
          query: {
            signId: '',
            signName: ''
          },
          dataParams: {condition: JSON.stringify({tpid: data.tpid})},
          tableColumns: [
            { label: '申请流水号', prop: 'bizSeqNo', resizable: true },
            { label: '当前节点ID', prop: 'nodeId', resizable: true, hidden: true},
            { label: '实例号', prop: 'instanceId', resizable: true, hidden: true},
            { label: '客户名称', prop: 'custName', resizable: true },
            { label: '前一节点', prop: 'preNodeName', resizable: true },
            { label: '当前节点', prop: 'nodeName', resizable: true},
            { label: '当前办理人', prop: 'currentNodeUser', resizable: true },
            { label: '节点状态', prop: 'nodeStatus', resizable: true, dataCode: 'WF_NODE_STATUS'},
            { label: '节点开始时间', prop: 'nodeStartTime', resizable: true},
            { label: '流程名称', prop: 'wfName', resizable: true }
          ]
        };
      },
      methods: {
        returnBack: function () {
          yufp.router.to('23302ba607c04833a18e24f8e1f9fab3', null, data.returnBackRootId);
        },
        taskSignIn: function () {
          var me = this;
          if (this.$refs.ToDoTaskPoolList.selections.length !== 1) {
            this.$message({message: '请选择一条数据!', type: 'warning'});
            return false;
          }
          var row = this.$refs.ToDoTaskPoolList.selections[0];
          var comitData = {};
          comitData.instanceId = row.instanceId;
          comitData.nodeId = row.nodeId;
          comitData.sessionInstuCde = yufp.session.instu.code;
          comitData.sessionOrgCode = yufp.session.org.code;
          comitData.sessionLoginCode = yufp.session.user.loginCode;
          me.$confirm('确定要执行认领操作吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              data: comitData,
              url: me.urls.taskSignInUrl,
              callback: function (code, message, response) {
                var sign = response.data.sign;
                if (sign == '0') {
                  me.$message({message: '任务认领处理成功，请到待办事项中进行业务处理', type: 'success'});
                  me.$refs.ToDoTaskPoolList.remoteData(me.dataParams);
                } else {
                  me.$message({message: response.data.tip, type: 'error'});
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