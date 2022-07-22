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
            instanceId: 'feec66f498994737a1e37e44294fccc2',
            wfSign: data.wfSign,
            wfName: data.wfName
          },
          pubtableColumns: [
            { label: '模型编号', prop: 'modelId', width: '', sortable: true, resizable: true },
            { label: '模型名称', prop: 'modelName', width: '', sortable: true, resizable: true },
            { label: '版本号', prop: 'versionId', width: '', sortable: true, resizable: true },
            { label: '申请理由', prop: 'applyConclusion', width: '', sortable: true, resizable: true },
            { label: '延期时间', prop: 'delayTime', width: '', sortable: true, resizable: true },
            { label: '审批状态', prop: 'approvalStatus', width: '', dataCode: 'APPROVAL_STATUS', sortable: true, resizable: true },
            { label: '申请人', prop: 'applicant', width: '', sortable: true, resizable: true },
            { label: '申请时间', prop: 'applyTime', width: '', resizable: true }
          ],
          versionUrl: backend.adminService + '/api/cimfmmdelayinfo/getModeldelayById',
          initTableParams: {
            condition: JSON.stringify({
              id: data.bizSeqNo
            })
          }

        };
      },
      methods: {

      }
    });
  };
});