/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2020-1-7 16:23:39.
 * @updated by
 * @description 业绩批量导入
 */
define([
  './custom/widgets/js/yufpExtTree.js',
  './custom/widgets/js/YufpDemoSelector.js',
  'libs/js-xlsx/xlsx.full.min.js',
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
        var me = this;
        return {
          ld: Object,
          isInitData: false,
          dstrSts: '', // 查询项 '分配状态'值
          funCode: '', // 业绩类型 编号
          funName: '', // 业绩类型 名称
          funInfo: {}, // 业务功能注册信息缓存
          dataAuthCfg: '', // 数据权限(机构)，默认全部机构
          dataBussAuthCfg: '', // 数据权限(条线)，默认全部条线
          dataUrl: '/api/commonclaimresource/querylist',
          searchFormDateFormats: {}, // 查询项 日期类型字段 format值，例： {OPEN_DATE_SPAN1: 'yyyyMMdd'}
          claimTypeOptions: [], // '业绩类型' 字段数据集
          pickerOptions: {
            disabledDate: function (time) {
              return time.getTime() < me.etlDate.getTime();
            }
          },
          templateData: [{
            column: 3,
            fields: [{
              field: 'CLM_TYPE',
              label: '业绩类型',
              ctype: 'select',
              rules: 'required',
              options: [],
              linkage: function (ref, field, groupfield, xdynamicfield) {
                if (field.CLM_TYPE) {
                  if (_this.funCode == field.CLM_TYPE) {
                    return;
                  }
                  _this.funCode = field.CLM_TYPE;
                  for (let item of _this.claimTypeOptions) {
                    if (item.key == field.CLM_TYPE) {
                      _this.funName = item.value;
                      break;
                    }
                  }
                  _this.getFunInfo(_this.funCode);
                }
              }
            }, {
              field: 'DSTR_STS',
              label: '分配状态',
              ctype: 'select',
              dataCode: 'DSTR_STS',
              linkage: function (ref, field, groupfield, xdynamicfield) {
                if (_this.dstrSts == field.DSTR_STS) {
                  return;
                }
                _this.dstrSts = field.DSTR_STS;
              }
            }]
          }],
          tableColList: [],
          formdata: {},
          dialogVisible: false,
          formDisabled: false,
          etlDate: '',
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          uploadData: {},
          uploadHeaders: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          action: yufp.service.getUrl({url: '/api/commonclaimresource/importTemplete'}),
          saveBtnShow: true,
          loading: false
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
              // _this.loadingFlag = true;
              // todo 增加 数据权限dataAuth、数据条线权限dataBussAuth
              let model = {
                funCode: _this.funCode,
                dataAuth: _this.dataAuthCfg
              };
              yufp.clone(_this.$refs['searchForm'].formdata, model);
              for (let key in model) {
                if (_this.searchFormDateFormats[key] && model[key]) {
                  model[key] = yufp.util.dateFormat(model[key], _this.searchFormDateFormats[key] == 'yyyyMMdd' ? '{y}{m}{d}' : '{y}-{m}-{d}');
                }
              }
              var param = { condition: JSON.stringify(model) };
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
        /**
         * 认领
         * 按钮
         */
        claimFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.formItemDisabled = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
          });
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 保存
         */
        saveClaimFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var obj = _this.$refs.refTable.selections[0];
          var orgId = '';
          if (_this.funCode == 'CustComDstr' || _this.funCode == 'CustPerDstr') {
            orgId = obj.ACCT_ORG_ID;
          } else {
            orgId = obj.ORG_ID;
          }
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var distrRateall = _this.formdata.distrRate;
          if (parseInt(distrRateall) > 100) {
            this.$message({ message: '认领比例和不能超出100!', type: 'warning' });
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: '/api/commonclaimresource/claim',
            data: {
              primaryValue: JSON.stringify(model),
              funCode: _this.funCode,
              orgId: orgId
            },
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$message(response.message);
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
              if (columnCfgInfo.RESULT_WIDTH) { // 列宽
                tableCol.width = Number(columnCfgInfo.RESULT_WIDTH);
              }
              if (columnCfgInfo.CLM_LOOKUP_ID) { // 数据字典
                tableCol.dataCode = columnCfgInfo.CLM_LOOKUP_ID;
                toRegDataCode.push(columnCfgInfo.CLM_LOOKUP_ID);
              }
              if (columnCfgInfo.CLM_GRID_FIELD && columnCfgInfo.CLM_GRID_FIELD == '1') { // 配置了 是展示项
                tableColsTemp.push(tableCol);
              }
              if (columnCfgInfo.CLM_SEARCH_FIELD == '1') { // 是查询项
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
                if (columnCfgInfo.CLM_ALLOW_BLANK == '0') { // 不允许为空
                  searchFormField.rules = 'required';
                }
                if (columnCfgInfo.CLM_LOOKUP_ID) { // 数据字典
                  searchFormField.ctype = 'select';
                  searchFormField.dataCode = columnCfgInfo.CLM_LOOKUP_ID;
                }

                if (columnCfgInfo.CLM_SEARCH_TYPE == 'userchoose') { // 用户放大镜
                  searchFormField.ctype = 'yufp-user-selector';
                  // searchFormField.field += 'USERCHOOSE';
                  searchFormFieldsTemp.push(searchFormField);
                } else if (columnCfgInfo.CLM_SEARCH_TYPE == 'orgchoose') { // 机构树
                  searchFormField.ctype = 'yufp-org-tree';
                  searchFormFieldsTemp.push(searchFormField);
                } else if (columnCfgInfo.CLM_SEARCH_TYPE == 'dateSpan') { // 日期区间组件
                  let dateFieldFrom = {};
                  let dateFieldTo = {};
                  yufp.clone(searchFormField, dateFieldFrom);
                  yufp.clone(searchFormField, dateFieldTo);
                  let dateFormat = '';
                  if (columnCfgInfo.DATE_FORMAT == 'Ymd') {
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
                } else if (columnCfgInfo.CLM_SEARCH_TYPE == 'dateOnly') { // 日期区间组件
                  let dateFieldOnly = {};
                  yufp.clone(searchFormField, dateFieldOnly);
                  let dateFormat = '';
                  if (columnCfgInfo.DATE_FORMAT == 'Ymd') {
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
                } else if (columnCfgInfo.CLM_SEARCH_TYPE == 'moneySpan') { // 日期区间组件
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
          tableColsTemp.push({
            ctype: 'select',
            dataCode: 'DSTR_STS',
            label: '分配状态',
            ename: 'DSTR_STS',
            width: 120
          });
          /** 字段排序 */
          tableColsTemp.sort(function (a, b) {
            return a.sort - b.sort;
          });
          searchFormFieldsTemp.sort(function (a, b) {
            return a.sort - b.sort;
          });
          yufp.lookup.reg(toRegDataCode.join(','));
          _this.tableColList = tableColsTemp;
          _this.templateData[0].fields = _this.templateData[0].fields.concat(searchFormFieldsTemp);
        },
        // 关闭遮罩
        closeLd: function () {
          _this.ld.close();
        },
        loadedHandler: function () {
          var _this = this;
          _this.loading.close();
        }
      },
      created: function () {
        var _this = this;
        yufp.service.request({
          async: false,
          method: 'GET',
          url: backend.appBaseService + '/api/commondistribution/queryTimeState',
          callback: function (code, message, response) {
            var dateMonth = response.statDate;
            var year = parseInt(dateMonth.substring(0, 4));
            var month = parseInt(dateMonth.substring(4, 6));
            var day = parseInt('01');
            _this.etlDate = new Date(year, month, day);
          }
        });
      },
      mounted: function () {
        yufp.service.request({
          method: 'GET',
          url: '/api/commondistribution/getClaimFunInfo',
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.code == 0) {
                _this.claimTypeOptions = [];
                let tempArr = response.data;
                tempArr.forEach(element => {
                  if (element && element.funCode) {
                    var tempObj = {
                      key: element.funCode,
                      value: element.funName
                    };
                    _this.claimTypeOptions.push(tempObj);
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
        claimTypeOptions: {
          handler: function (val) {
            _this.templateData[0].fields[0].options = val;
            _this.isInitData = true;
          },
          deep: true
        },
        funInfo: function (val) {
          _this.isInitData = false;
          // 当 业务功能注册信息缓存改变时，加载动态页面
          _this.makeDynamicFields();
          _this.$nextTick(function () {
            _this.isInitData = true;
            _this.$nextTick(function () {
              _this.$refs['searchForm'].formdata.CLM_TYPE = _this.funCode;
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