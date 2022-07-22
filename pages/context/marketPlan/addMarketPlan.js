/**
 * @created by zhanghan on 2018-11-15 16:11:30
 * @updated by
 * @description 新增营销活动
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
    var modelOpt = [];
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          tabName: 'base',
          expandCollapseName: 'base',

          addFields: [{
            columnCount: 2,
            fields: [
              { label: '引用模板', field: 'modelId', type: 'select', options: modelOpt },
              { label: '活动名称', field: 'activityName', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'input' },
              { label: '活动类型', field: 'activityType', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'ACTIVITY_TYPE' },
              {
                field: 'instuId',
                label: '适用金融机构',
                type: 'select',
                value: yufp.session.instu.code,
                options: instuOptions,
                rules: [
                  { required: true, message: '必填项', trigger: 'change' }
                ],
                change: function (code, data, arry) {
                  var temp = yufp.clone(_this.addFields[0].fields[4].params);
                  temp = { instuValue: code };
                  _this.addFields[0].fields[4].params = yufp.clone(temp);
                }
              },
              { label: '适用机构', field: 'activityOrg', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'custom', is: 'yufp-instuorg-tree', params: { instuValue: yufp.session.instu.code } },
              { label: '客户类型', field: 'customerType', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'ACTIVITY_CUSTOMER_TYPE' },
              {
                label: '开始时间',
                field: 'startDate',
                type: 'datetime',
                rules: [{ required: true, message: '必填项', trigger: 'blur', type: 'date' }],
                pickerOptions: {
                  disabledDate: function (time) {
                    if (_this.$refs.addreform.formModel.endDate) {
                      return time.getTime() < Date.now() - 8.64e7 || time.getTime() > _this.$refs.addreform.formModel.endDate;
                    } else {
                      return time.getTime() < Date.now() - 8.64e7;
                    }
                  }
                }
              },
              {
                label: '结束时间',
                field: 'endDate',
                type: 'datetime',
                rules: [{ required: true, message: '必填项', trigger: 'blur', type: 'date' }],
                pickerOptions: {
                  disabledDate: function (time) {
                    if (_this.$refs.addreform.formModel.startDate) {
                      return time.getTime() < Date.now() - 8.64e7 || time.getTime() < _this.$refs.addreform.formModel.startDate;
                    } else {
                      return time.getTime() < Date.now() - 8.64e7;
                    }
                  }

                }
              },
              {
                label: '是否定时执行',
                field: 'ifTimeTask',
                rules: [{ required: true, message: '必填项', trigger: 'blur' }],
                type: 'select',
                dataCode: 'IF_FLAG',
                change: function (value) {
                  if (value == '1') {
                    _this.$refs.addreform.switch('taskFreq', 'hidden', false);
                  } else {
                    _this.$refs.addreform.switch('taskFreq', 'hidden', true);
                  }
                }
              },
              { label: '执行频率', field: 'taskFreq', type: 'select', hidden: true, rules: [{ required: true, message: '必填项', trigger: 'blur' }], dataCode: 'TASK_FREQ' }
            ]
          }, {
            columnCount: 1,
            fields: [
              { label: '营销策划说明', field: 'activityDesc', type: 'textarea' }
            ]
          }],
          pickerOptions0: {
            disabledDate: function (time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          },
          addButtons: [
            // {
            //   label: '取消',
            //   type: 'primary',
            //   icon: 'yx-undo2',
            //   hidden: false,
            //   click: function (model) {
            //     _this.adddialogVisible = false;
            //   }
            // },
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
                // var taskFreq=model.taskFreq;
                // var ifTimeTask=model.ifTimeTask;
                // if(ifTimeTask==='1'){

                // }
                model.startDate = yufp.util.dateFormat(model.startDate, '{y}-{m}-{d} {h}:{i}:{s}')
                model.endDate = yufp.util.dateFormat(model.endDate, '{y}-{m}-{d} {h}:{i}:{s}')
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/marketplan/createplan',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.tempId = response.data.tempId;
                      _this.$refs.addreform.formModel.tempId = response.data.tempId;
                      _this.sts = false;
                      // _this.$refs.addreform.buttons[0].hidden = true;
                      _this.$message('操作成功');
                    }
                  }
                });
              }
            }
          ],
          showornot: false,
          editableornot: false,
          formDisabled: false,
          sts: true,
          tempId: ''
        };
      },
      methods: {
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
          //         option.key = instu[i].instuCode;
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
        var _this = this;
        yufp.service.request({
          url: backend.adminService + '/api/cimpcmmktplbasicinfo/list',
          method: 'get',
          async: false,
          callback: function (code, message, response) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
              var modelObj = {};
              modelObj.key = data[i].tempId;
              modelObj.value = data[i].tempName;
              modelOpt.push(modelObj);
            }
          }
        });
        _this.queryInstuFn();
      }
    });
  };
});