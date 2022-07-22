/**
 * @Created by lufl lufl@yusys.com.cn on 2021-08-30 9:34:45.
 * @updated by
 * @description 待办事项
 */
define([
    './custom/widgets/js/yufpGovernedCustSelector.js',
    './custom/widgets/js/yufpMgrSelector.js'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('DY0001,DY0002,CRUD_TYPE,NOTICE_CYCLE,DY0005,DY0006');
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
                    custvalueson: '',
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
                    tabName: '1', // 页面页签编号
                    isManager: false, // “我下发的”页签控制
                    dataUrl: '/api/todowork/queryMainlist', // “我的”页签table请求路径
                    dataUrlSon: '/api/todowork/querySublist',
                    sonParams: {
                        condition: JSON.stringify({
                            todoWorkId: ''
                        })
                    },
                    listdata: [], // “我的”页签table数据绑定
                    myParams: { // “我的”页签table默认请求参数
                        condition: JSON.stringify({
                            finisher: yufp.session.userId
                        })
                    },
                    managerParams: { // “我下发的”页签table默认请求参数
                        condition: JSON.stringify({
                            userId: yufp.session.userName + '/' + yufp.session.userId,
                            creatorId: yufp.session.userId
                        })
                    },
                    tableEditFormdata: {}, // "我的"页签表格点击操作单元格时暂存当前行数据
                    addVisible: false, // 待办事项新增对话框控制
                    editVisible: false, // 待办事项编辑对话框控制
                    detailVisible: false, // 待办事项详情对话框控制
                    sonDetailVisible: false, // 子待办事项详情对话框控制
                    sonEditVisible: false, // 子待办事项编辑对话框控制
                    addName: '1', // 新增对话框页签控制
                    detail: { // 详情对话框页签控制

                    },
                    addOneFormData: {}, // 一次性新增待办事项form数据绑定
                    addCycleFormData: {}, // 周期性新增待办事项form数据绑定
                    editFormData: {}, // 编辑待办事项form数据绑定
                    detailFormData: {}, // 详情待办事项form数据绑定
                    sonDetailFormData: {}, // 详情子待办事项form数据绑定
                    sonEditFormData: {}, // 编辑子待办事项form数据绑定
                    sonlistdata: [], // 周期性详情待办事项table数据绑定
                    custList: [],
                    rule: { // 校验规则
                        todoWorkType: [
                            { required: true, message: '请选择项', trigger: 'change' }
                        ],
                        todoWorkState: [
                            { required: true, message: '请选择项', trigger: 'change' }
                        ],
                        todoWorkTitle: [
                            { max: 20, trigger: 'blur', message: '最大长度不超过20个字符' },
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
                    selectUserParams: { // 客户经理 放大镜 参数
                        user: {
                            dataParams: {
                                belongOrg: yufp.session.org.code,
                                belongMgr: yufp.session.user.loginCode
                            },
                            checkbox: true // 是否支持多选
                        }
                    },
                    nextNoticeDate: '', // 下次执行时间
                    operate: 0,
                    isStart: false,
                    // colunmNamelist: [// 导出表头控制
                    //   { 'name': '待办事项编号', 'id': '', 'ename': 'todoWorkId' },
                    //   { 'name': '类型', 'id': '', 'ename': 'todoWorkType' },
                    //   { 'name': '状态', 'id': '', 'ename': 'todoWorkState' },
                    //   { 'name': '执行时间', 'id': '', 'ename': 'startDate' },
                    //   { 'name': '执行人', 'id': '', 'ename': 'finisher' },
                    //   { 'name': '主题', 'id': '', 'ename': 'todoWorkTitle' },
                    //   { 'name': '内容', 'id': '', 'ename': 'todoWorkContent' },
                    //   { 'name': '关联客户', 'id': '', 'ename': 'relationCust' },
                    //   { 'name': '添加人Id', 'id': '', 'ename': 'creatorId' },
                    //   { 'name': '添加人', 'id': '', 'ename': 'creatorName' },
                    //   { 'name': '添加人所属机构Id', 'id': '', 'ename': 'creatorOrgId' },
                    //   { 'name': '添加人所属机构名称', 'id': '', 'ename': 'creatorOrgName' },
                    //   { 'name': '添加时间', 'id': '', 'ename': 'createDate' },
                    //   { 'name': '更新人Id', 'id': '', 'ename': 'lastChgUsrId' },
                    //   { 'name': '更新人', 'id': '', 'ename': 'lastChgUsrName' },
                    //   { 'name': '更新人所属机构Id', 'id': '', 'ename': 'lastChgUsrOrgId' },
                    //   { 'name': '更新人所属机构名称', 'id': '', 'ename': 'lastChgUsrOrgName' },
                    //   { 'name': '更新时间', 'id': '', 'ename': 'lastChgDate' }
                    // ]
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                        }
                    }
                };
            },
            created: function() {
                var _this = this;
                // _this.userCodeNo();
                let orgCode = yufp.sessionStorage.get('YUFP-SESSION-USER');
                _this.orgIdAuth = JSON.parse(orgCode).org.code || JSON.parse(orgCode).org.id || '';
                _this.getCustGroupList();
            },
            mounted: function() {
                var _this = this;
                this.ORIGION_LIST = yufp.lookup.find('ORIGION_LIST');
                this.userCodeNo();
                var roles = yufp.session.roles;
                _this.isManager = false;
                var selectRole = yufp.sessionStorage.get('selectRole');
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i].id === selectRole && roles[i].code != 'R003' && roles[i].code != 'R002') {
                        _this.isManager = true;
                        return;
                    }
                }
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
                        if (this.addVisible && this.addName == '1') {
                            this.addOneFormData.relationCust = str1;
                        }
                        if (this.addVisible && this.addName == '2') {
                            this.addCycleFormData.relationCust = str1;
                        }
                        if (this.editVisible) {
                            this.editFormData.relationCust = str1;
                        }
                        if (this.sonDetailVisible) {
                            this.sonDetailFormData.relationCust = str1;
                        }
                        if (this.sonEditVisible) {
                            this.sonEditFormData.relationCust = str1;
                        }

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
                    // $('#savetj').removeClass("yu-disable");

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
                onfocustwo: function() {
                    this.createVisible = true;
                },
                onfocusthree: function() {
                    this.createVisible = true;
                },
                onfocusfour: function() {
                    this.createVisible = true;
                },
                onfocusfive: function() {
                    this.createVisible = true;
                },
                custSelFn: function(val) {
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
                    if (this.addVisible && this.addName == '1') {
                        this.addOneFormData.relationCust = str1;
                    }
                    if (this.addVisible && this.addName == '2') {
                        this.addCycleFormData.relationCust = str1;
                    }
                    if (this.editVisible) {
                        this.editFormData.relationCust = str1;
                    }
                    if (this.sonDetailVisible) {
                        this.sonDetailFormData.relationCust = str1;
                    }
                    if (this.sonEditVisible) {
                        this.sonEditFormData.relationCust = str1;
                    }

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
                /**
                 * 格式化日期：yyyy-MM-dd hh:mm
                 */
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
                // 点击删除按钮->批量删除
                deleteMulFn: function() {
                    var _this = this;
                    var selections = [];
                    if (_this.tabName == '1') {
                        selections = _this.$refs.myTable.selections;
                    }
                    if (_this.tabName == '2') {
                        selections = _this.$refs.managerTable.selections;
                    }
                    var state1 = [];
                    var notDel = [];
                    for (var i = 0; i < selections.length; i++) {
                        var item = selections[i];
                        var loginCode = yufp.session.user.loginCode;
                        if (loginCode != item.creatorId) {
                            notDel.push(item);
                        } else {
                            if (item.todoWorkState == '1') {
                                state1.push(item);
                            } else if (item.todoWorkState == '2') {
                                notDel.push(item);
                            }
                        }

                    }
                    if (state1.length < 1) {
                        _this.$message({ message: '请先选择一条非下发的待跟进的记录', type: 'warning' });
                        return;
                    }
                    var str = '此操作将永久删除' + state1.length + '条待跟进主待办,' + (notDel.length < 1 ? '' : '选择的' + notDel.length + '条待办不能被删除');
                    _this.$confirm(str, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.util.butLogInfo(hashCode, '待办事项', '批量删除');
                                var oneList = [];
                                var cycleList = [];
                                for (let index = 0; index < state1.length; index++) {
                                    const element = state1[index];
                                    if (element.isNotice == 'N') {
                                        oneList.push(element.todoWorkId);
                                    } else if (element.isNotice == 'Y') {
                                        cycleList.push(element.todoWorkId);
                                    }
                                }
                                if (oneList.length > 0) {
                                    yufp.service.request({
                                        method: 'GET',
                                        url: '/api/todowork/deleteOne',
                                        data: {
                                            todoWorkId: oneList.join(';')
                                        },
                                        callback: function(code, message, response) {
                                            if (code == 0) {
                                                _this.$message(response.data);
                                                if (_this.tabName == '1') {
                                                    _this.$refs.myTable.remoteData();
                                                }
                                                if (_this.tabName == '2') {
                                                    _this.$refs.managerTable.remoteData();
                                                }
                                            }
                                        }
                                    });
                                }
                                if (cycleList.length > 0) {
                                    yufp.service.request({
                                        method: 'GET',
                                        url: '/api/todowork/deleteCycle',
                                        data: {
                                            todoWorkId: cycleList.join(';')
                                        },
                                        callback: function(code, message, response) {
                                            if (code == 0) {
                                                _this.$message(response.data);
                                                if (_this.tabName == '1') {
                                                    _this.$refs.myTable.remoteData();
                                                }
                                                if (_this.tabName == '2') {
                                                    _this.$refs.managerTable.remoteData();
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                },
                // 点击导出按钮->批量导出
                exportMulFn: function() {
                    var _this = this;
                    var con = {};
                    var selections = [];
                    if (_this.tabName == '1') {
                        selections = _this.$refs.myTable.selections;
                    }
                    if (_this.tabName == '2') {
                        selections = _this.$refs.managerTable.selections;
                    }
                    var len = selections.length;
                    if (len < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var oneList = [];
                    var cycleList = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].isNotice == 'N') {
                            oneList.push(selections[i].todoWorkId);
                        }
                        if (selections[i].isNotice == 'Y') {
                            cycleList.push(selections[i].todoWorkId);
                        }
                    }
                    if (oneList.length > 0) {
                        con.oneList = oneList;
                    }
                    if (cycleList.length > 0) {
                        con.cycleList = cycleList;
                    }
                    // con.colunmNamelist = _this.colunmNamelist;
                    var url = '/api/todowork/export?' + 'condition=' + encodeURI(JSON.stringify(con));
                    yufp.util.download(url);
                    yufp.util.butLogInfo(hashCode, '待办事项', '批量导出');
                },
                // 点击“+待办事项”按钮->弹出新增对话框
                addFn: function() {
                    var _this = this;
                    _this.addVisible = true;
                    _this.addName = '1';
                    _this.operate = 1;
                    _this.$nextTick(function() {
                        _this.clearObj(_this.addOneFormData);
                        _this.clearObj(_this.addCycleFormData);
                        _this.$refs.addOneForm.resetFields();
                        _this.$refs.addCycleForm.resetFields();
                        _this.addOneFormData.finisher = yufp.session.userName + '/' + yufp.session.userId;
                        _this.addCycleFormData.finisher = yufp.session.userName + '/' + yufp.session.userId;
                        _this.addOneFormData.contactType = '1';
                        _this.addCycleFormData.contactType = '1';
                        _this.addOneFormData.contactGoal = '1';
                        _this.addCycleFormData.contactGoal = '1';
                        _this.addCycleFormData.noticeCycle = '1';
                        _this.addOneFormData.startDate = new Date();
                        _this.addCycleFormData.startDate = new Date();
                    });
                },
                // "我的"页签表格时间类型格式化输出
                formJE: function(row, column, cellValue) {
                    if (cellValue) {
                        cellValue = yufp.util.dateFormat(cellValue, '{y}-{m}-{d}');
                    }
                    return cellValue;
                },
                // 详情
                toDetail: function(row) {
                    var _this = this;
                    yufp.clone(row, _this.detail);
                    _this.detail.isNotice = row.isNotice;
                    _this.detailVisible = true;
                    _this.operate = 3;
                    _this.$nextTick(function() {
                        _this.clearObj(_this.detailFormData);
                        _this.$refs.detailForm.resetFields();
                        // yufp.clone(row, _this.detailFormData);
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/todowork/queryDetail',
                            data: {
                                condition: JSON.stringify({
                                    todoWorkId: row.todoWorkId
                                })
                            },
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    var list = response.data[0];
                                    _this.$delete(list, 'sonToDo');
                                    yufp.clone(list, _this.detailFormData);
                                    if (list.relationCust) {
                                        _this.custList = list.relationCust.split(';');
                                        _this.custvalueson = list.relationCust.split(';');
                                    }

                                    // _this.$set(_this.detailFormData, 'startDate', list.startDate);
                                    _this.detailFormData.creator = list.creatorName + '/' + list.creatorId;

                                    // if (list.isNotice == 'Y') {
                                    //     _this.sonlistdata = sonToDo;
                                    // }
                                    _this.$set(_this.detail, 'flag', true);
                                }
                            }
                        });

                        if (row.isNotice == 'Y') {
                            var model = {
                                condition: JSON.stringify({
                                    todoWorkId: row.todoWorkId
                                })
                            };
                            _this.$refs.sonTable.remoteData(model);
                        }
                    });
                },
                toSonDetail: function(row) {
                    var _this = this;
                    _this.detailVisible = false;
                    _this.sonDetailVisible = true;
                    _this.operate = 4;
                    _this.$nextTick(function() {
                        _this.clearObj(_this.sonDetailFormData);
                        _this.$refs.sonDetailForm.resetFields();
                        yufp.clone(row, _this.sonDetailFormData);
                    });
                },
                // "我的"页签表格点击操作单元格时暂存当前行数据
                handleOptionVisibleChange: function(data) {
                    this.tableEditFormdata = {};
                    if (data) {
                        yufp.clone(data, this.tableEditFormdata);
                    }
                },
                // "我的"页签表格选择操作
                handleOptionSelect: function(command) {
                    switch (command) {
                        case 'delete':
                            this.deleteOneFn();
                            break;
                        case 'edit':
                            this.modifyFn();
                            break;
                        case 'state':
                            this.updateToDoWorkState();
                            break;
                    }
                },
                // "我的"页签表格选择删除操作->单个删除
                deleteOneFn: function() {
                    var _this = this;
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                var list = [];
                                list.push(_this.tableEditFormdata.todoWorkId);
                                if (_this.tableEditFormdata.noticeId) {
                                    yufp.service.request({
                                        method: 'GET',
                                        url: '/api/todowork/deleteSon',
                                        data: {
                                            todoWorkId: list
                                        },
                                        callback: function(code, message, response) {
                                            if (code == 0) {
                                                _this.$message(response.data);
                                                _this.$refs.sonTable.remoteData();
                                                yufp.util.butLogInfo(hashCode, '待办事项', '删除单个子待办');
                                            }
                                        }
                                    });
                                } else if (_this.tableEditFormdata.isNotice == 'N') {
                                    yufp.service.request({
                                        method: 'GET',
                                        url: '/api/todowork/deleteOne',
                                        data: {
                                            todoWorkId: list
                                        },
                                        callback: function(code, message, response) {
                                            if (code == 0) {
                                                _this.$message(response.data);
                                                if (_this.tabName == '1') {
                                                    _this.$refs.myTable.remoteData();
                                                }
                                                if (_this.tabName == '2') {
                                                    _this.$refs.managerTable.remoteData();
                                                }
                                                yufp.util.butLogInfo(hashCode, '待办事项', '删除单个一次性待办');
                                            }
                                        }
                                    });
                                } else if (_this.tableEditFormdata.isNotice == 'Y') {
                                    yufp.service.request({
                                        method: 'GET',
                                        url: '/api/todowork/deleteCycle',
                                        data: {
                                            todoWorkId: list
                                        },
                                        callback: function(code, message, response) {
                                            if (code == 0) {
                                                _this.$message(response.data);
                                                if (_this.tabName == '1') {
                                                    _this.$refs.myTable.remoteData();
                                                }
                                                if (_this.tabName == '2') {
                                                    _this.$refs.managerTable.remoteData();
                                                }
                                                yufp.util.butLogInfo(hashCode, '待办事项', '删除单个周期性待办');
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                },
                detailAndDelete: function(data) {
                    var _this = this;
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                var list = [];
                                list.push(data.todoWorkId);
                                if (data.noticeId) {
                                    yufp.service.request({
                                        method: 'GET',
                                        url: '/api/todowork/deleteSon',
                                        data: {
                                            todoWorkId: list
                                        },
                                        callback: function(code, message, response) {
                                            if (code == 0) {
                                                _this.$refs.sonTable.remoteData();
                                                _this.$message('操作成功');
                                                yufp.util.butLogInfo(hashCode, '待办事项', '删除单个子待办');
                                            }
                                        }
                                    });
                                } else if (data.isNotice == 'N') {
                                    yufp.service.request({
                                        method: 'GET',
                                        url: '/api/todowork/deleteOne',
                                        data: {
                                            todoWorkId: list
                                        },
                                        callback: function(code, message, response) {
                                            if (code == 0) {
                                                _this.cancelFn();
                                                _this.$refs.myTable.remoteData();
                                                _this.$message('操作成功');
                                                yufp.util.butLogInfo(hashCode, '待办事项', '删除单个一次性待办');
                                            }
                                        }
                                    });
                                } else if (data.isNotice == 'Y') {
                                    yufp.service.request({
                                        method: 'GET',
                                        url: '/api/todowork/deleteCycle',
                                        data: {
                                            todoWorkId: list
                                        },
                                        callback: function(code, message, response) {
                                            if (code == 0) {
                                                _this.cancelFn();
                                                _this.$refs.myTable.remoteData();
                                                _this.$message('操作成功');
                                                yufp.util.butLogInfo(hashCode, '待办事项', '删除单个周期性待办');
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                },
                // "我的"页签表格选择编辑操作->弹出编辑对话框
                modifyFn: function() {
                    var _this = this;
                    if (_this.tableEditFormdata.noticeId != null && _this.tableEditFormdata.noticeId != '') {
                        _this.detailVisible = false;
                        _this.sonEditVisible = true;
                        _this.operate = 5;
                        _this.$nextTick(function() {
                            _this.clearObj(_this.sonEditFormData);
                            _this.$refs.sonEditForm.resetFields();
                            yufp.clone(_this.tableEditFormdata, _this.sonEditFormData);
                        });
                    } else {
                        _this.editVisible = true;
                        _this.operate = 2;
                        _this.$nextTick(function() {
                            _this.clearObj(_this.editFormData);
                            _this.$refs.editForm.resetFields();
                            yufp.service.request({
                                method: 'GET',
                                url: '/api/todowork/queryDetail',
                                data: {
                                    condition: JSON.stringify({
                                        todoWorkId: _this.tableEditFormdata.todoWorkId
                                    })
                                },
                                callback: function(code, message, response) {
                                    if (code == 0) {
                                        var list = response.data[0];
                                        var sonToDo = list.sonToDo;
                                        _this.$delete(list, 'sonToDo');
                                        yufp.clone(list, _this.editFormData);
                                        _this.editFormData.creator = list.creatorName + '/' + list.creatorId;
                                        if (list.isNotice == 'Y') {
                                            _this.editFormData.startDate = yufp.util.dateFormat(list.startDate, '{y}-{m}-{d} {h}:{i}');
                                            _this.editFormData.endDate = yufp.util.dateFormat(list.endDate, '{y}-{m}-{d} {h}:{i}');
                                            _this.chgNoticeCycle(list.noticeCycle);
                                            _this.chgNoticeStartDate(_this.editFormData.startDate);
                                            _this.chgNoticeEndDate(_this.editFormData.endDate);
                                            if (sonToDo[0].startDate == list.startDate) {
                                                _this.isStart = false;
                                                if (sonToDo.length > 1) {
                                                    _this.nextNoticeDate = yufp.util.dateFormat(sonToDo[1].startDate, '{y}-{m}-{d}');
                                                }
                                            } else {
                                                _this.isStart = true;
                                                _this.nextNoticeDate = yufp.util.dateFormat(sonToDo[0].startDate, '{y}-{m}-{d}');
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    }
                },
                detailAndModify: function(data) {
                    var _this = this;
                    _this.detailVisible = false;
                    yufp.clone(data, _this.tableEditFormdata);
                    _this.editVisible = true;
                    _this.operate = 2;
                    _this.$nextTick(function() {
                        _this.clearObj(_this.editFormData);
                        _this.$refs.editForm.resetFields();
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/todowork/queryDetail',
                            data: {
                                condition: JSON.stringify({
                                    todoWorkId: data.todoWorkId
                                })
                            },
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    var list = response.data[0];
                                    var sonToDo = list.sonToDo;
                                    _this.custvalue = list.relationCust;
                                    _this.$delete(list, 'sonToDo');
                                    yufp.clone(list, _this.editFormData);
                                    _this.editFormData.creator = list.creatorName + '/' + list.creatorId;
                                    if (list.isNotice == 'Y') {
                                        _this.editFormData.startDate = yufp.util.dateFormat(list.startDate, '{y}-{m}-{d} {h}:{i}');
                                        _this.editFormData.endDate = yufp.util.dateFormat(list.endDate, '{y}-{m}-{d} {h}:{i}');
                                        _this.chgNoticeCycle(list.noticeCycle);
                                        _this.chgNoticeStartDate(_this.editFormData.startDate);
                                        _this.chgNoticeEndDate(_this.editFormData.endDate);
                                        if (sonToDo[0].startDate == list.startDate) {
                                            _this.isStart = false;
                                            if (sonToDo.length > 1) {
                                                _this.nextNoticeDate = yufp.util.dateFormat(sonToDo[1].startDate, '{y}-{m}-{d}');
                                            }
                                        } else {
                                            _this.isStart = true;
                                            _this.nextNoticeDate = yufp.util.dateFormat(sonToDo[0].startDate, '{y}-{m}-{d}');
                                        }
                                    }
                                }
                            }
                        });
                    });
                },
                // "我的"页签表格选择已跟进操作->修改事项状态
                updateToDoWorkState: function() {
                    var _this = this;
                    yufp.util.butLogInfo(hashCode, '待办事项', '状态修改');
                    var list = [];
                    list.push(_this.tableEditFormdata.todoWorkId);
                    if (_this.tableEditFormdata.noticeId) {
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/todowork/updateToDoWorkSonState',
                            data: {
                                todoWorkId: list
                            },
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    _this.$refs.sonTable.remoteData();
                                    _this.$message('操作成功');
                                    yufp.util.butLogInfo(hashCode, '待办事项', '跟进子待办');
                                }
                            }
                        });
                    } else {
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/todowork/updateToDoWorkState',
                            data: {
                                todoWorkId: list
                            },
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    if (_this.tabName == '1') {
                                        _this.$refs.myTable.remoteData();
                                    }
                                    if (_this.tabName == '2') {
                                        _this.$refs.managerTable.remoteData();
                                    }
                                    _this.$message('操作成功');
                                    yufp.util.butLogInfo(hashCode, '待办事项', '跟进一次性待办');
                                }
                            }
                        });
                    }
                },
                detailAndState: function(detailFormData) {
                    var _this = this;
                    var list = []
                    list.push(detailFormData.todoWorkId);
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/todowork/updateToDoWorkState',
                        data: {
                            todoWorkId: list
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.$message('操作成功');
                                _this.$refs.myTable.remoteData();
                                yufp.util.butLogInfo(hashCode, '待办事项', '跟进一次性待办');
                                _this.$refs.myTable.remoteData();
                            }
                            _this.detailVisible = false;
                        }
                    });
                },
                // 关闭新增对话框
                cancelFn: function() {
                    var _this = this;
                    if (this.operate == 1) {
                        this.addVisible = false;
                    }
                    if (this.operate == 2) {
                        this.editVisible = false;
                    }
                    if (this.operate == 3) {
                        this.detailVisible = false;
                        this.detail = {};
                    }
                    if (this.operate == 4) {
                        this.sonDetailVisible = false;
                    }
                    if (this.operate == 5) {
                        this.sonEditVisible = false;
                    }
                    if (this.tabName == '1') {
                        _this.$refs.myTable.remoteData();
                    }
                    if (this.tabName == '2') {
                        _this.$refs.managerTable.remoteData();
                    }
                    this.operate == 0;
                },
                /**
                 * 客户放大镜 回调
                 */
                // custSelFn: function(data) {
                //     var _this = this;
                //     if (!data || data.length < 1) {
                //         return;
                //     }
                //     var relationCust = '';
                //     var arr = [];
                //     for (var i = 0; i < data.length; i++) {
                //         arr.push(data[i].custName + '/' + data[i].custId);
                //     }
                //     relationCust = arr.join(';');
                //     if (_this.addVisible) {
                //         var addName = _this.addName;
                //         if (addName == '1') {
                //             _this.addOneFormData.relationCust = '';
                //         }
                //         if (addName == '2') {
                //             _this.addCycleFormData.relationCust = '';
                //         }
                //         if (addName == '1') {
                //             _this.addOneFormData.relationCust = relationCust;
                //         }
                //         if (addName == '2') {
                //             _this.addCycleFormData.relationCust = relationCust;
                //         }
                //     } else if (_this.editVisible) {
                //         _this.editFormData.relationCust = relationCust;
                //     } else if (_this.sonEditVisible) {
                //         _this.sonEditFormData.relationCust = relationCust;
                //     }
                // },
                /**
                 * 客户经理放大镜 回调
                 */
                userSelFn: function(data) {
                    var _this = this;
                    if (!data || data.length < 1) {
                        return;
                    }
                    var addName = _this.addName;
                    if (addName == '1') {
                        _this.addOneFormData.finisher = '';
                    }
                    if (addName == '2') {
                        _this.addCycleFormData.finisher = '';
                    }
                    var finisher = '';
                    for (var key in data) {
                        finisher += data[key].userName + '/' + data[key].userId;
                        if ((key + 1) < data.length) {
                            finisher += ';';
                        }
                    }
                    if (addName == '1') {
                        _this.addOneFormData.finisher = finisher;
                    }
                    if (addName == '2') {
                        _this.addCycleFormData.finisher = finisher;
                    }
                },
                // 改变周期性待办的周期
                chgNoticeCycle: function(val) {
                    var _this = this;
                    var nextNoticeDate = null;
                    if (_this.operate == 1) {
                        if (_this.addCycleFormData.startDate != undefined) {
                            if (val === '1') {
                                nextNoticeDate = _this.addCycleFormData.startDate.getTime() + 24 * 60 * 60 * 1000;
                            } else if (val === '2') {
                                nextNoticeDate = _this.addCycleFormData.startDate.getTime() + 7 * 24 * 60 * 60 * 1000;
                            } else if (val === '3') {
                                nextNoticeDate = _this.addCycleFormData.startDate.getTime() + 14 * 24 * 60 * 60 * 1000;
                            } else if (val === '4') {
                                nextNoticeDate = _this.addCycleFormData.startDate.getTime() + 30 * 24 * 60 * 60 * 1000;
                            }
                        }
                        if (nextNoticeDate != null) {
                            if (_this.addCycleFormData.endDate != undefined && nextNoticeDate > _this.addCycleFormData.endDate.getTime()) {
                                this.nextNoticeDate = '下次提醒日期事项已结束';
                            } else {
                                this.nextNoticeDate = yufp.util.dateFormat(new Date(nextNoticeDate), '{y}-{m}-{d}');
                            }
                        }
                    }
                    if (_this.operate == 2) {
                        if (_this.editFormData.startDate != undefined) {
                            var startDate = _this.editFormData.startDate instanceof Date ? _this.editFormData.startDate : new Date(_this.editFormData.startDate);
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
                            if (_this.editFormData.endDate != undefined) {
                                var endDate = _this.editFormData.endDate instanceof Date ? _this.editFormData.endDate : new Date(_this.editFormData.endDate);
                                if (nextNoticeDate > endDate.getTime()) {
                                    this.nextNoticeDate = '下次提醒日期事项已结束';
                                } else {
                                    this.nextNoticeDate = yufp.util.dateFormat(new Date(nextNoticeDate), '{y}-{m}-{d}');
                                }
                            } else {
                                this.nextNoticeDate = yufp.util.dateFormat(new Date(nextNoticeDate), '{y}-{m}-{d}');
                            }
                        }
                    }
                },
                // 改变周期性待办的开始时间
                chgNoticeStartDate: function(time) {
                    var _this = this;
                    var nextNoticeDate = null;
                    var startDate = time instanceof Date ? time : new Date(time);
                    if (_this.operate == 1) {
                        if (_this.addCycleFormData.noticeCycle != undefined) {
                            if (_this.addCycleFormData.noticeCycle === '1') {
                                nextNoticeDate = startDate.getTime() + 24 * 60 * 60 * 1000;
                            } else if (_this.addCycleFormData.noticeCycle === '2') {
                                nextNoticeDate = startDate.getTime() + 7 * 24 * 60 * 60 * 1000;
                            } else if (_this.addCycleFormData.noticeCycle === '3') {
                                nextNoticeDate = startDate.getTime() + 14 * 24 * 60 * 60 * 1000;
                            } else if (_this.addCycleFormData.noticeCycle === '4') {
                                nextNoticeDate = startDate.getTime() + 30 * 24 * 60 * 60 * 1000;
                            }
                        }
                        if (nextNoticeDate != null) {
                            if (_this.addCycleFormData.endDate != undefined && nextNoticeDate > _this.addCycleFormData.endDate.getTime()) {
                                this.nextNoticeDate = '下次提醒日期事项已结束';
                            } else {
                                this.nextNoticeDate = yufp.util.dateFormat(new Date(nextNoticeDate), '{y}-{m}-{d}');
                            }
                        }
                    }
                    if (_this.operate == 2) {
                        if (_this.editFormData.noticeCycle != undefined) {
                            if (_this.editFormData.noticeCycle === '1') {
                                nextNoticeDate = startDate.getTime() + 24 * 60 * 60 * 1000;
                            } else if (_this.editFormData.noticeCycle === '2') {
                                nextNoticeDate = startDate.getTime() + 7 * 24 * 60 * 60 * 1000;
                            } else if (_this.editFormData.noticeCycle === '3') {
                                nextNoticeDate = startDate.getTime() + 14 * 24 * 60 * 60 * 1000;
                            } else if (_this.editFormData.noticeCycle === '4') {
                                nextNoticeDate = startDate.getTime() + 30 * 24 * 60 * 60 * 1000;
                            }
                        }
                        if (nextNoticeDate != null) {
                            if (_this.editFormData.endDate != undefined) {
                                var endDate = _this.editFormData.endDate instanceof Date ? _this.editFormData.endDate : new Date(_this.editFormData.endDate);
                                if (nextNoticeDate > endDate.getTime()) {
                                    this.nextNoticeDate = '下次提醒日期事项已结束';
                                } else {
                                    this.nextNoticeDate = yufp.util.dateFormat(new Date(nextNoticeDate), '{y}-{m}-{d}');
                                }
                            } else {
                                this.nextNoticeDate = yufp.util.dateFormat(new Date(nextNoticeDate), '{y}-{m}-{d}');
                            }
                        }
                    }
                },
                // 改变周期性待办的结束时间
                chgNoticeEndDate: function(time) {
                    var _this = this;
                    var nextNoticeDate = null;
                    var endDate = time instanceof Date ? time : new Date(time);
                    if (_this.operate == 1) {
                        if (_this.addCycleFormData.startDate != undefined && _this.addCycleFormData.noticeCycle != undefined) {
                            if (_this.addCycleFormData.noticeCycle === '1') {
                                nextNoticeDate = _this.addCycleFormData.startDate.getTime() + 24 * 60 * 60 * 1000;
                            } else if (_this.addCycleFormData.noticeCycle === '2') {
                                nextNoticeDate = _this.addCycleFormData.startDate.getTime() + 7 * 24 * 60 * 60 * 1000;
                            } else if (_this.addCycleFormData.noticeCycle === '3') {
                                nextNoticeDate = _this.addCycleFormData.startDate.getTime() + 14 * 24 * 60 * 60 * 1000;
                            } else if (_this.addCycleFormData.noticeCycle === '4') {
                                nextNoticeDate = _this.addCycleFormData.startDate.getTime() + 30 * 24 * 60 * 60 * 1000;
                            }
                        }
                        if (nextNoticeDate != null) {
                            if (nextNoticeDate <= endDate.getTime()) {
                                this.nextNoticeDate = yufp.util.dateFormat(new Date(nextNoticeDate), '{y}-{m}-{d}');
                            } else {
                                this.nextNoticeDate = '下次提醒日期事项已结束';
                            }
                        }
                    }
                    if (_this.operate == 2) {
                        if (_this.editFormData.startDate != undefined && _this.editFormData.noticeCycle != undefined) {
                            var startDate = _this.editFormData.startDate instanceof Date ? _this.editFormData.startDate : new Date(_this.editFormData.startDate);
                            if (_this.editFormData.noticeCycle === '1') {
                                nextNoticeDate = startDate.getTime() + 24 * 60 * 60 * 1000;
                            } else if (_this.editFormData.noticeCycle === '2') {
                                nextNoticeDate = startDate.getTime() + 7 * 24 * 60 * 60 * 1000;
                            } else if (_this.editFormData.noticeCycle === '3') {
                                nextNoticeDate = startDate.getTime() + 14 * 24 * 60 * 60 * 1000;
                            } else if (_this.editFormData.noticeCycle === '4') {
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
                    }
                },
                // 对话框确定按钮
                saveFn: function(val1, val2) {
                    // 多次点击按钮处理
                    $("#addone").addClass("yu-disable");
                    $("#addtwo").addClass("yu-disable");
                    $("#editone").addClass("yu-disable");
                    $("#edittwo").addClass("yu-disable");
                    $("#saveson").addClass("yu-disable");
                    setTimeout(function() {
                        $("#addone").removeClass("yu-disable");
                        $("#addtwo").removeClass("yu-disable");
                        $("#editone").removeClass("yu-disable");
                        $("#edittwo").removeClass("yu-disable");
                        $("#saveson").removeClass("yu-disable");
                    }, 3000);
                    var validate;
                    var _this = this;
                    var model = {};
                    var validname = yufp.session.userName + '/' + yufp.session.userId;
                    if (val1 == 'add') {
                        if (val2 == '1') {
                            _this.$refs.addOneForm.validate(function(valid) {
                                validate = valid;
                            });
                            if (!validate) {
                                return;
                            }
                            // 判断选择了客户客户跟进
                            if (_this.addOneFormData.todoWorkType == '5') {
                                if (!_this.addOneFormData.relationCust) {
                                    _this.$message.warning('关联客户为空！');
                                    return;
                                }
                            }
                            if (_this.tabName == '2' && _this.addOneFormData.finisher == validname) {
                                _this.$message.warning('不能给自己下发待办！');
                                // $("#addone").removeClass("yu-disable");
                                return;
                            }
                            yufp.clone(_this.addOneFormData, model);
                            model.startDate = model.startDate instanceof Date ? _this.formatDate(model.startDate) : model.startDate;
                            if (_this.addOneFormData.todoWorkType != '5') {
                                model.contactType = null;
                                model.contactGoal = null;
                            }
                            // 新增请求
                            yufp.service.request({
                                method: 'POST',
                                url: '/api/todowork/addOne',
                                data: model,
                                callback: function(code, message, response) {
                                    if (code == 0) {
                                        yufp.util.butLogInfo(hashCode, '待办事项', '新增一次性待办');
                                        if (_this.tabName == '1') {
                                            _this.$refs.myTable.remoteData();
                                        }
                                        if (_this.tabName == '2') {
                                            _this.$refs.managerTable.remoteData();
                                        }
                                        _this.$message('操作成功');
                                        _this.addVisible = false;
                                    }
                                }
                            });
                        } else if (val2 == '2') {
                            _this.$refs.addCycleForm.validate(function(valid) {
                                validate = valid;
                            });
                            if (!validate) {
                                return;
                            }
                            if (_this.tabName == '2' && _this.addCycleFormData.finisher == validname) {
                                _this.$message.warning('不能给自己下发待办！');
                                // $("#addtwo").removeClass("yu-disable");
                                return;
                            }
                            // 判断选择了客户客户跟进
                            if (_this.addCycleFormData.todoWorkType == '5') {
                                if (!_this.addCycleFormData.relationCust) {
                                    _this.$message.warning('关联客户为空！');
                                    return;
                                }
                            }
                            yufp.clone(_this.addCycleFormData, model);
                            model.startDate = model.startDate instanceof Date ? _this.formatDate(model.startDate) : model.startDate;
                            model.endDate = model.endDate instanceof Date ? _this.formatDate(model.endDate) : model.endDate;
                            if (_this.addCycleFormData.todoWorkType != '5') {
                                model.contactType = null;
                                model.contactGoal = null;
                            }
                            if (model.endDate < model.startDate) {
                                _this.$message('编辑失败，请重新选择结束时间');
                                // $("#addone").removeClass("yu-disable");
                                // $("#addtwo").removeClass("yu-disable");
                                // $("#editone").removeClass("yu-disable");
                                // $("#edittwo").removeClass("yu-disable");
                                // $("#saveson").removeClass("yu-disable");
                                return;
                            }
                            // 新增请求
                            yufp.service.request({
                                method: 'POST',
                                url: '/api/todowork/addCyCle',
                                data: model,
                                callback: function(code, message, response) {
                                    if (code == 0) {
                                        yufp.util.butLogInfo(hashCode, '待办事项', '新增周期性待办');
                                        if (_this.tabName == '1') {
                                            _this.$refs.myTable.remoteData();
                                        }
                                        if (_this.tabName == '2') {
                                            _this.$refs.managerTable.remoteData();
                                        }
                                        _this.$message('操作成功');
                                        _this.addVisible = false;
                                    }
                                }
                            });
                        }
                    } else if (val1 == 'edit') {
                        _this.$refs.editForm.validate(function(valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            return;
                        }
                        yufp.clone(_this.editFormData, model);
                        model.startDate = model.startDate instanceof Date ? _this.formatDate(model.startDate) : model.startDate;
                        if (val2 == '1') {
                            // 修改请求
                            yufp.service.request({
                                method: 'POST',
                                url: '/api/todowork/updateOne',
                                data: model,
                                callback: function(code, message, response) {
                                    if (code == 0) {
                                        yufp.util.butLogInfo(hashCode, '待办事项', '编辑一次性待办');
                                        if (_this.tabName == '1') {
                                            _this.$refs.myTable.remoteData();
                                        }
                                        if (_this.tabName == '2') {
                                            _this.$refs.managerTable.remoteData();
                                        }
                                        _this.$message('操作成功');
                                        _this.editVisible = false;
                                    }
                                }
                            });
                        }
                        if (val2 == '2') {
                            model.endDate = model.endDate instanceof Date ? _this.formatDate(model.endDate) : model.endDate;
                            if (model.endDate < model.startDate) {
                                _this.$message('编辑失败，请重新选择结束时间');
                                // $("#addone").removeClass("yu-disable");
                                // $("#addtwo").removeClass("yu-disable");
                                // $("#editone").removeClass("yu-disable");
                                // $("#edittwo").removeClass("yu-disable");
                                // $("#saveson").removeClass("yu-disable");
                                return;
                            }
                            // 新增请求
                            yufp.service.request({
                                method: 'POST',
                                url: '/api/todowork/updateCyCle',
                                data: model,
                                callback: function(code, message, response) {
                                    if (code == 0) {
                                        yufp.util.butLogInfo(hashCode, '待办事项', '编辑周期性待办');
                                        if (_this.tabName == '1') {
                                            _this.$refs.myTable.remoteData();
                                        }
                                        if (_this.tabName == '2') {
                                            _this.$refs.managerTable.remoteData();
                                        }
                                        _this.$message('操作成功');
                                        _this.editVisible = false;
                                    }
                                }
                            });
                        }
                    } else if (val1 == 'son') {
                        _this.$refs.sonEditForm.validate(function(valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            return;
                        }
                        yufp.clone(_this.sonEditFormData, model);
                        _this.$confirm('请选择编辑的数据', '提示', {
                            distinguishCancelAndClose: true,
                            confirmButtonText: '仅编辑该条数据',
                            cancelButtonText: '编辑之后的所有数据',
                            type: 'primary',
                            center: true,
                            callback: function(action) {
                                if (action === 'confirm') {
                                    yufp.service.request({
                                        method: 'POST',
                                        url: '/api/todowork/updateSon',
                                        data: model,
                                        callback: function(code, message, response) {
                                            if (code == 0) {
                                                _this.sonEditVisible = false;
                                                _this.toDetail(_this.detail);
                                                _this.$message('操作成功');
                                                yufp.util.butLogInfo(hashCode, '待办事项', '编辑一条代办');
                                                // $("#saveson").removeClass("yu-disable");
                                            }
                                        }
                                    });
                                } else if (action === 'cancel') {
                                    yufp.service.request({
                                        method: 'POST',
                                        url: '/api/todowork/updateSons',
                                        data: model,
                                        callback: function(code, message, response) {
                                            if (code == 0) {
                                                _this.sonEditVisible = false;
                                                _this.toDetail(_this.detail);
                                                _this.$message('操作成功');
                                                yufp.util.butLogInfo(hashCode, '待办事项', '编辑多条子代办');
                                            }
                                        }
                                    });
                                } else if (action === 'close') {
                                    _this.sonEditVisible = false;
                                }
                            }
                        });
                    }
                },
                toCustomer360View: function(data) {
                    var _this = this;
                    _this.detailVisible = false;
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
                returnIsupdate: function(data) {
                    if (data == yufp.session.user.loginCode) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });
    };
});