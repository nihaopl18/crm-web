/**
 * @created by luoshun
 * @updated by
 * @description 审批
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('WF_APP_STATUS,STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          // 表格数据
          formdata: {}
        };
      },
      mounted: function () {
        var _this = this;
        // 向后台发送保存请求
        yufp.service.request({
          method: 'GET',
          url: backend.yuspClimpBparamService + '/api/loybppriceratio/getdetailinfo?id=' + data.bizSeqNo,
          callback: function (code, message, response) {
            _this.$refs.refForm.resetFields();
            yufp.clone(response.data, _this.formdata);
          }
        });
      },
      methods: {
      }
    });
  };
});