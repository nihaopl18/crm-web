/**
 * @Created by 闫天一 yanty1@yusys.com.cn on 2019-1-30 17:30:20.
 * @updated by
 * @description 产品视图-产品首页
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CONDITION_FUNC', 'CD0242', 'CD0201', 'CD0071');
    var prodId = data.prodId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          admittance: {condition: JSON.stringify({prodId: prodId, ssType: '1'})},
          admittanceDataUrl: backend.productService + '/api/ocrmfsyssscol/getcolquery',
          features: {condition: JSON.stringify({prodId: prodId, ssType: '2'})},
          featuresDataUrl: backend.productService + '/api/ocrmfsyssscol/getcolquery',
          formdata: {},
          activeNames: ['1'],
          option1: {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['持有产品客户数量']
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: []
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '持有产品客户数量',
                type: 'line',
                data: []
              }
            ]
          },
          option2: {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['产品销售规模趋势']
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: []
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '产品销售规模趋势',
                type: 'line',
                data: []
              }
            ]
          }
        };
      },
      mounted: function () {
        // 反显页面数据
        var _this = this;
        _this.initPageData();
        _this.initOption1();
        _this.initOption2();
      },
      methods: {
        /**
         * 表单初始化数据
         */
        initPageData: function () {
          var me = this;
          yufp.service.request({ // 查询业务数据
            method: 'GET',
            url: backend.productService + '/api/acrmfpdprodinfo/productbasicinfoquery/' + prodId,
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
                yufp.extend(me.$refs.refForm.formdata, response.data[0]);// 产品首页-基本信息
              }
            }
          });
        },
        /**
         * 持有产品客户数量趋势
         */
        initOption1: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            async: false,
            url: backend.productService + '/api/acrmapdbusisum/numberofcustquery/' + prodId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                _this.option1.xAxis[0].data = response.data.xaxis;
                _this.option1.series[0].data = response.data.aum1;
              }
            }
          });
        },
        /**
         * 产品销售规模趋势
         */
        initOption2: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            async: false,
            url: backend.productService + '/api/acrmapdbusisum/salesscalequery/' + prodId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                _this.option2.xAxis[0].data = response.data.xaxis;
                _this.option2.series[0].data = response.data.aum2;
              }
            }
          });
        }
      }
    });
  };
});