/**
 * @Created by yangxiao2 on 2019-3-22
 * @updated by
 * @description 营销活动管理-营销成效分析
 */
 define(['echarts'], function (require, exports) {
  /**
 * 页面加载完成时触发
 * @param hashCode 路由ID
 * @param data 传递数据对象
 * @param cite 页面站点信息
 */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('PUB_SEXE_OBJ_TYPETS,ACTION_TYPE,OCRM_MKT_ACTI_STAT,PRO_STEP');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          hasId: true, // 是否有id
          tempId: '', // 活动ID
          activeId: '',
          activityList: [],
          actBaseUrl: backend.adminService + '/api/marketplan/getListByCondition',
          taskDataForOrgUrl: backend.adminService + '/api/indexplan/taskDataForOrgUrl',
          taskDataForMgrUrl: backend.adminService + '/api/indexplan/taskDataForMgrUrl',
          formdata: {},
          infoDisabled: false,
          mktOffParams: { condition: JSON.stringify({ mktOff: '1' }) },
          groupView: '1',
          orgView: '6',
          mgrView: '7',
          actBaseFrom: {},
          actTem: [],
          load: false,
          orgShow: false,
          mgrShow: true,
          dataRoot: 0,
          rootVisible: false,
          chart1Option: {
            title: {},
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: []
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                data: []
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: []
          },
          chart2Option: {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: []
            },
            series: [
              {
                name: '指标目标值',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '25',
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
                ]
              }
            ]
          },
          chart3Option: {
            title: {},
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['指标1', '指标2', '指标3', '指标4']
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                data: ['客户经理1', '客户经理2', '客户经理3']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: []
          },
          chart4Option: {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: []
            },
            series: [
              {
                name: '指标数',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '25',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: []

              }
            ]
          }

        };
      },
      mounted: function () {
        var _this = this;
        _this.selectActivity();
        _this.dataRoot = yufp.session.org.id;

        // 判断用户只有客户经理角色
        // if (yufp.session.roles.length == 1 && yufp.session.roles[0].roleCode == 'CM') {
        //   _this.orgShow = false;
        //   _this.mgrShow = true;
        // } else {
        //   _this.orgShow = true;
        //   _this.mgrShow = false;
        // }
        _this.orgShow = false;
          _this.mgrShow = true;

      },
      methods: {
        // 指标数据改变机构维度
        taskDataForOrgChange(data, total, response) {
          if (data.length == 0) {
            this.$message({
              message: '暂无指标数据',
              type: 'warning'
            });
          }
          var _this = this;
          var taskIndexSet = new Set();
          var orgNameSet = new Set();
          data.forEach(element => {
            taskIndexSet.add(element.indexName);
            orgNameSet.add(element.orgName);
          });
          var taskIndexArr = Array.from(taskIndexSet);
          var orgNameArr = Array.from(orgNameSet);
          _this.chart1Option.xAxis[0].data = orgNameArr;
          _this.chart1Option.legend.data = taskIndexArr;

          // 指标图表，目标客户进展图，循环指标，根据机构顺序获取指标数据
          _this.chart1Option.series = [];
          for (var i = 0; i < taskIndexArr.length; i++) {
            var orgNumArr = [];
            for (var j = 0; j < orgNameArr.length; j++) {
              for (var k = 0; k < data.length; k++) {
                if (taskIndexArr[i] == data[k].indexName && orgNameArr[j] == data[k].orgName) {
                  orgNumArr.push(data[k].completionValue ? data[k].completionValue : '0');
                }
              }
            }
            _this.chart1Option.series.push({
              name: taskIndexArr[i],
              type: 'bar',
              data: orgNumArr,
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            });

            // 指标图表，目标客户占比图
            _this.chart2Option.legend.data = orgNameArr;
            _this.chart2Option.series[0].data = [];
            for (var j = 0; j < orgNameArr.length; j++) {
              var orgNumObj = {};
              orgNumObj.name = orgNameArr[j];
              var orgNumTotal = 0;
              for (var k = 0; k < data.length; k++) {
                if (orgNameArr[j] == data[k].orgName) {
                  orgNumTotal += data[k].completionValue ? eval(data[k].completionValue) : 0;
                }
              }
              orgNumObj.value = orgNumTotal;
              _this.chart2Option.series[0].data.push(orgNumObj);
            }

          }
        },
        // 指标数据改变客户经理维度
        taskDataForMgrChange(data) {
          if (data.length == 0) {
            this.$message({
              message: '暂无指标数据',
              type: 'warning'
            });
          }
          var _this = this;
          var taskIndexSet = new Set();
          var mgrNameSet = new Set();
          data.forEach(element => {
            taskIndexSet.add(element.indexName);
            mgrNameSet.add(element.objId + '/' + element.userName);
          });

          var taskIndexArr = Array.from(taskIndexSet);
          var mgrNameArr = Array.from(mgrNameSet);
          _this.chart3Option.xAxis[0].data = mgrNameArr;
          _this.chart3Option.legend.data = taskIndexArr;


          // 指标图表，目标客户进展图，循环指标，根据客户经理顺序获取指标数据
          _this.chart3Option.series = [];
          for (var i = 0; i < taskIndexArr.length; i++) {
            var mgrNumArr = [];
            for (var j = 0; j < mgrNameArr.length; j++) {
              var mgrNumObj = {};
              for (var k = 0; k < data.length; k++) {
                if (taskIndexArr[i] == data[k].indexName && mgrNameArr[j].split('/')[0] == data[k].objId) {
                  mgrNumArr.push(data[k].completionValue ? data[k].completionValue : '0');
                }
              }
            }
            _this.chart3Option.series.push({
              name: taskIndexArr[i],
              type: 'bar',
              data: mgrNumArr,
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            });
          }
          // 指标图表，目标客户占比图
          _this.chart4Option.legend.data = mgrNameArr;
          _this.chart4Option.series[0].data = [];
          for (var j = 0; j < mgrNameArr.length; j++) {
            var mgrNumObj = {};
            mgrNumObj.name = mgrNameArr[j];
            var mgrNumTotal = 0;
            for (var k = 0; k < data.length; k++) {
              if (mgrNameArr[j].split('/')[0] == data[k].objId) {
                mgrNumTotal += data[k].completionValue ? eval(data[k].completionValue) : 0;
              }
            }
            mgrNumObj.value = mgrNumTotal;
            _this.chart4Option.series[0].data.push(mgrNumObj);
          }

        },
        getActBaseInfobyid: function (item) {
          var _this = this;
          _this.hasId = false;
          _this.tempId = item.tempId;
          yufp.service.request({
            method: 'GET',
            url: '/api/marketplan/getActBaseInfobyid',
            data: { tempId: item.tempId },
            callback: function (code, message, response) {
              if (code == 0 && response.data) {

                if (_this.$refs.activeAddForm) {
                  _this.$refs.activeAddForm.resetFields();
                }

                yufp.clone(response.data, _this.actBaseFrom);

                if (_this.orgShow) {
                  _this.$refs.orgTargetTable.remoteData({ condition: JSON.stringify({ tempId: _this.tempId }) });
                }
                if (_this.mgrShow) {
                  _this.$refs.mgrTargetTable.remoteData({ condition: JSON.stringify({ tempId: _this.tempId }) });
                }
              } else {
                _this.message('warning', '没有查询到相关数据');
              }
            }
          });
        },
        // 查询活动列表
        selectActivity: function () {
          var _this = this;
          yufp.service.request({
            method: 'POST',
            url: '/api/marketplan/result',
            data: {},
            callback: function (code, message, response) {
              _this.activityList = [];
              var data = response.data;
              for (let index = 0; index < data.length; index++) {
                const element = data[index];
                var activity = {};
                activity.id = element.tempId;
                activity.name = element.activityName;
                activity.type = element.activityType;
                _this.activityList.push(activity);
              }
              console.log("activityList", _this.activityList);
            }
          });
        },
        /**
       * 保存
       */
        saveFn: function () {
        },

        targetClick: function (tab) {
        },
        /**
     * 取消按钮
     */
        cancleFn: function (thisForm) {
          var _this = this;
          if (thisForm == 'actCarEditForm') {
            _this.actCarEditVisible = false;
          }
        },

        searchFn: function () {
          var _this = this;
          _this.mktOffParams = { condition: JSON.stringify(_this.formdata) };
          _this.$refs.actBaseTable.remoteData(_this.mktOffParams);
        },
        resetFn: function () {
          var _this = this;
          _this.$refs.form.resetFields();
        }
      }
    });
  };
});

