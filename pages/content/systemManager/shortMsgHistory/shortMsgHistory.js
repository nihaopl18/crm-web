/**
 * @created by  on 2019-6-27 18:38:34
 * @updated by
 * @description 短信发送历史
 */
define(['./custom/widgets/js/YufpMgrSelector.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0451');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.remindService + '/api/inforeminder/queryHis'
        };
      },
      methods: {

      }
    });
  };

  /**
   * 页面传递消息处理
   * @param type 消息类型
   * @param message 消息内容
   */
  exports.onmessage = function (type, message) {
  };

  /**
   * 页面销毁时触发destroy方法
   * @param id 路由ID
   * @param cite 页面站点信息
   */
  exports.destroy = function (id, cite) {
  };
});