/**
 * @Created by panglx panglx@yusys.com.cn on 2018-12-28 16:24:58.
 * @updated by
 * @description 引用参数配置
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('PARAM_TYPE,FIELD_TYPE,FIELD_OPTIONS,PARAM_MAPPING');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var checkParamCode = function (rule, value, callback) {
          if (!value) {
            return callback(new Error('请输入参数编码'));
          }
          if (value.substring(0, 6) != 'PARAM_') {
            callback(new Error('参数编码必须以PARAM_开始！'));
          } else {
            callback();
          }
        };
        return {
          ruleParaTableDataUrl: '/api/ruleparam/list', // 引用参数查询列表接口
          addDataUrl: '/api/ruleparam/', // 引用参数新增保存接口
          modifyDataUrl: '/api/ruleparam/update', // 引用参数修改保存接口
          formdata: {}, // 新增、修改弹出框表单数据
          isMappingRequired: false, // 映射是否必输
          isMagnifierRequired: false, // 放大镜是否必输
          dialogVisible: false, // 新增、修改弹出框是否可见
          formDisabled: false, // 新增、修改弹出框是否可修改
          viewType: 'DETAIL', // 弹出框名称的数据字典英文名
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          addSaveBtnShow: false, // 新增保存按钮是否可见
          modifySaveBtnShow: false, // 修改保存按钮是否可见
          isMappingHidden: true, // 类别映射是否隐藏
          isMagnifierHidden: true, // 放大镜字段是否隐藏
          paramMappingRule: '', // 类别映射规则
          magnifierRule: '', // 放大镜字段规则
          paramCodeRule: [ // 参数校验编码
            { validator: checkParamCode }
          ]
        };
      },
      mounted: function () {
        yufp.service.request({
          method: 'GET',
          url: '/api/transactioncategory/searchlookupcode',
          callback: function (code, message, response) {
            var lookupcode = response.data;
            yufp.lookup.lookupMgr['PARAM_MAPPING'] = lookupcode;
          }
        });
      },
      methods: {
        /**
         * 是否显示放大镜和类别映射
         */
        showSelectFn: function (val) {
          var _this = this;
          // 当选择框的值为放大镜时
          if (val == '7') {
            _this.isMagnifierHidden = false;
            _this.isMappingHidden = true;
            _this.magnifierRule = 'required';
            _this.paramMappingRule = '';
            _this.$refs.refForm.formdata.paramMapping = '';
          } else if (val == '4' || val == '5' || val == '6') {
            // 当选择框的值为多选框、下拉框、单选框时
            _this.isMagnifierHidden = true;
            _this.isMappingHidden = false;
            _this.magnifierRule = '';
            _this.paramMappingRule = 'required';
            _this.$refs.refForm.formdata.magnifier = '';
          } else {
            _this.isMagnifierHidden = true;
            _this.isMappingHidden = true;
            _this.magnifierRule = '';
            _this.paramMappingRule = '';
            _this.$refs.refForm.formdata.paramMapping = '';
            _this.$refs.refForm.formdata.magnifier = '';
          }
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
              _this.$refs.refTable.remoteData();
              _this.$message('操作成功');
              _this.dialogVisible = false;
            }
          });
        },
        /**
         * 新增保存
         */
        addSaveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var param = {
            condition: JSON.stringify({
              paramCode: model.paramCode
            })
          };
          yufp.service.request({
            method: 'GET',
            url: backend.yuspClimpBparamService + '/api/ruleparam/ruleparamlist',
            data: param,
            // 新增时判断参数编码是否重复
            callback: function (code, message, response) {
              if (response.data.length > 0) {
                _this.$message({message: '参数已存在', type: 'warning' });
              } else {
                _this.saveFn(_this.addDataUrl);
              }
            }
          });
        },
        /**
         * 修改保存
         */
        modifySaveFn: function () {
          var _this = this;
          var model = {};
          var selections = _this.$refs.refTable.selections;
          yufp.clone(_this.formdata, model);
          var param = {
            condition: JSON.stringify({
              paramCode: model.paramCode
            })
          };
          yufp.service.request({
            method: 'GET',
            url: backend.yuspClimpBparamService + '/api/ruleparam/ruleparamlist',
            data: param,
            // 新增时判断参数编码是否重复
            callback: function (code, message, response) {
              if (response.data.length > 0 && response.data[0].paramCode != selections[0].paramCode) {
                _this.$message({message: '参数编码已存在', type: 'warning' });
              } else {
                _this.saveFn(_this.modifyDataUrl);
              }
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
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.addSaveBtnShow = true;
          _this.modifySaveBtnShow = false;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.paramCode = 'PARAM_';
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.addSaveBtnShow = false;
          _this.modifySaveBtnShow = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
            _this.showSelectFn(selectionsAry[0].paramProperty);
          });
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          };
          _this.switchStatus('DETAIL', false);
          _this.addSaveBtnShow = false;
          _this.modifySaveBtnShow = false;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], _this.formdata);
            _this.showSelectFn(selectionsAry[0].paramProperty);
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '/api/ruleparam/batchdelete',
                  data: {
                    id: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        /**
         * 属性类别值改变时的函数
         */
        propertyChangeFn: function (value) {
          this.showSelectFn(value);
        }
      }
    });
  };
});