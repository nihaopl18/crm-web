/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2020-5-26 14:27:30.
 * @updated by
 * @description 考核方案运行结果
 */
define([
  './custom/widgets/js/yufpSchemeExcel.js',
  './custom/widgets/js/yufpSchemeobjSelector.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('EXCEL_RUN_STATUS,EXCEL_PUB_STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          datePickerOptions: {
            disabledDate: function (time) {
              return time.getTime() >= Date.now();
            }
          },
          dataUrl: '/api/commonexcel/getschemeruninfolist',
          runResultFormEvlObjShow: false,
          runResultSchemeObjParams: { checkboxVal: false },
          runResultFormDialogVisible: false,
          runResultFormData: {},
          schemeId: '',
          templateType: '',
          evlObjType: '',
          schemeExcelParams: {},
          runResultDialogTitle: '考核方案结果查询',
          runResultDialogVisible: false,
          hideFormData: {}
        };
      },
      methods: {
        clearObj: function (obj) {
          for (var key in obj) {
            if (key != 'cellType') {
              obj[key] = null;
            }
          }
          return obj;
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
            arr.push(selections[i].id);
          }
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: 'api/commonexcel/delete',
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
        // 运行结果查询-按钮fn
        preRunResultFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          if (_this.$refs.refTable.selections[0].runStatus != '1') {
            _this.$message({ message: '请选择运行成功的记录', type: 'warning' });
            return;
          }
          if (_this.$refs.refTable.selections[0].schemeType == '02') {
            _this.runResultFormEvlObjShow = true; // 单元格类型考核方案，考核对象展示
            _this.runResultSchemeObjParams.schemeId = _this.$refs.refTable.selections[0].schemeId;
          } else {
            _this.runResultFormEvlObjShow = false;
          }
          _this.runResultFormDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.runResultRefForm.resetFields();
            _this.runResultFormData.schemeName = _this.$refs.refTable.selections[0].schemeName;
            _this.runResultFormData.etlDate = _this.$refs.refTable.selections[0].etlDate;
            _this.runResultFormData.evlObjName = '';
          });
        },
        // 方案运行结果-考核对象放大镜回调
        runResultSchemeObjSel: function (data) {
          if (data && data.length > 0) {
            this.runResultFormData.evlObjName = data[0].evlObjName;
          }
        },
        // 查看运行结果fn
        runResultFn: function () {
          var _this = this;
          // 表单校验
          var validate = false;
          _this.$refs.runResultRefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          _this.schemeId = _this.$refs.refTable.selections[0].schemeId;
          _this.templateType = _this.$refs.refTable.selections[0].schemeType;
          _this.evlObjType = _this.$refs.refTable.selections[0].evlObjType;
          // 调用检查接口，判断当前选择的数据日期(考核对象)，该考核方案是否已运行
          yufp.service.request({
            method: 'GET',
            url: '/api/commonexcel/checkrunresultinfo',
            data: {
              schemeId: _this.schemeId,
              etlDate: _this.runResultFormData.etlDate,
              evlObjId: _this.runResultFormData.evlObjId
            },
            callback: function (code, message, response) {
              if (response.code == 0) {
                // 构造excel组件参数
                _this.schemeExcelParams = {
                  excelModel: '03',
                  readOnly: true,
                  etlDate: _this.runResultFormData.etlDate,
                  evlObjId: _this.runResultFormData.evlObjId,
                  cellDetail: false,
                  showRowName: true,
                  showColumnName: true
                };
                _this.runResultDialogTitle = '考核方案结果查询:{' + _this.runResultFormData.schemeName + '/' +
                                    _this.runResultFormData.etlDate +
                                    (_this.runResultFormData.evlObjName ? '/' + _this.runResultFormData.evlObjName : '') +
                                    '}';
                // 查询-考核方案发布隐藏行列信息
                yufp.service.request({
                  method: 'GET',
                  url: '/api/commonexcel/getschemehideinfo',
                  data: {
                    schemeId: _this.schemeId,
                    etlDate: _this.runResultFormData.etlDate
                  },
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _this.runResultDialogVisible = true;
                      _this.$nextTick(function () {
                        yufp.clone(response.data, _this.hideFormData);
                      });
                    } else {
                      // 清空隐藏行列表单数据
                      _this.clearObj(_this.hideFormData);
                      _this.runResultDialogVisible = true;
                    }
                  }
                });
              } else if (response.code == -1 || response.code == -9) {
                _this.$message({ message: response.message, type: 'warning' });
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
        },
        // 导出excel-Fn
        exportExcelFn: function () {
          var _this = this;
          yufp.service.request({
            method: 'POST',
            url: '/api/commonexcel/makeschemeexcelfile',
            data: {
              title: 'RUNINFO',
              schemeId: _this.schemeId,
              etlDate: _this.runResultFormData.etlDate,
              jsonStr: JSON.stringify(_this.$refs.runResultSchemeExcel.getExcelJson())
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
        // 发布考核方案Fn
        pubSchemeFn: function () {
          var me = this;
          var colMsg = '单元格考核方案所有考核对象展示行/列保持一致，';
          var msg = '是否确定发布考核方案【' + me.$refs.refTable.selections[0].schemeName + '】';
          if (!me.hideFormData.hideRows && !me.hideFormData.hideCols) {
            msg = '未设置隐藏行/列，' + msg;
          }
          if (me.$refs.refTable.selections[0].schemeType == '02') {
            msg = colMsg + msg;
          }
          me.$confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '/api/commonexcel/pubscheme',
                  data: {
                    runId: me.$refs.refTable.selections[0].id,
                    schemeId: me.$refs.refTable.selections[0].schemeId,
                    etlDate: me.$refs.refTable.selections[0].etlDate,
                    hideRows: me.hideFormData.hideRows,
                    hideCols: me.hideFormData.hideCols,
                    hideColsIndex: me.hideFormData.hideColsIndex
                  },
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      me.$message({message: '发布成功'});
                    } else {
                      me.$message({ message: response.message, type: 'error' });
                    }
                  }
                });
              }
            }
          });
        },
        // excel-隐藏/取消隐藏回调函数
        hideOrShowRowCols: function (params) {
          var selectionModule = params.selectionModule;
          var visibleFlag = params.visibleFlag;
          var utils = params.utils;
          var row = selectionModule.row;
          var rowCount = selectionModule.rowCount;
          var col = selectionModule.col;
          var colCount = selectionModule.colCount;
          if (row == -1) { // 列
            for (var i = 0; i < colCount; ++i) {
              var colIndex = col + i;
              var colIndexName = utils.toABC(colIndex + 1); // 实际索引从0开始，此方法对应1:A/2:B
              if (!visibleFlag) { // 隐藏
                if (!this.hideFormData.hideColsIndex || this.hideFormData.hideColsIndex.indexOf(colIndex + '$') < 0) {
                  this.hideFormData.hideColsIndex = (this.hideFormData.hideColsIndex ? this.hideFormData.hideColsIndex : '') +
                    colIndex + '$';
                  this.hideFormData.hideCols = (this.hideFormData.hideCols ? this.hideFormData.hideCols : '') +
                    colIndexName + '$';
                }
              } else { // 取消隐藏
                if (this.hideFormData.hideColsIndex && this.hideFormData.hideColsIndex.indexOf(colIndex + '$') >= 0) {
                  if (this.hideFormData.hideColsIndex.indexOf(colIndex + '$') + (colIndex + '$').length == this.hideFormData.hideColsIndex.length) {
                    this.hideFormData.hideColsIndex = '';
                  } else {
                    this.hideFormData.hideColsIndex = this.hideFormData.hideColsIndex.substr(0, this.hideFormData.hideColsIndex.indexOf(colIndex + '$')) +
                      this.hideFormData.hideColsIndex.substr(this.hideFormData.hideColsIndex.indexOf(colIndex + '$') + (colIndex + '$').length);
                  }
                  if (this.hideFormData.hideCols.indexOf(colIndexName + '$') + (colIndexName + '$').length == this.hideFormData.hideCols.length) {
                    this.hideFormData.hideCols = '';
                  } else {
                    this.hideFormData.hideCols = this.hideFormData.hideCols.substr(0, this.hideFormData.hideCols.indexOf(colIndexName + '$')) +
                      this.hideFormData.hideCols.substr(this.hideFormData.hideCols.indexOf(colIndexName + '$') + (colIndexName + '$').length);
                  }
                }
              }
            }
          } else if (col == -1) { // 行
            for (var i = 0; i < rowCount; ++i) {
              var rowIndex = row + i;
              rowIndex += 1;
              if (!visibleFlag) { // 隐藏
                if (!this.hideFormData.hideRows || this.hideFormData.hideRows.indexOf(rowIndex + '$') < 0) {
                  this.hideFormData.hideRows = (this.hideFormData.hideRows ? this.hideFormData.hideRows : '') +
                    rowIndex + '$';
                }
              } else { // 取消隐藏
                if (this.hideFormData.hideRows && this.hideFormData.hideRows.indexOf(rowIndex + '$') >= 0) {
                  if (this.hideFormData.hideRows.indexOf(rowIndex + '$') + (rowIndex + '$').length == this.hideFormData.hideRows.length) {
                    this.hideFormData.hideRows = '';
                  } else {
                    this.hideFormData.hideRows = this.hideFormData.hideRows.substr(0, this.hideFormData.hideRows.indexOf(rowIndex + '$')) +
                      this.hideFormData.hideRows.substr(this.hideFormData.hideRows.indexOf(rowIndex + '$') + (rowIndex + '$').length);
                  }
                }
              }
            }
          }
        }
      }
    });
  };
});