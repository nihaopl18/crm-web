/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2018-12-26 15:30:03.
 * @updated by
 * @description 公告管理
 */
yufp.require.require('libs/tinymce/tinymce.min.js');
define([ './custom/widgets/js/ElTinymceX.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    // yufp.lookup.reg('CRUD_TYPE,IS_READ,NATIONALITY,PUBLISH_STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          // 公告表dataUrl
          announceDataUrl: '/trade/example/list',
          // dataUrl: '/trade/example/list',
          // 附件表格dataUrl
          attachmentDataUrl: '/trade/example/list',
          // 新增公告信息对象
          announcementdata: {
            formdata: {},
            // 附件对象，来自附件表格_this.$refs.refAnnounceTable.data
            attachmentdata: {}
          },
          rule: [
            { required: true, message: '必填项', trigger: 'blur' },
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          dialogVisible: false,
          formDisabled: false,
          // 控制附件上传弹出框展示
          attachmentdialogVisible: false,
          // 附件文件名
          fileName: '',
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          id: 'Tinymce',
          busNo: '01',
          height: 160,
          content: 'Tinymce',
          action: 'http://172.16.40.26:8080/yuspadmin/api/adminfileuploadinfo/uploadfile'
        };
      },
      computed: {
        isDetail: function () {
          return this.viewType === 'DETAIL';
        }
      },
      methods: {
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
          // 向后台传递的数据对象
          var model = {};
          yufp.clone(_this.announcementdata.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 附件表格数据
          var refAnnounceData = _this.$refs.refAnnounceTable.data;
          // 将附件表格对象存储到model中

          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: '/trade/example/save',
            data: model,
            callback: function (code, message, response) {
              _this.$refs.refAnnounceTable.remoteData();
              _this.$message('操作成功');
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
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          if (_this.$refs.refAnnounceTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refAnnounceTable.selections[0];
            yufp.clone(obj, _this.announcementdata.formdata);
          });
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refAnnounceTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], _this.announcementdata.formdata);
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refAnnounceTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          // var len = selections.length, arr = [];
          // for (var i = 0; i < len; i++) {
          //   arr.push(selections[i].id);
          // }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '/trade/example/delete',
                  data: {
                    ids: selections[0].id
                  },
                  callback: function (code, message, response) {
                    _this.$refs.refAnnounceTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        /**
         * 公告发布
         */
        publishFn: function () {
          var _this = this;
          var annoselections = _this.$refs.refAnnounceTable.selections;
          if (annoselections.length < 1) {
            _this.$message({ message: '请选择至少一条记录', type: 'warning' });
            return;
          }
          // 遍历选择的数据的审核状态
          for (var i = 0, length = annoselections.length; i < length; i++) {
            // 如果状态为已发布
            // if (annoselections[i]. === '') {
            //   _this.$message({ message: '已发布公告不能再次发布', type: 'warning' });
            //   return;
            // }
          }
          _this.$confirm('确定发布选中记录?', '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              // 调用后台接口，发布记录
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '',
                  data: {

                  },
                  callback: function (code, message, response) {
                    _this.$message('发布公告成功');
                  }
                });
              }
            }
          });
        },
        /**
         * 导出操作
         */
        exportFn: function () {
          var _this = this;
          yufp.util.exportExcelByTable({
            ref: _this.$refs.refAnnounceTable,
            url: '/trade/example/list'
          });
        },
        /**
         * 打开附件上传弹出框
         */
        // openUploadDialogFn: function () {
        //   this.attachmentdialogVisible = true;
        // },
        onchangeFn: function (file, fileList) {
          this.fileName = file.name;
        },
        /**
         * 文件上传操作
         */
        uploadFn: function () {
          this.$refs.upload.submit();
        },
        /**
         * 附件上传成功处理逻辑
         */
        uploadSuccessFn: function () {
          this.attachmentdialogVisible = false;
          this.fileName = '';
          this.$message({
            showClose: true,
            message: '文件上传成功',
            type: 'success'
          });
        },
        /**
         * 附件上传失败
         */
        uploadErrorFn: function () {
          this.$message({
            showClose: true,
            message: '文件上传失败',
            type: 'error'
          });
        },
        /**
         * 删除附件表格数据
         */
        deleteAttachmentFn: function () {
          var _this = this;
          var selections = _this.$refs.refAttachmentTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          // var len = selections.length, arr = [];
          // for (var i = 0; i < len; i++) {
          //   arr.push(selections[i].id);
          // }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '/trade/example/delete',
                  data: {
                    ids: selections[0].id
                  },
                  callback: function (code, message, response) {
                    _this.$refs.refAttachmentTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        /**
         * 刷新附件表格数据
         */
        refreshFn: function () {
          this.$refs.refAttachmentTable.remoteData();
        }
      }
    });
  };
});