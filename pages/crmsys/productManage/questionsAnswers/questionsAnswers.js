/**
 * @Created by 闫天一 yanty1@yusys.com.cn on 2019-2-11 16:50:25.
 * @updated by
 * @description 产品视图-Q&A
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var prodId = data.prodId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          answnerBtn: !yufp.session.checkViewCtrl('answner', data.id),
          addBtn: !yufp.session.checkViewCtrl('add', data.id),
          height: yufp.frame.size().height,
          dataUrl: backend.productService + '/api/ocrmfpdprodqareq/questionsanswersquery/' + prodId,
          saveBtnShow: true,
          cancelBtnShow: true,
          formdata: {},
          async: false,
          dialogVisible: false,
          formDisabled: false,
          wen: true,
          da: true,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
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
          var model = {
            prodId: prodId
          };
          yufp.clone(_this.formdata, model);
          _this.dialogVisible = false;
          // 请调用服务进行后台保存
          yufp.service.request({
            method: 'POST',
            url: backend.productService + '/api/ocrmfpdprodqareq/ctratequestionsanswers',
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
          if (viewType == 'ADD') {
            _this.wen = false;
            _this.da = true;
          } else {
            _this.wen = true;
            _this.da = false;
          }
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
            _this.$refs.refForm.resetFields();
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (_this.$refs.refTable.selections[0].lastChgUsr2 != '' && _this.$refs.refTable.selections[0].lastChgUsr2 != null) {
            if (_this.$refs.refTable.selections[0].lastChgUsr2 != yufp.session.userCode) {
              _this.$message({ message: '只能维护自己答复的信息', type: 'warning' });
              return;
            }
          }
          _this.switchStatus('EDIT', true);
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
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (_this.$refs.refTable.selections[0].lastChgUsr2 != '' && _this.$refs.refTable.selections[0].lastChgUsr2 != null) {
            if (_this.$refs.refTable.selections[0].lastChgUsr2 != yufp.session.userCode) {
              _this.$message({ message: '只能维护自己答复的信息', type: 'warning' });
              return;
            }
          }
          _this.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.productService + '/api/ocrmfpdprodqareq/delertequestionsanswers',
              data: {
                questionId: _this.$refs.refTable.selections[0].questionId
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