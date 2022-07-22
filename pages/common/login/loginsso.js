/**
 * @created by jiangcheng 2017-11-15
 * @updated by
 * @description 登录页
 */
define(['jquery'], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        var token = data.code;

        var setCookie = function(c_name, value, expiredays) {
            var exdate = new Date()
            exdate.setDate(exdate.getDate() + expiredays) //
            document.cookie = c_name + "=" + escape(value) +
                ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
        };
        var loginFn = function() {
            var _this = this;

            var params = {
                username: 'admin',
                password: 'nmKDyvkN3p4Gc5sDvIt7FngaSyuXLy/Nco0dRe6iWmP4YvAKUE/RgRgDWbQIrcrOf4GVPXsrxMHO0PK7h7j9o4HOz5DeGWH0jKMfgkPhFdVXIrWT43/M51SIHfYFUl2SO5L+xvdy8c86qBxxe2JlWzVruslbvlxkdd5GNeDO8h8=',
                grant_type: 'password',
                passwordType: '2',
                sysId: '1cab27def8fb4c0f9486dcf844b783c0',
                crm_sso: 'SSO'

            };

            var headers2 = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': 'Basic d2ViX2FwcDo='
            };


            /**初始化宇信CRM*/
            params.username = data.code;
            params.csrf = data.csrf;
            params.ssotoken = data.token;

            yufp.service.request({
                needToken: false,
                url: backend.uaaService + '/oauth/token',
                method: 'post',
                headers: headers2,
                data: params,
                callback: function(code, message, response) {
                    if (location.href.indexOf("?") > 0) {
                        location.href = location.href.substring(0, location.href.indexOf("?"));
                    }

                    if (response && response.code == undefined) {
                        var data = response && response.access_token;
                        yufp.service.putToken(data);
                        yufp.session.loadUserSession(function() {
                            yufp.router.to("frame");
                        });
                        //                                
                    } else if (response && response.code == '100002') {
                        var strategyMessage = response.strategyMessage;
                        var passwordfalse = window.localStorage.getItem('passwordfalse') == null || window.localStorage.getItem('passwordfalse') == true;
                        if (strategyMessage && passwordfalse) {
                            //解决弹出信息多次
                            window.localStorage.setItem('passwordfalse', false);
                            setTimeout(function() {
                                window.localStorage.setItem('passwordfalse', true);
                            }, 30000);
                            var i = 0;
                            var warn = setInterval(function() {
                                _this.$notify({
                                    message: strategyMessage[i].message,
                                    type: response.level
                                });
                                if (i < strategyMessage.length - 1) {
                                    i++;
                                } else {
                                    clearInterval(warn);
                                }
                            }, 10);
                        }
                        if (response.creStrategyName == 'LOGIN_FIRST_RULE') {
                            _this.localToken = response && response.access_token;
                            _this.dialogVisible = true;
                        } else {
                            var data = response && response.access_token;
                            yufp.service.putToken(data);

                            yufp.session.loadUserSession(function() {
                                yufp.router.to('frame');

                            });
                        }
                    } else {
                        var msg = response && response.message ? response.message : '登录失败，请联系系统管理员！';

                    }
                }
            });
            // if(location.href.indexOf("?")>0){
            //     location.href = location.href.substring(0,location.href.indexOf("?"));
            // }

        }
        loginFn();

    };
});