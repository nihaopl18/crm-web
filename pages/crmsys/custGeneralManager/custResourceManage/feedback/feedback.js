/**
 * @created by  on 2019-1-21 18:28:07
 * @updated by
 * @description feedback
 */
define([
  './custom/widgets/js/YufpUserSelector.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/YufpMgrSelector.js',
  './custom/widgets/js/yufpGovernedCustSelector.js'
  // './custom/plugins/yufp.watermark.js'
],
function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPEFEEDBACK, CD0019, CD0016, CD0238, CD0436, CD0437, CD0438, SEX_TYPE, CD0243');
    var vm = yufp.custom.vue({
      el: '#feedback_grid',
      data: function () {
        var _this = this;
        //   debugger;
        return {
          serviceUrl: backend.custfeedbakService + '/api/ocrmfcicustfeedbackinfo1/queryAll',
          serviceUrl2: backend.custfeedbakService + '/api/ocrmfcicustfeedbackinfo1/queryView',
          formdata: {},
          custIdView: '',
          params: {tabCheckbox: false},
          queryFields: [
            {placeholder: '客户类型', field: 'custType', type: 'select', dataCode: 'CD0016'},
            {placeholder: '客户状态', field: 'custStatus', type: 'select', dataCode: 'CD0019'},
            {placeholder: '客户编号', field: 'custId', type: 'input'},
            {placeholder: '客户名称', field: 'custName', type: 'input'},
            { placeholder: '归属机构', field: 'orgId', type: 'custom', is: 'yufp-org-tree' },
            {placeholder: '所属客户经理', field: 'mgrId', type: 'custom', is: 'yufp-mgr-selector'}
          ],
          // initFilesParams: {
          //   condition: JSON.stringify({
          //     busNo: ''
          //   })
          // },
          queryButtons: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var ld1 = vm.$loading({
                    target: '.el-table__body-wrapper',
                    body: true,
                    text: '拼命加载中'
                  });
                  var param = {condition: JSON.stringify(model)};
                  yufp.service.request({
                    method: 'GET',
                    url: vm.serviceUrl,
                    data: param,
                    callback: function (code, message, response) {
                      ld1.close();
                    }
                  });
                  _this.$refs.reftable.remoteData(param);
                }
              }
            },
            {
              label: '重置',
              op: 'reset',
              type: 'primary',
              icon: 'yx-loop2'
            }
          ],
          tableColumns: [
            {label: '客户类型', prop: 'custType', width: '100', dataCode: 'CD0016', sortable: true},
            {label: '客户状态', prop: 'custStatus', width: '100', dataCode: 'CD0019', sortable: true},
            {label: '客户编号', prop: 'custId', width: '120', sortable: true},
            {label: '客户名称', prop: 'custName', width: '120', sortable: true},
            {label: '已处理反馈数', prop: 'processedNum', width: '120', sortable: true},
            {label: '未处理反馈数', prop: 'unprocessedNum', width: '120', sortable: true},
            {label: '主办机构', prop: 'orgName', width: '140', sortable: true},
            {label: '主办客户经理', prop: 'mgrName', sortable: true}
          ],
          queryFields2: [
            {placeholder: '反馈类型', field: 'feedbackType', type: 'select', dataCode: 'CD0436'},
            {placeholder: '是否已处理', field: 'isProcessed', type: 'select', dataCode: 'CD0437'},
            {placeholder: '反馈渠道', field: 'feedbackChg', type: 'select', dataCode: 'CD0438', multiple: true},

            {placeholder: '客户编号', field: 'custId', type: 'hidden'},
            {placeholder: '反馈起始日期',
              field: 'feedbackDate',
              type: 'date',
              change: function (value) {
                vm.queryFields2[4].value = value;
                if (value > vm.queryFields2[5].value && vm.queryFields2[5].value != '') {
                  _this.$message({message: '反馈起始日不能小于反馈结束日!', type: 'warning'});
                  return;
                }
              }},
            {placeholder: '反馈结束日期',
              field: 'feedbackDateEnd',
              type: 'date',
              change: function (value) {
                vm.queryFields2[5].value = value;
                if (value < vm.queryFields2[4].value && value != '') {
                  _this.$message({message: '反馈起始日不能小于反馈结束日!', type: 'warning'});
                  return;
                }
              }}
          ],
          queryButtons2: [
            {
              label: '查询',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  model.custId = _this.custIdView;
                  var param = {condition: JSON.stringify(model)};
                  _this.$refs.reform.remoteData(param);
                }
              }
            },
            {
              label: '重置',
              op: 'reset',
              type: 'primary',
              icon: 'yx-loop2'
            }
          ],
          tableColumns2: [
            {label: '反馈类型', prop: 'feedbackType', width: '100', type: 'select', dataCode: 'CD0436', sortable: true},
            {label: '是否已处理', prop: 'isProcessed', width: '100', type: 'select', dataCode: 'CD0437', sortable: true},
            {label: '反馈渠道', prop: 'feedbackChg', width: '100', type: 'select', dataCode: 'CD0438', sortable: true},
            {label: '反馈标题', prop: 'feedbackTitle', width: '100', sortable: true},
            {label: '反馈日期', prop: 'feedbackDate', width: '100', type: 'date', sortable: true},
            {label: '反馈人', prop: 'feedbackPer', width: '100', sortable: true},
            {label: '处理有效期', prop: 'expiryDate', width: '120', type: 'date', sortable: true},
            {label: '处理人', prop: 'conductorName', width: '100', sortable: true},
            {label: '处理时间', prop: 'conductTm', sortable: true}
          ],
          updateFields: [
            {
              columnCount: 2,
              fields: [
                {
                  label: '客户编号',
                  field: 'custId',
                  disabled: true,
                  hidden: true,
                  rules: [ { required: true, message: '必填', trigger: 'blur'} ]
                },
                {label: '客户名称', field: 'custName', disabled: true},
                {label: '反馈类型',
                  field: 'feedbackType',
                  type: 'select',
                  dataCode: 'CD0436',
                  rules: [{required: true, message: '必填', trigger: 'blur'}]
                },
                {label: '是否已处理',
                  field: 'isProcessed',
                  type: 'select',
                  dataCode: 'CD0437',
                  rules: [ { required: true, message: '必填', trigger: 'blur'} ]},
                {label: '反馈渠道',
                  field: 'feedbackChg',
                  type: 'select',
                  dataCode: 'CD0438',
                  rules: [ { required: true, message: '必填', trigger: 'blur'} ]},
                {label: '反馈标题',
                  field: 'feedbackTitle',
                  rules: [ { required: true, message: '必填', trigger: 'blur'} ]},
                {label: '反馈内容',
                  field: 'feedbackContent',
                  rules: [ { required: true, message: '必填', trigger: 'blur'} ]},
                {label: '反馈日期', field: 'feedbackDate', type: 'date'},
                {label: '反馈人', field: 'feedbackPer'},
                {label: '处理有效期', field: 'expiryDate', type: 'date'},
                {label: '处理人', field: 'conductorId', type: 'custom', is: 'yufp-user-selector'},
                {label: '处理时间', field: 'conductTm'}
              ]
            },
            {
              columnCount: 1,
              fields: [
                {label: '处理所需资源', field: 'needResource', type: 'textarea', rows: 3},
                {label: '处理结果', field: 'processedResult', type: 'textarea', hidden: true}
              ]
            }
          ],
          updateButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-nudo2',
              click: function (model) {
                _this.dialogVisible2 = false;
                _this.$refs.reform2.resetFn();
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: true,
              click: function (model, valid) {
                var validate = false;
                _this.$refs.reform2.$children[0].validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                //       var par = {condition: JSON.stringify(model)};
                model.custId = _this.$refs.reftable.selections[0].custId;
                model.custName = _this.$refs.reftable.selections[0].custName;
                model.feedbackDate = new Date();
                model.feedbackPerId = yufp.session.userCode;
                model.feedbackPer = yufp.session.userName;
                model.isProcessed = '1';
                model.corpOrgCode = '001';
                yufp.service.request({
                  method: 'post',
                  url: backend.custfeedbakService + '/api/ocrmfcicustfeedbackinfo1/insert',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$refs.reform.remoteData();
                      _this.$message('操作成功!');
                      _this.dialogVisible2 = false;
                    } else {
                      _this.$message('操作失败');
                    }
                  }
                });
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              op: 'submit',
              click: function (model, valid) {
                if (valid) {
                  yufp.service.request({
                    url: backend.custfeedbakService + '/api/ocrmfcicustfeedbackinfo1/update',
                    method: 'post',
                    data: _this.$refs.reform2.formModel,
                    callback: function (code, message, response) {
                      if (code == '0') {
                        _this.$message('修改成功');
                        _this.$refs.reform.remoteData();
                        _this.dialogVisible2 = false;
                      } else {
                        _this.$message('修改失败');
                      }
                    }
                  });
                }
              }
            }
          ],

          selectCustParams: { // 客户 放大镜 参数
            user: {
              dataParams: {
                belongOrg: yufp.session.org.code,
                belongMgr: yufp.session.user.loginCode
              },
              checkbox: false // 是否支持多选
            }
          },
          dialogVisible: false,
          viewType: 'INVENTORY',
          viewTitle: yufp.lookup.find('CRUD_TYPEFEEDBACK', false),
          viewType2: 'DETAIL',
          dialogVisible2: false,
          formDisabled: false,
          dataParams: {},
          singleSelected: '',
          xinzeng: false,
          infoBtn: !yufp.session.checkCtrl('info'),
          addBackBtn: !yufp.session.checkCtrl('addBack'),
          addBtn: !yufp.session.checkCtrl('add'),
          editBtn: !yufp.session.checkCtrl('edit'),
          detailBtn: !yufp.session.checkCtrl('detail'),
          deleteBtn: !yufp.session.checkCtrl('delete'),
          modifyBtn: !yufp.session.checkCtrl('modify')
        };
      },
      methods: {
        custSelFn: function (data) {
          if (!data || data.length != 1) {
            return;
          }
          this.formdata.custId = data[0].custId;
          this.formdata.custName = data[0].custName;
        },
        userSelFn: function (data) {
          if (!data || data.length != 1) {
            return;
          }
          this.formdata.conductorName = data[0].userName;
          this.formdata.conductorOrgId = data[0].orgId;
          this.formdata.conductorOrgName = data[0].orgName;
        },
        userSelFn2: function (data) {
          if (!data || data.length != 1) {
            return;
          }
          this.formdata.complainEmpName = data[0].userName;
        },
        resetFn: function () {
          this.$refs.refForm.resetFields();
        },
        cancleFn: function () {
          this.xinzeng = false;
          this.$refs.refForm.resetFields();
        },


        saveFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = _this.$refs.refForm.formdata;
          model.corpOrgCode = '001';
          model.isProcessed = '1';
          model.feedbackDate = new Date();
          model.feedbackPerId = yufp.session.userCode;
          model.feedbackPer = yufp.session.userName;
          yufp.service.request({
            url: backend.custfeedbakService + '/api/ocrmfcicustfeedbackinfo1/insert',
            method: 'post',
            data: model,
            callback: function (code, message, response) {
              if (code == '0') {
                _this.$message('新增成功');
                _this.$refs.reftable.remoteData();
                _this.xinzeng = false;
              } else {
                _this.$message('新增失败');
              }
            }
          });
        },
        addBack: function () {
          var _this = this;
          _this.xinzeng = true;
          // yufp.router.to('back', '', 'addDiv');
        },

        changeStatus: function (viewType, flag) {
          this.viewType2 = viewType;
          this.dialogVisible = true;
        },
        /**
         * 客户登记
         */
        addFn: function () {
          this.changeStatus('ADD', true);
          var arr = this.updateFields[0];
          var arr2 = this.updateFields[1];
          this.formDisabled = false;
          this.dialogVisible2 = true;
          var _this = this;
          _this.$nextTick(function () {
            _this.$refs.reform2.resetFields();
            for (item in arr.fields) {
              var ele = arr.fields[item];
              if (ele.field === 'custId') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                //     ele.hidden = true;
                ele.disabled = true;
                ele.calcDisabled = true;
              } else if (ele.field === 'custName') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                // ele.hidden = true;
                ele.disabled = true;
                ele.calcDisabled = true;
              } else if (ele.field === 'conductTm') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                // ele.hidden = true;
              } else if (ele.field === 'feedbackPer') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                //    ele.hidden = true;
                ele.disabled = true;
                ele.calcDisabled = true;
              } else if (ele.field === 'feedbackDate') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                //      ele.hidden = true;
                ele.disabled = true;
              } else if (ele.field === 'isProcessed') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                ele.disabled == false;
                //   ele.hidden = true;
              } else if (ele.field === 'conductorId') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //  ele.hidden = false;
                ele.calcDisabled = ele.disabled;
                vm.$refs.reform2.formModel.conductorId = '';
              } else if (ele.field === 'feedbackType') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //       ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'feedbackChg') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //      ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'feedbackTitle') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //    ele.hidden = false;
                ele.calcDisabled = ele.disabled;
                //    vm.$refs.reform2.formModel.feedbackTitle = 'test';
                ele.value = 'test';
              } else if (ele.field === 'expiryDate') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //     ele.hidden = false;
                ele.calcDisabled = ele.disabled;
                vm.$refs.reform2.formModel.expiryDate = '';
              } else if (ele.field === 'feedbackContent') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //     ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              }
            }
            for (var item in arr2.fields) {
              var ele = arr2.fields[item];
              if (ele.field === 'processedResult') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                //    ele.hidden = true;
                ele.disabled = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'needResource') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //    ele.hidden = false;
                ele.calcDisabled = ele.disabled;
                vm.$refs.reform2.formModel.needResource = '';
              }
            }
          });
        },
        /**
         * 客户反馈清单
         */
        infoFn: function () {
          var _this = this;
          var selectionArr = this.$refs.reftable.selections;
          if (selectionArr.length != 1) {
            this.$message({message: '请选择一条记录', type: 'warning'});
            return;
          }
          this.custIdView = selectionArr[0].custId;
          this.changeStatus('INVENTORY');
          this.$nextTick(function () {
            var param = {
              condition: JSON.stringify({
                custId: _this.custIdView
              })
            };
            _this.$refs.reform.remoteData(param);
          });
        },
        /**
         * 反馈修改
         */
        editFn: function () {
          var _this = this;
          var selectionArr = this.$refs.reform.selections;
          if (selectionArr.length != 1) {
            this.$message({message: '请选择一条记录', type: 'warning'});
            return;
          }
          if (selectionArr[0].feedbackPerId !== yufp.session.userCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
          }
          this.changeStatus('EDIT', true);
          var arr = this.updateFields[0];
          var arr2 = this.updateFields[1];
          this.formDisabled = false;
          this.dialogVisible2 = true;
          this.$nextTick(function () {
            for (item in arr.fields) {
              var ele = arr.fields[item];
              if (ele.field === 'custId') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                //   ele.hidden = true;
                ele.disabled = true;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'custName') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                //   ele.hidden = true;
                ele.disabled = true;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'conductTm') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                //   ele.hidden = true;
              } else if (ele.field === 'feedbackPer') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                //    ele.hidden = false;
                ele.disabled = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'feedbackDate') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                //       ele.hidden = false;
                ele.disabled = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'isProcessed') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled == false;
                //        ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'conductorId') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //     ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'feedbackType') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //      ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'feedbackChg') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //     ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'feedbackTitle') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //     ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'expiryDate') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //     ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'feedbackContent') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //     ele.hidden = false;
                ele.calcDisabled = ele.disabled;
                // vm.$message('修改内容成功');
              }
            }
            for (var item in arr2.fields) {
              var ele = arr2.fields[item];
              if (ele.field === 'processedResult') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                //   ele.hidden = true;
                ele.disabled = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'needResource') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //   ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              }
            }
            _this.$refs.reform2.formModel = yufp.clone(selectionArr[0], {});
          });
        },
        /**
         * 详情
         */
        detailFn: function () {
          var selectionArr = this.$refs.reform.selections;
          if (selectionArr.length != 1) {
            this.$message({message: '请选择一条记录', type: 'warning'});
            return;
          }
          this.changeStatus('DETAIL', false);
          this.dialogVisible2 = true;
          this.$nextTick(function () {
            this.$refs.reform2.formModel = yufp.clone(selectionArr[0], {});
          });
        },
        /**
         * 客户处理
         */
        modifyFn: function () {
          var selectionArr = this.$refs.reform.selections;
          if (selectionArr.length != 1) {
            this.$message({message: '请选择一条记录', type: 'warning'});
            return;
          }
          this.changeStatus('PROCESSED', true);
          var arr = this.updateFields[0];
          var arr2 = this.updateFields[1];
          this.formDisabled = false;
          this.dialogVisible2 = true;
          this.$nextTick(function () {
            for (item in arr.fields) {
              var ele = arr.fields[item];
              if (ele.field === 'custId') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                //        ele.hidden = false;
                ele.disabled = true;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'custName') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                //     ele.hidden = false;
                ele.disabled = true;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'conductTm') {
                vm.$refs.reform2.switch(ele.field, 'hidden', true);
                //     ele.hidden = true;
              } else if (ele.field === 'feedbackPer') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                //     ele.hidden = false;
                ele.disabled = true;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'feedbackDate') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                //     ele.hidden = false;
                ele.disabled = true;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'isProcessed') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled == false;
                //     ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'conductorId') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //    ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'feedbackType') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = true;
                //      ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'feedbackChg') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = true;
                //      ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'feedbackTitle') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = true;
                //     ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'expiryDate') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = true;
                //      ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'feedbackContent') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = true;
                //    ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              }
            }
            for (var item in arr2.fields) {
              var ele = arr2.fields[item];
              if (ele.field === 'processedResult') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                //     ele.hidden = false;
                ele.disabled = false;
                ele.calcDisabled = ele.disabled;
              } else if (ele.field === 'needResource') {
                vm.$refs.reform2.switch(ele.field, 'hidden', false);
                ele.disabled = false;
                //        ele.hidden = false;
                ele.calcDisabled = ele.disabled;
              }
            }
            this.$refs.reform2.formModel = yufp.clone(selectionArr[0], {});
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.reform.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].feedbackPerId !== yufp.session.userCode) {
            _this.$message({ message: '只能删除自己创建的数据', type: 'warning' });
            return;
          }
          if (selections[0].isProcessed == '2') {
            _this.$message({ message: '不能删除正在处理中的数据', type: 'warning' });
            return;
          }
          var len = selections.length, ids = '';
          for (var i = 0; i < len; i++) {
            if (len == 1) {
              ids = selections[i].feedbackId;
            } else {
              ids = ids + ',' + selections[i].feedbackId;
            }
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custfeedbakService + '/api/ocrmfcicustfeedbackinfo1/delete/' + ids,
                  data: null,
                  callback: function (code, message, response) {
                    if (code == '0') {
                      _this.$refs.reform.remoteData();
                      _this.$message('操作成功');
                    }
                  }
                });
              }
            }
          });
        }
      },
      watch: {
        viewType2: function (value) {
          var arr = this.updateFields[0];
          var arr2 = this.updateFields[1];
          if (value === 'ADD') {
            this.updateButtons[1].hidden = false;
            this.updateButtons[2].hidden = true;
          } else if (value === 'EDIT') {
            this.updateButtons[1].hidden = true;
            this.updateButtons[2].hidden = false;
          } else if (value === 'DETAIL') {
            this.updateButtons[1].hidden = true;
            this.updateButtons[2].hidden = true;
            for (item in arr.fields) {
              var ele = arr.fields[item];
              if (ele.field === 'custId') {
                ele.hidden = true;
              } else if (ele.field === 'custName') {
                ele.hidden = true;
              } else if (ele.field === 'conductTm') {
                ele.hidden = false;
              } else if (ele.field === 'processedResult') {
                ele.hidden = true;
              } else if (ele.field === 'feedbackPer') {
                ele.hidden = false;
              } else if (ele.field === 'feedbackDate') {
                ele.hidden = false;
              }
            }
            for (var item in arr2.fields) {
              var ele = arr2.fields[item];
              if (ele.field === 'processedResult') {
                ele.hidden = true;
              }
            }
            this.formDisabled = true;
          } else if (value === 'PROCESSED') {
            this.updateButtons[1].hidden = true;
            this.updateButtons[2].hidden = false;
          }
        }
      }
    });
  };

  /**
   * 页面传递消息处理
   * @param type 消息类型
   * @param message 消息内容
   */
  exports.onmessage = function (type, message) {
  };

  /**
   * 页面销毁时触发destroy方法
   * @param id 路由ID
   * @param cite 页面站点信息
   */
  exports.destroy = function (id, cite) {
  };
});