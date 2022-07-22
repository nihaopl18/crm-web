/**
 * @created by luoshun
 * @updated by houyx3
 * @description 积分账户管理
 */
define(['custom/widgets/js/YufpWfInit.js', 'custom/widgets/js/yufpEqucataTree.js', 'custom/widgets/js/yufpInstuOrgTree.js'], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('ACCT_S_TYPE,ACCT_B_TYPE,WF_APP_STATUS,ACCT_TYPE_ID,ON_OFF,EFFECT_IDENT,ACCT_STAT');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    catalogInfoDisabled: true,
                    addSaveBtnShow: false,
                    updSaveBtnShow: false,
                    updInfoDisabled: false,
                    updRateDisabled: false,
                    rateUpdSave: true,
                    catalogParam: {
                        condition: JSON.stringify({
                            orgCode: yufp.session.org.code
                        })
                    },
                    catalogParam1: {
                        condition: JSON.stringify({
                            orgCode: yufp.session.org.code
                        })
                    },
                    subCatalog: [],
                    baseParam: {
                        condition: JSON.stringify({
                            subType: '0'
                        })
                    },
                    instuParams: { instuValue: yufp.session.instu.code },
                    defultInstu: yufp.session.instu.code,
                    financeOrgOptions: [],
                    exRateData: [],
                    orgTreeData: [],
                    exchRateDisabled: true,
                    corpOrg: yufp.session.org.code,
                    orgParams: '',
                    singleValue: '',
                    false: false,
                    catalogMenuId: '',
                    catalogMenuName: '',
                    catalogMenuOrder: '',
                    catalogTitle: '',
                    catalogVisible: false,
                    updCatalogVisible: false,
                    updDialogVisible: false,
                    exRateVisible: false,
                    addRateVisible: false,
                    updRateVisible: false,
                    updRateformdata: {},
                    addRateformdata: {},
                    catalogFormdata: {},
                    updCatalogFormdata: {},
                    disableInstu: true,
                    orgTree: [],
                    rateTitle: '',
                    orgModel: {},
                    updformdata: {},
                    wfCommonParams: {
                        sessionInstuCde: yufp.session.instu.code,
                        sessionOrgCode: yufp.session.org.code,
                        sessionLoginCode: yufp.session.user.loginCode
                    },
                    // 时间控件显示区间
                    pickerOptions: {
                        disabledDate: function(time) {
                            return time.getTime() < Date.now() - 8.64e7;
                        }
                    },
                    rules: {
                        accountName: [{ required: true, message: '字段不能为空' }, { max: 150, message: '长度不能超过150个字符', trigger: 'blur' }],
                        remark: [{ max: 1024, message: '长度不能超过1024个字符', trigger: 'blur' }],
                        leaId: [{ required: true, message: '字段不能为空' }, { max: 150, message: '长度不能超过50个字符', trigger: 'blur' },
                            { validator: yufp.validator.numberAndLetter, message: '字段只能为字母和数字', trigger: 'change' }
                        ],
                        leaName: [{ required: true, message: '字段不能为空' }, { max: 150, message: '长度不能超过150个字符', trigger: 'blur' }],
                        exRateIn: [{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' },
                            { validator: yufp.validator.number, message: '字段只能为数字', trigger: 'change' }
                        ],
                        exRateOut: [{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' },
                            { validator: yufp.validator.number, message: '字段只能为数字', trigger: 'change' }
                        ]
                    },
                    statusOptions: [{
                        key: '01',
                        value: '审批通过'
                    }, {
                        key: '02',
                        value: '审批不通过'
                    }, {
                        key: '03',
                        value: '审批中'
                    }, {
                        key: '04',
                        value: '暂存'
                    }],
                    height: yufp.frame.size().height,
                    dataUrl: '/api/loyacequaccount/list',
                    // 表单数据
                    formdata: {},
                    // 弹窗是否可见
                    dialogVisible: false,
                    // 弹窗标题
                    viewTitle: '',
                    // 表单项是否隐藏
                    isHidden: true,
                    // 编号是否显示
                    isAdjust: true,
                    // 保存按钮是否显示
                    saveBtnShow: true,
                    // 提交按钮是否显示
                    // commitBtnShow: false,
                    // 表单禁用
                    true: true,
                    formDisabled: false,
                    rule: 'required',
                    rule1: '',
                    acctShow: false,
                    async: false,
                    xx: ''
                };
            },
            mounted: function() {
                var _this = this;
                if (yufp.session.org.code == '500') {
                    this.disableInstu = false;
                }
                _this.orgModel.orgName = yufp.session.org.code;
                var codeOrg = {};
                codeOrg.orgId = yufp.session.org.code;
                _this.selectFn(codeOrg);
                _this.getfinanceOrgOptions();
            },
            methods: {
                // financeChange: function (val) {
                //   this.orgParams = val;
                // },
                getfinanceOrgOptions: function() {
                    var _this = this;
                    yufp.service.request({
                        url: '/api/loyqycommoditycategory/getinstus',
                        method: 'get',
                        callback: function(code, message, response) {
                            var data = response.data;
                            for (var i = 0; i < data.length; i++) {
                                _this.financeOrgOptions.push(data[i]);
                            }
                        }
                    });
                    // yufp.service.request({
                    //   method: 'GET',
                    //   url: backend.appOcaService + '/api/adminsmorg/getinstuorg',
                    //   callback: function (code, message, response) {
                    //     if (code == 0) {
                    //       _this.financeOrgOptions = [];
                    //       var re = response.data;
                    //       for (var i = 0; i < re.length; i++) {
                    //         var op = {};
                    //         op.key = re[i].instuId;
                    //         op.value = re[i].instuName;
                    //         _this.financeOrgOptions.push(op);
                    //       }
                    //     }
                    //   }
                    // });
                },
                /** 新增账户选择类型 */
                addSubTypeFn: function(data) {
                    var _this = this;
                    _this.formdata.subType = data.catalogId;
                },
                /** 删除汇率 */
                delRateFn: function() {
                    var _this = this;
                    var selections = _this.$refs.rateRefTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var ids = '';
                    for (var i = 0; i < selections.length; i++) {
                        if (i == 0) {
                            ids = selections[i].id;
                        } else {
                            ids += ',' + selections[i].id;
                        }
                    }
                    _this.$confirm('确认要删除该汇率信息吗? 是否继续?', '提示', {
                        type: 'warning',
                        center: true
                    }).then(function() {
                        yufp.service.request({
                            method: 'POST',
                            url: '/api/loyacleaexrate/del',
                            data: { condition: JSON.stringify({ ids: ids }) },
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    _this.$message(response.message);
                                    _this.getRateData(_this.$refs.refTable.selections);
                                }
                            }
                        });
                    });
                },
                /** 汇率详情查看 */
                infoRateFn: function() {
                    var _this = this;
                    var selection = _this.$refs.rateRefTable.selections;
                    if (selection.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.rateTitle = '汇率详情';
                    _this.updRateDisabled = true;
                    _this.updRateVisible = true;
                    _this.$nextTick(function() {
                        _this.$refs.updRateRefForm.resetFields();
                        yufp.clone(selection[0], _this.updRateformdata);
                    });
                },
                /** 修改汇率 */
                updRateFn: function() {
                    var _this = this;
                    var selection = _this.$refs.rateRefTable.selections;
                    if (selection.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.rateTitle = '修改汇率';
                    _this.updRateVisible = true;
                    _this.$nextTick(function() {
                        _this.$refs.updRateRefForm.resetFields();
                        yufp.clone(selection[0], _this.updRateformdata);
                    });
                },
                /** 修改汇率保存 */
                saveUpdRateFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.updRateformdata, model);
                    model.updateUser = yufp.session.user.userId;
                    model.updateOrg = yufp.session.org.code;
                    var validate = false;
                    _this.$refs.updRateRefForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    };
                    yufp.service.request({
                        method: 'POST',
                        async: false,
                        url: '/api/loyacleaexrate/upd',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                _this.updRateVisible = false;
                                _this.getRateData(_this.$refs.refTable.selections);
                            }
                        }
                    });
                },
                /** 新增汇率 */
                addRateFn: function() {
                    var _this = this;
                    var se = _this.$refs.refTable.selections[0];
                    _this.addRateVisible = true;
                    _this.$nextTick(function() {
                        _this.$refs.addRateRefForm.resetFields();
                        yufp.clone({ accountName: se.accountName }, _this.addRateformdata);
                        _this.$refs.addRateRefForm.formdata.effectiveId = '1';
                    });
                },
                /** 新增汇率保存 */
                saveAddRateFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.addRateformdata, model);
                    model.createUser = yufp.session.user.userId;
                    model.createOrg = yufp.session.org.code;
                    model.updateUser = yufp.session.user.userId;
                    model.updateOrg = yufp.session.org.code;
                    model.accountId = _this.$refs.refTable.selections[0].accountNo;
                    var validate = false;
                    _this.$refs.addRateRefForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    };
                    yufp.service.request({
                        method: 'POST',
                        async: false,
                        url: '/api/loyacleaexrate/add',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                _this.addRateVisible = false;
                                _this.getRateData(_this.$refs.refTable.selections);
                            }
                        }
                    });
                },
                /** 主积分账户设置汇率 */
                exRateFn: function() {
                    var _this = this;
                    var selection = _this.$refs.refTable.selections;
                    if (selection.length != 1) {
                        _this.$message({ message: '请先选择一条总积分账户记录', type: 'warning' });
                        return;
                    }
                    if (selection[0].acctTypeId != '0') {
                        _this.$message({ message: '请先选择一条总积分账户记录', type: 'warning' });
                        return;
                    }
                    _this.getRateData(selection);
                    _this.exRateVisible = true;
                },
                /** 获取当前选择积分主账户汇率信息 */
                getRateData: function(selection) {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/loyacleaexrate/list',
                        async: false,
                        data: { condition: JSON.stringify({ accountId: selection[0].accountNo }) },
                        callback: function(code, message, response) {
                            if (response.code == '0') {
                                var da = response.data;
                                _this.exRateData = [];
                                for (var i = 0; i < da.length; i++) {
                                    _this.exRateData.push(da[i]);
                                }
                            }
                        }
                    });
                },
                /** 删除类型目录 */
                deletGroupFn: function() {
                    var _this = this;
                    var se = this.$refs.mytree.getCurrentNode();
                    if (se == null) {
                        _this.$message('请选择一条非主目录数据');
                        return;
                    }
                    if (se.catalogId === '0') {
                        _this.$message('请选择一条非主目录数据');
                        return;
                    }
                    _this.$confirm('确认要删除该项目分类吗? 是否继续?', '提示', {
                        type: 'warning',
                        center: true
                    }).then(function() {
                        yufp.service.request({
                            method: 'POST',
                            url: '/api/loyacequcatalog/del',
                            data: se.catalogId,
                            callback: function(code, message, response) {
                                if (response.code == '0') {
                                    var codeOrg = {};
                                    codeOrg.orgId = yufp.session.org.code;
                                    _this.selectFn(codeOrg);
                                    _this.$message(response.message);
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
                    if (se.catalogId === '0') {
                        _this.$message('请选择一条非主目录数据');
                        return;
                    }
                    _this.catalogInfoDisabled = false;
                    _this.$refs.catalogRefForm.resetFields();
                    yufp.clone(se, _this.catalogFormdata);
                    _this.addSaveBtnShow = false;
                    _this.updSaveBtnShow = true;
                    _this.catalogInfoDisabled = false;
                },
                /** 修改类型目录保存 */
                updCatalogSaveFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.catalogFormdata, model);
                    var validate = false;
                    _this.$refs.catalogRefForm.validate(function(valid) {
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
                        url: '/api/loyacequcatalog/upd',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                var codeOrg = {};
                                codeOrg.orgId = yufp.session.org.code;
                                _this.selectFn(codeOrg);
                                _this.catalogInfoDisabled = true;
                                _this.$refs.catalogRefForm.resetFields();
                                _this.$refs.mytree.setCurrentKey(null);
                            }
                        }
                    });
                    _this.updSaveBtnShow = false;
                },
                /** 点击目录树节点 */
                nodeClickFn: function(a, b, c) {
                    this.catalogMenuId = a.catalogId;
                    this.catalogMenuName = a.catalogName;
                    this.catalogMenuOrder = a.catalogOrder;
                    this.baseParam = {
                        condition: JSON.stringify({
                            subType: a.catalogId
                        })
                    };
                    this.catalogInfoDisabled = true;
                    this.$refs.catalogRefForm.resetFields();
                    yufp.clone(a, this.catalogFormdata);
                },
                /** 新增目录 */
                addGroupFn: function() {
                    var _this = this;
                    var getNode = this.$refs.mytree.getCurrentNode();
                    if (getNode == null) {
                        _this.$message('请选择一条目录数据');
                        return;
                    }
                    _this.$refs.catalogRefForm.resetFields();
                    _this.catalogFormdata.supCatalogName = getNode.catalogName;
                    _this.updSaveBtnShow = false;
                    _this.addSaveBtnShow = true;
                    _this.catalogInfoDisabled = true;
                    _this.catalogInfoDisabled = false;
                },
                /**
                 * 新增修改表单更改金融机构
                 */
                changeInstuToOrg: function(index) {
                    var _this = this;
                    _this.instuParams.instuValue = index;
                },
                /** 新增目录保存 */
                catalogSaveFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.catalogFormdata, model);
                    var validate = false;
                    _this.$refs.catalogRefForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    };
                    model.createUser = yufp.session.user.userId;
                    model.createOrg = yufp.session.org.code;
                    model.updateUser = yufp.session.user.userId;
                    model.updateOrg = yufp.session.org.code;
                    model.corpOrg = this.corpOrg;
                    model.supCatalogId = this.catalogMenuId;
                    _this.addSaveBtnShow = false;
                    yufp.service.request({
                        method: 'POST',
                        async: false,
                        url: '/api/loyacequcatalog/add',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                _this.catalogVisible = false;
                                var codeOrg = {};
                                codeOrg.orgId = yufp.session.org.code;
                                _this.selectFn(codeOrg);
                                _this.$refs.catalogRefForm.resetFields();
                                _this.$refs.mytree.setCurrentKey(null);
                            }
                        }
                    });
                },
                // 日期格式化
                dateFormatter: function(row, column) {
                    var datetime = row[column.property];
                    if (datetime === undefined) {
                        return '';
                    }
                    return yufp.util.dateFormat(datetime, '{y}-{m}-{d} {h}:{i}:{s}');
                },
                /**
                 * 取消
                 */
                cancelFn: function() {
                    var _this = this;
                    _this.dialogVisible = false;
                },
                /**
                 * 新增权益账户保存
                 */
                saveFn: function() {
                    var _this = this;
                    var validate = false;
                    _this.$refs.refForm.validate(function(valid) {
                        validate = valid;
                    });
                    // 表单校验未通过直接返回
                    if (!validate) {
                        return;
                    }
                    var model = {};
                    yufp.clone(_this.formdata, model);
                    model.createUser = yufp.session.user.userId;
                    model.createOrg = yufp.session.org.code;
                    model.updateUser = yufp.session.user.userId;
                    model.updateOrg = yufp.session.org.code;
                    yufp.service.request({
                        method: 'POST',
                        async: false,
                        url: '/api/loyacequaccount/add',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                _this.$message('新增成功');
                                _this.dialogVisible = false;
                                _this.$refs.refTable.remoteData();
                            }
                        }
                    });
                },
                /**
                 * 新增权益账户
                 */
                addFn: function() {
                    var _this = this;
                    _this.exchRateDisabled = true;
                    _this.dialogVisible = true;
                    // _this.getfinanceOrgOptions();
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        _this.formdata.acctStat = '0';
                        _this.formdata.subType = this.catalogMenuId;
                        _this.formdata.financeOrgCode = yufp.session.instu.code;
                        _this.formdata.orgCode = yufp.session.org.code;
                        _this.catalogParam1 = {
                            condition: JSON.stringify({
                                orgCode: _this.corpOrg
                            })
                        };
                        _this.acctShow = false;
                    });
                },
                /** 新增账户，账户 */
                subTypeChange: function(val) {
                    var _this = this;
                    if (val === '1') {
                        _this.exchRateDisabled = false;
                    } else {
                        _this.exchRateDisabled = true;
                        _this.formdata.exchRate = '';
                    }
                    if (val === '0') {
                        _this.$message('不能新增积分主账户');
                        _this.formdata.acctType = '';
                    }
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
                    // _this.getfinanceOrgOptions();
                    _this.updInfoDisabled = false;
                    _this.exchRateDisabled = true;
                    _this.viewTitle = '修改';
                    _this.updDialogVisible = true;
                    _this.instuParams.instuValue = selections[0].financeOrgCode;

                    _this.$nextTick(function() {
                        _this.$refs.updRefForm.resetFields();
                        var obj = selections[0];
                        yufp.clone(obj, _this.updformdata);
                        _this.acctShow = false;
                        _this.$refs.updRefForm.fields[6].params = _this.instuParams;
                        _this.catalogParam1 = {
                            condition: JSON.stringify({
                                orgCode: _this.corpOrg
                            })
                        };
                        // _this.$refs.updRefForm.orgCode.setCurrentKey(null);
                    });
                },
                /**
                 * 修改保存
                 */
                updteFn: function() {
                    var _this = this;
                    var validate = false;
                    _this.$refs.updRefForm.validate(function(valid) {
                        validate = valid;
                    });
                    // 表单校验未通过直接返回
                    if (!validate) {
                        return;
                    }
                    var model = {};
                    yufp.clone(_this.updformdata, model);
                    var selection = _this.$refs.refTable.selections[0];
                    if (selection.acctTypeId === '1') {
                        model.acctType = '2';
                    }
                    model.apprStat = '000';
                    model.accountId = selection.accountNo;
                    model.updateUser = yufp.session.user.userId;
                    model.updateOrg = yufp.session.org.code;
                    yufp.service.request({
                        method: 'POST',
                        async: false,
                        url: '/api/loyacequaccount/upd',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                _this.$message('修改成功');
                                _this.updDialogVisible = false;
                                _this.$refs.refTable.remoteData();
                            }
                        }
                    });
                },
                /**
                 * 详情
                 */
                infoFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.viewTitle = '详情';
                    _this.updDialogVisible = true;
                    _this.updInfoDisabled = true;
                    _this.$nextTick(function() {
                        _this.$refs.updRefForm.resetFields();
                        _this.catalogParam1 = {
                            condition: JSON.stringify({
                                orgCode: _this.corpOrg
                            })
                        };
                        yufp.clone(selections[0], _this.updformdata);
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
                    for (var i = 0; i < selections.length; i++) {
                        if (selections[i].apprStat === '997' || selections[i].apprStat === '111') {
                            _this.$message({ message: '不能删除审批状态为通过或审批中的记录', type: 'warning' });
                            return;
                        }
                        if (selections[i].acctTypeId === '0') {
                            _this.$message({ message: '不能删除积分总账户', type: 'warning' });
                            return;
                        }
                    }
                    var ids = '';
                    for (var i = 0; i < selections.length; i++) {
                        if (i == 0) {
                            ids = selections[i].accountNo;
                        } else {
                            ids += ',' + selections[i].accountNo;
                        }
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/loyacequaccount/del',
                        data: { condition: JSON.stringify({ ids: ids }) },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.$message(response.message);
                                _this.$refs.refTable.remoteData();
                            }
                        }
                    });
                },
                onAfterClose: function() {},
                // 提交页面关闭前
                onAfterInit: function(data) {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    var model = {};
                    yufp.clone(selections[0], model);
                    model.accountId = selections[0].accountNo;
                    model.acctType = selections[0].acctTypeId;
                    model.updateOrg = yufp.session.org.code;
                    model.updateUser = yufp.session.user.userId;
                    model.apprStat = '111';
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/loyacequaccount/upd',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.$refs.refTable.remoteData();
                                _this.$message({ message: '提交成功', type: 'warning' });
                            }
                        }
                    });
                },
                /** 点击树节点 */
                selectFn: function(data) {
                    this.corpOrg = data.orgId;
                    this.catalogParam = {
                        condition: JSON.stringify({
                            orgCode: data.orgId
                        })
                    };
                },
                /** 账户审批 */
                commitFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条审批为待发起的记录', type: 'warning' });
                        return;
                    }
                    if (selections[0].apprStat != '000') {
                        _this.$message({ message: '请先选择一条审批为待发起的记录', type: 'warning' });
                        return;
                    }
                    // 提交流程参数
                    var commintData = {};
                    commintData.bizSeqNo = selections[0].accountNo; // 流程主键
                    commintData.applType = 'QYZHSP'; // 模型版本申请类型字典项
                    commintData.custName = yufp.session.user.userName;
                    commintData.custId = yufp.session.user.userId;
                    var load = _this.$loading();
                    _this.$refs.yufpWfInit.wfInit(commintData, load);
                },
                /** 账户上架 */
                uploadFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    var ids = '';
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择只是一条记录', type: 'warning' });
                        return;
                    }
                    for (var i = 0; i < selections.length; i++) {
                        if (selections[i].apprStat != '997') {
                            _this.$message({ message: '请选择审批状态为通过的记录', type: 'warning' });
                            return;
                        }
                        if (selections[i].acctStat == '1') {
                            _this.$message({ message: '权益账户已上架，请勿重复上架', type: 'warning' });
                            return;
                        }
                        if (i === '0') {
                            ids = selections[i].accountNo;
                        } else {
                            ids += ',' + selections[i].accountNo;
                        }
                    }
                    var model = {};
                    model.updateOrg = yufp.session.org.code;
                    model.updateUser = yufp.session.user.userId;
                    model.ids = ids;
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/loyacequaccount/upload',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.$refs.refTable.remoteData();
                                _this.$message({ message: '上架成功', type: 'warning' });
                            }
                        }
                    });
                },
                /** 账户下架 */
                downFn: function() {
                    var _this = this;
                    var ids = '';
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择只是一条记录', type: 'warning' });
                        return;
                    }
                    for (var i = 0; i < selections.length; i++) {
                        if (selections[i].acctTypeId === '0') {
                            _this.$message({ message: '不能下架积分总账户', type: 'warning' });
                            return;
                        }
                        if (selections[i].acctStat != '1') {
                            _this.$message({ message: '请选择已上架账户进行操作', type: 'warning' });
                            return;
                        }
                        if (i === '0') {
                            ids = selections[i].accountNo;
                        } else {
                            ids += ',' + selections[i].accountNo;
                        }
                    }
                    var model = {};
                    model.updateOrg = yufp.session.org.code;
                    model.updateUser = yufp.session.user.userId;
                    model.ids = ids;
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/loyacequaccount/download',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.$refs.refTable.remoteData();
                                _this.$message({ message: '下架成功', type: 'warning' });
                            }
                        }
                    });
                }
            }
        });
    };
});