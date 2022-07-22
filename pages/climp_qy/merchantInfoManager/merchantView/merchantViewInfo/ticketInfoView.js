/**
 * @Created by hujun3 hujun3@yusys.com.cn on 2019-2-21 20:43:26.
 * @updated by
 * @description 虚拟票券商户视图
 */
define(['libs/yufp/widgets/js/YufpWfInit.js', 'custom/widgets/js/yufpMerchantSelector.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('TICKET_TYPE,RECEIVE_TYPE,DATA_STS,WF_APP_STATUS,USE_STS,SOURCE_TYPE,MANAGE_A_TYPE');
    var merchantId = data.merchantId;
    var instuCode = data.instuCde;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          dataUrl: backend.qyPoolService + '/api/loyqyvirtticket/query',
          dataBatchUrl: backend.qyPoolService + '/api/loyqyvirtticket/querybatch',
          dataStockUrl: backend.qyPoolService + '/api/loyqyvirtticket/querystock',
          height: yufp.frame.size().height,
          treeUrl: backend.qyPoolService + '/api/loyqycommoditycategory/categorytree',
          async: false,
          kindParam: {condition: JSON.stringify({
            orgCode: instuCode
          }) },
          orgModel: {},
          formdata: {},
          formBatchdata: {},
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          ticketAllNum: [{ required: true, message: '字段不能为空' }, {max: 10, message: '长度不能超过10个字符', trigger: 'blur'},
            { validator: yufp.validator.number, message: '数字', trigger: 'change' }],
          ticketNo: [{ required: true, message: '字段不能为空' }, {max: 30, message: '长度不能超过30个字符', trigger: 'blur'},
            { validator: yufp.validator.numberAndLetter, message: '字段只能为字母和数字', trigger: 'change'}],
          ticketName: [{ required: true, message: '字段不能为空' }, {max: 150, message: '长度不能超过150个字符', trigger: 'blur'}],
          useCondition: [{ required: true, message: '字段不能为空' }, {max: 700, message: '长度不能超过700个字符', trigger: 'blur'}],
          useRemark: [ {max: 1500, message: '长度不能超过1500个字符', trigger: 'blur'}],
          pickerOptions0: {
            disabledDate: function (time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          },
          validStartDate: { // 有效期开始日期小于结束日期
            disabledDate: function (time) {
              var beginDateVal = _this.formBatchdata.validEndDate;
              if (time.getTime() < Date.now() - 8.64e7) {
                return true;
              }
              if (beginDateVal) {
                return time.getTime() > beginDateVal;
              }
            }
          },
          validEndDate: { // 有效期结束日期大于开始日期
            disabledDate: function (time) {
              var beginDateVal = _this.formBatchdata.validStartDate;
              if (time.getTime() < Date.now() - 8.64e7) {
                return true;
              }
              if (beginDateVal) {
                return time.getTime() < beginDateVal;
              }
            }
          },
          corpOrg: '',
          kindId: '0',
          kindFormdata: {},
          updkindFormdata: {},
          addSaveBtnShow: false,
          updSaveBtnShow: false,
          baseParam: {condition: JSON.stringify({
            merchantId: merchantId,
            subType: '0'
          }) },
          kindInfoDisabled: true,
          dialogVisible: false,
          dialogBatchVisible: false, // 是否显示库存管理页面
          dialogBatchInfoVisible: false,
          dialogStockInfoVisible: false,
          formDisabled: false,
          formBatchDisabled: false,
          selectionsDate: false,
          isShow: false,
          viewType: 'DETAIL',
          viewType1: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          viewTitle1: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          saveBtnShow1: true,
          uploadTitle: 'Excel表导入票券信息',
          uploadInfoVisible: false,
          uploadDialog: false,
          fileList: [],
          action: yufp.service.getUrl({
            url: backend.qyPoolService + '/api/loyqyvirtticket/uploadstocklist'
          }),
          headers: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          uploaddata: {
            batchNo: '',
            ticketNo: '',
            flag: '0'
          }
        };
      },
      mounted: function () {
        var _this = this;
        // if (yufp.session.org.code == '500') {
        //   this.disableInstu = false;
        // }
        // _this.orgModel.orgName = yufp.session.org.code;
        // var codeOrg = {};
        // codeOrg.orgId = yufp.session.org.code;
        // _this.selectFn(codeOrg);
        // _this.getfinanceOrgOptions();
      },
      methods: {
        /** 点击目录树节点 */
        nodeClickFn: function (a, b, c) {
          this.baseParam = {condition: JSON.stringify({
            merchantId: merchantId,
            subType: a.kindId
          }) };
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
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switch1Status: function (viewType, editable) {
          var _this = this;
          _this.viewType1 = viewType;
          _this.saveBtnShow1 = editable;
          _this.dialogBatchInfoVisible = true;
          _this.formBatchDisabled = !editable;
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
        // 库存管理
        stockManagerFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].wfApprSts != '997') {
            _this.$message({ message: '只允许选择审批状态为[通过]的记录', type: 'warning' });
            return;
          }
          _this.dialogBatchVisible = true;
          _this.selectionsDate = selections[0];
          var param = { condition: JSON.stringify({ticketNo: selections[0].ticketNo}) };
          _this.$nextTick(function () {
            _this.$refs.batchTable.remoteData(param);
          });
        },
        /**
         * 新增按钮
         */
        addBatchFn: function () {
          var _this = this;
          _this.switch1Status('ADD', true);
          _this.isShow = false;
          _this.$nextTick(function () {
            _this.$refs.refBatchForm.resetFields();
            _this.formBatchdata.batchNo = yufp.util.dateFormat(new Date(), '{y}{m}{d}{h}{i}{s}');
            _this.formBatchdata.ticketNo = _this.selectionsDate.ticketNo;
          });
        },
        /**
         * 修改
         */
        modifyBatchFn: function () {
          var _this = this;
          if (_this.$refs.batchTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var selection = _this.$refs.batchTable.selections[0];
          if (selection.wfApprSts != '000' && selection.wfApprSts != '998') {
            _this.$message({ message: '只能选择审批状态是待发起或者否决的数据', type: 'warning' });
            return;
          }
          _this.switch1Status('EDIT', true);
          _this.isShow = false;
          _this.$nextTick(function () {
            _this.$refs.refBatchForm.resetFields();
            yufp.clone(selection, _this.formBatchdata);
          });
        },
        /**
         * 详情
         */
        infoBatchFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.batchTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switch1Status('DETAIL', false);
          _this.isShow = true;
          _this.$nextTick(function () {
            _this.$refs.refBatchForm.resetFields();
            yufp.clone(selectionsAry[0], _this.formBatchdata);
          });
        },
        /**
         * 展示库存明细信息
         */
        stockInfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.batchTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogStockInfoVisible = true;
          var param = { condition: JSON.stringify({batchNo: selectionsAry[0].batchNo}) };
          _this.$nextTick(function () {
            _this.$refs.stockTable.remoteData(param);
          });
        },
        /**
         * 删除
         */
        deleteBatchFn: function () {
          var _this = this;
          var selections = _this.$refs.batchTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            if (selections[i].wfApprSts != '000' && selections[i].wfApprSts != '998') {
              _this.$message({ message: '只能选择审批状态是待发起或者否决的数据', type: 'warning' });
              return;
            } else {
              arr.push(selections[i].batchId);
            }
          }
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.qyPoolService + '/api/loyqyvirtticket/deletebatchinfo?ids=' + arr.join(','),
                  // data: {
                  //   ids: arr.join(',')
                  // },
                  callback: function (code, message, response) {
                    _this.$refs.batchTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        /**
         * 批量倒入
         */
        importBatchFn: function () {
          var _this = this;
          if (_this.$refs.batchTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var selection = _this.$refs.batchTable.selections[0];
          if (selection.wfApprSts != '997' || selection.sourceType != '2') {
            _this.$message({ message: '只能选择审批状态是通过和票券来源是批量导入的的数据', type: 'warning' });
            return;
          }
          _this.uploaddata = {
            batchNo: selection.batchNo,
            ticketNo: selection.ticketNo,
            flag: '0'
          };
          _this.uploadDialog = true;
        },
        /**
         * 取消
         */
        cancelBatchFn: function () {
          var _this = this;
          _this.dialogBatchInfoVisible = false;
          _this.dialogBatchVisible = true;
        },
        /**
         * 保存
         */
        saveBatchFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formBatchdata, model);
          var validate = false;
          _this.$refs.refBatchForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var url = '';
          if (_this.viewType1 == 'ADD') {
            url = backend.qyPoolService + '/api/loyqyvirtticket/addbatchinfo';
          } else if (_this.viewType1 == 'EDIT') {
            url = backend.qyPoolService + '/api/loyqyvirtticket/updatebatchinfo';
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: url,
            data: model,
            callback: function (code, message, response) {
              _this.dialogBatchInfoVisible = false;
              _this.dialogBatchVisible = true;
              _this.$nextTick(function () {
                _this.$refs.batchTable.remoteData();
                _this.$message('操作成功');
              });
            }
          });
        },
        /**
         * 提交-批次信息
         */
        commitBatchFn: function () {
          var _this = this;
          var selections = _this.$refs.batchTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].wfApprSts != '000') {
            _this.$message({ message: '只允许提交审批状态为[待发起]的记录', type: 'warning' });
            return;
          }
          var commintData = {};
          commintData.bizSeqNo = selections[0].batchId;// 流程主键
          commintData.applType = 'XNPQPC';// 模型版本申请类型字典项
          commintData.custName = _this.selectionsDate.ticketName + '的' + selections[0].batchNo + '批次';
          commintData.custId = selections[0].batchNo;
          commintData.paramMap = yufp.clone(selections[0], {});
          var load = _this.$loading();
          _this.$refs.yufpWfInit.wfInit(commintData, load);
        },
        onAfterClose: function () {
          var _this = this;
          _this.$refs.batchTable.remoteData();
          _this.$message('操作成功');
        },

        onAfterInit: function (data) {
        },
        // 文件上传成功处理逻辑
        onSuccess: function (response, file, fileList) {
          var _this = this;
          // console.log('上传文件', response);
          // alert(response.code);
          if (response.code == -1) {
            _this.$message('文件导入失败!', '提示');
            _this.$refs.verUpload.clearFiles();
            // vm.$refs.accessTables.remoteData();
          } else {
            _this.$message('成功导入' + response.message + '条数据!', '提示');
            _this.$refs.verUpload.clearFiles();
            _this.$refs.refTable.remoteData();
            // vm.$refs.accessTables.remoteData();
          }
        },
        onError: function () {
          this.$message('文件导入失败!', '提示');
          this.$refs.verUpload.clearFiles();
          // vm.$refs.accessTables.remoteData();
        },
        // 上传之前判断文件格式
        beforeAvatarUpload: function (file) {
          var regex = /^.*\.(?:xls|xlsx)$/i;
          if (!regex.test(file.name)) {
            this.$message.error('只能导入xls或xlsx格式文件!');
            return false;
          }
          return file.name;
        },
        submitUpload: function () {
          this.$refs.verUpload.submit();
          this.uploadDialog = false;
        },
        downTable: function (row, event) {
          var url = backend.fileService + '/api/file/provider/download?fileId=' + '7/2/merchantTempModel.xlsx';
          yufp.util.download(url);
        },
        // 上传模板
        upTable: function (row, event) {
          var _self = this;
          // _self.deleteVisible = false;
          _self.uploadInfoVisible = true;
          this.$nextTick(function () {
            // var obj = _self.$refs[refTable].selections[0];
            // this.uploadInfoform = Object.assign(this.uploadInfoform, obj);
            // 初始化查询上传附件
            // return yufp.service.getUrl({url: me.uploadAction});
            // 获取附件列表
            // vm.$refs.filesTable.queryFn(files);
            // 设置附件列表组件传入NOTICEID
            this.noticeUpLoadBusNo = {
              busNo: '00000000'
            };
          });
        }
      }
    });
  };
});