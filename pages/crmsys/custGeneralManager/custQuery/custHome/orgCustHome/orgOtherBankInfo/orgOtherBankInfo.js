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
          depUrl: backend.custpersonService + '/api/ocrmfciorgothbankinfo/getorgotherbank/' + custId,
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
              {validator: yufp.validator.number, message: '请输入数字'}

            ],
            // execRate: [
            //   {validator: yufp.validator.number, message: '请输入数字'}

            // ],
            loanBal: [
              {validator: yufp.validator.number, message: '请输入数字'}

            ],
            marginRatio: [
              {validator: yufp.validator.number, message: '请输入数字'}

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
              {validator: yufp.validator.number, message: '请输入数字'}

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
              {validator: yufp.validator.number, message: '请输入数字'}

            ],
            guaBal: [
              {validator: yufp.validator.number, message: '请输入数字'}

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
         * 他行存款详情
         */
        detilDepFn: function () {
          var _this = this;
          if (_this.$refs.depTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETIL', false, 'depDialogVisible');
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
              url: backend.custpersonService + '/api/ocrmfciorgothbankinfo/delotherbank',
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
            url: backend.custpersonService + '/api/ocrmfciorgothbankinfo/updateotherbank/' + custId,
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
        }

      }
    });
  };
});