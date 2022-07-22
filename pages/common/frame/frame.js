/**
 * @created by liujie 2018-09-06
 * @updated by
 * @description 系统主页面-左侧竖向菜单模式
 * frameComp.js 为框架组件，
 * 引用了yufp-common-tab(tabComp.js) 页签组件 ， yu-common-menu(menuComp.js) 菜单组件
 */
define([
  './custom/widgets/js/yu-base-frame.js'
], function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  exports.ready = function (hashCode, data, cite) {
    var vm = yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          type: '1',
          // 搜索框的值
          searchValue: '',
          options: [{
            label: '个人',
            value: '1'
          }, {
            label: '对公',
            value: '2'
          }],
          ulshow: true
        };
      },
      methods: {
        /**
        * 客户查询——搜索按钮
        */
        searchFn: function () {
          // 跳转所辖客户查询页面
          yufp.frame.addTab({
            id: '5c5498122c5741cda58a7ebce99c0229', // 菜单功能ID（路由ID）
            key: 'a5100e09221b4ec7af9395d457868cfa', //
            title: '所辖客户查询', // 页签名称
            data: {
              custType: this.type,
              queryAll: this.searchValue
            } // 传递的业务数据，可选配置
          });
        }
      }
    });
    yufp.frame.baseFrame = vm.$refs.refFrame;
    if (cite.options) {
      cite.options.func(vm);
    }
  };

  exports.destroy = function (id, cite) {
    yufp.frame.baseframe = null;
  };
});