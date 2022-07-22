/**
 * @created by chenlin on 2019-3-14 19:50:26
 * @updated by
 * @description 头筹
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
          dialogVisible: false,
          dialogVisible1: false,
          imageSrc: '',
          imageSrc1: '',
          'collapseName0': ['2'],
          'formData0': {},
          'value2': '',
          'value3': '',
          'onValue5': true
        };
      },
      methods: {
        'tianJia7': function () {

        },
        preview: function () {
          var _this = this;
          _this.imageSrc1 = 'pages/climp_qy/marketingMode/firstOne/firstOne.jpg';
          _this.dialogVisible1 = true;
        }
      },
      mounted () { }
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