/**
 * @created by luoshun
 * @updated by
 * @description 积分商城对账
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('TXN_TYPE_CD,CD0067,ACC_RESULT');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          // 表格数据
          dataUrl: backend.yuspClimpSfaceService + '/api/loysrdedumapbook/list'
        };
      },
      methods: {
        // TODO
        // 日期格式化(年月日)
        dateStrFormatter: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          if (datetime.length === 8) {
            return datetime.substring(0, 4) + '-' + datetime.substring(4, 6) + '-' + datetime.substring(6, 8);
          } else {
            return datetime;
          }
        },
        // 日期格式化(年月)
        dateStrFormatterMonth: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          if (datetime.length === 6) {
            return datetime.substring(0, 4) + '-' + datetime.substring(4, 6);
          } else {
            return datetime;
          }
        }
      }
    });
  };
});