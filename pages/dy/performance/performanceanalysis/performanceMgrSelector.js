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
              @focus="dialogVisible = true" :on-icon-click="onIconClickFn" readonly name="用户" v-model="selectedVal"></el-input>\
              <el-dialog-x title="客户经理筛选" :visible.sync= "dialogVisible" :height="height" :width = "width">\
              <el-row :gutter="20">\
              <div v-show="showtree" height="600px">\
              <el-col :span="5">\
              <yufp-ext-tree ref="orgtree" :show-checbox="false" :check-strictly="org.checkStrictly" :default-expand-all="org.defaultExpandAll"\
              :expand-level="org.expandLevel" :root-visible="org.rootVisible" :height="org.height"\
              :data-url="org.dataUrl" :data-root="org.dataRoot" :data-id="org.dataId" :data-label="org.dataLabel" :data-pid="org.dataPid"\
              :data-params="org.dataParams" @node-click="treeClickFn" :highlightCurrent=true></yufp-ext-tree>\
              </el-col>\
              </div>\
              <el-col :span="spanShow">\
              <el-form-q ref="queryCondition" from="query"\
              :fieldData="user.fieldData" :buttons="user.buttons"></el-form-q>\
              <el-table-x ref="usertable" :radiobox="user.checkbox" :max-height="user.maxHeight"\
              :data-url="user.dataUrl" :base-params="user.userBaseParam" :table-columns="user.tableColumns" :default-load="true"></el-table-x>\
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
            selectOrgid: '',
            selectOrgname: '',
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
            params: Object
        },
        data: function() {
            return this.createData();
        },
        created: function() {
            this.selectedVal = this.rawValue ? this.rawValue : this.value;
        },
        mounted: function() {
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
            createData: function() {
                var me = this;
                var temp = me.getDefaultData();
                yufp.extend(true, temp, me.params);
                // if (temp.user.dataParams.roleId == '') {
                //   temp.user.fieldData.push({
                //     placeholder: '角色',
                //     field: 'roleId',
                //     type: 'select',
                //     options: []
                //   });
                //   me.setOptionsByUrl(2, backend.appOcaService + '/api/util/getrolebyuser');
                // }

                // if (temp.user.dataParams.dutyId == '') {
                //   temp.user.fieldData.push({
                //     placeholder: '岗位',
                //     field: 'dutyId',
                //     type: 'select',
                //     options: []
                //   });
                //   me.setOptionsByUrl(temp.user.fieldData.length - 1, backend.appOcaService + '/api/util/getdutybyuser');
                // }
                temp.user.dataParams.searchType = temp.org.searchType;
                return temp;
            },
            getDefaultData: function() {
                var me = this;
                var maxHeight;
                return {
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
                            orgCode: yufp.session.org.code,
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
                        }, {
                            label: '重置',
                            op: 'reset',
                            type: 'primary',
                            icon: 'el-icon-edit'
                        }],
                        dataUrl: backend.appOcaService + '/api/grantapply/getcm',
                        userBaseParam: '',
                        dataParams: {
                            roleId: 'eaa445bdce2f42d6aa394c8a90e950ee',
                            dutyId: '',
                            orgCode: yufp.session.org.code
                        },
                        tableColumns: [{
                                label: '登陆代码',
                                prop: 'loginCode',
                                width: '110'
                            }, {
                                label: '姓名',
                                prop: 'userName'
                            }, {
                                label: '所属机构编号',
                                prop: 'orgId'
                            }, {
                                label: '所属机构名称',
                                prop: 'orgName'
                            }
                            // , {
                            //   label: '所属部门编号',
                            //   prop: 'dptId'
                            // }, {
                            //   label: '所属部门名称',
                            //   prop: 'dptName'
                            // }
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
                this.dialogVisible = true;
                this.$nextTick(function() {
                    this.$refs.usertable.clearSelection();
                });
            },
            queryFn: function(params) {
                var me = this;
                var temp = params;
                temp.dutyId = temp.dutyId == '' || temp.dutyId == undefined ? this.user.dataParams.dutyId : temp.dutyId;
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
                console.log(nodeData);
                this.queryFn(params);
                this.selectOrgid = nodeData.orgId;
                this.selectOrgname = nodeData.label;

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
                var data = this.$refs.usertable.selections;
                if (this.selectOrgid != undefined && this.selectOrgname != undefined && data.length == 0) {
                    data[0] = new Object();
                    data[0].selectOrgid = this.selectOrgid;
                    data[0].selectOrgname = this.selectOrgname;
                    this.$emit('input', this.array2String(data, 'selectOrgid'));
                    this.$emit('select-fn', data);
                    this.$nextTick(function() {
                        me.selectedVal = me.array2String(data, 'selectOrgname');
                    });
                    this.dialogVisible = false;
                } else if (this.selectOrgid != undefined && this.selectOrgname != undefined && data.length == 1) {
                    this.$emit('input', this.array2String(data, 'userId'));
                    this.$emit('select-fn', data);
                    this.$nextTick(function() {
                        me.selectedVal = me.array2String(data, 'userName');
                    });
                    this.dialogVisible = false;
                } else if (this.selectOrgid == undefined && this.selectOrgname == undefined && data.length == 1) {
                    this.$emit('input', this.array2String(data, 'userId'));
                    this.$emit('select-fn', data);
                    this.$nextTick(function() {
                        me.selectedVal = me.array2String(data, 'userName');
                    });
                    this.dialogVisible = false;
                } else if (data.length > 1) {
                    this.$message('你只能选择一条数据!', '提示');
                    return;
                }
                // } else {
                //     this.$message('请选择机构或客户经理!', '提示');
                //     return;
                // }
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
                this.selectedVal = val;
                // if (val === '') {
                //   this.$refs.usertable.clearSelection();
                // }
            },
            rawValue: function(val) {
                this.selectedVal = val;
            },
            params: {
                handler: function(val) {
                    yufp.extend(true, this, val);
                    this.user.userBaseParam = { condition: JSON.stringify(this.user.dataParams) };
                },
                deep: true
            }
        }
    });
}(Vue, yufp.$, 'per-mgr-selector'));