/**
 * 数据库表格选择器yufp-column-selector
 * @param tables-要查询的表格参数
 * @param needCheckbox-表格复选框
 * @param maxHeight-最大高度
 * @authors yangxiao2
 * @date    2018-11-13 
 * @version $1.0$
 */
(function(vue, $, name) {
    //注册角色组件
    vue.component(name, {
        template: '<div>\
            <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
            @focus="dialogVisible = true" :on-icon-click="onIconClickFn" readonly name="表格字段信息" v-model="selectedVal"></el-input>\
            <el-dialog-x title="表格字段查询" :visible.sync= "dialogVisible" height="430px" width = "1000px" top="12%">\
            <link rel="stylesheet" type="text/css" href="pages/context/custTagQuery/custTagQuery.css"/>\
            <el-row style="height: 26px;line-height: 26px;">\
            <el-col :span="2">\
            <div>选中数据:</div>\
            </el-col>\
            <el-col :span="22">\
            <link rel="stylesheet" type="text/css" href="pages/context/custTagQuery/custTagQuery.css"/>\
			<div v-for="(item,index) in setselectList ">\
				<a class="ys-stcTag" href="javascript:void(0)" title="item.columnName">{{item.columnName}}<i  class="el-icon-yx-cross" @click="deleteSeTagFnofset(item)"></i></a>\
            </div>\
            </el-col>\
            </el-row>\
            <el-row :gutter="20">\
            <el-col :span="24">\
            <el-form-q ref="queryCondition" from="query"\
            :fieldData="role.fieldData" :buttons="role.buttons"></el-form-q>\
            <el-table-x ref="roletable" :checkbox="role.checkbox" :height="320"\
            :data-url="role.dataUrl" :base-params="role.dataParams"\
            :table-columns="role.tableColumns" @row-click="selectDataFn"></el-table-x>\
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
                default: '请选择字段信息'
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
            /** 设置标签删除选中的标签 */
            deleteSeTagFnofset: function(tag) {
                var info = this.setselectList;
                for (let i = 0; i < info.length; i++) {
                    if (info[i].tableName == tag.tableName && info[i].columnName == tag.columnName) {
                        this.setselectList.splice(i, 1);
                        break;
                    }
                }
            },
            selectDataFn: function(select, row, c) {
                var flag = true;
                var info = {};
                info.tableName = select.tableName;
                info.columnName = select.columnName;
                var str = this.setselectList;
                for (let i = 0; i < str.length; i++) {
                    if (str[i].tableName == select.tableName && str[i].columnName == select.columnName) {
                        this.setselectList.splice(i, 1);
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    this.setselectList.push(info);
                }

            },
            getDefaultData: function() {
                var me = this;
                var maxHeight;
                var tables;
                return {
                    height: "360px",
                    width: "1000px",
                    selectedVal: "",
                    setselectList: [], // 选中的
                    dialogVisible: false,
                    role: {
                        checkbox: false,
                        fieldData: [{
                            placeholder: '表格名称',
                            field: 'tableName',
                            type: 'input'
                        }, {
                            placeholder: '字段名称',
                            field: 'columnName',
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
                        dataUrl: backend.adminService + "/api/asseibly/getcolumnbytable",
                        maxHeight: maxHeight,
                        dataParams: {
                            tables: tables
                        },
                        tableColumns: [
                            { label: '表格名称', prop: 'tableName' },
                            { label: '字段名称', prop: 'columnName', width: '200' },
                            // { label: '字段备注', prop: 'comments', width: '200' }
                        ]
                    }
                };
            },
            onIconClickFn: function(val) {
                this.dialogVisible = true;
            },
            queryFn: function(params) {
                this.$refs.roletable.remoteData();
            },
            confirmFn: function() {
                var me = this;
                // var data = this.$refs.roletable.selections;
                var data = this.setselectList;
                if (data.length == 0) {
                    this.$message("请至少选择一条数据!", "提示");
                    return false;
                }
                if (!this.tabCheckbox && data.length > 1) {
                    this.$message("你只能选择一条数据!", "提示");
                    return;
                }
                this.$emit("input", me.array3String(data, "columnName", "tableName"));
                this.$emit("select-fn", data);
                this.$nextTick(function() {
                    //  me.selectedVal = this.array2String(data, "columnName");
                    me.selectedVal = me.array3String(data, "columnName", "tableName");
                });
                this.dialogVisible = false;
            },
            // 对外提供选择器显示值
            getRawValue: function() {
                return this.selectedVal;
            },
            array2String: function(array, label) {
                var s = "";
                for (var i = 0; i < array.length; i++) {
                    if (i == 0) {
                        s += (array[i])[label];
                    } else {
                        s += "@@" + (array[i])[label];
                    }
                }
                return s;
            },
            array3String: function(array, label, label2) {
                var s = "";
                for (var i = 0; i < array.length; i++) {
                    if (i == 0) {
                        s += (array[i])[label2] + '.' + (array[i])[label];
                    } else {
                        s += "@@" + (array[i])[label2] + '.' + (array[i])[label];
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
                var me = this;
                var temp = me.createData();
                yufp.extend(true, me, val);
                temp.role.dataParams.tables = val.tables;
                me.role.dataParams = temp.role.dataParams;
            }
        }
    });
})(Vue, yufp.$, "yufp-column-selector");