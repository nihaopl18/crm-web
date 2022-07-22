/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-2-13 15:56:43.
 * @updated by
 * @description 客户风险预警信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0238,CD0439,CD0252');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custpersonService + '/api/acrmfciriskwarninfo/querylist/' + custId,
          activeName: 'messageTip'
        };
      },
      methods: {
        handleClick: function () {

        }
      }
    });
  };
});