/**
 * @created by luoshun
 * @updated by
 * @description 产品信息维护
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          // 产品类别url
          treeDataUrl: backend.yuspClimpProdService + '/api/loypdprodcatl/listall',
          // 产品信息url
          dataUrl: backend.yuspClimpProdService + '/api/loypdprodinfo/list',
          // 按钮是否显示
          saveBtnShow: true,
          // 产品信息表单数据
          formdata: {},
          // 产品类别表单数据
          cateFormdata: {},
          treeNode: '',
          dataParams: {},
          height: yufp.frame.size().height,
          dialogVisible: false,
          viewTitle: '',
          // 表单展示标志
          flag: true,
          formDisabled: false,
          numberRules: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '字段必须为数字'}],
          rules: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.numberAndLetter, message: '字段只能为字母和数字' }],
          isHidden: true,
          isDisabled: true,
          isCateDisabled: true
        };
      },
      methods: {
        // 日期格式化
        dateFormatter: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {};
          var validate = false;
          // 调用服务进行后台保存
          if (_this.flag) {
            _this.$refs.refForm.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            yufp.clone(_this.formdata, model);
            yufp.service.request({
              method: 'POST',
              url: _this.viewTitle === '新增' ? backend.yuspClimpProdService + '/api/loypdprodinfo/' : backend.yuspClimpProdService + '/api/loypdprodinfo/update',
              data: model,
              callback: function (code, message, response) {
                if (response.code === 0) {
                  _this.$message('操作成功');
                  _this.$refs.refTable.remoteData();
                  _this.dialogVisible = false;
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          } else {
            _this.$refs.refCateForm.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            yufp.clone(_this.cateFormdata, model);
            if (_this.viewTitle === '新增类别') {
              model.catlLevel = parseInt(_this.treeNode.catlLevel) + 1;
            }
            yufp.service.request({
              method: 'POST',
              url: _this.viewTitle === '新增类别' ? backend.yuspClimpProdService + '/api/loypdprodcatl/createtype' : backend.yuspClimpProdService + '/api/loypdprodcatl/updatetype',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.refTree.remoteData();
                _this.$message('操作成功');
                if (response.code === 0) {
                  _this.$message('操作成功');
                  _this.$refs.refTree.remoteData();
                  _this.dialogVisible = false;
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          }
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
         * @param viewTitle 表单类型
         * @param isShow 可编辑,默认false
         */
        switchStatus: function (viewTitle, isShow) {
          var _this = this;
          _this.flag = true;
          _this.isDisabled = false;
          _this.formDisabled = !isShow;
          _this.viewTitle = viewTitle;
          _this.dialogVisible = true;
          _this.saveBtnShow = isShow;
        },
        /**
         * 树点击事件
         */
        nodeClickFn: function (nodeData, node, self) {
          var _this = this;
          _this.treeNode = nodeData;
          _this.treeNode.catlParent = node.parent.data.catlCode;
          // 设置上级节点名称
          _this.treeNode.catlParentName = node.parent.data.catlName;
          _this.treeNode.catlCode = nodeData.catlCode;
          // 查询产品分类下所有产品
          var param = { condition: JSON.stringify({ catlCode: nodeData.catlCode }) };
          _this.dataParams = param;
          _this.$refs.queryForm.formdata.catlCode = nodeData.catlCode;
          _this.$refs.refTable.remoteData(param);
        },
        /**
         * 新增
         */
        addFn: function () {
          var _this = this;
          if (_this.treeNode == '') {
            _this.$message({ message: '请选择父项目分类!', type: 'warning' });
            return false;
          }
          if (_this.treeNode.catlCode === '0') {
            _this.$message({ message: '不允许在根节点下创建产品信息', type: 'warning' });
            return;
          }
          _this.switchStatus('新增', true);
          _this.isHidden = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.catlCode = _this.treeNode.catlCode;
            _this.formdata.catlName = _this.treeNode.catlName;
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('修改', true);
          _this.isDisabled = true;
          _this.isHidden = false;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].productId);
          }
          _this.$confirm('此操作将永久删除该产品信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.yuspClimpProdService + '/api/loypdprodinfo/delete/' + arr.join(','),
                  data: { productId: arr.join(',') },
                  callback: function (code, message, response) {
                    if (response.code === 0) {
                      _this.$refs.refTable.remoteData();
                      _this.$message('操作成功');
                    } else {
                      _this.$message({ message: response.message, type: 'warning' });
                    }
                  }
                });
              }
            }
          });
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
         * @param viewTitle 表单类型
         * @param isShow 可编辑,默认false
         */
        switchCategoryStatus: function (viewTitle, isShow) {
          var _this = this;
          _this.flag = false;
          _this.isCateDisabled = false;
          _this.formDisabled = !isShow;
          _this.viewTitle = viewTitle;
          _this.dialogVisible = true;
          _this.saveBtnShow = isShow;
        },
        /**
         * 新增产品类别
         */
        addCategoryFn: function () {
          var _this = this;
          if (_this.treeNode == '') {
            _this.$message({ message: '请选择父项目分类!', type: 'warning' });
            return false;
          }
          _this.switchCategoryStatus('新增类别', true);
          _this.$nextTick(function () {
            _this.$refs.refCateForm.resetFields();
            _this.cateFormdata.catlParent = _this.treeNode.catlCode;
            _this.cateFormdata.catlParentName = _this.treeNode.catlName;
          });
        },
        /**
         * 修改产品类别
         */
        modifyCategoryFn: function () {
          var _this = this;
          if (_this.treeNode == '') {
            _this.$message({ message: '请选择要修改的项目分类!', type: 'warning' });
            return false;
          }
          _this.switchCategoryStatus('修改类别', true);
          _this.isCateDisabled = true;
          _this.$nextTick(function () {
            _this.$refs.refCateForm.resetFields();
            yufp.clone(_this.treeNode, _this.cateFormdata);
            _this.cateFormdata.catlParent = _this.treeNode.catlParent;
            _this.cateFormdata.catlParentName = _this.treeNode.catlParentName;
          });
        },
        /**
         * 删除产品类别
         */
        deleteCategoryFn: function () {
          var _this = this;
          if (_this.treeNode == '') {
            _this.$message({ message: '请选择要删除的产品分类!', type: 'warning' });
            return false;
          } else if (_this.treeNode.children.length !== 0) {
            _this.$message({ message: '只能删除叶子节点', type: 'warning' });
            return;
          }
          if (_this.treeNode.id == '0') {
            _this.$message({ message: '不能删除根节点！', type: 'warning' });
            return;
          }
          _this.$confirm('此操作将永久删除该产品类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.yuspClimpProdService + '/api/loypdprodcatl/deletetype',
                  data: {
                    id: _this.treeNode.id
                  },
                  callback: function (code, message, response) {
                    if (response.code === 0) {
                      _this.$refs.refTree.remoteData();
                      _this.$message('操作成功');
                    } else {
                      _this.$message({ message: response.message, type: 'warning' });
                    }
                  }
                });
              }
            }
          });
        },
        /**
         * 产品类别详情
         */
        infoCategoryFn: function () {
          var _this = this;
          if (_this.treeNode == '') {
            _this.$message({ message: '请选择要修改的项目分类!', type: 'warning' });
            return false;
          }
          _this.switchCategoryStatus('类别详情', false);
          _this.$nextTick(function () {
            _this.$refs.refCateForm.resetFields();
            yufp.clone(_this.treeNode, _this.cateFormdata);
          });
        }
      }
    });
  };
});