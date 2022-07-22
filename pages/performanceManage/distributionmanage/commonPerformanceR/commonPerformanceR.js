/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2020-2-10 10:45:42.
 * @updated by
 * @description 批量导入结果页面
 */
define([
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('PERFORMANCE_STATUS');
    var _this = yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          syncProcessFn: !yufp.session.checkCtrl('syncProcess'),
          asyncProcessFn: !yufp.session.checkCtrl('asyncProcess'),
          processTimeout: 300000, // 发起审批/重新发起审批 默认执行时间 5min
          ld: Object,
          isInitData: false,
          funCode: '', // 业绩类型 编号
          funName: '', // 业绩类型 名称
          funInfo: {}, // 业务功能注册信息缓存
          status: '', // 执行状态
          impTypeOptions: [], // '业绩类型' 字段数据集
          templateData: [{
            column: 3,
            fields: [{
              field: 'funCode',
              label: '业绩类型',
              ctype: 'select',
              clearable: false,
              options: [],
              linkage: function (ref, field, groupfield, xdynamicfield) {
                if (field.funCode) {
                  if (_this.funCode == field.funCode) {
                    return;
                  }
                  _this.funCode = field.funCode;
                  for (let item of _this.impTypeOptions) {
                    if (item.key == field.funCode) {
                      _this.funName = item.value;
                      break;
                    }
                  }
                }
              }
            }, {
              field: 'status',
              label: '执行状态',
              ctype: 'select',
              clearable: false,
              dataCode: 'PERFORMANCE_STATUS',
              linkage: function (ref, field, groupfield, xdynamicfield) {
                if (_this.status == field.status) {
                  return;
                }
                _this.status = field.status;
              }
            }]
          }],
          dataUrl: '/api/commonperformanceimp/queryresultlist',
          excelHeader: [],
          dialogVisible: false,
          uploadData: {},
          uploadHeaders: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          action: yufp.service.getUrl({url: '/api/commonperformanceimp/importErrData'})
        };
      },
      methods: {
        // refTable加载数据后，显示异常信息
        refTableLoaded: function (data, total, response) {
          if (response.code == -1) {
            this.$message({ message: response.message, type: 'warning' });
          } else if (response.code != 0) {
            this.$message({ message: response.message, type: 'error' });
          }
        },
        // 根据 业绩类型，生成excel展示列
        makeExcelHeaders: function () {
          /** 分配类型:1,比例分配; 2,比例+定额分配 */
          let dstrType = _this.funInfo.pageCfgInfo.DSTR_TYPE;
          /** 分配区间类型:1,单区间; 2,多区间 */
          let dstrPeriod = _this.funInfo.pageCfgInfo.DSTR_PERIOD;
          /** 信息表模型编码 */
          let infoTableCode;
          for (let tableCode in _this.funInfo.tableInfo) {
            if (_this.funInfo.tableInfo[tableCode].funSubType == '01') { // 01:信息表
              infoTableCode = tableCode;
            }
          }

          /** 动态生成字段配置项fields */
          let tableColsTemp = []; // 动态列字段
          for (let columnCode in _this.funInfo.columnInfo[infoTableCode]) {
            let tableCol = {};
            let columnInfo = _this.funInfo.columnInfo[infoTableCode][columnCode]; // 字段信息
            let columnCfgInfo = _this.funInfo.columnCfgInfo[columnCode]; // 字段配置信息

            // 默认所有字段都在列表展示
            tableCol.label = columnInfo.columnCnName;
            tableCol.ename = columnInfo.columnName;
            tableCol.sort = columnInfo.sort; // 字段排序
            if (columnCfgInfo) {
              if (columnCfgInfo.RESULT_WIDTH) { // 列宽
                tableCol.width = columnCfgInfo.RESULT_WIDTH;
              }
              if (columnCfgInfo.IMP_LOOKUP_ID) { // 数据字典
                tableCol.dataCode = columnCfgInfo.IMP_LOOKUP_ID;
              }
              if (columnCfgInfo.IMP_GRID_FIELD && columnCfgInfo.IMP_GRID_FIELD == '1') { // 配置了 是展示项
                tableColsTemp.push(tableCol);
              }
            }
          }
          if (_this.funCode == 'custDstr') { // 业绩类型为 '客户分配'
            tableColsTemp.push({label: '客户归属机构', ename: 'OPER_ORG_ID'});
          }
          /** 字段排序 */
          tableColsTemp.sort(function (a, b) {
            return a.sort - b.sort;
          });
          // ****************** 辽宁农信特殊处理 ******************
          // customerSaveAllot 存款业绩分配
          if (_this.funCode == 'customerSaveAllot') {
            tableColsTemp.push({
              label: '存款主账号',
              ename: 'DEPOSIT_MAIN_ACCOUNT'
            });
          } else if (_this.funCode == 'customerCreateInAllot') { // customerCreateInAllot 中收业务量分配
            tableColsTemp.push({
              label: '账号',
              ename: 'S_NUM'
            });
          } else if (_this.funCode == 'customerPrivateLoanAllot') { // customerPrivateLoanAllot 个人贷款业绩分配
            tableColsTemp.push({
              label: '账号',
              ename: 'ACCOUNT_NUMBER'
            });
          } else if (_this.funCode == 'customerAllot') { // customerAllot 客户分配
            tableColsTemp.push({
              label: '客户编号',
              ename: 'CUST_ID'
            });
            tableColsTemp.push({
              label: '客户ID',
              ename: 'ORG_ID'
            });
          } else if (_this.funCode == 'customerPublicLoanAllot') { // customerPublicLoanAllot 对公贷款业绩分配
            tableColsTemp.push({
              label: '账号',
              ename: 'ACCOUNT_NUMBER',
              dataType: 'string'
            });
          } else if (_this.funCode == 'customerCreateMoneyAllot') { // customerCreateMoneyAllot 中收收入分配
            tableColsTemp.push({
              label: '序号',
              ename: 'S_NUM'
            });
          }
          tableColsTemp.push({
            label: '客户经理编号',
            ename: 'MANAGER_ID'
          });
          tableColsTemp.push({
            label: '客户经理名称',
            ename: 'MANAGER_NAME'
          });
          /**
           * 如果是单区间分配，导入时不展示时间区间段
           * 1单区间  2多区间
          */
          if (dstrPeriod != '1') {
            tableColsTemp.push({
              label: '生效日期',
              ename: 'EFFECT_DATE'
            });
            tableColsTemp.push({
              label: '失效日期',
              ename: 'EXPIRATE_DATE'
            });
          }
          /**
           * 根据配置添加 绩效比例、定额分配（起始金额|结束金额）、
           *            定额+比例（起始金额|结束金额|比例）
           * 分配类型:1,比例分配; 2,比例+定额分配
          */
          if (dstrType == '2') {
            tableColsTemp.push({
              label: '起始金额',
              ename: 'START_AMT'
            });
            tableColsTemp.push({
              label: '结束金额',
              ename: 'END_AMT'
            });
            tableColsTemp.push({
              label: '业绩分配比例（%）',
              ename: 'DISTR_RATE'
            });
          } else if (dstrType == '1') {
            tableColsTemp.push({
              label: '业绩分配比例（%）',
              ename: 'DISTR_RATE'
            });
          }
          _this.excelHeader = tableColsTemp;
        },
        // 查询按钮
        searchFn: function () {
          _this.$refs['searchForm'].validate(function (valid) {
            if (valid) {
              let model = {
                funCode: _this.funCode,
                status: _this.status
              };
              let param = { condition: JSON.stringify(model) };
              _this.$refs.refTable.remoteData(param);
            } else {
              return;
            }
          });
        },
        // 重置按钮
        resetFn: function () {
          _this.isInitData = false;
          _this.funCode = '';
          _this.status = '';
          _this.templateData[0].fields = _this.templateData[0].fields.slice(0, 2);
          _this.$nextTick(function () {
            _this.isInitData = true;
            _this.$nextTick(function () {
              _this.$refs['searchForm'].resetFields();
            });
          });
          // 清空refTable数据
          _this.$refs.refTable.clearData();
        },
        // 批次撤销
        invokeFn: function () {
          let selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].status != '2' && selections[0].status != '9') {
            _this.$message({ message: '只能撤销业务校验通过或失败的数据', type: 'warning' });
            return;
          }
          _this.$confirm('将删除该批次所有导入的临时数据，是否继续撤销？', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                let model = {
                  funCode: selections[0].funCode,
                  batchId: selections[0].batchId
                };
                yufp.service.request({
                  method: 'POST',
                  url: '/api/commonperformanceimp/invokeBatchData',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      if (response.code == 0) {
                        _this.$message({ message: '撤销成功', type: 'success' });
                        let param = {
                          condition: JSON.stringify({
                            funCode: _this.funCode,
                            status: _this.status
                          })
                        };
                        _this.$refs.refTable.remoteData(param);
                      } else {
                        _this.$message({ message: response.message, type: 'error' });
                        return;
                      }
                    }
                  }
                });
              }
            }
          });
        },
        // 导出错误信息按钮
        exportErrFn: function () {
          let selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].status != '9') {
            _this.$message({ message: '只能导出业务校验失败的数据', type: 'warning' });
            return;
          }
          yufp.service.request({
            method: 'GET',
            url: '/api/metafunctionmanager/getmetafuninfo?funCode=' + selections[0].funCode,
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.code == 0) {
                  _this.funInfo = response.data;
                  _this.makeExcelHeaders();
                  let reqData = 'funCode=' + selections[0].funCode + '&funName=' + selections[0].funCodeName +
                    '&excelHeader=' + encodeURIComponent(JSON.stringify(_this.excelHeader)) + '&batchId=' + selections[0].batchId;
                  // todo 由于GET方式url长度限制，此处后续改造excelHeader后台生成
                  yufp.util.download('/api/commonperformanceimp/exportErrData?' + reqData);
                  _this.$message({ message: '修改错误数据后，点击修改错误数据导入按钮导入数据', type: 'info' });
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                  return;
                }
              }
            }
          });
        },
        // 文件导入前，对文件大小、格式做预校验
        beforeFileUpload: function (file) {
          // todo 此处考虑是否需要限制上传文件大小
          // var isLt10M = file.size / 1024 / 1024 < 10;
          // if (!isLt10M) {
          //   this.$message.error('上传文件大小不能超过 10MB!');
          // }
          var fileCheck = true;
          // 针对部分客户端office文件属性-内容类型为空情况，注释下面校验代码，在html中增加过滤
          // var index = file.name.lastIndexOf('.');
          // var ext = file.name.substr(index + 1);
          // var fileType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
          // var count = 0;
          // for (var i in fileType) {
          //   if (file.type == fileType[i] || ext == 'rar') {
          //     count++;
          //   }
          // }
          // if (count == 0) {
          //   fileCheck = false;
          //   this.$message.error('上传文件格式不正确，请先导出对应业绩模板文件');
          // }
          if (fileCheck) { // 校验通过，显示遮罩
            _this.ld = this.$loading({
              target: '.commonPerformanceR',
              body: true,
              text: '导入中，大约需要1分钟'
            });
          }
          // return fileCheck && isLt10M;
          return fileCheck;
        },
        // 文件导入成功
        uploadSuccessFn: function (response) {
          _this.closeLd();
          if (response.code == 0) {
            this.$message({
              showClose: true,
              message: '文件上传成功',
              type: 'success'
            });
            _this.dialogVisible = false;
            let model = {
              funCode: _this.funCode,
              status: _this.status
            };
            let param = { condition: JSON.stringify(model) };
            _this.$refs.refTable.remoteData(param);
          } else {
            _this.$message({ message: response.message, type: 'error' });
          }
        },
        // 文件导入失败
        uploadErrorFn: function (rep) {
          _this.closeLd();
        },
        // 文件导入超时
        uploadTimeoutFn: function (event, file) {
          _this.closeLd();
          this.$message({
            message: '文件上传超时',
            type: 'warn'
          });
        },
        // 修改错误数据导入按钮
        importErrFn: function () {
          let selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].status != '9') {
            _this.$message({ message: '只能选择业务校验失败的数据进行导入', type: 'warning' });
            return;
          }
          yufp.service.request({
            method: 'GET',
            url: '/api/metafunctionmanager/getmetafuninfo?funCode=' + selections[0].funCode,
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.code == 0) {
                  _this.funInfo = response.data;
                  _this.makeExcelHeaders();
                  _this.uploadData = {
                    batchId: selections[0].batchId,
                    funCode: selections[0].funCode,
                    excelHeader: JSON.stringify(_this.excelHeader)
                  };
                  _this.dialogVisible = true;
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                  return;
                }
              }
            }
          });
        },
        // 同步执行/发起审批
        processFn: function () {
          let selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].status != '2') {
            _this.$message({ message: '只能执行业务校验通过的数据', type: 'warning' });
            return;
          }
          let model = {
            batchId: selections[0].batchId,
            funCode: selections[0].funCode
          };
          _this.ld = this.$loading({
            target: '.commonPerformanceR',
            body: true,
            text: '执行中，大约需要2分钟，请耐心等待'
          });
          yufp.service.request({
            method: 'POST',
            url: '/api/commonperformanceimp/processWorkFlow',
            data: model,
            timeout: _this.processTimeout,
            callback: function (code, message, response) {
              _this.closeLd();
              if (code == 0) {
                if (response.code == 0) {
                  _this.$message({ message: '执行成功，发起审批需要一定时间，请稍后重新查询数据状态', type: 'success' });
                  let param = {
                    condition: JSON.stringify({
                      funCode: _this.funCode,
                      status: _this.status
                    })
                  };
                  _this.$refs.refTable.remoteData(param);
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                  return;
                }
              }
            }
          });
        },
        // 异步执行/发起审批
        asynProcessFn: function () {
          let selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].status != '2') {
            _this.$message({ message: '只能执行业务校验通过的数据', type: 'warning' });
            return;
          }
          let model = {
            batchId: selections[0].batchId,
            funCode: selections[0].funCode
          };
          _this.ld = this.$loading({
            target: '.commonPerformanceR',
            body: true,
            text: '执行中，大约需要2分钟，请耐心等待'
          });
          yufp.service.request({
            method: 'POST',
            url: '/api/commonperformanceimp/asynprocessWorkFlow',
            data: model,
            timeout: _this.processTimeout,
            callback: function (code, message, response) {
              _this.closeLd();
              if (code == 0) {
                if (response.code == 0) {
                  _this.$message({ message: '执行成功，发起审批需要一定时间，请稍后重新查询数据状态', type: 'success' });
                  let param = {
                    condition: JSON.stringify({
                      funCode: _this.funCode,
                      status: _this.status
                    })
                  };
                  _this.$refs.refTable.remoteData(param);
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                  return;
                }
              }
            }
          });
        },
        // 重新发起审批按钮
        reInitWorkFlowFn: function () {
          let selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].status != '19') {
            if (selections[0].wfTotalCount > selections[0].wfSuccCount + selections[0].wfErrCount) {
              _this.$message({ message: '工作流总数大于成功+失败数，请等待工作流发起完成', type: 'warning' });
              return;
            }
            if (selections[0].wfErrCount == 0) {
              _this.$message({ message: '只能执行工作流发起失败数大于0的数据', type: 'warning' });
              return;
            }
          }
          let model = {
            batchId: selections[0].batchId,
            funCode: selections[0].funCode
          };
          _this.ld = this.$loading({
            target: '.commonPerformanceR',
            body: true,
            text: '执行中，大约需要2分钟，请耐心等待'
          });
          yufp.service.request({
            method: 'POST',
            url: '/api/commonperformanceimp/reInitWorkFlow',
            data: model,
            timeout: _this.processTimeout,
            callback: function (code, message, response) {
              _this.closeLd();
              if (code == 0) {
                if (response.code == 0) {
                  _this.$message({ message: '执行成功，发起审批需要一定时间，请稍后重新查询数据状态', type: 'success' });
                  let param = {
                    condition: JSON.stringify({
                      funCode: _this.funCode,
                      status: _this.status
                    })
                  };
                  _this.$refs.refTable.remoteData(param);
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                  return;
                }
              }
            }
          });
        },
        // 关闭遮罩
        closeLd: function () {
          _this.ld.close();
        }
      },
      mounted: function () {
        yufp.service.request({
          method: 'GET',
          url: '/api/commondistribution/getImportFunInfo',
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.code == 0) {
                _this.impTypeOptions = [];
                let tempArr = response.data;
                tempArr.forEach(element => {
                  if (element && element.funCode) {
                    var tempObj = {
                      key: element.funCode,
                      value: element.funName
                    };
                    _this.impTypeOptions.push(tempObj);
                  }
                });
              } else {
                _this.$message({ message: response.message, type: 'warning' });
                return;
              }
            }
          }
        });
      },
      watch: {
        impTypeOptions: {
          handler: function (val) {
            _this.templateData[0].fields[0].options = val;
            _this.isInitData = true;
          },
          deep: true
        }
      }
    });
  };
});