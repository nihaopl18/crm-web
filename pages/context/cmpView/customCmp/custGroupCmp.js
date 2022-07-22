/**
 * @created by houyx3 on 2018/11/18.
 * @description 查询
 */
var custgrouid = '';
define(['custom/widgets/js/YufpMgrSelector.js', 'custom/widgets/js/yufpCustGroup.js'], function (require, exports) {
  /**
* 页面加载完成时触发
* @param hashCode 路由ID
* @param data 传递数据对象
* @param cite 页面站点信息
*/
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CUST_LEVEL,CLIENT_ORIGIN,ORG_ID');
    yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        var _self = this;
        return {
          activeNames: ['1', '2'],
          aaa: [],
          async: false,
          name: 'asdsad',
          param: {
            GROUP_NO: '0',
            LEVELUNIT: '1'
          },
          // /** 搜索重置按钮 */
          queryButtons: [{
            label: '保存',
            op: 'submit',
            type: 'primary',
            icon: 'upload',
            click: function (model, valid) {
              if (model.custGroupIds.length < 1) {
                _self.$message('请选择至少一条记录');
                return;
              }
              var param1 = { condition: JSON.stringify({ custGroupIds: custgrouid }) };
              yufp.service.request({
                url: backend.adminService + '/api/cimpccgbaseinfo/listcmp',
                method: 'get',
                data: param1,
                async: false,
                callback: function (code, message, response) {
                  for(var i = 0; i<response.data.length;i++){
                    if (response.data[i].custOrigin == '1' || response.data[i].custOrigin == '3') { // 判断客户来源是否为手动添加或模板导入
                     
                    } else {
                      _self.$message({ message: '请先选择一条客户来源为手动添加或模板导入的客户群', type: 'warning' });
                      return;
                    }
                  }
                  var model = {};
                  model.nodeId = _self.$options.ncmpobj.instanceObj.nodeId;
                  model.formInVal = custgrouid;
                  yufp.service.request({
                    url: backend.adminService + '/api/cmfrcnodeinput/save',
                    method: 'post',
                    data: model,
                    async: false,
                    callback: function (code, message, response) {
                      if (response.code == 0) {
                        _self.$message(response.message);
                      }
                    }
                  });
                }
              });
            }
          }],
          tableColumnsCust: [
            { label: '客户类型', prop: 'custType', width: '80', dataCode: 'CUST_TYPE', resizable: true },
            { label: '客户状态', prop: 'custStat', width: '80', dataCode: 'CUST_STAT', resizable: true },
            { label: '客户编号', prop: 'custId', width: '120', resizable: true },
            { label: '客户名称', prop: 'custName', width: '250', resizable: true },
            { label: '联系方式', prop: 'contactNumber', width: '100', resizable: true },
            { label: '证件类型', prop: 'identType', width: '120', dataCode: 'IDENT_TYPE', resizable: true },
            { label: '证件号码', prop: 'identNo', width: '180', resizable: true },
            { label: '客户风险偏好等级', prop: 'riskLevel', width: '120', resizable: true, dataCode: 'CUST_LEVEL' },
            { label: '客户价值等级', prop: 'worthLevel', width: '100', resizable: true, dataCode: 'CUST_LEVEL' },
            { label: '客户服务等级', prop: 'serviceLevel', width: '100', resizable: true, dataCode: 'CUST_LEVEL' },
            { label: '归属机构', prop: 'belongOrg', width: '120', resizable: true, dataCode: 'ORG_ID' },
            { label: '归属客户经理', prop: 'belongMgr', width: '120', resizable: true }
          ],
          tableColumns: [
            { label: '客户群编号', prop: 'custGroupId', resizable: true },
            { label: '客户群名称', prop: 'custGroupName', resizable: true },
            { label: '客户来源', prop: 'custOrigin', resizable: true, dataCode: 'CLIENT_ORIGIN' },
            { label: '成员数', prop: 'numCust', resizable: true }],
          queryFields: [
            {
              placeholder: '客户群名称',
              field: 'custGroupIds',
              type: 'custom',
              is: 'yufp-custGroup',
              change: function (val) {
                custgrouid = val;
                var param1 = { condition: JSON.stringify({ custGroupIds: val }) };
                // yufp.service.request({
                //   url: backend.adminService + '/api/cimpccgbaseinfo/listcmp',
                //   method: 'get',
                //   data: param1,
                //   async: false,
                //   callback: function (code, message, response) {
                //     if (response.data[0].custOrigin == '1' || response.data[0].custOrigin == '3') { // 判断客户来源是否为手动添加或模板导入
                //       var param = { condition: JSON.stringify({custGroupIds: val}) };
                //       //_self.$refs.reftable.remoteData(param);
                //       //_self.$refs.reftableCust.remoteData(param);
                //     } else {
                //       _self.$message({ message: '请选择客户来源为手动添加或模板导入的客户群', type: 'warning' });
                //       return;
                //     }
                //   }
                // });
                var param = { condition: JSON.stringify({ custGroupIds: val }) };
                _self.$refs.reftable.remoteData(param);
                _self.$refs.reftableCust.remoteData(param);
              }
            }
          ],
          /** 设置弹出框属性，高度，是否显示，显示类型，标题 */
          pre: false,
          Url: backend.adminService + '/api/cimpccgbaseinfo/listcmp',
          custUrl: backend.adminService + '/api/acimfcicustomer/listcmp',
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        };
      },
      mounted: function () {
        var _self = this;
        var nodeid = _self.$options.ncmpobj.instanceObj.nodeId;
        var param = { condition: JSON.stringify({ nodeId: nodeid }) };
        yufp.service.request({
          url: backend.adminService + '/api/cmfrcnodeinput/checknodeid',
          method: 'post',
          data: param,
          async: false,
          callback: function (code, message, response) {
            if (response.data != null) {
              // var formparam = { condition: JSON.stringify({custGroupIds: response.data.formInVal}) };
              _self.$refs.searchForm.fm.custGroupIds = response.data.formInVal;
              //_self.$refs.reftable.remoteData(formparam);
              //_self.$refs.reftableCust.remoteData(formparam);
              // _self.pre = true;
            }
          }
        });
      },
      methods: {
        // loaded: function (data) {
        //   this.aaa = data;
        //   this.$refs.searchForm.$refs.custGroupIds[0].custgroupdata = this.aaa;
        // },
        save: function () {
          var model = {};
          var _self = this;
          model.nodeId = _self.$options.ncmpobj.instanceObj.nodeId;
          model.formInVal = custgrouid;
          yufp.service.request({
            url: backend.adminService + '/api/cmfrcnodeinput/save',
            method: 'post',
            data: model,
            async: false,
            callback: function (code, message, response) {
              if (response.code == 0) {
                _self.$message(response.message);
              }
            }
          });
        }
      }
    });
  };
});