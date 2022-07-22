/**
 * @created by 刘杰 on 2018/11/19.
 * @description 营销组件FORM表单-营销组件-清单整合
 */
define(function (require, exports) {
/**
* 页面加载完成时触发
*@param hashCode 路由ID
* @param data 传递数据对象
* @param cite 页面站点信息
*/
  exports.ready = function (hashCode, data, cite) {
    // yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE');
    yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        return {
          formdata2: {},
          selectValue: [
            {key: '1', value: '是'},
            {key: '2', value: '否'}
          ],
          selectValue1: [
            {key: '1', value: '是'},
            {key: '2', value: '否'}
          ],
          selectValue2: [
            {key: '1', value: '黑名单1'},
            {key: '2', value: '黑名单2'}
          ],
          selectValue3: [
            {key: '1', value: '产品黑名单1'},
            {key: '2', value: '产品黑名单2'}
          ],
          selectValue4: [
            {key: '1', value: '产品1'},
            {key: '2', value: '产品2'}
          ],
          selectValue5: [
            {key: '1', value: '营销产品1'},
            {key: '2', value: '营销产品2'}
          ]
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
      },
      mounted: function () {

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