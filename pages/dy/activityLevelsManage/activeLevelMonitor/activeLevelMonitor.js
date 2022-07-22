/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-09-14 17:45:04
 * @update by:
 * @description:
 */
/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-09-14 17:45:04
 * @update by:
 * @description:
 */
/**
 * @created by zhangkun6 on 2021-9-14 17:45:04
 * @updated by
 * @description 活动量检测
 */
define(['echarts', 'jquery'], function (require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('DY0009,DY0002,DY0003');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                return {
                    tableOrgname: '机构名称',
                    todoroal: '待办跟进率',
                    code: '',
                    cardList: [],
                    overviewType: {
                        loan: '个贷人均管户数',
                        financing: '理财人均管户数',
                        report: '本月工作报告新增数',
                        touch: '本月接触客户数',
                        change: '本月异动事项处理率',
                        todowork: '本月待办事项跟进率',
                        team: '人均管户数数据',
                        all: '综合人均管户数'
                    },
                    contents: {
                        loan: '个贷人均管户数=统计范围内的管户客户数量/统计范围内的客户经理人数',
                        financing: '理财人均管户数=统计范围内的管户客户数量/统计范围内的客户经理人数',
                        report: '本月新增的工作报告数',
                        touch: '本月跟进的客户总数',
                        change: '本月已处理的异动提醒数/触发的异动提醒总数',
                        todowork: '本月待办事项完成数/待办事项新增数',
                        team: '人均管户数数据',
                        all: '综合人均管户数=统计范围内的管户客户数量/统计范围内的客户经理人数'
                    },
                    custOption: {
                        tooltip: {
                            trigger: 'item'
                        },
                        xAxis: {
                            type: 'category',
                            data: [],
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                rotate: 45
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '6%',
                            bottom: '6%',
                            containLabel: true
                        },
                        yAxis: {
                            type: 'value',
                            name: '管户数',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            }
                        },
                        legend: {
                            data: ['个贷', '理财']
                            // bottom: 0
                        },
                        series: [{
                            data: [],
                            type: 'bar',
                            name: '个贷',
                            color: '#F5863D',
                            barMaxWidth: 24,
                            barMinWidth: 10
                        }, {
                            data: [],
                            type: 'bar',
                            name: '理财',
                            color: '#F6CC39',
                            barMaxWidth: 24,
                            barMinWidth: 10
                        }]
                    },
                    custTouchOption: {
                        tooltip: {
                            trigger: 'item'
                        },
                        xAxis: {
                            type: 'category',
                            data: [],
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                rotate: 45
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            }
                        },
                        yAxis: {
                            type: 'value',
                            name: '客户接触次数',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            minInterval: 1
                        },
                        grid: {
                            left: '5%',
                            right: '6%',
                            bottom: '6%',
                            containLabel: true
                        },
                        series: [{
                            data: [],
                            type: 'bar',
                            name: '接触次数',
                            color: '#F06C7F',
                            barMaxWidth: 24,
                            barMinWidth: 10
                        }]
                    },
                    dateRange: [],
                    custTouchList: [{
                        title: '接触客户人数',
                        count: 0,
                        hb: '0%',
                        id: 1,
                        content: '客户经理以线下、电话或短信形式接触客户的人数'
                    },
                    {
                        title: '接触客户次数',
                        count: 0,
                        hb: '0%',
                        id: 2,
                        content: '客户经理以线下、电话或短信形式接触客户的次数'
                    },
                    {
                        title: '线下拜访次数',
                        count: 0,
                        hb: '0%',
                        id: 3,
                        content: '客户经理给线下拜访客户次数'
                    },
                    {
                        title: '拨通电话数',
                        count: 0,
                        hb: '0%',
                        id: 4,
                        content: '客户经理给客户拨通电话次数'
                    }
                    ],
                    noticePieOption: {
                        title: {
                            text: '异动处理情况',
                            left: 'center',
                            top: 30,
                            textStyle: {
                                fontWeight: 'normal',
                                color: '#303133',
                                fontSize: 14
                            }
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            top: 'middle',
                            icon: 'circle'
                        },
                        color: ['#63DB8D', '#F5C316'],
                        series: [{
                            name: '异动处理情况',
                            type: 'pie',
                            radius: '50%',
                            data: [
                                { value: 0, name: '已处理异动' },
                                { value: 0, name: '待处理异动' }
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }]
                    },
                    noticeBarOption: {
                        tooltip: {},
                        legend: {
                            data: ['已处理', '待处理'],
                            bottom: 0
                        },
                        xAxis: {
                            data: [],
                            axisLine: {
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            }
                        },
                        yAxis: {
                            name: '各类型异动占比',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        },
                        series: [{
                            name: '待处理',
                            type: 'bar',
                            data: [],
                            stack: 'one',
                            color: '#F5C316 ',
                            barMaxWidth: 24,
                            barMinWidth: 10
                        }, {
                            name: '已处理',
                            type: 'bar',
                            data: [],
                            stack: 'one',
                            color: '#63DB8D ',
                            barMaxWidth: 24,
                            barMinWidth: 10
                        }]
                    },
                    waitdoPieOption: {
                        title: {
                            text: '待办处理情况',
                            left: 'center',
                            top: 30,
                            textStyle: {
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#303133'
                            }
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            bottom: 0,
                            icon: 'circle'
                        },
                        color: ['#63DB8D', '#F5C316'],
                        series: [{
                            name: '异动处理情况',
                            type: 'pie',
                            radius: '50%',
                            data: [
                                { value: 1048, name: '已跟进' },
                                { value: 735, name: '待跟进' }
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }]
                    },
                    waitdoBarOption: {
                        tooltip: {},
                        legend: {
                            data: ['已跟进', '待跟进'],
                            bottom: 0,
                            icon: 'circle'
                        },
                        xAxis: {
                            data: [],
                            axisLine: {
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            }
                        },
                        yAxis: {
                            name: '各类型待办占比',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        },
                        tooltip: {
                            formatter: function (params, ticket, callback) {
                                return '<span style="color:#FFFFFF; font-size:12px;font-weight: 400;">' + params.seriesName + '<br/>' + params.name + ':' + params.value + '%' + '</span></span>';
                            }
                        },
                        series: [{
                            name: '待跟进',
                            type: 'bar',
                            data: [],
                            stack: 'one',
                            color: '#F5C316 ',
                            barMaxWidth: 24,
                            barMinWidth: 10
                        }, {
                            name: '已跟进',
                            type: 'bar',
                            data: [],
                            stack: 'one',
                            color: '#63DB8D ',
                            barMaxWidth: 24,
                            barMinWidth: 10
                        }]
                    },
                    reportPieOption: {
                        title: {
                            text: '工作内容组成',
                            left: 'center',
                            top: 10,
                            textStyle: {
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#303133'
                            }
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            top: 'middle',
                            right: 'right',
                            icon: 'circle',
                            orient: 'vertical'
                        },
                        series: [{
                            name: '工作内容',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                { value: 0, name: '培训/会议' },
                                { value: 0, name: '商机' },
                                { value: 0, name: '外访' },
                                { value: 0, name: '客户跟进' },
                                { value: 0, name: '材料整理' }
                            ]
                        }],
                        color: ['#F06C7F', '#F5C316', '#508EFA', '#A660BD', '#63DB8D']
                    },
                    workReportObj: {},
                    changeRemindObj: {},
                    waitdoObj: {},
                    waitdoTableData: [],
                    custmanageroverviewObj: {},
                    custmanageroverview: {
                        all: false,
                        loan: false,
                        financing: false,
                        team: false
                    },
                    detailVisible: false,
                    dataUrl: '/api/activitymonitoring/todoworkdetail',
                    rangeDate: [],
                    title: '',
                    touchVisible: false,
                    dataUrlTouch: '/api/activitymonitoring/touchExcel',
                    todoWorkVisible: false,
                    dataUrlTodoWork: '/api/activitymonitoring/todoWorkExcel',
                    remindVisible: false,
                    dataUrlRemind: '/api/activitymonitoring/remindExcel',
                    workReportVisible: false,
                    dataUrlWorkReport: '/api/activitymonitoring/workReportExcel',
                    baseParams: {}
                };
            },
            created: function () {
                this.getRoleCode();
                // this.getWorkReportData();
                // this.getChangeRemindData();
                // this.getToDoWorkData();
                this.getDataOverview();
                this.getBelongOverview();
                this.getCustManageOverview();
                // this.getTouchCustInfo();
            },
            mounted: function () {
                var _this = this;
                _this.datemountFn();
                _this.$nextTick(function () {
                    var noticeBarChart = this.$refs.noticeBar.echartsInstance;
                    console.log(noticeBarChart);
                    noticeBarChart.getZr().on('click', function (params) {
                        console.log(1);
                        console.log(params);
                    });
                });
            },
            methods: {
                addOrReduceDate: function (date, num) {
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
                datemountFn: function () {
                    var dateEnd = yufp.util.dateFormat(new Date(), '{y}-{m}-{d}');
                    var dateStart = this.addOrReduceDate(dateEnd, -1);
                    this.dateRange = [dateStart + ' 00:00:00', dateEnd + ' 23:59:59'];
                },
                getRoleCode: function () {
                    var roles = yufp.session.roles;
                    var selectRole = yufp.sessionStorage.get('selectRole');
                    for (var i = 0; i < roles.length; i++) {
                        if (roles[i].id === selectRole) {
                            this.code = roles[i].code;
                            return;
                        }
                    }
                },
                handleExportCommand: function (command) {
                    if (command === '1') {
                        yufp.util.exportPDF('.export-container', '活动量');
                        yufp.util.butLogInfo(hashCode, '活动量监测', '导出PDF');
                    } else if (command === '2') {
                        var startTime = '';
                        var endTime = '';
                        if (this.rangeDate && this.rangeDate.length == 2) {
                            startTime = this.rangeDate[0];
                            endTime = this.rangeDate[1];
                        }
                        var url = '/api/activitymonitoring/export?startTime=' + startTime + '&endTime=' + endTime + '&selectRole=' + this.code;
                        yufp.util.download(url);
                        yufp.util.butLogInfo(hashCode, '活动量监测', '导出Excel');
                    }
                },
                // 去机构详情页面
                toBankDetail: function (data) {
                    if (data.orgLevel == '2') {
                        yufp.frame.addTab({
                            // 路由名称
                            id: 'wait2doFollowDetail',
                            // 自定义唯一页签key,请统一使用custom_前缀开头
                            key: 'custom_wait2doFollowDetail' + data.orgId,
                            // 页签名称
                            title: '待办跟进详情-' + data.name,
                            // 传递的业务数据，可选配置
                            data: { orgId: data.orgId, orgName: data.name, orgLevel: data.orgLevel, rangeDate: this.rangeDate }
                        });
                    } else {
                        var _this = this;
                        var params = {
                            condition: JSON.stringify({
                                startTime: _this.rangeDate[0],
                                endTime: _this.rangeDate[1],
                                orgId: data.orgId,
                                creatorId: data.creatorId
                            })
                        };
                        this.detailVisible = true;
                        _this.$nextTick(function () {
                            _this.$refs.detailTable.remoteData(params);
                        });
                    }

                },
                handleClose: function () {
                    this.detailVisible = false;
                    this.touchVisible = false;
                    this.remindVisible = false;
                    this.todoWorkVisible = false;
                    this.workReportVisible = false;
                },
                // 日期范围改变
                handleDateRangeChange: function (date) {
                    if (date) {
                        this.rangeDate = date || [];
                        this.baseParams = {
                            startTime: date[0],
                            endTime: date[1]
                        }
                        // this.getBelongOverview(date);
                        this.getChangeRemindData(date);
                        // this.getCustManageOverview(date);
                        // this.getDataOverview(date);
                        this.getToDoWorkData(date);
                        this.getTouchCustInfo(date);  
                        this.getWorkReportData(date);
                    }
                },
                // 获取工作报告
                getWorkReportData: function (date) {
                    var _this = this;
                    var types = yufp.lookup.find('DY0003', false);
                    var params = {};
                    if (date) {
                        params = {
                            condition: JSON.stringify({
                                startTime: date[0],
                                endTime: date[1]
                            })
                        };
                    }
                    yufp.service.request({
                        url: '/api/activitymonitoring/workreport',
                        method: 'GET',
                        data: params,
                        callback: function (code, message, response) {
                            if (response.code === 0) {
                                var workReportType = response.data.workReportType || [];
                                var obj = {};
                                for (var i = 0; i < workReportType.length; i++) {
                                    if (workReportType[i]) {
                                        obj[workReportType[i].workReportBusiType] = workReportType[i].count;
                                    }
                                }
                                _this.workReportObj = obj;
                                if (response.data.contentType) {
                                    var contentType = response.data.contentType || [];
                                    var data = [];
                                    for (var i = 0; i < contentType.length; i++) {
                                        if (contentType[i]) {
                                            data.push({ name: types[contentType[i].workSummary], value: contentType[i].count });
                                        }
                                    }
                                    _this.reportPieOption.series[0].data = data;
                                }
                            }
                        }
                    });
                },
                // 获取异动提醒
                getChangeRemindData: function (date) {
                    var _this = this;
                    var params = {};
                    if (date) {
                        params = {
                            condition: JSON.stringify({
                                startTime: date[0],
                                endTime: date[1]
                            })
                        };
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/activitymonitoring/changeremind',
                        data: params,
                        callback: function (code, message, response) {
                            var noticeTypes = yufp.lookup.find('DY0009', false);
                            if (code === 0 && response.code === 0) {
                                var data = response.data;
                                var details = response.data.detail;
                                _this.changeRemindObj = {
                                    total: data.total,
                                    wait: data.count3,
                                    already: data.count2,
                                    aging: data.aging
                                };
                                _this.noticePieOption.series[0].data[0].value = data.count2;
                                _this.noticePieOption.series[0].data[1].value = data.count3;
                                var xlist = [];
                                var didArr = [];
                                var waitArr = [];
                                for (var i = 0; i < details.length; i++) {
                                    if (xlist.indexOf(noticeTypes[details[i].typeId]) === -1) {
                                        xlist.push(noticeTypes[details[i].typeId]);
                                    }
                                    if (details[i].state == '2') {
                                        waitArr.push({
                                            value: details[i].rate,
                                            id: details[i].typeId
                                        });
                                    } else {
                                        didArr.push({
                                            value: details[i].rate,
                                            id: details[i].typeId
                                        });
                                    }
                                }
                                _this.noticeBarOption.xAxis.data = xlist;
                                _this.noticeBarOption.series[0].data = waitArr;
                                _this.noticeBarOption.series[1].data = didArr;
                            }
                        }
                    });
                },
                // 获取待办提醒
                getToDoWorkData: function (date) {
                    var _this = this;
                    var _selectRole = _this.code;
                    if (_selectRole == 'R002' || _selectRole == 'R003' || _selectRole == 'R004' || _selectRole == 'R017') {
                        _this.tableOrgname = '客户经理';
                        _this.todoroal = '总跟进率';
                    }
                    var params = {};
                    if (date) {
                        params = {
                            condition: JSON.stringify({
                                startTime: date[0],
                                endTime: date[1]
                            })
                        };
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/activitymonitoring/todowork',
                        data: params,
                        callback: function (code, message, response) {
                            var todoTypes = yufp.lookup.find('DY0002', false);
                            if (code === 0) {
                                var data = response.data;
                                var details = response.data.detail;
                                _this.waitdoObj = {
                                    new: data.total,
                                    wait: data.count1,
                                    already: data.count2
                                };
                                _this.waitdoPieOption.series[0].data[0].value = data.count2;
                                _this.waitdoPieOption.series[0].data[1].value = data.count1;
                                var xlist = [];
                                var didArr = [];
                                var waitArr = [];
                                for (var i = 0; i < details.length; i++) {
                                    if (xlist.indexOf(todoTypes[details[i].todoWorkType]) === -1) {
                                        xlist.push(todoTypes[details[i].todoWorkType]);
                                    }
                                    if (details[i].todoWorkState == 1) {
                                        waitArr.push(details[i].rate);
                                    } else {
                                        didArr.push(details[i].rate);
                                    }
                                }
                                _this.waitdoBarOption.xAxis.data = xlist;
                                _this.waitdoBarOption.series[0].data = waitArr;
                                _this.waitdoBarOption.series[1].data = didArr;
                                _this.waitdoTableData = response.data.rateList;
                            }
                        }
                    });
                },

                // 获取数据概览
                getDataOverview: function (date) {
                    var _this = this;
                    var params = {};
                    if (date) {
                        params = {
                            startTime: date[0],
                            endTime: date[1]
                        };
                    }
                    params.selectRole = _this.code;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/activitymonitoring/dataoverview',
                        data: params,
                        callback: function (code, message, response) {
                            if (code === 0 && response.data) {
                                var data = response.data;
                                var arr = [];
                                for (var key in data) {
                                    if (_this.overviewType[key]) {
                                        arr.push({
                                            key: key,
                                            // count: data[key].value || 0,
                                            count: data[key] == null ? 0 : data[key].num == null ? 0 : data[key].num,
                                            // hb: data[key].hb,
                                            hb: ((data[key] == null ? 0 : data[key].hb == null ? 0 : data[key].hb) * 100).toFixed(2),
                                            label: _this.overviewType[key],
                                            contents: _this.contents[key]
                                        });

                                    }
                                }
                                _this.cardList = arr;

                                console.log(arr);
                            }
                        }
                    });
                },

                // 获取管户数据
                getBelongOverview: function (date) {
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
                        url: '/api/activitymonitoring/belongoverview',
                        data: params,
                        callback: function (code, message, response) {
                            if (code === 0 && response.data) {
                                var list = response.data;
                                var selfLoan = [];
                                var financial = [];
                                var xlist = [];
                                for (var i = 0; i < list.length; i++) {
                                    xlist.push(list[i].name);
                                    selfLoan.push(list[i].loanCount);
                                    financial.push(list[i].financingCount);
                                }
                                _this.custOption.xAxis.data = xlist;
                                _this.custOption.series[0].data = selfLoan;
                                _this.custOption.series[1].data = financial;
                            }
                        }
                    });
                },

                // 获取客户经理概览
                getCustManageOverview: function (date) {
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
                        url: '/api/activitymonitoring/custmanageroverview',
                        data: params,
                        callback: function (code, message, response) {
                            if (code === 0 && response.data) {
                                var data = response.data;
                                _this.custmanageroverviewObj = {
                                    all: data.all,
                                    loan: data.loan,
                                    financing: data.financing,
                                    team: data.team
                                };
                                for (var key in data) {
                                    console.log(data[key]);
                                    if (data[key] != null && data[key] != undefined) {
                                        _this.custmanageroverview[key] = true;
                                    }
                                }
                            }
                        }
                    });
                },

                // 获取客户接触信息
                getTouchCustInfo: function (date) {
                    var _this = this;
                    var params = {};
                    if (date) {
                        params = {
                            condition: JSON.stringify({
                                startTime: date[0],
                                endTime: date[1]
                            })
                        };
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/activitymonitoring/touchcustinfo',
                        data: params,
                        callback: function (code, message, response) {
                            if (code === 0 && response.data) {
                                var data = response.data;
                                _this.custTouchList[0].count = data.count1;
                                _this.custTouchList[0].hb = data.ratio1;
                                _this.custTouchList[1].count = data.count2;
                                _this.custTouchList[1].hb = data.ratio2;
                                _this.custTouchList[2].count = data.count3;
                                _this.custTouchList[2].hb = data.ratio3;
                                _this.custTouchList[3].count = data.count4;
                                _this.custTouchList[3].hb = data.ratio4;
                                var list = data.detail || [];
                                var xlist = [];
                                var data = [];
                                for (var i = 0; i < list.length; i++) {
                                    xlist.push(list[i].name);
                                    data.push(list[i].count || 0);
                                }
                                _this.custTouchOption.xAxis.data = xlist;
                                _this.custTouchOption.series[0].data = data;
                            }
                        }
                    });
                },
                totalDetail: function (val) {
                    var _this = this;
                    if (val == 'touch') {
                        _this.touchVisible = true;
                        _this.title = '客户接触汇总详情';
                        _this.$nextTick(function () {
                            _this.$refs.touchTable.remoteData();
                        });
                    } else if (val == 'remind') {
                        _this.remindVisible = true;
                        _this.title = '异动提醒汇总详情';
                        _this.$nextTick(function () {
                            _this.$refs.remindTable.remoteData();
                        });
                    } else if (val == 'todoWork') {
                        _this.todoWorkVisible = true;
                        _this.title = '待办事项汇总详情';
                        _this.$nextTick(function () {
                            _this.$refs.todoWorkTable.remoteData();
                        });
                    } else if (val == 'workReport') {
                        _this.workReportVisible = true;
                        _this.title = '工作汇总详情';
                        _this.$nextTick(function () {
                            _this.$refs.workReportTable.remoteData();
                        });
                    }

                },
                returnRatio: function (val1, val2) {
                    if (val2 != 0) {
                        var result = val1 / val2;
                        if (result) {
                            return (result * 100).toString();
                        } else {
                            return result;
                        }
                    }
                    return 0;
                },
                formJE: function (row, column, cellValue) {
                    if (!cellValue) {
                        return 0;
                    }
                    return cellValue;
                },
                formJER: function (row, column, cellValue) {
                    if (!cellValue) {
                        return 0;
                    }
                    return cellValue.toString() + '%';
                }
            }
        });
    };

    /**
     * 页面传递消息处理
     * @param type 消息类型
     * @param message 消息内容
     */
    exports.onmessage = function (type, message) { };

    /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
    exports.destroy = function (id, cite) { };
});