/**
 * @Created by 刘佳 liujia14@yusys.com.cn on 2020-4-7 16:46:11.
 * @updated by
 * @description 业绩测算
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('NATIONALITY,YESNO');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          rules1: {
            depositScale: [
              { required: true, message: '请输入存款规模', trigger: 'blur' },
              { validator: yufp.validator.gZero, message: '请输入数字', trigger: 'blur' }
            ],
            ftpRate: [
              { required: true, message: '请输入FTP利率', trigger: 'blur' },
              { validator: yufp.validator.digit, message: '请输入数字', trigger: 'blur' }
            ],
            depositRate: [
              { required: true, message: '请输入存款利率', trigger: ['blur', 'change'] },
              { validator: yufp.validator.digit, message: '请输入数字', trigger: ['blur', 'change'] }
            ],
            ftpIncome: [
              { required: true, message: '请计算FTP收益', trigger: 'blur' }
            ],
            bonusRate: [
              { required: true, message: '请输入奖金系数', trigger: 'blur' },
              { validator: yufp.validator.digit, message: '请输入数字', trigger: 'blur' }
            ]
          },
          formdata: {},
          formdata2: {},
          formdata3: {}
        };
      },
      mounted: function () {
        var _this = this;
        this.$nextTick(function () {
          _this.$refs.refForm.formdata.depositRate = 1.5;
        });
      },
      methods: {
        /**
         * 保存
         */
        saveFn: function () {
          var validate = false;
          var _this = this;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var comitData = {};
          yufp.clone(_this.$refs.refForm.formdata, comitData);
          _this.$refs.refForm2.formdata.ftpIncome = (comitData.depositScale * (comitData.ftpRate - comitData.depositRate)).toFixed(2);
        },
        saveFn2: function () {
          var validate = false;
          var _this = this;
          _this.$refs.refForm2.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var comitData = {};
          yufp.clone(_this.$refs.refForm2.formdata, comitData);
          _this.$refs.refForm3.formdata.advanceBonus = (comitData.ftpIncome * comitData.bonusRate).toFixed(2);
        },
        /**
         * 重置
         */
        resetFn: function () {
          var _this = this;
          _this.$refs.refForm.resetFields();
        }
      }
    });
  };
});