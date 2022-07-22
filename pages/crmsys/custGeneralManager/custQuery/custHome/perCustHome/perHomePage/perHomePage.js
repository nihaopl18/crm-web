/**
 * @Created by luhy luhy1@yusys.com.cn on 2019-2-4 19:25:42.
 * @updated by
 * @description 客户经理业绩概览
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
    var flagImages = true;
    yufp.lookup.reg('CD0332');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          baseformdata: {
          },
          visitformdata: {

          },
          custPhotoStr: '',
          imageUrl: '',
          tags: [],
          uploadAction: yufp.service.getUrl({url: backend.gatewayService + backend.fileService + '/api/file/provider/uploadfile?access_token=' + yufp.service.getToken()}),
          // depdataUrl: backend.custpersonService + '/api/pcusthomepage/queryperbusssum/' + custId,
          //  loandataUrl: backend.custpersonService + '/api/pcusthomepage/queryperbusssum/' + custId,
          //  findataUrl: backend.custpersonService + '/api/pcusthomepage/queryperbusssum/' + custId,
          eventdataUrl: backend.custpubService + '/api/ocrmfcieventinfo/queryeventlist/' + custId + '/yes',
          discountdataUrl: backend.custpersonService + '/api/pcusthomepage/querydiscountlist/' + custId,
          //    viaitdataUrl: backend.custpersonService + '/api/pcusthomepage/queryvisitlist/' + custId,
          productdataUrl: backend.custpersonService + '/api/pcusthomepage/queryproductlist/' + custId,
          option: {
            title: {
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            grid: {
              left: '15%',
              right: '1%',
              bottom: '15%',
              containLable: false
            },
            series: [
              {
                name: 'AUM时点占比',
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
                name: '贡献度占比',
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
            grid: {
              left: '20%'
            },
            legend: {
              data: ['日均余额']
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
                name: '日均余额',
                type: 'line',
                data: []
              }
            ]
          },
          option3: {
            tooltip: {
              trigger: 'axis'
            },
            color: ['#EA5404', '#00aaff', '#1EA378', '#576577'],
            legend: {
              data: ['存款总余额', '定期存款余额', '活期存款余额', '存款月日均']
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
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '存款总余额',
                type: 'line',
                data: []
              }, {
                name: '定期存款余额',
                type: 'line',
                data: []
              },
              {
                name: '活期存款余额',
                type: 'line',
                data: []
              }, {
                name: '存款月日均',
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
                name: '存款贡献度',
                type: 'line',
                data: []
              },
              {
                name: '贷款贡献度度',
                type: 'line',
                data: []
              }, {
                name: '中间业务贡献度',
                type: 'line',
                data: []
              }, {
                name: '综合贡献度',
                type: 'line',
                data: []
              }
            ]
          },
          option5: {
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '20%'
            },
            legend: {
              data: ['总贷款余额', '不良贷款余额']
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
              }, {
                name: '不良贷款余额',
                type: 'line',
                data: []
              }

            ]
          },

          option10: {
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '20%'
            },
            legend: {
              data: ['月总流入', '月总流出']
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
                name: '月总流入',
                type: 'line',
                data: []
              },
              {
                name: '月总流出',
                type: 'line',
                data: []
              }
            ]
          },
          option7: {
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '20%'
            },
            legend: {
              data: ['时点余额', '上年日均余额', '当年日均余额']
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
                name: '上年日均余额',
                type: 'bar',
                data: []
              },
              {
                name: '当年日均余额',
                type: 'bar',
                data: []
              }
            ]
          },
          option8: {
            grid: {
              left: '20%'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['时点余额', '上年日均余额', '当年日均余额']
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
                name: '上年日均余额',
                type: 'bar',
                data: []
              },
              {
                name: '当年日均余额',
                type: 'bar',
                data: []
              }
            ]
          },
          option9: {
            grid: {
              left: '20%'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['时点余额', '上年日均余额', '当年日均余额']
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
                name: '上年日均余额',
                type: 'bar',
                data: []
              },
              {
                name: '当年日均余额',
                type: 'bar',
                data: []
              }
            ]
          }
        };
      },
      mounted: function () {
        var _this = this;
        _this.initPageData();// 概览信息
        //  _this.initEventPageData();// 事件
        _this.visitPageData();// 接触信息
        _this.initProTapData();// 产品标签
        _this.initOption();// AUM时点占比
        _this.initOption1();// 贡献度占比
        _this.initOption2();// 连续13月AUM月日均趋势图信息
        _this.initOption3();// 存贷理信息
      },
      methods: {
        /**
         * 表单初始化数据
         */
        handleAvatarSuccess: function (res, file) {
          var _this = this;
          if (flagImages) {
            var url = yufp.settings.ssl ? 'https://' : 'http://';
            url += yufp.settings.url;
            url += backend.fileService;
            url += '/api/file/provider/download?fileId=' + res.data.filePath;
            this.custPhotoStr = res.data.filePath;
            this.imageUrl = yufp.util.addTokenInfo(url);
            var condition = { imagePath: this.custPhotoStr };
            // this.imageUrl = URL.createObjectURL(file.raw);
            yufp.service.request({ // 查询业务数据
              method: 'GET',
              url: backend.custpersonService + '/api/pcustbaseview/saveImage/' + custId, // custId   /api/pcustbaseview/querylist
              data: { condition: JSON.stringify(condition) },
              callback: function (code, message, response) {
                if (code == 0) { // code等于0 说明成功
                  // yufp.extend(_this.$refs.baseForm.formdata, response.data.baseInfo[0]);// 基本信息
                  _this.$message('保存成功');
                }
              }
            });
          }
        },
        beforeAvatarUpload: function (file) {
          flagImages = true;
          var type = file.type;
          var size = file.size / 1024 / 1024;// && type !== 'image/png'
          if (type !== 'image/jpeg' && type !== 'image/jpg' && type !== 'image/png') {
            this.$message.error('上传头像图片只能是 jpeg,jpg,png 格式!');
            flagImages = false;
            return;
          }
          if (size > 2) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            flagImages = false;
            return;
          }
          return type && size;
        },
        initPageData: function () {
          var _this = this;
          yufp.service.request({ // 查询业务数据
            method: 'GET',
            url: backend.custpersonService + '/api/pcustbaseview/querylist/' + custId, // custId   /api/pcustbaseview/querylist
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
                // yufp.extend(_this.$refs.baseForm.formdata, response.data.baseInfo[0]);// 基本信息
                _this.baseformdata = response.data.baseInfo[0];
                _this.custPhotoStr = response.data.baseInfo[0].custPhoto;
                // var url = yufp.settings.ssl ? 'https://' : 'http://';
                // url += yufp.settings.url;
                // url += backend.fileService;
                // url += '/api/file/provider/download?fileId=' + _this.custPhotoStr;
                if (_this.custPhotoStr == undefined || _this.custPhotoStr == '') {
                  _this.custPhotoStr = 'themes/default/images/sexnv.png';
                  if (response.data.baseInfo[0].sex == '2') {
                    _this.imageUrl = 'themes/default/images/sexnv.png';
                  }
                  if (response.data.baseInfo[0].sex == '1') {
                    _this.imageUrl = 'themes/default/images/sexnan.png';
                  }
                } else {
                  var url = yufp.settings.ssl ? 'https://' : 'http://';
                  url += yufp.settings.url;
                  url += backend.fileService;
                  url += '/api/file/provider/download?fileId=' + _this.custPhotoStr;
                  _this.imageUrl = yufp.util.addTokenInfo(url);
                }
              }
            } });
        },
        /**
         * 接触信息
         */
        visitPageData: function () {
          var _this = this;
          yufp.service.request({ // 查询业务数据
            method: 'GET',
            url: backend.custpersonService + '/api/pcusthomepage/queryvisitlist/' + custId,
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
                // yufp.extend(_this.$refs.visitForm.formdata, response.data[0]);// 基本信息
                _this.visitformdata = response.data[0];
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
            url: backend.custpersonService + '/api/pcusthomepage/queryproducttaglist/' + custId,
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
                _this.tags = response.data;
              }
            } });
        },
        /**
         * 事件
         */
        /*  initEventPageData: function () {
          var _this = this;

          yufp.service.request({ // 查询业务数据
            method: 'GET',
            data: {topfive: 'yes'},
            url: '/api/ocrmfcieventinfo/queryeventlist/' + custId, // custId   /api/pcustbaseview/querylist
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
                _this.$refs.eventrefTable.tabledata = response.data;// 存款信息
              }
            } });
        },*/

        /**
         * AUM时点占比
         */
        initOption: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custpersonService + '/api/pcusthomepage/querypercustgradedist/' + custId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.data.length == 0) {
                  _this.option.series[0].data = [{name: '', value: 0}];
                } else {
                  _this.option.series[0].data = response.data;
                }
              }
            }
          });
        },
        /**
         * 贡献度占比
         */
        initOption1: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custpersonService + '/api/pcusthomepage/queryperreportlist/' + custId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.data.length == 0) {
                  _this.option1.series[0].data = [{name: '', value: 0}];
                } else {
                  _this.option1.series[0].data = response.data;
                }
              }
            }
          });
        },

        /**
         *
         */
        initOption2: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custpersonService + '/api/pcusthomepage/queryperbussmonsum/' + custId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                // AUM日均余额
                _this.option2.xAxis[0].data = response.data.xaxis;
                _this.option2.series[0].data = response.data.aum1;
                // 存款
                _this.option3.xAxis[0].data = response.data.xaxis;
                _this.option3.series[0].data = response.data.aum2;
                _this.option3.series[1].data = response.data.aum3;
                _this.option3.series[2].data = response.data.aum4;
                _this.option3.series[3].data = response.data.aum5;
                // 贡献度
                _this.option4.xAxis[0].data = response.data.xaxis;
                _this.option4.series[0].data = response.data.aum6;
                _this.option4.series[1].data = response.data.aum7;
                _this.option4.series[2].data = response.data.aum8;
                _this.option4.series[3].data = response.data.aum13;
                // 流入流出
                _this.option10.xAxis[0].data = response.data.xaxis;
                _this.option10.series[0].data = response.data.aum11;
                _this.option10.series[1].data = response.data.aum12;
                // 贷款
                _this.option5.xAxis[0].data = response.data.xaxis;
                _this.option5.series[0].data = response.data.aum9;
                _this.option5.series[1].data = response.data.aum10;
              }
            }
          });
        },
        initOption3: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custpersonService + '/api/pcusthomepage/queryperbusssum/' + custId,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                // 存款
                _this.option7.xAxis[0].data = response.data.xaxis;
                _this.option7.series[0].data = response.data.aum1;
                _this.option7.series[1].data = response.data.aum2;
                _this.option7.series[2].data = response.data.aum3;
                // 贷款
                _this.option8.xAxis[0].data = response.data.xaxis;
                _this.option8.series[0].data = response.data.aum4;
                _this.option8.series[1].data = response.data.aum5;
                _this.option8.series[2].data = response.data.aum6;
                // 理财
                _this.option9.xAxis[0].data = response.data.xaxis;
                _this.option9.series[0].data = response.data.aum7;
                _this.option9.series[1].data = response.data.aum8;
                _this.option9.series[2].data = response.data.aum9;
              }
            }
          });
        }

      }
    });
  };
});