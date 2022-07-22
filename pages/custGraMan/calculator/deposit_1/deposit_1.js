/**
 * @Created by 张成龙 zhangcl3@yusys.com.cn on 2019-1-23 09:38:23.
 * @updated by
 * @description 活期存款计算器
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
            all: [{ required: true, message: '字段不能为空' },
            { validator: yufp.validator.gZero, message: '请输入数字', trigger: 'blur' }
            ],
            allowBlank: [{ required: true, message: '字段不能为空' }]
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

          var curr = _this.searchformdata.curr;
          var qcrq = _this.searchformdata.qcrq;
          var zzrq = _this.searchformdata.zzrq;
          var crbj = _this.searchformdata.crbj;
          var nlv = _this.searchformdata.nlv;
          _this.calc(curr, qcrq, zzrq, crbj, nlv);
        },
        /**
 * 计算方法
        */ calc: function (curr, qcrq, zzrq, crbj, nlv) {
          var _this = this;
          // 每段开始日期

          var strDate = qcrq.getFullYear() + '-' + ((qcrq.getMonth() + 1) < 10 ? '0' + (qcrq.getMonth() + 1) : qcrq.getMonth() + 1) + '-' + (qcrq.getDate() < 10 ? '0' + qcrq.getDate() : qcrq.getDate());
          var dateA = new Date(strDate);
          // 每段结束日期
          var dateB = this.calcNextDate(dateA);
          // 终止日期(由用户输入)
          var endDate = zzrq.getFullYear() + '-' + ((zzrq.getMonth() + 1) < 10 ? '0' + (zzrq.getMonth() + 1) : zzrq.getMonth() + 1) + '-' + (zzrq.getDate() < 10 ? '0' + zzrq.getDate() : zzrq.getDate());
          var endD = new Date(endDate);
          // 利息总和，结果需要值
          var intes = 0;
          // 本利和，结果需要值
          var total = 0;
          // 利息税总和，结果需要值
          var tax = 0;
          // 利息税率, 暂定为0, 可更改
          var taxRate = 0;
          // 日利率, 由年利率得到 (年利率由用户输入)
          var rate = nlv / 36000;
          // 本金(由用户输入)
          var putin = crbj;
          // 校验起存日期和终止日期是否符合规范
          if (dateA > endD) {
            _this.$message({ message: '起存日期必须小于终止日期，请重新输入', type: 'warning' });
            return false;
          }
          /*
	         * 第一次比较，若本段结束日期超出终止日期则没有利息(税),只有本金
	         * （即：用户输入日期区间没有达到结息日）
	         */
          if (dateB > endD) {
            var days = (endD - dateA) / 86400000;
            intes = putin * rate * days;
            total = putin;
            tax = 0;
          } else { // 否则, 开始计算利息
            // 利息=本金*日利率*(本段日期区间)
            var days = (dateB - dateA) / 86400000;
            intes = putin * rate * days;
            tax = intes * taxRate;
            total = putin + intes;

            // 本段利息计算完毕。把本段结束日期赋值给下段开始日期,下段结束日期由下段开始日期通过calc...方法获取
            dateA = dateB;
            dateB = this.calcNextDate(dateA);

            // 进入while循环(如果当段结束时间早于输入终止时间, 则执行一次循环)
            while (dateB < endD) {
              // 计算利息总和、利息税、本利和
              intes = intes + total * rate * ((dateB - dateA) / 86400000);
              tax = intes * taxRate;
              total = putin + intes;// 这里本利和是指：本金+迄今为止利息和

              // while循环的最后加入当段起止日期改换
              dateA = dateB;
              dateB = this.calcNextDate(dateA);
            }
            if (dateB >= endD) {
              intes = intes + total * rate * ((endD - dateA) / 86400000);
              tax = intes * taxRate;
              total = putin + intes;
            }
          }

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
         * 输入date计算下一个结息节点日的方法
         * @param date 传入date
         * return d 返回相应节点(3/6/9/12月20日)
         */
        calcNextDate: function (date) {
          var d1 = new Date(date.getFullYear(), 2, 20);
          var d2 = new Date(date.getFullYear(), 5, 20);
          var d3 = new Date(date.getFullYear(), 8, 20);
          var d4 = new Date(date.getFullYear(), 11, 20);
          if (date < d1) {
            return d1;
          }
          if (date < d2) {
            return d2;
          }
          if (date < d3) {
            return d3;
          }
          if (date < d4) {
            return d4;
          }
          return new Date(date.getFullYear() + 1, 2, 20);
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