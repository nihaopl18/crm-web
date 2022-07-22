/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-1-18 12:44:56.
 * @updated by
 * @description 客户概览
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发 尼玛
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0353,CD0071,CD0355,CD0450,CD0016,CD0354,CD0328,CD0352');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custpersonService + '/api/acrmfaggkloan/queryloanlist/' + custId,
          dataUrl2: backend.custpersonService + '/api/acrmfaggksave/querydepositlist/' + custId,
          dataUrl5: backend.custpersonService + '/api/acrmfaggkzjyw/queryzjywlist/' + custId,
          dataUrl4: backend.custpersonService + '/api/acrmfaggkchannel/querychannellist/' + custId,
          activeName: 'deal'
        };
      },
      methods: {
        handleClick: function () {

        }
      }
    });
  };
});