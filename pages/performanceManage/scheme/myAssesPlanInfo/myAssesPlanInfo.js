/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2020-6-1 14:14:11.
 * @updated by
 * @description 我的考核方案结果
 */
define([
  './custom/widgets/js/yufpSchemeExcel.js'
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
          dataUrl: '/api/commonexcel/getmyschemeinfolist',
          dialogTitle: '',
          dialogVisible: false,
          schemeId: '',
          templateType: '',
          evlObjType: '',
          schemeExcelParams: {}
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
          _this.dialogTitle = _this.$refs.refTable.selections[0].schemeName + '/' + _this.$refs.refTable.selections[0].etlDate;
          _this.schemeId = _this.$refs.refTable.selections[0].schemeId;
          _this.templateType = _this.$refs.refTable.selections[0].templateType;
          _this.evlObjType = _this.$refs.refTable.selections[0].evlObjType;
          _this.schemeExcelParams = {
            excelModel: '04',
            readOnly: true,
            etlDate: _this.$refs.refTable.selections[0].etlDate,
            cellDetail: false,
            showRowName: false,
            showColumnName: false
          };
          _this.$nextTick(function () {
            _this.dialogVisible = true;
          });
        },
        // 导出excel-Fn
        exportExcelFn: function () {
          var _this = this;
          yufp.service.request({
            method: 'POST',
            url: '/api/commonexcel/makeschemeexcelfile',
            data: {
              title: 'MYINFO',
              schemeId: _this.schemeId,
              etlDate: _this.$refs.refTable.selections[0].etlDate,
              jsonStr: JSON.stringify(_this.$refs.schemeExcel.getExcelJson())
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