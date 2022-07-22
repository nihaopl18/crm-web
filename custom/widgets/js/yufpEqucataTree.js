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
            <yu-xtree ref="equcataTree" :show-checkbox="needCheckbox" :height="height" :expand-level="expandLevel"\
            :root-visible="rootVisible" :checkStrictly="checkStrictly" :defaultExpandAll="defaultExpandAll"\
            :data-url="dataUrl" data-id="catalogId" data-label="catalogName"  @get-tree-datas="getTreeData" :data-params="dataParams"\
            :json-data="jsonData"\
            data-pid="supCatalogId" data-root="0" @node-click="nodeClick">\
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
      params: Object,
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
      var me = this;
      return {
        width: 200,
        height: 300,
        dataUrl: '/api/loyacequcatalog/list',
        needCheckbox: false,
        visiable: false,
        rootVisible: false,
        checkStrictly: false,
        expandLevel: '2',
        defaultExpandAll: false,
        dataParams: {condition: JSON.stringify({
          orgCode: yufp.session.org.code
        })},
        selectedVal: '',
        placeholder: '请选择分类',
        jsonData: 'data',
        tempTreeData: []
      };
    },
    // 挂载后
    mounted: function () {
    },
    methods: {
      onIconClickFn: function () {
        this.$emit('input', '');
        this.$refs.equcataTree.setCheckedKeys([]);
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
      onClick: function () {
        //
        if (this.params != undefined) {
          this.dataParams = this.params;
          this.$refs.equcataTree.remoteData(this.dataParams);
        } else {
          // 入参为空时默认加载当前机构下的分类
          this.dataParams = {instuValue: yufp.session.instu.code};
          this.$refs.equcataTree.remoteData(this.dataParams);
        }
      },
      getValueByKey: function (array, val) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].catalogId == val) {
            return array[i].catalogName;
          }
        }
      },
      getTreeData: function (data) {
        this.tempTreeData = data;
      }
    },
    watch: {
      value: function (val) {
        if (this.tempTreeData != null && this.tempTreeData.length > 0) {
          var tmp = this.getValueByKey(this.tempTreeData, val);
          this.selectedVal = tmp != undefined ? tmp : '';
        }
      },
      params: function (val) {
        var me = this;
        me.dataParams = me.params;
        this.onClick();
      }
    }
  });
}(Vue, yufp.$, 'yufp-equcata-tree'));