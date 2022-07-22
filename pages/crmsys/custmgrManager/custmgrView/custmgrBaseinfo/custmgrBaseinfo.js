/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-1-30 16:17:05.
 * @updated by
 * @description 客户经理基本信息
 */
define(function (require, exports) {
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
        var validphone = function (rule, value, callback) {
          if (value.trim() == '') {
            callback();
          } else if (!isNaN(value)) {
            var reg = /^1[3-9][0-9]\d{8}$/;
            if (!reg.test(value)) {
              callback(new Error('请输入正确的手机号码格式'));
            } else {
              callback();
            }
          } else {
            callback(new Error('请输入正确的手机号码格式'));
          }
        };
        return {
          formdata: {},
          saveBtn: !yufp.session.checkViewCtrl('save', data.id),
          rule: {
            graduateSchool: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            major: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            financialJobTime: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'},
              {validator: yufp.validator.number, message: '请输入数字'}
            ],
            expertise: [
              {max: 90, message: '最大长度不超过90个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            hobby: [
              {max: 90, message: '最大长度不超过90个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            trainNumYear: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'},
              {validator: yufp.validator.number, message: '请输入数字'}
            ],
            trainNumTotal: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'},
              {validator: yufp.validator.number, message: '请输入数字'}
            ],
            trainExperience: [
              {max: 200, message: '最大长度不超过200个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            teachNumYear: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'},
              {validator: yufp.validator.number, message: '请输入数字'}
            ],
            teachNumTotal: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'},
              {validator: yufp.validator.number, message: '请输入数字'}
            ],
            teachExperience: [
              {max: 200, message: '最大长度不超过200个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            award: [
              {max: 40, message: '最大长度不超过40个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            certificate: [
              {max: 40, message: '最大长度不超过40个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            mobile: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' },
              {validator: validphone, trigger: 'blur'}
            ],
            phone: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            remark: [
              {max: 200, message: '最大长度不超过200个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ]
          }
        };
      },
      mounted: function () {
        var _this = this;
        _this.getCustMgrBaseInfo();
      },
      methods: {
        formatter: function (cellValue) {
          var cellText = '';
          if (cellValue != null) {
            var arr = cellValue.split(',');
            for (var i = 0; i < arr.length; i++) {
              var val = arr[i];
              if (val == '1') {
                cellText = cellText + '个人,';
              } else if (val == '2') {
                cellText = cellText + '对公,';
              } else if (val == '3') {
                cellText = cellText + '三农,';
              } else if (val == '4') {
                cellText = cellText + '国结,';
              } else if (val == '5') {
                cellText = cellText + '村镇银行,';
              }
            }
            cellText = cellText.substring(0, cellText.length - 1);
          }
          return cellText;
        },
        /**
         * 保存
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
          _this.$confirm('是否确定保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'POST',
                  url: backend.custmgrService + '/api/acrmfcmcustmgrinfo/updateinfo',
                  data: _this.formdata,
                  callback: function (code, message, response) {
                    _this.$message({
                      showClose: true,
                      message: '操作成功',
                      type: 'success'
                    });
                  }
                });
              } else {
                return false;
              }
            }
          });
        },
        /**
         * 获取客户经理基本信息
         */
        getCustMgrBaseInfo: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.custmgrService + '/api/acrmfcmcustmgrinfo/queryinfo/' + mgrId,
            data: _this.formdata,
            callback: function (code, message, response) {
              if (code == 0) {
                response.data[0].busiType = _this.formatter(response.data[0].busiType);
                yufp.clone(response.data[0], _this.formdata);
              }
            }
          });
        }
      }
    });
  };
});