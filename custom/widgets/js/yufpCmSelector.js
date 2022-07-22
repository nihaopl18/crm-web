/**
 * yufp-CustGroup
 * 客户群放大镜
 * Created by houyx3 on 2018/11/15.
 */
(function(vue, $, name) {
    // 注册用户组件
    vue.component(name, {
        template: '<div>\
         <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
         @focus="dialogVisible = true" :on-icon-click="onIconClickFn" readonly name="用户" v-model="selectedVal"></el-input>\
         <el-dialog-x title="客户群管理" :visible.sync= "dialogVisible" :height="height" :width = "width">\
         <el-row :gutter="20">\
         <el-col :span="24">\
         <el-form-q ref="queryCondition"\
         :fieldData="user.fieldData" :buttons="user.buttons"></el-form-q>\
         <el-table-x ref="usertable" :radiobox="user.radio" :max-height="user.maxHeight"\
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
                default: '请选择客户群'
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
            var val = this.value;
            var param = { condition: JSON.stringify({ customerLogCode: val }) };
            var custName = '';
            yufp.service.request({
                url: backend.adminService + '/api/indexplan/customerbylogincode',
                method: 'get',
                async: false,
                data: param,
                callback: function(code, message, response) {
                    var redata = response.data[0];
                    if (redata != null) {
                        custName = redata.userName;
                    }
                }
            });
            this.selectedVal = this.rawValue ? this.rawValue : custName;
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
                // temp.user.dataParams.searchType = temp.org.searchType;
                return temp;
            },
            getDefaultData: function() {
                var me = this;
                var maxHeight;
                return {
                    height: '400px',
                    width: '1000px',
                    selectedVal: '',
                    loginCode: '',
                    custgroupdata: [],
                    dialogVisible: false,
                    user: {
                        radio: true,
                        maxHeight: maxHeight,
                        fieldData: [
                            { placeholder: '登陆编号', field: 'loginCode', type: 'input' },
                            { placeholder: '客户经理名称', field: 'userName', type: 'select', dataCode: 'CLIENT_ORIGIN' }
                        ],
                        buttons: [{
                            label: '搜索',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            click: function(model, valid) {
                                if (valid) {
                                    var param = { condition: JSON.stringify(model) };
                                    me.queryFn(param);
                                }
                            }
                        }, {
                            label: '重置',
                            op: 'reset',
                            type: 'primary',
                            icon: 'el-icon-edit'
                        }],
                        dataUrl: backend.adminService + '/api/indexplan/customerquery',
                        dataParams: {},
                        tableColumns: [
                            { label: '登陆编号', prop: 'loginCode', width: '200', resizable: true },
                            { label: '客户经理名称', prop: 'userName', width: '200', resizable: true }
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
            // setOptionsByUrl: function (order, url) {
            //   var me = this;
            //   yufp.service.request({
            //     url: url + '?userId=' + yufp.session.userId,
            //     method: 'get',
            //     callback: function (code, message, response) {
            //       if (response != null && response.data != null) {
            //         me.user.fieldData[order].options = response.data;
            //       }
            //     }
            //   });
            // },
            onIconClickFn: function(val) {
                this.dialogVisible = true;
            },
            queryFn: function(params) {
                var temp = params;
                // temp.roleId = temp.roleId == '' || temp.roleId == undefined ? this.user.dataParams.roleId : temp.roleId;
                // temp.roleId = (temp.roleId == '' || temp.roleId == undefined) ? this.user.dataParams.roleId : temp.roleId;
                temp.custGroupName = temp.custGroupName == '' || temp.custGroupName == undefined ? this.user.dataParams.custGroupName : temp.custGroupName;
                temp.custOrigin = temp.custOrigin == '' || temp.custOrigin == undefined ? this.user.dataParams.custOrigin : temp.custOrigin;
                temp.clientNO = temp.clientNO == '' || temp.clientNO == undefined ? this.user.dataParams.clientNO : temp.clientNO;
                temp.clientName = temp.clientName == '' || temp.clientName == undefined ? this.user.dataParams.clientName : temp.clientName;
                temp.idType = temp.idType == '' || temp.idType == undefined ? this.user.dataParams.idType : temp.idType;
                temp.idNO = temp.idNO == '' || temp.idNO == undefined ? this.user.dataParams.idNO : temp.idNO;
                temp.customerManager = temp.customerManager == '' || temp.customerManager == undefined ? this.user.dataParams.customerManager : temp.customerManager;
                temp.createOrgan = temp.createOrgan == '' || temp.createOrgan == undefined ? this.user.dataParams.createOrgan : temp.createOrgan;
                temp.createDate = temp.createDate == '' || temp.createDate == undefined ? this.user.dataParams.createDate : temp.createDate;
                temp.endDate = temp.endDate == '' || temp.endDate == undefined ? this.user.dataParams.endDate : temp.endDate;
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
                    data = me.loginCode;
                }
                if (data.length == 0) {
                    this.$message('请至少选择一条数据!', '提示');
                    return false;
                }
                if (!this.user.checkbox && data.length > 1) {
                    this.$message('你只能选择一条数据!', '提示');
                    return;
                }
                this.$emit('input', this.array2String(data).loginCode);
                this.$emit('select-fn', data);
                this.$nextTick(function() {
                    me.selectedVal = me.array2String(data).userName;
                });
                this.dialogVisible = false;
            },
            // 对外提供选择器显示值
            getRawValue: function() {
                return this.selectedVal;
            },
            array2String: function(array) {
                    var customers = {};
                    var loginCode = '';
                    var userName = '';
                    // var s = '';
                    for (var i = 0; i < array.length; i++) {
                        if (i == 0) {
                            loginCode = array[i].loginCode;
                            userName = array[i].userName;
                        } else {
                            loginCode += ',' + array[i].loginCode;
                            userName += ',' + array[i].userName;
                        }
                    }
                    customers.loginCode = loginCode;
                    customers.userName = userName;
                    return customers;
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
                this.selectedVal = val;
                var _this = this;
                // var param = { condition: JSON.stringify({custGroupIds: val}) };
                // yufp.service.request({
                //   url: backend.adminService + '/api/cimpccgbaseinfo/listcmp',
                //   method: 'get',
                //   data: param,
                //   callback: function (code, message, response) {
                //     var redata = response.data;
                //     if (redata != null) {
                //       var groupname = [];
                //       for (var i = 0; i < redata.length; i++) {
                //         groupname.push(redata[i].custGroupName);
                //       };
                //     }
                //     _this.selectedVal = groupname.join(',');
                //   }
                // });
                var data = this.$refs.usertable.data;
                for (var index = 0; index < data.length; index++) {
                    var element = data[index];
                    if (element.loginCode == val) {
                        var userName = element.userName;
                        _this.selectedVal = userName;
                    }
                }
                if (val === '') {
                    this.$refs.usertable.clearSelection();
                }
                this.$emit('change', val);
            },
            rawValue: function(val) {
                this.selectedVal = val;
            },
            params: function(val) {
                yufp.extend(true, this, val);
            },
            custgroupdata: function(val) {
                if (val) {
                    var groupname = '';
                    if (val.length == 1) {
                        groupname += val[i].custGroupName;
                    } else {
                        for (var i = 0; i < val.length; i++) {
                            groupname += val[i].custGroupName + ',';
                            if (i == val.length - 1) {
                                groupname += val[i].custGroupName;
                            }
                        }
                    }
                    this.selectedVal = groupname;
                }
            }
        }
    });
}(Vue, yufp.$, 'yufp-cm-selector'));