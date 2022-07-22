/**
 * Created by yangye on 2018/11/23.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('');
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
          pubtableColumns: [
            {label: '商户编号:', prop: 'merchantId', width: '300', resizable: true},
            {label: '商户名称:', prop: 'merchantName', width: '300', resizable: true},
            {label: '批次号:', prop: 'batchId', width: '300', resizable: true},
            {label: '列入黑名单原因:', prop: 'reason', resizable: true}
          ],
          versionUrl: backend.yuspClimpBparamService + '/api/blacklist/approvalbatchlist',
          initTableParams: {
            condition: JSON.stringify({
              batchId: data.bizSeqNo
            })
          }

        };
      },
      methods: {

      }
    });
  };
});