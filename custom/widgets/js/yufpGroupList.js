/**
 * yufp-CustGroup
 * 客户群放大镜
 * Created by caocc on 2020/09/03.
 * updated by lixt1 on 2021/01/06
 */
(function(vue, $, name) {
    // 注册用户组件
    vue.component(name, {
        template: '<div>\
         <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
         @focus="onIconClickFn" :on-icon-click="onIconClickFn" readonly name="用户" v-model="selectedVal"></el-input>\
         <el-dialog-x title="客户群查询" :visible.sync= "dialogVisible" :height="height" :width = "width">\
         <el-row :gutter="20">\
          <div class="yu-toolBar">\
          <el-form-q ref="queryCondition"\
          :fieldData="user.fieldData" :buttons="user.buttons" :columns="3"></el-form-q>\
          <yu-xtable ref="usertable" row-number selection-type="radio" :height="user.maxHeight"\
            :data-url="user.dataUrl" :base-params="user.dataParams">\
            <yu-xtable-column label="客户群编号" prop="custGroupId"></yu-xtable-column>\
            <yu-xtable-column label="客户群名称" prop="custGroupName"></yu-xtable-column>\
            <yu-xtable-column label="创建人" prop="createUser"></yu-xtable-column>\
            <yu-xtable-column label="创建时间" prop="createDate"></yu-xtable-column>\
          </yu-xtable>\
          </div>\
         </el-row>\
         <div slot="footer" class="dialog-footer"  align="center">\
          <el-button type="primary" @click="confirmFn">确 定</el-button>\
          <el-button @click="dialogVisible = false">取 消</el-button>\
         </div>\
         </el-dialog-x>\
         </div>',
        props: {
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
        // created: function () {
        //   this.selectedVal = this.rawValue ? this.rawValue : this.value.custGroupNames;
        // },
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
                    custgroupid: '',
                    custgroupdata: [],
                    dialogVisible: false,
                    user: {
                        checkbox: true,
                        maxHeight: maxHeight,
                        fieldData: [
                            // { placeholder: '客户群编号', field: 'id', type: 'input' },
                            { placeholder: '客户群名称', field: 'custGroupName', type: 'input' }
                        ],
                        buttons: [{
                                label: '查询',
                                op: 'submit',
                                type: 'primary',
                                icon: 'search',
                                click: function(model, valid) {
                                    if (valid) {
                                        // var param = { condition: JSON.stringify(model) };
                                        me.queryFn(model);
                                    }
                                }
                            },
                            {
                                label: '重置',
                                op: 'reset',
                                type: 'primary',
                                icon: 'el-icon-edit'
                            }
                        ],
                        dataUrl: '/api/ocrmfcicgbase/queryBaselist',
                        load: true,
                        dataParams: {
                            org: yufp.session.instu.code,
                            orgIdAuth: yufp.session.org.id,
                            userCode: yufp.session.userCode,
                            isFocus: ''
                        },
                        majTableColumns: [
                            // { width: '50', resizable: true, type: 'radio' },
                            { label: '序号', width: '50', resizable: true, type: 'index' },
                            { label: '客户群编号', prop: 'id', width: '120', resizable: true },
                            { label: '客户群名称', prop: 'groupName', width: '120', resizable: true },
                            { label: '客户群备注', prop: 'groupRemark', width: '120', resizable: true },
                            { label: '成员数', prop: 'groupNum', width: '120', resizable: true },
                            { label: '创建人', prop: 'foundName', resizable: true },
                            { label: '创建机构', prop: 'foundOrgName', resizable: true },
                            { label: '创建时间', prop: 'foundTime', width: '100', resizable: true }
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
                this.$nextTick(function() {
                    this.$refs.usertable.remoteData();
                });
                this.$emit('click-fn');
            },
            queryFn: function(params) {
                var temp = params;
                this.$refs.usertable.remoteData(temp);
            },
            getCondition: function() {
                return this.$refs.queryCondition.fm;
            },

            confirmFn: function() {
                var me = this;
                var data;
                if (this.$refs.usertable.selections.length == 0) {
                    this.$message('请选择一条数据!', '提示');
                    return;
                } else {
                    // data = me.custgroupid;
                }
                data = this.$refs.usertable.selections;
                if (!this.user.checkbox && data.length > 1) {
                    this.$message('你只能选择一条数据!', '提示');
                    return;
                }
                // if (data[0].createUser != yufp.session.userCode) {
                //   this.$message('只能选择自己创建的客户群!', '提示');
                //   return;
                // }
                //
                this.$emit('input', data[0].custGroupId);
                this.$emit('select-fn', data[0]);
                this.$nextTick(function() {
                    me.selectedVal = data[0].custGroupName;
                });
                this.$refs.queryCondition.fm = {};
                this.dialogVisible = false;
            },
            // 对外提供选择器显示值
            getRawValue: function() {
                return this.selectedVal;
            },
            setRawValue: function(val) {
                this.selectedVal = val;
            },
            array2String: function(array) {
                var custGroups = {};
                var custGroupIds = '';
                var custGroupNames = '';
                for (var i = 0; i < array.length; i++) {
                    if (i == 0) {
                        custGroupIds = array[i].custGroupId;
                        custGroupNames = array[i].custGroupName;
                    } else {
                        custGroupIds += ',' + array[i].custGroupId;
                        custGroupNames += ',' + array[i].custGroupName;
                    }
                }
                custGroups.custGroupIds = custGroupIds;
                custGroups.custGroupNames = custGroupNames;
                return custGroups;
            },
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
            /**
             * 客户群表格行点击后执行
             * 查询客户群下的客户群成员
             */
            rowClickFn: function(row) {
                var custGroupId = row.custGroupId;
                var groupMemberType = row.groupMemberType;
                var param = {
                    condition: JSON.stringify({
                        custGroupId: custGroupId,
                        custType: groupMemberType
                    })
                };
                this.$refs.membertable.remoteData(param);
            }
        },
        watch: {
            value: function(val) {
                var _this = this;
                _this.selectedVal = val;
                // var param = { condition: JSON.stringify({ custGroupIds: val }) };
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
}(Vue, yufp.$, 'yufp-group-list'));