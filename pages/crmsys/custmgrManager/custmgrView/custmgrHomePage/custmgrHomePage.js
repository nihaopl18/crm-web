/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-2-11 16:07:39.
 * @updated by
 * @description 客户经理视图首页
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
        _this.getCustMgrBaseInfo();
      },
      methods: {
        formatter: function (cellValue) {
          var cellText = '';
          if (cellValue != null) {
            var arr = cellValue.split(',');
            for (var i = 0; i < arr.length; i++) {
              var val = arr[i];
              if (val == '1') {
                cellText = cellText + '个人,';
              } else if (val == '2') {
                cellText = cellText + '对公,';
              } else if (val == '3') {
                cellText = cellText + '三农,';
              } else if (val == '4') {
                cellText = cellText + '国结,';
              } else if (val == '5') {
                cellText = cellText + '村镇银行,';
              }
            }
            cellText = cellText.substring(0, cellText.length - 1);
          }
          return cellText;
        },
        /**
         * 初始化管理客户AUM月日均连续12月趋势数据
         */
        initOption1: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custmgrService + '/api/acrmacmbusisumm/querycustaumbal/' + mgrId,
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
            url: backend.custmgrService + '/api/acrmacmbusisumm/querycustloanbal/' + mgrId,
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
            url: backend.custmgrService + '/api/acrmacmbusisumd/queryinfo/' + mgrId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                yufp.clone(response.data[0], _this.formdata);
              }
            }
          });
        },
        /**
         * 获取客户经理基本信息
         */
        getCustMgrBaseInfo: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custmgrService + '/api/acrmfcmcustmgrinfo/queryinfo/' + mgrId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                response.data[0].busiType = _this.formatter(response.data[0].busiType);
                yufp.clone(response.data[0], _this.baseformdata);
              }
            }
          });
        }
      }
    });
  };
});