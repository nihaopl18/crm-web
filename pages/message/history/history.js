define(function(require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('CHANNEL_TYPE');
        yufp.lookup.reg('MESSAGE_STATE');
        yufp.custom.vue({
            el: '#messageSendInfo',
            data: function() {
                var me = this;
                return {
                    height: yufp.custom.viewSize().height,
                    urls: {
                        dataUrl: backend.messageService + '/api/template/queryMessageResult/',
                        sendAgainUrl: backend.messageService + '/api/template/sendAgain/'
                    },
                    tableColumns: [
                        { label: '主键', prop: 'pkNo', resizable: true, hidden: true },
                        { label: '用户码', prop: 'userNo', resizable: true },
                        { label: '发送结果', prop: 'state', resizable: true, type: 'select', dataCode: 'MESSAGE_STATE' },
                        { label: '渠道类型', prop: 'channelType', resizable: true, type: 'select', dataCode: 'CHANNEL_TYPE' },
                        { label: '发送时间', prop: 'sendTime', resizable: true }
                    ],
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
                                    me.$refs.messageTable.remoteData(param);
                                }
                            }
                        },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
                    ],
                    queryFields: [
                        { placeholder: '用户码', field: 'userNo', type: 'input' },
                        { placeholder: '发送结果', field: 'state', type: 'select', options: [{ key: 'S', value: '成功' }, { key: 'F', value: '失败' }] },
                        /* { placeholder: '渠道类型', field: 'channelType',type:'select',dataCode: 'CHANNEL_TYPE'},*/
                        { placeholder: '发送时间', field: 'sendTime', type: 'input' }
                    ],
                    check: true
                };
            },
            methods: {
                sendAgain: function() {
                    if (this.$refs.messageTable.selections.length > 0) {
                        var pkNos = '';
                        if (this.$refs.messageTable.selections.length >= 1) {
                            for (var i = 0; i < this.$refs.messageTable.selections.length; i++) {
                                pkNos = pkNos + this.$refs.messageTable.selections[i].pkNo + ',';
                                if (this.$refs.messageTable.selections[i].state == 'S') {
                                    this.$message({ message: '发送成功的消息不可重发', type: 'warning' });
                                    return;
                                }
                            }
                        }
                        var me = this;
                        var comData = { pkNos: pkNos };
                        this.$confirm('您确定要重新发送消息吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(function() {
                            yufp.service.request({
                                method: 'POST',
                                data: comData,
                                url: me.urls.sendAgainUrl,
                                callback: function(code, message, response) {
                                    if (response.data == 0) {
                                        me.$message({ message: '发送成功', type: 'success' });
                                        me.$refs.messageTable.remoteData();
                                        yufp.util.butLogInfo(hashCode, '消息历史', '重发');
                                    } else {
                                        me.$message({ message: '发送失败', type: 'error' });
                                    }
                                }
                            });
                        });
                    } else {
                        this.$message({ message: '请先选择数据', type: 'warning' });
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