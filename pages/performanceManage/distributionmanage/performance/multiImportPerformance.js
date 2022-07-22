define(['./custom/widgets/js/YufpWfInit.js'], function (require, exports) {
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('DS0001,DS0003,CD0501');
    yufp.custom.vue({
      el: cite.el,
      data: {
        dataUrl: backend.custmgrService + '/api/pmamiddistribute/uploadlist',
        bussType: '',
        managerId: '',
        custName: '',
        custNumber: '',
        orgId: '',
        dstrSts: '',
        formdata: {},
        viewTitle: '',
        importShow: false,
        formDisabled: false,
        saveBtnShow: true,
        bussOption: [
          {
            value: '存款业绩',
            key: 'acct'
          }, {
            value: '贷款业绩',
            key: 'dept'
          }, {
            value: '中收业绩',
            key: 'mid'
          }
        ],
        acctColumnList: [
          {
            label: '客户号',
            prop: 'custNumber'
          }, {
            label: '客户名称',
            prop: 'custName'
          }, {
            label: '主账号',
            prop: 'acctNo'
          }, {
            label: '子账号',
            prop: 'subAcctNo'
          }, {
            label: '账户类型',
            prop: 'accountType'
          }, {
            label: '开户机构号',
            prop: 'orgId'
          }, {
            label: '开户机构名称',
            prop: 'orgName'
          }, {
            label: '开户日期',
            prop: 'openDate'
          }, {
            label: '余额',
            prop: 'balance'
          }, {
            label: '分配状态',
            prop: 'dstrSts'
          }, {
            label: '生效日期',
            prop: 'effectDate'
          }, {
            label: '失效日期',
            prop: 'expirateDate'
          }, {
            label: '客户经理号',
            prop: 'managerId'
          }, {
            label: '客户经理名称',
            prop: 'managerName'
          }, {
            label: '起始金额',
            prop: 'startAmt'
          }, {
            label: '结束金额',
            prop: 'endAmt'
          }, {
            label: '业绩分配比例',
            prop: 'distrRate'
          }
        ],
        distributeColumnList: [
          {
            label: 'ID',
            prop: 'id'
          }, {
            label: '交易流水号',
            prop: 'transactionMark'
          }, {
            label: '客户号',
            prop: 'customerNumber'
          }, {
            label: '客户名称',
            prop: 'customerName'
          }, {
            label: '交易日期',
            prop: 'transactionDate'
          }, {
            label: '业务类型',
            prop: 'bussType'
          }, {
            label: '产品代码',
            prop: 'productNumber'
          }, {
            label: '产品名称',
            prop: 'productName'
          }, {
            label: '交易金额',
            prop: 'transactionAmount'
          }, {
            label: '手续费',
            prop: 'serviceCharge'
          }, {
            label: '交易机构号',
            prop: 'orgId'
          }, {
            label: '交易机构名称',
            prop: 'orgName'
          }, {
            label: '分配状态',
            prop: 'dstrSts'
          }, {
            label: '客户经理号',
            prop: 'managerId'
          }, {
            label: '客户经理名称',
            prop: 'managerName'
          }, {
            label: '业绩分配比例',
            prop: 'distrRate'
          }
        ],
        depColumnList: [
          {
            label: '借据号',
            prop: 'billNo'
          }, {
            label: '账号',
            prop: 'contractNo'
          }, {
            label: '客户号',
            prop: 'custId'
          }, {
            label: '客户名称',
            prop: 'custName'
          }, {
            label: '分配状态',
            prop: 'dstrSts'
          }, {
            label: '生效日期',
            prop: 'effectDate'
          }, {
            label: '失效日期',
            prop: 'expirateDate'
          }, {
            label: '客户经理号',
            prop: 'managerId'
          }, {
            label: '客户经理名称',
            prop: 'managerName'
          }, {
            label: '业绩分配比例',
            prop: 'distrRate'
          }
        ],
        columnList: this.acctColumnList,
        dstrStsOption: [
          {
            value: '已分配',
            key: '1'
          }, {
            value: '未分配',
            key: '2'
          }, {
            value: '自动分配',
            key: '3'
          }, {
            value: '待审批',
            key: '4'
          }
        ],
        action: yufp.service.getUrl({url: '/api/pmamiddistribute/upload'}),
        uploadHeaders: {
          'Authorization': 'Bearer ' + yufp.service.getToken()
        },
        uploadData: {
          bussType: ''
        },
        xtableShow: false,
        viewBtn: !yufp.session.checkCtrl('view'),
        rule: {
          reason: [
            {max: 350, message: '最大长度不超过350个字符', trigger: 'blur' },
            {required: true, message: '字段不能为空', trigger: 'blur'}
          ]
        },
        wfCommonParams: {
          sessionInstuCde: yufp.session.instu.code,
          sessionOrgCode: yufp.session.org.code,
          sessionLoginCode: yufp.session.user.loginCode
        },
        sectionTableData: []
      },
      methods: {
        colValConvert: function (row, column, cellValue) {
          if (column.property == 'dstrSts') {
            return yufp.lookup.convertKey('DS0001', row.dstrSts);
          } else if (column.property == 'bussType') {
            return yufp.lookup.convertKey('CD0501', row.bussType);
          } else if (column.property == 'accountType') {
            return yufp.lookup.convertKey('DS0003', row.accountType);
          }
          return cellValue;
        },
        bussChange: function (val) {
          this.columnList = [];
          if (val) {
            this.xtableShow = true;
          } else {
            this.xtableShow = false;
          }
          if (val == 'acct') {
            this.columnList = this.acctColumnList;
            yufp.lookup.reg('DS0001,DS0003,CD0501');
          } else if (val == 'dept') {
            this.columnList = this.depColumnList;
            yufp.lookup.reg('DS0001,DS0003,CD0501');
          } else if (val == 'mid') {
            this.columnList = this.distributeColumnList;
            yufp.lookup.reg('DS0001,DS0003,CD0501');
          }
          this.$refs.refTable.clearData();
        },
        importFn: function () {
          if (this.bussType == '') {
            this.$message({ message: '请选择业务类型', type: 'warning' });
            return;
          }
          for (let i in this.bussOption) {
            if (this.bussType == this.bussOption[i].key) {
              this.viewTitle = this.bussOption[i].value;
              break;
            }
          }
          this.importShow = true;
        },
        exportFn: function () {
          let downloadUrl = backend.appBaseService + '/api/pmamiddistribute/download?bussType=' + this.bussType;
          if (this.$refs.refTable.selections.length > 0) {
            const set = new Set();
            for (let i = 0; i < this.$refs.refTable.selections.length; i++) {
              set.add(this.$refs.refTable.selections[i].id);
            }
            const array = Array.from(set);
            let ids = '&ids=';
            for (let i = 0; i < array.length; i++) {
              if (i == array.length - 1) {
                ids += array[i];
              } else {
                ids += array[i] + ',';
              }
            }
            downloadUrl += ids;
            yufp.util.download(downloadUrl);
          } else {
            let _this = this;
            this.$refs['searchForm'].validate(function (valid) {
              if (valid) {
                if (_this.managerId) {
                  downloadUrl += '&managerId=' + _this.managerId;
                }
                if (_this.custName) {
                  downloadUrl += '&custName=' + _this.custName;
                }
                if (_this.custNumber) {
                  downloadUrl += '&custNumber=' + _this.custNumber;
                }
                if (_this.orgId) {
                  downloadUrl += '&orgId=' + _this.orgId;
                }
                if (_this.dstrSts) {
                  downloadUrl += '&dstrSts=' + _this.dstrSts;
                }
                yufp.util.download(downloadUrl);
              } else {
                this.$message({ message: '请填写必要的查询条件', type: 'warning' });
              }
            });
          }
        },
        beforeFileUpload: function (file) {
          var index = file.name.lastIndexOf('.');
          var ext = file.name.substr(index + 1);
          if (ext != 'xls' && ext != 'xlsx') {
            this.$message.error('只能上传excel文档!');
            return false;
          }
          this.uploadData.bussType = this.bussType;
        },
        submitUpload: function () {
          this.$refs.upload.submit();
        },
        handleRemove: function (file, fileList) {
          yufp.logger.info(file, fileList);
        },
        handlePreview: function (file) {
          yufp.logger.info(file);
        },
        uploadSuccessFn: function (response) {
          if (response.code == '1' || response.code == 1) {
            this.importShow = false;
            this.$message({
              message: '文件导入成功',
              type: 'info'
            });
            _this.$refs.refTable.remoteData();
          } else {
            let errMsg = '文件上传错误';
            if (response.message) {
              errMsg += response.message;
            }
            this.$message({
              message: errMsg,
              type: 'error'
            });
          }
        },
        uploadErrorFn: function (response) {
          this.$message({
            message: '文件上传错误：' + response.message,
            type: 'warn'
          });
        },
        uploadTimeoutFn: function (event, file) {
          this.$message({
            message: '文件上传超时：' + response.message,
            type: 'warn'
          });
        },
        // objectSpanMethod: function (obj) {
        //     console.log(obj);
        //     // if (obj.rowIndex % 2 === 0) {
        //     //     if (obj.columnIndex === 0) {
        //     //         return [1, 2];
        //     //     } else if (obj.columnIndex === 1) {
        //     //         return [0, 0];
        //     //     }
        //     // }
        // },
        formatter: function (row, column, cellValue) {
          var cellText = '';
          if (cellValue != null) {
            var arr = cellValue.split(',');
            for (var i = 0; i < arr.length; i++) {
              var val = arr[i];
              if (val == '1') {
                cellText = cellText + '个人,';
              } else if (val == '2') {
                cellText = cellText + '对公,';
              } else if (val == '3') {
                cellText = cellText + '三农,';
              } else if (val == '4') {
                cellText = cellText + '国结,';
              } else if (val == '5') {
                cellText = cellText + '村镇银行,';
              }
            }
            cellText = cellText.substring(0, cellText.length - 1);
          }
          return cellText;
        },

        /**
                 * 单区间分配
                 */
        singleRegionDistribute: function () {
          var _this = this;
          _this.btnType = '新增';
          _this.dialogVisible = true;
          if (_this.$refs.refForm) {
            _this.$refs.refForm.resetFields();
          }
        },
        /**
                 * 取消
                 */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
                 * 控制保存按钮、xdialog、表单的状态
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
        // refTable加载数据后，显示异常信息
        refTableLoaded: function (data, total, response) {
          var _this = this;
          _this.tableTotal = total;
          if (response.code == -1 || response.code == -2) {
            _this.$message({ message: response.message, type: 'warning' });
          }
        },
        switchStatus: function (viewTitle, editable) {
          var _this = this;
          _this.viewTitle = viewTitle;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        // quitCustMgrApplyFn: function () {
        //   var _this = this;
        //   if (_this.$refs.refTable.selections.length != 1) {
        //     _this.$message({ message: '请先选择一条记录', type: 'warning' });
        //     return;
        //   }
        //   _this.switchStatus('退出客户经理', false);
        //   _this.$nextTick(function () {
        //     _this.$refs.refForm.resetFields();
        //     var obj = _this.$refs.refTable.selections[0];
        //     yufp.clone(obj, _this.formdata);
        //   });
        // },
        quitCustMgrApply: function () {
          var _this = this;
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            _this.$message({message: '请检查输入项是否合法', type: 'warning'});
            return;
          }
          var obj = _this.$refs.refTable.selections[0];
          _this.$confirm('是否确认执行此操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'GET',
                  url: backend.custmgrService + '/api/custmgrquery/checkcustmgrapply',
                  data: {
                    mgrId: obj.userCode
                  },
                  callback: function (code, message, response) {
                    if (response.data.length > 0 && response.data[0].state != 3) {
                      _this.$message({ message: '该客户经理已办理退出申请！', type: 'warning' });
                      return;
                    } else {
                      yufp.service.request({
                        method: 'POST',
                        url: backend.custmgrService + '/api/custmgrquery/quitcustmgrapply',
                        data: _this.$refs.refForm.model,
                        callback: function (code, message, response) {
                          if (code == 0) {
                            var commitData = {};
                            commitData.bizSeqNo = response.data;
                            // 模型版本申请类型字典项
                            commitData.applType = 'TCKHJLSP';
                            commitData.custId = yufp.session.userId;
                            commitData.custName = yufp.session.userName;
                            commitData.paramMap = {
                              mgrId: obj.userCode,
                              orgId: obj.orgId,
                              orgName: obj.orgName
                            };
                            _this.$refs.refTable.remoteData();
                            _this.$message('操作成功');
                            _this.dialogVisible = false;
                            var load = _this.$loading();
                            _this.$refs.yufpWfInit.wfInit(commitData, load);
                          }
                        }
                      });
                    }
                  }
                });
              } else {
                return false;
              }
            }
          });
        },
        openview: function () {
          var _this = this;
          var obj = _this.$refs.refTable.selections[0];
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var mgr = 'mgr_view' + obj.userCode;

          yufp.frame.addTab({
            id: 'custManagerView', // 菜单功能ID（路由ID）
            key: mgr, // 自定义唯一页签key
            title: '客户经理视图: ' + obj.userCode, // 页签名称
            data: {id: '3e99f2d47eac4af3a04b9aa5f6edb4ef', mgrId: obj.userCode}
          });
          // 刷新方法
          yufp.frame.refreshTab({
            routeId: 'custManagerView', // 对公, // 菜单功能ID（路由ID）
            menuId: mgr, // 菜单ID，同addTab方法中的key
            title: '客户经理视图:' + obj.userCode, // 页签名称
            data: {id: '3e99f2d47eac4af3a04b9aa5f6edb4ef', mgrId: obj.userCode}
          });
        },
        rowDblclickFn: function (row, event) {
          var mgr = 'mgr_view' + row.userCode;
          yufp.frame.addTab({
            id: 'custManagerView', // 菜单功能ID（路由ID）
            key: mgr, // 自定义唯一页签key
            title: '客户经理视图: ' + row.userCode, // 页签名称
            data: {id: '3e99f2d47eac4af3a04b9aa5f6edb4ef', mgrId: row.userCode}
          });
          // 刷新方法
          yufp.frame.refreshTab({
            routeId: 'custManagerView', // 对公, // 菜单功能ID（路由ID）
            menuId: mgr, // 菜单ID，同addTab方法中的key
            title: '客户经理视图:' + row.userCode, // 页签名称
            data: {id: '3e99f2d47eac4af3a04b9aa5f6edb4ef', mgrId: row.userCode}
          });
        },
        onAfterClose: function () {
        },
        onAfterInit: function (data) {
        }
      },
      computed: {
        xtableShow: function () {
          return this.bussType != null && this.bussType != '';
        }
      }
    });
  };
});