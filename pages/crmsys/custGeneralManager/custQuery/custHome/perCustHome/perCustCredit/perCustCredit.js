/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-1-21 13:58:21.
 * @updated by
 * @description 授信信息
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
    yufp.lookup.reg('CD0391,CD0392,CD0394,CD0370,CD0071,CD0393,CD0085,CD0396,CD0414,CD0372,CD0440');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custpersonService + '/api/acrmfagcreditlimitlist/querylist/' + custId,

          activeName: 'credit',

          formdata: {},
          viewType: 'DETAIL',
          dialogVisible: false,
          formDisabled: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          creditBtnShow: true
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
          _this.creditBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 存款详情
         */
        creditinfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.creditTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.creditfForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        },
        rowDblClick: function (row, event) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.creditfForm.resetFields();
            yufp.clone(row, this.formdata);
          });
        }
      }
    });
  };
});