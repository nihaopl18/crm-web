/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-1-21 13:58:21.
 * @updated by
 * @description 签约信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发 尼玛
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0355,CD0397,CD0328,CD0330,CD0071,CD0314');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custpersonService + '/api/acrmfagchlsignbaseinfo/querylist/' + custId,

          activeName: 'sign',

          formdata: {},
          viewType: 'DETAIL',
          dialogVisible: false,
          formDisabled: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          signBtnShow: true
        };
      },
      methods: {
        /**
         * 存款详情返回
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        handleClick: function () {

        },
        /**
         * 存款信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.signBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 存款详情
         */
        signinfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.signTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.signForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        }
      }
    });
  };
});