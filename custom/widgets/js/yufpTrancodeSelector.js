/**
 *  交易类型
 */
(function (vue, $, name) {
  // 注册用户组件
  vue.component(name, {
    template: '<div>\
           <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
           @focus="onIconClickFn" :on-icon-click="onIconClickFn" readonly name="考核方案" v-model="selectedVal"></el-input>\
           <el-dialog-x title="授权考核方案选择器" :visible.sync= "dialogVisible" :height="height" :width = "width">\
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
        default: '请选择交易类型'
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
              { placeholder: '交易代码', field: 'trancode', type: 'input'},
              { placeholder: '交易名称', field: 'tranname', type: 'input'}
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
            dataUrl: backend.appBaseService + '/api/pmafcashamounttrancode/querylist',
            tableColumns: [
              { label: '交易代码', prop: 'trancode', width: '', resizable: true },
              { label: '交易名称', prop: 'tranname', width: '', resizable: true }
            ]
          }
        };
      },
      onIconClickFn: function (val) {
        var _this = this;
        _this.dialogVisible = true;
        _this.$nextTick(function () {
          this.$refs.usertable.clearSelection();
          var param = {
            condition: JSON.stringify(_this.params)
          };
          this.$refs.usertable.remoteData(param);
        });
      },
      queryFn: function (params) {
        var temp = params;
        // temp.trancode = temp.trancode == '' || temp.trancode == undefined ? temp.trancode : temp.trancode;
        // temp.tranname = temp.tranname == '' || temp.tranname == undefined ? temp.trancode : temp.tranname;
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
        this.$emit('input', this.array2String(data, 'trancode'));
        this.$emit('select-fn', data);
        this.$nextTick(function () {
          me.selectedVal = me.array2String(data, 'tranname');
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
}(Vue, yufp.$, 'yufp-trancode-selector'));