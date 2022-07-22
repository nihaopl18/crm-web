/**
* @author houyx3
* @since 2018/07/06.
* @description 客户群视图
*/
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var clientInfo = data;
    yufp.lookup.reg('CLIENT_ORIGIN,CLIENT_TYPE,SHARED_SCOPE,IDENT_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          height: yufp.frame.size().height,
          Url: backend.adminService + '/api/cimpccgbaseinfo/listTree',
          Div: 'id' + new Date().getTime()
        };
      },
      mounted: function () {

      },

      methods: {
        // 获取节点并转到相对应的页面
        nodeClickFn: function (nodeData, node, self) {
          var _this = this;
          var routeId = nodeData.rountId;
          if (routeId == 'clientsBaseInfo') {
            routeId = 'clientsBaseInfo' + clientInfo.clientInfo.custOrigin;
          }
          if (routeId == 'clientsclientInfo') {
            routeId = 'clientsclientInfo' + clientInfo.clientInfo.custOrigin;
          }
          if (node.isLeaf == true) {
            if (nodeData.id == nodeData.groupNo) {
              yufp.router.to(routeId, {clientInfo: clientInfo.clientInfo}, _this.Div);
            }
          }
        }
      }
    });
  };
});