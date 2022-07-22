/**
 * @created by 罗顺 on 2018/11/16.
 * @description 营销组件FORM表单-渠道组件-呼叫中心
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
    yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        return {
          activeNames: ['1', '2', '3'],
          activeName1: 'person',
          activeName2: 'PRODUCT',
          custGroupTableData: [],
          proInTableData: [],
          picker: {selectableRange: '08:00:00 - 18:00:00'},
          careInTableData: [],
          riskInTableData: [],
          proTableData: [],
          careTableData: [],
          riskTableData: [],
          options1: [
            {key: '01', value: '轮播图片'},
            {key: '02', value: '图片'},
            {key: '03', value: '组合图片'},
            {key: '04', value: '图文'},
            {key: '05', value: '文本'},
            {key: '06', value: '主题优选'},
            {key: '07', value: '产品优选'},
            {key: '08', value: '猜你喜欢'},
            {key: '09', value: '智慧投资'},
            {key: '10', value: '栏目组合'}
          ],
          activityType: '', // 活动类型
          buttonHiden: true, // 操作表单按钮显示与否
          model: {
            beginTime: '',
            endTime: '',
            marketHurdles: ''
          },
          rules: { beginTime: [{type: 'date', required: true, message: '请输入开始时间', trigger: 'change' }],
            endTime: [{type: 'date', required: true, message: '请输入结束时间', trigger: 'change' }],
            marketHurdles: [{required: true, message: '请选择营销栏位', trigger: 'blur' }] }
        };
      },
      methods: {
        reset: function () {
          this.$refs.myform.resetFields();
        },
        changeTimeFn: function (value) {
          this.picker.selectableRange = value + ' - 18:00:00';
        },
        handleInputClick: function (tab, event) {
          var _this = this;
          if (_this.$options.ncmpobj.instanceObj == undefined) {
            _this.proInTableData = [];
            _this.careInTableData = [];
            _this.riskInTableData = [];
          } else {
            if (_this.actionType == '02') { // 事件引擎
              var param = {
                condition: JSON.stringify({
                  actionType: tab.name,
                  nodeId: _this.$options.ncmpobj.instanceObj.nodeId
                })
              };
              yufp.service.request({
                method: 'GET',
                url: backend.adminService + '/api/cmfrcruleresultresource/getmegin',
                data: param,
                callback: function (code, message, response) {
                  if (response.data.length > 0) {
                    var info = response.data;
                    if (tab.name == 'CARE') {
                      _this.careInTableData = info;
                    } else if (tab.name == 'RISK') {
                      _this.riskInTableData = info;
                    } else {
                      _this.proInTableData = info;
                    }
                  };
                }
              });
            }
          }
        },
        handleClick: function (tab, event) {
          var _this = this;
          if (_this.$options.ncmpobj.instanceObj == undefined) {
            _this.careTableData = [];
            _this.riskTableData = [];
            _this.proTableData = [];
          } else {
            if (_this.actionType == '02') { // 事件引擎
              var param = {
                condition: JSON.stringify({
                  runConnectType: 'DEAL',
                  actionType: tab.name,
                  nodeId: _this.$options.ncmpobj.instanceObj.nodeId
                })
              };
              yufp.service.request({
                method: 'GET',
                url: backend.adminService + '/api/cmfrcruleresultresource/getmegout',
                data: param,
                callback: function (code, message, response) {
                  if (response.data.length > 0) {
                    var info = response.data;
                    if (tab.name == 'CARE') {
                      _this.careTableData = info;
                    } else if (tab.name == 'RISK') {
                      _this.riskTableData = info;
                    } else {
                      _this.proTableData = info;
                    }
                  };
                }
              });
            }
          }
        },
        save: function () {
          var _this = this;
          var validate = false;
          this.$refs.myform.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var nodeId = this.$options.ncmpobj.instanceObj.nodeId;
          var preData = [];
          for (var i = 0; i < this.$refs.myform.fields.length; i++) {
            var preObj = {};
            preObj.formOperationFiled = this.$refs.myform.fields[i].prop;// 'beginTime';
            if (this.$refs.myform.fields[i].prop == 'beginTime' || this.$refs.myform.fields[i].prop == 'endTime') {
              preObj.formOperationVal = yufp.util.dateFormat(this.$refs.myform.fields[i].fieldValue, '{y}-{m}-{d} {h}:{i}:{s}');
            } else {
              preObj.formOperationVal = this.$refs.myform.fields[i].fieldValue;
            }
            preData.push(preObj);
          }
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/presentationform/savepre',
            data: {
              preData: JSON.stringify(preData),
              nodeId: nodeId
            },
            callback: function (code, message, response) {
              _this.$message({message: '操作保存成功', type: 'success'});
            }
          });
        },
        close: function () {
          this.$options.ncmpobj.close();
        },
        fomatData: function (row, column, cellValue) { // 表格数据转码
          if (column.property == 'prodState') {
            return yufp.lookup.convertKey('PROD_STATE', cellValue);
          } else if (column.property == 'money') {
            return yufp.lookup.convertKey('JYBZ', cellValue);
          } else if (column.property == 'riskLevel') {
            return yufp.lookup.convertKey('RISK-LEVEL', cellValue);
          } else if (column.property == 'ifSuccess') {
            return yufp.lookup.convertKey('YESNO', cellValue);
          } else if (column.property == 'custType') {
            return yufp.lookup.convertKey('CUST_TYPE', cellValue);
          }
        }
      },
      mounted: function () {
        var _this = this;
        yufp.lookup.bind('RUN_CONNECT_TYPE', function (data) {
          _this.sendOptions = data;
        });
        if (_this.$options.ncmpobj.instanceObj == undefined) {
          _this.buttonHiden = true;
        } else {
          _this.buttonHiden = false;
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/presentationform/getpre',
            data: {
              nodeId: _this.$options.ncmpobj.instanceObj.nodeId
            },
            callback: function (code, message, response) {
              var from = response.data;
              for (var i = 0; i < from.length; i++) {
                // for (var j = 0; j < _this.$refs.myform.fields.length; j++) {
                if (from[i].formOperationFiled == 'beginTime') {
                  _this.model.beginTime = new Date(from[i].formOperationVal.replace(/-/g, '/'));
                } else if (from[i].formOperationFiled == 'endTime') {
                  _this.model.endTime = new Date(from[i].formOperationVal.replace(/-/g, '/'));
                } else if (from[i].formOperationFiled == 'marketHurdles') {
                  _this.model.marketHurdles = from[i].formOperationVal;
                }
                // }
              }
            }
          });
          var flowId = _this.$options.ncmpobj.instanceObj.flowId;
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/presentationform/getplan',
            data: {
              flowId: flowId
            },
            callback: function (code, message, response) {
              if (response.data != null) {
                _this.actionType = response.data.activityType;
                if (response.data.activityType == '02') { // 事件引擎
                  var param = {
                    condition: JSON.stringify({
                      runConnectType: 'DEAL',
                      actionType: 'PRODUCT',
                      nodeId: _this.$options.ncmpobj.instanceObj.nodeId
                    })
                  };
                  yufp.service.request({
                    method: 'GET',
                    url: backend.adminService + '/api/cmfrcruleresultresource/getmegout',
                    data: param,
                    callback: function (code, message, response) {
                      var info = response.data;
                      _this.proTableData = info;
                    }
                  });
                  yufp.service.request({
                    method: 'GET',
                    url: backend.adminService + '/api/cmfrcruleresultresource/getmegin',
                    data: param,
                    callback: function (code, message, response) {
                      var info = response.data;
                      _this.proInTableData = info;
                    }
                  });
                } else if (response.data.activityType == '01') { // 模型应用
                  yufp.service.request({
                    method: 'GET',
                    url: backend.adminService + '/api/presentationform/getchanneliteminandout',
                    data: {
                      flowId: flowId,
                      nodeId: _this.$options.ncmpobj.instanceObj.nodeId
                    },
                    callback: function (code, message, response) {
                      if (response.data != null) {
                        var info = response.data;
                        _this.custGroupTableData = info.cust;
                        _this.proInTableData = info.prod;
                        _this.proTableData = info.out;
                      };
                    }
                  });
                }
              };
            }
          });
        }
      },
      destroyed: function () {
        console.log('yufp.custom.vue---query.js---destroyed');
      }
    });
  };

  /**
	 * 页面销毁时触发destroy方法
	 * @param id 路由ID
	 * @param cite 页面站点信息
	 */
  exports.destroy = function (id, cite) {
    console.log('exports.destroy---query.js---destroy');
  };
});