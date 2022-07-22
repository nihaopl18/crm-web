/**
 * @created by houyx3 on 2019/05/13.
 * @description 实时数据
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          value1: '2019-05-11',
          value2: '2019-05-12',
          userNumChart: {
            title: {
              text: '页面访问趋势',
              textStyle: {
                fontSize: 15
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'line'
              },
              formatter: function (params) {
                var relVal = '';
                relVal = params[0].name;
                return relVal;
              }
            },
            xAxis: {
              type: 'category',
              data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
                '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
                '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
                '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
              axisLabel: {
                interval: 1
              }
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [9000, 8800, 8500, 8300, 8200, 8100, 7900, 8000, 8600, 8320, 8100, 7800,
                8600, 8600, 8000, 7900, 7800, 7700, 7600, 8000, 8100, 8120, 7900, 7800],
              type: 'line'
            },
            {
              data: [8800, 8700, 8400, 8260, 7900, 7800, 7900, 8100, 8200, 8300, 8000, 7800,
                8500, 8600, 7800, 7200, 4600],
              type: 'line'
            }]
          },
          equityChart: {
           title: {
							show: false,
							text: '用户活跃趋势',
							textStyle: {
								fontSize: 15
							}
						},
						legend: {
							textStyle:{
								fontSize:14,
								color:'#5C6376'
							},
							data:[{
								name:'今日',
								icon:'roundRect'
							},{
								name:'昨日',
								icon:'roundRect'
							}],
							show:true,
							itemWidth: 16,
							itemHeight: 16,
							right:75,
							top:30,
							textStyle: {
								color: '#666'
							}
						},
						grid: {
							top: '70',
							left: '28',
							right: '28',
							bottom: '30',
							containLabel: true
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'line'
							},
							formatter: function(params) {
								var relVal = '';
								relVal = params[0].name;
								return relVal;
							}
						},
						xAxis: {
							type: 'category',
							data: ['00:00', '02:00', '04:00',
								'06:00', '08:00', '10:00',
								'12:00', '14:00', '16:00',
								'18:00', '20:00', '22:00', '24:00'
							],
							axisLine: {
								show: false,
								lineStyle: {
									color: '#E3E7F7',
									type: 'dashed'
								}
							},
							axisLabel: {
								show: true,
								margin: 20,
								textStyle: {
									color: '#434343', //更改坐标轴文字颜色
									fontSize: 14 //更改坐标轴文字大小
								}
							}
						},
						yAxis: {
							name: '人',
							type: 'value',
							nameTextStyle:{
								color:'#434343'
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								show: true,
								margin: 20,
								textStyle: {
									color: '#434343', //更改坐标轴文字颜色
									fontSize: 14 //更改坐标轴文字大小
								}
							},
							axisLine: {
								show: false,
								lineStyle: {
									color: '#E3E7F7',
									type: 'dashed'
								}
							},
							splitLine: {
								show: true,
								lineStyle: {
									color: '#E3E7F7',
									type: 'dashed',
									width: 1
								}
							}
						},
						series: [{
							    name:'今日',
							    smooth: true,
								color: '#4A9FF8',
								itemStyle:{
									opacity:0
								},
								lineStyle:{
									width:3
								},
								data: [8100, 3800, 5700, 4000, 3000, 4000, 7000, 8000, 5700, 6800, 7000, 9000,4000
								],
								type: 'line'
							},
							{
								name:'昨日',
								smooth: true,
								color: '#68CDB0',
								itemStyle:{
									opacity:0
								},
								lineStyle:{
									width:3
								},
								data: [7200, 4000, 2000, 4500, 4000, 4000, 6000, 4300, 7800, 8500, 4000, 6000,5000
								],
								type: 'line'
							}
						]
          }
        };
      },
      methods: {
      }
    });
  };
});