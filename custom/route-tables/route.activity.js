/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-09-24 10:43:21
 * @update by:
 * @description:
 */
define(function (require) {
  // 定义路由表
  var routeTable = {

    wait2doFollowDetail: {
      html: 'pages/dy/activityLevelsManage/wait2doFollowDetail/wait2doFollowDetail.html',
      js: 'pages/dy/activityLevelsManage/wait2doFollowDetail/wait2doFollowDetail.js'
    },

    bankBranchDetail: {
      html: 'pages/dy/activityLevelsManage/bankBranchDetail/bankBranchDetail.html',
      js: 'pages/dy/activityLevelsManage/bankBranchDetail/bankBranchDetail.js'
    }

  };
    // 注册路由表
  yufp.router.addRouteTable(routeTable);
});