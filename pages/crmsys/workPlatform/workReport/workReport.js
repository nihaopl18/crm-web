/**
 * @Created by lufl lufl@yusys.com.cn on 2021-9-3 15:02:43.
 * @updated by
 * @description 工作报告
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
        yufp.lookup.reg('DY0003,DY0004,DY0005,DY0006,CRUD_TYPE,DY0002,CD0348,CD0069,IS_DRAFT');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _this = this;
                var checkID = function (rule, value, callback) {
                    if (_this.singleQueryParams.certNo && !value) {
                        return callback(new Error('请选择证件类型'));
                    } else if (!_this.singleQueryParams.certNo && !value) {
                        _this.$refs.singleQueryForm.clearValidate('certNo');
                        callback();
                    } else {
                        callback();
                    }
                };
                var checkCertNo = function (rule, value, callback) {
                    if (_this.singleQueryParams.custType && !value) {
                        return callback(new Error('请输入证件号码'));
                    } else if (!_this.singleQueryParams.custType && !value) {
                        _this.$refs.singleQueryForm.clearValidate('custType');
                        callback();
                    } else {
                        callback();
                    }
                };
                var roles = yufp.session.roles;
                var selectRoleId = yufp.sessionStorage.get('selectRole');
                var selectRoleCode = '';
                var selectRoleName = '';
                var roleType = '';
                for (let index = 0; index < roles.length; index++) {
                    const element = roles[index];
                    if (element.id == selectRoleId) {
                        selectRoleCode = element.code;
                        selectRoleName = element.name;
                        if ('R017,R015'.indexOf(selectRoleCode) != -1) {
                            roleType = '1';
                        } else if ('R016'.indexOf(selectRoleCode) != -1) {
                            roleType = '2';
                        }
                    }

                };
                //周报月报总结校验
                var checkedNotNull = function (rule, value, collback) {
                    if (_this.workReportBusiType === 'week' || _this.workReportBusiType === 'month') {
                        if (!value || value.trim() === '') {
                            collback(new Error('请输入'));
                        } else {
                            collback();
                        }
                    } else {
                        collback();
                    }
                };
                var checkedDate = function (rule, value, callback) {
                    if (!value) {
                        callback(new Error('请输入'));
                    }
                    if (!_this.customerContactData[0].nextContactDate) {
                        callback();
                    } else if (_this.customerContactData[0].nextContactDate && _this.customerContactData[0].nextContactDate >= value) {
                        callback();
                    } else if (_this.customerContactData[0].nextContactDate && _this.customerContactData[0].nextContactDate >= new Date(value)) {
                        callback();
                    } else {
                        callback(new Error('跟进时间大于下次跟进时间!'));
                    }
                };
                return {
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
                    tabName: '1',
                    isManager: false,
                    searchDay: false,
                    searchformdata1: {},
                    searchformdata2: {},
                    searchformdata3: {},
                    dataUrl: '/api/infoworkreport/querylist',
                    dataUrl2: '/api/infoworkreport/queryMlist',
                    listdata: [],
                    myParams: { //我的工作报告默认查询参数
                        condition: JSON.stringify({
                            isDraft: '%N%',
                            creatorId: yufp.session.user.loginCode
                        })
                    },
                    draftParams: { //草稿箱默认查询参数
                        condition: JSON.stringify({
                            isDraft: 'Y',
                            creatorId: yufp.session.user.loginCode
                        })
                    },
                    managerParams: { //管理默认查询参数
                        condition: JSON.stringify({
                            isDraft: 'N',
                            creatorId: yufp.session.user.loginCode,
                            orgId: yufp.session.org.code,
                            roleType: roleType
                        })
                    },
                    viewTitle: '',
                    dialogVisible: false,
                    formDisabled: false,
                    workType: { //设置不同类型报告的字段
                        isDay: false,
                        isWeek: false,
                        isMonth: false
                    },
                    newBut: false,
                    isCustContact: true,
                    isSave: false,
                    isAdd: false,
                    isDetail: false,
                    formdata: {},
                    finishedWorkSdata: [],
                    customerContactData: [],
                    detailCustomerContactData: [],
                    selectCustParams: { // 客户 放大镜 参数
                        user: {
                            dataParams: {
                                belongOrg: yufp.session.org.code,
                                belongMgr: yufp.session.user.loginCode
                            },
                            checkbox: false // 是否支持多选
                        }
                    },
                    rule: { //校验规则
                        workReportBusiType: [
                            { required: true, message: '请选择项', trigger: 'change' }
                        ],
                        max50Len: [
                            { max: 500, message: '最大长度不超过500个字符', trigger: 'blur' }
                        ],
                        workContent: [
                            { max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
                        ],
                        required: 'required',
                        dateRequired: [
                            { validator: checkedDate, trigger: 'blur' }
                        ],
                        contactType: [
                            { required: true, message: '请选择项', trigger: 'change' }
                        ],
                        contactGoal: [
                            { required: true, message: '请选择项', trigger: 'change' }
                        ],
                        notDay: [
                            { max: 500, message: '最大长度不超过500个字符', trigger: 'blur' },
                            { required: true, trigger: 'blur' }
                        ],
                        annex: [
                            { max: 500, message: '最大长度不超过500个字符', trigger: 'blur' },
                            { validator: checkedNotNull, trigger: 'blur' }
                        ],
                        customer: 'required',
                        product: ''
                    },
                    // 初始化附件列表查询时，传入为空
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: ''
                        })
                    },
                    reportUpLoadBusNo: {},
                    // 附件列表按钮
                    uploadVisible: true,
                    downloadVisible: true,
                    deleteVisible: true,
                    createdWorkReportId: '',
                    // colunmNamelist: [//导出表头控制
                    //     { 'name': '报告编号', 'id': '', 'ename': 'workReportId' },
                    //     { 'name': '报告类型', 'id': '', 'ename': 'workReportBusiType' },
                    //     { 'name': '报告周期开始时间', 'id': '', 'ename': 'startDate' },
                    //     { 'name': '报告周期结束时间', 'id': '', 'ename': 'endDate' },
                    //     { 'name': '工作内容', 'id': '', 'ename': 'workSummary' },
                    //     { 'name': '报告内容', 'id': '', 'ename': 'workContent' },
                    //     { 'name': '后续工作计划', 'id': '', 'ename': 'laterPlan' },
                    //     { 'name': '草稿', 'id': '', 'ename': 'isDraft' },
                    //     { 'name': '报告人Id', 'id': '', 'ename': 'creatorId' },
                    //     { 'name': '报告人名称', 'id': '', 'ename': 'creatorName' },
                    //     { 'name': '报告人机构Id', 'id': '', 'ename': 'reporterOrg' },
                    //     { 'name': '报告人机构名称', 'id': '', 'ename': 'creatorOrgName' },
                    //     { 'name': '报告生成日期', 'id': '', 'ename': 'createDate' },
                    //     { 'name': '最近更新人ID', 'id': '', 'ename': 'lastChgUsrId' },
                    //     { 'name': '最近更新人名称', 'id': '', 'ename': 'lastChgUsrName' },
                    //     { 'name': '最近更新人所属机构ID', 'id': '', 'ename': 'lastChgUsrOrgId' },
                    //     { 'name': '最近更新人所属机构名称', 'id': '', 'ename': 'lastChgUsrOrgName' },
                    //     { 'name': '最近更新时间', 'id': '', 'ename': 'lastChgDate' },
                    //     { 'name': '补充', 'id': '', 'ename': 'annex' }
                    // ],
                    workSummary: {
                        second: false,
                        three: false,
                        fouth: false,
                        five: false
                    },
                    annexLabel: {
                        day: '补充内容',
                        week: '本周总结',
                        month: '本月总结'
                    },
                    laterPlanLabel: {
                        day: '总结及后续工作计划',
                        week: '后续工作计划',
                        month: '后续工作计划'
                    },
                    todoDataUrl: '/api/todowork/queryFinished',
                    wfCommonParams: {
                        sessionInstuCde: yufp.session.instu.code,
                        sessionOrgCode: yufp.session.org.id,
                        sessionLoginCode: yufp.session.user.loginCode
                    },
                    selectRoleCode: selectRoleCode,
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                        }
                    },
                    startDate: {},
                    operation: ''
                }
            },
            created: function () {
                var _this = this;
                // _this.userCodeNo();
                let orgCode = yufp.sessionStorage.get('YUFP-SESSION-USER');
                _this.orgIdAuth = JSON.parse(orgCode).org.code || JSON.parse(orgCode).org.id || '';
                _this.getCustGroupList();
            },
            mounted: function () {
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
            computed: {
                workReportBusiType: function () {
                    if (this.formdata.workReportBusiType === '2') {
                        return 'week';
                    } else if (this.formdata.workReportBusiType === '3') {
                        return 'month';
                    } else {
                        return 'day';
                    }
                }
            },
            methods: {
                singleQueryFn: function (formName) {
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
                    _this.$refs.singleQueryForm.validate(function (valid) {
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
                    _this.$nextTick(function () {
                        _this.$refs.yutable.doLayout();
                    });
                    this.stepIndex = 2;
                },
                isNotNumber: function (params) {
                    return isNaN(Number(params));
                },
                //xinzeng
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
                    if (index === 2) {
                        var flag = false;
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
                        if (flag || !isManage) {
                            this.getFilterCustomerList(index);
                        } else {
                            this.$message.warning('请至少选择一个筛选条件');
                        }
                    } else {
                        this.stepTwoData = this.$refs.yutable.selections;
                        // this.stepIndex = index;
                        this.$refs.customerContactTable.selections[0].contactCustId = this.stepTwoData[0].custId;
                        this.$refs.customerContactTable.selections[0].contactCustName = this.stepTwoData[0].custName;
                        this.handleCreateClose();

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
                    if (reg.test(this.filterModel.title)) {
                        this.filterModel.prodName = this.filterModel.title;
                    } else {
                        this.filterModel.prodId = this.filterModel.title;
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
                    if (queryParam) {
                        param.queryCriteria = queryParam;
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
                    // setTimeout(function() {
                    //     $('#savetj').removeClass("yu-disable");
                    // }, 3000);
                    _this.$refs.custGroupForm.validate(function (valid) {
                        if (valid) {
                            _this.saveData();
                        } else {
                            $('#savetj').removeClass("yu-disable");
                        }
                    });
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
                                $('#savetj').removeClass("yu-disable");
                                _this.createVisible = false;
                                _this.getCustGroupList();
                                _this.handleCreateClose(1);
                            } else {
                                $('#savetj').removeClass("yu-disable");
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
                custSelFn: function(val) {
                    this.stepTwoData = val;
                    // this.stepIndex = index;
                    this.$refs.customerContactTable.selections[0].contactCustId = this.stepTwoData[0].custId;
                    this.$refs.customerContactTable.selections[0].contactCustName = this.stepTwoData[0].custName;
                },
                /**
                 * 公共方法：时区控制
                 */
                formJE: function (row, column, cellValue) {
                    if (cellValue) {
                        cellValue = yufp.util.dateFormat(cellValue, '{y}-{m}-{d}');
                    }
                    return cellValue;
                },
                /**
                 * 公共方法：清空obj对象
                 */
                clearObj: function (obj) {
                    for (var key in obj) {
                        obj[key] = null;
                    }
                    return obj;
                },
                /**
                 * 格式化日期：yyyy-MM-dd
                 */
                formatDate: function (date) {
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
                //查询条件->报告类型更改
                chgSearchReportType: function (val) {
                    if (val == '1') {
                        this.searchDay = true;
                    } else {
                        this.searchDay = false;
                    }
                },
                // 自定义查询功能
                search: function (val) {
                    var _this = this;
                    if (val == 1) {
                        _this.$refs.queryMyForm1.validate(function (valid) {
                            if (valid) {
                                if (_this.searchformdata1.workReportBusiType != '1') {
                                    _this.searchformdata1.workSummary = '';
                                }
                                var param = { condition: JSON.stringify(_this.searchformdata1) };
                                _this.$refs.myTable.remoteData(param);
                            } else {
                                return;
                            }
                        });
                    } else if (val == 2) {
                        _this.$refs.queryMyForm2.validate(function (valid) {
                            if (valid) {
                                if (_this.searchformdata2.workReportBusiType != '1') {
                                    _this.searchformdata2.workSummary = '';
                                }
                                var param = { condition: JSON.stringify(_this.searchformdata2) };
                                _this.$refs.draftTable.remoteData(param);
                            } else {
                                return;
                            }
                        });
                    } else if (val == 3) {
                        _this.$refs.queryMyForm2.validate(function (valid) {
                            if (valid) {
                                if (_this.searchformdata3.workReportBusiType != '1') {
                                    _this.searchformdata3.workSummary = '';
                                }
                                var param = { condition: JSON.stringify(_this.searchformdata3) };
                                _this.$refs.managerTable.remoteData(param);
                            } else {
                                return;
                            }
                        });
                    }
                },
                // 自定义重置功能
                reset: function () {
                    this.$refs.queryMyForm1.resetFields();
                },
                reset2: function () {
                    this.$refs.queryMyForm2.resetFields();
                },
                reset3: function () {
                    this.$refs.queryMyForm3.resetFields();
                },
                /**
                 * 控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function (viewTitle, formDisabled, isDetail, isAdd, isSave) {
                    var _this = this;
                    _this.viewTitle = viewTitle;
                    _this.dialogVisible = true;
                    _this.formDisabled = formDisabled;
                    _this.isDetail = isDetail;
                    _this.isAdd = isAdd;
                    _this.isSave = isSave
                },
                //设置报告字段
                setWorkType: function (isDay, isWeek, isMonth) {
                    var _this = this;
                    _this.workType.isDay = isDay;
                    _this.workType.isWeek = isWeek;
                    _this.workType.isMonth = isMonth;
                },
                //批量删除
                deleteMulFn: function () {
                    var _this = this;
                    _this.operation = 'delete';
                    var selections = [];
                    if (_this.tabName == '1') {
                        selections = _this.$refs.myTable.selections;
                    }
                    if (_this.tabName == '2') {
                        selections = _this.$refs.draftTable.selections;
                    }
                    if (_this.tabName == '3') {
                        selections = _this.$refs.managerTable.selections;
                    }
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].creatorId != yufp.session.user.loginCode) {
                            break;
                        }
                        if (selections[i].isDraft != 'Y') {
                            break;
                        }
                        arr.push(selections[i].workReportId);
                    }
                    if (arr.length < 1) {
                        _this.$message({ message: '请至少选择一条属于自己的未提交记录', type: 'warning' });
                        return;
                    }
                    _this.$confirm('此操作将永久删除' + arr.length + '条数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                var model = {};
                                // model.lastChgUsrId = yufp.session.user.loginCode;
                                // model.lastChgUsrName = yufp.session.userName;
                                // model.lastChgUsrOrgId = yufp.session.org.code;
                                // model.lastChgUsrOrgName = yufp.session.org.name;
                                // var lastChgDate = new Date();
                                // model.lastChgDate = lastChgDate instanceof Date ? _this.formatDate(lastChgDate) : lastChgDate;
                                model.isDelete = 'Y';
                                model.workReportId = arr.join(',');
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/infoworkreport/delete',
                                    data: model,
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            yufp.util.butLogInfo(hashCode, '工作报告', '批量删除');
                                            _this.$refs.myTable.remoteData();
                                            _this.$refs.draftTable.remoteData();
                                            if (_this.isManager) {
                                                _this.$refs.managerTable.remoteData();
                                            }
                                            _this.$message('操作成功');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                //批量导出
                exportMulFn: function () {
                    var _this = this;
                    _this.operation = 'export';
                    var con = {};
                    var selections = [];
                    if (_this.tabName == '1') {
                        yufp.extend(con, _this.$refs.queryMyForm1.fm);
                        selections = _this.$refs.myTable.selections;
                    }
                    if (_this.tabName == '2') {
                        yufp.extend(con, _this.$refs.queryMyForm2.fm);
                        selections = _this.$refs.draftTable.selections;
                    }
                    if (_this.tabName == '3') {
                        yufp.extend(con, _this.$refs.queryMyForm3.fm);
                        selections = _this.$refs.managerTable.selections;
                    }
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].workReportId);
                    }
                    con.workReportId = arr.join(',');
                    // con.colunmNamelist = _this.colunmNamelist;
                    var url = "/api/infoworkreport/export?" + "condition=" + encodeURI(JSON.stringify(con));
                    yufp.util.download(url);
                    yufp.util.butLogInfo(hashCode, '工作报告', '批量导出');

                },
                //新增对话框
                addFn: function () {
                    var _this = this;
                    _this.startDate = {
                        dayDate: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}'),
                        weekDate: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}'),
                        monthDate: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}')
                    }
                    _this.operation = 'add';
                    _this.switchStatus('新增日程-工作报告', false, false, true, true);
                    _this.uploadVisible = true;
                    _this.downloadVisible = true;
                    _this.deleteVisible = true;
                    // 初始化生成的ID
                    _this.createdWorkReportId = '';
                    // 初始化附件列表参数
                    _this.initFilesParams = {
                        condition: JSON.stringify({
                            busNo: ''
                        })
                    };
                    _this.$nextTick(function () {
                        _this.clearObj(_this.formdata);
                        _this.formdata.workSummary = [];
                        _this.customerContactData = [];
                        _this.detailCustomerContactData = [];
                        _this.finishedWorkSdata = [];
                        _this.$refs.refForm.resetFields();
                        _this.formdata.workReportBusiType = '1';
                        _this.chgReportType('1');
                        if (document.getElementsByClassName('el-upload-list__item is-success')[0] != null && document.getElementsByClassName('el-upload-list__item is-success')[0] != undefined) {
                            document.getElementsByClassName('el-upload-list__item is-success')[0].innerHTML = '';
                        }
                        // 初始化空附件列表
                        _this.$refs.filesTable.queryFn();
                    });
                    yufp.service.request({
                        url: '/api/infoworkreport/createWorkReportId',
                        method: 'get',
                        data: null,
                        callback: function (code, message, response) {
                            if (code == '0') {
                                _this.createdWorkReportId = response.data;

                                // 设置附件列表组件传入workReportId
                                _this.reportUpLoadBusNo = {
                                    busNo: _this.createdWorkReportId
                                };
                                // 初始化附件列表查询时，传入为空
                                var files = {
                                    condition: JSON.stringify({
                                        busNo: _this.createdWorkReportId
                                    })
                                };
                                yufp.extend(_this.initFilesParams, files);
                                // 获取附件列表
                                // _this.$refs.filesTable.queryFn();
                            } else {
                                _this.$message({ message: '生成工作报告ID失败!' });
                            }
                        }
                    });
                },
                //双击操作->详情
                rowDblclick: function (row) {
                    var _this = this;
                    _this.operation = 'detail';
                    var time = row.startDate ? (row.startDate instanceof Date ? yufp.util.dateFormat(row.startDate, '{y}-{m}-{d}') : yufp.util.dateFormat(new Date(row.startDate), '{y}-{m}-{d}')) : (yufp.util.dateFormat(new Date(), '{y}-{m}-{d}'));
                    _this.startDate = {
                        dayDate: time,
                        weekDate: time,
                        monthDate: time
                    }
                    _this.switchStatus('查看日程-工作报告', false, true, false, false);
                    _this.uploadVisible = false;
                    _this.downloadVisible = true;
                    _this.deleteVisible = false;
                    _this.customerContactData = [];
                    _this.detailCustomerContactData = [];
                    if (row.workReportBusiType == '1' && row.workContent != null && row.workContent != '' && row.workContent != undefined) {
                        var item = row.workContent;
                        var content = item.split(';');
                        for (let index = 0; index < content.length; index++) {
                            var element = content[index];
                            var d = element.split(':');
                            _this.$set(row, 'workContent' + d[0], d[1] || '');
                        }
                    }
                    var model = {};
                    model.workReportId = row.workReportId;
                    if (row.workReportBusiType == '1' && row.workSummary.indexOf('1') != -1) {
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/infoworkreport/querydetail',
                            data: model,
                            callback: function (code, data, message, response) {
                                if (code == 0) {
                                    _this.detailCustomerContactData = message.data;
                                }
                            }
                        });
                    }
                    _this.$nextTick(function () {
                        _this.clearObj(_this.formdata);
                        _this.formdata.workSummary = [];
                        _this.$refs.refForm.resetFields();
                        yufp.clone(row, _this.formdata);
                        _this.chgReportType(_this.formdata.workReportBusiType);
                        // _this.chgWorkSummary(_this.formdata.workSummary);
                        // _this.formdata.workSummary = _this.tableEditFormdata.workSummary;
                        // 初始化附件列表查询时，传入noticeId
                        var files = {
                            condition: JSON.stringify({
                                busNo: row.workReportId
                            })
                        };
                        yufp.extend(_this.initFilesParams, files);
                        // 获取附件列表
                        _this.$refs.filesTable.queryFn(files);

                        // 设置附件列表组件传入NOTICEID
                        _this.reportUpLoadBusNo = {
                            busNo: row.workReportId
                        };
                        _this.formDisabled = true;
                    });
                    // _this.setWorkType(false, false, false);
                },
                deleteOneFn: function () {
                    var _this = this;
                    _this.operation = 'delete';
                    if (_this.tableEditFormdata.creatorId != yufp.session.user.loginCode) {
                        _this.$message({ message: '只能删除添加人是自己的数据', type: 'warning' });
                        return;
                    }
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                var model = {};
                                yufp.clone(_this.tableEditFormdata, model);
                                // model.lastChgUsrId = yufp.session.user.loginCode;
                                // model.lastChgUsrName = yufp.session.userName;
                                // model.lastChgUsrOrgId = yufp.session.org.code;
                                // model.lastChgUsrOrgName = yufp.session.org.name;
                                // var lastChgDate = new Date();
                                // model.lastChgDate = lastChgDate instanceof Date ? _this.formatDate(lastChgDate) : lastChgDate;
                                model.isDelete = 'Y';
                                if (model.workSummary) {
                                    model.workSummary = model.workSummary.join(',');
                                }
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/infoworkreport/delete',
                                    data: model,
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            yufp.util.butLogInfo(hashCode, '工作报告', '单个删除');
                                            _this.$refs.myTable.remoteData();
                                            _this.$refs.draftTable.remoteData();
                                            if (_this.isManager) {
                                                _this.$refs.managerTable.remoteData();
                                            }
                                            _this.$message('操作成功');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                // table 选项操作点击
                handleOptionSelect: function (command) {
                    switch (command) {
                        case 'delete':
                            this.deleteOneFn();
                            break;
                        case 'edit':
                            this.modifyFn();
                            break;
                        case 'wfTakeBack':
                            this.wfTakeBackFn();
                            break;
                    }
                },
                // 当操作打开时暂存当前行数据
                handleOptionVisibleChange: function (data) {
                    this.tableEditFormdata = {};
                    if (data) {
                        this.$delete(data, '__height');
                        this.$delete(data, '__selected');
                        this.$delete(data, '__translateY');
                        this.$delete(data, '__vkey');
                        this.$delete(data, 'rowId');
                        yufp.clone(data, this.tableEditFormdata);
                        if (this.tableEditFormdata.workReportBusiType == '1') {
                            if (this.tableEditFormdata.workSummary) {
                                this.tableEditFormdata.workSummary = this.tableEditFormdata.workSummary.split(',');
                            }
                            var item = this.tableEditFormdata.workContent;
                            if (item != null && item != '' && item != undefined) {
                                var content = item.split(';');
                                for (let index = 0; index < content.length; index++) {
                                    var element = content[index];
                                    var d = element.split(':');
                                    this.$set(this.tableEditFormdata, 'workContent' + d[0], d[1] || '');
                                }
                            }
                        }
                    }
                },
                //对话框->更改报告类型
                chgReportType: function (val) {
                    if (val == '1') {
                        this.setWorkType(true, false, false);
                        this.formdata.dayDate = new Date(this.startDate.dayDate);
                        this.formdata.weekDate = new Date(this.startDate.weekDate);
                        this.formdata.monthDate = new Date(this.startDate.monthDate);
                        this.formdata.startDate = this.formdata.dayDate;
                    } else if (val == '2') {
                        this.setWorkType(false, true, false);
                        var weekDate = new Date(this.startDate.weekDate);
                        var dateOfWeek = weekDate.getDay(); // 返回当前日期的在当前周的某一天（0～6--周日到周一）
                        var dateOfWeekInt = parseInt(dateOfWeek, 10); // 转换为整型
                        // if (dateOfWeekInt == 0) { // 如果是周日
                        //     dateOfWeekInt = 7;
                        // }
                        var aa = 7 - dateOfWeekInt; // 当前于周末相差的天数
                        var temp2 = parseInt(weekDate.getDate(), 10); // 按10进制转换，以免遇到08和09的时候转换成0
                        var monDay = temp2 + aa - 7; // 当前日期的周一的日期
                        this.formdata.weekDate = new Date(weekDate.getFullYear(), weekDate.getMonth(), monDay);
                        this.formdata.dayDate = new Date(this.startDate.dayDate);
                        this.formdata.monthDate = new Date(this.startDate.monthDate);
                        this.formdata.startDate = this.formdata.weekDate;
                        this.isCustContact = false;
                    } else if (val == '3') {
                        this.setWorkType(false, false, true);
                        var monthDate = new Date(this.startDate.monthDate);
                        var selYear = monthDate.getFullYear();
                        var selMonth = monthDate.getMonth();
                        this.formdata.monthDate = new Date(selYear, selMonth, 1);
                        this.formdata.dayDate = new Date(this.startDate.dayDate);
                        this.formdata.weekDate = new Date(this.startDate.weekDate);
                        this.formdata.startDate = this.formdata.monthDate;
                        this.isCustContact = false;
                    }
                },
                //更改工作内容
                chgWorkSummary: function (val) {
                    var _this = this;
                    if (val) {
                        // if (Array.isArray(val)) {
                        //     val = val.join();
                        // }
                        if (val.indexOf('2') != -1) {
                            _this.$set(_this.workSummary, 'second', true);
                            _this.workSummary.second = true;
                        } else {
                            _this.workSummary.second = false;
                            _this.formdata.workContent2 = '';
                        }
                        if (val.indexOf('3') != -1) {
                            _this.workSummary.three = true;
                        } else {
                            _this.workSummary.three = false;
                            _this.formdata.workContent3 = '';
                        }
                        if (val.indexOf('4') != -1) {
                            _this.workSummary.fouth = true;
                        } else {
                            _this.workSummary.fouth = false;
                            _this.formdata.workContent4 = '';
                        }
                        if (val.indexOf('5') != -1) {
                            _this.workSummary.five = true;
                        } else {
                            _this.workSummary.five = false;
                            _this.formdata.workContent5 = '';
                        }
                        if (val.indexOf('1') != -1) {
                            _this.isCustContact = true;
                            if (!_this.isDetail) {
                                _this.newBut = true;
                                if (_this.formdata.workReportId == null) {
                                    if (!_this.customerContactData || _this.customerContactData.length <= 0) {
                                        _this.newData();
                                    }
                                }
                            } else {
                                _this.newBut = false;
                            }
                        } else {
                            _this.isCustContact = false;
                            _this.newBut = false;
                            if (!_this.customerContactData || _this.customerContactData.length <= 0) {
                                _this.customerContactData = [];
                            }
                        }
                        _this.formdata.workSummary = val;
                    } else {
                        _this.isCustContact = false;
                        _this.newBut = false;
                        if (!_this.customerContactData || _this.customerContactData.length <= 0) {
                            _this.customerContactData = [];
                        }
                        _this.formdata.workContent2 = '';
                        _this.formdata.workContent3 = '';
                        _this.formdata.workContent4 = '';
                        _this.formdata.workContent5 = '';
                        _this.workSummary.second = false;
                        _this.workSummary.three = false;
                        _this.workSummary.fouth = false;
                        _this.workSummary.five = false;
                    }
                },
                //对话框->更改工作日期
                chgCreateDate: function (time) {
                    var _this = this;
                    _this.finishedWorkSdata = [];
                    time = time instanceof Date ? time : new Date(time);
                    var model = {
                        finisher: yufp.session.userId
                    };
                    var reportType = _this.formdata.workReportBusiType;
                    if (reportType == '1') {
                        model.startDate = time;
                        model.endDate = new Date(time.getFullYear(), time.getMonth(), time.getDate());
                        model.reportType = '1';
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/infoworkreport/queryConTact',
                            data: { condition: JSON.stringify(model) },
                            callback: function (code, data, message, response) {
                                if (code == 0) {
                                    if (message.data && message.data.length > 0) {
                                        if (_this.formdata.workSummary.indexOf('1') == -1) {
                                            _this.formdata.workSummary.push('1');
                                        }
                                    }
                                    _this.customerContactData = message.data;
                                }
                            }
                        });
                        _this.formdata.endDate = model.endDate;
                    } else if (reportType == '2') {
                        model.startDate = time;
                        model.endDate = new Date(time.getFullYear(), time.getMonth(), time.getDate() + 4);
                        _this.formdata.endDate = model.endDate;
                    } else if (reportType == '3') {
                        model.startDate = time;
                        var endDay = (new Date(time.getFullYear(), time.getMonth() + 1, 1) - time) / (1000 * 60 * 60 * 24);
                        model.endDate = new Date(time.getFullYear(), time.getMonth(), endDay);
                        _this.formdata.endDate = model.endDate;
                    }
                    // model.finisher = yufp.session.userId;
                    // model.todoWorkState = '2';
                    // yufp.service.request({
                    //     url: '/api/todowork/queryFinished',
                    //     method: 'GET',
                    //     data: {
                    //         condition: JSON.stringify(model)
                    //     },
                    //     callback: function (code, message, response) {
                    //         if (code == '0') {
                    //             _this.finishedWorkSdata = response.data;
                    //         }
                    //     }
                    // });
                    if (!_this.formDisabled) {
                        _this.$refs.finishedWork.remoteData({
                            condition: JSON.stringify(model)
                        });
                    }
                },
                chgDay: function (time) {
                    if (!time) {
                        return;
                    }
                    var _this = this;
                    _this.finishedWorkSdata = [];
                    var model = {
                        finisher: yufp.session.userId
                    };
                    time = time instanceof Date ? time : new Date(time);
                    _this.startDate.dayDate = time ? (time instanceof Date ? yufp.util.dateFormat(time, '{y}-{m}-{d}') : yufp.util.dateFormat(new Date(time), '{y}-{m}-{d}')) : (yufp.util.dateFormat(new Date(), '{y}-{m}-{d}'));
                    var reportType = _this.formdata.workReportBusiType;
                    if (reportType == '1') {
                        model.startDate = time;
                        model.endDate = new Date(time.getFullYear(), time.getMonth(), time.getDate());
                        model.reportType = '1';
                        _this.formdata.endDate = time;
                        if (!_this.isDetail) {
                            _this.$refs.finishedWork.remoteData({
                                condition: JSON.stringify(model)
                            });
                        }
                        if (_this.operation == 'add') {
                            yufp.service.request({
                                method: 'GET',
                                url: '/api/infoworkreport/queryConTact',
                                data: { condition: JSON.stringify(model) },
                                callback: function (code, data, message, response) {
                                    if (code == 0) {
                                        if (message.data && message.data.length > 0) {
                                            if (_this.formdata.workSummary.indexOf('1') == -1) {
                                                _this.formdata.workSummary.push('1');
                                            }
                                        }
                                        _this.customerContactData = message.data;
                                    }
                                }
                            });
                        }

                    }
                },
                chgWeek: function (time) {
                    if (!time) {
                        return;
                    }
                    var _this = this;
                    _this.finishedWorkSdata = [];
                    var model = {
                        finisher: yufp.session.userId
                    };
                    time = time instanceof Date ? time : new Date(time);
                    var dateOfWeek = time.getDay(); // 返回当前日期的在当前周的某一天（0～6--周日到周一）
                    var dateOfWeekInt = parseInt(dateOfWeek, 10); // 转换为整型
                    var reportType = _this.formdata.workReportBusiType;
                    if (dateOfWeekInt != 0 && reportType == '2') { // 如果是周日
                        _this.startDate.weekDate = time ? (time instanceof Date ? yufp.util.dateFormat(time, '{y}-{m}-{d}') : yufp.util.dateFormat(new Date(time), '{y}-{m}-{d}')) : (yufp.util.dateFormat(new Date(), '{y}-{m}-{d}'));
                        _this.chgReportType('2');
                        return;
                    }
                    if (reportType == '2') {
                        model.startDate = time;
                        model.endDate = new Date(time.getFullYear(), time.getMonth(), time.getDate() + 6);
                        _this.formdata.endDate = model.endDate;
                        if (!_this.isDetail) {
                            _this.$refs.finishedWork.remoteData({
                                condition: JSON.stringify(model)
                            });
                        }
                    }

                },
                chgMonth: function (time) {
                    if (!time) {
                        return;
                    }
                    var _this = this;
                    _this.finishedWorkSdata = [];
                    var model = {
                        finisher: yufp.session.userId
                    };
                    time = time instanceof Date ? time : new Date(time);
                    _this.startDate.monthDate = time ? (time instanceof Date ? yufp.util.dateFormat(time, '{y}-{m}-{d}') : yufp.util.dateFormat(new Date(time), '{y}-{m}-{d}')) : (yufp.util.dateFormat(new Date(), '{y}-{m}-{d}'));
                    var reportType = _this.formdata.workReportBusiType;
                    if (reportType == '3') {
                        model.startDate = time;
                        var endDay = (new Date(time.getFullYear(), time.getMonth() + 1, 1) - time) / (1000 * 60 * 60 * 24);
                        model.endDate = new Date(time.getFullYear(), time.getMonth(), endDay);
                        _this.formdata.endDate = model.endDate;
                        if (!_this.isDetail) {
                            _this.$refs.finishedWork.remoteData({
                                condition: JSON.stringify(model)
                            });
                        }
                    }
                },
                /**
                 * 客户放大镜 回调
                 */
                //更改跟进目的
                chgContactGoal: function (val) {
                    if (val == '1') {
                        // this.rule.product = 'required';
                    }
                    // 校验表格数据
                    // this.$refs.customerContactTable.validate(function (fields) {
                    //     if (!fields) {
                    //         flag = true;
                    //     }
                    // });
                },
                /**
                 * 客户接触->移除按钮
                 */
                deleteRow: function (index, row) {
                    if (row.length <= 1) {
                        this.$message({ message: '选择客户跟进必须有一条数据', type: 'warning' });
                        return;
                    }
                    row.splice(index, 1);
                },
                /**
                 * 客户接触->新增按钮
                 */
                newData: function () {
                    var row = {};
                    var flag = false;
                    // 校验表格数据
                    this.$refs.customerContactTable.validate(function (fields) {
                        if (!fields) {
                            flag = true;
                        }
                    });
                    // 校验通过添加数据
                    if (flag) {
                        this.customerContactData.push(row);
                        this.$refs.customerContactTable.setCurrentRow(row);
                    }
                },
                /**
                 * 附件上传->检查上传文件大小和类型
                 */
                beforeAvatarUpload: function (file) {
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
                /**
                 * 工作报告->编辑操作
                 */
                modifyFn: function () {
                    var _this = this;
                    _this.operation = 'modify';
                    var time = _this.tableEditFormdata.startDate ? (_this.tableEditFormdata.startDate instanceof Date ? yufp.util.dateFormat(_this.tableEditFormdata.startDate, '{y}-{m}-{d}') : yufp.util.dateFormat(new Date(_this.tableEditFormdata.startDate), '{y}-{m}-{d}')) : (yufp.util.dateFormat(new Date(), '{y}-{m}-{d}'));
                    _this.startDate = {
                        dayDate: time,
                        weekDate: time,
                        monthDate: time
                    }
                    _this.switchStatus('编辑日程-工作报告', false, false, false, true);
                    if (_this.tableEditFormdata.isDraft == 'Y' || _this.tableEditFormdata.isDraft == 'N-0' || _this.tableEditFormdata.isDraft == 'N-2' || _this.tableEditFormdata.isDraft == 'N-3') {
                        _this.isAdd = true;
                    }
                    _this.uploadVisible = true;
                    _this.downloadVisible = true;
                    _this.deleteVisible = true;
                    _this.customerContactData = [];
                    _this.detailCustomerContactData = [];
                    _this.finishedWorkSdata = [];
                    var model = {};
                    model.workReportId = _this.tableEditFormdata.workReportId;
                    if (_this.tableEditFormdata.workReportBusiType == '1' && _this.tableEditFormdata.workSummary.indexOf('1') != -1) {
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/infoworkreport/querydetail',
                            data: model,
                            callback: function (code, data, message, response) {
                                if (code == 0) {
                                    _this.customerContactData = message.data;
                                }
                            }
                        });
                    }
                    _this.$nextTick(function () {
                        _this.clearObj(_this.formdata);
                        _this.formdata.workSummary = [];
                        _this.$refs.refForm.resetFields();
                        _this.$refs.customerContactTable.setCurrentRow();
                        yufp.clone(_this.tableEditFormdata, _this.formdata);
                        _this.chgReportType(_this.formdata.workReportBusiType);
                        // _this.chgWorkSummary(_this.formdata.workSummary);
                        // 初始化附件列表查询时，传入workReportId
                        var files = {
                            condition: JSON.stringify({
                                busNo: model.workReportId
                            })
                        };
                        yufp.extend(_this.initFilesParams, files);
                        if (document.getElementsByClassName('el-upload-list__item is-success')[0] != null && document.getElementsByClassName('el-upload-list__item is-success')[0] != undefined) {
                            document.getElementsByClassName('el-upload-list__item is-success')[0].innerHTML = '';
                        }
                        // 获取附件列表
                        _this.$refs.filesTable.queryFn(files);

                        // 设置附件列表组件传入workReportId
                        _this.reportUpLoadBusNo = {
                            busNo: model.workReportId
                        };
                    });
                },
                /**
                 * 工作报告->撤回操作
                 */
                wfTakeBackFn: function () {
                    this.operation = 'wfTakeBack';
                    this.$refs.yufpWfInit.withdraw({ instanceId: this.tableEditFormdata.instanceId });
                },
                /**
                 * 弹出框->保存和新增按钮
                 */
                saveFn: function (operate) {
                    $("#savebc").addClass("yu-disable");
                    $("#savetj").addClass("yu-disable");
                    // setTimeout(function() {
                    //     $('#savebc').removeClass("yu-disable");
                    //     $('#savetj').removeClass("yu-disable");
                    // }, 3000);
                    var _this = this;
                    var model = {};
                    var validate = false;
                    if (_this.formdata.workReportBusiType != '1') {
                        _this.formdata.workSummary = '0';
                    }
                    if (_this.workReportBusiType == '1' || !_this.isDetail) {
                        var flag = false;
                        if (_this.formdata .workSummary.indexOf('1') != -1) {
                            // 校验表格数据
                            _this.$refs.customerContactTable.validate(function (fields) {
                                if (!fields) {
                                    flag = true;
                                }
                            });
                            if (!flag) {
                                $('#savebc').removeClass("yu-disable");
                                $('#savetj').removeClass("yu-disable");
                                return;
                            }
                        }

                    }
                    _this.$refs.refForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        $('#savebc').removeClass("yu-disable");
                        $('#savetj').removeClass("yu-disable");
                        return;
                    }
                    yufp.clone(_this.formdata, model);
                    if (_this.formdata.workReportBusiType != '1') {
                        _this.$delete(model, 'workSummary');
                        if (_this.formdata.workContent) {
                            _this.$delete(model, 'workContent');
                        }
                    }
                    if (model.workReportBusiType == '1') {
                        var d = '2:' + _this.formdata.workContent2 + ';' + '3:' + _this.formdata.workContent3 + ';' + '4:' + _this.formdata.workContent4 + ';' + '5:' + _this.formdata.workContent5
                        _this.$set(model, 'workContent', d);
                        model.workSummary = typeof model.workSummary == 'string' ? model.workSummary : model.workSummary.join(',');
                    }
                    model.startDate = _this.formatDate(model.startDate instanceof Date ? model.startDate : new Date(model.startDate));
                    model.endDate = _this.formatDate(model.endDate instanceof Date ? model.endDate : new Date(model.endDate));
                    _this.$delete(model, 'workContent2');
                    _this.$delete(model, 'workContent3');
                    _this.$delete(model, 'workContent4');
                    _this.$delete(model, 'workContent5');
                    _this.$delete(model, 'dayDate');
                    _this.$delete(model, 'weekDate');
                    _this.$delete(model, 'monthDate');
                    if (model.workReportId != null && model.workReportId != '') {
                        //修改请求
                        if (operate == 2) {
                            // 新增
                            var selectRoleCode = _this.selectRoleCode;
                            if (model.isDraft == 'Y') {
                                if ('R002,R003,R013,R014,R015,R016,R017,R018,R019'.indexOf(selectRoleCode) != -1) {
                                    model.isDraft = 'N-0';
                                } else {
                                    model.isDraft = 'N';
                                }
                            }
                        }
                        _this.$delete(model, 'createDate');
                        _this.$delete(model, 'lastChgDate');
                        var map = {};
                        if (model.workReportBusiType == '1' && model.workSummary.indexOf('1') != -1) {
                            var list = _this.$refs.customerContactTable.tabledata;
                            for (var key in list) {
                                if (list[key].customerContactId == null || list[key].customerContactId == '') {
                                    list[key].workReportId = model.workReportId;
                                }
                                list[key].contactDate = list[key].contactDate instanceof Date ? yufp.util.dateFormat(list[key].contactDate, '{y}-{m}-{d}') : yufp.util.dateFormat(new Date(list[key].contactDate), '{y}-{m}-{d}');
                                _this.$delete(list[key], '__height');
                                _this.$delete(list[key], '__selected');
                                _this.$delete(list[key], '__translateY');
                                _this.$delete(list[key], '__vkey');
                                _this.$delete(list[key], 'createDate');
                                _this.$delete(list[key], 'lastChgDate');
                                list[key] = JSON.stringify(list[key]);
                            }
                            if (list.length < 1) {
                                _this.$message('工作内容为客户接触时，请输入至少一条客户接触数据');
                                $("#savebc").removeClass("yu-disable");
                                $("#savetj").removeClass("yu-disable");
                                return;
                            }
                            map.customerContact = list;
                        }
                        map.workReport = JSON.stringify(model);
                        console.log(map);
                        yufp.service.request({
                            method: 'POST',
                            url: '/api/infoworkreport/updateWorkReport',
                            data: map,
                            callback: function (code, message, response) {
                                $("#savebc").removeClass("yu-disable");
                                $("#savetj").removeClass("yu-disable");
                                if (code == 0) {
                                    if (operate == 2) {
                                        _this.commit(model);
                                    } else if (operate == 1) {
                                        _this.$message("保存成功")
                                    }
                                    yufp.util.butLogInfo(hashCode, '工作报告', '保存');
                                    _this.$refs.myTable.remoteData();
                                    _this.$refs.draftTable.remoteData();
                                    if (_this.isManager) {
                                        _this.$refs.managerTable.remoteData();
                                    }
                                    _this.reset();
                                    _this.dialogVisible = false;

                                } else {
                                    $('#savebc').removeClass("yu-disable");
                                    $('#savetj').removeClass("yu-disable");
                                }
                            }
                        });
                    } else {
                        // model.workSummary = typeof model.workSummary == 'string' ? model.workSummary : model.workSummary.join(',');
                        model.workReportId = _this.createdWorkReportId;
                        if (operate == 1) {
                            // 新增到草稿箱
                            model.isDraft = 'Y';
                        } else {
                            var selectRoleCode = _this.selectRoleCode;
                            if ('R002,R003,R013,R014,R015,R016,R017,R018,R019'.indexOf(selectRoleCode) != -1) {
                                model.isDraft = 'N-0';
                            } else {
                                model.isDraft = 'N';
                            }

                        }
                        var map = {};
                        if (model.workReportBusiType == '1' && model.workSummary.indexOf('1') != -1) {
                            var list = _this.$refs.customerContactTable.tabledata;
                            for (var key in list) {
                                list[key].workReportId = _this.createdWorkReportId;
                                list[key].contactDate = list[key].contactDate instanceof Date ? yufp.util.dateFormat(list[key].contactDate, '{y}-{m}-{d}') : yufp.util.dateFormat(new Date(list[key].contactDate), '{y}-{m}-{d}');
                                _this.$delete(list[key], '__height');
                                _this.$delete(list[key], '__selected');
                                _this.$delete(list[key], '__translateY');
                                _this.$delete(list[key], '__vkey');
                                _this.$delete(list[key], 'createDate');
                                _this.$delete(list[key], 'lastChgDate');
                                list[key] = JSON.stringify(list[key]);
                            }
                            if (list.length < 1) {
                                _this.$message('工作内容为客户接触时，请输入至少一条客户接触数据');
                                $("#savebc").removeClass("yu-disable");
                                $("#savetj").removeClass("yu-disable");
                                return;
                            }
                            map.customerContact = list;
                        }
                        map.workReport = JSON.stringify(model);
                        yufp.service.request({
                            method: 'POST',
                            url: '/api/infoworkreport/add',
                            data: map,
                            callback: function (code, data, message, response) {
                                $("#savebc").removeClass("yu-disable");
                                $("#savetj").removeClass("yu-disable");
                                if (code == 0) {
                                    if (operate == 2) {
                                        _this.commit(model);
                                    }
                                    yufp.util.butLogInfo(hashCode, '工作报告', '新增');
                                    _this.$refs.myTable.remoteData();
                                    _this.$refs.draftTable.remoteData();
                                    if (_this.isManager) {
                                        _this.$refs.managerTable.remoteData();
                                    }
                                    _this.reset();
                                    _this.dialogVisible = false;
                                }
                            }
                        });
                    }
                },
                cancelFn: function () {
                    this.startDate = {};
                    this.operation = '';
                    this.dialogVisible = false;
                },
                returnContent: function (content) {
                    if (content == null || content == '' || content == undefined) {
                        return '';
                    }
                    var summary = yufp.lookup.find('DY0003', false);
                    var list = content.split(';');
                    var result = '';
                    for (let index = 0; index < list.length; index++) {
                        var str = list[index];
                        var item = str.split(':');
                        if (item[1] != null && item[1] != '') {
                            result += summary[item[0]] + ':' + item[1];
                            if (index != list.length - 1) {
                                result += ';'
                            }
                        }

                    }
                    return result;
                },
                returnState: function (isDraft) {
                    if (!isDraft) {
                        return '';
                    }
                    var state = '';
                    switch (isDraft) {
                        case 'Y':
                            state = '草稿';
                            break;
                        case 'N':
                            state = '已审批';
                            break;
                        case 'N-0':
                            state = '待审批';
                            break;
                        case 'N-1':
                            state = '审批中';
                            break;
                        case 'N-2':
                            state = '驳回';
                            break;
                        default:
                            state = '';
                            break;
                    }
                    return state
                },
                // 审批页面关闭前
                onAfterInit: function (data) {
                    yufp.util.butLogInfo(hashCode, '工作报告', '流程提交');
                },
                // 审批页面关闭后
                onAfterClose: function (val) {
                    var _this = this;
                    _this.$refs.myTable.remoteData();
                    if (val === 4) {
                        yufp.util.butLogInfo(hashCode, '工作报告', '撤回');
                    } else if (val === 99) {
                        yufp.util.butLogInfo(hashCode, '工作报告', '流程实例化');
                    }
                    // _this.$refs.draftTable.remoteData();
                    // if (_this.isManager) {
                    //     _this.$refs.managerTable.remoteData();
                    // }
                },
                commit: function (data) {
                    var _this = this;
                    var commitData = {};
                    if (data.isDraft == 'Y') {
                        _this.$message('保存到草稿箱');
                        return;
                    } else if (data.isDraft == 'N') {
                        _this.$message('无需审批，新增成功');
                        return;
                    } else {
                        var load = _this.$loading();
                        if (data.isDraft == 'N-0') {
                            if (data.instanceId) {
                                commitData.instanceId = data.instanceId;
                                _this.$refs.yufpWfInit.wfSave(commitData, load);
                            } else {
                                var type = '';
                                var range = '';
                                if (data.workReportBusiType) {
                                    switch (data.workReportBusiType) {
                                        case '1':
                                            type = '工作日报';
                                            range = data.startDate instanceof Date ? yufp.util.dateFormat(data.startDate, '{y}-{m}-{d}') : yufp.util.dateFormat(new Date(data.startDate), '{y}-{m}-{d}');
                                            break;
                                        case '2':
                                            type = '工作周报';
                                            range = data.startDate instanceof Date ? yufp.util.dateFormat(data.startDate, '{y}-{m}-{d}') : yufp.util.dateFormat(new Date(data.startDate), '{y}-{m}-{d}');
                                            range += '至' + data.endDate instanceof Date ? yufp.util.dateFormat(data.endDate, '{y}-{m}-{d}') : yufp.util.dateFormat(new Date(data.endDate), '{y}-{m}-{d}');
                                            break;
                                        case '3':
                                            type = '工作月报';
                                            range = data.startDate instanceof Date ? yufp.util.dateFormat(data.startDate, '{y}-{m}') : yufp.util.dateFormat(new Date(data.startDate), '{y}-{m}');
                                            break;
                                        default:
                                            type = '';
                                            break;
                                    }
                                }
                                var roles = yufp.session.roles;
                                var roleCodes = '';
                                for (let index = 0; index < roles.length; index++) {
                                    const element = roles[index];
                                    roleCodes += element.code;
                                }
                                var selectRoleCode = _this.selectRoleCode;
                                if (roleCodes.indexOf('R015') != -1 || roleCodes.indexOf('R016') != -1) {
                                    if (roleCodes.indexOf('R015') != -1) {
                                        selectRoleCode = 'R015';
                                    } else if (roleCodes.indexOf('R016') != -1) {
                                        selectRoleCode = 'R016';
                                    }
                                } else if (roleCodes.indexOf('R017') != -1) {
                                    selectRoleCode = 'R017'
                                } else if (roleCodes.indexOf('R018') != -1 || roleCodes.indexOf('R019') != -1) {
                                    if (roleCodes.indexOf('R018') != -1) {
                                        selectRoleCode = 'R018';
                                    } else if (roleCodes.indexOf('R019') != -1) {
                                        selectRoleCode = 'R019';
                                    }
                                }
                                commitData.bizSeqNo = data.workReportId; // 关联业务编号
                                commitData.applType = 'WFWR'; // 工作报告审批流程
                                commitData.custName = yufp.session.userName + range + '的' + type;
                                commitData.custId = yufp.session.userId;
                                // commitData.jobName = data.workReportId;
                                yufp.service.request({
                                    method: 'GET',
                                    url: '/api/ocrmfciadmitbelong/isatTeam',
                                    callback: function (code, data, message, response) {
                                        if (code == 0) {
                                            commitData.paramMap = {
                                                selectRole: selectRoleCode,
                                                atTeam: message.data
                                            };
                                            // 申请上架
                                            _this.$refs.yufpWfInit.wfInit(commitData, load);
                                            // _this.$message('审批提交成功');
                                        }
                                    }
                                });
                            }
                        } else if (data.isDraft == 'N-2' || data.isDraft == 'N-3') {
                            commitData.instanceId = data.instanceId;
                            _this.$refs.yufpWfInit.wfSave(commitData, load);
                        }
                    }
                }
            }
        })
    };
});