/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-2-12 19:30:18.
 * @updated by
 * @description 客户接触信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0238,CD0330,CD0071,CD0332,CD0331,CD0016');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custpersonService + '/api/ocrmfwpschedulevisit/querylist/' + custId,

          activeName: 'touch',

          formdata: {},
          dialogVisible: false,
          formDisabled: false,
          inputIdDisabled: true,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          visitBtnShow: true
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
        handleClick: function () {

        },
        saveFn: function () {

        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          if (viewType == 'ADD') {
            _this.inputIdDisabled = false;
          } else {
            _this.inputIdDisabled = true;
          }
          _this.visitBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        }
      }
    });
  };
});