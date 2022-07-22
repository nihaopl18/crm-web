/**
 * @Created by zjy zhangjy14@yuys.com.cn on 2019-6-25 16:35:59.
 * @updated by
 * @description 测试
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/plugins/yufp.watermark.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    // yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS,CD0016');
    yufp.lookup.reg('CD0016');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          // 查询表单数据
          queryFormdata: {},
          dataUrl: backend.custpubService + '/api/admittanceChange/listper',
          formdata: {},
          // rule: [
          //   { required: true, message: '必填项', trigger: 'blur' },
          //   { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          // ],
          dialogVisible: false,
          formDisabled: false,
          // 客户名称校验方法
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          paramorgIdAuth: '',
          parambusiType: ''
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.custpubService + '/api/governedcust/getbusitype',
          data: {
            condition: JSON.stringify({ userId: yufp.session.userId })
          },
          callback: function (code, message, response) {
            if (code == 0 && response.code === 0) {
              if (response.data) {
                var data = response.data;
                _this.parambusiType = data.busiType;
                _this.paramorgIdAuth = data.orgIdAuth;
                // 对公
                if (data.userCustType == '2') {
                  _this.queryFormdata.custType = '2';
                  // _this.queryFormdata.isAdmitEnter = '1';
                } else {
                  // 对私  个人
                  _this.queryFormdata.custType = '1';
                  // _this.queryFormdata.isAdmitEnter = '1';
                };
              }
            } else {
              _this.$message.error('查询失败');
            }
          }
        });
      },
      methods: {
        /**
        * 查询表单-客户类型切换后重置归属机构、归属经理
        */
        custTpChangeFn: function () {
          this.queryFormdata.belongBrch = '';
          this.queryFormdata.belongMgr = '';
        },
        searchFn: function () {
          var _this = this;
          var validate = false;
          _this.dataUrl = '';
          _this.$refs.custSearchForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var ld1 = _this.$loading({
            target: '.div1',
            body: true,
            text: '拼命加载中'
          });
          var model = {};
          yufp.clone(_this.queryFormdata, model);
          model.userId = yufp.session.userId;
          model.orgCode = yufp.session.org.code;
          // model.orgId = _this.paramOrgId;
          // 条线
          model.busiType = _this.parambusiType;
          // 授权机构
          model.orgIdAuth = _this.paramorgIdAuth;
          var param = {
            condition: JSON.stringify(model)
          };
          // 零售
          if (_this.queryFormdata.custType == '1') {
            _this.dataUrl = '/api/admittanceChange/listper';
          } else if (_this.queryFormdata.custType == '2') {
            _this.dataUrl = '/api/admittanceChange/listorg';
          }
          _this.$nextTick(function () {
            _this.$refs.refTable.remoteData(param);
            ld1.close();
          });
        },
        /**
         * 客户查询——重置按钮
         */
        resetMainFn: function () {
          this.$refs.custSearchForm.resetFields();
        }
        /**
         * 取消
         */
        // cancelFn: function () {
        //   var _this = this;
        //   _this.dialogVisible = false;
        // },
        // /**
        //  * 保存
        //  */
        // saveFn: function () {
        //   var _this = this;
        //   var model = {};
        //   yufp.clone(_this.formdata, model);
        //   var validate = false;
        //   _this.$refs.refForm.validate(function (valid) {
        //     validate = valid;
        //   });
        //   if (!validate) {
        //     return;
        //   }
        //   // 向后台发送保存请求
        //   yufp.service.request({
        //     method: 'POST',
        //     url: '/trade/example/save',
        //     data: model,
        //     callback: function (code, message, response) {
        //       _this.$refs.refTable.remoteData();
        //       _this.$message('操作成功');
        //       _this.dialogVisible = false;
        //     }
        //   });
        // },
        // /**
        //  * 控制保存按钮、xdialog、表单的状态
        // * @param viewType 表单类型
        // * @param editable 可编辑,默认false
        // */
        // switchStatus: function (viewType, editable) {
        //   var _this = this;
        //   _this.viewType = viewType;
        //   _this.saveBtnShow = editable;
        //   _this.dialogVisible = true;
        //   _this.formDisabled = !editable;
        // },
        // /**
        //  * 新增按钮
        //  */
        // addFn: function () {
        //   var _this = this;
        //   _this.switchStatus('ADD', true);
        //   _this.$nextTick(function () {
        //     _this.$refs.refForm.resetFields();
        //   });
        // },
        // /**
        //  * 修改
        //  */
        // modifyFn: function () {
        //   var _this = this;
        //   if (_this.$refs.refTable.selections.length != 1) {
        //     _this.$message({ message: '请先选择一条记录', type: 'warning' });
        //     return;
        //   }
        //   _this.switchStatus('EDIT', true);
        //   _this.$nextTick(function () {
        //     _this.$refs.refForm.resetFields();
        //     var obj = _this.$refs.refTable.selections[0];
        //     yufp.clone(obj, _this.formdata);
        //   });
        // },
        // /**
        //  * 详情
        //  */
        // infoFn: function () {
        //   var _this = this;
        //   var selectionsAry = _this.$refs.refTable.selections;
        //   if (selectionsAry.length != 1) {
        //     _this.$message({ message: '请先选择一条记录', type: 'warning' });
        //     return;
        //   }
        //   _this.switchStatus('DETAIL', false);
        //   _this.$nextTick(function () {
        //     _this.$refs.refForm.resetFields();
        //     yufp.clone(selectionsAry[0], _this.formdata);
        //   });
        // },
        // /**
        //  * 删除
        //  */
        // deleteFn: function () {
        //   var _this = this;
        //   var selections = _this.$refs.refTable.selections;
        //   if (selections.length < 1) {
        //     _this.$message({ message: '请先选择一条记录', type: 'warning' });
        //     return;
        //   }
        //   var len = selections.length, arr = [];
        //   for (var i = 0; i < len; i++) {
        //     arr.push(selections[i].id);
        //   }
        //   _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning',
        //     center: true,
        //     callback: function (action) {
        //       if (action === 'confirm') {
        //         yufp.service.request({
        //           method: 'POST',
        //           url: '/trade/example/delete',
        //           data: {
        //             ids: arr.join(',')
        //           },
        //           callback: function (code, message, response) {
        //             _this.$refs.refTable.remoteData();
        //             _this.$message('操作成功');
        //           }
        //         });
        //       }
        //     }
        //   });
        // },
        // /**
        //  * 导出操作
        //  */
        // exportFn: function () {
        //   var _this = this;
        //   yufp.util.exportExcelByTable({
        //     ref: _this.$refs.refTable,
        //     url: '/trade/example/list'
        //   });
        // }
      }
    });
  };
});