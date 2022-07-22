/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-2-14 16:48:25.
 * @updated by
 * @description 客户优惠信息
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
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custpersonService + '/api/ocrmfcidiscountpro/queryList/' + custId,
          activeName: 'discountInfo'
        };
      },
      methods: {
        handleClick: function () {

        }
      }
    });
  };
});