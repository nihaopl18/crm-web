/**
 * yufp-all-cust-selector
 * 全行客户查询放大镜
 * Created by taoting1 on 2019/02/15.
 */
(function (vue, $, name) {
  // 注册用户组件
  vue.component(name, {
    template:
      '<div>\
      <slot name="trigerEl">\
       <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
       @focus="onIconClickFn" :on-icon-click="onIconClickFn" readonly name="用户" v-model="selectedVal"></el-input>\
       </slot>\
       <el-dialog-x :title="selectTit" :visible.sync= "dialogVisible" :height="height" :width = "width">\
       <el-form-q ref="queryCondition"\
       :fieldData="user.fieldData" :buttons="user.buttons" :columns="user.fieldColumns" :labelWidth="labelWidth"></el-form-q>\
       <el-table-x ref="usertable" :checkbox="user.checkbox" :max-height="user.maxHeight"\
       :data-url="user.dataUrl" :base-params="user.dataParams" :row-index="rowIndex" :table-columns="user.majTableColumns" :default-load= false></el-table-x>\
       <div slot="footer" class="dialog-footer"  align="center">\
       <el-button @click="dialogVisible = false" type="primary">取 消</el-button>\
       <el-button type="primary" @click="confirmFn">确 定</el-button>\
       </div>\
       </el-dialog-x>\
       </div>',
    props: {
      value: String,
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
          selectTit: '客户放大镜',
          // 表格是否展示序号
          rowIndex: false,
          user: {
            defaultLoad: false,
            checkbox: true,
            maxHeight: maxHeight,
            fieldColumns: 3,
            fieldData: [
              { label: '客户类型', field: 'custType', type: 'select', dataCode: 'CD0016'},
              { label: '客户状态', field: 'custStatus', type: 'select', dataCode: 'CD0019'},
              { label: '客户号', field: 'custId', type: 'input'},
              { label: '客户名称', field: 'custName', type: 'input'},
              { label: '证件类型', field: 'certType', type: 'select', dataCode: 'CD0011'},
              { label: '证件号码', field: 'certNo', type: 'input'}
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
            dataUrl: backend.adminService + '/api/allcust/list',
            dataParams: {
            },
            majTableColumns: [
              { label: '客户类型', prop: 'custType', width: '120', resizable: true, dataCode: 'CD0016' },
              { label: '客户状态', prop: 'custStatus', width: '150', resizable: true, dataCode: 'CD0019' },
              { label: '客户号', prop: 'custId', width: '100', resizable: true},
              { label: '客户名称', prop: 'custName', width: '120', resizable: true },
              { label: '证件类型', prop: 'certType', width: '120', resizable: true, dataCode: 'CD0011' },
              { label: '证件号码', prop: 'certNo', width: '100', resizable: true},
              { label: '主办机构', prop: 'belongBrch', width: '100', resizable: true},
              { label: '主办客户经理', prop: 'belongMgr', width: '100', resizable: true},
              { label: '价值等级', prop: 'valueLev', resizable: true, dataCode: '' },
              { label: '服务等级', prop: 'servLev', resizable: true, dataCode: 'CD0032' }
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
        this.$nextTick(function () {
          // this.$refs.usertable.remoteData();
          this.$refs.queryCondition.$children[0].resetFields();
        });
        this.$emit('click-fn');
      },
      queryFn: function (params) {
        this.$refs.usertable.remoteData(params);
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
        if (this.user.checkbox && data.length > 1) {
          this.$message('你只能选择一条数据!', '提示');
          return;
        }
        this.$emit('input', this.array2String(data).custId);
        this.$emit('select-fn', data);
        this.$nextTick(function () {
          me.selectedVal = me.array2String(data).custName;
        });
        this.dialogVisible = false;
      },
      // 对外提供选择器显示值
      getRawValue: function () {
        return this.selectedVal;
      },
      array2String: function (array) {
        var custGroups = {};
        var custId = '';
        var custName = '';
        // var s = '';
        for (var i = 0; i < array.length; i++) {
          if (i == 0) {
            custId = array[i].custId;
            custName = array[i].custName;
          } else {
            custId += ',' + array[i].custId;
            custName += ',' + array[i].custName;
          }
        }
        custGroups.custId = custId;
        custGroups.custName = custName;
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
        this.selectedVal = val;
        // if (val === '') {
        //   this.$refs.usertable.clearSelection();
        // }
        this.$emit('change', val);
      },
      rawValue: function (val) {
        this.selectedVal = val;
      },
      params:
      {
        handler: function (val) {
          yufp.extend(true, this, val);
        },
        deep: true
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
}(Vue, yufp.$, 'yufp-all-cust-selector'));