/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-4 15:26:15.
 * @updated by
 * @description 我的关注客户
 */
define([
  './custom/plugins/yufp.watermark.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('ATTENT_TYP_TST,ADD_GROUP_TYPE,CD0016,CD0019,CD0011,CD0243,CD0032,CD0340,CD0336,CD0337,CD0339,KHQLX');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          // dataUrl: '/trade/example/list',
          // 后台服务
          dataUrl: backend.custpubService + '/api/ocrmfciattencust/list',
          tableParams: {condition: JSON.stringify({userId: yufp.session.userId})},
          // 加入客户群表单数据
          formdata: {},
          // 客户群表单数据
          custGroupformdata: {},
          dialogVisible: false,
          // 客户360视图弹出框控制变量
          custViewportDialogVisible: false,
          addCustGroupDialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          parambusiType: '',
          paramorgIdAuth: ''
        };
      },
      computed: {
        status: function () {
          // 判断加入方式是否是加入已有客户群
          return this.formdata.addType === '1';
        }
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.custpubService + '/api/governedcust/getbusitype',
          async: false,
          data: {
            condition: JSON.stringify({userId: yufp.session.userId})
          },
          callback: function (code, message, response) {
            if (code == 0 && response.code === 0) {
              if (response.data) {
                var data = response.data;
                _this.parambusiType = data.busiType;
                _this.paramorgIdAuth = data.orgIdAuth;
              }
            } else {
              _this.$message.error('查询失败');
            }
          }
        });
      },
      methods: {
        /**
         * 加入客户群——取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 加入客户群——保存
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
          // 如果“加入群”选择的是 “加入已创建”
          if (model.addType == '1') {
            var custSelections = _this.$refs.refTable.selections;
            var custsAry = [];
            for (var i = 0, len = custSelections.length; i < len; i++) {
              custsAry.push(custSelections[i].custId);
            }
            var joingroups = {
              condition: JSON.stringify({
                custGroupNo: model.custGroupId,
                custId: custsAry.join(','),
                custMemberType: model.groupMemberType
              })
            };
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.custpubService + '/api/ocrmfcicgmember/joingroup',
              data: joingroups,
              callback: function (code, message, response) {
                if (code == 0 && response.code === 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                  _this.dialogVisible = false;
                } else {
                  _this.$message.error('操作失败');
                }
              }
            });
          } else if (model.addType == '2') {
            // 加入群方式为“新建群”
            _this.addCustGroupDialogVisible = true;
            _this.$nextTick(function () {
              _this.$refs.addCustGrouprefForm.resetFields();
              _this.dialogVisible = false;
              // 设置客户来源为“手动添加”
              _this.custGroupformdata.custOrigin = '1';
            });
          }
        },
        /**
        * 选择客户群后执行
        */
        selectGroupFn: function (data) {
          this.formdata.groupMemberType = data.groupMemberType;
        },
        /**
         * 新建客户群表单——取消
         */
        custGroupCancelFn: function () {
          var _this = this;
          _this.addCustGroupDialogVisible = false;
        },
        /**
         * 新建客户群表单——保存
         */
        custGroupSaveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.custGroupformdata, model);
          var validate = false;
          _this.$refs.addCustGrouprefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var custSelections = _this.$refs.refTable.selections;
          var custsAry = [];
          for (var i = 0, len = custSelections.length; i < len; i++) {
            custsAry.push(custSelections[i].custId);
          }
          model.createOrgan = yufp.session.org.name;
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custgroupService + '/api/ocrmfcicgbase/add',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0 && response.data) {
                // 将选择的客户添加到客户群
                var joingroups = {
                  condition: JSON.stringify({
                    custGroupNo: response.data.custGroupId,
                    custId: custsAry.join(','),
                    custMemberType: response.data.custMemberType
                  })
                };
                yufp.service.request({
                  method: 'POST',
                  url: backend.custgroupService + '/api/ocrmfcicgmember/joingroup',
                  data: joingroups,
                  callback: function (code, message, response) {
                    if (code == 0 && response.code === 0) {
                      _this.$refs.refTable.remoteData();
                      _this.addCustGroupDialogVisible = false;
                      _this.$message('操作成功');
                    } else {
                      _this.$message.error('操作失败');
                    }
                  }
                });
              } else {
                _this.$message.error('失败');
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
         * 客户360视图
         */
        custViewportFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var powerLev;
          var custType = selections[0].custType;
          var customKey = 'custom_view' + selections[0].custId; // 请以custom_view前缀开头，并且全局唯一
          // 请求powerLev的信息
          var url;
          var rmodel = {};
          rmodel.userId = yufp.session.userId;
          rmodel.orgCode = yufp.session.org.code;
          rmodel.custType = custType;
          rmodel.ettenCustId = selections[0].custId;
          // 条线
          rmodel.busiType = _this.parambusiType;
          // 授权机构
          rmodel.orgIdAuth = _this.paramorgIdAuth;
          if (custType == '1') {
            url = backend.custpubService + '/api/governedcust/listper';
          } else if (custType == '2') {
            url = backend.custpubService + '/api/governedcust/listorg';
          }
          yufp.service.request({
            method: 'get',
            url: url,
            data: {
              condition: JSON.stringify(rmodel)
            },
            async: false,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0 && response.data.length > 0) {
                if (response.data) {
                  powerLev = response.data[0].powerLev;
                  console.log('powerLev:' + powerLev);
                }
              } else {
                _this.$message.error('查询失败');
              }
            }
          });
          // 客户状态为“潜在”，则跳转到潜在客户360视图
          if (selections[0].custStatus === 'Q1' || selections[0].custStatus === 'Q2') {
            // 传递到客户360视图的数据
            var popageData = {
              // 视图树节点id
              id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
              cust: selections[0],
              custId: selections[0].custId,
              custName: selections[0].custName
            };
            yufp.frame.addTab({
              // id: 'customer360View', // 菜单功能ID（路由ID）
              id: 'customer360View', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户360视图:' + selections[0].custName, // 页签名称
              data: popageData // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              // routeId: 'customer360View', // 对公, // 菜单功能ID（路由ID）
              routeId: 'customer360View', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的key
              title: '客户360视图:' + selections[0].custName, // 页签名称
              data: popageData // 传递的业务数据，可选配置
            });
            return;
          } else if (powerLev === '1' || powerLev === '2' ||
            powerLev === '3' || powerLev === '4') {
            var otherPageData = {
              id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
              cust: selections[0],
              custId: selections[0].custId,
              custName: selections[0].custName
            };
            yufp.frame.addTab({
              id: 'customer360View', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户360视图:' + selections[0].custName, // 页签名称
              data: otherPageData // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              routeId: 'customer360View', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的
              title: '客户360视图:' + selections[0].custName, // 页签名称
              data: otherPageData // 传递的业务数据，可选配置
            });
          }
        },
        rowDblclickFn: function (row, event) {
          var _this = this;
          var powerLev;
          var custType = row.custType;
          var customKey = 'custom_view' + row.custId; // 请以custom_view前缀开头，并且全局唯一
          // 请求powerLev的信息
          var url;
          var rmodel = {};
          rmodel.userId = yufp.session.userId;
          rmodel.orgCode = yufp.session.org.code;
          rmodel.custType = custType;
          rmodel.ettenCustId = row.custId;
          // 条线
          rmodel.busiType = _this.parambusiType;
          // 授权机构
          rmodel.orgIdAuth = _this.paramorgIdAuth;
          if (custType == '1') {
            url = backend.custpubService + '/api/governedcust/listper';
          } else if (custType == '2') {
            url = backend.custpubService + '/api/governedcust/listorg';
          }
          yufp.service.request({
            method: 'get',
            url: url,
            data: {
              condition: JSON.stringify(rmodel)
            },
            async: false,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0 && response.data.length > 0) {
                if (response.data) {
                  powerLev = response.data[0].powerLev;
                  console.log('powerLev:' + powerLev);
                }
              } else {
                _this.$message.error('查询失败');
              }
            }
          });
          // 客户状态为“潜在”，则跳转到潜在客户360视图
          if (row.custStatus === 'Q1' || row.custStatus === 'Q2') {
            // 传递到客户360视图的数据
            var popageData = {
              // 视图树节点id
              id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
              cust: row,
              custId: row.custId,
              custName: row.custName
            };
            yufp.frame.addTab({
              id: 'customer360View', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户360视图:' + row.custName, // 页签名称
              data: popageData // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              routeId: 'customer360View', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的key
              title: '客户360视图:' + row.custName, // 页签名称
              data: popageData // 传递的业务数据，可选配置
            });
            return;
          } else if (powerLev === '1' || powerLev === '2' ||
            powerLev === '3' || powerLev === '4') {
            var otherPageData = {
              id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
              cust: row,
              custId: row.custId,
              custName: row.custName
            };
            yufp.frame.addTab({
              id: 'customer360View', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户360视图:' + row.custName, // 页签名称
              data: otherPageData // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              routeId: 'customer360View', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的
              title: '客户360视图:' + row.custName, // 页签名称
              data: otherPageData // 传递的业务数据，可选配置
            });
          }
        },
        /**
         * 加入客户群
         */
        joinCustGroupFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length < 1) {
            _this.$message({ message: '请先选择一个或多个客户', type: 'warning' });
            return;
          }
          _this.dialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
          });
        },
        /**
         * 取消关注
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择至少一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].attenId);
          }
          _this.$confirm('确定取消关注?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custpubService + '/api/ocrmfciattencust/out',
                  data: {
                    condition: JSON.stringify({attenId: arr.join(',')})
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.code === 0) {
                      _this.$refs.refTable.remoteData();
                      _this.$message('操作成功');
                    } else {
                      _this.$message.error('操作失败');
                    }
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