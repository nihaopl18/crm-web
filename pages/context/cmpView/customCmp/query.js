/**
 * @created by helin3 on 2018/07/18.
 * @description 查询
 */
define(function (require, exports) { 
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE');
    yufp.custom.vue({
      el: cite.el,
      //特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        var _self = this;
        return {
          /** 查询字段 */
          queryFields: [
            { placeholder: '客户类型', field: 'custType', type: 'select', dataCode: 'CUST_TYPE' },
            { placeholder: '客户状态', field: 'custStatus', type: 'select', dataCode: 'CUST_STAT' },
            { placeholder: '客户编号', field: 'custId', type: 'input' },
            { placeholder: '客户名称', field: 'custName', type: 'input' },
            { placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'IDENT_TYPE' },
            { placeholder: '证件号码', field: 'certNo', type: 'input' },
            { placeholder: '归属机构', field: 'belongOrg', type: 'input' },//, type:'custom',is:'yufp-org-tree',param:{needCheckbox:false}
            { placeholder: '归属客户经理', field: 'belongMgr', type: 'input' }//,type:'custom',is:'yufp-user-selector'
          ],
          /** 搜索按钮 */
          queryButtons: [
            {
              label: '搜索', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _self.$refs.reftable.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          /** 表格栏位 */
          tableColumns: [
            { label: '客户类型', prop: 'custType', width: '100', dataCode: 'CUST_TYPE', resizable: true },
            { label: '客户状态', prop: 'custStatus', width: '100', dataCode: 'CUST_STAT', resizable: true },
            { label: '客户编号', prop: 'custId', resizable: true },
            { label: '客户名称', prop: 'custName', width: '200', resizable: true },
            { label: '证件类型', prop: 'certType', dataCode: 'IDENT_TYPE', resizable: true },
            { label: '证件号码', prop: 'certNo', resizable: true },
            { label: '主协办类型', prop: 'mainType', resizable: true },
            { label: '归属机构', prop: 'belongOrg', resizable: true },
            { label: '归属客户经理', prop: 'belongMgr', resizable: true }
          ],
          height: 280
        }
      },
      methods: {
        close: function () {
          this.$options.ncmpobj.close();
        }
      },
      destroyed: function() {
        console.log('yufp.custom.vue---query.js---destroyed');
      }
    });
  };

  /**
   * 页面销毁时触发destroy方法
   * @param id 路由ID
   * @param cite 页面站点信息
   */
  exports.destroy = function (id, cite) {
    console.log('exports.destroy---query.js---destroy');
  }
});