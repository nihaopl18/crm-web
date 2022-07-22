/**
 * Created by yangye on 2018/11/23.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('WF_APP_STATUS,LIST_TYPE,DISCOUNT_TYPE,CARD_TYPE,ENABLE_SIGN');
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
            {label: 'MCC编号:', prop: 'mccId', resizable: true},
            {label: '类别名称:', prop: 'listType', resizable: true, dataCode: 'LIST_TYPE'},
            {label: '优惠正常类:', prop: 'discountType', resizable: true, dataCode: 'DISCOUNT_TYPE'},
            {label: '卡类型:', prop: 'cardType', resizable: true, dataCode: 'CARD_TYPE'}
          ],
          versionUrl: backend.yuspClimpBparamService + '/api/whitelist/approvalmcclist',
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