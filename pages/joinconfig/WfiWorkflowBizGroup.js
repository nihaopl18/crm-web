
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('ZB_BIZ_CATE');
    yufp.custom.vue({
      el: '#WfiWorkflow2bizGroup',
      data: function () {
        var me = this;
        return {
          height: yufp.custom.viewSize().height - 100,
          tabName: 'first',
          data: [
            {wfname: 'ceshihahaha'}
          ],
          wfSignButtons: [
            {label: '',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              show: true,
              click: function (model, valid) {
                if (valid) {
                  var param = {
                    condition: JSON.stringify(model),
                    sessionOrgCode: yufp.session.org.code,
                    sessionLoginCode: yufp.session.user.loginCode
                  };
                  me.$refs.wfSignList.remoteData(param);
                }
              }
            },
            {label: '', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
          ],
          funcQueryButtons: [
            {label: '',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  me.$refs.funcTable.remoteData(param);
                }
              }},
            {label: '', op: 'reset', type: 'primary', icon: 'yx-loop2'}
          ],
          urls: {
            dataUrl: backend.echainService + '/api/joinbiz/queryWfiWorkflowBizList',
            createSaveUrl: backend.echainService + '/api/joinbiz/addWfiWorkflowBiz',
            updateSaveUrl: backend.echainService + '/api/joinbiz/updateWfiWorkflowBiz',
            wfSignUrl: backend.echainService + '/api/bench/queryWfList',
            nodeDataUrl: backend.echainService + '/api/joinbiz/queryWfiNode2bizList',
            nodeListUrl: backend.echainService + '/api/joinbiz/queryWFINodeVOList',
            creatNodeSaveUrl: backend.echainService + '/api/joinbiz/addWfiWorkflowNode',
            funcDataUrl: backend.appOcaService + '/api/adminsmmenu/funclistquery',
            updateNodeSaveUrl: backend.echainService + '/api/joinbiz/updateWfiWorkflowNode'
          },
          queryFields: [
            /* {placeholder: '申请类型', field: 'applType', type: 'select',dataCode: 'ZB_BIZ_CATE'},*/
            {placeholder: '流程标识', field: 'wfsign', type: 'input'},
            {placeholder: '流程名称', field: 'wfname', type: 'input'}
          ],
          queryWfSignFileds: [
            {placeholder: '流程标识', field: 'wfSign', type: 'input'},
            {placeholder: '流程名称', field: 'wfName', type: 'input'}
          ],
          funcQueryFields: [
            {placeholder: '关键字', field: 'queryKey', type: 'input'}
          ],
          mainGrid: {
            query: {
              applType: '',
              wfsign: '',
              wfname: ''
            },
            queryWfSign: {
              wfSign: '',
              wfName: ''
            }
          },
          apkvalue: '',
          awfsign: '',
          dataParams: {},
          wfSignParams: {
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          nodeDataParams: {
            apkvalue: me.apkvalue
          },
          nodeParams: {
            awfsign: '',
            sessionInstuCde: yufp.session.instu.code
          },
          functionParams: {},
          tableColumns: [
            { label: '配置主键', prop: 'pkvalue', hidden: true },
            { label: '流程标识', prop: 'wfsign', resizable: true },
            { label: '流程名称', prop: 'wfname', resizable: true},
            { label: '申请类型', prop: 'applType', resizable: true, dataCode: 'ZB_BIZ_CATE'}
          ],
          wfSignTableColumns: [
            { label: '流程标识', prop: 'wfSign', resizable: true },
            { label: '流程名称', prop: 'wfName', resizable: true}
          ],
          nodeTableColumns: [
            { label: '关联配置主键', prop: 'bizPkvalue', hidden: true },
            { label: '主键', prop: 'pkvallue', hidden: true },
            { label: '节点ID', prop: 'nodeid', resizable: true },
            { label: '节点名称', prop: 'nodename', resizable: true },
            { label: '节点自定义申请信息页面', prop: 'funcName', resizable: true },
            { label: '节点自定义申请信息页面', prop: 'funcId', hidden: true }
          ],
          nodeColumns: [
            { label: '节点ID', prop: 'nodeId', resizable: true },
            { label: '节点名称', prop: 'nodeName', resizable: true }
          ],
          funcTableColumns: [
            { label: '业务功能ID', prop: 'funcId', hidden: true, resizable: true},
            { label: '业务功能名称', prop: 'funcName', width: 250, sortable: true, resizable: true},
            { label: 'URL链接', prop: 'funcUrl', width: 275, sortable: true, resizable: true, showOverflowTooltip: true}
          ],
          dialogFormVisible: false,
          addDialogFormVisible: false,
          dialogVisibleWfSign: false,
          NodeDialogFormVisible: false,
          dialogVisibleNode: false,
          dialogVisibleFunction: false,
          dialogStatus: '',
          nodeDialogStatus: '',
          formDisabled: false,
          addFormDisabled: false,
          NodeFormDisabled: false,
          textMap: {
            update: '修改',
            creat: '新增',
            detail: '查看'
          },
          NodeTitle: {
            update: '节点配置修改',
            creat: '节点配置新增'
          },
          addTitle: '新增',
          disabledFlag: true,
          viewFlag: true,
          nodeFlag: true,
          title: '流程标识选取',
          nodetitle: '节点选取',
          functionTitle: '业务功能页面选取',
          updateFields: [{
            columnCount: 2,
            fields: [
              { field: 'wfsign',
                label: '流程标识',
                icon: 'search',
                disabled: true,
                click: function () {
                  if (!me.disabledFlag) {
                    me.dialogVisibleWfSign = true;
                  }
                },
                rules: [
                  {required: true, message: '必填项', trigger: 'blur'}
                ] },
              { field: 'wfname',
                label: '流程名称',
                disabled: true,
                type: 'input',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur'}
                ]},
              { field: 'applType',
                label: '申请类型',
                type: 'select',
                dataCode: 'ZB_BIZ_CATE',
                disabled: false,
                rules: [
                  {required: true, message: '必填项', trigger: 'blur'}
                ]},
              { field: 'pkvalue', label: '配置主键', type: 'input', hidden: true}
            ]},
          {
            columnCount: 1,
            fields: [
              { field: 'funcId', label: '业务功能页面ID', type: 'input', rules: [ {required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'remark',
                label: '备注',
                type: 'textarea',
                rows: 3,
                rules: [
                  {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
                ]
              }
            ]
          }],
          updateFieldsAdd: [{
            columnCount: 2,
            fields: [
              { field: 'wfsign',
                label: '流程标识',
                icon: 'search',
                disabled: false,
                click: function () {
                  me.dialogVisibleWfSign = true;
                },
                rules: [
                  {required: true, message: '必填项', trigger: 'blur'}
                ] },
              { field: 'wfname',
                label: '流程名称',
                disabled: true,
                type: 'input',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur'}
                ]},
              { field: 'applType',
                label: '申请类型',
                type: 'select',
                dataCode: 'ZB_BIZ_CATE',
                disabled: false,
                rules: [
                  {required: true, message: '必填项', trigger: 'blur'}
                ]},
              { field: 'pkvalue', label: '配置主键', type: 'input', hidden: true}
            ]},
          {
            columnCount: 1,
            fields: [
              { field: 'funcId', label: '业务功能页面ID', type: 'input', rules: [ {required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'remark',
                label: '备注',
                type: 'textarea',
                rows: 3,
                rules: [
                  {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }
                ]
              }
            ]
          }],
          nodeFlagForFunc: false,
          updateNodeFields: [{
            columnCount: 1,
            fields: [
              { field: 'nodeid',
                label: '节点ID',
                icon: 'search',
                disabled: false,
                click: function () {
                  if (me.nodeFlag) {
                    me.dialogVisibleNode = true;
                  }
                },
                rules: [
                  {required: true, message: '必填项', trigger: 'blur'}
                ] },
              { field: 'nodename',
                label: '节点名称',
                disabled: false,
                type: 'input',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur'}
                ]},
              { field: 'bizPkvalue', label: '配置主键', type: 'input', hidden: true},
              { field: 'funcId', label: '业务功能页面ID', type: 'input', rules: [{required: true, message: '必填项', trigger: 'blur'}]}
            ]
          }]
        };
      },
      methods: {
        beforeFuncClose: function () {
          this.nodeFlagForFunc = false;
        },
        beforeClose: function () {
          this.tabName = 'first';
        },
        openCreateFn: function () { // 打开新增页面
          this.disabledFlag = false;
          this.viewFlag = false;
          this.addDialogFormVisible = true;
          this.addFormDisabled = false;
          this.$nextTick(function () {
            this.$refs.WfiWorkflow2bizFormAdd.resetFields();
          });
        },
        openNodeCreateFn: function () { // 打开节点配置新增页面
          this.nodeFlag = true;
          this.nodeFlagForFunc = true;
          this.nodeType('creat', false);
          this.$nextTick(function () {
            this.$refs.WfiNode2bizForm.resetFields();
            this.$refs.WfiNode2bizForm.formModel.bizPkvalue = this.apkvalue;
          });
        },
        openNodeEditFn: function () { // 打开节点配置修改页面
          this.nodeFlag = false;
          if (this.$refs.WfiNode2bizList.selections.length !== 1) {
            this.$message({message: '请选择一条数据!', type: 'warning'});
            return false;
          }
          var row = this.$refs.WfiNode2bizList.selections[0];
          this.nodeType('update', false);
          this.$nextTick(function () {
            this.$refs.WfiNode2bizForm.resetFields();
            yufp.extend(this.$refs.WfiNode2bizForm.formModel, row);
          });
        },
        openEditFn: function (row) { // 打开修改页面
          this.disabledFlag = true;
          this.viewFlag = false;
          if (this.$refs.WfiWorkflow2bizList.selections.length !== 1) {
            this.$message({message: '请选择一条数据!', type: 'warning'});
            return false;
          }
          var row = this.$refs.WfiWorkflow2bizList.selections[0];
          this.tabName = 'first';
          this.apkvalue = row.pkvalue;
          this.awfsign = row.wfsign;
          this.nodeParams.awfsign = row.wfsign;
          this.opType('update', false);
          var pkParam = {
            apkvalue: row.pkvalue
          };
          var fields = this.updateFields[0].fields;
          var nodeFields = this.updateNodeFields[0].fields;
          fields[2].disabled = true;
          nodeFields[3].value = row.pkvalue;
          this.$nextTick(function () {
            this.$refs.WfiWorkflow2bizForm.resetFields();
            yufp.extend(this.$refs.WfiWorkflow2bizForm.formModel, row);
            this.$refs.WfiNode2bizList.remoteData(pkParam);
          });
        },
        openDetailFn: function (row) { // 查看详情
          this.disabledFlag = true;
          this.viewFlag = true;
          if (this.$refs.WfiWorkflow2bizList.selections.length !== 1) {
            this.$message({message: '请选择一条数据!', type: 'warning'});
            return false;
          }
          var row = this.$refs.WfiWorkflow2bizList.selections[0];
          this.apkvalue = row.pkvalue;
          this.wfsign = row.wfsign;
          var pkParam = {
            apkvalue: row.pkvalue
          };
          this.opType('detail', true);
          this.$nextTick(function () {
            this.$refs.WfiWorkflow2bizForm.resetFields();
            yufp.extend(this.$refs.WfiWorkflow2bizForm.formModel, row);
            this.$refs.WfiNode2bizList.remoteData(pkParam);
          });
        },
        opType: function (type, disabled) {
          this.dialogFormVisible = true;
          this.dialogStatus = type;
          this.formDisabled = disabled;
        },
        nodeType: function (type, disabled) {
          this.NodeDialogFormVisible = true;
          this.nodeDialogStatus = type;
          this.NodeFormDisabled = disabled;
        },

        returnWfSign: function () { // 选取返回
          if (this.$refs.wfSignList.selections.length !== 1) {
            this.$message({message: '请选择一条数据!', type: 'warning'});
            return false;
          }
          var row = this.$refs.wfSignList.selections[0];
          this.$nextTick(function () {
            if (this.disabledFlag) {
              this.$refs.WfiWorkflow2bizForm.formModel.wfsign = row.wfSign;
              this.$refs.WfiWorkflow2bizForm.formModel.wfname = row.wfName;
            } else {
              this.$refs.WfiWorkflow2bizFormAdd.formModel.wfsign = row.wfSign;
              this.$refs.WfiWorkflow2bizFormAdd.formModel.wfname = row.wfName;
            }
            this.dialogVisibleWfSign = false;
          });
        },
        returnNode: function () { // 节点设置选取返回
          if (this.$refs.nodeList.selections.length !== 1) {
            this.$message({message: '请选择一条数据!', type: 'warning'});
            return false;
          }
          var row = this.$refs.nodeList.selections[0];
          this.$nextTick(function () {
            this.$refs.WfiNode2bizForm.formModel.nodeid = row.nodeId;
            this.$refs.WfiNode2bizForm.formModel.nodename = row.nodeName;
            this.dialogVisibleNode = false;
          });
        },
        returnFunction: function () { // 功能页面选取返回
          if (this.$refs.funcTable.selections.length !== 1) {
            this.$message({message: '请选择一条数据!', type: 'warning'});
            return false;
          }
          var row = this.$refs.funcTable.selections[0];
          this.$nextTick(function () {
            if (this.nodeFlagForFunc) {
              this.$refs.WfiNode2bizForm.formModel.funcId = row.funcId;
              this.$refs.WfiNode2bizForm.formModel.funcName = row.funcName;
            } else {
              if (this.disabledFlag) {
                this.$refs.WfiWorkflow2bizForm.formModel.funcId = row.funcId;
                this.$refs.WfiWorkflow2bizForm.formModel.funcName = row.funcName;
              } else {
                this.$refs.WfiWorkflow2bizFormAdd.formModel.funcId = row.funcId;
                this.$refs.WfiWorkflow2bizFormAdd.formModel.funcName = row.funcName;
              }
            }
            // this.$refs.WfiWorkflow2bizForm.formModel.funcName=row.funcName;
            this.dialogVisibleFunction = false;
          });
        },
        saveCreateFn: function () { // 新增保存
          var me = this;
          var myform = me.$refs.WfiWorkflow2bizFormAdd;
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, myform.formModel);
              var d = new Date();
              me.apkvalue = d.getTime();
              comitData.pkvalue = String(me.apkvalue);
              var saveUrl = me.urls.createSaveUrl;
              var params = {
                condition: JSON.stringify({
                  wfsign: myform.formModel.wfsign,
                  applType: myform.formModel.applType,
                  opType: 'add'
                })
              };
              yufp.service.request({// 唯一性验证
                url: backend.echainService + '/api/joinbiz/verifyWfiWorkflowBizList',
                data: params,
                method: 'GET',
                callback: function (code, message, response) {
                  if (response.data.flag == '0') {
                    yufp.service.request({
                      url: saveUrl,
                      data: comitData,
                      method: 'POST',
                      callback: function (code, message, response) {
                        me.$message({message: response.data.message, type: response.data.flag});
                        if (response.data.flag == 'success') {
                          me.addDialogFormVisible = false;
                          me.$refs.WfiWorkflow2bizList.remoteData();
                          me.dialogFormVisible = true;
                          me.dialogStatus = 'update';
                          me.formDisabled = false;
                          var fields = me.updateFields[0].fields;
                          fields[2].disabled = true;
                          var pkParam = {
                            apkvalue: me.apkvalue
                          };
                          me.$nextTick(function () {
                            // myform.resetFields();
                            me.$refs.WfiWorkflow2bizForm.resetFields();
                            yufp.extend(me.$refs.WfiWorkflow2bizForm.formModel, comitData);
                            me.$refs.WfiNode2bizList.remoteData(pkParam);
                          });
                        }
                      }
                    });
                  } else {
                    var message = '根据申请类型+流程标识校验唯一性不通过！';
                    me.$message({message: message, type: 'warning'});
                  }
                }
              });
            } else {
              me.$message({message: '请检查输入项是否合法', type: 'warning'});
              return false;
            }
          });
        },
        saveEditFn: function () { // 修改保存
          var me = this;
          var myform = me.$refs.WfiWorkflow2bizForm;
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, myform.formModel);
              var saveUrl = me.urls.updateSaveUrl;
              var params = {
                condition: JSON.stringify({
                  wfsign: myform.formModel.wfsign,
                  applType: myform.formModel.applType,
                  pkvalue: myform.formModel.pkvalue,
                  opType: 'update'
                })
              };
              yufp.service.request({// 唯一性验证
                url: backend.echainService + '/api/joinbiz/verifyWfiWorkflowBizList',
                data: params,
                method: 'GET',
                callback: function (code, message, response) {
                  if (response.data.flag == '0') {
                    yufp.service.request({
                      url: saveUrl,
                      data: comitData,
                      method: 'POST',
                      callback: function (code, message, response) {
                        me.$message({message: response.data.message, type: response.data.flag});
                        if (response.data.flag == 'success') {
                          me.dialogFormVisible = false;
                          me.$refs.WfiWorkflow2bizList.remoteData();
                        }
                      }
                    });
                  } else {
                    var message = '根据申请类型+流程标识校验唯一性不通过！';
                    me.$message({message: message, type: 'warning'});
                  }
                }
              });
            } else {
              me.$message({message: '请检查输入项是否合法', type: 'warning'});
              return false;
            }
          });
        },
        deleteFn: function () { // 删除
          if (this.$refs.WfiWorkflow2bizList.selections.length > 0) {
            var row = this.$refs.WfiWorkflow2bizList.selections[0];
            var id = '';
            for (var i = 0; i < this.$refs.WfiWorkflow2bizList.selections.length; i++) {
              var row = this.$refs.WfiWorkflow2bizList.selections[i];
              id = id + row.pkvalue;
            }
            var me = this;
            this.$confirm('删除流程适用业务会联动删除向下的流程关联节点配置，请确认删除？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(function () {
              yufp.service.request({
                method: 'POST',
                url: backend.echainService + '/api/joinbiz/deleteWfiWorkflowBiz?pkvalue=' + id,
                callback: function (code, message, response) {
                  me.$message({message: response.data.message, type: response.data.flag});
                  me.$refs.WfiWorkflow2bizList.remoteData();
                }
              });
            });
          } else {
            this.$message({message: '请先选择要删除的数据', type: 'warning'});
            return false;
          }
        },
        saveNodeCreateFn: function () { // 节点配置新增保存
          var me = this;
          var myform = me.$refs.WfiNode2bizForm;
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, myform.formModel);
              var saveUrl = me.urls.creatNodeSaveUrl;
              yufp.service.request({
                url: saveUrl,
                data: comitData,
                method: 'POST',
                callback: function (code, message, response) {
                  me.$message({message: response.data.message, type: response.data.flag});
                  if (response.data.flag == 'success') {
                    me.NodeDialogFormVisible = false;
                    me.$refs.WfiNode2bizList.remoteData();
                  }
                }
              });
            } else {
              me.$message({message: '请检查输入项是否合法', type: 'warning'});
              return false;
            }
          });
        },
        saveNodeUpdateFn: function () { // 节点配置修改保存
          var me = this;
          var myform = me.$refs.WfiNode2bizForm;
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, myform.formModel);
              var saveUrl = me.urls.updateNodeSaveUrl;
              yufp.service.request({
                url: saveUrl,
                data: comitData,
                method: 'POST',
                callback: function (code, message, response) {
                  me.$message({message: response.data.message, type: response.data.flag});
                  if (response.data.flag == 'success') {
                    me.NodeDialogFormVisible = false;
                    me.$refs.WfiNode2bizList.remoteData();
                  }
                }
              });
            } else {
              me.$message({message: '请检查输入项是否合法', type: 'warning'});
              return false;
            }
          });
        },
        deleteNodeFn: function () {
          if (this.$refs.WfiNode2bizList.selections.length > 0) {
            var row = this.$refs.WfiNode2bizList.selections[0];
            var id = '';
            for (var i = 0; i < this.$refs.WfiNode2bizList.selections.length; i++) {
              var row = this.$refs.WfiNode2bizList.selections[i];
              id = id + row.pkvallue;
            }
            var me = this;
            this.$confirm('是否确认要删除？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(function () {
              yufp.service.request({
                method: 'POST',
                url: backend.echainService + '/api/joinbiz/deleteWfiWorkflowNode?pkvallue=' + id,
                callback: function (code, message, response) {
                  me.$message({message: response.data.message, type: response.data.flag});
                  me.$refs.WfiNode2bizList.remoteData();
                }
              });
            });
          } else {
            this.$message({message: '请先选择要删除的数据', type: 'warning'});
            return false;
          }
        }
      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});