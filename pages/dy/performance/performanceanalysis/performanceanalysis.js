/**
 * @created by zhangkun6 on 2021-8-6 09:46:35
 * @updated by
 * @description 东亚银行首页
 */
define([
    './libs/daterangepicker/moment.min.js',
    './pages/dy/indexPage/top-right.js',
    './pages/dy/indexPage/wait2do-add.js',
    './pages/dy/indexPage/report-add1.js',
    './pages/dy/indexPage/weekCalendar.js',
    'echarts',
    'custom/plugins/yufp.drag.js',
    'custom/widgets/js/YufpEchart.js',
    './libs/venn.js',
    './libs/d3.v4.min.js',
    './custom/widgets/js/yufpGovernedCustSelector.js',
    // './custom/widgets/js/yufpMgrSelector.js',
    './pages/dy/performance/performanceanalysis/performanceMgrSelector.js'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('TRIUMPH');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    buttonshow: true,
                    noclickcs: true,
                    ress: {},
                    code: '',
                    ppopdata: {
                        title: '人均模拟PPOP',
                        content: '零售模拟PPOP/零售条线分行人数',
                        money: 0,
                        hb: '-',
                        tb: '-'
                    },
                    anayindex: 0,
                    custAnaisy: [{
                            first: '人均AUM余额',
                            second: '人均存款日均余额',
                            third: '人均贷款放款金额',
                            fourth: '人均贷款放款笔数',
                        },
                        {
                            first: '客均AUM余额',
                            second: '客均存款日均',
                            third: '客均贷款放款金额'
                        },
                    ],
                    histogramoptionorg: {
                        title: {
                            text: ''
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: [],
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            axisLine: { // ---坐标轴 轴线
                                show: false,
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    fontsize: 12,
                                    color: '#606266'
                                }
                            }
                        }],
                        tooltip: {
                            // 鼠标经过tooltip显示正数，params.marker为默认的小圆点
                            formatter: function(params, ticket, callback) {
                                if (params.data.ratio >= 0) {
                                    if (params.data.value) {
                                        return '<span style="color:#FFFFFF; font-size:12px;font-weight: 400;">' + params.marker + params.name + '&nbsp;&nbsp;' + yufp.util.moneyFormatter(params.data.value).split('.')[0] || '' + '<br/>' + '&nbsp;&nbsp;' + '环比' + '&nbsp;&nbsp;<span style="color:red" class="el-icon-caret-top colorRed">' + yufp.util.returnPercent(params.data.ratio) + '%' + '</span></span>';
                                    } else {
                                        return '<span style="color:#FFFFFF; font-size:12px;font-weight: 400;">' + params.marker + params.name + '&nbsp;&nbsp;' + '<br/>' + '&nbsp;&nbsp;' + '环比' + '&nbsp;&nbsp;<span style="color:red" class="el-icon-caret-top colorRed">' + yufp.util.returnPercent(params.data.ratio) + '%' + '</span></span>';
                                    }
                                } else {
                                    if (params.data.value) {
                                        return '<span style="color:#FFFFFF; font-size:12px;font-weight: 400;">' + params.marker + params.name + '&nbsp;&nbsp;' + yufp.util.moneyFormatter(params.data.value).split('.')[0] || '' + '<br/>' + '&nbsp;&nbsp;' + '环比' + '&nbsp;&nbsp;<span style="color:#86d256" class="el-icon-caret-bottom color-green">' + yufp.util.returnPercent(params.data.ratio) + '%' + '</span></span>';
                                    } else {
                                        return '<span style="color:#FFFFFF; font-size:12px;font-weight: 400;">' + params.marker + params.name + '&nbsp;&nbsp;' + '<br/>' + '&nbsp;&nbsp;' + '环比' + '&nbsp;&nbsp;<span style="color:#86d256" class="el-icon-caret-bottom color-green">' + yufp.util.returnPercent(params.data.ratio) + '%' + '</span></span>';
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Direct',
                            type: 'bar',
                            barWidth: '20%',
                            color: '#F5C316',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, // 开启显示
                                        position: 'top', // 在上方显示
                                        textStyle: { // 数值样式
                                            fontsize: 12,
                                            color: '#606266'
                                        },
                                        formatter: function(value, index) {
                                            if (value.data == 0) {
                                                return 0
                                            } else {
                                                return yufp.util.moneyFormatter(value.data || '')
                                            }
                                        }
                                    }
                                }
                            },
                            data: []
                        }]
                    },
                    selectCustParams: { // 客户 放大镜 参数
                        // user: {
                        //     dataParams: {
                        //         belongOrg: yufp.session.org.code,
                        //         belongMgr: yufp.session.user.loginCode
                        //     },
                        //     checkbox: true // 是否支持多选
                        // }
                        params: { tabCheckbox: false }, // 设置用户管理组件是否可以复选
                    },
                    exportObject: {},
                    valuecustRange: '',
                    forqueryFormdata: '',
                    valuemonth: '',
                    tableData: [],
                    searchData: '',
                    updatetimeTop: '',
                    updatetimeTopRight: '',
                    cumtableData: [{
                            ruleName: '数值',
                            aum: '0',
                            avgLoan: '0',
                            avgFin: '0',
                            avgCust: '0'
                        },
                        {
                            ruleName: '同比',
                            aum: '-',
                            avgLoan: '-',
                            avgFin: '-',
                            avgCust: '-'
                        },
                        {
                            ruleName: '环比',
                            aum: '-',
                            avgLoan: '-',
                            avgFin: '-',
                            avgCust: '-'
                        }
                    ],
                    roleName: '',
                    isManager: false,
                    isManagerArr: ['R002', 'R003'],
                    unit: '万元',
                    dateRange: []
                };
            },
            created: function() {
                let _this = this;
                _this.roleName = _this.returnRole();
                _this.isManagertFn();
                _this.getRoleCode();
                if (!_this.isManager) {
                    _this.ppopdata.title = '人均模拟PPOP';
                    _this.ppopdata.content = '零售模拟PPOP/零售条线分行人数';
                } else {
                    _this.ppopdata.title = '模拟PPOP';
                    _this.ppopdata.content = '统计期间内的模拟拨备前利润，包括统计期内的个人存款净收入、零售贷款模拟净收入（含抵押贷款）和中间业务模拟收入；模拟PPOP=Σ（统计期间内个人存款净收入+零售贷款模拟净收入（含抵押贷款）+中收模拟收入）';
                }
            },
            updated: function() {
                // 字典对象的转换
                var lookuptype = yufp.lookup.find('TRIUMPH', true);
                if (lookuptype != undefined && JSON.stringify(this.ress) == '{}') {
                    var result = {}
                    for (let i = 0; i < lookuptype.length; i++) {
                        result[lookuptype[i].key] = lookuptype[i].value;
                    }
                    this.ress = result;
                }
            },
            mounted: function() {
                let t = this;
                t.empView();
                t.initmonth();
                t.datemountFn();

            },
            breforeDestroy: function() {},
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
                    var dateStr = year + seperator1 + month + seperator1 + strDate;
                    return dateStr;
                },
                datemountFn: function() {
                    var dateEnd = yufp.util.dateFormat(new Date(), '{y}-{m}');
                    var dateStart = this.addOrReduceDate(dateEnd, -5);
                    this.dateRange = [dateStart, dateEnd];

                },
                grantStutasChange: function(val) {
                    var _this = this;
                    console.log(val);
                    if (val == 'K001' || val == 'K002' || val == 'K005' || val == 'K007' || val == 'K008' || val == 'K009' || val == 'K016' || val == 'K017' || val == 'K018' || val == 'K019' || val == 'K020' || val == 'K021' || val == 'K023' || val == 'K024' || val == 'K025' || val == 'K026' || val == 'K027') {
                        _this.unit = '万元'
                    } else if (val == 'K003' || val == 'K004' || val == 'K006' || val == 'K010') {
                        _this.unit = '个'
                    } else if (val == 'K011' || val == 'K012' || val == 'K013' || val == 'K014' || val == 'K015' || val == 'K022') {
                        _this.unit = '笔'
                    } else {
                        _this.unit = '万元'
                    }
                },
                formatDate(day) {
                    let date1 = new Date(this.updatetimeTop);
                    let date2 = new Date(this.updatetimeTop);
                    date2.setDate(date1.getDate() - day);
                    let year = date2.getFullYear();
                    let month = (date2.getMonth() + 1) < 10 ? '0' + (date2.getMonth() + 1) : (date2.getMonth() + 1);
                    let today = date2.getDate() < 10 ? ('0' + date2.getDate()) : date2.getDate();
                    let time2 = year + '-' + month + '-' + today;
                    console.log(time2);
                    return time2;
                },
                renderHeader1(h, { column }) {
                    return h(
                        'div', [
                            h('span', column.label),
                            h('el-tooltip', {　　　　
                                props: {　　　　　　 effect: 'light', 　　　　　　　　content: !this.anayindex ? '零售AUM余额/零售条线分行人数' : '截止至统计节点机构平均每位客户的AUM余额；零售客均AUM余额=Σ（截止至统计节点客户的AUM余额）/客户数；统计时间范围为当年', 　　　　　　　　placement: 'bottom'　　　　　　 },
                            }, [
                                h('i', {
                                    class: 'el-icon-warning-outline',
                                    style: 'margin-left:5px;'
                                })
                            ], {
                                content: !this.anayindex ? '零售AUM余额/零售条线分行人数' : '截止至统计节点机构平均每位客户的AUM余额；零售客均AUM余额=Σ（截止至统计节点客户的AUM余额）/客户数；统计时间范围为当年'
                            })
                        ]
                    );
                },
                renderHeader2(h, { column }) {
                    return h(
                        'div', [
                            h('span', column.label),
                            h('el-tooltip', {　　　　
                                props: {　　　　　　 effect: 'light', 　　　　　　　　content: !this.anayindex ? '零售存款日均余额/零售条线分行人数' : '截止至统计时点的存款总额日均/零售条线人数；零售客均存款日均=Σ（统计期内客户的存款日均）/客户数；统计时间范围为当年', 　　　　　　　　placement: 'bottom'　　　　　　 },
                            }, [
                                h('i', {
                                    class: 'el-icon-warning-outline',
                                    style: 'margin-left:5px;'
                                })
                            ], {
                                content: !this.anayindex ? '零售存款日均余额/零售条线分行人数' : '截止至统计时点的存款总额日均/零售条线人数；零售客均存款日均=Σ（统计期内客户的存款日均）/客户数；统计时间范围为当年'
                            })
                        ]
                    );
                },
                renderHeader3(h, { column }) {
                    return h(
                        'div', [
                            h('span', column.label),
                            h('el-tooltip', {　　　　
                                props: {　　　　　　 effect: 'light', 　　　　　　　　content: !this.anayindex ? '零售贷款放款金额/零售条线分行人数' : '统计期内平均向每位客户发放贷款的金额；零售客均贷款放款金额=Σ（统计期内面向客户的贷款放款金额）/客户数；统计时间范围为当年', 　　　　　　　　placement: 'bottom'　　　　　　 },
                            }, [
                                h('i', {
                                    class: 'el-icon-warning-outline',
                                    style: 'margin-left:5px;'
                                })
                            ], {
                                content: !this.anayindex ? '零售贷款放款金额/零售条线分行人数' : '统计期内平均向每位客户发放贷款的金额；零售客均贷款放款金额=Σ（统计期内面向客户的贷款放款金额）/客户数；统计时间范围为当年'
                            })
                        ]
                    );
                },
                renderHeader4(h, { column }) {
                    return h(
                        'div', [
                            h('span', column.label),
                            h('el-tooltip', {　　　　
                                props: {　　　　　　 effect: 'light', 　　　　　　　　content: '零售贷款放款笔数/零售条线分行人数', 　　　　　　　　placement: 'bottom'　　　　　　 },
                            }, [
                                h('i', {
                                    class: 'el-icon-warning-outline',
                                    style: 'margin-left:5px;'
                                })
                            ], {
                                content: '零售贷款放款笔数/零售条线分行人数'
                            })
                        ]
                    );
                },
                initmonth: function() {
                    var time = new Date();
                    var year = time.getFullYear();
                    var month = time.getMonth() + 1;
                    if (month < 10) {
                        month = '0' + month;
                    }
                    this.valuemonth = year + '-' + month;
                },
                getRoleCode: function() {
                    var roles = yufp.session.roles;
                    var selectRole = yufp.sessionStorage.get('selectRole');
                    for (var i = 0; i < roles.length; i++) {
                        if (roles[i].id === selectRole) {
                            this.code = roles[i].code;
                            return;
                        }
                    }
                },
                handleStartDateChange: function(val) {
                    var valstart;
                    var valend;
                    if (val) {
                        valstart = new Date((val[0] + '-01').replace(/-/g, '/')).getTime();
                        valend = new Date((val[1] + '-01').replace(/-/g, '/')).getTime();
                        if (val.length > 0) {
                            if (valend > valstart + 3600 * 1000 * 24 * 160) {
                                this.$message('时间期间不能超过6个月', '提示');
                                this.forqueryFormdata.rangeDate = [];

                            }
                            if (valend == valstart) {
                                this.$message('开始时间和结束时间不能相同');
                                this.forqueryFormdata.rangeDate = [];
                            }
                        }
                    } else {
                        valstart = '';
                        valend = '';
                    }

                },
                /**
                 * 查询——搜索按钮
                 */
                searchFn: function() {
                    var _this = this;
                    if (!_this.forqueryFormdata.grantStutas) {
                        _this.$refs.custforSearchForm.validateField('grantStutas', function(ermsg) {
                            idMsg = true;
                        });
                        if (idMsg) {
                            _this.$message({
                                type: 'warning',
                                message: '指标值不能为空！'
                            });
                            return;
                        }
                    }
                    var data = this.forqueryFormdata;
                    console.log(this.forqueryFormdata);
                    var rangeDate = data.rangeDate;
                    var paramslist = {};
                    if (rangeDate) {
                        this.exportObject.startDate = rangeDate[0];
                        this.exportObject.endDate = rangeDate[1];
                        paramslist = {
                            startDate: rangeDate[0],
                            endDate: rangeDate[1],
                            targetId: data.mktRespPerson,
                            triumphId: data.grantStutas
                        }
                    } else {
                        this.exportObject.startDate = '';
                        this.exportObject.endDate = '';
                        paramslist = {
                            startDate: '',
                            endDate: '',
                            targetId: data.mktRespPerson,
                            triumphId: data.grantStutas
                        }
                    }
                    this.exportObject.targetId = data.mktRespPerson;
                    this.exportObject.triumphId = data.grantStutas;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/acrmfcmcustmgrperf/Querydetalist',
                        data: {
                            condition: JSON.stringify(paramslist)
                        },
                        callback: function(code, message, response) {
                            console.log(response.data);
                            var data = response.data;
                            if (data.length > 0) {
                                _this.buttonshow = false;
                                _this.noclickcs = false;
                                var xAxisarr = [];
                                var seriesarr = [];
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].balance == null) {
                                        seriesarr.push(0)
                                    } else {
                                        if (_this.unit == '个' || _this.unit == '笔') {
                                            seriesarr.push(data[i].balance);
                                        } else {
                                            seriesarr.push(parseFloat(data[i].balance / 10000).toFixed(4));
                                        }
                                        // seriesarr.push(yufp.util.moneyFormatter(data[i].balance));
                                    }
                                    xAxisarr.push(data[i].dataDate)
                                }
                                _this.histogramoptionorg.xAxis[0].data = xAxisarr;
                                _this.histogramoptionorg.series[0].data = seriesarr;
                            } else {
                                _this.histogramoptionorg.xAxis[0].data = [];
                                _this.histogramoptionorg.series[0].data = [];
                            }
                            yufp.util.butLogInfo(hashCode, '业绩分析', '查询');
                        }
                    });


                },
                resetMainFn: function() {
                    this.$refs.custforSearchForm.resetFields();
                },
                dateChange: function(val) {
                    console.log(val);
                    var em = this;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/acrmfcmcustmgrperf/Querydetappoplist',
                        data: {
                            condition: JSON.stringify({
                                month: val
                            })
                        },
                        callback: function(code, message, response) {
                            if (code === 0)
                                console.log(response.data);
                            // 数组字段待确认
                            em.tableData = response.data.crmFYyTriumphVOList;
                            if (response.data.nalyseVO != null) {
                                em.ppopdata.money = response.data.nalyseVO.balance || '';
                                em.ppopdata.tb = response.data.nalyseVO.yearOnYear || '';
                                em.ppopdata.hb = response.data.nalyseVO.ringRatio || '';
                            } else {
                                em.ppopdata.money = '';
                                em.ppopdata.tb = '';
                                em.ppopdata.hb = '';
                            }
                        }
                    });
                },
                exportFn: function() {
                    var em = this;
                    var lookupitem = this.ress;
                    var vallookup = em.exportObject.triumphId;
                    var param = {
                        startDate: em.exportObject.startDate || '',
                        endDate: em.exportObject.endDate || '',
                        targetId: em.exportObject.targetId || '',
                        triumphId: em.exportObject.triumphId || '',
                        triumphName: lookupitem[vallookup] || '',
                        selectRole: yufp.sessionStorage.get('selectRole')

                    };
                    // var param = {
                    //     startDate: '2021-02',
                    //     endDate: '2021-03',
                    //     targetId: '01025',
                    //     triumphId: '',
                    //     triumphName:'',
                    //     selectRole: yufp.sessionStorage.get('selectRole')
                    // };
                    var url = '/api/acrmfcmcustmgrperf/exporttriumphlook?' + 'condition=' + encodeURI(JSON.stringify(param));
                    yufp.util.download(url);
                    yufp.util.butLogInfo(hashCode, '业绩分析', '导出');
                },

                // 返回登陆者角色
                returnRole: function() {
                    let roles = yufp.session.roles;
                    let roleCodes = [];
                    let roleName = '';
                    for (let i = 0; i < roles.length; i++) {
                        roleCodes.push(roles[i].code);
                    }
                    let str = roleCodes.join();
                    if (str.indexOf('R003') != -1 || str.indexOf('R002') !== -1) { // 客户经理
                        roleName = 'manager';
                    }
                    if (str.indexOf('R004') != -1) { // 团队长
                        roleName = 'leader';
                    }
                    if (str.indexOf('R005') != -1 || str.indexOf('R006') !== -1) { // 行长
                        roleName = 'banker';
                    }

                    return roleName;
                },
                isManagertFn: function() {
                    var _this = this;
                    var selectRole = yufp.sessionStorage.get('selectRole');
                    var rolesArr = yufp.session.roles;
                    for (var i = 0; i < rolesArr.length; i++) {
                        if (selectRole == rolesArr[i].id) {
                            if (_this.isManagerArr.indexOf(rolesArr[i].code) != -1) {
                                _this.isManager = true; // 包含
                            } else {
                                _this.isManager = false;
                            }
                        }
                    }
                },
                // 业绩分析
                empView: function() {
                    var x = this;
                    var _this = this;
                    var _selectRole = _this.code;
                    if (_selectRole == 'R002' || _selectRole == 'R003') {
                        _this.anayindex = 1;
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/acrmfcmcustmgrperf/Querylist',
                        callback: function(code, message, response) {
                            if (code === 0) {
                                if (response.data.crmFYyTriumphLookUpList.length != 0) {
                                    // _this.updatetimeTop = response.data.crmFYyTriumphLookUpList[0].dataUpdateDate;
                                    var crmFYyTriumphLookUpList = response.data.crmFYyTriumphLookUpList;
                                    if (_this.anayindex == 0) {
                                        for (let i = 0; i < crmFYyTriumphLookUpList.length; i++) {
                                            if (crmFYyTriumphLookUpList[i].triumphId == 'K020') {
                                                _this.cumtableData[0].aum = crmFYyTriumphLookUpList[i].balance; // 余额
                                                _this.cumtableData[1].aum = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                                _this.cumtableData[2].aum = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                            }
                                            if (crmFYyTriumphLookUpList[i].triumphId == 'K021') {
                                                _this.cumtableData[0].avgLoan = crmFYyTriumphLookUpList[i].balance; // 余额
                                                _this.cumtableData[1].avgLoan = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                                _this.cumtableData[2].avgLoan = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                            }
                                            if (crmFYyTriumphLookUpList[i].triumphId == 'K023') {
                                                _this.cumtableData[0].avgFin = crmFYyTriumphLookUpList[i].balance; // 余额
                                                _this.cumtableData[1].avgFin = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                                _this.cumtableData[2].avgFin = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                            }
                                            if (crmFYyTriumphLookUpList[i].triumphId == 'K022') {
                                                _this.cumtableData[0].avgCust = crmFYyTriumphLookUpList[i].balance; // 余额
                                                _this.cumtableData[1].avgCust = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                                _this.cumtableData[2].avgCust = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                            }

                                        }
                                    }
                                    if (_this.anayindex == 1) {
                                        for (let i = 0; i < crmFYyTriumphLookUpList.length; i++) {
                                            if (crmFYyTriumphLookUpList[i].triumphId == 'K025') {
                                                _this.cumtableData[0].aum = crmFYyTriumphLookUpList[i].balance; // 余额
                                                _this.cumtableData[1].aum = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                                _this.cumtableData[2].aum = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                            }
                                            if (crmFYyTriumphLookUpList[i].triumphId == 'K026') {
                                                _this.cumtableData[0].avgLoan = crmFYyTriumphLookUpList[i].balance; // 余额
                                                _this.cumtableData[1].avgLoan = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                                _this.cumtableData[2].avgLoan = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                            }
                                            if (crmFYyTriumphLookUpList[i].triumphId == 'K027') {
                                                _this.cumtableData[0].avgFin = crmFYyTriumphLookUpList[i].balance; // 余额
                                                _this.cumtableData[1].avgFin = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                                _this.cumtableData[2].avgFin = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                            }
                                        }
                                    }
                                    var K002Time;
                                    var K003Time;
                                    var K004Time;
                                    var K005Time;
                                    for (var i = 0; i < crmFYyTriumphLookUpList.length; i++) {
                                        var id = crmFYyTriumphLookUpList[i].triumphId;
                                        if (id === 'K002' || id === 'K003') {
                                            if (id === 'K002') {
                                                K002Time = crmFYyTriumphLookUpList[i].dataUpdateDate;
                                            }
                                            if (id === 'K003') {
                                                K003Time = crmFYyTriumphLookUpList[i].dataUpdateDate;
                                            }
                                        }
                                        if (id === 'K004' || id === 'K005') {
                                            if (id === 'K004') {
                                                K004Time = crmFYyTriumphLookUpList[i].dataUpdateDate;
                                            }
                                            if (id === 'K005') {
                                                K005Time = crmFYyTriumphLookUpList[i].dataUpdateDate;
                                            }
                                        }
                                    }
                                    _this.updatetimeTop = K002Time || K003Time || K004Time || K005Time; // 取时间字段
                                    _this.updatetimeTopRight = _this.formatDate(3);
                                }
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