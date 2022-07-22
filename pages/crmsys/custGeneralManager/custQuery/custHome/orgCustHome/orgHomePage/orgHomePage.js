/**
 * @Created by luhy luhy1@yusys.com.cn on 2019-2-4 19:25:42.
 * @updated by
 * @description 对公客户视图首页
 */
define(['./libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/yufpRoleSelector.js',
  './libs/jsencrypt/jsencrypt.min.js',
  './custom/widgets/js/yufpDptTree.js',
  './custom/widgets/js/yufpExtTree.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0332,CD0011,CD0285');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          baseformdata: {},
          bussoneformdata: {},
          busstwoformdata: {},
          bussthreeformdata: {},
          eventdataUrl: backend.custorgService + '/api/ocrmFciOrgEventInfo/querylist/' + custId + '/yes',
          keydataUrl: backend.custorgService + '/api/ocrmfciorgkeyman/querylist/' + custId + '/yes',
          // bussoneUrl: backend.custorgService + '/api/ocusthomepage/querybussList/' + custId,
          // busstwoUrl: backend.custorgService + '/api/ocusthomepage/querybussList/' + custId,
          // bussthreeUrl: backend.custorgService + '/api/ocusthomepage/querybussList/' + custId,
          tags: [],
          option: {
            title: {
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['时点余额', '本年日均余额', '上年时点余额', '上年日均余额']
            },
            grid: {
              left: '20%'
            },
            toolbox: {

            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
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
                name: '时点余额',
                type: 'bar',
                data: []
              },
              {
                name: '本年日均余额',
                type: 'bar',
                data: []
              },
              {
                name: '上年时点余额',
                type: 'bar',
                data: []
              }, {
                name: '上年日均余额',
                type: 'bar',
                data: []
              }
            ]
          },
          option1: {
            title: {
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['时点余额', '上年日均余额', '本年日均余额']
            },
            toolbox: {

            },
            grid: {
              left: '20%'
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
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
                name: '时点余额',
                type: 'bar',
                data: []
              },
              {
                name: '上年日均余额',
                type: 'bar',
                data: []
              },
              {
                name: '本年日均余额',
                type: 'bar',
                data: []
              }
            ]
          },
          option2: {
            title: {
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['时点余额', '本年日均余额', '上年时点余额', '上年日均余额']
            },
            toolbox: {

            },
            grid: {
              left: '20%'
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
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
                name: '时点余额',
                type: 'bar',
                data: []
              },
              {
                name: '本年日均余额',
                type: 'bar',
                data: []
              },
              {
                name: '上年时点余额',
                type: 'bar',
                data: []
              }, {
                name: '上年日均余额',
                type: 'bar',
                data: []
              }
            ]
          },
          option3: {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['存款总余额', '定期存款余额', '活期存款余额', '存款月日均余额', '外币存款余额']
            },
            grid: {
              left: '20%'
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
                name: '存款总余额',
                type: 'line',
                data: []
              },
              {
                name: '定期存款余额',
                type: 'line',
                data: []
              },
              {
                name: '活期存款余额',
                type: 'line',
                data: []
              },
              {
                name: '存款月日均余额',
                type: 'line',
                data: []
              },
              {
                name: '外币存款余额',
                type: 'line',
                data: []
              }
            ]
          },
          option4: {
            title: {
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            grid: {
              left: '20%'
            },
            series: [
              {
                name: '贡献度占比',
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                data: []
              }
            ]
          },
          option5: {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['综合贡献度', '存款贡献度', '贷款贡献度度', '中间业务贡献度']
            },
            grid: {
              left: '20%'
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
                name: '综合贡献度',
                type: 'line',
                data: []
              },
              {
                name: '存款贡献度',
                type: 'line',
                data: []
              },
              {
                name: '贷款贡献度度',
                type: 'line',
                data: []
              },
              {
                name: '中间业务贡献度',
                type: 'line',
                data: []
              }

            ]
          },
          option6: {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['总贷款余额', '不良贷款余额']
            },
            grid: {
              left: '20%'
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
                name: '总贷款余额',
                type: 'line',
                data: []
              },
              {
                name: '不良贷款余额',
                type: 'line',
                data: []
              }
            ]
          },
          option7: {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['总资产月日均', '总负债月日均']
            },
            grid: {
              left: '20%'
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
                name: '总资产月日均',
                type: 'line',
                data: []
              },
              {
                name: '总负债月日均',
                type: 'line',
                data: []
              }

            ]
          }
        };
      },
      mounted: function () {
        var _this = this;
        _this.initBaseData();// 基本信息
        _this.bussBaseData();// 业务信息
        _this.initProTapData();// 产品标签
        _this.initOption();// 存款贷款理财情况
        _this.initOption1();// 存款结构变化情况
        _this.initOption2();// 贡献度占比
      },
      methods: {
        /**
        *基本信息
        */
        initBaseData: function () {
          var _this = this;
          yufp.service.request({ // 查询业务数据
            method: 'GET',
            url: backend.custorgService + '/api/acrmFciOrgCustBasic/querylist/' + custId,
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
              //  yufp.extend(_this.$refs.baseForm.formdata, response.data[0]);// 基本信息
                _this.baseformdata = response.data[0];
              }
            } });
        },
        /**
        *业务信息
        */
        bussBaseData: function () {
          var _this = this;
          yufp.service.request({ // 查询业务数据
            method: 'GET',
            url: backend.custorgService + '/api/ocusthomepage/querybussList/' + custId,
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
                //  yufp.extend(_this.$refs.baseForm.formdata, response.data[0]);// 基本信息
                _this.bussoneformdata = response.data[0];
                _this.busstwoformdata = response.data[0];
                _this.bussthreeformdata = response.data[0];
              }
            } });
        },

        /**
        * 产品标签
        */
        initProTapData: function () {
          var _this = this;
          yufp.service.request({ // 查询业务数据
            method: 'GET',
            url: backend.custorgService + '/api/ocusthomepage/queryorgproducttaglist/' + custId,
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
                _this.tags = response.data;
              }
            } });
        },
        /**
         *  存款贷款理财情况
         */
        initOption: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custorgService + '/api/ocusthomepage/queryorgbusssum/' + custId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                // 存款
                _this.option.xAxis[0].data = response.data.xaxis;
                _this.option.series[0].data = response.data.aum1;
                _this.option.series[1].data = response.data.aum2;
                _this.option.series[2].data = response.data.aum3;
                _this.option.series[3].data = response.data.aum4;
                // 理财
                _this.option1.xAxis[0].data = response.data.xaxis;
                _this.option1.series[1].data = response.data.aum9;
                _this.option1.series[2].data = response.data.aum10;
                _this.option1.series[0].data = response.data.aum11;
                // 贷款
                _this.option2.xAxis[0].data = response.data.xaxis;
                _this.option2.series[0].data = response.data.aum5;
                _this.option2.series[1].data = response.data.aum6;
                _this.option2.series[2].data = response.data.aum7;
                _this.option2.series[3].data = response.data.aum8;
              }
            }
          });
        },
        /**
         *  存款变化情况
         */
        initOption1: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custorgService + '/api/ocusthomepage/queryorgmonbusssum/' + custId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                // 存款
                _this.option3.xAxis[0].data = response.data.xaxis;
                _this.option3.series[0].data = response.data.aum1;
                _this.option3.series[1].data = response.data.aum2;
                _this.option3.series[2].data = response.data.aum3;
                _this.option3.series[3].data = response.data.aum4;
                _this.option3.series[4].data = response.data.aum5;
                // 贡献度
                _this.option5.xAxis[0].data = response.data.xaxis;
                _this.option5.series[0].data = response.data.aum6;
                _this.option5.series[1].data = response.data.aum7;
                _this.option5.series[2].data = response.data.aum8;
                _this.option5.series[3].data = response.data.aum9;
                // 贷款变化情况
                _this.option6.xAxis[0].data = response.data.xaxis;
                _this.option6.series[0].data = response.data.aum10;
                _this.option6.series[1].data = response.data.aum11;
                // 总负债
                _this.option7.xAxis[0].data = response.data.xaxis;
                _this.option7.series[0].data = response.data.aum13;
                _this.option7.series[1].data = response.data.aum12;
              }
            }
          });
        },
        /**
         * 贡献度占比
         */
        initOption2: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custorgService + '/api/ocusthomepage/queryorgreportlist/' + custId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.data.length == 0) {
                  _this.option4.series[0].data = [{name: '', value: 0}];
                } else {
                  _this.option4.series[0].data = response.data;
                }
              }
            }
          });
        }

      }
    });
  };
});