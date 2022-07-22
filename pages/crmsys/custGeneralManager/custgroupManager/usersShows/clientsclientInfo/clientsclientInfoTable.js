/**
* @author houyx3
* @since 2018/07/13.
* @description 客户群成员管理
*/
define(['custom/widgets/js/yufpProdSelector.js'], function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  var Ids = '';
  var pro = [];
  exports.ready = function (hashCode, data, cite) {
    var custGroup = data;
    var clientInfo = data;
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
                  var _self = this;
                  var param = { condition: JSON.stringify(model) };
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
            { label: '证件类型', prop: 'identType', dataCode: 'IDENT_TYPE', resizable: true },
            { label: '证件号码', prop: 'identNo', resizable: true },
            { prop: 'custType', label: '客户类型', type: 'input', dataCode: 'CUST_TYPE'},
            { label: '联系方式', prop: 'contactNumber', width: '100', resizable: true },
            {label: '营销产品',
              prop: 'markeProPri',
              resizable: true,
              formatter: function (row, column, cellValue) {
                if (cellValue == null) {
                  return;
                }
                var productnames = '';
                var cellvalues = cellValue.split(',');
                for (var num = 0; num < cellvalues.length; num++) {
                  for (var i = 0; i < pro.length; i++) {
                    if (cellvalues[num] == pro[i].productId) {
                      if (num == 0) {
                        productnames = pro[i].prodName;
                      } else {
                        productnames += ',' + pro[i].prodName;
                      }
                    }
                  }
                }
                return productnames;
              }
            }
          ],
          // 加入客户查询URL
          provisibleupd: false,
          joinUrl: backend.adminService + '/api/cimpccgbaseinfo/jionlist',
          baseParams: {
            condition: JSON.stringify({
              custGroupId: custGroup.clientInfo.custGroupId
            })
          }
        };
      },
      mounted: function () {
        yufp.service.request({
          url: backend.adminService + '/api/cmfrcproductmanager/getpro',
          method: 'get',
          async: false,
          callback: function (code, message, response) {
            pro = response.data;
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
        // 打开群客户操作页面
        custAdd: function () {
          var customKey = 'custom_' + clientInfo.clientInfo.custGroupName; // 请以custom_前缀开头，并且全局唯一
          var routeId = 'clientsclientInfo'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: clientInfo.clientInfo.custGroupName + '群客户信息', // 页签名称
            data: { clientInfo: clientInfo.clientInfo } // 传递的业务数据，可选配置
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