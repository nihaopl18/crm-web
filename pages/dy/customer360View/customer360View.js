/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-05 18:12:24
 * @update by:
 * @description:
 */
/**
 * @created by zhangkun6 on 2021-8-5 18:12:24
 * @updated by
 * @description 客户360视图
 */
define([
    './pages/dy/customer360View/components/customerCard.js',
    './pages/dy/customer360View/components/featureTagsnew.js',
    'echarts',
    './pages/dy/customer360View/components/dataCharts.js',
    './libs/daterangepicker/moment.min.js',
    './pages/dy/customer360View/components/tabs/baseInfo.js',
    './pages/dy/customer360View/components/tabs/productInfo.js',
    './pages/dy/customer360View/components/tabs/productInfoLoan.js',
    './pages/dy/customer360View/components/tabs/riskInfo.js',
    './pages/dy/customer360View/components/tabs/touchHistory.js',
    './pages/dy/customer360View/components/tabs/historyEchart.js',
    './pages/dy/customer360View/components/tabs/behaviorTrack.js',
    './pages/dy/customer360View/components/tabs/eventInfo.js',
    './pages/dy/commonComponent/customerEdit.js',
    './pages/dy/commonComponent/titleContent.js',
    './custom/widgets/js/YufpTagGroupTree.js'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.localStorage.put('custInfo', data);
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    activeName: 'baseInfo',
                    baseInfo: true,
                    productInfo: false,
                    productInfo1: false,
                    riskInfo: false,
                    touchHistory: false,
                    eventInfo: false,
                    behaviorTrack: false,
                    lifeCircle: false,
                    eventNotices: [],
                    perInfo: {}, // 个人信息
                    perLabelInfo: [], // 个人标签信息
                    aumInfo: {}, // AUM信息
                    depositInfo: {}, // 存款信息
                    propertyInfo: {}, // 资产信息
                    custId: '',
                    dialogVisible: false,
                    workReport: {},
                    detailCustomerContactData: [],
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: ''
                        })
                    },
                    reportUpLoadBusNo: {},
                    // 附件列表按钮
                    uploadVisible: false,
                    downloadVisible: true,
                    deleteVisible: false,
                    workSummary: {
                        second: false,
                        three: false,
                        fouth: false,
                        five: false
                    },
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                        }
                    },
                };
            },
            mounted: function() {
                this.getHeaderData();
            },

            methods: {
                cancelFn: function() {
                    this.dialogVisible = false;
                },
                /**
                 * 公共方法：时区控制
                 */
                formJE: function(row, column, cellValue) {
                    if (cellValue) {
                        cellValue = yufp.util.dateFormat(cellValue, '{y}-{m}-{d}');
                    }
                    return cellValue;
                },
                handleClick: function(val) {
                    this[val.name] = true;
                    yufp.util.butLogInfo(hashCode, '客户360视图：'+data.custId, val.label);
                },

                getHeaderData: function() {
                    var _this = this;
                    var parm = { condition: JSON.stringify({ custId: data.custId }) };
                    this.custId = data.custId;
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/pcustviewheader/querylist',
                        data: parm,
                        callback: function(code, message, response) {
                            if (code === 0) {
                                let workNameObj = yufp.lookup.find('CD0033', false);
                                // let { eventInfo, perInfo, perLabelInfo, aumInfo, depositInfo, propertyInfo } = response.data;
                                let data = response.data;
                                _this.propertyInfo = data.propertyInfo || {
                                    aumbalanceAvgRmb: 0,
                                    aumbalanceAvgRmbQoq: 0,
                                    depositBalanceRmb: 0,
                                    depositBalanceRmbQoq: 0,
                                    loanBalance: 0,
                                    loanBalanceQoq: 0
                                };
                                _this.perInfo = data.perInfo || {};
                                _this.aumInfo = data.aumInfo || {};
                                _this.depositInfo = data.depositInfo || [];
                                _this.eventNotices = data.eventInfo || [];
                                _this.perLabelInfo = data.perLabelInfo || [];
                                _this.perInfo.indivOcc = workNameObj[_this.perInfo.indivOcc];
                                _this.perInfo.phoneNo = data.contactWay ? data.contactWay.phoneNo : '-';
                                _this.perInfo.telPhoneNo = data.contactWay ? data.contactWay.telPhoneNo : '-';
                            }
                        }
                    });
                },

                detailTouch: function(data) {
                    var _this = this;
                    _this.dialogVisible = true;
                    _this.$nextTick(function() {
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/infoworkreport/detail',
                            data: { workReportId: data },
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    var queryData = response.data;
                                    var workReport = queryData.workReport[0];
                                    _this.setWorkSummary(workReport.workSummary);
                                    _this.setWorkReport(workReport);
                                    if (queryData.custContact) {
                                        _this.detailCustomerContactData = queryData.custContact;
                                    }
                                }
                            }
                        })
                        var files = {
                            condition: JSON.stringify({
                                busNo: data
                            })
                        };
                        yufp.extend(_this.initFilesParams, files);
                        // 获取附件列表
                        _this.$refs.filesTable.queryFn(files);

                        // 设置附件列表组件传入NOTICEID
                        _this.reportUpLoadBusNo = {
                            busNo: data
                        };
                    });
                },

                setWorkReport: function(data) {
                    var _this = this;
                    _this.$set(_this.workReport, 'workReportBusiType', data.workReportBusiType);
                    _this.$set(_this.workReport, 'startDate', data.startDate);
                    _this.$set(_this.workReport, 'workSummary', data.workSummary);
                    if (data.workContent) {
                        var item = data.workContent.split(';');
                        for (let index = 0; index < item.length; index++) {
                            const element = item[index];
                            var d = element.split(':');
                            _this.$set(_this.workReport, 'workContent' + d[0], d[1]);
                        }
                    }
                    _this.$set(_this.workReport, 'annex', data.annex);
                    _this.$set(_this.workReport, 'laterPlan', data.laterPlan);
                },

                setWorkSummary: function(val) {
                    if (!val) {
                        return;
                    }
                    var _this = this;
                    if (val.indexOf('2') != -1) {
                        _this.workSummary.second = true;
                    }
                    if (val.indexOf('3') != -1) {
                        _this.workSummary.three = true;
                    }
                    if (val.indexOf('4') != -1) {
                        _this.workSummary.fouth = true;
                    }
                    if (val.indexOf('5') != -1) {
                        _this.workSummary.five = true;
                    }
                },
                addButLog:function(name,message){
                    yufp.util.butLogInfo(hashCode, name, message);
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