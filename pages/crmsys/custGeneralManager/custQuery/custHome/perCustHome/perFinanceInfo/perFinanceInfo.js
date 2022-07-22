/**
 * @Created by 马妍 mayan2@yusys.com.cn on 2019-2-13 18:01:12.
 * @updated by
 * @description 财务信息
 */
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
    * 页面加载完成时触发
    * @param hashCode 路由ID
    * @param data 传递数据对象
    * @param cite 页面站点信息
    */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0242,CD0071,CD0289,CD0381,CD0069,CD0376,CD0377,CD0378,CD0126,CD0379,CD0380');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          addBtn: !yufp.session.checkViewCtrl('add1', data.id),
          editBtn: !yufp.session.checkViewCtrl('edit1', data.id),
          deleteBtn: !yufp.session.checkViewCtrl('delete1', data.id),
          addBtn2: !yufp.session.checkViewCtrl('add2', data.id),
          editBtn2: !yufp.session.checkViewCtrl('edit2', data.id),
          deleteBtn2: !yufp.session.checkViewCtrl('delete2', data.id),
          addBtn3: !yufp.session.checkViewCtrl('add3', data.id),
          editBtn3: !yufp.session.checkViewCtrl('edit3', data.id),
          deleteBtn3: !yufp.session.checkViewCtrl('delete3', data.id),
          addBtn4: !yufp.session.checkViewCtrl('add4', data.id),
          editBtn4: !yufp.session.checkViewCtrl('edit4', data.id),
          deleteBtn4: !yufp.session.checkViewCtrl('delete4', data.id),
          addBtn5: !yufp.session.checkViewCtrl('add5', data.id),
          editBtn5: !yufp.session.checkViewCtrl('edit5', data.id),
          deleteBtn5: !yufp.session.checkViewCtrl('delete5', data.id),
          addBtn6: !yufp.session.checkViewCtrl('add6', data.id),
          editBtn6: !yufp.session.checkViewCtrl('edit6', data.id),
          deleteBtn6: !yufp.session.checkViewCtrl('delete6', data.id),
          addBtn7: !yufp.session.checkViewCtrl('add7', data.id),
          editBtn7: !yufp.session.checkViewCtrl('edit7', data.id),
          deleteBtn7: !yufp.session.checkViewCtrl('delete7', data.id),
          addBtn8: !yufp.session.checkViewCtrl('add8', data.id),
          editBtn8: !yufp.session.checkViewCtrl('edit8', data.id),
          deleteBtn8: !yufp.session.checkViewCtrl('delete8', data.id),
          addBtn9: !yufp.session.checkViewCtrl('add9', data.id),
          editBtn9: !yufp.session.checkViewCtrl('edit9', data.id),
          deleteBtn9: !yufp.session.checkViewCtrl('delete9', data.id),
          addBtn0: !yufp.session.checkViewCtrl('add0', data.id),
          editBtn0: !yufp.session.checkViewCtrl('edit0', data.id),
          deleteBtn0: !yufp.session.checkViewCtrl('delete0', data.id),
          expandCollapseName: ['finance'],
          financeformdata: {},
          financeformdata1: '',
          investformdata: {},
          investformdata1: '',
          incomeformdata: {},
          incomeformdata1: '',
          famformdata: {},
          famformdata1: '',
          assformdata: {},
          assformdata1: '',
          liabiformdata: {},
          liabiformdata1: '',
          insurformdata: {},
          insurformdata1: '',
          payformdata: {},
          payformdata1: '',
          operformdata: {},
          operformdata1: '',
          farmerformdata: {},
          farmerformdata1: '',
          dialogVisible: false, // 财务信息
          ialogVisible: false, // 财务信息
          formDisabled: false, // 财务信息
          viewType: 'DETAIL', // 财务信息
          viewTitle: yufp.lookup.find('CRUD_TYPE', false), // 财务信息
          saveBtnShow: true, // 财务信息
          dataUrl: backend.custpersonService + '/api/pcustfinaview/queryfin/' + custId, // 财务信息查询
          investrefVisible: false, // 信贷客户投资新增修改面板状态
          investrefUrl: backend.custpersonService + '/api/pcustfinaview/getinvestlist/' + custId, // 信贷客户投资信息查询
          incomeVisible: false, // 收入信息新增修改面板状态
          incomeUrl: backend.custpersonService + '/api/pcustfinaview/getincomelist/' + custId, // 收入信息查询
          familyincVisible: false, // 家庭收支信息新增修改面板状态
          familyincUrl: backend.custpersonService + '/api/pcustfinaview/getfamilyinclist/' + custId, // 家庭收支信息查询
          assetsVisible: false, // 资产信息新增修改面板状态
          assetsUrl: backend.custpersonService + '/api/pcustfinaview/getassetslist/' + custId, // 资产信息查询
          liabiVisible: false, // 负债信息新增修改面板状态
          liabiUrl: backend.custpersonService + '/api/pcustfinaview/getLiabilist/' + custId, // 负债信息查询
          insurVisible: false, // 保险信息新增修改面板状态
          insurUrl: backend.custpersonService + '/api/pcustfinaview/getinsurlist/' + custId, // 保险信息查询
          payVisible: false, // 纳税信息新增修改面板状态
          payUrl: backend.custpersonService + '/api/pcustfinaview/getpaylist/' + custId, // 纳税信息查询
          operVisible: false, // 经营信息新增修改面板状态
          operUrl: backend.custpersonService + '/api/pcustfinaview/getoperlist/' + custId, // 经营信息查询
          farmerVisible: false, // 农户生产信息新增修改面板状态
          farmerUrl: backend.custpersonService + '/api/pcustfinaview/getfarmerlist/' + custId, // 农户生产信息查询
          rule: {
            petirePlan: [
              {max: 300, message: '最大长度不超过200个字符', trigger: 'blur' }
            ],
            housePurPlan: [
              {max: 300, message: '最大长度不超过200个字符', trigger: 'blur' }
            ],
            childEduPlan: [
              {max: 300, message: '最大长度不超过200个字符', trigger: 'blur' }
            ],
            assetTotalVal: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            internFinInfo: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            houseInfo: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            oversAsset: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            // 投资
            invName: [
              {max: 70, message: '最大长度不超过70个字符', trigger: 'blur' }
            ],
            invType: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }
            ],
            invCode: [
              {max: 70, message: '最大长度不超过70个字符', trigger: 'blur' }
            ],
            invLegal: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }
            ],
            invAmt: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            invPerc: [
              {validator: yufp.validator.floatMax, message: '请输入正确的数字'}
            ],
            stockPerc: [
              {validator: yufp.validator.floatMax, message: '请输入正确的数字'}
            ],
            invDesc: [
              {max: 150, message: '最大长度不超过150个字符', trigger: 'blur' }
            ],
            invPrjDesc: [
              {max: 150, message: '最大长度不超过150个字符', trigger: 'blur' }
            ],
            workAddr: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            workRange: [
              {max: 150, message: '最大长度不超过150个字符', trigger: 'blur' }
            ],
            remarks: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            // 收入
            surYear: [
              {max: 4, message: '最大长度不超过4个字符', trigger: 'blur' }
            ],
            incomeY: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            salAcctBank: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            remarks1: [
              {max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
            ],
            // 家庭收支
            surYear1: [
              {max: 4, message: '最大长度不超过4个字符', trigger: 'blur' }
            ],
            yearIncome: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            annIncome: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            popuNum: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            laborNum: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            famPerIncome: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            famExpenDesc: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            famExpenAmt: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            assetTotal: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            debtTotal: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            netAsset: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            remark: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            // 资产
            assetUnit: [
              {max: 30, message: '最大长度不超过30个字符', trigger: 'blur' }
            ],
            assetNum: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            assetEval: [
              {validator: yufp.validator.float, message: '请输入整数'}
            ],
            assetDesc: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            assetPurPrice: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            remarks2: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            // 负债
            liabDesc: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            creditor: [
              {max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }
            ],
            liabAmt: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            credCrdNum: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            loanGuarBal: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            remarks3: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            // 保险
            insurNo: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' }
            ],
            insurName: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            insurCom: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            insured: [
              {max: 50, message: '最大长度不超过50个字符', trigger: 'blur' }
            ],
            bfcyMan: [
              {max: 50, message: '最大长度不超过50个字符', trigger: 'blur' }
            ],
            insurTar: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            insurVal: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            insurFee: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            insurTotAmt: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            insurAmt: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            remarks4: [
              {max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
            ],
            // 纳税
            regSeqNo: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }
            ],
            taxNo: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' }
            ],
            surYear2: [
              {max: 4, message: '最大长度不超过4个字符', trigger: 'blur' }
            ],
            taxAmt: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            taxPayAmt: [
              {validator: yufp.validator.float, message: '请输入正确的金额'}
            ],
            remarks5: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            // 经营
            busiName: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            busiCustId: [
              {max: 16, message: '最大长度不超过16个字符', trigger: 'blur' }
            ],
            principal: [
              {max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }
            ],
            prinTelNo: [
              {max: 30, message: '最大长度不超过30个字符', trigger: 'blur' }
            ],
            comType: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' }
            ],
            comScale: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' }
            ],
            comVal: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            regAmt: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            partnerNum: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            empNum: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            mainRange: [
              {max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
            ],
            partRange: [
              {max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
            ],
            unitAddr: [
              {max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }
            ],
            contName: [
              {max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }
            ],
            contTelNo: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' }
            ],
            custPosi: [
              {max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }
            ],
            custStockPert: [
              {validator: yufp.validator.floatMax, message: '请输入正确的数字'}
            ],
            remarks6: [
              {max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
            ],
            // 农户
            regSeqNo1: [
              {max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }
            ],
            surYear3: [
              {max: 4, message: '最大长度不超过4个字符', trigger: 'blur' }
            ],
            prodBusiName: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
            ],
            units: [
              {max: 150, message: '最大长度不超过150个字符', trigger: 'blur' }
            ],
            num: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            incomeY1: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            remarks7: [
              {max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
            ]


          }

        };
      },
      mounted: function () {
        // 反显页面数据
        // this.initPageData();
      },
      methods: {
        /**
         * 财务信息新增按钮
         */
        addfyFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'dialogVisible');
          _this.$nextTick(function () {
            _this.$refs.financeForm.resetFields();
          });
        },
        /**
         * 财务信息修改
         */
        modifyFn: function () {
          var _this = this;
          if (_this.$refs.financeTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'dialogVisible');
          _this.$nextTick(function () {
            _this.$refs.financeForm.resetFields();
            var obj = _this.$refs.financeTable.selections[0];
            yufp.clone(obj, _this.$refs.financeForm.formdata);
          });
        },
        /**
         * 财务信息删除按钮
         */
        delfyFn: function () {
          var _this = this;
          if (_this.$refs.financeTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.financeTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustfinaview/delfinance',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.financeTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable, investrefVisible) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this[investrefVisible] = true;
          _this.formDisabled = !editable;
        },
        /**
         * 财务信息取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 财务信息保存
         */
        saveResumeFn: function () {
          var _this = this;
          var finrefomodel = {};
          yufp.clone(_this.$refs.financeForm.formdata, finrefomodel);
          var validate = false;
          _this.$refs.financeForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustfinaview/updatefinance/' + custId,
            data: {'finrefomodel': finrefomodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                // _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
                _this.$refs.financeTable.remoteData();
              }
            }
          });
        },
        /**
         * 信贷客户投资信息新增按钮
         */
        addInvestrefFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'investrefVisible');
          _this.$nextTick(function () {
            _this.$refs.investrefForm.resetFields();
          });
        },
        /**
         * 信贷客户投资信息修改
         */
        modifyInvestrefFn: function () {
          var _this = this;
          if (_this.$refs.investrefTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'investrefVisible');
          _this.$nextTick(function () {
            _this.$refs.investrefForm.resetFields();
            var obj = _this.$refs.investrefTable.selections[0];
            yufp.clone(obj, _this.$refs.investrefForm.formdata);
          });
        },
        /**
         * 信贷客户投资信息删除按钮
         */
        delInvestrefFn: function () {
          var _this = this;
          if (_this.$refs.investrefTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.investrefTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustfinaview/delinvest',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.investrefTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 信贷客户投资信息取消
         */
        investrefCancelFn: function () {
          var _this = this;
          _this.investrefVisible = false;
        },
        /**
         * 信贷客户投资信息保存
         */
        investrefSaveFn: function () {
          var _this = this;
          var investreffomodel = {};
          yufp.clone(_this.$refs.investrefForm.formdata, investreffomodel);
          var validate = false;
          _this.$refs.investrefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustfinaview/updateinvest/' + custId,
            data: {
              'investreffomodel': investreffomodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.investrefVisible = false;
                _this.$refs.investrefTable.remoteData();
              }
            }
          });
        },

        /**
         * 收入信息新增按钮
         */
        addIncomeFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'incomeVisible');
          _this.$nextTick(function () {
            _this.$refs.incomeForm.resetFields();
          });
        },
        /**
         * 收入信息修改
         */
        modifyIncomeFn: function () {
          var _this = this;
          if (_this.$refs.incomeTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'incomeVisible');
          _this.$nextTick(function () {
            _this.$refs.incomeForm.resetFields();
            var obj = _this.$refs.incomeTable.selections[0];
            yufp.clone(obj, _this.$refs.incomeForm.formdata);
          });
        },
        /**
         * 收入信息删除按钮
         */
        delIncomeFn: function () {
          var _this = this;
          if (_this.$refs.incomeTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.incomeTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustfinaview/delincome',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.incomeTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 收入信息取消
         */
        incomeCancelFn: function () {
          var _this = this;
          _this.incomeVisible = false;
        },
        /**
         * 收入信息保存
         */
        incomeSaveFn: function () {
          var _this = this;
          var incomefomodel = {};
          yufp.clone(_this.$refs.incomeForm.formdata, incomefomodel);
          var validate = false;
          _this.$refs.incomeForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustfinaview/updateincome/' + custId,
            data: {
              'incomefomodel': incomefomodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.incomeVisible = false;
                _this.$refs.incomeTable.remoteData();
              }
            }
          });
        },

        /**
         * 家庭收支信息新增按钮
         */
        addFamilyincFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'familyincVisible');
          _this.$nextTick(function () {
            _this.$refs.familyincForm.resetFields();
          });
        },
        /**
         * 家庭收支信息修改
         */
        modifyFamilyincFn: function () {
          var _this = this;
          if (_this.$refs.familyincTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'familyincVisible');
          _this.$nextTick(function () {
            _this.$refs.familyincForm.resetFields();
            var obj = _this.$refs.familyincTable.selections[0];
            yufp.clone(obj, _this.$refs.familyincForm.formdata);
          });
        },
        /**
         * 家庭收支信息删除按钮
         */
        delFamilyincFn: function () {
          var _this = this;
          if (_this.$refs.familyincTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.familyincTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustfinaview/delfamilyinc',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.familyincTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 家庭收支信息取消
         */
        familyincCancelFn: function () {
          var _this = this;
          _this.familyincVisible = false;
        },
        /**
         * 家庭收支信息保存
         */
        familyincSaveFn: function () {
          var _this = this;
          var familyincfomodel = {};
          yufp.clone(_this.$refs.familyincForm.formdata, familyincfomodel);
          var validate = false;
          _this.$refs.familyincForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustfinaview/updatefamilyinc/' + custId,
            data: {
              'familyincfomodel': familyincfomodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.familyincVisible = false;
                _this.$refs.familyincTable.remoteData();
              }
            }
          });
        },

        /**
         * 资产信息新增按钮
         */
        addAssetsFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'assetsVisible');
          _this.$nextTick(function () {
            _this.$refs.assetsForm.resetFields();
          });
        },
        /**
         * 资产信息修改
         */
        modifyAssetsFn: function () {
          var _this = this;
          if (_this.$refs.assetsTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'assetsVisible');
          _this.$nextTick(function () {
            _this.$refs.assetsForm.resetFields();
            var obj = _this.$refs.assetsTable.selections[0];
            yufp.clone(obj, _this.$refs.assetsForm.formdata);
          });
        },
        /**
         * 资产信息删除按钮
         */
        delAssetsFn: function () {
          var _this = this;
          if (_this.$refs.assetsTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.assetsTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustfinaview/delassets',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.assetsTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 资产信息取消
         */
        assetsCancelFn: function () {
          var _this = this;
          _this.assetsVisible = false;
        },
        /**
         * 资产信息保存
         */
        assetsSaveFn: function () {
          var _this = this;
          var assetsmodel = {};
          yufp.clone(_this.$refs.assetsForm.formdata, assetsmodel);
          var validate = false;
          _this.$refs.assetsForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustfinaview/updateassets/' + custId,
            data: {
              'assetsmodel': assetsmodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.assetsVisible = false;
                _this.$refs.assetsTable.remoteData();
              }
            }
          });
        },

        /**
         * 负债信息新增按钮
         */
        addLiabiFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'liabiVisible');
          _this.$nextTick(function () {
            _this.$refs.liabiForm.resetFields();
          });
        },
        /**
         * 负债信息修改
         */
        modifyLiabiFn: function () {
          var _this = this;
          if (_this.$refs.liabiTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'liabiVisible');
          _this.$nextTick(function () {
            _this.$refs.liabiForm.resetFields();
            var obj = _this.$refs.liabiTable.selections[0];
            yufp.clone(obj, _this.$refs.liabiForm.formdata);
          });
        },
        /**
         * 负债信息删除按钮
         */
        delLiabiFn: function () {
          var _this = this;
          if (_this.$refs.liabiTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.liabiTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustfinaview/delliabi',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.liabiTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 负债信息取消
         */
        liabiCancelFn: function () {
          var _this = this;
          _this.liabiVisible = false;
        },
        /**
         * 负债信息保存
         */
        liabiSaveFn: function () {
          var _this = this;
          var liabimodel = {};
          yufp.clone(_this.$refs.liabiForm.formdata, liabimodel);
          var validate = false;
          _this.$refs.liabiForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustfinaview/updateliabi/' + custId,
            data: {
              'liabimodel': liabimodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.liabiVisible = false;
                _this.$refs.liabiTable.remoteData();
              }
            }
          });
        },

        /**
         * 保险信息新增按钮
         */
        addInsurFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'insurVisible');
          _this.$nextTick(function () {
            _this.$refs.insurForm.resetFields();
          });
        },
        /**
         * 保险信息修改
         */
        modifyInsurFn: function () {
          var _this = this;
          if (_this.$refs.insurTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'insurVisible');
          _this.$nextTick(function () {
            _this.$refs.insurForm.resetFields();
            var obj = _this.$refs.insurTable.selections[0];
            yufp.clone(obj, _this.$refs.insurForm.formdata);
          });
        },
        /**
         * 保险信息删除按钮
         */
        delInsurFn: function () {
          var _this = this;
          if (_this.$refs.insurTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.insurTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustfinaview/delinsur',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.insurTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 保险信息取消
         */
        insurCancelFn: function () {
          var _this = this;
          _this.insurVisible = false;
        },
        /**
         * 保险信息保存
         */
        insurSaveFn: function () {
          var _this = this;
          var insurmodel = {};
          yufp.clone(_this.$refs.insurForm.formdata, insurmodel);
          var validate = false;
          _this.$refs.insurForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustfinaview/updateinsur/' + custId,
            data: {
              'insurmodel': insurmodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.insurVisible = false;
                _this.$refs.insurTable.remoteData();
              }
            }
          });
        },

        /**
         * 纳税信息新增按钮
         */
        addPayFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'payVisible');
          _this.$nextTick(function () {
            _this.$refs.payForm.resetFields();
          });
        },
        /**
         * 纳税信息修改
         */
        modifyPayFn: function () {
          var _this = this;
          if (_this.$refs.payTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'payVisible');
          _this.$nextTick(function () {
            _this.$refs.payForm.resetFields();
            var obj = _this.$refs.payTable.selections[0];
            yufp.clone(obj, _this.$refs.payForm.formdata);
          });
        },
        /**
         * 纳税信息删除按钮
         */
        delPayFn: function () {
          var _this = this;
          if (_this.$refs.payTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.payTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustfinaview/delpay',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.payTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 纳税信息取消
         */
        payCancelFn: function () {
          var _this = this;
          _this.payVisible = false;
        },
        /**
         * 纳税信息保存
         */
        paySaveFn: function () {
          var _this = this;
          var paymodel = {};
          yufp.clone(_this.$refs.payForm.formdata, paymodel);
          var validate = false;
          _this.$refs.payForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustfinaview/updatepay/' + custId,
            data: {
              'paymodel': paymodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.payVisible = false;
                _this.$refs.payTable.remoteData();
              }
            }
          });
        },

        /**
         * 经营信息新增按钮
         */
        addOperFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'operVisible');
          _this.$nextTick(function () {
            _this.$refs.operForm.resetFields();
          });
        },
        /**
         * 经营信息修改
         */
        modifyOperFn: function () {
          var _this = this;
          if (_this.$refs.operTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'operVisible');
          _this.$nextTick(function () {
            _this.$refs.operForm.resetFields();
            var obj = _this.$refs.operTable.selections[0];
            yufp.clone(obj, _this.$refs.operForm.formdata);
          });
        },
        /**
         * 经营信息删除按钮
         */
        delOperFn: function () {
          var _this = this;
          if (_this.$refs.operTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.operTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustfinaview/deloper',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.operTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 经营信息取消
         */
        operCancelFn: function () {
          var _this = this;
          _this.operVisible = false;
        },
        /**
         * 经营信息保存
         */
        operSaveFn: function () {
          var _this = this;
          var opermodel = {};
          yufp.clone(_this.$refs.operForm.formdata, opermodel);
          var validate = false;
          _this.$refs.operForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustfinaview/updateoper/' + custId,
            data: {
              'opermodel': opermodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.operVisible = false;
                _this.$refs.operTable.remoteData();
              }
            }
          });
        },

        /**
         * 农户生产信息新增按钮
         */
        addFarmerFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'farmerVisible');
          _this.$nextTick(function () {
            _this.$refs.farmerForm.resetFields();
          });
        },
        /**
         * 农户生产信息修改
         */
        modifyFarmerrFn: function () {
          var _this = this;
          if (_this.$refs.farmerTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'farmerVisible');
          _this.$nextTick(function () {
            _this.$refs.farmerForm.resetFields();
            var obj = _this.$refs.farmerTable.selections[0];
            yufp.clone(obj, _this.$refs.farmerForm.formdata);
          });
        },
        /**
         * 农户生产信息删除按钮
         */
        delFarmerFn: function () {
          var _this = this;
          if (_this.$refs.farmerTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.farmerTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustfinaview/delfarmer',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.farmerTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 农户生产信息取消
         */
        farmerCancelFn: function () {
          var _this = this;
          _this.farmerVisible = false;
        },
        /**
         * 农户生产信息保存
         */
        farmerSaveFn: function () {
          var _this = this;
          var farmermodel = {};
          yufp.clone(_this.$refs.farmerForm.formdata, farmermodel);
          var validate = false;
          _this.$refs.farmerForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustfinaview/updatefarmer/' + custId,
            data: {
              'farmermodel': farmermodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.farmerVisible = false;
                _this.$refs.farmerTable.remoteData();
              }
            }
          });
        }
        /**
         * 表单初始化数据
         */
        // initPageData: function () {
        //   var _this = this;
        //   yufp.service.request({ // 查询业务数据
        //     method: 'GET',
        //     url: backend.custpersonService + '/api/pcustfinaview/queryfinlist/' + custId, // custId
        //     callback: function (code, message, response) {
        //       if (code == 0) { // code等于0 说明成功
        //         // yufp.extend(_this.$refs.finrefForm.formdata, response.data.finInfo[0]);// 财务信息
        //         // yufp.extend(_this.$refs.investrefForm.formdata, response.data.investInfo[0]);// 投资信息
        //         // yufp.extend(_this.$refs.incomerefForm.formdata, response.data.incomeInfo[0]);// 收入信息
        //         // yufp.extend(_this.$refs.famrefForm.formdata, response.data.familyincInfo[0]);// 家庭收支信息
        //         yufp.extend(_this.$refs.assrefForm.formdata, response.data.assetsInfo[0]);// 资产信息
        //         yufp.extend(_this.$refs.liabirefForm.formdata, response.data.liabiInfo[0]);// 负债信息
        //         yufp.extend(_this.$refs.insurrefForm.formdata, response.data.insurInfo[0]);// 保险信息
        //         yufp.extend(_this.$refs.payrefForm.formdata, response.data.payInfo[0]);// 纳税信息
        //         yufp.extend(_this.$refs.operrefForm.formdata, response.data.operInfo[0]);// 经营信息
        //         yufp.extend(_this.$refs.farmerrefForm.formdata, response.data.farmerInfo[0]);// 农户信息
        //       }
        //     }
        //   });
        // },
        /**
         * 保存
         */
      //   saveFn: function () {
      //     var _this = this;
      //     var finrefomodel = {};// 财务信息
      //     var investrefmodel = {};// 投资信息
      //     var incomerefmodel = {};// 收入信息
      //     var famrefmodel = {};// 家庭收支信息
      //     var assrefmodel = {};// 资产信息
      //     var liabirefmodel = {};// 负债信息
      //     var insurrefmodel = {};// 保险信息
      //     var payrefmodel = {};// 纳税信息
      //     var operrefmodel = {};// 经营信息
      //     var farmerrefmodel = {};// 农户信息


      //     yufp.clone(_this.financeformdata, finrefomodel);// 财务信息
      //     yufp.clone(_this.investformdata, investrefmodel);// 投资信息
      //     yufp.clone(_this.incomeformdata, incomerefmodel);// 收入信息
      //     yufp.clone(_this.famformdata, famrefmodel);// 家庭收支信息
      //     // yufp.clone(_this.assformdata, assrefmodel);// 资产信息
      //     yufp.clone(_this.liabiformdata, liabirefmodel);// 负债信息
      //     yufp.clone(_this.insurformdata, insurrefmodel);//  保险信息
      //     yufp.clone(_this.payformdata, payrefmodel);// 纳税信息
      //     yufp.clone(_this.operformdata, operrefmodel);// 经营信息
      //     yufp.clone(_this.farmerformdata, farmerrefmodel);// 农户信息


      //     _this.financeformdata1 = JSON.stringify(_this.financeformdata);// 财务信息
      //     _this.investformdata1 = JSON.stringify(_this.investformdata);// 投资信息
      //     _this.incomeformdata1 = JSON.stringify(_this.incomeformdata);// 收入信息
      //     _this.famformdata1 = JSON.stringify(_this.famformdata);// 家庭收支信息
      //     _this.assformdata1 = JSON.stringify(_this.assformdata);// 资产信息
      //     _this.liabiformdata1 = JSON.stringify(_this.liabiformdata);// 负债信息
      //     _this.insurformdata1 = JSON.stringify(_this.insurformdata);//  保险信息
      //     _this.payformdata1 = JSON.stringify(_this.payformdata);// 纳税信息
      //     _this.operformdata1 = JSON.stringify(_this.operformdata);// 经营信息
      //     _this.farmerformdata1 = JSON.stringify(_this.farmerformdata);// 农户信息
      //     var validate = false;
      //     _this.$refs.finrefForm.validate(function (valid) { // 校验财务信息
      //       validate = valid;
      //     });
      //     if (!validate) {
      //       _this.$message('请检查财务信息是否填写正确！');
      //       return;
      //     }
      //     _this.$refs.investrefForm.validate(function (valid) { // 校验投资信息
      //       validate = valid;
      //     });
      //     if (!validate) {
      //       _this.$message('请检查投资信息是否填写正确！');
      //       return;
      //     }
      //     _this.$refs.incomerefForm.validate(function (valid) { // 校验收入信息
      //       validate = valid;
      //     });
      //     if (!validate) {
      //       _this.$message('请检查收入信息是否填写正确！');
      //       return;
      //     }
      //     _this.$refs.famrefForm.validate(function (valid) { // 校验家庭收支信息
      //       validate = valid;
      //     });
      //     if (!validate) {
      //       _this.$message('请检查家庭收支信息是否填写正确！');
      //       return;
      //     }
      //     _this.$refs.assrefForm.validate(function (valid) { // 校验资产信息
      //       validate = valid;
      //     });
      //     if (!validate) {
      //       _this.$message('请检查资产信息是否填写正确！');
      //       return;
      //     }
      //     _this.$refs.liabirefForm.validate(function (valid) { // 校验负债信息
      //       validate = valid;
      //     });
      //     if (!validate) {
      //       _this.$message('请检查负债信息是否填写正确！');
      //       return;
      //     }
      //     _this.$refs.insurrefForm.validate(function (valid) { // 校验保险信息
      //       validate = valid;
      //     });
      //     if (!validate) {
      //       _this.$message('请检查保险信息是否填写正确！');
      //       return;
      //     }
      //     _this.$refs.payrefForm.validate(function (valid) { // 校验纳税信息
      //       validate = valid;
      //     });
      //     if (!validate) {
      //       _this.$message('请检查纳税信息是否填写正确！');
      //       return;
      //     }
      //     _this.$refs.operrefForm.validate(function (valid) { // 校验经营信息
      //       validate = valid;
      //     });
      //     if (!validate) {
      //       _this.$message('请检查经营信息是否填写正确！');
      //       return;
      //     }
      //     _this.$refs.farmerrefForm.validate(function (valid) { // 校验农户信息
      //       validate = valid;
      //     });

      //     if (!validate) {
      //       _this.$message('请检查农户信息是否填写正确！');
      //       return;
      //     }


      //     // 向后台发送保存请求
      //     yufp.service.request({
      //       method: 'POST',
      //       url: backend.custpersonService + '/api/pcustfinaview/updatefina',
      //       data: {'finrefomodel': finrefomodel,
      //         'investrefmodel': investrefmodel,
      //         'incomerefmodel': incomerefmodel,
      //         'famrefmodel': famrefmodel,
      //         'assrefmodel': assrefmodel,
      //         'liabirefmodel': liabirefmodel,
      //         'insurrefmodel': insurrefmodel,
      //         'payrefmodel': payrefmodel,
      //         'operrefmodel': operrefmodel,
      //         'farmerrefmodel': farmerrefmodel,
      //         'financeformdata1': _this.financeformdata1,
      //         'investformdata1': _this.investformdata1,
      //         'incomeformdata1': _this.incomeformdata1,
      //         'famformdata1': _this.famformdata1,
      //         'assformdata1': _this.assformdata1,
      //         'liabiformdata1': _this.liabiformdata1,
      //         'insurformdata1': _this.insurformdata1,
      //         'payformdata1': _this.payformdata1,
      //         'operformdata1': _this.operformdata1,
      //         'farmerformdata1': _this.farmerformdata1,
      //         'custId': custId },
      //       callback: function (code, message, response) {
      //         if (code == 0) {
      //         // _this.$refs.refTable.remoteData();
      //           _this.$message('操作成功');
      //         // _this.dialogVisible = false;
      //         }
      //       }
      //     });
      //   }
      }
    });
  };
});