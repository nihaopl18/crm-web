/**
 *  客户评级指标选择器
 */
(function (vue, $, name) {
  // 注册用户组件
  vue.component(name, {
    template: '<div>\
           <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
           @focus="onIconClickFn" :on-icon-click="onIconClickFn" readonly name="用户" v-model="selectedVal"></el-input>\
           <el-dialog-x title="指标选择器" :visible.sync= "dialogVisible" :height="height" :width = "width">\
           <el-row :gutter="20">\
           <el-table-x ref="usertable" :checkbox="user.checkbox" :max-height="user.maxHeight"\
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
        default: '请选择指标'
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
        var maxHeight;
        return {
          height: '400px',
          width: '1000px',
          selectedVal: '',
          dialogVisible: false,
          user: {
            checkbox: true,
            maxHeight: maxHeight,
            fieldData: [],
            buttons: [],
            load: false, // 不默认查询
            dataUrl: backend.custgradeService + '/api/custgradescheme/querybaseindex',
            dataParams: {
              indexUse: '1'
            },
            tableColumns: [
              { label: '指标编号', prop: 'indexCode', width: '', resizable: true },
              { label: '指标名称', prop: 'indexName', width: '', resizable: true },
              { label: '指标用途',
                prop: 'indexUse',
                width: '',
                resizable: true,
                formatter: function (row, cloumn) {
                  var value = '';
                  if (row.indexUse == '1') {
                    value = '价值等级评价方案';
                  } if (row.indexUse == '2') {
                    value = '服务等级评价方案';
                  } if (row.indexUse == '3') {
                    value = '流失预警方案';
                  }
                  return value;
                }
              }
            ]
          }
        };
      },
      onIconClickFn: function (val) {
        this.dialogVisible = true;
        this.$nextTick(function () {
          this.$refs.usertable.clearSelection();
          var params = this.params; // 查询参数
          // var params = this.user.dataParams;
          var param = {
            condition: JSON.stringify(params)
          };
          this.$refs.usertable.remoteData(param);
        });
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
        this.$emit('input', this.array2String(data, 'indexCode'));
        this.$emit('select-fn', data);
        this.$nextTick(function () {
          me.selectedVal = me.array2String(data, 'indexCode');
        });
        this.dialogVisible = false;
        this.selectedVal = '';
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
    mounted: function () {
    //  this.selectedVal = this.rawValue ? this.rawValue : this.value;
    },
    watch: {
      value: function (val) {
      // 将key转换为对应的value值
        //  this.selectedVal = this.selectedVal ? this.selectedVal : val;
        this.selectedVal = val;
      },
      rawValue: function (val) {
        this.selectedVal = val;
      }

    }
  });
}(Vue, yufp.$, 'yufp-base-index'));