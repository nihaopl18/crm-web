/**
 * @created by 张成龙 on 2019-1-24 10:33:03
 * @updated by
 * @description 贴现计算器
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
          var pmje = _this.searchformdata.pmje;
          var txsj = _this.searchformdata.txsj;
          var pmdqr = _this.searchformdata.pmdqr;
          var txnlv = _this.searchformdata.txnlv;
          var tzts = _this.searchformdata.tzts;
          if (txsj > pmdqr) {
            _this.$message({ message: '贴现时间必须小于票面到期日期，请重新输入', type: 'warning' });
            return false;
          }
          condtion.parm1 = pmje;
          condtion.parm2 = txsj;
          condtion.parm3 = pmdqr;
          condtion.parm4 = txnlv;
          condtion.parm5 = tzts;
          _this.calc(condtion);
        },
        /**
 * 计算方法
        */ calc: function (condtion) {
          var _this = this;

          var money = condtion.parm1; // 票面金额
          // var line = $(".line")
          var TxData = condtion.parm2;// 贴现日期
          var endData = condtion.parm3;// 汇票到期日
          var AdjustmentDays = condtion.parm5;// 调整天数
          var YearRate = condtion.parm4;// 年利率
          var thousand = 0;// 每十万
          var Cost = 0;// 其他费用
          /**
         *  计息天数  = 汇票到期日-贴现日期+调整天数；
         */
          var jxts;
          /**
         * 贴现利息 =票面金额*年利率*计息天数/360
         */
          var txlx;
          /**
         * 贴现金额=票面金额-贴现利息；
         */
          var txje;
          if (money && TxData && endData && AdjustmentDays) {
            var d1 = TxData;
            var d2 = endData;
            // console.log(d2 - d1)
            var TxData1 = yufp.util.dateFormat(TxData, '{y}-{m}-{d}');
            var endData1 = yufp.util.dateFormat(endData, '{y}-{m}-{d}');
            if (d2 - d1 > 0) {
              // 计息天数
              var DaysNum = Number(_this.daysBetween(TxData1, endData1)) + Number(AdjustmentDays);
              jxts = DaysNum;
              // 贴现利息
              var moneyNum = _this.formatnumber(Number(money), 5);
              var YearRateNum = Number(YearRate);
              var CostNum = Number(Cost);
              var thousandNum = Number(thousand);
              var DisInter = _this.formatnumber((moneyNum * YearRateNum * DaysNum / 36000) + (moneyNum / 10 * thousandNum) + CostNum, 2);
              txlx = DisInter;
              // 贴现金额；
              var TotalDiscount = _this.formatnumber(moneyNum - DisInter, 2);
              txje = TotalDiscount;
            }

            // 结果小计
            var resultMoney1 = jxts;// 计息天数
            var resultMoney2 = txlx; // 贴现利息
            var resultMoney3 = txje;// 贴现金额；
            var from = {};
            from.resultMoney1 = resultMoney1;
            from.resultMoney2 = resultMoney2;
            from.resultMoney3 = resultMoney3;
            _this.$nextTick(function () {
              yufp.clone(from, _this.formdata);
            });
          }
        },
        // 计算两个日期的天数
        daysBetween: function (DateOne, DateTwo) {
          var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
          var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
          var OneYear = DateOne.substring(0, DateOne.indexOf('-'));
          var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
          var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
          var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));
          var cha = (Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000;
          return Math.abs(cha);
        },
        // 保留后4位
        formatnumber: function (value, num) {
          var a, b, c, i;
          a = value.toString();
          b = a.indexOf('.');
          c = a.length;
          if (num === 0) {
            if (b !== -1) {
              a = a.substring(0, b);
            }
          } else { // 如果没有小数点
            if (b === -1) {
              a = a + '.';
              for (i = 1; i <= num; i++) {
                a = a + '0';
              }
            } else { // 有小数点，超出位数自动截取，否则补0
              a = a.substring(0, b + num + 1);
              for (i = c; i <= b + num; i++) {
                a = a + '0';
              }
            }
          }
          return a;
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


