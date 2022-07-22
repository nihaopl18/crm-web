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
            {label: '账户编号:', prop: 'accountNo', resizable: true},
            {label: '账户名称:', prop: 'accountName', resizable: true},
            {label: '创建人:', prop: 'createUser', resizable: true},
            {label: '创建日期:', prop: 'createDate', resizable: true}
          ],
          versionUrl: backend.yuspClimpAcctService + '/api/acct/approvalaccoutlist',
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