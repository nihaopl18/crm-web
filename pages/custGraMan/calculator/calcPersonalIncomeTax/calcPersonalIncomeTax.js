/**
 * @created by 张成龙 on 2019-1-26 13:07:24
 * @updated by
 * @description 个人所得税计算器
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
          param3: false,
          param4: false,
          param5: false,
          // 数字校验
          rules: {// 校验规则
            all: [{required: true, message: '字段不能为空'},
              { validator: yufp.validator.gZero, message: '请输入数字', trigger: 'blur' }
            ],
            allowBlank: [{required: true, message: '字段不能为空'}]
          },
          incomeType: [
            {key: '1', value: '工资、薪金所得'},
            {key: '2', value: '全年一次性奖金'},
            {key: '3', value: '个体工商户的生产、经营所得'},
            {key: '4', value: '对企事业单位的承包经营、承租经营所得'},
            {key: '5', value: '劳务报酬所得'},
            {key: '6', value: '稿酬所得'},
            {key: '7', value: '特许权使用费所得'},
            {key: '8', value: '利息、股息、红利所得'},
            {key: '9', value: '财产租赁所得'},
            {key: '10', value: '财产转让所得'},
            {key: '11', value: '偶然所得'}
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
          var incomeType = Number(condtion.param1);
          switch (incomeType) {
          case 1:
            _this.calcPersonTax(condtion);// 工资、薪金所得
            break;
          case 2:
            _this.calcOneTimeBonusTax(condtion);// 全年一次性奖金
            break;
          case 3:
            _this.calcPersonalBussinessTax(condtion);// 个体工商户的生产、经营所得
            break;
          case 4:
            _this.calcRunBussinessTax(condtion);// 对企事业单位承包经营、承租经营所得
            break;
          case 5:
            _this.calcWorkPaidTax(condtion);// 劳务报酬所得
            break;
          case 6:
            _this.calcBookPaidTax(condtion);// 稿酬所得
            break;
          case 7:
            _this.calcSpecialUsingMoneyTax(condtion);// 特许权使用费所得
            break;
          case 8:
            _this.calcStockProfitTax(condtion);// 利息、股息、红利所得
            break;
          case 9:
            _this.calcPropertyRentTax(condtion);// 财产租赁所得
            break;
          case 10:
            _this.calcPropertyTransferTax(condtion);// 财产转让所得
            break;
          case 11:
            _this.calcAccidentalIncomeTax(condtion);// 偶然所得
            break;
          default:
            ;
          }
          // var from = {};
          // from.resultMoney1 = resultMoney1.toFixed(4);
          // from.resultMoney2 = resultMoney2.toFixed(4);
          // from.resultMoney3 = resultMoney3.toFixed(4);
          // _this.$nextTick(function () {
          //   yufp.clone(from, _this.formdata);
          // });
        },
        /**
         *1、工资薪资所得
         */
        calcPersonTax: function (condtion) {
          var _this = this;
          var resultMoney1 = 0;
          var resultMoney2 = 0;
          var resultMoney3 = 0;
          parseFloat;

          resultMoney1 = parseFloat(condtion.param4) + parseFloat(condtion.param3);
          // 定义应纳税所得额、税率和速算扣除数的数组
          var personalTaxMoney = [80000, 55000, 35000, 9000, 4500, 1500, 0];
          var rate = [0.45, 0.35, 0.30, 0.25, 0.20, 0.10, 0.03];
          var num = [13505, 5505, 2755, 1005, 555, 105, 0];
          var moneyForTax = Number(condtion.param2) - resultMoney1;
          for (var i = 0; i < personalTaxMoney.length; i++) {
            if (moneyForTax > personalTaxMoney[i]) {
              resultMoney2 = (moneyForTax * rate[i]) - num[i];
              break;
            }
          }
          resultMoney3 = Number(condtion.param2) - resultMoney2 - parseFloat(condtion.param3);

          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
         * 2、全年一次性奖金
         */
        calcOneTimeBonusTax: function (condtion) {
          var salary = Number(condtion.param5);// 当月工资薪资所得
          var resultMoney1 = 0;
          var resultMoney2 = 0;
          var resultMoney3 = 0;
          var _this = this;

          // 定义应纳税所得额、税率和速算扣除数的数组
          var bonusTaxMoney = [80000, 55000, 35000, 9000, 4500, 1500, 0];
          var rate = [0.45, 0.35, 0.30, 0.25, 0.20, 0.10, 0.03];
          var num = [13505, 5505, 2755, 1005, 555, 105, 0];
          if (salary > 5000) {
            resultMoney1 = 0;
            for (var i = 0; i < bonusTaxMoney.length; i++) {
              if ((Number(condtion.param2) / 12) > bonusTaxMoney[i]) {
                resultMoney2 = Number(condtion.param2 * rate[i]) - num[i];
                break;
              }
            }
          } else if (salary <= 5000) {
            resultMoney1 = 5000 - salary;
            for (var i = 0; i < bonusTaxMoney.length; i++) {
              if (((Number(condtion.param2) - resultMoney1) / 12) > bonusTaxMoney[i]) {
                resultMoney2 = ((Number(condtion.param2) - resultMoney1) * rate[i]) - num[i];
                break;
              }
            }
          }
          resultMoney3 = Number(condtion.param2) - resultMoney2;

          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
 * 3、个体工商户的生产、经营所得
 * @param condtion
 * @returns
 */
        calcPersonalBussinessTax: function (condtion) {
          var resultMoney1 = 0;
          var resultMoney2 = 0;
          var resultMoney3 = 0;
          var _this = this;
          // 定义应纳税所得额、税率和速算扣除数的数组
          var personalBussinessMoney = [100000, 60000, 30000, 15000, 0];
          var rate = [0.35, 0.30, 0.20, 0.10, 0.05];
          var num = [14750, 9750, 3750, 750, 0];
          resultMoney1 = 0;
          for (var i = 0; i < personalBussinessMoney.length; i++) {
            if (Number(condtion.param2) > personalBussinessMoney[i]) {
              resultMoney2 = (Number(condtion.param2) * rate[i]) - num[i];
              break;
            }
          }
          resultMoney3 = Number(condtion.param2) - resultMoney2;

          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
 * 4、对企事业单位的承包经营、承租经营所得
 * @param condtion
 * @returns
 */
        calcRunBussinessTax: function (condtion) {
          var resultMoney1 = 0;
          var resultMoney2 = 0;
          var resultMoney3 = 0;

          // 定义应纳税所得额、税率和速算扣除数的数组
          var runBussinessMoney = [100000, 60000, 30000, 15000, 0];
          var rate = [0.35, 0.30, 0.20, 0.10, 0.05];
          var num = [14750, 9750, 3750, 750, 0];
          resultMoney1 = 0;
          for (var i = 0; i < runBussinessMoney.length; i++) {
            if (Number(condtion.param2) > runBussinessMoney[i]) {
              resultMoney2 = (Number(condtion.param2) * rate[i]) - num[i];
              break;
            }
          }
          resultMoney3 = Number(condtion.param2) - resultMoney2;
          var _this = this;
          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },

        /**
 * 5、劳务报酬所得
 * @param condtion
 * @returns
 */
        calcWorkPaidTax: function (condtion) {
          var resultMoney1 = 0;
          var resultMoney2 = 0;
          var resultMoney3 = 0;

          // 定义应纳税所得额、税率和速算扣除数的数组
          var workPaidMoney = [50000, 20000, 0];
          var rate = [0.40, 0.30, 0.20];
          var num = [7000, 2000, 0];
          if (Number(condtion.param2) < 4000) {
            resultMoney1 = 800;
            resultMoney2 = (Number(condtion.param2) - 800) * 0.2;
          } else if (Number(condtion.param2) >= 4000) {
            resultMoney1 = Number(condtion.param2) * 0.20;
            for (var i = 0; i < workPaidMoney.length; i++) {
              if (Number(condtion.param2) > workPaidMoney[i]) {
                resultMoney2 = (Number(condtion.param2) * 0.80 * rate[i]) - num[i];
                break;
              }
            }
          }
          resultMoney3 = Number(condtion.param2) - resultMoney2;

          var _this = this;
          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
         * 6、稿酬所得
         * @param condtion
         * @returns
         */
        calcBookPaidTax: function (condtion) {
          var resultMoney1 = 0;
          var resultMoney2 = 0;
          var resultMoney3 = 0;

          if (Number(condtion.param2) < 4000) {
            resultMoney1 = 800;
            resultMoney2 = (Number(condtion.param2) - 800) * 0.20 * (1 - 0.30);
          } else if (Number(condtion.param2) >= 4000) {
            resultMoney1 = Number(condtion.param2) * 0.20;
            resultMoney2 = Number(condtion.param2) * (1 - 0.20) * 0.20 * (1 - 0.30);
          }
          resultMoney3 = Number(condtion.param2) - resultMoney2;
          var _this = this;
          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
         * 7、特许权使用费所得
         * @param condtion
         * @returns
         */
        calcSpecialUsingMoneyTax: function (condtion) {
          var resultMoney1 = 0;
          var resultMoney2 = 0;
          var resultMoney3 = 0;

          if (Number(condtion.param2) < 4000) {
            resultMoney1 = 800;
            resultMoney2 = (Number(condtion.param2) - 800) * 0.20;
          } else if (Number(condtion.param2) >= 4000) {
            resultMoney1 = Number(condtion.param2) * 0.20;
            resultMoney2 = Number(condtion.param2) * (1 - 0.20) * 0.20;
          }
          resultMoney3 = Number(condtion.param2) - resultMoney2;

          var _this = this;
          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
         * 8、利息、股息、红利所得
         * @param condtion
         * @returns
         */
        calcStockProfitTax: function (condtion) {
          var resultMoney1, resultMoney2, resultMoney3;
          resultMoney1 = 0;
          resultMoney2 = Number(condtion.param2) * 0.20;
          resultMoney3 = Number(condtion.param2) - resultMoney2;
          var _this = this;
          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
         * 9、财产租赁所得
         * @param condtion
         * @returns
         */
        calcPropertyRentTax: function (condtion) {
          var resultMoney1 = 0;
          var resultMoney2 = 0;
          var resultMoney3 = 0;

          if (Number(condtion.param2) < 4000) {
            resultMoney1 = 800;
            resultMoney2 = (Number(condtion.param2) - 800) * 0.20;
          } else if (Number(condtion.param2) >= 4000) {
            resultMoney1 = Number(condtion.param2) * 0.20;
            resultMoney2 = Number(condtion.param2) * (1 - 0.20) * 0.20;
          }
          resultMoney3 = Number(condtion.param2) - resultMoney2;

          var _this = this;
          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
         * 10、财产转让所得
         * @param condtion
         * @returns
         */
        calcPropertyTransferTax: function (condtion) {
          var resultMoney1, resultMoney2, resultMoney3;

          resultMoney1 = 0;
          resultMoney2 = Number(condtion.param2) * 0.20;
          resultMoney3 = Number(condtion.param2) - resultMoney2;

          var _this = this;
          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
 * 11、偶然所得
 * @param condtion
 * @returns
 */
        calcAccidentalIncomeTax: function (condtion) {
          var resultMoney1, resultMoney2, resultMoney3;

          resultMoney1 = 0;
          resultMoney2 = Number(condtion.param2) * 0.20;
          resultMoney3 = Number(condtion.param2) - resultMoney2;

          var _this = this;
          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        setParam5: function () {
          if (this.searchformdata.param1 == '2') {
            this.param5 = true;
            this.param3 = false;
            this.param4 = false;
          } else if (this.searchformdata.param1 == '1') {
            this.param3 = true;
            this.param4 = true;
            this.param5 = false;
          } else {
            this.param5 = false;
            this.param3 = false;
            this.param4 = false;
          }
        },
        /**
         * 重置查询条件和结果
         */
        restSeacher: function () {
          var _this = this;
          // var from = _this.$refs.searchFrom;
          // _this.onsole.log(from);
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