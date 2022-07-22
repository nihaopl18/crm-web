/**
 * @Created by zhuly6 zhuly6@yusys.com.cn on 2018-12-27 09:36:37.
 * @updated by
 * @description 营销活动管理
 */
yufp.require.require([
  './pages/crmsys/marketManager/marketactManager/marketActivity/marketActivity.css'
]);
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
  * 页面加载完成时触发
  * @param hashCode 路由ID
  * @param data 传递数据对象
  * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('MAR_ACT_TYPE, MAR_CHANEL, EXE_OBJ_TYPE,OCRM_MKT_ACTI_STAT,WF_APP_STATUS,CD0238,CLIENT_ORIGIN,AIM_CUST_SOURCE,PROGERSS_STEP,VALUE_CONDITION');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          actDataUrl: backend.mktactivityService + '/api/mkt/actilistquery',
          prodDataUrl: backend.adminService + '/api/mkt/actiprodlistquery',
          custDataUrl: backend.adminService + '/api/mkt/acticustlistquery',
          atcDataUrl: backend.adminService + '/api/mkt/actifilelistquery',
          taskDataUrl: backend.adminService + '/api/mkt/actitargetlistquery',
          taskOrgDataUrl: backend.adminService + '/api/adminsmorg/querypage',
          attachDataUrl: backend.adminService + '/api/mkt/actifilelistquery',
          prodTaskInfoUrl: backend.adminService + '/api/mkt/getindexinfobyprod', // 查询指标信息根据产品编号
          params: {tabCheckbox: false}, // 设置用户管理组件是否可以复选
          prodParam: {tabCheckbox: true}, // 设置产品管理组件是否可以复选
          tableKey: 0, // 指标选择中的key
          dataUrl: '',
          dataUrl1: '',
          formdata: {},
          ifFile: false, // 是否客户操作附件信息
          actTurnTitle: '营销活动移交',
          dialogVisible: false,
          infoDisabled: false,
          viewType: 'DETAIL',
          activeAddFormdata: {},
          actTransFormdata: {
            actiName: '',
            mktRespPerson: '',
            actiId: ''
          },
          ocrmFMkActivityData: [],
          custTableData: [],
          editDisabled: false,
          fileTem: {},
          thisValue: '',
          custPlaceholder: '添加客户',
          custGroupPlaceholder: '引入客户群',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          turnVisible: false,
          addFlag: false,
          listInfo: true,
          fileButVis: false,
          infoDialogVisible: false,
          actModel: {},
          activeName: 'first',
          value: '',
          turnValue: '',
          ocrmFMkActiProductdata: [],
          taskInfo: [], // 选中的指标信息
          numberType: [{ required: true, message: '字段不能为空' }, {max: 12, message: '长度不能超过12个字符', trigger: 'blur'},
            { validator: yufp.validator.number, message: '字段只能为数字', trigger: 'change'}],
          pstartDate: { // 有效期开始日期小于结束日期
            disabledDate: function (time) {
              var beginDateVal = _this.activeAddFormdata.pendDate;
              if (time.getTime() < Date.now() - 8.64e7) {
                return true;
              }
              if (beginDateVal) {
                return time.getTime() > beginDateVal;
              }
            }
          },
          pendDate: { // 有效期结束日期大于开始日期
            disabledDate: function (time) {
              var beginDateVal = _this.activeAddFormdata.pstartDate;
              if (time.getTime() < Date.now() - 8.64e7) {
                return true;
              }
              if (beginDateVal) {
                return time.getTime() < beginDateVal;
              }
            }
          },
          pendDate1: { // 有效期结束日期大于开始日期
            disabledDate: function (time) {
              if (time.getTime() < Date.now() - 8.64e7) {
                return true;
              }
            }
          },
          taskInfoVisible: false, // 指标选择框弹出控制
          temp: [],
          fileParams: { condition: JSON.stringify({ busNo: '' }) },
          fprodParams: { condition: JSON.stringify({ actiId: '' }) },
          custParams: { condition: JSON.stringify({ actiId: '' }) },
          targetParams: { condition: JSON.stringify({ actiId: '' }) },
          OrgParams: { condition: JSON.stringify({ unitOrgId: '' }) },
          prodIndexParams: { condition: JSON.stringify({ prodId: '' }) },
          orgtargetParams: { condition: JSON.stringify({ actiId: '' }) },
          usertargetParams: { condition: JSON.stringify({ actiId: '' }) },
          targetDecomVisible: false, // 指标分解页面
          selectProdInfo: '', // 产品选择组件选中的产品信息
          selectCustGroup: '', // 客户群组件选中信息
          selectCustInfo: '', // 客户组件选中信息
          taskAllotFormdata: [],
          taskManTabledata: [],
          taskOrgTabledata: [], // 机构指标值
          taskUserTabledat: [], // 客户经理指标值
          taskAllotTable2Data: [],
          attchTableData: [],
          taskManTableSec: [],
          showTask: '',
          ifSave: false, // 是否已保存
          fileDataParams: {}, // 附件上传时候的参数
          addDisabled: true,
          targetDistrVisible: false, // 活动分配显示
          taskOrgVisible: false, // 活动分配-机构选择
          taskUserVisible: false, // 活动分配-客户经理选择
          taskTransFormdata1: {}, // 活动分配-机构选择数据集
          taskTransFormdata2: {}, // 活动分配-客户经理选择数据集
          setActEndDtVisible: false, // 设置活动结束日期
          actiModeOptions: [
            {
              'key': '0',
              'value': '厅堂营销'
            },
            {
              'value': '扫街活动',
              'key': '1'
            }, {
              'value': '重点客户拜访',
              'key': '2'
            }, {
              'value': '户外活动（进市场、进厂企、进学校）',
              'key': '3'
            }, {
              'value': '慈善公益',
              'key': '4'
            }, {
              'value': '金融宣传教育',
              'key': '5'
            }, {
              'value': '客户答谢会',
              'key': '6'
            }, {
              'value': '客户交流会',
              'key': '7'
            }, {
              'value': '跨业联盟',
              'key': '8'
            }, {
              'value': '沙龙',
              'key': '9'
            }, {
              'value': '讲座',
              'key': '10'
            }, {
              'value': '产品营销会',
              'key': '11'
            },
            {
              'value': '积分活动',
              'key': '12'
            }, {
              'value': '沙龙',
              'key': '13'
            }, {
              'value': '社区活动',
              'key': '14'
            }, {
              'value': '其它',
              'key': '15'
            }
          ],
          // 审批流参数
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          }
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
          if (formThis == 'activeAddForm') {
            _this.dialogVisible = false;
          }
          if (formThis == 'turnActivetyForm') {
            _this.turnVisible = false;
          }
          if (formThis == 'taskTransOrgForm') {
            _this.taskOrgVisible = false;
          }
          if (formThis == 'taskTransUserForm') {
            _this.taskUserVisible = false;
          }
          if (formThis == 'setActEndDtForm') {
            _this.setActEndDtVisible = false;
          }
          if (formThis == 'actInfoDialog') {
            _this.dialogVisible = false;
            _this.$refs.OCRM_F_MK_ACTIVITY.remoteData();
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
          _this.dialogVisible = editable;
          _this.formDisabled = !editable;
        },
        /**
        * 新增按钮
        */
        addFn: function () {
          var _this = this;
          _this.addFlag = true;
          _this.addDisabled = true;
          _this.infoDisabled = false;
          _this.ifSave = false;
          _this.ifFile = false;
          _this.activeName = 'first';
          _this.switchStatus('ADD', true);
          _this.activeAddFormdata = {};
          _this.taskInfo = [];// 初始化变量
          _this.selectProdInfo = '';
          _this.selectCustGroup = '';
          _this.selectCustInfo = '';
          _this.$nextTick(function () {
            _this.$refs.activeAddForm.resetFields();
            _this.activeAddFormdata.mktRespPerson = yufp.session.userCode;
            _this.editDisabled = false;
          });
          _this.fprodParams = { condition: JSON.stringify({ actiId: '' }) };
          _this.custParams = { condition: JSON.stringify({ actiId: '' }) };
          _this.fileParams = { condition: JSON.stringify({ busNo: '' }) };
        },
        selectCustbackFn: function (data) {
          var _this = this;
          var selections = _this.$refs.ocrmFMkActiProduct.selections[0];
          for (var i = 0; i < _this.ocrmFMkActiProductdata.length; i++) {
            var info = _this.ocrmFMkActiProductdata[i];
            if (info.prudName == selections.productName) {
              _this.ocrmFMkActiProductdata[i].createUser = data.loginCode;
              break;
            }
          }
        },
        /**
        * 获取关联表信息
        */
        getTableDataFn: function (data) {
          this.ocrmFMkActiProductdata = data;
        },
        /**
        * 新增关联产品
        */
        addProdFn: function (data) {
          var _this = this;
          for (var i = 0; i < data.length; i++) {
            var info = {
              productId: data[i].productId,
              productName: data[i].prodName,
              createUser: yufp.session.userCode,
              createName: yufp.session.userName,
              createDate: new Date()
            };
            _this.ocrmFMkActiProductdata.push(info);
          }
        },

        /**
        * 删除关联产品
        */
        deleteProdFn: function () {
          var _this = this;
          var selections = _this.$refs.ocrmFMkActiProduct.selections;
          var len = _this.ocrmFMkActiProductdata.length;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          for (var i = 0; i < len; i++) {
            if (selections[0].productId == _this.ocrmFMkActiProductdata[i].productId) {
              _this.ocrmFMkActiProductdata.splice(i, 1);
            }
          }
        },
        /**
        * 获取附件表信息
        */
        getAttchTableDataFn: function (data) {
          var _this = this;
          _this.attchTableData = data;
        },
        /**
        * 获取客户表信息
        */
        getCustTableDataFn: function (data) {
          var _this = this;
          _this.custTableData = data;
        },
        /**
        * 添加客户
        */
        addCustFn: function (data) {
          var _this = this;
          for (var i = 0; i < data.length; i++) {
            var obj = {
              custId: data[i].custId,
              custName: data[i].custName,
              custStatus: data[i].custStatus,
              custManager: data[i].mgrId,
              custManagerOrg: data[i].orgId,
              custManagerName: data[i].mgrName,
              custManagerOrgName: data[i].orgName,
              aimCustSource: '01',
              progressStep: '0',
              relationUser: yufp.session.userCode,
              relationUserName: yufp.session.userName,
              relationDate: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}')
            };
            _this.custTableData.push(obj);
          }
        },
        /**
        * 添加客户群的客户
        */
        addCustGroupFn: function (data) {
          var _this = this;
          var groupid = [];
          for (var i = _this.custTableData.length - 1; i >= 0; i--) { // 循环删除以前客户群引入的客户数据
            if (_this.custTableData[i].aimCustSource == '02') {
              _this.custTableData.splice(i, 1);
            }
          }
          // for (var i = 0; i < data.length; i++) {
          groupid.push(data.custGroupId);
          // }
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/groupcustinfo?groupIds=' + groupid.join(','),
            data: '',
            callback: function (code, message, response) {
              if (response.data) {
                var infos = response.data;
                for (var i = 0; i < infos.length; i++) {
                  let info = infos[i];
                  var obj = {
                    custId: info.custId,
                    custName: info.custName,
                    custStatus: info.custStatus,
                    custManager: info.mgrId,
                    custManagerOrg: info.orgId,
                    custManagerName: info.mgrName,
                    custManagerOrgName: info.orgName,
                    aimCustSource: '02',
                    progressStep: '0',
                    relationUser: yufp.session.userCode,
                    relationUserName: yufp.session.userName,
                    relationDate: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}')
                  };
                  _this.custTableData.push(obj);
                  // _this.custGroupCustInfo.push(obj);
                }
              }
            }
          });
        },

        /**
        * 删除关联客户
        */
        deleteCustFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_ACTI_CUST.selections;
          var len = _this.custTableData.length;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          for (var i = 0; i < len; i++) {
            if (selections[0].custId == _this.custTableData[i].custId) {
              _this.custTableData.splice(i, 1);
            }
          }
        },

        /**
        * 新增指标
        */
        addTask: function () {
          var _this = this;
          _this.taskInfoVisible = true;
          let prodIds = [];
          for (let i = 0; i < _this.ocrmFMkActiProductdata.length; i++) {
            let info = _this.ocrmFMkActiProductdata[i];
            prodIds.push(info.productId);
          }
          var param = { condition: JSON.stringify({ prodId: prodIds.join(',') }) };
          _this.$nextTick(function () {
            _this.$refs.taskinfoTable.remoteData(param);
          });
        },
        /**
         * 数组去重
         */
        uniq: function (array, type) {
          var temp = [];
          var index = [];
          var l = array.length;
          if (type == '1') { // 机构
            for (let i = 0; i < l; i++) {
              for (let j = i + 1; j < l; j++) {
                if (array[i].custManagerOrg == array[j].custManagerOrg) {
                  i++;
                  j = i;
                }
              }
              temp.push(array[i]);
              index.push(i);
            }
          } else if (type == '0') { // 客户经理
            for (let i = 0; i < l; i++) {
              for (let j = i + 1; j < l; j++) {
                if (array[i].custManager == array[j].custManager) {
                  i++;
                  j = i;
                }
              }
              temp.push(array[i]);
              index.push(i);
            }
          }

          return temp;
        },
        /**
        * 切换对象
        */
        changeExetypeFn: function (val) {
          var _this = this;
          if (val == '0') { // 客户经理
            _this.showTask = 'taskManerger';
          } else if (val == '1') { // 机构
            _this.showTask = 'taskOrg';
          }
        },
        /**
        * 附件上传
        */
        fileUpSuccessFn: function (response) {
          var _this = this;
          _this.fileTem = response.data;
        },

        /**
        * 下一步
        */
        nextStepFn: function (formThis) {
          var _this = this;
          var validate = false;
          _this.$refs.activeAddForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 营销活动信息暂存
          if (formThis == 'activeAddForm') {
            // _this.activeAddFormdata.actiMode = typeof _this.activeAddFormdata.actiMode == 'string' ? _this.activeAddFormdata.actiMode : _this.activeAddFormdata.actiMode.join(',');
            yufp.clone(_this.activeAddFormdata, _this.actModel);
            _this.activeName = 'second';
          }
          // 关联产品暂存
          if (formThis == 'isProductAdd') {
            _this.ocrmFMkActiProductdata;
            var size = _this.ocrmFMkActiProductdata.length;
            if (size > 0) { // 查询产品的目标客户
              var prodIds = [];
              for (var i = 0; i < size; i++) {
                let info = _this.ocrmFMkActiProductdata[i];
                prodIds.push(info.productId);
              }
              yufp.service.request({
                method: 'GET',
                url: backend.adminService + '/api/mkt/prodfitcust?prodIds=' + prodIds.join(','),
                data: '',
                callback: function (code, message, response) {
                  if (response.data) {
                    var infos = response.data;
                    for (var i = 0; i < infos.length; i++) {
                      let info = infos[i];
                      var obj = {
                        custId: info.custId,
                        custName: info.custName,
                        custStatus: info.custStatus,
                        custManager: info.mgrId,
                        custManagerOrg: info.orgId,
                        custManagerName: info.mgrName,
                        custManagerOrgName: info.orgName,
                        aimCustSource: '03',
                        progressStep: '0',
                        relationUser: yufp.session.userCode,
                        relationUserName: yufp.session.userName,
                        relationDate: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}')
                      };
                      _this.custTableData.push(obj);
                    }
                  }
                }
              });
              _this.activeName = 'third';
            } else {
              _this.$message({ message: '请添加目标产品', type: 'warning' });
              return;
            }
          }
          // 关联客户暂存
          if (formThis == 'isCustomAdd') {
            let custInfoOrg = _this.uniq(_this.custTableData, '1');
            let custInfoUser = _this.uniq(_this.custTableData, '0');
            if (_this.viewType == 'ADD') { // 新增
              _this.taskOrgTabledata = [];
              _this.taskUserTabledat = [];
              for (let i = 0; i < custInfoUser.length; i++) {
                _this.taskUserTabledat.push({
                  exeObjCode: custInfoUser[i].custManager,
                  exeObjName: custInfoUser[i].custManagerName
                });
              }

              for (let i = 0; i < custInfoOrg.length; i++) {
                _this.taskOrgTabledata.push({
                  exeObjCode: custInfoOrg[i].custManagerOrg,
                  exeObjName: custInfoOrg[i].custManagerOrgName
                });
              }
            } else if (_this.viewType == 'EDIT') { // 修改
              let usertask = _this.taskUserTabledat;
              for (let i = 0; i < custInfoUser.length; i++) {
                if (usertask.length == 0) {
                  _this.taskUserTabledat.push({
                    exeObjCode: custInfoUser[i].custManager,
                    exeObjName: custInfoUser[i].custManagerName
                  });
                } else {
                  let flag = false;
                  for (let j = 0; j < usertask.length; j++) {
                    if (custInfoUser[i].custManager == usertask[j].exeObjCode) {
                      flag = true;
                      break;
                    }
                  }
                  if (!flag) {
                    _this.taskUserTabledat.push({
                      exeObjCode: custInfoUser[i].custManager,
                      exeObjName: custInfoUser[i].custManagerName
                    });
                  }
                }
              }
              let orgtask = _this.taskOrgTabledata;
              for (let i = 0; i < custInfoOrg.length; i++) {
                if (orgtask.length == 0) {
                  _this.taskOrgTabledata.push({
                    exeObjCode: custInfoOrg[i].custManagerOrg,
                    exeObjName: custInfoOrg[i].custManagerOrgName
                  });
                } else {
                  let flag = false;
                  for (let j = 0; j < orgtask.length; j++) { // 判断是否重复
                    if (custInfoOrg[i].custManagerOrg == orgtask[j].exeObjCode) {
                      flag = true;
                      break;
                    }
                  }
                  if (!flag) {
                    _this.taskOrgTabledata.push({
                      exeObjCode: custInfoOrg[i].custManagerOrg,
                      exeObjName: custInfoOrg[i].custManagerOrgName
                    });
                  }
                }
              }
            }
            _this.tableKey++;
            _this.activeName = 'fourth';
          }
          if (formThis == 'taskAllotDiv') {
            _this.activeName = 'fifth';
          }
        },
        /**
        * 判断新增 修改 保存
        */
        temSaveFn: function () {
          var _this = this;
          if (_this.addFlag) {
            _this.saveAddFn();
          } else {
            _this.saveModifyFn();
          }
        },
        /**
        * 保存
        */
        saveAddFn: function () {
          var _this = this;
          var saveData = {};// 活动数据内容
          _this.actModel.actiMode = typeof _this.actModel.actiMode == 'string' ? _this.actModel.actiMode : _this.actModel.actiMode.join(',');// 把array转换成string
          saveData.baseInfo = JSON.stringify(_this.actModel);
          saveData.prodInfo = JSON.stringify(_this.ocrmFMkActiProductdata);
          saveData.custInfo = JSON.stringify(_this.custTableData);
          // 新增附件信息
          var fileData = [];
          fileData.push(_this.fileData);
          saveData.fileInfo = JSON.stringify(fileData);
          // 保存新增的指标信息
          for (let i = 0; i < _this.taskUserTabledat.length; i++) {
            _this.taskUserTabledat[i].exeObjType = '0';
          }
          for (let i = 0; i < _this.taskOrgTabledata.length; i++) {
            _this.taskOrgTabledata[i].exeObjType = '1';
          }
          if (_this.taskOrgTabledata.length > _this.taskUserTabledat.length) {
            let taskinfo = _this.taskOrgTabledata.concat(_this.taskUserTabledat);// 合并数组
            saveData.taskInfo = JSON.stringify(taskinfo);
          } else {
            let taskinfo = _this.taskUserTabledat.concat(_this.taskOrgTabledata);// 合并数组
            saveData.taskInfo = JSON.stringify(taskinfo);
          }
          saveData.selectTaskInfo = JSON.stringify(_this.taskInfo);
          // 保存新增营销活动请求
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/mkt/actiinsert',
            data: saveData,
            async: false,
            callback: function (code, message, response) {
              _this.$refs.OCRM_F_MK_ACTIVITY.remoteData();
              if (response.code != -1) {
                _this.$message('操作成功');
                _this.ifFile = true;
                _this.fileParams = { condition: JSON.stringify({ busNo: response.data + ''}) };
                _this.fileDataParams = {
                  busNo: response.data
                };
                _this.ifSave = true;
                // _this.dialogVisible = false;
              }
              if (response.code == -1) {
                _this.$message({ message: response.message, type: 'warning'});
              }
            }
          });
        },
        /**
        * 上一步
        */
        backStepFn: function (formThis) {
          var _this = this;
          if (formThis == 'isProductAdd') {
            // _this.activeAddFormdata.actiMode = _this.activeAddFormdata.actiMode.split(',');
            _this.activeName = 'first';
          }
          if (formThis == 'isCustomAdd') {
            _this.activeName = 'second';
          }
          if (formThis == 'taskAllotDiv') {
            _this.activeName = 'third';
          }
          if (formThis == 'attachmentTable') {
            _this.activeName = 'fourth';
          }
        },
        modifyFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_ACTIVITY.selections;
          var secArry = selections;
          _this.addDisabled = true;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].mktAppState != '0') {
            _this.$message({ message: '只能选择未提交的', type: 'warning' });
            return;
          }
          if (selections[0].mktRespPerson != yufp.session.userCode) {
            _this.$message({ message: '只能选择自己负责的数据', type: 'warning' });
            return;
          }
          _this.selectProdInfo = '';
          _this.selectCustGroup = '';
          _this.selectCustInfo = '';
          _this.taskInfo = [];// 初始化变量
          _this.temp = selections[0];
          _this.ifFile = true;
          _this.ifSave = false;
          _this.fileParams = { condition: JSON.stringify({ busNo: _this.temp.actiId + ''}) };
          _this.fileDataParams = {
            busNo: _this.temp.actiId
          };
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/activitytargetinfo?actiId=' + _this.temp.actiId,
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
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/actitargetlistquery',
            data: { condition: JSON.stringify({ actiId: _this.temp.actiId, exeObjType: '1'}) },
            callback: function (code, message, response) {
              if (response.data) {
                var infos = response.data;
                _this.taskOrgTabledata = infos;
              }
            }
          });
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/actitargetlistquery',
            data: { condition: JSON.stringify({ actiId: _this.temp.actiId, exeObjType: '0'}) },
            callback: function (code, message, response) {
              if (response.data) {
                var infos = response.data;
                _this.taskUserTabledat = infos;
              }
            }
          });
          _this.fprodParams = { condition: JSON.stringify({ actiId: _this.temp.actiId }) };
          _this.custParams = { condition: JSON.stringify({ actiId: _this.temp.actiId }) };
          _this.orgtargetParams = { condition: JSON.stringify({ actiId: _this.temp.actiId, exeObjType: '1'}) };
          _this.usertargetParams = { condition: JSON.stringify({ actiId: _this.temp.actiId, exeObjType: '0'}) };
          // _this.targetParams = { condition: JSON.stringify({ actiId: _this.temp.actiId }) };
          secArry[0].actiMode = typeof secArry[0].actiMode == 'string' ? secArry[0].actiMode.split(',') : secArry[0].actiMode;
          _this.activeName = 'first';
          _this.editDisabled = true;
          _this.infoDisabled = false;
          _this.addFlag = false;
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.activeAddForm.resetFields();
            // _this.activeAddFormdata = {};
            yufp.clone(secArry[0], _this.activeAddFormdata);
          });
        },
        /**
        * 保存修改
        */
        saveModifyFn: function () {
          var _this = this;
          var saveData = {};// 活动数据内容
          delete _this.actModel.createName;
          delete _this.actModel.createOrgName;
          _this.actModel.actiMode = typeof _this.actModel.actiMode == 'string' ? _this.actModel.actiMode : _this.actModel.actiMode.join(',');// 把array转换成string
          saveData.baseInfo = JSON.stringify(_this.actModel);
          saveData.prodInfo = JSON.stringify(_this.ocrmFMkActiProductdata);
          saveData.custInfo = JSON.stringify(_this.custTableData);
          // 新增附件信息
          var fileData = [];
          fileData.push(_this.fileData);
          saveData.fileInfo = JSON.stringify(_this.fileData);
          // 保存新增的指标信息
          for (let i = 0; i < _this.taskUserTabledat.length; i++) {
            _this.taskUserTabledat[i].exeObjType = '0';
          }
          for (let i = 0; i < _this.taskOrgTabledata.length; i++) {
            _this.taskOrgTabledata[i].exeObjType = '1';
          }
          if (_this.taskOrgTabledata.length > _this.taskUserTabledat.length) {
            let taskinfo = _this.taskOrgTabledata.concat(_this.taskUserTabledat);// 合并数组
            saveData.taskInfo = JSON.stringify(taskinfo);
          } else {
            let taskinfo = _this.taskUserTabledat.concat(_this.taskOrgTabledata);// 合并数组
            saveData.taskInfo = JSON.stringify(taskinfo);
          }
          saveData.selectTaskInfo = JSON.stringify(_this.taskInfo);
          // 保存修改营销活动请求
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/mkt/actiedit',
            data: saveData,
            async: false,
            callback: function (code, message, response) {
              _this.$refs.OCRM_F_MK_ACTIVITY.remoteData();
              if (response.code != -1) {
                _this.$message('操作成功');
                _this.ifSave = true;
                // _this.dialogVisible = false;
              } else {
                _this.$message({ message: response.message, type: 'warning'});
              }
            }
          });
        },
        /**
        * 指标选择
        */
        selectIndexFn: function () {
          var _this = this;
          var selections = _this.$refs.taskinfoTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          for (var i = 0; i < selections.length; i++) {
            _this.taskInfo.push({
              targetName: selections[i].targetName,
              targetCode: selections[i].targetId,
              orignalVal: 'orignalVal' + selections[i].targetId,
              targetValue: 'targetValue' + selections[i].targetId,
              valueCondition: selections[i].valueCondition
            });
          }
          _this.taskInfoVisible = false;
        },
        /**
         * 删除选择的指标数据
         */
        deleteSeTagFn: function (item) {
          var _this = this;
          for (var i = _this.taskInfo.length - 1; i >= 0; i--) {
            if (item.targetCode == _this.taskInfo[i].targetCode) {
              _this.taskInfo.splice(i, 1);
              break;
            }
          }
          _this.tableKey += 1;
        },
        /**
         * 指标选择取消按钮方法
         */
        cancelSelectIndexFn: function () {
          this.taskInfoVisible = false;
        },
        /**
         * 指标分解
         */
        taskDecomEditFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_ACTIVITY.selections;
          _this.addDisabled = true;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].actiStat != '2') {
            _this.$message({ message: '只能选择执行中的数据', type: 'warning' });
            return;
          }
          _this.temp = selections[0];
          _this.taskInfo = [];
          _this.orgtargetParams = { condition: JSON.stringify({ actiId: selections[0].actiId, org: yufp.session.org.code, exeObjType: '1' }) };
          _this.usertargetParams = { condition: JSON.stringify({ actiId: selections[0].actiId, org: yufp.session.org.code, exeObjType: '0'}) };
          yufp.service.request({// 查询指标信息
            method: 'GET',
            url: backend.adminService + '/api/mkt/activitytargetinfo?actiId=' + selections[0].actiId,
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
                _this.tableKey++;
                _this.targetDecomVisible = true;
              }
            }
          });
        },
        /**
         * 指标分解保存
         */
        saveTargetDcomFn: function () {
          var _this = this;
          var saveData = {};
          saveData.taskInfo = JSON.stringify(_this.$refs.userTragetInfo.tabledata);
          saveData.selectTaskInfo = JSON.stringify(_this.taskInfo);
          saveData.actiId = _this.temp.actiId;
          // 保存修改营销活动请求
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/mkt/targetdcom',
            data: saveData,
            async: false,
            callback: function (code, message, response) {
              _this.$refs.OCRM_F_MK_ACTIVITY.remoteData();
              if (response.code != -1) {
                _this.$message('操作成功');
                _this.targetDecomVisible = false;
              } else {
                _this.$message({ message: response.message, type: 'warning'});
              }
            }
          });
        },
        /**
         * 指标分解取消
         */
        canceltargetDcomFn: function () {
          this.targetDecomVisible = false;
        },
        /**
         * 活动分配保存
         */
        saveTargetDistrFn: function () {
          var _this = this;
          var saveData = {};
          saveData.taskInfo = JSON.stringify(_this.$refs.taskDistrTable.tabledata);
          saveData.selectTaskInfo = JSON.stringify(_this.taskInfo);
          saveData.actiId = _this.temp.actiId;
          // 保存修改营销活动请求
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/mkt/actdistr',
            data: saveData,
            async: false,
            callback: function (code, message, response) {
              _this.$refs.OCRM_F_MK_ACTIVITY.remoteData();
              if (response.code != -1) {
                _this.$message('操作成功');
                _this.targetDistrVisible = false;
              } else {
                _this.$message({ message: response.message, type: 'warning'});
              }
            }
          });
        },
        /**
         * 活动分配取消
         */
        canceltargetDistrFn: function () {
          this.targetDistrVisible = false;
        },
        /**
         * 活动分配机构
         */
        orgDistrFn: function () {
          var _this = this;
          var selections = _this.$refs.taskDistrTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].exeObjCode == undefined || selections[0].exeObjCode == null || selections[0].exeObjCode == '') {

          } else {
            _this.$message({ message: '请先选择一条下达对象为空的数据', type: 'warning' });
            return;
          }
        },
        /**
         * 活动分配主办机构
         */
        userDistrFn: function () {
          var _this = this;
          var selections = _this.$refs.userTragetInfo.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].exeObjCode.indexOf('VM') != -1) {
            _this.taskUserVisible = true;
          } else {
            _this.$message({ message: '请先选择一条下达对象为虚拟客户经理的数据', type: 'warning' });
            return;
          }
        },
        /**
        * 活动分配
        */
        taskAllokEditFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_ACTIVITY.selections;
          _this.addDisabled = true;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].mktRespPerson != yufp.session.userCode) {
            _this.$message({ message: '只能选择自己负责的数据', type: 'warning' });
            return;
          }
          _this.temp = selections[0];
          _this.taskInfo = [];
          yufp.service.request({// 查询活动选择的指标信息
            method: 'GET',
            url: backend.adminService + '/api/mkt/activitytargetinfo?actiId=' + _this.temp.actiId,
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
          _this.orgtargetParams = { condition: JSON.stringify({ actiId: selections[0].actiId, org: yufp.session.org.code, exeObjType: '1' }) };
          // yufp.service.request({// 查询机构指标值
          //   method: 'GET',
          //   url: backend.adminService + '/api/mkt/actitargetlistquery',
          //   data: { condition: JSON.stringify({ actiId: _this.temp.actiId, exeObjType: '1'}) },
          //   callback: function (code, message, response) {
          //     if (response.data) {
          //       var infos = response.data;
          //       _this.taskOrgTabledata = infos;
          //     }
          //   }
          // });
          _this.tableKey++;
          _this.targetDistrVisible = true;
        },
        /**
        * 活动执行
        */
        actExeFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_ACTIVITY.selections;
          _this.addDisabled = true;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          // 只能选择审批通过的，已提交，关闭的数据
          if (selections[0].mktAppState != '2' || (selections[0].actiStat != '1' && selections[0].actiStat != '3' && selections[0].actiStat != '4')) {
            _this.$message({ message: '请先选择活动状态为[已提交、正常关闭，到期关闭]并且审批通过的活动', type: 'warning' });
            return;
          }
          if (selections[0].mktRespPerson != yufp.session.userCode) {
            _this.$message({ message: '只能选择自己负责的数据', type: 'warning' });
            return;
          }
          _this.temp = selections[0];
          if (selections[0].actiStat == '3' || selections[0].actiStat == '4') { // 到期关闭的需要重新设置活动截止时间
            _this.setActEndDtVisible = true;
            _this.$nextTick(function () {
              _this.$refs.setActEndDtForm.resetFields();
            });
          } else {
            var data = selections[0];
            _this.$confirm('是否执行此活动?', '提示', {
              type: 'warning',
              callback: function (action) {
                if (action === 'confirm') {
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/mkt/actiexecute',
                    data: JSON.stringify(data),
                    callback: function (code, message, response) {
                      _this.$refs.OCRM_F_MK_ACTIVITY.remoteData();
                      _this.$message('操作成功');
                    }
                  });
                }
              }
            });
          }
        },
        /**
         * 设置活动结束日期并执行活动
         */
        setActEndDtFn: function () {
          var _this = this;
          var data = _this.temp;
          data.pendDate = _this.$refs.setActEndDtForm.formdata.pendDate;
          _this.$confirm('是否执行此活动?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/mkt/actiexecute',
                  data: JSON.stringify(data),
                  callback: function (code, message, response) {
                    _this.setActEndDtVisible = false;
                    _this.$refs.OCRM_F_MK_ACTIVITY.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        /**
        * 详情
        */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.OCRM_F_MK_ACTIVITY.selections;
          _this.temp = selectionsAry[0];
          _this.addDisabled = false;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          selectionsAry[0].actiMode = typeof selectionsAry[0].actiMode == 'string' ? selectionsAry[0].actiMode.split(',') : selectionsAry[0].actiMode;
          _this.viewType = 'DETAIL';
          _this.activeName = 'first';
          _this.infoDisabled = true;
          _this.editDisabled = true;
          _this.infoDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.activeAddForm.resetFields();
            yufp.clone(selectionsAry[0], _this.activeAddFormdata);
          });
          _this.fileParams = { condition: JSON.stringify({ busNo: _this.temp.actiId + ''}) };
          _this.fileDataParams = {
            busNo: _this.temp.actiId
          };
          _this.taskInfo = [];
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/activitytargetinfo?actiId=' + _this.temp.actiId,
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
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/actitargetlistquery',
            data: { condition: JSON.stringify({ actiId: _this.temp.actiId, exeObjType: '1'}) },
            callback: function (code, message, response) {
              if (response.data) {
                var infos = response.data;
                _this.taskOrgTabledata = infos;
              }
            }
          });
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/actitargetlistquery',
            data: { condition: JSON.stringify({ actiId: _this.temp.actiId, exeObjType: '0'}) },
            callback: function (code, message, response) {
              if (response.data) {
                var infos = response.data;
                _this.taskUserTabledat = infos;
              }
            }
          });
          _this.fileParams = { condition: JSON.stringify({ busNo: selectionsAry[0].actiId + ''})};
          _this.fprodParams = { condition: JSON.stringify({ actiId: selectionsAry[0].actiId }) };
          _this.custParams = { condition: JSON.stringify({ actiId: selectionsAry[0].actiId }) };
        },


        /**
        * 删除
        */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_ACTIVITY.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少选择一条记录', type: 'warning' });
            return;
          }

          var len = selections.length, ids = [];
          for (var i = 0; i < len; i++) {
            if (selections[i].mktRespPerson != yufp.session.userCode) {
              _this.$message({ message: '只能选择自己负责的数据', type: 'warning' });
              return;
            }
            if (selections[i].mktAppState != '0') {
              _this.$message({ message: '只能选择未提交的数据', type: 'warning' });
              return;
            }
            ids.push(selections[i].actiId);
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/mkt/actidel',
                  data: JSON.stringify(selections),
                  callback: function (code, message, response) {
                    _this.$refs.OCRM_F_MK_ACTIVITY.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        /**
        * 营销活动移交
        */
        turnActFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_ACTIVITY.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].mktRespPerson != yufp.session.userCode) {
            _this.$message({ message: '只能选择自己负责的数据', type: 'warning' });
            return;
          }
          _this.turnVisible = true;

          _this.$nextTick(function () {
            _this.$refs.actTransForm.resetFields();
            _this.$refs.actTransForm.formdata.actiName = selections[0].actiName;
            _this.actTransFormdata = {
              actiName: selections[0].actiName,
              mktRespPerson: '',
              actiId: selections[0].actiId
            };
          });
        },
        /**
        * 确定移交营销活动
        */
        addRecevieFn: function (data) {
          var _this = this;
          _this.actTransFormdata.mktRespPerson = data[0].loginCode;
        },
        /**
        * 活动分配机构选择back方法
        */
        addRecevie1Fn: function (data) {
          var _this = this;
          _this.taskTransFormdata1.mktRespPerson = data[0].id;
        },
        /**
        * 客户经理选择back方法
        */
        addRecevie2Fn: function (data) {
          var _this = this;
          _this.taskTransFormdata2.userId = data[0].loginCode;
          _this.taskTransFormdata2.userName = data[0].userName;
        },
        /**
        * 确定-活动分配-机构-没有完全实现
        */
        taskSaveOrgFn: function () {
          var _this = this;
          var selections = _this.$refs.taskDistrTable.selections[0];
          for (let i = 0; i < _this.taskOrgTabledata.length; i++) {
            if (selections.exeObjCode == _this.taskOrgTabledata.exeObjCode) {
              break;
            }
          }
        },
        /**
        * 指标分解-分配-客户经理
        */
        taskSaveUserFn: function () {
          var _this = this;
          var selections = _this.$refs.userTragetInfo.selections[0];
          var info = {
            formUser: selections.exeObjCode,
            formName: selections.exeObjName,
            toUser: _this.taskTransFormdata2.userId,
            toName: _this.taskTransFormdata2.userName,
            actiId: _this.temp.actiId
          };
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/mkt/targetdistr',
            data: info,
            callback: function (code, message, response) {
              _this.$refs.userTragetInfo.remoteData();
              _this.taskUserVisible = false;
              _this.$message('操作成功');
            }
          });
        },
        /**
        * 确定移交营销活动
        */
        confirmTurnFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.actTransFormdata, model);
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/mkt/actitransfer',
            data: model,
            callback: function (code, message, response) {
              _this.$refs.OCRM_F_MK_ACTIVITY.remoteData();
              _this.turnVisible = false;
              _this.$message('操作成功');
            }
          });
        },

        /**
        * 提交营销活动
        */
        actSbmitFn: function () {
          var _this = this;
          var roles = [];
          var commitData = {};
          var submitFlag = '0';
          var selections = _this.$refs.OCRM_F_MK_ACTIVITY.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请至少选择一条记录！', type: 'warning' });
            return;
          }
          if (selections[0].mktAppState == '1') {
            _this.$message({ message: '审批中的活动不能提交', type: 'warning' });
            return;
          }
          if (selections[0].mktAppState == '2') {
            _this.$message({ message: '审批通过的活动不能提交', type: 'warning' });
            return;
          }
          if (selections[0].mktRespPerson != yufp.session.userCode) {
            _this.$message({ message: '只能选择自己负责的数据', type: 'warning' });
            return;
          }
          commitData.actiId = selections[0].actiId; // 流程主键
          commitData.bizSeqNo = selections[0].actiId;
          commitData.custId = yufp.session.userId;
          commitData.custName = yufp.session.userName;
          roles = yufp.session.roles;
          for (var i = 0; i < roles.length; i++) {
            if (roles[i].code == '114') {
              submitFlag = '1';
              commitData.applType = 'YJZHYXHDSP'; // 标签流程审批数据字典项
              _this.$refs.yufpWfInit.wfInit(commitData);
              break;
            }
            if (roles[i].code == '103') {
              submitFlag = 'z';
              commitData.applType = 'ZHYXHDSP'; // 标签流程审批数据字典项
              _this.$refs.yufpWfInit.wfInit(commitData);
              break;
            }
            if (roles[i].code == '117') {
              submitFlag = '2';
              break;
            }
          }
          if (submitFlag == '0') {
            _this.$message({ message: '没有权限', type: 'warning' });
            return;
          }
          if (submitFlag == '2') {
            // 二级支行
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/mkt/actiapproval',
              data: JSON.stringify(selections[0]),
              callback: function (code, message, response) {
                _this.$refs.OCRM_F_MK_ACTIVITY.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        },
        /**
        * 结束营销活动
        */
        successedActFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_ACTIVITY.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].actiStat != '2') {
            _this.$message({ message: '请先选择执行中的数据', type: 'warning' });
            return;
          }
          if (selections[0].mktRespPerson != yufp.session.userCode) {
            _this.$message({ message: '只能选择自己负责的数据', type: 'warning' });
            return;
          }
          selections[0].actiStat = '4';
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/mkt/actioff',
            data: selections[0],
            callback: function (code, message, response) {
              _this.$refs.OCRM_F_MK_ACTIVITY.remoteData();
              _this.$message('操作成功');
            }
          });
        }
      }
    });
  };
});