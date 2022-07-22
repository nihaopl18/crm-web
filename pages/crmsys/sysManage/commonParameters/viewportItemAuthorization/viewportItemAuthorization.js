/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-16
 * @updated by
 * @description 视图项授权
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
        var vm = yufp.custom.vue({
            el: cite.el,
            data: function() {
                var em = this;
                return {
                    i: 0,
                    typeOptions: [],
                    viewTypeOptions: [],
                    // resetButton: !yufp.session.checkCtrl('reset'), // 重置选择按钮控制
                    // setOtherButton: !yufp.session.checkCtrl('setOther'), // 反选选择按钮控制
                    // selectAllButton: !yufp.session.checkCtrl('selectAll'), // 全选选择按钮控制
                    // copyButton: !yufp.session.checkCtrl('copy'), // 复制选择按钮控制
                    uploadButton: !yufp.session.checkCtrl('upload'), // 导出选择按钮控制
                    treeUrl: backend.adminService + '/api/adminsmorg/orgtreequery?orgId=' + yufp.session.org.id + '& orgSts=A',
                    orgRootId: yufp.session.org.code, // 根节点ID
                    reourceUrl: backend.adminService + '/api/ocrmfsysviewauth/qryviewtree?sysId=' + '1cab27def8fb4c0f9486dcf844b783c0',
                    // 默认展示的视图类型
                    showViewFlag: '', // 对象标识
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
                        dataUrl: backend.adminService + '/api/adminsmrole/querybyrolests',
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
                        dataUrl: backend.adminService + '/api/adminsmdpt/list',
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
                        dataUrl: backend.adminService + '/api/adminsmuser/querypage',
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
                    filterNodeids: ''

                };
            },
            methods: {
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
                resetQueryRoleFn: function() { // 角色查询重置
                    this.roleGrid.query = {
                        orgId: '',
                        roleCode: '',
                        roleName: ''
                    };
                },
                /**
                 *刷新视图树
                 * @param param
                 */
                refreshMenuTree: function(param) {
                    var _this = this;
                    _this.reSetFn(); // 重置
                    _this.menuTree.loading = true;
                    // 发起请求
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/ocrmfsysviewauth/queryinfo',
                        data: param,
                        callback: function(code, message, response) {
                            var infos = [];
                            if (leafNodes.length == 0) {
                                _this.getNodesWithoutChildren(_this.$refs.menuTree.data);
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
                            _this.resData = infos;
                            // 获得勾选节点
                            var keys = [];
                            for (var i = 0; i < infos.length; i++) {
                                keys.push(infos[i].id);
                            }
                            _this.$refs.menuTree.setCheckedKeys(keys);
                            _this.menuTree.loading = false;
                            _this.nodeCheckNum = 0;
                        }
                    });
                },
                /**
                 * 获取叶子节点
                 * @param {Array} data 树数据
                 */
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
                /**
                 * 选中角色数据刷新视图树选中状态
                 * @param row
                 */
                selectRow_role: function(row) {
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
                /**
                 * 清空视图树勾选的节点为空
                 */
                reSetFn: function() {
                    // 重置
                    this.$refs.menuTree.setCheckedKeys([]);
                },
                // 是否选中对象 add by chenlin 20171229
                checkObjSelected: function(row) {
                    if (row === null || row === '') {
                        this.$message({ message: '请先选择一条对象进行授权', type: 'warning' });
                        return;
                    }
                },
                /**
                 * 批量保存
                 */
                saveAllInfoFn: function() {
                    var _this = this;
                    var objectType = _this.showObjectFlag;
                    var objectId;
                    var dataInfo = [];
                    var ctrInfo = []; // 控制点数据
                    var dataMap = {};
                    _this.checkObjSelected(_this.roleGrid.currentRow);
                    objectId = this.roleGrid.currentRow.roleId;
                    // if (objectType === 'R') { // 角色
                    //   _this.checkObjSelected(_this.roleGrid.currentRow);
                    //   objectId = this.roleGrid.currentRow.roleId;
                    // } else if (objectType === 'U') { // 用户
                    //   _this.checkObjSelected(_this.userGrid.currentRow);
                    //   objectId = _this.userGrid.currentRow.userId;
                    // } else if (objectType === 'D') { // 部门
                    //   _this.checkObjSelected(_this.dptGrid.currentRow);
                    //   objectId = _this.dptGrid.currentRow.dptId;
                    // } else if (objectType === 'G') { // 机构
                    //   _this.checkObjSelected(_this.orgTree.nowNode);
                    //   objectId = _this.orgTree.nowNode.orgId;
                    // }
                    if (objectId === null || objectType === '') {
                        _this.$message({ message: '请选择一条对象数据', type: 'warning' });
                        return;
                    }
                    var checks = _this.$refs.menuTree.getCheckedKeys();
                    var checksNodes = _this.$refs.menuTree.getCheckedNodes();
                    var checkHalfNodes = _this.$refs.menuTree.getHalfCheckedNodes();

                    for (var i = 0; i < checksNodes.length; i++) {
                        var data = {
                            authRecoId: null,
                            authobjId: objectId,
                            authobjType: objectType,
                            authresType: checksNodes[i].menuType,
                            lastChgUsr: yufp.session.userCode,
                            sysId: yufp.session.logicSys.id,
                            authresId: checksNodes[i].id,
                            id: checksNodes[i].id
                        };
                        if (checksNodes[i].menuType === 'M') {
                            // 视图项数据
                            dataInfo.push(data);
                        } else {
                            // 控制点数据
                            ctrInfo.push(data);
                        }
                    }

                    for (var j = 0; j < checkHalfNodes.length; j++) {
                        var data2 = {
                            authRecoId: null,
                            authobjId: objectId,
                            authobjType: objectType,
                            authresType: checkHalfNodes[j].menuType,
                            lastChgUsr: yufp.session.userCode,
                            sysId: yufp.session.logicSys.id,
                            authresId: checkHalfNodes[j].id,
                            id: checkHalfNodes[j].id
                        };
                        if (checkHalfNodes[j].menuType === 'M') {
                            dataInfo.push(data2);
                        } else {
                            ctrInfo.push(data2);
                        }
                    }
                    // 视图项数据
                    dataMap.menuData = dataInfo;
                    // 控制点数据
                    dataMap.ctrData = ctrInfo;
                    if (dataInfo.length > 0 || ctrInfo.length > 0) {
                        // 发起请求
                        yufp.service.request({
                            method: 'POST',
                            url: backend.adminService + '/api/ocrmfsysviewauth/saveinfo',
                            data: JSON.stringify(dataMap),
                            callback: function(code, message, response) {
                                _this.$message({ message: '操作保存成功', type: 'success' });
                                yufp.util.butLogInfo(hashCode, '视图授权', '批量保存');
                            }
                        });
                    } else {
                        _this.$message({ message: '请选择要保存的资源数据', type: 'warning' });
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
                },
                /**
                 * 视图类型选项变动处理函数
                 * @param val 当前选择的选项的值
                 */
                viewSeletChange: function(val) {
                    this.filterNodeids = ',' + val + ',';
                    this.$refs.menuTree.filter(val);
                },
                /**
                 * 视图类型选项变动处理函数,过滤树节点
                 */
                filterFn: function(val, data, node) {
                    var _this = this;
                    if (_this.filterNodeids.indexOf(',' + data.id + ',') >= 0 || _this.filterNodeids.indexOf(',' + data.pid + ',') >= 0) {
                        _this.filterNodeids += data.id + ',';
                        return true;
                    } else {
                        return false;
                    }
                },
                /**
                 * 获取视图类型数据
                 */
                getViewData: function() {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/ocrmfsysviewauth/qryviewtree',
                        data: { sysId: yufp.session.logicSys.id },
                        callback: function(code, message, response) {
                            if (code == 0 && response.code == 0) {
                                var data = response.data;
                                for (var i = 0, len = data.length; i < len; i++) {
                                    if (data[i].parentId == '0') {
                                        var obj = {};
                                        obj.key = data[i].id;
                                        obj.value = data[i].name;
                                        _this.viewTypeOptions.push(obj);
                                    }
                                }
                            }
                        }
                    });
                }
            },
            mounted: function() {
                var _this = this;
                yufp.lookup.bind('OBJECT_TYPE', function(data) {
                    _this.typeOptions = data;
                });
                _this.getViewData();
                // yufp.lookup.bind('VIEW_TYPE', function (data) {
                //   _this.viewTypeOptions = data;
                // });
            }
        });
    };
});