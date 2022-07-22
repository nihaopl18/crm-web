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
					pageable:false,
					border:false,
					isActive1: 0, //1为上升，0为下降，动态获取值 判断追加class
					isActive2: 1, //1为上升，0为下降，动态获取值 判断追加class
					isActive3: 0, //1为上升，0为下降，动态获取值 判断追加class
					isActive4: 1, //1为上升，0为下降，动态获取值 判断追加class
					isActive5: 1, //1为上升，0为下降，动态获取值 判断追加class
					isActive6: 0, //1为上升，0为下降，动态获取值 判断追加class
					exchangeData: [{
							cardName: '星礼卡',
							cost: '318',
							useTime: '2019-05-15',
							explain: '说明文字'
						},
						{
							cardName: '腾讯会员码',
							cost: '534',
							useTime: '2019-05-15',
							explain: '说明文字'
						},
						{
							cardName: '移动话费码',
							cost: '318',
							useTime: '2019-05-15',
							explain: '说明文字'
						}
					],
					costData: [{
							channelName: '渠道1',
							cost: '1230',
							contriRate: '18%',
							roi: '3.4',
							putTime: '2019-05-15',
							explain: '说明文字'
						},
						{
							channelName: '渠道2',
							cost: '1230',
							contriRate: '18%',
							roi: '3.4',
							putTime: '2019-05-15',
							explain: '说明文字'
						},
						{
							channelName: '渠道3',
							cost: '1230',
							contriRate: '18%',
							roi: '3.4',
							putTime: '2019-05-15',
							explain: '说明文字'
						}
					],
					value1: '2019-05-11',
					value2: '2019-05-12',
					equityChart: {
						title: {
							show: false,
							text: '栏位访问趋势',
							textStyle: {
								fontSize: 15
							}
						},
						legend: {
							textStyle: {
								fontSize: 14,
								color: '#5C6376'
							},
							data: [{
								name: '页面一',
								icon: 'roundRect'
							}, {
								name: '页面二',
								icon: 'roundRect'
							}],
							show: true,
							itemWidth: 16,
							itemHeight: 16,
							right: 75,
							top: 30,
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
							nameTextStyle: {
								color: '#434343'
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
								name: '页面一',
								smooth: true,
								color: '#4A9FF8',
								itemStyle: {
									opacity: 0
								},
								lineStyle: {
									width: 3
								},
								data: [8100, 3800, 5700, 4000, 3000, 4000, 7000, 8000, 5700, 6800, 7000, 9000, 4000],
								type: 'line'
							},
							{
								name: '页面二',
								smooth: true,
								color: '#68CDB0',
								itemStyle: {
									opacity: 0
								},
								lineStyle: {
									width: 3
								},
								data: [7200, 4000, 2000, 4500, 4000, 4000, 6000, 4300, 7800, 8500, 4000, 6000, 5000],
								type: 'line'
							}
						]
					},
					costChart: {
						calculable: true,
						title: {
							bottom:0,
							left:'22%',
							text: '推广费用',
							textStyle: {
								color:'#434343',
								fontSize:16
							}
						},
						legend: {
							orient: 'vertical',
							right:40,
							itemGap:12,
							itemWidth: 16,
                            itemHeight: 16,
							data: ['渠道1', '渠道2', '渠道3', '渠道4', '渠道5', '渠道6']
						},
						series: [{
							type: 'pie',
							center:['30%','45%'],
							radius: ['55%', '75%'],
							itemStyle: {
		                        normal: {
		                            position: 'center',
		                            label: {
		                                show: true,
		                                formatter: "{b}\n\n{d}%"
		                            }
		                        }
		                    },
							avoidLabelOverlap: false,
							label: {
		                        normal: {
		                            show: false,
		                            position: 'center'
		                        },
		                        emphasis: {
		                            show: true,
		                            textStyle: {
		                                fontSize: '14',
		                                fontWeight: 'bold'
		                            }
		                        }
		                    },
							labelLine: {
								normal: {
									show: false
								}
							},
							data: [{
									itemStyle:{
										color:'#6FB6F9'
									},
									value: '200',
									name: '渠道1'
								},
								{
									itemStyle:{
									    color:'#8190fc'
									},
									value: '150',
									name: '渠道2'
								},
								{
									itemStyle:{
									color:'#f5a666'
									},
									value: '300',
									name: '渠道3'
								},
								{
									itemStyle:{
									color:'#ef738d'},
									value: '100',
									name: '渠道4'
								},
								{
									value: '150',
									itemStyle:{
									color:'#5ed1ae'},
									name: '渠道5'
								},
								{
									value: '200',
									itemStyle:{
									color:'#5ed1ae'},
									name: '渠道6'
								}
								
							]
						}]
					},
					exchangeChart: {
						calculable: true,
						title: {
							bottom:0,
							left:'15%',
							text: '电子卡券兑换分析',
							textStyle: {
								color:'#434343',
								fontSize:16
							}
						},
						legend: {
							orient: 'vertical',
							right:40,
							itemGap:18,
							itemWidth: 16,
                            itemHeight: 16,
							data: ['星礼卡', '腾讯会员码', '移动话费码', '优酷会员码', '爱奇艺会员码', '京东券']
						},
						series: [{
							type: 'pie',
							center:['30%','45%'],
							radius: ['55%', '75%'],
							itemStyle: {
		                        normal: {
		                            position: 'center',
		                            label: {
		                                show: true,
		                                formatter: "{b}\n\n{d}%"
		                            }
		                        }
		                    },
							avoidLabelOverlap: false,
							label: {
		                        normal: {
		                            show: false,
		                            position: 'center'
		                        },
		                        emphasis: {
		                            show: true,
		                            textStyle: {
		                                fontSize: '14',
		                                fontWeight: 'bold'
		                            }
		                        }
		                    },
							labelLine: {
								normal: {
									show: false
								}
							},
							data: [{
									value: 100,
									itemStyle:{
										color:'#6FB6F9'
									},
									name: '星礼卡'
								},
								{
									value: 310,
									itemStyle:{
									    color:'#8190fc'
									},
									name: '腾讯会员码'
								},
								{
									value: 234,
									itemStyle:{
									color:'#f5a666'
									},
									name: '移动话费码'
								},
								{
									value: 135,
									itemStyle:{
									color:'#ef738d'},
									name: '优酷会员码'
								},
								{
									value: 1548,
									itemStyle:{
									color:'#5ed1ae'},
									name: '爱奇艺会员码'
								},{
									value: 356,
									itemStyle:{
									color:'#eaa8ff'},
									name: '京东券'
								}
								
							]
						}]
					}
				};
			},
			methods: {},
			mounted: function() {
				this.$nextTick(function() {
                    var _this=this;
					_this.$refs.echartspie.echartsInstance.dispatchAction({
						type: 'highlight',
						seriesIndex: 0,
						dataIndex: 0
					});
					_this.$refs.echartspie.echartsInstance.on('mouseover', function(params) {
						//当检测到鼠标悬停事件，取消默认选中高亮
						_this.$refs.echartspie.echartsInstance.dispatchAction({
							type: 'downplay',
							seriesIndex: 0,
							dataIndex: 0
						});
						//高亮显示悬停的那块
						_this.$refs.echartspie.echartsInstance.dispatchAction({
							type: 'highlight',
							seriesIndex: params.seriesIndex,
							dataIndex: params.dataIndex
						});
					});
					//检测鼠标移出后显示之前默认高亮的那块
					_this.$refs.echartspie.echartsInstance.on('mouseout', function(params) {
						_this.$refs.echartspie.echartsInstance.dispatchAction({
							type: 'highlight',
							seriesIndex: 0,
							dataIndex: 0
						});
					});
					_this.$refs.echartspie2.echartsInstance.dispatchAction({
						type: 'highlight',
						seriesIndex: 0,
						dataIndex: 0
					});
					_this.$refs.echartspie2.echartsInstance.on('mouseover', function(params) {
						//当检测到鼠标悬停事件，取消默认选中高亮
						_this.$refs.echartspie2.echartsInstance.dispatchAction({
							type: 'downplay',
							seriesIndex: 0,
							dataIndex: 0
						});
						//高亮显示悬停的那块
						_this.$refs.echartspie2.echartsInstance.dispatchAction({
							type: 'highlight',
							seriesIndex: params.seriesIndex,
							dataIndex: params.dataIndex
						});
					});
					//检测鼠标移出后显示之前默认高亮的那块
					_this.$refs.echartspie2.echartsInstance.on('mouseout', function(params) {
						_this.$refs.echartspie2.echartsInstance.dispatchAction({
							type: 'highlight',
							seriesIndex: 0,
							dataIndex: 0
						});
					});
				})
			}
		});
	};
});