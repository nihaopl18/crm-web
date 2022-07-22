/**
 * @Created by 张成龙 zhangcl3@yusys.com.cn on 2019-1-18 17:15:47.
 * @updated by
 * @description 客户等级查询
 */
define(['./libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/yufpExtTree.js',
  'custom/widgets/js/YufpMgrSelector.js',
  './custom/plugins/yufp.watermark.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    // CD0011 证件类型代码
    // CD0241 主协办类型
    // CD0032 客户服务等级代码  （目测更价值等级一样）
    // CD0016 客户类型代码
    yufp.lookup.reg('CD0011,CD0241,CD0032,CD0016');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custgradeService + '/api/custgradequery/querylist',
          queryFormdata: {},
          formdata: {},
          formdata0: {},
          formdata5: {},
          formdata6: {},
          isCon: false,
          rule: [
            { required: true, message: '必填项' }
          ],
          activeNames: ['2', '3'],
          dialogVisible: false,
          formDisabled: true,
          //  viewType: 'DETAIL',
          //  viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          //   saveBtnShow: true,
          parambusiType: '',
          paramorgIdAuth: ''
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.custpubService + '/api/governedcust/getbusitype',
          data: {
            condition: JSON.stringify({userId: yufp.session.userId})
          },
          callback: function (code, message, response) {
            if (code == 0 && response.code === 0) {
              if (response.data) {
                var data = response.data;
                _this.parambusiType = data.busiType;
                _this.paramorgIdAuth = data.orgIdAuth;
                if (data.userCustType == '2') {
                  _this.queryFormdata.custType = '2';
                } else {
                  _this.queryFormdata.custType = '1';
                };
              }
            } else {
              _this.$message.error('查询失败');
            }
          }
        });
      },
      methods: {
        /**
        * 客户查询——搜索按钮
        */
        searchFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.custSearchForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.queryFormdata, model);
          model.userId = yufp.session.userId;
          model.orgCode = yufp.session.org.code;
          // 条线
          model.busiType = _this.parambusiType;
          // 授权机构
          model.orgIdAuth = _this.paramorgIdAuth;
          var param = {
            condition: JSON.stringify(model)
          };
          _this.$refs.refTable.remoteData(param);
        },
        /**
       * 客户查询——重置按钮
       */
        resetMainFn: function () {
          this.$refs.custSearchForm.resetFields();
        },
        /**
          * 格式化 时间
          */
        formData: function (row, column, cellValue) {
          if (cellValue == undefined || cellValue == '') {
            return '';
          }
          var dateee = new Date(cellValue).toJSON();
          var date = new Date(+new Date(dateee) + (8 * 3600 * 1000)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          return date.split(' ')[0];
        },
        detailFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var param = {
            condition: JSON.stringify({
              custId: selectionsAry[0].custId,
              belongMgr: selectionsAry[0].belong
            })
          };
          yufp.service.request({
            method: 'GET',
            url: backend.custgradeService + '/api/custgrademanualeval/querylistByCustId',
            data: param,
            callback: function (code, message, response) {
              _this.dialogVisible = true;
              if (response.data[0].custType == '1') {
                _this.isCon = false;
              } else if (response.data[0].custType == '2') {
                _this.isCon = true;
              }
              _this.$nextTick(function () {
                _this.$refs.refForm.resetFields();
                _this.$refs.refForm5.resetFields();
                _this.$refs.refForm0.resetFields();
                _this.$refs.refForm6.resetFields();
                if (response.data.length > 0) {
                  yufp.clone(response.data[0], _this.formdata0);
                  yufp.clone(response.data[0], _this.formdata5);
                  yufp.clone(response.data[0], _this.formdata6);
                }
              });
            }
          });
        },
        cancelFn: function () {
          this.dialogVisible = false;
        }
      }
    });
  };
});