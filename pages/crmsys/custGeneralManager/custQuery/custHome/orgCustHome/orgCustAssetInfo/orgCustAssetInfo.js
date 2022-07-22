/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-2-26 10:12:53.
 * @updated by
 * @description 客户财务信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custorgService + '/api/acrmfciorgassetdebt/querylist/' + custId,
          detailDataUrl: '',
          formdata: {},
          dialogVisible: false,
          viewTitle: '报表详情'
        };
      },
      methods: {
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.detailDataUrl = backend.custorgService + '/api/acrmfciorgfinitem/querylist/' + selectionsAry[0].finReportId;
          _this.$nextTick(function () {
            _this.dialogVisible = true;
            var finStatTypeCd = yufp.lookup.find('CD0041', false);
            var finStatCd = yufp.lookup.find('CD0346', false);
            this.viewTitle = finStatTypeCd[selectionsAry[0].finStatTypeCd] + '(' + finStatCd[selectionsAry[0].finStatCd] + ')';
          });
        }
      }
    });
  };
});