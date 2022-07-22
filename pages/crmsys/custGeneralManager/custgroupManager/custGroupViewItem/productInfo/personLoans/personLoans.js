/**
 * @created by houyx3
 * @since 2018/07/17.
 * @description 个人消费贷款
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
          personLoansUrl: '/trade/cust/custQueryInfo?clientsNO=' + client.clientInfo.clientsNO,
          /** 表格栏位 */
          tableColumns: [
            {label: '五级分类', prop: 'classify', width: '', resizable: true},
            {label: '合同编号', prop: 'contractID', width: '', resizable: true},
            {label: '贷款性质', prop: 'loansProperty', width: '120', resizable: true},
            {label: '经办机构', prop: 'handleOrganization', width: '', resizable: true},
            {label: '贷款金额', prop: 'loansAmount', width: '', resizable: true},
            {label: '币种', prop: 'currency', width: '', resizable: true},
            {label: '余额', prop: 'balance', width: '', resizable: true},
            {label: '贷款开始日期', prop: 'startDate', width: '100', resizable: true},
            {label: '贷款机构', prop: 'loansOrganization', width: '', resizable: true}
          ]
        };
      }
    });
  };
});