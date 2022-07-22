/**
 * Created by liaoxd on 2017/12/17.
 */
yufp.require.require('libs/tinymce/tinymce.min.js');
define([
    './custom/widgets/js/ElTinymceX.js',
    './custom/widgets/js/yufpOrgTree.js',
    './custom/widgets/js/yufpUploadTable.js',
    './custom/widgets/js/yufpExtTree.js',
    './custom/plugins/yufp.watermark.js'
], function(require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('PUB_STS,TOP_FLAG,NOTICE_LEVEL');
        // 创建virtual Notice model
        var vm = yufp.custom.vue({
            // TODO 请替换此id属性
            el: '#notice_grid',
            // 以m_开头的属性为UI数据不作为业务数据，否则为业务数据
            data: function() {
                var me = this;
                return {
                    addButton: !yufp.session.checkCtrl('add'),
                    updButton: !yufp.session.checkCtrl('upd'),
                    delButton: !yufp.session.checkCtrl('del'),
                    viewButton: !yufp.session.checkCtrl('view'),
                    pubButton: !yufp.session.checkCtrl('pub'),
                    readButton: !yufp.session.checkCtrl('read'),
                    a: '',
                    // 公告查询URL
                    serviceUrl: backend.noticeService + '/api/adminsmnotice/',
                    // 角色列表URL
                    contrUrl: backend.appOcaService + '/api/provider/findrolelist',
                    // contrUrl:backend.noticeService+'/api/adminsmnotice/roles',
                    reciveOptions: [{ 'key': 'org', 'value': '机构' }, { 'key': 'role', 'value': '角色' }],
                    idView: false,
                    tinymceId: 'tinymceEditor',
                    // 限制不可选择之前日期
                    datePick: {
                        disabledDate: function(time) {
                            return time.getTime() < Date.now() - 8.64e7;
                        }
                    },
                    // 生成的公告ID
                    createdNoticeId: '',

                    // 富文本编辑器附件URL
                    action: '/api/file/provider/richedituploadfile',
                    // 富文本编辑器文本
                    content: '',
                    tinymceDisabled: false,
                    // 富文本操作附件ID传参
                    busNo: '',
                    height: yufp.custom.viewSize().height - 140,
                    userId: yufp.session.userId,
                    userName: yufp.session.userName,
                    orgId: yufp.session.org.id,
                    orgName: yufp.session.org.name,
                    creatorFlag: true, // 登录者是否本人
                    buttonEnable: false, // 是否可以修改、删除
                    // 机构树多选参数
                    orgTreeParams: {
                        needCheckbox: true
                    },
                    // 附件列表按钮
                    uploadVisible: true,
                    downloadVisible: true,
                    deleteVisible: true,

                    // 弹出窗保存按钮
                    createButton: false,
                    updateButton: false,

                    // 初始化查询时，传入接收对象
                    initTableParams: {
                        condition: JSON.stringify({
                            reciveOgjId: yufp.session.org.id,
                            creatorId: yufp.session.userId,
                            userId: yufp.session.userId,
                            roles: yufp.session.roles
                        })
                    },
                    // 初始化角色列表
                    initRolesTableParams: {
                        condition: JSON.stringify({
                            orgIds: ''
                        })

                    },

                    // 初始化附件列表查询时，传入为空
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: ''
                        })
                    },

                    noticeUpLoadBusNo: {},

                    queryFields: [
                        { placeholder: '公告标题', field: 'noticeTitle', type: 'input', clearable: true },
                        {
                            placeholder: '有效期开始时间',
                            field: 'beginTime',
                            type: 'date',
                            pickerOptions: {
                                disabledDate: function(time) {
                                    if (me.$children['0'].$refs.endTime['0'].value) {
                                        return time.getTime() > me.$children['0'].$refs.endTime['0'].value;
                                    }
                                }
                            }
                        },
                        {
                            placeholder: '有效期结束时间',
                            field: 'endTime',
                            type: 'date',
                            pickerOptions: {
                                disabledDate: function(time) {
                                    if (me.$children['0'].$refs.beginTime['0'].value) {
                                        return time.getTime() < me.$children['0'].$refs.beginTime['0'].value;
                                    }
                                }

                            }
                        }
                    ],
                    queryButtons: [{
                            label: '搜索',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            click: function(model, valid) {
                                if (valid) {
                                    var initParam = {
                                        reciveOgjId: yufp.session.org.id,
                                        creatorId: yufp.session.userId,
                                        userId: yufp.session.userId,
                                        roles: yufp.session.roles
                                    };
                                    yufp.extend(true, model, initParam);
                                    var param = { condition: JSON.stringify(model) };
                                    me.$refs.noticeTable.remoteData(param);
                                }
                            }
                        },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'el-icon-edit' }
                    ],

                    tableColumns: [
                        { label: '发布状态', prop: 'pubSts', width: 100, sortable: true, resizable: true, type: 'select', dataCode: 'PUB_STS' },
                        { label: '阅读标志', prop: 'readSts', width: 100, sortable: true },
                        { label: '公告标题', prop: 'noticeTitle', width: 200, sortable: true },
                        { label: '重要程度', prop: 'noticeLevel', width: 100, type: 'select', dataCode: 'NOTICE_LEVEL', sortable: true },
                        { label: '发布日期', prop: 'pubTime', width: 150, sortable: true },
                        { label: '发布机构', prop: 'pubOrgName', width: 160, sortable: true },
                        { label: '发布人', prop: 'pubUserName', width: 140, sortable: true },
                        { label: '置顶时间至', prop: 'topActiveDate', width: 164, sortable: true },
                        { label: '有效时间至', prop: 'activeDate', width: 160, sortable: true }
                    ],


                    updateFields: [{
                            columnCount: 1,
                            fields: [{
                                id: 'noticeTitleid',
                                field: 'noticeTitle',
                                label: '公告标题',
                                rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                            }]
                        },
                        {
                            columnCount: 2,
                            fields: [{
                                    field: 'noticeLevel',
                                    label: '重要程度',
                                    type: 'select',
                                    dataCode: 'NOTICE_LEVEL',
                                    value: 'N'
                                },
                                {
                                    field: 'activeDate',
                                    label: '有效时间',
                                    type: 'date',
                                    pickerOptions: 'datePick'
                                },
                                {
                                    field: 'isTop',
                                    label: '是否置顶',
                                    type: 'select',
                                    dataCode: 'TOP_FLAG',
                                    value: 'N',
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                                },
                                {
                                    field: 'topActiveDate',
                                    label: '置顶期至',
                                    type: 'date',
                                    pickerOptions: 'datePick'
                                },
                                {
                                    field: 'reciveOrgId',
                                    label: '接收机构',
                                    rules: [{ required: true, message: '必填项', trigger: 'blur' }],
                                    params: {
                                        dataId: 'orgId',
                                        needCheckbox: true,
                                        checkStrictly: false,
                                        dataParams: {}
                                    },
                                    type: 'custom',
                                    is: 'yufp-org-tree',
                                    readonly: false,
                                    hidden: false
                                },
                                {
                                    field: 'reciveRoleName',
                                    label: '角色',
                                    icon: 'search',
                                    click: function() {
                                        me.initRolesTableParams = {
                                            condition: JSON.stringify({
                                                orgIds: me.$refs.noticeForm.formModel.reciveOrgId
                                            })
                                        };
                                        me.roleDialogVisible = true;
                                    },
                                    hidden: true
                                },
                                {
                                    field: 'reciveRoleId',
                                    label: '角色ID',
                                    icon: 'search',
                                    click: function() {
                                        me.roleDialogVisible = true;
                                    },
                                    hidden: true
                                }
                            ]
                        }
                    ],
                    updateButtons: [{
                            label: '取消',
                            type: 'primary',
                            icon: 'yx-undo2',
                            hidden: false,
                            click: function(model) {
                                me.dialogVisible = false;
                                window.tinymce.get(me.tinymceId).destroy();
                            }
                        },
                        {
                            label: '保存',
                            type: 'primary',
                            icon: 'check',
                            op: 'submit',
                            hidden: true,
                            click: function(model, valid) {
                                me.$refs.noticeForm.$children[0].validate(function(validate) {
                                    if (validate) {
                                        me.createNotice();
                                    }
                                });
                            }
                        },
                        {
                            label: '保存',
                            type: 'primary',
                            icon: 'check',
                            hidden: true,
                            op: 'submit',
                            click: function(model, valid) {
                                if (valid) {
                                    me.dataNoticeEditFn();
                                }
                            }
                        },
                        {
                            label: '图片上传中',
                            type: 'primary',
                            icon: 'el-icon-yx-cloud-upload',
                            hidden: true,
                            op: 'submit',
                            click: function(model, valid) {

                            }
                        }

                    ],
                    // 角色选择列表
                    contrlTableColumns: [{
                            label: '角色代码',
                            prop: 'roleCode'
                        }, {
                            label: '角色名称',
                            prop: 'roleName'
                        }, {
                            label: '所属机构编号',
                            prop: 'orgId'
                        }, {
                            label: '所属机构名称',
                            prop: 'orgName'
                        }

                    ],

                    // 角色选择按钮
                    selectionButton: [{
                            label: '确认选择',
                            type: 'primary',
                            icon: 'check',
                            hidden: false,
                            click: function(model) {
                                var values = '';
                                var names = '';
                                me.tablePage = me.$refs.contrlTable.page;
                                if (me.$refs.contrlTable.selections.length > 0) {
                                    me.roleSelection = me.$refs.contrlTable.selections;
                                    me.pageChange();
                                }
                                if (me.roleAllSelect.length > 0) {
                                    for (var i = 0; i < me.roleAllSelect.length; i++) {
                                        if (i == 0) {
                                            values = me.roleAllSelect[i].row.roleId;
                                            names = me.roleAllSelect[i].row.roleName;
                                        } else {
                                            values = values + ',' + me.roleAllSelect[i].row.roleId;
                                            names = names + ',' + me.roleAllSelect[i].row.roleName;
                                        }
                                    }
                                }

                                me.$refs.noticeForm.formModel.reciveRoleId = values;
                                me.$refs.noticeForm.formModel.reciveRoleName = names;
                                me.roleDialogVisible = false;
                            }
                        },
                        {
                            label: '取消',
                            type: 'primary',
                            icon: 'yx-undo2',
                            hidden: false,
                            click: function(model) {
                                me.roleDialogVisible = false;
                            }
                        }
                    ],


                    // 表单是否显示
                    dialogVisible: false,
                    detaildialogVisible: false,
                    roleDialogVisible: false,
                    // 表单是否可用
                    formDisabled: true,
                    // 表单操作状态
                    viewType: 'DETAIL',

                    NoticeGrid: {
                        // 权限模板当前行
                        currentRow: null,
                        // 权限模板选择数组
                        selections: [],
                        data: null,
                        loading: true
                    },
                    roleSelection: [],
                    roleAllSelect: [],
                    tablePage: 0,
                    isNew: true
                };
            },
            mounted: function() {
                var me = this;

                yufp.lookup.bind('NOTICE_LEVEL', function(lookup) {
                    me.updateFields[1].fields[0].options = lookup;
                });
                yufp.lookup.bind('TOP_FLAG', function(lookup) {
                    me.updateFields[1].fields[2].options = lookup;
                });
            },
            methods: {
                startChangeFn: function(val) {
                    this.NoticeGrid.paging.page = val;
                    this.queryNoticeGridFn();
                },
                limitChangeFn: function(val) {
                    this.NoticeGrid.paging.page = 1;
                    this.NoticeGrid.paging.pageSize = val;
                    this.queryNoticeGridFn();
                },
                // 角色表格选中事件
                roleSelectFn: function(selection, row) {
                    this.tablePage = this.$refs.contrlTable.page;
                    this.roleSelection = selection;
                },
                // 角色表格全选事件
                roleAllFn: function(selection) {
                    this.tablePage = this.$refs.contrlTable.page;
                    this.roleSelection = selection;
                },
                // 角色表格翻页事件
                pageChange: function() {
                    var me = this;
                    if (me.roleAllSelect.length > 0) {
                        for (var i = 0; i < me.roleAllSelect.length; i++) {
                            if (me.roleAllSelect[i].page == this.tablePage) {
                                me.roleAllSelect.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    if (me.roleSelection.length > 0) {
                        for (var j = 0; j < me.roleSelection.length; j++) {
                            me.roleAllSelect.push({ page: me.tablePage, row: me.roleSelection[j] });
                        }
                    }
                    me.tablePage = 0;
                    me.roleSelection = [];
                },
                // 角色数据加载完成后勾选列表
                loadedFn: function(a, b) {
                    var me = this;
                    me.roleAllSelect.forEach(function(value, index, array) {
                        me.$refs.contrlTable.data.filter(function(item) {
                            if (item.roleId === array[index].row.roleId) {
                                me.$refs.contrlTable.toggleRowSelection(item, true);
                            }
                        });
                    });
                },
                rowClickFn: function(selection, row) {
                    // 用于单个修改
                    this.NoticeGrid.currentRow = row;
                    if (row.creatorId != yufp.session.userId) {
                        this.creatorFlag = false;
                        this.buttonEnable = true;
                    } else {
                        this.creatorFlag = true;
                        this.buttonEnable = false;
                    }
                },
                // 修改按钮
                noticetableEditFn: function() {
                    if (this.$refs.noticeTable.selections.length < 1) {
                        vm.$message({ message: '请选择一条记录修改!' });
                        return false;
                    }
                    if (this.$refs.noticeTable.selections.length > 1) {
                        vm.$message({ message: '只能选择一条记录修改!' });
                        return false;
                    }
                    if (this.$refs.noticeTable.selections[0].pubSts == 'O') {
                        vm.$message({ message: '不能修改已发布的公告!' });
                        return false;
                    }
                    this.viewType = 'UPDATE';
                    vm.dialogVisible = true;
                    this.roleAllSelect = [];
                    var noticeId = '';
                    yufp.service.request({
                        url: backend.noticeService + '/api/noticeext/noticeinfo/' + this.$refs.noticeTable.selections[0].noticeId,
                        method: 'get',
                        data: null,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                vm.$nextTick(function() {
                                    vm.$refs.noticeForm.resetFn();
                                    yufp.extend(vm.$refs.noticeForm.formModel, response.data);
                                    vm.$refs.tinymce.hasChange = false;
                                    vm.content = response.data.detailcontent;
                                    var str1 = response.data.detailcontent;
                                    if (str1.indexOf("access_token=") != -1) {
                                        var newtoken = yufp.service.getToken();
                                        str = str1.substring(str1.indexOf("access_token=") + 13);
                                        str = str.substring(0, str.indexOf("\""));
                                        var str2 = str1.replace(str, newtoken);
                                        vm.content = str2;
                                    }
                                    vm.$refs.tinymce.init();
                                    noticeId = response.data.noticeId;

                                    // 富文本附件操作传参
                                    vm.busNo = noticeId;

                                    // 初始化附件列表查询时，传入为空
                                    var files = {
                                        condition: JSON.stringify({
                                            busNo: noticeId
                                        })
                                    };
                                    yufp.extend(vm.initFilesParams, files);
                                    if (document.getElementsByClassName('el-upload-list el-upload-list--text')[0] != null && document.getElementsByClassName('el-upload-list el-upload-list--text')[0] != undefined) {
                                        document.getElementsByClassName('el-upload-list el-upload-list--text')[0].innerHTML = '';
                                    }
                                    // 获取附件列表
                                    vm.$refs.filesTable.queryFn(files);

                                    // 设置附件列表组件传入NOTICEID
                                    vm.noticeUpLoadBusNo = {
                                        busNo: response.data.noticeId
                                    };
                                });
                            } else {
                                vm.$message({ message: '获取详情失败!' });
                            }
                        }
                    });
                },

                // 角色展示
                tmplShow: function() {
                    this.$nextTick(function() {
                        this.$refs.contrlTable.remoteData();
                    });
                },

                rowDblclick: function(row, event) {
                    if (row.pubSts != 'O') {
                        vm.$message({ message: '无法查看未发布公告的详情!' });
                        return;
                    }
                    this.viewType = 'DETAIL';
                    vm.dialogVisible = true;
                    var noticeId = '';

                    yufp.service.request({
                        url: backend.noticeService + '/api/noticeext/noticeinfo/' + row.noticeId,
                        method: 'get',
                        data: null,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                vm.$nextTick(function() {
                                    vm.uploadVisible = false;
                                    vm.downloadVisible = true;
                                    vm.deleteVisible = false;
                                    vm.$refs.noticeForm.resetFn();
                                    yufp.extend(vm.$refs.noticeForm.formModel, response.data);
                                    vm.content = response.data.detailcontent;
                                    var str1 = response.data.detailcontent;
                                    if (str1.indexOf("access_token=") != -1) {
                                        var newtoken = yufp.service.getToken();
                                        str = str1.substring(str1.indexOf("access_token=") + 13);
                                        str = str.substring(0, str.indexOf("\""));
                                        var str2 = str1.replace(str, newtoken);
                                        vm.content = str2;
                                    }
                                    vm.$refs.tinymce.hasChange = false;
                                    vm.$refs.tinymce.init();
                                    noticeId = response.data.noticeId;
                                    // 初始化附件列表查询时，传入noticeId
                                    var files = {
                                        condition: JSON.stringify({
                                            busNo: noticeId
                                        })
                                    };
                                    yufp.extend(vm.initFilesParams, files);
                                    // 获取附件列表
                                    vm.$refs.filesTable.queryFn(files);

                                    // 设置附件列表组件传入NOTICEID
                                    vm.noticeUpLoadBusNo = {
                                        busNo: response.data.noticeId
                                    };
                                    // 标为已阅,并刷新公告列表
                                    vm.readFn2(row);
                                    // vm.$refs.noticeTable.remoteData();
                                    window.tinymce.get(vm.tinymceId).setMode('readonly');
                                });
                            } else {
                                vm.$message({ message: '获取详情失败!' });
                            }
                        }
                    });
                },
                readFn2: function(row) {
                    row.readUserId = this.userId;
                    var rows = [row];
                    yufp.service.request({
                        url: backend.noticeService + '/api/adminsmnotice/reads',
                        method: 'post',
                        data: JSON.stringify(rows),
                        callback: function(code, message, response) {
                            if (code == '0') {
                                // vm.$message({ message: '已阅!' });
                                // vm.$refs.noticeTable.remoteData();
                                row.readSts = '已阅';
                            } else {
                                vm.$message({ message: '加载阅读状态失败!' });
                            }
                        }
                    });
                },
                // 详情按钮
                detailFn: function() {
                    if (this.$refs.noticeTable.selections.length < 1) {
                        vm.$message({ message: '请选择一条记录查看!' });
                        return false;
                    }
                    if (this.$refs.noticeTable.selections.length > 1) {
                        vm.$message({ message: '只能选择一条记录查看!' });
                        return false;
                    }
                    if (this.$refs.noticeTable.selections[0].pubSts != 'O') {
                        vm.$message({ message: '无法查看未发布公告的详情!' });
                        return;
                    }
                    this.viewType = 'DETAIL';
                    vm.dialogVisible = true;
                    var noticeId = '';

                    yufp.service.request({
                        url: backend.noticeService + '/api/noticeext/noticeinfo/' + this.$refs.noticeTable.selections[0].noticeId,
                        method: 'get',
                        data: null,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                vm.$nextTick(function() {
                                    vm.uploadVisible = false;
                                    vm.downloadVisible = true;
                                    vm.deleteVisible = false;
                                    vm.$refs.noticeForm.resetFn();
                                    yufp.extend(vm.$refs.noticeForm.formModel, response.data);
                                    vm.content = response.data.detailcontent;
                                    var str1 = response.data.detailcontent;
                                    if (str1.indexOf("access_token=") != -1) {
                                        var newtoken = yufp.service.getToken();
                                        str = str1.substring(str1.indexOf("access_token=") + 13);
                                        str = str.substring(0, str.indexOf("\""));
                                        var str2 = str1.replace(str, newtoken);
                                        vm.content = str2;
                                    }
                                    vm.$refs.tinymce.hasChange = false;
                                    vm.$refs.tinymce.init();
                                    noticeId = response.data.noticeId;
                                    // 初始化附件列表查询时，传入noticeId
                                    var files = {
                                        condition: JSON.stringify({
                                            busNo: noticeId
                                        })
                                    };
                                    yufp.extend(vm.initFilesParams, files);
                                    // 获取附件列表
                                    vm.$refs.filesTable.queryFn(files);

                                    // 设置附件列表组件传入NOTICEID
                                    vm.noticeUpLoadBusNo = {
                                        busNo: response.data.noticeId
                                    };
                                    // 标为已阅,并刷新公告列表
                                    vm.readFn2(vm.$refs.noticeTable.selections[0]);
                                    // vm.$refs.noticeTable.remoteData();
                                    window.tinymce.get(vm.tinymceId).setMode('readonly');
                                });
                            } else {
                                vm.$message({ message: '获取详情失败!' });
                            }
                        }
                    });
                },

                // 已阅按钮
                readButtonFn: function() {
                    // 标为已阅,并刷新公告列表
                    vm.readFn();
                },

                // 阅读记录
                readFn: function() {
                    var _this = this;
                    if (this.$refs.noticeTable.selections.length < 1) {
                        vm.$message({ message: '请选择一条记录修改!' });
                        return false;
                    }
                    for (var i = 0; i < this.$refs.noticeTable.selections.length; i++) {
                        if (this.$refs.noticeTable.selections[i].pubSts != 'O') {
                            vm.$message({ message: '不能修改未发布的公告为已阅!' });
                            return;
                        }
                        this.$refs.noticeTable.selections[i].readUserId = this.userId;
                    }
                    yufp.service.request({
                        url: backend.noticeService + '/api/adminsmnotice/reads',
                        method: 'post',
                        data: JSON.stringify(this.$refs.noticeTable.selections),
                        callback: function(code, message, response) {
                            if (code == '0') {
                                // vm.$message({ message: '已阅!' });
                                for (var i = 0; i < _this.$refs.noticeTable.selections.length; i++) {
                                    _this.$refs.noticeTable.selections[i].readSts = '已阅';
                                }
                                // vm.$refs.noticeTable.remoteData();
                                yufp.util.butLogInfo(hashCode, '公告管理', '已阅');
                            } else {
                                vm.$message({ message: '加载阅读状态失败!' });
                            }
                        }
                    });
                },

                // 发布按钮
                pubNoticeButtonFn: function() {
                    if (this.$refs.noticeTable.selections.length < 1) {
                        vm.$message({ message: '请选择公告进行发布!' });
                        return false;
                    }
                    var arr = this.$refs.noticeTable.selections;
                    for (var i in arr) {
                        if (arr[i].pubSts == 'O') {
                            vm.$message({ message: '不能发布已经发布的公告' });
                            return false;
                        }
                    }
                    this.pubNoticeFn();
                },
                // 发布
                pubNoticeFn: function() {
                    for (var i = 0; i < this.$refs.noticeTable.selections.length; i++) {
                        this.$refs.noticeTable.selections[i].pubSts = 'O';
                        this.$refs.noticeTable.selections[i].pubOrgId = this.orgId;
                        this.$refs.noticeTable.selections[i].pubOrgName = this.orgName;
                        this.$refs.noticeTable.selections[i].pubUserId = this.userId;
                        this.$refs.noticeTable.selections[i].pubUserName = this.userName;
                    }

                    yufp.service.request({
                        url: backend.noticeService + '/api/adminsmnotice/pubnotices',
                        method: 'post',
                        data: JSON.stringify(vm.$refs.noticeTable.selections),
                        callback: function(code, message, response) {
                            if (code == '0') {
                                vm.$message({ message: '发布成功!' });
                                vm.$refs.noticeTable.remoteData();
                                yufp.util.butLogInfo(hashCode, '公告管理', '发布成功');
                            } else {
                                vm.$message({ message: '发布失败!' });
                            }
                        }
                    });
                },


                // 修改保存
                dataNoticeEditFn: function() {
                    if (vm.$refs.noticeForm.formModel.reciveRoleName == '') {
                        vm.$refs.noticeForm.formModel.reciveRoleId = '';
                    }
                    vm.$refs.noticeForm.formModel.content = vm.content;
                    yufp.service.request({
                        url: backend.noticeService + '/api/adminsmnotice/updates',
                        method: 'post',
                        data: vm.$refs.noticeForm.formModel,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                vm.$message({ message: '修改成功!' });

                                vm.$refs.noticeTable.remoteData();
                                vm.dialogVisible = false;
                                window.tinymce.get(vm.tinymceId).destroy();
                                yufp.util.butLogInfo(hashCode, '公告管理', '修改成功');
                            } else {
                                vm.$message({ message: '修改失败!' });
                            }
                        }
                    });
                },

                // 新增按钮
                addNoticeRecord: function() {
                    this.dialogVisible = true;

                    this.roleAllSelect = [];

                    // 初始化生成的ID
                    this.createdNoticeId = '';
                    // 初始化富文本

                    // 初始化附件列表参数
                    this.initFilesParams = {
                        condition: JSON.stringify({
                            busNo: ''
                        })
                    };
                    this.creatorFlag = true;
                    this.viewType = 'ADD';
                    this.$nextTick(function() {
                        if (document.getElementsByClassName('el-upload-list__item is-success')[0] != null && document.getElementsByClassName('el-upload-list__item is-success')[0] != undefined) {
                            document.getElementsByClassName('el-upload-list__item is-success')[0].innerHTML = '';
                        }
                        vm.content = '';
                        // window.tinymce.get(this.tinymceId).setMode('code');
                        vm.$refs.noticeForm.resetFn();
                        vm.$refs.tinymce.hasChange = false;
                        vm.$refs.tinymce.init();
                        // 初始化空附件列表
                        vm.$refs.filesTable.queryFn();
                    });


                    // 生成UUID
                    yufp.service.request({
                        url: backend.noticeService + '/api/adminsmnotice/createNoticeId',
                        method: 'get',
                        data: null,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                vm.createdNoticeId = response.data;

                                // 富文本附件操作传参
                                vm.busNo = vm.createdNoticeId;

                                // 设置附件列表组件传入NOTICEID
                                vm.noticeUpLoadBusNo = {
                                    busNo: vm.createdNoticeId
                                };
                                // 初始化附件列表查询时，传入为空
                                var files = {
                                    condition: JSON.stringify({
                                        busNo: vm.createdNoticeId
                                    })
                                };
                                yufp.extend(vm.initFilesParams, files);
                                // 获取附件列表
                                vm.$refs.filesTable.queryFn();
                            } else {
                                vm.$message({ message: '生成公告ID失败!' });
                            }
                        }
                    });
                },

                // 保存新增
                createNotice: function() {
                    var model = this.$refs.noticeForm.formModel;
                    model.content = vm.content;
                    model.pubSts = 'C';
                    model.creatorId = this.userId;
                    model.creatorName = this.userName;
                    model.noticeId = this.createdNoticeId;
                    yufp.service.request({
                        url: backend.noticeService + '/api/adminsmnotice/createinfo',
                        method: 'post',
                        data: model,
                        callback: function(code, message, response) {
                            if (code == '0') {
                                vm.$message({ message: '保存成功!' });
                                vm.$refs.noticeTable.remoteData();
                                vm.$refs.noticeForm.$refs.reciveOrgId[0].refreshData(); //保存成功后刷新树
                                vm.dialogVisible = false;
                                window.tinymce.get(vm.tinymceId).destroy();
                                yufp.util.butLogInfo(hashCode, '公告管理', '新增成功');
                            } else {
                                vm.$message({ message: '保存失败!' });
                            }
                        }
                    });
                },

                // 批量删除
                dataNoticemultDeleteFn: function() {
                    var ids = '';
                    var NoticeSelecttions = this.$refs.noticeTable.selections;
                    if (NoticeSelecttions.length > 0) {
                        for (var i = 0; i < NoticeSelecttions.length; i++) {
                            // 记录多选用于多删
                            if (NoticeSelecttions.length === 1) {
                                if (NoticeSelecttions[i].pubSts == 'O') {
                                    vm.$message({ message: '不能删除已发布的公告!' });
                                    return;
                                }
                                ids = NoticeSelecttions[i].noticeId;
                            } else {
                                if (NoticeSelecttions[i].pubSts == 'O') {
                                    vm.$message({ message: '不能删除已发布的公告!' });
                                    return false;
                                }
                                ids = ids + ',' + NoticeSelecttions[i].noticeId;
                            }
                        }
                    } else {
                        vm.$message({ message: '请选择需要删除的公告!' });
                        return false;
                    }
                    vm.$confirm('确认批量删除系统公告?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function() {
                        yufp.service.request({
                            url: backend.noticeService + '/api/adminsmnotice/deletes/' + ids,
                            method: 'post',
                            data: null,
                            callback: function(code, message, response) {
                                if (code == '0') {
                                    vm.$message({ message: '删除成功!' });
                                    vm.$refs.noticeTable.remoteData();
                                    yufp.util.butLogInfo(hashCode, '公告管理', '删除成功');
                                } else {
                                    vm.$message({ message: '删除失败!' });
                                }
                            }
                        });
                    });
                },
                // 检查上传文件大小和类型
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
                close: function() {
                    if (window.tinymce.get(this.tinymceId)) {
                        window.tinymce.get(this.tinymceId).destroy();
                    }
                }

            },
            watch: {
                viewType: function(value) {
                    if (value == 'ADD') {
                        this.isNew = true;
                        // 附件列表按钮
                        this.uploadVisible = true;
                        this.downloadVisible = true;
                        this.deleteVisible = true;
                        this.updateButtons[0].hidden = false;
                        this.updateButtons[1].hidden = false;
                        this.updateButtons[2].hidden = true;
                        this.updateButtons[3].hidden = true;
                        this.formDisabled = false;
                        // 日期限制
                        this.updateFields[1].fields[1].pickerOptions = this.datePick;
                        this.updateFields[1].fields[3].pickerOptions = this.datePick;
                    } else if (value == 'UPDATE') {
                        this.isNew = false;
                        this.uploadVisible = true;
                        this.downloadVisible = true;
                        this.deleteVisible = true;
                        this.updateButtons[0].hidden = false;
                        this.updateButtons[1].hidden = true;
                        this.updateButtons[2].hidden = false;
                        this.updateButtons[3].hidden = true;
                        this.formDisabled = false;
                        // 日期限制
                        this.updateFields[1].fields[1].pickerOptions = this.datePick;
                        this.updateFields[1].fields[3].pickerOptions = this.datePick;
                    } else if (value == 'DETAIL') {
                        this.uploadVisible = false;
                        this.downloadVisible = true;
                        this.deleteVisible = false;
                        // this.updateButtons[0].hidden = true;
                        this.updateButtons[1].hidden = true;
                        this.updateButtons[2].hidden = true;
                        this.updateButtons[3].hidden = true;
                        this.formDisabled = true;
                    }
                },
                content: function(newVal, oldVal) {
                    if (newVal.indexOf('blob:http') > 0) {
                        vm.updateButtons[0].hidden = false;
                        vm.updateButtons[1].hidden = true;
                        vm.updateButtons[2].hidden = true;
                        vm.updateButtons[3].hidden = false;
                        setTimeout(function() {
                            vm.updateButtons[0].hidden = false;
                            if (vm.isNew) {
                                vm.updateButtons[1].hidden = false;
                                vm.updateButtons[2].hidden = true;
                            } else {
                                vm.updateButtons[1].hidden = true;
                                vm.updateButtons[2].hidden = false;
                            }
                            vm.updateButtons[3].hidden = true;
                            $('#noticeId :text').eq(0).focus();
                        }, 8000);
                    }
                },
                creatorFlag: function(value) {
                    if (value) {
                        this.updateFields[1].fields[4].hidden = false;
                        this.updateFields[1].fields[5].hidden = true;
                    } else {
                        this.updateFields[1].fields[4].hidden = true;
                        this.updateFields[1].fields[5].hidden = true;
                    }
                }

            }
        });
    };


    // 消息处理
    exports.onmessage = function(type, message) {

    };

    // page销毁时触发destroy方法
    exports.destroy = function(id, cite) {

    };
});