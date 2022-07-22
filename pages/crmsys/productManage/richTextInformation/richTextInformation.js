/**
 * @Created by 闫天一 yanty1@yusys.com.cn on 2019-2-20 15:34:04.
 * @updated by
 * @description 产品视图-富文本信息
 */
yufp.require.require('libs/tinymce/tinymce.min.js');
define(['./custom/widgets/js/ElTinymceX.js'], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    var prodId = data.prodId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          saveBtn: !yufp.session.checkViewCtrl('save', data.id),
          action: backend.productService + '/api/ocrmfsysricheditinfo/richtextinformationquery/' + prodId,
          curInfoData: {},
          formdata: {},
          replyList: [
          ],
          replyFormdata: {},
          saveBtnShow: true,
          height: yufp.frame.size().height - 103,
          formDisabled: true,
          viewType: 'ADD',
          busNo: '',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          dialogVisible: true
        };
      },
      mounted: function () {
        // 反显页面数据
        this.initPageData();
        this.$refs.tinymce.$refs.tinymce.hasChang = false;
        this.$refs.tinymce.$refs.tinymce.init();
      },
      methods: {
        // 清空obj对象 -- common
        clearObj: function (obj) {
          for (var key in obj) {
            obj[key] = null;
          }
          return obj;
        },
        /**
         * 表单初始化数据
         */
        initPageData: function () {
          var me = this;
          yufp.service.request({ // 查询业务数据
            method: 'GET',
            url: backend.productService + '/api/ocrmfsysricheditinfo/richtextinformationquery/' + prodId,
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
                yufp.extend(me.$refs.refForm.formdata, response.data[0]);
              }
            }
          });
        },
        /**
         * 交流主题 保存
         */
        saveFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.formdata, model);
          if (!model.relId) {
            // 新增请求
            model = {relId: prodId};
            yufp.clone(_this.formdata, model);
            yufp.service.request({
              method: 'POST',
              url: backend.productService + '/api/ocrmfsysricheditinfo/add',
              data: model,
              callback: function (code, message, response) {
                if (code == 0 && response.data == 1) {
                  _this.clearObj(_this.formdata);
                  _this.$message('操作成功');
                }
              }
            });
          } else {
            // 修改请求
            yufp.service.request({
              method: 'POST',
              url: backend.productService + '/api/ocrmfsysricheditinfo/update',
              data: model,
              callback: function (code, message, response) {
                if (code == 0 && response.data == 1) {
                  _this.clearObj(_this.formdata);
                  _this.$message('操作成功');
                }
              }
            });
          }
        }
      }
    });
  };
});