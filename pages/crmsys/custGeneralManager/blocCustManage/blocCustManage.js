/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-4 14:59:16.
 * @updated by
 * @description 集团客户管理
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('GROUP_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '/api/ocrmfcigroup/list',
          formdata: {},
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true
        };
      },
      methods: {
        // 日期格式化(年月日)
        dateFormatterSimple: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
        },
        /**
         * 双击列表项数据，弹出客户视图
         * @param row 当前行数据
         */
        showCustViewPortFn: function (row, column) {
          var obj = row;
          yufp.frame.addTab({
            id: 'companyGroupView', // 菜单功能ID（路由ID）
            key: 'custom_companyGroupView' + row.groupNo, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: row.groupNameMain + '集团视图', // 页签名称
            data: {
              // 集团视图树节点id
              id: '57dedde54c6f4e5484a3512e07611870',
              groupName: obj.groupNameMain,
              // 集团编号
              groupNo: obj.groupNo} // 传递的业务数据，可选配置
          });
        },
        /**
         * 集团客户视图
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          // 集团视图树节点id
          // '2a56b85146b94e82841897d22cda54cb';
          yufp.frame.addTab({
            id: 'companyGroupView', // 菜单功能ID（路由ID）
            key: 'custom_companyGroupView' + selectionsAry[0].groupNo, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: selectionsAry[0].groupNameMain + '集团视图', // 页签名称
            data: {
              // 集团视图树节点id
              id: '57dedde54c6f4e5484a3512e07611870',
              groupName: selectionsAry[0].groupNameMain,
              // 集团编号
              groupNo: selectionsAry[0].groupNo} // 传递的业务数据，可选配置
          });
        }
      }
    });
  };
});