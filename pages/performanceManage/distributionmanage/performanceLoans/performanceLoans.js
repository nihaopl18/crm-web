/**
 * @Created by raop
 * @updated by
 * @description 贷款业绩分配
 */
define([
    './custom/widgets/js/YufpDemoSelector.js',
    './custom/widgets/js/YufpUserSelector.js',
    './custom/widgets/js/yufpExtTree.js',
    './custom/widgets/js/yufpOrgTree.js',
    './custom/widgets/js/YufpWfInit.js'
], function (require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('APPLY_STS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var me = this;
                return {
                    wfCommonParams: {
                        sessionInstuCde: yufp.session.instu.code,
                        sessionOrgCode: yufp.session.org.code,
                        sessionLoginCode: yufp.session.user.loginCode
                    },
                    userSelectorParams: { // 用户放大镜数据权限使用现场机构号，基地测试需要修改
                        org: {
                            dataRoot: {
                                orgId: '500',//yufp.session.org.id
                                orgName: '东亚银行'//yufp.session.org.name
                            },
                            dataParams: {
                                orgCode: '500'//yufp.session.org.code
                            }
                        },
                        user: {
                            dataParams: {
                                orgCode: '500'//yufp.session.org.code
                            }
                        }
                    },
                    etlDate: '',
                    //dataUrl: backend.appBaseService + '/api/PmaFComDepLoansInfoResource/querylist',
                    dataUrl: backend.appBaseService + '/api/PmaFComDepCommResource/queryCommList',
                    params: {
                        condition: JSON.stringify({ workType: '2'})
                    },
                    rule: [
                        {required: true, message: '必填项', trigger: 'blur'},
                        {validator: yufp.validator.number, message: '数字', trigger: 'blur'}
                    ],
                    dialogVisible: false,
                    formDisabled: false,
                    saveBtnShow: true,
                    colunmNamelist: [],
                    queryList: [],
                    key: [],
                    formDataTwo: [],
                    contactData: [],
                    activeNames: ['1'],
                    queryData: {},
                    flagOne: false,
                    oldData: [],
                    flagTwo: false,
                    pickerOptions: {
                        disabledDate: function (time) {
                            return time.getTime() < me.etlDate.getTime();
                        }
                    },
                    queryForm: {},
                    modelVal: {},
                    flagThree: false,
                    maxDstrRate: '',
                    minAmt: '',
                    amt: '',
                    dstrPeriod: '',
                    flagPeriod: true,
                    queryObj: {},
                    datacodeList: '',
                    allowRepeat: '0',
                    dialogVisibleDetail: false,
                    queryDateList: {},
                    loading: false
                };
            },
            created: function () {
                var _this = this;
                yufp.service.request({
                    async: false,
                    method: 'GET',
                    url: backend.appBaseService + '/api/commondistribution/queryTimeState',
                    callback: function (code, message, response) {
                        var dateMonth = response.statDate;
                        var year = parseInt(dateMonth.substring(0, 4));
                        var month = parseInt(dateMonth.substring(4, 6));
                        var day = parseInt('01');
                        _this.etlDate = new Date(year, month, day);

                    }
                });
                //审批状态的调用
                /*yufp.service.request({
                    async: false,
                    method: 'GET',
                    url: '/api/metafunctionmanager/getmetafuninfo',
                    data: {funCode: data.funCode},
                    callback: function (code, message, response) {
                        var list = yufp.util.getList(response.data);
                        _this.queryList = list.queryList;
                        _this.queryList.push({
                            dataCode: 'APPLY_STS',
                            ename: 'applySts',
                            name: '审批状态',
                            type: 'select'
                        });
                        _this.colunmNamelist = list.colunmNamelist;
                        _this.colunmNamelist.push({
                            dataCode: 'APPLY_STS',
                            ename: 'applySts',
                            name: '审批状态',
                            width: '200'
                        });
                        _this.queryDateList = list.queryDateList;
                        _this.datacodeList = list.datacodeList;
                        if (_this.datacodeList != '' || _this.datacodeList != undefined) {
                            _this.datacodeList = _this.datacodeList + ',APPLY_STS';
                            yufp.lookup.reg(_this.datacodeList);
                        }
                        _this.key = list.key;
                        _this.amt = list.amt;
                        _this.modelVal = list.model;
                        _this.maxDstrRate = list.maxDstrRate;
                        _this.minAmt = list.minAmt;
                        _this.allowRepeat = list.allowRepeat;
                        /!*if (list.dstrType == '1') {
                            _this.flagOne = false;
                        } else {
                            _this.flagOne = true;
                        }*!/
                        _this.flagOne = true;
                        if (list.dstrPeriod == '1') {
                            _this.flagPeriod = false;
                        } else {
                            _this.flagPeriod = true;
                        }
                        _this.params = {
                            condition: JSON.stringify({
                                funCode: data.funCode,
                                dataAuth: list.dataAuth,
                                // orgId: yufp.session.details.grantOrgCode,
                                orgId: yufp.session.org.code,
                                isPc: '0',
                                dstrSts: ''
                            })
                        };
                    }
                });*/
            },
            watch: {
                dialogVisible: function (newVal) {
                    var _this = this;
                    if (newVal) {
                        // 清空留存数据
                        _this.contactData = [];
                        var obj = _this.$refs.yutable1.selections[0];
                        var model = {};
                        model.funCode = data.funCode;
                        for (var i = 0; i < _this.key.length; i++) {
                            model[_this.key[i].ename] = obj[_this.key[i].ename];
                        }
                        if (data.funCode == 'CustComDstr' || data.funCode == 'CustPerDstr') {
                            model.acctOrgId = obj.acctOrgId;
                        }
                        model.loansInfoId = obj.id;
                        yufp.service.request({
                            method: 'GET',
                            url: backend.appBaseService + '/api/PmaFComDepLoansPeriodResource/queryList',
                            data: {condition: JSON.stringify(model)},
                            callback: function (code, message, response) {
                                _this.formDataTwo = response.data;
                                _this.$refs.refForm.resetFields();
                                // 判断是否显示增加分配按钮
                                if (_this.formDataTwo.length > 0) {
                                    _this.flagTwo = false;
                                } else {
                                    _this.flagTwo = true;
                                }
                                for (var i = 0; i < _this.formDataTwo.length; i++) {
                                    Vue.set(_this.formDataTwo[i], 'effectDate', _this.fromDate(_this.formDataTwo[i].effectDate));
                                    Vue.set(_this.formDataTwo[i], 'expirateDate', _this.fromDate(_this.formDataTwo[i].expirateDate));
                                    Vue.set(_this.formDataTwo[i], 'operTime', _this.fromDate(_this.formDataTwo[i].operTime));
                                    Vue.set(_this.formDataTwo[i], 'acctNo', obj.acctNo);
                                    Vue.set(_this.formDataTwo[i], 'subAcctNo', obj.subAcctNo);

                                    Vue.set(_this.formDataTwo[i], 'operOrgName', yufp.session.org.name);
                                    Vue.set(_this.formDataTwo[i], 'operUserName', yufp.session.user.userName);

                                    Vue.set(_this.formDataTwo[i], 'pmaFComDepLoansRel', []);

                                    var modelQuery = {};
                                    modelQuery.funCode = data.funCode;
                                    modelQuery.periodId = _this.formDataTwo[i].id;
                                    // 获取分配明细
                                    yufp.service.request({
                                        async: false,
                                        method: 'GET',
                                        url: backend.appBaseService + '/api/PmaFComDepLoansRelResource/queryList',
                                        data: {condition: JSON.stringify(modelQuery)},
                                        callback: function (code, message, response) {
                                            _this.formDataTwo[i].pmaFComDepLoansRel = response.data;
                                            //_this.contactData = _this.formDataTwo[i].pmaFComDepLoansRel;
                                            _this.contactData = response.data;
                                        }
                                    });
                                }
                            }
                        });
                    }
                },
                dialogVisibleDetail: function (newVal) {
                    var _this = this;
                    if (newVal) {
                        // 清空留存数据
                        _this.contactData = [];
                        var obj = _this.$refs.yutable1.selections[0];
                        var model = {};
                        model.funCode = data.funCode;
                        for (var i = 0; i < _this.key.length; i++) {
                            model[_this.key[i].ename] = obj[_this.key[i].ename];
                        }
                        if (data.funCode == 'CustComDstr' || data.funCode == 'CustPerDstr') {
                            model.acctOrgId = obj.acctOrgId;
                        }
                        model.loansInfoId = obj.id;
                        var urlPeriod = backend.appBaseService + '/api/PmaFComDepLoansPeriodResource/queryList';
                        var urlDetail = backend.appBaseService + '/api/PmaFComDepLoansRelResource/queryList';

                        yufp.service.request({
                            method: 'GET',
                            url: urlPeriod,
                            data: {condition: JSON.stringify(model)},
                            callback: function (code, message, response) {
                                _this.formDataTwo = response.data;
                                _this.$refs.refForm.resetFields();
                                for (var i = 0; i < _this.formDataTwo.length; i++) {
                                    Vue.set(_this.formDataTwo[i], 'effectDate', _this.fromDate(_this.formDataTwo[i].effectDate));
                                    Vue.set(_this.formDataTwo[i], 'expirateDate', _this.fromDate(_this.formDataTwo[i].expirateDate));
                                    Vue.set(_this.formDataTwo[i], 'operTime', _this.fromDate(_this.formDataTwo[i].operTime));
                                    Vue.set(_this.formDataTwo[i], 'acctNo', obj.acctNo);
                                    Vue.set(_this.formDataTwo[i], 'subAcctNo', obj.subAcctNo);

                                    Vue.set(_this.formDataTwo[i], 'pmaFComDepLoansRel', []);

                                    var modelQuery = {};
                                    modelQuery.funCode = data.funCode;
                                    modelQuery.periodId = _this.formDataTwo[i].id;
                                    // 获取分配明细
                                    yufp.service.request({
                                        async: false,
                                        method: 'GET',
                                        url: urlDetail,
                                        data: {condition: JSON.stringify(modelQuery)},
                                        callback: function (code, message, response) {
                                            _this.formDataTwo[i].pmaFComDepLoansRel = response.data;
                                            // _this.contactData = _this.formDataTwo[i].pmaFComDepLoansRel;
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            },
            mounted: function () {
                var _this = this;
                // _this.$refs.queryFormRef.formdata.orgId = yufp.session.details.grantOrgCode;
                //_this.$refs.queryFormRef.formdata.orgId = yufp.session.org.code
                // _this.$nextTick(function () {
                //   _this.$refs.yutable1.remoteData(_this.params);
                // });
            },
            methods: {
                loadedHandler: function () {
                    var _this = this;
                    _this.loading.close();
                },
                searchFn: function () {
                    var _this = this;
                    _this.$refs['queryFormRef'].validate(function (valid) {
                        if (valid) {
                            // 显示loading
                            var options = {
                                target: cite.el, // Loading 需要覆盖的 DOM 节点
                                body: false, // 遮罩是否插入至 DOM 中的 body 中，true: 插入，false: 不插入，
                                fullscreen: false, // 遮罩是否全屏, true: 全屏，false: 非全屏
                                text: '拼命加载中', // 显示在加载图标下方的加载文案
                                customClass: 'trans-class' // Loading 的自定义类名
                            };
                            _this.loading = _this.$loading(options);
                            let model = {};
                            yufp.clone(_this.$refs['queryFormRef'].formdata, model);
                            for (let key in model) {
                                if (_this.queryDateList[key] && model[key]) {
                                    model[key] = yufp.util.dateFormat(model[key], _this.queryDateList[key] == 'yyyyMMdd' ? '{y}{m}{d}' : '{y}-{m}-{d}');
                                }
                            }
                            var param = {condition: JSON.stringify(model)};
                            _this.$refs.yutable1.remoteData(param);
                        } else {
                            return;
                        }
                    });
                },
                // 重置按钮
                resetFn: function () {
                    var _this = this;
                    _this.$nextTick(function () {
                        _this.$refs['queryFormRef'].resetFields();
                    });
                },
                fromDate: function (date) {
                    if (date) {
                        date = date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
                    }
                    return date;
                },
                /**
                 * 暂存
                 */
                tempSave: function () {
                    var _this = this;
                    for (var i = 0; i < _this.contactData.length; i++) {
                        if (_this.contactData[i].managerId == '') {
                            this.$message({message: '分配信息中客户经理编号不能为空!', type: 'warning'});
                            return;
                        }
                        if (_this.contactData[i].managerName == '') {
                            this.$message({message: '分配信息中客户经理名称不能为空!', type: 'warning'});
                            return;
                        }
                    }
                    var index = _this.queryData.id;
                    if (index === undefined || index === '') {
                        _this.$message('您还没有分配区间');
                        return;
                    }

                    _this.formDataTwo[index].pmaFComDepLoansRel = _this.contactData;
                    _this.$message('暂存成功');
                },
                /**
                 * 保存
                 */
                saveFn: function () {
                    var _this = this;
                    if (_this.formDataTwo.length == 0) {
                        _this.contactData = [];
                        _this.formDataTwo = [];
                        var index = undefined;
                    } else {
                        var index = _this.queryData.id;
                    }

                    if (index !== undefined && index !== '') {
                        _this.formDataTwo[index].pmaFComDepLoansRel = _this.contactData;
                    }
                    var mode = false;
                    var modeChild = false;

                    for (var i = 0; i < _this.formDataTwo.length; i++) {
                        var dataModel = _this.formDataTwo[i].pmaFComDepLoansRel;

                        for (var j = 0; j < dataModel.length; j++) {
                            if (dataModel[j].managerId == '') {
                                this.$message({message: '第' + (i + 1) + '个区间分配信息中客户经理编号不能为空!', type: 'warning'});
                                modeChild = true;
                                break;
                            }
                            if (dataModel[j].managerName == '') {
                                this.$message({message: '第' + (i + 1) + '个区间分配信息中客户经理名称不能为空!', type: 'warning'});
                                modeChild = true;
                                break;
                            }
                        }
                        if (modeChild) {
                            break;
                        }

                        if (dataModel.length == 0) {
                            _this.$message({message: '第' + (i + 1) + '个区间没有分配明细，请配置', type: 'warning'});
                            mode = true;
                            break;
                        }
                    }
                    if (mode || modeChild) {
                        return;
                    }
                    // var modelOne = {};
                    // yufp.clone(_this.contactData, modelOne);

                    var obj = _this.$refs.yutable1.selections[0];
                    var DepAcctInfoPV = obj.id;
                    var applySts = obj.applySts;
                    var orgId = '';
                    if (data.funCode == 'ComCustDstr' || data.funCode == 'PerCustDstr') {
                        orgId = obj.acctOrgId;
                    } else {
                        orgId = obj.orgId;
                    }
                    var model = [];
                    for (var i = 0; i < _this.key.length; i++) {
                        var modelTwo = {};
                        modelTwo[_this.key[i].ename] = obj[_this.key[i].ename];
                        for (var keyOne in _this.modelVal) {
                            modelTwo[keyOne] = _this.modelVal[keyOne];
                            modelTwo[_this.amt] = obj[_this.amt];
                        }
                        model.push(modelTwo);
                    }
                    _this.$confirm('是否确定要保存?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                // 向后台发送保存请求
                                yufp.service.request({
                                    method: 'POST',
                                    //url: backend.appBaseService + '/api/PmaFComDepLoansInfoResource/savePeriodAndDistribute',
                                    url: backend.appBaseService + '/api/PmaFComDepCommResource/savePeriodAndDistribute',
                                    data: {
                                        workType: '2',
                                        loansInfoId: DepAcctInfoPV,
                                        periodList: _this.formDataTwo
                                    },
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            _this.$refs.yutable1.remoteData();
                                            _this.$message('操作成功');
                                            _this.dialogVisible = false;
                                            _this.commitFn2(DepAcctInfoPV,applySts);
                                        }
                                    }
                                });
                            }
                        }
                    });
                },

                commitFn2: function(approveId,applySts){
                    var _this = this;

                    if (approveId == undefined || approveId == null || approveId == '') {
                        _this.$message({message: '获取审批id失败，请联系管理员', type: 'warning'});
                        return;
                    }

                    if (applySts == 1) {
                        _this.$message({message: '该条数据正在审批中...', type: 'warning'});
                        return;
                    }
                    var commitData = {};
                    commitData.instanceId = approveId; // 关联业务编号
                    commitData.bizSeqNo = approveId; // 关联业务编号
                    commitData.applType = 'DKYJFP'; // 审批流程
                    commitData.custName = yufp.session.userName; // 展示主题名称
                    commitData.custId = yufp.session.userId;
                    _this.$refs.yufpWfInit.wfInit(commitData);
                },

                /**
                 * 多区间分配
                 */
                addFn: function () {
                    var _this = this;
                    if (_this.$refs.yutable1.selections.length != 1) {
                        _this.$message({message: '请选择一条数据', type: 'warning'});
                        return;
                    }
                    var obj = _this.$refs.yutable1.selections[0];
                    //1未分配 2已分配 3自动分配 4待审批
                    // 审批中1 审批通过2 审批驳回3
                    if (obj.dstrSts != null && obj.dstrSts != undefined && obj.applySts != null && obj.applySts != undefined) {
                        if (obj.dstrSts == '2') {
                            _this.$message({message: '只能选择分配状态为“未分配”或“自动分配””的数据', type: 'warning'});
                            if (obj.dstrSts == '4' && (obj.applySts == '1' || obj.applySts == '2')) {
                                _this.$message({message: '只能选择审批状态为“审批驳回”的数据', type: 'warning'});
                            }
                            return;
                        }
                    }
                    _this.dialogVisible = true;
                    // 新加etl状态校验
                    /*yufp.service.request({
                        method: 'GET',
                        url: backend.appBaseService + '/api/commondistribution/queryEtlState',
                        callback: function (code, message, response) {
                            if (response.etlState == 1) {
                                _this.dialogVisible = true;
                            } else {
                                _this.$message({ message: '系统正在跑批中，请稍后处理业务！', type: 'warning' });
                                return;
                            }
                        }
                    });*/
                },
                /**
                 * 多区间分配详情
                 */
                detailFn: function () {
                    var _this = this;
                    if (_this.$refs.yutable1.selections.length != 1) {
                        _this.$message({message: '请选择一条数据', type: 'warning'});
                        return;
                    }
                    _this.dialogVisibleDetail = true;
                },
                /**
                 * 取消
                 */
                cancelFn: function () {
                    var _this = this;
                    _this.dialogVisibleDetail = false;
                },
                /**
                 * 拆分区间
                 */
                handleChaifen: function (index, row) {
                    var effectDate = this.formDataTwo[index].effectDate;
                    var expirateDate = this.formDataTwo[index].expirateDate;
                    if (this.formDataTwo[index].effectDate == '') {
                        this.$message({message: '选中的数据起始日期不能为空!', type: 'warning'});
                        return;
                    }

                    var arrEnd = expirateDate.split('-');
                    var yearEnd = arrEnd[0];
                    var monthEnd = arrEnd[1];

                    var arr = effectDate.split('-');
                    var year = arr[0]; // 获取当前日期的年份
                    var month = arr[1]; // 获取当前日期的月份

                    // 先判断是否需要划分区间
                    if (year == yearEnd && month == monthEnd) {
                        this.$message({message: '选中的数据已不能拆分区间!', type: 'warning'});
                        return;
                    }
                    var year2 = null;
                    var month2 = null;
                    if (new Date(effectDate) < this.etlDate.getTime()) {
                        var etlDate = yufp.util.dateFormat(this.etlDate, '{y}{m}');
                        year2 = etlDate.substring(0, 4);
                        month2 = parseInt(etlDate.substring(4, 6)) - 1;
                        if (month2 < 10) {
                            month2 = '0' + month2.toString();
                        }
                        this.formDataTwo[index].expirateDate = this.getLastDayOfMonth(year2, month2);
                        month2 = etlDate.substring(4, 6);
                    } else {
                        this.formDataTwo[index].expirateDate = this.getLastDayOfMonth(year, month);
                        year2 = year;
                        month2 = parseInt(month) + 1;
                        if (month2 == 13) {
                            year2 = parseInt(year2) + 1;
                            month2 = 1;
                        }
                        if (month2 < 10) {
                            month2 = '0' + month2.toString();
                        }
                    }

                    var obj = {
                        effectDate: year2 + '-' + month2 + '-01',
                        expirateDate: expirateDate,
                        operOrgName: yufp.session.org.name,
                        operUserName: yufp.session.user.userName,
                        operUserId: yufp.session.user.loginCode,
                        // operOrgId: yufp.session.details.grantOrgCode,
                        operOrgId: yufp.session.org.code,
                        operTime: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}'),
                        pmaFComDepLoansRel: []
                    };
                    this.formDataTwo.splice(parseInt(index) + 1, 0, obj);
                },
                /**
                 * 分配明细
                 */
                handleFenpei: function (index, row) {
                    var _this = this;
                    _this.$nextTick(function () {
                        _this.$refs.refForm.resetFields();
                        _this.activeNames = ['1'];
                        _this.queryData.id = index;
                        _this.queryData.effectDate = row.effectDate;
                        _this.queryData.expirateDate = row.expirateDate;
                        _this.flagThree = true;
                        var model = {};
                        model.funCode = data.funCode;
                        model.periodId = row.id;
                        if (model.periodId == undefined) {
                            model.periodId = "null";
                        }
                        model.effectDate = row.effectDate;
                        model.expirateDate = row.expirateDate;
                        // 获取分配明细
                        var url = backend.appBaseService + '/api/PmaFComDepLoansRelResource/queryList';
                        yufp.service.request({
                            method: 'GET',
                            url: url,
                            data: {condition: JSON.stringify(model)},
                            callback: function (code, message, response) {
                                _this.contactData = response.data;
                                if (_this.contactData.length == 0) {
                                    _this.flagThree = true;
                                } else {
                                    _this.flagThree = false;
                                }
                            }
                        });
                        //}
                    });
                },
                /**
                 * 删除区间
                 */
                handleDelete: function (index, row) {
                    /* var date = new Date(row.effectDate);
                     if (date < new Date()) {
                         this.$message({ message: '不能删除今天前区间分配的数据', type: 'warning' });
                         return;
                     }*/
                    if (index > 0) {
                        var key = parseInt(index) - 1;
                        this.formDataTwo[key].expirateDate = row.expirateDate;
                    }
                    this.formDataTwo.splice(index, 1);
                },
                /**
                 * 增加分配
                 */
                addTwoFn: function () {
                    var _this = this;
                    var obj = {
                        effectDate: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}'),
                        expirateDate: '2099-12-31',
                        operOrgName: yufp.session.org.name,
                        operUserName: yufp.session.user.userName,
                        operUserId: yufp.session.user.loginCode,
                        // operOrgId: yufp.session.details.grantOrgCode,
                        operOrgId: yufp.session.org.code,
                        operTime: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}'),
                        pmaFComDepLoansRel: []
                    };
                    _this.formDataTwo.push(obj);
                },
                /**
                 * 获取当月最后一天
                 */
                getLastDayOfMonth: function (year, month) {
                    var lastDay = new Date(year, month, 0).getDate();
                    return year + '-' + month + '-' + lastDay;
                },
                /**
                 * 删除分配
                 */
                handleThreeDelete: function (index, row) {
                    if (this.flagOne) {
                        // 有起始金额和结束金额
                        var flag = true;
                        var key = [];
                        this.contactData.splice(index, 1);
                        for (var i = 0; i < this.contactData.length; i++) {
                            if (row.startAmt == this.contactData[i].startAmt && row.endAmt == this.contactData[i].endAmt) {
                                if (flag) {
                                    this.contactData[i].distrRate = (parseFloat(this.contactData[i].distrRate) + parseFloat(row.distrRate)).toFixed(2);
                                    flag = false;
                                }
                            }
                            if (parseInt(this.contactData[i].startAmt) - 1 == parseInt(row.endAmt)) {
                                key.push(i);
                            }
                        }
                        if (flag) {
                            for (var j = 0; j < key.length; j++) {
                                var indexTwo = key[j];
                                this.contactData[indexTwo].startAmt = row.startAmt;
                            }
                        }
                        if (this.contactData.length == 0) {
                            this.flagThree = true;
                        } else {
                            this.flagThree = false;
                        }
                    } else {
                        // 没有起始金额结束金额
                        var key = index + 1;
                        if (this.contactData.length == 1) {
                            this.contactData.splice(index, 1);
                        } else {
                            if (index != this.contactData.length - 1) {
                                this.contactData[key].distrRate = (parseFloat(this.contactData[key].distrRate) + parseFloat(row.distrRate)).toFixed(2);
                            } else {
                                this.contactData[0].distrRate = (parseFloat(this.contactData[0].distrRate) + parseFloat(row.distrRate)).toFixed(2);
                            }
                            this.contactData.splice(index, 1);
                        }
                        if (this.contactData.length == 0) {
                            this.flagThree = true;
                        } else {
                            this.flagThree = false;
                        }
                    }
                },
                /**
                 * 分配关系
                 */
                addThreeFn: function () {
                    var _this = this;
                    _this.flagThree = false;
                    this.contactData = [{
                        managerId: '',
                        managerName: '',
                        startAmt: 0,
                        endAmt: '999999999999',
                        distrRate: 100
                    }];
                },
                addThree2Fn: function () {
                    var _this = this;
                    var obj = {
                        managerId: '',
                        managerName: '',
                        startAmt: this.minAmt,
                        endAmt: '999999999999',
                        distrRate: this.maxDstrRate
                    };
                    _this.contactData.push(obj);
                },
                /**
                 * 员工分配比例拆分
                 */
                changeRatio: function (index) {
                    var distrRate = parseFloat(this.maxDstrRate);
                    distrRate = 100;
                    var olddistrRate = this.oldData[index].distrRate;
                    var obj = this.contactData[index];
                    // var re = /^[0-9]+$/;
                    // if (!re.test(obj.distrRate)) {
                    //   this.contactData[index].distrRate = olddistrRate;
                    //   this.$message({ message: '请输入正整数', type: 'warning' });
                    //   return;
                    // }
                    var re = /^\d+(\.{0}|\.{1}[0-9]{1,2})?$/;
                    if (!re.test(obj.distrRate)) {
                        this.contactData[index].distrRate = olddistrRate;
                        this.$message({message: '请输入正整数或保留2位的小数', type: 'warning'});
                        return;
                    }
                    if (olddistrRate == obj.distrRate) {
                        return;
                    }
                    var virManagerId = 'vm' + yufp.session.org.code;
                    if (this.flagOne) {
                        // 遍历获取相同的起始金额和结束金额
                        var startMoney = obj.startAmt;
                        var endAmt = obj.endAmt;
                        var distrRateall = 0;
                        for (var i = 0; i < this.contactData.length; i++) {
                            if (this.contactData[i].startAmt == startMoney && this.contactData[i].endAmt == endAmt) {
                                distrRateall += parseFloat(this.contactData[i].distrRate);
                            }
                        }
                        distrRateall = distrRateall.toFixed(2);
                        if (distrRateall >= distrRate) {
                            this.contactData[index].distrRate = olddistrRate;
                            this.$message({message: '员工分配比例和不能超出100%!', type: 'warning'});
                            return;
                        }
                        distrRate = (distrRate - distrRateall).toFixed(2);
                        var obj = {
                            managerId: virManagerId,//''
                            managerName: '虚拟客户经理',//''
                            startAmt: startMoney,
                            endAmt: endAmt,
                            distrRate: distrRate
                        };
                        this.contactData.splice(parseInt(index) + 1, 0, obj);
                    } else {
                        // 没有起始金额和结束金额
                        var distrRateall = 0;
                        for (var i = 0; i < this.contactData.length; i++) {
                            distrRateall += parseFloat(this.contactData[i].distrRate);
                        }
                        distrRateall = distrRateall.toFixed(2);
                        if (distrRateall >= distrRate) {
                            this.contactData[index].distrRate = olddistrRate;
                            this.$message({message: '员工分配比例和不能超出' + distrRate + '!', type: 'warning'});
                            return;
                        }
                        distrRate = (distrRate - distrRateall).toFixed(2);
                        var obj = {
                            managerId: virManagerId,//''
                            managerName: '虚拟客户经理',//''
                            startAmt: '',
                            endAmt: '',
                            distrRate: distrRate
                        };
                        this.contactData.splice(parseInt(index) + 1, 0, obj);
                    }
                },
                /**
                 * 员工结束金额拆分
                 */
                changeMoney: function (index) {
                    var startMoney = this.contactData[index].startAmt;
                    var endAmt = this.contactData[index].endAmt;
                    var oldStartMoney = this.oldData[index].startAmt;
                    var oldendAmt = this.oldData[index].endAmt;
                    var re = /^[0-9]+$/;
                    if (!re.test(endAmt)) {
                        this.contactData[index].endAmt = oldendAmt;
                        this.$message({message: '请输入正整数', type: 'warning'});
                        return;
                    }
                    if (endAmt == oldendAmt) {
                        return;
                    }
                    if (parseInt(startMoney) > parseInt(endAmt)) {
                        this.contactData[index].endAmt = oldendAmt;
                        this.$message({message: '输入不合法', type: 'warning'});
                        return;
                    }
                    var obj = {};
                    if (parseInt(endAmt) < parseInt(oldendAmt)) {
                        obj = {
                            managerId: '',
                            managerName: '',
                            startAmt: parseInt(endAmt) + 1,
                            endAmt: oldendAmt,
                            distrRate: 100
                        };
                        // 循环判断是否存在相同区域的数据
                        var key = 0;
                        for (var i = 0; i < this.contactData.length; i++) {
                            if (this.contactData[i].startAmt == oldStartMoney && this.contactData[i].endAmt == oldendAmt) {
                                this.contactData[i].endAmt = endAmt;
                                key = i;
                            }
                        }
                        if (key > index) {
                            this.contactData.splice(parseInt(key) + 1, 0, obj);
                        } else {
                            this.contactData.splice(parseInt(index) + 1, 0, obj);
                        }
                    } else {
                        for (var i = 0; i < this.contactData.length; i++) {
                            if (this.contactData[i].startAmt == oldStartMoney && this.contactData[i].endAmt == oldendAmt) {
                                this.contactData[i].endAmt = endAmt;
                            }
                            if (parseInt(this.contactData[i].startAmt) - 1 == parseInt(oldendAmt)) {
                                this.contactData[i].startAmt = parseInt(endAmt) + 1;
                            }
                        }
                    }
                },
                /**
                 * 起始日期返回字符串
                 * 修改起始日期时间上下变化
                 */
                updateBeginDate: function (index, val) {
                    var obj = this.formDataTwo[index];
                    if (typeof val == 'string') {
                        obj.effectDate = val;
                    }
                    if (typeof val == 'object') {
                        obj.effectDate = yufp.util.dateFormat(val, '{y}-{m}-{d}');
                        if (index != 0) {
                            var key = index - 1;
                            this.formDataTwo[key].expirateDate = this.getNextDate(obj.effectDate, -1);
                        }
                    }
                },
                /**
                 * 获取指定日期的前几天或后几天
                 */
                getNextDate: function (date, day) {
                    var dd = new Date(date);
                    dd.setDate(dd.getDate() + day);
                    var y = dd.getFullYear();
                    var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;
                    var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
                    return y + '-' + m + '-' + d;
                },
                /**
                 * 保存修改前数据
                 */
                saveOld: function (event) {
                    this.oldData = JSON.parse(JSON.stringify(this.contactData));
                },
                /**
                 * 清除
                 */
                clearFn: function () {
                    this.contactData = [];
                },
                mgrSelectFn: function (data) {
                    var _this = this;
                    var obj = _this.$refs.refTableThree.selections[0];
                    if (_this.allowRepeat == '0') {
                        if (_this.flagOne) {
                            // 带金额校验
                            if (_this.userflagEqualTwo(data[0].loginCode, obj.startAmt, obj.endAmt)) {
                                obj.managerId = data[0].loginCode;
                                obj.managerName = data[0].userName;
                            } else {
                                obj.managerId = '';
                                obj.managerName = '';
                                _this.$message({message: '存在相同的客户经理的分配数据', type: 'warning'});
                            }
                        } else {
                            if (_this.userflagEqual(data[0].loginCode)) {
                                obj.managerId = data[0].loginCode;
                                obj.managerName = data[0].userName;
                            } else {
                                obj.managerId = '';
                                obj.managerName = '';
                                _this.$message({message: '存在相同的客户经理的分配数据', type: 'warning'});
                            }
                        }
                    } else {
                        obj.managerId = data[0].loginCode;
                        _this.$set(obj, 'managerName',data[0].userName)
                        // obj.managerName = data[0].userName;
                    }

                },
                userflagEqual: function (loginCode) {
                    var newList = this.contactData.filter(function (obj) {
                        return obj.managerId == loginCode;
                    });
                    if (newList.length > 0) {
                        return false;
                    } else {
                        return true;
                    }
                },
                userflagEqualTwo: function (loginCode, startAmt, endAmt) {
                    var newList = this.contactData.filter(function (obj) {
                        return obj.managerId == loginCode && obj.startAmt == startAmt && obj.endAmt == endAmt;
                    });
                    if (newList.length > 0) {
                        return false;
                    } else {
                        return true;
                    }
                },
                commitFn: function () {
                    var _this = this;
                    if (_this.$refs.yutable1.selections.length != 1) {
                        _this.$message({message: '请选择一条数据进行审批', type: 'warning'});
                        return;
                    }
                    var obj = _this.$refs.yutable1.selections[0];
                    var approveId = obj.id;
                    if (approveId == undefined || approveId == null || approveId == '') {
                        _this.$message({message: '获取审批id失败，请联系管理员', type: 'warning'});
                        return;
                    }
                    var applySts = obj.applySts;
                    if (applySts == 1) {
                        _this.$message({message: '该条数据正在审批中...', type: 'warning'});
                        return;
                    }
                    var commitData = {};
                    commitData.instanceId = approveId; // 关联业务编号
                    commitData.bizSeqNo = approveId; // 关联业务编号
                    commitData.applType = 'DKYJFP'; // 审批流程
                    commitData.custName = yufp.session.userName; // 展示主题名称
                    commitData.custId = yufp.session.userId;
                    _this.$refs.yufpWfInit.wfInit(commitData);
                },
                onAfterInit: function (data) {
                },
                // 审批页面关闭后
                onAfterClose: function () {
                    var _this = this;
                    _this.$refs.yutable1.remoteData();
                }

            }
        });
    };
});