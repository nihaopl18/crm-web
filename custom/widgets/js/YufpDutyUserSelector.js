/** 人员选择器
 * yufp-allot-selector
 * @authors yangye
 * @date    2018-11-12
 */
(function(vue, $, name) {
    // 注册用户组件
    vue.component(name, {
        template: '<div>\
            <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
            @focus="dialogVisible = true" :on-icon-click="onIconClickFn" readonly name="用户" v-model="selectedVal"></el-input>\
            <el-dialog-x title="客户经理选择" :visible.sync= "dialogVisible" :height="height" :width = "width">\
            <el-row :gutter="20">\
            <el-col :span="25">\
            <el-form-q ref="queryCondition" from="query"\
            :fieldData="user.fieldData" :buttons="user.buttons"></el-form-q>\
            <el-table-x ref="usertable" :checkbox="user.checkbox" :max-height="user.maxHeight"\
            :data-url="user.dataUrl" :base-params="user.dataParams" :table-columns="user.tableColumns"></el-table-x>\
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
            params: Object
        },
        data: function() {
            return this.createData();
        },
        created: function() {
            this.selectedVal = this.rawValue ? this.rawValue : this.value;
        },
        methods: {
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
                    height: '400px',
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
                        // dataUrl: backend.appOcaService + "/api/util/getorgtree",
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
                        radiobox: true,
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
                                // if (valid) {
                                //     var param = { condition: JSON.stringify(model) };
                                //     me.queryFn(param);
                                //   }
                            }
                        }, {
                            label: '重置',
                            op: 'reset',
                            type: 'primary',
                            icon: 'el-icon-edit'
                        }],
                        dataUrl: backend.appOcaService + '/api/cimftctaskpool/getUser',
                        dataParams: {
                            roleId: '',
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
                            label: '所属部门编号',
                            prop: 'dptId'
                        }, {
                            label: '所属部门名称',
                            prop: 'dptName'
                        }]
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
            },
            queryFn: function(params) {
                var temp = params;
                temp.roleId = temp.roleId == '' || temp.roleId == undefined ? this.user.dataParams.roleId : temp.roleId;
                temp.dutyId = temp.dutyId == '' || temp.dutyId == undefined ? this.user.dataParams.dutyId : temp.dutyId;
                temp.orgCode = temp.orgCode == '' || temp.orgCode == undefined ? this.user.dataParams.orgCode : temp.orgCode;
                this.$refs.usertable.remoteData(temp);
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
                var data = this.$refs.usertable.selections;
                if (data.length == 0) {
                    this.$message('请至少选择一条数据!', '提示');
                    return false;
                }
                if (!this.user.checkbox && data.length > 1) {
                    this.$message('你只能选择一条数据!', '提示');
                    return;
                }
                this.$emit('input', this.array2String(data, 'loginCode'));
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
                this.selectedVal = val;
                if (val === '') {
                    this.$refs.usertable.setCurrentRow();
                }
            },
            rawValue: function(val) {
                this.selectedVal = val;
            },
            params: function(val) {
                yufp.extend(true, me, val);
            }
        }
    });
}(Vue, yufp.$, 'yufp-duty-user-selector'));