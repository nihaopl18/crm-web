/**
 * @author houyx3
 * @since 2018/07/13.
 * @description 客户群基本信息
 */
define(function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  exports.ready = function (hashCode, data, cite) {
    var clientInfo = data;
    yufp.lookup.reg('CLIENT_ORIGIN,CLIENT_TYPE,SHARED_SCOPE,IDENT_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        var checkName = function (rule, value, callback) {
          var isExist = true;
          var param = {
            condition: JSON.stringify({
              custGroupName: _this.$refs.clientsbaseInfo.formModel.custGroupName,
              custGroupId: _this.$refs.clientsbaseInfo.formModel.custGroupId
            })
          };
          yufp.service.request({
            url: backend.adminService + '/api/ocrmfcicgbase/checkUpName',
            method: 'get',
            data: param,
            async: false,
            callback: function (code, message, response) {
              if (response.data != 0) {
                isExist = false;
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
          // Url: backend.adminService + '/api/cimpccgbaseinfo/list',
          /** 查询字段 */
          queryFields: [
            {placeholder: '客户号', field: 'custId', type: 'input'}
          ],
          /** 搜索按钮 */
          queryButtons: [
            {label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _this.$refs.reftable.remoteData(param);
                }
              }}
          ],
          // 客户群基本信息
          editFields: [{
            columnCount: 2,
            fields: [
              { field: 'custGroupId', label: '客户群编号', type: 'input', disabled: true},
              { field: 'custGroupName', label: '客户群名称', type: 'input', rules: [{required: true, message: '必填项', trigger: 'blur' }, { validator: checkName, trigger: 'blur' }]},
              { field: 'custOrigin', label: '客户来源', type: 'select', dataCode: 'CD0340', disabled: true},
              { field: 'groupMemberType', label: '群成员类型', type: 'select', dataCode: 'CD0339', disabled: true},
              { field: 'custNum', label: '群成员数', type: 'input', disabled: true},
              { field: 'userName', label: '创建人', type: 'input', disabled: true},
              { field: 'orgName', label: '创建机构', type: 'input', disabled: true},
              { field: 'createDate', label: '创建时间', type: 'date', format: 'yyyy-MM-dd', disabled: true}
            ]
          }, {
            columnCount: 1,
            fields: [
              { field: 'remark', label: '客户群描述', placeholder: '2000个字符以内', type: 'textarea', rows: 6 }
            ]
          }],
          buttons: [
            {label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var obj = {};
                obj.custGroupId = model.custGroupId;
                obj.custGroupName = model.custGroupName;
                obj.markePro = model.markePro;
                obj.remark = model.remark;
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/ocrmfcicgbase/updateFun',
                  data: obj,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$message(response.message);
                    }
                  }
                });
              }}
          ]
        };
      },
      mounted: function () {
        var _this = this;
        _this.onfun();
      },
      methods: {
        onfun: function () {
          var _this = this;
          var obj = clientInfo.clientInfo;
          var obj1 = {};
          obj1.custGroupId = obj.custGroupId;
          var baseParam = {condition: JSON.stringify({groupId: obj.custGroupId})};
          // 请求客户群基本信息
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/ocrmfcicgbase/getcustgroupinfo',
            data: baseParam,
            callback: function (code, message, response) {
              if (code == 0) {
                // baseinfo = response.data;
                yufp.extend(_this.$refs.clientsbaseInfo.formModel, response.data);
              }
            }
          });
        }
      }
    });
  };
});