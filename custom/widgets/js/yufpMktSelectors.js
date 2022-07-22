/**
 * 客户经理选择器yufp-mgr-selector
 * @param treeUrl-树的url必须
 * @param dataRoot-根节点
 * @param tabCheckbox-表格复选框
 * @param maxHeight-最大高度
 * @param roleId-角色Id
 * @param dutyId-岗位Id
 * @authors lupan
 * @date    2017-12-25 21:20:41
 * @version $1.0$
 */
(function(vue, $, name) {
    // 注册用户组件
    vue.component(name, {
        template: '<div>\
            <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
            @focus="onIconClickFn" :on-icon-click="onIconClickFn" readonly name="用户" v-model="selectedVal"></el-input>\
            <el-dialog-x title="客户经理筛选" :visible.sync= "dialogVisible" :height="height" :width = "width">\
            <el-row :gutter="20">\
            <div v-show="showtree" height="800px">\
            <el-col :span="5">\
            <yufp-ext-tree ref="orgtree" :show-checbox="false" :check-strictly="org.checkStrictly" :default-expand-all="org.defaultExpandAll"\
            :expand-level="org.expandLevel" :root-visible="org.rootVisible" :height="org.height"\
            :data-url="org.dataUrl" :data-root="org.dataRoot" :data-id="org.dataId" :data-label="org.dataLabel" :data-pid="org.dataPid"\
            :data-params="org.dataParams" @node-click="treeClickFn" :highlightCurrent=true></yufp-ext-tree>\
            </el-col>\
            </div>\
            <el-col :span="12">\
            <el-form-q ref="queryCondition" from="query"\
            :fieldData="user.fieldData" :buttons="user.buttons"></el-form-q>\
            <el-table-x ref="usertable" :max-height="user.maxHeight"\
            :data-url="user.dataUrl" :base-params="user.userBaseParam" :table-columns="user.tableColumns" :default-load="false" @row-click="dataSelect"></el-table-x>\
            </el-col>\
            <el-col :span="7">\
            <div style="margin-top: 105px;">\
            <yu-table :data="selectMgrArr">\
            <yu-table-column prop="loginCode" label="登录代码" width="80"> </yu-table-column>\
            <yu-table-column prop="userName" label="姓名" width="80"> </yu-table-column>\
            <yu-table-column fixed="right" label="操作" width="80">\
                <template slot-scope="scope">\
                    <yu-button @click="handleClick(scope.row)" type="text" size="small">移除</yu-button>\
                </template>\
            </yu-table-column>\
            </yu-table>\
            </div>\
            </el-col>\
            </el-row>\
            <div slot="footer" class="dialog-footer"  align="center">\
            <el-button @click="dialogVisible = false">取 消</el-button>\
            <el-button type="primary" @click="confirmFn">确 定</el-button>\
            </div>\
            </el-dialog-x>\
            </div>',
        props: {
            value: {
                required: true
            },
            rawValue: String,
            size: String,
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '请选择客户经理'
            },
            icon: {
                type: String,
                default: 'search'
            },
            params: Object,
            knowledgeisno: {
                type: Boolean,
                default: true
            }
        },
        data: function() {
            return this.createData();
        },
        created: function() {
            console.log('this.params', this.params)
            this.selectedVal = this.rawValue ? this.rawValue : this.value;
        },
        mounted: function() {
            console.log('this.params', this.params)
            this.user.userBaseParam = { condition: JSON.stringify(this.user.dataParams) };
            if (this.params != undefined) {
                if (this.params.trustFlag != undefined) {
                    this.showtree = this.params.trustFlag;
                    this.spanShow = 24;
                } else {
                    this.showtree = true;
                    this.spanShow = 19;
                }
            }
        },
        methods: {
            handleClick: function(row) {
                
                var arr = this.selectMgrArr;
                //移除数组中的元素
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].userId == row.userId) {
                        arr.splice(i, 1);
                        break;
                    }
                }

            },
            dataSelect: function(row) {
                var arr = this.selectMgrArr;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].userId == row.userId) {
                        return;
                    }
                }
                this.selectMgrArr.push(row);
            },
            createData: function() {
                var me = this;
                var temp = me.getDefaultData();
                yufp.extend(true, temp, me.params);
                temp.user.dataParams.searchType = temp.org.searchType;
                return temp;
            },
            getDefaultData: function() {
                var me = this;
                var maxHeight;
                return {
                    schemeId: '',
                    selectMgrArr: [],
                    showtree: true,
                    spanShow: 19,
                    height: '500px',
                    width: '1000px',
                    selectedVal: '',
                    dialogVisible: false,
                    org: {
                        rootVisible: true, // 根节点可见性
                        // needCheckbox: false,设置为默认单选
                        height: 500,
                        checkStrictly: false,
                        defaultExpandAll: false,
                        expandLevel: 2, // 默认展开层级
                        dataUrl: backend.appOcaService + '/api/util/getorgtree',
                        // 节点参数属性
                        dataId: 'orgId',
                        dataLabel: 'orgName',
                        dataPid: 'upOrgId',
                        dataRoot: '',
                        // 数据参数
                        dataParams: {
                            userId: yufp.session.userId,
                            orgCode: yufp.session.org.id,
                            needFin: false,
                            needManage: false,
                            needDpt: false,
                            orgLevel: ''
                        },
                        searchType: 'CUR_ORG'
                    },
                    user: {
                        checkbox: true,
                        maxHeight: maxHeight,
                        fieldData: [{
                            placeholder: '登录代码',
                            field: 'loginCode',
                            type: 'input'
                        }, {
                            placeholder: '姓名',
                            field: 'userName',
                            type: 'input'
                        }],
                        buttons: [{
                            label: '搜索',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            click: function(model, valid) {
                                if (valid) {
                                    me.queryFn(model);
                                }
                            }
                        }],
                        dataUrl: backend.appOcaService + '/api/pmafassesstarget/getMgrBySchemeId',
                        userBaseParam: '',
                        dataParams: {
                            schemeId: me.schemeId,
                            orgCode: yufp.session.org.code
                        },
                        tableColumns: [{
                                label: '姓名',
                                prop: 'userName'
                            }, {
                                label: '所属机构名称',
                                prop: 'orgName'
                            }
                        ]
                    }
                };
            },
            setOptionsByUrl: function(order, url) {
                var me = this;
                yufp.service.request({
                    url: url + '?userId=' + yufp.session.userId,
                    method: 'get',
                    callback: function(code, message, response) {
                        if (response != null && response.data != null) {
                            me.user.fieldData[order].options = response.data;
                        }
                    }
                });
            },
            onIconClickFn: function(val) {
                var me = this;
                me.schemeId = me.params.schemeId;
                this.dialogVisible = true;
                this.$nextTick(function() {
                    this.$refs.usertable.clearSelection();
                    this.queryFn(this.params);
                });
            },
            queryFn: function(params) {
                var me = this;
                var temp = params;
                params.schemeId = me.schemeId;
                temp.orgCode = temp.orgCode == '' || temp.orgCode == undefined ? this.user.dataParams.orgCode : temp.orgCode;
                if (me.params != undefined) {
                    if (me.params.trustOrg != undefined) {
                        params.trustOrg = me.params.trustOrg;
                    }
                }
                params.userId = yufp.session.userId;
                var param = { condition: JSON.stringify(params) };
                this.$refs.usertable.remoteData(param);
            },
            getCondition: function() {
                return this.$refs.queryCondition.fm;
            },
            treeClickFn: function(nodeData, node, self) {
                var params = this.getCondition();
                params.orgCode = nodeData.id;
                this.queryFn(params);
            },
            currentChangeFn: function(nodeData, node, self) {
                // 仅用于复选框
                if (this.treeCheckbox) {
                    var params = this.getCondition();
                    var code = this.$refs.orgtree.getCheckedKeys().toString();
                    params.orgCode = code;
                    this.queryFn(params);
                }
            },
            confirmFn: function() {
                var me = this;
                var data = this.selectMgrArr;
                this.$emit('input', this.array2String(data, 'userId'));
                this.$emit('select-fn', data);
                this.$nextTick(function() {
                    me.selectedVal = me.array2String(data, 'userName');
                });
                this.dialogVisible = false;
            },
            // 对外提供选择器显示值
            getRawValue: function() {
                return this.selectedVal;
            },
            array2String: function(array, label) {
                var s = '';
                for (var i = 0; i < array.length; i++) {
                    if (i == 0) {
                        s += array[i][label];
                    } else {
                        s += ',' + array[i][label]; 
                    }
                }
                return s;
            }
        },
        watch: {
            
            value: function(val) {
                var _this = this;
                if (val != null && val != '') {
                    _this.selectedVal = val;
                } else {
                    _this.selectedVal = val;
                }
            },
            rawValue: function(val) {
                this.selectedVal = val;
            },
            params: function(val) {
                var me = this;
                yufp.extend(true, me, val);
            }
        }
    });
}(Vue, yufp.$, 'yufp-mkt-selectors'));