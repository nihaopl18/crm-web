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
        _this.realTimeDataFn();
      },
      methods: {
        handleClick: function (tab, event) {
          var _this = this;
          if (tab.name === 'first') {
            _this.realTimeDataFn();
          } else if (tab.name === 'second') {
            _this.activityFlowFn();
          } else if (tab.name === 'third') {
            _this.activityTransFn();
          } else if (tab.name === 'four') {
            _this.activityRoiFn();
          } else if (tab.name === 'five') {
            _this.socialAnalysisFn();
          }
        },
        realTimeDataFn: function (value) {
          var _this = this;
          var routeId = 'realTimeData';
          yufp.router.to(routeId, {data: 'realTimeData'}, _this.Div);
        },
        activityFlowFn: function (value) {
          var _this = this;
          var routeId = 'activityFlow';
          yufp.router.to(routeId, {data: 'realTimeData'}, _this.Div);
        },
        activityTransFn: function (value) {
          var _this = this;
          var routeId = 'activityTrans';
          yufp.router.to(routeId, {data: 'realTimeData'}, _this.Div);
        },
        activityRoiFn: function (value) {
          var _this = this;
          var routeId = 'activityRoi';
          yufp.router.to(routeId, {data: 'realTimeData'}, _this.Div);
        },
        socialAnalysisFn: function (value) {
          var _this = this;
          var routeId = 'socialAnalysis';
          yufp.router.to(routeId, {data: 'realTimeData'}, _this.Div);
        }
      }
    });
  };
});