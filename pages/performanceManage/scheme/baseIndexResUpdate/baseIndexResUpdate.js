/**
 * @Created by xujiawei xujy3@yusys.com.cn on 2020-1-6 14:33:17.
 * @updated by
 * @description 基础指标值调整
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/yufpSchemeSelector.js',
  './custom/widgets/js/yufpSchemeobjSelector.js',
  './custom/widgets/js/yufpSchemeindexSelector.js',
  './custom/widgets/js/yufpIndexresSelector.js',
  'libs/js-xlsx/xlsx.full.min.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID-
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('OBJ,YE_TYPE,INDEX_APPLY_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          objParams: {
            schemeId: ''
          },
          dataUrl: backend.appBaseService + '/api/pmafbaseindexres/querylist',
          formdata: {},
          rule: [
            { required: true, message: '必填项', trigger: 'blur' },
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          comRules: {
            statDate: [
              { required: true, message: '字段不能为空' }
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
        schemeSelectFn: function (data) {
          this.objParams.schemeId = data[0].schemeId;
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
          };
          // model.statDate = yufp.util.dateFormat(model.statDate, '{y}{m}{d}');
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.appBaseService + '/api/pmafbaseindexres/edit',
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
         * 修改
         */
        modifyFn: function () {
          var _this = this;
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
        }
      }
    });
  };
});