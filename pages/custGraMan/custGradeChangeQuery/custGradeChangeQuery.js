/**
 * @Created by 张成龙 zhangcl3@yusys.com.cn on 2019-1-17 14:02:55.
 * @updated by
 * @description 客户等级变动查询
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  'libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/yufpExtTree.js',
  'custom/widgets/js/YufpMgrSelector.js',
  './custom/plugins/yufp.watermark.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0016,CD0241,CD0445');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custgradeService + '/api/custgradechangequery/querylist',
          dataUrldetail: backend.custgradeService + '/api/custgradechangequery/querydetaillist',
          formdata: {},
          changeDelData: [
          ],
          rawValue: '',
          rule: [
            { required: true, message: '必填项' },
            { max: 500, message: '500个字符以内', trigger: 'blur'},
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          levelChange: [{key: 0, value: '不变'},
            {key: 1, value: '提升'},
            {key: 2, value: '下降'}
          ],
          levelType: [
            {key: '1', value: '价值等级'},
            {key: '2', value: '服务等级'}
          ],
          dialogVisible: false,
          dialogVisibleShow: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          custManagerParams: {
            user: {
              dataUrl: '/api/grantapply/getcm'
            }
          },
          indexCode: '',
          params: {
            indexUse: '1'
          },
          index: {
            selectFalg: '', // 选择标治
            selectIndexCode: '',
            selectIndexName: ''
          }
        };
      },
      methods: {
        selectIndex: function (data) {
          var indexCode = data[0].indexCode;
          var indexName = data[0].indexName;
          this.index.selectFalg += '#';
          this.index.selectIndexCode += indexCode;
          this.index.selectIndexName += indexName;
        },
        indexCodeChange: function () {
          // this.index.selectIndexName = this.index.selectIndexCode;
        },
        /**
          * 组件演示
          */
        showZj: function () {
          var _this = this;
          _this.dialogVisibleShow = true;
          _this.indexCode = '';
          // _this.$refs.baseIndex.$refs.baseIndex.selectedVal = '';
        },
        /**
         * 变动明细查询
         */
        changeDel: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogVisible = true;
          // // 演示代码
          // var sj = {code: '000000',
          //   total: 1,
          //   message: 'success',
          //   data: [
          //     {custId: 'CUST000001', custName: '**公司', custType: '1', custLevel: '1', targetValue: '李毅成', oldCustLevel: '200', oldTargetValue: '天府大道', dataDt: '2017-10-28'},
          //     {custId: 'CUST000002', custName: '**公司', custType: '1', custLevel: '1', targetValue: '李毅成', oldCustLevel: '200', oldTargetValue: '天府大道', dataDt: '2017-10-28'}
          //   ]};
          // _this.changeDelData = sj.data;
          // // 结束演示
          var _this = this;
          this.$nextTick(function () {
            var param = {
              condition: JSON.stringify({
                custId: _this.$refs.refTable.selections[0].custId
              })
            };
            _this.$refs.refTable2.remoteData(param);
          });
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
        userSelectFn: function () {

        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 确定
         */
        cancelFnZj: function () {
          var _this = this;
          if (_this.index.selectIndexCode == '' || _this.index.selectIndexName == '') {
            _this.$message({ message: '请检查指标是否选择，指标解释是否填写！', type: 'warning' });
            return;
          }
          _this.dialogVisibleShow = false;
        }
      }
    });
  };
});