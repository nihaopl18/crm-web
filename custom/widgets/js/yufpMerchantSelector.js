/**
 * yufp-CustInfo
 * 商户选择放大镜
 * Created by hujun3 20190121.
 */
(function(vue, $, name) {
    // 注册用户组件
    vue.component(name, {
        template: '<div>\
         <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
         @focus="dialogVisible = true" :on-icon-click="onIconClickFn" readonly name="商户" v-model="selectedVal"></el-input>\
         <el-dialog-x title="商户选择" :visible.sync= "dialogVisible" :height="height" :width = "width" @open="openFn">\
         <el-row :gutter="20">\
         <el-col :span="24">\
         <el-form-q ref="queryCondition"\
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
                default: '请选择商户'
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
        // created: function () {
        //   this.selectedVal = this.rawValue ? this.rawValue : this.value.custGroupNames;
        // },

        methods: {
            openFn: function() {
                var me = this;
                var temp = me.getDefaultData();
                yufp.extend(true, temp, me.params);
                me.$nextTick(function() {
                    me.$refs.usertable.remoteData(temp);
                });
            },
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
                    width: '1100px',
                    transType: '', // 调整类型
                    selectedVal: '',
                    custgroupid: '',
                    custgroupdata: [],
                    dialogVisible: false,
                    user: {
                        checkbox: false,
                        maxHeight: maxHeight,
                        dataParams: {
                            condition: JSON.stringify({
                                dataSts: 'I'
                            })
                        },
                        fieldData: [
                            { placeholder: '商户名称', field: 'custId', type: 'input' },
                            { placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'IDENT_TYPE' },
                            { placeholder: '证件号码', field: 'certNo', type: 'input' }
                        ],
                        buttons: [{
                            label: '搜索',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            click: function(model, valid) {
                                if (valid) {
                                    var temp = model;
                                    temp.transType = me.transType;
                                    var param = { condition: JSON.stringify(temp) };
                                    me.queryFn(param);
                                }
                            }
                        }, {
                            label: '重置',
                            op: 'reset',
                            type: 'primary',
                            icon: 'el-icon-edit'
                        }],
                        dataUrl: backend.qyPoolService + '/api/loyqymerchantinfo/getlist',
                        tableColumns: [
                            { label: '商户编号', prop: 'merchantId', width: '120', hidden: true },
                            { label: '商户名称', prop: 'merchantName', width: '150', resizable: true },
                            { label: '商户工商名称', prop: 'merIacName', width: '150', resizable: true },
                            { label: '商户门店名称', prop: 'merStroeName', width: '150', resizable: true },
                            { label: '法人名称', prop: 'legalPersonNm', width: '150', resizable: true },
                            { label: '证件类型', prop: 'certType', width: '130', resizable: true, dataCode: 'IDENT_TYPE' },
                            { label: '证件号码', prop: 'certNo', width: '150', resizable: true },
                            { label: '经营范围', prop: 'manageAType', resizable: true, dataCode: 'MANAGE_A_TYPE' }
                        ]
                    }
                };
            },
            getValueByKey: function(array, k) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].id == k) {
                        return array[i].label;
                    }
                }
            },
            onIconClickFn: function(val) {
                if (this.disabled) {
                    return;
                }
                this.dialogVisible = true;
                this.$emit('click-fn');
            },
            queryFn: function(params) {
                var temp = params;
                temp.merchantName = temp.merchantName == '' || temp.merchantName == undefined ? this.user.dataParams.merchantName : temp.merchantName;
                temp.certType = temp.certType == '' || temp.certType == undefined ? this.user.dataParams.certType : temp.certType;
                temp.certNo = temp.certNo == '' || temp.certNo == undefined ? this.user.dataParams.certNo : temp.certNo;
                this.$refs.usertable.remoteData(temp);
            },
            getCondition: function() {
                return this.$refs.queryCondition.fm;
            },
            // currentChangeFn: function (nodeData, node, self) {
            //   // 仅用于复选框
            //   if (this.treeCheckbox) {
            //     var params = this.getCondition();
            //     var code = this.$refs.orgtree.getCheckedKeys().toString();
            //     params.orgCode = code;
            //     this.queryFn(params);
            //   }
            // },
            confirmFn: function() {
                var me = this;
                var data;
                if (this.$refs.usertable.selections.length != 0) {
                    data = this.$refs.usertable.selections;
                } else {
                    data = me.custId;
                }
                if (data == undefined || data.length == 0) {
                    this.$message('请至少选择一条数据!', '提示');
                    return false;
                }
                if (!this.user.checkbox && data.length > 1) {
                    this.$message('你只能选择一条数据!', '提示');
                    return;
                }
                this.$emit('input', this.array2String(data).merchantIds);
                this.$emit('select-fn', data);
                this.$nextTick(function() {
                    me.selectedVal = me.array2String(data).merchantNames;
                });
                this.dialogVisible = false;
            },
            // 对外提供选择器显示值
            getRawValue: function() {
                return this.selectedVal;
            },
            array2String: function(array) {
                    var custinfos = {};
                    var merchantIds = '';
                    var merchantNames = '';
                    // var s = '';
                    for (var i = 0; i < array.length; i++) {
                        if (i == 0) {
                            merchantIds = array[i].merchantId;
                            merchantNames = array[i].merchantName;
                        } else {
                            merchantIds += ',' + array[i].merchantId;
                            merchantNames += ',' + array[i].merchantName;
                        }
                    }
                    custinfos.merchantIds = merchantIds;
                    custinfos.merchantNames = merchantNames;
                    return custinfos;
                }
                // array2String: function (array, label) {
                //   var s = '';
                //   for (var i = 0; i < array.length; i++) {
                //     if (i == 0) {
                //       s += array[i][label];
                //     } else {
                //       s += ',' + array[i][label];
                //     }
                //   }
                //   return s;
                // }
        },
        watch: {
            value: function(val) {
                var _this = this;
                if (val === '' || val === undefined) {
                    _this.selectedVal = '';
                } else {
                    // var param = { condition: JSON.stringify({merchantId: val}) };
                    yufp.service.request({
                        url: backend.qyPoolService + '/api/loyqymerchantinfo/detailList?ids=' + val,
                        method: 'get',
                        // data: param,
                        callback: function(code, message, response) {
                            var redata = response.data;
                            if (redata != null) {
                                var groupname = [];
                                for (var i = 0; i < redata.length; i++) {
                                    groupname.push(redata[i].merchantName);
                                };
                            }
                            _this.selectedVal = groupname.join(',');
                        }
                    });
                    // _this.selectedVal = val;
                }
                _this.$emit('change', val);
            },
            rawValue: function(val) {
                this.selectedVal = val;
            },
            params: function(val) {
                yufp.extend(true, this, val);
            },
            custgroupdata: function(val) {
                if (val) {
                    var merchantName = '';
                    if (val.length == 1) {
                        merchantName += val[i].merchantName;
                    } else {
                        for (var i = 0; i < val.length; i++) {
                            merchantName += val[i].merchantName + ',';
                            if (i == val.length - 1) {
                                merchantName += val[i].merchantName;
                            }
                        }
                    }
                    this.selectedVal = merchantName;
                }
            }
        }
    });
}(Vue, yufp.$, 'yufp-merchant'));