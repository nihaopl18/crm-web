/**
 * @created by chenlin on 2018/06/20.
 * @description 查询+树模板
 */
define([
    // './components/tagList.js',
    './pages/dy/customerSearch/components/editAssetInfoTable.js',
    './pages/dy/customerSearch/components/editAssetInfoTable.js',
    './custom/widgets/js/yufpExtTree.js',
    './pages/dy/commonComponent/titleContent.js',
    './pages/dy/commonComponent/customerEdit.js',
    './pages/dy/customerSearch/components/saveCustomerGroup.js',
    './custom/widgets/js/yufpGroupList.js',
    './custom/widgets/js/YufpCustFlexyQuery.js'
], function (require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('EXPIRE_LIST,ORIGION_LIST,EXPIRE_LIST,YEAR_SECTION_LIST,CUST_GRADE,CUSTOMER_TAG_LIST,CD0069,CD0348');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _this = this;
                var checkID = function (rule, value, callback) {
                    if (_this.singleQueryParams.certNo && !value) {
                        return callback(new Error('请选择证件类型'));
                    } else if (!_this.singleQueryParams.certNo && !value) {
                        _this.$refs.singleQueryForm.clearValidate('certNo');
                        callback();
                    } else {
                        callback();
                    }
                };
                var checkCertNo = function (rule, value, callback) {
                    if (_this.singleQueryParams.custType && !value) {
                        return callback(new Error('请输入证件号码'));
                    } else if (!_this.singleQueryParams.custType && !value) {
                        _this.$refs.singleQueryForm.clearValidate('custType');
                        callback();
                    } else {
                        callback();
                    }
                };
                return {
                    custObjPram: {},
                    prodNameValue: '',
                    custTypeRole: false,
                    custdisabled: false,
                    currentPage1: 1,
                    value: '',
                    orgIdAuth: '',
                    fastSearchValue: '',
                    hasChooseQuery: false,
                    applyDialogVisible: false,
                    saveCustomerDialogVisible: false,
                    advancedQueryDialogVisible: false,
                    tableData: [],
                    singleQueryParams: {},
                    composeQueryParams: {},
                    selectRows: [],
                    baseParams: {
                        orgIdAuth: this.orgIdAuth,
                        custQueryType: '02'
                    },
                    filterData: {},
                    IDTypeRule: [{ validator: checkID, trigger: 'change' }],
                    certNoRule: [{ validator: checkCertNo, trigger: 'blur' }],
                    ORIGION_LIST: [],
                    tempQueryParams: {},
                    hashCode: hashCode,
                    custQueryTypeMap: {
                        'cd57b54582514204baaf194678660dba': '01',
                        'b8992ab786a24380b28f579f5efe789f': '02' // 我的客户
                    },
                    urlMap: {
                        'cd57b54582514204baaf194678660dba': '/api/ocrmfcicgbase/publiccustomerList', // 公共池客户
                        'b8992ab786a24380b28f579f5efe789f': '/api/ocrmfcicgbase/customerList', // 我的客户
                    },
                    btnDisabled: false,
                    isShowEdit: true,
                    userSelectRole: false,
                    userRoleArr: ['R001', 'R006', 'R007', 'R008', 'R009', 'R010', 'R011', 'R012'],
                    isEdit: false,
                    isEditArr: ['R002', 'R003'],
                    searchBoxShow: false,
                    custResults: [
                        // { prodName: '3dfewdfd健康的减肥3', prodId: '234576dd' },
                        // { prodName: '1简单快捷发电机房3', prodId: '4ddfvd' },
                        // { prodName: '21简单快捷发电dfec3', prodId: '24dfd2dd' },
                        // { prodName: '3dfe就看见康的减肥3', prodId: '232344dd' },
                        // { prodName: '1简单快捷发电机房3', prodId: '4d5643d' },
                        // { prodName: '21简单快捷发电dfec3', prodId: '2354dd' },
                        // { prodName: '3dfewdfd健康的减肥3', prodId: '224534dd' },
                        // { prodName: '1简单快捷发电机房3', prodId: '4dd2452' },
                        // { prodName: '21简单快捷发电dfec3', prodId: '224524dd' },
                        // { prodName: '21简单快捷发电dfec3', prodId: '24254dd' }
                    ],
                    showor: false
                };
            },
            created: function () {
                this.baseParams.custQueryType = this.custQueryTypeMap[this.hashCode];
                this.isShowEdit = this.custQueryTypeMap[this.hashCode] == '01' ? false : true;
                // this.userCodeNo();
                // 查询条线
                let _this = this;
                let orgCode = yufp.sessionStorage.get('YUFP-SESSION-USER');
                _this.orgIdAuth = JSON.parse(orgCode).org.code || JSON.parse(orgCode).org.id || '';
                // yufp.service.request({
                //     method: 'GET',
                //     url: backend.custpubService + '/api/governedcust/getbusitype',
                //     data: {
                //         condition: JSON.stringify({ userId: yufp.session.userId })
                //     },
                //     callback: function(code, message, response) {
                //         if (code == 0 && response.code === 0) {
                //             if (response.data) {
                //                 _this.orgIdAuth = response.data.orgIdAuth;
                //             }
                //         } else {
                //             _this.$message.error('查询失败');
                //         }
                //     }
                // });
            },
            mounted: function () {
                var t = this;
                this.userCodeNo();
                this.isEditFn();
                this.ORIGION_LIST = yufp.lookup.find('ORIGION_LIST');
                // this.jschangeCss();
                document.addEventListener("click", function (e) {
                    var box = document.getElementById("ulid");
                    if (box != null) {
                        if (!box.contains(e.target)) {
                            t.showor = false;

                        }
                    }
                })
            },
            methods: {
                getCustTypeRole: function (info) {
                    if (info.custTypeRole == false) {
                        this.custObjPram.prodId = '';
                    }
                    this.custdisabled = info.custTypeRole;
                },
                custParamFn: function (nodeData) {
                    let _this = this;
                    _this.custObjPram.prodId = nodeData.catlCode
                },
                jschangeCss: function () {
                    let offsetTop = 0;
                    let offsetLeft = 0;
                    let el = $('#prodnameid input')[0];
                    while (el && el.tagName !== 'BODY') {
                        offsetTop += el.offsetTop
                        offsetLeft += el.offsetLeft
                        el = el.offsetParent
                    }
                    $('#prodnameid input')[0].style.width = el.offsetWidth + 'px';
                    $('#prodnameid input')[0].style.top = offsetTop - 70 + 'px';
                    $('#prodnameid input')[0].style.left = offsetLeft - 70 + 'px';
                },
                handleCustomerSelect: function (item) {
                    var _this = this;
                    _this.prodNameValue = item.prodName + '--' + item.prodId;
                    setTimeout(function () {
                        _this.showor = false;
                    }, 100);
                    _this.showor = false;
                },
                custTpChangeFn: function () {
                    var _this = this;
                    var prodId = '';
                    var prodName = '';
                    _this.searchBoxShow = true;
                    // if (/^\d+$/.test(this.prodNameValue)) {
                    //     prodId = this.prodNameValue;
                    // } else {
                    //     prodName = this.prodNameValue;
                    // }
                    // 检测是否为中文
                    if (_this.checkChinese(_this.prodNameValue)) {
                        prodName = _this.prodNameValue;
                    } else {
                        prodId = _this.prodNameValue;
                    }

                    // 控制下面是否展示
                    if (_this.prodNameValue && _this.prodNameValue.length != 0) {
                        _this.showor = true;
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/ocrmfcicgbase/queryprodlist',
                            data: {
                                prodId: prodId,
                                prodName: prodName
                            },
                            callback: function (code, message, response) {
                                if (code === 0) {
                                    _this.custResults = response.data;
                                }
                            }
                        });
                    } else {
                        _this.showor = false;
                    }
                },
                userCodeNo: function () {
                    var _this = this;
                    var selectRole = yufp.sessionStorage.get('selectRole');
                    var rolesArr = yufp.session.roles;
                    for (var i = 0; i < rolesArr.length; i++) {
                        if (selectRole == rolesArr[i].id) {
                            if (_this.userRoleArr.indexOf(rolesArr[i].code) != -1) {
                                _this.userSelectRole = true; // 包含
                            } else {
                                _this.userSelectRole = false;
                            }
                        }
                    }
                },
                isEditFn: function () {
                    var _this = this;
                    var selectRole = yufp.sessionStorage.get('selectRole');
                    var rolesArr = yufp.session.roles;
                    for (var i = 0; i < rolesArr.length; i++) {
                        if (selectRole == rolesArr[i].id) {
                            if (_this.isEditArr.indexOf(rolesArr[i].code) != -1) {
                                _this.isEdit = false; // 包含
                            } else {
                                _this.isEdit = true;
                            }
                        }
                    }
                },
                handleReginClick: function (e) {
                    this.composeQueryParams.countAreaCd === e ? this.composeQueryParams.countAreaCd = '' : this.composeQueryParams.countAreaCd = e;
                },
                closeAdd: function () {
                    this.saveCustomerDialogVisible = false;
                },
                isNotNumber: function (params) {
                    return isNaN(Number(params));
                },
                handleTagChange: function (tags) {
                    var tagNo = [];
                    var tagName = [];
                    this.composeQueryParams.isOnePaperCust = ''; //兩地一本通客戶
                    this.composeQueryParams.isAccreditedInvestor = ''; //合格投資者认证
                    this.composeQueryParams.isFinCust = ''; //理财客户
                    this.composeQueryParams.isParkingInstallment = ''; //车位分期客户
                    this.composeQueryParams.isPerHouseLoan = ''; //个人房产按揭贷款客户
                    this.composeQueryParams.isLegalHouseLoan = ''; //法人房产按揭贷款客户
                    this.composeQueryParams.isCreditCardCust = ''; //信用卡客户
                    this.composeQueryParams.isMktBlack = ''; //黑名单客户

                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i].isCheck) {
                            tagNo.push(tags[i].key);
                            tagName.push(tags[i].value);
                        }
                    }
                    for (let x = 0; x < tagNo.length; x++) {
                        if (tagNo[x] == 'S0000018') {
                            this.composeQueryParams.isOnePaperCust = 'Y';
                        }
                        if (tagNo[x] == 'S0000010') {
                            this.composeQueryParams.isAccreditedInvestor = 'Y';
                        }
                        if (tagNo[x] == 'S0000045') {
                            this.composeQueryParams.isFinCust = 'Y';
                        }
                        if (tagNo[x] == 'S0000042') {
                            this.composeQueryParams.isParkingInstallment = 'Y';
                        }
                        if (tagNo[x] == 'S0000034') {
                            this.composeQueryParams.isPerHouseLoan = 'Y';
                        }
                        if (tagNo[x] == 'S0000055') {
                            this.composeQueryParams.isLegalHouseLoan = 'Y';
                        }
                        if (tagNo[x] == 'S0000049') {
                            this.composeQueryParams.isCreditCardCust = 'Y';
                        }
                        if (tagNo[x] == 'S0000051') {
                            this.composeQueryParams.isMktBlack = 'Y';
                        }
                    }
                    this.composeQueryParams.tagNo = tagNo.join();
                    this.composeQueryParams.tagName = tagName.join();
                },
                singleQueryFn: function (formName) {
                    var _this = this;
                    var obj = {};
                    var flag = false;
                    for (var key in _this.singleQueryParams) {
                        if (_this.singleQueryParams[key]) {
                            flag = true;
                        }
                    }
                    // 客户经理可以不用筛选条件
                    // let roles = yufp.session.roles;
                    // let roleCodes = [];
                    // let isManage = true;
                    // for (let i = 0; i < roles.length; i++) {
                    //     roleCodes.push(roles[i].code);
                    // }
                    // let str = roleCodes.join();
                    // if (str.indexOf('R003') != -1 || str.indexOf('R002') !== -1) { // 客户经理
                    //     isManage = false;
                    // }
                    var rolestag;
                    var isManage = true;
                    var rolecur = yufp.session.roles;
                    var rolestagselect = yufp.sessionStorage.get('selectRole');
                    for (let i = 0; i < rolecur.length; i++) {
                        if (rolecur[i].id == rolestagselect) {
                            rolestag = rolecur[i].code;
                        }
                    }
                    if (rolestag == 'R003' || rolestag == 'R002') {
                        isManage = false;
                    }
                    if (!flag && isManage) {
                        _this.$message.warning('请至少选择一个筛选条件');
                        return;
                    }
                    _this.$refs.singleQueryForm.validate(function (valid) {
                        if (valid) {
                            yufp.extend(obj, _this.singleQueryParams);
                            if (_this.isNotNumber(_this.singleQueryParams.figureCode)) {
                                obj.characterCode = _this.singleQueryParams.figureCode;
                                obj.figureCode = '';
                            }
                            obj.orgIdAuth = _this.baseParams.orgIdAuth;
                            obj.custQueryType = _this.baseParams.custQueryType;
                            _this.tempQueryParams = obj;
                            _this.$refs.multipleTable.remoteData(obj);
                            _this.filterData = obj;
                        }
                    });
                    // this.$nextTick(() => {
                    //     this.$refs.multipleTable.doLayout();
                    // });
                    _this.$nextTick(function () {
                        _this.$refs.multipleTable.doLayout();
                    });
                },
                checkChinese: function (params) {
                    return new RegExp('[\\u4E00-\\u9FFF]+', 'g').test(params);
                },
                composeSearchFn: function () {
                    var _this = this;
                    var obj = {};
                    var flag = false;
                    delete _this.composeQueryParams.undefined;
                    for (var key in _this.composeQueryParams) {
                        if (_this.composeQueryParams[key]) {
                            if (Array.isArray(_this.composeQueryParams[key]) && _this.composeQueryParams[key].length) {
                                flag = true;
                            }
                            if (typeof _this.composeQueryParams[key] == 'string') {
                                flag = true;
                            }
                        }
                    }
                    if (_this.prodNameValue || _this.custObjPram.prodId) {
                        flag = true;
                    }
                    // 客户经理可以不用筛选条件
                    // let roles = yufp.session.roles;
                    // let roleCodes = [];
                    // let isManage = true;
                    // for (let i = 0; i < roles.length; i++) {
                    //     roleCodes.push(roles[i].code);
                    // }
                    // let str = roleCodes.join();
                    // if (str.indexOf('R003') != -1 || str.indexOf('R002') !== -1) { // 客户经理
                    //     isManage = false;
                    // }
                    var rolestag;
                    var isManage = true;
                    var rolecur = yufp.session.roles;
                    var rolestagselect = yufp.sessionStorage.get('selectRole');
                    for (let i = 0; i < rolecur.length; i++) {
                        if (rolecur[i].id == rolestagselect) {
                            rolestag = rolecur[i].code;
                        }
                    }
                    if (rolestag == 'R003' || rolestag == 'R002') {
                        isManage = false;
                    }
                    if (!flag && isManage && !_this.prodNameValue && !_this.custObjPram.prodId) {
                        _this.$message.warning('请至少选择一个筛选条件');
                        return;
                    }
                    yufp.extend(obj, _this.composeQueryParams);
                    obj.custGrade = _this.composeQueryParams.custGrade.join();
                    delete obj.undefined;
                    if (_this.custdisabled == true) {
                        obj.prodId = _this.custObjPram.prodId;
                        obj.prodName = '';
                    } else {
                        var prodArr = [];
                        if (_this.prodNameValue && _this.prodNameValue.indexOf('--') != -1) {
                            prodArr = _this.prodNameValue.split('--');
                            if (prodArr.length == 2) {
                                obj.prodId = prodArr[1];
                                obj.prodName = '';
                            }
                        }
                    }

                    obj.orgIdAuth = _this.baseParams.orgIdAuth;
                    obj.custQueryType = _this.baseParams.custQueryType;
                    _this.tempQueryParams = obj;
                    _this.$refs.multipleTable.remoteData(obj);
                    _this.filterData = obj;
                    // 获取表格数据后重新刷新对不齐样式
                    // this.$nextTick(() => {
                    //     this.$refs.multipleTable.doLayout();
                    // });
                    _this.$nextTick(function () {
                        _this.$refs.multipleTable.doLayout();
                    });
                },
                searchFn: function (formData) {
                    this.$refs.multipleTable.remoteData(formData);
                },
                resetForm: function (formName) {
                    this.prodNameValue = ''
                    this.$refs.custTyped.$children[0].$children[0].clearData()
                    this.$refs[formName].resetFields();
                    this.$refs.tagNo.$children[0].$children[0].clearTag();
                    this.$nextTick(function () {
                        if (formName == 'composeQuery') {
                            this.composeQueryParams.aumBalanceStart = '';
                            this.composeQueryParams.aumBalanceEnd = '';
                            this.composeQueryParams.countAreaCd = ''
                        }
                    })
                    // var param = {
                    //   orgIdAuth: this.orgIdAuth
                    // };
                    // this.$refs.multipleTable.remoteData(param);
                },
                btnClearDataFn: function () {
                    this.$refs.multipleTable.clearSelection();
                },
                saveFn: function () {
                    var list = this.$refs.multipleTable.tabledata;
                    if (!list.length) {
                        this.$message.warning('暂无可以加入客群的数据');
                        return;
                    }
                    this.saveCustomerDialogVisible = true;
                },
                selectChange: function (selection) {
                    this.selectRows = selection;
                },
                // 编辑客户
                editRow: function (row) {
                    var _this = this;
                    _this.applyDialogVisible = true;
                    var form = {};
                    _this.$nextTick(function () {
                        // yufp.clone(row, form);
                        // form.list = row.list || [];
                        // form.incomeSrcs = row.incomeSrc ? row.incomeSrc.split(',') : [];
                        _this.$refs.customerEdite.getCustInfo(row.custId);

                    });
                },
                closeeditebox: function (isUpdate) {
                    if (isUpdate) {
                        this.$refs.multipleTable.remoteData(this.tempQueryParams);
                    }
                    this.applyDialogVisible = false;
                },
                /** 商户table行用户名称双击事件 -- 打开详情 */
                onTableRowMerchantNameClickFtn: function (data) {
                    var _this = this;
                    yufp.util.valid2jump(data.custId, function (val) {
                        if (val) {
                            var customKey = 'custom_view' + data.custId; // 请以custom_view前缀开头，并且全局唯一
                            // var custType = row.custType;
                            yufp.frame.addTab({
                                id: 'customer360View', // 菜单功能ID（路由ID）
                                key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                                title: '客户360视图:' + data.custName, // 页签名称
                                data: {
                                    custId: data.custId,
                                    custName: data.custName
                                } // 传递的业务数据，可选配置
                            });
                        } else {
                            _this.$message.warning('该客户不能查看客户360视图');
                        }
                    });
                },
                handleHighLevlCreateClose: function () {
                    this.$refs.flexyQuery.resetconditionFn();
                    this.advancedQueryDialogVisible = false;
                },
                createcloseserarch: function () {
                    this.advancedQueryDialogVisible = false;
                },
                highSearch: function () {
                    this.advancedQueryDialogVisible = true;
                    // this.$message.warning('此功能后续开发');
                }

            },
            watch: {
                prodNameValue: {
                    immediate: true,
                    deep: true,
                    handler: function handler(val) {
                        if (val) {
                            this.custTypeRole = true;
                        } else {
                            this.$refs.custTyped && this.$refs.custTyped.$children[0] && this.$refs.custTyped.$children[0].$children[0] && this.$refs.custTyped.$children[0].$children[0].clearData()
                            this.custTypeRole = false;
                        }
                    }
                },
            }
        });
    };
});