/**
 * @Created by 张成龙 zhangcl3@yusys.com.cn on 2019-2-15 09:25:13.
 * @updated by
 * @description 客户评价方案
 */
define([
  './custom/widgets/js/yufp.baseindex.js',
  'libs/js-xlsx/xlsx.full.min.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0238,CD0016,CD0032');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custgradeService + '/api/custgradescheme/querylist',
          dataUrlDeatil: backend.custgradeService + '/api/custgradescheme/querydetail',
          formdata: {},
          rule: [
            { required: true, message: '必填项' },
            { max: 1000, message: '1000个字符以内', trigger: 'blur'},
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          dialogVisible: false,
          deatilVisible: false, // 控制详情面板显示
          formDisabled: false,
          dialogVisibleShow: false,
          viewType: 'DETAIL',
          memoFlag: 1 ,// 备注合并几行标志
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          activeNames: ['1'],
          standardId: 10000, // 评价标准 ID 值
          standardData: [], // 评价标准 数据
          levelData: [], // 评价参数 数据
          levelDataObject: {}, // 评价参数 对象 ~ 存储不同评价标准的 不同评价参数
          params: {
            indexUse: '1' // 评价方案类型
          },
          indexCode: '',
          index: {
            selectFalg: '', // 选择标治
            selectIndexCode: '',
            selectIndexName: ''
          },
          inputShow: false, // 默认指标选择
          currentStandardid: '', // 当前选中行
          deatilTitle: '详情',
          STANDARD_TYPE: [{key: '1', value: '单指标评价'},
            {key: '2', value: '综合评价'}], // 标准类型
          IF_FLAG: [],
          GRADE_LEVEL: [],
          schemeType: [{key: '1', value: '价值等级评价方案'},
            {key: '2', value: '服务等级评价方案'},
            {key: '3', value: '流失预警方案'}
          ],
          gradeFrequency: [{key: '1', value: '月'},
            {key: '2', value: '季度'},
            {key: '3', value: '年'},
            {key: '4', value: '日'} ],

          gradeFrom: {
            model: [{schemeName: 1002, schemeType: 1, gradeType: 1, isUsed: 0, gradeFrequency: 1, gradeBeginDate: '2019-02-14', gradeEndDate: '2019-02-27', memo: 11111}],
            standardData: [{standardId: 'standardI10001', standardName: 11, standardType: 1, isUsed: 1, gradeFormula: 1, gradeFormulaExplain: 2}],
            levelDataObject: {standardI10001: [{standardId: 'standardI10001', gradeLevel: 0, levelLower: 1, levelUpper: 1, levelCritical: 1},
              {standardId: 'standardI10001', gradeLevel: 1, levelLower: 2, levelUpper: 2, levelCritical: 2},
              {standardId: 'standardI10001', gradeLevel: 2, levelLower: 3, levelUpper: 3, levelCritical: 3},
              {standardId: 'standardI10001', gradeLevel: 3, levelLower: 4, levelUpper: 4, levelCritical: 4},
              {standardId: 'standardI10001', gradeLevel: 4, levelLower: 5, levelUpper: 5, levelCritical: 5},
              {standardId: 'standardI10001', gradeLevel: 5, levelLower: 6, levelUpper: 6, levelCritical: 6},
              {standardId: 'standardI10001', gradeLevel: 6, levelLower: 7, levelUpper: 7, levelCritical: 7},
              {standardId: 'standardI10001', gradeLevel: 7, levelLower: 8, levelUpper: 8, levelCritical: 8}]}}
        };
      },

      mounted: function () {
        var _this = this;
        yufp.lookup.bind('CD0238', function (options) {
          _this.IF_FLAG = options;
        });
        yufp.lookup.bind('CD0032', function (options) {
          _this.GRADE_LEVEL = options;
        });
        _this.$refs.refTable.tableData = _this.gradeFrom.model;
      },
      methods: {
        /**
          * 列合并
          */
        arraySpanMethod: function ({row, column, rowIndex, columnIndex}) {
          var _this=this;
          var deatilTable=_this.$refs.refDeatilTable.tabledata;
          _this.memoFlag =(deatilTable.length+1)/8;
          // if( _this.memoFlag>1){
          //   var standardName=deatilTable[0].standardName;
          //       standardNamefalg=0;
          //   for (var i=8;deatilTable.length;i+=8)
          //   {
          //       if(standardName=deatilTable[i].standardName){
          //         standardNamefalg =i/8+1;
          //       }else {
          //         standardName=deatilTable[i].standardName;
          //       }
          //   }
          // }
         
          if (columnIndex === 0||columnIndex === 1||columnIndex === 2||columnIndex === 3||columnIndex === 4||columnIndex === 5) {
            var num =8;
            if(columnIndex === 0){
              num  *= this.memoFlag;
            }
            if (rowIndex%num=== 0) {
              return {
                rowspan: num,
                colspan: 1
              };
            } else {
                return {
                  rowspan: 0,
                  colspan: 0
                };
              }
          }
        },
        /**
         * 确定
         */
        cancelFnZj: function () {
          var _this = this;
          if (_this.index.selectIndexCode == '' || _this.index.selectIndexName == '') {
            _this.$message({ message: '请检查指标是否选择，指标解释是否填写！', type: 'warning' });
            return;
          }
          for (var i = 0; i < this.standardData.length; i++) {
            if (this.currentStandardid != '') {
              if (this.standardData[i].standardId == this.currentStandardid) {
                this.standardData[i].gradeFormula = _this.index.selectIndexCode;
                this.standardData[i].gradeFormulaExplain = _this.index.selectIndexName;
              }
            } else {
              _this.$message({ message: '请检查指标是否选择，指标解释是否填写！', type: 'warning' });
            }
          }
          _this.dialogVisibleShow = false;
        },
        selectIndex: function (data) {
          var indexCode = data[0].indexCode;
          var indexName = data[0].indexName;
          this.index.selectFalg += '#';
          this.index.selectIndexCode += indexCode;
          this.index.selectIndexName += indexName;
        },
        showZj: function (row, data) {
          var _this = this;
          _this.currentStandardid = data[row].standardId;
          _this.dialogVisibleShow = true;
          _this.indexCode = '';
          _this.index.selectIndexCode = data[row].gradeFormula;
          _this.index.selectIndexName = data[row].gradeFormulaExplain;
          // _this.$refs.baseIndex.$refs.baseIndex.selectedVal = '';
        },
        callExplain: function (data) {
          var indexCode = data[0].indexCode;
          var indexName = data[0].indexName;

          for (var i = 0; i < this.standardData.length; i++) {
            if (this.currentStandardid != '') {
              if (this.standardData[i].standardId == this.currentStandardid) {
                this.standardData[i].gradeFormulaExplain = indexName;
              }
            } else {
              if (this.standardData[i].gradeFormula == indexCode) {
                this.standardData[i].gradeFormulaExplain = indexName;
              }
            }
          }
        },
        changeParam: function (val) {
          this.params.indexUse = val;
          if (val == 3) {
            this.inputShow = true;
          } else {
            this.inputShow = false;
          }
        },
        /**
        * 格式化 时间
        */
        formData: function (row, column, cellValue) {
          if (cellValue == '' || cellValue == undefined) {
            return '';
          }
          var dateee = new Date(cellValue).toJSON();
          var date = new Date(+new Date(dateee) + (8 * 3600 * 1000)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          return date.split(' ')[0];
        },
        /**
       * 评价标准 新增行
       */
        addStandardFn: function () {
          var data = {};
          this.standardId++;
          data.standardId = 'standardI' + this.standardId;
          data.standardName = '';
          data.standardType = '';
          data.minusLevel = '';
          data.gradeFormula = '';
          data.gradeFormulaExplain = '';
          this.standardData.push(data);
        },
        /**
         * 移除 评价标准 行
         */
        deleteRow: function (index, rows) {
          var standardId = rows[index].standardId;
          // 当前重置为空
          this.currentStandardid = '';
          if (standardId != undefined && standardId != null) {
            delete this.levelDataObject[standardId];
            this.levelData = [];
            this.activeNames = ['1'];
          }
          rows.splice(index, 1);
        },
        /**
         * 评级标准选中行
         */
        handleCurrentChange: function (currentRow, event, column) {
          if (column != '' && column.property == 'oper') {
            // 屏蔽 移除按钮的 点击事件
            return false;
          }
          this.activeNames = ['1', '2'];
          var standardId = currentRow.standardId;
          // 记录下当前选中行的stangdardid
          this.currentStandardid = standardId;
          if (this.levelDataObject[standardId] != null && this.levelDataObject[standardId] != undefined) {
            this.levelData = this.levelDataObject[standardId];
          } else {
            this.levelData = [
              {'standardId': standardId, 'gradeLevel': '0', 'levelLower': '', 'levelUpper': '', 'levelCritical': ''},
              {'standardId': standardId, 'gradeLevel': '1', 'levelLower': '', 'levelUpper': '', 'levelCritical': ''},
              {'standardId': standardId, 'gradeLevel': '2', 'levelLower': '', 'levelUpper': '', 'levelCritical': ''},
              {'standardId': standardId, 'gradeLevel': '3', 'levelLower': '', 'levelUpper': '', 'levelCritical': ''},
              {'standardId': standardId, 'gradeLevel': '4', 'levelLower': '', 'levelUpper': '', 'levelCritical': ''},
              {'standardId': standardId, 'gradeLevel': '5', 'levelLower': '', 'levelUpper': '', 'levelCritical': ''},
              {'standardId': standardId, 'gradeLevel': '6', 'levelLower': '', 'levelUpper': '', 'levelCritical': ''},
              {'standardId': standardId, 'gradeLevel': '7', 'levelLower': '', 'levelUpper': '', 'levelCritical': ''}
            ];
            this.levelDataObject[standardId] = this.levelData;
          }
        },
        /**
         * 重置 下面这些数据
         * standardId: 10000, // 评价标准 ID 值
          standardData: [], // 评价标准 数据
          levelData: [], // 评价参数 数据
          levelDataObject: {} // 评价参数 对象 ~ 存储不同评价标准的 不同评价参数
         *
         */
        restParams: function () {
          this.activeNames = ['1'];
          this.standardId = 10000;
          this.standardData = [];
          this.levelData = [];
          this.levelDataObject = {};
          this.index = {
            selectFalg: '', // 选择标治
            selectIndexCode: '',
            selectIndexName: ''
          };
        },
        /**
         * 验证 评价标准列表 是否都输入了;
         */
        checkStandardData: function () {
          var standardData = this.standardData;
          if (standardData != null && standardData.length != 0) {
            var stadarFlag = standardData.every(function (obj) {
              for (var item in obj) {
                if (obj[item] == '') {
                  return false;
                }
              }
              return true;
            });
            return stadarFlag;
          }
          return true;
        },
        /**
         * 验证 是否都输入了
         * levelDataObject
         */
        checklevelDataObject: function () {
          var levelDataObject = this.levelDataObject;
          if (levelDataObject != null && JSON.stringify(levelDataObject) != '{}') {
            for (var item in levelDataObject) {
              var levelDateFlag = levelDataObject[item].every(function (obj) {
                for (var item in obj) {
                  if (obj[item] === '') {
                    return false;
                  }
                }
                return true;
              });
              if (!levelDateFlag) {
                return false;
              }
            }
          }
          return true;
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 取消
         */
        cancelDetailFn: function () {
          var _this = this;
          _this.deatilVisible = false;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          /**
          *     验证 评价标准列表
          */
          var standardDataFalg = _this.checkStandardData();
          if (!standardDataFalg) {
            _this.$message({ message: '请检查评价标准列表是否都已经输入！', type: 'warning' });
            return;
          }
          /**
           *  验证  评价标准参数列表
           */
          var checklevelDataFalg = _this.checklevelDataObject();
          if (!checklevelDataFalg) {
            _this.$message({ message: '请检查评价标准参数列表是否都已经输入！', type: 'warning' });
            return;
          }
          var allModel = {};
          allModel.model = model;
          allModel.standardData = _this.standardData;
          allModel.levelDataObject = _this.levelDataObject;
          /**
           * 根据ID 判断当前是新增还是修改
           */
          var url = 'insert';// 默认新增
          var updUrl = 'updategs';
          if (model.schemeId != '' && model.schemeId != undefined) {
            url = updUrl;
          }
          // _this.$message(JSON.stringify(allModel));
          //  向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custgradeService + '/api/custgradescheme/' + url,
            data: allModel,
            callback: function (code, message, response) {
              if (response.code == '-1') {
                _this.$message({ message: response.data + ':' + response.message, type: 'warning' });
                return;
              }
              _this.$refs.refTable.remoteData();
              _this.$message('操作成功');
              _this.dialogVisible = false;
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
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.restParams();
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.userCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
            _this.restParams();// 重置

            var param = {
              condition: JSON.stringify({
                schemeId: obj.schemeId
              })
            };
            //  查询评级标准信息
            yufp.service.request({
              method: 'GET',
              url: backend.custgradeService + '/api/custgradescheme/queryperiodlist',
              data: param,
              callback: function (code, message, response) {
                if (code == '0' && response.data != '') {
                  _this.standardData = response.data;
                  //  查询评级标准参数信息
                  yufp.service.request({
                    method: 'GET',
                    url: backend.custgradeService + '/api/custgradescheme/querygradelevel',
                    data: param,
                    callback: function (code, message, response) {
                      if (code == '0' && response.data != '') {
                        var glData = response.data;
                        for (var i = 0; i < _this.standardData.length; i++) {
                          _this.levelDataObject[_this.standardData[i].standardId] = [];
                          for (var j = 0; j < glData.length; j++) {
                            if (_this.standardData[i].standardId == glData[j].standardId) {
                              _this.levelDataObject[_this.standardData[i].standardId].push(glData[j]);
                            }
                          }
                        }

                        // 展示第二个列表数据
                        _this.handleCurrentChange(_this.standardData[0], '', '');
                      }
                    }
                  });
                }
              }
            });


            // 使用 ajax 去查询
            // _this.levelDataObject = _this.gradeFrom.levelDataObject;
          });
        },
        rowDblClick:function(row,event){
          var _this = this;
          _this.deatilTitle = '详情';
          _this.deatilVisible = true;
          _this.$nextTick(function () {
            var title = row.schemeName != '' ? row.schemeName : '评级方案';
            _this.deatilTitle = title + _this.deatilTitle;
            var schemeId = row.schemeId;
            var param = {
              condition: JSON.stringify({
                schemeId: schemeId
              })
            };
            _this.$refs.refDeatilTable.remoteData(param);
          })
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          _this.deatilTitle = '详情';
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.deatilVisible = true;
          _this.$nextTick(function () {
            // _this.$refs.refForm.resetFields();
            // yufp.clone(selectionsAry[0], _this.formdata);
            var title = selectionsAry[0].schemeName != '' ? selectionsAry[0].schemeName : '评级方案';
            _this.deatilTitle = title + _this.deatilTitle;
            var schemeId = selectionsAry[0].schemeId;
            var param = {
              condition: JSON.stringify({
                schemeId: schemeId
              })
            };
            _this.$refs.refDeatilTable.remoteData(param);
          // var  memo =deatilTable[0].memo;
          // var  memoFalg=0;
          // var standardName=deatilTable[0].standardName;
          //     for (var i=0;i<deatilTable.length;i+=8){
          //         if(i==0){
          //           continue;
          //         } 
          //         if (memo==deatilTable[i].memo){
          //            var  memoRow = i/8 +1
          //         }else {
          //           memo=deatilTable[i].memo;
          //           memoFalg++;
          //         }
                
          //     }
          });
        },
        /**
         * 启用
         */
        enableFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.userCode) {
              _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
              return;
            }
            if (selections[i].isUsed == '1') {
              _this.$message({ message: '请先选择一条未启用的数据', type: 'warning' });
              return;
            }
            arr.push(selections[i].schemeId);
          }
          yufp.service.request({
            method: 'POST',
            url: backend.custgradeService + '/api/custgradescheme/enable',
            data: {
              schemeId: arr.join(',')
            },
            callback: function (code, message, response) {
              if (code == '0') {
                if (response.code == '-1') {
                  _this.$refs.refTable.remoteData();
                  _this.$message({ message: response.data + ':' + response.message, type: 'warning' });
                } else {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                }
              }
            }
          });
        },
        /**
         * 禁用
         */
        disEnableFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.userCode) {
              _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
              return;
            }
            if (selections[i].isUsed == '0') {
              _this.$message({ message: '请先选择一条启用的数据', type: 'warning' });
              return;
            }
            arr.push(selections[i].schemeId);
          }
          yufp.service.request({
            method: 'POST',
            url: backend.custgradeService + '/api/custgradescheme/disenable',
            data: {
              schemeId: arr.join(',')
            },
            callback: function (code, message, response) {
              if (code == '0') {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              } else {
                _this.$refs.refTable.remoteData();
                _this.$message(message);
              }
            }
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
            if (selections[i].lastChgUsr != yufp.session.userCode) {
              _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
              return;
            }
            if (selections[i].isUsed == '1') {
              _this.$message({ message: '请先选择一条未启用的数据删除', type: 'warning' });
              return;
            }
            arr.push(selections[i].schemeId);
          }
          _this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custgradeService + '/api/custgradescheme/delete',
                  data: {
                    schemeId: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        /**
         * 导出操作
         */
        exportFn: function () {
          var _this = this;
          yufp.util.exportExcelByTable({
            ref: _this.$refs.refTable,
            url: backend.custgradeService + '/trade/example/list'
          });
        }
      }
    });
  };
});