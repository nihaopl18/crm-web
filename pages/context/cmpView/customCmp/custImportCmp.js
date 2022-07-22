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
    yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE,CUST_LEVEL,CLIENT_ORIGIN');
    var ynFlag = true;
    var vm = yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        var _self = this;
        return {
          activeNames: ['1', '2'],
          // 搜索重置按钮
          queryButtons: [{
            label: '保存',
            op: 'submit',
            type: 'primary',
            icon: 'search',
            click: function (model, valid) {
              if (!ynFlag) {
                _self.$message({ message: '请先选择一条客户来源为手动添加或模板导入的客户群', type: 'warning' });
                return;
              }
              var param1 = { condition: JSON.stringify({ custGroupIds: custgrouid }) };
              yufp.service.request({
                url: backend.adminService + '/api/cimpccgbaseinfo/listcmp',
                method: 'get',
                data: param1,
                async: false,
                callback: function (code, message, response) {
                  if (response.data[0].custOrigin == '1' || response.data[0].custOrigin == '3') { // 判断客户来源是否为手动添加或模板导入
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
                  } else {
                    _self.$message({ message: '请先选择一条客户来源为手动添加或模板导入的客户群', type: 'warning' });
                    return;
                  }
                }
              });
            }
          }, {
            label: '导入客户',
            op: 'submit',
            type: 'primary',
            icon: 'upload',
            click: function (model, valid) {
              if (valid) {
                var num = model.custGroupIds.split(',').length;
                if (num != 1 || model.custGroupIds.length < 4) {
                  _self.$message({ message: '请先选择一条客户群类型为手动添加或模板导入的客户群', type: 'warning' });
                  ynFlag = false;
                  return;
                }
                ynFlag = true;
                var param = { condition: JSON.stringify(model) };
                yufp.service.request({
                  url: backend.adminService + '/api/cimpccgbaseinfo/listcmp',
                  method: 'get',
                  data: param,
                  async: false,
                  callback: function (code, message, response) {
                    if (response.data[0].custOrigin == '1' || response.data[0].custOrigin == '3') { // 判断客户来源是否为手动添加或模板导入
                      _self.uploadDialog = true;
                      _self.uploaddata.custGroupId = model.custGroupIds;
                    } else {
                      _self.$message({ message: '请先选择一条客户来源为手动添加或模板导入的客户群', type: 'warning' });
                    }
                  }
                });
              }
            }
          }],
          // 客户信息字段展示
          tableColumnsCust: [
            { label: '客户类型', prop: 'custType', width: '100', dataCode: 'CUST_TYPE', resizable: true },
            { label: '客户状态', prop: 'custStat', width: '100', dataCode: 'CUST_STAT', resizable: true },
            { label: '客户编号', prop: 'custId', resizable: true },
            { label: '客户名称', prop: 'custName', width: '200', resizable: true },
            { label: '证件类型', prop: 'identType', dataCode: 'IDENT_TYPE', resizable: true },
            { label: '证件号码', prop: 'identNo', resizable: true },
            // { label: '主协办类型', prop: 'mainType', resizable: true },
            // { label: '归属机构', prop: 'belongOrg', resizable: true },
            { label: '归属客户经理', prop: 'belongMgr', resizable: true },
            // { label: 'AUM时点', prop: 'belongMgr', resizable: true },
            // { label: '贷款余额时点', prop: 'belongMgr', resizable: true },
            // { label: '存款余额时点', prop: 'belongMgr', resizable: true },
            // { label: '存款年日均', prop: 'belongMgr', resizable: true },
            // { label: '贷款年日均', prop: 'belongMgr', resizable: true },
            // { label: '上月存款贡献度', prop: 'belongMgr', resizable: true },
            // { label: '上月贷款贡献度', prop: 'belongMgr', resizable: true },
            // { label: '上月中间业务贡献', prop: 'belongMgr', resizable: true },
            // { label: '上月综合贡献度', prop: 'belongMgr', resizable: true },
            // { label: '中间业务持有产品数量', prop: 'belongMgr', resizable: true },
            // { label: '客户价值等级', prop: 'worthLevel', resizable: true, dataCode: 'CUST_LEVEL' },
            // { label: '客户服务等级', prop: 'belongMgr', resizable: true }
          ],
          // 客户群信息字段展示
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
                var num = val.split(',').length;
                if (num != 1 || val.length < 4) {
                  _self.$message({ message: '请先选择一条客户群类型为手动添加或模板导入的客户群', type: 'warning' });
                  ynFlag = false;
                  return;
                }
                ynFlag = true;
                var param1 = { condition: JSON.stringify({ custGroupIds: val }) };
                yufp.service.request({
                  url: backend.adminService + '/api/cimpccgbaseinfo/listcmp',
                  method: 'get',
                  data: param1,
                  async: false,
                  callback: function (code, message, response) {
                    if (response.data[0].custOrigin == '1' || response.data[0].custOrigin == '3') { // 判断客户来源是否为手动添加或模板导入
                      var param = { condition: JSON.stringify({ custGroupIds: val }) };
                      _self.$refs.reftable.remoteData(param);
                      _self.$refs.reftableCust.remoteData(param);
                    } else {
                      _self.$message({ message: '请先选择一条客户来源为手动添加或模板导入的客户群', type: 'warning' });
                      return;
                    }
                  }
                });
              }
            }
          ],
          /** 设置弹出框属性，高度，是否显示，显示类型，标题 */
          uploadTitle: 'Excel表导入客户', // 上传弹出框标题
          fileList: [],
          uploadDialog: false, // 上传弹出框设置为隐藏
          action: yufp.service.getUrl({ // 上传地址
            url: backend.adminService + '/api/cimpccgbaseinfo/uploadtable'
          }),
          headers: { // 上传请求头部，需要加身份验证
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          uploaddata: { // 上传附带客户群编号和是否为全量标志
            custGroupId: '',
            flag: '0'
          },
          Url: backend.adminService + '/api/cimpccgbaseinfo/listcmp', // 查询客户群
          custUrl: backend.adminService + '/api/acimfcicustomer/listcmp', // 查询客户
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
              var formparam = { condition: JSON.stringify({ custGroupIds: response.data.formInVal }) };
              _self.$refs.reftable.remoteData(formparam);
              _self.$refs.reftableCust.remoteData(formparam);
            }
          }
        });
      },
      methods: {
        // 客户导入模板下载
        // downTable: function (row, event) {
        //   debugger;
        //   yufp.util.download(backend.fileService + '/api/file/provider/download?fileId=' + 'excel/duigong.xlsx');

        // var url = backend.fileService + '/api/file/provider/download?fileId=' + 'group1/M00/00/0E/wKj7l1vyVkmAGiQAAAAmjx5H3gs47.xlsx';
        // yufp.util.download(url);
        // },
        downTable: function () {
          var url = yufp.settings.ssl ? 'https://' : 'http://';
          url += yufp.settings.url;
          url += backend.fileService;
          url += '/api/material/downloadByPath?path=excel/客户导入模板.xlsx';
          yufp.util.download(url);
        },
        // 导入客户
        uplodTable: function (row, event) {
          var _this = this;
          var selections = _this.$refs.reftable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].custOrigin == 2) {
            _this.$message({ message: '不能选择客户来源为自动筛选的', type: 'warning' });
            return;
          }
          _this.uploaddata.custGroupId = selections[0].custGroupId;
          _this.uploadDialog = true;
        },
        // 上传之前判断文件格式
        beforeAvatarUpload: function (file) {
          var regex = /^.*\.(?:xls|xlsx)$/i;
          if (!regex.test(file.name)) {
            this.$message.error('只能导入xls或xlsx格式文件!');
            return false;
          }
          return file.name;
        },
        submitUpload: function () {
          this.$refs.verUpload.submit();
          this.uploadDialog = false;
        },
        // 文件上传成功处理逻辑
        onSuccess: function (response, file, fileList) {
          var _self = this;
          // console.log('上传文件', response);
          // alert(response.code);
          if (response.code == -1) {
            _self.$message('文件导入失败!', '提示');
            vm.$refs.verUpload.clearFiles();
            // vm.$refs.accessTables.remoteData();
          } else {
            _self.$message('文件导入成功!', '提示');
            vm.$refs.verUpload.clearFiles();
            var param = {
              condition: JSON.stringify({ custGroupIds: custgrouid })
            };
            _self.$refs.reftable.remoteData(param);
            _self.$refs.reftableCust.remoteData(param);
          }
        },
        onError: function () {
          this.$message('文件导入失败!', '提示');
          vm.$refs.verUpload.clearFiles();
          // vm.$refs.accessTables.remoteData();
        },
        close: function () {
          this.$options.ncmpobj.close();
        }
      }
    });
  };
});