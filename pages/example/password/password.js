
define(function (require, exports) {
    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        var vm =  yufp.custom.vue({
            el: "#passwordDemo",
            data: function(){
            	var em=this;
                return {
                    password:'admin',
                    passwordWithRSA:'',
                    passwordT:'',
                    userPasswordWithBCrypt:'',
                    userPassword:'admin',
                    result:'',
                    show1:true,
                    show2:true,
                    show3:true,
                    show4:true
                }
            },
            methods: {
                jiami:function(){
                    var me=this;
                    me.show1= false;
                    if (me.password&&me.password!='') {
                        yufp.service.request({
                            method: 'post',
                            data:{
                                password:me.password
                            },
                            url: backend.example+"/api/password/jiami",
                            callback: function (code, message, response) {
                                if (response.data) {                                
                                    me.$message({message: '加密成功', type: 'success'});
                                    me.passwordWithRSA=response.data;
                                }else{
                                    me.$message({message: '加密失败', type: 'error'});
                                }
                                me.show1= true;
                            }
                        });
                    } else {
                        this.$message({message: '左侧输入框值不能为空', type: 'warning'});
                        return false;
                    }
                },
                jiemi:function(){
                    var me=this;
                    me.show2= false;
                    if (me.passwordWithRSA&&me.passwordWithRSA!='') {
                        yufp.service.request({
                            method: 'post',
                            data:{
                                passwordWithRSA:me.passwordWithRSA
                            },
                            url: backend.example+"/api/password/jiemi",
                            callback: function (code, message, response) {
                                if (response.data) {
                                    me.$message({message: '解密成功', type: 'success'});
                                    me.passwordT=response.data;
                                }else{
                                    me.$message({message: '解密失败', type: 'error'});
                                }
                                me.show2= true;
                            }
                        });
                    } else {
                        this.$message({message: '左侧输入框值不能为空', type: 'warning'});
                        return false;
                    }
                },
                bianma:function(){
                    var me=this;
                    if (me.userPassword&&me.userPassword!='') {
                        me.show3= false;
                        yufp.service.request({
                            method: 'post',
                            data:{
                                userPassword:me.userPassword
                            },
                            url: backend.example+"/api/password/BCrypt",
                            callback: function (code, message, response) {
                                if (response.data) {
                                    me.$message({message: '加密成功', type: 'success'});
                                    me.userPasswordWithBCrypt=response.data;
                                }else{
                                    me.$message({message: '加密失败', type: 'error'});
                                }
                                me.show3= true;
                            }
                        });
                    } else {
                        this.$message({message: '左侧输入框值不能为空', type: 'warning'});
                        return false;
                    }
                },
                jiaoyan:function(){
                    var me=this;
                    if (me.userPasswordWithBCrypt&&me.userPasswordWithBCrypt!=''&&me.userPassword&&me.userPassword!='') {
                        me.show4= false;
                        yufp.service.request({
                            method: 'post',
                            data:{
                                userPasswordWithBCrypt:me.userPasswordWithBCrypt,
                                userPassword:me.userPassword
                            },
                            url: backend.example+"/api/password/BCryptCheck",
                            callback: function (code, message, response) {
                                if (response.data==true) {
                                    me.$message({message: '校验成功', type: 'success'});
                                    me.result='校验成功';
                                    me.show=true;
                                }else{
                                    me.$message({message: '校验失败', type: 'error'});
                                    me.result='校验失败';
                                    me.show=true;
                                }
                                me.show4= true;
                            }
                        });
                    } else {
                        this.$message({message: '左侧输入框值不能为空', type: 'warning'});
                        return false;
                    }
                }
            }
        });
    };

    //消息处理
    exports.onmessage = function (type, message) {

    };

    //page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});