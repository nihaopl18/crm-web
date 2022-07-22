/**
 * @Created by xujiawei xujy3@yusys.com.cn on 2020-6-30 16:19:48.
 * @updated by
 * @description 业绩认领
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  'libs/js-xlsx/xlsx.full.min.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('ACCT_ATTR');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var me = this;
        return {
          etlDate: '',
          dataUrl: '/api/pmafcdpinfo/querylist',
          formdata: {},
          rule: [
            { required: true, message: '必填项', trigger: 'blur' },
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          pickerOptions: {
            disabledDate: function (time) {
              return time.getTime() < me.etlDate.getTime();
            }
          },
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          loadingFlag: false
        };
      },
      created: function () {
        var _this = this;
        yufp.service.request({
          async: false,
          method: 'GET',
          url: backend.appBaseService + '/api/commondistribution/queryTimeState',
          callback: function (code, message, response) {
            var dateMonth = response.statDate;
            var year = parseInt(dateMonth.substring(0, 4));
            var month = parseInt(dateMonth.substring(4, 6));
            var day = parseInt('01');
            _this.etlDate = new Date(year, month, day);
          }
        });
      },
      methods: {
        loadedHandler: function () {
          var _this = this;
          _this.loadingFlag = false;
        },
        searchFn: function () {
          var _this = this;
          _this.$refs['refQuery'].validate(function (valid) {
            if (valid) {
              _this.loadingFlag = true;
              let model = {};
              yufp.clone(_this.$refs['refQuery'].formdata, model);
              var param = { condition: JSON.stringify(model) };
              _this.$refs.refTable.remoteData(param);
            } else {
              return;
            }
          });
        },
        // 重置按钮
        resetFn: function () {
          var _this = this;
          _this.$nextTick(function () {
            _this.$refs['refQuery'].resetFields();
          });
        },
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
        saveClaimFn: function () {
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
          var distrRateall = _this.formdata.distrRate;
          if (parseInt(distrRateall) > 100) {
            this.$message({ message: '认领比例和不能超出100!', type: 'warning' });
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: '/api/pmafcdpinfo/claim',
            data: model,
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$message(response.message);
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
         * 认领
         * 按钮
         */
        claimFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.formItemDisabled = true;
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