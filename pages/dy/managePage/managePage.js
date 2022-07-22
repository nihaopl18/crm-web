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
    './libs/d3.v4.min.js'
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
                return {
                    isChormeable: false,
                    optionDialogVisible: false,
                    optionForm: {},
                    histogramOption: {
                        title: [{
                                text: '优慧及以上客户等级分布',
                                left: 0,
                                textStyle: {
                                    color: '#333333',
                                    fontSize: 14,
                                    fontWeight: 600
                                },
                            },
                            {
                                text: '',
                                top: '10',
                                left: '300',
                                textStyle: {
                                    color: '#595959',
                                    fontSize: 12
                                },
                            }
                        ],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '6%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#cccccc', // 颜色
                                }
                            },
                            axisTick: { show: false }
                        },
                        yAxis: {
                            type: 'category',
                            // y轴显示在右侧
                            position: 'left',
                            data: ['优慧客户', '显卓客户', '私行客户', '显卓钻石客户'],
                            axisLine: {
                                lineStyle: {
                                    color: '#cccccc', // 颜色
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            axisTick: { show: false },
                            axisLine: { show: false }
                        },
                        tooltip: {
                            // 鼠标经过tooltip显示正数，params.marker为默认的小圆点
                            formatter: function(params, ticket, callback) {
                                if (params.data.ratio >= 0) {
                                    return '<span style="color:#FFFFFF; font-size:12px;font-weight: 400;">' + params.marker + params.name + '&nbsp;&nbsp;' + yufp.util.moneyFormatter(params.data.value).split('.')[0] + '<br/>' + '&nbsp;&nbsp;' + '环比' + '&nbsp;&nbsp;<span style="color:red" class="el-icon-caret-top colorRed">' + yufp.util.returnPercent(params.data.ratio) + '%' + '</span></span>';
                                } else {
                                    return '<span style="color:#FFFFFF; font-size:12px;font-weight: 400;">' + params.marker + params.name + '&nbsp;&nbsp;' + yufp.util.moneyFormatter(params.data.value).split('.')[0] + '<br/>' + '&nbsp;&nbsp;' + '环比' + '&nbsp;&nbsp;<span style="color:#86d256" class="el-icon-caret-bottom color-green">' + yufp.util.returnPercent(params.data.ratio) + '%' + '</span></span>';
                                }
                            }
                        },
                        series: [{
                            name: '统计信息',
                            type: 'bar',
                            barWidth: '60%',
                            data: [],
                            itemStyle: {
                                normal: {
                                    color: '#F06C7F',
                                    label: {
                                        show: true, // 开启显示
                                        position: 'right',
                                        // position: [2, 2], // 中间显示
                                        textStyle: { // 数值样式
                                            fontsize: 12,
                                            color: '#ccc'
                                        },
                                        formatter: function(value, index) {
                                            if (value.data.value == 0) {
                                                return 0
                                            } else {
                                                return yufp.util.moneyFormatter(value.data.value || '').split('.')[0]
                                            }
                                        }
                                    }
                                }
                            }
                        }]
                    },

                    histogramOptionlevel: {
                        title: {
                            text: '客户等级分布'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'value',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }],
                        yAxis: [{
                            type: 'category'
                        }],
                        series: [{
                            name: 'Direct',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330, 220],
                            itemStyle: {
                                normal: {
                                    color: '#F06C7F'
                                }
                            }
                        }]
                    },
                    histogramoptionorg: {
                        title: {
                            text: '优慧及以上客户机构分布',
                            textStyle: {
                                color: '#333333',
                                fontSize: 14,
                                fontWeight: 600
                            }
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
                            axisLabel: {
                                interval: 0,
                                rotate: 38,
                                fontsize: 12
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#cccccc', // 颜色
                                }
                            },
                        }],
                        yAxis: [{
                            type: 'value',
                            axisLine: { // ---坐标轴 轴线
                                show: false
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
                                    return '<span style="color:#FFFFFF; font-size:12px;font-weight: 400;">' + params.marker + params.name + '&nbsp;&nbsp;' + yufp.util.moneyFormatter(params.data.value).split('.')[0] + '<br/>' + '&nbsp;&nbsp;' + '环比' + '&nbsp;&nbsp;<span style="color:red" class="el-icon-caret-top colorRed">' + yufp.util.returnPercent(params.data.ratio) + '%' + '</span></span>';
                                } else {
                                    return '<span style="color:#FFFFFF; font-size:12px;font-weight: 400;">' + params.marker + params.name + '&nbsp;&nbsp;' + yufp.util.moneyFormatter(params.data.value).split('.')[0] + '<br/>' + '&nbsp;&nbsp;' + '环比' + '&nbsp;&nbsp;<span style="color:#86d256" class="el-icon-caret-bottom color-green">' + yufp.util.returnPercent(params.data.ratio) + '%' + '</span></span>';
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
                                            if (value.data.value == 0) {
                                                return value.data.value
                                            } else {
                                                return yufp.util.moneyFormatter(value.data.value || '').split('.')[0]
                                            }
                                        }
                                    }
                                }
                            },
                            data: []
                        }]
                    },
                    tapshowclass: 'true',
                    tapshowCentain: '当年累计',
                    searchData: '',
                    progressTop: [{
                            percent: 69,
                            title: '人民币基金',
                            tb: '0',
                            money: '0'
                        },
                        {
                            percent: 37,
                            title: 'QDII',
                            tb: '0',
                            money: '0'
                        },
                        {
                            percent: 57,
                            title: '境内结构性产品',
                            tb: '0',
                            money: '0'
                        },
                        {
                            percent: 62,
                            title: '利率、汇率挂钩',
                            tb: '0',
                            money: '0'
                        }
                    ],
                    progressbottom: [{
                            title: 'DGM数',
                            hb: '',
                            money: '',
                            content: '（月末DGM数-上月DGM数）÷上月DGM数×100%'
                        },
                        {
                            title: '团队长/支行长数',
                            hb: '',
                            money: '',
                            content: '（月末团队长/支行长数-上月团队长/支行长数）÷上月团队长/支行长数×100%'
                        },
                        {
                            title: '理财客户经理数',
                            hb: '',
                            money: '',
                            content: '（月末理财客户经理数-上月理财客户经理数）÷上月理财客户经理数×100%'
                        },
                        {
                            title: '个贷客户经理数',
                            hb: '',
                            money: '',
                            content: '（月末个贷客户经理数-上月个贷客户经理数）÷上月个贷客户经理数×100%'
                        }
                    ],
                    cardData: [],
                    updatetimeTop: '',
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
                    restaurants: [],
                    tableEditFormdata: {},
                    connectVisible: false,
                    searchBoxShow: false,
                    loading: false,
                    custResults: [],
                    roleName: '',
                    noticeContents: {
                        banker: {
                            finBalanceRmb: '统计时点当前理财产品持仓金额',
                            aumBalance: '统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金和保险等',
                            depositBalanceRmb: '统计期内客户在我行剩余的定期、活期和信用卡溢缴款等各类存款余额',
                            loanBalance: '包括个人房产按揭贷款、个人消费类贷款、汽车贷款、个人经营类贷款、个人质押贷款、法人房产按揭贷款、循环贷款和其他贷款等将来应归还的金额'
                        },
                        leader: {
                            finBalanceRmb: '统计时点当前理财产品持仓金额',
                            aumBalance: '统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金和保险等',
                            depositBalanceRmb: '统计期内客户在我行剩余的定期、活期和信用卡溢缴款等各类存款余额',
                            loanBalance: '包括个人房产按揭贷款、个人消费类贷款、汽车贷款、个人经营类贷款、个人质押贷款、法人房产按揭贷款、循环贷款和其他贷款等将来应归还的金额'
                        },
                        manager: {
                            finBalanceRmb: '统计时点当前理财产品持仓金额',
                            aumBalance: '统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金和保险等',
                            depositBalanceRmb: '统计期内客户在我行剩余的定期、活期和信用卡溢缴款等各类存款余额',
                            loanBalance: '包括个人房产按揭贷款、个人消费类贷款、汽车贷款、个人经营类贷款、个人质押贷款、法人房产按揭贷款、循环贷款和其他贷款等将来应归还的金额'
                        }
                    },
                    vennData: {
                        loan: 0,
                        both: 0,
                        total: 0,
                        financing: 0,
                        other: 0
                    },
                    tapshowclass: 'true',
                    tapshowCentain: '当年累计',
                    searchData: '',
                    progressTop: [{
                            percent: 69,
                            title: '人民币基金',
                            tb: '0',
                            money: '0'
                        },
                        {
                            percent: 37,
                            title: 'QDII',
                            tb: '0',
                            money: '0'
                        },
                        {
                            percent: 57,
                            title: '境内结构性产品',
                            tb: '0',
                            money: '0'
                        },
                        {
                            percent: 62,
                            title: '利率、汇率挂钩',
                            tb: '0',
                            money: '0'
                        }
                    ],
                    progressbottom: [{
                            title: 'DGM数',
                            hb: '',
                            money: ''
                        },
                        {
                            title: '团队长/支行长数',
                            hb: '',
                            money: ''
                        },
                        {
                            title: '理财客户经理数',
                            hb: '',
                            money: ''
                        },
                        {
                            title: '个贷客户经理数',
                            hb: '',
                            money: ''
                        }
                    ],
                    cardData: [],
                    updatetimeTop: '',
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
                    restaurants: [],
                    tableEditFormdata: {},
                    connectVisible: false,
                    searchBoxShow: false,
                    loading: false,
                    custResults: [],
                    roleName: '',
                    noticeContents: {
                        banker: {
                            finBalanceRmb: '统计时点当前理财产品持仓金额',
                            aumBalance: '统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金和保险等',
                            depositBalanceRmb: '统计期内客户在我行剩余的定期、活期和信用卡溢缴款等各类存款余额',
                            loanBalance: '包括个人房产按揭贷款、个人消费类贷款、汽车贷款、个人经营类贷款、个人质押贷款、法人房产按揭贷款、循环贷款和其他贷款等将来应归还的金额'
                        },
                        leader: {
                            finBalanceRmb: '统计时点当前理财产品持仓金额',
                            aumBalance: '统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金和保险等',
                            depositBalanceRmb: '统计期内客户在我行剩余的定期、活期和信用卡溢缴款等各类存款余额',
                            loanBalance: '包括个人房产按揭贷款、个人消费类贷款、汽车贷款、个人经营类贷款、个人质押贷款、法人房产按揭贷款、循环贷款和其他贷款等将来应归还的金额'
                        },
                        manager: {
                            finBalanceRmb: '统计时点当前理财产品持仓金额',
                            aumBalance: '统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金和保险等',
                            depositBalanceRmb: '统计期内客户在我行剩余的定期、活期和信用卡溢缴款等各类存款余额',
                            loanBalance: '包括个人房产按揭贷款、个人消费类贷款、汽车贷款、个人经营类贷款、个人质押贷款、法人房产按揭贷款、循环贷款和其他贷款等将来应归还的金额'
                        }
                    },
                    vennData: {
                        loan: 0,
                        both: 0,
                        total: 0,
                        financing: 0,
                        other: 0
                    }
                };
            },
            created: function() {
                let _this = this;
                _this.roleName = _this.returnRole();
                _this.getAccesstInfo();
            },

            mounted: function() {
                let t = this;
                t.isIE();
                t.getcustinfo();
                // 客户
                t.custView();
                // 员工
                t.empView();
                t.handleClickyear();

                // 客户查询窗口点击外面关闭
                // document.addEventListener("click", e => {
                //         console.log(e);
                //         var box = document.getElementById("custtable");
                //         if (box != null) {
                //             if (!box.contains(e.target)) {
                //                 t.searchBoxShow = false;
                //             }
                //         }
                //     })
                document.addEventListener('click', function(e) {
                    var box = document.getElementById('custtable');
                    if (box != null) {
                        if (!box.contains(e.target)) {
                            t.searchBoxShow = false;
                        }
                    }
                });
                document.addEventListener('click', function(e) {
                    var noDataidbox = document.getElementById('noDataid');
                    if (noDataidbox != null) {
                        if (!noDataidbox.contains(e.target)) {
                            t.searchBoxShow = false;
                        }
                    }
                });
                // document.addEventListener("click", e => {
                //     var noDataidbox = document.getElementById("noDataid");
                //     if (noDataidbox != null) {
                //         if (!noDataidbox.contains(e.target)) {
                //             t.searchBoxShow = false;
                //         }
                //     }
                // })
            },
            breforeDestroy: function() {},
            methods: {
                sureFn: function() {
                    window.opener = null;
                    window.open('', '_self');
                    window.close();
                },
                // 判断是否为ie浏览器
                isIE: function() { //ie?
                    if (!!window.ActiveXObject || "ActiveXObject" in window) {
                        this.isChormeable = true;
                    } else {
                        this.isChormeable = false;
                    }
                },
                //判断是否为谷歌浏览器
                isChorme: function() {
                    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串      
                    this.isChormeable = !(userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1); //判断Chrome浏览器 
                },
                getcustinfo: function() {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/useraccountinfo/contactDetails',
                        data: {
                            loginCode: yufp.session.user.loginCode
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                if (response.data == null || response.data.userEmail == undefined || response.data.userMobilephone == undefined) {
                                    _this.optionDialogVisible = true;
                                }
                            }
                        }
                    })
                },
                confirmFn: function() {
                    var _this = this;
                    var regphone = /^1[3-9][0-9]\d{8}$/;
                    var regemail = /[A-Za-z0-9_-]+[@](\S*)(net|com|cn|org|cc|tv|[0-9]{1,3})(\S*)/g;
                    if (!_this.optionForm.phonenum) {
                        _this.$refs.refDialogForm.validateField('phonenum', function(ermsg) {
                            idMsg = true;
                        });
                        if (idMsg) {
                            _this.$message({
                                type: 'warning',
                                message: '电话不能为空！'
                            });
                            return;
                        }
                    } else if (_this.optionForm.phonenum && !regphone.test(_this.optionForm.phonenum)) {
                        _this.$message({
                            type: 'warning',
                            message: '电话格式不正确！'
                        });
                        return;
                    }
                    if (!_this.optionForm.email) {
                        _this.$refs.refDialogForm.validateField('email', function(ermsg) {
                            idMsg = true;
                        });
                        if (idMsg) {
                            _this.$message({
                                type: 'warning',
                                message: '邮箱不能为空！'
                            });
                            return;
                        }
                    } else if (_this.optionForm.email && !regemail.test(_this.optionForm.email)) {
                        _this.$message({
                            type: 'warning',
                            message: '邮箱格式不正确'
                        });
                        return;
                    }
                    console.log(_this.optionForm);
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/useraccountinfo/saveDetails',
                        data: {
                            userId: yufp.session.user.loginCode,
                            userMobilephone: _this.optionForm.phonenum,
                            userEmail: _this.optionForm.email
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                console.log(response);
                                _this.optionDialogVisible = false;

                            }
                        }
                    })
                },
                renderHeader1(h, { column }) {
                    return h(
                        'div', [
                            h('span', column.label),
                            h('el-tooltip', {
                                props: { effect: 'light', content: '截止至统计节点，分支行零售条线人均吸纳的管户客户AUM', placement: 'bottom' },
                            }, [
                                h('i', {
                                    class: 'el-icon-warning-outline',
                                    style: 'margin-left:5px;'
                                })
                            ], {
                                content: '截止至统计节点，分支行零售条线人均吸纳的管户客户AUM'
                            })
                        ]
                    );
                },
                renderHeader2(h, { column }) {
                    return h(
                        'div', [
                            h('span', column.label),
                            h('el-tooltip', {
                                props: { effect: 'light', content: '截止至统计节点，零售个贷条线人均保有的持有个贷产品的客户数量', placement: 'bottom' },
                            }, [
                                h('i', {
                                    class: 'el-icon-warning-outline',
                                    style: 'margin-left:5px;'
                                })
                            ], {
                                content: '截止至统计节点，零售个贷条线人均保有的持有个贷产品的客户数量'
                            })
                        ]
                    );
                },
                renderHeader3(h, { column }) {
                    return h(
                        'div', [
                            h('span', column.label),
                            h('el-tooltip', {
                                props: { effect: 'light', content: '截止至统计节点，零售个贷条线人均保有当前持有理财产品的客户数', placement: 'bottom' },
                            }, [
                                h('i', {
                                    class: 'el-icon-warning-outline',
                                    style: 'margin-left:5px;'
                                })
                            ], {
                                content: '截止至统计节点，零售个贷条线人均保有当前持有理财产品的客户数'
                            })
                        ]
                    );
                },
                renderHeader4(h, { column }) {
                    return h(
                        'div', [
                            h('span', column.label),
                            h('el-tooltip', {
                                props: { effect: 'light', content: '截止至统计节点，零售条线人均保有的客户数量，其中客户是指在统计节点持有我行产品或在我行拥有存续账户的客户', placement: 'bottom' },
                            }, [
                                h('i', {
                                    class: 'el-icon-warning-outline',
                                    style: 'margin-left:5px;'
                                })
                            ], {
                                content: '截止至统计节点，零售条线人均保有的客户数量，其中客户是指在统计节点持有我行产品或在我行拥有存续账户的客户'
                            })
                        ]
                    );
                },
                drawVenn: function(_set) {
                    var width = document.querySelector('#venn').parentNode.offsetWidth;
                    var chart = venn.VennDiagram();
                    // var colours = ['#E5E7ED', '#F06C7F', '#508EFA', '#6C5895'];
                    var colours = ['#F06C7F', '#508EFA', '#6C5895'];
                    chart.wrap(false)
                        .width(width)
                        .height(240);

                    var div = d3.select('#venn').datum(_set).call(chart);
                    div.selectAll('text').style('fill', 'white');
                    div.selectAll('.venn-circle path')
                        .style('fill-opacity', 0.8)
                        .style('fill', function(d, i) {
                            return colours[i];
                        });;
                    div.selectAll('.venn-intersection path')
                        .style('fill-opacity', 0.8)
                        .style('fill', function(d, i) {
                            return colours[3];
                        });
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
                searchTenCusts: function() {
                    let _this = this;
                    _this.searchBoxShow = true;
                    _this.loading = true;
                    // _this.searchData.custQueryType = '02';
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/ocrmfcicgbase/customerList',
                        data: {
                            characterCode: _this.searchData,
                            custQueryType: '02'
                        },
                        callback: function(code, message, response) {
                            if (code === 0) {
                                _this.loading = false;
                                _this.custResults = response.data;
                            } else {
                                _this.loading = false;
                            }
                        }
                    });
                },

                // 最上面图表请求
                getAccesstInfo: function() {
                    let _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/headbankinfo/getBusiView',
                        callback: function(code, message, response) {
                            if (code === 0) {
                                let data = response.data;
                                _this.updatetimeTop = response.data[0].dataDate;
                                if (data && data.length) {
                                    _this.cardData = [{
                                        title: 'AUM余额',
                                        countTitlef: 'AUM月均',
                                        countTitles: 'AUM年均',
                                        data: yufp.util.moneyFormatter(data[0].aumBalance || 0).split('.')[0],
                                        tb: data[0].aumBalanceRmbYoy,
                                        hb: data[0].aumBalanceRmbQoq,
                                        tbClass: yufp.util.returnUpOrDownClass(data[0].aumBalanceRmbYoy),
                                        hbClass: yufp.util.returnUpOrDownClass(data[0].aumBalanceRmbQoq),
                                        enddataf: yufp.util.moneyFormatter(data[0].aumMonthAvg || 0).split('.')[0],
                                        enddatas: yufp.util.moneyFormatter(data[0].aumYearAvg || 0).split('.')[0],
                                        // content: _this.roleName ? _this.noticeContents[_this.roleName].aumBalance : '--',
                                        content: _this.noticeContents.banker.aumBalance
                                    }, {
                                        title: '存款余额',
                                        countTitlef: '活期存款余额',
                                        countTitles: '定期存款余额',
                                        data: yufp.util.moneyFormatter(data[0].depositBalanceRmb || 0).split('.')[0],
                                        tb: data[0].depositBalanceRmbYoy,
                                        hb: data[0].depositBalanceRmbQoq,
                                        tbClass: yufp.util.returnUpOrDownClass(data[0].depositBalanceRmbYoy),
                                        hbClass: yufp.util.returnUpOrDownClass(data[0].depositBalanceRmbQoq),
                                        enddataf: yufp.util.moneyFormatter(data[0].demandDepositBalance || 0).split('.')[0],
                                        enddatas: yufp.util.moneyFormatter(data[0].timeDepositBalance || 0).split('.')[0],
                                        // content: _this.roleName ? _this.noticeContents[_this.roleName].depositBalanceRmb : '--'
                                        content: _this.noticeContents.banker.depositBalanceRmb
                                    }, {
                                        title: '理财余额',
                                        countTitlef: '自营理财产品余额',
                                        countTitles: '代销理财余额',
                                        data: yufp.util.moneyFormatter(data[0].finBalanceRmb || 0).split('.')[0],
                                        tb: data[0].finBalanceRmbYoy,
                                        hb: data[0].finBalanceRmbQoq,
                                        tbClass: yufp.util.returnUpOrDownClass(data[0].finBalanceRmbYoy),
                                        hbClass: yufp.util.returnUpOrDownClass(data[0].finBalanceRmbQoq),
                                        enddataf: yufp.util.moneyFormatter(data[0].selfFinBalanceRmb || 0).split('.')[0],
                                        enddatas: yufp.util.moneyFormatter(data[0].agentFinBalanceRmb || 0).split('.')[0],
                                        // content: _this.roleName ? _this.noticeContents[_this.roleName].finBalanceRmb : '--'
                                        content: _this.noticeContents.banker.finBalanceRmb
                                    }, {
                                        title: '贷款余额',
                                        countTitlef: '按揭贷款余额',
                                        countTitles: '车位贷贷款余额',
                                        data: yufp.util.moneyFormatter(data[0].loanBalance || 0).split('.')[0],
                                        tb: data[0].loanBalanceRmbYoy,
                                        hb: data[0].loanBalanceRmbQoq,
                                        tbClass: yufp.util.returnUpOrDownClass(data[0].loanBalanceRmbYoy),
                                        hbClass: yufp.util.returnUpOrDownClass(data[0].loanBalanceRmbQoq),
                                        enddataf: yufp.util.moneyFormatter(data[0].mortgageLoanBalance || 0).split('.')[0],
                                        enddatas: yufp.util.moneyFormatter(data[0].parkingLoanBalance || 0).split('.')[0],
                                        // content: _this.roleName ? _this.noticeContents[_this.roleName].loanBalance : '--'
                                        content: _this.noticeContents.banker.loanBalance
                                    }];
                                }
                            }
                        }
                    });
                },


                // 切换收入看板
                handleClickyear: function(val) {
                    var _this = this;
                    this.tapshowclass = true;
                    if (val) {
                        this.tapshowCentain = val.srcElement.innerText;
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/acrmfcmcustmgrperf/Querylist',
                        callback: function(code, message, response) {
                            if (code === 0) {
                                if (response.data.crmFYyTriumphLookUpList.length != 0) {
                                    // _this.updatetimeTop = response.data.crmFYyTriumphLookUpList[0].dataDate;
                                    var crmFYyTriumphLookUpList = response.data.crmFYyTriumphLookUpList;
                                    for (let i = 0; i < crmFYyTriumphLookUpList.length; i++) {
                                        if (crmFYyTriumphLookUpList[i].triumphId == 'K017') {
                                            _this.progressTop[0].money = yufp.util.moneyFormatter(crmFYyTriumphLookUpList[i].balance || 0).split('.')[0]; // 余额
                                            _this.progressTop[0].tb = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                            _this.progressTop[0].hb = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                        }
                                        if (crmFYyTriumphLookUpList[i].triumphId == 'K018') {
                                            _this.progressTop[1].money = yufp.util.moneyFormatter(crmFYyTriumphLookUpList[i].balance || 0).split('.')[0]; // 余额
                                            _this.progressTop[1].tb = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                            _this.progressTop[1].hb = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                        }
                                        if (crmFYyTriumphLookUpList[i].triumphId == 'K019') {
                                            _this.progressTop[2].money = yufp.util.moneyFormatter(crmFYyTriumphLookUpList[i].balance || 0).split('.')[0]; // 余额
                                            _this.progressTop[2].tb = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                            _this.progressTop[2].hb = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                        }
                                        if (crmFYyTriumphLookUpList[i].triumphId == 'K016') {
                                            _this.progressTop[3].money = yufp.util.moneyFormatter(crmFYyTriumphLookUpList[i].balance || 0).split('.')[0]; // 余额
                                            _this.progressTop[3].tb = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                            _this.progressTop[3].hb = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                        }
                                    }
                                }
                                yufp.util.butLogInfo(hashCode, '管理人员首页', '当年累计');
                            }
                        }
                    });
                },
                handleClickmonth: function(val) {
                    var _this = this;
                    this.tapshowclass = false;
                    if (val) {
                        this.tapshowCentain = val.srcElement.innerText;
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/acrmfcmcustmgrperf/Querymonthdetalist',
                        data: {
                            condition: JSON.stringify({ orgIdAuth: yufp.session.org.id })
                        },
                        callback: function(code, message, response) {
                            if (code === 0) {
                                if (response.data.length != 0) {
                                    // _this.updatetimeTop = response.data[0].dataDate;
                                    var crmFYyTriumphLookUpList = response.data;
                                    for (let i = 0; i < crmFYyTriumphLookUpList.length; i++) {
                                        if (crmFYyTriumphLookUpList[i].triumphId == 'K017') {
                                            _this.progressTop[0].money = yufp.util.moneyFormatter(crmFYyTriumphLookUpList[i].balance || 0).split('.')[0]; // 余额
                                            _this.progressTop[0].tb = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                            _this.progressTop[0].hb = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                        }
                                        if (crmFYyTriumphLookUpList[i].triumphId == 'K018') {
                                            _this.progressTop[1].money = yufp.util.moneyFormatter(crmFYyTriumphLookUpList[i].balance || 0).split('.')[0]; // 余额
                                            _this.progressTop[1].tb = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                            _this.progressTop[1].hb = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                        }
                                        if (crmFYyTriumphLookUpList[i].triumphId == 'K019') {
                                            _this.progressTop[2].money = yufp.util.moneyFormatter(crmFYyTriumphLookUpList[i].balance || 0).split('.')[0]; // 余额
                                            _this.progressTop[2].tb = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                            _this.progressTop[2].hb = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                        }
                                        if (crmFYyTriumphLookUpList[i].triumphId == 'K016') {
                                            _this.progressTop[3].money = yufp.util.moneyFormatter(crmFYyTriumphLookUpList[i].balance || 0).split('.')[0]; // 余额
                                            _this.progressTop[3].tb = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                            _this.progressTop[3].hb = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                        }
                                    }
                                }
                                yufp.util.butLogInfo(hashCode, '管理人员首页', '当月累计');
                            }
                        }
                    });
                },
                // 客户
                custView: function() {
                    var z = this;
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/headbankinfo/getCustView',
                        callback: function(code, message, response) {
                            if (code === 0) {
                                // 客户概览
                                var custType = response.data.custType[0];
                                var custtotal = custType.loanCustNumber + custType.finCustNumber + custType.otherCustNumber;
                                var bothNum = custType.loanCustNumber + custType.finCustNumber;
                                z.vennData = {
                                    loan: yufp.util.moneyFormatter(custType.loanCustNumber || '').split('.')[0],
                                    both: yufp.util.moneyFormatter(custType.loanFinCustNumber || '').split('.')[0], // custType.loanFinCustNumber
                                    total: yufp.util.moneyFormatter(custtotal || '').split('.')[0],
                                    financing: yufp.util.moneyFormatter(custType.finCustNumber || '').split('.')[0],
                                    other: yufp.util.moneyFormatter(custType.otherCustNumber || '').split('.')[0]
                                };
                                var _set = [
                                    // { sets: ['其他'], size: custtotal },
                                    { sets: ['个贷'], size: custType.loanCustNumber },
                                    { sets: ['理财'], size: custType.finCustNumber },
                                    // { sets: ['其他', '个贷'], size: custType.loanCustNumber, label: '' },
                                    // { sets: ['其他', '理财'], size: custType.finCustNumber, label: '' },
                                    { sets: ['个贷', '理财'], size: custType.loanFinCustNumber, label: '' }
                                    //   { sets: ['其他', '理财', '理财'], size: custtotal - custType.loanFinCustNumber, label: '' }
                                ];
                                z.drawVenn(_set);
                                // 客户等级
                                var custGrade = response.data.custGrade[0];
                                var custGradedata = [
                                    { value: 0, ratio: 0 },
                                    { value: 0, ratio: 0 },
                                    { value: 0, ratio: 0 },
                                    { value: 0, ratio: 0 },
                                    // { value: 0, ratio: 0 },
                                    // { value: 0, ratio: 0 }
                                ];
                                custGradedata[0].value = custGrade.custGrade_3Number;
                                custGradedata[0].ratio = custGrade.custGrade_3NumberQoq;
                                custGradedata[1].value = custGrade.custGrade_4Number;
                                custGradedata[1].ratio = custGrade.custGrade_4NumberQoq;
                                custGradedata[2].value = custGrade.custGrade_5Number;
                                custGradedata[2].ratio = custGrade.custGrade_5NumberQoq;
                                custGradedata[3].value = custGrade.custGrade_6Number;
                                custGradedata[3].ratio = custGrade.custGrade_6NumberQoq;
                                // custGradedata[4].value = custGrade.custGrade_5Number;
                                // custGradedata[4].ratio = custGrade.custGrade_5NumberQoq;
                                // custGradedata[5].value = custGrade.custGrade_6Number;
                                // custGradedata[5].ratio = custGrade.custGrade_6NumberQoq;
                                var allNum = custGrade.custGrade_3Number + custGrade.custGrade_4Number + custGrade.custGrade_5Number + custGrade.custGrade_6Number;
                                z.histogramOption.series[0].data = custGradedata;
                                z.histogramOption.title[1].text = '优慧及以上客户：' + yufp.util.moneyFormatter(allNum || '').split('.')[0];

                                // 客户机构
                                var custOrg = response.data.custOrg;
                                var custorgxaxis = [];
                                var custOrgseries = [];
                                custOrg.sort(function(a, b) {
                                    return b.custNumber - a.custNumber;
                                });
                                for (let i = 0; i < custOrg.length; i++) {
                                    var custOrgobject = { value: 0, ratio: 0 };
                                    custorgxaxis.push(custOrg[i].orgName);
                                    custOrgobject.value = custOrg[i].custNumber;
                                    custOrgobject.ratio = custOrg[i].custNumberQoq;
                                    custOrgseries.push(custOrgobject);
                                }
                                z.histogramoptionorg.xAxis[0].data = custorgxaxis;
                                z.histogramoptionorg.series[0].data = custOrgseries;
                            }
                        }
                    });
                },
                // 员工概览
                empView: function() {
                    var x = this;
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/headbankinfo/getEmpView',
                        callback: function(code, message, response) {
                            if (code === 0) {
                                // 卡片
                                var empcardInfo = response.data.cardInfo[0];
                                x.progressbottom[0].hb = empcardInfo.dgmNumberQoq || 0;
                                x.progressbottom[0].money = yufp.util.moneyFormatter(empcardInfo.dgmNumber || 0).split('.')[0];
                                x.progressbottom[1].hb = empcardInfo.teamAndSubbranchNumberQoq || 0;
                                x.progressbottom[1].money = yufp.util.moneyFormatter(empcardInfo.teamAndSubbranchNumber || 0).split('.')[0];
                                x.progressbottom[2].hb = empcardInfo.finCustManagerNumberQoq || 0;
                                x.progressbottom[2].money = yufp.util.moneyFormatter(empcardInfo.finCustManagerNumber || 0).split('.')[0];
                                x.progressbottom[3].hb = empcardInfo.loanCustManagerNumberQoq || 0;
                                x.progressbottom[3].money = yufp.util.moneyFormatter(empcardInfo.loanCustManagerNumber || 0).split('.')[0];

                                // 表格
                                var emptableInfo = response.data.tableInfo[0];
                                x.cumtableData[0].aum = emptableInfo.avgAumBalance || 0;
                                x.cumtableData[0].avgLoan = emptableInfo.avgLoanCustNumber || 0;
                                x.cumtableData[0].avgFin = emptableInfo.avgFinCustNumber || 0;
                                x.cumtableData[0].avgCust = emptableInfo.avgCustNumber || 0;
                                x.cumtableData[1].aum = emptableInfo.avgAumBalanceYoy || 0;
                                x.cumtableData[1].avgLoan = emptableInfo.avgLoanCustNumberYoy || 0;
                                x.cumtableData[1].avgFin = emptableInfo.avgFinCustNumberYoy || 0;
                                x.cumtableData[1].avgCust = emptableInfo.avgCustNumberYoy || 0;
                                x.cumtableData[2].aum = emptableInfo.avgAumBalanceQoq || 0;
                                x.cumtableData[2].avgLoan = emptableInfo.avgLoanCustNumberQoq || 0;
                                x.cumtableData[2].avgFin = emptableInfo.avgFinCustNumberQoq || 0;
                                x.cumtableData[2].avgCust = emptableInfo.avgCustNumberQoq || 0;
                            }
                        }
                    });
                },
                // 查看更多
                lookmoreFn: function() {
                    if (this.tapshowCentain == '当年累计') {
                        yufp.util.butLogInfo(hashCode, '管理人员首页', '当年累计查看更多');
                        var menu_tab = JSON.parse(yufp.sessionStorage.get('YUFP-SESSION-MENUS-OG')).filter(function(menu) {
                            return menu.menuName === '业绩查看';
                        })[0];
                        // var custType = row.custType;
                        yufp.frame.addTab({
                            id: menu_tab.funcId,
                            key: menu_tab.menuId,
                            title: '业绩查看' // 页签名称
                        });
                    }
                    if (this.tapshowCentain == '当月累计') {
                        yufp.util.butLogInfo(hashCode, '管理人员首页', '当月累计查看更多');
                        this.$message('暂不支持跳转业绩月度统计详情看板', '提示');
                    }
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