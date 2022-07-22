/**
 * @created by 张成龙 on 2019-1-23 18:53:32
 * @updated by
 * @description 整存整取计算器
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CURR');
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
          timeType: [
            // {key: '1', value: '一个月(外币)'},
            {key: '2', value: '三个月'},
            {key: '3', value: '六个月'},
            {key: '4', value: '1年'},
            {key: '5', value: '2年'},
            {key: '6', value: '3年(人民币)'},
            {key: '7', value: '5年(人民币)'}
          ]
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

          var curr = _this.searchformdata.curr;
          var qcrq = _this.searchformdata.qcrq;
          var timeType = _this.searchformdata.timeType;
          var crbj = _this.searchformdata.crbj;
          var nlv = _this.searchformdata.nlv;
          _this.calc(curr, qcrq, timeType, crbj, nlv);
        },
        /**
 * 计算方法
        */ calc: function (curr, qcrq, timeType, crbj, nlv) {
          var _this = this;


          /*
            * 开始定义/引入变量
            */
          // 起始日期(由用户输入)
          var startD = qcrq;
          // 日利率, 由年利率得到 (年利率由用户输入)
          var rate = nlv / 36000;
          // 本金(由用户输入)
          var putin = crbj;
          // 利息总和，结果需要值
          var intes = 0;
          // 本利和，结果需要值
          var total = 0;
          // 利息税总和，结果需要值
          var tax = 0;
          // 利息税率, 暂定为0, 可更改
          var taxRate = 0;

          /*
            * if语句分七种利率情况（分别对应7个时间跨度），进行计算
            * 其中：利率在if语句中用年利率（单位：%）
            *       利率在计算过程中折算为日利率
            * 另外，用startD起存日期计算出对应时间跨度的endD终止日期（更精确）
            *      用endD-startD经过这算可以得到精确天数
            * 公式：
            *       利息=本金*日利率*天数
            *       利息税=利息*利息税率
            *       本利和=本金+利息
            *                           【下同】
            */
          var time = timeType;
          if (time == 1) {
            // 计算endD终止日期
            var endD = new Date(startD.getFullYear(), startD.getMonth() + 1, startD.getDate());
            // 计算interv跨度精确天数
            var interv = (endD - startD) / 86400000;
            // 计算：利息，利息税，本利和
            intes = putin * rate * interv;
            tax = intes * taxRate;
            total = putin + intes;
          }
          if (time == 2) {
            var endD = new Date(startD.getFullYear(), startD.getMonth() + 3, startD.getDate());
            var interv = (endD - startD) / 86400000;
            intes = putin * rate * interv;
            tax = intes * taxRate;
            total = putin + intes;
          }
          if (time == 3) {
            var endD = new Date(startD.getFullYear(), startD.getMonth() + 6, startD.getDate());
            var interv = (endD - startD) / 86400000;
            intes = putin * rate * interv;
            tax = intes * taxRate;
            total = putin + intes;
          }
          if (time == 4) {
            var endD = new Date(startD.getFullYear() + 1, startD.getMonth(), startD.getDate());
            var interv = (endD - startD) / 86400000;
            intes = putin * rate * interv;
            tax = intes * taxRate;
            total = putin + intes;
          }
          if (time == 5) {
            var endD = new Date(startD.getFullYear() + 2, startD.getMonth(), startD.getDate());
            var interv = (endD - startD) / 86400000;
            intes = putin * rate * interv;
            tax = intes * taxRate;
            total = putin + intes;
          }
          if (time == 6) {
            var endD = new Date(startD.getFullYear() + 3, startD.getMonth(), startD.getDate());
            var interv = (endD - startD) / 86400000;
            intes = putin * rate * interv;
            tax = intes * taxRate;
            total = putin + intes;
          }
          if (time == 7) {
            var endD = new Date(startD.getFullYear() + 5, startD.getMonth(), startD.getDate());
            var interv = (endD - startD) / 86400000;
            intes = putin * rate * interv;
            tax = intes * taxRate;
            total = putin + intes;
          }
          // 结果小计
          var resultMoney1 = intes;// 应得利息
          var resultMoney2 = tax; // 应付利息税
          var resultMoney3 = intes - tax;// 实得利息
          var resultMoney4 = intes + putin;// 本息合计
          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(4);
          from.resultMoney2 = resultMoney2.toFixed(4);
          from.resultMoney3 = resultMoney3.toFixed(4);
          from.resultMoney4 = resultMoney4.toFixed(4);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
         * 设置利率
         */
        setlv: function () {
          var _this = this;
          var key = _this.searchformdata.timeType;
          switch (key * 1) {
          case 1:
            _this.searchformdata.nlv = 0.25;
            break;
          case 2:
            _this.searchformdata.nlv = 2.60;
            break;
          case 3:
            _this.searchformdata.nlv = 2.80;
            break;
          case 4:
            _this.searchformdata.nlv = 3.00;
            break;
          case 5:
            _this.searchformdata.nlv = 3.75;
            break;
          case 6:
            _this.searchformdata.nlv = 4.25;
            break;
          case 7:
            _this.searchformdata.nlv = 4.75;
            break;
          default:
            break;
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
          from.curr = 'CNY';
          from.qcrq = new Date();
          _this.$nextTick(function () {
            yufp.clone(from, _this.searchformdata);
          });
        }
      }
    });
  };
});