/**
 * @Created by chenlin chenlin2@yusys.com.cn on 2019-2-18 17:55:09.
 * @updated by
 * @description 订单管理
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('ORDER_STATE,COMMODITY_TYPE,CUST_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '/api/loyacorderlist/query',
          highlidght: true,
          formdata: {},
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          dialogVisibleTrack: false,
          formdataTrack: {},
          trackShow: true,
          tabModel: 'first',
          dialogVisibleOff: false,
          formdataOff: {},
          tableRow: {},
          Retitle: ''
        };
      },
      methods: {
        orderShowFn: function () {
          var _this = this;
          _this.orderShow = true;
          _this.trackShow = false;
        },
        trackShowFn: function () {
          var _this = this;
          _this.orderShow = false;
          _this.trackShow = true;
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
          _this.dialogVisibleTrack = false;
          _this.dialogVisibleOff = false;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: '/order/example/save',
            data: model,
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$message('操作成功');
              _this.dialogVisible = false;
            }
          });
        },
        /**
         * 保存物流信息
         */
        saveTrackFn: function () {
          var _this = this;
          var data = {};
          yufp.clone(_this.formdataTrack, data);
          data.orderState = '2';
          yufp.service.request({
            method: 'POST',
            url: '/api/loyacorderlist/orderout',
            data: data,
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.$refs.refTable.remoteData();
                _this.dialogVisibleTrack = false;
                _this.$message({message: response.message});
              } else {
                _this.$message({message: response.message, type: 'warning'});
              }
            }
          });
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
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
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
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
          });
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
        /**
         * 出货
         */
        outFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].orderState != '1') {
            _this.$message({ message: '订单不是待出货状态', type: 'warning' });
            return;
          }
          _this.dialogVisibleTrack = true;
          if (selections[0].commodityType == 'V') {
            _this.trackShow = false;
          } else {
            _this.trackShow = true;
          }
          _this.$nextTick(function () {
            _this.$refs.refFormTrack.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdataTrack);
          });
          // var data = {};
          // data.orderNumber = selections[0].orderNumber;
          // data.commodityCode = selections[0].commodityCode;
          // data.commodityType = selections[0].commodityType;
          // data.commodityNumber = selections[0].commodityNumber;
          // data.orderState = '2';
          // yufp.service.request({
          //   method: 'POST',
          //   url: '/api/loyacorderlist/orderout',
          //   data: data,
          //   callback: function (code, message, response) {
          //     if (response.code == 0) {
          //       _this.$refs.refTable.remoteData();
          //       _this.$message({message: response.message});
          //     } else {
          //       _this.$message({message: response.message, type: 'warning'});
          //     }
          //   }
          // });
        },
        /**
         * 退货保存
         */
        saveOffFn: function () {
          var _this = this;
          var row = _this.tableRow;
          if (_this.Retitle == '换货') {
            yufp.service.request({
              method: 'POST',
              url: '/api/loyacorderlist/orderback',
              data: {orderNumber: row.orderNumber, orderState: '4', reason: _this.formdataOff.orderExcReason},
              callback: function (code, message, response) {
                if (response.code == 0) {
                  _this.$message({message: response.message});
                  _this.$refs.refTable.remoteData();
                  _this.dialogVisibleOff = false;
                }
              }
            });
          } else if (_this.Retitle == '关闭') {
            yufp.service.request({
              method: 'POST',
              url: '/api/loyacorderlist/orderback',
              data: {orderNumber: row.orderNumber, orderState: '6', reason: _this.formdataOff.orderOffReason},
              callback: function (code, message, response) {
                if (response.code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.dialogVisibleOff = false;
                  _this.$message({message: response.message});
                }
              }
            });
          } else {
            _this.$message('选择错误');
            _this.dialogVisibleOff = false;
          }
        },
        /**
         * 退货
         */
        backFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].orderState != '2') {
            _this.$message({ message: '订单不是出货状态', type: 'warning' });
            return;
          }
          _this.$nextTick(function () {
            _this.Retitle = '换货';
            _this.dialogVisibleOff = true;
            _this.tableRow = selections[0];
            _this.$refs.refFormOff.resetFields();
          });
        },
        /**
         * 关闭
         */
        offFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].orderState != '5') {
            _this.$message({ message: '订单不是完成状态', type: 'warning' });
            return;
          }
          _this.$nextTick(function () {
            _this.Retitle = '关闭';
            _this.dialogVisibleOff = true;
            _this.tableRow = selections[0];
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
          if (selections[0].orderState != '1' && selections[0].orderState != '3') {
            _this.$message({ message: '订单不是待出货状态', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].orderNumber);
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '/api/loyacorderlist/orderdel',
                  data: {
                    ids: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        }
      }
    });
  };
});