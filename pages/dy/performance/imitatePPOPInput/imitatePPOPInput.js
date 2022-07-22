/**
 * @created by 冉珣 on 2021-11-1 10:01:54
 * @updated by
 * @description 模拟PPOP录入
 */
define(function(require, exports) {
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
                return {
                    baseUrl: '/api/acrmfcmcustmgrperf',
                    dataUrl: '/api/acrmfcmcustmgrperf/uploadlist',
                    baseParams: {},
                    // 初始化附件列表查询时，传入为空
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: ''
                        })
                    },
                    headers: {
                        'Authorization': 'Bearer ' + yufp.service.getToken()
                    },
                    uploadData: {
                        busNo: ''
                    },
                    uploadAction: backend.fileService + '/api/file/provider/uploadfile',
                    downloadUrl: backend.fileService + '/api/file/provider/download?fileId='
                };
            },
            computed: {
                actionUrl: function() {
                    var me = this;
                    return yufp.service.getUrl({ url: me.uploadAction });
                }
            },
            methods: {
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
                onChange: function(file, fileList) {
                    this.uploadData.busNo = this.uuid(16, 16);
                    // 添加文件时，把文件名称单独列出来
                    this.uploadData.fileName = encodeURI(file.name);
                },
                onSuccess: function(file) {
                    var data = file.data;
                    var _this = this;
                    yufp.service.request({
                        method: 'POST',
                        url: _this.baseUrl + '/uploadtriumph',
                        data: data,
                        callback: function(code, message, response) {
                            if (code = 0) {
                                _this.queryFn();
                                _this.$message({
                                    type: 'success',
                                    message: response.message
                                });
                                yufp.util.butLogInfo(hashCode, '模拟PPOP录入', '上传Excel');
                            }
                            if (code = -1) {
                                _this.$message({
                                    type: 'error',
                                    message: response.message
                                });
                            }
                        }
                    });
                },
                queryFn: function() {
                    this.$refs.fileListTable.remoteData();
                },
                downloadFn: function(fileAddress) {
                    yufp.util.download(this.downloadUrl + fileAddress);
                    yufp.util.butLogInfo(hashCode, '模拟PPOP录入', '下载');
                },
                deleteFn: function(fileAddress) {
                    var _this = this;
                    yufp.service.request({
                        url: backend.fileService + '/api/file/provider/deleteFile',
                        method: 'GET',
                        data: {
                            fileId: fileAddress
                        },
                        callback: function(code, message, res) {
                            if (code == 0) {
                                _this.$message.success('删除成功!', '提示');
                                _this.queryFn();
                                yufp.util.butLogInfo(hashCode, '模拟PPOP录入', '删除');
                            }
                        }
                    });
                },
                uuid: function(len, radix) {
                    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                    var uuid = [],
                        i;
                    radix = radix || chars.length;

                    if (len) {
                        // Compact form
                        for (i = 0; i < len; i++) {
                            uuid[i] = chars[0 | Math.random() * radix];
                        }
                    } else {
                        // rfc4122, version 4 form
                        var r;

                        // rfc4122 requires these characters
                        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                        uuid[14] = '4';

                        // Fill in random data.  At i==19 set the high bits of clock sequence as
                        // per rfc4122, sec. 4.1.5
                        for (i = 0; i < 36; i++) {
                            if (!uuid[i]) {
                                r = 0 | Math.random() * 16;
                                uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
                            }
                        }
                    }

                    return uuid.join('');
                }
            }
        });
    };

    /**
     * 页面传递消息处理
     * @param type 消息类型
     * @param message 消息内容
     */
    exports.onmessage = function(type, message) {};

    /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
    exports.destroy = function(id, cite) {};
});