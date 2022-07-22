/**
 * @created by 张成龙 on 2019-2-21 14:55:21
 * @updated by
 * @description 贷款计算器
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
          tableHeight: 400,
          rules: {// 校验规则
            all: [{required: true, message: '字段不能为空'},
              { validator: yufp.validator.gZero, message: '请输入数字', trigger: 'blur' }
            ],
            allowBlank: [{required: true, message: '字段不能为空'}]
          },
          tableData: [],
          options: [
            {key: '1', value: '年度还款'},
            {key: '2', value: '半年还款'},
            {key: '3', value: '季度还款'},
            {key: '4', value: '月度还款'}
          ],
          options1: [
            {key: '1', value: '等额本息'},
            {key: '2', value: '到期还本'},
            {key: '3', value: '等额本金'}
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
          _this.resetTableData();
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
          var resultMoney2 = 0;
          var dkje = Number(condtion.param1);
          var dkqx = Number(condtion.param2);
          var dknlv = Number(condtion.param5) / 100;

          var hkfs = condtion.param3;
          var hkzq = condtion.param4;
          // {key: '1', value: '等额本息'},
          // {key: '2', value: '到期还本'},
          // {key: '3', value: '等额本金'}

          if (hkfs == '1') {
            var lv = dknlv / 12;
            switch (hkzq) {
            case '4':
              break;
            case '3':
              dkqx = parseInt(dkqx / 3);// 取有几个季度
              if (dkqx <= 0) {
                this.$message({ message: '贷款期限不满一个季度', type: 'warning' });
                return;
              }
              lv = lv * 3;// 季利率
              break;
            case '2':
              dkqx = parseInt(dkqx / 6);// 取有几个半年
              if (dkqx <= 0) {
                this.$message({ message: '贷款期限不满一个半年', type: 'warning' });
                return;
              }
              lv = lv * 6;// 半年利率
              break;
            case '1':
              dkqx = parseInt(dkqx / 12);// 取有几个年
              if (dkqx <= 0) {
                this.$message({ message: '贷款期限不满一个整年', type: 'warning' });
                return;
              }
              lv = dknlv;// 年利率
              break;
            default:
              break;
            }
            // 每月月供额
            var myhk = [dkje * lv * Math.pow(1 + lv, dkqx)] / [Math.pow(1 + lv, dkqx) - 1];
            resultMoney1 = dkqx * myhk;
            resultMoney2 = resultMoney1 - dkje;
            var a = dkje;
            for (var j = 1; j <= dkqx; j++) {
              var data = {};
              // 等额本息还贷第n个月还贷本金：
              //  B=a*i(1+i)^(n-1)/[(1+i)^N-1]
              var i = lv;
              var B = a * i * Math.pow(1 + i, j - 1) / [Math.pow(1 + i, dkqx) - 1];
              data.table1 = j;
              data.table2 = B.toFixed(2);
              data.table3 = (myhk - B).toFixed(2);
              data.table4 = myhk.toFixed(2);
              data.table5 = (dkje - B).toFixed(2);
              dkje -= B;
              this.tableData.push(data);
            }
          }
          if (hkfs == '2') {
            var lv = dknlv / 12;// 月利率
            switch (hkzq) {
            case '4':
              break;
            case '3':
              dkqx = parseInt(dkqx / 3);// 取有几个季度
              if (dkqx <= 0) {
                this.$message({ message: '贷款期限不满一个季度', type: 'warning' });
                return;
              }
              lv = lv * 3;// 季度利率
              break;
            case '2':
              dkqx = parseInt(dkqx / 6);// 取有几个半年
              if (dkqx <= 0) {
                this.$message({ message: '贷款期限不满一个半年', type: 'warning' });
                return;
              }
              lv = lv * 6;// 半年利率
              break;
            case '1':
              dkqx = parseInt(dkqx / 12);// 取有几个整年
              if (dkqx <= 0) {
                this.$message({ message: '贷款期限不满一个整年', type: 'warning' });
                return;
              }
              lv = dknlv;// 整年利率
              break;
            default:
              break;
            }
            resultMoney1 = (dkqx * dkje * lv) + dkje;
            resultMoney2 = resultMoney1 - dkje;
            for (var j = 1; j <= dkqx; j++) {
              var data = {};
              data.table1 = j;
              data.table2 = 0;
              if (j == dkqx) {
                data.table2 = dkje;
              }
              data.table3 = (dkje * lv).toFixed(2);
              data.table4 = Number(data.table3) + Number(data.table2);
              data.table5 = (dkje - data.table2).toFixed(2);
              dkje -= data.table2;
              this.tableData.push(data);
            }
          }
          // 等额本金
          if (hkfs == '3') {
            // 利率
            var lv = dknlv / 12;
            dkqx = dkqx / 1;
            switch (hkzq) {
            case '4':
              break;
            case '3':
              dkqx = parseInt(dkqx / 3);// 取有几个季度
              if (dkqx <= 0) {
                this.$message({ message: '贷款期限不满一个季度', type: 'warning' });
                return;
              }
              lv = lv * 3;// 季度利率
              break;
            case '2':
              dkqx = parseInt(dkqx / 6);// 几个半年
              if (dkqx <= 0) {
                this.$message({ message: '贷款期限不满一个半年', type: 'warning' });
                return;
              }
              lv = lv * 6;// 半年利率
              break;
            case '1':
              dkqx = parseInt(dkqx / 12);// 几个整年
              if (dkqx <= 0) {
                this.$message({ message: '贷款期限不满一个整年', type: 'warning' });
                return;
              }
              lv = lv * 12;// 年利率
              break;
            default:
              break;
            }
            var yhbj = dkje / dkqx;
            var lx = 0;// 总利息
            for (var j = 1; j <= dkqx; j++) {
              var mylx = dkje * lv;
              var data = {};
              dkje -= yhbj;
              data.table1 = j;
              data.table2 = yhbj.toFixed(2);
              data.table3 = mylx.toFixed(2);
              data.table4 = (Number(data.table2) + Number(data.table3)).toFixed(2);
              data.table5 = dkje.toFixed(2);
              this.tableData.push(data);
              lx += mylx;
            }
            resultMoney1 = lx + (yhbj * dkqx);
            resultMoney2 = lx;
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
        resetTableData: function () {
          var _this = this;
          _this.tableData = [];
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
            _this.resetTableData();
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
          from.param1 = '1';
          _this.$nextTick(function () {
            yufp.clone(from, _this.searchformdata);
          });
        }
      }
    });
  };
});