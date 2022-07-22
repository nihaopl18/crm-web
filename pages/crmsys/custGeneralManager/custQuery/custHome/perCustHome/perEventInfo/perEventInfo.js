/**
 * @Created by 马妍 mayan2@yusys.com.cn on 2019-2-15 15:38:38.
 * @updated by
 * @description 客户事件
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
    yufp.lookup.reg('CD0259,CD0260,CD0242,CD0373,CD0374');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          addBtn: !yufp.session.checkViewCtrl('add', data.id),
          editBtn: !yufp.session.checkViewCtrl('edit', data.id),
          detailBtn: !yufp.session.checkViewCtrl('detail', data.id),
          deleteBtn: !yufp.session.checkViewCtrl('delete', data.id),
          dataUrl: backend.custpubService + '/api/ocrmfcieventinfo/queryeventlist/' + custId + '/no',
          formdata: {},
          ishidden: true,
          dialogVisible: false,
          formDisabled: false,
          remindDec: '',
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          rule: {
            eventName: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' },
              {required: true, message: '字段不能为空', trigger: 'blur'}
            ],
            eventDesc: [
              {max: 350, message: '最大长度不超过350个字符', trigger: 'blur' }

            ]
          }
        };
      },
      mounted: function () {
        // var _this = this;
        // 查询事件的提醒规则
        // yufp.service.request({ // 查询业务数据
        //   method: 'GET',
        //   url: backend.custpubService + '/api/ocrmfcieventinfo/queryreminddec', // custId   /api/pcustbaseview/querylist
        //   callback: function (code, message, response) {
        //     if (code == 0) { // code等于0 说明成功
        //       _this.remindDec = response.data[0].remindModel;
        //     }
        //   } });
      },
      methods: {
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        rowDblclick: function (row, event) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(row, this.formdata);
          });
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {
            custId: custId
          };
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
              url: backend.custpubService + '/api/ocrmfcieventinfo/addevent',
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
              url: backend.custpubService + '/api/ocrmfcieventinfo/updateevent',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            });
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
            _this.formdata.remindInfo = _this.remindDec;
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
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
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
            arr.push(selections[i].eventId);
          }
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custpubService + '/api/ocrmfcieventinfo/deleteevent',
                  data: {
                    ids: arr.join(',')
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
        // 是否提醒下拉框触发事件
        changeEvent: function (valueStr) {
          var _this = this;
          if (valueStr == 1) {
            _this.ishidden = false;
          } else {
            _this.ishidden = true;
          }
        }
      }
    });
  };
});