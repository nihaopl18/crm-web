/**
 * @created by houyx3
 * @since 2018/07/17.
 * @description 个人理财产品
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
          personProductUrl: '/trade/cust/custQueryInfo?clientsNO=' + client.clientInfo.clientsNO,
          /** 表格栏位 */
          tableColumns: [
            {label: '账号', prop: 'account', width: '', resizable: true},
            {label: '币种', prop: 'currency', width: '', resizable: true},
            {label: '购买时间', prop: 'buyDate', width: '', resizable: true},
            {label: '起息日', prop: 'startDate', width: '', resizable: true},
            {label: '到期日', prop: 'endDate', width: '', resizable: true},
            {label: '折人民币余额', prop: 'balance', width: '', resizable: true}
          ]
        };
      }
    });
  };
});