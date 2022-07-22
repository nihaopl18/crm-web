/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-4 11:27:47.
 * @updated by
 * @description 客户认领
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var applyId = data.bizSeqNo;
    yufp.lookup.reg('CERT_TYPE,CARD_NO,WF_APP_STATUS,CD0011,CD0016,CD0019');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '/api/ocrmfcilatentapply/claiminfo',
          baseParams: { condition: JSON.stringify({ applyId: applyId }) }
        };
      },
      methods: {
        formData: function (row, column, cellValue) {
          return yufp.util.dateFormat(cellValue, '{y}-{m}-{d} {h}:{i}:{s}');
        }
      }
    });
  };
});