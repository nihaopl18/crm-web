/**
 * @Created by zhuly6 zhuly6@yusys.com.cn on 2018-1-8
 * @description 营销活动管理-商机管理-我的商机
 */
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
  * 页面加载完成时触发
  * @param hashCode 路由ID
  * @param data 传递数据对象
  * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('PUB_STS,BUS_STAGE,BUS-SRC,BUS_TYPE,SUC_CHANGE,CD0327,OCRM_MKT_ACTI_STAT,ACT_APP_STATS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.adminService + '/api/salesoppor/myopporlistquery',
          saleActDataUrl: backend.adminService + '/api/salesactiv/activilistquery',
          formdata: {},
          busOprInfoVisible: false,
          saleActVisible: false,
          busOprHandVisible: false,
          busCloseVisible: false,
          businessTabData: [],
          actBackData: [],
          saleActFormData: [],
          busBackFormdata: [],
          businessInfoData: [],
          busOprHandFormdata: [],
          saleActHandFormdata: [],
          busCloseFormdata: [],
          saleActHandVisible: false,
          saleActHandFromdata: [],
          actiTem: [],
          exemgrOptions: [],
          busBackVisible: false,
          saleActHandDisable: false,
          viewTitle: ['详情', '销售活动', '新增', '退回', '关闭', '新增销售活动'],
          activeName: 'first',
          saleActAddFalg: false,
          userId: { condition: JSON.stringify({ userId: yufp.session.userId, userCode: yufp.session.userCode }) },
          marketActivityId: { condition: JSON.stringify({ marketActivityId: '' }) },
          fallReason: false,
          custDisabled: true,
          // 产品选择器参数
          prodParams: {
            org: {dataUrl: backend.adminService + '/api/producttype/treelist'},
            role: {dataUrl: backend.adminService + '/api/productbaseinfo/query'}
          },
          MktParams: {needCheckbox: false}
        };
      },
      methods: {
        /**
        * 详情
        */
        infoFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.activeName = 'first';
          _this.busOprInfoVisible = true;
          _this.marketActivityId = { condition: JSON.stringify({ marketActivityId: selections[0].marketActivityId }) };
          _this.$nextTick(function () {
            _this.$refs.businessInfoForm.resetFields();
            yufp.clone(selections[0], _this.businessInfoData);
          });
        },
        /**
     * 修改 新增
     */
        handFn: function (handTitle) {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.selections;
          if (handTitle == 'edit') {
            if (selections.length != 1) {
              _this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            _this.busOprHandVisible = true;
            _this.viewTitle[2] = '修改';
            _this.$nextTick(function () {
              _this.$refs.busOprHandForm.resetFields();
              yufp.clone(selections[0], _this.busOprHandFormdata);
            });
          }
          if (handTitle == 'add') {
            _this.viewTitle[2] = '新增';
            _this.addFlag = true;
            _this.busOprHandVisible = true;
            _this.$nextTick(function () {
              _this.$refs.busOprHandForm.resetFields();
            });
          }
        },
        /**
        * 保存
        */
        saveFn: function () {
          var _this = this;
          var validate = false;
          var addMessage;
          var nowDate = new Date();
          _this.$refs.busOprHandForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          nowDate.setHours(0);
          nowDate.setMinutes(0);
          nowDate.setSeconds(0);
          if (_this.busOprHandFormdata.businessEndDate > _this.busOprHandFormdata.businessValidDate) {
            _this.$message({ message: '商机结束日期不能大于商机有效期', type: 'warning' });
            return;
          }
          if (_this.busOprHandFormdata.businessStartDate < nowDate) {
            if (_this.busOprHandFormdata.businessStartDate.toString() != nowDate.toString()) {
              _this.$message({message: '商机开始日期不能晚于当前日期', type: 'warning'});
              return;
            }
          }
          if (_this.busOprHandFormdata.businessStartDate > _this.busOprHandFormdata.businessEndDate) {
            _this.$message({message: '商机开始日期不能晚于商机结束日期', type: 'warning'});
            return;
          }
          var model = { contactProdName: 'cust1', custId: 'id1' };
          model = yufp.clone(_this.busOprHandFormdata, model);
          if (_this.addFlag) {
            // 新增
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/salesoppor/opporinsert',
              data: model,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _this.dialogVisible = false;
                  _this.$message({ message: response.message });
                  _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.remoteData();
                  _this.busOprHandVisible = false;
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          } else if (!_this.addFlag) {
            // 修改
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/salesoppor/opporedit',
              data: model,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _this.dialogVisible = false;
                  _this.$message({ message: response.message });
                  _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.remoteData();
                  _this.busOprHandVisible = false;
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          } else {
            _this.$message({ message: addMessage, type: 'warning' });
          }
        },
        /**
        * 客户名称 客户联系人信息联动
        *  @param {Array} data 选择的客户数据
        */
        custSeletFn: function (data) {
          var _this = this;
          var custInfoData = [];
          for (var i = 0, len = data.length; i < len; i++) {
            custInfoData.push(data[i]);
          }
          _this.busOprHandFormdata.custName = custInfoData[0].custName;
          _this.busOprHandFormdata.custId = custInfoData[0].custId;
          _this.busOprHandFormdata.custType = custInfoData[0].custType;
          _this.busOprHandFormdata.custStatus = custInfoData[0].custStatus;
        },
        /**
        * 添加客户信息
        */
        getCustDataFn: function (data) {
          var _this = this;
          var resData = [];
          _this.busOprHandFormdata.custId = data[0].custId;
          _this.busOprHandFormdata.custType = data[0].custType;
          _this.busOprHandFormdata.custStatus = data[0].custStatus;
          yufp.service.request({
            method: 'GET',
            async: false,
            url: backend.adminService + '/api/salesoppor/getcustdata/' + data[0].custId,
            callback: function (code, message, response) {
              resData = response.data;
            }
          });
          _this.busOprHandFormdata.custContact = resData[0].contName;
          _this.busOprHandFormdata.custConcactInfo = resData[0].contMeth;
          // 默认为主办客户经理、机构
          _this.busOprHandFormdata.executeUser = resData[0].mgrName;
          _this.busOprHandFormdata.executeOrg = resData[0].orgName;
          for (var i = 0; i < resData.length; i++) {
            var obj = {};
            obj.key = i;
            obj.value = resData[i].mgrName;
            obj.mgrId = resData[i].mgrId;
            obj.orgName = resData[i].orgName;
            obj.orgId = resData[i].orgId;
            _this.exemgrOptions.push(obj);
          }
        },
        /**
        * 选择执行人 执行机构
        */
        changeExeFn: function (data) {
          var _this = this;
          _this.busOprHandFormdata.executeOrg = _this.exemgrOptions[data].orgName;
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = this.$refs.OCRM_F_MK_MKT_SALESOPPOR.selections;
          if (selections.length < 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var arrIds = [];
          for (var i = 0; i < selections.length; i++) {
            arrIds.push(selections[i].businessNo);
          }
          arrIds = arrIds.toString();
          var template = yufp.clone(selections[0], template);
          template.businessNo = arrIds;
          _this.$confirm('是否确认删除?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/salesoppor/oppordel',
                  data: template,
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.remoteData();
                      _this.$message('操作成功');
                    } else {
                      _this.$message({message: response.message, type: 'warning'});
                    }
                  }
                });
              }
            }
          });
        },
        /**
        * 销售活动
        */
        saleActFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.actiTem = selections[0];
          _this.saleActVisible = true;
        },
        /**
        * 保存销售活动
        */
        saveSaleActFn: function () {
          var _this = this;
          var validate;
          _this.$refs.saleActForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = yufp.clone(_this.saleActFormData, model);
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/salesactiv/activiinsert',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.dialogVisible = false;
                _this.$message({ message: response.message });
                _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.remoteData();
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
        },
        /**
        * 新增 修改销售活动
        */
        saleActHandFn: function (handTitle) {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_MKT_ACTIVITY.selections;
          if (handTitle == 'edit') {
            _this.saleActAddFalg = false;
            _this.saleActHandDisable = true;
            _this.viewTitle[5] = '修改销售活动';
            if (selections.length < 1) {
              _this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            _this.saleActHandVisible = true;
            _this.$nextTick(function () {
              _this.$refs.saleActHandForm.resetFields();
              yufp.clone(selections[0], _this.saleActHandFormdata);
            });
          } else {
            _this.saleActAddFalg = true;
            _this.saleActHandVisible = true;
            _this.viewTitle[5] = '新增销售活动';
            _this.saleActHandDisable = false;
            _this.$nextTick(function () {
              _this.$refs.saleActHandForm.resetFields();
            });
          }
        },
        /**
        * 保存销售活动新增 修改
        */
        saveSaleActHandFn: function () {
          var _this = this;
          var validate;
          _this.$refs.saleActHandForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          _this.saleActHandFormdata.businessNo = _this.actiTem.businessNo;
          var model = yufp.clone(_this.saleActHandFormdata, model);
          if (_this.saleActAddFalg) {
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/salesactiv/activiinsert',
              data: model,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _this.saleActHandVisible = false;
                  _this.$message({ message: response.message });
                  _this.$refs.OCRM_F_MK_MKT_ACTIVITY.remoteData();
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          } else {
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/salesactiv/activiupdate',
              data: model,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _this.saleActHandVisible = false;
                  _this.$message({ message: response.message });
                  _this.$refs.OCRM_F_MK_MKT_ACTIVITY.remoteData();
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          }
        },
        /**
        *  删除销售活动
        */
        saleActDeleteFn: function () {
          var _this = this;
          var selections = this.$refs.OCRM_F_MK_MKT_ACTIVITY.selections;
          if (selections.length < 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].activityNo);
          }
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/salesactiv/actividelete/' + arr.join(','),
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.$refs.OCRM_F_MK_MKT_ACTIVITY.remoteData();
                _this.$message('操作成功');
              } else {
                _this.$message({message: response.message, type: 'warning'});
              }
            }
          });
        },

        /**
        * 商机退回
        */
        busBackFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.selections;
          if (selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].businessState != '4') {
            _this.$message({ message: '商机状态不是执行中', type: 'warning' });
            return;
          }
          _this.busBackVisible = true;
          _this.$nextTick(function () {
            _this.$refs.busBackForm.resetFields();
            yufp.clone(selections[0], _this.busBackFormdata);
          });
        },
        /**
        * 保存商机退回
        */
        saveBackFn: function () {
          var _this = this;
          var validate;
          _this.$refs.busBackForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = yufp.clone(_this.busBackFormdata, model);
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/salesoppor/opporback',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.$message({ message: response.message });
                _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.remoteData();
                _this.busBackVisible = false;
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
        },
        /**
        * 商机关闭
        */
        busCloseFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].businessState != '4') {
            _this.$message({ message: '商机状态不是执行中', type: 'warning' });
            return;
          }
          if (selections.businessState == '失败关闭') {
            _this.fallReason = true;
          }
          _this.busCloseVisible = true;
          _this.$nextTick(function () {
            _this.$refs.busCloseForm.resetFields();
            yufp.clone(selections[0], _this.busCloseFormdata);
          });
        },
        /**
      * 保存商机关闭
      */
        saveCloseFn: function () {
          var _this = this;
          var validate;
          _this.$refs.busCloseForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = { marketActivityName: 'name1' };
          model = yufp.clone(_this.busCloseFormdata, model);
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/salesoppor/opporoff',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.$message({ message: response.message });
                _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.remoteData();
                _this.busCloseVisible = false;
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
        },
        /**
      * 取消按钮
      */
        cancleFn: function (cancleTit) {
          var _this = this;
          if (cancleTit == 'busOprHandForm') {
            _this.busOprHandVisible = false;
          }
          if (cancleTit == 'businessInfoForm') {
            _this.busOprInfoVisible = false;
          }
          if (cancleTit == 'eleClaimForm') {
            _this.eleClaimVisible = false;
          }
          if (cancleTit == 'eleDisForm') {
            _this.eleDisVisible = false;
          }
          if (cancleTit == 'saleActForm') {
            _this.saleActVisible = false;
          }
          if (cancleTit == 'busBackForm') {
            _this.busBackVisible = false;
          }
          if (cancleTit == 'busCloseForm') {
            _this.busCloseVisible = false;
          }
          if (cancleTit == 'saleActHandForm') {
            _this.saleActHandVisible = false;
          }
        }
      }
    });
  };
});