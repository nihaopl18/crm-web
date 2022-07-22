/**
 * @Created by panglx panglx@yusys.com.cn on 2018-12-27 09:48:55.
 * @updated by
 * @description 加分明细信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CERT_TYPE,CARD_NO');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          inline: true,
          dataUrl: '/trade/example/list'
        };
      },
      methods: {}
    });
  };
});