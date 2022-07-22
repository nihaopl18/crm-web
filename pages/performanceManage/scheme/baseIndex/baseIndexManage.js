/**
 * @Created by mayan2 mayan2@yusys.com.cn on 2019-12-26
 * @updated by
 * @description 基础指标管理
 */
define([
  './custom/widgets/js/yufpExtTree.js',
  './custom/widgets/js/yufpBussTree.js'
], function (require, exports) {
  /**
  * 页面加载完成时触发
  * @param hashCode 路由ID
  * @param data 传递数据对象
  * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('INDEX_YW_TYPE,LOGIC_TYPE,CURRENCY_TYPE,OBJ,INDEX_APPLY_TYPE,YE_TYPE,METRIC_TYPE,PERIOD_TYPE,CONDITION_TYPE,CON_DIRE,INDEX_STATE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.appBaseService + '/api/pmafbaseindexinfo/querylist',
          indexIdStr: '',
          refTableData: {},
          cateData: [], // 目录树数据
          dataParams: {},
          addBtn: !yufp.session.checkCtrl('baseIndexAdd'),
          editBtn: !yufp.session.checkCtrl('baseIndexEdit'),
          delBtn: !yufp.session.checkCtrl('baseIndexDelete'),
          stoptn: !yufp.session.checkCtrl('baseIndexStop'),
          startBtn: !yufp.session.checkCtrl('baseIndexStart'),
          addFlag: false,
          addInfoFlag: false,
          addMenuBtn: !yufp.session.checkCtrl('indexCateAdd'),
          editMenuBtn: !yufp.session.checkCtrl('indexCateEdit'),
          deleteMenuBtn: !yufp.session.checkCtrl('indexCateDelete'),
          menuOperable: false,
          detailMenuBtn: true,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          viewType: 'DETAIL',
          infoIndexDialogVisible: false,
          addIndexDialogVisible: false,
          baseIndexMenuDialogVisible: false,
          indexMenulFormdata: {},
          indexquoDialogVisible: false,
          activeName: 'indexBaseInfo',
          activeNames: ['1', '2'],
          activeSelNames: ['1', '2'],
          indexbaseFormdata: {},
          indexInfoFormData: {},
          indexInfoFormData1: {},
          selConditionFormdata: {},
          formDisabled: false,
          selformDisabled: false,
          menuformDisabled: false,
          currClickNode: '',
          currClickName: '',
          saveMenuBtnShow: false,
          saveIndexNextBtnShow: false,
          saveIndexBtnShow: false,
          indexTabShow: false,
          queryData: {},
          selTabShow: false,
          sqlTabShow: false,
          midBussTyHidden: true,
          indexDisable: true,
          selDisable: true,
          sqlDisable: true,
          logicDisa: false,
          bizDisa: false,
          sqltextarea: '',
          treeParam: {},
          dataquoPData: [],
          indexSelDialogVisible: false,
          lookupShow: true,
          conditionComboShow: true,
          conditionShow: true,
          condirShow: true,
          baseIndexMenuTreeUrl: backend.appBaseService + '/api/pmafbaseindextype/querymenulist',
          height: yufp.custom.viewSize().height,
          dataConditionUrl: '',
          columnData: [],
          conditionData: [],
          dataConditionParams: {},
          indexBaseRule: {
            logicType: [
              { required: true, message: '字段不能为空', trigger: 'blur' }
            ],
            bizFlg: [
              { required: true, message: '字段不能为空', trigger: 'blur' }
            ],
            indexName: [
              { required: true, message: '字段不能为空', trigger: 'blur' }
            ],
            obj: [
              { required: true, message: '字段不能为空' }
            ],
            applyTypeId: [
              { required: true, message: '字段不能为空' }
            ],
            yeType: [
              { required: true, message: '字段不能为空' }
            ],
            currency: [
              { required: true, message: '字段不能为空' }
            ]
          },
          indexBaseMenuRule: {
            typeName: [
              { required: true, message: '字段不能为空', trigger: 'blur' }
            ]
          },
          optionsA: [],
          optionsB: [],
          bussParams: {
            width: 336,
            indexBusinessType: '',
            needCheckbox: true
          }
        };
      },
      mounted: function () {
      },
      methods: {
        handlemenuDialogClose: function () {
          var _this = this;
          _this.logicDisa = false;
          _this.bizDisa = false;
          _this.baseIndexMenuDialogVisible = false;
          _this.currClickNode = '';
          _this.currClickName = '';
        },
        handleindexinfoDialogClose: function () {
          var _this = this;
          _this.indexIdStr = '';
          // _this.currClickNode = '';
          // _this.currClickName = '';
          _this.logicDisa = false;
          _this.bizDisa = false;
          _this.addIndexDialogVisible = false; // 关闭新增指标窗口
          _this.$refs.refBaseTable.remoteData(); // 重新reload指标表格数据
        },
        handleDialogClose: function () {
          var _this = this;
          _this.infoIndexDialogVisible = false;
        },
        closeInfoBtn: function () {
          var _this = this;
          _this.infoIndexDialogVisible = false;
        },
        handleindexselDialogClose: function () {
          var _this = this;
          _this.indexSelDialogVisible = false;
          _this.$refs.refSelConditionForm.resetFields();
        },
        switchFunSettingStatus: function (viewType, editable) {
          var _this = this;// _this.saveBtnShow = editable;
          _this.addIndexDialogVisible = true;
          _this.formDisabled = !editable;
          _this.viewType = viewType;
        },
        switchIndexMenuStatus: function (viewType, editable) {
          var _this = this;
          _this.baseIndexMenuDialogVisible = true;
          _this.menuformDisabled = !editable;
          _this.saveMenuBtnShow = editable;
        },

        addFn: function () {
          var _this = this;
          _this.addInfoFlag = true;
          if (_this.currClickNode == '') {
            _this.$message({ message: '请先选择目录节点', type: 'warning' });
            return;
          }
          if (_this.treeParam.typeName == '基础指标树') {
            _this.$message({ message: '根目录不允许添加！', type: 'warning' });
            return;
          }
          _this.activeName = 'indexBaseInfo';
          _this.switchFunSettingStatus('ADD', true);
          _this.midBussTyHidden = true;
          _this.selDisable = true;
          _this.indexDisable = true;
          _this.sqlDisable = true;
          _this.saveIndexNextBtnShow = false; // 将下一步按钮设置为false
          _this.saveIndexBtnShow = false; // 将保存按钮设置为false
          _this.sqlTabShow = false; // 将sql标签页隐藏
          _this.selTabShow = false; // 将筛选信息标签页隐藏
          _this.indexTabShow = true;
          _this.sqltextarea = '';
          _this.$nextTick(function () {
            _this.$refs.refIndexBasegForm.resetFields(); // 清空新增面板的值
            _this.indexbaseFormdata.id = null;
            _this.indexbaseFormdata.indexCatalogId = _this.currClickNode;
            if (_this.$refs.bussNoRef) {
              _this.$refs.bussNoRef.$children[0].$children[0].resetCheckedKey();
            }
          });
        },
        closeBtn: function () {
          var _this = this;
          _this.indexquoDialogVisible = false;
        },
        logicClick: function (val) {
          // 原来的01-复杂类   // 02-配置类    //03-补录类    //04-自定义sql
          // 现在的 01简单类   02补录类
          // 补录类指标不需要选择业务品种
          // debugger;
          var _this = this;
          _this.$refs.refIndexBasegForm.formdata.middleinBussType = '';
          // console.log('val', val);
          console.log('val', val);
          if (val == '01') {
            _this.indexDisable = true;
            // _this.selDisable = true;
            _this.indexTabShow = true;
            // _this.selTabShow = true;
            // _this.sqlTabShow = false;
            // _this.saveIndexNextBtnShow = true;
            _this.saveIndexBtnShow = true;
            _this.midBussTyHidden = true;
          } else if (val == '02') {
            _this.indexDisable = true;
            _this.indexTabShow = true;
            // _this.selTabShow = false;
            // _this.sqlTabShow = false;
            _this.saveIndexBtnShow = true;
            // _this.saveIndexNextBtnShow = false;
            _this.midBussTyHidden = false;
          } else if (val == '03') {
            _this.indexDisable = true;
            _this.indexTabShow = true;
            _this.selTabShow = false;
            _this.sqlTabShow = false;
            _this.saveIndexBtnShow = true;
            _this.saveIndexNextBtnShow = false;
            _this.midBussTyHidden = true;
          } else {
            if (val != undefined) {
              _this.indexDisable = true;
              _this.sqlDisable = true;
              _this.indexTabShow = true;
              _this.selTabShow = false;
              _this.sqlTabShow = true;
              _this.saveIndexNextBtnShow = true;
              _this.saveIndexBtnShow = false;
              _this.midBussTyHidden = true;
            }
          }
        },
        bizFlgClick: function (val) {
          var _this = this;
          _this.bussParams.indexBusinessType = val;
        },
        modifyFn: function () {
          var _this = this;
          var selections = _this.$refs.refBaseTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请选择一条数据进行修改', type: 'warning'});
            return;
          }
          // if (selections[0].creatManNo != yufp.session.user.loginCode) {
          //   _this.$message({ message: '只能修改自己创建的数据', type: 'warning' });
          //   return;
          // }
          if (selections[0].indexState == '1') {
            _this.$message({ message: '只能修改未启用的数据', type: 'warning' });
            return;
          }
          var dataOrgId = selections[0].createOrg;
          // var authOrg = yufp.session.details.grantOrgCode;
          var authOrg = yufp.session.org.code;
          if (dataOrgId != authOrg) {
            _this.$message({ message: '请修改本机构数据!', type: 'warning' });
            return;
          }
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmafbaseindexinfo/iseditIndex',
            data: {
              'indexId': selections[0].indexId
            },
            callback: function (code, message, response) {
              if (code == 0) {
                var countN = response.data[0].countnum;
                if (parseInt(countN) > 0) {
                  _this.$message({ message: '指标已经应用,不允许编辑！', type: 'warning' });
                  return;
                } else {
                  _this.logicDisa = true;
                  _this.bizDisa = true;
                  _this.activeName = 'indexBaseInfo';
                  var logicType = selections[0].indexType;
                  if (logicType == '01') {
                    _this.indexDisable = true;
                    // _this.selDisable = true;
                    _this.indexTabShow = true;
                    // _this.selTabShow = true;

                    // _this.sqlTabShow = false;
                    // _this.saveIndexNextBtnShow = true;
                    _this.saveIndexBtnShow = true;
                  } else if (logicType == '02') {
                    _this.indexDisable = true;
                    _this.indexTabShow = true;
                    // _this.selTabShow = false;
                    // _this.sqlTabShow = false;
                    _this.saveIndexBtnShow = true;
                    // _this.saveIndexNextBtnShow = false;
                  } else if (logicType == '03') {
                    _this.indexDisable = true;
                    _this.indexTabShow = true;
                    _this.selTabShow = false;
                    _this.sqlTabShow = false;
                    _this.saveIndexBtnShow = true;
                    _this.saveIndexNextBtnShow = false;
                  } else {
                    _this.indexDisable = true;
                    _this.sqlDisable = true;
                    _this.indexTabShow = true;
                    _this.selTabShow = false;
                    _this.sqlTabShow = true;
                    // _this.saveIndexNextBtnShow = true;
                    _this.saveIndexBtnShow = false;
                  }
                  var indexType = selections[0].indexType;
                  if (indexType != '02') {
                    _this.midBussTyHidden = true;
                  } else {
                    _this.midBussTyHidden = false;
                  }
                  _this.switchFunSettingStatus('EDIT', true);
                  yufp.service.request({
                    method: 'GET',
                    url: backend.appBaseService + '/api/pmafbaseindexinfo/querywdlist',
                    data: {
                      'indexId': selections[0].indexId
                    },
                    callback: function (code, message, response) {
                      if (code == 0) {
                        var objs = [];
                        var applys = [];
                        var yues = [];
                        objs = response.data[0].objmap.split(',');
                        applys = response.data[1].applymap.split(',');
                        yues = response.data[2].yuemap.split(',');
                        _this.indexbaseFormdata.obj = objs;
                        _this.indexbaseFormdata.applyTypeId = applys;
                        _this.indexbaseFormdata.yeType = yues;
                      }
                    }
                  });
                  var obj = {};
                  yufp.clone(_this.$refs.refBaseTable.selections[0], obj);
                  _this.$nextTick(function () {
                    _this.$refs.refIndexBasegForm.resetFields();
                    // yufp.clone(obj, _this.indexbaseFormdata);
                    yufp.extend(_this.indexbaseFormdata, obj);
                  });
                }
              }
            }
          });
        },
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refBaseTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          for (var i in selections) {
            // if (selections[i].creatManNo != yufp.session.user.loginCode) {
            //   _this.$message({ message: '只能删除自己创建的数据', type: 'warning' });
            //   return;
            // }
            if (selections[i].indexState == '1') {
              _this.$message({ message: '不能删除启用中的数据', type: 'warning' });
              return;
            }
          }
          for (var j = 0; j < selections.length; j++) {
            var dataOrgId = selections[j].createOrg;
            // var authOrg = yufp.session.details.grantOrgCode;
            var authOrg = yufp.session.org.code;
            if (dataOrgId != authOrg) {
              _this.$message({ message: '请删除本机构数据!', type: 'warning' });
              return;
            }
          }
          var len = selections.length, arr = [], indexId = [];
          for (var i = 0; i < len; i++) {
            var obj = {};
            obj.id = selections[i].id;
            obj.indexId = selections[i].indexId;
            arr.push(obj);
            indexId.push(selections[i].indexId);
          }
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'GET',
                  url: backend.appBaseService + '/api/pmafbaseindexinfo/isOperIndexInfo',
                  data: { indexIds: indexId.join(',') },
                  callback: function (code, message, response) {
                    if (code == 0) {
                      // 判断指标是否可以删除
                      var flag = response.data.flag;
                      if (flag == '03') {
                        yufp.service.request({
                          method: 'POST',
                          url: backend.appBaseService + '/api/pmafbaseindexinfo/delete',
                          data: JSON.stringify(arr),
                          callback: function (code, message, response) {
                            _this.$refs.refBaseTable.remoteData();
                            _this.$message('操作成功');
                          }
                        });
                      } else {
                        _this.$message({ message: '该指标正在被引用，不可删除！', type: 'error' });
                        _this.indexquoDialogVisible = true;
                        _this.dataquoPData = response.data.datalist;
                      }
                    }
                  }
                });
              }
            }
          });
        },
        nexthandleClick: function (tab, event) {
          var _this = this;
          var validate = false;
          _this.$refs.refIndexBasegForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var objs = _this.indexbaseFormdata.obj.join(',');
          var applyIds = _this.indexbaseFormdata.applyTypeId.join(',');
          var yueIds = _this.indexbaseFormdata.yeType.join(',');
          var logicType = _this.indexbaseFormdata.indexType;
          var indexBusinessType = _this.indexbaseFormdata.indexBusinessType;
          var model = {};
          yufp.clone(_this.indexbaseFormdata, model);
          model.obj = objs;
          model.applyTypeId = applyIds;
          model.yeType = yueIds;
          if (_this.addInfoFlag) {
            _this.addInfoFlag = false;
            model.indexCatalogId = _this.currClickNode;
            yufp.service.request({
              method: 'POST',
              url: backend.appBaseService + '/api/pmafbaseindexinfo/add',
              data: model,
              callback: function (code, message, response) {
                if (code == 0) {
                  if (response.code == 0) {
                    _this.$message({ message: '数据保存成功！' });
                    if (logicType == '04') {
                      _this.sqlDisable = false;
                      _this.indexIdStr = response.data.indexId;
                      _this.activeName = 'sqlInfo';
                    } else {
                      _this.indexIdStr = response.data.indexId;
                      yufp.service.request({
                        method: 'GET',
                        url: backend.appBaseService + '/api/pmafbaseindexinfo/querycolumnlist',
                        data: {
                          'bizFlg': indexBusinessType
                        },
                        callback: function (code, message, response) {
                          if (code == 0) {
                            _this.columnData = response.data;
                            _this.selDisable = false;
                            _this.activeName = 'selInfo';
                          }
                        }
                      });
                      yufp.service.request({
                        method: 'GET',
                        url: backend.appBaseService + '/api/pmafbaseindexcondition/querylist',
                        data: {
                          'indexId': _this.indexIdStr
                        },
                        callback: function (code, message, response) {
                          if (code == 0) {
                            _this.conditionData = response.data;
                          }
                        }
                      });
                    }
                  } else {
                    _this.$message({ message: response.message, type: 'warning' });
                  }
                } else {
                  _this.$message({ message: message, type: 'warning' });
                }
              }
            });
          } else {
            model.indexTypeId = null;
            yufp.service.request({
              method: 'POST',
              url: backend.appBaseService + '/api/pmafbaseindexinfo/modify',
              data: model,
              callback: function (code, message, response) {
                if (code == 0) {
                  if (response.code == 0) {
                    _this.$message({ message: '数据保存成功！' });
                    if (logicType == '04') {
                      _this.indexIdStr = response.data.indexId;
                      yufp.service.request({
                        method: 'GET',
                        url: backend.appBaseService + '/api/pmafbaseindexinfo/querysqlinfo',
                        data: {
                          'indexId': response.data.indexId
                        },
                        callback: function (code, message, response) {
                          if (code == 0) {
                            if (response.data.length > 0) {
                              _this.sqltextarea = response.data[0].sqlContent;
                            } else {
                              _this.sqltextarea = '';
                            }
                            _this.sqlDisable = false;
                            _this.activeName = 'sqlInfo';
                          }
                        }
                      });
                    } else {
                      _this.indexIdStr = response.data.indexId;
                      yufp.service.request({
                        method: 'GET',
                        url: backend.appBaseService + '/api/pmafbaseindexinfo/querycolumnlist',
                        data: {
                          'bizFlg': indexBusinessType
                        },
                        callback: function (code, message, response) {
                          if (code == 0) {
                            _this.selDisable = false;
                            _this.activeName = 'selInfo';
                          }
                        }
                      });
                      yufp.service.request({
                        method: 'GET',
                        url: backend.appBaseService + '/api/pmafbaseindexcondition/querylist',
                        data: {
                          'indexId': _this.indexIdStr
                        },
                        callback: function (code, message, response) {
                          if (code == 0) {
                            _this.conditionData = response.data;
                          }
                        }
                      });
                    }
                  } else {
                    _this.$message({ message: response.message, type: 'warning' });
                  }
                } else {
                  _this.$message({ message: message, type: 'warning' });
                }
              }
            });
          }
        },
        addMenuFn: function () {
          var _this = this;
          _this.addFlag = true;
          if (_this.currClickNode == '') {
            _this.$message({ message: '请先选择目录节点', type: 'warning' });
            return;
          }
          _this.switchIndexMenuStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.indexMenuForm.resetFields();
            _this.indexMenulFormdata.id = null;
            _this.indexMenulFormdata.parentId = _this.currClickNode;
            _this.indexMenulFormdata.parentName = _this.currClickName;
          });
        },
        modifyMenuFn: function () {
          var _this = this;
          if (_this.currClickNode == '') {
            _this.$message({ message: '请先选择需要修改的目录节点', type: 'warning' });
            return;
          }
          if (!_this.menuOperable) {
            _this.$message({ message: '不允许修改根节点', type: 'warning' });
            return;
          }
          _this.switchIndexMenuStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.indexMenuForm.resetFields();
            yufp.clone(_this.treeParam, _this.indexMenulFormdata);
          });
        },
        deleteMenuFn: function () {
          var _this = this;
          if (_this.currClickNode == '') {
            _this.$message({ message: '请先选择需要删除的目录节点', type: 'warning' });
            return;
          }
          if (!_this.menuOperable) {
            _this.$message({ message: '不允许删除根节点', type: 'warning' });
            return;
          }
          var model = {};
          model.id = _this.currClickNode;
          _this.$confirm('是否确认删除该目录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'GET',
                  url: backend.appBaseService + '/api/pmafbaseindextype/deletevaldate',
                  data: { dirId: _this.currClickNode },
                  callback: function (code, message, response) {
                    if (code == 0) {
                      if (response.code == 0) {
                        var countNum = response.data[0].countnum;
                        if (countNum != '0') {
                          _this.$message({ message: '该目录下存在基础指标或者目录，不允许删除！', type: 'warning' });
                          return;
                        } else {
                          yufp.service.request({
                            method: 'POST',
                            url: backend.appBaseService + '/api/pmafbaseindextype/delete',
                            data: model,
                            callback: function (code, message, response) {
                              if (code == 0) {
                                if (response.code == 0) {
                                  _this.$refs.baseIndexMenuTree.remoteData();
                                  _this.$refs.refBaseTable.remoteData(_this.dataParams);
                                  _this.currClickNode = '';
                                  _this.$message(response.message);
                                } else {
                                  _this.$message({ message: response.message, type: 'warning' });
                                }
                              } else {
                                _this.$message({ message: message, type: 'warning' });
                              }
                            }
                          });
                        }
                      } else {
                        _this.$message({ message: response.message, type: 'warning' });
                      }
                    } else {
                      _this.$message({ message: message, type: 'warning' });
                    }
                  }
                });
              }
            }
          });
        },
        detailMenuFn: function () {
          var _this = this;
          if (this.currClickNode == '') {
            this.$message({ message: '请先选择需要查看的目录节点', type: 'warning' });
            return;
          }
          _this.switchIndexMenuStatus('EDIT', false);
          _this.$nextTick(function () {
            _this.$refs.indexMenuForm.resetFields();
            _this.indexMenulFormdata.typeName = _this.currClickName;
          });
        },
        nodeClickFn: function (nodeData, node, self) {
          var _this = this;
          _this.treeParam = nodeData;
          _this.currClickNode = nodeData.id;
          _this.currClickName = nodeData.typeName;
          _this.queryData.indexTypeId = nodeData.id;
          _this.menuOperable = nodeData.pid != null && nodeData.pid != undefined && nodeData.pid != '';
          var dataParams = {
            condition: JSON.stringify({
              indexTypeId: nodeData.id,
              indexId: _this.queryData.indexId,
              indexName: _this.queryData.indexName
            })
          };
          _this.$nextTick(function () {
            _this.$refs.refBaseTable.remoteData(dataParams);
          });
        },
        saveMenugFn: function () {
          var me = this;
          var validate = false;
          me.$refs.indexMenuForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(me.indexMenulFormdata, model);
          me.$confirm('是否保存数据?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                // 向后台发送保存请求
                if (me.addFlag) {
                  me.addFlag = false;
                  yufp.service.request({
                    method: 'POST',
                    url: backend.appBaseService + '/api/pmafbaseindextype/add',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0) {
                        if (response.code == 0) {
                          me.baseIndexMenuDialogVisible = false;
                          me.$message({ message: '数据保存成功！' });
                          me.$refs.baseIndexMenuTree.remoteData();
                          me.$refs.indexMenuForm.resetFields();
                          me.currClickNode = '';
                          me.currClickName = '';
                        } else {
                          me.$message({ message: response.message, type: 'warning' });
                        }
                      } else {
                        me.$message({ message: message, type: 'warning' });
                      }
                    }
                  });
                } else {
                  model.id = me.currClickNode;
                  yufp.service.request({
                    method: 'POST',
                    url: backend.appBaseService + '/api/pmafbaseindextype/modify',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0) {
                        if (response.code == 0) {
                          me.baseIndexMenuDialogVisible = false;
                          me.$message({ message: '数据保存成功！' });
                          me.$refs.baseIndexMenuTree.remoteData();
                          me.$refs.indexMenuForm.resetFields();
                          me.currClickNode = '';
                        } else {
                          me.$message({ message: response.message, type: 'warning' });
                        }
                      } else {
                        me.$message({ message: message, type: 'warning' });
                      }
                    }
                  });
                }
              }
            }
          });
        },
        cancelMenuFn: function () {
          var _this = this;
          _this.baseIndexMenuDialogVisible = false;
          _this.currClickNode = '';
          _this.currClickName = '';
        },
        infoFn: function () {
          var _this = this;
          var selections = _this.$refs.refBaseTable.selections;
          // console.log('selections', selections);
          if (selections.length != 1) {
            _this.$message({ message: '请选择一条记录进行查看', type: 'warning' });
            return;
          }
          // 详情弹窗
          _this.infoIndexDialogVisible = true;
          // _this.switchFunSettingStatus('DETAIL', true);
          var model = selections[0];
          // console.log('model', model)
          _this.$nextTick(function () {
            _this.$refs.refIndexBasegForm1.resetFields();
            yufp.service.request({
              method: 'POST',
              url: backend.appBaseService + '/api/pmafbaseindexinfo/info',
              data: model,
              callback: function (code, message, response) {
                // console.log('response', response)
                var objs = [];
                var applys = [];
                var yues = [];
                objs = response.data.obj.split(',');
                applys = response.data.applyTypeId.split(',');
                yues = response.data.yeType.split(',');
                // _this.indexInfoFormData = response.data;
                _this.indexInfoFormData1.obj = objs;
                _this.indexInfoFormData1.applyTypeId = applys;
                _this.indexInfoFormData1.yeType = yues;

                _this.indexInfoFormData1.indexId = response.data.indexId;
                _this.indexInfoFormData1.indexCatalogId = response.data.indexCatalogId;
                _this.indexInfoFormData1.indexBusinessType = response.data.indexBusinessType;
                _this.indexInfoFormData1.indexName = response.data.indexName;
                _this.indexInfoFormData1.currency = response.data.currency;
                _this.indexInfoFormData1.indexType = response.data.indexType;
                // console.log('indexInfoFormData', _this.indexInfoFormData)
              }
            });
          });
        },
        savaIndexInfoBtn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.refIndexBasegForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // var bussTy = _this.indexbaseFormdata.bussNo;
          // var indexType = _this.indexbaseFormdata.indexType;
          // if ((bussTy == null || bussTy == '') && indexType != '03') {
          //   _this.$message({ message: '请选择业务品种!', type: 'warning' });
          //   return;
          // }
          var objs = _this.indexbaseFormdata.obj.join(',');
          var applyIds = _this.indexbaseFormdata.applyTypeId.join(',');
          var yueIds = _this.indexbaseFormdata.yeType.join(',');
          var model = {};
          yufp.clone(_this.indexbaseFormdata, model);
          model.obj = objs;
          model.applyTypeId = applyIds;
          model.yeType = yueIds;
          if (_this.addInfoFlag) {
            model.catalogNo = _this.currClickNode;
            // console.log('model', model);
            yufp.service.request({
              method: 'POST',
              url: backend.appBaseService + '/api/pmafbaseindexinfo/add',
              data: model,
              callback: function (code, message, response) {
                if (code == 0) {
                  if (response.code == 0) {
                    _this.$message({ message: '数据保存成功！' });
                    _this.$refs.refIndexBasegForm.resetFields();
                    _this.indexIdStr = '';
                    // _this.currClickNode = '';
                    // _this.currClickName = '';
                    _this.logicDisa = false;
                    _this.bizDisa = false;
                    _this.addIndexDialogVisible = false; // 关闭新增指标窗口
                    _this.addInfoFlag = false;
                    _this.$refs.refBaseTable.remoteData(); // 重新reload指标表格数据
                  } else {
                    _this.$message({ message: response.message, type: 'warning' });
                  }
                } else {
                  _this.$message({ message: message, type: 'warning' });
                }
              }
            });
          } else {
            yufp.service.request({
              method: 'POST',
              url: backend.appBaseService + '/api/pmafbaseindexinfo/modify',
              data: model,
              callback: function (code, message, response) {
                if (code == 0) {
                  if (response.code == 0) {
                    _this.$message({ message: '数据保存成功！' });
                    _this.$refs.refIndexBasegForm.resetFields();
                    _this.indexIdStr = '';
                    _this.logicDisa = false;
                    _this.bizDisa = false;
                    // _this.currClickNode = '';
                    // _this.currClickName = '';
                    _this.addIndexDialogVisible = false; // 关闭新增指标窗口
                    _this.$refs.refBaseTable.remoteData(); // 重新reload指标表格数据
                  } else {
                    _this.$message({ message: response.message, type: 'warning' });
                  }
                } else {
                  _this.$message({ message: message, type: 'warning' });
                }
              }
            });
          }
        },
        lasthandleClick: function () {
          var _this = this;
          _this.activeName = 'indexBaseInfo';
          _this.logicDisa = true;
          _this.bizDisa = true;
        },
        savaFinishBtn: function () {
          var me = this;
          var model = {};
          model.indexId = me.indexIdStr;
          model.sqlContent = me.sqltextarea;
          me.$confirm('是否保存数据?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafbaseindexinfo/addsqlinfo',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      if (response.code == 0) {
                        me.$message({ message: '数据保存成功！' });
                        me.$refs.refIndexBasegForm.resetFields();
                        me.addIndexDialogVisible = false;
                        me.$refs.refBaseTable.remoteData();
                        me.indexIdStr = '';
                        me.currClickNode = '';
                        me.currClickName = '';
                        me.logicDisa = false;
                        me.bizDisa = false;
                      } else {
                        me.$message({ message: response.message, type: 'warning' });
                      }
                    } else {
                      me.$message({ message: message, type: 'warning' });
                    }
                  }
                });
              }
            }
          });
          // yufp.service.request({
          //   method: 'POST',
          //   url: backend.appBaseService + '/api/pmafbaseindexinfo/checksqlisexecute',
          //   data: me.sqltextarea,
          //   callback: function (code, message, response) {
          //     if (code == 0) {
          //       if (response.code == 0) { } else {
          //         me.$message({message: 'sql有误，请检查'});
          //         return false;
          //       }
          //     }
          //   }
          // });
          // 检验输入的sql是否为可执行
        },
        sellasthandleClick: function () {
          var _this = this;
          _this.activeName = 'indexBaseInfo';
          _this.logicDisa = true;
          _this.bizDisa = true;
        },
        selsavaFinishBtn: function () {
          var _this = this;
          _this.$refs.refIndexBasegForm.resetFields();
          _this.indexIdStr = '';
          _this.currClickNode = '';
          _this.currClickName = '';
          _this.logicDisa = false;
          _this.bizDisa = false;
          _this.addIndexDialogVisible = false; // 关闭新增指标窗口
          _this.$refs.refBaseTable.remoteData(); // 重新reload指标表格数据
        },
        columninfoFn: function () {
          var _this = this;
          var columnType = '';
          var codeNo = '';
          var colInfo = _this.indexbaseFormdata.indexBusinessType + ',' + _this.$refs.refColumnTable.selections[0].columnName;
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmafbaseindexinfo/sellookup',
            data: {},
            callback: function (code, message, response) {
              if (code == 0) {
                for (var i = 0; i < response.data.length; i++) {
                  var obj = {};
                  obj.key = response.data[i].lookupCode;
                  obj.value = response.data[i].lookupName;
                  _this.optionsA.push(obj);
                }
                yufp.service.request({
                  method: 'GET',
                  url: backend.appBaseService + '/api/pmafbaseindexinfo/selColumnType',
                  data: { 'colInfo': colInfo },
                  callback: function (code, message, response) {
                    if (code == 0) {
                      if (response.data[0].columnType == '0') { // 码值
                        _this.condirShow = false;
                        _this.lookupShow = false;
                        _this.conditionComboShow = false;
                        columnType = response.data[0].columnType;
                        codeNo = response.data[0].codeNo;
                        _this.selConditionFormdata.cdtType = columnType;
                        _this.selConditionFormdata.lookup = codeNo;
                      } else if (response.data[0].columnType == '1') { // 值域
                        _this.condirShow = false;
                        _this.conditionShow = false;
                        columnType = response.data[0].columnType;
                        _this.selConditionFormdata.cdtType = columnType;
                      } else { // 自定义
                        _this.conditionShow = false;
                        columnType = response.data[0].columnType;
                        _this.selConditionFormdata.cdtType = columnType;
                      }
                    }
                  }
                });
              }
            }
          });
          _this.indexSelDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.refSelConditionForm.resetFields();
            _this.lookupShow = true;
            _this.conditionComboShow = true;
            _this.conditionShow = true;
            _this.condirShow = true;
            yufp.clone(_this.$refs.refColumnTable.selections[0], _this.selConditionFormdata);
          });
        },
        condiChange: function (val) {
          // var _this = this;
        },
        lookUpChange: function (val) {
          var _this = this;
          if (val == undefined) {
            return;
          }
          _this.optionsB = [];
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmafbaseindexinfo/sellookupitem',
            data: { 'lookupCode': val },
            callback: function (code, message, response) {
              if (code == 0) {
                for (var i = 0; i < response.data.length; i++) {
                  var obj = {};
                  obj.key = response.data[i].lookupItemCode;
                  obj.value = response.data[i].lookupItemName;
                  _this.optionsB.push(obj);
                }
              }
            }
          });
        },
        cacleSel: function () {
          var _this = this;
          _this.indexSelDialogVisible = false;
          _this.$refs.refSelConditionForm.resetFields();
        },
        saveConditionClick: function () {
          var _this = this;
          var cdtTypeStr = _this.selConditionFormdata.cdtType;
          if (cdtTypeStr == '1') {
            var cdtValueStr = _this.selConditionFormdata.cdtValue;
            var a = cdtValueStr.substring(0, 1);
            var b = cdtValueStr.substring(cdtValueStr.length - 1, cdtValueStr.length);
            var numvalue = cdtValueStr.substring(1, cdtValueStr.length - 1);
            var numvalueStr = numvalue.split(',');
            if (numvalueStr.length != 2) {
              _this.$message({ message: '条件值输入格式有误！', type: 'warning' });
              return false;
            }
            if (a != '(' & a != '[') {
              _this.$message({ message: '条件值输入格式有误！', type: 'warning' });
              return false;
            }
            if (b != ')' & b != ']') {
              _this.$message({ message: '条件值输入格式有误！', type: 'warning' });
              return false;
            }
            if (parseInt(numvalueStr[0]) > parseInt(numvalueStr[1])) {
              _this.$message({ message: '条件值输入格式有误！', type: 'warning' });
              return false;
            }
          }
          // 判断自定义字段是否正常保存
          if (cdtTypeStr == '2') { // 自定义
            var cdtValueSt = _this.selConditionFormdata.cdtValue;
            var bussTypeStr = _this.indexbaseFormdata.indexBusinessType;
            var infoStr = bussTypeStr + '#' + cdtValueSt + '#' + _this.selConditionFormdata.columnName;
            yufp.service.request({
              method: 'POST',
              url: backend.appBaseService + '/api/pmafbaseindexinfo/checksqlisexecute',
              data: infoStr,
              callback: function (code, message, response) {
                if (code == 0) {
                  if (response.code == '1') {
                    _this.$message({ message: '条件值输入格式有误!', type: 'warning' });
                    return false;
                  } else {
                    var model = {};
                    yufp.clone(_this.selConditionFormdata, model);
                    model.cdtColumn = _this.selConditionFormdata.columnName;
                    model.indexId = _this.indexIdStr;
                    if (_this.selConditionFormdata.cdtType == '0') {
                      var objOptionKey = [];
                      var objOptionValue = [];
                      for (var j = 0; j < _this.selConditionFormdata.cdtValueName.length; j++) {
                        var index = _this.selConditionFormdata.cdtValueName[j];
                        for (var i = 0; i < _this.optionsB.length; i++) {
                          if (_this.optionsB[i].key == index) {
                            objOptionKey.push(_this.optionsB[i].key);
                            objOptionValue.push(_this.optionsB[i].value);
                          }
                        }
                      }
                      var objKeys = objOptionKey.join(',');
                      var objValues = objOptionValue.join(',');
                      model.cdtValue = objKeys;
                      model.cdtValueName = objValues;
                    } else {
                      model.cdtValueName = '';
                    }
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
                            url: backend.appBaseService + '/api/pmafbaseindexcondition/add',
                            data: model,
                            callback: function (code, message, response) {
                              if (code == 0) {
                                if (response.code == 0) {
                                  _this.$message({ message: '数据保存成功！' });
                                  _this.indexSelDialogVisible = false;
                                  yufp.service.request({
                                    method: 'GET',
                                    url: backend.appBaseService + '/api/pmafbaseindexcondition/querylist',
                                    data: {
                                      'indexId': _this.indexIdStr
                                    },
                                    callback: function (code, message, response) {
                                      if (code == 0) {
                                        _this.conditionData = response.data;
                                        _this.$refs.refSelConditionForm.resetFields();
                                      }
                                    }
                                  });
                                } else {
                                  _this.$message({ message: response.message, type: 'warning' });
                                }
                              } else {
                                _this.$message({ message: message, type: 'warning' });
                              }
                            }
                          });
                        }
                      }
                    });
                  }
                }
              }
            });
          } else {
            var model = {};
            yufp.clone(_this.selConditionFormdata, model);
            model.cdtColumn = _this.selConditionFormdata.columnName;
            model.indexId = _this.indexIdStr;
            if (_this.selConditionFormdata.cdtType == '0') {
              var objOptionKey = [];
              var objOptionValue = [];
              for (var j = 0; j < _this.selConditionFormdata.cdtValueName.length; j++) {
                var index = _this.selConditionFormdata.cdtValueName[j];
                for (var i = 0; i < _this.optionsB.length; i++) {
                  if (_this.optionsB[i].key == index) {
                    objOptionKey.push(_this.optionsB[i].key);
                    objOptionValue.push(_this.optionsB[i].value);
                  }
                }
              }
              var objKeys = objOptionKey.join(',');
              var objValues = objOptionValue.join(',');
              model.cdtValue = objKeys;
              model.cdtValueName = objValues;
            } else {
              model.cdtValueName = '';
            }
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
                    url: backend.appBaseService + '/api/pmafbaseindexcondition/add',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0) {
                        if (response.code == 0) {
                          _this.$message({ message: '数据保存成功！' });
                          _this.indexSelDialogVisible = false;
                          yufp.service.request({
                            method: 'GET',
                            url: backend.appBaseService + '/api/pmafbaseindexcondition/querylist',
                            data: {
                              'indexId': _this.indexIdStr
                            },
                            callback: function (code, message, response) {
                              if (code == 0) {
                                _this.conditionData = response.data;
                                _this.$refs.refSelConditionForm.resetFields();
                              }
                            }
                          });
                        } else {
                          _this.$message({ message: response.message, type: 'warning' });
                        }
                      } else {
                        _this.$message({ message: message, type: 'warning' });
                      }
                    }
                  });
                }
              }
            });
          }
        },
        deleteConBtn: function (row) {
          var _this = this;
          yufp.service.request({
            method: 'POST',
            url: backend.appBaseService + '/api/pmafbaseindexcondition/delCondition',
            data: row.id,
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.code == 0) {
                  _this.$message(response.message);
                  yufp.service.request({
                    method: 'GET',
                    url: backend.appBaseService + '/api/pmafbaseindexcondition/querylist',
                    data: {
                      'indexId': _this.indexIdStr
                    },
                    callback: function (code, message, response) {
                      if (code == 0) {
                        _this.conditionData = response.data;
                      }
                    }
                  });
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              } else {
                _this.$message({ message: message, type: 'warning' });
              }
            }
          });
        },
        startFn: function (row) {
          var _this = this;
          var selections = _this.$refs.refBaseTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          for (var j = 0; j < selections.length; j++) {
            var dataOrgId = selections[j].createOrg;
            // var authOrg = yufp.session.details.grantOrgCode;
            var authOrg = yufp.session.org.code;
            if (dataOrgId != authOrg) {
              _this.$message({ message: '请启用本机构数据!', type: 'warning' });
              return;
            }
            // 2022/5/30 weixy6 对于已经启用的指标，不可再次启用
            if (selections[j].indexState == '1') {
              _this.$message({ message: '选中的数据中含有已启用的指标，请检查！', type: 'warning'});
              return;
            }
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('是否确定启用?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafbaseindexinfo/startIndex',
                  data: arr.join(','),
                  callback: function (code, message, response) {
                    _this.$refs.refBaseTable.remoteData();
                    _this.$message('启用成功');
                  }
                });
              }
            }
          });
        },
        stopFn: function (row) {
          var _this = this;
          var selections = _this.$refs.refBaseTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          for (var j = 0; j < selections.length; j++) {
            var dataOrgId = selections[j].createOrg;
            // var authOrg = yufp.session.details.grantOrgCode;
            var authOrg = yufp.session.org.code;
            if (dataOrgId != authOrg) {
              _this.$message({ message: '请停用本机构数据!', type: 'warning' });
              return;
            }
            // 2022/5/30 weixy6 对于已经启用的指标，不可再次启用
            if (selections[j].indexState == '0') {
              _this.$message({ message: '选中的数据中含有已停用的指标，请检查！', type: 'warning'});
              return;
            }
          }
          var len = selections.length, arr = [], indexarr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
            indexarr.push(selections[i].indexId);
          }
          _this.$confirm('是否确认停用?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'GET',
                  url: backend.appBaseService + '/api/pmafbaseindexinfo/isOperIndexInfo',
                  data: { indexIds: indexarr.join(',') },
                  callback: function (code, message, response) {
                    if (code == 0) {
                      // 判断指标是否可以删除
                      var flag = response.data.flag;
                      if (flag == '03') {
                        yufp.service.request({
                          method: 'POST',
                          url: backend.appBaseService + '/api/pmafbaseindexinfo/stopIndex',
                          data: arr.join(','),
                          callback: function (code, message, response) {
                            _this.$refs.refBaseTable.remoteData();
                            _this.$message('停用成功');
                          }
                        });
                      } else {
                        _this.$message({ message: '该指标正在被引用，不可停用！', type: 'error' });
                        _this.indexquoDialogVisible = true;
                        _this.dataquoPData = response.data.datalist;
                      }
                    }
                  }
                });
              }
            }
          });
        },
        /**
         * 目录树加载数据后
         */
        loadCateData: function (orginalData) {
          var _this = this;
          _this.cateData = [];
          orginalData.forEach(function (item) {
            _this.cateData.push({ key: item.id, value: item.typeName });
          });
        }
      }
    });
  };
});