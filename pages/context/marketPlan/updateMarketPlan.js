/**
 * @created by zhanghan on 2018-11-15 16:11:30
 * @updated by
 * @description 修改营销活动
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
  './custom/widgets/js/yufpInstuOrgTree.js',
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
    yufp.lookup.reg('GENDER,EDUCATION_TYPE,IDENT_TYPE,IF_FLAG,TASK_FREQ,ACTIVITY_CUSTOMER_TYPE');
    var instuOptions = [];
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          tabName: 'base',
          expandCollapseName: 'base',
          tagType: data.tagType,
          showornot: false,
          editableornot: false,
          formDisabled: false,
          sts: true,
          tempId: data.tempId,
          updateFields: [{
            columnCount: 2,
            fields: [
              { label: '策划编号', value: data.tempId, field: 'tempId', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'input', disabled: true },
              { label: '模板编号', value: data.modelId, field: 'modelId', type: 'input' , disabled: true},
              { label: '活动名称', field: 'activityName', value: data.activityName, rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'input' },
              { label: '活动类型', field: 'activityType', value: data.activityType, rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'ACTIVITY_TYPE' },
              {
                field: 'instuId',
                label: '适用金融机构',
                type: 'select',
                value: data.instuId,

                options: instuOptions,
                rules: [
                  { required: true, message: '必填项', trigger: 'change' }
                ],
                change: function (code, data, arry) {
                  var temp = yufp.clone(_this.updateFields[0].fields[5].params);
                  temp = { instuValue: code };
                  _this.updateFields[0].fields[5].params = yufp.clone(temp);
                }
              },
              { label: '适用机构', field: 'activityOrg', value: data.activityOrg, rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'custom', is: 'yufp-instuorg-tree', params: { instuValue: yufp.session.instu.code } },
              { label: '客户类型', field: 'customerType', value: data.customerType, rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'ACTIVITY_CUSTOMER_TYPE' },
              {
                label: '开始时间',
                field: 'startDate',
                value: data.startDate,
                type: 'datetime',
                rules: [{ required: true, message: '必填项' }],
                pickerOptions: {
                  disabledDate: function (time) {
                    if (_this.$refs.updatereform.formModel.endDate) {
                      return time.getTime() < Date.now() - 8.64e7 || time.getTime() > _this.$refs.updatereform.formModel.endDate;
                    } else {
                      return time.getTime() < Date.now() - 8.64e7;
                    }
                  }
                }
              },
              {
                label: '结束时间',
                field: 'endDate',
                value: data.endDate,
                type: 'datetime',
                rules: [{ required: true, message: '必填项' }],
                pickerOptions: {
                  disabledDate: function (time) {
                    if (_this.$refs.updatereform.formModel.startDate) {
                      return time.getTime() < Date.now() - 8.64e7 || time.getTime() < _this.$refs.updatereform.formModel.startDate;
                    } else {
                      return time.getTime() < Date.now() - 8.64e7;
                    }
                  }

                }
              },
              {
                label: '是否定时执行',
                field: 'ifTimeTask',
                value: data.ifTimeTask,
                rules: [{ required: true, message: '必填项', trigger: 'blur' }],
                type: 'select',
                dataCode: 'IF_FLAG',
                change: function (value) {
                  if (value == '1') {
                    _this.$refs.updatereform.switch('taskFreq', 'hidden', false);
                  } else {
                    _this.$refs.updatereform.switch('taskFreq', 'hidden', true);
                  }
                }
              },
              { label: '执行频率', field: 'taskFreq', value: data.taskFreq, hidden: true, rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'TASK_FREQ' }
            ]
          }, {
            columnCount: 1,
            fields: [
              { label: '营销策划说明', value: data.activityDesc, field: 'activityDesc', type: 'textarea' }
            ]
          }],
          updateButtons: [
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
                model.startDate = yufp.util.dateFormat(model.startDate, '{y}-{m}-{d} {h}:{i}:{s}')
                model.endDate = yufp.util.dateFormat(model.endDate, '{y}-{m}-{d} {h}:{i}:{s}')
                model.activitySts = '01';// 修改后的数据都是暂存状态
                //model.wfAppStatus = '000';// 修改后的审批状态都是待发起
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/marketplan/updateplan',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$message('操作成功');
                      _this.updatedialogVisible = false;
                    }
                  }
                });
              }
            }
          ]
        };
      },
      methods: {
        deleteNodeFn: function (nodeId) {
          var _this = this;
          if (nodeId != undefined && nodeId != null) {
            yufp.service.request({
              method: 'POST',
              data: {
                nodeId: nodeId
              },
              url: backend.appOcaService + '/api/presentationform/delpre',
              callback: function (code, message, response) {
                if (code === 0 && response.code === 0) {
                  _this.$message({ message: '操作成功', type: 'success' });
                }
              }
            });
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/marketplan/delmktpositcont?nodeId=' + nodeId,
              callback: function (code, message, response) {
                if (code == 0) {
                }
              }
            });
          }
        },
        // 查询金融机构
        queryInstuFn: function () {
          yufp.service.request({
            url: '/api/loyqycommoditycategory/getinstus',
            method: 'get',
            callback: function (code, message, response) {
              var data = response.data;
              for (var i = 0; i < data.length; i++) {
                instuOptions.push(data[i]);
              }
            }
          });
          // yufp.service.request({
          //   method: 'GET',
          //   url: backend.appOcaService + '/api/adminsmorg/getinstuorg',
          //   callback: function (code, message, response) {
          //     if (code === 0 && response.code === 0) {
          //       if (instuOptions.length > 0) {
          //         instuOptions.splice(0, instuOptions.length);
          //       }
          //       var instu = response.data;
          //       for (var i = 0; i < instu.length; i++) {
          //         var option = {};
          //         option.key = instu[i].instuId;
          //         option.value = instu[i].instuName;
          //         instuOptions.push(option);
          //       }
          //     }
          //   }
          // });
        },
        // tabs切换事件（触发流程图初始化）
        handleClick: function (tab, event) {
          if (tab.name != 'asset') {
            return;
          }
          this.editableornot = true;
          this.formDisabled = false;
          this.showornot = true;
          this.panelType = this.viewType;
          this.flowId = this.tempId;
        }
      },
      mounted: function () {
        this.queryInstuFn();
      }
    });
  };
});