/**
 * @Created by xujiawei xujy3@yusys.com.cn on 2020-7-13 13:54:18.
 * @updated by
 * @description 业务量金额区间折算系数管理
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/yufpOrgTree.js',
  'libs/js-xlsx/xlsx.full.min.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('BUS_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.appBaseService + '/api/pmafcoefficientamtrange/querylist',
          formdata: {},
          bizDisa: false,
          rule: [
            { required: true, message: '必填项', trigger: 'blur' },
            { validator: yufp.validator.zfNum, message: '数字', trigger: 'blur' }
          ],
          comRules: {
            amtCoefficient: [
              { required: true, message: '字段不能为空' },
              { validator: yufp.validator.zfNum, message: '数字'}
            ]
          },
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true
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
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var url = '/api/pmafcoefficientamtrange/add';
          if (_this.formdata.id) {
            url = '/api/pmafcoefficientamtrange/edit';
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: url,
            data: model,
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$message('操作成功');
              _this.dialogVisible = false;
            }
          });
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.bizDisa = false;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.id = null;
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          _this.bizDisa = true;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
          });
        },
        orgSelectFn: function (data) {
          this.formdata.orgId = data.orgId;
          this.formdata.orgName = data.orgName;
        }
      }
    });
  };
});