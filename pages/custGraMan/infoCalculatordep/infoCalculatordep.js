/**
 * @Created by 张成龙 zhangcl3@yusys.com.cn on 2019-1-22 15:23:44.
 * @updated by
 * @description 存款利率表查询
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0071');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.calculatorService + '/api/acrmfpdinterestrate/querylistdep',
          formdata: {},
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true
        };
      },
      methods: {
        /**
          * 格式化 时间
          */
        formDate: function (row, column, cellValue) {
          // return yufp.util.FormatDateTime(row.createDate, 'yyyy-MM-dd HH:mm:ss');
          if (cellValue == '' || cellValue == undefined) {
            return '';
          }
          var dateee = new Date(cellValue).toJSON();
          var date = new Date(+new Date(dateee) + (8 * 3600 * 1000)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          return date.split(' ')[0];
        }
      }
    });
  };
});