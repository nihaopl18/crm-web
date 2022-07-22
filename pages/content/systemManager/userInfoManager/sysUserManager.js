/**
 * hujun -用户管理 2017-12-22
 */
define([
    './custom/widgets/js/yufpOrgTree.js',
    './custom/widgets/js/yufpRoleSelector.js',
    './libs/jsencrypt/jsencrypt.min.js',
    './custom/widgets/js/yufpDptTree.js',
    './custom/widgets/js/yufpExtTree.js'
], function(require, exports) {
    yufp.lookup.reg('DATA_STS', 'SEX_TYPE', 'IDENT_TYPE', 'CD0430', 'RANK_LEVEL', 'CD0429');
    // page加载完成后调用ready方法
    exports.ready = function(hashCode, data, cite) {
        var stsKeyValue = null;
        yufp.custom.vue({
            el: '#userInfo',
            data: function() {
                var em = this;
                return {
                    addUserButton: !yufp.session.checkCtrl('addUser'), // 新增按钮控制
                    editUserButton: !yufp.session.checkCtrl('updateUser'), // 修改按钮控制
                    deleteUserButton: !yufp.session.checkCtrl('deleteUser'), // 删除按钮控制
                    useUserButton: !yufp.session.checkCtrl('useUser'), // 启用按钮控制
                    unuseUserButton: !yufp.session.checkCtrl('unuseUser'), // 停用按钮控制
                    userRelButton: !yufp.session.checkCtrl('userRel'), // 用户管理信息按钮控制
                    resetPwsButton: !yufp.session.checkCtrl('resetPwsUser'), // 密码重置按钮控制
                    height: yufp.custom.viewSize().height - 150,
                    heightOrg: yufp.custom.viewSize().height - 20,
                    heightOt: yufp.custom.viewSize().height - 200,
                    treeUrlRel: backend.appOcaService + '/api/adminsmorg/orgtreequery?orgSts=A&&orgCode=' + yufp.session.org.code,
                    uploadAction: yufp.service.getUrl({ url: backend.gatewayService + backend.fileService + '/api/file/provider/uploadfile?access_token=' + yufp.service.getToken() }),
                    userIdInfo: null,
                    datePick: { // 限制不可小于当前日期
                        disabledDate: function(time) {
                            return time.getTime() < Date.now() - 8.64e7;
                        }
                    },
                    datePick2: { // 限制不可大于当前日期
                        disabledDate: function(time) {
                            return time.getTime() > Date.now() - 8.64e6;
                        }
                    },
                    orgRootId: yufp.session.org.code, // 根据节点ID
                    dialogVisibleImage: false,
                    userForm: {
                        userName: '',
                        loginCode: '',
                        deadline: '',
                        userSts: '',
                        userAvatar: '',
                        busiType: ['1', '2', '3', '4', '5']
                    },
                    infoOrgId: '',
                    queryFields: [
                        { placeholder: '登录代码/姓名/员工号', field: 'userInfo', type: 'input' },

                        { placeholder: '状态', field: 'userSts', type: 'select', dataCode: 'DATA_STS' },
                        { placeholder: '有效期', field: 'deadline', type: 'date' }
                    ],
                    queryButtons: [{
                            label: '查询',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            click: function(model, valid) {
                                em.mainGrid.query.userInfo = model.userInfo;
                                em.mainGrid.query.userSts = model.userSts;
                                em.mainGrid.query.deadline = model.deadline;
                                em.queryMainGridFn();
                            }
                        },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'el-icon-edit' }
                    ],
                    mainGrid: {
                        query: {
                            userInfo: '',
                            orgId: ''
                        },
                        height: yufp.custom.viewSize().height - 150,
                        checkbox: true,
                        dataUrl: backend.appOcaService + '/api/useraccountinfo/querypage',
                        paging: {
                            page: 1,
                            size: 10
                        },
                        currentRow: null,
                        dataParams: {
                            condition: JSON.stringify({
                                orgId: yufp.session.org.id
                            })
                        },
                        tableColumns: [
                            { label: '序号', width: '50', resizable: true, type: 'index' },
                            {
                                label: '用户名称',
                                prop: 'userName',
                                width: '130',
                                resizable: true,
                                template: function() {
                                    return '<template scope="scope">\
                                <a onclick="return false;" href="javascipt:void(0);" style="text-decoration:underline;" @click="_$event(\'custom-detail-click\', scope)">{{ scope.row.userName }}</a>\
                            </template>';
                                }
                            },
                            { label: '登录代码', prop: 'loginCode', resizable: true, width: '130' },
                            { label: '所属部门', prop: 'dptName', resizable: true, width: '130' },
                            { label: '状态', prop: 'userSts', resizable: true, dataCode: 'DATA_STS' },
                            { label: '性别', prop: 'userSex', resizable: true, dataCode: 'SEX_TYPE' },
                            { label: '员工号', prop: 'userCode', resizable: true },
                            { label: '有效期', prop: 'deadline', resizable: true, width: '130' },
                            { label: '最新变更用户', prop: 'lastChgName', resizable: true, width: '130' },
                            { label: '最新变更时间', prop: 'lastChgDt', type: 'date', resizable: true, width: '130' }
                        ]
                    },
                    userFields: [{
                        columnCount: 2,
                        fields: [

                            {
                                field: 'orgId',
                                label: '所属机构',
                                type: 'custom',
                                is: 'yufp-org-tree',
                                param: { needCheckbox: false },
                                rules: [
                                    { required: true, message: '必填项', trigger: 'change' }
                                ],
                                selectFn: function(code, data, arry) {
                                    var temp = yufp.clone(em.userFields[0].fields[1].params);
                                    temp.dataParams = {
                                        orgCode: code
                                    };
                                    em.userFields[0].fields[1].params = yufp.clone(temp);
                                }
                            },
                            {
                                field: 'dptId',
                                label: '所属部门',
                                type: 'custom',
                                is: 'yufp-dpt-tree',
                                params: {
                                    dataUrl: backend.appOcaService + '/api/util/getdpt',
                                    dataId: 'orgCode',
                                    needCheckbox: false
                                },
                                selectFn: function(code, data, arry) {}
                            },
                            {
                                field: 'userPassword',
                                label: '密码',
                                type: 'password',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'change' },
                                    { max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
                                ]
                            },
                            {
                                field: 'userPassword1',
                                label: '确认密码',
                                type: 'password',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'change' },
                                    { max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
                                ]
                            }

                        ]
                    }],
                    userOtherFields: [{
                        columnCount: 2,
                        fields: [{
                                label: '性别',
                                field: 'userSex',
                                type: 'radio',
                                dataCode: 'SEX_TYPE',
                                change: function(model, val, e) {}
                            },
                            {
                                field: 'userBirthday',
                                label: '生日',
                                type: 'date',
                                format: 'yyyy-MM-dd',
                                pickerOptions: em.datePick2
                            },
                            { field: 'certType', label: '证件类型', type: 'select', dataCode: 'CD0429' },
                            {
                                field: 'certNo',
                                label: '证件号码',
                                rules: [
                                    { validator: yufp.validator.IDCard, message: '请输入正确信息', trigger: 'blur' }
                                ]
                            },
                            {
                                field: 'userCode',
                                label: '员工号',
                                rules: [
                                    { max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
                                ]
                            },
                            {
                                field: 'userEmail',
                                label: '邮箱',
                                rules: [
                                    { validator: yufp.validator.email, message: '请输入正确信息', trigger: 'blur' }
                                ]
                            },
                            {
                                field: 'userMobilephone',
                                label: '移动电话',
                                rules: [
                                    { validator: yufp.validator.mobile, message: '请输入正确信息', trigger: 'blur' }
                                ]
                            },
                            {
                                field: 'userOfficetel',
                                label: '办公电话',
                                rules: [
                                    { validator: yufp.validator.telephone, message: '请输入正确信息', trigger: 'blur' }
                                ]
                            },
                            { field: 'userEducation', label: '最高学历', type: 'select', dataCode: 'CD0430' },
                            { field: 'positionDegree', label: '职级', type: 'select', dataCode: 'RANK_LEVEL' },
                            {
                                field: 'userCertificate',
                                label: '资格证书',
                                rules: [
                                    { max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
                                ]
                            },
                            {
                                field: 'entrantsDate',
                                label: '入职时间',
                                type: 'date',
                                format: 'yyyy-MM-dd',
                                pickerOptions: em.datePick2
                            },
                            {
                                field: 'financialJobTime',
                                label: '从业时间',
                                type: 'date',
                                format: 'yyyy-MM-dd',
                                pickerOptions: em.datePick2
                            },
                            {
                                field: 'positionTime',
                                label: '任职时间',
                                type: 'date',
                                format: 'yyyy-MM-dd',
                                pickerOptions: em.datePick2
                            },
                            {
                                field: 'offenIp',
                                label: '常用IP'
                                    // rules:[
                                    // {validator: yufp.validator.ip, message: '请输入正确信息', trigger: 'blur'}
                                    // ]
                            },
                            { field: 'lastChgUsr', label: '最近更新人', hidden: true },
                            { field: 'lastChgDt', label: '最近更新时间', hidden: true }

                        ]
                    }],
                    userDetailFields: [{
                        columnCount: 2,
                        fields: [

                            { field: 'orgId', label: '所属机构', type: 'custom', is: 'yufp-org-tree' },
                            { field: 'dptName', label: '所属部门' }
                        ]
                    }],
                    userDetailOtherFields: [{
                        columnCount: 2,
                        fields: [{
                                label: '性别',
                                field: 'userSex',
                                type: 'radio',
                                dataCode: 'SEX_TYPE',
                                change: function(model, val) {}
                            },
                            { field: 'userBirthday', label: '生日', type: 'date', format: 'yyyy-MM-dd' },
                            { field: 'certType', label: '证件类型', type: 'select', dataCode: 'CD0429' },
                            { field: 'certNo', label: '证件号码' },
                            { field: 'userCode', label: '员工号' },
                            { field: 'userEmail', label: '邮箱' },
                            { field: 'userMobilephone', label: '移动电话' },
                            { field: 'userOfficetel', label: '办公电话' },
                            { field: 'userEducation', label: '最高学历', type: 'select', dataCode: 'CD0430' },
                            { field: 'positionDegree', label: '职级', type: 'select', dataCode: 'RANK_LEVEL' },
                            { field: 'userCertificate', label: '资格证书' },
                            { field: 'entrantsDate', label: '入职时间', type: 'date', format: 'yyyy-MM-dd' },
                            { field: 'financialJobTime', label: '从业时间' },
                            { field: 'positionTime', label: '任职时间' },
                            { field: 'offenIp', label: '常用IP' },
                            { label: '最新变更用户', field: 'lastChgName' },
                            { label: '最新变更时间', field: 'lastChgDt', type: 'date', format: 'yyyy-MM-dd' }

                        ]
                    }],
                    activeFlag: 'first',
                    mainGridRole: {
                        height: 270,
                        checkbox: true,
                        // dataUrl: backend.appOcaService + '/api/adminsmuser/querybyrolests',修改时间 2019-06-17
                        dataUrl: backend.appOcaService + '/api/adminsmuserattr/querybyrolests',
                        dataParams: [{ roles: yufp.session.roles }],
                        tableColumns: [
                            { label: '角色代码', prop: 'roleCode', width: 140, resizable: true },
                            { label: '角色名称', prop: 'roleName', width: 150, resizable: true }
                        ]
                    },
                    mainGridPost: {
                        height: 270,
                        ifDuty: false,
                        checkbox: true,
                        dataUrl: backend.appOcaService + '/api/adminsmuser/querybyduty',
                        tableColumns: [
                            { label: '岗位代码', prop: 'dutyCde', width: 140, resizable: true },
                            { label: '岗位名称', prop: 'dutyName', width: 150, resizable: true }
                        ]
                    },
                    stsOptions: null,
                    busiTypeOptions: null,
                    dialogFormVisible: false, // 新增，修改页面是否显示
                    dialogDetailVisible: false, // 详情页面是否显示
                    nowNode: '', // 当前选中节点数据
                    rootId: 'root', // 根节点ID
                    rootName: '组织机构树', // 根节点名称
                    dialogStatus: '',
                    readonly: false, // 维护信息是否只读
                    dialogVisibleRelInfo: false, // 用户关联信息是否显示
                    dialogVisibleRole: false, // 用户角色是否显示
                    activeName: ['1'], // 默认显示name为1的
                    rules: {
                        userName: [
                            { required: true, message: '必填项', trigger: 'blur' },
                            { max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
                        ],
                        loginCode: [
                            { required: true, message: '必填项', trigger: 'blur' },
                            { max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
                        ],
                        busiType: [
                            { required: true, message: '必填项', trigger: 'blur' }
                        ]
                    },
                    textMap: {
                        update: '修改',
                        create: '新增',
                        detail: '详情',
                        relInfo: '用户关联信息',
                        role: '用户角色'
                    },
                    pwdform: {
                        dialogVisible: false,
                        pwdFields: [{
                            columnCount: 1,
                            fields: [{
                                field: 'password',
                                label: '密码',
                                type: 'password',
                                rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                            }, {
                                field: 'confirmPwd',
                                label: '确认密码',
                                type: 'password',
                                rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                            }]
                        }],
                        pwdButtons: [],
                        tempUserId: yufp.session.userId
                    },
                    imageUrl: ''
                };
            },
            filters: {
                statusFilter: function(status) {
                    return stsKeyValue[status];
                }
            },
            methods: {
                handleAvatarSuccess: function(res, file) {
                    var url = yufp.settings.ssl ? 'https://' : 'http://';
                    url += yufp.settings.url;
                    url += backend.fileService;
                    url += '/api/file/provider/download?fileId=' + res.data.filePath;
                    this.userForm.userAvatar = res.data.filePath;
                    this.imageUrl = yufp.util.addTokenInfo(url);
                },
                beforeAvatarUpload: function(file) {
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
                queryMainGridFn: function() {
                    var me = this;
                    var param = {
                        condition: JSON.stringify({
                            userInfo: this.mainGrid.query.userInfo ? this.mainGrid.query.userInfo : null,
                            userSts: this.mainGrid.query.userSts ? this.mainGrid.query.userSts : null,
                            deadline: this.mainGrid.query.deadline ? this.mainGrid.query.deadline : null,
                            orgId: this.mainGrid.query.orgId ? this.mainGrid.query.orgId : yufp.session.org.id
                        })
                    };
                    me.$refs.mytable.remoteData(param);
                },
                nodeClickFn: function(node, obj, nodeComp) {
                    if (node != '') {
                        this.nowNode = node;
                        /* 初始化部门数据*/
                        var temp = yufp.clone(this.userFields[0].fields[1].params);
                        temp.dataParams = {
                            orgCode: node.orgId
                        };
                        this.userFields[0].fields[1].params = yufp.clone(temp);
                        this.mainGrid.query.orgId = node.orgCode;
                        this.mainGrid.query.orgType = node.orgType;
                        this.queryMainGridFn();
                    }
                },
                openCreateFn: function() {
                    this.dialogStatus = 'create';

                    this.activeName = ['1'];
                    this.dialogFormVisible = true;
                    this.dialogDetailVisible = false;
                    this.readonly = false;

                    this.$nextTick(function() {
                        this.$refs.userInfo.resetFields();
                        this.$refs.userOtherInfo.resetFields();
                        this.userForm = {
                            userName: '',
                            loginCode: '',
                            userSts: 'A',
                            deadline: '',
                            userAvatar: '',
                            busiType: []
                        };
                        this.$refs.userInfo.formModel.lastChgUsr = yufp.session.userId;
                        this.$refs.userInfo.formModel.userSts = 'A';
                        if (this.nowNode != null) {
                            this.$refs.userInfo.formModel.orgId = this.nowNode.orgId;
                        }
                        this.userOtherFields[0].fields[1].pickerOptions = this.datePick2;
                        this.userFields[0].fields[2].hidden = false;
                        this.userFields[0].fields[3].hidden = false;
                        // 初始化部门树
                        var temp = yufp.clone(this.userFields[0].fields[1].params);
                        if (this.nowNode == null) {
                            temp.dataParams = {
                                orgCode: yufp.session.org.code
                            };
                        } else {
                            temp.dataParams = {
                                orgCode: this.nowNode.orgId
                            };
                        }
                        this.userFields[0].fields[1].params = yufp.clone(temp);
                    });
                },
                openDetailFn: function(row) {
                    var me = this;
                    var busiType = '';
                    var url = yufp.settings.ssl ? 'https://' : 'http://';
                    url += yufp.settings.url;
                    url += backend.fileService;
                    url += '/api/file/provider/download?fileId=' + row.row.userAvatar;
                    this.imageUrl = yufp.util.addTokenInfo(url);
                    this.mainGrid.currentRow = row;
                    this.activeName = ['1', '2'];
                    this.dialogFormVisible = false;
                    this.dialogDetailVisible = true;
                    var arrList = [];
                    for (var i = 0; i < me.busiTypeOptions.length; i++) {
                        arrList.push(me.busiTypeOptions[i].value);
                    };
                    this.userForm = {
                        userName: row.row.userName,
                        loginCode: row.row.loginCode,
                        userSts: row.row.userSts ? row.row.userSts : null,
                        deadline: row.row.deadline ? row.row.deadline : null,
                        userAvatar: row.row.userAvatar ? row.row.userAvatar : null,
                        busiType: row.row.busiType ? row.row.busiType : arrList || ''
                    };
                    this.$nextTick(function() {
                        this.$refs.userDetailInfo.resetFields();
                        this.$refs.userDetailOtherInfo.resetFields();
                        yufp.extend(this.$refs.userDetailInfo.formModel, row.row);
                        yufp.extend(this.$refs.userDetailOtherInfo.formModel, row.row);
                        yufp.service.request({
                            method: 'get',
                            url: backend.appOcaService + '/api/adminsmuserattr/qryuserattrinfo',
                            data: {
                                loginCode: row.row.loginCode
                            },
                            callback: function(code, message, response) {
                                if (code == 0 && response.code == 0) {
                                    if (response.data.length > 0) {
                                        busiType = response.data[0].busiType;
                                        me.userForm = {
                                            userName: row.row.userName,
                                            loginCode: row.row.loginCode,
                                            userSts: row.row.userSts ? row.row.userSts : null,
                                            deadline: row.row.deadline ? row.row.deadline : null,
                                            busiType: busiType.split(','),
                                            userAvatar: row.row.userAvatar ? row.row.userAvatar : null
                                        };
                                    } else {
                                        me.userForm = {
                                            userName: row.row.userName,
                                            loginCode: row.row.loginCode,
                                            userSts: row.row.userSts ? row.row.userSts : null,
                                            deadline: row.row.deadline ? row.row.deadline : null,
                                            busiType: [],
                                            userAvatar: row.row.userAvatar ? row.row.userAvatar : null
                                        };
                                    }
                                } else {
                                    me.userForm = {
                                        userName: row.row.userName,
                                        loginCode: row.row.loginCode,
                                        userSts: row.row.userSts ? row.row.userSts : null,
                                        deadline: row.row.deadline ? row.row.deadline : null,
                                        busiType: [],
                                        userAvatar: row.row.userAvatar ? row.row.userAvatar : null
                                    };
                                }
                            }
                        });
                    });
                },
                openEditFn: function(row) {
                    var me = this;
                    var busiType = '';
                    if (this.$refs.mytable.selections.length !== 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var row = this.$refs.mytable.selections[0];
                    if (row.userSts === 'A') {
                        this.$message({ message: '只能选择失效或者待生效的数据', type: 'warning' });
                        return;
                    }
                    var url = yufp.settings.ssl ? 'https://' : 'http://';
                    url += yufp.settings.url;
                    url += backend.fileService;
                    url += '/api/file/provider/download?fileId=' + row.userAvatar;
                    this.imageUrl = yufp.util.addTokenInfo(url);
                    this.dialogStatus = 'update';
                    this.activeName = ['1'];
                    this.dialogFormVisible = true;
                    this.dialogDetailVisible = false;
                    this.readonly = true;
                    this.userForm = {
                        userName: row.userName,
                        loginCode: row.loginCode,
                        userSts: row.userSts ? row.userSts : null,
                        deadline: row.deadline ? row.deadline : null,
                        busiType: [],
                        userAvatar: row.userAvatar ? row.userAvatar : null
                    };

                    this.$nextTick(function() {
                        this.$refs.userInfo.resetFields();
                        this.$refs.userOtherInfo.resetFields();
                        yufp.extend(this.$refs.userInfo.formModel, row);
                        yufp.extend(this.$refs.userOtherInfo.formModel, row);
                        // 初始化部门树
                        var temp = yufp.clone(this.userFields[0].fields[1].params);

                        temp.dataParams = {
                            orgCode: row.orgId
                        };
                        this.userFields[0].fields[1].params = yufp.clone(temp);
                        this.userFields[0].fields[2].hidden = true;
                        this.userFields[0].fields[3].hidden = true;
                        this.userOtherFields[0].fields[1].pickerOptions = this.datePick2;
                        yufp.service.request({
                            method: 'get',
                            url: backend.appOcaService + '/api/adminsmuserattr/qryuserattrinfo',
                            data: {
                                loginCode: row.loginCode
                            },
                            callback: function(code, message, response) {
                                if (code == 0 && response.code == 0) {
                                    if (response.data.length > 0) {
                                        busiType = response.data[0].busiType;
                                        me.userForm = {
                                            userName: row.userName,
                                            loginCode: row.loginCode,
                                            userSts: row.userSts ? row.userSts : null,
                                            busiType: busiType.split(','),
                                            deadline: row.deadline ? row.deadline : null,
                                            userAvatar: row.userAvatar ? row.userAvatar : null
                                        };
                                    } else {
                                        me.userForm = {
                                            userName: row.userName,
                                            loginCode: row.loginCode,
                                            userSts: row.userSts ? row.userSts : null,
                                            busiType: [],
                                            deadline: row.deadline ? row.deadline : null,
                                            userAvatar: row.userAvatar ? row.userAvatar : null
                                        };
                                    }
                                } else {
                                    me.userForm = {
                                        userName: row.userName,
                                        loginCode: row.loginCode,
                                        userSts: row.userSts ? row.userSts : null,
                                        busiType: [],
                                        deadline: row.deadline ? row.deadline : null,
                                        userAvatar: row.userAvatar ? row.userAvatar : null
                                    };
                                }
                            }
                        });
                    });
                },
                openRoleFn: function() {

                },
                openRelInfoFn: function() {
                    var row = this.$refs.mytable.selections;
                    if (row.length != 1) {
                        this.$message({ message: '请选择一条数据', type: 'warning' });
                        return;
                    }
                    if (!row[0].orgId) {
                        this.$message({ message: '当前机构为空，请先分配机构!', type: 'warning' });
                        return;
                    }
                    this.dialogStatus = 'relInfo';
                    this.dialogVisibleRelInfo = true;
                    this.mainGridPost.ifDuty = true;
                    this.activeFlag = 'first';
                    var em = this;
                    this.$nextTick(function() {
                        em.$refs.roleTable.remoteData({ orgId: row[0].orgId });
                        // 用户岗位信息屏蔽
                        // em.$refs.dutyTable.remoteData({ orgId: row[0].orgId });
                        var param = {
                            condition: JSON.stringify({
                                paramId: row[0].userId
                            }),
                            page: 1,
                            size: 10000
                        };
                        yufp.service.request({
                            method: 'GET',
                            url: backend.appOcaService + '/api/adminsmuser/queryuserrole',
                            data: param,
                            callback: function(code, message, response) {
                                var infos = response.data;
                                var it = 0,
                                    total = 100;
                                var fn = function() {
                                    if (total < 1 || em.$refs.roleTable.data.length > 0) {
                                        clearInterval(it);
                                        // for (var i = 0; i < yufp.session.roles.length; i++) {
                                        //   if (yufp.session.roles[i].code == '114') {
                                        //     var roleCodes = ['105', '103', '102', '101', '100', 'R001'];
                                        //     var roleTables = [];
                                        //     for (var j = 0; j < em.$refs.roleTable.data.length; j++) {

                                        //       if (roleCodes.indexOf(em.$refs.roleTable.data[j].roleCode) != -1) {

                                        //       } else {
                                        //         roleTables.push(em.$refs.roleTable.data[j]);
                                        //       }
                                        //     }
                                        //     em.$refs.roleTable.data = roleTables;
                                        //   }
                                        // }
                                        for (var i = 0; i < infos.length; i++) {
                                            em.$refs.roleTable.data.filter(function(item) {
                                                if (item.roleId === infos[i].roleId) {
                                                    em.$refs.roleTable.toggleRowSelection(item);
                                                }
                                            });
                                        }
                                    } else {
                                        total--;
                                    }
                                };
                                var it = setInterval(fn, 50);
                            }
                        });
                    });
                },
                updateUserInfoFn: function(comitData) {
                    yufp.service.request({
                        method: 'POST',
                        url: backend.appOcaService + '/api/useraccountinfo/updateUserInfo',
                        data: {
                            loginCode: comitData.loginCode
                        },
                        callback: function(code, message, response) {
                            if (code == 0 && response.code == 0) {
                                console.log('成功');
                            } else {
                                console.log('失败');
                            }
                        }
                    })
                },
                saveCreateFn: function() {
                    var me = this;
                    var userInfo = me.$refs.userInfo,
                        userOtherInfo = me.$refs.userOtherInfo;
                    var infoValid = true;
                    var otherInfoValid = true;
                    userInfo.validate(function(valid) {
                        infoValid = valid;
                    });
                    userOtherInfo.validate(function(valid) {
                        otherInfoValid = valid;
                    });
                    if (infoValid && otherInfoValid) {
                        var comitData = {};
                        delete userInfo.formModel.userId;
                        if (userInfo.formModel.userPassword !== userInfo.formModel.userPassword1) {
                            me.$message({ message: '确认密码和密码不一致', type: 'warning' });
                            return false;
                        }
                        yufp.extend(comitData, userInfo.formModel);
                        yufp.extend(comitData, userOtherInfo.formModel);
                        yufp.extend(comitData, me.userForm);
                        comitData.lastChgUsr = yufp.session.userId;
                        comitData.busiType = me.userForm.busiType = '1,2,3,4,5';
                        // comitData.busiType = me.userForm.busiType.join(',');
                        var encodePwd = this.encodePassword(userInfo.formModel.userPassword);
                        yufp.service.request({
                            url: backend.uaaService + '/api/passwordcheck/checkpwd',
                            method: 'POST',
                            data: {
                                sysId: yufp.session.logicSys.id,
                                pwd: encodePwd,
                                userId: '',
                                passwordTyp: '2'
                            },
                            callback: function(code, message, response) {
                                if (code == 0 && response.code === '1001') {
                                    comitData.userPassword = encodePwd;
                                    delete comitData.userPassword1;
                                    yufp.service.request({
                                        method: 'POST',
                                        url: backend.appOcaService + '/api/adminsmuser/adduserinfo',
                                        data: comitData,
                                        callback: function(code, message, response) {
                                            if (code == 0 && response.code == 0) {
                                                yufp.service.request({
                                                    method: 'POST',
                                                    url: backend.appOcaService + '/api/adminsmuserattr/adduserattrinfo',
                                                    data: comitData,
                                                    callback: function(code, message, response) {
                                                        if (code == 0 && response.code == 0) {
                                                            me.dialogFormVisible = false;
                                                            me.$message({ message: '数据保存成功！' });
                                                            yufp.util.butLogInfo(hashCode, '用户管理', '新增成功');
                                                            me.queryMainGridFn();
                                                            // 新增保存接口调用
                                                            me.updateUserInfoFn(comitData);
                                                        } else {
                                                            me.$message({ message: '保存失败', type: 'warning' });
                                                        }
                                                    }
                                                });
                                            } else {
                                                me.$message({ message: response.message, type: 'warning' });
                                            }
                                        }
                                    });
                                } else {
                                    me.$message({ message: response.message, type: 'warning' });
                                    return false;
                                }
                            }
                        });
                    } else {
                        me.$message({ message: '请检查输入项是否合法', type: 'warning' });
                        return false;
                    }
                },
                saveEditFn: function(form) {
                    var me = this;
                    var userInfo = me.$refs.userInfo,
                        userOtherInfo = me.$refs.userOtherInfo;
                    userInfo.formModel.userPassword1 = userInfo.formModel.userPassword;
                    var infoValid = true;
                    var otherInfoValid = true;
                    userInfo.validate(function(valid) {
                        infoValid = valid;
                    });
                    userOtherInfo.validate(function(valid) {
                        otherInfoValid = valid;
                    });
                    if (infoValid && otherInfoValid) {
                        var users = {
                            orgId: userInfo.formModel.orgId,
                            dptId: userInfo.formModel.dptId
                        };
                        var comitData = {};
                        yufp.extend(comitData, userInfo.formModel);
                        yufp.extend(comitData, userOtherInfo.formModel);
                        yufp.extend(comitData, me.userForm);
                        yufp.extend(comitData, users);
                        comitData.lastChgUsr = yufp.session.userId;
                        comitData.busiType = me.userForm.busiType.join(',');
                        delete comitData.userPassword1;
                        yufp.service.request({
                            method: 'POST',
                            url: backend.appOcaService + '/api/adminsmuser/update',
                            data: comitData,
                            callback: function(code, message, response) {
                                if (code == 0 && response.code == 0) {
                                    yufp.service.request({
                                        method: 'POST',
                                        url: backend.appOcaService + '/api/adminsmuserattr/edituserattr',
                                        data: comitData,
                                        callback: function(code, message, response) {
                                            if (code == 0 && response.code == 0) {
                                                me.dialogFormVisible = false;
                                                me.$message({ message: '数据保存成功！' });
                                                yufp.util.butLogInfo(hashCode, '用户管理', '修改成功');
                                                me.queryMainGridFn();
                                                // 修改保存接口调用
                                                me.updateUserInfoFn(comitData);
                                            } else {
                                                me.$message({ message: '保存失败', type: 'warning' });
                                            }
                                        }
                                    });
                                } else {
                                    me.$message({ message: response.message, type: 'warning' });
                                }
                            }
                        });
                    } else {
                        me.$message({ message: '请检查输入项是否合法', type: 'warning' });
                        return false;
                    }
                },
                useBatchFn: function() { // 批量启用
                    var rows = this.$refs.mytable.selections;
                    if (rows.length > 0) {
                        var id = '';
                        for (var i = 0; i < rows.length; i++) {
                            var row = rows[i];
                            if (row.userSts === 'I' || row.userSts === 'W') {
                                id = id + ',' + row.userId;
                            } else {
                                this.$message({ message: '只能选择停用或待生效的数据', type: 'warning' });
                                return;
                            }
                        }
                        var vue = this;
                        this.$confirm('此操作将启用该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(function() {
                            yufp.service.request({
                                method: 'POST',
                                data: {
                                    id: id,
                                    userId: yufp.session.userId
                                },
                                url: backend.appOcaService + '/api/adminsmuser/usebatch?id=' + id + '&userId=' + yufp.session.userId,
                                callback: function(code, message, response) {
                                    vue.$message({ message: '数据操作成功！' });
                                    yufp.util.butLogInfo(hashCode, '用户管理', '启用成功');
                                    vue.queryMainGridFn();
                                }
                            });
                        });
                    } else {
                        this.$message({ message: '请先选择要启用的数据', type: 'warning' });
                        return;
                    }
                },
                unUseBatchFn: function() { // 批量停用
                    var rows = this.$refs.mytable.selections;
                    if (rows.length > 0) {
                        var id = '';
                        for (var i = 0; i < rows.length; i++) {
                            var row = rows[i];
                            if (row.userSts === 'A') {
                                id = id + ',' + row.userId;
                            } else {
                                this.$message({ message: '只能选择已生效的数据', type: 'warning' });
                                return;
                            }
                        }

                        var vue = this;
                        this.$confirm('此操作将停用该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(function() {
                            yufp.service.request({
                                method: 'POST',
                                data: {
                                    id: id,
                                    userId: yufp.session.userId
                                },
                                url: backend.appOcaService + '/api/adminsmuser/unusebatch?id=' + id + '&userId=' + yufp.session.userId,
                                callback: function(code, message, response) {
                                    vue.$message({ message: '数据操作成功！' });
                                    yufp.util.butLogInfo(hashCode, '用户管理', '停用成功');
                                    vue.queryMainGridFn();
                                }
                            });
                        });
                    } else {
                        this.$message({ message: '请先选择要停用的数据', type: 'warning' });
                        return;
                    }
                },
                deletestFn: function() { // 批量删除
                    var rows = this.$refs.mytable.selections;
                    if (rows.length > 0) {
                        var id = '';
                        for (var i = 0; i < rows.length; i++) {
                            var row = rows[i];
                            if (row.userSts === 'I') {
                                id = id + ',' + row.userId;
                            } else {
                                this.$message({ message: '只能删除停用的数据', type: 'warning' });
                                return;
                            }
                        }
                        var vue = this;
                        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(function() {
                            yufp.service.request({
                                method: 'POST',
                                data: {
                                    id: id
                                },
                                url: backend.appOcaService + '/api/adminsmuser/deletebatch?id=' + id,
                                callback: function(code, message, response) {
                                    vue.$message({ message: '数据删除成功！' });
                                    yufp.util.butLogInfo(hashCode, '用户管理', '删除成功');
                                    vue.queryMainGridFn();
                                }
                            });
                        });
                    } else {
                        this.$message({ message: '请先选择要删除的数据', type: 'warning' });
                        return;
                    }
                },
                handleClick: function(tab, event) {
                    var rows = this.$refs.mytable.selections;
                    var em = this;
                    var param = {
                        condition: JSON.stringify({
                            paramId: rows[0].userId
                        }),
                        page: 1,
                        size: 10000
                    };
                    if (tab.name === 'first') {
                        yufp.service.request({
                            method: 'GET',
                            url: backend.appOcaService + '/api/adminsmuser/queryuserrole',
                            data: param,
                            callback: function(code, message, response) {
                                var infos = response.data;
                                for (var i = 0; i < infos.length; i++) {
                                    em.$refs.roleTable.data.filter(function(item) {
                                        if (item.roleId === infos[i].roleId) {
                                            em.$refs.roleTable.toggleRowSelection(item, true);
                                        }
                                    });
                                }
                            }
                        });
                    } else if (tab.name === 'second') {
                        yufp.service.request({
                            method: 'GET',
                            url: backend.appOcaService + '/api/adminsmuser/queryuserduty',
                            data: param,
                            callback: function(code, message, response) {
                                var infos = response.data;
                                for (var i = 0; i < infos.length; i++) {
                                    em.$refs.dutyTable.data.filter(function(item) {
                                        if (item.dutyId === infos[i].dutyId) {
                                            em.$refs.dutyTable.toggleRowSelection(item, true);
                                        }
                                    });
                                }
                            }
                        });
                    } else if (tab.name === 'third') {
                        yufp.service.request({
                            method: 'GET',
                            url: backend.appOcaService + '/api/adminsmuser/queryuserorg',
                            data: param,
                            callback: function(code, message, response) {
                                var infos = response.data;
                                var keys = [];
                                for (var i = 0; i < infos.length; i++) {
                                    keys.push(infos[i].orgId);
                                }
                                em.$refs.orgUsertree.setCheckedKeys(keys, true);
                            }
                        });
                    }
                },
                closeFn: function() {
                    this.mainGridPost.ifDuty = false;
                },
                saveEditFnOrg: function() {
                    var checks = this.$refs.orgUsertree.getCheckedKeys();
                    var em = this;
                    var commit = [];
                    var row = em.$refs.mytable.selections[0];
                    for (var i = 0; i < checks.length; i++) {
                        var data = {
                            userId: row.userId,
                            lastChgUsr: yufp.session.userId,
                            orgId: checks[i]
                        };
                        commit.push(data);
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.appOcaService + '/api/adminsmuser/saveorg/' + row.userId,
                        data: JSON.stringify(commit),
                        callback: function(code, message, response) {
                            em.$message({ message: '数据操作成功！' });
                            yufp.util.butLogInfo(hashCode, '用户管理', '保存机构');
                        }
                    });
                },
                saveEditFnRole: function() {
                    var list = this.$refs.roleTable.selections;
                    var em = this;
                    var commit = [];
                    var row = em.$refs.mytable.selections[0];
                    for (var i = 0; i < list.length; i++) {
                        var data = {
                            userId: row.userId,
                            lastChgUsr: yufp.session.userId,
                            roleId: list[i].roleId
                        };
                        commit.push(data);
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.appOcaService + '/api/adminsmuser/saverole/' + row.userId,
                        data: JSON.stringify(commit),
                        callback: function(code, message, response) {
                            em.$message({ message: '数据操作成功！' });
                            em.dialogVisibleRelInfo = false;
                            yufp.util.butLogInfo(hashCode, '用户管理', '保存角色');
                        }
                    });

                },
                saveEditFnPost: function() {
                    var list = this.$refs.dutyTable.selections;
                    var em = this;
                    var commit = [];
                    var row = em.$refs.mytable.selections[0];
                    for (var i = 0; i < list.length; i++) {
                        var data = {
                            userId: row.userId,
                            lastChgUsr: yufp.session.userId,
                            dutyId: list[i].dutyId
                        };
                        commit.push(data);
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.appOcaService + '/api/adminsmuser/savepost/' + row.userId,
                        data: JSON.stringify(commit),
                        callback: function(code, message, response) {
                            em.$message({ message: '数据操作成功！' });
                            yufp.util.butLogInfo(hashCode, '用户管理', '保存岗位');
                        }
                    });
                },
                // 重置密码按钮
                resetPassword: function() {
                    if (this.$refs.mytable.selections.length != 1) {
                        this.$message('请选择一条数据', '提示');
                        return;
                    }

                    var temp = this.$refs.mytable.selections[0];
                    this.pwdform.tempUserId = temp.userId;
                    this.pwdform.dialogVisible = true;
                },
                // 确认修改密码
                resetPwd: function() {
                    var data = this.$refs.pwdform.formModel;
                    var password = data.password;
                    var comfirmPwd = data.confirmPwd;
                    if (password == null || password == '' || comfirmPwd == null || comfirmPwd == '') {
                        this.$message('请输入必填项!', '提示');
                        return;
                    }

                    if (password != comfirmPwd) {
                        this.$message('两次输入密码不一致!', '提示');
                        return;
                    }
                    var encodePwd = this.encodePassword(password);
                    var me = this;
                    yufp.service.request({
                        url: backend.uaaService + '/api/passwordcheck/checkpwd', // 校验密码策略
                        method: 'POST',
                        data: {
                            sysId: yufp.session.logicSys.id,
                            pwd: encodePwd,
                            userId: me.pwdform.tempUserId,
                            passwordTyp: '2'
                        },
                        callback: function(code, message, response) {
                            if (code == 0 && response.code === '1001') {
                                yufp.service.request({
                                    url: backend.appOcaService + '/api/adminsmuser/resetpwd',
                                    method: 'POST',
                                    data: JSON.stringify({
                                        userId: me.pwdform.tempUserId,
                                        password: encodePwd,
                                        updateUser: yufp.session.userId
                                    }),
                                    callback: function(code, message, response) {
                                        if (code === 0) {
                                            yufp.service.request({
                                                url: backend.appOcaService + '/api/adminsmuserattr/updatePwdTime',
                                                method: 'GET',
                                                data: { userId: me.pwdform.tempUserId },
                                                callback: function(code, message, response) {
                                                    me.$message({
                                                        message: '密码修改成功！'
                                                    }, 'success');
                                                    me.pwdform.dialogVisible = false;
                                                    yufp.util.butLogInfo(hashCode, '用户管理', '重置密码');
                                                }
                                            });
                                        } else {
                                            me.$message({
                                                message: '密码修改失败！请重试',
                                                type: 'warning'
                                            });
                                            return;
                                        }
                                    }
                                });
                            } else {
                                me.$message({ message: response.message, type: 'warning' });
                                return false;
                            }
                        }
                    });
                },
                encodePassword: function(pwd) {
                    var encrypt = new JSEncrypt();
                    encrypt.setPublicKey(yufp.util.getRSAPublicKey());
                    return encrypt.encrypt(pwd);
                }
            },
            mounted: function() {
                var me = this;
                yufp.lookup.bind('DATA_STS', function(data) {
                    me.stsOptions = data;
                });
                yufp.lookup.bind('CD0327', function(data) {
                    me.busiTypeOptions = data;
                });
            }

        });
    };

    // 消息处理
    exports.onmessage = function(type, message) {

    };

    // page销毁时触发destroy方法
    exports.destroy = function(id, cite) {

    };
});