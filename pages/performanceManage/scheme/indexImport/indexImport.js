/**
 * @Created by mayan mayan2@yusys.com.cn on 2020-1-14 19:02:43.
 * @updated by
 * @description 指标补录
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  'libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/yufpSchemeobjSelector.js',
  './custom/widgets/js/yufpSchemeindexSelector.js',
  './custom/widgets/js/yufpSchemespeSelector.js',
  './custom/widgets/js/yufpSchemeindexSelectorDy.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('OBJ,INDEX_APPLY_TYPE,YE_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          objParams: {
            schemeId: ''
          },
          objdownParams: {
            schemeId: ''
          },
          dataUrl: backend.appBaseService + '/api/pmafimpfillinfo/querylist',
          formdata: {},
          indexFormdata: {},
          queryData: {},
          dataParams: {},
          dataerroPData: {},
          dialogVisible: false,
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
          action: yufp.service.getUrl({ url: '/api/pmafimpfillinfo/importTemplete' }),
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
        schemeSelectFn: function (data) {
          this.objParams.schemeId = data[0].schemeId;
        },
        schemeSelectdownFn: function (data) {
          var _this = this;
          _this.objdownParams.schemeId = data[0].schemeId;
          _this.formdata.evlObjType = data[0].evlObjType;
        },
        indexSelectdownFn: function (data) {
          var _this = this;
          var indexnames = '';
          var indexids = '';
          // debugger;
          if (data.length > 0) {
            indexnames = data[0].indexName;
            indexids = data[0].indexId;
          }
          for (var i = 1; i < data.length; i++) {
            indexnames = indexnames + ',' + data[i].indexName;
            indexids = indexids + ',' + data[i].indexId;
          }
          _this.formdata.indexName = indexnames;
          _this.formdata.indexId = indexids;
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        saveValFn: function () {
          var _this = this;
          var indexValue = _this.indexFormdata.indexValue;
          if (indexValue == null || indexValue == '') {
            _this.$message({ message: '请填写指标值！', type: 'warning' });
            return;
          }
          var model = {};
          yufp.clone(_this.indexFormdata, model);
          _this.$confirm('是否保存数据?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafimpfillinfo/modify',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      if (response.code == 0) {
                        _this.indexinfoDialogVisible = false;
                        _this.$message({ message: '数据保存成功！' });
                        _this.$refs.refTable.remoteData(); // 重新reload指标表格数据
                        _this.$refs.indexinfoForm.resetFields();
                      } else {
                        _this.$message({ message: response.message, type: 'warning' });
                      }
                    } else {
                      _this.$message({ message: message, type: 'warning' });
                    }
                  }
                });
              }
            }
          });
        },
        cancelValFn: function () {
          var _this = this;
          _this.indexinfoDialogVisible = false;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          var startDate = _this.formdata.startDate;
          var startDateMon = parseInt(startDate.getMonth()) + 1;
          var startDateMonStr = '';
          if (parseInt(startDateMon) <= 9) {
            startDateMonStr = '0' + startDateMon;
          } else {
            startDateMonStr = startDateMon;
          }
          var startDateStr = startDate.getFullYear() + '' + startDateMonStr;
          var endDate = _this.formdata.endDate;
          var endDateMon = parseInt(endDate.getMonth()) + 1;
          var endDateMonStr = '';
          if (parseInt(endDateMon) <= 9) {
            endDateMonStr = '0' + endDateMon;
          } else {
            endDateMonStr = endDateMon;
          }
          var endDateStr = endDate.getFullYear() + '' + endDateMonStr;
          if (parseInt(endDateStr) < parseInt(startDateStr)) {
            _this.$message({ message: '开始日期不允许大于结束日期！', type: 'warning' });
            return;
          }
          if (startDateStr.substring(1, 4) != endDateStr.substring(1, 4)) {
            _this.$message({ message: '开始日期和结束日期必须为同一年！', type: 'warning' });
            return;
          }
          _this.formdata.startDate = startDateStr + '01';
          _this.formdata.endDate = endDateStr + '01';
          yufp.clone(_this.formdata, model);
          // debugger;
          // 向后台发送保存请求
          var url = backend.appCommonService + '/api/pmafimpfillinfo/downLoadTemplete?' + 'condition=' + encodeURI(JSON.stringify(model));
          yufp.util.download(url);
          _this.dialogVisible = false;
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
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.indexinfoDialogVisible = true;
          _this.$nextTick(function () {
            // _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.indexFormdata);
          });
        },
        /**
         * 模板下载
         */
        exportFn: function () {
          var _this = this;
          _this.dialogVisible = true;
          _this.formDisabled = false;
          _this.$nextTick(function () {
            // _this.$refs.refForm.resetFields();
            _this.$refs.refForm.resetFields();
          });
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
                  url: 'api/pmafimpfillinfo/delete',
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
      }
    });
  };
});