/**
 * @created by luoshun
 * @updated by
 * @description 积分调整
 */
define(['custom/widgets/js/YufpWfInit.js', 'custom/widgets/js/yufpCustSelector.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('WF_APP_STATUS,IDENT_TYPE,ACCT_B_TYPE,ACCT_S_TYPE,CD0011,CD0238');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          // 时间禁用区间
          pickerOptions: {
            disabledDate: function (time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          },
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          // 表格数据
          dataUrl: '/api/loysrscoreadjust/list',
          // 表单数据
          formdata: { custId: '' },
          formdata1: { custId: '' },
          formdata2: { custId: '' },
          nowformInfo: '', // 当前页面主题
          // 弹窗是否可见
          dialogVisible: false,
          // 表单显示标志
          flag1: false,
          flag2: false,
          flag3: false,
          // 弹窗标题
          viewTitle: '',
          // 表单项是否隐藏
          isCustom: true,
          isShow: true,
          paramsInfo: {}, // 客户放大镜参数
          isSave: true,
          isAdjust: false, // 是否需要显示积分有效期-积分调整的时候
          formDisabled: true,
          isTrue: false,
          isCust: false,
          formRequired: true,
          sectionRule: '',
          accountNoDataUrl: '/api/ruleinfo/queryscoreaccount', // 积分账户查询url
          accountDetialUrl: '/api/loysrscoreadjust/getaccount', // 积分账户查询详情url
          tableDataUrl: '/api/loysrscoreadjust/getaccountId', // 客户查询url
          optionsAccounts: [], // 积分账户明细
          rules: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '数字', trigger: 'change' }],
          options: [
            {
              key: '0', value: '调加'
            },
            {
              key: '1', value: '调减'
            },
            {
              key: '2', value: '冻结'
            },
            {
              key: '3', value: '解冻'
            },
            {
              key: '5', value: '客户冻结'
            },
            {
              key: '6', value: '客户解冻'
            },
            {
              key: '7', value: '日终冻结'
            },
            {
              key: '8', value: '日终解冻'
            }
          ]
        };
      },
      /* watch: {
        'formdata.custId': function (val) {
          var _this = this;
          if (val != '') {
            yufp.service.request({
              method: 'GET',
              url: backend.yuspClimpChagService + '/api/custinfo/' + val,
              data: val,
              callback: function (code, message, response) {
                if (response.data) {
                  _this.formDisabled = false;
                  _this.isTrue = true;
                  _this.isCust = true;
                  _this.isSave = true;
                  _this.formdata.custName = response.data.custName;
                  _this.formdata.indentType = response.data.indentType;
                  _this.formdata.indentNo = response.data.indentNo;
                } else {
                  _this.$message({ message: '客户[' + val + ']不存在', type: 'warning' });
                  return;
                }
              }
            });
          }
        },
        'formdata1.custId': function (val) {
          var _this = this;
          if (val != '') {
            yufp.service.request({
              method: 'GET',
              url: backend.yuspClimpChagService + '/api/custinfo/' + val,
              data: val,
              callback: function (code, message, response) {
                if (response.data) {
                  _this.formDisabled = false;
                  _this.isTrue = true;
                  _this.isCust = true;
                  _this.isSave = true;
                  _this.formdata1.custName = response.data.custName;
                  _this.formdata1.identType = response.data.identType;
                  _this.formdata1.identNo = response.data.identNo;
                } else {
                  _this.$message({ message: '客户[' + val + ']不存在', type: 'warning' });
                  return;
                }
              }
            });
          }
        },
        'formdata2.custId': function (val) {
          var _this = this;
          if (val != '') {
            yufp.service.request({
              method: 'GET',
              url: backend.yuspClimpChagService + '/api/custinfo/' + val,
              data: val,
              callback: function (code, message, response) {
                if (response.data) {
                  _this.formDisabled = false;
                  _this.isTrue = true;
                  _this.isCust = true;
                  _this.isSave = true;
                  _this.formdata2.custName = response.data.custName;
                  _this.formdata2.indentType = response.data.indentType;
                  _this.formdata2.indentNo = response.data.indentNo;
                } else {
                  _this.$message({ message: '客户[' + val + ']不存在', type: 'warning' });
                  return;
                }
              }
            });
          }
        }
      },*/
      mounted: function () {
        // 初始化加载表单数据
        var _this = this;

        // // 积分账户信息
        yufp.service.request({
          method: 'GET',
          url: _this.accountDetialUrl,
          callback: function (code, message, response) {
            if (code == 0 && response.data != null) {
              _this.optionsAccounts = response.data;
            }
          }
        });
      },
      methods: {
        // 日期格式化(年月日时分秒)
        dateFormatter: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d} {h}:{i}:{s}');
        },
        // 日期格式化(年月日)
        dateFormatterSimple: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
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
        saveFn: function (ref) {
          var _this = this;
          var validate = false;
          _this.$refs[ref].validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          if (_this.flag1) {
            yufp.clone(_this.formdata, model);
          } else if (_this.flag2) {
            yufp.clone(_this.formdata1, model);
          } else if (_this.flag3) {
            yufp.clone(_this.formdata2, model);
          }
          var tempurl = _this.viewTitle === '修改' ? '/api/loysrscoreadjust/adjustupdate' : '/api/loysrscoreadjust/adjustcreate';
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: tempurl,
            data: model,
            callback: function (code, message, response) {
              if (response.code === 0) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              } else {
                _this.$message(response.message);
                return;
              }
            }
          });
        },
        /**
         * 控制xdialog、表单的状态
         * @param viewTitle 表单名称
         */
        switchStatus: function (viewTitle) {
          var _this = this;
          _this.viewTitle = viewTitle;
          _this.dialogVisible = true;
          _this.formDisabled = true;
          _this.isTrue = false;
          _this.isCust = true;
          _this.isSave = false;
          _this.flag1 = false;
          _this.flag2 = false;
          _this.flag3 = false;
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          var param = {
            condition: JSON.stringify({
              custId: selections[0].custId
            })
          };
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].approveStatus != '000' && selections[0].approveStatus != '998') {
            _this.$message({ message: '只允许修改积分审批状态为[待发起，否决]的记录', type: 'warning' });
            return;
          }
          yufp.service.request({
            method: 'GET',
            url: _this.tableDataUrl,
            data: param,
            callback: function (code, message, response) {
              var tab = response.data;
              if (tab.length != 0 && tab[0].adjustId != selections[0].adjustId) {
                _this.$message({ message: '该客户下有状态为待发起或审批中的状态!', type: 'warning' });
                return;
              }

              _this.switchStatus('修改');
              _this.formDisabled = false;
              _this.isTrue = true;
              _this.isSave = true;
              _this.paramsInfo = {transType: selections[0].transType};
              if (['2', '3'].indexOf(selections[0].transType) != -1) { // 冻结与解冻
                _this.flag1 = true;
                if (selections[0].transType === '3') {
                  _this.isShow = false;
                } else {
                  _this.isShow = true;
                }
                _this.nowformInfo = 'refForm';
                _this.$nextTick(function () {
                  _this.$refs.refForm.resetFields();
                  yufp.clone(selections[0], _this.formdata);
                });
              } else if (['0', '1'].indexOf(selections[0].transType) != -1) { // 调加与调减
                _this.flag2 = true;
                if (selections[0].transType === '1') {
                  _this.isAdjust = false;
                } else {
                  _this.isAdjust = true;
                }
                _this.nowformInfo = 'refForm1';
                _this.$nextTick(function () {
                  _this.$refs.refForm1.resetFields();
                  _this.$refs.refForm1.validDate = null;
                  yufp.clone(selections[0], _this.formdata1);
                });
              } else if (['5', '6'].indexOf(selections[0].transType) != -1) { // 客户冻结与解冻
                _this.flag3 = true;
                _this.nowformInfo = 'refForm2';
                _this.$nextTick(function () {
                  _this.$refs.refForm2.resetFields();
                  yufp.clone(selections[0], _this.formdata2);
                });
              } else { // 未定义的操作类型
                _this.$message({ message: '操作类型[' + selections[0].transtype + ']暂不支持修改', type: 'warning' });
                return;
              }
            }
          });
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('详情');
          _this.formDisabled = true;
          _this.isTrue = true;
          if (['2', '3'].indexOf(selections[0].transType) != -1) {
            _this.flag1 = true;
            if (selections[0].transType === '3') {
              _this.isShow = false;
            } else {
              _this.isShow = true;
            }
            _this.nowformInfo = 'refForm';
            _this.$nextTick(function () {
              _this.$refs.refForm.resetFields();
              yufp.clone(selections[0], _this.formdata);
            });
          } else if (['0', '1'].indexOf(selections[0].transType) != -1) {
            _this.flag2 = true;
            if (selections[0].transType === '1') {
              _this.isAdjust = false;
            } else {
              _this.isAdjust = true;
            }
            _this.nowformInfo = 'refForm1';
            _this.$nextTick(function () {
              _this.$refs.refForm1.resetFields();
              _this.$refs.refForm1.validDate = null;
              yufp.clone(selections[0], _this.formdata1);
            });
          } else {
            _this.flag3 = true;
            _this.nowformInfo = 'refForm2';
            _this.$nextTick(function () {
              _this.$refs.refForm2.resetFields();
              yufp.clone(selections[0], _this.formdata2);
            });
          }
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
          if (selections[0].approveStatus != '000' && selections[0].approveStatus != '998') {
            _this.$message({ message: '只允许删除审批状态为[待发起,否决]的记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].adjustId);
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
                  url: '/api/loysrscoreadjust/adjustdelete?id=' + arr.join(','),
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
        },
        /**
         * 调加
         */
        adjustAddFn: function () {
          var _this = this;
          _this.switchStatus('调加');
          _this.nowformInfo = 'refForm1';
          _this.flag2 = true;
          _this.isAdjust = true;
          _this.formRequired = true;
          _this.sectionRule = 'required';
          _this.paramsInfo = {transType: '0'};
          _this.$nextTick(function () {
            _this.$refs.refForm1.resetFields();
            _this.$refs.refForm1.validDate = null;
            _this.formdata1.transType = '0';
            _this.formdata1.exSerial = '12';
            _this.formdata1.costassignOrgId = yufp.session.org.id;
          });
        },
        /**
         * 调减
         */
        adjustReduceFn: function () {
          var _this = this;
          _this.switchStatus('调减');
          _this.nowformInfo = 'refForm1';
          _this.flag2 = true;
          _this.isAdjust = false;
          _this.formRequired = false;
          _this.sectionRule = '';
          _this.paramsInfo = {transType: '1'};
          _this.$nextTick(function () {
            _this.$refs.refForm1.resetFields();
            _this.$refs.refForm1.validDate = null;
            _this.formdata1.transType = '1';
            _this.formdata1.exSerial = '12';
          });
        },
        /**
         * 积分解冻
         */
        scoreFn: function () {
          var _this = this;
          _this.nowformInfo = 'refForm';
          _this.switchStatus('积分解冻');
          _this.flag1 = true;
          _this.isShow = false;
          _this.isCustom = false;
          _this.paramsInfo = {transType: '3'};
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.transType = '3';
            _this.formdata.exSerial = '15';
          });
        },
        /**
         * 积分冻结
         */
        freezeScoreFn: function () {
          var _this = this;
          _this.nowformInfo = 'refForm';
          _this.switchStatus('积分冻结');
          _this.flag1 = true;
          _this.isShow = true;
          _this.isCustom = false;
          _this.paramsInfo = {transType: '2'};
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.transType = '2';
            _this.formdata.exSerial = '15';
          });
        },
        /**
         * 客户冻结
         */
        freezeCustFn: function () {
          var _this = this;
          _this.nowformInfo = 'refForm2';
          _this.switchStatus('客户冻结');
          _this.flag3 = true;
          _this.paramsInfo = {transType: '5'};
          _this.$nextTick(function () {
            _this.$refs.refForm2.resetFields();
            _this.formdata2.transType = '5';
          });
        },
        /**
         * 客户解冻
         */
        custFn: function () {
          var _this = this;
          _this.nowformInfo = 'refForm2';
          _this.switchStatus('客户解冻');
          _this.flag3 = true;
          _this.paramsInfo = {transType: '6'};
          _this.$nextTick(function () {
            _this.$refs.refForm2.resetFields();
            _this.formdata2.transType = '6';
          });
        },
        /**
         * 提交
         */
        commitFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].approveStatus != '000') {
            _this.$message({ message: '只允许提交审批状态为[待发起]的记录', type: 'warning' });
            return;
          }
          var commintData = {};
          commintData.bizSeqNo = selections[0].adjustId;// 流程主键
          commintData.applType = 'JFTZ';// 模型版本申请类型字典项
          commintData.custName = selections[0].custName;
          commintData.custId = selections[0].custId;
          commintData.paramMap = yufp.clone(selections[0], {});
          var load = _this.$loading();
          _this.$refs.yufpWfInit.wfInit(commintData, load);
        },
        checkCustId: function (ref) {
          var _this = this;
          var custId = _this.$refs[ref].formdata.custId;
          if (custId != '') {
            yufp.service.request({
              method: 'GET',
              url: '/api/loysrscoreadjust/getcust?custId=' + custId,
              data: '',
              callback: function (code, message, response) {
                if (response.data) {
                  _this.formDisabled = false;
                  _this.isTrue = true;
                  _this.isCust = true;
                  _this.isSave = true;
                  _this.$refs[ref].formdata.custName = response.data.custName;
                  _this.$refs[ref].formdata.identType = response.data.identType;
                  _this.$refs[ref].formdata.identNo = response.data.identNo;
                  _this.$refs[ref].formdata.scoreNum = response.data.scoreNum;
                } else {
                  _this.$message({ message: '客户[' + custId + ']不存在', type: 'warning' });
                  return;
                }
              }
            });
          }
        },
        selectCustbackFn: function (data) {
          var _this = this;
          _this.formDisabled = false;
          _this.isTrue = false;
          _this.isCust = true;
          _this.isSave = true;
          _this.nowformInfo;
          _this.$refs[_this.nowformInfo].formdata.custId = data[0].custId;
          _this.$refs[_this.nowformInfo].formdata.identType = data[0].identType;
          _this.$refs[_this.nowformInfo].formdata.identNo = data[0].identNo;
          _this.$refs[_this.nowformInfo].formdata.scoreNum = data[0].scoreNum;
          // if (_this.$refs[_this.nowformInfo].formdata.freezeNum != null && _this.$refs[_this.nowformInfo].formdata.freezeNum == undefined) {
          _this.$refs[_this.nowformInfo].formdata.freezeNum = data[0].freezeNum;
        //  }
        },
        selectAccountbackFn: function (data) {
          var _this = this;
          var account = _this.optionsAccounts;
          for (var i = 0; i < account.length; i++) {
            if (data === account[i].accountNo) {
              _this.$refs[_this.nowformInfo].formdata.acctBType = account[i].acctBType;
              _this.$refs[_this.nowformInfo].formdata.acctSType = account[i].acctSType;
              break;
            }
          }
        },
        onAfterClose: function () {
          var _this = this;
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
        },
        onAfterInit: function (data) {
        }
      }
    });
  };
});