/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-2 16:52:42.
 * @updated by
 * @description 客户移交
 */
define(['./custom/plugins/yufp.watermark.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('IN_CUST_STAT,CD0011,CD0016,CD0019,CD0243,CD0032,ACT_APP_STATS,CD0241');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          // 客户经理放大镜
          custManagerParams: {
            user: {
              dataUrl: '/api/grantapply/getcm'
            },
            trustOrg: yufp.session.org.code,
            trustFlag: false
          },
          forqueryFormdata: {},
          initFilesParams: {
            condition: JSON.stringify({
              busNo: ''
            })
          },
          fileBtnVisible: true,
          uuid: '',
          fileUpLoadBusNo: {},
          mgrQueryModel: {},
          mgrFormdata: {},
          messageId: '',
          oneOrg: '', // 一级机构编号
          baseParams: { condition: JSON.stringify({ userId: yufp.session.user.userId }) },
          // dataUrl: '/trade/example/list',
          // 查询服务
          // dataUrl: backend.custpubService + '/api/ocrmfcitransapply/list',
          dataUrl: backend.custpubService + '/api/ocrmfcitransapply/mycustlist',
          mgrdataUrl: backend.custpubService + '/api/ocrmfcitransapply/mycustmgr',
          passformdata: {},
          initiformdata: {},
          mgrDialogVisible: false,
          passiveDialogVisible: false,
          initiativeDialogVisible: false,
          dialogHistoryVisible: false,
          formDisabled: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          tabactiveName: 'inBank',
          // 被动移交行内非管户客户数据
          custInnoJData: [],
          // 被动移交行外客户数据
          custOutnoJData: [],
          // 主动移交客户数据
          custJData: [],
          bizSeqNo: '',
          // 审批流组件参数
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          // 行内非管户客户选择组件参数
          selectInnoJCustParams: {
            rowIndex: true,
            user: {
              fieldColumns: 3,
              fieldData: [
                {
                  label: '客户类型',
                  field: 'custType',
                  value: '',
                  type: 'select',
                  dataCode: 'CD0016',
                  required: true,
                  change: function (custType) {
                    if (custType == '1') {
                      _this.selectInnoJCustParams.user.fieldData[4].hidden = true;
                      _this.selectInnoJCustParams.user.fieldData[5].hidden = false;
                      _this.selectInnoJCustParams.user.fieldData[6].hidden = true;
                    } else if (custType == '2') {
                      _this.selectInnoJCustParams.user.fieldData[4].hidden = true;
                      _this.selectInnoJCustParams.user.fieldData[5].hidden = true;
                      _this.selectInnoJCustParams.user.fieldData[6].hidden = false;
                    } else {
                      _this.selectInnoJCustParams.user.fieldData[4].hidden = false;
                      _this.selectInnoJCustParams.user.fieldData[5].hidden = true;
                      _this.selectInnoJCustParams.user.fieldData[6].hidden = true;
                    }
                  }
                },
                { label: '客户状态', field: 'custStatus', type: 'select', dataCode: 'CD0019' },
                { label: '客户号', field: 'custId', type: 'input' },
                { label: '客户名称', field: 'custName', type: 'input' },
                { label: '证件类型', field: 'certType', type: 'select', dataCode: 'CD0011' },
                { label: '证件类型', field: 'certType', type: 'select', hidden: true, dataCode: 'CD0348' },
                { label: '证件类型', field: 'certType', type: 'select', hidden: true, dataCode: 'CD0349' },
                { label: '证件号码', field: 'certNo', type: 'input', hidden: 'true' },
                { label: '', field: 'oneOrg', type: 'input', value: '', hidden: true }
              ],
              majTableColumns: [
                { label: '客户类型', prop: 'custType', width: '120', resizable: true, dataCode: 'CD0016' },
                { label: '客户状态', prop: 'custStatus', width: '150', resizable: true, dataCode: 'CD0019' },
                { label: '客户号', prop: 'custId', width: '100', resizable: true },
                { label: '客户名称', prop: 'custName', width: '120', resizable: true },
                { label: '证件类型', prop: 'certType', width: '120', resizable: true, dataCode: 'CD0011' },
                { label: '证件号码', prop: 'certNo', width: '100', resizable: true },
                { label: '机构', prop: 'orgName', width: '100', resizable: true },
                { label: '客户经理', prop: 'mgrName', width: '100', resizable: true }
              ],
              dataParams: { condition: JSON.stringify({ orgId: yufp.session.org.code, userId: yufp.session.userId }) },
              // 查询行内非管户客户
              dataUrl: backend.custpubService + '/api/ocrmfcitransapply/innercustlist'
            }
          },
          // 行外客户选择组件参数
          selectOutnoJCustParams: {
            rowIndex: true,
            user: {
              fieldColumns: 3,
              fieldData: [
                {
                  label: '客户类型',
                  field: 'custType',
                  type: 'select',
                  value: '',
                  dataCode: 'CD0016',
                  required: true,
                  change: function (custType) {
                    if (custType == '1') {
                      _this.selectOutnoJCustParams.user.fieldData[4].hidden = true;
                      _this.selectOutnoJCustParams.user.fieldData[5].hidden = false;
                      _this.selectOutnoJCustParams.user.fieldData[6].hidden = true;
                    } else if (custType == '2') {
                      _this.selectOutnoJCustParams.user.fieldData[4].hidden = true;
                      _this.selectOutnoJCustParams.user.fieldData[5].hidden = true;
                      _this.selectOutnoJCustParams.user.fieldData[6].hidden = false;
                    } else {
                      _this.selectOutnoJCustParams.user.fieldData[4].hidden = false;
                      _this.selectOutnoJCustParams.user.fieldData[5].hidden = true;
                      _this.selectOutnoJCustParams.user.fieldData[6].hidden = true;
                    }
                  }
                },
                { label: '客户状态', field: 'custStatus', type: 'select', dataCode: 'CD0019' },
                { label: '客户号', field: 'custId', type: 'input' },
                { label: '客户名称', field: 'custName', type: 'input' },
                { label: '证件类型', field: 'certType', type: 'select', dataCode: 'CD0011' },
                { label: '证件类型', field: 'certType', type: 'select', hidden: true, dataCode: 'CD0348' },
                { label: '证件类型', field: 'certType', type: 'select', hidden: true, dataCode: 'CD0349' },
                { label: '证件号码', field: 'certNo', type: 'input' },
                { label: '', field: 'oneOrg', type: 'input', value: '', hidden: true }
              ],
              majTableColumns: [
                { label: '客户类型', prop: 'custType', width: '120', resizable: true, dataCode: 'CD0016' },
                { label: '客户状态', prop: 'custStatus', width: '150', resizable: true, dataCode: 'CD0019' },
                { label: '客户号', prop: 'custId', width: '100', resizable: true },
                { label: '客户名称', prop: 'custName', width: '120', resizable: true },
                { label: '证件类型', prop: 'certType', width: '120', resizable: true, dataCode: 'CD0011' },
                { label: '证件号码', prop: 'certNo', width: '100', resizable: true },
                { label: '机构', prop: 'orgName', width: '100', resizable: true },
                { label: '客户经理', prop: 'mgrName', width: '100', resizable: true }
              ],
              dataParams: { condition: JSON.stringify({ orgId: yufp.session.org.code, userId: yufp.session.userId }) },
              // 查询行外客户
              dataUrl: backend.custpubService + '/api/ocrmfcitransapply/outercustlist'
            }
          },
          // 管户客户查询组件参数
          selectJCustParams: {
            rowIndex: true,
            user: {
              fieldColumns: 3,
              fieldData: [
                {
                  label: '客户类型',
                  field: 'custType',
                  type: 'select',
                  value: '',
                  dataCode: 'CD0016',
                  required: false,
                  change: function (custType) {
                    if (custType == '1') {
                      _this.selectJCustParams.user.fieldData[4].hidden = true;
                      _this.selectJCustParams.user.fieldData[5].hidden = false;
                      _this.selectJCustParams.user.fieldData[6].hidden = true;
                    } else if (custType == '2') {
                      _this.selectJCustParams.user.fieldData[4].hidden = true;
                      _this.selectJCustParams.user.fieldData[5].hidden = true;
                      _this.selectJCustParams.user.fieldData[6].hidden = false;
                    } else {
                      _this.selectJCustParams.user.fieldData[4].hidden = false;
                      _this.selectJCustParams.user.fieldData[5].hidden = true;
                      _this.selectJCustParams.user.fieldData[6].hidden = true;
                    }
                  }
                },
                { label: '客户状态', field: 'custStatus', type: 'select', dataCode: 'CD0019' },
                { label: '客户号', field: 'custId', type: 'input' },
                { label: '客户名称', field: 'custName', type: 'input' },
                { label: '证件类型', field: 'certType', type: 'select', hidden: true, dataCode: 'CD0011' },
                { label: '证件类型', field: 'certType', type: 'select', hidden: true, dataCode: 'CD0348' },
                { label: '证件类型', field: 'certType', type: 'select', hidden: true, dataCode: 'CD0349' },
                { label: '证件号码', field: 'certNo', type: 'input' },
                { label: '', field: 'oneOrg', type: 'input', value: '', hidden: true }
              ],
              majTableColumns: [
                { label: '客户类型', prop: 'custType', resizable: true, dataCode: 'CD0016' },
                { label: '客户状态', prop: 'custStatus', resizable: true, dataCode: 'CD0019' },
                { label: '客户号', prop: 'custId', resizable: true },
                { label: '客户名称', prop: 'custName', resizable: true },
                { label: '证件类型', prop: 'certType', width: '120', resizable: true, dataCode: 'CD0011' },
                { label: '证件号码', prop: 'certNo', width: '180', resizable: true },
                { label: '归属机构', prop: 'orgName', resizable: true },
                { label: '机构主协办类型', prop: 'orgType', width: '120', resizable: true, dataCode: 'CD0241' },
                { label: '归属客户经理', prop: 'mgrName', width: '120', resizable: true },
                { label: '客户经理主协办类型', prop: 'mgrType', width: '120', resizable: true, dataCode: 'CD0241' }
              ],
              dataParams: { condition: JSON.stringify({ userId: yufp.session.userId }) },
              // 查询全行管户客户
              dataUrl: backend.custpubService + '/api/ocrmfcitransapply/mycustlist'
            }
          }
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          async: false,
          url: backend.custpubService + '/api/allcust/getlevel',
          data: {
            orgId: yufp.session.org.code
          },
          callback: function (code, message, response) {
            if (code == 0) {
              _this.oneOrg = response.data.oneOrg;
              _this.forqueryFormdata.oneOrg = response.data.oneOrg;
              // _this.selectJCustParams.user.fieldData[8].value = response.data.oneOrg;
              // _this.selectOutnoJCustParams.user.fieldData[8].value = response.data.oneOrg;
              // _this.selectInnoJCustParams.user.fieldData[8].value = response.data.oneOrg;
            }
          }
        });
        yufp.service.request({
          method: 'GET',
          url: backend.custgroupService + '/api/allcust/mybusitype',
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.data.busiType == '2') {
                _this.forqueryFormdata.custType = '2';
                // _this.selectJCustParams.user.fieldData[0].value = '2';
                // _this.selectOutnoJCustParams.user.fieldData[0].value = '2';
                // _this.selectInnoJCustParams.user.fieldData[0].value = '2';
              } else {
                _this.forqueryFormdata.custType = '1';
                // _this.selectJCustParams.user.fieldData[0].value = '1';
                // _this.selectOutnoJCustParams.user.fieldData[0].value = '1';
                // _this.selectInnoJCustParams.user.fieldData[0].value = '1';
              }
            }
          }
        });
      },
      methods: {
        beforeFileUpload: function (file) {
          var isLt10M = file.size / 1024 / 1024 < 50;
          if (!isLt10M) {
            this.$message.error('上传文件大小不能超过 50MB!');
          }
          var index = file.name.lastIndexOf('.');
          var ext = file.name.substr(index + 1);
          // var fileType = ['image/jpeg', 'image/gif', 'image/png', 'image/bmp', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/x-rar'];
          var fileType = ['image/jpeg', 'image/gif', 'image/png', 'image/bmp', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/x-rar', 'application/x-zip-compressed', 'application/java-archive', 'image/gif', 'image/bmp', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/x-tar', 'application/octet-stream', 'application/x-rar-compressed' ];
          var count = 0;
          var fileCheck = true;
          for (var i in fileType) {
            if (file.type == fileType[i] || ext == 'rar') {
              count++;
            }
          }
          if (count == 0) {
            fileCheck = false;
            this.$message.error('上传文件应为图片、文本、表格、压缩包格式！');
          }
          return fileCheck && isLt10M;
        },
        uploadSuccessFn: function () {
          this.fileTableQuery({ messageId: this.messageId });
          this.$message({
            showClose: true,
            message: '文件上传成功',
            type: 'success'
          });
        },
        fileTableQuery: function (obj) {
          var _this = this;
          var messageIdTemp = obj != null && obj.messageId != null ? obj.messageId : '';
          _this.fileUpLoadBusNo = { busNo: messageIdTemp};
          // 初始化附件列表查询时，传入为空
          var tempParams = {
            condition: JSON.stringify({
              busNo: messageIdTemp
            })
          };
          yufp.extend(_this.initFilesParams, tempParams);
          // 获取附件列表
          _this.$refs.fileTable.queryFn();
        },
        /**
        * 查询——搜索按钮
        */
        /**
        * 选择客户经理后执行
        * @param data 选择的客户经理数据
        */
        // mgrSelectFn: function (data) {
        //   // TODO 选择客户经理后，返显客户经理所属机构名称
        //   this.initiformdata.tOrgName = data[0].orgName;
        //   this.initiformdata.tMgrId = data[0].userId;
        //   this.initiformdata.tMgrName = data[0].userName;
        //   this.initiformdata.tOrgId = data[0].orgId;
        //   this.initiformdata.orgLevel = data[0].orgLevel;
        // },
        mgrClickFn: function () {
          var _this = this;
          _this.mgrDialogVisible = true;
          _this.$nextTick(function () {
            _this.resetMgrMainFn();
            _this.$refs.mgrTable.tabledata = [];
          });
        },
        saveMgrFn: function () {
          var _this = this;
          if (_this.$refs.mgrTable.selections.length != '1') {
            _this.$message('请选择一条数据');
            return;
          }
          _this.initiformdata.tOrgName = _this.$refs.mgrTable.selections[0].orgName;
          _this.initiformdata.tMgrId = _this.$refs.mgrTable.selections[0].mgrId;
          _this.initiformdata.tMgrName = _this.$refs.mgrTable.selections[0].mgrName;
          _this.initiformdata.tMgrType = _this.$refs.mgrTable.selections[0].mgrType;
          _this.initiformdata.tOrgId = _this.$refs.mgrTable.selections[0].orgId;
          _this.initiformdata.orgLevel = '4';
          _this.mgrDialogVisible = false;
        },
        searchFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.custforSearchForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.forqueryFormdata, model);
          model.userId = yufp.session.userId;
          model.orgId = yufp.session.org.code;
          model.oneOrg = _this.oneOrg;
          var param = {
            condition: JSON.stringify(model)
          };
          _this.$refs.forrefTable.remoteData(param);
        },
        searchMgrFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.mgrSearchForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.mgrQueryModel, model);
          model.userId = yufp.session.userId;
          model.custId = _this.$refs.forrefTable.selections[0].custId;
          var param = {
            condition: JSON.stringify(model)
          };
          _this.$refs.mgrTable.remoteData(param);
        },
        /**
      * 查询——重置按钮
     */
        resetMainFn: function () {
          this.$refs.custforSearchForm.resetFields();
        },
        resetMgrMainFn: function () {
          this.$refs.mgrSearchForm.resetFields();
        },
        /**
         * 主动移交——取消
         */
        cancelJFn: function () {
          var _this = this;
          _this.initiativeDialogVisible = false;
        },
        /**
         * 主动移交——保存
         */
        saveJFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.initiformdata, model);
          var validate = false;
          _this.$refs.initirefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var selections = _this.$refs.forrefTable.selections;
          if (selections.length == 0) {
            _this.$message({
              type: 'warning',
              message: '请至少新增一条客户数据'
            });
            return;
          }
          var custIdAry = [];
          var custNameAry = [];
          var custTypeAry = [];
          var mgrIdAry = [];
          var applyType = [];
          // 原所属机构
          var orgIdAry = [];
          for (var i = 0, len = selections.length; i < len; i++) {
            custIdAry.push(selections[i].custId);
            custNameAry.push(selections[i].custName);
            custTypeAry.push(selections[i].custType);
            mgrIdAry.push(selections[i].belongMgr);
            orgIdAry.push(selections[i].belongBrch);
            applyType.push(selections[i].mgrType);
          }
          model.custId = custIdAry.join(',');
          model.custName = custNameAry.join(',');
          model.custType = custTypeAry.join(',');
          model.mgrId = mgrIdAry.join(',');
          model.orgId = orgIdAry.join(',');
          model.applyType = applyType.join(',');
          model.uuid = _this.uuid;
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpubService + '/api/ocrmfcitransapply/addactive',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.$refs.forrefTable.remoteData();
                _this.initiativeDialogVisible = false;
                // _this.fileBtnVisible = true;
                // 审批流数据
                var commintData = {};
                _this.bizSeqNo = response.data.uuid;
                // 流程主键
                commintData.bizSeqNo = response.data.uuid;
                // _this.messageId = response.data.uuid;
                yufp.service.request({
                  method: 'POST',
                  url: backend.custpubService + '/api/ocrmfcitransapply/belongOrgId',
                  data: {
                    myOrgId: yufp.session.org.code,
                    orgId: _this.initiformdata.tOrgId
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.code === 0) {
                      commintData.applType = 'YJKHSP';
                      var belongOrgId = response.data.belongOrgId;// 申请人一级支行id
                      var belongOrgId1 = response.data.belongOrgId1;// 接收人一级支行id
                      commintData.paramMap = {
                        belongOrgId: belongOrgId,
                        belongOrgId1: belongOrgId1,
                        beatBack: '0' // 打回标志
                      };
                      commintData.custId = selections[0].custId;
                      commintData.custName = selections[0].custName;
                      var load = _this.$loading();
                      _this.$refs.approvalRef.wfInit(commintData, load);
                      // _this.fileTableQuery({messageId: _this.messageId});
                      // _this.saveBtnShow = false;
                    } else {
                      _this.$message.error('查询失败');
                    }
                  }
                });
              } else {
                _this.$message.error('保存失败');
              }
            }
          });
        },
        /**
         * 主动移交——保存
         */
        asaveJFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.initiformdata, model);
          var validate = false;
          _this.$refs.initirefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (_this.custJData.length == 0) {
            _this.$message({
              type: 'warning',
              message: '请至少新增一条客户数据'
            });
            return;
          }
          var custIdAry = [];
          var custNameAry = [];
          var custTypeAry = [];
          var mgrIdAry = [];
          var applyType = [];
          // 原所属机构
          var orgIdAry = [];
          for (var i = 0, len = _this.custJData.length; i < len; i++) {
            custIdAry.push(_this.custJData[i].custId);
            custNameAry.push(_this.custJData[i].custName);
            custTypeAry.push(_this.custJData[i].custType);
            mgrIdAry.push(_this.custJData[i].belongMgr);
            orgIdAry.push(_this.custJData[i].belongBrch);
            applyType.push(_this.custJData[i].mgrType);
          }
          model.custId = custIdAry.join(',');
          model.custName = custNameAry.join(',');
          model.custType = custTypeAry.join(',');
          model.mgrId = mgrIdAry.join(',');
          model.orgId = orgIdAry.join(',');
          model.applyType = applyType.join(',');
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpubService + '/api/ocrmfcitransapply/addactive',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.initiativeDialogVisible = false;
                // 审批流数据
                var commintData = {};
                _this.bizSeqNo = response.data.uuid;
                // 流程主键
                commintData.bizSeqNo = response.data.uuid;
                // 请求行内行外的标志
                yufp.service.request({
                  method: 'POST',
                  url: backend.custpubService + '/api/ocrmfcitransapply/islevel',
                  data: {
                    myOrgId: yufp.session.org.code,
                    orgId: _this.initiformdata.tOrgId
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.code === 0) {
                      if (response.data == 0) {
                        // 通过返回的数据判断走哪个审批流
                        commintData.applType = 'YJKHSP';
                        commintData.paramMap = {
                          // 总行
                          orgLevel: '1'
                        };
                      } else {
                        commintData.applType = 'YJKHSP';
                        commintData.paramMap = {
                          // 一级审批
                          orgLevel: '2'
                        };
                      }
                      commintData.custId = _this.custJData[0].custId;
                      commintData.custName = _this.custJData[0].custName;
                      var load = _this.$loading();
                      _this.$refs.approvalRef.wfInit(commintData, load);
                    } else {
                      _this.$message.error('查询失败');
                    }
                  }
                });
              } else {
                _this.$message.error('保存失败');
              }
            }
          });
        },
        /**
        * 点击被动移交tab页签
        */
        clickTabFn: function (tab) {
          if (tab.name === 'outBank') {
            // 点击tab时，清空表格中选择的用户
            this.$refs.refOutnotJurisdictCustTable.clearSelection();
          } else if (tab.name === 'inBank') {
            this.$refs.refInnotJurisdictCustTable.clearSelection();
          }
        },
        /**
         * 被动移交——取消
         */
        cancelnoJFn: function () {
          var _this = this;
          _this.passiveDialogVisible = false;
        },
        /**
         * 被动移交——保存
         */
        savenoJFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.passformdata, model);
          var validate = false;
          _this.$refs.passrefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var noJtabledata = [];
          if (_this.tabactiveName === 'outBank') {
            // 点击tab时，清空表格中选择的用户
            noJtabledata = this.custOutnoJData;
          } else if (_this.tabactiveName === 'inBank') {
            noJtabledata = this.custInnoJData;
          }
          if (noJtabledata.length == 0) {
            _this.$message({
              type: 'warning',
              message: '请至少新增一条客户数据'
            });
            return;
          }
          var custIdAry = [];
          var custNameAry = [];
          var custTypeAry = [];
          var mgrIdAry = [];
          // 原所属机构
          var orgIdAry = [];
          // 判断客户是否属于同一机构
          // 遍历选择的数据，判断是否都归属于同一机构下，如果是，才可以保存
          var flagt = noJtabledata.every(function (item) {
            return item.orgId === noJtabledata[0].orgId;
          });
          if (!flagt) {
            _this.$message({
              message: '已添加用户不属于同一机构，请重新添加',
              type: 'warning'
            });
            return;
          }
          for (var i = 0, len = noJtabledata.length; i < len; i++) {
            custIdAry.push(noJtabledata[i].custId);
            custNameAry.push(noJtabledata[i].custName);
            custTypeAry.push(noJtabledata[i].custType);
            mgrIdAry.push(noJtabledata[i].belongMgr);
            orgIdAry.push(noJtabledata[i].belongBrch);
          }
          model.custId = custIdAry.join(',');
          model.custName = custNameAry.join(',');
          model.custType = custTypeAry.join(',');
          model.mgrId = mgrIdAry.join(',');
          model.orgId = orgIdAry.join(',');
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpubService + '/api/ocrmfcitransapply/addpassive',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                // 通过层级判断走哪个审批流
                var commintData = {};
                // 模型版本申请类型字典项
                // 行内客户审批流是一级，commintData.paramMap中orgLevel: '2'
                // 行外客户审批流是总行，commintData.paramMap中 orgLevel: '1'
                if (_this.tabactiveName === 'inBank') {
                  commintData.applType = 'YJKHSP';
                  commintData.paramMap = {
                    orgLevel: '2'
                  };
                } else if (_this.tabactiveName === 'outBank') {
                  commintData.applType = 'YJKHSP';
                  commintData.paramMap = {
                    orgLevel: '1'
                  };
                }
                _this.bizSeqNo = response.data.uuid;
                // 流程主键
                commintData.bizSeqNo = response.data.uuid;
                commintData.custId = noJtabledata[0].custId;
                commintData.custName = noJtabledata[0].custName;
                var load = _this.$loading();
                _this.$refs.approvalRef.wfInit(commintData, load);
                _this.passiveDialogVisible = false;
              } else {
                _this.$message.error('保存失败');
              }
            }
          });
        },
        /**
         * 主动移交按钮点击事件处理程序
         */
        initiativeHandoverFn: function () {
          var _this = this;
          if (_this.$refs.forrefTable.selections.length < 1) {
            _this.$message({
              type: 'warning',
              message: '请至少新增一条客户数据'
            });
            return;
          }
          _this.initiativeDialogVisible = true;
          _this.saveBtnShow = true;
          _this.fileBtnVisible = true;
          var model = { uuid: '' };
          yufp.service.request({
            method: 'POST',
            url: backend.custpubService + '/api/ocrmfcitransapply/getUuid',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.uuid = response.data.uuid;
                _this.messageId = response.data.uuid;
                document.getElementsByClassName('el-upload-list el-upload-list--text')[0].innerHTML = '';
                _this.$nextTick(function () {
                  _this.$refs.initirefForm.resetFields();
                  _this.fileTableQuery({ messageId: _this.messageId });
                });
              }
            }
          });
        },
        /**
         * 被动移交点击事件处理程序
         */
        passiveHandoverFn: function () {
          var _this = this;
          _this.passiveDialogVisible = true;
          _this.$nextTick(function () {
            // 清空弹出框中的表单和静态表格已存在/已选择的数据
            _this.$refs.passrefForm.resetFields();
            _this.custInnoJData = [];
            _this.custOutnoJData = [];
          });
        },
        /**
         * 点击被动移交客户清单——新增按钮 触发，
         * 打开行内客户放大镜
         */
        addInnoJCustFn: function () {
          var _this = this;
          _this.$refs.selectInnoJCust.dialogVisible = true;
          _this.$nextTick(function () {
            // 刷新放大镜中的数据
            _this.$refs.selectInnoJCust.$refs.usertable.clearSelection();
            _this.$refs.selectInnoJCust.$refs.queryCondition.$children[0].resetFields();
          });
        },
        /**
         * 点击被动移交客户清单——新增按钮 触发，
         * 打开行外客户放大镜
         */
        addOutnoJCustFn: function () {
          var _this = this;
          _this.$refs.selectOutnoJCust.dialogVisible = true;
          _this.$nextTick(function () {
            // 刷新放大镜中的数据
            _this.$refs.selectOutnoJCust.$refs.usertable.clearSelection();
            _this.$refs.selectOutnoJCust.$refs.queryCondition.$children[0].resetFields();
          });
        },
        /**
         * 点击被动移交客户清单——删除按钮 触发
         * 移除表格中的行内非管户客户数据
         */
        deleteInnoJCustFn: function () {
          var selections = this.$refs.refInnotJurisdictCustTable.selections;
          for (var i = 0, len = selections.length; i < len; i++) {
            for (var j = 0; j < this.custInnoJData.length; j++) {
              if (selections[i].custId === this.custInnoJData[j].custId) {
                this.custInnoJData.splice(j, 1);
              }
            }
          }
        },
        /**
         * 点击被动移交客户清单——删除按钮 触发
         * 移除表格中的行外客户数据
         */
        deleteOutnoJCustFn: function () {
          var selections = this.$refs.refOutnotJurisdictCustTable.selections;
          for (var i = 0, len = selections.length; i < len; i++) {
            for (var j = 0; j < this.custOutnoJData.length; j++) {
              if (selections[i].custId === this.custOutnoJData[j].custId) {
                this.custOutnoJData.splice(j, 1);
              }
            }
          }
        },
        /**
         * 被动移交发起弹出框——新增行内客户——选择客户后触发
         * @param {Array} data 选择的客户数据
         */
        custInnoJSeletFn: function (data) {
          var _this = this;
          for (var k = 0, len = data.length; k < len; k++) {
            _this.custInnoJData.push(data[k]);
          }
          // 去重操作
          for (var i = _this.custInnoJData.length - 1; i > 0; i--) {
            for (var j = 0; j < _this.custInnoJData.length; j++) {
              if (j != i && _this.custInnoJData[i].custId == _this.custInnoJData[j].custId) {
                _this.custInnoJData.splice(i, 1);
              }
            }
          }
        },
        /**
         * 被动移交发起弹出框——新增客户——选择行外客户后触发
         * @param {Array} data 选择的客户数据
         */
        custOutnoJSeletFn: function (data) {
          var _this = this;
          for (var k = 0, len = data.length; k < len; k++) {
            _this.custOutnoJData.push(data[k]);
          }
          // 去重操作
          for (var i = _this.custOutnoJData.length - 1; i > 0; i--) {
            for (var j = 0; j < _this.custOutnoJData.length; j++) {
              if (j != i && _this.custOutnoJData[i].custId == _this.custOutnoJData[j].custId) {
                _this.custOutnoJData.splice(i, 1);
              }
            }
          }
        },
        /**
         * 点击主动移交客户清单——新增按钮 触发，
         * 打开非所辖客户放大镜
         */
        addJCustFn: function () {
          var _this = this;
          _this.$refs.selectJCust.dialogVisible = true;
          _this.$nextTick(function () {
            // 清除放大镜中选择的数据
            _this.$refs.selectJCust.$refs.usertable.clearSelection();
            _this.$refs.selectJCust.$refs.queryCondition.$children[0].resetFields();
          });
        },
        /**
         * 点击主动移交客户清单——删除按钮 触发
         * 移除表格中的客户数据
         */
        deleteJCustFn: function () {
          var selections = this.$refs.refJurisdictCustTable.selections;
          for (var i = 0, len = selections.length; i < len; i++) {
            for (var j = 0; j < this.custJData.length; j++) {
              if (selections[i].custId === this.custJData[j].custId) {
                this.custJData.splice(j, 1);
              }
            }
          }
        },
        /**
         * 主动移交发起弹出框——新增客户——选择客户后触发
         * @param {Array} data 选择的客户数据
         */
        custJSeletFn: function (data) {
          var _this = this;
          for (var k = 0, len = data.length; k < len; k++) {
            _this.custJData.push(data[k]);
          }
          // 去重操作
          for (var i = _this.custJData.length - 1; i > 0; i--) {
            for (var j = 0; j < _this.custJData.length; j++) {
              if (j != i && _this.custJData[i].custId == _this.custJData[j].custId) {
                _this.custJData.splice(i, 1);
              }
            }
          }
        },
        /**
        * 审批流程完成后调用
        */
        onAfterCloseFn: function () {
          var _this = this;
          var param = { condition: JSON.stringify({ applyNo: this.bizSeqNo }) };
          yufp.service.request({
            method: 'POST',
            url: backend.custpubService + '/api/ocrmfcitransapply/transferapproval',
            data: param,
            callback: function (code, message, response) {
              // _this.initiativeDialogVisible = true;
              // _this.fileBtnVisible = true;
              // _this.saveBtnShow = false;
              // _this.fileTableQuery({messageId: _this.messageId});
              _this.$message('操作成功');
            }
          });
        },
        /**
         * 历史查询
         */
        historyFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogHistoryVisible = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        }
      }
    });
  };
});