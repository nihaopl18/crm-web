/**
* @author houyx3
* @since 2018/07/17.
* @description 个人电子渠道签约
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
          /** 表格栏位 */
          tableColumns: [
            {label: '签约日期', prop: 'contractDate', type: 'input', width: '', resizable: true},
            {label: '签约到期日期', prop: 'contractEndDate', width: '', resizable: true},
            {label: '签约名称', prop: 'contractName', width: '', resizable: true},
            {label: '签约渠道', prop: 'contractChannel', width: '', resizable: true},
            {label: '机构名称', prop: 'organizationName', width: '', resizable: true},
            {label: '经办人', prop: 'agent', width: '', resizable: true},
            {label: '签约状态', prop: 'contractStatus', width: '', resizable: true},
            {label: '签约机构', prop: 'contractOrganization', width: '', resizable: true}
          ],
          // 传入了客户ID好的，需要查询客户个人电子渠道签约信息URL
          internetContractUrl: '/trade/cust/custQueryInfo?clientsNO=' + client.clientInfo.clientsNO
        };
      }
    });
  };
});