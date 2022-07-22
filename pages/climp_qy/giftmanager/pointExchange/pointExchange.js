/**
 * @Created by  yangxiao2 on 2019-7-19 16:24:32.
 * @updated by
 * @description 礼品管理
 */
define([
    'pages/climp_qy/giftmanager/pointExchange/pointExchange.css',
    'custom/widgets/js/yufpMerchantSelector.js',
    'custom/widgets/js/yufpInstuOrgTree.js',
    'custom/widgets/js/YufpWfInit.js'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('UP_DOWN_STATE,COMMODITY_TYPE,PUBLISH_STATUS,COMMODITY_TYPE,UP_DOWN_STATE,WF_APP_STATUS,USE_FLAG,PICTURE_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    sysmineInfo: [
                        { name: '11', url: '111111' },
                        { name: '12', url: '222222' },
                        { name: '13', url: '333333' },
                        { name: '14', url: '444444' },
                        { name: '15', url: '555555' },
                    ],
                    formDisabled: true,
                    formdata: {},
                    tableUrl: '/api/acrmfpdprodinfo/productcustfitinfoquery',
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: data.prodCode
                        })
                    },
                    reportUpLoadBusNo: { busNo: data.prodCode },
                    uploadVisible: true,
                    pic: false

                };
            },
            mounted: function() {

            },
            methods: {
                picfn: function() {
                    this.pic = !this.pic;
                },
                fileIdToURL: function(fileId) {
                    var url = yufp.settings.ssl ? 'https://' : 'http://';
                    url += yufp.settings.url;
                    url += backend.fileService;
                    url += '/api/file/provider/download?fileId=' + fileId;
                    return yufp.util.addTokenInfo(url);
                },
                /**
                 * 附件上传->检查上传文件大小和类型
                 */
                beforeAvatarUpload: function(file) {
                    var isLt10M = file.size / 1024 / 1024 < 50;
                    if (!isLt10M) {
                        this.$message.error('上传文件大小不能超过 50MB!');
                    }
                    var index = file.name.lastIndexOf('.');
                    var ext = file.name.substr(index + 1);
                    var fileType = ['image/jpeg', 'image/gif', 'image/png', 'image/bmp', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/x-rar', 'application/x-zip-compressed', 'application/java-archive', 'image/gif', 'image/bmp', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/x-tar', 'application/octet-stream', 'application/x-rar-compressed'];
                    var count = 0;
                    var fileCheck = true;
                    for (var i in fileType) {
                        if (file.type == fileType[i] || ext == 'rar') {
                            count++;
                        }
                    }
                    if (count == 0) {
                        fileCheck = false;
                        this.$message.error('上传文件应为图片、文本、表格、压缩包格式！');
                    }
                    return fileCheck && isLt10M;
                },
            }
        });
    };
});