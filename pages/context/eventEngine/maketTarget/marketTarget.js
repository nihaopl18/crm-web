/**
 * Created by yangxiao2 2018-11-18
 * 产品视图
 */
define(['./custom/widgets/js/yufpProdSelector.js'], function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // yufp.lookup.reg('IS_COMBINATION,PROD_STATE,RISK-LEVEL,PROD_TYPE_ID,TYPE_FIT_CUST,YESNO,APPLY_TYPE,CHECK_FREQ,START_DATE');
        yufp.lookup.reg('CHECK_FREQ,START_DATE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    formInline: {
                        user: '',
                        region: ''
                    },
                    activeName: '1',
                    loadCombin: false, // 页面默认不加载
                    titleCombinSet: '产品组合维护',
                    titleTarget: '营销成效指标维护',
                    combinFlag: '',
                    targetFlag: '',
                    dialogVisibleCombinSet: false,
                    dialogVisibleTarget: false,
                    // Fields: [
                    //     {
                    //         columnCount: 1,
                    //         fields: [
                    //             {
                    //                 field: 'productId',
                    //                 label: '产品',
                    //                 type: 'custom',
                    //                 is: 'yufp-prod-selector',
                    //                 params: { tabCheckbox: true },
                    //             },
                    //         ]
                    //     }
                    // ],
                    queryFields: [
                        { placeholder: '指标标号', field: 'targetId', type: 'input' },
                        { placeholder: '指标名称', field: 'targetName', type: 'input' },
                        // { placeholder: '源字段英文名', field: 'sourceFieldEname', type: 'input' },
                        // { placeholder: '源字段中文名', field: 'sourceFieldCname', type: 'input' }
                    ],
                    queryButtons: [
                        {
                            label: '搜索', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    console.log("model.targetId:" + model.targetId);
                                    var param = { condition: JSON.stringify(model) };
                                    _self.$refs.reftableTarget.remoteData(param);
                                }
                            }
                        },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],
                    // 营销成效指标维护表格栏位
                    tableColumnsTarget: [
                        { label: '指标状态', prop: 'targetState', width: '100', dataCode: 'START_DATE' },
                        { label: '产品编号', prop: 'productId', wigth: '100' },
                        { label: '指标标号', prop: 'targetId', width: '100' },
                        { label: '指标名称', prop: 'targetName', width: '150' },
                        { label: '指标描述', prop: 'targetDesc', width: '200' },
                        { label: '统计频率', prop: 'checkFreq', width: '100', dataCode: 'CHECK_FREQ' },
                        { label: '生效日期', prop: 'startDate', width: '100' },
                        { label: '失效日期', prop: 'endDate', width: '100' },
                        { label: '最近维护人', prop: 'lastUpdateUserName', width: '100' },
                        { label: '最近维护机构', prop: 'orgName', width: '100' },
                        { label: '最近维护日期', prop: 'lastUpdataDate', width: '100' }
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
                                    field: 'checkFreq', label: '统计频率', type: 'radio', dataCode: 'CHECK_FREQ',
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                },
                                {
                                    field: 'targetState', label: '指标状态', type: 'radio', dataCode: 'START_DATE',
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                },
                                {
                                    field: 'startDate', label: '生效日期', type: 'date',
                                    rules: [{ required: true, message: '必填项' }]
                                },
                                {
                                    field: 'endDate', label: '失效日期', type: 'date',
                                    rules: [{ required: true, message: '必填项' }]
                                },
                                {
                                    field: 'productId',
                                    label: '产品(选填)',
                                    type: 'custom',
                                    is: 'yufp-prod-selector',
                                    // params: { tabCheckbox: true },
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
                                        //model.productId = "";
                                        console.log("model.productId--ADD:" + model.productId);
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
                                    //console.log();
                                    //console.log("model.startDate.getFullYear():" + model.startDate.getFullYear());
                                    // 判断生效日期是否小于失效日期、生效日期是否大于当前日期
                                    console.log("model.productId--EDIT:" + model.productId);
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
                                        model.productId = "";
                                        console.log("model.productId:--->>>" + model.productId);
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
                    formDisabled: true
                }
            },
            mounted: function (model) {
                _self = this;
                //model.productId = "";
                var param = { condition: JSON.stringify(model) };
                _self.$refs.reftableTarget.remoteData(param);
            },
            methods: {
                onSubmit() {
                    console.log('submit!');
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
                    this.dialogVisibleTarget = true;
                    this.$nextTick(function () {
                        var obj = this.$refs.reftableTarget.selections[0];
                        console.log("obj.productId:" + obj.productId)
                        console.log("obj.targetId:" + obj.targetId);
                        console.log("obj.targetName" + obj.targetName);
                        console.log("obj:" + obj.startDate);

                        //没productID时，置为''。
                        this.$refs.reformTarget.formModel.productId = '';
                        yufp.extend(this.$refs.reformTarget.formModel, obj);
                        // 将编号置灰
                        this.$refs.reformTarget.switch('targetId', 'disabled', true);

                    });
                    this.targetFlag = 'EDIT';
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