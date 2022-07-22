/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-10 18:03:36
 * @update by:
 * @description:
 */
/**
 * @created by jiangcheng 2017-11-15
 * @updated by weimei1 2018-09-18 重构为vue
 * @description 登录页
 */
define(['./libs/jsencrypt/jsencrypt.min.js'], function(require, exports) {
    // 生成唯一识别号
    function genUUID(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
            i;
        radix = radix || chars.length;

        if (len) {
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            var r;

            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }

    var clientId = genUUID(16, 16) + Date.parse(new Date());
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                var _this = this;
                return {
                    isChormeable: false,
                    dialogVisible: false,
                    localToken: null,
                    logicSysList: null,
                    msgShow: false,
                    sysListShow: false,
                    message: null,
                    borderColor: null,
                    sysLogicId: null, // 逻辑系统ID
                    sysLogicName: null, // 逻辑系统名称
                    username: '', // 用户名
                    password: '', // 密码
                    imageCode: null, // 验证码
                    imageCodePictureUrl: yufp.service.getUrl({ url: backend.uaaService + '/api/codeImage/' + clientId + '?t=' + (new Date()).getTime() }),
                    passwdFields: [{
                        columnCount: 1,
                        fields: [{
                                field: 'oldPassWord',
                                label: '原密码',
                                type: 'password',
                                placeholder: '原密码',
                                rules: [{ required: true, message: '请输入原密码', trigger: 'blur' }]
                            },
                            {
                                field: 'newPassWord',
                                label: '密码',
                                type: 'password',
                                placeholder: '密码',
                                rules: [{ required: true, message: '请输入密码', trigger: 'blur' },
                                    { min: 6, max: 40, message: '长度在6到25个字符', trigger: 'blur' }
                                ]
                            },
                            {
                                field: 'confirmPassWord',
                                label: '确认密码',
                                type: 'password',
                                placeholder: '确认密码',
                                rules: [{ required: true, message: '请输入确认密码', trigger: 'blur' },
                                    { min: 6, max: 40, message: '长度在6到25个字符', trigger: 'blur' }
                                ]
                            }
                        ]
                    }],
                    buttons: [{
                            label: '重置',
                            type: 'primary',
                            icon: 'yx-loop2',
                            op: 'reset',
                            click: function(model) {}
                        },
                        {
                            label: '保存',
                            type: 'primary',
                            icon: 'check',
                            op: 'submit',
                            click: function(model, valid) {
                                if (valid) {
                                    _this.saveFn();
                                }
                            }
                        }
                    ]
                };
            },
            methods: {
                sureFn: function() {
                    window.opener = null;
                    window.open('', '_self');
                    window.close();
                },
                // 判断是否为ie浏览器
                isIE: function() { //ie?
                    if (!!window.ActiveXObject || "ActiveXObject" in window) {
                        this.isChormeable = true;
                    } else {
                        this.isChormeable = false;
                    }
                },
                //判断是否为谷歌浏览器
                isChorme: function() {
                    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串      
                    this.isChormeable = !(userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1); //判断Chrome浏览器 
                },
                // 鼠标划入展示逻辑系统列表
                mouseoverFn: function() {
                    this.sysListShow = true;
                },
                // 鼠标点击，逻辑系统列表取消展示
                clickFn: function() {
                    this.sysListShow = false;
                },
                // 逻辑系统选择
                sysChooseFn: function(item) {
                    this.sysLogicId = item.key;
                    this.sysLogicName = item.value;
                },
                // 登录提交
                submitFn: function() {
                    this.checkImageFn();
                },
                // 校验图形验证码
                /**
                 * 有两种方式进行处理
                 * 1、输入验证码后立即请求后台进行校验；
                 * 2、输入验证码，点击登录时，先发请求校验验证码，验证通过之后再进行登录处理
                 */
                checkImageFn: function() {
                    if (this.username == '') {
                        this.message = '请输入用户名!';
                        this.msgShow = true;
                        this.$refs.username.focus();
                        return;
                    }
                    if (this.password == '') {
                        this.message = '请输入密码!';
                        this.msgShow = true;
                        this.$refs.password.focus();
                        return;
                    }
                    // if (this.imageCode == '') {
                    //   this.message = '请输入验证码!';
                    //   this.msgShow = true;
                    //   this.$refs.imageCode.focus();
                    //   return;
                    // }
                    this.msgShow = false;
                    this.loginFn();
                },
                // 刷新图形验证码
                // freshImageCodeFn: function () {
                //   this.$refs.validateImg.src = yufp.service.getUrl({ url: backend.uaaService + '/api/codeImage/' + clientId + '?t=' + (new Date()).getTime() }); ;
                //   this.imageCode = '';
                // },
                // 查询逻辑系统列表
                querylogicSysFn: function() {
                    var _this = this;
                    yufp.service.request({
                        needToken: false,
                        url: backend.appOcaService + '/api/adminsmlogicsys/logicsyskv',
                        method: 'get',
                        callback: function(code, message, response) {
                            var logicSysList = response.data;

                            if (typeof logicSysList !== 'undefined' && logicSysList !== null) {
                                _this.logicSysList = logicSysList;
                                _this.sysLogicName = logicSysList[0].value;
                                _this.sysLogicId = logicSysList[0].key;
                            } else {
                                _this.message = '逻辑系统加载异常！请联系系统管理员';
                                _this.msgShow = true;
                            }
                        }
                    });
                },
                // 查询用户角色列表
                querylogicRoleFn: function() {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: backend.appOcaService + '/api/todowork/getuserrole?userId=' + _this.username,
                        callback: function(code, message, response) {
                            var infos = response.data;
                            _this.options = [];
                            if (infos.length == 1) {
                                var obj = {
                                    key: infos[0].roleId,
                                    value: infos[0].roleName
                                };
                                yufp.session.selectRole = obj.key;

                                yufp.sessionStorage.put('selectRole', obj.key);

                                yufp.session.loadUserSession(function() {
                                    yufp.router.to('frame');
                                }, obj.key);
                            } else {
                                for (var i = 0; i < infos.length; i++) {
                                    var obj = {
                                        key: infos[i].roleId,
                                        value: infos[i].roleName
                                    };
                                    _this.options.push(obj);
                                }
                                yufp.router.to('roleSelect', _this.options);
                            }
                        }
                    });
                },
                // 登录
                loginFn: function() {
                    var headers1 = {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Basic d2ViX2FwcDo='
                    };
                    var data1 = {
                        clientId: clientId,
                        imageCode: this.imageCode
                    };

                    var headers2 = {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Authorization': 'Basic d2ViX2FwcDo='
                    };
                    var password = this.password;
                    var encodePwd = this.encodePassword(password);

                    var data2 = {
                        username: this.username,
                        password: encodePwd,
                        grant_type: 'password',
                        passwordType: '2',
                        sysId: this.sysLogicId
                    };

                    var _this = this;
                    _this.borderColor = 'lightgreen';
                    yufp.service.request({
                        needToken: false,
                        url: backend.uaaService + '/oauth/token',
                        method: 'post',
                        headers: headers2,
                        data: data2,
                        callback: function(code, message, response) {
                            if (response && response.code == undefined) {
                                var data = response && response.access_token;
                                yufp.service.putToken(data);
                                // yufp.session.loadUserSession(function () {
                                //   //yufp.router.to('frame');
                                //   yufp.router.to('roleSelect');
                                // });
                                _this.querylogicRoleFn();

                                var log = {
                                    'userId': yufp.session.userId,
                                    'orgId': yufp.session.org.code,
                                    'menuId': menuId,
                                    'operFlag': '按钮操作',
                                    'logTypeId': '4',
                                    'beforeValue': '',
                                    'afterValue': '',
                                    'operObjId': menuName,
                                    'content': '操作菜单[' + menuName + ']的按钮:' + butTitle
                                };
                                yufp.service.request({
                                    url: yufp.frame.baseFrameOptions.viewMenuLogUrl,
                                    method: 'post',
                                    data: log,
                                    callback: function(code, msg, response) {
                                        if (code !== 0 || !response) {
                                            yufp.logger.warn('日志上传失败');
                                        }
                                    }
                                });
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
                                    // yufp.session.loadUserSession(function () {
                                    //   //yufp.router.to('frame');
                                    //   yufp.router.to('roleSelect');
                                    // });
                                    _this.querylogicRoleFn();
                                }
                            } else {
                                var msg = response && response.message ? response.message : '登录失败，请联系系统管理员！';
                                // if (response.code == '100001') {
                                //   _this.message = '用名或密码错误!';
                                // } else {
                                //   _this.message = msg;
                                // }
                                _this.message = msg;
                                _this.msgShow = true;
                            }
                        }
                    });
                    // var imageCodeUrl = backend.uaaService + '/api/codeImage/verifyCodeImage';
                    // var _this = this;
                    // yufp.service.request({
                    //   needToken: false,
                    //   url: imageCodeUrl,
                    //   method: 'post',
                    //   headers: headers1,
                    //   data: data1,
                    //   callback: function (code, message, response) {
                    //     if (!response || !code == '0') {
                    //       var msg = response && response.message ? response.message : '验证码错误！';

                    //       _this.message = msg;
                    //       _this.msgShow = true;

                    //       _this.imageCode = '';

                    //       //   // 生成新的图形验证码
                    //       _this.freshImageCodeFn();
                    //       return false;
                    //     } else {
                    //       // TODO 添加验证码正确样式
                    //       _this.borderColor = 'lightgreen';
                    //       yufp.service.request({
                    //         needToken: false,
                    //         url: backend.uaaService + '/oauth/token',
                    //         method: 'post',
                    //         headers: headers2,
                    //         data: data2,
                    //         callback: function (code, message, response) {
                    //           if (response && response.code == undefined) {
                    //             var data = response && response.access_token;
                    //             yufp.service.putToken(data);
                    //             yufp.session.loadUserSession(function () {
                    //               yufp.router.to('frame');
                    //             });
                    //           } else if (response && response.code == '100002') {
                    //             var strategyMessage = response.strategyMessage;
                    //             if (strategyMessage) {
                    //               var i = 0;
                    //               var warn = setInterval(function () {
                    //                 _this.$notify({
                    //                   message: strategyMessage[i].message,
                    //                   type: response.level
                    //                 });
                    //                 if (i < strategyMessage.length - 1) {
                    //                   i++;
                    //                 } else {
                    //                   clearInterval(warn);
                    //                 }
                    //               }, 10);
                    //             }
                    //             if (response.creStrategyName == 'LOGIN_FIRST_RULE') {
                    //               _this.localToken = response && response.access_token;
                    //               _this.dialogVisible = true;
                    //             } else {
                    //               var data = response && response.access_token;
                    //               yufp.service.putToken(data);
                    //               yufp.session.loadUserSession(function () {
                    //                 yufp.router.to('frame');
                    //               });
                    //             }
                    //           } else {
                    //             var msg = response && response.message ? response.message : '登录失败，请联系系统管理员！';
                    //             if (response.code == '100001') {
                    //               _this.message = '用名或密码错误!';
                    //             } else {
                    //               _this.message = msg;
                    //             }
                    //             _this.msgShow = true;
                    //           }
                    //         }
                    //       });
                    //     }


                    //   }
                    // });
                },
                // 登录密码加密
                encodePassword: function(pwd) {
                    var encrypt = new JSEncrypt();
                    encrypt.setPublicKey(yufp.util.getRSAPublicKey());
                    var encryptPwd = encrypt.encrypt(pwd);
                    var encodePwd = encodeURIComponent(encryptPwd);
                    return encodePwd;
                },
                // 匹配密码加密
                matchPassword: function(pwd) {
                    var encrypt = new JSEncrypt();
                    encrypt.setPublicKey(yufp.util.getRSAPublicKey());
                    var encryptPwd = encrypt.encrypt(pwd);
                    return encryptPwd;
                },
                // 用户首次登录修改密码-保存方法
                saveFn: function() {
                    var _this = this;
                    var fields = _this.$refs.passwdform.formModel;
                    var newPassWord = fields.newPassWord;
                    var confirmPassWord = fields.confirmPassWord;
                    if (newPassWord != confirmPassWord) {
                        _this.$message({
                            message: '确认密码与密码不一致！',
                            type: 'error'
                        });
                        return;
                    }
                    this.getUserId(fields);
                },
                getUserId: function(fields) {
                    var _this = this;
                    yufp.service.putToken(_this.localToken);
                    var loginCode = _this.username;
                    yufp.service.request({
                        url: backend.appOcaService + '/api/adminsmuser/getUserId?loginCode=' + loginCode,
                        method: 'POST',
                        callback: function(code, message, response) {
                            if (code === 0 && response.code == 0) {
                                if (response.data) {
                                    var userId = response.data;
                                    _this.eqaul2UsingPassword(fields, userId); // 校验填写的原密码是否正确F
                                } else {
                                    _this.$message({
                                        message: '密码保存失败！',
                                        type: 'warning'
                                    });
                                    yufp.service.removeToken();
                                }
                            }
                            return;
                        }
                    });
                },
                eqaul2UsingPassword: function(fields, userId) {
                    var _this = this;
                    var oldPassWord = fields.oldPassWord;
                    var encodeOldPwd = this.matchPassword(oldPassWord);

                    yufp.service.request({
                        url: backend.uaaService + '/api/passwordcheck/match',
                        method: 'POST',
                        data: {
                            sysId: this.sysLogicId,
                            pwd: encodeOldPwd,
                            passwordType: '2',
                            userId: userId
                        },
                        callback: function(code, message, response) {
                            if (code == 0 && response.code == '1001') {
                                _this.pwdStrategyCheck(fields, userId); // 原密码正确，校验新密码是或否符合密码策略
                            } else {
                                _this.$message({
                                    message: response.message,
                                    type: 'warning'
                                });
                                yufp.service.removeToken();
                            }
                        }
                    });
                },
                pwdStrategyCheck: function(fields, userId) {
                    var _this = this;
                    var newPassWord = fields.newPassWord;
                    var encodePwd = this.matchPassword(newPassWord);
                    yufp.service.request({
                        url: backend.uaaService + '/api/passwordcheck/checkpwd',
                        method: 'POST',
                        data: {
                            sysId: this.sysLogicId,
                            pwd: encodePwd,
                            userId: userId,
                            passwordTyp: '2'
                        },
                        callback: function(code, message, response) {
                            if (code == 0 && response.code == '1001') {
                                _this.resetPwd(encodePwd, userId); // 新密码通过校验策略，重置登录密码
                            } else {
                                _this.$message({
                                    message: response.message,
                                    type: 'warning'
                                });
                                yufp.service.removeToken();
                            }
                        }
                    });
                },
                resetPwd: function(encodePwd, userId) {
                    var _this = this;
                    yufp.service.request({
                        url: backend.appOcaService + '/api/adminsmuser/resetpwd',
                        method: 'POST',
                        data: JSON.stringify({
                            userId: userId,
                            password: encodePwd,
                            updateUser: userId
                        }),
                        callback: function(code, message, response) {
                            if (code == 0 && response.code == 0) {
                                yufp.service.request({
                                    url: backend.appOcaService + '/api/adminsmuserattr/updatePwdTime',
                                    method: 'GET',
                                    data: { userId: userId },
                                    callback: function(code, message, response) {
                                        _this.$message({
                                            message: '密码修改成功,请使用新密码登录！'
                                        }, 'success');
                                        _this.dialogVisible = false;
                                        _this.password = null;
                                        _this.imageCode = null;
                                        // _this.freshImageCodeFn();
                                        yufp.service.removeToken();
                                    }
                                });
                            } else {
                                _this.$message({
                                    message: '密码修改失败！',
                                    type: 'warning'
                                });
                                yufp.service.removeToken();
                            }
                        }
                    });
                }
            },
            mounted: function() {
                this.querylogicSysFn();
                // this.isChorme();
                this.isIE();
                // this.freshImageCodeFn();
            }
        });
    };
});