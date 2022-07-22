/**
 * @created by lufl on 2021-9-1 10:21:41
 * @updated by
 * @description 东亚银行客户交易查询
 */
define([
    './libs/daterangepicker/moment.min.js',
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('CD0433,TRANS_CLASS,TRANS_TYPE,TRANS_CHANNEL,DEBIT_CREDIT,TRANS_FLAG');
        yufp.lookup.reg('INTER_FLAG,FINANCE_TYPE,TRANS_STATE,DATA_STATE,BUSINESS_TYPE,QD_TYPE,ACCT_FLAG');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                var _this = this;
                return {
                    idag: '',
                    idfa: '',
                    idla: '',
                    formData: {},
                    startAmt: '',
                    endAmt: '',
                    listdataAG: [],
                    listdataFA: [],
                    listdataLA: [],
                    acctType: [
                        { key: '0', value: '存款账户' },
                        { key: '1', value: '贷款借据号' },
                        { key: '4', value: '理财账户' },
                    ],
                    money: [
                        { key: '10000', value: '10000' },
                        { key: '20000', value: '20000' },
                    ],
                    acctId: [],
                    acctTypeVal: '0',
                    isAll: false,
                    isWeek: false,
                    isMonth: false,
                    dataUrlAG: '/api/acrmfagtrandetail/querylist',
                    dataUrlFA: '/api/acrmffatrandetail/querylist',
                    dataUrlLA: '/api/acrmflatrandetail/querylist',
                }
            },
            mounted: function() {
                var _this = this;
                _this.idag = new Date().getTime().toString() + 'idag';
                _this.idfa = new Date().getTime().toString() + 'idfa';
                _this.idla = new Date().getTime().toString() + 'idla';
                _this.setSelectVal(7);
                // _this.formData.acctType = '0';
                _this.acctTypeVal = '0';
                _this.firstSearch();
            },
            breforeDestroy: function() {},
            methods: {
                /**
                 * 格式化日期：yyyy-MM-dd
                 */
                formatDate: function(date) {
                    var myyear = date.getFullYear();
                    var mymonth = date.getMonth() + 1;
                    var myweekday = date.getDate();
                    if (mymonth < 10) {
                        mymonth = '0' + mymonth;
                    }
                    if (myweekday < 10) {
                        myweekday = '0' + myweekday;
                    }
                    return myyear + '-' + mymonth + '-' + myweekday;
                },
                /**
                 * 公共方法：清空obj对象
                 */
                clearObj: function(obj) {
                    for (var key in obj) {
                        obj[key] = null;
                    }
                    return obj;
                },
                //设置默认日期样式
                setIsSelect: function(isAll, isWeek, isMonth) {
                    var _this = this;
                    _this.isAll = isAll;
                    _this.isWeek = isWeek;
                    _this.isMonth = isMonth;
                },
                //获取账户列表
                setAcctId: function(val) {
                    if (val == undefined) {
                        val = '';
                    }
                    var _this = this;
                    var acctId = null;
                    _this.acctId = [];
                    _this.formData.acctId = '';
                    // 发送请求
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/acrmfcustacctinfo/querySubAcctNo',
                        data: {
                            condition: JSON.stringify({
                                custNo: data.custId || '',
                                // custNo: '1334668900',
                                acctType: val
                            })
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                var acctList = response.data;
                                for (var i = 0; i < acctList.length; i++) {
                                    acctId = {
                                        key: acctList[i],
                                        value: acctList[i]
                                    }
                                    _this.acctId.push(acctId);
                                }
                                if (_this.acctId.length > 0) {
                                    _this.formData.acctId = _this.acctId[0].key;
                                } else {
                                    _this.formData.acctId = '';
                                }
                            }
                        }
                    });
                },
                //默认日期设置
                setSelectVal: function(val) {
                    var _this = this;
                    _this.formData.rangeDate = [];
                    if (val == 1) {
                        return;
                    }
                    var endDate = new Date();
                    var startDate = new Date(endDate.getTime() - val * 24 * 60 * 60 * 1000);
                    _this.formData.rangeDate = [_this.formatDate(startDate), _this.formatDate(endDate)];
                },
                //查询时间改变
                chgRangeDate: function(rangeDate) {
                    var _this = this;
                    _this.setIsSelect(true, false, false);
                    if (!rangeDate) {
                        return;
                    }
                    if (!rangeDate || rangeDate.length < 2 || rangeDate[0] == '') {
                        return;
                    }
                    var startDate = rangeDate[0];
                    var endDate = rangeDate[1];
                    var currentDate = new Date();
                    if (endDate == _this.formatDate(currentDate)) {
                        switch (startDate) {
                            case _this.formatDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)):
                                _this.setIsSelect(false, true, false);
                                break;
                            case _this.formatDate(new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000)):
                                _this.setIsSelect(false, false, true);
                                break;
                            default:
                                break;
                        }
                    }
                },
                //查询按钮
                search: function() {
                    var _this = this;
                    _this.$refs.refForm.validate(function(valid) {
                        if (!valid) {
                            return;
                        }
                    })
                    var model = {};
                    yufp.clone(_this.formData, model);
                    model.startAmt = _this.startAmt;
                    model.endAmt = _this.endAmt;
                    // model.custNo = '1334668900';
                    model.custNo = data.custId || '';
                    var param = {
                        condition: JSON.stringify(model)
                    };
                    if (model.acctType == '0') {
                        // 发送请求
                        // yufp.service.request({
                        //     method: 'GET',
                        //     url: '/api/acrmfagtrandetail/querylist',
                        //     data: {
                        //         condition: JSON.stringify(model)
                        //     },
                        //     callback: function (code, message, response) {
                        //         if (code == 0) {
                        //             _this.$refs.AG.tabledata = response.data;
                        //             _this.listdataAG = response.data;
                        //         }
                        //     }
                        // });
                        _this.$refs.AG.remoteData(param);
                    } else if (model.acctType == '4') {
                        // 发送请求
                        // yufp.service.request({
                        //     method: 'GET',
                        //     url: '/api/acrmffatrandetail/querylist',
                        //     data: {
                        //         condition: JSON.stringify(model)
                        //     },
                        //     callback: function (code, message, response) {
                        //         if (code == 0) {
                        //             _this.$refs.FA.tabledata = response.data;
                        //             _this.listdataFA = response.data;
                        //         }
                        //     }
                        // });
                        _this.$refs.FA.remoteData(param);
                    } else if (model.acctType == '1') {
                        // 发送请求
                        // yufp.service.request({
                        //     method: 'GET',
                        //     url: '/api/acrmflatrandetail/querylist',
                        //     data: {
                        //         condition: JSON.stringify(model)
                        //     },
                        //     callback: function (code, message, response) {
                        //         if (code == 0) {
                        //             _this.$refs.LA.tabledata = response.data;
                        //             _this.listdataLA = response.data;
                        //         }
                        //     }
                        // });
                        _this.$refs.LA.remoteData(param);
                    }
                    _this.fresh += 1;
                    _this.acctTypeVal = model.acctType;
                },
                firstSearch: function() {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/acrmfcustacctinfo/querySubAcctNo',
                        data: {
                            condition: JSON.stringify({
                                custNo: data.custId || '',
                                // custNo: '1334668900',
                                acctType: '0',
                            })
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                var acctList = response.data;
                                if (acctList.length > 0) {
                                    _this.formData.acctId = acctList[0];
                                } else {
                                    _this.formData.acctId = '';
                                }
                                var param = {
                                    condition: JSON.stringify({
                                        custNo: data.custId || '',
                                        // custNo: '1334668900',
                                        acctId: _this.formData.acctId,
                                        rangeDate: [_this.formatDate(new Date()), _this.formatDate(new Date((new Date()).getTime() - 7 * 24 * 60 * 60 * 1000))]
                                    })
                                };
                                _this.$refs.AG.remoteData(param);
                                _this.formData.acctType = '0';
                            }
                        }
                    });
                },
                //重置按钮
                reset: function() {
                    this.clearObj(this.formData);
                    this.$refs.refForm.resetFields();
                },
                //返回客户360视图
                returnCustomer: function() {
                    var custId = data.custId;
                    // 跳转到交易明细
                    // yufp.frame.addTab({
                    //     id: 'transInfo', // 菜单功能ID（路由ID）
                    //     key: 'custom_transInfo', // 自定义唯一页签key,请统一使用custom_前缀开头
                    //     title: '交易明细', // 页签名称
                    //     data: {
                    //         custId: custId
                    //     }
                    // });
                },
                fromatDate: function(row, column, cellValue) {
                    cellValue = yufp.util.dateFormat(cellValue, '{y}-{m}-{d}');
                    return cellValue;
                },
                fromatTime: function(row, column, cellValue) {
                    cellValue = yufp.util.dateFormat(cellValue, '{h}:{i}:{s}');
                    return cellValue;
                },
                handleExportCommand: function(command) {
                    var message = '';
                    if (command === '1') {
                        if (this.acctTypeVal == '0') {
                            var agdocument = document.getElementById(this.idag);
                            var widthag = $('#' + this.idag).width();
                            agdocument.style.width = "1900px";
                            // yufp.util.exportPDF('.export-containerAG', '客户存款账户交易查询数据');
                            yufp.util.exportPDF('#' + this.idag, '客户存款账户交易查询数据');
                            agdocument.style.width = widthag + 'px';
                            message = '存款交易';
                        } else if (this.acctTypeVal == '4') {
                            var fadocument = document.getElementById(this.idfa);
                            var widthfa = $('#' + this.idfa).width();
                            fadocument.style.width = "3000px";
                            // yufp.util.exportPDF('.export-containerFA', '客户理财账户交易查询数据');
                            yufp.util.exportPDF('#' + this.idfa, '客户理财账户交易查询数据');
                            fadocument.style.width = widthfa + 'px';
                            message = '理财交易';
                        } else if (this.acctTypeVal == '1') {
                            var agdocument = document.getElementById(this.idla);
                            var widthla = $('#' + this.idfa).width();
                            ladocument.style.width = "3300px";
                            // yufp.util.exportPDF('.export-containerLA', '客户贷款借据号交易查询数据');
                            yufp.util.exportPDF('#' + this.idla, '客户贷款借据号交易查询数据');
                            ladocument.style.width = widthla + 'px';
                            message = '贷款交易'
                        }
                        message += '导出PDF';
                    } else {
                        var url = '/api/acrmfagtrandetail/export';
                        var page = 1;
                        var size = 10;
                        if (this.acctTypeVal == '0') {
                            url = '/api/acrmfagtrandetail/export';
                            page = this.$refs.AG.page;
                            size = this.$refs.AG.size;
                            message = '存款交易';
                        } else if (this.acctTypeVal == '4') {
                            url = '/api/acrmffatrandetail/export';
                            page = this.$refs.FA.page;
                            size = this.$refs.FA.size;
                            message = '理财交易';
                        } else if (this.acctTypeVal == '1') {
                            url = '/api/acrmflatrandetail/export';
                            page = this.$refs.LA.page;
                            size = this.$refs.LA.size;
                            message = '贷款交易';
                        }
                        var model = {};
                        yufp.clone(this.formData, model);
                        model.custNo = data.custId || '';
                        url += '?condition=' + encodeURI(JSON.stringify(model)) + '&page=' + page + '&size=' + size;
                        yufp.util.download(url);
                        message += '导出Excle';
                    }
                    yufp.util.butLogInfo(hashCode, '交易明细'+ custId, message);
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
})