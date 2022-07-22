/**
 * @Created by 马妍 mayan2@yusys.com.cn on 2019-2-12 19:20:09.
 * @updated by
 * @description 归属信息
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
    yufp.lookup.reg('CD0241,WORK_TRAN_LEVEL');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          expandCollapseName: ['belong1'],
          dataUrl: backend.custpubService + '/api/pcustbelongview/querybelongmgr/' + custId,
          groupdataUrl: backend.custpubService + '/api/pcustbelongview/querybelonggroup/' + custId,
          hisdataUrl: backend.custpubService + '/api/pcustbelongview/qrybelonghis/' + custId

        };
      },
      methods: {
        /**
        * 日期格式化
        */
        dateFormatter: function (row, column, cellValue) {
          var datetime = cellValue;
          if (!datetime) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d} {h}:{mi}:{s}');
        }

      }
    });
  };
});