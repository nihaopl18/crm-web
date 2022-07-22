/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-2-12 19:30:18.
 * @updated by
 * @description 对公债券信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          addBtn: !yufp.session.checkViewCtrl('add', data.id),
          editBtn: !yufp.session.checkViewCtrl('edit', data.id),
          detailBtn: !yufp.session.checkViewCtrl('detail', data.id),
          deleteBtn: !yufp.session.checkViewCtrl('delete', data.id),
          dataUrl: backend.custorgService + '/api/ocrmfciorgbondinfo/querylist/' + custId,
          formdata: {},
          dialogVisible: false,
          hiddened: true,
          formDisabled: false,
          inputIdDisabled: true,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          btnShow: true,
          rule: {
            bondName: [
              {max: 40, message: '最大长度不超过40个字符', trigger: 'blur' },
              {required: true, message: '字段不能为空', trigger: 'blur'}
            ],
            issueAmt: [
              {validator: yufp.validator.number, message: '请输入数字'}
            ],
            remark: [
              {max: 100, message: '最大长度不超过100个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
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
          var blackListUrl = backend.custorgService + '/api/ocrmfciorgbondinfo/ctrate';
          if (_this.viewType != 'ADD') {
            blackListUrl = backend.custorgService + '/api/ocrmfciorgbondinfo/modify';
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: blackListUrl,
            data: model,
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
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
          _this.inputIdDisabled = true;
          _this.viewType = viewType;
          // if (viewType == 'ADD') {
          //   _this.inputIdDisabled = false;
          // } else {
          //   _this.inputIdDisabled = true;
          // }
          _this.hiddened = true;
          if (viewType == 'DETAIL') {
            _this.hiddened = false;
          }
          _this.btnShow = editable;
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
            _this.formdata.custId = custId;
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
          if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.userCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
          }

          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].bondId);
          }
          var bondIds = arr.join(',');

          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custorgService + '/api/ocrmfciorgbondinfo/delete',
                  data: {
                    // Id: _this.$refs.refTable.selections[0].Id
                    'bondId': bondIds
                  },
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        }
      }
    });
  };
});