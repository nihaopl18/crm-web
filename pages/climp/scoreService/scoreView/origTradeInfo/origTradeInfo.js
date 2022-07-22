/**
 * @Created by yangye yangye@yusys.com on 2018-12-27 10:59:02.
 * @updated by
 * @description 原始交易查询
 */
define(function (require, exports) {
  /**
  * 页面加载完成时触发
  * @param hashCode 路由ID
  * @param data 传递数据对象
  * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS');
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
        * 交易详情详情
        */
        infoFn: function () {
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