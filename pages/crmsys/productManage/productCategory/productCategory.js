/**
 * @Created by 闫天一 yanty1@yusys.com.cn on 2019-1-30 16:20:46.
 * @updated by
 * @description 产品类别管理
 */
define(['./custom/widgets/js/yufpExtTree.js'], function (require, exports) {
  var schemeOptions = [];
  // 自定义字典（产品展示方案）
  yufp.service.request({
    method: 'GET',
    url: backend.productService + '/api/acrmfpdprodcatl/displayschemequery',
    callback: function (code, message, response) {
      var scheme = response.data;
      for (var i = 0; i < scheme.length; i++) {
        var option = {};
        option.key = scheme[i].planId;
        option.value = scheme[i].planName;
        schemeOptions.push(option);
      }
    }
  });

  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: '#productCategory',
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
                {required: true, message: '必填项', trigger: 'blur'}
              ]
            }, {
              field: 'catlName',
              label: '产品类别名称',
              rules: [
                {max: 40, message: '最大长度不超过40个字符', trigger: 'blur' },
                {required: true, message: '必填项', trigger: 'blur'}
              ]
            }, {
              field: 'catlOrder',
              label: '类别节点顺序',
              rules: [
                {validator: orderValidate, trigger: 'blur'}
              ]
            }, {
              field: 'orgId',
              label: '适用范围',
              type: 'custom',
              is: 'yufp-org-tree',
              param: {needCheckbox: false},
              rules: [
                { trigger: 'change'}
              ]
            },
            { field: 'displayScheme',
              label: '产品展示方案',
              type: 'select',
              options: schemeOptions,
              rules: [
                {required: true, message: '必填项', trigger: 'change'}
              ]} ]
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
                        me.$message({message: '数据保存成功！'});
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
                        me.$message({message: '数据保存成功！'});
                        me.$refs.productTree.remoteData();
                        me.$refs.productForm.resetFields();
                        delete me.$refs.productForm.formModel.catlCode;
                      }
                    }
                  });
                }
              } else {
                me.$message({message: '请检查输入项是否合法', type: 'warning'});
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
            me.$message({message: '请先选择菜单节点', type: 'warning'});
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
            this.$message({message: '请先选择产品节点', type: 'warning'});
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
                  _this.$message({message: '删除成功！'});
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
  };
});