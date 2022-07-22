/**
 * @param schemeId
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
           <el-table-x ref="usertable" :checkbox="checkboxVal" :max-height="user.maxHeight"\
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
      this.selectedVal = this.rawValue ? this.rawValue : this.value;
    },
    methods: {
      createData: function () {
        var me = this;
        // me.params.fdjFlag = '01';
        var temp = me.getDefaultData();
        yufp.extend(true, temp, me.params);
        return temp;
      },
      getDefaultData: function () {
        var me = this;
        var maxHeight;
        return {
          schemeId: '',
          checkboxVal: true,
          height: '350px',
          width: '850px',
          selectedVal: '',
          dialogVisible: false,
          user: {
            checkbox: true,
            maxHeight: maxHeight,
            fieldData: [
              { placeholder: '考核指标编号', field: 'indexId', type: 'input'},
              { placeholder: '考核指标名称', field: 'indexName', type: 'input'},
              { placeholder: '应用类型', field: 'applyTypeId', type: 'select', dataCode: 'INDEX_APPLY_TYPE'}
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
            dataUrl: backend.appBaseService + '/api/pmafschemeindexrel/querySchemeIndex',
            dataParams: {
            },
            tableColumns: [
              { label: '指标编号', prop: 'indexId', width: '', resizable: true },
              { label: '指标名称', prop: 'indexName', width: '', resizable: true },
              { label: '余额类型', prop: 'yuType', width: '', resizable: true },
              { label: '应用类型', prop: 'indexApplyType', width: '', resizable: true },
              { label: '考核对象', prop: 'obj', width: '', resizable: true }
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
          this.$refs.usertable.remoteData(param);
        });
      },
      queryFn: function (params) {
        var temp = params;
        temp.indexId = temp.indexId == '' || temp.indexId == undefined ? this.user.dataParams.indexId : temp.indexId;
        temp.indexName = temp.indexName == '' || temp.indexName == undefined ? this.user.dataParams.indexName : temp.indexName;
        temp.schemeId = temp.schemeId == '' || temp.schemeId == undefined ? this.params.schemeId : temp.schemeId;
        // temp.fdjFlag = temp.fdjFlag == '' || temp.fdjFlag == undefined ? this.params.fdjFlag : temp.fdjFlag;
        var param = {
          condition: JSON.stringify(temp)
        };
        this.$refs.usertable.remoteData(param);
      },
      confirmFn: function () {
        var me = this;
        var data = this.$refs.usertable.selections;
        if (data.length == 0) {
          this.$message('请至少选择一条数据!', '提示');
          return false;
        }
        if (!this.checkboxVal && data.length > 1) {
          this.$message('你只能选择一条数据!', '提示');
          return;
        }
        this.$emit('input', this.array2String(data, 'schemeIndexId'));
        this.$emit('select-fn', data);
        this.$nextTick(function () {
          me.selectedVal = me.array2String(data, 'schemeIndexName');
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
            var obj = {};
            obj.objId = val;
            yufp.service.request({
              url: backend.appBaseService + '/api/pmafschemeindexrel/querynames',
              method: 'get',
              data: { objId: val },
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
}(Vue, yufp.$, 'yufp-schemeindex-selector'));