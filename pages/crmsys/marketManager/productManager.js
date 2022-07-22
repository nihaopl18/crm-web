/**
 * Created by yangxiao2 2018-10-16
 * 产品查询管理
 */
define([
  './custom/widgets/js/yufpProdCatlTree.js',
  './custom/widgets/js/yufpProdSelector.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    var dataparam;
    if (data == null || data == '') {
      dataparam = {};
    } else {
      dataparam = { prodName: data.value };
    }
    yufp.lookup.reg('IS_COMBINATION,PROD_STATE,RISK-LEVEL,PROD_TYPE_ID,TYPE_FIT_CUST');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          queryFields: [
            { placeholder: '产品编号', field: 'productId', type: 'input' },
            { placeholder: '产品名称', field: 'prodName', type: 'input' },
            { placeholder: '产品组合', field: 'isCombination', type: 'select', dataCode: 'IS_COMBINATION' },
            // { placeholder: '产品发布日期', field: 'prodStartDate', type: 'date' },
            // { placeholder: '产品截止日期', field: 'prodEndDate', type: 'date' },
            { placeholder: '是否在售', field: 'prodState', type: 'select', dataCode: 'PROD_STATE' },
            { placeholder: '币种', field: 'money', type: 'input' },
            { placeholder: '风险等级', field: 'riskLevel', type: 'select', dataCode: 'RISK-LEVEL' },
            { placeholder: '管理部门', field: 'prodDept', type: 'input' },
            { placeholder: '产品经理', field: 'prodMag', type: 'input' }
            // { placeholder: '保本要求', field: 'tradeCondi', type: 'input' } // 数据库字段为办理条件
          ],
          queryButtons: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  // 防止输入特殊字符
                  if (model.productId.indexOf('#', 0) != -1) {
                    _self.$message({ message: '产品编号含有非法字符', type: 'warning' });
                    return;
                  }
                  model.catlCode = _self.code;
                  var param = { condition: JSON.stringify(model) };
                  _self.$refs.reftable.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          tableColumns: [
            { label: '产品编号', prop: 'productId' },
            { label: '产品名称', prop: 'prodName', width: '200' },
            { label: '组合产品', prop: 'isCombination', width: '80', dataCode: 'IS_COMBINATION' },
            { label: '产品分类名称', prop: 'catlName', width: '120' },
            { label: '是否在售', prop: 'prodState', width: '80', dataCode: 'PROD_STATE' },
            { label: '币种', prop: 'money', width: '80' },
            { label: '产品发布日期', prop: 'prodStartDate', width: '100' },
            { label: '产品截止日期', prop: 'prodEndDate', width: '100' },
            { label: '利率（%）', prop: 'rate', width: '80' },
            { label: '费率（%）', prop: 'costRate', width: '80' },
            { label: '期限', prop: 'limitTime', width: '50' },
            { label: '目标客户描述', prop: 'objCustDisc', width: '200' },
            { label: '产品特点', prop: 'prodCharact', width: '200' },
            { label: '风险等级', prop: 'riskLevel', width: '80', dataCode: 'RISK-LEVEL' },
            { label: '风险提示描述', prop: 'dangerDisc', width: '200' },
            { label: '担保要求描述', prop: 'assureDisc', width: '200' },
            { label: '产品描述', prop: 'prodDesc', width: '200' },
            { label: '其他说明', prop: 'otherInfo', width: '200' }
          ],
          // 产品组合维护表格栏位
          tableColumnsCombin: [
            { label: '子产品编号', prop: 'productId', width: '100' },
            { label: '子产品名称', prop: 'prodName' },
            { label: '产品风险', prop: 'riskLevel', width: '80', dataCode: 'RISK-LEVEL' },
            { label: '预期收益', prop: 'rate', width: '80' },
            { label: '产品组合配比', prop: 'parentProdWeight', width: '100' }
          ],
          // 维护界面
          updateFields: [
            {
              columnCount: 2,
              fields: [
                {
                  field: 'productId',
                  label: '产品编号',
                  type: 'input',
                  disabled: false,
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'prodName',
                  label: '产品名称',
                  type: 'input',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'catlCode',
                  label: '产品分类',
                  type: 'custom',
                  is: 'yufp-prod-tree',
                  rules: [{ required: true, message: '必填项' }]
                },
                {
                  field: 'prodTypeId',
                  label: '产品大类',
                  type: 'select',
                  dataCode: 'PROD_TYPE_ID',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'typeFitCust',
                  label: '产品适用客户',
                  type: 'select',
                  dataCode: 'TYPE_FIT_CUST',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'prodState',
                  label: '是否在售',
                  type: 'select',
                  dataCode: 'PROD_STATE',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'isCombination',
                  label: '组合产品',
                  type: 'select',
                  dataCode: 'IS_COMBINATION',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                { field: 'riskLevel', label: '风险等级', type: 'select', dataCode: 'RISK-LEVEL' },
                {
                  field: 'prodStartDate',
                  label: '产品发布日期',
                  type: 'date',
                  rules: [{ required: true, message: '必填项' }]
                },
                {
                  field: 'prodEndDate',
                  label: '产品截止日期',
                  type: 'date',
                  rules: [{ required: true, message: '必填项' }]
                },
                { field: 'rate', label: '利率（%）', type: 'input' },
                { field: 'costRate', label: '费率（%）', type: 'input' },
                { field: 'limitTime', label: '期限', type: 'input' },
                { field: 'money', label: '币种', type: 'input' }
              ]
            }, {
              columnCount: 1,
              fields: [
                { field: 'prodDesc', label: '产品描述', type: 'textarea', rows: 2 },
                { field: 'otherInfo', label: '其他说明', type: 'textarea', rows: 2 },
                { field: 'objCustDisc', label: '目标客户描述', type: 'textarea', rows: 2 },
                { field: 'prodCharact', label: '产品特点', type: 'textarea', rows: 2 },
                { field: 'assureDisc', label: '担保要求描述', type: 'textarea', rows: 2 },
                { field: 'dangerDisc', label: '风险提示描述', type: 'textarea', rows: 2 }
              ]
            }
          ],
          // 维护保存
          buttons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
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
                _self.$refs.reform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                // 判断产品类型是否为空
                if (model.catlCode == null) {
                  _self.$message({ message: '产品类型为空', type: 'warning' });
                  return;
                }
                // 判断操作类型
                if (_self.viewType == 'ADD') {
                  var addFlag = true;
                  var addMessage = '';
                  // 判断生效日期是否小于失效日期、生效日期是否大于当前日期
                  if (model.prodStartDate > model.prodEndDate) {
                    addFlag = false;
                    addMessage = '生效日期不能大于失效日期';
                  } else if (model.prodStartDate < new Date() &&
                    !(model.prodStartDate.getFullYear() == new Date().getFullYear() &&
                      model.prodStartDate.getMonth() == new Date().getMonth() &&
                      model.prodStartDate.getDate() == new Date().getDate())) {
                    addFlag = false;
                    addMessage = '生效日期不能小于当期日期';
                  }
                  if (addFlag) {
                    // 新增
                    yufp.service.request({
                      method: 'POST',
                      url: backend.adminService + '/api/cmfrcproductmanager/insertlist',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0 && response.code == 0) {
                          _self.dialogVisible = false;
                          _self.$message({ message: response.message });
                          _self.$refs.reftable.remoteData();
                        } else {
                          _self.$message({ message: response.message, type: 'warning' });
                        }
                      }
                    });
                  } else {
                    _self.$message({ message: addMessage, type: 'warning' });
                  }
                } else if (_self.viewType == 'EDIT') {
                  var setFlag = true;
                  var setMessage = '';
                  // 判断生效日期是否小于失效日期、生效日期是否大于当前日期
                  if (model.prodStartDate > model.prodEndDate) {
                    setFlag = false;
                    setMessage = '生效日期不能大于失效日期';
                  } else if (model.prodStartDate < new Date() &&
                    !(model.prodStartDate.getFullYear() == new Date().getFullYear() &&
                      model.prodStartDate.getMonth() == new Date().getMonth() &&
                      model.prodStartDate.getDate() == new Date().getDate())) {
                    setFlag = false;
                    setMessage = '生效日期不能小于当期日期';
                  }
                  if (setFlag) {
                    // 修改
                    yufp.service.request({
                      method: 'POST',
                      url: backend.adminService + '/api/cmfrcproductmanager/updatelist',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0 && response.code == 0) {
                          _self.dialogVisible = false;
                          _self.$message({ message: response.message });
                          _self.$refs.reftable.remoteData();
                        } else {
                          _self.$message({ message: response.message, type: 'warning' });
                        }
                      }
                    });
                  } else {
                    _self.$message({ message: setMessage, type: 'warning' });
                  }
                } else {
                  _self.$message({ message: '操作错误', type: 'warning' });
                  _self.dialogVisible = false;
                }
              }
            }
          ],
          // 产品分类维护界面
          groupFields: [
            {
              columnCount: 2,
              fields: [
                {
                  field: 'catlName',
                  label: '产品类别名称',
                  type: 'input',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'catlParent',
                  label: '上级产品类别',
                  type: 'custom',
                  is: 'yufp-prod-tree',
                  rules: [{ required: true, message: '必填项' }]
                },
                // { field: 'catlOrder', label: '产品类别节点顺序', type: 'input' },
                { field: 'viewDetail', label: '产品视图展示方案', type: 'input' },
                { field: 'prodView', label: '产品信息展示方案', type: 'input' }
              ]
            }
          ],
          // 产品分类维护保存
          groupButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisibleGroup = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.refformGroup.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                // 上级产品类别判空
                if (model.catlParent == null) {
                  _self.$message({ message: '未选择上级产品', type: 'warning' });
                }
                // 判断操作类型
                if (_self.groupFlag == 'ADD') {
                  var addFlag = true;
                  var addMessage = '';
                  if (addFlag) {
                    // 新增产品分类
                    yufp.service.request({
                      method: 'POST',
                      url: backend.adminService + '/api/cmfrcprodcatl/insertlist',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0 && response.code == 0) {
                          _self.dialogVisibleGroup = false;
                          _self.$message({ message: response.message });
                          _self.$refs.mytree.remoteData();
                        } else {
                          _self.$message({ message: response.message, type: 'warning' });
                        }
                      }
                    });
                  } else {
                    _self.$message({ message: addMessage, type: 'warning' });
                  }
                } else if (_self.groupFlag == 'SET') {
                  var setFlag = true;
                  var setMessage = '';
                  if (setFlag) {
                    // 修改产品分类
                    yufp.service.request({
                      method: 'POST',
                      url: backend.adminService + '/api/cmfrcprodcatl/updatelist',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0 && response.code == 0) {
                          _self.dialogVisibleGroup = false;
                          _self.$message({ message: response.message });
                          _self.$refs.mytree.remoteData();
                        } else {
                          _self.$message({ message: response.message, type: 'warning' });
                        }
                      }
                    });
                  } else {
                    _self.$message({ message: setMessage, type: 'warning' });
                  }
                } else {
                  _self.$message({ message: '操作错误', type: 'warning' });
                  _self.dialogVisible = false;
                }
              }
            }
          ],
          // 产品组合维护界面
          updateFieldsCombin: [
            {
              columnCount: 2,
              fields: [
                {
                  field: 'parentProdId',
                  label: '组合产品编号',
                  type: 'input',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'parentProdName',
                  label: '组合产品名称',
                  type: 'input',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'productId',
                  label: '子产品名称',
                  type: 'custom',
                  is: 'yufp-prod-selector',
                  param: {
                    needDpt: true,
                    needCheckbox: false,
                    dataUrl: backend.adminService + '/api/cmfrcproductmanager/list'
                  },
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                // {
                // field: 'parentProdRisk', label: '组合产品风险', type: 'input',
                // rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                // },
                // {
                // field: 'parentProdIncome', label: '组合产品收益', type: 'input',
                // rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                // },
                {
                  field: 'parentProdWeight',
                  label: '组合产品配比',
                  type: 'input',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                }
              ]
            }
          ],
          // 产品组合维护保存
          buttonsCombin: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisibleCombinSet = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                if (_self.combinFlag == 'ADD') {
                  // 新增子产品
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cmfrcprodcombin/insertlist',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.dialogVisibleCombinSet = false;
                        _self.$message({ message: response.message });
                        _self.$refs.reftableCombin.remoteData();
                      } else {
                        _self.$message({ message: response.message, type: 'warning' });
                      }
                    }
                  });
                } else if (_self.combinFlag == 'SET') {
                  // 更新子产品
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cmfrcprodcombin/updatelist',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.dialogVisibleCombinSet = false;
                        _self.$message({ message: response.message });
                        _self.$refs.reftableCombin.remoteData();
                      } else {
                        _self.$message({ message: response.message, type: 'warning' });
                      }
                    }
                  });
                } else {
                  _self.$message({ message: '操作错误', type: 'warning' });
                  _self.dialogVisibleCombinSet = false;
                }
              }
            }
          ],
          code: 0,
          groupFlag: '',
          combinFlag: '',
          node: {},
          async: false,
          param: {},
          addbuttonDisabled: false,
          buttonDisabled: false,
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          dialogVisibleGroup: false,
          dialogVisibleCombin: false,
          dialogVisibleCombinSet: false,
          formDisabled: false,
          formDisabledGroup: false,
          formDisabledCombin: false,
          viewType: 'DETAIL',
          dataParams: { condition: JSON.stringify(dataparam) },
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          titleCombin: '',
          titleCombinSet: '产品组合维护',
          loadCombin: false
        };
      },
      methods: {
        /**
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _self = this;
          _self.dialogVisible = true;
          _self.viewType = viewType;
          _self.buttons[1].hidden = !editable;
          _self.formDisabled = !editable;
        },
        addFn: function () {
          var _self = this;
          _self.switchStatus('ADD', true);
          _self.$nextTick(function () {
            _self.$refs.reform.resetFields();
            // 将编号置灰取消
            this.$refs.reform.switch('productId', 'disabled', false);
            // 产品分类默认当前选择的分类
            this.$refs.reform.formModel.catlCode = this.code;
          });
        },
        modifyFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            var obj = this.$refs.reftable.selections[0];
            obj.prodTypeId = obj.prodTypeId.toString();
            yufp.extend(this.$refs.reform.formModel, obj);
            // 将编号置灰
            this.$refs.reform.switch('productId', 'disabled', true);
          });
        },
        infoFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var productKey = 'product_' + this.$refs.reftable.selections[0].productId;
          var routeId = 'productView'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: productKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '产品视图:' + this.$refs.reftable.selections[0].productId, // 页签名称
            data: { selections: this.$refs.reftable.selections[0] } // 传递的业务数据，可选配置
          });
          // this.switchStatus('DETAIL', false);
          // this.$nextTick(function () {
          // yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
          // });
        },
        // 双击产品表格触发产品视图
        columnClick: function (row) {
          var productKey = 'product_' + row.productId;
          var routeId = 'productView'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: productKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '产品视图:' + row.productId, // 页签名称
            data: { selections: row } // 传递的业务数据，可选配置
          });
        },
        deleteFn: function () {
          var _self = this;
          if (_self.$refs.reftable.selections.length != 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _self.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {

          });
        },
        // 产品分类新增
        addGroupFn: function () {
          var _self = this;
          if (_self.addbuttonDisabled || _self.node.catlCode == null) {
            _self.$message({ message: '请选择一条父级节点' });
            return;
          } else {
            // 设置操作类型为新增
            _self.groupFlag = 'ADD';
            _self.formDisabledGroup = false;
            _self.groupButtons[1].hidden = false;
            _self.dialogVisibleGroup = true;
            _self.$nextTick(function () {
              _self.$refs.refformGroup.resetFields();
              _self.$refs.refformGroup.formModel.catlParent = _self.node.catlCode;
            });
          }
        },
        // 产品分类修改
        modifyGroupFn: function () {
          var _self = this;
          if (_self.node.catlCode == null) {
            _self.$message({ message: '请选择一个节点' });
            return;
          } else {
            // 设置操作类型为修改
            _self.groupFlag = 'SET';
            _self.formDisabledGroup = false;
            _self.groupButtons[1].hidden = false;
            _self.dialogVisibleGroup = true;
            _self.$nextTick(function () {
              yufp.extend(_self.$refs.refformGroup.formModel, _self.node);
            });
          }
        },
        // 产品分类删除
        deletGroupFn: function () {
          var _self = this;
          if (_self.node.catlCode == null) {
            _self.$message({ message: '请选择一个节点' });
            return;
          } else {
            _self.$confirm('确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(function () {
              var model = {};
              model.catlCode = _self.node.catlCode;
              yufp.service.request({
                method: 'POST',
                url: backend.adminService + '/api/cmfrcprodcatl/deletelist',
                data: model,
                callback: function (code, message, response) {
                  if (code == 0 && response.code == 0) {
                    _self.dialogVisibleGroup = false;
                    _self.$message({ message: response.message });
                    _self.$refs.mytree.remoteData();
                    // 将分类按钮置灰
                    _self.buttonDisabled = true;
                  } else {
                    _self.$message({ message: response.message, type: 'warning' });
                  }
                }
              });
            });
          }
        },
        // 产品分类详情
        detailGroupFn: function () {
          var _self = this;
          if (_self.node.catlCode == null) {
            _self.$message({ message: '请选择一个节点' });
            return;
          } else {
            // 设置操作类型为详情
            _self.groupFlag = 'SEE';
            _self.formDisabledGroup = true;
            _self.groupButtons[1].hidden = true;
            _self.dialogVisibleGroup = true;
            _self.$nextTick(function () {
              yufp.extend(_self.$refs.refformGroup.formModel, _self.node);
            });
          }
        },
        // 产品分类树点击事件
        nodeClickFn: function (nodeData, node, self) {
          var _self = this;
          _self.node = nodeData;
          _self.node.catlParent = node.parent.data.catlCode;
          // 保存节点编号
          _self.code = nodeData.catlCode;
          // 设置上级节点名称
          _self.node.catlParentName = node.parent.data.catlName;
          _self.node.catlCode = nodeData.catlCode;
          if (_self.node.catlCode == 0) {
            _self.buttonDisabled = true;
            _self.addbuttonDisabled = false;
          } else {
            this.buttonDisabled = false;
            this.addbuttonDisabled = false;
          }
          // 查询产品分类下所有产品
          var param = {
            condition: JSON.stringify(
              { catlCode: nodeData.catlCode }
            )
          };
          _self.$refs.reftable.remoteData(param);
        },
        // 产品组合维护
        combinFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (this.$refs.reftable.selections[0].isCombination != '1') {
            this.$message({ message: '请选择组合产品', type: 'warning' });
            return;
          }
          var _self = this;
          var param = {
            condition: JSON.stringify({
              parentProdId: _self.$refs.reftable.selections[0].productId
            })
          };
          _self.dialogVisibleCombin = true;
          _self.$nextTick(function () {
            _self.titleCombin = _self.$refs.reftable.selections[0].productId + '-' + _self.$refs.reftable.selections[0].prodName;
            _self.$refs.reftableCombin.remoteData(param);
          });
        },
        // 产品组合新增
        addCombinFn: function () {
          var _self = this;
          _self.dialogVisibleCombinSet = true;
          _self.combinFlag = 'ADD';
          _self.$nextTick(function () {
            // 设置组合产品信息不可更改
            _self.$refs.reformCombin.switch('parentProdId', 'disabled', true);
            _self.$refs.reformCombin.switch('parentProdName', 'disabled', true);
            // 设置选中的子产品信息可更改
            _self.$refs.reformCombin.switch('productId', 'disabled', false);
            _self.$refs.reformCombin.resetFields();
            _self.$refs.reformCombin.formModel.parentProdId = _self.$refs.reftable.selections[0].productId;
            _self.$refs.reformCombin.formModel.parentProdName = _self.$refs.reftable.selections[0].prodName;
          });
        },
        // 产品组合修改
        modifyCombinFn: function () {
          var _self = this;
          _self.dialogVisibleCombinSet = true;
          _self.combinFlag = 'SET';
          _self.$nextTick(function () {
            // 设置组合产品信息、选中的子产品信息不可更改
            _self.$refs.reformCombin.switch('parentProdId', 'disabled', true);
            _self.$refs.reformCombin.switch('parentProdName', 'disabled', true);
            _self.$refs.reformCombin.switch('productId', 'disabled', true);
            yufp.extend(_self.$refs.reformCombin.formModel, _self.$refs.reftableCombin.selections[0]);
            _self.$refs.reformCombin.formModel.parentProdId = _self.$refs.reftable.selections[0].productId;
            _self.$refs.reformCombin.formModel.parentProdName = _self.$refs.reftable.selections[0].prodName;
          });
        },
        // 产品组合删除
        deleteCombinFn: function () {
          var _self = this;
          if (_self.$refs.reftableCombin.selections.length < 1) {
            _self.$message({ message: '请选择一条数据' });
            return;
          } else {
            _self.$confirm('确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(function () {
              var arr = [];
              for (var i = 0; i < _self.$refs.reftableCombin.selections.length; i++) {
                arr[i] = _self.$refs.reftableCombin.selections[i].productId;
              }
              var model = {};
              model.productId = arr.join(',');
              model.parentProdId = _self.$refs.reftable.selections[0].productId;
              yufp.service.request({
                method: 'POST',
                url: backend.adminService + '/api/cmfrcprodcombin/deletelist',
                data: model,
                callback: function (code, message, response) {
                  if (code == 0 && response.code == 0) {
                    _self.dialogVisibleCombinSet = false;
                    _self.$message({ message: response.message });
                    _self.$refs.reftableCombin.remoteData();
                  } else {
                    _self.$message({ message: response.message, type: 'warning' });
                  }
                }
              });
            });
          }
        }
      }
    });
  };
});