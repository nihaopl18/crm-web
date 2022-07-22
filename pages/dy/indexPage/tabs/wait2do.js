/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-06 14:59:47
 * @update by:
 * @description:
 */

define(function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('DY0002,DY0001,NOTICE_CYCLE');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                var _this = this;
                var checkID = function(rule, value, callback) {
                    if (_this.singleQueryParams.certNo && !value) {
                        return callback(new Error('请选择证件类型'));
                    } else if (!_this.singleQueryParams.certNo && !value) {
                        _this.$refs.singleQueryForm.clearValidate('certNo');
                        callback();
                    } else {
                        callback();
                    }
                };
                var checkCertNo = function(rule, value, callback) {
                    if (_this.singleQueryParams.custType && !value) {
                        return callback(new Error('请输入证件号码'));
                    } else if (!_this.singleQueryParams.custType && !value) {
                        _this.$refs.singleQueryForm.clearValidate('custType');
                        callback();
                    } else {
                        callback();
                    }
                };
                return {
                    hashCode: JSON.parse(yufp.sessionStorage.get('YUFP-SESSION-MENUS-OG')).filter(function(menu) {
                        return menu.menuName === '首页';
                    })[0].funcId,
                    custvalue: '',
                    orgIdAuth: '',
                    singleQueryParams: {},
                    fastSearchValue: '',
                    IDTypeRule: [{ validator: checkID, trigger: 'change' }],
                    certNoRule: [{ validator: checkCertNo, trigger: 'blur' }],
                    baseParams: {
                        orgIdAuth: this.orgIdAuth,
                        custQueryType: '02'
                    },
                    //xinzeng
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
                        custGroupDescribe: [{ max: 100, trigger: 'blur', message: '客群描述不超过100个字' }]
                    },
                    userCode: yufp.session.userCode,
                    org: yufp.session.instu.code,
                    orgIdAuth: '',
                    stepOneData: {},
                    stepTwoData: [],
                    ORIGION_LIST: [],
                    userSelectRole: false,
                    userRoleArr: ['R001', 'R006', 'R007', 'R008', 'R009', 'R010', 'R011', 'R012'],
                    circleUrl: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
                    list: [],
                    createDate: moment().format('YYYY-MM-DD'),
                    itemTypes: yufp.lookup.find('DY0002', false),
                    workStatus: yufp.lookup.find('DY0001', false),
                    // wait2doFormData: {},
                    isDetail: false,
                    waitdoVisible: false,
                    wait2doForm: {},
                    rule: { // 校验规则
                        todoWorkType: [
                            { required: true, message: '请选择项', trigger: 'change' }
                        ],
                        todoWorkState: [
                            { required: true, message: '请选择项', trigger: 'change' }
                        ],
                        todoWorkTitle: [
                            { max: 20, trigger: 'blur' },
                            { required: true, message: '请输入内容', trigger: 'blur' }
                        ],
                        todoWorkContent: [
                            { max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
                        ],
                        required: 'required'
                    },
                    selectCustParams: { // 客户 放大镜 参数
                        user: {
                            dataParams: {
                                belongOrg: yufp.session.org.code,
                                belongMgr: yufp.session.user.loginCode
                            },
                            checkbox: true // 是否支持多选
                        }
                    },
                    nextNoticeDate: '',
                    tableEditFormdata: {},
                    isStart: false,
                    detailVisible: false,
                    detailFormData: {},
                    custList: [],
                    title: '',
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                        }
                    },
                };
            },
            created: function() {
                let _this = this;
                let orgCode = yufp.sessionStorage.get('YUFP-SESSION-USER');
                _this.orgIdAuth = JSON.parse(orgCode).org.code || JSON.parse(orgCode).org.id || '';
                _this.getCustGroupList();
                yufp.service.request({
                    method: 'GET',
                    url: '/api/adminsmlookupitem/weblist',
                    data: {
                        lookupCodes: 'DY0002,DY0001'
                    },
                    callback: function(code, message, response) {
                        if (code == 0) {
                            var type1 = response.data.DY0001;
                            for (var i = 0; i < type1.length; i++) {
                                _this.$set(_this.workStatus, type1[i].key, type1[i].value);
                            }
                            var type2 = response.data.DY0002;
                            for (var i = 0; i < type2.length; i++) {
                                _this.$set(_this.itemTypes, type2[i].key, type2[i].value);
                            }
                            _this.getWait2doList();
                        }
                    }
                });
            },
            mounted: function() {
                this.ORIGION_LIST = yufp.lookup.find('ORIGION_LIST');
                this.userCodeNo();
            },
            methods: {
                singleQueryFn: function(formName) {
                    var _this = this;
                    var obj = {};
                    var flag = false;
                    for (var key in _this.singleQueryParams) {
                        if (_this.singleQueryParams[key]) {
                            flag = true;
                        }
                    }
                    // 客户经理可以不用筛选条件
                    // let roles = yufp.session.roles;
                    // let roleCodes = [];
                    // let isManage = true;
                    // for (let i = 0; i < roles.length; i++) {
                    //     roleCodes.push(roles[i].code);
                    // }
                    // let str = roleCodes.join();
                    // if (str.indexOf('R003') != -1 || str.indexOf('R002') !== -1) { // 客户经理
                    //     isManage = false;
                    // }
                    var rolestag;
                    var isManage = true;
                    var rolecur = yufp.session.roles;
                    var rolestagselect = yufp.sessionStorage.get('selectRole');
                    for (let i = 0; i < rolecur.length; i++) {
                        if (rolecur[i].id == rolestagselect) {
                            rolestag = rolecur[i].code;
                        }
                    }
                    if (rolestag == 'R003' || rolestag == 'R002') {
                        isManage = false;
                    }
                    if (!flag && isManage) {
                        _this.$message.warning('请至少选择一个筛选条件');
                        return;
                    }
                    _this.$refs.singleQueryForm.validate(function(valid) {
                        if (valid) {
                            yufp.extend(obj, _this.singleQueryParams);
                            if (_this.isNotNumber(_this.singleQueryParams.figureCode)) {
                                obj.characterCode = _this.singleQueryParams.figureCode;
                                obj.figureCode = '';
                            }
                            obj.orgIdAuth = _this.baseParams.orgIdAuth;
                            _this.tempQueryParams = obj;
                            _this.$refs.yutable.remoteData(obj);
                            _this.filterData = obj;
                        }
                    });
                    // this.$nextTick(() => {
                    //     this.$refs.yutable.doLayout();
                    // });
                    _this.$nextTick(function() {
                        _this.$refs.yutable.doLayout();
                    });
                    this.stepIndex = 2;
                },
                isNotNumber: function(params) {
                    return isNaN(Number(params));
                },
                //xinzeng
                userCodeNo: function() {
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
                handleReginClick: function(e) {
                    this.filterModel.countAreaCd === e ? this.filterModel.countAreaCd = '' : this.filterModel.countAreaCd = e;
                },
                // 查询客户列表
                searchCustGroup: function() {
                    this.getCustGroupList(this.custGroupName);
                },
                // 获取客群列表
                getCustGroupList: function(name) {
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
                        callback: function(code, message, response) {
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
                handleCurrentChange: function(page) {
                    this.page = page;
                    this.getCustGroupList(this.custGroupName);
                },
                pushGroupList: function(data) {
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
                returnClassName: function(data) {
                    var className = '';
                    if (data && data.floatCustomer >= 0) {
                        className = 'el-icon-caret-top up';
                    } else {
                        className = 'el-icon-caret-bottom down';
                    }

                    return className;
                },
                handleCardChange: function(obj) {
                    obj.checked = !obj.checked;
                },
                // 解散客群
                dismissCustGroup: function(value) {
                    var _this = this;
                    _this.$confirm('确定要解散该群?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        callback: function(action) {
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
                deletCustGroup: function() {
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
                            callback: function(action) {
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
                deletData: function(param) {
                    var _this = this;
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/ocrmfcicgbase/deleteCustomer',
                        data: param,
                        callback: function(code, message, response) {
                            if (code === 0) {
                                _this.$message.success('操作成功');
                                _this.getCustGroupList();
                            }
                        }
                    });
                },
                // 关注或取消关注该群
                handleFocusChange: function(value) {
                    var param = {
                        custGroupId: value.custGroupId,
                        isFocus: value.isFocus === '01' ? '02' : '01'
                    };
                    var _this = this;
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/ocrmfcicgbase/updateBase',
                        data: param,
                        callback: function(code, message, response) {
                            if (code === 0) {
                                _this.$message.success('更新成功');
                                _this.getCustGroupList();
                            }
                        }
                    });
                },
                // 去客群详情
                toCustGroupDetail: function(data) {
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
                addCustGroup: function() {
                    this.createVisible = true;
                },

                handleAddClose: function() {
                    this.addVisible = false;
                },
                handleHighLevlCreateClose: function() {
                    this.$refs.flexyQuery.resetconditionFn();
                    this.highLevelCreateVisible = false;
                },
                updateGroupList: function() {
                    this.getCustGroupList();
                },
                // 关闭创建客群弹窗
                handleCreateClose: function(isUpdate) {
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
                handleTagChange: function(tags) {
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
                nextStep: function(index) {
                    if (index === 2) {
                        var flag = false;
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
                        // 客户经理可以不用筛选条件
                        // let roles = yufp.session.roles;
                        // let roleCodes = [];
                        // let isManage = true;
                        // for (let i = 0; i < roles.length; i++) {
                        //     roleCodes.push(roles[i].code);
                        // }
                        // let str = roleCodes.join();
                        // if (str.indexOf('R003') != -1 || str.indexOf('R002') !== -1) { // 客户经理
                        //     isManage = false;
                        // }
                        var rolestag;
                        var isManage = true;
                        var rolecur = yufp.session.roles;
                        var rolestagselect = yufp.sessionStorage.get('selectRole');
                        for (let i = 0; i < rolecur.length; i++) {
                            if (rolecur[i].id == rolestagselect) {
                                rolestag = rolecur[i].code;
                            }
                        }
                        if (rolestag == 'R003' || rolestag == 'R002') {
                            isManage = false;
                        }
                        if (flag || !isManage) {
                            this.getFilterCustomerList(index);
                        } else {
                            this.$message.warning('请至少选择一个筛选条件');
                        }
                    } else {
                        this.stepTwoData = this.$refs.yutable.selections;
                        if (this.stepTwoData.length > 25) {
                            this.$message.warning('只能选择25个客户及以下');
                            return;
                        }
                        var str1 = '';
                        for (let i = 0; i < this.stepTwoData.length; i++) {
                            if (i == 0) {
                                str1 = str1 + this.stepTwoData[i].custName + '-' + this.stepTwoData[i].custId;
                            }
                            if (i > 0) {
                                str1 = str1 + ';' + this.stepTwoData[i].custName + '-' + this.stepTwoData[i].custId;
                            }
                        }
                        this.wait2doForm.relationCust = str1;
                        this.handleCreateClose();

                    }
                },
                // 上一步
                prevStep: function(index) {
                    this.stepIndex = index;
                },
                searchCusts: function() {
                    this.getFilterCustomerList(this.stepIndex, this.keyword);
                },

                changeLabelType: function(id) {
                    this.btnIndex = id;
                },
                // 判断产品是输入的名称还是编号
                judgeProdParam: function() {
                    var reg = /[\\u4E00-\\u9FFF]+/g;
                    if (reg.test(this.filterModel.title)) {
                        this.filterModel.prodName = this.filterModel.title;
                    } else {
                        this.filterModel.prodId = this.filterModel.title;
                    }
                },
                // 筛选客户
                getFilterCustomerList: function(index, queryParam) {
                    var _this = this;
                    var param = {};
                    _this.judgeProdParam();
                    yufp.extend(param, _this.filterModel);
                    param.custGrade = _this.filterModel.custGrade.join();
                    param.userCode = _this.userCode;
                    param.org = _this.org;
                    param.orgIdAuth = _this.orgIdAuth;
                    if (queryParam) {
                        param.queryCriteria = queryParam;
                    }
                    _this.$delete(param, 'title');
                    _this.stepOneData = param;
                    // _this.baseParam = param;
                    _this.stepIndex = index;
                    _this.$nextTick(function() {
                        _this.$refs.yutable.remoteData(param);
                    });
                    _this.chooseCount = 0;

                },
                // 选择要加入的客户
                handleCustSelect: function(selection) {
                    this.chooseCount = selection.length;
                },
                // 保存新增客群
                saveCustGroup: function() {
                    var _this = this;
                    $('#savetj').addClass("yu-disable");
                    setTimeout(function() {
                        $('#savetj').removeClass("yu-disable");
                    }, 3000);
                    _this.$refs.custGroupForm.validate(function(valid) {
                        if (valid) {
                            _this.saveData();
                        }
                    });
                },
                saveData: function() {
                    var _this = this;
                    var animatesetTimeout = setTimeout(function() {
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
                        callback: function(code, message, response) {
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
                toTopLevelFilter: function() {
                    this.handleCreateClose();
                    this.highLevelCreateVisible = true;
                },
                createcloseserarch: function() {
                    this.highLevelCreateVisible = false;
                    this.getCustGroupList();
                },
                // processmFn: function(row, column, cell, event) {
                //     if (column.label == '客户') {
                //         this.createVisible = true;
                //     }
                // },
                onfocusone: function() {
                    this.createVisible = true;
                },
                custSelFn: function(val) {
                    console.log('val', val);
                    this.stepTwoData = val;
                    var str1 = '';
                    for (let i = 0; i < this.stepTwoData.length; i++) {
                        if (i == 0) {
                            str1 = str1 + this.stepTwoData[i].custName + '-' + this.stepTwoData[i].custId;
                        }
                        if (i > 0) {
                            str1 = str1 + ';' + this.stepTwoData[i].custName + '-' + this.stepTwoData[i].custId;
                        }
                    }
                    console.log('str1', str1);
                    this.wait2doForm.relationCust = str1;

                },
                formatDate: function(date) {
                    var myyear = date.getFullYear();
                    var mymonth = date.getMonth() + 1;
                    var myweekday = date.getDate();
                    var myhouse = date.getHours();
                    var myminutes = date.getMinutes();
                    if (mymonth < 10) {
                        mymonth = '0' + mymonth;
                    }
                    if (myweekday < 10) {
                        myweekday = '0' + myweekday;
                    }
                    if (myhouse < 10) {
                        myhouse = '0' + myhouse;
                    }
                    if (myminutes < 10) {
                        myminutes = '0' + myminutes;
                    }
                    return myyear + '-' + mymonth + '-' + myweekday + ' ' + myhouse + ':' + myminutes;
                },

                getWait2doList: function() {
                    let _this = this;
                    var date = _this.createDate instanceof Date ? yufp.util.dateFormat(_this.createDate, '{y}-{m}-{d}') : _this.createDate;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/todowork/indexQuery',
                        data: {
                            // condition: JSON.stringify({ finisher: yufp.session.userId, startDate: date + ' 00:00:00', endDate: date + ' 23:59:59' }),
                            condition: JSON.stringify({ finisher: yufp.session.userId, startDate: date }),
                            page: 1,
                            size: 5
                        },
                        callback: function(code, message, response) {
                            if (code === 0) {
                                let data = response.data;
                                if (data && data.length) {
                                    for (let i = 0; i < data.length; i++) {
                                        data[i].startDateCopy = moment(data[i].startDate).format('HH:mm');
                                    }
                                }
                                _this.list = data;
                            }
                        }
                    });
                },

                // 当操作打开时暂存当前行数据
                handleOptionVisibleChange: function(data) {
                    this.tableEditFormdata = {};
                    if (data) {
                        if (data.notice == '1') {
                            data.title = '日程编辑-一次性待办';
                        } else {
                            data.title = '日程编辑-子待办';
                        }
                        data.creator = data.creatorName + '/' + data.creatorId;
                        this.custvalue = data.relationCust.split(';');
                        yufp.clone(data, this.tableEditFormdata);
                    }
                },

                // table 选项操作点击
                handleOptionSelect: function(command) {
                    let _this = this;
                    switch (command) {
                        case 'edit':
                            _this.modifyFn();
                            break;
                        case 'state':
                            _this.updateToDoWorkState();
                            break;
                        case 'delete':
                            _this.handleDelte();
                            break;
                    }
                },

                handleDelte: function() {
                    let _this = this;
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                var dataUrl = '';
                                var list = [];
                                list.push(_this.tableEditFormdata.todoWorkId);
                                if (_this.tableEditFormdata.notice == '1') {
                                    dataUrl = '/api/todowork/deleteOne';
                                    yufp.util.butLogInfo(_this.hashCode, '待办事项', '删除单个一次性待办');
                                } else {
                                    dataUrl = '/api/todowork/deleteSon';
                                    yufp.util.butLogInfo(_this.hashCode, '待办事项', '删除单个子待办');
                                }
                                yufp.service.request({
                                    method: 'GET',
                                    url: dataUrl,
                                    data: {
                                        todoWorkId: list
                                    },
                                    callback: function(code, message, response) {
                                        if (code == 0) {
                                            _this.getWait2doList();
                                            _this.$message('操作成功');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },

                handleEdit: function() {
                    let _this = this;
                    $('#handleEditid').addClass("yu-disable");
                    _this.$refs.refFormDemo.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var model = {};
                    yufp.clone(_this.wait2doForm, model);
                    model.startDate = model.startDate instanceof Date ? _this.formatDate(model.startDate) : model.startDate;
                    if (model.notice == '1') {
                        var dataUrl;
                        dataUrl = '/api/todowork/updateOne';
                        yufp.util.butLogInfo(_this.hashCode, '待办事项', '编辑单个一次性待办');
                    } else {
                        dataUrl = '/api/todowork/updateSon';
                        yufp.util.butLogInfo(_this.hashCode, '待办事项', '编辑单个子待办');
                    }
                    // 修改请求
                    yufp.service.request({
                        method: 'POST',
                        url: dataUrl,
                        data: model,
                        callback: function(code, message, response) {
                            if (code == 0) {
                                $('#handleEditid').removeClass("yu-disable");
                                _this.waitdoVisible = false;
                                _this.$message('操作成功');
                                _this.getWait2doList();
                            } else {
                                $('#handleEditid').removeClass("yu-disable");
                            }
                        }
                    });
                },

                handleClose: function() {
                    let _this = this;
                    this.$nextTick(function() {
                        _this.waitdoVisible = false;
                        _this.detailVisible = false;
                    });
                },

                returnTextColor: function(type) {
                    let className = '';
                    switch (type) {
                        case '1':
                            className = 'color-blue';
                            break;
                        case '2':
                            className = 'color-red';
                            break;
                        case '3':
                            className = 'color-purle';
                            break;
                        case '4':
                            className = 'color-yellow';
                            break;
                        default:
                            className = 'color-yellow';
                    }
                    return className;
                },
                returnBgColor: function(type) {
                    let className = '';
                    switch (type) {
                        case '1':
                            className = 'blue-bg';
                            break;
                        case '2':
                            className = 'red-bg';
                            break;
                        case '3':
                            className = 'purle-bg';
                            break;
                        case '4':
                            className = 'yellow-bg';
                            break;
                        default:
                            className = 'yellow-bg';
                    }
                    return className;
                },
                /**
                 * * 客户放大镜 回调
                 * */
                // custSelFn: function(data) {
                //     var _this = this;
                //     if (!data || data.length < 1) {
                //         return;
                //     }
                //     _this.wait2doForm.relationCust = '';
                //     var relationCust = '';
                //     for (var key in data) {
                //         relationCust += data[key].custName + '-' + data[key].custId;
                //         if ((key + 1) < data.length) {
                //             relationCust += ';';
                //         }
                //     }
                //     _this.wait2doForm.relationCust = relationCust;
                // },
                // 改变周期性待办的周期
                chgNoticeCycle: function(val) {
                    var _this = this;
                    var nextNoticeDate = null;
                    if (_this.wait2doForm.startDate != undefined) {
                        var startDate = _this.wait2doForm.startDate instanceof Date ? _this.wait2doForm.startDate : new Date(_this.wait2doForm.startDate);
                        if (val === '1') {
                            nextNoticeDate = new Date(startDate).getTime() + 24 * 60 * 60 * 1000;
                        } else if (val === '2') {
                            nextNoticeDate = new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000;
                        } else if (val === '3') {
                            nextNoticeDate = new Date(startDate).getTime() + 14 * 24 * 60 * 60 * 1000;
                        } else if (val === '4') {
                            nextNoticeDate = new Date(startDate).getTime() + 30 * 24 * 60 * 60 * 1000;
                        }
                    }
                    if (nextNoticeDate != null) {
                        if (_this.wait2doForm.endDate != undefined) {
                            var endDate = _this.wait2doForm.endDate instanceof Date ? _this.wait2doForm.endDate : new Date(_this.wait2doForm.endDate);
                            if (nextNoticeDate > endDate.getTime()) {
                                this.nextNoticeDate = '下次提醒日期事项已结束';
                            } else {
                                this.nextNoticeDate = yufp.util.dateFormat(new Date(nextNoticeDate), '{y}-{m}-{d}');
                            }
                        } else {
                            this.nextNoticeDate = yufp.util.dateFormat(new Date(nextNoticeDate), '{y}-{m}-{d}');
                        }
                    }
                },
                // 改变周期性待办的开始时间
                chgNoticeStartDate: function(time) {
                    var _this = this;
                    var nextNoticeDate = null;
                    var startDate = time instanceof Date ? time : new Date(time);
                    if (_this.wait2doForm.noticeCycle != undefined) {
                        if (_this.wait2doForm.noticeCycle === '1') {
                            nextNoticeDate = startDate.getTime() + 24 * 60 * 60 * 1000;
                        } else if (_this.wait2doForm.noticeCycle === '2') {
                            nextNoticeDate = startDate.getTime() + 7 * 24 * 60 * 60 * 1000;
                        } else if (_this.wait2doForm.noticeCycle === '3') {
                            nextNoticeDate = startDate.getTime() + 14 * 24 * 60 * 60 * 1000;
                        } else if (_this.wait2doForm.noticeCycle === '4') {
                            nextNoticeDate = startDate.getTime() + 30 * 24 * 60 * 60 * 1000;
                        }
                    }
                    if (nextNoticeDate != null) {
                        if (_this.wait2doForm.endDate != undefined) {
                            var endDate = _this.wait2doForm.endDate instanceof Date ? _this.wait2doForm.endDate : new Date(_this.wait2doForm.endDate);
                            if (nextNoticeDate > endDate.getTime()) {
                                this.nextNoticeDate = '下次提醒日期事项已结束';
                            } else {
                                this.nextNoticeDate = yufp.util.dateFormat(new Date(nextNoticeDate), '{y}-{m}-{d}');
                            }
                        } else {
                            this.nextNoticeDate = yufp.util.dateFormat(new Date(nextNoticeDate), '{y}-{m}-{d}');
                        }
                    }
                },
                // 改变周期性待办的结束时间
                chgNoticeEndDate: function(time) {
                    var _this = this;
                    var nextNoticeDate = null;
                    var endDate = time instanceof Date ? time : new Date(time);
                    if (_this.wait2doForm.startDate != undefined && _this.wait2doForm.noticeCycle != undefined) {
                        var startDate = _this.wait2doForm.startDate instanceof Date ? _this.wait2doForm.startDate : new Date(_this.wait2doForm.startDate);
                        if (_this.wait2doForm.noticeCycle === '1') {
                            nextNoticeDate = startDate.getTime() + 24 * 60 * 60 * 1000;
                        } else if (_this.wait2doForm.noticeCycle === '2') {
                            nextNoticeDate = startDate.getTime() + 7 * 24 * 60 * 60 * 1000;
                        } else if (_this.wait2doForm.noticeCycle === '3') {
                            nextNoticeDate = startDate.getTime() + 14 * 24 * 60 * 60 * 1000;
                        } else if (_this.wait2doForm.noticeCycle === '4') {
                            nextNoticeDate = startDate.getTime() + 30 * 24 * 60 * 60 * 1000;
                        }
                    }
                    if (nextNoticeDate != null) {
                        if (nextNoticeDate <= endDate.getTime()) {
                            this.nextNoticeDate = yufp.util.dateFormat(new Date(nextNoticeDate), '{y}-{m}-{d}');
                        } else {
                            this.nextNoticeDate = '下次提醒日期事项已结束';
                        }
                    }
                },
                updateToDoWorkState: function() {
                    var _this = this;
                    var dataUrl = '';
                    var list = [];
                    list.push(_this.tableEditFormdata.todoWorkId);
                    if (_this.tableEditFormdata.notice == '1') {
                        dataUrl = '/api/todowork/updateToDoWorkState';
                        yufp.util.butLogInfo(_this.hashCode, '待办事项', '跟进单个一次性待办');
                    } else {
                        dataUrl = '/api/todowork/updateToDoWorkSonState';
                        yufp.util.butLogInfo(_this.hashCode, '待办事项', '跟进单个子待办');
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: dataUrl,
                        data: {
                            todoWorkId: list
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.$message('修改成功');
                                _this.getWait2doList();
                            }
                        }
                    });
                },
                modifyFn: function() {
                    console.log('ddd');
                    var _this = this;
                    _this.waitdoVisible = true;
                    _this.$nextTick(function() {
                        _this.clearObj(_this.wait2doForm);
                        _this.$refs.refFormDemo.resetFields();
                        yufp.clone(_this.tableEditFormdata, _this.wait2doForm);
                    });
                },
                clearObj: function(obj) {
                    for (var key in obj) {
                        obj[key] = null;
                    }
                    return obj;
                },
                detail: function(data) {
                    var _this = this;
                    _this.detailVisible = true;
                    if (data.notice == '1') {
                        _this.title = '日程详情-一次性待办';
                    } else {
                        _this.title = '日程详情-子待办';
                    }
                    data.creator = data.creatorName + '/' + data.creatorId;
                    _this.$nextTick(function() {
                        _this.clearObj(_this.detailFormData);
                        _this.$refs.detailForm.resetFields();
                        if (data.relationCust) {
                            _this.custList = data.relationCust.split(';');
                        }
                        var tempData = yufp.clone(data, {});
                        for (var key in tempData) {
                            _this.$set(_this.detailFormData, key, tempData[key]);
                        }
                    });
                },
                toCustomer360View: function(data) {
                    this.detailVisible = false;
                    yufp.util.valid2jump(data.split('-')[1], function(val) {
                        if (val) {
                            var customKey = 'custom_view' + data.split('-')[1]; // 请以custom_view前缀开头，并且全局唯一
                            // var custType = row.custType;
                            yufp.frame.addTab({
                                // id: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 菜单功能ID（路由ID）
                                id: 'customer360View', // 菜单功能ID（路由ID）
                                key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                                title: '客户360视图:' + data.split('-')[0], // 页签名称
                                data: {
                                    // id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
                                    cust: data,
                                    custId: data.split('-')[1],
                                    custName: data.split('-')[0]
                                } // 传递的业务数据，可选配置
                            });
                        } else {
                            _this.$message.warning('该客户不能查看客户360视图');
                        }
                    });
                },
                detailAndState: function(data) {
                    var _this = this;
                    var dataUrl = '';
                    var list = [];
                    list.push(data.todoWorkId);
                    if (data.notice == '1') {
                        dataUrl = '/api/todowork/updateToDoWorkState';
                        yufp.util.butLogInfo(_this.hashCode, '待办事项', '跟进单个一次性待办');
                    } else {
                        dataUrl = '/api/todowork/updateToDoWorkSonState';
                        yufp.util.butLogInfo(_this.hashCode, '待办事项', '跟进单个子待办');
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: dataUrl,
                        data: {
                            todoWorkId: list
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.detailVisible = false;
                                _this.getWait2doList();
                                _this.$message('操作成功');
                            }
                        }
                    });
                },
                detailAndDelete: function(data) {
                    var _this = this;
                    var dataUrl = '';
                    var list = [];
                    list.push(data.todoWorkId);
                    if (data.notice == '1') {
                        dataUrl = '/api/todowork/deleteOne';
                        yufp.util.butLogInfo(_this.hashCode, '待办事项', '删除单个一次性待办');
                    } else {
                        dataUrl = '/api/todowork/deleteSon';
                        yufp.util.butLogInfo(_this.hashCode, '待办事项', '删除单个子待办');
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: dataUrl,
                        data: {
                            todoWorkId: list
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.detailVisible = false;
                                _this.getWait2doList();
                                _this.$message('操作成功');
                            }
                        }
                    });
                },
                detailAndModify: function(data) {
                    var _this = this;
                    _this.detailVisible = false;
                    _this.handleOptionVisibleChange(data);
                    _this.modifyFn();
                }
            }
        });
    };

    /**
     * 页面传递消息处理
     * @param type 消息类型
     * @param message 消息内容
     */
    exports.onmessage = function(type, message, cite, vm) {
        vm.createDate = message.date;
        vm.getWait2doList();
    };

    /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
    exports.destroy = function(id, cite) {};
});