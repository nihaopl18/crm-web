/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-1-22 09:48:59.
 * @updated by
 * @description 交易对手信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发 尼玛
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    var othsideAcct = '';
    yufp.lookup.reg('CD0238,CD0064,CD0401,CD0063,CD0355,CD0016,CD0011,CD0304,CD0330,CD0071,CD0431');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custpersonService + '/api/acrmfagtranrivalinfo/querylist/' + custId,
          // transDetailDataUrl: backend.custpersonService + '/api/acrmfagtranrivallist/querylist/' + custId,
          transDataUrl: backend.custpersonService + '/api/acrmfevtpresavelist/querylist',

          activeName: 'rivalInfo',
          queryFormdata1: {},
          formdata: {},
          viewType: 'DETAIL',
          saveDialogVisible: false,
          transDialogVisible: false,
          // transDetailDialogVisible: false,
          formDisabled: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true
        };
      },
      methods: {
        /**
         * 交易对手详情返回
         */
        savecancelFn: function () {
          var _this = this;
          _this.saveDialogVisible = false;
        },
        handleClick: function () {

        },
        /**
         * 交易对手信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this.saveDialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 交易对手详情
         */
        rivalinfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.rivalInfoTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.saverefForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        },
        /**
         * 交易对手交易明细
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        // switchStatus2: function (viewType, editable) {
        //   var _this = this;
        //   _this.viewType = viewType;
        //    _this.transDetailBtnShow = editable;
        //    _this.transDetailDialogVisible = true;
        //   _this.formDisabled = editable;
        // },
        /**
       * 交易对手交易明细
       */
        // transDetail: function () {
        //   var _this = this;
        //   var selectionsAry = _this.$refs.rivalInfoTable.selections;
        //   if (selectionsAry.length != 1) {
        //     _this.$message({ message: '请先选择一条记录', type: 'warning' });
        //     return;
        //   }
        //   _this.switchStatus2('TRANS', false);
        //   _this.$nextTick(function () {
        //     _this.$refs.transDetailTable.resetFields();
        //     yufp.clone(selectionsAry[0], this.formdata);
        //   });
        // },
        /**
         * 交易对手存款交易流水信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus3: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.transBtnShow = editable;
          _this.transDialogVisible = true;
          _this.formDisabled = editable;
        },
        /**
         * 交易对手存款交易流水
         */
        transList: function () {
          var _this = this;
          var selectionsAry = _this.$refs.rivalInfoTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          othsideAcct = selectionsAry[0].othsideAcct;
          _this.switchStatus3('TRANS', false);
          // _this.$nextTick(function () {
          //   var param = {
          //     condition: JSON.stringify({
          //       acctId: othsideAcct
          //     })
          //   };
          //   _this.$refs.transTable.remoteData(param);
          // });
        },
        searchFn1: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.queryFormdata1, model);
          model.othsideAcct = othsideAcct;
          if (_this.queryFormdata1.startTM == '' || _this.queryFormdata1.startTM == undefined || _this.queryFormdata1.startTM == null) {
            _this.$message('时间不能为空');
            return;
          }
          if (_this.queryFormdata1.endTM == '' || _this.queryFormdata1.endTM == undefined || _this.queryFormdata1.endTM == null) {
            _this.$message('时间不能为空');
            return;
          }
          var month = (_this.queryFormdata1.startTM.getMonth() + 1) < 10 ? '0' + (_this.queryFormdata1.startTM.getMonth() + 1) : _this.queryFormdata1.startTM.getMonth() + 1;
          var day = _this.queryFormdata1.startTM.getDate() < 10 ? '0' + _this.queryFormdata1.startTM.getDate() : _this.queryFormdata1.startTM.getDate();
          var endTM = _this.queryFormdata1.startTM.getFullYear() + 1 + '-' + month + '-' + day;
          var endTM1 = yufp.util.dateFormat(_this.queryFormdata1.endTM, '{y}-{m}-{d}');
          if (endTM1 > endTM) {
            _this.$message('时间跨度最长为一年');
            return;
          }
          var param = {
            condition: JSON.stringify(model)
          };
          _this.$refs.transTable.remoteData(param);
        },
        resetMainFn1: function () {
          this.$refs.transForm.resetFields();
        },
        exportFn1: function () {
          var _this = this;
          // 导出参数
          var model = {};
          yufp.clone(_this.queryFormdata1, model);
          model.othsideAcct = othsideAcct;
          if (_this.queryFormdata1.startTM == '' || _this.queryFormdata1.startTM == undefined || _this.queryFormdata1.startTM == null) {
            _this.$message('时间不能为空');
            return;
          }
          if (_this.queryFormdata1.endTM == '' || _this.queryFormdata1.endTM == undefined || _this.queryFormdata1.endTM == null) {
            _this.$message('时间不能为空');
            return;
          }
          var month = (_this.queryFormdata1.startTM.getMonth() + 1) < 10 ? '0' + (_this.queryFormdata1.startTM.getMonth() + 1) : _this.queryFormdata1.startTM.getMonth() + 1;
          var day = _this.queryFormdata1.startTM.getDate() < 10 ? '0' + _this.queryFormdata1.startTM.getDate() : _this.queryFormdata1.startTM.getDate();
          var endTM = _this.queryFormdata1.startTM.getFullYear() + 1 + '-' + month + '-' + day;
          var endTM1 = yufp.util.dateFormat(_this.queryFormdata1.endTM, '{y}-{m}-{d}');
          if (endTM1 > endTM) {
            _this.$message('时间跨度最长为一年');
            return;
          }
          model.export = '1';
          var param = {
            condition: JSON.stringify(model)
          };
          yufp.util.exportExcelByTable({
            fileName: '对公存款交易流水',
            importType: 'service', // page当前页 selected 选中的数据  service 后端数据,selected为所选择的数据，此时不需要访问后台数据
            ref: _this.$refs.transTable,
            url: backend.custpersonService + '/api/acrmfevtpresavelist/querylist',
            param: param
          });
        }
      }
    });
  };
});