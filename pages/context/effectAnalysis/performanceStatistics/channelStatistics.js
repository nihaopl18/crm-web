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
          custInfoData1: {name: '王xx',
            allNum: '5',
            convertibleIntegral: '150',
            markCustNum: '100',
            unconvertiblePoints: '150',
            staffType: '员工',
            recType: '员工',
            spreadCustNum: '200',
            integralNum: '3000'
          },
          formdata: {},
          tableData: [
            {
              channelNameOne: '链家',
              channelNameTwo: '**',
              channelNameThree: '**',
              channelNameFour: '**',
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
              channelNameOne: '链家',
              channelNameTwo: '**',
              channelNameThree: '**',
              channelNameFour: '**',
              org: '北京分行',
              bringCustNum: '11189',
              spreadCustNum: '****',
              markCustNum: '****',
              integralAllNum: '****'
            },
            {
              channelNameOne: '链家',
              channelNameTwo: '**',
              channelNameThree: '**',
              channelNameFour: '**',
              org: '上海分行',
              bringCustNum: '12890',
              spreadCustNum: '****',
              markCustNum: '****',
              integralAllNum: '****'
            },
            {
              channelNameOne: '链家',
              channelNameTwo: '**',
              channelNameThree: '**',
              channelNameFour: '**',
              org: '成都分行',
              bringCustNum: '12312',
              spreadCustNum: '****',
              markCustNum: '****',
              integralAllNum: '****'
            }
          ]
        };
      },
      methods: {
        personPerforInfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.personPerforVis = true;
          _this.$nextTick(function () {
            _this.$refs.custInfoRef.resetFields();
            yufp.clone(_this.custInfoData1, _this.custInfoData);
          });
        },
        subordinateInfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.subordinateVis = true;
          _this.$nextTick(function () {
            _this.$refs.custInfoRef.resetFields();
            yufp.clone(_this.custInfoData1, _this.custInfoData);
          });
        }
      }
    });
  };
});