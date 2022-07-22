
define(function (require, exports) {

    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        var taskId = 0;
        var vm =  yufp.custom.vue({
            el: "#el_table_excel_demo",
            data: function(){
                return {
                    upLoadData:{
                        access_token:yufp.service.getToken()
                    },
                    percentage:0,
                    excelDemoGrid:{
                        /*query: {
                            orgId: '',
                            roleCode: '',
                            roleName: ''
                        },*/
                        height: yufp.custom.viewSize().height - 162,
                        currentRow: null,
                        checkbox: false,
                        dataUrl: backend.example+'/api/excel/queryList',
                        dataParams: {},
                        tableColumns: [
                            { label: 'ID', prop: 'bookId', width: 150,resizable: true},
                            { label: '标题', prop: 'title', width: 140,  resizable: true},
                            { label: '作者（字典项）', prop: 'author',resizable: true },
                            { label: '日期（格式化yyyy-MM-dd）', prop: 'publishTime',resizable: true },
                            { label: '售价（保留两位小数）', prop: 'price',resizable: true }
                        ]
                    },
                    dialogFormVisible: false,
                    fetchSizeFields: [{
                        columnCount: 1,
                        fields: [
                            { field: 'fetchSize', label: '导出条数', type:'input', placeholder: '不设置则全部导出'}
                        ]
                    }]
                }
            },
            methods: {
                uploadUrl:function(){
                    var url = yufp.service.getUrl({
                        url : '/zuul'+backend.example + "/api/excel/import"
                    });
                    return yufp.util.addTokenInfo(url);
                },
                handleRemove: function(file, fileList){
                    this.$message('文件移除成功');
                },
                handleUploadSuccess:function(response, file, fileList){// 上传成功
                    taskId = response.taskId;
                    if(taskId != "failure"){
                        vm.queryInfoFn();
                    }
                },
                realExportFn: function(){// 实际导出操作
                    this.dialogFormVisible = false;
                    this.percentage=0;
                    var fetchSize = this.$refs.ExportForm.formModel.fetchSize;
                    var exportUrl = backend.example+'/api/excel/export';
                    if(fetchSize != "" && fetchSize > 0){
                        exportUrl += '?fetchSize='+fetchSize;
                    }
                    yufp.service.request({
                        needToken: true,
                        url: exportUrl,
                        method: 'GET',
                        callback: function (code, message, response) {
                            taskId = response.taskId;
                            vm.queryInfoFn();
                        }
                    });
                },
                exportFn: function(){// 导出操作
                    this.dialogFormVisible = true;
                },
                exportTemplateFn: function(){// 导出模板操作
                    var url = yufp.settings.ssl ? 'https://' : 'http://';
                    url += yufp.settings.url;
                    url += backend.example;
                    url += "/api/excel/exportTemplate";//?fileName=abc.xlsx
                    window.open(yufp.util.addTokenInfo(url));
                },
                importFn: function(){// 导入操作
                    this.percentage=0;
                    gg  =  this.$refs.upload;
                    this.$refs.upload.submit();
                },
                queryInfoFn: function() {// 循环查询进度
                    var pageObj = this;
                    if (taskId != 0 && taskId != "" && taskId != undefined) {
                        yufp.service.request({
                            needToken: true,
                            url: backend.example + '/api/excel/queryInfo?taskId=' + taskId,
                            method: 'GET',
                            callback: function (code, message, response) {
                                var obj = response;
                                if (null == obj || obj == "failure" || obj.percent == "-1"){
                                    pageObj.percentage=0;
                                    pageObj.$message({message: '操作失败，请检查后重试！', type: 'error'});
                                } else {
                                    pageObj.percentage=obj.percent;
                                    if (obj.percent != 100) {
                                        // 操作没有结束，继续查询
                                        window.setTimeout(vm.queryInfoFn, 2000);
                                    } else {
                                        pageObj.$message({message: '操作成功！', type: 'success'});
                                        // 操作成功，下载或者刷新表格
                                        if (obj.taskType == "export") {
                                            // 导出，下载文件
                                            var url = yufp.settings.ssl ? 'https://' : 'http://';
                                            url += yufp.settings.url;
                                            url += backend.example;
                                            url += "/api/excel/download?taskId=" + taskId;
                                            window.open(yufp.util.addTokenInfo(url));
                                        } else if (obj.taskType == "import") {
                                            // 导入，刷新表格
                                            pageObj.$refs.excelDemo.remoteData();
                                        }
                                    }
                                }
                            }
                        });
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