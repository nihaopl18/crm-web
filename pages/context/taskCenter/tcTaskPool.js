/**
 * @created by yangye on 2018/11/12.
 * @description 普通查询模板
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/YufpDutyUserSelector.js',
  './custom/widgets/js/YufpWfInit.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('TASK_TYPE,TASK_STATE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          /** 查询字段 */
          queryFields: [
            { placeholder: '任务名称', field: 'taskName', type: 'input' },
            { placeholder: '任务类型', field: 'taskType', type: 'select', dataCode: 'TASK_TYPE' },
            { placeholder: '任务状态', field: 'taskState', type: 'select', dataCode: 'TASK_STATE' },
            { placeholder: '产品名称', field: 'productName', type: 'input' },
            // { placeholder: '机构名称', field: 'orgName', type: 'input' },
            { placeholder: '机构名称', field: 'orgName', type: 'custom', is: 'yufp-org-tree', params: { instuValue: yufp.session.instu.code } },
            // { placeholder: '经理名称', field: 'mgrtName', type: 'input' },
            { placeholder: '客户经理', field: 'belongMgr', type: 'custom', is: 'yufp-mgr-selector' }
            // { label: '适用机构', field: 'activityOrg', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'custom', is: 'yufp-instuorg-tree', params: { instuValue: yufp.session.instu.code } },

          ],
          /** 搜索按钮 */
          queryButtons: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var a = yufp.session.user.loginCode;
                  model.admin = a;
                  var param = { condition: JSON.stringify(model) };
                  _self.$refs.reftable.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          stsFields: [{
            columnCount: 2,
            fields: [
              // {label: '任务编号:', field: 'taskId'},
              { label: '活动名称', field: 'activityName', resizable: true },
              { label: '任务名称', field: 'taskName', resizable: true },
              { label: '任务类型', field: 'taskType', dataCode: 'TASK_TYPE', type: 'select', readonly: true },
              { label: '产品名称', field: 'productName', resizable: true },
              { label: '任务状态', field: 'taskState', dataCode: 'TASK_STATE', type: 'select', readonly: true },
              { label: '客户名称', field: 'custName', resizable: true },
              { label: '所属经理', field: 'mgrName', resizable: true },
              { label: '所属机构', field: 'orgName', resizable: true },
              // { label: '机构代码', field: 'belongOrg', resizable: true },
              { label: '开始时间', field: 'startTime', resizable: true },
              { label: '结束时间', field: 'endTime', resizable: true }
            ]
          }],
          /** 表格栏位 */
          tableColumns: [
            // {label: '任务编号:', prop: 'taskId', width: '280',  resizable: true},
            { label: '活动名称', prop: 'activityName', width: '220', resizable: true },
            { label: '任务名称', prop: 'taskName', width: '280', resizable: true },
            { label: '客户名称', prop: 'custName', width: '180', resizable: true },
            { label: '所属经理', prop: 'mgrName', width: '180', resizable: true },
            { label: '所属机构', prop: 'orgName', width: '180', resizable: true },
            // { label: '机构代码', prop: 'belongOrg', width: '180', resizable: true },
            { label: '任务类型', prop: 'taskType', width: '150', resizable: true, dataCode: 'TASK_TYPE' },
            { label: '产品名称', prop: 'productName', width: '180', resizable: true },
            { label: '任务状态', prop: 'taskState', width: '180', resizable: true, dataCode: 'TASK_STATE' },
            { label: '开始时间', prop: 'startTime', width: '190', resizable: true },
            { label: '结束时间', prop: 'endTime', width: '190', resizable: true }
          ],
          /** 分配按钮 */
          allotFields: [{
            columnCount: 2,
            fields: [
              {
                label: '客户经理', field: 'dutyUser', type: 'custom', is: 'yufp-dutyUser-selector'
              }
            ]
          }],
          /* 任务详情按钮 */
          stsButtons: [
            {
              label: '返回',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisibleSts = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
              }
            }
          ],
          /* 分配保存按钮*/
          allotButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.distribution = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.refform2.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                if (model.dutyUser == '') {
                  _self.$message({ message: '请选择一个客户经理', type: 'warning' });
                } else {
                  var uploadSelect = _self.$refs.reftable.selections[0];
                  model.taskId = uploadSelect.taskId;
                  model.taskState = 'IMPLEMENTING';
                  var nickModel = {};
                  nickModel.taskId = uploadSelect.taskId;
                  nickModel.executeUser = model.dutyUser;
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cimftctaskpool/allotTask',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0) {
                        yufp.service.request({
                          method: 'POST',
                          url: backend.adminService + '/api/cimftcmytask/insertMyTask',
                          data: model,
                          callback: function (code, message, response) {
                            if (code == 0) {
                              if (uploadSelect.taskType == 'BO') {
                                yufp.service.request({
                                  method: 'POST',
                                  data: nickModel,
                                  url: backend.adminService + '/api/cimftcmytask/updateAllotNickUser',
                                  callback: function (code, message, response) {
                                    if (code == 0) {
                                      _self.$refs.reftable.remoteData();
                                      _self.$message({ message: '申领成功', type: 'warning' });
                                    }
                                  }
                                });
                              } else {
                                _self.$refs.reftable.remoteData();
                                _self.$message({ message: '申领成功', type: 'warning' });
                              }
                            }
                          }
                        });
                        _self.distribution = false;
                      }
                    }
                  });
                }
              }
            }
          ],
          tableUrl: backend.adminService + "/api/cimftctaskpool/taskpoollist",
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          dialogVisibleSts: false,
          viewType: 'DETAIL',
          claim: false,
          distribution: false,
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        };
      },
      mounted: function () {
        var a = yufp.session.user.loginCode;
        var model = { taskName: '', taskType: '', admin: a };
        var param = { condition: JSON.stringify(model) };
        this.$refs.reftable.remoteData(param);
      },
      methods: {

        demoMethod: function () {

        },
        /**
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          this.viewType = viewType;
          this.dialogVisible = false;
          this.formDisabled = !editable;
        },
        /** 详情方法 */
        infoFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请选择一条需要查看的任务', type: 'warning' });
            return;
          }
          this.dialogVisibleSts = true;
          this.switchStatus('DETAIL', false);
          this.stsButtons[1].hidden = true;
          this.$nextTick(function () {
            yufp.extend(this.$refs.refformSts.formModel, this.$refs.reftable.selections[0]);
          });
        },
        /** 分配方法 */
        distributionFn: function () {
          var _self = this;
          // if (response.data.length != 0) {
          if (_self.$refs.reftable.selections.length != 1) {
            _self.$message({ message: '请选择一条需要分配的任务', type: 'warning' });
            return;
          }
          var model = _self.$refs.reftable.selections[0];
          if (model.taskState == 'UNASSIGNED') {
            _self.distribution = true;
            _self.$nextTick(function () {
              _self.$refs.refform2.resetFn();
            });
          } else {
            _self.$message({ message: '只能分配状态为未分配的任务', type: 'warning' });
          }
          // var param = {
          //   condition: JSON.stringify({
          //     sessionLoginCode: yufp.session.user.loginCode
          //   })
          // };
          // yufp.service.request({
          //   method: 'GET',
          //   url: backend.adminService + '/api/cimftctaskpool/getAllotRoleCode',
          //   data: param,
          //   callback: function (code, message, response) {
          //     if (code == 0) {
          //       if (response.data.length != 0) {
          //         if (_self.$refs.reftable.selections.length != 1) {
          //           _self.$message({ message: '请选择一条需要分配的任务', type: 'warning' });
          //           return;
          //         }
          //         var model = _self.$refs.reftable.selections[0];
          //         if (model.taskState == 'UNASSIGNED') {
          //           _self.distribution = true;
          //           _self.$nextTick(function () {
          //             _self.$refs.refform2.resetFn();
          //           });
          //         } else {
          //           _self.$message({ message: '只能分配状态为未分配的任务', type: 'warning' });
          //         }
          //       } else {
          //         _self.$message({ message: '只有管理人员才能分配任务', type: 'warning' });
          //       }
          //     }
          //   }
          // });
          // }   
        },
        /** 申领方法 */
        applyFn: function () {
          var _self = this;
          var param = {
            condition: JSON.stringify({
              sessionLoginCode: yufp.session.user.loginCode
            })
          };
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cimftctaskpool/getApplyRoleCode',
            data: param,
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.data.length != 0) {
                  var model = _self.$refs.reftable.selections[0];
                  var commitData = {};
                  commitData.bizSeqNo = model.taskId; // 流程主键
                  commitData.applType = 'TASKAPPLY'; // 标签流程审批数据字典项

                  commitData.dutyUser = yufp.session.user.loginCode;
                  commitData.exv10 = '0';
                  commitData.custName = yufp.session.user.loginCode;
                  commitData.custId = model.taskId;
                  commitData.jobName = model.taskName;
                  commitData.paramMap = {
                    bussOpId: model.taskId,
                    bussOpName: model.taskName
                  };
                  var load = _self.$loading();
                  _self.$refs.yufpWfInit.wfInit(commitData, load);
                } else {
                  _self.$message({ message: '只有客户经理才能申领任务', type: 'warning' });
                }
              }
            }
          });
        },
        // 申领页面关闭后
        onAfterClose: function () {
        },
        // 申领页面关闭前
        onAfterInit: function (data) {
          var _self = this;
          var uploadModel = {};
          var upModel = {};
          var tpModel = {};
          var nkModel = {};
          var taskIds = '';
          var nickTaskId = '';
          var selections = _self.$refs.reftable.selections;
          var len = selections.length;
          var uploadSelect = _self.$refs.reftable.selections[0];
          for (var i = 0; i < len; i++) {
            taskIds = selections[i].taskId + ',' + taskIds;
            if (selections[i].taskType == 'BO') {
              nickTaskId = selections[i].taskId + ',' + nickTaskId;
            }
          }
          uploadModel.taskId = taskIds;
          uploadModel.taskState = 'APPLYING';
          upModel.dutyUser = yufp.session.user.loginCode;
          upModel.taskId = taskIds;
          tpModel.taskId = taskIds;
          nkModel.taskId = nickTaskId;
          tpModel.bizSeqNo = uploadSelect.taskId;
          yufp.service.request({
            method: 'POST',
            data: tpModel,
            url: backend.adminService + '/api/cimftctaskpool/insertTP', // 多条申领，将流程ID与任务ID存到中间表中
            callback: function (code, message, response) {
              if (code == 0) {
                yufp.service.request({
                  method: 'POST',
                  data: uploadModel,
                  url: backend.adminService + '/api/cimftctaskpool/updateTaskState',
                  callback: function (code, message, response) {
                    if (code == 0) {
                      yufp.service.request({
                        method: 'POST',
                        data: upModel,
                        url: backend.adminService + '/api/cimftcmytask/applyMyTaskState',
                        callback: function (code, message, response) {
                          if (code == 0) {
                            if (nickTaskId != '') {
                              yufp.service.request({
                                method: 'POST',
                                data: nkModel,
                                url: backend.adminService + '/api/cimftcmytask/updateNickUser',
                                callback: function (code, message, response) {
                                  if (code == 0) {
                                    _self.$refs.reftable.remoteData();
                                    _self.$message({ message: '申领成功', type: 'warning' });
                                  }
                                }
                              });
                            } else {
                              _self.$refs.reftable.remoteData();
                              _self.$message({ message: '申领成功', type: 'warning' });
                            }
                          }
                        }
                      });
                    } else {
                      _self.$message({ message: '申领失败', type: 'warning' });
                    }
                  }
                });
              } else {
                _self.$message({ message: '申领失败', type: 'warning' });
              }
            }
          });
        },
        testMethod: function () {
          console.log("-00000000000000000000000000000000000");
        }
      },
      // create: {
      //   testMethod()
      // },


    });
  };
});