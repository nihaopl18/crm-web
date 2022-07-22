/**
 * @Created by hujun3 hujun3@yusys.com.cn on 2019-2-21 20:43:26.
 * @updated by
 * @description 虚拟票券管理
 */
define(['custom/widgets/js/YufpWfInit.js', 'custom/widgets/js/yufpMerchantSelector.js'], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('TICKET_TYPE,RECEIVE_TYPE,DATA_STS,WF_APP_STATUS,USE_STS,SOURCE_TYPE,MANAGE_A_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                var _this = this;
                return {
                    dataUrl: '/api/loyqyvirtticket/query',
                    dataBatchUrl: '/api/loyqyvirtticket/querybatch',
                    dataStockUrl: '/api/loyqyvirtticket/querystock',
                    height: yufp.frame.size().height,
                    treeUrl: '/api/loyqycommoditycategory/categorytree',
                    async: false,
                    kindParam: {
                        condition: JSON.stringify({
                            orgCode: yufp.session.org.code
                        })
                    },
                    orgModel: {},
                    formdata: {},
                    formBatchdata: {},
                    wfCommonParams: {
                        sessionInstuCde: yufp.session.instu.code,
                        sessionOrgCode: yufp.session.org.code,
                        sessionLoginCode: yufp.session.user.loginCode
                    },
                    ticketAllNum: [{ required: true, message: '字段不能为空' },
                        { validator: yufp.validator.number, message: '数字', trigger: 'change' }
                    ],
                    ticketNo: [{ required: true, message: '字段不能为空' }, { max: 30, message: '长度不能超过30个字符', trigger: 'blur' },
                        { validator: yufp.validator.numberAndLetter, message: '字段只能为字母和数字', trigger: 'change' }
                    ],
                    ticketName: [{ required: true, message: '字段不能为空' }, { max: 150, message: '长度不能超过150个字符', trigger: 'blur' }],
                    useCondition: [{ required: true, message: '字段不能为空' }, { max: 700, message: '长度不能超过700个字符', trigger: 'blur' }],
                    useRemark: [{ max: 1500, message: '长度不能超过1500个字符', trigger: 'blur' }],
                    pickerOptions0: {
                        disabledDate: function(time) {
                            return time.getTime() < Date.now() - 8.64e7;
                        }
                    },
                    validStartDate: { // 有效期开始日期小于结束日期
                        disabledDate: function(time) {
                            var beginDateVal = _this.formBatchdata.validEndDate;
                            if (time.getTime() < Date.now() - 8.64e7) {
                                return true;
                            }
                            if (beginDateVal) {
                                return time.getTime() > beginDateVal;
                            }
                        }
                    },
                    validEndDate: { // 有效期结束日期大于开始日期
                        disabledDate: function(time) {
                            var beginDateVal = _this.formBatchdata.validStartDate;
                            if (time.getTime() < Date.now() - 8.64e7) {
                                return true;
                            }
                            if (beginDateVal) {
                                return time.getTime() < beginDateVal;
                            }
                        }
                    },
                    corpOrg: '',
                    kindId: '0',
                    kindFormdata: {},
                    updkindFormdata: {},
                    addSaveBtnShow: false,
                    updSaveBtnShow: false,
                    baseParam: {
                        condition: JSON.stringify({
                            subType: '0'
                        })
                    },
                    kindInfoDisabled: true,
                    dialogVisible: false,
                    dialogBatchVisible: false, // 是否显示库存管理页面
                    dialogBatchInfoVisible: false,
                    dialogStockInfoVisible: false,
                    formDisabled: false,
                    formBatchDisabled: false,
                    selectionsDate: false,
                    isShow: false,
                    viewType: 'DETAIL',
                    viewType1: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    viewTitle1: yufp.lookup.find('CRUD_TYPE', false),
                    saveBtnShow: true,
                    saveBtnShow1: true,
                    uploadTitle: 'Excel表导入票券信息',
                    uploadInfoVisible: false,
                    uploadDialog: false,
                    flowType: 'ticket', // 流程提交类型：票券申请，批次申请
                    fileList: [],
                    action: yufp.service.getUrl({
                        url: '/api/loyqyvirtticket/uploadstocklist'
                    }),
                    headers: {
                        'Authorization': 'Bearer ' + yufp.service.getToken()
                    },
                    uploaddata: {
                        batchNo: '',
                        ticketNo: '',
                        flag: '0'
                    }
                };
            },
            mounted: function() {
                var _this = this;
                // if (yufp.session.org.code == '500') {
                //   this.disableInstu = false;
                // }
                _this.orgModel.orgName = yufp.session.org.code;
                var codeOrg = {};
                codeOrg.orgId = yufp.session.org.code;
                _this.selectFn(codeOrg);
                // _this.getfinanceOrgOptions();
            },
            methods: {
                /** 新增目录 */
                addGroupFn: function() {
                    var _this = this;
                    var getNode = this.$refs.mytree.getCurrentNode();
                    if (getNode == null) {
                        _this.$message('请选择一条目录数据');
                        return;
                    }
                    if (getNode.kindId != 0 && getNode.supKindId != 0) {
                        _this.$message('最多只能维护两级类目菜单！');
                        return;
                    }
                    _this.$refs.kindRefForm.resetFields();
                    _this.kindFormdata.supKindName = getNode.kindName;
                    _this.updSaveBtnShow = false;
                    _this.addSaveBtnShow = true;
                    _this.kindInfoDisabled = true;
                    _this.kindInfoDisabled = false;
                },
                /** 删除类型目录 */
                deletGroupFn: function() {
                    var _this = this;
                    var se = this.$refs.mytree.getCurrentNode();
                    if (se == null) {
                        _this.$message('请选择一条非主目录数据');
                        return;
                    }
                    if (se.kindId === '0') {
                        _this.$message('请选择一条非主目录数据');
                        return;
                    }
                    _this.$confirm('确认要删除该项目分类吗? 是否继续?', '提示', {
                        type: 'warning',
                        center: true
                    }).then(function() {
                        yufp.service.request({
                            method: 'POST',
                            url: '/api/loyqyvirtticket/del',
                            data: se.kindId,
                            callback: function(code, message, response) {
                                if (response.code == '0') {
                                    var codeOrg = {};
                                    codeOrg.orgId = this.corpOrg;
                                    _this.selectFn(codeOrg);
                                    _this.$message(response.message);
                                    yufp.util.butLogInfo(hashCode, '虚拟票券管理', '目录删除');
                                } else {
                                    _this.$message(response.message);
                                }
                            }
                        });
                    });
                },
                /** 修改类型目录 */
                modifyGroupFn: function() {
                    var _this = this;
                    var se = this.$refs.mytree.getCurrentNode();
                    if (se == null) {
                        _this.$message('请选择一条非主目录数据');
                        return;
                    }
                    if (se.kindId === '0') {
                        _this.$message('请选择一条非主目录数据');
                        return;
                    }
                    _this.kindInfoDisabled = false;
                    _this.$refs.kindRefForm.resetFields();
                    yufp.clone(se, _this.kindFormdata);
                    _this.addSaveBtnShow = false;
                    _this.updSaveBtnShow = true;
                    _this.kindInfoDisabled = false;
                },
                /** 新增目录保存 */
                kindSaveFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.kindFormdata, model);
                    var validate = false;
                    _this.$refs.kindRefForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    };
                    model.createUser = yufp.session.user.userId;
                    model.createOrg = yufp.session.org.code;
                    model.updateUser = yufp.session.user.userId;
                    model.updateOrg = yufp.session.org.code;
                    // model.corpOrg = yufp.session.org.code;
                    model.corpOrg = this.corpOrg;
                    model.supKindId = this.kindMenuId;
                    _this.addSaveBtnShow = false;
                    yufp.service.request({
                        method: 'POST',
                        async: false,
                        url: '/api/loyqyvirtticket/add',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                _this.kindVisible = false;
                                var codeOrg = {};
                                codeOrg.orgId = this.corpOrg;
                                _this.selectFn(codeOrg);
                                _this.$refs.kindRefForm.resetFields();
                                yufp.util.butLogInfo(hashCode, '虚拟票券管理', '目录新增');
                            }
                        }
                    });
                },
                /** 修改类型目录保存 */
                updKindSaveFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.kindFormdata, model);
                    var validate = false;
                    _this.$refs.kindRefForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    };
                    model.updateOrg = yufp.session.org.code;
                    model.updateUser = yufp.session.user.userName;
                    _this.updSaveBtnShow = false;
                    yufp.service.request({
                        method: 'POST',
                        async: false,
                        url: '/api/loyqyvirtticket/upd',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                var codeOrg = {};
                                codeOrg.orgId = this.corpOrg;
                                _this.selectFn(codeOrg);
                                _this.kindInfoDisabled = true;
                                _this.$refs.kindRefForm.resetFields();
                                yufp.util.butLogInfo(hashCode, '虚拟票券管理', '目录修改');
                            }
                        }
                    });
                    _this.updSaveBtnShow = false;
                },
                /** 点击目录树节点 */
                nodeClickFn: function(a, b, c) {
                    this.kindMenuId = a.kindId;
                    this.kindId = a.kindId;
                    this.kindMenuName = a.kindName;
                    this.kindMenuOrder = a.kindOrder;
                    this.baseParam = {
                        condition: JSON.stringify({
                            subType: a.kindId
                        })
                    };
                    this.kindInfoDisabled = true;
                    this.$refs.kindRefForm.resetFields();
                    yufp.clone(a, this.kindFormdata);
                },
                /** 点击树节点 */
                selectFn: function(data) {
                    this.corpOrg = data.orgId;
                    this.kindParam = {
                        condition: JSON.stringify({
                            orgCode: data.orgId
                        })
                    };
                },
                // 日期格式化(年月日)
                dateFormatterSimple: function(row, column) {
                    var datetime = row[column.property];
                    if (datetime === undefined) {
                        return '';
                    }
                    return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
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
                    var url = '';
                    if (_this.viewType == 'ADD') {
                        model.kindId = this.kindId;
                        url = '/api/loyqyvirtticket/addticketinfo';
                    } else if (_this.viewType == 'EDIT') {
                        url = '/api/loyqyvirtticket/updateticketinfo';
                    }
                    // 向后台发送保存请求
                    yufp.service.request({
                        method: 'POST',
                        url: url,
                        data: model,
                        callback: function(code, message, response) {
                            _this.$refs.refTable.remoteData();
                            _this.$message('操作成功');
                            _this.dialogVisible = false;
                            if (_this.viewType == 'ADD') {
                                yufp.util.butLogInfo(hashCode, '虚拟票券管理', '新增');
                            } else if (_this.viewType == 'EDIT') {
                                yufp.util.butLogInfo(hashCode, '虚拟票券管理', '修改');
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
                 * 控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switch1Status: function(viewType, editable) {
                    var _this = this;
                    _this.viewType1 = viewType;
                    _this.saveBtnShow1 = editable;
                    _this.dialogBatchInfoVisible = true;
                    _this.formBatchDisabled = !editable;
                },
                /**
                 * 新增按钮
                 */
                addFn: function() {
                    var _this = this;
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
                    var selections = _this.$refs.refTable.selections;
                    if (selections[0].wfApprSts != '000' && selections[0].wfApprSts != '998') {
                        _this.$message({ message: '只能选择审批状态是待发起或者否决的数据', type: 'warning' });
                        return;
                    }
                    _this.switchStatus('EDIT', true);
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        var obj = selections[0];
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
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].wfApprSts != '000' && selections[i].wfApprSts != '998') {
                            _this.$message({ message: '只能选择审批状态是待发起或者否决的数据', type: 'warning' });
                            return;
                        } else {
                            arr.push(selections[i].ticketId);
                        }
                    }
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqyvirtticket/deleteinfo?ids=' + arr.join(','),
                                    callback: function(code, message, response) {
                                        _this.$refs.refTable.remoteData();
                                        _this.$message('操作成功');
                                        yufp.util.butLogInfo(hashCode, '虚拟票券管理', '删除');
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 启用
                 */
                startUsedFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].wfApprSts === '997' && selections[i].ticketStatus === 'I') {
                            arr.push(selections[i].ticketId);
                        } else {
                            _this.$message({ message: '只能选择审批状态为通过和数据状态为失效的数据', type: 'warning' });
                            return;
                        }
                    }
                    _this.$confirm('此操作将启用选中的数据, 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqyvirtticket/updatests',
                                    data: {
                                        ids: arr.join(','),
                                        status: 'A'
                                    },
                                    callback: function(code, message, response) {
                                        _this.$refs.refTable.remoteData();
                                        _this.$message('操作成功');
                                        yufp.util.butLogInfo(hashCode, '虚拟票券管理', '启用');
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 停用
                 */
                stpUsedFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].ticketStatus != 'A') {
                            _this.$message({ message: '只能选择生效的数据', type: 'warning' });
                            return;
                        } else {
                            arr.push(selections[i].ticketId);
                        }
                    }
                    _this.$confirm('此操作将启用选中的数据, 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqyvirtticket/updatests',
                                    data: {
                                        ids: arr.join(','),
                                        status: 'I'
                                    },
                                    callback: function(code, message, response) {
                                        _this.$refs.refTable.remoteData();
                                        _this.$message('操作成功');
                                        yufp.util.butLogInfo(hashCode, '虚拟票券管理', '停用');
                                    }
                                });
                            }
                        }
                    });
                },
                // 库存管理
                stockManagerFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (selections[0].wfApprSts != '997') {
                        _this.$message({ message: '只允许选择审批状态为[通过]的记录', type: 'warning' });
                        return;
                    }
                    _this.dialogBatchVisible = true;
                    _this.selectionsDate = selections[0];
                    var param = { condition: JSON.stringify({ ticketNo: selections[0].ticketNo }) };
                    _this.$nextTick(function() {
                        _this.$refs.batchTable.remoteData(param);
                    });
                },
                /**
                 * 新增按钮
                 */
                addBatchFn: function() {
                    var _this = this;
                    _this.switch1Status('ADD', true);
                    _this.isShow = false;
                    _this.$nextTick(function() {
                        _this.$refs.refBatchForm.resetFields();
                        _this.formBatchdata.batchNo = yufp.util.dateFormat(new Date(), '{y}{m}{d}{h}{i}{s}');
                        _this.formBatchdata.ticketNo = _this.selectionsDate.ticketNo;
                    });
                },
                /**
                 * 修改
                 */
                modifyBatchFn: function() {
                    var _this = this;
                    if (_this.$refs.batchTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var selection = _this.$refs.batchTable.selections[0];
                    if (selection.wfApprSts != '000' && selection.wfApprSts != '998') {
                        _this.$message({ message: '只能选择审批状态是待发起或者否决的数据', type: 'warning' });
                        return;
                    }
                    _this.switch1Status('EDIT', true);
                    _this.isShow = false;
                    _this.$nextTick(function() {
                        _this.$refs.refBatchForm.resetFields();
                        yufp.clone(selection, _this.formBatchdata);
                    });
                },
                /**
                 * 详情
                 */
                infoBatchFn: function() {
                    var _this = this;
                    var selectionsAry = _this.$refs.batchTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.switch1Status('DETAIL', false);
                    _this.isShow = true;
                    _this.$nextTick(function() {
                        _this.$refs.refBatchForm.resetFields();
                        yufp.clone(selectionsAry[0], _this.formBatchdata);
                    });
                },
                /**
                 * 展示库存明细信息
                 */
                stockInfoFn: function() {
                    var _this = this;
                    var selectionsAry = _this.$refs.batchTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.dialogStockInfoVisible = true;
                    var param = { condition: JSON.stringify({ batchNo: selectionsAry[0].batchNo }) };
                    _this.$nextTick(function() {
                        _this.$refs.stockTable.remoteData(param);
                    });
                },
                /**
                 * 删除
                 */
                deleteBatchFn: function() {
                    var _this = this;
                    var selections = _this.$refs.batchTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].wfApprSts != '000' && selections[i].wfApprSts != '998') {
                            _this.$message({ message: '只能选择审批状态是待发起或者否决的数据', type: 'warning' });
                            return;
                        } else {
                            arr.push(selections[i].batchId);
                        }
                    }
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqyvirtticket/deletebatchinfo?ids=' + arr.join(','),
                                    // data: {
                                    //   ids: arr.join(',')
                                    // },
                                    callback: function(code, message, response) {
                                        _this.$refs.batchTable.remoteData();
                                        _this.$message('操作成功');
                                        yufp.util.butLogInfo(hashCode, '虚拟票券管理', '库存管理删除');
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 批量倒入
                 */
                importBatchFn: function() {
                    var _this = this;
                    if (_this.$refs.batchTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var selection = _this.$refs.batchTable.selections[0];
                    if (selection.wfApprSts != '997' || selection.sourceType != '2') {
                        _this.$message({ message: '只能选择审批状态是通过和票券来源是批量导入的的数据', type: 'warning' });
                        return;
                    }
                    _this.uploaddata = {
                        batchNo: selection.batchNo,
                        ticketNo: selection.ticketNo,
                        flag: '0'
                    };
                    _this.uploadDialog = true;
                },
                /**
                 * 取消
                 */
                cancelBatchFn: function() {
                    var _this = this;
                    _this.dialogBatchInfoVisible = false;
                    _this.dialogBatchVisible = true;
                },
                /**
                 * 保存
                 */
                saveBatchFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.formBatchdata, model);
                    var validate = false;
                    _this.$refs.refBatchForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var url = '';
                    if (_this.viewType1 == 'ADD') {
                        url = '/api/loyqyvirtticket/addbatchinfo';
                    } else if (_this.viewType1 == 'EDIT') {
                        url = '/api/loyqyvirtticket/updatebatchinfo';
                    }
                    // 向后台发送保存请求
                    yufp.service.request({
                        method: 'POST',
                        url: url,
                        data: model,
                        callback: function(code, message, response) {
                            _this.dialogBatchInfoVisible = false;
                            _this.dialogBatchVisible = true;
                            _this.$nextTick(function() {
                                _this.$refs.batchTable.remoteData();
                                _this.$message('操作成功');
                            });
                            if (_this.viewType1 == 'ADD') {
                                yufp.util.butLogInfo(hashCode, '虚拟票券管理', '库存管理新增');
                            } else if (_this.viewType1 == 'EDIT') {
                                yufp.util.butLogInfo(hashCode, '虚拟票券管理', '库存管理修改');
                            }
                        }
                    });
                },
                /**
                 * 提交
                 */
                commitFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (selections[0].wfApprSts != '000') {
                        _this.$message({ message: '只允许提交审批状态为[待发起]的记录', type: 'warning' });
                        return;
                    }
                    _this.flowType = 'ticket';
                    var commintData = {};
                    commintData.bizSeqNo = selections[0].ticketId; // 流程主键
                    commintData.applType = 'XNPQ'; // 模型版本申请类型字典项
                    commintData.custName = selections[0].ticketName;
                    commintData.custId = selections[0].ticketNo;
                    commintData.paramMap = yufp.clone(selections[0], {});
                    var load = _this.$loading();
                    _this.$refs.yufpWfInit.wfInit(commintData, load);
                },
                onTicketAfterClose: function() {
                    var _this = this;

                    _this.$message('操作成功');
                },
                /**
                 * 提交-批次信息
                 */
                commitBatchFn: function(data) {
                    var _this = this;
                    var selections = _this.$refs.batchTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (selections[0].wfApprSts != '000') {
                        _this.$message({ message: '只允许提交审批状态为[待发起]的记录', type: 'warning' });
                        return;
                    }
                    _this.flowType = 'batch';
                    var commintData = {};
                    commintData.bizSeqNo = selections[0].batchId; // 流程主键
                    commintData.applType = 'XNPQPC'; // 模型版本申请类型字典项
                    commintData.custName = _this.selectionsDate.ticketName + '的' + selections[0].batchNo + '批次';
                    commintData.custId = selections[0].batchNo;
                    commintData.paramMap = yufp.clone(selections[0], {});
                    var load = _this.$loading();
                    _this.$refs.yufpWfInit.wfInit(commintData, load);
                },
                onAfterClose: function(data) {
                    var _this = this;
                    if (_this.flowType === 'batch') {
                        _this.$refs.batchTable.remoteData();
                    } else {
                        _this.$refs.refTable.remoteData();
                    }
                    _this.$message('操作成功');
                },

                onAfterInit: function(data) {},
                // 文件上传成功处理逻辑
                onSuccess: function(response, file, fileList) {
                    var _this = this;
                    // console.log('上传文件', response);
                    // alert(response.code);
                    if (response.code == -1) {
                        _this.$message('文件导入失败!', '提示');
                        _this.$refs.verUpload.clearFiles();
                        // vm.$refs.accessTables.remoteData();
                    } else {
                        _this.$message('成功导入' + response.message + '条数据!', '提示');
                        _this.$refs.verUpload.clearFiles();
                        _this.$refs.refTable.remoteData();
                        // vm.$refs.accessTables.remoteData();
                    }
                },
                onError: function() {
                    this.$message('文件导入失败!', '提示');
                    this.$refs.verUpload.clearFiles();
                    // vm.$refs.accessTables.remoteData();
                },
                // 上传之前判断文件格式
                beforeAvatarUpload: function(file) {
                    var regex = /^.*\.(?:xls|xlsx)$/i;
                    if (!regex.test(file.name)) {
                        this.$message.error('只能导入xls或xlsx格式文件!');
                        return false;
                    }
                    return file.name;
                },
                submitUpload: function() {
                    this.$refs.verUpload.submit();
                    this.uploadDialog = false;
                },
                downTable: function(row, event) {
                    var url = backend.fileService + '/api/file/provider/download?fileId=' + 'tempModel/stockTempModel.xlsx';
                    yufp.util.download(url);
                },
                // 上传模板
                upTable: function(row, event) {
                    var _self = this;
                    // _self.deleteVisible = false;
                    _self.uploadInfoVisible = true;
                    this.$nextTick(function() {
                        // var obj = _self.$refs[refTable].selections[0];
                        // this.uploadInfoform = Object.assign(this.uploadInfoform, obj);
                        // 初始化查询上传附件
                        // return yufp.service.getUrl({url: me.uploadAction});
                        // 获取附件列表
                        // vm.$refs.filesTable.queryFn(files);
                        // 设置附件列表组件传入NOTICEID
                        this.noticeUpLoadBusNo = {
                            busNo: '00000000'
                        };
                    });
                }
            }
        });
    };
});