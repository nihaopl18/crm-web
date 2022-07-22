/**
 * 渠道选择器yufp-channel-selector
 * @authors yangxiao2
 * @date    2018-11-27
 * @param needCheckbox - 是否支持复选
 * @version $1.0$
 */
(function (vue, $, name) {
  // 注册角色组件
  vue.component(name, {
    template: '<div>\
            <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
            @focus="dialogVisible = true" readonly name="渠道" v-model="selectedVal"></el-input>\
            <el-dialog-x title="渠道查询" :visible.sync= "dialogVisible" height="400px" width = "1000px">\
            <el-table-x ref="reftable" :checkbox="checkbox"\
            :data-url="dataUrl" :table-columns="tableColumns"></el-table-x>\
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
        default: '请选择渠道'
      },
      icon: {
        type: String,
        default: 'search'
      },
      params: Object
    },
    data: function () {
      return {
        dialogVisible: false,
        checkbox: true,
        dataUrl: backend.adminService + '/api/cmfrcchannelmgr/list',
        tableColumns: [
          { label: '渠道名称', prop: 'channelName' },
          { label: '对接方式', prop: 'runConnectType', dataCode: 'RUN_CONNECT_TYPE', width: '90' },
          { label: '创建人', prop: 'creatUserName', width: '100' },
          { label: '创建时间', prop: 'creatDate', width: '98' },
          { label: '最近维护人', prop: 'updataUserName', width: '100' },
          { label: '最近维护时间', prop: 'updataDate', width: '98' }
        ]
      };
    },
    created: function () {
      this.selectedVal = this.rawValue ? this.rawValue : this.value;
    },
    methods: {
      confirmFn: function () {
        var _self = this;
        var selections = _self.$refs.reftable.selections;
        if (!_self.params.needCheckbox) {
          // 不支持复选
          if (selections.length != 1) {
            _self.$message({ message: '只能选择一条数据', type: 'warning' });
            return;
          }
          _self.selectedVal = selections[0].channelName;
          _self.$emit('input', selections[0].channelId);
          _self.dialogVisible = false;
        } else {
          // 支持复选
          var ids = [];
          var names = [];
          for (var i = 0; i < selections.length; i++) {
            ids[i] = selections[i].channelId;
            names[i] = selections[i].channelName;
          }
          _self.selectedVal = names.join(',');
          _self.$emit('input', ids.join(','));
          _self.dialogVisible = false;
        }
      }
    },
    watch: {}
  });
}(Vue, yufp.$, 'yufp-channel-selector'));