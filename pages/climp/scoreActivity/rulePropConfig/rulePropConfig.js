/**
 * @Created by panglx panglx@yusys.com.cn on 2018-12-28 17:18:38.
 * @updated by chenlin
 * @description 规则属性配置
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    // yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS,TRANSACTION_TYPE,FIELD_TYPE,FIELD_OPTIONS');
    yufp.lookup.reg('TRANSACTION_TYPE,FIELD_TYPE,FIELD_OPTIONS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          treeUrl: '/api/tabletype/list', // 表类别Url,
          tableDataUrl: '/api/tableecname/tablelist', // 表名列表查询接口
          baseParams: {}, // 表名列表查询参数
          tabcount: 0,
          fieldType: '',
          fieldTableDataUrl: '/api/fieldecname/fieldlist', // 字段列表查询接口
          fieldBaseParams: {}, // 字段列表查询参数
          index: '', // 字段列表被点击时行的序号
          addSaveBtnShow: false, // 新增类别树保存按钮是否显示
          modifySaveBtnShow: false, // 修改类别树保存按钮是否显示
          saveDisable: false,
          tableTypeNode: '',
          tranCodeOptions: [],
          fnameOptions: [],
          tableId: '',
          treeFormdata: {}, // 类别树表单数据
          treeFormDisabled: true, // 类别树表单是否可编辑
          isMagnifierDisabled: true, // 放大镜是否开启禁用
          isFnameDisabled: true, // 字段选项是否开启禁用
          transactionCodeDataUrl: '/api/transactioncategory/searchtranscode', // 交易类型下拉选项
          fnameDataUrl: '/api/transactioncategory/searchlookupcode', // 字段选项所有码子查询
          formdata: {},
          tableDialogVisible: false, // 新增表格弹框是否可见
          dataParams: {
            transType: ''
          }, // 交易名称查询参数
          numberRules: [{ validator: yufp.validator.number, message: '字段必须为数字' }],
          height: yufp.frame.size().height
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: _this.transactionCodeDataUrl,
          callback: function (code, message, response) {
            var tab = response.data;
            for (var i = 0; i < tab.length; i++) {
              var option = {};
              option.key = tab[i].key;
              option.value = tab[i].value;
              option.tableEName = tab[i].tableEName;
              _this.tranCodeOptions.push(option);
            }
          }
        });
        // 获取数据库里所有码值
        yufp.service.request({
          method: 'GET',
          url: _this.fnameDataUrl,
          callback: function (code, message, response) {
            var tab = response.data;
            for (var i = 0; i < tab.length; i++) {
              var option = {};
              option.key = tab[i].key;
              option.value = tab[i].value;
              _this.fnameOptions.push(option);
            }
          }
        });
      },
      methods: {
        /**
         * 规则化头部全选和反选处理
         */
        renderHeaderFn: function (h, data) {
          var _this = this;
          return h('span', [
            h('el-checkbox',
              {
                style: 'margin-right: 5px;',
                on: {
                  change: _this.changex
                }
              }), h('span', data.column.label)
          ]);
        },
        changex: function (val) {
          // 注释为全选
          var tb = this.$refs.refFieldTable;
          var data = tb.tabledata;
          tb.tabledata = [];
          for (var i = 0; i < data.length; i++) {
            data[i].isDisplay = !this.isDisplay;
            tb.tabledata[i] = data[i];
          }
          this.isDisplay = !this.isDisplay;
        },
        /**
         * 节点点击方法
         */
        nodeClickFn: function (node) {
          var _this = this;
          _this.addSaveBtnShow = false;
          _this.modifySaveBtnShow = false;
          _this.$nextTick(function () {
            var obj = node;
            _this.tableTypeNode = node;
            yufp.clone(obj, _this.treeFormdata);
          });
          var typeId = node.typeId;
          if (node.typeParentId == 'P000') {
            typeId = node.typeParentId;
          }
          _this.baseParams.typeId = typeId;
          _this.$refs.refTable.remoteData(_this.baseParams);
          _this.fieldBaseParams.tableId = '1';
          _this.$refs.refFieldTable.remoteData(_this.fieldBaseParams);
        },
        /**
         * 活动项目增加
         */
        addTreeFn: function () {
          if (this.tableTypeNode == '') {
            this.$message({ message: '请选择父类别!', type: 'warning' });
            return false;
          }
          if (this.tableTypeNode.typeLevel == '4') {
            this.$message({ message: '只能添加三级表类别目录!', type: 'warning' });
            return false;
          }
          this.addSaveBtnShow = true;
          this.modifySaveBtnShow = false;
          this.treeFormDisabled = false;
          this.$nextTick(function () {
            this.$refs.refTreeForm.resetFields();
            this.treeFormdata.typeParentName = this.tableTypeNode.typeName;
            this.treeFormdata.typeParentId = this.tableTypeNode.typeId;
          });
        },
        /**
         * 活动项目删除
         */
        deleteTreeFn: function () {
          if (this.tableTypeNode == '') {
            this.$message({ message: '请选择要删除的类别!', type: 'warning' });
            return false;
          }
          if (this.tableTypeNode.typeParentId == 'P000') {
            this.$message({ message: '类别根目录不能删除!', type: 'warning' });
            return false;
          }
          var _this = this;
          var arr = [];
          this.getArray(this.tableTypeNode, arr);
          _this.$confirm('确认要删除该类别吗?删除该类别将连同子类别以及关联的表名列表及字段列表一起删除！ 是否继续?', '提示', {
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.yuspClimpActyService + '/api/tabletype/deletebatch',
              data: {
                typeId: arr.join(','),
                orgCode: yufp.session.org.code
              },
              callback: function (code, message, response) {
                if (response.code == 0) {
                  _this.$refs.tableTypeTree.remoteData();
                  _this.$refs.refTreeForm.resetFields();
                  _this.baseParams.typeId = _this.tableTypeNode.typeId;
                  _this.$refs.refTable.remoteData(_this.baseParams);
                  _this.fieldBaseParams.tableId = '1';
                  _this.$refs.refFieldTable.remoteData(_this.fieldBaseParams);
                  _this.$message('删除成功');
                  _this.tableTypeNode = '';
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          });
        },
        // 循环取表类型的id
        getArray: function (data, arr) {
          if (data.length == undefined) {
            arr.push(data.typeId);
            if (data.children.length > 0) {
              this.getArray(data.children, arr);
            }
          } else {
            for (var i = 0; i < data.length; i++) {
              arr.push(data[i].typeId);
              if (data[i].children.length > 0) {
                this.getArray(data[i].children, arr);
              }
            }
          }
          return arr;
        },
        /**
          * 活动项目修改
          */
        modifyTreeFn: function () {
          var _this = this;
          if (_this.tableTypeNode == '') {
            _this.$message({ message: '请选择要修改的类别!', type: 'warning' });
            return false;
          }
          _this.addSaveBtnShow = false;
          _this.modifySaveBtnShow = true;
          _this.treeFormDisabled = false;
          _this.$nextTick(function () {
            var obj = _this.tableTypeNode;
            yufp.clone(obj, _this.treeFormdata);
          });
        },
        /**
          * 树增加保存
          */
        addSaveFn: function () {
          var _this = this;
          var validate = false;
          var model = {};
          yufp.clone(_this.treeFormdata, model);
          _this.$refs.refTreeForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          model.typeLevel = parseInt(_this.tableTypeNode.typeLevel) + 1;
          delete model.typeId;
          model.createOrg = yufp.session.org.code;
          yufp.service.request({
            method: 'GET',
            url: _this.treeUrl,
            callback: function (code, message, response) {
              var tab = response.data;
              for (var i = 0; i < tab.length; i++) {
                if (tab[i].typeName == model.typeName) {
                  _this.$message({ message: '不能新增相同名称的类型!', type: 'warning' });
                  return false;
                }
              }
              yufp.service.request({
                method: 'POST',
                url: '/api/tabletype/',
                data: model,
                callback: function (code, message, response) {
                  if (code == 0) {
                    _this.$refs.tableTypeTree.remoteData();
                    _this.tableTypeNode = '';
                    _this.addSaveBtnShow = false;
                    _this.$message('新增成功');
                  }
                }
              });
            }
          });
        },
        /**
          * 树修改保存
          */
        modifySaveFn: function () {
          var _this = this;
          var validate = false;
          var model = {};
          yufp.clone(_this.treeFormdata, model);
          _this.$refs.refTreeForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          };
          model.updateOrg = yufp.session.org.code;
          yufp.service.request({
            method: 'GET',
            url: _this.treeUrl,
            callback: function (code, message, response) {
              var tab = response.data;
              for (var i = 0; i < tab.length; i++) {
                if (tab[i].typeName == model.typeName && model.typeName != _this.tableTypeNode.typeName) {
                  _this.$message({ message: '不能修改成相同名称的类型!', type: 'warning' });
                  return false;
                }
              }
              // 参数确定
              yufp.service.request({
                method: 'POST',
                url: backend.yuspClimpActyService + '/api/tabletype/update',
                data: model,
                callback: function (code, message, response) {
                  if (code == 0) {
                    _this.$refs.tableTypeTree.remoteData();
                    _this.tableTypeNode = '';
                    _this.modifySaveBtnShow = false;
                    _this.$message('修改成功');
                  }
                }
              });
            }
          });
        },
        /**
         * 表汉化新增
         */
        addTableFn: function () {
          if (this.tableTypeNode == '') {
            this.$message({ message: '请选择类别!', type: 'warning' });
            return false;
          }
          this.tableDialogVisible = true;
          this.tabcount = 0;
          this.$nextTick(function () {
            this.$refs.refForm.resetFields();
          });
        },
        /**
         * 交易类型选项发生改变时
         */
        changeTypeFn: function (type) {
          var _this = this;
          if (type != '1' && type != '2') {
            return false;
          }
          _this.dataParams.transType = type;
          _this.$refs.select.$refs.select.query();
        },
        /**
         * 交易名称选项发生改变时
         */
        changeNameFn: function (val) {
          var _this = this;
          val = _this.formdata.transactionCode;
          if (val == '') {
            this.$message({ message: '请选择交易名称', type: 'warning' });
            return;
          }
          if (_this.formdata.objectType == '' && _this.tabcount == 0) {
            this.$message({ message: '请先选择类型', type: 'warning' });
            this.formdata.transactionCode = '';
            return;
          }
          yufp.service.request({
            method: 'GET',
            url: backend.yuspClimpActyService + '/api/tableecname/tablelist',
            callback: function (code, message, response) {
              var tabList = response.data;
              var flag = true;
              if (tabList != null) {
                for (var i = 0; i < tabList.length; i++) {
                  if (val == tabList[i].transactionCode) {
                    _this.$message({ message: '该交易类型已经存在，请重新选择！', type: 'warning' });
                    _this.tabcount = 1;
                    _this.$refs.refForm.resetFields();
                    flag = false;
                    return;
                  }
                }
              };
              if (flag) {
                for (var j = 0; j < _this.$refs.refTable.tabledata.length; j++) {
                  if (val === _this.$refs.refTable.tabledata[j].transactionCode) {
                    _this.$message({ message: '该交易类型已经存在，请重新选择！', type: 'warning' });
                    _this.tabcount = 1;
                    _this.$refs.refForm.resetFields();
                    return;
                  }
                }
                var tabData = {};
                tabData.objectType = _this.$refs.refForm.formdata.objectType;
                tabData.typeId = _this.tableTypeNode.typeId;
                tabData.typeName = _this.tableTypeNode.typeName;
                tabData.transactionCode = val;
                for (var k = 0; k < _this.tranCodeOptions.length; k++) {
                  if (val == _this.tranCodeOptions[k].key) {
                    tabData.tableEName = _this.tranCodeOptions[k].tableEName;
                    tabData.tableCName = _this.tranCodeOptions[k].value;
                    tabData.transactionCode = _this.tranCodeOptions[k].key;
                    tabData.transactionName = _this.tranCodeOptions[k].value;
                  }
                }
                _this.tabcount = 1;
                // 新增行
                if (tabData.tableEName != undefined) {
                  _this.$refs.refTable.tabledata.push(tabData);
                  _this.tableDialogVisible = false;
                  _this.$message('新增成功');
                }
              }
            }
          });
        },
        /**
         * 表汉化双击事件
         */
        getFieldsFn: function (row, event) {
          if (row.tableId != undefined) {
            this.tableId = row.tableId;
            this.fieldBaseParams.tableId = row.tableId;
            this.$refs.refFieldTable.remoteData(this.fieldBaseParams);
          }
        },
        /**
         * 表汉化查看属性
         */
        queryFieldsFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].tableId != undefined) {
            this.tableId = selections[0].tableId;
            this.fieldBaseParams.tableId = selections[0].tableId;
            this.$refs.refFieldTable.remoteData(this.fieldBaseParams);
          }
        },
        checkUsed: function () {
        },
        loadFn: function () {
          var FieldTableData = this.$refs.refFieldTable.tabledata;
          for (var i = 0, len = FieldTableData.length; i < len; i++) {
            if (FieldTableData[i].isDisplay == '1') {
              FieldTableData[i].isDisplay = true;
            } else {
              FieldTableData[i].isDisplay = false;
            }
            this.disabledSelectFn(FieldTableData[i].fieldType);
          }
        },
        /**
         * 判断值为空
         * @return {}
         */
        isEmpty: function (value) {
          if (value !== '' && value !== null && value !== undefined) {
            return false;
          }
          return true;
        },
        /**
         * 表汉化保存
         */
        saveTableFn: function () {
          var _this = this;
          var dataInfo = _this.$refs.refTable.tabledata;
          _this.$refs.refTable.validate();
          for (var i = 0; i < dataInfo.length; i++) {
            dataInfo[i].createOrg = yufp.session.org.code;
            if (_this.isEmpty(dataInfo[i].tableCName)) {
              _this.$message({ message: '请检查表中文是否填写', type: 'warning' });
              return false;
            }
            if (_this.isEmpty(dataInfo[i].remark)) {
              _this.$message({ message: '请检查表描述是否填写', type: 'warning' });
              return false;
            }
          }
          yufp.service.request({
            method: 'POST',
            url: backend.yuspClimpActyService + '/api/tableecname/savetabandfield',
            data: JSON.stringify(dataInfo),
            callback: function (code, message, response) {
              _this.baseParams.typeId = _this.tableTypeNode.typeId;
              _this.$refs.refTable.remoteData(_this.baseParams);
              _this.fieldBaseParams.tableId = '1';
              _this.$refs.refFieldTable.remoteData(_this.fieldBaseParams);
              _this.$message({ message: '保存成功', type: 'success' });
            }
          });
        },
        /**
         * 删除
         */
        deleteTableFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].tableId == undefined) {
            for (var i = 0; i < _this.$refs.refTable.tabledata.length; i++) {
              if (_this.$refs.refTable.tabledata[i].transactionCode == selections[0].transactionCode) {
                _this.$refs.refTable.tabledata.splice(i, 1);
              }
            }
            return;
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.yuspClimpActyService + '/api/tableecname/deletetab',
                  data: {
                    tableId: selections[0].tableId,
                    orgCode: yufp.session.org.code
                  },
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _this.baseParams.typeId = _this.tableTypeNode.typeId;
                      _this.$refs.refTable.remoteData(_this.baseParams);
                      _this.fieldBaseParams.tableId = '1';
                      _this.$refs.refFieldTable.remoteData(_this.fieldBaseParams);
                      _this.$message('删除成功');
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
         * 字段保存
         */
        fieldSaveFn: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.yuspClimpActyService + '/api/tableecname/checkused',
            data: {
              tableId: _this.tableId
            },
            callback: function (code, message, response) {
              if (response.data > 0) {
                _this.$confirm('此规则属性已被 ' + response.data + '个活动引用, 是否继续需改?', '提示', {
                  type: 'warning',
                  center: true,
                  callback: function (action) {
                    if (action === 'confirm') {
                      _this.confirmField();
                    }
                  }
                });
              } else {
                _this.confirmField();
              }
            }
          });
        },
        confirmField: function () {
          var _this = this;
          var dataInfo = _this.$refs.refFieldTable.tabledata;
          _this.$refs.refFieldTable.validate();
          for (var i = 0; i < dataInfo.length; i++) {
            // 当字段选项的值为放大镜时清空下拉框内容
            if (dataInfo[i].fieldType == '7') {
              dataInfo[i].fname = '';
            } else if (dataInfo[i].fieldType == '4' || dataInfo[i].fieldType == '5' || dataInfo[i].fieldType == '6') {
              // 当字段选项的值为多选框、下拉框、单选框时清空放大镜内容
              dataInfo[i].magnifier = '';
            } else if (dataInfo[i].fieldType == '1' || dataInfo[i].fieldType == '2' || dataInfo[i].fieldType == '3') {
              // 当字段选项的值为文本框、数值框、日期框时清空放大镜内容
              dataInfo[i].magnifier = '';
              dataInfo[i].fname = '';
            }
            dataInfo[i].updateOrg = yufp.session.org.code;
            if (dataInfo[i].isDisplay == true) {
              dataInfo[i].isDisplay = '1';
            } else {
              dataInfo[i].isDisplay = '0';
            }
            if (_this.isEmpty(dataInfo[i].fieldCName)) {
              _this.$message({ message: '请检查字段中文是否填写', type: 'warning' });
              return false;
            }
            if (_this.isEmpty(dataInfo[i].fieldType)) {
              _this.$message({ message: '请检查字段类型是否填写', type: 'warning' });
              return false;
            }
          }
          yufp.service.request({
            method: 'POST',
            url: backend.yuspClimpActyService + '/api/fieldecname/savefield',
            data: JSON.stringify(dataInfo),
            callback: function (code, message, response) {
              _this.fieldBaseParams.tableId = _this.tableId;
              _this.$refs.refFieldTable.remoteData(_this.fieldBaseParams);
              _this.$message({ message: '保存成功', type: 'success' });
            }
          });
        },
        rowClickFn: function (row, event, column, index) {
          this.index = this.$refs.refFieldTable.tabledata.indexOf(row);
          this.fieldType = row.fieldType;
        },
        /**
         * 放大镜和字段选项是否开启禁用
         */
        disabledSelectFn: function (val) {
          var _this = this;
          // 当字段选项的值为放大镜时
          if (val == '7') {
            _this.isMagnifierDisabled = false;
            _this.isFnameDisabled = true;
          } else if (val == '4' || val == '5' || val == '6') {
            // 当字段选项的值为多选框、下拉框、单选框时
            _this.isMagnifierDisabled = true;
            _this.isFnameDisabled = false;
          } else {
            _this.isMagnifierDisabled = true;
            _this.isFnameDisabled = true;
          }
        },
        /**
         * 字段类型的值改变时
         */
        fieldTypeChangeFn: function (value) {
          this.disabledSelectFn(value);
          var rowData = this.$refs.refFieldTable.tabledata[this.index];
          if (rowData.fieldType != this.fieldType) {
            delete rowData['fname'];
            delete rowData['magnifier'];
          }
        }
      }
    });
  };
});