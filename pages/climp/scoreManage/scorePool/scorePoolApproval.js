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
            {label: '积分池编号:', prop: 'poolNo', resizable: true},
            {label: '积分池名称:', prop: 'poolName', resizable: true},
            {label: '积分池额度:', prop: 'poolScoreInitial', resizable: true},
            {label: '已用积分:', prop: 'poolScoreUsed', resizable: true},
            {label: '剩余积分:', prop: 'poolScoreSurplus', resizable: true},
            {label: '创建人:', prop: 'createUser', resizable: true}
          ],
          versionUrl: backend.yuspClimpPoolService + '/api/pool/poollist',
          initTableParams: {
            condition: JSON.stringify({
              bizSeqNo: data.bizSeqNo
            })
          }

        };
      },
      methods: {

      }
    });
  };
});