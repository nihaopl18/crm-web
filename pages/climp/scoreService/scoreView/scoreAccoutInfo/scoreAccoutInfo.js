/**
 * @Created by panglx panglx@yusys.com.cn on 2018-12-27 09:48:55.
 * @updated by
 * @description 积分账户信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CERT_TYPE,CARD_NO');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '/trade/example/list',
          formdata: {},
          dialogVisible: false,
          formDisabled: false
        };
      },
      methods: {
        /**
        * 取消
       */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 账户明细查看
         */
        accountListFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogVisible = true;
          _this.formDisabled = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], _this.formdata);
          });
        }
      }
    });
  };
});