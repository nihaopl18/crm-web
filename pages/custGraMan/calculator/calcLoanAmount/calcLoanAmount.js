/**
 * @created by 张成龙 on 2019-2-16 18:18:12
 * @updated by
 * @description 贷款金额计算器
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
          tableHeight: 400,
          formDisabled: false,
          tableData: [], // 表格数据
          rules: {// 校验规则
            all: [{required: true, message: '字段不能为空'},
              { validator: yufp.validator.gZero, message: '请输入数字', trigger: 'blur' } // 数字校验
            ],
            allowBlank: [{required: true, message: '字段不能为空'}]
          },
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
          var param6 = _this.searchformdata.param6;
          var param7 = _this.searchformdata.param7;
          var param8 = _this.searchformdata.param8;
          condtion.param1 = param1;
          condtion.param2 = param2;
          condtion.param3 = param3;
          condtion.param4 = param4;
          var paramDate = param5.getFullYear() + '-' + (param5.getMonth() >= 9 ? param5.getMonth() + 1 : '0' + (param5.getMonth() + 1)) + '-' + (param5.getDate() > 9 ? param5.getDate() : '0' + param5.getDate());
          condtion.param5 = paramDate;
          condtion.param6 = param6;
          condtion.param7 = param7;
          condtion.param8 = param8;

          _this.calc(condtion);
        },
        /**
 * 计算方法
        */ calc: function (condtion) {
          var _this = this;
          var resultMoney1 = 0;
          var resultMoney2 = 0;
          var resultMoney3 = 0;

          var gdk = Number(condtion.param1);// 公积金贷款额度
          var sdk = Number(condtion.param2);// 商住房贷款额度
          var dkqx = Number(condtion.param3) * 12;// 年 转换成月
          var hkzq = condtion.param4;
          var sh = condtion.param5; // 首次还款日
          var hkfs = condtion.param6;
          var glv = Number(condtion.param7) / 100 / 12; // 转换成月利率;
          var slv = Number(condtion.param8) / 100 / 12;// 转换成月利率;

          var pl = 1;
          switch (hkzq) {
          case '4':
            break;
          case '3':
            dkqx = parseInt(dkqx / 3);// 取有几个季度
            if (dkqx <= 0) {
              this.$message({ message: '贷款期限不满一个季度', type: 'warning' });
              return;
            }
            glv = glv * 3;// 季利率
            slv = slv * 3;
            pl *= 3;
            break;
          case '2':
            dkqx = parseInt(dkqx / 6);// 取有几个半年
            if (dkqx <= 0) {
              this.$message({ message: '贷款期限不满一个半年', type: 'warning' });
              return;
            }
            glv = glv * 6;// 半年利率
            slv = slv * 6;
            pl *= 6;
            break;
          case '1':
            dkqx = parseInt(dkqx / 12);// 取有几个年
            if (dkqx <= 0) {
              this.$message({ message: '贷款期限不满一个整年', type: 'warning' });
              return;
            }
            glv = glv * 12;// 年利率
            slv = slv * 12;
            pl *= 12;
            break;
          default:
            break;
          }
          Math.formatFloat = function (f, digit) {
            var m = Math.pow(10, digit);
            return parseInt(f * m, 10) / m;
          };
          if (hkfs == '1') {
            // 每月月供额 gmyhk 公积金   smyhk 商业
            var gmyhk = [gdk * glv * Math.pow(1 + glv, dkqx)] / [Math.pow(1 + glv, dkqx) - 1];
            if (glv == 0) {
              gmyhk = 0;
            }
            var smyhk = [sdk * slv * Math.pow(1 + slv, dkqx)] / [Math.pow(1 + slv, dkqx) - 1];
            if (slv == 0) {
              smyhk = 0;
            }
            resultMoney1 = Math.formatFloat(gdk + sdk, 10);
            resultMoney3 = Math.formatFloat((dkqx * gmyhk) + (dkqx * smyhk), 10);
            resultMoney2 = Math.formatFloat(resultMoney3 - resultMoney1, 10);
            var ga = gdk; // 公贷款总额
            var sa = sdk; // 商贷款总额
            for (var j = 1; j <= dkqx; j++) {
              var data = {};
              // 等额本息还贷第n个月还贷本金：
              //  B=a*i(1+i)^(n-1)/[(1+i)^N-1]
              var gB = 0;
              if (glv != 0) {
                gB = ga * glv * Math.pow(1 + glv, j - 1) / [Math.pow(1 + glv, dkqx) - 1];
              }
              var sB = 0;
              if (slv != 0) {
                sB = sa * slv * Math.pow(1 + slv, j - 1) / [Math.pow(1 + slv, dkqx) - 1];
              }
              if (j != 1) {
                sh = this.getNextDate(sh, pl);
              }
              data.table1 = j;
              data.table2 = sh;
              data.table3 = Math.formatFloat(gB + sB, 10).toFixed(2);
              data.table4 = Math.formatFloat(gmyhk + smyhk - gB - sB, 10).toFixed(2);
              data.table5 = Math.formatFloat(gmyhk + smyhk, 10).toFixed(2);
              data.table6 = Math.formatFloat(gdk + sdk - gB - sB, 10).toFixed(2);
              gdk -= gB;
              sdk -= sB;
              this.tableData.push(data);
            }
          }
          if (hkfs == '2') {
            var gze = (dkqx * gdk * glv) + gdk;
            var sze = (dkqx * sdk * slv) + sdk;
            resultMoney1 = gdk + sdk;
            resultMoney3 = gze + sze;
            resultMoney2 = resultMoney3 - resultMoney1;
            for (var j = 1; j <= dkqx; j++) {
              var data = {};
              if (j != 1) {
                sh = this.getNextDate(sh, pl);
              }
              data.table1 = j;
              data.table2 = sh;
              data.table3 = 0;
              if (j == dkqx) {
                data.table3 = resultMoney1;
              }
              data.table4 = Math.formatFloat((gdk * glv) + (sdk * slv), 10).toFixed(2);
              data.table5 = Math.formatFloat(Number(data.table3) + Number(data.table4), 10).toFixed(2);
              data.table6 = Math.formatFloat(gdk + sdk - data.table3, 10).toFixed(2);
              this.tableData.push(data);
            }
          }

          // 等额本金
          if (hkfs == '3') {
            var gyhbj = gdk / dkqx;
            var syhbj = sdk / dkqx;
            var ga = gdk; // 公贷款总额
            var sa = sdk; // 商贷款总额
            var lx = 0;// 总利息
            for (var j = 1; j <= dkqx; j++) {
              var gmylx = ga * glv;
              var smylx = sa * slv;
              var data = {};
              if (j != 1) {
                sh = this.getNextDate(sh, pl);
              }
              ga -= gyhbj;
              sa -= syhbj;
              data.table1 = j;
              data.table2 = sh;
              data.table3 = Math.formatFloat(gyhbj + syhbj, 10).toFixed(2);
              if (j == dkqx) {
                data.table3 = resultMoney1;
              }
              data.table4 = Math.formatFloat(gmylx + smylx, 10).toFixed(2);
              data.table5 = Math.formatFloat(Number(data.table3) + Number(data.table4), 10).toFixed(2);
              data.table6 = Math.formatFloat(ga + sa, 10).toFixed(2);
              this.tableData.push(data);
              lx += gmylx;
              lx += smylx;
            }
            resultMoney1 = gdk + sdk;
            resultMoney2 = lx;
            resultMoney3 = resultMoney1 + resultMoney2;
          }
          var from = {};
          from.resultMoney1 = resultMoney1.toFixed(2);
          from.resultMoney2 = resultMoney2.toFixed(2);
          from.resultMoney3 = resultMoney3.toFixed(2);
          _this.$nextTick(function () {
            yufp.clone(from, _this.formdata);
          });
        },

        /**
         * 返回当前日期的 下一 月,月 季， 半年， 年
         */
        getNextDate: function (date, flag) {
          var olddate = new Date(date.replace(/-/g, '/'));
          if (olddate.getDate() == '29' || olddate.getDate() == '30' || olddate.getDate() == '31') {
            var mo = (Number(olddate.getMonth()) + 1 + Number(flag)) % 12;// 取模
            if (mo == 2) {
              var checKYear = new Date(date.replace(/-/g, '/'));
              checKYear.setMonth(checKYear.getMonth() + flag);
              if (this.isLeapYear(Number(checKYear.getFullYear))) {
                olddate.setDate(29);
              } else {
                olddate.setDate(28);
              }
            } else if (mo == 4 || mo == 6 || mo == 9 || mo == 11) {
              // 小月处理
              if (olddate.getDate() == '31') {
                olddate.setDate(30);
              }
            }
          }
          olddate.setMonth(olddate.getMonth() + flag);
          var newDate = olddate.getFullYear() + '-' + (olddate.getMonth() >= 9 ? olddate.getMonth() + 1 : '0' + (olddate.getMonth() + 1)) + '-' + (olddate.getDate() > 9 ? olddate.getDate() : '0' + olddate.getDate());
          return newDate;
        },

        // JS判断闰年代码
        isLeapYear: function (Year) {
          if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
            return true;
          } else {
            return false;
          }
        },
        /**
         * 改变
         */
        setResultMoney: function () {
          if (this.searchformdata.param1 == '1') {
            this.resultMoney1 = '年金终值(元)';
          } else {
            this.resultMoney1 = '年金现值(元)';
          }
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