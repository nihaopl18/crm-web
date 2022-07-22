/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-09 09:36:44
 * @update by:
 * @description:
 */

(function (vue, name) {
  yufp.lookup.reg('KIND_TYPE,ACCOUNT_TYPE,RATE_TYPE,CD0354,DY0008,RISKLEVEL,PAY_TYPE,YES_NO,PAY_TERM_TYPE,CD0162,CD0433,CD0353,CD0079,CD0433,CD0357,CD0315,CD0433,PROD_TYPE,PROD_STATUS,INCOME_FEATURES');
  vue.component(name, {
    template: '  <div>\
    <yu-panel title="产品持有详情" panel-type="simple">\
      <template slot="right">\
        <yu-button-group>\
          <yu-button v-for="btn in optionBtns" :key="btn.name" :type="activeBtn === btn.prodType ? \'danger\' : \'\'" plain @click="handleBtnChange(btn.prodType)">{{ btn.name }}</yu-button>\
        </yu-button-group>\
      </template>\
      <p style="text-align: right">\
        <yu-button-group>\
          <yu-button type="primary" @click="exportList(991)">全部导出</yu-button>\
        </yu-button-group>\
      </p>\
      <p class="product-title" v-if="loan">\
        <span>贷款</span>\
        <yu-button type="primary" @click="exportList(7)">导出</yu-button>\
      </p>\
      <yu-xtable ref="refTable4" key="DK" :data="tableData" :data-url="requestUrl" :base-params="condition7"  border style="width: 100%"  v-if="loan">\
        <yu-xtable-column prop="prodName" label="产品中文名" min-width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="loanNo" label="借据编号" width="120px"></yu-xtable-column>\
        <yu-xtable-column prop="ccy" label="币种" data-code="CD0433" width="100px" ></yu-xtable-column>\
        <yu-xtable-column prop="loanPrincipal" label="贷款本金" width="120px" >\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.loanPrincipal || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="currentLoanBalance" label="贷款余额">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.currentLoanBalance || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="loanDate" label="放款日期" width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="principalExpiryDate" label="本金到期日" width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="repayedPeriod" label="已还期数"></yu-xtable-column>\
        <yu-xtable-column prop="currentShouldRepayPrinciple" label="本期应还本金" width="140px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.currentShouldRepayPrinciple || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="currentShouldRepayInterest" label="本期应还利息" width="140px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.currentShouldRepayInterest || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="srcProdCode" label="产品代码" width="120px" ></yu-xtable-column>\
        <yu-xtable-column prop="fiveTireClass" label="信贷风险" data-code="CD0315" width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="loanPurpose" label="贷款用途" data-code="CD0079" width="120px" ></yu-xtable-column>\
        <yu-xtable-column prop="term" label="期限" width="90px"></yu-xtable-column>\
        <yu-xtable-column prop="actualRate" label="实际利率"></yu-xtable-column>\
        <yu-xtable-column prop="intBalance" label="利息余额">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.intBalance || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="totalRepayAmt" label="累计还款金额" width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.totalRepayAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="totalPaidInt" label="累计实收利息" width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.totalPaidInt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="valueDate" label="起息日" width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="intExpiryDate" label="利息到期日" width="110px"></yu-xtable-column>\
        <!--\
        <yu-xtable-column prop="loanType" label="贷款类型" data-code="CD0353" width="150px"></yu-xtable-column>\
        <yu-xtable-column prop="prodType" label="产品分类" data-code="PROD_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="valueDate" label="数据日期" width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="fiveTireClass" label="五级分类" data-code="CD0315"></yu-xtable-column>\
        <yu-xtable-column prop="fiveTireClass" label="逾期本期金额" data-code="CD0315">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.fiveTireClass || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="fiveTireClass" label="逾期次数" data-code="CD0315"></yu-xtable-column>\
        <yu-xtable-column prop="fiveTireClass" label="逾期天数" data-code="CD0315"></yu-xtable-column>\
        <yu-xtable-column prop="monthRepayAmt" label="每月月供额">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.currentLoanBalance || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="currentShouldRepayAmt" label="当期应还金额">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.currentLoanBalance || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="lastYearLoanBalance" label="上年余额">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.lastYearLoanBalance || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="baseRate" label="基准利率"></yu-xtable-column>\
        <yu-xtable-column prop="guaranteeType" label="担保方式" data-code="CD0357" width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="isNeedCollateral" label="是否需要抵押物" data-code="YES_NO" width="120px"></yu-xtable-column>\
        -->\
      </yu-xtable>\
      <p class="product-title">\
        <span>信用卡</span>\
        <yu-button type="primary" @click="exportList(8)">导出</yu-button>\
      </p>\
      <yu-xtable ref="XYK" key="XYK" :data="tableData" :data-url="requestUrl" :base-params="condition8"  border style="width: 100%">\
        <yu-xtable-column prop="acctNo" label="账号" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="totalAmt" label="总额度" min-width="110px" >\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.totalAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="usedAmt" label="已用额度" min-width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.usedAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="billDate" label="账单日" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="repayDate" label="还款日" min-width="110px"></yu-xtable-column>\
        \
        <!--<yu-xtable-column prop="bankNo" label="银行号" min-width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="prodType" label="产品分类" data-code="PROD_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="ccy" label="币种" data-code="CD0433"></yu-xtable-column>\
        <yu-xtable-column prop="pointsBalance" label="积分余额" min-width="110px">\
        <template slot-scope="scope">\
          <span>{{ yufp.util.moneyFormatter(scope.row.pointsBalance || 0)}}</span>\
        </template>\
      </yu-xtable-column>\
      <yu-xtable-column prop="totalInstalmentMonth" label="总分期月数"></yu-xtable-column>\
      <yu-xtable-column prop="currentPeriod" label="当前期数"></yu-xtable-column>\
      <yu-xtable-column prop="totalProdAmt" label="总产品金额" min-width="110px">\
        <template slot-scope="scope">\
          <span>{{ yufp.util.moneyFormatter(scope.row.totalProdAmt || 0)}}</span>\
        </template>\
      </yu-xtable-column>\
      <yu-xtable-column prop="surplusNopayAmt" label="剩余未还本金" min-width="130px">\
        <template slot-scope="scope">\
          <span>{{ yufp.util.moneyFormatter(scope.row.surplusNopayAmt || 0)}}</span>\
        </template>\
      </yu-xtable-column>\
      <yu-xtable-column prop="totalIntAmt" label="总利息金额" min-width="110px">\
        <template slot-scope="scope">\
          <span>{{ yufp.util.moneyFormatter(scope.row.totalIntAmt || 0)}}</span>\
        </template>\
      </yu-xtable-column>\
      <yu-xtable-column prop="surplusNopayInt" label="剩余未还利息" min-width="110px">\
        <template slot-scope="scope">\
          <span>{{ yufp.util.moneyFormatter(scope.row.surplusNopayInt || 0)}}</span>\
        </template>\
      </yu-xtable-column>\<yu-xtable-column prop="loanBalance" label="贷款余额" min-width="110px">\
      <template slot-scope="scope">\
        <span>{{ yufp.util.moneyFormatter(scope.row.loanBalance || 0)}}</span>\
      </template>\
    </yu-xtable-column>\
    <yu-xtable-column prop="intBalance" label="利息余额" min-width="110px">\
      <template slot-scope="scope">\
        <span>{{ yufp.util.moneyFormatter(scope.row.intBalance || 0)}}</span>\
      </template>\
    </yu-xtable-column>\
    <yu-xtable-column prop="feeBalance" label="费用余额" min-width="110px">\
      <template slot-scope="scope">\
        <span>{{ yufp.util.moneyFormatter(scope.row.feeBalance || 0)}}</span>\
      </template>\
    </yu-xtable-column>\
    <yu-xtable-column prop="installmentBalance" label="分期付款贷款余额" min-width="130px">\
      <template slot-scope="scope">\
        <span>{{ yufp.util.moneyFormatter(scope.row.installmentBalance || 0)}}</span>\
      </template>\
    </yu-xtable-column>\
    <yu-xtable-column prop="currentShouldRepayAmt" label="当期应还金额" min-width="110px">\
      <template slot-scope="scope">\
        <span>{{ yufp.util.moneyFormatter(scope.row.currentShouldRepayAmt || 0)}}</span>\
      </template>\
    </yu-xtable-column>\
    <yu-xtable-column prop="currentRepayAmt" label="当期已还金额" min-width="110px">\
      <template slot-scope="scope">\
        <span>{{ yufp.util.moneyFormatter(scope.row.currentRepayAmt || 0)}}</span>\
      </template>\
    </yu-xtable-column>\
        -->\
      </yu-xtable>\
    </yu-panel>\
  </div>',
    data: function () {
      return {
        tableData: [],
        optionBtns: [
          { name: '当前持有', prodType: '1' },
          { name: '全部持有', prodType: '-1' }
        ],
        titleData: [],
        activeBtn: '1',
        prodType: '0',
        requestUrl: backend.adminService + '/api/acrmabrbusisuminfo/rank',
        condition7: { condition: JSON.stringify({ prodType: '7', holdType: '1', custId: yufp.localStorage.get('custInfo').custId }) },
        condition8: { condition: JSON.stringify({ prodType: '8', holdType: '1', custId: yufp.localStorage.get('custInfo').custId }) },
        financing: false,
        loan: false
      };
    },
    created: function () {
      var roles = yufp.session.roles;
      var selectRole = yufp.sessionStorage.get('selectRole');
      for (var i = 0; i < roles.length; i++) {
        if (roles[i].id === selectRole) {
          var role = roles[i].code
          if ('R002,R018,R015'.indexOf(role) != -1) {
            this.financing = true;
            this.loan = false;
          } else if ('R003,R019,R016'.indexOf(role) != -1) {
            this.loan = true;
            this.financing = false;
          } else {
            this.loan = true;
            this.financing = true;
          }
        }
      }
    },
    methods: {
      handleBtnChange: function (type) {
        this.activeBtn = type;
        this.condition7 = { condition: JSON.stringify({ prodType: '7', holdType: type, custId: yufp.localStorage.get('custInfo').custId }) };
        this.condition8 = { condition: JSON.stringify({ prodType: '8', holdType: type, custId: yufp.localStorage.get('custInfo').custId }) };
      },

      exportList: function (type) {
        var con = {
          custId: yufp.localStorage.get('custInfo').custId,
          holdType: this.activeBtn,
          prodType: type.toString(),
          financing: this.financing,
          loan: this.loan
        };
        var url = '/api/acrmabrbusisuminfo/export?' + 'condition=' + encodeURI(JSON.stringify(con));
        yufp.util.download(url);
        var message = '';
        if (type === 99) {
          message = '全部产品';
        } else if (type === 7) {
          message = '贷款产品';
        } else if (type === 8) {
          message = '信用卡产品';
        }
        message += '导出Excle';
        this.$emit('butLog','客户360:产品信息:'+con.custId, message);
      }
    }
  });
}(Vue, 'product-info-loan'));