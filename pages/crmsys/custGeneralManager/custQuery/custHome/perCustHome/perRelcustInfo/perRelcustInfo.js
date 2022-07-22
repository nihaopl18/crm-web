/**
 * @Created by 马妍 mayan2@yusys.com.cn on 2019-1-24 11:16:54.
 * @updated by
 * @description 关联关系
 */
define(['./custom/widgets/js/yufpGovernedCustSelector.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    var custName = data.custName;
    yufp.lookup.reg('CD0284');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          addBtn: !yufp.session.checkViewCtrl('add', data.id),
          editBtn: !yufp.session.checkViewCtrl('edit', data.id),
          deleteBtn: !yufp.session.checkViewCtrl('delete', data.id),
          viewBtn: !yufp.session.checkViewCtrl('view', data.id),
          dataUrl: backend.custpersonService + '/api/acrmfciperrelcustinfo/queryperrellist/' + custId,
          formdata: {},
          selectAllCustParams: { // 客户 放大镜 参数
            user: {
              dataParams: {
                belongOrg: yufp.session.org.code,
                belongMgr: yufp.session.user.loginCode
              },
              checkbox: false // 是否支持多选
            }
          },
          // 客户 放大镜 参数
          // rowIndex: true,
          // user: {
          //   dataParams: {belongBrch: yufp.session.org.code, belongMgr: yufp.session.userCode},
          //   fieldData: [{ label: '客户号', field: 'custId', type: 'input'},
          //     { label: '客户名称', field: 'custName', type: 'input'},
          //     { label: '客户类型', field: 'custType', type: 'select', dataCode: 'CD0016'},
          //     { label: '客户状态', field: 'custStatus', type: 'select', dataCode: 'CD0019'},
          //     { label: '证件类型', field: 'certType', type: 'select', dataCode: 'CD0011'},
          //     { label: '证件号码', field: 'certNo', type: 'input'}],
          //   majTableColumns: [{ label: '客户号', prop: 'custId', width: '100', resizable: true},
          //     { label: '客户名称', prop: 'custName', width: '120', resizable: true },
          //     { label: '客户类型', prop: 'custType', width: '120', resizable: true, dataCode: 'CD0016' },
          //     { label: '客户状态', prop: 'custStatus', width: '150', resizable: true, dataCode: 'CD0019' },
          //     { label: '证件类型', prop: 'certType', width: '120', resizable: true, dataCode: 'CD0011' },
          //     { label: '证件号码', prop: 'certNo', width: '100', resizable: true},
          //     { label: '主办机构', prop: 'belongBrch', width: '100', resizable: true},
          //     { label: '主办客户经理', prop: 'belongMgr', width: '100', resizable: true}],
          //   load: true, // 是否默认加载数据
          //   dataUrl: backend.adminService + '/api/allcust/list',
          //   checkbox: false // 是否支持多选
          // }

          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          relcustdisable: false
        };
      },
      methods: {
        /**
         * 客户放大镜回调
         */
        custSelFn: function (data) {
          var _this = this;
          if (!data || data.length != 1) {
            return;
          }
          _this.formdata.relaCustName = data[0].custName;
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
          var model = {
            custName: custName,
            custId: custId
          };
          yufp.clone(_this.formdata, model);

          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (_this.viewType == 'ADD') {
            // 向后台发送保存请求
            model.id = null;
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/acrmfciperrelcustinfo/addperrel',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            });
          } else {
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/acrmfciperrelcustinfo/updateperrel',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            });
          }
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          if (viewType == 'ADD') {
            _this.relcustdisable = false;
          } else {
            _this.relcustdisable = true;
          }
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
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
          if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.user.loginCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
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
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.user.loginCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custpersonService + '/api/acrmfciperrelcustinfo/deleteperrel',
                  data: {
                    id: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        openpercustViewFn: function () { // 进入客户视图
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var obj = selectionsAry[0];
          // 查询客户是否所辖客户，如果是进入标准版视图，如果不是，进入简版视图。
          yufp.service.request({
            method: 'GET',
            url: backend.custpersonService + '/api/acrmfciperrelcustinfo/getCustType',
            data: {
              custId: obj.relaCustId
            },
            callback: function (code, message, response) {
              var custType = response.data.custType;
              var custStatus = response.data.custStatus;
              if (response.data.custType == '1' || response.data.custType == '2') {
                yufp.service.request({
                  method: 'GET',
                  url: backend.custpubService + '/api/governedcust/getbusitype',
                  data: {
                    condition: JSON.stringify({ userId: yufp.session.userId })
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.code === 0) {
                      if (response.data) {
                        var data = response.data;
                        if (custType == '1') {
                          var url1 = '/api/governedcust/listper';
                          yufp.service.request({
                            method: 'GET',
                            url: backend.custpersonService + url1,
                            data: {
                              condition: JSON.stringify({ ettenCustId: obj.relaCustId, userId: yufp.session.userId, custType: custType, busiType: data.busiType, orgIdAuth: data.orgIdAuth})
                            },
                            callback: function (code, message, response) {
                              // alert(JSON.stringify(response));
                              if (response.data != null && response.data.length > 0 && custStatus != 'Q1' && custStatus != 'Q2') {
                                yufp.frame.addTab({
                                  id: 'personalCustView', // 菜单功能ID（路由ID）
                                  key: 'personalCustView', // 自定义唯一页签key
                                  title: '零售客户视图', // 页签名称
                                  data: {id: 'f38c540fa3a842f1a9bebe5fbe881dda', // 1510d10391f64514b833c0d12d39a824,
                                    custId: obj.relaCustId,
                                    custName: obj.relaCustName,
                                    cust: obj}
                                });
                              } else if ((response.data != null && response.data.length > 0) && (custStatus != 'Q1' || custStatus != 'Q2')) {
                                yufp.frame.addTab({
                                  id: 'personalPotentialCustView',
                                  key: 'custom_view' + obj.relaCustId, // 自定义唯一页签key,请统一使用custom_前缀开头
                                  title: '潜在客户视图:' + obj.relaCustName, // 页签名称
                                  data: {
                                    id: '87ad23b67f1f4d12b927b1230563aeda', // 对公
                                    cust: obj,
                                    custId: obj.relaCustId,
                                    custName: obj.relaCustName
                                  } // 传递的业务数据，可选配置
                                });
                              } else {
                                yufp.frame.addTab({
                                  id: 'personalBriefCustView', // 菜单功能ID（路由ID）
                                  key: 'personalBriefCustView', // 自定义唯一页签key
                                  title: '简版零售客户视图', // 页签名称
                                  // 视图对应的树节点id
                                  data: { id: 'c6a0980aa7734d99bf95161d1d054381', custId: obj.relaCustId, custName: obj.relaCustName }
                                });
                              }
                            }
                          });
                        } else if (custType == '2') {
                          var url2 = '/api/governedcust/listorg';
                          // model.custType = '2';
                          yufp.service.request({
                            method: 'GET',
                            url: backend.custpersonService + url2,
                            data: {
                              condition: JSON.stringify({ ettenCustId: obj.relaCustId, userId: yufp.session.userId, custType: custType, busiType: data.busiType, orgIdAuth: data.orgIdAuth })
                            },
                            callback: function (code, message, response) {
                              if (response.data != null && response.data.length > 0) {
                                // 说明有数据
                                yufp.frame.addTab({
                                  id: 'publicStanCustView', // 菜单功能ID（路由ID）
                                  key: 'publicStanCustView', // 自定义唯一页签key
                                  title: '对公客户视图', // 页签名称
                                  data: {id: '1510d10391f64514b833c0d12d39a824', // 1510d10391f64514b833c0d12d39a824,
                                    custId: obj.relaCustId,
                                    custName: obj.relaCustName,
                                    cust: obj}
                                });
                              } else if ((response.data != null && response.data.length > 0) && (custStatus != 'Q1' || custStatus != 'Q2')) {
                                yufp.frame.addTab({
                                  id: 'publicPotentialCustView',
                                  key: 'custom_view' + obj.relaCustId, // 自定义唯一页签key,请统一使用custom_前缀开头
                                  title: '潜在客户视图:' + obj.relaCustName, // 页签名称
                                  data: {
                                    id: 'b57629a38b34450e89717c4db1661e01', // 对公
                                    cust: obj,
                                    custId: obj.relaCustId,
                                    custName: obj.relaCustName
                                  } // 传递的业务数据，可选配置
                                });
                              } else {
                                yufp.frame.addTab({
                                  id: 'publicBriefCustView', // 菜单功能ID（路由ID）
                                  key: 'publicBriefCustView', // 自定义唯一页签key
                                  title: '简版对公客户视图', // 页签名称
                                  // 视图对应的树节点id
                                  data: { id: '52ca3479f2224cc0a56e557eb378e1be', custId: obj.relaCustId, custName: obj.relaCustName }
                                });
                              }
                            }
                          });
                        }
                      }
                    } else {
                      _this.$message.error('查询失败');
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