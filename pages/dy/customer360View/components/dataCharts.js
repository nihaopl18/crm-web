/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-09 09:36:44
 * @update by:
 * @description: 图表展示
 */

(function (vue, name) {
  vue.component(name, {
    template: '   <div class="dataChart">\
    <p class="chartUpdateTime">数据最近更新时间：{{ currentDate }}</p>\
    <div class="chart-container">\
      <div class="chartBox">\
        <yu-echarts ref="refEchart" :option="option" width="350px" height="130px"></yu-echarts>\
        <el-slider v-model="dateTimeRange" range :max="maxCount" :min="0" :format-tooltip="formatTooltip" @change="handleSliderChange"> </el-slider>\
      </div>\
      <div class="dataChart-left">\
        <div class="first">\
          <div>\
            <p>\
            <!-- <span class="dotRed"></span> -->\
              <span>历史峰值AUM\
                <el-tooltip class="item" effect="light" placement="right">\
                  <div slot="content">历史峰值AUM：<br/>指统计期内的客户在我行的AUM余额最大值</div>\
                  <i class="el-icon-warning-outline"></i>\
                </el-tooltip>\
              </span>\
            </p>\
            <p>{{ maxDate }} {{yufp.util.moneyFormatter(maxBalance || 0)}}</p>\
          </div>\
          <div style="margin: 6px 0">\
            <p>\
              <!-- <span class="dotRed"></span> -->\
              <span>近一年峰值AUM\
                <el-tooltip class="item" effect="light" placement="right">\
                  <div slot="content">近一年峰值AUM：<br/>指12个月内客户在我行的AUM余额最大值</div>\
                  <i class="el-icon-warning-outline"></i>\
                </el-tooltip>\
              </span>\
            </p>\
            <p>{{ historyMaxDate }} {{yufp.util.moneyFormatter(historyMaxBalance || 0)}}</p>\
          </div>\
          <div>\
            <p>\
              <span class="dotBlue"></span>\
              <span>目前AUM\
                <el-tooltip class="item" effect="light" placement="right">\
                  <div slot="content">目前AUM：<br/>统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金、保险等（贷款、信用卡、网贷等不算入AUM)</div>\
                  <i class="el-icon-warning-outline"></i>\
                </el-tooltip>\
              </span>\
              <p>{{currentDate}} {{ yufp.util.moneyFormatter(currentBalance || 0) }}</p>\
            </p>\
          </div>\
        </div>\
        <div class="second">\
          <p>AUM月日均\
            <el-tooltip class="item" effect="light" placement="bottom">\
              <div slot="content">AUM月日均和上月变化百分比：<br/>统计期内客户在我行的剩余AUM总额,包括客户在我行的个人存款、理财产品、基金、保险等（贷款、信用卡、网贷等不算入AUM)</div>\
              <i class="el-icon-warning-outline"></i>\
            </el-tooltip>\
          </p>\
          <p>{{ yufp.util.moneyFormatter(propertyInfo.aumbalanceAvgRmb || 0) }}<span style="font-size: 12px">元</span></p>\
          <p>\
            <span :class="yufp.util.returnUpOrDownClass(propertyInfo.aumbalanceAvgRmbQoq)">{{ yufp.util.returnPercent(propertyInfo.aumbalanceAvgRmbQoq || 0)}}%</span>\
          </p>\
        </div>\
        <div class="third">\
            <p>存款余额\
              <el-tooltip class="item" effect="light" placement="bottom">\
                <div slot="content">存款余额和上月变化百分比：<br/>统计期内客户在我行剩余的定期/活期/信用卡溢缴款等各类存款余额</div>\
                <i class="el-icon-warning-outline"></i>\
              </el-tooltip>\
            </p>\
            <p>{{ yufp.util.moneyFormatter(propertyInfo.depositBalanceRmb || 0) }}<span style="font-size: 12px">元</p>\
            <p>\
              <span :class="yufp.util.returnUpOrDownClass(propertyInfo.depositBalanceRmbQoq)">{{ yufp.util.returnPercent(propertyInfo.depositBalanceRmbQoq || 0)}}%</span>\
            </p>\
            <!--<div class="chart">\
            <yu-echarts ref="echart7" :option="echartOption7" hight="65px" width="100px"></yu-echarts>\
          </div>-->\
        </div>\
        <div class="forth">\
          <p>贷款余额\
            <el-tooltip class="item" effect="light" placement="bottom">\
              <div slot="content">贷款余额和上月变化百分比：<br/>包括个人房产按揭贷款，个人消费类贷款，汽车贷款，个人经营类贷款，个人质押贷款，法人房产按揭贷款，循环贷款，其他贷款等将来应归还的金额</div>\
              <i class="el-icon-warning-outline"></i>\
            </el-tooltip>\
          </p>\
          <p>{{ yufp.util.moneyFormatter(propertyInfo.loanBalance || 0) }}<span style="font-size: 12px">元</p>\
          <p>\
            <span :class="yufp.util.returnUpOrDownClass(propertyInfo.loanBalanceRmbQoq)">{{ yufp.util.returnPercent(propertyInfo.loanBalanceRmbQoq || 0)}}%</span>\
          </p>\
        </div>\
      </div>\
    </div>\
  </div>',
    props: {
      aumInfo: {
        type: Object,
        default: function () {
          return {
            aumInfos: [],
            max: {
              month: '',
              balance: ''
            },
            history: {
              month: '',
              balance: ''
            },
            current: {
              month: '',
              balance: ''
            }
          };
        }
      },
      depositInfo: {
        type: Array,
        default: function () {
          return [];
        }
      },
      propertyInfo: {
        type: Object,
        default: function () {
          return {};
        }
      }
    },
    watch: {
      aumInfo: function (obj) {
        let arr = obj.aumInfos ? obj.aumInfos.reverse() : [];
        if (arr && arr.length) {
          this.dateMap = {};
          this.dateTimeRange[1] = arr.length;
          this.maxCount = arr.length - 1;
          let xData = [];
          let valueData = [];
          let max = arr[0].aumBal;
          let currentVal = arr[arr.length - 1].balance;
          let currentName = arr[arr.length - 1].month.split('-')[1];
          for (let i = 0; i < arr.length; i++) {
            xData.push(arr[i].month.split('-')[1]);
            this.dateMap[i] = arr[i].month;
            this.dateMap[i] = arr[i].month;
            valueData.push(arr[i].balance);
            let cur = arr[i].balance;
            cur > max ? max = cur : null;
          }
          this.option.xAxis.data = xData;
          this.option.series[0].data = valueData;
          this.option.series[0].markPoint.data = [
            // {
            //   name: '最大值',
            //   type: 'max',
            //   itemStyle: {
            //     color: '#EC5964'
            //   }
            // },
            {
              name: '当前值',
              yAxis: currentVal,
              xAxis: currentName,
              itemStyle: {
                color: '#5389F5'
              }
            }
          ];
          this.monthDate = xData;
          this.balance = valueData;
        }
      },
      depositInfo: function (arr) {
        if (arr.length) {
          let xData = [];
          let valueData = [];
          for (let i = 0; i < arr.length; i++) {
            xData.push(arr[i].dataDate);
            valueData.push(arr[i].dpsBal);
          }
        }
      }
    },
    computed: {
      maxDate: function () {
        if (this.aumInfo.max) {
          return this.aumInfo.max.month.split(' ')[0];
        }
      },
      maxBalance: function () {
        if (this.aumInfo.max) {
          return this.aumInfo.max.balance;
        }
      },
      historyMaxDate: function () {
        if (this.aumInfo.history) {
          return this.aumInfo.history.month.split(' ')[0];
        }
      },
      historyMaxBalance: function () {
        if (this.aumInfo.history) {
          return this.aumInfo.history.balance;
        }
      },
      currentDate: function () {
        if (this.aumInfo.current) {
          return this.aumInfo.current.month;
        }
      },
      currentBalance: function () {
        if (this.aumInfo.current) {
          return this.aumInfo.current.balance;
        }
      }
    },
    data: function () {
      return {
        option: {
          title: {
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['xxx'],
            padding: [15, 0, 0, 10],
            textStyle: {
              color: '#666'
            }
          },
          grid: {
            top: '30',
            left: '6',
            right: '30',
            bottom: '25',
            containLabel: true
          },
          textStyle: {
            color: '#888'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            }
          },
          yAxis: {
            show: true,
            type: 'value',
            min: '0',
            name: '单位(元)',
            nameLocation: 'end',
            nameTextStyle: {
              fontSize: 12,
              align: 'left',
              verticalAlign: 'middle',
              padding: [0, 0, 0, 36]
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#F2F6FC'
              }
            },
            axisLabel: {
              fontSize: 9
            }
          },
          series: [
            {
              name: 'AUM',
              type: 'line',
              barWidth: '10',
              data: [],
              itemStyle: {
                normal: {
                  color: '#9093992'
                }
              },
              markPoint: {
                symbol: 'circle',
                data: [
                  // {
                  //   name: '最大值',
                  //   type: 'max',
                  //   itemStyle: {
                  //     color: '#EC5964'
                  //   }
                  // },
                  {
                    name: '当前值',
                    yAxis: 0,
                    xAxis: '',
                    itemStyle: {
                      color: '#5389F5'
                    }
                  }
                ],
                label: {
                  show: false
                },
                symbolSize: 10
              },
              smooth: true,
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(144,147,153, 0.7)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(255,255,255, 0.7)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              }
            }
          ]
        },
        echartOption7: {
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            show: false,
            type: 'category',
            data: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06']
          },
          yAxis: {
            show: false,
            type: 'value',
            min: 'dataMin'
          },
          grid: {
            top: 10,
            right: 0,
            bottom: 0,
            left: '-30',
            containLabel: true
          },
          series: [{
            data: [47, 49, 45, 52, 48, 47],
            type: 'line',
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3,
                  color: '#EE434C'
                }
              }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(238,67,76,0.7)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255,255,255, 0.7)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }]
        },
        currentAUM: '',
        maxAUM: '',
        dateTimeRange: [0, 12],
        dateMap: {},
        monthDate: [],
        balance: [],
        maxCount: 11
      };
    },
    created: function () {
      var months = this.getYearDays();
      for (var i = 0; i < months.length; i++) {
        this.dateMap[i] = months[i];
      }
    },
    methods: {
      formatTooltip: function (val) {
        return this.dateMap[val];
      },
      getYearDays: function () {
        let dayList = [];
        let start = moment(moment().subtract(12, 'months'));
        let end = moment(moment());
        let day = end.diff(start, 'months');
        for (let i = 1; i <= day; i++) {
          dayList.push(start.add(1, 'months').format('YYYY-MM'));
        }
        return dayList;
      },
      handleSliderChange: function (data) {
        var start = data[0];
        var end = data[1] + 1;
        this.option.xAxis.data = this.monthDate.slice(start, end);
        console.log(this.option.xAxis.data);
        this.option.series[0].data = this.balance.slice(start, end);
      }
    }
  });
}(Vue, 'data-charts'));