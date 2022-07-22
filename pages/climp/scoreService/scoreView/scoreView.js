/**
 * @Created by panglx panglx@yusys.com.cn on 2019-1-2 15:06:28.
 * @updated by
 * @description 客户积分视图
 */
define([
  'pages/climp/scoreService/scoreView/scoreView.css'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0011,CD0007,CD0010,TRAN_CODE,TRANS_STATE,EX_SERIAL,CD0033');
    var selections = data.selections;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          // dataUrl: '/trade/example/list',
          scoreAccoutDataUrl: backend.yuspClimpViewService + '/api/custview/custaccountinfo', // 积分账户信息查询
          accountDetailDataUrl: backend.yuspClimpViewService + '/api/custview/custaccountdetail', // 账户明细查询
          addScoreDataUrl: backend.yuspClimpViewService + '/api/custview/addintegdetail', // 加分明细信息查询
          // subtractScoreDataUrl: backend.yuspClimpViewService + '/api/custview/subintegdetail', // 减分分明细信息查询
          // origTradeDataUrl: backend.yuspClimpViewService + 'api/custview/originaltransinfo', // 原始交易信息查询
          tabName: 'custBaseInfo', // 选中选项卡的 name
          custBaseFormData: {}, // 客户基本信息表单数据
          iScoreFormData: {}, // 综合积分表单数据
          params: {
            condition: JSON.stringify({custId: selections.custId})
          },
          activeNames: ['1', '2'], // 交易详情中需要展开的面板
          scoreAccoutDialogVisible: false, // 积分账户弹出框
          tradeDetailDialogVisible: false, // 交易详情弹出框
          waitTitle: '待积流水表', // 待积流水表名称s
          addScoreFormData: {}, // 加分明细搜索表单数据
          subtractScoreFormData: {}, // 减分明细搜索表单数据
          origTradeFormData: {}, // 原始交易搜索表单数据
          queryTableFormData: {}, // 待积流水表表单数据
          tableDatalist: [], // 表格和字段配置信息data数组
          formItems: [], // 待积流水表表单form-item储存
          hitRulesFormData: {}, // 交易详情命中规则表单数据
          addPickerOptionsStart: { // 加分明细设置交易开始时间小于交易结束时间
            disabledDate: function (time) {
              var beginDateVal = _this.addScoreFormData.jyDateEnd;
              if (beginDateVal) {
                return time.getTime() > beginDateVal;
              }
            }
          },
          addPickerOptionsEnd: { // 加分明细设置交易结束时间大于交易开始时间
            disabledDate: function (time) {
              var beginDateVal = _this.subtractScoreFormData.jyDateStart;
              if (beginDateVal) {
                return time.getTime() < beginDateVal;
              }
            }
          },
          subtractPickerOptionsStart: { // 减分明细设置交易开始时间小于交易结束时间
            disabledDate: function (time) {
              var beginDateVal = _this.subtractScoreFormData.jyDateEnd;
              if (beginDateVal) {
                return time.getTime() > beginDateVal;
              }
            }
          },
          subtractPickerOptionsEnd: { // 减分明细设置交易结束时间大于交易开始时间
            disabledDate: function (time) {
              var beginDateVal = _this.subtractScoreFormData.jyDateStart;
              if (beginDateVal) {
                return time.getTime() < beginDateVal;
              }
            }
          },
          origTradePickerOptionsStart: { // 原始交易设置交易开始时间小于交易结束时间
            disabledDate: function (time) {
              var beginDateVal = _this.origTradeFormData.jyDateEnd;
              if (beginDateVal) {
                return time.getTime() > beginDateVal;
              }
            }
          },
          origTradePickerOptionsEnd: { // 原始交易设置交易结束时间大于交易开始时间
            disabledDate: function (time) {
              var beginDateVal = _this.origTradeFormData.jyDateStart;
              if (beginDateVal) {
                return time.getTime() < beginDateVal;
              }
            }
          }
        };
      },
      mounted: function () {
        // 初始化加载表单数据
        var _this = this;
        yufp.clone(selections, _this.custBaseFormData); // 加载客户基本信息表单数据
        yufp.clone(selections, _this.iScoreFormData); // 加载综合积分表单数据
        // 原始交易详情表单字段查询数据储存
        yufp.service.request({
          method: 'GET',
          url: backend.yuspClimpViewService + '/api/custview/querytableandcolumn',
          callback: function (code, message, response) {
            if (code == 0 && response.data != null) {
              _this.tableDatalist = response.data;
            }
          }
        });
      },
      methods: {
        /**
        * 积分账户明细查看
        */
        accountListFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refScoreAccoutTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }

          _this.scoreAccoutDialogVisible = true;
          _this.$nextTick(function () {
            var param = {
              condition: JSON.stringify({
                accountNo: selectionsAry[0].accountNo
              })
            };
            _this.$refs.refAccountDetailTable.remoteData(param);
            _this.$refs.refAccountDetailTable.resetFields();
          });
        },
        /**
        * 原始交易详情点击
        */
        origTradeinfoFn: function () {
          var _this = this;
          _this.formItems = [];
          var selectionsAry = _this.$refs.refOrigTradeTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          // 动态加载待积流水表字段
          var tableId = selectionsAry[0].consumerSeqNo;
          var sourceTable = selectionsAry[0].sourceTable;

          var fieldsInfo = [];
          var len = _this.tableDatalist.length;
          for (var i = 0; i < len; i++) {
            // todo tableId的值待确定
            if (sourceTable == _this.tableDatalist[i].tableEName) {
              fieldsInfo = _this.tableDatalist[i].columns;
              _this.waitTitle = _this.tableDatalist[i].tableCName;
              break;
            }
          };
          for (var i = 0, len1 = fieldsInfo.length; i < len1; i++) {
            var option = {};
            option.name = fieldsInfo[i].fieldEName;
            option.label = fieldsInfo[i].fieldCName;
            _this.formItems.push(option);
          }
          // 回显待积流水表表单数据
          yufp.service.request({
            method: 'GET',
            url: backend.yuspClimpViewService + '/api/custview/originaltransdetail',
            data: {
              consumerSeqNo: tableId,
              sourceTable: sourceTable
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.tradeDetailDialogVisible = true;
                _this.$nextTick(function () {
                  _this.$refs.refQueryTableForm.resetFields();
                  _this.$refs.refRuleForm.resetFields();
                  yufp.clone(selectionsAry[0], _this.hitRulesFormData); // 回显命中规则情况表单
                  yufp.clone(response.data, _this.queryTableFormData);
                });
              }
            }
          });
        },
        /**
       * 取消
      */
        cancelFn: function () {
          var _this = this;
          _this.tradeDetailDialogVisible = false;
        }
      }
    });
  };
});