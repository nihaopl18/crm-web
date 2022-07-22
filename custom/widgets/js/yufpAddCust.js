/**
 * yufp-add-cust
 * 引入客户放大镜
 * Created by zhuly6 on 2019/1/2.
 */
(function (vue, $, name) {
  // 注册用户组件
  vue.component(name, {
    template:
      '<div>\
       <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
       @focus="dialogVisible = true" :on-icon-click="onIconClickFn" readonly name="用户" v-model="selectedVal"></el-input>\
       <el-dialog-x title="客户放大镜" :visible.sync= "dialogVisible" :height="height" :width = "width">\
       <el-form-q ref="queryCondition"\
       :fieldData="user.fieldData" :buttons="user.buttons" :columns="3" :labelWidth="labelWidth"></el-form-q>\
       <el-row :gutter="20">\
       <el-col :span="12">\
       <el-table-x ref="usertable" :checkbox="user.checkbox" :max-height="user.maxHeight"\
       :data-url="user.dataUrl" :base-params="user.dataParams" :table-columns="user.majTableColumns"></el-table-x>\
       </el-col>\
       <el-col :span="12">\
       <el-table-x ref="usertable" :checkbox="user.checkbox" :max-height="user.maxHeight"\
       :data-url="user.dataUrl" :base-params="user.dataParams" :table-columns="user.majTableColumns"></el-table-x>\
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
        default: '添加客户'
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
    // created: function () {
    //   this.selectedVal = this.rawValue ? this.rawValue : this.value.custGroupNames;
    // },
    methods: {

      createData: function () {
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
      getDefaultData: function () {
        var me = this;
        var maxHeight;
        return {
          labelWidth: '80px',
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
              { label: '客户类型', field: 'custGroupName', type: 'select'},
              { label: '客户状态', field: 'custGroupName', type: 'select'},
              { label: '客户号', field: 'custGroupName', type: 'input'},
              { label: '客户名称', field: 'custGroupName', type: 'input'},
              { label: '客户群分配状态', field: 'custGroupName', type: 'select'},
              { label: '证件号码', field: 'custGroupName', type: 'input'},
              { label: '客户服务等级', field: 'custGroupName', type: 'select'},
              { label: '客户价值等级', field: 'custGroupName', type: 'select'},
              { label: '归属等级机构', field: 'custGroupName', type: 'select'}

            ],
            buttons: [{
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  me.queryFn(param);
                }
              }
            },
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
            ],
            dataUrl: backend.adminService + '/api/cimpccgbaseinfo/list',
            dataParams: {
            },
            majTableColumns: [
              { label: '客户群编号', prop: 'custGroupId', width: '120', resizable: true },
              { label: '客户群名称', prop: 'custGroupName', width: '150', resizable: true },
              { label: '客户来源', prop: 'custOrigin', width: '100', resizable: true, dataCode: 'CLIENT_ORIGIN' },
              { label: '群成员类型', prop: 'groupMemberType', width: '120', resizable: true, dataCode: 'CUST_GROUP_TYPE' },
              { label: '创建人', prop: 'creatorId', resizable: true },
              {
                label: '创建日期',
                prop: 'createDate',
                formatter: function (row, cloumn) {
                  return yufp.util.dateFormat(row.createDate, '{y}-{m}-{d}');
                },
                resizable: true
              },
              { label: '创建机构', prop: 'createOrgan', resizable: true },
              {
                label: '最近更新日期',
                prop: 'lastChgDt',
                formatter: function (row, cloumn) {
                  return yufp.util.dateFormat(row.lastChgDt, '{y}-{m}-{d}');
                },
                resizable: true
              },
              { label: '最近修改人', prop: 'creatorId', resizable: true },
              { label: '最近修改日期', prop: 'creatorId', resizable: true }
            ]
          },
          majInfoTableColumns: [
            { label: '客户群编号', prop: 'custGroupId', width: '120', resizable: true },
            { label: '客户群名称', prop: 'custGroupName', width: '150', resizable: true },
            { label: '客户号', prop: 'custOrigin', width: '100', resizable: true, dataCode: 'CLIENT_ORIGIN' },
            { label: '客户名称', prop: 'groupMemberType', width: '120', resizable: true, dataCode: 'CUST_GROUP_TYPE' },
            { label: '成员数', prop: 'custNum', resizable: true },
            { label: '创建人', prop: 'creatorId', resizable: true },
            {
              label: '创建日期',
              prop: 'createDate',
              formatter: function (row, cloumn) {
                return yufp.util.dateFormat(row.createDate, '{y}-{m}-{d}');
              },
              resizable: true
            },
            { label: '创建机构', prop: 'createOrgan', resizable: true },
            {
              label: '最近更新日期',
              prop: 'lastChgDt',
              formatter: function (row, cloumn) {
                return yufp.util.dateFormat(row.lastChgDt, '{y}-{m}-{d}');
              },
              resizable: true
            }
          ]
        };
      },
      getValueByKey: function (array, k) {
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
      onIconClickFn: function (val) {
        this.dialogVisible = true;
        this.$emit('click-fn');
      },
      queryFn: function (params) {
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
      getCondition: function () {
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
      confirmFn: function () {
        var me = this;
        var data;
        if (this.$refs.usertable.selections.length != 0) {
          data = this.$refs.usertable.selections;
        } else {
          data = me.custgroupid;
        }
        if (data.length == 0) {
          this.$message('请至少选择一条数据!', '提示');
          return false;
        }
        if (!this.user.checkbox && data.length > 1) {
          this.$message('你只能选择一条数据!', '提示');
          return;
        }
        this.$emit('input', this.array2String(data).custGroupIds);
        this.$emit('select-fn', data);
        this.$nextTick(function () {
          me.selectedVal = me.array2String(data).custGroupNames;
        });
        this.dialogVisible = false;
      },
      // 对外提供选择器显示值
      getRawValue: function () {
        return this.selectedVal;
      },
      array2String: function (array) {
        var custGroups = {};
        var custGroupIds = '';
        var custGroupNames = '';
        // var s = '';
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
      value: function (val) {
        // this.selectedVal = val;
        var _this = this;
        var param = { condition: JSON.stringify({ custGroupIds: val }) };
        yufp.service.request({
          url: backend.adminService + '/api/cimpccgbaseinfo/listcmp',
          method: 'get',
          data: param,
          callback: function (code, message, response) {
            var redata = response.data;
            if (redata != null) {
              var groupname = [];
              for (var i = 0; i < redata.length; i++) {
                groupname.push(redata[i].custGroupName);
              };
            }
            _this.selectedVal = groupname.join(',');
          }
        });
        if (val === '') {
          this.$refs.usertable.clearSelection();
        }
        this.$emit('change', val);
      },
      rawValue: function (val) {
        this.selectedVal = val;
      },
      params: function (val) {
        yufp.extend(true, this, val);
      },
      custgroupdata: function (val) {
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
}(Vue, yufp.$, 'yufp-add-cust'));