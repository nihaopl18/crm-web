/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2019-1-22 16:03:04.
 * @updated by
 * @description 知识库发布
 */
define([
    './custom/widgets/js/yufpOrgTree.js',
    './custom/widgets/js/yufpUploadTable.js',
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,CD0337,IS_DRAFT');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    bizSeqNo: data.bizSeqNo, // 流程id
                    formdata: {},
                    fileUpLoadBusNo: {},
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: ''
                        })
                    },
                    treeParams: {
                        placeholder: '所属栏目',
                        dataUrl: backend.knowledgebaseService + '/api/infoknowledge/querysection',
                        dataId: 'sectionId',
                        dataLabel: 'sectionName',
                        dataPid: 'parentSection'
                    },
                    searchScrope: true


                };
            },
            methods: {
                infoFn: function() {
                    var _this = this;
                    yufp.service.request({
                        method: 'get',
                        url: '/api/infoknowledge/querybyid',
                        data: {
                            bizSeqNo: _this.bizSeqNo
                        },
                        async: false,
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.$nextTick(function() {
                                    _this.$refs.refForm.resetFields();
                                    var obj = response.data;
                                    _this.messageId = obj.messageId;
                                    _this.fileTableQuery(obj);
                                    yufp.clone(obj, _this.formdata);
                                });
                            }
                        }
                    });

                },
                /**
                 * 附件列表查询
                 */
                fileTableQuery: function(obj) {
                    var _this = this;
                    var messageIdTemp = obj != null && obj.messageId != null ? obj.messageId : '';
                    _this.fileUpLoadBusNo = { busNo: messageIdTemp };
                    // 初始化附件列表查询时，传入为空
                    var tempParams = {
                        condition: JSON.stringify({
                            busNo: messageIdTemp
                        })
                    };
                    yufp.extend(_this.initFilesParams, tempParams);
                    // 获取附件列表
                    _this.$refs.fileTable.queryFn();
                },
            },
            mounted: function() {
                var _this = this;
                var roles = yufp.session.roles;
                var selectRole = yufp.sessionStorage.get('selectRole');
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i].id === selectRole) {
                        if (roles[i].code == 'R018' || roles[i].code == 'R019') {
                            this.searchScrope = false;
                        }
                    }
                }
                _this.infoFn();
            }
        });
    };
});