/**
 * @created by 张成龙 on 2019-1-22 15:53:06
 * @updated by
 * @description 金融小工具树菜单
 */
define(function (require, factory) {
  // 定义路由表
  var routeTable = {
    // 存款利率查询
    infoCalculatordep: {
      html: 'pages/custGraMan/infoCalculatordep/infoCalculatordep.html',
      js: 'pages/custGraMan/infoCalculatordep/infoCalculatordep.js'
    },
    // 活期存款计算器
    deposit1: {
      html: 'pages/custGraMan/calculator/deposit_1/deposit_1.html',
      js: 'pages/custGraMan/calculator/deposit_1/deposit_1.js'
    },
    // 整存整取计算器
    calcLumpSum: {
      html: 'pages/custGraMan/calculator/calcLumpSum/calcLumpSum.html',
      js: 'pages/custGraMan/calculator/calcLumpSum/calcLumpSum.js'
    },
    // 贷款利率查询
    infoCalculatorLoan: {
      html: 'pages/custGraMan/infoCalculatorLoan/infoCalculatorLoan.html',
      js: 'pages/custGraMan/infoCalculatorLoan/infoCalculatorLoan.js'
    },
    // 楼宇按揭计算器
    calcLoanAmount: {
      html: 'pages/custGraMan/calculator/calcLoanAmount/calcLoanAmount.html',
      js: 'pages/custGraMan/calculator/calcLoanAmount/calcLoanAmount.js'
    },
    // 普通贷款计算器
    calcLoan: {
      html: 'pages/custGraMan/calculator/calcLoan/calcLoan.html',
      js: 'pages/custGraMan/calculator/calcLoan/calcLoan.js'
    },
    // 贴现计算器
    loanTx: {
      html: 'pages/custGraMan/calculator/loanTx/loanTx.html',
      js: 'pages/custGraMan/calculator/loanTx/loanTx.js'
    },
    // 理财认购计算器
    calcFinancingPurchase: {
      html: 'pages/custGraMan/calculator/calcFinancingPurchase/calcFinancingPurchase.html',
      js: 'pages/custGraMan/calculator/calcFinancingPurchase/calcFinancingPurchase.js'
    },
    // 理财认购计算器
    calGold: {
      html: 'pages/custGraMan/calculator/calGold/calGold.html',
      js: 'pages/custGraMan/calculator/calGold/calGold.js'},
    // 债券认股收益率计算器
    calcBondsPurchase: {
      html: 'pages/custGraMan/calculator/calcBondsPurchase/calcBondsPurchase.html',
      js: 'pages/custGraMan/calculator/calcBondsPurchase/calcBondsPurchase.js'},
    // 基金认购计算器
    calcFondPurchase: {
      html: 'pages/custGraMan/calculator/calcFondPurchase/calcFondPurchase.html',
      js: 'pages/custGraMan/calculator/calcFondPurchase/calcFondPurchase.js'},
    // 基金申购计算器
    calcFondPurchaseApply: {
      html: 'pages/custGraMan/calculator/calcFondPurchaseApply/calcFondPurchaseApply.html',
      js: 'pages/custGraMan/calculator/calcFondPurchaseApply/calcFondPurchaseApply.js'},
    // 基金赎回计算器
    calcFondRedemption: {
      html: 'pages/custGraMan/calculator/calcFondRedemption/calcFondRedemption.html',
      js: 'pages/custGraMan/calculator/calcFondRedemption/calcFondRedemption.js'},
    // 基金定投计算器
    calcFundPlan: {
      html: 'pages/custGraMan/calculator/calcFundPlan/calcFundPlan.html',
      js: 'pages/custGraMan/calculator/calcFundPlan/calcFundPlan.js'},
    // 基金定投计算器
    calcForeignExchange: {
      html: 'pages/custGraMan/calculator/calcForeignExchange/calcForeignExchange.html',
      js: 'pages/custGraMan/calculator/calcForeignExchange/calcForeignExchange.js'},
    // 个人所得税计算器
    calcPersonalIncomeTax: {
      html: 'pages/custGraMan/calculator/calcPersonalIncomeTax/calcPersonalIncomeTax.html',
      js: 'pages/custGraMan/calculator/calcPersonalIncomeTax/calcPersonalIncomeTax.js'},
    // 年金计算器
    calcPension: {
      html: 'pages/custGraMan/calculator/calcPension/calcPension.html',
      js: 'pages/custGraMan/calculator/calcPension/calcPension.js'}
  };
  // 注册路由表
  yufp.router.addRouteTable(routeTable);
});