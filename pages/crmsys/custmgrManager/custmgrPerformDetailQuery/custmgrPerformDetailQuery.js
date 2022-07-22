/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-1-21 10:15:41.
 * @updated by
 * @description 业绩明细查询
 */
define(['/custom/widgets/js/yufpOrgTree.js',
  'custom/widgets/js/YufpUserSelector.js',
  './custom/plugins/yufp.watermark.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var mgrId = data.mgrId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custmgrService + '/api/acrmfcmcustmgrperf/querylist',
          userVisiable: mgrId == undefined
        };
      },
      mounted: function () {
        var _this = this;
        if (mgrId == undefined) {
          _this.dataUrl = backend.custmgrService + '/api/acrmfcmcustmgrperf/querylist';
        } else {
          _this.dataUrl = backend.custmgrService + '/api/acrmfcmcustmgrperf/querylist/' + mgrId;
        }
      },
      methods: {
      }
    });
  };
});