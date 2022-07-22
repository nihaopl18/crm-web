/**
 * @created by zhangkun6 on 2021-8-27 16:57:48
 * @updated by
 * @description 客群列表
 */
define([
    './custom/widgets/js/yufpExtTree.js',
    './custom/widgets/js/YufpTagGroupTree.js',
    './custom/widgets/js/yufpGroupList.js',
    './custom/widgets/js/YufpCustFlexyQuery.js'
], function (require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CD0348,CD0069');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                return {
                    prodNameValue: '',
                    custdisabled: false,
                    custObjPram: {},
                    custTypeRole: false,
                    searchBoxShow: false,
                    custResults: [],
                    showor: false,
                    inputvalue: '',
                    custGroupList: [],
                    custGroupName: '',
                    btnDisabled: false,
                    checked: true,
                    addVisible: false,
                    createVisible: false,
                    highLevelCreateVisible: false,
                    steps: [{ id: 1, title: '筛选条件' }, { id: 2, title: '选择成员' }, { id: 3, title: '创建客群' }],
                    chooseIndex: 1,
                    stepIndex: 1,
                    filterText: '高级筛选',
                    isTopLevelFilter: false,
                    filterModel: {
                        custQueryType: '02'
                    },
                    selectRows: [],
                    custGroupForm: {},
                    treeDataUrl: '',
                    param: { groupNo: '0', levelunit: '1' },
                    async: true,
                    filterCondition: [{
                        label: '证件类型',
                        optionSymbol: '1',
                        labelContent: '1',
                        relation: 1
                    },
                    {
                        label: '证件类型',
                        optionSymbol: '1',
                        labelContent: '1',
                        relation: 1
                    }
                    ],
                    buttons: [{
                        id: 1,
                        name: '全部'
                    },
                    {
                        id: 2,
                        name: '常用'
                    },
                    {
                        id: 3,
                        name: '最近使用'
                    }
                    ],
                    btnIndex: 1,
                    chooseCount: 0,
                    custUrl: '/api/ocrmfcicgbase/customerList',
                    baseParam: this.filterModel,
                    keyword: '',
                    custGroupForm: {},
                    page: 1,
                    total: 0,
                    rules: {
                        aumBalanceStart: [{ validator: yufp.validator.moneyFormat, trigger: 'blur' }],
                        aumBalanceEnd: [{ validator: yufp.validator.moneyFormat, trigger: 'blur' }]
                    },
                    custRules: {
                        custGroupName: [{ max: 10, trigger: 'blur', message: '客群名称不超过10个字' }, { required: true, message: '客群名称必填', trigger: 'blur' }],
                        custGroupDescribe: [{ required: true, max: 100, trigger: 'blur', message: '客群描述不超过100个字' }]
                    },
                    userCode: yufp.session.userCode,
                    org: yufp.session.instu.code,
                    orgIdAuth: '',
                    stepOneData: {},
                    stepTwoData: [],
                    ORIGION_LIST: [],
                    userSelectRole: false,
                    userRoleArr: ['R001', 'R006', 'R007', 'R008', 'R009', 'R010', 'R011', 'R012']
                };
            },
            created: function () {
                var _this = this;
                // _this.userCodeNo();
                let orgCode = yufp.sessionStorage.get('YUFP-SESSION-USER');
                _this.orgIdAuth = JSON.parse(orgCode).org.code || JSON.parse(orgCode).org.id || '';
                _this.getCustGroupList();
            },
            mounted: function () {
                var t = this;
                this.ORIGION_LIST = yufp.lookup.find('ORIGION_LIST');
                this.userCodeNo();
                document.addEventListener("click", function (e) {
                    var box = document.getElementById("ulid");
                    if (box != null) {
                        if (!box.contains(e.target)) {
                            t.showor = false;

                        }
                    }
                })
            },
            methods: {
                custParamFn: function (nodeData) {
                    let _this = this;
                    _this.custObjPram.prodId = nodeData.catlCode
                },
                getCustTypeRole: function (info) {
                    if (info.custTypeRole == false) {
                        this.custObjPram.prodId = '';
                    }
                    this.custdisabled = info.custTypeRole;
                },
                handleCustomerSelect: function (item) {
                    var _this = this;
                    _this.prodNameValue = item.prodName + '--' + item.prodId;
                    setTimeout(function () {
                        _this.showor = false;
                    }, 100);
                    _this.showor = false;
                },
                custTpChangeFn: function () {

                    var _this = this;
                    var prodId = '';
                    var prodName = '';
                    _this.searchBoxShow = true;
                    // if (/^\d+$/.test(this.composeQueryParams.prodName)) {
                    //     prodId = this.composeQueryParams.prodName;
                    // } else {
                    //     prodName = this.composeQueryParams.prodName;
                    // }
                    // 检测是否为中文
                    if (_this.checkChinese(_this.prodNameValue)) {
                        prodName = _this.prodNameValue;
                    } else {
                        prodId = _this.prodNameValue;
                    }

                    // 控制下面是否展示
                    if (_this.prodNameValue && _this.prodNameValue.length != 0) {
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
                        // _this.custResults = [
                        //     { prodName: '3dfewdfd健康的减肥3', prodId: '234576dd' },
                        //     { prodName: '1简单快捷发电机房3', prodId: '4ddfvd' },
                        //     { prodName: '21简单快捷发电dfec3', prodId: '24dfd2dd' },
                        //     { prodName: '3dfe就看见康的减肥3', prodId: '232344dd' },
                        //     { prodName: '1简单快捷发电机房3', prodId: '4d5643d' },
                        //     { prodName: '21简单快捷发电dfec3', prodId: '2354dd' },
                        //     { prodName: '3dfewdfd健康的减肥3', prodId: '224534dd' },
                        //     { prodName: '1简单快捷发电机房3', prodId: '4dd2452' },
                        //     { prodName: '21简单快捷发电dfec3', prodId: '224524dd' },
                        //     { prodName: '21简单快捷发电dfec3', prodId: '24254dd' }
                        // ]
                    } else {
                        _this.showor = false;
                    }
                },
                checkChinese: function (params) {
                    return new RegExp('[\\u4E00-\\u9FFF]+', 'g').test(params);
                },
                userCodeNo: function () {
                    var _this = this;
                    var selectRole = yufp.sessionStorage.get('selectRole');
                    var rolesArr = yufp.session.roles;
                    for (var i = 0; i < rolesArr.length; i++) {
                        if (selectRole == rolesArr[i].id) {
                            if (_this.userRoleArr.indexOf(rolesArr[i].code) != -1) {
                                _this.userSelectRole = true; // 包含
                            } else {
                                _this.userSelectRole = false;
                            }
                        }
                    }
                },
                handleReginClick: function (e) {
                    this.filterModel.countAreaCd === e ? this.filterModel.countAreaCd = '' : this.filterModel.countAreaCd = e;
                },
                // 查询客户列表
                searchCustGroup: function () {
                    this.getCustGroupList(this.custGroupName);
                },
                // 获取客群列表
                getCustGroupList: function (name) {
                    var _this = this;
                    var param = {
                        org: _this.org,
                        orgIdAuth: _this.orgIdAuth,
                        userCode: _this.userCode,
                        isFocus: '',
                        page: _this.page,
                        size: 9
                    };
                    if (name) {
                        param.custGroupName = name;
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/ocrmfcicgbase/queryBaselist',
                        data: param,
                        callback: function (code, message, response) {
                            if (code === 0) {
                                var list = response.data;
                                for (var i = 0; i < list.length; i++) {
                                    list[i].checked = false;
                                }
                                _this.custGroupList = list;
                                _this.total = response.total;
                            }
                        }
                    });
                },
                handleCurrentChange: function (page) {
                    this.page = page;
                    this.getCustGroupList(this.custGroupName);
                },
                pushGroupList: function (data) {
                    if (!this.custGroupList.length) {
                        this.custGroupList.push(data);
                        return false;
                    }
                    var arr = [];
                    for (var j = 0; j < this.custGroupList.length; j++) {
                        arr.push(this.custGroupList[j].custGroupId);
                    }
                    if (arr.indexOf(data.custGroupId) === -1) {
                        this.custGroupList.push(data);
                    }
                },
                // 返回历史记录的变动内容
                returnClassName: function (data) {
                    var className = '';
                    if (data && data.floatCustomer >= 0) {
                        className = 'el-icon-caret-top up';
                    } else {
                        className = 'el-icon-caret-bottom down';
                    }

                    return className;
                },
                handleCardChange: function (obj) {
                    obj.checked = !obj.checked;
                },
                // 解散客群
                dismissCustGroup: function (value) {
                    var _this = this;
                    _this.$confirm('确定要解散该群?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        callback: function (action) {
                            if (action === 'confirm') {
                                var param = {
                                    custGroupId: value.custGroupId
                                };
                                _this.deletData(param);
                            }
                        }
                    });
                },
                // 删除选中的客户群
                deletCustGroup: function () {
                    var _this = this;
                    var deletList = [];
                    for (var i = 0; i < _this.custGroupList.length; i++) {
                        if (_this.custGroupList[i].checked) {
                            deletList.push(_this.custGroupList[i].custGroupId);
                        }
                    }
                    if (deletList.length) {
                        _this.$confirm('确定要删除勾选的客户群?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            callback: function (action) {
                                if (action === 'confirm') {
                                    var param = {
                                        custGroupId: deletList.join()
                                    };
                                    _this.deletData(param);
                                }
                            }
                        });
                    } else {
                        _this.$message.warning('请选择要删除的客户群');
                    }
                },
                deletData: function (param) {
                    var _this = this;
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/ocrmfcicgbase/deleteCustomer',
                        data: param,
                        callback: function (code, message, response) {
                            if (code === 0) {
                                _this.$message.success('操作成功');
                                _this.getCustGroupList();
                            }
                        }
                    });
                },
                // 关注或取消关注该群
                handleFocusChange: function (value) {
                    var param = {
                        custGroupId: value.custGroupId,
                        isFocus: value.isFocus === '01' ? '02' : '01'
                    };
                    var _this = this;
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/ocrmfcicgbase/updateBase',
                        data: param,
                        callback: function (code, message, response) {
                            if (code === 0) {
                                _this.$message.success('更新成功');
                                _this.getCustGroupList();
                            }
                        }
                    });
                },
                // 去客群详情
                toCustGroupDetail: function (data) {
                    yufp.frame.addTab({
                        // 路由名称
                        id: 'custGropDetail',
                        // 自定义唯一页签key,请统一使用custom_前缀开头
                        key: 'custom_custGropDetail' + data.custGroupId,
                        // 页签名称
                        title: data.custGroupName,
                        // 传递的业务数据，可选配置
                        data: { custGroupId: data.custGroupId, custGroupName: data.custGroupName, parentRouteId: yufp.frame.getTab().routeId, orgIdAuth: this.orgIdAuth }
                    });
                },
                // 添加客群
                addCustGroup: function () {
                    this.createVisible = true;
                },

                handleAddClose: function () {
                    this.addVisible = false;
                },
                handleHighLevlCreateClose: function () {
                    this.$refs.flexyQuery.resetconditionFn();
                    this.highLevelCreateVisible = false;
                },
                updateGroupList: function () {
                    this.getCustGroupList();
                },
                // 关闭创建客群弹窗
                handleCreateClose: function (isUpdate) {
                    this.$refs.filterForm.resetFields();
                    this.$refs.custGroupForm.resetFields();
                    this.$refs.tagNo.$children[0].$children[0].clearTag();
                    this.keyword = '';
                    this.stepIndex = 1;
                    this.btnIndex = 1;
                    isUpdate === 1 && this.getCustGroupList();
                    this.createVisible = false;
                },
                // 点击客户标签后处理数据
                handleTagChange: function (tags) {
                    var tagNo = [];
                    var tagName = [];
                    this.filterModel.isOnePaperCust = ''; //兩地一本通客戶
                    this.filterModel.isAccreditedInvestor = ''; //合格投資者认证
                    this.filterModel.isFinCust = ''; //理财客户
                    this.filterModel.isParkingInstallment = ''; //车位分期客户
                    this.filterModel.isPerHouseLoan = ''; //个人房产按揭贷款客户
                    this.filterModel.isLegalHouseLoan = ''; //法人房产按揭贷款客户
                    this.filterModel.isCreditCardCust = ''; //信用卡客户

                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i].isCheck) {
                            tagNo.push(tags[i].key);
                            tagName.push(tags[i].value);
                        }
                    }
                    for (let x = 0; x < tagNo.length; x++) {
                        if (tagNo[x] == 'S0000018') {
                            this.filterModel.isOnePaperCust = 'Y';
                        }
                        if (tagNo[x] == 'S0000010') {
                            this.filterModel.isAccreditedInvestor = 'Y';
                        }
                        if (tagNo[x] == 'S0000045') {
                            this.filterModel.isFinCust = 'Y';
                        }
                        if (tagNo[x] == 'S0000042') {
                            this.filterModel.isParkingInstallment = 'Y';
                        }
                        if (tagNo[x] == 'S0000034') {
                            this.filterModel.isPerHouseLoan = 'Y';
                        }
                        if (tagNo[x] == 'S0000055') {
                            this.filterModel.isLegalHouseLoan = 'Y';
                        }
                        if (tagNo[x] == 'S0000049') {
                            this.filterModel.isCreditCardCust = 'Y';
                        }
                    }
                    this.filterModel.tagNo = tagNo.join();
                    this.filterModel.tagName = tagName.join();
                },
                // 下一步
                nextStep: function (index) {
                    var _this = this;
                    if (index === 2) {
                        var flag = false;
                        delete _this.filterModel.undefined;
                        for (var key in this.filterModel) {
                            if (this.filterModel[key]) {
                                if (Array.isArray(this.filterModel[key]) && this.filterModel[key].length) {
                                    flag = true;
                                }
                                if (typeof this.filterModel[key] == 'string') {
                                    flag = true;
                                }
                            }
                        }
                        this.filterModel.prodName = '';
                        if (_this.prodNameValue || _this.custObjPram.prodId) {
                            flag = true;
                        }
                        if (flag || _this.prodNameValue || _this.custObjPram.prodId) {
                            this.getFilterCustomerList(index);
                        } else {
                            _this.$message.warning('请至少选择一个筛选条件');
                            return;
                        }
                    } else {
                        this.stepTwoData = this.$refs.yutable.selections;
                        this.stepIndex = index;
                    }
                },
                // 上一步
                prevStep: function (index) {
                    this.stepIndex = index;
                },
                searchCusts: function () {
                    this.getFilterCustomerList(this.stepIndex, this.keyword);
                },

                changeLabelType: function (id) {
                    this.btnIndex = id;
                },
                // 判断产品是输入的名称还是编号
                judgeProdParam: function () {
                    var reg = /[\\u4E00-\\u9FFF]+/g;
                    if (reg.test(this.prodNameValue)) {
                        this.filterModel.prodName = this.prodNameValue;
                    } else {
                        this.filterModel.prodId = this.prodNameValue;
                    }
                },
                // 筛选客户
                getFilterCustomerList: function (index, queryParam) {
                    var _this = this;
                    var param = {};
                    _this.judgeProdParam();
                    yufp.extend(param, _this.filterModel);
                    param.custGrade = _this.filterModel.custGrade.join();
                    param.userCode = _this.userCode;
                    param.org = _this.org;
                    param.orgIdAuth = _this.orgIdAuth;
                    param.custQueryType = '02';
                    if (queryParam) {
                        param.queryCriteria = queryParam;
                    }
                    var prodArr = [];
                    param.prodName = _this.prodNameValue;
                    param.prodId = '';
                    if (_this.custdisabled == true) {
                        param.prodId = _this.custObjPram.prodId;
                        param.prodName = '';
                    } else {
                        var prodArr = [];
                        if (_this.prodNameValue && _this.prodNameValue.indexOf('--') != -1) {
                            prodArr = _this.prodNameValue.split('--');
                            if (prodArr.length == 2) {
                                param.prodId = prodArr[1];
                                param.prodName = '';
                            }
                        }
                    }
                    _this.$delete(param, 'title');
                    _this.stepOneData = param;
                    // _this.baseParam = param;
                    _this.stepIndex = index;
                    _this.$nextTick(function () {
                        _this.$refs.yutable.remoteData(param);
                    });
                    _this.chooseCount = 0;

                },
                // 选择要加入的客户
                handleCustSelect: function (selection) {
                    this.chooseCount = selection.length;
                },
                // 保存新增客群
                saveCustGroup: function () {
                    var _this = this;
                    $('#savetj').addClass("yu-disable");
                    setTimeout(function () {
                        $('#savetj').removeClass("yu-disable");
                    }, 3000);
                    _this.$refs.custGroupForm.validate(function (valid) {
                        if (valid) {
                            _this.saveData();
                        }
                    });
                    // $('#savetj').removeClass("yu-disable");
                },
                saveData: function () {
                    var _this = this;
                    var animatesetTimeout = setTimeout(function () {
                        _this.createVisible = false;
                        _this.getCustGroupList();
                    }, 3000);
                    _this.stepOneData.custQueryType = '02';
                    var param = {
                        crmCustomerDTO: _this.stepOneData,
                        fCgPreparationList: _this.stepTwoData,
                        fCissCgBase: _this.custGroupForm,
                        orgIdAuth: _this.orgIdAuth
                    };
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/ocrmfcicgbase/insertBase',
                        data: param,
                        callback: function (code, message, response) {
                            if (code === 0 && response.code === 0) {
                                _this.$message.success('添加成功');
                                _this.createVisible = false;
                                _this.getCustGroupList();
                                _this.handleCreateClose(1);
                            } else {
                                clearTimeout(animatesetTimeout); //清除定时器
                                _this.$message.warning(response.message);
                            }
                        }
                    });
                },
                toTopLevelFilter: function () {
                    this.handleCreateClose();
                    this.highLevelCreateVisible = true;
                },
                createcloseserarch: function () {
                    this.highLevelCreateVisible = false;
                    this.getCustGroupList();
                },
                highSearch: function () {
                    this.highLevelCreateVisible = true;
                }

            },
            watch: {
                prodNameValue: {
                    immediate: true,
                    deep: true,
                    handler: function handler(val) {
                        if (val) {
                            this.custTypeRole = true;
                        } else {
                            this.filterModel.prodId = '';
                            this.filterModel.prodName = '';
                            this.$refs.custTyped && this.$refs.custTyped.$children[0] && this.$refs.custTyped.$children[0].$children[0] && this.$refs.custTyped.$children[0].$children[0].clearData()
                            this.custTypeRole = false;
                        }
                    }
                },
            }
        });
    };

    /**
     * 页面传递消息处理
     * @param type 消息类型
     * @param message 消息内容
     */
    exports.onmessage = function (type, message, cite, vm) {
        if (message.isUpdate) {
            vm.getCustGroupList();
        }
    };

    /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
    exports.destroy = function (id, cite) { };
});