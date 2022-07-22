/**
 * @created by Administrator on 2018/06/21.
 * @description 普通查询模板
 */
yufp.require.require([
  './libs/jsPlumb/css/jsPlumbToolkit-defaults.css',
  './libs/jsPlumb/css/jsPlumbToolkit-demo.css',
  './libs/swiper/idangerous.swiper.css'
]);
define([
  'jquery',
  './libs/jsPlumb/js/jsPlumb.js',
  './custom/widgets/js/YufpDemoSelector.js',
  './libs/swiper/idangerous.swiper.min.js',
  './custom/widgets/js/yufpFlowDesign.js'// 流程组件
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('STATE,ACTIVITY_TYPE,CUST_SX');
    yufp.custom.vue({
      el: '#flowTemp',
      data: function () {
        var _self = this;
        var checkName = function (rule, value, callback) {
          var isExist = false;
          var param = {
            condition: JSON.stringify({
              custGroupName: value
            })
          };
          yufp.service.request({
            url: backend.adminService + '/api/cimpcmmktplbasicinfo/checkName',
            method: 'get',
            data: param,
            async: false,
            callback: function (code, message, response) {

              if (response.data == 1) {
                isExist = true;
              }
              if (isExist) {
                callback(new Error('模板名已经存在!'));
              } else {
                callback();
              }
            }
          });
        };
        var checkUpName = function (rule, value, callback) {
          var isExist = true;
          var param = {
            condition: JSON.stringify({
              tempName: value,
              tempId: _self.$refs.reftable.selections[0].tempId
            })
          };
          yufp.service.request({
            url: backend.adminService + '/api/cimpcmmktplbasicinfo/checkUpName',
            method: 'get',
            data: param,
            async: false,
            callback: function (code, message, response) {
              if (response.data != 1) {
                isExist = false;
              }
              if (isExist) {
                callback();
              } else {
                callback(new Error('用户名已经存在!'));
              }
            }
          });
        };
        return {
          activeNames1: ['1'],
          activeClose: false,
          flowId: '',
          panelType: '',
          showornot: false,
          editableornot: false,
          baseParams: {
            condition: {
              tempId: '',
              tempName: '',
              tempSts: ''
            }
          },
          /** 查询字段 */
          queryFields: [
            { placeholder: '模板编号', field: 'tempId', type: 'input' },
            { placeholder: '模板名称', field: 'tempName', type: 'input' },
            // { placeholder: '状态', field: 'tempSts', type: 'select', dataCode: 'STATE' }
          ],
          /** 搜索按钮 */
          queryButtons: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _self.$refs.reftable.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          /** 表格栏位 */
          tableColumns: [
            { label: '模板编号', prop: 'tempId', width: '100', resizable: true },
            { label: '模板名称', prop: 'tempName', width: '200', resizable: true },
            // { label: '流程类型', prop: 'tempType', width: '100', resizable: true, dataCode: 'TEMP_TYPE' },
            { label: '活动类型', prop: 'tempType', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'ACTIVITY_TYPE' },
            { label: '描述', prop: 'remark', type: 'textarea', resizable: true, rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
            // { label: '实现目标', prop: 'achieveGoal', width: '100', resizable: true },
            // { label: '状态', prop: 'tempSts', width: '100', dataCode: 'TEMP_STS', resizable: true },
            {
              label: '创建日期',
              prop: 'createDate',
              formatter: function (row, cloumn) {
                return yufp.util.dateFormat(row.createDate, '{y}-{m}-{d}');
              },
              resizable: true
            },
            { label: '最新变更用户', prop: 'lastChgUsr', resizable: true },
            {
              label: '最近更新日期',
              prop: 'lastChgDt',
              formatter: function (row, cloumn) {
                return yufp.util.dateFormat(row.lastChgDt, '{y}-{m}-{d}');
              },
              resizable: true
            }
          ],
          /** 表格栏位 */
          custGrouptableColumns: [
            { label: '分组名称', prop: 'groupName', width: '150', resizable: true },
            { label: '条件', prop: 'conntion', resizable: true }
          ],
          /** 表格栏位 */
          custqurytableColumns: [
            { label: '客户编号', prop: 'custNo', width: '100', resizable: true },
            { label: '客户名称', prop: 'custName', resizable: true },
            { label: '性别', prop: 'sex', width: '80', dataCode: 'STATE', resizable: true },
            { label: '职业', prop: 'workType', width: '100', resizable: true }
          ],
          /** 表格栏位 */
          querytableColumns: [
            { label: '客户编号', prop: 'custNo', width: '100', resizable: true },
            { label: '客户名称', prop: 'custName', resizable: true },
            { label: '性别', prop: 'sex', width: '80', dataCode: 'STATE', resizable: true },
            { label: '职业', prop: 'workType', width: '100', resizable: true }
          ],
          // 新增
          addFields: [{
            columnCount: 2,
            fields: [
              {
                label: '模板名称',
                field: 'tempName',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' },
                  // { validator: checkName, trigger: 'blur' }
                ],
                type: 'input'
              },
              // {
              //   label: '流程类型',
              //   field: 'tempType',
              //   rules: [
              //     { required: true, message: '必填项', trigger: 'blur' }],
              //   type: 'select',
              //   dataCode: 'TEMP_TYPE'
              // },
              {
                label: '活动类型',
                field: 'tempType',
                rules: [{ required: true, message: '必填项', trigger: 'blur' }],
                type: 'select',
                dataCode: 'ACTIVITY_TYPE'
              },
              // {
              //   label: '实现目标',
              //   field: 'achieveGoal',
              //   type: 'input'
              // }
            ]
          }, {
            columnCount: 1,
            fields: [
              { label: '描述', field: 'remark', type: 'textarea', rows: 2, rules: [{ required: true, message: '必填项', trigger: 'blur' }] }
            ]
          }],
          /** 新增，修改，详情展示字段 */
          updateFields: [{
            columnCount: 2,
            fields: [
              {
                label: '模板编号',
                field: 'tempId',
                disabled: true,
                type: 'input'
              },
              {
                label: '模板名称',
                field: 'tempName',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' },
                  // { validator: checkUpName, trigger: 'blur' }
                ],
                type: 'input'
              },
              // {
              //   label: '流程类型',
              //   field: 'tempType',
              //   type: 'select',
              //   dataCode: 'TEMP_TYPE',
              //   rules: [
              //     { required: true, message: '必填项', trigger: 'blur' }]
              // },
              {
                label: '活动类型',
                field: 'tempType',
                rules: [{ required: true, message: '必填项', trigger: 'blur' }],
                type: 'select',
                dataCode: 'ACTIVITY_TYPE'
              },
              // {
              //   label: '实现目标',
              //   field: 'achieveGoal',
              //   rules: [
              //     { required: true, message: '必填项', trigger: 'blur' }],
              //   type: 'input'
              // }
            ]
          }, {
            columnCount: 1,
            fields: [
              { label: '描述', field: 'remark', type: 'textarea', rows: 2, rules: [{ required: true, message: '必填项', trigger: 'blur' }], }
            ]
          }],
          /** 新增，修改，详情展示字段 */
          custGroupFields: [{
            columnCount: 2,
            fields: [
              {
                label: '分组名称',
                field: 'tempId',
                value: '客户一组',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }],
                type: 'input'
              },
              {
                label: '客户属性',
                field: 'tempName',
                value: 'A',
                type: 'select',
                dataCode: 'CUST_SX',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }]
              }
            ]
          }, {
            columnCount: 1,
            fields: [
              { label: '条件', field: 'conntion', value: '客户编号%4=3', type: 'textarea', rows: 1 }
            ]
          }],
          // 新增保存
          addButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisibleAdd = false;
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
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/cimpcmmktplbasicinfo/add',
                  data: model,
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _self.$message(response.message);
                      _self.$refs.reftable.remoteData();
                      _self.dialogVisibleAdd = false;
                      _self.flowId = response.data.tempId;
                    } else {
                      _self.$message(response.message);
                      _self.dialogVisibleAdd = true;
                    }
                  }
                });
              }
            }
          ],
          /** 页面 提交、更新按钮 */
          updateButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisibleUpd = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.refformUpdate.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var obj = {};
                obj.tempId = model.tempId;
                obj.tempName = model.tempName;
                obj.tempType = model.tempType;
                obj.achieveGoal = model.achieveGoal;
                obj.remark = model.remark;
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/cimpcmmktplbasicinfo/updateFun',
                  data: obj,
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _self.$message('操作成功');
                      _self.$refs.reftable.remoteData();
                      _self.dialogVisibleUpd = false;
                    }
                  }
                });
              }
            }
          ],
          /** 页面 提交、更新按钮 */
          custGroupButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                // _self.dialogVisible = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.custGeoupform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                yufp.service.request({
                  method: 'POST',
                  url: '/trade/example/save',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _self.$refs.reftable.remoteData();
                      _self.$message('操作成功');
                      _self.dialogVisible = false;
                    }
                  }
                });
              }
            }
          ],
          Url: backend.adminService + '/api/cimpcmmktplbasicinfo/list',
          height: yufp.frame.size().height - 103,
          dialogVisibleAdd: false,
          dialogVisibleUpd: false,
          formDisabled: false,
          viewType: 'DETAIL',
          tabName: 'first',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        };
      },
      methods: {
        closeFun: function () {
          var _this = this;
          if (!_this.activeClose) {
            _this.activeClose = true;
          } else {
            _this.activeClose = false;
          }
        },
        // tabs切换事件（触发流程图初始化）
        handleClick: function (tab, event) {
          if (tab.name != 'second') {
            return;
          }
          this.showornot = true;
          this.panelType = this.viewType;
          if (this.panelType != 'ADD') {
            var obj = this.$refs.reftable.selections[0];
            this.flowId = obj.tempId;
          } else {
            this.flowId = '';
          }
        },
        /**
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _self = this;
          _self.viewType = viewType;
          _self.updateButtons[1].hidden = !editable;
          _self.formDisabled = !editable;
        },
        /** 新增方法 */
        addFn: function () {
          this.editableornot = true;
          var _self = this;
          _self.switchStatus('ADD', true);
          _self.dialogVisibleAdd = true;
          _self.tabName = 'first';
          _self.$nextTick(function () {
            _self.$refs.refform.resetFields();
            this.$refs.refform.switch('updateDate', 'hidden', true);
            this.$refs.refform.switch('updateUser', 'hidden', true);
            //         _self.swiperFun();
          });
        },
        /** 修改方法 */
        modifyFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var _self = this;
          this.editableornot = true;
          this.switchStatus('EDIT', true);
          _self.dialogVisibleUpd = true;
          //this.tabName = 'first';
          this.$nextTick(function () {
            var obj = this.$refs.reftable.selections[0];
            yufp.extend(this.$refs.refformUpdate.formModel, obj);
            this.$refs.refformUpdate.switch('updateDate', 'hidden', true);
            this.$refs.refformUpdate.switch('updateUser', 'hidden', true);
          });
        },
        /** 详情方法 */
        infoFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var _self = this;
          this.editableornot = false;
          this.switchStatus('DETAIL', false);
          _self.dialogVisibleUpd = true;
          this.tabName = 'first';
          this.$nextTick(function () {
            var obj = this.$refs.reftable.selections[0];
            yufp.extend(this.$refs.refformUpdate.formModel, obj);
            this.$refs.refformUpdate.switch('updateDate', 'hidden', false);
            this.$refs.refformUpdate.switch('updateUser', 'hidden', false);
          });
        },
        /** 删除方法 */
        // deleteFn: function () {
        //   var _self = this;
        //   var selections = _self.$refs.reftable.selections;
        //   console.log("selections", selections);
        //   var ids = '';
        //   if (selections.length < 1) {
        //     _self.$message({ message: '请先选择一条记录', type: 'warning' });
        //     return;
        //   } else if (selections.length > 1) {
        //     for (var i = 0; i < selections.length; i++) {
        //       ids = selections[i].custGroupId + ',' + ids;
        //     }
        //   } else {
        //     ids = selections[0].custGroupId;
        //     console.log("ids", ids)
        //   }
        //   yufp.service.request({
        //     method: 'POST',
        //     url: backend.adminService + '/api/cimpcmmktplbasicinfo/del/' + ids,
        //     callback: function (code, message, response) {
        //       if (code == 0) {
        //         _self.$refs.reftable.remoteData();
        //         _self.$message('操作成功');
        //       }
        //     }
        //   });
        // }
        deleteFn: function () {
          var _self = this;
          var selections = _self.$refs.reftable.selections;
          var ids = '';
          if (selections.length < 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          } else if (selections.length > 1) {
            for (var i = 0; i < selections.length; i++) {
              ids = selections[i].tempId + ',' + ids;
            }
          } else {
            ids = selections[0].tempId;
          }
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/cimpcmmktplbasicinfo/del/' + ids,
            callback: function (code, message, response) {
              if (code == 0) {
                _self.$refs.reftable.remoteData();
                _self.$message('操作成功');
              }
            }
          });
        }
      },
      mounted: function () {

      }
    });
  };
});
