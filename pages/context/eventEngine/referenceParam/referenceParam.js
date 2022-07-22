/**
 * Created by chenlin 2018-08-23
 * 应用参数管理
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('PARAM_TYPE', 'FIELD_OPTION', 'FIELD_TYPE', 'FIELD_OPTIONS');
    var mappingOptions = [];
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          mappingOptions: mappingOptions,
          paramUrl: backend.adminService + '/api/cmfrcruleparam/list',
          queryFields: [
            { placeholder: '参数编码', field: 'paramCode', type: 'input' },
            { placeholder: '参数名称', field: 'paramName', type: 'input' },
            { placeholder: '业务类型', field: 'paramType', type: 'select', dataCode: 'PARAM_TYPE' },
            { placeholder: '属性类别', field: 'paramProperty', type: 'select', dataCode: 'FIELD_TYPE' }
          ],
          queryButtons: [
            { label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _self.$refs.reftable.remoteData(param);
                }
              } },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          tableColumns: [
            { label: '序号', type: 'index', width: 50 },
            { label: '参数编码', prop: 'paramCode', width: 200 },
            { label: '参数名称', prop: 'paramName'},
            // { label: '业务类型', prop: 'paramType', width: 150, dataCode: 'PARAM_TYPE' },
            { label: '类别映射', prop: 'paramMapping', width: 200, dataCode: 'PARAM_MAPPING'},
            { label: '属性类别', prop: 'paramProperty', width: 150, dataCode: 'FIELD_TYPE'}
          ],
          updateFields: [{
            columnCount: 2,
            fields: [
              { field: 'paramCode',
                label: '参数编码',
                rules: [{required: true, message: '必填项', trigger: 'blur'},
                  {max: 33, message: '输入值过长', trigger: 'blur' }]},
              { field: 'paramName',
                label: '参数名称',
                rules: [{required: true, message: '必填项', trigger: 'blur'},
                  {max: 33, message: '输入值过长', trigger: 'blur' }]},
              // { field: 'paramType', label: '业务类型', type: 'select', dataCode: 'PARAM_TYPE' },
              { field: 'paramProperty',
                label: '属性类别',
                type: 'select',
                dataCode: 'FIELD_TYPE',
                change: function (value) {
                  if (value == '7') {
                    _self.$refs.reform.switch('paramMapping', 'hidden', true);
                    _self.$refs.reform.switch('magnifier', 'hidden', false);
                    _self.$refs.reform.formModel.paramMapping = '';
                    _self.$refs.reform.formModel.magnifier = '';
                    _self.updateFields[0].fields[4].rules[0].required = false;// 设置必输
                    _self.updateFields[0].fields[5].rules[0].required = true;// 设置必输
                  } else if (value == '4' || value == '5' || value == '6') {
                    _self.$refs.reform.switch('paramMapping', 'hidden', false);
                    _self.$refs.reform.switch('magnifier', 'hidden', true);
                    _self.$refs.reform.formModel.paramMapping = '';
                    _self.$refs.reform.formModel.magnifier = '';
                    _self.updateFields[0].fields[4].rules[0].required = true;// 设置必输
                    _self.updateFields[0].fields[5].rules[0].required = false;// 设置必输
                  } else {
                    _self.$refs.reform.switch('paramMapping', 'hidden', true);
                    _self.$refs.reform.switch('magnifier', 'hidden', true);
                    _self.$refs.reform.formModel.paramMapping = '';
                    _self.$refs.reform.formModel.magnifier = '';
                    _self.updateFields[0].fields[4].rules[0].required = false;// 设置必输
                    _self.updateFields[0].fields[5].rules[0].required = false;// 设置必输
                  }
                },
                rules: [{required: true, message: '必填项', trigger: 'blur'},
                  {max: 33, message: '输入值过长', trigger: 'blur' }]},
              { field: 'paramMapping',
                label: '类别映射',
                type: 'select',
                dataCode: 'PARAM_MAPPING',
                hidden: true,
                filterable: true,
                rules: [{required: false, message: '必填项', trigger: 'blur'}]},
              { field: 'magnifier',
                label: '放大镜',
                type: 'select',
                dataCode: 'FIELD_OPTIONS',
                hidden: true,
                rules: [{required: false, message: '必填项', trigger: 'blur'}]},
              { field: 'statementName', label: 'SQL名称' }
            ]
          }, {
            columnCount: 1,
            fields: [
              { field: 'statement', label: 'SQL语句', type: 'textarea', rows: 3, rules: [{required: true, message: '必填项', trigger: 'blur'}]}
            ]
          }],
          updateButtons: [
            { label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisible = false;
              } },
            { label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                _self.saveCreateFn();
              } },
            { label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                // 修改方法保存
                var validate = false;
                _self.$refs.reform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/cmfrcruleparam/update',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _self.$refs.reftable.remoteData();
                      _self.$message('操作成功');
                      _self.dialogVisible = false;
                    }
                  }
                });
              } }
          ],
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        };
      },
      mounted: function () {
        yufp.service.request({
          method: 'GET',
          url: backend.adminService + '/api/cimpffqdbcol/qrylookupcode',
          callback: function (code, message, response) {
            var lookupcode = response.data;
            for (var i = 0; i < lookupcode.length; i++) {
              var option = {};
              option.key = lookupcode[i].lookupCode;
              option.value = lookupcode[i].lookupName;
              mappingOptions.push(option);
            }
            yufp.lookup.lookupMgr['PARAM_MAPPING'] = mappingOptions;
          }
        });
      },
      methods: {
        /**
          * @param viewType 表单类型
          * @param editable 可编辑,默认false
          */
        switchStatus: function (viewType, editable) {
          var _self = this;
          _self.viewType = viewType;
          // _self.updateButtons[0].hidden = !editable;
          if (viewType == 'ADD') {
            _self.updateButtons[1].hidden = !editable;
            _self.updateButtons[2].hidden = editable;
          } else if (viewType == 'EDIT') {
            _self.updateButtons[1].hidden = editable;
            _self.updateButtons[2].hidden = !editable;
          } else if (viewType == 'DETAIL') {
            _self.updateButtons[1].hidden = !editable;
            _self.updateButtons[2].hidden = !editable;
          }
          _self.formDisabled = !editable;
          _self.dialogVisible = true;
        },
        // 新增页面初始化
        addFn: function () {
          var _self = this;
          _self.switchStatus('ADD', true);
          _self.$nextTick(function () {
            _self.$refs.reform.resetFields();
          });
        },
        // 修改页面初始化
        modifyFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            this.$refs.reform.resetFields();
            var obj = this.$refs.reftable.selections[0];
            yufp.extend(this.$refs.reform.formModel, obj);
          });
        },
        // 详情页面初始化
        infoFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('DETAIL', false);
          this.$nextTick(function () {
            this.$refs.reform.resetFields();
            yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
          });
        },
        // 新增保存方法
        saveCreateFn: function () {
          var fields = this.$refs.reform;
          var vue = this;
          delete fields.formModel.id;
          this.$refs.reform.validate(function (valid) {
            if (valid) {
              yufp.service.request({
                method: 'POST',
                url: backend.adminService + '/api/cmfrcruleparam/',
                data: fields.formModel,
                callback: function (code, message, response) {
                  vue.dialogVisible = false;
                  vue.$refs.reftable.remoteData();
                  vue.$message({message: '数据保存成功！'});
                }
              });
            }
          });
        },
        // 删除方法
        deleteFn: function () {
          var _self = this;
          var selections = _self.$refs.reftable.selections;
          if (selections.length < 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/cmfrcruleparam/deletebatch',
            data: {
              id: arr.join(',')
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _self.$refs.reftable.remoteData();
                _self.$message('操作成功');
              }
            }
          });
        }/* ,
          exportFn: function () {
            yufp.util.exportExcelByTable({
              fileName: '下载文件',
              importType: 'service', // page当前页 selected 选中的数据  service 后端数据
              ref: this.$refs.reftable,
              url: '/refParam/example/list',
              param: {}
            });
          }*/
      }
    });
  };
});