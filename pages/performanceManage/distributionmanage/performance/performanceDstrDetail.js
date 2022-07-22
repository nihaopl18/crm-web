/**
 * Created by yumeng on 2017/11/26.
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

                    dataUrl: backend.appBaseService + '/api/pmamiddistribute/queryMidHis'
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
                // console.log(data.bizSeqNo);
                this.$refs.yutable1.remoteData(param);
            }
        });
    };
});