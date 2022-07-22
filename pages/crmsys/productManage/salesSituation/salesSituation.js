/**
 * @Created by 闫天一 yanty1@yusys.com.cn on 2019-2-12 18:05:57.
 * @updated by
 * @description 产品视图-产品销售情况
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var prodId = data.prodId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.productService + '/api/acrmfpdsalestatistics/salessituationquery/' + prodId,
          formdata: {},
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
        _this.initOption1();
        _this.initOption2();
      },
      methods: {
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
                yufp.clone(response.data.xaxis, _this.option1.xAxis[0].data);
                yufp.clone(response.data.aum1, _this.option1.series[0].data);
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
                yufp.clone(response.data.xaxis, _this.option2.xAxis[0].data);
                yufp.clone(response.data.aum2, _this.option2.series[0].data);
              }
            }
          });
        }
      }
    });
  };
});