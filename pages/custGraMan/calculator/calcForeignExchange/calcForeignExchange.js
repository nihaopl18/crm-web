/**
 * @created by 张成龙 on 2019-1-25 17:49:28
 * @updated by
 * @description 外汇兑换计算器
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
          name1: '汇率',
          param5: true,
          // 数字校验
          rules: {// 校验规则
            all: [{required: true, message: '字段不能为空'},
              { validator: yufp.validator.gZero, message: '请输入数字', trigger: 'blur' }
            ],
            allowBlank: [{required: true, message: '字段不能为空'}]
          },
          options1: [{key: '1', value: '直接标价汇率'},
            {key: '2', value: '间接标价汇率'}],
          options2: [{key: '1', value: '兑入'},
            {key: '2', value: '兑出'}]
        };
      },
      /**
       * 初始参数
       */
      mounted: function () {
        var _this = this;
        _this.setValue();
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
          var param4 = _this.searchformdata.param4;
          var param5 = _this.searchformdata.param5;


          condtion.param1 = param1;
          condtion.param2 = param2;
          condtion.param3 = param3;
          condtion.param4 = param4;
          condtion.param5 = param5;

          _this.calc(condtion);
        },
        /**
 * 计算方法
        */ calc: function (condtion) {
          var _this = this;
          var resultMoney1 = 0;
          // 兑入
          if (condtion.param2 == '1') {
            if (condtion.param1 == '1') {
              resultMoney1 = parseFloat(condtion.param4) * parseFloat(condtion.param5);
            }
            if (condtion.param1 == '2') {
              resultMoney1 = parseFloat(condtion.param4) / parseFloat(condtion.param5);
            }
          //  outputForm.getForm().findField('RESULT_MONEY').setValue(resultMoney.toFixed(4));
          }
          // 兑出
          if (condtion.param2 == '2') {
            resultMoney1 = parseFloat(condtion.param4) / parseFloat(condtion.param5);
          }
          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
         * 设置hl
         */
        setHl: function () {
          var _this = this;
          var param2 = _this.searchformdata.param2;
          if (param2 == '1') {
            _this.name1 = '汇率';
          } else if (param2 == '2') {
            _this.name1 = '现钞卖出价';
          }
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
          _this.setValue();
        },
        /**
         * 为界面赋初始值
         */
        setValue: function () {
          var _this = this;
          // var from = _this.$refs.searchFrom;
          var from = {};
          from.param1 = '1';
          from.param2 = '1';
          _this.$nextTick(function () {
            yufp.clone(from, _this.searchformdata);
          });
        }
      }
    });
  };
});