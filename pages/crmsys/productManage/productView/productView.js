/**
 * @Created by 闫天一 yanty1@yusys.com.cn on 2019-1-30 15:51:54.
 * @updated by
 * @description 产品视图
 */
define([
    'echarts',
    'pages/crmsys/productManage/productView/productView.css'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('RISKLEVEL,PROD_STATUS,YES_NO,CD0433,INCOME_FEATURES,PAY_TYPE,CD0357,DY0008,RATE_TYPE,BOUNS_TYPE,HUGE_REDEEM_FLAG,CTL_FLAG,CHANNEL_GROUP,PROD_TYPE,CAL_TYPE,DATE_TYPE,CUST_PROP_GROP,SUBS_TYPE,CASH_FLAG,DY0011,NET_SHOW_TYPE,PROD_SPE_ATTR,REDEEM_TYPE,QDII_TYPE,MAIN_NO,CD0357,ORG_BRACH');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    mainid: 'main' + new Date().getTime(),
                    zxdata: [],
                    prodData: data,
                    infoDisabled: true,
                    activeAddFormdatafl: {},
                    activeAddFormdata: {},
                    activeAddFormdataother: {},
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: data.prodCode
                        })
                    },
                    reportUpLoadBusNo: { busNo: data.prodCode },
                    fileDataParams: {
                        busNo: data.prodCode
                    },
                    tableUrl: '/api/acrmfpdprodinfo/productcustfitinfoquery',
                    baseParams: {
                        condition: JSON.stringify({ srcProdCode: data.srcProdCode })
                    },
                    licai: true,
                    licaijst: true,
                    cunkuan: false, //存款
                    jiegouhua: false, //结构化理财
                    xintuo: false, //信托
                    qdii: false, //QDII
                    daishoufu: false, //代收付
                    renminbi: false, //人民币基金
                    baoxian: false, //保险产品
                    daikuan: false, //贷款产品
                    xinyongka: false, //信用卡产品
                    ziguan: false, //资管
                    daixiaoxt: false, //代销
                    //页签
                    activeName: 'baseInfo',
                    baseInfo: true,
                    productInfo: false,
                    productInfo1: false,
                    riskInfo: false,
                    touchHistory: false,
                    eventInfo: false,
                    behaviorTrack: false,
                    uploadVisible: yufp.session.org.id == '500',
                    gxsj: data.dataDate,
                    cpdm: data.prodCode,
                    rgksr: data.subscribeStartDate,
                    ycpdm: data.srcProdCode,
                    rgjsr: data.subscribeEndDate,
                    fxjb: data.riskLevel,
                    lilv: yufp.util.toPercent(data.rate),
                    cplb: '',
                    qixian: data.term,
                    cpzt: data.prodStatus,
                    guanzhu: false,
                    cpmc: data.prodName,
                    dataCode: {}
                };
            },
            created: function() {
                let _this = this;
                yufp.service.request({
                    method: 'GET',
                    url: '/api/adminsmlookupitem/weblist',
                    data: {
                        lookupCodes: 'CHANNEL_GROUP,CUST_PROP_GROP'
                    },
                    callback: function(code, message, response) {
                        if (code == 0) {
                            _this.dataCode.channel = response.data.CHANNEL_GROUP;
                            _this.dataCode.custProp = response.data.CUST_PROP_GROP;
                        }
                    }
                });
            },
            methods: {
                lookupdata: function() {
                    var riskleveldata = yufp.lookup.find('RISKLEVEL'); //风险级别
                    for (let i = 0; i < riskleveldata.length; i++) {
                        if (riskleveldata[i].key == this.fxjb) {
                            this.fxjb = riskleveldata[i].value;
                        }
                    }
                    var prodstatusdata = yufp.lookup.find('PROD_STATUS'); //产品状态
                    for (let i = 0; i < prodstatusdata.length; i++) {
                        if (prodstatusdata[i].key == this.cpzt) {
                            this.cpzt = prodstatusdata[i].value;
                        }
                    }
                },
                focusFn: function() {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/acrmfpdproduserfocusinfo/infoquery',
                        data: {
                            prodCode: _this.prodData.prodCode || '',
                            prodId: _this.prodData.srcProdCode || ''
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.guanzhu = response.data;
                            }

                        }
                    });
                },
                handleFocusChange: function() {
                    var _this = this;

                    var param = {
                        prodCode: this.prodData.prodCode || '',
                        srcProdCode: this.prodData.srcProdCode || ''

                    };
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/acrmfpdproduserfocusinfo/updateinfo',
                        data: param,
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.$message.success(response.data);
                                _this.focusFn();
                            }

                        }
                    });
                },
                handleClick: function(val) {
                    this[val.name] = true;
                    if (this.licaijst == false && val.name == 'productInfo') {
                        this.getMap(1);
                    }
                    if (this.licai == false && val.name == 'productInfo1') {
                        this.$refs.multipleTable.remoteData(this.baseParams);
                    }
                },
                getbaseData: function() {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        // async: false,
                        url: '/api/acrmfpdprodinfo/productbasicinfoquery',
                        data: {
                            prodCode: this.prodData.prodCode || '',
                            prodId: this.prodData.srcProdCode || ''
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                var xxx = response.data[0].prodSaleRange;
                                response.data[0].prodSaleRange = [''];
                                if (response.data[0].prodSaleRange && response.data[0].prodSaleRange.length > 0) {
                                    var saleRange = response.data[0].prodSaleRange;
                                    for (let i = 0; i < saleRange.length; i++) {
                                        if (i == 0) {
                                            response.data[0].prodSaleRange = saleRange[i]
                                        } else {
                                            response.data[0].prodSaleRange = response.data[0].prodSaleRange + ',' + saleRange[i];
                                        }
                                    }
                                }
                                yufp.clone(response.data[0], _this.activeAddFormdatafl);
                                yufp.clone(response.data[0], _this.activeAddFormdata);
                                yufp.clone(response.data[0], _this.activeAddFormdataother);


                                response.data[0].prodSaleRange = xxx;
                                if (response.data[0].prodSaleRange && response.data[0].prodSaleRange.length > 0) {
                                    var saleRange = response.data[0].prodSaleRange;
                                    for (let i = 0; i < saleRange.length; i++) {
                                        if (i == 0) {
                                            response.data[0].prodSaleRange = saleRange[i]
                                        } else {
                                            response.data[0].prodSaleRange = response.data[0].prodSaleRange + ',' + saleRange[i];
                                        }
                                    }
                                }
                                yufp.clone(response.data[0], _this.activeAddFormdatafl);
                                yufp.clone(response.data[0], _this.activeAddFormdata);
                                yufp.clone(response.data[0], _this.activeAddFormdataother);

                            }

                        }
                    });
                },
                getMap: function(time) {
                    var _this = this;
                    var chartDom = document.getElementById(_this.mainid);
                    var myChart = chartDom && echarts.init(chartDom);
                    var paramslist = {
                        prodCode: this.prodData.prodCode,
                        srcProdCode: this.prodData.srcProdCode,
                        range: time
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/acrmfpdprodinfo/productnetvalueinfoquery',
                        data: {
                            condition: JSON.stringify(paramslist)
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.zxdata = response.data;
                                var base = 0;
                                myChart.setOption(
                                    (option = {
                                        tooltip: {
                                            trigger: 'axis',
                                            axisPointer: {
                                                type: 'cross',
                                                animation: false,
                                                label: {
                                                    backgroundColor: '#ccc',
                                                    borderColor: '#aaa',
                                                    borderWidth: 1,
                                                    shadowBlur: 0,
                                                    shadowOffsetX: 0,
                                                    shadowOffsetY: 0,
                                                    color: '#222'
                                                }
                                            },
                                            formatter: function(params) {
                                                return (
                                                    params[2].name +
                                                    '<br />' +
                                                    // ((params[2].value - base) * 100).toFixed(1) +
                                                    // '%'
                                                    (params[2].value - base).toFixed(4)
                                                );
                                            }
                                        },
                                        grid: {
                                            left: '3%',
                                            right: '4%',
                                            bottom: '3%',
                                            containLabel: true
                                        },
                                        xAxis: {
                                            type: 'category',
                                            data: _this.zxdata.map(function(item) {
                                                return item.dataDate;
                                            }),
                                            axisLabel: {
                                                formatter: function(value, idx) {
                                                    var date = new Date(value);
                                                    return idx === 0 ?
                                                        value : [date.getMonth() + 1, date.getDate()].join('-');
                                                }
                                            },
                                            //设置轴线的属性
                                            axisLine: {
                                                lineStyle: {
                                                    color: '#ccc'
                                                }
                                            },
                                            boundaryGap: false
                                        },
                                        yAxis: {
                                            axisLabel: {
                                                formatter: function(val) {
                                                    // return (val - base) * 100 + '%';
                                                    return val - base;

                                                }
                                            },
                                            axisPointer: {
                                                label: {
                                                    formatter: function(params) {
                                                        // return ((params.value - base) * 100).toFixed(1) + '%';
                                                        return (params.value - base).toFixed(4);

                                                    }
                                                }
                                            },
                                            //设置轴线
                                            axisLine: {
                                                lineStyle: {
                                                    color: '#ccc'
                                                }
                                            },
                                            splitNumber: 5
                                        },
                                        series: [{
                                                name: 'L',
                                                type: 'line',
                                                data: _this.zxdata.map(function(item) {
                                                    return item.l + base;
                                                }),
                                                lineStyle: {
                                                    opacity: 0
                                                },
                                                stack: 'confidence-band',
                                                symbol: 'none'
                                            },
                                            {
                                                name: 'U',
                                                type: 'line',
                                                data: _this.zxdata.map(function(item) {
                                                    return item.u - item.l;
                                                }),
                                                lineStyle: {
                                                    opacity: 0
                                                },
                                                areaStyle: {
                                                    color: '#ccc'
                                                },
                                                stack: 'confidence-band',
                                                symbol: 'none'
                                            },
                                            {
                                                type: 'line',
                                                data: _this.zxdata.map(function(item) {
                                                    return item.unitNetValue + base;
                                                }),
                                                itemStyle: {
                                                    color: '#AC3B2A'
                                                },
                                                showSymbol: false
                                            }
                                        ]
                                    })
                                );
                                option && myChart.setOption(option);
                            }
                        }
                    });
                },
                /**
                 * 附件上传->检查上传文件大小和类型
                 */
                beforeAvatarUpload: function(file) {
                    var isLt10M = file.size / 1024 / 1024 < 50;
                    if (!isLt10M) {
                        this.$message.error('上传文件大小不能超过 50MB!');
                    }
                    var index = file.name.lastIndexOf('.');
                    var ext = file.name.substr(index + 1);
                    var fileType = ['image/jpeg', 'image/gif', 'image/png', 'image/bmp', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/x-rar', 'application/x-zip-compressed', 'application/java-archive', 'image/gif', 'image/bmp', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/x-tar', 'application/octet-stream', 'application/x-rar-compressed'];
                    var count = 0;
                    var fileCheck = true;
                    for (var i in fileType) {
                        if (file.type == fileType[i] || ext == 'rar') {
                            count++;
                        }
                    }
                    if (count == 0) {
                        fileCheck = false;
                        this.$message.error('上传文件应为图片、文本、表格、压缩包格式！');
                    }
                    return fileCheck && isLt10M;
                },
                allowLoadFn: function(val) {
                    // var dataarr = [{ value: "基金管理台", key: "6" },
                    // { value: "理财前台", key: "5" },
                    // { value: "柜台交易", key: "0" },
                    // { value: "自助查询终端", key: "1" },
                    // { value: "电话银行", key: "2" },
                    // { value: "ATM、CDM", key: "3" },
                    // { value: "TA发起", key: "4" }
                    // ]
                    var dataarr = this.dataCode.channel;
                    var returnval = '';
                    if (val && val.length > 1) {
                        for (let i = 0; i < dataarr.length; i++) {
                            for (let j = 0; j < val.length; j++) {
                                if (val[j] == dataarr[i].key) {
                                    if (returnval.length == 0) {
                                        returnval = returnval + dataarr[i].value;
                                    } else {
                                        returnval = returnval + ',' + dataarr[i].value;

                                    }
                                }
                            }
                        }
                    }
                    if (returnval) {
                        return returnval;
                    }
                },
                orgFn: function(val) {
                    // var dataarr = [
                    //     { key: '0000', value: '总行部门' },
                    //     { key: '0400', value: '北京分行' },
                    //     { key: '0700', value: '成都分行' },
                    //     { key: '0900', value: '大连分行' },
                    //     { key: '6500', value: '福州分行' },
                    //     { key: '1100', value: '广州分行' },
                    //     { key: '5600', value: '哈尔滨分行' },
                    //     { key: '3100', value: '杭州分行' },
                    //     { key: '4900', value: '合肥分行' },
                    //     { key: '6100', value: '济南分行' },
                    //     { key: '5800', value: '昆明分行' },
                    //     { key: '6800', value: '南昌分行' },
                    //     { key: '4300', value: '南京分行' },
                    //     { key: '6600', value: '南宁分行' },
                    //     { key: '5900', value: '宁波分行' },
                    //     { key: '3500', value: '青岛分行' },
                    //     { key: '2000', value: '厦门分行' },
                    //     { key: '1700', value: '上海分行' },
                    //     { key: '1400', value: '深圳分行' },
                    //     { key: '7100', value: '深圳前海分行' },
                    //     { key: '3900', value: '沈阳分行' },
                    //     { key: '5100', value: '石家庄分行' },
                    //     { key: '5300', value: '苏州分行' },
                    //     { key: '3700', value: '天津分行' },
                    //     { key: '4700', value: '乌鲁木齐分行' },
                    //     { key: '4100', value: '武汉分行' },
                    //     { key: '2200', value: '西安分行' },
                    //     { key: '5700', value: '长沙分行' },
                    //     { key: '5500', value: '郑州分行' },
                    //     { key: '3300', value: '重庆分行' },
                    //     { key: '2300', value: '珠海分行' }
                    // ]
                    var dataarr = yufp.lookup.find('ORG_BRACH');
                    var returnval = '';
                    var val;
                    if (val && val.length > 0) {
                        val = val.split(",");
                        for (let i = 0; i < dataarr.length; i++) {
                            for (let j = 0; j < val.length; j++) {
                                if (val[j] == dataarr[i].key) {
                                    if (returnval.length == 0) {
                                        returnval = returnval + dataarr[i].value;
                                    } else {
                                        returnval = returnval + ',' + dataarr[i].value;

                                    }
                                }
                            }
                        }

                    }
                    if (returnval) {
                        return returnval
                    }
                },
                allowLoadFnclass: function(val) {
                    // var dataarr = [{ value: "普通个人", key: "0" },
                    // { value: "PVB个人", key: "1" },
                    // { value: "显卓个人", key: "2" },
                    // { value: "普通机构", key: "5" },
                    // { value: "PVB机构", key: "6" },
                    // ]
                    var dataarr = this.dataCode.custProp;
                    var returnval = '';
                    if (val && val.length > 1) {
                        for (let i = 0; i < dataarr.length; i++) {
                            for (let j = 0; j < val.length; j++) {
                                if (val[j] == dataarr[i].key) {
                                    if (returnval.length == 0) {
                                        returnval = returnval + dataarr[i].value;
                                    } else {
                                        returnval = returnval + ',' + dataarr[i].value;

                                    }
                                }
                            }
                        }
                    }
                    if (returnval) {
                        return returnval;
                    }
                },
            },
            mounted: function() {
                this.lookupdata();
                this.focusFn();
                this.getbaseData();
                var startThree = this.prodData.prodCode.substring(0, 3);
                var startFive = this.prodData.prodCode.substring(0, 5);
                if (startThree == '101') {
                    this.cplb = '存款';
                    this.cunkuan = true;
                } else if (startThree == '103') {
                    this.cplb = '保险';
                    this.baoxian = true;
                } else if (startThree == '201') {
                    this.cplb = '贷款';
                    this.daikuan = true;
                } else if (startThree == '202') {
                    this.cplb = '信用卡';
                    this.xinyongka = true;
                } else {
                    if (startFive == '10201') {
                        this.cplb = '结构化理财';
                        this.licai = false;
                        this.jiegouhua = true;
                    } else if (startFive == '10202') {
                        this.cplb = '信托';
                        this.licai = false;
                        this.licaijst = false;
                        this.xintuo = true;
                    } else if (startFive == '10203') {
                        this.cplb = 'QDII';
                        this.licai = false;
                        this.licaijst = false;
                        this.qdii = true;
                    } else if (startFive == '10204') {
                        // this.licai = false;
                        this.daishoufu = true;
                    } else if (startFive == '10205') {
                        this.cplb = '人民币基金';
                        this.licai = false;
                        this.licaijst = false;
                        this.renminbi = true;
                    } else if (startFive == '10206') {
                        this.cplb = '代销信托';
                        this.licai = false;
                        this.licaijst = false;
                        this.daixiaoxt = true;
                    } else if (startFive == '10207') {
                        this.cplb = '资管';
                        this.licai = false;
                        this.licaijst = false;
                        this.ziguan = true;
                    }
                }
            },
        });
    };
});