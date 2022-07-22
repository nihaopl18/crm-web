/**
 * 本地数据字典
 * created by helin3 2017-12-04
 */
define(function(require, exports) {
    exports.localLookup = {
        STATE: [
            { key: 'A', value: '生效' },
            { key: 'W', value: '失效' }
        ],
        CRUD_TYPE: [
            { key: 'ADD', value: '新增' },
            { key: 'EDIT', value: '修改' },
            { key: 'DETAIL', value: '详情' }
        ],
        CRUD_TYPE_SERVICE_LEVEL: [
            { key: 'DETAIL', value: '详情' },
            { key: 'EDIT', value: '评级调整' }
        ],
        GENDER: [
            { key: '1', value: '男' },
            { key: '2', value: '女' }
        ],
        HASNO: [
            { key: '01', value: '有' },
            { key: '02', value: '无' }
        ],
        OBJECT_TYPE: [
            { 'key': 'R', 'value': '角色' },
            { 'key': 'U', 'value': '用户' },
            { 'key': 'D', 'value': '部门' },
            { 'key': 'G', 'value': '机构' }
        ],
        RESOURCE_TYPE: [
            { 'key': 'M', 'value': '菜单' },
            { 'key': 'C', 'value': '控制点' },
            { 'key': 'D', 'value': '数据权限' }
        ],
        RECIVE_TYPE: [
            { 'key': 'R', 'value': '角色' },
            { 'key': 'G', 'value': '机构' }
        ],
        PUB_STS: [
            { 'key': 'O', 'value': '已发布' },
            { 'key': 'C', 'value': '未发布' }
        ],
        NOTICE_LEVEL: [
            { 'key': 'I', 'value': '重要' },
            { 'key': 'N', 'value': '一般' }
        ],
        TOP_FLAG: [
            { 'key': 'I', 'value': '是' },
            { 'key': 'N', 'value': '否' }
        ],
        MODEL_RESULT: [
            { 'key': '1', 'value': '良好' },
            { 'key': '2', 'value': '一般' },
            { 'key': '3', 'value': '较差' }
        ],
        MODTH_TYPE: [
            { 'key': '1', 'value': '基础算法' },
            { 'key': '2', 'value': '模型分析算法' }
        ],
        ANAL_TYPE: [
            { 'key': '1', 'value': '迁移分析' },
            { 'key': '2', 'value': '预测分析' }
        ],
        RUN_FREQ: [
            { 'key': '1', 'value': '年' },
            { 'key': '2', 'value': '季' },
            { 'key': '3', 'value': '月' }
        ],
        'UPDATE_FREQUENCY': // 更新频率
            [
            { key: 'DAY', value: '天' },
            { key: 'MONTH', value: '月' },
            { key: 'SEASON', value: '季' },
            { key: 'HALF', value: '半年' },
            { key: 'YEAR', value: '年' }
        ],
        'PROCESS_MODE': // 加工方式
            [
            { key: 'MANUAL', value: '手工' },
            { key: 'STATISTICS', value: '统计' },
            { key: 'MINING', value: '挖掘' }
        ],
        'TIMELINES_TYPE': // 标签时效性
            [
            { key: 'ALWAYS', value: '永久性' },
            { key: 'REGULARLY', value: '周期性' },
            { key: 'TEMPORARY', value: '临时' }
        ],
        'TAG_APPLY': // 标签用途
            [
            { key: 'MARKETING', value: '营销' },
            { key: 'SERVICE', value: '服务' },
            { key: 'RISK', value: '风险' }
        ],
        'TAG_LIFECYCLE': // 标签生命周期
            [
            { key: 'UNAPPROVED', value: '未审批' },
            { key: 'PUBLISHED', value: '审批发布' },
            { key: 'RUNNING', value: '执行中' },
            { key: 'OFFLINE', value: '已下线' }
        ],
        'IF_AVAILABLE': // 标签有效标志
            [
            { key: '1', value: '有效' },
            { key: '0', value: '无效' }
        ],
        'AUTH_TYPE': [
            { key: 'INSTU', value: '金融机构' },
            { key: 'ORG', value: '组织机构' },
            { key: 'ROLE', value: '角色' },
            { key: 'MGR', value: '人员' }
        ],
        'OPERATE_TYPE': [
            { key: 'EDITABLE', value: '可修改' },
            { key: 'READONLY', value: '只读' }
        ],
        'SOURCE_SYS_NO': [
            { key: 'CORE', value: '核心' },
            { key: 'DW', value: '数仓' },
            { key: 'EXT', value: '外部数据' }
        ],
        'SOURCE_OBJ_TYPE': [
            { key: 'INDEX', value: '指标表' },
            { key: 'DEAL', value: '交易表' },
            { key: 'AGREEMENT', value: '协议表' },
            { key: 'PROPERTY', value: '属性表' }
        ],
        'SOURCE_OBJ_NO': [
            { key: 'EDITABLE', value: 'ADMIN_AUTH_ACOUNT' },
            { key: 'READONLY', value: 'ADMIN_AUTH_ORG' }
        ],
        'SOURCE_OBJ_ATT': [
            { key: 'EDITABLE', value: 'CUST_ID' },
            { key: 'READONLY', value: 'CUST_NAME' }
        ],
        'CUST_STAT': [
            { key: 'A', value: '活动户' },
            { key: 'C', value: '销户' },
            { key: 'D', value: '睡眠户' },
            { key: 'G', value: '虚拟户' }
        ],
        'CUST_SX': [
            { key: 'A', value: '客户编号' },
            { key: 'C', value: '风险评分' },
            { key: 'D', value: '资产规模' },
            { key: 'G', value: '客户评级' }
        ],
        'MODEL_EFFECT': [
            { key: '1', value: '良好' },
            { key: '2', value: '一般' },
            { key: '3', value: '较差' }
        ],
        'APPROVAL_STATUS': [
            { key: '1', value: '已通过' },
            { key: '2', value: '未通过' },
            { key: '3', value: '审核中' },
            { key: '4', value: '编辑延期中' }
        ],
        'RISK_STATUS': [
            { key: '1', value: '有风险' },
            { key: '2', value: '无风险' },
            { key: '3', value: '未知' }
        ],
        'RISK_TYPE': [
            { key: '1', value: '信贷风险' },
            { key: '2', value: '洗钱风险' },
            { key: '3', value: '套现风险' }
        ],
        'MARKE_STATUS': [
            { key: '1', value: '生效' },
            { key: '2', value: '未生效' },
            { key: '3', value: '未知' }

        ],
        'SHARED_SCOPE': [
            { key: '1', value: '私有' },
            { key: '2', value: '全行共享' },
            { key: '3', value: '本机构共享' },
            { key: '4', value: '辖内机构共享' }
        ],
        VERSION_INFO: [
            { key: '1', value: 'V1.0' },
            { key: '2', value: 'V1.1' },
            { key: '3', value: 'V1.2' },
            { key: '4', value: 'V2.0' }
        ],
        TEMP_STS: [
            { key: '1', value: '生效中' },
            { key: '2', value: '失效中' }
        ],
        TEMP_TYPE: [
            { key: '1', value: '产品营销' },
            { key: '2', value: '客户维护' },
            { key: '3', value: '风险预警' }
        ],
        IS_READ: [
            { key: '1', value: '未读' },
            { key: '2', value: '已读' }
        ],
        // 币种代码
        CURR: [
            { key: 'CNY', value: '人民币' },
            { key: 'USD', value: '美元' },
            { key: 'HKD', value: '港元' },
            { key: 'JPY', value: '日元' },
            { key: 'EUR', value: '欧元' },
            { key: 'CAD', value: '加元' },
            { key: 'MOP', value: '澳门元' },
            { key: 'GBP', value: '英镑' },
            { key: 'RUB', value: '俄罗斯卢布' },
            { key: 'AUD', value: '澳大利亚元' },
            { key: 'CHF', value: '瑞士法郎' },
            { key: 'TWD', value: '新台币' }

        ],
        CUST_TYPE: [
            { key: '1', value: '对公' },
            { key: '2', value: '对私' }
        ],
        CUST_STATUS: [
            { key: '1', value: '正式' },
            { key: '2', value: '潜在' }
        ],
        FEEDBACK_TYPE: [
            { key: '1', value: '投诉' },
            { key: '2', value: '咨询' },
            { key: '3', value: '意见' },
            { key: '4', value: '建议' }
        ],
        IS_PROCESSED: [
            { key: '1', value: '未处理' },
            { key: '2', value: '处理中' },
            { key: '3', value: '已处理' }
        ],
        ACCESS: [
            { key: '1', value: '客户经理' },
            { key: '2', value: '网银' },
            { key: '3', value: '柜面' },
            { key: '4', value: 'CC' }
        ],
        CRUD_TYPEFEEDBACK: [
            { key: 'ADD', value: '新增' },
            { key: 'EDIT', value: '修改' },
            { key: 'DETAIL', value: '详情' },
            { key: 'PROCESSED', value: '反馈处理' },
            { key: 'INVENTORY', value: '反馈清单' }
        ],
        CUSTFLEX_SPSTATUS: [
            { key: '0', value: '审批中' },
            { key: '1', value: '同意' },
            { key: '2', value: '否决' }
        ],
        KHLY: [{
            'key': '1',
            'value': '手动添加'
        }, { 'key': '3', 'value': '模板导入' }],

        // 日程安排类型
        SCHEDULE_TYPE: [
            { key: '1', value: '客户跟进' },
            { key: '2', value: '商机' },
            { key: '3', value: '培训/会议' },
            { key: '4', value: '外访' },
            { key: '5', value: '材料整理' }
        ],
        // 日程安排状态
        SCHEDULE_STATUS: [
            { key: '1', value: '未开始' },
            { key: '2', value: '待跟进' },
            { key: '3', value: '已开始' }
        ],

        // 工作报告类型
        WORKREPORT_TYPES: [
            { key: '1', value: '日报' },
            { key: '2', value: '周报' },
            { key: '3', value: '月报' }
        ],

        // 接触类型
        TOUCH_TYPES: [
            { key: '0', value: '通话' },
            { key: '1', value: '线下拜访' },
            { key: '2', value: '短息次数' }
        ],

        // 接触目的
        TOUCH_PROPERTIES: [
            { key: '0', value: '产品营销' },
            { key: '1', value: '客户管好坏' }
        ],

        // 婚姻状况
        MARRIED_STATUS: [
            { key: '0', value: '已婚' },
            { key: '1', value: '未婚' },
            { key: '2', value: '离婚' },
            { key: '3', value: '丧偶' }
        ],

        // 政治面貌
        POLITICAL_OUTLOOK: [
            { key: '0', value: '中共党员' },
            { key: '1', value: '中共预备党员' },
            { key: '2', value: '共青团员' },
            { key: '3', value: '其他党员' },
            { key: '4', value: '群众' }
        ],

        ID_TYPES: [
            { key: '0', value: '身份证' },
            { key: '1', value: '护照' },
            { key: '2', value: '港澳居民来往内地通行证' },
            { key: '3', value: '台湾居民来往大陆通行证' },
            { key: '4', value: '外国人永久居留身份证' },
            { key: '5', value: '港澳台居民居住证' }
        ],

        BODY_STATUS: [
            { key: '0', value: '健康' },
            { key: '1', value: '一般' },
            { key: '2', value: '欠佳' }
        ],

        DEGREE: [
            { key: '0', value: '小学' },
            { key: '1', value: '初中' },
            { key: '2', value: '高中' },
            { key: '3', value: '中专' },
            { key: '4', value: '大专' },
            { key: '5', value: '本科' },
            { key: '6', value: '硕士研究生' },
            { key: '7', value: '博士研究生' },
            { key: '8', value: '博士后' },
            { key: '9', value: '其他' }
        ],

        // 异动提醒类型
        NOTICE_TYPES: [
            { key: '0', value: '大额资金变动', bg: 'rgba(93,77,191, 0.1)', color: '#5D4DBF' },
            { key: '1', value: '盈亏提醒', bg: 'rgba(255,160,25, 0.1)', color: ' #FFA019' },
            { key: '2', value: '定期存款', bg: 'rgba(49,120,245, 0.1)', color: '#3178F5' }
        ],

        // 异动提醒状态
        NOTICE_STATUS: [
            { value: '已完成', key: '0' },
            { value: '无需跟进', key: '1' },
            { value: '未跟进', key: '2' }
        ],

        WORK_SUMMERY: [
            { key: '1', value: '客户跟进' },
            { key: '2', value: '培训/会议' },
            { key: '3', value: '外访' },
            { key: '4', value: '商机' }
        ],

        EXPIRE_LIST: [
            // {key: 'S0000022', value: '近一个月有将到期定期存款'},
            // {key: 'S0000023', value: '近一个月有将到期贷款'},
            // {key: 'S0000024', value: '近一个月有将到期理财产品'}
            { key: '01', value: '近一个月有将到期定期存款' },
            { key: '02', value: '近一个月有将到期贷款' },
            { key: '03', value: '近一个月有将到期理财产品' }
        ],

        YEAR_SECTION_LIST: [
            { key: '1', value: '0到18岁之间' },
            { key: '2', value: '18到25岁之间' },
            { key: '3', value: '25到35岁之间' },
            { key: '4', value: '35到45岁之间' },
            { key: '5', value: '45到55岁之间' },
            { key: '6', value: '55到60岁之间' },
            { key: '7', value: '60到65岁之间' },
            { key: '8', value: '65到70岁之间' },
            { key: '9', value: '70到75岁之间' },
            { key: '10', value: '75到80岁之间' },
            { key: '11', value: '80到85岁之间' },
            { key: '12', value: '85到90岁之间' },
            { key: '13', value: '90到95岁之间' },
            { key: '14', value: '95到100岁之间' },
            { key: '15', value: '100岁以上' }
        ],

        ORIGION_LIST: [
            { key: 'CN', value: '中国内地' },
            { key: 'HK', value: '中国香港' },
            { key: 'MO', value: '中国澳门' },
            { key: 'OTHER', value: '其他' }
        ],
        CUSTOMER_TAG_LIST: [
            { key: 'S0000018', value: '两地一本通客户', type: '' },
            { key: 'S0000010', value: '合格投资者认证', type: 'gray' },
            { key: 'S0000045', value: '理财客户', type: 'gray' },
            { key: 'S0000042', value: '车位分期客户', type: 'gray' },
            { key: 'S0000034', value: '个人房产按揭贷款客户', type: 'gray' },
            { key: 'S0000055', value: '法人房产按揭贷款客户', type: 'gray' },
            { key: 'S0000049', value: '信用卡客户', type: 'gray' },
            { key: 'S0000051', value: '黑名单客户', type: 'gray' }
        ],

        CHANGE_TYPES: [
            { key: '01', value: '人员添加' },
            { key: '02', value: '人员移除' },
            { key: '03', value: '系统录入' }
        ],
        IS_HANDLE: [
            { key: '0', value: '未处理' },
            { key: '1', value: '已处理' }
        ],
        ORG_BRACH: [
            { key: '0000', value: '总行部门' },
            { key: '0400', value: '北京分行' },
            { key: '0700', value: '成都分行' },
            { key: '0900', value: '大连分行' },
            { key: '6500', value: '福州分行' },
            { key: '1100', value: '广州分行' },
            { key: '5600', value: '哈尔滨分行' },
            { key: '3100', value: '杭州分行' },
            { key: '4900', value: '合肥分行' },
            { key: '6100', value: '济南分行' },
            { key: '5800', value: '昆明分行' },
            { key: '6800', value: '南昌分行' },
            { key: '4300', value: '南京分行' },
            { key: '6600', value: '南宁分行' },
            { key: '5900', value: '宁波分行' },
            { key: '3500', value: '青岛分行' },
            { key: '2000', value: '厦门分行' },
            { key: '1700', value: '上海分行' },
            { key: '1400', value: '深圳分行' },
            { key: '7100', value: '深圳前海分行' },
            { key: '3900', value: '沈阳分行' },
            { key: '5100', value: '石家庄分行' },
            { key: '5300', value: '苏州分行' },
            { key: '3700', value: '天津分行' },
            { key: '4700', value: '乌鲁木齐分行' },
            { key: '4100', value: '武汉分行' },
            { key: '2200', value: '西安分行' },
            { key: '5700', value: '长沙分行' },
            { key: '5500', value: '郑州分行' },
            { key: '3300', value: '重庆分行' },
            { key: '2300', value: '珠海分行' }
        ],
        UP_DOWN_STATE: [
            { key: 'D', value: '下架' },
            { key: 'U', value: '上架' }
        ],
        YX_WF_APP_STATUS: [
            { value: "待发起", key: "000" },
            { value: "审批中", key: "111" },
            { value: "通过", key: "997" },
            { value: "否决(不同意)", key: "998" }
        ],
        UPPER_LIMIT: [
            { value: "有", key: "1" },
            { value: "无", key: "0" }
        ],
        ORDER_STATE: [
            { value: "发货", key: "2" },
            { value: "关闭", key: "6" },
            { value: "待发货", key: "1" },
            { value: "退货", key: "3" },
            { value: "换货", key: "4" },
            { value: "完成", key: "5" }
        ],
        COMMODITY_TYPE: [
            { key: 'V', value: '虚拟' },
            { key: 'R', value: '实物' }
        ],
        COST_TYPE: [
            { value: "机构", key: "1" },
            { value: "产品", key: "3" },
            { value: "法人", key: "4" }
        ],
        PICTURE_TYPE: [
            { value: "详情滚动图", key: "02" },
            { value: "包装售后图", key: "05" },
            { value: "缩略图", key: "01" },
            { value: "详情图", key: "03" },
            { value: "规格参数图", key: "04" }
        ],
        IF_FLAG: [
            { value: "否", key: "0" },
            { value: "是", key: "1" },
        ]
    };
});