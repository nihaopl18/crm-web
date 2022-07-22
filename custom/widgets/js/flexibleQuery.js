/**
 * yufp-single-com-query
 * 单一组合灵活查询
 * Created by linhongjie on 2022/01/10.
 */
(function (vue, $, name) {
    // 注册用户组件
    vue.component(name, {
        template: '<div>\
        <slot name="trigerEl">\
        <div  class="yufp-governed-cust-selector_sel" style="position:relative;">\
         <div class="yu-select__tags" style="width:100%;">\
           <span style="display:contents">\
           </span>\
         </div>\
         <el-input ref="sel-input" size="30" \
         @focus="onfocusone"  v-model="inputvalue"  readonly name="用户" :style="{height: 38 + \'px\'}"></el-input>\
        </div>\
        </slot>\
    <yu-dialog  title="选择客户" :visible.sync="createVisible" min-width="920">\
    <div class="cust-form">\
        <div v-show="stepIndex === 1">\
            <div style="height: 600px;">\
                <p style="font-size: 16px;margin: 4px 0 24px; font-weight: bold;">单一查询入口</p>\
                <yu-row :gutter="20">\
                    <yu-col :span="23" :offset="1">\
                        <yu-xform size="small" v-model="singleQueryParams" label-width="100px" ref="singleQueryForm" related-table-name="yutable1" responsive>\
                            <yu-xform-group>\
                                <yu-xform-item label="快速查询" placeholder="请输入ECIF号、NDS号、客户中文名、客户英文名、手机号" clearable colspan="24" name="figureCode">\
                                    <div class="el-input-comb" style="margin-top: 15px;">\
                                        <yu-input v-model="fastSearchValue">\
                                            <yu-button slot="append" icon="search"></yu-button>\
                                        </yu-input>\
                                    </div>\
                                </yu-xform-item>\
                                <yu-xform-item label="证件类型" ctype="select" placeholder="请选择" data-code="CD0348" name="custType" :rules="IDTypeRule" clearable></yu-xform-item>\
                                <yu-xform-item label="证件号码" ctype="input" placeholder="请输入" name="certNo" :rules="certNoRule" clearable></yu-xform-item>\
                                <yu-xform-item label="账号/卡号" ctype="input" placeholder="请输入" name="cardNo" clearable></yu-xform-item>\
                                <yu-xform-item ctype="custom" style="text-align: right;">\
                                    <yu-button type="primary" @click="singleQueryFn(\'singleQueryParams\')">查询</yu-button>\
                                </yu-xform-item>\
                        </yu-xform>\
                    </yu-col>\
                </yu-row>\
                <p style="font-size: 16px;margin: 4px 0 24px; font-weight: bold;">组合查询入口</p>\
                <yu-row :gutter="20">\
                    <yu-col :span="23" :offset="1">\
                        <yu-xform ref="filterForm" size="small" v-model="filterModel" label-width="140px" :rules="rules">\
                            <yu-xform-group>\
                                <yu-xform-item label="AUM余额(万元)" ctype="custom">\
                                    <yu-col :sm="11" :xs="24">\
                                        <yu-xform-item name="aumBalanceStart" ctype="input" placeholder="请输入" maxlength="10">\
                                        </yu-xform-item>\
                                    </yu-col>\
                                    <yu-col class="line" :span="2" style="text-align: center">→</yu-col>\
                                    <yu-col :sm="11" :xs="24">\
                                        <yu-xform-item name="aumBalanceEnd" ctype="input" placeholder="请输入" maxlength="10">\
                                        </yu-xform-item>\
                                    </yu-col>\
                                </yu-xform-item>\
                                <yu-xform-item label="年龄区间" ctype="select" placeholder="请选择" data-code="YEAR_SECTION_LIST" name="ageGroup"></yu-xform-item>\
                                <yu-xform-item label="产品类别" ref="custTyped" :quar-params="custTypeRole"\
                                        @select-fn="custParamFn" @select-fn-data="getCustTypeRole" colspan="8"\
                                        ctype="yufp-cust-tree">\
                                    </yu-xform-item>\
                                    <yu-xform-item label="持有产品" colspan="8" :disabled="custdisabled" ctype="input"\
                                        placeholder="请输入客户持有产品名称或产品编号" v-model="prodNameValue" id="prodnameid" clearable\
                                        @change="custTpChangeFn()">\
                                    </yu-xform-item>\
                                    <yu-xform-item label="近一个月到期" colspan="8" ctype="select" placeholder="请选择"\
                                        data-code="EXPIRE_LIST" name="expireNo"></yu-xform-item>\
                                <yu-xform-item label="客户等级" colspan="24" ctype="checkbox" data-code="CUST_GRADE" name="custGrade"></yu-xform-item>\
                                <yu-xform-item label="客户标签" colspan="24" ctype="yufp-tag-list" ref="tagNo" name="tagNo" @tag-change="handleTagChange"></yu-xform-item>\
                                <yu-xform-item label="地区" colspan="24" ctype="custom" name="countAreaCd">\
                                    <el-radio-group v-model="filterModel.countAreaCd">\
                                        <el-radio v-for="item in ORIGION_LIST" :key="item.key" :label="item.key" @click.native.prevent="handleReginClick(item.key)">{{item.value}}\
                                        </el-radio>\
                                    </el-radio-group>\
                                </yu-xform-item>\
                                <yu-xform-item ctype="custom" style="text-align: right;" colspan="24">\
                                    <yu-button type="primary" @click="nextStep(2)">查询</yu-button>\
                                </yu-xform-item>\
                            </yu-xform-group>\
                        </yu-xform>\
                    </yu-col>\
                </yu-row>\
            </div>\
        </div>\
        <div v-show="stepIndex === 2">\
            <div style="height: 600px">\
                <yu-xtable selection-type="radio" ref="yutable" reserve-selection row-key="custId" :data-url="custUrl" :default-load="false" :base-params="baseParam" style="width: 100%;margin-top: 16px" max-height="550" @selection-change="handleCustSelect">\
                    <yu-xtable-column type="index" label="序号"></yu-xtable-column>\
                    <yu-xtable-column prop="custName" label="客户姓名" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="custId" label="ECIF号" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="ndsCustNo" label="NDS号" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="mgrNameOne" label="理财客户经理" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="mgrNameTwo" label="个贷客户经理" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="aumBalanceAvgRmb" label="AUM余额月日均" width="160px" sortable>\
                    </yu-xtable-column>\
                    <yu-xtable-column prop="aumBalance" label="AUM余额" width="160px" sortable></yu-xtable-column>\
                    <yu-xtable-column prop="exchangeFinBalance" label="汇率" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="nonExchangeFinBalance" label="非汇" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="trustBalanceRmb" label="信托" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="rmbFundBalance" label="基金" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="assestManageBalance" label="资管" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="qdiiBalanceRmb" label="QDII净值余额" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="insurranceBalance" label="保险" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="depositBalanceRmb" label="存款" width="160px"></yu-xtable-column>\
                    <yu-xtable-column prop="belongBrch" label="主办分行" width="200px"></yu-xtable-column>\
                    <yu-xtable-column prop="belongBranch" label="主办机构" width="200px"></yu-xtable-column>\
                    <yu-xtable-column prop="nationality" label="地区" data-code="ORIGION_LIST"></yu-xtable-column>\
                </yu-xtable>\
            </div>\
        </div>\
        <div v-show="stepIndex === 3">\
            <div style="height: 600px">\
                <yu-xform ref="custGroupForm" label-width="100px" label-position="top" label-suffix="" v-model="custGroupForm" :rules="custRules">\
                    <yu-xform-group :column="1">\
                        <yu-xform-item label="客群名称" :colspan="8" name="custGroupName" ctype="input" placeholder="请输入" maxlength="10"></yu-xform-item>\
                        <yu-xform-item label="客群描述" colspan="24" name="custGroupDescribe" ctype="textarea" placeholder="请输入" maxlength="100"></yu-xform-item>\
                        <yu-xform-item label="添加到我关注的客群" :colspan="8" name="isFocus" ctype="custom">\
                            <yu-switch on-color="#ff4949" off-color="#C0C4CC" on-value="01" off-value="02" v-model="custGroupForm.isFocus"></yu-switch>\
                        </yu-xform-item>\
                    </yu-xform-group>\
                </yu-xform>\
                <p><i class="el-icon-warning"></i>可以稍后在群组详情中添加成员</p>\
            </div>\
        </div>\
    </div>\
    <span slot="footer" class="dialog-footer">\
        <div v-if="stepIndex === 1">\
            <yu-button @click="handleCreateClose">取 消</yu-button>\
        </div>\
        <div v-if="stepIndex === 2">\
            <yu-button @click="prevStep(1)">上一步</yu-button>\
            <yu-button @click="handleCreateClose">取 消</yu-button>\
            <yu-button type="primary" @click="nextStep(3)">确定</yu-button>\
        </div>\
        <div v-if="stepIndex === 3">\
            <yu-button @click="prevStep(2)">上一步</yu-button>\
            <yu-button @click="handleCreateClose">取 消</yu-button>\
            <yu-button type="primary" @click="saveCustGroup" id="savetj">提 交</yu-button>\
        </div>\
    </span>\
    <ul id="ulid" v-show="showor" style="background-color: white;width:490px;height: 300px;transform-origin: center top;z-index: 2006;position: absolute;left: 36%;top: 390px">\
<li v-for="item in custResults" :key="item.prodId" @click="handleCustomerSelect(item)" style="height: 30px;padding-left: 20px;">\
    {{ item.prodName }} -- {{item.prodId}}\
</li>\
</ul>\
</yu-dialog>\
<yu-dialog :modal-append-to-body="false" :append-to-body="false" title="创建客群" :visible.sync="highLevelCreateVisible" min-width="920" class="createBox" :before-close="handleHighLevlCreateClose">\
    <yufp-cust-flexy-query ref="flexyQuery" :btndisabled.sync="btnDisabled" :show-btn="true" :query-btn="true" :save-as-cust-btn="true" :save-btn="true" :reset-btn="true" :is-create-group="true" @updateFn="updateGroupList" @createcloseflexy="createcloseserarch">\
    </yufp-cust-flexy-query>\
</yu-dialog>\
         </div>',
        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            },
            selectDate: String,
            rawValue: String
        },
        data: function () {
            yufp.lookup.reg('DY0003,DY0004,DY0005,DY0006,CRUD_TYPE,CD0348,CD0069');
            var _this = this; //这句是要的
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
            var checkedDate = function (rule, value, callback) {
                if (!value) {
                    callback(new Error('请输入'));
                }
                if (!_this.customerContactData[0].nextContactDate) {
                    callback();
                } else if (_this.customerContactData[0].nextContactDate && _this.customerContactData[0].nextContactDate >= value) {
                    callback();
                } else {
                    callback(new Error('跟进时间大于下次跟进时间!'));
                }
            };
            var roles = yufp.session.roles;
            var selectRoleId = yufp.sessionStorage.get('selectRole');
            var selectRoleCode = '';
            var selectRoleName = '';
            for (let index = 0; index < roles.length; index++) {
                const element = roles[index];
                if (element.id == selectRoleId) {
                    selectRoleCode = element.code;
                    selectRoleName = element.name;
                }
            }
            return {
                custObjPram: {},
                prodNameValue: '',
                custdisabled: false,
                custTypeRole: false,
                searchBoxShow: false,
                custResults: [],
                showor: false,
                inputvalue: '',
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
                viewTitle: '',
                dialogVisible: false,
                isCustContact: true,
                formdata: {},
                finishedWorkSdata: [],
                customerContactData: [],
                selectCustParams: { // 客户 放大镜 参数
                    user: {
                        dataParams: {
                            belongOrg: yufp.session.org.code,
                            belongMgr: yufp.session.user.loginCode
                        },
                        checkbox: false // 是否支持多选
                    }
                },
                workType: { //设置不同类型报告的字段
                    isDay: false,
                    isWeek: false,
                    isMonth: false
                },
                rule: { //校验规则
                    workReportBusiType: [
                        { required: true, message: '请选择项', trigger: 'change' }
                    ],
                    workSummary: [
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
                workSummary: {
                    second: false,
                    three: false,
                    fouth: false,
                    five: false
                },
                todoDataUrl: '/api/todowork/queryFinished',
                wfCommonParams: {
                    sessionInstuCde: yufp.session.instu.code,
                    sessionOrgCode: yufp.session.org.code,
                    sessionLoginCode: yufp.session.user.loginCode
                },
                selectRoleCode: selectRoleCode,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                    }
                },
            };
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
                        this.prodNameValue = '';
                        this.$refs.custTyped && this.$refs.custTyped.$children[0] && this.$refs.custTyped.$children[0].$children[0] && this.$refs.custTyped.$children[0].$children[0].clearData()
                        this.custTypeRole = false;
                    }
                }
            },
            dialogVisible: function () {
                let _this = this;
                _this.$nextTick(function () {
                    _this.formdata.workReportBusiType = '1'
                });
            },
            createVisible: function (val) {
                let _this = this;
                _this.$nextTick(function () {
                    if (val) {
                        document.getElementsByClassName('el-dialog--small')[1].style.width = '70%'
                    }
                })
            },
            rawValue: function (val) {
                this.inputvalue = val;
            }
        },
        mounted: function () {
            this.ORIGION_LIST = yufp.lookup.find('ORIGION_LIST');
            this.inputvalue = this.rawValue;
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
            jschangeCss: function () {
                let offsetTop = 0;
                let offsetLeft = 0;
                let el = $('#prodnameid input')[0];
                while (el && el.tagName !== 'BODY') {
                    offsetTop += el.offsetTop
                    offsetLeft += el.offsetLeft
                    el = el.offsetParent
                }
                $('#prodnameid input')[0].style.width = el.offsetWidth + 'px';
                $('#prodnameid input')[0].style.top = offsetTop - 70 + 'px';
                $('#prodnameid input')[0].style.left = offsetLeft - 70 + 'px';
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
            onfocusone: function () {
                this.createVisible = true;
            },
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
                        obj.custQueryType = '02';
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
                this.filterModel.isMktBlack = ''; //黑名单客户

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
                    if (tagNo[x] == 'S0000051') {
                        this.filterModel.isMktBlack = 'Y';
                    }
                }

                this.filterModel.tagNo = tagNo.join();
                this.filterModel.tagName = tagName.join();
            },
            // 下一步
            nextStep: function (index) {
                if (index === 2) {
                    var flag = false;
                    delete this.filterModel.undefined;
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
                    if (this.prodNameValue || this.custObjPram.prodId) {
                        flag = true;
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
                    if (flag || !isManage || this.prodNameValue || this.custObjPram.prodId) {
                        this.getFilterCustomerList(index);
                    } else {
                        this.$message.warning('请至少选择一个筛选条件');
                    }
                } else {
                    this.stepTwoData = this.$refs.yutable.selections;
                    this.inputvalue = '';
                    // this.stepIndex = index;
                    this.inputvalue = this.stepTwoData[0].custName + '-' + this.stepTwoData[0].custId;
                    this.$emit('selectfn', this.stepTwoData);
                    // this.$refs.customerContactTable.selections[0].contactCustId = this.stepTwoData[0].custId;
                    // this.$refs.customerContactTable.selections[0].contactCustName = this.stepTwoData[0].custName;
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
                if (reg.test(this.prodNameValue)) {
                    this.prodNameValue = this.prodNameValue;
                } else {
                    this.filterModel.prodId = this.prodNameValue;
                }
            },
            // 筛选客户
            getFilterCustomerList: function (index, queryParam) {
                var _this = this;
                var param = {};
                _this.judgeProdParam();
                delete _this.filterModel.undefined
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
            processmFn: function (row, column, cell, event) {
                if (column.label == '客户') {
                    this.createVisible = true;
                }
            },
            /* 清空 */
            clearObj: function (obj) {
                for (var key in obj) {
                    obj[key] = null;
                }
                return obj;
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
            handleClose: function (isUpdate) {
                this.$emit('closeAdd', isUpdate === 1);
            },
            //设置报告字段
            setWorkType: function (isDay, isWeek, isMonth) {
                var _this = this;
                _this.workType.isDay = isDay;
                _this.workType.isWeek = isWeek;
                _this.workType.isMonth = isMonth;
            },
            /**
             * 新增按钮
             */
            addFn: function () {
                var _this = this;
                _this.switchStatus('新增日程-工作报告');
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
                    _this.finishedWorkSdata = [];
                    _this.$refs.refForm.resetFields();
                    _this.formdata.workReportBusiType = '1';
                    _this.chgReportType('1');
                    if (document.getElementsByClassName('el-upload-list__item is-success')[0] != null && document.getElementsByClassName('el-upload-list__item is-success')[0] != undefined) {
                        document.getElementsByClassName('el-upload-list__item is-success')[0].innerHTML = '';
                    }
                    // 初始化空附件列表
                    _this.$refs.filesTable.queryFn();
                    _this.$refs.refForm.resetFields();
                });
                yufp.service.request({
                    url: backend.noticeService + '/api/infoworkreport/createWorkReportId',
                    method: 'get',
                    data: null,
                    callback: function (code, message, response) {
                        if (code == '0') {
                            _this.createdWorkReportId = response.data;

                            // 设置附件列表组件传入workReportId
                            _this.reportUpLoadBusNo = {
                                busNo: _this.createdWorkReportId
                            };
                            // 初始化附件列表查询时，传入为空
                            var files = {
                                condition: JSON.stringify({
                                    busNo: _this.createdWorkReportId
                                })
                            };
                            yufp.extend(_this.initFilesParams, files);
                            // 获取附件列表
                            _this.$refs.filesTable.queryFn();
                        } else {
                            _this.$message({ message: '生成工作报告ID失败!' });
                        }
                    }
                });
            },
            //对话框->更改报告类型
            chgReportType: function (val) {
                var startDate = new Date();
                // this.formdata.startDate = '';
                if (val == '1') {
                    this.setWorkType(true, false, false);
                    this.formdata.startDate = startDate;
                } else if (val == '2') {
                    this.setWorkType(false, true, false);
                    var dateOfWeek = startDate.getDay(); // 返回当前日期的在当前周的某一天（0～6--周日到周一）
                    var dateOfWeekInt = parseInt(dateOfWeek, 10); // 转换为整型
                    if (dateOfWeekInt == 0) { // 如果是周日
                        dateOfWeekInt = 7;
                    }
                    var aa = 7 - dateOfWeekInt; // 当前于周末相差的天数
                    var temp2 = parseInt(startDate.getDate(), 10); // 按10进制转换，以免遇到08和09的时候转换成0
                    var monDay = temp2 + aa - 6; // 当前日期的周一的日期
                    this.formdata.startDate = new Date(startDate.getFullYear(), startDate.getMonth(), monDay);
                } else if (val == '3') {
                    this.setWorkType(false, false, true);
                    var selYear = startDate.getFullYear();
                    var selMonth = startDate.getMonth();
                    this.formdata.startDate = new Date(selYear, selMonth, 1);
                }
            },
            /**
             * 弹出框->报告标题 更改
             */
            chgWorkSummary: function (val) {
                var _this = this;
                if (val != null && val != '') {
                    if (val.indexOf('1') != -1) {
                        _this.isCustContact = true;
                        _this.newData();
                    } else {
                        _this.isCustContact = false;
                        _this.customerContactData = [];
                    }
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
                } else {
                    _this.isCustContact = false;
                    _this.customerContactData = [];
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
            chgCreateDate: function (time) {
                var _this = this;
                _this.finishedWorkSdata = [];
                var model = {
                    finisher: yufp.session.userId
                };
                time = time instanceof Date ? time : new Date(time);
                var reportType = _this.formdata.workReportBusiType;
                if (reportType == '1') {
                    model.startDate = time;
                    model.endDate = new Date(time.getFullYear(), time.getMonth(), time.getDate());
                    _this.formdata.endDate = time
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
                // yufp.service.request({
                //   url: '/api/todowork/queryMainlist',
                //   method: 'GET',
                //   data: {
                //     condition: JSON.stringify(model)
                //   },
                //   callback: function (code, message, response) {
                //     if (code == '0') {
                //       _this.finishedWorkSdata = response.data;
                //     }
                //   }
                // });
                _this.$refs.finishedWork.remoteData({
                    condition: JSON.stringify(model)
                });
            },
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
             * 弹出框->取消按钮
             */
            cancelFn: function () {
                var _this = this;
                // _this.dialogVisible = false;
                _this.$emit('closeAdd');
            },
            /**
             * 弹出框->保存和新增按钮
             */
            saveFn: function (operate) {
                var _this = this;
                var hashCode = JSON.parse(yufp.sessionStorage.get('YUFP-SESSION-MENUS-OG')).filter(function (menu) {
                    return menu.menuName === '首页';
                })[0].funcId;
                $("#savebc").addClass("yu-disable");
                $("#savetj").addClass("yu-disable");
                var model = {};
                yufp.clone(_this.formdata, model);
                var validate = false;
                _this.$refs.refForm.validate(function (valid) {
                    validate = valid;
                });
                var flag = false;
                // 校验表格数据
                _this.$refs.customerContactTable.validate(function (fields) {
                    if (!fields) {
                        flag = true;
                    }
                });
                if (!validate || !flag) {
                    $("#savebc").removeClass("yu-disable");
                    $("#savetj").removeClass("yu-disable");
                    return;
                }
                if (model.workReportBusiType == '1') {
                    var d = '2:' + _this.formdata.workContent2 + ';' + '3:' + _this.formdata.workContent3 + ';' + '4:' + _this.formdata.workContent4 + ';' + '5:' + _this.formdata.workContent5
                    _this.$set(model, 'workContent', d);
                    model.workSummary = typeof model.workSummary == 'string' ? model.workSummary : model.workSummary.join(',');
                }
                _this.$delete(model, 'workContent2');
                _this.$delete(model, 'workContent3');
                _this.$delete(model, 'workContent4');
                _this.$delete(model, 'workContent5');
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
                        _this.$delete(list[key], '__height');
                        _this.$delete(list[key], '__selected');
                        _this.$delete(list[key], '__translateY');
                        _this.$delete(list[key], '__vkey');
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
                            yufp.util.butLogInfo(hashCode, '工作报告', '新增');
                            _this.commit(model);
                        }
                    }
                });
            },

            /**
             * 控制保存按钮、xdialog、表单的状态
             * @param viewType 表单类型
             * @param editable 可编辑,默认false
             */
            switchStatus: function (viewTitle) {
                var _this = this;
                _this.viewTitle = viewTitle;
                _this.dialogVisible = true;
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
            /**
             * * 客户接触->移除按钮
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
             * 客户放大镜 回调
             */
            custSelFn: function (data) {
                var _this = this;
                if (!data || data.length != 1) {
                    return;
                }
                _this.$refs.customerContactTable.selections[0].contactCustId = data[0].custId;
                _this.$refs.customerContactTable.selections[0].contactCustName = data[0].custName;
            },
            // 审批页面关闭前
            onAfterInit: function (data) { },
            // 审批页面关闭后
            onAfterInit: function (data) {
                var hashCode = JSON.parse(yufp.sessionStorage.get('YUFP-SESSION-MENUS-OG')).filter(function (menu) {
                    return menu.menuName === '首页';
                })[0].funcId;
                yufp.util.butLogInfo(hashCode, '工作报告', '流程提交');
            },
            // 审批页面关闭后
            onAfterClose: function (val) {
                var _this = this;
                var hashCode = JSON.parse(yufp.sessionStorage.get('YUFP-SESSION-MENUS-OG')).filter(function (menu) {
                    return menu.menuName === '首页';
                })[0].funcId;
                if (val === 4) {
                    yufp.util.butLogInfo(hashCode, '工作报告', '撤回');
                } else if (val === 99) {
                    yufp.util.butLogInfo(hashCode, '工作报告', '流程实例化');
                }
                _this.handleClose(1);
            },
            commit: function (data) {
                var _this = this;
                if (data.isDraft == 'Y') {
                    _this.$message('保存到草稿箱');
                    _this.handleClose(1);
                    // yufp.util.butLogInfo(hashCode, '首页新增工作报告', '保存草稿');
                    return;
                } else if (data.isDraft == 'N') {
                    _this.$message('无需审批，新增成功');
                    _this.handleClose(1);
                    // yufp.util.butLogInfo(hashCode, '首页新增工作报告', '无需审批，新增成功');
                    return;
                } else if (data.isDraft == 'N-0') {
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
                    var commitData = {};
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
                                var load = _this.$loading();
                                _this.$refs.yufpWfInit.wfInit(commitData, load);
                                // _this.$message('审批提交成功');
                            }
                        }
                    });
                }
            }
        }
    });
}(Vue, yufp.$, 'yufp-single-com-query'));