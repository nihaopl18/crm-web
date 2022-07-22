/**
 * @created by chenlin on 2018/06/20.
 * @description 查询+树模板
 */
define([
    './custom/widgets/js/yufpExtTree.js',
    './custom/widgets/js/YufpTagGroupTree.js',
    './custom/widgets/js/YufpUserSelector.js',
    './custom/widgets/js/yufpRoleSelector.js',
    './custom/widgets/js/yufpOrgTree.js',
    './custom/widgets/js/YufpWfInit.js',
    './libs/echarts/echarts.min.js'
], function (require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('UPDATE_FREQUENCY,TIMELINES_TYPE,PROCESS_MODE,TAG_APPLY,TAG_LIFECYCLE,IF_AVAILABLE,SOURCE_SYS_NO,SOURCE_OBJ_TYPE,SOURCE_OBJ_NO,SOURCE_OBJ_ATT');
        var parseTime = yufp.util.dateFormat;
        var authIs = 'yufp-org-tree'; // 默认为组织机构
        var authUrl = backend.adminService + '/api/cimfmmtagauth/getorglist'; // 默认为组织机构url
        var groupno = '';
        var roles = [];
        var selectR = yufp.sessionStorage.get('selectRole');
        for (var i = 0; i < yu.session.roles.length; i++) {
            // roles[i] = yu.session.roles[i].code;
            if (selectR === yu.session.roles[i].id) {
                roles.push(yu.session.roles[i].code);
                break;
            }
        }
        // 获取金融机构数据加入授权管理对象名称的select控件
        var authOptions = [];
        yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cimfmmtagauth/getinstulist',
            callback: function (code, message, response) {
                if (code == 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        authOptions[i] = new Object();
                        authOptions[i].key = i.toString();
                        authOptions[i].value = response.data[i].instuName;
                    }
                }
            }
        });
        var vm = yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                // 排序校验
                var orderValidate = function (rule, value, callback) {
                    var reg = /^\d{0,4}$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入数字(不超过9999)'));
                        return;
                    }
                    callback();
                };
                // 标签名称是否重复校验
                var checkGroupName = function (rule, value, callback) {
                    var isExist = false;
                    var param = {
                        condition: JSON.stringify({
                            parentNo: _self.obj.groupNo
                        })
                    };
                    yufp.service.request({
                        url: backend.adminService + '/api/cimfmmftagGrop/getByParentNo',
                        method: 'get',
                        data: param,
                        async: false,
                        callback: function (code, message, response) {
                            for (var i = 0; i < response.data.length; i++) {
                                if (value == response.data[i].groupName) {
                                    isExist = true;
                                }
                            }
                            if (!isExist) {
                                callback();
                            } else {
                                callback(new Error('标签名称已存在'));
                            }
                        }
                    });
                };
                return {
                    zdyButton: false,
                    obj: {},
                    async: false,
                    isCustManager: false, // 是否为客户经理
                    isSysManager: false, // 是否为系统管理员
                    isCanDelete: true, // 是否可以删除
                    isCanEdite: true, // 是否可以编辑
                    param: { groupNo: '0', levelunit: '1', roles: roles },
                    authIs: authIs,
                    authUrl: authUrl,
                    authOptions: authOptions,
                    /** 查询字段 */
                    queryFields: [
                        // { placeholder: '标签编号', field: 'tagNo', type: 'input' },
                        { placeholder: '标签名称', field: 'tagName', type: 'input' }
                        // { placeholder: '标签时效性', field: 'timelinesType', type: 'select', dataCode: 'TIMELINES_TYPE' },
                        // { placeholder: '加工方式', field: 'processMode', type: 'select', dataCode: 'PROCESS_MODE' },
                        // { placeholder: '更新频率', field: 'updateFrequency', type: 'select', dataCode: 'UPDATE_FREQUENCY' },
                        // { placeholder: '标签用途', field: 'tagApply', type: 'select', dataCode: 'TAG_APPLY' },
                        // { placeholder: '标签生命周期', field: 'tagLifecycle', type: 'select', dataCode: 'TAG_LIFECYCLE' }
                        // { placeholder: '有效标志', field: 'ifAvailable', type: 'select', dataCode: 'IF_AVAILABLE' }
                    ],
                    /** 搜索按钮 */
                    queryButtons: [{
                        label: '搜索',
                        op: 'submit',
                        type: 'primary',
                        icon: 'search',
                        click: function (model, valid) {
                            if (valid) {
                                var param = {
                                    condition: JSON.stringify({
                                        id: yu.session.org.id
                                    })
                                };
                                model.instu = yu.session.instu.code;
                                model.org = yu.session.org.id;
                                model.user = yu.session.userCode;
                                model.roles = new Array();
                                if (_self.obj.groupNo) {
                                    model.groupNo = _self.obj.groupNo;
                                } else if (_self.isSysManager && !_self.isCustManager) {
                                    model.groupNo = '1';
                                } else if (!_self.isSysManager && _self.isCustManager) {
                                    model.groupNo = '0';
                                }
                                model.flag = true; // 判断是否为最高权限标志
                                for (var i = 0; i < yu.session.roles.length; i++) {
                                    model.roles[i] = yu.session.roles[i].code;
                                }
                                var paramorg = {
                                    condition: JSON.stringify(model)
                                };
                                _self.$refs.reftable.remoteData(paramorg);
                                // yufp.service.request({
                                //     method: 'POST',
                                //     url: backend.adminService + '/api/cimfmmtagtagsinfo/getorglevel',
                                //     data: param,
                                //     callback: function (code, message, response) {
                                //         if (code == 0) {
                                //             var json = response.data;
                                //             _self.orgLevel = json.orgLevel;
                                //             // 设置用户权限
                                //             model.instu = yu.session.instu.code;
                                //             model.org = yu.session.org.id;
                                //             model.user = yu.session.userCode;
                                //             model.roles = new Array();
                                //             model.groupNo = groupno;
                                //             model.flag = false; // 判断是否为最高权限标志
                                //             for (var i = 0; i < yu.session.roles.length; i++) {
                                //                 model.roles[i] = yu.session.roles[i].code;
                                //             }
                                //             if (_self.orgLevel > '2') {
                                //                 var param = {
                                //                     condition: JSON.stringify(model)
                                //                 };
                                //                 _self.$refs.reftable.remoteData(param);
                                //             } else {
                                //                 model.flag = true;
                                //                 var paramorg = {
                                //                     condition: JSON.stringify(model)
                                //                 };
                                //                 _self.$refs.reftable.remoteData(paramorg);
                                //             }
                                //         }
                                //     }
                                // });
                            }
                        }
                    },
                    { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],
                    /** 表格栏位 */
                    tableColumns: [
                        { type: 'selection' },
                        // { label: '标签编号', prop: 'tagNo', width: '100' },
                        { label: '标签', prop: 'tagName', sortable: true },
                        { label: '标签分组', prop: 'groupName' },
                        {
                            label: '标签类型',
                            prop: 'systemTag',
                            filters: [{ text: '系统标签', value: '1' }, { text: '自定义标签', value: '0' }],
                            filterMethod: function (value, row) {
                                return row.systemTag === value;
                            },
                            filterPlacement: 'bottom',
                            template: function () {
                                return '<template scope="scope">\
                  <yu-tag :type="scope.row.systemTag === \'1\' ? \'primary\':  \'warning\'">{{scope.row.systemTag === \'1\' ? \'系统标签\':  \'自定义标签\'}}</yu-tag>\
              </template>';
                            }
                        },
                        { label: '标签描述', prop: 'tagDesc', width: '148', showOverflowTooltip: true },
                        { label: '更新频率', prop: 'updateFrequency', dataCode: 'UPDATE_FREQUENCY' },
                        // { label: '失效日期', prop: 'disableDate', width: '120' },
                        {
                            label: '状态',
                            prop: 'tagStatus',
                            template: function () {
                                var roles = '';
                                var selectR = yufp.sessionStorage.get('selectRole');
                                for (var i = 0; i < yu.session.roles.length; i++) {
                                    if (selectR === yu.session.roles[i].id) {
                                        roles = yu.session.roles[i].code;
                                        break;
                                    }
                                }
                                var sys = false;
                                if (roles.indexOf('R001') == -1) {
                                    sys = true;
                                }
                                var user = yufp.session.user.userCode;
                                return '<template scope="scope">\
                  <yu-switch v-model="scope.row.tagStatus" @change="$emit(\'change-tag-status\',scope.row.tagStatus,scope.row)" :disabled="scope.row.ifAvailable == \'0\' || (scope.row.systemTag == \'1\' && ' + sys + ') || (scope.row.systemTag == \'0\' && scope.row.createUser !=\'' + user + '\')?true:false" off-text="上架" on-text="下架" on-color="#E30A2A" off-color="#C0C4CC" on-value="1" off-value="0"> </yu-switch>\
                </template>';
                            }
                        },
                        {
                            label: '操作',
                            width: '200px',
                            template: function () {
                                var roles = '';
                                var selectR = yufp.sessionStorage.get('selectRole');
                                for (var i = 0; i < yu.session.roles.length; i++) {
                                    if (selectR === yu.session.roles[i].id) {
                                        roles = yu.session.roles[i].code;
                                        break;
                                    }
                                }
                                var sys = false;
                                if (roles.indexOf('R001') == -1) {
                                    sys = true;
                                }
                                var user = yufp.session.user.userCode;
                                return '<template scope="scope">\
                <yu-button type="text" style="padding: 0" :disabled="(scope.row.systemTag == \'1\') || (scope.row.systemTag == \'0\' && scope.row.tagStatus ==\'1\')" @click="$emit(\'edit\',scope.row)">编辑</yu-button>\
                <yu-button type="text" style="padding: 0" :disabled="(scope.row.systemTag == \'1\') || (scope.row.systemTag == \'0\' && scope.row.tagStatus ==\'1\')" @click="$emit(\'delet-item\',scope.row)">删除</yu-button>\
                <yu-button type="text" style="padding: 0" @click="$emit(\'detail\', scope.row)">详情</yu-button>\
              </template>';
                            }
                        }
                        // { label: '更新频率', prop: 'updateFrequency', width: '100', dataCode: 'UPDATE_FREQUENCY' },
                        // { label: '生效日期', prop: 'availableDate', width: '120' },
                        // { label: '标签时效性', prop: 'timelinesType', width: '100', dataCode: 'TIMELINES_TYPE' },
                        // { label: '标签生命周期', prop: 'tagLifecycle', width: '120', dataCode: 'TAG_LIFECYCLE' },
                        // { label: '加工方式', prop: 'processMode', width: '100', dataCode: 'PROCESS_MODE' },
                        // { label: '标签优先级', prop: 'tagPri', width: '100' },
                        // { label: '标签用途', prop: 'tagApply', width: '100', dataCode: 'TAG_APPLY' },
                        // // { label: '有效标志', prop: 'ifAvailable', width: '100', dataCode: 'IF_AVAILABLE' },
                        // { label: '创建日期', prop: 'createDate', width: '120' },
                        // { label: '创建人', prop: 'createUser', width: '100' },
                        // { label: '创建机构', prop: 'orgName', width: '100' },
                        // { label: '创建系统', prop: 'createSys', width: '100' }
                    ],
                    gantTableColumns: [
                        { label: '授权ID', prop: 'id' },
                        { label: '授权对象类型', prop: 'authType', dataCode: 'AUTH_TYPE' },
                        { label: '授权对象名称', prop: 'authName', width: '120' },
                        { label: '授权对象ID', prop: 'authObj' },
                        // { label: '授权操作类型', prop: 'operateType', width: '100', dataCode: 'OPERATE_TYPE' },
                        { label: '授权生效日期', prop: 'availableDate', width: '100' },
                        { label: '授权失效日期', prop: 'disableDate', width: '100' },
                        { label: '授权人', prop: 'authUser' },
                        // { label: '授权人ID', prop: 'gantPesonId' },
                        { label: '授权日期', prop: 'authDate', width: '100' }
                    ],
                    tagTableColumns: [
                        { label: '来源系统编号', prop: 'sysNo', width: '95', dataCode: 'SYS_NO' },
                        { label: '来源实体类型', prop: 'entityType', width: '95', dataCode: 'ENTITY_TYPE' },
                        { label: '来源实体编号', prop: 'entityNo', width: '95', dataCode: 'ENTITY_NO' },
                        { label: '来源实体属性', prop: 'entityProp', width: '95', dataCode: 'ENTITY_PROP' },
                        { label: '口径', prop: 'statCaliber', width: '95', dataCode: 'STAT_CALIBER' },
                        {
                            label: '时间跨度从',
                            prop: 'dateStart',
                            width: '93',
                            formatter: function (row, column) {
                                return yufp.util.dateFormat(row.dateStart, '{y}-{m}-{d}');
                            }
                        },
                        {
                            label: '时间跨度至',
                            prop: 'dateEnd',
                            width: '93',
                            formatter: function (row, column) {
                                return yufp.util.dateFormat(row.dateEnd, '{y}-{m}-{d}');
                            }
                        }
                    ],
                    tagFields: [{
                        columnCount: 1,
                        fields: [{
                            label: '来源系统编号',
                            field: 'sysNo',
                            type: 'select',
                            dataCode: 'SYS_NO',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ]
                        },
                        {
                            label: '来源实体类型',
                            field: 'entityType',
                            type: 'select',
                            dataCode: 'ENTITY_TYPE',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ]
                        },
                        {
                            label: '来源实体编号',
                            field: 'entityNo',
                            type: 'select',
                            // 获取表名显示到来源实体编号中
                            dataUrl: backend.adminService + '/api/cimfmmtagdatasource/getTableName',
                            change: function () {
                                if (!_self.flagEntityProp) {
                                    yufp.extend(_self.$refs.tagRefform.formModel, { entityProp: new Array() });
                                } else {
                                    _self.flagEntityProp = false;
                                }
                                // 获取表内字段名加入来源实体属性中
                                var param = {
                                    condition: JSON.stringify({
                                        entityNo: _self.$refs.tagRefform.formModel.entityNo
                                    })
                                };
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.adminService + '/api/cimfmmtagdatasource/getEntityNo',
                                    data: param,
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            var columnData = response.data;
                                            var columnName = [];
                                            for (var i = 0; i < columnData.length; i++) {
                                                columnName.push({
                                                    key: columnData[i].columnName,
                                                    value: columnData[i].columnName
                                                });
                                            }
                                            _self.tagFields[0].fields[3].options = columnName;
                                        }
                                    }
                                });
                            },
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ]
                        },
                        {
                            label: '来源实体属性',
                            field: 'entityProp',
                            type: 'select',
                            multiple: true,
                            options: [],
                            rules: [
                                { required: true, message: '必填项', type: 'array', trigger: 'blur' }
                            ]
                        },
                        {
                            label: '时间跨度从',
                            field: 'dateStart',
                            type: 'date',
                            rules: [
                                { required: true, message: '必填项' }
                            ]
                        },
                        {
                            label: '时间跨度至',
                            field: 'dateEnd',
                            type: 'date',
                            rules: [
                                { required: true, message: '必填项' }
                            ]
                        },
                        { label: '口径', field: 'statCaliber', type: 'textarea' }
                        ]
                    }],
                    groupFields: [{
                        columnCount: 1,
                        fields: [{
                            label: '上级分组名称',
                            field: 'upGroupName',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ],
                            type: 'input',
                            disabled: true
                        },
                        {
                            label: '标签分组名称',
                            field: 'groupName',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ],
                            type: 'input'
                        },

                        {
                            label: '标签分组描述',
                            field: 'groupDesc',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ],
                            type: 'textarea'
                        }
                        ]
                    }],
                    groupFields1: [{
                        columnCount: 1,
                        fields: [{
                            label: '上级分组名称',
                            field: 'upGroupName',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ],
                            type: 'input',
                            disabled: true
                        },
                        {
                            label: '标签分组名称',
                            field: 'groupName',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' },
                                { validator: checkGroupName, trigger: 'blur' }
                            ],
                            type: 'input'
                        },

                        {
                            label: '标签分组描述',
                            field: 'groupDesc',
                            type: 'textarea',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ]
                        }
                        ]
                    }],
                    groupFields2: [{
                        columnCount: 1,
                        fields: [{
                            label: '上级分组名称',
                            field: 'upGroupName',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ],
                            type: 'input',
                            disabled: true
                        },
                        {
                            label: '标签分组名称',
                            field: 'groupName',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ],
                            type: 'input'
                        },

                        { label: '标签分组描述', field: 'groupDesc', type: 'textarea' }
                        ]
                    }],
                    /** 授权信息维护输入项 */
                    setPowerupdateFields: [{
                        columnCount: 2,
                        fields: [{
                            label: '授权对象类型',
                            field: 'authType',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ],
                            type: 'select',
                            dataCode: 'AUTH_TYPE',
                            disabled: false,
                            change: function () {
                                // 调用人员选择器
                                if (_self.$refs.setPoweform.formModel.authType == 'MGR') {
                                    _self.$refs.setPoweform.switch('authName', 'type', 'custom');
                                    _self.setPowerupdateFields[0].fields[1].is = 'yufp-user-selector';
                                    _self.setPowerupdateFields[0].fields[1].params.dataUrl = backend.adminService + '/api/cimfmmtagauth/getuserlist';
                                    // 调用角色选择器
                                } else if (_self.$refs.setPoweform.formModel.authType == 'ROLE') {
                                    _self.$refs.setPoweform.switch('authName', 'type', 'custom');
                                    _self.setPowerupdateFields[0].fields[1].is = 'yufp-role-selector';
                                    _self.setPowerupdateFields[0].fields[1].params.dataUrl = backend.adminService + '/api/cimfmmtagauth/getrolelist';
                                    // 调用组织结构选择器
                                } else if (_self.$refs.setPoweform.formModel.authType == 'ORG') {
                                    _self.$refs.setPoweform.switch('authName', 'type', 'custom');
                                    _self.setPowerupdateFields[0].fields[1].is = 'yufp-org-tree';
                                    _self.setPowerupdateFields[0].fields[1].params.dataUrl = backend.adminService + '/api/cimfmmtagauth/getorglist';
                                    // 调用金融机构选择器
                                } else {
                                    // 新增允许选多条数据、更改只能选一条数据
                                    if (_self.flagPowerVisible == 'SAVE') {
                                        _self.$refs.setPoweform.switch('authName', 'multiple', true);
                                    } else {
                                        _self.$refs.setPoweform.switch('authName', 'multiple', false);
                                    }
                                    // _self.setPowerupdateFields[0].fields[1].params.dataUrl = {};
                                    _self.$refs.setPoweform.switch('authName', 'type', 'select');
                                    _self.setPowerupdateFields[0].fields[1].options = authOptions;
                                }
                            }
                        },
                        {
                            label: '授权对象名称',
                            field: 'authName',
                            type: 'custom',
                            is: authIs,
                            disabled: false,
                            params: {
                                dataUrl: authUrl,
                                needDpt: true,
                                needCheckbox: true
                            },
                            options: authOptions,
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ]
                        },
                        // { label: '授权对象编号', field: 'authObj', type: 'input' },
                        // { label: '授权操作类型', field: 'operateType', type: 'select', dataCode: 'OPERATE_TYPE' },
                        {
                            label: '授权生效日期',
                            field: 'availableDate',
                            type: 'date',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ]
                        },
                        {
                            label: '授权失效日期',
                            field: 'disableDate',
                            type: 'date',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ]
                        }
                        ]
                    }],
                    /** 新增，修改，详情展示字段 */
                    /* 标签新增字段 by yx */
                    addFields: [{
                        columnCount: 2,
                        fields: [{
                            label: '标签分组',
                            field: 'groupNo',
                            rules: [{ required: true, message: '必填项', trigger: 'blur' }],
                            type: 'custom',
                            is: 'yufp-taggroup-tree',
                            params: {
                                needDpt: true,
                                needCheckbox: false,
                                dataUrl: backend.adminService + '/api/cimfmmftagGrop/getCustomTree'
                            },
                            readonly: false
                        },
                        // {
                        //   label: '父标签编号',
                        //   field: 'parentNo',
                        //   rules: [
                        //     { trigger: 'blur' }],
                        //   type: 'input',
                        //   disabled: true
                        // },
                        {
                            label: '标签名称',
                            field: 'tagName',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' },
                                { max: 8, message: '标签名称过长，不超过8个字符', trigger: 'blur' }
                            ],
                            type: 'input'
                        }
                        ]
                    }, {
                        columnCount: 2,
                        fields: [{
                            label: '排序',
                            field: 'tagPri',
                            type: 'input',
                            rules: [
                                { validator: orderValidate, trigger: 'blur' }
                            ]
                        }]
                    }, {
                        columnCount: 1,
                        fields: [{
                            label: '标签描述',
                            field: 'tagDesc',
                            type: 'textarea',
                            rules: [
                                { max: 100, message: '标签描述过长，不超过100个字符', trigger: 'blur' }
                            ]
                        }]
                    }
                        // {
                        //     columnCount: 2,
                        //     fields: [{
                        //         label: '状态',
                        //         field: 'tagStatus',
                        //         type: 'switch',
                        //         onText: '下架',
                        //         offText: '上架',
                        //         onValue: '1',
                        //         offValue: '0',
                        //         onColor: '#E30A2A',
                        //         offColor: '#C0C4CC'
                        //     }]
                        // }
                        // {
                        //   columnCount: 2,
                        //   fields: [
                        //     {
                        //       label: '标签时效性',
                        //       field: 'timelinesType',
                        //       type: 'select',
                        //       dataCode: 'TIMELINES_TYPE',
                        //       change: function () {
                        //         if (_self.$refs.refformAdd.formModel.timelinesType == 'ALWAYS') {
                        //           _self.$refs.refformAdd.formModel.disableDate = new Date(9999, 12, 0);
                        //         } else {
                        //           _self.$refs.refformAdd.formModel.disableDate = null;
                        //         }
                        //       }
                        //     },
                        //     { label: '加工方式', field: 'processMode', type: 'select', dataCode: 'PROCESS_MODE' },
                        //     { label: '更新频率', field: 'updateFrequency', type: 'select', dataCode: 'UPDATE_FREQUENCY' },
                        //     { label: '标签优先级', field: 'tagPri', type: 'input' },
                        //     { label: '标签用途', field: 'tagApply', type: 'select', dataCode: 'TAG_APPLY' },
                        //     { label: '标签生命周期', field: 'tagLifecycle', type: 'select', dataCode: 'TAG_LIFECYCLE', disabled: true },
                        //     // { label: '有效标志', field: 'ifAvailable', type: 'select', dataCode: 'IF_AVAILABLE' },
                        //     {
                        //       label: '生效日期',
                        //       field: 'availableDate',
                        //       type: 'date',
                        //       rules: [
                        //         { required: true, message: '必填项', trigger: 'blur' }]
                        //     },
                        //     {
                        //       label: '失效日期',
                        //       field: 'disableDate',
                        //       type: 'date',
                        //       rules: [
                        //         { required: true, message: '必填项', trigger: 'blur' }]
                        //     },
                        //     { label: '创建系统', field: 'createSys', type: 'input', disabled: true }
                        //   ]
                        // }
                    ],
                    /* 标签更新字段 by yx */
                    updateFields: [{
                        columnCount: 2,
                        fields: [{
                            label: '标签分组',
                            field: 'groupNo',
                            rules: [{ required: true, message: '必填项', trigger: 'blur' }],
                            type: 'custom',
                            is: 'yufp-taggroup-tree',
                            params: {
                                needDpt: true,
                                needCheckbox: false,
                                dataUrl: backend.adminService + '/api/cimfmmftagGrop/getCustomTree'
                            }
                        },
                        // {
                        //   label: '父标签编号',
                        //   field: 'parentNo',
                        //   rules: [
                        //     { trigger: 'blur' }],
                        //   type: 'input',
                        //   disabled: true
                        // },
                        {
                            label: '标签名称',
                            field: 'tagName',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' },
                                { max: 8, message: '标签名称过长，不超过8个字符', trigger: 'blur' }
                            ],
                            type: 'input'
                        }
                        ]
                    }, {
                        columnCount: 2,
                        fields: [{
                            label: '排序',
                            field: 'tagPri',
                            type: 'input',
                            rules: [
                                { validator: orderValidate, trigger: 'blur' }
                            ]
                        }]
                    }, {
                        columnCount: 1,
                        fields: [{
                            label: '标签描述',
                            field: 'tagDesc',
                            type: 'textarea',
                            rules: [
                                { max: 100, message: '标签描述过长，不超过100个字符', trigger: 'blur' }
                            ]
                        }]
                    }
                        // , {
                        //     columnCount: 2,
                        //     fields: [{
                        //         label: '状态',
                        //         field: 'tagStatus',
                        //         type: 'switch',
                        //         onText: '下架',
                        //         offText: '上架',
                        //         onValue: '1',
                        //         offValue: '0',
                        //         onColor: '#E30A2A',
                        //         offColor: '#C0C4CC'
                        //     }]
                        // }
                    ],
                    /* 标签详情字段 by yx */
                    stsFields: [{
                        columnCount: 2,
                        fields: [{
                            label: '标签分组',
                            field: 'groupName',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ],
                            type: 'input'
                        },
                        // {
                        //   label: '父标签编号',
                        //   field: 'parentNo',
                        //   rules: [
                        //     { required: true, message: '必填项', trigger: 'blur' }],
                        //   type: 'input'
                        // },
                        {
                            label: '标签名称',
                            field: 'tagName',
                            rules: [
                                { required: true, message: '必填项', trigger: 'blur' }
                            ],
                            type: 'input'
                        }
                        ]
                    }, {
                        columnCount: 1,
                        fields: [
                            { label: '标签描述', field: 'tagDesc', type: 'textarea' }
                        ]
                    }, {
                        columnCount: 2,
                        fields: [
                            // { label: '标签时效性', field: 'timelinesType', type: 'select', dataCode: 'TIMELINES_TYPE' },
                            // { label: '加工方式', field: 'processMode', type: 'select', dataCode: 'PROCESS_MODE' },
                            { label: '更新频率', field: 'updateFrequency', type: 'select', dataCode: 'UPDATE_FREQUENCY' },
                            // { label: '标签优先级', field: 'tagPri', type: 'input' },
                            // { label: '标签用途', field: 'tagApply', type: 'select', dataCode: 'TAG_APPLY' },
                            // { label: '标签生命周期', field: 'tagLifecycle', type: 'select', dataCode: 'TAG_LIFECYCLE' },
                            // { label: '有效标志', field: 'ifAvailable', type: 'select', dataCode: 'IF_AVAILABLE' },
                            {
                                label: '生效日期',
                                field: 'availableDate',
                                type: 'date',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' }
                                ]
                            },
                            {
                                label: '失效日期',
                                field: 'disableDate',
                                type: 'date',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' }
                                ]
                            }
                            // { label: '创建系统', field: 'createSys', type: 'input' }
                        ]
                    }],
                    /** 页面 提交、更新按钮 */
                    /* 标签新增按钮 by yx */
                    addButtons: [{
                        label: '取消',
                        type: 'primary',
                        icon: 'yx-undo2',
                        hidden: false,
                        click: function (model) {
                            _self.dialogVisibleAdd = false;
                        }
                    },
                    {
                        label: '保存',
                        type: 'primary',
                        icon: 'check',
                        hidden: false,
                        click: function (model) {
                            var validate;
                            _self.$refs.refformAdd.validate(function (valid) {
                                validate = valid;
                            });
                            if (!validate) {
                                return;
                            }
                            // 判断标签是否重复
                            yufp.service.request({
                                method: 'POST',
                                url: backend.adminService + '/api/cimfmmtagtagsinfo/judgetag',
                                data: model,
                                callback: function (code, message, response) {
                                    if (code == 0) {
                                        var json = response.data;
                                        var flag = true;
                                        if (json.length != 0) {
                                            _self.$message({ message: '标签已重复', type: 'warning' });
                                            flag = false;
                                        }
                                        if (flag) {
                                            // 新增标签
                                            var tagModel = {};
                                            tagModel = model;
                                            tagModel.tagStatus = '1';
                                            if (tagModel.groupNo == '') {
                                                tagModel.groupNo = _self.obj.groupNo;
                                            }
                                            if (tagModel.disableDate < tagModel.availableDate &&
                                                !( // 判断是否为同一天
                                                    tagModel.disableDate.getFullYear() == tagModel.availableDate.getFullYear() &&
                                                    tagModel.disableDate.getMonth() == tagModel.availableDate.getMonth() &&
                                                    tagModel.disableDate.getDate() == tagModel.availableDate.getDate()
                                                )
                                            ) {
                                                _self.$message({ message: '生效日期必须小于失效日期', type: 'warning' });
                                            } else if (tagModel.availableDate <= new Date(new Date().getTime() - 24 * 60 * 60 * 1000)) {
                                                _self.$message({ message: '生效日期不能小于当前日期', type: 'warning' });
                                            } else {
                                                _self.$delete(tagModel, 'disableDate');
                                                _self.$delete(tagModel, 'availableDate');
                                                yufp.service.request({
                                                    method: 'POST',
                                                    url: backend.adminService + '/api/cimfmmtagtagsinfo/inserttag',
                                                    data: tagModel,
                                                    callback: function (code, message, response) {
                                                        if (code == 0) {
                                                            _self.$message({ message: '新增标签成功' });
                                                            // if (_self.orgLevel > '2') {
                                                            //     var param = {
                                                            //         condition: JSON.stringify({
                                                            //             instu: yu.session.instu.code,
                                                            //             org: yu.session.org.id,
                                                            //             user: yu.session.userCode,
                                                            //             roles: roles,
                                                            //             groupNo: _self.obj.groupNo,
                                                            //             flag: false
                                                            //         })
                                                            //     };
                                                            //     _self.$refs.reftable.remoteData(param);
                                                            // } else {
                                                            //     var paramOrg = {
                                                            //         condition: JSON.stringify({
                                                            //             instu: yu.session.instu.code,
                                                            //             org: yu.session.org.id,
                                                            //             user: yu.session.userCode,
                                                            //             groupNo: _self.obj.groupNo,
                                                            //             roles: roles,
                                                            //             flag: true
                                                            //         })
                                                            //     };
                                                            //     _self.$refs.reftable.remoteData(paramOrg);
                                                            // }
                                                            var paramOrg = {
                                                                condition: JSON.stringify({
                                                                    instu: yu.session.instu.code,
                                                                    org: yu.session.org.id,
                                                                    user: yu.session.userCode,
                                                                    groupNo: tagModel.groupNo,
                                                                    roles: roles,
                                                                    flag: true
                                                                })
                                                            };
                                                            _self.$refs.mytree.remoteData();
                                                            _self.$refs.reftable.remoteData(paramOrg);
                                                            _self.dialogVisibleAdd = false;
                                                            yufp.util.butLogInfo(hashCode, '标签中心', '新增标签');
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                    ],
                    /* 标签更新按钮 by yx */
                    updateButtons: [{
                        label: '取消',
                        type: 'primary',
                        icon: 'yx-undo2',
                        hidden: false,
                        click: function () {
                            _self.dialogVisibleUpdate = false;
                        }
                    },
                    {
                        label: '保存',
                        type: 'primary',
                        icon: 'check',
                        hidden: false,
                        click: function (model) {
                            // var validate = false;
                            // _self.$refs.refformUpdate.validate(function (valid) {
                            //   validate = valid;
                            // });
                            // if (!validate) {
                            //   return;
                            // }
                            var modelUpdate = {};
                            yufp.extend(modelUpdate, model);
                            modelUpdate.tagStatus = model.tagStatus ? model.tagStatus : '0';
                            modelUpdate.tagNo = _self.$refs.reftable.selections[0].tagNo;
                            // 判断标签是否重复
                            yufp.service.request({
                                method: 'POST',
                                url: backend.adminService + '/api/cimfmmtagtagsinfo/judgetag',
                                data: model,
                                callback: function (code, message, response) {
                                    if (code == 0) {
                                        var json = response.data;
                                        var name = model.tagName;
                                        var flag = 0;
                                        for (var i = 0; i < json.length; i++) {
                                            if (name == json[i].tagName) {
                                                flag++;
                                                break;
                                            }
                                        }
                                        if (flag <= 1) {
                                            var availableDate = new Date(modelUpdate.availableDate.replace(/-/g, '/'));
                                            if (modelUpdate.disableDate < availableDate) {
                                                _self.$message({ message: '生效日期必须小于失效日期', type: 'warning' });
                                            } else {
                                                _self.$delete(modelUpdate, 'disableDate');
                                                _self.$delete(modelUpdate, 'availableDate');
                                                yufp.service.request({
                                                    method: 'POST',
                                                    url: backend.adminService + '/api/cimfmmtagtagsinfo/updatetag',
                                                    data: modelUpdate,
                                                    callback: function (code, message, response) {
                                                        if (code == 0) {
                                                            _self.$message({ message: '标签更新成功' });
                                                            // if (_self.orgLevel > '2') {
                                                            //     var param = {
                                                            //         condition: JSON.stringify({
                                                            //             instu: yu.session.instu.code,
                                                            //             org: yu.session.org.id,
                                                            //             user: yu.session.userCode,
                                                            //             groupNo: _self.obj.groupNo,
                                                            //             roles: roles,
                                                            //             flag: false
                                                            //         })
                                                            //     };
                                                            //     _self.$refs.reftable.remoteData(param);
                                                            // } else {
                                                            //     var paramOrg = {
                                                            //         condition: JSON.stringify({
                                                            //             instu: yu.session.instu.code,
                                                            //             org: yu.session.org.id,
                                                            //             user: yu.session.userCode,
                                                            //             groupNo: _self.obj.groupNo,
                                                            //             roles: roles,
                                                            //             flag: true
                                                            //         })
                                                            //     };
                                                            //     _self.$refs.reftable.remoteData(paramOrg);
                                                            // }
                                                            var paramOrg = {
                                                                condition: JSON.stringify({
                                                                    instu: yu.session.instu.code,
                                                                    org: yu.session.org.id,
                                                                    user: yu.session.userCode,
                                                                    groupNo: modelUpdate.groupNo,
                                                                    roles: roles,
                                                                    flag: true
                                                                })
                                                            };
                                                            _self.$refs.mytree.remoteData();
                                                            _self.$refs.reftable.remoteData(paramOrg);
                                                            _self.dialogVisibleUpdate = false;
                                                            yufp.util.butLogInfo(hashCode, '标签中心', '编辑标签');
                                                        }
                                                    }
                                                });
                                            }
                                        } else {
                                            _self.$message({ message: '标签已重复', type: 'warning' });
                                        }
                                    }
                                }
                            });
                        }
                    }
                    ],
                    /* 标签详情按钮 by yx */
                    stsButtons: [{
                        label: '取消',
                        type: 'primary',
                        icon: 'yx-undo2',
                        hidden: false,
                        click: function (model) {
                            _self.dialogVisibleSts = false;
                        }
                    },
                    {
                        label: '保存',
                        type: 'primary',
                        icon: 'check',
                        hidden: false,
                        click: function (model) {
                            // var validate = false;
                            // _self.$refs.refform.validate(function (valid) {
                            //   validate = valid;
                            // });
                            // if (!validate) {
                            //   return;
                            // }
                            _self.dialogVisibleSts = false;
                            // 请调用服务进行后台保存
                        }
                    }
                    ],
                    /* 标签数据来源 新增/修改 保存按钮 */
                    tagButtons: [{
                        label: '保存',
                        type: 'primary',
                        icon: 'check',
                        hidden: false,
                        id: 'buttons',
                        click: function (model) {
                            var validate = false;
                            _self.$refs.tagRefform.validate(function (valid) {
                                validate = valid;
                            });
                            if (!validate) {
                                return;
                            }
                            _self.$refs.tagRefform.buttons[0].hidden = true;
                            var selection = _self.$refs.reftable.selections[0];
                            var flag = true;
                            // 新增
                            if (_self.datasourceflag) {
                                model.tagNo = selection.tagNo;
                                model.sysNo = _self.$refs.tagRefform.formModel.sysNo;
                                model.dateStart = _self.$refs.tagRefform.formModel.dateStart;
                                model.dateEnd = _self.$refs.tagRefform.formModel.dateEnd;
                                model.entityNo = _self.$refs.tagRefform.formModel.entityNo;
                                model.entityProp = _self.$refs.tagRefform.formModel.entityProp.join(',');
                                model.entityType = _self.$refs.tagRefform.formModel.entityType;
                                model.statCaliber = _self.$refs.tagRefform.formModel.statCaliber;
                                model.createOrg = yufp.session.org.code;
                                var param = {
                                    condition: JSON.stringify({
                                        sysNo: model.sysNo,
                                        entityNo: model.entityNo,
                                        entityType: model.entityType,
                                        tagNo: model.tagNo
                                    })
                                };
                                var modelUpdate = model;
                                yufp.service.request({
                                    method: 'GET',
                                    url: backend.adminService + '/api/cimfmmtagdatasource/dsRepeat',
                                    data: param,
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            var json = response.data;
                                            if (json.length != 0) {
                                                _self.$message({ message: '数据内容已经拥有', type: 'warning' });
                                                flag = false;
                                                _self.$refs.tagRefform.resetFields();
                                            }
                                            if (flag) {
                                                if (model.dateEnd < model.dateStart) {
                                                    _self.$message({ message: '时间跨度从日期必须小于时间跨度至日期', type: 'warning' });
                                                } else {
                                                    yufp.service.request({
                                                        method: 'POST',
                                                        url: backend.adminService + '/api/cimfmmtagdatasource/insertsource',
                                                        data: model,
                                                        callback: function (code, message, response) {
                                                            if (code == 0) {
                                                                _self.$message('数据来源新增成功');
                                                                _self.$refs.reftable1.remoteData();
                                                                // _self.dialogVisible1 = false;
                                                            }
                                                        }
                                                    });
                                                }
                                                // _self.$refs.tagRefform.resetFields();
                                                _self.datasourceflag = false;
                                            }
                                            _self.$refs.tagRefform.resetFields();
                                        }
                                    }
                                });
                                _self.formDisabled = true;
                            } else {
                                // 修改
                                // var model = model;
                                // var obj = _self.$refs.reftable1.selections[0];
                                var param = {
                                    condition: JSON.stringify({
                                        sysNo: model.sysNo,
                                        entityNo: model.entityNo,
                                        entityType: model.entityType,
                                        tagNo: model.tagNo,
                                        id: _self.$refs.reftable1.selections[0].id
                                    })
                                };
                                var modelUpdate = model;
                                yufp.service.request({
                                    method: 'GET',
                                    url: backend.adminService + '/api/cimfmmtagdatasource/dsRepeat',
                                    data: param,
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            var json = response.data;
                                            if (json.length != 0 && response.data[0].id != model.id) { // 可以修改自己的信息
                                                _self.$message({ message: '数据内容已经拥有', type: 'warning' });
                                                flag = false;
                                                _self.$refs.tagRefform.resetFields();
                                            } else {
                                                if (yufp.util.dateFormat(model.dateEnd) < yufp.util.dateFormat(model.dateStart)) {
                                                    _self.$message({ message: '时间跨度从日期必须小于时间跨度至日期', type: 'warning' });
                                                } else {
                                                    modelUpdate.entityProp = _self.$refs.tagRefform.formModel.entityProp.join(',');
                                                    modelUpdate.id = _self.$refs.reftable1.selections[0].id;
                                                    modelUpdate.createOrg = yufp.session.org.code;
                                                    yufp.service.request({
                                                        method: 'POST',
                                                        url: backend.adminService + '/api/cimfmmtagdatasource/updatesource',
                                                        data: modelUpdate,
                                                        callback: function (code, message, response) {
                                                            if (code == 0) {
                                                                _self.$message('数据来源修改成功');
                                                                _self.$refs.reftable1.remoteData();
                                                                // _self.dialogVisible1 = false;
                                                            }
                                                        }
                                                    });
                                                }
                                                _self.$refs.tagRefform.resetFields();
                                            }
                                        }
                                    }
                                });
                                _self.formDisabled = true;
                            }
                        }
                    }],
                    // 新增保存按钮
                    groupButtons1: [{
                        label: '关闭',
                        type: 'primary',
                        icon: 'yx-undo2',
                        hidden: false,
                        click: function (model) {
                            _self.dialogVisible4 = false;
                        }
                    },
                    {
                        label: '保存',
                        type: 'primary',
                        icon: 'check',
                        hidden: false,
                        click: function (model) {
                            var validate = false;
                            _self.$refs.refform2.validate(function (valid) {
                                validate = valid;
                            });
                            if (!validate) {
                                return;
                            }
                            model.parentNo = _self.obj.groupNo;
                            model.upGroupName = _self.$refs.refform2.formModel.upGroupName;
                            model.createOrg = yufp.session.org.id;
                            // 调用服务进行后台保存
                            yufp.service.request({
                                method: 'POST',
                                url: backend.adminService + '/api/cimfmmftagGrop/saveTagGroup',
                                data: model,
                                callback: function (code, message, response) {
                                    if (code == 0 && response.code == 0) {
                                        _self.$refs.mytree.remoteData();
                                        _self.$message({ message: '操作成功', type: 'warning' });
                                        _self.dialogVisible4 = false;
                                        yufp.util.butLogInfo(hashCode, '标签中心', '新增标签分组');
                                    } else {
                                        vm.$message({ message: response.message, type: 'warning' });
                                    }
                                }
                            });
                        }
                    }

                    ],
                    // 标签分组修改保存按钮
                    groupButtons: [{
                        label: '关闭',
                        type: 'primary',
                        icon: 'yx-undo2',
                        hidden: false,
                        click: function (model) {
                            _self.dialogVisible3 = false;
                        }
                    },
                    {
                        label: '保存',
                        type: 'primary',
                        icon: 'check',
                        hidden: false,
                        click: function (model) {
                            var validate = false;
                            _self.$refs.refform1.validate(function (valid) {
                                validate = valid;
                            });
                            if (!validate) {
                                return;
                            }
                            var param = {
                                condition: JSON.stringify({
                                    groupName: model.groupName
                                })
                            };

                            model.groupName = _self.$refs.refform1.formModel.groupName;
                            model.groupType = _self.$refs.refform1.formModel.groupType;
                            model.groupDesc = _self.$refs.refform1.formModel.groupDesc;
                            model.parentNo = _self.obj.parentNo;
                            model.groupNo = _self.obj.groupNo;
                            model.createOrg = yufp.session.org.code;
                            // 校验当前节点的上级节点是否为他的子节点
                            var isChild = false;
                            yufp.service.request({
                                method: 'get',
                                url: backend.adminService + '/api/cimfmmftagGrop/getChild',
                                data: param,
                                callback: function (code, message, response) {
                                    if (code == 0) {
                                        for (var i = 0; i < response.data.length; i++) {
                                            if (model.parentNo == response.data[i].groupNo) { // 判断已选择的上级节点是否与它本身的子节点重叠
                                                isChild = true;
                                                break;
                                            }
                                        }
                                        if (isChild == true) {
                                            vm.$message({ message: '上级目录不能为他的子目录', type: 'warning' });
                                            return;
                                        } else {
                                            // 调用服务进行后台保存
                                            yufp.service.request({
                                                method: 'POST',
                                                url: backend.adminService + '/api/cimfmmftagGrop/modifyTagGroup',
                                                data: model,
                                                callback: function (code, message, response) {
                                                    if (code == 0 && response.code == 0) {
                                                        _self.$refs.mytree.remoteData();
                                                        _self.$message({ message: '操作成功', type: 'warning' });
                                                        _self.dialogVisible3 = false;
                                                        yufp.util.butLogInfo(hashCode, '标签中心', '编辑标签分组');
                                                    } else {
                                                        vm.$message({ message: response.message, type: 'warning' });
                                                    }
                                                }
                                            });
                                        }
                                    } else {
                                        vm.$message({ message: '操作失败', type: 'warning' });
                                        isChild = true;
                                    }
                                }
                            });
                        }
                    }

                    ],
                    // 详情调用按钮
                    groupButtons2: [{
                        label: '关闭',
                        type: 'primary',
                        icon: 'yx-undo2',
                        hidden: false,
                        click: function (model) {
                            _self.dialogVisible5 = false;
                        }
                    }],
                    baseParam: {},
                    // 标签使用频率表格
                    frequencyColumns: [
                        { label: '标签名称', prop: 'tagName' },
                        { label: '使用次数', prop: 'count', sortable: true }
                    ],
                    custCountColumns: [
                        { label: '标签名称', prop: 'tagName' },
                        { label: '客户数', prop: 'count', sortable: true }
                    ],
                    timeRange: [],
                    /** 授权信息维护保存按钮 */
                    setPowerupdateButtons: [{
                        label: '保存',
                        type: 'primary',
                        icon: 'check',
                        hidden: false,
                        click: function (model) {
                            // var validate = false;
                            // _self.$refs.setPoweform.validate(function (valid) {
                            //   validate = valid;
                            // });
                            // if (!validate) {
                            //   return;
                            // }
                            // _self.setPowerVisible = false;
                            // 判断生效日期与失效日期的大小
                            var availableDate = _self.$refs.setPoweform.formModel.availableDate;
                            var disableDate = _self.$refs.setPoweform.formModel.disableDate;
                            if (availableDate > disableDate) {
                                _self.$message({ message: '生效日期不能大于失效日期', type: 'warning' });
                            } else if (availableDate < new Date(new Date().getTime() - 24 * 60 * 60 * 1000)) {
                                _self.$message({ message: '生效日期不能小于当前日期', type: 'warning' });
                            } else {
                                // 获取关联的标签编号
                                model.tagNo = _self.tagNoPowerVisible;
                                if (model.authType == 'INSTU') {
                                    if (_self.flagPowerVisible == 'SAVE') {
                                        var arr = [];
                                        for (var i = 0; i < model.authName.length; i++) {
                                            arr[i] = authOptions[model.authName[i]].value;
                                        }
                                        model.authNames = arr.join(',');
                                        model.authName = model.authNames;
                                    } else {
                                        model.authName = _self.$refs.setPoweform.formModel.authName;
                                    }
                                    // var arr = [];
                                    // for (var i = 0; i < model.authName.length; i++) {
                                    //   arr[i] = authOptions[model.authName[i]].value;
                                    // }
                                    // model.authNames = arr.join(',');
                                    // model.authName = _self.$refs.setPoweform.formModel.authName;
                                } else {
                                    model.authNames = model.authName;
                                }
                                // 判断页面功能为新增
                                if (_self.flagPowerVisible == 'SAVE') {
                                    yufp.service.request({
                                        method: 'POST',
                                        url: backend.adminService + '/api/cimfmmtagauth/insertlist',
                                        data: model,
                                        callback: function (code, message, response) {
                                            if (code == 0) {
                                                _self.$message({ message: '新增成功' });
                                                _self.setPowerVisible = false;
                                                _self.$refs.reftable2.remoteData();
                                                _self.$refs.setPoweform.resetFn();
                                                _self.$refs.setPoweform.switch('authName', 'type', 'input');
                                                _self.$refs.setPoweform.switch('authName', 'options', null);
                                            }
                                        }
                                    });
                                }
                                // 判断页面功能为修改
                                else if (_self.flagPowerVisible == 'SET') {
                                    yufp.service.request({
                                        method: 'POST',
                                        url: backend.adminService + '/api/cimfmmtagauth/updatelist',
                                        data: model,
                                        callback: function (code, message, response) {
                                            if (code == 0) {
                                                _self.$message({ message: '修改成功' });
                                                _self.setPowerVisible = false;
                                                _self.$refs.reftable2.remoteData();
                                                _self.$refs.setPoweform.resetFn();
                                            }
                                        }
                                    });
                                } else {
                                    _self.$message({ message: '操作有误，请重新操作', type: 'warning' });
                                }
                            }
                        }
                    },
                    {
                        label: '关闭',
                        type: 'primary',
                        icon: 'yx-undo2',
                        hidden: false,
                        click: function (model) {
                            _self.setPowerVisible = false;
                            _self.$refs.setPoweform.resetFn();
                        }
                    }
                    ],
                    height: yufp.frame.size().height,
                    tabHeight: yufp.frame.size().height - 103 - 95,
                    dialogVisible: false,
                    dialogVisibleAdd: false,
                    dialogVisibleUpdate: false,
                    dialogVisibleSts: false,
                    dialogVisible1: false,
                    dialogVisible2: false,
                    dialogVisible3: false,
                    dialogVisible4: false,
                    dialogVisible5: false,
                    analysisVisible: false,
                    btnIndex: '按年',
                    currentYear: new Date().getFullYear(),
                    years: [],
                    labelUseOption: {},
                    formDisabled1: false,
                    formDisabled: false,
                    addbuttonDisabled: true,
                    editbuttonDisabled: true,
                    deletbuttonDisabled: true,
                    detailbuttonDisabled: true,
                    tagAddDisabled: false,
                    tagEditDisabled: false,
                    tagDeletDisabled: false,
                    viewType: 'DETAIL',
                    flagEntityProp: false,
                    buttonDisabled: true,
                    upButtonDisabled: false,
                    datasourceflag: false, // 数据来源新增/修改保存标识
                    setPowerVisible: false, // 授权信息维护页面显示标识
                    flagPowerVisible: 'SAVE', // 授权信息维护界面功能标识
                    tagNoPowerVisible: '', // 授权信息维护界面关联标签编号
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    wfCommonParams: {
                        sessionInstuCde: yufp.session.instu.code,
                        sessionOrgCode: yufp.session.org.code,
                        sessionLoginCode: yufp.session.user.loginCode
                    },
                    // // 授权判断入参
                    // gantParam: {
                    //   condition: JSON.stringify(gantModel)
                    // },
                    // // 授权判断入参对象
                    // gantModel: {
                    //   instu: yu.session.instu.code,
                    //   org: yu.session.org.id,
                    //   user: yu.session.userCode,
                    //   roles: roles,
                    //   flag: false
                    // },
                    orgLevel: '', // 机构权限等级
                    groupNos: [],
                    groupNames: '',
                    childPopoverVisible: false
                };
            },
            created: function () {
                this.getOptionManRole();
                this.getYears();
            },
            mounted: function () {
                this.firstFindTags();
            },
            methods: {
                // 获取年份
                getYears: function () {
                    var myDate = new Date();
                    var startYear = myDate.getFullYear() - 50; // 起始年份
                    var endYear = myDate.getFullYear() + 50; // 结束年份
                    for (var i = startYear; i <= endYear; i++) {
                        this.years.push(i);
                    }
                },
                handleYearChange: function () { },
                getLabelUseOption: function (arr) {
                    var tagNams = [];
                    var count = [];
                    for (var i = 0; i < arr.length; i++) {
                        tagNams[i] = arr[i].tagName;
                        count[i] = arr[i].count;
                    }
                    this.labelUseOption = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true,
                            show: false
                        },
                        xAxis: {
                            type: 'value',
                            boundaryGap: [0, 0.01],
                            show: false
                        },
                        yAxis: {
                            type: 'category',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            data: tagNams
                        },
                        barMaxWidth: 20,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 1, 0, [
                                { offset: 0, color: '#FE8B8B' },
                                { offset: 0.5, color: '#E63F39 ' },
                                { offset: 1, color: '#E63F39 ' }
                            ]
                            )
                        },
                        series: [{
                            name: '使用频率',
                            type: 'bar',
                            data: count,
                            label: {
                                show: true,
                                position: 'insideLeft'
                            }
                        }]
                    };
                },
                // 获取操作人身份
                getOptionManRole: function () {
                    var str = JSON.stringify(roles);
                    if (str.indexOf('R003') !== -1 || str.indexOf('R002') !== -1 || str.indexOf('R006') !== -1) {
                        this.isCustManager = true;
                        this.isSysManager = false;
                    } else if (str.indexOf('R001') !== -1) {
                        this.isCustManager = false;
                        this.isSysManager = true;
                        this.tagAddDisabled = true;
                        this.tagEditDisabled = true;
                        this.tagDeletDisabled = true;
                    } else {
                        this.isCustManager = false;
                        this.isSysManager = false;
                        this.tagAddDisabled = true;
                        this.tagEditDisabled = true;
                        this.tagDeletDisabled = true;
                        this.upButtonDisabled = true;
                    }
                },
                // 自定义标签树
                renderContent: function () {
                    var createElement = arguments[0];
                    var label = arguments[1].data.groupName;
                    var tagCount = arguments[1].data.tagCount;
                    var groupNo = arguments[1].data.groupNo;
                    if (groupNo !== '0' && groupNo !== '1' && groupNo !== '1023' && tagCount) {
                        label += '(' + tagCount + ')';
                    }
                    var desc = arguments[1].data.groupDesc;
                    var parentNo = arguments[1].data.parentNo;
                    // var tagCount = arguments[1].data.tagCount;
                    var _self = this;
                    var data = arguments[1].data;
                    return createElement('span', [
                        createElement('span', label),
                        createElement('span', {
                            // attrs: { class: desc == '自定义标签组' && parentNo == '00' ? 'el-icon-plus addBtn' : 'addBtn' },
                            attrs: { class: _self.returnClass(desc, parentNo) },
                            on: {
                                click: function (e) {
                                    e.stopPropagation();
                                    _self.addGroupFn(data);
                                }
                            }
                        })
                    ]);
                },
                returnClass: function (desc, parentNo) {
                    if (parentNo == '00') {
                        if (desc == '系统标签组') {
                            var flag = false;
                            var arr = yufp.session.user.roles;
                            for (let index = 0; index < arr.length; index++) {
                                var item = arr[index];
                                if (item.code == 'R001' && item.id == yufp.sessionStorage.get('selectRole')) {
                                    flag = true;
                                    break;
                                }
                            }
                            if (flag) {
                                return 'el-icon-plus addBtn';
                            } else {
                                return 'addBt';
                            }
                        } else if (desc == '自定义标签组') {
                            return 'el-icon-plus addBtn';
                        } else {
                            return 'addBt';
                        }
                    } else {
                        return 'addBt';
                    }
                },
                // 标签审批页面关闭前
                onAfterInit: function (data) {
                    var _self = this;
                    var uploadModel = {};
                    var uploadSelect = _self.$refs.reftable.selections[0];
                    uploadModel.tagNo = uploadSelect.tagNo;
                    uploadModel.tagLifecycle = 'PUBLISHED';
                    // 设置标签上架前生命周期
                    uploadModel.tagRests = _self.$refs.reftable.selections[0].tagLifecycle;
                    yufp.service.request({
                        method: 'POST',
                        data: uploadModel,
                        url: backend.adminService + '/api/cimfmmtagtagsinfo/settaglifecycle',
                        callback: function (code, message, response) {
                            if (code == 0) {
                                if (_self.orgLevel > '2') {
                                    var param = {
                                        condition: JSON.stringify({
                                            instu: yu.session.instu.code,
                                            org: yu.session.org.id,
                                            user: yu.session.userCode,
                                            roles: roles,
                                            groupNo: groupno,
                                            flag: false
                                        })
                                    };
                                    _self.$refs.reftable.remoteData(param);
                                } else {
                                    var paramOrg = {
                                        condition: JSON.stringify({
                                            instu: yu.session.instu.code,
                                            org: yu.session.org.id,
                                            user: yu.session.userCode,
                                            roles: roles,
                                            groupNo: groupno,
                                            flag: true
                                        })
                                    };
                                    _self.$refs.reftable.remoteData(paramOrg);
                                }
                                _self.$message({ message: '更新成功', type: 'warning' });
                            }
                        }
                    });
                },
                // 标签审批页面关闭后
                onAfterClose: function () {

                },
                isTagAvaliable: function (date) {
                    var availableDate = new Date(date).getTime();
                    var nowDate = new Date().getTime();
                    return availableDate <= nowDate;
                },
                // 表格选中 切换时，判断能否编辑删除
                tagSelectionChange: function (selection) {
                    if (this.isSysManager && !this.isCustManager) {
                        this.tagAddDisabled = true;
                        this.tagEditDisabled = true;
                        this.tagDeletDisabled = true;
                        return;
                    } else if (!this.isSysManager && this.isCustManager) {
                        var obj = this.obj;
                        if (obj && (obj.groupNo == '1' || obj.parentNo == '1')) {
                            this.tagAddDisabled = true;
                            this.tagEditDisabled = true;
                            this.tagDeletDisabled = true;
                            this.upButtonDisabled = true;
                            return;
                        } else if (!selection.length || selection.length > 1) {
                            this.tagAddDisabled = false;
                            this.tagEditDisabled = false;
                            this.tagDeletDisabled = false;
                            this.upButtonDisabled = false;
                            return;
                        }
                    }
                    // var obj = selection[0];
                    // if (obj.systemTag == '1') { // 如果是系统标签,不能编辑删除 1：系统标签 0 是自定义标签
                    //     // this.tagEditDisabled = true;
                    //     // this.tagDeletDisabled = true;
                    //     if (this.isSysManager) { // 如果是系统管理员才能修改删除上架
                    //         this.tagEditDisabled = false;
                    //         this.tagDeletDisabled = false;
                    //         if (obj.ifAvailable == '0') { // 如果系统标签没有生效，则不能进行上下架操作
                    //             this.upButtonDisabled = true;
                    //         } else {
                    //             this.upButtonDisabled = false;
                    //         }
                    //         // if (obj.tagStatus === '1') { // 标签是下架状态才能修改删除 1：上架 0：下架
                    //         //   this.tagEditDisabled = true;
                    //         //   this.tagDeletDisabled = true;
                    //         // } else {
                    //         //   this.tagEditDisabled = false;
                    //         //   this.tagDeletDisabled = false;
                    //         // }
                    //     } else {
                    //         this.tagEditDisabled = true;
                    //         this.tagDeletDisabled = true;
                    //         this.upButtonDisabled = true;
                    //     }
                    // } else { // 如果是自定义标签
                    //     this.tagEditDisabled = false;
                    //     this.tagDeletDisabled = false;
                    //     this.upButtonDisabled = false;
                    // }
                },
                changeTagStatus: function (tagStatus, data) {
                    var _self = this;
                    var param = {
                        condition: JSON.stringify({
                            id: yu.session.org.id
                        })
                    };
                    var selections = [];
                    if (data) {
                        selections.push(data);
                    } else {
                        selections = _self.$refs.reftable.selections;
                    }
                    if (selections.length == 0) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var updateTagStatus = [];
                    for (let index = 0; index < selections.length; index++) {
                        const element = selections[index];
                        if (_self.isSysManager && !_self.isCustManager) {
                            if (element.systemTag == '1' && element.ifAvailable != '0') {
                                updateTagStatus.push(element);
                            }
                        } else if (!_self.isSysManager && _self.isCustManager) {
                            if (element.systemTag == '0' && element.ifAvailable != '0') {
                                updateTagStatus.push(element);
                            }
                        }
                    }
                    if (_self.isSysManager && !_self.isCustManager && updateTagStatus.length == 0) {
                        _self.$message({ message: '请先选择一条未失效的系统标签', type: 'warning' });
                        return;
                    } else if (!_self.isSysManager && _self.isCustManager && updateTagStatus.length == 0) {
                        _self.$message({ message: '请先选择一条未失效的自定义标签', type: 'warning' });
                        return;
                    }
                    var tagNos = '';
                    var len = updateTagStatus.length;
                    for (var i = 0; i < len; i++) {
                        tagNos = updateTagStatus[i].tagNo + ',' + tagNos;
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.adminService + '/api/cimfmmtagtagsinfo/settagstatus',
                        data: {
                            tagNos: tagNos,
                            tagStatus: tagStatus
                        },
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == 0) {
                                var paramOrg = {
                                    condition: JSON.stringify({
                                        instu: yu.session.instu.code,
                                        org: yu.session.org.id,
                                        user: yu.session.userCode,
                                        roles: roles,
                                        groupNo: updateTagStatus[0].groupNo,
                                        flag: true
                                    })
                                };
                                _self.$refs.reftable.remoteData(paramOrg);
                                _self.$message({ message: '操作成功' });
                                yufp.util.butLogInfo(hashCode, '标签中心', tagStatus == '1' ? '标签上架' : '标签下架');
                            } else {
                                var paramOrg = {
                                    condition: JSON.stringify({
                                        instu: yu.session.instu.code,
                                        org: yu.session.org.id,
                                        user: yu.session.userCode,
                                        roles: roles,
                                        groupNo: updateTagStatus[0].groupNo,
                                        flag: true
                                    })
                                };
                                _self.$refs.reftable.remoteData(paramOrg);
                                _self.$message({ message: '操作失败', type: 'warning' });
                            }
                        }
                    });
                    // yufp.service.request({
                    //     method: 'POST',
                    //     url: backend.adminService + '/api/cimfmmtagtagsinfo/getorglevel',
                    //     data: param,
                    //     callback: function (code, message, response) {
                    //         if (code == 0) {
                    //             var json = response.data;
                    //             var orgLevel = json.orgLevel;
                    //             // 机构级别为1、2或标签分组为自定义
                    //             if (orgLevel <= '2' || _self.$refs.reftable.selections[0].groupName == '自定义') {
                    //                 var flag = true;
                    //                 var selections = _self.$refs.reftable.selections || [data];
                    //                 var dataLen = _self.$refs.reftable.total;
                    //                 if (selections.length < 1 && !data) {
                    //                     _self.$message({ message: '请先选择一条记录', type: 'warning' });
                    //                     return;
                    //                 }

                    //                 for (let i = 0; i < selections.length; i++) {
                    //                     if (selections[i].ifAvailable == '0') { // 系统标签并且标签还没有生效，不能进行上下架操作
                    //                         _self.$message({ message: '选择的记录中有标签没有到生效日期，不可以进行此操作', type: 'warning' });
                    //                         return;
                    //                     }
                    //                 }
                    //                 // 判断标签生命周期是否满足删除条件
                    //                 // for (var i = 0; i < selections.length; i++) {
                    //                 //   if (selections[i].tagLifecycle == 'PUBLISHED' || selections[i].tagLifecycle == 'RUNNING') {
                    //                 //     flag = false;
                    //                 //     break;
                    //                 //   }
                    //                 // }
                    //                 if (flag) {
                    //                     var tagNos = '';
                    //                     var len = selections.length;
                    //                     for (var i = 0; i < len; i++) {
                    //                         tagNos = selections[i].tagNo + ',' + tagNos;
                    //                     }
                    //                     yufp.service.request({
                    //                         method: 'POST',
                    //                         url: backend.adminService + '/api/cimfmmtagtagsinfo/settagstatus',
                    //                         data: {
                    //                             tagNos: tagNos,
                    //                             tagStatus: tagStatus
                    //                         },
                    //                         callback: function (code, message, response) {
                    //                             if (code == 0 && response.code == 0) {
                    //                                 if (_self.orgLevel > '2') {
                    //                                     var param = {
                    //                                         condition: JSON.stringify({
                    //                                             instu: yu.session.instu.code,
                    //                                             org: yu.session.org.id,
                    //                                             user: yu.session.userCode,
                    //                                             roles: roles,
                    //                                             groupNo: groupno,
                    //                                             flag: false
                    //                                         })
                    //                                     };
                    //                                     _self.$refs.reftable.remoteData(param);
                    //                                 } else {
                    //                                     var paramOrg = {
                    //                                         condition: JSON.stringify({
                    //                                             instu: yu.session.instu.code,
                    //                                             org: yu.session.org.id,
                    //                                             user: yu.session.userCode,
                    //                                             roles: roles,
                    //                                             groupNo: groupno,
                    //                                             flag: true
                    //                                         })
                    //                                     };
                    //                                     _self.$refs.reftable.remoteData(paramOrg);
                    //                                 }
                    //                                 _self.$message({ message: '操作成功' });
                    //                             } else {
                    //                                 if (_self.orgLevel > '2') {
                    //                                     _self.$refs.reftable.remoteData(param);
                    //                                 } else {
                    //                                     _self.$refs.reftable.remoteData(paramOrg);
                    //                                 }
                    //                                 _self.$message({ message: '操作失败', type: 'warning' });
                    //                             }
                    //                         }
                    //                     });
                    //                 }
                    //             } else {
                    //                 _self.$message({ message: '用户权限不够', type: 'warning' });
                    //             }
                    //         } else {
                    //             _self.$message({ message: '操作失败', type: 'warning' });
                    //         }
                    //     }
                    // });
                },
                // 标签上架
                uploadFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    // 标签审批申请
                    var _self = this;
                    var param = {
                        condition: JSON.stringify({
                            id: yu.session.org.id
                        })
                    };
                    // 获取用户机构级别
                    yufp.service.request({
                        method: 'POST',
                        url: backend.adminService + '/api/cimfmmtagtagsinfo/getorglevel',
                        data: param,
                        callback: function (code, message, response) {
                            if (code == 0) {
                                var json = response.data;
                                _self.orgLevel = json.orgLevel;
                            }
                        }
                    });
                    if (_self.orgLevel <= '2') {
                        // 锁定上架按钮
                        _self.upButtonDisabled = true;
                        var model = _self.$refs.reftable.selections[0];
                        // 判断审批标签状态是否满足上架条件
                        if (model.tagLifecycle == 'UNAPPROVED' || model.tagLifecycle == 'OFFLINE') {
                            var commitData = {};
                            commitData.bizSeqNo = model.tagNo; // 流程主键
                            commitData.applType = 'BQLCSP'; // 标签流程审批数据字典项
                            commitData.exv10 = '0';
                            commitData.custName = model.tagName;
                            commitData.custId = model.tagNo;
                            commitData.jobName = model.tagName;
                            commitData.paramMap = {
                                bussOpId: model.tagNo,
                                bussOpName: model.tagName
                            };
                            // 申请上架
                            var load = _self.$loading();
                            _self.$refs.yufpWfInit.wfInit(commitData, load);
                            // 解锁上架按钮
                            _self.upButtonDisabled = false;
                            // _self.$message({ message: '标签更新成功', type: 'warning' });
                            // _self.$refs.reftable.remoteData();
                        } else {
                            _self.$message({ message: '标签上架申请失败', type: 'warning' });
                        }
                    } else {
                        _self.$message({ message: '用户没有权限', type: 'warning' });
                    }
                    // // 锁定上架按钮
                    // _self.upButtonDisabled = true;
                    // var model = _self.$refs.reftable.selections[0];
                    // // 判断审批标签状态是否满足上架条件
                    // if (model.tagLifecycle == 'UNAPPROVED' || model.tagLifecycle == 'OFFLINE') {
                    //   var commitData = {};
                    //   commitData.bizSeqNo = model.tagNo; // 流程主键
                    //   commitData.applType = 'BQLCSP'; // 标签流程审批数据字典项
                    //   commitData.exv10 = '0';
                    //   commitData.custName = model.tagName;
                    //   commitData.custId = model.tagNo;
                    //   commitData.jobName = model.tagName;
                    //   commitData.paramMap = {
                    //     bussOpId: model.tagNo,
                    //     bussOpName: model.tagName
                    //   }
                    //   // 申请上架
                    //   _self.$refs.yufpWfInit.wfInit(commitData);
                    //   // 解锁上架按钮
                    //   _self.upButtonDisabled = false;
                    //   // _self.$message({ message: '标签更新成功', type: 'warning' });
                    //   // _self.$refs.reftable.remoteData();
                    // }
                    // else {
                    //   _self.$message({ message: '标签上架申请失败', type: 'warning' });
                    // }
                },
                // 手动标签下架
                downFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var _self = this;
                    var param = {
                        condition: JSON.stringify({
                            id: yu.session.org.id
                        })
                    };
                    // 获取用户机构级别
                    yufp.service.request({
                        method: 'POST',
                        url: backend.adminService + '/api/cimfmmtagtagsinfo/getorglevel',
                        data: param,
                        callback: function (code, message, response) {
                            if (code == 0) {
                                var json = response.data;
                                _self.orgLevel = json.orgLevel;
                            }
                        }
                    });
                    if (_self.orgLevel <= '2') {
                        vm.$confirm('确认下架?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(function () {
                            var selections = _self.$refs.reftable.selections[0];
                            var model = selections;
                            // 只有执行中的标签可以下架
                            if (model.tagLifecycle == 'RUNNING') {
                                // 设置标签生命周期
                                model.tagLifecycle = 'OFFLINE';
                                yufp.service.request({
                                    method: 'POST',
                                    data: model,
                                    url: backend.adminService + '/api/cimfmmtagtagsinfo/settaglifecycle',
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            model.disableDate = new Date();
                                            // 设置失效日期为当前日期
                                            yufp.service.request({
                                                method: 'POST',
                                                data: model,
                                                url: backend.adminService + '/api/cimfmmtagtagsinfo/updatetag',
                                                callback: function (code, message, response) {
                                                    if (code == 0) {
                                                        var paramOrg = {
                                                            condition: JSON.stringify({
                                                                instu: yu.session.instu.code,
                                                                org: yu.session.org.id,
                                                                user: yu.session.userCode,
                                                                roles: roles,
                                                                groupNo: groupno,
                                                                flag: true
                                                            })
                                                        };
                                                        _self.$refs.reftable.remoteData(paramOrg);
                                                        _self.$message({ message: '下架成功', type: 'warning' });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            } else {
                                _self.$message({ message: '只有运行中的标签可以下架', type: 'warning' });
                            }
                        });
                    } else {
                        _self.$message({ message: '用户没有权限', type: 'warning' });
                    }
                },
                /**
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                nodeClickFn: function (nodeData, node, self) {
                    // this.$refs.reftable.remoteData();
                    var _this = this;
                    var _self = this;
                    this.obj = nodeData;
                    // this.obj.groupName = nodeData.groupName;
                    // this.obj.groupType = nodeData.groupType;
                    // this.obj.groupDesc = nodeData.groupDesc;
                    this.obj.upGroupName = node.parent.data.groupName;
                    this.obj.groupNo = nodeData.groupNo;
                    // this.groupNos.push(nodeData.groupNo);
                    groupno = nodeData.groupNo;
                    if (this.obj.groupName.indexOf('自定义标签组') != -1) { // 如果是自定义标签组并且是最外层标签组，只能增加不能修改和删除
                        this.editbuttonDisabled = true;
                        this.deletbuttonDisabled = true;
                        this.detailbuttonDisabled = false;
                        this.addbuttonDisabled = false;
                    } else if (this.obj.upGroupName && this.obj.upGroupName.indexOf('自定义标签组') != -1) { // 如果是自定义标签组并且是子标签组则不能增加，只能修改删除
                        this.editbuttonDisabled = false;
                        this.deletbuttonDisabled = false;
                        this.detailbuttonDisabled = false;
                        this.addbuttonDisabled = true;
                    } else {
                        this.editbuttonDisabled = true;
                        this.deletbuttonDisabled = true;
                        this.detailbuttonDisabled = false;
                        this.addbuttonDisabled = true;
                    }
                    // else if (this.obj.groupName.indexOf('系统标签组') != -1 && this.isSysManager) {
                    //     this.editbuttonDisabled = true;
                    //     this.deletbuttonDisabled = true;
                    //     this.detailbuttonDisabled = false;
                    //     this.addbuttonDisabled = false;
                    // } else if (this.obj.upGroupName && this.obj.upGroupName.indexOf('系统标签组') != -1 && this.isSysManager) {
                    //     this.editbuttonDisabled = false;
                    //     this.deletbuttonDisabled = false;
                    //     this.detailbuttonDisabled = false;
                    //     this.addbuttonDisabled = true;
                    // } else {
                    //     this.editbuttonDisabled = true;
                    //     this.deletbuttonDisabled = true;
                    //     this.detailbuttonDisabled = false;
                    //     this.addbuttonDisabled = true;
                    // }
                    // var roleList = yufp.session.user.roles;
                    // var roles = [];
                    // for (let index = 0; index < roleList.length; index++) {
                    //   roles.push(roleList[index].code);
                    // }
                    // if (this.obj.systemGroup === '1') {
                    //     this.addFields[0].fields[0].params.dataUrl = '/api/cimfmmftagGrop/getSysTree';
                    //     this.updateFields[0].fields[0].params.dataUrl = '/api/cimfmmftagGrop/getSysTree';
                    // } else {
                    //     this.addFields[0].fields[0].params.dataUrl = '/api/cimfmmftagGrop/getCustomTree';
                    //     this.updateFields[0].fields[0].params.dataUrl = '/api/cimfmmftagGrop/getCustomTree';
                    // }
                    if (this.isSysManager && !this.isCustManager) {
                        this.tagAddDisabled = true;
                        this.tagEditDisabled = true;
                        this.tagDeletDisabled = true;
                    } else if (this.obj.parentNo === '1023' || this.obj.groupNo === '1023' || this.obj.groupNo === '0') { // 如果是自定义标签组，则右边增加,编辑，删除按钮禁止
                        this.tagAddDisabled = false;
                        this.tagEditDisabled = false;
                        this.tagDeletDisabled = false;
                        this.upButtonDisabled = false;
                    } else {
                        this.tagAddDisabled = true;
                        this.tagEditDisabled = true;
                        this.tagDeletDisabled = true;
                        this.upButtonDisabled = true;
                    }

                    _self.$refs.query.$children['0'].resetFields();
                    var num = '';
                    num = node.level;
                    var ob = node;
                    // 循环遍历，当大于或等于第二节点判断当前节点是否为自定义标签，如果是禁用标签维护功能
                    for (num; num >= 2; num--) {
                        if (ob.data.groupNo == '1023') {
                            _this.zdyButton = true;
                        } else {
                            _this.zdyButton = false;
                        }
                        ob = ob.parent;
                    }
                    // var param = {
                    //     condition: JSON.stringify({
                    //         id: yu.session.org.id
                    //     })
                    // };
                    // 获取用户机构级别
                    // yufp.service.request({
                    //     method: 'POST',
                    //     url: backend.adminService + '/api/cimfmmtagtagsinfo/getorglevel',
                    //     data: param,
                    //     callback: function (code, message, response) {
                    //         if (code == 0) {
                    //             var json = response.data;
                    //             _self.orgLevel = json.orgLevel;
                    //         }
                    //     }
                    // });
                    // 设置用户权限
                    var instu = yu.session.instu.code;
                    var org = yu.session.org.id;
                    var user = yu.session.userCode;
                    // var roles = new Array();
                    // for (var i = 0; i < yu.session.roles.length; i++) {
                    //   roles[i] = yu.session.roles[i].code;
                    // }
                    // if (this.obj.groupNo != '0') {
                    //     // 机构级别为3、4
                    //     if (_self.orgLevel > '2') {
                    //         var param = {};
                    //         param = {
                    //             condition: JSON.stringify({
                    //                 groupNo: this.obj.groupNo,
                    //                 instu: instu,
                    //                 org: org,
                    //                 user: user,
                    //                 roles: roles,
                    //                 flag: false
                    //             })
                    //         };
                    //     } else {
                    //         param = {
                    //             condition: JSON.stringify({
                    //                 groupNo: this.obj.groupNo,
                    //                 instu: instu,
                    //                 org: org,
                    //                 user: user,
                    //                 roles: roles,
                    //                 flag: true
                    //             })
                    //         };
                    //     }
                    //     this.$refs.reftable.remoteData(param);
                    // } else {
                    //     var paramRoot = {};
                    //     // 机构级别为3、4
                    //     if (_self.orgLevel > '2') {
                    //         paramRoot = {
                    //             condition: JSON.stringify({
                    //                 groupNo: this.obj.groupNo,
                    //                 instu: instu,
                    //                 org: org,
                    //                 user: user,
                    //                 roles: roles,
                    //                 flag: false
                    //             })
                    //         };
                    //     } else {
                    //         paramRoot = {
                    //             condition: JSON.stringify({
                    //                 groupNo: this.obj.groupNo,
                    //                 instu: instu,
                    //                 org: org,
                    //                 user: user,
                    //                 roles: roles,
                    //                 flag: true
                    //             })
                    //         };
                    //     }
                    //     this.$refs.reftable.remoteData(paramRoot);
                    // }
                    var paramRoot = {
                        condition: JSON.stringify({
                            groupNo: this.obj.groupNo,
                            instu: instu,
                            org: org,
                            user: user,
                            roles: roles,
                            flag: true
                        })
                    };
                    this.$refs.reftable.remoteData(paramRoot);
                    // yufp.service.request({
                    //   method: 'GET',
                    //   url: backend.adminService + '/api/cimfmmtagtagsinfo/getTagByGroupNo',
                    //   data: param,
                    //   callback: function (code, response, message) {
                    //     if (code == 0) {
                    //       var data = response.data;
                    //       vm.$refs.reftable.remoteData(param);
                    //     }
                    //   }
                    // });
                },
                switchStatus: function (viewType, editable) {
                    this.viewType = viewType;
                    this.dialogVisible = true;
                    this.formDisabled = !editable;
                    this.updateButtons[0].hidden = !editable;
                    this.updateButtons[1].hidden = !editable;
                },
                /** 新增方法 */
                addFn: function () {
                    var _self = this;
                    // 获取机构权限等级
                    var param = {
                        condition: JSON.stringify({
                            id: yu.session.org.id
                        })
                    };
                    _self.switchStatus('ADD', true);
                    _self.dialogVisibleAdd = true;
                    _self.$nextTick(function () {
                        _self.$refs.refformAdd.resetFields();
                        _self.$refs.refformAdd.$refs.groupNo[0].refreshData();
                        if (this.obj.groupNo) {
                            _self.$refs.refformAdd.formModel.groupNo = this.obj.groupNo;
                        }
                        _self.$refs.refformAdd.formModel.tagStatus = '0';
                        // if (_self.$refs.refformAdd.formModel.groupNo == null) {
                        //     _self.$message({ message: '未选择标签分组', type: 'warning' });
                        //     _self.dialogVisibleAdd = false;
                        // }
                        if (_self.$refs.refformAdd.formModel.groupNo == 'error') {
                            _self.$message({ message: '请重新选择分组', type: 'warning' });
                            _self.dialogVisibleAdd = false;
                            return;
                        }
                        _self.$refs.refformAdd.formModel.parentNo = '无';
                        _self.$refs.refformAdd.formModel.timelinesType = 'ALWAYS';
                        _self.$refs.refformAdd.formModel.processMode = 'STATISTICS';
                        _self.$refs.refformAdd.formModel.updateFrequency = 'MONTH';
                        _self.$refs.refformAdd.formModel.tagApply = 'MARKETING'; //
                        _self.$refs.refformAdd.formModel.tagLifecycle = 'UNAPPROVED';
                        _self.$refs.refformAdd.formModel.ifAvailable = '1';
                        _self.$refs.refformAdd.formModel.tagPri = '1';
                        _self.$refs.refformAdd.formModel.createSys = 'CRM'; //
                        _self.$refs.refformAdd.formModel.createOrg = yufp.session.org.id;
                        _self.$refs.refformAdd.formModel.availableDate = new Date();
                        _self.$refs.refformAdd.formModel.disableDate = new Date(9999, 12, 0);
                    });
                    // yufp.service.request({
                    //     method: 'POST',
                    //     url: backend.adminService + '/api/cimfmmtagtagsinfo/getorglevel',
                    //     data: param,
                    //     callback: function (code, message, response) {
                    //         if (code == 0) {
                    //             var json = response.data;
                    //             var orgLevel = json.orgLevel;
                    //             _self.orgLevel = orgLevel;
                    //             // 判断机构等级为1、2，标签分组不为自定义
                    //             if (orgLevel <= '2' && _self.obj.groupNo != '1705') {
                    //                 _self.switchStatus('ADD', true);
                    //                 _self.dialogVisibleAdd = true;
                    //                 _self.$nextTick(function () {
                    //                     _self.$refs.refformAdd.resetFields();
                    //                     _self.$refs.refformAdd.formModel.groupNo = this.obj.groupNo;
                    //                     _self.$refs.refformAdd.formModel.tagStatus = '0';
                    //                     if (_self.$refs.refformAdd.formModel.groupNo == null) {
                    //                         _self.$message({ message: '未选择标签分组', type: 'warning' });
                    //                         _self.dialogVisibleAdd = false;
                    //                     }
                    //                     if (_self.$refs.refformAdd.formModel.groupNo == 'error') {
                    //                         _self.$message({ message: '请重新选择分组', type: 'warning' });
                    //                         _self.dialogVisibleAdd = false;
                    //                         return;
                    //                     }
                    //                     _self.$refs.refformAdd.formModel.parentNo = '无';
                    //                     _self.$refs.refformAdd.formModel.timelinesType = 'ALWAYS';
                    //                     _self.$refs.refformAdd.formModel.processMode = 'STATISTICS';
                    //                     _self.$refs.refformAdd.formModel.updateFrequency = 'MONTH';
                    //                     _self.$refs.refformAdd.formModel.tagApply = 'MARKETING'; //
                    //                     _self.$refs.refformAdd.formModel.tagLifecycle = 'UNAPPROVED';
                    //                     _self.$refs.refformAdd.formModel.ifAvailable = '1';
                    //                     _self.$refs.refformAdd.formModel.tagPri = '1';
                    //                     _self.$refs.refformAdd.formModel.createSys = 'CRM'; //
                    //                     _self.$refs.refformAdd.formModel.availableDate = new Date();
                    //                     _self.$refs.refformAdd.formModel.disableDate = new Date(9999, 12, 0);
                    //                 });
                    //             } else {
                    //                 _self.$message({ message: '用户权限不够', type: 'warning' });
                    //             }
                    //         }
                    //     }
                    // });
                },
                /** 修改方法 */
                modifyFn: function (data) {
                    var _self = this;
                    var selections = [];
                    if (data) {
                        selections.push(data);
                    } else {
                        selections = _self.$refs.reftable.selections;
                    }
                    if (selections.length != 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    if (selections[0].systemTag != '0' || selections[0].tagStatus == '1') {
                        _self.$message({ message: '请选择一条下架的自定义标签记录', type: 'warning' });
                        return;
                    }
                    // 判断标签生命周期
                    if (selections[0].tagLifecycle == 'UNAPPROVED' || selections[0].tagLifecycle == 'OFFLINE') {
                        _self.dialogVisibleUpdate = true;
                        _self.switchStatus('EDIT', true);
                        _self.$nextTick(function () {
                            var obj = _self.$refs.reftable.selections[0];
                            _self.$refs.refformUpdate.formModel.groupNo = obj.groupNo;
                            _self.$refs.refformUpdate.formModel.tagName = obj.tagName;
                            _self.$refs.refformUpdate.formModel.timelinesType = obj.timelinesType;
                            _self.$refs.refformUpdate.formModel.processMode = obj.processMode;
                            _self.$refs.refformUpdate.formModel.updateFrequency = obj.updateFrequency;
                            _self.$refs.refformUpdate.formModel.tagApply = obj.tagApply;
                            _self.$refs.refformUpdate.formModel.tagLifecycle = obj.tagLifecycle;
                            _self.$refs.refformUpdate.formModel.tagPri = obj.tagPri;
                            _self.$refs.refformUpdate.formModel.availableDate = obj.availableDate;
                            _self.$refs.refformUpdate.formModel.disableDate = obj.disableDate;

                            _self.$refs.refformUpdate.formModel.parentNo = '无';
                            _self.$refs.refformUpdate.formModel.createSys = 'CRM';
                            _self.$refs.refformUpdate.formModel.ifAvailable = '1';
                            yufp.extend(_self.$refs.refformUpdate.formModel, obj);
                        });
                    } else {
                        _self.$message({ message: '只有暂存和下架的标签可以更新', type: 'warning' });
                        return;
                    }
                    // var param = {
                    //     condition: JSON.stringify({
                    //         id: yu.session.org.id
                    //     })
                    // };
                    // yufp.service.request({
                    //     method: 'POST',
                    //     url: backend.adminService + '/api/cimfmmtagtagsinfo/getorglevel',
                    //     data: param,
                    //     callback: function (code, message, response) {
                    //         if (code == 0) {
                    //             var json = response.data;
                    //             var orgLevel = json.orgLevel;
                    //             _self.orgLevel = orgLevel;
                    //             // 机构等级为1、2，标签分组为自定义标签
                    //             if (orgLevel <= '2') {
                    //                 if (_self.$refs.reftable.selections.length != 1) {
                    //                     _self.$message({ message: '请先选择一条记录', type: 'warning' });
                    //                     return;
                    //                 }
                    //                 if (_self.$refs.reftable.selections[0].tagStatus == '1') {
                    //                     _self.$message({ message: '上架的标签不能修改', type: 'warning' });
                    //                     return;
                    //                 }
                    //                 // 判断标签生命周期
                    //                 if (_self.$refs.reftable.selections[0].tagLifecycle == 'UNAPPROVED' || _self.$refs.reftable.selections[0].tagLifecycle == 'OFFLINE') {
                    //                     _self.dialogVisibleUpdate = true;
                    //                     _self.switchStatus('EDIT', true);
                    //                     _self.$nextTick(function () {
                    //                         var obj = _self.$refs.reftable.selections[0];
                    //                         _self.$refs.refformUpdate.formModel.groupNo = obj.groupNo;
                    //                         _self.$refs.refformUpdate.formModel.tagName = obj.tagName;
                    //                         _self.$refs.refformUpdate.formModel.timelinesType = obj.timelinesType;
                    //                         _self.$refs.refformUpdate.formModel.processMode = obj.processMode;
                    //                         _self.$refs.refformUpdate.formModel.updateFrequency = obj.updateFrequency;
                    //                         _self.$refs.refformUpdate.formModel.tagApply = obj.tagApply;
                    //                         _self.$refs.refformUpdate.formModel.tagLifecycle = obj.tagLifecycle;
                    //                         _self.$refs.refformUpdate.formModel.tagPri = obj.tagPri;
                    //                         _self.$refs.refformUpdate.formModel.availableDate = obj.availableDate;
                    //                         _self.$refs.refformUpdate.formModel.disableDate = obj.disableDate;

                    //                         _self.$refs.refformUpdate.formModel.parentNo = '无';
                    //                         _self.$refs.refformUpdate.formModel.createSys = 'CRM';
                    //                         _self.$refs.refformUpdate.formModel.ifAvailable = '1';
                    //                         yufp.extend(_self.$refs.refformUpdate.formModel, obj);
                    //                     });
                    //                 } else {
                    //                     _self.$message({ message: '只有暂存和下架的标签可以更新', type: 'warning' });
                    //                     return;
                    //                 }
                    //             } else {
                    //                 _self.$message({ message: '用户权限不够', type: 'warning' });
                    //             }
                    //         }
                    //     }
                    // });
                },
                /** 详情方法 */
                infoFn: function (data) {
                    if (this.$refs.reftable.selections.length != 1 && !data) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var editData = this.$refs.reftable.selections[0] || data;
                    this.dialogVisibleSts = true;
                    this.switchStatus('DETAIL', false);
                    this.stsButtons[1].hidden = true;
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.refformSts.formModel, editData);
                    });
                },
                /** 删除方法 */
                deleteFn: function (data) {
                    var _self = this;
                    var selections = [];
                    if (data) {
                        selections.push(data)
                    } else {
                        selections = _self.$refs.reftable.selections;
                    }
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var delTags = [];
                    for (var i = 0; i < selections.length; i++) {
                        if (selections[i].tagLifecycle == 'PUBLISHED' || selections[i].tagLifecycle == 'RUNNING') {
                            break;
                        }
                        if (selections[i].systemTag != '0') {
                            break;
                        }
                        if (selections[i].tagStatus == '1') {
                            break;
                        }
                        delTags.push(selections[i]);
                    }
                    if (delTags.length < 1) {
                        _self.$message({ message: '请先选择一条下架自定义标签记录', type: 'warning' });
                        return;
                    }
                    vm.$confirm('该操作将级联删除客户自定义标签，确认删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function () {
                        var tagNos = '';
                        var len = delTags.length;
                        for (var i = 0; i < len; i++) {
                            tagNos = delTags[i].tagNo + ',' + tagNos;
                        }
                        yufp.service.request({
                            method: 'POST',
                            url: backend.adminService + '/api/cimfmmtagtagsinfo/deletetags',
                            data: { tagNos: tagNos },
                            callback: function (code, message, response) {
                                if (code == 0 && response.code == 0) {
                                    var paramOrg = {
                                        condition: JSON.stringify({
                                            instu: yu.session.instu.code,
                                            org: yu.session.org.id,
                                            user: yu.session.userCode,
                                            roles: roles,
                                            groupNo: delTags[0].groupNo,
                                            flag: true
                                        })
                                    };
                                    _self.$refs.mytree.remoteData();
                                    _self.$refs.reftable.remoteData(paramOrg);
                                    yufp.util.butLogInfo(hashCode, '标签中心', '删除标签');
                                    _self.$message({ message: '操作成功' });
                                } else {
                                    var paramOrg = {
                                        condition: JSON.stringify({
                                            instu: yu.session.instu.code,
                                            org: yu.session.org.id,
                                            user: yu.session.userCode,
                                            roles: roles,
                                            groupNo: delTags[0].groupNo,
                                            flag: true
                                        })
                                    };
                                    _self.$refs.reftable.remoteData(paramOrg);
                                    _self.$message({ message: response.message, type: 'warning' });
                                }
                            }
                        });
                    });
                    // yufp.service.request({
                    //     method: 'POST',
                    //     url: backend.adminService + '/api/cimfmmtagtagsinfo/getorglevel',
                    //     data: param,
                    //     callback: function (code, message, response) {
                    //         if (code == 0) {
                    //             var json = response.data;
                    //             var orgLevel = json.orgLevel;
                    //             // 机构级别为1、2或标签分组为自定义
                    //             if (orgLevel <= '2' || _self.$refs.reftable.selections[0].groupName == '自定义') {
                    //                 var flag = true;
                    //                 var selections = _self.$refs.reftable.selections || [data];
                    //                 var dataLen = _self.$refs.reftable.total;
                    //                 if (selections.length < 1 && !data) {
                    //                     _self.$message({ message: '请先选择一条记录', type: 'warning' });
                    //                     return;
                    //                 }
                    //                 // 判断标签生命周期是否满足删除条件
                    //                 for (var i = 0; i < selections.length; i++) {
                    //                     if (selections[i].tagLifecycle == 'PUBLISHED' || selections[i].tagLifecycle == 'RUNNING') {
                    //                         flag = false;
                    //                         break;
                    //                     }
                    //                 }
                    //                 if (flag) {
                    //                     vm.$confirm('确认删除?', '提示', {
                    //                         confirmButtonText: '确定',
                    //                         cancelButtonText: '取消',
                    //                         type: 'warning'
                    //                     }).then(function () {
                    //                         var tagNos = '';
                    //                         var len = selections.length;
                    //                         for (var i = 0; i < len; i++) {
                    //                             tagNos = selections[i].tagNo + ',' + tagNos;
                    //                         }
                    //                         yufp.service.request({
                    //                             method: 'POST',
                    //                             url: backend.adminService + '/api/cimfmmtagtagsinfo/deletetags',
                    //                             data: { tagNos: tagNos },
                    //                             callback: function (code, message, response) {
                    //                                 if (code == 0 && response.code == 0) {
                    //                                     if (_self.orgLevel > '2') {
                    //                                         var param = {
                    //                                             condition: JSON.stringify({
                    //                                                 instu: yu.session.instu.code,
                    //                                                 org: yu.session.org.id,
                    //                                                 user: yu.session.userCode,
                    //                                                 roles: roles,
                    //                                                 groupNo: groupno,
                    //                                                 flag: false
                    //                                             })
                    //                                         };
                    //                                         _self.$refs.reftable.remoteData(param);
                    //                                     } else {
                    //                                         var paramOrg = {
                    //                                             condition: JSON.stringify({
                    //                                                 instu: yu.session.instu.code,
                    //                                                 org: yu.session.org.id,
                    //                                                 user: yu.session.userCode,
                    //                                                 roles: roles,
                    //                                                 groupNo: groupno,
                    //                                                 flag: true
                    //                                             })
                    //                                         };
                    //                                         _self.$refs.reftable.remoteData(paramOrg);
                    //                                     }
                    //                                     _self.$message({ message: '操作成功' });
                    //                                 } else {
                    //                                     if (_self.orgLevel > '2') {
                    //                                         _self.$refs.reftable.remoteData(param);
                    //                                     } else {
                    //                                         _self.$refs.reftable.remoteData(paramOrg);
                    //                                     }
                    //                                     _self.$message({ message: '操作失败', type: 'warning' });
                    //                                 }
                    //                             }
                    //                         });
                    //                     });
                    //                 } else {
                    //                     _self.$message({ message: '只有未审批的标签可以删除', type: 'warning' });
                    //                 }
                    //             } else {
                    //                 _self.$message({ message: '用户权限不够', type: 'warning' });
                    //             }
                    //         } else {
                    //             _self.$message({ message: '操作失败', type: 'warning' });
                    //         }
                    //     }
                    // });
                },
                gantFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var _self = this;
                    var param = {
                        condition: JSON.stringify({
                            id: yu.session.org.id
                        })
                    };
                    yufp.service.request({
                        method: 'POST',
                        url: backend.adminService + '/api/cimfmmtagtagsinfo/getorglevel',
                        data: param,
                        callback: function (code, message, response) {
                            if (code == 0) {
                                var json = response.data;
                                var orgLevel = json.orgLevel;
                                // 标签分组不为自定义
                                if (_self.$refs.reftable.selections[0].groupNo != '1705') {
                                    _self.dialogVisible2 = true;
                                    // 设置授权信息维护界面关联标签编号
                                    _self.tagNoPowerVisible = _self.$refs.reftable.selections[0].tagNo;
                                    var param = {
                                        condition: JSON.stringify({
                                            tagNo: _self.$refs.reftable.selections[0].tagNo
                                        })
                                    };
                                    _self.$nextTick(function () {
                                        _self.$refs.reftable2.remoteData(param);
                                    });
                                } else {
                                    _self.$message({ message: '用户权限不够', type: 'warning' });
                                }
                            }
                        }
                    });
                },
                addGroupFn: function (data) {
                    if (data) {
                        this.obj = data;
                    }
                    if (!data && this.addbuttonDisabled && this.obj.groupName != '全部目录') {
                        this.$message({ message: '请选择一条父级节点' });
                        return;
                    } else {
                        var _self = this;
                        _self.formDisabled1 = true;
                        _self.dialogVisible4 = true;
                        _self.groupButtons[0].hidden = false;
                        _self.$nextTick(function () {
                            _self.$refs.refform2.resetFields();
                            _self.$refs.refform2.formModel.upGroupName = _self.obj.groupName;
                        });
                    }
                },

                // 标签分组删除
                deletGroupFn: function () {
                    var _self = this;
                    var param = {
                        condition: JSON.stringify({
                            groupNo: _self.obj.groupNo
                        })
                    };
                    if (_self.obj.children.length != 0) {
                        vm.$message({ message: '无法删除有子分组的分组!', type: 'warning' });
                        return;
                    }
                    if (_self.obj.groupName == '自定义' && _self.obj.upGroupName == '自定义标签') {
                        vm.$message({ message: '无法删除自定义标签!', type: 'warning' });
                        return;
                    }
                    vm.$confirm('确认删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function () {
                        // 先查询有没有子节点
                        // 再查询子节点有没有标签
                        yufp.service.request({
                            url: backend.adminService + '/api/cimfmmtagtagsinfo/getTagByGroupNo',
                            method: 'get',
                            data: param,
                            callback: function (code, message, response) {
                                if (code == '0') {
                                    if (response.data.length == 0) {
                                        yufp.service.request({
                                            url: backend.adminService + '/api/cimfmmftagGrop/deleteTagGroup',
                                            method: 'post',
                                            data: param,
                                            callback: function (code, message, response) {
                                                if (code == 0) {
                                                    vm.$message({ message: '删除成功!' });
                                                    vm.$refs.mytree.remoteData();
                                                    yufp.util.butLogInfo(hashCode, '标签中心', '删除标签分组');
                                                } else {
                                                    vm.$message({ message: '删除失败!', type: 'warning' });
                                                }
                                            }
                                        });
                                    } else {
                                        vm.$refs.mytree.remoteData();
                                        vm.$message({ message: '此分组下定义有标签，不可删除！', type: 'warning' });
                                        return;
                                    }
                                } else {
                                    vm.$message({ message: '删除失败!', type: 'warning' });
                                }
                            }
                        });
                    });
                    // 关闭分组按钮
                    _self.addbuttonDisabled = true;
                    _self.buttonDisabled = true;
                    _self.obj.groupNo = 'error';
                },
                modifyGroupFn: function () {
                    this.dialogVisible3 = true;
                    this.formDisabled1 = false;
                    this.groupButtons[0].hidden = false;
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.refform1.formModel, this.obj);
                        // 使用clone函数将修改中的查询树刷新一遍·
                        this.$refs.refform1.formModel.upGroupName = this.obj.upGroupName;
                        var temp = yufp.clone(this.groupFields[0].fields[0].params);
                        this.groupFields[0].fields[0].params = yufp.clone(temp);
                    });
                },
                detailGroupFn: function () {
                    this.formDisabled1 = true;
                    this.dialogVisible5 = true;
                    this.groupButtons[0].hidden = true;
                    this.groupButtons[1].hidden = false;
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.refform3.formModel, this.obj);
                    });
                },

                // 获取标签分析表格数据
                getFrequencyTableData: function (dateRange) {
                    var param = {};
                    var ids = [];
                    if (this.$refs.reftable.selections.length) {
                        for (var i = 0; i < this.$refs.reftable.selections.length; i++) {
                            ids.push(this.$refs.reftable.selections[i].tagNo);
                        }
                    }
                    if (dateRange) {
                        param = {
                            groupNos: this.groupNos.join(),
                            tagNos: ids.join(),
                            startTime: dateRange[0],
                            endTime: dateRange[1]
                        };
                    } else {
                        param = {
                            groupNos: this.groupNos.join(),
                            tagNos: ids.join()
                        };
                    }
                    this.analysisVisible = true;
                    var _self = this;
                    this.$nextTick(function () {
                        _self.$refs.frequencytable.remoteData(param);
                        if (!dateRange) {
                            _self.$refs.frequencyCountTable.remoteData(param);
                        }
                    });
                },

                // 点击分析表格
                toAnalysis: function () {
                    this.getFrequencyTableData();
                },
                handleAnalyseClose: function () {
                    this.groupNames = '';
                    this.groupNos = [];
                    this.$refs.analysTree.setCheckedKeys([], true);
                    var _this = this;
                    this.$nextTick(function () {
                        _this.analysisVisible = false;
                        _this.childPopoverVisible = false;
                    });
                },
                handleCurrentChange: function () {
                    var list = this.$refs.analysTree.getCheckedNodes(true);
                    var arr = [];
                    var names = [];
                    for (var i = 0; i < list.length; i++) {
                        arr.push(list[i].groupNo);
                        names.push(list[i].groupName);
                    }
                    this.groupNos = arr;
                    this.groupNames = names.join();
                },
                selectGroups: function () {
                    this.getFrequencyTableData();
                    this.childPopoverVisible = false;
                },
                clearSelectGroup: function () {
                    this.$refs.analysTree.setCheckedKeys([], true);
                    this.groupNames = '';
                    this.groupNos = [this.obj.groupNo];
                },

                // 切换开始时间和结束时间
                handleDateRangeChange: function (dateRange) {
                    if (dateRange) {
                        var startTime = new Date(dateRange[0]);
                        var endTime = new Date(dateRange[1]);
                        if (parseInt(Math.abs(startTime - endTime) / 1000 / 60 / 60 / 24) > 30) {
                            this.$message.warning('起始时间与终止时间不能超过30天！');
                            return false;
                        }
                    }
                    this.getFrequencyTableData(dateRange || []);
                },
                firstFindTags: function () {
                    var _this = this;
                    var groupNo = '';
                    if (_this.isSysManager) {
                        groupNo = '1';
                    } else {
                        groupNo = '0';
                    }
                    var param = {
                        condition: JSON.stringify({
                            id: yu.session.org.id
                        })
                    };
                    // 设置用户权限
                    var instu = yu.session.instu.code;
                    var org = yu.session.org.id;
                    var user = yu.session.userCode;
                    var paramRoot = {
                        condition: JSON.stringify({
                            groupNo: groupNo,
                            instu: instu,
                            org: org,
                            user: user,
                            roles: roles,
                            flag: true
                        })
                    };
                    this.$refs.reftable.remoteData(paramRoot);
                    // if (groupNo == '1') {
                    //     // 机构级别为3、4
                    //     if (_this.orgLevel > '2') {
                    //         var param = {};
                    //         param = {
                    //             condition: JSON.stringify({
                    //                 groupNo: groupNo,
                    //                 instu: instu,
                    //                 org: org,
                    //                 user: user,
                    //                 roles: roles,
                    //                 flag: false
                    //             })
                    //         };
                    //     } else {
                    //         param = {
                    //             condition: JSON.stringify({
                    //                 groupNo: groupNo,
                    //                 instu: instu,
                    //                 org: org,
                    //                 user: user,
                    //                 roles: roles,
                    //                 flag: true
                    //             })
                    //         };
                    //     }
                    //     this.$refs.reftable.remoteData(param);
                    // } else {
                    //     var paramRoot = {};
                    //     // 机构级别为3、4
                    //     if (_this.orgLevel > '2') {
                    //         paramRoot = {
                    //             condition: JSON.stringify({
                    //                 groupNo: groupNo,
                    //                 instu: instu,
                    //                 org: org,
                    //                 user: user,
                    //                 roles: roles,
                    //                 flag: false
                    //             })
                    //         };
                    //     } else {
                    //         paramRoot = {
                    //             condition: JSON.stringify({
                    //                 groupNo: groupNo,
                    //                 instu: instu,
                    //                 org: org,
                    //                 user: user,
                    //                 roles: roles,
                    //                 flag: true
                    //             })
                    //         };
                    //     }
                    //     this.$refs.reftable.remoteData(paramRoot);
                    // }
                }
            }
        });
    };
});