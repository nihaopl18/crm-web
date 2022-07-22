define(function(require, exports) {

    exports.ready = function(hashCode, data, cite) {

        //注册该功能要用到的数据字典
        yufp.lookup.reg('DATA_STS,YESNO,SYS_TYPE');

        var vm;
        vm = yufp.custom.vue({
            el: "#custAct",
            //以m_开头的属性为UI数据不作为业务数据，否则为业务数据
            data: function() {
                var me = this;

                return {
                    mainGrid: {
                        currentRow: null,
                        data: null,
                        total: null,
                        dataUrl: backend.actService + '/api/act/index',
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
                        tableColumns: [
                            { label: '账号', prop: 'acctNo', sortable: true, resizable: true },
                            { label: '客户编号', prop: 'custId', sortable: 'custom', resizable: true },
                            { label: '冻结金额', prop: 'freezeAmt', sortable: true, resizable: true, align: 'right' },
                            { label: '金额', prop: 'amount', type: 'date', sortable: true, resizable: true, align: 'right' },
                            { label: '开户日期', prop: 'openAccountDate', type: 'date', sortable: true, resizable: true },
                            { label: '所属机构', prop: 'orgNo', type: 'date', sortable: true, resizable: true },
                            { label: '币种', prop: 'curType', type: 'date', sortable: true, resizable: true },
                            { label: '账户状态', prop: 'accountStat', sortable: true, resizable: true, dataCode: "DATA_STS" },
                            { label: '执行利率', prop: 'rate', sortable: true, resizable: true }
                        ],
                    },

                    tradGrid: {
                        dialogVisible: false,
                        dataUrl: backend.actService + '/api/acttrad/index',
                        height: yufp.custom.viewSize().height - 140,
                        tableColumns: [
                            { label: '交易时间', prop: 'tradDt', sortable: true, resizable: true },
                            { label: '客户编号', prop: 'custId', sortable: 'custom', resizable: true },
                            { label: '账号', prop: 'acct', sortable: true, resizable: true },
                            { label: '交易金额', prop: 'tradMoney', type: 'date', sortable: true, resizable: true, align: 'right' },
                            { label: '账户余额', prop: 'acctBal', type: 'date', sortable: true, resizable: true, align: 'right' },
                            { label: '交易代码', prop: 'tradCode', type: 'date', sortable: true, resizable: true },
                            //{ label: '交易渠道', prop: 'tradChn',type:'date',sortable: true, resizable: true},
                            { label: '备注', prop: 'tradAbs', sortable: true, resizable: true }
                        ],
                    },
                    updateFields: [{
                        columnCount: 2,
                        fields: [
                            { field: 'acctNo', label: '账号' },
                            { field: 'custId', label: '客户编号' },
                            //{ field: 'freezeAmt', label: '冻结金额'},
                            //{ field: 'amount', label: '金额'},
                            //{ field: 'openAccountDate', label: '开户日期',type:'date'},
                            { field: 'orgNo', label: '所属机构' },
                            { field: 'curType', label: '币种' },
                            { field: 'accountStat', label: '账户状态', type: 'select', dataCode: "DATA_STS" }
                            //{ field: 'rate', label: '执行利率'},
                        ]
                    }],
                    dataParams: {},
                    formDisabled: false,
                    dialogFormVisible: false,
                    dialogStatus: false,
                    textMap: {
                        update: '修改',
                        create: '新增',
                        trad: '交易历史'
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
                        comitData.openAccountDate = this.formart(new Date());

                        yufp.service.request({
                            method: 'POST',
                            url: backend.actService + '/api/act/create',
                            data: comitData,
                            callback: function(code, message, response) {
                                if (response.code === '0') {
                                    vue.dialogFormVisible = false;
                                    vue.$message({ message: '账户开户成功!', type: 'info' });
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
                        url: backend.actService + '/api/act/update',
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
                    }
                },
                openTradFn: function(row) {
                    this.dialogStatus = 'trad';
                    this.tradGrid.dialogVisible = true;
                    this.tradGrid.dataUrl = backend.actService + '/api/acttrad/index?custId=' + row.custId;

                    var me = this;
                    this.$nextTick(function() {
                        me.$refs.mytableTrad.remoteData();
                    });
                },
                formart: function(val) {
                    var d = new Date(val);
                    var year = d.getFullYear();
                    var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
                    var date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
                    var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
                    var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
                    var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
                    return year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds;
                }

            }
        });
    };

    //消息处理
    exports.onmessage = function(type, message) {};

    //page销毁时触发destroy方法
    exports.destroy = function(id, cite) {};
});