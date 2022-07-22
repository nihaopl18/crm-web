define(function(require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('MESSAGE_WARN');
        yufp.lookup.reg('TEMPLATE_TYPE');
        yufp.custom.vue({
            el: '#messagetemplate',
            data: function() {
                var me = this;
                return {
                    height: yufp.custom.viewSize().height,
                    channelType: '',
                    messageType: '',
                    templateType: '',
                    form0: {
                        messageType: '',
                        messageLevel: '',
                        templateType: '',
                        messageDesc: ''
                    },
                    editVisible: false,
                    isTimes: ['0', '1'],
                    isTimesMap: {
                        0: '否',
                        1: '是'
                    },
                    form: {
                        sendNum: '',
                        templateContent: '',
                        emailTitle: '',
                        timeStart: '',
                        timeEnd: '',
                        messageType: '',
                        channelType: '',
                        templateType: '',
                        isTime: '0'
                    },
                    rules: {
                        sendNum: [
                            { required: true, type: 'number', message: '请输入异常重发次数', trigger: 'blur' }
                        ],
                        templateContent: [
                            { required: true, message: '请输入模板内容', trigger: 'blur' }
                        ],
                        timeEnd: [
                            { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
                        ]
                    },
                    rules0: {
                        messageType: [
                            { required: true, message: '必填项', trigger: 'blur' }, { max: 32, message: '最大长度不超过32个字符', trigger: 'blur' }
                        ],
                        messageLevel: [
                            { required: true, message: '必填项', trigger: 'blur' }
                        ],
                        templateType: [
                            { required: true, message: '必填项', trigger: 'blur' }
                        ],
                        messageDesc: [
                            { required: true, message: '必填项', trigger: 'blur' }, { max: 50, message: '最大长度不超过50个中文字符', trigger: 'blur' }
                        ]
                    },
                    updateFields: [{
                            columnCount: 2,
                            fields: [
                                { field: 'messageType', label: '消息类型', type: 'input', hidden: false, rules: [{ required: true, message: '必填项', trigger: 'blur' }, { max: 32, message: '最大长度不超过50个字符', trigger: 'blur' }] },
                                { field: 'messageLevel', label: '消息等级', type: 'select', dataCode: 'MESSAGE_WARN', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
                                { field: 'templateType', label: '模板类型', type: 'select', dataCode: 'TEMPLATE_TYPE', rules: [{ required: true, message: '必填项', trigger: 'blur' }] }
                            ]
                        },
                        {
                            columnCount: 1,
                            fields: [{ field: 'messageDesc', label: '描述', type: 'input', rules: [{ required: true, message: '必填项', trigger: 'blur' }, { max: 50, message: '最大长度不超过50个中文字符', trigger: 'blur' }] }]
                        }
                    ],
                    tableColumns: [
                        { label: '消息类型', prop: 'messageType', resizable: true },
                        { label: '描述', prop: 'messageDesc', resizable: true },
                        { label: '消息等级', prop: 'messageLevel', resizable: true, type: 'select', dataCode: 'MESSAGE_WARN' },
                        { label: '类型', prop: 'templateType', resizable: true, type: 'select', dataCode: 'TEMPLATE_TYPE' },
                        {
                            label: '模板编辑',
                            prop: 'channelType',
                            template: function() {
                                return '<template scope="scope">\
                           <el-button size="small" :type="scope.row.channelType.indexOf(\'system\')!=-1 ? \'success\' : \'danger\'" @click="$emit(\'custom-row-op\', scope, \'system\')">系统</el-button>\
                           <el-button size="small" :type="scope.row.channelType.indexOf(\'email\')!=-1 ? \'success\' : \'danger\'" @click="$emit(\'custom-row-op\', scope, \'email\')">邮件</el-button>\
                           <el-button size="small" :type="scope.row.channelType.indexOf(\'mobile\')!=-1 ? \'success\' : \'danger\'" @click="$emit(\'custom-row-op\', scope, \'mobile\')">短信</el-button>\
                        </template>';
                            }
                        }
                    ],
                    urls: {
                        dataUrl: backend.messageService + '/api/template/getMessageTypeList/',
                        createSaveUrl: backend.messageService + '/api/template/addMessageType/',
                        editUrl: backend.messageService + '/api/template/editMessageType/',
                        deleteUrl: backend.messageService + '/api/template/deleteMessageType/',
                        saveTemplateUrl: backend.messageService + '/api/template/addOrUpdateTemplate/',
                        deleteTemplateUrl: backend.messageService + '/api/template/deleteTemplate/',
                        getTemplateInfoUrl: backend.messageService + '/api/template/getTemplateInfo/',
                        sendMessageUrl: backend.messageService + '/api/template/sendMessageTest/'
                    },
                    editUrl: '',
                    textMap: {
                        creat: '新增'
                    },
                    queryButtons: [{
                            label: '搜索',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            show: true,
                            click: function(model, valid) {
                                if (valid) {
                                    var param = {
                                        condition: JSON.stringify(model)
                                    };
                                    me.$refs.messagetemplateTable.remoteData(param);
                                }
                            }
                        },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
                    ],
                    queryFields: [
                        { placeholder: '类型', field: 'templateType', type: 'select', dataCode: 'TEMPLATE_TYPE' },
                        { placeholder: '描述', field: 'messageDesc', type: 'input' }
                    ],
                    dialogVisible: false,
                    templateDialogVisible: false,
                    formDisabled: false,
                    timeVisible: true,
                    emailVisible: true,
                    messageButtons: [{
                            label: '取消',
                            type: 'primary',
                            icon: 'yx-undo2',
                            hidden: false,
                            click: function(model) {
                                me.dialogVisible = false;
                                me.$refs.messagetemplateForm.resetFields();
                            }
                        },
                        {
                            label: '保存',
                            type: 'primary',
                            icon: 'check',
                            hidden: false,
                            op: 'submit',
                            click: function(model, valid) {
                                if (valid) {
                                    me.saveOp();
                                }
                            }
                        }
                    ],
                    formLabelWidth: '120px'
                };
            },
            methods: {
                cleanform0: function() {
                    this.form0 = {
                        messageType: '',
                        messageLevel: '',
                        templateType: '',
                        messageDesc: ''
                    };
                },
                cleanform: function() {
                    this.form = {
                        sendNum: '',
                        templateContent: '',
                        emailTitle: '',
                        timeStart: '',
                        timeEnd: '',
                        messageType: '',
                        channelType: '',
                        templateType: ''
                    };
                },
                beforeClose: function() {
                    this.cleanform();
                },
                beforeClose0: function() {
                    this.cleanform0();
                },
                openCreateFn: function() { // 打开新增页面
                    this.dialogVisible = true;
                    this.editUrl = this.urls.createSaveUrl;
                    this.cleanform0();
                    this.editVisible = false;
                },
                saveOp: function() { // 保存新增
                    var me = this;
                    var myform = me.$refs['form0'];
                    myform.validate(function(valid) {
                        if (valid) {
                            var comitData = me.form0;
                            var saveUrl = me.urls.saveTemplateUrl;
                            yufp.service.request({
                                url: me.editUrl,
                                method: 'post',
                                data: comitData,
                                callback: function(code, message, response) {
                                    if (response.data == 0) {
                                        me.$message({ message: '保存成功!' });
                                        me.dialogVisible = false;
                                        me.cleanform0();
                                        // 刷新表格
                                        me.$refs.messagetemplateTable.remoteData();
                                        yufp.util.butLogInfo(hashCode, '消息模板', '新增');
                                    } else {
                                        me.$message({ message: '保存失败,消息标识已存在!' });
                                    }
                                }
                            });
                        } else {
                            me.$message({ message: '请检查输入项是否合法', type: 'warning' });
                            return false;
                        }
                    });
                },
                editOp: function() {
                    var me = this;
                    if (this.$refs.messagetemplateTable.selections.length == 1) {
                        var row = this.$refs.messagetemplateTable.selections[0];
                        var id = row.messageType;
                        this.dialogVisible = true;
                        this.editUrl = this.urls.editUrl;
                        me.$nextTick(function() {
                            me.cleanform0();
                            me.form0 = row;
                            me.editVisible = true;
                        });
                    } else {
                        this.$message({ message: '请先选择一条数据', type: 'warning' });
                        return false;
                    }
                },
                deleteOp: function() { // 删除
                    if (this.$refs.messagetemplateTable.selections.length > 0) {
                        var row = this.$refs.messagetemplateTable.selections[0];
                        var id = row.messageType;
                        var me = this;
                        this.$confirm('您确定需要删除记录吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(function() {
                            yufp.service.request({
                                method: 'POST',
                                url: me.urls.deleteUrl + id,
                                callback: function(code, message, response) {
                                    if (response.data) {
                                        me.$message({ message: '删除成功', type: 'success' });
                                        me.$refs.messagetemplateTable.remoteData();
                                        yufp.util.butLogInfo(hashCode, '消息模板', '删除');
                                    } else {
                                        me.$message({ message: '删除失败', type: 'error' });
                                    }
                                }
                            });
                        });
                    } else {
                        this.$message({ message: '请先选择要删除的数据', type: 'warning' });
                        return false;
                    }
                },
                customRowOp: function(scope, op) {
                    this.openTemplateDialog(scope.row.messageType, scope.row.templateType, op); // 打开弹框
                },
                open: function() { // 模板编辑dialog打开前触发
                    this.form = {};
                    this.getTemplateInfo(this.messageType, this.channelType);
                },
                openTemplateDialog: function(messageType, templateType, channelType) { // 打开模板编辑页面
                    this.templateDialogVisible = true;
                    this.emailVisible = true;
                    if (channelType == 'mobile') {
                        this.emailVisible = false;
                    } else {
                        this.emailVisible = true;
                    }
                    this.messageType = messageType;
                    this.channelType = channelType;
                    this.templateType = templateType;
                },
                saveTemplate: function() {
                    var me = this;
                    var myform = me.$refs['form'];
                    me.form.messageType = this.messageType;
                    me.form.channelType = this.channelType;
                    me.form.templateType = this.templateType;
                    myform.validate(function(valid) {
                        if (valid) {
                            var comitData = me.form;
                            var saveUrl = me.urls.saveTemplateUrl;
                            yufp.service.request({
                                url: saveUrl,
                                data: comitData,
                                method: 'POST',
                                callback: function(code, message, response) {
                                    if (response.data == 1) {
                                        me.templateDialogVisible = false;
                                        me.$message({ message: '成功', type: 'success' });
                                        me.$refs.messagetemplateTable.remoteData();
                                        yufp.util.butLogInfo(hashCode, '消息模板', '保存模板');
                                    } else {
                                        me.$message({ message: '失败', type: 'error' });
                                    }
                                    this.messageType = '';
                                    this.channelType = '';
                                    this.templateType = '';
                                }
                            });
                        } else {
                            me.$message({ message: '请检查输入项是否合法', type: 'warning' });
                            return false;
                        }
                    });
                },
                deleteTemplate: function() { // 删除模板
                    var me = this;
                    this.$confirm('您确定需要删除记录吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(function() {
                        var comitData = { messageType: me.messageType, channelType: me.channelType };
                        yufp.service.request({
                            method: 'POST',
                            url: me.urls.deleteTemplateUrl,
                            data: comitData,
                            callback: function(code, message, response) {
                                if (response.data === 1) {
                                    me.$message({ message: '删除成功', type: 'success' });
                                    me.$refs.messagetemplateTable.remoteData();
                                    me.templateDialogVisible = false;
                                    yufp.util.butLogInfo(hashCode, '消息模板', '删除模板');
                                } else {
                                    me.$message({ message: '删除失败', type: 'error' });
                                }
                            }
                        });
                    });
                },
                getTemplateInfo: function(messageType, channelType) {
                    var comitData = { messageType: messageType, channelType: channelType };
                    var me = this;
                    yufp.service.request({
                        method: 'POST',
                        url: this.urls.getTemplateInfoUrl,
                        data: comitData,
                        callback: function(code, message, response) {
                            me.form = response.data;
                        }
                    });
                },
                sendOp: function() {
                    if (this.$refs.messagetemplateTable.selections.length > 0) {
                        var row = this.$refs.messagetemplateTable.selections[0];
                        var id = row.messageType;
                        var me = this;
                        yufp.service.request({
                            method: 'POST',
                            url: me.urls.sendMessageUrl + id,
                            callback: function(code, message, response) {
                                if (response.data == 0) {
                                    me.$message({ message: '成功', type: 'success' });
                                } else {
                                    me.$message({ message: '失败', type: 'error' });
                                }
                            }
                        });
                    } else {
                        this.$message({ message: '请先选择一条数据', type: 'warning' });
                        return false;
                    }
                }
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