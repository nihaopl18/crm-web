define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('DY0003,DY0004,DY0005,DY0006,CRUD_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var me = this;
                return {
                    workReportId: data.bizSeqNo,
                    workReport: {},
                    isDay: false,
                    detailCustomerContactData: [],
                    workSummary: {
                        second: false,
                        three: false,
                        fouth: false,
                        five: false
                    },
                    isCustContact: false,
                    // 初始化附件列表查询时，传入为空
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: data.bizSeqNo
                        })
                    },
                    reportUpLoadBusNo: { busNo: data.bizSeqNo },
                    // 附件列表按钮
                    uploadVisible: false,
                    downloadVisible: true,
                    deleteVisible: false,
                    detail: true,
                    annexLabel: '',
                    laterPlanLabel: '',
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                        }
                    },
                }
            },
            created: function () {
                this.getWorkReport();
            },
            methods: {
                getWorkReport: function () {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/infoworkreport/detail',
                        data: { workReportId: _this.workReportId },
                        callback: function (code, message, response) {
                            if (code == 0) {
                                var queryData = response.data;
                                var workReport = queryData.workReport[0];
                                switch (workReport.workReportBusiType) {
                                    case '1':
                                        _this.isDay = true;
                                        _this.setWorkSummary(workReport.workSummary);
                                        _this.annexLabel = '补充内容';
                                        _this.laterPlanLabel = '总结及后续工作计划';
                                        break;
                                    case '2':
                                        _this.isDay = false;
                                        _this.annexLabel = '本周总结';
                                        _this.laterPlanLabel = '后续工作计划';
                                        break;
                                    case '3':
                                        _this.isDay = false;
                                        _this.annexLabel = '本月总结';
                                        _this.laterPlanLabel = '后续工作计划';
                                        break;
                                    default:
                                        break;
                                }
                                _this.setWorkReport(workReport);
                                if (queryData.custContact) {
                                    _this.detailCustomerContactData = queryData.custContact;
                                }
                            }
                        }
                    })
                },
                setWorkReport: function (data) {
                    var _this = this;
                    _this.$set(_this.workReport, 'workReportBusiType', data.workReportBusiType);
                    _this.$set(_this.workReport, 'startDate', data.startDate);
                    if (data.workReportBusiType == '1') {
                        _this.$set(_this.workReport, 'workSummary', data.workSummary);
                        if (data.workContent) {
                            var item = data.workContent.split(';');
                            for (let index = 0; index < item.length; index++) {
                                const element = item[index];
                                var d = element.split(':');
                                _this.$set(_this.workReport, 'workContent' + d[0], d[1]);
                            }
                        }
                    }
                    _this.$set(_this.workReport, 'annex', data.annex);
                    _this.$set(_this.workReport, 'laterPlan', data.laterPlan);
                },
                setWorkSummary: function (val) {
                    if (!val) {
                        return;
                    }
                    var _this = this;
                    if (val.indexOf('1') != -1) {
                        _this.isCustContact = true;
                    }
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
                formJE: function (row, column, cellValue) {
                    if (cellValue) {
                        cellValue = yufp.util.dateFormat(cellValue, '{y}-{m}-{d}');
                    }
                    return cellValue;
                }
            }
        });
    };
})