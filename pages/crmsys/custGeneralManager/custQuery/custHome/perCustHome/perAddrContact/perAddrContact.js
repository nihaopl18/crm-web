/**
 * @Created by 马妍 mayan2@yusys.com.cn on 2019-1-21 17:28:36.
 * @updated by
 * @description 地址及联系信息
 */
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0012,CD0238,CD0257,CD0258');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          expandCollapseName: ['addr'],
          dataUrl: backend.custpubService + '/api/acrmfciaddrinfo/queryaddrlist/' + custId,
          condataUrl: backend.custpubService + '/api/acrmfcicontactinfo/querycontacklist/' + custId,
          hisdataUrl: backend.custpubService + '/api/ocrmfcicustupdatehis/queryhistory',
          tableName: { condition: JSON.stringify({ chgMod: '', custId: '' }) },
          conhisdataUrl: backend.custpubService + '/api/ocrmfcicustupdatehis/queryhistory',
          conParams: { condition: JSON.stringify({ chgMod: '', custId: '' }) },
          formdata: {},
          conformdata: {},
          dialogVisible: false,
          formDisabled: false,
          condialogVisible: false,
          conformDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          conviewType: 'DETAIL',
          conviewTitle: yufp.lookup.find('CRUD_TYPE', false),
          consaveBtnShow: true,
          hisviewTitle: yufp.lookup.find('CRUD_TYPE', false),
          hisviewType: 'DETAIL',
          conhisviewTitle: yufp.lookup.find('CRUD_TYPE', false),
          conhisviewType: 'DETAIL',
          hisdialogVisible: false,
          conhisdialogVisible: false,
          addBtn: !yufp.session.checkViewCtrl('add', data.id),
          editBtn: !yufp.session.checkViewCtrl('edit', data.id),
          deleteBtn: !yufp.session.checkViewCtrl('delete', data.id),
          // hisBtn: !yufp.session.checkViewCtrl('his', data.id),
          conaddBtn: !yufp.session.checkViewCtrl('conadd', data.id),
          coneditBtn: !yufp.session.checkViewCtrl('conedit', data.id),
          condeleteBtn: !yufp.session.checkViewCtrl('condelete', data.id),
          // conhisBtn: !yufp.session.checkViewCtrl('conhis', data.id),
          rule: {
            addrCommOne: [
              { max: 100, message: '最大长度不超过100个字符', trigger: 'blur', required: true }

            ],
            postCd: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur', required: true }

            ],
            contName: [
              { required: true, max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

            ],
            contMeth: [
              { required: true, max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }

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
          var model = {custId: custId};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (_this.viewType == 'ADD') {
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.custpubService + '/api/acrmfciaddrinfo/addaddr',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            });
          } else {
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.custpubService + '/api/acrmfciaddrinfo/updateaddr',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            });
          }
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
          // _this.formdata.nationCd == 'CHN';
          // this.$refs.refForm.formModel.nationCd = '156';// 设置默认值
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            // _this.$refs.refForm.formdata.nationCd = 'CHN';
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
          if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.user.loginCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
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
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.user.loginCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action == 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custpubService + '/api/acrmfciaddrinfo/deleteaddr',
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
         * 取消
         */

        concancelFn: function () {
          var _this = this;
          _this.condialogVisible = false;
        },
        /**
        * 保存
        */
        consaveFn: function () {
          var _this = this;
          var model = {custId: custId};
          yufp.clone(_this.conformdata, model);
          var validate = false;
          _this.$refs.conrefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (_this.conviewType == 'ADD') {
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.custpubService + '/api/acrmfcicontactinfo/addcontact',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.conrefTable.remoteData();
                _this.$message('操作成功');
                _this.condialogVisible = false;
              }
            });
          } else {
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.custpubService + '/api/acrmfcicontactinfo/updatecontact',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.conrefTable.remoteData();
                _this.$message('操作成功');
                _this.condialogVisible = false;
              }
            });
          }
        },
        /**
        * 控制保存按钮、xdialog、表单的状态
       * @param viewType 表单类型
       * @param editable 可编辑,默认false
       */
        conswitchStatus: function (viewType, editable) {
          var _this = this;
          _this.conviewType = viewType;
          _this.consaveBtnShow = editable;
          _this.condialogVisible = true;
          _this.conformDisabled = !editable;
        },
        /**
        * 新增按钮
        */
        conaddFn: function () {
          var _this = this;
          _this.conswitchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.conrefForm.resetFields();
          });
        },
        /**
        * 修改
        */
        conmodifyFn: function () {
          var _this = this;
          if (_this.$refs.conrefTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (_this.$refs.conrefTable.selections[0].lastChgUsr != yufp.session.user.loginCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
          }
          _this.conswitchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.conrefForm.resetFields();
            var obj = _this.$refs.conrefTable.selections[0];
            yufp.clone(obj, _this.conformdata);
          });
        },

        /**
        * 删除
        */
        condeleteFn: function () {
          var _this = this;
          var selections = _this.$refs.conrefTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (_this.$refs.conrefTable.selections[0].lastChgUsr != yufp.session.user.loginCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action == 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custpubService + '/api/acrmfcicontactinfo/deletecontact',
                  data: {
                    id: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    _this.$refs.conrefTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        }/**
        * 修改历史
        */
        // updateHisFn: function () {
        //   var _this = this;
        //   _this.hisdialogVisible = true;
        //   _this.tableName = { condition: JSON.stringify({ chgMod: 'ADDR', custId: custId }) };
        // },
         /**
       * 修改历史
       */
        // conupdateHisFn: function () {
        //   var _this = this;
        //   _this.conhisdialogVisible = true;
        //   _this.conParams = { condition: JSON.stringify({ chgMod: 'CONTRA', custId: custId }) };
        // }
      }
    });
  };
});