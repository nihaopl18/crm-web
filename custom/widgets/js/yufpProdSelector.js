/**
 * 产品选择器yufp-prod-selector
 * @param dataUrl-产品管理表url
 * @param dataRoot-产品类别树根节点
 * @param needCheckbox-表格复选框
 * @param maxHeight-最大高度
 * @authors yangxiao2
 * @date    2018-11-13
 * @version $1.0$
 */
(function(vue, $, name) {
    // 注册角色组件
    vue.component(name, {
        template: '<div>\
            <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
            @focus="dialogVisible = true" :on-icon-click="onIconClickFn" readonly name="产品" v-model="selectedVal"></el-input>\
            <el-dialog-x title="产品查询" :visible.sync= "dialogVisible" height="400px" width = "1200px">\
            <el-row :gutter="20">\
            <el-col :span="5">\
            <yufp-ext-tree ref="prodtree" :show-checbox="false" :checkStrictly="org.checkStrictly" :defaultExpandAll="org.defaultExpandAll"\
            :expandLevel="org.expandLevel" :rootVisible="org.rootVisible" :height="org.height"\
            :data-url="org.dataUrl" :data-root="org.dataRoot" :data-id="org.dataId" :data-label="org.dataLabel" :data-pid="org.dataPid"\
            :data-params="org.dataParams" @node-click="treeClickFn" :highlightCurrent=true></yufp-ext-tree>\
            </el-col>\
            <el-col :span="19">\
            <el-form-q ref="queryCondition" from="query"\
            :fieldData="role.fieldData" :buttons="role.buttons"></el-form-q>\
            <el-table-x ref="roletable" :checkbox="role.checkbox" :max-height="role.maxHeight"\
            :data-url="role.dataUrl" :base-params="role.dataParams"\
            :table-columns="role.tableColumns"></el-table-x>\
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
                type: String,
                required: false
            },
            rawValue: {
                type: String,
                default: ''
            },
            size: String,
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '请选择产品'
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
            yufp.lookup.reg('PROD_TYPE_ID,PROD_STATE,RISK-LEVEL');
            this.selectedVal = this.rawValue ? this.rawValue : this.value;
        },
        methods: {
            createData: function() {
                var me = this;
                var temp = me.getDefaultData();
                yufp.extend(true, temp, me.params);
                temp.role.dataParams.searchType = temp.org.searchType;
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
                        dataUrl: backend.adminService + '/api/acrmfpdprodcatl/treelistquery',
                        // 节点参数属性
                        dataId: 'catlCode',
                        dataLabel: 'catlName',
                        dataPid: 'catlParent',
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
                    role: {
                        checkbox: true,
                        fieldData: [{
                            placeholder: '产品编号',
                            field: 'productId',
                            type: 'input'
                        }, {
                            placeholder: '产品名称',
                            field: 'prodName',
                            type: 'input'
                        }],
                        buttons: [{
                            label: '搜索',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            click: function(model, valid) {
                                if (valid) {
                                    // me.queryFn(model);
                                    var param = { condition: JSON.stringify(model) };
                                    me.$refs.roletable.remoteData(param);
                                }
                            }
                        }, {
                            label: '重置',
                            op: 'reset',
                            type: 'primary',
                            icon: 'el-icon-edit'
                        }],
                        dataUrl: backend.adminService + '/api/acrmfpdprodinfo/productinfoquery',
                        maxHeight: maxHeight,
                        dataParams: {
                            orgCode: yufp.session.org.code
                        },
                        tableColumns: [
                            { label: '产品编号', prop: 'productId' },
                            { label: '产品名称', prop: 'prodName', width: '' },
                            { label: '产品类型代码', prop: 'catlName', width: '' },
                            { label: '产品发布日期', prop: 'prodStartDate', width: '' },
                            { label: '产品发布日期', prop: 'prodStartDate', width: '' },
                            { label: '产品截止日期', prop: 'prodEndDate', width: '' },
                            { label: '是否在售', prop: 'prodState', width: '' },
                            { label: '是否在售', prop: 'prodState', width: '' },
                            { label: '产品特点', prop: 'prodCharact', width: '' },
                            { label: '产品描述', prop: 'prodDesc', width: '' },
                            { label: '备注', prop: 'remark', width: '' }
                        ]
                    }
                };
            },
            onIconClickFn: function(val) {
                this.dialogVisible = true;
            },
            queryFn: function(params) {
                var temp = params;
                temp.orgCode = temp.orgCode == '' || temp.orgCode == undefined ? this.role.dataParams.orgCode : temp.orgCode;
                this.$refs.roletable.remoteData(temp);
            },
            getCondition: function() {
                return this.$refs.queryCondition.fm;
            },
            treeClickFn: function(nodeData, node, self) {
                var query = {};
                this.code = nodeData.catlCode;
                query.catlCode = nodeData.catlCode;
                var param = {
                    condition: JSON.stringify(query)
                };
                this.$refs.roletable.remoteData(param);
            },
            currentChangeFn: function(nodeData, node, self) {
                // 仅用于复选框
                if (this.treeCheckbox) {
                    var params = this.getCondition();
                    var code = this.$refs.prodtree.getCheckedKeys().toString();
                    params.orgCode = code;
                    var param = {
                        condition: JSON.stringify(params)
                    };
                    this.queryFn(param);
                }
            },
            confirmFn: function() {
                var me = this;
                var data = this.$refs.roletable.selections;
                if (data.length == 0) {
                    this.$message('请至少选择一条数据!', '提示');
                    return false;
                }
                if (this.params == undefined) {
                    this.params = {};
                    this.params.tabCheckbox = false;
                }
                if (!this.params.tabCheckbox && data.length > 1) {
                    this.$message('你只能选择一条数据!', '提示');
                    return;
                }
                this.$emit('input', this.array2String(data, 'productId'));
                this.$emit('select-fn', data);
                this.$nextTick(function() {
                    me.selectedVal = me.array2String(data, 'prodName');
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
                    // var param = { condition: JSON.stringify({ productIds: val }) };
                    // yufp.service.request({
                    //   url: backend.adminService + '/api/cmfrcproductmanager/getprobyids',
                    //   method: 'get',
                    //   data: param,
                    //   callback: function (code, message, response) {
                    //     var redata = response.data;
                    //     if (redata != null) {
                    //       var prodname = [];
                    //       for (var i = 0; i < redata.length; i++) {
                    //         prodname.push(redata[i].prodName);
                    //       };
                    //     }
                    //     _this.selectedVal = prodname.join(',');
                    //   }
                    // });
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
}(Vue, yufp.$, 'yufp-prod-selector'));