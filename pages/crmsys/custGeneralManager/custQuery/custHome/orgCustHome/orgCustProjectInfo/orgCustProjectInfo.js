/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2019-1-22 16:03:04.
 * @updated by
 * @description 知识库发布
 */
define([
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/yufpUploadTable.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0238,CD0330,CD0114,CD0114');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          addBtn: !yufp.session.checkViewCtrl('add', data.id),
          editBtn: !yufp.session.checkViewCtrl('edit', data.id),
          detailBtn: !yufp.session.checkViewCtrl('detail', data.id),
          deleteBtn: !yufp.session.checkViewCtrl('delete', data.id),
          comProId: '',
          dataUrl: backend.custorgService + '/api/ocrmfciorgprojectinfo/querylist/' + custId,
          saveBtnShow: true,
          cancelBtnShow: true,
          formdata: {},
          height: yufp.frame.size().height,
          dialogVisible: false,
          formDisabled: false,
          inputIdDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          initFilesParams: {
            condition: JSON.stringify({
              busNo: ''
            })
          },
          fileUpLoadBusNo: {},
          fileBtnVisible: false,
          downBtn: false,
          rule: {
            projName: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' },
              {required: true, message: '字段不能为空', trigger: 'blur'}
            ],
            projType: [
              {required: true, message: '字段不能为空', trigger: 'blur'}
            ],
            remarks: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ]
          }
        };
      },
      methods: {
        // 清空obj对象 -- common
        clearObj: function (obj) {
          for (var key in obj) {
            obj[key] = null;
          }
          return obj;
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
         */
        saveFn: function () {
          var _this = this;
          var model = {custId: custId};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (model.comProId == null || model.comProId == '') {
            // 新增请求
            yufp.service.request({
              method: 'POST',
              url: backend.custorgService + '/api/ocrmfciorgprojectinfo/ctrate',
              data: model,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.comProId = response.data;
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                  // _this.dialogVisible = false;
                  // 新增成功后，知识库数据不可编辑、附件上传下载删除按钮可见
                  _this.fileTableQuery({comProId: response.data});
                  _this.formDisabled = true;
                  _this.fileBtnVisible = true;
                  _this.downBtn = true;
                  _this.saveBtnShow = false;
                }
              }
            });
          } else {
            // 修改请求
            yufp.service.request({
              method: 'POST',
              url: backend.custorgService + '/api/ocrmfciorgprojectinfo/modify',
              data: model,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                  // _this.dialogVisible = false;
                }
              }
            });
          }
          // 请调用服务进行后台保存
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
          _this.saveBtnShow = editable;
          _this.cancelBtnShow = editable;
        },
        /**
         * 新增
         */
        addFn: function () {
          var _this = this;
          _this.fileBtnVisible = false;
          _this.downBtn = false;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.clearObj(_this.formdata);
            _this.comProId = '';
            _this.fileTableQuery();
            _this.$refs.refForm.resetFields();
          });
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
          if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.userCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
          }

          _this.fileBtnVisible = true;
          _this.downBtn = true;
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            _this.comProId = obj.comProId;
            _this.fileTableQuery(obj);
            yufp.clone(obj, _this.formdata);
          });
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.fileBtnVisible = false;
          _this.downBtn = true;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            _this.comProId = obj.comProId;
            _this.fileTableQuery(obj);
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
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.userCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
          }

          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].comProId);
          }
          var comProIds = arr.join(',');
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custorgService + '/api/ocrmfciorgprojectinfo/delete',
                  data: {
                    // Id: _this.$refs.refTable.selections[0].Id
                    'comProId': comProIds
                  },
                  callback: function (code, message, response) {
                    if (code == 0) {
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
         * 附件列表查询
         */
        fileTableQuery: function (obj) {
          var _this = this;
          var comProIdTemp = obj != null && obj.comProId != null ? obj.comProId : '';
          _this.fileUpLoadBusNo = { busNo: comProIdTemp};
          // 初始化附件列表查询时，传入为空
          var tempParams = {
            condition: JSON.stringify({
              busNo: comProIdTemp
            })
          };
          yufp.extend(_this.initFilesParams, tempParams);
          // 获取附件列表
          _this.$refs.fileTable.queryFn();
        },
        /**
         * 检查上传文件大小和类型
         */
        beforeFileUpload: function (file) {
          var isLt10M = file.size / 1024 / 1024 < 50;
          if (!isLt10M) {
            this.$message.error('上传文件大小不能超过 50MB!');
          }
          var index = file.name.lastIndexOf('.');
          var ext = file.name.substr(index + 1);
          // var fileType = ['image/jpeg', 'image/gif', 'image/png', 'image/bmp', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/x-rar'];
          var fileType = ['image/jpeg', 'image/gif', 'image/png', 'image/bmp', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/x-rar', 'application/x-zip-compressed', 'application/java-archive', 'image/gif', 'image/bmp', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/x-tar', 'application/octet-stream', 'application/x-rar-compressed' ];
          var count = 0;
          var fileCheck = true;
          for (var i in fileType) {
            if (file.type == fileType[i] || ext == 'rar') {
              count++;
            }
          }
          if (count == 0) {
            fileCheck = false;
            this.$message.error('上传文件应为图片、文本、表格、压缩包格式！');
          }
          return fileCheck && isLt10M;
        },
        /**
         * 附件上传成功处理逻辑
         */
        uploadSuccessFn: function () {
          this.fileTableQuery({comProId: this.comProId});
          this.$message({
            showClose: true,
            message: '文件上传成功',
            type: 'success'
          });
        }
      }
    });
  };
});