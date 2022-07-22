/**
 * @created by zhangkun6 on 2021-8-27 16:59:38
 * @updated by
 * @description 客群分析
 */
define([
    './custom/widgets/js/worldcloud2Plugin.js',
    './custom/widgets/js/wordcloud2.js',
    'echarts'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                var commonLineOption = {
                    xAxis: {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#cccccc', // 颜色
                            }
                        },
                        data: [],
                        axisLabel: {
                            interval: 0,
                            rotate: 60
                        },
                        boundaryGap: false
                    },
                    grid: {
                        left: '5%',
                        right: '6%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#cccccc', // 颜色
                            }
                        },
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    series: [{
                        data: [],
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: {
                            width: 4,
                            color: ''
                        },
                        itemStyle: {
                            color: ''
                        }
                    }]
                };
                var commonBarOption = {
                    xAxis: {
                        type: 'category',
                        data: [],
                        axisLabel: {
                            interval: 0,
                            rotate: 60
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cccccc', // 颜色
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#cccccc', // 颜色
                            }
                        },
                    },
                    grid: {
                        left: '5%',
                        right: '6%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    series: [{
                        data: [],
                        type: 'bar',
                        itemStyle: {
                            color: ''
                        },
                        barMaxWidth: 40,
                        barMinWidth: 10
                    }]
                };
                return {
                    idsj: '',
                    searchForm: { dateRange: [] },
                    list: [],
                    AUMOption: JSON.parse(JSON.stringify(commonLineOption)),
                    depositOption: JSON.parse(JSON.stringify(commonLineOption)),
                    synthesisOption: JSON.parse(JSON.stringify(commonLineOption)),
                    valueOption: JSON.parse(JSON.stringify(commonLineOption)),
                    incomeOption: JSON.parse(JSON.stringify(commonBarOption)),
                    prodBuyOption: JSON.parse(JSON.stringify(commonBarOption)),
                    tagOption: {
                        radar: {
                            // shape: 'circle',
                            indicator: [
                                { name: '一般客户', max: 10 },
                                { name: '有效客户', max: 10 },
                                { name: '优慧客户', max: 10 },
                                { name: '显著客户', max: 10 },
                                { name: '私行客户', max: 10 },
                                { name: '显卓钻石客户', max: 10 }
                            ],
                            splitArea: {
                                show: false
                            },
                            radius: '50%'
                        },
                        series: [{
                            name: '客户标签',
                            type: 'radar',
                            data: [{
                                value: [0, 0, 0, 0, 0, 0],
                                // areaStyle: {
                                //     color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [{
                                //             color: 'rgba(255, 145, 124, 0.1)',
                                //             offset: 0
                                //         },
                                //         {
                                //             color: 'rgba(255, 145, 124, 0.9)',
                                //             offset: 1
                                //         }
                                //     ])
                                // },
                                label: {
                                    show: true,
                                    formatter: function(params) {
                                        if (params.value == '0') {
                                            return '';
                                        } else {
                                            return params.value;
                                        }
                                    }
                                }
                            }]
                        }]
                    },
                    prodStructOption: {
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            right: '10%',
                            orient: 'horizontal',
                            bottom: 'bottom',
                            icon: 'circle'
                        },
                        series: [{
                            // name: '产品结构',
                            type: 'pie',
                            radius: ['30%', '60%'],
                            center: ['50%', '35%'],
                            avoidLabelOverlap: false,
                            right: '30%',
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '14',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                { value: 0, name: '信托余额', itemStyle: { color: 'rgba(91,143,249,0.85)' } },
                                { value: 0, name: '结构化理财', itemStyle: { color: 'rgba(90,216,166,0.85)' } },
                                { value: 0, name: 'QDII余额', itemStyle: { color: 'rgba(93,112,146,0.85)' } },
                                { value: 0, name: '代收付余额', itemStyle: { color: 'rgba(246,189,22,0.85)' } },
                                { value: 0, name: '人民币基金余额', itemStyle: { color: 'rgba(232,104,74,0.85)' } },
                                { value: 0, name: '活期存款余额', itemStyle: { color: 'rgba(109,200,236,0.85)' } },
                                { value: 0, name: '定期存款余额', itemStyle: { color: ' rgba(146,112,202,0.85)' } },
                                { value: 0, name: '保险规模', itemStyle: { color: 'rgba(255,157,77,0.85)' } }
                            ]
                        }]
                    },
                    activeName: 'group',
                    titleView: {
                        group: '客群',
                        average: '客均'
                    },
                    tabType: '02',
                    updateDate: '',
                    canvasWidth: 280,
                    customerTaglist: ''
                };
            },
            mounted: function() {
                this.idsj = new Date().getTime().toString();
                // this.getAnalysData('02');
                this.datemountFn();
                var _this = this;
                _this.$nextTick(function() {
                    _this.resize();
                });
            },
            methods: {
                addOrReduceDate: function(date, num) {
                    var nowDate = null;
                    var strDate = "";
                    num = parseInt(num); // 防止传入字符串报错
                    var seperator1 = "-";
                    if (date == "") {
                        nowDate = new Date();
                    } else {
                        nowDate = new Date(date);
                    }
                    nowDate.setMonth(nowDate.getMonth() + num);
                    var year = nowDate.getFullYear(); // 年
                    var month = nowDate.getMonth() + 1; // 月
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    var dateStr = year + seperator1 + month;
                    return dateStr;
                },
                datemountFn: function() {
                    var dateEnd = yufp.util.dateFormat(new Date(), '{y}-{m}');
                    var dateStart = this.addOrReduceDate(dateEnd, -11);
                    this.searchForm.dateRange = [dateStart, dateEnd];

                },
                resize: function() {
                    var _this = this;
                    window.onresize = function() {
                        var AUMEchart = _this.$refs.AUMEchart.echartsInstance;
                        var incomeEchart = _this.$refs.incomeEchart.echartsInstance;
                        var depositEchart = _this.$refs.depositEchart.echartsInstance;
                        var prodBuyEchart = _this.$refs.prodBuyEchart.echartsInstance;
                        var tagEchart = _this.$refs.tagEchart.echartsInstance;
                        var prodStructEchart = _this.$refs.prodStructEchart.echartsInstance;
                        AUMEchart.resize();
                        incomeEchart.resize();
                        depositEchart.resize();
                        prodBuyEchart.resize();
                        tagEchart.resize();
                        prodStructEchart.resize();
                        if (_this.$refs.valuechart) {
                            var valuechart = _this.$refs.valuechart.echartsInstance;
                            valuechart.resize();
                        }
                        if (_this.$refs['cust-chart']) {
                            _this.resizeCanvas();
                        }
                    };
                },
                resizeCanvas: function() {
                    // this.canvasWidth = $('.canvas-container').width();
                    var _this = this;
                    _this.initCloudWordsChart(_this.customerTaglist);
                },
                // exprtPDF: function() {
                //     yufp.util.exportPDF('.cust-group-analysis', '客群分析');
                // },
                handleExportCommand: function(command) {
                    if (command === '1') {
                        // yufp.util.exportPDF('.cust-group-analysis', '客群分析');
                        yufp.util.exportPDF('#' + this.idsj, '客群分析');

                    } else {
                        // var param = {
                        //     custGroupId: data.custGroupId,
                        //     customerType: this.tabType,
                        //     startDate: this.searchForm.dateRange[0] || '',
                        //     endDate: this.searchForm.dateRange[1] || ''
                        // }
                        var url = '/api/ocrmfcicgbase/IndexStatusExcel' + '?custGroupId=' + (data.custGroupId || '') + '&customerType=' + (this.tabType || '') + '&startDate=' + (this.searchForm.dateRange[0] || '') + '&endDate=' + (this.searchForm.dateRange[1] || '');
                        // var url = '/api/ocrmfcicgbase/IndexStatusExcel' +  '?condition=' + encodeURI(JSON.stringify(param));
                        yufp.util.download(url);
                    }
                },
                handleTabClick: function(name) {
                    this.activeName = name;
                    this.tabType = this.activeName === 'group' ? '02' : '01';
                    this.getAnalysData(this.tabType, this.searchForm.dateRange);
                },
                handleDateChange: function(range) {
                    if (range) {
                        var startYear = parseInt(range[0].split('-')[0]);
                        var endYear = parseInt(range[1].split('-')[0]);
                        var startMonth = parseInt(range[0].split('-')[1]);
                        var endMonth = parseInt(range[1].split('-')[1]);
                        var count = (endYear - startYear) * 12 + (endMonth - startMonth);
                        if (count > 12) {
                            this.$message.warning('日期跨度不能超过12个月');
                            return;
                        }
                    }
                    this.getAnalysData(this.tabType, range || null);
                },

                getAnalysData: function(type, date) {
                    var _this = this;
                    var param = {
                        custGroupId: data.custGroupId,
                        customerType: type
                    };
                    if (date) {
                        param.startDate = date[0];
                        param.endDate = date[1];
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/ocrmfcicgbase/queryIndexStatuslist',
                        data: param,
                        callback: function(code, message, response) {
                            if (code === 0 && JSON.stringify(response.data) != '{}') {
                                var proportion = response.data.proportion ? response.data.proportion[0] : {};
                                var tableData = [
                                    { title: '数值', customer: proportion.custNumber, aum: proportion.cgAumYearAvgBalance, deposit: proportion.cgDepositBalance, loan: proportion.cgLoanBalance, isCount: true },
                                    { title: '同比', customer: proportion.custNumberQqq, aum: proportion.cgAumYearAvgBalanceQqq, deposit: proportion.cgDepositBalanceQqq, loan: proportion.cgLoanBalanceQqq },
                                    { title: '环比', customer: proportion.custNumberYoy, aum: proportion.cgAumYearAvgBalanceYoy, deposit: proportion.cgDepositBalanceYoy, loan: proportion.cgLoanBalanceYoy }
                                ];
                                _this.list = tableData;
                                _this.updateDate = proportion.dataDate;
                                var avglist = response.data.avglist || [];
                                // 排序
                                avglist = avglist.sort(function(a, b) {
                                    return a.dataDate > b.dataDate ? 1 : -1
                                })
                                var xlist = [];
                                var aumArr = [];
                                var middleIncomeArr = [];
                                var depositArr = [];
                                var productBuyArr = [];
                                var avgOverallValueArr = [];
                                for (var i = 0; i < avglist.length; i++) {
                                    xlist.push(avglist[i].dataDate);
                                    aumArr.push(avglist[i].cgAumBalance);
                                    avgOverallValueArr.push(avglist[i].cgAvgOverallValue);
                                    depositArr.push(avglist[i].cgDepositBalance);
                                    middleIncomeArr.push(avglist[i].cgMidIncomeAmt);
                                    productBuyArr.push(avglist[i].cgBuyFinAmt);
                                }
                                _this.initAUMChart(xlist, aumArr);
                                _this.initIncomeEchart(xlist, middleIncomeArr);
                                _this.initDepositOptionEchart(xlist, depositArr);
                                _this.initProdBuyOptionEchart(xlist, productBuyArr);
                                if (type === '01') {
                                    _this.initValueChart(xlist, avgOverallValueArr);
                                }
                                // _this.initSynthesisEchart();
                                if (type === '02') {
                                    var customerTaglist = response.data.CustomerTaglist || [];
                                    _this.customerTaglist = customerTaglist;
                                    var products = response.data.product ? response.data.product[0] : {};
                                    var custGrade = response.data.custGrade ? response.data.custGrade[0] : {};
                                    _this.resizeCanvas(customerTaglist);
                                    _this.initTagEchart(custGrade);
                                    _this.initProdStructEchart(products);
                                    _this.initCloudWordsChart(customerTaglist);
                                }
                            }
                        }
                    });
                },

                initCloudWordsChart: function(valueData) {
                    var list = [];
                    if (valueData.length) {
                        for (var i = 0; i < valueData.length; i++) {
                            list.push([valueData[i].tagName, Math.ceil(Math.random() * 5)]);
                        }
                    }
                    var options = {
                        list: list,
                        rotateRatio: 0.4,
                        minRotation: 45,
                        maxRotation: 60,
                        shape: '../../../../themes/common/images/6.png',
                        tooltip: {
                            show: false
                        },
                        weightFactor: function(size) {
                            var f =
                                Math.pow(size, 2.3) *
                                document.getElementById('custTag').width /
                                1024;
                            if (f < 15) {
                                return 15;
                            }
                            if (f > 25) {
                                return 25;
                            }
                            return f;
                        }
                    };
                    new window.Imworldcloud(document.getElementById('custTag'), options);

                },

                initAUMChart: function(xlist, valueData) {
                    this.AUMOption.xAxis.data = xlist;
                    this.AUMOption.series[0].data = valueData;
                    this.AUMOption.series[0].lineStyle.color = '#5B8FF9';
                    this.AUMOption.series[0].itemStyle.color = '#5B8FF9';
                    this.AUMOption.tooltip = {
                        formatter: function(params, ticket, callback) {
                            if (params.value == 0) {
                                return params.value;
                            } else {
                                return params.name + ' ' + yufp.util.moneyFormatter(params.value || '')
                            }
                        }
                    }
                },

                initValueChart: function(xlist, valueData) {
                    this.valueOption.xAxis.data = xlist;
                    this.valueOption.series[0].data = valueData;
                    this.valueOption.series[0].lineStyle.color = '#9270CA';
                    this.valueOption.series[0].itemStyle.color = '#9270CA';
                    this.valueOption.tooltip = {
                        formatter: function(params, ticket, callback) {
                            if (params.value == 0) {
                                return params.value;
                            } else {
                                return params.name + ' ' + yufp.util.moneyFormatter(params.value || '')
                            }
                        }
                    }
                },

                initIncomeEchart: function(xlist, valueData) {
                    this.incomeOption.xAxis.data = xlist;
                    this.incomeOption.series[0].data = valueData;
                    this.incomeOption.series[0].itemStyle.color = '#E8684A';
                    this.incomeOption.tooltip = {
                        formatter: function(params, ticket, callback) {
                            if (params.value == 0) {
                                return params.value;
                            } else {
                                return params.name + ' ' + yufp.util.moneyFormatter(params.value || '')
                            }
                        }
                    }
                },

                initProdBuyOptionEchart: function(xlist, valueData) {
                    this.prodBuyOption.xAxis.data = xlist;
                    this.prodBuyOption.series[0].data = valueData;
                    this.prodBuyOption.series[0].itemStyle.color = '#6DC8EC';
                    this.prodBuyOption.tooltip = {
                        formatter: function(params, ticket, callback) {
                            if (params.value == 0) {
                                return params.value;
                            } else {
                                return params.name + ' ' + yufp.util.moneyFormatter(params.value || '')
                            }
                        }
                    }
                },

                initDepositOptionEchart: function(xlist, depositArr) {
                    // this.depositOption.xAxis.data = ['2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06'];
                    // this.depositOption.series[0].data = [150, 580, 700, 218, 500, 610];
                    this.depositOption.xAxis.data = xlist;
                    this.depositOption.series[0].data = depositArr;
                    this.depositOption.series[0].lineStyle.color = '#F6BD16';
                    this.depositOption.series[0].itemStyle.color = '#F6BD16';
                    this.depositOption.tooltip = {
                        formatter: function(params, ticket, callback) {
                            if (params.value == 0) {
                                return params.value;
                            } else {
                                return params.name + ' ' + yufp.util.moneyFormatter(params.value || '')
                            }
                        }
                    }
                },
                initSynthesisEchart: function(xlist, valueData) {
                    this.synthesisOption.xAxis.data = xlist;
                    this.synthesisOption.series[0].data = valueData;
                    this.synthesisOption.series[0].lineStyle.color = '#9270CA';
                    this.synthesisOption.series[0].itemStyle.color = '#9270CA';
                    this.synthesisOption.tooltip = {
                        formatter: function(params, ticket, callback) {
                            if (params.value == 0) {
                                return params.value;
                            } else {
                                return params.name + ' ' + yufp.util.moneyFormatter(params.value || '')
                            }
                        }
                    }
                },
                initTagEchart: function(valueData) {
                    var arr = [valueData.custGrade1Number, valueData.custGrade2Number, valueData.custGrade3Number, valueData.custGrade4Number, valueData.custGrade5Number, valueData.custGrade6Number];
                    this.tagOption.series[0].data[0].value = arr;
                    var maxVal = Math.max.apply(null, arr);
                    var max = maxVal > 10 ? maxVal > 100 ? 100 : 50 : 10;
                    this.tagOption.radar.indicator[0].max = parseFloat(valueData.custGrade1Number) + max;
                    this.tagOption.radar.indicator[1].max = parseFloat(valueData.custGrade2Number) + max;
                    this.tagOption.radar.indicator[2].max = parseFloat(valueData.custGrade3Number) + max;
                    this.tagOption.radar.indicator[3].max = parseFloat(valueData.custGrade4Number) + max;
                    this.tagOption.radar.indicator[4].max = parseFloat(valueData.custGrade5Number) + max;
                    this.tagOption.radar.indicator[5].max = parseFloat(valueData.custGrade6Number) + max;
                },
                initProdStructEchart: function(valueData) {
                    this.prodStructOption.series[0].data[0].value = valueData.cgTrustBalanceRmb;
                    this.prodStructOption.series[0].data[1].value = valueData.cgStrustFinBalanceRmb;
                    this.prodStructOption.series[0].data[2].value = valueData.cgQdiiBalanceRmb;
                    this.prodStructOption.series[0].data[3].value = valueData.cgCollectPayBalance;
                    this.prodStructOption.series[0].data[4].value = valueData.cgRmbFundBalance;
                    this.prodStructOption.series[0].data[5].value = valueData.cgDemandDepositBalance;
                    this.prodStructOption.series[0].data[6].value = valueData.cgTimeDepositBalance;
                    this.prodStructOption.series[0].data[6].value = valueData.cgInsurranceBalanceRmb;
                }
            }
        });
    };

    /**
     * 页面传递消息处理
     * @param type 消息类型
     * @param message 消息内容
     */
    exports.onmessage = function(type, message) {};

    /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
    exports.destroy = function(id, cite) {};
});