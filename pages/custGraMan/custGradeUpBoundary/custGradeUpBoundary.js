/**
 * @created by 张成龙 on 2019-1-17 16:32:49
 * @updated by
 * @description 客户等级边界列表查询
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  'libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/yufpExtTree.js',
  'custom/widgets/js/YufpMgrSelector.js',
  './custom/plugins/yufp.watermark.js'
], function (require, exports) {
  yufp.lookup.reg('CD0016,CD0241,CD0032');

  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0445');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          searchformData: {},
          dataUrl: backend.custgradeService + '/api/custgradeupboundarycustquery/querylist',
          dataUrldetail: backend.custgradeService + '/api/custgradeupboundarycustquery/querydetaillist',
          dialogVisible: false,
          levelType: [
            {key: '1', value: '价值等级'},
            {key: '2', value: '服务等级'}
          ],
          changeDelData: [
          ],
          custManagerParams: {
            user: {
              dataUrl: backend.custmgrService + '/api/grantapply/getcm'
            }
          }
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.custgroupService + '/api/allcust/mybusitype',
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.data.busiType == '2') {
                _this.searchformData.custType = '2';
              } else {
                _this.searchformData.custType = '1';
              }
            }
          }
        });
      },
      methods: {

        userSelectFn: function () {

        },
        /**
          * 格式化 时间
          */
        formData: function (row, column, cellValue) {
          if (cellValue == '' || cellValue == undefined) {
            return '';
          }
          var dateee = new Date(cellValue).toJSON();
          var date = new Date(+new Date(dateee) + (8 * 3600 * 1000)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          return date.split(' ')[0];
        },
        /**
         * 提升量格式化
         */
        formTsl: function (row, column, cellValue) {
          return cellValue + '级';
        },
        changeDel: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogVisible = true;
          var _this = this;
          this.$nextTick(function () {
            var param = {
              condition: JSON.stringify({
                custId: _this.$refs.refTable.selections[0].custId
              })
            };
            _this.$refs.refTable2.remoteData(param);
          });

          // _this.changeDelData = sj.data;
          // var model;
          // model.custId = _this.$refs.refTable.selections.custId;
          // yufp.service.request({
          //   method: 'GET',
          //   url: '/api/custgradeupboundarycust/querydetaillist',
          //   data: model,
          //   callback: function (code, message, response) {
          //     _this.changeDelData = response.data;
          //   }
          // });
        },
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        }
      }
    });
  };

  /**
   * 页面传递消息处理
   * @param type 消息类型
   * @param message 消息内容
   */
  exports.onmessage = function (type, message) {
  };

  /**
   * 页面销毁时触发destroy方法
   * @param id 路由ID
   * @param cite 页面站点信息
   */
  exports.destroy = function (id, cite) {
  };
});