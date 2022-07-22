/**
* @author houyx3
* @since 2018/07/18.
* @description 客户群客户贡献度信息
*/
define([
  './custom/widgets/js/YufpDemoSelector.js'
], function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  exports.ready = function (hashCode, data, cite) {
    var clientInfo = data.clientInfo;
    yufp.lookup.reg('RISK_TYPE,CD0375');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          contributionUrl: backend.custgroupService + '/api/ocrmfcicgmember/membercontribution', // 客户群客户对群共享度查询URL
          baseParam: {condition: JSON.stringify({custGroupId: clientInfo.custGroupId})},
          contributionInfoUrl: backend.custgroupService + '/api/ocrmfcicgmember/membercontribution1', // 贡献度详细查询URL
          /** 表格栏位 */
          tableColumns: [
            {label: '客户编号', prop: 'custId', width: '', resizable: true},
            {label: '客户名称', prop: 'custName', width: '', resizable: true},
            {label: '贡献度', prop: 'reportSum', width: '', resizable: true},
            {label: '统计时间', prop: 'dataDate', width: '', sortable: true, resizable: true}
          ],
          /** 贡献度详情显示表格 */
          contributionDetails: [
            { label: '贡献度类型', prop: 'busCat', width: '', resizable: true, dataCode: 'CD0375' },
            {label: '产品名称', prop: 'prodName', width: '', resizable: true},
            {label: '贡献度（折人民币）', prop: 'simProf', width: '', resizable: true},
            {label: '统计时间', prop: 'dataDate', width: '', resizable: true}
          ],
          dialogVisible: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        };
      },
      methods: {
        /** 详情方法 */
        infoFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          };
          // 获取单条客户ID号进行查询
          var custid = this.$refs.reftable.selections[0].custId;
          var param = { condition: JSON.stringify({ 'custId': custid }) };
          this.dialogVisible = true;
          this.$nextTick(function () {
            this.$refs.contributionRef.remoteData(param);
          });
        }
      }
    });
  };
});