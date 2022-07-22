/**
 * Created by 江成 on 2017/03/05.
 */
define(function (require) {
  // 定义路由表
  var routeTable = {

    // 产品视图
    productView: {
      html: 'pages/context/eventEngine/productview/productView.html',
      js: 'pages/context/eventEngine/productview/productView.js'
    },

    customerView: {
      html: 'pages/context/customerViewManager/customerView.html',
      js: 'pages/context/customerViewManager/customerView.js'
    },

    custView2: {
      html: 'pages/context/customersGraphical/companyCustomersGraphical.html',
      js: 'pages/context/customersGraphical/companyCustomersGraphical.js',
      css: 'pages/context/customersGraphical/customersGraphical.css'
    },
    custView1: {
      html: 'pages/context/customersGraphical/personalCustomersGraphical.html',
      js: 'pages/context/customersGraphical/personalCustomersGraphical.js',
      css: 'pages/context/customersGraphical/customersGraphical.css'
    },

    customerportrait: {
      html: 'pages/context/customerportrait/customerportrait.html',
      js: 'pages/context/customerportrait/customerportrait.js',
      css: 'pages/context/customerportrait/customerportrait.css'
    },
    custMarketportrait: {
      html: 'pages/context/custMarketportrait/custMarketportrait.html',
      js: 'pages/context/custMarketportrait/custMarketportrait.js',
      css: 'pages/context/custMarketportrait/custMarketportrait.css'
    },

    marketTraject: {
      html: 'pages/context/custTrailInfo/custTrailInfo.html',
      js: 'pages/context/custTrailInfo/custTrailInfo.js'
    },
    knowledgeRisk: {
      html: 'pages/context/knowledgeRisk/knowledgeRisk.html',
      js: 'pages/context/knowledgeRisk/knowledgeRisk.js'
    },
    ransactionRisk: {
      html: 'pages/context/ransactionRisk/ransactionRisk.html',
      js: 'pages/context/ransactionRisk/ransactionRisk.js'
    },
    // 客户群视图
    usersShows: {
      html: 'pages/crmsys/custGeneralManager/custgroupManager/usersShows/usersShows.html',
      js: 'pages/crmsys/custGeneralManager/custgroupManager/usersShows/usersShows.js'
    },
    clientsBaseInfo: {
      html: 'pages/context/UsersManager/usersShows/clientsBaseInfo/clientsBaseInfo.html',
      js: 'pages/context/UsersManager/usersShows/clientsBaseInfo/clientsBaseInfo.js'
    },
    clientsBaseInfo1: {
      html: 'pages/crmsys/custGeneralManager/custgroupManager/usersShows/clientsBaseInfo/clientsBaseInfo.html',
      js: 'pages/crmsys/custGeneralManager/custgroupManager/usersShows/clientsBaseInfo/clientsBaseInfo.js'
    },
    // 客户群基本信息
    clientsBaseInfo2: {
      html: 'pages/context/UsersManager/usersShows/clientsclientInfo/custGroupAuto.html',
      js: 'pages/context/UsersManager/usersShows/clientsclientInfo/custGroupAuto.js'
    },
    clientsclientInfo: {
      html: 'pages/crmsys/custGeneralManager/custgroupManager/usersShow/clientsclientInfo.html',
      js: 'pages/crmsys/custGeneralManager/custgroupManager/usersShow/clientsclientInfo.js'
    },
    clientsclientInfo1: {
      html: 'pages/crmsys/custGeneralManager/custgroupManager/usersShows/clientsclientInfo/clientsclientInfoManual.html',
      js: 'pages/crmsys/custGeneralManager/custgroupManager/usersShows/clientsclientInfo/clientsclientInfoManual.js'
    },
    // 客户群成员信息
    clientsclientInfo2: {
      html: 'pages/crmsys/custGeneralManager/custgroupManager/usersShows/clientsclientInfo/clientsclientInfoAuto.html',
      js: 'pages/crmsys/custGeneralManager/custgroupManager/usersShows/clientsclientInfo/clientsclientInfoAuto.js'
    },
    clientsclienauto: {
      html: 'pages/context/UsersManager/usersShows/clientsclientInfo/custGroupAuto.html',
      js: 'pages/context/UsersManager/usersShows/clientsclientInfo/custGroupAuto.js'
    },
    clientsclientInfo3: {
      html: 'pages/context/UsersManager/usersShows/clientsclientInfo/clientsclientInfoTable.html',
      js: 'pages/context/UsersManager/usersShows/clientsclientInfo/clientsclientInfoTable.js'
    },
    accountInfo: {
      html: 'pages/context/UsersManager/usersShows/accountInfo/accountInfo.html',
      js: 'pages/context/UsersManager/usersShows/accountInfo/accountInfo.js'
    },
    productInfo: {
      html: 'pages/context/UsersManager/usersShows/productInfo/productInfo.html',
      js: 'pages/context/UsersManager/usersShows/productInfo/productInfo.js'
    },
    personDeposit: {
      html: 'pages/context/UsersManager/usersShows/productInfo/personDeposit/personDeposit.html',
      js: 'pages/context/UsersManager/usersShows/productInfo/personDeposit/personDeposit.js'
    },
    personProduct: {
      html: 'pages/context/UsersManager/usersShows/productInfo/personProduct/personProduct.html',
      js: 'pages/context/UsersManager/usersShows/productInfo/personProduct/personProduct.js'
    },
    personLoans: {
      html: 'pages/context/UsersManager/usersShows/productInfo/personLoans/personLoans.html',
      js: 'pages/context/UsersManager/usersShows/productInfo/personLoans/personLoans.js'
    },
    settleAccounts: {
      html: 'pages/context/UsersManager/usersShows/productInfo/settleAccounts/settleAccounts.html',
      js: 'pages/context/UsersManager/usersShows/productInfo/settleAccounts/settleAccounts.js'
    },
    internetContract: {
      html: 'pages/context/UsersManager/usersShows/productInfo/internetContract/internetContract.html',
      js: 'pages/context/UsersManager/usersShows/productInfo/internetContract/internetContract.js'
    },
    contributionInfo: {
      html: 'pages/context/UsersManager/usersShows/contributionInfo/contributionInfo.html',
      js: 'pages/context/UsersManager/usersShows/contributionInfo/contributionInfo.js'
    },
    fitProduct: {
      html: 'pages/context/UsersManager/usersShows/fitProduct/fitProduct.html',
      js: 'pages/context/UsersManager/usersShows/fitProduct/fitProduct.js'
    },
    notice: {
      html: 'pages/content/systemManager/notice/notice1.html',
      js: 'pages/content/systemManager/notice/notice1.js'
    },
    // 待办
    'toDoWorkList': {
      html: 'pages/userbench/toDoWorkList.html',
      js: 'pages/userbench/toDoWorkList.js'
    },
    // 已办
    'ee0c140945f44303ae116ef1bbdda3f8': {
      html: 'pages/userbench/doneWorkList.html',
      js: 'pages/userbench/doneWorkList.js'
    },
    // 已办结
    '740940cb43474bceaf2ee59309a66c8e': {
      html: 'pages/userbench/endWorkList.html',
      js: 'pages/userbench/endWorkList.js'
    },
    // 信息提醒
    '82843d70f67d453bbe54c3a28800b43a': {
      html: 'pages/crmsys/workPlatform/remindList/remindList.html',
      js: 'pages/crmsys/workPlatform/remindList/remindList.js'
    },
    // 公告管理
    'c934a4c10c1444218d6c9ce92113639d': {
      html: 'pages/crmsys/workPlatform/remindList/remindList.html',
      js: 'pages/crmsys/workPlatform/remindList/remindList.js'
    },
    task: {
      html: 'pages/context/taskCenter/tcMyTask.html',
      js: 'pages/context/taskCenter/tcMyTask.js'
    },
    message: {
      html: 'pages/context/remind/remind1.html',
      js: 'pages/context/remind/remind1.js'
    },
    addMarketPlan: {
      html: 'pages/context/marketPlan/addMarketPlan.html',
      js: 'pages/context/marketPlan/addMarketPlan.js'
    },
    updateMarketPlan: {
      html: 'pages/context/marketPlan/updateMarketPlan.html',
      js: 'pages/context/marketPlan/updateMarketPlan.js'
    },
    detailMarketPlan: {
      html: 'pages/context/marketPlan/detailMarketPlan.html',
      js: 'pages/context/marketPlan/detailMarketPlan.js'
    },
    configRulePart: {
      html: 'pages/cimp/marketcenter/marketcomptform/batchevent/configRulePart.html',
      js: 'pages/cimp/marketcenter/marketcomptform/batchevent/configRulePart.js'
    },
    customerQuery: {
      html: 'pages/context/customerQuery/customerQuery.html',
      js: 'pages/context/customerQuery/customerQuery.js'
    },
    productQuery: {
      html: 'pages/context/eventEngine/productmanager/productManager.html',
      js: 'pages/context/eventEngine/productmanager/productManager.js'
    },
    marketQuery: {
      html: 'pages/context/marketPlan/marketPlan.html',
      js: 'pages/context/marketPlan/marketPlan.js'
    }

  };
  // 注册路由表
  yufp.router.addRouteTable(routeTable);
});