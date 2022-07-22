/**
 * Created by wangyin on 2017/11/16.
 * modify by qfk 20180719
 * 1、添加mock.js数据,供顶部三个板块、两个表格使用
 * 2、修改界面版块数量及对应的统计图样式
 */
define([
  'echarts',
  'custom/plugins/yufp.drag.js',
  'custom/widgets/js/YufpEchart.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    var vm = yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          activetab: '',
          active: 0,
          ToDos: [],
          toDoTotal: '',
          Dones: [],
          DonesTotal: '',
          Ends: [],
          EndsTotal: '',
          Notices: [],
          NoticesTotal: '',
          Messages: [],
          MessagesTotal: '',
          value: '',
          type: '',
          custType: '',
          queryAll: '',
          dataUrl: '/api/ocrmfsysusertile/stylelist',
          visible: false,
          height: yufp.frame.size().height - 72 + 'px',
          list: [],
          dragObject: null,
          custAmount: {},
          rankOption: {},
          rankOptionPer: {},
          rankOptionOrg: {},
          assetIndexPer: {},
          assetIndexOrg: {},
          assetIndex: {},
          // 客户指标数
          custNum: '',
          custNumPer: '',
          custNumOrg: '',
          // 资产指标数
          aumTotal: '',
          dpsTotal: '',
          finTotal: '',
          fundTotal: '',
          insuTotal: '',
          goldTotal: '',
          ccdTotal: '',
          loanTotal: '',
          aumTotalPer: '',
          dpsTotalPer: '',
          finTotalPer: '',
          fundTotalPer: '',
          insuTotalPer: '',
          goldTotalPer: '',
          ccdTotalPer: '',
          loanTotalPer: '',
          aumTotalOrg: '',
          dpsTotalOrg: '',
          finTotalOrg: '',
          fundTotalOrg: '',
          insuTotalOrg: '',
          goldTotalOrg: '',
          ccdTotalOrg: '',
          loanTotalOrg: '',
          // 贡献度指标数
          contriTotal: '',
          midContriTotal: '',
          depContriTotal: '',
          loanContriTotal: '',
          contriTotalPer: '',
          midContriTotalPer: '',
          depContriTotalPer: '',
          loanContriTotalPer: '',
          contriTotalOrg: '',
          midContriTotalOrg: '',
          depContriTotalOrg: '',
          loanContriTotalOrg: '',
          contriIndex: {},
          contriIndexPer: {},
          contriIndexOrg: {},
          // 客户价值等级
          valueLev1: '',
          valueLev2: '',
          valueLev3: '',
          valueLev4: '',
          valueLev5: '',
          valueLev6: '',
          valueLev7: '',
          valueLev8: '',
          valueLevPer1: '',
          valueLevPer2: '',
          valueLevPer3: '',
          valueLevPer4: '',
          valueLevPer5: '',
          valueLevPer6: '',
          valueLevPer7: '',
          valueLevPer8: '',
          valueLevOrg1: '',
          valueLevOrg2: '',
          valueLevOrg3: '',
          valueLevOrg4: '',
          valueLevOrg5: '',
          valueLevOrg6: '',
          valueLevOrg7: '',
          valueLevOrg8: '',
          valueLevel: {},
          valueLevelPer: {},
          valueLevelOrg: {},
          // 服务等级
          servLevel0: '',
          servLevel1: '',
          servLevel2: '',
          servLevel3: '',
          servLevel4: '',
          servLevel5: '',
          servLevel6: '',
          servLevel7: '',
          servLevelPer0: '',
          servLevelPer1: '',
          servLevelPer2: '',
          servLevelPer3: '',
          servLevelPer4: '',
          servLevelPer5: '',
          servLevelPer6: '',
          servLevelPer7: '',
          servLevelOrg0: '',
          servLevelOrg1: '',
          servLevelOrg2: '',
          servLevelOrg3: '',
          servLevelOrg4: '',
          servLevelOrg5: '',
          servLevelOrg6: '',
          servLevelOrg7: '',
          servLev: {},
          servLevPer: {},
          servLevOrg: {}
        };
      },
      mounted: function () {
        var _this = this;
        _this.type = '1';
        _this.dashboardToDo();
        _this.dashboardDone();
        _this.dashboardEnd();
        _this.queryNoticeInfo();
        _this.queryRemindInfo();
        // 首页图表
        _this.adminDashboard();
        _this.assetIndex = _this.assetIndexPer;
        _this.contriIndex = _this.contriIndexPer;
        _this.valueLevel = _this.valueLevelPer;
        _this.servLev = _this.servLevPer;
        _this.adminRankPer();
        _this.adminRankOrg();
        _this.rankOption = _this.rankOptionPer;
        // 查询用户图表权限
        yufp.service.request({
          method: 'GET',
          url: '/api/ocrmfsysusertile/graphlist',
          data: {condition: JSON.stringify({
            userId: yufp.session.userId
          })},
          callback: function (code, message, response) {
            _this.list = response.data;
            _this.setMark();
            _this.$nextTick(function () {
              _this.dragObject = new Drag({}, this);
            });
          }
        });
      },
      methods: {
        rankClick: function (tab, event) {
          var _this = this;
          if (tab.name == 'orgtab') {
            _this.rankOption = _this.rankOptionOrg;
          } else if (tab.name == 'pertab') {
            _this.rankOption = _this.rankOptionPer;
          }
        },
        // 资产指标页签切换
        assetIndexClick: function (tab, event) {
          var _this = this;
          if (tab.name == 'orgtab') {
            _this.assetIndex = _this.assetIndexOrg;
            _this.aumTotal = _this.aumTotalOrg;
            _this.dpsTotal = _this.dpsTotalOrg;
            _this.finTotal = _this.finTotalOrg;
            _this.fundTotal = _this.fundTotalOrg;
            _this.insuTotal = _this.insuTotalOrg;
            _this.goldTotal = _this.goldTotalOrg;
            _this.ccdTotal = _this.ccdTotalOrg;
            _this.loanTotal = _this.loanTotalOrg;
          } else if (tab.name == 'pertab') {
            _this.assetIndex = _this.assetIndexPer;
            _this.aumTotal = _this.aumTotalPer;
            _this.dpsTotal = _this.dpsTotalPer;
            _this.finTotal = _this.finTotalPer;
            _this.fundTotal = _this.fundTotalPer;
            _this.insuTotal = _this.insuTotalPer;
            _this.goldTotal = _this.goldTotalPer;
            _this.ccdTotal = _this.ccdTotalPer;
            _this.loanTotal = _this.loanTotalPer;
          }
        },
        // 贡献度指标页签切换
        contriIndexClick: function (tab, event) {
          var _this = this;
          if (tab.name == 'orgtab') {
            _this.contriIndex = _this.contriIndexOrg;
            _this.contriTotal = _this.contriTotalOrg;
            _this.midContriTotal = _this.midContriTotalOrg;
            _this.depContriTotal = _this.depContriTotalOrg;
            _this.loanContriTotal = _this.loanContriTotalOrg;
          } else if (tab.name == 'pertab') {
            _this.contriIndex = _this.contriIndexPer;
            _this.contriTotal = _this.contriTotalPer;
            _this.midContriTotal = _this.midContriTotalPer;
            _this.depContriTotal = _this.depContriTotalPer;
            _this.loanContriTotal = _this.loanContriTotalPer;
          }
        },
        valueLevelClick: function (tab, event) {
          var _this = this;
          if (tab.name == 'orgtab') {
            _this.valueLevel = _this.valueLevelOrg;
            _this.valueLev1 = _this.valueLevOrg1;
            _this.valueLev2 = _this.valueLevOrg2;
            _this.valueLev3 = _this.valueLevOrg3;
            _this.valueLev4 = _this.valueLevOrg4;
            _this.valueLev5 = _this.valueLevOrg5;
            _this.valueLev6 = _this.valueLevOrg6;
            _this.valueLev7 = _this.valueLevOrg7;
            _this.valueLev8 = _this.valueLevOrg8;
          } else if (tab.name == 'pertab') {
            _this.valueLevel = _this.valueLevelPer;
            _this.valueLev1 = _this.valueLevPer1;
            _this.valueLev2 = _this.valueLevPer2;
            _this.valueLev3 = _this.valueLevPer3;
            _this.valueLev4 = _this.valueLevPer4;
            _this.valueLev5 = _this.valueLevPer5;
            _this.valueLev6 = _this.valueLevPer6;
            _this.valueLev7 = _this.valueLevPer7;
            _this.valueLev8 = _this.valueLevPer8;
          }
        },
        adminRankPer: function () {
          var _this = this;
          var _url = '';
          var roles = yufp.session.roles;
          var a = false;
          var b = false;
          var c = false;
          var d = false;
          for (var i = 0; i < roles.length; i++) {
            if (roles[i].code == '15') {
              // _url = '/api/acrmacmbusisum/rank';
              a = true;
            } else if (roles[i].code == '117') {
              // _url = '/api/acrmacmbusisum/rank2';
              b = true;
            } else if (roles[i].code == '115') {
              // _url = '/api/acrmacmbusisum/rank3';
              c = true;
            } else {
              d = true;
              // _url = '/api/acrmabrbusisum/rank';
            }
          }
          if (d == true) {
            _url = '/api/acrmabrbusisum/rank';
          } else if (b == true) {
            _url = '/api/acrmacmbusisum/rank2';
          } else if (c == true) {
            _url = '/api/acrmacmbusisum/rank3';
          } else if (a == true) {
            _url = '/api/acrmacmbusisum/rank';
          }
          var parm = {condition: JSON.stringify({
            userId: yufp.session.userId,
            orgCode: yufp.session.org.code,
            custType: '1'
          })};
          yufp.service.request({
            method: 'GET',
            url: _url,
            data: parm,
            async: false,
            callback: function (code, message, response) {
              if (code == '0' && _url == '/api/acrmabrbusisum/rank') {
                if (response.data.length > 0) {
                  _this.activetab = 'pertab';
                } else {
                  _this.activetab = 'orgtab';
                };
                var rankorgname = [];
                var rankaumbal = [];
                for (var i = response.data.length - 1; i >= 0; i--) {
                  if (response.data[i].orgName.length > 10) {
                    rankorgname.push(response.data[i].orgName.substring(0, 10) + '...');
                  } else {
                    rankorgname.push(response.data[i].orgName);
                  }
                  if (response.data[i].aumBal == null || response.data[i].aumBal < 100) {
                    rankaumbal.push('0');
                  } else {
                    rankaumbal.push(response.data[i].aumBal);
                  }
                }
                _this.rankOptionPer = {
                  title: {
                    text: 'AUM时点排行榜',
                    textStyle: {
                      fontSize: 15
                    }
                  },
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow'
                    },
                    formatter: function (params) {
                      var relVal = '';
                      relVal = params[0].name + ': ' + _this.toMoney(params[0].value) + '万';
                      return relVal;
                    }
                  },
                  legend: {
                    data: []
                  },
                  grid: {
                    top: '12%',
                    left: '3%',
                    right: '10%',
                    bottom: '10%',
                    containLabel: true
                  },
                  xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLabel: {
                      rotate: 45,
                      formatter: function (value) {
                        return _this.toMoney(value) + '万';
                      }
                    }
                  },
                  yAxis: {
                    type: 'category',
                    data: rankorgname
                  },
                  series: [
                    {
                      name: '',
                      type: 'bar',
                      barWidth: '10',
                      barCategoryGap: '10%',
                      data: rankaumbal
                    }
                  ]
                };
              } else {
                if (response.data.length > 0) {
                  _this.activetab = 'pertab';
                } else {
                  _this.activetab = 'orgtab';
                };
                var rankorgname = [];
                var rankaumbal = [];
                for (var i = response.data.length - 1; i >= 0; i--) {
                  // rankorgname.push(response.data[i].custName);
                  if (response.data[i].custName.length > 10) {
                    rankorgname.push(response.data[i].custName.substring(0, 10) + '...');
                  } else {
                    rankorgname.push(response.data[i].custName);
                  }
                  if (response.data[i].aumBal == null || response.data[i].aumBal < 100) {
                    rankaumbal.push('0');
                  } else {
                    rankaumbal.push(response.data[i].aumBal);
                  }
                }
                _this.rankOptionPer = {
                  title: {
                    text: 'AUM时点排行榜',
                    textStyle: {
                      fontSize: 15
                    }
                  },
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow'
                    },
                    formatter: function (params) {
                      var relVal = '';
                      relVal = params[0].name + ': ' + _this.toMoney(params[0].value) + '万';
                      return relVal;
                    }
                  },
                  legend: {
                    data: []
                  },
                  grid: {
                    top: '12%',
                    left: '3%',
                    right: '10%',
                    bottom: '10%',
                    containLabel: true
                  },
                  xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLabel: {
                      rotate: 45,
                      formatter: function (value) {
                        return _this.toMoney(value) + '万';
                      }
                    }
                  },
                  yAxis: {
                    type: 'category',
                    data: rankorgname
                  },
                  series: [
                    {
                      name: '',
                      type: 'bar',
                      barWidth: '10',
                      barCategoryGap: '10%',
                      data: rankaumbal
                    }
                  ]
                };
              }
            }
          });
        },
        adminRankOrg: function () {
          var _this = this;
          var parm = {condition: JSON.stringify({
            userId: yufp.session.userId,
            orgCode: yufp.session.org.code,
            custType: '2'
          })};
          var _url = '';
          var roles = yufp.session.roles;
          var a = false;
          var b = false;
          var c = false;
          var d = false;
          for (var i = 0; i < roles.length; i++) {
            if (roles[i].code == '15') {
              // _url = '/api/acrmacmbusisum/rank';
              a = true;
            } else if (roles[i].code == '117') {
              // _url = '/api/acrmacmbusisum/rank2';
              b = true;
            } else if (roles[i].code == '115') {
              // _url = '/api/acrmacmbusisum/rank3';
              c = true;
            } else {
              d = true;
              // _url = '/api/acrmabrbusisum/rank';
            }
          }
          if (d == true) {
            _url = '/api/acrmabrbusisum/rank';
          } else if (b == true) {
            _url = '/api/acrmacmbusisum/rank2';
          } else if (c == true) {
            _url = '/api/acrmacmbusisum/rank3';
          } else if (a == true) {
            _url = '/api/acrmacmbusisum/rank';
          }
          // for (var i = 0; i < roles.length; i++) {
          //   if (roles[i].code == '15' || roles[i].code == '115') {
          //     _url = '/api/acrmacmbusisum/rank';
          //   } else if (roles[i].code == '117') {
          //     _url = '/api/acrmacmbusisum/rank2';
          //   } else {
          //     _url = '/api/acrmabrbusisum/rank';
          //   }
          // }
          yufp.service.request({
            method: 'GET',
            url: _url,
            data: parm,
            async: false,
            callback: function (code, message, response) {
              if (code == '0' && _url == '/api/acrmabrbusisum/rank') {
                var rankorgname = [];
                var rankaumbal = [];
                for (var i = response.data.length - 1; i >= 0; i--) {
                  if (response.data[i].orgName.length > 10) {
                    rankorgname.push(response.data[i].orgName.substring(0, 10) + '...');
                  } else {
                    rankorgname.push(response.data[i].orgName);
                  }
                  if (response.data[i].aumBal == null || response.data[i].aumBal < 100) {
                    rankaumbal.push('0');
                  } else {
                    rankaumbal.push(response.data[i].aumBal);
                  }
                }
                _this.rankOptionOrg = {
                  title: {
                    text: 'AUM时点排行榜',
                    textStyle: {
                      fontSize: 15
                    }
                  },
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow'
                    },
                    formatter: function (params) {
                      var relVal = '';
                      relVal = params[0].name + ': ' + _this.toMoney(params[0].value) + '万';
                      return relVal;
                    }
                  },
                  legend: {
                    data: []
                  },
                  grid: {
                    top: '12%',
                    left: '3%',
                    right: '10%',
                    bottom: '0%',
                    containLabel: true
                  },
                  xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLabel: {
                      rotate: 45,
                      formatter: function (value) {
                        // return (value / 10000) + '万';
                        return _this.toMoney(value) + '万';
                      }
                    }
                  },
                  yAxis: {
                    type: 'category',
                    data: rankorgname
                  },
                  series: [
                    {
                      name: '',
                      type: 'bar',
                      barWidth: '10',
                      barCategoryGap: '10%',
                      data: rankaumbal
                    }
                  ]
                };
              } else {
                var rankorgname = [];
                var rankaumbal = [];
                for (var i = response.data.length - 1; i >= 0; i--) {
                  // rankorgname.push(response.data[i].custName);
                  if (response.data[i].custName.length > 10) {
                    rankorgname.push(response.data[i].custName.substring(0, 10) + '...');
                  } else {
                    rankorgname.push(response.data[i].custName);
                  }
                  if (response.data[i].aumBal == null || response.data[i].aumBal < 100) {
                    rankaumbal.push('0');
                  } else {
                    rankaumbal.push(response.data[i].aumBal);
                  }
                }
                _this.rankOptionOrg = {
                  title: {
                    text: 'AUM时点排行榜',
                    textStyle: {
                      fontSize: 15
                    }
                  },
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow'
                    },
                    formatter: function (params) {
                      var relVal = '';
                      relVal = params[0].name + ': ' + _this.toMoney(params[0].value) + '万';
                      return relVal;
                    }
                  },
                  legend: {
                    data: []
                  },
                  grid: {
                    top: '12%',
                    left: '3%',
                    right: '10%',
                    bottom: '10%',
                    containLabel: true
                  },
                  xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLabel: {
                      rotate: 45,
                      formatter: function (value) {
                        //   return (value / 10000) + '万';
                        return _this.toMoney(value) + '万';
                      }
                    }
                  },
                  yAxis: {
                    type: 'category',
                    data: rankorgname
                  },
                  series: [
                    {
                      name: '',
                      type: 'bar',
                      barWidth: '10',
                      barCategoryGap: '10%',
                      data: rankaumbal
                    }
                  ]
                };
              }
            }
          });
        },
        toMoney: function (value) {
          var num = parseInt(value);
          num = num / 10000;
          num = num.toFixed(2);
          num = parseFloat(num);
          num = num.toLocaleString();
          return num.toString();
        },
        toMoney1: function (value) {
          var num = parseInt(value);
          // num = num / 10000;
          num = num.toFixed(2);
          num = parseFloat(num);
          num = num.toLocaleString();
          return num.toString();
        },
        adminDashboard: function () {
          var _this = this;
          var parm = {condition: JSON.stringify({
            userId: yufp.session.userId,
            orgCode: yufp.session.org.code
          })};
          yufp.service.request({
            method: 'GET',
            url: '/api/acrmabrbusisum/list',
            data: parm,
            async: false,
            callback: function (code, message, response) {
              // 客户类型为对公
              if (response.data.length > 1) {
                if (response.data && response.data[0].custType == '2') {
                // 客户总量
                  _this.custNum = (response.data[0].custNum + response.data[1].custNum).toLocaleString();
                  _this.custNumOrg = response.data[0].custNum.toLocaleString();
                  _this.custNumPer = response.data[1].custNum.toLocaleString();
                  _this.aumTotal = response.data[0].custNum;
                  // 资产指标
                  _this.aumTotalPer = response.data[1].aumBal;
                  _this.dpsTotalPer = response.data[1].dpsBal;
                  _this.finTotalPer = response.data[1].finBal;
                  _this.fundTotalPer = response.data[1].fundBal;
                  _this.insuTotalPer = response.data[1].insuBal;
                  _this.goldTotalPer = response.data[1].goldBal;
                  _this.ccdTotalPer = response.data[1].ccdBal;
                  _this.loanTotalPer = response.data[1].loanBal;
                  _this.aumTotalOrg = response.data[0].aumBal;
                  _this.dpsTotalOrg = response.data[0].dpsBal;
                  _this.finTotalOrg = response.data[0].finBal;
                  _this.fundTotalOrg = response.data[0].fundBal;
                  _this.insuTotalOrg = response.data[0].insuBal;
                  _this.goldTotalOrg = response.data[0].goldBal;
                  _this.ccdTotalOrg = response.data[0].ccdBal;
                  _this.loanTotalOrg = response.data[0].loanBal;
                  _this.aumTotal = _this.aumTotalPer;
                  _this.dpsTotal = _this.dpsTotalPer;
                  _this.finTotal = _this.finTotalPer;
                  _this.fundTotal = _this.fundTotalPer;
                  _this.insuTotal = _this.insuTotalPer;
                  _this.goldTotal = _this.goldTotalPer;
                  _this.ccdTotal = _this.ccdTotalPer;
                  _this.loanTotal = _this.loanTotalPer;
                  // 贡献度指标
                  _this.contriTotalPer = response.data[1].mSumContribu;
                  _this.midContriTotalPer = response.data[1].mMidContribu;
                  _this.depContriTotalPer = response.data[1].mDepContribu;
                  _this.loanContriTotalPer = response.data[1].mLoanContribu;
                  _this.contriTotalOrg = response.data[0].mSumContribu;
                  _this.midContriTotalOrg = response.data[0].mMidContribu;
                  _this.depContriTotalOrg = response.data[0].mDepContribu;
                  _this.loanContriTotalOrg = response.data[0].mLoanContribu;
                  _this.contriTotal = _this.contriTotalPer;
                  _this.midContriTotal = _this.midContriTotalPer;
                  _this.depContriTotal = _this.depContriTotalPer;
                  _this.loanContriTotal = _this.loanContriTotalPer;
                  // 客户价值等级
                  _this.valueLevPer1 = '私人银行客户：' + response.data[1].custNumGradeLv0;
                  _this.valueLevPer2 = '准私人银行客户：' + response.data[1].custNumGradeLv1;
                  _this.valueLevPer3 = '财富客户：' + response.data[1].custNumGradeLv2;
                  _this.valueLevPer4 = '价值客户：' + response.data[1].custNumGradeLv3;
                  _this.valueLevPer5 = '金卡客户：' + response.data[1].custNumGradeLv4;
                  _this.valueLevPer6 = '理财客户：' + response.data[1].custNumGradeLv5;
                  _this.valueLevPer7 = '大众客户：' + response.data[1].custNumGradeLv6;
                  _this.valueLevPer8 = '低效客户：' + response.data[1].custNumGradeLv7;
                  _this.valueLevOrg1 = '总行战略级客户：' + response.data[0].custNumGradeLv0;
                  _this.valueLevOrg2 = '总行重点级客户：' + response.data[0].custNumGradeLv1;
                  _this.valueLevOrg3 = '支行战略级客户：' + response.data[0].custNumGradeLv2;
                  _this.valueLevOrg4 = '支行重点级客户：' + response.data[0].custNumGradeLv3;
                  _this.valueLevOrg5 = '潜力级客户：' + response.data[0].custNumGradeLv4;
                  _this.valueLevOrg6 = '普通级客户：' + response.data[0].custNumGradeLv5;
                  _this.valueLevOrg7 = '基础级客户：' + response.data[0].custNumGradeLv6;
                  _this.valueLevOrg8 = '低效级客户：' + response.data[0].custNumGradeLv7;
                  _this.valueLev1 = _this.valueLevPer1;
                  _this.valueLev2 = _this.valueLevPer2;
                  _this.valueLev3 = _this.valueLevPer3;
                  _this.valueLev4 = _this.valueLevPer4;
                  _this.valueLev5 = _this.valueLevPer5;
                  _this.valueLev6 = _this.valueLevPer6;
                  _this.valueLev7 = _this.valueLevPer7;
                  _this.valueLev8 = _this.valueLevPer8;
                  // 客户服务等级
                  _this.servLevelPer0 = response.data[1].custNumServiceLv0;
                  _this.servLevelPer1 = response.data[1].custNumServiceLv1;
                  _this.servLevelPer2 = response.data[1].custNumServiceLv2;
                  _this.servLevelPer3 = response.data[1].custNumServiceLv3;
                  _this.servLevelPer4 = response.data[1].custNumServiceLv4;
                  _this.servLevelPer5 = response.data[1].custNumServiceLv5;
                  _this.servLevelPer6 = response.data[1].custNumServiceLv6;
                  _this.servLevelPer7 = response.data[1].custNumServiceLv7;
                  _this.servLevelOrg0 = response.data[0].custNumServiceLv0;
                  _this.servLevelOrg1 = response.data[0].custNumServiceLv1;
                  _this.servLevelOrg2 = response.data[0].custNumServiceLv2;
                  _this.servLevelOrg3 = response.data[0].custNumServiceLv3;
                  _this.servLevelOrg4 = response.data[0].custNumServiceLv4;
                  _this.servLevelOrg5 = response.data[0].custNumServiceLv5;
                  _this.servLevelOrg6 = response.data[0].custNumServiceLv6;
                  _this.servLevelOrg7 = response.data[0].custNumServiceLv7;
                  _this.servLevel0 = _this.servLevelPer0;
                  _this.servLevel1 = _this.servLevelPer1;
                  _this.servLevel2 = _this.servLevelPer2;
                  _this.servLevel3 = _this.servLevelPer3;
                  _this.servLevel4 = _this.servLevelPer4;
                  _this.servLevel5 = _this.servLevelPer5;
                  _this.servLevel6 = _this.servLevelPer6;
                  _this.servLevel7 = _this.servLevelPer7;
                  _this.custAmount = {
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      left: '10%',
                      top: 5,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 16,
                      itemHeight: 16,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['零售客户量', '对公客户量']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '55%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[0].custNum,
                        name: '对公客户量'
                      },
                      {
                        value: response.data[1].custNum,
                        name: '零售客户量'
                      }
                      ]
                    }]
                  };
                  // 资产指标对公
                  _this.assetIndexOrg = {
                    title: {
                      text: 'AUM时点：' + _this.toMoney(response.data[0].aumBal) + '万元',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万元(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['存款余额', '理财余额', '基金余额', '保险余额', '贵金属余额', '信用卡溢缴款']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '55%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: response.data[0].dpsBal,
                          name: '存款余额'
                        },
                        {
                          value: response.data[0].finBal,
                          name: '理财余额'
                        },
                        {
                          value: response.data[0].fundBal,
                          name: '基金余额'
                        },
                        {
                          value: response.data[0].insuBal,
                          name: '保险余额'
                        },
                        {
                          value: response.data[0].goldBal,
                          name: '贵金属余额'
                        },
                        {
                          value: response.data[0].ccdBal,
                          name: '信用卡溢缴款'
                        }
                      ]
                    }]
                  };
                  // 资产指标零售
                  _this.assetIndexPer = {
                    title: {
                      text: 'AUM时点：' + _this.toMoney(response.data[1].aumBal) + '万元',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万元(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['存款余额', '理财余额', '基金余额', '保险余额', '贵金属余额', '信用卡溢缴款']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: response.data[1].dpsBal,
                          name: '存款余额'
                        },
                        {
                          value: response.data[1].finBal,
                          name: '理财余额'
                        },
                        {
                          value: response.data[1].fundBal,
                          name: '基金余额'
                        },
                        {
                          value: response.data[1].insuBal,
                          name: '保险余额'
                        },
                        {
                          value: response.data[1].goldBal,
                          name: '贵金属余额'
                        },
                        {
                          value: response.data[1].ccdBal,
                          name: '信用卡溢缴款'
                        }
                      ]
                    }]
                  };
                  // 贡献度指标对公
                  _this.contriIndexOrg = {
                    title: {
                      text: '贡献度总值：' + _this.toMoney(response.data[0].mSumContribu) + '万',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['中间业务贡献度', '存款贡献度', '贷款贡献度']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: response.data[0].mDepContribu,
                          name: '存款贡献度'
                        },
                        {
                          value: response.data[0].mLoanContribu,
                          name: '贷款贡献度'
                        },
                        {
                          value: response.data[0].mMidContribu,
                          name: '中间业务贡献度'
                        }
                      ]
                    }]
                  };
                  // 贡献度指标零售
                  _this.contriIndexPer = {
                    title: {
                      text: '贡献度总值：' + _this.toMoney(response.data[1].mSumContribu) + '万',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['中间业务贡献度', '存款贡献度', '贷款贡献度']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: response.data[1].mDepContribu,
                          name: '存款贡献度'
                        },
                        {
                          value: response.data[1].mLoanContribu,
                          name: '贷款贡献度'
                        },
                        {
                          value: response.data[1].mMidContribu,
                          name: '中间业务贡献度'
                        }
                      ]
                    }]
                  };
                  // 客户价值等级对公
                  _this.valueLevelOrg = {
                    title: {
                      text: '客户价值等级分布',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney1(params.value) + '户(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['总行战略级', '总行重点级', '支行战略级', '支行重点级', '潜力级', '普通级', '低效级']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[0].custNumGradeLv7,
                        name: '总行战略级'
                      },
                      {
                        value: response.data[0].custNumGradeLv6,
                        name: '总行重点级'
                      },
                      {
                        value: response.data[0].custNumGradeLv5,
                        name: '支行战略级'
                      },
                      {
                        value: response.data[0].custNumGradeLv4,
                        name: '支行重点级'
                      },
                      {
                        value: response.data[0].custNumGradeLv3,
                        name: '潜力级'
                      },
                      {
                        value: response.data[0].custNumGradeLv2,
                        name: '普通级'
                      },
                      {
                        value: response.data[0].custNumGradeLv1,
                        name: '基础级'
                      },
                      {
                        value: response.data[0].custNumGradeLv0,
                        name: '低效级'
                      }
                      ]
                    }]
                  };
                  // 客户价值等级零售
                  _this.valueLevelPer = {
                    title: {
                      text: '客户价值等级分布',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney1(params.value) + '户(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['私行', '准私行', '财富', '价值', '金卡', '理财', '大众', '低效']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[1].custNumGradeLv7,
                        name: '私行'
                      },
                      {
                        value: response.data[1].custNumGradeLv6,
                        name: '准私行'
                      },
                      {
                        value: response.data[1].custNumGradeLv5,
                        name: '财富'
                      },
                      {
                        value: response.data[1].custNumGradeLv4,
                        name: '价值'
                      },
                      {
                        value: response.data[1].custNumGradeLv3,
                        name: '金卡'
                      },
                      {
                        value: response.data[1].custNumGradeLv2,
                        name: '理财'
                      },
                      {
                        value: response.data[1].custNumGradeLv1,
                        name: '大众'
                      },
                      {
                        value: response.data[1].custNumGradeLv0,
                        name: '低效'
                      }
                      ]
                    }]
                  };
                  // 客户服务等级对公
                  _this.servLevOrg = {
                    title: {
                      text: '客户服务等级分布',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney1(params.value) + '户(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['7星', '6星', '5星', '4星', '3星', '2星', '1星', '0星']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[0].custNumServiceLv7,
                        name: '7星'
                      },
                      {
                        value: response.data[0].custNumServiceLv6,
                        name: '6星'
                      },
                      {
                        value: response.data[0].custNumServiceLv5,
                        name: '5星'
                      },
                      {
                        value: response.data[0].custNumServiceLv4,
                        name: '4星'
                      },
                      {
                        value: response.data[0].custNumServiceLv3,
                        name: '3星'
                      },
                      {
                        value: response.data[0].custNumServiceLv2,
                        name: '2星'
                      },
                      {
                        value: response.data[0].custNumServiceLv1,
                        name: '1星'
                      },
                      {
                        value: response.data[0].custNumServiceLv0,
                        name: '0星'
                      }
                      ]
                    }]
                  };
                  // 客户服务等级个人
                  _this.servLevPer = {
                    title: {
                      text: '客户服务等级分布',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney1(params.value) + '户(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['7星', '6星', '5星', '4星', '3星', '2星', '1星', '0星']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[1].custNumServiceLv7,
                        name: '7星'
                      },
                      {
                        value: response.data[1].custNumServiceLv6,
                        name: '6星'
                      },
                      {
                        value: response.data[1].custNumServiceLv5,
                        name: '5星'
                      },
                      {
                        value: response.data[1].custNumServiceLv4,
                        name: '4星'
                      },
                      {
                        value: response.data[1].custNumServiceLv3,
                        name: '3星'
                      },
                      {
                        value: response.data[1].custNumServiceLv2,
                        name: '2星'
                      },
                      {
                        value: response.data[1].custNumServiceLv1,
                        name: '1星'
                      },
                      {
                        value: response.data[0].custNumServiceLv0,
                        name: '0星'
                      }
                      ]
                    }]
                  };
                } else if (response.data[1].custType == '2') {
                // 客户总量
                  _this.custNum = (response.data[0].custNum + response.data[1].custNum).toLocaleString();
                  _this.custNumOrg = response.data[1].custNum.toLocaleString();
                  _this.custNumPer = response.data[0].custNum.toLocaleString();
                  // 资产指标
                  _this.aumTotalPer = response.data[0].aumBal;
                  _this.dpsTotalPer = response.data[0].dpsBal;
                  _this.finTotalPer = response.data[0].finBal;
                  _this.fundTotalPer = response.data[0].fundBal;
                  _this.insuTotalPer = response.data[0].insuBal;
                  _this.goldTotalPer = response.data[0].goldBal;
                  _this.ccdTotalPer = response.data[0].ccdBal;
                  _this.loanTotalPer = response.data[0].loanBal;
                  _this.aumTotalOrg = response.data[1].aumBal;
                  _this.dpsTotalOrg = response.data[1].dpsBal;
                  _this.finTotalOrg = response.data[1].finBal;
                  _this.fundTotalOrg = response.data[1].fundBal;
                  _this.insuTotalOrg = response.data[1].insuBal;
                  _this.goldTotalOrg = response.data[1].goldBal;
                  _this.ccdTotalOrg = response.data[1].ccdBal;
                  _this.loanTotalOrg = response.data[1].loanBal;
                  _this.aumTotal = _this.aumTotalPer;
                  _this.dpsTotal = _this.dpsTotalPer;
                  _this.finTotal = _this.finTotalPer;
                  _this.fundTotal = _this.fundTotalPer;
                  _this.insuTotal = _this.insuTotalPer;
                  _this.goldTotal = _this.goldTotalPer;
                  _this.ccdTotal = _this.ccdTotalPer;
                  _this.loanTotal = _this.loanTotalPer;
                  // 贡献度指标
                  _this.contriTotalPer = response.data[0].mSumContribu;
                  _this.midContriTotalPer = response.data[0].mMidContribu;
                  _this.depContriTotalPer = response.data[0].mDepContribu;
                  _this.loanContriTotalPer = response.data[0].mLoanContribu;
                  _this.contriTotalOrg = response.data[1].mSumContribu;
                  _this.midContriTotalOrg = response.data[1].mMidContribu;
                  _this.depContriTotalOrg = response.data[1].mDepContribu;
                  _this.loanContriTotalOrg = response.data[1].mLoanContribu;
                  _this.contriTotal = _this.contriTotalPer;
                  _this.midContriTotal = _this.midContriTotalPer;
                  _this.depContriTotal = _this.depContriTotalPer;
                  _this.loanContriTotal = _this.loanContriTotalPer;
                  // 客户价值等级
                  _this.valueLevPer1 = '私人银行客户：' + response.data[0].custNumGradeLv0;
                  _this.valueLevPer2 = '准私人银行客户：' + response.data[0].custNumGradeLv1;
                  _this.valueLevPer3 = '财富客户：' + response.data[0].custNumGradeLv2;
                  _this.valueLevPer4 = '价值客户：' + response.data[0].custNumGradeLv3;
                  _this.valueLevPer5 = '金卡客户：' + response.data[0].custNumGradeLv4;
                  _this.valueLevPer6 = '理财客户：' + response.data[0].custNumGradeLv5;
                  _this.valueLevPer7 = '大众客户：' + response.data[0].custNumGradeLv6;
                  _this.valueLevPer8 = '低效客户：' + response.data[0].custNumGradeLv7;
                  _this.valueLevOrg1 = '总行战略级客户：' + response.data[1].custNumGradeLv0;
                  _this.valueLevOrg2 = '总行重点级客户：' + response.data[1].custNumGradeLv1;
                  _this.valueLevOrg3 = '支行战略级客户：' + response.data[1].custNumGradeLv2;
                  _this.valueLevOrg4 = '支行重点级客户：' + response.data[1].custNumGradeLv3;
                  _this.valueLevOrg5 = '潜力级客户：' + response.data[1].custNumGradeLv4;
                  _this.valueLevOrg6 = '普通级客户：' + response.data[1].custNumGradeLv5;
                  _this.valueLevOrg7 = '基础级客户：' + response.data[1].custNumGradeLv6;
                  _this.valueLevOrg8 = '低效级客户：' + response.data[1].custNumGradeLv7;
                  _this.valueLev1 = _this.valueLevPer1;
                  _this.valueLev2 = _this.valueLevPer2;
                  _this.valueLev3 = _this.valueLevPer3;
                  _this.valueLev4 = _this.valueLevPer4;
                  _this.valueLev5 = _this.valueLevPer5;
                  _this.valueLev6 = _this.valueLevPer6;
                  _this.valueLev7 = _this.valueLevPer7;
                  _this.valueLev8 = _this.valueLevPer8;
                  // 客户服务等级
                  _this.servLevelPer0 = response.data[0].custNumServiceLv0;
                  _this.servLevelPer1 = response.data[0].custNumServiceLv1;
                  _this.servLevelPer2 = response.data[0].custNumServiceLv2;
                  _this.servLevelPer3 = response.data[0].custNumServiceLv3;
                  _this.servLevelPer4 = response.data[0].custNumServiceLv4;
                  _this.servLevelPer5 = response.data[0].custNumServiceLv5;
                  _this.servLevelPer6 = response.data[0].custNumServiceLv6;
                  _this.servLevelPer7 = response.data[0].custNumServiceLv7;
                  _this.servLevelOrg0 = response.data[1].custNumServiceLv0;
                  _this.servLevelOrg1 = response.data[1].custNumServiceLv1;
                  _this.servLevelOrg2 = response.data[1].custNumServiceLv2;
                  _this.servLevelOrg3 = response.data[1].custNumServiceLv3;
                  _this.servLevelOrg4 = response.data[1].custNumServiceLv4;
                  _this.servLevelOrg5 = response.data[1].custNumServiceLv5;
                  _this.servLevelOrg6 = response.data[1].custNumServiceLv6;
                  _this.servLevelOrg7 = response.data[1].custNumServiceLv7;
                  _this.servLevel0 = _this.servLevelPer0;
                  _this.servLevel1 = _this.servLevelPer1;
                  _this.servLevel2 = _this.servLevelPer2;
                  _this.servLevel3 = _this.servLevelPer3;
                  _this.servLevel4 = _this.servLevelPer4;
                  _this.servLevel5 = _this.servLevelPer5;
                  _this.servLevel6 = _this.servLevelPer6;
                  _this.servLevel7 = _this.servLevelPer7;
                  _this.custAmount = {
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      left: '10%',
                      top: 5,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 16,
                      itemHeight: 16,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['零售客户量', '对公客户量']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '55%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[1].custNum,
                        name: '对公客户量'
                      },
                      {
                        value: response.data[0].custNum,
                        name: '零售客户量'
                      }
                      ]
                    }]
                  };
                  // 资产指标对公
                  _this.assetIndexOrg = {
                    title: {
                      text: 'AUM时点：' + _this.toMoney(response.data[1].aumBal) + '万元',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      // formatter: '{a} <br/>{b}: {c} ({d}%)',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万元(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['存款余额', '理财余额', '基金余额', '保险余额', '贵金属余额', '信用卡溢缴款']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: response.data[1].dpsBal,
                          name: '存款余额'
                        },
                        {
                          value: response.data[1].finBal,
                          name: '理财余额'
                        },
                        {
                          value: response.data[1].fundBal,
                          name: '基金余额'
                        },
                        {
                          value: response.data[1].insuBal,
                          name: '保险余额'
                        },
                        {
                          value: response.data[1].goldBal,
                          name: '贵金属余额'
                        },
                        {
                          value: response.data[1].ccdBal,
                          name: '信用卡溢缴款'
                        }
                      ]
                    }]
                  };
                  // 资产指标零售
                  _this.assetIndexPer = {
                    title: {
                      text: 'AUM时点：' + _this.toMoney(response.data[0].aumBal) + '万元',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万元(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['存款余额', '理财余额', '基金余额', '保险余额', '贵金属余额', '信用卡溢缴款']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[0].dpsBal,
                        name: '存款余额'
                      },
                      {
                        value: response.data[0].finBal,
                        name: '理财余额'
                      },
                      {
                        value: response.data[0].fundBal,
                        name: '基金余额'
                      },
                      {
                        value: response.data[0].insuBal,
                        name: '保险余额'
                      },
                      {
                        value: response.data[0].goldBal,
                        name: '贵金属余额'
                      },
                      {
                        value: response.data[0].ccdBal,
                        name: '信用卡溢缴款'
                      }
                      ]
                    }]
                  };
                  // 贡献度指标对公
                  _this.contriIndexOrg = {
                    title: {
                      text: '贡献度总值：' + _this.toMoney(response.data[1].mSumContribu) + '万',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['中间业务贡献度', '存款贡献度', '贷款贡献度']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: response.data[1].mDepContribu,
                          name: '存款贡献度'
                        },
                        {
                          value: response.data[1].mLoanContribu,
                          name: '贷款贡献度'
                        },
                        {
                          value: response.data[1].mMidContribu,
                          name: '中间业务贡献度'
                        }
                      ]
                    }]
                  };
                  // 贡献度指标零售
                  _this.contriIndexPer = {
                    title: {
                      text: '贡献度总值：' + _this.toMoney(response.data[0].mSumContribu) + '万',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['中间业务贡献度', '存款贡献度', '贷款贡献度']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: response.data[0].mDepContribu,
                          name: '存款贡献度'
                        },
                        {
                          value: response.data[0].mLoanContribu,
                          name: '贷款贡献度'
                        },
                        {
                          value: response.data[0].mMidContribu,
                          name: '中间业务贡献度'
                        }
                      ]
                    }]
                  };
                  // 客户价值等级对公
                  _this.valueLevelOrg = {
                    title: {
                      text: '客户价值等级分布',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney1(params.value) + '户(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['总行战略级', '总行重点级', '支行战略级', '支行重点级', '潜力级', '普通级', '低效级']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[1].custNumGradeLv7,
                        name: '总行战略级'
                      },
                      {
                        value: response.data[1].custNumGradeLv6,
                        name: '总行重点级'
                      },
                      {
                        value: response.data[1].custNumGradeLv5,
                        name: '支行战略级'
                      },
                      {
                        value: response.data[1].custNumGradeLv4,
                        name: '支行重点级'
                      },
                      {
                        value: response.data[1].custNumGradeLv3,
                        name: '潜力级'
                      },
                      {
                        value: response.data[1].custNumGradeLv2,
                        name: '普通级'
                      },
                      {
                        value: response.data[1].custNumGradeLv1,
                        name: '基础级'
                      },
                      {
                        value: response.data[1].custNumGradeLv0,
                        name: '低效级'
                      }
                      ]
                    }]
                  };
                  // 客户价值等级零售
                  _this.valueLevelPer = {
                    title: {
                      text: '客户价值等级分布',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney1(params.value) + '户(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['私行', '准私行', '财富', '价值', '金卡', '理财', '大众', '低效']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[0].custNumGradeLv7,
                        name: '私行'
                      },
                      {
                        value: response.data[0].custNumGradeLv6,
                        name: '准私行'
                      },
                      {
                        value: response.data[0].custNumGradeLv5,
                        name: '财富'
                      },
                      {
                        value: response.data[0].custNumGradeLv4,
                        name: '价值'
                      },
                      {
                        value: response.data[0].custNumGradeLv3,
                        name: '金卡'
                      },
                      {
                        value: response.data[0].custNumGradeLv2,
                        name: '理财'
                      },
                      {
                        value: response.data[0].custNumGradeLv1,
                        name: '大众'
                      },
                      {
                        value: response.data[0].custNumGradeLv0,
                        name: '低效'
                      }
                      ]
                    }]
                  };
                  // 客户服务等级对公
                  _this.servLevOrg = {
                    title: {
                      text: '客户服务等级分布',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney1(params.value) + '户(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['7星', '6星', '5星', '4星', '3星', '2星', '1星', '0星']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[1].custNumServiceLv7,
                        name: '7星'
                      },
                      {
                        value: response.data[1].custNumServiceLv6,
                        name: '6星'
                      },
                      {
                        value: response.data[1].custNumServiceLv5,
                        name: '5星'
                      },
                      {
                        value: response.data[1].custNumServiceLv4,
                        name: '4星'
                      },
                      {
                        value: response.data[1].custNumServiceLv3,
                        name: '3星'
                      },
                      {
                        value: response.data[1].custNumServiceLv2,
                        name: '2星'
                      },
                      {
                        value: response.data[1].custNumServiceLv1,
                        name: '1星'
                      },
                      {
                        value: response.data[1].custNumServiceLv0,
                        name: '0星'
                      }
                      ]
                    }]
                  };
                  // 客户服务等级个人
                  _this.servLevPer = {
                    title: {
                      text: '客户服务等级分布',
                      textStyle: {
                        fontSize: 15
                      }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney1(params.value) + '户(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['7星', '6星', '5星', '4星', '3星', '2星', '1星', '0星']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[0].custNumServiceLv7,
                        name: '7星'
                      },
                      {
                        value: response.data[0].custNumServiceLv6,
                        name: '6星'
                      },
                      {
                        value: response.data[0].custNumServiceLv5,
                        name: '5星'
                      },
                      {
                        value: response.data[0].custNumServiceLv4,
                        name: '4星'
                      },
                      {
                        value: response.data[0].custNumServiceLv3,
                        name: '3星'
                      },
                      {
                        value: response.data[0].custNumServiceLv2,
                        name: '2星'
                      },
                      {
                        value: response.data[0].custNumServiceLv1,
                        name: '1星'
                      },
                      {
                        value: response.data[1].custNumServiceLv0,
                        name: '0星'
                      }
                      ]
                    }]
                  };
                }
              } else if (response.data.length < 2) {
                if (response.data[0].custType == '2') {
                  // 客户总量
                  _this.custNum = (response.data[0].custNum + response.data[1].custNum).toLocaleString();
                  _this.custNumOrg = response.data[0].custNum.toLocaleString();
                  _this.custNumPer = '0';
                  _this.aumTotal = response.data[0].custNum.toLocaleString();
                  // 资产指标
                  _this.aumTotalPer = '0';
                  _this.dpsTotalPer = '0';
                  _this.finTotalPer = '0';
                  _this.fundTotalPer = '0';
                  _this.insuTotalPer = '0';
                  _this.goldTotalPer = '0';
                  _this.ccdTotalPer = '0';
                  _this.loanTotalPer = '0';
                  _this.aumTotalOrg = response.data[0].aumBal;
                  _this.dpsTotalOrg = response.data[0].dpsBal;
                  _this.finTotalOrg = response.data[0].finBal;
                  _this.fundTotalOrg = response.data[0].fundBal;
                  _this.insuTotalOrg = response.data[0].insuBal;
                  _this.goldTotalOrg = response.data[0].goldBal;
                  _this.ccdTotalOrg = response.data[0].ccdBal;
                  _this.loanTotalOrg = response.data[0].loanBal;
                  _this.aumTotal = _this.aumTotalPer;
                  _this.dpsTotal = _this.dpsTotalPer;
                  _this.finTotal = _this.finTotalPer;
                  _this.fundTotal = _this.fundTotalPer;
                  _this.insuTotal = _this.insuTotalPer;
                  _this.goldTotal = _this.goldTotalPer;
                  _this.ccdTotal = _this.ccdTotalPer;
                  _this.loanTotal = _this.loanTotalPer;
                  // 贡献度指标
                  _this.contriTotalPer = '0';
                  _this.midContriTotalPer = '0';
                  _this.depContriTotalPer = '0';
                  _this.loanContriTotalPer = '0';
                  _this.contriTotalOrg = response.data[0].mSumContribu;
                  _this.midContriTotalOrg = response.data[0].mMidContribu;
                  _this.depContriTotalOrg = response.data[0].mDepContribu;
                  _this.loanContriTotalOrg = response.data[0].mLoanContribu;
                  _this.contriTotal = _this.contriTotalPer;
                  _this.midContriTotal = _this.midContriTotalPer;
                  _this.depContriTotal = _this.depContriTotalPer;
                  _this.loanContriTotal = _this.loanContriTotalPer;
                  // 客户价值等级
                  _this.valueLevPer1 = '私人银行客户：' + '0';
                  _this.valueLevPer2 = '准私人银行客户：' + '0';
                  _this.valueLevPer3 = '财富客户：' + '0';
                  _this.valueLevPer4 = '价值客户：' + '0';
                  _this.valueLevPer5 = '金卡客户：' + '0';
                  _this.valueLevPer6 = '理财客户：' + '0';
                  _this.valueLevPer7 = '大众客户：' + '0';
                  _this.valueLevPer8 = '低效客户：' + '0';
                  _this.valueLevOrg1 = '总行战略级客户：' + response.data[0].custNumGradeLv0;
                  _this.valueLevOrg2 = '总行重点级客户：' + response.data[0].custNumGradeLv1;
                  _this.valueLevOrg3 = '支行战略级客户：' + response.data[0].custNumGradeLv2;
                  _this.valueLevOrg4 = '支行重点级客户：' + response.data[0].custNumGradeLv3;
                  _this.valueLevOrg5 = '潜力级客户：' + response.data[0].custNumGradeLv4;
                  _this.valueLevOrg6 = '普通级客户：' + response.data[0].custNumGradeLv5;
                  _this.valueLevOrg7 = '基础级客户：' + response.data[0].custNumGradeLv6;
                  _this.valueLevOrg8 = '低效级客户：' + response.data[0].custNumGradeLv7;
                  _this.valueLev1 = _this.valueLevPer1;
                  _this.valueLev2 = _this.valueLevPer2;
                  _this.valueLev3 = _this.valueLevPer3;
                  _this.valueLev4 = _this.valueLevPer4;
                  _this.valueLev5 = _this.valueLevPer5;
                  _this.valueLev6 = _this.valueLevPer6;
                  _this.valueLev7 = _this.valueLevPer7;
                  _this.valueLev8 = _this.valueLevPer8;
                  // 客户服务等级
                  _this.servLevelPer0 = '0';
                  _this.servLevelPer1 = '0';
                  _this.servLevelPer2 = '0';
                  _this.servLevelPer3 = '0';
                  _this.servLevelPer4 = '0';
                  _this.servLevelPer5 = '0';
                  _this.servLevelPer6 = '0';
                  _this.servLevelPer7 = '0';
                  _this.servLevelOrg0 = response.data[0].custNumServiceLv0;
                  _this.servLevelOrg1 = response.data[0].custNumServiceLv1;
                  _this.servLevelOrg2 = response.data[0].custNumServiceLv2;
                  _this.servLevelOrg3 = response.data[0].custNumServiceLv3;
                  _this.servLevelOrg4 = response.data[0].custNumServiceLv4;
                  _this.servLevelOrg5 = response.data[0].custNumServiceLv5;
                  _this.servLevelOrg6 = response.data[0].custNumServiceLv6;
                  _this.servLevelOrg7 = response.data[0].custNumServiceLv7;
                  _this.servLevel0 = _this.servLevelPer0;
                  _this.servLevel1 = _this.servLevelPer1;
                  _this.servLevel2 = _this.servLevelPer2;
                  _this.servLevel3 = _this.servLevelPer3;
                  _this.servLevel4 = _this.servLevelPer4;
                  _this.servLevel5 = _this.servLevelPer5;
                  _this.servLevel6 = _this.servLevelPer6;
                  _this.servLevel7 = _this.servLevelPer7;
                  _this.custAmount = {
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      left: '10%',
                      top: 5,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 16,
                      itemHeight: 16,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['零售客户量', '对公客户量']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '55%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[0].custNum,
                        name: '对公客户量'
                      },
                      {
                        value: '0',
                        name: '零售客户量'
                      }
                      ]
                    }]
                  };
                  // 资产指标对公
                  _this.assetIndexOrg = {
                    title: {
                      text: 'AUM时点：' + _this.toMoney(response.data[0].aumBal) + '万元'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万元(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['存款余额', '理财余额', '基金余额', '保险余额', '贵金属余额', '信用卡溢缴款']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '55%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: response.data[0].dpsBal,
                          name: '存款余额'
                        },
                        {
                          value: response.data[0].finBal,
                          name: '理财余额'
                        },
                        {
                          value: response.data[0].fundBal,
                          name: '基金余额'
                        },
                        {
                          value: response.data[0].insuBal,
                          name: '保险余额'
                        },
                        {
                          value: response.data[0].goldBal,
                          name: '贵金属余额'
                        },
                        {
                          value: response.data[0].ccdBal,
                          name: '信用卡溢缴款'
                        }
                      ]
                    }]
                  };
                  // 资产指标零售
                  _this.assetIndexPer = {
                    title: {
                      text: 'AUM时点：' + _this.toMoney(response.data[1].aumBal) + '万元'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万元(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['存款余额', '理财余额', '基金余额', '保险余额', '贵金属余额', '信用卡溢缴款']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: '0',
                          name: '存款余额'
                        },
                        {
                          value: '0',
                          name: '理财余额'
                        },
                        {
                          value: '0',
                          name: '基金余额'
                        },
                        {
                          value: '0',
                          name: '保险余额'
                        },
                        {
                          value: '0',
                          name: '贵金属余额'
                        },
                        {
                          value: '0',
                          name: '信用卡溢缴款'
                        }
                      ]
                    }]
                  };
                  // 贡献度指标对公
                  _this.contriIndexOrg = {
                    title: {
                      text: '贡献度总值：' + _this.toMoney(response.data[0].mSumContribu) + '万'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['中间业务贡献度', '存款贡献度', '贷款贡献度']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: response.data[0].mDepContribu,
                          name: '存款贡献度'
                        },
                        {
                          value: response.data[0].mLoanContribu,
                          name: '贷款贡献度'
                        },
                        {
                          value: response.data[0].mMidContribu,
                          name: '中间业务贡献度'
                        }
                      ]
                    }]
                  };
                  // 贡献度指标零售
                  _this.contriIndexPer = {
                    title: {
                      text: '贡献度总值：' + '0万'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['中间业务贡献度', '存款贡献度', '贷款贡献度']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: '0',
                          name: '存款贡献度'
                        },
                        {
                          value: '0',
                          name: '贷款贡献度'
                        },
                        {
                          value: '0',
                          name: '中间业务贡献度'
                        }
                      ]
                    }]
                  };
                  // 客户价值等级对公
                  _this.valueLevelOrg = {
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['总行战略级', '总行重点级', '支行战略级', '支行重点级', '潜力级', '普通级', '低效级']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[0].custNumGradeLv7,
                        name: '总行战略级'
                      },
                      {
                        value: response.data[0].custNumGradeLv6,
                        name: '总行重点级'
                      },
                      {
                        value: response.data[0].custNumGradeLv5,
                        name: '支行战略级'
                      },
                      {
                        value: response.data[0].custNumGradeLv4,
                        name: '支行重点级'
                      },
                      {
                        value: response.data[0].custNumGradeLv3,
                        name: '潜力级'
                      },
                      {
                        value: response.data[0].custNumGradeLv2,
                        name: '普通级'
                      },
                      {
                        value: response.data[0].custNumGradeLv1,
                        name: '基础级'
                      },
                      {
                        value: response.data[0].custNumGradeLv0,
                        name: '低效级'
                      }
                      ]
                    }]
                  };
                  // 客户价值等级零售
                  _this.valueLevelPer = {
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['私行', '准私行', '财富', '价值', '金卡', '理财', '大众', '低效']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: '0',
                        name: '私行'
                      },
                      {
                        value: '0',
                        name: '准私行'
                      },
                      {
                        value: '0',
                        name: '财富'
                      },
                      {
                        value: '0',
                        name: '价值'
                      },
                      {
                        value: '0',
                        name: '金卡'
                      },
                      {
                        value: '0',
                        name: '理财'
                      },
                      {
                        value: '0',
                        name: '大众'
                      },
                      {
                        value: '0',
                        name: '低效'
                      }
                      ]
                    }]
                  };
                  // 客户服务等级对公
                  _this.servLevOrg = {
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['7星', '6星', '5星', '4星', '3星', '2星', '1星', '0星']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[0].custNumServiceLv7,
                        name: '7星'
                      },
                      {
                        value: response.data[0].custNumServiceLv6,
                        name: '6星'
                      },
                      {
                        value: response.data[0].custNumServiceLv5,
                        name: '5星'
                      },
                      {
                        value: response.data[0].custNumServiceLv4,
                        name: '4星'
                      },
                      {
                        value: response.data[0].custNumServiceLv3,
                        name: '3星'
                      },
                      {
                        value: response.data[0].custNumServiceLv2,
                        name: '2星'
                      },
                      {
                        value: response.data[0].custNumServiceLv1,
                        name: '1星'
                      },
                      {
                        value: response.data[0].custNumServiceLv0,
                        name: '0星'
                      }
                      ]
                    }]
                  };
                  // 客户服务等级个人
                  _this.servLevPer = {
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['7星', '6星', '5星', '4星', '3星', '2星', '1星', '0星']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: '0',
                        name: '7星'
                      },
                      {
                        value: '0',
                        name: '6星'
                      },
                      {
                        value: '0',
                        name: '5星'
                      },
                      {
                        value: '0',
                        name: '4星'
                      },
                      {
                        value: '0',
                        name: '3星'
                      },
                      {
                        value: '0',
                        name: '2星'
                      },
                      {
                        value: '0',
                        name: '1星'
                      },
                      {
                        value: '0',
                        name: '0星'
                      }
                      ]
                    }]
                  };
                } else if (response.data[0].custType == '1') {
                  // 客户总量
                  _this.custNum = (response.data[0].custNum + response.data[0].custNum).toLocaleString();
                  _this.custNumOrg = '0';
                  _this.custNumPer = response.data[0].custNum.toLocaleString();
                  // 资产指标
                  _this.aumTotalPer = response.data[0].aumBal;
                  _this.dpsTotalPer = response.data[0].dpsBal;
                  _this.finTotalPer = response.data[0].finBal;
                  _this.fundTotalPer = response.data[0].fundBal;
                  _this.insuTotalPer = response.data[0].insuBal;
                  _this.goldTotalPer = response.data[0].goldBal;
                  _this.ccdTotalPer = response.data[0].ccdBal;
                  _this.loanTotalPer = response.data[0].loanBal;
                  _this.aumTotalOrg = '0';
                  _this.dpsTotalOrg = '0';
                  _this.finTotalOrg = '0';
                  _this.fundTotalOrg = '0';
                  _this.insuTotalOrg = '0';
                  _this.goldTotalOrg = '0';
                  _this.ccdTotalOrg = '0';
                  _this.loanTotalOrg = '0';
                  _this.aumTotal = _this.aumTotalPer;
                  _this.dpsTotal = _this.dpsTotalPer;
                  _this.finTotal = _this.finTotalPer;
                  _this.fundTotal = _this.fundTotalPer;
                  _this.insuTotal = _this.insuTotalPer;
                  _this.goldTotal = _this.goldTotalPer;
                  _this.ccdTotal = _this.ccdTotalPer;
                  _this.loanTotal = _this.loanTotalPer;
                  // 贡献度指标
                  _this.contriTotalPer = response.data[0].mSumContribu;
                  _this.midContriTotalPer = response.data[0].mMidContribu;
                  _this.depContriTotalPer = response.data[0].mDepContribu;
                  _this.loanContriTotalPer = response.data[0].mLoanContribu;
                  _this.contriTotalOrg = '0';
                  _this.midContriTotalOrg = '0';
                  _this.depContriTotalOrg = '0';
                  _this.loanContriTotalOrg = '0';
                  _this.contriTotal = _this.contriTotalPer;
                  _this.midContriTotal = _this.midContriTotalPer;
                  _this.depContriTotal = _this.depContriTotalPer;
                  _this.loanContriTotal = _this.loanContriTotalPer;
                  // 客户价值等级
                  _this.valueLevPer1 = '私人银行客户：' + response.data[0].custNumGradeLv0;
                  _this.valueLevPer2 = '准私人银行客户：' + response.data[0].custNumGradeLv1;
                  _this.valueLevPer3 = '财富客户：' + response.data[0].custNumGradeLv2;
                  _this.valueLevPer4 = '价值客户：' + response.data[0].custNumGradeLv3;
                  _this.valueLevPer5 = '金卡客户：' + response.data[0].custNumGradeLv4;
                  _this.valueLevPer6 = '理财客户：' + response.data[0].custNumGradeLv5;
                  _this.valueLevPer7 = '大众客户：' + response.data[0].custNumGradeLv6;
                  _this.valueLevPer8 = '低效客户：' + response.data[0].custNumGradeLv7;
                  _this.valueLevOrg1 = '总行战略级客户：' + '0';
                  _this.valueLevOrg2 = '总行重点级客户：' + '0';
                  _this.valueLevOrg3 = '支行战略级客户：' + '0';
                  _this.valueLevOrg4 = '支行重点级客户：' + '0';
                  _this.valueLevOrg5 = '潜力级客户：' + '0';
                  _this.valueLevOrg6 = '普通级客户：' + '0';
                  _this.valueLevOrg7 = '基础级客户：' + '0';
                  _this.valueLevOrg8 = '低效级客户：' + '0';
                  _this.valueLev1 = _this.valueLevPer1;
                  _this.valueLev2 = _this.valueLevPer2;
                  _this.valueLev3 = _this.valueLevPer3;
                  _this.valueLev4 = _this.valueLevPer4;
                  _this.valueLev5 = _this.valueLevPer5;
                  _this.valueLev6 = _this.valueLevPer6;
                  _this.valueLev7 = _this.valueLevPer7;
                  _this.valueLev8 = _this.valueLevPer8;
                  // 客户服务等级
                  _this.servLevelPer0 = response.data[0].custNumServiceLv0;
                  _this.servLevelPer1 = response.data[0].custNumServiceLv1;
                  _this.servLevelPer2 = response.data[0].custNumServiceLv2;
                  _this.servLevelPer3 = response.data[0].custNumServiceLv3;
                  _this.servLevelPer4 = response.data[0].custNumServiceLv4;
                  _this.servLevelPer5 = response.data[0].custNumServiceLv5;
                  _this.servLevelPer6 = response.data[0].custNumServiceLv6;
                  _this.servLevelPer7 = response.data[0].custNumServiceLv7;
                  _this.servLevelOrg0 = '0';
                  _this.servLevelOrg1 = '0';
                  _this.servLevelOrg2 = '0';
                  _this.servLevelOrg3 = '0';
                  _this.servLevelOrg4 = '0';
                  _this.servLevelOrg5 = '0';
                  _this.servLevelOrg6 = '0';
                  _this.servLevelOrg7 = '0';
                  _this.servLevel0 = _this.servLevelPer0;
                  _this.servLevel1 = _this.servLevelPer1;
                  _this.servLevel2 = _this.servLevelPer2;
                  _this.servLevel3 = _this.servLevelPer3;
                  _this.servLevel4 = _this.servLevelPer4;
                  _this.servLevel5 = _this.servLevelPer5;
                  _this.servLevel6 = _this.servLevelPer6;
                  _this.servLevel7 = _this.servLevelPer7;
                  _this.custAmount = {
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      left: '10%',
                      top: 5,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 16,
                      itemHeight: 16,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['零售客户量', '对公客户量']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '55%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: '0',
                        name: '对公客户量'
                      },
                      {
                        value: response.data[0].custNum,
                        name: '零售客户量'
                      }
                      ]
                    }]
                  };
                  // 资产指标对公
                  _this.assetIndexOrg = {
                    title: {
                      text: 'AUM时点：' + '0万元'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万元(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['存款余额', '理财余额', '基金余额', '保险余额', '贵金属余额', '信用卡溢缴款']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: '0',
                          name: '存款余额'
                        },
                        {
                          value: '0',
                          name: '理财余额'
                        },
                        {
                          value: '0',
                          name: '基金余额'
                        },
                        {
                          value: '0',
                          name: '保险余额'
                        },
                        {
                          value: '0',
                          name: '贵金属余额'
                        },
                        {
                          value: '0',
                          name: '信用卡溢缴款'
                        }
                      ]
                    }]
                  };
                  // 资产指标零售
                  _this.assetIndexPer = {
                    title: {
                      text: 'AUM时点：' + _this.toMoney(response.data[0].aumBal) + '万元'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万元(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['存款余额', '理财余额', '基金余额', '保险余额', '贵金属余额', '信用卡溢缴款']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[0].dpsBal,
                        name: '存款余额'
                      },
                      {
                        value: response.data[0].finBal,
                        name: '理财余额'
                      },
                      {
                        value: response.data[0].fundBal,
                        name: '基金余额'
                      },
                      {
                        value: response.data[0].insuBal,
                        name: '保险余额'
                      },
                      {
                        value: response.data[0].goldBal,
                        name: '贵金属余额'
                      },
                      {
                        value: response.data[0].ccdBal,
                        name: '信用卡溢缴款'
                      }
                      ]
                    }]
                  };
                  // 贡献度指标对公
                  _this.contriIndexOrg = {
                    title: {
                      text: '贡献度总值：' + '0万'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['中间业务贡献度', '存款贡献度', '贷款贡献度']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: '0',
                          name: '存款贡献度'
                        },
                        {
                          value: '0',
                          name: '贷款贡献度'
                        },
                        {
                          value: '0',
                          name: '中间业务贡献度'
                        }
                      ]
                    }]
                  };
                  // 贡献度指标零售
                  _this.contriIndexPer = {
                    title: {
                      text: '贡献度总值：' + _this.toMoney(response.data[0].mSumContribu) + '万'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['中间业务贡献度', '存款贡献度', '贷款贡献度']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: response.data[0].mDepContribu,
                          name: '存款贡献度'
                        },
                        {
                          value: response.data[0].mLoanContribu,
                          name: '贷款贡献度'
                        },
                        {
                          value: response.data[0].mMidContribu,
                          name: '中间业务贡献度'
                        }
                      ]
                    }]
                  };
                  // 客户价值等级对公
                  _this.valueLevelOrg = {
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['总行战略级', '总行重点级', '支行战略级', '支行重点级', '潜力级', '普通级', '低效级']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: '0',
                        name: '总行战略级'
                      },
                      {
                        value: '0',
                        name: '总行重点级'
                      },
                      {
                        value: '0',
                        name: '支行战略级'
                      },
                      {
                        value: '0',
                        name: '支行重点级'
                      },
                      {
                        value: '0',
                        name: '潜力级'
                      },
                      {
                        value: '0',
                        name: '普通级'
                      },
                      {
                        value: '0',
                        name: '基础级'
                      },
                      {
                        value: '0',
                        name: '低效级'
                      }
                      ]
                    }]
                  };
                  // 客户价值等级零售
                  _this.valueLevelPer = {
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['私行', '准私行', '财富', '价值', '金卡', '理财', '大众', '低效']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[0].custNumGradeLv7,
                        name: '私行'
                      },
                      {
                        value: response.data[0].custNumGradeLv6,
                        name: '准私行'
                      },
                      {
                        value: response.data[0].custNumGradeLv5,
                        name: '财富'
                      },
                      {
                        value: response.data[0].custNumGradeLv4,
                        name: '价值'
                      },
                      {
                        value: response.data[0].custNumGradeLv3,
                        name: '金卡'
                      },
                      {
                        value: response.data[0].custNumGradeLv2,
                        name: '理财'
                      },
                      {
                        value: response.data[0].custNumGradeLv1,
                        name: '大众'
                      },
                      {
                        value: response.data[0].custNumGradeLv0,
                        name: '低效'
                      }
                      ]
                    }]
                  };
                  // 客户服务等级对公
                  _this.servLevOrg = {
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['7星', '6星', '5星', '4星', '3星', '2星', '1星', '0星']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: '0',
                        name: '7星'
                      },
                      {
                        value: '0',
                        name: '6星'
                      },
                      {
                        value: '0',
                        name: '5星'
                      },
                      {
                        value: '0',
                        name: '4星'
                      },
                      {
                        value: '0',
                        name: '3星'
                      },
                      {
                        value: '0',
                        name: '2星'
                      },
                      {
                        value: '0',
                        name: '1星'
                      },
                      {
                        value: '0',
                        name: '0星'
                      }
                      ]
                    }]
                  };
                  // 客户服务等级个人
                  _this.servLevPer = {
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params) {
                        var relVal = '';
                        relVal = params.name + ': ' + _this.toMoney(params.value) + '万(' + params.percent + '%)';
                        return relVal;
                      }
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top: 15,
                      icon: 'rect',
                      itemGap: 20,
                      itemWidth: 10,
                      itemHeight: 10,
                      textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                      },
                      data: ['7星', '6星', '5星', '4星', '3星', '2星', '1星', '0星']
                    },
                    calculable: true,
                    color: ['#FFA867', '#5EA2FF'],
                    series: [{
                      name: '',
                      type: 'pie',
                      radius: ['40%', '58%'],
                      center: ['35%', '50%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [{
                        value: response.data[0].custNumServiceLv7,
                        name: '7星'
                      },
                      {
                        value: response.data[0].custNumServiceLv6,
                        name: '6星'
                      },
                      {
                        value: response.data[0].custNumServiceLv5,
                        name: '5星'
                      },
                      {
                        value: response.data[0].custNumServiceLv4,
                        name: '4星'
                      },
                      {
                        value: response.data[0].custNumServiceLv3,
                        name: '3星'
                      },
                      {
                        value: response.data[0].custNumServiceLv2,
                        name: '2星'
                      },
                      {
                        value: response.data[0].custNumServiceLv1,
                        name: '1星'
                      },
                      {
                        value: response.data[0].custNumServiceLv0,
                        name: '0星'
                      }
                      ]
                    }]
                  };
                }
              }
            }
          });
        },
        servLevClick: function (tab, event) {
          var _this = this;
          if (tab.name == 'orgtab') {
            _this.servLev = _this.servLevOrg;
            _this.servLevel0 = _this.servLevelPer0;
            _this.servLevel1 = _this.servLevelPer1;
            _this.servLevel2 = _this.servLevelOrg2;
            _this.servLevel3 = _this.servLevelOrg3;
            _this.servLevel4 = _this.servLevelOrg4;
            _this.servLevel5 = _this.servLevelOrg5;
            _this.servLevel6 = _this.servLevelOrg6;
            _this.servLevel7 = _this.servLevelOrg7;
          } else if (tab.name == 'pertab') {
            _this.servLev = _this.servLevPer;
            _this.servLevel0 = _this.servLevelPer0;
            _this.servLevel1 = _this.servLevelPer1;
            _this.servLevel2 = _this.servLevelPer2;
            _this.servLevel3 = _this.servLevelPer3;
            _this.servLevel4 = _this.servLevelPer4;
            _this.servLevel5 = _this.servLevelPer5;
            _this.servLevel6 = _this.servLevelPer6;
            _this.servLevel7 = _this.servLevelPer7;
          }
        },
        serchange: function (value) {
          this.custType = value;
        },
        /**
        * 客户查询——搜索按钮
        */
        searchFn: function () {
          // 跳转所辖客户查询页面
          yufp.frame.addTab({
            id: '5c5498122c5741cda58a7ebce99c0229', // 菜单功能ID（路由ID）
            key: 'custom_dashboard', // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '所辖客户查询', // 页签名称
            data: {
              custType: this.custType,
              queryAll: this.value
            } // 传递的业务数据，可选配置
          });
        },
        /**
         * 待办事项
         */
        clickToDo: function (value) {
          yufp.frame.addTab({
            id: 'toDoWorkList', // 菜单功能ID（路由ID）
            key: 'custom_toDoWorkList', // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '待办事项', // 页签名称
            data: {
              dataInfo: value
            } // 传递的业务数据，可选配置
          });
        },
        /** 已办事项 */
        clickDone: function (value) {
          yufp.frame.addTab({
            id: 'ee0c140945f44303ae116ef1bbdda3f8', // 菜单功能ID（路由ID）
            key: 'custom_Done', // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '已办事项', // 页签名称
            data: {
              dataInfo: value
            } // 传递的业务数据，可选配置
          });
        },
        /** 已办结事项 */
        clickEndDo: function (value) {
          yufp.frame.addTab({
            id: '740940cb43474bceaf2ee59309a66c8e', // 菜单功能ID（路由ID）
            key: 'custom_EndDo', // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '已办结事项', // 页签名称
            data: {
              dataInfo: value
            } // 传递的业务数据，可选配置
          });
        },
        /** 公告管理 */
        clickNotice: function (value) {
          yufp.frame.addTab({
            id: 'c934a4c10c1444218d6c9ce92113639d', // 菜单功能ID（路由ID）
            key: 'custom_Notice', // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '公告管理', // 页签名称
            data: {
              dataInfo: value
            } // 传递的业务数据，可选配置
          });
        },
        /** 信息提醒 */
        clickMessage: function (value) {
          yufp.frame.addTab({
            id: '82843d70f67d453bbe54c3a28800b43a', // 菜单功能ID（路由ID）
            key: 'custom_Message', // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '信息提醒', // 页签名称
            data: {
              dataInfo: value
            } // 传递的业务数据，可选配置
          });
        },
        change: function (index) {
          this.active = index;
        },
        // 获取首页代办事项
        dashboardToDo: function () {
          var _this = this;
          var todoparam = {
            condition: JSON.stringify({ sessionLoginCode: yufp.session.user.loginCode })
          };
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/joinbeanch/getUserTodos',
            data: todoparam,
            callback: function (code, message, response) {
              _this.ToDos = response.data;
              _this.toDoTotal = response.total;
            }
          });
        },
        // 获取首页已办事项
        dashboardDone: function () {
          var _this = this;
          var param = {
            condition: JSON.stringify({
              sessionLoginCode: yufp.session.user.loginCode
            })
          };
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/joinbeanch/getUserDones',
            data: param,
            callback: function (code, message, response) {
              _this.Dones = response.data;
              _this.DonesTotal = response.total;
            }
          });
        },
        // 获取首页完结事项
        dashboardEnd: function () {
          var _this = this;
          var param = {
            condition: JSON.stringify({
              sessionLoginCode: yufp.session.user.loginCode
            })
          };
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/joinbeanch/getUserEnds',
            data: param,
            callback: function (code, message, response) {
              _this.Ends = response.data;
              _this.EndsTotal = response.total;
            }
          });
        },
        // 获取首页我的公共数据信息
        queryNoticeInfo: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.noticeService + '/api/ocrmfcieventinfo/selectNotice',
            data: {
              condition: JSON.stringify({
                reciveOgjId: yufp.session.org.id,
                creatorId: yufp.session.userId,
                userId: yufp.session.userId,
                roles: yufp.session.roles
              })
            },
            callback: function (code, message, response) {
              _this.Notices = response.data;
              _this.NoticesTotal = response.total;
            }
          });
        },
        // 获取首页我的提醒数据信息
        queryRemindInfo: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.remindService + '/api/inforeminder/querylist',
            data: {
              condition: JSON.stringify({
                mgrId: yufp.session.user.loginCode,
                isRead: '0'
              })
            },
            callback: function (code, message, response) {
              _this.Messages = response.data;
              _this.MessagesTotal = response.total;
            }
          });
        },
        showList: function () {
          this.visible = !this.visible;
        },
        // 设置图表标记，若在首页显示，则标记
        setMark: function () {
          var list = yufp.clone(this.list, []);
          for (var i = 0, l = list.length; i < l; i++) {
            var item = list[i];
            var id = item.graphId;
            var template = this.$refs.screen.template;
            for (var j = 0, length = template.length; j < length; j++) {
              var data = template[j].data;
              for (var k = 0, lh = data.length; k < lh; k++) {
                if (id && data[k].graphId && id === data[k].graphId) {
                  item.exist = true;
                  k = lh;
                  j = length;
                } else {
                  item.exist = false;
                }
              }
            }
          }
          this.list = list;
        },
        // 生成新的图表时设置标记
        dropEnd: function (template) {
          this.setMark();
        },
        // 删除图表
        deleteEnd: function (item, index, $index) {
          var template = this.$refs.screen.template;
          var field = template[$index].data;
          if (field.length > 0) {
            for (var i = 0, l = field.length; i < l; i++) {
              if (i > index - 1) {
                field[i].orders--;
              }
            }
          } else {
            template.splice($index, 1);
          }
          this.dragObject.newTemplate = template;
          // this.screenData = template;
          this.setMark();
          this.$nextTick(function () {
            this.dragObject.resetEvent();
          });
        },
        // 保存位置信息
        save: function () {
          var _this = this;
          _this.$confirm('是否保存当前操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                var param = [];
                var template = _this.dragObject.newTemplate;
                for (var i = 0, l = template.length; i < l; i++) {
                  var data = template[i].data;
                  var pageNo = template[i].pageNo;
                  for (var j = 0, lh = data.length; j < lh; j++) {
                    var pageInfo = {};
                    var item = data[j];
                    pageInfo.pageNo = pageNo;
                    pageInfo['userId'] = yufp.session.user.userId;
                    pageInfo['chartId'] = item.chartId || item.graphId;
                    pageInfo['orders'] = item.orders;
                    pageInfo['pageNo'] = pageNo;
                    param.push(pageInfo);
                  }
                }
                _this.$refs.screen.initGraphList = template;
                yufp.service.request({
                  method: 'POST',
                  url: '/api/ocrmfsysusertile/updatestyle',
                  data: JSON.stringify(param),
                  callback: function (code, message, response) {
                  }
                });
              } else {
                _this.$refs.screen.template = _this.$refs.screen.initGraphList;
              }
            }
          });
        },
        topaaa: function () {
          // 客户星级占比
          var publicChartBox = echarts.init(document.getElementById('publicChartBox1'));
          var publicOption = {
            tooltip: {
              show: false
            },
            title: {
              text: '对公客户',
              left: '28%',
              top: '80%',
              textStyle: {
                fontSize: 16,
                color: '#19233C',
                fontWeight: 400
              }
            },
            legend: {
              orient: 'vertical',
              right: '15%',
              icon: 'rect',
              padding: [55, 10, 0, 50],
              itemGap: 20,
              itemWidth: 16,
              itemHeight: 16,
              textStyle: {
                fontSize: '12',
                color: '#5A6277'
              },
              data: ['一星级', '二星级', '三星级', '四星级', '五星级']
            },
            calculable: true,
            color: ['#5DA5FF ', '#8191FE', '#FFA767', '#FB758E', '#2ACFAE'],
            series: [{
              name: '对公客户',
              type: 'pie',
              radius: ['40%', '53%'],
              center: ['35%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  position: 'center',
                  label: {
                    show: true,
                    formatter: '{b}\n\n{d}%'
                  }
                }
              },
              data: [{
                value: 240,
                name: '一星级'
              }, {
                value: 180,
                name: '二星级'
              }, {
                value: 120,
                name: '三星级'
              }, {
                value: 86,
                name: '四星级'
              }, {
                value: 40,
                name: '五星级'
              }]
            }]
          };
          publicChartBox.setOption(publicOption);
          setPieSelected(publicChartBox);
        }
      }
    });

      // 消息处理
    exports.onmessage = function (type, message) {

    };

    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    };
  };
});