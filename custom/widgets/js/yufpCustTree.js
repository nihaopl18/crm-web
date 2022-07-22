/**
 * 产品类别树选择器yufp-org-tree
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
        template: '<el-popover v-model="visiable" :width="width" :visible-arrow="false"\
              popper-class="org-popover" trigger="click">\
              <yufp-ext-tree  ref="productTree" :show-checkbox="false" @node-click="nodeClickFn" :data-url="productTreeUrl" data-id="catlCode" data-label="catlName" data-pid="catlParent" :height="height - 40" style="margin:10px 10px 0 0;"></yufp-ext-tree>\
              <el-input  ref="orgTreeInput" v-model="selectedVal" :disabled="quarParams" clearable  :placeholder="placeholder"\
                name="机构" slot="reference"></el-input>\
              </el-popover>',
        props: {
            // 输入框属性
            quarParams: Boolean,
        },
        data: function () {
            return this.createData();
        },
        // 挂载后
        mounted: function () {
            this.updateWidth();
        },
        methods: {
            clearData: function () {
                this.selectedVal = ''
            },
            nodeClickFn: function (nodeData, node, self) {
                var me = this;
                if (nodeData.catlCode == 1 || nodeData.catlCode == 2) return;
                this.$emit('input', nodeData.id);
                this.$emit('select-fn', nodeData);
                this.$nextTick(function () {
                    me.selectedVal = nodeData.label;
                    this.visiable = false;
                })
            },
            updateWidth: function () {
                if (this.$refs.orgTreeInput != null && this.$refs.orgTreeInput != undefined) {
                    this.width = this.$refs.orgTreeInput.$el.scrollWidth + 50;
                }
            },
            clearFn: function () {
                this.visiable = false;
            },
            createData: function () {
                var me = this;
                var temp = me.getDefaultData();
                // 深度拷贝
                yufp.extend(true, temp);
                return temp;
            },
            getDefaultData: function () {
                return {
                    // 展示参数
                    productTreeUrl: backend.productService + '/api/acrmfpdprodcatl/treelistquery',
                    selectedVal: '',
                    placeholder: '请选择产品类别',
                    width: 200,
                    height: 300,
                    visiable: false,
                    needCheckbox: false,
                    // 节点参数属性
                    dataRoot: '',
                };
            }
        },
        watch: {
            selectedVal: {
                immediate: true,
                handler: function handler(val) {
                    if (val) {
                        this.$emit('select-fn-data', { custTypeRole: true });
                    } else {
                        this.$emit('select-fn-data', { custTypeRole: false });
                    }
                }
            },
        }
    });
}(Vue, yufp.$, 'yufp-cust-tree'));