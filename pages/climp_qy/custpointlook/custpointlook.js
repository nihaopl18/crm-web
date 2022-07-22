/**
 * @Created by hujun3 hujun3@yusys.com.cn on 2019-2-27 14:34:05.
 * @updated by
 * @description 商户管理
 */
define(['pages/climp_qy/merchantInfoManager/merchantInfoMananger.css',
    './custom/widgets/js/yufpInstuOrgTree.js',
    'custom/widgets/js/YufpWfInit.js',
    'pages/climp_qy/custpointlook/ordercomp.js',
    'custom/widgets/js/yufpMerchantSelector.js',
    'pages/climp_qy/giftmanager/pointExchange/pointExchange.css',
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('IDENT_TYPE,MANAGE_A_TYPE,MANAGE_B_TYPE,MERCHANT_STS,ADDRESS_TYPE,DEM0100011,XD000037,CONTACT_TYPE,CD0011,CD0069,CD0348');

        yufp.custom.vue({
            el: cite.el,
            data: function() {
                var _this = this;
                // 发证国家校验
                var checkcountry = function(rule, value, callback) {
                    if ((_this.formone.certType || _this.formone.certNo) && !value) {
                        return callback(new Error('请选择发证国家'));
                    } else if (!(_this.formone.certType || _this.formone.certNo) && !value) {
                        _this.$refs.refone.clearValidate('issCountry');
                        callback();
                    } else {
                        callback();
                    }
                };
                // 证件类型校验
                var checkID = function(rule, value, callback) {
                    if ((_this.formone.issCountry || _this.formone.certNo) && !value) {
                        return callback(new Error('请选择证件类型'));
                    } else if (!(_this.formone.issCountry || _this.formone.certNo) && !value) {
                        _this.$refs.refone.clearValidate('certType');
                        callback();
                    } else {
                        callback();
                    }
                };
                // 证件号码校验
                var checkCertNo = function(rule, value, callback) {
                    if ((_this.formone.issCountry || _this.formone.certType) && !value) {
                        return callback(new Error('请输入证件号码'));
                    } else if (!(_this.formone.issCountry || _this.formone.certType) && !value) {
                        _this.$refs.refone.clearValidate('certNo');
                        callback();
                    } else {
                        callback();
                    }
                };
                return {
                    // dataUrl: '/api/loyqymerchantinfo/query',
                    dataUrl: '/api/scorequery/list', //查询接口
                    pointdataUrl: '/api/scorequery/detail',
                    orderdataUrl: '/api/loyqymerchantinfo/queryaddressinfo',
                    derdataUrl: '/api/loyacorderlist/query',
                    giftdataUrl: '/api/loyqycommodityinfo/commlist',
                    pointdialogVisible: false,
                    orderdialogVisible: false,
                    orderdetailable: false,
                    giftdialogVisible: false,
                    perInfo: {},
                    sysmineInfo: [],
                    formone: {},
                    formDisabled: true,
                    formdatalpxx: {
                        commodityStgNum: 11
                    }, //礼品信息
                    formdatalpms: {}, //礼品描述
                    formdatadhsx: {}, //兑换属性
                    tableUrl: '/api/acrmfpdprodinfo/productcustfitinfoquery',
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: data.prodCode
                        })
                    },
                    reportUpLoadBusNo: { busNo: data.prodCode },
                    uploadVisible: true,
                    pic: false,
                    exchangedialogVisible: false,
                    rule: {
                        amoOfIns: [
                            { required: true, message: '字段不能为空', trigger: 'blur' },
                            { validator: yufp.validator.number, message: '请输入数字' }
                        ],
                        iscountryRule: [{ validator: checkcountry, trigger: 'change' }],
                        IDTypeRule: [{ validator: checkID, trigger: 'change' }],
                        certNoRule: [{ validator: checkCertNo, trigger: 'blur' }],
                    },
                    forqueryFormdata: {},
                    orderpointcustId: '',
                    orderFormdata: {},
                    pointcustId: '',
                    giftcustName: '', //客户名称
                    giftcustId: '', // 客户号
                    giftopint: '', //可用积分
                    giftCode: '', //礼品编号
                    attrlist: [],
                    attrdzlist: [], //地址
                    attrdiclist: [], //有字典的
                    dataSqlTemp: {},
                    dataDicTempoption: {},
                    dataDicTemp: {},
                    datadzTemp: { dzsf: '', dzsq: '', dzqj: '', yjdz: '' },
                    datadzarr: '',
                    povinceOptions: [], // 省份
                    cityOptions: [], // 城市
                    areaOptions: [], // 县区
                    signvRule: [{ required: true, message: '值不能为空' }, ],
                    duihuanBotton: false
                };
            },
            mounted: function() {
                this.getProvinceOptions()
            },
            computed: {},
            methods: {
                searchFn: function() {
                    var _this = this;
                    var validate = false;
                    _this.$refs.refone.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var param = {
                        condition: JSON.stringify(_this.formone)
                    };
                    _this.$refs.refTable.remoteData(param);
                },
                resetFormFn: function() {
                    this.$refs.refone.resetFields();

                },
                // 通过国家获取省信息
                getProvinceOptions: function(data) {
                    var _this = this;
                    _this.povinceOptions = [];
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/loyqymerchantinfo/province',
                        callback: function(code, message, response) {
                            var da = response.data;
                            for (var i = 0; i < da.length; i++) {
                                var provin = {};
                                provin.key = da[i].provinceCode;
                                provin.value = da[i].provinceName;
                                _this.povinceOptions.push(provin);
                            }
                        }
                    });
                },
                // 通过省获取城市信息
                getCityOptions: function(data) {
                    var _this = this;
                    var paramModel = {
                        condition: JSON.stringify({
                            provinceCode: data
                        })
                    };
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/loyqymerchantinfo/city',
                        data: paramModel,
                        callback: function(code, message, response) {
                            var da = response.data;
                            _this.cityOptions = [];
                            for (var i = 0; i < da.length; i++) {
                                var city = {};
                                city.key = da[i].cityCode;
                                city.value = da[i].cityName;
                                _this.cityOptions.push(city);
                            }
                        }
                    });
                },
                // 通过城市获取区县信息
                getAreaOptions: function(data) {
                    var _this = this;
                    var paramModel = {
                        condition: JSON.stringify({
                            cityCode: data
                        })
                    };
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/loyqymerchantinfo/area',
                        data: paramModel,
                        callback: function(code, message, response) {
                            var da = response.data;
                            _this.areaOptions = [];
                            for (var i = 0; i < da.length; i++) {
                                var area = {};
                                area.key = da[i].areaCode;
                                area.value = da[i].areaName;
                                _this.areaOptions.push(area);
                            }
                        }
                    });
                },
                ordersearchFn: function() {
                    var _this = this;
                    _this.$nextTick(function() {
                        var params = {};
                        params.custId = _this.pointcustId;
                        params.startDate = _this.orderFormdata.startDate || '';
                        params.endDate = _this.orderFormdata.endDate || '';
                        var param = {
                            condition: JSON.stringify(params)
                        };
                        _this.$refs.orderrefTable.remoteData(param);
                    });
                },
                orderresetMainFn: function() {
                    var _this = this;
                    _this.orderFormdata = {};
                },
                pointsearchFn: function() {
                    var _this = this;
                    _this.$nextTick(function() {
                        var params = {};
                        params.custId = _this.orderpointcustId;
                        params.startDate = _this.forqueryFormdata.startDate || '';
                        params.endDate = _this.forqueryFormdata.endDate || '';
                        var param = {
                            condition: JSON.stringify(params)
                        };
                        _this.$refs.pointrefTable.remoteData(param);
                    });


                },
                pointresetMainFn: function() {
                    var _this = this;
                    _this.forqueryFormdata = {};
                },
                exchangenum: function() {
                    var price = (this.formdatalpxx.commodityStgNum + '').replace(/[^0-9]/ig, "");
                    if (price && this.formdatadhsx.changeCount) {
                        this.$nextTick(function() {
                            this.formdatadhsx.commodityMValue = price * (this.formdatadhsx.changeCount);
                        });
                    }
                },
                picfn: function() {
                    this.pic = !this.pic;
                },
                fileIdToURL: function(fileId) {
                    var url = yufp.settings.ssl ? 'https://' : 'http://';
                    url += yufp.settings.url;
                    url += backend.fileService;
                    url += '/api/file/provider/download?fileId=comm/' + fileId;
                    return yufp.util.addTokenInfo(url);
                },

                //积分明细查询
                pointdetaillook: function() {
                    var _this = this;
                    var selectionsAry = _this.$refs.refTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = _this.$refs.refTable.selections[0];

                    _this.pointdialogVisible = true;
                    _this.orderpointcustId = obj.custId;
                    // _this.orderpointcustId = obj.merchantId;
                    _this.pointsearchFn();

                },
                // 订单查询
                orderlook: function() {
                    var _this = this;
                    var selectionsAry = _this.$refs.refTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = _this.$refs.refTable.selections[0];
                    this.orderdialogVisible = true;
                    _this.pointcustId = obj.custId;
                    // _this.pointcustId = obj.merchantId;
                    _this.ordersearchFn();
                },
                // 兑换礼品
                exchangegift: function() {
                    var _this = this;
                    var selectionsAry = _this.$refs.refTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = _this.$refs.refTable.selections[0];
                    _this.giftcustName = obj.custName || '';
                    _this.giftcustId = obj.custId || '';
                    _this.giftopint = obj.useableScore || '';
                    this.giftdialogVisible = true;
                },
                // 积分明细查询关闭按钮
                pointcancel: function() {
                    var _this = this;
                    this.pointdialogVisible = false;
                },
                // 订单查询关闭按钮
                ordercancel: function() {
                    var _this = this;
                    this.orderdialogVisible = false;
                },
                // 订单详情
                orderdetail: function() {
                    var _this = this;
                    var selectionsAry = _this.$refs.orderrefTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = _this.$refs.orderrefTable.selections[0];
                    _this.perInfo.orderId = obj.orderId;
                    this.orderdetailable = true;
                },
                // 订单详情关闭
                orderdetailcancel: function() {
                    this.orderdetailable = false;
                },
                // 礼品兑换页面关闭
                giftcancel: function() {
                    this.giftdialogVisible = false;
                },
                // 礼品兑换关闭
                exchangecancel: function() {
                    this.exchangedialogVisible = false;
                },
                // 礼品展示下一步
                nexttickfn: function() {
                    var _this = this;
                    _this.sysmineInfo = [];
                    _this.formdatalpx = {};
                    _this.formdatadhsx.changeCount = '';
                    _this.formdatadhsx.commodityMValue = '';
                    _this.dataSqlTemp = {};
                    var selectionsAry = _this.$refs.giftrefTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = _this.$refs.giftrefTable.selections[0];
                    _this.giftCode = obj.commodityCode || '';
                    _this.$nextTick(function() {
                        //礼品信息
                        _this.formdatalpxx.commodityCode = obj.commodityCode || '';
                        _this.formdatalpxx.commodityName = obj.commodityName || '';
                        _this.formdatalpxx.commodityMValue = obj.commodityVFlag || '';
                        // _this.formdatalpxx.commodityStgNum = obj.commodityTValue || '';
                        _this.formdatalpxx.commodityStgNum = obj.commodityLValue || '';
                        _this.formdatalpxx.stgAlarm = obj.commodityStgNum || '';
                        //礼品描述
                        _this.formdatalpms.commodityDescTemp = obj.commodityDesc || '';
                        _this.formdatalpms.commodityLValue = obj.commodityRemark || '';

                    });

                    var param = { id: obj.id || '' };
                    yufp.service.request({
                        method: 'GET',
                        url: backend.productService + '/api/loyqycommodityinfo/detail',
                        data: param,
                        async: false,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                if (response.data.pic && response.data.pic.length > 0) {
                                    let picarr = response.data.pic;
                                    for (let i = 0; i < picarr.length; i++) {
                                        _this.sysmineInfo.push({ name: picarr[i].pictureName, url: _this.fileIdToURL(picarr[i].picturePath) })
                                    }
                                }
                                if (response.data.attr && response.data.attr.length > 0) {
                                    let attrarr = response.data.attr;
                                    _this.attrdzlist = [];
                                    _this.attrdiclist = [];
                                    _this.attrlist = [];
                                    for (let i = 0; i < attrarr.length; i++) {
                                        if (attrarr[i].attrKink == '80') {
                                            _this.attrdzlist.push(attrarr[i]); //地址兑换属性
                                        } else {
                                            if (attrarr[i].ifDict == '1') {
                                                _this.attrdiclist.push(attrarr[i]); // 有字典的兑换属性
                                            } else {
                                                _this.attrlist.push(attrarr[i]); // 没有字典的兑换属性

                                            }
                                        }
                                    }
                                }

                                // 请求字典
                                for (let i = 0; i < _this.attrdiclist.length; i++) {
                                    yufp.lookup.reg(_this.attrdiclist[i].dictCode);
                                    _this.dataDicTempoption[_this.attrdiclist[i].attrId] = yufp.lookup.find(_this.attrdiclist[i].dictCode);
                                }
                            }
                        }
                    });
                    _this.exchangedialogVisible = true;

                },
                // 礼品兑换
                exchangefn: function() {
                    let _this = this;
                    var arrAttr = [];
                    _this.datadzarr = '';
                    var regphone = /^1[3-9][0-9]\d{8}$/; //手机号
                    var regemail = /[A-Za-z0-9_-]+[@](\S*)(net|com|cn|org|cc|tv|[0-9]{1,3})(\S*)/g; //邮箱
                    var regtel = /(^\d{3}\-\d{7,8}$)|(^\d{4}\-\d{7,8}$)|(^\d{3}\d{7,8}$)|(^\d{4}\d{7,8}$)|(^\d{7,8}$)/; // 固定号码
                    // 兑换数量
                    var price = (this.formdatalpxx.commodityStgNum + '').replace(/[^0-9]/ig, "");
                    if (!this.formdatadhsx.changeCount) {
                        _this.$message({ message: '兑换数量不允许为空', type: 'warning' });
                        return;
                    }
                    if (price && this.formdatadhsx.changeCount) {
                        if (this.formdatadhsx.commodityMValue > _this.giftopint) {
                            _this.$message({ message: '兑换积分已超过可用积分', type: 'warning' });
                            return;
                        }
                    }
                    // 除了地址的其他属性
                    if (_this.attrlist.length != 0 && Object.keys(_this.dataSqlTemp).length != _this.attrlist.length) {
                        _this.$message({ message: '兑换属性不允许为空', type: 'warning' });
                        return;
                    } else {
                        for (let i = 0; i < _this.attrlist.length; i++) {
                            var objval = _this.dataSqlTemp[_this.attrlist[i].attrId];
                            if (_this.attrlist[i].attrKink == '50') {
                                if (!regemail.test(objval)) {
                                    _this.$message({ message: _this.attrlist[i].attrName + '的格式不对', type: 'warning' });
                                    return;
                                }
                            } else if (_this.attrlist[i].attrKink == '60') {
                                if (!regphone.test(objval)) {
                                    _this.$message({ message: _this.attrlist[i].attrName + '的格式不对', type: 'warning' });
                                    return;
                                }
                            } else if (_this.attrlist[i].attrKink == '70') {
                                console.log(regtel);
                                if (!regtel.test(objval)) {
                                    _this.$message({ message: _this.attrlist[i].attrName + '的格式不对', type: 'warning' });
                                    return;
                                }
                            }

                        }
                    }
                    // 请求时带过去的非地址的兑换属性
                    for (let i = 0; i < _this.attrlist.length; i++) {
                        var objval = _this.dataSqlTemp[_this.attrlist[i].attrId];
                        _this.attrlist[i].attrDesc = objval;
                    }

                    if (_this.attrdiclist.length != 0 && Object.keys(_this.dataDicTemp).length != _this.attrdiclist.length) {
                        _this.$message({ message: '兑换属性不允许为空', type: 'warning' });
                        return;
                    }
                    // 下拉框的拓展属性
                    for (let i = 0; i < _this.attrdiclist.length; i++) {
                        var objval = _this.dataDicTemp[_this.attrdiclist[i].attrId];
                        _this.attrdiclist[i].attrDesc = objval;
                    }
                    //码值转为中文
                    for (let i = 0; i < this.povinceOptions.length; i++) {
                        if (this.povinceOptions[i].key == this.datadzTemp.dzsf) {
                            this.datadzTemp.dzsf = this.povinceOptions[i].value;
                        }
                    }
                    for (let i = 0; i < this.cityOptions.length; i++) {
                        if (this.cityOptions[i].key == this.datadzTemp.dzsq) {
                            this.datadzTemp.dzsq = this.cityOptions[i].value;
                        }
                    }
                    for (let i = 0; i < this.areaOptions.length; i++) {
                        if (this.areaOptions[i].key == this.datadzTemp.dzqj) {
                            this.datadzTemp.dzqj = this.areaOptions[i].value;
                        }
                    }
                    // 地址
                    if (_this.attrdzlist.length == 1) {
                        if (_this.datadzTemp.dzsf != '' && _this.datadzTemp.dzsq != '' && _this.datadzTemp.dzqj != '' && _this.datadzTemp.yjdz != '') {
                            _this.datadzarr = _this.datadzTemp.dzsf + _this.datadzTemp.dzsq + _this.datadzTemp.dzqj + _this.datadzTemp.yjdz;
                            _this.attrdzlist.attrDesc = _this.datadzarr;
                        } else {
                            _this.$message({ message: '兑换属性不允许为空', type: 'warning' });
                            return;
                        }
                    }
                    arrAttr = arrAttr.concat(_this.attrlist, _this.attrdzlist, _this.attrdiclist);
                    var param = {
                        custId: _this.giftcustId,
                        commodityCode: _this.giftCode,
                        changeCount: this.formdatadhsx.changeCount,
                        extendArr: arrAttr
                    }
                    _this.duihuanBotton = true;
                    yufp.service.request({
                        method: 'POST',
                        url: backend.productService + '/api/scoreadjust/exch',
                        data: param,
                        async: false,
                        callback: function(code, message, response) {
                            setTimeout(function() {
                                _this.duihuanBotton = false;
                            }, 3000);
                            if (response.code == '0') {
                                _this.$message({ message: '兑换成功', type: 'warning' });
                                _this.exchangedialogVisible = false;
                            } else {
                                _this.$message({ message: response.message, type: 'warning' });
                            }
                        }
                    });
                },
                // 礼品兑换上一步
                uptick: function() {
                    this.exchangedialogVisible = false;
                }
            }
        });
    };
});