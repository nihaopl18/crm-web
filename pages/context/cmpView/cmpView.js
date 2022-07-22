/**
 * @created by helin3 2018-07-18
 * @updated by
 * @description 流程表单组件预览示例
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
          flowNode: {
            //报文体
            designBody: '',
            // 组件标题
            title: ''
          },
          visible: false
        };
      },
      methods: {
        /**
         * 预览查询组件
         */
        showQuery: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: "/trade/flow/nodecmp",
            data: {name: 'queryCmp'},
            callback: function (code, message, response) {
              _this.flowNode = response;
              _this.$refs.ncmpRef.show();
            }
          });
        },
        /**
         * 预览录入组件
         */
        showSubmit: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: "/trade/flow/nodecmp",
            data: {name: 'submitCmp'},
            callback: function (code, message, response) {
              _this.flowNode = response;
              _this.$refs.ncmpRef.show();
            }
          });
        }
      },
      mounted: function () {
        
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
  }
});