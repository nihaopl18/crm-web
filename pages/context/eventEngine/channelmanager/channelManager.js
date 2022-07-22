/**
 * Created by yangxiao2 2018-11-14
 * 渠道管理 update cl
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // var mktSetOptions = [
    //   {key: 0, value: '轮播图片'},
    //   {key: 1, value: '图片'},
    //   {key: 2, value: '组合图片'},
    //   {key: 3, value: '图文'},
    //   {key: 4, value: '文本'},
    //   {key: 5, value: '主题优选'},
    //   {key: 6, value: '产品优选'},
    //   {key: 7, value: '猜你喜欢'},
    //   {key: 8, value: '智慧投资'},
    //   {key: 9, value: '栏目组合'}
    // ];
    yufp.lookup.reg('RUN_CONNECT_TYPE,MESSAGE_TYPE_MARKING,CONNECT_TYPE,MKT_SET_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          queryFields: [
            { placeholder: '渠道名称', field: 'channelName', type: 'input' }
          ],
          queryButtons: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _self.$refs.reftable.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          tableColumns: [
            // { label: '渠道编号', prop: 'channelId', width: '150' },
            { label: '渠道名称', prop: 'channelName' },
            { label: '对接方式', prop: 'runConnectType', dataCode: 'RUN_CONNECT_TYPE', width: '90' },
            { label: '创建人', prop: 'creatUserName', width: '100' },
            { label: '创建时间', prop: 'creatDate', width: '98' },
            { label: '最近维护人', prop: 'updataUserName', width: '100' },
            { label: '最近维护时间', prop: 'updataDate', width: '98' }
          ],
          tableColumnsMkt: [

            { label: '营销位', prop: 'mktSet' },
            { label: '栏位类型', prop: 'mktSetType', dataCode: 'MKT_SET_TYPE' },
            { label: '栏位尺寸', prop: 'mktSetSize' }
          ],
          // 维护界面
          updateFields: [
            {
              columnCount: 1,
              fields: [
                {
                  field: 'channelName',
                  label: '渠道名称',
                  type: 'input',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'isSet',
                  label: '是否含有营销位',
                  type: 'radio',
                  options: [{ key: '0', value: '否' }, { key: '1', value: '是' }],
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                }
              ]
            }
          ],
          // 维护保存
          buttons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisible = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.reform.validate(function (valid) {
                  console.log("valid:", valid);
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                model = { channelName: model.channelName, isSet: model.isSet };
                // 判断操作类型
                if (_self.viewType == 'ADD') {
                  // 新增
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cmfrcchannelmgr/insertlist',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.dialogVisible = false;
                        _self.$message({ message: response.message });
                        _self.$refs.reftable.remoteData();
                      } else {
                        _self.dialogVisible = false;
                        _self.$message({ message: response.message, type: 'warning' });
                      }
                    }
                  });
                } else if (_self.viewType == 'EDIT') {
                  var obj = _self.$refs.reftable.selections[0];
                  model = yufp.extend(obj, model);
                  // var model = _self.$refs.reform.model;
                  // 更新
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cmfrcchannelmgr/updatelist',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.dialogVisible = false;
                        _self.$message({ message: response.message });
                        _self.$refs.reftable.remoteData();
                      } else {
                        _self.dialogVisible = false;
                        _self.$message({ message: response.message, type: 'warning' });
                        _self.$refs.reftable.remoteData();
                      }
                    }
                  });
                } else {
                  _self.$message({ message: '操作错误', type: 'warning' });
                  _self.dialogVisible = false;
                }
              }
            }
          ],
          // 批量文件维护
          updateFieldsFile: [
            {
              columnCount: 2,
              fields: [
                { field: 'channelName', label: '渠道名称', type: 'input', disabled: true },
                {
                  field: 'connectType',
                  label: '连接协议',
                  type: 'select',
                  dataCode: 'CONNECT_TYPE',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                }
              ]
            },
            {
              columnCount: 1,
              fields: [
                {
                  field: 'fileServerPath',
                  label: '文件服务器地址',
                  type: 'input',
                  placeholder: 'ftp://XXX.XXX.XXX.XXX/upload',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'fileServerName',
                  label: '服务器文件名',
                  type: 'input',
                  placeholder: 'markting_YYYY_MM_DD_HH24_mm_ss_OK.txt',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'fileServerLogin',
                  label: '文件服务器账号',
                  type: 'input',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'fileServerPswd',
                  label: '文件服务器密码',
                  type: 'password',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                }
              ]
            }
          ],
          // 批量文件保存
          buttonsFile: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisibleConnect = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.reformFile.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                // 创建匹配文件服务器地址的正则表达式
                var fileServerPathReg = /ftp:\/\/\d{3}\.\d{3}\.\d{3}\.\d{3}\/upload/;
                // 创建匹配服务器文件名的正则表达式
                var fileServerNameReg = /markting_\d{4}_\d{2}_\d{2}_\d{2}_\d{2}_\d{2}_OK.txt/;
                var flag = true;
                var messageFile = '';
                if (!fileServerPathReg.test(model.fileServerPath)) {
                  flag = false;
                  messageFile = '文件服务器地址格式错误';
                }
                if (!fileServerNameReg.test(model.fileServerName)) {
                  flag = false;
                  messageFile = '服务器文件名格式错误';
                }
                if (flag) {
                  // 输入格式正确更新
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cmfrcchannelmgr/updatelist',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.dialogVisibleConnect = false;
                        _self.$message({ message: response.message });
                        _self.$refs.reftable.remoteData();
                      } else {
                        _self.dialogVisibleConnect = false;
                        _self.$message({ message: response.message, type: 'warning' });
                      }
                    }
                  });
                } else {
                  _self.$message({ message: messageFile, type: 'warning' });
                }
              }
            }
          ],
          // 联机交易维护
          updateFieldsDeal: [
            {
              columnCount: 2,
              fields: [
                { field: 'channelName', label: '渠道名称', type: 'input', disabled: true },
                {
                  field: 'messageType',
                  label: '报文格式',
                  type: 'select',
                  dataCode: 'MESSAGE_TYPE_MARKING',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                }
              ]
            },
            {
              columnCount: 1,
              fields: [
                {
                  field: 'dealPath',
                  label: '交易接口地址',
                  type: 'input',
                  placeholder: 'http://XXX.XXX.XXX.XXX/sengdo',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                },
                {
                  field: 'dealMessgae',
                  label: '交易接口报文',
                  type: 'textarea',
                  row: 4,
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                }
              ]
            }
          ],
          // 联机交易保存
          buttonsDeal: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisibleConnect = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.reformDeal.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                // 创建匹配文件服务器地址的正则表达式
                var dealPathReg = /http:\/\/\d{3}\.\d{3}\.\d{3}\.\d{3}\/sengdo/;
                var flag = true;
                var messageFile = '';
                if (!dealPathReg.test(model.dealPath)) {
                  flag = false;
                  messageFile = '交易接口地址格式错误';
                }
                if (flag) {
                  // 输入格式正确更新
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cmfrcchannelmgr/updatelist',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.dialogVisibleConnect = false;
                        _self.$message({ message: response.message });
                        _self.$refs.reftable.remoteData();
                      } else {
                        _self.dialogVisibleConnect = false;
                        _self.$message({ message: response.message, type: 'warning' });
                      }
                    }
                  });
                } else {
                  _self.$message({ message: messageFile, type: 'warning' });
                }
              }
            }
          ],
          // 渠道对接方式切换维护
          updateFieldsChange: [
            {
              columnCount: 1,
              fields: [
                { field: 'channelName', label: '渠道名称', type: 'input', disabled: true },
                {
                  field: 'runConnectType',
                  label: '对接方式',
                  type: 'select',
                  dataCode: 'RUN_CONNECT_TYPE',
                  rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                }
              ]
            }
          ],
          // 渠道对接方式切换保存
          buttonsChange: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisibleChange = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.reformChange.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var flag = true;
                console.log("model,", model)
                var messageFile = '';
                if (flag) {
                  // 输入格式正确更新
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cmfrcchannelmgr/updatelist',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.dialogVisibleChange = false;
                        _self.$message({ message: response.message });
                        _self.$refs.reftable.remoteData();
                      } else {
                        _self.dialogVisibleChange = false;
                        _self.$message({ message: response.message, type: 'warning' });
                      }
                    }
                  });
                } else {
                  _self.$message({ message: messageFile, type: 'warning' });
                }
              }
            }
          ],
          // 营销位维护
          updateFieldsMktSet: [
            {
              columnCount: 2,
              fields: [
                { field: 'mktSet', label: '营销位', type: 'input' },
                { field: 'mktSetType', label: '栏位类型', type: 'select', dataCode: 'MKT_SET_TYPE' }
              ]
            },
            {
              columnCount: 2,
              fields: [
                { field: 'sizeWidth', label: '栏位尺寸', placeholder: '宽', type: 'input' },
                { field: 'sizeHeight', placeholder: '高', type: 'input' }
              ]
            }
          ],
          // 营销位保存
          buttonsMktSet: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisibleMktSet = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.reformMktSet.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                if (_self.titleMktSet == '新增') {
                  model.channelId = _self.$refs.reftable.selections[0].channelId;
                  model.mktSetSize = model.sizeWidth + '*' + model.sizeHeight;
                  yufp.service.request({
                    method: 'POST',
                    data: model,
                    url: '/api/mktposition/setinsert',
                    callback: function (code, data, response) {
                      if (code == 0) {
                        _self.dialogVisibleMktSet = false;
                        _self.$refs.reftableMkt.remoteData(_self.mktParam);
                        _self.$message({ message: response.message });
                      }
                    }
                  });
                } else {
                  model.mktSetSize = model.sizeWidth + '*' + model.sizeHeight;
                  yufp.service.request({
                    method: 'POST',
                    data: model,
                    url: '/api/mktposition/setupdate',
                    callback: function (code, data, response) {
                      if (code == 0) {
                        _self.dialogVisibleMktSet = false;
                        _self.$refs.reftableMkt.remoteData(_self.mktParam);
                        _self.$message({ message: '修改成功' });
                      }
                    }
                  });
                }
              }
            }
          ],
          titleConnect: '渠道对接方式',
          titleChange: '渠道对接方式切换',
          titleMkt: '营销位管理',
          titleMktSet: '新增',
          mktParam: {},
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          dialogVisibleConnect: false,
          dialogVisibleChange: false,
          dialogVisibleMkt: false,
          dialogVisibleMktSet: false,
          formDisabled: false,
          activeName: 'first',
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        };
      },
      methods: {
        /**
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        * */
        switchStatus: function (viewType, editable) {
          var _self = this;
          _self.dialogVisible = true;
          _self.viewType = viewType;
          _self.buttons[1].hidden = !editable;
          _self.formDisabled = !editable;
        },
        addFn: function () {
          var _self = this;
          _self.switchStatus('ADD', true);
          _self.$nextTick(function () {
            _self.$refs.reform.resetFields();
            // 回显新增字段
            var date = new Date();
            _self.$refs.reform.formModel.createUserName = yufp.session.userName;
            _self.$refs.reform.formModel.updataUserName = yufp.session.userName;
            _self.$refs.reform.formModel.creatDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            _self.$refs.reform.formModel.updataDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          });
        },
        modifyFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            var obj = this.$refs.reftable.selections[0];
            console.log("obj:", obj)
            yufp.extend(this.$refs.reform.formModel, obj);
            console.log("this.$refs.reform.formModel:", this.$refs.reform.formModel)
          });
        },
        deleteFn: function () {
          var _self = this;
          var selection = _self.$refs.reftable.selections[0];
          if (_self.$refs.reftable.selections.length < 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _self.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            var arr = [];
            var itemId = [];
            for (var i = 0; i < _self.$refs.reftable.selections.length; i++) {
              arr[i] = _self.$refs.reftable.selections[i].channelId;
              itemId[i] = _self.$refs.reftable.selections[i].channelItemId;
            }
            selection.channelId = arr.join(',');
            selection.channelItemId = itemId.join(',');
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cmfrcchannelmgr/deletelist',
              data: selection,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _self.dialogVisible = false;
                  _self.$message({ message: response.message });
                  _self.$refs.reftable.remoteData();
                } else {
                  _self.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          });
        },
        connectFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.dialogVisibleConnect = true;
          this.$nextTick(function () {
            this.$refs.reformFile.resetFields();
            this.$refs.reformDeal.resetFields();
            var obj = this.$refs.reftable.selections[0];
            yufp.extend(this.$refs.reformFile.formModel, obj);
            yufp.extend(this.$refs.reformDeal.formModel, obj);
          });
        },
        changeFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.dialogVisibleChange = true;
          this.$nextTick(function () {
            var obj = this.$refs.reftable.selections[0];
            yufp.extend(this.$refs.reformChange.formModel, obj);
          });
        },
        mktSetFn: function () {
          var _self = this;
          if (_self.$refs.reftable.selections.length != 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (_self.$refs.reftable.selections[0].isSet == '0') {
            _self.$message({ message: '选择的渠道不含有营销位', type: 'warning' });
            return;
          }
          _self.dialogVisibleMkt = true;
          _self.mktParam = { channelId: _self.$refs.reftable.selections[0].channelId };
          _self.$nextTick(function () {
            _self.$refs.reftableMkt.remoteData(_self.mktParam);
          });
        },
        addMktFn: function () {
          var _self = this;
          _self.titleMktSet = '新增';
          _self.dialogVisibleMktSet = true;
        },
        modifyMktFn: function () {
          var _self = this;
          if (_self.$refs.reftableMkt.selections.length != 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _self.titleMktSet = '修改';
          _self.$nextTick(function () {
            var obj = _self.$refs.reftableMkt.selections[0];
            obj.sizeWidth = obj.mktSetSize.split('*')[0];
            obj.sizeHeight = obj.mktSetSize.split('*')[1];
            yufp.extend(_self.$refs.reformMktSet.formModel, obj);
          });
          _self.dialogVisibleMktSet = true;
        },
        deleteMktFn: function () {
          var _self = this;
          if (_self.$refs.reftableMkt.selections.length < 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var arr = _self.$refs.reftableMkt.selections;
          for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].id;
          }
          var ids = arr.join(',');
          yufp.service.request({
            method: 'POST',
            url: '/api/mktposition/setdel',
            data: { id: ids },
            callback: function (code, data, response) {
              if (code == 0) {
                _self.$refs.reftableMkt.remoteData(_self.mktParam);
                _self.$message({ message: '删除成功' });
              }
            }
          });
        },
        closeMktFn: function () {
          var _self = this;
          _self.dialogVisibleMkt = false;
        }
      }
    });
  };
});