/**
* @author houyx3
* @since 2018/07/13.
* @description 客户群成员管理
*/
define(['./custom/plugins/yufp.watermark.js'], function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  exports.ready = function (hashCode, data, cite) {
    var custGroup = data;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
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
                    target: '.testmytable1',
                    body: true,
                    text: '拼命加载中'
                  });
                  alert('auto');
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
                  _self.$refs.mytable1.remoteData(param);
                }
              }},
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          // 群成员信息
          clientsView: [
            { prop: 'custId', label: '客户号', type: 'input'},
            { prop: 'custName', label: '客户名称', type: 'input'},
            { label: '证件类型', prop: 'certType', dataCode: 'CD0011', resizable: true },
            { label: '证件号码', prop: 'certNo', resizable: true },
            { prop: 'custType', label: '客户类型', type: 'input', dataCode: 'CD0016'}
          ],
          joinUrl: backend.adminService + '/api/ocrmfcicgmember/memberlist',
          baseParams: {
            condition: JSON.stringify({
              custGroupId: custGroup.clientInfo.custGroupId,
              custType: custGroup.clientInfo.groupMemberType
            })
          }
        };
      },
      mounted: function () {
        if (custGroup.clientInfo.sql) {
          this.$refs.mytable1.remoteData();
        }
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
        // 打开客户视图
        opencustViewFn: function () {
          // if (this.$refs.mytable1.selections.length != 1) {
          //   this.$message({ message: '请先选择一条记录', type: 'warning' });
          //   return;
          // }
          // var customKey = 'custom_' + this.$refs.mytable1.selections[0].custId; // 请以custom_前缀开头，并且全局唯一
          // var routeId = 'customerportrait'; // 模板示例->普通查询的路由ID
          // yufp.frame.addTab({
          //   id: routeId, // 菜单功能ID（路由ID）
          //   key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
          //   title: '客户视图:' + this.$refs.mytable1.selections[0].custName, // 页签名称
          //   data: { custId: this.$refs.mytable1.selections[0].custId } // 传递的业务数据，可选配置
          // });

          var _this = this;
          var selections = _this.$refs.mytable1.selections;
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
              // id: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 菜单功能ID（路由ID）
              id: 'customer360View', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户360视图:' + selections[0].custName, // 页签名称
              data: otherPageData // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              // routeId: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 对公, // 菜单功能ID（路由ID）
              routeId: 'customer360View', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的
              title: '客户360视图:' + selections[0].custName, // 页签名称
              data: otherPageData // 传递的业务数据，可选配置
            });
          }
        },
        custViewportFn2: function (row, event) {
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
              title: '客户视图:' + row.custName, // 页签名称
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
        setFn: function () {
          var customKey = 'custom_11' + custGroup.clientInfo.custGroupId; // 请以custom_前缀开头，并且全局唯一
          var routeId = 'clientsclienauto'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '修改' + custGroup.clientInfo.custGroupName, // 页签名称
            data: { clientInfo: data.clientInfo } // 传递的业务数据，可选配置
          });
        },
        // 打开修改页面
        updatesql: function () {
          var customKey = 'custom_11' + custGroup.clientInfo.custGroupId; // 请以custom_前缀开头，并且全局唯一
          var routeId = 'clientsclienauto'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '修改' + custGroup.clientInfo.custGroupName, // 页签名称
            data: { clientInfo: data.clientInfo } // 传递的业务数据，可选配置
          });
        }
      }
    });
  };
});