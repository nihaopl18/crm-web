/**
 * 作者：chenlin2@yusys.com.cn
 * 时间：2018-08-24
 * 描述：规则属性配置
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    var tableTypeOptions = [];
    var fieldTypeOptions = [];
    var mappingOptions = [];
    var tranCodeOptions = [];
    var magnifierOptions = [];
    // 自定义字典（目标表名）
    yufp.service.request({
      method: 'GET',
      url: backend.adminService + '/api/cmfrcruleproperty/searchtranscode',
      callback: function (code, message, response) {
        var tab = response.data;
        for (var i = 0; i < tab.length; i++) {
          var option = {};
          option.key = tab[i].key;
          option.value = tab[i].value;
          option.tableEName = tab[i].tableEName;
          tranCodeOptions.push(option);
        }
      }
    });
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          transName: '',
          tranCodeOptions: tranCodeOptions,
          tableTypeOptions: tableTypeOptions,
          fieldTypeOptions: fieldTypeOptions,
          mappingOptions: mappingOptions,
          magnifierOptions: magnifierOptions,
          tabcount: 0,
          treeUrl: backend.adminService + '/api/cmfrcruleproperty/list', // 表类别Url /ruleProperty/example/tree,
          tableGrid: {// 表名列表
            data: null,
            total: null,
            loading: false,
            multipleSelection: [],
            paging: {
              page: 1,
              pageSize: 10
            }
          },
          filedGrid: {// 表名列表
            data: null,
            total: null,
            loading: false,
            multipleSelection: [],
            paging: {
              page: 1,
              pageSize: 10
            }
          },
          updateFields: [{
            columnCount: 1,
            fields: [
              { field: 'typeName',
                label: '类别名称',
                rules: [{required: true, message: '必填项', trigger: 'blur'},
                  {max: 20, message: '输入值过长', trigger: 'blur' }]},
              { field: 'typeParentId', label: '父类别ID', hidden: true },
              { field: 'typeParentName', label: '父类别' },
              { field: 'typeSeq', label: '类别序号' }
            ]
          }],
          updateButtons: [
            { label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: true,
              click: function (model) {
                var validate = false;
                _self.$refs.reform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                model.typeLevel = parseInt(_self.tableTypeNode.typeLevel) + 1;
                delete model.typeId;
                yufp.service.request({
                  method: 'GET',
                  url: backend.adminService + '/api/cmfrcruleproperty/list',
                  callback: function (code, message, response) {
                    var tab = response.data;
                    for (var i = 0; i < tab.length; i++) {
                      if (tab[i].typeName == model.typeName) {
                        _self.$message({message: '不能新增相同名称的类型!', type: 'warning'});
                        return false;
                      }
                    }
                    yufp.service.request({
                      method: 'POST',
                      url: backend.adminService + '/api/cmfrcruleproperty/',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0) {
                          _self.$refs.tableTypeTree.remoteData();
                          _self.tableTypeNode = '';
                          _self.$message('操作成功');
                          _self.dialogVisible = false;
                        }
                      }
                    });
                  }
                });
              } },
            { label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: true,
              click: function (model) {
                var validate = false;
                _self.$refs.reform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                yufp.service.request({
                  method: 'GET',
                  url: backend.adminService + '/api/cmfrcruleproperty/list',
                  callback: function (code, message, response) {
                    var tab = response.data;
                    for (var i = 0; i < tab.length; i++) {
                      if (tab[i].typeName == model.typeName) {
                        _self.$message({message: '不能修改成相同名称的类型!', type: 'warning'});
                        return false;
                      }
                    }
                    yufp.service.request({
                      method: 'POST',
                      url: backend.adminService + '/api/cmfrcruleproperty/update',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0) {
                          _self.$refs.tableTypeTree.remoteData();
                          _self.tableTypeNode = '';
                          _self.$message('操作成功');
                          _self.dialogVisible = false;
                        }
                      }
                    });
                  }
                });
              } }
          ],
          height: yufp.custom.viewSize().height - 10,
          tableTypeNode: '',
          formDisabled: true,
          viewTitle: '选择交易类型',
          tableDialogVisible: false,
          tabRow: '',
          form: {},
          transactionCode: '',
          objectType: '',
          objectName: ''
        };
      },
      mounted: function () {
        // yufp.lookup.reg('FIELD_OPTION', 'FIELD_TYPE', 'TABLE_TYPE');
        var me = this;
        // yufp.lookup.bind('FIELD_OPTION', function (data) {
        //   me.mappingOptions = data;
        // });
        yufp.lookup.bind('FIELD_TYPE', function (data) {
          me.fieldTypeOptions = data;
        });
        yufp.lookup.bind('TABLE_TYPE', function (data) {
          me.tableTypeOptions = data;
        });
        yufp.lookup.bind('FIELD_OPTIONS', function (data) {
          me.magnifierOptions = data;
        });
        yufp.service.request({
          method: 'GET',
          url: backend.adminService + '/api/cimpffqdbcol/qrylookupcode',
          callback: function (code, message, response) {
            var lookupcode = response.data;
            for (var i = 0; i < lookupcode.length; i++) {
              var option = {};
              option.key = lookupcode[i].lookupCode;
              option.value = lookupcode[i].lookupName;
              me.mappingOptions.push(option);
            }
          }
        });
      },
      methods: {
        showHidden: function (index, row) {
          var _this = this;
          _this.filedGrid.data = _this.filedGrid.data.map(function (v) {
            if (v.isDisplay == '1') {
              v.isDisplay = true;
            } else if (v.isDisplay == '0') {
              v.isDisplay = false;
            }
            return v;
          });
        },
        fieldTypeChange: function (index, row) {
          // 行对象添加响应式属性
          var _this = this;
          _this.filedGrid.data = _this.filedGrid.data.map(function (v) {
            if (v.isDisplay == '1') {
              v.isDisplay = true;
            } else if (v.isDisplay == '0') {
              v.isDisplay = false;
            }
            if (row.fieldType == '7') {
              row.edit = false;
              row.magnifierEdit = true;
            } else if (row.fieldType == '4' || row.fieldType == '5' || row.fieldType == '6') {
              row.edit = true;
              row.magnifierEdit = false;
            } else {
              row.edit = false;
              row.magnifierEdit = false;
            }
            row.fname = '';
            row.magnifier = '';
            return v;
          });
        },
        handleEdit: function (index, row) {
          // 遍历数组改变editeFlag
          this.tableGrid.data[index].edit = true;
        },
        // handleMouseEnter: function (row, column, cell, event) {
        //   if (row.fieldType == '1' || row.fieldType == '2' || row.fieldType == '3') {
        //     row.magnifierEdit = false;
        //     row.edit = false;
        //   } else if (row.fieldType == '4' || row.fieldType == '5' || row.fieldType == '6') {
        //     row.magnifierEdit = false;
        //     row.edit = true;
        //   } else {
        //     row.edit = false;
        //     row.magnifierEdit = true;
        //   }
        //   // row.edit = true;
        // },
        // 新增表类别
        addTableType: function () {
          if (this.tableTypeNode == '') {
            this.$message({message: '请选择父类别!', type: 'warning'});
            return false;
          }
          if (this.tableTypeNode.typeLevel == '4') {
            this.$message({message: '只能添加三级表类别目录!', type: 'warning'});
            return false;
          }
          this.updateButtons[0].hidden = false;
          this.updateButtons[1].hidden = true;
          this.formDisabled = false;
          this.$nextTick(function () {
            this.$refs.reform.resetFields();
            this.$refs.reform.formModel.typeParentName = this.tableTypeNode.typeName;
            this.$refs.reform.formModel.typeParentId = this.tableTypeNode.typeId;
            this.$refs.reform.switch('typeParentName', 'disabled', true);
          });
        },
        // 修改表类别
        updateTableType: function () {
          if (this.tableTypeNode == '') {
            this.$message({message: '请选择要修改的类别!', type: 'warning'});
            return false;
          }
          this.updateButtons[0].hidden = true;
          this.updateButtons[1].hidden = false;
          this.formDisabled = false;
          this.$nextTick(function () {
            var obj = this.tableTypeNode;
            yufp.extend(this.$refs.reform.formModel, obj);
            this.$refs.reform.switch('typeParentName', 'disabled', true);
          });
        },
        // 删除表类别
        deleteTableType: function () {
          if (this.tableTypeNode == '') {
            this.$message({message: '请选择要删除的类别!', type: 'warning'});
            return false;
          }
          if (this.tableTypeNode.typeParentId == 'P000') {
            this.$message({message: '类别根目录不能删除!', type: 'warning'});
            return false;
          }
          var _self = this;
          var arr = [];
          this.getArray(this.tableTypeNode, arr);
          _self.$confirm('确认要删除该类别吗?删除该类别将连同子类别以及关联的表名列表及字段列表一起删除！, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/cmfrcruleproperty/geteventbytype',
              data: {
                typeId: _self.tableTypeNode.typeId
              },
              callback: function (code, message, response) {
                var tab = response.data;
                if (tab.length > 0) {
                  _self.$message({ message: '该类型下的交易有使用，不能删除!', type: 'warning'});
                } else {
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cmfrcruleproperty/deletebatch',
                    data: {
                      id: arr.join(',')
                    },
                    callback: function (code, message, response) {
                      if (code == 0) {
                        _self.$refs.tableTypeTree.remoteData();
                        _self.$message('操作成功');
                        this.tableTypeNode = '';
                      }
                    }
                  });
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
        // 新增表
        addTableFn: function () {
          if (this.tableTypeNode == '') {
            this.$message({message: '请选择类别!', type: 'warning'});
            return false;
          }
          this.tabcount = 0;
          this.tableDialogVisible = true;
        },
        // 删除表
        deleteTabFn: function (index, row) {
          var _self = this;
          if (row.tableId == undefined) {
            this.tableGrid.data.splice(index, 1);
          } else {
            _self.$confirm('确认要删除该类别吗?删除表名列表及字段列表一起删除！, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(function () {
              yufp.service.request({
                method: 'GET',
                url: backend.adminService + '/api/cmfrceventinfo/geteventbytrans',
                data: {
                  transCode: row.transactionCode
                },
                callback: function (code, message, response) {
                  var tab = response.data;
                  if (tab.length > 0) {
                    _self.$message({ message: '该交易类型已被使用，不能删除!', type: 'warning'});
                  } else {
                    yufp.service.request({
                      method: 'POST',
                      url: backend.adminService + '/api/cmfrcruleproperty/deletetab',
                      data: {
                        id: row.tableId
                      },
                      callback: function (code, message, response) {
                        if (code == 0) {
                          _self.queryConfGridFn(_self.tableTypeNode.typeId);
                          _self.queryfieldGridFn('123');
                          _self.$message('操作成功');
                        }
                      }
                    });
                  }
                }
              });
            });
          }
        },
        // 保存tab
        saveTabFn: function () {
          var vue = this;
          var dataInfo = this.tableGrid.data;
          var reg2 = /^[\u0391-\uFFE5]+$/;
          for (var i = 0; i < dataInfo.length; i++) {
            if (reg2.test(dataInfo[i].tableCName)) {
              if (dataInfo[i].tableCName.length > 50) {
                vue.$message({ message: '表中文名过长!' });
                return false;
              }
            } else {
              vue.$message({ message: '表中文名只能为中文且不为空!' });
              return false;
            }
            if (dataInfo[i].remark.length > 100) {
              vue.$message({ message: '描述过长!' });
              return false;
            }
          }
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/cmfrcruleproperty/savetabandfield',
            data: JSON.stringify(dataInfo),
            callback: function (code, message, response) {
              vue.queryConfGridFn(vue.tableTypeNode.typeId);
              vue.$message({message: '操作保存成功', type: 'success'});
            }
          });
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cmfrcruleproperty/searchtranscode',
            callback: function (code, message, response) {
              var tab = response.data;
              vue.tranCodeOptions = [];
              for (var i = 0; i < tab.length; i++) {
                var option = {};
                option.key = tab[i].key;
                option.value = tab[i].value;
                option.tableEName = tab[i].tableEName;
                vue.tranCodeOptions.push(option);
              }
            }
          });
        },
        // 保存表字段
        saveFieldFn: function () {
          var vue = this;
          var dataInfo = this.filedGrid.data;
          for (var i = 0; i < dataInfo.length; i++) {
            if (dataInfo[i].fieldCName == '') {
              vue.$message({message: '请填写字段中文名', type: 'warning'});
              return;
            }
            if (dataInfo[i].isDisplay == true) {
              dataInfo[i].isDisplay = '1';
            } else {
              dataInfo[i].isDisplay = '0';
            }
          }
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/cmfrcruleproperty/savefield',
            data: JSON.stringify(dataInfo),
            callback: function (code, message, response) {
              vue.queryfieldGridFn(vue.tabRow.tableId);
              vue.$message({message: '操作保存成功', type: 'success'});
            }
          });
        },
        changeType: function (type) {
          var _this = this;
          if (type != '1' && type != '2') {
            return false;
          }
          this.objectType = type;
          for (var i = 0; i < _this.tableTypeOptions.length; i++) {
            if (type == _this.tableTypeOptions[i].key) {
              this.objectName = _this.tableTypeOptions[i].value;
            }
          }
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cmfrcruleproperty/searchtranscode',
            data: {
              transType: type
            },
            callback: function (code, message, response) {
              var tab = response.data;
              _this.tranCodeOptions = [];
              for (var i = 0; i < tab.length; i++) {
                var option = {};
                option.key = tab[i].key;
                option.value = tab[i].value;
                option.tableEName = tab[i].tableEName;
                _this.tranCodeOptions.push(option);
              }
            }
          });
        },
        // 选择表视图
        selectTab: function (event) {
          var _this = this;
          if (this.objectType == '' && _this.tabcount == 0) {
            this.$message({ message: '请先选择类型', type: 'warning' });
            this.transactionCode = '';
            return;
          }
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cmfrcruleproperty/getalltab',
            callback: function (code, message, response) {
              var tabList = response.data;
              var flag = true;
              if (tabList != null) {
                for (var i = 0; i < tabList.length; i++) {
                  if (event == tabList[i].transactionCode) {
                    _this.$message({ message: '该交易类型已经存在，请重新选择！', type: 'warning' });
                    flag = false;
                    return;
                  }
                }
                if (flag) {
                  for (var i = 0; i < _this.tableGrid.data.length; i++) {
                    if (event == _this.tableGrid.data[i].transactionCode) {
                      _this.$message({ message: '该交易类型已经存在，请重新选择！', type: 'warning' });
                      return;
                    }
                  }
                  var tabData = {};
                  tabData.objectType = _this.objectType;
                  tabData.objectName = _this.objectName;
                  tabData.typeId = _this.tableTypeNode.typeId;
                  tabData.typeName = _this.tableTypeNode.typeName;
                  tabData.transactionCode = event;
                  for (var i = 0; i < tranCodeOptions.length; i++) {
                    if (event == tranCodeOptions[i].key) {
                      tabData.tableEName = tranCodeOptions[i].tableEName;
                      tabData.tableCName = tranCodeOptions[i].value;
                      tabData.transactionName = tranCodeOptions[i].value;
                    }
                  }
                  _this.objectType = '';
                  _this.transactionCode = '';
                  _this.tabcount = 1;
                  // 新增行
                  if (tabData.tableEName != undefined) {
                    _this.tableGrid.data.push(tabData);
                    _this.tableDialogVisible = false;
                  }
                }
              }
            }
          });
        },
        // 关闭表视图选择
        closeTab: function () {
          this.tableDialogVisible = false;
        },
        // 表名列表
        queryConfGridFn: function (typeId) {
          var me = this;
          this.tableGrid.loading = true;
          var param = {
            page: this.tableGrid.paging.page,
            size: this.tableGrid.paging.pageSize,
            condition: JSON.stringify({
              typeId: typeId
            })
          };
          // 发起请求
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cmfrcruleproperty/tablelist', // '/ruleProperty/example/list',
            data: param,
            callback: function (code, message, response) {
              me.tableGrid.data = response.data;
              for (var i = 0; i < me.tableGrid.data.length; i++) {
                for (var j = 0; j < me.tranCodeOptions.length; j++) {
                  if (me.tableGrid.data[i].transactionCode == me.tranCodeOptions[j].key) {
                    me.tableGrid.data[i].transactionName = me.tranCodeOptions[j].value;
                  }
                }
                for (var k = 0; k < me.tableTypeOptions.length; k++) {
                  if (me.tableGrid.data[i].objectType == me.tableTypeOptions[k].key) {
                    me.tableGrid.data[i].objectName = me.tableTypeOptions[k].value;
                  }
                }
              }
              me.tableGrid.total = response.total;
              me.tableGrid.loading = false;
              // 行对象添加响应式属性
              me.tableGrid.data = me.tableGrid.data.map(function (v) {
                me.$set(v, 'edit', false);
                return v;
              });
            }
          });
        },
        // 表汉化双击事件
        getFieldsFn: function (row, event) {
          this.transName = row.transactionName;
          if (row.tableId != undefined) {
            this.queryfieldGridFn(row.tableId);
          }
        },
        // 表汉化行单击事件
        rowClickFn: function (row, event, column) {
          var _this = this;
          this.tabRow = row;
          // 行对象添加响应式属性
          this.tableGrid.data = this.tableGrid.data.map(function (v) {
            _this.$set(v, 'edit', false);
            if (_this.tabRow.transactionCode == v.transactionCode) {
              v.edit = true;
            }
            return v;
          });
        },
        // 查看属性
        queryFieldsFn: function () {
          if (this.tabRow.tableId == undefined) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.transName = this.tabRow.transactionName;
          this.queryfieldGridFn(this.tabRow.tableId);
        },
        // 字段列表（两次查询才能反显）
        queryfieldGridFn: function (tableId) {
          var me = this;
          this.filedGrid.loading = true;
          var param = {
            page: this.filedGrid.paging.page,
            size: this.filedGrid.paging.pageSize,
            condition: JSON.stringify({
              tableId: tableId
            })
          };
          // 发起请求
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cmfrcruleproperty/fieldlist', // '/ruleProperty/example/fieldList',
            data: param,
            callback: function (code, message, response) {
              me.filedGrid.data = response.data;
              me.filedGrid.total = response.total;
              me.filedGrid.loading = false;
              // 行对象添加响应式属性
              me.filedGrid.data = me.filedGrid.data.map(function (v) {
                me.$set(v, 'edit', false);
                if (v.isDisplay == '1') {
                  v.isDisplay = true;
                } else if (v.isDisplay == '0') {
                  v.isDisplay = false;
                }
                if (v.fieldType == '1' || v.fieldType == '2' || v.fieldType == '3') {
                  v.magnifierEdit = false;
                  v.edit = false;
                } else if (v.fieldType == '4' || v.fieldType == '5' || v.fieldType == '6') {
                  v.magnifierEdit = false;
                  v.edit = true;
                } else {
                  v.edit = false;
                  v.magnifierEdit = true;
                }
                return v;
              });
            }
          });
        },
        // 节点点击方法
        nodeClickFn: function (node) {
          this.updateButtons[0].hidden = true;
          this.updateButtons[1].hidden = true;
          this.$nextTick(function () {
            var obj = node;
            this.tableTypeNode = node;
            yufp.extend(this.$refs.reform.formModel, obj);
          });
          var typeId = node.typeId;
          if (node.typeParentId == 'P000') {
            typeId = node.typeParentId;
          }
          this.queryConfGridFn(typeId);
        }
      }
    });
  };
});