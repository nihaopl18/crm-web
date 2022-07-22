/**
 * @author mabintao
 * @since 2022/02/18
 * @description 
 */
/** 引入相关JS文件 */
define([
    './pages/dy/performance/performanceanalysis/performanceMgrSelector.js'
], function (require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('PROPERTY_MORTGAGE_STATUS,CD0376,YES_NO,CD0017,HEALTH_STATE,MAJOR,CD0255,CUST_GRADE');
        var vm = yufp.custom.vue({
            el: '#infoTable2',
            data: function () {
                var _this = this;
                return {
                    loading2: false,
                    lacationSave: '',
                    locationRm: '',
                    noMethod: '',
                    pageData: {
                        total: 0,
                        page: 1,
                        size: 10,
                        layout: 'total, sizes, prev, pager, next, jumper',
                        pageKey: 'page',
                        sizeKey: 'size'
                    },
                    repeatTrigger: false,
                    tableData: [],
                    start: '',
                    end: '',
                    fourOrOne: '1',
                    queryParams: {
                        aumBalanceStart: '',
                        aumBalanceEnd: '',
                        custGrade: '',
                        isPeople: '',
                        mktRespPerson: ''
                    },
                    roleParam: '',
                    selectRows: [],
                    orgIdAuth: '',
                    ORIGION_LIST: [],
                    branchArr: ['R004', 'R005', 'R013', 'R014', 'R015', 'R016', 'R017', 'R018', 'R019'],//分行权限
                    totalRowArr: ['R006', 'R007', 'R008', 'R009', 'R010', 'R011', 'R012', 'R001', 'R020', 'R021', 'R022'], // 总行权限
                    baseParams: {
                        orgIdAuth: _this.orgIdAuth,
                        custQueryType: '02'
                    },
                    rule: {
                        required: 'required'
                    },
                    isHeadOffice: false, // 总行权限
                    isBranch: false, // 分行支行权限
                    isManage: false, // 客户经理权限
                    exportObj: {},
                    showCust: false,
                    roleFlag: '',
                    mktRespPerson: '',
                    backMktResp: '',
                    backAumS: '',
                    backAumE: ''
                };
            },
            created: function () {
                var _this = this;
                _this.getOrgIdAuth();
                _this.getRole();
            },
            mounted: function () {
                var em = this;
                em.ORIGION_LIST = yufp.lookup.find('ORIGION_LIST');
            },
            methods: {
                mgrsizeChangeFn: function (size) {
                    var _this = this;
                    _this.pageData.size = size;
                    if (_this.repeatTrigger) {
                        _this.repeatTrigger = false;
                    } else {
                        if (_this.pageData.page !== 1) {
                            _this.pageData.page = 1;
                            _this.repeatTrigger = true;
                        }
                        if (_this.noMethod == 'no') return;
                        _this.searchFn()
                    }
                },
                mgrpageChangeFn: function (val) {
                    var _this = this;
                    _this.pageData.page = val;
                    if (_this.repeatTrigger) {
                        _this.repeatTrigger = false;
                    }
                    if (_this.noMethod == 'no') return;
                    _this.searchFn()
                },
                custGrage: function (param) {
                    let _this = this;
                    _this.queryParams.custGrade = param && param.length != 0 ? param : ''
                },
                mktRespPersonFn: function (param) {
                    let _this = this;
                    _this.mktZhCn = param[0].userName;
                    _this.backMktResp = param[0].userId;
                    if (param[0].userId != undefined) {
                        _this.queryParams.mktRespPerson = param[0].loginCode;
                        _this.custUserId = param[0].loginCode;
                    } else {
                        _this.mktZhCn = param[0].selectOrgname;
                        _this.backMktResp = param[0].selectOrgid;
                        _this.queryParams.mktRespPerson = param[0].selectOrgid;
                    }
                },
                changePeople: function (value) {
                    let _this = this;
                    _this.queryParams.isPeople = value;
                },
                getRole: function (param) {
                    var _this = this;
                    var roles = yufp.session.roles;
                    var selectRole = yufp.sessionStorage.get('selectRole');
                    for (var i = 0; i < roles.length; i++) {
                        if (roles[i].id === selectRole) {
                            var role = roles[i].code;
                            if (param) {
                                if (_this.branchArr.indexOf(role) != -1) {
                                    _this.roleFlag = ''
                                }
                            } else {
                                if (_this.totalRowArr.indexOf(role) != -1) { // 总行权限
                                    _this.isHeadOffice = true;
                                    _this.isBranch = false;
                                    _this.isManage = false;
                                } else if (_this.branchArr.indexOf(role) != -1) { // 分行支行权限
                                    _this.isBranch = true;
                                    _this.isHeadOffice = false;
                                    _this.isManage = false;
                                    _this.roleParam = 'A';
                                } else if ('R002,R003'.indexOf(role) != -1) { // 客户经理权限
                                    _this.isManage = true;
                                    _this.isHeadOffice = false;
                                    _this.isBranch = false;
                                    _this.roleParam = 'A';
                                }
                            }
                        }
                    }
                },
                selectCustParams: { // 客户 放大镜 参数
                    params: { tabCheckbox: false }, // 设置用户管理组件是否可以复选
                },
                getOrgIdAuth: function () {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: backend.custpubService + '/api/governedcust/getbusitype',
                        data: {
                            condition: JSON.stringify({ userId: yufp.session.userId })
                        },
                        callback: function (code, message, response) {
                            if (code == 0 && response.code === 0) {
                                if (response.data) {
                                    _this.orgIdAuth = response.data.orgIdAuth;
                                }
                            } else {
                                _this.$message.error('查询失败');
                            }
                        }
                    });
                },
                searchFn: function (param) {
                    var _this = this;
                    if (param == 'queryParams') {
                        _this.clearParamFn('yes')
                    }
                    _this.$refs.queryParams.validate(function (valid) {
                        var obj = {};
                        let validB = _this.$refs.quarterRef.getInputValue()
                        let custString = _this.queryParams.custGrade
                        let orgIdString = _this.queryParams.orgIdAuth
                        if (validB && valid) {
                            _this.loading2 = true;
                            let timer = _this.$refs.quarterRef.getParamsTime()
                            _this.queryParams.dataDate = timer
                            yufp.extend(obj, _this.queryParams);
                            if (custString != '' && custString != undefined && custString != []) {
                                obj.custGrade = custString && custString.join();
                            }
                            if (orgIdString != '' && orgIdString != undefined) {
                                obj.orgIdAuth = orgIdString || '';
                            }
                            if (!_this.roleFlag && !_this.roleParam) {
                                delete obj.roleFlag
                                delete obj.mktRespPerson
                                delete obj.aumBalanceStart
                                delete obj.aumBalanceEnd
                                delete obj.custGrade
                            }
                            // 需要缓存查询的参数
                            _this.exportObj = obj;
                            yufp.service.request({
                                method: 'GET',
                                data: {
                                    page: _this.pageData.page,
                                    size: _this.pageData.size,
                                    condition: JSON.stringify(obj)
                                },
                                url: '/api/branchSalesResource/queryBranch',
                                callback: function (code, message, response) {
                                    if (code == 0 && response.data) {
                                        _this.pageData.total = response.total;
                                        _this.tableData = response.data;
                                        _this.loading2 = false;
                                    }
                                }
                            })
                        }
                    });
                    _this.$nextTick(function () {
                        _this.$refs.multipleTable.doLayout();
                    });
                },
                resetFormFn: function (formName) {
                    var _this = this;
                    _this.queryParams.aumBalanceStart = '';
                    _this.queryParams.aumBalanceEnd = '';
                    _this.queryParams.mktRespPerson = '';
                    _this.clearParamFn('yes')
                    _this.$refs[formName].resetFields();
                    _this.$refs.quarterRef.resetFn();
                    _this.$nextTick(function () {
                        if (formName == 'queryParams') {
                            _this.queryParams.custGrade = '';
                            _this.queryParams.dataDate = '';
                            _this.queryParams.isPeople = '';
                            _this.mktRespPerson = '';
                            _this.queryParams.targetId = '';
                        }
                    })
                },
                selectChange: function (selection) {
                    this.selectRows = selection;
                },
                exportFn: function () {
                    var em = this;
                    var exportIds = [];
                    for (let i = 0; i < em.selectRows.length; i++) {
                        if (em.isBranch && em.selectRows[i].userId) {
                            exportIds.push(em.selectRows[i].userId)
                        } else if (em.isManage && em.selectRows[i].ecifCustNo) {
                            exportIds.push(em.selectRows[i].ecifCustNo)
                        }
                    }
                    if (em.isBranch || em.isManage) {
                        em.exportObj.exportIds = exportIds && exportIds.join();
                    }
                    em.exportObj.selectRole = yufp.sessionStorage.get('selectRole');
                    em.exportObj.roleFlag = em.roleFlag;
                    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                    if (em.roleFlag == 'branchLevel') {
                        if (reg.test(em.mktRespPerson)) {
                            em.exportObj.mktRespPerson = em.backMktResp;
                        }
                    } else if (em.roleFlag == 'custLevel') {
                        if (reg.test(em.mktRespPerson)) {
                            em.exportObj.mktRespPerson = em.custUserId;
                        }
                    }
                    if ((exportIds && exportIds.length != 0 && exportIds.length < 50001) || em.roleFlag == '' || em.pageData.total < 50001) {
                        var url = '/api/branchSalesResource/export?' + 'condition=' + encodeURI(JSON.stringify(em.exportObj));
                        yufp.util.download(url);
                        yufp.util.butLogInfo(hashCode, '分行统计', '导出');
                    } else {
                        em.$message({
                            showClose: true,
                            message: '当前数据条数超过50000, 暂不支持导出',
                            type: 'warning'
                        });
                    }
                },
                clearParamFn: function (param) {
                    let _this = this;
                    _this.noMethod = param
                    _this.pageData = {
                        total: 0,
                        page: 1,
                        size: 10,
                        layout: 'total, sizes, prev, pager, next, jumper',
                        pageKey: 'page',
                        sizeKey: 'size'

                    }
                },
                searchBranch: function (row) { // 总行跳转分行明细表
                    var _this = this;
                    _this.clearParamFn()
                    _this.roleFlag = 'branchLevel';
                    _this.mktRespPerson = row.branch;
                    _this.mktZhCn = row.branch;
                    _this.backMktResp = row.branchNo;
                    var branchObj = {};
                    yufp.extend(branchObj, _this.queryParams);
                    let obj = JSON.stringify(branchObj)
                    yufp.sessionStorage.put('saveLocaOne', obj);
                    branchObj.roleFlag = 'branchLevel';
                    branchObj.mktRespPerson = row.branchNo;
                    delete branchObj.custGrade;
                    delete branchObj.aumBalanceStart;
                    delete branchObj.aumBalanceEnd;
                    setTimeout(function () {
                        _this.isBranch = true;
                        _this.isHeadOffice = false;
                        _this.isManage = false;
                        _this.loading2 = true;
                        _this.$nextTick(function () {
                            _this.queryParams = branchObj;
                            yufp.service.request({
                                method: 'GET',
                                data: {
                                    page: _this.pageData.page,
                                    size: _this.pageData.size,
                                    condition: JSON.stringify(branchObj)
                                },
                                url: '/api/branchSalesResource/queryBranch',
                                callback: function (code, message, response) {
                                    if (code == 0 && response.data) {
                                        _this.pageData.total = response.total;
                                        _this.tableData = response.data;
                                        _this.loading2 = false;
                                    }
                                }
                            })
                        })
                    }, 500);
                },
                searchRm: function (row) { // 分行跳转客户明细表
                    var _this = this;
                    _this.clearParamFn('yes')
                    _this.roleFlag = 'custLevel';
                    _this.mktRespPerson = row.rm;
                    _this.custUserId = row.userId;
                    _this.start = _this.queryParams.aumBalanceStart
                    _this.end = _this.queryParams.aumBalanceEnd
                    var RmObj = {};
                    yufp.extend(RmObj, _this.queryParams);
                    RmObj.roleFlag = 'custLevel';
                    if (row.rm == '总计') {
                        RmObj.mktRespPerson = _this.backMktResp;
                        _this.custUserId = _this.backMktResp;
                    } else {
                        RmObj.mktRespPerson = row.userId;
                    }
                    delete RmObj.custGrade
                    setTimeout(function () {
                        _this.isManage = true;
                        _this.isHeadOffice = false;
                        _this.isBranch = false;
                        _this.showCust = true;
                        _this.loading2 = true;
                        _this.$nextTick(function () {
                            _this.queryParams = RmObj;
                            yufp.service.request({
                                method: 'GET',
                                data: {
                                    page: _this.pageData.page,
                                    size: _this.pageData.size,
                                    condition: JSON.stringify(RmObj)
                                },
                                url: '/api/branchSalesResource/queryBranch',
                                callback: function (code, message, response) {
                                    if (code == 0 && response.data) {
                                        _this.pageData.total = response.total;
                                        _this.tableData = response.data;
                                        _this.loading2 = false;
                                    }
                                }
                            })
                        })
                    }, 500);
                },
                backFn: function () {
                    var _this = this;
                    if (_this.roleFlag == 'branchLevel') { // 分行跳转回总行明细表
                        var headOfficeObj = {};
                        headOfficeObj.dataDate = _this.queryParams.dataDate;
                        headOfficeObj.isPeople = _this.queryParams.isPeople;
                        delete headOfficeObj.aumBalanceStart;
                        delete headOfficeObj.aumBalanceEnd;
                        delete headOfficeObj.roleFlag;
                        setTimeout(function () {
                            _this.isHeadOffice = true;
                            _this.isBranch = false;
                            _this.isManage = false;
                            _this.showCust = false;
                            _this.loading2 = true;
                            _this.$nextTick(function () {
                                _this.roleFlag = '';
                                yufp.service.request({
                                    method: 'GET',
                                    data: {
                                        condition: JSON.stringify(headOfficeObj)
                                    },
                                    url: '/api/branchSalesResource/queryBranch',
                                    callback: function (code, message, response) {
                                        if (code == 0 && response.data) {
                                            _this.tableData = response.data;
                                            _this.loading2 = false;
                                        }
                                    }
                                })
                            })
                        }, 500);
                    } else if (_this.roleFlag == 'custLevel') { // 客户经理跳回分行明细表
                        _this.clearParamFn('no')
                        var branchObj = {};
                        branchObj.dataDate = _this.queryParams.dataDate;
                        branchObj.isPeople = _this.queryParams.isPeople;
                        branchObj.mktRespPerson = _this.backMktResp;
                        branchObj.aumBalanceStart = _this.start;
                        branchObj.aumBalanceEnd = _this.end;
                        branchObj.roleFlag = 'branchLevel';
                        _this.queryParams.roleFlag = 'branchLevel';
                        _this.mktRespPerson = _this.mktZhCn;
                        _this.queryParams.aumBalanceStart = _this.start;
                        _this.queryParams.aumBalanceEnd = _this.end;
                        if (!branchObj.aumBalanceStart) {
                            delete branchObj.aumBalanceStart
                        }
                        if (!branchObj.aumBalanceEnd) {
                            delete branchObj.aumBalanceEnd
                        }
                        setTimeout(function () {
                            _this.isBranch = true;
                            _this.isHeadOffice = false;
                            _this.isManage = false;
                            _this.showCust = true;
                            _this.loading2 = true;
                            _this.$nextTick(function () {
                                _this.roleFlag = 'branchLevel';
                                _this.getRole('R');
                                yufp.service.request({
                                    method: 'GET',
                                    data: {
                                        page: _this.pageData.page,
                                        size: _this.pageData.size,
                                        condition: JSON.stringify(branchObj)
                                    },
                                    url: '/api/branchSalesResource/queryBranch',
                                    callback: function (code, message, response) {
                                        if (code == 0 && response.data) {
                                            _this.pageData.total = response.total;
                                            _this.tableData = response.data;
                                            _this.loading2 = false;
                                        }
                                    }
                                })
                            })
                        }, 500);
                    }
                }
            }
        });
    };
});
