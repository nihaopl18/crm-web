/**
 * @created by luoshun
 * @updated by
 * @description 放大镜
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '',
          // 表格数据
          formdata: {},
          viewTitle: '',
          dialogVisible: false
        };
      },
      methods: {
        handleIconClick: function () {
          var _this = this;
          _this.viewTitle = '放大镜';
          _this.dialogVisible = true;
        },
        returnFunction: function () {
          var _this = this;
          _this.dialogVisible = false;
        }
      }
    });
  };
});