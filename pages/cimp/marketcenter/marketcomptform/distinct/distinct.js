/**
 * @created by zhuly6 on 2018/11/16.
 * @description 营销组件FORM表单-流程组件-去重
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
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        var _self = this;
        return {
          activeNames: ['1', '2', '3'],
          dialogVisibleAdd: false,
          currentRow: null,
          tableData: [{
            name1: '客户群一',
            name2: '50'
          },
          {
            name1: '客户群一',
            name2: '50'
          }]
        };
      },
      methods: {
        addFn: function () {
          var _self = this;
          _self.tableData.push({
            name1: '',
            name2: ''
          });
          this.currentRow.edit = true;
        },
        rowClickFn: function (row) {
          if (this.currentRow && this.currentRow !== row) {
            this.currentRow.edit = false;
          }
          row.edit = true;
          this.currentRow = row;
        },
        saveFn: function () {
          if (this.currentRow) {
            this.currentRow.edit = false;
          }
        }
      }
    });
  };
});