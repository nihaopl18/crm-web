/**
 * 权益账户类型树选择器yufp-Equcata-tree
 * @param treeurl-树的url :/yusp_lp/api/util/getOrg?needFin=true&needManage=true&needDpt=true
 * @param needCheckbox(是否支持复选)-default:false
 * @param dataRoot(根节点)
 * @disabled 是否禁用输入框
 * @authors lupan
 * @date    2017-03-14
 * @version $1.0.3$
 */
(function (vue, $, name) {
  // 注册机构树组件
  vue.component(name, {
    template: '<yu-popover v-model="visiable" :width="width" :visible-arrow="false"\
            popper-class="org-popover" trigger="click">\
            <yu-xtree ref="equcataTree" :show-checkbox="needCheckbox" :abc="abc" :height="height" :expand-level="expandLevel"\
            :root-visible="rootVisible" :checkStrictly="checkStrictly" :defaultExpandAll="defaultExpandAll"\
            :local-data="OrgData" data-id="orgCode" data-label="orgName"  @get-tree-datas="getTreeData" :data-params="dataParams"\
            :json-data="jsonData"\
            data-pid="upOrgId" :data-root="dataRoot" @node-click="nodeClick">\
            </yu-xtree>\
            <yu-input  ref="orgTreeInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled"\
            :size="size" name="机构" slot="reference" :on-icon-click="onIconClickFn" :icon="icon" @click.stop></yu-input>\
            </yu-popover>',
    props: {
      // 输入框属性
      disabled: Boolean,
      size: String,
      viewOrgName: String,
      value: {
        required: true
      },
      abc: String,
      readonly: {
        type: Boolean,
        default: true
      },
      icon: {
        type: String,
        default: 'circle-close'
      }
    },
    data: function () {
      return {
        width: 200,
        height: 300,
        OrgData: [],
        dataUrl: '/api/loyacequaccount/orgtree',
        needCheckbox: false,
        visiable: false,
        rootVisible: true,
        checkStrictly: false,
        expandLevel: '2',
        defaultExpandAll: false,
        dataParams: {condition: JSON.stringify({
          instuId: 'ecd20f1d26b2449fb763b73afa219d96'
        })},
        dataRoot: '',
        selectedVal: '',
        placeholder: '请选择机构',
        jsonData: 'data',
        tempTreeData: []
      };
    },
    // 挂载后
    mounted: function () {
      this.getOrgData(yufp.session.instu.id);
    },
    methods: {
      getOrgData: function (val) {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          async: false,
          url: backend.appOcaService + '/api/loyacequaccount/orgtree',
          data: {condition: JSON.stringify({instuId: val})},
          callback: function (code, message, response) {
            if (code == 0) {
              var re = response.data;
              _this.dataRoot = response.data[0].orgCode;
              _this.OrgData = [];
              for (var i = 0; i < re.length; i++) {
                _this.OrgData.push(re[i]);
              }
            }
          }
        });
      },
      onIconClickFn: function () {
        this.$emit('input', '');
        this.$refs.orgTree.setCheckedKeys([]);
      },
      nodeClick: function (nodeData, node, self) {
        var me = this;
        if (!this.needCheckbox) {
          this.$emit('input', nodeData.id);
          this.$emit('select-fn', nodeData);
          this.$nextTick(function () {
            me.selectedVal = nodeData.label;
          });
          this.visiable = false;
        }
      },
      getValueByKey: function (array, val) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].orgCode == val) {
            return array[i].orgName;
          }
        }
      },
      getTreeData: function (data) {
        this.tempTreeData = data;
      }
    },
    watch: {
      value: function (val) {
        if (this.OrgData != null && this.OrgData.length > 0) {
          var tmp = this.getValueByKey(this.OrgData, val);
          this.selectedVal = tmp != undefined ? tmp : '';
        }
      },
      abc: function (val) {
        this.getOrgData(val);
      }
    }
  });
}(Vue, yufp.$, 'yufp-instu-org'));