/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-09 09:36:44
 * @update by:
 * @description:
 */

(function(vue, name) {
    vue.component(name, {
        template: '  <div class="behaviorTrack">\
    <yu-panel title="财富管理漏斗" panel-type="simple">\
      <div class="funnel-box">\
          <yu-echarts class="track-echart" :option="option" height="400px" width="360px"></yu-echarts>\
          <div class="echarts-center">\
            <yu-row class="funnel-item first">\
              <yu-col :span="18">\
              <div style="overflow-y:auto;overflow-x:auto:auto;height:84px">\
                  <div v-if="!visitInfo || !visitInfo.length">暂无数据</div>\
                  <div v-for="item in visitInfo" :key="item.prodName"><span class="productName">{{ item.prodName }}</span><span class="fr">{{ item.viewsNo }}次</span></div>\
                  </div>\
              </yu-col>\
            </yu-row>\
            <yu-row class="funnel-item second">\
              <yu-col :span="18">\
              <div style="overflow-y:auto;overflow-x:auto:auto;height:84px">\
                  <div v-if="!buyInfo || !buyInfo.length">暂无数据</div>\
                  <div v-for="item in buyInfo" :key="item.prodName">{{ item.prodName }}</div>\
                </div>\
              </yu-col>\
            </yu-row>\
            <yu-row class="funnel-item third">\
              <yu-col :span="18">\
              <div style="overflow-y:auto;overflow-x:auto:auto;height:84px">\
                <div v-if="!placeOrderInfo || !placeOrderInfo.length">暂无数据</div>\
                  <div v-for="item in placeOrderInfo" :key="item.prodName">{{ item.prodName }}</div>\
                </div>\
              </yu-col>\
            </yu-row>\
          </div>\
          <div class="echarts-right">\
            <p class="rankTitle">产品点击次数排行榜</p>\
            <yu-row class="rank">\
              <yu-col :span="20">\
                <div v-if="!prodClickInfo || !prodClickInfo.length">暂无数据</div>\
                <div class="rank-item" v-for="(item, index) in prodClickInfo" :key="item.productName">\
                  <span :class="[\'span-basic\', \'dot\' + index]">{{index+1}}</span>\
                  <span class="productName">{{ item.prodName }}\</span>\
                  <span class="fr">{{ item.viewsNo }}</span>\
                </div>\
              </yu-col>\
            </yu-row>\
          </div>\
      <div/>\
    </yu-panel>\
  \
    <!--<yu-panel title="事实类行为清单" panel-type="simple">\
      <template slot="right">\
        <yu-row>\
          <yu-col :span="3">\
            <div>\
              <span>↑</span>\
              <span>按时间</span>\
            </div>\
  \
          </yu-col>\
          <yu-col :span="3">\
            <p>|</p>\
          </yu-col>\
          <yu-col :span="3">\
            <!-- <yu-select></yu-select> -->\
          </yu-col>\
        </yu-row>\
      </template>\
      <!--<yu-xtable :data="tableData" :border="false" style="width: 100%">\
        <yu-xtable-column prop="date" label="最近发生时间"></yu-xtable-column>\
        <yu-xtable-column prop="type" label="行为类型"></yu-xtable-column>\
        <yu-xtable-column prop="action" label="行为"></yu-xtable-column>\
      </yu-xtable>-->\
    </yu-panel>\
  </div>',
        data: function() {
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c}%'
                },
                legend: {
                    data: ['浏览产品', '购买页面', '下单支付'],
                    orient: 'vertical',
                    right: 'right',
                    show: false
                },
                series: [{
                    animation: false,
                    name: '财富管理漏斗',
                    type: 'funnel',
                    left: '3%',
                    top: 30,
                    bottom: 30,
                    width: '84%',
                    min: 40,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        fontSize: 12,
                        show: true,
                        position: 'inside'
                    },
                    labelLine: {
                        length: 50,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    data: [
                        { value: 60, name: '下单支付' },
                        { value: 80, name: '购买页面' },
                        { value: 100, name: '浏览产品' }
                    ]
                }],
                color: [
                    '#729FF9',
                    '#F7C739',
                    '#EB7E65'
                ]
            };
            return {
                option: option,
                tableData: [{
                        date: '2021-01-23',
                        type: '资金变动',
                        action: '每月账户入账 50000.00'
                    },
                    {
                        date: '2021-01-23',
                        type: '资金变动',
                        action: '每月账户入账 50000.00'
                    },
                    {
                        date: '2021-01-23',
                        type: '资金变动',
                        action: '每月账户入账 50000.00'
                    }
                ],
                visitInfo: [],
                buyInfo: [],
                placeOrderInfo: [],
                prodClickInfo: []
            };
        },
        created: function() {
            this.getBehaviorTrackInfo();
        },
        methods: {
            getBehaviorTrackInfo: function() {
                let _this = this;
                let custId = yufp.localStorage.get('custInfo').custId;
                yufp.service.request({
                    method: 'GET',
                    url: backend.adminService + '/api/ocrmfwpschedulevisit/querylist',
                    data: {
                        condition: JSON.stringify({ custId: custId })
                            // condition: JSON.stringify({userId: 1070515349})
                    },
                    callback: function(code, message, response) {
                        if (code === 0) {
                            let data = response.data;
                            _this.visitInfo = data.visitInfo;
                            _this.visitInfo.sort(function(a, b) {
                                return b.viewsNo - a.viewsNo;
                            });
                            _this.buyInfo = data.buyInfo;
                            _this.placeOrderInfo = data.placeOrderInfo;
                            _this.prodClickInfo = data.prodClickInfo;
                        }
                    }
                });
            }
        }
    });
}(Vue, 'behavior-track'));