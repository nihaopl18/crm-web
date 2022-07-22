/**
 * @author mabintao
 * @since 2022/02/26
 * @description 
 */

/** 引入相关JS文件 */
define([
    './pages/dy/complaintInfo/complaintEdit/complaintEdit.js'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('PROPERTY_MORTGAGE_STATUS,CD0376,YES_NO,CD0017,HEALTH_STATE,MAJOR,IS_HANDLE');
        var vm = yufp.custom.vue({
            el: '#complaintInfo',
            data: function() {
                var _this = this;
                return {
                    queryParams: {},
                    selectRows: [],
                    orgIdAuth: '',
                    sheetId: '',
                    baseParams: {
                        orgIdAuth: _this.orgIdAuth,
                    },
                    editDialogVisible: false
                };
            },
            created: function() {
                var _this = this;
                _this.getOrgIdAuth();
            },
            mounted: function() {
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
                searchFn: function(formName) {
                    var _this = this;
                    var obj = {};
                    // var flag = false;
                    // for (var key in _this.queryParams) {
                    //     if (_this.queryParams[key]) {
                    //         flag = true;
                    //     }
                    // }
                    // if (!flag) {
                    //     _this.$message.warning('请至少选择一个筛选条件');
                    //     return;
                    // }
                    _this.$refs.queryParams.validate(function(valid) {
                        if (valid) {
                            yufp.extend(obj, _this.queryParams);
                            // obj.orgIdAuth = _this.baseParams.orgIdAuth;
                            _this.$refs.multipleTable.remoteData({
                                condition: JSON.stringify(obj)
                            });
                        }
                    });
                },
                resetFormFn: function() {
                    this.$refs.queryParams.resetFields();
                    this.$nextTick(function() {
                        this.queryParams.sheetId = '';
                        this.queryParams.custEcifNo = '';
                        this.queryParams.handleState = '';
                    })
                },
                selectChange: function(selection) {
                    this.selectRows = selection;
                },
                editRow: function(row) {
                    console.log(row);
                    var _this = this;
                    _this.editDialogVisible = true;
                    _this.$nextTick(function() {
                        _this.$refs.customerEdite.getCustInfo(row.sheetId);
                    })
                },
                closeeditebox: function() {
                    this.$refs.multipleTable.remoteData(this.queryParams);
                    this.editDialogVisible = false;
                },
            }
        });
    };
});