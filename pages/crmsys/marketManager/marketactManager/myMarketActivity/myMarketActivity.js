/**
 * @Created by zhuly6 zhuly6@yusys.com.cn on 2018-12-28 09:36:37.
 * @updated by
 * @description 营销活动管理-我的活动
 */
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
  * 页面加载完成时触发
  * @param hashCode 路由ID
  * @param data 传递数据对象
  * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('ACTION_TYPE,OCRM_MKT_ACTI_STAT,PRO_STEP,WF_APP_STATUS,EXE_OBJ_TYPE,AIM_CUST_SOURCE,PROGERSS_STEP,CD0238');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          myActDataUrl: backend.adminService + '/api/mkt/myactilistquery',
          actInfoDataUrl: backend.adminService + '/api/mktrecord/actidetaillistquery',
          actExeInfoDataUrl: backend.adminService + '/api/mktrecord/actiexedetaillistquery',
          prodDataUrl: backend.adminService + '/api/mkt/actiprodlistquery',
          custDataUrl: backend.adminService + '/api/mkt/acticustlistquery',
          atcDataUrl: backend.adminService + '/api/mkt/actifilelistquery',
          taskDataUrl: backend.adminService + '/api/mkt/actitargetlistquery',
          actParams: { condition: JSON.stringify({ userId: yufp.session.user.userId }) },
          dataUrl: '',
          formdata: {},
          dialogVisible: false,
          infoDisabled: false,
          actCarVisible: false,
          actBakVisible: false,
          actCarEditVisible: false,
          infoDialogVisible: false,
          actBackData: [],
          numRules: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '数字', trigger: 'change' },
            {max: 10, message: '长度不能超过10个字符', trigger: 'blur'}],
          monoyRules: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '数字', trigger: 'change' },
            {max: 15, message: '长度不能超过15个字符', trigger: 'blur'}],
          viewType: 'DETAIL',
          isAcitiveAdd: true,
          isProductInfo: false,
          isTaskAllot: false,
          isCustomInfo: false,
          isAttachmentAdd: false,
          showType: 'isAcitiveAdd',
          editDisabled: false,
          viewTitle: ['活动详情', '执行活动明细', '新增执行活动明细', '修改执行活动明细', '活动反馈'],
          actCustProdVisible: false, // 活动明细
          _viewTitles: '',
          turnVisible: false,
          infoAddFlag: false,
          actiId: { condition: JSON.stringify({ actiId: '' }) },
          actiExeParam: { condition: JSON.stringify({ actiId: '' }) },
          createUser: { condition: JSON.stringify({ userId: yufp.session.userCode }) },
          fprodParams: { condition: JSON.stringify({ actiId: '' })},
          fileParams: { condition: JSON.stringify({ busNo: '' })},
          custParams: { condition: JSON.stringify({ actiId: '' })},
          usertargetParams: { condition: JSON.stringify({ actiId: '' }) },
          viewTitles: '',
          actInfoFormdata: {},
          taskAllotFormdata: {},
          activeAddFormdata: {},
          ifEditInfo: false,
          actTem: {},
          actInfo: {}, // 选中的额活动信息数据
          actBackFormdata: {},
          taskAllotTable2Data: [],
          taskManTabledata: [],
          taskOrgTabledata: [],
          custOptions: [], // 客户下拉框
          prodOptions: [], // 产品下拉框
          tempCustInfo: [], // 客户临时数据
          tempProdInfo: [], // 产品临时数据
          tableKey: 0,
          taskInfo: [],
          showTask: ''
        };
      },
      methods: {
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
        cancelFn: function (formThis) {
          var _this = this;
          if (formThis == 'activeInfoForm') {
            _this.dialogVisible = false;
          }
          if (formThis == 'turnActivetyForm') {
            _this.turnVisible = false;
          }
        },
        /**
        * 保存
        */
        saveFn: function () {
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
        * 活动执行明细
        */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          _this.actTem = selectionsAry[0];
          if (selectionsAry.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          selectionsAry[0].actiMode = typeof selectionsAry[0].actiMode == 'string' ? selectionsAry[0].actiMode.split(',') : selectionsAry[0].actiMode;
          _this.showType = 'isAcitiveAdd';
          _this.infoDisabled = true;
          _this.viewTitles = _this.viewTitle[0];
          _this.editDisabled = true;
          _this.infoDialogVisible = true;
          _this.taskInfo = [];
          _this.fprodParams = { condition: JSON.stringify({ actiId: _this.actTem.actiId })};
          _this.fileParams = { condition: JSON.stringify({ busNo: _this.actTem.actiId + ''})};
          _this.custParams = { condition: JSON.stringify({ actiId: _this.actTem.actiId })};
          _this.usertargetParams = { condition: JSON.stringify({ actiId: _this.actTem.actiId, org: yufp.session.org.code, exeObjType: '0'}) };
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/activitytargetinfo?actiId=' + _this.actTem.actiId,
            data: '',
            callback: function (code, message, response) {
              if (response.data) {
                var infos = response.data;
                for (let i = 0; i < infos.length; i++) {
                  _this.taskInfo.push({
                    targetName: infos[i].targetName,
                    targetCode: infos[i].targetCode,
                    orignalVal: 'orignalVal' + infos[i].targetCode,
                    targetValue: 'targetValue' + infos[i].targetCode,
                    valueCondition: infos[i].valueCondition
                  });
                }
              }
            }
          });
          _this.$nextTick(function () {
            _this.$refs.activeAddForm.resetFields();
            yufp.clone(selectionsAry[0], _this.activeAddFormdata);
          });
        },
        /**
         * 活动明细
         */
        execTableFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.actInfo = selectionsAry[0];
          if (_this.actInfo.actiStat == '3' || _this.actInfo.actiStat == '4') { // 活动结束后不能再进行执行和反馈
            _this.ifEditInfo = false;
          } else {
            _this.ifEditInfo = false;
          }
          _this.actiId = { condition: JSON.stringify({ actiId: selectionsAry[0].actiId, userId: yufp.session.userCode }) };
          _this.actCustProdVisible = true;
        },
        /**
        * 活动执行明细
        */
        activeInfo: function () {
          var _this = this;
          var selectionsAry = _this.$refs.actCustProdTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.actCarVisible = true;
          _this.actTem = selectionsAry[0];
          _this.actiExeParam = { condition: JSON.stringify({ actiId: selectionsAry[0].actiId, custId: selectionsAry[0].custId }) };
          _this.showType = 'isAcitiveAdd';
          _this.infoDisabled = true;
          _this.editDisabled = true;
        },
        /**
      * 新增活动执行明细
      */
        infoAddFn: function () {
          var _this = this;
          _this.actCarEditVisible = true;
          _this.infoAddFlag = true;
          _this.editDisabled = false;
          _this.viewTitles = _this.viewTitle[2];
          _this.$nextTick(function () {
            _this.$refs.actInfoForm.resetFields();
            _this.$refs.actInfoForm.formdata.custId = _this.actTem.custId;
            _this.$refs.actInfoForm.formdata.custName = _this.actTem.custName;
            _this.$refs.actInfoForm.formdata.majorManger = _this.actTem.majorManger;
            _this.$refs.actInfoForm.formdata.majorOrg = _this.actTem.majorOrg;
            _this.$refs.actInfoForm.formdata.aimCustSource = _this.actTem.aimCustSource;
            _this.$refs.actInfoForm.formdata.progressStage = _this.actTem.progressStep;
            _this.$refs.actInfoForm.formdata.productId = _this.actTem.productId;
            _this.$refs.actInfoForm.formdata.productName = _this.actTem.productName;
          });
        },

        /**
      * 修改活动执行明细
      */
        infoEidtFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.OCRM_F_MK_ACTI_EXC_RECORD.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.actCarEditVisible = true;
          _this.infoAddFlag = false;
          _this.editDisabled = false;
          _this.$nextTick(function () {
            _this.$refs.actInfoForm.resetFields();
            yufp.clone(selectionsAry[0], _this.actInfoFormdata);
          });
        },

        /**
      * 活动执行明细详情
      */
        infoDetailFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.OCRM_F_MK_ACTI_EXC_RECORD.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.actCarEditVisible = true;
          _this.infoAddFlag = false;
          _this.editDisabled = true;
          _this.$nextTick(function () {
            _this.$refs.actInfoForm.resetFields();
            yufp.clone(selectionsAry[0], _this.actInfoFormdata);
          });
        },
        /**
      * 保存新增 修改 活动执行明细
      */
        saveInfoFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.actInfoFormdata, model);
          model.actiId = _this.actTem.actiId;
          var validate = false;
          _this.$refs.actInfoForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (_this.infoAddFlag) {
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/mktrecord/actiexedetailinsert',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.OCRM_F_MK_ACTI_EXC_RECORD.remoteData();
                _this.actCarEditVisible = false;
                _this.$message('操作成功');
              }
            });
          }
          if (!_this.infoAddFlag) {
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/mktrecord/actiexedetailedit',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.OCRM_F_MK_ACTI_EXC_RECORD.remoteData();
                _this.$message({ message: response.message, type: 'warning' });
                _this.actCarEditVisible = false;
              }
            });
          }
        },
        /**
      * 删除活动明细
      */
        infoDeleteFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.OCRM_F_MK_ACTI_EXC_RECORD.selections;
          if (selectionsAry.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/mktrecord/actiexedetaildel',
            data: JSON.stringify(selectionsAry),
            callback: function (code, message, response) {
              _this.$refs.OCRM_F_MK_ACTI_EXC_RECORD.remoteData();
              _this.actCarEditVisible = false;
            }
          });
        },
        /**
      * 切换详情table
      */
        changeInfoFn: function (tableInfo) {
          var _this = this;
          _this.showType = tableInfo;
          _this.fileParams = { condition: JSON.stringify({ busNo: _this.actTem.actiId + ''})};
          if (tableInfo == 'isProductAdd') {
            _this.showType = 'isProductAdd';
          }
          if (tableInfo == 'isCustomAdd') {
            _this.showType = 'isCustomAdd';
          }
          if (tableInfo == 'isTaskAllot') {
            _this.showType = 'isTaskAllot';
          }
          if (tableInfo == 'isAttachmentAdd') {
            _this.showType = 'isAttachmentAdd';
          }
          if (tableInfo == 'isAcitiveAdd') {
            _this.showType = 'isAcitiveAdd';
          }
        },
        /**
        * 切换对象
        */
        changeExetypeFn: function () {
          var _this = this;
          if (_this.taskAllotFormdata.exeObjType == '0') {
            _this.showTask = 'taskManerger';
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/grantapply/getcm',
              callback: function (code, message, response) {
                for (var i = 0; i < response.data.length; i++) {
                  _this.taskManTabledata.push(response.data[i]);
                }
              }
            });
          }
          if (_this.taskAllotFormdata.exeObjType == '1') {

          }
        },
        /**
      * 活动反馈
      */
        activeBackFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selectionsAry[0].actiStat != '3' && selectionsAry[0].actiStat != '4') {
            _this.$message({ message: '只能选择关闭的活动!', type: 'warning' });
            return;
          }
          _this.actTem = selectionsAry[0];
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/actifedbacklist',
            data: { condition: JSON.stringify({ actiId: _this.actTem.actiId, userId: yufp.session.userCode }), size: 1, page: 1 },
            callback: function (code, message, response) {
              if (response.data) {
                var infos = response.data;
                _this.actBackFormdata = infos[0];
                _this.actBakVisible = true;
                _this.viewTitles = _this.viewTitle[4];
              }
            }
          });
          _this.$nextTick(function () {
            _this.$refs.actBackForm.resetFields();
          });
        },
        /**
      *保存 活动反馈
      */
        saveBackFn: function () {
          var _this = this;
          var model = {};
          var validate = false;
          _this.$refs.actBackForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          yufp.clone(_this.actBackFormdata, model);
          model.actiId = _this.actTem.actiId;
          model.actiStat = _this.actTem.actiStat;
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/mkt/actifeedback',
            data: model,
            callback: function (code, message, response) {
              _this.actBakVisible = false;
              _this.$message({message: response.message, type: 'warning'});
            }
          });
        },
        /**
      * 取消按钮
      */
        cancleFn: function (thisForm) {
          var _this = this;
          if (thisForm == 'actCarEditForm') {
            _this.actCarEditVisible = false;
          }
          if (thisForm == 'actBackForm') {
            _this.actBakVisible = false;
          }
        }
      }
    });
  };
});