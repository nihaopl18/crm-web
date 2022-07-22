/**
 * @Created by 闫天一 yanty1@yusys.com.cn on 2019-2-11 15:05:04.
 * @updated by
 * @description 产品视图-目标客户
 */
define(['./custom/plugins/yufp.watermark.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0016', 'CD0011', 'CD0032');
    var prodId = data.prodId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          rules: {custId: [{max: 40, message: '长度不大于40个字符'}], custName: [{max: 200, message: '长度不大于200个字符'}], identNo: [{max: 50, message: '长度不大于50个字符'}]},
          searchformData: {},
          baseParams: {condition: JSON.stringify({prodId: prodId})},
          height: yufp.frame.size().height,
          dataUrl: backend.productService + '/api/ocrmfpdcustfitprod/targetcustomersquery',
          saveBtnShow: true,
          cancelBtnShow: true,
          formdata: {},
          async: false,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          numRule: {max: 21, message: '最大长度不超过21个字符', trigger: 'blur' }
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.custgroupService + '/api/allcust/mybusitype',
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.data.busiType == '2') {
                _this.searchformData.catlType = '2';
                var param = {
                  condition: JSON.stringify({
                    catlType: '2'
                  })
                };
                _this.$refs.refTable.remoteData(param);
              } else {
                _this.searchformData.catlType = '1';
                var param = {
                  condition: JSON.stringify({
                    catlType: '1'
                  })
                };
                _this.$refs.refTable.remoteData(param);
              }
            }
          }
        });
      },
      methods: {
      }
    });
  };
});