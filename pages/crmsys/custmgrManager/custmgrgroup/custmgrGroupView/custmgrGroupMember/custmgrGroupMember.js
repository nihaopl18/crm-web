/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-2-14 10:35:35.
 * @updated by
 * @description 客户经理团队成员
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var mktTeamId = data.mktTeamId;
    var createUserId = data.createUserId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custmgrgroupService + '/api/ocrmfcmteamcustmanager/querylist/' + mktTeamId,
          formdata: {},
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          addBtn: !yufp.session.checkViewCtrl('add', data.id),
          deleteBtn: !yufp.session.checkViewCtrl('delete', data.id),
          // 客户经理放大镜
          custManagerParams: {
            user: {
              dataUrl: backend.custpubService + '/api/grantapply/getcm'
            }
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
        * 用户选择
        */
        userSelectFn: function (data) {
          this.formdata.custManagerName = data[0].userName;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          model.mktTeamId = mktTeamId;
          _this.$confirm('是否确认保存?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'GET',
                  url: backend.custmgrgroupService + '/api/ocrmfcmteamcustmanager/check',
                  data: {
                    mktTeamId: model.mktTeamId,
                    mgrId: model.custManagerId
                  },
                  callback: function (code, message, response) {
                    if (response.data.length > 0) {
                      _this.$message({ message: '该客户经理已在该团队中，不允许重复加入！', type: 'warning' });
                      return;
                    } else {
                      // 向后台发送保存请求
                      yufp.service.request({
                        method: 'POST',
                        url: backend.custmgrgroupService + '/api/ocrmfcmteamcustmanager/save',
                        data: model,
                        callback: function (code, message, response) {
                          _this.$refs.refTable.remoteData();
                          _this.$message('操作成功');
                          _this.dialogVisible = false;
                        }
                      });
                    }
                  }
                });
              }
            }
          });
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          if (createUserId != yufp.session.userCode) {
            _this.$message({ message: '非团队创建者不允许执行该操作', type: 'warning' });
            return;
          }
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          if (createUserId != yufp.session.userCode) {
            _this.$message({ message: '非团队创建者不允许执行该操作', type: 'warning' });
            return;
          }
          var data = _this.$refs.refTable.selections[0];
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custmgrgroupService + '/api/ocrmfcmteamcustmanager/remove/' + data.id,
                  data: {},
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        }
      }
    });
  };
});