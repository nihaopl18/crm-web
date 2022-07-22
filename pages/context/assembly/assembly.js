/**
 * @created by chenlin on 2018/06/20.
 * @description 组件管理
 *
 */
 define(['./custom/common/newicon.js',
 './custom/widgets/js/yufpTablesSelector.js',
 './custom/widgets/js/yufpTableColumSelector.js'], function (require, exports) {
 /**
    * 页面加载完成时触发
    * @param hashCode 路由ID
    * @param data 传递数据对象
    * @param cite 页面站点信息
    */
 exports.ready = function (hashCode, data, cite) {
   // 码值
   yufp.lookup.reg('SHOW_CON,ITEM_PARAM_TYPE,ASSEMBLY_TYPE,ASSEMBLY_ANA_METHOD,DATA_LIMIST_TYPE,INOUT_TYPE,SUIT_SCENE,ACTIVITY_TYPE');
   //   var options = yufp.lookup.find('INOUT_TYPE',true);
   // var groupKeyValue = options.reduce(function (acc, cur) {
   //                       acc[cur.key] = cur.value
   //                       return acc
   //                   }, {});
   var parseTime = yufp.util.dateFormat;
   var vm = yufp.custom.vue({
     el: cite.el,
     data: function () {
       var _self = this;
       return {
         falseshow: false,
         paramVisible: false,
         flowNode: {
           // 报文体
           designBody: '',
           // 组件标题
           title: ''
         },
         //  options:options,
         coloricon: 'iconfont icon-xingzhuang3',
         istrue: 0,
         coloristrue: 0,
         classId: null, // 分類id
         asseiblyId: null, // 組件編號
         height: yufp.custom.viewSize().height,
         activeNames: '', // 手风琴默认展开值
         tab_activeName: 'second', // tabs选中选项卡
         iconarray: icons, // 图标
         activeicon: 'iconfont icon-fenliuqi',
         shapearray: shapeitems, // 形状
         colorarray: coloritems, // 颜色
         assemblyTypeOptions: '',
         assemblyAnaMethodOptions: '',
         dataTypeOptions: '',
         suitSceneOptions: [], // 适用场景
         ifDisabledTabAs: true,
         ifDisabledTabCl: false,
         ifUpdateItem: 'false', // 是否显示组件操作保存按钮
         ifUpdateClass: 'fasle', // 是否显示分类保存按钮
         classTemp: {// 分类form
           className: '',
           classStyle: '',
           classIcon: 'iconfont icon-icon-test1',
           classColor: 'iconcolor1'
         },
         assform: {
           assemblyStyle: 'iconfont icon-fenliuqi',
           assemblyName: '',
           assemblyType: '',
           assemblyAnaMethod: '',
           dataType: '',
           suitScene: [],
           showForm: ''
         },
         addiconrules: {// 表单验证规则
           assemblyStyle: [
             { required: true, message: '请选择形状', trigger: 'blur' }
           ],
           assemblyName: [
             { required: true, message: '请填写组件名称', trigger: 'blur' },
             { max: 20, message: '最大长度不超过20个中文字符', trigger: 'blur' }
           ],
           assemblyType: [
             { required: true, message: '请选择组件类型', trigger: 'change' }
           ],
           assemblyAnaMethod: [
             { required: true, message: '请选择解析方式', trigger: 'change' }
           ],
           dataType: [
             { required: true, message: '请选择数据类型', trigger: 'change' }
           ],
           suitScene: [
             { required: true, message: '请选择适用场景' }
           ],
           showForm: [
             { required: false, message: '请填写分类名称', trigger: 'blur' }
           ]
         },
         addrules: {// 表单验证规则
           classIcon: [
             { required: true, message: '请选择形状', trigger: 'change' }
           ],
           classColor: [
             { required: true, message: '请选择颜色', trigger: 'change' }
           ],
           className: [
             { required: true, message: '请填写分类名称', trigger: 'blur' },
             { max: 20, message: '最大长度不超过20个中文字符', trigger: 'blur' }
           ]
         },
         /** 表格栏位 */
         tableColumns: [
           { label: '参数编号', prop: 'paramId', width: '150', hidden: true },
           { label: '参数名称', prop: 'paramName' },
           { label: '输入/输出', prop: 'inOrOut', width: '100', dataCode: 'INOUT_TYPE' },
           { label: '参数类型', prop: 'paramType', width: '100', dataCode: 'ITEM_PARAM_TYPE' }
         ],
         /** 新增，修改，详情展示字段 */
         updateFields: [{
           columnCount: 2,
           fields: [
             {
               label: '参数编号', field: 'paramId', hidden: true, type: 'input'
             },
             {
               label: '参数名称',
               field: 'paramName',
               rules: [
                 { required: true, message: '必填项', trigger: 'blur' }],
               type: 'input'
             },
             {
               label: '输入/输出',
               field: 'inOrOut',
               type: 'select',
               dataCode: 'INOUT_TYPE',
               rules: [
                 { required: true, message: '必选项', trigger: 'blur' }]
             },
             {
               label: '参数类型',
               field: 'paramType',
               type: 'select',
               dataCode: 'ITEM_PARAM_TYPE',
               rules: [{ required: true, message: '必选项', trigger: 'blur' }],
               change: function (value) {
                 if (value == 'T') { // 表
                   _self.$refs.refform.switch('sourceTargetTab', 'hidden', false);
                   _self.$refs.refform.switch('sourceTargetField', 'hidden', false);
                   _self.$refs.refform.switch('taskCondition', 'hidden', false);
                   _self.$refs.refform.switch('inoutFile', 'hidden', true);
                   _self.$refs.refform.switch('message', 'hidden', true);
                 } else if (value == 'F') { // 文件
                   _self.$refs.refform.switch('sourceTargetTab', 'hidden', true);
                   _self.$refs.refform.switch('sourceTargetField', 'hidden', true);
                   _self.$refs.refform.switch('taskCondition', 'hidden', true);
                   _self.$refs.refform.switch('inoutFile', 'hidden', false);
                   _self.$refs.refform.switch('message', 'hidden', true);
                 } else if (value == 'M') { // 报文
                   _self.$refs.refform.switch('sourceTargetTab', 'hidden', true);
                   _self.$refs.refform.switch('sourceTargetField', 'hidden', true);
                   _self.$refs.refform.switch('taskCondition', 'hidden', true);
                   _self.$refs.refform.switch('inoutFile', 'hidden', true);
                   _self.$refs.refform.switch('message', 'hidden', false);
                 }
               }
             },
             {
               label: '表名称',
               field: 'sourceTargetTab',
               type: 'custom',
               is: 'yufp-tables-selector',
               params: { tabCheckbox: true },
               selectFn: function (code, data, arry) {
                 var temp = yufp.clone(_self.updateFields[0].fields[5].params);
                 temp.tables = code;
                 _self.updateFields[0].fields[5].params = yufp.clone(temp);
               }
             },
             {
               label: '字段名称',
               field: 'sourceTargetField',
               type: 'custom',
               is: 'yufp-column-selector',
               params: { tabCheckbox: true, tables: '' }
             },
             { label: '组件编号', field: 'assemblyId', type: 'input', hidden: true }
           ]
         }, {
           columnCount: 1,
           fields: [
             { label: '文件路径', field: 'inoutFile', type: 'textarea' },
             { label: '报文内容', field: 'message', type: 'textarea' },
             { label: '任务条件', field: 'taskCondition', type: 'textarea' }
           ]
         }],
         /** 页面 提交、更新按钮 */
         updateButtons: [
           {
             label: '取消',
             type: 'primary',
             icon: 'yx-undo2',
             hidden: false,
             click: function (model) {
               _self.$refs.refform.resetFields();
               _self.dialogVisible = false;
             }
           },
           {
             label: '保存',
             type: 'primary',
             icon: 'check',
             hidden: false,
             click: function (model) {
               var validate = false;
               _self.$refs.refform.validate(function (valid) {
                 validate = valid;
               });
               if (!validate) {
                 return;
               }
               // 请调用服务进行后台保存
               var comitData = {};
               yufp.extend(comitData, _self.$refs.refform.formModel);
               // 判断是否重复
               var ifCf = false;
               var data = _self.$refs.reftable.data;
               for (var i = 0; i < data.length; i++) {
                 var info = data[i];
                 if (comitData.paramId == null && info.paramName == comitData.paramName) {
                   ifCf = true;
                   break;
                 } else if (info.paramId != comitData.paramId && info.paramName == comitData.paramName) {
                   ifCf = true;
                   break;
                 }
               }
               if (ifCf) {
                 _self.$message({ message: '参数名称不能重复', type: 'warning' });
                 return false;
               }
               comitData.assemblyId = _self.asseiblyId;
               if (comitData.paramType == 'T') { // 表
                 comitData.inoutFile = '';
                 comitData.message = '';
               } else if (comitData.paramType == 'F') { // 文件
                 comitData.message = '';
                 comitData.sourceTargetTab = '';
                 comitData.sourceTargetField = '';
                 comitData.taskCondition = '';
               } else if (comitData.paramType == 'M') { // 报文
                 comitData.inoutFile = '';
                 comitData.sourceTargetTab = '';
                 comitData.sourceTargetField = '';
                 comitData.taskCondition = '';
               }
               yufp.service.request({
                 method: 'POST',
                 url: '/api/asseibly/updateiteminout',
                 data: comitData,
                 callback: function (code, message, response) {
                   if (response.data.code === '2') {
                     me.$message({ message: response.data.message, type: 'warning' });
                   } else {
                     _self.dialogVisible = false;
                     _self.$message({ message: '数据保存成功！' });
                     var param = {
                       condition: JSON.stringify({
                         id: _self.asseiblyId
                       })
                     };
                     _self.$refs.reftable.remoteData(param);
                   }
                 }
               });
             }
           }
         ],
         height: yufp.frame.size().height,
         dialogVisible: false,
         formDisabled: false,
         formDisabled1: false,
         viewType: 'DETAIL',
         icondialogVisible: false,
         buttonDisabled: true,
         classList: [], // 分类信息
         assemblyList: [], // 组件
         allAssemblyList: [], // 全部组件信息
         viewTitle: yufp.lookup.find('CRUD_TYPE', false)
       };
     },
     methods: {
       // 保存分类、组件信息
       submitForm: function (formName) {
         var me = this;
         me.$refs[formName].validate(function (valid) {
           if (valid) {
             var comitData = {};
             if (formName == 'classTemp') { // 保存分类信息
               yufp.extend(comitData, me.$refs[formName].model);
               // 判断是否重复
               var ifCf = false;
               for (var i = 0; i < me.classList.length; i++) {
                 var info = me.classList[i];
                 if (info.classId != me.classId && info.className == comitData.className) {
                   ifCf = true;
                   break;
                 }
               }
               if (ifCf) {
                 me.$message({ message: '分类名称不能重复', type: 'warning' });
                 return false;
               }
               comitData.classId = me.classId;
               for (var i = 0; i < shapeitems.length; i++) {
                 if (shapeitems[i].icons == comitData.classIcon) {
                   comitData.classIcon = shapeitems[i].typeicon;
                   break;
                 }
               }
               yufp.service.request({
                 method: 'POST',
                 url: '/api/asseibly/updateclassify',
                 data: comitData,
                 callback: function (code, message, response) {
                   if (response.data.code === '2') {
                     me.$message({ message: response.data.message, type: 'warning' });
                   } else {
                     me.$message({ message: '数据保存成功！' });
                     me.queryClassifyInfo();
                   }
                 }
               });
             } else if (formName == 'assform') { // 保存组件信息
               yufp.extend(comitData, me.$refs[formName].model);
               // 判断是否重复
               var ifCf = false;
               for (var i = 0; i < me.allAssemblyList.length; i++) {
                 var info = me.allAssemblyList[i];
                 if (info.assemblyId != me.asseiblyId && info.assemblyName == comitData.assemblyName) {
                   ifCf = true;
                   break;
                 }
               }
               if (ifCf) {
                 me.$message({ message: '组件名称不能重复', type: 'warning' });
                 return false;
               }
               comitData.assemblyId = me.asseiblyId;
               comitData.classId = me.classId;
               comitData.suitScene = comitData.suitScene.join(',');
               yufp.service.request({
                 method: 'POST',
                 url: '/api/asseibly/updateitem',
                 data: comitData,
                 callback: function (code, message, response) {
                   if (response.data.code === '2') {
                     me.$message({ message: response.data.message, type: 'warning' });
                   } else {
                     me.queryAllItemsInfo();
                     // me.handleChange(me.classId);
                     me.$message({ message: '数据保存成功！' });
                   }
                 }
               });
             }
           } else {
             console.log('error submit!!');
             return false;
           }
         });
       },
       resetForm: function (formName) {
         this.istrue = 0;
         this.coloristrue = 0;
         this.$refs[formName].resetFields();
       },
       preview: function (formName) {
         if (this.$refs[formName].fields[5].fieldValue) {
           this.flowNode.designBody = this.$refs[formName].fields[6].fieldValue;
           this.flowNode.title = this.$refs[formName].fields[1].fieldValue;
           this.$refs.ncmpRef.show();
         }
       },
       // tab 被选中时触发
       handleClick: function (tab, event) {
         if (tab == 'first') {
           this.paramVisible = true;
         } else {
           this.paramVisible = false;
         }
       },
       // 关闭前的回调，会暂停 Dialog 的关闭
       handleClose: function () {

       },
       // 图表选择弹出事件
       handleIconClick: function () {
         this.icondialogVisible = true;
       },
       // 图表点击事件
       hangeicon: function (obj, subscript) {
         this.assform.assemblyStyle = obj.id;
         this.activeicon = obj.id;
         this.istrue = subscript;
       },
       // 删除分类及分类下的组件
       deleteClassFn: function (ev, obj) {
         var _this = this;
         _this.$message({ message: '暂不做删除动作！' });
         return false;
         _this.$confirm('此操作将永久删除该分类及分类下的组件, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning',
           center: true
         }).then(function () {
           yufp.service.request({
             method: 'POST',
             url: backend.appOcaService + '/api/asseibly/deleteitem?id=' + obj.classId,
             callback: function (code, message, response) {
               _this.$message({ message: '数据删除成功！' });
               _this.queryClassifyInfo();
             }
           });
         });
         ev.cancelBubble = true;// 只调用当前div的事件,禁止事件的浮生
       },
       // 新增渠道组件
       addAssemblyFn: function (ev, obj) {
         this.tab_activeName = 'first';
         this.ifUpdateItem = 'false';
         this.ifDisabledTabAs = false;
         this.ifDisabledTabCl = true;
         this.paramVisible = true;
         ev.cancelBubble = true;// 只调用当前div的事件,禁止事件的浮生
         this.$refs.assform.resetFields();
       },
       addForm: function (formName) {
         var _this = this;
         _this.$refs[formName].validate(function (valid) {
           if (valid) {
             var model = _this.$refs[formName].model;
             model.classId = _this.classId;
             model.suitScene = model.suitScene.join(',');
             yufp.service.request({
               method: 'POST',
               url: '/api/asseibly/',
               data: model,
               callback: function (code, message, response) {
                 _this.$message({ message: '数据保存成功！' });
               }
             });
           }
         });
       },
       // 修改组件初始化
       eidtAssemblyFn: function (ev, obj) {
         this.tab_activeName = 'first';
         this.ifUpdateItem = 'true';
         this.ifDisabledTabAs = false;
         this.ifDisabledTabCl = true;
         this.paramVisible = true;
         ev.cancelBubble = true;// 只调用当前div的事件,禁止事件的浮生
         this.assform.assemblyStyle = obj.assemblyStyle;
         this.activeicon = obj.assemblyStyle;
         this.assform.assemblyName = obj.assemblyName;
         this.assform.assemblyType = obj.assemblyType;
         this.assform.assemblyAnaMethod = obj.assemblyAnaMethod;
         this.assform.showForm = obj.showForm;
         this.assform.dataType = obj.dataType;
         this.assform.suitScene = obj.suitScene.split(',');
         this.asseiblyId = obj.assemblyId;
         this.$nextTick(function () {
           var param = {
             condition: JSON.stringify({
               id: this.asseiblyId
             })
           };
          //  this.$refs.reftable.remoteData(param);
         });
       },
       // 删除单个组件
       deleteAssemblyFn: function (ev, obj) {
         var _this = this;
         _this.$message({ message: '暂不做删除动作！' });
         return false;
         _this.$confirm('此操作将永久删除该组件, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning',
           center: true
         }).then(function () {
           yufp.service.request({
             method: 'POST',
             url: backend.appOcaService + '/api/asseibly/deleteitem?id=' + obj.assemblyId,
             callback: function (code, message, response) {
               _this.$message({ message: '数据删除成功！' });
               _this.handleChange(_this.classId);
             }
           });
         });
         ev.cancelBubble = true;// 只调用当前div的事件,禁止事件的浮生
       },
       // 分类form初始化
       eidtClassFn: function (ev, obj) {
         this.tab_activeName = 'second';
         this.ifUpdateClass = 'true';
         this.ifDisabledTabAs = true,
         this.ifDisabledTabCl = false,
         this.paramVisible = false;
         this.classTemp.className = obj.className;
         this.classTemp.classIcon = obj.classIcon;
         this.classTemp.classColor = obj.classColor;
         this.classTemp.classStyle = obj.classStyle;
         this.classId = obj.classId;
         for (var i = 0; i < shapeitems.length; i++) {
           if (shapeitems[i].typeicon == obj.classIcon) {
             this.istrue = i;
           }
         }
         for (var i = 0; i < coloritems.length; i++) {
           if (coloritems[i].icons == obj.classColor) {
             this.coloristrue = i;
           }
         }
       },
       // 查询全部组件信息
       queryAllItemsInfo: function () {
         var me = this;
         yufp.service.request({
           method: 'GET',
           url: '/api/asseibly/getalliteminfo',
           callback: function (code, message, response) {
             if (code === 0 && response.code === 0) {
               me.allAssemblyList = response.data;
               if (me.classId != null) {
                 me.handleChange(me.classId);
               }
             }
           }
         });
       },
       // 查询分类信息
       queryClassifyInfo: function () {
         var me = this;
         yufp.service.request({
           method: 'GET',
           url: '/api/asseibly/getclassifyinfo',
           callback: function (code, message, response) {
             if (code === 0 && response.code === 0) {
               var instu = response.data;
               // me.classList=[];
               var classInfo = [];
               for (var i = 0; i < instu.length; i++) {
                 var option = {};
                 option.classId = instu[i].classId;
                 option.classStyle = instu[i].classStyle;
                 option.classIcon = instu[i].classIcon;
                 option.className = instu[i].className;
                 option.classColor = instu[i].classColor;
                 classInfo.push(option);
               }
               me.classList = classInfo;
             }
           }
         });
       },
       // 加载分类下的组件
       handleChange: function (activeNames) {
         var me = this;
         var instu = me.allAssemblyList;
         var assminfo = [];
         for (var i = 0; i < instu.length; i++) {
           if (instu[i].classId == activeNames) {
             var option = {};
             option.classId = instu[i].classId;
             option.assemblyName = instu[i].assemblyName;
             option.assemblyAnaMethod = instu[i].assemblyAnaMethod;
             option.showForm = instu[i].showForm;
             option.assemblyId = instu[i].assemblyId;
             option.assemblyType = instu[i].assemblyType;
             option.assemblyStyle = instu[i].assemblyStyle;
             option.dataType = instu[i].dataType;
             option.suitScene = instu[i].suitScene;
             assminfo.push(option);
           }
         }
         me.assemblyList = assminfo;
       },
       /**
         * @param viewType 表单类型
         * @param editable 可编辑,默认false
         */
       switchStatus: function (viewType, editable) {
         this.viewType = viewType;
         this.dialogVisible = true;
         this.formDisabled = !editable;
         this.updateButtons[0].hidden = !editable;
         this.updateButtons[1].hidden = !editable;
       },
       /** 新增方法 */
       addItemFn: function () {
         var _self = this;
         _self.switchStatus('ADD', true);
         _self.$nextTick(function () {
           _self.$refs.refform.resetFields();
           _self.$refs.refform.formModel.paramId = null;
           _self.$refs.refform.formModel.inoutFile = '';
           _self.$refs.refform.formModel.message = '';
           _self.$refs.refform.formModel.sourceTargetTab = '';
           _self.$refs.refform.formModel.sourceTargetField = '';
           _self.$refs.refform.formModel.taskCondition = '';
           _self.$refs.refform.switch('sourceTargetTab', 'hidden', true);
           _self.$refs.refform.switch('sourceTargetField', 'hidden', true);
           _self.$refs.refform.switch('taskCondition', 'hidden', true);
           _self.$refs.refform.switch('inoutFile', 'hidden', true);
           _self.$refs.refform.switch('message', 'hidden', true);
         });
       },
       /** 修改方法 */
       itemsEditFn: function () {
         var _self = this;
         if (_self.$refs.reftable.selections.length != 1) {
           _self.$message({ message: '请先选择一条记录', type: 'warning' });
           return;
         }
         _self.switchStatus('EDIT', true);
         _self.$nextTick(function () {
           _self.$refs.refform.resetFields();
           _self.$refs.refform.formModel.inoutFile = '';
           _self.$refs.refform.formModel.message = '';
           _self.$refs.refform.formModel.sourceTargetTab = '';
           _self.$refs.refform.formModel.sourceTargetField = '';
           _self.$refs.refform.formModel.taskCondition = '';
           var obj = _self.$refs.reftable.selections[0];
           yufp.extend(_self.$refs.refform.formModel, obj);
           // 初始化查询参数
           var temp = yufp.clone(_self.updateFields[0].fields[5].params);
           temp.tables = obj.sourceTargetTab;
           _self.updateFields[0].fields[5].params = yufp.clone(temp);
         });
       },
       /** 详情方法 */
       detailinfoFn: function () {
         var _self = this;
         if (_self.$refs.reftable.selections.length != 1) {
           _self.$message({ message: '请先选择一条记录', type: 'warning' });
           return;
         }
         var obj = _self.$refs.reftable.selections[0];
         _self.switchStatus('DETAIL', false);
         _self.$nextTick(function () {
           _self.$refs.refform.resetFields();
           yufp.extend(_self.$refs.refform.formModel, obj);
         });
       },
       /** 删除方法 */
       deleteItemFn: function () {
         var _self = this;
         var selections = _self.$refs.reftable.selections;
         if (selections.length < 1) {
           _self.$message({ message: '请先选择要删除的记录', type: 'warning' });
           return;
         }
         _self.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning',
           center: true
         }).then(function () {
           var len = selections.length, arr = [];
           for (var i = 0; i < len; i++) {
             arr.push(selections[i].paramId);
           }
           yufp.service.request({
             method: 'POST',
             url: '/api/asseibly/deleteiteminout?ids=' + arr.join(','),
             callback: function (code, message, response) {
               if (code == 0) {
                 var param = {
                   condition: JSON.stringify({
                     id: _self.asseiblyId
                   })
                 };
                 _self.$refs.reftable.remoteData(param);
                 _self.$message('操作成功');
               }
             }
           });
         });
       },
       // 参数n为休眠时间，单位为毫秒:
       sleep: function sleep (n) {
         var start = new Date().getTime();
         //  console.log('休眠前：' + start);
         while (true) {
           if (new Date().getTime() - start > n) {
             break;
           }
         }
       }
     },
     mounted: function () {
       var me = this;
       yufp.lookup.bind('ASSEMBLY_TYPE', function (data) {
         me.assemblyTypeOptions = data;
       });
       yufp.lookup.bind('ASSEMBLY_ANA_METHOD', function (data) {
         me.assemblyAnaMethodOptions = data;
       });
       yufp.lookup.bind('DATA_LIMIST_TYPE', function (data) {
         me.dataTypeOptions = data;
       });
       yufp.lookup.bind('ACTIVITY_TYPE', function (data) {
         me.suitSceneOptions = data;
       });
       // 查询分类信息
       me.queryClassifyInfo();
       // 初始化组件信息
       me.queryAllItemsInfo();
     }
   });
 };
});