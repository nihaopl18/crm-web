/**
 * @Created by geyun geyun@yusys.com.cn on 2019-1-28 15:48:59.
 * @updated by
 * @description 积分使用情况统计报表
 */
define(['custom/widgets/js/yufpOrgTree.1.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('ACCT_B_TYPE,ACCT_S_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.yuspClimpNumstatService + '/api/loystsrsectcm/querylist',
          area1IsShow: true,
          area2IsShow: true,
          area3IsShow: false,
          area4IsShow: false,
          area5IsShow: false,
          area6IsShow: false,
          areaPoint1: '',
          areaPoint2: '',
          areaPoint3: '',
          areaPoint4: '',
          areaPoint5: '',
          etlDt: '',
          orgNo: '',
          areaLabel1: '积分分层区间1',
          areaLabel2: '积分分层区间2',
          areaLabel3: '积分分层区间3',
          areaLabel4: '积分分层区间4',
          areaLabel5: '积分分层区间5',
          areaLabel6: '积分分层区间6',
          formdata: {},
          condition: {},
          baseParams: {},
          dialogVisible: false,
          viewTitle: ''
        };
      },
      methods: {
        search: function () {
          var _this = this;
          if (_this.formdata.pointArea1 == '' || _this.formdata.pointArea2 == '') {
            _this.$message({ message: '积分分层点1和积分分层点2为必输查询项', type: 'warning' });
            return;
          }
          if (_this.areaPoint1 % 1000 != 0 || _this.areaPoint2 % 1000 != 0 || _this.areaPoint3 % 1000 != 0 || _this.areaPoint4 % 1000 != 0 || _this.areaPoint5 % 1000 != 0) {
            _this.$message({ message: '积分分层点数值必须为1000的整数倍', type: 'warning' });
            return;
          }
          if (_this.areaPoint1 != '') {
            _this.area1IsShow = true;
            _this.areaLabel1 = '0-' + _this.areaPoint1;
            _this.areaLabel2 = _this.areaPoint1 + '以上';
          } else {
            _this.area1IsShow = false;
          }
          if (_this.areaPoint2 != '') {
            _this.area2IsShow = true;
            _this.areaLabel2 = _this.areaPoint1 + '-' + _this.areaPoint2;
            _this.areaLabel3 = _this.areaPoint2 + '以上';
          } else {
            _this.area2IsShow = false;
          }
          if (_this.areaPoint3 != '') {
            _this.area3IsShow = true;
            _this.areaLabel3 = _this.areaPoint2 + '-' + _this.areaPoint3;
            _this.areaLabel4 = _this.areaPoint3 + '以上';
          } else {
            _this.area3IsShow = false;
          }
          if (_this.areaPoint4 != '') {
            _this.area4IsShow = true;
            if (_this.areaPoint3 != '') {
              _this.areaLabel4 = _this.areaPoint3 + '-' + _this.areaPoint4;
            } else {
              _this.areaLabel4 = _this.areaPoint2 + '-' + _this.areaPoint4;
            }
            _this.areaLabel5 = _this.areaPoint4 + '以上';
          } else {
            _this.area4IsShow = false;
          }
          if (_this.areaPoint5 != '') {
            _this.area5IsShow = true;
            if (_this.areaPoint4 != '') {
              _this.areaLabel5 = _this.areaPoint4 + '-' + _this.areaPoint5;
            } else {
              _this.areaLabel5 = _this.areaPoint3 == '' ? _this.areaPoint2 : _this.areaPoint3 + '-' + _this.areaPoint4;
            }
            _this.areaLabel5 = _this.areaPoint4 + '-' + _this.areaPoint5;
            _this.areaLabel6 = _this.areaPoint5 + '以上';
          } else {
            _this.area5IsShow = false;
          }
          _this.area6IsShow = true;
          // _this.baseParams.pageSize = 10;
          // _this.baseParams.pageIndex = 1;
          _this.condition.orgNo = _this.formdata.orgNo;
          _this.baseParams.condition = _this.condition;
          _this.$refs.refTable.remoteData(_this.baseParams);
        },
        reset: function () {
          var _this = this;
          _this.formdata.etlDt = '';
          _this.formdata.pointArea1 = '';
          _this.formdata.pointArea2 = '';
          _this.formdata.pointArea3 = '';
          _this.formdata.pointArea4 = '';
          _this.formdata.pointArea5 = '';
        },
        getSummaries: function (param) {
          var columns = param.columns;
          var data = param.data;
          var sums = [];
          columns.forEach(function (column, index) {
            if (index === 0) {
              sums[index] = '合计';
              return;
            }
            var values = data.map(function (item) {
              return Number(item[column.property]);
            });
            if (!values.every(function (value) {
              return isNaN(value)
              ;
            })) {
              sums[index] = values.reduce(function (prev, curr) {
                var value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += '';
            } else {
              sums[index] = '合计';
            }
          });

          return sums;
        },
        change1: function (value) {
          var _this = this;
          _this.areaPoint1 = value;
          _this.condition.pointArea1 = value;
        },
        change2: function (value) {
          var _this = this;
          _this.areaPoint2 = value;
          _this.condition.pointArea2 = value;
        },
        change3: function (value) {
          var _this = this;
          _this.areaPoint3 = value;
          _this.condition.pointArea3 = value;
        },
        change4: function (value) {
          var _this = this;
          _this.areaPoint4 = value;
          _this.condition.pointArea4 = value;
        },
        change5: function (value) {
          var _this = this;
          _this.areaPoint5 = value;
          _this.condition.pointArea5 = value;
        },
        changeDt: function (value) {
          var _this = this;
          _this.etlDt = value;
          _this.condition.etlDt = value;
        }

      }
    });
  };
});