/**
 * @Created by geyun geyun@yusys.com.cn on 2019-1-28 15:48:59.
 * @updated by
 * @description 积分统计报表
 */
define(['custom/widgets/js/yufpOrgTree.1.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    // yufp.lookup.reg('ACCT_B_TYPE,ACCT_S_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.yuspClimpNumstatService + '/api/loystorgcost/querylist',
          formdata: {},
          isTrueY: false,
          isTrueM: false,
          dialogVisible: false,
          viewTitle: ''
        };
      },
      methods: {
        getSummaries: function (param) {
          var columns = param.columns;
          var data = param.data;
          var sums = [];
          columns.forEach(function (column, index) {
            if (index === 0) {
              sums[index] = '合计';
              return;
            }
            var values = data.map(function (item) {
              return Number(item[column.property]);
            });
            if (!values.every(function (value) {
              return isNaN(value)
              ;
            })) {
              sums[index] = values.reduce(function (prev, curr) {
                var value = Number(curr);
                if (!isNaN(value)) {
                  var sum = parseFloat(prev) + parseFloat(curr);
                  return sum.toFixed(2);
                } else {
                  return parseFloat(prev).toFixed(2);
                }
              }, 0);
              sums[index] += '';
            } else {
              sums[index] = '合计';
            }
          });

          return sums;
        },
        changeY: function (data) {
          var _this = this;
          if (data != '') {
            _this.isTrueM = true;
          }
        },
        changeM: function (data) {
          var _this = this;
          if (data != '') {
            _this.isTrueY = true;
          }
        }
      }
    });
  };
});