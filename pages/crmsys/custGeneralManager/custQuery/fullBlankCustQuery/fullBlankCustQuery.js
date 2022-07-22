/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-4 15:14:52.
 * @updated by
 * @description 全行客户查询
 */
define([
  './custom/plugins/yufp.watermark.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0011,CD0016,CD0019');
    var validateRule = function () {

    };
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          dataUrl: backend.custpubService + '/api/allcust/list',
          formdata: {},
          searchformData: {},
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          searchRule: {
            validator: function () {
              _this.searchformData;
              console.log(JSON.stringify(_this.searchformData));
            },
            trigger: 'blur'
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
        /**
        * 查询表单查询项
        */
        searchFn: function () {
          var idMsg, custMsg, certtMsg, certnMsg;
          var param = {condition: JSON.stringify(this.searchformData)};
          if (!this.searchformData.custName && !this.searchformData.certType && !this.searchformData.certNo) {
            this.$refs.searchrefForm.validateField('custId', function (ermsg) {
              idMsg = ermsg;
            });
            if (idMsg) {
              this.$message({
                type: 'warning',
                message: '请通过客户号或客户名称、证件类型、证件号码查询'
              });
              return;
            }
          } else if (!this.searchformData.custName || !this.searchformData.certType || !this.searchformData.certNo) {
            this.$refs.searchrefForm.validateField('custName', function (ermsg) {
              custMsg = ermsg;
            });
            this.$refs.searchrefForm.validateField('certType', function (ermsg) {
              certtMsg = ermsg;
            });
            this.$refs.searchrefForm.validateField('certNo', function (ermsg) {
              certnMsg = ermsg;
            });
            if (custMsg || certtMsg || certnMsg) {
              return;
            }
          }
          this.$refs.refTable.remoteData(param);
        },
        /**
        * 重置查询表单项
        */
        resetMainFn: function () {
          this.$refs.searchrefForm.resetFields();
        },
        /**
         * 点击按钮，弹出简版客户视图
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var obj = selectionsAry[0];
          // custType-1:个人客户， 2: 零售客户
          var routeId = obj.custType == '1' ? 'personalBriefCustView' : 'publicBriefCustView';
          var title = obj.custType == '1' ? '零售客户视图' : '对公客户视图';
          var dataId = obj.custType == '1' ? 'c6a0980aa7734d99bf95161d1d054381' : '52ca3479f2224cc0a56e557eb378e1be';
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: routeId, // 自定义唯一页签key
            title: title, // 页签名称
            // 视图对应的树节点id
            data: {id: dataId, custId: obj.custId, custName: obj.custName}
          });
        },
        /**
         * 双击列表项数据，弹出简版客户视图
         * @param row 当前行数据
         */
        showCustViewPortFn: function (row, column) {
          var obj = row;
          // custType-1:个人客户， 2: 零售客户
          var routeId = obj.custType == '1' ? 'personalBriefCustView' : 'publicBriefCustView';
          var title = obj.custType == '1' ? '零售客户视图' : '对公客户视图';
          var dataId = obj.custType == '1' ? 'c6a0980aa7734d99bf95161d1d054381' : '52ca3479f2224cc0a56e557eb378e1be';
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: routeId, // 自定义唯一页签key
            title: title, // 页签名称
            // 视图对应的树节点id
            data: {id: dataId, custId: obj.custId, custName: obj.custName}
          });
        },
        openpercustViewFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var obj = selectionsAry[0];
          yufp.frame.addTab({
            id: 'personalCustView', // 菜单功能ID（路由ID）
            key: 'personalCustView', // 自定义唯一页签key
            title: '零售客户视图', // 页签名称
            data: {id: 'f38c540fa3a842f1a9bebe5fbe881dda', // 4779010b9e8c419bb9a52bba2bf8361d f38c540fa3a842f1a9bebe5fbe881dda,2级 6faa3193ccb94118a66443f19086f692
              custId: obj.custId,
              custName: obj.custName}
          });
        },
        openorgcustViewFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var obj = selectionsAry[0];
          yufp.frame.addTab({
            id: 'publicStanCustView', // 菜单功能ID（路由ID）
            key: 'publicStanCustView', // 自定义唯一页签key
            title: '对公客户视图', // 页签名称
            data: {id: '1510d10391f64514b833c0d12d39a824', // 4779010b9e8c419bb9a52bba2bf8361d f38c540fa3a842f1a9bebe5fbe881dda,2级 6faa3193ccb94118a66443f19086f692
              custId: obj.custId,
              custName: obj.custName
            }
          });
        },
        opencustViewFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var obj = selectionsAry[0];

          var mId = 'personalCustView';
          var mKey = 'personalCustView';
          var dId = 'f38c540fa3a842f1a9bebe5fbe881dda';
          var mTitle = '零售客户视图';
          if (obj.custType == '2') { // 对公
            mId = 'publicStanCustView';
            mKey = 'publicStanCustView';
            dId = '1510d10391f64514b833c0d12d39a824';
            mTitle = '对公客户视图';
          }
          yufp.frame.addTab({
            id: mId, // 菜单功能ID（路由ID）
            key: mKey, // 自定义唯一页签key
            title: mTitle, // 页签名称
            data: {id: dId, // 4779010b9e8c419bb9a52bba2bf8361d f38c540fa3a842f1a9bebe5fbe881dda,2级 6faa3193ccb94118a66443f19086f692
              custId: obj.custId,
              custName: obj.custName
            }
          });
        }
      }
    });
  };
});