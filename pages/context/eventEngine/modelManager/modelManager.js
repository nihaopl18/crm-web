/**
 * Created by yangxiao2 2019-02-18
 * 模板管理
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      mounted: function () {
        window.open('http://192.168.251.156:6006/#/main', '_blank');
        // yufp.service.request({
        //   method: 'POST',
        //   url: 'http://192.168.251.156:6005/api/users/login',
        //   data: JSON.stringify({email: 'kehuyingxiao@system.com', password: 'e10adc3949ba59abbe56e057f20f883e'}),
        //   callback: function (code, message, response) {
        //     if (code == 0) {

        //     }
        //   }
        // });
      }
    });
  };
});