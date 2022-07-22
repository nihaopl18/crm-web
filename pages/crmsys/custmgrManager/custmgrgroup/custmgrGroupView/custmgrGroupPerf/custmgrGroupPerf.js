/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-2-15 17:06:03.
 * @updated by
 * @description 客户经理团队业绩
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var mktTeamId = data.mktTeamId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          formdata: {},
          baseformdata: {},
          option1: {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['AUM(月日均)']
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
                name: 'AUM(月日均)',
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
              data: ['贷款余额(月日均)']
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
                name: '贷款余额(月日均)',
                type: 'line',
                data: []
              }
            ]
          }
        };
      },
      mounted: function () {
        var _this = this;
        _this.initOption1();
        _this.initOption2();
        _this.getMgrCustInfo();
      },
      methods: {
        /**
         * 初始化管理客户AUM月日均连续12月趋势数据
         */
        initOption1: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            async: false,
            url: backend.custmgrgroupService + '/api/custmgrgroupbusisum/querycustaumbal/' + mktTeamId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                _this.option1.xAxis[0].data = response.data.xaxis;
                _this.option1.series[0].data = response.data.aum;
              }
            }
          });
        },
        /**
         * 初始化管理客户贷款余额月日均连续12月趋势数据
         */
        initOption2: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            async: false,
            url: backend.custmgrgroupService + '/api/custmgrgroupbusisum/querycustloanbal/' + mktTeamId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                _this.option2.xAxis[0].data = response.data.xaxis;
                _this.option2.series[0].data = response.data.bal;
              }
            }
          });
        },
        /**
         * 初始化管户信息
         */
        getMgrCustInfo: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custmgrgroupService + '/api/custmgrgroupbusisum/queryinfo/' + mktTeamId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                yufp.clone(response.data[0], _this.formdata);
              }
            }
          });
        }
      }
    });
  };
});