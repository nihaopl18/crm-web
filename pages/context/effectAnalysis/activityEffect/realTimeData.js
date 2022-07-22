/**
 * @created by houyx3 on 2019/05/13.
 * @description 实时数据
 */
define(function(require, exports) {
	// page加载完成后调用ready方法
	exports.ready = function(hashCode, data, cite) {
		yufp.custom.vue({
			el: cite.el,
			data: function() {
				return {
					value1: '2019-05-11',
					value2: '2019-05-12',
					isActive1: 0, //1为上升，0为下降，动态获取值 判断追加class
					isActive2: 1, //1为上升，0为下降，动态获取值 判断追加class
					isActive3: 1, //1为上升，0为下降，动态获取值 判断追加class
					isActive4: 1, //1为上升，0为下降，动态获取值 判断追加class
					isActive5: 1, //1为上升，0为下降，动态获取值 判断追加class
					userNumChart: {
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
					},
					equityChart: {
						title: {
							show: false,
							text: '权益发放趋势',
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
			methods: {}
		});
	};
});