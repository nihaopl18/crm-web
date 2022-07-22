/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2020-7-2 17:12:54.
 * @updated by
 * @description 考核方案测算
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
    yufp.lookup.reg('OBJ,STAT_FLAG');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '/api/pmafschemeexcel/querylist',
          previewFormDialogVisible: false,
          previewFormData: {},
          previewSchemeObjParams: { checkboxVal: false },
          previewFormEvlObjShow: false,
          previewDialogTitle: '考核方案测算',
          previewDialogVisible: false,
          schemeId: '',
          templateType: '',
          evlObjType: '',
          schemeExcelParams: {}
        };
      },
      methods: {
        // 方案测算-按钮fn
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
        // 测算-按钮fn
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
          _this.previewDialogTitle = '考核方案测算:{' + _this.previewFormData.schemeName + '/' +
                                    yufp.util.dateFormat(_this.previewFormData.etlDate, '{y}-{m}-{d}') +
                                    (_this.previewFormData.evlObjName ? '/' + _this.previewFormData.evlObjName : '') +
                                    '}';
          _this.previewDialogVisible = true;
        },
        // 导出excel-按钮fn
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
        }
      }
    });
  };
});