/**
 * @Created by zhuly6 zhuly6@yusys.com.cn on 2019-1-29
 * @updated by
 * @description 银行产品树
 */

define(function (require, exports) {
  /**
  * 页面加载完成时触发
  * @param hashCode 路由ID
  * @param data 传递数据对象
  * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    var cust = data;
    yufp.lookup.reg('CERT_TYPE,CARD_NO');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          treeDataurl: backend.adminService + '/api/ocrmfpdprodshowcolumn/getProdTree',
          baseParams: {condition: JSON.stringify({ custId: cust.custId}) },
          height: yufp.frame.size().height,
          // formdata: {},
          dataUrl: backend.adminService + '/api/ocrmfpdprodshowcolumn/prodInfo',
          async: false,
          dialogVisible: false,
          tabledata: [],
          tablelable: [],
          lableFlag: false,
          defaultLoad: false,
          params: {condition: JSON.stringify({ custId: cust.custId}) }
        };
      },
      methods: {
        // 获取点击节点的表格数据
        getTabledataFn: function (data) {
          var proData = {};
          var _this = this;
          // var topNameArry = [];
          var tableCoumn = [];
          yufp.clone(data, proData);
          var modelId = { condition: JSON.stringify({ catlCode: proData.catlCode }) };
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmfpdprodshowcolumn/topname',
            data: modelId,
            async: false,
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.$refs.refTable.tabledata = [];
                if (response.data.length > 0) {
                  _this.tablelable = [];
                  for (var i = 0; i < response.data.length; i++) {
                    // 将返回的数据转为小驼峰
                    var nameArray = response.data[i].columnName.toLowerCase().split('_');
                    var name = nameArray[0];
                    if (nameArray.length > 1) {
                      for (var j = 1; j < nameArray.length; j++) {
                        var word = nameArray[j].substring(0, 1).toUpperCase() + nameArray[j].substring(1, nameArray[j].length);
                        name += word;
                      }
                    }
                    response.data[i].columnName = name;
                    // if (response.data[i].dicName != null && response.data[i].dicName != undefined && response.data[i].dicName != '') {
                    //   yufp.lookup.reg(response.data[i].dicName);
                    // }
                    tableCoumn.push(response.data[i]);
                  }
                  _this.lableFlag = true;
                } else {
                  _this.lableFlag = false;
                }
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
          // for (var i = 0; i < _this.tablelable.length; i++) {
          //   var arr = _this.tablelable[i].tableOthName + '.' + _this.tablelable[i].columnName;
          //   topNameArry.push(arr);
          // }
          var params = { condition: JSON.stringify({ catlCode: proData.catlCode, custId: cust.custId}) };
          if (_this.lableFlag) {
            _this.tablelable = tableCoumn;
            _this.$refs.refTable.remoteData(params);
          }
        }
      }
    });
  };
});