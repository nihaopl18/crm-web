/**
 * @Created by panglx panglx@yusys.com.cn on 2018-12-27 11:31:17.
 * @updated by
 * @description 综合积分信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    // 模拟表单数据
    var formData = {
      totalNum: '1800',
      scoreNum: '1800',
      nunaccNum: '1800',
      freezeNum: '1800',
      costNum: '1800',
      nextInvaildNum: '1800'
    };
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          formdata: {}
        };
      },
      mounted: function () {
        // 模拟初始化表单数据绑定
        var _this = this;
        yufp.clone(formData, _this.formdata);
      },
      methods: {
      //
      }
    });
  };
});