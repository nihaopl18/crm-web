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
          formdata: {},
          formdata1: {},
          options: [],
          value1: '',
          tableData: [{
            custName: '王xx',
            custPhone: '137*****7878',
            name: '王xx',
            recPhone: '131****9035',
            org: '总行',
            markingName: '张xx',
            gainPhoneTime: '2019-05-10 10:00',
            channel: '手机银行'
          },
          {
            custName: '王xx',
            custPhone: '137*****7878',
            name: '王xx',
            recPhone: '131****9035',
            org: '总行',
            markingName: '张xx',
            gainPhoneTime: '2019-05-10 10:00',
            channel: '手机银行'
          },
          {
            custName: '王xx',
            custPhone: '137*****7878',
            name: '王xx',
            recPhone: '131****9035',
            org: '总行',
            markingName: '张xx',
            gainPhoneTime: '2019-05-10 10:00',
            channel: '手机银行'
          },
          {
            custName: '王xx',
            custPhone: '137*****7878',
            name: '王xx',
            recPhone: '131****9035',
            org: '总行',
            markingName: '张xx',
            gainPhoneTime: '2019-05-10 10:00',
            channel: '手机银行'
          }
          ],
          funnelChart: {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c}%'
            },
            legend: {
              orient: 'vertical',
              left: '60%',
              icon: 'rect',
              top: 30,
              icon: 'rect',
              itemGap: 30,
              itemWidth: 16,
              itemHeight: 16,
              textStyle: {
                fontSize: '12',
                color: '#5A6277'
              },
              data: ['参与人数', '触达人数', '达成交易人数']
            },
            calculable: true,
            color: ['#5EA2FF', '#8191FE', '#FFA767'],
            series: [
              {
                name: '商机转化率',
                type: 'funnel',
                width: '15%',
                height: '80%',
                left: '35%',
                top: '10%',
                label: {
                  normal: {
                    position: 'right',
                    color: '#5A6277',
                    formatter: function (params) {
                      var relVal = params.data.name + ':' + params.data.value;
                      return relVal;
                    }
                  }
                },
                data: [
                  { value: 75, name: '参与人数', num: 6 },
                  { value: 60, name: '触达人数', num: 4 },
                  { value: 50, name: '达成交易人数', num: 2 }
                ]
              },
              {
                name: '商机转化率',
                type: 'funnel',
                width: '15%',
                height: '80%',
                left: '35%',
                top: '10%',
                label: {
                  normal: {
                    position: 'left',
                    color: '#5A6277',
                    formatter: '转化率: {c}%'
                  }
                },
                data: [
                  { value: 75, name: '参与人数', num: 6 },
                  { value: 60, name: '触达人数', num: 6 },
                  { value: 50, name: '达成交易人数', num: 6 }
                ]
              }
            ]
          }
        };
      },
      methods: {}
    });
  };
});