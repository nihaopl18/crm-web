/**
 * @Created by geyun geyun@yusys.com.cn on 2019-2-20 15:02:42.
 * @updated by
 * @description 产品部门关联管理
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  'libs/js-xlsx/xlsx.full.min.js'
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
        return {
          isTrue: false,
          isProd: true,
          isDpt: true,
          paramsInfo: {}, // 产品放大镜参数
          // 查询url
          dataUrl: backend.yuspClimpProdService + '/api/loypdproddptrelative/querylist',
          accountNoDataUrl: backend.yuspClimpActyService + '/api/ruleinfo/queryscoreaccount', // 积分账户查询url
          // 表单数据
          formdata: {},
          // 是否可见
          dialogVisible: false,
          // 弹窗标题
          viewTitle: ''
        };
      },
      methods: {
        // 日期格式化
        dateFormatter: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined || datetime === null) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d} {h}:{i}:{s}');
        },
        // 日期格式化(年月日)
        dateFormatterSimple: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined || datetime === null) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var product = _this.formdata.productId.substring(0, 6);
          var acctId = _this.formdata.accountId;
          if (product === 'VRTTXN' && acctId === '') {
            _this.$message({ message: '渠道实时交易类产品必须选择积分账户', type: 'warning' });
            return;
          }
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          var orgid = yufp.session.org.id;
          yufp.clone(_this.formdata, model);
          if (_this.viewTitle === '新增') {
            model['createOrg'] = orgid;
            model['updateOrg'] = orgid;
          } else {
            model['updateOrg'] = orgid;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: _this.viewTitle === '修改' ? backend.yuspClimpProdService + '/api/loypdproddptrelative/updateloypdproddptrelative' : backend.yuspClimpProdService + '/api/loypdproddptrelative/addloypdproddptrelative',
            data: model,
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$message('操作成功');
              _this.dialogVisible = false;
            }
          });
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType) {
          var _this = this;
          _this.isTrue = false;
          _this.viewTitle = viewType;
          _this.dialogVisible = true;
          _this.formDisabled = true;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.dialogVisible = true;
          _this.isTrue = false;
          _this.switchStatus('新增');
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogVisible = true;
          _this.isTrue = true;
          _this.switchStatus('修改');
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
            _this.formdata.dptCde.value = obj.dptCde;
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.yuspClimpProdService + '/api/loypdproddptrelative/deleteloypdproddptrelative',
                  data: {
                    relativeId: _this.$refs.refTable.selections[0].relativeId
                  },
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        selectProdbackFn: function (data) {
          var _this = this;
          _this.formDisabled = false;
          _this.isTrue = false;
          _this.isProd = true;
          _this.nowformInfo;
          _this.formdata.productId = data[0].productId;
        //  }
        },
        selectDptbackFn: function (data) {
          var _this = this;
          _this.formDisabled = false;
          _this.isTrue = false;
          _this.isDpt = true;
          _this.nowformInfo;
          _this.formdata.dptCde = data[0].dptCde;
        //  }
        },
        selectAccountbackFn: function (data) {
          var _this = this;
          _this.formdata.accountId = data;
        }
      }
    });
  };
});