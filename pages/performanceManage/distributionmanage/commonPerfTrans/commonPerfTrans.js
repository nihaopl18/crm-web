/**
 * @Created by 万爽 wanshuang@yusys.com.cn on 2020-1-7 10:00:26.
 * @updated by
 * @description 业绩转移
 */
define([
  './custom/widgets/js/yufpExtTree.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/YufpUserSelector.js',
  './custom/widgets/js/YufpDemoSelector.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          ld: Object,
          funCode: '',
          dataUrl: backend.appBaseService + '/api/commonPerformanceTrans/querylist',
          dataUrltwo: backend.appBaseService + '/api/commonPerformanceTrans/queryPerformance',
          formdata: {},
          dialogVisible: false,
          transData: [],
          colunmNamelist: [],
          datacodeList: '',
          queryList: [],
          dialogVisibleTwo: false,
          formDataTwo: {},
          orgTreeParams: {
            needCheckbox: true,
            checkStrictly: true
          },
          rule: [
            { required: true, message: '必填项', trigger: 'blur' },
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          optionsA: [],
          orgUserTreeParams: {
            needCheckbox: true,
            checkStrictly: true,
            checkboxVal: true,
            lazy: true
          },
          orgUserTreeParamsTwo: {
            needCheckbox: false,
            checkStrictly: false,
            checkboxVal: false,
            lazy: true
          },
          params: {},
          dataAuth: '',
          tableColList: [], // 导出使用，业绩对应的表头信息
          dialogtwo_loading: true,
          loading: false
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: '/api/metafunctionmanager/getfuninfobycfg',
          data: {
            cfgName: 'DO_TRANSFER',
            cfgValue: '1'
          },
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.code == 0) {
                if (response.data.length > 0) {
                  for (var i = 0; i < response.data.length; i++) {
                    var obj = {};
                    obj.key = response.data[i].funCode;
                    obj.value = response.data[i].funName;
                    _this.optionsA.push(obj);
                  }
                }
              }
            }
          }
        });
      },
      watch: {
        dialogVisibleTwo: function (val) {
          var _this = this;
          if (val) {
            _this.transData = [];
            yufp.service.request({
              method: 'GET',
              url: '/api/commonPerformanceTrans/queryPerformance',
              data: {
                condition: JSON.stringify({
                  funCode: _this.$refs.refQuery.formdata.funCode,
                  dataAuth: _this.dataAuth,
                  managerId: _this.$refs.refTable.selections[0].managerId,
                  orgId: _this.$refs.refQuery.formdata.orgId,
                  openDateStart: _this.$refs.refQuery.formdata.openDateStart,
                  openDateEnd: _this.$refs.refQuery.formdata.openDateEnd
                })
              },
              callback: function (code, message, response) {
                _this.transData = response.data;
                _this.dialogtwo_loading = false;
              }
            });
          } else {
            _this.dialogtwo_loading = true;
          }
        }
      },
      methods: {
        loadedHandler: function () {
          var _this = this;
          _this.loading.close();
        },
        searchFn: function () {
          var _this = this;
          _this.$refs['refQuery'].validate(function (valid) {
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
              let model = {};
              yufp.clone(_this.$refs['refQuery'].formdata, model);
              var param = { condition: JSON.stringify(model) };
              _this.$refs.refTable.remoteData(param);
            } else {
              return;
            }
          });
        },
        // 重置按钮
        resetFn: function () {
          var _this = this;
          _this.$nextTick(function () {
            _this.$refs['refQuery'].resetFields();
          });
        },
        // 根据 业绩类型，生成搜索动态表单、列表动态展示列
        makeDynamicFields: function (funInfo, funCode) {
          var _this = this;
          /** 分配类型:1,比例分配; 2,比例+定额分配 */
          var dstrType = funInfo.pageCfgInfo.DSTR_TYPE;
          /** 分配区间类型:1,单区间; 2,多区间 */
          var dstrPeriod = funInfo.pageCfgInfo.DSTR_PERIOD;
          /** 信息表模型编码 */
          var infoTableCode;
          for (var tableCode in funInfo.tableInfo) {
            if (funInfo.tableInfo[tableCode].funSubType == '01') { // 01:信息表
              infoTableCode = tableCode;
            }
          }
          /** 动态生成字段配置项fields */
          var tableColsTemp = []; // 动态列字段
          for (var columnCode in funInfo.columnInfo[infoTableCode]) {
            var tableCol = {};
            var columnInfo = funInfo.columnInfo[infoTableCode][columnCode]; // 字段信息
            var columnCfgInfo = funInfo.columnCfgInfo[columnCode]; // 字段配置信息
            // 默认所有字段都在列表展示
            tableCol.label = columnInfo.columnCnName;
            tableCol.ename = columnInfo.columnName;
            tableCol.sort = columnInfo.sort; // 字段排序
            if (columnCfgInfo) {
              if (columnCfgInfo.RESULT_WIDTH) { // 列宽
                tableCol.width = Number(columnCfgInfo.RESULT_WIDTH);
              }
              if (columnCfgInfo.IMP_LOOKUP_ID) { // 数据字典
                tableCol.dataCode = columnCfgInfo.IMP_LOOKUP_ID;
              }
              if (columnCfgInfo.IMP_GRID_FIELD && columnCfgInfo.IMP_GRID_FIELD == '1') { // 配置了 是展示项
                tableColsTemp.push(tableCol);
              }
            }
          }
          if (funCode == 'custDstr') { // 业绩类型为 '客户分配'
            tableColsTemp.push({label: '客户归属机构', ename: 'OPER_ORG_ID'});
          }
          /** 字段排序 */
          tableColsTemp.sort(function (a, b) {
            return a.sort - b.sort;
          });
          // ****************** 辽宁农信特殊处理 ******************
          if (funCode == 'customerSaveAllot') { // customerSaveAllot 存款业绩分配
            tableColsTemp.push({
              label: '存款主账号',
              ename: 'DEPOSIT_MAIN_ACCOUNT'
            });
          } else if (funCode == 'customerCreateInAllot') { // customerCreateInAllot 中收业务量分配
            tableColsTemp.push({
              label: '账号',
              ename: 'S_NUM'
            });
          } else if (funCode == 'customerPrivateLoanAllot') { // customerPrivateLoanAllot 个人贷款业绩分配
            tableColsTemp.push({
              label: '账号',
              ename: 'ACCOUNT_NUMBER'
            });
          } else if (funCode == 'customerAllot') { // customerAllot 客户分配
            tableColsTemp.push({
              label: '客户编号',
              ename: 'CUST_ID'
            });
            tableColsTemp.push({
              label: '客户ID',
              ename: 'ORG_ID'
            });
          } else if (funCode == 'customerPublicLoanAllot') { // customerPublicLoanAllot 对公贷款业绩分配
            tableColsTemp.push({
              label: '账号',
              ename: 'ACCOUNT_NUMBER',
              dataType: 'string'
            });
          } else if (funCode == 'customerCreateMoneyAllot') { // customerCreateMoneyAllot 中收收入分配
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
          _this.tableColList = tableColsTemp;
        },
        // 导出按钮fn
        downloadFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var funName = '';
          for (var option of _this.optionsA) {
            if (option.key == _this.funCode) {
              funName = option.value;
              break;
            }
          }
          var reqData = 'funCode=' + _this.funCode + '&funName=' + funName +
              '&excelHeader=' + encodeURIComponent(JSON.stringify(_this.tableColList)) + '&managerId=' + _this.$refs.refTable.selections[0].managerId;
          yufp.util.download('/api/commonperformanceimp/exportTempleteByManagerId?' + reqData);
        },
        changeFn: function (val) {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: '/api/metafunctionmanager/getmetafuninfo',
            data: {funCode: val},
            callback: function (code, message, response) {
              _this.funCode = val;
              _this.makeDynamicFields(response.data, val);
              var list = yufp.util.getList(response.data);
              _this.queryList = list.queryList;
              _this.colunmNamelist = list.colunmNamelist;
              _this.datacodeList = list.datacodeList;
              if (_this.datacodeList != '' || _this.datacodeList != undefined) {
                yufp.lookup.reg(_this.datacodeList);
              }
              _this.dataAuth = list.dataAuth;
              _this.params = {
                condition: JSON.stringify({
                  dataAuth: list.dataAuth
                })
              };
            }
          });
        },
        // 关闭遮罩
        closeLd: function () {
          this.ld.close();
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
          var model = {};
          model.toManagerId = _this.formdata.managerId;
          model.effectDate = yufp.util.dateFormat(_this.formdata.openDate, '{y}{m}{d}');
          model.funCode = _this.$refs.refQuery.formdata.funCode;
          model.orgId = _this.$refs.refQuery.formdata.orgId;
          if (_this.$refs.refQuery.formdata.openDateStart) {
            model.openDateStart = yufp.util.dateFormat(_this.$refs.refQuery.formdata.openDateStart, '{y}{m}{d}');
          } else {
            model.openDateStart = '';
          }
          if (_this.$refs.refQuery.formdata.openDateEnd) {
            model.openDateEnd = yufp.util.dateFormat(_this.$refs.refQuery.formdata.openDateEnd, '{y}{m}{d}');
          } else {
            model.openDateEnd = '';
          }
          model.managerId = _this.$refs.refTable.selections[0].managerId;
          model.dataAuth = _this.dataAuth;
          if (model.managerId == model.toManagerId) {
            _this.$message({ message: '请选择不同的客户经理转移', type: 'warning' });
            return;
          }
          _this.$confirm('是否确定要转移?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                _this.ld = _this.$loading({
                  target: '.commonDstrTrans',
                  body: true,
                  text: '处理中'
                });
                yufp.service.request({
                  method: 'POST',
                  url: '/api/commonPerformanceTrans/transByManager',
                  data: model,
                  callback: function (code, message, response) {
                    _this.closeLd();
                    if (response.code == 0) {
                      _this.$refs.refTable.remoteData(_this.params);
                      _this.$message('操作成功');
                      _this.dialogVisible = false;
                    } else {
                      _this.$message({ message: response.message, type: 'warning' });
                    }
                  }
                });
              }
            }
          });
        },
        /**
         * 业绩转移（按员工转移）
         */
        modifyFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            if (_this.$refs.refUserRelateObjIds) {
              _this.$refs.refUserRelateObjIds.$children[0].$children[0].setRawValue('');
            }
          });
        },
        /**
         * 业绩明细
         **/
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogVisibleTwo = true;
          _this.$nextTick(function () {
            _this.$refs.refFormTwo.resetFields();
          });
        },
        /**
         * 业绩转移2（按数据转移）
         **/
        tranFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.refFormTwo.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (_this.$refs.refTableTwo.selections.length == 0) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var model = {};
          model.toManagerId = _this.formDataTwo.mgrId;
          model.effectDate = yufp.util.dateFormat(_this.formDataTwo.effectDate, '{y}{m}{d}');
          model.funCode = _this.$refs.refQuery.formdata.funCode;
          var list = [];
          for (var i = 0; i < _this.$refs.refTableTwo.selections.length; i++) {
            var obj = _this.$refs.refTableTwo.selections[i];
            obj.managerId = _this.$refs.refTable.selections[0].managerId;
            list.push(obj);
          }
          model.mainRecordsdata = JSON.stringify(list);
          _this.$confirm('是否确定要转移?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                _this.ld = _this.$loading({
                  target: '.commonDstrTrans',
                  body: true,
                  text: '处理中'
                });
                // 调用业绩转移方法
                yufp.service.request({
                  method: 'POST',
                  url: '/api/commonPerformanceTrans/trans',
                  data: model,
                  callback: function (code, message, response) {
                    _this.closeLd();
                    if (response.code == 0) {
                      _this.$refs.refTable.remoteData(_this.params);
                      _this.$message('操作成功');
                      _this.dialogVisibleTwo = false;
                    } else {
                      _this.$message({ message: response.message, type: 'warning' });
                    }
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