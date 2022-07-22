define(function(require, exports) {

    exports.ready = function(hashCode, data, cite) {

        //注册该功能要用到的数据字典
        yufp.lookup.reg('DATA_STS,YESNO,SYS_TYPE');
        yufp.lookup.lookupMgr["CUST_TYPE"] = [
            { key: '01', value: '个人' },
            { key: '02', value: '机构' }
        ];
        yufp.lookup.lookupMgr["IDENT_TYPE"] = [
            { key: '0101001', value: '身份证' },
            { key: '0101002', value: '临时身份证' }
        ];
        var vm;
        vm = yufp.custom.vue({
            el: "#custAccount",
            //以m_开头的属性为UI数据不作为业务数据，否则为业务数据
            data: function() {
                var me = this;

                return {
                    mainGrid: {
                        currentRow: null,
                        data: null,
                        total: null,
                        dataUrl: backend.actService + '/api/fcicust/index',
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
                            { label: '客户编号', prop: 'custId', sortable: 'custom', resizable: true },
                            { label: '客户名称', prop: 'custName', sortable: true, resizable: true },
                            { label: '客户类型', prop: 'custType', sortable: true, resizable: true, dataCode: 'CUST_TYPE' },
                            { label: '客户状态', prop: 'custStatus', sortable: true, resizable: true, dataCode: 'DATA_STS' },
                            { label: '证件类型', prop: 'identType', sortable: true, resizable: true, dataCode: "IDENT_TYPE" },
                            { label: '证件编号', prop: 'identNo', sortable: true, resizable: true },
                            { label: '联系号码', prop: 'telphone', sortable: true, resizable: true },
                            { label: '地址', prop: 'address', sortable: true, resizable: true }

                        ],
                    },
                    consumer: {
                        visible: false,
                        formDisabled: false,
                        dataUrl: '',
                        height: yufp.custom.viewSize().height - 140,
                        formdata: {
                            custId: null,
                            custName: null,
                            moneyAmount: null,
                            scoreAmount: null,
                            amount: null
                        },
                        tableColumns: [
                            { label: '客户编号', prop: 'custId', sortable: 'custom', resizable: true },
                            { label: '交易总金额', prop: 'tradTotalMoney', sortable: true, resizable: true, align: 'right' },
                            { label: '使用积分', prop: 'scoreAmt', sortable: true, resizable: true, dataCode: 'CUST_TYPE', align: 'right' },
                            { label: '使用资金', prop: 'tradMoney', sortable: true, resizable: true, dataCode: 'DATA_STS', align: 'right' },
                            //{ label: '交易状态', prop: 'transState',sortable: true,  resizable: true, dataCode: "IDENT_TYPE"},
                            { label: '交易时间', prop: 'tradDate', sortable: true, resizable: true }
                        ]
                    },
                    updateFields: [{
                        columnCount: 2,
                        fields: [{
                                field: 'custId',
                                label: '客户编号',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' },
                                    { max: 30, message: '输入值过长', trigger: 'blur' }
                                ]
                            },
                            { field: 'custName', label: '客户名称' },
                            {
                                field: 'custType',
                                label: '客户类型',
                                type: 'select',
                                dataCode: 'CUST_TYPE',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'change' }
                                ]
                            },
                            {
                                field: 'custStatus',
                                label: '客户状态',
                                type: 'select',
                                dataCode: "DATA_STS",
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' }
                                ]
                            },
                            {
                                field: 'identType',
                                label: '证件类型',
                                type: 'select',
                                dataCode: "IDENT_TYPE",
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' }
                                ]
                            },
                            {
                                field: 'identNo',
                                label: '证件号码',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' },
                                    { max: 18, message: '输入值过长', trigger: 'blur' }
                                ]
                            },
                            {
                                field: 'telphone',
                                label: '联系号码',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' },
                                    { max: 100, message: '输入值过长', trigger: 'blur' }
                                ]
                            }, {
                                field: 'address',
                                label: '地址',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' },
                                    { max: 100, message: '输入值过长', trigger: 'blur' }
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
                        consumer: '消费'
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
                        var comitData = {
                            custId: null,
                            custName: null,
                            custType: null,
                            custStatus: null,
                            identType: null,
                            identNo: null,
                            telphone: null,
                            address: null
                        };
                        yufp.extend(comitData, myform.formModel);

                        yufp.service.request({
                            method: 'POST',
                            url: backend.actService + '/api/fcicust/create',
                            data: comitData,
                            callback: function(code, message, response) {
                                if (response.code === '0') {
                                    vue.dialogFormVisible = false;
                                    vue.$message({ message: '客户开户成功!', type: 'info' });
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

                    var comitData = {
                        custId: null,
                        custName: null,
                        custType: null,
                        custStatus: null,
                        identType: null,
                        identNo: null,
                        telphone: null,
                        address: null
                    };

                    yufp.extend(comitData, myform.formModel);

                    yufp.service.request({
                        method: 'POST',
                        url: backend.actService + '/api/fcicust/update',
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
                    } else if (status === 'consumer') {
                        this.mainGrid.currentRow = row;
                        this.openConsumerFn(row);
                    }
                },
                openConsumerFn: function(row) {

                    var me = this;

                    me.consumer.formdata = {
                        custId: null,
                        custName: null,
                        moneyAmount: null,
                        scoreAmount: null,
                        amount: null
                    };

                    this.dialogStatus = 'consumer';
                    this.consumer.visible = true;

                    this.queryScoreTrans(row);

                },
                queryScoreTrans: function(row) {
                    if (row == '') {
                        row = this.consumer.formdata;
                    }
                    var me = this;

                    this.consumer.dataUrl = backend.scoreService + '/api/scoretrans/index?custId=' + row.custId;
                    this.$nextTick(function() {
                        this.$refs.mytableConsumer.remoteData();

                        me.consumer.formdata.custId = row.custId;
                        me.consumer.formdata.custName = row.custName;

                        //查询余额
                        yufp.service.request({
                            method: 'GET',
                            url: backend.actService + '/api/act/index?custId=' + row.custId,
                            data: null,
                            callback: function(code, message, response) {
                                if (response.code === '0' && response.data != null) {
                                    me.consumer.formdata.moneyAmount = response.data[0].amount;
                                } else {
                                    me.consumer.formdata.moneyAmount = 0;
                                    //vue.$message({message: response.message, type: response.level});
                                }
                            }
                        });

                        //查询积分
                        yufp.service.request({
                            method: 'GET',
                            url: backend.scoreService + '/api/score/index?custId=' + row.custId,
                            data: null,
                            callback: function(code, message, response) {
                                if (response.code === '0' && response.data != null) {
                                    me.consumer.formdata.scoreAmount = response.data[0].amount;
                                } else {
                                    me.consumer.formdata.scoreAmount = 0;
                                    //vue.$message({message: response.message, type: response.level});
                                }
                            }
                        });
                    });
                },
                postConsumer: function() {
                    var me = this;

                    //消费
                    yufp.service.request({
                        method: 'GET',
                        url: backend.compositeService + '/api/zy/transfer?custId=' + me.consumer.formdata.custId + '&amount=' + me.consumer.formdata.amount,
                        data: null,
                        callback: function(code, message, response) {

                            if (response.code === '0') {
                                me.$message({ message: '提交成功', type: 'info' });
                                me.consumer.formdata.amount = '';
                            } else {
                                me.consumer.formdata.amount = '';
                                var msg = response.message;
                                if (msg.indexOf('message') > 0) {
                                    msg = msg.substr(msg.indexOf('message') + 7);
                                    if (msg.indexOf('path') > 0) {
                                        msg = msg.substr(0, msg.indexOf('path'));
                                    }
                                    var x = msg.split("\"");

                                    if (x != null && x.length > 3) {
                                        msg = x[2];
                                    }
                                }

                                me.$message({ message: msg, type: 'error' });
                            }
                        }
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