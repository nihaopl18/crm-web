/**
 * @created by 张成龙 on 2019-1-22 15:53:06
 * @updated by
 * @description 金融小工具树菜单
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          data: {},
          treeData: [{
            id: '1',
            label: '金融小工具',
            children: [
              {
                id: '1-1',
                label: '存款类',
                children: [
                  {
                    id: 'infoCalculatordep',
                    label: '存款利率查询'
                  },
                  {
                    id: 'deposit1',
                    label: '活期存款计算器'
                  },
                  {
                    id: 'calcLumpSum',
                    label: '整存整取计算器'
                  }
                ]
              }, {
                id: '1-2',
                label: '贷款类',
                children: [
                  {
                    id: 'infoCalculatorLoan',
                    label: '贷款利率表查询'
                  }, {
                    id: 'calcLoanAmount',
                    label: '楼宇按揭计算器'
                  }, {
                    id: 'calcLoan',
                    label: '普通贷款计算器'
                  }, {
                    id: 'loanTx',
                    label: '贴现计算器'
                  }
                ]
              }, {
                id: '1-3',
                label: '投资类',
                children: [
                  {
                    id: 'calcFinancingPurchase',
                    label: '理财认购计算器'
                  }, {
                    id: 'calGold',
                    label: '黄金认购计算器'
                  }, {
                    id: 'calcBondsPurchase',
                    label: '债券认购计算器'
                  }, {
                    id: 'calcFondPurchase',
                    label: '基金认购计算器'
                  },
                  {
                    id: 'calcFondPurchaseApply',
                    label: '基金申购计算器'
                  }, {
                    id: 'calcFondRedemption',
                    label: '基金赎回计算器'
                  }, {
                    id: 'calcFundPlan',
                    label: '基金定投计算器'
                  }
                ]
              }, {
                id: '1-4',
                label: '外汇类',
                children: [
                  {
                    id: 'calcForeignExchange',
                    label: '外汇兑换计算器'
                  }
                ]
              }, {
                id: '1-5',
                label: '税赋类',
                children: [
                  {
                    id: 'calcPersonalIncomeTax',
                    label: '个人所得税计算器'
                  }
                ]
              }, {
                id: '1-6',
                label: '年金类',
                children: [
                  {
                    id: 'calcPension',
                    label: '年金计算器'
                  }
                ]
              }
            ]
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        };
      },
      methods: {
        // 点击节点，跳转到不同的菜单
        goRoute: function (data) {
          var _this = this;
          // console.log(data);
          // 第三个参数，要渲染的div
          yufp.router.to(data.id, _this.data, 'routeMenu');
        },
        mounted: function () {
          // 默认显示客户视图首页
          yufp.router.to('infoCalculatordep', this.data, 'routeMenu');
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