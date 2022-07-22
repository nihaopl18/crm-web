/**
 * @Created by panglx panglx@yusys.com.cn on 2018-12-27 09:48:55.
 * @updated by
 * @description 客户基本信息
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
    // 模拟表单数据
    var formData = {
      customType: 'youzh',
      customId: '8',
      customName: '张三',
      certType: '身份证',
      certNo: 2314134413431,
      time: '2018-12-27',
      sex: '男',
      careerType: 'IT',
      job: '设计师',
      company: '宇信',
      telephone: '18620304349',
      userEmail: 'dsf@126.com',
      contactName: '李四',
      appellation: '哈哈',
      postcode: 424266,
      fax: 875443,
      phone: 888888
    };
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          readonly: true,
          formdata: {}
        };
      },
      mounted: function () {
        var _this = this;
        // 模拟初始化表单数据绑定
        yufp.clone(formData, _this.formdata);
      }
    });
  };
});