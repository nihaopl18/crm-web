/**
 * @created by 张成龙 on 2019-1-24 17:37:23
 * @updated by
 * @description 黄金认购计算器
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
          },
          jypz: [
            {key: '1', value: 'AUT+D'},
            {key: '2', value: 'AGT+D'}
          ],
          dkd: [
            {key: '1', value: '多单'},
            {key: '2', value: '空单'}
          ]
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
          var param4 = _this.searchformdata.param4;
          var param5 = _this.searchformdata.param5;
          var param6 = _this.searchformdata.param6;


          condtion.param1 = param1;
          condtion.param2 = param2;
          condtion.param3 = param3;
          condtion.param4 = param4;
          condtion.param5 = param5;
          condtion.param6 = param6;


          _this.calc(condtion);
        },
        /**
 * 计算方法
        */ calc: function (condtion) {
          var _this = this;
          var resultMoney1;
          var resultMoney2;
          if (condtion.param2 == '1') {
            // 多单情况
            // 认购费用= 认购手数*开仓价格*（1+手续费(万分之)）；
            // 预计盈亏=认购手数*（预计平仓价格-开仓价格）
            resultMoney1 = Number(condtion.param4) * Number(condtion.param5) * (1 + (Number(condtion.param2) * 0.0001));
            resultMoney2 = Number(condtion.param4) * (Number(condtion.param6) - Number(condtion.param5));
          } else if (condtion.param2 == '2') {
            // 空单情况
            // 认购费用= 认购手数*预计平仓价格*(1+手续费(万分之))；
            // 预计盈亏=认购手数*（开仓价格-预计平仓价格）
            resultMoney1 = Number(condtion.param4) * Number(condtion.param6) * (1 + (Number(condtion.param2) * 0.0001));
            resultMoney2 = Number(condtion.param4) * (Number(condtion.param5) - Number(condtion.param6));
          }

          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(2);
          from.resultMoney2 = resultMoney2.toFixed(2);
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