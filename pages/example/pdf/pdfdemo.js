define(function(require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function(hashCode, data, cite) {
        var vm = yufp.custom.vue({
            el : cite.el,
            data : {
                pdfShow : false
            },
            methods : {
                doShowHtml : function() {
                    var showUrl = yufp.service.getUrl({
                        url : backend.example + "/api/pdfdemo/gethtml"
                    });
                    showUrl = yufp.util.addTokenInfo(showUrl);
                    this.pdfShow = true;
                    this.$nextTick(function() {
                        $('#pdfDemoShowIframe').attr("src", showUrl);
                    })
                },
                doShow : function() {
                    var showUrl = yufp.service.getUrl({
                        url : backend.example + "/api/pdfdemo/getpdf?online=1"
                    });
                    showUrl = yufp.util.addTokenInfo(showUrl);
                    this.pdfShow = true;
                    this.$nextTick(function() {
                        $('#pdfDemoShowIframe').attr("src", showUrl);
                    })
                },
                doDownload : function() {
                    yufp.util.download(backend.example + "/api/pdfdemo/getpdf");
                }
            }
        });
    };

    // 消息处理
    exports.onmessage = function(type, message) {

    };

    // page销毁时触发destroy方法
    exports.destroy = function(id, cite) {

    }

});