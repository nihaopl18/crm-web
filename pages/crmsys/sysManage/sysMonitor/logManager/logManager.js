/**
 * @Created by zhuly6 zhuly6@yusys.com.cn on 2018-1-9
 * @description 系统管理-系统监控-日志管理
 */
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
 * 页面加载完成时触发
 * @param hashCode 路由ID
 * @param data 传递数据对象
 * @param cite 页面站点信息
 */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('PUB_STS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '/trade/example/list'
        };
      },
      methods: {
      }
    });
  };
});