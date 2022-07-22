/**
 * @Created by zhuly6 zhuly6@yusys.com.cn on 2018-1-2
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
    yufp.lookup.reg('PUB_SEXE_OBJ_TYPETS,ACTION_TYP ,OCRM_MKT_ACTI_STAT,PRO_STEP');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          treeDataUrl: backend.adminService + '/api/mkt/actitree',
          // prodDataUrl: backend.adminService + '/api/mkt/actiprodlistquery',
          // custDataUrl: backend.adminService + '/api/mkt/acticustlistquery',
          // atcDataUrl: backend.adminService + '/api/mkt/actifilelistquery',
          taskDataUrl: backend.adminService + '/api/mkt/actitargetlistquery',
          actBackdataUrl: backend.adminService + '/api/mkt/actifedbacklist',
          formdata: {},
          infoDisabled: false,
          actBackData: [],
          viewType: 'DETAIL',
          isAcitiveAdd: true,
          isActBack: false,
          isTaskEchart1: false,
          isTaskEchart2: false,
          isTaskEchart3: false,
          isTaskEchart4: false,
          isProductInfo: false,
          isTaskAllot: false,
          isCustomInfo: false,
          isAttachmentAdd: false,
          showType: 'isAcitiveAdd',
          viewTitle: ['活动详情', '执行活动明细', '修改执行活动明细', '活动反馈'],
          turnVisible: false,
          fprodParams: { condition: JSON.stringify({ actiId: '' }) },
          prodParams: { condition: JSON.stringify({ actiId: '' }) },
          // custParams: { condition: JSON.stringify({ actiId: '' })},
          mktOffParams: { condition: JSON.stringify({ mktOff: '1' }) },
          showTask: '',
          taskAllotTable2Data: [],
          actList: [],
          activeAddFormdata: {},
          actTem: [],
          load: false,
          groupView: '1',
          orgView: '5',
          mgrView: '7',
          orgShow: false,
          mgrShow: false,
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
            series: [
              {
                name: '营销成效指标目标值',
                type: 'bar',
                data: [],
                markLine: {
                  data: [
                    { type: 'average', name: '平均值' }
                  ]
                }
              },
              {
                name: '营销成效指标完成值',
                type: 'bar',
                data: [],
                markLine: {
                  data: [
                    { type: 'average', name: '平均值' }
                  ]
                }
              }
            ]
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
            series: [
              {
                name: '客户经理营销指标完成值',
                type: 'bar',
                data: [],
                markLine: {
                  data: [
                    { type: 'average', name: '平均值' }
                  ]
                }
              }
            ]
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
                data: [
                ]
              }
            ]
          }

        };
      },
      mounted: function () {
        var _this = this;
        _this.mktOffParams = { condition: JSON.stringify({ mktOff: '1' }) };
        yufp.service.request({
          method: 'GET',
          url: backend.adminService + '/api/mkt/actilistquery',
          callback: function (code, message, response) {
            _this.actList = response.data;
          }
        });
        _this.dataRoot = yufp.session.org.id;
        if (_this.dataRoot == '500') {
          // 总行根节点设为0，根节点不可见
          _this.dataRoot = 0;
          _this.rootVisible = false;
        } else {
          // 分支行根节点可见
          _this.rootVisible = true;
        }
      },
      methods: {
        /**
       * 保存
       */
        saveFn: function () {
        },
        /**
       * 控制保存按钮、xdialog、表单的状态
      * @param viewType 表单类型
      * @param editable 可编辑,默认false
      */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        orgClick: function (tab) {
          var _this = this;
          if (tab.name == '5') {
            _this.getCharts1();
          } else if (tab.name == '6') {
            _this.getCharts2();
          }
        },
        mgrClick: function (tab) {
          var _this = this;
          if (tab.name == '7') {
            _this.getCharts3();
          } else if (tab.name == '8') {
            _this.getCharts4();
          }
        },
        targetClick: function (tab) {
          var _this = this;
          if (tab.name == '4' && _this.orgShow) {
            _this.$refs.orgTargetTable.remoteData(_this.prodParams);
          } else if (tab.name == '4' && _this.mgrShow) {
            _this.$refs.mgrTargetTable.remoteData(_this.prodParams);
          } else if (tab.name == '5' && _this.orgShow) {
            _this.getCharts1();
          } else if (tab.name == '5' && _this.mgrShow) {
            _this.getCharts3();
          } else if (tab.name == '7') {
            _this.$refs.attachMentTable.remoteData(_this.prodParams);
          }
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
        /**
     * 活动树点击 获取活动详情
     */
        getTabledataFn: function (data) {
          var _this = this;
          yufp.extend(_this.activeAddFormdata, data);
          if (data.mktRespPersonOrg != undefined) {
            // 活动负责人为机构
            _this.orgShow = true;
            _this.mgrShow = false;
          } else {
            // 活动负责人为客户经理
            _this.mgrShow = true;
            _this.orgShow = false;
          }
          if (data.parentActiId == 0) {
            _this.fprodParams = { condition: JSON.stringify({ actiId: data.actiId }) };
            _this.prodParams = { condition: JSON.stringify({ actiId: data.actiId }) };
          } else {
            _this.fprodParams = { condition: JSON.stringify({ actiId: data.parentActiId }) };
            _this.prodParams = { condition: JSON.stringify({ actiId: data.parentActiId }) };
          }
          _this.groupView = '1';
          // _this.custParams = { condition: JSON.stringify({ actiId: _this.actTem.actiId })};
        },

        /**
     * 营销成效指标目标机构占比图
     */
        getCharts2: function () {
          var _this = this;
          var responseData = [];
          var options2 = _this.chart2Option.series[0].data;
          options2.splice(0, options2.length);
          var options2Name = _this.chart2Option.legend.data;
          options2Name.splice(0, options2Name.length);
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/gettargetpie',
            data: _this.fprodParams,
            async: false,
            callback: function (code, message, response) {
              responseData = response.data;
            }
          });
          for (var i = 0; i < responseData.length; i++) {
            var obj = {};
            obj.value = responseData[i].targetValue;
            obj.name = responseData[i].exeObjName;
            options2Name.push(responseData[i].exeObjName);
            options2.push(obj);
          }
        },
        /**
     * 营销成效指标目标机构完成情况对比图
     */
        getCharts1: function () {
          var _this = this;
          var responseData = [];
          var options1Name = _this.chart1Option.xAxis[0].data;
          options1Name.splice(0, options1Name.length);
          var optionsDataArr1 = _this.chart1Option.series[0].data;
          optionsDataArr1.splice(0, optionsDataArr1.length);
          var optionsDataArr2 = _this.chart1Option.series[1].data;
          optionsDataArr2.splice(0, optionsDataArr2.length);
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/gettargetbar',
            data: _this.fprodParams,
            async: false,
            callback: function (code, message, response) {
              responseData = response.data;
            }
          });
          for (var i = 0; i < responseData.length; i++) {
            options1Name.push(responseData[i].exeObjName);
            optionsDataArr1.push(responseData[i].targetValue);
            if (responseData[i].achieveValue != undefined) {
              optionsDataArr2.push(responseData[i].achieveValue);
            } else {
              optionsDataArr2.push(0);
            }
          }
        },
        /**
     * 营销成效指标目标客户经理进展图
     */
        getCharts3: function () {
          var _this = this;
          var responseData = [];
          var options1Name = _this.chart3Option.xAxis[0].data;
          options1Name.splice(0, options1Name.length);
          var optionsDataArr = _this.chart3Option.series[0].data;
          optionsDataArr.splice(0, optionsDataArr.length);
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/getcmbar',
            data: _this.fprodParams,
            async: false,
            callback: function (code, message, response) {
              responseData = response.data;
            }
          });
          for (var i = 0; i < responseData.length; i++) {
            options1Name.push(responseData[i].exeObjName);
            if (responseData[i].achieveValue != undefined) {
              optionsDataArr.push(responseData[i].achieveValue);
            } else {
              optionsDataArr.push(0);
            }
          }
        },
        /**
     * 营销成效指标目标客户经理占比图
     */
        getCharts4: function () {
          var _this = this;
          var responseData = [];
          var options2 = _this.chart4Option.series[0].data;
          options2.splice(0, options2.length);
          var options2Name = _this.chart4Option.legend.data;
          options2Name.splice(0, options2Name.length);
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/getcmpie',
            data: _this.fprodParams,
            async: false,
            callback: function (code, message, response) {
              responseData = response.data;
            }
          });
          for (var i = 0; i < responseData.length; i++) {
            var obj = {};
            obj.value = responseData[i].targetCode;
            obj.name = responseData[i].exeObjName;
            options2Name.push(responseData[i].exeObjName);
            options2.push(obj);
          }
        },
        searchFn: function () {
          var _this = this;
          _this.mktOffParams = { condition: JSON.stringify(_this.formdata) };
          _this.$refs.refTree.remoteData(_this.mktOffParams);
        },
        resetFn: function () {
          var _this = this;
          _this.$refs.form.resetFields();
        }
      }
    });
  };
});