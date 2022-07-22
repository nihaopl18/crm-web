/**
 * @Created by 万爽 wanshuang@yusys.com.cn on 2020-1-3 10:26:13.
 * @updated by
 * @description 考核方案
 */
define([
  './custom/widgets/js/yufpExtTree.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/YufpUserSelector.js',
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/yufpSchemesqSelector.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,OBJ,CHECK_SCENE,YE_TYPE,INDEX_APPLY_TYPE,INDEX_TYPE,STAT_FLAG,SQ_OBJ_TYPE,CURRENCY_TYPE,IS_SCORE,SCHEME_CYCLE_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          addButton: !yufp.session.checkCtrl('addFn'),
          modifyButton: !yufp.session.checkCtrl('modifyFn'),
          deleteButton: !yufp.session.checkCtrl('deleteFn'),
          detailButton: !yufp.session.checkCtrl('infoFn'),
          startButton: !yufp.session.checkCtrl('startFn'),
          stopButton: !yufp.session.checkCtrl('stopFn'),
          addNodeButton: !yufp.session.checkCtrl('addNodeFn'),
          modifyNodeButton: !yufp.session.checkCtrl('modifyNode'),
          deleteNodeButton: !yufp.session.checkCtrl('deleteNodeFn'),
          postCheckAll: false,
          menuVisible: false,
          menuStyle: {
            'position': 'fixed',
            'left': '0px',
            'top': '0px'
          },
          dataUrl: backend.appBaseService + '/api/pmafscheme/querylist',
          treeUrl: backend.appBaseService + '/api/pmafschememenu/querylist',
          indexUrl: backend.appBaseService + '/api/pmafschemeindexrel/queryIndexForScore',
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
              { required: true, message: '字段不能为空' },
              { validator: yufp.validator.endDate, message: '结束日期不能小于当前日期'}

            ]
          },
          treeParam: {},
          activeName: 'tabOne',
          tabOneDisable: true,
          tabTwoDisable: true,
          tabThreeDisable: true,
          tabFourDisable: true,
          tabFiveDisable: true,
          paramList: [],
          indexList: [],
          activeNameOne: 'first',
          dataUrlOne: backend.appBaseService + '/api/pmafbaseindexinfo/querylist',
          dataUrlTwo: backend.appBaseService + '/api/pmafevlindexinfo/queryUpOrglist',
          dialogThreeVisible: false,
          dialogScoreVisible: false,
          activeNames: ['1', '2'],
          scoreActiveNames: ['1', '2','3'],
          queryDataOne: {},
          queryDataTwo: {},
          scoreIndexDetail: {},
          spannum: '14',
          spannumOne: '7',
          treeOrgUrl: backend.appOcaService + '/api/util/getorgtree',
          dataParams: {
            // orgId: yufp.session.details.grantOrgCode
            orgCode: yufp.session.org.code
            // lazy: true
          },
          treeScoreParam: {
            schemeId: ''
          },
          treeIndexData: [],
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
          scoreRoot: {
            indexId: '-1',
            objId: '-1',
            indexName: '考核指标根目录',
            label: '考核指标根目录'
          },
          scoreDefaultCheckedKey:'',
          paramsOne: {},
          paramsTwo: {},
          queryFormOne: {},
          queryFormTwo: {},
          queryFormThree: {},
          treePostUrl: backend.appBaseService + '/api/adminsmpost/querylist',
          dataUrlFour: backend.appBaseService + '/api/pmafschemeindexrel/queryIndex',
          paramsFour: {},
          paramsSix: {},
          indexType: '',
          indexDisable: false,
          indexDisableOne: false,
          treeFlag: false,
          tempSelection: [],
          grantTableParams: {},
          grantDataUrl: '/api/pmafschemeauth/querylist',
          grantFormDialogVisible: false,
          grantAddFormDialogVisible: false,
          quoteFormDialogVisible: false,
          quoteFormData: {},
          quoteSchemeSelParams: {
            user: {
              dataUrl: '/api/pmafschemeauth/querylistbymodel'
            }
          },
          grantAddFormData: {},
          dialogFourVisible: false,
          formObj: {},
          hiddenUserFlag: true,
          hiddenOrgFlag: true,
          orgTreeParams: {
            needCheckbox: true,
            checkStrictly: true
          },
          paramListTemp: [],
          dialogFiveVisible: false,
          treeNodeTemp: [],
          scoreOptions: [],
          scoreModel: {},
          scoreIndexList: [],
          scoreIndex: {},
          scoreIndexParamList: [],
          scoreIndexParam: {},
          scoreParamList: [],
          cnNameMap:{},
          preObjList: [],
          treeOneCheckBox: false,
          objSelectedList:[],
          totalWeight:0,
          lookupIndexApplyType: [],
          lookupIndexBalType: [],
          objTableCheckBox: "checkbox"
        };
      },
      created() {
        var _this = this;
        var con1 = {
          isExcel: '1'
        };
        _this.params = {
          condition: JSON.stringify(con1)
        };
      },
      watch: {
        // postCheckAll: function (val) {
        //   if (val) {
        //     var tempKeys = [];
        //     for (i in this.$refs.refTreeTwo.data) {
        //       tempKeys.push(this.$refs.refTreeTwo.data[i].sysPostCode);
        //     }
        //     this.$refs.refTreeTwo.setCheckedKeys(tempKeys);
        //   }
        // },
        tabTwoDisable: function (newVal) {
          var _this = this;
          _this.$refs.refTreeOne.setCheckedKeys([]);
          // _this.$refs.refTreeTwo.setCheckedKeys([]);
          // _this.$refs.selectType.formdata.speRuleType = '1';
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
              // _this.postCheckAll = false;
              // yufp.service.request({
              //   method: 'GET',
              //   url: '/api/pmafschemepostrel/queryPost',
              //   data: {
              //     condition: JSON.stringify(model)
              //   },
              //   callback: function (code, message, response) {
              //     var list = response.data;
              //     if (list.length > 0) {
              //       var listIdList = [];
              //       for (var i = 0; i < list.length; i++) {
              //         listIdList.push(list[i].postId);
              //       }
              //       _this.$refs.refTreeTwo.setCheckedKeys(listIdList);
              //       if (listIdList.length == _this.$refs.refTreeTwo.data.length) {
              //         _this.postCheckAll = true;
              //       }
              //     }
              //   }
              // });
              // yufp.service.request({
              //   method: 'GET',
              //   url: '/api/pmafschemesperulerel/querySperule',
              //   data: {
              //     condition: JSON.stringify(model)
              //   },
              //   callback: function (code, message, response) {
              //     if (response.data.length > 0) {
              //       _this.paramList = response.data;
              //       _this.$refs.selectType.formdata.speRuleType = _this.paramList[0].speRuleType;
              //     }
              //   }
              // });
            }
          }
        },
        tabThreeDisable: function (newVal) {
          var _this = this;
          if (!newVal) {
            var con1, con2;
            if (_this.formdata.evlObjType == '01') {
              con1 = {
                indexId: _this.queryFormOne.indexId,
                indexName: _this.queryFormOne.indexName,
                indexState: '1'
              };
              con2 = {
                indexId: _this.queryFormTwo.indexId,
                indexState: '1'
              };
            } else {
              con1 = {
                objType: _this.formdata.evlObjType,
                indexId: _this.queryFormOne.indexId,
                indexName: _this.queryFormOne.indexName,
                indexState: '1'
              };
              con2 = {
                objType: _this.formdata.evlObjType,
                indexId: _this.queryFormTwo.indexId,
                indexState: '1'
              };
            }
            // 查询基础指标
            _this.paramsOne = {
              condition: JSON.stringify(con1)
            };
            // 查询派生指标
            _this.paramsTwo = {
              condition: JSON.stringify(con2)
            };
            // 查询方案指标
            _this.paramsFour = {
              condition: JSON.stringify({
                schemeId: _this.formdata.schemeId
              })
            };
            
            // 查询评分模型中指标信息使用
            _this.treeScoreParam.schemeId = _this.formdata.schemeId;

            _this.$nextTick(function () {
              _this.$refs.refTableOne.remoteData(_this.paramsOne);
              _this.$refs.refTableTwo.remoteData(_this.paramsTwo);
              _this.$refs.refTableFour.remoteData(_this.paramsFour);
            });
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
        closeContentmenu: function () {
          var _this = this;
          _this.menuVisible = false;
        },
        menuClick: function () {
          var _this = this;
          yufp.service.request({
            method: 'POST',
            url: backend.appBaseService + '/api/pmafscheme/drawScheme',
            data: {
              schemeId: _this.tempSelection[0].schemeId,
              menuId: _this.treeNodeTemp.menuId
            },
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.dialogFiveVisible = false;
                _this.$refs.refTable.remoteData();
                _this.$message('引用成功');
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
        },
        rowClick: function () {
          var _this = this;
          _this.tempSelection = _this.$refs.refTable.selections;
        },
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
            this.$message({ message: '请输入数字', type: 'warning' });
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
          _this.tabFourDisable = true;
          _this.tabFiveDisable = true;
          _this.treeFlag = !editable;
          if (_this.formDisabled) {
            _this.spannum = '24';
          } else {
            _this.spannum = '14';
          }
          if(_this.formDisabled){
            _this.objTableCheckBox="";
          }else {
            _this.objTableCheckBox="checkbox";
          }
        },
        nodeClickFn: function (nodeData, node, self) {
          var _this = this;
          _this.treeParam = nodeData;
          // 根据选择的节点id获取查询条件，右侧表格刷新数据
          _this.queryData.menuId = nodeData.menuId;
          _this.params = {};
          _this.params = {
            condition: JSON.stringify({
              isExcel: '1',
              menuId: nodeData.menuId,
              schemeId: _this.queryData.schemeId,
              schemeName: _this.queryData.schemeName
            })
          };
          _this.$refs.refTable.remoteData(_this.params);
        },
        nodeContextmenuFn: function (event, object, node, element) {
          var _this = this;
          if (_this.tempSelection.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          _this.treeNodeTemp = object;
          _this.menuVisible = true;
          _this.menuStyle.left = event.clientX + 20 + 'px';
          _this.menuStyle.top = event.clientY - 10 + 'px';
        },

        // setScoreIndexList: function() {
        //   var _this = this;
        //   _this.scoreIndex.scoreParamList = _this.scoreParamList;
        //   _this.scoreIndex.scoreWeight = _this.$refs.weightInput.formdata.scoreWeight;
        //   let have = false;
        //   if (_this.scoreIndexList.length > 0) {
        //     _this.scoreIndexList.forEach(function (val, index, arr) {
        //       if (val.indexId == _this.scoreIndex.indexId && _this.scoreIndex.scoreModelId && _this.scoreIndex.scoreModelId != '') {
        //         arr[index] = _this.scoreIndex;
        //         have = true;
        //       }
        //     })
        //   }
        //   if (!have && _this.scoreIndex.scoreModelId && _this.scoreIndex.scoreModelId != '') {
        //     _this.scoreIndexList.push(_this.scoreIndex);
        //   }
        // },
        changeScoreIndex: function (nodeData) {
          var _this = this;
          _this.setScoreIndexList();
          _this.scoreIndex = {};
          _this.scoreParamList = [];
          let have = false;
          if (_this.scoreIndexList.length > 0) {
            _this.scoreIndexList.forEach(function (val, index, arr) {
              if (val.indexId == nodeData.indexId) {
                _this.scoreIndex = val;
                _this.$refs.weightInput.formdata.scoreWeight = val.scoreWeight;
                _this.$refs.scoreSelect.formdata.scoreModelId = val.scoreModelId;
                _this.scoreParamList = val.scoreParamList;
                have = true;
              }
            })
          }
          if (!have) {
            _this.scoreIndex.indexId = nodeData.indexId;
            _this.$refs.scoreSelect.formdata.scoreModelId = '';
            _this.$refs.weightInput.formdata.scoreWeight = '';
          }
  

        },

        changeScore: function (val) {
          var _this = this;
          _this.queryParamConfig(val);
          if (_this.scoreIndex.indexId != '') {
            _this.scoreIndex.scoreModelId = val;
            _this.scoreOptions.forEach(function (option) {
              if (option.key == val) {
                _this.scoreIndex.scoreFormula = option.caclformula;
                _this.scoreIndex.caclRule = option.caclRule;
                _this.scoreIndex.modelDesc = option.modelDesc;
              }
            });
          }
         
        },

        queryParamConfig: function(scoreModelId){
          //查询选中模型的参数
          var _this = this;
          yufp.clone(_this.scoreIndex.paramMap,_this.scoreIndexParam);
          yufp.service.request({
            method: 'GET',
            url: '/api/pmafschemescorerel/queryParamsByModelId',
            data: {
              modelId: scoreModelId
            },
            callback: function (code, message, response) {
              if (response.data.length > 0) {
                _this.scoreParamList = response.data;
                yufp.clone(response.data,_this.scoreParamList);
                _this.cnNameMap={};
                _this.scoreParamList.forEach(function (item,index){
                  _this.cnNameMap[item.enName] = item.cnName;
                });
              }
            }
          });
        },
        /**
         * 评分配置
         */
        configScore: function () {
          var _this = this;
          var selRow = _this.$refs.refTableSix.selections;
          if (selRow.length != 1) {
            _this.$message({ message: '请选择一条指标数据', type: 'warning' });
            return;
          }
          // 根据考核方案ID指标ID查询当前选中的指标已绑定的评分模型及参数信息
          _this.queryAllScoreConfig();
          _this.queryScoreModelBySchemeId();
          _this.dialogScoreVisible = true;
          var obj = selRow[0];
          _this.$nextTick(function () {
            _this.$refs.refScoreIndexOne.resetFields();
            yufp.clone(obj, _this.scoreIndexDetail);
          });
        },
        
        queryAllScoreConfig: function(){
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: '/api/pmafschemescorerel/queryAllScoreInfo',
            callback: function (code, message, response) {
              var list = response.data;
              _this.scoreOptions = [];
              if (list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                  _this.scoreOptions.push(list[i]);
                }
                
              }
            }
          });
        },
        /**
         * 查询评分模型配置信息，修改和详情时使用
         */
         queryScoreModelBySchemeId: function() {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: '/api/pmafschemescorerel/queryScoreModelBySchemeId',
            data: {
              schemeId: _this.formdata.schemeId,
              indexId: _this.$refs.refTableSix.selections[0].indexId,
              applyType: _this.$refs.refTableSix.selections[0].applyTypeId,
              balType: _this.$refs.refTableSix.selections[0].balTypeId,
              evlObjType:  _this.$refs.refTableSix.selections[0].evlObjType
            },
            callback: function (code, message, response) {
              if (code == 0) {
                yufp.clone(response.data,_this.scoreIndex);
                _this.totalWeight = response.data.totalWeight - response.data.scoreWeight;
                _this.queryParamConfig(_this.scoreIndex.scoreModelId);
              }
            }
          });
        },

        saveScoreConfig: function () {
          var _this = this;
          if(_this.formDisabled){
            _this.dialogScoreVisible=false;
            return;
          }
          var tt = Number(_this.totalWeight);
          var tw = Number(_this.scoreIndex.scoreWeight);
          if((tt +tw )>100){
            _this.$message({ message: "权重之和不能大于100，请重新配置！", type: 'error' });
            return;
          }
          debugger;
          _this.scoreIndex.schemeId =  _this.formdata.schemeId;
          _this.scoreIndex.indexId = _this.scoreIndexDetail.indexId;
          _this.scoreIndex.evlObjType = _this.scoreIndexDetail.evlObjType;
          _this.scoreIndex.applyType = _this.scoreIndexDetail.applyTypeId;
          _this.scoreIndex.balType = _this.scoreIndexDetail.balTypeId;
          _this.scoreIndex.currency = _this.scoreIndexDetail.currency?_this.scoreIndexDetail.currency:'01';
          _this.scoreIndex.paramMap = _this.scoreIndexParam;
          _this.scoreIndex.cnNameMap = _this.cnNameMap;
          // 保存列表数据
          yufp.service.request({
            method: 'POST',
            url: backend.appBaseService + '/api/pmafschemescorerel/saveSchemeIndexScore',
            data: _this.scoreIndex,
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.$message({ message: '保存成功', type: 'success' });
                _this.dialogScoreVisible=false;
                _this.$refs.refTableSix.remoteData(_this.paramsSix);
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
        },
        copmlateIndexFn: function (){
          var _this = this;
          _this.$confirm('请确保已配置了考核对象和考核指标, 否则会导致方案无法启用, 是否继续?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                _this.closeFn();
              }
            }
          });
        },
        copmlateScoreFn: function (){
          var _this = this;
          _this.$confirm('请确保所有指标都已设置评分标准，并且所有指标评分权重之和等于100%, 否则会导致方案无法启用, 是否继续?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                _this.closeFn();
              }
            }
          });
        },
        cancelScoreConfig: function () {
          var _this = this;
          _this.dialogScoreVisible=false;
        },
        treeOneClickFn: function(data,node,zj) {
          var _this = this;
          if(_this.treeOneCheckBox == false){
            if(_this.formDisabled){
              return;
            }
            _this.$refs.refTablePreObj.clearSelection();
              //根据机构去查询对应的考核对象
              yufp.service.request({
                method: 'GET',
                url: backend.appBaseService + '/api/pmautil/getTeamOrMktInfo',
                data: {
                  orgId: data.orgId,
                  evlObjType: _this.formdata.evlObjType
                },
                callback: function (code, message, response) {
                  if (response.code == 0) {
                    _this.preObjList = response.data;
                    
                  } else {
                    _this.$message({ message: response.message, type: 'error' });
                  }
                }
              });
          }
        },

        preObjSelectFn: function(selection,row) {
          var _this = this;
          var obj = {};
          obj.paramId = row.paramId;
          obj.paramName = row.paramName;
          if(row.__selected === true){
            if (_this.userflagEqual(row.paramId)) {
              _this.objSelectedList.push(obj);
            }
          }else {
            var index = _this.objSelectedList.findIndex(item => item.paramId ===obj.paramId);
            if (index!=-1) {
              _this.objSelectedList.splice(index,1);
            }
          }
        },

        getObjListBySchemeId: function () {
          //根据机构去查询对应的考核对象
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmafscheme/getObjList',
            data: {
              schemeId: _this.formdata.schemeId,
              evlObjType: _this.formdata.evlObjType
            },
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.preObjList = response.data;
                _this.objSelectedList = response.data;
                _this.$refs.refTablePreObj.clearSelection();
                _this.$refs.refTablePreObj.toggleAllSelection();
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
        },

        /**
         * 新增
         */
        addFn: function () {
          var _this = this;
          if (_this.treeParam.menuId == undefined || _this.treeParam.menuId == '') {
            _this.$message({ message: '请先选择目录节点', type: 'warning' });
            return;
          }
          if (_this.treeParam.menuName == '考核方案目录') {
            _this.$message({ message: '根目录不允许添加！', type: 'warning' });
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
          if(_this.$refs.refTable.selections[0].statFlag=='0'){
            _this.$message({ message: '启用状态的方案不允许修改', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
            _this.formdata.startDate = new Date(_this.formdata.startDate.replace(/-/g, '/'));
            _this.formdata.endDate = new Date(_this.formdata.endDate.replace(/-/g, '/'));
            // _this.queryScoreModelBySchemeId();
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
            _this.formdata.startDate = new Date(_this.formdata.startDate.replace(/-/g, '/'));
            _this.formdata.endDate = new Date(_this.formdata.endDate.replace(/-/g, '/'));
            // _this.queryScoreModelBySchemeId();
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
                  url: '/api/pmafschemeauth/deletegrantinf',
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
            url: '/api/pmafschemeauth/addgrantinf',
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
        // 方案引用-按钮fn
        quoteFn: function () {
          var _this = this;
          if (_this.treeParam.menuId == undefined || _this.treeParam.menuId == '') {
            _this.$message({ message: '请先选择目录节点', type: 'warning' });
            return;
          }
          if (_this.treeParam.menuName == '考核方案目录') {
            _this.$message({ message: '根目录不允许添加！', type: 'warning' });
            return;
          }
          _this.quoteFormDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.quoteForm.resetFields();
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
          var flag = false;
          for (var i = 0; i < len; i++) {
            if(selections[i].statFlag=='0'){
              flag= true;
            }
            arr.push(selections[i].schemeId);
          }
          if(flag){
            _this.$message({ message: '启用状态的考核方案不能删除，请重新选择！', type: 'warning' });
            return;
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
                  url: backend.appBaseService + '/api/pmafscheme/delScheme',
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
          _this.objSelectedList.splice(index, 1);
          var preSelect = _this.$refs.refTablePreObj.selections;
          if(preSelect.length>0){
             var inex = preSelect.findIndex(item => item.paramId === row.paramId);
             if(inex!=-1){
              _this.$refs.refTablePreObj.toggleRowSelection(preSelect[inex]);
             }
          }
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
            case 4:
              _this.tabThreeDisable = false;
              _this.tabFourDisable = true;
              _this.activeName = 'tabThree';
              break;
            case 5:
              _this.tabFourDisable = false;
              _this.tabFiveDisable = true;
              _this.activeName = 'tabFour';
              break;
          }
        },
        fromToDate: function (date) {
          if (date) {
            date = date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
            date = new Date(date.replace(/-/g, '/'));
          }
          return date;
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
                  url: backend.appBaseService + '/api/pmafscheme/drawScheme',
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

        getTotalWeight: function(schemeId) {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmafschemescorerel/queryTotalWeightBySchemeId',
            data: {schemeId:schemeId},
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.totalWeight = response.data;
              }else{
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
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
              if (_this.formdata.evlObjType == '02') {
                _this.spannumOne = '12';
                _this.treeOneCheckBox = true;
              } else {
                _this.treeOneCheckBox = false;
                _this.spannumOne = '7';
                if (_this.$refs.refUserRelateObjIds) {
                  // _this.$refs.refUserRelateObjIds.$children[0].$children[0].setRawValue('');
                }
               
              }
              model.startDate = yufp.util.dateFormat(model.startDate, '{y}{m}{d}');
              model.endDate = yufp.util.dateFormat(model.endDate, '{y}{m}{d}');
              model.isExcel = '1';
              var url = '';
              if (model.id) {
                url = backend.appBaseService + '/api/pmafscheme/editInfo';
              } else {
                url = backend.appBaseService + '/api/pmafscheme/addInfo';
              }
              yufp.service.request({
                method: 'POST',
                url: url,
                data: model,
                callback: function (code, message, response) {
                  if (response.code == 0) {
                    response.data.startDate = _this.fromToDate(response.data.startDate);
                    response.data.endDate = _this.fromToDate(response.data.endDate);
                    yufp.clone(response.data, _this.formdata);
                    // 保存基本信息方法(可以新增也可以修改，新增要返回主键并赋值)
                    _this.tabOneDisable = true;
                    _this.tabTwoDisable = false;
                    _this.getObjListBySchemeId();
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
                var model = {};
                model.schemeId = _this.formdata.schemeId;
                model.evlObjType = _this.formdata.evlObjType;
                // 考核对象为机构时
                if(_this.formdata.evlObjType=="02"){
                  var orgList = _this.$refs.refTreeOne.getCheckedNodes();
                  // 校验机构树必选
                  if (orgList.length <= 0) {
                    _this.$message({ message: '请至少选择一个机构', type: 'warning' });
                    return;
                  }
                  var orgList1 = [];
                  orgList.forEach(function(item,index){
                    var obj = {};
                    obj.paramId = item.orgId;
                    obj.paramName = item.orgName;
                    orgList1.push(obj);
                  })
                  model.objList=orgList1;
                }else {
                  //校验团队或者客户经理必选
                  if (_this.objSelectedList.length<1){
                    if( _this.formdata.evlObjType == "01"){
                      _this.$message({ message: '请至少选择一个客户经理', type: 'warning' });
                    }else {
                      _this.$message({ message: '请至少选择一个客户经理', type: 'warning' });
                    }
                    return;
                  }else {
                    model.objList = _this.objSelectedList;
                  }
                }
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafscheme/saveObj',
                  data: model,
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _this.tabTwoDisable = true;
                      _this.tabThreeDisable = false;
                      _this.activeName = 'tabThree';
                      _this.activeNameOne = 'first';
                    } else {
                      _this.$message({ message: response.message, type: 'error' });
                    }
                  }
                });
              }
              _this.$nextTick(function () {
                _this.queryFormOne.indexName='';
                _this.queryFormOne.indexId='';
                _this.queryFormTwo.indexId='';
                _this.queryFormThree.indexName='';
                _this.queryFormThree.indexId='';
                _this.$refs.refTableFour.remoteData(_this.paramsFour);
              });
              break;
            case 3:
              // 保存右侧数据
              _this.tabThreeDisable = true;
              _this.tabFourDisable = false;
              _this.activeName = 'tabFour';
              // 查询方案指标
              _this.paramsSix = {
                condition: JSON.stringify({
                  schemeId: _this.formdata.schemeId
                })
              };
              _this.$refs.refTableSix.remoteData(_this.paramsSix);
              _this.getTotalWeight(_this.formdata.schemeId);
              break;
            case 4:
              _this.scoreModel.schemeId = _this.formdata.schemeId;
              _this.setScoreIndexList();
              _this.scoreModel.scoreIndexList = _this.scoreIndexList;
              // 保存列表数据
              yufp.service.request({
                method: 'POST',
                url: backend.appBaseService + '/api/pmafschemescorerel/saveSchemeIndexScore',
                data: _this.scoreModel,
                callback: function (code, message, response) {
                  if (response.code == 0) {
                    _this.$message({ message: '保存成功', type: 'success' });
                    _this.closeFn();
                  } else {
                    _this.$message({ message: response.message, type: 'error' });
                  }
                }
              });
              break;
            case 5:
              // 保存列表数据
              _this.dialogVisible = false;
              // 清除所有数据痕迹
              break;
          }
        },
        closeFn: function () {
          var _this = this;
          _this.dialogVisible = false;
          _this.paramList = [];
          _this.$refs.refTreeOne.setCheckedKeys([]);
          // _this.$refs.refTreeTwo.setCheckedKeys([]);
          _this.scoreParamList = [];
          _this.scoreIndex = {};
          if(_this.$refs.weightInput){
            _this.$refs.weightInput.formdata.scoreWeight = '';
          }
          if(_this.$refs.scoreSelect){
            _this.$refs.scoreSelect.formdata.scoreModelId = '';
          }
         
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
          var newList = this.objSelectedList.filter(function (obj) {
            return obj.paramId == loginCode;
          });
          if (newList.length > 0) {
            return false;
          } else {
            return true;
          }
        },

        getIndexLookUpItem: function (lookUpCode, indexId) {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmautil/getLookUpItemByIndexId',
            data: {
              lookUpCode: lookUpCode,
              indexId: indexId
            },
            callback: function (code, message, response) {
              if (response.code == 0) {
                if(lookUpCode==="INDEX_APPLY_TYPE"){
                  _this.lookupIndexApplyType = response.data;
                }else if (lookUpCode==="YE_TYPE"){
                  _this.lookupIndexBalType = response.data;
                }
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
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
            _this.$refs.refFormTwo.formdata.currency = obj.currency;
            _this.indexDisableOne = false;
            if (_this.formdata.evlObjType != '01') {
              _this.indexDisable = true;
            }
            _this.getIndexLookUpItem("INDEX_APPLY_TYPE",obj.indexId);
            _this.getIndexLookUpItem("YE_TYPE",obj.indexId);
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
            _this.$refs.refFormTwo.formdata.evlObjType = obj.objType;
            _this.$refs.refFormTwo.formdata.balTypeId = '01';
            _this.$refs.refFormTwo.formdata.applyTypeId = '01';
            _this.indexDisableOne = true;
            if (_this.formdata.evlObjType != '01') {
              _this.indexDisable = true;
            }
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
            url: backend.appBaseService + '/api/pmafscheme/addIndex',
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
            _this.$message({ message: '请先选择目录节点', type: 'warning' });
            return;
          }
          if (_this.treeParam.menuName == '考核方案目录') {
            _this.$message({ message: '根目录不允许删除！', type: 'warning' });
            return;
          }
          if(_this.treeParam.children.length>0){
            _this.$message({ message: '存在子目录，不允许删除', type: 'warning' });
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
                  url: backend.appBaseService + '/api/pmafscheme/querylist',
                  data: model,
                  callback: function (code, message, response) {
                    var list = response.data;
                    if (list.length > 0) {
                      _this.$message({ message: '该目录下有已存在的方案，暂不能删除', type: 'warning' });
                    } else {
                      yufp.service.request({
                        method: 'POST',
                        url: backend.appBaseService + '/api/pmafschememenu/delete',
                        data: _this.treeParam.menuId,
                        callback: function (code, message, response) {
                          if (code == 0) {
                            _this.$refs.refTree.remoteData();
                            _this.$message({ message: '删除节点成功' });
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
            _this.$message({ message: '请先选择目录节点', type: 'warning' });
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
            _this.$message({ message: '请先选择目录节点', type: 'warning' });
            return;
          }
          if (_this.treeParam.menuName == '考核方案目录') {
            _this.$message({ message: '根目录不允许修改！', type: 'warning' });
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
          if(_this.$refs.refTable.selections[0].statFlag=='0'){
            _this.$message({ message: '方案已启用，无需重复启用！', type: 'warning' });
            return;
          }
          var model = {};
          model.schemeId = _this.$refs.refTable.selections[0].schemeId;
          model.statFlag = '0';
          model.checkScene = _this.$refs.refTable.selections[0].checkScene;
          _this.$confirm('是否确定启用?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafscheme/schemePub',
                  data: model,
                  callback: function (code, message, response) {
                    if(response.code == '0'){
                      _this.$refs.refTable.remoteData();
                      _this.$message('启用成功');
                    }else {
                      _this.$message({ message: response.message, type: 'warning' });
                    }
                   
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
          if(_this.$refs.refTable.selections[0].statFlag=='1'){
            _this.$message({ message: '方案已停用，无需重复停用！', type: 'warning' });
            return;
          }
          var model = {};
          model.schemeId = _this.$refs.refTable.selections[0].schemeId;
          model.statFlag = '1';
          model.checkScene = _this.$refs.refTable.selections[0].checkScene;
          _this.$confirm('是否确认停用?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafscheme/schemePub',
                  data: model,
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('停用成功');
                  }
                });
              }
            }
          });
        },
        /**
         * 授权
         */
        authorizeFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          _this.hiddenUserFlag = true;
          _this.hiddenOrgFlag = true;
          _this.dialogFourVisible = true;
          _this.paramList = [];
          _this.paramListTemp = [];
          // 查询数据
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmafschemeauth/querylist',
            data: {
              condition: JSON.stringify({
                schemeId: selections[0].schemeId
              })
            },
            callback: function (code, message, response) {
              if (response.data.length > 0) {
                var data = response.data[0];
                yufp.clone(data, _this.formObj);
                _this.paramListTemp = response.data;
              } else {
                _this.$refs.refFormThree.resetFields();
              }
            }
          });
        },
        searchChangeFn: function (val) {
          var _this = this;
          switch (val) {
            case '1':
              _this.hiddenUserFlag = false;
              _this.hiddenOrgFlag = true;
              _this.formObj.sqObjId = '';
              if (_this.paramListTemp) {
                if (_this.paramListTemp[0].sqObjType == '1') {
                  _this.paramList = _this.paramListTemp;
                } else {
                  _this.paramList = [];
                }
              } else {
                _this.paramList = [];
              }
              if (_this.$refs.refUserRelateObjIds) {
                _this.$refs.refUserRelateObjIds.$children[0].$children[0].setRawValue('');
              }
              break;
            case '2':
              _this.hiddenUserFlag = true;
              _this.hiddenOrgFlag = false;
              _this.formObj.sqObjId = '';
              if (_this.paramListTemp) {
                if (_this.paramListTemp[0].sqObjType == '2') {
                  _this.paramList = _this.paramListTemp;
                } else {
                  _this.paramList = [];
                }
              } else {
                _this.paramList = [];
              }
              if (_this.$refs.refOrgRelateObjIds) {
                _this.$refs.refOrgRelateObjIds.$children[0].$children[0].setRawValue('');
              }
              break;
          }
        },
        cancelThreeFn: function () {
          var _this = this;
          _this.dialogFourVisible = false;
        },
        saveThreeFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.refFormThree.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var objList = [];
          for (var i = 0; i < _this.paramList.length; i++) {
            var obj = {};
            obj.schemeId = _this.$refs.refTable.selections[0].schemeId;
            obj.sqObjType = _this.formObj.sqObjType;
            obj.paramId = _this.paramList[i].paramId;
            obj.paramName = _this.paramList[i].paramName;
            objList.push(obj);
          }
          yufp.service.request({
            method: 'POST',
            url: backend.appBaseService + '/api/pmafschemeauth/addInfo',
            data: JSON.stringify(objList),
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.dialogFourVisible = false;
                _this.$refs.refFormThree.resetFields();
                _this.$message({ message: '授权成功' });
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
        },
        orgSelectFn: function (data) {
          var _this = this;
          var formData = _this.$refs.refTable.selections[0];
          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              if (_this.flagEqual(data[i].orgId)) {
                var obj = {};
                obj.paramId = data[i].orgId;
                obj.paramName = data[i].orgName;
                _this.paramList.push(obj);
              }
            }
          }
        },
        flagEqual: function (orgId) {
          var newList = this.paramList.filter(function (obj) {
            return obj.orgId == orgId;
          });
          if (newList.length > 0) {
            return false;
          } else {
            return true;
          }
        },
        changeScene: function(val){
          if(val === '03'){
            document.getElementById("tab-tabFour").style.display='none';
          }else {
            document.getElementById("tab-tabFour").style.display='';
          }
        },
        drawFn: function () {
          var _this = this;
          if (_this.treeParam.menuId == undefined || _this.treeParam.menuId == '') {
            _this.$message({ message: '请先选择目录节点', type: 'warning' });
            return;
          }
          if (_this.treeParam.menuName == '考核方案目录') {
            _this.$message({ message: '根目录不允许添加！', type: 'warning' });
            return;
          }
          _this.dialogFiveVisible = true;
          _this.$nextTick(function () {
            _this.$refs.refFormFour.resetFields();
          });
        },
        cancelFourFn: function () {
          var _this = this;
          _this.dialogFiveVisible = false;
        }
      }
    });
  };
});