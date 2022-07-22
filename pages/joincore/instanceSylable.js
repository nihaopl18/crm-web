define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                return {
                    wifntableData: '',
                    tableList: data
                }
            },
            created: function () {
                let me = this;
                me.appyHande()
            },
            methods: {
                appyHande: function () {
                    let _this = this;
                    let seqno = _this.tableList.bizSeqNo
                    yufp.util.downTableList(seqno, function (data) {
                        if (data.length) {
                            for (let i = 0; i < data.length; i++) {
                                if (seqno === data[i].seqno) {
                                    _this.wifntableData = data[i]
                                }
                            }
                        }
                    })
                },
            }
        })
    }
}) 