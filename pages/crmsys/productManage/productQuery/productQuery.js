/**
 * @Created by 闫天一 yanty1@yusys.com.cn on 2019-1-29 10:11:51.
 * @updated by
 * @description 产品查询
 */
define(['custom/widgets/js/yufpProdCatlTree.js', 'custom/widgets/js/yufpDptTree.js', 'pages/crmsys/productManage/productQuery/yufpDptSelector.js'], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('RISKLEVEL,PROD_STATUS');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    addButton: !yufp.session.checkCtrl('add'),
                    updButton: !yufp.session.checkCtrl('upd'),
                    viewButton: !yufp.session.checkCtrl('view'),
                    height: yufp.frame.size().height,
                    productTreeUrl: backend.productService + '/api/acrmfpdprodcatl/treelistquery',
                    dataUrl: backend.productService + '/api/acrmfpdprodinfo/productinfoquery',
                    saveBtnShow: true,
                    formdata: {},
                    async: false,
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    proIdDisabled: '',
                    hidden: false,
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    rule: {
                        productId: [
                            { max: 32, message: '最大长度不超过32个字符', trigger: 'blur' },
                            { required: true, message: '字段不能为空', trigger: 'blur' }
                        ],
                        prodName: [
                            { max: 50, message: '最大长度不超过50个字符', trigger: 'blur' },
                            { required: true, message: '字段不能为空', trigger: 'blur' }
                        ],
                        catlCode: [
                            { max: 32, message: '最大长度不超过32个字符', trigger: 'blur' },
                            { required: true, message: '字段不能为空', trigger: 'blur' }
                        ],
                        managerDept: [
                            { max: 50, message: '最大长度不超过50个字符', trigger: 'blur' }
                        ],
                        prodState: [
                            { max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }
                        ],
                        riskLevel: [
                            { max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }
                        ],
                        rate: [
                            // {max: 14, message: '最大长度不超过14个字符', trigger: 'blur' },
                            { validator: yufp.validator.number, message: '请输入数字' }
                        ],
                        freeRate: [
                            // {max: 14, message: '最大长度不超过14个字符', trigger: 'blur' },
                            { validator: yufp.validator.number, message: '请输入数字' }
                        ],
                        prodTerm: [
                            { max: 5, message: '最大长度不超过5个字符', trigger: 'blur' }
                        ],
                        cuyyenType: [
                            { max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }
                        ],
                        prodStartDate: [],
                        prodEndDate: [],
                        prodDesc: [
                            { max: 1500, message: '最大长度不超过1500个字符', trigger: 'blur' }
                        ],
                        prodCharact: [
                            { max: 800, message: '最大长度不超过800个字符', trigger: 'blur' }
                        ],
                        subscribeStartAmt: [
                            // {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' },
                            { validator: yufp.validator.number, message: '请输入数字' }
                        ],
                        appObj: [
                            { max: 800, message: '最大长度不超过800个字符', trigger: 'blur' }
                        ],
                        buyCondition: [
                            { max: 400, message: '最大长度不超过400个字符', trigger: 'blur' }
                        ],
                        handProcess: [
                            { max: 800, message: '最大长度不超过800个字符', trigger: 'blur' }
                        ],
                        handChannle: [
                            { max: 800, message: '最大长度不超过800个字符', trigger: 'blur' }
                        ],
                        discntInfo: [
                            { max: 500, message: '最大长度不超过500个字符', trigger: 'blur' }
                        ],
                        mktMsg: [
                            { max: 500, message: '最大长度不超过500个字符', trigger: 'blur' }
                        ]
                    },
                    nodeLabel: '',
                    nodeId: '',
                    reform: {}
                };
            },
            methods: {
                searchFn: function() {
                    var _this = this;
                    var param = {
                        condition: JSON.stringify({
                            catlCode: _this.nodeId,
                            prodStatus: _this.reform.prodStatus || '',
                            srcProdCode: _this.reform.srcProdCode || '',
                            prodName: _this.reform.prodName || ''
                        })
                    };
                    _this.$refs.refTable.remoteData(param);
                },
                resetMainFn: function() {
                    this.reform.catlCode = '';
                    this.reform.prodStatus = '';
                    this.reform.srcProdCode = '';
                    this.reform.prodName = '';
                    this.nodeId = ''
                },
                /**
                 * 取消
                 */
                cancelFn: function() {
                    var _this = this;
                    _this.dialogVisible = false;
                },
                /**
                 * 保存
                 */
                saveFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.formdata, model);
                    var validate = false;
                    _this.$refs.refForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    // 请调用服务进行后台保存
                    yufp.service.request({
                        method: 'POST',
                        url: backend.productService + '/api/acrmfpdprodinfo/ctrateproductinfo',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                if (response.data == 111) {
                                    _this.$message({ message: '产品编号已存在！' });
                                } else {
                                    _this.$message({ message: '数据保存成功！' });
                                    _this.$refs.refTable.remoteData();
                                    _this.$message('操作成功');
                                    _this.dialogVisible = false;
                                }
                            }
                        }
                    });
                },
                /**
                 * 刷新
                 */
                // nodeClickFn: function(nodeData, node, self) {
                //     var _this = this;
                //     var param = {
                //         condition: JSON.stringify({
                //             catlCode: nodeData.id
                //         })
                //     };
                //     _this.$refs.refTable.remoteData(param);
                // },
                nodeClickFn: function(nodeData, node, self) {

                    var _this = this;
                    _this.reform.catlCode = nodeData.label;
                    _this.nodeId = nodeData.id;
                    var param = {
                        condition: JSON.stringify({
                            catlCode: nodeData.id
                        })
                    };
                    _this.$refs.refTable.remoteData(param);
                },
                /**
                 * 控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function(viewType, editable) {
                    var _this = this;
                    // if (viewType == 'ADD') {
                    //   _this.proIdDisabled = true;
                    // } else {
                    //   _this.proIdDisabled = false;
                    // }
                    _this.viewType = viewType;
                    _this.dialogVisible = true;
                    _this.formDisabled = !editable;
                    _this.saveBtnShow = editable;
                },
                /**
                 * 新增按钮
                 */
                addFn: function() {
                    var _this = this;
                    if (_this.currClickNode == '') {
                        _this.$message({ message: '请先选择菜单节点', type: 'warning' });
                        return;
                    }
                    _this.proIdDisabled = false;
                    _this.switchStatus('ADD', true);
                    _this.$nextTick(function() {
                        _this.$refs.catlCode.$refs.catlCode.selectedVal = '';
                        _this.$refs.refForm.resetFields();
                    });
                },
                /**
                 * 修改
                 */
                modifyFn: function() {
                    var _this = this;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.userCode) {
                        _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
                        return;
                    }
                    _this.proIdDisabled = true;
                    _this.switchStatus('EDIT', true);
                    _this.$nextTick(function() {
                        _this.$refs.catlCode.$refs.catlCode.selectedVal = '';
                        _this.$refs.refForm.resetFields();
                        var obj = _this.$refs.refTable.selections[0];
                        yufp.clone(obj, _this.formdata);
                    });
                },
                /**
                 * 删除
                 */
                deleteFn: function() {
                    var _this = this;
                    var selectionsAry = _this.$refs.refTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.userCode) {
                        _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
                        return;
                    }
                    _this.$confirm('是否删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function() {
                        yufp.service.request({
                            method: 'POST',
                            url: backend.productService + '/api/acrmfpdprodinfo/delerteproductinfo',
                            data: {
                                productId: _this.$refs.refTable.selections[0].productId
                            },
                            callback: function(code, message, response) {
                                if (code == '0') {
                                    _this.$message({ message: '删除成功！' });
                                    _this.$refs.refTable.remoteData();
                                }
                            }
                        });
                    });
                },
                /**
                 * 详情
                 */
                infoFn: function() {
                    var _this = this;
                    var selectionsAry = _this.$refs.refTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.userCode) {
                        _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
                        return;
                    }
                    _this.switchStatus('DETAIL', false);
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        yufp.clone(selectionsAry[0], _this.formdata);
                    });
                },
                openview: function() {
                    var _this = this;
                    var selectionsAry = _this.$refs.refTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = _this.$refs.refTable.selections[0];
                    console.log(obj);
                    var product = 'product_view' + obj.prodCode;
                    yufp.frame.addTab({
                        id: 'productView', // 菜单功能ID（路由ID）
                        key: product, // 自定义唯一页签key
                        title: '产品视图: ' + obj.prodName, // 页签名称
                        data: { prodCode: obj.prodCode, srcProdCode: obj.srcProdCode, dataDate: obj.dataDate, prodStatus: obj.prodStatus, rate: obj.rate, riskLevel: obj.riskLevel, subscribeEndDate: obj.subscribeEndDate, subscribeStartDate: obj.subscribeStartDate, term: obj.term, prodStatus: obj.prodStatus, prodName: obj.prodName }
                    });
                    // 刷新方法
                    yufp.frame.refreshTab({
                        routeId: 'productView', // 对公, // 菜单功能ID（路由ID）
                        menuId: product, // 菜单ID，同addTab方法中的key
                        title: '产品视图:' + obj.prodName, // 页签名称
                        data: { prodCode: obj.prodCode, srcProdCode: obj.srcProdCode, dataDate: obj.dataDate, prodStatus: obj.prodStatus, rate: obj.rate, riskLevel: obj.riskLevel, subscribeEndDate: obj.subscribeEndDate, subscribeStartDate: obj.subscribeStartDate, term: obj.term, prodStatus: obj.prodStatus, prodName: obj.prodName }
                    });
                },
                rowDBlclick: function(row, event) {
                    var product = 'product_view' + row.prodCode;
                    yufp.frame.addTab({
                        id: 'productView', // 菜单功能ID（路由ID）
                        key: product, // 自定义唯一页签key
                        title: '产品视图: ' + row.prodName, // 页签名称
                        data: { prodCode: row.prodCode, srcProdCode: row.srcProdCode, dataDate: row.dataDate, prodStatus: row.prodStatus, rate: row.rate, riskLevel: row.riskLevel, subscribeEndDate: row.subscribeEndDate, subscribeStartDate: row.subscribeStartDate, term: row.term, prodStatus: row.prodStatus, prodName: row.prodName }

                    });
                    // 刷新方法
                    yufp.frame.refreshTab({
                        routeId: 'productView', // 对公, // 菜单功能ID（路由ID）
                        menuId: product, // 菜单ID，同addTab方法中的key
                        title: '产品视图:' + row.prodName, // 页签名称
                        data: { prodCode: row.prodCode, srcProdCode: row.srcProdCode, dataDate: row.dataDate, prodStatus: row.prodStatus, rate: row.rate, riskLevel: row.riskLevel, subscribeEndDate: row.subscribeEndDate, subscribeStartDate: row.subscribeStartDate, term: row.term, prodStatus: row.prodStatus, prodName: row.prodName }
                    });
                }
            }
        });
    };
});