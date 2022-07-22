yufp.require.require([
  './themes/common/tree-menu.css'
]);
define([
  'echarts',
  'jquery',
  './libs/echarts/map/citymap.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CUST_TYPE,REMIND_ACCT_TYPE,IS_READ');
    var vm = yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          // provinces: {
          //   // 23个省
          //   '台湾省': '710000',
          //   '河北省': '130000',
          //   '山西省': '140000',
          //   '辽宁省': '210000',
          //   '吉林省': '220000',
          //   '黑龙江省': '230000',
          //   '江苏省': '320000',
          //   '浙江省': '330000',
          //   '安徽省': '340000',
          //   '福建省': '350000',
          //   '江西省': '360000',
          //   '山东省': '370000',
          //   '河南省': '410000',
          //   '湖北省': '420000',
          //   '湖南省': '430000',
          //   '广东省': '440000',
          //   '海南省': '460000',
          //   '四川省': '510000',
          //   '贵州省': '520000',
          //   '云南省': '530000',
          //   '陕西省': '610000',
          //   '甘肃省': '620000',
          //   '青海省': '630000',
          //   // 5个自治区
          //   '新疆维吾尔自治区': '650000',
          //   '广西壮族自治区': '450000',
          //   '内蒙古自治区': '150000',
          //   '宁夏回族自治区': '640000',
          //   '西藏自治区': '540000',
          //   // 4个直辖市
          //   '北京市': '110000',
          //   '天津市': '120000',
          //   '上海市': '310000',
          //   '重庆市': '500000',
          //   // 2个特别行政区
          //   '香港特别行政区': '810000',
          //   '澳门特别行政区': '820000'
          // },
          // specialProvinces: ['北京', '天津', '上海', '重庆', '香港', '澳门'],

          // mapOption: {
          //     "backgroundColor": "#051b4a",
          //     "grid": {"right": 10, "top": 50, "bottom": 20, "width": "200"},
          //     "title": [{
          //         "text": "数据统计情况",
          //         "left": "75%",
          //         "top": 20,
          //         "textStyle": {"color": "#fff", "fontSize": 14}
          //     }],
          //     tooltip: {
          //         trigger: 'axis',
          //         axisPointer: {
          //             type: 'shadow'
          //         }
          //     },
          //     "xAxis": {
          //         "show": false,
          //         "type": "value",
          //         "scale": true,
          //         "position": "top",
          //         "min": 0,
          //         "boundaryGap": false,
          //         "splitLine": {"show": false},
          //         "axisLine": {"show": false},
          //         "axisTick": {"show": false},
          //         "axisLabel": {"margin": 2, "textStyle": {"color": "#aaa"}}
          //     },
          //     "yAxis": {
          //         "type": "category",
          //         "nameGap": 16,
          //         "axisLine": {"show": true, "lineStyle": {"color": "#ddd"}},
          //         "axisTick": {"show": false, "lineStyle": {"color": "#ddd"}},
          //         "axisLabel": {"interval": 0, "textStyle": {"color": "#ddd", fontSize: 10}},
          //         "data": []
          //     },
          //     "geo": {
          //         "map": "china",
          //         "zoom": 1,
          //         "label": {"emphasis": {"show": true}},
          //         "roam": true,
          //         "itemStyle": {
          //             "normal": {
          //                 "borderColor": "rgba(147, 235, 248, 1)",
          //                 "borderWidth": 1,
          //                 "areaColor": {
          //                     "type": "radial",
          //                     "x": 0.5,
          //                     "y": 0.5,
          //                     "r": 0.8,
          //                     "colorStops": [{"offset": 0, "color": "rgba(147, 235, 248, 0)"}, {
          //                         "offset": 1,
          //                         "color": "rgba(147, 235, 248, .2)"
          //                     }],
          //                     "globalCoord": false
          //                 },
          //                 "shadowColor": "rgba(128, 217, 248, 1)",
          //                 "shadowOffsetX": -2,
          //                 "shadowOffsetY": 2,
          //                 "shadowBlur": 10
          //             }, "emphasis": {"areaColor": "#389BB7", "borderWidth": 0}
          //         }
          //     },
          //     "series": [{
          //         "type": "effectScatter",
          //         "coordinateSystem": "geo",
          //         "data": [],
          //         "showEffectOn": "render",
          //         "rippleEffect": {"brushType": "stroke"},
          //         "hoverAnimation": true,
          //         "label": {"normal": {"formatter": "{b}", "position": "right", "show": true}},
          //         "itemStyle": {"normal": {"color": "#1DE9B6", "shadowBlur": 10, "shadowColor": "#1DE9B6"}},
          //         "zlevel": 1
          //     }, {
          //         "zlevel": 1.5,
          //         "type": "bar",
          //         barMaxWidth: 20,
          //         "symbol": "none",
          //         "itemStyle": {"normal": {"color": "#1DE9B6"}},
          //         "data": []
          //     }]
          // },

          // mapOption: {
          //   'backgroundColor': '#051b4a',
          //   'grid': {'right': 10, 'top': 110, 'bottom': 20, 'width': '200'},
          //   'title': [{
          //     'text': '',
          //     'subtext': '',
          //     'left': '75%',
          //     'top': 40,
          //     'textStyle': {'color': '#fff', 'fontSize': 14},
          //     'subtextStyle': {'color': '#fff', 'fontSize': 14}
          //   }],
          //   tooltip: {
          //     trigger: 'item',
          //     axisPointer: {
          //       type: 'shadow'
          //     },
          //     confine: true,
          //     formatter: function (params) {
          //       if (params.componentSubType == 'bar') {
          //         if (params.seriesIndex === 1) {
          //           return '指标值' + '<br>' + params.name + '：' + params.value;
          //         } else if (params.seriesIndex === 2) {
          //           return '任务值' + '<br>' + params.name + '：' + params.value;
          //         }
          //         // 格式化数据待确定
          //         // console.log(params.dataIndex);
          //       } else if (params.componentSubType == 'effectScatter') {
          //         // console.log(params, 111111111111111);
          //         var str = params.name + '：' + params.value[2];
          //         vm.mapData[params.dataIndex].detail.forEach(function (item) {
          //           str += '<br>';
          //           str += item.orgName;
          //         });
          //         // console.log(params.dataIndex);
          //         // console.log(vm.mapData);
          //         return str;
          //       }
          //     }
          //   },
          //   'xAxis': {
          //     'show': false,
          //     'type': 'value',
          //     'scale': true,
          //     'position': 'top',
          //     'min': 0,
          //     'boundaryGap': false,
          //     'splitLine': {'show': false},
          //     'axisLine': {'show': false},
          //     'axisTick': {'show': false},
          //     'axisLabel': {'margin': 2, 'textStyle': {'color': '#aaa'}}
          //   },
          //   'yAxis': {
          //     'type': 'category',
          //     'nameGap': 16,
          //     'axisLine': {'show': true, 'lineStyle': {'color': '#ddd'}},
          //     'axisTick': {'show': false, 'lineStyle': {'color': '#ddd'}},
          //     'axisLabel': {'interval': 0, 'textStyle': {'color': '#ddd', fontSize: 10}},
          //     'data': []
          //   },
          //   'geo': {
          //     'map': 'china',
          //     'zoom': 1,
          //     layoutCenter: ['40%', '50%'],
          //     layoutSize: 450,
          //     'label': {'emphasis': {'show': false}},
          //     'roam': true,
          //     'itemStyle': {
          //       'normal': {
          //         'borderColor': 'rgba(147, 235, 248, 1)',
          //         'borderWidth': 1,
          //         'areaColor': {
          //           'type': 'radial',
          //           'x': 0.5,
          //           'y': 0.5,
          //           'r': 0.8,
          //           'colorStops': [{'offset': 0, 'color': 'rgba(147, 235, 248, 0)'}, {
          //             'offset': 1,
          //             'color': 'rgba(147, 235, 248, .2)'
          //           }],
          //           'globalCoord': false
          //         },
          //         'shadowColor': 'rgba(128, 217, 248, 1)',
          //         'shadowOffsetX': -2,
          //         'shadowOffsetY': 2,
          //         'shadowBlur': 10
          //       },
          //       'emphasis': {'areaColor': '#389BB7', 'borderWidth': 0}
          //     },


          //     // 'itemStyle': {
          //     //     normal: {
          //     //         areaColor: '#031525',
          //     //         borderColor: '#FFFFFF'
          //     //     },
          //     //     'emphasis': {
          //     //         'areaColor': '#389BB7',
          //     //         'borderWidth': 0
          //     //     }
          //     // },
          //     z: 2
          //   },
          //   'series': [
          //     {
          //       'type': 'effectScatter',
          //       'coordinateSystem': 'geo',
          //       'data': [],
          //       // symbolSize: function(val) {
          //       //     return val[2] / 10;
          //       // },
          //       'showEffectOn': 'render',
          //       'rippleEffect': {'brushType': 'stroke'},
          //       'hoverAnimation': true,
          //       'label': {
          //         'normal': {
          //           'formatter': '{b}',
          //           'position': 'right',
          //           'show': true
          //         }
          //       },
          //       'itemStyle': {'normal': {'color': '#1DE9B6', 'shadowBlur': 10, 'shadowColor': '#1DE9B6'}},
          //       'zlevel': 1
          //     }, {
          //       'zlevel': 1.5,
          //       'type': 'bar',
          //       // 'stack': '总量',
          //       barMaxWidth: 20,
          //       'symbol': 'none',
          //       'itemStyle': {'normal': {'color': '#1DE9B6'}},
          //       'data': []
          //     },
          //     {
          //       'zlevel': 1.5,
          //       'type': 'bar',
          //       // 'stack': '总量',
          //       barMaxWidth: 20,
          //       'symbol': 'none',
          //       'itemStyle': {
          //         'normal': {
          //           'color': '#FFCE6A',
          //           label: {
          //             show: true,
          //             position: 'right',
          //             textStyle: {
          //               color: '##937CFF'
          //             },
          //             formatter: function (params) {
          //               // var _this = this;
          //               var data1 = _this.mapOption.series[1].data;
          //               return params.value;
          //             }
          //           }
          //         }
          //       },
          //       'data': []
          //     }]
          // },

          // mapChart: '', // 地图对象
          // mapList: [{}], // 地图配置数据
          // mapArea: '', // 默认展示地图地点
          // mapAreaType: '', // country province city
          // mapType: '', // 1,2,3 地图层级
          // mapData: [], // 地图数据
          // mapBarOptions: [], // 柱形图下拉菜单配置项
          // mapBarValue: '', // 柱形图下拉菜单值
          // mapBarDataUrl: '', // 柱形图数据接口地址
          schemeId: '',
          indexId: '',

          noticeList: [], // 顶部通知列表
          tempNoticeUrl: '',
          tempNoticeTitle: '标题',
          balNoticeDialogVisible: false,
          noticeDialogVisible: false,
          todoDialogVisible: false,
          params: {},

          finNum: 0,
          taskNum: 0,
          taskData: [],
          taskDialogVisible: false,
          taskIndexId: '', // 任务列表指标值
          taskSchemeId: '', // 任务列表方案值
          taskWeight: '', // 任务列表权重
          taskIndexIdStr: '', // 任务列表-指标编号+维度信息
          taskDataUrl: '/api/pmafscheme/queryHomePageIndexNew',
          taskTableParams: {},

          concernCustData: [],
          taskList: [],
          rankingList: [], // 排名列表
          tempRankingUrl: '',
          tempRankingTitle: '标题',
          rankingDialogVisible: false,

          chartList: [], // 图表列表
          optionPie: {
            backgroundColor: '#fff',
            tooltip: {
              trigger: 'item',
              // formatter: '{a} <br/>{b} : {c} ({d}%)',
              formatter: '{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'horizontal',
              x: 'center',
              y: 'bottom',
              textStyle: {
                color: '#333',
                fontSize: '12'
              },
              data: []
            },
            // color: ['#9b7eed', '#7367ea', '#5487e6', '#11bdc3', '#73deeb', '#85e781', '#89fb52', '#defe03', '#ffcf00', '#fe8f00', '#ea6b6c', '#fc8082', '#fc8082', '#fa67ba'],
            calculable: false,
            series: [
              {
                // name: '',
                type: 'pie',
                radius: ['30%', '60%'],
                center: ['50%', '45%'],
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      textStyle: {
                        fontSize: '12',
                        // fontWeight: 'bold',
                        color: '#333'
                      },
                      formatter: '{b} {d}%'
                    },
                    labelLine: {
                      show: true
                    }
                  }
                },
                data: []
              }
            ]
          },
          optionBar: {
            grid: {
              x: 30,
              x2: 30,
              y: 30,
              y2: 50,
              z: 3,
              borderWidth: 0,
              borderColor: '#d9d9d9',
              containLabel: true
            },
            backgroundColor: '#fff',
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              orient: 'horizontal',
              x: 'center',
              y: 'bottom',
              textStyle: {
                color: '#333',
                fontSize: '12'
              },
              data: []
            },
            // color: ['#ea6b6c', '#d8b67a'],
            calculable: true,
            xAxis: [{
              type: 'category',
              splitLine: {
                lineStyle: {
                  width: 1,
                  color: '#d9d9d9'
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  width: 1,
                  color: '#d9d9d9'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#333'
                }
              },
              data: []
            }],
            yAxis: [{
              type: 'value',
              name: '',
              nameTextStyle: {
                color: '#333'
              },
              splitLine: {
                show: true,
                lineStyle: {
                  width: 1,
                  color: '#d9d9d9'
                }
              },
              z: 2,
              axisLine: {
                lineStyle: {
                  width: 1,
                  color: '#d9d9d9'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#333'
                },
                interval: 0
              }
            }],
            series: []
          },
          optionLine: {
            grid: {
              x: 30,
              x2: 30,
              y: 30,
              y2: 50,
              z: 3,
              borderWidth: 0,
              borderColor: '#d9d9d9',
              containLabel: true
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            backgroundColor: '#fff',
            legend: {
              orient: 'horizontal',
              x: 'center',
              y: 'bottom',
              textStyle: {
                color: '#333',
                fontSize: '12'
              },
              data: []
            },
            calculable: true,
            // color: ['#f8b551', '#5a9af9', '#ff3858'],
            xAxis: [{
              type: 'category',
              boundaryGap: true,
              splitLine: {
                show: false,
                lineStyle: {
                  width: 1,
                  color: '#d9d9d9'
                }
              },
              axisLine: {
                lineStyle: {
                  width: 1,
                  color: '#d9d9d9'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#333'
                }
              },
              data: []
            }],
            yAxis: [{
              type: 'value',
              name: '',
              nameTextStyle: {
                color: '#333'
              },
              splitLine: {
                lineStyle: {
                  width: 1,
                  color: '#d9d9d9'
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  width: 1,
                  color: '#d9d9d9'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#333'
                },
                interval: 0
              }
            }],
            series: []
          },
          formInline: {},
          options: [],
          rankListOne: []
        };
      },
      mounted: function () {
        this._init();
      },
      computed: {
        // isMapCenter: function () {
        //   return this.mapList.length === 2 && this.mapList[1].schemeId;
        // },

        noticeDataUrl: function () {
          return backend.appBaseService + this.tempNoticeUrl;
        },
        rankingDataUrl: function () {
          return backend.appBaseService + this.tempRankingUrl;
        },
        taskCompRate: function () {
          if (!this.taskNum || !this.finNum) {
            return 0;
          }
          return (this.finNum / this.taskNum * 100).toFixed(2) + '%';
        },
        progressStyle: function () {
          var rate;
          if (!this.taskNum || !this.finNum) {
            rate = 0;
          } else {
            rate = (this.finNum / this.taskNum * 100).toFixed(2);
          }
          return {
            'progress-bar': true,
            'progress-bar-striped': true,
            'progress-bar-danger': rate < 60,
            'progress-bar-warning': rate >= 60 && rate < 85,
            'progress-bar-success': rate >= 85
          };
        },
        progressTextStyle: function () {
          var rate;
          if (!this.taskNum || !this.finNum) {
            rate = 0;
          } else {
            rate = (this.finNum / this.taskNum * 100).toFixed(2);
          }
          return {
            'text-value': true,
            'text-danger': rate < 60,
            'text-warning': rate >= 60 && rate < 85,
            'text-success': rate >= 85
          };
        }
      },
      watch: {
        // mapList: {
        //   handler: function (newValue, oldValue) {
        //     if (newValue.length > 0) {
        //       this.mapChart = echarts.init(document.getElementById('mapArea'));
        //     }
        //   },
        //   deep: true
        // }
        'formInline.indexId': function (val) {
          var _this = this;
          if (val) {
            var model = {};
            // model.orgId = yufp.session.details.grantOrgCode;
            model.orgId = yufp.session.org.code;
            model.userId = yufp.session.user.loginCode;
            model.indexId = _this.formInline.indexId;
            model.etlDate = yufp.util.dateFormat(_this.formInline.date, '{y}{m}{d}');
            if (_this.rankListOne.length > 0) {
              _this.rankingList = _this.rankListOne.map(function (item) {
                yufp.service.request({
                  method: 'GET',
                  url: item.url,
                  data: {condition: JSON.stringify(model)},
                  callback: function (code, message, response) {
                    _this.$set(item, 'data', response.data ? response.data : []);
                  }
                });
                return item;
              });
            }
          }
        },
        'formInline.date': function (val) {
          var _this = this;
          if (val) {
            var model = {};
            // model.orgId = yufp.session.details.grantOrgCode;
            model.orgId = yufp.session.org.code;
            model.userId = yufp.session.user.loginCode;
            model.indexId = _this.formInline.indexId;
            model.etlDate = yufp.util.dateFormat(_this.formInline.date, '{y}{m}{d}');
            if (_this.rankListOne.length > 0) {
              _this.rankingList = _this.rankListOne.map(function (item) {
                yufp.service.request({
                  method: 'GET',
                  url: item.url,
                  data: {condition: JSON.stringify(model)},
                  callback: function (code, message, response) {
                    _this.$set(item, 'data', response.data ? response.data : []);
                  }
                });
                return item;
              });
            }
          }
        }
      },
      methods: {
        // 初始化加载数据
        _init: function () {
          this.getDate();
          // this.getMap();
          this.getTaskList();
          this.getChartList();
          this.getNoticeList();
          this.getRankList();
        },
        lookUpChange: function (val) {
          var _this = this;
          if (val == undefined) {
            return;
          }
          _this.options = [];
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/appperformance/queryindexid/' + val,
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                _this.options = response.data;
                _this.formInline.indexId = _this.options[0].key;
              }
            }
          });
        },
        getDate: function () {
          var _this = this;
          _this.formInline.indexType = 'DP';
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/appperformance/queryetldate',
            callback: function (code, message, response) {
              if (response.code == 0) {
                var year = parseInt(response.data[0].etlDate.substring(0, 4));
                var month = parseInt(response.data[0].etlDate.substring(4, 6));
                var day = parseInt(response.data[0].etlDate.substring(6, 8));
                _this.formInline.date = new Date(year, month - 1, day);
              }
            }
          });
        },
        // 获取地图配置
        // getMap: function () {
        //   var _this = this;
        //   var model = {};
        //   model.userId = yufp.session.user.loginCode;
        //   model.roleId = yufp.session.roles[0].code;
        //   yufp.service.request({
        //     method: 'GET',
        //     url: backend.appHomepageService + '/api/adminbasehomemap/gethomemaplist',
        //     data: {condition: JSON.stringify(model)},
        //     callback: function (code, message, response) {
        //       if (code == '0' && response.code == 0) {
        //         _this.mapList = response.data;
        //         if (_this.mapList.length > 0) {
        //           _this.mapType = _this.mapList[0].val;
        //           // 根据层级获取默认展示地图
        //           switch (_this.mapType) {
        //           case '1':
        //             _this.mapArea = 'china';// 中国
        //             _this.mapAreaType = '';
        //             break;
        //           case '2':
        //             _this.mapArea = _this.mapList[0].province;
        //             _this.mapAreaType = 'province';
        //             break;
        //           case '3':
        //             _this.mapArea = _this.mapList[0].city;
        //             _this.mapAreaType = 'city';
        //             break;
        //           default:
        //             _this.mapType = '1';
        //             _this.mapArea = 'china';// 中国
        //             _this.mapAreaType = '';
        //             break;
        //           }
        //           _this.getMapData(_this.mapType, _this.mapArea, _this.showMap);
        //           if (_this.mapList[1] && _this.mapList[1].schemeId) {
        //             var urlArr = _this.mapList[1].url.split(',');
        //             _this.schemeId = _this.mapList[1].schemeId;
        //             _this.mapBarDataUrl = urlArr[1];
        //             _this.getMapBarOption(_this.schemeId, urlArr[0]);
        //           } else {
        //             _this.mapOption.title[0].show = false;
        //             _this.mapOption.xAxis.show = false;
        //             _this.mapOption.yAxis.show = false;
        //             _this.mapOption.geo.layoutCenter = ['50%', '50%'];
        //           }
        //         }
        //       }
        //     }
        //   });
        // },
        // 获取地图数据
        // getMapData: function (valOne, mapArea, func) {
        //   var _this = this;
        //   var model = {};
        //   model.valOne = valOne;
        //   model.areaId = mapArea;
        //   yufp.service.request({
        //     method: 'GET',
        //     url: backend.appHomepageService + '/api/adminbasehomemap/getorgbymap',
        //     data: {condition: JSON.stringify(model)},
        //     callback: function (code, message, response) {
        //       if (code == '0' && response.code == 0) {
        //         _this.mapData = response.data;
        //         var d = [];
        //         for (var j = 0; j < _this.mapData.length; j++) {
        //           d.push({
        //             name: _this.mapData[j].name,
        //             value: [_this.mapData[j].longitude, _this.mapData[j].latitude, _this.mapData[j]['num']]
        //           });
        //         }
        //         _this.mapOption.series[0].data = d;
        //         func ? func() : _this.mapChart.setOption(_this.mapOption, true);
        //       }
        //     }
        //   });
        // },
        // 展示地图
        // showMap: function () {
        //   var _this = this;
        //   var mapJsonUrl = 'libs/echarts/map/' + (_this.mapAreaType ? _this.mapAreaType + '/' : '') + _this.mapArea + '.json';
        //   $.getJSON(mapJsonUrl, function (data) {
        //     echarts.registerMap(_this.mapArea, data);
        //     if (_this.mapArea === 'china') {
        //       if (_this.isMapCenter) {
        //         _this.mapOption.geo.layoutCenter = ['40%', '60%'];
        //       } else {
        //         _this.mapOption.geo.layoutCenter = ['50%', '60%'];
        //       }
        //     } else {
        //       if (_this.isMapCenter) {
        //         _this.mapOption.geo.layoutCenter = ['40%', '50%'];
        //       } else {
        //         _this.mapOption.geo.layoutCenter = ['50%', '50%'];
        //       }
        //     }
        //     _this.mapOption.geo.map = _this.mapArea;
        //     _this.mapChart.setOption(_this.mapOption, true);
        //   });
        //   // _this.mapChart.setOption(_this.mapOption);
        //   _this.mapChart.on('click', function (params) {
        //     if (params.componentType === 'geo' || params.componentSubType === 'effectScatter') {
        //       if (params.name in _this.provinces) {
        //         _this.mapType = '2';
        //         _this.mapArea = _this.provinces[params.name];
        //         // 如果点击的是34个省、市、自治区，绘制选中地区的二级地图
        //         $.getJSON('libs/echarts/map/province/' + _this.mapArea + '.json', function (data) {
        //           echarts.registerMap(_this.mapArea, data);
        //           if (_this.isMapCenter) {
        //             _this.mapOption.geo.layoutCenter = ['40%', '50%'];
        //           } else {
        //             _this.mapOption.geo.layoutCenter = ['50%', '50%'];
        //           }
        //           _this.mapOption.geo.map = _this.mapArea;
        //           if (_this.mapList.length === 1) {
        //             _this.getMapData(_this.mapType, _this.mapArea);
        //           } else if (_this.isMapCenter) {
        //             _this.getMapData(_this.mapType, _this.mapArea, _this.getMapBarData);
        //           } else {
        //             _this.getMapData(_this.mapType, _this.mapArea);
        //           }
        //           // _this.mapChart.setOption(_this.mapOption, true);
        //         });
        //       } else if (params.name in cityMap) {
        //         // 如果是【直辖市/特别行政区】只有二级下钻
        //         if (_this.specialProvinces.indexOf(params.name) >= 0) {
        //           _this.mapType = '1';
        //           _this.mapArea = '';
        //           // _this.getMapBarData();
        //           // _this.getMapData(_this.mapType, _this.mapArea);
        //           $.getJSON('libs/echarts/map/china.json', function (data) {
        //             echarts.registerMap('china', data);
        //             _this.mapOption.geo.map = 'china';
        //             if (_this.isMapCenter) {
        //               _this.mapOption.geo.layoutCenter = ['40%', '60%'];
        //             } else {
        //               _this.mapOption.geo.layoutCenter = ['50%', '60%'];
        //             }

        //             if (_this.isMapCenter) {
        //               _this.getMapData(_this.mapType, _this.mapArea, _this.getMapBarData);
        //             } else {
        //               _this.getMapData(_this.mapType, _this.mapArea);
        //             }
        //             // _this.mapChart.setOption(_this.mapOption, true);
        //           });
        //         } else {
        //           // 显示县级地图
        //           _this.mapType = '3';
        //           _this.mapArea = cityMap[params.name];
        //           // _this.getMapBarData();
        //           // _this.getMapData(_this.mapType, _this.mapArea);
        //           $.getJSON('libs/echarts/map/city/' + _this.mapArea + '.json', function (data) {
        //             echarts.registerMap(_this.mapArea, data);
        //             if (_this.isMapCenter) {
        //               _this.mapOption.geo.layoutCenter = ['40%', '50%'];
        //             } else {
        //               _this.mapOption.geo.layoutCenter = ['50%', '50%'];
        //             }

        //             _this.mapOption.geo.map = _this.mapArea;
        //             if (_this.mapList.length === 1) {
        //               _this.getMapData(_this.mapType, _this.mapArea);
        //             } else if (_this.isMapCenter) {
        //               _this.getMapData(_this.mapType, _this.mapArea, _this.getMapBarData);
        //             } else {
        //               _this.getMapData(_this.mapType, _this.mapArea);
        //             }
        //             // _this.mapChart.setOption(_this.mapOption, true);
        //           });
        //         }
        //       } else {
        //         _this.mapType = '1';
        //         _this.mapArea = '';
        //         // _this.getMapBarData();
        //         // _this.getMapData(_this.mapType, _this.mapArea);
        //         $.getJSON('libs/echarts/map/china.json', function (data) {
        //           echarts.registerMap('china', data);
        //           _this.mapOption.geo.map = 'china';
        //           if (_this.isMapCenter) {
        //             _this.mapOption.geo.layoutCenter = ['40%', '60%'];
        //           } else {
        //             _this.mapOption.geo.layoutCenter = ['50%', '60%'];
        //           }

        //           if (_this.isMapCenter) {
        //             _this.getMapData(_this.mapType, _this.mapArea, _this.getMapBarData);
        //           } else {
        //             _this.getMapData(_this.mapType, _this.mapArea);
        //           }
        //           // _this.mapChart.setOption(_this.mapOption, true);
        //         });
        //       }
        //     }
        //   });
        // },
        // // 获取柱形图展示菜单
        // getMapBarOption: function (schemeId, url) {
        //   var _this = this;
        //   var model = {};
        //   model.schemeId = schemeId;
        //   yufp.service.request({
        //     method: 'GET',
        //     url: backend.appHomepageService + url,
        //     data: {
        //       condition: JSON.stringify(model),
        //       page: 1,
        //       size: 10
        //     },
        //     callback: function (code, message, response) {
        //       if (code == '0' && response.code == 0) {
        //         _this.mapBarOptions = response.data;
        //         _this.mapBarValue = _this.mapBarOptions[0].indexId;
        //         _this.getMapBarData();
        //       }
        //     }
        //   });
        // },
        // // 获取柱形图展示数据
        // getMapBarData: function () {
        //   var _this = this;
        //   var model = {};
        //   model.schemeId = _this.schemeId;
        //   model.indexId = _this.mapBarValue;

        //   switch (_this.mapType) {
        //   case '1':
        //     model.province = '';
        //     model.city = '';
        //     break;
        //   case '2':
        //     model.province = _this.mapArea;
        //     model.city = '';
        //     break;
        //   case '3':
        //     model.province = '';
        //     model.city = _this.mapArea;
        //     break;
        //   }

        //   yufp.service.request({
        //     method: 'GET',
        //     url: backend.appHomepageService + _this.mapBarDataUrl,
        //     data: {
        //       condition: JSON.stringify(model),
        //       page: 1,
        //       size: 10
        //     },
        //     callback: function (code, message, response) {
        //       if (code == '0' && response.code == 0) {
        //         var _data = response.data;
        //         var compData = _data.filter(function (item) {
        //           return item.applyType == '00';
        //         });
        //         var targetData = _data.filter(function (item) {
        //           return item.applyType == '01';
        //         });
        //         var y = [];
        //         var n = [];
        //         var n2 = [];
        //         var sum = 0;
        //         for (var i = 0; i < compData.length; i++) {
        //           y.push(compData[i].evlObjName);
        //           n.push(compData[i].indexValue);
        //           sum += targetData[i].indexValue;
        //           n2.push(targetData[i].indexValue);
        //         }
        //         _this.mapOption.yAxis.data = y;
        //         _this.mapOption.series[1].data = n;
        //         _this.mapOption.series[2].data = n2;
        //         _this.mapOption.title[0].subtext = '当前人员任务总值：' + String(sum).replace(/^(.*\..{4}).*$/, '$1') + '万';
        //         _this.mapChart.setOption(_this.mapOption, true);
        //       }
        //     }
        //   });
        // },
        // // 地图柱形图指标切换
        // mapBarChange: function (val) {
        //   var _this = this;
        //   //   console.log(val);
        //   _this.mapBarValue = val;
        //   _this.getMapBarData();
        // },
        // 获取通知列表
        getNoticeList: function () {
          var _this = this;
          var model = {};
          model.userId = yufp.session.user.loginCode;
          model.roleId = yufp.session.roles[0].code;
          yufp.service.request({
            method: 'GET',
            url: backend.appHomepageService + '/api/adminbasehomeremind/gethomeremindlist',
            data: {condition: JSON.stringify(model)},
            callback: function (code, message, response) {
              if (code == '0' && response.code == 0) {
                _this.noticeList = response.data;
              }
            }
          });
        },
        // 获取任务列表
        getTaskList: function () {
          var _this = this;
          var model = {};
          model.userId = yufp.session.user.loginCode;
          model.roleId = yufp.session.roles[0].code;
          yufp.service.request({
            method: 'GET',
            url: backend.appHomepageService + '/api/adminbasehometask/gethometasklist',
            data: {condition: JSON.stringify(model)},
            callback: function (code, message, response) {
              if (code == '0' && response.code == 0) {
                _this.taskList = response.data;
                if (_this.taskList.length > 0 && _this.taskList[0].schemeId) {
                  _this.taskSchemeId = _this.taskList[0].schemeId;
                  _this.taskIndexId = _this.taskList[0].indexId ? _this.taskList[0].indexId : '';
                  _this.taskWeight = _this.taskList[0].indexWeight ? _this.taskList[0].indexWeight : '';
                  _this.taskIndexIdStr = _this.taskList[0].indexIdStr ? _this.taskList[0].indexIdStr : '';

                  var queryModel = {
                    condition: JSON.stringify({
                      schemeId: _this.taskSchemeId,
                      indexIdStr: _this.taskIndexIdStr
                    })
                  };
                  yufp.clone(queryModel, _this.taskTableParams);
                  _this.$nextTick(function () {
                    _this.$refs.taskRefTable.remoteData(_this.taskTableParams);
                  });
                  // _this.getIndex();
                }
              }
            }
          });
        },
        // 查看通知详情
        viewDetail: function (item) {
          var _this = this;
          _this.tempNoticeUrl = item.url;
          _this.tempNoticeTitle = item.title;
          var model = {};
          model.typeId = item.id;
          _this.params = {
            condition: JSON.stringify(model)
          };
          if (Number(item.id == 13)) {
            _this.todoDialogVisible = true;
            _this.noticeDialogVisible = false;
            _this.balNoticeDialogVisible = false;
          } else if (Number(item.id > 6)) {
            _this.todoDialogVisible = false;
            _this.noticeDialogVisible = true;
            _this.balNoticeDialogVisible = false;
          } else {
            _this.todoDialogVisible = false;
            _this.noticeDialogVisible = false;
            _this.balNoticeDialogVisible = true;
          }
          _this.$nextTick(function () {
            if (_this.balNoticeDialogVisible) {
              _this.$refs.balRefBaseTable.remoteData(_this.params);
            } else {
              _this.$refs.refBaseTable.remoteData(_this.params);
            }
          });
        },
        // 查询排名
        getRankList: function () {
          var _this = this;
          var model = {};
          model.userId = yufp.session.user.loginCode;
          model.roleId = yufp.session.roles[0].code;
          yufp.service.request({
            method: 'GET',
            url: backend.appHomepageService + '/api/adminbasehomerank/gethomeranklist',
            data: {condition: JSON.stringify(model)},
            callback: function (code, message, response) {
              if (code == '0' && response.code == 0) {
                _this.rankListOne = response.data;
              }
            }
          });
        },
        // 查看排名详情
        viewRankingDetail: function (item) {
          var _this = this;
          _this.tempRankingTitle = item.title;
          _this.tempRankingUrl = item.url;
          var model = {};
          // model.orgId = yufp.session.details.grantOrgCode;
          model.orgId = yufp.session.org.code;
          model.userId = yufp.session.user.loginCode;
          model.indexId = _this.formInline.indexId;
          model.etlDate = yufp.util.dateFormat(_this.formInline.date, '{y}{m}{d}');
          _this.params = {
            condition: JSON.stringify(model)
          };
          this.rankingDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.refRankingTable.remoteData(_this.params);
          });
        },

        // 获取图表展示配置
        getChartList: function () {
          var _this = this;
          var model = {};
          model.userId = yufp.session.user.loginCode;
          model.roleId = yufp.session.roles[0].code;
          yufp.service.request({
            method: 'GET',
            url: backend.appHomepageService + '/api/adminbasehomechart/gethomechartlist',
            data: {condition: JSON.stringify(model)},
            callback: function (code, message, response) {
              if (code == '0' && response.code == 0) {
                _this.chartList = response.data.map(function (item) {
                  item.option = {};
                  return item;
                });
                _this.getChartOption();
              }
            }
          });
        },
        getChartOption: function () {
          var _this = this;
          var params = {
            condition: JSON.stringify({
              page: 10,
              size: 1
            })
          };
          this.chartList = this.chartList.map(function (item) {
            if (item.type === 'bar') {
              item.option = JSON.parse(JSON.stringify(_this.optionBar));
              yufp.service.request({
                method: 'GET',
                url: backend.appHomepageService + item.url,
                data: params,
                callback: function (code, message, response) {
                  var _data = response.data;
                  item.option.legend.data = Object.values(_data.tlMap);
                  item.option.xAxis[0].data = _data.xMap;
                  Object.keys(_data.tlMap).forEach(function (itemKey, index) {
                    item.option.series.push({
                      name: item.option.legend.data[index],
                      type: 'bar',
                      barMaxWidth: 20,
                      barMinHeight: 5,
                      data: _data[itemKey]
                    });
                  });
                  // item.title = _data.title;
                }
              });
            } else if (item.type === 'line') {
              item.option = JSON.parse(JSON.stringify(_this.optionLine));
              yufp.service.request({
                method: 'GET',
                url: backend.appHomepageService + item.url,
                data: params,
                callback: function (code, message, response) {
                  var _data = response.data;
                  item.option.legend.data = Object.values(_data.tlMap);
                  item.option.xAxis[0].data = _data.xMap;
                  Object.keys(_data.tlMap).forEach(function (itemKey, index) {
                    item.option.series.push({
                      name: item.option.legend.data[index],
                      type: 'line',
                      data: _data[itemKey]
                    });
                  });
                  // item.title = _data.title;
                }
              });
            } else if (item.type === 'pie') {
              item.option = JSON.parse(JSON.stringify(_this.optionPie));
              yufp.service.request({
                method: 'GET',
                url: backend.appHomepageService + item.url,
                data: params,
                callback: function (code, message, response) {
                  var _data = response.data;
                  var legend = [];
                  var pieData = [];
                  _data.list.forEach(function (item) {
                    var obj = {};
                    obj.name = item.achiveTyNa;
                    obj.value = item.bal || 0;
                    legend.push(item.achiveTyNa);
                    pieData.push(obj);
                  });
                  item.option.legend.data = legend;
                  item.option.series[0].data = pieData;
                  // item.title = _data.title;
                }
              });
            }
            return item;
          });
        },
        getIndex: function () {
          var _this = this;
          var model = {};
          // model.indexId = _this.taskIndexId;
          model.schemeId = _this.taskSchemeId;
          model.indexIdStr = _this.taskIndexIdStr;
          yufp.yufp.service.request({
            method: 'GET',
            url: '/api/pmafscheme/queryHomePageIndexNew',
            data: {condition: JSON.stringify(model)},
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.taskData = response.data;
              }
              if (code == '0' && response.code == 0 && response.data.length > 0) {
                var compData = response.data.filter(function (item) {
                  return item.applyTypeId == '00';
                });
                var targetData = response.data.filter(function (item) {
                  return item.applyTypeId == '01';
                });
                var list = [];
                for (var i = 0; i < compData.length; i++) {
                  var obj = {};
                  obj.indexId = compData[i].indexId;
                  obj.indexName = compData[i].indexName;
                  obj.indexValue = compData[i].indexValue;
                  obj.planValue = targetData[i].indexValue;
                  if (obj.planValue != '0') {
                    obj.planPer = yufp.util.toPercent(parseInt(obj.indexValue) / parseInt(obj.planValue) * 100, 2);
                  }
                  list.push(obj);
                }
                _this.taskData = list;
                // 获取进度条数据
                var weight = _this.taskWeight.split(',');
                var indexId = _this.taskIndexId.split(',');
                var weightAll = 0;
                weight.filter(function (item) {
                  return weightAll += parseInt(item);
                });
                var taskNum = 0;
                var finNum = 0;
                for (var i = 0; i < _this.taskData.length; i++) {
                  for (var j = 0; j < indexId.length; j++) {
                    if (_this.taskData[i].indexId == indexId[j]) {
                      taskNum += parseInt(_this.taskData[i].planValue) * (parseInt(weight[j]) / parseInt(weightAll));
                      finNum += parseInt(_this.taskData[i].indexValue) * (parseInt(weight[j]) / parseInt(weightAll));
                      break;
                    } else {
                      continue;
                    }
                  }
                }
                _this.taskNum = taskNum;
                _this.finNum = finNum;
              }
            }
          });
        },
        balRefBaseTableClick: function (row) {
          row.isRead = row.isRead == '0' ? '1' : '0';
          yufp.service.request({
            method: 'POST',
            url: backend.appHomepageService + '/api/pmafremindres/modify',
            data: row,
            callback: function (code, message, response) {
              if (response.code == 0) {
              } else { // 如果操作失败，需要重置
                row.isRead = row.isRead == '0' ? '1' : '0';
              }
            }
          });
        },
        refBaseTableClick: function (row) {
          row.isRead = row.isRead == '0' ? '1' : '0';
          yufp.service.request({
            method: 'POST',
            url: backend.appHomepageService + '/api/pmafremindres/modify',
            data: row,
            callback: function (code, message, response) {
              if (response.code == 0) {
              } else { // 如果操作失败，需要重置
                row.isRead = row.isRead == '0' ? '1' : '0';
              }
            }
          });
        },
        rowDblclick: function (row, event) { // 往实例信息页面跳转
          var _self = this;
          if (row.length < 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _self.todoDialogVisible = false;
          yufp.service.request({
            method: 'GET',
            url: '/api/appremind/querytodomenu/' + row.funCode,
            data: {},
            callback: function (code, message, response) {
              if (response.code == 0) {
                yufp.frame.addTab({
                  id: response.data[0].funcId, // FUNC_ID(业务功能编号)
                  title: response.data[0].menuName, // MENU_NAME(菜单名称)
                  key: response.data[0].menuId, // 自定义唯一页签key,菜单MENU_ID
                  data: {} // 给打开的页面传参
                });
              } else {
              }
            }
          });
        }
      }
    });

    // 消息处理
    exports.onmessage = function (type, message) {

    };

    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    };
  };
});