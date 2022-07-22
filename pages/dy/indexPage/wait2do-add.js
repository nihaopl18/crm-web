/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-06 15:41:53
 * @update by:
 * @description:
 */
(function(vue, $, name) {
    // 日历-星期展示组件
    vue.component(name, {
        template: '<yu-xdialog title="新增日程-待办事项" width="600px" :visible.sync="waitdoVisible" :before-close="handleClose">\
    <yu-tabs v-model="addName">\
            <yu-tab-pane label="一次性待办" name="1">\
            <yu-xform ref="addOneForm" label-width="120px" label-position="top" v-model="addOneFormData" v-if="waitdoVisible">\
                    <yu-row :getters="20">\
                        <yu-xform-group>\
                            <yu-xform-item label="主题" ctype="input" name="todoWorkTitle" placeholder="20个字符以内"\
                                :rules="rule.todoWorkTitle" colspan="22"></yu-xform-item>\
                            <yu-col :span="20">\
                                <yu-xform-item label="待办类型" ctype="select" name="todoWorkType" data-code="DY0002"\
                                    :rules="rule.todoWorkType"></yu-xform-item>\
                            </yu-col>\
                            <yu-col :span="20">\
                                <yu-xform-item label="执行时间" ctype="datepicker" name="startDate" type="datetime"\
                                    format="yyyy-MM-dd HH:mm" :rules="rule.required" :picker-options="pickerOptions">\
                                </yu-xform-item>\
                            </yu-col>\
                            // <yu-xform-item label="关联客户" ctype="yufp-governed-cust-selector" :params="selectCustParams"\
                            //     @select-fn="custSelFn" name="relationCust" colspan="22">\
                            // </yu-xform-item>\
                            <yu-xform-item label="关联客户" ctype="yufp-single-many-query"\
                            @selectfn="custSelFn"  name="relationCust" colspan="22">\
                            </yu-xform-item>\
                            // <yu-xform-item label="关联客户" ctype="input"\
                            // name="relationCust"@focus="onfocuscycle" colspan="22">\
                            // </yu-xform-item>\
                            <yu-col :span="20" v-show="addOneFormData.todoWorkType == \'5\'">\
                                <yu-xform-item label="跟进类型" ctype="select" name="contactType" data-code="DY0006" :rules="rule.todoWorkType"></yu-xform-item>\
                            </yu-col>\
                            <yu-col :span="20" v-show="addOneFormData.todoWorkType == \'5\'">\
                                <yu-xform-item label="跟进目的" ctype="select" name="contactGoal" data-code="DY0005" :rules="rule.todoWorkType"></yu-xform-item>\
                            </yu-col>\
                            <yu-xform-item label="内容" ctype="textarea" name="todoWorkContent" :rows="2" :colspan="22"\
                                placeholder="200个字符以内" :rules="rule.todoWorkContent"></yu-xform-item>\
                        </yu-xform-group>\
                    </yu-row>\
                    <div class="yu-grpButton">\
                        <yu-button icon="yx-undo2" type="primary" @click="handleClose">取消</yu-button>\
                        <yu-button id="saveFnidf" icon="check" type="primary" @click="saveFn(1)">确定</yu-button>\
                    </div>\
            </yu-tab-pane>\
            <yu-tab-pane label="周期性待办" name="2">\
            <yu-xform ref="addCycleForm" label-width="120px" label-position="top" v-model="addCycleFormData" v-if="waitdoVisible">\
                    <yu-row :getters="20">\
                        <yu-xform-group>\
                            <yu-xform-item label="主题" ctype="input" name="todoWorkTitle" placeholder="20个字符以内"\
                                :rules="rule.todoWorkTitle" colspan="22"></yu-xform-item>\
                            <yu-col :span="20">\
                                <yu-xform-item label="待办类型" ctype="select" name="todoWorkType" data-code="DY0002"\
                                    :rules="rule.todoWorkType"></yu-xform-item>\
                            </yu-col>\
                            // <yu-xform-item label="关联客户" ctype="yufp-governed-cust-selector" :params="selectCustParams"\
                            //     @select-fn="custSelFn" name="relationCust" colspan="22">\
                            // </yu-xform-item>\
                            // <yu-xform-item label="关联客户" ctype="input"\
                            //       name="relationCust"@focus="onfocuscycle" colspan="22">\
                            // </yu-xform-item>\
                            <yu-xform-item label="关联客户" ctype="yufp-single-many-query"\
                            @selectfn="custSelFn"  name="relationCust" colspan="22">\
                            </yu-xform-item>\
                            <yu-col :span="20" v-show="addCycleFormData.todoWorkType == \'5\'">\
                                <yu-xform-item label="跟进类型" ctype="select" name="contactType" data-code="DY0006" :rules="rule.todoWorkType"></yu-xform-item>\
                            </yu-col>\
                            <yu-col :span="20" v-show="addCycleFormData.todoWorkType == \'5\'">\
                                <yu-xform-item label="跟进目的" ctype="select" name="contactGoal" data-code="DY0005" :rules="rule.todoWorkType"></yu-xform-item>\
                            </yu-col>\
                            <yu-xform-item label="内容" ctype="textarea" name="todoWorkContent" :rows="2" :colspan="22"\
                                placeholder="200个字符以内" :rules="rule.todoWorkContent"></yu-xform-item>\
                            <yu-xform-item label="提醒周期" ctype="radio" name="noticeCycle" data-code="NOTICE_CYCLE"\
                                colspan="22" @change="chgNoticeCycle" :rules="rule.required">\
                            </yu-xform-item>\
                            <yu-col :span="20">\
                                <yu-xform-item label="开始时间" ctype="datepicker" name="startDate" type="datetime"\
                                    format="yyyy-MM-dd HH:mm" @change="chgNoticeStartDate" :rules="rule.required" :picker-options="pickerOptions">\
                                </yu-xform-item>\
                            </yu-col>\
                            <yu-col :span="20">\
                                <yu-xform-item label="结束时间" ctype="datepicker" name="endDate" type="datetime"\
                                    format="yyyy-MM-dd HH:mm" @change="chgNoticeEndDate" :rules="rule.required" :picker-options="pickerOptions">\
                                </yu-xform-item>\
                            </yu-col>\
                            <yu-col :span="20">\
                                <div>\
                                    <i class="el-icon-time"></i>下次执行时间:&nbsp;{{nextNoticeDate}}\
                                </div>\
                            </yu-col>\
                        </yu-xform-group>\
                    </yu-row>\
                    <div class="yu-grpButton">\
                        <yu-button icon="yx-undo2" type="primary" @click="handleClose">取消</yu-button>\
                        <yu-button id="saveFnids" icon="check" type="primary" @click="saveFn(2)">确定</yu-button>\
                    </div>\
            </yu-tab-pane>\
  </yu-xdialog>',
        props: {
            waitdoVisible: {
                type: Boolean,
                default: false
            },
            selectDate: String
        },
        data: function() {
            yufp.lookup.reg('DY0001,DY0002,NOTICE_CYCLE,DY0005,DY0006');
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
                types: yufp.lookup.find('SCHEDULE_TYPE'),
                statusOptions: yufp.lookup.find('SCHEDULE_STATUS'),
                addName: '1',
                wait2doForm: {},
                addOneFormData: {},
                addCycleFormData: {},
                rule: { //校验规则
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
                nextNoticeDate: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                    }
                },
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
            this.ORIGION_LIST = yufp.lookup.find('ORIGION_LIST');
            this.userCodeNo();
        },
        watch: {
            waitdoVisible: function() {
                let _this = this;
                _this.$nextTick(function() {
                    _this.wait2doForm.time = _this.selectDate;
                });
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
                    if (this.addName == '1') {
                        this.addOneFormData.relationCust = str1;
                    }
                    if (this.addName == '2') {
                        this.addCycleFormData.relationCust = str1;
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
            onfocuscycle: function() {
                this.createVisible = true;
            },
            handleClose: function(update) {
                this.$emit('closeAdd', update === 1);
            },
            custSelFn: function(val) {
                this.addOneFormData.relationCust = '';
                this.addCycleFormData.relationCust = '';
                if (this.addName == '1') {
                    for (let i = 0; i < val.length; i++) {
                        if (i == 0) {
                            this.addOneFormData.relationCust = this.addOneFormData.relationCust + val[i].custName + '-' + val[i].custId;
                        }
                        if (i > 0) {
                            this.addOneFormData.relationCust = this.addOneFormData.relationCust + ';' + val[i].custName + '-' + val[i].custId;
                        }
                    }
                }
                if (this.addName == '2') {
                    for (let i = 0; i < val.length; i++) {
                        if (i == 0) {
                            this.addCycleFormData.relationCust = this.addCycleFormData.relationCust + val[i].custName + '-' + val[i].custId;
                        }
                        if (i > 0) {
                            this.addCycleFormData.relationCust = this.addCycleFormData.relationCust + ';' + val[i].custName + '-' + val[i].custId;
                        }
                    }
                }
            },
            /**
             * 客户放大镜 回调
             */
            // custSelFn: function(data) {
            //     var _this = this;
            //     if (!data || data.length < 1) {
            //         return;
            //     }
            //     var addName = _this.addName;
            //     if (addName == '1') {
            //         _this.addOneFormData.relationCust = '';
            //     }
            //     if (addName == '2') {
            //         _this.addCycleFormData.relationCust = '';
            //     }
            //     var relationCust = '';
            //     for (var key in data) {
            //         relationCust += data[key].custName + '/' + data[key].custId;
            //         if ((key + 1) < data.length) {
            //             relationCust += ';';
            //         }
            //     }
            //     if (addName == '1') {
            //         _this.addOneFormData.relationCust = relationCust;
            //     }
            //     if (addName == '2') {
            //         _this.addCycleFormData.relationCust = relationCust;
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
            //改变周期性待办的周期
            chgNoticeCycle: function(val) {
                var _this = this;
                var nextNoticeDate = null;
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
                        this.nextNoticeDate = _this.formatDate(new Date(nextNoticeDate));
                    }
                }
            },
            //改变周期性待办的开始时间
            chgNoticeStartDate: function(time) {
                var _this = this;
                var nextNoticeDate = null;
                var startDate = time instanceof Date ? time : new Date(time);
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
                        this.nextNoticeDate = _this.formatDate(new Date(nextNoticeDate));
                    }
                }

            },
            //改变周期性待办的结束时间
            chgNoticeEndDate: function(time) {
                var _this = this;
                var nextNoticeDate = null;
                var endDate = time instanceof Date ? time : new Date(time);
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
                        this.nextNoticeDate = _this.formatDate(new Date(nextNoticeDate));
                    } else {
                        this.nextNoticeDate = '下次提醒日期事项已结束';
                    }
                }
            },
            clearObj: function(obj) {
                for (var key in obj) {
                    obj[key] = null;
                }
                return obj;
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
            addFn: function() {
                var _this = this;
                _this.addName = '1';
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
            saveFn: function(val) {
                // saveFnidf
                var _this = this;
                var hashCode = JSON.parse(yufp.sessionStorage.get('YUFP-SESSION-MENUS-OG')).filter(function(menu) {
                    return menu.menuName === '首页';
                })[0].funcId;
                $('#saveFnidf').addClass("yu-disable");
                $('#saveFnids').addClass("yu-disable");
                var validate;
                var model = {};
                if (val == '1') {
                    _this.$refs.addOneForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        $('#saveFnidf').removeClass("yu-disable");
                        $('#saveFnids').removeClass("yu-disable");
                        return;
                    }
                    // 判断选择了客户客户跟进
                    if (_this.addOneFormData.todoWorkType == '5') {
                        if (!_this.addOneFormData.relationCust) {
                            _this.$message.warning('关联客户为空！');
                            $('#saveFnidf').removeClass("yu-disable");
                            $('#saveFnids').removeClass("yu-disable");
                            return;
                        }
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
                                $('#saveFnidf').removeClass("yu-disable");
                                $('#saveFnids').removeClass("yu-disable");
                                _this.$message('操作成功');
                                _this.handleClose(1);
                                yufp.util.butLogInfo(hashCode, '待办事项', '新增一次性待办');
                            }
                        }
                    });
                } else if (val == '2') {
                    _this.$refs.addCycleForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        $('#saveFnidf').removeClass("yu-disable");
                        $('#saveFnids').removeClass("yu-disable");
                        return;
                    }
                    // 判断选择了客户客户跟进
                    if (_this.addCycleFormData.todoWorkType == '5') {
                        if (!_this.addCycleFormData.relationCust) {
                            _this.$message.warning('关联客户为空！');
                            $('#saveFnidf').removeClass("yu-disable");
                            $('#saveFnids').removeClass("yu-disable");
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
                        return;
                    }
                    // 新增请求
                    console.log(model);
                    console.log('2');
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/todowork/addCyCle',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == 0) {
                                $('#saveFnidf').removeClass("yu-disable");
                                $('#saveFnids').removeClass("yu-disable");
                                _this.$message('操作成功');
                                _this.handleClose(1);
                                yufp.util.butLogInfo(hashCode, '待办事项', '新增周期性待办');
                            }
                        }
                    });
                }

            }
        }
    });
}(Vue, $, 'wait2do-add'));