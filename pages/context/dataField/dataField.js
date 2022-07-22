/**
 * Created by liaoxd on 2017/12/17.
 */
define([
  './custom/widgets/js/yufpOrgTree.js'
], function (require, exports) {
  yufp.lookup.reg('PARAM_USE,FIELD_TYPE');


  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual filter model
    var vm = yufp.custom.vue({
      // TODO 请替换此id参数
      el: '#dataField_grid',
      // 以m_开头的参数为UI数据不作为业务数据，否则为业务数据
      data: function () {
        var me = this;

        var validateTrimEmpty = function (rule, value, callback) {
          var result = value.replace(/(^\s*)|(\s*$)/g, '');
          if (result.length == 0) {
            callback(new Error('必填不能为空'));
          } else {
            callback();
          }
        };
        return {
          serviceUrl: backend.adminService + '/api/frparampool/',
          idView: false,
          height: yufp.custom.viewSize().height - 140,
          // userId: yufp.session.userId,
          // 用户登录码
          userId: yufp.session.userCode,
          queryFields: [
            {placeholder: '字段编码', field: 'paramId', type: 'input'},
            {placeholder: '字段名称', field: 'paramName', type: 'input'},
            {placeholder: '字段用途', field: 'paramType', type: 'select', dataCode: 'PARAM_USE'}

          ],
          queryButtons: [
            {label: '查询',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  me.$refs.filterTable.remoteData(param);
                }
              }},
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
          ],


          tableColumns: [
            { label: '序号', type: 'index', width: 50 },
            { label: '字段编码', prop: 'paramId', width: 200 },
            { label: '字段名称',
              prop: 'paramName',
              width: 130,
              sortable: true,
              resizable: true,
              template: function () {
                return '<template scope="scope">\
                                  <a href="javascipt:void(0);" style="text-decoration:underline;" @click="_$event(\'custom-row-click\', scope)">{{ scope.row.paramName }}</a>\
                              </template>';
              }},
            { label: '字段用途', prop: 'paramType', width: 150, type: 'select', dataCode: 'PARAM_USE'},
            { label: '字段类型', prop: 'fieldType', width: 130, type: 'select', dataCode: 'FIELD_TYPE'},
            { label: '字段长度', prop: 'filedLength', width: 130 },
            { label: '默认值', prop: 'defaultValue', width: 130 },
            { label: '字段描述', prop: 'paramDesc', width: 150 },
            { label: '备注', prop: 'bak', width: 150 },
            { label: '最新变更用户', prop: 'loginNo', width: 130 },
            { label: '最新变更时间', prop: 'opTime', width: 130 }
          ],

          updateFields: [{
            columnCount: 2,
            fields: [
              { field: 'paramId', label: '字段编码', rules: [{mix: 2, message: '输入值过短', trigger: 'blur'}, {required: true, message: '必填项', trigger: 'blur'}, { validator: validateTrimEmpty, trigger: 'blur'}]},
              { field: 'paramName', label: '字段名称', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'paramType', label: '字段用途', rules: [{required: true, message: '必填项', trigger: 'blur'}], type: 'select', dataCode: 'PARAM_USE', hidden: true, value: '2'},
              { field: 'fieldType', label: '字段类型', rules: [{required: true, message: '必填项', trigger: 'blur'}], type: 'select', dataCode: 'FIELD_TYPE'},
              { field: 'filedLength', label: '字段长度', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'defaultValue', label: '默认值'},
              { field: 'paramDesc', label: '字段描述', placeholder: '200个字符以内', type: 'textarea', rules: [{max: 200, message: '输入值过长', trigger: 'blur'}]},
              { field: 'bak', label: '备注', placeholder: '200个字符以内', type: 'textarea', rules: [{max: 200, message: '输入值过长', trigger: 'blur'}]}
            ]
          }],

          detailFields: [{
            columnCount: 2,
            fields: [
              { field: 'paramId', label: '字段编码', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'paramName', label: '字段名称', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'paramType', label: '字段用途', rules: [{required: true, message: '必填项', trigger: 'blur'}], type: 'select', dataCode: 'PARAM_USE'},
              { field: 'fieldType', label: '字段类型', rules: [{required: true, message: '必填项', trigger: 'blur'}], type: 'select', dataCode: 'FIELD_TYPE'},
              { field: 'filedLength', label: '字段长度'},
              { field: 'defaultValue', label: '默认值'},
              { field: 'paramDesc', label: '字段描述', placeholder: '200个字符以内', type: 'textarea'},
              { field: 'bak', label: '备注', placeholder: '200个字符以内', type: 'textarea'},
              { field: 'loginNo', label: '最新变更用户', type: 'textarea'},
              { field: 'opTime', label: '最新变更时间', type: 'textarea'}

            ]
          }],


          updateButtons: [
            {label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                me.dialogVisible = false;
              }},
            {label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              op: 'submit',
              click: function (model, valid) {
                if (valid) {
                  me.createFilter(model);
                  // me.dialogVisible = false;
                  // me.$refs.filterTable.remoteData();
                }
              }},
            {label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              op: 'submit',
              click: function (model, valid) {
                if (valid) {
                  model.loginNo = me.userId;
                  // model.paramEnum='';
                  model.opOrg = '';
                  me.dataFliterEditFn(model);
                  me.dialogVisible = false;
                  me.$refs.filterTable.remoteData();
                }
              }}

          ],
          // 表单是否显示
          dialogVisible: false,
          // 详情表单
          detaildialogVisible: false,
          // 表单是否可用
          formDisabled: false,
          // 表单操作状态
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          // 表单多选
          selections: [],
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

            paging: {
              page: 1,
              pageSize: 10
            },
            // 系统参数模糊查询表头
            query: {
              paramId: '',
              paramName: ''
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

        detailFn: function (scope) {
          this.viewType = 'DETAIL';
          this.detaildialogVisible = true;
          this.$nextTick(function () {
            this.$refs.detailForm.formModel = scope.row;
          });
        },

        // 编辑按钮
        lookuptableEditFn: function () {
          if (this.$refs.filterTable.selections.length < 1) {
            vm.$message({ message: '请选择一条记录修改!' });
            return false;
          }
          if (this.$refs.filterTable.selections.length > 1) {
            vm.$message({ message: '只能选择一条记录修改!' });
            return false;
          }
          // alert("songer=="+this.$refs.filterTable.selections[0].paramId);
          this.viewType = 'EDIT';
          vm.dialogVisible = true;

          // 下一帧处理
          this.$nextTick(function () {
            yufp.extend(this.$refs.datafilterForm.formModel, this.$refs.filterTable.selections[0]);
            this.$refs.datafilterForm.switch('paramId', 'disabled', true);
          });
        },


        // 修改系统参数
        dataFliterEditFn: function (row) {
          this.filterGrid.currentRow = row;

          yufp.service.request({
            url: backend.adminService + '/api/frparampool/updates',
            method: 'post',
            data: this.filterGrid.currentRow,
            callback: function (code, message, response) {
              if (code == '0') {
                vm.$message({ message: '修改成功!' });
                vm.$refs.filterTable.remoteData();
              } else {
                vm.$message({ message: '修改失败!' });
              }
            }
          });
        },

        // 增加系统参数空行
        addFilterRecord: function () {
          this.dialogVisible = true;
          this.viewType = 'ADD';
          this.$nextTick(function () {
            this.$refs.datafilterForm.resetFields();
            this.$refs.datafilterForm.formModel.defaultValue = '0';
            this.$refs.datafilterForm.switch('paramId', 'disabled', false);
          });
        },

        // 保存新增系统参数
        createFilter: function (row) {
          var comitData = {};
          this.filterGrid.currentRow = row;
          // var reg=/^\w+$/;
          // var reg=/^[a-zA-Z]\w+$/;//以字母开头，只能包含字符、数字和下划线。
          var reg = /^[A-Za-z-_0-9]+[^-_]$/;
          if (this.filterGrid.currentRow.paramId.length < 2) {
            vm.$message({ message: '字段编码最小长度为2个字母!' });
            return false;
          }
          if (reg.test(this.filterGrid.currentRow.paramId)) {
            // alert("true");
          } else {
            // alert("字段编码需要以字母开头，内容只能包含字母、数字和下划线和横线，不能以下划线或横线结尾!");
            vm.$message({ message: '字段编码需要以字母开头，内容只能包含字母、数字和下划线和横线，不能以下划线或横线结尾!' });
            return false;
          }
          var reg1 = /[~@#\$%\^&\*]+/g;
          if (!reg1.test(this.filterGrid.currentRow.paramId)) {
            // alert("true");
          } else {
            // alert("字段编码不能包含特殊字符!");
            vm.$message({ message: '字段编码不能包含特殊字符!' });
            return false;
          }
          var reg2 = /^[\u0391-\uFFE5]+$/;
          if (reg2.test(this.filterGrid.currentRow.paramName)) {
            // alert("true");
          } else {
            // alert("字段名称只能为中文!");
            vm.$message({ message: '字段名称只能为中文!' });
            return false;
          }

          var datafilterForm = this.$refs.datafilterForm;
          // delete datafilterForm.formModel.paramId;
          this.$refs.datafilterForm.validate(function (valid) {
            if (valid) {
              yufp.service.request({
                method: 'GET',
                url: backend.adminService + '/api/frparampool/createcheckparamid',
                data: {
                  paramId: datafilterForm.formModel.paramId
                },

                callback: function (code, message, response) {
                  if (response > 0) {
                    vm.$message({message: '字段编码重复！', type: 'warning'});
                  } else {
                    yufp.extend(comitData, datafilterForm.formModel);
                    comitData.loginNo = vm.userId;
                    // comitData.paramEnum='';
                    comitData.opOrg = '';
                    comitData.pubFlag = '1';
                    yufp.service.request({
                      url: backend.adminService + '/api/frparampool/',
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
                }
              });
            }
          });
        },

        // 批量删除
        dataFiltermultDeleteFn: function () {
          var ids = '';
          var filterSelecttions = this.$refs.filterTable.selections;
          if (filterSelecttions.length > 0) {
            for (var i = 0; i < filterSelecttions.length; i++) {
              // 记录多选用于多删
              if (filterSelecttions.length === 1) {
                ids = filterSelecttions[i].paramId;
              } else {
                ids = ids + ',' + filterSelecttions[i].paramId;
              }
            }
          } else {
            vm.$message({ message: '请选择需要删除的系统参数!' });
            return false;
          }
          // 在交易字段配置或表字段配置已经使用该字段时，不允许删除
          yufp.service.request({
            url: backend.adminService + '/api/frruletabfieldinfo/selectbyfield/' + ids,
            method: 'post',
            data: vm.filterGrid.currentRow,
            callback: function (code, message, response) {
              if (response == '1') {
                vm.$message({ message: '字段使用中，请解除绑定后删除!' });
                // vm.$refs.filterTable.remoteData();
              } else {
                vm.$confirm('确认批量删除该系统参数?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(function () {
                  yufp.service.request({
                    url: backend.adminService + '/api/frparampool/deletes/' + ids,
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
            }
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