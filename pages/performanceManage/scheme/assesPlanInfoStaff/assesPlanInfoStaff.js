/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2020-7-2 15:32:48.
 * @updated by
 * @description 机构员工考核方案结果查询
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
    yufp.lookup.reg('SCHEME_TYPE,OBJ');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          datePickerOptions: {
            disabledDate: function (time) {
              return time.getTime() >= Date.now();
            }
          },
          dataUrl: '/api/commonexcel/getorgstaffschemeinfolist',
          schemeId: '',
          templateType: '',
          evlObjType: '',
          schemeExcelParams: {},
          runResultFormDialogVisible: false,
          runResultSchemeObjParams: { checkboxVal: false },
          runResultFormEvlObjShow: false,
          runResultFormData: {},
          runResultDialogTitle: '考核方案结果查询',
          runResultDialogVisible: false
        };
      },
      methods: {
        // 查看按钮Fn
        preResultFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          if (_this.$refs.refTable.selections[0].templateType == '02') {
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
        // 方案预览-考核对象放大镜回调
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
          _this.templateType = _this.$refs.refTable.selections[0].templateType;
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
                  excelModel: '05',
                  readOnly: true,
                  etlDate: _this.runResultFormData.etlDate,
                  evlObjId: _this.runResultFormData.evlObjId,
                  cellDetail: false,
                  showRowName: false,
                  showColumnName: false
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
                    } else {
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
              title: 'ORGSTAFFINFO',
              schemeId: _this.schemeId,
              etlDate: _this.$refs.refTable.selections[0].etlDate,
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
        }
      }
    });
  };
});