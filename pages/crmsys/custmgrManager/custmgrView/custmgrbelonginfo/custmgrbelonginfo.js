/**
 * @Created by luhy1 luhy1@yusys.com.cn on 2019-1-27 21:26:54.
 * @updated by
 * @description 客户经理管户清单
 */
define(['./custom/plugins/yufp.watermark.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var mgrId = data.mgrId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          queryFormdata: {},
          dataUrl: backend.custmgrService + '/api/custmgrbelonginfo/querylist/' + mgrId
        };
      },
      mounted: function () {
        var _this = this;
        _this.queryFormdata.mgrType = '1';
        yufp.service.request({
          method: 'GET',
          url: backend.custgroupService + '/api/allcust/mybusitype',
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.data.busiType == '2') {
                _this.queryFormdata.custType = '2';
              } else {
                _this.queryFormdata.custType = '1';
              }
            }
          }
        });
      },
      methods: {
        custTpChangeFn: function () {
          this.queryFormdata.certType = '';
          this.queryFormdata.valueLev = '';
        },
        opencustViewFn: function () {
          var selections = this.$refs.refTable.selections;
          if (selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          // 客户状态为“潜在”，则跳转到潜在客户视图
          if (selections[0].custStatus === 'Q1' || selections[0].custStatus === 'Q2') {
            var customKey = 'custom_view' + selections[0].custId; // 请以custom_view前缀开头，并且全局唯一
            // var routeId = 'custView' + selections[0].custType; // 模板示例->普通查询的路由ID
            var custType = selections[0].custType;
            yufp.frame.addTab({
              id: custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户视图:' + selections[0].custName, // 页签名称
              data: {
                id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
                cust: selections[0],
                custId: selections[0].custId,
                custName: selections[0].custName
              } // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              routeId: custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的key
              title: '客户视图:' + selections[0].custName, // 页签名称
              data: {
                id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
                cust: selections[0],
                custId: selections[0].custId,
                custName: selections[0].custName
              } // 传递的业务数据，可选配置
            });
            return;
          } else {
            var customKey = 'custom_view' + selections[0].custId; // 请以custom_view前缀开头，并且全局唯一
            var custType = selections[0].custType;
            yufp.frame.addTab({
              id: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户视图:' + selections[0].custName, // 页签名称
              data: {
                id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
                cust: selections[0],
                custId: selections[0].custId,
                custName: selections[0].custName
              } // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              routeId: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的
              title: '客户视图:' + selections[0].custName, // 页签名称
              data: {
                id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
                cust: selections[0],
                custId: selections[0].custId,
                custName: selections[0].custName
              } // 传递的业务数据，可选配置
            });
          }
        },
        rowDblclick: function (row, event) {
          if (row.custStatus === 'Q1' || row.custStatus === 'Q2') {
            var customKey = 'custom_view' + row.custId; // 请以custom_view前缀开头，并且全局唯一
            // var routeId = 'custView' + selections[0].custType; // 模板示例->普通查询的路由ID
            var custType = row.custType;
            yufp.frame.addTab({
              id: custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户视图:' + row.custName, // 页签名称
              data: {
                id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
                cust: row,
                custId: row.custId,
                custName: row.custName
              } // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              routeId: custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的key
              title: '客户视图:' + row.custName, // 页签名称
              data: {
                id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
                cust: row,
                custId: row.custId,
                custName: row.custName
              } // 传递的业务数据，可选配置
            });
            return;
          } else {
            var customKey = 'custom_view' + row.custId; // 请以custom_view前缀开头，并且全局唯一
            var custType = row.custType;
            yufp.frame.addTab({
              id: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户视图:' + row.custName, // 页签名称
              data: {
                id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
                cust: row,
                custId: row.custId,
                custName: row.custName
              } // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              routeId: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的
              title: '客户视图:' + row.custName, // 页签名称
              data: {
                id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
                cust: row,
                custId: row.custId,
                custName: row.custName
              } // 传递的业务数据，可选配置
            });
          }
        }
      }
    });
  };
});