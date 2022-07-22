define(

  // 定义交易需要详细信息
  function (require, exports) {
    yufp.lookup.reg('PARAM_USE,CHN_TYPE_SELECTOR,TRANS_TYPE_SELECTOR,EVENT_TYPE_SELECTOR,TRANS_STATE_SELECTOR,FIELD_TYPE_SELECTOR,PARAM_TYPE_SELECTOR,MONGO_TAB_SELECTOR,FIELD_TYPE');
    exports.ready = function (hashCode, data, cite) {
      var _typeOptions = [
        { key: 'Y' }
      ];
      var _fieldType = [{ key: 'C', value: '字符串' }, { key: 'N', value: '数字' }];
      var _fieldFlag = [{ key: '1', value: '定长' }, { key: '2', value: '自解包' }];
      var _updownFlag = [{ key: '1', value: '上行' }, { key: '2', value: '下行' }];
      var vm = yufp.custom.vue({
        el: '#trans_grid',
        data: function () {
          var me = this;
          var validateTrimEmpty = function (rule, value, callback) {
            var result = value.replace(/(^\s*)|(\s*$)/g, '');
            if (result.length == 0) {
              callback(new Error('交易代码不能为空'));
            } else {
              callback();
            }
            /*  if(value.replace(/(^s*)|(s*$)/g, "").length ==0){
                              callback(new Error('内容不能为空'));
                          }else{
                              callback();
                          }*/
          };
          return {
            serviceUrl: backend.adminService + '/api/transmanger/',
            paramServiceUrl: backend.adminService + '/api/transmanger/queryparamList',
            curParamServiceUrl: backend.adminService + '/api/transmanger/querycurrentparamlist',
            idView: false,
            height: yufp.custom.viewSize().height - 140,
            userId: yufp.session.userId,
            dialogHeight: '300',
            //搜索栏
            queryFields: [
              { placeholder: '后台交易代码', field: 'transCode', type: 'input' },
              { placeholder: '前台交易代码', field: 'busiCode', type: 'input' },
              /* {placeholder: '渠道标识',  field: 'chanId', type: 'select', dataCode: 'MONGO_TAB_NAME'},*/
              { placeholder: '交易名称', field: 'transName', type: 'input' },
              { placeholder: '交易类型', field: 'transType', type: 'select', dataCode: 'TRANS_TYPE_SELECTOR' },
              { placeholder: '规则类型', field: 'eventType', type: 'select', dataCode: 'EVENT_TYPE_SELECTOR' }
            ],
            queryParamFields: [
              { placeholder: '字段名', field: 'paramId', type: 'input' },
              { placeholder: '字段中文名', field: 'paramName', type: 'input' }
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
                    me.$refs.filterTable.remoteData(param);
                  }
                }
              },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
            queryParamButtons: [
              {
                label: '搜索',
                op: 'submit',
                type: 'primary',
                icon: 'search',
                click: function (model, valid) {
                  if (valid) {
                    var param = { condition: JSON.stringify(model) };
                    me.$refs.filterParamTable.remoteData(param);
                  }
                }
              },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
            typeOptions: _typeOptions,
            fieldType: _fieldType,
            fieldFlag: _fieldFlag,
            updownFlag: _updownFlag,
            transParamDatas: [],
            paging: {
              page: 1,
              size: 10
            },
            tableColumns: [
              { label: '序号', type: 'index', width: 80 },
              { label: '后台交易代码', prop: 'transCode', width: 120 },
              { label: '前台交易代码', prop: 'busiCode', width: 120 },
              /*      { label: '渠道标识', prop: 'chanId',   width: 120 , dataCode:'CHN_TYPE_SELECTOR' },*/
              { label: '交易名称', prop: 'transName', width: 225 },
              { label: '交易类型', prop: 'transType', width: 140, dataCode: 'TRANS_TYPE_SELECTOR' },
              { label: '规则类型', prop: 'eventType', width: 132, dataCode: 'EVENT_TYPE_SELECTOR' },
              /* { label: '表名', prop: 'tabName', width: 150 },*/
              { label: '是否创建表', prop: 'transState', width: 100, dataCode: 'TRANS_STATE_SELECTOR' },
              { label: '最近修改人', prop: 'loginNo', width: 120 },
              {
                label: '最近修改时间',
                prop: 'opTime',
                width: 140,
                formatter: function (row, me) {
                  // return  row.opTime.substring(0,19).replace("T"," ")
                  return row.opTime.substring(0, 10);
                }
              }

            ],
            tableParamColumns: [
              { label: '字段名', prop: 'paramId', width: 122 },
              { label: '字段中文名', prop: 'paramName', width: 150 },
              { label: '字段类型', prop: 'fieldType', dataCode: 'FIELD_TYPE', width: 120 },
              { label: '字段用途', prop: 'paramType', dataCode: 'PARAM_USE', width: 120 },
              { label: '字段描述', prop: 'paramDesc', width: 175 }
            ],

            formDisabled: false, // 表单是否可用
            transDialogVisible: true,
            ifBasicVisible: false,
            dialogWidth: '800px',
            transSettingDialogVisible: false,
            parmPopDialogVisible: false,
            oprType: '',
            titleMap: {
              updateTrans: '修改交易',
              detailTrans: '交易详情',
              createTrans: '新增交易',
              settingsTrans: '配置交易'
            },
            transOprFields: [{
              columnCount: 2,
              fields: [
                {
                  field: 'transCode',
                  label: '后台交易代码',
                  //disabled: false,
                  rules: [{ required: true, message: '后台交易代码不能为空', trigger: 'blur' },
                  { max: 40, message: '后台交易码长度不能超过40个字符', trigger: 'blur' },
                  { validator: validateTrimEmpty, trigger: 'blur' }]
                },
                {
                  field: 'busiCode',
                  label: '前台交易代码',
                  rules: [{ required: true, message: '前台交易代码不能为空', trigger: 'blur' },
                  { max: 40, message: '前台交易代码长度不能超过40个字符', trigger: 'blur' }
                  ]
                }
              ]
            },
            {
              columnCount: 2,
              fields: [
                {
                  field: 'transName',
                  label: '交易名称',
                  rules: [{ required: true, message: '交易名称不能为空', trigger: 'blur' },
                  { max: 30, message: '交易名称长度不能超过30个字符', trigger: 'blur' }
                  ]
                },
                {
                  field: 'transType',
                  label: '交易类型',
                  type: 'select',
                  dataCode: 'TRANS_TYPE_SELECTOR',
                  rules: [{ required: true, message: '交易类型不能为空', trigger: 'blur' }]
                }
                /* ,
                                    { field: 'chanId', label: '渠道标识',type: 'select', dataCode: 'CHN_TYPE_SELECTOR',
                                        rules: [{required: true, message: '渠道标识不能为空', trigger: 'blur'}]}*/

              ]
            },
            {
              columnCount: 2,
              fields: [
                {
                  field: 'eventType',
                  label: '规则类型',
                  type: 'select',
                  dataCode: 'EVENT_TYPE_SELECTOR',
                  rules: [{ required: true, message: '规则类型不能为空', trigger: 'blur' }],
                  hidden: true,
                  value: '2'
                }
              ]
            }
            ],
            transSettingsOprFields: [{
              columnCount: 2,
              fields: [
                {
                  field: 'transCode', readonly: true, label: '后台交易代码'/* ,
                                    rules: [{required: true, message: '后台交易代码不能为空', trigger: 'blur'},
                                        {max:40, message:"后台交易码长度不能超过40个字符", trigger:'blur'}]*/
                }/* ,
                { field: 'tabName',
                  label: '表名称',
                  type: 'select',
                  dataCode: 'MONGO_TAB_SELECTOR',
                  rules: [{required: true, message: '请选择对应的表名', trigger: 'blur'}]} */
              ]
            }
            ],
            updateButtons: [
              {
                label: '关闭',
                type: 'primary',
                icon: 'close',
                hidden: false,
                click: function (model) {
                  me.transDialogVisible = false;
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
                    var uri = '';
                    if (me.oprType === 'createTrans') {
                      uri = '/api/transmanger/';
                    } else if (me.oprType === 'updateTrans') {
                      uri = '/api/transmanger/update';
                    } else if (me.oprType === 'updateTrans') {
                      uri = '/api/transmanger/settingsTrans';
                    }
                    me.saveTrans(model, uri);
                    // me.transDialogVisible=false;
                  }
                }
              }
            ]
          };
        },
        methods: {
          handleDelete: function (index, row) {
            var parmData = this.$refs.transParamDataTable.data;
            for (var idx = 0; idx < this.$refs.transParamDataTable.data.length; idx++) {
              if (row.paramCode == this.$refs.transParamDataTable.data[idx].paramCode) {
                parmData.splice(idx, 1);
              }
            }
          },
          /* 点击配置按钮功能设置配置*/
          settingTrans: function (model, uri) {
            if (this.$refs.filterTable.selections.length != 1) {
              vm.$message({ message: '请选择一条记录!' });
              return false;
            }
            var transCode = this.$refs.filterTable.selections[0].transCode;
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/transmanger/checktranscode',
              data: {
                transCode: transCode
              },
              callback: function (code, message, response) {
                var tab = response.data;
                if (tab.length > 0) {
                  vm.$message({ message: '该交易已被使用不能再配置字段!' });
                } else {
                  var currentTrans = new Object();
                  currentTrans.transCode = vm.$refs.filterTable.selections[0].transCode;
                  var currentObj = vm;
                  yufp.service.request({
                    url: vm.curParamServiceUrl,
                    method: 'get',
                    data: currentTrans,
                    callback: function (code, message, response) {
                      if (code == '0') {
                        currentObj.transSettingDialogVisible = true;
                        currentObj.transDialogVisible = false;
                        currentObj.oprType = 'settingsTrans';
                        currentObj.ifBasicVisible = false;
                        currentObj.transParamDatas = response.data;
                        for (var idx = 0; idx < currentObj.transParamDatas.length; idx++) {
                          var object = new Array();
                          if (currentObj.transParamDatas[idx].ruleVisible == 'Y') {
                            object.push('Y');
                          }
                          currentObj.transParamDatas[idx].ruleVisible = object;
                          currentObj.transParamDatas[idx].visibaleval = '';
                        }
                        currentObj.$nextTick(function () {
                          if (currentObj.$refs.transSettingDataFilterForm != null) {
                            currentObj.$refs.transSettingDataFilterForm.resetFields();
                          }
                          yufp.extend(currentObj.$refs.transSettingDataFilterForm.formModel, currentObj.$refs.filterTable.selections[0]);
                        });
                      } else {
                        vm.$message({ message: '加载数据失败!' });
                      }
                    }
                  });
                }
              }
            });
          },
          saveTransParamSettings: function () {
            var basicdata = this.$refs.transSettingDataFilterForm.formModel;
            var transParamList = this.$refs.transParamDataTable.data;
            /* if (basicdata.tabName == null) {
              vm.$message({ message: '表名称不能为空!' });
              return false;
            } */
            if (transParamList.length == 0) {
              vm.$message({ message: '交易字段不能为空!' });
              return false;
            }
            basicdata.transMapList = transParamList;
            basicdata.loginNo = yufp.session.userCode;
            basicdata.opOrg = yufp.session.org.code;
            /**/
            for (var idx = 0; idx < basicdata.transMapList.length; idx++) {
              var reg = /^[1-9]{1}[0-9]*$/;
              if (basicdata.transMapList[idx].fieldType == '' || basicdata.transMapList[idx].fieldType == null) {
                vm.$message({ message: '编号[' + (idx + 1) + ']中字段类型不能为空' });
                return;
              }
              if (basicdata.transMapList[idx].fieldLen == '' || basicdata.transMapList[idx].fieldLen == null) {
                vm.$message({ message: '编号[' + (idx + 1) + ']中字段长度不能为空' });
                return;
              } else {
                if (!reg.test(basicdata.transMapList[idx].fieldLen)) {
                  vm.$message({ message: '编号[' + (idx + 1) + ']中长度必须为整数' });
                  return;
                }
              }
              if (basicdata.transMapList[idx].paramDesc == '' || basicdata.transMapList[idx].paramDesc == null) {
                vm.$message({ message: '编号[' + (idx + 1) + ']中字段中文名不能为空' });
                return;
              }
              if (basicdata.transMapList[idx].fieldFlag == '' || basicdata.transMapList[idx].fieldFlag == null) {
                vm.$message({ message: '编号[' + (idx + 1) + ']中字段标识不能为空' });
                return;
              }
              if (basicdata.transMapList[idx].fieldOffset == '' || basicdata.transMapList[idx].fieldOffset == null) {
                vm.$message({ message: '编号[' + (idx + 1) + ']中偏移量不能为空' });
                return;
              } else {
                if (!reg.test(basicdata.transMapList[idx].fieldOffset)) {
                  vm.$message({ message: '编号[' + (idx + 1) + ']中偏移量的值必须为整数' });
                  return;
                }
              }
              if (basicdata.transMapList[idx].updownFlag == '' || basicdata.transMapList[idx].updownFlag == null) {
                vm.$message({ message: '编号[' + (idx + 1) + ']中上下行标识不能为空' });
                return;
              }
            }
            for (var idx = 0; idx < basicdata.transMapList.length; idx++) {
              basicdata.transMapList[idx].paramPos = idx + 1;
              if (basicdata.transMapList[idx].ruleVisible != null &&
                basicdata.transMapList[idx].ruleVisible.length > 0) {
                basicdata.transMapList[idx].ruleVisible = 'Y';
              } else {
                basicdata.transMapList[idx].ruleVisible = '';
              }
            }
            var currentSetting = this;
            yufp.service.request({
              url: backend.adminService + '/api/transmanger/updatetranssetting',
              method: 'post',
              data: basicdata,
              callback: function (code, message, response) {
                if (code == '0') {
                  if (vm.$refs.filterTable.selections[0].transState == '1') {
                    vm.createTab();
                  } else {
                    vm.$message({ message: '操作成功!' });
                  }
                  currentSetting.transDialogVisible = false;
                  currentSetting.transSettingDialogVisible = false;
                  vm.$refs.filterTable.remoteData();
                } else {
                  vm.$message({ message: '删除失败!' });
                }
              }
            });
          },
          closeTransParamSettings: function () {
            this.transDialogVisible = false;
            this.transSettingDialogVisible = false;
          },
          addParamListSettings: function () {
            this.parmPopDialogVisible = false;
            /* 将数据添加到对应的表格中去*/
            var parmData = this.$refs.transParamDataTable.data;
            var existsParamList = null;
            for (var idx = 0; idx < this.$refs.filterParamTable.selections.length; idx++) {
              var object = this.$refs.filterParamTable.selections[idx];
              var oldtransParamList = this.$refs.transParamDataTable.data;
              for (var j = 0; j < oldtransParamList.length; j++) {
                var isContain = false;
                if (oldtransParamList[j].paramCode == object.paramId) {
                  if (existsParamList == null) {
                    existsParamList = oldtransParamList[j].paramCode;
                  } else {
                    existsParamList += ',' + oldtransParamList[j].paramCode;
                  }
                  isContain = true;
                  break;
                }
              }
              if (isContain) {
                continue;
              }
              var newObj = new Object();
              newObj.paramCode = object.paramId;
              newObj.paramDesc = object.paramName;
              var visibaleArray = new Array();
              visibaleArray.push('Y');
              newObj.ruleVisible = visibaleArray;
              newObj.visibaleval = '';
              newObj.fieldName = object.paramId;
              newObj.fieldLen = object.filedLength;
              newObj.fieldOffset = 0;
              newObj.fieldType = '';
              newObj.fieldFlag = '';
              newObj.updownFlag = '';
              parmData.push(newObj);
            }
            if (existsParamList != null) {
              // vm.$message({ message: '字段['+existsParamList+"]已经在列表中存在，若调整，请直接修改" });
              this.$alert('字段[' + existsParamList + ']已经在列表中存在，若调整，请直接修改', '标题名称', {
                confirmButtonText: '确定'
              });
            }
          },
          closeParamListSettings: function () {
            this.parmPopDialogVisible = false;
          },
          saveTrans: function (model, uri) {
            model.loginNo = yufp.session.userCode;
            model.opOrg = yufp.session.org.code;
            var currentObj = this;
            // this.transDialogVisible=false
            yufp.service.request({
              url: backend.adminService + uri,
              method: 'post',
              data: model,
              callback: function (code, message, response) {
                if (response.code < 0) {
                  vm.$message({ message: response.message });
                } else {
                  currentObj.transDialogVisible = false;
                  currentObj.transSettingDialogVisible = false;
                  vm.$message({ message: '保存成功!' });

                  vm.$refs.filterTable.remoteData();
                }
              }
            });
          },
          addTrans: function () {
            this.oprType = 'createTrans';
            this.transDialogVisible = true;
            this.formDisabled = false;
            this.ifBasicVisible = true;
            this.updateButtons[1].hidden = false;
            // this.transOprFields[0].fields[0].readonly = false;

            this.$nextTick(function () {
              this.$refs.transDataFilterForm.switch('transCode', 'disabled', false);
              if (this.$refs.transDataFilterForm != null) {
                this.$refs.transDataFilterForm.resetFields();
              }
            });
          },
          viewTrans: function () {
            if (this.$refs.filterTable.selections.length != 1) {
              vm.$message({ message: '请选择一条记录!' });
              return false;
            }
            this.oprType = 'detailTrans';
            this.formDisabled = true;
            this.ifBasicVisible = true;
            this.transDialogVisible = true;
            this.updateButtons[1].hidden = true;
            this.$nextTick(function () {
              if (this.$refs.transDataFilterForm != null) {
                this.$refs.transDataFilterForm.resetFields();
              }
              yufp.extend(this.$refs.transDataFilterForm.formModel, this.$refs.filterTable.selections[0]);
            });
          },
          modiTrans: function () {
            this.formDisabled = false;
            if (this.$refs.filterTable.selections.length < 1) {
              vm.$message({ message: '请选择一条记录修改!' });
              return false;
            }
            if (this.$refs.filterTable.selections.length > 1) {
              vm.$message({ message: '只能选择一条记录修改!' });
              return false;
            }
            var transCode = this.$refs.filterTable.selections[0].transCode;
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/transmanger/checktranscode',
              data: {
                transCode: transCode
              },
              callback: function (code, message, response) {
                var tab = response.data;
                if (tab.length > 0) {
                  vm.$message({ message: '该交易已被使用不能修改!' });
                } else {
                  vm.updateButtons[1].hidden = false;
                  vm.transDialogVisible = true;
                  vm.ifBasicVisible = true;
                  vm.oprType = 'updateTrans';
                  // this.transOprFields[0].fields[0].disabled = true;
                  vm.$nextTick(function () {
                    vm.$refs.transDataFilterForm.switch('transCode', 'disabled', true);
                    if (vm.$refs.transDataFilterForm != null) {
                      vm.$refs.transDataFilterForm.resetFields();
                    }
                    yufp.extend(vm.$refs.transDataFilterForm.formModel, vm.$refs.filterTable.selections[0]);
                  });
                }
              }
            });
          },
          deleteTrans: function () {
            var ids = '';
            var filterSelecttions = this.$refs.filterTable.selections;
            if (filterSelecttions.length == 1) {
              for (var i = 0; i < filterSelecttions.length; i++) {
                // 记录多选用于多删
                if (filterSelecttions.length == 1) {
                  ids = filterSelecttions[i].transCode;
                } else {
                  ids = ids + ',' + filterSelecttions[i].transCode;
                }
              }
            } else {
              vm.$message({ message: '请选择一条交易信息!' });
              return false;
            }
            var transCode = this.$refs.filterTable.selections[0].transCode;
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/transmanger/checktranscode',
              data: {
                transCode: transCode
              },
              callback: function (code, message, response) {
                var tab = response.data;
                if (tab.length > 0) {
                  vm.$message({ message: '该交易已被使用不能删除!' });
                } else {
                  vm.$confirm('确认删除该交易信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(function () {
                    yufp.service.request({
                      method: 'GET',
                      url: backend.adminService + '/api/cmfrceventinfo/geteventbytrans',
                      data: {
                        transCode: ids
                      },
                      callback: function (code, message, response) {
                        var tab = response.data;
                        if (tab.length > 0) {
                          vm.$message({ message: '该交易已用，不能删除!' });
                        } else {
                          yufp.service.request({
                            url: backend.adminService + '/api/transmanger/deletes/' + ids,
                            method: 'post',
                            data: '',
                            callback: function (code, message, response) {
                              if (code == '0') {
                                vm.$message({ message: '删除成功!' });
                                vm.$refs.filterTable.remoteData();
                              } else {
                                vm.$message({ message: '删除失败!' });
                              }
                            }
                          });
                        }
                      }
                    });
                  });
                }
              }
            });
          },
          addsettingsTrans: function () {
            this.parmPopDialogVisible = true;
            this.$nextTick(function () {
              if (this.$refs.filterParamTable != null) {
                this.$refs.refQueryParamFields.$children[0].resetFields();
                this.$refs.filterParamTable.remoteData({});
              }
            });
          },
          deleteSettingsTrans: function () {

          },
          // 创建表
          createTab: function () {
            var _this = this;
            if (this.$refs.filterTable.selections.length != 1) {
              _this.$message({ message: '请选择一条数据!' });
              return false;
            }
            var transCode = this.$refs.filterTable.selections[0].transCode;
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/transmanger/checktranscode',
              data: {
                transCode: transCode
              },
              callback: function (code, message, response) {
                var tab = response.data;
                if (tab.length > 0) {
                  vm.$message({ message: '该交易已被使用不能再次创建!' });
                } else {
                  var tabName = _this.$refs.filterTable.selections[0].tabName;
                  if (tabName == null) {
                    _this.$message({ message: '请先配置交易字段' });
                    return;
                  }
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/transmanger/createtab/',
                    data: _this.$refs.filterTable.selections[0],
                    callback: function (code, message, response) {
                      _this.$message({ message: '操作成功！' });
                      vm.$refs.filterTable.remoteData();
                    }
                  });
                }
              }
            });
          }
        }
      });
      vm.transDialogVisible = false;
    };
  }
);
