/**
 * @created by hujun3
 * @updated by
 * @description 审批-商户审批页面
 */
define(['libs/yufp/widgets/js/YufpWfInit.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('IDENT_TYPE,MANAGE_A_TYPE,DATA_STS');

    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          // 表格数据
          dataParams: { condition: JSON.stringify({
            batchNo: data.bizSeqNo
          }) },
          dataUrl: backend.qyPoolService + '/api/loyqymerchantinfo/query'
        };
      },
      mounted: function () {
        // var _this = this;
        // // 向后台发送保存请求
        // yufp.service.request({
        //   method: 'GET',
        //   url: backend.qyPoolService + '/api/loyqymerchantinfo/detail?id=' + data.bizSeqNo,
        //   callback: function (code, message, response) {
        //     _this.$refs.refForm.resetFields();
        //     yufp.clone(response.data, _this.formdata);
        //     // _this.$message('操作成功');
        //   }
        // });
      },
      methods: {
        // 日期格式化(年月日时分秒)
        dateFormatter: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d} {h}:{i}:{s}');
        },
        // 日期格式化(年月日)
        dateFormatterSimple: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
        }
      }
    });
  };
});