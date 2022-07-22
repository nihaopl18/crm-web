/**
* @author houyx3
* @since 2018/07/13.
* @description 客户群成员管理
*/
define(['custom/widgets/js/yufpProdSelector.js', './custom/plugins/yufp.watermark.js'], function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  var Ids = '';
  var pro = [];
  exports.ready = function (hashCode, data, cite) {
    var custGroupData = data;
    var clientInfo = data.clientInfo;
    // 如果客户来源为“自动筛选”
    if (clientInfo.custOrigin == '2') {
      yufp.router.to('clientsclientInfo2', data, data.divId);
      return;
    }
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          parambusiType: '',
          paramorgIdAuth: '',
          /** 查询字段 */
          queryFields: [
            {placeholder: '客户号', field: 'custId', type: 'input'},
            {placeholder: '客户名称', field: 'custName', type: 'input'}
          ],
          /** 搜索按钮 */
          queryButtons: [
            {label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var ld1 = _self.$loading({
                    target: '.myTableDiv',
                    body: true,
                    text: '拼命加载中'
                  });
                  var param = { condition: JSON.stringify(model) };
                  yufp.service.request({
                    method: 'GET',
                    url: _self.joinUrl,
                    data: param,
                    callback: function (code, message, response) {
                      // _this.$refs.reftable.tableColumns = _this.tableColumns;
                      // _this.$refs.reftable.data = response.data;
                      // _this.$refs.reftable.total = response.total;
                      ld1.close();
                    }
                  });
                  _self.$refs.mytable.remoteData(param);
                }
              }},
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          // 修改产品选择
          productButtonsupd: [
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' },
            {label: '确定',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var parampro = {
                    condition: JSON.stringify({
                      ids: Ids,
                      proids: model.markePro
                    })
                  };
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cimpccustgroupcust/updpro',
                    data: parampro,
                    callback: function (code, message, response) {
                      if (code == 0) {
                        _self.$refs.mytable.remoteData();
                        _self.$message(response.message);
                      }
                    }
                  });
                  _self.provisibleupd = false;
                }
              }}
          ],
          productFieldsupd: [{
            fields: [
              {label: '选择营销产品', field: 'markePro', type: 'custom', is: 'yufp-prod-selector', params: { tabCheckbox: true }
              }
            ]
          }],
          // 群成员信息
          clientsView: [
            { prop: 'custId', label: '客户号', type: 'input'},
            { prop: 'custName', label: '客户名称', type: 'input'},
            { label: '证件类型', prop: 'certType', dataCode: 'CD0011', resizable: true },
            { label: '证件号码', prop: 'certNo', resizable: true },
            { prop: 'custType', label: '客户类型', type: 'input', dataCode: 'CD0016'}
          ],
          // 加入客户查询URL
          provisibleupd: false,
          joinUrl: backend.adminService + '/api/ocrmfcicgmember/memberlist',
          baseParams: {
            condition: JSON.stringify({
              custGroupId: custGroupData.clientInfo.custGroupId,
              custType: custGroupData.clientInfo.groupMemberType
            })
          }
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.custpubService + '/api/governedcust/getbusitype',
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
        // 修改营销产品
        updPro: function () {
          var _self = this;
          var selections = _self.$refs.mytable.selections;
          if (selections.length < 1) {
            _self.$message({ message: '请先选择至少一条记录', type: 'warning' });
            return;
          } else if (selections.length > 1) {
            for (var i = 0; i < selections.length; i++) {
              if (i == 0) {
                Ids = selections[0].id;
              } else {
                Ids += ',' + selections[i].id;
              }
            }
          } else {
            Ids = selections[0].id;
          }
          this.provisibleupd = true;
          _self.$nextTick(function () {
            _self.$refs.productref.resetFn();
          });
        },
        /**
         * 客户视图
         */
        custViewportFn: function () {
          var _this = this;
          var selections = _this.$refs.mytable.selections;
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
              if (code == 0 && response.code === 0 && response.data != null && response.data.length > 0) {
                if (response.data) {
                  powerLev = response.data[0].powerLev;
                  console.log('powerLev:' + powerLev);
                }
              } else {
                _this.$message('没有查询到数据，无法查看视图');
                return;
              }
            }
          });
          // 客户状态为“潜在”，则跳转到潜在客户视图
          if (selections[0].custStatus === 'Q1' || selections[0].custStatus === 'Q2') {
            // 传递到客户视图的数据
            var popageData = {
              // 视图树节点id
              id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
              cust: selections[0],
              custId: selections[0].custId,
              custName: selections[0].custName
            };
            yufp.frame.addTab({
              // id: custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView', // 菜单功能ID（路由ID）
              id: 'customer360View', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户360视图:' + selections[0].custName, // 页签名称
              data: popageData // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              // routeId: custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView', // 对公, // 菜单功能ID（路由ID）
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
              id: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户视图:' + selections[0].custName, // 页签名称
              data: otherPageData // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              routeId: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的
              title: '客户视图:' + selections[0].custName, // 页签名称
              data: otherPageData // 传递的业务数据，可选配置
            });
          }
        },
        custViewportFn1: function (row, event) {
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
              if (code == 0 && response.code === 0 && response.data != null && response.data.length > 0) {
                if (response.data) {
                  powerLev = response.data[0].powerLev;
                  console.log('powerLev:' + powerLev);
                }
              } else {
                _this.$message('没有查询到数据，无法查看视图');
              }
            }
          });
          // 客户状态为“潜在”，则跳转到潜在客户视图
          if (row.custStatus === 'Q1' || row.custStatus === 'Q2') {
            // 传递到客户视图的数据
            var popageData = {
              // 视图树节点id
              id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
              cust: row,
              custId: row.custId,
              custName: row.custName
            };
            yufp.frame.addTab({
              // id: custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView', // 菜单功能ID（路由ID）
              id: 'customer360View', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户360视图:' + row.custName, // 页签名称
              data: popageData // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              // routeId: custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView', // 对公, // 菜单功能ID（路由ID）
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
              // id: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 菜单功能ID（路由ID）
              id: 'customer360View', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户360视图:' + row.custName, // 页签名称
              data: otherPageData // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              // routeId: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 对公, // 菜单功能ID（路由ID）
              routeId: 'customer360View', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的
              title: '客户360视图:' + row.custName, // 页签名称
              data: otherPageData // 传递的业务数据，可选配置
            });
          }
        },
        // 打开群客户操作页面
        custAdd: function () {
          var customKey = 'custom_' + clientInfo.custGroupName; // 请以custom_前缀开头，并且全局唯一
          var routeId = 'clientsclientInfo'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: clientInfo.custGroupName + '群客户信息', // 页签名称
            data: { clientInfo: clientInfo } // 传递的业务数据，可选配置
          });
        },
        // 打开客户视图
        opencustViewFn: function () {
          if (this.$refs.mytable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var customKey = 'custom_view' + this.$refs.mytable.selections[0].custName; // 请以custom_view前缀开头，并且全局唯一
          var routeId = 'custView' + this.$refs.mytable.selections[0].custType; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '客户视图:' + this.$refs.mytable.selections[0].custName, // 页签名称
            data: { cust: this.$refs.mytable.selections[0] } // 传递的业务数据，可选配置
          });
        }
      }
    });
  };
});