/**
 * Created by yangxiao2 2018-11-06
 * 渠道营销模板管理
 */
define([
  './custom/widgets/js/yufpProdCatlTree.js',
  './custom/widgets/js/yufpProdSelector.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('APPLY_TYPE', 'YESNO', 'RISK_OBJECT', 'CARE_OBJECT');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        var labelField = [];
        // 获取关键字、别名
        // yufp.service.request({
        //   method: 'GET',
        //   url: backend.adminService + '/api/cmfrcsystype/getnames',
        //   callback: function (code, message, response) {
        //     var json = response.data;
        //     for (var i = 0; i < json.length; i++) {
        //       labelField[i] = new Object();
        //       labelField[i].text = json[i].keyword + ':' + json[i].aliasname;
        //     }
        //     _self.labelField = labelField;
        //   }
        // });
        var channelOptions = [];
        var channelOptionsId = [];
        // 获取渠道营销名称
        yufp.service.request({
          method: 'GET',
          url: backend.adminService + '/api/cmfrcchannelmgr/getchannelname',
          callback: function (code, message, response) {
            var json = response.data;
            for (var i = 0; i < json.length; i++) {
              channelOptions[i] = new Object();
              channelOptions[i].key = i.toString();
              channelOptions[i].value = json[i].channelName;
              // 保存渠道id
              channelOptionsId[i] = json[i].channelId;
            }
            _self.updateFields[1].fields[4].options = channelOptions;
          }
        });
        return {
          tip: '模板中的客户名称等信息请使用约定符号代替!约定符号如下：',
          exp: '示例：@CUST_NAME@先生/女士你好，我行将于@PROD_START_DATE@发售新产品@PROD_NAME@，请关注。',
          refTableInfoData: [],
          labelField: [],
          queryFields: [
            { placeholder: '模板名称', field: 'modelName', type: 'input' },
            { placeholder: '模板类型', field: 'applyType', type: 'select', dataCode: 'APPLY_TYPE' }
          ],
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
          tableColumnsInfo: [
            { label: '源字段中文名', prop: 'keyword', width: '300' },
            { label: '别名', prop: 'aliasname', width: '300' },
          ],
          tableColumns: [
            // { label: '编号', prop: 'id', width: '0' },
            { label: '模板名称', prop: 'modelName', width: '150' },
            { label: '模板内容', prop: 'modelInfo', width: '350' },
            { label: '是否启用', prop: 'isEnable', dataCode: 'YESNO', width: '70' },
            { label: '模板类型', prop: 'applyType', dataCode: 'APPLY_TYPE', width: '70' },
            // { label: '类别名称', prop: 'catlName', width: '90' },
            { label: '适用对象', prop: 'applyObjectName', width: '120' },
            { label: '适用渠道', prop: 'applyChannelName', width: '90' },
            { label: '创建人', prop: 'creatUserName', width: '90' },
            { label: '最近维护人', prop: 'updataUserName', width: '90' },
            { label: '最近维护时间', prop: 'updataDate', width: '100' }
          ],
          // 关注风险表单
          tableColumnsRisk: [
            { label: '风险名称', prop: 'riskName' },
            { label: '风险描述', prop: 'riskDescribe' },
            { label: '风险类型', prop: 'riskType' },
            { label: '风险级别', prop: 'riskLevel' },
            { label: '预警方式', prop: 'riskWay' }
          ],
          // 客户关怀表单
          tableColumnsCare: [
            { label: '关怀标题', prop: 'careName' },
            { label: '关怀类型', prop: 'careType' },
            { label: '关怀等级', prop: 'careLevel' },
            { label: '关怀方式', prop: 'careWay' },
            { label: '关怀内容', prop: 'careContent' }
          ],
          // 产品管理表单
          tableColumnsProd: [
            { label: '产品编号', prop: 'productId' },
            { label: '产品名称', prop: 'prodName', width: '200' },
            { label: '产品分类名称', prop: 'catlName', width: '120' },
            { label: '产品发布日期', prop: 'prodStartDate', width: '100' },
            { label: '产品截止日期', prop: 'prodEndDate', width: '100' },
            { label: '利率（%）', prop: 'rate', width: '80' },
            { label: '费率（%）', prop: 'costRate', width: '80' },
            { label: '期限', prop: 'limitTime', width: '50' },
            { label: '是否在售', prop: 'prodState', width: '80' },
            { label: '组合产品', prop: 'isCombination', width: '80' },
            { label: '目标客户描述', prop: 'objCustDisc', width: '200' },
            { label: '产品特点', prop: 'prodCharact', width: '200' },
            { label: '风险等级', prop: 'riskLevel', width: '80' },
            { label: '风险提示描述', prop: 'dangerDisc', width: '200' },
            { label: '担保要求描述', prop: 'assureDisc', width: '200' },
            { label: '产品描述', prop: 'prodDesc', width: '200' },
            { label: '其他说明', prop: 'otherInfo', width: '200' }
          ],
          // 维护界面
          updateFields: [
            {
              columnCount: 1,
              fields: []
            },
            {
              columnCount: 2,
              fields: [

                {
                  field: 'modelName',
                  label: '模板名称',
                  type: 'input',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'isEnable',
                  label: '是否启用',
                  type: 'select',
                  dataCode: 'YESNO',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'applyType',
                  label: '模板类型',
                  type: 'select',
                  dataCode: 'APPLY_TYPE',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }],
                  change: function () {
                    if (_self.$refs.reform.formModel.applyType == 'RISK') {
                      _self.$refs.reform.switch('applyObject', 'type', 'select');
                      _self.$refs.reform.switch('applyObject', 'dataCode', 'RISK_OBJECT');
                    } else if (_self.$refs.reform.formModel.applyType == 'CARE') {
                      _self.$refs.reform.switch('applyObject', 'type', 'select');
                      _self.$refs.reform.switch('applyObject', 'dataCode', 'CARE_OBJECT');
                    } else if (_self.$refs.reform.formModel.applyType == 'PRODUCT') {
                      _self.$refs.reform.switch('applyObject', 'type', 'custom');
                      _self.$refs.reform.switch('applyObject', 'is', 'yufp-prod-selector');
                    } else if (_self.$refs.reform.formModel.applyType == 'PRODCATL') {
                      _self.$refs.reform.switch('applyObject', 'type', 'custom');
                      _self.$refs.reform.switch('applyObject', 'is', 'yufp-prod-tree');
                    } else {
                      // _self.$message({ message: '未知类型', type: 'warning' });
                    }
                  }
                },
                {
                  field: 'applyObject',
                  label: '适用对象',
                  type: 'input',
                  is: 'yufp-prod-tree',
                  dataCode: '',
                  rules: [{ required: true, message: '必填项' }]
                },
                {
                  field: 'applyChannel',
                  label: '适用渠道',
                  type: 'select',
                  options: channelOptions,
                  multiple: true,
                  rules: [{ required: true, message: '必填项' }]
                }
              ]
            }, {
              columnCount: 1,
              fields: [
                { field: 'modelInfo', label: '模板内容', type: 'textarea', rows: 4, rules: [{ required: true, message: '必填项' }] }
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
                // 适用对象判空
                if (model.applyObject == '' || model.applyObject == null) {
                  _self.$message({ message: '未选择适用对象', type: 'warning' });
                  return;
                }
                // 适用渠道判空
                if (model.applyChannel.length == 0) {
                  _self.$message({ message: '未选择适用渠道', type: 'warning' });
                  return;
                }
                // 判断操作类型
                if (_self.viewType == 'ADD') {
                  // 新增模板
                  // 产品类别编号改为String类型
                  if (model.applyType == 'PRODUCT') {
                    model.applyObject = model.applyObject.toString();
                  }
                  // 设置适用渠道名称
                  var applyChannelName = [];
                  for (var i = 0; i < model.applyChannel.length; i++) {
                    applyChannelName[i] = channelOptions[parseInt(model.applyChannel[i])].value;
                  }
                  model.applyChannelName = applyChannelName.join('/');
                  // 设置适用渠道id
                  var applyChannel = [];
                  for (var j = 0; j < model.applyChannel.length; j++) {
                    applyChannel[j] = channelOptionsId[parseInt(model.applyChannel[j])];
                  }
                  model.applyChannel = applyChannel.join('/');
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cmfrcsystype/insertlist',
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
                } else if (_self.viewType == 'EDIT') {
                  // 更新模板
                  model.id = _self.$refs.reftable.selections[0].id;
                  // 产品类别编号改为String类型
                  if (model.applyType == 'PRODUCT') {
                    model.applyObject = model.applyObject.toString();
                  }
                  // 设置适用渠道名称
                  var applyChannelName = [];
                  // if(!isNaN(parseInt(model.applyChannel[0]))) {
                  // 	for(var i=0;i<model.applyChannel.length;i++) {
                  // 		applyChannelName[i] = channelOptions[parseInt(model.applyChannel[i])].value;
                  // 	}
                  // } else {
                  // 	for(var i=0;i<model.applyChannel.length;i++) {
                  // 		applyChannelName[i] = model.applyChannel[i];
                  // 	}
                  // }
                  for (var i = 0; i < model.applyChannel.length; i++) {
                    applyChannelName[i] = channelOptions[parseInt(model.applyChannel[i])].value;
                  }
                  model.applyChannelName = applyChannelName.join('/');
                  // 设置适用渠道id
                  var applyChannel = [];
                  for (var j = 0; j < model.applyChannel.length; j++) {
                    applyChannel[j] = channelOptionsId[parseInt(model.applyChannel[j])];
                  }
                  model.applyChannel = applyChannel.join('/');
                  // 未更新渠道保存
                  if (model.applyChannelName == '') {
                    model.applyChannelName = _self.applyChannelStr;
                    var arr = model.applyChannelName.split('/');
                    for (var k = 0; k < arr.length; k++) {
                      for (var l = 0; l < channelOptions.length; l++) {
                        if (arr[k] == channelOptions[l].value) {
                          applyChannel[k] = channelOptionsId[parseInt(channelOptions[l].key)];
                        }
                      }
                    }
                    model.applyChannel = applyChannel.join('/');
                  }
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cmfrcsystype/updatelist',
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
                  _self.dialogVisible = false;
                  _self.$message({ message: '操作错误', type: 'warning' });
                }
              }
            }
          ],
          channelOptions: channelOptions,
          applyChannelStr: '',
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          riskFocusTitle: '关注风险',
          custCareTitle: '客户关怀',
          prodTitle: '产品查询',
          dialogVisibleRisk: false,
          dialogVisibleCare: false,
          dialogVisibleProd: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
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
            this.applyChannelStr = obj.applyChannelName;
            // 回显渠道名称
            var arr = obj.applyChannelName.split('/');
            for (var i = 0; i < arr.length; i++) {
              for (var j = 0; j < this.channelOptions.length; j++) {
                if (arr[i] == this.channelOptions[j].value) {
                  arr[i] = this.channelOptions[j].key;
                }
              }
            }
            obj.applyChannel = arr;
            yufp.extend(this.$refs.reform.formModel, obj);
          });
        },
        infoFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('DETAIL', false);
          this.$nextTick(function () {
            var obj = this.$refs.reftable.selections[0];
            this.applyChannelStr = obj.applyChannelName;
            // 回显渠道名称
            var arr = obj.applyChannelName.split('/');
            for (var i = 0; i < arr.length; i++) {
              for (var j = 0; j < this.channelOptions.length; j++) {
                if (arr[i] == this.channelOptions[j].value) {
                  arr[i] = this.channelOptions[j].key;
                }
              }
            }
            obj.applyChannel = arr;
            yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
          });
        },
        deleteFn: function () {
          var _self = this;
          if (_self.$refs.reftable.selections.length < 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var selection = _self.$refs.reftable.selections;
          _self.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            // 获取删除的id列表
            var arrayId = [];
            for (var i = 0; i < selection.length; i++) {
              arrayId[i] = selection[i].id;
            }
            var model = _self.$refs.reftable.selections[0];
            model.id = arrayId.join(',');
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cmfrcsystype/deletelist',
              data: model,
              callback: function (code, message, response) {
                if (code == 0) {
                  _self.$refs.reftable.remoteData();
                  _self.$message({ message: '删除成功' });
                }
              }
            });
          });
        },
        // 选择关注风险表返回数据
        selectRisk: function () {
          var _self = this;
          if (_self.$refs.reftableRisk.selections.length != 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var data = _self.$refs.reftableRisk.selections[0];
          _self.$refs.reform.formModel.catlName = data.riskName;
          _self.$refs.reform.formModel.catlCode = data.riskId;
          _self.dialogVisibleRisk = false;
        },
        // 选择关注风险表返回数据
        selectCare: function () {
          var _self = this;
          if (_self.$refs.reftableCare.selections.length != 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var data = _self.$refs.reftableCare.selections[0];
          _self.$refs.reform.formModel.catlName = data.careName;
          _self.$refs.reform.formModel.catlCode = data.careId;
          _self.dialogVisibleCare = false;
        },
        // 选择产品管理表返回数据
        selectProd: function () {
          var _self = this;
          if (_self.$refs.reftableProd.selections.length != 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var data = _self.$refs.reftableProd.selections[0];
          _self.$refs.reform.formModel.catlName = data.prodName;
          _self.$refs.reform.formModel.catlCode = data.productId;
          _self.dialogVisibleProd = false;
        }
      }
    });
  };
});