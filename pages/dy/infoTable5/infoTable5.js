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
            el: '#infoTable5',
            data: function () {
                var _this = this;
                return {
                    loading5: false,
                    tableData: [],
                    fourOrOne: '1',
                    queryParams: {},
                    selectRows: [],
                    orgIdAuth: '',
                    ORIGION_LIST: [],
                    baseParams: {
                        orgIdAuth: _this.orgIdAuth,
                        custQueryType: '02'
                    },
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
                searchFn: function (formName) {
                    var _this = this;
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
                            _this.loading5 = true;
                            let timer = _this.$refs.quarterRef.getParamsTime()
                            _this.queryParams.dataDate = timer
                            yufp.extend(obj, _this.queryParams);
                            obj.orgIdAuth = _this.baseParams.orgIdAuth;
                            //需要缓存参数
                            _this.exportObj = obj;
                            yufp.service.request({
                                method: 'GET',
                                data: {
                                    condition: JSON.stringify(obj)
                                },
                                url: '/api/OcrmFClAumbalance/getbalancelist',
                                callback: function (code, message, response) {
                                    if (code == 0 && response.data) {
                                        _this.tableData = response.data;
                                        _this.loading5 = false;
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
                    this.queryParams.aumBalanceStart = '';
                    this.queryParams.aumBalanceEnd = '';
                    this.$refs[formName].resetFields();
                    this.$nextTick(function () {
                        this.$refs.quarterRef.resetFn()
                    })
                },
                selectChange: function (selection) {
                    this.selectRows = selection;
                },
                exportFn: function () {
                    var em = this;
                    if (em.tableData.length > 50000) {
                        em.$message({
                            showClose: true,
                            message: '当前数据条数超过50000, 暂不支持导出',
                            type: 'warning'
                        });
                        return;
                    }
                    // var param = {
                    // startDate: em.queryParams.startDate || '',
                    // endDate: em.queryParams.endDate || '',
                    // targetId: em.queryParams.targetId || '',
                    // triumphId: em.queryParams.triumphId || '',
                    // selectRole: yufp.sessionStorage.get('selectRole')
                    // };
                    em.exportObj.selectRole = yufp.sessionStorage.get('selectRole');
                    var url = '/api/OcrmFClAumbalance/export?' + 'condition=' + encodeURI(JSON.stringify(em.exportObj));
                    yufp.util.download(url);
                    yufp.util.butLogInfo(hashCode, 'AUM余额报表', '导出');
                },
            }
        });
    };
});