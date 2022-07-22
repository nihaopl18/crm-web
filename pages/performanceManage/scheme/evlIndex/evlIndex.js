/**
 * @Created by 在修理费 zhengxl2@yusys.com.cn on 2020-1-3 14:59:05.
 * @updated by
 * @description 派生指标管理
 */
define([
    './custom/widgets/js/YufpDemoSelector.js',
    'libs/js-xlsx/xlsx.full.min.js',
    './custom/widgets/js/yufpExtTree.js'
], function (require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,METRIC_TYPE,OBJ,SYMBOL_TYPE,CONNECT_TYPE,BUSS_SYS_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var ss = yufp.session.checkCtrl('addEvl');
                console.log(ss);
                return {
                    optionsYeType: [],
                    optionsIndexApplyType: [],
                    optionsObjType: [],
                    
                    addButton: yufp.session.checkCtrl('addEvl'), // 新增按钮控制
                    modifyButton: yufp.session.checkCtrl('modifyEvl'), // 修改按钮控制
                    deleteButton: yufp.session.checkCtrl('deleteEvl'), // 删除按钮控制
                    detailButton: yufp.session.checkCtrl('detailEvl'), // 详情按钮控制
                    startButton: yufp.session.checkCtrl('startEvl'), // 启用按钮控制
                    stopButton: yufp.session.checkCtrl('stopEvl'), // 停用按钮控制

                    dataUrl: backend.appBaseService + '/api/pmafevlindexinfo/querylist',
                    formdata: {},
                    rule: [
                        {required: true, message: '必填项', trigger: 'blur'},
                        {validator: yufp.validator.number, message: '数字', trigger: 'blur'}
                    ],
                    indexBaseRule: {
                        applyTypeId: [
                            { required: true, message: '字段不能为空' }
                        ],
                        yeType: [
                            { required: true, message: '字段不能为空' }
                        ]
                    },
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    saveBtnShow: true,
                    hiddenDis: false,
                    dialogTwoVisible: false,
                    colv: {
                        leftCol: 12,
                        rigthCol: 11
                    },
                    collapse: false,
                    activeName: 'first',
                    dataUrlOne: backend.appBaseService + '/api/pmafbaseindexinfo/querylist',
                    dataUrlTwo: backend.appBaseService + '/api/pmafevlindexinfo/queryUpOrglist',
                    //dataUrlThree: backend.appBaseService + '/api/pmafparaminfo/queryorglist',
                    //dataUrlFour: backend.appBaseService + '/api/pmafpersonpostparaminfo/querypostlist',
                    paramsOne: {},
                    paramsTwo: {},
                    //paramsThree: {},
                    //paramsFour: {},
                    queryFormOne: {},
                    queryFormTwo: {},
                    height: yufp.custom.viewSize().height,
                    textareaChina: '',
                    textarea: '',
                    activeNames: ['1', '2'],
                    dialogThreeVisible: false,
                    indexDisable: true,
                    queryDataOne: {},
                    queryDataTwo: {},
                    dialogFourVisible: false,
                    ifData: [],
                    ifVal: '',
                    indexVal: null,
                    name: '',
                    flagTwo: true,
                    indexquoDialogVisible: false,
                    dataquoPData: {}
                };
            },
            computed: {
                ifChina: function () {
                    var a = 'IF(';
                    for (var i = 0; i < this.ifData.length; i++) {
                        var obj = this.ifData[i];
                        a += obj.objOne;
                        a += obj.compareVal;
                        a += obj.objTwo;
                        a += ':';
                        a += obj.buildVal;
                        a += obj.conditionVal;
                    }
                    a += this.ifVal;
                    a += ')';
                    return a;
                }
            },
            watch: {
                textarea: function (newVal, oldVal) {
                    console.log('old==' + oldVal);
                    console.log('new==' + newVal);
                },
                dialogTwoVisible: function (newVal) {
                    var _this = this;
                    if (newVal) {
                        _this.queryFormOne = {};
                        _this.queryFormTwo = {};
                        _this.textarea = '';
                        _this.textareaChina = '';
                        var con1, con2;
                        if (_this.formdata.objType == '01') {
                            con1 = {
                                indexId: _this.queryFormOne.indexId,
                                indexName: _this.queryFormOne.indexName,
                                indexState: "1",
                                objType: "01"
                            };
                            con2 = {
                                indexId: _this.queryFormTwo.indexId,
                                indexName: _this.queryFormTwo.indexName,
                                indexState: "1",
                                objType: "01"
                            };
                        } else {
                            con1 = {
                                objType: _this.formdata.objType,
                                indexId: _this.queryFormOne.indexId,
                                indexName: _this.queryFormOne.indexName,
                                indexState: "1"
                            };
                            con2 = {
                                objType: _this.formdata.objType,
                                indexId: _this.queryFormTwo.indexId,
                                indexName: _this.queryFormTwo.indexName
                            };
                        }
                        // 查询基础指标
                        _this.paramsOne = {
                            condition: JSON.stringify(con1)
                        };
                        // 查询派生指标
                        _this.paramsTwo = {
                            condition: JSON.stringify(con2)
                        };
                        _this.$nextTick(function () {
                            _this.$refs.refTableOne.remoteData(_this.paramsOne);
                            _this.$refs.refTableTwo.remoteData(_this.paramsTwo);
                            /*_this.$refs.refTableThree.remoteData();
                            _this.$refs.refTableFour.remoteData();*/
                            _this.$refs.queryFormRefOne.resetFields();
                            _this.$refs.queryFormRefTwo.resetFields();
                        });
                    }
                }
            },
            methods: {
                renderContent: function (h, data) {
                    if (data.data.type == '01') {
                        return h('span', [
                                h('i', {attrs: {class: 'el-icon-yx-folder-open'}, style: {'margin-right': '4px'}}),
                                h('span', {attrs: {class: 'type'}}, data.node.label)
                            ]
                        );
                    } else if (data.data.type == '02') {
                        return h('span', [
                                h('i', {attrs: {class: 'el-icon-yx-stats-dots'}, style: {'margin-right': '4px'}}),
                                h('span', {attrs: {class: 'type'}}, data.node.label)
                            ]
                        );
                    }
                },
                /**
                 * 取消
                 */
                cancelFn: function () {
                    var _this = this;
                    _this.dialogVisible = false;
                },
                clearFn: function () {
                    var _this = this;
                    _this.dialogTwoVisible = false;
                },
                cancelTwoFn: function () {
                    var _this = this;
                    _this.dialogThreeVisible = false;
                },
                clearTwoFn: function () {
                    var _this = this;
                    _this.dialogFourVisible = false;
                },
                closeBtn: function () {
                    var _this = this;
                    _this.indexquoDialogVisible = false;
                },
                /**
                 * 保存
                 */
                saveFn: function () {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.formdata, model);
                    var validate = false;
                    _this.$refs.refForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    // 向后台发送保存请求
                    yufp.service.request({
                        method: 'POST',
                        url: backend.appBaseService + '/api/pmafevlindexinfo/saveOrUpdate',
                        data: model,
                        callback: function (code, message, response) {
                            _this.$refs.refTable.remoteData();
                            _this.$message('操作成功');
                            _this.dialogVisible = false;
                        }
                    });
                },
                /**
                 * 控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function (viewType, editable) {
                    var _this = this;
                    _this.viewType = viewType;
                    _this.saveBtnShow = editable;
                    _this.dialogVisible = true;
                    _this.formDisabled = !editable;
                },
                clearObj: function (obj) {
                    for (var key in obj) {
                        obj[key] = null;
                    }
                    return obj;
                },
                /**
                 * 新增按钮1
                 */
                addFn: function () {
                    var _this = this;
                    _this.switchStatus('ADD', true);
                    _this.hiddenDis = true;
                    _this.$nextTick(function () {
                        _this.$refs.refForm.resetFields();
                        // var obj = _this.clearObj;
                        // yufp.clone(obj, _this.formdata);
                    });
                },
                /**
                 * 修改
                 */
                modifyFn: function () {
                    var _this = this;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    if (_this.$refs.refTable.selections[0].creator != yufp.session.user.loginCode) {
                        _this.$message({message: '只能修改自己创建的数据', type: 'warning'});
                        return;
                    }
                    if(_this.$refs.refTable.selections[0].indexState == "1"){
                        _this.$message({message: '已启用的派生指标不能修改', type: 'warning'});
                        return;
                    }
                    _this.hiddenDis = false;
                    _this.switchStatus('EDIT', true);
                    _this.$nextTick(function () {
                        _this.$refs.refForm.resetFields();
                        var obj = _this.$refs.refTable.selections[0];
                        yufp.clone(obj, _this.formdata);
                    });
                },
                /**
                 * 详情
                 */
                infoFn: function () {
                    var _this = this;
                    var selectionsAry = _this.$refs.refTable.selections;
                    if (selectionsAry.length != 1) {
                        _this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    _this.switchStatus('DETAIL', false);
                    _this.$nextTick(function () {
                        _this.$refs.refForm.resetFields();
                        yufp.clone(selectionsAry[0], _this.formdata);
                    });
                },
                /**
                 * 删除
                 */
                deleteFn: function () {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    for (var i in selections) {
                        if (selections[i].creator != yufp.session.user.loginCode) {
                            _this.$message({message: '只能删除自己创建的数据', type: 'warning'});
                            return;
                        }
                    }
                    for (var j = 0; j < selections.length; j++) {
                        var dataOrgId = selections[j].orgId;
                        // var authOrg = yufp.session.details.grantOrgCode;
                        var authOrg = yufp.session.org.code;
                        if (dataOrgId != authOrg) {
                            _this.$message({message: '请删除本机构数据!', type: 'warning'});
                            return;
                        }
                    }
                    if(selections[i].indexState == "1"){
                        _this.$message({message: '此派生指标已经启用,请停用后再删除!', type: 'warning'});
                        return;
                    }

                    var len = selections.length, arr = [], indexId = [];
                    for (var i = 0; i < len; i++) {
                        var obj = {};
                        obj.id = selections[i].id;
                        obj.indexId = selections[i].indexId;
                        arr.push(obj);
                        indexId.push(selections[i].indexId);
                    }
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'GET',
                                    url: backend.appBaseService + '/api/pmafbaseindexinfo/isOperIndexInfo',
                                    data: {indexIds: indexId.join(',')},
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            // 判断指标是否可以删除
                                            var flag = response.data.flag;
                                            if (flag == '03') {
                                                yufp.service.request({
                                                    method: 'POST',
                                                    url: backend.appBaseService + '/api/pmafevlindexinfo/batchdelete/',
                                                    data: JSON.stringify(arr),
                                                    callback: function (code, message, response) {
                                                        _this.$refs.refTable.remoteData();
                                                        _this.$message('操作成功');
                                                    }
                                                });
                                            } else {
                                                _this.indexquoDialogVisible = true;
                                                _this.dataquoPData = response.data.datalist;
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });
                },

                /**
                 * 启用
                 */
                startFn: function (row) {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({message: '请选择记录', type: 'warning'});
                        return;
                    }
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].indexId);
                    }
                    var model = {};
                    model.indexId = _this.$refs.refTable.selections[0].indexId;
                    model.statFlag = '1';
                    model.arr = arr;

                    var arrNames = [];
                    for(var i = 0;i<selections.length;i++){
                        if(selections[i].indexState == 1){
                            arrNames.push(selections[i].indexName);
                        }
                    }
                    if(arrNames.length>0){
                        _this.$message({message: '派生指标['+arrNames+']已启用', type: 'warning'});
                        return;
                    }

                    _this.$confirm('是否确定启用?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.appBaseService + '/api/pmafevlindexinfo/startOrStopState',
                                    data: model,
                                    callback: function (code, message, response) {
                                        _this.$refs.refTable.remoteData();
                                        _this.$message('启用成功');
                                    }
                                });
                            }
                        }
                    });
                },

                /**
                 * 停用
                 * */
                stopFn: function (row) {
                    var _this = this;
                    var selections = _this.$refs.refTable.selections;
                    if (selections.length < 1) {
                        _this.$message({message: '请选择记录', type: 'warning'});
                        return;
                    }
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].indexId);
                    }
                    var model = {};
                    model.indexId = _this.$refs.refTable.selections[0].indexId;
                    model.statFlag = '0';
                    model.arr = arr;

                    var arrNames = [];
                    for(var i = 0;i<selections.length;i++){
                        if(selections[i].indexState == 0){
                            arrNames.push(selections[i].indexName);
                        }
                    }
                    if(arrNames.length>0){
                        _this.$message({message: '派生指标['+arrNames+']已停用', type: 'warning'});
                        return;
                    }

                    _this.$confirm('是否确认停用?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.appBaseService + '/api/pmafevlindexinfo/startOrStopState',
                                    data: model,
                                    callback: function (code, message, response) {
                                        _this.$refs.refTable.remoteData();
                                        _this.$message('停用成功');
                                    }
                                });
                            }
                        }
                    });
                },

                /**
                 * 编辑公式
                 */
                editorFn: function () {
                    var _this = this;
                    if (_this.formdata.objType == '' || _this.formdata.objType == undefined) {
                        _this.$message({message: '请先选择考核对象', type: 'warning'});
                        return;
                    }
                    _this.dialogTwoVisible = true;
                    _this.activeName = 'first';
                    _this.$nextTick(function () {
                        _this.textarea = _this.formdata.formula;
                        _this.textareaChina = _this.formdata.formulaNotes;
                    });
                },
                /**
                 * 收缩方案列表
                 */
                shrinkFn: function () {
                    this.collapse = true;
                    this.colv.leftCol = 1;
                    this.colv.rigthCol = 22;
                },
                /**
                 * 打开方案列表
                 */
                expandFn: function () {
                    this.collapse = false;
                    this.colv.leftCol = 12;
                    this.colv.rigthCol = 11;
                },
                /**
                 * 树触发事件
                 */
                /*nodeClickFn: function (nodeData, node, self) {
                    if (nodeData.paramId == null) {
                        return;
                    }
                    if (this.dialogFourVisible) {
                        if (this.name == null) {
                            this.$message({message: '请先选中要编辑的表格列!', type: 'warning'});
                            return;
                        } else {
                            if (this.name == 'ifVal') {
                                this.ifVal = nodeData.paramId;
                            } else {
                                if (this.indexVal == null) {
                                    this.$message({message: '请先选中要编辑的表格列!', type: 'warning'});
                                    return;
                                }
                                var obj = this.ifData[this.indexVal];
                                obj[this.name] += nodeData.paramId;
                            }
                        }
                    } else {
                        if (this.textarea == null) {
                            this.textarea = nodeData.paramId;
                            // this.textareaChina = nodeData.paramName;
                        } else {
                            this.textarea += nodeData.paramId;
                            // this.textareaChina += nodeData.paramName;
                        }
                    }
                },*/
                /**
                 * 工具栏触发事件
                 */
                buttonFunc: function (index) {
                    switch (index) {
                        case 1:
                            this.textarea += '+';
                            this.textareaChina += '+';
                            break;
                        case 2:
                            this.textarea += '-';
                            this.textareaChina += '-';
                            break;
                        case 3:
                            this.textarea += '*';
                            this.textareaChina += '*';
                            break;
                        case 4:
                            this.textarea += '/';
                            this.textareaChina += '/';
                            break;
                        case 5:
                            this.textarea += '(';
                            this.textareaChina += '(';
                            break;
                        case 6:
                            this.textarea += ')';
                            this.textareaChina += ')';
                            break;
                        case 7:
                            this.dialogFourVisible = true;
                            this.ifChina = '';
                            this.ifVal = '';
                            this.ifData = [];
                            this.indexVal = null;
                            this.name = '';
                            break;
                    }
                },
                /**
                 * 双击基础指标触发事件弹出
                 */
                infoOneFn: function () {
                    var _this = this;
                    var selections = _this.$refs.refTableOne.selections;
                    if (selections.length != 1) {
                        _this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    _this.dialogThreeVisible = true;
                    var obj = selections[0];

                    var indexId = obj.indexId;
                    this.getTypesByPkidFn(indexId);

                    var objTwo = {};
                    objTwo.objType = _this.formdata.objType;
                    _this.$nextTick(function () {
                        _this.$refs.refFormOne.resetFields();
                        _this.$refs.refFormTwo.resetFields();
                        yufp.clone(obj, _this.queryDataOne);
                        yufp.clone(objTwo, _this.queryDataTwo);
                        if (_this.formdata.objType == '01') {
                            _this.indexDisable = true;
                        }
                    });

                },

                /**
                 *余额类型和应用类型的key和value根据基础指标管理选择的值进行插入
                 */
                getTypesByPkidFn:function(indexId){
                    var _this = this;
                    if (indexId == '' || indexId == null || indexId == undefined) {
                        this.$message('获取指标编号失败');
                        return;
                    }
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/pmafevlindexinfo/getTypesByPkid',
                        data: {indexId: indexId},
                        callback: function (code, message, response) {
                            _this.optionsYeType = [];
                            _this.optionsIndexApplyType = [];
                            _this.optionsObjType = [];

                            if (code == 0) {
                                if (response.code == 0) {

                                    var listEvlxBal= response.data.listEvlxBal;
                                    var listEvlApply= response.data.listEvlApply;
                                    var listEvlObj= response.data.listEvlObj;

                                    if(null != listEvlxBal && listEvlxBal != undefined){
                                        for(var i = 0;i<listEvlxBal.length;i++){
                                            var obj = {};
                                            listEvlxBal[i].applyType
                                            obj.key = listEvlxBal[i].balType;
                                            obj.value = listEvlxBal[i].balTypeName;
                                            _this.optionsYeType.push(obj);
                                        }
                                    }
                                    if(null != listEvlApply && listEvlApply != undefined){
                                        for(var i = 0;i<listEvlApply.length;i++){
                                            var obj = {};
                                            listEvlApply[i].applyType
                                            obj.key = listEvlApply[i].applyType;
                                            obj.value = listEvlApply[i].applyTypeName;
                                            _this.optionsIndexApplyType.push(obj);
                                        }
                                    }
                                    if(null != listEvlObj && listEvlObj != undefined){
                                        for(var i = 0;i<listEvlObj.length;i++){
                                            var obj = {};
                                            listEvlObj[i].applyType
                                            obj.key = listEvlObj[i].evlObjType;
                                            obj.value = listEvlObj[i].evlObjTypeName;
                                            _this.optionsObjType.push(obj);
                                        }
                                    }

                                }
                            }
                        }
                    });
                },

                /**
                 * 双击派生指标触发事件
                 */
                infoTwoFn: function () {
                    var _this = this;
                    var selections = _this.$refs.refTableTwo.selections;
                    if (selections.length != 1) {
                        _this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var obj = selections[0];
                    var content = '';
                    content += obj.indexId;
                    content += '[01,01,';
                    content += _this.formdata.objType;
                    content += ']';
                    if (_this.dialogFourVisible) {
                        if (_this.name == null) {
                            _this.$message({message: '请先选中要编辑的表格列!', type: 'warning'});
                            return;
                        } else {
                            if (_this.name == 'ifVal') {
                                _this.ifVal = content;
                            } else {
                                if (_this.indexVal == null) {
                                    _this.$message({message: '请先选中要编辑的表格列!', type: 'warning'});
                                    return;
                                }
                                var obj = _this.ifData[_this.indexVal];
                                obj[_this.name] += content;
                            }
                        }
                        /**
                         if (_this.indexVal == null) {
              _this.$message({ message: '请先选中要编辑的表格列!', type: 'warning' });
              return;
            }
                         var obj = _this.ifData[_this.indexVal];
                         obj[_this.name] += content;
                         */
                    } else {
                        if (this.textarea == null) {
                            this.textarea = content;
                            this.textareaChina = content;
                        } else {
                            this.textarea += content;
                            this.textareaChina += content;
                        }
                    }
                },

                /**
                 * 基础指标选择完指标确定
                 */
                saveTwoFn: function () {
                    var _this = this;
                    var mess = '';
                    if(this.queryDataTwo.yeType ==undefined ||this.queryDataTwo.yeType == ''){
                        mess+= "请选择余额类型!";
                    }
                    if(this.queryDataTwo.indexApplyType ==undefined ||this.queryDataTwo.indexApplyType == ''){
                        mess+= "请选择应用类型!";
                    }
                    if(this.queryDataTwo.objType ==undefined ||this.queryDataTwo.objType == ''){
                        mess+= "请选择评价对象!";
                    }
                    if(mess.length>0){
                        _this.$message({message: mess, type: 'warning'});
                        return;
                    }

                    var content = '';
                    content += this.queryDataOne.indexId;
                    content += '[';
                    content += this.queryDataTwo.yeType;
                    content += ',';
                    content += this.queryDataTwo.indexApplyType;
                    content += ',';
                    content += this.queryDataTwo.objType;
                    content += ']';
                    if (this.dialogFourVisible) {
                        if (_this.name == null) {
                            _this.$message({message: '请先选中要编辑的表格列!', type: 'warning'});
                            return;
                        } else {
                            if (_this.name == 'ifVal') {
                                _this.ifVal = content;
                            } else {
                                if (_this.indexVal == null) {
                                    _this.$message({message: '请先选中要编辑的表格列!', type: 'warning'});
                                    return;
                                }
                                var obj = _this.ifData[_this.indexVal];
                                obj[_this.name] += content;
                            }
                        }
                        /**
                         if (this.indexVal == null) {
              this.$message({ message: '请先选中要编辑的表格列!', type: 'warning' });
              return;
            }
                         var obj = this.ifData[this.indexVal];
                         obj[this.name] += content;
                         */
                    } else {
                        if (this.textarea == null) {
                            this.textarea = content;
                            this.textareaChina = content;
                        } else {
                            this.textarea += content;
                            this.textareaChina += content;
                        }
                    }
                    this.dialogThreeVisible = false;
                },
                /**
                 * 新建条件
                 */
                addIF: function () {
                    var obj = {
                        objOne: '',
                        compareVal: '=',
                        objTwo: '',
                        buildVal: '',
                        conditionVal: ';'
                    };
                    this.ifData.push(obj);
                },
                /**
                 * 删除条件
                 */
                handleDelete: function (index, row) {
                    this.ifData.splice(index, 1);
                },
                /**
                 * 保存焦点所在的可编辑表格的对应位置
                 */
                savePosition: function (index, col) {
                    this.indexVal = index;
                    this.name = col;
                },
                /**
                 * 保存焦点所在的可编辑表格的对应位置
                 */
                savebtnPosition: function (col) {
                    this.name = col;
                },
                /**
                 * IF函数保存
                 */
                saveThree: function () {
                    if (this.textarea == undefined) {
                        this.textarea = this.ifChina;
                        this.textareaChina = this.ifChina;
                    } else {
                        this.textarea += this.ifChina;
                        this.textareaChina += this.ifChina;
                    }
                    this.dialogFourVisible = false;
                },
                formulaChangeFn: function (val) {
                    // console.log(val);
                    /**
                     var _rule = /\s+/g;
                     if (this.textarea.trim() == '') {
            this.$message({ message: '公式为空或空字符串，请先编辑公式', type: 'warning' });
            return;
          } else if (_rule.test(this.textarea)) {
            this.$message({ message: '公式包含空格，请先编辑公式', type: 'warning' });
            return;
          }
                     */
                    // this.textareaChina = this.textarea;

                    // this.$message('公式校验通过');
                },
                formulaBlurFn: function () {
                    this.validateFn();
                },
                validateFn: function () {
                    var _this = this;
                    if (_this.textarea == '' || _this.textarea == null || _this.textarea == undefined) {
                        _this.flagTwo = false;
                        this.$message('公式表达式不能为空');
                        return;
                    }
                    if (_this.textarea.indexOf(' ') != -1) {
                        this.$message('公式包含空格，请先编辑公式');
                        _this.flagTwo = false;
                        return;
                    }
                    if(_this.textarea.indexOf('/0') != -1){
                        this.$message('分母不能为0');
                        _this.flagTwo = false;
                        return;
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.appBaseService + '/api/pmafevlindexinfo/convertToChinese',
                        data: {'param': _this.textarea, 'indexId': _this.formdata.indexId},
                        callback: function (code, message, response) {
                            if (code == 0) {
                                if (response.code == 0) {
                                    _this.textareaChina = response.data;
                                    _this.flagTwo = true;
                                    _this.$message('公式表达式校验通过');
                                } else {
                                    //_this.$message({message: '公式表达式校验不通过，请核对信息', type: 'warning'});
                                    _this.getMess(response.code);
                                    _this.flagTwo = false;
                                }
                            } else {
                                _this.$message({message: message, type: 'warning'});
                                _this.flagTwo = false;
                            }
                        }
                    });
                },
                getMess: function(code){
                    var _this = this;
                    var message ='公式表达式校验不通过，';
                    if(code == "310022"){
                        message+='派生指标存在循环依赖';
                    }else if(code == "310015"){
                        message+='存在非法运算符';
                    }else if(code == "310016"){
                        message+='IF函数无法解析';
                    }else if(code == "310019"){
                        message+='IF函数表达式中条件解析有误';
                    }else if(code == "310020"){
                        message+='IF函数表达式中默认值填写有误';
                    }else if(code == "310021"){
                        message+='指标格式有误';
                    }else if(code == "310017"){
                        message+='基础指标无法解析';
                    }else if(code == "310018"){
                        message+='派生指标无法解析';
                    }else if(code == "310010"){
                        message+='基础指标公式有误';
                    }else if(code == "310011"){
                        message+='派生指标公式有误';
                    }else if(code == "310012"){
                        message+='机构参数指标公式有误';
                    }else if(code == "310013"){
                        message+='人员岗位参数指标公式有误';
                    }
                    _this.$message({message: message, type: 'warning'});
                },
                saveBtn: function () {
                    var _this = this;
                    if (_this.textarea == '' || _this.textarea == null || _this.textarea == undefined) {
                        _this.flagTwo = false;
                        this.$message('公式表达式不能为空');
                        return;
                    }
                    if (_this.textarea.indexOf(' ') != -1) {
                        this.$message('公式包含空格，请先编辑公式');
                        _this.flagTwo = false;
                        return;
                    }
                    if(_this.textarea.indexOf('/0') != -1){
                        this.$message('分母不能为0');
                        _this.flagTwo = false;
                        return;
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.appBaseService + '/api/pmafevlindexinfo/convertToChinese',
                        data: {'param': _this.textarea, 'indexId': _this.formdata.indexId},
                        callback: function (code, message, response) {
                            if (code == 0) {
                                if (response.code == 0) {
                                    _this.textareaChina = response.data;
                                    _this.flagTwo = true;
                                    _this.formdata.formulaNotes = _this.textareaChina;
                                    _this.formdata.formula = _this.textarea;
                                    _this.dialogTwoVisible = false;
                                } else {
                                    //_this.$message({message: '公式表达式校验不通过，请核对信息', type: 'warning'});
                                    _this.getMess(response.code);
                                    _this.flagTwo = false;
                                }
                            } else {
                                _this.$message({message: message, type: 'warning'});
                                _this.flagTwo = false;
                            }
                        }
                    });
                }
            }
        });
    };
});