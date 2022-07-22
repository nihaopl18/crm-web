/**
 * 岗位树选择器yufp-post-tree
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
            <yufp-ext-tree ref="orgTree" :show-checkbox="needCheckbox" :indent="!params||params.indent==undefined?16:params.indent" :height="height" :expand-level="expandLevel"\
            :root-visible="rootVisible" :checkStrictly="checkStrictly" :defaultExpandAll="defaultExpandAll"\
            :data-url="dataUrl" :data-id="dataId" :data-label="dataLabel" :lazy="lazy" :data-params="dataParams"\
            :json-data="jsonData"\
            :data-pid="dataPid" :data-root="dataRoot" @node-click="nodeClick" @get-tree-datas="getTreeData">\
            </yufp-ext-tree>\
            <div style="float: right" v-if="needCheckbox">\
            <el-button @click="clearFn" size="small">取 消</el-button>\
            <el-button type="primary" @click="confirmFn" size="small">确 定</el-button>\
            </div>\
            <el-input  ref="orgTreeInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled"\
            :size="size" name="岗位" slot="reference" :on-icon-click="onIconClickFn" :icon="icon" @click.stop></el-input>\
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
      },
      icon: {
        type: String,
        default: 'circle-close'
      },
      placeholder: {
        type: String,
        default: '请选择岗位'
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
        if (this.$refs.orgTreeInput != null && this.$refs.orgTreeInput != undefined) {
          this.width = this.$refs.orgTreeInput.$el.scrollWidth;
        }
      },
      onIconClickFn: function () {
        // if (this.disabled) {
        //   return;
        // }
        // if (!this.needCheckbox) {
        //   this.$refs.orgTree.setCheckedKeys(this.tempNodekeys);
        // }
        // this.visiable = true;
        this.$emit('input', '');
        this.$refs.orgTree.setCheckedKeys([]);
      },
      getTreeData: function (data) {
        this.tempTreeData = data;
      },
      nodeClick: function (nodeData, node, self) {
        var me = this;
        if (!this.needCheckbox) {
          this.$emit('input', nodeData[me.dataId]);
          this.$emit('select-fn', nodeData);
          this.$nextTick(function () {
            me.selectedVal = nodeData[me.dataLabel];
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
          // this.dataId: yufp.session.org.code,
          needFin: false,
          needManage: false,
          needDpt: false,
          orgLevel: '',
          lazy: false
        };
        this.dataParams[this.dataId] = yufp.session.org.id;
      },
      confirmFn: function () {
        var me = this;
        var da = this.$refs.orgTree.getCheckedKeys();
        if (da == null || da.length == 0) {
          me.$message('请至少选择一条数据!', '提示');
          return;
        }
        var tt = this.$refs.orgTree.getCheckedNodes();
        this.$emit('input', this.getLabelString(tt, 'id'));
        this.$emit('select-fn', tt);
        this.tempNodekeys = da.concat();
        this.$nextTick(function () {
          me.selectedVal = me.getLabelString(tt, 'label');
        });
        this.visiable = false;
        this.resetDataParams();
      },
      getValueByKey: function (array, k) {
        if (k != '' && k != undefined) {
          if (k.indexOf(',') != -1) {
            var label = '';
            var arr = k.split(',');
            for (var i = 0; i < array.length; i++) {
              for (var j = 0; j < arr.length; j++) {
                if (array[i].id == arr[j]) {
                  label += ',' + array[i].label;
                }
              }
            }
            return label.substr(1);
          } else {
            for (var q = 0; q < array.length; q++) {
              if (array[q].id == k) {
                return array[q].label;
              }
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
        this.$refs.orgTree.remoteData();
      },
      // 对外提供选择器显示值
      getRawValue: function () {
        return this.selectedVal;
      },
      setRawValue: function (val) {
        this.selectedVal = val;
      },
      createData: function () {
        var me = this;
        var temp = me.getDefaultData();
        temp.dataParams[temp.dataId] = yufp.session.org.id;
        // 深度拷贝
        yufp.extend(true, temp, me.params);
        return temp;
      },
      getDefaultData: function () {
        return {
          // 展示参数
          selectedVal: '',
          // placeholder: '请选择机构',
          width: 200,
          height: 300,
          visiable: false,
          rootVisible: true, // 根节点可见性
          needCheckbox: false,
          checkStrictly: false,
          expandLevel: 2, // 默认展开层级
          defaultExpandAll: false,
          // 节点参数属性
          dataId: 'id',
          dataLabel: 'sysPostName',
          dataPid: 'sysLv',
          dataRoot: {},
          jsonData: 'data',
          lazy: false,
          indent: 16,
          // 数据参数
          dataParams: {
            userId: yufp.session.userId,
            // orgId: yufp.session.org.id,
            needFin: false,
            needManage: false,
            needDpt: false,
            orgLevel: '',
            lazy: false
          },
          searchType: 'CUR_ORG', // 所辖或者当前""
          tempNodekeys: [],
          tempTreeData: [],
          dataUrl: backend.appBaseService + '/api/adminsmpost/querylist',
          infoUrl: backend.appBaseService + '/api/adminsmpost/querylistbyid'
        };
      }
    },
    watch: {
      value: function (val) {
        var _this = this;
        this.selectedVal = '';
        if (this.tempTreeData != null && this.tempTreeData.length > 0) {
          var tmp = this.getValueByKey(this.tempTreeData, val);
          this.selectedVal = tmp != undefined ? tmp : '';
        } else {
          yufp.service.request({
            method: 'GET',
            url: _this.infoUrl,
            data: {
              postId: val
            },
            callback: function (code, message, response) {
              if (code === 0 && response.code === 0) {
                _this.selectedVal = response.data.sysPostName;
              }
            }
          });
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
}(Vue, yufp.$, 'yufp-post-tree'));