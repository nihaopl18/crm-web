/**
 * 业务品种树选择器yufp-buss-tree
 * @param treeurl-树的url :/yusp_lp/api/util/getOrg?needFin=true&needManage=true&needDpt=true
 * @param needCheckbox(是否支持复选)-default:true
 * @param dataRoot(根节点)
 * @disabled 是否禁用输入框
 * @authors luhy1
 * @date    2020-02-14
 * @version $1.0.0$
 */
(function (vue, $, name) {
  // 注册业务品种树组件
  vue.component(name, {
    template: '<el-popover v-model="visiable" :width="width" :visible-arrow="false"\
            popper-class="buss-popover" trigger="click">\
            <yu-xtree ref="bussTree" :show-checkbox="needCheckbox" :indent="!params||params.indent==undefined?16:params.indent"\
              :data-url="dataUrl" :data-id="dataId" :data-label="dataLabel"\
              :data-pid="dataPid" :data-root="dataRoot" :root-visible="rootVisible" :lazy="lazy"\
              :checkStrictly="checkStrictly" :defaultExpandAll="defaultExpandAll" @node-click="nodeClick" @get-tree-datas="getTreeData">\
            </yu-xtree>\
            <br />\
            <div style="text-align:center;" v-if="needCheckbox">\
            <el-button @click="clearFn" size="small">取 消</el-button>\
            <el-button type="primary" @click="confirmFn" size="small">确 定</el-button>\
            </div>\
            <el-input ref="bussTreeInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled"\
              :size="size" name="机构" slot="reference" :on-icon-click="onIconClickFn" :icon="icon" @click.stop></el-input>\
            </el-popover>',
    props: {
      // 输入框属性
      disabled: Boolean,
      size: String,
      rawValue: String,
      value: {
        required: true
      },
      params: {
        type: Object,
        default: {
          bussType: '',
          needCheckbox: true
        }
      },
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
        default: '请选择业务品种'
      }
    },
    data: function () {
      return this.createData();
    },
    // 挂载后
    mounted: function () {
      this.updateWidth();
    },
    update: function () {
      this.data();
    },
    methods: {
      updateWidth: function () {
        if(!this.width){
            if (this.$refs.bussTreeInput != null && this.$refs.bussTreeInput != undefined) {
                this.width = this.$refs.bussTreeInput.$el.scrollWidth;
            }
        }
      },
      // 对外提供选择器显示值
      getRawValue: function () {
        return this.selectedVal;
      },
      setRawValue: function (val) {
        this.selectedVal = val;
      },
      createData: function () {
        var _this = this;
        var temp = _this.getDefaultData();

        // 深度拷贝
        yufp.extend(true, temp, _this.params);
        return temp;
      },
      onIconClickFn: function () {
        this.$emit('input', '');
        this.$refs.bussTree.setCheckedKeys([]);
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
      getDefaultData: function () {
        var _this = this;
        return {
          // 展示参数
          selectedVal: '',
          width: 200,
          height: 300,
          visiable: false,
          needCheckbox: false,
          rootVisible: false, // 根节点可见性
          tempTreeData: [],
          dataUrl: backend.appBaseService + '/api/pmafbussnoinfo/getbusstree?bussType=' + _this.params.bussType,
          dataId: 'bussNo',
          dataLabel: 'bussName',
          dataPid: 'hgrBussNo',
          lazy: false,
          dataRoot: '0000000000',
          jsonData: 'data',
          // 数据参数
          dataParams: {

          },
          checkStrictly: false,
          defaultExpandAll: false,
          indent: 16
        };
      },
      clearFn: function () {
        this.visiable = false;
      },
      confirmFn: function () {
        var me = this;
        var da = this.$refs.bussTree.getCheckedKeys();
        if (da == null || da.length == 0) {
          me.$message('请至少选择一条数据!', '提示');
          return;
        }
        var tt = this.$refs.bussTree.getCheckedNodes();
        this.$emit('input', this.getLabelString(tt, 'bussNo'));
        this.$emit('select-fn', tt);
        this.tempNodekeys = da.concat();
        this.$nextTick(function () {
          me.selectedVal = me.getLabelString(tt, 'label');
        });
        this.visiable = false;
      },
      getValueByKey: function (array, k) {
        if (k != '' && k != undefined) {
          if (k.indexOf(',') != -1) {
            var label = '';
            var arr = k.split(',');
            for (var i = 0; i < array.length; i++) {
              for (var j = 0; j < arr.length; j++) {
                if (array[i].bussNo == arr[j]) {
                  label += ',' + array[i].bussName;
                }
              }
            }
            return label.substr(1);
          } else {
            for (var i = 0; i < array.length; i++) {
              if (array[i].bussNo == k) {
                return array[i].bussName;
              }
            }
          }
        }
      },
      getCheckedKeys: function (array, k) {
        var keyArr = [];
        if (k != '' && k != undefined) {
          if (k.indexOf(',') != -1) {
            var arr = k.split(',');
            for (var i = 0; i < array.length; i++) {
              for (var j = 0; j < arr.length; j++) {
                if (array[i].bussNo == arr[j]) {
                  keyArr.push(array[i].bussNo);
                }
              }
            }
            return keyArr;
          } else {
            for (var i = 0; i < array.length; i++) {
              if (array[i].bussNo == k) {
                keyArr.push(array[i].bussNo);
                return keyArr;
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
      resetCheckedKey: function () {
        this.$refs.bussTree.setCheckedKeys([]);
      }

    },
    watch: {
      // data为监听参数名
      params: {
        handler: function (val, oldVal) {
          var _this = this;
          _this.params = val;
          _this.dataUrl = backend.appBaseService + '/api/pmafbussnoinfo/getbusstree?bussType=' + val.bussType;
          _this.bussType = val.bussType;
          _this.$refs.bussTree.remoteData();
        },
        deep: true

      },
      tempTreeData: function (val) {
        this.selectedVal = this.getValueByKey(val, this.value);
      },
      // params: function (val) {
      //   var me = this;
      //   var temp = me.createData();
      //   yufp.extend(true, me, val);
      //   me.dataParams = temp.dataParams;
      //   this.updateWidth();
      // },
      value: function (val) {
        // var _this = this;
        this.selectedVal = '';
        if (this.tempTreeData != null && this.tempTreeData.length > 0) {
          var tmp = this.getValueByKey(this.tempTreeData, val);
          var checkedKeys = this.getCheckedKeys(this.tempTreeData, val);
          this.$refs.bussTree.setCheckedKeys(checkedKeys);
          this.selectedVal = tmp != undefined ? tmp : '';
        } else {
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmafbussnoinfo/querynames',
            data: { bussNo: val },
            callback: function (code, message, response) {
              if (code === 0 && response.code === 0) {
                _this.selectedVal = response.data.bussName;
              }
            }
          });
        }
      },
      rawValue: function (val) {
        this.selectedVal = val;
      }
    }
  });
}(Vue, yufp.$, 'yufp-buss-tree'));
