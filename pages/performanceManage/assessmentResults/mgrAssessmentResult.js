/**
 * @Created by houyx3 houyx3@yusys.com.cn on 2022-5-10 14:59:05.
 * @updated by
 * @description 客户经理业绩结果
 */
define([
  './custom/widgets/js/yufpSchemeSelector.js',
  './custom/widgets/js/YufpManagerSelector.js'

], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('BUS_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          currentSchemeId: '',
          sortSeqOptions: [],
          useSeqOptions: [],
          sortIndexOptions: [],
          queryList: [],
          sortOrderOptions: [{ key: '1', value: '正序' }, { key: '2', value: '倒序' }],
          dataUrl: '/api/pmafperformanceresult/getListByMgr',
          titleData: [{ key: 'key', value: 'value' }], // 表头信息
          listData: [], //列表信息
          formdata: {},
          hasDataFlag: false,
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          teamParam: {
            objType: '02'
          },
          quoteSchemeSelParams: {

          }
        };
      },
      computed: {
      },
      watch: {
        currentSchemeId: function (val) {
          if (val) {
            var _this = this;
            _this.formdata.objType = '01';
            yufp.service.request({
              method: 'GET',
              url: '/api/pmafperformanceresult/getIndexList',
              data: {
                condition: JSON.stringify(_this.formdata),
              },
              callback: function (code, message, response) {
                if (response.code == 0) {
                  var data = response.data;
                  _this.sortSeqOptions = [];
                  _this.sortIndexOptions = [];
                  for(var i = 0; i < data.length; i++){
                    var sortSeqObj = {};
                    sortSeqObj.key = i+1;
                    sortSeqObj.value = '第'+(i+1)+'顺位';
                    _this.sortSeqOptions.push(sortSeqObj);
                    var sortIndexObj = {};
                    sortIndexObj.key = data[i].indexId;
                    sortIndexObj.value = data[i].indexName;
                    _this.sortIndexOptions.push(sortIndexObj);
                  }
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          }
        }
      },
      methods: {
        addQueryCondition: function () {
          var obj = {};
          // obj.sortSeq = this.sortSeqOptions[0].key;
          // obj.sortIndex = this.sortIndexOptions[0].key;
          // obj.sortOrder = this.sortOrderOptions[0].key;
          this.queryList.push(obj);
        },
        selectFn: function (data) {
          this.currentSchemeId = data[0].schemeId;
        },
        queryFn: function () {
          var _this = this;
          if (_this.formdata.schemeId) {
            _this.queryMothed();
          } else {
            _this.$message({ message: "请选择考核方案", type: 'warning' });
          }
        },
        resetFn: function () {
          this.$refs.refForm.resetFields();
        },
        exportExcel: function () {
          var _this = this;
          if (_this.formdata.schemeId) {
            var _self = _this.$refs.refTable;
            _this.formdata.objType = '01';
            var url = backend.appCommonService + '/api/pmafperformanceresult/exportExcel?'
              + 'condition=' + encodeURI(JSON.stringify(_this.formdata)) + '&' + 'page=' + _self.page + '&' + 'size=' + _self.size;
            yufp.util.download(url);
          } else {
            _this.$message({ message: "请选择考核方案", type: 'warning' });
          }
        },
        // queryMothed: function () {
        //   var _this = this;
        //   var _self = _this.$refs.refTable;
        //   yufp.service.request({
        //     method: 'GET',
        //     url: '/api/pmafperformanceresult/getListByMgr',
        //     data: {
        //       condition: JSON.stringify(_this.formdata),
        //       page: _self.page,
        //       size: _self.size
        //     },
        //     callback: function (code, message, response) {
        //       if (response.code == 0) {
        //         if(response.data && response.data.resultList.length > 0){
        //           _this.hasDataFlag = true;
        //           _this.titleData = response.data.titleFiled;
        //           _this.listData = response.data.resultList;
        //         }else{
        //           _this.hasDataFlag = false;
        //           _this.$message({ message: "暂无数据", type: 'warning' });
        //         }

        //       } else if (response.code == -9) {
        //         _this.$message({ message: response.message, type: 'warning' });
        //       } else {
        //         _this.$message({ message: response.message, type: 'error' });
        //       }
        //     }
        //   });
        // }
        queryMothed: function () {
          var _this = this;
          _this.formdata.objType = '01';
          yufp.service.request({
            method: 'GET',
            url: '/api/pmafperformanceresult/getListTitle',
            data: {
              condition: JSON.stringify(_this.formdata),
            },
            callback: function (code, message, response) {
              if (response.code == 0) {
                if (response.data && response.data.length > 0) {
                  for(var i = 0;i<response.data.length;i++){
                    if(response.data[i].key.search("indexName") != -1){
                      response.data[i].widthSize = 220;
                    }else{
                      response.data[i].widthSize = 130;
                    }
                   
                  }
                  _this.titleData = response.data;
                  _this.hasDataFlag = true;
                  _this.$refs.refTable.remoteData({ condition: JSON.stringify(_this.formdata) });
                } else {
                  _this.hasDataFlag = false;
                  _this.$message({ message: "暂无数据", type: 'warning' });
                }
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
        }

      },
      mounted: function () {
      }
    });
  };
});