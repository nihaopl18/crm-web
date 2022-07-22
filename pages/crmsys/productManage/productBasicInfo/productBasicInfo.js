/**
 * @Created by 闫天一 yanty1@yusys.com.cn on 2019-1-30 16:20:46.
 * @updated by
 * @description 产品视图-产品基本信息
 */
define(['custom/widgets/js/yufpProdCatlTree.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0071', 'CD0201', 'CD0242');
    var prodId = data.prodId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          saveBtn: !yufp.session.checkViewCtrl('save', data.id),
          formdata: {},
          rule: {
            productId: [
              {max: 32, message: '最大长度不超过32个字符', trigger: 'blur' }
            ],
            prodName: [
              {max: 50, message: '最大长度不超过50个字符', trigger: 'blur' },
              {required: true, message: '字段不能为空', trigger: 'blur'}
            ],
            catlCode: [
              {max: 32, message: '最大长度不超过32个字符', trigger: 'blur' },
              {required: true, message: '字段不能为空', trigger: 'blur'}
            ],
            prodState: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }
            ],
            riskLevel: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }
            ],
            rate: [
              // {max: 14, message: '最大长度不超过14个字符', trigger: 'blur' }
              {validator: yufp.validator.float, message: '请输入数字'}
            ],
            freeRate: [
              // {max: 14, message: '最大长度不超过14个字符', trigger: 'blur' }
              {validator: yufp.validator.float, message: '请输入数字'}
            ],
            prodTerm: [
              {max: 5, message: '最大长度不超过5个字符', trigger: 'blur' }
            ],
            cuyyenType: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }
            ],
            prodStartDate: [
            ],
            prodEndDate: [
            ],
            prodDesc: [
              {max: 1500, message: '最大长度不超过1500个字符', trigger: 'blur' }
            ],
            prodCharact: [
              {max: 800, message: '最大长度不超过800个字符', trigger: 'blur' }
            ],
            subscribeStartAmt: [
              // {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' },
              {validator: yufp.validator.number, message: '请输入数字'}
            ],
            appObj: [
              {max: 800, message: '最大长度不超过800个字符', trigger: 'blur' }
            ],
            buyCondition: [
              {max: 400, message: '最大长度不超过400个字符', trigger: 'blur' }
            ],
            handProcess: [
              {max: 800, message: '最大长度不超过800个字符', trigger: 'blur' }
            ],
            handChannle: [
              {max: 800, message: '最大长度不超过800个字符', trigger: 'blur' }
            ],
            discntInfo: [
              {max: 500, message: '最大长度不超过500个字符', trigger: 'blur' }
            ],
            mktMsg: [
              {max: 500, message: '最大长度不超过500个字符', trigger: 'blur' }
            ],
            isMultiRecord: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }
            ],
            remark: [
              {max: 1000, message: '最大长度不超过1000个字符', trigger: 'blur' }
            ]
          }
        };
      },
      mounted: function () {
        // 反显页面数据
        this.initPageData();
      },
      methods: {
        /**
         * 表单初始化数据
         */
        initPageData: function () {
          var me = this;
          yufp.service.request({ // 查询业务数据
            method: 'GET',
            url: backend.productService + '/api/acrmfpdprodinfo/productbasicinfoquery/' + prodId,
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
                yufp.extend(me.$refs.refForm.formdata, response.data[0]);// 基本信息
              }
            } });
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          //  if (model.lastChgUsr != yufp.session.userCode) {
          //     _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
          //   return;
          //  }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.productService + '/api/acrmfpdprodinfo/ctrateproductinfo',
            data: model,
            callback: function (code, message, response) {
              // _this.$refs.refForm.resetFields();
              _this.$message('修改成功');
              _this.dialogVisible = false;
            }
          });
        }
      }
    });
  };
});