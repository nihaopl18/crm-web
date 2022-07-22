/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-10 18:03:36
 * @update by:
 * @description:
 */
/**
 * Created by taoting1 on 2019-01-29.
 * @description 视图路由文件
 */
define(function(require) {
    // 定义路由表
    var routeTable = {

        // 集团视图
        companyGroupView: {
            html: 'pages/crmsys/sysManage/commonParameters/custView/companyGroupView/companyGroupView.html',
            js: 'pages/crmsys/sysManage/commonParameters/custView/companyGroupView/companyGroupView.js'
        },

        // 客户群视图
        custGroupView: {
            html: 'pages/crmsys/sysManage/commonParameters/custView/custGroupView/custGroupView.html',
            js: 'pages/crmsys/sysManage/commonParameters/custView/custGroupView/custGroupView.js'
        },

        // 客户经理视图
        custManagerView: {
            html: 'pages/crmsys/sysManage/commonParameters/custView/custManagerView/custManagerView.html',
            js: 'pages/crmsys/sysManage/commonParameters/custView/custManagerView/custManagerView.js'
        },

        // 客户经理团队视图
        custManagerGroupView: {
            html: 'pages/crmsys/sysManage/commonParameters/custView/custManagerGroupView/custManagerGroupView.html',
            js: 'pages/crmsys/sysManage/commonParameters/custView/custManagerGroupView/custManagerGroupView.js'
        },

        // 个人客户简版视图
        personalBriefCustView: {
            html: 'pages/crmsys/sysManage/commonParameters/custView/personalBriefCustView/personalBriefCustView.html',
            js: 'pages/crmsys/sysManage/commonParameters/custView/personalBriefCustView/personalBriefCustView.js'
        },

        // 个人客户标准视图
        personalCustView: {
            html: 'pages/crmsys/sysManage/commonParameters/custView/personalCustView/personalCustView.html',
            js: 'pages/crmsys/sysManage/commonParameters/custView/personalCustView/personalCustView.js'
        },

        // 个人客户潜在视图
        personalPotentialCustView: {
            html: 'pages/crmsys/sysManage/commonParameters/custView/personalPotentialCustView/personalPotentialCustView.html',
            js: 'pages/crmsys/sysManage/commonParameters/custView/personalPotentialCustView/personalPotentialCustView.js'
        },

        // 产品视图
        // productView: {
        //     html: 'pages/crmsys/sysManage/commonParameters/custView/productView/productView.html',
        //     js: 'pages/crmsys/sysManage/commonParameters/custView/productView/productView.js'
        // },

        // 产品视图
        productView: {
            html: 'pages/crmsys/productManage/productView/productView.html',
            js: 'pages/crmsys/productManage/productView/productView.js'
        },

        // 对公客户简版视图
        publicBriefCustView: {
            html: 'pages/crmsys/sysManage/commonParameters/custView/publicBriefCustView/publicBriefCustView.html',
            js: 'pages/crmsys/sysManage/commonParameters/custView/publicBriefCustView/publicBriefCustView.js'
        },

        // 对公客户潜在视图
        publicPotentialCustView: {
            html: 'pages/crmsys/sysManage/commonParameters/custView/publicPotentialCustView/publicPotentialCustView.html',
            js: 'pages/crmsys/sysManage/commonParameters/custView/publicPotentialCustView/publicPotentialCustView.js'
        },

        // 对公标准客户视图
        publicStanCustView: {
            html: 'pages/crmsys/sysManage/commonParameters/custView/publicStanCustView/publicStanCustView.html',
            js: 'pages/crmsys/sysManage/commonParameters/custView/publicStanCustView/publicStanCustView.js'
        },

        // 客户360视图
        customer360View: {
            html: 'pages/dy/customer360View/customer360View.html', // 路由对应的html文件路径
            js: 'pages/dy/customer360View/customer360View.js'
        },
        // 业绩查看
        performanceView: {
            html: 'pages/dy/performance/performanceView/performanceView.html',
            js: 'pages/dy/performance/performanceView/performanceView.js',
            css: 'pages/dy/performance/performanceView/performanceView.css'

        },
        // 商户管理商品视图基本信息
        merchantBase: {
            html: 'pages/climp_qy/merchantInfoManager/merchantView/merchantViewInfo/merchantViewInfo.html',
            js: 'pages/climp_qy/merchantInfoManager/merchantView/merchantViewInfo/merchantViewInfo.js'
        },
        // 商户管理商品视图礼品信息
        commodityView: {
            html: 'pages/climp_qy/merchantInfoManager/merchantView/merchantViewInfo/commodityView.html',
            js: 'pages/climp_qy/merchantInfoManager/merchantView/merchantViewInfo/commodityView.js'
        },
        // 商户管理商品视图虚拟票券信息
        ticketView: {
            html: 'pages/climp_qy/merchantInfoManager/merchantView/merchantViewInfo/ticketInfoView.html',
            js: 'pages/climp_qy/merchantInfoManager/merchantView/merchantViewInfo/ticketInfoView.js'
        },
        // 商户管理商品视图订单信息
        orderView: {
            html: 'pages/climp_qy/merchantInfoManager/merchantView/merchantViewInfo/orderView.html',
            js: 'pages/climp_qy/merchantInfoManager/merchantView/merchantViewInfo/orderView.js'
        },

        // 存款审批明细
        d317df387c6c459fac17f75f2fd345dd: {
            html: 'pages/performanceManage/distributionmanage/performanceDstr/performanceDstrDetail.html',
            js: 'pages/performanceManage/distributionmanage/performanceDstr/performanceDstrDetail.js'
        },
        // 贷款审批明细
        b4bc7db4bd9b445ca047846830f08df5: {
            html: 'pages/performanceManage/distributionmanage/performanceLoans/performanceLoansDetail.html',
            js: 'pages/performanceManage/distributionmanage/performanceLoans/performanceLoansDetail.js'
        },
        //中收
        d7efe7d80168463592c1c2ab0ae1c866: {
            html: 'pages/performanceManage/distributionmanage/performance/performanceDstrDetail.html',
            js: 'pages/performanceManage/distributionmanage/performance/performanceDstrDetail.js'
        }

    };
    // 注册路由表
    yufp.router.addRouteTable(routeTable);
});