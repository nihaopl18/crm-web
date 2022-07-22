/**
 * @created by zhangkun6 on 2021-9-13 10:12:23
 * @updated by
 * @description 活动量
 */
define(['echarts', 'jquery', 'libs/map/js/china.js'], function(require, exports) {
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
                return {
                    chinaArr: [],
                    dateRange: [],
                    mapOption: {},
                    MAUOption: {},
                    functionCoverOption: {},
                    oneMonthObj: {},
                    tableData: [],
                    mapChart: null,
                    provicesData: [],
                    max: 100,
                    min: 0,
                    proviceMap: {
                        '安徽': 'anhui',
                        '澳门': 'aomen',
                        '北京': 'beijing',
                        '重庆': 'chongqing',
                        '福建': 'fujian',
                        '甘肃': 'gansu',
                        '广东': 'guangdong',
                        '广西': 'guangxi',
                        '贵州': 'guizhou',
                        '海南': 'hainan',
                        '河北': 'hebei',
                        '黑龙江': 'heilongjiang',
                        '河南': 'henan',
                        '湖北': 'hubei',
                        '湖南': 'hunan',
                        '江苏': 'jiangsu',
                        '江西': 'jiangxi',
                        '吉林': 'jilin',
                        '辽宁': 'liaoning',
                        '内蒙古': 'neimenggu',
                        '宁夏': 'ningxia',
                        '青海': 'qinghai',
                        '山东': 'shandong',
                        '山西': 'shanxi',
                        '陕西': 'shanxi1',
                        '台湾': 'taiwan',
                        '香港': 'xianggang',
                        '新疆': 'xinjiang',
                        '浙江': 'zhejiang'
                    },
                    dataUpDate: ''
                };
            },
            created: function() {
                this.getOneMonthData();
                this.getProvinceData();
                this.dataUpDate = yufp.util.dateFormat(new Date(), '{y}-{m}-{d}');
            },
            mounted: function() {
                this.datemountFn();
                // this.getMap('china', this.provicesData);
                this.initMAUChart();
                // this.initFunctionCover();
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
                    strDate = nowDate.getDate(); //日
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    var dateStr = year + seperator1 + month + seperator1 + strDate;
                    return dateStr;
                },
                datemountFn: function() {
                    var dateEnd = yufp.util.dateFormat(new Date(), '{y}-{m}-{d}');
                    var dateStart = this.addOrReduceDate(dateEnd, -1);
                    this.dateRange = [dateStart + ' 00:00:00', dateEnd + ' 23:59:59'];
                },
                renderHeader1(h, { column }) {
                    return h(
                        'div', [
                            h('span', column.label),
                            h('el-tooltip', {　　　　
                                props: {　　　　　　 effect: 'light', 　　　　　　　　content: '统计时间区间内点击进入该模块用户人数/拥有该模块权限的用户总数', 　　　　　　　　placement: 'bottom'　　　　　　 },
                            }, [
                                h('i', {
                                    class: 'el-icon-warning-outline',
                                    style: 'margin-left:5px;'
                                })
                            ], {
                                content: '统计时间区间内点击进入该模块用户人数/拥有该模块权限的用户总数'
                            })
                        ]
                    );
                },
                bubbleSort: function(arr) {
                    if (arr.length > 0) {
                        let temp;
                        for (let i = 0; i < arr.length - 1; i++) {
                            for (let j = 0; j < arr.length - 1; j++) {
                                if (arr[j].value.replace('%', '') < arr[j + 1].value.replace('%', '')) {
                                    temp = arr[j];
                                    arr[j] = arr[j + 1];
                                    arr[j + 1] = temp;
                                }
                            }
                        }
                    }
                    return arr;
                },

                handleExportCommand: function(command) {
                    if (command === '1') {
                        yufp.util.exportPDF('.export-containerpt', '平台运营监测');
                        yufp.util.butLogInfo(hashCode, '平台运营监测', '导出PDF');
                    } else if (command === '2') {
                        var url = '/api/plfmonitoring/export';
                        if (this.dateRange) {
                            var date = this.dateRange;
                            url += "?startTime=" + date[0] + "&endTime=" +date[1];
                        }
                        yufp.util.download(url);
                        yufp.util.butLogInfo(hashCode, '平台运营监测', '导出Excel');
                    } else if (command === '3') {
                        var url = '/api/plfmonitoring/exportNoLoginUser';
                        yufp.util.download(url);
                        yufp.util.butLogInfo(hashCode, '平台运营监测', '导出未登录用户报告');
                    }
                },
                getOneMonthData: function(date) {
                    var _this = this;
                    var params = {};
                    if (date) {
                        params = {
                            startTime: date[0],
                            endTime: date[1]
                        };
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/plfmonitoring/systemuseinfo',
                        data: params,
                        callback: function(code, message, response) {
                            if (code === 0 && response.code === 0) {
                                _this.oneMonthObj = response.data;
                                _this.oneMonthObj.hb1 = _this.computedHb(response.data.proportion, response.data.lastProportion);
                                _this.oneMonthObj.hb2 = _this.computedHb(response.data.mau, response.data.lastMAU);
                                _this.oneMonthObj.hb3 = _this.computedHb(response.data.logins, response.data.lastLogins);
                            }
                        }
                    });
                },
                computedHb: function(current, last) {
                    var current = parseFloat(current);
                    var last = parseFloat(last);
                    var hb = 0;
                    if (current === 0) {
                        hb = 0;
                    } else if (current != 0 && last === 0) {
                        hb = 100;
                    } else if (current != 0 && last != 0) {
                        hb = ((current / last) - 1) * 100;
                    }
                    return hb;
                },
                // 悬浮提示
                // renderHeader: function(h, { column, $index }) {
                //     return h('span', {}, [
                //         h('span', {}, column.label + '(%)'),
                //         h('i', { attrs: { class: 'el-icon-warning-outline' } })
                //     ]);
                // },

                // randomData: function () {
                //   return Math.round(Math.random() * 10000);
                // },
                // 加载对应的JS
                loadBdScript: function(scriptId, url, callback) {
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    if (script.readyState) { // IE
                        script.onreadystatechange = function() {
                            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                                script.onreadystatechange = null;
                                callback();
                            }
                        };
                    } else { // Others
                        script.onload = function() {
                            callback();
                        };
                    }
                    script.src = url;
                    script.id = scriptId;
                    document.getElementsByTagName('head')[0].appendChild(script);
                },
                // 日期范围改变
                handleDateRangeChange: function(date) {
                    // this.getOneMonthData(date);
                    // this.getProvinceData(date);
                    // this.initMAUChart(date);
                    this.initFunctionCover(date);
                },
                getProvinceData: function(date) {
                    var _this = this;
                    var params = {};
                    if (date) {
                        params = {
                            startTime: date[0],
                            endTime: date[1]
                        };
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/plfmonitoring/orgmauproportion',
                        data: params,
                        callback: function(code, message, response) {
                            if (code === 0 && response.data) {
                                var sortData = response.data.sort;
                                var data = [];
                                var value = [];
                                var responseprovince;
                                for (var i = 0; i < response.data.map.length; i++) {
                                    var province = '';
                                    responseprovince = response.data.map[i].province;
                                    if (responseprovince.indexOf('省') != -1) {
                                        province = responseprovince.replace('省', '');
                                    } else if (responseprovince.indexOf('省') == -1 && responseprovince.indexOf('内蒙古') == -1) {
                                        province = responseprovince.substring(0, 1);
                                    } else if (responseprovince.indexOf('省') == -1 && responseprovince.indexOf('内蒙古') != -1) {
                                        province = '内蒙古';
                                    }
                                    data.push({ name: province, id: _this.proviceMap[province], value: (response.data.map[i].proportion).toFixed(2) });
                                    value.push((response.data.map[i].proportion).toFixed(2));
                                }
                                _this.max = value.length ? Math.max.apply(null, value) : 100;
                                _this.min = value.length ? Math.min.apply(null, value) : 0;
                                _this.provicesData = data;
                                // var chinadata = _this.bubbleSort(data);
                                // if (chinadata && chinadata.length > 5) {
                                //     _this.chinaArr = chinadata.splice(0, 5)
                                // } else {
                                //     _this.chinaArr = chinadata;
                                // }
                                _this.chinaArr = sortData;
                                _this.getMap('china', _this.provicesData);
                            }
                        }
                    });
                },
                getMap: function(name, data) {
                    var _this = this;
                    var mychart = echarts.init(document.getElementById('chinaChart'));
                    // _this.mapChart = mychart;
                    var mapOption = {
                        title: {
                            text: '机构月活用户占比热力图',
                            textStyle: {
                                color: '#333333',
                                fontSize: 14,
                                fontWeight: 600
                            },
                            left: 20
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: function(params) {
                                return params.name + '<br/>' + '月活用户占比:' + (params.value ? params.value + '%' : '0%');
                                // return `${params.name}<br/>月活用户占比:${params.value || 0}`;
                            }
                        },
                        visualMap: {
                            min: _this.min,
                            max: _this.max,
                            text: ['高', '低'],
                            realtime: false,
                            calculable: true,
                            orient: 'horizontal',
                            left: 'center',
                            itemWidth: 8,
                            inRange: {
                                color: ['#FCEDBE', '#FFDF80', '#FFCA33', '#FFB201', '#FF8C00', '#FF6500', '#E6450F', '#B22C02', '#661900']
                            }
                        },
                        series: [{
                            type: 'map',
                            mapType: name, // 自定义扩展图表类型
                            label: {
                                show: false
                            },
                            data: data || []
                        }]
                    };

                    mychart.setOption(mapOption);
                    // mychart.on('click', function (param) {
                    //   var pName = param.data.id;
                    //   if (pName) {
                    //     // 这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
                    //     _this.loadBdScript('$' + pName + 'JS', 'libs/map/js/province/' + pName + '.js', function () {
                    //       // initEcharts(Chinese_);
                    //       _this.getMap(param.name, []);
                    //     });
                    //   }
                    // });
                },

                initMAUChart: function(date) {
                    this.MAUOption = {
                        xAxis: {
                            type: 'category',
                            data: [],
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            },
                            axisTick: {
                                show: false
                            }
                        },
                        series: [{
                            data: [],
                            name: 'MAU',
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 6,
                            lineStyle: {
                                color: '#5B8FF9',
                                width: 4
                            },
                            itemStyle: {
                                color: '#5B8FF9'
                            }
                        }]
                    };
                    var _this = this;
                    var params = {};
                    if (date) {
                        params = {
                            startTime: date[0],
                            endTime: date[1]
                        };
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/plfmonitoring/mauflct',
                        data: params,
                        callback: function(code, message, response) {
                            if (code === 0) {
                                var list = response.data;
                                var xlist = [];
                                var data = [];
                                for (var i = 0; i < list.length; i++) {
                                    xlist[i] = list[i].month;
                                    data[i] = list[i].count;
                                }
                                _this.MAUOption.xAxis.data = xlist;
                                _this.MAUOption.series[0].data = data;
                            }
                        }
                    });
                },

                initFunctionCover: function(date) {
                    this.functionCoverOption = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // Use axis to trigger tooltip
                                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value',
                            show: false
                        },
                        yAxis: {
                            type: 'category',
                            data: [],
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            }
                        },
                        tooltip: {
                            // 鼠标经过tooltip显示正数，params.marker为默认的小圆点
                            formatter: function(params, ticket, callback) {
                                return '<span style="color:#FFFFFF; font-size:12px;font-weight: 400;">' + params.name + '<br/>' + params.marker + params.data + '%' + '</span>';
                            }
                        },
                        series: [{
                            type: 'bar',
                            stack: 'total',
                            color: '#F06C7F',
                            label: {
                                show: true,
                                position: 'insideLeft',
                                formatter: '{c} %'
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: []
                        }]
                    };
                    var _this = this;
                    var params = {};
                    if (date) {
                        params = {
                            startTime: date[0],
                            endTime: date[1]
                        };
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/plfmonitoring/funmodulestats',
                        data: params,
                        callback: function(code, message, response) {
                            if (code === 0) {
                                var list = response.data;
                                // var min; // 后台排序
                                // for(var i = 0; i < list.length; i++) {
                                //     for(var j = i; j < list.length; j++){
                                //         if(list[i].coverageRate > list[j].coverageRate){
                                //           min = list[j];
                                //           list[j] = list[i];
                                //           list[i] = min;
                                //         }
                                //     }
                                // }
                                var ylist = [];
                                var data = [];
                                for (var i = 0; i < list.length; i++) {
                                    list[i].coverageRate = list[i].coverageRate == '0' ? '0' : yufp.util.moneyFormatter(list[i].coverageRate);
                                    ylist[i] = list[i].module;
                                    data[i] = list[i].coverageRate;
                                }
                                _this.tableData = list;
                                _this.functionCoverOption.yAxis.data = ylist.reverse();
                                _this.functionCoverOption.series[0].data = data.reverse();
                            }
                        }
                    });
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