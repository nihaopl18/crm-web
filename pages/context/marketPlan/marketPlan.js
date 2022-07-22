/**
 * @Created by zhanghan zhanghan3@yusys.com.cn on 2018-11-12 17:38:11.
 * @description 营销策划
 */
 yufp.require.require([
  './libs/jsPlumb/css/jsPlumbToolkit-defaults.css',
  './libs/jsPlumb/css/jsPlumbToolkit-demo.css',
  './libs/swiper/idangerous.swiper.css'
]);
define([
  'jquery',
  './libs/jsPlumb/js/jsPlumb.js',
  './libs/swiper/idangerous.swiper.min.js',
  './custom/widgets/js/yufpFlowDesign.js', // 流程组件
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/YufpDemoSelector.js',
  './libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/YufpWfInit.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var dataparam;
    if (data == null || data == '') {
      dataparam = {};
    } else {
      dataparam = { activityName: data.value };
    }
    yufp.lookup.reg('ACTIVITY_CUSTOMER_TYPE,ACTIVITY_TYPE,ACTIVITY_STS,WF_APP_STATUS,IF_FLAG,TASK_FREQ');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        var checkName = function (rule, value, callback) {
          var isExist = false;
          var param = {
            condition: JSON.stringify({
              custGroupName: value
            })
          };
          yufp.service.request({
            url: backend.adminService + '/api/cimpcmmktplbasicinfo/checkName',
            method: 'get',
            data: param,
            async: false,
            callback: function (code, message, response) {
              console.log("response.data", response.data);
              if (response.data == 1) {
                isExist = true;
              }
              if (isExist) {
                callback(new Error('模板名已经存在!'));
              } else {
                callback();
              }
            }
          });
        };
        return {
          // baseParams: {
          //   condition: {
          //     userId: 'admin'
          //   },
          //   nonCondParam1: '1',
          //   nonCondParam2: '2'
          // },
          queryFields: [
            { placeholder: '活动名称', field: 'activityName', type: 'input' },
            { placeholder: '活动类型', field: 'activityType', type: 'select', dataCode: 'ACTIVITY_TYPE' },
            { placeholder: '审批状态', field: 'wfAppStatus', type: 'select', dataCode: 'WF_APP_STATUS' },
            { placeholder: '活动状态', field: 'activitySts', type: 'select', dataCode: 'ACTIVITY_STS' }
          ],
          queryButtons: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _this.$refs.reftable.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          tableColumns: [
            { label: '策划编号', prop: 'tempId', width: '80' },
            // {label: '模板编号', prop: 'modelId', width: '80' },
            { label: '活动名称', prop: 'activityName', width: '160' },
            { label: '活动类型', prop: 'activityType', width: '160', dataCode: 'ACTIVITY_TYPE' },
            // { label: '审批状态', prop: 'wfAppStatus', width: '100', dataCode: 'WF_APP_STATUS' },
            { label: '活动状态', prop: 'activitySts', width: '70', dataCode: 'ACTIVITY_STS' },
            { label: '客户类型', prop: 'customerType', width: '90', dataCode: 'ACTIVITY_CUSTOMER_TYPE' },
            { label: '开始时间', prop: 'startDate', width: '160' },
            { label: '结束时间', prop: 'endDate', width: '160' },
            { label: '是否定时执行', prop: 'ifTimeTask', width: '100', dataCode: 'IF_FLAG' },
            { label: '执行频率', prop: 'taskFreq', width: '70', dataCode: 'TASK_FREQ' },
            { label: '机构ID ', prop: 'orgId', width: '120', hidden: true },
            { label: '金融机构ID ', prop: 'instuId', width: '120', hidden: true },
            // { label: '适用金融机构', prop: 'instuName', width: '140' },
            { label: '活动适用机构', prop: 'activityOrg', width: '140' },
            // {label: '营销策划说明', prop: 'activityDesc', width: '300' },
            { label: '创建人名称', prop: 'cratUsr', width: '120' },
            // { label: '创建人机构', prop: 'cratOrgName', width: '120' },
            { label: '创建时间', prop: 'cratDt', width: '160' },
            { label: '最近更新人名称', prop: 'lastChgUsr', width: '120' },
            { label: '最近更新时间', prop: 'lastChgDt', width: '160' }
          ],
          addFields: [{
            columnCount: 2,
            fields: [
              { label: '模板编号', field: 'modelId', type: 'input' },
              { label: '活动名称', field: 'activityName', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'input' },
              { label: '活动策划机构', field: 'activityOrg', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'custom', is: 'yufp-org-tree' },
              { label: '活动类型', field: 'activityType', type: 'select', dataCode: 'ACTIVITY_TYPE' },
              { label: '客户类型', field: 'customerType', type: 'select', dataCode: 'ACTIVITY_CUSTOMER_TYPE' },
              { label: '开始时间', field: 'startDate', type: 'date' },
              { label: '结束时间', field: 'endDate', type: 'date' }
            ]
          }, {
            columnCount: 1,
            fields: [
              { label: '营销策划说明', field: 'activityDesc', type: 'textarea' }
            ]
          }],
          addFieldsTwo: [{
            columnCount: 2,
            fields: [
              {
                label: '模板名称',
                field: 'tempName',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' },
                  // { validator: checkName, trigger: 'blur' }
                ],
                type: 'input'
              },
              {
                label: '流程类型',
                field: 'tempType',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }],
                type: 'select',
                dataCode: 'ACTIVITY_TYPE'
              },
              // {
              //   label: '活动类型',
              //   field: 'activityType',
              //   rules: [{ required: true, message: '必填项', trigger: 'blur' }],
              //   type: 'select',
              //   dataCode: 'ACTIVITY_TYPE'
              // },
              // {
              //   label: '实现目标',
              //   field: 'achieveGoal',
              //   type: 'input'
              // }
            ]
          }, {
            columnCount: 1,
            fields: [
              {
                label: '描述', field: 'remark', type: 'textarea', rows: 2,
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }],
              }
            ]
          }],
          updateFields: [{
            columnCount: 2,
            fields: [
              { label: '策划编号', field: 'tempId', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'input', disabled: true },
              { label: '模板编号', field: 'modelId', type: 'input' },
              { label: '活动名称', field: 'activityName', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'input' },
              { label: '活动策划机构', field: 'activityOrg', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'custom', is: 'yufp-org-tree' },
              { label: '活动类型', field: 'activityType', type: 'select', dataCode: 'ACTIVITY_TYPE' },
              { label: '客户类型', field: 'customerType', type: 'select', dataCode: 'ACTIVITY_CUSTOMER_TYPE' },
              { label: '开始时间', field: 'startDate', type: 'date' },
              { label: '结束时间', field: 'endDate', type: 'date' }
            ]
          }, {
            columnCount: 1,
            fields: [
              { label: '营销策划说明', field: 'activityDesc', type: 'textarea' }
            ]
          }],
          detailsFields: [{
            columnCount: 2,
            fields: [
              { label: '策划编号', field: 'tempId', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'input' },
              { label: '模板编号', field: 'modelId', type: 'input' },
              { label: '活动名称', field: 'activityName', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'input' },
              { label: '活动策划机构', field: 'activityOrg', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'custom', is: 'yufp-org-tree' },
              { label: '活动类型', field: 'activityType', type: 'select', dataCode: 'ACTIVITY_TYPE' },
              { label: '客户类型', field: 'customerType', type: 'select', dataCode: 'ACTIVITY_CUSTOMER_TYPE' },
              { label: '状态', field: 'activitySts', type: 'select', dataCode: 'ACTIVITY_STS' },
              { label: '开始时间', field: 'startDate', type: 'date' },
              { label: '结束时间', field: 'endDate', type: 'date' },
              { label: '创建人编号', field: 'cratUsr', type: 'input' },
              { label: '创建时间', field: 'cratDt', type: 'date' },
              { label: '最近更新人编号', field: 'lastChgUsr', type: 'input' },
              { label: '最近更新时间', field: 'lastChgDt', type: 'date' }
            ]
          }, {
            columnCount: 1,
            fields: [
              { label: '营销策划说明', field: 'activityDesc', type: 'textarea' }
            ]
          }],
          // 新增保存
          addButtonsTwo: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _this.dialogVisibleAdd = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                //var _self = this;
                var validate = false;
                _this.$refs.refform.validate(function (valid) {
                  validate = valid;
                });
                console.log("validate", validate);
                if (!validate) {
                  return;
                }
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/cimpcmmktplbasicinfo/add',
                  data: model,
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _this.$message(response.message);
                      //_this.$refs.reftable.remoteData();
                      //_this.flowId = response.data.tempId;
                      _this.marketCaseId = response.data.tempId;
                      var param = {
                        marketActionId: _this.marketActionId,
                        marketCaseId: _this.marketCaseId
                      }
                      yufp.service.request({
                        method: 'POST',
                        url: backend.adminService + '/api/marketplan/copytomarketcase',
                        data: param,
                        //async: false,
                        callback: function (code, message, response) {
                          if (code == 0) {
                            _this.$refs.reftable.remoteData();
                            _this.$message('操作成功');

                          }
                        }
                      });
                      _this.$refs.refform.resetFields();
                      _this.dialogVisibleAdd = false;
                    } else {
                      _this.$message(response.message);
                      _this.dialogVisibleAdd = false;
                    }
                  }
                });
              }
            }
          ],
          addButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _this.adddialogVisible = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _this.$refs.addreform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/marketplan/createplan',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$refs.reftable.remoteData();
                      _this.$message('操作成功');
                      _this.adddialogVisible = false;
                    }
                  }
                });
              }
            }
          ],
          updateButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _this.updatedialogVisible = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _this.$refs.updatereform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/marketplan/updateplan',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$message('更新成功');
                      _this.$refs.reftable.remoteData();
                      //_this.$message('操作成功');
                      _this.updatedialogVisible = false;
                    }
                  }
                });
              }
            }
          ],
          detailsButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _this.detailsdialogVisible = false;
              }
            }
          ],
          Url: backend.adminService + '/api/marketplan/list',
          height: yufp.frame.size().height - 103,
          editableornot: false,
          tabName: 'first',
          showornot: false,
          ifEvent: false, // 是否需要模拟事件交易
          adddialogVisible: false,
          updatedialogVisible: false,
          detailsdialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          tempId: '',
          dialogVisibleAdd: false,
          dataParams: { condition: JSON.stringify(dataparam) },
          transDialogVisible: false,
          transDialogVisible1: false,
          marketActionId: '',
          marketCaseId: '',
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          modiFields: [{
            columnCount: 2,
            fields: [
              { label: '交易码', field: 'TRANS_CODE', type: 'input', value: 'MNJY123', rules: [{ required: true, message: '必填项', trigger: 'blur' }] }
              // {label: '流水号', field: 'SERI_NO', type: 'input', value: '20190323104132'},
              // {label: '客戶号', field: 'CUST_ID', type: 'input', value: '010000975288'},
              // {label: '客户名称', field: 'CUST_NAME', type: 'input', value: '王珍'},
              // {label: '账单金额', field: 'TRANSAMT', type: 'input', value: '5000'},
              // {label: '电话号码', field: 'PHONE_NUM', type: 'input', value: '15802251200'},
              // {label: '交易日期', field: 'TRANS_DATE', type: 'date', value: '2019-03-23'}
            ]
          }],
          modiFields1: [{
            columnCount: 1,
            fields: [
              // {label: '处理结果信息', field: 'RESULT_INFO',type: 'textarea',row: 7},
              { field: 'remark', label: '处理结果信息', placeholder: '2000个字符以内', type: 'textarea', rows: 12 }
            ]
          }],
          modiButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _this.transDialogVisible = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _this.$refs.modiForm.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var savelist = [];
                savelist.push(model);
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/transsend',
                  data: JSON.stringify(savelist),
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$refs.reftable.remoteData();
                      _this.$message('操作成功');
                      _this.transDialogVisible = false;
                    }
                  }
                });
              }
            }
          ],
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
          // selectFlag: true
        };
      },
      methods: {
        onAfterInit: function () {
          var _this = this;
          // var obj = this.$refs.reftable.selections[0];
          // var model = {};
          // model.tempId = obj.tempId;
          // model.activitySts = '07';
          // yufp.service.request({
          //   method: 'POST',
          //   url: backend.adminService + '/api/marketplan/updateplan/', // 修改营销模板状态,
          //   data: model,
          //   async: false,
          //   callback: function (code, message, response) {
          //     if (code == 0) {
          //       _this.$refs.reftable.remoteData();
          //     }
          //   }
          // });
          _this.$refs.reftable.remoteData();
        },
        onAfterClose: function () {

        },
        priFn: function () {
          var _this = this;
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (this.$refs.reftable.selections[0].wfAppStatus != '000' && this.$refs.reftable.selections[0].wfAppStatus != '998') {
            this.$message({ message: '请选择状态为待发起或否决的记录', type: 'warning' });
            return;
          }
          var obj = this.$refs.reftable.selections[0];
          var model = {};
          model.tempId = obj.tempId;
          model.activitySts = '02';
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/marketplan/commintInfo', // 提交,
            data: model,
            async: false,
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$refs.reftable.remoteData();
              }
            }
          });
          // var commintData = {};
          // commintData.bizSeqNo = 'YXHDSP' + this.$refs.reftable.selections[0].tempId;// 流程主键
          // commintData.applType = 'YXHDSP';// 模型版本申请类型字典项
          // commintData.custName = yufp.session.user.loginCode;
          // commintData.custId = yufp.session.user.loginCode;
          // var load = _this.$loading();
          // _this.$refs.yufpWfInit.wfInit(commintData, load);
        },
        upFn: function () {
          var _this = this;
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (this.$refs.reftable.selections[0].activitySts != '08' && this.$refs.reftable.selections[0].activitySts != '03') {
            this.$message({ message: '请选择状态为已审批、已下架的记录', type: 'warning' });
            return;
          }
          var obj = this.$refs.reftable.selections[0];
          var model = {};
          model.tempId = obj.tempId;
          model.activitySts = '02';
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/marketplan/updateplan/', // 修改营销模板状态,
            data: model,
            async: false,
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$refs.reftable.remoteData();
              }
            }
          });
        },
        /**
         * 复制
         */
        copyFn: function () {
          var _this = this;
          if (_this.$refs.reftable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          // if (this.$refs.reftable.selections[0].activitySts != '02') {
          //   this.$message({ message: '请选择状态为上架中的记录', type: 'warning' });
          //   return;
          // }
          var obj = _this.$refs.reftable.selections[0];
          _this.$confirm('此操作将复制此活动信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/marketplan/copyflowinfo?flowId=' + obj.tempId, // 修改营销模板状态,
                  async: false,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$refs.reftable.remoteData();
                      _this.$message('操作成功');
                    }
                  }
                });
              }
            }
          });
        },
        /**
         * 另存为案例
         */
        otherSaveFn: function () {
          var _this = this;
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.marketActionId = this.$refs.reftable.selections[0].tempId;
          console.log("this.marketActionId", this.marketActionId);
          this.dialogVisibleAdd = true;
          //this.$message('正在努力开发中。。。。');
          //return;
        },
        downFn: function () {
          var _this = this;
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (this.$refs.reftable.selections[0].activitySts != '04') {
            this.$message({ message: '请选择状态为执行中的记录', type: 'warning' });
            return;
          }
          var obj = this.$refs.reftable.selections[0];
          var model = {};
          model.tempId = obj.tempId;
          model.activitySts = '05';
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/marketplan/updateplansts',
            data: model,
            async: false,
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$refs.reftable.remoteData();
              }
            }
          });
        },
        // tabs切换事件（触发流程图初始化）
        handleClick: function (tab, event) {
          if (tab.name != 'second') {
            return;
          }
          this.showornot = true;
          this.panelType = this.viewType;
          if (this.panelType != 'ADD') {
            var obj = this.$refs.reftable.selections[0];
            this.flowId = obj.tempId;
          } else {
            this.flowId = '';
          }
        },
        querFieldInfoFn: function () {
          var _this = this;
          var tempId = _this.$refs.reftable.selections[0].tempId;
          // 发起请求
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/marketplan/querfieldsinfo/', // '/ruleProperty/example/fieldList',
            data: {
              flowId: tempId
            },
            callback: function (code, message, response) {
              var data = response.data;

              for (var i = 0; i < data.length; i++) {
                let info = {};// {label: '客戶号', field: 'CUST_ID', type: 'input', value: '210001089880'},
                info.label = data[i].fieldCName;
                info.field = data[i].fieldEName;
                if (data[i].fieldType == '1' || data[i].fieldType == '2') { // 文本框或者数值框
                  info.type = 'input';
                  info.rules = [{ required: true, message: '必填项', trigger: 'blur' }];
                } else if (data[i].fieldType == '3') { // 日期框
                  info.type = 'date';
                  // info.rules=[{ required: true, message: '必填项', trigger: 'select' }];
                } else if (data[i].fieldType == '4') { // 下拉框
                  info.type = 'select';
                  info.rules = [{ required: true, message: '必填项', trigger: 'select' }];
                  info.dataCode = data[i].fname;
                } else if (data[i].fieldType == '6') { // 多选框
                  info.type = 'select';
                  info.rules = [{ required: true, message: '必填项', trigger: 'select' }];
                  info.dataCode = data[i].fname;
                  info.multiple = true;
                } else if (data[i].fieldType == '7') { // 放大镜
                  info.type = 'custom';
                  info.is = data[i].fname;
                }

                _this.modiFields[0].fields.push(info);
              }
              _this.transDialogVisible = true;
            }
          });
          // _this.transDialogVisible = true;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          // var _this = this;
          // _this.viewType = 'ADD';
          // _this.adddialogVisible = true;
          // this.editableornot = true;
          // _this.formDisabled = false;
          // _this.tabName = 'first';
          // _this.$nextTick(function () {
          //   _this.$refs.addreform.resetFields();
          // });
          var customKey = 'addMarketPlan'; // 请以custom_前缀开头，并且全局唯一
          var routeId = 'addMarketPlan'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '新增营销活动' // 页签名称
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          // var _this = this;
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (this.$refs.reftable.selections[0].activitySts == '04') {
            this.$message({ message: '不能请选择状态为执行中的记录', type: 'warning' });
            return;
          }
          this.editableornot = false;
          // _this.viewType = 'EDIT';
          // this.editableornot = true;
          // _this.updatedialogVisible = true;
          // _this.tabName = 'first';
          // _this.formDisabled = false;
          // this.$nextTick(function () {
          //   var obj = this.$refs.reftable.selections[0];
          //   this.$refs.updatereform.formModel = yufp.clone(obj, {}); // 使用深复制
          // });
          var modelId = this.$refs.reftable.selections[0].modelId;
          if (typeof modelId == undefined) {
            modelId = '';
          }
          var activityName = this.$refs.reftable.selections[0].activityName;
          if (typeof activityName == undefined) {
            activityName = '';
          }
          var activityOrg = this.$refs.reftable.selections[0].orgId;
          if (typeof activityOrg == undefined) {
            activityOrg = '';
          }
          var activityType = this.$refs.reftable.selections[0].activityType;
          if (typeof activityType == undefined) {
            activityType = '';
          }
          var instuId = this.$refs.reftable.selections[0].instuId;
          if (typeof instuId == undefined) {
            instuId = '';
          }
          var ifTimeTask = this.$refs.reftable.selections[0].ifTimeTask;
          if (typeof ifTimeTask == undefined) {
            ifTimeTask = '';
          }
          var taskFreq = this.$refs.reftable.selections[0].taskFreq;
          if (typeof taskFreq == undefined) {
            taskFreq = '';
          }
          var customerType = this.$refs.reftable.selections[0].customerType;
          if (typeof customerType == undefined) {
            customerType = '';
          }
          var startDate = this.$refs.reftable.selections[0].startDate;
          if (typeof startDate == undefined) {
            startDate = '';
          }
          var endDate = this.$refs.reftable.selections[0].endDate;
          if (typeof endDate == undefined) {
            endDate = '';
          }
          var activityDesc = this.$refs.reftable.selections[0].activityDesc;
          if (typeof activityDesc == undefined) {
            activityDesc = '';
          }

          var customKey = 'updateMarketPlan';
          var routeId = 'updateMarketPlan'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey + this.$refs.reftable.selections[0].tempId, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '营销活动修改：' + this.$refs.reftable.selections[0].activityName, // 页签名称
            data: {
              tagType: 'UPDATE',
              tempId: this.$refs.reftable.selections[0].tempId,
              modelId: modelId,
              activityName: activityName,
              activityOrg: activityOrg,
              activityType: activityType,
              customerType: customerType,
              ifTimeTask: ifTimeTask,
              instuId: instuId,
              taskFreq: taskFreq,
              startDate: startDate,
              endDate: endDate,
              activityDesc: activityDesc
            } // 传递的业务数据，可选配置
          });
        },
        /**
         * 详情
         */
        infoFn: function () {
          // var _this = this;
          var selectionsAry = this.$refs.reftable.selections;
          if (selectionsAry.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          // this.editableornot = false;
          // _this.viewType = 'DETAIL';
          // _this.detailsdialogVisible = true;
          // _this.tabName = 'first';
          // _this.formDisabled = true;
          // this.$nextTick(function () {
          //   this.$refs.detailsreform.formModel = yufp.clone(selectionsAry[0], {});
          // });
          var modelId = this.$refs.reftable.selections[0].modelId;
          if (typeof modelId == undefined) {
            modelId = '';
          }
          var activityName = this.$refs.reftable.selections[0].activityName;
          if (typeof activityName == undefined) {
            activityName = '';
          }
          var activityOrg = this.$refs.reftable.selections[0].orgId;
          if (typeof activityOrg == undefined) {
            activityOrg = '';
          }
          var activityType = this.$refs.reftable.selections[0].activityType;
          if (typeof activityType == undefined) {
            activityType = '';
          }
          var instuId = this.$refs.reftable.selections[0].instuId;
          if (typeof instuId == undefined) {
            instuId = '';
          }
          var ifTimeTask = this.$refs.reftable.selections[0].ifTimeTask;
          if (typeof ifTimeTask == undefined) {
            ifTimeTask = '';
          }
          var taskFreq = this.$refs.reftable.selections[0].taskFreq;
          if (typeof taskFreq == undefined) {
            taskFreq = '';
          }
          var customerType = this.$refs.reftable.selections[0].customerType;
          if (typeof customerType == undefined) {
            customerType = '';
          }
          var activitySts = this.$refs.reftable.selections[0].activitySts;
          if (typeof activitySts == undefined) {
            activitySts = '';
          }
          var startDate = this.$refs.reftable.selections[0].startDate;
          if (typeof startDate == undefined) {
            startDate = '';
          }
          var endDate = this.$refs.reftable.selections[0].endDate;
          if (typeof endDate == undefined) {
            endDate = '';
          }
          var activityDesc = this.$refs.reftable.selections[0].activityDesc;
          if (typeof activityDesc == undefined) {
            activityDesc = '';
          }
          var cratUsr = this.$refs.reftable.selections[0].cratUsr;
          if (typeof cratUsr == undefined) {
            cratUsr = '';
          }
          var cratDt = this.$refs.reftable.selections[0].cratDt;
          if (typeof cratDt == undefined) {
            cratDt = '';
          }
          var lastChgUsr = this.$refs.reftable.selections[0].lastChgUsr;
          if (typeof lastChgUsr == undefined) {
            lastChgUsr = '';
          }
          var lastChgDt = this.$refs.reftable.selections[0].lastChgDt;
          if (typeof lastChgDt == undefined) {
            lastChgDt = '';
          }

          var customKey = 'detailMarketPlan';
          var routeId = 'detailMarketPlan'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey + this.$refs.reftable.selections[0].tempId, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '营销活动详情：' + this.$refs.reftable.selections[0].activityName, // 页签名称
            data: {
              tagType: 'DEATILS',
              tempId: this.$refs.reftable.selections[0].tempId,
              modelId: modelId,
              activityName: activityName,
              activityOrg: activityOrg,
              activityType: activityType,
              ifTimeTask: ifTimeTask,
              instuId: instuId,
              taskFreq: taskFreq,
              customerType: customerType,
              activitySts: activitySts,
              startDate: startDate,
              endDate: endDate,
              activityDesc: activityDesc,
              cratUsr: cratUsr,
              cratDt: cratDt,
              lastChgUsr: lastChgUsr,
              lastChgDt: lastChgDt
            } // 传递的业务数据，可选配置
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var ids = '';
          var selections = _this.$refs.reftable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          for (var j = 0; j < selections.length; j++) {
            if (selections[j].activitySts != '01') {
              _this.$message({ message: '只能删除暂存的数据', type: 'warning' });
              return;
            }
            if (selections[j].wfAppStatus == '111') {
              _this.$message({ message: '审批中的活动不能删除', type: 'warning' });
              return;
            }
          }
          if (selections.length > 1) {
            for (var i = 0; i < selections.length; i++) {
              if (i == 0) {
                ids = selections[i].tempId;
              } else {
                ids = selections[i].tempId + ',' + ids;
              }
            }
          } else {
            ids = selections[0].tempId;
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/marketplan/del/' + ids,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$refs.reftable.remoteData();
                      _this.$message('操作成功');
                    }
                  }
                });
              }
            }
          });
        },
        /**
         * 执行结果弹出框关闭事件
         */
        closeFn: function () {
          var _this = this;
          if (_this.ifEvent) {
            _this.$confirm('是否继续模拟实时事件交易?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true,
              callback: function (action) {
                if (action === 'confirm') {
                  _this.querFieldInfoFn();
                }
              }
            });
          }
        },
        // 营销流程执行
        exeFlowFn: function () {
          var _this = this;
          var selectionsAry = this.$refs.reftable.selections;
          if (selectionsAry.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          // if (selectionsAry[0].activitySts != '02') {
          //   this.$message({ message: '只能执行已发布的活动！', type: 'warning' });
          //   return;
          // }
          var info = selectionsAry[0];

          if (info.activitySts != '01' && info.activitySts != '03') { // 判断是否暂存或下架
            this.$message({ message: '请先选择暂存或下架的记录', type: 'warning' });
            return;
          }
          _this.ifEvent = false;
          _this.$confirm('是否执行此流程?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                // if (info.activityType == '01') { // 模型应用
                yufp.service.request({
                  method: 'POST',
                  // url: backend.adminService + '/api/marketplan/excflow?flowId=' + info.tempId,
                  data: info.tempId,
                  url: backend.adminService + '/api/marketplanaction/start',
                  callback: function (code, message, response) {
                    if (code == 0) {
                      var info = response.data;
                      if (info.ifEvent === 'true' && info.ifChannel === 'false') {
                        _this.querFieldInfoFn();
                      } else if (info.ifEvent === 'true' && info.ifChannel === 'true') {
                        _this.ifEvent = true;
                        _this.transDialogVisible1 = true;
                        _this.$nextTick(function () {
                          _this.$refs.modiForm1.formModel.remark = JSON.stringify(response.data);
                        });
                      } else if (info.ifEvent === 'false' && info.ifChannel === 'true') {
                        _this.ifEvent = false;
                        _this.transDialogVisible1 = true;
                        _this.$refs.reftable.remoteData();
                        _this.$nextTick(function () {
                          _this.$refs.modiForm1.formModel.remark = JSON.stringify(response.data);
                        });
                      } else {
                        _this.$message({ message: '执行成功', type: 'success' });
                        _this.$refs.reftable.remoteData();
                      }
                    }
                  }
                });
                // } else if (info.activityType == '02') { // 事件营销
                //   _this.querFieldInfoFn();
                // } else if (info.activityType == '02') { //

                // }
              }
            }
          });
        }
      }
    });
  };
});