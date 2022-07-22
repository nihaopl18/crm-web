/**
 *  考核方案选择器
 */
(function (vue, $, name) {
    // 注册用户组件
    vue.component(name, {
        template: '<div>\
             <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
             @focus="onIconClickFn" :on-icon-click="onIconClickFn" readonly name="考核方案" v-model="selectedVal"></el-input>\
             <el-dialog-x title="考核方案选择器" :visible.sync= "dialogVisible" :height="height" :width = "width">\
             <el-row :gutter="20">\
             <el-form-q ref="queryCondition"\
             :fieldData="user.fieldData" :buttons="user.buttons"></el-form-q>\
             <el-table-x ref="usertable" :checkbox="false" :max-height="user.maxHeight"\
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
                default: '请选择考核方案'
            },
            icon: {
                type: String,
                default: 'search'
            },
            params: Object
        },
        data: function () {
            return this.createData();
        },
        created: function () {
            this.selectedVal = this.rawValue ? this.rawValue : this.value;
        },
        methods: {
            createData: function () {
                var me = this;
                var temp = me.getDefaultData();
                yufp.extend(true, temp, me.params);
                return temp;
            },
            getDefaultData: function () {
                var me = this;
                var maxHeight;
                return {
                    height: '350px',
                    width: '850px',
                    selectedVal: '',
                    dialogVisible: false,
                    user: {
                        checkScene: '',
                        evlObjType: '',
                        checkbox: true,
                        maxHeight: maxHeight,
                        fieldData: [
                            { placeholder: '考核方案编号', field: 'schemeId', type: 'input' },
                            { placeholder: '考核方案名称', field: 'schemeName', type: 'input' }
                        ],
                        buttons: [{
                            label: '搜索',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            click: function (model, valid) {
                                if (valid) {
                                    me.queryFn(model);
                                }
                            }
                        }, {
                            label: '重置',
                            op: 'reset',
                            type: 'primary',
                            icon: 'information'
                        }],
                        load: true, // 不默认查询
                        dataUrl: backend.appBaseService + '/api/pmafscheme/querySchemeList',
                        dataParams: {
                        },
                        tableColumns: [
                            { label: '考核方案编号', prop: 'schemeId', width: '', resizable: true },
                            { label: '考核方案名称', prop: 'schemeName', width: '', resizable: true }
                        ]
                    }
                };
            },
            onIconClickFn: function (val) {
                this.dialogVisible = true;
                this.$nextTick(function () {
                    this.$refs.usertable.clearSelection();
                    var params = this.params; // 查询参数
                    var param = {
                        condition: JSON.stringify(params)
                    };
                    this.$refs.usertable.remoteData(param);
                });
            },
            queryFn: function (params) {
                var temp = params;
                temp.schemeId = !temp.schemeId ? this.user.dataParams.schemeId : temp.schemeId;
                temp.schemeName = !temp.schemeName ? this.user.dataParams.schemeName : temp.schemeName;
                // temp.evlObjType = !temp.evlObjType ? this.params.evlObjType : temp.evlObjType;
                // temp.checkScene = !temp.checkScene ? this.params.checkScene : temp.checkScene;
                // temp.objId = !temp.objId ? this.params.objId : temp.objId;
                // temp.grantObjId = this.params.grantObjId;
                var param = {
                    condition: JSON.stringify(temp)
                };
                this.$refs.usertable.remoteData(param);
            },
            confirmFn: function () {
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
                this.$emit('input', this.array2String(data, 'schemeId'));
                this.$emit('select-fn', data);
                this.$nextTick(function () {
                    me.selectedVal = me.array2String(data, 'schemeName');
                });
                this.dialogVisible = false;
            },
            // 对外提供选择器显示值
            getRawValue: function () {
                return this.selectedVal;
            },
            array2String: function (array, label) {
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
            value: {
                immediate: true,
                handler: function (val) {
                    var _this = this;
                    if (val == '' || val == null) {
                        _this.selectedVal = '';
                    } else {
                        yufp.service.request({
                            url: backend.appBaseService + '/api/pmafscheme/querynames',
                            method: 'get',
                            data: { schemeId: val },
                            callback: function (code, message, response) {
                                if (response.code == 0 && response.data != null) {
                                    _this.selectedVal = response.data;
                                }
                            }
                        });
                    }
                }
            },
            rawValue: function (val) {
                this.selectedVal = val;
            },
            params: function (val) {
                yufp.extend(true, this, val);
            }
        }
    });
}(Vue, yufp.$, 'yufp-dy-scheme-selector'));