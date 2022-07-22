/**
 * @Created by 闫天一 yanty1@yusys.com.cn on 2019-2-11 15:05:04.
 * @updated by
 * @description 目标客户
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
          baseParams: {condition: JSON.stringify({custId: custId})},
          height: yufp.frame.size().height,
          dataUrl: backend.productService + '/api/ocrmfpdcustfitprod/queryProd',
          saveBtnShow: true,
          cancelBtnShow: true,
          formdata: {},
          async: false,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL'
        };
      },
      methods: {
        openview: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var obj = _this.$refs.refTable.selections[0];
          var proId = obj.productId;
          yufp.frame.addTab({
            id: 'productView', // 菜单功能ID（路由ID）
            key: 'productView', // 自定义唯一页签key
            title: '产品视图', // 页签名称
            data: {id: '74b14d8945284d2095ce928aea7ca1f5', prodId: proId}
          });
        }
      }
    });
  };
});