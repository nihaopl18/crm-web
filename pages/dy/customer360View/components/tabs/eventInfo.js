/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-09 09:36:44
 * @update by:
 * @description:
 */

(function (vue, name) {
  vue.component(name, {
    template: '  <div class="eventInfo">\
    <yu-panel title="最新事件" panel-type="simple">\
      <template slot="right">\
        <div style="display: flex">\
          <yu-button size="small">按时间</yu-button>\
          <yu-select v-model="brand" value-key="id" placeholder="请选择">\
            <yu-option v-for="item in optionsB" :key="item.id" :label="item.name" :value="item"></yu-option>\
          </yu-select>\
        </div>\
      </template>\
  \
      <div class="event-container">\
        <yu-row :gutter="20">\
          <yu-col v-for="index in 6" :key="index" :span="8">\
            <div class="event-item">\
              <div class="top">\
                <p class="yu-icon-time">2012-12-05</p>\
                <p>客户代销基金产品即将到期</p>\
                <p>汇天富全球医疗保健QDII 将于20121-12-21日到期，将赎回本息 288123000.00</p>\
              </div>\
              <div class="bottom">\
                <p>汇天富全球医疗保健QDII</p>\
                <ul>\
                  <li>中低风险</li>\
                  <li>投资期限 175天</li>\
                  <li>起购金额 5000元</li>\
                </ul>\
                <div class="btns">\
                  <yu-button type="danger" style="width: 160px" icon="yu-icon-box">营销工具包</yu-button>\
                  <yu-button type="danger" style="width: 160px" icon="yu-icon-calendar1">一键呼叫</yu-button>\
                </div>\
              </div>\
            </div>\
          </yu-col>\
        </yu-row>\
      </div>\
    </yu-panel>\
  </div>',
    data: function () {
      return {
        optionsB: [{
          id: 1,
          name: '梦龙'
        }, {
          id: 2,
          name: '妙可兰朵'
        }, {
          id: 3,
          name: '阿依莲'
        }, {
          id: 4,
          name: '思迪方思'
        }, {
          id: 5,
          name: 'NUY'
        }],
        brand: { 'id': 3, 'name': '阿依莲' }
      };
    }
  });
}(Vue, 'event-info'));