/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2020-1-7 16:23:39.
 * @updated by
 * @description 业绩批量导入
 */
define([
  './custom/widgets/js/yufpExtTree.js',
  './custom/widgets/js/YufpUserSelector.js',
  './custom/widgets/js/yufpOrgTree.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('');
    var _this = yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          ld: Object,
          isInitData: false,
          dstrSts: '', // 查询项 '分配状态'值
          funCode: '', // 业绩类型 编号
          funName: '', // 业绩类型 名称
          funInfo: {}, // 业务功能注册信息缓存
          dataAuthCfg: '', // 数据权限(机构)，默认全部机构
          dataBussAuthCfg: '', // 数据权限(条线)，默认全部条线
          dataUrl: '/api/commonperformanceimp/querylist',
          searchFormDateFormats: {}, // 查询项 日期类型字段 format值，例： {OPEN_DATE_SPAN1: 'yyyyMMdd'}
          impTypeOptions: [], // '业绩类型' 字段数据集
          templateData: [{
            column: 3,
            fields: [{
              field: 'IMP_TYPE',
              label: '业绩类型',
              ctype: 'select',
              rules: 'required',
              options: [],
              linkage: function (ref, field, groupfield, xdynamicfield) {
                if (field.IMP_TYPE) {
                  if (_this.funCode == field.IMP_TYPE) {
                    return;
                  }
                  _this.funCode = field.IMP_TYPE;
                  for (let item of _this.impTypeOptions) {
                    if (item.key == field.IMP_TYPE) {
                      _this.funName = item.value;
                      break;
                    }
                  }
                  _this.getFunInfo(_this.funCode);
                }
              }
            // }, {
            //   field: 'DSTR_STS',
            //   label: '分配状态',
            //   ctype: 'select',
            //   dataCode: 'DSTR_STS',
            //   linkage: function (ref, field, groupfield, xdynamicfield) {
            //     if (_this.dstrSts == field.DSTR_STS) {
            //       return;
            //     }
            //     _this.dstrSts = field.DSTR_STS;
            //   }
            }]
          }],
          tableColList: [],
          dialogVisible: false,
          uploadData: {},
          uploadHeaders: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          action: yufp.service.getUrl({url: '/api/commonperformanceimp/importTemplete'}),
          loading: false,
          exportDataProgress: false,
          percentage: 0,
          downloading: false,
          exportDataSuccess: false,
          fileId: '',
          loop: null,
          tableTotal: 0
        };
      },
      methods: {
        // 查询按钮
        searchFn: function () {
          var _this = this;
          _this.$refs['searchForm'].validate(function (valid) {
            if (valid) {
              // 显示loading
              var options = {
                target: cite.el, // Loading 需要覆盖的 DOM 节点
                body: false, // 遮罩是否插入至 DOM 中的 body 中，true: 插入，false: 不插入，
                fullscreen: false, // 遮罩是否全屏, true: 全屏，false: 非全屏
                text: '拼命加载中', // 显示在加载图标下方的加载文案
                customClass: 'trans-class' // Loading 的自定义类名
              };
              _this.loading = _this.$loading(options);
              // todo 增加 数据权限dataAuth、数据条线权限dataBussAuth
              let model = {
                funCode: _this.funCode,
                dataAuth: _this.dataAuthCfg
              };
              yufp.clone(_this.$refs['searchForm'].formdata, model);
              for (let key in model) {
                if (_this.searchFormDateFormats[key] && model[key]) {
                  model[key] = model[key]
                    ? yufp.util.dateFormat(model[key], _this.searchFormDateFormats[key] == 'yyyyMMdd' ? '{y}{m}{d}' : '{y}-{m}-{d}')
                    : '';
                }
              }
              var param = { condition: JSON.stringify(model) };
              _this.$refs.refTable.remoteData(param);
            } else {
              return;
            }
          });
        },
        // refTable加载数据后，显示异常信息
        refTableLoaded: function (data, total, response) {
          var _this = this;
          _this.loading.close();
          _this.tableTotal = total;
          if (response.code == -1 || response.code == -2) {
            _this.$message({ message: response.message, type: 'warning' });
          }
        },
        // 重置按钮
        resetFn: function () {
          _this.isInitData = false;
          _this.funCode = '';
          _this.dstrSts = '';
          _this.searchFormDateFormats = {};
          _this.templateData[0].fields = _this.templateData[0].fields.slice(0, 2);
          _this.tableColList = [];
          _this.$nextTick(function () {
            _this.isInitData = true;
            _this.$nextTick(function () {
              _this.$refs['searchForm'].resetFields();
            });
          });
          // 清空refTable数据
          _this.$refs.refTable.clearData();
        },
        // 根据 业绩类型，获取 业务功能注册信息缓存
        getFunInfo: function (funCode) {
          _this.searchFormDateFormats = {};
          _this.templateData[0].fields = _this.templateData[0].fields.slice(0, 2);
          yufp.service.request({
            method: 'GET',
            url: '/api/metafunctionmanager/getmetafuninfo?funCode=' + funCode,
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.code == 0) {
                  _this.funInfo = response.data;
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                  return;
                }
              }
            }
          });
        },
        // 获取业务授权配置
        getAuthCfgValue: function (cfgName) {
          var returnValue = '';
          if (!_this.funInfo.authCfgInfo) {
            return returnValue;
          };
          if (_this.funInfo.authCfgInfo[cfgName]) {
            for (let item of _this.funInfo.authCfgInfo[cfgName]) {
              if (item.userId == yufp.session.userId) {
                returnValue = item.authValue;
                break;
              } else if (!item.userId && !item.roleId && !item.orgId && !item.depId) { // todo 此处需要修改成原辽宁农信ext版本逻辑
                returnValue = item.authValue;
                break;
              }
            }
          }
          return returnValue;
        },
        // 根据 业绩类型，生成搜索动态表单、列表动态展示列
        makeDynamicFields: function () {
          /** 分配类型:1,比例分配; 2,比例+定额分配 */
          let dstrType = _this.funInfo.pageCfgInfo.DSTR_TYPE;
          /** 是否配置绩效比例 */
          let showPerfRateCfg = _this.funInfo.pageCfgInfo.HAS_JXBL == 1;
          /** 分配区间类型:1,单区间; 2,多区间 */
          let dstrPeriod = _this.funInfo.pageCfgInfo.DSTR_PERIOD;
          if (_this.funInfo.pageCfgInfo.DATA_AUTH) {
            _this.dataAuthCfg = _this.funInfo.pageCfgInfo.DATA_AUTH;
          } else {
            _this.dataAuthCfg = _this.getAuthCfgValue('DATA_AUTH');
          }
          if (_this.funInfo.pageCfgInfo.DATA_BUSS_AUTH) {
            _this.dataBussAuthCfg = _this.funInfo.pageCfgInfo.DATA_BUSS_AUTH;
          } else {
            _this.dataBussAuthCfg = _this.getAuthCfgValue('DATA_BUSS_AUTH');
          }
          /** 信息表模型编码 */
          let infoTableCode;
          for (let tableCode in _this.funInfo.tableInfo) {
            if (_this.funInfo.tableInfo[tableCode].funSubType == '01') { // 01:信息表
              infoTableCode = tableCode;
            }
          }

          /** 动态生成字段配置项fields */
          let searchFormFieldsTemp = []; // 动态查询条件表单字段
          let tableColsTemp = []; // 动态列字段
          let toRegDataCode = []; // 待加载的数据字典编号
          for (let columnCode in _this.funInfo.columnInfo[infoTableCode]) {
            let searchFormField = {};
            let searchOnlyField = {};
            let tableCol = {};
            let columnInfo = _this.funInfo.columnInfo[infoTableCode][columnCode]; // 字段信息
            let columnCfgInfo = _this.funInfo.columnCfgInfo[columnCode]; // 字段配置信息

            // 默认所有字段都在列表展示
            tableCol.label = columnInfo.columnCnName;
            tableCol.ename = columnInfo.columnName;
            tableCol.sort = columnInfo.sort; // 字段排序
            if (columnCfgInfo) {
              if (columnCfgInfo.IMP_RESULT_WIDTH) { // 列宽
                tableCol.width = Number(columnCfgInfo.IMP_RESULT_WIDTH);
              }
              if (columnCfgInfo.IMP_LOOKUP_ID) { // 数据字典
                tableCol.dataCode = columnCfgInfo.IMP_LOOKUP_ID;
                toRegDataCode.push(columnCfgInfo.IMP_LOOKUP_ID);
              }
              if (columnCfgInfo.IMP_GRID_FIELD && columnCfgInfo.IMP_GRID_FIELD == '1') { // 配置了 是展示项
                tableColsTemp.push(tableCol);
              }
              if (columnCfgInfo.IMP_SEARCH_FIELD == '1') { // 是查询项
                searchFormField.field = columnInfo.columnName;
                searchFormField.label = columnInfo.columnCnName;
                searchFormField.sort = columnInfo.sort; // 字段排序
                if (columnInfo.columnType == 'number') {
                  searchFormField.ctype = 'num';
                } else if (columnInfo.columnType == 'string') {
                  searchFormField.ctype = 'input';
                } else if (columnInfo.columnType == 'date') {
                  searchFormField.ctype = 'datepicker';
                }
                if (columnCfgInfo.IMP_ALLOW_BLANK == '0') { // 不允许为空
                  searchFormField.rules = 'required';
                }
                if (columnCfgInfo.IMP_LOOKUP_ID) { // 数据字典
                  searchFormField.ctype = 'select';
                  searchFormField.dataCode = columnCfgInfo.IMP_LOOKUP_ID;
                }

                if (columnCfgInfo.IMP_SEARCH_TYPE == 'userchoose') { // 用户放大镜
                  searchFormField.ctype = 'yufp-user-selector';
                  // searchFormField.field += 'USERCHOOSE';
                  searchFormFieldsTemp.push(searchFormField);
                } else if (columnCfgInfo.IMP_SEARCH_TYPE == 'orgchoose') { // 机构树
                  searchFormField.ctype = 'yufp-org-tree';
                  // searchFormField.field += 'ORGCHOOSE';
                  // todo 机构树 数据权限
                  // if (metaConst.dataAuth.ALL_ORG == _this.dataAuthCfg) {
                  //   field.searchType = 'ALLORG';
                  // } else {
                  //   field.searchType = 'SUBTREE';
                  // }
                  searchFormFieldsTemp.push(searchFormField);
                } else if (columnCfgInfo.IMP_SEARCH_TYPE == 'dateSpan') { // 日期区间组件
                  let dateFieldFrom = {};
                  let dateFieldTo = {};
                  yufp.clone(searchFormField, dateFieldFrom);
                  yufp.clone(searchFormField, dateFieldTo);
                  let dateFormat = '';
                  if (columnCfgInfo.IMP_DATE_FORMAT == 'YYYYMMDD') {
                    dateFormat = 'yyyyMMdd';
                  } else { // 默认格式 Y-m-d
                    dateFormat = 'yyyy-MM-dd';
                  }

                  dateFieldFrom.field += '_SPAN1';
                  dateFieldFrom.label += '从';
                  dateFieldFrom.ctype = 'datepicker';
                  dateFieldFrom.editable = false;
                  dateFieldFrom.sort = columnInfo.sort * 1;
                  dateFieldFrom.format = dateFormat;
                  _this.searchFormDateFormats[dateFieldFrom.field] = dateFormat; // 记录 日期组件值得格式，查询方法使用

                  dateFieldTo.field += '_SPAN2';
                  dateFieldTo.label += '到';
                  dateFieldTo.ctype = 'datepicker';
                  dateFieldTo.editable = false;
                  dateFieldTo.sort = 0.5 + (columnInfo.sort * 1);
                  dateFieldTo.format = dateFormat;
                  _this.searchFormDateFormats[dateFieldTo.field] = dateFormat; // 记录 日期组件值得格式，查询方法使用

                  searchFormFieldsTemp.push(dateFieldFrom);
                  searchFormFieldsTemp.push(dateFieldTo);
                } else if (columnCfgInfo.IMP_SEARCH_TYPE == 'dateOnly') { // 日期区间组件
                  let dateFieldOnly = {};
                  yufp.clone(searchFormField, dateFieldOnly);
                  let dateFormat = '';
                  if (columnCfgInfo.IMP_DATE_FORMAT == 'YYYYMMDD') {
                    dateFormat = 'yyyyMMdd';
                  } else { // 默认格式 Y-m-d
                    dateFormat = 'yyyy-MM-dd';
                  }

                  dateFieldOnly.field += '_ONLY';
                  dateFieldOnly.label = dateFieldOnly.label;
                  dateFieldOnly.ctype = 'datepicker';
                  dateFieldOnly.editable = false;
                  dateFieldOnly.sort = columnInfo.sort * 1;
                  dateFieldOnly.format = dateFormat;
                  _this.searchFormDateFormats[dateFieldOnly.field] = dateFormat; // 记录 日期组件值得格式，查询方法使用
                  searchFormFieldsTemp.push(dateFieldOnly);
                } else if (columnCfgInfo.IMP_SEARCH_TYPE == 'moneySpan') { // 日期区间组件
                  let dateFieldFrom = {};
                  let dateFieldTo = {};
                  yufp.clone(searchFormField, dateFieldFrom);
                  yufp.clone(searchFormField, dateFieldTo);

                  dateFieldFrom.field += '_MONEY_SPAN1';
                  dateFieldFrom.label += '从';
                  dateFieldFrom.ctype = 'num';
                  dateFieldFrom.editable = false;
                  dateFieldFrom.sort = columnInfo.sort * 1;

                  dateFieldTo.field += '_MONEY_SPAN2';
                  dateFieldTo.label += '到';
                  dateFieldTo.ctype = 'num';
                  dateFieldTo.editable = false;
                  dateFieldTo.sort = 0.5 + (columnInfo.sort * 1);

                  searchFormFieldsTemp.push(dateFieldFrom);
                  searchFormFieldsTemp.push(dateFieldTo);
                } else {
                  searchFormFieldsTemp.push(searchFormField);
                }
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
          searchFormFieldsTemp.sort(function (a, b) {
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
            ename: 'MANAGER_ID',
            width: 120
          });
          tableColsTemp.push({
            label: '客户经理名称',
            ename: 'MANAGER_NAME',
            width: 120
          });
          /**
           * 如果是单区间分配，导入时不展示时间区间段
           * 1单区间  2多区间
          */
          if (dstrPeriod != '1') {
            tableColsTemp.push({
              label: '生效日期',
              ename: 'EFFECT_DATE',
              width: 120
            });
            tableColsTemp.push({
              label: '失效日期',
              ename: 'EXPIRATE_DATE',
              width: 120
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
              ename: 'START_AMT',
              width: 120
            });
            tableColsTemp.push({
              label: '结束金额',
              ename: 'END_AMT',
              width: 120
            });
            tableColsTemp.push({
              label: '业绩分配比例（%）',
              ename: 'DISTR_RATE',
              width: 120
            });
          } else if (dstrType == '1') {
            tableColsTemp.push({
              label: '业绩分配比例（%）',
              ename: 'DISTR_RATE',
              width: 120
            });
          }
          yufp.lookup.reg(toRegDataCode.join(','));
          _this.tableColList = tableColsTemp;
          _this.templateData[0].fields = _this.templateData[0].fields.concat(searchFormFieldsTemp);
        },
        downloadAsyncFn: function () {
          var _this = this;
          clearInterval(_this.loop);// 停止定时任务
          _this.$refs['searchForm'].validate(function (valid) {
            if (valid) {
              // 不允许大量数据导出
              if (_this.tableTotal == 0) {
                _this.$message({ message: '数据为空，不允许导出', type: 'warning' });
                return;
              }
              if (_this.tableTotal > 200000) {
                _this.$message({ message: '数据条数超过限制【200000】，不允许导出', type: 'warning' });
                return;
              }
              _this.percentage = 0;
              let model = {
                funCode: _this.funCode
              };
              yufp.clone(_this.$refs['searchForm'].formdata, model);
              for (let key in model) {
                if (_this.searchFormDateFormats[key] && model[key]) {
                  model[key] = model[key]
                    ? yufp.util.dateFormat(model[key], _this.searchFormDateFormats[key] == 'yyyyMMdd' ? '{y}{m}{d}' : '{y}-{m}-{d}')
                    : '';
                }
              }
              let reqData = 'funCode=' + _this.funCode + '&funName=' + _this.funName + '&dataAuth=' + _this.dataAuthCfg +
                '&excelHeader=' + encodeURIComponent(JSON.stringify(_this.tableColList)) + '&searchParams=' + encodeURIComponent(JSON.stringify(model));
              _this.$confirm('是否确定导出?', '提示', {
                type: 'warning',
                callback: function (action) {
                  if (action === 'confirm') {
                    _this.downloading = true;
                    yufp.service.request({
                      method: 'GET',
                      url: backend.appBaseService + '/api/commonperformanceimp/exportTempleteAsync?' + reqData,
                      data: {
                      },
                      callback: function (code, message, response) {
                        if (code == 0) {
                          if (response.code == 0) {
                            _this.exportDataProgress = true;
                            var exportId = response.data;
                            _this.fileId = exportId;
                            _this.listenExportProgress(exportId);
                          } else {
                            _this.$message({ message: response.message, type: 'warning' });
                            _this.downloading = false;
                            clearInterval(_this.loop);// 停止定时任务
                          }
                        } else {
                          _this.$message({ message: message, type: 'warning' });
                          _this.downloading = false;
                          clearInterval(_this.loop);// 停止定时任务
                        }
                      }
                    });
                  }
                }
              });
            } else {
              _this.$message({ message: '请填写必要的查询条件', type: 'warning' });
              return;
            }
          });
        },
        // 刷新进度条
        flushProgress: function (exportId) {
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/commonperformanceimp/flushprogress',
            data: {
              exportId: exportId
            },
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.code == 0) {
                  _this.percentage = response.data;
                  if (_this.percentage === 100) {
                    setTimeout(function () {
                      _this.exportDataProgress = false;// 进度条关闭
                      _this.openDownloadFn();
                    }, 500);
                  }
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                  clearInterval(_this.loop);// 停止定时任务
                }
              } else {
                _this.$message({ message: message, type: 'warning' });
                clearInterval(_this.loop);// 停止定时任务
              }
            }
          });
        },
        // 监听导出进度
        listenExportProgress: function (exportId) {
          var _this = this;
          _this.loop = setInterval(function () {
            if (_this.percentage === 100) {
              clearInterval(_this.loop);// 停止定时任务
              _this.percentage = 0;
              _this.downloading = false;
            } else {
              _this.flushProgress(exportId);
            }
          }, 3000);// 单位毫秒  注意：如果导出页面很慢时，建议循环时间段稍长一点
        },
        downloadExcelFn: function () {
          var _this = this;
          var url = yufp.settings.ssl ? 'https://' : 'http://';
          url += yufp.settings.url;
          url += backend.fileService;
          url += '/api/file/provider/download?fileId=downLoad/' + _this.fileId;
          yufp.util.download(url);
        },
        openDownloadFn: function () {
          var _this = this;
          _this.exportDataSuccess = true;
        },
        // 导出
        downloadFn: function () {
          var _this = this;
          _this.$refs['searchForm'].validate(function (valid) {
            if (valid) {
              // 显示loading
              var options = {
                target: cite.el, // Loading 需要覆盖的 DOM 节点
                body: false, // 遮罩是否插入至 DOM 中的 body 中，true: 插入，false: 不插入，
                fullscreen: false, // 遮罩是否全屏, true: 全屏，false: 非全屏
                text: '拼命加载中', // 显示在加载图标下方的加载文案
                customClass: 'trans-class' // Loading 的自定义类名
              };
              _this.loading = _this.$loading(options);
              let model = {
                funCode: _this.funCode
              };
              yufp.clone(_this.$refs['searchForm'].formdata, model);
              for (let key in model) {
                if (_this.searchFormDateFormats[key] && model[key]) {
                  model[key] = model[key]
                    ? yufp.util.dateFormat(model[key], _this.searchFormDateFormats[key] == 'yyyyMMdd' ? '{y}{m}{d}' : '{y}-{m}-{d}')
                    : '';
                }
              }
              let reqData = 'funCode=' + _this.funCode + '&funName=' + _this.funName + '&dataAuth=' + _this.dataAuthCfg +
                '&excelHeader=' + encodeURIComponent(JSON.stringify(_this.tableColList)) + '&searchParams=' + encodeURIComponent(JSON.stringify(model));
              // '&dataBussAuth=' + ''; // 数据条线权限 todo
              // todo 由于GET方式url长度限制，此处后续改造excelHeader后台生成
              yufp.util.download('/api/commonperformanceimp/exportTemplete?' + reqData);
            } else {
              _this.$message({ message: '请填写必要的查询条件', type: 'warning' });
              return;
            }
          });
        },
        // 文件导入前，对文件大小、格式做预校验
        beforeFileUpload: function (file) {
          // todo 此处考虑是否需要限制上传文件大小
          var fileCheck = true;
          var isLt10M = file.size / 1024 / 1024 < 1;
          if (!isLt10M) {
            fileCheck = false;
            this.$message.error('上传文件大小不能超过 1MB!');
          }
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
              target: '.commonPerformance',
              body: true,
              text: '导入中，请勿刷新或关闭界面，等待处理完毕后自动跳转！'
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
            // 导入成功后，自动跳转到 '业绩批量导入结果' 页面
            yufp.frame.addTab({
              id: 'df594040a0ec4c0e93522c0b114b1b54', // FUNC_ID(业务功能编号)
              title: '业绩批量导入结果', // MENU_NAME(菜单名称)
              key: 'c16f2d4884534289b7e5d2afbc1a20d8', // 自定义唯一页签key,菜单MENU_ID
              data: {} // 给打开的页面传参
            });
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
        // 导入按钮
        openUploadDialogFn: function () {
          if (!_this.funCode) {
            _this.$message({ message: '请先选择导入的业绩类型', type: 'warning' });
            return;
          }
          _this.dialogVisible = true;
          _this.uploadData = {
            funCode: _this.funCode,
            excelHeader: JSON.stringify(_this.tableColList)
          };
        },
        // 关闭遮罩
        closeLd: function () {
          _this.ld.close();
        },

        loadedHandler: function () {
          var _this = this;
          _this.loading = false;
        }
      },
      created: function () {

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
        },
        funInfo: function (val) {
          _this.isInitData = false;
          // 清空refTable数据
          _this.$refs.refTable.clearData();
          // 当 业务功能注册信息缓存改变时，加载动态页面
          _this.makeDynamicFields();
          _this.$nextTick(function () {
            _this.isInitData = true;
            _this.$nextTick(function () {
              _this.$refs['searchForm'].formdata.IMP_TYPE = _this.funCode;
              // _this.$refs['searchForm'].formdata.DSTR_STS = _this.dstrSts;
            });
          });
        }
      },
      computed: {
        xtableShow: function () {
          return this.funCode != null && this.funCode != '';
        }
      }
    });
  };
});