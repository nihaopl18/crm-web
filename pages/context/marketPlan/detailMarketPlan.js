/**
 * @created by zhanghan on 2018-11-15 16:11:30
 * @updated by
 * @description 营销活动详情
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
    yufp.lookup.reg('GENDER,EDUCATION_TYPE,IDENT_TYPE,TASK_FREQ,IF_FLAG,ACTIVITY_CUSTOMER_TYPE');
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
          disabled: false,
          tempId: data.tempId,
          detailFields: [{
            columnCount: 2,
            fields: [
              { label: '策划编号', value: data.tempId, field: 'tempId', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'input', disabled: true },
              { label: '模板编号', value: data.modelId, field: 'modelId', type: 'input', disabled: true },
              { label: '活动名称', field: 'activityName', value: data.activityName, rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'input', disabled: true },
              { label: '活动类型', field: 'activityType', value: data.activityType, rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'ACTIVITY_TYPE', disabled: true },
              {
                field: 'instuId',
                label: '适用金融机构',
                type: 'select',
                value: data.instuId,
                options: instuOptions,
                disabled: true,
                rules: [
                  { required: true, message: '必填项', trigger: 'change' }
                ]
              },
              { label: '适用机构', field: 'activityOrg', value: data.activityOrg, rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'custom', is: 'yufp-instuorg-tree', disabled: true, params: { instuValue: data.instuId } },
              { label: '客户类型', field: 'customerType', value: data.customerType, rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'ACTIVITY_CUSTOMER_TYPE', disabled: true },
              { label: '开始时间', field: 'startDate', value: data.startDate, type: 'datetime', rules: [{ required: true, message: '必填项', trigger: 'blur', type: 'date' }], disabled: true },
              { label: '结束时间', field: 'endDate', value: data.endDate, type: 'datetime', rules: [{ required: true, message: '必填项', trigger: 'blur', type: 'date' }], disabled: true },
              { label: '是否定时执行', field: 'ifTimeTask', value: data.ifTimeTask, rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'IF_FLAG', disabled: true },
              { label: '执行频率', field: 'taskFreq', value: data.taskFreq, rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'TASK_FREQ', disabled: true },
              { label: '创建人编号', value: data.cratUsr, field: 'cratUsr', type: 'input', disabled: true },
              { label: '创建人机构', value: data.cratUsr, field: 'cratOrgNm', type: 'input', disabled: true },
              { label: '创建时间', value: data.cratDt, field: 'cratDt', type: 'date', disabled: true },
              { label: '最近更新人编号', value: data.lastChgUsr, field: 'lastChgUsr', type: 'input', disabled: true },
              { label: '最近更新时间', value: data.lastChgDt, field: 'lastChgDt', type: 'date', disabled: true }
            ]
          }, {
            columnCount: 1,
            fields: [
              { label: '营销策划说明', value: data.activityDesc, field: 'activityDesc', type: 'textarea', disabled: true }
            ]
          }],
          detailButtons: [
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
                      _this.sts = false;
                      _this.tempId = response.data.tempId;
                      _this.$message('操作成功');
                    }
                  }
                });
              }
            }
          ]
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
          this.detailsdialogVisible = true;
          this.editableornot = false;
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