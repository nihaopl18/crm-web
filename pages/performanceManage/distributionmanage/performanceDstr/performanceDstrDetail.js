/**
 * Created by raop
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                return {
                    form: {
                        seqNo: data.bizSeqNo,
                        nodeName: data.nodeName,
                        currentNodeUser: data.currentNodeUser,
                        instanceId: data.instanceId,
                        wfSign: data.wfSign,
                        wfName: data.wfName
                    },

                    //dataUrl: backend.appBaseService + '/api/PmaFComDepAcctInfoResource/queryDepositHis'
                    dataUrl: backend.appBaseService + '/api/PmaFComDepCommResource/queryDepositHis',
                    params: {
                        condition: JSON.stringify(
                            { workType: '1',applyStsPp:'1'
                        }
                        )
                    }
                };
            },
            methods: {

            },
            mounted: function () {
                var param = {
                    condition: JSON.stringify({
                        id: data.bizSeqNo,
                        rateNotNull: 1
                    })
                };
                this.$refs.yutable1.remoteData(param);
            }
        });
    };
});