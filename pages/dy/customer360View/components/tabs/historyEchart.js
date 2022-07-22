/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-09 09:36:44
 * @update by:
 * @description:
 */

(function (vue, name) {
  let myChart = null;
  vue.component(name, {
    template: '  <div id="myEcharts" style="width: 100%; height: 280px"></div>',
    props: {
      visitInfo: Object
    },
    data: function () {
      return {
        xData: [],
        hookToolTip: null,
        types: ['线下拜访', '营销通话', '短信触达', '客户反馈']
      };
    },
    watch: {
      hookToolTip: function (name) {
        document.querySelector('#btn-tooltip').addEventListener('click', function () {
          // this.$router.push({ path: '/home', query: { name: name }});
          console.log(111);
        });
      },

      visitInfo: function () {
        let visitInfo = this.visitInfo;
        if (visitInfo.contactDate1 || visitInfo.contactDate2 || visitInfo.contactDate3 || visitInfo.contactDate4) {
          this.drawEcharts();
        } else {
          this.drawEcharts();
        }
      }

    },
    beforeDestroy: function () {
      if (myChart) {
        myChart.clear();
      }
    },
    methods: {
      drawEcharts: function () {
        let _this = this;
        let container = document.getElementById('myEcharts');
        myChart = window.echarts.init(container);
        let option = {
          legend: {
            data: this.types,
            left: 'left'
          },
          tooltip: {
            position: 'top',
            triggerOn: 'click',
            enterable: true,
            formatter: function (params) {
              _this.hookToolTip = params;
              return '<div style="width: 100px; height: 60px; background: #fff; color: #000;display: flex; justify-content: space-around; align-items: center">\
                <div><p>' + params.seriesName + '</p><p>' + params.name + '</p></div>\
                <!--<p style="color: red; cursor: pointer;" id="btn-tooltip" >详情</p>-->\
              </div>';
            }
          },
          grid: {
            left: 40,
            bottom: 10,
            right: 40,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            splitNumber: 10,
            interval: 3600 * 24 * 1000 * 30,
            data: _this.getHarlfYearDays(),
            boundaryGap: false,
            splitLine: {
              show: true
            },
            axisLine: {
              show: true
            }
          },
          yAxis: {
            type: 'category',
            data: this.types,
            axisLine: {
              show: false
            },
            splitLine: {
              show: true
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [{
            name: '线下拜访',
            type: 'scatter',
            symbol: 'rect',
            symbolSize: function (val) {
              return [6, 30];
            },
            data: _this.getDatesData(1),
            animationDelay: function (idx) {
              return idx * 5;
            }
          }, {
            name: '营销通话',
            type: 'scatter',
            symbol: 'rect',
            symbolSize: function (val) {
              return [6, 30];
            },
            data: _this.getDatesData(2),
            animationDelay: function (idx) {
              return idx * 5;
            }
          }, {
            name: '短信触达',
            type: 'scatter',
            symbol: 'rect',
            symbolSize: function (val) {
              return [6, 30];
            },
            data: _this.getDatesData(3),
            animationDelay: function (idx) {
              return idx * 5;
            }
          }, {
            name: '客户反馈',
            type: 'scatter',
            symbol: 'rect',
            symbolSize: function (val) {
              return [6, 30];
            },
            data: _this.getDatesData(4),
            animationDelay: function (idx) {
              return idx * 5;
            }
          }],
          color: ['#73A0FA', '#EB7E65', '#F7C739', '#B194FA']
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        // 根据窗口的大小变动图表 --- 重点
        window.addEventListener('resize', function () {
          if (_this.myChart) {
            myChart.resize();
          }
        });
      },

      getDatesData: function (index) {
        let dateData = [];
        let tempArr = this.visitInfo['contactDate' + index];
        if (tempArr && tempArr.length) {
          for (let i = 0; i < tempArr.length; i++) {
            dateData.push([tempArr[i], 4 - index, 0]);
          }
        }
        return dateData;
      },
      getHarlfYearDays: function () {
        let dayList = [];
        let start = moment(moment().subtract(6, 'months'));
        let end = moment(moment());
        let day = end.diff(start, 'days');
        for (let i = 1; i <= day; i++) {
          dayList.push(start.add(1, 'days').format('YYYY-MM-DD'));
        }
        return dayList;
      }
    }
  });
}(Vue, 'history-echart'));