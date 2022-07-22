/**
 * Created by yangxiao2 on 2018/10/23.
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
            { label: '标签编号', prop: 'tagNo', width: '100' },
            { label: '标签名称', prop: 'tagName', width: '150' },
            { label: '标签分组', prop: 'groupName', width: '100' },
            { label: '标签描述（统计规则)', prop: 'tagDesc', width: '180', showOverflowTooltip: true },
            { label: '标签时效性', prop: 'timelinesType', width: '100', dataCode: 'TIMELINES_TYPE' },
            { label: '加工方式', prop: 'processMode', width: '100', dataCode: 'PROCESS_MODE' },
            { label: '更新频率', prop: 'updateFrequency', width: '100', dataCode: 'UPDATE_FREQUENCY' },
            { label: '标签优先级', prop: 'tagPri', width: '100' },
            { label: '标签用途', prop: 'tagApply', width: '100', dataCode: 'TAG_APPLY' },
            { label: '标签生命周期', prop: 'tagLifecycle', width: '120', dataCode: 'TAG_LIFECYCLE' },
            { label: '有效标志', prop: 'ifAvailable', width: '100', dataCode: 'IF_AVAILABLE' },
            { label: '生效日期', prop: 'availableDate', width: '120' },
            { label: '失效日期', prop: 'disableDate', width: '120' },
            { label: '创建日期', prop: 'createDate', width: '120' },
            { label: '创建人', prop: 'createUser', width: '100' },
            { label: '创建机构', prop: 'createOrg', width: '100' },
            { label: '创建系统', prop: 'createSys', width: '100' }
          ],
          versionUrl: backend.adminService + '/api/cimfmmtagtagsinfo/getuploadtag',
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