/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-09 09:36:44
 * @update by:
 * @description:
 */

(function (vue, name) {
  vue.component(name, {
    template: '  <div class="blank_template">\
    <!--<yu-panel title="信贷" panel-type="simple">\
      <yu-xtable :data="loanInfo" stripe :pageable="false" style="width: 100%">\
        <yu-xtable-column prop="evaDate" label="评估时间" align="center"></yu-xtable-column>\
        <yu-xtable-column prop="riskLev" label="风险等级" align="center" data-code="FINANCIAL_RISK"></yu-xtable-column>\
        <yu-xtable-column prop="riskStatus" label="是否有效" align="center" data-code="AML_RISK"></yu-xtable-column>\
        <yu-xtable-column prop="evaChannel" label="评估渠道" align="center"></yu-xtable-column>\
      </yu-xtable>\
    </yu-panel>-->\
    <yu-panel title="理财" panel-type="simple">\
      <yu-xtable :data="finInfo" stripe :pageable="false" style="width: 100%">\
        <yu-xtable-column prop="evaDate" label="评估时间" align="center"></yu-xtable-column>\
        <yu-xtable-column prop="riskLev" label="理财偏好" align="center" data-code="FINANCIAL_RISK"></yu-xtable-column>\
        <yu-xtable-column prop="riskStatus" label="是否有效" align="center" data-code="YES_NO"></yu-xtable-column>\
        <yu-xtable-column prop="evaChannel" label="评估渠道" align="center" data-code="EVA_CHANNEL"></yu-xtable-column>\
      </yu-xtable>\
    </yu-panel>\
    <yu-panel title="反洗钱" panel-type="simple">\
      <yu-xtable :data="amlInfo" stripe :pageable="false" style="width: 100%">\
        <yu-xtable-column prop="evaDate" label="评估时间" align="center"></yu-xtable-column>\
        <yu-xtable-column prop="riskLev" label="风险等级" align="center" data-code="AML_RISK"></yu-xtable-column>\
        <yu-xtable-column prop="riskStatus" label="是否有效" data-code="YES_NO" align="center"></yu-xtable-column>\
        <yu-xtable-column prop="evaChannel" label="评估渠道" align="center" data-code="EVA_CHANNEL" ></yu-xtable-column>\
      </yu-xtable>\
    </yu-panel>\
  </div>',
    data: function () {
      yufp.lookup.reg('FINANCIAL_RISK,AML_RISK,YES_NO，EVA_CHANNEL');
      return {
        loanInfo: [],
        finInfo: [],
        amlInfo: []
      };
    },

    created: function () {
      this.getRiskInfo();
    },
    methods: {
      getRiskInfo: function () {
        let _this = this;
        let custId = yufp.localStorage.get('custInfo').custId;
        yufp.service.request({
          method: 'GET',
          url: backend.adminService + '/api/acrmfciriskwarninfo/querylist',
          data: {
            condition: JSON.stringify({ custId: custId })
            // condition: JSON.stringify({userId: 1070515349})
          },
          callback: function (code, message, response) {
            if (code === 0) {
              let data = response.data;
              _this.loanInfo = data.loanInfo || [];
              _this.finInfo = data.finInfo || [];
              _this.amlInfo = data.amlInfo || [];
            }
          }
        });
      },
      formJE: function (row, column, cellValue) {
        cellValue = yufp.util.dateFormat(cellValue, '{y}-{m}-{d}');
        return cellValue;
      }
    }
  });
}(Vue, 'risk-info'));