/**
 * @created by helin3 2017-11-30
 * @updated by
 * @description 菜单、控制点、数据权限模拟数据
 */

/**
 * 模拟菜单数据
 * @type
 */
var demoMenus = [
  // 一级菜单
  { menuId: 'gm-60001', menuName: '客户经理首页', upMenuId: '0', menuIcon: 'el-icon-yx-user', funcId: 'samanager', funcUrl: 'pages/common/dashboard/samanager', roleCode: 'mgr', ifHomePage: 'true'},

  { menuId: 'gm-80001', menuName: '系统管理', upMenuId: '0', menuIcon: 'el-icon-yx-books'},
  { menuId: 'gm-80002', menuName: '个人中心', upMenuId: '0', menuIcon: 'el-icon-yx-books'},
  { menuId: 'gm-80003', menuName: '我的工作台', upMenuId: '0', menuIcon: 'el-icon-yx-books'},
  // 二级菜单
  { menuId: 'gm-82001', menuName: '流程管理', upMenuId: 'gm-80001', menuIcon: 'el-icon-yx-books'},
  { menuId: 'gm-82002', menuName: '文档管理', upMenuId: 'gm-80001', menuIcon: 'el-icon-yx-books'},
  { menuId: 'gm-82003', menuName: '权限管理', upMenuId: 'gm-80001', menuIcon: 'el-icon-yx-books'},
  { menuId: 'gm-82004', menuName: '公共参数管理', upMenuId: 'gm-80001', menuIcon: 'el-icon-yx-books'},
  { menuId: 'gm-82005', menuName: '消息中心', upMenuId: 'gm-80001', menuIcon: 'el-icon-yx-books'},
  { menuId: 'gm-82006', menuName: '调度管理', upMenuId: 'gm-80001', menuIcon: 'el-icon-yx-books'},
  { menuId: 'gm-82007', menuName: '系统监控', upMenuId: 'gm-80001', menuIcon: 'el-icon-yx-books'},
  { menuId: 'gm-82008', menuName: '系统公告', upMenuId: 'gm-80002', menuIcon: '', funcId: 'notice', funcUrl: 'pages/content/systemManager/notice/notice'},
  { menuId: 'gm-82009', menuName: '工作委托', upMenuId: 'gm-80003', menuIcon: 'el-icon-yx-books'},
  { menuId: 'gm-82010', menuName: '我发起的业务', upMenuId: 'gm-80003', menuIcon: 'el-icon-yx-books'},
  { menuId: 'gm-82011', menuName: '我的已办', upMenuId: 'gm-80003', menuIcon: 'el-icon-yx-books'},
  { menuId: 'gm-82012', menuName: '我的待办', upMenuId: 'gm-80003', menuIcon: 'el-icon-yx-books'},
  // 三级菜单
  { menuId: 'gm-60015', menuName: '执行任务', upMenuId: 'gm-60005', menuIcon: 'el-icon-yx-stack', funcId: 'executionTasks', funcUrl: 'pages/context/executionTasks/executionTasks'},
  { menuId: 'gm-60025', menuName: '商机跟进', upMenuId: 'gm-60005', menuIcon: 'el-icon-yx-stack', funcId: 'businessFollow', funcUrl: 'pages/context/businessFollow/businessFollow'},
  { menuId: 'gm-60035', menuName: '风险处置', upMenuId: 'gm-60005', menuIcon: 'el-icon-yx-stack'},
  { menuId: 'gm-60045', menuName: '我的任务', upMenuId: 'gm-60005', menuIcon: 'el-icon-yx-stack', funcId: 'taskPool', funcUrl: 'pages/context/taskPool/taskPool'},

  { menuId: 'gm-83001', menuName: '工作日历', upMenuId: 'gm-82001', menuIcon: 'el-icon-yx-stack', funcId: 'freedate', funcUrl: 'pages/joinconfig/freedate'},
  { menuId: 'gm-83002', menuName: '系统关联金融机构', upMenuId: 'gm-82001', menuIcon: 'el-icon-yx-stack', funcId: 'listWfClientInstu', funcUrl: 'pages/echainbench/listWfClientInstu'},
  { menuId: 'gm-83003', menuName: '工作流配置', upMenuId: 'gm-82001', menuIcon: 'el-icon-yx-stack'},
  { menuId: 'gm-83004', menuName: '实例管理', upMenuId: 'gm-82001', menuIcon: 'el-icon-yx-stack'},
  { menuId: 'gm-83005', menuName: '文件管理', upMenuId: 'gm-82002', menuIcon: 'el-icon-yx-stack', funcId: 'file', funcUrl: 'pages/doc/file/file'},
  { menuId: 'gm-83006', menuName: '模板管理', upMenuId: 'gm-82002', menuIcon: 'el-icon-yx-stack', funcId: 'template', funcUrl: 'pages/doc/template/template'},
  { menuId: 'gm-83007', menuName: '金融机构管理', upMenuId: 'gm-82003', menuIcon: 'el-icon-yx-stack', funcId: 'fincalOrgManager', funcUrl: 'pages/content/systemManager/fincalOrgManager/fincalOrgManager'},
  { menuId: 'gm-83008', menuName: '机构管理', upMenuId: 'gm-82003', menuIcon: 'el-icon-yx-stack', funcId: 'orgInfoManager', funcUrl: 'pages/content/systemManager/orgInfoManager/orgInfoManager'},
  { menuId: 'gm-83009', menuName: '用户管理', upMenuId: 'gm-82003', menuIcon: 'el-icon-yx-stack', funcId: 'sysUserManager', funcUrl: 'pages/content/systemManager/userInfoManager/sysUserManager'},
  { menuId: 'gm-83010', menuName: '岗位管理', upMenuId: 'gm-82003', menuIcon: 'el-icon-yx-stack', funcId: 'dutyManager', funcUrl: 'pages/content/systemManager/dutyManager/dutyManager'},
  { menuId: 'gm-83011', menuName: '角色管理', upMenuId: 'gm-82003', menuIcon: 'el-icon-yx-stack', funcId: 'roleManage', funcUrl: 'pages/content/systemManager/roleManage/roleManage'},
  { menuId: 'gm-83012', menuName: '部门管理', upMenuId: 'gm-82003', menuIcon: 'el-icon-yx-stack', funcId: 'dptManager', funcUrl: 'pages/content/systemManager/dptManager/dptManager'},
  { menuId: 'gm-83013', menuName: '数据授权', upMenuId: 'gm-82003', menuIcon: 'el-icon-yx-stack', funcId: 'roleDataPowerManager', funcUrl: 'pages/content/systemManager/roleDataPowerManager/roleDataPowerManager'},
  { menuId: 'gm-83014', menuName: '功能授权', upMenuId: 'gm-82003', menuIcon: 'el-icon-yx-stack', funcId: 'resourceSetManager', funcUrl: 'pages/content/systemManager/ResourceAllocationManager/resourceSetManager'},
  { menuId: 'gm-83015', menuName: '逻辑系统管理', upMenuId: 'gm-82004', menuIcon: 'el-icon-yx-stack', funcId: 'logicSysManager', funcUrl: 'pages/content/systemManager/logicSysManager/logicSysManager'},
  { menuId: 'gm-83016', menuName: '业务功能管理', upMenuId: 'gm-82004', menuIcon: 'el-icon-yx-stack', funcId: 'functionManage', funcUrl: 'pages/content/systemManager/functionManage/functionManage'},
  { menuId: 'gm-83017', menuName: '控制点管理', upMenuId: 'gm-82004', menuIcon: 'el-icon-yx-stack', funcId: 'resContrManage', funcUrl: 'pages/content/systemManager/resContrManage/resContrManage'},
  { menuId: 'gm-83018', menuName: '数据权限模板配置', upMenuId: 'gm-82004', menuIcon: 'el-icon-yx-stack', funcId: 'dataFilter', funcUrl: 'pages/content/systemManager/datafilter/dataFilter'},
  { menuId: 'gm-83019', menuName: '菜单配置', upMenuId: 'gm-82004', menuIcon: 'el-icon-yx-stack', funcId: 'menuConfig', funcUrl: 'pages/content/systemManager/menuConfig/menuConfig'},
  { menuId: 'gm-83021', menuName: '数据权限管理', upMenuId: 'gm-82004', menuIcon: 'el-icon-yx-stack', funcId: 'dataAuthManage', funcUrl: 'pages/content/systemManager/dataAuthManage/dataAuthManage'},
  { menuId: 'gm-83020', menuName: '数据字典配置', upMenuId: 'gm-82004', menuIcon: 'el-icon-yx-stack', funcId: 'lookupdict', funcUrl: 'pages/content/systemManager/lookupdict/lookupdict'},
  { menuId: 'gm-83022', menuName: '系统参数', upMenuId: 'gm-82004', menuIcon: 'el-icon-yx-stack', funcId: 'sysprop', funcUrl: 'pages/content/systemManager/sysprop/sysprop'},
  { menuId: 'gm-83023', menuName: '系统提示消息管理', upMenuId: 'gm-82004', menuIcon: 'el-icon-yx-stack', funcId: 'messageManager', funcUrl: 'pages/content/systemManager/messageManager/messageManager'},
  { menuId: 'gm-83024', menuName: '序列号模板', upMenuId: 'gm-82004', menuIcon: 'el-icon-yx-stack', funcId: 'sequenceConfig', funcUrl: 'pages/content/systemManager/sequenceConfig/sequenceConfig'},
  { menuId: 'gm-83025', menuName: '消息模板', upMenuId: 'gm-82005', menuIcon: 'el-icon-yx-stack', funcId: 'template', funcUrl: 'pages/message/template/template'},
  { menuId: 'gm-83026', menuName: '消息订阅', upMenuId: 'gm-82005', menuIcon: 'el-icon-yx-stack', funcId: 'subscribe', funcUrl: 'pages/message/subscribe/subscribe'},
  { menuId: 'gm-83027', menuName: '消息历史', upMenuId: 'gm-82005', menuIcon: 'el-icon-yx-stack', funcId: 'history', funcUrl: 'pages/message/history/history'},
  { menuId: 'gm-83028', menuName: '消息队列', upMenuId: 'gm-82005', menuIcon: 'el-icon-yx-stack', funcId: 'pool', funcUrl: 'pages/message/pool/pool'},
  { menuId: 'gm-83029', menuName: '任务管理', upMenuId: 'gm-82006', menuIcon: 'el-icon-yx-stack', funcId: 'jobInfo', funcUrl: 'pages/content/systemManager/xxlJob/jobInfo'},
  { menuId: 'gm-83030', menuName: '调度中心', upMenuId: 'gm-82006', menuIcon: 'el-icon-yx-stack', funcId: 'jobIndex', funcUrl: 'pages/content/systemManager/xxlJob/jobIndex'},
  { menuId: 'gm-83031', menuName: '执行器管理', upMenuId: 'gm-82006', menuIcon: 'el-icon-yx-stack', funcId: 'taskExecutorManager', funcUrl: 'pages/content/systemManager/taskExecutorManager/taskExecutorManager'},
  { menuId: 'gm-83032', menuName: '调度日志', upMenuId: 'gm-82006', menuIcon: 'el-icon-yx-stack', funcId: 'jobLog', funcUrl: 'pages/content/systemManager/xxlJobLog/jobLog'},
  { menuId: 'gm-83033', menuName: '日志管理', upMenuId: 'gm-82007', menuIcon: 'el-icon-yx-stack', funcId: 'logManager', funcUrl: 'pages/content/systemManager/logManager/logManager'},
  { menuId: 'gm-83034', menuName: '委托设置', upMenuId: 'gm-82009', menuIcon: 'el-icon-yx-stack', funcId: 'listWfHumanstates', funcUrl: 'pages/userbench/listWfHumanstates'},
  { menuId: 'gm-83035', menuName: '委托查询', upMenuId: 'gm-82009', menuIcon: 'el-icon-yx-stack', funcId: '', funcUrl: ''},
  { menuId: 'gm-83036', menuName: '办理中', upMenuId: 'gm-82010', menuIcon: 'el-icon-yx-stack', funcId: 'myWorkToDoList', funcUrl: 'pages/userbench/myWorkToDoList'},
  { menuId: 'gm-83037', menuName: '已办结', upMenuId: 'gm-82010', menuIcon: 'el-icon-yx-stack', funcId: 'myWorkEndList', funcUrl: 'pages/userbench/myWorkEndList'},
  { menuId: 'gm-83038', menuName: '已办事项', upMenuId: 'gm-82011', menuIcon: 'el-icon-yx-stack', funcId: 'doneWorkList', funcUrl: 'pages/userbench/doneWorkList'},
  { menuId: 'gm-83039', menuName: '办结事项', upMenuId: 'gm-82011', menuIcon: 'el-icon-yx-stack', funcId: 'endWorkList', funcUrl: 'pages/userbench/endWorkList'},
  { menuId: 'gm-83040', menuName: '待办事项', upMenuId: 'gm-82012', menuIcon: 'el-icon-yx-stack', funcId: 'toDoWorkList', funcUrl: 'pages/userbench/toDoWorkList'},
  { menuId: 'gm-83041', menuName: '挂起事项', upMenuId: 'gm-82012', menuIcon: 'el-icon-yx-stack', funcId: 'WfiWorklistHang', funcUrl: 'pages/echainbench/WfiWorklistHang'},
  { menuId: 'gm-83042', menuName: '会签事项', upMenuId: 'gm-82012', menuIcon: 'el-icon-yx-stack', funcId: 'WfiSignTaskList', funcUrl: 'pages/joincore/WfiSignTaskList'},
  { menuId: 'gm-83043', menuName: '会签投票', upMenuId: 'gm-82012', menuIcon: 'el-icon-yx-stack', funcId: 'WfiSignVoteList', funcUrl: 'pages/joincore/WfiSignVoteList'},
  { menuId: 'gm-83044', menuName: '我的项目池', upMenuId: 'gm-82012', menuIcon: 'el-icon-yx-stack', funcId: 'MyTaskPool', funcUrl: 'pages/joinbench/MyTaskPool'},
  // 四级菜单
  { menuId: 'gm-84001', menuName: '工作流定义', upMenuId: 'gm-83003', menuIcon: 'el-icon-yx-stack', funcId: 'echainstudioDownload', funcUrl: 'pages/echainbench/echainstudioDownload'},
  { menuId: 'gm-84002', menuName: '流程列表', upMenuId: 'gm-83003', menuIcon: 'el-icon-yx-stack', funcId: 'queryWFList', funcUrl: 'pages/echainbench/queryWFList'},
  { menuId: 'gm-84003', menuName: '项目池管理', upMenuId: 'gm-83003', menuIcon: 'el-icon-yx-stack', funcId: 'WfTaskpoolList', funcUrl: 'pages/joinconfig/WfTaskpoolList'},
  { menuId: 'gm-84004', menuName: '会签策略配置', upMenuId: 'gm-83003', menuIcon: 'el-icon-yx-stack', funcId: 'WfiSignConfList', funcUrl: 'pages/joinconfig/WfiSignConfList'},
  { menuId: 'gm-84005', menuName: '流程适用机构配置', upMenuId: 'gm-83003', menuIcon: 'el-icon-yx-stack', funcId: 'WfiWorkflowOrgGroup', funcUrl: 'pages/joinconfig/WfiWorkflowOrgGroup'},
  { menuId: 'gm-84006', menuName: '流程适用业务配置', upMenuId: 'gm-83003', menuIcon: 'el-icon-yx-stack', funcId: 'WfiWorkflowBizGroup', funcUrl: 'pages/joinconfig/WfiWorkflowBizGroup'},
  { menuId: 'gm-84007', menuName: '办理中', upMenuId: 'gm-83004', menuIcon: 'el-icon-yx-stack', funcId: 'WfiWorklistTodo', funcUrl: 'pages/echainbench/WfiWorklistTodo'},
  { menuId: 'gm-84008', menuName: '已办结', upMenuId: 'gm-83004', menuIcon: 'el-icon-yx-stack', funcId: 'WfiWorklistEnd', funcUrl: 'pages/echainbench/WfiWorklistEnd'}
];

/**
 * 模拟菜单控制点数据
 * @type {Array}
 */
var demoCtrls = [
  { menuId: 'gm-23101', funcId: 'exampleQuery', ctrlCode: 'create', ctrlName: '新增' },
  { menuId: 'gm-23101', funcId: 'exampleQuery', ctrlCode: 'edit', ctrlName: '修改' },
  { menuId: 'gm-23101', funcId: 'exampleQuery', ctrlCode: 'detail', ctrlName: '详情' },
  { menuId: 'gm-23101', funcId: 'exampleQuery', ctrlCode: 'delete', ctrlName: '删除' },
  { menuId: 'gm-23101', funcId: 'exampleQuery', ctrlCode: 'export', ctrlName: '导出' },

  { menuId: 'gm-23102', funcId: 'exampleTree', ctrlCode: 'create', ctrlName: '新增' },
  { menuId: 'gm-23102', funcId: 'exampleTree', ctrlCode: 'edit', ctrlName: '修改' },
  { menuId: 'gm-23102', funcId: 'exampleTree', ctrlCode: 'detail', ctrlName: '详情' }
];

/**
 * 模拟数据权限数据
 * @type
 */
var demoDataContr = [
  { authId: '', authTmplId: '', contrId: '', contrInclude: '', contrUrl: '', sqlName: '', sqlString: '', sysId: '' }
];
