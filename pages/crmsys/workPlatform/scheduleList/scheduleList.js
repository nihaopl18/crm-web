/**
 * @created by lixt1 on 2019-2-9 12:35:03
 * @updated by
 * @description 日程安排
 */
define([
    './pages/crmsys/workPlatform/scheduleList/week.js',
    './pages/crmsys/workPlatform/scheduleList/picker.js',
    './pages/crmsys/workPlatform/scheduleList/header.js',
    './pages/crmsys/workPlatform/scheduleList/eventItem.js',
    './pages/crmsys/workPlatform/scheduleList/dateCell.js',
    './pages/crmsys/workPlatform/scheduleList/month.js',
    './pages/crmsys/workPlatform/scheduleList/calendar.js',
    './custom/widgets/js/YufpMgrSelector.js',
    './custom/widgets/js/yufpGovernedCustSelector.js',
    './custom/plugins/yufp.watermark.js'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('CD0016,CD0331,CD0332,CD0333,CD0334,CD0238,CD0019,CD0011');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    addvisitButton: !yufp.session.checkCtrl('addvisit'),
                    delvisitButton: !yufp.session.checkCtrl('delvisit'),
                    updatevisitButton: !yufp.session.checkCtrl('updatevisit'),
                    downvisitButton: !yufp.session.checkCtrl('downvisit'),
                    addplanButton: !yufp.session.checkCtrl('addplan'),
                    delplanButton: !yufp.session.checkCtrl('delplan'),
                    updplanButton: !yufp.session.checkCtrl('updplan'),
                    downplanButton: !yufp.session.checkCtrl('downplan'),
                    addotherButton: !yufp.session.checkCtrl('addother'),
                    delotherButton: !yufp.session.checkCtrl('delother'),
                    updotherButton: !yufp.session.checkCtrl('updother'),
                    downotherButton: !yufp.session.checkCtrl('downother'),
                    EventBus: this, // 日历组件参数
                    dataUrl: backend.scheduleService + '/api/userschedule/querylist',
                    curScheduleId: '', // 当前选择的日期、客户经理 在OCRM_F_WP_SCHEDULE表中对应的主键值
                    curMgrId: yufp.session.user.loginCode, // 当前登录人 编号
                    curMgrName: yufp.session.userName, // 当前登录人 姓名
                    curDate: this.formatDate(new Date()), // 当前日期或当前日历选择日期
                    curYear: new Date().getFullYear(),
                    curMonth: new Date().getMonth(),
                    tabName: '1',
                    custManagerParams: { // 客户经理 放大镜 参数
                        user: {
                            checkbox: false // 是否支持多选
                        }
                    },
                    selectCustParams: { // 客户 放大镜 参数
                        user: {
                            dataParams: {
                                belongOrg: yufp.session.org.code,
                                belongMgr: yufp.session.user.loginCode
                            },
                            checkbox: false // 是否支持多选
                        }
                    },
                    visitParams: {
                        condition: JSON.stringify({
                            type: '1',
                            userId: yufp.session.user.loginCode
                        })
                    },
                    planParams: {
                        condition: JSON.stringify({
                            type: '2'
                        })
                    },
                    otherParams: {
                        condition: JSON.stringify({
                            type: '3'
                        })
                    },
                    ruleMaxLen: {
                        visitNote: [
                            { max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
                        ],
                        othSitRemark: [
                            { required: true, message: '字段不能为空', trigger: 'blur' },
                            { max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
                        ],
                        schDesc: [
                            { required: true, message: '字段不能为空', trigger: 'blur' },
                            { max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
                        ]
                    },
                    visitTitle: '客户接触-新增',
                    visitDialogVisible: false,
                    visitFormdata: {},
                    visitUpHide: false,
                    planTitle: '工作计划-新增',
                    planDialogVisible: false,
                    planFormdata: {},
                    planUpHide: false,
                    otherTitle: '其他日程-新增',
                    otherDialogVisible: false,
                    otherFormdata: {},
                    otherUpHide: false,
                    events: [],
                    itemRender: function(item) {
                        var h = this.$createElement;
                        return h('span', item.text);
                    },
                    heightLeft: yufp.frame.size().height - 10,
                    heightTable: yufp.frame.size().height - 192
                };
            },
            created: function() {
                var _this = this;
                _this.$on('date-click', _this.dateClick);
                _this.$on('change-date', _this.changeDate);
                // 查询 日历组件 数据
                _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1], true);
            },
            mounted: function() {
                var _this = this;
                // 为查询项 日程日期、客户经理名称、客户经理编号 设置初始值
                _this.setQueryFormValue(_this.curDate, _this.curMgrName, _this.curMgrId);
                // 自动查询 当天、当前登录人、客户接触数据
                _this.refreshCurTable();
                // 设置 当天、当前登录人 对应的日程ID值
                // 如果为空，可以在新增 客户接触/工作计划/其他日程 前新增日程数据
                _this.resetCurScheduleId();
            },
            methods: {
                visitorChangeFn: function() {

                },
                /**
                 * 格式化日期：yyyy-MM-dd -- common
                 */
                formatDate: function(date) {
                    if (!(date instanceof Date)) {
                        return date;
                    }
                    var myyear = date.getFullYear();
                    var mymonth = date.getMonth() + 1;
                    var myweekday = date.getDate();
                    if (mymonth < 10) {
                        mymonth = '0' + mymonth;
                    }
                    if (myweekday < 10) {
                        myweekday = '0' + myweekday;
                    }
                    return myyear + '-' + mymonth + '-' + myweekday;
                },
                /**
                 * date所在月的开始日期、结束日期 -- common
                 * params: date 日期类型 或 yyyy-MM-dd字符串
                 */
                getStatDayAndEndDayInMonth: function(date) {
                    if (!date) {
                        return;
                    }
                    if (!(date instanceof Date)) {
                        if (date.length != 10) {
                            return;
                        } else {
                            var arr = date.split('-');
                            date = new Date(arr[0], arr[1] - 1, arr[2]);
                        }
                    }
                    var selYear = date.getFullYear();
                    var selMonth = date.getMonth();
                    var nextMonDate = new Date(selYear, selMonth + 1, 1);
                    var start = new Date(selYear, selMonth, 1);
                    var days = (nextMonDate - start) / (1000 * 60 * 60 * 24);
                    var end = new Date(selYear, selMonth, days);
                    var result = [];
                    result.push(this.formatDate(start));
                    result.push(this.formatDate(end));
                    return result;
                },
                // 清空obj对象 -- common
                clearObj: function(obj) {
                    for (var key in obj) {
                        obj[key] = null;
                    }
                    return obj;
                },
                // 查询日历组件 简要数据 -- common
                querySchedule: function(mgrId, startDate, endDate, sync) {
                    var _this = this;
                    var async = true;
                    if (sync) {
                        async = false;
                    }
                    yufp.service.request({
                        method: 'GET',
                        async: async,
                        url: backend.scheduleService + '/api/userschedule/queryschedule',
                        data: {
                            reporterId: mgrId,
                            startDate: startDate,
                            endDate: endDate
                        },
                        callback: function(code, message, response) {
                            if (code == 0 && response.data.length > 0) {
                                _this.events = response.data;
                            } else {
                                _this.events = [];
                            }
                        }
                    });
                },
                // 设置所有queryForm赋值 -- common
                setQueryFormValue: function(reporterDate, mgrName, mgrId) {
                    if (reporterDate) {
                        this.$refs.visitQueryForm.formdata.reporterDate = reporterDate;
                        this.$refs.planQueryForm.formdata.reporterDate = reporterDate;
                        this.$refs.otherQueryForm.formdata.reporterDate = reporterDate;
                    }
                    if (mgrName) {
                        this.$refs.visitQueryForm.formdata.reporterName = mgrName;
                        this.$refs.planQueryForm.formdata.reporterName = mgrName;
                        this.$refs.otherQueryForm.formdata.reporterName = mgrName;
                    }
                    if (mgrId) {
                        this.$refs.visitQueryForm.formdata.reporterId = mgrId;
                        this.$refs.planQueryForm.formdata.reporterId = mgrId;
                        this.$refs.otherQueryForm.formdata.reporterId = mgrId;
                    }
                },
                // 刷新当前table数据 -- common
                refreshCurTable: function() {
                    var conditionKey = this.$refs.visitTable.$props.conditionKey;
                    var qParam = {};
                    qParam[conditionKey] = { type: this.tabName, reporterId: this.curMgrId, reporterDate: this.curDate };
                    if (this.tabName == '1') {
                        this.$refs.visitTable.queryParam = qParam;
                        this.$refs.visitTable.remoteData();
                    } else if (this.tabName == '2') {
                        this.$refs.planTable.queryParam = qParam;
                        this.$refs.planTable.remoteData();
                    } else if (this.tabName == '3') {
                        this.$refs.otherTable.queryParam = qParam;
                        this.$refs.otherTable.remoteData();
                    }
                },
                // 重置当前 日程主键 -- common
                resetCurScheduleId: function() {
                    var _this = this;
                    _this.curScheduleId = '';
                    if (_this.events.length == 0) {
                        _this.curScheduleId = '';
                    } else {
                        _this.events.map(function(item) {
                            if (item.date == _this.curDate) {
                                _this.curScheduleId = item.scheduleId;
                                return;
                            }
                            //_this.curScheduleId = '';
                        });
                    }
                },
                changeDate: function(year, month) {
                    this.curYear = year;
                    this.curMonth = month;
                },
                /**
                 * 日历date-cell点击事件
                 */
                dateClick: function(e, date) {
                    this.curDate = this.formatDate(date);
                    this.setQueryFormValue(this.curDate, null, null);
                    this.refreshCurTable();
                    this.resetCurScheduleId();
                },

                /**
                 * 客户经理放大镜 值发生变化：
                 *   1、同步所有查询表单中客户经理数据
                 *   2、刷新当前table数据
                 *   3、刷新日历组件 数据（此操作在computed中的events处理，此处不显示调用）
                 */
                custMgrSelFn: function(data) {
                    var _this = this;
                    if (!data || data.length != 1 || data[0].loginCode == null) {
                        return;
                    }
                    _this.curMgrId = data[0].loginCode;
                    _this.curMgrName = data[0].userName;
                    // 同步查询表单数据，刷新当前table数据
                    _this.setQueryFormValue(null, _this.curMgrName, _this.curMgrId);
                    _this.refreshCurTable();
                    // 由于在更改完客户经理后，需要重新查询日历组件绑定events数据，所以此处使用nextTick
                    _this.$nextTick(function() {
                        _this.resetCurScheduleId();
                    });
                },
                /**
                 * 客户放大镜 回调
                 */
                custSelFn: function(data) {
                    if (!data || data.length != 1) {
                        return;
                    }
                    if (this.tabName == '1') {
                        this.visitFormdata.custId = data[0].custId;
                        this.visitFormdata.custName = data[0].custName;
                        this.visitFormdata.custType = data[0].custType;
                        this.visitFormdata.visitorId = data[0].belongMgr;
                        this.visitFormdata.visitorName = data[0].userName;
                    } else if (this.tabName == '2') {
                        this.planFormdata.custId = data[0].custId;
                        this.planFormdata.custName = data[0].custName;
                    } else if (this.tabName == '3') {
                        this.otherFormdata.custId = data[0].custId;
                        this.otherFormdata.custName = data[0].custName;
                    }
                },
                visitorSelFn: function(data) {
                    if (!data || data.length != 1) {
                        return;
                    }
                    if (this.tabName == '1') {
                        this.visitFormdata.visitorId = data[0].userId;
                        this.visitFormdata.visitorName = data[0].userName;
                    }
                },
                // 客户接触 methods  -- start
                // 客户接触 新增
                visitAddFn: function() {
                    var _this = this;
                    _this.visitDialogVisible = true;
                    _this.visitTitle = '客户接触-新增';
                    _this.visitUpHide = false;
                    _this.$nextTick(function() {
                        _this.clearObj(_this.visitFormdata);
                        _this.$refs.visitRefForm.resetFields();
                        // 默认添加当前选择的客户经理编号和名称
                        // _this.visitFormdata.visitorId = _this.curMgrId;
                        // _this.visitFormdata.visitorName = _this.curMgrName;
                    });
                },
                // 客户接触 删除
                visitDeleteFn: function() {
                    var _this = this;
                    var selections = _this.$refs.visitTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].visitStat != '1') {
                            if (selections[i].visitStat == '2') {
                                //已安排
                                if (selections[i].arangeId != yufp.session.user.loginCode || yufp.session.user.loginCode != selections[i].visitorId) {
                                    _this.$message({ message: '只能删除"接触人和安排人"都是自己的接触信息', type: 'warning' });
                                    return;
                                } else {

                                }
                            } else {
                                _this.$message({ message: '只能删除"未下达"的接触信息', type: 'warning' });
                                return;
                            }
                        }
                        if (selections[i].arangeId != yufp.session.user.loginCode) {
                            _this.$message({ message: '只能删除"安排人"是自己的接触信息', type: 'warning' });
                            return;
                        }
                        arr.push(selections[i].vid);
                    }
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.scheduleService + '/api/userschedule/delete',
                                    data: {
                                        type: _this.tabName,
                                        ids: arr.join(',')
                                    },
                                    callback: function(code, message, response) {
                                        if (code == 0) {
                                            // 保存成功 刷新 日历数据、当前table数据
                                            _this.$message('操作成功');
                                            _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                            _this.refreshCurTable();
                                            yufp.util.butLogInfo(hashCode, '日程安排', '客户接触删除');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                // 客户接触 反馈
                visitUpFn: function() {
                    var _this = this;
                    var selections = _this.$refs.visitTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (selections[0].visitStat == '1') {
                        _this.$message({ message: '"未下达”的接触信息不能反馈！', type: 'warning' });
                        return;
                    }
                    if (selections[0].visitStat == '3') {
                        _this.$message({ message: '"已接触"的接触信息不能再次反馈！', type: 'warning' });
                        return;
                    }
                    if (selections[0].visitorId != yufp.session.user.loginCode) {
                        _this.$message({ message: '"接触人"不是自己的接触信息不能反馈！', type: 'warning' });
                        return;
                    }
                    this.visitDialogVisible = true;
                    this.visitTitle = '客户接触-反馈';
                    this.visitUpHide = true;
                    _this.$nextTick(function() {
                        _this.$refs.visitRefForm.resetFields();
                        var obj = selections[0];
                        yufp.clone(obj, _this.visitFormdata);
                    });
                },
                // 客户接触 下达
                visitDownFn: function() {
                    var _this = this;
                    var selections = _this.$refs.visitTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [],
                        mgrId = '';
                    for (var i = 0; i < len; i++) {
                        if (selections[i].visitStat != '1') {
                            _this.$message({ message: '只能对"未下达"的接触信息进行下达操作！', type: 'warning' });
                            return;
                        }
                        if (selections[i].arangeId != yufp.session.user.loginCode) {
                            _this.$message({ message: '只能对"安排人"是自己的接触信息进行下达操作！', type: 'warning' });
                            return;
                        }
                        arr.push(selections[i].vid);
                        mgrId = mgrId + ',' + selections[i].visitorId;
                    }
                    _this.$confirm('此操作将下达所有选中数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.scheduleService + '/api/userschedule/schedulerelease',
                                    data: {
                                        type: _this.tabName,
                                        ids: arr.join(','),
                                        mgrId: mgrId,
                                        scheduleId: _this.curScheduleId
                                    },
                                    callback: function(code, message, response) {
                                        if (code == 0) {
                                            // 保存成功 刷新 日历数据、当前table数据
                                            _this.$message('操作成功');
                                            _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                            _this.refreshCurTable();
                                            yufp.util.butLogInfo(hashCode, '日程安排', '客户接触下达');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                // 客户接触 保存
                // flag : 1、保存； 2、完成
                visitSaveFn: function(flag) {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.visitFormdata, model);
                    var nowDate = yufp.util.dateFormat(new Date(), '{y}-{m}-{d}');
                    var visitStartDate = _this.visitFormdata.visitStartDate instanceof Date ? yufp.util.dateFormat(_this.visitFormdata.visitStartDate, '{y}-{m}-{d}') : _this.visitFormdata.visitStartDate;
                    var visitEndDate = _this.visitFormdata.visitEndDate instanceof Date ? yufp.util.dateFormat(_this.visitFormdata.visitEndDate, '{y}-{m}-{d}') : _this.visitFormdata.visitEndDate;
                    var nextVisitDate = _this.visitFormdata.nextVisitDate instanceof Date ? yufp.util.dateFormat(_this.visitFormdata.nextVisitDate, '{y}-{m}-{d}') : _this.visitFormdata.nextVisitDate;
                    var remindDate = _this.visitFormdata.remindDate instanceof Date ? yufp.util.dateFormat(_this.visitFormdata.remindDate, '{y}-{m}-{d}') : _this.visitFormdata.remindDate;
                    if ((_this.visitFormdata.visitStartDate != null && _this.visitFormdata.visitStartDate != '') && (_this.visitFormdata.visitEndDate != null && _this.visitFormdata.visitEndDate != '')) {
                        if (_this.visitFormdata.visitStartDate > _this.visitFormdata.visitEndDate) {
                            _this.$message('开始时间不能大于结束时间');
                            return;
                        }
                    }
                    if ((_this.visitFormdata.visitStartDate != null && _this.visitFormdata.visitStartDate != '') && (_this.visitFormdata.nextVisitDate != null && _this.visitFormdata.nextVisitDate != '')) {
                        if (_this.visitFormdata.visitStartDate > _this.visitFormdata.nextVisitDate) {
                            _this.$message('开始时间不能大于下次接触时间');
                            return;
                        }
                    }
                    if (_this.visitTitle === '客户接触-新增') {
                        if (_this.visitFormdata.visitStartDate != null && _this.visitFormdata.visitStartDate != '') {
                            if (visitStartDate < nowDate) {
                                _this.$message('开始时间不能小于当前日期');
                                return;
                            }
                        }
                        if (_this.visitFormdata.visitEndDate != null && _this.visitFormdata.visitEndDate != '') {
                            if (visitEndDate < nowDate) {
                                _this.$message('结束时间不能小于当前日期');
                                return;
                            }
                        }
                        if (_this.visitFormdata.nextVisitDate != null && _this.visitFormdata.nextVisitDate != '') {
                            if (nextVisitDate < nowDate) {
                                _this.$message('下次接触时间不能小于当前日期');
                                return;
                            }
                        }
                        if (_this.visitFormdata.remindDate != null && _this.visitFormdata.remindDate != '') {
                            if (remindDate < nowDate) {
                                _this.$message('提醒时间不能小于当前日期');
                                return;
                            }
                        }
                    }
                    var validate = false;
                    _this.$refs.visitRefForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    // 新增
                    if (!model.vid) {
                        if (!_this.curScheduleId) { // 如果当前日程主键为空，需要新增日程数据
                            // 定义请求对象
                            var scheduleModel = {};
                            scheduleModel.cratUsr = yufp.session.user.loginCode;
                            // scheduleModel.mgrId = _this.curMgrId;
                            // scheduleModel.mgrName = _this.curMgrName;新增日程也应该是分配给客户经理的日程
                            // 取出日程的时候应该是安排人和经理都能看得到这个日程
                            scheduleModel.mgrId = _this.curMgrId;
                            scheduleModel.mgrName = _this.curMgrName;
                            scheduleModel.cratOrg = yufp.session.org.code;
                            scheduleModel.schDate = _this.curDate;
                            yufp.service.request({
                                method: 'POST',
                                url: backend.scheduleService + '/api/userschedule/insert',
                                data: scheduleModel,
                                callback: function(code, message, response) {
                                    if (code == 0) {
                                        // 保存成功 更新当前 日程主键值
                                        _this.curScheduleId = response.data;
                                        // 保存 客户接触数据
                                        model.scheduleId = _this.curScheduleId;
                                        model.arangeId = yufp.session.user.loginCode;
                                        model.arangeName = yufp.session.userName;
                                        model.mgrId = _this.visitFormdata.visitorId;
                                        model.mgrName = _this.visitFormdata.visitorName;
                                        model.visitStartDate = _this.formatDate(model.visitStartDate);
                                        model.visitEndDate = _this.formatDate(model.visitEndDate);
                                        model.nextVisitDate = _this.formatDate(model.nextVisitDate);
                                        model.remindDate = _this.formatDate(model.remindDate);
                                        yufp.service.request({
                                            method: 'POST',
                                            url: '/api/userschedule/insertvisit',
                                            data: model,
                                            callback: function(code, message, response) {
                                                if (code == 0) {
                                                    // 保存成功 刷新 日历数据、当前table数据
                                                    _this.$message('操作成功');
                                                    _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                                    _this.refreshCurTable();
                                                    _this.visitDialogVisible = false;
                                                    yufp.util.butLogInfo(hashCode, '日程安排', '客户接触新增');
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            // 直接保存 客户接触数据
                            model.scheduleId = _this.curScheduleId;
                            model.arangeId = yufp.session.user.loginCode;
                            model.arangeName = yufp.session.userName;
                            // model.mgrId = _this.curMgrId;
                            // model.mgrName = _this.curMgrName;
                            model.mgrId = _this.visitFormdata.visitorId;
                            model.mgrName = _this.visitFormdata.visitorName;
                            model.visitStartDate = _this.formatDate(model.visitStartDate);
                            model.visitEndDate = _this.formatDate(model.visitEndDate);
                            model.nextVisitDate = _this.formatDate(model.nextVisitDate);
                            model.remindDate = _this.formatDate(model.remindDate);
                            yufp.service.request({
                                method: 'POST',
                                url: backend.scheduleService + '/api/userschedule/insertvisit',
                                data: model,
                                callback: function(code, message, response) {
                                    if (code == 0) {
                                        // 保存成功 刷新 日历数据、当前table数据
                                        _this.$message('操作成功');
                                        _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                        _this.refreshCurTable();
                                        _this.visitDialogVisible = false;
                                        yufp.util.butLogInfo(hashCode, '日程安排', '客户接触新增');
                                    }
                                }
                            });
                        }
                    }
                    // 反馈
                    if (model.vid && model.visitStat == '2') {
                        model.visitStartDate = _this.formatDate(model.visitStartDate);
                        model.visitEndDate = _this.formatDate(model.visitEndDate);
                        if (flag == 1) {
                            // 保存 不修改 接触状态
                        } else if (flag == 2) {
                            // 完成 修改 接触状态为3
                            model.visitStat = '3';
                        }
                        yufp.service.request({
                            method: 'POST',
                            url: backend.scheduleService + '/api/userschedule/feedbackvisit',
                            data: model,
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    // 保存成功 刷新 日历数据、当前table数据
                                    _this.$message('操作成功');
                                    _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                    _this.refreshCurTable();
                                    _this.visitDialogVisible = false;
                                    yufp.util.butLogInfo(hashCode, '日程安排', '客户接触反馈');
                                }
                            }
                        });
                    }
                },
                // 客户接触 取消
                visitCancelFn: function() {
                    this.visitDialogVisible = false;
                },
                // 客户接触 methods  -- end

                // 工作计划 methods  -- start
                // 工作计划 新增
                planAddFn: function() {
                    var _this = this;
                    _this.planDialogVisible = true;
                    _this.planTitle = '工作计划-新增';
                    _this.planUpHide = false;
                    _this.$nextTick(function() {
                        _this.clearObj(_this.planFormdata);
                        _this.$refs.planRefForm.resetFields();
                    });
                },
                // 工作计划 删除
                planDeleteFn: function() {
                    var _this = this;
                    var selections = _this.$refs.planTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].arangeId != yufp.session.user.loginCode) {
                            _this.$message({ message: '只能删除"安排人"是自己的工作计划', type: 'warning' });
                            return;
                        }
                        arr.push(selections[i].pid);
                    }
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.scheduleService + '/api/userschedule/delete',
                                    data: {
                                        type: _this.tabName,
                                        ids: arr.join(',')
                                    },
                                    callback: function(code, message, response) {
                                        if (code == 0) {
                                            // 保存成功 刷新 日历数据、当前table数据
                                            _this.$message('操作成功');
                                            _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                            _this.refreshCurTable();
                                            yufp.util.butLogInfo(hashCode, '日程安排', '工作计划删除');

                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                // 工作计划 反馈
                planUpFn: function() {
                    var _this = this;
                    var selections = _this.$refs.planTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (selections[0].stat == '1') {
                        _this.$message({ message: '"未安排"的计划不能反馈', type: 'warning' });
                        return;
                    }
                    if (selections[0].stat == '4') {
                        _this.$message({ message: '"已完成"的计划不能反馈', type: 'warning' });
                        return;
                    }
                    if (selections[0].mgrId != yufp.session.user.loginCode) {
                        _this.$message({ message: '"执行人"不是自己的计划不能反馈', type: 'warning' });
                        return;
                    }
                    this.planDialogVisible = true;
                    this.planTitle = '工作计划-反馈';
                    this.planUpHide = true;
                    _this.$nextTick(function() {
                        _this.$refs.planRefForm.resetFields();
                        var obj = selections[0];
                        yufp.clone(obj, _this.planFormdata);
                    });
                },
                // 工作计划 下达
                planDownFn: function() {
                    var _this = this;
                    var selections = _this.$refs.planTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].stat != '1' || selections[i].arangeId != yufp.session.user.loginCode) {
                            _this.$message({ message: '只有未下达且安排人是自己的日程可以下达，请重新选择', type: 'warning' });
                            return;
                        }
                        arr.push(selections[i].pid);
                    }
                    _this.$confirm('此操作将下达所有选中数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.scheduleService + '/api/userschedule/schedulerelease',
                                    data: {
                                        type: _this.tabName,
                                        ids: arr.join(',')
                                    },
                                    callback: function(code, message, response) {
                                        if (code == 0) {
                                            // 保存成功 刷新 日历数据、当前table数据
                                            _this.$message('操作成功');
                                            _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                            _this.refreshCurTable();
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                // 工作计划 保存
                // flag : 1、保存； 2、完成
                planSaveFn: function(flag) {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.planFormdata, model);
                    var schStartTime = _this.planFormdata.schStartTime instanceof Date ? yufp.util.dateFormat(_this.planFormdata.schStartTime, '{y}-{m}-{d}') : _this.planFormdata.schStartTime;
                    var nowDate = yufp.util.dateFormat(new Date(), '{y}-{m}-{d}');
                    var actStartTime = _this.planFormdata.actStartTime instanceof Date ? yufp.util.dateFormat(_this.planFormdata.actStartTime, '{y}-{m}-{d}') : _this.planFormdata.actStartTime;
                    var remindDate = _this.planFormdata.remindDate instanceof Date ? yufp.util.dateFormat(_this.planFormdata.remindDate, '{y}-{m}-{d}') : _this.planFormdata.remindDate;
                    if ((_this.planFormdata.actStartTime != null && _this.planFormdata.actStartTime != '') && (_this.planFormdata.actEndTime != null && _this.planFormdata.actEndTime != '')) {
                        if (_this.planFormdata.actStartTime > _this.planFormdata.actEndTime) {
                            _this.$message('实际开始时间不能大于结束时间');
                            return;
                        }
                    }
                    if (_this.planTitle === '工作计划-新增') {
                        if (_this.planFormdata.schStartTime != null && _this.planFormdata.schStartTime != '') {
                            if (schStartTime < nowDate) {
                                _this.$message('计划开始时间不能小于当前日期');
                                return;
                            }
                        }
                        if (_this.planFormdata.actStartTime != null && _this.planFormdata.actStartTime != '') {
                            if (actStartTime < nowDate) {
                                _this.$message('实际开始时间不能小于当前日期');
                                return;
                            }
                        }
                        if (_this.planFormdata.remindDate != null && _this.planFormdata.remindDate != '') {
                            if (remindDate < nowDate) {
                                _this.$message('提醒时间不能小于当前日期');
                                return;
                            }
                        }
                        if ((_this.planFormdata.schStartTime != null && _this.planFormdata.schStartTime != '') && (_this.planFormdata.schEndTime != null && _this.planFormdata.schEndTime != '')) {
                            if (_this.planFormdata.schStartTime > _this.planFormdata.schEndTime) {
                                _this.$message('计划开始时间不能大于结束时间');
                                return;
                            }
                        }
                    }
                    var validate = false;
                    _this.$refs.planRefForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    // 新增
                    if (!model.pid) {
                        if (!_this.curScheduleId) { // 如果当前日程主键为空，需要新增日程数据
                            // 定义请求对象
                            var scheduleModel = {};
                            scheduleModel.cratUsr = yufp.session.user.loginCode;
                            scheduleModel.mgrId = _this.curMgrId;
                            scheduleModel.mgrName = _this.curMgrName;
                            scheduleModel.cratOrg = yufp.session.org.code;
                            scheduleModel.schDate = _this.curDate;
                            yufp.service.request({
                                method: 'POST',
                                url: backend.scheduleService + '/api/userschedule/insert',
                                data: scheduleModel,
                                callback: function(code, message, response) {
                                    if (code == 0) {
                                        // 保存成功 更新当前 日程主键值
                                        _this.curScheduleId = response.data;
                                        // 保存 工作计划数据
                                        model.scheduleId = _this.curScheduleId;
                                        model.schStartTime = _this.formatDate(model.schStartTime);
                                        model.schEndTime = _this.formatDate(model.schEndTime);
                                        model.arangeId = yufp.session.user.loginCode;
                                        model.arangeName = yufp.session.userName;
                                        model.mgrId = _this.curMgrId;
                                        model.mgrName = _this.curMgrName;
                                        model.remindDate = _this.formatDate(model.remindDate);
                                        yufp.service.request({
                                            method: 'POST',
                                            url: backend.scheduleService + '/api/userschedule/insertplan',
                                            data: model,
                                            callback: function(code, message, response) {
                                                if (code == 0) {
                                                    // 保存成功 刷新 日历数据、当前table数据
                                                    _this.$message('操作成功');
                                                    _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                                    _this.refreshCurTable();
                                                    _this.planDialogVisible = false;
                                                    yufp.util.butLogInfo(hashCode, '日程安排', '工作计划新增');
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            // 直接保存 工作计划数据
                            model.scheduleId = _this.curScheduleId;
                            model.schStartTime = _this.formatDate(model.schStartTime);
                            model.schEndTime = _this.formatDate(model.schEndTime);
                            model.arangeId = yufp.session.user.loginCode;
                            model.arangeName = yufp.session.userName;
                            model.mgrId = _this.curMgrId;
                            model.mgrName = _this.curMgrName;
                            model.remindDate = _this.formatDate(model.remindDate);
                            yufp.service.request({
                                method: 'POST',
                                url: backend.scheduleService + '/api/userschedule/insertplan',
                                data: model,
                                callback: function(code, message, response) {
                                    if (code == 0) {
                                        // 保存成功 刷新 日历数据、当前table数据
                                        _this.$message('操作成功');
                                        _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                        _this.refreshCurTable();
                                        _this.planDialogVisible = false;
                                        yufp.util.butLogInfo(hashCode, '日程安排', '工作计划新增');
                                    }
                                }
                            });
                        }
                    }
                    // 反馈
                    if (model.pid && (model.stat == '2' || model.stat == '3')) {
                        model.actStartTime = _this.formatDate(model.actStartTime);
                        model.actEndTime = _this.formatDate(model.actEndTime);
                        if (flag == 1) {
                            // 保存 修改 计划执行状态为 3反馈已执行中
                            model.stat = '3';
                        } else if (flag == 2) {
                            // 完成 修改 计划执行状态为 4已完成
                            model.stat = '4';
                        }
                        yufp.service.request({
                            method: 'POST',
                            url: backend.scheduleService + '/api/userschedule/feedbackplan',
                            data: model,
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    // 保存成功 刷新 日历数据、当前table数据
                                    _this.$message('操作成功');
                                    _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                    _this.refreshCurTable();
                                    _this.planDialogVisible = false;
                                    yufp.util.butLogInfo(hashCode, '日程安排', '工作计划反馈');
                                }
                            }
                        });
                    }
                },
                // 工作计划 取消
                planCancelFn: function() {
                    this.planDialogVisible = false;
                },
                // 工作计划 methods  -- end

                // 其他日程 methods  -- start
                // 其他日程 新增
                otherAddFn: function() {
                    var _this = this;
                    _this.otherDialogVisible = true;
                    _this.otherTitle = '其他日程-新增';
                    _this.otherUpHide = false;
                    _this.$nextTick(function() {
                        _this.clearObj(_this.otherFormdata);
                        _this.$refs.otherRefForm.resetFields();
                    });
                },
                // 其他日程 删除
                otherDeleteFn: function() {
                    var _this = this;
                    var selections = _this.$refs.otherTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].arangeId != yufp.session.user.loginCode) {
                            _this.$message({ message: '只能删除"安排人"是自己的日程', type: 'warning' });
                            return;
                        }
                        arr.push(selections[i].oid);
                    }
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.scheduleService + '/api/userschedule/delete',
                                    data: {
                                        type: _this.tabName,
                                        ids: arr.join(',')
                                    },
                                    callback: function(code, message, response) {
                                        if (code == 0) {
                                            // 保存成功 刷新 日历数据、当前table数据
                                            _this.$message('操作成功');
                                            _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                            _this.refreshCurTable();
                                            yufp.util.butLogInfo(hashCode, '日程安排', '其他日程删除');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                // 其他日程 反馈
                otherUpFn: function() {
                    var _this = this;
                    var selections = _this.$refs.otherTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    // if ((selections[0].stat != '2' && selections[0].stat != '3') ||
                    //     selections[0].mgrId != yufp.session.user.loginCode) {
                    //   _this.$message({ message: '只有已安排,执行中且客户经理是自己的日程可以反馈，请重新选择', type: 'warning' });
                    //   return;
                    // }
                    if (selections[0].stat == '1') {
                        _this.$message({ message: '"未安排"的日程不能反馈', type: 'warning' });
                        return;
                    }
                    if (selections[0].stat == '4') {
                        _this.$message({ message: '"已完成"的日程不能反馈', type: 'warning' });
                        return;
                    }
                    if (selections[0].mgrId != yufp.session.user.loginCode) {
                        _this.$message({ message: '"执行人"不是自己的日程不能反馈', type: 'warning' });
                        return;
                    }
                    this.otherDialogVisible = true;
                    this.otherTitle = '其他日程-反馈';
                    this.otherUpHide = true;
                    _this.$nextTick(function() {
                        _this.$refs.otherRefForm.resetFields();
                        var obj = selections[0];
                        yufp.clone(obj, _this.otherFormdata);
                    });
                },
                // 其他日程 下达
                otherDownFn: function() {
                    var _this = this;
                    var selections = _this.$refs.otherTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        if (selections[i].stat != '1' || selections[i].arangeId != yufp.session.user.loginCode) {
                            _this.$message({ message: '只有未下达且安排人是自己的日程可以下达，请重新选择', type: 'warning' });
                            return;
                        }
                        arr.push(selections[i].oid);
                    }
                    _this.$confirm('此操作将下达所有选中数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.scheduleService + '/api/userschedule/schedulerelease',
                                    data: {
                                        type: _this.tabName,
                                        ids: arr.join(',')
                                    },
                                    callback: function(code, message, response) {
                                        if (code == 0) {
                                            // 保存成功 刷新 日历数据、当前table数据
                                            _this.$message('操作成功');
                                            _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                            _this.refreshCurTable();
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                // 其他日程 保存
                // flag : 1、保存； 2、完成
                otherSaveFn: function(flag) {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.otherFormdata, model);
                    var validate = false;
                    var remindDate = _this.otherFormdata.remindDate instanceof Date ? yufp.util.dateFormat(_this.otherFormdata.remindDate, '{y}-{m}-{d}') : _this.otherFormdata.remindDate;
                    var nowDate = yufp.util.dateFormat(new Date(), '{y}-{m}-{d}');
                    if (_this.otherTitle === '其他日程-新增') {
                        if (_this.otherFormdata.remindDate != null && _this.otherFormdata.remindDate != '') {
                            if (remindDate < nowDate) {
                                _this.$message('提醒时间不能小于当前日期');
                                return;
                            }
                        }
                    }
                    _this.$refs.otherRefForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    // 新增
                    if (!model.oid) {
                        if (!_this.curScheduleId) { // 如果当前日程主键为空，需要新增日程数据
                            // 定义请求对象
                            var scheduleModel = {};
                            scheduleModel.cratUsr = yufp.session.user.loginCode;
                            scheduleModel.mgrId = _this.curMgrId;
                            scheduleModel.mgrName = _this.curMgrName;
                            scheduleModel.cratOrg = yufp.session.org.code;
                            scheduleModel.schDate = _this.curDate;
                            yufp.service.request({
                                method: 'POST',
                                url: backend.scheduleService + '/api/userschedule/insert',
                                data: scheduleModel,
                                callback: function(code, message, response) {
                                    if (code == 0) {
                                        // 保存成功 更新当前 日程主键值
                                        _this.curScheduleId = response.data;
                                        // 保存 其他日程数据
                                        model.scheduleId = _this.curScheduleId;
                                        model.arangeId = yufp.session.user.loginCode;
                                        model.arangeName = yufp.session.userName;
                                        model.mgrId = _this.curMgrId;
                                        model.mgrName = _this.curMgrName;
                                        model.remindDate = _this.formatDate(model.remindDate);
                                        yufp.service.request({
                                            method: 'POST',
                                            url: backend.scheduleService + '/api/userschedule/insertother',
                                            data: model,
                                            callback: function(code, message, response) {
                                                if (code == 0) {
                                                    // 保存成功 刷新 日历数据、当前table数据
                                                    _this.$message('操作成功');
                                                    _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                                    _this.refreshCurTable();
                                                    _this.otherDialogVisible = false;
                                                    yufp.util.butLogInfo(hashCode, '日程安排', '其他日程新增');
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            // 直接保存 其他日程数据
                            model.scheduleId = _this.curScheduleId;
                            model.arangeId = yufp.session.user.loginCode;
                            model.arangeName = yufp.session.userName;
                            model.mgrId = _this.curMgrId;
                            model.mgrName = _this.curMgrName;
                            model.remindDate = _this.formatDate(model.remindDate);
                            yufp.service.request({
                                method: 'POST',
                                url: backend.scheduleService + '/api/userschedule/insertother',
                                data: model,
                                callback: function(code, message, response) {
                                    if (code == 0) {
                                        // 保存成功 刷新 日历数据、当前table数据
                                        _this.$message('操作成功');
                                        _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                        _this.refreshCurTable();
                                        _this.otherDialogVisible = false;
                                        yufp.util.butLogInfo(hashCode, '日程安排', '其他日程新增');
                                    }
                                }
                            });
                        }
                    }
                    // 反馈
                    if (model.oid && (model.stat == '2' || model.stat == '3')) {
                        if (flag == 1) {
                            // 保存 修改 完成状态为 3反馈已执行中
                            model.stat = '3';
                        } else if (flag == 2) {
                            // 完成 修改 完成状态为 4已完成
                            model.stat = '4';
                        }
                        yufp.service.request({
                            method: 'POST',
                            url: backend.scheduleService + '/api/userschedule/feedbackother',
                            data: model,
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    // 保存成功 刷新 日历数据、当前table数据
                                    _this.$message('操作成功');
                                    _this.querySchedule(_this.curMgrId, _this.curMonthDays[0], _this.curMonthDays[1]);
                                    _this.refreshCurTable();
                                    _this.otherDialogVisible = false;
                                    yufp.util.butLogInfo(hashCode, '日程安排', '其他日程反馈');
                                }
                            }
                        });
                    }
                },
                // 其他日程 取消
                otherCancelFn: function() {
                        this.otherDialogVisible = false;
                    }
                    // 其他日程 methods  -- end
            },
            computed: {
                curMonthDays: function() {
                    return this.getStatDayAndEndDayInMonth(new Date(this.curYear, this.curMonth, 1));
                }
            },
            watch: {
                tabName: function() {
                    this.refreshCurTable();
                },
                curMonthDays: function(newValue) {
                    this.querySchedule(this.curMgrId, newValue[0], newValue[1]);
                },
                curMgrId: function(newValue) {
                    this.querySchedule(newValue, this.curMonthDays[0], this.curMonthDays[1]);
                }
            }
        });
    };

    /**
     * 页面传递消息处理
     * @param type 消息类型
     * @param message 消息内容
     */
    exports.onmessage = function(type, message) {};

    /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
    exports.destroy = function(id, cite) {};
});