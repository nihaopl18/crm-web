/**
 * yufp-model-selector
 * 营销模板选择器
 * hujun3
 */
(function (vue, $, name) {
  vue.component(name, {
    template: '<div>\
            <el-input v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled"\
            :size="size" :name="name" :icon="icon" :on-icon-click="onIconClickFn" @click.native="clickFn">\
            </el-input>\
            <el-dialog-x title="营销动作模板选择器" :visible.sync="dialogVisible" height="350px" width="850px" @open="showFn">\
            <yu-xtable ref="refTable" row-number selection-type="checkbox" :data-url="dataUrl" label="模板信息">\
                <yu-xtable-column label="模板名称" prop="modelName" width="120"></yu-xtable-column>\
                <yu-xtable-column label="模板类型" prop="applyType" width="120" data-code="APPLY_TYPE"></yu-xtable-column>\
                <yu-xtable-column label="是否启用" prop="isEnable" width="120" data-code="YESNO"></yu-xtable-column>\
                <yu-xtable-column label="适用渠道" prop="applyChannelName" ></yu-xtable-column>\
            </yu-xtable>\
              <div slot="footer" class="dialog-footer">\
                <el-button @click="dialogVisible = false">取 消</el-button>\
                <el-button type="primary" @click="confirmFn">确 定</el-button>\
              </div>\
            </el-dialog-x>\
          </div>',

    props: {
      // 下述字段为el-input组件中部分属性，配置文档参见element-ui
      name: {
        type: String
      },
      value: {
        required: true
      },
      rawValue: String,
      size: String,
      disabled: {
        type: Boolean,
        default: false
      },
      checkbox: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: 'search'
      },
      params: Object
    },

    data: function () {
      return {
        selectedVal: '',
        dialogVisible: false,
        dataUrl: backend.appOcaService + '/api/cmfrcsystype/list'
      };
    },
    methods: {
      clickFn: function () {
        this.$emit('click-fn', this);
      },
      showFn: function () {
        this.$nextTick(function () {
          this.$refs.refTable.remoteData();
        });
      },
      onIconClickFn: function (val) {
        if (this.disabled) {
          return;
        }
        this.dialogVisible = true;
      },
      rowClickFn: function (row) {
        this.selections = this.$refs.refTable.selections;
      },
      confirmFn: function () {
        var me = this;
        if (this.$refs.refTable.selections.length < 1) {
          this.$message('请先选择一条数据');
        }
        var data = this.$refs.refTable.selections;
        if (!this.checkbox && data.length > 1) {
          this.$message('你只能选择一条数据!', '提示');
          return;
        }
        this.$emit('input', this.array2String(data, 'id'));
        this.$emit('select-fn', data);
        this.$nextTick(function () {
          me.selectedVal = me.array2String(data, 'modelName');
        });
        this.dialogVisible = false;
      },
      // 对外提供选择器显示值
      getRawValue: function () {
        return this.selectedVal;
      },
      convertKey: function (val) {
        // 将key转换为对应的value值
        return val;
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
      this.selectedVal = this.rawValue ? this.rawValue : '';
    },
    watch: {
      value: function (val) {
        // 将key转换为对应的value值
        this.selectedVal = this.selectedVal ? this.selectedVal : val;
      },
      rawValue: function (val) {
        this.selectedVal = val;
      }
    }

  });
}(Vue, yufp.$, 'yufp-model-selector'));


