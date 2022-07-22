/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-1-21 16:07:04.
 * @updated by
 * @description 担保信息
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
    yufp.lookup.reg('CD0408,CD0302,CD0409,CD0442,CD0304,CD0366,CD0238,CD0294,CD0441,CD0295,CD0121,CD0427,CD0016,CD0011,CD0304,CD0126,CD0305,CD0142,CD0085,CD0303,CD0046,CD0085,CD0411,CD0330,CD0071,CD0386');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          pawnDataUrl: backend.custpersonService + '/api/acrmfagloanpawninfo/querylist/' + custId,
          gageDataUrl: backend.custpersonService + '/api/acrmfagloangagebasic/querylist/' + custId,
          guaranteeDataUrl: backend.custpersonService + '/api/acrmfagloanguarantee/querylist/' + custId,
          activeName: 'pawn',
          formdata: {},
          viewType: 'DETAIL',
          formDisabled: false,
          pawnDialogVisible: false,
          gageDialogVisible: false,
          guaranteeDialogVisible: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          pawnBtnShow: true
        };
      },
      methods: {
        handleClick: function () {

        },
        /**
         * 抵押物详情返回
         */
        pawncancelFn: function () {
          var _this = this;
          _this.pawnDialogVisible = false;
        },
        /**
         * 抵押物信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.pawnBtnShow = editable;
          _this.pawnDialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 抵押物详情
         */
        pawninfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.pawnTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.pawnrefForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        },
        rowDblClick: function (row, event) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.pawnrefForm.resetFields();
            yufp.clone(row, this.formdata);
          });
        },
        /**
         * 质押物详情返回
         */
        gagecancelFn: function () {
          var _this = this;
          _this.gageDialogVisible = false;
        },
        /**
         * 质押物信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus2: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.gageBtnShow = editable;
          _this.gageDialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 质押物详情
         */
        gageinfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.gageTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus2('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.gagerefForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        },
        rowDblClick2: function (row, event) {
          var _this = this;
          _this.switchStatus2('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.gagerefForm.resetFields();
            yufp.clone(row, this.formdata);
          });
        },
        /**
         * 质押物详情返回
         */
        guaranteecancelFn: function () {
          var _this = this;
          _this.guaranteeDialogVisible = false;
        },
        /**
         * 质押物信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus3: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.guaranteeBtnShow = editable;
          _this.guaranteeDialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 质押物详情
         */
        guaranteeinfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.guaranteeTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus3('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.guaranteeForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        },
        rowDblClick3: function (row, event) {
          var _this = this;
          _this.switchStatus3('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.guaranteeForm.resetFields();
            yufp.clone(row, this.formdata);
          });
        }
      }
    });
  };
});