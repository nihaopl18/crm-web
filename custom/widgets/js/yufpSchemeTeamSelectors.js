/**
 *  客户团队选择器
 */
(function (vue, $, name) {
    // 注册用户组件
    vue.component(name, {
        template: '<div>\
             <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
             @focus="onIconClickFn" :on-icon-click="onIconClickFn" readonly name="客户团队" v-model="selectedVal"></el-input>\
             <el-dialog-x title="客户团队筛选" :visible.sync= "dialogVisible" :height="height" :width = "width">\
             <el-row :gutter="20">\
             <el-col :span="14">\
             <el-form-q ref="queryCondition"\
             :fieldData="user.fieldData" :buttons="user.buttons"></el-form-q>\
             <el-table-x ref="usertable" :checkbox="false" :max-height="user.maxHeight"\
             :data-url="user.dataUrl" :base-params="user.dataParams" :table-columns="user.tableColumns"  :default-load="false" @row-click="dataSelect">\
             </el-table-x>\
             </el-col>\
            <el-col :span="10">\
            <div style="margin-top: 105px;">\
            <yu-table :data="selectTeamArr">\
            <yu-table-column prop="mktTeamId" label="团队编号" > </yu-table-column>\
            <yu-table-column prop="mktTeamName" label="团队名称" > </yu-table-column>\
            <yu-table-column  label="操作" >\
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
                default: '请选择客户经理团队'
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
            handleClick: function(row) {
                
                var arr = this.selectTeamArr;
                //移除数组中的元素
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].userId == row.userId) {
                        arr.splice(i, 1);
                        break;
                    }
                }

            },
            dataSelect: function(row) {
                var arr = this.selectTeamArr;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].mktTeamId == row.mktTeamId) {
                        return;
                    }
                }
                this.selectTeamArr.push(row);
            },
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
                    schemeId: '',
                    selectTeamArr: [],
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
                            { placeholder: '团队编号', field: 'mktTeamId', type: 'input' },
                            { placeholder: '团队名称', field: 'mktTeamName', type: 'input' }
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
                        }],
                        load: false, // 不默认查询
                        dataUrl: backend.appBaseService + '/api/pmafassesstarget/getTemeBySchemeId',
                        dataParams: {

                        },
                        tableColumns: [
                            { label: '团队编号', prop: 'mktTeamId', width: '', resizable: true },
                            { label: '团队名称', prop: 'mktTeamName', width: '', resizable: true }
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
                    this.schemeId = params.schemeId;
                    this.$refs.usertable.remoteData(param);
                });
            },
            queryFn: function (params) {
                var _this = this;

                var temp = params;
                temp.schemeId = _this.schemeId;
                temp.mktTeamId = !temp.mktTeamId ? this.user.dataParams.mktTeamId : temp.mktTeamId;
                temp.mktTeamName = !temp.mktTeamName ? this.user.dataParams.mktTeamName : temp.mktTeamName;

                var param = { condition: JSON.stringify(temp) };
                this.$refs.usertable.remoteData(param);
            },
            confirmFn: function () {
                var me = this;
                var data = this.selectTeamArr;
                this.$emit('input', this.array2String(data, 'mktTeamId'));
                this.$emit('select-fn', data);
                this.$nextTick(function () {
                    me.selectedVal = me.array2String(data, 'mktTeamName');
                });
                me.user.dataParams.mktTeamId = '';
                me.user.dataParams.mktTeamName = '';
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
}(Vue, yufp.$, 'yufp-scheme-team-selectors'));