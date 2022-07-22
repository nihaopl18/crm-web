/**
 * @Created by 万爽 wanshuang@yusys.com.cn on 2020-1-7 17:03:58.
 * @updated by
 * @description 岗位指标参数
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/YufpUserSelector.js',
  './custom/widgets/js/yufpExtTree.js',
  './custom/widgets/js/yufpPostTree.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,AREA_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          addNodeBtnDisable: false,
          dataUrl: backend.appBaseService + '/api/pmafpersonpostparaminfo/querylist',
          treeUrl: backend.appBaseService + '/api/pmafpersonpostparammenu/querymenulist',
          saveBtnShow: true,
          cancelBtnShow: true,
          formdata: {},
          rule: [
            { validator: yufp.validator.zfNum, message: ' 请输入正确数字'}
          ],
          addMenuFlag: false,
          height: yufp.frame.size().height,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          params: {},
          queryData: {},
          treeDialogVisible: false,
          treeformDisabled: false,
          saveTreeBtnShow: false,
          title: '',
          currClickNode: '',
          currClickName: '',
          treeFormdata: {},
          paramList: [],
          treeParam: {},
          dialogTwoVisible: false,
          activeNames: ['1'],
          personData: [],
          orgTreeParams: {
            needCheckbox: true,
            checkStrictly: true
          },
          orgUserTreeParams: {
            needCheckbox: true,
            checkStrictly: true,
            checkboxVal: true
          },
          falgOne: false,
          indexRow: '',
          requiredDis: ''
        };
      },
      methods: {
        handlemenuDialogClose: function () {
          var _this = this;
          _this.treeDialogVisible = false;
          _this.currClickNode = '';
          _this.currClickName = '';
        },
        handleparamDialogClose: function () {
          var _this = this;
          _this.currClickNode = '';
          _this.currClickName = '';
          _this.dialogVisible = false;
        },
        handlepostparamDialogClose: function () {
          var _this = this;
          _this.currClickNode = '';
          _this.currClickName = '';
          _this.dialogTwoVisible = false;
        },
        changeValue: function (val) {
          var re = /^(\-|\+?)\d+(\.\d+)?$/;
          if (!re.test(val)) {
            this.$message({message: '请输入数字', type: 'warning'});
            return;
          }
        },
        userchangeValue: function (val) {
          var re = /^(\-|\+?)\d+(\.\d+)?$/;
          if (!re.test(val)) {
            this.$message({message: '请输入数字', type: 'warning'});
            return;
          }
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.currClickNode = '';
          _this.currClickName = '';
          _this.dialogVisible = false;
        },
        clearFn: function () {
          var _this = this;
          _this.currClickNode = '';
          _this.currClickName = '';
          _this.dialogTwoVisible = false;
        },
        cancelTreeFn: function () {
          var _this = this;
          _this.treeDialogVisible = false;
          _this.currClickNode = '';
          _this.currClickName = '';
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          model.dirId = _this.currClickNode;
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (parseFloat(_this.formdata.minLimit) > parseFloat(_this.formdata.paramValue)) {
            _this.$message({message: '参数值小于取值下限', type: 'warning'});
            return;
          }
          if (parseFloat(_this.formdata.maxLimit) < parseFloat(_this.formdata.paramValue)) {
            _this.$message({message: '参数值大于取值上限', type: 'warning'});
            return;
          }
          var url = '';
          if (model.id) {
            model.dirId = null;
            url = backend.appBaseService + '/api/pmafpersonpostparaminfo/modify';// 修改方法
          } else {
            url = backend.appBaseService + '/api/pmafpersonpostparaminfo/add';// 新增方法
          }
          _this.$confirm('是否保存数据?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'POST',
                  url: url,
                  data: model,
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                    _this.dialogVisible = false;
                    _this.currClickNode = '';
                    _this.currClickName = '';
                  }
                });
              }
            }
          });
        },
        saveTreeFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.treeFormdata, model);
          var validate = false;
          _this.$refs.treeForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var url = '';
          if (_this.addMenuFlag) {
            _this.addMenuFlag = false;
            model.parentDirId = _this.currClickNode;
            url = backend.appBaseService + '/api/pmafpersonpostparammenu/add';// 新增方法
          } else {
            model.id = _this.currClickNode;
            url = backend.appBaseService + '/api/pmafpersonpostparammenu/modify';// 修改方法
          }
          _this.$confirm('是否保存数据?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                // 保存全部数据
                yufp.service.request({
                  method: 'POST',
                  url: url,
                  data: model,
                  callback: function (code, message, response) {
                    _this.$refs.refTree.remoteData();
                    _this.$message('操作成功');
                    _this.treeDialogVisible = false;
                    _this.currClickNode = '';
                    _this.currClickName = '';
                  }
                });
              }
            }
          });
          // 向后台发送保存请求
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
        nodeClickFn: function (nodeData, node, self) {
          var _this = this;
          if (node.level >= 2) {
            _this.addNodeBtnDisable = true;
          } else {
            _this.addNodeBtnDisable = false;
          }
          _this.treeParam = nodeData;
          _this.currClickNode = nodeData.id;
          _this.currClickName = nodeData.dirName;
          // 根据选择的节点id获取查询条件，右侧表格刷新数据
          _this.queryData.dirId = nodeData.id;
          var params = {
            condition: JSON.stringify({
              dirId: _this.queryData.dirId,
              paramId: _this.queryData.paramId,
              paramName: _this.queryData.paramName
            })
          };
          _this.$nextTick(function () {
            _this.$refs.refTable.remoteData(params);
          });
        },
        /**
         * 新增
         */
        addFn: function () {
          var _this = this;
          if (_this.currClickNode == '') {
            _this.$message({message: '请先选择目录节点', type: 'warning'});
            return;
          }
          if (_this.treeParam.dirName == '岗位参数根目录') {
            _this.$message({ message: '根目录不允许添加！', type: 'warning' });
            return;
          }
          _this.requiredDis = false;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.id = null;
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
          if (_this.$refs.refTable.selections[0].creator != yufp.session.user.loginCode) {
            _this.$message({ message: '只能修改自己创建的数据', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          // 触发校验方法
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmafparaminfo/queryauth',
            data: {
              'paramId': _this.$refs.refTable.selections[0].paramId
            },
            callback: function (code, message, response) {
              if (response.data.length == 0) {
                _this.requiredDis = false;
              } else {
                _this.requiredDis = true;
              }
              _this.$refs.refForm.resetFields();
              var obj = _this.$refs.refTable.selections[0];
              yufp.clone(obj, _this.formdata);
            }
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
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(_this.$refs.refTable.selections[0], _this.formdata);
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
          for (var i in selections) {
            if (selections[i].creator != yufp.session.user.loginCode) {
              _this.$message({ message: '只能删除自己创建的数据', type: 'warning' });
              return;
            }
          }
          // 触发校验方法
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmafparaminfo/queryauth',
            data: {
              'paramId': _this.$refs.refTable.selections[0].paramId
            },
            callback: function (code, message, response) {
              if (response.data.length == 0) {
                var len = selections.length, arr = [];
                for (var i = 0; i < len; i++) {
                  arr.push(selections[i].id);
                }
                _this.$confirm('该操作将删除所选的数据，是否继续?', '提示', {
                  confirmButtonText: '是',
                  cancelButtonText: '否',
                  type: 'warning',
                  center: true,
                  callback: function (action) {
                    if (action === 'confirm') {
                      // 删除方法
                      yufp.service.request({
                        method: 'POST',
                        url: backend.appBaseService + '/api/pmafpersonpostparaminfo/delete',
                        data: arr.join(','),
                        callback: function (code, message, response) {
                          _this.$refs.refTable.remoteData();
                          _this.$message('操作成功');
                        }
                      });
                    }
                  }
                });
              } else {
                var stringMsg = '';
                for (var i = 0; i < response.data.length; i++) {
                  stringMsg += response.data[i].type;
                  stringMsg += response.data[i].indexId;
                  if (i != response.data.length - 1) {
                    stringMsg += '、';
                  }
                }
                _this.$message({ message: '该参数已被引用,引用的信息有：' + stringMsg, type: 'warning' });
                return;
              }
            }
          });
        },
        deleteNodeFn: function () {
          var _this = this;
          if (_this.currClickNode == '') {
            _this.$message({message: '请先选择目录节点', type: 'warning'});
            return;
          }
          if (_this.currClickName == '岗位参数根目录') {
            _this.$message({message: '根目录不允许删除！', type: 'warning'});
            return;
          }
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmafpersonpostparammenu/queryIsMenuCode',
            data: {'dirId': _this.currClickNode},
            callback: function (code, message, response) {
              var countnum = response.data.countnum;
              if (countnum == 0) {
                _this.$confirm('该操作将删除所选择的目录节点，是否继续?', '提示', {
                  confirmButtonText: '是',
                  cancelButtonText: '否',
                  type: 'warning',
                  center: true,
                  callback: function (action) {
                    if (action === 'confirm') {
                      // 删除方法
                      yufp.service.request({
                        method: 'POST',
                        url: backend.appBaseService + '/api/pmafpersonpostparammenu/delete',
                        data: _this.currClickNode,
                        callback: function (code, message, response) {
                          _this.$refs.refTree.remoteData();
                          _this.$message('操作成功');
                          _this.treeDialogVisible = false;
                          _this.currClickNode = '';
                        }
                      });
                    }
                  }
                });
              } else {
                _this.$message({message: '该目录下存在参数或者目录，不允许删除！', type: 'warning'});
                return;
              }
            }
          });
        },
        addNodeFn: function () {
          var _this = this;
          _this.addMenuFlag = true;
          if (_this.currClickNode == '') {
            _this.$message({message: '请先选择目录节点', type: 'warning'});
            return;
          }
          _this.title = '考核参数根目录新增';
          _this.switchTreeStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.treeForm.resetFields();
            _this.treeFormdata.id = null;
            _this.treeFormdata.parentDirId = _this.currClickNode;
            _this.treeFormdata.parentDirName = _this.currClickName;
          });
        },
        modifyNodeFn: function () {
          var _this = this;
          if (_this.currClickNode == '') {
            _this.$message({message: '请先选择目录节点', type: 'warning'});
            return;
          }
          if (_this.currClickName == '岗位参数根目录') {
            _this.$message({message: '根目录不允许维护！', type: 'warning'});
            return;
          }
          _this.switchTreeStatus('EDIT', true);
          _this.title = '考核参数根目录修改';
          _this.$nextTick(function () {
            _this.$refs.treeForm.resetFields();
            // this.treeFormdata.dirName = _this.currClickName;
            yufp.clone(_this.treeParam, _this.treeFormdata);
          });
        },
        switchTreeStatus: function (viewType, editable) {
          var _this = this;
          _this.treeDialogVisible = true;
          _this.treeformDisabled = !editable;
          _this.saveTreeBtnShow = editable;
        },
        /**
         * 录入岗位参数值查询原数据并弹出面板
         */
        addOrgFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogTwoVisible = true;
          _this.paramList = [];
          _this.falgOne = false;
          _this.$nextTick(function () {
            if (_this.$refs.refOrgRelateObjIds) {
              _this.$refs.refOrgRelateObjIds.$children[0].$children[0].setRawValue('');
            }
            if (_this.$refs.refUserRelateObjIds) {
              _this.$refs.refUserRelateObjIds.$children[0].$children[0].setRawValue('');
            }
          });
          // 查询岗位信息
          // 查询数据方法
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmafpostparamlistinfo/querylist',
            data: {
              'paramId': _this.$refs.refTable.selections[0].paramId
            },
            callback: function (code, message, response) {
              _this.paramList = response.data;
            }
          });
          _this.dialogTwoVisible = true;
          // 查询数据方法
          // yufp.service.request({
          //   method: 'GET',
          //   url: backend.appBaseService + '/api/pmafparamlistinfo/querylist',
          //   data: {
          //     'paramId': _this.$refs.refTable.selections[0].paramId
          //   },
          //   callback: function (code, message, response) {
          //     _this.paramList = response.data;
          //   }
          // });
          // 查询数据方法
          // yufp.service.request({
          //   method: 'GET',
          //   url: '/trade/example/delete',
          //   data: {},
          //   callback: function (code, message, response) {
          //     _this.paramList = response.data;
          //   }
          // });
        },
        /**
         * 岗位数据删除
         */
        handleDelete: function (index, row) {
          this.paramList.splice(index, 1);
          this.falgOne = false;
        },
        /**
         * 人员 岗位数据删除
         */
        userhandleDelete: function (index, row) {
          this.personData.splice(index, 1);
        },
        /**
         * 岗位放大镜选中后新增数据
         */
        orgSelectFn: function (data) {
          var _this = this;
          var formData = _this.$refs.refTable.selections[0];
          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              if (_this.flagEqual(data[i].sysPostCode)) {
                var obj = {};
                obj.id = null;
                obj.paramId = formData.paramId;
                obj.paramName = formData.paramName;
                obj.minLimit = formData.minLimit;
                obj.maxLimit = formData.maxLimit;
                obj.effectPost = data[i].sysPostCode;
                obj.effectPostName = data[i].sysPostName;
                obj.creator = yufp.session.user.userName;
                obj.createDate = yufp.util.dateFormat(new Date(), '{y}-{m}-{d}');
                obj.paramValue = '';
                obj.modifyUser = yufp.session.user.userName;
                obj.modifyDate = yufp.util.dateFormat(new Date(), '{y}-{m}-{d}');
                _this.paramList.push(obj);
              }
            }
          }
        },
        userSelectFn: function (data) {
          var _this = this;
          var formData = _this.$refs.refTable.selections[0];
          var postData = _this.$refs.refTableThree.selections[0];
          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              if (_this.userflagEqual(data[i].loginCode)) {
                var obj = {};
                obj.id = null;
                obj.userId = data[i].loginCode;
                obj.userName = data[i].userName;
                obj.paramId = formData.paramId;
                obj.paramName = formData.paramName;
                obj.minLimit = formData.minLimit;
                obj.maxLimit = formData.maxLimit;
                obj.effectPostName = postData.effectPostName;
                obj.effectPost = postData.effectPost;
                obj.creator = yufp.session.user.userName;
                obj.createDate = yufp.util.dateFormat(new Date(), '{y}-{m}-{d}');
                obj.paramValue = '';
                obj.modifyUser = yufp.session.user.userName;
                obj.modifyDate = yufp.util.dateFormat(new Date(), '{y}-{m}-{d}');
                _this.personData.push(obj);
              }
            }
          }
        },
        /**
         * 岗位去重判断
         */
        flagEqual: function (sysPostCode) {
          var newList = this.paramList.filter(function (obj) {
            return obj.effectPost == sysPostCode;
          });
          if (newList.length > 0) {
            return false;
          } else {
            return true;
          }
        },
        userflagEqual: function (loginCode) {
          var newList = this.personData.filter(function (obj) {
            return obj.userId == loginCode;
          });
          if (newList.length > 0) {
            return false;
          } else {
            return true;
          }
        },
        /**
         * 保存岗位信息
         */
        saveTwoFn: function () {
          var _this = this;
          var listlen = _this.paramList.length;
          for (var i = 0; i < listlen; i++) {
            var obj = _this.paramList[i];
            obj.id = null;
            if (obj.paramValue == '') {
              this.$message({ message: '参数值必填，请补全参数值', type: 'warning' });
              return;
            }
            var re = /^(\-|\+?)\d+(\.\d+)?$/;
            if (!re.test(obj.paramValue)) {
              this.$message({message: '请输入数字', type: 'warning'});
              return;
            }
            var mixValue = obj.minLimit;
            var maxValue = obj.maxLimit;
            if (parseFloat(obj.paramValue) < parseFloat(mixValue)) {
              this.$message({ message: '【' + obj.effectPostName + '】' + '参数值不能小于取值下限', type: 'warning' });
              return;
            }
            if (parseFloat(obj.paramValue) > parseFloat(maxValue)) {
              this.$message({ message: '【' + obj.effectPostName + '】' + '参数值不能大于取值上限', type: 'warning' });
              return;
            }
          }
          _this.$confirm('保存人员岗位信息，是否继续?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                if (listlen == 0) {
                  var objn = {};
                  objn.paramId = _this.$refs.refTable.selections[0].paramId;
                  _this.paramList.push(objn);
                }
                // 保存全部数据
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafpostparamlistinfo/add',
                  data: JSON.stringify(_this.paramList),
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.dialogTwoVisible = false;
                    }
                  }
                });
              }
            }
          });
        },
        /**
         * 查询对应岗位下的人员信息
         */
        handleFenpei: function (index, row) {
          var _this = this;
          _this.indexRow = index;
          if (row.list != null && row.list != undefined && row.list != '') {
            _this.personData = row.list;
            _this.$nextTick(function () {
              _this.falgOne = true;
              if (_this.$refs.refUserRelateObjIds) {
                _this.$refs.refUserRelateObjIds.$children[0].$children[0].setRawValue('');
              }
            });
          } else {
            // 查询数据方法
            yufp.service.request({
              method: 'GET',
              url: backend.appBaseService + '/api/pmafpostparamperinfo/querylist',
              data: {
                'paramId': row.paramId,
                'effectPost': row.effectPost
              },
              callback: function (code, message, response) {
                _this.personData = response.data;
              }
            });
            _this.$nextTick(function () {
              _this.falgOne = true;
              if (_this.$refs.refUserRelateObjIds) {
                _this.$refs.refUserRelateObjIds.$children[0].$children[0].setRawValue('');
              }
            });
          }
        },
        /**
         * 暂存
         */
        saveThreeFn: function () {
          var _this = this;
          for (var i = 0; i < _this.personData.length; i++) {
            var obj = _this.personData[i];
            obj.id = null;
            if (obj.paramValue == '') {
              this.$message({ message: '人员岗位参数值必填，请补全参数值', type: 'warning' });
              return;
            }
            var re = /^(\-|\+?)\d+(\.\d+)?$/;
            if (!re.test(obj.paramValue)) {
              this.$message({message: '请输入数字', type: 'warning'});
              return;
            }
            var mixValue = obj.minLimit;
            var maxValue = obj.maxLimit;
            if (parseFloat(obj.paramValue) < parseFloat(mixValue)) {
              this.$message({ message: '【' + obj.userName + '】' + '参数值不能小于取值下限', type: 'warning' });
              return;
            }
            if (parseFloat(obj.paramValue) > parseFloat(maxValue)) {
              this.$message({ message: '【' + obj.userName + '】' + '参数值不能大于取值上限', type: 'warning' });
              return;
            }
          }
          var index = _this.indexRow;
          _this.paramList[index].list = _this.personData;
          _this.$message('暂存成功');
          _this.falgOne = false;
        }
      }
    });
  };
});