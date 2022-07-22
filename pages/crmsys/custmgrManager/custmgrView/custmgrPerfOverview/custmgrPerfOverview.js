/**
 * @Created by luhy luhy1@yusys.com.cn on 2019-2-4 19:25:42.
 * @updated by
 * @description 客户经理业绩概览
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var mgrId = data.mgrId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          option: {
            title: {
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
              {
                name: '零售客户等级分布',
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                data: []
              }
            ]
          },
          option1: {
            title: {
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
              {
                name: '对公客户等级分布',
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                data: []
              }
            ]
          },
          option2: {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['AUM(时点)', 'AUM(月日均)', 'AUM(年日均)']
            },
            grid: {
              left: '5%',
              right: '6%',
              bottom: '8%',
              containLabel: true
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
                name: 'AUM(时点)',
                type: 'line',
                data: []
              },
              {
                name: 'AUM(月日均)',
                type: 'line',
                data: []
              },
              {
                name: 'AUM(年日均)',
                type: 'line',
                data: []
              }
            ]
          },
          option3: {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['AUM(时点)', 'AUM(月日均)', 'AUM(年日均)']
            },
            grid: {
              left: '5%',
              right: '6%',
              bottom: '8%',
              containLabel: true
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
                name: 'AUM(时点)',
                type: 'line',
                data: []
              },
              {
                name: 'AUM(月日均)',
                type: 'line',
                data: []
              },
              {
                name: 'AUM(年日均)',
                type: 'line',
                data: []
              }
            ]
          },
          option4: {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['贷款余额(时点)', '贷款余额(月日均)', '贷款余额(年日均)']
            },
            grid: {
              left: '5%',
              right: '6%',
              bottom: '8%',
              containLabel: true
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
                name: '贷款余额(时点)',
                type: 'line',
                data: []
              },
              {
                name: '贷款余额(月日均)',
                type: 'line',
                data: []
              },
              {
                name: '贷款余额(年日均)',
                type: 'line',
                data: []
              }
            ]
          },
          option5: {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['贷款余额(时点)', '贷款余额(月日均)', '贷款余额(年日均)']
            },
            grid: {
              left: '5%',
              right: '6%',
              bottom: '8%',
              containLabel: true
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
                name: '贷款余额(时点)',
                type: 'line',
                data: []
              },
              {
                name: '贷款余额(月日均)',
                type: 'line',
                data: []
              },
              {
                name: '贷款余额(年日均)',
                type: 'line',
                data: []
              }
            ]
          }
        };
      },
      mounted: function () {
        var _this = this;
        _this.initOption();
        _this.initOption1();
        _this.initOption2();
        _this.initOption3();
        _this.initOption4();
        _this.initOption5();
      },
      methods: {
        /**
         * 初始化零售客户等级分布数据
         */
        initOption: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custmgrService + '/api/acrmacmlevelrate/querypercustgradedist/' + mgrId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                _this.option.series[0].data = response.data;
              }
            }
          });
        },
        /**
         * 初始化对公客户等级分布数据
         */
        initOption1: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custmgrService + '/api/acrmacmlevelrate/queryorgcustgradedist/' + mgrId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                _this.option1.series[0].data = response.data;
              }
            }
          });
        },
        /**
         * 初始化零售客户AUM趋势连续12个月数据
         */
        initOption2: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custmgrService + '/api/acrmacmbusisumm/querypercustaum/' + mgrId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                _this.option2.xAxis[0].data = response.data.xaxis;
                _this.option2.series[0].data = response.data.aum1;
                _this.option2.series[1].data = response.data.aum2;
                _this.option2.series[2].data = response.data.aum3;
              }
            }
          });
        },
        /**
         * 初始化对公客户AUM趋势连续12个月数据
         */
        initOption3: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custmgrService + '/api/acrmacmbusisumm/queryorgcustaum/' + mgrId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                _this.option3.xAxis[0].data = response.data.xaxis;
                _this.option3.series[0].data = response.data.aum1;
                _this.option3.series[1].data = response.data.aum2;
                _this.option3.series[2].data = response.data.aum3;
              }
            }
          });
        },
        /**
         * 初始化对零售客户贷款余额趋势连续12个月数据
         */
        initOption4: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custmgrService + '/api/acrmacmbusisumm/querypercustloanbal/' + mgrId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                _this.option4.xAxis[0].data = response.data.xaxis;
                _this.option4.series[0].data = response.data.aum1;
                _this.option4.series[1].data = response.data.aum2;
                _this.option4.series[2].data = response.data.aum3;
              }
            }
          });
        },
        /**
         * 初始化对公客户贷款余额趋势12个月数据
         */
        initOption5: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custmgrService + '/api/acrmacmbusisumm/queryorgcustloanbal/' + mgrId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                _this.option5.xAxis[0].data = response.data.xaxis;
                _this.option5.series[0].data = response.data.aum1;
                _this.option5.series[1].data = response.data.aum2;
                _this.option5.series[2].data = response.data.aum3;
              }
            }
          });
        }
      }
    });
  };
});