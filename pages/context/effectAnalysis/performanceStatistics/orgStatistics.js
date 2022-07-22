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
          Div: 'iddiv',
          visible: false,
          personPerforVis: false,
          personMarkVis: false,
          personSpreadVis: false,
          subordinateVis: false,
          custInfo: {},
          personInfoData: {},
          custInfoData: {},
          persontableData: [
            {
              recId: '21234',
              alias: 'xxx',
              name: '王xx',
              recType: '员工',
              staffType: '普通员工',
              staffId: '******',
              org: '总行'
            },
            {
              recId: '21234',
              alias: 'xxx',
              name: '王xx',
              recType: '员工',
              staffType: '普通员工',
              staffId: '******',
              org: '总行'
            },
            {
              recId: '21234',
              alias: 'xxx',
              name: '王xx',
              recType: '员工',
              staffType: '普通员工',
              staffId: '******',
              org: '总行'
            },
            {
              recId: '21234',
              alias: 'xxx',
              name: '王xx',
              recType: '员工',
              staffType: '普通员工',
              staffId: '******',
              org: '总行'
            }
          ],
          custInfoData2: {name: '王xx',
            allNum: '5',
            convertibleIntegral: '150',
            markCustNum: '100',
            unconvertiblePoints: '150',
            staffType: '员工',
            recType: '员工',
            spreadCustNum: '200',
            integralNum: '3000'
          },
          custInfoData1: {orgId: '3598',
            orgName: '总行',
            department: '电子银行部',
            launchAllNum: '100',
            joinAllNum: '150',
            recNum: '100',
            bringCustAllNum: '150',
            spreadCustAllNum: '200',
            integralAllNum: '3000',
            markCustAllNum: '100',
            convertibleIntegral: '2000',
            unconvertiblePoints: '1500'
          },
          formdata: {},
          tableData: [
            {
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
              activityPlanId: '1223',
              activityPlanName: '链家合作',
              activityId: '1456',
              activityName: '链家合作1',
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
        activityEffectFn: function () {
          var _this = this;
          this.visible = true;
          var routeId = 'realTimeData';
          _this.$nextTick(function () {
            yufp.router.to(routeId, {data: 'realTimeData'}, _this.Div);
          });
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
        },
        personPerforInfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.yutable4.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.personPerforVis = true;
          _this.$nextTick(function () {
            _this.$refs.personInfoRef.resetFields();
            yufp.clone(_this.custInfoData2, _this.personInfoData);
          });
        }
      }
    });
  };
});