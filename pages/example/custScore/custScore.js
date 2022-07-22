define(function(require, exports) {

    exports.ready = function(hashCode, data, cite) {

        //注册该功能要用到的数据字典
        yufp.lookup.reg('DATA_STS,YESNO,SYS_TYPE');
        yufp.lookup.lookupMgr["TRANS_TYPE"] = [
            { key: '1', value: '增加' },
            { key: '2', value: '扣减' }
        ];

        var vm;
        vm = yufp.custom.vue({
            el: "#custScore",
            //以m_开头的属性为UI数据不作为业务数据，否则为业务数据
            data: function() {
                var me = this;

                return {
                    mainGrid: {
                        currentRow: null,
                        data: null,
                        total: null,
                        dataUrl: backend.scoreService + '/api/score/index',
                        height: yufp.custom.viewSize().height - 140,
                        queryFields: [
                            { placeholder: '客户编码', field: 'custId', type: 'input' }
                        ],
                        queryButtons: [{
                                label: '查询',
                                op: 'submit',
                                type: 'primary',
                                icon: "search",
                                click: function(model, valid) {
                                    if (valid) {
                                        var param = { condition: JSON.stringify(model) };
                                        me.$refs.mytable.remoteData(param);
                                    }
                                }
                            },
                            { label: '重置', op: 'reset', type: 'primary', icon: 'el-icon-edit' }
                        ],
                        paging: {
                            page: 1,
                            size: 10
                        },
                        tableColumns: [
                            { label: '账户编号', prop: 'accountNo', sortable: true, resizable: true },
                            { label: '客户编号', prop: 'custId', sortable: 'custom', resizable: true },
                            { label: '冻结积分', prop: 'freezeAmt', sortable: true, resizable: true, align: 'right' },
                            { label: '积分', prop: 'amount', sortable: true, resizable: true, align: 'right' },
                            { label: '描述', prop: 'remark', sortable: true, resizable: true }

                        ],
                    },
                    tradGrid: {
                        dialogVisible: false,
                        dataUrl: backend.scoreService + '/api/scoretrad/index',
                        height: yufp.custom.viewSize().height - 140,
                        tableColumns: [
                            { label: '交易时间', prop: 'recordTime', sortable: true, resizable: true },
                            { label: '客户编号', prop: 'custId', sortable: 'custom', resizable: true },
                            { label: '账号', prop: 'bankAcc', sortable: true, resizable: true },
                            { label: '积分数量', prop: 'realBalance', sortable: true, resizable: true, align: 'right' },
                            { label: '交易类型', prop: 'transType', sortable: true, resizable: true, dataCode: 'TRANS_TYPE' }
                            //{ label: '交易渠道', prop: 'sericeCode',sortable: true, resizable: true},
                        ],
                    },
                    totGrid: {
                        dialogVisible: false,
                        formDisabled: false,
                        dataUrl: backend.scoreService + '/api/scoretot/index',
                        height: yufp.custom.viewSize().height - 140,
                        updateFields: [{
                            columnCount: 2,
                            fields: [
                                { field: 'org', label: '机构代码' },
                                { field: 'orgName', label: '机构名称' },
                                { field: 'subject', label: '科目代码' },
                                { field: 'subjectName', label: '科目名称' },
                                { field: 'beginBalanceDr', label: '期初借方余额' },
                                { field: 'beginBalanceCr', label: '期初贷方余额' },
                                { field: 'periodNetDr', label: '借方发生' },
                                { field: 'periodNetCr', label: '贷方发生' },
                                { field: 'endBalanceDr', label: '借方余额' },
                                { field: 'endBalanceCr', label: '贷方余额' }

                            ]
                        }],
                    },
                    updateFields: [{
                        columnCount: 2,
                        fields: [{
                                field: 'accountNo',
                                label: '账户编号',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' },
                                    { max: 30, message: '输入值过长', trigger: 'blur' }
                                ]
                            },
                            {
                                field: 'custId',
                                label: '客户编号',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' },
                                    { max: 30, message: '输入值过长', trigger: 'blur' }
                                ]
                            },
                            // { field: 'freezeAmt', label: '冻结积分', rules: [
                            //         {required: true, message: '必填项', trigger: 'change'}
                            //     ] },
                            //{ field: 'amount',label: '积分',  rules:[
                            //        {required: true, message: '必填项', trigger: 'blur'}
                            //    ]},
                            {
                                field: 'remark',
                                label: '描述',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' }
                                ]
                            }
                        ]
                    }],
                    dataParams: {},
                    formDisabled: false,
                    dialogFormVisible: false,
                    dialogStatus: false,
                    textMap: {
                        update: '修改',
                        create: '新增',
                        trad: '历史',
                        trad: '内部账',
                    }
                }
            },
            mounted: function() {},
            methods: {
                rowClickFn: function(row, index) {
                    this.mainGrid.currentRow = this.$refs.mytable.selections[0];
                },
                queryMainGridFn: function() {
                    var me = this;
                    me.$refs.mytable.remoteData();
                },
                openCreateFn: function() {
                    this.dialogStatus = 'create';

                    this.dialogFormVisible = true;
                    this.formDisabled = false;
                    this.$nextTick(function() {
                        this.$refs.myform.resetFields();
                    });
                },
                openEditFn: function(row) {
                    this.dialogStatus = 'update';
                    this.dialogFormVisible = true;
                    this.formDisabled = false;

                    this.$nextTick(function() {
                        this.$refs.myform.resetFields();
                        yufp.extend(this.$refs.myform.formModel, row);
                    });
                },
                saveCreateFn: function(formName) {
                    var vue = this;
                    var myform = vue.$refs.myform;
                    var formFlag = true;

                    myform.validate(function(valid) {
                        formFlag = valid;
                    });

                    if (formFlag) {
                        var comitData = {};
                        yufp.extend(comitData, myform.formModel);

                        yufp.service.request({
                            method: 'POST',
                            url: backend.scoreService + '/api/score/create',
                            data: comitData,
                            callback: function(code, message, response) {
                                if (response.code === '0') {
                                    vue.dialogFormVisible = false;
                                    vue.$message({ message: '积分开户成功!', type: 'info' });
                                    vue.queryMainGridFn();
                                } else {
                                    vue.$message({ message: response.message, type: response.level });
                                }
                            }
                        });

                    } else {
                        this.$message({ message: '请检查输入项是否合法', type: 'warning' });
                        return false;
                    }

                },
                saveEditFn: function(formName) {
                    var vue = this;
                    var myform = vue.$refs.myform;
                    var formFlag = true;
                    myform.validate(function(valid) {
                        formFlag = valid;
                    });
                    if (!formFlag) {
                        this.$message({ message: '请检查输入项是否合法', type: 'warning' });
                        return false;
                    }

                    var comitData = {};

                    yufp.extend(comitData, myform.formModel);

                    yufp.service.request({
                        method: 'POST',
                        url: backend.scoreService + '/api/score/update',
                        data: comitData,
                        callback: function(code, message, response) {
                            if (response.code === '0') {
                                vue.dialogFormVisible = false;
                                vue.$message({ message: '数据保存成功！' });
                                vue.queryMainGridFn();
                            } else {
                                vue.$message({ message: response.message, type: response.level });
                            }
                        }
                    });
                },
                handleModify: function(status) {
                    var row;
                    if (this.$refs.mytable.selections.length !== 1) {
                        this.$message({ message: '请选择一条数据', type: 'warning' });
                        return;
                    } else {
                        row = this.$refs.mytable.selections[0];
                    }
                    if (status === 'edit') {
                        this.mainGrid.currentRow = row;
                        this.openEditFn(row);
                    } else if (status === 'trad') {
                        this.mainGrid.currentRow = row;
                        this.openTradFn(row);
                    } else if (status === 'tot') {
                        this.openTotFn();
                    }
                },
                openTradFn: function(row) {
                    this.dialogStatus = 'trad';
                    this.tradGrid.dialogVisible = true;
                    this.tradGrid.dataUrl = backend.scoreService + '/api/scoretrad/index?custId=' + row.custId;

                    var me = this;
                    this.$nextTick(function() {
                        me.$refs.mytableTrad.remoteData();
                    });
                },
                openTotFn: function() {
                    var me = this;
                    this.dialogStatus = 'tot';
                    this.totGrid.dialogVisible = true;
                    this.totGrid.formDisabled = true;

                    this.$nextTick(function() {
                        yufp.service.request({
                            method: 'GET',
                            url: backend.scoreService + '/api/scoretot/index',
                            data: null,
                            callback: function(code, message, response) {
                                if (response.code === '0') {
                                    me.dialogFormVisible = false;
                                    yufp.extend(me.$refs.myformTot.formModel, response.data[0]);
                                } else {
                                    me.$message({ message: response.message, type: response.level });
                                }
                            }
                        });
                    });

                }
            }
        });
    };

    //消息处理
    exports.onmessage = function(type, message) {};

    //page销毁时触发destroy方法
    exports.destroy = function(id, cite) {};
});