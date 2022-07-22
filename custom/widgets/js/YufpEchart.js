/**
 * echart图表组件 yufp-echart
 * @date    2019-01-21
 */
(function (vue, $, name) {
  // 注册岗位组件
  vue.component(name, {
    template: '<yu-echarts :option="echartData" :graph-type="graphType" :graph-info="graphInfo" :graph-sql="graphSql" :width="width" :height="height"></yu-echarts>',
    props: {
      echartOption: Object,
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      dataUrl: String,
      dataParams: Object,
      graphType: String,
      graphInfo: String,
      graphSql: String,
      /** 请求类型 */
      requestType: {
        type: String,
        default: 'GET'
      },
      jsonData: {
        type: String,
        default: 'data'
      }
    },

    data: function () {
      return {
        echartData: {}
      };
    },
    created: function () {
      if (!this.graphSql) {
        this.echartData = this.echartOption;
      } else {
        this.query();
      }
    },
    watch: {
      graphType: function (val, oldVal) {
        this.query();
      },
      echartOption: {
        handler: function () {
          this.echartData = this.echartOption;
        },
        deep: true
      }
    },
    methods: {
      creatGraph: function (type, infor, response) {
        var option = {};
        var series = {};
        var xAxis = {};
        var xAxisData = [];
        series.type = type;
        var nameId = infor.labelColumnKey.replace(/_(\w)/g, function (all, letter) {
          return letter.toUpperCase();
        });
        var data = [];
        for (var i = 0, l = response.length; i < l; i++) {
          var dataItem = {};
          Object.keys(response[i]).forEach(function (item, index) {
            // if (item === nameId || item.indexOf(nameId) > -1) {
            if (item === nameId || (item.indexOf('Sum') === -1 && item.indexOf(nameId) > -1)) {
              if (type === 'pie') {
                dataItem.name = response[i][item];
              } else {
                xAxisData.push(response[i][item]);
              }
            } else {
              if (type === 'pie') {
                dataItem.value = response[i][item];
              } else {
                data.push(response[i][item]);
              }
            }
          });
          if (type === 'pie') {
            data.push(dataItem);
          } else {
            xAxis.data = data;
          }
        }
        series.data = data;
        option.series = series;
        if (type === 'line' || type === 'bar') {
          var yAxis = {};
          yAxis.min = infor.yMinValue;
          yAxis.name = infor.yName;
          option.xAxis = xAxis;
          option.yAxis = yAxis;
        }
        this.echartData = option;
      },
      query: function () {
        var _this = this;
        yufp.service.request({
          method: 'POST',
          async: true,
          url: '/api/ocrmfsysusertile/sql',
          data: {condition: JSON.stringify({sql: _this.graphSql})},
          callback: function (code, message, response) {
            var graphType = _this.graphType;
            var response = response.data;
            var graphInfo = JSON.parse(_this.graphInfo);
            _this.creatGraph(graphType, graphInfo, response);
          }
        });
      }
    }
  });
}(Vue, yufp.$, 'yufp-echart'));