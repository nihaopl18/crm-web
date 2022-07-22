/**
 * @created by 张成龙 on 2019-1-25 14:51:44
 * @updated by
 * @description 基金认购计算器
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          formdata: {},
          searchformdata: {}, // 查询数据绑定
          readFlag: true,
          height: yufp.frame.size().height - 103,
          grpFormHeight: yufp.frame.size().height - 103 - 127 + 'px',
          formDisabled: false,
          // 数字校验
          rules: {// 校验规则
            all: [{required: true, message: '字段不能为空'},
              { validator: yufp.validator.gZero, message: '请输入数字', trigger: 'blur' }
            ],
            allowBlank: [{required: true, message: '字段不能为空'}]
          }
        };
      },
      /**
       * 初始参数
       */
      mounted: function () {
        // var _this = this;
        // _this.setValue();
      },
      methods: {
        /**
         * 计算
         */
        calculate: function () {
          var _this = this;
          var validate = false;
          _this.$refs.searchFrom.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var condtion = {};
          var param1 = _this.searchformdata.param1;
          var param2 = _this.searchformdata.param2;
          var param3 = _this.searchformdata.param3;
          condtion.param1 = param1;
          condtion.param2 = param2;
          condtion.param3 = param3;
          _this.calc(condtion);
        },
        /**
 * 计算方法
        */ calc: function (condtion) {
          var _this = this;
          var resultMoney1;
          var resultMoney2;
          var resultMoney3;
          resultMoney1 = parseFloat(condtion.param2) - (parseFloat(condtion.param2) / (1 + parseFloat(condtion.param3 * 0.01)));
          resultMoney2 = parseFloat(condtion.param2) - resultMoney1;
          resultMoney3 = resultMoney2 / parseFloat(condtion.param1);
          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
         * 重置查询条件和结果
         */
        restSeacher: function () {
          var _this = this;
          // var from = _this.$refs.searchFrom;
          // console.log(from);
          _this.$nextTick(function () {
            _this.$refs.searchFrom.resetFields();
            _this.$refs.refForm.resetFields();
          });
          // _this.setValue();
        },

        /**
         * 为界面赋初始值
         */
        setValue: function () {
          var _this = this;
          // var from = _this.$refs.searchFrom;
          var from = {};
          // from.curr = 'CNY';
          from.txsj = new Date();
          _this.$nextTick(function () {
            yufp.clone(from, _this.searchformdata);
          });
        }
      }
    });
  };
});