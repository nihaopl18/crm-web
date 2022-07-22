/**
 * @Created by 马妍 mayan2@yusys.com.cn on 2019-2-15 17:53:50.
 * @updated by
 * @description 客户贡献度
 */
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0375');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custpersonService + '/api/acrmfagcontrireport/querycontrilist/' + custId,
          formdata: {},
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          detaildataUrl: ''
        };
      },
      methods: {

        /**
         * 明细按钮
         */
        detailFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogVisible = true;
          _this.detaildataUrl = backend.custpersonService + '/api/acrmfagcontrireport/querycontridetaillist/' + custId;
          this.$nextTick(function () {
            _this.$refs.derefTable.remoteData();
          });
          // yufp.service.request({ // 查询业务数据
          //   method: 'GET',
          //   data: model,
          //   url: '/api/acrmfagcontrireport/querycontridetaillist/' + custId,
          //   callback: function (code, message, response) {
          //     if (code == 0) { // code等于0 说明成功
          //       _this.$refs.derefTable.tabledata == response.data;
          //
          //     }
          //   } });
        }

      }
    });
  };
});