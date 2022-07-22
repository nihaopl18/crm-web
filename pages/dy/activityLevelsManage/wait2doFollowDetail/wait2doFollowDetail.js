/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-09-17 17:01:50
 * @update by:
 * @description:
 */
/**
 * @created by zhangkun6 on 2021-9-17 17:01:50
 * @updated by
 * @description 待办跟进详情
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('DY0009,DY0002');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          detailVisible: false,
          orgName: data.orgName,
          dataUrl: '/api/activitymonitoring/todoworkdetail',
          baseParam: {
            condition: JSON.stringify({
              startTime: data.rangeDate[0],
              endTime: data.rangeDate[1],
              orgId: data.orgId,
              orgLevel: data.orgLevel,
            })
          }
        };
      },
      methods: {
        handleClose: function () {
          this.detailVisible = false;
        },
        detailFn: function (row) {
          var _this = this;
          var params = {
            condition: JSON.stringify({
              startTime: data.rangeDate[0],
              endTime: data.rangeDate[1],
              orgId: row.orgId,
              orgLevel: row.orgLevel,
            })
          };
          this.detailVisible = true;
          _this.$nextTick(function () {
            _this.$refs.detailTable.remoteData(params);
          });
        },
        toBankDetail: function (data) {
          yufp.frame.addTab({
            // 路由名称
            id: 'bankBranchDetail',
            // 自定义唯一页签key,请统一使用custom_前缀开头
            key: 'custom_bankBranchDetail' + data.orgId,
            // 页签名称
            title: '待办跟进详情-' + data.name,
            // 传递的业务数据，可选配置
            data: { orgId: data.orgId, orgName: data.name }
          });
        }
      }
    });
  };

  /**
   * 页面传递消息处理
   * @param type 消息类型
   * @param message 消息内容
   */
  exports.onmessage = function (type, message) {
  };

  /**
   * 页面销毁时触发destroy方法
   * @param id 路由ID
   * @param cite 页面站点信息
   */
  exports.destroy = function (id, cite) {
  };
});