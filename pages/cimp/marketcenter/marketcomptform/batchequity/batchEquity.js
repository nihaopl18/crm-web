/**
 * @created by zhuly6 on 2018/11/16.
 * @description 营销组件FORM表单-营销组件-批量权益活动
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE');
    var transCodeOptions = [];
    yufp.service.request({
      method: 'GET',
      url: backend.adminService + '/api/transactioncategory/searchtranscode',
      data: {
        transType: '2'
      },
      callback: function (code, message, response) {
        var tab = response.data;
        for (var i = 0; i < tab.length; i++) {
          var option = {};
          option.key = tab[i].key;
          option.value = tab[i].value;
          transCodeOptions.push(option);
        }
      }
    });
    yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        var _self = this;
        return {
          activeNames: ['1', '2', '3'],
          transCodeOptions: transCodeOptions,
          flowNode: {
            // 报文体
            designBody: '',
            // 组件标题
            title: ''
          },
          formdata: {},
          eventUpdateFields: [{
            columnCount: 3,
            fields: [
              { field: 'transactionCode', label: '交易名称', type: 'select', options: transCodeOptions},
              { field: 'activityPriority', label: '优先级' }
            ]
          }],
          eventUpdateButtons: [
            { label: '确定',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.eventform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var instanceObj = _self.$options.ncmpobj.instanceObj;
                yufp.service.request({
                  method: 'GET',
                  url: backend.adminService + '/api/marketplan/getplanbyid',
                  data: {
                    flowId: instanceObj.flowId
                  },
                  callback: function (code, message, response) {
                    var plan = response.data;
                    model.nodeId = instanceObj.nodeId;
                    model.assemblyId = instanceObj.assemblyId;
                    model.activityName = plan.activityName;
                    model.tempId = plan.tempId;
                    model.beginDate = plan.startDate.substr(0, 10);
                    model.endDate = plan.endDate.substr(0, 10);
                    model.transactionType = '2';
                    yufp.service.request({
                      method: 'POST',
                      url: backend.adminService + '/api/activity/',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0) {
                          _self.$message('操作成功');
                          _self.eventUpdateButtons[0].hidden = true;
                          _self.eventUpdateButtons[1].hidden = false;
                          yufp.clone(response.data, _self.formdata);
                          yufp.router.to('ruleConfigQy', response.data, 'operateId1');
                        }
                      }
                    });
                  }
                });
              } },
            { label: '确定',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.eventform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var instanceObj = _self.$options.ncmpobj.instanceObj;
                yufp.service.request({
                  method: 'GET',
                  url: backend.adminService + '/api/marketplan/getplanbyid',
                  data: {
                    flowId: instanceObj.flowId
                  },
                  callback: function (code, message, response) {
                    _self.formdata.transactionCode = model.transactionCode;
                    _self.formdata.activityPriority = model.activityPriority;
                    yufp.clone(_self.formdata, model);
                    var plan = response.data;
                    model.nodeId = instanceObj.nodeId;
                    model.assemblyId = instanceObj.assemblyId;
                    model.activityName = plan.activityName;
                    model.beginDate = plan.startDate.substr(0, 10);
                    model.endDate = plan.endDate.substr(0, 10);
                    model.transactionType = '2';
                    _self.formdata = model;
                    yufp.service.request({
                      method: 'POST',
                      url: backend.adminService + '/api/activity/update',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0) {
                          _self.$message('操作成功');
                          yufp.router.to('ruleConfigQy', _self.formdata, 'operateId1');
                        }
                      }
                    });
                  }
                });
              } }
          ],
          eventFormDisabled: false,
          value1: '{"isConfig":0,"customUrl":{"html":"pages/cimp/marketcenter/marketcomptform/batchequity/midAutFest.html","js":"pages/cimp/marketcenter/marketcomptform/batchequity/midAutFest.js"}}'
        };
      },
      methods: {
        preview: function () {
          if (this.value1) {
            this.flowNode.designBody = this.value1;
            this.$refs.ncmpRef.show();
          }
        }
      },
      mounted: function () {
        var me = this;
        if (me.$options.ncmpobj.instanceObj == undefined) {
          me.eventUpdateButtons[0].hidden = true;
          me.eventUpdateButtons[1].hidden = true;
        } else {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/activity/getactiveform',
            data: {
              nodeId: me.$options.ncmpobj.instanceObj.nodeId
            },
            callback: function (code, message, response) {
              if (response.data != null) {
                me.eventUpdateButtons[0].hidden = true;
                me.eventUpdateButtons[1].hidden = false;
                var obj = response.data;
                yufp.extend(_this.$refs.eventform.formModel, obj);
                yufp.router.to('ruleConfigQy', obj, 'operateId1');
              } else {
                me.eventUpdateButtons[0].hidden = false;
                me.eventUpdateButtons[1].hidden = true;
              }
            }
          });
        }
      }
    });
  };
});