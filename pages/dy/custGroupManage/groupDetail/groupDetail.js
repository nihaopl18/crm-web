/**
 * @created by zhangkun6 on 2021-8-27 16:58:15
 * @updated by
 * @description 客群详情
 */
define(['./custom/widgets/js/YufpCustFlexyQuery.js'], function (require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CD0069,CUST_GRADE');
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
                    custGroupType: '',
                    custGroupRule: '',
                    dataUrl: '/api/ocrmfcicgbase/queryBaseCustomerlist',
                    historyUrl: '/api/ocrmfcicgbase/Selectjournal',
                    baseParam: { custGroupId: data.custGroupId },
                    historyBaseParam: { custGroupId: data.custGroupId },
                    searchData: {},
                    keyword: '',
                    editeVisible: false,
                    custGroupForm: {},
                    createVisible: false,
                    highLevelCreateVisible: false,
                    btnDisabled: false,
                    historyVisible: false,
                    historyInnerVisible: false,
                    steps: [{ id: 1, title: '筛选条件' }, { id: 2, title: '选择成员' }],
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
                    custDetailUrl: '/api/ocrmfcicgbase/queryjournallist',
                    custBaseParam: this.filterModel,
                    keyword: '',
                    custKeyword: '',
                    detailForm: {},
                    rules: {
                        aumBalanceStart: [{ validator: yufp.validator.moneyFormat, trigger: 'blur' }],
                        aumBalanceEnd: [{ validator: yufp.validator.moneyFormat, trigger: 'blur' }]
                    },
                    custRules: {
                        custGroupName: [{ max: 10, trigger: 'blur', message: '客群名称不超过10个字' }, { required: true, message: '客群名称必填', trigger: 'blur' }],
                        custGroupDescribe: [{ max: 100, trigger: 'blur', message: '客群描述不超过100个字' }]
                    },
                    tagObj: {
                        aum: [],
                        countareacd: '',
                        custgrade: [],
                        expireno: '',
                        tagname: [],
                        prodname: '',
                        agegroup: ''
                    },
                    ageGroup: yufp.lookup.find('YEAR_SECTION_LIST', false),
                    origins: yufp.lookup.find('ORIGION_LIST', false),
                    customerTags: yufp.lookup.find('CUSTOMER_TAG_LIST', false),
                    expires: yufp.lookup.find('EXPIRE_LIST', false),
                    grades: {},
                    stepOneData: {},
                    stepTwoData: [],
                    userCode: yufp.session.userCode,
                    org: yufp.session.instu.code,
                    orgIdAuth: data.orgIdAuth,
                    changeTypes: yufp.lookup.find('CHANGE_TYPES', false),
                    optionName: '',
                    changeCount: 0,
                    tempCustId: '',
                    ORIGION_LIST: [],
                    custGroupId: data.custGroupId,
                    showName: '',
                    showAUM1: false,
                    showAUM2: false,
                    showAUM3: false,
                };
            },
            created: function () {
                this.getDetail();
            },
            mounted: function () {
                var t = this;
                this.ORIGION_LIST = yufp.lookup.find('ORIGION_LIST');
                document.addEventListener("click", function (e) {
                    var box = document.getElementById("ulid");
                    if (box != null) {
                        if (!box.contains(e.target)) {
                            t.showor = false;

                        }
                    }
                })
            },
            updated: function () {
                // this.$nextTick(function() {
                //     this.$refs.listTable.doLayout();
                // }())
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
                handleReginClick: function (e) {
                    this.filterModel.countAreaCd === e ? this.filterModel.countAreaCd = '' : this.filterModel.countAreaCd = e;
                },
                returnClassName: function (data) {
                    var className = '';
                    if (data >= 0) {
                        className = 'el-icon-caret-top up';
                    } else {
                        className = 'el-icon-caret-bottom down';
                    }

                    return className;
                },
                getDetail: function () {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/ocrmfcicgbase/querycustomet',
                        data: {
                            custGroupId: data.custGroupId
                        },
                        callback: function (code, message, response) {
                            if (code === 0) {
                                _this.detailForm = response.data;
                                _this.custGroupType = response.data.custGroupType;
                                _this.custGroupRule = response.data.custGroupRule;
                                _this.grades = yufp.lookup.find('CUST_GRADE', false);
                                if (response.data.crmFCgCustomerPreparation) {
                                    var obj = response.data.crmFCgCustomerPreparation;
                                    _this.tagObj = {
                                        aum: obj.aumBalance ? obj.aumBalance.split(',') : [],
                                        countareacd: obj.countareacd,
                                        custgrade: obj.custgrade ? obj.custgrade.split(',') : [],
                                        expireno: obj.expireno,
                                        tagname: obj.tagname ? obj.tagname.split(',') : [],
                                        prodname: obj.prodname,
                                        agegroup: obj.agegroup
                                    };
                                    // 数据判断
                                    if (obj.aumBalance == ',' || obj.aumBalance == 'null,null') {
                                        return;
                                    }
                                    if (_this.tagObj.aum[0] != 'null' && _this.tagObj.aum[1] != 'null') {
                                        _this.showAUM1 = true;
                                    } else if (_this.tagObj.aum[0] != 'null' && _this.tagObj.aum[1] == 'null') {
                                        _this.showAUM2 = true;
                                    } else if (_this.tagObj.aum[1] != 'null' && _this.tagObj.aum[0] == 'null') {
                                        _this.showAUM3 = true;
                                    }
                                }
                            }
                        }
                    });
                },
                searchListCust: function () {
                    this.baseParam.queryCriteria = this.custKeyword;
                    this.$refs.listTable.remoteData(this.baseParam);
                },
                toCust360View: function (data) {
                    var _this = this;
                    yufp.util.valid2jump(data.custId, function (val) {
                        if (val) {
                            var customKey = 'custom_view' + data.custId; // 请以custom_view前缀开头，并且全局唯一
                            // var custType = row.custType;
                            yufp.frame.addTab({
                                // id: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 菜单功能ID（路由ID）
                                id: 'customer360View', // 菜单功能ID（路由ID）
                                key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                                title: '客户360视图:' + data.custName, // 页签名称
                                data: {
                                    // id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
                                    cust: data,
                                    custId: data.custId,
                                    custName: data.custName
                                } // 传递的业务数据，可选配置
                            });
                        } else {
                            _this.$message.warning('该客户不能查看客户360视图');
                        }
                    });
                },
                toAnalysis: function () {
                    yufp.frame.addTab({
                        // 路由名称
                        id: 'custGroupAnalysis',
                        // 自定义唯一页签key,请统一使用custom_前缀开头
                        key: 'custom_custGroupAnalysis' + data.custGroupId,
                        // 页签名称
                        title: '客群数量统计:' + data.custGroupName,
                        // 传递的业务数据，可选配置
                        data: {
                            custGroupId: data.custGroupId
                        }
                    });
                },
                editCustGroup: function () {
                    this.editeVisible = true;
                    var _this = this;
                    this.$nextTick(function () {
                        yufp.extend(_this.custGroupForm, _this.detailForm);
                    });
                },
                updateData: function (param) {
                    var _this = this;
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/ocrmfcicgbase/updateBase',
                        data: param,
                        callback: function (code, message, response) {
                            if (code === 0 && response.code === 0) {
                                _this.$message.success('更新成功');
                                _this.handleEditeClose(1);
                                yufp.util.butLogInfo(hashCode, '客群详情', '编辑客群');
                            } else {
                                _this.$message.warning(response.message);
                            }
                        }
                    });
                },
                saveEditFn: function () {
                    var fields = this.$refs.refForm;
                    var _this = this;
                    fields.validate(function (valid) {
                        if (valid) {
                            _this.$delete(_this.custGroupForm, 'checked');
                            _this.updateData(_this.custGroupForm);
                        } else {
                            _this.$message({
                                message: '请检查输入项是否合法',
                                type: 'warning'
                            });
                            return false;
                        }
                    });
                },
                handleEditeClose: function (isUpdate) {
                    isUpdate === 1 && this.getDetail();
                    isUpdate === 1 && this.sendMessageToCustList();
                    this.editeVisible = false;
                },
                // 关注或取消关注
                handleFocusChange: function (flag) {
                    var param = {
                        custGroupId: this.detailForm.custGroupId,
                        isFocus: flag
                    };
                    this.updateData(param);
                },
                addCustMember: function () {
                    this.createVisible = true;
                },
                handleCreateClose: function (isUpdate) {
                    this.$refs.filterForm.resetFields();
                    this.$refs.tagNo.$children[0].$children[0].clearTag();
                    this.keyword = '';
                    this.createVisible = false;
                    this.stepIndex = 1;
                    this.btnIndex = 1;
                    isUpdate === 1 && this.$refs.listTable.remoteData(this.baseParam);
                    isUpdate === 1 && this.getDetail();
                    isUpdate === 1 && this.sendMessageToCustList();
                },

                sendMessageToCustList: function () {
                    yufp.router.sendMessage(data.parentRouteId, '01', { isUpdate: true });
                },

                // 点击客户标签后处理数据
                handleTagChange: function (tags) {
                    var tagNo = [];
                    var tagName = [];
                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i].isCheck) {
                            tagNo.push(tags[i].key);
                            tagName.push(tags[i].value);
                        }
                    }

                    this.filterModel.tagNo = tagNo.join();
                    this.filterModel.tagName = tagName.join();
                },

                nextStep: function (index) {
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
                        this.stepIndex = index;
                    }
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
                searchCusts: function () {
                    this.getFilterCustomerList(2, this.keyword);
                },
                // 筛选客户
                getFilterCustomerList: function (index, keyword) {
                    var _this = this;
                    var param = {};
                    _this.judgeProdParam();
                    delete _this.filterModel.undefined;
                    yufp.extend(param, _this.filterModel);
                    param.custGrade = _this.filterModel.custGrade.join();
                    param.userCode = _this.userCode;
                    param.org = _this.org;
                    param.orgIdAuth = _this.orgIdAuth;
                    param.queryCriteria = keyword;
                    var prodArr = [];
                    param.prodName = _this.prodNameValue;
                    param.prodId = '';
                    param.custQueryType = '02';
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
                },
                handleCustSelect: function (selection) {
                    this.chooseCount = selection.length;
                    this.stepTwoData = selection;
                },
                // 保存新增客户
                saveCusts: function () {
                    var _this = this;
                    _this.stepOneData.custQueryType = '02';
                    var param = {
                        crmCustomerDTO: _this.stepOneData,
                        fCgPreparationList: _this.stepTwoData,
                        fCissCgBase: {
                            custGroupId: data.custGroupId
                        },
                        orgIdAuth: _this.orgIdAuth
                    };
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/ocrmfcicgbase/insertBase',
                        data: param,
                        callback: function (code, message, response) {
                            if (code === 0 && response.code === 0) {
                                _this.$message.success('添加成功');
                                _this.handleCreateClose(1);
                            } else {
                                _this.$message.warning(response.message);
                            }
                        }
                    });
                },
                toTopLevelFilter: function () {
                    this.handleCreateClose();
                    this.highLevelCreateVisible = true;
                },
                handleHighLevlCreateClose: function () {
                    this.$refs.flexyQuery.resetconditionFn();
                    this.highLevelCreateVisible = false;
                },

                prevStep: function (index) {
                    this.stepIndex = index;
                },

                changeLabelType: function (id) {
                    this.btnIndex = id;
                },

                deleteOne: function (val) {
                    var param = {
                        custGroupId: this.detailForm.custGroupId,
                        custId: val.custId,
                        belongBrch: val.belongBrch
                    };
                    this.deleteData(param);
                },

                // 删除群成员
                deleteFn: function () {
                    var tableSelections = this.$refs.listTable.selections;
                    if (tableSelections.length < 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var _this = this;
                    if (tableSelections) {
                        var ids = [];
                        // var belongBrchs = [];
                        for (var i = 0; i < tableSelections.length; i++) {
                            ids[i] = tableSelections[i].custId;
                            // belongBrchs[i] = tableSelections[i].belongBrch;
                        }
                        var param = {
                            custGroupId: _this.detailForm.custGroupId,
                            custId: ids.join(),
                            belongBrch: tableSelections[0].belongBrch
                        };
                        _this.deleteData(param);
                    }
                },

                deleteData: function (param) {
                    var _this = this;
                    _this.$confirm('删除内容?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function () {
                        yufp.service.request({
                            method: 'POST',
                            url: '/api/ocrmfcicgbase/deleteBaseCustomer',
                            data: param,
                            callback: function (code, message, response) {
                                if (code == '0' && response.code == 0) {
                                    _this.$message({ message: '数据删除成功！' });
                                    _this.$refs.listTable.remoteData(_this.baseParam);
                                }
                            }
                        });
                    });
                },
                // 历史变动
                historyDetail: function () {
                    var selections = this.$refs.listTable.selections;
                    var ids = [];
                    for (var i = 0; i < selections.length; i++) {
                        ids.push(selections[i].custId);
                    }
                    this.tempCustId = ids.join();
                    var param = {
                        custId: ids.join(),
                        custGroupId: data.custGroupId,
                        queryCriteria: this.custKeyword
                    };
                    this.historyVisible = true;
                    var _this = this;
                    _this.$nextTick(function () {
                        _this.$refs.historyTable.remoteData(param);
                    });
                },

                returnChangeContent: function (val) {
                    var content = '';
                    switch (val.changeType) {
                        case '01':
                            content = '手动从系统增加 ' + val.changeCount + ' 名成员';
                            break;
                        case '02':
                            content = '手动从系统移除 ' + val.changeCount + ' 名成员';
                            break;
                    }
                    return content;
                },

                handleHistoryClose: function () {
                    this.historyVisible = false;
                },
                // 历史明细
                detailMore: function (val) {
                    this.changeCount = val.changeCount;
                    this.optionName = this.changeTypes[val.changeType];
                    this.showName = this.changeTypes[val.changeType] == '人员添加' ? '添加成员明细' : '移除成员明细';
                    var _this = this;
                    var param = {
                        custGroupId: data.custGroupId,
                        custId: val.custidCollect,
                        queryCriteria: _this.custKeyword
                    };
                    this.historyInnerVisible = true;
                    _this.$nextTick(function () {
                        _this.$refs.innerTable.remoteData(param);
                    });
                },

                handleHistoryInnerClose: function () {
                    this.historyInnerVisible = false;
                },

                back: function () {
                    this.historyInnerVisible = false;
                },

                exportList: function () {
                    var ids = [];
                    var arr = this.$refs.listTable.selections;
                    for (var i = 0; i < arr.length; i++) {
                        ids.push(arr[i].custId);
                    }
                    var param = {
                        custGroupId: data.custGroupId,
                        custId: ids.join(),
                        selectRole: yufp.sessionStorage.get('selectRole')
                    };
                    var url = '/api/ocrmfcicgbase/export?' + 'condition=' + encodeURI(JSON.stringify(param));
                    yufp.util.download(url);
                    yufp.util.butLogInfo(hashCode, '客群详情', '导出Excel');
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
    exports.onmessage = function (type, message) { };

    /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
    exports.destroy = function (id, cite) { };
});