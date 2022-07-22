/**
 * @created by jiangcheng 2017-11-15
 * @updated by weimei1 2018-09-18 重构为vue
 * @description 登录页
 */
define(['./libs/jsencrypt/jsencrypt.min.js'], function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          options: data,
          selectRole: ''
        };
      },
      methods: {
        nextFn: function () {
          yufp.session.selectRole = this.selectRole;
          yufp.sessionStorage.put('selectRole', this.selectRole);
          yufp.session.loadUserSession(function () {
            yufp.router.to('frame');
          }, this.selectRole);
        },
        cancelFn: function () {
          yufp.session.logout();
          window.location.reload(true);
        },
        // 查询用户角色列表
        querylogicSysFn: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.appOcaService + '/api/todowork/getuserrole?userId=' + data,
            callback: function (code, message, response) {
              var infos = response.data;
              _this.options = [];
              if (infos.length == 1) {
                var obj = {
                  key: infos[0].roleId,
                  value: infos[0].roleName
                };
                yufp.session.selectRole = obj.roleId;
                yufp.sessionStorage.put('selectRole', obj.roleId);
                yufp.session.loadUserSession(function () {
                  yufp.router.to('frame');
                }, obj.roleId);
              } else {
                for (var i = 0; i < infos.length; i++) {
                  var obj = {
                    key: infos[i].roleId,
                    value: infos[i].roleName
                  };
                  _this.options.push(obj);
                }
              }
            }
          });
        }
      },
      mounted: function () {
        // this.querylogicSysFn();
      }
    });
  };
});