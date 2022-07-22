/**
 * @created by houyx3
 * @since 2018/07/17.
 * @description 结售汇及外买汇
 */
define([
  './custom/widgets/js/YufpDemoSelector.js'
], function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  exports.ready = function (hashCode, data, cite) {
    var client = data;
    yufp.lookup.reg('RISK_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          settleAccountsUrl: '/trade/cust/custQueryInfo?clientsNO=' + client.clientInfo.clientsNO,
          /** 表格栏位 */
          tableColumns: [
            {label: '业务编号', prop: 'businessID', width: '', resizable: true},
            {label: '币种', prop: 'currency', width: '', resizable: true},
            {label: '业务总额', prop: 'businessAmount', width: '', resizable: true},
            {label: '折美元价', prop: 'dollarPrice', width: '', resizable: true},
            {label: '产品名称', prop: 'productName', width: '', resizable: true},
            {label: '交易机构', prop: 'dealOrganization', width: '', resizable: true},
            {label: '手续费率', prop: 'procedureRates', width: '', resizable: true},
            {label: '收益', prop: 'earnings', width: '', resizable: true},
            {label: '交易日期', prop: 'dealDate', width: '100', resizable: true}
          ]
        };
      }
    });
  };
});