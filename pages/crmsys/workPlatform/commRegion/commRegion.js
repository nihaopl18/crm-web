/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2019-2-23 08:33:38.
 * @updated by
 * @description 交流区
 */
yufp.require.require('libs/tinymce/tinymce.min.js');
define([
    './custom/widgets/js/YufpMgrSelector.js',
    './custom/widgets/js/ElTinymceX.js'
], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS');
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    custManagerParams: { // 客户经理 放大镜 参数
                        user: {
                            checkbox: false // 是否支持多选
                        }
                    },
                    curLoginCode: yufp.session.user.loginCode, // 当前登录人id 用于显示 修改、删除 按钮
                    tinymceIdjl: 'tinymceEditor' + new Date().getTime(),
                    // 富文本编辑器附件URL
                    action: '/api/file/provider/richedituploadfile',
                    // 富文本编辑器文本
                    // content: '',
                    // 富文本操作附件ID传参
                    busNo: '',
                    rule: {
                        shareName: [
                            { required: true, message: '字段不能为空', trigger: 'blur' },
                            { max: 50, message: '最大长度不超过50个字符', trigger: 'blur' }
                        ],
                        infoShareContent: [
                            { required: true, message: '字段不能为空', trigger: 'blur' }
                        ],
                        replyContent: [
                            { required: true, message: '字段不能为空', trigger: 'blur' },
                            { max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
                        ]
                    },
                    infoShareContent: '',
                    replyShareContent: '',
                    dataUrl: backend.exchangeService + '/api/infoexchange/querylist',
                    curInfoData: {},
                    formdata: {},
                    replyList: [], // 评论列表数据
                    replyFormdata: {},
                    height: yufp.frame.size().height - 103,
                    formDisabled: false,
                    viewType: 'ADD',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    dialogVisible: false,
                    // 评论功能属性
                    curReplyIndex: -1, // 当前评论面板展示索引
                    curReplyContent: '', // 当前评论内容
                    // 评论分页组件属性
                    currentPage: 1, // 当前评论展示页数
                    pageSizes: [5, 10, 30, 50],
                    pageSize: 5, // 展示评论条数
                    pageTotalSize: 0, // 评论总条数
                    // 回复功能属性
                    showReplyBtnHide: false,
                    subReplyList: [], // 回复列表数据
                    curSubIndex: -1, // 回复列表展示索引
                    curSubReplyIndex: -1, // 回复列表-回复面板展示索引
                    curSubReplyContent: '',
                    buttontj: true
                };
            },
            mounted: function() {
                this.$refs.tinymce.$refs.tinymce.hasChange = false;
                this.$refs.tinymce.$refs.tinymce.init();
            },
            watch: {
                infoShareContent: function(newVal, oldVal) {
                    if (newVal.indexOf('blob:http') > 0) {
                        this.buttontj = false;
                        setTimeout(function() {
                            this.buttontj = true;
                            $('#themeName :text').eq(0).focus();
                        }, 8000);
                    } else {
                        this.buttontj = true;
                    }
                }
            },
            methods: {
                // 清空obj对象 -- common
                clearObj: function(obj) {
                    if (!obj) {
                        return;
                    }
                    for (var key in obj) {
                        obj[key] = null;
                    }
                    return obj;
                },
                /**
                 * 交流主题 保存
                 */
                saveFn: function() {
                    var _this = this;
                    var model = {};
                    _this.formdata.shareContent = _this.infoShareContent;
                    yufp.clone(_this.formdata, model);
                    var validate = false;
                    _this.$refs.refForm.validate(function(valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    if (!model.shareId) {
                        // 生成 创建人id 创建人名称 机构id 机构名称
                        model.createUserId = yufp.session.user.loginCode;
                        model.createUserName = yufp.session.userName;
                        model.createOrgId = yufp.session.org.code;
                        model.createOrgName = yufp.session.org.name;
                        // 新增请求
                        yufp.service.request({
                            method: 'POST',
                            url: backend.exchangeService + '/api/infoexchange/add',
                            data: model,
                            callback: function(code, message, response) {
                                if (code == 0 && response.data == 1) {
                                    _this.resetFn();
                                    _this.$refs.refTable.remoteData();
                                    _this.$message('操作成功');
                                    yufp.util.butLogInfo(hashCode, '交流区', '保存主题');
                                }
                            }
                        });
                    } else {
                        // 修改请求
                        yufp.service.request({
                            method: 'POST',
                            url: backend.exchangeService + '/api/infoexchange/update',
                            data: model,
                            callback: function(code, message, response) {
                                if (code == 0 && response.data == 1) {
                                    _this.resetFn();
                                    _this.$refs.refTable.remoteData();
                                    _this.$message('操作成功');
                                    yufp.util.butLogInfo(hashCode, '交流区', '修改交流主题');
                                }
                            }
                        });
                    }

                },
                /**
                 * 交流主题 重置
                 */
                resetFn: function() {
                    this.infoShareContent = '';
                    window.tinymce.get(this.tinymceIdjl).setContent(this.infoShareContent);
                    this.clearObj(this.formdata);
                },
                /**
                 * 评论/回复 保存
                 */
                replySaveFn: function(index) {
                    var _this = this;
                    var model = {};
                    if (index == -1) { // 新增评论数据
                        yufp.clone(_this.replyFormdata, model);
                        var validate = false;
                        _this.$refs.replyForm.validate(function(valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            return;
                        }
                        if (!model.replyId) {
                            // 生成 回复主题id 回复人id 回复人名称 机构id 机构名称
                            model.shareId = _this.curInfoData.shareId;
                            model.createUserId = yufp.session.user.loginCode;
                            model.createUserName = yufp.session.userName;
                            model.createOrgId = yufp.session.org.code;
                            model.createOrgName = yufp.session.org.name;
                            // 新增请求
                            yufp.service.request({
                                method: 'POST',
                                url: backend.exchangeService + '/api/infoexchange/addreply',
                                data: model,
                                callback: function(code, message, response) {
                                    if (code == 0 && response.data == 1) {
                                        _this.resetReplyFn();
                                        _this.$message('操作成功');
                                        _this.$nextTick(function() {
                                            _this.refreshReplyList(_this.curInfoData.shareId);
                                        });
                                        _this.$refs.refTable.remoteData();
                                        yufp.util.butLogInfo(hashCode, '交流区', '新增回复数据');
                                    }
                                }
                            });
                        }
                    } else { // 新增回复数据
                        model.replyContent = _this.curReplyContent;
                        // 生成 上一级回复主键id 上一级回复人名称
                        model.upReplyId = _this.replyList[index].replyId;
                        model.upCreateUserName = _this.replyList[index].createUserName;
                        // 生成 回复主题id 回复人id 回复人名称 机构id 机构名称
                        model.shareId = _this.curInfoData.shareId;
                        model.createUserId = yufp.session.user.loginCode;
                        model.createUserName = yufp.session.userName;
                        model.createOrgId = yufp.session.org.code;
                        model.createOrgName = yufp.session.org.name;
                        // 新增请求
                        yufp.service.request({
                            method: 'POST',
                            url: backend.exchangeService + '/api/infoexchange/addreply',
                            data: model,
                            callback: function(code, message, response) {
                                if (code == 0 && response.data == 1) {
                                    _this.cancelReplyFn();
                                    _this.$message('操作成功');
                                    _this.$nextTick(function() {
                                        _this.refreshReplyList(_this.curInfoData.shareId);
                                    });
                                    _this.$refs.refTable.remoteData();
                                    yufp.util.butLogInfo(hashCode, '交流区', '新增回复数据');
                                }
                            }
                        });
                    }
                },
                /**
                 * 回复 表单重置
                 */
                resetReplyFn: function() {
                    this.replyShareContent = '';
                    this.clearObj(this.replyFormdata);
                },
                /**
                 * 展示交流详情dialog
                 */
                showInfo: function(data) {
                    var str1 = data.shareContent;
                    if (str1.indexOf("access_token=") != -1) {
                        var newtoken = yufp.service.getToken();
                        str = str1.substring(str1.indexOf("access_token=") + 13);
                        str = str.substring(0, str.indexOf("\""));
                        var str2 = str1.replace(str, newtoken);
                        data.shareContent = str2;
                    }
                    var _this = this;
                    yufp.clone(data, _this.curInfoData);
                    // _this.dialogVisible = true;
                    // TODO 初始化 分页、评论、回复 参数数据
                    _this.currentPage = 1;
                    _this.pageSize = 5;
                    _this.curReplyIndex = -1;
                    _this.curReplyContent = '';
                    _this.showReplyBtnHide = false;
                    _this.curSubIndex = -1;
                    _this.curSubReplyIndex = -1;
                    _this.curSubReplyContent = '';
                    _this.refreshReplyList(_this.curInfoData.shareId);
                },
                /**
                 * 刷新 评论列表
                 * shareId: 主题编号
                 */
                refreshReplyList: function(shareId) {
                    if (shareId) {
                        var _this = this;
                        yufp.service.request({
                            method: 'GET',
                            url: backend.exchangeService + '/api/infoexchange/queryreply',
                            data: {
                                shareId: shareId,
                                currentPage: _this.currentPage,
                                pageSize: _this.pageSize
                            },
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    _this.dialogVisible = true;
                                    if (response.data.length > 0) {
                                        _this.replyList = response.data;
                                        yufp.service.request({
                                            method: 'GET',
                                            url: backend.exchangeService + '/api/infoexchange/queryReplyCount',
                                            data: {
                                                shareId: shareId
                                            },
                                            callback: function(code, message, response) {
                                                if (code == 0) {
                                                    _this.pageTotalSize = response.data;
                                                }
                                            }
                                        });
                                    } else {
                                        _this.replyList = [];
                                        _this.pageTotalSize = _this.replyList.length;
                                    }
                                    _this.$nextTick(function() {
                                        _this.$refs.replyForm.resetFields();
                                    });
                                    // setTimeout(function () {
                                    //   _this.$refs.replyTinymce.$refs.replyTinymce.hasChange = false;
                                    //   _this.$refs.replyTinymce.$refs.replyTinymce.init();
                                    // }, 0);
                                    // _this.$nextTick(function () {
                                    //   _this.$refs.replyTinymce.$refs.replyTinymce.hasChange = false;
                                    //   _this.$refs.replyTinymce.$refs.replyTinymce.init();
                                    // });
                                }
                            }
                        });
                    }
                },
                modifyInfo: function(data) {
                    var str1 = data.shareContent;
                    this.infoShareContent = data.shareContent == null ? '' : data.shareContent;
                    var newtoken = yufp.service.getToken();
                    if (str1.indexOf("access_token=") != -1) {
                        str = str1.substring(str1.indexOf("access_token=") + 13);
                        str = str.substring(0, str.indexOf("\""));
                        var str2 = str1.replace(str, newtoken);

                        this.infoShareContent = data.shareContent == null ? '' : str2;
                    }
                    this.formdata.shareId = data.shareId;
                    this.formdata.shareName = data.shareName;
                    window.tinymce.get(this.tinymceIdjl).setContent(this.infoShareContent);
                    // yufp.clone(data, this.formdata);
                },
                deleteInfo: function(data) {
                    var _this = this;
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.exchangeService + '/api/infoexchange/delete',
                                    data: data.shareId,
                                    callback: function(code, message, response) {
                                        if (code == 0 && response.data == 1) {
                                            _this.$refs.refTable.remoteData();
                                            _this.$message('操作成功');
                                            yufp.util.butLogInfo(hashCode, '交流区', '删除数据');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 回复列表 展示数量 触发函数
                 */
                handleSizeChange: function(val) {
                    this.pageSize = val;
                    this.refreshReplyList(this.curInfoData.shareId);
                },
                /**
                 * 回复列表 展示页数 触发函数
                 */
                handleCurrentChange: function(val) {
                    this.currentPage = val;
                    this.refreshReplyList(this.curInfoData.shareId);
                },
                /**
                 * 点击回复功能按钮，展示回复功能面板
                 */
                replyBtn: function(index) {
                    this.curReplyIndex = index;
                    this.curReplyContent = '@' + this.replyList[index].createUserName + '：';
                },
                /**
                 * 点击回复功能面板-取消按钮，隐藏回复功能面板
                 */
                cancelReplyFn: function() {
                    this.curReplyIndex = -1;
                    this.curReplyContent = '';
                },
                /**
                 * 点击查看回复按钮，展示回复信息列表面板
                 */
                showReplyBtn: function(index) {
                    var _this = this;
                    // TODO 查询某条评论的回复数据
                    yufp.service.request({
                        method: 'GET',
                        url: backend.exchangeService + '/api/infoexchange/querysubreply',
                        data: {
                            replyId: _this.replyList[index].replyId
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.subReplyList = response.data;
                                _this.$nextTick(function() {
                                    this.curSubIndex = index;
                                    this.showReplyBtnHide = true;
                                });
                            }
                        }
                    });
                },
                /**
                 * 点击收起回复按钮，隐藏回复信息列表面板
                 */
                hideReplyBtn: function() {
                    this.curSubIndex = -1;
                    this.showReplyBtnHide = false;
                },
                /**
                 * 点击回复列表-回复按钮，展示回复功能面板
                 */
                subReplyBtn: function(subIndex) {
                    this.curSubReplyIndex = subIndex;
                    this.curSubReplyContent = '@' + this.subReplyList[subIndex].createUserName + '：';
                },
                /**
                 * 点击回复列表-回复功能-回复按钮，保存回复数据
                 */
                subReplySaveFn: function(subIndex) {
                    var _this = this;
                    var model = {};
                    model.replyContent = _this.curSubReplyContent;
                    // 生成 上一级回复主键id 上一级回复人名称
                    model.upReplyId = _this.subReplyList[subIndex].replyId;
                    model.upCreateUserName = _this.subReplyList[subIndex].createUserName;
                    // 生成 回复主题id 回复人id 回复人名称 机构id 机构名称
                    model.shareId = _this.curInfoData.shareId;
                    model.createUserId = yufp.session.user.loginCode;
                    model.createUserName = yufp.session.userName;
                    model.createOrgId = yufp.session.org.code;
                    model.createOrgName = yufp.session.org.name;
                    // 新增请求
                    yufp.service.request({
                        method: 'POST',
                        url: backend.exchangeService + '/api/infoexchange/addreply',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == 0 && response.data == 1) {
                                _this.cancelSubReplyFn();
                                _this.$nextTick(function() {
                                    _this.showReplyBtn(_this.curSubIndex);
                                });
                                _this.$refs.refTable.remoteData();
                                yufp.util.butLogInfo(hashCode, '交流区', '新增回复数据');
                            }
                        }
                    });
                },
                /**
                 * 点击回复列表-回复功能-取消按钮，隐藏当前展示的回复功能面板
                 */
                cancelSubReplyFn: function() {
                    this.curSubReplyIndex = -1;
                    this.curSubReplyContent = '';
                }
            }
        });
    };
});