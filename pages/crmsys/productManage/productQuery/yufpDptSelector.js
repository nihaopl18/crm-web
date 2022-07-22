/**
 *  部门选择器
 */
(function(vue, $, name) {
    // 注册用户组件
    vue.component(name, {
        template: '<div>\
           <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
           @focus="dialogVisible = true" :on-icon-click="onIconClickFn" readonly name="用户" v-model="selectedVal"></el-input>\
           <el-dialog-x title="部门选择器" :visible.sync= "dialogVisible" :height="height" :width = "width">\
           <el-row :gutter="20">\
           <el-form-q ref="queryCondition"\
           :fieldData="user.fieldData" :buttons="user.buttons"></el-form-q>\
           <el-table-x ref="usertable" :checkbox="user.checkbox" :max-height="user.maxHeight"\
           :data-url="user.dataUrl" :base-params="user.dataParams" :table-columns="user.tableColumns" :default-load="user.load"></el-table-x>\
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
                default: '请选择部门'
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
                    user: {
                        checkbox: true,
                        maxHeight: maxHeight,
                        fieldData: [
                            { placeholder: '所属机构', field: 'orgCde', type: 'custom', is: 'yufp-org-tree' },
                            { placeholder: '部门名称', field: 'dptName', type: 'input' }
                        ],
                        buttons: [{
                            label: '搜索',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            click: function(model, valid) {
                                if (valid) {
                                    var param = {
                                        condition: JSON.stringify(model)
                                    };
                                    me.queryFn(param);
                                }
                            }
                        }, {
                            label: '重置',
                            op: 'reset',
                            type: 'primary',
                            icon: 'el-icon-edit'
                        }],
                        load: true, // 不默认查询
                        dataUrl: backend.productService + '/api/acrmfpdprodcatl/yufpdptselectorquery',
                        dataParams: {},
                        tableColumns: [
                            { label: '部门编号', prop: 'dptCde', width: '', resizable: true },
                            { label: '部门名称', prop: 'dptName', width: '', resizable: true },
                            { label: '所属机构', prop: 'orgName', width: '', resizable: true }
                        ]
                    }
                };
            },
            onIconClickFn: function(val) {
                this.dialogVisible = true;
                this.$nextTick(function() {
                    this.$refs.usertable.clearSelection();
                    var params = this.params; // 查询参数
                    var param = {
                        condition: JSON.stringify(params)
                    };
                    this.$refs.usertable.remoteData(param);
                });
            },
            queryFn: function(params) {
                var temp = params;
                temp.dptCde = temp.dptCde == '' || temp.dptCde == undefined ? this.user.dataParams.dptCde : temp.dptCde;
                temp.dptName = temp.dptName == '' || temp.dptName == undefined ? this.user.dataParams.dptName : temp.dptName;
                this.$refs.usertable.remoteData(temp);
            },
            confirmFn: function() {
                var me = this;
                var data = this.$refs.usertable.selections;
                if (data.length != 1) {
                    this.$message('请选择一条数据!', '提示');
                    return false;
                }
                if (!this.user.checkbox && data.length > 1) {
                    this.$message('你只能选择一条数据!', '提示');
                    return;
                }
                this.$emit('input', this.array2String(data, 'dptCde'));
                this.$emit('select-fn', data);
                this.$nextTick(function() {
                    me.selectedVal = me.array2String(data, 'dptName');
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
            },
            rawValue: function(val) {
                this.selectedVal = val;
            },
            params: function(val) {
                yufp.extend(true, me, val);
            }
        }
    });
}(Vue, yufp.$, 'yufp-dpt-selector'));