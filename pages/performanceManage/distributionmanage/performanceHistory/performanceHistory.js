/**
 * @Created by raop
 * @updated by
 * @description 业绩分配历史查询
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
                    dataUrl: backend.appBaseService + '/api/PmaFComDepCommResource/queryDepositHis',
                    dataUrl2: backend.appBaseService + '/api/PmaFComDepCommResource/queryDepositHis',
                    dataUrl3: backend.custmgrService +'/api/pmamiddistribute/queryMidHis',
                    params1: {
                        condition: JSON.stringify({ workType: '1'})
                    },
                    params2: {
                        condition: JSON.stringify({ workType: '2'})
                    },
                    params: {},
                    wfCommonParams: {
                        sessionInstuCde: yufp.session.instu.code,
                        sessionOrgCode: yufp.session.org.code,
                        sessionLoginCode: yufp.session.user.loginCode
                    },
                    rule: [
                        { required: true, message: '必填项', trigger: 'blur' },
                        { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
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
                    allowRepeat: '',
                    dialogVisibleDetail: false,
                    queryDateList: {},
                    loading: false,
                    tabName: '1'
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
            },
            watch: {

            },
            mounted: function () {
                var _this = this;
            },
            methods: {
                loadedHandler: function () {
                    var _this = this;
                    _this.loading.close();
                },
                searchFn: function (val) {
                    var _this = this;
                    if(val == 1){
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
                                //分配比例，分配金额不为空的限制
                                model.rateNotNull = 1;
                                model.startAmtNotNull = 1;
                                model.endAmtNotNull = 1;
                                for (let key in model) {
                                    if (_this.queryDateList[key] && model[key]) {
                                        model[key] = yufp.util.dateFormat(model[key], _this.queryDateList[key] == 'yyyyMMdd' ? '{y}{m}{d}' : '{y}-{m}-{d}');
                                    }
                                }
                                var param = { condition: JSON.stringify(model) };
                                _this.$refs.yutable1.remoteData(param);
                            } else {
                                return;
                            }
                        });
                    }else if(val == 2){
                        _this.$refs['queryFormRef2'].validate(function (valid) {
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
                                yufp.clone(_this.$refs['queryFormRef2'].formdata, model);
                                //分配比例不为空的限制
                                model.rateNotNull = 1;
                                for (let key in model) {
                                    if (_this.queryDateList[key] && model[key]) {
                                        model[key] = yufp.util.dateFormat(model[key], _this.queryDateList[key] == 'yyyyMMdd' ? '{y}{m}{d}' : '{y}-{m}-{d}');
                                    }
                                }
                                var param = { condition: JSON.stringify(model) };
                                _this.$refs.yutable2.remoteData(param);
                            } else {
                                return;
                            }
                        });
                    }else if(val == 3){
                        _this.$refs['queryFormRef3'].validate(function (valid) {
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
                                yufp.clone(_this.$refs['queryFormRef3'].formdata, model);
                                //分配比例不为空的限制
                                model.rateNotNull = 1;
                                for (let key in model) {
                                    if (_this.queryDateList[key] && model[key]) {
                                        model[key] = yufp.util.dateFormat(model[key], _this.queryDateList[key] == 'yyyyMMdd' ? '{y}{m}{d}' : '{y}-{m}-{d}');
                                    }
                                }
                                var param = { condition: JSON.stringify(model) };
                                _this.$refs.yutable3.remoteData(param);
                            } else {
                                return;
                            }
                        });
                    }

                },
                // 重置按钮
                resetFn: function (val) {
                    var _this = this;
                    if(val == 1){
                        _this.$nextTick(function () {
                            _this.$refs['queryFormRef'].resetFields();
                        });
                    }else if(val == 2){
                        _this.$nextTick(function () {
                            _this.$refs['queryFormRef2'].resetFields();
                        });
                    }else if(val == 3){
                        _this.$nextTick(function () {
                            _this.$refs['queryFormRef3'].resetFields();
                        });
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
                                _this.$message({ message: '存在相同的客户经理的分配数据', type: 'warning' });
                            }
                        } else {
                            if (_this.userflagEqual(data[0].loginCode)) {
                                obj.managerId = data[0].loginCode;
                                obj.managerName = data[0].userName;
                            } else {
                                obj.managerId = '';
                                obj.managerName = '';
                                _this.$message({ message: '存在相同的客户经理的分配数据', type: 'warning' });
                            }
                        }
                    } else {
                        obj.managerId = data[0].loginCode;
                        obj.managerName = data[0].userName;
                        console.log(_this.contactData);
                    }

                }
            }
        });
    };
});