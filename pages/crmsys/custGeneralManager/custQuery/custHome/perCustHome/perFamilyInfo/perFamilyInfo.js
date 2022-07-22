/**
 * @Created by 马妍 mayan2@yusys.com.cn on 2019-1-22 09:34:22.
 * @updated by
 * @description 家庭信息
 */
define(['./custom/widgets/js/yufpAllCustSelector.js'], function (require, exports) {
  /**
    * 页面加载完成时触发
    * @param hashCode 路由ID
    * @param data 传递数据对象
    * @param cite 页面站点信息
    */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0015,CD0049,CD0261,CD0348,CD0010,CD0238,CD0242,CD0019');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          addBtn: !yufp.session.checkViewCtrl('add', data.id),
          editBtn: !yufp.session.checkViewCtrl('edit', data.id),
          deleteBtn: !yufp.session.checkViewCtrl('delete', data.id),
          saveBtn: !yufp.session.checkViewCtrl('save', data.id),
          expandCollapseName: ['base'],
          baseFormdata: {},
          basedata: '',
          infoFormdata: {},
          infomoredata: '',
          formdata: {}, // 家庭成员
          dataUrl: backend.custpersonService + '/api/acrmfciperfamilymember/queryfammemlist/' + custId,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          rule: {
            householderName: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            popuNum: [
              {validator: yufp.validator.number, message: '请输入正数'}

            ],
            famAddr: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            countAreaCd: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }

            ],
            laborNum: [
              {validator: yufp.validator.number, message: '请输入整数'}

            ],
            itemAndScal: [
              {max: 50, message: '最大长度不超过50个字符', trigger: 'blur' }

            ],
            homeTelNo: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' }

            ],

            famBadRec: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            creditAmt: [
              {validator: yufp.validator.number, message: '请输入整数'}

            ],

            plateNo1: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' }

            ],
            plateNo2: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' }

            ],
            plateNo3: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' }

            ],

            famDebtRec: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            creditRec: [
              {max: 50, message: '最大长度不超过50个字符', trigger: 'blur' }

            ],
            others: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            famEconStat: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            villageEval: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            // 成员
            memName: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            memCertNo: [
              {max: 20, message: '最大长度不超过20个字符', trigger: 'blur' }

            ],
            telNo: [
              {validator: yufp.validator.number, message: '请输入整数'}
            ],
            mobiNo: [
              {validator: yufp.validator.number, message: '请输入整数'}

            ],
            memComSch: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            higEduDgr: [
              {max: 30, message: '最大长度不超过30个字符', trigger: 'blur' }

            ],
            remark: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ]
          }
        };
      },
      mounted: function () {
        // 反显页面数据
        this.initPageData();
      },
      methods: {


        /**
         * 表单初始化数据
         */
        initPageData: function () {
          var me = this;
          yufp.service.request({ // 查询业务数据
            method: 'GET',
            url: backend.custpersonService + '/api/acrmfciperfamilyinfo/queryfamilylist/' + custId, // custId
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
                yufp.extend(me.$refs.baseForm.formdata, response.data[0]);// 基本信息
                yufp.extend(me.$refs.infoForm.formdata, response.data[0]);// 更多信息
              }
            } });
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var baseinfomodel = {};// 基本信息
          var moreinfomodel = {};// 更多信息
          yufp.clone(_this.baseFormdata, baseinfomodel);// 基本信息
          yufp.clone(_this.infoFormdata, moreinfomodel);// 工作信息

          _this.basedata = JSON.stringify(_this.baseFormdata);// 基本
          _this.infomoredata = JSON.stringify(_this.infoFormdata);// 更多

          var validate = false;
          _this.$refs.baseForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          _this.$refs.infoForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/acrmfciperfamilyinfo/updatefamily',
            data: {'baseinfomodel': baseinfomodel,
              'moreinfomodel': moreinfomodel,
              'basedata': _this.basedata,
              'infomoredata': _this.infomoredata,
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
        }, /**
        * 取消
        */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
        * 保存
        */
        membersaveFn: function () {
          var _this = this;
          var model = {
            custId: custId
          };
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.memrefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (_this.viewType == 'ADD') {
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/acrmfciperfamilymember/addfammem',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            });
          } else {
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/acrmfciperfamilymember/updatefammem',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            });
          }
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
            _this.$refs.memrefForm.resetFields();
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
          if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.user.loginCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.memrefForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
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
          if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.user.loginCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custpersonService + '/api/acrmfciperfamilymember/deletefammem',
                  data: {
                    id: arr.join(',')
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