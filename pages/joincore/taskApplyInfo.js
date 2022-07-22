/**
 * Created by yangye on 2018/11/23.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('TASK_TYPE,TASK_STATE');
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
            // {label: '任务编号:', prop: 'taskId', width: '180',  resizable: true},
            {label: '任务名称:', prop: 'taskName', width: '508', resizable: true},
            {label: '任务类型:', prop: 'taskType', width: '180', resizable: true, dataCode: 'TASK_TYPE' },
            {label: '任务状态:', prop: 'taskState', width: '210', resizable: true, dataCode: 'TASK_STATE'},
            {label: '开始时间:', prop: 'startTime', width: '180', resizable: true},
            {label: '结束时间:', prop: 'endTime', width: '180', resizable: true}
          ],
          versionUrl: backend.adminService + '/api/cimftctaskpool/getApplyList',
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