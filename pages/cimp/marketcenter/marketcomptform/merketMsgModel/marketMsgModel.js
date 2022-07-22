/**
 * @created by hujun3 on 2019/03/21.
 * @description 营销组件FORM表单-营销动作组件
 */
define(['./custom/widgets/js/yufpMktModelSelector.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('APPLY_TYPE,YESNO');
    yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        return {
          activeNames: ['1', '2', '3'],
          activeName1: 'person',
          formdata: {
            modelInfos: ''
          },
          ids: [],
          formOperationVals: [],
          custGroupTableData: [],
          modelInfoTableData: [],
          tableData: [],
          buttonHiden: true // 操作表单按钮显示与否
        };
      },
      methods: {
        selectionChangeFn: function (val) {
          this.$refs.modelInfosTable.selections = val;
        },
        deleteSelecedFn: function () {
          var _this = this;
          var selections = _this.$refs.modelInfosTable.selections;
          var len = _this.modelInfoTableData.length;
          // if (selections.length != 1) {
          //   _this.$message({ message: '请先选择一条记录', type: 'warning' });
          //   return;
          // }
          // for (var i = 0; i < len; i++) {
          //   if (selections[0].id == _this.modelInfoTableData[i].id) {
          //     _this.modelInfoTableData.splice(i, 1);
          //     break;
          //   }
          // }
          // for (var s = 0; s < _this.ids.length; s++) {
          //   if (selections[0].id == _this.ids[s]) {
          //     _this.ids.splice(i, 1);
          //     break;
          //   }
          // }
          for (let i = 0; i < selections.length; i++) {
            for (let j = 0; j < len; j++) {
              if (selections[i].id == _this.modelInfoTableData[j].id) {
                _this.modelInfoTableData.splice(j, 1);
                break;
              }
            }
          }
          for (let i = 0; i < selections.length; i++) {
            for (let j = 0; j < _this.ids.length; j++) {
              if (selections[i].id == _this.ids[j]) {
                _this.ids.splice(j, 1);
                break;
              }
            }
          }
          if (selections.length > 0) {
            _this.$message("点击保存后生效");
          }
        },


        selectBackFn: function (data) {
          var _this = this;
          // for (var i = 0; i < data.length; i++) {
          //   _this.modelInfoTableData.push(data[i]);
          //   _this.ids.push(data[i].id);
          // }
          // console.log("data", data.length);
          // console.log("_this.modelInfoTableData", _this.modelInfoTableData.length);
          if (_this.modelInfoTableData.length != 0) {
            //去除重复数据
            for (let j = 0; j < _this.modelInfoTableData.length; j++) {
              for (let i = 0; i < data.length; i++) {
                if (data[i].id == _this.modelInfoTableData[j].id) {
                  data.splice(i, 1);
                  break;
                }
              }
            }
            // console.log("data--->", data.length);
            //添加进数组
            for (var i = 0; i < data.length; i++) {
              _this.modelInfoTableData.push(data[i]);
              _this.ids.push(data[i].id);
            }
          } else {
            for (var i = 0; i < data.length; i++) {
              _this.modelInfoTableData.push(data[i]);
              _this.ids.push(data[i].id);
            }
          }

        },
        saveFn: function () {
          var _this = this;
          var validate = false;
          this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var nodeId = this.$options.ncmpobj.instanceObj.nodeId;
          var preData = [];
          var preObj = {};
          preObj.formOperationFiled = 'modelInfos';// 'beginTime';
          preObj.formOperationVal = _this.ids.join(',');
          preData.push(preObj);
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/presentationform/savepre',
            data: {
              preData: JSON.stringify(preData),
              nodeId: nodeId
            },
            callback: function (code, message, response) {
              _this.$message({ message: '操作保存成功', type: 'success' });
            }
          });
        },
        close: function () {
          this.$options.ncmpobj.close();
        },
        fomatData: function (row, column, cellValue) { // 表格数据转码
          if (column.property == 'applyType') {
            return yufp.lookup.convertKey('APPLY_TYPE', cellValue);
          } else if (column.property == 'isEnable') {
            return yufp.lookup.convertKey('YESNO', cellValue);
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
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/presentationform/getpre',
            data: {
              nodeId: _this.$options.ncmpobj.instanceObj.nodeId
            },
            callback: function (code, message, response) {
              var from = response.data;
              for (var i = 0; i < from.length; i++) {

                if (from[i].formOperationFiled == 'modelInfos') {
                  var idInfo = from[i].formOperationVal;

                  if (idInfo.indexOf(',') > -1) {
                    //let modelIds = idInfo.splice(',');
                    let modelIds = idInfo.split(',');
                    _this.formOperationVals = modelIds;
                    for (let i = 0; i < modelIds.length; i++) {
                      _this.ids.push(modelIds[i]);

                    }
                  } else {
                    _this.ids.push(idInfo);
                  }

                  // yufp.service.request({// 查询具体的模板信息，更具操作选择的模板编号
                  //   method: 'GET',
                  //   url: backend.adminService + '/api/cmfrcsystype/listbynodeid?modelId=' + from[i].formOperationVal,
                  //   callback: function (code, message, response) {
                  //     if (response.data != null) {
                  //       var info = response.data;
                  //       _this.modelInfoTableData = info;
                  //     };
                  //   }
                  // });
                }
              }
              for (let i = 0; i < _this.ids.length; i++) {
                yufp.service.request({// 查询具体的模板信息，更具操作选择的模板编号
                  method: 'GET',
                  url: backend.adminService + '/api/cmfrcsystype/listbynodeid?modelId=' + _this.ids[i],
                  callback: function (code, message, response) {
                    if (response.data != null) {
                      var info = response.data[0];
                      //_this.modelInfoTableData = info
                      _this.modelInfoTableData.push(info);

                    };
                  }
                });
              }
            }
          });
          var flowId = _this.$options.ncmpobj.instanceObj.flowId;
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
              };
            }
          });
          yufp.service.request({// 查询具体的模板信息，更具操作选择的模板编号
            method: 'GET',
            url: backend.adminService + '/api/cmfrcsystype/listbynodeid？nodeId=' + _this.$options.ncmpobj.instanceObj.nodeId,
            callback: function (code, message, response) {
              if (response.data != null) {
                var info = response.data;
                _this.modelInfoTableData = info;
              };
            }
          });
        }
      },
      destroyed: function () {
      }
    });
  };

  /**
   * 页面销毁时触发destroy方法
   * @param id 路由ID
   * @param cite 页面站点信息
   */
  exports.destroy = function (id, cite) {
  };
});