/**
 * @Created by panglx panglx@yusys.com.cn on 2018-12-27 09:48:55.
 * @updated by
 * @description 客户查询
 */
define(['custom/widgets/js/yufpCustSelector.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0011');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.yuspClimpCustService + '/api/custinfo/query' // 客户查询列表接口
        };
      },
      methods: {
        /**
         * 双击表格触发客户视图
         */
        rowDblclickFn: function (row, event) {
          var customKey = 'custom_' + row.custId;
          var routeId = 'scoreview'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '客户视图', // 页签名称
            data: { selections: row } // 传递的业务数据，可选配置
          });
        },
        /**
         * 单选点击打开客户视图
         */
        customerViewFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var customKey = 'custom_' + selectionsAry[0].custId;
          var routeId = 'scoreview'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '客户视图', // 页签名称
            data: { selections: selectionsAry[0] } // 传递的业务数据，可选配置
          });
        }
      }
    });
  };
});