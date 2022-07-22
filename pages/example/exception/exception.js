
define(function (require, exports) {
    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        var vm =  yufp.custom.vue({
            el: "#exceptionDemo",
            data: function(){
            	var em=this;
                return {
                   
                }
            },
            methods: {
                generateException:function(){//删除
                    var me=this;
                    yufp.service.request({
                            method: 'post',
                            url: backend.example+"/api/exceptiondemo/exception",
                            callback: function (code, message, response) {

                            }
                    });
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