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
    <yu-panel title="产品配置比例" panel-type="simple">\
      <yu-row>\
        <yu-col :span="12">\
        <div id="pieChart" ref="pieChart" style="width:500px;height:300px"></div>\
          <!--<yu-echarts ref="pieChart" :option="option1" height="300px" width="500px"></yu-echarts>-->\
        </yu-col>\
        <yu-col :span="12">\
          <div class="echarts-right">\
            <yu-row>\
              <yu-col :span="12" v-for="(item,i) in titleData" :key="i">\
                <div>\
                  <span class="circle" :style="{\'background\': item.color}"></span>\
                  <span class="words">{{ item.name }}</span>\
                    <span class="count">{{ item.value }}</span>\
                </div>\
              </yu-col>\
            </yu-row>\
          </div>\
        </yu-col>\
      </yu-row>\
    </yu-panel>\
  \
    <yu-panel title="产品持有详情" panel-type="simple">\
      <template slot="right">\
        <yu-button-group>\
          <yu-button v-for="btn in optionBtns" :key="btn.name" :type="activeBtn === btn.prodType ? \'danger\' : \'\'" plain @click="handleBtnChange(btn.prodType)">{{ btn.name }}</yu-button>\
        </yu-button-group>\
      </template>\
      <p style="text-align: right">\
        <yu-button-group>\
          <yu-button type="primary" @click="exportList(99)">全部导出</yu-button>\
        </yu-button-group>\
      </p>\
      <p class="product-title" id="demandDepositBalance">\
        <span>活期存款</span>\
        <yu-button type="primary" @click="exportList(51)">导出</yu-button>\
      </p>\
      <yu-xtable ref="CK" key="CK" :data="tableData" :data-url="requestUrl" :base-params="condition51"  border style="width: 100%">\
        <yu-xtable-column prop="prodName" label="产品中文名" min-width="160px" ></yu-xtable-column>\
        <yu-xtable-column prop="acctNo" label="账号" min-width="160px" ></yu-xtable-column>\
        <yu-xtable-column prop="rate" label="利率" min-width="90px" ></yu-xtable-column>\
        <yu-xtable-column prop="ccy" label="币种" data-code="CD0433"></yu-xtable-column>\
        <yu-xtable-column prop="rateType" label="利率类型" data-code="RATE_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="amt" label="原币金额">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.amt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="amtRmb" label="折人民币金额" min-width="100px" >\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.amtRmb || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <!--\
        <yu-xtable-column prop="amt" label="本期余额">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.amt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="acctType" label="账户类型" data-code="ACCOUNT_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="termType" label="存期类型" data-code="DY0008"></yu-xtable-column>\
        <yu-xtable-column prop="term" label="存期" data-code="DY0008"></yu-xtable-column>\
        <yu-xtable-column prop="prodCode" label="产品分类"></yu-xtable-column>\
        <yu-xtable-column prop="srcProdCode" label="产品代码"></yu-xtable-column>\
        -->\
      </yu-xtable>\
      <p class="product-title" id="timeDepositBalance">\
        <span>定期存款</span>\
        <yu-button type="primary" @click="exportList(52)">导出</yu-button>\
      </p>\
      <yu-xtable ref="CK" key="CK" :data="tableData" :data-url="requestUrl" :base-params="condition52"  border style="width: 100%">\
        <yu-xtable-column prop="prodName" label="产品中文名" min-width="160px" ></yu-xtable-column>\
        <yu-xtable-column prop="acctNo" label="账号" min-width="160px" ></yu-xtable-column>\
        <yu-xtable-column prop="rate" label="利率" min-width="90px" ></yu-xtable-column>\
        <yu-xtable-column prop="ccy" label="币种" data-code="CD0433"></yu-xtable-column>\
        <yu-xtable-column prop="rateType" label="利率类型" data-code="RATE_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="amt" label="原币金额">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.amt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="amtRmb" label="折人民币金额" min-width="100px" >\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.amtRmb || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <!--\
        <yu-xtable-column prop="amt" label="本期余额">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.amt || 0)}}</span>\
          </template>\
        </yu-xtable-column\
        <yu-xtable-column prop="acctType" label="账户类型" data-code="ACCOUNT_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="termType" label="存期类型" data-code="DY0008"></yu-xtable-column>\
        <yu-xtable-column prop="term" label="存期" data-code="DY0008"></yu-xtable-column>\
        <yu-xtable-column prop="prodCode" label="产品分类"></yu-xtable-column>\
        <yu-xtable-column prop="srcProdCode" label="产品代码"></yu-xtable-column>\
        -->\
      </yu-xtable>\
      <p class="product-title" id="structFinBalanceRmb">\
        <span>结构化理财</span>\
        <yu-button type="primary" @click="exportList(1)">导出</yu-button>\
      </p>\
      <yu-xtable ref="refTable1" key="JGHLC" :data-url="requestUrl" :base-params="condition1" border style="width: 100%">\
        <yu-xtable-column prop="prodName" label="产品中文名"  min-width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="transCcy" label="交易币种" min-width="100px" data-code="CD0433"></yu-xtable-column>\
        <yu-xtable-column prop="curNetValue" label="持有金额" min-width="100px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.curNetValue || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="expectReturnRate" label="潜在收益率" min-width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="srcProdCode" label="产品代码" min-width="120px" ></yu-xtable-column>\
        <yu-xtable-column prop="prodStatus" label="状态" data-code="PROD_STATUS" min-width="90px"></yu-xtable-column>\
        <yu-xtable-column prop="prodExpiryDate" label="产品到期日" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="firstMinInvestAmt" label="首次最低投资金额" min-width="150px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.firstMinInvestAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="incomeFeatures" label="收益特征" data-code="INCOME_FEATURES" min-width="130px"></yu-xtable-column>\
        <!--\
        <yu-xtable-column prop="riskLevel" label="风险等级" width="100px" data-code="RISKLEVEL"></yu-xtable-column>\
        <yu-xtable-column prop="subscribeStartDate" label="认购开始时间" width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="subscribeEndDate" label="认购到期时间" width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="prodCode" label="产品分类" data-code="PROD_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="firstSubscribeAmt" label="初始认购金额" width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.firstSubscribeAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="escrowAcctNo" label="托管账号" width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="escrowFeeRate" label="托管手续费率" width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="priceCcy" label="净值币种" data-code="CD0433" width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="prodNetUpdateTime" label="产品最新净值日期" width="120px"></yu-xtable-column>\
        <yu-xtable-column prop="totalAmt" label="总额度" width="110px">\
          <template slot-scope="scope">\
          <span>{{ yufp.util.moneyFormatter(scope.row.totalAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="surplusAmt" label="剩余额度" width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.surplusAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        -->\
      </yu-xtable>\
      <p class="product-title" id="rmbFundBalance" v-if="financing">\
        <span>人民币基金</span>\
        <yu-button type="primary" @click="exportList(4)">导出</yu-button>\
      </p>\
      <yu-xtable ref="refTable3" key="RMBJJ" :data-url="requestUrl" :base-params="condition4" border v-if="financing" style="width: 100%">\
        <yu-xtable-column prop="prodName" label="产品中文名" min-width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="priceCcy" label="市值币种" min-width="100px" data-code="CD0433"></yu-xtable-column>\
        <yu-xtable-column prop="curNetValue" label="参考市值" min-width="100px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.curNetValue || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="prodNetUpdateTime" label="参考市值日期" min-width="120px"></yu-xtable-column>\
        <yu-xtable-column prop="riskLevel" label="产品风险等级" min-width="120px" data-code="RISKLEVEL"></yu-xtable-column>\
        <yu-xtable-column prop="srcProdCode" label="产品代码" min-width="120px" ></yu-xtable-column>\
        <yu-xtable-column prop="prodStatus" label="状态" data-code="PROD_STATUS" min-width="90px"></yu-xtable-column>\
        <!--\
        <yu-xtable-column prop="subscribeEndDate" label="认购到期时间" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="subscribeStartDate" label="认购开始时间" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="prodCode" label="产品分类" data-code="PROD_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="firstSubscribeAmt" label="初始认购金额" min-width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.firstSubscribeAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="escrowAcctNo" label="托管账号" min-width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="escrowFeeRate" label="托管手续费率" min-width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="priceCcy" label="净值币种" data-code="CD0433" min-width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="expectReturnRate" label="预期收益率" min-width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="prodExpiryDate" label="产品到期日" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="firstMinInvestAmt" label="首次最低投资金额" min-width="150px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.firstMinInvestAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="totalAmt" label="总额度" min-width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.totalAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        </yu-xtable-column>\
        <yu-xtable-column prop="surplusAmt" label="剩余额度" min-width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.surplusAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="incomeFeatures" label="收益特征" data-code="INCOME_FEATURES" min-width="160px"></yu-xtable-column>\
        -->\
      </yu-xtable>\
      <p class="product-title" id="qdiiBalanceRmb" v-if="financing">\
        <span>QDII</span>\
        <yu-button type="primary" @click="exportList(2)">导出</yu-button>\
      </p>\
      <yu-xtable ref="refTable2" key="QDII" :data-url="requestUrl" :base-params="condition2" border v-if="financing" style="width: 100%">\
        <yu-xtable-column prop="prodName" label="产品中文名" min-width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="priceCcy" label="市值币种" min-width="100px" data-code="CD0433"></yu-xtable-column>\
        <yu-xtable-column prop="curNetValue" label="参考市值" min-width="100px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.curNetValue || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="prodNetUpdateTime" label="参考市值日期" min-width="120px"></yu-xtable-column>\
        <yu-xtable-column prop="riskLevel" label="产品风险等级" min-width="120px" data-code="RISKLEVEL"></yu-xtable-column>\
        <yu-xtable-column prop="srcProdCode" label="产品代码" min-width="120px" ></yu-xtable-column>\
        <yu-xtable-column prop="prodStatus" label="状态" data-code="PROD_STATUS" min-width="90px"></yu-xtable-column>\
        <yu-xtable-column prop="firstMinInvestAmt" label="首次最低投资金额" min-width="150px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.firstMinInvestAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <!--\
        <yu-xtable-column prop="expectReturnRate" label="预期收益率" width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="subscribeStartDate" label="认购开始时间" width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="subscribeEndDate" label="认购到期时间" width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="prodCode" label="产品分类" data-code="PROD_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="firstSubscribeAmt" label="初始认购金额" width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.firstSubscribeAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="escrowAcctNo" label="托管账号" width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="escrowFeeRate" label="托管手续费率" width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="priceCcy" label="净值币种" data-code="CD0433" width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="prodExpiryDate" label="产品到期日" width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="totalAmt" label="总额度" width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.totalAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="surplusAmt" label="剩余额度" width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.surplusAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="incomeFeatures" label="收益特征" data-code="INCOME_FEATURES" width="160px"></yu-xtable-column>\
        --->\
      </yu-xtable>\
      <p class="product-title" id="trustBalanceRmb" v-if="financing">\
        <span>信托</span>\
        <yu-button type="primary" @click="exportList(0)">导出</yu-button>\
      </p>\
      <yu-xtable ref="refTable0" key="XT" :data-url="requestUrl" :base-params="condition0" border v-if="financing" style="width: 100%">\
        <yu-xtable-column prop="prodName" label="产品中文名" min-width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="priceCcy" label="市值币种" min-width="100px" data-code="CD0433"></yu-xtable-column>\
        <yu-xtable-column prop="curNetValue" label="参考市值" min-width="100px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.curNetValue || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="prodNetUpdateTime" label="参考市值日期" min-width="120px"></yu-xtable-column>\
        <yu-xtable-column prop="expectReturnRate" label="潜在收益率" min-width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="riskLevel" label="产品风险等级" min-width="120px" data-code="RISKLEVEL"></yu-xtable-column>\
        <yu-xtable-column prop="srcProdCode" label="产品代码" min-width="120px" ></yu-xtable-column>\
        <yu-xtable-column prop="prodStatus" label="状态" data-code="PROD_STATUS" min-width="90px"></yu-xtable-column>\
        <yu-xtable-column prop="prodExpiryDate" label="产品到期日" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="firstMinInvestAmt" label="首次最低投资金额" min-width="150px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.firstMinInvestAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="incomeFeatures" label="收益特征" data-code="INCOME_FEATURES" min-width="130px"></yu-xtable-column>\
        <!--\
        <yu-xtable-column prop="subscribeStartDate" label="认购开始时间" width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="subscribeEndDate" label="认购到期时间" width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="prodCode" label="产品分类"></yu-xtable-column>\
        <yu-xtable-column prop="firstSubscribeAmt" label="初始认购金额" width="110px">\
          <template slot-scope="scope">\
             <span>{{ yufp.util.moneyFormatter(scope.row.firstSubscribeAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="escrowAcctNo" label="托管账号" width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="escrowFeeRate" label="托管手续费率" width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="priceCcy" label="净值币种" data-code="CD0433" width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="totalAmt" label="总额度" width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.totalAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="surplusAmt" label="剩余额度" width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.surplusAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        -->\
      </yu-xtable>\
      <p class="product-title" id="insurranceBalance">\
        <span>保险</span>\
        <yu-button type="primary" @click="exportList(6)">导出</yu-button>\
      </p>\
      <yu-xtable ref="BX" key="BX" :data="tableData" :data-url="requestUrl" :base-params="condition6"  border style="width: 100%">\
        <yu-xtable-column prop="insuranceAcct" label="投保单号"></yu-xtable-column>\
        <yu-xtable-column prop="prodName" label="产品中文名" min-width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="prodKind" label="产品类型" data-code="KIND_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="ccy" label="币种" data-code="CD0433"></yu-xtable-column>\
        <yu-xtable-column prop="insuranceAmt" label="保费(年)">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.insuranceAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="payType" label="缴费方式" data-code="PAY_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="payYearTerm" label="缴费期限" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="payTermType" label="缴费期限类型" min-width="110px" data-code="PAY_TERM_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="insuranceExpiryDate" label="保单到期日" min-width="110px"></yu-xtable-column>\
        <!--\
        <yu-xtable-column prop="prodInsuranceAmt" label="产品保额" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="insuranceDate" label="投保日期" min-width="110px"></yu-xtable-column>\
        -->\
      </yu-xtable>\
      <!--\
      <p class="product-title" v-if="financing">\
        <span>代收付</span>\
        <yu-button type="primary" @click="exportList(3)">导出</yu-button>\
      </p>\
      <yu-xtable ref="refTable2" key="QDII" :data-url="requestUrl" :base-params="condition3" border v-if="financing" style="width: 100%">\
        <yu-xtable-column prop="prodName" label="产品中文名"  min-width="210px"></yu-xtable-column>\
        <yu-xtable-column prop="transCcy" label="交易币种" min-width="100px" data-code="CD0433"></yu-xtable-column>\
        <yu-xtable-column prop="subscribeStartDate" label="认购开始时间" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="subscribeEndDate" label="认购到期时间" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="riskLevel" label="风险等级" min-width="100px" data-code="RISKLEVEL"></yu-xtable-column>\
        <yu-xtable-column prop="prodCode" label="产品分类" data-code="PROD_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="srcProdCode" label="产品代码"></yu-xtable-column>\
        <yu-xtable-column prop="firstSubscribeAmt" label="初始认购金额" min-width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.firstSubscribeAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="escrowAcctNo" label="托管账号" min-width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="escrowFeeRate" label="托管手续费率" min-width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="prodStatus" label="状态" data-code="PROD_STATUS" min-width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="priceCcy" label="净值币种" data-code="CD0433" min-width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="curNetValue" label="最新净值" min-width="100px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.curNetValue || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="prodNetUpdateTime" label="产品最新净值日期" min-width="120px"></yu-xtable-column>\
        <yu-xtable-column prop="expectReturnRate" label="预期收益率" min-width="100px"></yu-xtable-column>\
        <yu-xtable-column prop="prodExpiryDate" label="产品到期日" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="firstMinInvestAmt" label="首次最低投资金额" min-width="150px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.firstMinInvestAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="totalAmt" label="总额度" min-width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.totalAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="surplusAmt" label="剩余额度" min-width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.surplusAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="incomeFeatures" label="收益特征" data-code="INCOME_FEATURES" min-width="160px"></yu-xtable-column>\
      </yu-xtable>\
      <p class="product-title" v-if="loan">\
        <span>贷款</span>\
        <yu-button type="primary" @click="exportList(7)">导出</yu-button>\
      </p>\
      <yu-xtable ref="refTable4" key="DK" :data="tableData" :data-url="requestUrl" :base-params="condition7"  border style="width: 100%"  v-if="loan">\
        <yu-xtable-column prop="prodName" label="产品中文名" min-width="210px"></yu-xtable-column>\
        <yu-xtable-column prop="ccy" label="币种" data-code="CD0433"></yu-xtable-column>\
        <yu-xtable-column prop="loanPrincipal" label="贷款本金">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.loanPrincipal || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="currentLoanBalance" label="本期余额">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.currentLoanBalance || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="principalExpiryDate" label="本金到期日" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="repayedPeriod" label="已还期数"></yu-xtable-column>\
        <yu-xtable-column prop="prodType" label="产品分类" data-code="PROD_TYPE"></yu-xtable-column>\
        <yu-xtable-column prop="prodCode" label="产品代码"></yu-xtable-column>\
        <yu-xtable-column prop="fiveTireClass" label="信贷风险" data-code="CD0315" min-width="150px"></yu-xtable-column>\
        <yu-xtable-column prop="loanType" label="贷款类型" data-code="CD0353" min-width="150px"></yu-xtable-column>\
        <yu-xtable-column prop="loanPurpose" label="贷款用途" data-code="CD0079"></yu-xtable-column>\
        <yu-xtable-column prop="term" label="期限" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="actualRate" label="实际利率"></yu-xtable-column>\
        <yu-xtable-column prop="intBalance" label="利息余额"></yu-xtable-column>\
        <yu-xtable-column prop="totalRepayAmt" label="累计还款金额" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="totalPaidInt" label="累计实收利息" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="lastYearLoanBalance" label="上年余额">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.lastYearLoanBalance || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="valueDate" label="数据日期" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="valueDate" label="起息日" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="intExpiryDate" label="利息到期日" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="baseRate" label="基准利率"></yu-xtable-column>\
        <yu-xtable-column prop="guaranteeType" label="担保方式" data-code="CD0357" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="isNeedCollateral" label="是否需要抵押物" data-code="YES_NO" min-width="120px"></yu-xtable-column>\
        <yu-xtable-column prop="fiveTireClass" label="五级分类" data-code="CD0315"></yu-xtable-column>\
        <yu-xtable-column prop="fiveTireClass" label="逾期本期金额" data-code="CD0315">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.fiveTireClass || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="fiveTireClass" label="逾期次数" data-code="CD0315"></yu-xtable-column>\
        <yu-xtable-column prop="fiveTireClass" label="逾期天数" data-code="CD0315"></yu-xtable-column>\
      </yu-xtable>\
      <p class="product-title">\
        <span>信用卡</span>\
        <yu-button type="primary" @click="exportList(8)">导出</yu-button>\
      </p>\
      <yu-xtable ref="XYK" key="XYK" :data="tableData" :data-url="requestUrl" :base-params="condition8"  border style="width: 100%">\
        <yu-xtable-column prop="ccy" label="币种" data-code="CD0433"></yu-xtable-column>\
        <yu-xtable-column prop="totalAmt" label="总额度">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.totalAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
        <yu-xtable-column prop="usedAmt" label="已用额度" min-width="110px">\
          <template slot-scope="scope">\
            <span>{{ yufp.util.moneyFormatter(scope.row.usedAmt || 0)}}</span>\
          </template>\
        </yu-xtable-column>\
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
        </yu-xtable-column>\
        <yu-xtable-column prop="repayDate" label="还款日" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="billDate" label="账单日" min-width="110px"></yu-xtable-column>\
        <yu-xtable-column prop="loanBalance" label="贷款余额" min-width="110px">\
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
        <yu-xtable-column prop="bankNo" label="银行号" min-width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="acctNo" label="账号" min-width="160px"></yu-xtable-column>\
        <yu-xtable-column prop="prodType" label="产品分类" data-code="PROD_TYPE"></yu-xtable-column>\
      </yu-xtable>\
      -->\
    </yu-panel>\
    <!--<yu-panel title="产品推荐" panel-type="simple">\
      <div class="productSuggest">\
        <div class="suggest-head">\
          <div class="left">\
            <p>\
              <span class="title">汇天富全球医疗保健QDII</span>\
              <span class="label">本行产品</span>\
            </p>\
            <div>\
              <ul>\
                <li>中低风险</li>\
                <li>投资期限 175天</li>\
                <li>起购金额 5000元</li>\
              </ul>\
            </div>\
          </div>\
          <div class="right">\
            <p>3.4%</p>\
            <p>预期年化收益率</p>\
          </div>\
        </div>\
        <div class="suggest-foot">\
          <span>话术建议</span>\
          <span>所谓你工作的头衔，你承担的职责，不是把它看“轻”，而是要看“清”</span>\
        </div>\
      </div>\
    </yu-panel>-->\
  </div>',
    data: function () {
      return {
        option1: {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'horizontal',
            right: '10%',
            data: ['活期存款余额', '定期存款余额', 'QDII余额', '信托余额', '结构化理财余额', '人民币基金余额', '总缴保费'],
            icon: 'circle',
            show: false
          },
          series: [{
            name: '产品配置比例',
            type: 'pie',
            radius: ['55%', '83%'],
            avoidLabelOverlap: false,
            left: 30,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }],
          color: ['#eb7e65', '#73deb3', '#f7c739', '#73a0fa', '#a560c1', '#46a9a8', '#7585a2']
        },
        tableData: [],
        optionBtns: [
          { name: '当前持有', prodType: '1' },
          { name: '全部持有', prodType: '-1' }
        ],
        titleData: [],
        activeBtn: '1',
        prodType: '0',
        requestUrl: backend.adminService + '/api/acrmabrbusisuminfo/rank',
        condition0: { condition: JSON.stringify({ prodType: '0', holdType: '1', custId: yufp.localStorage.get('custInfo').custId }) },
        condition1: { condition: JSON.stringify({ prodType: '1', holdType: '1', custId: yufp.localStorage.get('custInfo').custId }) },
        condition2: { condition: JSON.stringify({ prodType: '2', holdType: '1', custId: yufp.localStorage.get('custInfo').custId }) },
        condition3: { condition: JSON.stringify({ prodType: '3', holdType: '1', custId: yufp.localStorage.get('custInfo').custId }) },
        condition4: { condition: JSON.stringify({ prodType: '4', holdType: '1', custId: yufp.localStorage.get('custInfo').custId }) },
        condition51: { condition: JSON.stringify({ prodType: '51', holdType: '1', custId: yufp.localStorage.get('custInfo').custId }) },
        condition52: { condition: JSON.stringify({ prodType: '52', holdType: '1', custId: yufp.localStorage.get('custInfo').custId }) },
        condition6: { condition: JSON.stringify({ prodType: '6', holdType: '1', custId: yufp.localStorage.get('custInfo').custId }) },
        // condition7: { condition: JSON.stringify({ prodType: '7', holdType: '1', custId: yufp.localStorage.get('custInfo').custId }) },
        // condition8: { condition: JSON.stringify({ prodType: '8', holdType: '1', custId: yufp.localStorage.get('custInfo').custId }) },
        financing: false,
        loan: false
      };
    },
    created: function () {
      for (var i = 0; i < this.option1.color.length; i++) {
        this.titleData.push({ color: this.option1.color[i], value: 0, name: this.option1.legend.data[i] });
        this.option1.series[0].data.push({ name: this.option1.legend.data[i], value: 0 });
      }
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
    mounted: function () {
      // this.getProdRatio();
      this.initProductChart();
    },

    methods: {
      initProductChart: function () {
        var chart = echarts.init(this.$refs.pieChart);
        // var chart = echarts.init(document.getElementById('pieChart'));
        chart.setOption(this.option1);
        chart.on('click', function (param) {
          var name = param.name;
          var url = '';
          switch (name) {
            case '活期存款余额':
              url = 'demandDepositBalance';
              break;
            case '定期存款余额':
              url = 'timeDepositBalance';
              break;
            case 'QDII余额':
              url = 'qdiiBalanceRmb';
              break;
            case '信托余额':
              url = 'trustBalanceRmb';
              break;
            case '结构化理财余额':
              url = 'structFinBalanceRmb';
              break;
            case '人民币基金余额':
              url = 'rmbFundBalance';
              break;
            case '总缴保费':
              url = 'insurranceBalance';
              break;

            default:
              url = 'trustBalanceRmb';
              break;
          }
          document.getElementById(url).scrollIntoView({ behavior: 'smooth' });
        });
        this.getProdRatio(chart);
      },
      getProdRatio: function (chart) {
        let _this = this;
        let custId = yufp.localStorage.get('custInfo').custId;
        yufp.service.request({
          method: 'GET',
          url: backend.adminService + '/api/acrmabrbusisuminfo/ratio',
          data: {
            condition: JSON.stringify({ custId: custId })
            // condition: JSON.stringify({userId: 1070515349}),
          },
          callback: function (code, message, response) {
            if (code === 0 && response.data.prodConfRaInfo) {
              let prodConfRaInfo = response.data.prodConfRaInfo || {};
              let productData = [];
              let productNameData = [];
              for (let key in prodConfRaInfo) {
                productNameData.push(prodConfRaInfo[key].name);
                productData.push({ value: prodConfRaInfo[key].balance || 0, name: prodConfRaInfo[key].name, url: key });
              }
              _this.option1.series[0].data = productData;
              _this.option1.legend.data = productNameData;
              let colors = _this.option1.color;
              let tempDatas = [];
              for (let i = 0; i < productNameData.length; i++) {
                tempDatas.push({ color: colors[i], value: yufp.util.moneyFormatter(productData[i].value || 0, 2), name: productData[i].name });
              }
              _this.titleData = tempDatas;
              chart.setOption(_this.option1);
            }
          }
        });
      },

      handleBtnChange: function (type) {
        this.activeBtn = type;
        this.condition0 = { condition: JSON.stringify({ prodType: '0', holdType: type, custId: yufp.localStorage.get('custInfo').custId }) };
        this.condition1 = { condition: JSON.stringify({ prodType: '1', holdType: type, custId: yufp.localStorage.get('custInfo').custId }) };
        this.condition2 = { condition: JSON.stringify({ prodType: '2', holdType: type, custId: yufp.localStorage.get('custInfo').custId }) };
        this.condition3 = { condition: JSON.stringify({ prodType: '3', holdType: type, custId: yufp.localStorage.get('custInfo').custId }) };
        this.condition4 = { condition: JSON.stringify({ prodType: '4', holdType: type, custId: yufp.localStorage.get('custInfo').custId }) };
        this.condition51 = { condition: JSON.stringify({ prodType: '51', holdType: type, custId: yufp.localStorage.get('custInfo').custId }) };
        this.condition52 = { condition: JSON.stringify({ prodType: '52', holdType: type, custId: yufp.localStorage.get('custInfo').custId }) };
        this.condition6 = { condition: JSON.stringify({ prodType: '6', holdType: type, custId: yufp.localStorage.get('custInfo').custId }) };
        // this.condition7 = { condition: JSON.stringify({ prodType: '7', holdType: type, custId: yufp.localStorage.get('custInfo').custId }) };
        // this.condition8 = { condition: JSON.stringify({ prodType: '8', holdType: type, custId: yufp.localStorage.get('custInfo').custId }) };
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
        } else if (type === 0) {
          message = '信托产品';
        } else if (type === 1) {
          message = '结构化理财产品';
        } else if (type === 2) {
          message = 'QDII产品';
        } else if (type === 3) {
          message = '代收付产品';
        } else if (type === 4) {
          message = '人民币基金产品';
        } else if (type === 51) {
          message = '活期存款产品';
        } else if (type === 52) {
          message = '定期产品';
        } else if (type === 6) {
          message = '保险产品';
        } 
        // else if (type === 7) {
        //   message = '贷款产品';
        // } else if (type === 8) {
        //   message = '信用卡产品';
        // }
        message += '导出Excle';
        this.$emit('butLog','客户360:产品信息:'+con.custId, message);
      }
    }
  });
}(Vue, 'product-info'));