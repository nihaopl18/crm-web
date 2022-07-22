/**
 * @created by 刘杰 on 2018/11/16.
 * @description 营销组件FORM表单-营销组件-实时事件活动
 * update by chenlin
 */
define(['pages/cimp/marketcenter/marketcomptform/realtimeevent/eventUtils.js'], function (require, exports) {
  /**
  * 页面加载完成时触发
  *@param hashCode 路由ID
  * @param data 传递数据对象
  * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    // yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE');
    var tableTypeOptions = [];
    var transCodeOptions = [];
    var comboSelectOptions = [];
    var numDataOptions = [];
    var countSumOptions = [];
    var textOptions = [];
    var radioComboOptions = [];
    yufp.service.request({
      method: 'GET',
      url: backend.adminService + '/api/transactioncategory/searchtranscode',
      // data: {
      //   transType: '2'
      // },
      callback: function (code, message, response) {
        var tab = response.data;
        for (var i = 0; i < tab.length; i++) {
          var option = {};
          option.key = tab[i].key;
          option.value = tab[i].value;
          transCodeOptions.push(option);
        }
      }
    });
    yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        var _self = this;
        return {
          inactiveNames: ['1', '2', '3'],
          selectValue: '',
          transCodeOptions: transCodeOptions,
          tableTypeOptions: tableTypeOptions,
          eventUpdateFields: [{
            columnCount: 3,
            fields: [
              { field: 'transactionCode', label: '交易名称', type: 'select', options: transCodeOptions },
              { field: 'eventPriority', label: '优先级' }
            ]
          }],
          eventUpdateButtons: [
            {
              label: '确定',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.eventform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var instanceObj = _self.$options.ncmpobj.instanceObj;
                yufp.service.request({
                  method: 'GET',
                  url: backend.adminService + '/api/marketplan/getplanbyid',
                  data: {
                    flowId: instanceObj.flowId
                  },
                  callback: function (code, message, response) {
                    var plan = response.data;
                    model.eventId = instanceObj.nodeId;
                    model.assemblyId = instanceObj.assemblyId;
                    model.eventName = plan.activityName;
                    model.beginDate = plan.startDate.substr(0, 10);
                    model.endDate = plan.endDate.substr(0, 10);
                    model.transactionType = '2';
                    yufp.service.request({
                      method: 'POST',
                      url: backend.adminService + '/api/cmfrceventinfo/',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0) {
                          _self.$message('操作成功');
                          _self.eventUpdateButtons[0].hidden = true;
                          _self.eventUpdateButtons[1].hidden = false;
                          _self.ruleConfigFn();
                          _self.setEventName(response.data.eventName);
                        }
                      }
                    });
                  }
                });
              }
            },
            {
              label: '确定',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.eventform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var instanceObj = _self.$options.ncmpobj.instanceObj;
                yufp.service.request({
                  method: 'GET',
                  url: backend.adminService + '/api/marketplan/getplanbyid',
                  data: {
                    flowId: instanceObj.flowId
                  },
                  callback: function (code, message, response) {
                    var plan = response.data;
                    model.eventId = instanceObj.nodeId;
                    model.assemblyId = instanceObj.assemblyId;
                    model.eventName = plan.activityName;
                    model.beginDate = plan.startDate.substr(0, 10);
                    model.endDate = plan.endDate.substr(0, 10);
                    model.transactionType = '2';
                    yufp.service.request({
                      method: 'POST',
                      url: backend.adminService + '/api/cmfrceventinfo/update',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0) {
                          _self.$message('操作成功');
                          _self.ruleConfigFn();
                        }
                      }
                    });
                  }
                });
              }
            }
          ],
          eventFormDisabled: false,
          eventResultUrl: backend.adminService + '/api/cmfrcruleresultresource/resultlist',
          eventTableParams: {
            condition: JSON.stringify({
              eventId: _self.$options.ncmpobj.instanceObj.nodeId,
              actionType: 'PRODUCT'
            })
          },
          eventResultColumns: [
            { label: '事件名称', prop: 'eventName', width: 200 },
            { label: '话术', prop: 'tempContent' }
          ],
          eventResultUrlCare: backend.adminService + '/api/cmfrcruleresultresource/resultlist',
          eventResultColumnsCare: [
            { label: '事件名称', prop: 'eventName', width: 200 },
            { label: '话术', prop: 'tempContent' }
          ],
          eventResultUrlRisk: backend.adminService + '/api/cmfrcruleresultresource/resultlist',
          eventResultColumnsRisk: [
            { label: '事件名称', prop: 'eventName', width: 200 },
            { label: '话术', prop: 'tempContent' }
          ],
          eventName: '',
          countSumOptions: countSumOptions,
          comboSelectOptions: comboSelectOptions,
          numDataOptions: numDataOptions,
          textOptions: textOptions,
          radioComboOptions: radioComboOptions,
          activeNames: ['1', '2', '3', '4'], // 条件字段
          activeNames1: ['1', '2', '3', '4'], // 规则配置
          // height: yufp.custom.viewSize().height,
          height: yufp.custom.viewSize().height - 10,
          conditionlist: [], // 条件字段
          parameterlist: [], // 引用参数
          continuitylist: [], // 连续动作
          actionlist: [], // 营销动作
          conactionlist: [], // 连续动作
          title: '', // 拖拽当前条件字段title
          field: '', // 拖拽当前条件字段Field
          variableType: '', // 变量类型
          conditionpart: '',
          titleparameter: '', // 拖拽当前引用参数title
          titlemaction: '', // 拖拽当前营销动作title
          radio: '1',
          conditionSection: '',
          conditionState: '0', // 判断条件字段是否可拖拽 默认不可 获取title值才为1
          parameterState: '0', // 判断规则配置是否可拖拽 默认不可 获取title值才为1
          actionState: '0', // 判断连续动作是否可拖拽 默认不可 获取title值才为1
          dropshow: false, // 隐藏条件字段一级拖拽框
          dropparametershow: false, // 隐藏引用参数一级拖拽框
          dropactionshow: false, // 隐藏连续动作一级拖拽框
          productsShow: false,
          risksShow: false,
          customercaresShow: false,
          conproductsShow: false,
          conrisksShow: false,
          concustomercaresShow: false,
          conditionField: [], // 条件字段标签
          parameterField: [], // 引用参数
          continuityactionField: [], // 连续动作
          actionField: [// 营销动作标签
            { title: '营销产品', state: '0' },
            { title: '关注风险', state: '0' },
            { title: '客户关怀', state: '0' }
          ],
          viewDialogVisible: false,
          modelViewTitle: '', // 模板dialog标题
          applType: '', // 动作类型
          modelqueryFields: [
            { placeholder: '模板名称', field: 'modelName', type: 'input' }
          ],
          modelqueryButtons: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  model.applyType = _self.applType;
                  var param = { condition: JSON.stringify(model) };
                  _self.$refs.modeltable.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          modeltableColumns: [
            { label: '模板名称', prop: 'modelName', width: '150' },
            { label: '模板内容', prop: 'modelInfo', width: '300' },
            { label: '是否启用', prop: 'isEnable', width: '70' },
            { label: '类别名称', prop: 'catlName', width: '90' },
            { label: '创建人', prop: 'creatUserName', width: '90' }
          ],
          tableColumns: [
            { label: '产品名称', prop: 'modelName' },
            {
              label: '操作',
              width: 150,
              template: function () {
                return '<template slot-scope="scope">\
                                  <el-button type="text" size="small" @click="_$event(\'custom-row-op\', scope, \'delete\')">删除</el-button>\
                              </template>';
              }
            }
          ],
          tableColumns1: [
            { label: '风险介绍', prop: 'modelName' },
            {
              label: '操作',
              width: 150,
              template: function () {
                return '<template slot-scope="scope">\
                                  <el-button type="text" size="small" @click="_$event(\'custom-row-op\', scope, \'delete\')">删除</el-button>\
                              </template>';
              }
            }
          ],
          tableColumns2: [
            { label: '关怀介绍', prop: 'modelName' },
            {
              label: '操作',
              width: 150,
              template: function () {
                return '<template slot-scope="scope">\
                                  <el-button type="text" size="small" @click="_$event(\'custom-row-op\', scope, \'delete\')">删除</el-button>\
                              </template>';
              }
            }
          ],
          productsdata: [],
          caresdata: [],
          risksdata: [],
          conproductsdata: [],
          concaresdata: [],
          conrisksdata: [],
          activeName: 'PRODUCT',
          activeName2: 'first'
        };
      },
      methods: {
        changeType: function (type) {
          var _this = this;
          this.objectType = type;
          for (var i = 0; i < _this.tableTypeOptions.length; i++) {
            if (type == _this.tableTypeOptions[i].key) {
              this.objectName = _this.tableTypeOptions[i].value;
            }
          }
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/transactioncategory/searchtranscode',
            // data: {
            //   transType: type
            // },
            callback: function (code, message, response) {
              var tab = response.data;
              _this.transCodeOptions = [];
              for (var i = 0; i < tab.length; i++) {
                var option = {};
                option.key = tab[i].key;
                option.value = tab[i].value;
                option.tableEName = tab[i].tableEName;
                _this.transCodeOptions.push(option);
              }
            }
          });
        },
        // 新增事件
        addEventFn: function () {
          var _self = this;
          _self.switchStatus('ADD', true);
          _self.$nextTick(function () {
            _self.$refs.eventform.resetFields();
          });
        },
        reset: function () {
        },
        save: function () {
          var validate = false;
          this.$refs.myform.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
        },
        close: function () {
          this.$options.ncmpobj.close();
        },
        setEventName: function (eventName) {
          this.eventName = eventName;
        },
        // 规则配置开始
        ruleConfigFn: function () {
          var _this = this;
          var transactionCode = _this.$refs.eventform.formModel.transactionCode;
          var eventId = _this.$options.ncmpobj.instanceObj.nodeId;
          // 条件字段
          var param = {
            condition: JSON.stringify({
              transactionCode: transactionCode
            })
          };
          _this.conditionField = [];
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cmfrceventconfig/querytranscode',
            data: param,
            callback: function (code, message, response) {
              var data = response.data;
              for (var i = 0; i < data.length; i++) {
                _this.getConditionField(_this.conditionField, data[i]);
              }
              // _this.backCondition(eventId);
            }
          });
          // 引用参数
          _this.parameterField = [];
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cmfrceventconfig/queryruleparams',
            callback: function (code, message, response) {
              var params = response.data;
              for (var i = 0; i < params.length; i++) {
                _this.getConditionField(_this.parameterField, params[i]);
              }
            }
          });
        },
        backCondition: function (eventId) {
          var _this = this;
          _this.continuitylist = [];
          // 反显连续动作
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cmfrceventconfig/queryconcomparison',
            data: {
              eventId: eventId
            },
            callback: function (code, message, response) {
              var params = response.data;
              for (var i = 0; i < params.length; i++) {
                _this.setEventConfig(_this.continuitylist, _this.conditionField, params[i]);
              }
            }
          });
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cmfrceventconfig/queryaction',
            data: {
              eventId: eventId
            },
            callback: function (code, message, response) {
              var params = response.data;
              for (var i = 0; i < params.length; i++) {
                if (params[i].actionType == 'CARE') {
                  yufp.service.request({
                    method: 'GET',
                    url: backend.adminService + '/api/cmfrceventconfig/querymodel',
                    data: {
                      actionId: params[i].id,
                      actionType: params[i].actionType
                    },
                    callback: function (code, message, response) {
                      for (var j = 0; j < response.data.length; j++) {
                        var model = {};
                        model.modelName = response.data[j].modelName;
                        model.careId = response.data[j].id;
                        model.tempType = '2';
                        model.actionClassify = response.data[j].actionClassify;
                        if (response.data[j].actionClassify == 'S') {
                          _this.caresdata.push(model);
                        } else {
                          _this.concaresdata.push(model);
                        }
                      }
                      if (_this.concaresdata.length > 0) {
                        _this.conactionlist.push({ 'title': '客户关怀' });
                        _this.concustomercaresShow = true;
                      }
                      if (_this.caresdata.length > 0) {
                        _this.actionlist.push({ 'title': '客户关怀' });
                        _this.customercaresShow = true;
                      }
                    }
                  });
                } else if (params[i].actionType == 'RISK') {
                  yufp.service.request({
                    method: 'GET',
                    url: backend.adminService + '/api/cmfrceventconfig/querymodel',
                    data: {
                      actionId: params[i].id,
                      actionType: params[i].actionType
                    },
                    callback: function (code, message, response) {
                      for (var j = 0; j < response.data.length; j++) {
                        var model = {};
                        model.modelName = response.data[j].modelName;
                        model.riskId = response.data[j].id;
                        model.tempType = '2';
                        model.actionClassify = response.data[j].actionClassify;
                        if (response.data[j].actionClassify == 'S') {
                          _this.risksdata.push(model);
                        } else {
                          _this.conrisksdata.push(model);
                        }
                      }
                      if (_this.conrisksdata.length > 0) {
                        _this.conactionlist.push({ 'title': '关注风险' });
                        _this.conrisksShow = true;
                      }
                      if (_this.risksdata.length > 0) {
                        _this.actionlist.push({ 'title': '关注风险' });
                        _this.risksShow = true;
                      }
                    }
                  });
                } else if (params[i].actionType == 'PRODUCT') {
                  yufp.service.request({
                    method: 'GET',
                    url: backend.adminService + '/api/cmfrceventconfig/querymodel',
                    data: {
                      actionId: params[i].id,
                      actionType: params[i].actionType
                    },
                    callback: function (code, message, response) {
                      for (var j = 0; j < response.data.length; j++) {
                        var model = {};
                        model.modelName = response.data[j].modelName;
                        model.proId = response.data[j].id;
                        model.tempType = '2';
                        model.actionClassify = response.data[j].actionClassify;
                        if (response.data[j].actionClassify == 'S') {
                          _this.productsdata.push(model);
                        } else {
                          _this.conproductsdata.push(model);
                        }
                      }
                      if (_this.conproductsdata.length > 0) {
                        _this.conactionlist.push({ 'title': '营销产品' });
                        _this.conproductsShow = true;
                      }
                      if (_this.productsdata.length > 0) {
                        _this.actionlist.push({ 'title': '营销产品' });
                        _this.productsShow = true;
                      }
                    }
                  });
                }
              }
            }
          });
          // _this.eventName = _this.$refs.eventform.formModel.eventName;
          // console.log('_this.eventName', this.eventName)
        },
        setFieldParam: function (configList, fieldList, comparison) { // 反显事件规则公共方法（条件字段、引用参数）
          var _this = this;
          var title = '';
          var options = [];
          for (var i = 0; i < fieldList.length; i++) {
            if (fieldList[i].field == comparison.variableName) {
              title = fieldList[i].title;
              options = fieldList[i].itempart[0][0].options;
              break;
            }
          }
          var radio = '3';
          if (comparison.colJoin != null) {
            radio = comparison.colJoin;
          }
          var comparisionValue = comparison.comparisionValue;
          var coms = comparisionValue.split('#@#');
          var selections = {};
          selections.ctype = 'select';
          selections.value = comparison.operator;
          var item = {};
          item.type = '';
          item.options = '';
          item.value = comparison.comparisionValue;
          var itempart = [[]];
          if (comparison.variableType == 1) { // 文本框
            selections.options = this.textOptions;
            item.ctype = 'input';
            itempart[0].push(item);
          } else if (comparison.variableType == '2') { // 数字框
            selections.options = this.numDataOptions;
            item.ctype = 'input';
            item.unit = '万元';
            item.value = coms[0];
            itempart[0].push(item);
            var item = {};
            item.type = '';
            item.options = '';
            item.ctype = 'input';
            item.unit = '万元';
            if (coms.length > 1) {
              item.value = coms[1];
            }
            itempart[0].push(item);
          } else if (comparison.variableType == '3') { // 日期框
            selections.options = this.numDataOptions;
            item.ctype = 'datepicker';
            item.type = 'date';// daterange
            item.value = coms[0];
            itempart[0].push(item);
            var item = {};
            item.ctype = 'datepicker';
            item.type = 'date';
            item.options = '';
            if (coms.length > 1) {
              item.value = coms[1];
            }
            itempart[0].push(item);
          } else if (comparison.variableType == '4') { // 下拉框
            selections.options = this.radioComboOptions;
            item.ctype = 'select';
            item.options = options;
            itempart[0].push(item);
          } else if (comparison.variableType == '5') { // 单选框
            selections.options = this.radioComboOptions;
            item.ctype = 'radio';
            item.options = options;
            itempart[0].push(item);
          } else if (comparison.variableType == '6') { // 多选框
            selections.options = this.comboSelectOptions;
            item.ctype = 'checkbox';
            item.options = options;
            item.value = coms;
            itempart[0].push(item);
          } else if (comparison.variableType == '7') { // 放大镜
            selections.options = this.comboSelectOptions;
            // item.ctype = field.fname;
            item.options = options;
            itempart[0].push(item);
          }
          _this.conditionSection = selections;
          _this.conditionpart = itempart;
          var conditionSection = yufp.clone(_this.conditionSection, {});
          var itempt = yufp.clone(_this.conditionpart, []);
          configList.push({ 'title': title, 'field': comparison.variableName, 'variableType': comparison.variableType, 'radio': radio, 'children': [], 'section': conditionSection, 'itempart': itempt });
        },
        setEventConfig: function (configList, fieldList, comparison) { // 反显事件规则公共方法（连续动作）
          var _this = this;
          var title = '';
          for (var i = 0; i < fieldList.length; i++) {
            if (fieldList[i].field == comparison.variableName) {
              title = fieldList[i].title;
              break;
            }
          }
          var selections = {};
          selections.ctype = 'select';
          selections.options = _this.countSumOptions;
          var comparisionValue = comparison.comparisionValue;
          var coms = comparisionValue.split('#@#');
          var item = {};
          item.ctype = 'input';
          item.type = '';
          item.options = '';
          item.value = coms[0];
          var itempart = [[]];
          if (comparison.variableType == 2) {
            item.unit = '万元';
            itempart[0].push(item);
            var item = {};
            item.ctype = 'input';
            item.type = '';
            item.options = '';
            item.unit = '天';
            if (coms.length > 1) {
              item.value = coms[1];
            }
            itempart[0].push(item);
          } else {
            item.unit = '次';
            itempart[0].push(item);
            var item = {};
            item.ctype = 'input';
            item.type = '';
            item.options = '';
            item.unit = '天';
            if (coms.length > 1) {
              item.value = coms[1];
            }
            itempart[0].push(item);
          }
          _this.conditionpart = itempart;
          var itempt = yufp.clone(_this.conditionpart, []);
          selections.value = comparison.operator;
          _this.conditionSection = selections;
          var conditionSection = yufp.clone(_this.conditionSection, {});
          configList.push({ 'title': title, 'field': comparison.variableName, 'variableType': comparison.variableType, 'radio': '3', 'children': [], 'section': conditionSection, 'itempart': itempt });
        },
        // 获取字段并设置属性
        getConditionField: function (arr, field) {
          var obj = {};
          var selection = {};
          var itempart = [[]];
          var item = {};
          obj.title = field.fieldCName;// 变量中文名
          obj.field = field.fieldEName;// 变量英文名
          obj.state = '0';
          selection.ctype = 'select';
          item.type = '';
          item.options = '';
          item.unit = '';
          obj.variableType = field.fieldType;// 变量类型
          if (field.fieldType == '1') { // 文本框
            selection.options = this.textOptions;
            item.ctype = 'input';
          } else if (field.fieldType == '2') { // 数字框
            selection.options = this.numDataOptions;
            item.ctype = 'input';
            item.unit = '万元';
            itempart[0].push(item);
          } else if (field.fieldType == '3') { // 日期框
            selection.options = this.numDataOptions;
            item.ctype = 'datepicker';
            item.type = 'date';// daterange
            itempart[0].push(item);
          } else if (field.fieldType == '4') { // 下拉框
            selection.options = this.radioComboOptions;
            item.ctype = 'select';
            yufp.lookup.bind(field.fname, function (data) {
              item.options = data;
            });
          } else if (field.fieldType == '5') { // 单选框
            selection.options = this.radioComboOptions;
            item.ctype = 'radio';
            yufp.lookup.bind(field.fname, function (data) {
              item.options = data;
            });
          } else if (field.fieldType == '6') { // 多选框
            selection.options = this.comboSelectOptions;
            item.ctype = 'checkbox';
            yufp.lookup.bind(field.fname, function (data) {
              item.options = data;
            });
          } else if (field.fieldType == '7') { // 放大镜
            selection.options = this.comboSelectOptions;
            item.ctype = field.magnifier;
          }
          itempart[0].push(item);
          obj.section = selection;
          obj.itempart = itempart;
          arr.push(obj);
        },
        addsectionFun: function (itempart) { // 新增区间
          // var _this = this;
          var itemPart = yufp.clone(itempart[0], []);
          itempart.push(itemPart);
        },
        // 删除产品动作内容
        customRowOpProducts: function (scope, op) {
          for (var i = 0; i < this.productsdata.length; i++) {
            if (this.productsdata[i].modelName == scope.row.modelName) {
              this.productsdata.splice(i, 1);
            }
          }
        },
        // 删除风险动作内容
        customRowOpRisks: function (scope, op) {
          for (var i = 0; i < this.risksdata.length; i++) {
            if (this.risksdata[i].modelName == scope.row.modelName) {
              this.risksdata.splice(i, 1);
            }
          }
        },
        // 删除关怀动作内容
        customRowOpCaresdata: function (scope, op) {
          for (var i = 0; i < this.caresdata.length; i++) {
            if (this.caresdata[i].modelName == scope.row.modelName) {
              this.caresdata.splice(i, 1);
            }
          }
        },
        // 删除产品动作内容
        concustomRowOpProducts: function (scope, op) {
          for (var i = 0; i < this.conproductsdata.length; i++) {
            if (this.conproductsdata[i].modelName == scope.row.modelName) {
              this.conproductsdata.splice(i, 1);
            }
          }
        },
        // 删除风险动作内容
        concustomRowOpRisks: function (scope, op) {
          for (var i = 0; i < this.conrisksdata.length; i++) {
            if (this.conrisksdata[i].modelName == scope.row.modelName) {
              this.conrisksdata.splice(i, 1);
            }
          }
        },
        // 删除关怀动作内容
        concustomRowOpCaresdata: function (scope, op) {
          for (var i = 0; i < this.concaresdata.length; i++) {
            if (this.concaresdata[i].modelName == scope.row.modelName) {
              this.concaresdata.splice(i, 1);
            }
          }
        },
        allowDropover: function (event) {
          event.preventDefault();
        },
        //           条件字段
        drag: function (ev, i, array) { // 拖拽开始获取节点名称 条件字段  左侧标签
          var _this = this;
          _this.title = ev.target.innerText;
          _this.field = i.field;
          _this.variableType = i.variableType;
          _this.conditionpart = i.itempart;
          _this.conditionSection = i.section;
          if (array == _this.conditionField) {
            _this.dropshow = true; // 拖拽一级字段状态是否展示 -是-
            _this.conditionState = '1';
            _this.dropactionshow = true; // 拖拽一级字段状态是否展示 -是-
            _this.actionState = '1';
          } else if (array == _this.parameterField) {
            _this.dropparametershow = true; // 拖拽一级字段状态是否展示 -是-
            _this.parameterState = '1';
          } /* else if (array == _this.continuityactionField) {
            _this.dropactionshow = true; // 拖拽一级字段状态是否展示 -是-
            _this.actionState = '1';
          } */
          // console.log(_this.actionState);
        },
        dragend: function (ev, i, array) { // 拖拽节点结束  条件字段  左侧标签
          var _this = this;
          if (array == _this.conditionField) {
            _this.dropshow = false;// 拖拽一级字段状态是否展示 -否-
            _this.dropactionshow = false;// 拖拽一级字段状态是否展示 -否-
          } else if (array == _this.parameterField) {
            _this.dropparametershow = false;// 拖拽一级字段状态是否展示 -否-
          } /* else if (array == _this.continuityactionField) {
            _this.dropactionshow = false;// 拖拽一级字段状态是否展示 -否-
          } */
        },
        drag1: function (i, array) { // 拖拽字段   右侧字段容器
          var _this = this;
          _this.title = i.title;// 获取一级字段的title值
          _this.field = i.field;
          _this.variableType = i.variableType;
          _this.conditionSection = i.section;
          _this.conditionpart = i.itempart;
          if (array == _this.conditionlist) {
            _this.dropshow = true;// 拖拽一级字段状态是否展示 -是-
            _this.conditionState = '1';
            _this.actionState = '1';
          } else if (array == _this.parameterlist) {
            _this.dropparametershow = true;// 拖拽一级字段状态是否展示 -是-
            _this.parameterState = '1';
          } else if (array == _this.continuitylist) {
            _this.dropactionshow = true;
            _this.actionState = '1';
          }
        },
        allowDrop: function (event, array, arrayname) { // 拖拽生成一级字段节点
          var _this = this;
          if (arrayname == _this.conditionlist) {
            _this.parameterState = '0';
          } else if (arrayname == _this.parameterlist) {
            _this.conditionState = '0';
            _this.actionState = '0';
          } else if (arrayname == _this.continuitylist) {
            _this.parameterState = '0';
            _this.conditionState = '0';
          }
          if (_this.conditionState == '1' && _this.parameterState == '0' && _this.actionState == '1') {
            _this.dropfun(array);
            for (var b in _this.conditionField) {
              if (_this.conditionField[b].title == _this.title) {
                _this.conditionField[b].state = '1'; // 生成节点同时给左侧标点给点亮状态
              }
            }
            _this.conditionState = '0';
            _this.actionState = '0';
          } else if (_this.parameterState == '1' && _this.conditionState == '0' && _this.actionState == '0') {
            _this.dropfun(array);
            for (var b in _this.parameterField) {
              if (_this.parameterField[b].title == _this.title) {
                _this.parameterField[b].state = '1'; // 生成节点同时给左侧标点给点亮状态
              }
            }
            _this.parameterState = '0';
          } else if (_this.actionState == '1' && _this.parameterState == '0' && _this.conditionState == '0') {
            _this.dropActionFun(array);
            for (var b in _this.continuityactionField) {
              if (_this.continuityactionField[b].title == _this.title) {
                _this.continuityactionField[b].state = '1'; // 生成节点同时给左侧标点给点亮状态
              }
            }
            _this.actionState = '0';
          }
        },
        dropActionFun: function (array) { // 连续动作条件
          if (this.continuitylist.length > 0) {
            this.$message({ message: '只能设置一个连续条件！', type: 'warning' });
            return;
          }
          var _this = this;
          var selections = {};
          selections.ctype = 'select';
          selections.options = _this.countSumOptions;
          var item = {};
          item.ctype = 'input';
          item.type = '';
          item.options = '';
          var itempart = [[]];
          if (_this.variableType == 2) {
            item.unit = '万元';
            itempart[0].push(item);
            var item = {};
            item.ctype = 'input';
            item.type = '';
            item.options = '';
            item.unit = '天';
            itempart[0].push(item);
            _this.conditionpart = itempart;
            var itempt = yufp.clone(_this.conditionpart, []);
            selections.value = 'SUM';
            _this.conditionSection = selections;
            var conditionSection = yufp.clone(_this.conditionSection, {});
            array.push({ 'title': _this.title, 'field': _this.field, 'variableType': _this.variableType, 'radio': '3', 'children': [], 'section': conditionSection, 'itempart': itempt });
          } else {
            item.unit = '次';
            itempart[0].push(item);
            var item = {};
            item.ctype = 'input';
            item.type = '';
            item.options = '';
            item.unit = '天';
            itempart[0].push(item);
            _this.conditionpart = itempart;
            var itempt = yufp.clone(_this.conditionpart, []);
            selections.value = 'COUNT';
            _this.conditionSection = selections;
            var conditionSection = yufp.clone(_this.conditionSection, {});
            array.push({ 'title': _this.title, 'field': _this.field, 'variableType': _this.variableType, 'radio': '3', 'children': [], 'section': conditionSection, 'itempart': itempt });
          }
        },
        dropfun: function (array) {
          var _this = this;
          var conditionSection = yufp.clone(_this.conditionSection, {});
          var itempt = yufp.clone(_this.conditionpart, []);
          array.push({ 'title': _this.title, 'field': _this.field, 'variableType': _this.variableType, 'radio': '3', 'children': [], 'section': conditionSection, 'itempart': itempt });
        },
        delfirstitem: function (item, i, title, array) { // 删除第一级节点
          var _this = this;
          if (array == _this.conditionlist) {
            _this.dropshow = false;
          } else if (array == _this.parameterlist) {
            _this.dropparametershow = false;
          } else if (array == _this.continuitylist) {
            _this.continuitylist = [];
            _this.dropactionshow = false;
          }
          if (item.children.length == '0') {
            array.splice(i, 1);
          } else {
            item.title = '';
            item.field = '';
            item.variableType = '';
            item.section = '';
            item.itempart = '';
            delete item.children[0].radio;
          };
          _this.dislodgestylefun(title, array);
        },
        delItemfun: function (index, c, i1, title, array) { // 删除第二级节点
          var _this = this;
          if (array == _this.conditionlist) {
            _this.dropshow = false;
          } else if (array == _this.parameterlist) {
            _this.dropparametershow = false;
          } else if (array == _this.continuitylist) {
            _this.dropactionshow = false;
          }
          if (c.children[index].children.length == '0') {
            if (c.title == '') {
              if (c.children.length == '1') {
                array.splice(i1, 1);
              } else {
                if (index == '0') {
                  c.children.splice(index, 1);
                  delete c.children[0].radio;
                } else {
                  c.children.splice(index, 1);
                }
              }
            } else {
              c.children.splice(index, 1);
            };
          } else {
            c.children[index].title = '';
            c.children[index].field = '';
            c.children[index].variableType = '';
            c.children[index].section = '';
            c.children[index].itempart = '';
            delete c.children[index].children[0].radio;
          }
          _this.dislodgestylefun(title, array);
        },
        delItem: function (c, i, index, ci, title, array) { // 删除第三级节点
          var _this = this;
          if (array == _this.conditionlist) {
            _this.dropshow = false;
          } else if (array == _this.parameterlist) {
            _this.dropparametershow = false;
          } else if (array == _this.continuitylist) {
            _this.dropactionshow = false;
          }
          if (i.title == '') {
            if (i.children.length == '1') {
              if (c.children[0] == i && c.title == '') {
                if (c.children.length > '1') {
                  c.children.splice(i, 1);
                  delete c.children[0].radio;
                } else {
                  array.splice(ci, 1);
                }
              } else {
                c.children.splice(i, 1);
              }
            } else {
              if (index == '0') {
                i.children.splice(index, 1);
                delete i.children[0].radio;
              } else {
                i.children.splice(index, 1);
              }
            }
          } else {
            i.children.splice(index, 1);
          }
          _this.dislodgestylefun(title, array);
        },
        dislodgestylefun: function (title, array) { // 清除左侧标签样式
          var _this = this;
          var str;
          if (array == _this.conditionlist) {
            str = JSON.stringify(_this.conditionlist);
            if (str.indexOf(title) == '-1') {
              for (var b in _this.conditionField) {
                if (_this.conditionField[b].title == title) {
                  _this.conditionField[b].state = '0';
                }
              }
            }
          } else if (array == _this.parameterlist) {
            str = JSON.stringify(_this.parameterlist);
            if (str.indexOf(title) == '-1') {
              for (var b in _this.parameterField) {
                if (_this.parameterField[b].title == title) {
                  _this.parameterField[b].state = '0';
                }
              }
            }
          } else if (array == _this.continuitylist) {
            str = JSON.stringify(_this.continuitylist);
            if (str.indexOf(title) == '-1') {
              for (var b in _this.continuityactionField) {
                if (_this.continuityactionField[b].title == title) {
                  _this.continuityactionField[b].state = '0';
                }
              }
            }
          }
        },
        lastdrop: function () {
          this.$message({
            message: '条件字段只支持三级',
            type: 'warning'
          });
        },
        //          条件字段

        //          营销动作
        dragmarketingaction: function (ev, i) {
          var _this = this;
          _this.titlemaction = ev.target.innerText;
        },
        dragendmarketingaction: function (ev, i) {

        },
        allowDropMarketingaction: function (event) {
          var _this = this;
          if (_this.activeName2 == 'first') {
            _this.actionlist.push({ 'title': _this.titlemaction });
            switch (_this.titlemaction) {
              case '营销产品':
                _this.productsShow = true;
                _this.productsdata = [];
                break;
              case '关注风险':
                _this.risksShow = true;
                _this.risksdata = [];
                break;
              case '客户关怀':
                _this.customercaresShow = true;
                _this.caresdata = [];
                break;
            }
          } else if (_this.activeName2 == 'second') {
            _this.conactionlist.push({ 'title': _this.titlemaction });
            switch (_this.titlemaction) {
              case '营销产品':
                _this.conproductsShow = true;
                _this.conproductsdata = [];
                break;
              case '关注风险':
                _this.conrisksShow = true;
                _this.conrisksdata = [];
                break;
              case '客户关怀':
                _this.concustomercaresShow = true;
                _this.concaresdata = [];
                break;
            }
          }
          for (var b in _this.actionField) {
            if (_this.actionField[b].title == _this.titlemaction) {
              _this.actionField[b].state = '1'; // 生成节点同时给左侧标点给点亮状态
            }
          }
        },
        delproducts: function () { // 删除营销产品
          var _this = this;
          _this.actionField[0].state = '0';
          for (var a in _this.actionlist) {
            if (_this.actionlist[a].title == '营销产品') {
              _this.actionlist.splice(a, 1); // 从actionlist数组中删除营销产品
              _this.productsShow = false; // 把表格隐藏
            }
          }
        },
        delrisks: function () { // 删除关注风险
          var _this = this;
          _this.actionField[1].state = '0';
          for (var a in _this.actionlist) {
            if (_this.actionlist[a].title == '关注风险') {
              _this.actionlist.splice(a, 1); // 从actionlist数组中删除关注风险
              _this.risksShow = false; // 把表格隐藏
            }
          }
        },
        delcares: function () { // 删除客户关怀
          var _this = this;
          _this.actionField[2].state = '0';
          for (var a in _this.actionlist) {
            if (_this.actionlist[a].title == '客户关怀') {
              _this.actionlist.splice(a, 1); // 从actionlist数组中删除客户关怀
              _this.customercaresShow = false; // 把表格隐藏
            }
          }
        },
        condelproducts: function () { // 删除营销产品
          var _this = this;
          _this.actionField[0].state = '0';
          for (var a in _this.conactionlist) {
            if (_this.conactionlist[a].title == '营销产品') {
              _this.conactionlist.splice(a, 1); // 从actionlist数组中删除营销产品
              _this.conproductsShow = false; // 把表格隐藏
            }
          }
        },
        condelrisks: function () { // 删除关注风险
          var _this = this;
          _this.actionField[1].state = '0';
          for (var a in _this.conactionlist) {
            if (_this.conactionlist[a].title == '关注风险') {
              _this.conactionlist.splice(a, 1); // 从actionlist数组中删除关注风险
              _this.conrisksShow = false; // 把表格隐藏
            }
          }
        },
        condelcares: function () { // 删除客户关怀
          var _this = this;
          _this.actionField[2].state = '0';
          for (var a in _this.conactionlist) {
            if (_this.conactionlist[a].title == '客户关怀') {
              _this.conactionlist.splice(a, 1); // 从actionlist数组中删除客户关怀
              _this.concustomercaresShow = false; // 把表格隐藏
            }
          }
        },
        getSaveListFn: function (savelist, rulelist, comparisionType) { // 获取要保存的list的公共方法
          var condition = '';
          var eventId = this.$options.ncmpobj.instanceObj.nodeId;
          for (var i = 0; i < rulelist.length; i++) {
            var saveobj = {};
            if (rulelist[i].field == '') {
              break;
            }
            saveobj.variableName = rulelist[i].field;// 变量名
            saveobj.operator = rulelist[i].section.value;// 运算符
            saveobj.variableType = rulelist[i].variableType;// 变量类型
            saveobj.comparisionType = comparisionType;// 类型（条件字段、引用参数）
            saveobj.colOrder = i;
            saveobj.colGorder = i;
            saveobj.eventId = eventId;
            if (rulelist[i].children.length > 0) {
              saveobj.colJoin = '';// 内连接
              saveobj.colGjoin = rulelist[i].radio == '3' ? '' : rulelist[i].radio;// 外连接
            } else {
              saveobj.colJoin = rulelist[i].radio == '3' ? '' : rulelist[i].radio;// 内连接
              saveobj.colGjoin = '';// 外连接
            }
            if (!condition == '') {
              if (saveobj.colGjoin == '2') {
                condition += ' ' + '||' + ' ';
              } else if (saveobj.colGjoin == '1') {
                condition += ' ' + '&&' + ' ';
              } else {
                if (saveobj.colJoin == '2') {
                  condition += ' ' + '||' + ' ';
                } else if (saveobj.colJoin == '1') {
                  condition += ' ' + '&&' + ' ';
                }
              }
            }
            var value = '';
            for (var a = 0; a < rulelist[i].itempart.length; a++) {
              var values = '';
              for (var b = 0; b < rulelist[i].itempart[a].length; b++) {
                if (values != '') {
                  if (rulelist[i].itempart[a][b].value != undefined) {
                    values = values + '#@#' + rulelist[i].itempart[a][b].value;
                  }
                } else {
                  if (Array.isArray(rulelist[i].itempart[a][b].value)) {
                    for (var ab = 0; ab < rulelist[i].itempart[a][b].value.length; ab++) {
                      if (ab == 0) {
                        values = rulelist[i].itempart[a][b].value[ab];
                      } else {
                        values = values + '#@#' + rulelist[i].itempart[a][b].value[ab];
                      }
                    }
                  } else {
                    values = rulelist[i].itempart[a][b].value;
                  }
                }
              }
              if (value != '') {
                value = value + ',' + values;
              } else {
                value = values;
              }
            }
            saveobj.comparisionValue = value;// 比较值
            savelist.push(saveobj);
            condition += '(' + ' ' + this.getOperator(saveobj.variableName, saveobj.operator, saveobj.variableType, value); // saveobj.variableName + ' ' + saveobj.operator + ' ' + value;
            var secCondi = '';
            for (var c = 0; c < rulelist[i].children.length; c++) {
              var saveobj = {};
              saveobj.variableName = rulelist[i].children[c].field;// 变量名
              saveobj.operator = rulelist[i].children[c].section.value;// 运算符
              saveobj.variableType = rulelist[i].children[c].variableType;// 变量类型
              saveobj.comparisionType = comparisionType;// 类型（条件字段、引用参数）
              saveobj.colOrder = c;
              saveobj.colGorder = i;
              saveobj.eventId = eventId;
              if (rulelist[i].children[c].children.length > 0) {
                saveobj.colJoin = rulelist[i].radio == '3' ? '' : rulelist[i].radio;// 内连接
                saveobj.colGjoin = rulelist[i].children[c].radio;// 外连接
                if (saveobj.colGjoin == '2') {
                  secCondi += ' ' + '||' + ' ( ';
                } else if (saveobj.colGjoin == '1') {
                  secCondi += ' ' + '&&' + ' ( ';
                }
              } else {
                saveobj.colJoin = rulelist[i].children[c].radio;// 内连接
                saveobj.colGjoin = rulelist[i].radio == '3' ? '' : rulelist[i].radio;// 外连接
                if (saveobj.colJoin == '2') {
                  secCondi += ' ' + '||' + ' ';
                } else if (saveobj.colJoin == '1') {
                  secCondi += ' ' + '&&' + ' ';
                }
              }
              var value = '';
              for (var a = 0; a < rulelist[i].children[c].itempart.length; a++) {
                var values = '';
                for (var b = 0; b < rulelist[i].children[c].itempart[a].length; b++) {
                  if (values != '') {
                    if (rulelist[i].children[c].itempart[a][b].value != undefined) {
                      values = values + '#@#' + rulelist[i].children[c].itempart[a][b].value;
                    }
                  } else {
                    if (Array.isArray(rulelist[i].children[c].itempart[a][b].value)) {
                      for (var ab = 0; ab < rulelist[i].children[c].itempart[a][b].value.length; ab++) {
                        if (ab == 0) {
                          values = rulelist[i].children[c].itempart[a][b].value[ab];
                        } else {
                          values = values + '#@#' + rulelist[i].children[c].itempart[a][b].value[ab];
                        }
                      }
                    } else {
                      values = rulelist[i].children[c].itempart[a][b].value;
                    }
                  }
                }
                if (value != '') {
                  value = value + ',' + values;
                } else {
                  value = values;
                }
              }
              saveobj.comparisionValue = value;// 比较值
              savelist.push(saveobj);
              secCondi += ' ' + this.getOperator(saveobj.variableName, saveobj.operator, saveobj.variableType, value);// saveobj.variableName + ' ' + saveobj.operator + ' ' + value;
              var innerCondi = '';
              for (var a = 0; a < rulelist[i].children[c].children.length; a++) {
                var saveobj = {};
                saveobj.variableName = rulelist[i].children[c].children[a].field;// 变量名
                saveobj.operator = rulelist[i].children[c].children[a].section.value;// 运算符
                saveobj.variableType = rulelist[i].children[c].children[a].variableType;// 变量类型
                saveobj.comparisionType = comparisionType;// 类型（条件字段、引用参数）
                saveobj.colJoin = rulelist[i].children[c].children[a].radio;// 内连接
                saveobj.colGjoin = rulelist[i].children[c].radio;// 外连接
                saveobj.colOrder = a;
                saveobj.colGorder = c;
                saveobj.eventId = eventId;
                var value = '';
                for (var d = 0; d < rulelist[i].children[c].children[a].itempart.length; d++) {
                  var values = '';
                  for (var b = 0; b < rulelist[i].children[c].children[a].itempart[d].length; b++) {
                    if (values != '') {
                      if (rulelist[i].children[c].children[a].itempart[d][b].value != undefined) {
                        values = values + '#@#' + rulelist[i].children[c].children[a].itempart[d][b].value;
                      }
                    } else {
                      if (Array.isArray(rulelist[i].children[c].children[a].itempart[d][b].value)) {
                        for (var ab = 0; ab < rulelist[i].children[c].children[a].itempart[d][b].value.length; ab++) {
                          if (ab == 0) {
                            values = rulelist[i].children[c].children[a].itempart[d][b].value[ab];
                          } else {
                            values = values + '#@#' + rulelist[i].children[c].children[a].itempart[d][b].value[ab];
                          }
                        }
                      } else {
                        values = rulelist[i].children[c].children[a].itempart[d][b].value;
                      }
                    }
                  }
                  if (value != '') {
                    value = value + ',' + values;
                  } else {
                    value = values;
                  }
                }
                if (!innerCondi == '') {
                  if (saveobj.colJoin == '2') {
                    innerCondi += ' ' + '||' + ' ';
                  } else if (saveobj.colJoin == '1') {
                    innerCondi += ' ' + '&&' + ' ';
                  }
                }
                if (saveobj.colJoin !== '') {
                  if (saveobj.colJoin == '2') {
                    innerCondi += ' ' + '||' + ' ';
                  } else if (saveobj.colJoin == '1') {
                    innerCondi += ' ' + '&&' + ' ';
                  }
                } else {
                  if (saveobj.colGjoin == '2') {
                    innerCondi += ' ' + '||' + ' ';
                  } else if (saveobj.colGjoin == '1') {
                    innerCondi += ' ' + '&&' + ' ';
                  }
                }
                saveobj.comparisionValue = value;// 比较值
                savelist.push(saveobj);
                innerCondi += ' ' + this.getOperator(saveobj.variableName, saveobj.operator, saveobj.variableType, value);// saveobj.variableName + ' ' + saveobj.operator + ' ' + value;
              }
              condition += secCondi;
              if (innerCondi != '') {
                condition += innerCondi + ')';
              }
            }
            condition += ')';
          }
          return condition;
        },
        // 拼接表达式
        getOperator: function (field, operator, variableType, value) {
          var expression = '';
          if (variableType == 1) {
            if (operator == 1) {
              expression = '@' + field + ' = ' + '\'' + value + '\'';
            } else if (operator == 2) {
              expression = '@' + field + ' != ' + '\'' + value + '\'';
            } else if (operator == 3) {
              expression = '@' + field + ' like ' + '\'%' + value + '%\'';
            } else if (operator == 4) {
              expression = '@' + field + ' not like ' + '\'%' + value + '%\'';
            } else if (operator == 5) {
              expression = '@' + field + ' >= ' + '\'%' + value + '%\'';
            } else if (operator == 6) {
              expression = '@' + field + ' <= ' + '\'%' + value + '%\'';
            }
          } else if (variableType == 2) {
            var values = value.split('#@#');
            if (operator == 1) {
              expression = '@' + field + ' = ' + values[0];
            } else if (operator == 2) {
              expression = '@' + field + ' != ' + values[0];
            } else if (operator == 3) {
              expression = '@' + field + ' > ' + values[0];
            } else if (operator == 4) {
              expression = '@' + field + ' >= ' + values[0];
            } else if (operator == 5) {
              expression = '@' + field + ' < ' + values[0];
            } else if (operator == 6) {
              expression = '@' + field + ' <= ' + values[0];
            } else if (operator == 7) {
              expression = '(' + '@' + field + ' >= ' + values[0] + ' && ' + '@' + field + ' <= ' + values[1] + ')';
            } else if (operator == 8) {
              expression = '(' + '@' + field + ' > ' + values[0] + ' && ' + '@' + field + ' < ' + values[1] + ')';
            } else if (operator == 9) {
              expression = '(' + '@' + field + ' <= ' + values[0] + ' || ' + '@' + field + ' >= ' + values[1] + ')';
            } else if (operator == 10) {
              expression = '(' + '@' + field + ' < ' + values[0] + ' || ' + '@' + field + ' > ' + values[1] + ')';
            }
          } else if (variableType == 3) {
            var values = value.split('#@#');
            if (operator == 1) {
              expression = '@' + field + ' = ' + values[0];
            } else if (operator == 2) {
              expression = '@' + field + ' != ' + values[0];
            } else if (operator == 3) {
              expression = '@' + field + ' > ' + values[0];
            } else if (operator == 4) {
              expression = '@' + field + ' >= ' + values[0];
            } else if (operator == 5) {
              expression = '@' + field + ' < ' + values[0];
            } else if (operator == 6) {
              expression = '@' + field + ' <= ' + values[0];
            } else if (operator == 7) {
              expression = '(' + '@' + field + ' >= ' + values[0] + ' && ' + '@' + field + ' <= ' + values[1] + ')';
            } else if (operator == 8) {
              expression = '(' + '@' + field + ' > ' + values[0] + ' && ' + '@' + field + ' < ' + values[1] + ')';
            } else if (operator == 9) {
              expression = '(' + '@' + field + ' <= ' + values[0] + ' || ' + '@' + field + ' >= ' + values[1] + ')';
            } else if (operator == 10) {
              expression = '(' + '@' + field + ' < ' + values[0] + ' || ' + '@' + field + ' > ' + values[1] + ')';
            }
          } else if (variableType == 4) {
            if (operator == 1) {
              expression = '@' + field + ' = ' + value;
            }
          } else if (variableType == 5) {
            if (operator == 1) {
              expression = '@' + field + ' = ' + value;
            }
          } else if (variableType == 6) {
            var values = value.split('#@#');
            var val = '';
            if (Array.isArray(values)) {
              for (var a = 0; a < values.length; a++) {
                if (a == 0) {
                  val = '\'' + values[a] + '\'';
                } else {
                  val = val + ',' + '\'' + values[a] + '\'';
                }
              }
            }
            if (operator == 1) {
              expression = '@' + field + ' in ' + '(' + val + ')';
            } else if (operator == 2) {
              expression = '@' + field + ' not in ' + '(' + val + ')';
            }
          } else if (variableType == 7) {
            if (operator == 1) {
              expression = '@' + field + ' like ' + '\'%' + value + '%\'';
            } else if (operator == 2) {
              expression = '@' + field + ' not like ' + '\'%' + value + '%\'';
            }
          }
          return expression;
        },
        savefun: function () { // 保存事件规则配置
          var _this = this;
          this.getOperator(1, 2);
          var _this = this;
          var savelist = [];
          var saveCondi = '';
          var condi = '', paramCondi = '';
          if (_this.conditionlist.length > 0) {
            condi = _this.getSaveListFn(savelist, _this.conditionlist, '1');// 要保存的list、需要取值的list、类型
          }
          if (_this.parameterlist.length > 0) {
            paramCondi = _this.getSaveListFn(savelist, _this.parameterlist, '2');
          }
          if (condi != '' && paramCondi == '') {
            saveCondi = condi;
          } else if (paramCondi != '' && condi == '') {
            saveCondi = paramCondi;
          } else if (condi != '' && paramCondi != '') {
            saveCondi = '(' + condi + ') && (' + paramCondi + ')';
          }
          if (savelist.length == 0) {
            _this.$message({ message: '请先设置规则', type: 'warning' });
          } else {
            var conlist = [];
            for (var i = 0; i < _this.continuitylist.length; i++) {
              var saveobj = {};
              if (_this.continuitylist[i].field == '') {
                break;
              }
              saveobj.variableName = _this.continuitylist[i].field;// 变量名
              saveobj.operator = _this.continuitylist[i].section.value;// 运算符
              saveobj.variableType = _this.continuitylist[i].variableType;// 变量类型
              saveobj.eventId = _this.$options.ncmpobj.instanceObj.nodeId;// 事件编号
              var value = '';
              for (var a = 0; a < _this.continuitylist[i].itempart.length; a++) {
                var values = '';
                for (var b = 0; b < _this.continuitylist[i].itempart[a].length; b++) {
                  if (values != '') {
                    values = values + '#@#' + _this.continuitylist[i].itempart[a][b].value;
                  } else {
                    values = _this.continuitylist[i].itempart[a][b].value;
                  }
                }
                if (value != '') {
                  value = value + ',' + values;
                } else {
                  value = values;
                }
              }
              saveobj.statisticalMethod = _this.continuitylist[i].section.value;
              saveobj.cycleType = '1';
              saveobj.comparisionValue = value;
              conlist.push(saveobj);
            }
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cmfrceventconfig/savecomparison',
              data: JSON.stringify(savelist),
              callback: function (code, message, response) {
                _this.$message({ message: '操作保存成功', type: 'success' });
              }
            });
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cmfrceventconfig/upeventinfo',
              data: {
                eventId: _this.$options.ncmpobj.instanceObj.nodeId,
                condition: saveCondi,
                ruleDesc: JSON.stringify(_this.conditionlist) + '#@#' + JSON.stringify(_this.parameterlist)
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  if (conlist.length < 1) {
                    _this.$message({ message: '操作保存成功', type: 'success' });
                  }
                }
              }
            });
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cmfrceventconfig/saveconcom/' + _this.$options.ncmpobj.instanceObj.nodeId,
              data: JSON.stringify(conlist),
              callback: function (code, message, response) {
                _this.$message({ message: '操作保存成功', type: 'success' });
              }
            });
            _this.saveAction();
          }
        },
        saveAction: function () { // 保存动作
          var _this = this;
          var careData = _this.caresdata.concat(_this.concaresdata);
          var riskData = _this.risksdata.concat(_this.conrisksdata);
          var proData = _this.productsdata.concat(_this.conproductsdata);
          var model = {};
          model.proActionList = proData;
          model.riskActionList = riskData;
          model.careActionList = careData;
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/cmfrceventconfig/marketactionoperation/' + _this.$options.ncmpobj.instanceObj.nodeId,
            data: model,
            callback: function (code, message, response) {
            }
          });

          // yufp.service.request({
          //   method: 'POST',
          //   url: backend.adminService + '/api/cmfrceventconfig/savecare/' + _this.$options.ncmpobj.instanceObj.nodeId,
          //   data: JSON.stringify(careData),
          //   callback: function (code, message, response) {
          //   }
          // });
          // yufp.service.request({
          //   method: 'POST',
          //   url: backend.adminService + '/api/cmfrceventconfig/saverisk/' + _this.$options.ncmpobj.instanceObj.nodeId,
          //   data: JSON.stringify(riskData),
          //   callback: function (code, message, response) {
          //   }
          // });
          // yufp.service.request({
          //   method: 'POST',
          //   url: backend.adminService + '/api/cmfrceventconfig/savepro/' + _this.$options.ncmpobj.instanceObj.nodeId,
          //   data: JSON.stringify(proData),
          //   callback: function (code, message, response) {
          //   }
          // });

          // yufp.service.request({
          //   method: 'POST',
          //   url: backend.adminService + '/api/cmfrceventconfig/deleteaction/',
          //   data: {
          //     eventId: _this.$options.ncmpobj.instanceObj.nodeId
          //   },
          //   callback: function (code, message, response) {
          //   }
          // });
        },
        closeDialog: function () { // dialog关闭动作
          this.resetRullConfig();
        },
        // 重置规则配置
        resetRullConfig: function () {
          this.conditionlist = [];
          this.parameterlist = []; // 引用参数
          this.continuitylist = []; // 连续动作
          this.productsShow = false;
          this.risksShow = false;
          this.customercaresShow = false;
          this.productsdata = [];
          this.caresdata = [];
          this.risksdata = [];
          this.conproductsShow = false;
          this.conrisksShow = false;
          this.concustomercaresShow = false;
          this.conproductsdata = [];
          this.concaresdata = [];
          this.conrisksdata = [];
        },
        // 取消方法
        returnFn: function () {
          this.resetRullConfig();
          this.ruleDialogVisible = false;
        },
        queryModelGridFn: function (applType) { // 模板查询
          var me = this;
          var param = {
            condition: JSON.stringify({
              applyType: applType
            })
          };
          me.$refs.modeltable.remoteData(param);
        },
        selectModel: function (type) { // 弹出模板
          if (type == 'CARE') {
            this.modelViewTitle = '客户关怀';
            this.applType = 'CARE';
          } else if (type == 'RISK') {
            this.modelViewTitle = '关注风险';
            this.applType = 'RISK';
          } else if (type == 'PRODUCT') {
            this.modelViewTitle = '营销产品';
            this.applType = 'PRODUCT';
          }
          this.$nextTick(function () {
            this.queryModelGridFn(this.applType);
          });
          this.viewDialogVisible = true;
        },
        checkModel: function () { // 选择模板
          if (this.$refs.modeltable.selections[0]) {
            if (this.activeName2 == 'first') {
              if (this.applType == 'CARE') {
                // 模板去重，先将已有的模板名称记录，再次选取时，已有的模板名称不再添加
                var careModelName = [];
                if (this.caresdata.length > 0) {
                  for (let j = 0; j < this.caresdata.length; j++) {
                    careModelName.push(this.caresdata[j].modelName);
                  }
                }
                for (var i = 0; i < this.$refs.modeltable.selections.length; i++) {
                  var obj = {};
                  obj.modelName = this.$refs.modeltable.selections[i].modelName;
                  obj.careId = this.$refs.modeltable.selections[i].id;
                  obj.tempType = '2'; // 类型(1自定义、2引用)
                  obj.actionClassify = 'S'; // 动作分类（S单动作、C连续动作
                  if (!careModelName.includes(obj.modelName)) {
                    this.caresdata.push(obj);
                  }
                }
              } else if (this.applType == 'RISK') {
                // 模板去重，先将已有的模板名称记录，再次选取时，已有的模板名称不再添加
                var riskModelName = [];
                if (this.risksdata.length > 0) {
                  for (let j = 0; j < this.risksdata.length; j++) {
                    riskModelName.push(this.risksdata[j].modelName);
                  }
                }
                for (var i = 0; i < this.$refs.modeltable.selections.length; i++) {
                  var obj = {};
                  obj.modelName = this.$refs.modeltable.selections[i].modelName;
                  obj.riskId = this.$refs.modeltable.selections[i].id;
                  obj.tempType = '2'; // 类型(1自定义、2引用)
                  obj.actionClassify = 'S'; // 动作分类（S单动作、C连续动作
                  if (!riskModelName.includes(obj.modelName)) {
                    this.risksdata.push(obj);
                  }

                }
              } else if (this.applType == 'PRODUCT') {
                // 模板去重，先将已有的模板名称记录，再次选取时，已有的模板名称不再添加
                var productModelName = [];
                if (this.productsdata.length > 0) {
                  for (let j = 0; j < this.productsdata.length; j++) {
                    productModelName.push(this.productsdata[j].modelName);
                  }
                }
                for (var i = 0; i < this.$refs.modeltable.selections.length; i++) {
                  var obj = {};
                  obj.modelName = this.$refs.modeltable.selections[i].modelName;
                  obj.proId = this.$refs.modeltable.selections[i].id;
                  obj.tempType = '2'; // 类型(1自定义、2引用)
                  obj.actionClassify = 'S'; // 动作分类（S单动作、C连续动作
                  if (!productModelName.includes(obj.modelName)) {
                    this.productsdata.push(obj);
                  }
                  //console.log("productsdata--->", this.productsdata)
                }
              }
            } else if (this.activeName2 == 'second') {
              if (this.applType == 'CARE') {
                // 模板去重，先将已有的模板名称记录，再次选取时，已有的模板名称不再添加
                var concareModelName = [];
                if (this.concaresdata.length > 0) {
                  for (let j = 0; j < this.concaresdata.length; j++) {
                    concareModelName.push(this.concaresdata[j].modelName);
                  }
                }
                for (var i = 0; i < this.$refs.modeltable.selections.length; i++) {
                  var obj = {};
                  obj.modelName = this.$refs.modeltable.selections[i].modelName;
                  obj.careId = this.$refs.modeltable.selections[i].id;
                  obj.tempType = '2'; // 类型(1自定义、2引用)
                  obj.actionClassify = 'C'; // 动作分类（S单动作、C连续动作
                  if (!concareModelName.includes(obj.modelName)) {
                    this.concaresdata.push(obj);
                  }
                }
              } else if (this.applType == 'RISK') {
                // 模板去重，先将已有的模板名称记录，再次选取时，已有的模板名称不再添加
                var conrisksModelName = [];
                if (this.conrisksdata.length > 0) {
                  for (let j = 0; j < this.conrisksdata.length; j++) {
                    conrisksModelName.push(this.conrisksdata[j].modelName);
                  }
                }
                for (var i = 0; i < this.$refs.modeltable.selections.length; i++) {
                  var obj = {};
                  obj.modelName = this.$refs.modeltable.selections[i].modelName;
                  obj.riskId = this.$refs.modeltable.selections[i].id;
                  obj.tempType = '2'; // 类型(1自定义、2引用)
                  obj.actionClassify = 'C'; // 动作分类（S单动作、C连续动作
                  if (!conrisksModelName.includes(obj.modelName)) {
                    this.conrisksdata.push(obj);
                  }

                }
              } else if (this.applType == 'PRODUCT') {
                // 模板去重，先将已有的模板名称记录，再次选取时，已有的模板名称不再添加
                var conproductsModelName = [];
                if (this.conproductsdata.length > 0) {
                  for (let j = 0; j < this.conproductsdata.length; j++) {
                    conproductsModelName.push(this.conproductsdata[j].modelName);
                  }
                }
                for (var i = 0; i < this.$refs.modeltable.selections.length; i++) {
                  var obj = {};
                  obj.modelName = this.$refs.modeltable.selections[i].modelName;
                  obj.proId = this.$refs.modeltable.selections[i].id;
                  obj.tempType = '2'; // 类型(1自定义、2引用)
                  obj.actionClassify = 'C'; // 动作分类（S单动作、C连续动作
                  if (!conproductsModelName.includes(obj.modelName)) {
                    this.conproductsdata.push(obj);
                  }
                }
              }
            }
            this.viewDialogVisible = false;
          } else {
            this.$message({ message: '请选择一条数据', type: 'warning' });
          }
        },
        cancelModelfn: function () {
          this.viewDialogVisible = false;
        },
        tabsHandleClick: function (tab) {

        },
        handleClick: function (tab, event) {
          var _this = this;
          if (_this.$options.ncmpobj.instanceObj == undefined) {
            var param = {
              condition: JSON.stringify({
                eventId: '1'
              })
            };
            if (tab.name == 'CARE') {
              // _this.$refs.eventResultTableCare.remoteData(param);
            } else if (tab.name == 'RISK') {
              // _this.$refs.eventResultTableRisk.remoteData(param);
            } else {
              // _this.$refs.eventResultTable.remoteData(param);
            }
          } else {
            var param = {
              condition: JSON.stringify({
                eventId: _this.$options.ncmpobj.instanceObj.nodeId,
                actionType: tab.name
              })
            };
            if (tab.name == 'CARE') {
              // _this.$refs.eventResultTableCare.remoteData(param);
            } else if (tab.name == 'RISK') {
              // _this.$refs.eventResultTableRisk.remoteData(param);
            } else {
              // _this.$refs.eventResultTable.remoteData(param);
            }
          }
        }
      },
      destroyed: function () {
      },
      mounted: function () {
        var me = this;
        var eventId = me.$options.ncmpobj.instanceObj.nodeId;
        console.log('eventId', eventId);
        me.backCondition(eventId);
        if (me.$options.ncmpobj.instanceObj == undefined) {
          me.eventUpdateButtons[0].hidden = true;
          me.eventUpdateButtons[1].hidden = true;
          var param = {
            condition: JSON.stringify({
              eventId: '1'
            })
          };
          me.$refs.eventResultTable.remoteData(param);
        } else {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cmfrcruleresultresource/geteventform',
            data: {
              eventId: me.$options.ncmpobj.instanceObj.nodeId
            },
            callback: function (code, message, response) {
              if (response.data != null) {
                me.eventUpdateButtons[0].hidden = true;
                me.eventUpdateButtons[1].hidden = false;
                var obj = response.data;
                yufp.extend(_this.$refs.eventform.formModel, obj);
                _this.eventName = _this.$refs.eventform.formModel.eventName
                _this.ruleConfigFn();
                if (response.data.ruleDesc != null) {
                  var ruleDescs = response.data.ruleDesc.split('#@#');
                  _this.conditionlist = JSON.parse(ruleDescs[0]);
                  if (ruleDescs.length > 1) {
                    _this.parameterlist = JSON.parse(ruleDescs[1]);
                  }
                }
              } else {
                me.eventUpdateButtons[0].hidden = false;
                me.eventUpdateButtons[1].hidden = true;
              }
            }
          });
          var param = {
            condition: JSON.stringify({
              eventId: _this.$options.ncmpobj.instanceObj.nodeId,
              actionType: 'PRODUCT'
            })
          };
          // _this.$refs.eventResultTable.remoteData(param);
        }
        // yufp.router.to('configRulePart', data, 'operateId');
        yufp.lookup.bind('TABLE_TYPE', function (data) {
          me.tableTypeOptions = data;
        });
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
      }
    });
  };
  /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
  exports.destroy = function (id, cite) {
  };
});

