/**
 * @Created by panglx panglx@yusys.com.cn on 2018-12-28 17:06:48.
 * @updated by
 * @description 试算结果查询
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CERT_TYPE,CARD_NO');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          tableDataUrl: '/api/loyTrialBatch/query', // 积分试算表格Url,
          baseParam: {}, // 表格查询参数
          orgrepoRtDataUrl: '/api/loyTrialBatch/orgreport', // 按机构汇总查询表格Url,
          productReportDataUrl: '/api/loyTrialBatch/productreport', // 按产品汇总查询表格Url,
          orgProductReportDataUrl: '/api/loyTrialBatch/orgproductreport', // 按机构+产品汇总查询Url,
          orgReportDialogVisible: false, // 机构汇总报表弹框是否可见
          productReportDialogVisible: false, // 产品汇总报表弹框是否可见
          orgProductReportDialogVisible: false // 机构+产品汇总报表弹框是否可见
        };
      },
      methods: {
        /**
         * 按机构汇总查询
         */
        byOrgReportFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.orgReportDialogVisible = true;
          var param = {
            condition: JSON.stringify(
              { bno: selectionsAry[0].bno }
            )
          };
          _this.$nextTick(function () {
            _this.$refs.refOrgReportTable.remoteData(param);
          });
        },
        /**
         * 按产品汇总查询
         */
        byProductReportFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.productReportDialogVisible = true;
          var param = {
            condition: JSON.stringify(
              { bno: selectionsAry[0].bno }
            )
          };
          _this.$nextTick(function () {
            _this.$refs.refProductReportTable.remoteData(param);
          });
        },
        /**
         * 按机构+产品汇总查询
         */
        byOrgProductReportFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.orgProductReportDialogVisible = true;
          var param = {
            condition: JSON.stringify(
              { bno: selectionsAry[0].bno }
            )
          };
          _this.$nextTick(function () {
            _this.$refs.refOrgProductReportTable.remoteData(param);
          });
        }
      }
    });
  };
});