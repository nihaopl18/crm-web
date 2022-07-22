/**
 * @Created by yangye yangye@yusys.com on 2018-12-27 10:59:02.
 * @updated by
 * @description
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '/trade/example/list',
          formdata: {}
        };
      },
      methods: {}
    });
  };
});