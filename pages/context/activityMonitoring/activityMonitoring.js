/**
 * @Created by zhanghan zhanghan3@yusys.com.cn on 2018-12-12 15:10:23.
 * @description 客户经理监控
 */
 define([
  './custom/widgets/js/YufpDemoSelector.js',
  './libs/js-xlsx/xlsx.full.min.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          baseParams: {
            condition: {
              userId: 'admin'
            },
            nonCondParam1: '1',
            nonCondParam2: '2'
          },
          queryFields: [
            { placeholder: '所属机构', field: 'orgId', type: 'custom', is: 'yufp-org-tree' },
            { placeholder: '营销策划方案名称', field: 'activityName', type: 'input' }
          ],
          queryButtons: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _this.$refs.reftable.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          tableColumns: [
            { label: '所属机构', prop: 'activityOrg', width: 110, dataCode: 'NATIONALITY', hidden: true },
            { label: '所属机构', prop: 'activityOrgName', width: 110 },
            { label: '营销策划方案名称', prop: 'activityName', width: 250 },
            { label: '下发客户数', prop: 'countTotal', width: 100 },
            { label: '下发产品数', prop: 'prodNum', width: 100 },
            {
              label: '执行中数',
              prop: 'countImplementing',
              width: 100,
              template: function () {
                return '<template scope="scope">\
                            <a onclick="return false;" href="javascipt:void(0);" style="text-decoration:underline;" @click="_$event(\'implementing-detail-click\', scope)">{{ scope.row.countImplementing }}</a>\
                        </template>';
              }
            },
            {
              label: '成功完成数',
              prop: 'countSuccessend',
              width: 100,
              template: function () {
                return '<template scope="scope">\
                          <a onclick="return false;" href="javascipt:void(0);" style="text-decoration:underline;" @click="_$event(\'success-detail-click\', scope)">{{ scope.row.countSuccessend }}</a>\
                      </template>';
              }
            },
            {
              label: '失败完成数',
              prop: 'countFailend',
              width: 100,
              template: function () {
                return '<template scope="scope">\
                        <a onclick="return false;" href="javascipt:void(0);" style="text-decoration:underline;" @click="_$event(\'failed-detail-click\', scope)">{{ scope.row.countFailend }}</a>\
                    </template>';
              }
            },
            // { label: '成功率', prop: 'successRate', width: 100 },
            // { label: '失败率', prop: 'failRate', width: 100 },
            {
              label: '成功率', prop: 'successRate', width: 100,
              template: function () {
                return '<template scope="scope">\
              {{ (scope.row.successRate * 100).toFixed(2) + "%" }}\
              </template>';
              }
            },
            {
              label: '失败率', prop: 'failRate', width: 100,
              template: function () {
                return '<template scope="scope">\
              {{ (scope.row.failRate * 100).toFixed(2) + "%" }}\
              </template>';
              }
            },

            // { label: '统计日期', prop: 'dataDate', width: 100 }
          ],
          impIngColumns: [
            { label: '营销策划方案名称', prop: 'activityName', width: 300 },
            { label: '客户经理', prop: 'mgrName', width: 200 },
            { label: '客户名称', prop: 'custName', width: 200 },
            { label: '产品名称', prop: 'productName', width: 300 }
          ],
          successColumns: [
            { label: '营销策划方案名称', prop: 'activityName', width: 250 },
            { label: '客户经理', prop: 'mgrName', width: 200 },
            { label: '客户名称', prop: 'custName', width: 250 },
            { label: '产品名称', prop: 'productName', width: 250 }
          ],
          failColumns: [
            { label: '营销策划方案名称', prop: 'activityName', width: 250 },
            { label: '客户经理', prop: 'mgrName', width: 200 },
            { label: '客户名称', prop: 'custName', width: 250 },
            { label: '产品名称', prop: 'productName', width: 250 },
            // { label: '失败理由', prop: 'prodName', width: 250 }
          ],
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          selectFlag: true,
          dataUrl: backend.adminService + '/api/activitygmonitoring/list',
          impUrl: backend.adminService + '/api/activitygmonitoring/getIiplist',
          successUrl: backend.adminService + '/api/activitygmonitoring/getsuccesslist',
          failedUrl: backend.adminService + '/api/activitygmonitoring/getfailedlist',
          impIngVisible: false,
          successVisible: false,
          failedVisible: false
        };
      },
      methods: {
        /**
         * 导出操作
         */
        exportFn: function () {
          yufp.util.exportExcelByTable({
            fileName: '下载文件',
            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
            ref: this.$refs.reftable,
            url: '/trade/example/list',
            param: {}
          });
        },
        // 执行中下钻方法
        openIngFn: function (row) {
          var _this = this;
          _this.impIngVisible = true;
          var orgId = row.row.orgId;
          var activityId = row.row.activityId;
          var param = { condition: JSON.stringify({ activityId: activityId, orgId: orgId }) };
          _this.$nextTick(function () {
            _this.$refs.impIngtable.remoteData(param);
          });
        },
        // 执行中下钻方法
        openSuccessFn: function (row) {
          var _this = this;
          _this.successVisible = true;
          var orgId = row.row.orgId;
          var activityId = row.row.activityId;
          var param = { condition: JSON.stringify({ activityId: activityId, orgId: orgId }) };
          _this.$nextTick(function () {
            _this.$refs.successtable.remoteData(param);
          });
        },
        // 执行中下钻方法
        openFailedFn: function (row) {
          var _this = this;
          _this.failedVisible = true;
          var activityId = row.row.activityId;
          var param = { condition: JSON.stringify({ activityId: activityId }) };
          _this.$nextTick(function () {
            _this.$refs.failedtable.remoteData(param);
          });
        }
      }
    });
  };
});