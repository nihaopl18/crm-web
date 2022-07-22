/**
 * @Created by 张成龙 zhangcl3@yusys.com.cn on 2019-2-28 16:27:06.
 * @updated by
 * @description 手工调整申请页面
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var applyId = data.bizSeqNo;
    yufp.lookup.reg('CD0032');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custgradeService + '/api/custgrademanualeval/queryapplyinfo', // 改成查询 评级的URl
          baseParams: { condition: JSON.stringify({ applyId: applyId }) }
        };
      },
      methods: {
        /**
          * 格式化 时间
          */
        formData: function (row, column, cellValue) {
          if (cellValue == '' || cellValue == undefined) {
            return '';
          }
          var dateee = new Date(cellValue).toJSON();
          var date = new Date(+new Date(dateee) + (8 * 3600 * 1000)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          return date.split(' ')[0];
        },
        formStat: function (row, column, cellValue) {
          if (cellValue == '1') {
            return '主办客户经理发起';
          }
          if (cellValue == '2') {
            return '审批通过';
          }
          if (cellValue == '3') {
            return '审批拒绝';
          }
        }
        // deleteFn1: function () {
        //   var tableSelections = this.$refs.refTable.selections;
        //   if (tableSelections.length < 1) {
        //     this.$message({ message: '请先选择一条记录', type: 'warning' });
        //     return;
        //   }
        //   var _this = this;
        //   if (tableSelections) {
        //     var ids = '';
        //     for (var i = 0; i < tableSelections.length; i++) {
        //       ids = ids + ',' + tableSelections[i].id;
        //     }
        //     _this.$confirm('删除内容?', '提示', {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消',
        //       type: 'warning'
        //     }).then(function () {
        //       yufp.service.request({
        //         method: 'GET',
        //         url: backend.custgradeService + '/api/custgrademanualeval/deleteApply',
        //         data: { ids: ids },
        //         callback: function (code, message, response) {
        //           if (code == '0' && response.code == 0) {
        //             _this.$message({ message: '数据删除成功！' });
        //           }
        //         }
        //       });
        //     });
        //   }
        // }
      }
    });
  };
});