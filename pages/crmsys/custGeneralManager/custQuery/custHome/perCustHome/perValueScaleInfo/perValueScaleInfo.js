/**
 * @Created by 马妍 mayan2@yusys.com.cn on 2019-2-16 11:01:33.
 * @updated by
 * @description 价值等级
 */
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CERT_TYPE,CARD_NO,CD0243,CD0032');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custpubService + '/api/ocrmfcgcpngrade/querygradelist/' + custId

        };
      },
      methods: {
        formJE: function (row, column, cellValue) {
          // return yufp.util.dateFormat(cellValue, '{y}-{m}-{d} {h}:{i}:{s}');
          return yufp.util.dateFormat(cellValue, '{y}-{m}-{d}');
        }
      }
    });
  };
});