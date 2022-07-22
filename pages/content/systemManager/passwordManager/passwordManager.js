/**
 * @Authoer: dusong
 * @Description: 密码管理
 * @Date 2017/12/20
 * @Modified By:
 *
 */
define([
  './libs/jsencrypt/jsencrypt.min.js'
], function (require, exports) {
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: '#password',
      data: function () {
        var me = this;
        return {
          editFields: [{
            columnCount: 1,
            fields: [{
              field: 'oldPassWord',
              label: '原密码',
              type: 'password',
              placeholder: '原密码',
              rules: [{
                required: true,
                message: '请输入原密码',
                trigger: 'blur'
              }]
            },
            {
              field: 'newPassWord',
              label: '密码',
              type: 'password',
              placeholder: '密码',
              rules: [{
                required: true,
                message: '请输入密码',
                trigger: 'blur'
              },
              {
                min: 6,
                max: 40,
                message: '长度在6到25个字符',
                trigger: 'blur'
              }
              ]
            },
            {
              field: 'confirmPassWord',
              label: '确认密码',
              type: 'password',
              placeholder: '确认密码',
              rules: [{
                required: true,
                message: '请输入确认密码',
                trigger: 'blur'
              },
              {
                min: 6,
                max: 40,
                message: '长度在6到25个字符',
                trigger: 'blur'
              }
              ]
            }
            ]
          }],
          buttons: [{
            label: '重置',
            type: 'primary',
            icon: 'yx-loop2',
            op: 'reset',
            click: function (model) {
              // do something
            }
          },
          {
            label: '保存',
            type: 'primary',
            icon: 'check',
            op: 'submit',
            click: function (model, valid) {
              if (valid) {
                me.saveFn();
              }
            }
          }
          ]
        };
      },

      methods: {

        saveFn: function () {
          var me = this;
          var fields = me.$refs.passwdform.formModel;
          var newPassWord = fields.newPassWord;
          var confirmPassWord = fields.confirmPassWord;
          if (newPassWord != confirmPassWord) {
            me.$message({
              message: '确认密码与密码不一致！',
              type: 'error'
            });
            return;
          }
          this.eqaul2UsingPassword(fields); // 校验填写的原密码是否正确
        },
        eqaul2UsingPassword: function (fields) {
          var me = this;
          var oldPassWord = fields.oldPassWord;
          var encodeOldPwd = this.encodePassword(oldPassWord);
          yufp.service.request({
            url: backend.uaaService + '/api/passwordcheck/match',
            method: 'POST',
            data: {
              sysId: this.sysLogicId,
              pwd: encodeOldPwd,
              passwordType: '2',
              userId: yufp.session.userId
            },
            callback: function (code, message, response) {
              if (code == 0 && response.code == '1001') {
                me.pwdStrategyCheck(fields);// 原密码正确，校验新密码是或否符合密码策略
              } else {
                me.$message({
                  message: response.message,
                  type: 'warning'
                });
                return;
              }
            }
          });
        },
        pwdStrategyCheck: function (fields) {
          var me = this;
          var newPassWord = fields.newPassWord;
          var encodePwd = this.encodePassword(newPassWord);
          yufp.service.request({
            url: backend.uaaService + '/api/passwordcheck/checkpwd',
            method: 'POST',
            data: {
              sysId: yufp.session.logicSys.id,
              pwd: encodePwd,
              userId: yufp.session.userId,
              passwordTyp: '2'
            },
            callback: function (code, message, response) {
              if (code == 0 && response.code == '1001') {
                me.resetPwd(encodePwd); // 新密码通过校验策略，重置登录密码
              } else {
                me.$message({
                  message: response.message,
                  type: 'warning'
                });
                return;
              }
            }
          });
        },
        resetPwd: function (encodePwd) {
          var me = this;
          yufp.service.request({
            url: backend.appOcaService + '/api/adminsmuser/resetpwd',
            method: 'POST',
            data: JSON.stringify({
              userId: yufp.session.userId,
              password: encodePwd,
              updateUser: yufp.session.userId
            }),
            callback: function (code, message, response) {
              if (code === 0) {
                yufp.service.request({
                  url: backend.appOcaService + '/api/adminsmuserattr/updatePwdTime',
                  method: 'GET',
                  data: {userId: yufp.session.userId},
                  callback: function (code, message, response) {
                    me.$alert('密码修改成功，即将重新登录系统', '提示', {
                      confirmButturnText: '确认',
                      callback: function (action) {
                        yufp.session.logout();
                      }
                    });
                  }
                });
              } else {
                me.$message({
                  message: '密码修改失败！',
                  type: 'warning'
                });
              }
            }
          });
        },
        encodePassword: function (pwd) {
          var encrypt = new JSEncrypt();
          encrypt.setPublicKey(yufp.util.getRSAPublicKey());
          var encryptPwd = encrypt.encrypt(pwd);
          return encryptPwd;
        }
      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});