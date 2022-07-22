/**
 * 资源对象配置管理
 * hujun3
 */
define([
    './custom/widgets/js/yufpOrgTree.js',
    './custom/widgets/js/yufpExtTree.js'
], function(require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function(hashCode, data, cite) {
        // 注册该功能要用到的数据字典
        yufp.lookup.reg('DATA_STS,OBJECT_TYPE,RESOURCE_TYPE');
        var leafNodes = [];
        // 创建virtual model
        yufp.custom.vue({
            el: '#resourceSet',
            data: function() {
                var em = this;
                return {
                    i: 0,
                    typeOptions: [],
                    resetButton: !yufp.session.checkCtrl('reset'), // 重置选择按钮控制
                    setOtherButton: !yufp.session.checkCtrl('setOther'), // 反选选择按钮控制
                    selectAllButton: !yufp.session.checkCtrl('selectAll'), // 全选选择按钮控制
                    copyButton: !yufp.session.checkCtrl('copy'), // 复制选择按钮控制
                    uploadButton: !yufp.session.checkCtrl('upload'), // 导出选择按钮控制
                    treeUrl: backend.appOcaService + '/api/adminsmorg/orgtreequery?orgId=' + yufp.session.org.id + '& orgSts=A',
                    orgRootId: yufp.session.org.code, // 根节点ID
                    reourceUrl: backend.appOcaService + '/api/adminsmauthteco/menutreequery?sysId=' + yufp.session.logicSys.id,
                    showObjectFlag: 'R', // 对象标识
                    sourObjectId: '', // 复制原ID
                    sourObjectType: 'R', // 复制源类型-默认是角色
                    builObjectType: 'R', // 获取复制数据的对象类型-默认是角色
                    builObjectId: '', // 获取复制数据的对象ID
                    nodeCheckNum: 0, // 资源树节点被勾选操作的次数
                    resData: false, // 查询出的资源数据
                    ifselectData: false, // 是否选中了数据
                    filterSub: [], // 数据权限明细数据字典数据
                    // ifCopyFlag: false,//是否启动复制
                    dialogVisible: false, // 复制dialog
                    roleShow: false,
                    dptShow: false,
                    userShow: false,
                    orgTreeShow: false,
                    orgTreeNodes: null,
                    formFields: [{
                        field: 'objectType',
                        type: 'select',
                        dataCode: 'OBJECT_TYPE',
                        change: function(value) {
                            em.showObjectFlag = value;
                            em.builObjectType = value;
                            em.sourObjectType = value;
                        }
                    }],
                    queryButtons: [{
                            label: '导出',
                            icon: 'yx-folder-upload',
                            click: function() {
                                em.exportInfoFn();
                            }
                        },
                        {
                            label: '复制',
                            icon: 'yx-copy',
                            click: function() {
                                em.copyInfoFn();
                            }
                        }
                    ],
                    resourcButtons: [{
                            label: '全选',
                            icon: 'yx-cloud-check',
                            click: function() {
                                em.selectAllFn();
                            }
                        },
                        {
                            label: '反选',
                            icon: 'yx-checkmark2',
                            click: function() {
                                em.reSelectFn();
                            }
                        },
                        {
                            label: '重置',
                            icon: 'yx-cross',
                            click: function() {
                                em.reSetFn();
                            }
                        }
                    ],
                    resourceForm: {
                        resourceType: ''
                    },
                    roleGrid: {
                        query: {
                            orgId: '',
                            roleCode: '',
                            roleName: ''
                        },
                        height: yufp.custom.viewSize().height - 155,
                        currentRow: null,
                        checkbox: true,
                        dataUrl: backend.appOcaService + '/api/adminsmrole/querybyrolests',
                        dataParams: {
                            condition: JSON.stringify({
                                roleSts: 'A',
                                orgId: yufp.session.org.id
                            })
                        },
                        tableColumns: [
                            // { label: '角色ID', prop: 'roleId' },
                            { label: '角色名称', prop: 'roleName', width: 150, resizable: true },
                            { label: '角色代码', prop: 'roleCode', width: 140, resizable: true },
                            { label: '所属机构', prop: 'orgName', resizable: true }
                        ]
                    },
                    dptGrid: {
                        query: {
                            dptCde: '',
                            dptName: '',
                            belongOrgId: ''
                        },
                        height: yufp.custom.viewSize().height - 155,
                        checkbox: false,
                        currentRow: null,
                        dataUrl: backend.appOcaService + '/api/adminsmdpt/list',
                        dataParams: {
                            condition: JSON.stringify({
                                dptSts: 'A',
                                belongOrgId: yufp.session.org.id
                            })
                        },
                        tableColumns: [
                            // { label: 'ID', prop: 'dptId' },
                            { label: '部门名称', prop: 'dptName', width: 170, resizable: true },
                            { label: '部门代码', prop: 'dptCde', width: 150, resizable: true },
                            { label: '所属机构', prop: 'orgName', resizable: true }


                        ]
                    },
                    userGrid: {
                        query: {
                            userInfo: '',
                            orgId: ''
                        },
                        height: yufp.custom.viewSize().height - 155,
                        checkbox: false,
                        currentRow: null,
                        dataUrl: backend.appOcaService + '/api/adminsmuser/querypage',
                        dataParams: {
                            condition: JSON.stringify({
                                userSts: 'A',
                                orgId: yufp.session.org.id
                            })
                        },
                        tableColumns: [
                            { label: '姓名', prop: 'userName', width: 160, resizable: true },
                            { label: '登录代码', prop: 'loginCode', width: 150, resizable: true },
                            { label: '所属部门', prop: 'dptName', resizable: true }


                        ]
                    },
                    orgTree: {
                        nowNode: '',
                        height: yufp.custom.viewSize().height - 130
                    },
                    menuTree: {
                        loading: false,
                        height: yufp.custom.viewSize().height - 130,
                        treeCheckBox: true
                    },
                    savebutton: false

                };
            },
            methods: {
                exportInfoFn: function() { // 导出数据
                    var objectId = '',
                        objectType = '';
                    if (this.ifselectData) {
                        if (this.showObjectFlag === 'R') { // 角色
                            objectId = this.roleGrid.currentRow.roleId;
                        } else if (this.showObjectFlag === 'U') { // 用户
                            objectId = this.userGrid.currentRow.userId;
                        } else if (this.showObjectFlag === 'D') { // 部门
                            objectId = this.dptGrid.currentRow.dptId;
                        } else if (this.showObjectFlag === 'G') { // 机构
                            objectId = this.orgTree.nowNode.orgId;
                        }
                    }
                    objectType = this.showObjectFlag;
                    var resourceType = ['M', 'C'];
                    var param = {
                        objectId: objectId,
                        objectType: objectType,
                        resourceType: resourceType,
                        sysId: yufp.session.logicSys.id
                    };

                    var params = {};
                    params.url = backend.appOcaService + '/api/adminsmauthteco/export';
                    params.url = yufp.service.getUrl(params);
                    params.url += '?access_token=' + yufp.service.getToken();
                    params.url += '&condition=' + encodeURI(JSON.stringify(param));
                    window.open(params.url);
                    yufp.util.butLogInfo(hashCode, '功能授权', '导出');
                },
                // 复制时机构树点击事件
                orgClickFn1: function(nodes) {
                    this.orgTreeNodes = nodes;
                },
                copyInfoFn: function() { // 复制数据
                    if (this.sourObjectType === 'R') { // 角色
                        if (this.roleGrid.currentRow == null) {
                            this.$message({ message: '请先选择一条待复制对象，然后点击复制', type: 'warning' });
                            return;
                        }
                        this.dialogVisible = true;
                        this.sourObjectId = this.roleGrid.currentRow.roleId;
                        this.roleShow = true;
                        this.userShow = false;
                        this.dptShow = false;
                        this.orgTreeShow = false;
                        this.$nextTick(function() {
                            this.$refs.roleTable1.remoteData();
                        });
                    } else if (this.sourObjectType === 'U') { // 用户
                        if (this.userGrid.currentRow == null) {
                            this.$message({ message: '请先选择一条待复制对象，然后点击复制', type: 'warning' });
                            return;
                        }
                        this.dialogVisible = true;
                        this.sourObjectId = this.userGrid.currentRow.userId;
                        this.roleShow = false;
                        this.userShow = true;
                        this.dptShow = false;
                        this.orgTreeShow = false;
                        this.$nextTick(function() {
                            this.$refs.userTable1.remoteData();
                        });
                    } else if (this.sourObjectType === 'D') { // 部门
                        if (this.dptGrid.currentRow == null) {
                            this.$message({ message: '请先选择一条待复制对象，然后点击复制', type: 'warning' });
                            return;
                        }
                        this.dialogVisible = true;
                        this.sourObjectId = this.dptGrid.currentRow.dptId;
                        this.roleShow = false;
                        this.userShow = false;
                        this.dptShow = true;
                        this.orgTreeShow = false;
                        this.$nextTick(function() {
                            this.$refs.dptTable1.remoteData();
                        });
                    } else if (this.sourObjectType === 'G') { // 机构
                        if (this.orgTree.nowNode == null || this.orgTree.nowNode == '') {
                            this.$message({ message: '请先选择一条待复制对象，然后点击复制', type: 'warning' });
                            return;
                        }
                        this.dialogVisible = true;
                        this.sourObjectId = this.orgTree.nowNode.orgId;
                        this.roleShow = false;
                        this.userShow = false;
                        this.dptShow = false;
                        this.orgTreeShow = true;
                        this.$nextTick(function() {
                            this.$refs.orgTree1.remoteData();
                        });
                    }
                },
                copyCheck: function() {
                    var em = this;
                    if (em.builObjectType === 'R') { // 角色
                        if (em.$refs.roleTable1.selections.length == 0) {
                            em.$message({ message: '请先选择粘贴对象', type: 'warning' });
                            return;
                        }
                        em.builObjectId = em.$refs.roleTable1.selections[0].roleId;
                    } else if (em.builObjectType === 'U') { // 用户
                        if (em.$refs.userTable1.selections.length == 0) {
                            em.$message({ message: '请先选择粘贴对象', type: 'warning' });
                            return;
                        }
                        em.builObjectId = em.$refs.userTable1.selections[0].userId;
                    } else if (em.builObjectType === 'D') { // 部门
                        if (em.$refs.dptTable1.selections.length == 0) {
                            em.$message({ message: '请先选择粘贴对象', type: 'warning' });
                            return;
                        }
                        em.builObjectId = em.$refs.dptTable1.selections[0].dptId;
                    } else if (em.builObjectType === 'G') { // 机构
                        if (em.orgTreeNodes == null) {
                            em.$message({ message: '请先选择一条复制对象', type: 'warning' });
                            return;
                        }
                        em.builObjectId = em.orgTreeNodes.orgId;
                    }
                    var param = {
                        sourObjectType: em.sourObjectType,
                        sourObjectId: em.sourObjectId,
                        builObjectType: em.builObjectType,
                        builObjectId: em.builObjectId,
                        lastChgUsr: yufp.session.userId,
                        sysId: yufp.session.logicSys.id
                    };
                    // 发起请求
                    yufp.service.request({
                        method: 'POST',
                        url: backend.appOcaService + '/api/adminsmauthteco/savecopyinfo',
                        data: JSON.stringify(param),
                        callback: function(code, message, response) {
                            em.$message({ message: '复制成功', type: 'success' });
                            yufp.util.butLogInfo(hashCode, '功能授权', '复制');
                            em.dialogVisible = false;
                        }
                    });
                },
                queryRoleFn: function() { // 角色查询
                    this.$refs.roleTable.remoteData({
                        condition: JSON.stringify({
                            orgId: this.roleGrid.query.orgId ? this.roleGrid.query.orgId : null,
                            roleCode: this.roleGrid.query.roleCode ? this.roleGrid.query.roleCode : null,
                            roleName: this.roleGrid.query.roleName ? this.roleGrid.query.roleName : null,
                            roleSts: 'A'
                        })

                    });
                },
                queryDptFn: function() { // 部门查询
                    var dptParams = {
                        condition: JSON.stringify({
                            belongOrgId: this.dptGrid.query.belongOrgId ? this.dptGrid.query.belongOrgId : null,
                            dptCde: this.dptGrid.query.dptCde ? this.dptGrid.query.dptCde : null,
                            dptName: this.dptGrid.query.dptName ? this.dptGrid.query.dptName : null,
                            dptSts: 'A'
                        })
                    };
                    var me = this;
                    yufp.service.request({
                        method: 'GET',
                        url: backend.appOcaService + '/api/adminsmdpt/list',
                        data: dptParams,
                        callback: function(code, message, response) {
                            if (code == 0) {
                                me.$refs.dptTable.data = response.data;
                            }
                        }
                    });
                },
                queryUserFn: function() { // 用户查询
                    this.$refs.userTable.remoteData({
                        condition: JSON.stringify({
                            orgId: this.userGrid.query.orgId ? this.userGrid.query.orgId : null,
                            userInfo: this.userGrid.query.userInfo ? this.userGrid.query.userInfo : null,
                            userSts: 'A'
                        })
                    });
                },
                resetQueryRoleFn: function() { // 角色查询重置
                    this.roleGrid.query = {
                        orgId: '',
                        roleCode: '',
                        roleName: ''
                    };
                },
                resetDptRoleFn: function() { // 部门查询重置
                    this.dptGrid.query = {
                        dptCde: '',
                        dptName: '',
                        belongOrgId: ''
                    };
                },
                resetUserFn: function() { // 用户查询重置
                    this.userGrid.query = {
                        userInfo: '',
                        orgId: ''
                    };
                },
                /**
                 *刷新菜单树
                 * @param param
                 */
                refreshMenuTree: function(param) {
                    var me = this;
                    me.reSetFn(); // 重置
                    me.menuTree.loading = true;
                    // 发起请求
                    yufp.service.request({
                        method: 'GET',
                        url: backend.appOcaService + '/api/adminsmauthteco/queryinfo',
                        data: param,
                        callback: function(code, message, response) {
                            var infos = [];
                            if (leafNodes.length == 0) {
                                me.getNodesWithoutChildren(me.$refs.menuTree.data);
                            }

                            for (var i = 0; i < leafNodes.length; i++) {
                                var node = leafNodes[i];
                                for (var j = 0; j < response.data.length; j++) {
                                    var d = response.data[j];
                                    if (node['id'] == d['authresId']) {
                                        infos.push(d);
                                    }
                                }
                            }
                            me.resData = infos;
                            var keys = [];
                            for (var i = 0; i < infos.length; i++) {
                                keys.push(infos[i].authresId);
                            }
                            me.$refs.menuTree.setCheckedKeys(keys);
                            me.menuTree.loading = false;
                            me.nodeCheckNum = 0;
                        }
                    });
                },
                getNodesWithoutChildren: function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var d = data[i];
                        if (d['children'].length == 0) {
                            leafNodes.push(d);
                        } else {
                            var childern = d['children'];
                            this.getNodesWithoutChildren(childern);
                        }
                    }
                },
                rowClickFnDep: function(row) { // 部门数据选中事件方法
                    if (row != null) {
                        this.ifselectData = true;
                        this.dptGrid.currentRow = row;
                        var param = {
                            objectType: this.showObjectFlag,
                            objectId: row.dptId,
                            resType: 'M,C',
                            sysId: yufp.session.logicSys.id
                        };
                        this.refreshMenuTree(param);
                    } else {
                        this.$message({ message: '请选择一条数据', type: 'warning' });
                    }
                },
                selectRowUser: function(row) { // 用户数据选中事件方法
                    if (row) {
                        this.ifselectData = true;
                        this.userGrid.currentRow = row;
                        var param = {
                            objectType: this.showObjectFlag,
                            objectId: row.userId,
                            resType: 'M,C',
                            sysId: yufp.session.logicSys.id
                        };
                        this.refreshMenuTree(param);
                    } else {
                        this.$message({ message: '请选择一条数据', type: 'warning' });
                    }
                },
                /**
                 * 选中角色数据刷新菜单树选中状态
                 * @param row
                 */
                selectRowRole: function(row) {
                    if (row) {
                        this.ifselectData = true;
                        this.roleGrid.currentRow = row;
                        var param = {
                            objectType: this.showObjectFlag,
                            objectId: row.roleId,
                            resType: 'M,C',
                            sysId: yufp.session.logicSys.id
                        };
                        this.refreshMenuTree(param);
                    } else {
                        this.$message({ message: '请选择一条数据', type: 'warning' });
                    }
                },
                /**
                 * 机构树点击事件
                 * @param nodes
                 */
                orgClickFn: function(nodes) {
                    if (nodes != null) {
                        this.ifselectData = true;
                        this.orgTree.nowNode = nodes;
                        var param = {
                            objectType: this.showObjectFlag,
                            objectId: nodes.orgId,
                            resType: 'M,C',
                            sysId: yufp.session.logicSys.id
                        };
                        this.refreshMenuTree(param);
                    } else {
                        this.$message({ message: '请选择一个节点', type: 'warning' });
                    }
                },
                selectAllFn: function() { // 全选
                    var nodes = this.$refs.menuTree.data;
                    for (var s = 0; s < nodes.length; s++) {
                        this.$refs.menuTree.setChecked(nodes[s].id, true, true);
                    }
                },

                reSelectFn: function() { // 反选
                    var checks = this.$refs.menuTree.getCheckedKeys();
                    this.selectAllFn();
                    for (var i = 0; i < checks.length; i++) {
                        this.$refs.menuTree.setChecked(checks[i], false, false);
                    }
                },
                reSetFn: function() { // 重置
                    this.$refs.menuTree.setCheckedKeys([]);
                },
                // 是否选中对象 add by chenlin 20171229
                checkObjSelected: function(row) {
                    if (row === null || row === '') {
                        this.$message({ message: '请先选择一条对象进行授权', type: 'warning' });
                        return;
                    }
                },
                saveAllInfoFn: function() {
                    var em = this;
                    var objectType = em.showObjectFlag;
                    var objectId;
                    var dataInfo = [];
                    var ctrInfo = []; // 控制点数据
                    var dataMap = {};
                    if (objectType === 'R') { // 角色
                        em.checkObjSelected(em.roleGrid.currentRow);
                        objectId = this.roleGrid.currentRow.roleId;
                    } else if (objectType === 'U') { // 用户
                        em.checkObjSelected(em.userGrid.currentRow);
                        objectId = em.userGrid.currentRow.userId;
                    } else if (objectType === 'D') { // 部门
                        em.checkObjSelected(em.dptGrid.currentRow);
                        objectId = em.dptGrid.currentRow.dptId;
                    } else if (objectType === 'G') { // 机构
                        em.checkObjSelected(em.orgTree.nowNode);
                        objectId = em.orgTree.nowNode.orgId;
                    }
                    if (objectId === null || objectType === '') {
                        em.$message({ message: '请选择一条对象数据', type: 'warning' });
                        return;
                    }
                    var checksNodes = em.$refs.menuTree.getCheckedNodes();
                    var checkHalfNodes = em.$refs.menuTree.getHalfCheckedNodes();

                    for (var i = 0; i < checksNodes.length; i++) {
                        var data = {
                            authRecoId: null,
                            authobjId: objectId,
                            authobjType: objectType,
                            authresType: checksNodes[i].menuType,
                            lastChgUsr: yufp.session.userId,
                            sysId: yufp.session.logicSys.id,
                            authresId: checksNodes[i].id,
                            menuId: checksNodes[i].menuId
                        };
                        if (checksNodes[i].menuType === 'M') {
                            dataInfo.push(data);
                        } else {
                            ctrInfo.push(data);
                        }
                    }

                    for (var j = 0; j < checkHalfNodes.length; j++) {
                        var data2 = {
                            authRecoId: null,
                            authobjId: objectId,
                            authobjType: objectType,
                            authresType: checkHalfNodes[j].menuType,
                            lastChgUsr: yufp.session.userId,
                            sysId: yufp.session.logicSys.id,
                            authresId: checkHalfNodes[j].id,
                            menuId: checkHalfNodes[j].menuId
                        };
                        if (checkHalfNodes[j].menuType === 'M') {
                            dataInfo.push(data2);
                        } else {
                            ctrInfo.push(data2);
                        }
                    }

                    dataMap.menuData = dataInfo;
                    dataMap.ctrData = ctrInfo;
                    if (dataInfo.length > 0 || ctrInfo.length > 0) {
                        // 发起请求
                        yufp.service.request({
                            method: 'POST',
                            url: backend.appOcaService + '/api/adminsmauthteco/saveinfo',
                            data: JSON.stringify(dataMap),
                            callback: function(code, message, response) {
                                em.$message({ message: '操作保存成功', type: 'success' });
                                yufp.util.butLogInfo(hashCode, '功能授权', '保存');
                            }
                        });
                    } else {
                        em.$message({ message: '请选择要保存的资源数据', type: 'warning' });
                        return;
                    }
                },
                // 菜单树加节点样式 add by chenlin 20171229
                renderContent: function() {
                    var createElement = arguments[0];
                    var type = arguments[1].data.menuType;
                    return createElement('span', [
                        createElement('span', { attrs: { class: 'yu-treeMenuType' + type } }, type),
                        createElement('span', arguments[1].data.label)
                    ]);
                },
                change: function(val) {
                    this.sourObjectType = val;
                    this.builObjectType = val;
                }
            },
            mounted: function() {
                var me = this;
                yufp.lookup.bind('OBJECT_TYPE', function(data) {
                    me.typeOptions = data;
                });

                var roles = yufp.session.roles;
                var selectRole = yufp.sessionStorage.get('selectRole');
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i].id === selectRole) {
                        if (roles[i].code == 'R022') {
                            me.savebutton = true;
                        }
                    }
                }


            }
        });
    };
});