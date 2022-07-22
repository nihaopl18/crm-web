/**
 * @Created by houyx3 houyx3@yusys.com.cn on 2022-5-10 14:59:05.
 * @updated by
 * @description 团队业绩结果
 */
define([
  './custom/widgets/js/yufpSchemeSelector.js',
  './custom/widgets/js/YufpTeamSelector.js'

], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '/api/pmafperformanceresult/getListByTeam',
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
            objType: '04'
          },
          quoteSchemeSelParams: {

          }
        };
      },
      computed: {
      },
      watch: {
      },
      methods: {
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
            _this.formdata.objType = '04';
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
        //   _this.formdata.objType = '2';
        //   yufp.service.request({
        //     method: 'GET',
        //     url: '/api/pmafperformanceresult/getListTitle',
        //     data: {
        //       condition: JSON.stringify(_this.formdata),
        //     },
        //     callback: function (code, message, response) {
        //       if (response.code == 0) {

        //         _this.titleData = response.data;
        //         yufp.service.request({
        //           method: 'GET',
        //           url: '/api/pmafperformanceresult/getListByTeam',
        //           data: {
        //             condition: JSON.stringify(_this.formdata),
        //             page: _self.page,
        //             size: _self.size
        //           },
        //           callback: function (code, message, response) {
        //             if (response.code == 0) {
        //               if (response.data.length > 0) {
        //                 _this.hasDataFlag = true;
        //                 _this.listData = response.data;
        //               } else {
        //                 _this.hasDataFlag = false;
        //                 _this.$message({ message: "暂无数据", type: 'warning' });
        //               }
      
        //             } else if (response.code == -9) {
        //               _this.$message({ message: response.message, type: 'warning' });
        //             } else {
        //               _this.$message({ message: response.message, type: 'error' });
        //             }
        //           }
        //         });

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
          _this.formdata.objType = '04';
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