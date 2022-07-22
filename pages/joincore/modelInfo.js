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
          pubtableColumns: [
            {label: '模型编号', prop: 'modelId', width: '190', resizable: true},
            {label: '模型名称', prop: 'modelName', width: '190', resizable: true},
            {label: '版本号', prop: 'versionId', width: '190', resizable: true},
            {label: '状态', prop: 'sts', width: '190', dataCode: 'STS', resizable: true},
            {label: '创建人', prop: 'creatorId', width: '190', resizable: true},
            {label: '创建时间', prop: 'createDate', width: '190', resizable: true}
          ],
          versionUrl: backend.adminService + '/api/cimfmmversioninfo/selectBusiInfo'
        };
      },
      methods: {

      },
      mounted: function () {
        var param = {
          condition: JSON.stringify({
            id: data.bizSeqNo
          })
        };
        this.$refs.pubtable.remoteData(param);
      }
    });
  };
});