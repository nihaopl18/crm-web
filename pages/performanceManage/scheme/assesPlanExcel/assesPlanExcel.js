/**
 * @created by wanshuang on 2020-4-20 09:57:47
 * @updated by
 * @description 带excel的考核方案
 */
define([
  './custom/widgets/js/yufpExtTree.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/YufpUserSelector.js',
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/yufpBaseindexSelector.js',
  './custom/widgets/js/yufpEvlindexSelector.js',
  './custom/widgets/js/yufpSchemeExcel.js',
  './custom/widgets/js/yufpSchemeobjSelector.js',
  './custom/widgets/js/yufpSchemeExcelIndexSelector.js',
  './custom/widgets/js/yufpSchemeSelector.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,OBJ,CHECK_SCENE,YE_TYPE,INDEX_APPLY_TYPE,INDEX_TYPE,STAT_FLAG,SCHEME_TYPE,CELL_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          postCheckAll: false,
          dataUrl: backend.appBaseService + '/api/pmafschemeexcel/querylist',
          treeUrl: backend.appBaseService + '/api/pmafschememenu/querylist',
          saveBtnShow: true,
          cancelBtnShow: true,
          formdata: {},
          height: yufp.frame.size().height,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          params: {},
          queryData: {},
          treeDialogVisible: false,
          treeformDisabled: false,
          saveTreeBtnShow: false,
          title: '',
          rule: [
            { required: true, message: '字段不能为空', trigger: 'blur' },
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          treeFormdata: {},
          pickerOptions0: {
            disabledDate: function (time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          },
          comRules: {
            startDate: [
              { required: true, message: '字段不能为空' }
            ],
            endDate: [
              { required: true, message: '字段不能为空' }
            ]
          },
          treeParam: {},
          activeName: 'tabOne',
          tabOneDisable: true,
          tabTwoDisable: true,
          tabThreeDisable: true,
          paramList: [],
          indexList: [],
          activeNameOne: 'first',
          dataUrlOne: backend.appBaseService + '/api/pmafbaseindexinfo/querylist',
          dataUrlTwo: backend.appBaseService + '/api/pmafevlindexinfo/querylist',
          dialogThreeVisible: false,
          activeNames: ['1', '2'],
          queryDataOne: {},
          queryDataTwo: {},
          spannum: '14',
          spannumOne: '7',
          treeOrgUrl: backend.appOcaService + '/api/util/getorgtree',
          dataParams: {
            // orgId: yufp.session.details.grantOrgCode
            orgId: yufp.session.org.code
            // lazy: true
          },
          orgUserTreeParams: {
            needCheckbox: true,
            checkStrictly: true,
            checkboxVal: true,
            lazy: true
          },
          dataRoot: {
            // orgId: yufp.session.details.grantOrgCode,
            // orgName: yufp.session.details.grantOrgName,
            // label: yufp.session.details.grantOrgName
            orgId: yufp.session.org.code,
            orgName: yufp.session.org.name,
            label: yufp.session.org.name
          },
          paramsOne: {},
          paramsTwo: {},
          queryFormOne: {},
          queryFormTwo: {},
          treePostUrl: backend.appBaseService + '/api/adminsmpost/querylist',
          dataUrlFour: backend.appBaseService + '/api/pmafschemeindexrel/queryIndex',
          paramsFour: {},
          indexType: '',
          indexDisable: false,
          indexDisableOne: false,
          treeFlag: false,
          // 以下excel设计器属性
          schemeExcelParams: {},
          schemeId: '', // 考核方案ID
          templateType: '', // 考核方案类型，对应schemeType字段
          evlObjType: '', // 考核对象类型
          previewFormDialogVisible: false,
          previewFormData: {},
          previewSchemeObjParams: { checkboxVal: false },
          previewFormEvlObjShow: false,
          previewDialogTitle: '考核方案预览',
          previewDialogVisible: false,
          runFormDialogVisible: false,
          runFormData: {},
          grantFormDialogVisible: false,
          grantAddFormDialogVisible: false,
          grantTableParams: {},
          grantDataUrl: '/api/commonexcel/getgrantinfbyschemeid',
          grantAddFormData: {},
          quoteFormDialogVisible: false,
          quoteFormData: {},
          quoteSchemeSelParams: {
            user: {
              dataUrl: '/api/commonexcel/getquoteschemeinf'
            }
          }
          // cellFormdata: {},
          // indexHiddenFlag: true,
          // valHiddenFlag: true,
          // formulaHiddenFlag: true
          // indexHiddenFlagTwo: true
        };
      },
      created () {
        var _this = this;
        var con1 = {
          isExcel: '0'
        };
        _this.params = {
          condition: JSON.stringify(con1)
        };
      },
      watch: {
        postCheckAll: function (val) {
          if (val) {
            var tempKeys = [];
            for (i in this.$refs.refTreeTwo.data) {
              tempKeys.push(this.$refs.refTreeTwo.data[i].sysPostCode);
            }
            this.$refs.refTreeTwo.setCheckedKeys(tempKeys);
          }
        },
        tabTwoDisable: function (newVal) {
          var _this = this;
          _this.$refs.refTreeOne.setCheckedKeys([]);
          _this.$refs.refTreeTwo.setCheckedKeys([]);
          _this.$refs.selectType.formdata.speRuleType = '1';
          _this.paramList = [];
          if (!newVal) {
            // 查询机构树、岗位树、考核对象数据
            var model = {};
            model.schemeId = _this.formdata.schemeId;
            yufp.service.request({
              method: 'GET',
              url: '/api/pmafschemeorgrel/queryOrg',
              data: {
                condition: JSON.stringify(model)
              },
              callback: function (code, message, response) {
                var list = response.data;
                if (list.length > 0) {
                  var listIdList = [];
                  for (var i = 0; i < list.length; i++) {
                    listIdList.push(list[i].orgId);
                  }
                  _this.$refs.refTreeOne.setCheckedKeys(listIdList);
                }
              }
            });
            if (_this.formdata.evlObjType == '01') {
              _this.postCheckAll = false;
              yufp.service.request({
                method: 'GET',
                url: '/api/pmafschemepostrel/queryPost',
                data: {
                  condition: JSON.stringify(model)
                },
                callback: function (code, message, response) {
                  var list = response.data;
                  if (list.length > 0) {
                    var listIdList = [];
                    for (var i = 0; i < list.length; i++) {
                      listIdList.push(list[i].postId);
                    }
                    _this.$refs.refTreeTwo.setCheckedKeys(listIdList);
                    if (listIdList.length == _this.$refs.refTreeTwo.data.length) {
                      _this.postCheckAll = true;
                    }
                  }
                }
              });
              yufp.service.request({
                method: 'GET',
                url: '/api/pmafschemesperulerel/querySperule',
                data: {
                  condition: JSON.stringify(model)
                },
                callback: function (code, message, response) {
                  if (response.data.length > 0) {
                    _this.paramList = response.data;
                    _this.$refs.selectType.formdata.speRuleType = _this.paramList[0].speRuleType;
                  }
                }
              });
            }
          }
        },
        tabThreeDisable: function (newVal) {
          var _this = this;
          if (!newVal) {
            _this.schemeId = _this.formdata.schemeId;
            _this.templateType = _this.formdata.schemeType;
            _this.evlObjType = _this.formdata.evlObjType;
            if (_this.viewType == 'DETAIL') { // 详情面板时，设置设计器只读
              _this.schemeExcelParams = {readOnly: true};
            } else {
              _this.schemeExcelParams = {}; // 设计器默认不只读
            }
          } else {
            _this.schemeId = '';
            _this.templateType = '';
            _this.evlObjType = '';
          }
        }
      },
      methods: {
        handlePostCheckAllChange: function (event) {
          this.postCheckAll = event.target.checked;
          if (!event.target.checked) {
            this.$refs.refTreeTwo.setCheckedKeys([]);
          }
        },
        handlePostTreeCheckChange: function (nodeData, checked, indeterminate) {
          if (this.$refs.refTreeTwo.getCheckedKeys() && this.$refs.refTreeTwo.data) {
            if (this.$refs.refTreeTwo.getCheckedKeys().length == this.$refs.refTreeTwo.data.length &&
              this.$refs.refTreeTwo.getCheckedKeys().length != 0) {
              this.postCheckAll = true;
            } else {
              this.postCheckAll = false;
            }
          } else {
            this.postCheckAll = false;
          }
        },
        clearObj: function (obj) {
          for (var key in obj) {
            if (key != 'cellType') {
              obj[key] = null;
            }
          }
          return obj;
        },
        // 方案预览fn
        previewFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          if (_this.$refs.refTable.selections[0].schemeType == '02') {
            _this.previewFormEvlObjShow = true; // 单元格类型考核方案，考核对象展示
            _this.previewSchemeObjParams.schemeId = _this.$refs.refTable.selections[0].schemeId;
          } else {
            _this.previewFormEvlObjShow = false;
          }
          _this.previewFormDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.previewRefForm.resetFields();
            _this.previewFormData.schemeName = _this.$refs.refTable.selections[0].schemeName;
            _this.previewFormData.evlObjName = '';
          });
        },
        // 方案预览-考核对象放大镜回调
        previewSchemeObjSel: function (data) {
          if (data && data.length > 0) {
            this.previewFormData.evlObjName = data[0].evlObjName;
          }
        },
        // 展示方案预览dialog
        showPreviewFn: function () {
          var _this = this;
          // 表单校验
          var validate = false;
          _this.$refs.previewRefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 构造excel组件参数
          _this.schemeId = _this.$refs.refTable.selections[0].schemeId;
          _this.templateType = _this.$refs.refTable.selections[0].schemeType;
          _this.evlObjType = _this.$refs.refTable.selections[0].evlObjType;
          _this.schemeExcelParams = {
            excelModel: '02',
            readOnly: true,
            etlDate: yufp.util.dateFormat(_this.previewFormData.etlDate, '{y}{m}{d}'),
            evlObjId: _this.previewFormData.evlObjId
          };
          _this.previewDialogTitle = '考核方案预览:{' + _this.previewFormData.schemeName + '/' +
                                    yufp.util.dateFormat(_this.previewFormData.etlDate, '{y}-{m}-{d}') +
                                    (_this.previewFormData.evlObjName ? '/' + _this.previewFormData.evlObjName : '') +
                                    '}';
          _this.previewDialogVisible = true;
        },
        // 方案预览-导出excel按钮fn
        exportExcelFn: function () {
          var _this = this;
          yufp.service.request({
            method: 'POST',
            url: '/api/commonexcel/makeschemeexcelfile',
            data: {
              title: 'PREVIEW',
              schemeId: _this.schemeId,
              etlDate: yufp.util.dateFormat(_this.previewFormData.etlDate, '{y}{m}{d}'),
              jsonStr: JSON.stringify(_this.$refs.previewSchemeExcel.getExcelJson())
            },
            callback: function (code, message, response) {
              if (response.code == 0) {
                yufp.util.download('/api/commonexcel/downloadschemeexcelfile?filePath=' + encodeURI(response.data));
              } else if (response.code == -9) {
                _this.$message({ message: response.message, type: 'warning' });
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
        },
        // 方案运行-按钮fn
        preRunFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          _this.runFormDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.runRefForm.resetFields();
            _this.runFormData.schemeName = _this.$refs.refTable.selections[0].schemeName;
          });
        },
        // 方案运行fn
        runFn: function () {
          var _this = this;
          // 表单校验
          var validate = false;
          _this.$refs.runRefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          yufp.service.request({
            method: 'POST',
            url: '/api/commonexcel/runscheme',
            data: {
              schemeId: _this.$refs.refTable.selections[0].schemeId,
              etlDate: yufp.util.dateFormat(_this.runFormData.etlDate, '{y}{m}{d}')
            },
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.runFormDialogVisible = false;
                _this.$refs.refTable.remoteData();
                _this.$message({ message: '运行成功', type: 'info' });
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
        },
        // 授权-按钮fn
        grantFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          var model = {
            condition: JSON.stringify({
              schemeId: _this.$refs.refTable.selections[0].schemeId
            })
          };
          yufp.clone(model, _this.grantTableParams);
          _this.grantFormDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.grantRefTable.remoteData(_this.grantTableParams);
          });
        },
        // 新增授权-按钮fn
        addGrantFn: function () {
          var _this = this;
          _this.grantAddFormDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.grantAddForm.resetFields();
            _this.grantAddFormData.schemeId = _this.$refs.refTable.selections[0].schemeId;
            _this.grantAddFormData.schemeName = _this.$refs.refTable.selections[0].schemeName;
            _this.grantAddFormData.grantObjName = null;
          });
        },
        // 删除授权-按钮fn
        delGrantFn: function () {
          var _this = this;
          var selections = _this.$refs.grantRefTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, ids = [];
          for (var i = 0; i < len; i++) {
            ids.push(selections[i].id);
          }
          _this.$confirm('是否删除选中授权数据?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '/api/commonexcel/deletegrantinf',
                  data: ids.join(','),
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _this.$refs.grantRefTable.remoteData(_this.grantTableParams);
                      _this.$message({ message: response.message, type: 'info' });
                    } else if (response.code == -9) {
                      _this.$message({ message: response.message, type: 'warning' });
                    } else {
                      _this.$message({ message: response.message, type: 'error' });
                    }
                  }
                });
              }
            }
          });
        },
        // 新增授权-授权机构选择回调
        grantAddOrgSelFn: function (data) {
          var _this = this;
          if (data) {
            _this.grantAddFormData.grantObjName = data.orgName;
          }
        },
        // 新增授权-保存按钮fn
        grantAddSaveFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.grantAddForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          yufp.service.request({
            method: 'POST',
            url: '/api/commonexcel/addgrantinf',
            data: _this.grantAddFormData,
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.grantAddFormDialogVisible = false;
                _this.$refs.grantRefTable.remoteData(_this.grantTableParams);
                _this.$message({ message: response.message, type: 'info' });
              } else if (response.code == -9 || response.code == -3) {
                _this.$message({ message: response.message, type: 'warning' });
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
        },
        // 新增授权-取消按钮fn
        grantAddCancelFn: function () {
          this.grantAddFormDialogVisible = false;
        },
        // 日期对象转换日期时间字符串
        dateTimeFormat: function (val) {
          if (val) {
            return yufp.util.dateFormat(new Date(val));
          }
        },
        // 方案引用-按钮fn
        quoteFn: function () {
          var _this = this;
          if (_this.treeParam.menuId == undefined || _this.treeParam.menuId == '') {
            _this.$message({message: '请先选择目录节点', type: 'warning'});
            return;
          }
          if (_this.treeParam.menuName == '考核方案目录') {
            _this.$message({message: '根目录不允许添加！', type: 'warning'});
            return;
          }
          _this.quoteFormDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.quoteForm.resetFields();
          });
        },
        // 方案引用-方案选择放大镜回调
        quoteSchemeSel: function (data) {
          if (data && data.length == 1) {
            this.quoteFormData.schemeName = data[0].schemeName;
          }
        },
        // 方案引用-引用按钮fn
        quoteAddFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.quoteForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          _this.$confirm('即将引用【' + _this.quoteFormData.schemeName + '】方案数据生成新考核方案，是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '/api/commonexcel/quoteschemeinf',
                  data: {
                    schemeId: _this.quoteFormData.schemeId,
                    menuId: _this.treeParam.menuId
                  },
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _this.quoteFormDialogVisible = false;
                      _this.$refs.refTable.remoteData(_this.grantTableParams);
                      _this.$message({ message: response.message, type: 'info' });
                    } else if (response.code == -9) {
                      _this.$message({ message: response.message, type: 'warning' });
                    } else {
                      _this.$message({ message: response.message, type: 'error' });
                    }
                  }
                });
              }
            }
          });
        },
        // 方案引用-取消按钮fn
        quoteCancelFn: function () {
          this.quoteFormDialogVisible = false;
        },
        // excel数据保存成功回调函数
        excelSaveSuccess: function (data) {
          var _this = this;
          _this.treeParam = {};
          _this.dialogVisible = false;
          _this.paramList = [];
          _this.$refs.refTreeOne.setCheckedKeys([]);
          _this.$refs.refTreeTwo.setCheckedKeys([]);
          _this.$nextTick(function () {
            _this.$refs.refTable.remoteData(_this.params);
          });
        },
        // saveCellFn: function () {
        //   var _this = this;
        //   var model = {};
        //   yufp.clone(_this.cellFormdata, model);
        //   var validate = false;
        //   _this.$refs.cellForm.validate(function (valid) {
        //     validate = valid;
        //   });
        //   if (!validate) {
        //     return;
        //   }
        //   console.log(model);
        // },
        // cancelCellFn: function () {
        //   var _this = this;
        //   _this.indexHiddenFlag = true;
        //   _this.valHiddenFlag = true;
        //   _this.formulaHiddenFlag = true;
        //   _this.indexHiddenFlagTwo = true;
        //   _this.$nextTick(function () {
        //     _this.$refs.cellForm.resetFields();
        //   });
        // },
        // searchChangeFn: function (val) {
        //   var _this = this;
        //   switch (val) {
        //   case '1':
        //     _this.indexHiddenFlag = false;
        //     _this.valHiddenFlag = true;
        //     _this.formulaHiddenFlag = true;
        //     _this.indexHiddenFlagTwo = true;
        //     _this.clearObj(_this.cellFormdata);
        //     break;
        //   case '2':
        //     _this.indexHiddenFlag = true;
        //     _this.valHiddenFlag = false;
        //     _this.formulaHiddenFlag = true;
        //     _this.indexHiddenFlagTwo = false;
        //     _this.clearObj(_this.cellFormdata);
        //     break;
        //   case '3':
        //     _this.indexHiddenFlag = true;
        //     _this.valHiddenFlag = true;
        //     _this.formulaHiddenFlag = false;
        //     _this.indexHiddenFlagTwo = false;
        //     _this.clearObj(_this.cellFormdata);
        //     break;
        //   }
        // },
        handlemenuDialogClose: function () {
          var _this = this;
          _this.treeDialogVisible = false;
        },
        handleparamDialogClose: function () {
          var _this = this;
          _this.dialogVisible = false;
          _this.treeParam = {};
        },
        changeValue: function (val) {
          var re = /^[0-9]+(.[0-9]+)?$/;
          if (!re.test(val)) {
            this.$message({message: '请输入数字', type: 'warning'});
            return;
          }
        },
        cancelTreeFn: function () {
          var _this = this;
          _this.treeDialogVisible = false;
        },
        cancelTwoFn: function () {
          var _this = this;
          _this.dialogThreeVisible = false;
        },
        saveTreeFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.treeFormdata, model);
          var validate = false;
          _this.$refs.treeForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var url = '';
          if (model.menuId) {
            url = backend.appBaseService + '/api/pmafschememenu/edit';// 修改方法
          } else {
            url = backend.appBaseService + '/api/pmafschememenu/add';// 新增方法
          }
          model.createDate = null;
          // model.orgId = yufp.session.details.grantOrgCode;
          model.orgId = yufp.session.org.code;
          _this.$confirm('是否保存数据?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'POST',
                  url: url,
                  data: model,
                  callback: function (code, message, response) {
                    _this.$refs.refTree.remoteData();
                    _this.$message('操作成功');
                    _this.treeDialogVisible = false;
                  }
                });
              }
            }
          });
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
          _this.saveBtnShow = editable;
          _this.cancelBtnShow = editable;
          _this.activeName = 'tabOne';
          _this.tabOneDisable = true;
          _this.tabTwoDisable = true;
          _this.tabThreeDisable = true;
          _this.treeFlag = !editable;
          if (_this.formDisabled) {
            _this.spannum = '24';
          } else {
            _this.spannum = '14';
          }
        },
        nodeClickFn: function (nodeData, node, self) {
          var _this = this;
          _this.treeParam = nodeData;
          // 根据选择的节点id获取查询条件，右侧表格刷新数据
          _this.queryData.menuId = nodeData.menuId;
          _this.params = {
            condition: JSON.stringify({
              isExcel: '0',
              menuId: _this.queryData.menuId,
              schemeId: _this.queryData.schemeId,
              schemeName: _this.queryData.schemeName
            })
          };
          _this.$nextTick(function () {
            _this.$refs.refTable.remoteData(_this.params);
          });
        },
        /**
         * 新增
         */
        addFn: function () {
          var _this = this;
          if (_this.treeParam.menuId == undefined || _this.treeParam.menuId == '') {
            _this.$message({message: '请先选择目录节点', type: 'warning'});
            return;
          }
          if (_this.treeParam.menuName == '考核方案目录') {
            _this.$message({message: '根目录不允许添加！', type: 'warning'});
            return;
          }
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.id = null;
            _this.formdata.menuName = _this.treeParam.menuName;
            _this.formdata.menuId = _this.treeParam.menuId;
            _this.tabOneDisable = false;
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          if (_this.$refs.refTable.selections[0].creator != yufp.session.user.loginCode) {
            _this.$message({ message: '只能修改自己创建的数据', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
            _this.formdata.startDate = new Date(_this.formdata.startDate.replace(/-/g, '/'));
            _this.formdata.endDate = new Date(_this.formdata.endDate.replace(/-/g, '/'));
            // console.log(_this.formdata);
          });
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(_this.$refs.refTable.selections[0], _this.formdata);
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].schemeId);
          }
          _this.$confirm('该操作将删除所选的数据，是否继续?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                // 删除方法
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafschemeexcel/delScheme',
                  data: arr.join(','),
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        handleDelete: function (index, row) {
          var _this = this;
          _this.paramList.splice(index, 1);
        },
        handleTwoDelete: function (index, row) {
          var _this = this;
          var model = {};
          model.schemeId = row.schemeId;
          model.indexType = row.indexType;
          model.indexId = row.indexId;
          model.balTypeId = row.balTypeId;
          model.evlObjType = row.evlObjType;
          model.applyTypeId = row.applyTypeId;
          yufp.service.request({
            method: 'POST',
            url: backend.appBaseService + '/api/pmafschemeindexrel/delIndex',
            data: model,
            callback: function (code, message, response) {
              _this.$refs.refTableFour.remoteData();
              _this.$message('操作成功');
            }
          });
        },
        /**
         * 上一步
         */
        lastFn: function (index) {
          var _this = this;
          switch (index) {
          case 2:
            // 显示基本信息曾录入的数据
            _this.tabOneDisable = false;
            _this.tabTwoDisable = true;
            _this.activeName = 'tabOne';
            break;
          case 3:
            _this.tabTwoDisable = false;
            _this.tabThreeDisable = true;
            _this.activeName = 'tabTwo';
            _this.activeNameOne = 'first';
            break;
          }
        },
        // excel保存并关闭
        excelSaveFn: function () {
          this.$refs.schemeExcel.rptSave();
        },
        fromToDate: function (date) {
          if (date) {
            date = date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
            date = new Date(date.replace(/-/g, '/'));
          }
          return date;
        },
        /**
         * 下一步
         */
        nextFn: function (index) {
          var _this = this;
          switch (index) {
          case 1:
            // 校验
            var model = {};
            yufp.clone(_this.formdata, model);
            var validate = false;
            _this.$refs.refForm.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            if (model.endDate < model.startDate) {
              _this.$message({ message: '失效日期应该比生效日期大', type: 'warning' });
              return;
            }
            if (_this.formdata.evlObjType == '01') {
              _this.spannumOne = '7';
              if (_this.$refs.refUserRelateObjIds) {
                _this.$refs.refUserRelateObjIds.$children[0].$children[0].setRawValue('');
              }
            } else {
              _this.spannumOne = '12';
            }
            model.startDate = yufp.util.dateFormat(model.startDate, '{y}{m}{d}');
            model.endDate = yufp.util.dateFormat(model.endDate, '{y}{m}{d}');
            model.isExcel = '0';
            var url = '';
            if (model.id) {
              url = backend.appBaseService + '/api/pmafschemeexcel/editInfo';
            } else {
              url = backend.appBaseService + '/api/pmafschemeexcel/addInfo';
            }
            yufp.service.request({
              method: 'POST',
              url: url,
              data: model,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  // console.log(response.data);
                  response.data.startDate = _this.fromToDate(response.data.startDate);
                  response.data.endDate = _this.fromToDate(response.data.endDate);
                  yufp.clone(response.data, _this.formdata);
                  // console.log(_this.formdata);
                  // 保存基本信息方法(可以新增也可以修改，新增要返回主键并赋值)
                  _this.tabOneDisable = true;
                  _this.tabTwoDisable = false;
                  _this.activeName = 'tabTwo';
                } else {
                  _this.$message({ message: response.message, type: 'error' });
                }
              }
            });
            break;
          case 2:
            if (_this.formDisabled) {
              // 详情数据不录入
              _this.tabTwoDisable = true;
              _this.tabThreeDisable = false;
              _this.activeName = 'tabThree';
              _this.activeNameOne = 'first';
            } else {
              // 校验机构树必选
              var orgList = _this.$refs.refTreeOne.getCheckedNodes();
              if (orgList.length <= 0) {
                _this.$message({ message: '请至少选择一个机构', type: 'warning' });
                return;
              }
              var model = {};
              model.schemeId = _this.formdata.schemeId;
              model.evlObjType = _this.formdata.evlObjType;
              var orgIdList = [];
              for (var j = 0; j < orgList.length; j++) {
                orgIdList.push(orgList[j].orgId);
              }
              model.orgId = orgIdList.join(',');
              // 选中暂痕迹不清除,保存选中的数据
              if (_this.formdata.evlObjType == '01') {
                var postList = _this.$refs.refTreeTwo.getCheckedNodes();
                if (postList.length <= 0) {
                  _this.$message({ message: '请至少选择一个岗位', type: 'warning' });
                  return;
                }
                var postIdList = [];
                var postNameList = [];
                for (var i = 0; i < postList.length; i++) {
                  postIdList.push(postList[i].sysPostCode);
                  postNameList.push(postList[i].sysPostName);
                }
                model.postId = postIdList.join(',');
                model.postName = postNameList.join(',');
                model.specialValue = _this.$refs.selectType.formdata.speRuleType;
                var paramIdList = [];
                for (var z = 0; z < _this.paramList.length; z++) {
                  paramIdList.push(_this.paramList[z].paramId);
                }
                model.objId = paramIdList.join(',');
              } else {
                model.postId = '';
                model.postName = '';
                model.objId = '';
                model.specialValue = '';
              }
              yufp.service.request({
                method: 'POST',
                url: backend.appBaseService + '/api/pmafschemeexcel/addObj',
                data: model,
                callback: function (code, message, response) {
                  if (response.code == 0) {
                    _this.tabTwoDisable = true;
                    _this.tabThreeDisable = false;
                    // todo
                    _this.activeName = 'tabThree';
                    _this.activeNameOne = 'first';
                  } else {
                    _this.$message({ message: response.message, type: 'error' });
                  }
                }
              });
            }
            break;
          case 3:
            // 保存右侧数据
            _this.treeParam = {};
            _this.dialogVisible = false;
            _this.paramList = [];
            _this.$refs.refTreeOne.setCheckedKeys([]);
            _this.$refs.refTreeTwo.setCheckedKeys([]);
            if (!_this.formDisabled) {
              _this.$message({message: '操作成功'});
            }
            _this.$nextTick(function () {
              _this.$refs.refTable.remoteData(_this.params);
            });
            yufp.service.request({
              method: 'POST',
              url: backend.appBaseService + '/api/pmafschemeexcel/addSplit',
              data: {schemeId: _this.formdata.schemeId},
              callback: function (code, message, response) {
              }
            });
            break;
          }
        },
        closeFn: function () {
          var _this = this;
          _this.dialogVisible = false;
          _this.paramList = [];
          _this.$refs.refTreeOne.setCheckedKeys([]);
          _this.$refs.refTreeTwo.setCheckedKeys([]);
          _this.$nextTick(function () {
            _this.$refs.refTable.remoteData(_this.params);
          });
        },
        /**
        * 考核对象选择后处理
        */
        userSelectFn: function (data) {
          var _this = this;
          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              if (_this.userflagEqual(data[i].loginCode)) {
                var obj = {};
                obj.id = null;
                obj.paramId = data[i].loginCode;
                obj.paramName = data[i].userName;
                _this.paramList.push(obj);
              }
            }
          }
        },
        /**
        * 考核对象去重
        */
        userflagEqual: function (loginCode) {
          var newList = this.paramList.filter(function (obj) {
            return obj.paramId == loginCode;
          });
          if (newList.length > 0) {
            return false;
          } else {
            return true;
          }
        },
        /**
        * 双击基础指标触发事件弹出
        */
        infoOneFn: function () {
          var _this = this;
          _this.indexType = '01';
          var selections = _this.$refs.refTableOne.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogThreeVisible = true;
          var obj = selections[0];
          var objTwo = {};
          _this.$nextTick(function () {
            _this.$refs.refFormOne.resetFields();
            _this.$refs.refFormTwo.resetFields();
            yufp.clone(obj, _this.queryDataOne);
            yufp.clone(objTwo, _this.queryDataTwo);
            _this.$refs.refFormTwo.formdata.evlObjType = _this.formdata.evlObjType;
            _this.indexDisableOne = false;
            if (_this.formdata.evlObjType != '01') {
              _this.indexDisable = true;
            }
          });
        },
        /**
        * 双击派生指标触发事件弹出
        */
        infoTwoFn: function () {
          var _this = this;
          _this.indexType = '02';
          var selections = _this.$refs.refTableTwo.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogThreeVisible = true;
          var obj = selections[0];
          var objTwo = {};
          _this.$nextTick(function () {
            _this.$refs.refFormOne.resetFields();
            _this.$refs.refFormTwo.resetFields();
            yufp.clone(obj, _this.queryDataOne);
            yufp.clone(objTwo, _this.queryDataTwo);
            _this.$refs.refFormTwo.formdata.evlObjType = _this.formdata.evlObjType;
            _this.$refs.refFormTwo.formdata.balTypeId = '01';
            _this.$refs.refFormTwo.formdata.applyTypeId = '01';
            _this.indexDisableOne = true;
            _this.indexDisable = true;
          });
        },
        /**
        * 基础指标选择完指标确定
        */
        saveTwoFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.refFormTwo.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var obj = {};
          obj.schemeId = _this.formdata.schemeId;
          obj.indexType = _this.indexType;
          obj.indexId = _this.queryDataOne.indexId;
          obj.balTypeId = _this.queryDataTwo.balTypeId;
          obj.applyTypeId = _this.queryDataTwo.applyTypeId;
          obj.evlObjType = _this.queryDataTwo.evlObjType;
          yufp.service.request({
            method: 'POST',
            url: backend.appBaseService + '/api/pmafschemeexcel/addIndex',
            data: obj,
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.$refs.refTableFour.remoteData(_this.paramsFour);
                _this.dialogThreeVisible = false;
                _this.$refs.refFormTwo.resetFields();
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
        },
        deleteNodeFn: function () {
          var _this = this;
          if (_this.treeParam.menuId == undefined || _this.treeParam.menuId == '') {
            _this.$message({message: '请先选择目录节点', type: 'warning'});
            return;
          }
          if (_this.treeParam.menuName == '考核方案目录') {
            _this.$message({message: '根目录不允许删除！', type: 'warning'});
            return;
          }
          var model = {
            condition: JSON.stringify({
              menuId: _this.treeParam.menuId
            })
          };
          // 查询考核方案目录下是否有数据，没有可以删除，有则不能删除
          _this.$confirm('是否删除数据?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'GET',
                  url: backend.appBaseService + '/api/pmafschemeexcel/querylist',
                  data: model,
                  callback: function (code, message, response) {
                    var list = response.data;
                    if (list.length > 0) {
                      _this.$message({message: '该目录下有已存在的方案，暂不能删除', type: 'warning'});
                    } else {
                      yufp.service.request({
                        method: 'POST',
                        url: backend.appBaseService + '/api/pmafschememenu/delete',
                        data: _this.treeParam.menuId,
                        callback: function (code, message, response) {
                          if (code == 0) {
                            _this.$refs.refTree.remoteData();
                            _this.$message({message: '删除节点成功'});
                          }
                        }
                      });
                    }
                  }
                });
              }
            }
          });
        },
        addNodeFn: function () {
          var _this = this;
          if (_this.treeParam.menuId == undefined || _this.treeParam.menuId == '') {
            _this.$message({message: '请先选择目录节点', type: 'warning'});
            return;
          }
          _this.title = '考核参数根目录新增';
          _this.switchTreeStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.treeForm.resetFields();
            // yufp.clone(_this.treeParam, _this.treeFormdata);
            _this.treeFormdata.menuId = null;
            _this.treeFormdata.parentMenuId = _this.treeParam.menuId;
            _this.treeFormdata.parentMenuName = _this.treeParam.menuName;
          });
        },
        modifyNodeFn: function () {
          var _this = this;
          if (_this.treeParam.menuId == undefined || _this.treeParam.menuId == '') {
            _this.$message({message: '请先选择目录节点', type: 'warning'});
            return;
          }
          if (_this.treeParam.menuName == '考核方案目录') {
            _this.$message({message: '根目录不允许修改！', type: 'warning'});
            return;
          }
          _this.switchTreeStatus('EDIT', true);
          _this.title = '考核参数根目录修改';
          _this.$nextTick(function () {
            _this.$refs.treeForm.resetFields();
            // this.treeFormdata.dirName = _this.currClickName;
            yufp.clone(_this.treeParam, _this.treeFormdata);
          });
        },
        switchTreeStatus: function (viewType, editable) {
          var _this = this;
          _this.treeDialogVisible = true;
          _this.treeformDisabled = !editable;
          _this.saveTreeBtnShow = editable;
        },
        startFn: function (row) {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          var model = {};
          model.schemeId = _this.$refs.refTable.selections[0].schemeId;
          model.statFlag = '0';
          _this.$confirm('是否确定启用?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafschemeexcel/schemePub',
                  data: model,
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('启用成功');
                  }
                });
              }
            }
          });
        },
        stopFn: function (row) {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          var model = {};
          model.schemeId = _this.$refs.refTable.selections[0].schemeId;
          model.statFlag = '1';
          _this.$confirm('是否确认停用?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafschemeexcel/schemePub',
                  data: model,
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('停用成功');
                  }
                });
              }
            }
          });
        }
      }
    });
  };
});