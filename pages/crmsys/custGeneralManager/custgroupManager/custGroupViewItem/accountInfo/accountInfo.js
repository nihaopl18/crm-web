/**
 * @created by houyx3
 * @since 2018/07/06.
 * @description 客户群账户信息
 */
define(function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  exports.ready = function (hashCode, data, cite) {
    var clientInfo = data.clientInfo;
    yufp.lookup.reg('CLIENT_ORIGIN,CLIENT_TYPE,SHARED_SCOPE,IDENT_TYPE,CD0435,CD0244,CD0071,CUST_FLAG,CD0355,CD0357,CD0358,CD0315,CD0179');
    yufp.custom.vue({
      el: '#accountInfo',
      data: function () {
        var _this = this;
        return {
          // 交易流水
          // runningAccount:[
          //   { prop: 'openDate', label: '开户日期', type: 'input'},
          //   { prop: 'depositName', label: '账户名称', type: 'input'},
          //   { prop: 'openingBank', label: '开户网点', type: 'input'},
          //   { prop: 'currency', label: '币种', type: 'input'},
          //   { prop: 'balance', label: '余额', type: 'input'},
          //   { prop: 'avebalance', label: '年日均余额', type: 'input'},
          //   { prop: 'depositID', label: '账户', type: 'input'}
          // ],

          // 账户信息
          // 存款信息
          depositInfo: [
            { prop: 'custId', label: '客户编号', width: '100', type: 'input'},
            { prop: 'custName', label: '客户名称', width: '120', type: 'input'},
            {
              prop: 'openDate',
              label: '开户日期',
              type: 'input',
              width: '100',
              formatter: function (row, cloumn) {
                return yufp.util.dateFormat(row.openDate, '{y}-{m}-{d}');
              }
            },
            { prop: 'acctId', label: '账号', width: '150', type: 'input' },
            { prop: 'acctType', label: '账户类型', type: 'select', dataCode: 'CD0244', width: '110'},
            { prop: 'openBrchNo', label: '开户网点编号', type: 'input', width: '100' },
            { prop: 'orgName', label: '开户网点名称', type: 'input', width: '120' },
            { prop: 'currCd', label: '币种', type: 'select', dataCode: 'CD0071' },
            { prop: 'acctBal', label: '余额', width: '100', type: 'input' },
            { prop: 'term', label: '存期', type: 'input', width: '100' },
            { prop: 'baseRate', label: '执行利率(%)', type: 'input', width: '100' },
            { prop: 'acctAvgBalThree', label: '近三个月日均余额', type: 'input', width: '120' },
            { prop: 'acctAvgBalSix', label: '近六个月日均余额', type: 'input', width: '120' },
            { prop: 'lyYearAvgBal', label: '上年日均余额', type: 'input', width: '100' },
            { prop: 'yearAvgBal', label: '本年日均余额', type: 'input', width: '100' },
            { prop: 'acctNo', label: '主账号', type: 'input', width: '150' },
            { prop: 'cardId', label: '卡号', type: 'input', width: '150' },
            // { prop: 'depositID', label: '账户状态', type: 'input'}
            { prop: 'acctStat', label: '账户状态', type: 'select', dataCode: 'CD0435' }
          ],

          // 存款详情页面
          depositDetails: [{
            columnCount: 2,
            fields: [
              {
                label: '开户日期',
                field: 'openDate',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }],
                type: 'input'
              },
              {
                label: '账户名称',
                field: 'custName',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }],
                type: 'input'
              },
              { label: '开户网点', field: 'orgName', type: 'input' },
              { label: '币种', field: 'currCd', type: 'select', dataCode: 'CD0071' },
              { label: '余额', field: 'acctBal', type: 'input' },
              { label: '年日均余额', field: 'yearAvgBal', type: 'input' },
              { label: '账户', field: 'acctId', type: 'input' }
            ]
          }],
          // 存款交易流水
          depositRunningInfo: [
            { prop: 'custId', label: '客户编号', type: 'input'},
            { prop: 'accountName', label: '账户名称', type: 'input'},
            { prop: 'organizationID', label: '机构编号', type: 'input'},
            { prop: 'clientID', label: '客户编号', type: 'input'},
            { prop: 'depositID', label: '账号', type: 'input'},
            { prop: 'currency', label: '对手账号', type: 'input'},
            { prop: 'opponentName', label: '对手账号名称', type: 'input'},
            { prop: 'borrowingMarks', label: '借贷标志', type: 'input'},
            { prop: 'transactionChannel', label: '交易渠道', type: 'input'},
            { prop: 'currency', label: '币种', type: 'input'},
            { prop: 'dealSum', label: '交易金额', type: 'input'},
            { prop: 'accountBalance', label: '账号余额', type: 'input'},
            { prop: 'dealDate', label: '交易日期', type: 'input'},
            { prop: 'dealTime', label: '交易时间', type: 'input'},
            { prop: 'dealTeller', label: '交易柜员', type: 'input'},
            { prop: 'dealDigest', label: '交易摘要', type: 'input'},
            { prop: 'dataDate', label: '数据日期', type: 'input'},
            { prop: 'agent', label: '经办人', type: 'input'},
            { prop: 'cost', label: '费用', type: 'input'},
            { prop: 'bookDate', label: '记账日', type: 'input'},
            { prop: 'dealType', label: '交易类型', type: 'input'},
            { prop: 'contactType', label: '来往类型', type: 'input'},
            { prop: 'moneyMark', label: '钞汇标志', type: 'input'}
          ],
          // 贷款信息
          loansInfo: [
            { prop: 'custId', label: '客户编号', type: 'input', width: '120'},
            { prop: 'custName', label: '客户名称', width: '120', type: 'input'},
            { prop: 'contrNo', label: '合同号', type: 'input', width: '200'},
            { prop: 'debentureNo', label: '借据号', type: 'input', width: '170'},
            { prop: 'prodTypeCd', label: '产品类型', type: 'input', width: '100', dataCode: 'CD0179'},
            { prop: 'loanAcctId', label: '账户', type: 'input', width: '140'},
            { prop: 'acctType', label: '账户类型', type: 'input', width: '80'},
            { prop: 'openOrgName', label: '开户网点名', type: 'input', width: '120'},
            { prop: 'ccyCd', label: '币种', type: 'input', width: '80', dataCode: 'CD0071'},
            { prop: 'baseRate', label: '基准利率(%)', type: 'input', width: '100'},
            { prop: 'fixedRate', label: '执行利率(%)', type: 'input', width: '100'},
            { prop: 'contrAmt', label: '合同金额', type: 'input', width: '90'},
            { prop: 'contrAmtRmb', label: '合同金额(折人民币)', type: 'input', width: '140'},
            { prop: 'drawAmt', label: '发放金额', type: 'input', width: '90'},
            { prop: 'drawAmtRmb', label: '发放金额(折人民币)', type: 'input', width: '140'},
            { prop: 'loanBal', label: '贷款余额', type: 'input', width: '90'},
            { prop: 'loanBalRmb', label: '贷款余额(折人民币)', type: 'input', width: '141'},
            { prop: 'yearAvgRegularBal', label: '年日均', type: 'input', width: '80'},
            { prop: 'riskCategCd', label: '五级分类', type: 'input', width: '100', dataCode: 'CD0315'}
          ],
          // 贷款详情页面
          loansDetails: [{
            columnCount: 2,
            fields: [
              {label: '贷款账号',
                field: 'loanAcctId',
                type: 'input'
              },
              {label: '借据编号', field: 'debentureNo', type: 'input'},
              {label: '基准利率（%）', field: 'baseRate', type: 'input'},
              {label: '执行利率（%）', field: 'fixedRate', type: 'input'},
              {label: '机构名称', field: 'openOrgName', type: 'input'},
              {label: '公私标志', field: 'orgOrPerFlag', type: 'select', dataCode: 'CUST_FLAG'},
              {label: '产品名称', field: 'prodName', type: 'input'},
              {label: '渠道', field: 'comesFrom', type: 'select', dataCode: 'CD0355'},
              {label: '币种', field: 'ccyCd', type: 'select', dataCode: 'CD0071'},
              {label: '当前本金金额', field: 'prinAmt', type: 'input'},
              {label: '欠息金额', field: 'debIntrBal', type: 'input'},
              {label: '保证金', field: 'marginAmt', type: 'input'},
              {label: '合同编号', field: 'contrNo', type: 'input'},
              {label: '合同起始日',
                field: 'contrStartDt',
                type: 'input',
                formatter: function (row, cloumn) {
                  return yufp.util.dateFormat(row.contrStartDt, '{y}-{m}-{d}');
                }},
              {label: '合同到期日',
                field: 'contrEndDt',
                type: 'input',
                formatter: function (row, cloumn) {
                  return yufp.util.dateFormat(row.contrEndDt, '{y}-{m}-{d}');
                }},
              {label: '还款账号/卡号', field: 'repayAcctId', type: 'input'},
              {label: '担保方式', field: 'mainSuretyModeCd', type: 'select', dataCode: 'CD0357'},
              {label: '押品名称', field: 'collateralTypeC', type: 'input'},
              {label: '还款方式', field: 'repayMethCd', type: 'select', dataCode: 'CD0358'}
            ]
          }],
          // 贷款交易流水
          loansRunningInfo: [
            { prop: 'custId', label: '客户编号', type: 'input'},
            { prop: 'accountName', label: '账户名称', type: 'input'},
            { prop: 'organizationID', label: '机构编号', type: 'input'},
            { prop: 'clientID', label: '客户编号', type: 'input'},
            { prop: 'loansID', label: '账号', type: 'input'},
            { prop: 'currency', label: '对手账号', type: 'input'},
            { prop: 'opponentName', label: '对手账号名称', type: 'input'},
            { prop: 'borrowingMarks', label: '借贷标志', type: 'input'},
            { prop: 'transactionChannel', label: '交易渠道', type: 'input'},
            { prop: 'currency', label: '币种', type: 'input'},
            { prop: 'dealSum', label: '交易金额', type: 'input'},
            { prop: 'accountBalance', label: '账号余额', type: 'input'},
            { prop: 'dealDate', label: '交易日期', type: 'input'},
            { prop: 'dealTime', label: '交易时间', type: 'input'},
            { prop: 'dealTeller', label: '交易柜员', type: 'input'},
            { prop: 'dealDigest', label: '交易摘要', type: 'input'},
            { prop: 'dataDate', label: '数据日期', type: 'input'},
            { prop: 'agent', label: '经办人', type: 'input'},
            { prop: 'cost', label: '费用', type: 'input'},
            { prop: 'bookDate', label: '记账日', type: 'input'},
            { prop: 'dealType', label: '交易类型', type: 'input'},
            { prop: 'contactType', label: '来往类型', type: 'input'},
            { prop: 'moneyMark', label: '钞汇标志', type: 'input'}
          ],
          // 存款，贷款，贷款交易流水，存款交易流水url链接
          depositUrl: backend.adminService + '/api/allcust/memberdeposit',
          // TODO 从前面的页面将客户群ID传值过来
          depositParam: {condition: JSON.stringify({groupId: clientInfo.custGroupId})},
          loansUrl: backend.adminService + '/api/allcust/memberloan',
          loanParam: {condition: JSON.stringify({groupId: clientInfo.custGroupId})},
          loansRunningInfoUrl: '/loans/temp/loansRunningInfo',
          depositRunningInfoUrl: '/deposit/temp/depositRunningInfo',
          activeName: 'first', // 配置tag页面为空时默认显示页面
          // 设置页面存款详情框，贷款详情框，存款交易流水框，贷款交易流水框不显示，弹出框显示类型为详情
          depositdialogVisible: false,
          loansdialogVisible: false,
          depositdialogVisible1: false,
          loansdialogVisible1: false,
          viewType: 'DETAIL'
        };
      },
      methods: {
        /**
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
        },
        // 存款详情
        depositDetailsInfo: function () {
          if (this.$refs.deposit.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('DETAIL', false);
          this.depositdialogVisible = true;
          this.$nextTick(function () {
            this.$refs.deposit.selections[0].openDate = yufp.util.dateFormat(this.$refs.deposit.selections[0].openDate, '{y}-{m}-{d}');
            yufp.extend(this.$refs.depositRef.formModel, this.$refs.deposit.selections[0]);
          });
        },
        // 存款交易流水
        depositRunningAccountBtn: function () {
          if (this.$refs.deposit.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          };
          var depositid = this.$refs.deposit.selections[0].depositID;
          var param = { condition: JSON.stringify({'depositID': depositid}) };
          this.depositdialogVisible1 = true;
          this.$nextTick(function () {
            this.$refs.depositRunning.remoteData(param);
          });
        },
        // 贷款详情
        loansDetailsInfo: function () {
          if (this.$refs.loans.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('DETAIL', false);
          this.loansdialogVisible = true;
          this.$nextTick(function () {
            yufp.extend(this.$refs.loansRef.formModel, this.$refs.loans.selections[0]);
          });
        },
        // 贷款交易流水
        loansRunningAccountBtn: function () {
          if (this.$refs.loans.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          };
          var loansid = this.$refs.loans.selections[0].loansID;
          var param = { condition: JSON.stringify({'loansID': loansid}) };
          this.loansdialogVisible1 = true;
          this.$nextTick(function () {
            this.$refs.loansRunning.remoteData(param);
          });
        }
      }
    });
  };
});