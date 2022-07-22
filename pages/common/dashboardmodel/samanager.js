/**
 * Created by qfk on 2018/7/20.
 */
define([
    'echarts',
    './mocks/data/samanager.js'
], function (require, exports) {
    var homepageData = yufp.require.use('./mocks/data/samanager.js');
    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {

        setCharts = function () {

            //贷款趋势
            var myChart41 = echarts.init(document.getElementById('chartBox41'));
            var option41 = {
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
                        value: 70,
                        name: '商机达成率'
                    }]
                }]
            };
            myChart41.setOption(option41);

            var myChart42 = echarts.init(document.getElementById('chartBox42'));
            var option42 = {
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
                textStyle: {
                    color: '#888'
                },
                calculable: true,
                color: ['#5EA2FF', '#FFA867', '#FC768E'],
                series: [{
                    name: '收入',
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
            myChart42.setOption(option42);
            setPieSelected(myChart42);
            //存款监控
            var myChart43 = echarts.init(document.getElementById('chartBox43'));
            var option43 = {
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
                            width: 3
                        }
                    }
                }, {
                    data: [100, 820, 120, 720, 200, 900],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }]
            };
            myChart43.setOption(option43);

            var myChart44 = echarts.init(document.getElementById('chartBox44'));
            var option44 = {
                title: {
                    text: '覆盖率(%)',
                    left: 15,
                    textStyle: {
                        color: '#5A6277',
                        fontSize: '14'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: '{a}<br />{b}: {c}%'
                },
                legend: {
                    show: false
                },
                grid: {
                    top: '40',
                    left: '50',
                    right: '10',
                    bottom: '30',
                    containLabel: false
                },
                xAxis: {
                    type: 'category',
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
                    show: true,
                    type: 'value',
                    min: 'dataMin'
                },
                series: [{
                    name: '迁移率',
                    type: 'bar',
                    barWidth: '12',
                    data: [47, 56, 89, 63, 78, 10],
                    itemStyle: {
                        normal: {
                            barBorderRadius: [2, 2, 0, 0],
                            color: '#0065D2'
                        }
                    }
                }]
            };

            myChart44.setOption(option44);
        };

        function setPieSelected(myChart42) {
            // 取消之前高亮的图形
            myChart42.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: 0
            });
            // 高亮当前图形
            myChart42.dispatchAction({
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
            console.log('homepage ', homepageData.subList().data);
            var data = homepageData.subList().data;
            //将对象赋值到内存中，然后修改后重新渲染到界面
            var boxs = $('.sa-manager .yu-chart-box'),
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

                var pagesize = 5;
                var $cTips = item.find('.yu-chart-box-tips').data('datalist', {
                    'list': d.tablelist,
                    'pagesize': pagesize,
                    'pageindex': 1
                });
                $cTips.append(createTable($cTips)).append(createPagation($cTips));
                bindPagation($cTips);
            });
            //绑定预估模型数据
            $('.sa-manager .pred-model').find('table > tbody').append(createPredModelTable(data['pred-model']));
            $('.sa-manager .migration-model').find('table > tbody').append(createMigrationModelTable(data['pred-model']));
        };
        /**
         * 生成板块数据表格
         */
        function createTable($el) {
            var datalist = $el.data('datalist'),
                ul = document.createElement('ul');
            if (datalist) {
                var dlist = datalist.list,
                    ps = datalist.pagesize,
                    curIdx = datalist.pageindex,
                    dt = dlist.slice(ps * (curIdx - 1), ps * curIdx);
                for (var i = 0, l = dt.length; i < l; i++) {
                    var d = dt[i],
                        dl = $('<div class="li-left">').append([
                            $('<span class="li-item-title">').text(d.title),
                            $('<span class="li-item-desc">').text(d.desc)
                        ]),
                        dr = $('<div class="li-right">').append($('<span class="li-item-date">').text(d.create))
                    $('<li class="li-item">').append([dl, dr]).appendTo(ul);
                }
            }
            return ul;
        }
        /**
         * 创建分页
         */
        function createPagation($el) {
            var dl = $el.data('datalist'),
                $dom;
            if (dl) {
                var list = dl.list,
                    pagesize = dl.pagesize,
                    curIdx = dl.pageindex;
                $dom = $('<div>').addClass('yu-chart-box-tips-page').append([
                    $('<span>').text('<上一页').addClass(curIdx > 1 ? 'has-event page-prev' : ''),
                    $('<span>').text('下一页>').addClass(list.length > (pagesize * curIdx) ? 'has-event page-next' : ''),
                ]);
            } else {
                $dom = $('<div>').addClass('yu-chart-box-tips-page').append([
                    $('<span>').text('<上一页'),
                    $('<span>').text('下一页>'),
                ]);
            }
            return $dom;
        }

        function bindPagation($el) {
            //绑定事件
            $el.on('click', '.yu-chart-box-tips-page .has-event', function (e) {
                var cur = e.currentTarget,
                    $cur = $(cur),
                    tar = cur.parentNode.parentNode;
                if (tar) {
                    var $tar = $(tar),
                        datalist = $tar.data('datalist');
                    if (datalist) {
                        var dl = datalist.list,
                            ps = datalist.pagesize,
                            curIdx = datalist.pageindex;
                        if ($cur.hasClass('page-prev')) {
                            curIdx = curIdx - 1;
                            curIdx = curIdx || 1;
                        } else {
                            curIdx++;
                        }
                        //改变当前元素存储信息
                        $tar.data('datalist', {
                            'list': dl,
                            'pagesize': ps,
                            'pageindex': curIdx
                        });
                        //先清空原元素
                        $tar.empty('').append(createTable($tar)).append(createPagation($tar));
                    }
                }
            });
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
        //Demo相关js逻辑，仅示例，请开发自行实现完善
        setCharts();
        setTabs();
        //新版界面上板块基础数据
        setNotifys();
    };

    //消息处理
    exports.onmessage = function (type, message) {

    };

    //page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});