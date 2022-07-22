/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-16
 * @updated by
 * @description 视图控制点管理
 */
define([
    './custom/widgets/js/yufpExtTree.js'
], function(require, exports) {
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('HTTP_METHOD_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                var me = this;
                return {
                    height: yufp.custom.viewSize().height - 20,
                    viewType: 'DETAIL',
                    isChildNode: false,
                    viewItemId: '',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    formDisabled: false,
                    dialogVisible: false,
                    // createCheck: !yufp.session.checkCtrl('add'), // 新增按钮控制
                    // modifyCheck: !yufp.session.checkCtrl('modify'), // 修改按钮控制
                    // deleteCheck: !yufp.session.checkCtrl('delete'), // 删除按钮控制
                    treeUrl: backend.adminService + '/api/ocrmfsysviewcontr/treequery',
                    contrDataUrl: backend.adminService + '/api/ocrmfsysviewcontr/getcontrinfo',
                    pointQueryFields: [
                        { placeholder: '控制操作名称', field: 'contrName', type: 'input' },
                        { placeholder: '控制操作代码', field: 'contrCode', type: 'input' },
                        { placeholder: '控制操作URL', field: 'contrUrl', type: 'input' }
                    ],
                    pointQueryButtons: [{
                            label: '查询',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            click: function(model, valid) {
                                if (valid) {
                                    var param = { condition: JSON.stringify(model) };
                                    me.$refs.pointTable.remoteData(param);
                                }
                            }
                        },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],
                    pointTableColumns: [{
                            label: '控制操作名称',
                            prop: 'contrName',
                            width: 120,
                            sortable: true,
                            resizable: true,
                            template: function() {
                                return '<template scope="scope">\
                                 <a onclick="return false;" href="javascipt:void(0);" style="text-decoration:underline;" @click="_$event(\'custom-row-click\', scope)">{{ scope.row.contrName }}</a>\
                             </template>';
                            }
                        },
                        { label: '控制操作代码', prop: 'contrCode', width: 150, sortable: true, resizable: true },
                        { label: '控制操作URL', prop: 'contrUrl', sortable: true, resizable: true, showOverflowTooltip: true },
                        { label: '请求类型', prop: 'methodType', width: 100, sortable: true, resizable: true, dataCode: 'HTTP_METHOD_TYPE' },
                        { label: '最近变更用户', prop: 'lastChgUsr', width: 120, sortable: true, resizable: true },
                        { label: '最近变更时间', prop: 'lastChgDt', width: 120, sortable: true, resizable: true }
                    ],
                    pointFields: [{
                        columnCount: 2,
                        fields: [{
                                field: 'contrName',
                                label: '控制操作名称',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' },
                                    { max: 90, message: '输入值过长', trigger: 'blur' },
                                    { validator: yufp.validator.speChar, message: '输入信息包含特殊字符', trigger: 'blur' }
                                ]
                            },
                            {
                                field: 'contrCode',
                                label: '控制操作代码',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' },
                                    { max: 45, message: '输入值过长', trigger: 'blur' },
                                    { validator: yufp.validator.speChar, message: '输入信息包含特殊字符', trigger: 'blur' }
                                ]
                            },
                            { field: 'lastChgUsr', label: '最近更新人', hidden: true }
                            // {field: 'lastChgDt', label: '最近更新时间', hidden: true}
                        ]
                    }, {
                        columnCount: 2,
                        fields: [{
                                field: 'contrUrl',
                                label: '控制操作URL',
                                rules: [
                                    { max: 50, message: '输入值过长', trigger: 'blur' }
                                ],
                                placeholder: '例如: /api/...'
                            },
                            { field: 'methodType', label: '请求类型', type: 'select', dataCode: 'HTTP_METHOD_TYPE' }
                        ]
                    }, {
                        columnCount: 1,
                        fields: [
                            { field: 'contrRemark', label: '备注', type: 'textarea', rows: 3, rules: [{ max: 450, message: '输入值过长', trigger: 'blur' }] }
                        ]
                    }],
                    pointFormButtons: [{
                            label: '取消',
                            type: 'primary',
                            icon: 'yx-undo2',
                            hidden: false,
                            click: function(model) {
                                me.dialogVisible = false;
                            }
                        },
                        {
                            label: '保存',
                            type: 'primary',
                            icon: 'check',
                            hidden: false,
                            op: 'submit',
                            click: function(model) {
                                me.saveCreateFn();
                            }
                        },
                        {
                            label: '保存',
                            type: 'primary',
                            icon: 'check',
                            hidden: false,
                            op: 'submit',
                            click: function(model) {
                                me.saveEditFn();
                            }
                        }

                    ]
                };
            },
            methods: {
                // 左侧树节点点击事件,点击业务功能节点查询关联控制点
                nodeClickFn: function(nodeData, node, self) {
                    var _this = this;
                    _this.isChildNode = false;
                    if (nodeData && nodeData.nodeType == 'F') {
                        _this.isChildNode = true;
                    }
                    _this.viewItemId = nodeData.nodeId;
                    var param = {
                        condition: JSON.stringify({
                            viewItemId: _this.viewItemId ? _this.viewItemId : null
                        })
                    };
                    _this.$refs.pointTable.remoteData(param);
                },
                // 操作状态选择
                switchStatus: function(viewType, editable) {
                    this.viewType = viewType;
                    this.dialogVisible = true;
                    this.formDisabled = !editable;
                    this.pointFormButtons[2].hidden = !editable;
                    if (viewType == 'ADD') {
                        this.pointFormButtons[0].hidden = !editable;
                        this.pointFormButtons[1].hidden = editable;
                    } else if (viewType == 'EDIT') {
                        this.pointFormButtons[0].hidden = editable;
                        this.pointFormButtons[1].hidden = !editable;
                    } else if (viewType == 'DETAIL') {
                        this.pointFormButtons[0].hidden = !editable;
                        this.pointFormButtons[1].hidden = !editable;
                    }
                },
                // 不同状态最近更新人与时间字段显示控制
                hiddenSwitch: function(viewType, isHidden) {
                    this.viewType = viewType;
                    // var fields = this.pointFields[0].fields;
                    // fields[2].hidden = !isHidden;
                    // fields[3].hidden = !isHidden;
                },
                // 控制点新增
                pointAddFn: function() {
                    if (this.isChildNode == false) {
                        this.$message({ message: '请先选择视图项节点', type: 'warning' });
                        return;
                    }
                    this.switchStatus('ADD', true);
                    this.$refs.pointTable.clearSelection();
                    this.hiddenSwitch('ADD', false);
                    this.$nextTick(function() {
                        this.$refs.pointForm.resetFn();
                    });
                },
                /**
                 * 控制点新增——保存
                 */
                saveCreateFn: function() {
                    var _this = this;
                    delete _this.$refs.pointForm.formModel.controlId;
                    _this.$refs.pointForm.validate(function(valid) {
                        if (valid) {
                            _this.$refs.pointForm.formModel.lastChgUsr = yufp.session.userCode;
                            _this.$refs.pointForm.formModel.viewItemId = _this.viewItemId;
                            yufp.service.request({
                                method: 'GET',
                                url: backend.adminService + '/api/ocrmfsysviewcontr/ifcoderepeat',
                                data: {
                                    viewItemId: _this.$refs.pointForm.formModel.viewItemId ? _this.$refs.pointForm.formModel.viewItemId : null,
                                    contrCode: _this.$refs.pointForm.formModel.contrCode ? _this.$refs.pointForm.formModel.contrCode : null
                                },
                                callback: function(code, message, response) {
                                    if (response.data.length > 0) {
                                        _this.$message({
                                            message: '此视图项已包含该控制操作代码',
                                            type: 'warning'
                                        });
                                    } else {
                                        yufp.service.request({
                                            method: 'POST',
                                            url: backend.adminService + '/api/ocrmfsysviewcontr/createcontr',
                                            data: _this.$refs.pointForm.formModel,
                                            callback: function(code, message, response) {
                                                if (code == '0' && response.code == 0) {
                                                    _this.dialogVisible = false;
                                                    _this.$message({ message: '数据保存成功！' });
                                                    var param = {
                                                        condition: JSON.stringify({
                                                            viewItemId: _this.viewItemId ? _this.viewItemId : null
                                                        })
                                                    };
                                                    _this.$refs.pointTable.remoteData(param);
                                                    yufp.util.butLogInfo(hashCode, '视图控制点管理', '新增');
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            _this.$message({ message: '请检查输入项是否合法', type: 'warning' });
                            return false;
                        }
                    });
                },
                /**
                 * 控制点修改
                 */
                modifyFn: function() {
                    if (this.$refs.pointTable.selections.length != 1) {
                        this.$message({ message: '请选择一条记录', type: 'warning' });
                        return;
                    }
                    this.switchStatus('EDIT', true);
                    this.hiddenSwitch('EDIT', false);
                    this.$nextTick(function() {
                        this.$refs.pointForm.resetFn();
                        yufp.extend(this.$refs.pointForm.formModel, this.$refs.pointTable.selections[0]);
                    });
                },
                /**
                 * 控制点修改——保存
                 */
                saveEditFn: function() {
                    var _this = this;
                    _this.$refs.pointForm.validate(function(valid) {
                        if (valid) {
                            _this.$refs.pointForm.formModel.lastChgUsr = yufp.session.userCode;
                            yufp.service.request({
                                method: 'GET',
                                url: backend.adminService + '/api/ocrmfsysviewcontr/ifcoderepeat',
                                data: {
                                    viewItemId: _this.$refs.pointForm.formModel.viewItemId ? _this.$refs.pointForm.formModel.viewItemId : null,
                                    contrCode: _this.$refs.pointForm.formModel.contrCode ? _this.$refs.pointForm.formModel.contrCode : null,
                                    contrId: _this.$refs.pointForm.formModel.contrId ? _this.$refs.pointForm.formModel.contrId : null
                                },
                                callback: function(code, message, response) {
                                    if (response.data.length > 0) {
                                        _this.$message({
                                            message: '此视图项已包含该控制操作代码',
                                            type: 'warning'
                                        });
                                    } else {
                                        yufp.service.request({
                                            method: 'POST',
                                            url: backend.adminService + '/api/ocrmfsysviewcontr/editcontr',
                                            data: _this.$refs.pointForm.formModel,
                                            callback: function(code, message, response) {
                                                if (code == '0' && response.code == 0) {
                                                    _this.dialogVisible = false;
                                                    _this.$message({ message: '数据保存成功！' });
                                                    var param = {
                                                        condition: JSON.stringify({
                                                            viewItemId: _this.viewItemId ? _this.viewItemId : null
                                                        })
                                                    };
                                                    _this.$refs.pointTable.remoteData(param);
                                                    yufp.util.butLogInfo(hashCode, '视图控制点管理', '修改');
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            _this.$message({ message: '请检查输入项是否合法', type: 'warning' });
                            return false;
                        }
                    });
                },
                // 点击控制操作名称列查看控制点详情
                rowClick: function(scope) {
                    this.switchStatus('DETAIL', false);
                    this.hiddenSwitch('DETAIL', true);
                    this.$nextTick(function() {
                        this.$refs.pointForm.resetFn();
                        yufp.extend(true, this.$refs.pointForm.formModel, scope.row);
                    });
                },
                // 左侧树节点类型图标
                renderContent: function() {
                    var createElement = arguments[0];
                    var type = arguments[1].data.nodeType;
                    return createElement('span', [
                        createElement('span', { attrs: { class: 'yu-treeMenuType' + type } }, type),
                        createElement('span', arguments[1].node.label)
                    ]);
                },
                // 控制点删除,删除前先判断是否有关联数据权限信息,如有不能进行删除
                pointDeleteFn: function() {
                    if (this.$refs.pointTable.selections.length < 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var _this = this;
                    var selections = _this.$refs.pointTable.selections;
                    if (selections) {
                        var arr = [];
                        for (var i = 0, len = selections.length; i < len; i++) {
                            arr.push(selections[i].contrId);
                        }
                        _this.$confirm('删除控制点将删除其数据权限及授权数据,确定删除?', '提示', {
                            type: 'warning',
                            callback: function(action) {
                                if (action === 'confirm') {
                                    yufp.service.request({
                                        method: 'POST',
                                        url: backend.adminService + '/api/ocrmfsysviewcontr/deletecontr/' + arr.join(','),
                                        // data: arr.join(','),
                                        callback: function(code, message, response) {
                                            if (code == '0' && response.code == 0) {
                                                _this.$message({ message: '数据删除成功！' });
                                                var param = {
                                                    condition: JSON.stringify({
                                                        viewItemId: _this.viewItemId ? _this.viewItemId : null
                                                    })
                                                };
                                                _this.$refs.pointTable.remoteData(param);
                                                yufp.util.butLogInfo(hashCode, '视图控制点管理', '删除');
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }
        });
    };
});