/**
 * @created by houyx3
 * @since 2018/07/17.
 * @description 个人存蓄存款
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
          personDepositUrl: '/trade/cust/custQueryInfo?clientsNO=' + client.clientInfo.clientsNO,
          /** 表格栏位 */
          tableColumns: [
            {label: '账户名称', prop: 'accountName', width: '', resizable: true},
            {label: 'ETL日期', prop: 'ETLDate', width: '100', resizable: true},
            {label: '开户网点名称', prop: 'websiteName', width: '100', resizable: true},
            {label: '开户机构', prop: 'accountOrganization', width: '', resizable: true},
            {label: '币种', prop: 'currency', width: '', resizable: true},
            {label: '科目', prop: 'subject', width: '', resizable: true},
            {label: '账户状态', prop: 'accountStatus', width: '', resizable: true},
            {label: '开户日期', prop: 'openDate', width: '100', resizable: true},
            {label: '利率', prop: 'interestRate', width: '', resizable: true},
            {label: '余额（原币种）', prop: 'balance', width: '120', resizable: true},
            {label: '余额（折人民币）', prop: 'CNYBalance', width: '120', resizable: true},
            {label: '月日均', prop: 'AverageDaily', width: '', resizable: true},
            {label: '季日均', prop: 'SeasonAverageDaily', width: '', resizable: true},
            {label: '年日均', prop: 'AnnualAverageDaily', width: '', resizable: true},
            {label: '账号', prop: 'accountID', width: '120', resizable: true}
          ]
        };
      },
      methods: {}
    });
  };
});