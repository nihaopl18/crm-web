/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-2-13 10:12:53.
 * @updated by
 * @description 客户经理团队管理
 */
define(['custom/widgets/js/YufpUserSelector.js'], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    orgIdAuth:  yufp.session.org.id,
                    dataUrl: backend.custmgrgroupService + '/api/ocrmfcmmktteam/querylist',
                    formdata: {},
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    saveBtnShow: true,
                    // 团队负责人传参
                    teamParam: {
                        org: {
                            dataParams: {
                                orgCode: yufp.session.org.code
                            }
                        },
                        user: {
                            dataParams: {
                                orgCode: yufp.session.org.code
                            }
                        }
                    },
                    addBtn: !yufp.session.checkCtrl('add'),
                    editBtn: !yufp.session.checkCtrl('edit'),
                    deleteBtn: !yufp.session.checkCtrl('delete'),
                    viewBtn: !yufp.session.checkCtrl('view'),
                    rule: {
                        mktTeamName: [
                            { max: 90, message: '最大长度不超过90个字符', trigger: 'blur' },
                            { required: true, message: '字段不能为空', trigger: 'blur' }
                        ],
                        orgId: [
                            { max: 30, message: '最大长度不超过30个字符', trigger: 'blur' },
                            { required: true, message: '字段不能为空', trigger: 'blur' }
                        ],
                        teamType: [
                            { max: 13, message: '最大长度不超过13个字符', trigger: 'blur' },
                            { required: true, message: '字段不能为空', trigger: 'blur' }
                        ],
                        teamLeaderId: [
                            { max: 32, message: '最大长度不超过32个字符', trigger: 'blur' },
                            { required: true, message: '字段不能为空', trigger: 'blur' }
                        ]
                    },
                    btnType: ''
                };
            },
            methods: {
                /**
                 * 归属机构选择
                 */
                orgSelectFn: function(data) {
                    this.formdata.orgName = data.orgName;
                    this.teamParam.org.dataParams.orgCode = data.orgId;
                    this.teamParam.user.dataParams.orgCode = data.orgId;
                },
                /**
                 * 用户选择
                 */
                userSelectFn: function(data) {
                    this.formdata.teamLeader = data[0].userName;
                },
                /**
                 * 取消
                 */
                cancelFn: function() {
                    var _this = this;
                    _this.dialogVisible = false;
                },
                /**
                 * 保存
                 */
                saveFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.formdata, model);
                    var validate = false;
                    _this.$refs.refForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    _this.$confirm('是否确认保存?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                // 向后台发送保存请求
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.custmgrgroupService + '/api/ocrmfcmmktteam/saveorupdate',
                                    data: model,
                                    callback: function(code, message, response) {
                                        _this.$refs.refTable.remoteData();
                                        _this.$message('操作成功');
                                        _this.dialogVisible = false;
                                        if (_this.btnType == '新增') {
                                            yufp.util.butLogInfo(hashCode, '客户经理团队', '新增');
                                        }
                                        if (_this.btnType == '修改') {
                                            yufp.util.butLogInfo(hashCode, '客户经理团队', '修改');
                                        }
                                    }
                                });
                            }
                        }
                    });
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
                },
                /**
                 * 新增按钮
                 */
                addFn: function() {
                    var _this = this;
                    _this.btnType = '新增';
                    _this.switchStatus('ADD', true);
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
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
                    if (_this.$refs.refTable.selections[0].createUserId != yufp.session.userCode) {
                        _this.$message({ message: '非创建者不允许执行该操作', type: 'warning' });
                        return;
                    }
                    _this.btnType = '修改';
                    _this.switchStatus('EDIT', true);
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        var obj = _this.$refs.refTable.selections[0];
                        yufp.clone(obj, _this.formdata);
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
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        yufp.clone(selectionsAry[0], this.formdata);
                    });
                },
                /**
                 * 删除
                 */
                deleteFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请选择一条记录', type: 'warning' });
                        return;
                    }
                    if (_this.$refs.refTable.selections[0].createUserId != yufp.session.userCode) {
                        _this.$message({ message: '非创建者不允许执行该操作', type: 'warning' });
                        return;
                    }
                    var data = _this.$refs.refTable.selections[0];
                    _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.custmgrgroupService + '/api/ocrmfcmmktteam/remove/' + data.mktTeamId,
                                    data: {},
                                    callback: function(code, message, response) {
                                        _this.$refs.refTable.remoteData();
                                        _this.$message('操作成功');
                                        yufp.util.butLogInfo(hashCode, '客户经理团队', '删除');
                                    }
                                });
                            }
                        }
                    });
                },
                openview: function() {
                    var _this = this;
                    var obj = _this.$refs.refTable.selections[0];
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var custMgr = 'custMgr_view' + selections[0].mktTeamId;
                    yufp.frame.addTab({
                        id: 'custManagerGroupView', // 菜单功能ID（路由ID）
                        key: custMgr, // 自定义唯一页签key
                        title: '客户经理团队视图: ' + obj.mktTeamName, // 页签名称
                        data: { id: '2aef4f4c1c214c6f91839b0cdfaadad2', mktTeamId: obj.mktTeamId, createUserId: obj.createUserId }
                    });
                    // 刷新方法
                    yufp.frame.refreshTab({
                        routeId: 'custManagerGroupView', // 对公, // 菜单功能ID（路由ID）
                        menuId: custMgr, // 菜单ID，同addTab方法中的key
                        title: '客户经理团队视图:' + obj.mktTeamName, // 页签名称
                        data: { id: '2aef4f4c1c214c6f91839b0cdfaadad2', mktTeamId: obj.mktTeamId, createUserId: obj.createUserId }
                    });
                },
                rowDblClick: function(row, event) {
                    var custMgr = 'custMgr_view' + row.mktTeamId;
                    yufp.frame.addTab({
                        id: 'custManagerGroupView', // 菜单功能ID（路由ID）
                        key: custMgr, // 自定义唯一页签key
                        title: '客户经理团队视图: ' + row.mktTeamName, // 页签名称
                        data: { id: '2aef4f4c1c214c6f91839b0cdfaadad2', mktTeamId: row.mktTeamId, createUserId: row.createUserId }
                    });
                    // 刷新方法
                    yufp.frame.refreshTab({
                        routeId: 'custManagerGroupView', // 对公, // 菜单功能ID（路由ID）
                        menuId: custMgr, // 菜单ID，同addTab方法中的key
                        title: '客户经理团队视图:' + row.mktTeamName, // 页签名称
                        data: { id: '2aef4f4c1c214c6f91839b0cdfaadad2', mktTeamId: row.mktTeamId, createUserId: row.createUserId }
                    });
                }
            }
        });
    };
});