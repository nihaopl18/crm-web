/**
 * @created by
 * @updated by
 * @description 首页
 */
define(['echarts'], function(require, exports) {
  var colors = ['#20a0ff', '#13ce66', '#f7ba2a', '#ff4949', '#50bfff', '#8a6de9'];

  //page加载完成后调用ready方法
  exports.ready = function(hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      mounted: function() {
        var newRoute = {
          route_20180107211030: {
            html: "pages/example/package/demoAddMenuTab.html",
            js: "pages/example/package/demoAddMenuTab.js"
          }
        };
        yufp.router.addRouteTable(newRoute);
        window.dashboardClickFn = function() {
          var customKey = 'custom_20180107211918'; //请以custom_前缀开头，并且全局唯一
          var routeId = 'route_20180107211918'; //模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, //菜单功能ID（路由ID）
            key: customKey, //自定义唯一页签key,请统一使用custom_前缀开头
            title: '报告详情', //页签名称
            data: {
              custId: '1001001'
            } //传递的业务数据，可选配置
          });
        };

        setCharts = function() {
          //退出率
          var myChart106 = echarts.init(document.getElementById('chartBox106'));
          var option106 = {
            title: {
              text: '退出率',
              left: 'center',
              top: 'bottom',
              padding: [0, 0, 20, 0],
              textStyle: {
                color: '#666',
                fontWeight: 'normal',
                fontSize: 14
              }
            },
            tooltip: {
              formatter: "{a}<br/>退出率: {c}%"
            },
            grid: {
              top: '10',
              left: '10',
              right: '10',
              bottom: '10',
              containLabel: true
            },
            series: [{
              name: '2016年9月',
              type: 'gauge',
              radius: '85%',
              detail: {
                formatter: '{value}%',
                offsetCenter: [0, '55%'],
                textStyle: {
                  fontSize: 22
                }
              },
              data: [{
                value: 15
              }],
              axisLine: {
                lineStyle: {
                  width: 12,
                  color: [
                    [0.2, colors[1]],
                    [0.8, colors[0]],
                    [1, colors[3]]
                  ]
                }
              },
              pointer: {
                length: '80%',
                width: 6
              }
            }]
          };
          myChart106.setOption(option106);

          //良好率
          var myChart107 = echarts.init(document.getElementById('chartBox107'));
          var option107 = {
            title: {
              text: '良好率',
              left: 'center',
              top: 'bottom',
              padding: [0, 0, 20, 0],
              textStyle: {
                color: '#666',
                fontWeight: 'normal',
                fontSize: 14
              }
            },
            tooltip: {
              formatter: "{a}<br/>良好率: {c}%"
            },
            grid: {
              top: '10',
              left: '10',
              right: '10',
              bottom: '10',
              containLabel: true
            },
            series: [{
              name: '2016年9月',
              type: 'gauge',
              radius: '85%',
              detail: {
                formatter: '{value}%',
                offsetCenter: [0, '55%'],
                textStyle: {
                  fontSize: 22
                }
              },
              data: [{
                value: 69
              }],
              axisLine: {
                lineStyle: {
                  width: 12,
                  color: [
                    [0.2, colors[3]],
                    [0.8, colors[0]],
                    [1, colors[1]]
                  ]
                }
              },
              pointer: {
                length: '80%',
                width: 6
              }
            }]
          };
          myChart107.setOption(option107);

          //存款趋势
          var myChart108 = echarts.init(document.getElementById('chartBox108'));
          var option108 = {
            title: {},
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['命中率', '覆盖率'],
              padding: [15, 0, 0, 10],
              textStyle: {
                color: '#666'
              }
            },
            grid: {
              top: '40',
              left: '10',
              right: '10',
              bottom: '15',
              containLabel: true
            },
            textStyle: {
              color: '#888'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['3月', '4月', '5月', '6月', ' 7月', '8月'],
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              }
            },
            yAxis: [{
              show: false,
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              }
            },{
              show: false,
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              }
            }],
            series: [{
              name: '命中率',
              type: 'bar',
              barWidth: '10',
              data: [27, 67, 46, 82, 69, 70],
              itemStyle: {
                normal: {
                  color: colors[0]
                }
              }
            }, {
              name: '覆盖率',
              yAxisIndex:1,
              type: 'bar',
              barWidth: '10',
              data: [69, 43, 72, 58, 27, 77],
              itemStyle: {
                normal: {
                  color: colors[2]
                }
              }
            }]
          };
          myChart108.setOption(option108);

          //贷款趋势
          var myChart104 = echarts.init(document.getElementById('chartBox104'));
          var option104 = {
            title: {},
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['2017年', '2018年'],
              padding: [15, 0, 0, 10],
              textStyle: {
                color: '#666'
              }
            },
            grid: {
              top: '40',
              left: '0',
              right: '30',
              bottom: '15',
              containLabel: true
            },
            textStyle: {
              color: '#888'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['3月', '4月', '5月', '6月', ' 7月', '8月'],
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              }
            },
            yAxis: {
              show: false,
              type: 'value',
              min: 'dataMin',
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              }
            },
            series: [{
              name: '2018年',
              type: 'line',
              smooth: true,
              barWidth: '10',
              data: [2688, 3771, 4129, 5233, 2341, 4122],
              itemStyle: {
                normal: {
                  color: colors[0]
                }
              }
            }, {
              name: '2017年',
              type: 'line',
              smooth: true,
              barWidth: '10',
              data: [4188, 2671, 2800, 3200, 3800, 2695],
              itemStyle: {
                normal: {
                  color: colors[2]
                }
              }
            }]
          };
          myChart104.setOption(option104);

          //中间业务收入
          var myChart101 = echarts.init(document.getElementById('chartBox101'));
          var option101 = {
            title: {},
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              show: false
            },
            grid: {
              top: '10',
              left: '-20',
              right: '20',
              bottom: '10',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['3月', '4月', '5月', '6月', ' 7月', '8月'],
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              }
            },
            textStyle: {
              color: '#888'
            },
            yAxis: {
              show: false,
              type: 'value',
              min: 'dataMin'
            },
            series: [{
              name: '余额',
              type: 'line',
              smooth: true,
              data: [1880, 1337, 1190, 1900, 2130, 1680.82],
              itemStyle: {
                normal: {
                  color: colors[0]
                }
              }
            }]
          };

          myChart101.setOption(option101);

          //中间业务收入
          var myChart102 = echarts.init(document.getElementById('chartBox102'));
          var option102 = {
            title: {},
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              show: false
            },
            grid: {
              top: '10',
              left: '-20',
              right: '20',
              bottom: '10',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['3月', '4月', '5月', '6月', '7月', '8月'],
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              }
            },
            textStyle: {
              color: '#888'
            },
            yAxis: {
              show: false,
              type: 'value'
            },
            series: [{
              name: '收入',
              type: 'line',
              barWidth: '10',
              smooth: true,
              data: [188.08, 243.71, 129, 290.01, 213.01, 380.28],
              itemStyle: {
                normal: {
                  color: colors[2]
                }
              }
            }]
          };

          myChart102.setOption(option102);

          //中间业务收入
          var myChart103 = echarts.init(document.getElementById('chartBox103'));
          var option103 = {
            title: {},
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              show: false
            },
            grid: {
              top: '10',
              left: '-20',
              right: '20',
              bottom: '10',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['3月', '4月', '5月', '6月', '7月', '8月'],
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              }
            },
            textStyle: {
              color: '#888'
            },
            yAxis: {
              show: false,
              type: 'value',
              min: 'dataMin'
            },
            series: [{
              name: '余额',
              type: 'line',
              barWidth: '10',
              smooth: true,
              data: [20.08, 83.71, 129, 190.01, 210.01, 230.15],
              itemStyle: {
                normal: {
                  color: colors[3]
                }
              }
            }]
          };

          myChart103.setOption(option103);
        };

        setTabs = function() {
          $('.yu-tabs').each(function() {
            var _eN = $(this).attr('data-eventName') ? $(this).attr('data-eventName') : 'click';
            $(this).find('a').on(_eN, function() {
              $(this).addClass('selected').siblings().removeClass('selected');
              $(this).parent().parent().siblings('.yu-tabBox').eq($(this).index()).show().siblings('.yu-tabBox').hide();
            });
          });
        };

        //Demo相关js逻辑，仅示例，请开发自行实现完善
        setTabs();
        setCharts();
      }
    });

  };

  //消息处理
  exports.onmessage = function(type, message) {

  };

  //page销毁时触发destroy方法
  exports.destroy = function(id, cite) {

  }

});