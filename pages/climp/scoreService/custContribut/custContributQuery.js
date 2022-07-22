/**
 * @Created by hujun3@yusys.com.cn on 2019-1-22 09:48:55.
 * @updated by
 * @description 客户累积贡献度查询
 */
define(['custom/widgets/js/yufpCustSelector.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    //  yufp.lookup.reg('CD0011');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          dataUrl: backend.yuspClimpCustService + '/api/loysrscoreaccutesum/query', // 客户查询列表接口
          formData: {},
          addPickerOptionsStart: { // 设置交易开始时间小于交易结束时间
            disabledDate: function (time) {
              var beginDateVal = _this.formData.busnDateEnd;
              if (beginDateVal) {
                return time.getTime() > beginDateVal;
              }
            }
          },
          addPickerOptionsEnd: { // 设置交易结束时间大于交易开始时间
            disabledDate: function (time) {
              var beginDateVal = _this.formData.busnDateStart;
              if (beginDateVal) {
                return time.getTime() < beginDateVal;
              }
            }
          }
        };
      },
      methods: {
      }
    });
  };
});