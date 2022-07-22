/**
 * @created by zhangkun6 on 2021-9-17 17:10:38
 * @updated by
 * @description 银行分支详情
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          detailVisible: false,
          orgName: data.orgName,
          dataUrl: '/api/activitymonitoring/todoworkdetail',
          baseParam: {
            orgLevel: 3,
            orgId: data.orgId
          }
        };
      },
      methods: {
        handleClose: function () {
          this.detailVisible = false;
        },
        detailFn: function (data) {
          var _this = this;
          var params = {
            orgId: data.orgId
          };
          this.detailVisible = true;
          _this.$nextTick(function () {
            _this.$refs.detailTable.remoteData(params);
          });
        }
      }
    });
  };

  /**
   * 页面传递消息处理
   * @param type 消息类型
   * @param message 消息内容
   */
  exports.onmessage = function (type, message) {
  };

  /**
   * 页面销毁时触发destroy方法
   * @param id 路由ID
   * @param cite 页面站点信息
   */
  exports.destroy = function (id, cite) {
  };
});