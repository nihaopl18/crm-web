/**
 * 营销活动选择器yufp-mktacti-selector
 * @authors yangxiao2
 * @date    2019-03-12
 * @param needCheckbox - 是否支持复选
 * @version $1.0$
 */
(function (vue, $, name) {
  // 注册角色组件
  vue.component(name, {
    template: '<div>\
            <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
            @focus="dialogVisible = true" readonly name="营销活动" v-model="selectedVal"></el-input>\
            <el-dialog-x title="营销活动查询" :visible.sync= "dialogVisible" height="400px" width = "1000px">\
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
        default: '请选择营销活动'
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
        dataUrl: backend.adminService + '/api/mkt/actilistquery',
        tableColumns: [
          { label: '活动名称', prop: 'actiName' },
          { label: '活动状态', prop: 'actiStat', dataCode: 'OCRM_MKT_ACTI_STAT', width: '90' },
          { label: '审批状态', prop: 'mktAppState', dataCode: 'ACT_APP_STATS', width: '100' },
          { label: '活动下达状态', prop: 'actiStat', width: '98' },
          { label: '客户数', prop: '', width: '98' },
          { label: '产品数', prop: '', width: '98' },
          { label: '费用预算', prop: 'actiCost', width: '98' },
          { label: '活动负责人', prop: 'mktRespPerson', width: '98' },
          { label: '计划开始时间', prop: 'pstartDate', width: '98' },
          { label: '计划结束时间', prop: 'pendDate', width: '98' },
          { label: '创建人', prop: 'createUser', width: '98' },
          { label: '创建人机构', prop: 'createOrg', width: '98' },
          { label: '创建日期', prop: 'createDate', width: '98' }
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
          _self.selectedVal = selections[0].actiName;
          _self.$emit('input', selections[0].actiId);
          _self.dialogVisible = false;
        } else {
          // 支持复选
          var ids = [];
          var names = [];
          for (var i = 0; i < selections.length; i++) {
            ids[i] = selections[i].channelId;
            names[i] = selections[i].actiId;
          }
          _self.selectedVal = names.join(',');
          _self.$emit('input', ids.join(','));
          _self.dialogVisible = false;
        }
      }
    },
    watch: {}
  });
}(Vue, yufp.$, 'yufp-mktacti-selector'));