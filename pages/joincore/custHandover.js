/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-2 16:52:42.
 * @updated by
 * @description 客户移交
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var applyNo = data.bizSeqNo;
    yufp.lookup.reg('CERT_TYPE,CARD_NO,CD0241,CD0011,CD0016,CD0019');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '/api/ocrmfcitransapply/transferinfo',
          initFilesParams: {
            condition: JSON.stringify({
              busNo: applyNo
            })
          },
          fileUpLoadBusNo: {},
          baseParams: {condition: JSON.stringify({applyNo: applyNo})}
        };
      },
      mounted: function () {
        var _this = this;
        _this.fileTableQuery();
      },
      methods: {
        fileTableQuery: function () {
          var _this = this;
          // var obj = { messageId: _this.applyNo };
          // var messageIdTemp = obj != null && obj.messageId != null ? obj.messageId : '';
          // _this.fileUpLoadBusNo = { busNo: messageIdTemp};
          // // 初始化附件列表查询时，传入为空
          // var tempParams = {
          //   condition: JSON.stringify({
          //     busNo: messageIdTemp
          //   })
          // };
          // yufp.extend(_this.initFilesParams, tempParams);
          // 获取附件列表
          _this.$refs.fileTable.queryFn();
        }
      }
    });
  };
});