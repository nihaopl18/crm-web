/*
 * @create by: yangding@yusys.com.cn
 * @Date: 2021-09-03 09:36:44
 * @update by:
 * @description: 客户高级查询
 */

(function (vue, name) {
  vue.component(name, {
    template: '<div id = "productCategory">\
    <link rel="stylesheet" type="text/css" href="./pages/dy/customerSearch/components/advancedQuery.css"/>\
    \
    <!--<el-row  :gutter="20">\
      <el-col :span="6">\
              <div class="yu-toolBar">\
                <yu-input placeholder="请输入内容" v-model="value">\
                  <yu-button slot="append" icon="search"></yu-button>\
                </yu-input>\
              </div>\
              <yufp-ext-tree ref="productTree" :show-checkbox="false" :height="height - 112"\
                  :data-url="productTreeUrl" data-id="catlCode" data-label="catlName" @node-click="nodeClickFn"\
                  data-pid="catlParent" :expand-level="2" :highlight-current="true">\
              </yufp-ext-tree>\
      </el-col>\
      <el-col :span="18">\
        <el-row :gutter="20" class="advanced-query-tag-box">\
          <el-col :span="7" >\
            <p>标签</p>\
            <yu-input placeholder="请输入内容" value="证件类型" disabled ></yu-input>\
          </el-col>\
          <el-col :span="7">\
            <p>操作符</p>\
            <yu-select v-model="value" placeholder="请选择">\
              <yu-option label="等于" value="1" ></yu-option>\
              <yu-option label="包含" value="2" ></yu-option>\
            </yu-select>\
          </el-col>\
          <el-col :span="7">\
            <p>标签内容</p>\
            <yu-input placeholder="请输入内容" v-model="value"></yu-input>\
          </el-col>\
          <el-col :span="3">\
            <yu-button class="delete-btn" @click.native.prevent=""  type="text" size="middle">删除</yu-button>\
          </el-col>\
        </el-row>\
        <el-row :gutter="20" class="advanced-query-tag-box">\
          <el-col :span="7" >\
            <p>\
              <yu-radio class="radio" v-model="value" label="1">并且</yu-radio>\
              <yu-radio class="radio" v-model="value" label="2">或者</yu-radio>\
            </p>\
            <yu-input placeholder="请输入内容" value="信贷风险等级" disabled ></yu-input>\
          </el-col>\
          <el-col :span="7">\
            <p>操作符</p>\
            <yu-select v-model="value" placeholder="请选择">\
              <yu-option label="等于" value="1" ></yu-option>\
              <yu-option label="包含" value="2" ></yu-option>\
            </yu-select>\
          </el-col>\
          <el-col :span="7">\
            <p>标签内容</p>\
            <yu-input placeholder="请输入内容" v-model="value"></yu-input>\
          </el-col>\
          <el-col :span="3">\
            <yu-button class="delete-btn" @click.native.prevent=""  type="text" size="middle">删除</yu-button>\
          </el-col>\
        </el-row>\
        <el-row :gutter="20" class="advanced-query-tag-box">\
          <el-col :span="7" >\
            <p>\
              <yu-radio class="radio" v-model="value" label="1">并且</yu-radio>\
              <yu-radio class="radio" v-model="value" label="2">或者</yu-radio>\
            </p>\
            <yu-input placeholder="请输入内容" value="股东标志" disabled ></yu-input>\
          </el-col>\
          <el-col :span="7">\
            <p>操作符</p>\
              <yu-select v-model="value" placeholder="请选择">\
              <yu-option label="等于" value="1" ></yu-option>\
              <yu-option label="包含" value="2" ></yu-option>\
            </yu-select>\
          </el-col>\
          <el-col :span="7">\
            <p>标签内容</p>\
            <yu-input placeholder="请输入内容" v-model="value"></yu-input>\
          </el-col>\
          <el-col :span="3">\
            <yu-button class="delete-btn" @click.native.prevent=""  type="text" size="middle">删除</yu-button>\
          </el-col>\
        </el-row>\
        <el-row :gutter="20" class="advanced-query-tag-box">\
          <el-col :span="7" >\
            <p>\
              <yu-radio class="radio" v-model="value" label="1">并且</yu-radio>\
              <yu-radio class="radio" v-model="value" label="2">或者</yu-radio>\
            </p>\
            <yu-input placeholder="请输入内容" value="个人年收入" disabled ></yu-input>\
          </el-col>\
          <el-col :span="7">\
            <p>操作符</p>\
            <yu-select v-model="value" placeholder="请选择">\
              <yu-option label="等于" value="1" ></yu-option>\
              <yu-option label="包含" value="2" ></yu-option>\
            </yu-select>\
          </el-col>\
          <el-col :span="7">\
            <p>标签内容</p>\
            <yu-input placeholder="请输入内容" v-model="value"></yu-input>\
          </el-col>\
          <el-col :span="3">\
            <yu-button class="delete-btn" @click.native.prevent=""  type="text" size="middle">删除</yu-button>\
          </el-col>\
        </el-row>\
      </el-col>\
    </el-row>\
    <div class="dialog-footer" style="float: right;">\
      <el-button @click="close">取消</el-button>\
      <el-button type="primary" @click="saveQuery">确定</el-button>\
    </div>-->\
  </div>',
    data: function () {
      var me = this;
      // 排序校验
      var orderValidate = function (rule, value, callback) {
        var reg = /^\d{0,4}$/;
        if (!reg.test(value) && value) {
          callback(new Error('请输入数字(不超过9999)'));
          return;
        }
        callback();
      };
      return {
        btnDisabled: false,
        value: '',
        height: yufp.custom.viewSize().height,
        currClickNode: '',
        currClickName: '',
        addFlag: false,
        tempCheckNode: '',
        productTreeUrl: backend.productService + '/api/acrmfpdprodcatl/treelistquery',
        productFields: [{
          columnCount: 1,
          fields: [{
            field: 'catlParentNm',
            label: '上级类别名称',
            readonly: true,
            rules: [
              { required: true, message: '必填项', trigger: 'blur' }
            ]
          }, {
            field: 'catlName',
            label: '产品类别名称',
            rules: [
              { max: 40, message: '最大长度不超过40个字符', trigger: 'blur' },
              { required: true, message: '必填项', trigger: 'blur' }
            ]
          }, {
            field: 'catlOrder',
            label: '类别节点顺序',
            rules: [
              { validator: orderValidate, trigger: 'blur' }
            ]
          }, {
            field: 'orgId',
            label: '适用范围',
            type: 'custom',
            is: 'yufp-org-tree',
            param: { needCheckbox: false },
            rules: [
              { trigger: 'change' }
            ]
          },
          {
            field: 'displayScheme',
            label: '产品展示方案',
            type: 'select',
            options: [],
            rules: [
              { required: true, message: '必填项', trigger: 'change' }
            ]
          }
          ]
        }],
        formButtons: [{
          label: '保存',
          type: 'primary',
          icon: 'check',
          hidden: false,
          op: 'submit',
          click: function (model, valid) {
            if (valid) {
              model.lastChgUsr = yufp.session.userId;
              if (me.addFlag || model.catlCode == undefined) { // 新增
                model.catlParent = me.currClickNode;
                yufp.service.request({
                  method: 'POST',
                  url: backend.productService + '/api/acrmfpdprodcatl/createproducttree',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == '0') {
                      me.dialogVisible = false;
                      me.$message({ message: '数据保存成功！' });
                      me.$refs.productTree.remoteData();
                      me.$refs.productForm.resetFields();
                      delete me.$refs.productForm.formModel.catlCode;
                    }
                  }
                });
                me.addFlag = false;
              } else { // 修改
                yufp.service.request({
                  method: 'POST',
                  url: backend.productService + '/api/acrmfpdprodcatl/editproducttree',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == '0') {
                      me.dialogVisible = false;
                      me.$message({ message: '数据保存成功！' });
                      me.$refs.productTree.remoteData();
                      me.$refs.productForm.resetFields();
                      delete me.$refs.productForm.formModel.catlCode;
                    }
                  }
                });
              }
            } else {
              me.$message({ message: '请检查输入项是否合法', type: 'warning' });
              return false;
            }
          }
        }, {
          label: '重置',
          type: 'primary',
          icon: 'yx-undo2',
          hidden: false,
          click: function (model) {
            me.$nextTick(function () {
              me.$refs.productForm.formModel.catlParent = '';
              me.$refs.productForm.resetFields();
            });
          }
        }]
      };
    },
    methods: {
      saveQuery: function () {
        this.close();
        this.$parent.$parent.hasChooseQuery = true;
        // this.$message('保存成功');
      },
      close: function () {
        this.showList = true;
        this.$parent.$parent.advancedQueryDialogVisible = false;
      },
      // 菜单树点击事件
      nodeClickFn: function (nodeData, node, self) {
        this.currClickNode = nodeData.id;
        this.currClickName = nodeData.label;
        var param = {
          'catlCode': nodeData.id
        };
        var _this = this;
        yufp.service.request({
          method: 'GET',
          data: param,
          url: backend.productService + '/api/acrmfpdprodcatl/producttreequery',
          callback: function (code, message, response) {
            if (code == '0' && response.code == 0) {
              var formModel = yufp.extend({}, response.data[0]);
              if (nodeData.pid == '0') {
                formModel.catlParentNm = _this.$refs.productTree.data[0].label;
              }
              _this.$refs.productForm.formModel = formModel;
            }
          }
        });
      },
      // 点击新增按钮后的响应事件
      createFn: function () {
        var me = this;
        if (me.currClickNode == '') {
          me.$message({ message: '请先选择菜单节点', type: 'warning' });
          return;
        }
        me.addFlag = true;
        var temp = {
          catlName: '',
          catlOrder: '',
          catlParentNm: me.currClickName
        };
        me.$refs.productForm.formModel = yufp.extend({}, temp);
        delete me.$refs.productForm.formModel.catlCode;
      },
      // 删除产品树
      deleteFn: function () {
        if (this.currClickNode == '') {
          this.$message({ message: '请先选择产品节点', type: 'warning' });
          return;
        }
        var catlCode = this.currClickNode;
        var _this = this;
        _this.$confirm('删除该产品项的同时将删除其子产品,确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          yufp.service.request({
            method: 'POST',
            url: backend.productService + '/api/acrmfpdprodcatl/deleteproducttree',
            data: {
              catlCode: catlCode
            },
            callback: function (code, message, response) {
              if (code == '0') {
                _this.$message({ message: '删除成功！' });
                var param = {};
                // 刷新树
                _this.$refs.productTree.remoteData(param);
                _this.$refs.productForm.resetFields();
              }
            }
          });
        });
      }
    }
  });
}(Vue, 'advanced-query'));