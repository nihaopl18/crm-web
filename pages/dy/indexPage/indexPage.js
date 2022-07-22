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
    './pages/dy/indexPage/weekCalendar.js'
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
                    menu: JSON.parse(yufp.sessionStorage.get('YUFP-SESSION-MENUS-OG')),
                    optionDialogVisible: false,
                    optionForm: {},
                    searchData: '',
                    progressTop: [{
                            percent: 0,
                            title: '存款日均余额',
                            tb: '-',
                            hb: '-',
                            money: '0',
                            content: '个人存款日均余额=Σ（统计期间内每日存款余额）/统计期间天数；统计时间范围为当年'
                        },
                        {
                            percent: 0,
                            title: '合格优慧及以上客户数',
                            tb: '-',
                            hb: '-',
                            money: '0',
                            content: '即优慧客户数量、显著客户数量、显卓钻石客户数量和私行客户数量之和'
                        }
                    ],
                    progressBottom: [{
                            percent: 0,
                            title: '贷款放款量',
                            tb: '-',
                            hb: '-',
                            money: '0',
                            content: '统计期间内零售贷款放款量金额；统计时间范围为当年'
                        },
                        {
                            percent: 0,
                            title: '贷款放款笔数',
                            tb: '-',
                            hb: '-',
                            money: '0',
                            content: '统计期间内零售贷款放款笔数；统计时间范围为当年'
                        }
                    ],
                    cardData: [{
                            title: '客户数量',
                            data: null,
                            tb: '-',
                            hb: '-',
                            content: '特指管理的或下辖的客户总数'
                        },
                        {
                            title: 'AUM余额',
                            data: null,
                            tb: '-',
                            hb: '-',
                            content: '统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金和保险等（贷款、信用卡、网贷等不算入AUM)'
                        },
                        {
                            title: '存款余额',
                            data: null,
                            tb: null,
                            hb: '-',
                            content: '统计期内客户在我行剩余的定期、活期和信用卡溢缴款等各类存款余额'
                        },
                        {
                            title: '贷款余额',
                            data: null,
                            tb: '-',
                            hb: '-',
                            content: '包括个人房产按揭贷款、个人消费类贷款、汽车贷款、个人经营类贷款、个人质押贷款、法人房产按揭贷款、循环贷款和其他贷款等将来应归还的金额'
                        }
                    ],
                    tableData: [],
                    restaurants: [],
                    tableEditFormdata: {},
                    connectVisible: false,
                    timeOptions: yufp.lookup.find('RUN_FREQ').reverse(), // 年、月、季
                    selectKey: '3', // 选中的key 3:月 2：季 1：年,
                    noticeTypes: [], // 提醒类型
                    noticeStatus: yufp.lookup.find('DY0007', false),
                    searchBoxShow: false,
                    isShow: false,
                    loading: false,
                    custResults: [],
                    roleName: '',
                    noticeContents: {
                        banker: {
                            custNumber: '特指管理的或下辖的客户总数',
                            aumBalance: '统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金和保险等（贷款、信用卡、网贷等不算入AUM)',
                            depositBalanceRmb: '统计期内客户在我行剩余的定期、活期和信用卡溢缴款等各类存款余额',
                            loanBalance: '包括个人房产按揭贷款、个人消费类贷款、汽车贷款、个人经营类贷款、个人质押贷款、法人房产按揭贷款、循环贷款和其他贷款等将来应归还的金额'
                        },
                        leader: {
                            custNumber: '特指管理的或下辖的客户总数',
                            aumBalance: '统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金和保险等（贷款、信用卡、网贷等不算入AUM)',
                            depositBalanceRmb: '统计期内客户在我行剩余的定期、活期和信用卡溢缴款等各类存款余额',
                            loanBalance: '包括个人房产按揭贷款、个人消费类贷款、汽车贷款、个人经营类贷款、个人质押贷款、法人房产按揭贷款、循环贷款和其他贷款等将来应归还的金额'
                        },
                        manager: {
                            custNumber: '特指管理的或下辖的客户总数',
                            aumBalance: '统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金和保险等（贷款、信用卡、网贷等不算入AUM)',
                            depositBalanceRmb: '统计期内客户在我行剩余的定期、活期和信用卡溢缴款等各类存款余额',
                            loanBalance: '包括个人房产按揭贷款、个人消费类贷款、汽车贷款、个人经营类贷款、个人质押贷款、法人房产按揭贷款、循环贷款和其他贷款等将来应归还的金额'
                        }
                    }
                };
            },
            created: function() {
                let _this = this;
                _this.roleName = _this.returnRole();
                _this.getAccesstInfo();
                yufp.service.request({
                    method: 'GET',
                    url: '/api/adminsmlookupitem/weblist',
                    data: {
                        lookupCodes: 'DY0007'
                    },
                    callback: function(code, message, response) {
                        if (code == 0) {
                            var type1 = response.data.DY0007;
                            for (var i = 0; i < type1.length; i++) {
                                _this.$set(_this.noticeStatus, type1[i].key, type1[i].value);
                            }
                            _this.getNotices();
                        }
                    }
                });
                // this.getNotices();
            },

            mounted: function() {
                let t = this;
                t.isIE();

                t.getcustinfo();
                t.inputView();
                document.onkeydown = function(e) {
                    if (window.event == undefined) {
                        var key = e.keyCode;
                    } else {
                        var key = window.event.keyCode;
                    }
                    // enter的ASCII码是13
                    if (key == 13) {
                        t.querySearchAsync();
                    }
                };
                document.getElementById('btn').onclick = function(event) {
                    console.log('btn');
                    t.isShow = true;
                    if (t.searchData) {
                        t.querySearchAsync();
                    }
                };

                document.querySelector('.custSearchindexpage').onmousemove = function() {
                    t.isShow = true;
                };
                document.querySelector('.custSearchindexpage').onmouseout = function() {
                    t.isShow = false;
                };
                if (document.querySelector('#custInput .el-input__inner')) {
                    document.querySelector('#custInput .el-input__inner').onfocus = function(event) {
                        t.isShow = true;
                        t.searchTenCusts();
                    };
                    document.querySelector('#custInput .el-input__inner').onblur = function(event) {
                        if (t.isShow) {
                            return;
                        }
                        t.searchBoxShow = false;
                        t.loading = false;
                    };
                }
                document.addEventListener("click", function(e) {
                    var box = document.getElementById("custResultBoxid");
                    if (box != null) {
                        if (!box.contains(e.target)) {
                            t.searchBoxShow = false;

                        }
                    }
                })
            },
            breforeDestroy: function() {
                this.handleInputBlur();
            },
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
                custSort: function(a, b) {
                    var data1 = a.amt != '-' ? parseFloat(a.amt) : 0;
                    var data2 = b.amt != '-' ? parseFloat(b.amt) : 0;
                    return data1 - data2;
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
                    if (this.searchData) {
                        this.querySearchAsync();
                    } else {
                        let _this = this;
                        _this.searchBoxShow = true;
                        _this.loading = true;
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/governedcust/custQueryList',
                            callback: function(code, message, response) {
                                if (code === 0) {
                                    _this.loading = false;
                                    _this.custResults = response.data;
                                } else {
                                    _this.loading = false;
                                }
                            }
                        });
                    }
                },
                // 查询客户
                querySearchAsync: function() {
                    let data = {};
                    let isnumeral;
                    let value = this.searchData + ''.replace('/(^\s*)|(\s*$)', ''); // 去除字符串前后空格
                    let num = Number(value); // 将字符串转换为数字
                    if (isNaN(num)) { // 判断是否是非数字
                        isnumeral = false;
                    } else if (value === '' || value === null) { // 空字符串和null都会被当做数字
                        isnumeral = false;
                    } else {
                        isnumeral = true;
                    };
                    if (isnumeral === true) {
                        data = {
                            figureCode: this.searchData,
                            custType: '1',
                            orgCode: '500',
                            busiType: '6',
                            orgIdAuth: '500',
                            userId: yufp.session.userId
                        };
                    } else {
                        data = {
                            characterCode: this.searchData,
                            custType: '1',
                            orgCode: '500',
                            busiType: '6',
                            orgIdAuth: '500',
                            userId: yufp.session.userId
                        };
                    }
                    this.searchData && this.searchCust(data);
                },

                // searchCust: function(searchData) {
                //     let _this = this;
                //     _this.searchBoxShow = true;
                //     _this.loading = true;
                //     yufp.service.request({
                //         method: 'GET',
                //         url: backend.custpubService + '/api/governedcust/listper',
                //         data: {
                //             condition: JSON.stringify(searchData),
                //             page: 1,
                //             size: 10
                //         },
                //         callback: function(code, message, response) {
                //             if (code === 0) {
                //                 _this.loading = false;
                //                 _this.custResults = response.data;
                //             } else {
                //                 _this.loading = false;
                //             }
                //         }
                //     });
                // },
                searchCust: function(searchData) {
                    let _this = this;
                    let param = {
                        custQueryType: '02',
                        figureCode: '',
                        characterCode: '',
                        page: 1,
                        size: 10
                    };
                    if (searchData.figureCode) {
                        param.figureCode = searchData.figureCode;
                    }
                    if (searchData.characterCode) {
                        param.characterCode = searchData.characterCode;
                    }

                    _this.searchBoxShow = true;
                    _this.loading = true;
                    yufp.service.request({
                        method: 'GET',
                        // url: backend.custpubService + '/api/governedcust/listper',
                        // data: {
                        //     condition: JSON.stringify(searchData),
                        //     page: 1,
                        //     size: 10
                        // },
                        url: '/api/ocrmfcicgbase/customerList',
                        data: param,
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

                // 选择客户
                handleCustomerSelect: function(item) {
                    this.toCustomer360View(item);
                    this.searchBoxShow = false;
                },
                // 输入框失去焦点时客户选择框消失
                handleInputBlur: function() {
                    this.loading = false;
                    this.searchBoxShow = false;
                },

                // 选择查询的时间：年、季、月
                handleTimeSelect: function(key) {
                    this.selectKey = key;
                },


                // 获取资产信息
                getAccesstInfo: function() {
                    let _this = this;
                    let condition = JSON.stringify({
                        userId: yufp.session.userId,
                        code: yufp.session.userCode, // 角色编码
                        orgCode: yufp.session.org.code // 角色所在机构编码
                    });
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/acrmabrbusisum/property',
                        data: {
                            condition: condition
                        },
                        callback: function(code, message, response) {
                            if (code === 0) {
                                let data = response.data;
                                if (data && data.length) {
                                    _this.cardData = [{
                                        title: '客户数量',
                                        data: yufp.util.moneyFormatter(data[0].custNumber || 0).split('.')[0],
                                        tb: data[0].custNumberYoy,
                                        hb: data[0].custNumberQoq,
                                        // tbClass: yufp.util.returnUpOrDownClass(data[0].custNumberYoy),
                                        // hbClass: yufp.util.returnUpOrDownClass(data[0].custNumberQoq),
                                        // content: _this.roleName ? _this.noticeContents[_this.roleName].custNumber : '--'
                                        content: '特指管理的或下辖的客户总数'
                                    }, {
                                        title: 'AUM余额',
                                        data: yufp.util.moneyFormatter(data[0].aumBalance || 0),
                                        tb: data[0].aumBalanceRmbYoy,
                                        hb: data[0].aumBalanceRmbQoq,
                                        // tbClass: yufp.util.returnUpOrDownClass(data[0].aumBalanceRmbYoy),
                                        // hbClass: yufp.util.returnUpOrDownClass(data[0].aumBalanceRmbQoq),
                                        // content: _this.roleName ? _this.noticeContents[_this.roleName].aumBalance : '--'
                                        content: '统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金和保险等（贷款、信用卡、网贷等不算入AUM)'
                                    }, {
                                        title: '存款余额',
                                        data: yufp.util.moneyFormatter(data[0].depositBalanceRmb || 0),
                                        tb: data[0].depositBalanceRmbYoy,
                                        hb: data[0].depositBalanceRmbQoq,
                                        // tbClass: yufp.util.returnUpOrDownClass(data[0].depositBalanceRmbYoy),
                                        // hbClass: yufp.util.returnUpOrDownClass(data[0].depositBalanceRmbQoq),
                                        // content: _this.roleName ? _this.noticeContents[_this.roleName].depositBalanceRmb : '--'
                                        content: '统计期内客户在我行剩余的定期、活期和信用卡溢缴款等各类存款余额'
                                    }, {
                                        title: '贷款余额',
                                        data: yufp.util.moneyFormatter(data[0].loanBalance || 0),
                                        tb: data[0].loanBalanceRmbYoy,
                                        hb: data[0].loanBalanceRmbQoq,
                                        // tbClass: yufp.util.returnUpOrDownClass(data[0].loanBalanceRmbYoy),
                                        // hbClass: yufp.util.returnUpOrDownClass(data[0].loanBalanceRmbQoq),
                                        // content: _this.roleName ? _this.noticeContents[_this.roleName].loanBalance : '--'
                                        content: '包括个人房产按揭贷款、个人消费类贷款、汽车贷款、个人经营类贷款、个人质押贷款、法人房产按揭贷款、循环贷款和其他贷款等将来应归还的金额'
                                    }];
                                }
                            }
                        }
                    });
                },

                // 获取异动提醒
                getNotices: function() {
                    let _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/inforeminder/querylist',
                        data: {
                            condition: JSON.stringify({
                                receUser: yufp.session.userId,
                                isIndexPage: 'isIndexPage'
                                    // reminderDate: moment(new Date()).format('YYYY-MM-DD')
                            }),
                            page: 1,
                            size: 4
                        },
                        callback: function(code, message, response) {
                            if (code === 0) {
                                let data = response.data;
                                if (data && data.length) {
                                    for (let i = 0; i < data.length; i++) {

                                    }
                                    // data.map(item => {
                                    //   item.dataDate = item.dataDate.split('T')[0];
                                    // });
                                    _this.tableData = data;
                                }
                            }
                        }
                    });
                },

                // 去某个客户360视图
                toCustomer360View: function(data) {
                    var _this = this;
                    yufp.util.valid2jump(data.custId, function(val) {
                        if (val) {
                            var customKey = 'custom_view' + data.custId; // 请以custom_view前缀开头，并且全局唯一
                            // var custType = row.custType;
                            yufp.frame.addTab({
                                // id: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 菜单功能ID（路由ID）
                                id: 'customer360View', // 菜单功能ID（路由ID）
                                key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                                title: '客户360视图:' + data.custName, // 页签名称
                                data: {
                                    // id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
                                    cust: data,
                                    custId: data.custId,
                                    custName: data.custName
                                } // 传递的业务数据，可选配置
                            });
                        } else {
                            _this.$message.warning('该客户不能查看客户360视图');
                        }
                    });
                },
                // 查看更多
                lookmoreFn: function() {
                    var menu_tab = this.menu.filter(function(menu) {
                        return menu.menuName === '业绩查看';
                    })[0];
                    // var custType = row.custType;
                    yufp.frame.addTab({
                        id: menu_tab.funcId,
                        key: menu_tab.menuId,
                        title: '业绩查看' // 页签名称
                    });
                },

                // 跳转到异动提醒
                clickMessage: function(value) {
                    var menu_tab = this.menu.filter(function(menu) {
                        return menu.menuName === '异动提醒';
                    })[0];
                    yufp.frame.addTab({
                        id: menu_tab.funcId,
                        key: menu_tab.menuId,
                        title: '异动提醒', // 页签名称
                        data: {
                            dataInfo: value
                        } // 传递的业务数据，可选配置
                    });
                },

                // 当操作打开时暂存当前行数据
                handleOptionVisibleChange: function(data) {
                    if (data) {
                        yufp.clone(data, this.tableEditFormdata);
                    }
                },

                // table 选项操作点击
                handleOptionSelect: function(command) {
                    switch (command) {
                        case 'messageSend':
                            this.connectCustomer();
                            break;
                        case 'noTrack':
                            this.changeCustomerState();
                            break;
                        case 'alreadyDeal':
                            this.changeCustomerState();
                            break;
                    }
                },
                // 联系客户
                connectCustomer: function() {
                    this.connectVisible = true;
                },

                handleConnectClose: function() {
                    this.connectVisible = false;
                },

                sendMessage: function() {},

                changeCustomerState: function(data, val) {
                    let _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/inforeminder/updateStat',
                        data: {
                            infoId: data.infoId,
                            operation: val
                        },
                        callback: function(code, message, response) {
                            if (code === 0) {
                                _this.getNotices();
                                _this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                yufp.util.butLogInfo(hashCode, '首页异动提醒', '已处理');
                            }
                        }
                    });
                },
                formJE: function(row, column, cellValue) {
                    cellValue = yufp.util.dateFormat(cellValue, '{m}-{d} {h}:{i}');
                    return cellValue;
                },
                // 收入看板
                inputView: function(val) {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/acrmfcmcustmgrperf/Querylist',
                        callback: function(code, message, response) {
                            if (code === 0) {
                                if (response.data.crmFYyTriumphLookUpList.length != 0) {
                                    _this.updatetimeTop = response.data.crmFYyTriumphLookUpList[0].dataDate;
                                    var crmFYyTriumphLookUpList = response.data.crmFYyTriumphLookUpList;
                                    for (let i = 0; i < crmFYyTriumphLookUpList.length; i++) {
                                        if (crmFYyTriumphLookUpList[i].triumphId == 'K008') {
                                            _this.progressTop[0].percent = parseInt(crmFYyTriumphLookUpList[i].completionRate ? crmFYyTriumphLookUpList[i].completionRate : 0);
                                            _this.progressTop[0].money = yufp.util.moneyFormatter(crmFYyTriumphLookUpList[i].balance || 0).split('.')[0]; // 余额
                                            _this.progressTop[0].tb = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                            _this.progressTop[0].hb = crmFYyTriumphLookUpList[i].ringRatio; // 环比

                                        }
                                        if (crmFYyTriumphLookUpList[i].triumphId == 'K003') {
                                            _this.progressTop[1].percent = parseInt(crmFYyTriumphLookUpList[i].completionRate ? crmFYyTriumphLookUpList[i].completionRate : 0);
                                            _this.progressTop[1].money = yufp.util.moneyFormatter(crmFYyTriumphLookUpList[i].balance || 0).split('.')[0]; // 余额
                                            _this.progressTop[1].tb = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                            _this.progressTop[1].hb = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                        }
                                        if (crmFYyTriumphLookUpList[i].triumphId == 'K005') {
                                            _this.progressBottom[0].percent = parseInt(crmFYyTriumphLookUpList[i].completionRate ? crmFYyTriumphLookUpList[i].completionRate : 0);
                                            _this.progressBottom[0].money = yufp.util.moneyFormatter(crmFYyTriumphLookUpList[i].balance || 0).split('.')[0]; // 余额
                                            _this.progressBottom[0].tb = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                            _this.progressBottom[0].hb = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                        }
                                        if (crmFYyTriumphLookUpList[i].triumphId == 'K011') {
                                            _this.progressBottom[1].percent = parseInt(crmFYyTriumphLookUpList[i].completionRate ? crmFYyTriumphLookUpList[i].completionRate : 0);
                                            _this.progressBottom[1].money = yufp.util.moneyFormatter(crmFYyTriumphLookUpList[i].balance || 0).split('.')[0]; // 余额
                                            _this.progressBottom[1].tb = crmFYyTriumphLookUpList[i].yearOnYear; // 同比
                                            _this.progressBottom[1].hb = crmFYyTriumphLookUpList[i].ringRatio; // 环比
                                        }

                                    }


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