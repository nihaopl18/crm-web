/**
 * @Created by 马妍 mayan2@yusys.com.cn on 2019-2-15 10:12:38.
 * @updated by
 * @description 他行信息
 */
define(function (require, exports) {
  /**
    * 页面加载完成时触发
    * @param hashCode 路由ID
    * @param data 传递数据对象
    * @param cite 页面站点信息
    */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0071,CD0085,CD0358,CD0238,CD0242,CD0244,CD0192');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          saveBtn: !yufp.session.checkViewCtrl('save', data.id),
          expandCollapseName: ['dep'],
          depFormdata: {},
          depFormdata1: '',
          loanformdata: {},
          loanformdata1: '',
          finaformdata: {},
          finaformdata1: '',
          guarformdata: {},
          guarformdata1: '',
          formDisabled: false,
          saveBtnShow: true,
          depDialogVisible: false,
          depUrl: backend.custpersonService + '/api/pcustotbankview/getpedlist/' + custId,
          loanDialogVisible: false,
          loanUrl: backend.custpersonService + '/api/pcustotbankview/getloanlist/' + custId,
          finaDialogVisible: false,
          finaUrl: backend.custpersonService + '/api/pcustotbankview/getfinalist/' + custId,
          guarDialogVisible: false,
          guarUrl: backend.custpersonService + '/api/pcustotbankview/getguarlist/' + custId,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          rule: {
            // 存款
            openBrchName: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            acctId: [
              {max: 16, message: '最大长度不超过16个字符', trigger: 'blur' }

            ],
            deptBal: [
              {validator: yufp.validator.gZero, message: '请输入数字'}

            ],
            // 贷款
            bussCd: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }

            ],
            openBrchName1: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            contAmt: [
              {validator: yufp.validator.gZero, message: '请输入数字'}

            ],
            // execRate: [
            //   {validator: yufp.validator.number, message: '请输入数字'}

            // ],
            loanBal: [
              {validator: yufp.validator.gZero, message: '请输入数字'}

            ],
            marginRatio: [
              {validator: yufp.validator.gZero, message: '请输入数字'}

            ],
            mortgageNo: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' }

            ],
            pledgeNo: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' }

            ],
            remark: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            // 理财
            account: [
              {max: 25, message: '最大长度不超过25个字符', trigger: 'blur' }

            ],
            purAmo: [
              {validator: yufp.validator.gZero, message: '请输入数字'}

            ],

            expRateOfRet: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }

            ],
            term: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }

            ],
            buyBank: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' }

            ],
            // 担保
            byGuaName: [
              {max: 30, message: '最大长度不超过30个字符', trigger: 'blur' }

            ],
            guaBusDes: [
              {max: 150, message: '最大长度不超过150个字符', trigger: 'blur' }

            ],
            guaAmo: [
              {validator: yufp.validator.gZero, message: '请输入数字'}

            ],
            guaBal: [
              {validator: yufp.validator.gZero, message: '请输入数字'}

            ],
            bankDetName: [
              {max: 150, message: '最大长度不超过150个字符', trigger: 'blur' }

            ],
            note: [
              {max: 240, message: '最大长度不超过240个字符', trigger: 'blur' }

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
         * 表单初始化数据
         */
        // initPageData: function () {
        //   var _this = this;
        //   yufp.service.request({ // 查询业务数据
        //     method: 'GET',
        //     url: backend.custpersonService + '/api/pcustotbankview/queryotherbanklist/' + custId, // custId
        //     callback: function (code, message, response) {
        //       if (code == 0) { // code等于0 说明成功
        //         // yufp.extend(_this.$refs.deprefForm.formdata, response.data.depInfo[0]);// 存款信息
        //         // yufp.extend(_this.$refs.loanrefForm.formdata, response.data.loanInfo[0]);// 贷款信息
        //         // yufp.extend(_this.$refs.finarefForm.formdata, response.data.finInfo[0]);// 理财信息
        //         yufp.extend(_this.$refs.guarrefForm.formdata, response.data.guarInfo[0]);// 担保信息
        //       }
        //     } });
        // },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          _this.depFormdata1 = JSON.stringify(_this.depFormdata);// 存款信息
          _this.loanformdata1 = JSON.stringify(_this.loanformdata);// 贷款信息
          _this.finaformdata1 = JSON.stringify(_this.finaformdata);// 理财信息
          _this.guarformdata1 = JSON.stringify(_this.guarformdata);// 担保信息
          var validate = false;
          _this.$refs.deprefForm.validate(function (valid) { // 校验存款信息
            validate = valid;
          });
          if (!validate) {
            _this.$message('请检查存款信息是否填写正确！');
            return;
          }
          _this.$refs.loanrefForm.validate(function (valid) { // 校验贷款信息
            validate = valid;
          });
          if (!validate) {
            _this.$message('请检查贷款信息是否填写正确！');
            return;
          }
          _this.$refs.finarefForm.validate(function (valid) { // 校验理财信息
            validate = valid;
          });
          if (!validate) {
            _this.$message('请检查理财信息是否填写正确！');
            return;
          }
          _this.$refs.guarrefForm.validate(function (valid) { // 校验担保信息
            validate = valid;
          });
          if (!validate) {
            _this.$message('请检查担保信息是否填写正确！');
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustotbankview/updateotherbank',
            data: {'depmodel': _this.depFormdata1,
              'loanmodel': _this.loanformdata1,
              'finmodel': _this.finaformdata1,
              'guarmodel': _this.guarformdata1,
              'custId': custId

            },
            callback: function (code, message, response) {
              if (code == 0) {
              // _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              // _this.dialogVisible = false;
              }
            }
          });
        },

        /**
         * 他行存款新增按钮
         */
        addDepFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'depDialogVisible');
          _this.$nextTick(function () {
            _this.$refs.depForm.resetFields();
          });
        },
        /**
         * 他行存款修改
         */
        modifyDepFn: function () {
          var _this = this;
          if (_this.$refs.depTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'depDialogVisible');
          _this.$nextTick(function () {
            _this.$refs.depForm.resetFields();
            var obj = _this.$refs.depTable.selections[0];
            yufp.clone(obj, _this.$refs.depForm.formdata);
          });
        },
        /**
         * 他行存款删除按钮
         */
        delDepFn: function () {
          var _this = this;
          if (_this.$refs.depTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.depTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustotbankview/deldep',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.depTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 他行存款取消
         */
        depCancelFn: function () {
          var _this = this;
          _this.depDialogVisible = false;
        },
        /**
         * 他行存款保存
         */
        saveDepFn: function () {
          var _this = this;
          var depmodel = {};
          yufp.clone(_this.$refs.depForm.formdata, depmodel);
          var validate = false;
          _this.$refs.depForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustotbankview/updatedep/' + custId,
            data: {
              'depmodel': depmodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.depDialogVisible = false;
                _this.$refs.depTable.remoteData();
              }
            }
          });
        },

        /**
         * 他行贷款新增按钮
         */
        addLoanFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'loanDialogVisible');
          _this.$nextTick(function () {
            _this.$refs.loanForm.resetFields();
          });
        },
        /**
         * 他行贷款修改
         */
        modifyLoanFn: function () {
          var _this = this;
          if (_this.$refs.loanTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'loanDialogVisible');
          _this.$nextTick(function () {
            _this.$refs.loanForm.resetFields();
            var obj = _this.$refs.loanTable.selections[0];
            yufp.clone(obj, _this.$refs.loanForm.formdata);
          });
        },
        /**
         * 他行贷款删除按钮
         */
        delLoanFn: function () {
          var _this = this;
          if (_this.$refs.loanTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.loanTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustotbankview/delloan',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.loanTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 他行贷款取消
         */
        loanCancelFn: function () {
          var _this = this;
          _this.loanDialogVisible = false;
        },
        /**
         * 他行贷款保存
         */
        saveLoanFn: function () {
          var _this = this;
          var loanmodel = {};
          yufp.clone(_this.$refs.loanForm.formdata, loanmodel);
          var validate = false;
          _this.$refs.loanForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustotbankview/updateloan/' + custId,
            data: {
              'loanmodel': loanmodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.loanDialogVisible = false;
                _this.$refs.loanTable.remoteData();
              }
            }
          });
        },

        /**
         * 他行理财新增按钮
         */
        addFinaFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'finaDialogVisible');
          _this.$nextTick(function () {
            _this.$refs.finaForm.resetFields();
          });
        },
        /**
         * 他行理财修改
         */
        modifyFinaFn: function () {
          var _this = this;
          if (_this.$refs.finaTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'finaDialogVisible');
          _this.$nextTick(function () {
            _this.$refs.finaForm.resetFields();
            var obj = _this.$refs.finaTable.selections[0];
            yufp.clone(obj, _this.$refs.finaForm.formdata);
          });
        },
        /**
         * 他行理财删除按钮
         */
        delFinaFn: function () {
          var _this = this;
          if (_this.$refs.finaTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.finaTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustotbankview/delfina',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.finaTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 他行理财取消
         */
        finaCancelFn: function () {
          var _this = this;
          _this.finaDialogVisible = false;
        },
        /**
         * 他行理财保存
         */
        saveFinaFn: function () {
          var _this = this;
          var finamodel = {};
          yufp.clone(_this.$refs.finaForm.formdata, finamodel);
          var validate = false;
          _this.$refs.finaForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustotbankview/updatefina/' + custId,
            data: {
              'finamodel': finamodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.finaDialogVisible = false;
                _this.$refs.finaTable.remoteData();
              }
            }
          });
        },

        /**
         * 他行担保新增按钮
         */
        addGuarFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true, 'guarDialogVisible');
          _this.$nextTick(function () {
            _this.$refs.guarForm.resetFields();
          });
        },
        /**
         * 他行担保修改
         */
        modifyGuarFn: function () {
          var _this = this;
          if (_this.$refs.guarTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true, 'guarDialogVisible');
          _this.$nextTick(function () {
            _this.$refs.guarForm.resetFields();
            var obj = _this.$refs.guarTable.selections[0];
            yufp.clone(obj, _this.$refs.guarForm.formdata);
          });
        },
        /**
         * 他行担保删除按钮
         */
        delGuarFn: function () {
          var _this = this;
          if (_this.$refs.guarTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var ids = _this.$refs.guarTable.selections[0].id;
          _this.$confirm('此操作将删除该部门信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustotbankview/delguar',
              data: {
                id: ids
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$message('操作成功');
                  _this.$refs.guarTable.remoteData();
                }
              }
            });
          }).catch(function () {
            return;
          });
        },
        /**
         * 他行担保取消
         */
        guarCancelFn: function () {
          var _this = this;
          _this.guarDialogVisible = false;
        },
        /**
         * 他行担保保存
         */
        saveGuarFn: function () {
          var _this = this;
          var guarmodel = {};
          yufp.clone(_this.$refs.guarForm.formdata, guarmodel);
          var validate = false;
          _this.$refs.guarForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/pcustotbankview/updateguar/' + custId,
            data: {
              'guarmodel': guarmodel
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$message('操作成功');
                _this.guarDialogVisible = false;
                _this.$refs.guarTable.remoteData();
              }
            }
          });
        }

      }
    });
  };
});