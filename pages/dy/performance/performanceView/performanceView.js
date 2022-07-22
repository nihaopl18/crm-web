/**
 * @created by 冉珣 on 2021-11-1 14:59:51
 * @updated by
 * @description 业绩查看
 */
define(['echarts'], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        console.log(hashCode);
        yufp.lookup.reg('TRIUMPH');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    progressTop: [{
                            percent: 0,
                            title: '存款日均净增',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K001',
                            content: '客户在当前统计节点和上一个统计节点之间的存款余额日均差值；统计时间范围为当年'
                        },
                        {
                            percent: 0,
                            title: 'AUM余额净增',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K002',
                            content: '当年统计节点和上年年末之间AUM余额的差值'
                        },
                        {
                            percent: 0,
                            title: '合格优慧及以上客户数',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K003',
                            content: '截止至统计节点我行合格优慧、显卓、显卓钻石和私行等级客户之和；其中合格优慧客户为连续三个月达标（10万-50万（含））的客户'
                        }
                    ],
                    progressBottom: [{
                            percent: 0,
                            title: '合格优慧及以上客户数净增',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K004',
                            content: '统计日合格优慧客户总数较上个统计期末合格优慧及以上的客户总数的净增量；统计时间范围为当年'
                        },
                        {
                            percent: 0,
                            title: '贷款放款量',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K005',
                            content: '统计期间内零售贷款放款量金额；统计时间范围为当年'
                        },
                        {

                        }
                        // {
                        //     percent: 0,
                        //     title: '优质按揭客户数',
                        //     tb: '0',
                        //     hb: '0',
                        //     money: '0',
                        //     triumphId: 'K006',
                        //     content: '优质按揭客户定义：①一线城市当年放款金额>=200万且完成理财风评②二线城市当年放款金额>=100万且完成理财风评*（理财风评要求适用于有财富业务分行）③外币放款客户'
                        // }
                    ],
                    balanceFirst: [{
                            percent: 0,
                            title: '存款日均余额',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K008',
                            content: '一段时间内客户在本行账户各类存款产品的日平均值；个人存款余额日均=Σ（统计期间内每天的客户账户中的存款）/统计期间天数；统计时间范围为当年'
                        },
                        {
                            percent: 0,
                            title: 'AUM余额',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K009',
                            content: '统计时点客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金和保险等（贷款、信用卡、网贷等不算入AUM)'
                        },
                        {
                            percent: 0,
                            title: '合格优慧客户数',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K010',
                            content: '合格优慧客户为连续三个月达标（10万-50万（含））的客户'
                        },
                        {
                            percent: 0,
                            title: '贷款放款笔数',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K011',
                            content: '指统计期内我行对各级各类零售贷款产品的放款笔数；统计时间范围为当年'
                        }
                    ],
                    balanceSecond: [{
                            percent: 0,
                            title: '按揭放款笔数',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K012',
                            content: '公式为“贷款放款量完成率=（统计当月的贷款放款量）/贷款放款量完成率年度目标值*100%”'
                        },
                        {
                            percent: 0,
                            title: '人均按揭放款笔数',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K013',
                            content: '截止至统计节点平均每个个贷客户经理的零售按揭放款笔数；客户经理人均零售按揭放款笔数=统计期内的零售按揭放款笔数/个贷客户经理数量；统计时间范围为当年'
                        },
                        {
                            percent: 0,
                            title: '车位贷放款笔数',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K014',
                            content: '车位贷放款笔数=Σ（统计期间内零售车位贷放款笔数）'
                        },
                        {
                            percent: 0,
                            title: '人均车位贷款笔数',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K015',
                            content: '截止至统计节点平均每个个贷客户经理的零售车位贷放款笔数；客户经理人均零售车位贷放款笔数=统计期内的零售车位贷放款笔数/个贷客户经理数量；统计时间范围为当年'
                        }
                    ],
                    balanceThird: [{
                            percent: 0,
                            title: '利率、汇率挂钩手续费收入',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K016',
                            content: '截止至统计节点为客户提供利率、汇率挂钩的理财产品相关服务收取的手续费收入，包括买入、售出所收取的手续费'
                        },
                        {
                            percent: 0,
                            title: '人民币基金手续费收入',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K017',
                            content: '截止至统计节点为客户提供人民币基金相关服务收取的手续费收入，包括买入、售出所收取的手续费；统计时间范围为当年'
                        },
                        {
                            percent: 0,
                            title: 'QDII手续费收入',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K018',
                            content: '截止至统计节点为客户提供QDII产品相关服务收取的手续费收入，包括买入、售出所收取的手续费；统计时间范围为当年'
                        },
                        {
                            percent: 0,
                            title: '境内结构性产品手续费收入',
                            tb: '0',
                            hb: '0',
                            money: '0',
                            triumphId: 'K019',
                            content: '截止至统计节点为客户提供境内结构性产品相关服务收取的手续费收入，包括买入、售出所收取的手续费；统计时间范围为当年'
                        }
                    ],
                    ppopData: [{
                        percent: 0,
                        title: '模拟PPOP',
                        tb: '0',
                        hb: '0',
                        money: '0',
                        content: '统计期间内的模拟拨备前利润，包括统计期内的个人存款净收入、零售贷款模拟净收入（含抵押贷款）和中间业务模拟收入',
                        dataDate: ''
                    }],
                    ppopCompose: {},
                    options: {},
                    baseUrl: '/api/acrmfcmcustmgrperf',
                    titleMap: {},
                    dialogTitle: '',
                    detailVisible: false,
                    detailUrl: '',
                    detailBaseParam: {},
                    orgIdAuth: '',
                    isAUM: false,
                    isDesposit: false,
                    isLoan: false,
                    isFee: false,
                    aumDetailUrl: '/api/acrmfcmcustmgrperf/queryaumdetailedlist',
                    loanDetailUrl: '/api/acrmfcmcustmgrperf/queryloandetailedlist',
                    despositDetailUrl: '/api/acrmfcmcustmgrperf/querydepositdetailedlist',
                    feeDetailUrl: '/api/acrmfcmcustmgrperf/querychargedetailedlist',
                    typeMap: {
                        'K016': '01',
                        'K017': '04',
                        'K018': '03',
                        'K019': '02'
                    },
                    isInnerShow: false,
                    tempData: {},
                    isManager: false,
                    isManagerArr: ['R002', 'R003'],
                    dataDateata: '',
                    K008date: '',
                    K016date: '',
                    K017date: '',
                    K018date: '',
                    K019date: '',
                };
            },
            created: function() {
                var _this = this;
                _this.isManagertFn();
                if (_this.isManager) {
                    _this.balanceSecond[1].title = '客均按揭放款笔数';
                    _this.balanceSecond[1].content = '统计期内平均向每位客户发放按揭贷款的金额；零售客均按揭放款金额=Σ（统计期内面向客户的按揭放款金额）/客户数；统计时间范围为当年';
                    _this.balanceSecond[3].title = '客均车位贷款笔数';
                    _this.balanceSecond[3].content = '客均车位贷放款笔数=Σ（统计期间内用户零售车位贷放款笔数）/下辖客户数；统计时间范围为当年';
                }
                yufp.service.request({
                    method: 'GET',
                    url: backend.custpubService + '/api/governedcust/getbusitype',
                    data: {
                        condition: JSON.stringify({ userId: yufp.session.userId })
                    },
                    callback: function(code, message, response) {
                        if (code == 0 && response.code === 0) {
                            if (response.data) {
                                _this.orgIdAuth = response.data.orgIdAuth;
                            }
                        } else {
                            _this.$message.error('查询失败');
                        }
                    }
                });
                _this.$nextTick(function() {
                    _this.titleMap = yufp.lookup.find('TRIUMPH', false);
                    _this.getList();
                });
            },
            mounted: function() {
                this.options = this.returnOptions({});
                this.titleMap = yufp.lookup.find('TRIUMPH', false);
                this.getList();
            },
            methods: {
                formatDate(day) {
                    let date1 = new Date(this.dataDateata);
                    let date2 = new Date(this.dataDateata);
                    date2.setDate(date1.getDate() - day);
                    let year = date2.getFullYear();
                    let month = (date2.getMonth() + 1) < 10 ? '0' + (date2.getMonth() + 1) : (date2.getMonth() + 1);
                    let today = date2.getDate() < 10 ? ('0' + date2.getDate()) : date2.getDate();
                    let time2 = (year || '') + '-' + (month || '') + '-' + (today || '');
                    return time2;
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
                returnOptions: function(data) {
                    var containWidth = document.querySelector('.echartBox').offsetWidth;
                    var options = {
                        grid: {
                            left: 0,
                            width: containWidth / 3
                        },
                        xAxis: {
                            type: 'value',
                            show: false
                        },
                        yAxis: {
                            type: 'category',
                            show: false,
                            data: []
                        },
                        series: [{
                                name: '个人存款净收入',
                                type: 'bar',
                                stack: 'total',
                                barWidth: 20,
                                label: {
                                    show: true,
                                    formatter: function(params) {
                                        return data.netIncomeDepositsRatio ? params.value.toFixed(2) + '%' : '0%';
                                    }
                                },
                                itemStyle: {
                                    color: '#F06C7F'
                                },
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [data.netIncomeDepositsRatio ? data.netIncomeDepositsRatio * 100 : !data.netIncomeDepositsRatio && !data.simulatedNetIncomeRatio && !data.middleIncomeRevenueRatio ? 33 : 0]
                            },
                            {
                                name: '零售贷款模拟净收入',
                                type: 'bar',
                                stack: 'total',
                                label: {
                                    show: true,
                                    formatter: function(params) {
                                        return data.simulatedNetIncomeRatio ? params.value.toFixed(2) + '%' : '0%';
                                    }
                                },
                                itemStyle: {
                                    color: '#A660BD'
                                },
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [data.simulatedNetIncomeRatio ? data.simulatedNetIncomeRatio * 100 : !data.netIncomeDepositsRatio && !data.simulatedNetIncomeRatio && !data.middleIncomeRevenueRatio ? 33 : 0]
                            },
                            {
                                name: '中收模拟收入合计',
                                type: 'bar',
                                stack: 'total',
                                label: {
                                    show: true,
                                    formatter: function(params) {
                                        return data.middleIncomeRevenueRatio ? params.value.toFixed(2) + '%' : '0%';
                                    }
                                },
                                itemStyle: {
                                    color: '#508EFA'
                                },
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [data.middleIncomeRevenueRatio ? data.middleIncomeRevenueRatio * 100 : !data.netIncomeDepositsRatio && !data.simulatedNetIncomeRatio && !data.middleIncomeRevenueRatio ? 33 : 0]
                            }
                        ]
                    };
                    return options;
                },

                getList: function() {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: _this.baseUrl + '/Querylist',
                        callback: function(code, message, response) {
                            if (code === 0) {
                                _this.titleMap = yufp.lookup.find('TRIUMPH', false);
                                _this.dealData(response.data.crmFYyTriumphLookUpList);
                                _this.options = _this.returnOptions(response.data.crmTriuLookPpopList[0] || {});
                                if (response.data.crmTriuLookPpopList[0] == null) {
                                    _this.ppopCompose = {
                                        netIncomeDeposits: 0,
                                        simulatedNetIncome: 0,
                                        middleIncomeRevenue: 0
                                    }
                                } else {
                                    _this.ppopCompose = response.data.crmTriuLookPpopList[0];
                                }
                            }
                        }
                    });
                },
                dealData: function(list) {
                    var K002Time;
                    var K003Time;
                    var K004Time;
                    var K005Time;
                    for (var i = 0; i < list.length; i++) {
                        var id = list[i].triumphId;
                        if (id === 'K001' || id === 'K002' || id === 'K003') {
                            var index = id === 'K001' ? 0 : id === 'K002' ? 1 : 2;
                            this.fillData('progressTop', index, list[i]);
                            if(id === 'K002'){
                                K002Time = list[i].dataUpdateDate;
                            }
                            if(id === 'K003'){
                                K003Time = list[i].dataUpdateDate;
                            }
                        }
                        if (id === 'K004' || id === 'K005' || id === 'K006') {
                            var index = id === 'K004' ? 0 : id === 'K005' ? 1 : 2;
                            this.fillData('progressBottom', index, list[i]);
                            if(id === 'K004'){
                                K004Time = list[i].dataUpdateDate;
                            }
                            if(id === 'K005'){
                                K005Time = list[i].dataUpdateDate;
                            }
                        }
                        if (id === 'K007') {
                            this.fillData('ppopData', 0, list[i]);
                        }
                        if (id === 'K008' || id === 'K009' || id === 'K010' || id === 'K011') {
                            var index = id === 'K008' ? 0 : id === 'K009' ? 1 : id === 'K010' ? 2 : 3;
                            this.fillData('balanceFirst', index, list[i]);
                            id === 'K008' ? this.K008date = list[i].dataUpdateDate : '';
                        }
                        if (id === 'K012' || id === 'K013' || id === 'K014' || id === 'K015') {
                            var index = id === 'K012' ? 0 : id === 'K013' ? 1 : id === 'K014' ? 2 : 3;
                            this.fillData('balanceSecond', index, list[i]);
                        }
                        if (id === 'K016' || id === 'K017' || id === 'K018' || id === 'K019') {
                            var index = id === 'K016' ? 0 : id === 'K017' ? 1 : id === 'K018' ? 2 : 3;
                            this.fillData('balanceThird', index, list[i]);
                            // id === 'K016' ? this.K016date = list[i].dataUpdateDate : '';
                            // id === 'K017' ? this.K017date = list[i].dataUpdateDate : '';
                            // id === 'K018' ? this.K018date = list[i].dataUpdateDate : '';
                            // id === 'K019' ? this.K019date = list[i].dataUpdateDate : '';
                            // if (!this.K016date) {
                            //     this.K016date = this.formatDate(3)
                            // }
                        }
                    }
                    this.dataDateata = K002Time || K003Time || K004Time || K005Time; // 取时间字段
                    this.K016date = this.formatDate(3);
                    if (this.dataDateata) {
                        this.ppopData[0].dataDate = this.dataDateata.split('-')[0] + '-' + this.dataDateata.split('-')[1];
                    } else {
                        this.ppopData[0].dataDate = ''
                    }
                },
                fillData: function(paramName, index, data) {
                    var id = data.triumphId;
                    var balance = '';
                    if (id === 'K003' || id === 'K004' || id === 'K006' || id === 'K010' || id === 'K011' || id === 'K012' || id === 'K013' || id === 'K014' || id === 'K015' || id === 'K022') {
                        balance = yufp.util.moneyFormatter(data.balance || 0).split('.')[0];
                    } else {
                        balance = yufp.util.moneyFormatter(data.balance || 0);
                    }
                    this[paramName][index] = {
                        title: this[paramName][index].title,
                        percent: yufp.util.returnPercent(data.completionRate || 0),
                        hb: yufp.util.returnPercent(data.ringRatio || 0),
                        tb: yufp.util.returnPercent(data.yearOnYear || 0),
                        money: balance,
                        triumphId: id,
                        triumphLine: data.triumphLine,
                        targetId: data.targetId,
                        content: this[paramName][index].content,
                        upOrDownClassHb: data.ringRatio >= 0 ? '1' : '-1',
                        upOrDownClassTb: data.yearOnYear >= 0 ? '1' : '-1',
                    };
                },
                detailFn: function(data) {
                    var _this = this;
                    _this.tempData = data;
                    _this.resetFn();
                    var id = data.triumphId;
                    var params = {
                        orgIdAuth: _this.orgIdAuth
                    };
                    var tableName = '';
                    // 查询aum余额
                    if (id === 'K002' || id === 'K009') {
                        _this.isAUM = true;
                        tableName = 'detailAUMTable';
                    }
                    // 查询存款明细
                    if (id === 'K001' || id === 'K008') {
                        _this.isDesposit = true;
                        tableName = 'detailDespositTable';
                    }
                    // 查询贷款明细
                    if (id === 'K005' || id === 'K011' || id === 'K012' || id === 'K014') {
                        _this.isLoan = true;
                        tableName = 'detailLoanTable';
                        if (id === 'K012') {
                            params.loanType = '01';
                        }
                        if (id === 'K014') {
                            params.loanType = '02';
                        }
                    }
                    // 查询手续费明细
                    if (id === 'K016' || id === 'K017' || id === 'K018' || id === 'K019') {
                        _this.isFee = true;
                        params.chargeType = _this.typeMap[id];
                        tableName = 'detailFeeTable';
                    }
                    _this.dialogTitle = data.title;
                    _this.$nextTick(function() {
                        if(_this.isManager){
                            this.isInnerShow = true;
                        }
                        var newParams = {
                            condition: JSON.stringify(params)
                        }
                        _this.$refs[tableName].remoteData(newParams);
                    });
                },
                resetFn: function() {
                    this.isAUM = false;
                    this.isDesposit = false;
                    this.isFee = false;
                    this.isLoan = false;
                    this.isInnerShow = false;
                },
                handleClose: function() {
                    this.resetFn();
                },
                innerDetailFn: function(row, tableName) {
                    var params = {
                        orgIdAuth: this.orgIdAuth,
                        targetId: row.targetId,
                        loanType: row.loanType || '',
                        chargeType: row.chargeType || ''
                    };
                    this.isInnerShow = true;
                    var newParams = {
                        condition: JSON.stringify(params)
                    }
                    this.$refs[tableName].remoteData(newParams);
                },
                backFn: function() {
                    this.detailFn(this.tempData);
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