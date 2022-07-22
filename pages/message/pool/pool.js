
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CHANNEL_TYPE');
    yufp.lookup.reg('MESSAGE_STATE');
    yufp.lookup.reg('MESSAGE_WARN');
    yufp.custom.vue({
      el: '#messagePool',
      data: function () {
        var me = this;
        return {
          height: yufp.custom.viewSize().height,
          urls: {
            dataUrl: backend.messageService + '/api/template/queryMessagePool/',
            top: backend.messageService + '/api/template/top/'
          },
          tableColumns: [
            { label: '主键', prop: 'pkNo', resizable: true, hidden: true },
            { label: '消息类型', prop: 'messageType', resizable: true },
            { label: '用户码', prop: 'userNo', resizable: true },
            { label: '发送结果', prop: 'state', resizable: true, type: 'select', dataCode: 'MESSAGE_STATE'},
            { label: '渠道类型', prop: 'channelType', resizable: true, type: 'select', dataCode: 'CHANNEL_TYPE'},
            { label: '创建时间', prop: 'createTime', resizable: true},
            { label: '消息等级', prop: 'messageLevel', resizable: true, dataCode: 'MESSAGE_WARN'},
            { label: '发送时间', prop: 'timeStart', resizable: true}
          ],
          queryButtons: [
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
                  me.$refs.messageTable.remoteData(param);
                }
              }
            },
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
          ],
          queryFields: [
            { placeholder: '用户码', field: 'userNo', type: 'input'},
            { placeholder: '渠道类型', field: 'channelType', type: 'select', dataCode: 'CHANNEL_TYPE'},
            { placeholder: '消息类型', field: 'messageType', type: 'input'}
          ],
          check: true
        };
      },
      methods: {
        top: function () {
          if (this.$refs.messageTable.selections.length > 0) {
            var pkNos = '';
            if (this.$refs.messageTable.selections.length >= 1) {
              for (var i = 0; i < this.$refs.messageTable.selections.length; i++) {
                pkNos = pkNos + this.$refs.messageTable.selections[i].pkNo + ',';
              }
            }
            var me = this;
            var comData = {pkNos: pkNos};
            this.$confirm('您确定要置顶消息吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(function () {
              yufp.service.request({
                method: 'POST',
                data: comData,
                url: me.urls.top,
                callback: function (code, message, response) {
                  if (response.data == 0) {
                    me.$message({message: '成功', type: 'success'});
                    me.$refs.messageTable.remoteData();
                  } else {
                    me.$message({message: '失败', type: 'error'});
                  }
                }
              });
            });
          } else {
            this.$message({message: '请先选择数据', type: 'warning'});
            return false;
          }
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