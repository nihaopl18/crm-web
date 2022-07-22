/**
 * @created by luoshun
 * @updated by
 * @description 黑名单商户
 */
define([
  'libs/yufp/widgets/js/YufpWfInit.js',
  './libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/yufpUploadTable.js',
  './custom/widgets/js/yufpUploadTable.js' ],
function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('WF_APP_STATUS');
    var vm = yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          rules: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '字段必须为不超过15位的数字'}, {
            min: 15,
            max: 15,
            message: '长度必须15个字符'
          }],
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          options: [{
            key: '0',
            value: '是'
          }, {
            key: '1',
            value: '否'
          }
          ],
          uploadInfoVisible: false,
          // 导入标题
          uploadTitle: 'Excel表导入黑名单商户',
          uploadDialog: false,
          fileList: [],
          action: yufp.service.getUrl({
            url: backend.yuspClimpBparamService + '/api/blacklist/uploadblacklist'
          }),
          headers: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          uploaddata: {
            createOrg: yufp.session.org.id,
            flag: '0'
          },
          // 查询url
          dataUrl: backend.yuspClimpBparamService + '/api/blacklist/getlist',
          // 表单数据
          formdata: {},
          // 是否可见
          dialogVisible: false,
          // 商户ID隐藏
          merchantIdDisabled: false,
          // 弹窗标题
          viewTitle: '',
          // 上传按钮隐藏
          uploadDisabled: true
        };
      },
      methods: {
        // 日期格式化(年月日)
        dateFormatterSimple: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined || datetime === null) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
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
          var validate = false;
          var orgid = yufp.session.org.id;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.formdata, model);
          if (_this.viewTitle === '新增') {
            model['createOrg'] = orgid;
            var param = {
              condition: JSON.stringify({
                merchantId: model.merchantId
              })
            };
            yufp.service.request({
              method: 'GET',
              url: backend.yuspClimpBparamService + '/api/blacklist/getblacklist',
              data: param,
              // 新增时判断商户编号是否重复
              callback: function (code, message, response) {
                if (response.data.length > 0) {
                  _this.$message({message: 'MCC编号已存在', type: 'warning' });
                } else {
                  // 向后台发送保存请求;
                  yufp.service.request({
                    method: 'POST',
                    url: backend.yuspClimpBparamService + '/api/blacklist/addblacklist',
                    // url: _this.viewTitle === '新增' ? backend.yuspClimpBparamService + '/api/whitelist/addwhite' : backend.yuspClimpBparamService + '/api/whitelist/updatewhite',
                    data: model,
                    callback: function (code, message, response) {
                      _this.$refs.refTable.remoteData();
                      _this.$message('操作成功');
                      _this.dialogVisible = false;
                    }
                  });
                }
              }
            });
          } else {
            model['updateOrg'] = orgid;
            yufp.service.request({
              method: 'POST',
              url: backend.yuspClimpBparamService + '/api/blacklist/updateblacklist',
              // url: _this.viewTitle === '新增' ? backend.yuspClimpBparamService + '/api/whitelist/addwhite' : backend.yuspClimpBparamService + '/api/whitelist/updatewhite',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            });
          }
          // // 向后台发送保存请求
          // yufp.service.request({
          //   method: 'POST',
          //   url: _this.viewTitle === '新增' ? backend.yuspClimpBparamService + '/api/blacklist/addblacklist' : backend.yuspClimpBparamService + '/api/blacklist/updateblacklist',
          //   data: model,
          //   callback: function (code, message, response) {
          //     _this.$refs.refTable.remoteData();
          //     _this.$message('操作成功');
          //     _this.dialogVisible = false;
          //   }
          // });
        },
        /**
         * 新增
         */
        addFn: function () {
          var _this = this;
          _this.viewTitle = '新增';
          _this.dialogVisible = true;
          _this.merchantIdDisabled = false;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].wfApprSts == '111') {
            _this.$message({ message: '不能修改审批中的数据', type: 'warning' });
            return;
          }
          _this.viewTitle = '修改';
          _this.dialogVisible = true;
          _this.merchantIdDisabled = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = selections[0];
            yufp.clone(obj, _this.formdata);
          });
        },
        /**
         * 导入
         */
        addMoreFn: function () {
          var _this = this;
          _this.uploadDialog = true;
        },
        /**
         * 提交
         */
        approveFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].batchId != null) {
            _this.$message({ message: '请先选择批次号为空的数据', type: 'warning' });
            return;
          }
          if (selections[0].wfApprSts != '000') {
            _this.$message({ message: '只能提交状态为待发起的数据！', type: 'warning' });
            return;
          }
          // 发起审批流程
          var commintData = {};
          commintData.bizSeqNo = selections[0].id;// 流程主键
          commintData.applType = 'BLACKLIST';// 模型版本申请类型字典项
          commintData.custName = selections[0].merchantName;
          commintData.custId = '0';
          commintData.paramMap = {
            bussOpId: selections[0].id,
            bussOpName: selections[0].merchantName
          };
          var load = _this.$loading();
          _this.$refs.yufpWfInit.wfInit(commintData, load);
        },
        /**
         * 批量提交
         */
        batchAddMoreFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].batchId == null) {
            _this.$message({ message: '请先选择一条有批次号数据', type: 'warning' });
            return;
          }
          if (selections[0].wfApprSts != '000') {
            _this.$message({ message: '只能提交状态为待发起的数据！', type: 'warning' });
            return;
          }
          // 发起审批流程
          var commintData = {};
          commintData.bizSeqNo = selections[0].batchId;// 流程主键
          commintData.applType = 'BLACKBATCH';// 模型版本申请类型字典项
          commintData.custName = selections[0].batchId;
          commintData.custId = '0';
          commintData.paramMap = {
            bussOpId: selections[0].id,
            bussOpName: selections[0].merchantName
          };
          var load = _this.$loading();
          _this.$refs.yufpWfInit.wfInit(commintData, load);
        },
        onAfterClose: function () {
        },
        // 提交页面关闭
        onAfterInit: function (data) {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections[0].batchId == null) {
            var model = {};
            model.id = selections[0].id;
            model.wfApprSts = '111';
            yufp.service.request({
              method: 'POST',
              url: backend.yuspClimpBparamService + '/api/blacklist/updatests',
              data: model,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({ message: '提交成功', type: 'warning' });
                }
              }
            });
          } else {
            var model = {};
            model.batchId = selections[0].batchId;
            model.wfApprSts = '111';
            yufp.service.request({
              method: 'POST',
              url: backend.yuspClimpBparamService + '/api/blacklist/updatebatchsts',
              data: model,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({ message: '提交成功', type: 'warning' });
                }
              }
            });
          }
        },

        // 文件上传成功处理逻辑
        onSuccess: function (response, file, fileList) {
          var _this = this;
          // console.log('上传文件', response);
          // alert(response.code);
          if (response.code == -1) {
            this.$message(response.message);
            vm.$refs.verUpload.clearFiles();
          } else {
            this.$message('文件导入成功!', '提示');
            vm.$refs.verUpload.clearFiles();
            _this.$refs.refTable.remoteData();
            // vm.$refs.accessTables.remoteData();
          }
        },
        onChange: function (file, fileList) {
          var _this = this;
          if (_this.uploadDisabled || fileList.length > 1) {
            _this.uploadDisabled = false;
          } else {
            _this.uploadDisabled = true;
          }
        },

        onRemove: function (file, fileList) {
          var _this = this;
          if (fileList.length < 1) {
            _this.uploadDisabled = true;
          }
        },
        onError: function () {
          this.$message('文件导入失败!', '提示');
          vm.$refs.verUpload.clearFiles();
          // vm.$refs.accessTables.remoteData();
        },

        // 上传之前判断文件格式
        beforeAvatarUpload: function (file) {
          var regex = /^.*\.(?:xls|xlsx)$/i;
          if (!regex.test(file.name)) {
            this.$message.error('只能导入xls或xlsx格式文件!');
            return false;
          }
          return file.name;
        },
        submitUpload: function (file) {
          var _this = this;
          _this.$confirm('确认要上传到服务器么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                _this.$refs.verUpload.submit();
                _this.uploadDialog = false;
              }
            }
          });
        },
        downTable: function (row, event) {
          var url = backend.fileService + '/api/file/provider/download?fileId=' + '7/2/20190218154520031-6A2FD4F3.xlsx';
          yufp.util.download(url);
        },
        // 上传模板
        upTable: function (row, event) {
          var _self = this;
          // _self.deleteVisible = false;
          _self.uploadInfoVisible = true;
          this.$nextTick(function () {
            // var obj = _self.$refs[refTable].selections[0];
            // this.uploadInfoform = Object.assign(this.uploadInfoform, obj);
            // 初始化查询上传附件
            // return yufp.service.getUrl({url: me.uploadAction});
            // 获取附件列表
            // vm.$refs.filesTable.queryFn(files);
            // 设置附件列表组件传入NOTICEID
            vm.noticeUpLoadBusNo = {
              busNo: '00000000'
            };
          });
        }
      }
    });
  };
});