/**
 * @author mabintao
 * @since 2022/02/19
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
        // yufp.lookup.reg('PROPERTY_MORTGAGE_STATUS,CD0376,YES_NO,CD0017,HEALTH_STATE,MAJOR');
        var vm = yufp.custom.vue({
            el: '#infoTable4',
            data: function () {
                var _this = this;
                return {
                    loading4: false,
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
                    fourOrOne: '4',
                    queryParams: {},
                    orgIdAuth: '',
                    ORIGION_LIST: [],
                    baseParams: {
                        orgIdAuth: _this.orgIdAuth,
                        custQueryType: '02'
                    },
                    showor: false,
                    custResults: [],
                    exportObj: {}
                };
            },
            created: function () {
                var _this = this;
                _this.getOrgIdAuth();
            },
            mounted: function () {
                var em = this;
                em.ORIGION_LIST = yufp.lookup.find('ORIGION_LIST');
            },
            methods: {
                clearParamFn: function () {
                    let _this = this;
                    _this.pageData = {
                        total: 0,
                        page: 1,
                        size: 10,
                        layout: 'total, sizes, prev, pager, next, jumper',
                        pageKey: 'page',
                        sizeKey: 'size'

                    }
                },
                mgrpageChangeFn: function (val) {
                    var _this = this;
                    _this.pageData.page = val;
                    if (_this.repeatTrigger) {
                        _this.repeatTrigger = false;
                    } else {
                        _this.searchFn();
                    }
                },
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
                        _this.searchFn();
                    }
                },
                selectCustParams: { // 客户 放大镜 参数
                    params: { tabCheckbox: false }, // 设置用户管理组件是否可以复选
                },
                checkChinese: function (params) {
                    return new RegExp('[\\u4E00-\\u9FFF]+', 'g').test(params);
                },
                custTpChangeFn: function () {
                    var _this = this;
                    var prodId = '';
                    var prodName = '';
                    _this.searchBoxShow = true;
                    // 检测是否为中文
                    if (_this.checkChinese(_this.queryParams.prodName)) {
                        prodName = _this.queryParams.prodName;
                    } else {
                        prodId = _this.queryParams.prodName;
                    }
                    // 控制下面是否展示
                    if (_this.queryParams.prodName && _this.queryParams.prodName.length != 0) {
                        _this.showor = true;
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/ocrmfcicgbase/queryprodlist',
                            data: {
                                prodId: prodId,
                                prodName: prodName
                            },
                            callback: function (code, message, response) {
                                if (code === 0) {
                                    _this.custResults = response.data;
                                }
                            }
                        });
                    } else {
                        _this.showor = false;
                    }

                    console.log(_this.queryParams.prodName);
                },
                handleCustomerSelect: function (item) {
                    var _this = this;
                    _this.queryParams.prodName = item.prodName + '--' + item.prodId;
                    setTimeout(function () {
                        _this.showor = false;
                    }, 100);
                    _this.showor = false;
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
                    var obj = {};
                    var flag = false;
                    for (var key in _this.queryParams) {
                        if (_this.queryParams[key]) {
                            flag = true;
                        }
                    }
                    _this.$refs.queryParams.validate(function (valid) {
                        let validB = _this.$refs.quarterRef.getInputValue()
                        if (validB) {
                            _this.loading4 = true;
                            let timer = _this.$refs.quarterRef.getParamsTime()
                            _this.queryParams.dataDate = timer
                            yufp.extend(obj, _this.queryParams);
                            var prodArr = [];
                            if (_this.queryParams.prodName) {
                                prodArr = _this.queryParams.prodName.split('--');
                            }
                            if (prodArr.length == 2) {
                                obj.prodId = prodArr[1];
                                obj.prodName = prodArr[0];
                            } else if (!_this.checkChinese(_this.queryParams.prodName)) {
                                obj.prodId = _this.queryParams.prodName;
                                obj.prodName = '';
                            }
                            obj.orgIdAuth = _this.baseParams.orgIdAuth;
                            //需要缓存参数
                            _this.exportObj = obj;
                            yufp.service.request({
                                method: 'GET',
                                data: {
                                    page: _this.pageData.page,
                                    size: _this.pageData.size,
                                    condition: JSON.stringify(obj)
                                },
                                url: '/api/OcrmFClPersonalDetail/querydetaillist',
                                callback: function (code, message, response) {
                                    if (code == 0 && response.data) {
                                        _this.pageData.total = response.total;
                                        _this.tableData = response.data;
                                        _this.loading4 = false;
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
                    this.queryParams.aumAvgBalanceStart = '';
                    this.queryParams.aumAvgBalanceEnd = '';
                    this.clearParamFn()
                    this.$refs[formName].resetFields();
                    this.$nextTick(function () {
                        this.$refs.quarterRef.resetFn()
                    })
                },
                exportFn: function () {
                    var em = this;
                    em.exportObj.selectRole = yufp.sessionStorage.get('selectRole');
                    if (em.pageData.total < 50001) {
                        var url = '/api/OcrmFClPersonalDetail/export?' + 'condition=' + encodeURI(JSON.stringify(em.exportObj));
                        yufp.util.download(url);
                        yufp.util.butLogInfo(hashCode, '存款明细报表', '导出');
                    } else {
                        em.$message({
                            showClose: true,
                            message: '当前数据条数超过50000, 暂不支持导出',
                            type: 'warning'
                        });
                    }
                },
            }
        });
    };
});