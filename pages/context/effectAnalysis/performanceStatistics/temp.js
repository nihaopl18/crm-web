/**
 * @created by houyx3 on 2019/05/13.
 * @description 实时数据
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
       	  activeName:"first",
          Div: 'id' + new Date().getTime()
        };
      },
      mounted: function () {
        var _this = this;
        _this.personStatisticsFn();
      },
      methods: {
        handleClick: function (tab, event) {
          var _this = this;
          if (tab.name === 'first') {
            _this.personStatisticsFn();
          } else if (tab.name === 'second') {
            _this.orgStatisticsFn();
          } else if (tab.name === 'third') {
            _this.channelStatisticsFn();
          }
        },
        personStatisticsFn: function (value) {
          var _this = this;
          var routeId = 'personStatistics';
          yufp.router.to(routeId, {data: 'realTimeData'}, _this.Div);
        },
        orgStatisticsFn: function (value) {
          var _this = this;
          var routeId = 'orgStatistics';
          yufp.router.to(routeId, {data: 'realTimeData'}, _this.Div);
        },
        channelStatisticsFn: function (value) {
          var _this = this;
          var routeId = 'channelStatistics';
          yufp.router.to(routeId, {data: 'realTimeData'}, _this.Div);
        }
      }
    });
  };
});