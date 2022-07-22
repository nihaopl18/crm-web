define(function(require, exports) {
    //page加载完成后调用ready方法
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg("LOG_TYPE");
        // 日志类型下拉框
        var logvm = yufp.custom.vue({
            el: "#logManager",
            data: function() {
                var me = this;
                return {
                    exportCheck: !yufp.session.checkCtrl('export'),
                    deleteCheck: !yufp.session.checkCtrl('batchdelete'),
                    queryFields: [{
                        placeholder: '日志类型',
                        field: 'logTypeId',
                        type: 'select',
                        options: []
                    }, {
                        placeholder: '操作用户',
                        field: 'user',
                        type: 'input'
                    }, {
                        placeholder: '操作对象',
                        field: 'operObjId',
                        type: 'input'
                    }, {
                        placeholder: '操作时间从',
                        field: 'beginTime',
                        type: 'date',
                        pickerOptions: {
                            disabledDate: function(time) {
                                if (me.$children["0"].$refs.endTime["0"].value) {
                                    return time.getTime() > me.$children["0"].$refs.endTime["0"].value
                                }
                            }
                        }
                    }, {
                        placeholder: '操作时间至',
                        field: 'endTime',
                        type: 'date',
                        pickerOptions: {
                            disabledDate: function(time) {
                                if (me.$children["0"].$refs.beginTime["0"].value) {
                                    return time.getTime() < me.$children["0"].$refs.beginTime["0"].value
                                }
                            }

                        }
                    }],
                    dialogVisible: false,
                    checkbox: true,
                    height: yufp.custom.viewSize().height - 140,
                    dataUrl: backend.appCommonService + "/api/log/getlog",
                    dataParams: {},
                    tableColumns: [{
                        label: '操作者姓名',
                        prop: 'userName',
                        width: 130
                    }, {
                        label: '操作者机构',
                        prop: 'orgName',
                        headerAlign: 'center',
                        width: 120
                    }, {
                        label: '登录IP',
                        prop: 'loginIp',
                        headerAlign: 'center',
                        width: 120
                    }, {
                        label: '操作时间',
                        prop: 'operTime',
                        width: 150
                    }, {
                        label: '日志类型',
                        headerAlign: 'center',
                        prop: 'logTypeId',
                        width: 110,
                        type: "select",
                        dataCode: "LOG_TYPE",
                    }, {
                        label: '操作对象',
                        prop: 'operObjId',
                        headerAlign: 'center',
                        width: 130
                    }, {
                        label: '操作内容',
                        prop: 'content',
                        headerAlign: 'center'
                    }]
                };
            },
            methods: {
                queryMainGridFn: function(params) {
                    var me = this;
                    me.$refs.logtable.remoteData(params);
                },
                queryLogFn: function() {
                    var con = this.$refs.queryCon.fm;
                    var param = {
                        condition: JSON.stringify(con)
                    }
                    this.queryMainGridFn(param);
                },
                getSelection: function() {
                    this.$alert(this.$refs.logtable.selections, '提示');
                },
                getSelectedRow: function(row) {
                    // 获取选中行
                },
                deleteLogInfo: function() { //删除日志信息
                    var me = this;

                    var selects = this.$refs.logtable.selections;
                    if (selects.length == 0) {
                        me.$message("请至少选择一条数据", "警告");
                        return false;
                    }
                    me.$confirm('是否确定删除所选数据', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function() {
                        var params = "";
                        for (var i = 0; i < selects.length; i++) {
                            if (i == 0) {
                                params += selects[i].logId;
                            } else {
                                params += "," + selects[i].logId;
                            }
                        }
                        yufp.service.request({
                            url: backend.appCommonService + "/api/log/batchdelete/" + params,
                            method: 'post',
                            callback: function(code, message, response) {
                                me.$message("删除记录成功!", "提示");
                                me.queryMainGridFn();
                            }
                        });
                    }).catch(function() {});
                },
                exportLog: function() {
                    var me = this;
                    var con = {};

                    yufp.extend(con, me.$refs.queryCon.fm);

                    var selects = this.$refs.logtable.selections;

                    var params = [];
                    for (var i = 0; i < selects.length; i++) {
                        params[i] = selects[i].logId;
                    }

                    if (selects.length > 0) {
                        con['ids'] = params;
                    }
                    var url = backend.appCommonService + "/api/log/export?" + "condition=" + encodeURI(JSON.stringify(con));
                    yufp.util.download(url);
                    me.dialogVisible = false;
                    yufp.util.butLogInfo(hashCode, '日志查询', '导出');
                }
            },
            mounted: function() {
                var me = this;
                yufp.lookup.bind("LOG_TYPE", function(lookup) {
                    me.queryFields[0].options = lookup;
                });
            }
        });
    };

    exports.onmessage = function(type, message) {

    };
    //page销毁时触发destroy方法
    exports.destroy = function(id, cite) {

    }
})