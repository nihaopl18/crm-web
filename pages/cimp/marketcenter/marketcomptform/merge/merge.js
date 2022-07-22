/**
 * @created by houyx3 on 2018/11/16.
 * @description 营销组件FORM表单-流程组件-合并
 */
define(['custom/widgets/js/YufpMgrSelector.js', 'custom/widgets/js/yufpCustGroup.js'], function (require, exports) {
  /**
* 页面加载完成时触发
* @param hashCode 路由ID
* @param data 传递数据对象
* @param cite 页面站点信息
*/
  var custgroupids = '';
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE');
    yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
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
            url: backend.adminService + '/api/cimpccgbaseinfo/checkName',
            method: 'get',
            data: param,
            async: false,
            callback: function (code, message, response) {
              if (response.data == 0) {
                isExist = true;
              }
              if (isExist) {
                callback();
              } else {
                callback(new Error('用户名已经存在!'));
              }
            }
          });
        };
        return {
          datadata: [],
          custgroupvisible: false,
          Url: backend.adminService + '/api/cimpccgbaseinfo/listcmp',
          tableColumns: [
            {label: '客户群编号', prop: 'custGroupId', resizable: true},
            {label: '客户群名称', prop: 'custGroupName', resizable: true},
            {label: '客户来源', prop: 'custOrigin', resizable: true, dataCode: 'CLIENT_ORIGIN'},
            {label: '成员数', prop: 'custNum', resizable: true} ],
          tableColumnsout: [
            {label: '客户群编号', prop: 'custGroupId', resizable: true},
            {label: '客户群名称', prop: 'custGroupName', resizable: true},
            {label: '客户来源', prop: 'custOrigin', resizable: true, dataCode: 'CLIENT_ORIGIN'},
            {label: '成员数', prop: 'custNum', resizable: true} ],
          activeNames: ['1', '2', '3'],
          editFields: [{
            columnCount: 2,
            fields: [
              { field: 'custGroupName', label: '客户群名称', type: 'input', rules: [{required: true, message: '必填项', trigger: 'blur' }, { validator: checkName, trigger: 'blur' }]},
              { label: '备注', field: 'remark', type: 'textarea' }
            ]
          }],
          dialogVisibleAdd: false,
          currentRow: null,
          // tableData: [{
          //   name1: '客户群一',
          //   name2: '50'
          // },
          // {
          //   name1: '客户群一',
          //   name2: '50'
          // }],
          custgroupFields: [{
            fields: [
              {label: '选择客户群', field: 'custgroup', type: 'custom', is: 'yufp-custGroup'
              }
            ]
          }],
          custgroupButtons: [
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' },
            {label: '确定',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  custgroupids = model.custgroup;
                  var param = { condition: JSON.stringify({custGroupIds: model.custgroup}) };
                  yufp.service.request({
                    url: backend.adminService + '/api/cimpccgbaseinfo/listcmp',
                    method: 'get',
                    data: param,
                    async: false,
                    callback: function (code, message, response) {
                      // for (var i = 0; i < response.data.length; i++) {

                      //   _this.datadata.push(response.data[i]);
                      // }
                      _this.custSeletFn(response.data);
                    }
                  });
                  _this.custgroupvisible = false;
                }
              }}
          ],
          custSeletFn: function (data) {
            var _this = this;
            for (var k = 0, len = data.length; k < len; k++) {
              _this.datadata.push(data[k]);
            }
            // 去重操作
            for (var i = 0; i < _this.datadata.length - 1; i++) {
              for (var j = i + 1; j < _this.datadata.length; j++) {
                if (_this.datadata[i].custGroupId == _this.datadata[j].custGroupId) {
                  _this.datadata.splice(j, 1);
                }
              }
            }
          },
          /**
         * 删除客户数据
         */
          deleteFn: function () {
            var selections = _this.$refs.reftable.selections;
            for (var i = 0, len = selections.length; i < len; i++) {
              for (var j = 0, lenc = _this.datadata.length; j < lenc; j++) {
                if (selections[i].custGroupId === _this.datadata[j].custGroupId) {
                  _this.datadata.splice(j, 1);
                }
              }
            }
          },
          addButtons: [
            {label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model, valid) {
                var validate = false;
                _this.$refs.refformAdd.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var ids = _this.$refs.reftable.tabledata;
                var ii = '';
                for (var i = 0; i < ids.length; i++) {
                  if (i == ids.length - 1) {
                    ii += ids[i];
                  } else {
                    ii += ids[i] + ',';
                  }
                };
                var num = ii.split(',').length;
                if (num < 2) {
                  _this.$message({ message: '请选择至少两个客户群进行合并', type: 'warning' });
                  return;
                };
                model.custOrigin = '1';
                model.groupMemberType = '3';
                model.custGroupId = custgroupids;
                model.createOrgan = yufp.session.org.name;
                var custgroup = { condition: JSON.stringify({custGroupName: model.custGroupName, custGroupIds: custgroupids, createOrgan: yufp.session.org.name, nodeid: _this.$options.ncmpobj.instanceObj.nodeId}) };
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/cimpccgbaseinfo/addmerge',
                  data: custgroup,
                  async: false,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$message(response.message);
                      var param3 = { condition: JSON.stringify({custGroupIds: response.data.custGroupId}) };
                      _this.$refs.reftableout.remoteData(param3);
                    }
                  }
                });
              }}
          ]
        };
      },
      methods: {
        loaded: function (data) {
          this.$refs.refformAdd.$refs.custGroupName[0].currentValue = data[0].custGroupName;
        },
        addFn: function () {
          var _this = this;
          _this.custgroupvisible = true;
          _this.$nextTick(function () {
            _this.$refs.custgroupRef.resetFields();
          });
        },
        rowClickFn: function (row) {
          if (this.currentRow && this.currentRow !== row) {
            this.currentRow.edit = false;
          }
          row.edit = true;
          this.currentRow = row;
        },
        saveFn: function () {
          if (this.currentRow) {
            this.currentRow.edit = false;
          }
        }
      },
      mounted: function () {
        var _this = this;
        // _this.$refs.refformAdd.$refs.custGroupName[0].currentValue = '999';
        var nodeid = _this.$options.ncmpobj.instanceObj.nodeId;
        var param = { condition: JSON.stringify({nodeId: nodeid}) };
        yufp.service.request({
          url: backend.adminService + '/api/cmfrcnodeoutput/checknodeid',
          method: 'post',
          data: param,
          async: false,
          callback: function (code, message, response) {
            if (response.data != null) {
              var forminparam = { condition: JSON.stringify({custGroupIds: response.data.formInVal}) };
              // _this.$refs.reftable.remoteData(forminparam);
              yufp.service.request({
                url: backend.adminService + '/api/cimpccgbaseinfo/listcmp',
                method: 'get',
                data: forminparam,
                async: false,
                callback: function (code, message, response) {
                  for (var i = 0; i < response.data.length; i++) {
                    _this.datadata.push(response.data[i]);
                  }
                }
              });
              var formoutparam = { condition: JSON.stringify({custGroupIds: response.data.formOutVal}) };
              _this.$refs.reftableout.remoteData(formoutparam);
            }
          }
        });
      }
    });
  };
});