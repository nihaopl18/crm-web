/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-4 14:13:55.
 * @updated by
 * @description 潜在客户管理
 */
define(['pages/crmsys/custGeneralManager/potentialCustManage/potentialCustManage.css',
  './custom/plugins/yufp.watermark.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0016,CD0348,CD0349,CD0011,CD0050,CD0010,CST_S_CHANEL');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        var justifyExitFn = function (rule, value, callback) {
          if (_this.formdata.custName != '' && _this.formdata.certType != '' && _this.formdata.certNo != '') {
            var obj = {};
            obj.custName = _this.formdata.custName;
            obj.certType = _this.formdata.certType;
            obj.certNo = _this.formdata.certNo;
            // 向后台发送请求，判断该用户是否已是正式客户或潜在客户
            yufp.service.request({
              method: 'POST',
              url: '/trade/example/save',
              data: obj,
              callback: function (code, message, response) {
                // 如果已是正式客户或潜在客户
                // if() {
                //   callback(new Error('该用户已存在'));
                // } else {
                //   callback();
                // }
              }
            });
          }
        };
        return {
          custviewButton: !yufp.session.checkCtrl('custview'),
          setButton: !yufp.session.checkCtrl('set'),
          addButton: !yufp.session.checkCtrl('add'),
          updButton: !yufp.session.checkCtrl('upd'),
          downloadButton: !yufp.session.checkCtrl('download'),
          uploadButton: !yufp.session.checkCtrl('upload'),
          queryFormdata: {},
          baseParams: {},
          action: yufp.service.getUrl({
            url: backend.custpubService + '/api/potentialcust/uploadtableper'
          }),
          headers: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          dataUrl: backend.custpubService + '/api/potentialcust/list',
          formdata: {},
          dialogVisible: false,
          formDisabled: false,
          // 客户名称校验方法
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          justifyExitRule: [{ validator: justifyExitFn, trigger: 'blur' }],
          // 关注类型弹出框
          attentTypevisible: false,
          // 关注类型表格数据
          attentFormdata: {},
          comProp: {
            orgName: '',
            mgrName: ''
          },
          orgIdAuth: '',
          // 客户经理放大镜组件的参数
          mgrParam: {
            org: {
              dataParams: {
                orgCode: yufp.session.org.code
              }
            },
            user: {
              dataParams: {
                orgCode: yufp.session.org.code
              }
            }
          },
          resData: {}
        };
      },
      computed: {
        // 对公
        toCorporate: function () {
          // 未选择或是对私时，返回true
          return this.formdata.custType === '' || this.formdata.custType === undefined || this.formdata.custType === '2';
        },
        isMgrHidden: function () {
          if (yufp.session.roles.length == 1 && yufp.session.roles[0].code == '15') {
            return yufp.session.roles[0].code == '15';
          }
        }
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.custpubService + '/api/potentialcust/iscustmgr',
          data: {
            condition: JSON.stringify({userId: yufp.session.userId})
          },
          callback: function (code, message, response) {
            if (code == 0 && response.code === 0) {
              _this.resData = response.data;
            } else {
              _this.$message.error('查询失败');
            }
          }
        });
        yufp.service.request({
          method: 'GET',
          url: backend.custpubService + '/api/allcust/mypowerorg',
          data: {
            condition: JSON.stringify({userId: yufp.session.userId})
          },
          callback: function (code, message, response) {
            if (code == 0 && response.code === 0) {
              _this.orgIdAuth = response.data.orgIdAuth;
            } else {
              _this.$message.error('查询失败');
            }
          }
        });
        yufp.service.request({
          method: 'GET',
          url: backend.custgroupService + '/api/allcust/mybusitype',
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.data.busiType == '2') {
                _this.queryFormdata.custType = '2';
              } else {
                _this.queryFormdata.custType = '1';
              }
            }
          }
        });
      },
      methods: {
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            if (selections[i].belongMgr !== yufp.session.userCode) {
              _this.$message({ message: '只能删除自己创建的数据', type: 'warning' });
              return;
            }
            arr.push(selections[i].custId);
          }
          var cstType = _this.queryFormdata.custType;
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custpubService + '/api/potentialcust/delete',
                  data: {ids: arr.join(','), custType: cstType},
                  callback: function (code, message, response) {
                    if (code == '0') {
                      _this.$refs.refTable.remoteData();
                      _this.$message('操作成功');
                    } else {
                      _this.$message('操作失败');
                    }
                  }
                });
              }
            }
          });
        },
        searchFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.searchrefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.queryFormdata, model);
          model.userId = yufp.session.userId;
          model.orgCode = yufp.session.org.code;
          // 授权机构
          model.orgIdAuth = _this.orgIdAuth;
          var param = {
            condition: JSON.stringify(model)
          };
          _this.$refs.refTable.remoteData(param);
        },
        /**
         * 重置按钮
         */
        resetMainFn: function () {
          this.$refs.custSearchForm.resetFields();
        },
        /**
        * 查询表单-客户类型切换后重置证件类型
        */
        custTpChangeFn: function () {
          this.queryFormdata.certType = '';
        },
        /**
        * 打开客户视图
        */
        openViewFn: function () {
          var selections = this.$refs.refTable.selections;
          if (selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var customKey = 'custom_view' + selections[0].custId; // 请以custom_view前缀开头，并且全局唯一
          var custType = selections[0].custType;
          // 传递到客户视图的数据
          var pageData = {
            id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
            cust: selections[0],
            custId: selections[0].custId,
            custName: selections[0].custName
          };
          var id = custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView';
          yufp.frame.addTab({
            id: id, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '客户视图:' + selections[0].custName, // 页签名称
            data: pageData // 传递的业务数据，可选配置
          });
          yufp.frame.refreshTab({
            routeId: id, // 对公, // 菜单功能ID（路由ID）
            menuId: customKey, // 菜单ID，同addTab方法中的key
            title: '客户视图:' + selections[0].custName, // 页签名称
            data: pageData // 传递的业务数据，可选配置
          });
        },
        rowDblclickFn: function (row, event) {
          var selections = row;
          var customKey = 'custom_view' + selections.custId; // 请以custom_view前缀开头，并且全局唯一
          var custType = selections.custType;
          // 传递到客户视图的数据
          var pageData = {
            id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
            cust: selections,
            custId: selections.custId,
            custName: selections.custName
          };
          var id = custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView';
          yufp.frame.addTab({
            id: id, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '客户视图:' + selections.custName, // 页签名称
            data: pageData // 传递的业务数据，可选配置
          });
          yufp.frame.refreshTab({
            routeId: id, // 对公, // 菜单功能ID（路由ID）
            menuId: customKey, // 菜单ID，同addTab方法中的key
            title: '客户视图:' + selections.custName, // 页签名称
            data: pageData // 传递的业务数据，可选配置
          });
        },
        /**
        * 新增面板-客户类型切换后重置证件类型
        */
        custTpChangeFn: function () {
          this.formdata.certType = '';
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
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (_this.formdata.custType === '1') {
            if (!_this.formdata.phoneNo && !_this.formdata.telPhoneNo) {
              _this.$message({
                type: 'warning',
                message: '请填写联系手机或座机电话'
              });
              return;
            }
          } else if (_this.formdata.custType === '2') {
            if (!_this.formdata.contTelNo && !_this.formdata.telPhoneNo) {
              _this.$message({
                type: 'warning',
                message: '请填写联系人手机或座机电话'
              });
              return;
            }
          }
          // 如果未设置，将登录人机构设置为主办机构
          if (!model.belongBrch && !model.belongMgr && _this.resData) {
            model.belongBrch = _this.resData.orgCode;
            model.orgName = _this.resData.orgName;
            model.belongMgr = _this.resData.userId;
            model.mgrName = _this.resData.userName;
          }
          // 判断是新增还是修改
          // 修改
          if (model.custId) {
            // 如果客户类型为对公，则去除对私的数据，反之亦然
            if (model.custType == '1') {
              // 向后台发送潜在客户对私修改——保存请求
              yufp.service.request({
                method: 'POST',
                url: backend.custpubService + '/api/potentialcust/updateper',
                data: model,
                callback: function (code, message, response) {
                  if (code == 0 && response.code === 0) {
                    var model1 = {};
                    model1.custType = response.data.toString();
                    model1.userId = yufp.session.userId;
                    model1.orgCode = yufp.session.org.code;
                    // 授权机构
                    model1.orgIdAuth = _this.orgIdAuth;
                    var paramModel = {
                      condition: JSON.stringify(model1)
                    };
                    _this.$refs.refTable.remoteData(paramModel);
                    _this.$message('操作成功');
                    _this.dialogVisible = false;
                  } else {
                    _this.$message.error('操作失败');
                  }
                }
              });
            } else if (model.custType == '2') {
              // 向后台发送潜在客户对公修改——保存请求
              yufp.service.request({
                method: 'POST',
                url: backend.custpubService + '/api/potentialcust/updateorg',
                data: model,
                callback: function (code, message, response) {
                  if (code == 0 && response.code === 0) {
                    var model1 = {};
                    model1.custType = response.data.toString();
                    model1.userId = yufp.session.userId;
                    model1.orgCode = yufp.session.org.code;
                    // 授权机构
                    model1.orgIdAuth = _this.orgIdAuth;
                    var paramModel = {
                      condition: JSON.stringify(model1)
                    };
                    _this.$refs.refTable.remoteData(paramModel);
                    _this.$message('操作成功');
                    _this.dialogVisible = false;
                  } else {
                    _this.$message.error('操作失败');
                  }
                }
              });
            }
          } else {
            // 新增
            // 如果客户类型为对公，则去除对私的数据，反之亦然
            if (model.custType == '1') {
              // 向后台发送潜在客户对私新增——保存请求
              yufp.service.request({
                method: 'POST',
                url: backend.custpubService + '/api/potentialcust/addper',
                data: model,
                callback: function (code, message, response) {
                  if (code == 0 && response.code === 0) {
                    var model1 = {};
                    model1.custType = response.data.toString();
                    model1.userId = yufp.session.userId;
                    model1.orgCode = yufp.session.org.code;
                    // 授权机构
                    model1.orgIdAuth = _this.orgIdAuth;
                    var paramModel = {
                      condition: JSON.stringify(model1)
                    };
                    _this.$refs.refTable.remoteData(paramModel);
                    _this.$message('操作成功');
                    _this.dialogVisible = false;
                  } else {
                    _this.$message.error('用户已存在,新增失败');
                  }
                }
              });
            } else if (model.custType == '2') {
              // 向后台发送潜在客户对公新增——保存请求
              yufp.service.request({
                method: 'POST',
                url: backend.custpubService + '/api/potentialcust/addorg',
                data: model,
                callback: function (code, message, response) {
                  if (code == 0 && response.code === 0) {
                    var model1 = {};
                    model1.custType = response.data.toString();
                    model1.userId = yufp.session.userId;
                    model1.orgCode = yufp.session.org.code;
                    // 授权机构
                    model1.orgIdAuth = _this.orgIdAuth;
                    var paramModel = {
                      condition: JSON.stringify(model1)
                    };
                    _this.$refs.refTable.remoteData(paramModel);
                    _this.$message('操作成功');
                    _this.dialogVisible = false;
                  } else {
                    _this.$message.error('用户已存在,新增失败');
                  }
                }
              });
            }
          }
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
            delete _this.formdata.custId;
          });
        },
        /**
        * 选择机构后执行
        * @param {Object} nodeData 选择的节点数据
        */
        selectOrgFn: function (nodeData) {
          var _this = this;
          _this.comProp.mgrName = '';
          _this.formdata.belongMgr = '';
          _this.formdata.mgrName = '';
          _this.formdata.orgName = nodeData.orgName;
          _this.mgrParam.org.dataParams.orgCode = nodeData.orgId;
          _this.mgrParam.user.dataParams.orgCode = nodeData.orgId;
        },
        /**
        * 选择客户经理后执行
        */
        selectMgrFn: function (data) {
          var _this = this;
          _this.comProp.orgName = data[0].orgName;
          _this.formdata.mgrName = data[0].userName;
          _this.formdata.orgName = data[0].orgName;
          _this.formdata.belongBrch = data[0].orgId;
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
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
            _this.comProp.orgName = _this.formdata.orgName;
            _this.comProp.mgrName = _this.formdata.mgrName;
          });
        },
        /**
         * 设为我的关注客户——打开关注类型选择
         */
        setMyAttentionFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请选择至少一条记录', type: 'warning' });
            return;
          }
          _this.attentTypevisible = true;
          _this.$nextTick(function () {
            _this.$refs.attentFormRef.resetFields();
          });
        },
        /**
        * 设置为我的关注客户——保存
        */
        saveMyAttentionCustFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          var custIdarr = [];
          for (var i = 0, len = selections.length; i < len; i++) {
            custIdarr.push(selections[i].custId);
          }
          // 获取关注类型
          var attentType = _this.attentFormdata.attentType;
          _this.$confirm('设置为我的关注客户?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custpubService + '/api/ocrmfciattencust/join',
                  data: {condition: JSON.stringify({
                    custIds: custIdarr.join(','),
                    attentType: attentType,
                    userId: yufp.session.userId
                  })},
                  callback: function (code, message, response) {
                    if (response.code === 0) {
                      _this.attentTypevisible = false;
                      _this.$refs.refTable.remoteData();
                    }
                    _this.$message(response.message);
                  }
                });
              }
            }
          });
        },
        /**
         * 模板下载
         */
        downloadTemplateFn: function () {
          // 向后台发送请求，下载模板
          var url = backend.fileService + '/api/file/provider/download?fileId=' + 'potential.xlsx';
          yufp.util.download(url);
        },
        /**
         * 批量导入成功
         */
        importBatchSuccessFn: function (response, file, fileList) {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'success'
          });
        },
        /**
         * 批量导入失败
         */
        importBatchErrorFn: function () {
          this.$message({
            showClose: true,
            message: '导入失败',
            type: 'error'
          });
        },
        /**
        * 上传失败
        */
        uploadErrorFn: function () {

        },
        // 上传之前判断文件格式
        beforeAvatarUpload: function (file) {
          var regex = /^.*\.(?:xls|xlsx)$/i;
          if (!regex.test(file.name)) {
            this.$message.error('只能导入xls或xlsx格式文件!');
            return false;
          }
          return file.name;
        }
      }
    });
  };
});