/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-2-14 09:30:13.
 * @updated by
 * @description 客户经理团队基本信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var mktTeamId = data.mktTeamId;
    yufp.lookup.reg('CD0338');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          formdata: {}
        };
      },
      mounted: function () {
        var _this = this;
        _this.getCustMgrGroupBaseInfo();
      },
      methods: {
        /**
         * 获取客户经理团队基本信息
         */
        getCustMgrGroupBaseInfo: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custmgrgroupService + '/api/ocrmfcmmktteam/queryinfo/' + mktTeamId,
            data: _this.formdata,
            callback: function (code, message, response) {
              if (code == 0) {
                yufp.clone(response.data[0], _this.formdata);
              }
            }
          });
        }
      }
    });
  };
});