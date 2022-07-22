define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: '#echainstudioDownload',
      data: {

      },
      methods: {
        doDownload: function () {
          yufp.util.download(backend.echainService + '/echain/studio/eChainStudio.jnlp');
          yufp.util.butLogInfo(hashCode, '工作流定义', '下载');
        }
      }
    });
    // 进入页面直接下载文件
    yufp.util.download(backend.echainService + '/echain/studio/eChainStudio.jnlp');
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});