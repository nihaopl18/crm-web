/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-1-17 15:05:54.
 * @updated by
 * @description 客户经理查询
 */
define(['./custom/widgets/js/YufpWfInit.js'], function (require, exports) {
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
          dataUrl: backend.custmgrService + '/api/custmgrquery/querylist',
          formdata: {},
          viewTitle: 'DETAIL',
          dialogVisible: false,
          formDisabled: false,
          saveBtnShow: true,
          viewBtn: !yufp.session.checkCtrl('view'),
          // quitBtn: !yufp.session.checkCtrl('quit'),
          rule: {
            reason: [
              {max: 350, message: '最大长度不超过350个字符', trigger: 'blur' },
              {required: true, message: '字段不能为空', trigger: 'blur'}
            ]
          },
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          }
        };
      },
      methods: {
        formatter: function (row, column, cellValue) {
          var cellText = '';
          if (cellValue != null) {
            var arr = cellValue.split(',');
            for (var i = 0; i < arr.length; i++) {
              var val = arr[i];
              if (val == '1') {
                cellText = cellText + '个人,';
              } else if (val == '2') {
                cellText = cellText + '对公,';
              } else if (val == '3') {
                cellText = cellText + '三农,';
              } else if (val == '4') {
                cellText = cellText + '国结,';
              } else if (val == '5') {
                cellText = cellText + '村镇银行,';
              }
            }
            cellText = cellText.substring(0, cellText.length - 1);
          }
          return cellText;
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewTitle, editable) {
          var _this = this;
          _this.viewTitle = viewTitle;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        // quitCustMgrApplyFn: function () {
        //   var _this = this;
        //   if (_this.$refs.refTable.selections.length != 1) {
        //     _this.$message({ message: '请先选择一条记录', type: 'warning' });
        //     return;
        //   }
        //   _this.switchStatus('退出客户经理', false);
        //   _this.$nextTick(function () {
        //     _this.$refs.refForm.resetFields();
        //     var obj = _this.$refs.refTable.selections[0];
        //     yufp.clone(obj, _this.formdata);
        //   });
        // },
        quitCustMgrApply: function () {
          var _this = this;
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            _this.$message({message: '请检查输入项是否合法', type: 'warning'});
            return;
          }
          var obj = _this.$refs.refTable.selections[0];
          _this.$confirm('是否确认执行此操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'GET',
                  url: backend.custmgrService + '/api/custmgrquery/checkcustmgrapply',
                  data: {
                    mgrId: obj.userCode
                  },
                  callback: function (code, message, response) {
                    if (response.data.length > 0 && response.data[0].state != 3) {
                      _this.$message({ message: '该客户经理已办理退出申请！', type: 'warning' });
                      return;
                    } else {
                      yufp.service.request({
                        method: 'POST',
                        url: backend.custmgrService + '/api/custmgrquery/quitcustmgrapply',
                        data: _this.$refs.refForm.model,
                        callback: function (code, message, response) {
                          if (code == 0) {
                            var commitData = {};
                            commitData.bizSeqNo = response.data;
                            // 模型版本申请类型字典项
                            commitData.applType = 'TCKHJLSP';
                            commitData.custId = yufp.session.userId;
                            commitData.custName = yufp.session.userName;
                            commitData.paramMap = {
                              mgrId: obj.userCode,
                              orgId: obj.orgId,
                              orgName: obj.orgName
                            };
                            _this.$refs.refTable.remoteData();
                            _this.$message('操作成功');
                            _this.dialogVisible = false;
                            var load = _this.$loading();
                            _this.$refs.yufpWfInit.wfInit(commitData, load);
                          }
                        }
                      });
                    }
                  }
                });
              } else {
                return false;
              }
            }
          });
        },
        openview: function () {
          var _this = this;
          var obj = _this.$refs.refTable.selections[0];
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var mgr = 'mgr_view' + obj.userCode;

          yufp.frame.addTab({
            id: 'custManagerView', // 菜单功能ID（路由ID）
            key: mgr, // 自定义唯一页签key
            title: '客户经理视图: ' + obj.userCode, // 页签名称
            data: {id: '3e99f2d47eac4af3a04b9aa5f6edb4ef', mgrId: obj.userCode}
          });
          // 刷新方法
          yufp.frame.refreshTab({
            routeId: 'custManagerView', // 对公, // 菜单功能ID（路由ID）
            menuId: mgr, // 菜单ID，同addTab方法中的key
            title: '客户经理视图:' + obj.userCode, // 页签名称
            data: {id: '3e99f2d47eac4af3a04b9aa5f6edb4ef', mgrId: obj.userCode}
          });
        },
        rowDblclickFn: function (row, event) {
          var mgr = 'mgr_view' + row.userCode;
          yufp.frame.addTab({
            id: 'custManagerView', // 菜单功能ID（路由ID）
            key: mgr, // 自定义唯一页签key
            title: '客户经理视图: ' + row.userCode, // 页签名称
            data: {id: '3e99f2d47eac4af3a04b9aa5f6edb4ef', mgrId: row.userCode}
          });
          // 刷新方法
          yufp.frame.refreshTab({
            routeId: 'custManagerView', // 对公, // 菜单功能ID（路由ID）
            menuId: mgr, // 菜单ID，同addTab方法中的key
            title: '客户经理视图:' + row.userCode, // 页签名称
            data: {id: '3e99f2d47eac4af3a04b9aa5f6edb4ef', mgrId: row.userCode}
          });
        },
        onAfterClose: function () {
        },
        onAfterInit: function (data) {
        }
      }
    });
  };
});