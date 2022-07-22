
define(function (require, exports) {
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('ZB_BIZ_CATE');
    yufp.custom.vue({
      el: '#ExceptionWfInit',
      data: function () {
        return {
          height: yufp.custom.viewSize().height - 100,
          urls: {
            dataUrl: backend.example + '/api/joindemo/queryAllWfiExceptionDemo', // 异常示例列表
            submitUrl: backend.example + '/api/joindemo/updateWfiDemo'
          },
          dataParams: {},
          tableColumns: [
            { label: '申请流水号', prop: 'logicSeq', resizable: true },
            { label: '流程实例号', prop: 'instanceId', resizable: true },
            { label: '客户ID', prop: 'custId', resizable: true },
            { label: '流程标识', prop: 'wfSign', resizable: true },
            { label: '流程名称', prop: 'wfName', resizable: true },
            { label: '上一节点', prop: 'preNodeName', resizable: true },
            { label: '上一节点处理人', prop: 'preUser', resizable: true},
            { label: '当前节点', prop: 'nodeId', resizable: true },
            { label: '节点处理人', prop: 'nodeUser', resizable: true},
            { label: '节点开始时间', prop: 'nodeStartTime', resizable: true},
            { label: '申请类型', prop: 'currentAction', resizable: true, dataCode: 'ZB_BIZ_CATE'}
          ]

        };
      },
      mounted: function () {
      },
      methods: {
        submitFn: function () {
          var me = this;
          if (this.$refs.WfInitExceptionList.selections.length !== 1) {
            this.$message({message: '请选择一条数据!', type: 'warning'});
            return false;
          }
          var row = this.$refs.WfInitExceptionList.selections[0];
          var comitData = {
            logicSeq: row.logicSeq,
            instanceId: row.instanceId,
            nodeId: row.nodeId,
            nodeUser: row.nodeUser
          };
          yufp.service.request({
            url: me.urls.submitUrl,
            data: comitData,
            method: 'POST',
            callback: function (code, message, response) {
              if (response.data) {
                me.$message({message: '处理成功', type: 'success'});
                yufp.service.request({
                  method: 'POST',
                  url: backend.example + '/api/joindemo/deleteWfiExceptionDemo?logicSeq=' + row.logicSeq,
                  callback: function (code, message, response) {
                    me.$message({message: response.data.message, type: response.data.flag});
                    me.$refs.WfInitExceptionList.remoteData();
                  }
                });
              } else {
                me.$message({message: '处理失败', type: 'error'});
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