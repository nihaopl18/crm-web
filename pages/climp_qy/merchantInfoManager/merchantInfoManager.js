/**
 * @Created by hujun3 hujun3@yusys.com.cn on 2019-2-27 14:34:05.
 * @updated by
 * @description 商户管理
 */
define(['pages/climp_qy/merchantInfoManager/merchantInfoMananger.css',
    './custom/widgets/js/yufpInstuOrgTree.js',
    'custom/widgets/js/YufpWfInit.js'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('IDENT_TYPE,MANAGE_A_TYPE,MANAGE_B_TYPE,MERCHANT_STS,WF_APP_STATUS,IF_FLAG,ADDRESS_TYPE,DEM0100011,XD000037,CONTACT_TYPE,CD0011,CD0348');
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var generateMixed = function generateMixed(n) {
            var res = '';
            for (var i = 0; i < n; i++) {
                var id = Math.ceil(Math.random() * 35);
                res += chars[id];
            }
            return res;
        };
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    dataUrl: '/api/loyqymerchantinfo/query',
                    contactUrl: '/api/loyqymerchantinfo/querycontactinfo',
                    addressUrl: '/api/loyqymerchantinfo/queryaddressinfo',
                    uploadAction: yufp.service.getUrl({ url: backend.gatewayService + backend.fileService + '/api/file/provider/uploadfile?access_token=' + yufp.service.getToken() }),
                    imageUrl: '',
                    dialogVisibleImage: false,
                    dialogImageUrl: '',
                    ifshowOther: false, // 是否显示联系信息和地址信息区域
                    contactParams: {},
                    addressParams: {},
                    instuParams: { instuValue: yufp.session.instu.code },
                    povinceOptions: [], // 省份
                    cityOptions: [], // 城市
                    areaOptions: [], // 县区
                    povinceAll: [],
                    cityAll: [],
                    areaAll: [],
                    formData: {},
                    contactformdata: {},
                    addressformdata: {},
                    instuOptions: [],
                    applydialogVisible: false,
                    ApplyTitle: '',
                    applyformdata: {},
                    defultInstu: yufp.session.instu.code,
                    wfCommonParams: {
                        sessionInstuCde: yufp.session.instu.code,
                        sessionOrgCode: yufp.session.org.code,
                        sessionLoginCode: yufp.session.user.loginCode
                    },
                    dialogVisible: false,
                    formDisabled: false,
                    isShow: false,
                    viewType: 'DETAIL',
                    tabName: 'contact', //
                    contactviewTitle: '新增联系信息',
                    contactdialogVisible: false,
                    addressviewTitle: '新增地址信息',
                    addressdialogVisible: false,
                    merchantId: '', // 商户编号
                    rules: {
                        merchantCode: [{ required: true, message: '字段不能为空' }, { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }],
                        merchantName: [{ required: true, message: '字段不能为空' }, { max: 150, message: '长度不能超过150个字符', trigger: 'blur' }],
                        merIacName: [{ max: 150, message: '长度不能超过150个字符', trigger: 'blur' }],
                        merStroeName: [{ max: 150, message: '长度不能超过150个字符', trigger: 'blur' }],
                        legalPersonNm: [{ max: 100, message: '长度不能超过100个字符', trigger: 'blur' }],
                        shopownerNm: [{ max: 100, message: '长度不能超过100个字符', trigger: 'blur' }],
                        linkman: [{ max: 100, message: '长度不能超过100个字符', trigger: 'blur' }],
                        // instuCde: [ {max: 50, message: '长度不能超过50个字符', trigger: 'blur'},
                        //   { validator: yufp.validator.telephone, message: '固定电话、小灵通电话或者手机号', trigger: 'change' }],
                        certNo: [{ required: true, message: '字段不能为空' }, { max: 80, message: '长度不能超过80个字符', trigger: 'blur' },
                            { validator: yufp.validator.numberAndLetter, message: '字段只能为字母和数字', trigger: 'change' }
                        ],
                        buseHours: [{ max: 100, message: '长度不能超过100个字符', trigger: 'blur' }],
                        merRemark: [{ max: 700, message: '长度不能超过700个字符', trigger: 'blur' }],
                        manageContent: [{ max: 1400, message: '长度不能超过1400个字符', trigger: 'blur' }],
                        phoneInfo: [{ required: true, message: '字段不能为空' }, { max: 50, message: '长度不能超过50个字符', trigger: 'blur' },
                            { validator: yufp.validator.telephone, message: '固定电话、小灵通电话或者手机号', trigger: 'change' }
                        ],
                        emailInfo: [{ required: true, message: '字段不能为空' }, { max: 50, message: '长度不能超过50个字符', trigger: 'blur' },
                            { validator: yufp.validator.email, message: '邮件地址', trigger: 'change' }
                        ],
                    },
                    contactrules: {
                        contactInfo: [{ required: true, message: '字段不能为空' }, { max: 50, message: '长度不能超过50个字符', trigger: 'blur' },
                            { validator: yufp.validator.telephone, message: '固定电话、小灵通电话或者手机号', trigger: 'change' }
                        ],
                        contactOrader: [{ max: 80, message: '长度不能超过10个字符', trigger: 'blur' },
                            { validator: yufp.validator.number, message: '字段只能为数字', trigger: 'change' }
                        ]
                    },
                    addressrules: {
                        postNo: [{ required: true, message: '字段不能为空' }, { max: 10, message: '长度不能超过10个字符', trigger: 'blur' },
                            { validator: yufp.validator.postcode, message: '邮政编码', trigger: 'change' }
                        ],
                        addressInfo: [{ required: true, message: '字段不能为空' }, { max: 400, message: '长度不能超过400个字符', trigger: 'blur' }]
                    },
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    saveBtnShow: true,
                    uploadTitle: 'Excel表导入商户',
                    uploadInfoVisible: false,
                    uploadDialog: false,
                    fileList: [],
                    action: yufp.service.getUrl({
                        url: '/api/loyqymerchantinfo/uploadmerchantlist'
                    }),
                    headers: {
                        'Authorization': 'Bearer ' + yufp.service.getToken()
                    },
                    uploaddata: {
                        createOrg: yufp.session.org.id,
                        flag: '0'
                    },
                };
            },
            mounted: function() {
                var _this = this;
                _this.queryInstuFn();
                var paramModel = {
                    condition: JSON.stringify({})
                };
                yufp.service.request({
                    method: 'GET',
                    url: '/api/loyqymerchantinfo/province',
                    callback: function(code, message, response) {
                        var da = response.data;
                        _this.povinceAll = [];
                        for (var i = 0; i < da.length; i++) {
                            var provin = {};
                            provin.key = da[i].provinceCode;
                            provin.value = da[i].provinceName;
                            _this.povinceAll.push(provin);
                        }
                    }
                });
                yufp.service.request({
                    method: 'GET',
                    url: '/api/loyqymerchantinfo/city',
                    data: paramModel,
                    callback: function(code, message, response) {
                        var da = response.data;
                        _this.cityAll = [];
                        for (var i = 0; i < da.length; i++) {
                            var city = {};
                            city.key = da[i].cityCode;
                            city.value = da[i].cityName;
                            _this.cityAll.push(city);
                        }
                    }
                });
                yufp.service.request({
                    method: 'GET',
                    url: '/api/loyqymerchantinfo/area',
                    data: paramModel,
                    callback: function(code, message, response) {
                        var da = response.data;
                        _this.areaAll = [];
                        for (var i = 0; i < da.length; i++) {
                            var area = {};
                            area.key = da[i].areaCode;
                            area.value = da[i].areaName;
                            _this.areaAll.push(area);
                        }
                    }
                });
            },
            methods: {
                // 通过国家获取省信息
                getProvinceOptions: function(data) {
                    var _this = this;
                    _this.povinceOptions = [];
                    if (data == '156') {
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
                    }
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
                // 日期格式化(年月日)
                dateFormatterSimple: function(row, column) {
                    var datetime = row[column.property];
                    if (datetime === undefined) {
                        return '';
                    }
                    return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
                },
                // 打开视图的方法
                openViewFn: function() {
                    var _this = this;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var customKey = 'custom_view' + _this.$refs.refTable.selections[0].merchantName; // 请以custom_view前缀开头，并且全局唯一
                    // var routeId = 'custView' + this.$refs.reftable.selections[0].custType; // 模板示例->普通查询的路由ID
                    var routeId = 'merchantBase';
                    yufp.frame.addTab({
                        id: routeId, // 菜单功能ID（路由ID）
                        key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                        title: '商户视图:' + _this.$refs.refTable.selections[0].merchantName, // 页签名称
                        data: { info: _this.$refs.refTable.selections[0] } // 传递的业务数据，可选配置
                    });
                },
                rowDblclickFn: function(row, event) {
                    var customKey = 'custom_view' + row.merchantName; // 请以custom_view前缀开头，并且全局唯一
                    var routeId = 'custView'; // 模板示例->普通查询的路由ID
                    yufp.frame.addTab({
                        id: routeId, // 菜单功能ID（路由ID）
                        key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                        title: '商户视图:' + row.merchantName, // 页签名称
                        data: { info: row } // 传递的业务数据，可选配置
                    });
                },
                // 查询金融机构
                queryInstuFn: function() {
                    let _this = this;
                    yufp.service.request({
                        url: '/api/loyqycommoditycategory/getinstus',
                        method: 'get',
                        callback: function(code, message, response) {
                            var data = response.data;
                            for (var i = 0; i < data.length; i++) {
                                _this.instuOptions.push(data[i]);
                            }
                        }
                    });
                    // yufp.service.request({
                    //   method: 'GET',
                    //   url: backend.appOcaService + '/api/adminsmorg/getinstuorg',
                    //   callback: function (code, message, response) {
                    //     if (code === 0 && response.code === 0) {
                    //       if (_this.instuOptions.length > 0) {
                    //         _this.instuOptions.splice(0, _this.instuOptions.length);
                    //       }
                    //       var instu = response.data;
                    //       for (var i = 0; i < instu.length; i++) {
                    //         var option = {};
                    //         option.key = instu[i].instuId;
                    //         option.value = instu[i].instuName;
                    //         _this.instuOptions.push(option);
                    //       }
                    //     }
                    //   }
                    // });
                },
                /**
                 * 新增修改表单更改金融机构
                 */
                changeInstuToOrg: function(index) {
                    var _this = this;
                    _this.instuParams.instuValue = index;
                },
                /**
                 * 取消
                 */
                cancelFn: function(type) {
                    var _this = this;
                    if (type == 'merchantFrom') {
                        _this.formData.merchantLogo = '';
                        _this.imageUrl = '';
                        _this.dialogVisible = false;

                    } else if (type == 'contact') {
                        _this.contactdialogVisible = false;
                    } else if (type == 'address') {
                        _this.addressdialogVisible = false;
                    } else if (type == 'applyForm') {
                        _this.applydialogVisible = false;
                    }
                },
                /**
                 * 保存
                 */
                saveFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.formData, model);
                    var validate = false;
                    _this.$refs.refForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var url = '';
                    if (_this.viewType == 'ADD') {
                        url = '/api/loyqymerchantinfo/addmerchantinfo';
                        model.merchantId = yufp.util.dateFormat(new Date(), '{y}{m}{d}{h}{i}{s}') + generateMixed(4);
                    } else if (_this.viewType == 'EDIT') {
                        url = '/api/loyqymerchantinfo/updatemerchantinfo';
                    }
                    // 向后台发送保存请求
                    yufp.service.request({
                        method: 'POST',
                        url: url,
                        data: model,
                        callback: function(code, message, response) {
                            // _this.$refs.refTable.remoteData();
                            _this.$message('操作成功');
                            // _this.saveBtnShow = false;
                            // _this.dialogVisible = false;
                            if (_this.viewType == 'ADD') {
                                yufp.util.butLogInfo(hashCode, '商户管理', '新增');
                                _this.ifshowOther = true;
                                _this.merchantId = model.merchantId;
                                // _this.contactParams = {
                                //   condition: JSON.stringify({
                                //     merchantId: model.merchantId
                                //   })
                                // };
                                var ppp = {
                                    condition: JSON.stringify({
                                        merchantId: model.merchantId
                                    })
                                };
                                _this.$nextTick(function() {
                                    _this.$refs.contactTable.remoteData(ppp);
                                    _this.$refs.addressTable.remoteData(ppp);
                                });
                                // _this.addressParams = {
                                //   condition: JSON.stringify({
                                //     merchantId: model.merchantId
                                //   })
                                // };
                            }
                            if (_this.viewType == 'EDIT') {
                                yufp.util.butLogInfo(hashCode, '商户管理', '修改');

                            }
                        }
                    });
                },
                /**
                 * 维护页面关闭的时候方法
                 */
                closeformFn: function() {
                    let _this = this;
                    if (_this.viewType == 'ADD') {
                        _this.$refs.refTable.remoteData();
                    }
                },
                /**
                 * 保存联系信息
                 */
                saveContactFn: function() {
                    var _this = this;
                    var validate = false;
                    _this.$refs.contactForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    _this.contactformdata.merchantId = _this.merchantId;
                    // 向后台发送保存请求
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/loyqymerchantinfo/editcontactinfo',
                        data: _this.contactformdata,
                        callback: function(code, message, response) {
                            _this.$refs.contactTable.remoteData();
                            _this.$message('操作成功');
                            _this.contactdialogVisible = false;
                        }
                    });
                },
                /**
                 * 保存地址信息
                 */
                saveAddressFn: function() {
                    var _this = this;
                    var validate = false;
                    _this.$refs.addressForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    _this.addressformdata.merchantId = _this.merchantId;
                    // 向后台发送保存请求
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/loyqymerchantinfo/editaddressinfo',
                        data: _this.addressformdata,
                        callback: function(code, message, response) {
                            _this.$refs.addressTable.remoteData();
                            _this.$message('操作成功');
                            _this.addressdialogVisible = false;
                        }
                    });
                },
                /**
                 * 图片url补全
                 */
                comUrlFn: function(path) {
                    let url = yufp.settings.ssl ? 'https://' : 'http://';
                    url += yufp.settings.url;
                    url += backend.fileService;
                    url += '/api/file/provider/download?fileId=' + path;
                    return yufp.util.addTokenInfo(url);
                },
                /**
                 * 图上传成功方法
                 */
                handleAvatarSuccess: function(res, file) {
                    // var url = yufp.settings.ssl ? 'https://' : 'http://';
                    // url += yufp.settings.url;
                    // url += backend.fileService;
                    // url += '/api/file/provider/download?fileId=' + res.data.filePath;
                    this.formData.merchantLogo = res.data.filePath;
                    this.imageUrl = this.comUrlFn(res.data.filePath);
                },
                /**
                 * 上传图片校验方法
                 */
                beforeAvatarUpload1: function(file) {
                    var type = file.type;
                    var size = file.size / 1024 / 1024;
                    if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/jpg') {
                        this.$message.error('上传头像图片只能是 JPG 格式!');
                    }
                    if (size > 2) {
                        this.$message.error('上传头像图片大小不能超过 2MB!');
                    }
                    return type && size;
                },
                /**
                 * 点击图片放大方法
                 */
                handlePictureCardPreview: function(file) {
                    this.dialogImageUrl = file.url;
                    this.dialogVisibleImage = true;
                },
                /**
                 * 控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function(viewType, editable) {
                    var _this = this;
                    _this.viewType = viewType;
                    _this.saveBtnShow = editable;
                    _this.dialogVisible = true;
                    _this.formDisabled = !editable;
                    _this.isShow = !editable;
                },
                /**
                 * 新增按钮
                 */
                addFn: function() {
                    var _this = this;
                    _this.switchStatus('ADD', true);
                    _this.ifshowOther = false;
                    _this.merchantId = '';
                    // _this.queryInstuFn();
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        // _this.$refs.refForm.formdata.instuCde = yufp.session.instu.code;
                        // _this.$refs.refForm.formdata.belongOrg = yufp.session.org.id;
                    });
                },
                /**
                 * 修改
                 */
                modifyFn: function() {
                    var _this = this;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var selection = _this.$refs.refTable.selections[0];
                    // if (selection.wfApprSts != '000' && selection.wfApprSts != '998') {
                    //     _this.$message({ message: '只能选择审批状态是待发起或者否决的数据', type: 'warning' });
                    //     return;
                    // }
                    _this.switchStatus('EDIT', true);
                    _this.ifshowOther = true;
                    // _this.queryInstuFn();
                    _this.merchantId = selection.merchantId;
                    _this.contactParams = {
                        condition: JSON.stringify({
                            merchantId: selection.merchantId
                        })
                    };
                    _this.addressParams = {
                        condition: JSON.stringify({
                            merchantId: selection.merchantId
                        })
                    };
                    _this.imageUrl = _this.comUrlFn(selection.merchantLogo);
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        yufp.clone(selection, _this.formData);
                        _this.$refs.contactTable.remoteData(_this.contactParams);
                        _this.$refs.addressTable.remoteData(_this.addressParams);
                    });
                },
                /**
                 * 详情
                 */
                infoFn: function() {
                    var _this = this;
                    var selectionsAry = _this.$refs.refTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.switchStatus('DETAIL', false);
                    _this.ifshowOther = true;
                    // _this.queryInstuFn();
                    _this.merchantId = selectionsAry[0].merchantId;
                    _this.contactParams = {
                        condition: JSON.stringify({
                            merchantId: selectionsAry[0].merchantId
                        })
                    };
                    _this.imageUrl = _this.comUrlFn(selectionsAry[0].merchantLogo);
                    _this.addressParams = {
                        condition: JSON.stringify({
                            merchantId: selectionsAry[0].merchantId
                        })
                    };
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        yufp.clone(selectionsAry[0], this.formData);
                        _this.$refs.contactTable.remoteData(_this.contactParams);
                        _this.$refs.addressTable.remoteData(_this.addressParams);
                    });
                },
                /**
                 * 删除
                 */
                deleteFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }

                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        // if (selections[i].wfApprSts != '000' && selections[i].wfApprSts != '998') {
                        //     _this.$message({ message: '只能选择审批状态是待发起或者否决的数据', type: 'warning' });
                        //     return;
                        // } else {
                        //     arr.push(selections[i].merchantId);
                        // }
                        arr.push(selections[i].merchantId);

                    }
                    _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqymerchantinfo/deleteinfo?ids=' + arr.join(','),
                                    // data: {
                                    //   ids: arr.join(',')
                                    // },
                                    callback: function(code, message, response) {
                                        _this.$refs.refTable.remoteData();
                                        _this.$message('操作成功');
                                        yufp.util.butLogInfo(hashCode, '商户管理', '删除');
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 启用
                 */
                startUsedFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        // if (selections[i].wfApprSts !== '997' || selections[i].dataSts != 'I') {
                        //     _this.$message({ message: '只能选择审批状态为通过和数据状态为失效的数据', type: 'warning' });
                        //     return;
                        // } else {
                        //     arr.push(selections[i].merchantId);
                        // }
                        arr.push(selections[i].merchantId);

                    }
                    _this.$confirm('此操作将启用选中的数据, 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqymerchantinfo/updatests',
                                    data: {
                                        ids: arr.join(','),
                                        status: 'A'
                                    },
                                    callback: function(code, message, response) {
                                        _this.$refs.refTable.remoteData();
                                        _this.$message('操作成功');
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 停用
                 */
                stpUsedFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].dataSts != 'A') {
                            _this.$message({ message: '只能选择生效的数据', type: 'warning' });
                            return;
                        } else {
                            arr.push(selections[i].merchantId);
                        }
                    }
                    _this.$confirm('此操作将启用选中的数据, 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqymerchantinfo/updatests',
                                    data: {
                                        ids: arr.join(','),
                                        status: 'I'
                                    },
                                    callback: function(code, message, response) {
                                        _this.$refs.refTable.remoteData();
                                        _this.$message('操作成功');
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 联系信息新增按钮
                 */
                addContactFn: function() {
                    var _this = this;
                    _this.contactviewTitle = '新增联系信息';
                    _this.contactdialogVisible = true;
                    _this.$nextTick(function() {
                        _this.$refs.contactForm.resetFields();
                    });
                },
                /**
                 * 修改联系信息
                 */
                modifyContactFn: function() {
                    var _this = this;
                    if (_this.$refs.contactTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.contactviewTitle = '修改联系信息';
                    _this.contactdialogVisible = true;
                    _this.$nextTick(function() {
                        _this.$refs.contactForm.resetFields();
                        var obj = _this.$refs.contactTable.selections[0];
                        yufp.clone(obj, _this.contactformdata);
                    });
                },
                /**
                 * 删除联系信息
                 */
                deleteContactFn: function() {
                    var _this = this;
                    var selections = _this.$refs.contactTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }

                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].contactId);
                    }
                    _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqymerchantinfo/deletecontactinfo?ids=' + arr.join(','),
                                    callback: function(code, message, response) {
                                        _this.$refs.contactTable.remoteData();
                                        _this.$message('操作成功');
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 地址信息新增按钮
                 */
                addAddressFn: function() {
                    var _this = this;
                    _this.addressviewTitle = '新增地址信息';
                    _this.addressdialogVisible = true;
                    _this.$nextTick(function() {
                        _this.$refs.addressForm.resetFields();
                    });
                },
                /**
                 * 修改地址信息
                 */
                modifyAddressFn: function() {
                    var _this = this;
                    if (_this.$refs.addressTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.addressviewTitle = '修改地址信息';
                    _this.addressdialogVisible = true;
                    _this.$nextTick(function() {
                        _this.$refs.addressForm.resetFields();
                        var obj = _this.$refs.addressTable.selections[0];
                        yufp.clone(obj, _this.addressformdata);
                    });
                },
                /**
                 * 删除删除信息
                 */
                deleteAddressFn: function() {
                    var _this = this;
                    var selections = _this.$refs.addressTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }

                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].addressId);
                    }
                    _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqymerchantinfo/deleteaddressinfo?ids=' + arr.join(','),
                                    callback: function(code, message, response) {
                                        _this.$refs.addressTable.remoteData();
                                        _this.$message('操作成功');
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 导入
                 */
                addMoreFn: function() {
                    var _this = this;
                    _this.uploadDialog = true;
                },
                /**
                 * 退出申请
                 */
                signOutFn: function() {
                    var _this = this;
                    _this.ApplyTitle = '退出申请';
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    // if (selections[0].wfApprSts != '997') {
                    //     _this.$message({ message: '只能提交状态为审批通过的数据！', type: 'warning' });
                    //     return;
                    // }
                    _this.applydialogVisible = true;
                    _this.$nextTick(function() {
                        _this.$refs.applyForm.resetFields();
                    });
                },
                /**
                 * 批量提交
                 */
                batchAddMoreFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    // if (selections[0].batchNo == null) {
                    //   _this.$message({ message: '请先选择一条有批次号数据', type: 'warning' });
                    //   return;
                    // }
                    // if (selections[0].wfApprSts != '997') {
                    //     _this.$message({ message: '只能提交状态为审批通过的数据！', type: 'warning' });
                    //     return;
                    // }
                    // 发起审批流程
                    var commintData = {};
                    commintData.bizSeqNo = selections[0].merchantId; // 流程主键
                    commintData.applType = 'SHGLBATCH'; // 模型版本申请类型字典项
                    commintData.custName = '商户退出' + selections[0].merchantName;
                    commintData.custId = selections[0].batchNo;
                    commintData.paramMap = {
                        bussOpId: selections[0].merchantId,
                        bussOpName: selections[0].merchantName
                    };
                    var load = _this.$loading();
                    _this.$refs.yufpWfInit.wfInit(commintData, load);
                },
                /**
                 * 准入
                 */
                accessFn: function() {
                    var _this = this;
                    _this.ApplyTitle = '准入申请';
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    // if (selections[0].wfApprSts != '000') {
                    //     _this.$message({ message: '只允许提交审批状态为[待发起]的记录', type: 'warning' });
                    //     return;
                    // }
                    _this.applydialogVisible = true;
                    _this.$nextTick(function() {
                        _this.$refs.applyForm.resetFields();
                    });
                },
                /**
                 * 提交
                 */
                commitFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    // if (selections.length < 1) {
                    //   _this.$message({ message: '请先选择一条记录', type: 'warning' });
                    //   return;
                    // }
                    // if (selections[0].wfApprSts != '000') {
                    //   _this.$message({ message: '只允许提交审批状态为[待发起]的记录', type: 'warning' });
                    //   return;
                    // }
                    var commintData = {};
                    commintData.bizSeqNo = selections[0].merchantId; // 流程主键
                    if (_this.ApplyTitle === '准入申请') {
                        commintData.applType = 'SHGL'; // 模型版本申请类型字典项
                        commintData.custName = '商户准入:' + selections[0].merchantName;
                    } else {
                        commintData.applType = 'SHGLBATCH'; // 模型版本申请类型字典项
                        commintData.custName = '商户退出:' + selections[0].merchantName;
                    }


                    commintData.custId = selections[0].merchantId;
                    commintData.commentContent = _this.applyformdata.commentContent;
                    commintData.paramMap = yufp.clone(selections[0], {});
                    var load = _this.$loading();
                    _this.$refs.yufpWfInit.wfInit(commintData, load);
                },
                onAfterClose: function() {
                    var _this = this;
                    _this.$refs.refTable.remoteData();
                    _this.applydialogVisible = false;
                    _this.$message('操作成功');
                },
                onAfterInit: function(data) {},
                // 文件上传成功处理逻辑
                onSuccess: function(response, file, fileList) {
                    var _this = this;
                    // console.log('上传文件', response);
                    // alert(response.code);
                    if (response.code == -1) {
                        _this.$message('文件导入失败!', '提示');
                        _this.$refs.verUpload.clearFiles();
                        // vm.$refs.accessTables.remoteData();
                    } else {
                        _this.$message('成功导入' + response.message + '条数据!', '提示');
                        _this.$refs.verUpload.clearFiles();
                        _this.$refs.refTable.remoteData();
                        // vm.$refs.accessTables.remoteData();
                    }
                },
                onError: function() {
                    this.$message('文件导入失败!', '提示');
                    this.$refs.verUpload.clearFiles();
                    // vm.$refs.accessTables.remoteData();
                },
                // 上传之前判断文件格式
                beforeAvatarUpload: function(file) {
                    var regex = /^.*\.(?:xls|xlsx)$/i;
                    if (!regex.test(file.name)) {
                        this.$message.error('只能导入xls或xlsx格式文件!');
                        return false;
                    }
                    return file.name;
                },
                submitUpload: function() {
                    this.$refs.verUpload.submit();
                    this.uploadDialog = false;
                },
                downTable: function(row, event) {
                    var url = backend.fileService + '/api/file/provider/download?fileId=' + 'tempModel/merchantTempModel.xlsx';
                    yufp.util.download(url);
                },
                // 上传模板
                upTable: function(row, event) {
                    var _self = this;
                    // _self.deleteVisible = false;
                    _self.uploadInfoVisible = true;
                    this.$nextTick(function() {
                        // var obj = _self.$refs[refTable].selections[0];
                        // this.uploadInfoform = Object.assign(this.uploadInfoform, obj);
                        // 初始化查询上传附件
                        // return yufp.service.getUrl({url: me.uploadAction});
                        // 获取附件列表
                        // vm.$refs.filesTable.queryFn(files);
                        // 设置附件列表组件传入NOTICEID
                        this.noticeUpLoadBusNo = {
                            busNo: '00000000'
                        };
                    });
                }
            }
        });
    };
});