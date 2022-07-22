/**
 * @Created by houyx3 houyx3@yusys.com.cn on 2022-5-10 14:59:05.
 * @updated by
 * @description 机构业绩结果
 */
define([
  './custom/widgets/js/yufpSchemeSelector.js',
  './custom/widgets/js/yufpOrgTree.js'

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
          dataUrl: '/api/pmafperformanceresult/getListByOrg',
          titleData: [{ key: 'key', value: 'value' }], // 表头信息
          listData: [], //列表信息
          formdata: {},
          hasDataFlag: false,
          quoteSchemeSelParams: {}
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
            _this.formdata.objType = '02';
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
        //     url: '/api/pmafperformanceresult/getListByOrg',
        //     data: {
        //       condition: JSON.stringify(_this.formdata),
        //       page: _self.page,
        //       size: _self.size
        //     },
        //     callback: function (code, message, response) {
        //       if (response.code == 0) {
        //         if (response.data && response.data.resultList.length > 0) {
        //           _this.hasDataFlag = true;
        //           _this.titleData = response.data.titleFiled;
        //           _this.listData = response.data.resultList;
        //         } else {
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
          _this.formdata.objType = '02';
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