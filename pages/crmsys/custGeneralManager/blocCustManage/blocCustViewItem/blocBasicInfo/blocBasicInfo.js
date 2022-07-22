/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-2-25 10:08:13.
 * @updated by
 * @description 集团客户视图项—基本信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('GROUP_TYPE,GROUP_STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          formdata: {},
          // 从集团客户管理页面传递过来的“集团编号”
          groupNo: data.groupNo
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: '/api/ocrmfcigroup/groupinfo?groupNo=' + _this.groupNo,
          // data: {condition: JSON.stringify({
          //   groupNo: _this.groupNop
          // })},
          callback: function (code, message, response) {
            if (code == 0 && response.code === 0) {
              // 模拟初始化表单数据绑定
              yufp.clone(response.data, _this.formdata);
            } else {
              _this.$message.error('失败');
            }
          }
        });
      },
      methods: {
        // TODO
      }
    });
  };
});