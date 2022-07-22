/**
 * @Created by 闫天一 yanty1@yusys.com.cn on 2019-1-29 10:11:51.
 * @updated by
 * @description 产品视图-类似产品
 */
define(['custom/widgets/js/yufpProdSelector.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0071', 'CD0201', 'CD0242');
    var prodId = data.prodId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          addBtn: !yufp.session.checkViewCtrl('add', data.id),
          deleteBtn: !yufp.session.checkViewCtrl('delete', data.id),
          dataUrl: backend.productService + '/api/ocrmfpdprodlikeness/similarproductsquery/' + prodId,
          saveBtnShow: true,
          cancelBtnShow: true,
          formdata: {},
          async: false,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          rule: {
            likeProdId: [
              {required: true, message: '字段不能为空', trigger: 'blur'}
            ],
            remark: [
              {max: 300, message: '最大长度不超过300个字符', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
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
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {
            prodId: prodId
          };
          yufp.clone(_this.formdata, model);
          _this.dialogVisible = false;
          // _this.$msgbox.alert(model, '提示');
          // 请调用服务进行后台保存
          yufp.service.request({
            method: 'POST',
            url: backend.productService + '/api/ocrmfpdprodlikeness/createsimilarproducts',
            data: model,
            callback: function (code, message, response) {
              if (code == '0') {
                _this.$message({message: '数据保存成功！'});
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            }
          });
        },
        /**
         * 刷新
         */
        nodeClickFn: function (nodeData, node, self) {
          var _this = this;
          var param = {
            condition: JSON.stringify({
              catlCode: nodeData.id
            })
          };
          _this.$refs.refTable.remoteData(param);
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
          _this.saveBtnShow = editable;
          _this.cancelBtnShow = editable;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.likeProdId.$refs.likeProdId.selectedVal = '';
            _this.$refs.refForm.resetFields();
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.productService + '/api/ocrmfpdprodlikeness/deletesimilarproducts',
              data: {
                likenessId: _this.$refs.refTable.selections[0].likenessId
              },
              callback: function (code, message, response) {
                if (code == '0') {
                  _this.$message({message: '删除成功！'});
                  _this.$refs.refTable.remoteData();
                }
              }
            });
          });
        }
      }
    });
  };
});