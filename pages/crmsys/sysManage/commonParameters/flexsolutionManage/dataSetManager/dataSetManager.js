/**
 * Created by zhangxs4 on 2019/01/14.
 * @description 数据集管理
 */
define([
  './custom/widgets/js/yufpOrgTree.js'
], function (require, exports) {
  yufp.lookup.reg('FIELD_TYPES,FIELD_OPTIONS');
  var flowOptions = [];
  var datacodeOptions = [];
  var itemOptions = [];
  var objOptions = [];

  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CREATE_TYPE');
    // 创建virtual filter model
    var vm = yufp.custom.vue({
      // TODO 请替换此id参数
      el: cite.el,
      // 以m_开头的参数为UI数据不作为业务数据，否则为业务数据
      data: function () {
        var me = this;
        return {
          serviceUrl: backend.adminService + '/api/ocrmfcifqdbcol/collist',
          getgroupUrl: backend.adminService + '/api/ocrmfcifqgroup/getgroup',
          idView: false,
          setDatas: [],
          itemOptions: itemOptions,
          objOptions: objOptions,
          datacodeOptions: datacodeOptions,
          buttonsDisabled: false,
          dialogFormVisible: false,
          flowOptions: flowOptions,
          height: yufp.custom.viewSize().height - 140,
          value: '',
          groupparam: {},
          itemTemp: {
            dbtableName: '',
            alias: '',
            id: ''
          },
          rules: {
            alias: [{ required: true, message: '必填项', trigger: 'blur' }]
          },
          // 当前select的值——对象
          objType: '',
          // 用户登录码
          userId: yufp.session.userCode,
          queryFields: [],
          queryButtons: [
            {
              label: '查询',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  me.$refs.filterTable.remoteData(param);
                }
              }
            }
            // {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
          ],
          tableColumns: [
            { label: '指标英文', prop: 'colNameE', width: 130 },
            { label: '指标名称', prop: 'colNameC', width: 130 },
            { label: '来源表', prop: 'dbtableName', width: 130 },
            { label: '指标长度', prop: 'colSize', width: 130 },
            { label: '指标类型', prop: 'colType', width: 130 },
            { label: '是否为空', prop: 'isNull', width: 130 },
            { label: '是否主键', prop: 'primaryKeyFlag', width: 130 },
            { label: '数据字典类型', prop: 'notes', width: 130 },
            { label: '是否可用', prop: 'isEnable', width: 130 }
          ],
          flag: false, // 是否选择分组标识
          loadflag: false, // 点击修改按钮是否触发来源表下拉框change事件
          objItem: [],
          // 分组数据信息
          groupData: {},
          groupval: '',
          // 表单操作状态
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          filterGrid: {
            // 系统参数当前行
            currentRow: null,
            // 系统参数多选ID
            multipleSelection: '',
            data: null,
            subdata: null,
            total: null,
            loading: true,
            subloading: true
            // 系统参数模糊查询表头

          },
          // 操作对象或分组表单的配置项
          updateFields: [{
            columnCount: 1,
            fields: [
              {
                field: 'type',
                label: '创建类型',
                type: 'select',
                disabled: true,
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }
                ],
                dataCode: 'CREATE_TYPE',
                change: function (type) {
                  if (type == '1') {
                    // 创建对象
                    me.switch2Obj();
                  } else if (type == '2') {
                    // 创建分组
                    me.switch2Group();
                  }
                }
              },
              {
                field: 'parentId',
                label: '父级对象',
                type: 'select',
                // dataCode: 'NATIONALITY',
                options: objOptions,
                hidden: true,
                rules: [
                  { required: true, message: '必填项' }
                ]
              },
              {
                field: 'groupName',
                label: '分组名称',
                type: 'input',
                hidden: true,
                rules: [
                  { required: true, message: '必填项' }
                ]
              },
              {
                field: 'sort',
                label: '排序',
                type: 'input',
                hidden: true,
                rules: [
                  { required: true, message: '必填项' },
                  { max: 22, message: '长度不能超过22' }
                ]
              },
              // TODO 确定接口文档上的对象名称的 字段名
              {
                field: 'objName',
                label: '对象名称',
                type: 'input',
                hidden: true,
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }
                ]
              },
              {
                field: 'tableName',
                label: '表名',
                type: 'select',
                options: flowOptions,
                hidden: true,
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }
                ]
              },
              {
                field: 'alias',
                label: '表别名',
                type: 'input',
                hidden: true,
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }
                ]
              }
            ]
          }],
          updateButtons: [
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: true,
              click: function (model) {
                var validate = false;
                me.$refs.reform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                if (model.type == '1') {
                  // model.type为1，创建类型为对象
                  model.parentId = '0';
                  // 新增修改对象调同一个接口
                  yufp.service.request({
                    method: 'POST',
                    url: '/api/ocrmfcifqobj/editobj',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code === 0) {
                        // 清空表单
                        me.$refs.reform.resetFn();
                        // 刷新对象
                        me.queryObjFn.call(me);
                        // 刷新分组树
                        me.$refs.mytree.remoteData();
                        delete model.id;
                      } else {
                        me.$message.error('操作失败');
                      }
                    }
                  });
                } else if (model.type == '2') {
                  if (!model.parentId) {
                    me.$message({
                      message: '请选择父级对象',
                      type: 'warning'
                    });
                    return;
                  }
                  // 修改
                  if (model.id) {
                    yufp.service.request({
                      method: 'POST',
                      url: '/api/ocrmfcifqgroup/editgroup',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0 && response.code === 0) {
                          // 清空表单
                          me.$refs.reform.resetFn();
                          me.$refs.mytree.remoteData();
                          delete model.id;
                        } else {
                          me.$message.error('操作失败');
                        }
                      }
                    });
                  } else {
                    model.objId = model.parentId;
                    model.parentId = '0';
                    yufp.service.request({
                      method: 'POST',
                      url: '/api/ocrmfcifqgroup/creategroup',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0 && response.code === 0) {
                          // 清空表单
                          me.$refs.reform.resetFn();
                          me.$refs.mytree.remoteData();
                        } else {
                          me.$message.error('操作失败');
                        }
                      }
                    });
                  }
                }
              }
            }
          ]
        };
      },
      mounted: function () {
        var me = this;
        yufp.lookup.bind('FIELD_TYPES', function (data) {
          me.keyOptions = data;
        });
        // 设置字段属性值样式
        yufp.lookup.bind('COMBO_SELECTBOX', function (data) {
          me.comboSelectOptions = data;
        });
        yufp.lookup.bind('NUM_DATABOX', function (data) {
          me.numDataOptions = data;
        });
        yufp.lookup.bind('TEXTBOX', function (data) {
          me.textOptions = data;
        });
        yufp.lookup.bind('RADIO_COMBOBOX', function (data) {
          me.radioComboOptions = data;
        });
        yufp.lookup.bind('COUNT_SUM', function (data) {
          me.countSumOptions = data;
        });
        yufp.lookup.bind('NO_SENSI', function (data) {
          me.sensiOptions = data;
        });
        // 加载来源表下拉数据
        yufp.service.request({
          method: 'GET',
          url: backend.adminService + '/api/ocrmfcifqdbcol/getDataSetSolution',
          callback: function (code, message, response) {
            var tab = response.data;
            for (var i = 0; i < tab.length; i++) {
              var option = {};
              option.key = tab[i].value;
              option.value = tab[i].value;
              flowOptions.push(option);
            }
          }
        });
        // 加载数据字典
        yufp.service.request({
          method: 'GET',
          url: backend.adminService + '/api/ocrmfcifqdbcol/qrylookupcode',
          callback: function (code, message, response) {
            var lookupcode = response.data;
            for (var i = 0; i < lookupcode.length; i++) {
              var option = {};
              option.key = lookupcode[i].lookupCode;
              option.value = lookupcode[i].lookupName;
              datacodeOptions.push(option);
            }
          }
        });
        // 加载对象数据
        me.queryObjFn.call(me);
        // yufp.service.request({
        //   method: 'GET',
        //   async: false,
        //   url: backend.adminService + '/api/ocrmfcifqobj/getobj',
        //   callback: function (code, message, response) {
        //     var objitem = response.data;
        //     // 存储“对象”数据
        //     me.objItem = response.data;
        //     for (var i = 0; i < objitem.length; i++) {
        //       var option = {};
        //       option.key = objitem[i].id;
        //       option.value = objitem[i].objName;
        //       objOptions.push(option);
        //     }
        //   }
        // });
      },
      methods: {
        /**
        * 查询对象
        */
        queryObjFn: function () {
          var _this = this;
          // 清空对象option
          var len = objOptions.length;
          objOptions.splice(0, len);
          yufp.service.request({
            method: 'GET',
            async: false,
            url: backend.adminService + '/api/ocrmfcifqobj/getobj',
            callback: function (code, message, response) {
              var objitem = response.data;
              // 存储“对象”数据
              _this.objItem = response.data;
              for (var i = 0; i < objitem.length; i++) {
                var option = {};
                option.key = objitem[i].id;
                option.value = objitem[i].objName;
                objOptions.push(option);
              }
            }
          });
        },
        /**
        * 切换为展示分组表单的内容
        */
        switch2Group: function () {
          var _this = this;
          _this.$refs.reform.switch('objName', 'hidden', true);
          _this.$refs.reform.switch('tableName', 'hidden', true);
          _this.$refs.reform.switch('alias', 'hidden', true);
          _this.$refs.reform.switch('parentId', 'hidden', false);
          _this.$refs.reform.switch('groupName', 'hidden', false);
          _this.$refs.reform.switch('sort', 'hidden', false);
        },
        /**
        * 切换为展示类别为对象的表单内容
        */
        switch2Obj: function () {
          var _this = this;
          _this.$refs.reform.switch('parentId', 'hidden', true);
          _this.$refs.reform.switch('groupName', 'hidden', true);
          _this.$refs.reform.switch('sort', 'hidden', true);
          _this.$refs.reform.switch('objName', 'hidden', false);
          _this.$refs.reform.switch('tableName', 'hidden', false);
          _this.$refs.reform.switch('alias', 'hidden', false);
        },
        /**
         * 新增（对象或分组）执行
         */
        addCateFn: function () {
          this.$refs.reform.switch('parentId', 'hidden', true);
          this.$refs.reform.switch('groupName', 'hidden', true);
          this.$refs.reform.switch('sort', 'hidden', true);
          this.$refs.reform.switch('objName', 'hidden', true);
          this.$refs.reform.switch('tableName', 'hidden', true);
          this.$refs.reform.switch('alias', 'hidden', true);
          this.$refs.reform.switch('type', 'disabled', false);
          this.$refs.reform.switch('type', 'hidden', false);
          this.updateButtons[0].hidden = false;
          this.$refs.reform.formModel = {};
        },
        /**
         * 点击-修改（对象或分组）执行
         */
        updateCateFn: function () {
          var _this = this;
          // 隐藏创建字段
          _this.$refs.reform.switch('type', 'hidden', true);
          // 当未选择分组时
          if (_this.groupval == '' || _this.groupval == undefined) {
            _this.switch2Obj();
            var modelO = {};
            // 标识类型为对象
            modelO.type = '1';
            // 遍历对象数据得到当前选中的对象
            for (var i = 0, len = _this.objItem.length; i < len; i++) {
              if (_this.objItem[i].id == _this.objType) {
                _this.$refs.reform.formModel = yufp.clone(_this.objItem[i], modelO);
                break;
              }
            }
          } else {
            _this.switch2Group();
            var model = {};
            // 标识类型为分组
            model.type = '2';
            _this.$refs.reform.formModel = yufp.clone(_this.groupData, model);
          }
          this.updateButtons[0].hidden = false;
        },
        /**
        * 删除（对象或分组）执行
        */
        deleteCateFn: function () {
          var _this = this;
          // 当未选择分组时
          if (_this.groupval == '') {
            _this.$confirm('确定要删除该对象吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true,
              callback: function (action) {
                var objId;
                if (action === 'confirm') {
                  for (var i = 0, len = _this.objItem.length; i < len; i++) {
                    if (_this.objItem[i].id == _this.objType) {
                      objId = _this.objItem[i].id;
                      break;
                    }
                  }
                  // 删除对象
                  var id = objId;
                  yufp.service.request({
                    method: 'POST',
                    url: '/api/ocrmfcifqobj/deleteobj/' + id,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code === 0) {
                        _this.$message({
                          type: 'success',
                          message: '操作成功'
                        });
                      } else {
                        _this.$message.error('操作失败');
                      }
                    }
                  });
                }
              }
            });
          } else {
            _this.$confirm('确定要删除该分组吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true,
              callback: function (action) {
                if (action === 'confirm') {
                  // 删除分组
                  var id = _this.groupval;
                  yufp.service.request({
                    method: 'POST',
                    url: '/api/ocrmfcifqgroup/deletegroup/' + id,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code === 0) {
                        _this.$message({
                          type: 'success',
                          message: '操作成功'
                        });
                      } else {
                        _this.$message.error('操作失败');
                      }
                    }
                  });
                }
              }
            });
          }
        },
        // 点击分组事件
        groupnodeClick: function (nodeData, node, self) {
          this.flag = true;
          this.groupData = nodeData;
          this.groupval = nodeData.id;
          var param = {
            condition: JSON.stringify({ groupId: nodeData.id })
          };
          this.$refs.filterTable.remoteData(param);
        },
        // 变换对象选项加载分组
        objchange: function (objvalue) {
          this.flag = false;
          this.groupval = '';
          // 存储当前选择的值
          this.objType = objvalue;
          if (typeof objvalue === 'number') {
            this.groupparam = { objId: objvalue.toString() };
            this.$refs.mytree.remoteData();
          }
        },
        rowClickFn: function (selection, row) {
          this.selections = selection;
          // 用于单个修改
          this.filterGrid.currentRow = row;
        },

        // 选择来源表对应的表字段加载到table
        valueChange: function (value) {
          var me = this;
          if (me.loadflag) {
            me.loadflag = false;
            return;
          }
          if (me.flag == false && me.groupval == '') {
            me.$message({ message: '请先选择分组！', type: 'warning' });
            return false;
          }
          // 下拉框变换时查询此表是否已经配置指标
          var isparam = {
            condition: JSON.stringify({
              groupId: me.groupval,
              dbtableName: value
            })
          };
          yufp.service.request({
            url: backend.adminService + '/api/ocrmfcifqdbcol/isexist',
            method: 'get',
            data: isparam,
            callback: function (code, message, response) {
              if (code == '0') {
                me.resetcoladdFn(response.data);
              }
            }
          });
          // 下拉框变换时查询此表是否已经配置指标
        },

        // 新增指标
        adddatasetFn: function () {
          var me = this;
          if (me.flag == false && me.groupval == '') {
            me.$message({ message: '请先选择分组！', type: 'warning' });
            return false;
          }
          me.dialogFormVisible = true;
          me.viewType = 'ADD';
          this.$nextTick(function () {
            vm.itemTemp.dbtableName = '';
            vm.itemTemp.id = '';
            vm.itemTemp.alias = '';
            me.setDatas = [];
          });
        },
        // 变换选中的字段类型
        fieldchange: function (index, value) {
          var _set = this;
          if ((value.fieldType == '4' || value.fieldType == '5' || value.fieldType == '6') && _set.$refs.setDataTable.data[index].notes != null) { // 字段类型选中是下拉框时候
            yufp.service.request({
              method: 'GET',
              data: {
                lookupCode: _set.$refs.setDataTable.data[index].notes
              },
              url: backend.adminService + '/api/ocrmfcifqdbcol/getcodeitem',
              callback: function (code, message, response) {
                var codedata = response.data;
                _set.itemOptions = [];
                for (var i = 0; i < codedata.length; i++) {
                  var option = {};
                  option.key = codedata[i].lookupItemCode;
                  option.value = codedata[i].lookupItemName;
                  _set.itemOptions.push(option);
                }
                _set.$set(_set.$refs.setDataTable.data[index], 'options', _set.itemOptions);
              }
            });
          }
          _set.conditionField = [];
          value.fName = '';
          _set.getConditionField(_set.conditionField, value);
          
          if (_set.conditionField[0].item.ctype != '') {
            _set.$set(_set.$refs.setDataTable.data[index], 'ctype', _set.conditionField[0].item.ctype);
          }
          if (_set.conditionField[0].item.type != '') {
            _set.$set(_set.$refs.setDataTable.data[index], 'type', _set.conditionField[0].item.type);
          }
          if (_set.conditionField[0].item.unit != '') {
            _set.$set(_set.$refs.setDataTable.data[index], 'unit', _set.conditionField[0].item.unit);
          }
          if (_set.conditionField[0].item.options && _set.conditionField[0].item.options.length > -1) {
            _set.$set(_set.$refs.setDataTable.data[index], 'options', _set.conditionField[0].item.options);
          }
          _set.$set(_set.$refs.setDataTable.data[index], 'multiple', _set.conditionField[0].item.multiple);
        },
        // 变换选中的数据字典
        datacodechange: function (index, value) {
          var _set = this;
          var fieldType = this.$refs.setDataTable.data[index].fieldType;
          if (value.notes != null && (fieldType == '4' || fieldType == '5' || fieldType == '6')) { // 字段类型为下拉框则
            // 查询数据字典选项对应的值
            yufp.service.request({
              method: 'GET',
              data: {
                lookupCode: value.notes
              },
              url: backend.adminService + '/api/ocrmfcifqdbcol/getcodeitem',
              callback: function (code, message, response) {
                var codedata = response.data;
                _set.itemOptions = [];
                for (var i = 0; i < codedata.length; i++) {
                  var option = {};
                  option.key = codedata[i].lookupItemCode;
                  option.value = codedata[i].lookupItemName;
                  _set.itemOptions.push(option);
                }
                _set.$set(_set.$refs.setDataTable.data[index], 'options', _set.itemOptions);
              }
            });
          }
          _set.conditionField = [];
          value.fName = '';
          _set.getConditionField(_set.conditionField, value);
          console.log('isonger==' + JSON.stringify(_set.conditionField));
          if (_set.conditionField[0].item.ctype != '') {
            _set.$set(_set.$refs.setDataTable.data[index], 'ctype', _set.conditionField[0].item.ctype);
          }
          if (_set.conditionField[0].item.type != '') {
            _set.$set(_set.$refs.setDataTable.data[index], 'type', _set.conditionField[0].item.type);
          }
          if (_set.conditionField[0].item.unit != '') {
            _set.$set(_set.$refs.setDataTable.data[index], 'unit', _set.conditionField[0].item.unit);
          }
          if (_set.conditionField[0].item.options && _set.conditionField[0].item.options.length > -1) {
            _set.$set(_set.$refs.setDataTable.data[index], 'options', _set.conditionField[0].item.options);
          }
          _set.$set(_set.$refs.setDataTable.data[index], 'multiple', _set.conditionField[0].item.multiple);
        },

        getConditionField: function (arr, field) {
          var selection = {};
          var obj = {};
          var item = {};
          selection.ctype = 'select';
          item.type = '';
          item.options = [];
          item.unit = '';
          item.multiple = false;
          var mycars = [];
          if (field.fieldType == '1') { // 文本框
            // selection.options = this.textOptions;
            item.ctype = 'input';
            item.type = '';
            item.unit = '';
            item.multiple = false;
            item.options = mycars;
          } else if (field.fieldType == '2') { // 数字框
            // selection.options = this.numDataOptions;
            item.ctype = 'input';
            item.unit = '万元';
            item.multiple = false;
            item.type = '';
            item.options = mycars;
          } else if (field.fieldType == '3') { // 日期框
            // selection.options = this.numDataOptions;
            item.ctype = 'datepicker';
            item.type = 'date';// daterange
            item.multiple = false;
            item.options = mycars;
            item.unit = '';
          } else if (field.fieldType == '4') { // 下拉框
            // selection.options = this.radioComboOptions;
            item.ctype = 'select';
            item.type = '';
            item.multiple = false;
            item.unit = '';
            if (field.notes !== undefined && field.notes !== '') {
              yufp.lookup.bind(field.notes, function (data) {
                item.options = data;
              });
            } else { // 给options赋值一个随便数组
              item.options = mycars;
            }
          } else if (field.fieldType == '5') { // 单选框
            // selection.options = this.radioComboOptions;
            item.ctype = 'select';
            item.type = '';
            item.multiple = false;
            item.unit = '';
            if (field.notes !== undefined && field.notes !== '') {
              yufp.lookup.bind(field.notes, function (data) {
                item.options = data;
              });
            } else { // 给options赋值一个随便数组
              var mycars = [];

              item.options = mycars;
            }
          } else if (field.fieldType == '6') { // 下拉复选框
            // selection.options = this.comboSelectOptions;
            item.ctype = 'select';
            item.type = '';
            item.unit = '';
            item.multiple = true;
            if (field.notes !== undefined && field.notes !== '') {
              yufp.lookup.bind(field.notes, function (data) {
                item.options = data;
              });
            } else { // 给options赋值一个随便数组
              var mycars = [];
              item.options = mycars;
            }
          } else if (field.fieldType == '7') { // 放大镜
            // selection.options = this.comboSelectOptions;
            // item.ctype ='yufp-duty-selector';
            item.type = '';
            item.multiple = false;
            item.unit = '';
            item.ctype = 'select';
            if (field.fName !== undefined && field.fName !== '') {
              yufp.lookup.bind(field.fName, function (data) {
                item.options = data;
              });
            } else {
              yufp.lookup.bind('FIELD_OPTIONS', function (data) {
                item.options = data;
              });
            }
          }
          obj.section = selection;
          obj.item = item;
          arr.push(obj);
        },
        // 批量删除
        datasetDeleteFn: function () {
          var ids = '';
          var filterSelecttions = this.$refs.filterTable.selections;
          if (filterSelecttions.length > 0) {
            for (var i = 0; i < filterSelecttions.length; i++) {
              // 记录多选用于多删
              if (filterSelecttions.length === 1) {
                ids = filterSelecttions[i].id;
              } else {
                ids = ids + ',' + filterSelecttions[i].id;
              }
            }
          } else {
            vm.$message({ message: '请选择需要删除的系统参数!' });
            return false;
          }
          vm.$confirm('确认批量删除该系统参数?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            yufp.service.request({
              url: backend.adminService + '/api/ocrmfcifqdbcol/deletes/' + ids,
              method: 'post',
              data: vm.filterGrid.currentRow,
              callback: function (code, message, response) {
                if (code == '0') {
                  vm.$message({ message: '删除成功!' });
                  vm.$refs.filterTable.remoteData();
                } else {
                  vm.$message({ message: '删除失败!' });
                }
              }
            });
          });
        },
        // 关闭指标维护
        dialogClose: function () {
          this.loadflag = false;
          vm.itemTemp.alias = '';
          vm.itemTemp.dbtableName = '';
          this.setDatas = [];
        },
        // 修改指标
        datacasesetFn: function () {
          var me = this;
          me.loadflag = true;
          if (me.groupval == '') {
            me.$message({ message: '请选择分组下的指标进行维护！', type: 'warning' });
            return false;
          }
          vm.itemTemp.alias = '';
          vm.itemTemp.dbtableName = '';
          me.setDatas = [];
          if (this.$refs.filterTable.selections.length != 1) {
            vm.$message({ message: '请选择一条记录修改!' });
            return false;
          }
          me.dialogFormVisible = true;
          this.$nextTick(function () {
            var funcInfos = this.$refs.filterTable.selections[0];
            this.itemTemp = Object.assign(this.itemTemp, funcInfos);
            this.resetcolFn();
          });
        },
        // 新增操作判断是否重新加载
        resetcoladdFn: function (adddata) {
          var me = this;
          var model = new Object();
          model.value = vm.itemTemp.dbtableName;
          var param = {
            condition: JSON.stringify(model)
          };
          if (adddata.length != 0) {
            vm.$confirm('来源表已经配置指标，是否重新配置指标?', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning',
              callback: function (action) {
                if (action === 'confirm') { // 是的情况，查询该表的所有字段
                  yufp.service.request({
                    url: backend.adminService + '/api/ocrmfcifqdbcol/qryallsetdata',
                    method: 'get',
                    data: param,
                    async: false,
                    callback: function (code, message, response) {
                      if (code == '0') {
                        me.setDatas = response.data;
                        vm.itemTemp.alias = '';
                      }
                    }
                  });
                } else { // 否的情况就直接展示
                  me.setDatas = adddata;
                  vm.itemTemp.alias = adddata[0].alias;
                  me.$nextTick(function () {
                    if (me.setDatas.length > 0) {
                      me.dataSubFnshow(me.setDatas);
                    }
                  });
                }
              }
            });
          } else {
            yufp.service.request({
              url: backend.adminService + '/api/ocrmfcifqdbcol/qryallsetdata',
              method: 'get',
              data: param,
              async: false,
              callback: function (code, message, response) {
                if (code == '0') {
                  me.setDatas = response.data;
                  vm.itemTemp.alias = '';
                }
              }
            });
          }
        },
        // 修改操作
        resetcolFn: function () {
          var me = this;
          var model = new Object();
          model.value = this.$refs.filterTable.selections[0].dbtableName;
          var param = {
            condition: JSON.stringify(model)
          };
          vm.$confirm('是否重新配置指标?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(function () { // 是的情况
            yufp.service.request({
              url: backend.adminService + '/api/ocrmfcifqdbcol/qryallsetdata',
              method: 'get',
              data: param,
              async: false,
              callback: function (code, message, response) {
                if (code == '0') {
                  me.setDatas = response.data;
                }
              }
            });
          }).catch(function () { // 否的情况
            var isparam = {
              condition: JSON.stringify({
                groupId: me.groupval,
                dbtableName: me.$refs.filterTable.selections[0].dbtableName
              })
            };
            me.setDatas = [];
            yufp.service.request({
              url: backend.adminService + '/api/ocrmfcifqdbcol/isexist',
              method: 'get',
              data: isparam,
              callback: function (code, message, response) {
                if (code == '0') {
                  me.setDatas = response.data;
                  vm.itemTemp.alias = response.data[0].alias;
                  me.$nextTick(function () {
                    if (me.setDatas.length > 0) {
                      me.dataSubFnshow(me.setDatas);
                    }
                  });
                }
              }
            });
          });
        },
        // 根据返回的数据判断字段类型 然后回显控件begin
        dataSubFnshow: function (itemdatas) {
          var me = this;
          var datalist = me.$refs.setDataTable.data;
          for (i = 0; i < itemdatas.length; i++) {
            // 设置默认选中
            me.$refs.setDataTable.toggleRowSelection(itemdatas[i]);
            me.conditionField = [];
            me.getConditionField(me.conditionField, itemdatas[i]);
            me.$set(itemdatas[i], 'ctype', me.conditionField[0].item.ctype);
            me.$set(itemdatas[i], 'type', me.conditionField[0].item.type);
            me.$set(itemdatas[i], 'unit', me.conditionField[0].item.unit);
            me.$set(itemdatas[i], 'options', me.conditionField[0].item.options);
            me.$set(itemdatas[i], 'multiple', me.conditionField[0].item.multiple);
          }
        },

        // 修改保存指标
        dataSubFn: function () {
          var me = this;
          var dataList = this.$refs.setDataTable.selection;
          for (var i = 0; i < dataList.length; i++) {
            dataList[i].alias = vm.itemTemp.alias;
            dataList[i].groupId = me.groupval;
            dataList[i].dbtableName = vm.itemTemp.dbtableName;
            dataList[i].isEnable = 'true';
            if (dataList[i].fName instanceof Array) {
              var fName = [];
              fName[i] = dataList[i].fName;
              dataList[i].fName = fName.join(',');
            } else {
              dataList[i].fName = dataList[i].fName;
            }
          }
          yufp.service.request({
            url: backend.adminService + '/api/ocrmfcifqdbcol/updatesetdata/',
            method: 'POST',
            data: JSON.stringify(dataList),
            callback: function (code, message, response) {
              if (code == '0') {
                vm.$message({ message: '保存成功!', type: 'info' });
                vm.$refs.filterTable.remoteData();
                vm.dialogFormVisible = false;
              } else {
                vm.$message({ message: '保存失败!', type: 'warning' });
              }
            }
          });
        }
      },
      filters: {

      },

      watch: {
        //          		viewType:function(value){
        //          		 	if (value == 'ADD') {
        //                          this.updateButtons[1].hidden = false;
        //                          this.updateButtons[2].hidden = true;
        //                      } else if (value == 'EDIT') {
        //                          this.updateButtons[1].hidden = true;
        //                          this.updateButtons[2].hidden = false;
        //
        //                      } else if (value == 'DETAIL') {
        //                      }
        //          		}
      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});