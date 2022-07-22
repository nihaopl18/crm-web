/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-2 11:30:53.
 * @updated by
 * @description 客户分配
 */
define(['custom/widgets/js/yufpExtTree.js', 'custom/widgets/js/yufpOrgTree.js', 'custom/widgets/js/YufpDutyUserSelector.js',
  './custom/plugins/yufp.watermark.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var AorgLevel = '';
    var BorgLevel = '';
    var maorgcode = '';
    yufp.lookup.reg('CD0011,CD0016,CD0019,CD0342,CD0242,CD0243,CD0032,CD0241,CD0238,WORK_TRAN_LEVEL');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          orgLocationBtn: !yufp.session.checkCtrl('orgLocation'),
          mgrLocationBtn: !yufp.session.checkCtrl('mgrLocation'),
          locationHisBtn: !yufp.session.checkCtrl('locationHis'),
          hisFormdata: {},
          allhisFormdata:{},
          // 查询表单数据
          queryFormdata: {},
          // dataUrl: '/trade/example/list',
          dataUrl: backend.adminService + '/api/acrmfcicustadmitall/listper',
          hisdataUrl: '/api/ocrmfciadmitbelong/qrybelonghis',
          // 机构树查询url
          orgUrl: '/api/ocrmfciadmitbelong/getorglist',
          // 客户经理树查询url
          mgrUrl: '/api/ocrmfciadmitbelong/getmgrlist',
          // 弹出框显示控制变量
          dialogVisible: false,
          alloHistorydialogVisible: false,
          allHistorydialogVisible: false,
          alloCustmgrdialogVisible: false,
          formDisabled: false,
          modelType: 'orgAllocate',
          viewTitle: { 'orgAllocate': '机构分配', 'custAllocate': '客户经理分配', 'allocateHistory': '分配历史查询' },
          saveBtnShow: true,
          // 机构分配弹出框分页组件传参
          pageData: {
            total: 0,
            page: 1,
            size: 10,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageKey: 'page',
            sizeKey: 'size'
          },
          orgAFlag: false,
          // 客户经理分配弹出框分页组件传参
          mgrpageData: {
            total: 0,
            page: 1,
            size: 10,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageKey: 'page',
            sizeKey: 'size'
          },
          mgrAFlag: false,
          // 所辖机构数据
          orgData: [],
          // 客户经理数据
          mgrData: [],
          // 选择的机构ID
          initialValue: '',
          // 当前选中的机构树节点数据
          orgNode: {},
          // 协办机构表格数据
          supportOrgData: [],
          // 调整前归属的协办机构信息
          supportOrgDataPre: [],
          // 协办客户经理表格数据
          supportMgrData: [],
          // 调整前归属的协办客户经理信息
          supportMgrDataPre: [],
          // 分配机构面板表单数据
          auspiceOrgFormdata: {},
          // 当前选中的客户经理树节点数据
          mgrNode: {},
          // 分配客户经理面板表单数据
          auspiceMgrFormdata: {},
          // 调整前归属的主办机构信息
          auspiceOrgFormdataPre: {},
          // 调整前归属的主办客户经理信息
          auspiceMgrFormdataPre: {},
          paramOrgId: '',
          parambusiType: '',
          paramorgIdAuth: ''
        };
      },
      mounted: function () {
        // var _this = this;
        // // 为查询表单设置一个默认值
        // _this.queryFormdata.custType = '1';
        // var param = {
        //   condition: JSON.stringify({
        //     custType: '1',
        //     // userId
        //     userId: yufp.session.userId,
        //     // orgCode
        //     orgCode: yufp.session.org.code
        //   })
        // };
        // _this.$refs.custAllocateTable.remoteData(param);
        // 查询机构
        var _this = this;
        _this.queryFormdata.isAdmitEnter = '1';
        yufp.service.request({
          method: 'GET',
          url: backend.custpubService + '/api/adminsmuser/queryuserorg',
          data: {
            condition: JSON.stringify({paramId: yufp.session.userId})
          },
          callback: function (code, message, response) {
            if (code == 0 && response.code === 0) {
              if (response.data) {
                var data = response.data;
                var strArr = [];
                for (var i = 0, len = data.length; i < len; i++) {
                  strArr.push(data[i].orgId);
                }
                _this.paramOrgId = strArr.join(',');
              }
            } else {
              _this.$message.error('查询失败');
            }
          }
        });
        // 查询条线
        yufp.service.request({
          method: 'GET',
          url: backend.custpubService + '/api/governedcust/getbusitype',
          data: {
            condition: JSON.stringify({userId: yufp.session.userId})
          },
          callback: function (code, message, response) {
            if (code == 0 && response.code === 0) {
              if (response.data) {
                var data = response.data;
                _this.paramorgIdAuth = data.orgIdAuth;
                _this.parambusiType = data.busiType;
                if (data.orgIdAuth == '2') {
                  _this.queryFormdata.custType = '2';
                } else {
                  _this.queryFormdata.custType = '1';
                }
              }
            } else {
              _this.$message.error('查询失败');
            }
          }
        });
        yufp.service.request({
          method: 'GET',
          url: backend.custflexService + '/api/ocrmfcifqscol/getUuid',
          data: {
            orgCode: yufp.session.org.code
          },
          callback: function (code, message, response) {
            if (code == 0 && response.code === 0) {
              BorgLevel = response.data.orgLevel;
            }
          }
        });
      },
      methods: {
        /**
        * 查询表单-客户类型切换后重置证件类型、价值等级
        */
        custTpChangeFn: function () {
          this.queryFormdata.certType = '';
          this.queryFormdata.valueLev = '';
        },
        /**
        * 客户查询——搜索按钮
        */
        searchFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.custSearchForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          _this.queryFormdata.userId = yufp.session.userId;
          _this.queryFormdata.orgCode = yufp.session.org.code;
          _this.queryFormdata.orgId = _this.paramOrgId;
          // 条线
          _this.queryFormdata.busiType = _this.parambusiType;

          // 授权机构
          _this.queryFormdata.orgIdAuth = _this.paramorgIdAuth;
          var param = {
            condition: JSON.stringify(_this.queryFormdata)
          };
          // 零售
          if (_this.queryFormdata.custType == '1') {
            _this.dataUrl = '/api/acrmfcicustadmitall/listper';
          } else if (_this.queryFormdata.custType == '2') {
            _this.dataUrl = '/api/acrmfcicustadmitall/listorg';
          }
          _this.$refs.custAllocateTable.remoteData(param);
        },
        /**
       * 客户查询——重置按钮
       */
        resetMainFn: function () {
          this.$refs.custSearchForm.resetFields();
        },
        /**
         * 改变弹出框中展示的模块
         */
        switchStatus: function (modelType) {
          this.modelType = modelType;
        },
        /**
         * 机构分配弹出框，分页组件，page改变时执行
         * @param val 当前页
         */
        pageChangeFn: function (val) {
          var _this = this;
          _this.pageData.page = val;
          if (_this.repeatTrigger) {
            _this.repeatTrigger = false;
          } else {
            _this.queryOrgFn();
          }
        },
        /**
         * 机构分配弹出框，分页组件，分页条数改变时执行
         * @param size 每页条数
         */
        sizeChangeFn: function (size) {
          var _this = this;
          _this.pageData.size = size;
          if (_this.repeatTrigger) {
            _this.repeatTrigger = false;
          } else {
            if (_this.pageData.page !== 1) {
              _this.pageData.page = 1;
              _this.repeatTrigger = true;
            }
            _this.queryOrgFn();
          }
        },
        /**
         * 客户经理分配弹出框，分页组件，page改变时执行
         * @param val 当前页
         */
        mgrpageChangeFn: function (val) {
          var _this = this;
          _this.pageData.page = val;
          if (_this.repeatTrigger) {
            _this.repeatTrigger = false;
          } else {
            _this.queryMgrFn();
          }
        },
        /**
         * 客户经理分配弹出框，分页组件，分页条数改变时执行
         * @param size 每页条数
         */
        mgrsizeChangeFn: function (size) {
          var _this = this;
          _this.pageData.size = size;
          if (_this.repeatTrigger) {
            _this.repeatTrigger = false;
          } else {
            if (_this.pageData.page !== 1) {
              _this.pageData.page = 1;
              _this.repeatTrigger = true;
            }
            _this.queryMgrFn();
          }
        },
        /**
        * 分配机构——保存
        */
        orgsaveFn: function () {
          var _this = this;
          // 向后台传递的数据对象
          var model = {};
          var selections = _this.$refs.custAllocateTable.selections;
          // 协办机构表格数据
          var supportOrgData = _this.supportOrgData;
          // 将协办构表格数据对象存储到model中
          // 主办数据
          var auspiceData = [];
          // 协办数据
          var supportData = [];
          // yufp.clone(_this.auspiceOrgFormdata, auspiceData);
          // 遍历选择的客户数据，处理得到主办数据
          if (_this.auspiceOrgFormdata.orgName == '') {
            _this.$message({ message: '请设置主办机构', type: 'warning' });
            return;
          }
          if (_this.auspiceOrgFormdata.orgId != _this.auspiceOrgFormdataPre.orgId) {
            for (var i = 0, len = selections.length; i < len; i++) {
              var obj = {};
              obj.custId = selections[i].custId;
              obj.custName = selections[i].custName;
              obj.custType = selections[i].custType;
              obj.isAdmitEnter = selections[0].isAdmitEnter;
              // 调整前归属机构类型
              // 主办
              obj.orgTypePre = '1';
              // 调整前归属机构ID
              obj.orgIdPre = _this.auspiceOrgFormdataPre.orgId;
              // 调整前归属机构名称
              obj.orgNamePre = _this.auspiceOrgFormdataPre.orgName;
              // TODO 调整前归属的客户经理信息 在机构分配时，是否可以不用传
              obj.orgId = _this.auspiceOrgFormdata.orgId;
              obj.orgName = _this.auspiceOrgFormdata.orgName;
              obj.orgType = '1';
              obj.assignUser = yufp.session.userId;
              obj.assignUsername = yufp.session.userName;
              obj.assignDate = new Date();
              // TODO 调整原因在需求中没有体现，先不传
              // 调整类型——主办机构
              obj.workTranLevel = '1';
              // 最近更新人
              obj.lastUpdateUser = yufp.session.userId;
              // 客户分配状态, 固定传 “已分配-码值1”
              obj.custAssignStat = '1';
              auspiceData.push(obj);
            }
          }
          // 遍历选择的客户数据，处理得到协办数据
          for (var i = 0, lenSeletions = selections.length; i < lenSeletions; i++) {
            for (var j = 0, lenSupport = supportOrgData.length; j < lenSupport; j++) {
              var obj = {};
              obj.hisId = '';
              obj.custId = selections[i].custId;
              obj.custName = selections[i].custName;
              obj.custType = selections[i].custType;
              obj.isAdmitEnter = selections[0].isAdmitEnter;
              // 调整前归属机构类型
              // 协办
              // obj.orgTypePre = '2';
              if (_this.auspiceOrgFormdata.orgId == supportOrgData[j].orgId) {
                _this.$message({ message: '协办机构和主办机构不能重复', type: 'warning' });
                return;
              }
              obj.orgId = supportOrgData[j].orgId;
              obj.orgName = supportOrgData[j].orgName;
              obj.orgType = '2';
              // TODO 调整前归属的客户经理信息 在机构分配时，是否可以不用传
              obj.assignUser = yufp.session.userId;
              obj.assignUsername = yufp.session.userName;
              obj.assignDate = new Date();
              // TODO 调整原因在需求中没有体现，先不传
              // 调整类型——协办机构
              obj.workTranLevel = '3';
              // 最近更新人
              obj.lastUpdateUser = yufp.session.userId;
              // 客户分配状态, 固定传 “已分配-码值1”
              obj.custAssignStat = '1';
              supportData.push(obj);
            }
          }
          model.isAdmitEnter = selections[0].isAdmitEnter;
          // 主办数据
          model.nodeData = JSON.stringify(auspiceData);
          // 协办数据
          model.connData = JSON.stringify(supportData);
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: '/api/ocrmfciadmitbelong/savebelong',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.$refs.custAllocateTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              } else {
                _this.$message.error('失败');
              }
            }
          });
        },
        /**
        * 分配机构——取消
        */
        orgcancelFn: function () {
          var _this = this;
          _this.orgId = '';
          _this.dialogVisible = false;
        },
        /**
        * 分配客户经理——保存
        */
        mgrsaveFn: function () {
          var _this = this;
          // 向后台传递的数据对象
          var model = {};
          var selections = _this.$refs.custAllocateTable.selections;
          // 协办客户经理表格数据
          var supportMgrData = _this.supportMgrData;
          var supportMgrDataPre = _this.supportMgrDataPre;
          // 将协办构表格数据对象存储到model中
          // 主办数据
          var auspiceData = [];
          // 协办数据
          var supportData = [];
          // yufp.clone(_this.auspiceOrgFormdata, auspiceData);
          // 判断如果主办客户经理为空，则查询主办机构下的唯一虚拟客户经理，作为主办客户经理
          if (_this.auspiceOrgFormdata.orgName == '' || _this.auspiceOrgFormdata.orgId == '') {
            _this.$message({ message: '请先分配主办机构', type: 'warning' });
            return;
          }
          if (_this.auspiceMgrFormdata.mgrName == '') {
            _this.auspiceMgrFormdata.mgrName = '虚拟客户经理';
            _this.auspiceMgrFormdata.mgrId = 'VM' + _this.auspiceOrgFormdata.orgId;
          }
          //判断主协办客户经理是否存在同一个
          for (var i = 0; i < _this.supportMgrData.length; i++) {
            if (_this.auspiceMgrFormdata.mgrId == _this.supportMgrData[i].mgrId) {
              _this.$message('客户经理不能同时为主协办客户经理');
              return;
            }
          }
          // 遍历选择的客户数据，处理得到主办数据
          if (_this.auspiceMgrFormdataPre.mgrId != _this.auspiceMgrFormdata.mgrId) {
            for (var i = 0, len = selections.length; i < len; i++) {
              var obj = {};
              obj.custId = selections[i].custId;
              obj.custName = selections[i].custName;
              obj.custType = selections[i].custType;
              // 调整前归属机构类型
              // 主办
              obj.mgrTypePre = '1';
              obj.orgTypePre = '1';
              // 调整前归属客户经理ID
              obj.mgrIdPre = _this.auspiceMgrFormdataPre.mgrId;
              // 调整前归属客户经理名称
              obj.mgrNamePre = _this.auspiceMgrFormdataPre.mgrName;
              obj.orgIdPre = _this.auspiceMgrFormdataPre.orgId;
              obj.orgNamePre = _this.auspiceMgrFormdataPre.orgName;
              obj.orgTypePre = _this.auspiceMgrFormdataPre.orgType;
              // TODO 调整前归属的机构信息 在客户经理分配时，是否可以不用传
              obj.mgrId = _this.auspiceMgrFormdata.mgrId;
              obj.mgrName = _this.auspiceMgrFormdata.mgrName;
              obj.mgrType = '1';
              obj.orgId = _this.auspiceMgrFormdata.orgId;
              obj.orgName = _this.auspiceMgrFormdata.orgName;
              obj.orgType = '1';
              obj.assignUser = yufp.session.userId;
              obj.assignUsername = yufp.session.userName;
              obj.assignDate = new Date();
              // TODO 调整原因在需求中没有体现，先不传
              // 调整类型——主办客户经理
              obj.workTranLevel = '2';
              // 最近更新人
              obj.lastUpdateUser = yufp.session.userId;
              // 客户分配状态, 固定传 “已分配-码值1”
              obj.custAssignStat = '1';
              auspiceData.push(obj);
            }
          }
          // 遍历选择的客户数据，处理得到协办数据supportMgrDataPre
          // for (var i = 0, lenSeletions = selections.length; i < lenSeletions; i++) {
          for (var j = 0, lenSupport = supportMgrData.length; j < lenSupport; j++) {
            var flag = 0;
            for (var k = 0, lenSupport1 = supportMgrDataPre.length; k < lenSupport1; k++) {
              if (supportMgrData[j].mgrId == supportMgrDataPre[k].mgrId) {

              } else {
                flag++;
                if (flag == supportMgrDataPre.length) { // 新增的协办客户
                  var obj = {};
                  // 客户数据
                  obj.custId = selections[0].custId;
                  obj.custName = selections[0].custName;
                  obj.custType = selections[0].custType;
                  // 调整前归属客户经理信息可以不传
                  // 协办
                  // obj.mgrTypePre = '2';
                  obj.mgrId = supportMgrData[j].mgrId;
                  obj.mgrName = supportMgrData[j].mgrName;
                  obj.mgrType = '2';
                  obj.orgId = supportMgrData[j].orgId;
                  obj.orgName = supportMgrData[j].orgName;
                  if (_this.auspiceMgrFormdata.orgId == supportMgrData[j].orgId) {
                    obj.orgType = '1';
                  } else {
                    obj.orgType = '2';
                  }
                  // TODO 调整前归属的客户经理信息 在机构分配时，是否可以不用传
                  obj.assignUser = yufp.session.userId;
                  obj.assignUsername = yufp.session.userName;
                  obj.assignDate = new Date();
                  // TODO 调整原因在需求中没有体现，先不传
                  // 调整类型——主办机构
                  obj.workTranLevel = '4';
                  // 最近更新人
                  obj.lastUpdateUser = yufp.session.userId;
                  // 客户分配状态, 固定传 “已分配-码值1”
                  obj.custAssignStat = '1';
                  supportData.push(obj);
                }
              }
            }
          }
          for (var k1 = 0, lenSupport2 = supportMgrDataPre.length; k1 < lenSupport2; k1++) {
            var flag1 = 0;
            for (var j1 = 0, lenSupport3 = supportMgrData.length; j1 < lenSupport3; j1++) {
              if (supportMgrData[j1].mgrId == supportMgrDataPre[k1].mgrId) {

              } else {
                flag1++;
                if (flag1 == supportMgrData.length) { // 新增的协办客户
                  var obj = {};
                  // 客户数据
                  obj.custId = selections[0].custId;
                  obj.custName = selections[0].custName;
                  obj.custType = selections[0].custType;
                  // 调整前归属客户经理信息可以不传
                  // 协办
                  // obj.mgrTypePre = '2';
                  obj.mgrIdPre = supportMgrDataPre[k1].mgrId;
                  obj.mgrNamePre = supportMgrDataPre[k1].mgrName;
                  obj.mgrTypePre = '2';
                  obj.orgIdPre = supportMgrDataPre[k1].orgId;
                  obj.orgNamePre = supportMgrDataPre[k1].orgName;
                  if (_this.auspiceMgrFormdataPre.orgId == supportMgrDataPre[k1].orgId) {
                    obj.orgTypePre = '1';
                  } else {
                    obj.orgTypePre = '2';
                  }
                  // TODO 调整前归属的客户经理信息 在机构分配时，是否可以不用传
                  obj.assignUser = yufp.session.userId;
                  obj.assignUsername = yufp.session.userName;
                  obj.assignDate = new Date();
                  // TODO 调整原因在需求中没有体现，先不传
                  // 调整类型——主办机构
                  obj.workTranLevel = '4';
                  // 最近更新人
                  obj.lastUpdateUser = yufp.session.userId;
                  // 客户分配状态, 固定传 “已分配-码值1”
                  obj.custAssignStat = '1';
                  supportData.push(obj);
                }
              }
            }
          }
          if (supportMgrDataPre.length == 0 && supportMgrData.length != 0) {
            // 全部新增
            for (var j = 0; j < supportMgrData.length; j++) {
              var obj = {};
              // 客户数据
              obj.custId = selections[0].custId;
              obj.custName = selections[0].custName;
              obj.custType = selections[0].custType;
              // 调整前归属客户经理信息可以不传
              // 协办
              // obj.mgrTypePre = '2';
              obj.mgrId = supportMgrData[j].mgrId;
              obj.mgrName = supportMgrData[j].mgrName;
              obj.mgrType = '2';
              obj.orgId = supportMgrData[j].orgId;
              obj.orgName = supportMgrData[j].orgName;
              if (_this.auspiceMgrFormdata.orgId == supportMgrData[j].orgId) {
                obj.orgType = '1';
              } else {
                obj.orgType = '2';
              }
              // TODO 调整前归属的客户经理信息 在机构分配时，是否可以不用传
              obj.assignUser = yufp.session.userId;
              obj.assignUsername = yufp.session.userName;
              obj.assignDate = new Date();
              // TODO 调整原因在需求中没有体现，先不传
              // 调整类型——主办机构
              obj.workTranLevel = '4';
              // 最近更新人
              obj.lastUpdateUser = yufp.session.userId;
              // 客户分配状态, 固定传 “已分配-码值1”
              obj.custAssignStat = '1';
              supportData.push(obj);
            }
          }
          if (supportMgrData.length == 0 && supportMgrDataPre.length != 0) {
            for (var j = 0; j < supportMgrDataPre.length; j++) {
              var obj = {};
              // 客户数据
              obj.custId = selections[0].custId;
              obj.custName = selections[0].custName;
              obj.custType = selections[0].custType;
              // 调整前归属客户经理信息可以不传
              // 协办
              // obj.mgrTypePre = '2';
              obj.mgrIdPre = supportMgrDataPre[j].mgrId;
              obj.mgrNamePre = supportMgrDataPre[j].mgrName;
              obj.mgrTypePre = '2';
              obj.orgIdPre = supportMgrDataPre[j].orgId;
              obj.orgNamePre = supportMgrDataPre[j].orgName;
              if (_this.auspiceMgrFormdataPre.orgId == supportMgrDataPre[j].orgId) {
                obj.orgTypePre = '1';
              } else {
                obj.orgTypePre = '2';
              }
              // TODO 调整前归属的客户经理信息 在机构分配时，是否可以不用传
              obj.assignUser = yufp.session.userId;
              obj.assignUsername = yufp.session.userName;
              obj.assignDate = new Date();
              // TODO 调整原因在需求中没有体现，先不传
              // 调整类型——主办机构
              obj.workTranLevel = '4';
              // 最近更新人
              obj.lastUpdateUser = yufp.session.userId;
              // 客户分配状态, 固定传 “已分配-码值1”
              obj.custAssignStat = '1';
              supportData.push(obj);
            }
          }
          // }
          model.isAdmitEnter = selections[0].isAdmitEnter;
          // 主办数据
          model.nodeData = JSON.stringify(auspiceData);
          // 协办数据
          model.connData = JSON.stringify(supportData);
          // 向后台发送保存请求
          if (auspiceData.length == 0 && supportData.length == 0) {
            _this.$message('没有可提交的数据');
            return;
          }
          yufp.service.request({
            method: 'POST',
            url: '/api/ocrmfciadmitbelong/savebelong',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.$refs.custAllocateTable.remoteData();
                _this.$message('操作成功');
                _this.alloCustmgrdialogVisible = false;
              } else {
                _this.$message.error('失败');
              }
            }
          });
        },
        /**
        * 分配客户经理——取消
        */
        mgrcancelFn: function () {
          var _this = this;
          _this.alloCustmgrdialogVisible = false;
        },
        /**
          * 从指定对象获取指定路径的值
          * @param {*} object 对象
          * @param {*} prop 路径
          */
        getValueByPath: function (object, prop) {
          prop = prop || '';
          var paths = prop.split('.');
          var current = object;
          var result = null;
          for (var i = 0, j = paths.length; i < j; i++) {
            var path = paths[i];
            if (!current) {
              break;
            }
            if (i === j - 1) {
              result = current[path];
              break;
            }
            current = current[path];
          }
          return result;
        },
        /**
        * 查询所辖机构
        */
        queryOrgFn: function () {
          var _this = this;
          var pageObj = {};
          pageObj[_this.pageData.pageKey] = _this.pageData.page;
          pageObj[_this.pageData.sizeKey] = _this.pageData.size;
          yufp.service.request({
            method: 'GET',
            url: '/api/ocrmfciadmitbelong/getorglist',
            data: pageObj,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.orgData = response.data;
                _this.pageData.total = _this.getValueByPath(response, 'total') || 0;
                // 处理orgData中和右侧协办数据中重复的数据
                // 进入弹出框时不处理，只有翻页查询时才处理
                if (!_this.orgAFlag) {
                  for (var j = 0, len = _this.supportOrgData.length; j < len; j++) {
                    for (var i = 0; i < _this.orgData.length; i++) {
                      if (_this.orgData[i].orgId == _this.supportOrgData[j].orgId) {
                        // 删除orgData中的重复项
                        _this.orgData.splice(i, 1);
                      }
                    }
                  }
                }
                _this.orgAFlag = false;
              } else {
                _this.$message.error('查询失败');
              }
            }
          });
        },
        /**
        * 查询客户经理
        */
        queryMgrFn: function (value) {
          var _this = this;
          var pageObj = {};
          pageObj = {condition: JSON.stringify({
            custId: _this.$refs.custAllocateTable.selections[0].custId,
            isAdmitEnter: _this.$refs.custAllocateTable.selections[0].isAdmitEnter
          })};
          pageObj[_this.pageData.pageKey] = _this.pageData.page;
          pageObj[_this.pageData.sizeKey] = _this.pageData.size;
          yufp.service.request({
            method: 'GET',
            url: '/api/ocrmfciadmitbelong/getmgrlist',
            data: pageObj,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.mgrData = response.data;
                _this.mgrpageData.total = _this.getValueByPath(response, 'total') || 0;
                // 处理mgrData中和右侧协办数据中重复的数据
                // 进入弹出框时不处理，只有翻页查询时才处理
                if (!_this.mgrAFlag) {
                  for (var j = 0, len = _this.supportMgrData.length; j < len; j++) {
                    for (var i = 0; i < _this.mgrData.length; i++) {
                      if (_this.mgrData[i].userId == _this.auspiceMgrFormdata.mgrId) {
                        // 删除mgrData中的重复项
                        _this.mgrData.splice(i, 1);
                      }
                      if (_this.mgrData[i].userId == _this.supportMgrData[j].mgrId) {
                        // 删除mgrData中的重复项
                        _this.mgrData.splice(i, 1);
                      }
                    }
                  }
                }
                _this.mgrAFlag = false;
              } else {
                _this.$message.error('查询失败');
              }
            }
          });
        },
        /**
         * 机构分配
         */
        orgAllocateFn: function () {
          var _this = this;
          var selections = _this.$refs.custAllocateTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少选择一条记录', type: 'warning' });
            return;
          }
          if (selections.length > 1) {
            // 未分配客户分配给下辖机构
            for (var i = 0, len = selections.length; i < len; i++) {
              if (selections[i].custAssignStat != '2') {
                _this.$message({
                  message: '只对未分配客户进行操作，请重新选择',
                  type: 'warning'
                });
              }
            }
            // 遍历选择的数据，判断是否都归属于同一机构下，如果是，才可以发起批量机构分配
            var flagt = selections.every(function (item) {
              return item.belongBrch === selections[0].belongBrch;
            });
            if (!flagt) {
              _this.$message({
                message: '所选用户不属于同一机构，请重新选择',
                type: 'warning'
              });
              return;
            }
          }
          // 展示机构分配模块
          _this.switchStatus('orgAllocate');
          _this.dialogVisible = true;
          _this.orgAFlag = true;
          _this.$nextTick(function () {
            // 清空表单和表格数据
            // _this.$refs.orgTable.clearSelection();
            _this.$refs.orgrefform.resetFields();
            var len = _this.supportOrgData.length;
            _this.supportOrgData.splice(0, len);
            _this.pageData.page = 1;
            _this.queryOrgFn();
            // yufp.service.request({
            //   method: 'GET',
            //   url: '/api/ocrmfciadmitbelong/getorglist',
            //   callback: function (code, message, response) {
            //     if (code == 0 && response.code === 0) {
            //       _this.orgData = response.data;
            //     } else {
            //       _this.$message.error('查询失败');
            //     }
            //   }
            // });
          });
          var isurl = '';
          if (_this.$refs.custAllocateTable.selections[0].isAdmitEnter === '1') {
            isurl = '/api/ocrmfciadmitbelong/qryorgid';
          } else {
            isurl = '/api/ocrmfcinoadmitbelong/qryorgid';
          }
          // 发起请求，查询出选择客户的原主协办机构
          yufp.service.request({
            method: 'GET',
            url: isurl,
            data: { custId: selections[0].custId },
            // 测试数据
            // data: { custId: 'A5'},
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                var data = response.data;
                for (var i = 0, len = data.length; i < len; i++) {
                  // 主办类型
                  if (data[i].orgType == '1') {
                    // 保存调整前归属的主办机构信息
                    _this.auspiceOrgFormdata = yufp.clone(data[i], _this.auspiceOrgFormdata);
                    yufp.clone(_this.auspiceOrgFormdata, _this.auspiceOrgFormdataPre);
                    AorgLevel = data[i].orgLevel;// 主办机构级别
                  } else if (data[i].orgType == '2') {
                    // 协办类型
                    if (data[i].orgId) {
                      _this.supportOrgData.push(data[i]);
                    }
                  }
                }
                // 保存调整前归属的协办机构信息
                yufp.clone(_this.supportOrgData, _this.supportOrgDataPre);
              } else {
                _this.$message.error('主办机构数据查询失败');
              }
            }
          });
        },
        /**
         * 客户经理分配
         */
        custManagerAllocateFn: function () {
          var _this = this;
          var selections = _this.$refs.custAllocateTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections.length > 1) {
            // 遍历选择的数据，判断是否都归属于同一客户经理下，如果是，才可以发起批量客户经理分配
            var flagt = selections.every(function (item) {
              return item.belongMgr === selections[0].belongMgr;
            });
            if (!flagt) {
              _this.$message({
                message: '所选用户不属于同一客户经理，请重新选择',
                type: 'warning'
              });
              return;
            }
          }
          // 展示客户经理分配模块
          _this.switchStatus('custAllocate');
          _this.alloCustmgrdialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.custMgr.clearSelection();
            _this.$refs.mgrrefform.resetFields();
            _this.queryMgrFn();
            // yufp.service.request({
            //   method: 'GET',
            //   url: '/api/ocrmfciadmitbelong/getmgrlist',
            //   callback: function (code, message, response) {
            //     if (code == 0 && response.code === 0) {
            //       _this.mgrData = response.data;
            //     } else {
            //       _this.$message.error('查询失败');
            //     }
            //   }
            // });
            var len = _this.supportMgrData.length;
            _this.supportMgrData.splice(0, len);
          });
          // 发起查询请求，查询归属的协办客户经理
          var isurl = '';
          if (_this.$refs.custAllocateTable.selections[0].isAdmitEnter === '1') {
            isurl = '/api/ocrmfciadmitbelong/qrymgrid';
          } else {
            isurl = '/api/ocrmfcinoadmitbelong/qrymgrid';
          }
          yufp.service.request({
            method: 'GET',
            url: isurl,
            data: { custId: selections[0].custId },
            // 测试数据
            // data: {custId: 'A5'},
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                var data = response.data;
                // 设置协办客户经理表格数据
                for (var i = 0, len = data.length; i < len; i++) {
                  // 主办类型
                  if (data[i].mgrType == '1') {
                    _this.auspiceMgrFormdata = yufp.clone(response.data[i], _this.auspiceMgrFormdata);
                    // 保存调整前的主办客户经理信息
                    yufp.clone(_this.auspiceMgrFormdata, _this.auspiceMgrFormdataPre);
                  } else if (data[i].mgrType == '2') {
                    // 协办类型
                    if (data[i].mgrId) {
                      _this.supportMgrData.push(data[i]);
                    }
                  }
                }
                // 保存调整前归属的协办客户经理信息
                yufp.clone(_this.supportMgrData, _this.supportMgrDataPre);
                // yu-xtable有bug，直接clone数据不行
                // _this.supportMgrData = yufp.clone(response.data, _this.supportMgrData);
              } else {
                _this.$message.error('协办客户经理数据查询失败');
              }
            }
          });
        },
        /**
         * 分配历史查询
         */
        allocateHistoryFn: function () {
          var _this = this;
          // var model = {};
          if (_this.$refs.custAllocateTable.selections.length == 0) {
            _this.switchStatus('allocateHistory');
            _this.allHistorydialogVisible = true;
            _this.alloHistorydialogVisible = false;
          } else if (_this.$refs.custAllocateTable.selections.length == 1) {
            _this.switchStatus('allocateHistory');
            _this.allHistorydialogVisible = false;
            _this.alloHistorydialogVisible = true;
            _this.$nextTick(function () {
              _this.hisFormdata.custId = _this.$refs.custAllocateTable.selections[0].custId;
            });
          } else {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
        },
        searchFn1: function () {
          var _this=this;
          var model = {};
          yufp.clone(_this.hisFormdata, model);
          model.id = _this.$refs.custAllocateTable.selections[0].custId;
          model.orgIdAuth = _this.paramorgIdAuth;
          var param = {
            condition: JSON.stringify(model)
          };
          _this.$refs.custAllocateHistoryTable.remoteData(param);
        },
        searchFn2: function () {
          var _this=this;
          var model = {};
          yufp.clone(_this.allhisFormdata, model);
          model.orgIdAuth = _this.paramorgIdAuth;
          var param = {
            condition: JSON.stringify(model)
          };
          _this.$refs.custAllocateHistoryTableAll.remoteData(param);
        },
        resetMainFn2: function () {
          this.$refs.custAllocateHistoryFormAll.resetFields();
        },
        resetMainFn1: function () {
          this.$refs.custAllocateHistoryForm.resetFields();
        },
        /**
         * 移除协办机构
         */
        removeOrgFn: function () {
          var selections = this.$refs.orgAllocateTable.selections;
          for (var i = selections.length - 1; i >= 0; i--) {
            for (var j = 0; j < this.supportOrgData.length; j++) {
              if (selections[i].orgId != undefined && selections[i].orgId === this.supportOrgData[j].orgId) {
                var index = this.supportOrgData[j].orgdIndex;
                this.orgData.splice(index, 0, this.supportOrgData[j]);
                this.supportOrgData.splice(j, 1);
                break;
              }
            }
          }
        },
        /**
         * 移除协办客户经理
         */
        removeMgrFn: function () {
          var selections = this.$refs.custManagerAllocateTable.selections;
          for (var i = selections.length - 1; i >= 0; i--) {
            for (var j = 0; j < this.supportMgrData.length; j++) {
              if (selections[i].mgrId != undefined && selections[i].mgrId === this.supportMgrData[j].mgrId) {
                var index = this.supportMgrData[j].mgrdIndex;
                var obj = {};
                obj.userName = this.supportMgrData[j].mgrName;
                obj.orgName = this.supportMgrData[j].orgName;
                obj.userId = this.supportMgrData[j].mgrId;
                this.mgrData.splice(index, 0, obj);
                this.supportMgrData.splice(j, 1);
              }
            }
          }
          // 要将移除的客户加到左侧客户经理列表
        },
        /**
         * 处理机构树节点选择后隐藏
         */
        filterOrgNodeFn: function (value, data, node) {

        },
        /**
        * 机构树节点点击
        */
        orgNodeClickFn: function (nodeData, node) {
          this.orgNode = nodeData;
        },
        /**
        * 客户经理树节点点击
        */
        mgrNodeClickFn: function (nodeData, node) {
          this.mgrNode = nodeData;
        },
        /**
         * 设为主办机构
         */
        setAuspiceOrgFn: function () {
          // var node = this.$refs.orgTree.getCheckedNodes(false);
          // this.$refs.orgTree.filter(this.orgNode.orgId);
          // var orgSelections = this.$refs.orgTable.selections;
          var orgNodeInfo = this.orgNode;
          if (orgNodeInfo == '') {
            this.$message({ message: '请选择要设置的机构', type: 'warning' });
            return;
          }
          // if (orgSelections.length < 1) {
          //   this.$message({ message: '请选择要设置的机构', type: 'warning' });
          //   return;
          // }
          // 判断选中的机构是否为当前客户主办机构的上级机构 不是不可以设置
          // if (BorgLevel > AorgLevel) {
          //   this.$message.error('用户登陆机构不是被操作客户的主办机构的上级机构，不可以设置！');
          //   return;
          // }
          // 用户当前登录为协办则不能设置机构，只能设置协办客户经理
          // for (var i = 0; i < this.supportOrgData.length; i++) {
          //   if (BorgLevel == this.supportOrgData[i].orgLevel) {
          //     this.$message.error('当前登录为协办关系不能设置！');
          //     return;
          //   }
          // }
          for (var j = 0; j < this.orgData.length; j++) {
            if (this.orgData[j].orgId === orgNodeInfo.orgId) {
              this.orgData.splice(j, 1);
            }
          }
          this.auspiceOrgFormdata.orgName = orgNodeInfo.orgName;
          this.auspiceOrgFormdata.orgId = orgNodeInfo.orgId;
          // for (var j = 0; j < this.orgData.length; j++) {
          //   if (this.orgData[j].orgId === orgSelections[0].orgId) {
          //     this.orgData.splice(j, 1);
          //   }
          // }
          // this.auspiceOrgFormdata.orgName = orgSelections[0].orgName;
          // this.auspiceOrgFormdata.orgId = orgSelections[0].orgId;
        },
        /**
         * 设为协办机构
         */
        setSupportOrgFn: function () {
          // var orgSelections = this.$refs.orgTable.selections;
          // if (orgSelections.length < 1) {
          //   this.$message({ message: '请选择要设置的机构', type: 'warning' });
          //   return;
          // }
          var orgNodeInfo = this.orgNode;
          // 判断选中的机构是否为当前客户主办机构和上级机构 不是不可以设置
          // if (BorgLevel > AorgLevel) {
          //   this.$message.error('用户登陆机构不是被操作客户的主办机构或上级机构，不可以设置！');
          //   return;
          // }
          // 用户当前登录为协办则不能设置机构，只能设置协办客户经理
          // for (var i = 0; i < this.supportOrgData.length; i++) {
          //   if (BorgLevel == this.supportOrgData[i].orgLevel) {
          //     this.$message.error('当前登录为协办关系不能设置！');
          //     return;
          //   }
          // }
          // 标识设置的协办数据在orgData中的下标位置
          var orgdIndex;
          for (var j = 0; j < this.supportOrgData.length; j++) {
            if (this.supportOrgData[j].orgId === orgNodeInfo.orgId) {
              return;
            }
          }
          // for (var j = 0; j < this.orgData.length; j++) {
          //   if (this.orgData[j].orgId === orgNodeInfo.orgId) {
          //     this.orgData.splice(j, 1);
          //     orgdIndex = j;
          //   }
          // }
          var obj = {};
          obj.orgId = orgNodeInfo.orgId;
          obj.orgName = orgNodeInfo.orgName;
          obj.orgdIndex = orgdIndex;
          this.supportOrgData.push(obj);
        },
        /**
         * 设为主办客户经理
         */
        setAuspiceMgrFn: function () {
          var _this = this;
          var mgrSelections = this.$refs.custMgr.selections;
          if (mgrSelections.length < 1) {
            this.$message({ message: '请选择要设置的客户经理', type: 'warning' });
            return;
          }

          // for (var i = 0; i < this.supportOrgData.length; i++) {
          //   if (BorgLevel == this.supportOrgData[i].orgLevel) {
          //     this.$message.error('当前登录为协办关系不能设置！');
          //     return;
          //   }
          // }
          var selections = this.$refs.custAllocateTable.selections;
          if (!(mgrSelections[0].orgId === selections[0].belongBrch)) {
            this.$message.error('当前客户经理不是主办机构客户经理！');
            return;
          }
          // 查询当前主办机构和上级机构的客户经理
          yufp.service.request({
            method: 'GET',
            async: false,
            url: '/api/ocrmfciadmitbelong/qryorgid',
            data: { custId: selections[0].custId },
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                var data = response.data;
                for (var i = 0, len = data.length; i < len; i++) {
                  // 主办类型
                  if (data[i].orgType == '1') {
                    maorgcode = data[i].orgId;// 主办机构级别
                  }
                }
                yufp.service.request({
                  method: 'GET',
                  url: '/api/ocrmfciadmitbelong/getupmgrlist',
                  data: {
                    orgCode: maorgcode
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.code === 0) {
                      var flag = false;
                      // 判断选中的客户经理是否为当前客户主办机构和上级机构的 不是不可以设置
                      for (var j = 0; j < response.data.length; j++) {
                        if (mgrSelections[0].userId == response.data[j].userId) {
                          flag = true;
                          break;
                        }
                      }
                      // if (!flag) {
                      //   _this.$message.error('不是当前的主办机构或上级机构内的客户经理不可以设置！');
                      //   return;
                      // }
                      // 移除已经设置的客户经理
                      for (var j = 0; j < _this.mgrData.length; j++) {
                        if (_this.mgrData[j].userId === mgrSelections[0].userId) {
                          _this.mgrData.splice(j, 1);
                        }
                      }
                      _this.auspiceMgrFormdata.mgrName = mgrSelections[0].userName;
                      _this.auspiceMgrFormdata.mgrId = mgrSelections[0].userId;
                    } else {
                      _this.$message.error('查询失败');
                    }
                  }
                });
              } else {
                _this.$message.error('主办机构数据查询失败');
              }
            }
          });
        },
        /**
         * 设为协办客户经理
         */
        setSupportMgrFn: function () {
          var mgrSelections = this.$refs.custMgr.selections;
          if (mgrSelections.length < 1) {
            this.$message({ message: '请选择要设置的客户经理', type: 'warning' });
            return;
          }

          // 标识设置的协办数据在mgrData中的下标位置
          var mgrdIndex;
          for (var j = 0; j < this.supportMgrData.length; j++) {
            if (this.supportMgrData[j].mgrId === mgrSelections[0].userId) {
              return;
            }
          }
          // 移除已经设置的客户经理
          for (var j = 0; j < this.mgrData.length; j++) {
            if (this.mgrData[j].userId != undefined && this.mgrData[j].userId === mgrSelections[0].userId) {
              this.mgrData.splice(j, 1);
              mgrdIndex = j;
            }
          }
          var obj = {};
          obj.mgrId = mgrSelections[0].userId;
          obj.mgrName = mgrSelections[0].userName;
          obj.orgName = mgrSelections[0].orgName;
          obj.orgId = mgrSelections[0].orgId;
          obj.mgrdIndex = mgrdIndex;
          this.supportMgrData.push(obj);
        },
        /**
         * 设置客户经理-清空图标点击事件
         */
        mgrIconClickFn: function () {
          this.auspiceMgrFormdata.mgrName = '';
        },
        /**
         * 设置机构树-清空图标点击事件
         */
        orgIconClickFn: function () {
          this.auspiceOrgFormdata.orgName = '';
        },
        /**
        * 日期格式化
        */
        dateFormatter: function (row, column, cellValue) {
          var datetime = cellValue;
          if (!datetime) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d} {h}:{mi}:{s}');
        }
      }
    });
  };
});