/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2019-1-22 16:03:04.
 * @updated by
 * @description 知识库发布
 */
define([
    './custom/widgets/js/yufpOrgTree.js',
    './custom/widgets/js/yufpUploadTable.js',
    './pages/crmsys/workPlatform/infoKnowledgePub/treeEditBtn.js'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,CD0337,IS_DRAFT,PUBLIC_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    addButton: !yufp.session.checkCtrl('add'),
                    updButton: !yufp.session.checkCtrl('upd'),
                    delButton: !yufp.session.checkCtrl('del'),
                    viewButton: !yufp.session.checkCtrl('view'),
                    messageId: '',
                    curNodeId: '',
                    baseParams: {
                        condition: JSON.stringify({ option: '1' })
                    },
                    rule: {
                        sectionName: [
                            { required: true, message: '字段不能为空', trigger: 'blur' },
                            { max: 50, message: '最大长度不超过50个字符', trigger: 'blur' },
                            // { validator: checkGroupName, trigger: 'blur' }
                        ],
                        sectionSort: [
                            { validator: yufp.validator.number, message: '输入数字', trigger: 'blur' }
                        ],
                        sectionId: [
                            { required: true, message: '字段不能为空', trigger: 'change' }
                        ],
                        messageTitle: [
                            { required: true, message: '字段不能为空', trigger: 'blur' },
                            { max: 50, message: '最大长度不超过50个字符', trigger: 'blur' }
                        ],
                        publicType: [
                            { required: true, message: '字段不能为空', trigger: 'change' }
                        ],
                        messageIntroduce: [
                            { required: true, message: '字段不能为空', trigger: 'blur' },
                            { max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
                        ]
                    },
                    treeParams: {
                        placeholder: '所属栏目',
                        dataUrl: backend.knowledgebaseService + '/api/infoknowledge/querysection',
                        dataId: 'sectionId',
                        dataLabel: 'sectionName',
                        dataPid: 'parentSection'
                    },
                    treeUrl: backend.knowledgebaseService + '/api/infoknowledge/querysection',
                    treeRootId: '00',
                    treeDialogTitle: '',
                    treeDialogVisible: false,
                    treeFormData: {},
                    dataUrl: backend.knowledgebaseService + '/api/infoknowledge/querylist',
                    saveBtnShow: true,
                    cancelBtnShow: true,
                    formdata: {},
                    height: yufp.frame.size().height,
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: ''
                        })
                    },
                    fileUpLoadBusNo: {},
                    fileBtnVisible: false,
                    fileBtnxzVisible: false,
                    wfCommonParams: { //流程组件参数
                        sessionInstuCde: yufp.session.instu.code,
                        sessionOrgCode: yufp.session.org.code,
                        sessionLoginCode: yufp.session.user.loginCode
                    },
                    searchScrope: true,

                };
            },
            mounted: function() {
                var roles = yufp.session.roles;
                var selectRole = yufp.sessionStorage.get('selectRole');
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i].id === selectRole) {
                        if (roles[i].code == 'R018' || roles[i].code == 'R019') {
                            this.searchScrope = false;
                        }
                    }
                }
            },
            methods: {
                // 清空obj对象 -- common
                clearObj: function(obj) {
                    for (var key in obj) {
                        obj[key] = null;
                    }
                    return obj;
                },
                cancelTreeFn: function() {
                    this.treeDialogVisible = false;
                },
                saveTreeFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.treeFormData, model);
                    var validate = false;
                    var sameorNo = true;
                    _this.$refs.treeForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }

                    var modelSame = {
                        parentSection: _this.treeFormData.parentSection,
                        sectionName: _this.treeFormData.sectionName,
                        sectionId: _this.treeFormData.sectionId,
                    }
                    yufp.service.request({
                        method: 'get',
                        url: backend.knowledgebaseService + '/api/infoknowledge/samesection',
                        data: modelSame,
                        async: false,
                        callback: function(code, message, response) {
                            if (code == 0) {
                                sameorNo = response.data;

                            }
                        }
                    });
                    if (!sameorNo) {
                        _this.$message({ message: '同一目录存在相同的数据！', type: 'warning' });
                        return;
                    }

                    if (model.sectionId == null || model.sectionId == '') {
                        // 生成 创建机构 创建人 法人机构 数据
                        model.createOrg = yufp.session.org.code;
                        model.createOrgName = yufp.session.org.name;
                        model.creator = yufp.session.user.loginCode;
                        model.creatorName = yufp.session.userName;
                        // 新增请求
                        yufp.service.request({
                            method: 'POST',
                            url: backend.knowledgebaseService + '/api/infoknowledge/insertsection',
                            data: model,
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    _this.$refs.mytree.remoteData();
                                    _this.$message('操作成功');
                                    _this.treeDialogVisible = false;
                                    _this.$refs.refSectionIdTree.$refs.refSectionIdTree.refreshData();

                                    yufp.util.butLogInfo(hashCode, '知识库发布', '左边树新增');
                                }
                            }
                        });
                    } else {
                        // 修改请求
                        yufp.service.request({
                            method: 'POST',
                            url: backend.knowledgebaseService + '/api/infoknowledge/updatesection',
                            data: model,
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    _this.$refs.mytree.remoteData();
                                    _this.$message('操作成功');
                                    _this.treeDialogVisible = false;
                                    _this.$refs.refSectionIdTree.$refs.refSectionIdTree.refreshData();
                                    _this.$refs.refTable.remoteData();
                                    yufp.util.butLogInfo(hashCode, '知识库发布', '左边树修改');
                                }
                            }
                        });
                    }
                },
                switchTreeStatus: function(title) {
                    this.treeDialogTitle = title;
                    this.treeDialogVisible = true;
                },
                plusBtnClick: function(label, id) {
                    var _this = this;
                    _this.switchTreeStatus('新增节点');
                    _this.$nextTick(function() {
                        _this.$refs.treeForm.resetFields();
                        var model = {};
                        model.parentSection = id;
                        model.parentSectionName = label;
                        yufp.clone(model, _this.treeFormData);
                    });
                },
                editBtnClick: function(label, id, parentSectionName, parentSection, sectionSort) {
                    var _this = this;
                    _this.switchTreeStatus('修改节点');
                    _this.$nextTick(function() {
                        _this.$refs.treeForm.resetFields();
                        var model = {};
                        model.parentSection = parentSection;
                        model.parentSectionName = parentSectionName;
                        model.sectionId = id;
                        model.sectionName = label;
                        model.sectionSort = sectionSort;
                        yufp.clone(model, _this.treeFormData);
                    });
                },

                delBtnClick: function(label, id, parentSectionName, parentSection, sectionSort) {
                    var _this = this;
                    // 先查询选中的栏目及其下所有栏目是否包含 知识库数据， 如果包含，不允许删除
                    yufp.service.request({
                        method: 'GET',
                        url: backend.knowledgebaseService + '/api/infoknowledge/querylist',
                        data: {
                            condition: JSON.stringify({ sectionId: id, option: '1' })
                        },
                        callback: function(code, message, response) {
                            if (code == 0 && response.data.length > 0) {
                                _this.$message({ message: '该栏目中包含知识库数据，不能删除！', type: 'warning' });
                                return;
                            } else {
                                // 如果不包含 调用 知识库栏目 删除接口
                                _this.$confirm('将永久删除该栏目及其下所有栏目数据, 是否继续?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning',
                                    center: true,
                                    callback: function(action) {
                                        if (action === 'confirm') {
                                            yufp.service.request({
                                                method: 'POST',
                                                url: backend.knowledgebaseService + '/api/infoknowledge/deletesection',
                                                data: id,
                                                callback: function(code, message, response) {
                                                    if (code == 0) {
                                                        _this.$refs.mytree.remoteData();
                                                        _this.$refs.refSectionIdTree.$refs.refSectionIdTree.refreshData();
                                                        _this.$message('操作成功');
                                                        yufp.util.butLogInfo(hashCode, '知识库发布', '左边树删除');
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                renderContent: function(h, node) {
                    var _this = this;
                    var createElement = arguments[0];
                    var data = arguments[1].data;
                    var plusBtn = createElement('tree-edit-btn', {
                        attrs: { type: 'text', icon: 'plus' },
                        style: { marginLeft: '2px' },
                        on: {
                            'btnClick': function() {
                                _this.plusBtnClick(data.label, data.id);
                            }
                        }
                    });
                    var editBtn, delBtn = '';
                    if (data.id != _this.treeRootId) { // 如果不是根节点, 展示修改、删除按钮
                        editBtn = createElement('tree-edit-btn', {
                            attrs: { type: 'text', icon: 'edit' },
                            style: { marginLeft: '2px' },
                            on: {
                                'btnClick': function() {
                                    _this.editBtnClick(data.label, data.id, data.parentSectionName,
                                        data.parentSection, data.sectionSort);
                                }
                            }
                        });
                        delBtn = createElement('tree-edit-btn', {
                            attrs: { type: 'text', icon: 'yx-bin' },
                            style: { marginLeft: '2px' },
                            on: {
                                'btnClick': function() {
                                    _this.delBtnClick(data.label, data.id);
                                }
                            }
                        });
                    }
                    if (node.data.parentSection == '00') {
                        return createElement('span', [
                            createElement('span', data.label),
                            createElement('span', { style: { display: node.node.data.id == _this.curNodeId ? '' : 'none' } }, [
                                plusBtn
                            ])
                        ]);
                    } else {
                        return createElement('span', [
                            createElement('span', data.label),
                            createElement('span', { style: { display: node.node.data.id == _this.curNodeId ? '' : 'none' } }, [
                                plusBtn, editBtn, delBtn
                            ])
                        ]);
                    }

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
                    var sameorNo = true;
                    var modelSame = {
                        messageTitle: _this.formdata.messageTitle,
                        sectionId: _this.formdata.sectionId,
                        messageId: _this.formdata.messageId
                    }
                    yufp.service.request({
                        method: 'get',
                        url: backend.knowledgebaseService + '/api/infoknowledge/sameinfo',
                        data: modelSame,
                        async: false,
                        callback: function(code, message, response) {
                            if (code == 0) {
                                sameorNo = response.data;

                            }
                        }
                    });
                    if (!sameorNo) {
                        _this.$message({ message: '同一目录存在相同的数据！', type: 'warning' });
                        return;
                    }
                    if (model.messageId == null || model.messageId == '') {
                        // 生成 发布者 发布机构 法人 数据
                        // model.publishDate = new Date();
                        model.publishUser = yufp.session.user.loginCode;
                        model.publishUserName = yufp.session.userName;
                        // model.publishOrg = yufp.session.org.id;
                        // model.publishOrgName = yufp.session.org.name;
                        // 新增请求
                        yufp.service.request({
                            method: 'POST',
                            url: backend.knowledgebaseService + '/api/infoknowledge/add',
                            data: model,
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    _this.messageId = response.data;
                                    _this.$refs.refTable.remoteData();
                                    _this.$message('操作成功');
                                    // _this.dialogVisible = false;
                                    // 新增成功后，知识库数据不可编辑、附件上传下载删除按钮可见
                                    _this.fileTableQuery({ messageId: response.data });
                                    _this.formDisabled = true;
                                    _this.fileBtnVisible = true;
                                    _this.fileBtnxzVisible = true;
                                    _this.saveBtnShow = false;
                                    yufp.util.butLogInfo(hashCode, '知识库发布', '新增');
                                }
                            }
                        });
                    } else {
                        // 修改请求
                        yufp.service.request({
                            method: 'POST',
                            url: backend.knowledgebaseService + '/api/infoknowledge/update',
                            data: model,
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    _this.$refs.refTable.remoteData();
                                    _this.$message('操作成功');
                                    _this.dialogVisible = false;
                                    yufp.util.butLogInfo(hashCode, '知识库发布', '修改');
                                }
                            }
                        });
                    }
                    // 请调用服务进行后台保存
                },
                /**
                 * 控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function(viewType, editable) {
                    var _this = this;
                    _this.viewType = viewType;
                    _this.dialogVisible = true;
                    _this.formDisabled = !editable;
                    _this.saveBtnShow = editable;
                    _this.cancelBtnShow = editable;
                },
                nodeClickFn: function(nodeData, node, self) {
                    var _this = this;
                    _this.curNodeId = nodeData.id;
                    // 给 查询项-所属栏目 赋值
                    _this.$refs.queryForm.formdata.sectionId = nodeData.id;
                    var conditionKey = _this.$refs.refTable.$props.conditionKey;
                    var qParam = {};
                    qParam[conditionKey] = {
                        sectionId: nodeData.id,
                        messageTitle: _this.$refs.queryForm.formdata.messageTitle
                    };
                    _this.$refs.refTable.queryParam = qParam;
                    _this.$refs.refTable.remoteData();
                },
                /**
                 * 新增
                 */
                addFn: function() {
                    var _this = this;
                    _this.fileBtnVisible = false;
                    _this.fileBtnxzVisible = false;
                    _this.switchStatus('ADD', true);
                    // _this.$refs.refformAdd.$refs.groupNo[0].refreshData();
                    _this.$nextTick(function() {
                        _this.clearObj(_this.formdata);
                        _this.messageId = '';
                        _this.fileTableQuery();
                        _this.$refs.refForm.resetFields();
                        _this.$refs.refForm.fields[0].$children[0].refreshData(); //重新刷新新增页面的栏目
                    });
                },
                /**
                 * 修改
                 */
                modifyFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (selections[0].publishUser != yufp.session.user.loginCode) {
                        _this.$message({ message: '只能修改自己发布的数据', type: 'warning' });
                        return;
                    }
                    // if (selections[0].publicType != '2') {
                    //     if (selections[0].publishType == 'N' || selections[0].publishType == 'N-1') {
                    //         _this.$message({ message: '审批中和已审批的数据不能修改', type: 'warning' });
                    //         return;
                    //     }
                    // }

                    _this.fileBtnVisible = true;
                    _this.fileBtnxzVisible = true;
                    _this.switchStatus('EDIT', true);
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        if (document.getElementsByClassName('el-upload-list__item is-success')[0] != null && document.getElementsByClassName('el-upload-list__item is-success')[0] != undefined) {
                            document.getElementsByClassName('el-upload-list__item is-success')[0].innerHTML = '';
                        }
                        var obj = selections[0];
                        _this.messageId = obj.messageId;
                        _this.fileTableQuery(obj);
                        yufp.clone(obj, _this.formdata);
                        _this.$refs.refForm.fields[0].$children[0].refreshData(); //重新刷新新增页面的栏目
                    });
                },
                /**
                 * 详情
                 */
                infoFn: function() {
                    var _this = this;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.fileBtnVisible = false;
                    _this.fileBtnxzVisible = true;
                    _this.switchStatus('DETAIL', false);
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        var obj = _this.$refs.refTable.selections[0];
                        _this.messageId = obj.messageId;
                        _this.fileTableQuery(obj);
                        yufp.clone(obj, _this.formdata);
                    });
                },

                rowDblClick: function(row, event) {
                    var _this = this;
                    _this.fileBtnVisible = false;
                    _this.fileBtnxzVisible = true;
                    _this.switchStatus('DETAIL', false);
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        var obj = row;
                        _this.messageId = obj.messageId;
                        _this.fileTableQuery(obj);
                        yufp.clone(obj, _this.formdata);
                    });
                },

                /**
                 * 删除
                 */
                deleteFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].publishUser != yufp.session.user.loginCode) {
                            _this.$message({ message: '只能删除自己发布的数据', type: 'warning' });
                            return;
                        }
                        // if (selections[i].publicType != '2') {
                        //     if (selections[i].publishType == 'N' || selections[i].publishType == 'N-1' || selections[i].publishType == 'N-2' || selections[i].publishType == 'N-3' || selections[i].publishType == 'N-0') {
                        //         _this.$message({ message: '审批中和已审批的数据不能删除', type: 'warning' });
                        //         return;
                        //     }
                        // }
                        arr.push(selections[i].messageId);
                    }
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.knowledgebaseService + '/api/infoknowledge/delete',
                                    data: arr.join(','),
                                    callback: function(code, message, response) {
                                        if (code == 0) {
                                            _this.$refs.refTable.remoteData();
                                            _this.$message('操作成功');
                                            yufp.util.butLogInfo(hashCode, '知识库发布', '删除');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                pubFn: function() {
                    var _this = this;
                    var commitData = {};
                    var selections = _this.$refs.refTable.selections;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (selections[0].publishType == 'N' || selections[0].publishType == 'N-1') {
                        _this.$message({ message: '审批中和已审批的数据不能发布', type: 'warning' });
                        return;
                    } else {
                        var load = _this.$loading();
                        commitData.bizSeqNo = selections[0].messageId; // 关联业务编号
                        commitData.applType = 'WFKNPU'; // 工作报告审批流程
                        commitData.custName = yufp.session.userName; // 展示主题名称
                        commitData.custId = yufp.session.userId;
                        commitData.paramMap = {
                            selectRole: yufp.sessionStorage.get('selectRole'), // 当前用户角色
                            searchScope: selections[0].publicType // 当前属于哪个团队
                        };
                        if (selections[0].instanceId) {
                            commitData.instanceId = selections[0].instanceId; // 关联业务编号
                            _this.$refs.yufpWfInit.wfSave(commitData, load);
                        } else {
                            _this.$refs.yufpWfInit.wfInit(commitData, load);
                        }
                    }

                },
                drawBackFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (selections[0].publishType != 'N-1') {
                        _this.$message({ message: '只有审批中的数据才能撤回', type: 'warning' });
                        return;
                    }
                    params = {
                        'instanceId': selections[0].instanceId
                    }
                    _this.$refs.yufpWfInit.withdraw(params);

                },
                /**
                 * 附件列表查询
                 */
                fileTableQuery: function(obj) {
                    var _this = this;
                    var messageIdTemp = obj != null && obj.messageId != null ? obj.messageId : '';
                    _this.fileUpLoadBusNo = { busNo: messageIdTemp };
                    // 初始化附件列表查询时，传入为空
                    var tempParams = {
                        condition: JSON.stringify({
                            busNo: messageIdTemp
                        })
                    };
                    yufp.extend(_this.initFilesParams, tempParams);
                    // 获取附件列表
                    _this.$refs.fileTable.queryFn();
                },
                /**
                 * 检查上传文件大小和类型
                 */
                beforeFileUpload: function(file) {
                    var isLt10M = file.size / 1024 / 1024 < 50;
                    if (!isLt10M) {
                        this.$message.error('上传文件大小不能超过 50MB!');
                    }
                    var index = file.name.lastIndexOf('.');
                    var ext = file.name.substr(index + 1);
                    // var fileType = ['image/jpeg', 'image/gif', 'image/png', 'image/bmp', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/x-rar'];
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
                 * 附件上传成功处理逻辑
                 */
                uploadSuccessFn: function() {
                    this.fileTableQuery({ messageId: this.messageId });
                    this.$message({
                        showClose: true,
                        message: '文件上传成功',
                        type: 'success'
                    });
                },
                //流程相关的方法
                onAfterInit: function(data) {},
                // 审批页面关闭后
                onAfterClose: function() {
                    var _this = this;
                    _this.$refs.refTable.remoteData();
                },
                refreshfn: function() {
                    var _this = this;
                    _this.$refs.refTable.remoteData();
                },
            }
        });
    };
});