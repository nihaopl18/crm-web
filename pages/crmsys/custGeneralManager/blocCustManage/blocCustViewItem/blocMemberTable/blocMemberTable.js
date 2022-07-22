/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-2-25 11:07:56.
 * @updated by
 * @description 集团视图—集团成员列表
 */
define(['./libs/js-xlsx/xlsx.full.min.js', './custom/plugins/yufp.watermark.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0424');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '/api/ocrmfcigroupmember/list',
          formdata: {},
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          dataParams: {condition: JSON.stringify({groupNo: data.groupNo})},
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true
        };
      },
      methods: {
        /**
         * 导出操作
         */
        exportFn: function () {
          var _this = this;
          yufp.util.exportExcelByTable({
            ref: _this.$refs.refTable,
            url: '/trade/example/list'
          });
        }
      }
    });
  };
});