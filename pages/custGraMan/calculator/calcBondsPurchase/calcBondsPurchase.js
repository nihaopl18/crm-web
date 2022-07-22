/**
 * @created by 张成龙 on 2019-1-25 10:53:01
 * @updated by
 * @description 债券认购计算器
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
          pmlv: true,
          rgrq: true,
          lxzfpl: true,
          // 数字校验
          rules: {// 校验规则
            all: [{required: true, message: '字段不能为空'},
              { validator: yufp.validator.gZero, message: '请输入数字', trigger: 'blur' }
            ],
            allowBlank: [{required: true, message: '字段不能为空'}]
          },
          options: [
            {key: '0', value: '贴现债券(认购价格大于债券面额则无收益)'},
            {key: '1', value: '到期一次还本付息债券'},
            {key: '2', value: '固定利率附息债券和浮动利率债券'}
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
          var param1 = _this.searchformdata.param1;
          var param2 = _this.searchformdata.param2;
          var param3 = _this.searchformdata.param3;
          var param4 = _this.searchformdata.param4;
          var param5 = _this.searchformdata.param5;
          var param6 = _this.searchformdata.param6;
          var param7 = _this.searchformdata.param7;

          var param6 = yufp.util.dateFormat(param6, '{y}-{m}-{d}');
          _this.calc(parseInt(param1), param2, param3, param4, param5, param6, param7);
        },
        /**
 * 计算方法
        */ calc: function (options, Cost, BuyPrice, Years, Rate, BuyDate, Freq) {
          var _this = this;
          var w, m;
          var pv, x, s, e, isetp, ret = 0;
          var CurrDate = new Date();
          // 贴现债券
          if (options == 0) {
            // options=0;
            Cost = parseFloat(Cost);
            BuyPrice = parseFloat(BuyPrice);
            Years = parseInt(Years);
          }
          // 到期一次还本付息债券
          if (options == 1) {
            // options=1;
            Cost = parseFloat(Cost);
            BuyPrice = parseFloat(BuyPrice);
            Years = parseInt(Years);
            Rate = parseFloat(Rate) / 100;
          }
          // 固定利率和浮动利率
          if (options == 2) {
            // options=2;
            Cost = parseFloat(Cost);
            BuyPrice = parseFloat(BuyPrice);
            Years = parseInt(Years);
            Rate = parseFloat(Rate) / 100;
            Freq = parseInt(Freq);

            CurrDate = _this.strToDate(BuyDate);
            CurrDate.setYear(CurrDate.getYear() + Years);
          }
          switch (options) {
          case 0:
            ret = (Cost - (BuyPrice * 1.0)) / (BuyPrice * Years);
            break;
          case 1:
            ret = Math.pow((Cost + (Years * Cost * Rate)) / BuyPrice, 1.0 / Years) - 1;
            break;
          case 2:
            m = Years * Freq;
            w = 1;
            isetp = 0.0001;
            s = 0.001;
            e = 1;
            pv = 0;
            x = (1 - isetp) / 2;
            while ((Math.abs(pv - BuyPrice) > 0.001) && (Math.abs(e - s) > isetp)) {
              pv = _this.calco(x, w, m, Cost, Rate, Freq);
              if (pv == 0) {
                break;
              }
              if (pv < BuyPrice) {
                e = x;
                x = s + ((e - s) / 2);
              }
              if (pv > BuyPrice) {
                s = x;
                x = s + ((e - s) / 2);
              }
            }
            ret = x;
            break;
          }
          var from = {};
          from.resultMoney1 = (ret * 100).toFixed(2);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },
        /**
         *计算值
         */
        calco: function (x, w, m, Cost, Rate, Freq) {
          var y = 0;
          for (var i = w; i <= w + m - 1; i++) {
            y = y + ((Cost * Rate / Freq) / Math.pow(1 + (x / Freq), i));
          }
          y = y + (Cost / Math.pow(1 + (x / Freq), w + m - 1));
          return y;
        },
        /**
         *转化时间
         */
        strToDate: function (str) {
          var arrayx = str.split('-');
          var datex = new Date(arrayx[0], arrayx[1] - 1, arrayx[2]);
          return datex;
        },
        /**
         * 展示项变动
         */
        setShow: function () {
          var _this = this;
          var optinos = _this.searchformdata.param1;
          if (optinos == '0') {
            _this.pmlv = false;
            _this.rgrq = false;
            _this.lxzfpl = false;
          }
          if (optinos == '1') {
            _this.pmlv = true;
            _this.rgrq = false;
            _this.lxzfpl = false;
          }
          if (optinos == '2') {
            _this.pmlv = true;
            _this.rgrq = true;
            _this.lxzfpl = true;
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
          // from.curr = 'CNY';
          from.param6 = new Date();
          _this.$nextTick(function () {
            yufp.clone(from, _this.searchformdata);
          });
        }
      }
    });
  };
});