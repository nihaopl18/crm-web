/**
 * @Created by 闫天一 yanty1@yusys.com.cn on 2019-1-29 10:11:51.
 * @updated by
 * @description 产品视图-宣传资料
 */
define([
  './custom/widgets/js/yufpUploadTable.js'],
  function (require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {
      var prodId = data.prodId;
      yufp.lookup.reg('CD0432');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          return {
            addBtn: !yufp.session.checkViewCtrl('add', data.id),
            editBtn: !yufp.session.checkViewCtrl('edit', data.id),
            detailBtn: !yufp.session.checkViewCtrl('detail', data.id),
            deleteBtn: !yufp.session.checkViewCtrl('delete', data.id),
            Id: '',
            height: yufp.frame.size().height,
            dataUrl: backend.productService + '/api/ocrmfpddrumbeating/publicitymaterialquery/' + prodId,
            saveBtnShow: true,
            formdata: {},
            async: false,
            dialogVisible: false,
            formDisabled: false,
            fileUpLoadBusNo: {
              condition: JSON.stringify({
                busNo: ''
              })
            },
            fileBtnVisible: true,
            fileBtnVisible1: true,
            viewType: 'DETAIL',
            viewTitle: yufp.lookup.find('CRUD_TYPE', false),
            initFilesParams: {
              condition: JSON.stringify({
                busNo: ''
              })
            },
            rule: {
              dataType: [
                { required: true, message: '字段不能为空', trigger: 'blur' }
              ]
            }
          };
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
            var validate = false;
            _this.$refs.refForm.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            if (_this.Id == '') {
              var model = {
                prodId: prodId
              };
            } else {
              var model = {
                prodId: prodId,
                id: _this.Id
              };
            }
            yufp.clone(_this.formdata, model);
            // 请调用服务进行后台保存
            if (model.id == null || model.id == '') {
              yufp.service.request({
                method: 'POST',
                url: backend.productService + '/api/ocrmfpddrumbeating/createpublicityaaterial',
                data: model,
                callback: function (code, message, response) {
                  if (code == '0') {
                    _this.$message({ message: '数据保存成功！' });
                    if (_this.Id != '') {
                      // 当id不等于空的时候，说明资料类型已经新增成功了,此时点击保存则关闭新增框
                      _this.dialogVisible = false;
                    }
                    _this.Id = response.data;
                    _this.$message({ message: '数据保存成功！' });
                    _this.$refs.refTable.remoteData();
                    _this.fileTableQuery({ id: response.data });
                    _this.formDisabled = true;
                    _this.fileBtnVisible = true;
                    _this.fileBtnVisible1 = true;
                  }
                }
              });
            } else {
              yufp.service.request({
                method: 'POST',
                url: backend.productService + '/api/ocrmfpddrumbeating/updatepublicityaaterial',
                data: model,
                callback: function (code, message, response) {
                  if (code == '0') {
                    _this.$message({ message: '数据保存成功！' });
                    _this.$refs.refTable.remoteData();
                    _this.dialogVisible = false;
                  }
                }
              });
            }
          },
          /**
           * 刷新
           */
          nodeClickFn: function (nodeData, node, self) {
            var _this = this;
            var param = {
              condition: JSON.stringify({
                catlCode: nodeData.id
              })
            };
            _this.$refs.refTable.remoteData(param);
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
          },
          /**
           * 新增按钮
           */
          addFn: function () {
            var _this = this;
            // if (_this.currClickNode == '') {
            //   _this.$message({message: '请先选择菜单节点', type: 'warning'});
            //   return;
            // }
            // if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.userCode) {
            //   _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            //   return;
            // }
            _this.fileBtnVisible = false;
            _this.fileBtnVisible1 = false;
            _this.switchStatus('ADD', true);
            _this.$nextTick(function () {
              _this.Id = '';
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
            _this.fileBtnVisible1 = true;
            _this.switchStatus('EDIT', true);
            _this.$nextTick(function () {
              _this.$refs.refForm.resetFields();
              var obj = _this.$refs.refTable.selections[0];
              _this.Id = obj.id;
              _this.fileTableQuery(obj);
              yufp.clone(obj, _this.formdata);
            });
          },
          /**
           * 删除
           */
          deleteFn: function () {
            var _this = this;
            var selectionsAry = _this.$refs.refTable.selections;
            if (selectionsAry.length != 1) {
              _this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.userCode) {
              _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
              return;
            }
            _this.$confirm('是否删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(function () {
              yufp.service.request({
                method: 'POST',
                url: backend.productService + '/api/ocrmfpddrumbeating/deletepublicityaaterial',
                data: {
                  id: _this.$refs.refTable.selections[0].id
                },
                callback: function (code, message, response) {
                  if (code == '0') {
                    _this.$message({ message: '删除成功！' });
                    _this.$refs.refTable.remoteData();
                  }
                }
              });
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
            }
            _this.fileBtnVisible = false;
            _this.switchStatus('DETAIL', false);
            _this.$nextTick(function () {
              _this.$refs.refForm.resetFields();
              var obj = _this.$refs.refTable.selections[0];
              _this.Id = obj.Id;
              _this.fileTableQuery(obj);
              yufp.clone(obj, _this.formdata);
            });
          },
          openview: function () {
            var _this = this;
            var selectionsAry = _this.$refs.refTable.selections;
            if (selectionsAry.length != 1) {
              _this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var obj = _this.$refs.refTable.selections[0];
            yufp.frame.addTab({
              id: 'productView', // 菜单功能ID（路由ID）
              key: 'productView', // 自定义唯一页签key
              title: '产品视图', // 页签名称
              data: { id: '74b14d8945284d2095ce928aea7ca1f5', prodId: obj.productId }
            });
          },
          /**
           * 附件列表查询
           */
          fileTableQuery: function (obj) {
            var _this = this;
            var idTemp = obj != null && obj.id != null ? obj.id : '';
            _this.fileUpLoadBusNo = { busNo: idTemp };
            // 初始化附件列表查询时，传入为空
            var tempParams = {
              condition: JSON.stringify({
                busNo: idTemp
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
            var fileType = ['image/jpeg', 'image/gif', 'image/png', 'image/bmp', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/x-rar', 'application/x-zip-compressed', 'application/java-archive', 'image/gif', 'image/bmp', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/x-tar', 'application/octet-stream', 'application/x-rar-compressed'];
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
            this.fileTableQuery({ id: this.Id });
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