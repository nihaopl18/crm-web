/**
 * Created by qfk on 2018/7/20.
 */
define([
    'echarts',
    './mocks/data/marksupervisor.js'
], function (require, exports) {
    var homepageData = yufp.require.use('./mocks/data/marksupervisor.js');
    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {

        setCharts = function () {
            //业务风险占比
            var myChart31 = echarts.init(document.getElementById('chartBox31'));
            var option31 = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    right: 55,
                    padding: [50, 10, 0, 50],
                    itemGap: 40,
                    itemWidth: 20,
                    itemHeight: 20,
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    },
                    data: ['低风险', '中风险', '高风险']
                },
                calculable: true,
                color: ['#5EA2FF', '#FFA867', '#FC768E'],
                series: [{
                    name: '业务风险占比',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['40%', '55%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            position: 'center',
                            label: {
                                show: true,
                                formatter: "{b}\n\n{d}%"
                            }
                        }
                    },
                    data: [{
                            value: 335,
                            name: '低风险'
                        },
                        {
                            value: 310,
                            name: '中风险'
                        },
                        {
                            value: 234,
                            name: '高风险'
                        }
                    ]
                }]
            };
            myChart31.setOption(option31);
            setPieSelected(myChart31);

            //迁移模型监控
            var myChart32 = echarts.init(document.getElementById('chartBox32'));
            var option32 = {
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    show: false
                },
                series: [{
                    name: '商机达成',
                    type: 'gauge',
                    startAngle: 180, //开始角度
                    endAngle: 0, //结束角度
                    detail: {
                        formatter: '{value}%'
                    },
                    center: ["65%", "55%"], // 仪表位置
                    axisTick: {
                        show: false
                    },
                    title: {
                        show: false
                    },
                    axisLine: { // 坐标轴线  
                        lineStyle: { // 属性lineStyle控制线条样式  
                            color: [
                                [0.2, '#FB758E'],
                                [0.8, '#5DA5FF'],
                                [1, '#35D0AF']
                            ]
                        }
                    },
                    data: [{
                        value: 50,
                        name: '商机达成率'
                    }]
                }]
            };
            myChart32.setOption(option32);

            //商机产能
            var myChart33 = echarts.init(document.getElementById('chartBox33'));
            var option33 = {
                title: {
                    show: false
                },
                toolbox: {
                    show: false
                },
                legend: {
                    data: ['2016年', '2017年', '2018年', '2019年'],
                    orient: 'horizontal',
                    align: 'right',
                    itemWidth: 14,
                    itemHeight: 14,
                    icon: 'rect',
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                },
                yAxis: [{
                        type: 'value',
                        scale: true,
                        name: '万元',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#E2E7F9',
                                type: 'dotted'
                            }
                        } //去除网格线
                    },
                    {
                        type: 'value',
                        scale: true,
                        name: '成交率',
                        splitLine: {
                            show: false
                        }, //去除网格线
                    }
                ],
                series: [{
                        name: '2018年',
                        type: 'line',
                        data: [4, 8, 6, 5, 7, 2, 4, 6, 1, 9, 5, 3],
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                color: '#35D0AF',
                                width: 4
                            }
                        }
                    },
                    {
                        name: '2019年',
                        type: 'line',
                        data: [4, 7, 1, 3, 5, 9, 3, 2, 5, 4, 7, 6],
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                color: '#FB758E',
                                width: 4
                            }
                        }
                    }, {
                        name: '2016年',
                        type: 'bar',
                        data: [5, 10, 6, 8, 2, 5, 7, 2, 4, 5, 6, 4],
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                color: '#FFA867',
                                barBorderRadius: [2, 2, 0, 0]
                            }
                        }
                    },
                    {
                        name: '2017年',
                        type: 'bar',
                        data: [9, 5, 3, 6, 5, 8, 1, 4, 6, 2, 4, 6],
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                color: '#5EA2FF',
                                barBorderRadius: [2, 2, 0, 0]
                            }
                        }
                    }
                ]
            };
            myChart33.setOption(option33);

            //存款监控
            var myChart34 = echarts.init(document.getElementById('chartBox34'));
            var option34 = {
                title: {
                    show: false
                },
                toolbox: {
                    show: false
                },
                color: ['#FFA767', '#5DA5FF'],
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月']
                },
                yAxis: {
                    show: false
                },
                series: [{
                    data: [820, 100, 720, 120, 900, 200],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 4
                        }
                    }
                }, {
                    data: [100, 820, 120, 720, 200, 900],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 4
                        }
                    }
                }]
            };
            myChart34.setOption(option34);

            //修改隐藏统计图的高度
            var domChartBox35 = document.getElementById('chartBox35');
            $(domChartBox35).css({'height':document.getElementById('chartBox31').clientHeight,'width':document.getElementById('chartBox31').clientWidth});
            var myChart35 = echarts.init(document.getElementById('chartBox35'));
            var option35 = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    right: 55,
                    padding: [10, 10, 0, 10],
                    itemGap: 20,
                    itemWidth: 20,
                    itemHeight: 20,
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    },
                    data: ['制作', '投放', '爆发', '衰退', '退出']
                },
                calculable: true,
                color: ['#2ACFAE', '#838EFE', '#5EA2FF','#FC768E','#FFA867'],
                series: [{
                    name: '营销活动占比',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['40%', '55%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            position: 'center',
                            label: {
                                show: true,
                                formatter: "{b}\n\n{d}%"
                            }
                        }
                    },
                    data: [{
                            value: 335,
                            name: '制作'
                        },
                        {
                            value: 310,
                            name: '投放'
                        },
                        {
                            value: 234,
                            name: '爆发'
                        },
                        {
                            value: 234,
                            name: '衰退'
                        },
                        {
                            value: 234,
                            name: '退出'
                        }
                    ]
                }]
            };
            myChart35.setOption(option35);
            setPieSelected(myChart35);

             //存款监控
             var domChartBox36 = document.getElementById('chartBox36');
             $(domChartBox36).css({'height':document.getElementById('chartBox34').clientHeight,'width':document.getElementById('chartBox34').clientWidth});
             var myChart36 = echarts.init(document.getElementById('chartBox36'));
             var option36 = {
                 title: {
                     show: false
                 },
                 toolbox: {
                     show: false
                 },
                 color: ['#FFA767', '#5DA5FF'],
                 xAxis: {
                     type: 'category',
                     data: ['1月', '2月', '3月', '4月', '5月', '6月']
                 },
                 yAxis: {
                     show: false
                 },
                 series: [{
                     data: [820, 600, 720, 220, 900, 200],
                     type: 'line',
                     showSymbol: false,
                     smooth: true,
                     lineStyle: {
                         normal: {
                             width: 4
                         }
                     }
                 }, {
                     data: [100, 820, 120, 720, 200, 900],
                     type: 'line',
                     showSymbol: false,
                     smooth: true,
                     lineStyle: {
                         normal: {
                             width: 4
                         }
                     }
                 }]
             };
             myChart36.setOption(option36);
            
        };

        function setPieSelected(myChartObj) {
            // 取消之前高亮的图形
            myChartObj.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: 0
            });
            // 高亮当前图形
            myChartObj.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
        }

        setTabs = function () {
            $('.yu-tabs').each(function () {
                var _eN = $(this).attr('data-eventName') ? $(this).attr('data-eventName') : 'click';
                $(this).find('a').on(_eN, function () {
                    $(this).addClass('selected').siblings().removeClass('selected');
                    $(this).parent().parent().siblings('.yu-tabBox').eq($(this).index()).show().siblings('.yu-tabBox').hide();
                });
            });
        };

        setNotifys = function () {
            var data = homepageData.subList().data;
            //将对象赋值到内存中，然后修改后重新渲染到界面
            var boxs = $('.mark-supervisor .yu-chart-box'),
                k, el, d;
            boxs.each(function (idx, item) {
                item = $(item);
                k = item.attr('data-item').replace(/yu-/g, '');
                d = data[k];
                el = item.find('.yu-chart-box-val')[0];
                el.innerText = d.value;
                el.style.color = d.color;
                el = item.find('.yu-chart-box-progress-len')[0];
                el.style.width = d.precent + '%';
                el.style.backgroundColor = d.color;
                el = item.find('.yu-chart-box-right .yu-chart-box-desc')[0];
                el.innerText = d.precent + '%';
                el = item.find('.el-icon-yx-bell')[0];
                el.style.color = d.color;

                item.find('.yu-chart-box-tips').append(createTable(d.tablelist));
            });
            //绑定预估模型数据
            $('.mark-supervisor .pred-model').find('table > tbody').append(createPredModelTable(data['pred-model']));
            $('.mark-supervisor .migration-model').find('table > tbody').append(createMigrationModelTable(data['pred-model']));
        };
        /**
         * 生成板块数据表格
         */
        function createTable(tbl) {
            var ul = document.createElement('ul');
            for (var i = 0, l = tbl.length; i < l; i++) {
                var d = tbl[i],
                    dl = $('<div class="li-left">').append([
                        $('<span class="li-item-title">').text(d.title),
                        $('<span class="li-item-desc">').text(d.desc)
                    ]),
                    dr = $('<div class="li-right">').append($('<span class="li-item-date">').text(d.create))
                $('<li class="li-item">').append([dl, dr]).appendTo(ul);
            }
            return ul;
        }
        /**
         * 生成预估模型数据
         */
        function createPredModelTable(data) {
            var tr = [],
                d;
            for (var i = 0, l = data.length; i < l;) {
                d = data[i++];
                tr.push($('<tr>').append([
                    $('<td>').append(['<i class="el-icon-' + i + '"></i>'], d.modelname),
                    $('<td>').text(d.thm + '%'),
                    $('<td>').text(d.phm + '%'),
                    $('<td>').text(d.thmhitrate + '%').append($('<i class="' + ['el-icon-yx-arrow-down2', 'el-icon-yx-arrow-up2'][d.uod] + '">')),
                    $('<td>').text(d.phmhitrate),
                    $('<td class="no-right-border">').text(d.score)
                ]));
            }
            return tr;
        }

        function createMigrationModelTable(data) {
            var tr = [],
                d;
            for (var i = 0, l = data.length; i < l; i++) {
                d = data[i];
                tr.push($('<tr>').append([
                    $('<td>').append(['<i class="el-icon-' + i + '"></i>'], d.modelname),
                    $('<td>').text(d.thm + '%').append($('<i class="' + ['el-icon-yx-arrow-down2', 'el-icon-yx-arrow-up2'][d.uod] + '">')),
                    $('<td>').text(d.phm + '%'),
                    $('<td class="no-right-border">').text(d.score)
                ]));
            }
            return tr;
        }

        function tabMoveEvent() {
            $('.tabs-move').on('mousemove', '.model-tilte-left >span[data-tar]', function (e) {
                var el = $('.tabs-move'),
                    cur = e.currentTarget,
                    $cur = $(cur),
                    tar = $cur.attr('data-tar');
                if (tar) {
                    el.find('.model-tilte-left >span').removeClass('active');
                    $cur.addClass('active');
                    $('.tabs-move').find('.yu-content').hide();
                    $('.tabs-move').find('.yu-content.tar' + tar).show();
                }
            });
        }
        //Demo相关js逻辑，仅示例，请开发自行实现完善
        setCharts();
        setTabs();
        //新版界面上板块基础数据
        setNotifys();
        tabMoveEvent();
    };

    //消息处理
    exports.onmessage = function (type, message) {

    };

    //page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});