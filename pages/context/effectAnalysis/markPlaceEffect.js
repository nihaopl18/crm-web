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
          personPerforVis: false,
          personMarkVis: false,
          personSpreadVis: false,
          subordinateVis: false,
          custInfo: {},
          custInfoData: {},
          custInfoData1: {channelName: '手机银行',
            bringCustAllNum: '13290',
            launchAllNum: '30',
            spreadCustAllNum: '50876',
            markCustAllNum: '128979',
            joinAllNum: '9078',
            markCustNum: '824908',
            aanum: '81894933',
            xxx: 'xxx'
          },
          formdata: {},
          markPlaceData: [
            {
              PlaceId: 'XXX',
              PlaceName: '栏位1',
              org: '总行',
              activityPlanId: '1223',
              activityPlanName: '链家合作',
              activityId: '1456',
              activityName: '链家合作1',
              bringCustNum: '12312',
              spreadCustNum: '****',
              markCustNum: '****',
              integralAllNum: '****'
            },
            {
              PlaceId: 'XXX',
              PlaceName: '栏位2',
              org: '北京分行',
              bringCustNum: '11189',
              spreadCustNum: '****',
              markCustNum: '****',
              integralAllNum: '****'
            },
            {
              PlaceId: 'XXX',
              PlaceName: '栏位3',
              org: '上海分行',
              bringCustNum: '12890',
              spreadCustNum: '****',
              markCustNum: '****',
              integralAllNum: '****'
            },
            {
              PlaceId: 'XXX',
              PlaceName: '栏位4',
              org: '成都分行',
              bringCustNum: '12312',
              spreadCustNum: '****',
              markCustNum: '****',
              integralAllNum: '****'
            }
          ]
        };
      },
      mounted: function () {
        var _this = this;
        _this.$refs.custInfoRef.resetFields();
        yufp.clone(_this.custInfoData1, _this.custInfoData);
      },
      methods: {
        viewFn: function () {
          this.subordinateVis = true;
        },
        activityView: function () {
          this.subordinateVis = false;
          var menuId = 'gm-21000'; // 空白模板的菜单ID
          var routeId = 'activitytemp'; // 空白模板的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: 'menu_' + menuId, // 'menu_'前缀加菜单ID
            title: '活动效果', // 页签名称
            data: {} // 传递的业务数据，可选配置
          });
        }
      }
    });
  };
});