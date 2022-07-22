/**
 * @Created by zhuly6 zhuly6@yusys.com.cn on 2019-1-4
 * @updated by
 * @description 营销活动管理-营销活动监控-活动监控
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
          refDataUrl: backend.adminService + '/api/mkt/actimonitor',
          proDataUrl: backend.adminService + '/api/mkt/actimonitorrelation',
          sucDataUrl: backend.adminService + '/api/mkt/actimonitorsuccess',
          faiDataUrl: backend.adminService + '/api/mkt/actimonitorfail',
          editDisabled: false,
          isInfo: false,
          viewTitle: ['成功完成数', '执行中数', '失败数'],
          viewTitles: '',
          sucVisible: false,
          carringVisible: false,
          fallActVisible: false,
          actiName: { condition: JSON.stringify({ actiName: '' })}
        };
      },
      methods: {
        /**
        * 执行中数
        */
        processNumFn: function (row, column, cell, event) {
          var _this = this;
          if (column.label == '执行中数') {
            _this.viewTitles = _this.viewTitle[1];
            _this.actiName = { condition: JSON.stringify({ actiName: row.actiName })};
            _this.carringVisible = true;
          }
          if (column.label == '成功完成数') {
            _this.viewTitles = _this.viewTitle[0];
            _this.actiName = { condition: JSON.stringify({ actiName: row.actiName })};
            _this.sucVisible = true;
          }
          if (column.label == '失败完成数') {
            _this.viewTitles = _this.viewTitle[2];
            _this.actiName = { condition: JSON.stringify({ actiName: row.actiName })};
            _this.fallActVisible = true;
          }
        }
      }
    });
  };
});