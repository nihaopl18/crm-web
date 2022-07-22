/**
 * @Created by zhuly6 zhuly6@yusys.com.cn on 2019-1-7
 * @updated by
 * @description 营销活动管理-商机管理-商机池
 */
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
  * 页面加载完成时触发
  * @param hashCode 路由ID
  * @param data 传递数据对象
  * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('BUS_STAGE,BUS-SRC,BUS_TYPE,SUC_CHANGE,CD0327,OCRM_MKT_ACTI_STAT,ACT_APP_STATS,CD0016');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.adminService + '/api/salesoppor/opporlistquery',
          saleActDataUrl: backend.adminService + '/api/salesactiv/activilistquery',
          busOprHandFormdata: {},
          busOprInfoVisible: false,
          saleActVisible: false,
          busOprHandVisible: false,
          eleDisVisible: false,
          eleDisFormdata: [],
          viewType: 'DETAIL',
          infoDisabled: true,
          editDisabled: false,
          addFlag: false,
          viewTitle: ['详情', '销售活动', '新增', '商机要素分配', '认领'],
          businessTabData: [],
          businessInfoData: [],
          activeName: 'first',
          custDisabled: true,
          exemgrOptions: [],
          queryFormdata: {},
          marketActivityId: { condition: JSON.stringify({ marketActivityId: '' }) },
          queryParams: { condition: JSON.stringify({ userId: '', userType: '', orgId: '' }) },
          // 客户选择器参数
          selectCustParams: {
            rowIndex: true,
            user: {
              fieldData: [
                { label: '客户号', field: 'userId', type: 'input' }
              ],
              majTableColumns: [
                { label: '客户类型', prop: 'custType', width: '120', resizable: true, dataCode: 'CUST_GROUP_TYPE' },
                { label: '客户状态', prop: 'custStatus', width: '150', resizable: true },
                { label: '客户号', prop: 'custId', width: '100', resizable: true },
                { label: '客户名称', prop: 'custName', width: '120', resizable: true, dataCode: 'CUST_GROUP_TYPE' },
                { label: '价值等级', prop: 'valueLev', resizable: true },
                { label: '服务等级', prop: 'servLev', resizable: true }
              ],
              dataUrl: backend.adminService + '/api/grantapply/custlist'
            }
          },
          // 产品选择器参数
          prodParams: {
            org: { dataUrl: backend.adminService + '/api/producttype/treelist' },
            role: { dataUrl: backend.adminService + '/api/productbaseinfo/query' }
          },
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          MktParams: {needCheckbox: false}
        };
      },

      methods: {
        /**
        * 查询
        */
        searchFn: function () {
          var _this = this;
          var model = _this.queryFormdata;
          var loginCode = yufp.session.user.loginCode;
          var orgId = yufp.session.org.id;
          var upOrgId = yufp.session.upOrg.id;
          var orgName = yufp.session.org.name;
          var userType = 0;
          for (var i = 0; i < yufp.session.roles.length; i++) {
            if (yufp.session.roles[i].name == '系统管理员') {
              userType = 1;
            }
            if (yufp.session.roles[i].name == '机构主管') {
              userType = 2;
            }
            if (yufp.session.roles[i].name == '综合客户经理') {
              userType = 3;
            }
          }
          model.userId = loginCode;
          model.userType = userType;
          model.orgId = orgId;
          model.upOrgId = upOrgId;
          model.orgName = orgName;
          _this.queryParams = { condition: JSON.stringify(model) };
          _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.remoteData(_this.queryParams);
        },
        /**
        * 查询
        */
        resetMainFn: function () {
          this.$refs.busQueryform.resetFields();
        },
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
          _this.marketActivityId = { condition: JSON.stringify({ marketActivityId: selections[0].marketActivityId }) };
          _this.activeName = 'first';
          _this.busOprInfoVisible = true;
          _this.$nextTick(function () {
            _this.$refs.businessInfoForm.resetFields();
            yufp.extend(_this.businessInfoData, selections[0]);
          });
        },
        /**
        * 保存
        */
        saveFn: function () {
          var _this = this;
          var validate = false;
          var addMessage;
          var nowDate = new Date();
          nowDate.setHours(0);
          nowDate.setMinutes(0);
          nowDate.setSeconds(0);
          _this.$refs.busOprHandForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (_this.busOprHandFormdata.businessEndDate < _this.busOprHandFormdata.businessValidDate) {
            _this.$message({ message: '商机结束日期不能大于商机有效期', type: 'warning' });
            return;
          }
          if (_this.busOprHandFormdata.businessStartDate < nowDate) {
            if (_this.busOprHandFormdata.businessStartDate.toString() != nowDate.toString()) {
              _this.$message({ message: '商机开始日期不能晚于当前日期', type: 'warning' });
              return;
            }
          }
          if (_this.busOprHandFormdata.businessStartDate > _this.busOprHandFormdata.businessEndDate) {
            _this.$message({ message: '商机开始日期不能晚于商机结束日期', type: 'warning' });
            return;
          }
          var model = { contactProdName: 'name1', custName: 'cust2' };
          model = yufp.clone(_this.busOprHandFormdata, model);
          var n = _this.busOprHandFormdata.executeUser;
          for (var i = 0; i < _this.exemgrOptions.length; i++) {
            if (n == _this.exemgrOptions[i].value) {
              n = _this.exemgrOptions[i].key;
            }
          }
          if (n != '') {
            model.executeOrg = _this.exemgrOptions[n].orgId;
            model.executeUser = _this.exemgrOptions[n].mgrId;
          }
          if (_this.addFlag) {
            // 新增
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/salesoppor/opporinsert',
              data: model,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _this.busOprHandVisible = false;
                  _this.$message({ message: response.message });
                  _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.remoteData();
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
                  _this.busOprHandVisible = false;
                  _this.$message({ message: response.message });
                  _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.remoteData();
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
            _this.addFlag = false;
            _this.editDisabled = true;
            _this.$nextTick(function () {
              _this.$refs.busOprHandForm.resetFields();
              // yufp.clone(selections[0], _this.busOprHandFormdata);
              yufp.extend(_this.busOprHandFormdata, selections[0]);
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
        getExeOrgFn: function (data) {
          var _this = this;
          _this.eleDisFormdata.executeOrg = data[0].orgId;
        },
        /**
        * 选择执行人 执行机构
        */
        changeExeFn: function (data) {
          var _this = this;
          if (data != undefined && !isNaN(parseInt(data))) {
            _this.busOprHandFormdata.executeOrg = _this.exemgrOptions[data].orgName;
          }
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
                      _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.remoteData();
                      _this.$message({message: response.message, type: 'warning'});
                    }
                  }
                });
              }
            }
          });
        },
        /**
        * 要素分配
        */
        eleDisFn: function () {
          var _this = this;
          var vm = '';
          var selections = _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.selections;
          if (_this.$refs.OCRM_F_MK_MKT_SALESOPPOR.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          vm = selections[0].executeUser.substring(0, 2);
          if (vm != 'VM') {
            _this.$message({ message: '执行人为虚拟客户经理才能分配', type: 'warning' });
            return;
          }
          _this.eleDisVisible = true;
          _this.$nextTick(function () {
            _this.$refs.eleDisForm.resetFields();
            yufp.clone(selections[0], _this.eleDisFormdata);
            // _this.eleDisVisible = false;
          });
        },
        /**
        * 保存要素分配
        */
        saveDisFn: function () {
          var _this = this;
          var validate;
          _this.$refs.eleDisForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          model = yufp.clone(_this.eleDisFormdata, model);
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/salesoppor/opporassign',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.eleDisVisible = false;
                _this.$message({ message: response.message });
                _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.remoteData();
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
        },
        /**
        * 商机认领
        */
        claimFn: function () {
          var _this = this;
          var commitData = {};
          var flag = '0';
          var roles = yufp.session.roles;
          var orgId = yufp.session.org.id;
          commitData.custId = yufp.session.userId;
          commitData.custName = yufp.session.userName;
          var selections = _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].executeOrg != yufp.session.org.id) {
            _this.$message({ message: '只能认领本机构的商机', type: 'warning' });
            return;
          }
          if (selections[0].executeUser.substring(0, 2) != 'VM') {
            _this.$message({ message: '只能认领虚拟客户经理执行的商机', type: 'warning' });
            return;
          }
          commitData.bizSeqNo = selections[0].businessNo;
          for (var i = 0; i < roles.length; i++) {
            if (roles[i].code == '15' && orgId == '500') {
              commitData.applType = 'YJZHSJRL';
              _this.$refs.yufpWfInit.wfInit(commitData);
              flag = '1';
            }
            if (roles[i].code == '15' && orgId == '99500') {
              commitData.applType = 'EJZHSJRL';
              _this.$refs.yufpWfInit.wfInit(commitData);
              flag = '1';
            }
          }
          if (flag == '0') {
            _this.$message({ message: '没有权限', type: 'warning' });
          }
        },

        /**
      * 取消按钮
      */
        cancleFn: function (cancleTit) {
          var _this = this;
          if (cancleTit == 'ADD' || cancleTit == 'edit') {
            _this.busOprHandVisible = false;
          }
          if (cancleTit == 'eleDisForm') {
            _this.eleDisVisible = false;
          }
        }
      }
    });
  };
});