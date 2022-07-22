/**
 * @Created by  yangxiao2 on 2019-7-19 16:24:32.
 * @updated by
 * @description 礼品管理
 */
define([
    'pages/climp_qy/legalLibrary/commodityInfo/commodityInfo.css',
    'custom/widgets/js/yufpMerchantSelector.js',
    'custom/widgets/js/yufpInstuOrgTree.js',
    'custom/widgets/js/YufpWfInit.js',
    'pages/climp_qy/giftmanager/pointExchange/pointExchange.css',
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('UP_DOWN_STATE,COMMODITY_TYPE,PUBLISH_STATUS,COMMODITY_TYPE,UP_DOWN_STATE,WF_APP_STATUS,USE_FLAG,PICTURE_TYPE,EXCG_FEQ,LIMIT,SUIT_OBJ_TYPE,EXCG_CHANNEL,COMM_STATUS,COMM_CLASS,IF_CANCEL,RGET_TYPE,EXCG_TYPE,ATTR_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    dataUrl: '/api/loyqycommodityinfo/commlist',
                    saveBtnShow: true,
                    cancelBtnShow: true,
                    height: yufp.frame.size().height,
                    async: false,
                    stgModel: 'stg1',
                    // 审批流公共参数
                    wfCommonParams: {
                        sessionInstuCde: yufp.session.instu.code,
                        sessionOrgCode: yufp.session.org.code,
                        sessionLoginCode: yufp.session.user.loginCode
                    },
                    // 表单数据
                    formdata: {
                        consigneeCost: '包邮',
                        commodityType: 'R'
                    },
                    formdataCategory: {},
                    formdataModel: {},
                    formdataPic: {},
                    formdataTotalStg: {},
                    formdataDetailStg: {},
                    formdataShel: {},
                    // 默认参数
                    cateParam: {},
                    tableParam: {
                        condition: JSON.stringify({
                            categoryCode: '',
                            instuCde: ''
                        })
                    },
                    modelParam: {},
                    picParam: {},
                    // 控制表单可视化变量
                    dialogVisible: false,
                    dialogVisibledetail: false,
                    dialogVisibleCategory: false,
                    dialogVisibleModel: false,
                    dialogVisibleModelTable: false,
                    dialogVisiblePic: false,
                    dialogVisiblePicTable: false,
                    dialogVisibleStg: false,
                    dialogVisibleShel: false,
                    // 控制组件禁用变量
                    cateBtnDisabled: false,
                    formDisabled: false,
                    formDisabledCategory: false,
                    formDisabledModel: false,
                    formDisabledPic: false,
                    // 表单标题控制变量
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    // 适用金融机构列表
                    instuOption: [],
                    // 当前选择金融机构
                    instuValue: '',
                    instuValueParam: { instuValue: '' },
                    // 当前选择机构
                    orgValue: '',
                    // 当前选择礼品类别
                    categoryValue: {},
                    // 图片上传
                    uploadAction: yufp.service.getUrl({ url: backend.gatewayService + backend.fileService + '/api/loyqycommpicture/uploadfile?access_token=' + yufp.service.getToken() }),
                    downloadUrl: backend.gatewayService + backend.fileService + '/api/file/provider/download?fileId=comm/',
                    fileList: [],
                    // 搬过来的新增页面代码

                    sysmineInfo: [],
                    formDisabled: true,
                    formdata: {},
                    tableUrl: '/api/acrmfpdprodinfo/productcustfitinfoquery',
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: data.prodCode
                        })
                    },
                    reportUpLoadBusNo: { busNo: data.prodCode },
                    uploadVisible: true,
                    pic: false,
                    // 拓展属性
                    sectionTableData: [],
                    dialogVisibleAttr: false,
                    attrdataUrl: '/api/loyqycommodityinfo/attr',
                    // 规格按钮
                    addModelbutton: false,
                    modifyModelbutton: false,
                    deleteModelbutton: false,
                    editnum: false,
                    stockOption: [
                        { 'key': '10', 'value': '增加' },
                        { 'key': '20', 'value': '减少' },
                    ],
                    formdataStock: {},
                    dialogVisibleStock: false,
                    stockgiftid: '',
                    stockmodelid: '',
                    overlookpic: '',
                    dialogpic: false,
                    picradio: false

                };
            },
            mounted: function() {
                var _this = this;
                yufp.service.request({
                    url: '/api/loyqycommoditycategory/getinstus',
                    method: 'get',
                    callback: function(code, message, response) {
                        var data = response.data;
                        for (var i = 0; i < data.length; i++) {
                            _this.instuOption.push(data[i]);
                        }
                    }
                });
            },
            methods: {

                // 扩展属性新增
                attraddFn: function() {
                    var _this = this;
                    _this.dialogVisibleAttr = true;
                    this.$refs.refTableattr.clearSelection();
                    this.$refs.multipleTable.clearSelection();

                },
                // 扩展属性删除
                attrdeleteFn: function() {
                    var _this = this;
                    var selections = this.$refs.multipleTable.selections;
                    var justifyselections = this.$refs.multipleTable.tabledata;
                    let selectArr = [];
                    for (let i = 0; i < selections.length; i++) {
                        selectArr[i] = selections[i].attrId;
                    }
                    var newList = justifyselections.filter((item, index) => {
                        return selectArr.indexOf(item.attrId) == -1
                    });
                    _this.sectionTableData = newList;
                    this.$refs.multipleTable.clearSelection();
                },
                // 扩展属性弹框选定按钮
                selectAttr: function() {
                    var _this = this;
                    var selections = _this.$refs.refTableattr.selections;
                    _this.sectionTableData = [].concat(selections);
                    console.log(selections);
                    _this.dialogVisibleAttr = false;
                },
                // 扩展属性弹框取消按钮
                cancelAttr: function() {
                    var _this = this;
                    _this.dialogVisibleAttr = false;

                },
                // 搬过来的新增页面方法
                picfn: function() {
                    this.pic = !this.pic;
                },

                /**
                 * 取消
                 */
                cancelFn: function() {
                    var _this = this;
                    _this.dialogVisible = false;
                    _this.dialogVisibledetail = false;
                    _this.dialogVisibleCategory = false;
                    _this.dialogVisibleModel = false;
                    _this.dialogVisiblePic = false;
                    _this.dialogVisibleStg = false;
                    _this.dialogVisibleShel = false;
                },
                /**
                 * 保存礼品
                 */
                saveFn: function() {
                    var _this = this;
                    var model = {};
                    var modelattr = {};
                    var idattr = '';
                    yufp.clone(_this.formdata, model);
                    // 设置商品类别
                    model.categoryCode = _this.categoryValue.categoryCode;
                    var excgChannel = model.excgChannel;
                    var excgChannelarr = '';
                    for (let i = 0; i < excgChannel.length; i++) {
                        if (i == 0) {
                            excgChannelarr = excgChannelarr + excgChannel[i];
                        } else {
                            excgChannelarr = excgChannelarr + ',' + excgChannel[i];
                        }
                    }
                    model.excgChannel = excgChannelarr;
                    var validate = false;
                    _this.$refs.refForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var url = '';
                    if (_this.viewType == 'ADD') {
                        url = '/api/loyqycommodityinfo/';
                    } else {
                        url = '/api/loyqycommodityinfo/update';
                    }
                    var urlattr = '/api/loyqycommodityinfo/addcommattr';
                    yufp.service.request({
                        method: 'POST',
                        data: model,
                        url: url,
                        callback: function(code, message, response) {
                            if (response.code == 0) {
                                _this.$message({ message: '操作成功' });
                                _this.$refs.refTable.remoteData();
                                _this.dialogVisible = false;

                                console.log(response.data.id);
                                for (let i = 0; i < _this.sectionTableData.length; i++) {
                                    if (i == 0) {
                                        idattr = idattr + _this.sectionTableData[i].attrId;
                                    } else {
                                        idattr = idattr + ',' + _this.sectionTableData[i].attrId;

                                    }
                                }
                                if (_this.viewType == 'ADD') {
                                    modelattr = {
                                        commodityId: response.data.id,
                                        attrId: idattr
                                    }
                                } else {
                                    modelattr = {
                                        commodityId: _this.formdata.id,
                                        attrId: idattr
                                    }
                                }
                                yufp.service.request({
                                    method: 'POST',
                                    data: modelattr,
                                    url: urlattr,
                                    callback: function(code, message, response) {
                                        if (response.code == 0) {

                                        }
                                    }
                                });
                                if (_this.viewType == 'ADD') {
                                    yufp.util.butLogInfo(hashCode, '商品管理', '新增');
                                } else {
                                    yufp.util.butLogInfo(hashCode, '商品管理', '修改');
                                }
                            } else {
                                _this.$message({ message: message, type: 'warning' });
                            }
                        }
                    });
                },
                /**
                 * 保存礼品类别
                 */
                saveCategoryFn: function() {
                    var _this = this;
                    var model = {};
                    var validate = false;
                    // 规则校验
                    _this.$refs.refFormCategory.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    if (model.categoryLevel > 2) {
                        _this.$message('目录最多维护两层');
                        return;
                    }
                    yufp.clone(_this.formdataCategory, model);
                    if (_this.viewType == 'ADD') {
                        // 新增礼品类别
                        yufp.service.request({
                            method: 'POST',
                            data: model,
                            url: '/api/loyqycommoditycategory/',
                            callback: function(code, message, response) {
                                if (response.code == 0) {
                                    _this.$refs.refTree.remoteData();
                                    _this.$message('操作成功');
                                    _this.dialogVisibleCategory = false;
                                    yufp.util.butLogInfo(hashCode, '商品管理', '左边树新增');
                                } else {
                                    _this.$message({ message: '操作失败', type: 'warning' });
                                }
                            }
                        });
                    } else if (_this.viewType == 'EDIT') {
                        // 修改礼品类别
                        yufp.service.request({
                            method: 'POST',
                            data: model,
                            url: '/api/loyqycommoditycategory/update',
                            callback: function(code, message, response) {
                                if (response.code == 0) {
                                    _this.$refs.refTree.remoteData();
                                    _this.$message('操作成功');
                                    _this.dialogVisibleCategory = false;
                                    yufp.util.butLogInfo(hashCode, '商品管理', '左边树修改');
                                } else {
                                    _this.$message({ message: '操作失败', type: 'warning' });
                                }
                            }
                        });
                    } else {
                        _this.$message({ message: '系统逻辑错误,请刷新重试', type: 'warning' });
                        _this.dialogVisibleCategory = false;
                    }
                },
                /**
                 * 保存礼品规格
                 */
                saveModelFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.formdataModel, model);
                    var validate = false;
                    _this.$refs.refFormModel.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    model.commId = _this.$refs.refTable.selections[0].id;
                    var saveUrl = '';
                    if (_this.viewType == 'EDIT') {
                        saveUrl = '/api/loyqycommmodel/update';
                    } else {
                        saveUrl = '/api/loyqycommmodel/';
                    }
                    // 向后台发送保存请求
                    yufp.service.request({
                        method: 'POST',
                        url: saveUrl,
                        data: model,
                        callback: function(code, message, response) {
                            if (response.code == 0) {
                                _this.$refs.refTableModel.remoteData();
                                // _this.$refs.refTable.remoteData();
                                _this.$message('操作成功');
                                _this.dialogVisibleModel = false;
                                _this.addModelbutton = true;

                                if (_this.viewType == 'EDIT') {
                                    yufp.util.butLogInfo(hashCode, '商品管理', '礼品规格修改');
                                } else {
                                    yufp.util.butLogInfo(hashCode, '商品管理', '礼品规格新增');
                                }
                            } else {
                                _this.$message('操作失败');
                            }
                        }
                    });
                },
                /**
                 * 保存礼品图片
                 */
                savePicFn: function() {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.formdataPic, model);
                    model.commId = _this.$refs.refTable.selections[0].id;
                    var validate = false;
                    _this.$refs.refFormPic.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    // 向后台发送保存请求
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/loyqycommpicture/savepic',
                        data: model,
                        callback: function(code, message, response) {
                            if (response.code == 0) {
                                _this.$refs.refTablePic.remoteData();
                                _this.$message({ message: message });
                                _this.dialogVisiblePic = false;
                                yufp.util.butLogInfo(hashCode, '商品管理', '礼品图片添加');
                            } else {
                                _this.$message({ message: response.message, type: 'warning' });
                            }
                        }
                    });
                },
                /**
                 * 库存维护保存
                 */
                saveStgFn: function() {
                    var _this = this;
                    if (_this.stgModel == 'stg1') {
                        // 主库存维护
                        var model = {};
                        var validate = false;
                        _this.$refs.stgForm1.validate(function(valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            return;
                        }
                        yufp.clone(_this.formdataTotalStg, model);
                        // 向后台发送保存请求
                        yufp.service.request({
                            method: 'POST',
                            url: '/api/loyqycommodityinfo/update',
                            data: model,
                            callback: function(code, message, response) {
                                // _this.commodityCode = response.data.commodityCode;
                                _this.$message('操作成功');
                                _this.$refs.refTable.remoteData();
                                _this.dialogVisibleStg = false;
                                yufp.util.butLogInfo(hashCode, '商品管理', '总库存维护');
                            }
                        });
                    } else if (_this.stgModel == 'stg2') {
                        // 库存明细维护
                        var demodel = {};
                        var validate = false;
                        _this.$refs.stgForm2.validate(function(valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            return;
                        }
                        yufp.clone(_this.formdataDetailStg, demodel);
                        // 向后台发送保存请求
                        yufp.service.request({
                            method: 'POST',
                            url: '/api/loyqycommmodel/update',
                            data: demodel,
                            callback: function(code, message, response) {
                                _this.$refs.modelTable.remoteData();
                                _this.$refs.refTable.remoteData();
                                _this.$message('操作成功');
                                yufp.util.butLogInfo(hashCode, '商品管理', '库存明细维护');
                            }
                        });
                    } else {
                        _this.$message('加载错误');
                        _this.cancelFn();
                    }
                },
                /**
                 * 礼品上架保存
                 */
                saveShelFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    var model = {};
                    yufp.clone(_this.formdataShel, model);
                    var validate = false;
                    _this.$refs.shelForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].id);
                    }
                    _this.$confirm('确定上架吗?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqycommodityinfo/doupdateupdown',
                                    data: {
                                        ids: arr.join(','),
                                        onShelfBegin: model.onShelfBegin,
                                        onShelfEnd: model.onShelfEnd,
                                        upDownState: 'U'
                                    },
                                    callback: function(code, message, response) {
                                        if (response.code == 0) {
                                            _this.$refs.refTable.remoteData();
                                            _this.$message('操作成功');
                                            _this.dialogVisibleShel = false;
                                            yufp.util.butLogInfo(hashCode, '商品管理', '上架');
                                        } else {
                                            _this.$message({ message: '上架失败', type: 'warning' });
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单处理操作类型
                 * @param editable 可编辑,默认false
                 * @param formType 表单类型
                 */
                switchStatus: function(viewType, editable, formType) {
                    var _this = this;
                    _this.editnum = false;
                    _this.viewType = viewType;
                    _this.saveBtnShow = editable;
                    _this.cancelBtnShow = editable;
                    switch (formType) {
                        case 'gift':
                            if (viewType == 'DETAIL') {
                                _this.dialogVisibledetail = true;
                                _this.formDisabled = !editable;
                            } else {
                                _this.dialogVisible = true;
                                _this.formDisabled = !editable;
                            }
                            break;
                        case 'category':
                            _this.dialogVisibleCategory = true;
                            _this.formDisabledCategory = !editable;
                            break;
                        case 'model':
                            _this.dialogVisibleModel = true;
                            _this.formDisabledModel = !editable;
                            break;
                        case 'pic':
                            _this.dialogVisiblePic = true;
                            _this.formDisabledPic = !editable;
                            break;
                        default:
                            break;
                    }
                },
                /**
                 * 日期格式
                 */
                dateFormatter: function(row, column) {
                    var datetime = row[column.property];
                    if (datetime === undefined) {
                        return '';
                    }
                    return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
                },
                /**
                 * 更改金融机构
                 */
                changeInstu: function(data) {
                    var _this = this;
                    if (data != '') {
                        _this.cateParam = {
                            condition: JSON.stringify({
                                orgCode: data
                            })
                        };
                        // 启用礼品类别维护
                        _this.cateBtnDisabled = false;
                    } else {
                        // 禁用礼品类别维护
                        _this.cateBtnDisabled = true;
                    }
                },
                /**
                 * 新增修改表单更改金融机构
                 */
                changeInstuToOrg: function(index) {
                    var _this = this;
                    _this.instuValueParam.instuValue = index;
                },
                /**
                 * 树节点点击事件
                 */
                nodeClickFn: function(nodeData, node, self) {
                    var _this = this;
                    _this.categoryValue = nodeData;
                    // 加载查询礼品表
                    _this.tableParam = {
                        condition: JSON.stringify({
                            categoryCode: _this.categoryValue.categoryCode,
                            instuCde: _this.instuValue
                        })
                    };
                },
                /**
                 * 新增礼品
                 */
                addFn: function() {
                    var _this = this;
                    _this.switchStatus('ADD', true, 'gift');
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                    });
                },
                /**
                 * 新增礼品类别
                 */
                addCateFn: function() {
                    var _this = this;
                    if (_this.categoryValue && Object.keys(_this.categoryValue).length === 0) {
                        _this.$message({ message: '请先选择父节点', type: 'warning' });
                        return;
                    }
                    if (_this.categoryValue.categoryLevel > 1) {
                        _this.$message('目录最多维护两层');
                        return;
                    }
                    // if (_this.categoryValue && _this.categoryValue.length == 0) {
                    //     _this.$message({ message: '请先选择父节点', type: 'warning' });
                    //     return;
                    // }
                    _this.switchStatus('ADD', true, 'category');
                    _this.$nextTick(function() {
                        _this.$refs.refFormCategory.resetFields();
                        // 设置上级目录编号名称
                        _this.formdataCategory.parentCategoryCode = _this.categoryValue.categoryCode;
                        _this.formdataCategory.parentCategoryName = _this.categoryValue.categoryName;
                        // 设置金融机构
                        _this.formdataCategory.instuCde = _this.instuValue || yufp.session.user.instu.code;
                        // 设置目录层级
                        _this.formdata.categoryLevel = parseInt(_this.treeNode.categoryLevel) + 1;
                    });
                },
                /**
                 * 新增礼品规格
                 */
                addModelFn: function() {
                    var _this = this;
                    _this.switchStatus('ADD', true, 'model');
                    _this.$nextTick(function() {
                        _this.$refs.refFormModel.resetFields();
                    });
                },
                /**
                 * 新增礼品图片
                 */
                addPicFn: function() {
                    var _this = this;
                    var typefalg = false;
                    _this.picradio = false;
                    var justifyselections = this.$refs.refTablePic.tabledata;
                    for (let i = 0; i < justifyselections.length; i++) {
                        if (justifyselections[i].pictureType == '10') {
                            typefalg = true;
                        }
                    }
                    if (typefalg) {
                        _this.formdataPic.pictureType = '20';
                        _this.picradio = true;

                    }
                    _this.switchStatus('ADD', true, 'pic');
                    _this.$nextTick(function() {
                        _this.$refs.refFormPic.resetFields();
                        _this.formdataPic.picturePath = '';
                        // 移除附件列表
                        _this.fileList.pop();
                    });
                },
                /**
                 * 修改礼品
                 */
                modifyFn: function() {
                    var _this = this;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var selections = _this.$refs.refTable.selections[0];
                    // 审批中、上架状态的商品不能修改
                    if (selections.wfApprSts == '111') {
                        _this.$message({ message: '审批中的商品不能修改', type: 'warning' });
                        return;
                    }
                    if (selections.upDownState == 'U') {
                        _this.$message({ message: '上架的商品不能修改', type: 'warning' });
                        return;
                    }

                    var paramgift = { id: selections.id || '' };
                    yufp.service.request({
                        method: 'GET',
                        url: backend.productService + '/api/loyqycommodityinfo/detail',
                        data: paramgift,
                        async: false,
                        callback: function(code, message, response) {
                            if (code == '0') {

                                console.log('response.data.attr', response.data.attr);
                                if (response.data.attr && response.data.attr.length > 0) {
                                    _this.sectionTableData = response.data.attr;
                                }

                                console.log('_this.sectionTableData', _this.sectionTableData);
                            }
                        }
                    });

                    _this.switchStatus('EDIT', true, 'gift');
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        var obj = _this.$refs.refTable.selections[0];
                        if (obj.excgChannel && obj.excgChannel.length > 0) {
                            obj.excgChannel = obj.excgChannel.split(',');
                        }
                        // console.log(obj.excgChannel);
                        yufp.clone(obj, _this.formdata);
                        console.log(_this.formdata);
                    });
                },
                /**
                 * 修改礼品类别
                 */
                editCateFn: function() {
                    var _this = this;
                    if (_this.categoryValue && Object.keys(_this.categoryValue).length === 0) {
                        _this.$message({ message: '请先选择一个类别', type: 'warning' });
                        return;
                    }
                    _this.switchStatus('EDIT', true, 'category');
                    _this.$nextTick(function() {
                        _this.$refs.refFormCategory.resetFields();
                        var obj = _this.categoryValue;
                        yufp.clone(obj, _this.formdataCategory);
                    });
                },
                /**
                 * 修改礼品规格
                 */
                modifyModelFn: function() {
                    var _this = this;
                    if (_this.$refs.refTableModel.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.switchStatus('EDIT', true, 'model');
                    _this.editnum = true;
                    _this.$nextTick(function() {
                        _this.$refs.refFormModel.resetFields();
                        var obj = _this.$refs.refTableModel.selections[0];
                        yufp.clone(obj, _this.formdataModel);
                    });
                },
                /**
                 * 修改礼品图片
                 */
                modifyPicFn: function() {
                    var _this = this;
                    if (_this.$refs.refTablePic.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.switchStatus('EDIT', true, 'pic');
                    _this.$nextTick(function() {
                        _this.$refs.refFormPic.resetFields();
                        var obj = _this.$refs.refTablePic.selections[0];
                        yufp.clone(obj, _this.formdataPic);
                        // 反显上传图片
                        _this.fileList.push(_this.fileIdToURL(obj.picturePath));
                    });
                },
                /**
                 * 礼品详情
                 */
                infoFn: function() {
                    var _this = this;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var selections = _this.$refs.refTable.selections[0];
                    var paramgift = { id: selections.id || '' };
                    yufp.service.request({
                        method: 'GET',
                        url: backend.productService + '/api/loyqycommodityinfo/detail',
                        data: paramgift,
                        async: false,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                if (response.data.attr && response.data.attr.length > 0) {
                                    _this.sectionTableData = response.data.attr;
                                }
                                if (response.data.pic && response.data.pic.length > 0) {
                                    _this.sysmineInfo = response.data.pic;
                                    for (let i = 0; i < _this.sysmineInfo.length; i++) {
                                        _this.sysmineInfo[i].picturePath = _this.fileIdToURL(_this.sysmineInfo[i].picturePath);
                                    }
                                    console.log(_this.sysmineInfo);
                                }
                            }
                        }
                    });
                    _this.switchStatus('DETAIL', false, 'gift');
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        yufp.clone(_this.$refs.refTable.selections[0], _this.formdata);
                    });
                },
                /**
                 * 礼品类别详情
                 */
                infoCateFn: function() {
                    var _this = this;
                    if (_this.categoryValue && Object.keys(_this.categoryValue).length === 0) {
                        _this.$message({ message: '请先选择一个类别', type: 'warning' });
                        return;
                    }
                    _this.switchStatus('DETAIL', false, 'category');
                    _this.$nextTick(function() {
                        _this.$refs.refFormCategory.resetFields();
                        yufp.clone(_this.categoryValue, _this.formdataCategory);
                    });
                },
                /**
                 * 删除礼品
                 */
                deleteFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.$confirm('此操作将永久删除该数据！是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqycommodityinfo/delcommodity',
                                    data: selections[0].id,
                                    callback: function(code, message, response) {
                                        if (response.code == 0) {
                                            _this.$refs.refTable.remoteData();
                                            _this.$message('操作成功');
                                            yufp.util.butLogInfo(hashCode, '商品管理', '删除');
                                        } else {
                                            _this.$message('操作失败');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 删除礼品类别
                 */
                delCateFn: function() {
                    var _this = this;
                    var model = {};
                    if (_this.categoryValue && Object.keys(_this.categoryValue).length === 0) {
                        _this.$message({ message: '请先选择一个类别', type: 'warning' });
                        return;
                    }
                    yufp.clone(_this.categoryValue, model);
                    _this.$confirm('确认要删除该类别吗?删除该类别将连同子类别一起删除！ 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqycommoditycategory/delcategory',
                                    data: model.categoryCode,
                                    callback: function(code, message, response) {
                                        if (response.code == 0) {
                                            _this.$refs.refTree.remoteData();
                                            _this.$message({ message: response.message });
                                            yufp.util.butLogInfo(hashCode, '商品管理', '左边树删除');
                                        } else {
                                            _this.$message({ message: response.message, type: 'warning' });
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 删除礼品规格
                 */
                deleteModelFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTableModel.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].id);
                    }
                    _this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqycommmodel/delmodel',
                                    data: {
                                        ids: arr.join(',')
                                    },
                                    callback: function(code, message, response) {
                                        if (response.code == 0) {
                                            if (response.data == 0) {
                                                _this.$message('规格已使用不能删除');
                                            } else {

                                                _this.$refs.refTableModel.remoteData();
                                                // _this.$refs.refTable.remoteData();
                                                // console.log(_this.$refs.refTableModel.tabledata);
                                                if (_this.$refs.refTableModel.tabledata.length == 0) {
                                                    _this.addModelbutton = false;
                                                }
                                                _this.$message('操作成功');
                                                yufp.util.butLogInfo(hashCode, '商品管理', '礼品规格删除');
                                            }
                                        } else {
                                            _this.$message('操作失败');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                // 库存维护
                stcokFn: function() {
                    var _this = this;
                    _this.stockmodelid = '';
                    _this.stockgiftid = '';
                    var selections = _this.$refs.refTableModel.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.stockgiftid = _this.$refs.refTableModel.selections[0].commId || '';
                    _this.stockmodelid = _this.$refs.refTableModel.selections[0].id || '';
                    _this.dialogVisibleStock = true;
                },
                saveStockFn: function() {
                    var _this = this;
                    var modelstock = {};
                    yufp.clone(_this.formdataStock, modelstock);
                    modelstock.commId = _this.stockgiftid;
                    modelstock.modelId = _this.stockmodelid;
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/loyqycommmodel/updatemodel',
                        data: modelstock,
                        callback: function(code, message, response) {
                            if (response.code == 0) {
                                _this.$message({ message: '维护成功', type: 'success' });
                                _this.dialogVisibleStock = true;
                                _this.$refs.refTableModel.remoteData();
                                _this.$refs.refTable.remoteData();
                            } else {
                                _this.$message({ message: '操作失败', type: 'warning' });
                            }
                        }
                    });
                },
                cancelStockFn: function() {
                    var _this = this;
                    _this.formdataStock = {};
                    _this.dialogVisibleStock = false;

                },
                /**
                 * 删除礼品图片
                 */
                deletePicFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTablePic.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].id);
                    }
                    _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqycommpicture/delpic',
                                    data: {
                                        ids: arr.join(',')
                                    },
                                    callback: function(code, message, response) {
                                        if (response.code == 0) {
                                            _this.$refs.refTablePic.remoteData();
                                            _this.$message('操作成功');
                                            yufp.util.butLogInfo(hashCode, '商品管理', '礼品图片删除');
                                        } else {
                                            _this.$message('操作失败');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 礼品规格管理
                 */
                modelEditFn: function() {
                    var _this = this;
                    _this.addModelbutton = false;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条数据', type: 'warning' });
                        return;
                    }
                    var selections = _this.$refs.refTable.selections[0];
                    if (selections.mCount && selections.mCount > 0) {
                        _this.addModelbutton = true;
                    }
                    _this.$nextTick(function() {
                        // 加载礼品规格表
                        _this.modelParam = {
                            commodityCode: _this.$refs.refTable.selections[0].id
                        };
                    });
                    _this.dialogVisibleModelTable = true;

                },
                /**
                 * 礼品图片管理
                 */
                pictureEditFn: function() {
                    var _this = this;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条数据', type: 'warning' });
                        return;
                    }
                    _this.dialogVisiblePicTable = true;
                    _this.$nextTick(function() {
                        // 加载礼品图片表
                        _this.picParam = {
                            commodityCode: _this.$refs.refTable.selections[0].id
                        };
                    });
                },
                picclose: function() {
                    var _this = this;
                    _this.dialogVisiblePicTable = false;
                    _this.$refs.refTable.remoteData();

                },
                /**
                 * 礼品库存管理
                 */
                stgEditFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.dialogVisibleStg = true;
                    _this.$nextTick(function() {
                        _this.$refs.stgForm1.resetFields();
                        _this.$refs.stgForm2.resetFields();
                        yufp.clone(selections[0], _this.formdataTotalStg);
                        // 加载礼品规格表
                        _this.modelParam = {
                            commodityCode: _this.$refs.refTable.selections[0].id
                        };
                    });
                },
                /**
                 * 库存明细中礼品规格表点击事件
                 */
                modelClick: function(row) {
                    var _this = this;
                    _this.$nextTick(function() {
                        yufp.clone(row, _this.formdataDetailStg);
                    });
                },
                /**
                 * 库存管理标签点击事件
                 */
                tabClick: function(tab) {
                    var _this = this;
                    if (tab == 'stg1') {
                        yufp.clone(_this.$refs.refTable.selections[0], _this.formdataTotalStg);
                    }
                },
                /**
                 * 礼品上架
                 */
                onShelFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请选择一条审批通过的下架的数据记录！', type: 'warning' });
                        return false;
                    }
                    var len = selections.length;
                    for (var i = 0; i < len; i++) {
                        var mCount = selections[i].mCount;
                        var pCount = selections[i].pCount;
                        if (mCount == 0) {
                            _this.$message({ message: '该商品没有规格信息，不能上架！', type: 'warning' });
                            return false;
                        }
                        if (pCount == 0) {
                            _this.$message({ message: '该商品没有缩略图(图片)信息，不能提交！', type: 'warning' });
                            return false;
                        }
                        if (pCount > 1) {
                            _this.$message({ message: '该商品缩略图(图片)超过1张，不能提交！', type: 'warning' });
                            return false;
                        }
                        if (selections[i].upDownState != 'D' || selections[i].wfApprSts != '997') {
                            _this.$message({ message: '请选择审批通过的下架的数据记录！', type: 'warning' });
                            return false;
                        }
                    }
                    _this.dialogVisibleShel = true;
                },
                /**
                 * 礼品下架
                 */
                downShelFn: function() {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({ message: '请选择需要下架的数据！', type: 'warning' });
                        return false;
                    }
                    for (var i = 0; i < selections.length; i++) {
                        if (selections[i].upDownState == 'D') {
                            _this.$message({ message: '请选择上架状态的数据记录！', type: 'warning' });
                            return false;
                        }
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].id);
                    }
                    _this.$confirm('确定下架吗?', '提示', {
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/loyqycommodityinfo/doupdateupdown',
                                    data: {
                                        ids: arr.join(','),
                                        upDownState: 'D'
                                    },
                                    callback: function(code, message, response) {
                                        if (response.code == 0) {
                                            _this.$refs.refTable.remoteData();
                                            _this.$message('操作成功');
                                            yufp.util.butLogInfo(hashCode, '商品管理', '下架');
                                        } else {
                                            _this.$message({ message: '操作失败', type: 'warning' });
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 礼品提交
                 */
                submitFn: function() {
                    var _this = this;
                    var commitData = {};
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (selections[0].wfApprSts != '000') {
                        _this.$message({ message: '只有未审批的商品可以提交', type: 'warning' });
                        return;
                    }
                    commitData.custId = yufp.session.userId;
                    commitData.custName = yufp.session.userName;
                    commitData.bizSeqNo = selections[0].id;
                    // commitData.applType = 'SPTJLC';
                    // 流程改为礼品提交审批流程
                    commitData.applType = 'LPTJSPLC';
                    var load = _this.$loading();
                    _this.$refs.yufpWfInit.wfInit(commitData, load);
                },
                // 预览图片
                overlook: function(obj) {
                    var _this = this;
                    _this.overlookpic = _this.fileIdToURL(obj.picturePath);
                    _this.dialogpic = true;
                },
                /**
                 * 礼品提交后钩子
                 */
                onAfterClose: function() {
                    var _this = this;
                    _this.$refs.refTable.remoteData();
                },
                /**
                 * 附件上传成功
                 */
                handleAvatarSuccess: function(res, file) {
                    var _this = this;
                    // 反显图片url
                    _this.formdataPic.picturePath = res.data.filePath;
                    // 添加文件列表
                    _this.fileList.push(file);
                },
                /**
                 * 附件上传校验
                 */
                beforeAvatarUpload: function(file) {
                    var _this = this;
                    if (_this.fileList.length == 1) {
                        _this.$message({ message: '只能上传一个文件', type: 'warning' });
                        _this.$refs.upload.abort(file);
                        return false;
                    }
                },
                /**
                 * 上传附件移除
                 */
                removeAvatarUpload: function(file) {
                    var _this = this;
                    // 移除图片路径
                    _this.formdataPic.picturePath = '';
                    // 移除附件列表
                    _this.fileList.pop();
                },
                /**
                 * 获取图片URL
                 * @param fileId 上传文件id
                 * @returns url 文件url
                 */
                fileIdToURL: function(fileId) {
                    var url = yufp.settings.ssl ? 'https://' : 'http://';
                    url += yufp.settings.url;
                    url += backend.fileService;
                    url += '/api/file/provider/download?fileId=comm/' + fileId;
                    return yufp.util.addTokenInfo(url);
                }
            }
        });
    };
});