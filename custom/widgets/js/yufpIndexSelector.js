/**
 *  考核指标选择器
 */
(function (vue, $, name) {
    // 注册用户组件
    vue.component(name, {
        template: '<div>\
             <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
             @focus="onIconClickFn" :on-icon-click="onIconClickFn" readonly name="考核指标" v-model="selectedVal"></el-input>\
             <el-dialog-x title="考核指标选择器" :visible.sync= "dialogVisible" :height="height" :width = "width">\
             <el-row :gutter="20">\
             <el-form-q ref="queryCondition"\
             :fieldData="user.fieldData" :buttons="user.buttons"></el-form-q>\
             <el-table-x ref="usertable" :checkbox="false" :max-height="user.maxHeight"\
             :data-url="user.dataUrl" :base-params="user.dataParams" :table-columns="user.tableColumns" request-type="post" :default-load="true">\
             </el-table-x>\
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
            schemeId: String,
            rawValue: String,
            size: String,
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '请选择考核指标'
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
            var me = this;
            console.log('me.params', me.params)
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
                            { placeholder: '考核指标编号', field: 'indexId', type: 'input' },
                            { placeholder: '考核指标名称', field: 'indexName', type: 'input' }
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
                        load: false, // 不默认查询
                        dataUrl: backend.appBaseService + '/api/pmafbaseindexinfo/queryIndexList',
                        dataParams: {
                            schemeId: me.params.schemeId
                        },
                        tableColumns: [
                            { label: '考核指标编号', prop: 'indexId', width: '', resizable: true },
                            { label: '考核指标名称', prop: 'indexName', width: '', resizable: true }
                        ]
                    }
                };
            },
            onIconClickFn: function (val) {
                this.dialogVisible = true;
                this.$nextTick(function () {
                    this.$refs.usertable.clearSelection();
                    // var params = this.params; // 查询参数
                    // //params.schemeId = this.indexParams.schemeId;
                    // console.log('params', params);
                    // var param = {
                    //     condition: JSON.stringify(params)
                    // };
                    // this.$refs.usertable.remoteData(param);
                });
            },
            queryFn: function (params) {
                var _this = this;
                console.log('params----->', params)
                var temp = params;
                temp.indexId = !temp.indexId ? this.user.dataParams.indexId : temp.indexId;
                temp.indexName = !temp.indexName ? this.user.dataParams.indexName : temp.indexName;
                temp.schemeId = _this.params.schemeId;
                // temp.evlObjType = !temp.evlObjType ? this.params.evlObjType : temp.evlObjType;
                // temp.checkScene = !temp.checkScene ? this.params.checkScene : temp.checkScene;
                // temp.objId = !temp.objId ? this.params.objId : temp.objId;
                // temp.grantObjId = this.params.grantObjId;
                console.log('temp', temp)
                // var param = {
                //     condition: JSON.stringify(temp)
                // };
                this.$refs.usertable.remoteData(temp);
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
                this.$emit('input', this.array2String(data, 'indexId'));
                this.$emit('select-fn', data);
                this.$nextTick(function () {
                    me.selectedVal = me.array2String(data, 'indexName');
                });
                me.user.dataParams.indexId = '';
                me.user.dataParams.indexName = '';
                //me.$refs.queryCondition.resetFields();
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
                        // yufp.service.request({
                        //     url: backend.appBaseService + '/api/pmafscheme/querynames',
                        //     method: 'get',
                        //     data: { indexId: val },
                        //     callback: function (code, message, response) {
                        //         if (response.code == 0 && response.data != null) {
                        //             _this.selectedVal = response.data;
                        //         }
                        //     }
                        // });
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
}(Vue, yufp.$, 'yufp-index-selector'));