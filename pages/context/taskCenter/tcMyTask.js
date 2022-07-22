/**
 * @created by yangye on 2018/11/12.
 * @description 普通查询模板
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './libs/js-xlsx/xlsx.full.min.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    //yufp.session.user.loginCode  取当前用户名
    yufp.lookup.reg('TASK_TYPE,MY_STATE,EXECUTION,NICHE_STATE,NICHE_STAGE,NICHE_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          options1: [
            { 'key': 'y', 'value': '成功' },
            { 'key': 'n', 'value': '失败' }
          ],
          /** 查询字段 */
          queryFields: [
            { placeholder: '任务名称', field: 'taskName', type: 'input' },
            { placeholder: '任务类型', field: 'taskType', type: 'select', dataCode: 'TASK_TYPE' },
            { placeholder: '产品名称', field: 'productName', type: 'input' },
            { placeholder: '任务状态', field: 'taskState', type: 'select', dataCode: 'MY_STATE' }
          ],
          /** 搜索按钮 */
          queryButtons: [
            {
              label: '搜索', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                if (valid) {
                  var a = yufp.session.user.loginCode;
                  model.admin = a;
                  var param = {
                    condition: JSON.stringify(model)
                  };
                  _self.$refs.reftable.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],

          stsFields: [{
            columnCount: 2,
            fields: [
              //{label: '任务编号:', field: 'taskId'},
              { label: '活动名称', field: 'activityName', resizable: true },
              { label: '任务名称', field: 'taskName' },
              //{ label: '任务内容:', field: 'taskContent' },
              { label: '任务类型', field: 'taskType', dataCode: 'TASK_TYPE', type: 'select' },
              { label: '任务状态', field: 'taskState', dataCode: 'MY_STATE', type: 'select' },
              { label: '客户名称', field: 'custName', resizable: true },
              { label: '所属经理', field: 'mgrName', resizable: true },
              { label: '所属机构', field: 'orgName', resizable: true },
              // { label: '机构代码', field: 'belongOrg', resizable: true },
              { label: '分配时间', field: 'allotTime' },
              { label: '开始时间', field: 'startTime' },
              { label: '结束时间', field: 'endTime' },
              { label: '责任人', field: 'dutyUser' }
            ]
          }],
          //风险反馈内容
          riskFields: [{
            fields: [
              {
                label: '反馈内容', field: 'feedbackContent', type: 'input', placeholder: "200个字符以内", rules: [
                  { required: true, message: '必填项', trigger: 'blur' }, { max: 200, message: '反馈内容不超过200个字符', trigger: 'blur' }]
              },
              {
                label: '完成状态', field: 'execution', type: 'select', dataCode: 'EXECUTION',
                change: function () {
                  var a = _self.$refs.refformRiskFeedback.formModel;
                  a.feedbackTime = yufp.util.dateFormat(new Date());
                },
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }]
              },
              { label: '反馈时间', field: 'feedbackTime', readonly: true }
            ]
          }],
          //关怀反馈内容
          careFields: [{
            fields: [
              {
                label: '反馈内容', field: 'feedbackContent', type: 'input', placeholder: "200个字符以内", rules: [
                  { required: true, message: '必填项', trigger: 'blur' }]
              },
              {
                label: '完成状态', field: 'execution', type: 'select', dataCode: 'EXECUTION',
                change: function () {
                  var a = _self.$refs.refformCareFeedback.formModel;
                  a.feedbackTime = yufp.util.dateFormat(new Date());
                },
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }]
              },
              { label: '反馈时间', field: 'feedbackTime', readonly: true }
            ]
          }],
          nicheFields: [{
            columnCount: 4,
            fields: [
              { label: '商机名称', field: 'nicheName', type: 'input', disabled: true },
              { label: '商机状态', field: 'nicheState', type: 'select', disabled: true, dataCode: 'NICHE_STATE' },
              { label: '商机阶段', field: 'nicheStage', type: 'select', disabled: true, dataCode: 'NICHE_STAGE' },
              { label: '商机类型', field: 'nicheType', type: 'select', disabled: true, dataCode: 'NICHE_TYPE' },
              { label: '商机开始日期', field: 'nicheStartDt', type: 'input', disabled: true },
              { label: '商机完成日期', field: 'nicheEndDt', type: 'input', disabled: true },
              { label: '商机有效期', field: 'nicheEffectiveDt', type: 'input', disabled: true },
              { label: '商机内容', field: 'nicheContent', type: 'input', disabled: true },
              { label: '客户名称', field: 'customerName', type: 'input', disabled: true },
              { label: '客户联系人', field: 'customercontacts', type: 'input', disabled: true },
              { label: '预计金额', field: 'estimatedAmount', type: 'input', disabled: true },
              { label: '费用预算', field: 'costBudget', type: 'input', disabled: true },
              { label: '商机生成时间', field: 'nicheRiseDt', type: 'input', disabled: true },
              { label: '最新更新人', field: 'lastupdateuser', type: 'input', disabled: true },
              { label: '最新更新时间', field: 'lastUpdateDt', type: 'input', disabled: true },
              { label: '执行人', field: 'executeuser', type: 'input', disabled: true },
              { label: '执行机构', field: 'executeagency', type: 'input', disabled: true },
            ]
          }],

          tableData1: [
            { nicheStage: '了解商机' },
            { nicheStage: '确认商机' },
            { nicheStage: '方案论证' },
            { nicheStage: '商务谈判' },
            { nicheStage: '商机成交' }
          ],
          /** 表格栏位 */
          tableColumns: [
            //{label: '任务编号:', prop: 'taskId', width: '200',  resizable: true},
            // { label: '任务名称:', prop: 'taskName', resizable: true },
            // { label: '任务类型:', prop: 'taskType', resizable: true, dataCode: 'TASK_TYPE' },
            // { label: '任务状态:', prop: 'taskState', resizable: true, dataCode: 'MY_STATE' },
            // { label: '分配时间:', prop: 'allotTime', width: '120', resizable: true },
            // { label: '开始时间:', prop: 'startTime', resizable: true },
            // { label: '结束时间:', prop: 'endTime', resizable: true },
            // { label: '分配人:', prop: 'allotuser', width: '115', resizable: true },
            // { label: '责任人:', prop: 'dutyuser', width: '115', resizable: true }
            { label: '活动名称', prop: 'activityName', width: '200', resizable: true },
            { label: '任务名称', prop: 'taskName', width: '200', resizable: true },
            //{ label: '任务内容:', prop: 'taskContent', resizable: true },
            { label: '任务类型', prop: 'taskType', dataCode: 'TASK_TYPE', resizable: true },
            { label: '产品名称', prop: 'productName', resizable: true },
            { label: '任务状态', prop: 'taskState', dataCode: 'MY_STATE', resizable: true },
            { label: '客户名称', prop: 'custName', resizable: true, resizable: true },
            { label: '所属经理', prop: 'mgrName', resizable: true, resizable: true },
            { label: '所属机构', prop: 'orgName', resizable: true, resizable: true },
            // { label: '机构代码', prop: 'belongOrg', resizable: true, resizable: true },
            { label: '分配时间', prop: 'allotTime', resizable: true },
            { label: '开始时间', prop: 'startTime', resizable: true },
            { label: '结束时间', prop: 'endTime', resizable: true },
            { label: '责任人', prop: 'dutyUser', resizable: true }
          ],
          /*任务详情返回按钮*/
          stsButtons: [
            {
              label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                _self.dialogVisibleSts = false;
              }
            },
            {
              label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
              }
            }
          ],
          /*商机任务反馈保存按钮*/
          feedbackButtons: [
            {
              label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                var array = [];
                array[0] = { nicheStage: "了解商机" };
                array[1] = { nicheStage: "确认商机" };
                array[2] = { nicheStage: "方案论证" };
                array[3] = { nicheStage: "商务谈判" };
                array[4] = { nicheStage: "商机成交" };

                // array[0] ={nicheStage:"了解商机",yesNo:'',situation:'',feedbackTime:''};
                // array[1] ={nicheStage:"确认商机",yesNo:'',situation:'',feedbackTime:''};
                // array[2] ={nicheStage:"方案论证",yesNo:'',situation:'',feedbackTime:''};
                // array[3] ={nicheStage:"商务谈判",yesNo:'',situation:'',feedbackTime:''};
                // array[4] ={nicheStage:"商机成交",yesNo:'',situation:'',feedbackTime:''};
                _self.$refs.nicheback.tabledata = array;
                _self.dialogVisibleNicheback = false;
              }
            },
            {
              label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                var validate = false;
                _self.$refs.refformNicheback.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var b = _self.$refs.nicheback.tabledata[0];
                var c = _self.$refs.nicheback.tabledata[1];
                var d = _self.$refs.nicheback.tabledata[2];
                var e = _self.$refs.nicheback.tabledata[3];
                var f = _self.$refs.nicheback.tabledata[4];
                var uploadSelect = _self.$refs.reftable.selections[0];
                var nicheStage = b.nicheStage + ',' + c.nicheStage + ',' + d.nicheStage + ',' + e.nicheStage + ',' + f.nicheStage + ',';
                var yesNo = b.yesNo + ',' + c.yesNo + ',' + d.yesNo + ',' + e.yesNo + ',' + f.yesNo + ',';
                var situation = b.situation + ',' + c.situation + ',' + d.situation + ',' + e.situation + ',' + f.situation + ',';
                var feedbackTime = b.feedbackTime + ',' + c.feedbackTime + ',' + d.feedbackTime + ',' + e.feedbackTime + ',' + f.feedbackTime + ',';
                var mo = {};
                var backModel = {};
                if (b.yesNo == "" || b.situation == "" || c.yesNo == "" || c.situation == "" || d.yesNo == "" || d.situation == ""
                  || e.yesNo == "" || e.situation == "" || f.yesNo == "" || f.situation == "" || b.yesNo == null || b.situation == null
                  || c.yesNo == null || c.situation == null || d.yesNo == null || d.situation == null
                  || e.yesNo == null || e.situation == null || f.yesNo == null || f.situation == null) {
                  _self.$message({ message: '请填写完整', type: 'warning' });
                }
                else {
                  mo.taskId = uploadSelect.taskId;
                  mo.nicheStage = nicheStage;
                  mo.yesNo = yesNo;
                  mo.situation = situation;
                  mo.feedbackTime = feedbackTime;
                  var uploadModel = {};
                  uploadModel.taskId = uploadSelect.taskId;
                  if (b.yesNo == 'n' || c.yesNo == 'n' || d.yesNo == 'n' || e.yesNo == 'n' || f.yesNo == 'n') {
                    uploadModel.taskState = 'FAILEND';
                  }
                  else {
                    uploadModel.taskState = 'SUCCESSEND';
                  }
                  if (uploadModel.taskState == 'FAILEND') {
                    backModel.touchState = 'UNTOUCHED';
                    backModel.executeResult = 'FAILEND';
                    backModel.taskId = uploadSelect.taskId;
                  } else if (uploadModel.taskState == 'SUCCESSEND') {
                    backModel.touchState = 'TOUCHED';
                    backModel.executeResult = 'SUCCESSEND';
                    backModel.taskId = uploadSelect.taskId;
                  }
                  yufp.service.request({
                    method: 'POST',
                    data: mo,
                    url: backend.adminService + '/api/cimftcmytask/nicheback',//商机内容修改
                    callback: function (code, message, response) {
                      if (code == 0) {
                        yufp.service.request({
                          method: 'POST',
                          data: uploadModel,
                          url: backend.adminService + '/api/cimftctaskpool/updateTaskState',//任务状态修改
                          callback: function (code, message, response) {
                            if (code == 0) {
                              _self.$refs.reftable.remoteData();
                              _self.$message({ message: '反馈成功', type: 'warning' });
                              // yufp.service.request({
                              //   method: 'POST',
                              //   data: backModel,
                              //   url: backend.adminService + '/api/cimftcmytask/nicheMarket',//营销反馈修改
                              //   callback: function (code, message, response) {
                              //     if (code == 0) {
                              //       _self.$refs.reftable.remoteData();
                              //       _self.$message({ message: '反馈成功', type: 'warning' });
                              //     }
                              //   }
                              // })
                              // yufp.service.request({
                              //   method: 'POST',
                              //   data: backModel,
                              //   url: backend.adminService + '/api/cimftcmytask/marketback',//营销反馈修改
                              //   callback: function (code, message, response) {
                              //     if (code == 0) {
                              //       _self.$refs.reftable.remoteData();
                              //       _self.$message({ message: '反馈成功', type: 'warning' });
                              //     }
                              //   }
                              // })
                            }
                          }
                        });
                      }
                      else {
                        _self.$message({ message: '反馈失败', type: 'warning' });
                      }
                      // _self.$refs.nicheback.tabledata = [];
                      var array = [];
                      //_self.$refs.refformNicheFeedback.resetFields();
                      array[0] = { nicheStage: "了解商机" };
                      array[1] = { nicheStage: "确认商机" };
                      array[2] = { nicheStage: "方案论证" };
                      array[3] = { nicheStage: "商务谈判" };
                      array[4] = { nicheStage: "商机成交" };
                      _self.$refs.nicheback.tabledata = array;
                    }
                  });
                  _self.dialogVisibleNicheback = false;
                }
              }
            }
          ],
          /*风险任务反馈保存按钮*/
          riskbackButtons: [
            {
              label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                _self.dialogVisibleRiskback = false;
              }
            },
            {
              label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                var validate = false;
                _self.$refs.refformRiskFeedback.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var uploadSelect = _self.$refs.reftable.selections[0];
                var backModel = {};
                var model1 = model;
                model1.taskId = uploadSelect.taskId;
                model1.taskState = model.execution;
                model1.customerId = uploadSelect.custId;
                model1.executeUser = uploadSelect.dutyUser;
                model1.riskContent = uploadSelect.taskContent;
                if (model1.taskState == 'FAILEND') {
                  backModel.touchState = 'UNTOUCHED';
                  backModel.executeResult = 'FAILEND';
                  backModel.taskId = uploadSelect.taskId;
                } else if (model1.taskState == 'SUCCESSEND') {
                  backModel.touchState = 'TOUCHED';
                  backModel.executeResult = 'SUCCESSEND';
                  backModel.taskId = uploadSelect.taskId;
                }
                backModel.custId = uploadSelect.custId;
                backModel.executeUser = uploadSelect.dutyUser;
                backModel.marketId = uploadSelect.taskId;
                yufp.service.request({
                  method: 'POST',
                  data: model1,
                  async: false,
                  url: backend.adminService + '/api/cimftcmytask/riskBack',
                  callback: function (code, message, response) {
                    if (code == 0) {
                      yufp.service.request({
                        method: 'POST',
                        data: model1,
                        async: false,
                        url: backend.adminService + '/api/cimftctaskpool/updateState',
                        callback: function (code, message, response) {
                          if (code == 0) {
                            _self.$refs.reftable.remoteData();
                            _self.$message({ message: '反馈成功', type: 'warning' });
                            // yufp.service.request({
                            //   method: 'POST',
                            //   data: backModel,
                            //   url: backend.adminService + '/api/cimftcmytask/nicheMarket',//营销反馈修改
                            //   callback: function (code, message, response) {
                            //     if (code == 0) {
                            //       _self.$refs.reftable.remoteData();
                            //       _self.$message({ message: '反馈成功', type: 'warning' });
                            //     }
                            //   }
                            // })

                            // yufp.service.request({
                            //   method: 'POST',
                            //   data: backModel,
                            //   url: backend.adminService + '/api/cimftcmytask/marketback',//营销反馈修改
                            //   callback: function (code, message, response) {
                            //     if (code == 0) {
                            //       _self.$refs.reftable.remoteData();
                            //       _self.$message({ message: '反馈成功', type: 'warning' });
                            //     }
                            //   }
                            // })
                          }
                        }
                      });

                    }
                    else {
                      _self.$message({ message: '反馈失败', type: 'warning' });
                    }
                  }
                });
                _self.dialogVisibleRiskback = false;
              }
            }
          ],
          /*关怀任务反馈保存按钮*/
          carebackButtons: [
            {
              label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                _self.dialogVisibleCareback = false;
              }
            },
            {
              label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                var validate = false;
                _self.$refs.refformCareFeedback.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var uploadSelect = _self.$refs.reftable.selections[0];
                var backModel = {};
                model.taskId = uploadSelect.taskId;
                model.taskState = model.execution;
                model.customerId = uploadSelect.custId;
                model.executeUser = uploadSelect.dutyUser;
                model.careContent = uploadSelect.taskContent;
                if (model.taskState == 'FAILEND') {
                  backModel.touchState = 'UNTOUCHED';
                  backModel.executeResult = 'FAILEND';
                  backModel.taskId = uploadSelect.taskId;
                } else if (model.taskState == 'SUCCESSEND') {
                  backModel.touchState = 'TOUCHED';
                  backModel.executeResult = 'SUCCESSEND';
                  backModel.taskId = uploadSelect.taskId;
                }
                yufp.service.request({
                  method: 'POST',
                  data: model,
                  async: true,
                  // url: backend.adminService + '/api/cimftcmytask/careBackUpdate',
                  url: backend.adminService + '/api/cimftcmytask/careBack',
                  callback: function (code, message, response) {
                    // if (response.code == 0) {
                    //   yufp.service.request({
                    //     method: 'POST',
                    //     data: model,
                    //     url: backend.adminService + '/api/cimftctaskpool/updateState',
                    //     callback: function (code, message, response) {
                    //       if (code == 0) {
                    //         _self.$refs.reftable.remoteData();
                    //         _self.$message({ message: '反馈成功', type: 'warning' });   
                    //       }
                    //     }
                    //   });
                    // }
                    if (code == 0) {
                      yufp.service.request({
                        method: 'POST',
                        data: model,
                        //async: true,
                        url: backend.adminService + '/api/cimftctaskpool/updateState',
                        callback: function (code, message, response) {
                          if (code == 0) {
                            _self.$refs.reftable.remoteData();
                            _self.$message({ message: '反馈成功', type: 'warning' });
                            // yufp.service.request({
                            //   method: 'POST',
                            //   data: backModel,
                            //   url: backend.adminService + '/api/cimftcmytask/nicheMarket',//营销反馈修改
                            //   callback: function (code, message, response) {
                            //     if (code == 0) {
                            //       _self.$refs.reftable.remoteData();
                            //       _self.$message({ message: '反馈成功', type: 'warning' });
                            //     }
                            //   }
                            // })
                          }
                        }
                      });

                    }
                    else {
                      _self.$message({ message: '反馈失败', type: 'warning' });
                    }
                  }
                });
                _self.dialogVisibleCareback = false;
              }
            }
          ],
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          feedBack: '任务反馈',
          nicheInfo: '商机信息',
          expandCollapseName: ['base'],
          dialogVisibleSts: false,
          nicheFrom: {},
          dialogVisibleCareback: false,
          dialogVisibleRiskback: false,
          dialogVisibleNicheback: false,
          viewType: 'DETAIL',
          buttonShow: 'show',
          claim: false,
          distribution: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        }
      },
      mounted: function () {
        var a = yufp.session.user.loginCode;
        var model = { taskName: '', taskType: '', taskState: '', admin: a };
        var param = { condition: JSON.stringify(model) };
        this.$refs.reftable.remoteData(param);
      },
      methods: {
        demoMethod: function () {
        },
        cellClick: function () {
          var a = this.$refs.nicheback.selections[0];
          a.feedbackTime = yufp.util.dateFormat(new Date());
        },
        select: function (row) {
          this.$refs.nicheback.selections[0].feedbackTime = yufp.util.dateFormat(new Date())
        },
        data: function () {
          return {
            radio: '1'
          };
        },
        /**
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          this.viewType = viewType;
          this.dialogVisible = true;
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
        /** 任务反馈方法 */
        taskBackFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请选择一条需要反馈的任务', type: 'warning' });
            return;
          }
          var _self = this;
          var model = this.$refs.reftable.selections[0];

          if (model.taskState == 'IMPLEMENTING') {
            if (model.taskType == 'RISK') {
              this.dialogVisibleRiskback = true;
              _self.$nextTick(function () {
                _self.$refs.refformRiskFeedback.resetFields();
              });
            }
            else if (model.taskType == 'BO') {
              var param = {
                condition: JSON.stringify({
                  taskId: model.taskId
                })
              };
              // yufp.service.request({
              //   method: 'GET',
              //   data: param,
              //   url: backend.adminService + '/api/cimftcmytask/nicheInfolist',
              //   callback: function (code, message, response) {
              //     if (code == 0) {
              //       _self.$refs.refformNicheFeedback.resetFields();
              //       yufp.extend(_self.$refs.refformNicheFeedback.formModel, response.data[0]);
              //     }
              //   }
              // });
              this.dialogVisibleNicheback = true;
            }
            else if (model.taskType == 'CARE') {
              this.dialogVisibleCareback = true;
              _self.$nextTick(function () {
                _self.$refs.refformCareFeedback.resetFields();
              });

            }
            else {
              _self.$message({ message: '任务类型错误', type: 'warning' });
            }
          }
          else {
            _self.$message({ message: '只能反馈状态为执行中的任务', type: 'warning' });
          }
        }
      }
    });
  };
});