/**
* @author houyx3
* @since 2018/07/18.
* @description 客户群客户适合的产品
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
    var clientInfo = data.clientInfo;
    yufp.lookup.reg('RISK_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          fitProductUrl: backend.custgroupService + '/api/allcust/fitproduct',
          // TODO 从前面的页面将客户群ID传值过来
          fitProductParam: {condition: JSON.stringify({groupId: clientInfo.custGroupId })},
          /** 表格栏位 */
          tableColumns: [
            {label: '客户编号', prop: 'custId', resizable: true},
            {label: '客户名称', prop: 'custName', resizable: true},
            {label: '产品编号', prop: 'productId', resizable: true},
            {label: '产品名称', prop: 'prodName', resizable: true}
          ]
        };
      }
    });
  };
});