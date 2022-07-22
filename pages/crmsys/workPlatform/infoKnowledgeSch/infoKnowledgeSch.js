/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2019-1-23 10:06:51.
 * @updated by
 * @description 知识库检索
 */
define([
    './custom/widgets/js/yufpOrgTree.js',
    './custom/widgets/js/YufpMgrSelector.js',
    './custom/widgets/js/yufpUploadTable.js'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,CD0337,PUBLIC_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    scopeOptions: [{
                        key: '1',
                        value: '全部'
                    }, {
                        key: '2',
                        value: '标题'
                    }, {
                        key: '3',
                        value: '内容'
                    }],
                    treeParams: {
                        placeholder: '所属栏目',
                        dataUrl: backend.knowledgebaseService + '/api/infoknowledge/querysection',
                        dataId: 'sectionId',
                        dataLabel: 'sectionName',
                        dataPid: 'parentSection'
                    },
                    custManagerParams: { // 客户经理 放大镜 参数
                        user: {
                            checkbox: false // 是否支持多选
                        }
                    },
                    dataUrl: backend.knowledgebaseService + '/api/infoknowledge/querylist',
                    formdata: {},
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: ''
                        })
                    },
                    fileUpLoadBusNo: {},
                    searchScrope: true,
                    publishSearch: true
                };
            },
            mounted: function() {
                var roles = yufp.session.roles;
                var selectRole = yufp.sessionStorage.get('selectRole');
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i].id === selectRole) {
                        if (roles[i].code == 'R018' || roles[i].code == 'R019') {
                            this.searchScrope = false;
                        }
                        if (roles[i].code == 'R001' || roles[i].code == 'R006' || roles[i].code == 'R007' || roles[i].code == 'R008' || roles[i].code == 'R009' || roles[i].code == 'R010' || roles[i].code == 'R020' || roles[i].code == 'R021' || roles[i].code == 'R022') {
                            this.publishSearch = false;
                        }
                    }
                }
            },
            methods: {
                /**
                 * 取消
                 */
                cancelFn: function() {
                    var _this = this;
                    _this.dialogVisible = false;
                },
                /**
                 * 控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function(viewType, editable) {
                    var _this = this;
                    _this.viewType = viewType;
                    _this.dialogVisible = true;
                    _this.formDisabled = !editable;
                },
                /**
                 * 详情
                 */
                infoFn: function() {
                    var _this = this;
                    if (_this.$refs.refTable.selections.length != 1) {
                        _this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _this.fileBtnVisible = false;
                    _this.switchStatus('DETAIL', false);
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        var obj = _this.$refs.refTable.selections[0];
                        _this.messageId = obj.messageId;
                        _this.fileTableQuery(obj);
                        yufp.clone(obj, _this.formdata);
                    });
                },
                rowDblClick: function(row, event) {
                    var _this = this;
                    _this.fileBtnVisible = false;
                    _this.switchStatus('DETAIL', false);
                    _this.$nextTick(function() {
                        _this.$refs.refForm.resetFields();
                        var obj = row;
                        _this.messageId = obj.messageId;
                        _this.fileTableQuery(obj);
                        yufp.clone(obj, _this.formdata);
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
                }
            }
        });
    };
});