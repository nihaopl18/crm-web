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
					pageable: false,
					border: false,
					dataData: [{
							headPortrait: 'https://img10.360buyimg.com/cms/jfs/t1/32255/33/4631/335252/5c7f77e1Ed03f9568/f205d9c99a2b4b01.jpg',
							recommenderId: '6758',
							recommenderName: '张xx',
							sex: '男',
							region: '北京',
							shareNum: '8',
							cumulativeNum: '1123123',
							directNum: '336',
							shareFriendsCircle: '69081',
							shareFriend: '3723'
						},
						{
							headPortrait: 'https://img10.360buyimg.com/cms/jfs/t1/32255/33/4631/335252/5c7f77e1Ed03f9568/f205d9c99a2b4b01.jpg',
							recommenderId: '7979',
							recommenderName: '陈xx',
							sex: '男',
							region: '北京',
							shareNum: '8',
							cumulativeNum: '1123123',
							directNum: '336',
							shareFriendsCircle: '69081',
							shareFriend: '3723'
						},
						{
							headPortrait: 'https://img10.360buyimg.com/cms/jfs/t1/32255/33/4631/335252/5c7f77e1Ed03f9568/f205d9c99a2b4b01.jpg',
							recommenderId: '9889',
							recommenderName: '王xx',
							sex: '男',
							region: '北京',
							shareNum: '8',
							cumulativeNum: '1123123',
							directNum: '336',
							shareFriendsCircle: '69081',
							shareFriend: '3723'
						},
						{
							headPortrait: 'https://img10.360buyimg.com/cms/jfs/t1/32255/33/4631/335252/5c7f77e1Ed03f9568/f205d9c99a2b4b01.jpg',
							recommenderId: '2387',
							recommenderName: '陈xx',
							sex: '男',
							region: '北京',
							shareNum: '8',
							cumulativeNum: '1123123',
							directNum: '336',
							shareFriendsCircle: '69081',
							shareFriend: '3723'
						},
						{
							headPortrait: 'https://img10.360buyimg.com/cms/jfs/t1/32255/33/4631/335252/5c7f77e1Ed03f9568/f205d9c99a2b4b01.jpg',
							recommenderId: '7688',
							recommenderName: '李xx',
							sex: '男',
							region: '北京',
							shareNum: '8',
							cumulativeNum: '1123123',
							directNum: '336',
							shareFriendsCircle: '69081',
							shareFriend: '3723'
						}
					],
					exchangeChart: {
						title: {
							show: false,
							text: '传播趋势图',
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
								name: '参与人数',
								icon: 'roundRect'
							}, {
								name: '分享给好友次数',
								icon: 'roundRect'
							}, {
								name: '分享到朋友圈次数',
								icon: 'roundRect'
							}, {
								name: '参与人次',
								icon: 'roundRect'
							}],
							show: true,
							itemWidth: 16,
							itemHeight: 16,
							right: 75,
							top: 0,
							textStyle: {
								color: '#666'
							}
						},
						grid: {
							top: '40',
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
							data: ['2016-11-12', '2016-12-12', '2017-01-12',
								'2017-02-12', '2017-03-12', '2017-04-12',
								'2017-05-12', '2017-06-12'
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
								name: '参与人数',
								type: 'bar',
								color: '#6FB6F9',
								barWidth: 12,
								data: [140, 552, 200, 314, 290, 631, 220, 283]
							},
							{
								name: '分享给好友次数',
								type: 'bar',
								color: '#8190fc',
								barWidth: 12,
								data: [310, 522, 149, 312, 390, 236, 411, 345]
							}, {
								name: '分享到朋友圈次数',
								type: 'bar',
								color: '#f5a666',
								barWidth: 12,
								data: [105, 582, 320, 265, 470, 456, 432, 283]
							},
							{
								name: '参与人次',
								type: 'bar',
								color: '#ef738d',
								barWidth: 12,
								data: [109, 562, 310, 334, 257, 330, 333, 345]
							}
						]
					},
					routeChart: {
						tooltip: {
							show: true,
							showContent: true,
							trigger: 'item'
						},
						series: [{
							type: 'graph',
							top: '30%',
							bottom: '14%',
							layout: 'force',
							roam: true,
							force: {
								repulsion: 200,
								gravity: 0.03,
								edgeLength: 60,
								layoutAnimation: true
							},
							itemStyle: { // ===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
								normal: { // 默认样式
									label: {
										show: true
									},
									borderType: 'solid', // 图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
									opacity: 1
								}
							},
							lineStyle: { // ==========关系边的公用线条样式。
								normal: {
									color: '#ddd',
									curveness: 0, // 线条的曲线程度，从0到1
									opacity: 1
								},
								emphasis: { // 高亮状态

								}
							},
							label: {
								normal : {
                                    show : true,//是否显示标签。
                                    position : ['20%', '100%'],//标签的位置。['50%', '50%'] [x,y]
                                    textStyle : { //标签的字体样式
                                        color : '#434343', //字体颜色
                                        fontStyle : 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                                        fontFamily : 'sans-serif', //文字的字体系列
                                        fontSize : 12, //字体大小
                                    }
                                }
							},
							data: [{
									name: '张三',
									value: 10,
									symbol:'image://themes/default/images/usericon1.png',
									symbolSize : 70,
									label: '张三（主要）'
							},
								{
									name: '李佳泽',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 1
								},
								{
									name: '杨彤',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value:1
								},
								{
									name: '冯琳琳',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 2
								},
								{
									name: '张洋',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 2
								},
								{
									name: '唐丽',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 3
								},{
									name: '冯君',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 4
								},{
									name: '刘卓',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 1
								},{
									name: '刘宁',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 1
								},{
									name: '刘根束',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 2
								},{
									name: '刘祖星',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 2
								},{
									name: '任毓贤',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 2
								},{
									name: '胡玥',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 1
								},{
									name: '向守友',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 2
								},{
									name: '李冬梅',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 3
								},{
									name: '黄永阳',
									symbol:'image://themes/default/images/usericon2.png',
									symbolSize : 50,
									value: 2
								}
							],
							links: [{
									source: '张三',
									target: '杨彤',
									label: '亲人',
									value:1
							},
								{
									source: '张三',
									target: '李佳泽',
									label: '同学',
									value:1
								},
								{
									source: '李佳泽',
									target: '冯琳琳',
									label: '夫妻',
									value:1
								},
								{
									source: '杨彤',
									target: '张洋',
									label: '同学',
									value:1
								},
								{
									source: '张三',
									target: '刘卓',
									label: '亲人',
									value:1
								},
								{
									source: '刘卓',
									target: '唐丽',
									label: '亲人',
									value:1
								},
								{
									source: '李佳泽',
									target: '任毓贤',
									label: '朋友',
									value:1
								},
								{
									source: '冯琳琳',
									target: '冯君',
									label: '亲人',
									value:1
								},
								{
									source: '张三',
									target: '胡玥',
									label: '同学',
									value:1
								},
								{
									source: '刘宁',
									target: '刘祖星',
									label: '亲人',
									value:1
								},
								{
									source: '张三',
									target: '刘宁',
									label: '亲人',
									value:1
								},
								{
									source: '刘宁',
									target: '刘根束',
									label: '亲人',
									value:1
								},
								{
									source: '杨彤',
									target: '黄永阳',
									label: '朋友',
									value:1
								},
								{
									source: '李佳泽',
									target: '向守友',
									label: '朋友',
									value:1
								},
								{
									source: '向守友',
									target: '李冬梅',
									label: '亲人',
									value:1
								}
							]
						}]
					}
				};
			},
			methods: {}
		});
	};
});