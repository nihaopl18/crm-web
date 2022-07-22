/**
 * @created by luoshun
 * @updated by
 * @description 提醒规则
 */
define(['pages/climp/busnPara/remindRule/remindRule.css'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('IS_USE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          // 表单数据
          custScoreFormdata: {},
          scoreActiveFormdata: {},
          iScoreFormdata: {},
          scoreGiveFormdata: {},
          tabName: 'custScore',
          roleUrl: backend.yuspClimpBparamService + '/api/remindrule/rolelist',
          rules: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '数字' }]
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.yuspClimpBparamService + '/api/remindrule/rulelist',
          data: { ruleCode: _this.tabName },
          callback: function (code, message, response) {
            if (response.data) {
              _this.$refs[_this.tabName + 'Ref'].resetFields();
              yufp.clone(response.data[0], _this[_this.tabName + 'Formdata']);
            }
          }
        });
      },
      methods: {
        handleClick: function (tab, event) {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.yuspClimpBparamService + '/api/remindrule/rulelist',
            data: { ruleCode: _this.tabName },
            callback: function (code, message, response) {
              if (response.data) {
                if (tab.name) {
                  _this.$refs[tab.name + 'Ref'].resetFields();
                  yufp.clone(response.data[0], _this[tab.name + 'Formdata']);
                } else {
                  _this.$refs[tab + 'Ref'].resetFields();
                  yufp.clone(response.data[0], _this[tab + 'Formdata']);
                }
              }
            }
          });
        },
        /**
         * 保存
         */
        saveFn: function (ref, model) {
          var _this = this;
          _this[model].ruleCode = _this.tabName;
          var validate = false;
          _this.$refs[ref].validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            _this.$message({ message: '请输入必输项！', type: 'warning' });
            return;
          }
          yufp.service.request({
            method: 'POST',
            url: backend.yuspClimpBparamService + '/api/remindrule/addremind',
            data: _this[model],
            callback: function (code, message, response) {
              _this.$refs[ref].resetFields();
              yufp.service.request({
                method: 'GET',
                url: backend.yuspClimpBparamService + '/api/remindrule/rulelist',
                data: { ruleCode: _this.tabName },
                callback: function (code, message, response) {
                  if (response.data) {
                    _this.$refs[_this.tabName + 'Ref'].resetFields();
                    yufp.clone(response.data[0], _this[_this.tabName + 'Formdata']);
                  }
                }
              });
            }
          });
        },
        /**
         * 重置
         */
        resetFn: function (ref) {
          var _this = this;
          _this.$refs[ref].resetFields();
        }
      }
    });
  };
});