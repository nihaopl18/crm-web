/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-2-15 13:50:13.
 * @updated by
 * @description 客户经理团队客户信息
 */
define(['./custom/plugins/yufp.watermark.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var mktTeamId = data.mktTeamId;
    yufp.lookup.reg('CD0016,CD0349,CD0243,CD0032,CD0011,CD0350,CD0351');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custmgrgroupService + '/api/ocrmfcmmktteam/querycustlist/' + mktTeamId,
          queryModel: {}
        };
      },
      methods: {

      },
      mounted: function () {
        this.queryModel.custType = '1';
      }
    });
  };
});