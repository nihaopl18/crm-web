/**
 * Created by yangxiao2 2018-11-18
 * 产品视图
 */
define(['./custom/widgets/js/yufpProdSelector.js'], function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('IS_COMBINATION,PROD_STATE,RISK-LEVEL,PROD_TYPE_ID,TYPE_FIT_CUST,YESNO,APPLY_TYPE,CHECK_FREQ,START_DATE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                var show = false;
                // 判断是否为组合产品
                if (data.selections.isCombination == '1') {
                    show = true;
                }
                _self.showCombin = show;
                _self.$nextTick(function () {
                    // 导入产品基本信息
                    yufp.extend(_self.$refs.reform.formModel, data.selections);
                });
                return {
                    activeName: '1',
                    showCombin: show, // 是否显示产品组合页签
                    loadCombin: false, // 页面默认不加载
                    titleCombinSet: '产品组合维护',
                    titleTarget: '营销成效指标维护',
                    combinFlag: '',
                    targetFlag: '',
                    dialogVisibleCombinSet: false,
                    dialogVisibleTarget: false,
                    // 渠道营销模板表格栏位
                    tableColumns: [
                        // { label: '编号', prop: 'id', width: '0' },
                        { label: '模板名称', prop: 'modelName', width: '150' },
                        { label: '模板内容', prop: 'modelInfo', width: '350' },
                        { label: '是否启用', prop: 'isEnable', dataCode: 'YESNO', width: '70' },
                        { label: '模板类型', prop: 'applyType', dataCode: 'APPLY_TYPE', width: '70' },
                        // { label: '类别名称', prop: 'catlName', width: '90' },
                        { label: '适用对象', prop: 'applyObjectName', width: '120' },
                        { label: '适用渠道', prop: 'applyChannelName', width: '100' },
                        { label: '创建人', prop: 'creatUserName', width: '90' },
                        { label: '最近维护人', prop: 'updataUserName', width: '90' },
                        { label: '最近维护时间', prop: 'updataDate', width: '100' }
                    ],
                    // 产品组合维护表格栏位
                    tableColumnsCombin: [
                        { label: '子产品编号', prop: 'productId', width: '100' },
                        { label: '子产品名称', prop: 'prodName' },
                        { label: '产品风险', prop: 'riskLevel', width: '80', dataCode: 'RISK-LEVEL' },
                        { label: '预期收益', prop: 'rate', width: '80' },
                        { label: '产品组合配比', prop: 'parentProdWeight', width: '100' }
                    ],
                    // 营销成效指标维护表格栏位
                    tableColumnsTarget: [
                        { label: '指标标号', prop: 'targetId', width: '100' },
                        { label: '指标名称', prop: 'targetName', width: '150' },
                        { label: '指标描述', prop: 'targetDesc', width: '200' },
                        { label: '统计频率', prop: 'checkFreq', width: '100', dataCode: 'CHECK_FREQ' },
                        { label: '生效日期', prop: 'startDate', width: '100' },
                        { label: '失效日期', prop: 'endDate', width: '100' },
                        { label: '指标状态', prop: 'targetState', width: '100', dataCode: 'START_DATE' },
                        { label: '最近维护人', prop: 'lastUpdateUserName', width: '100' },
                        { label: '最近维护机构', prop: 'orgName', width: '100' },
                        { label: '最近维护日期', prop: 'lastUpdataDate', width: '100' }
                    ],
                    // 产品组合维护界面
                    updateFieldsCombin: [
                        {
                            columnCount: 2,
                            fields: [
                                { field: 'parentProdId', label: '组合产品编号', type: 'input' },
                                { field: 'parentProdName', label: '组合产品名称', type: 'input' },
                                {
                                    field: 'productId',
                                    label: '子产品名称',
                                    type: 'custom',
                                    is: 'yufp-prod-selector',
                                    params: { tabCheckbox: false },
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                },
                                {
                                    field: 'parentProdWeight', placeholder: '%', label: '组合产品配比', type: 'input',
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                }
                            ]
                        }
                    ],
                    // 产品组合维护保存
                    buttonsCombin: [
                        {
                            label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisibleCombinSet = false;
                            }
                        },
                        {
                            label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                if (isNaN(parseFloat(model.parentProdWeight))) {
                                    _self.$message({ message: '产品配比格式有误', type: 'warning' });
                                    return;
                                }
                                if (_self.combinFlag == 'ADD') {
                                    model.parentProdWeight = model.parentProdWeight + '%';
                                    //新增子产品
                                    yufp.service.request({
                                        method: 'POST',
                                        url: backend.adminService + '/api/cmfrcprodcombin/insertlist',
                                        data: model,
                                        callback: function (code, message, response) {
                                            if (code == 0 && response.code == 0) {
                                                _self.dialogVisibleCombinSet = false;
                                                _self.$message({ message: response.message });
                                                _self.$refs.reftableCombin.remoteData();
                                            } else {
                                                _self.$message({ message: response.message, type: 'warning' });
                                            }
                                        }
                                    });
                                } else if (_self.combinFlag == 'SET') {
                                    model.parentProdWeight = model.parentProdWeight + '%';
                                    //更新子产品
                                    yufp.service.request({
                                        method: 'POST',
                                        url: backend.adminService + '/api/cmfrcprodcombin/updatelist',
                                        data: model,
                                        callback: function (code, message, response) {
                                            if (code == 0 && response.code == 0) {
                                                _self.dialogVisibleCombinSet = false;
                                                _self.$message({ message: response.message });
                                                _self.$refs.reftableCombin.remoteData();
                                            } else {
                                                _self.$message({ message: response.message, type: 'warning' });
                                            }
                                        }
                                    });
                                } else {
                                    _self.$message({ message: '操作错误', type: 'warning' });
                                    _self.dialogVisibleCombinSet = false;
                                }
                            }
                        }
                    ],
                    // 营销成效指标维护页面
                    updateFieldsTarget: [
                        {
                            columnCount: 2,
                            fields: [
                                {
                                    field: 'targetId', label: '指标标号', type: 'input',
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                },
                                {
                                    field: 'targetName', label: '指标名称', type: 'input',
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                },
                                {
                                    field: 'checkFreq', label: '统计频率', type: 'select', dataCode: 'CHECK_FREQ',
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                },
                                {
                                    field: 'targetState', label: '指标状态', type: 'select', dataCode: 'START_DATE',
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                },
                                {
                                    field: 'startDate', label: '生效日期', type: 'date',
                                    rules: [{ required: true, message: '必填项' }]
                                },
                                {
                                    field: 'endDate', label: '失效日期', type: 'date',
                                    rules: [{ required: true, message: '必填项' }]
                                }
                            ]
                        },
                        {
                            columnCount: 1,
                            fields: [
                                {
                                    field: 'targetDesc', label: '指标描述', type: 'textarea', row: 2,
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                }
                            ]
                        }
                    ],
                    // 营销渠道指标保存
                    buttonsTarget: [
                        {
                            label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisibleTarget = false;
                            }
                        },
                        {
                            label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                var validate = false;
                                _self.$refs.reformTarget.validate(function (valid) {
                                    validate = valid;
                                });
                                if (!validate) {
                                    return;
                                }
                                // 判断操作类型
                                if (_self.targetFlag == 'ADD') {
                                    var addFlag = true;
                                    var addMessage = '';
                                    console.log("model.startDate:" + model.startDate);
                                    // 判断生效日期是否小于失效日期、生效日期是否大于当前日期
                                    if (model.startDate > model.endDate) {
                                        addFlag = false;
                                        addMessage = '生效日期不能大于失效日期';
                                    } else if (model.startDate < new Date() &&
                                        !(model.startDate.getFullYear() == new Date().getFullYear() &&
                                            model.startDate.getMonth() == new Date().getMonth() &&
                                            model.startDate.getDate() == new Date().getDate())) {
                                        addFlag = false;
                                        addMessage = '生效日期不能小于当前日期';
                                    }
                                    if (addFlag) {
                                        // 新增
                                        model.productId = data.selections.productId;
                                        yufp.service.request({
                                            method: 'POST',
                                            url: backend.adminService + '/api/cmfrcprodmarkettarget/insertlist',
                                            data: model,
                                            callback: function (code, message, response) {
                                                if (code == 0 && response.code == 0) {
                                                    _self.dialogVisibleTarget = false;
                                                    _self.$message({ message: response.message });
                                                    _self.$refs.reftableTarget.remoteData();
                                                } else {
                                                    _self.$message({ message: response.message, type: 'warning' });
                                                }
                                            }
                                        });
                                    } else {
                                        _self.$message({ message: addMessage, type: 'warning' });
                                    }
                                } else if (_self.targetFlag == 'EDIT') {
                                    var setFlag = true;
                                    var setMessage = '';
                                    // 判断生效日期是否小于失效日期、生效日期是否大于当前日期
                                    if (model.startDate > model.endDate) {
                                        setFlag = false;
                                        setMessage = '生效日期不能大于失效日期';
                                    } else if (model.startDate < new Date() &&
                                        !(model.startDate.getFullYear() == new Date().getFullYear() &&
                                            model.startDate.getMonth() == new Date().getMonth() &&
                                            model.startDate.getDate() == new Date().getDate())) {
                                        setFlag = false;
                                        setMessage = '生效日期不能小于当前日期';
                                    }
                                    if (setFlag) {
                                        // 修改
                                        console.log("model:" + model);
                                        yufp.service.request({
                                            method: 'POST',
                                            url: backend.adminService + '/api/cmfrcprodmarkettarget/updatelist',
                                            data: model,
                                            callback: function (code, message, response) {
                                                if (code == 0 && response.code == 0) {
                                                    _self.dialogVisibleTarget = false;
                                                    _self.$message({ message: response.message });
                                                    _self.$refs.reftableTarget.remoteData();
                                                } else {
                                                    _self.$message({ message: response.message, type: 'warning' });
                                                }
                                            }
                                        });
                                    } else {
                                        _self.$message({ message: setMessage, type: 'warning' });
                                    }
                                } else {
                                    _self.$message({ message: '操作错误', type: 'warning' });
                                    _self.dialogVisibleTarget = false;
                                }
                            }
                        }
                    ],
                    // 产品基本信息表单
                    updateFields: [
                        {
                            columnCount: 2,
                            fields: [
                                { field: 'productId', label: '产品编号', type: 'input' },
                                { field: 'prodName', label: '产品名称', type: 'input' },
                                { field: 'catlCode', label: '产品分类', type: 'input' },
                                { field: 'prodTypeId', label: '产品大类', type: 'select', dataCode: 'PROD_TYPE_ID' },
                                { field: 'typeFitCust', label: '产品适用客户', type: 'select', dataCode: 'TYPE_FIT_CUST' },
                                { field: 'prodState', label: '是否在售', type: 'select', dataCode: 'PROD_STATE' },
                                { field: 'isCombination', label: '组合产品', type: 'select', dataCode: 'IS_COMBINATION' },
                                { field: 'riskLevel', label: '风险等级', type: 'select', dataCode: 'RISK-LEVEL' },
                                { field: 'prodStartDate', label: '产品发布日期', type: 'date' },
                                { field: 'prodEndDate', label: '产品截止日期', type: 'date' },
                                { field: 'rate', label: '利率（%）', type: 'input' },
                                { field: 'costRate', label: '费率（%）', type: 'input' },
                                { field: 'limitTime', label: '期限', type: 'input' }
                            ]
                        }, {
                            columnCount: 1,
                            fields: [
                                { field: 'prodDesc', label: '产品描述', type: 'textarea', rows: 2 },
                                { field: 'otherInfo', label: '其他说明', type: 'textarea', rows: 2 },
                                { field: 'objCustDisc', label: '目标客户描述', type: 'textarea', rows: 2 },
                                { field: 'prodCharact', label: '产品特点', type: 'textarea', rows: 2 },
                                { field: 'assureDisc', label: '担保要求描述', type: 'textarea', rows: 2 },
                                { field: 'dangerDisc', label: '风险提示描述', type: 'textarea', rows: 2 },
                            ]
                        }
                    ],
                    formDisabled: true
                }
            },
            methods: {
                // 点击标签页
                viewClick: function () {
                    var _self = this;
                    // 判断点击标签页类别
                    if (_self.activeName == '1') {
                        // 产品基本信息
                        yufp.extend(_self.$refs.reform.formModel, data.selections);
                    } else if (_self.activeName == '2') {
                        // 组合产品信息
                        var param = {
                            condition: JSON.stringify({
                                parentProdId: data.selections.productId
                            })
                        };
                        _self.$refs.reftableCombin.remoteData(param);
                    } else if (_self.activeName == '3') {
                        // 产品营销模板信息
                        var param = {
                            condition: JSON.stringify({
                                catlCode: data.selections.catlCode.toString()
                            })
                        };
                        _self.$refs.reftable.remoteData(param);
                    } else if (_self.activeName == '4') {
                        // 营销渠道指标维护
                        var param = {
                            condition: JSON.stringify({
                                productId: data.selections.productId
                            })
                        };
                        _self.$refs.reftableTarget.remoteData(param);
                    } else {
                        _self.$message({ message: '未知标签页', type: 'warning' });
                    }
                },
                // 产品组合新增
                addCombinFn: function () {
                    var _self = this;
                    _self.dialogVisibleCombinSet = true;
                    _self.combinFlag = 'ADD';
                    _self.$nextTick(function () {
                        // 设置组合产品信息不可更改
                        _self.$refs.reformCombin.switch('parentProdId', 'disabled', true);
                        _self.$refs.reformCombin.switch('parentProdName', 'disabled', true);
                        // 设置选中的子产品信息可更改
                        _self.$refs.reformCombin.switch('productId', 'disabled', false);
                        _self.$refs.reformCombin.resetFields();
                        _self.$refs.reformCombin.formModel.parentProdId = data.selections.productId;
                        _self.$refs.reformCombin.formModel.parentProdName = data.selections.prodName;
                    });
                },
                // 产品组合修改
                modifyCombinFn: function () {
                    var _self = this;
                    _self.dialogVisibleCombinSet = true;
                    _self.combinFlag = 'SET';
                    _self.$nextTick(function () {
                        // 设置组合产品信息、选中的子产品信息不可更改
                        _self.$refs.reformCombin.switch('parentProdId', 'disabled', true);
                        _self.$refs.reformCombin.switch('parentProdName', 'disabled', true);
                        _self.$refs.reformCombin.switch('productId', 'disabled', true);
                        yufp.extend(_self.$refs.reformCombin.formModel, _self.$refs.reftableCombin.selections[0]);
                        _self.$refs.reformCombin.formModel.parentProdId = data.selections.productId;
                        _self.$refs.reformCombin.formModel.parentProdName = data.selections.prodName;
                    });
                },
                // 产品组合删除
                deleteCombinFn: function () {
                    _self = this;
                    if (_self.$refs.reftableCombin.selections.length < 1) {
                        _self.$message({ message: '请选择一条数据' });
                        return;
                    } else {
                        _self.$confirm('确认删除?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(function () {
                            var arr = [];
                            for (var i = 0; i < _self.$refs.reftableCombin.selections.length; i++) {
                                arr[i] = _self.$refs.reftableCombin.selections[i].productId;
                            }
                            var model = {};
                            model.productId = arr.join(',');
                            model.parentProdId = data.selections.productId;
                            yufp.service.request({
                                method: 'POST',
                                url: backend.adminService + '/api/cmfrcprodcombin/deletelist',
                                data: model,
                                callback: function (code, message, response) {
                                    if (code == 0 && response.code == 0) {
                                        _self.dialogVisibleCombinSet = false;
                                        _self.$message({ message: response.message });
                                        _self.$refs.reftableCombin.remoteData();
                                    } else {
                                        _self.$message({ message: response.message, type: 'warning' });
                                    }
                                }
                            });
                        });
                    }
                },
                // 新增指标
                addTargetFn: function () {
                    var _self = this;
                    _self.targetFlag = 'ADD';
                    _self.dialogVisibleTarget = true;
                    _self.$nextTick(function () {
                        _self.$refs.reformTarget.resetFields();
                        // 将编号置灰取消
                        _self.$refs.reformTarget.switch('targetId', 'disabled', false);
                    });

                },
                // 维护指标
                modifyTargetFn: function () {
                    if (this.$refs.reftableTarget.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.targetFlag = 'EDIT';
                    this.dialogVisibleTarget = true;
                    this.$nextTick(function () {
                        var obj = this.$refs.reftableTarget.selections[0];
                        console.log("obj:" + obj.startDate);
                        yufp.extend(this.$refs.reformTarget.formModel, obj);
                        // 将编号置灰
                        this.$refs.reformTarget.switch('targetId', 'disabled', true);
                    });
                },
                // 删除指标
                deleteTargetFn: function () {
                    var _self = this;
                    var selection = _self.$refs.reftableTarget.selections[0];
                    if (_self.$refs.reftableTarget.selections.length < 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _self.$confirm('确认删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function () {
                        var arr = [];
                        for (var i = 0; i < _self.$refs.reftableTarget.selections.length; i++) {
                            arr[i] = _self.$refs.reftableTarget.selections[i].targetId;
                        }
                        selection.targetId = arr.join(',');
                        yufp.service.request({
                            method: 'POST',
                            url: backend.adminService + '/api/cmfrcprodmarkettarget/deletelist',
                            data: selection,
                            callback: function (code, message, response) {
                                if (code == 0 && response.code == 0) {
                                    _self.$message({ message: response.message });
                                    _self.$refs.reftableTarget.remoteData();
                                } else {
                                    _self.$message({ message: response.message, type: 'warning' });
                                }
                            }
                        });
                    });
                },
                // 启用
                upTargetFn: function () {
                    var _self = this;
                    if (_self.$refs.reftableTarget.selections.length != 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var selection = _self.$refs.reftableTarget.selections[0];
                    if (selection.targetState != '0') {
                        _self.$message({ message: '指标不是停用状态', type: 'warning' });
                    } else {
                        _self.$confirm('确认启用?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(function () {
                            yufp.service.request({
                                method: 'POST',
                                url: backend.adminService + '/api/cmfrcprodmarkettarget/uplist',
                                data: selection,
                                callback: function (code, message, response) {
                                    if (code == 0 && response.code == 0) {
                                        _self.$message({ message: response.message });
                                        _self.$refs.reftableTarget.remoteData();
                                    } else {
                                        _self.$message({ message: response.message, type: 'warning' });
                                    }
                                }
                            });
                        });
                    }
                },
                // 停用
                downTargetFn: function () {
                    var _self = this;
                    if (_self.$refs.reftableTarget.selections.length != 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var selection = _self.$refs.reftableTarget.selections[0];
                    if (selection.targetState != '1') {
                        _self.$message({ message: '指标不是启用状态', type: 'warning' });
                    } else {
                        _self.$confirm('确认停用?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(function () {
                            yufp.service.request({
                                method: 'POST',
                                url: backend.adminService + '/api/cmfrcprodmarkettarget/downlist',
                                data: selection,
                                callback: function (code, message, response) {
                                    if (code == 0 && response.code == 0) {
                                        _self.$message({ message: response.message });
                                        _self.$refs.reftableTarget.remoteData();
                                    } else {
                                        _self.$message({ message: response.message, type: 'warning' });
                                    }
                                }
                            });
                        });
                    }
                }
            }
        });
    };
});