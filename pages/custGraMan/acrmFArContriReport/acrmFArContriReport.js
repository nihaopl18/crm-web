/**
 * @Created by 张成龙 zhangcl3@yusys.com.cn on 2019-1-16 21:07:17.
 * @updated by
 * @description 客户贡献度查询
 */
define(['./libs/js-xlsx/xlsx.full.min.js',
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
    yufp.lookup.reg('CD0011,CD0016,CD0032,CD0243');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custgradeService + '/api/AcrmFArContriReport/querylist',
          formdata: {},
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          // exportAcrm: !yufp.session.checkCtrl('export'),
          detailBtn: !yufp.session.checkCtrl('detail'),
          saveBtnShow: true,
          filedShow: false,
          parambusiType: '',
          paramorgIdAuth: '',
          queryFormdata: {},
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
         * 选中客户经理事件
         */
        userSelectFn: function () {

        },
        /**
          * 格式化金额
          */
        formJE: function (row, column, cellValue) {
          // 金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
          // var str = (val / 100).toFixed(2) + '';
          if (cellValue == undefined) {
            if (typeof row == 'number') {
              cellValue = row;
            } else {
              cellValue = '';
            }
          }

          if (cellValue == '') {
            return cellValue;
          }

          var str = cellValue + '';
          if (str.split('.').length >= 2) {
            var intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',');// 取到整数部分
            var dot = str.substring(str.length, str.indexOf('.'));// 取到小数部分搜索
            var ret = intSum + dot;
            return ret;
          } else {
            var intSum = str.replace(/\B(?=(?:\d{3})+$)/g, ',');// 取到整数部分
            return intSum;
          }
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
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
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        },
        dblclick: function (row, event) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(row, this.formdata);
          });
        }
        /**
         * 导出操作
         */
        /**   exportFn: function () {
          var _this = this;
          // 导出参数
          var model = {};
          yufp.clone(_this.queryFormdata, model);
          model.sign = '1';
          model.userId = yufp.session.userId;
          model.orgCode = yufp.session.org.code;
          // 条线
          model.busiType = _this.parambusiType;
          // 授权机构
          model.orgIdAuth = _this.paramorgIdAuth;
          var param = {
            condition: JSON.stringify(model)
          };
          // var param = {
          //   condition: JSON.stringify(
          //     _this.$refs.refForm.formdata)
          // };

          // 脱敏数据
          var DesensitizationData = ['certNo'];
          yufp.util.exportExcelByTable({
            fileName: '客户贡献度列表',
            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
            ref: _this.$refs.refTable,
            url: backend.custgradeService + '/api/AcrmFArContriReport/querylist',
            param: param,
            desensitizationData: DesensitizationData.join(',')// 脱敏数据 字符串形式
          });

          // yufp.util.exportExcelByTable({
          //   ref: _this.$refs.refTable,
          //   url: backend.custgradeService + '/api/AcrmFArContriReport/querylist'
          // });
        } **/
      }
    });
  };
});