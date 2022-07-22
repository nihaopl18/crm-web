/**
 * Created by 江成 on 2017/03/05.
 */
define(function (require) {
  // 定义路由表
  var routeTable = {

    login: {
      html: 'pages/common/login/login.html',
      css: 'pages/common/login/login.css',
      js: 'pages/common/login/login.js'
    },
    roleSelect: {
      html: 'pages/common/roleSelect/roleSelect.html',
      css: 'pages/common/roleSelect/roleSelect.css',
      js: 'pages/common/roleSelect/roleSelect.js'
    },
    loginsso: {
      html: 'pages/common/login/loginsso.html',
      css: 'pages/common/login/loginsso.css',
      js: 'pages/common/login/loginsso.js'
    },

    frame: {
      html: 'pages/common/frame/frame.html',
      js: 'pages/common/frame/frame.js'
    },

    frameRight: {
      html: 'pages/common/frame/frameRight.html',
      js: 'pages/common/frame/frameRight.js'
    },

    frameTop: {
      html: 'pages/common/frame/frameTop.html',
      js: 'pages/common/frame/frameTop.js'
    },

    dashboard: {
      html: 'pages/common/dashboard/dashboard.html',
      js: 'pages/common/dashboard/dashboard.js'
    },
    cmpView: {
      html: 'pages/context/cmpView/cmpView.html',
      js: 'pages/context/cmpView/cmpView.js'
    },
    modifyPassword: {
      html: 'pages/content/systemManager/passwordManager/passwordManager.html',
      js: 'pages/content/systemManager/passwordManager/passwordManager.js'
    }

  };
    // 注册路由表
  yufp.router.addRouteTable(routeTable);
});