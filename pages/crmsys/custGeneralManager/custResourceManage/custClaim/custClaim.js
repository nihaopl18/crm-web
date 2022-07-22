/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-4 11:27:47.
 * @updated by
 * @description 客户认领
 */
define([
  './custom/plugins/yufp.watermark.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('IN_CUST_STAT,CD0011,CD0016,CD0019,CD0243,CD0032,ACT_APP_STATS');
    yufp.custom.vue({
      el: cite.el,

      data: function () {
        var _this = this;
        return {
          innerOrgParams: {
            dataParams: 'oneorg'
          },
          outOrgParams: {
            dataParams: '500'
          },
          queryFormdata: {},
          claimAppliformdataNoAdmit: {},
          baseParams: { condition: JSON.stringify({ userId: yufp.session.user.userId }) },
          // 查询个人历史信息
          dataUrl: backend.custpubService + '/api/ocrmfcilatentapply/list',
          // 默认的行内潜在客户 查询url
          fordataUrl: backend.custpubService + '/api/ocrmfcilatentapply/potforlist',
          // 默认的非行内正式客户 查询url
          infordataUrl: backend.custpubService + '/api/ocrmfcilatentapply/nopotnoforlist',
          // 行内客户表格参数
          fordataParams: { condition: JSON.stringify({ custStatus: '1', orgId: yufp.session.org.code, oneOrg: _this.oneOrg }) },
          // 非行内客户表格参数
          infordataParams: { condition: JSON.stringify({ custStatus: '2', orgId: yufp.session.org.code, oneOrg: _this.oneOrg }) },
          formdata: {},
          // 行内客户查询表单数据
          forqueryFormdata: {},
          // 非行内客户查询表单数据
          inforqueryFormdata: {},
          // 客户申请表数据
          claimformdata: {},
          // 勾选的表格数据
          selectCustData: [],
          // 客户认领申请数据
          claimAppliformdata: {},
          dialogVisible: false,
          // 客户认领申请
          claimdialogVisible: false,
          // 提交申请
          submitdialogVisible: false,
          // 非准入客户申请
          claimNoAdmitVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          // 折叠面板当前激活项
          activeName: '1',
          tabactiveName: 'first',
          // 机构层级信息
          orglev: '',
          oneOrg: '',
          // 审批流组件参数
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          // 认领申请面板——认领类型是否disable
          mainTypeR: false
        };
      },
      mounted: function () {
        var _this = this;
        _this.inforqueryFormdata.stutas = '2';
        _this.inforqueryFormdata.isFor = '0';
        _this.forqueryFormdata.stutas = '2';
        _this.forqueryFormdata.isFor = '0';
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
              var par = {userId: yufp.session.userId,
                orgCode: '500',
                needFin: false,
                needManage: false,
                needDpt: false,
                orgLevel: ''};
              _this.allTreeParams = { dataParams: {condition: JSON.stringify(par)} };
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
                _this.inforqueryFormdata.custType = '2';
              } else {
                _this.forqueryFormdata.custType = '1';
                _this.inforqueryFormdata.custType = '1';
              }
            }
          }
        });
      },
      methods: {
        /**
        * 点击tab页签
        */
        clickTabFn: function (tab) {
          // 点击tab时，清空表格中选择的用户
          // this.$refs.forrefTable.remoteData();
          // this.$refs.inforrefTable.remoteData();
        },
        /**
        * 行内客户查询——搜索按钮
        */
        searchFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.custforSearchForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // _this.forqueryFormdata.userId = yufp.session.userId;
          // _this.forqueryFormdata.orgCode = yufp.session.org.code;
          // var param1 = {custStatus: '1', orgId: yufp.session.org.code, oneOrg: _this.oneOrg};
          var model = {};
          yufp.clone(_this.forqueryFormdata, model);
          model.orgId = yufp.session.org.code;
          model.oneOrg = _this.oneOrg;
          var param = {
            condition: JSON.stringify(model)
          };
          // 潜在
          // if (_this.forqueryFormdata.custStatus == '1') {
          //   _this.fordataUrl = backend.custpubService + '/api/ocrmfcilatentapply/potforlist';
          // } else if (_this.forqueryFormdata.custStatus == '2') {
          //   // 非潜在
          //   _this.fordataUrl = backend.custpubService + '/api/ocrmfcilatentapply/nopotforlist';
          // }
          _this.$refs.forrefTable.remoteData(param);
        },
        /**
        * 行内客户查询——重置按钮
       */
        resetMainFn: function () {
          this.$refs.custforSearchForm.resetFields();
        },
        /**
        * 非行内客户查询——搜索按钮
        */
        inforsearchFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.custinforforSearchForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var idMsg;
          var param = {condition: JSON.stringify(this.inforqueryFormdata)};
          if (!this.inforqueryFormdata.custId) {
            if (!this.inforqueryFormdata.custName || !this.inforqueryFormdata.certType || !this.inforqueryFormdata.certNo) {
              idMsg = true;
            } else {
              idMsg = false;
            }
            if (idMsg) {
              this.$message({
                type: 'warning',
                message: '请通过客户号或客户名称、证件类型、证件号码查询'
              });
              return;
            }
          }
          var model = {};
          yufp.clone(_this.inforqueryFormdata, model);
          model.orgId = yufp.session.org.code;
          model.oneOrg = _this.oneOrg;
          var param = {
            condition: JSON.stringify(model)
          };
          _this.$refs.inforrefTable.remoteData(param);
        },
        /**
         * 非行内客户查询——重置按钮
         */
        inforresetMainFn: function () {
          this.$refs.custforSearchForm.resetFields();
        },
        /**
        * 选择客户后点击确定按钮
        */
        // confirmFn: function () {
        //   var _this = this;
        //   _this.mainTypeR = false;
        //   var selections;
        //   // 行内客户
        //   var forselections = this.$refs.forrefTable.selections;
        //   // 非行内客户
        //   var inforselections = this.$refs.inforrefTable.selections;
        //   if (forselections.length == 0 && inforselections.length == 0) {
        //     this.$message({
        //       type: 'warning',
        //       message: '请至少选择一条数据'
        //     });
        //     return;
        //   }
        //   if (forselections.length > 0) {
        //     selections = forselections;
        //   } else if (inforselections.length > 0) {
        //     selections = inforselections;
        //   }
        //   // 判断是否属于同一机构
        //   if (selections.length > 1) {
        //     // 遍历选择的数据，判断是否都归属于同一机构下，如果是，才可以打开认领面板
        //     var flagt = selections.every(function (item) {
        //       return item.belongBrch === selections[0].belongBrch;
        //     });
        //     if (!flagt) {
        //       _this.$message({
        //         message: '所选用户不属于同一机构，请重新选择',
        //         type: 'warning'
        //       });
        //       return;
        //     }
        //   }
        //   this.claimdialogVisible = true;
        //   this.$nextTick(function () {
        //     this.$refs.applirefForm.resetFields();
        //     if (selections[0].custStatus != 'Q2') {
        //       // 控制认领关系类型字段是否disabled
        //       _this.mainTypeR = true;
        //       // 设置“设置类型”，行内正式客户、行外正式客户设置类型只能为“主办”
        //       _this.claimAppliformdata.manType = '1';
        //     }
        //   });
        // },
        claimAdmit: function () {
          var _this = this;
          _this.mainTypeR = false;
          var selections;
          // 行内准入客户
          var selections = this.$refs.forrefTable.selections;
          // 非行内客户
          if (selections.length == 0) {
            this.$message({
              type: 'warning',
              message: '请至少选择一条数据'
            });
            return;
          }
          // 判断是否属于同一机构
          if (selections.length > 1) {
            // 遍历选择的数据，判断是否都归属于同一机构下，如果是，才可以打开认领面板
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
          this.claimdialogVisible = true;
          this.$nextTick(function () {
            this.$refs.applirefForm.resetFields();
            if (selections[0].custStatus != 'Q1') {
              // 控制认领关系类型字段是否disabled
              _this.mainTypeR = true;
              // 设置“设置类型”，行内正式客户、行外正式客户设置类型只能为“主办”
              _this.claimAppliformdata.manType = '1';
            }
          });
        },
        claimNoAdmit: function () {
          var _this = this;
          _this.mainTypeR = false;
          var selections;
          // 行内准入客户
          var selections = this.$refs.inforrefTable.selections;
          // 非行内客户
          if (selections.length != 1) {
            this.$message({
              type: 'warning',
              message: '请选择一条数据'
            });
            return;
          }
          // 判断是否属于同一机构
          if (selections.length > 1) {
            // 遍历选择的数据，判断是否都归属于同一机构下，如果是，才可以打开认领面板
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
          this.claimNoAdmitVisible = true;
          this.$nextTick(function () {
            this.$refs.applirefFormNoAdmit.resetFields();
            _this.claimAppliformdataNoAdmit.manType = '1';
          });
        },
        submitNoAdmit: function () {
          var _this = this;
          var model = {};
          var validate = false;
          _this.$refs.applirefFormNoAdmit.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var selections = _this.$refs.inforrefTable.selections[0];
          yufp.clone(selections, model);
          model.manType = '1';
          model.applyReason = _this.claimAppliformdataNoAdmit.applyReason;
          yufp.service.request({
            method: 'POST',
            url: backend.custpubService + '/api/ocrmfcilatentapply/addnoadmit',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.$refs.inforrefTable.tabledata = [];
                _this.$message('操作成功');
                _this.claimdialogVisible = false;
                _this.claimNoAdmitVisible = false;
              } else {
                _this.$message.error('操作失败');
              }
            }
          });
        },
        /**
         * 客户认领
         */
        // claimFn: function () {
        //   var _this = this;
        //   _this.dialogVisible = true;
        //   _this.$nextTick(function () {
        //     // 为行内客户查询表单设置一个默认值
        //     _this.forqueryFormdata.custStatus = '1';
        //     _this.fordataUrl = backend.custpubService + '/api/ocrmfcilatentapply/potforlist';
        //     // 为非行内客户查询表单设置一个默认值
        //     _this.inforqueryFormdata.custStatus = '2';
        //     _this.$refs.forrefTable.remoteData();
        //     _this.$refs.inforrefTable.remoteData();
        //     _this.mainTypeR = false;
        //   });
        // },
        /**
         * 准入客户认领
         */
        submitAdmit: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.claimAppliformdata, model);
          var validate = false;
          _this.$refs.applirefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var selections = _this.$refs.forrefTable.selections;
          // 存储客户ID、客户类型、原归属客户经理ID、原归属客户经理名称
          var custIdAry = [];
          var oldMgrIdAry = [];
          var custStatusAry = [];
          var oldMgrNameAry = [];
          var orgTypeAry = [];
          var mgrTypeAry = [];
          for (var i = 0, len = selections.length; i < len; i++) {
            custIdAry.push(selections[i].custId);
            oldMgrIdAry.push(selections[i].belongMgr);
            custStatusAry.push(selections[i].custStatus);
            oldMgrNameAry.push(selections[i].mgrName);
            orgTypeAry.push(selections[i].orgType);
            mgrTypeAry.push(selections[i].mgrType);
          }
          model.custId = custIdAry.join(',');
          model.custType = selections[0].custType;
          model.oldMgrId = oldMgrIdAry.join(',');
          model.custStatus = custStatusAry.join(',');
          model.oldMgrName = oldMgrNameAry.join(',');
          model.orgType = orgTypeAry.join(',');
          model.mgrType = mgrTypeAry.join(',');
          // 原归属机构ID
          model.oldOrgId = selections[0].belongBrch;
          // 原归属机构名称
          model.oldOrgName = selections[0].orgName;
          // 认领行内准入客户
          yufp.service.request({
            method: 'POST',
            url: backend.custpubService + '/api/ocrmfcilatentapply/addadmit',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.$refs.forrefTable.tabledata = [];
                _this.$message('操作成功');
                _this.claimdialogVisible = false;
                _this.dialogVisible = false;
              } else {
                _this.$message.error('操作失败');
              }
            }
          });
        },
        /**
         * 客户认领面板——提交按钮
         */
        // submitAppliFn: function () {
        //   var _this = this;
        //   var model = {};
        //   yufp.clone(_this.claimAppliformdata, model);
        //   var validate = false;
        //   _this.$refs.applirefForm.validate(function (valid) {
        //     validate = valid;
        //   });
        //   if (!validate) {
        //     return;
        //   }
        //   // 行内客户
        //   var forselections = _this.$refs.forrefTable.selections;
        //   // 非行内客户
        //   var inforselections = _this.$refs.inforrefTable.selections;
        //   var selections;
        //   // 存储客户ID、客户类型、原归属客户经理ID、原归属客户经理名称
        //   var custIdAry = [];
        //   var custTypeAry = [];
        //   var oldMgrIdAry = [];
        //   var oldMgrNameAry = [];
        //   var orgTypeAry = [];
        //   var mgrTypeAry = [];
        //   if (forselections.length > 0) {
        //     selections = forselections;
        //   } else if (inforselections.length > 0) {
        //     selections = inforselections;
        //   }
        //   for (var i = 0, len = selections.length; i < len; i++) {
        //     custIdAry.push(selections[i].custId);
        //     custTypeAry.push(selections[i].custType);
        //     oldMgrIdAry.push(selections[i].belongMgr);
        //     oldMgrNameAry.push(selections[i].mgrName);
        //     orgTypeAry.push(selections[i].orgType);
        //     mgrTypeAry.push(selections[i].mgrType);
        //   }
        //   model.custId = custIdAry.join(',');
        //   model.custType = custTypeAry.join(',');
        //   model.oldMgrId = oldMgrIdAry.join(',');
        //   model.oldMgrName = oldMgrNameAry.join(',');
        //   model.orgType = orgTypeAry.join(',');
        //   model.mgrType = mgrTypeAry.join(',');
        //   // 原归属机构ID
        //   model.oldOrgId = selections[0].belongBrch;
        //   // 原归属机构名称
        //   model.oldOrgName = selections[0].orgName;
        //   if (forselections.length > 0) {
        //     // 认领行内客户
        //     yufp.service.request({
        //       method: 'POST',
        //       url: backend.custpubService + '/api/ocrmfcilatentapply/addfor',
        //       data: model,
        //       callback: function (code, message, response) {
        //         if (code == 0 && response.code === 0) {
        //           _this.$refs.forrefTable.tabledata = [];
        //           _this.$message('操作成功');
        //           _this.claimdialogVisible = false;
        //           _this.dialogVisible = false;
        //           // 通过层级判断走哪个审批流
        //           var commintData = {};
        //           // 模型版本申请类型字典项
        //           // 判断得到机构层级
        //           if (selections[0].belongBrch === _this.oneOrg) {
        //             _this.orglev = 1;
        //           } else {
        //             _this.orglev = 2;
        //           }
        //           if (_this.orglev == 1) {
        //             commintData.applType = 'RLKHSP';
        //             commintData.paramMap = {
        //               orgLevel: '2'
        //             };
        //           } else if (_this.orglev == 2) {
        //             commintData.applType = 'RLKHSP';
        //             commintData.paramMap = {
        //               orgLevel: '3'
        //             };
        //           } else {
        //             _this.$message({
        //               type: 'warning',
        //               message: '未获得机构层级，无法执行工作流'
        //             });
        //             return;
        //           }
        //           _this.bizSeqNo = response.data.uuid;
        //           // 流程主键
        //           commintData.bizSeqNo = response.data.uuid;
        //           commintData.custId = yufp.session.userId;
        //           commintData.custName = yufp.session.userName;
        //           var load = _this.$loading();
        //           _this.$refs.approvalRef.wfInit(commintData, load);
        //         } else {
        //           _this.$message.error('操作失败');
        //         }
        //       }
        //     });
        //   } else {
        //     // 认领非行内客户，不用传客户经理信息
        //     // delete model.oldMgrId;
        //     // delete model.oldMgrName;
        //     yufp.service.request({
        //       method: 'POST',
        //       url: backend.custpubService + '/api/ocrmfcilatentapply/addnofor',
        //       data: model,
        //       callback: function (code, message, response) {
        //         if (code == 0 && response.code === 0) {
        //           _this.$refs.inforrefTable.tabledata = [];
        //           _this.$message('操作成功');
        //           _this.claimdialogVisible = false;
        //           _this.dialogVisible = false;
        //           // 通过层级判断走哪个审批流
        //           var commintData = {};
        //           // 模型版本申请类型字典项
        //           // 总行客户认领不需要判断层级
        //           commintData.applType = 'RLKHSP';
        //           commintData.paramMap = {
        //             orgLevel: '1'
        //           };
        //           _this.bizSeqNo = response.data.uuid;
        //           // 流程主键
        //           commintData.bizSeqNo = response.data.uuid;
        //           commintData.custId = yufp.session.userId;
        //           commintData.custName = yufp.session.userName;
        //           var load = _this.$loading();
        //           _this.$refs.approvalRef.wfInit(commintData, load);
        //         } else {
        //           _this.$message.error('操作失败');
        //         }
        //       }
        //     });
        //   }
        // },
        /**
         * show提交面板
         */
        showSubmitPanelFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refDealTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.submitdialogVisible = true;
        },
        /**
         * 查看客户申请认领信息详情
         */
        detailFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refDealTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.claimdialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], this.claimformdata);
          });
        },
        /**
        * 审批流程完成后调用
        */
        onAfterCloseFn: function () {
          var _this = this;
          // this.bizSeqNo
          var param = { condition: JSON.stringify({applyId: this.bizSeqNo}) };
          yufp.service.request({
            method: 'POST',
            url: backend.custpubService + '/api/ocrmfcilatentapply/claimapproval',
            data: param,
            callback: function (code, message, response) {
              _this.$message('操作成功');
            }
          });
        }
      }
    });
  };
});