/**
 * @Created by xujiawei xujy3@yusys.com.cn on 2020-7-14 15:22:00.
 * @updated by
 * @description 折算系数存贷交易维护
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/yufpOrgTree.js',
  './libs/md5/spark-md5.min.js',
  './custom/widgets/js/yufpExcelExport.js',
  './custom/widgets/js/yufpExcelImport.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.appBaseService + '/api/pmafcashamounttrancode/querylist',
          formdata: {},
          indexFormdata: {},
          queryFormModel: {},
          dataParams: {},
          dataerroPData: {},
          dialogVisible: false,
          bizDisa: false,
          rule: [
            { required: true, message: '必填项', trigger: 'blur' },
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          indexdialogVisible: false,
          indexinfoDialogVisible: false,
          erroDialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          action: yufp.service.getUrl({url: '/api/pmafcashamounttrancode/importTemplete'}),
          uploadData: {},
          uploadHeaders: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          }
        };
      },
      methods: {
        closeBtn: function () {
          var _this = this;
          _this.erroDialogVisible = false;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          // 向后台发送保存请求
          var url = backend.appCommonService + '/api/pmafcashamounttrancode/downLoadTemplete?' + 'condition=' + encodeURI(JSON.stringify(_this.queryFormModel));
          yufp.util.download(url);
          _this.dialogVisible = false;
        },
        /**
         * 保存
         */
        saveAddFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (_this.formdata.trancode.length > 6) {
            _this.$message({ message: '交易类型代码最长6位', type: 'warning' });
            return;
          }
          if (!validate) {
            return;
          }
          var url = '/api/pmafcashamounttrancode/add';
          if (_this.formdata.id) {
            url = '/api/pmafcashamounttrancode/edit';
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: url,
            data: model,
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$message(response.message);
              _this.dialogVisible = false;
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
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 新增按钮
         */
        importFn: function () {
          var _this = this;
          _this.indexdialogVisible = true;
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          _this.bizDisa = true;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
          });
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.bizDisa = false;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.id = null;
          });
        },
        orgSelectFn: function (data) {
          this.formdata.orgId = data.orgId;
          this.formdata.orgName = data.orgName;
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: 'api/pmafcashamounttrancode/delete',
                  data: arr.join(','),
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        beforeFileUpload: function (file) {
          // todo 此处考虑是否需要限制上传文件大小
          // var isLt10M = file.size / 1024 / 1024 < 10;
          // if (!isLt10M) {
          //   this.$message.error('上传文件大小不能超过 10MB!');
          // }
          var index = file.name.lastIndexOf('.');
          var ext = file.name.substr(index + 1);
          // var fileType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
          // var count = 0;
          var fileCheck = true;
          // for (var i in fileType) {
          //   if (file.type == fileType[i] || ext == 'rar') {
          //     count++;
          //   }
          // }
          if (ext != 'xlsx') {
            fileCheck = false;
            this.$message.error('请选择标准的数据补录模板文件');
          }
          // if (count == 0) {
          //   fileCheck = false;
          //   this.$message.error('上传文件格式不正确，请先导出对应数据补录模板文件');
          // }
          // return fileCheck && isLt10M;
          return fileCheck;
        },
        uploadSuccessFn: function (code, response) {
          var _this = this;
          if (code.code == 0) {
            if (response.response.data.code == 0) {
              this.$message({
                showClose: true,
                message: '文件上传成功',
                type: 'success'
              });
              _this.indexdialogVisible = false;
              _this.$refs.refTable.remoteData(); // 重新reload指标表格数据
            } else {
              _this.indexdialogVisible = false;
              _this.erroDialogVisible = true;
              _this.dataerroPData = response.response.data.erroList;
            }
          }
        },
        // 文件导入失败
        uploadErrorFn: function (rep) {
          this.$message.error('请选择标准的数据补录模板！');
        },
        // 文件导入超时
        uploadTimeoutFn: function (event, file) {
          this.$message({
            message: '文件上传超时',
            type: 'warn'
          });
        }
      },
      watch: {
        queryFormModel: {
          handler: function (val) {
            var temp = {
              condition: JSON.stringify(val)
            };
            yufp.clone(temp, this.downloadBaseParam);
          },
          deep: true
        }
      }
    });
  };
});