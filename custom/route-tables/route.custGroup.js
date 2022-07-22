/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-10 18:03:36
 * @update by:
 * @description:
 */
/**
 * Created by taoting1 on 2019-02-28.
 * @description 客户群功能页面路由文件
 */
define(function (require) {
  // 定义路由表
  var routeTable = {
    // 客户群成员—添加成员
    clientsclientInfo: {
      html: 'pages/crmsys/custGeneralManager/custgroupManager/manageGroup/manageGroupMember/manageGroupMember.html',
      js: 'pages/crmsys/custGeneralManager/custgroupManager/manageGroup/manageGroupMember/manageGroupMember.js'
    },
    // 自动筛选群成员
    clientsclienauto: {
      html: 'pages/crmsys/custGeneralManager/custgroupManager/usersShows/clientsclientInfo/custGroupAuto.html',
      js: 'pages/crmsys/custGeneralManager/custgroupManager/usersShows/clientsclientInfo/custGroupAuto.js'
    },
    clientsclientInfo2: {
      html: 'pages/crmsys/custGeneralManager/custgroupManager/custGroupViewItem/clientsclientInfoAuto/clientsclientInfoAuto.html',
      js: 'pages/crmsys/custGeneralManager/custgroupManager/custGroupViewItem/clientsclientInfoAuto/clientsclientInfoAuto.js'
    },
    custGropDetail: {
      html: 'pages/dy/custGroupManage/groupDetail/groupDetail.html',
      js: 'pages/dy/custGroupManage/groupDetail/groupDetail.js'
    },
    custGroupAnalysis: {
      html: 'pages/dy/custGroupManage/groupAnalysis/groupAnalysis.html',
      js: 'pages/dy/custGroupManage/groupAnalysis/groupAnalysis.js'
    }

  };
  // 注册路由表
  yufp.router.addRouteTable(routeTable);
});