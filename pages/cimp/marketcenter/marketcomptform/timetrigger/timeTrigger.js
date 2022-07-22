/**
 * @created by 刘杰 on 2018/11/19.
 * @description 营销组件FORM表单-触发组件-时间触发
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
            {key: '1', value: '月'},
            {key: '2', value: '日期'},
            {key: '3', value: '时间'}
          ],
          selectValue1: [
            {key: '1', value: '1'},
            {key: '2', value: '2'},
            {key: '3', value: '3'},
            {key: '4', value: '4'},
            {key: '5', value: '5'},
            {key: '6', value: '6'},
            {key: '7', value: '7'},
            {key: '8', value: '8'},
            {key: '9', value: '9'},
            {key: '10', value: '10'},
            {key: '11', value: '11'},
            {key: '12', value: '12'}
          ],
          selectValue2: [
            {key: '1', value: '1'},
            {key: '2', value: '2'},
            {key: '3', value: '3'},
            {key: '4', value: '4'},
            {key: '5', value: '5'},
            {key: '6', value: '6'},
            {key: '7', value: '7'},
            {key: '8', value: '8'},
            {key: '9', value: '9'},
            {key: '10', value: '10'},
            {key: '11', value: '11'},
            {key: '12', value: '12'},
            {key: '13', value: '13'},
            {key: '14', value: '14'},
            {key: '15', value: '15'},
            {key: '16', value: '16'},
            {key: '17', value: '17'},
            {key: '18', value: '18'},
            {key: '19', value: '19'},
            {key: '20', value: '20'},
            {key: '21', value: '21'},
            {key: '22', value: '22'},
            {key: '23', value: '23'},
            {key: '24', value: '24'},
            {key: '25', value: '25'},
            {key: '26', value: '26'},
            {key: '27', value: '27'},
            {key: '28', value: '28'},
            {key: '29', value: '29'},
            {key: '30', value: '30'}
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