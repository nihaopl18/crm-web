/**
 * 产品类别树选择器yufp-prod-tree
 * @disabled 是否禁用输入框
 * @authors yangxiao2
 * @date    2018-11-10
 * @version $1.0.3$
 */
(function (vue, $, name) {
  // 注册机构树组件
  vue.component(name, {
    template: '<el-popover v-model="visiable" :width="width" :visible-arrow="false"\
            popper-class="org-popover" trigger="click">\
            <yufp-ext-tree ref="prodTree" :show-checkbox="needCheckbox" :height="height" :expand-level="expandLevel"\
            :root-visible="rootVisible" :checkStrictly="checkStrictly" :defaultExpandAll="defaultExpandAll"\
            :data-url="dataUrl" :data-id="dataId" :data-label="dataLabel" :data-params="dataParams"\
            :json-data="jsonData"\
            :data-pid="dataPid" :data-root="dataRoot" @node-click="nodeClick" @get-tree-datas="getTreeData">\
            </yufp-ext-tree>\
            <div style="float: right" v-if="needCheckbox">\
            <el-button @click="clearFn" size="small">取 消</el-button>\
            <el-button type="primary" @click="confirmFn" size="small">确 定</el-button>\
            </div>\
            <el-input  ref="prodTreeInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled"\
            :size="size" name="机构" slot="reference" :on-icon-click="onIconClickFn"></el-input>\
            </el-popover>',
    props: {
      // 输入框属性
      disabled: Boolean,
      size: String,
      rawValue: String,
      value: {
        required: true
      },
      params: Object,
      readonly: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
      return this.createData();
    },
    // 挂载后
    mounted: function () {
      this.updateWidth();
    },
    methods: {
      updateWidth: function () {
        if (this.$refs.prodTreeInput != null && this.$refs.prodTreeInput != undefined) {
          this.width = this.$refs.prodTreeInput.$el.scrollWidth + 50;
        }
      },
      onIconClickFn: function () {
        if (this.disabled) {
          return;
        }
        if (!this.needCheckbox) {
          this.$refs.prodTree.setCheckedKeys(this.tempNodekeys);
        }
        this.visiable = true;
      },
      getTreeData: function (data) {
        this.tempTreeData = data;
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
      clearFn: function () {
        this.visiable = false;
      },
      // 清除查询参数,当修改url的时候调用
      clearSearchParams: function () {
        this.dataParams = {};
      },
      // 重置查询参数为默认
      resetDataParams: function () {
        this.dataParams = {
          userId: yufp.session.userId,
          orgCode: yufp.session.org.code,
          needFin: false,
          needManage: false,
          needDpt: false,
          orgLevel: ''
        };
      },
      confirmFn: function () {
        var me = this;
        var da = this.$refs.prodTree.getCheckedKeys();
        if (da == null || da.length == 0) {
          me.$message('请至少选择一条数据!', '提示');
          return;
        }
        var tt = this.$refs.prodTree.getCheckedNodes();
        this.$emit('input', this.getLabelString(tt, 'id'));
        this.$emit('select-fn', tt);
        this.tempNodekeys = da.concat();
        this.$nextTick(function () {
          me.selectedVal = me.getLabelString(tt, 'label');
        });
        this.visiable = false;
      },
      getValueByKey: function (array, k) {
        var label = '';
        if (k.toString() == '') {
          return label;
        } else {
          for (var i = 0; i < array.length; i++) {
            if (array[i].catlCode == k) {
              label = array[i].catlName;
              return label;
            }
          }
        }
      },
      getLabelString: function (array, label) {
        var ss = '';
        for (var i = 0; i < array.length; i++) {
          if (i == 0) {
            ss += array[i][label];
          } else {
            ss += ',' + array[i][label];
          }
        }
        return ss;
      },
      refreshData: function () {
        this.$refs.prodTree.remoteData();
      },
      // 对外提供选择器显示值
      getRawValue: function () {
        return this.selectedVal;
      },
      createData: function () {
        var me = this;
        var temp = me.getDefaultData();
        // 深度拷贝
        yufp.extend(true, temp, me.params);
        return temp;
      },
      getDefaultData: function () {
        return {
          // 展示参数
          selectedVal: '',
          placeholder: '请选择产品类别',
          width: 200,
          height: 300,
          visiable: false,
          rootVisible: true, // 根节点可见性
          needCheckbox: false,
          checkStrictly: false,
          expandLevel: 2, // 默认展开层级
          defaultExpandAll: false,
          // 节点参数属性
          dataId: 'catlCode',
          dataLabel: 'catlName',
          dataPid: 'catlParent',
          dataRoot: '',
          jsonData: 'data',
          // 数据参数
          dataParams: {
            userId: yufp.session.userId,
            orgCode: yufp.session.org.code,
            needFin: false,
            needManage: false,
            needDpt: false,
            orgLevel: ''
          },
          searchType: 'CUR_ORG', // 所辖或者当前""
          tempNodekeys: [],
          tempTreeData: [],
          dataUrl: backend.adminService + '/api/acrmfpdprodcatl/treelistquery'
        };
      }
    },
    watch: {
      value: function (val) {
        if (this.tempTreeData != null && this.tempTreeData.length > 0) {
          this.selectedVal = this.getValueByKey(this.tempTreeData, val);
        }
      },
      rawValue: function (val) {
        this.selectedVal = val;
      },
      tempTreeData: function (val) {
        this.selectedVal = this.getValueByKey(val, this.value);
      },
      params: function (val) {
        var me = this;
        var temp = me.createData();
        yufp.extend(true, me, val);
        me.dataParams = temp.dataParams;
        this.updateWidth();
      }
    }
  });
}(Vue, yufp.$, 'yufp-prod-tree'));