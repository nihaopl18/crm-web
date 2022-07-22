/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-2-12 19:30:18.
 * @updated by
 * @description 对公关键人信息
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
    yufp.lookup.reg('CD0238,CD0330,CD0348,CD0048,CD0047,SEX_TYPE,CD0285,CD0010');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          addBtn: !yufp.session.checkViewCtrl('add', data.id),
          editBtn: !yufp.session.checkViewCtrl('edit', data.id),
          detailBtn: !yufp.session.checkViewCtrl('detail', data.id),
          deleteBtn: !yufp.session.checkViewCtrl('delete', data.id),
          dataUrl: backend.custorgService + '/api/ocrmfciorgkeyman/querylist/' + custId + '/no',
          formdata: {},
          dialogVisible: false,
          formDisabled: false,
          inputIdDisabled: true,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          btnShow: true,

          rule: {
            custNameRel: [
              {max: 40, message: '最大长度不超过40个字符', trigger: 'blur' },
              {required: true, message: '字段不能为空', trigger: 'blur'}
            ],
            relaType: [
              {required: true, message: '字段不能为空', trigger: 'blur'}
            ],
            jobPosi: [
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            sex: [
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            custTitle: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            certType: [
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            certNo: [
              {max: 25, message: '最大长度不超过25个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            offiTelNo: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            homeTelNo: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            mobileNo: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            email: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            contPrio: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            wechat: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            qq: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            weibo: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            eduRec: [
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            marriStat: [
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            spouseName: [
              {max: 40, message: '最大长度不超过40个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            spouseCertType: [
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            spouseCertNo: [
              {max: 25, message: '最大长度不超过25个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            spouseTelNo: [
              {max: 15, message: '最大长度不超过15个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            spouseIndOcc: [
              {max: 10, message: '最大长度不超过10个字符', trigger: 'blur' },
              {required: false, message: '字段不能为空', trigger: 'blur'}
            ],
            validFlg: [
              {required: false, message: '字段不能为空', trigger: 'blur'}
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
          var tableDatas = _this.$refs.refTable.tabledata;
          var model = {custId: custId};
          yufp.clone(_this.formdata, model);
          if (model.relaType == '01') {
            if (tableDatas != null && tableDatas != undefined) {
              for (var i = 0; i < tableDatas.length; i++) {
                var relaType = tableDatas[i].relaType;
                if (relaType == '01') {
                  _this.$message('已存在法人，不能新增法人');
                  return;
                }
              }
            }
          }
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var blackListUrl = backend.custorgService + '/api/ocrmfciorgkeyman/ctrate';
          if (_this.viewType != 'ADD') {
            blackListUrl = backend.custorgService + '/api/ocrmfciorgkeyman/modify';
          }
          if (_this.viewType == 'ADD') {
            model.id = null;
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
        rowDblclick: function (row, event) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(row, this.formdata);
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
          var ids = selections[0].id;
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custorgService + '/api/ocrmfciorgkeyman/delete',
                  data: {
                    // Id: _this.$refs.refTable.selections[0].Id
                    'id': ids
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