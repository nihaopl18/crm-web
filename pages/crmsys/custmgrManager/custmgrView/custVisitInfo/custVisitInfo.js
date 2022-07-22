/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-2-19 10:36:19.
 * @updated by
 * @description 客户接触信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var mgrId = data.mgrId;
    yufp.lookup.reg('CD0016,CD0331,CD0332,CD0333,CD0334,CD0019,CD0011');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custmgrService + '/api/userschedule/querylist'
        };
      },
      mounted: function () {
        this.refreshCurTable();
      },
      methods: {
        refreshCurTable: function () {
          var _this = this;
          var conditionKey = _this.$refs.refTable.$props.conditionKey;
          var qParam = {};
          qParam[conditionKey] = {type: '1', reporterId: mgrId};
          _this.$refs.refTable.queryParam = qParam;
          _this.$refs.refTable.remoteData();
        }
      }
    });
  };
});