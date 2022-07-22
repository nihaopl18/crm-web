/**
 * @author mabintao
 * @since 2021/11/11.
 * @description 
 */

/** 引入相关JS文件 */
define([], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        // yufp.lookup.reg('PROPERTY_MORTGAGE_STATUS,CD0376,YES_NO,CD0017,HEALTH_STATE,MAJOR');
        var vm = yufp.custom.vue({
            el: '#allCustomerSearch',
            data: function() {
                var _this = this;
                    var checkID = function(rule, value, callback) {
                        if (_this.allQueryFormParams.certNo && !value) {
                            return callback(new Error('请选择证件类型'));
                        } else if (!_this.allQueryFormParams.certNo && !value) {
                            _this.$refs.allQueryForm.clearValidate('certNo');
                            callback();
                        } else {
                            callback();
                        }
                    };
                    var checkCertNo = function(rule, value, callback) {
                        if (_this.allQueryFormParams.custType && !value) {
                            return callback(new Error('请输入证件号码'));
                        } else if (value && value.trim().length > 20) {
                            return callback(new Error('证件号码不能大于20位'));
                        } else if (!_this.allQueryFormParams.custType && !value) {
                            _this.$refs.allQueryForm.clearValidate('custType');
                            callback();
                        } else {
                            callback();
                        }
                    };
                return {
                    allQueryFormParams: {},
                    selectRows: [],
                    orgIdAuth: '',
                    ORIGION_LIST: [],
                    baseParams: {
                        orgIdAuth: this.orgIdAuth,
                        custQueryType: '02'
                    },
                    IDTypeRule: [{ validator: checkID, trigger: 'change' }],
                    certNoRule: [{ validator: checkCertNo, trigger: 'blur' }],
                };
            },
            created: function() {
                var _this = this;
                _this.getOrgIdAuth();
            },
            mounted: function() {
                var em = this;
                em.ORIGION_LIST = yufp.lookup.find('ORIGION_LIST');
            },
            methods: {
                getOrgIdAuth: function() {
                    var _this = this;
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
                },
                allQueryFormFn: function(formName) {
                    var _this = this;
                    var obj = {};
                    var flag = false;
                    for (var key in _this.allQueryFormParams) {
                        if (_this.allQueryFormParams[key]) {
                            flag = true;
                        }
                    }
                    if (!flag) {
                        _this.$message.warning('请至少选择一个筛选条件');
                        return;
                    }
                    _this.$refs.allQueryForm.validate(function(valid) {
                        if (valid) {
                            yufp.extend(obj, _this.allQueryFormParams);
                            obj.orgIdAuth = _this.baseParams.orgIdAuth;
                            // _this.tempQueryParams = obj;
                            _this.$refs.multipleTable.remoteData(obj);
                            // _this.filterData = obj;
                        }
                    });
                    _this.$nextTick(function() {
                        _this.$refs.multipleTable.doLayout();
                    });
                },
                resetForm: function(formName) {
                    this.$refs[formName].resetFields();
                },
                selectChange: function(selection) {
                    this.selectRows = selection;
                },
                btnClearDataFn: function() {
                    this.$refs.multipleTable.clearSelection();
                },
                /** 商户table行用户名称双击事件 -- 打开详情 */
                onTableRowMerchantNameClickFtn: function(data) {
                    var _this = this;
                    yufp.util.valid2jump(data.custId, function(val) {
                        if (val) {
                            var customKey = 'custom_view' + data.custId; // 请以custom_view前缀开头，并且全局唯一
                            // var custType = row.custType;
                            yufp.frame.addTab({
                                id: 'customer360View', // 菜单功能ID（路由ID）
                                key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                                title: '客户360视图:' + data.custName, // 页签名称
                                data: {
                                    custId: data.custId,
                                    custName: data.custName
                                } // 传递的业务数据，可选配置
                            });
                        } else {
                            _this.$message.warning('该客户不能查看客户360视图');
                        }
                    });
                }
            }
        });
    };
});