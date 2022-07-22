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
          activeNames: ['1', '2', '3'],
          editFields: [{
            columnCount: 2,
            fields: [
              { label: '拜访时间', field: 'ip', type: 'timePicker' }
            ]
          }],
          timeValue2: '',
          timeValue1: ''
          /** 页面 提交、更新按钮 */
        };
      },
      methods: {
        close: function () {
          this.$options.ncmpobj.close();
        }
      },
      destroyed: function () {
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