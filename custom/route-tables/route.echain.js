/**
 * Created by 江成 on 2017/03/05.
 */
define(function (require) {
    // 定义路由表
    var routeTable = {

        toDoTaskPoolList: {
            html: 'pages/joinbench/ToDoTaskPoolList.html',
            js: 'pages/joinbench/ToDoTaskPoolList.js'
        },

        exampleinfo: {
            html: 'pages/joincore/exampleInfo.html',
            js: 'pages/joincore/exampleInfo.js'
        },
        // 开发环境
        //      '0211404a83834374b6cf467999b29281': {
        //          html: 'pages/joincore/modelInfo.html',
        //          js: 'pages/joincore/modelInfo.js'
        //      },
        // 'fe390466ca4342fca56f14af2f3bec31': {
        //     html: 'pages/joincore/modelYQSP.html',
        //     js: 'pages/joincore/modelYQSP.js'
        // },
        // 测试环境
        'feec66f498994737a1e37e44294fcccc': {
            html: 'pages/joincore/modelInfo.html',
            js: 'pages/joincore/modelInfo.js'
        },
        'exinfo': {
            html: 'pages/joincore/taskApplyInfo.html',
            js: 'pages/joincore/taskApplyInfo.js'
        },

        echainInstanceInfo: {
            html: 'pages/joincore/instanceInfo.html',
            js: 'pages/joincore/instanceInfo.js'
        },
        historyListPage: {
            html: 'pages/joincore/historyListPage.html',
            js: 'pages/joincore/historyListPage.js'
        },
        'e1157cda26204e56bb53e1bdc69dc4e0': {
            html: 'pages/joincore/modelYQSP.html',
            js: 'pages/joincore/modelYQSP.js'
        },
        '167134e5c70843f292d951711fea000f': {
            html: 'pages/context/eventEngine/eventConfig/eventInfo.html',
            js: 'pages/context/eventEngine/eventConfig/eventInfo.js'
        },
        'a8f55e5350e54dc696e6c24095c2fb00': {
            html: 'pages/joincore/yxhdsp.html',
            js: 'pages/joincore/yxhdsp.js'
        },
        // 客户认领
        'b6ac5c27ff76437ea169defcb139a0e5': {
            html: 'pages/joincore/custClaim.html',
            js: 'pages/joincore/custClaim.js'
        },
        // 客户移交
        'cf69853fb9494361865d0dc559baddb8': {
            html: 'pages/joincore/custHandover.html',
            js: 'pages/joincore/custHandover.js'
        },
        // 手工调整申请页面
        '0f651087defe4bb28bddc2361c347e07': {
            html: 'pages/joincore/custGradeApply.html',
            js: 'pages/joincore/custGradeApply.js'
        },
        '9159e10354ed4d61814d6d8206ddb1f6': {
            html: 'pages/joincore/custFlex.html',
            js: 'pages/joincore/custFlex.js'
        },
        // 退出客户经理
        '4a33eb2a2c53498a8b825640ca581320': {
            html: 'pages/joincore/quitCustMgr.html',
            js: 'pages/joincore/quitCustMgr.js'
        },
        '3e06c8b30eca45708f0beedde06d6629': {
            html: 'pages/joincore/perCustAccount.html',
            js: 'pages/joincore/perCustAccount.js'
        },
        //工作报告审批流程
        echainWorkReport: {
            html: 'pages/joincore/workReport.html',
            js: 'pages/joincore/workReport.js'
        },
        // 流程审批详情
        echainSearch: {
            html: 'pages/joincore/searchInfo.html',
            js: 'pages/joincore/searchInfo.js'
        },
        // 知识库发布
        echainKnowledgePub: {
            html: 'pages/crmsys/workPlatform/infoKnowledgePub/pubDetail.html',
            js: 'pages/crmsys/workPlatform/infoKnowledgePub/pubDetail.js'
        },
        // 灵活导出
        echainEsExport: {
            html: 'pages/joincore/instanceSylable.html',
            js: 'pages/joincore/instanceSylable.js'
        }
    };
    // 注册路由表
    yufp.router.addRouteTable(routeTable);
});