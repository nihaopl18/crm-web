/**
 * @created by taoting1 on 2019-3-1 10:48:37
 * @updated by
 * @description 集团视图项-组织架构图
 */
yufp.require.require([
  './libs/jsPlumb/css/jsPlumbToolkit-defaults.css',
  './libs/jsPlumb/css/jsPlumbToolkit-demo.css',
  './themes/default/font_project/iconfont.css',
  './pages/crmsys/custGeneralManager/blocCustManage/blocCustViewItem/orgStructGraph/flowTempDesign.css',
  './libs/swiper/idangerous.swiper.css'
]);
define(['jquery',
  './libs/jsPlumb/js/jsPlumb.js',
  './libs/swiper/idangerous.swiper.min.js',
  './custom/widgets/js/yufpFlowDesign.js', // 流程组件
  './libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('RELA_NAME');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          showornot: false,
          editableornot: false,
          edit: false,
          flowId: data.groupNo,
          flowName: data.groupName
        };
      },
      mounted: function () {
        this.editableornot = true;
        // this.panelType = this.viewType;
        // this.flowId = this.tempId;
      },
      methods: {

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