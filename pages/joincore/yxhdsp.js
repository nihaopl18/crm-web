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
            instanceId: 'a8f55e5350e54dc696e6c24095c2fb00',
            wfSign: data.wfSign,
            wfName: data.wfName
          },
          pubtableColumns: [
            {label: '策划编号', prop: 'tempId', width: '80' },
            {label: '模板编号', prop: 'modelId', width: '80' },
            {label: '机构ID ', prop: 'orgId', width: '120', hidden: true},
            {label: '活动名称', prop: 'activityName', width: '140' },
            {label: '活动策划机构', prop: 'activityOrg', width: '140' },
            {label: '活动类型', prop: 'activityType', width: '120', dataCode: 'ACTIVITY_TYPE' },
            {label: '客户类型', prop: 'customerType', width: '90', dataCode: 'ACTIVITY_CUSTOMER_TYPE' },
            {label: '状态', prop: 'activitySts', width: '70', dataCode: 'ACTIVITY_STS' },
            {label: '开始时间', prop: 'startDate', width: '100' },
            {label: '结束时间', prop: 'endDate', width: '100' },
            {label: '营销策划说明', prop: 'activityDesc', width: '300' },
            {label: '创建人名称', prop: 'cratUsr', width: '120' },
            {label: '创建时间', prop: 'cratDt', width: '100' },
            {label: '最近更新人名称', prop: 'lastChgUsr', width: '120' },
            {label: '最近更新时间', prop: 'lastChgDt', width: '100' }
          ],
          Url: backend.adminService + '/api/marketplan/list',
          dataParams: {condition: JSON.stringify({id: data.bizSeqNo.slice(6)})}
        };
      },
      methods: {
      },
      mounted: function () {
      }
    });
  };
});