/**
 * Created by zhanghan on 2017/12/8
 * 角色管理
 */
define(
    [
        './custom/widgets/js/YufpUserSelector.js',
        './custom/widgets/js/yufpOrgTree.js',
        './custom/widgets/js/yufpExtTree.js',
        './custom/widgets/js/yufpTemplateSelector.js' // 数据权限模板选择器  add by chenlin
    ],
    function(require, exports) {
        // page加载完成后调用ready方法
        exports.ready = function(hashCode, data, cite) {
            yufp.lookup.reg('DATA_STS');
            var orgId = '';
            var index = 0;
            var vm = yufp.custom.vue({
                el: '#roleManage',
                data: function() {
                    var me = this;
                    return {
                        userId: yufp.session.userId,
                        dataRoot: yufp.session.org.code,
                        height: yufp.custom.viewSize().height - 20,
                        treeUrl: backend.appOcaService + '/api/util/getorg?userId=' + yufp.session.userId + '&orgCode=' + yufp.session.org.code,
                        orgRootId: yufp.session.org.code,
                        roleUserUrl: backend.appOcaService + '/api/adminsmrole/roleuser',
                        queryFields: [
                            { placeholder: '角色代码', field: 'roleCode', type: 'input' },
                            { placeholder: '角色名称', field: 'roleName', type: 'input' },
                            { placeholder: '状态', field: 'roleSts', type: 'select', dataCode: 'DATA_STS' }
                        ],
                        queryButtons: [{
                                label: '查询',
                                op: 'submit',
                                type: 'primary',
                                icon: 'search',
                                click: function(model, valid) {
                                    me.mainGrid.query.roleCode = model.roleCode;
                                    me.mainGrid.query.roleName = model.roleName;
                                    me.mainGrid.query.roleSts = model.roleSts;
                                    me.queryMainGridFn();
                                }
                            },
                            { label: '重置', op: 'reset', type: 'primary', icon: 'el-icon-edit' }
                        ],
                        styleObj: { height: yufp.custom.viewSize().height + 'px', overflow: 'auto' },
                        mainGrid: {
                            data: null,
                            total: null,
                            loading: false,
                            multipleSelection: [],
                            query: {
                                orgId: '',
                                roleCode: '',
                                roleName: '',
                                roleSts: ''
                            },
                            height: yufp.custom.viewSize().height - 150,
                            checkbox: true,
                            dataUrl: backend.appOcaService + '/api/adminsmrole/querypage',
                            currentRow: null,
                            dataParams: {
                                condition: JSON.stringify({
                                    orgId: yufp.session.org.id
                                })
                            },
                            tableColumns: [
                                { label: '角色代码', prop: 'roleCode', resizable: true },
                                { label: '角色名称', prop: 'roleName', resizable: true },
                                { label: '状态', prop: 'roleSts', width: 90, resizable: true, dataCode: 'DATA_STS' },
                                { label: '所属机构', prop: 'orgName', resizable: true },
                                { label: '最新变更用户', prop: 'userName', resizable: true },
                                { label: '最新变更时间', prop: 'lastChgDt', type: 'date', resizable: true }
                            ]
                        },
                        updateFields: [{
                            columnCount: 1,
                            fields: [{
                                    field: 'roleCode',
                                    label: '角色代码',
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                },
                                {
                                    field: 'roleName',
                                    label: '角色名称',
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                },
                                {
                                    label: '所属机构',
                                    field: 'orgId',
                                    type: 'custom',
                                    is: 'yufp-org-tree',
                                    param: { needDpt: true, needCheckbox: false },
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                },
                                {
                                    field: 'roleSts',
                                    label: '状态',
                                    type: 'select',
                                    dataCode: 'DATA_STS',
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                }
                            ]
                        }],
                        updateButtons: [{
                                label: '取消',
                                type: 'primary',
                                icon: 'yx-undo2',
                                hidden: false,
                                click: function(model) {
                                    me.dialogFormVisible = false;
                                }
                            },
                            {
                                label: '保存',
                                type: 'primary',
                                op: 'submit',
                                icon: 'check',
                                hidden: false,
                                click: function(model) {
                                    me.saveCreateFn();
                                }
                            }
                        ],
                        // 角色用户
                        userMap: {
                            roleUser: '角色用户'
                        },
                        userTableColumns: [
                            { label: '登录代码', prop: 'loginCode', width: 180 },
                            { label: '员工姓名', prop: 'userName', sortable: true, resizable: true },
                            { label: '所属机构', prop: 'orgName', width: 180 }
                        ],
                        userQueryFields: [
                            { placeholder: '登录代码', field: 'loginCode', type: 'input' },
                            { placeholder: '员工姓名', field: 'userName', type: 'input' },
                            { placeholder: '员工号', field: 'userCode', type: 'input' }
                        ],
                        userQueryButtons: [{
                                label: '搜索',
                                op: 'submit',
                                type: 'primary',
                                icon: 'search',
                                click: function(model, valid) {
                                    if (valid) {
                                        var param = {
                                            condition: JSON.stringify({
                                                loginCode: me.$refs.userQuery.fm.loginCode ? me.$refs.userQuery.fm.loginCode : null,
                                                userName: me.$refs.userQuery.fm.userName ? me.$refs.userQuery.fm.userName : null,
                                                userCode: me.$refs.userQuery.fm.userCode ? me.$refs.userQuery.fm.userCode : null,
                                                userSts: me.$refs.userQuery.fm.userSts ? me.$refs.userQuery.fm.userSts : null,
                                                roleId: me.$refs.roletable.selections[0].roleId
                                            })
                                        };
                                        me.$refs.userTable.remoteData(param);
                                    }
                                }
                            },
                            {
                                label: '重置',
                                op: 'reset',
                                type: 'primary',
                                icon: 'yx-loop2',
                                click: function() {}
                            }
                        ],
                        viewType: 'DETAIL',
                        org: {
                            treeUrl: '',
                            dataRoot: yufp.session.org.code
                        },
                        userGrid: {
                            data: null,
                            total: null,
                            loading: true,
                            multipleSelection: [],
                            query: {
                                loginCode: '',
                                userName: '',
                                userCode: '',
                                userSts: ''
                            }
                        },
                        switchStatus: function(viewType, editable) {
                            this.viewType = viewType;
                            this.dialogVisible = true;
                            this.formDisabled = !editable;
                            this.updateButtons[0].hidden = !editable;
                            if (viewType == 'DETAIL') {
                                this.updateButtons[1].hidden = !editable;
                            }
                        },
                        dialogStatus: '',
                        formDisabled: false,
                        dialogFormVisible: false, // from弹窗
                        dialogGridVisible: false, // 编辑列表弹窗
                        dialogDisabled: true,
                        viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                        yourVal: '',
                        rawValue: '',
                        // 默认权限  add by chenlin2
                        authMap: {
                            'authTitle': '默认权限'
                        },
                        authDialogVisible: false,
                        authUrl: backend.appOcaService + '/api/adminsmrole/roleauth',
                        authTableColumns: [
                            { label: '模板名称', prop: 'authTmplName', width: 150 },
                            { label: '数据权限SQL条件', prop: 'sqlString', width: 300 },
                            { label: '最新变更用户', prop: 'userName', resizable: true },
                            {
                                label: '最新变更时间',
                                prop: 'lastChgDt',
                                type: 'date',
                                resizable: true,
                                formatter: function(row, me) {
                                    return row.lastChgDt.substring(0, 10);
                                }
                            }
                        ],
                        expandName: ['authAdd', 'authList'],
                        authAddUrl: '',
                        authAddColumns: [
                            { label: '模版名', prop: 'authTmplName', width: 150, sortable: true, resizable: true },
                            { label: '数据权限SQL条件', prop: 'sqlString', width: 300 },
                            { label: '最新变更用户', prop: 'lastChgUsr' },
                            { label: '最新变更时间', prop: 'lastChgDt' }
                        ]
                    };
                },

                filters: {
                    statusFilter: function(status) {
                        return stsKeyValue[status];
                    },
                    dateFilter: function(d) {
                        return parseTime(d, '{y}-{m}-{d}');
                    }
                },
                methods: {
                    queryMainGridFn: function() {
                        var me = this;
                        var param = {
                            condition: JSON.stringify({
                                orgId: this.mainGrid.query.orgId ? this.mainGrid.query.orgId : yufp.session.org.id,
                                roleCode: this.mainGrid.query.roleCode ? this.mainGrid.query.roleCode : null,
                                roleName: this.mainGrid.query.roleName ? this.mainGrid.query.roleName : null,
                                roleSts: this.mainGrid.query.roleSts ? this.mainGrid.query.roleSts : null,
                                orgType: this.mainGrid.query.orgType ? this.mainGrid.query.orgType : null
                            })
                        };
                        me.$refs.roletable.remoteData(param);
                        // 发起请求
                        yufp.service.request({
                            method: 'GET',
                            url: backend.appOcaService + '/api/adminsmrole/querypage',
                            data: param,
                            callback: function(code, message, response) {
                                me.mainGrid.data = response.data;
                                me.mainGrid.total = response.total;
                                me.mainGrid.loading = false;
                            }
                        });
                    },
                    // 点击树查询
                    nodeClickFn: function(node, obj, nodeComp) {
                        if (node != '') {
                            orgId = node.id;
                            this.nowNode = node;
                            this.mainGrid.query.orgId = node.orgCode;
                            this.mainGrid.query.orgType = node.orgType;
                            this.queryMainGridFn();
                        }
                    },
                    // 新增面板弹出
                    openCreateFn: function() {
                        this.userGrid.query.roleId = '';
                        this.dialogDisabled = false;
                        this.dialogFormVisible = true;
                        this.switchStatus('ADD', true);
                        this.$nextTick(function() {
                            this.$refs.roleForm.resetFields(); // 重置form
                            this.$refs.roleForm.formModel.roleSts = 'A';
                            this.$refs.roleForm.formModel.orgId = orgId;
                        });
                    },
                    updateRoleInfoFn: function(comitData) {
                        yufp.service.request({
                            method: 'POST',
                            url: backend.appOcaService + '/api/useraccountinfo/updateRoleInfo',
                            data: {
                                roleCode: comitData.roleCode
                            },
                            callback: function(code, message, response) {
                                console.log('调用成功');
                            }
                        });
                    },
                    // 保存方法
                    saveCreateFn: function() {
                        var me = this;
                        var roleForm = me.$refs.roleForm;
                        roleForm.validate(function(valid) {
                            var comitData = {};
                            if (roleForm.formModel.roleId == '' || typeof roleForm.formModel.roleId == 'undefined') {
                                // 新增时保存
                                delete roleForm.formModel.roleId;
                                if (valid) {
                                    yufp.service.request({
                                        method: 'GET',
                                        url: backend.appOcaService + '/api/adminsmrole/createcheckrolecode',
                                        data: {
                                            roleCode: roleForm.formModel.roleCode
                                        },
                                        callback: function(code, message, response) {
                                            if (response > 0) {
                                                me.$message({ message: '角色代码重复！', type: 'warning' });
                                            } else {
                                                yufp.extend(comitData, roleForm.formModel);
                                                comitData.roleCode = roleForm.formModel.roleCode;
                                                comitData.roleName = roleForm.formModel.roleName;
                                                comitData.orgId = roleForm.formModel.orgId;
                                                comitData.lastChgUsr = yufp.session.userId,
                                                    yufp.service.request({
                                                        method: 'POST',
                                                        url: backend.appOcaService + '/api/adminsmrole/createrole',
                                                        data: comitData,
                                                        callback: function(code, message, response) {
                                                            me.dialogFormVisible = false;
                                                            me.dialogVisible = false;
                                                            me.$message({ message: '数据保存成功！' });
                                                            yufp.util.butLogInfo(hashCode, '角色管理', '新增');
                                                            me.queryMainGridFn();
                                                            // 新增保存接口
                                                            me.updateRoleInfoFn(comitData);
                                                        }
                                                    });
                                            }
                                        }
                                    });
                                }
                            } else {
                                // 修改时保存
                                if (valid) {
                                    yufp.service.request({
                                        method: 'GET',
                                        url: backend.appOcaService + '/api/adminsmrole/editcheckrolecode',
                                        data: {
                                            roleCode: roleForm.formModel.roleCode,
                                            roleId: roleForm.formModel.roleId
                                        },
                                        callback: function(code, message, response) {
                                            if (response > 0) {
                                                me.$message({ message: '角色代码重复！', type: 'warning' });
                                            } else {
                                                yufp.extend(comitData, roleForm.formModel);
                                                comitData.roleCode = roleForm.formModel.roleCode;
                                                comitData.roleName = roleForm.formModel.roleName;
                                                comitData.orgId = roleForm.formModel.orgId;
                                                comitData.lastChgUsr = yufp.session.userId,
                                                    yufp.service.request({
                                                        method: 'POST',
                                                        url: backend.appOcaService + '/api/adminsmrole/editrole',
                                                        data: comitData,
                                                        callback: function(code, message, response) {
                                                            me.dialogFormVisible = false;
                                                            me.dialogVisible = false;
                                                            me.$message({ message: '数据保存成功！' });
                                                            yufp.util.butLogInfo(hashCode, '角色管理', '修改');
                                                            me.queryMainGridFn();
                                                            // 修改保存接口
                                                            me.updateRoleInfoFn(comitData);
                                                        }
                                                    });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    },
                    // 修改
                    modifyFn: function() { // 修改弹出方法
                        if (this.$refs.roletable.selections.length != 1) {
                            this.$message({ message: '请选择一条记录', type: 'warning' });
                            return;
                        }
                        if (this.$refs.roletable.selections[0].roleSts == 'A') {
                            this.$message({ message: '只能选择失效和待生效的数据', type: 'warning' });
                            return;
                        }
                        this.dialogFormVisible = true;
                        this.dialogDisabled = false;
                        this.dialogFormVisible = true;
                        this.switchStatus('EDIT', true);
                        this.$nextTick(function() {
                            yufp.extend(this.$refs.roleForm.formModel, this.$refs.roletable.selections[0]);
                        });
                    },
                    infoFn: function() { // 详情弹出方法
                        if (this.$refs.roletable.selections.length != 1) {
                            this.$message({ message: '请选择一条记录', type: 'warning' });
                            return;
                        }
                        this.dialogFormVisible = true;
                        this.dialogDisabled = false;
                        this.dialogFormVisible = true;
                        this.switchStatus('DETAIL', true);
                        this.$nextTick(function() {
                            yufp.extend(this.$refs.roleForm.formModel, this.$refs.roletable.selections[0]);
                        });
                    },
                    openEditFn: function(row) {
                        if (this.$refs.roletable.selections.length !== 1) {
                            this.$message({ message: '请选择一条数据!', type: 'warning' });
                            return false;
                        }
                        var row = this.$refs.roletable.selections[0];
                        if (row.roleSts === 'A') {
                            this.$message({ message: '只能选择停用和待启用的数据', type: 'warning' });
                            return;
                        }
                        this.dialogStatus = 'update';

                        this.dialogFormVisible = true;
                        this.formDisabled = false;
                        this.$nextTick(function() {
                            yufp.extend(this.$refs.myform.formModel, row);
                            yufp.extend(this.$refs.myform1.formModel, row);
                        });
                    },
                    // 启用方法
                    useFn: function() {
                        var vue = this;
                        if (this.$refs.roletable.selections.length > 0) {
                            var id = '';
                            var userId = yufp.session.userId;
                            for (var i = 0; i < this.$refs.roletable.selections.length; i++) {
                                var row = this.$refs.roletable.selections[i];
                                if (row.roleSts === 'W' || row.roleSts === 'I') {
                                    id = id + ',' + row.roleId;
                                } else {
                                    vue.$message({ message: '只能选择失效或待生效的数据', type: 'warning' });
                                    return;
                                }
                            }
                            this.$confirm('此操作将启用该角色, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                                center: true
                            }).then(function() {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.appOcaService + '/api/adminsmrole/usebatch',
                                    data: {
                                        id: id,
                                        userId: userId
                                    },
                                    callback: function(code, message, response) {
                                        vue.$message({ message: response.data });
                                        vue.queryMainGridFn();
                                        yufp.util.butLogInfo(hashCode, '角色管理', '启用');
                                    }
                                });
                            });
                        } else {
                            this.$message({ message: '请先选择要生效的数据', type: 'warning' });
                            return;
                        }
                    },
                    // 停用方法
                    unUseFn: function() { // 批量失效
                        var vue = this;
                        var userId = yufp.session.userId;
                        if (this.$refs.roletable.selections.length > 0) {
                            var id = '';
                            for (var i = 0; i < this.$refs.roletable.selections.length; i++) {
                                var row = this.$refs.roletable.selections[i];
                                if (row.roleSts === 'A') {
                                    id = id + ',' + row.roleId;
                                } else {
                                    this.$message({ message: '只能选择生效的数据', type: 'warning' });
                                    return;
                                }
                            }
                            this.$confirm('此操作将停用该角色, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                                center: true
                            }).then(function() {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.appOcaService + '/api/adminsmrole/unusebatch',
                                    data: {
                                        id: id,
                                        userId: userId
                                    },
                                    callback: function(code, message, response) {
                                        if (code == 0) {
                                            vue.$message({ message: response.data.message });
                                            vue.queryMainGridFn();
                                            yufp.util.butLogInfo(hashCode, '角色管理', '停用');
                                        }
                                    }
                                });
                            });
                        } else {
                            this.$message({ message: '请先选择要停用的数据', type: 'warning' });
                            return;
                        }
                    },
                    // 删除方法
                    deleteFn: function() {
                        var vue = this;
                        if (this.$refs.roletable.selections.length > 0) {
                            var id = '';
                            for (var i = 0; i < this.$refs.roletable.selections.length; i++) {
                                var row = this.$refs.roletable.selections[i];
                                if (row.roleSts != 'A') {
                                    if (i == 0) {
                                        id = row.roleId;
                                    } else {
                                        id = id + ',' + row.roleId;
                                    }
                                } else {
                                    this.$message({ message: '只能删除待生效或失效的数据', type: 'warning' });
                                    return;
                                }
                            }
                            this.$confirm('此操作将删除该角色信息, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                                center: true
                            }).then(function() {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.appOcaService + '/api/adminsmrole/deletebatch',
                                    data: {
                                        ids: id
                                    },
                                    callback: function(code, message, response) {
                                        if (code == '0' && response.code == 0) {
                                            vue.$message({ message: response.data.message });
                                            vue.queryMainGridFn();
                                            yufp.util.butLogInfo(hashCode, '角色管理', '删除');
                                        }
                                    }
                                });
                            }).catch(function() {
                                return;
                            });
                        } else {
                            this.$message({ message: '请先选择要删除的数据', type: 'warning' });
                            return;
                        }
                    },
                    // //角色用户
                    openRoleUserFn: function() {
                        if (this.$refs.roletable.selections.length != 1) {
                            this.$message({ message: '请先选择一条记录', type: 'warning' });
                            return;
                        }
                        var roleId = this.$refs.roletable.selections.roleId;
                        this.dialogDisabled = false;
                        this.dialogStatus = 'roleUser';
                        this.dialogGridVisible = true;
                        this.queryUserGridFn();
                    },
                    queryUserGridFn: function() {
                        var me = this;
                        this.$nextTick(function() {
                            var param = {
                                condition: JSON.stringify({
                                    loginCode: me.$refs.userQuery.fm.loginCode ? me.$refs.userQuery.fm.loginCode : null,
                                    userName: me.$refs.userQuery.fm.userName ? me.$refs.userQuery.fm.userName : null,
                                    userCode: me.$refs.userQuery.fm.userCode ? me.$refs.userQuery.fm.userCode : null,
                                    userSts: me.$refs.userQuery.fm.userSts ? me.$refs.userQuery.fm.userSts : null,
                                    roleId: me.$refs.roletable.selections[0].roleId
                                })
                            };
                            me.$refs.userTable.remoteData(param);
                        });
                    },

                    // 默认权限 begin  add by chenlin
                    openRoleAuthFn: function() { // 打开默认权限页面
                        if (this.$refs.roletable.selections.length != 1) {
                            this.$message({ message: '请先选择一条记录', type: 'warning' });
                            return;
                        }
                        this.dialogDisabled = false;
                        this.dialogStatus = 'authTitle';
                        this.authDialogVisible = true;
                        this.queryUserAuthFn();
                        this.$nextTick(function() {
                            this.$refs.authAddTable.data = '';
                            this.$refs.demoSelector.selectedVal = '';
                        });
                    },
                    queryUserAuthFn: function() { // 查询默认权限
                        var me = this;
                        this.$nextTick(function() {
                            var param = {
                                condition: JSON.stringify({
                                    roleId: me.$refs.roletable.selections[0].roleId ? me.$refs.roletable.selections[0].roleId : null
                                })
                            };
                            me.$refs.authTable.remoteData(param);
                        });
                    },
                    // 选择数据加入待确认列表
                    selectFn: function(a, b) {
                        var authAddList = [];
                        authAddList.push({

                            authTmplName: b.authTmplName,
                            sqlString: b.sqlString,
                            lastChgUsr: b.lastChgUsr,
                            lastChgDt: b.lastChgDt
                        });
                        this.$refs.authAddTable.data = authAddList;
                    },
                    saveUserAuth: function() { // 保存、修改默认权限
                        if (this.yourVal == '') {
                            this.$message({ message: '请先选择权限模板！', type: 'warning' });
                            return;
                        }
                        var vue = this;
                        var length = this.$refs.authTable.data.length;
                        var params = {
                            sysId: yufp.session.logicSys.id, // 逻辑系统id
                            lastChgUsr: yufp.session.userId, // 用户id
                            authobjId: this.$refs.roletable.selections[0].roleId, // 角色id
                            authresId: this.yourVal // 模板id
                        };
                        if (length > 0) {
                            vue.$confirm('此操作将使待确认模板替换默认模板,是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                                center: true
                            }).then(function() {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.appOcaService + '/api/adminsmrole/updateroleauth',
                                    data: {
                                        authId: vue.$refs.authTable.data[0].authId,
                                        userId: yufp.session.userId, // 用户id
                                        authTmplId: vue.yourVal // 模板id
                                    },
                                    callback: function(code, message, response) {
                                        vue.$message({ message: '默认权限设置修改成功！' });
                                        yufp.util.butLogInfo(hashCode, '角色管理', '保存默认权限设置');
                                        vue.authDialogVisible = false;
                                        vue.dialogVisible = false;
                                        vue.$refs.authAddTable.data = '';
                                        vue.$refs.demoSelector.selectedVal = '';
                                        vue.queryMainGridFn();
                                    }
                                });
                            }).catch(function() {
                                return;
                            });
                        } else {
                            yufp.service.request({
                                method: 'POST',
                                url: backend.appOcaService + '/api/adminsmrole/saveroleauth',
                                data: params,
                                callback: function(code, message, response) {
                                    vue.$message({ message: '默认权限设置新增成功！' });
                                    yufp.util.butLogInfo(hashCode, '角色管理', '保存默认权限设置');
                                    vue.authDialogVisible = false;
                                    vue.dialogVisible = false;
                                    vue.$refs.authAddTable.data = '';
                                    vue.$refs.demoSelector.selectedVal = '';
                                    vue.queryMainGridFn();
                                }
                            });
                        }
                    },
                    // 取消选择
                    selectCancel: function() {
                        this.$refs.authAddTable.data = '';
                        this.$refs.demoSelector.selectedVal = '';
                    },
                    cleanAuthFn: function() {
                            var vue = this;
                            vue.$confirm('此操作将清除默认权限, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                                center: true
                            }).then(function() {
                                yufp.service.request({
                                    method: 'GET',
                                    url: backend.appOcaService + '/api/adminsmrole/cleanroleauth',
                                    data: {
                                        authId: vue.$refs.authTable.data[0].authId
                                    },
                                    callback: function(code, message, response) {
                                        vue.yourVal = '';
                                        vue.queryUserAuthFn();
                                        vue.$message({ message: '默认权限设置修改成功！' });
                                        yufp.util.butLogInfo(hashCode, '角色管理', '清除默认权限设置');
                                    }
                                });
                            });
                        }
                        // 默认权限 end
                }
            });
        };
    });