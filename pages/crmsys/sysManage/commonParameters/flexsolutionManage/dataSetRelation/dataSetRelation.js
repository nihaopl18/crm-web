/**
 * Created by zhangxs4 on 2019/01/14.
 */
define([
  './custom/widgets/js/yufpOrgTree.js'
], function (require, exports) {
  yufp.lookup.reg('DATA_TYPE,SS_COL_LEFT');
  var leftNameOptions = [];
  // 加载左表表名
  yufp.service.request({
    method: 'GET',
    url: backend.adminService + '/api/ocrmfcifqrelation/getDataObj',
    async: false,
    callback: function (code, message, response) {
      var tab = response.data;
      for (var i = 0; i < tab.length; i++) {
        var option = {};
        option.key = tab[i].id;
        option.value = tab[i].tableName;
        leftNameOptions.push(option);
      }
    }
  });

  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual filter model
    var vm = yufp.custom.vue({
      // TODO 请替换此id参数
      el: cite.el,
      // 以m_开头的参数为UI数据不作为业务数据，否则为业务数据
      data: function () {
        var me = this;
        return {
          serviceUrl: backend.adminService + '/api/ocrmfcifqrelation/list',
          idView: false,
          buttonsDisabled: false,
          dialogFormVisible: false,
          flowOptions: [],
          rightColOptions: [],
          leftColOptions: [],
          leftNameOptions: leftNameOptions,
          height: yufp.custom.viewSize().height - 140,
          itemTemp: {
            value: '',
            notes: '',
            id: ''
          },
          // userId: yufp.session.userId,
          // 用户登录码
          userId: yufp.session.userCode,
          queryFields: [
            { placeholder: '关联左表表名', field: 'JOIN_LEFT_NAME', type: 'input' },
            { placeholder: '关联右表表名', field: 'JOIN_RIGHT_NAME', type: 'input' }
          ],
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
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],


          tableColumns: [
            { label: '关联左表表名', prop: 'joinLeftName', width: 210 },
            { label: '左表备注', prop: 'joinLeftTableName', width: 210, type: 'select', dataCode: 'DATA_TYPE' },
            { label: '关联右表表名', prop: 'joinRightName', width: 220 },
            { label: '右表备注', prop: 'joinRightTableName', width: 220 },
            { label: '关联方式', prop: 'ssColLeft', width: 230, type: 'select', dataCode: 'SS_COL_LEFT' },
            { label: '左表别名', prop: 'joinLeftAlias', width: 230 },
            { label: '左表关联字段', prop: 'joinLeftColName', width: 230 },
            { label: '左表关联字段备注', prop: 'joinLeftColRemark', width: 230 },
            { label: '右表关联字段', prop: 'joinRightColName', width: 230 },
            { label: '右表关联字段备注', prop: 'joinRightColRemark', width: 230 }
          ],

          updateFields: [{
            columnCount: 2,
            fields: [
              {
                field: 'joinLeftName',
                label: '关联左表表名',
                rules: [{ required: true, message: '必填项' }],
                type: 'select',
                options: leftNameOptions,
                change: function (code, model, arry) {
                  var ltabName = '';
                  me.flowOptions = [];
                  me.leftColOptions = [];
                  for (var a = 0; a < this.options.length; a++) {
                    if (this.options[a].key == code) {
                      ltabName = this.options[a].value;
                    }
                  }
                  var param = {
                    condition: JSON.stringify({
                      joinLeftTab: code,
                      tabName: ltabName
                    })
                  };
                  // 查询右表表名
                  yufp.service.request({
                    method: 'GET',
                    url: backend.adminService + '/api/ocrmfcifqrelation/getDataObjs',
                    data: param,
                    callback: function (code, message, response) {
                      if (code == 0) {
                        var tab = response.data;
                        for (var i = 0; i < tab.length; i++) {
                          var option = {};
                          option.key = tab[i].value;
                          option.value = tab[i].tabname;
                          me.flowOptions.push(option);
                        }
                        me.$refs.datafilterForm.switch('joinRightName', 'options', me.flowOptions);
                        // 查询左表字段
                        yufp.service.request({
                          method: 'GET',
                          url: backend.adminService + '/api/ocrmfcifqrelation/getColDataObj',
                          data: param,
                          callback: function (code, message, response) {
                            var tabs = response.data;
                            for (var k = 0; k < tabs.length; k++) {
                              // 赋值给左表表名并置成灰色
                              model.joinLeftAlias = tabs[0].alias;
                              me.$refs.datafilterForm.switch('joinLeftAlias', 'disabled', true);
                              var option = {};
                              option.key = tabs[k].value;
                              option.value = tabs[k].name;
                              me.leftColOptions.push(option);
                            }
                            me.$refs.datafilterForm.switch('joinLeftColName', 'options', me.leftColOptions);
                          }
                        });
                      }
                    }
                  });
                }
              },
              {
                field: 'joinRightName',
                label: '关联右表表名',
                rules: [{ required: true, message: '必填项' }],
                type: 'select',
                change: function (code, data, arry) {
                  var tabName = '';
                  me.rightColOptions = [];
                  for (var k = 0; k < this.options.length; k++) {
                    if (this.options[k].key == code) {
                      tabName = this.options[k].value;
                    }
                  }
                  var param = {
                    condition: JSON.stringify({
                      joinRightTab: code,
                      tabName: tabName
                    })
                  };
                  yufp.service.request({
                    method: 'GET',
                    url: backend.adminService + '/api/ocrmfcifqrelation/getColDataObjs',
                    data: param,
                    callback: function (code, message, response) {
                      var tabss = response.data;
                      for (var j = 0; j < tabss.length; j++) {
                        var options = {};
                        options.key = tabss[j].value;
                        options.value = tabss[j].name;
                        me.rightColOptions.push(options);
                      }
                      me.$refs.datafilterForm.switch('joinRightColName', 'options', me.rightColOptions);
                    }
                  });
                }
              },
              { field: 'joinLeftColName', label: '左表关联字段', rules: [{ required: true, message: '必填项' }], type: 'select' },
              { field: 'joinRightColName', label: '右表关联字段', rules: [{ required: true, message: '必填项' }], type: 'select' },
              { field: 'joinLeftAlias', label: '左表别名', type: 'input'},
              { field: 'ssColLeft', label: '关联方式', type: 'select', dataCode: 'SS_COL_LEFT'}
            ]
          }],

          detailFields: [{
            columnCount: 2,
            fields: [
              { field: 'joinLeftName', label: '关联左表表名', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
              { field: 'joinRightName', label: '关联右表表名', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
              { field: 'joinLeftColName', label: '左表关联字段', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
              { field: 'joinRightColName', label: '右表关联字段', rules: [{ required: true, message: '必填项' }] },
              { field: 'joinLeftAlias', label: '左表别名', type: 'input'},
              { field: 'ssColLeft', label: '关联方式', type: 'select', dataCode: 'SS_COL_LEFT' }
            ]
          }],

          updateButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                me.dialogVisible = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              op: 'submit',
              click: function (model, valid) {
                if (valid) {
                  me.createFilter(model);
                }
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              op: 'submit',
              click: function (model, valid) {
                if (valid) {
                  me.dataFliterEditFn(model);
                  me.dialogVisible = false;
                  me.$refs.filterTable.remoteData();
                }
              }
            }
          ],
          dialogVisible: false,
          detaildialogVisible: false,
          formDisabled: false,
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
            subloading: true,
            // 系统参数模糊查询表头
            query: {
              name: ''
            }
          }
        };
      },
      mounted: function () {
      },
      methods: {
        rowClickFn: function (selection, row) {
          this.selections = selection;
          // 用于单个修改
          this.filterGrid.currentRow = row;
        },

        datasetdetailFn: function (scope) {
          if (this.$refs.filterTable.selections.length != 1) {
            vm.$message({ message: '请选择一条记录修改!' });
            return false;
          }
          this.viewType = 'DETAIL';
          this.detaildialogVisible = true;
          this.$nextTick(function () {
            yufp.extend(this.$refs.detailForm.formModel, this.$refs.filterTable.selections[0]);
          });
        },

        // 编辑按钮
        editdatasetFn: function () {
          if (this.$refs.filterTable.selections.length != 1) {
            vm.$message({ message: '请选择一条记录修改!' });
            return false;
          }

          this.viewType = 'EDIT';
          vm.dialogVisible = true;
          this.$nextTick(function () {
            yufp.extend(this.$refs.datafilterForm.formModel, this.$refs.filterTable.selections[0]);
            this.$refs.datafilterForm.formModel.joinLeftName = this.$refs.filterTable.selections[0].joinLeftTable;
            this.$refs.datafilterForm.formModel.joinRightName = this.$refs.filterTable.selections[0].joinRightTable;
          });
        },
        // 修改系统参数
        dataFliterEditFn: function (row) {
          var comitData = {};
          var datafilterForm = this.$refs.datafilterForm;
          yufp.extend(comitData, datafilterForm.formModel);
          comitData.joinLeftColName = comitData.joinLeftCol;
          comitData.joinRightColName = comitData.joinRightCol;
          this.$refs.datafilterForm.validate(function (valid) {
            if (valid) {
              yufp.service.request({
                url: backend.adminService + '/api/ocrmfcifqrelation/updatedata',
                method: 'post',
                data: comitData,
                callback: function (code, message, response) {
                  if (code == '0') {
                    vm.dialogVisible = false;
                    vm.$message({ message: '保存成功!' });
                    vm.$refs.filterTable.remoteData();
                  } else {
                    vm.$message({ message: '保存失败!' });
                  }
                }
              });
            }
          });
        },

        // 新增
        adddatasetFn: function () {
          this.dialogVisible = true;
          this.viewType = 'ADD';
          this.$nextTick(function () {
            this.$refs.datafilterForm.resetFields();
          });
        },

        // 保存新增系统参数
        createFilter: function (row) {
          var comitData = {};
          this.filterGrid.currentRow = row;
          var datafilterForm = this.$refs.datafilterForm;
          yufp.extend(comitData, datafilterForm.formModel);
          this.$refs.datafilterForm.validate(function (valid) {
            if (valid) {
              yufp.service.request({
                url: backend.adminService + '/api/ocrmfcifqrelation/addData',
                method: 'post',
                data: comitData,
                callback: function (code, message, response) {
                  if (code == '0') {
                    vm.dialogVisible = false;
                    vm.$message({ message: '保存成功!' });
                    vm.$refs.filterTable.remoteData();
                  } else {
                    vm.$message({ message: '保存失败!' });
                  }
                }
              });
            }
          });
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
              url: backend.adminService + '/api/ocrmfcifqrelation/deletes/' + ids,
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
        }

      },
      filters: {

      },

      watch: {
        viewType: function (value) {
          if (value == 'ADD') {
            this.updateButtons[1].hidden = false;
            this.updateButtons[2].hidden = true;
            this.detaildialogVisible = false;
          } else if (value == 'EDIT') {
            this.updateButtons[1].hidden = true;
            this.updateButtons[2].hidden = false;
            this.detaildialogVisible = false;
          } else if (value == 'DETAIL') {
            this.detaildialogVisible = true;
          }
        }
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