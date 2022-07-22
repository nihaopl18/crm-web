/**
 * @created by 罗顺 on 2018/11/16.
 * @description 营销组件FORM表单-渠道组件-移动展业
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
        return {
          activeNames: ['1', '2', '3'],
          activeName1: 'person',
          activeName2: 'product',
          model: {
            beginTime: '',
            endTime: ''
          },
          rules: { beginTime: [{type: 'date', required: true, message: '请输入开始时间', trigger: 'change' }], endTime: [{type: 'date', required: true, message: '请输入结束时间', trigger: 'change' }] }
        };
      },
      methods: {
        reset: function () {
          this.$refs.myform.resetFields();
        },
        save: function () {
          var validate = false;
          this.$refs.myform.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          alert(this.$refs.myform.model);
          // 请调用服务进行后台保存
        },
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
  };
});