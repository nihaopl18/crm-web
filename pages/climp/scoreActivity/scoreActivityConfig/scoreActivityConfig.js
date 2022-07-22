/**
 * @Created by panglx panglx@yusys.com.cn on 2018-12-28 10:07:32.
 * @updated by
 * @description 积分活动配置
 */
define([
  'pages/climp/scoreActivity/scoreActivityConfig/scoreActivityConfig.css',
  './custom/widgets/js/YufpWfInit.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('WF_APP_STATUS,TRIAL_WAIT_TABLE,USE_FLAG');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          height: yufp.frame.size().height,
          treeUrl: '/api/scoreproject/list', // 表项目分类Url,
          addSaveBtnShow: false, // 新增项目分类树保存按钮是否显示
          modifySaveBtnShow: false, // 修改项目分类树保存按钮是否显示
          tableTypeNode: '',
          treeFormdata: {}, // 项目分类树表单数据
          treeFormDisabled: true, // 项目分类树表单是否可编辑
          tableDataUrl: '/api/activity/list', // 活动列表查询接口
          poolDataUrl: backend.yuspClimpPoolService + '/api/pool/activitypool', // 积分池查询接口
          ruleInfoDataUrl: '/api/ruleinfo/list', // 活动规则查询接口
          baseParams: {
            activityId: ''
          }, // 表名列表查询参数
          searchFormData: {}, // 搜索表单数据
          transactionCodeDataUrl: '/api/transactioncategory/searchtranscode', // 交易类型下拉选项接口
          addTableSaveBtnShow: true, // 表格新增保存按钮是否显示
          modifyTableSaveBtnShow: true, // 表格修改保存按钮是否显示
          addTableDataUrl: '/api/activity/', // 表格新增保存接口
          modifyTableDataUrl: '/api/activity/update', // 表格修改保存接口
          cancelBtnShow: true,
          optionsInfo: [], // 交易类型
          formdata: {}, // 新增、修改、详情弹出框表单数据
          dialogVisible: false, // 新增、修改、详情弹出框是否显示
          formDisabled: false, // 新增、修改、详情弹出框表单数据是否禁用
          hiddenItem: true, // 新增、修改、详情中表单数据是否隐藏
          disabledItem: false, // 新增、修改、详情中表单数据是否禁用
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          computeDialogVisible: false, // 试运算弹出框是否显示
          computeFormdata: {}, // 试运算弹出框表单数据
          numberRules: [{ validator: yufp.validator.number, message: '字段必须为数字'}],
          rules: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '字段必须为数字' }],
          pickerOptionsStart: { // 设置搜索框活动开始时间小于结束时间
            disabledDate: function (time) {
              var beginDateVal = _this.searchFormData.endDate;
              if (beginDateVal) {
                return time.getTime() > beginDateVal;
              }
            }
          },
          pickerOptionsEnd: { // 设置搜索框活动结束时间小于开始时间
            disabledDate: function (time) {
              var beginDateVal = _this.searchFormData.beginDate;
              if (beginDateVal) {
                return time.getTime() < beginDateVal;
              }
            }
          },
          pickerOptionsStart1: { // 设置弹出框活动开始时间小于结束时间
            disabledDate: function (time) {
              var beginDateVal = _this.formdata.endDate;
              if (beginDateVal) {
                return time.getTime() > beginDateVal || time.getTime() < Date.now() - 8.64e7;
              } else {
                return time.getTime() < Date.now() - 8.64e7;
              }
            }
          },
          pickerOptionsEnd2: { // 设置弹出框活动结束时间小于开始时间
            disabledDate: function (time) {
              var beginDateVal = _this.formdata.beginDate;
              if (beginDateVal) {
                return time.getTime() < beginDateVal;
              }
            }
          },
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          }
        };
      },
      mounted: function () {
        // 初始化加载表单数据
        var _this = this;
        // 原始交易详情表单字段查询数据储存
        yufp.service.request({
          method: 'GET',
          url: '/api/transactioncategory/searchtranscode',
          callback: function (code, message, response) {
            if (code == 0 && response.data != null) {
              _this.optionsInfo = response.data;
            }
          }
        });
      },
      methods: {
        // 日期格式化
        dateFormatter: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
        },
        /**
         * 树节点点击方法
         */
        nodeClickFn: function (nodeData, node, self) {
          var _this = this;
          _this.addSaveBtnShow = false;
          _this.modifySaveBtnShow = false;
          _this.$nextTick(function () {
            var obj = nodeData;
            if (obj.parentProjectName == undefined) {
              obj.parentProjectName = '无';
            }
            _this.tableTypeNode = nodeData;
            yufp.clone(obj, _this.treeFormdata);
          });
          var projectId = nodeData.projectId;
          if (nodeData.parentProId == '0000') {
            projectId = nodeData.parentProId;
          }
          _this.baseParams = {
            condition: JSON.stringify({
              projectId: projectId
            })
          };
          _this.$refs.refTable.remoteData(_this.baseParams);
        },
        /**
       * 活动项目增加
       */
        addTreeFn: function () {
          if (this.tableTypeNode == '') {
            this.$message({ message: '请选择父项目分类!', type: 'warning' });
            return false;
          }
          if (this.tableTypeNode.typeLevel == '5') {
            this.$message({ message: '只能添加四级表项目分类目录!', type: 'warning' });
            return false;
          }
          this.addSaveBtnShow = true;
          this.modifySaveBtnShow = false;
          this.treeFormDisabled = false;
          this.$nextTick(function () {
            this.$refs.refTreeForm.resetFields();
            this.treeFormdata.parentProjectName = this.tableTypeNode.projectName;
            this.treeFormdata.parentProId = this.tableTypeNode.projectId;
          });
        },
        /**
       * 活动项目删除
       */
        deleteTreeFn: function () {
          var _this = this;
          var arr = [];
          if (this.tableTypeNode == '') {
            this.$message({ message: '请选择要删除的项目分类!', type: 'warning' });
            return false;
          }
          if (this.tableTypeNode.parentProId == '0000') {
            this.$message({ message: '项目分类根目录不能删除!', type: 'warning' });
            return false;
          }
          if (this.tableTypeNode.children.length != 0) {
            this.$message({ message: '无法删除有子类的分类!', type: 'warning' });
            return;
          }
          var param = {
            condition: JSON.stringify({
              projectId: _this.tableTypeNode.projectId,
              orgCode: yufp.session.org.code
            })
          };
          yufp.service.request({
            method: 'GET',
            data: param,
            url: _this.tableDataUrl,
            callback: function (code, message, response) {
              var tab = response.data;
              if (tab.length != 0) {
                _this.$message({ message: '项目下有活动不能删除!', type: 'warning' });
                return false;
              } else {
                _this.getArray(_this.tableTypeNode, arr);
                _this.$confirm('确认要删除该项目分类吗? 是否继续?', '提示', {
                  type: 'warning',
                  center: true
                }).then(function () {
                  yufp.service.request({
                    method: 'POST',
                    url: '/api/scoreproject/deletebatch',
                    data: {
                      id: arr.join(','),
                      orgCode: yufp.session.org.code
                    },
                    callback: function (code, message, response) {
                      if (code == 0) {
                        _this.$refs.projectTree.remoteData();
                        _this.$refs.refTable.remoteData();
                        _this.$refs.refTreeForm.resetFields();
                        _this.$message('删除成功');
                        this.tableTypeNode = '';
                      } else {
                        _this.$message(response.message);
                      }
                    }
                  });
                });
              }
            }
          });
        },
        // 循环取表类型的id
        getArray: function (data, arr) {
          if (data.length == undefined) {
            arr.push(data.projectId);
            if (data.children.length > 0) {
              this.getArray(data.children, arr);
            }
          } else {
            for (var i = 0; i < data.length; i++) {
              arr.push(data[i].projectId);
              if (data[i].children.length > 0) {
                this.getArray(data[i].children, arr);
              }
            }
          }
          return arr;
        },
        /**
         * 活动项目修改
        */
        modifyTreeFn: function () {
          var _this = this;
          if (_this.tableTypeNode == '') {
            _this.$message({ message: '请选择要修改的项目分类!', type: 'warning' });
            return false;
          }
          _this.addSaveBtnShow = false;
          _this.modifySaveBtnShow = true;
          _this.treeFormDisabled = false;
          _this.$nextTick(function () {
            var obj = _this.tableTypeNode;
            yufp.clone(obj, _this.treeFormdata);
          });
        },
        /**
         * 树增加保存
         */
        addSaveFn: function () {
          var _this = this;
          var validate = false;
          var model = {};
          yufp.clone(_this.treeFormdata, model);
          _this.$refs.refTreeForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          delete model.projectId;
          yufp.service.request({
            method: 'GET',
            url: _this.treeUrl,
            callback: function (code, message, response) {
              var tab = response.data;
              for (var i = 0; i < tab.length; i++) {
                if (tab[i].projectName == model.projectName) {
                  _this.$message({ message: '不能新增相同名称的类型!', type: 'warning' });
                  return false;
                }
              }
              yufp.service.request({
                method: 'POST',
                url: '/api/scoreproject/',
                data: model,
                callback: function (code, message, response) {
                  if (code == 0) {
                    _this.$refs.projectTree.remoteData();
                    _this.tableTypeNode = '';
                    _this.addSaveBtnShow = false;
                    _this.treeFormDisabled = true;
                    _this.$refs.refTreeForm.resetFields();
                    _this.$message('新增成功');
                  }
                }
              });
            }
          });
        },
        /**
          * 树修改保存
          */
        modifySaveFn: function () {
          var _this = this;
          var validate = false;
          var model = {};
          yufp.clone(_this.treeFormdata, model);
          _this.$refs.refTreeForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          };
          yufp.service.request({
            method: 'GET',
            url: _this.treeUrl,
            callback: function (code, message, response) {
              var tab = response.data;
              for (var i = 0; i < tab.length; i++) {
                if (tab[i].projectName == model.projectName && model.projectName != _this.tableTypeNode.projectName) {
                  _this.$message({ message: '不能修改成相同名称的类型!', type: 'warning' });
                  return false;
                }
              }
              yufp.service.request({
                method: 'POST',
                url: '/api/scoreproject/update',
                data: model,
                callback: function (code, message, response) {
                  if (code == 0) {
                    _this.$refs.projectTree.remoteData();
                    _this.tableTypeNode = '';
                    _this.modifySaveBtnShow = false;
                    _this.treeFormDisabled = true;
                    _this.$refs.refTreeForm.resetFields();
                    _this.$message('修改成功');
                  }
                }
              });
            }
          });
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
        * 保存
        * @param dataUrl 保存接口
        */
        saveFn: function (dataUrl) {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: dataUrl,
            data: model,
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            }
          });
        },
        /**
         * 新增保存
         */
        addTableSaveFn: function () {
          // 校验积分池名字是否存在
          var _this = this;
          var formdata = _this.formdata;
          yufp.service.request({
            method: 'GET',
            url: _this.tableDataUrl,
            callback: function (code, message, response) {
              var tab = response.data;
              for (var i = 0; i < tab.length; i++) {
                if (tab[i].activityName == formdata.activityName) {
                  _this.$message({ message: '活动名称重复!', type: 'warning' });
                  return;
                }
                // if (tab[i].activityPriority == formdata.activityPriority) {
                //   _this.$message({ message: '优先级重复!', type: 'warning' });
                //   return;
                // }
              }
              _this.saveFn(_this.addTableDataUrl);
            }
          });
        },
        /**
         * 修改保存
         */
        modifyTableSaveFn: function () {
          // 校验积分池名字是否存在
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          var formdata = _this.formdata;
          yufp.service.request({
            method: 'GET',
            url: _this.tableDataUrl,
            callback: function (code, message, response) {
              var tab = response.data;
              for (var i = 0; i < tab.length; i++) {
                if (tab[i].activityName == formdata.activityName && formdata.activityName != selections[0].activityName) {
                  _this.$message({ message: '活动名称重复!', type: 'warning' });
                  return;
                }
                // if (tab[i].activityPriority == formdata.activityPriority && formdata.activityPriority != selections[0].activityPriority) {
                //   _this.$message({ message: '优先级重复!', type: 'warning' });
                //   return;
                // }
              }
              _this.saveFn(_this.modifyTableDataUrl);
            }
          });
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
         * @param viewType 表单类型
         * @param editable 可编辑,默认false
         */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
          _this.hiddenItem = editable;
          _this.cancelBtnShow = editable;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          if (_this.tableTypeNode == '') {
            _this.$message({ message: '请先选择父项目!', type: 'warning' });
            return false;
          };
          _this.switchStatus('ADD', true);
          _this.addTableSaveBtnShow = true;
          _this.modifyTableSaveBtnShow = false;
          _this.disabledItem = false;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.$refs.refForm.formdata.projectId = _this.tableTypeNode.projectId;
            _this.$refs.refForm.formdata.projectName = _this.tableTypeNode.projectName;
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条活动', type: 'warning' });
            return;
          }
          if (selections[0].wfApprSts == '111') {
            _this.$message({ message: '不能修改审批中的活动！', type: 'warning' });
            return;
          };
          _this.switchStatus('EDIT', true);
          _this.addTableSaveBtnShow = false;
          _this.modifyTableSaveBtnShow = true;
          _this.disabledItem = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = selections[0];
            yufp.clone(obj, _this.formdata);
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少先选择一条活动', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            if (selections[i].wfApprSts != '000' && selections[i].wfApprSts != '998') {
              _this.$message({ message: '只能删除审核状态为待发起或否决的活动！', type: 'warning' });
              return;
            };
            arr.push(selections[i].activityId);
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '/api/activity/deletebatch',
                  data: {
                    id: arr.join(','),
                    orgCode: yufp.session.org.code
                  },
                  callback: function (code, message, response) {
                    if (code == 0) {
                      yufp.service.request({
                        method: 'POST',
                        url: '/api/activity/deletebatchruleinfo',
                        data: {id: arr.join(',')}
                      });
                      _this.$refs.refTable.remoteData();
                      _this.$message('操作成功');
                    }
                  }
                });
              }
            }
          });
        },
        /**
       * 基本信息
       */
        infoFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条活动', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.addTableSaveBtnShow = false;
          _this.modifyTableSaveBtnShow = false;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selections[0], _this.formdata);
          });
        },
        /**
       * 规则配置
       */
        ruleConfigFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条活动', type: 'warning' });
            return;
          }
          if (selections[0].wfApprSts == '111') {
            _this.$message({ message: '不能配置审批中的活动！', type: 'warning' });
            return;
          };
          yufp.router.to('ruleConfig', selections[0], cite.rootId);
        },
        onAfterClose: function () {
        },
        onAfterInit: function (data) {
          var _this = this;
          var model = _this.$refs.refTable.selections[0];
          model.wfApprSts = '111';
          yufp.service.request({
            method: 'POST',
            url: '/api/activity/updatests',
            data: model,
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            }
          });
        },
        /**
       * 提交
       */
        submitFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          var roles = '';
          yufp.session.roles.forEach(element => {
            roles=roles+element.code+',';
          });
          roles = roles.substring(0,roles.length-1);
          if(roles.indexOf('JFJB')==-1&&roles.indexOf('LSBFH')==-1){
            _this.$message({ message: '只有经办角色能发起该流程。', type: 'warning' });
            return;
          }
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].wfApprSts != '000') {
            _this.$message({ message: '只能提交审核状态为待发起的活动！', type: 'warning' });
            return;
          }
          // 提交流程参数
          var commintData = {};
          commintData.bizSeqNo = selections[0].activityId;// 流程主键
          commintData.applType = 'SCORE_ACTY';// 模型版本申请类型字典项
          commintData.custName = selections[0].activityName;
          commintData.custId = selections[0].activityId;
          commintData.paramMap = {roles:roles};
          commintData.isMarketing = 'N';
          var load = _this.$loading();
          _this.$refs.yufpWfInit.wfInit(commintData, load);
        },
        /**
       * 启用
       */
        EnabledFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            if (selections[i].useFlag === '1') {
              _this.$message({ message: '积分活动已经是启用状态，无需再启动！', type: 'warning' });
              return;
            } else if (selections[i].wfApprSts != '997') {
              _this.$message({ message: '只能启用审核状态为通过的活动！', type: 'warning' });
              return;
            };
            arr.push(selections[i].activityId);
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'post',
            url: '/api/activity/usebatch',
            data: {
              id: arr.join(','),
              orgCode: yufp.session.org.code
            },
            callback: function (code, message, response) {
              if (code === 0) {
                _this.$message('启用成功');
                _this.$refs.refTable.remoteData();
              }
            }
          });
        },
        /**
       * 停用
       */
        stopFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            if (selections[i].useFlag === '0') {
              _this.$message({ message: '积分活动已经是停用状态，无需再停动！', type: 'warning' });
              return;
            } else if (selections[i].wfApprSts != '997') {
              _this.$message({ message: '只能停用审核状态为通过的活动！', type: 'warning' });
              return;
            };
            arr.push(selections[i].activityId);
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'post',
            url: '/api/activity/unusebatch',
            data: {
              id: arr.join(','),
              orgCode: yufp.session.org.code
            },
            callback: function (code, message, response) {
              if (code === 0) {
                _this.$message('停用成功');
                _this.$refs.refTable.remoteData();
              }
            }
          });
        },
        /**
         * 试运算
         */
        tryComputeFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var tableName = '';
          var str = _this.optionsInfo;
          for (var i = 0; i < str.length; i++) {
            if (selections[0].transactionCode === str[i].key) {
              tableName = str[i].tableEName + '_TRIAL';
              break;
            }
          }
          _this.computeDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.refComputeForm.resetFields();
            yufp.clone(selections[0], _this.computeFormdata);
            _this.computeFormdata.bno = yufp.util.dateFormat(new Date(), '{y}{m}{d}{h}{i}{s}');
            _this.computeFormdata.trialWaitTable = tableName;
          });
        },
        /**
         * 试运算保存
         */
        computeSaveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.computeFormdata, model);
          var validate = false;
          _this.$refs.refComputeForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: '/api/loyTrialBatch/savetrialinfo',
            data: model,
            callback: function (code, message, response) {
              if (response.code === 100002) {
                _this.$message({ message: '还有未完成的试算任务，请稍后!', type: 'warning' });
              } else if (response.code === 200001) {
                _this.$message({ message: '试算发起失败!', type: 'warning' });
              } else if (code === 0) {
                _this.$message('试算排队成功,请在试算结果查询中查询试算结果!');
                _this.computeDialogVisible = false;
                yufp.service.request({
                  method: 'POST',
                  timeout: 90000, // 默认超时时间
                  url: '/api/loyTrialBatch/starttrialengine?activityId=' + model.activityId + '&bno=' + model.bno,
                  callback: function (code, message, response) {
                    if (response.code === 100002) {
                      _this.$message({ message: '引擎启动配置文件不存在,请检查文件路径!', type: 'warning' });
                    } else if (response.code === 200001) {
                      _this.$message({ message: '试算引擎调用失败!', type: 'warning' });
                    }
                  }
                });
              }
            }
          });
        },
        /**
         * 试运算取消
         */
        computeCancelFn: function () {
          this.computeDialogVisible = false;
        }
      }
    });
  };
});