/**
 * 全局后台服务映射表
 * created by helin3 2017-12-04
 */
var backend = {
  uaaService: '', // 用户认证微服务
  appCommonService: '', // 基础服务
  appOcaService: '', // 组织机构、菜单权限微服务
  noticeService: '', // 公告微服务
  messageService: '', // 消息中心微服务
  jobService: '', // 分布式调度管理端
  fileService: '', // 文件微服务
  seqService: '', // 全局序列号微服务
  echainService: '', // 工作流微服务
  remote: '', // TODO 待修改
  example: '', // 示例微服务
  actService: '', // TCC-示例原子微服务
  scoreService: '', // TCC-示例原子微服务
  compositeService: '', // TCC-示例聚合微服务
  adminService: '',
  isSingleServer: false, // 服务端是否单机运行
  gatewayService: '', // 网关服务
  appBaseService: '',//绩效服务

  // yscrm微服务
  calculatorService: '', // 金融小工具服务

  pdplanService: '', // 产品方案服务

  remindService: '', // 工作平台提醒服务

  custlosswarnService: '', // 工作平台流失预警服务

  workreportService: '', // 工作平台工作报告服务

  exchangeService: '', // 工作平台交流区服务

  knowledgebaseService: '', // 工作平台知识库服务

  scheduleService: '', // 日程安排服务

  custmgrgroupService: '', // 客户经理团队服务

  custmgrService: '', // 客户经理服务

  custorgService: '', // 对公客户服务

  custfeedbakService: '', // 客户反馈服务

  custadmitService: '', // 客户准入服务

  custgradeService: '', // 客户评级服务

  custmgrbusiService: '', // 客户经理业务指标服务

  custpubbusiService: '', // 客户业务指标公共服务

  custperbusiService: '', // 客户业务指标个人服务

  custorgbusiService: '', // 客户业务指标对公服务

  acctpubbusiService: '', // 账户指标公共服务

  acctperbusiService: '', // 账户指标个人服务

  productService: '', // 产品服务

  mktactivityService: '', // 营销活动服务

  custpubService: '', // 客户公共服务

  custpersonService: '', // 个人客户服务

  custorggroupService: '', // 集团客户服务

  custgroupService: '', // 客户群服务

  custflexService: '', // 灵活查询服务
  appYscrmCustMgtService: '',

  sysviewService: '', // 视图管理服务

  mktsalesopporService: '', // 商机服务

  syshomepageService: '',// 首页服务

  yuspClimpPoolService: '', //营销服务
  qyPoolService: ''

};