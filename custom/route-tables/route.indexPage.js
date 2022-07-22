/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-06 14:48:50
 * @update by:
 * @description:
 */
/**
 * Created by 江成 on 2017/03/05.
 */
define(function (require) {
  // 定义路由表
  var routeTable = {
    wait2do: {
      html: 'pages/dy/indexPage/tabs/wait2do.html',
      js: 'pages/dy/indexPage/tabs/wait2do.js'
    },
    workReport: {
      html: 'pages/dy/indexPage/tabs/report.html',
      js: 'pages/dy/indexPage/tabs/report.js'
    },

    wait2doMore: {
      html: 'pages/dy/toDoWork/toDoWork.html',
      js: 'pages/dy/toDoWork/toDoWork.js'
    },
    workReportMore: {
      html: 'pages/crmsys/workPlatform/workReport/workReport.html',
      js: 'pages/crmsys/workPlatform/workReport/workReport.js'
    },
    transInfo:{
      html: 'pages/dy/customerTrans/customerTrans.html',
      js: 'pages/dy/customerTrans/customerTrans.js'
    }
  };
    // 注册路由表
  yufp.router.addRouteTable(routeTable);
});