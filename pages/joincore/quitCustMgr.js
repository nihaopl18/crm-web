/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-2-28 15:28:24.
 * @updated by
 * @description 退出客户经理
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var applyId = data.bizSeqNo;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '/api/ocrmfcmcustmgrquitapply/queryquitcustmgrapply/' + applyId
        };
      },
      methods: {

      }
    });
  };
});