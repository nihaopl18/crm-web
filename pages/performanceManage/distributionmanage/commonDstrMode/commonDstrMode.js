/**
 * @Created by 万爽 wanshuang@yusys.com.cn on 2020-3-26 09:26:05.
 * @updated by
 * @description 分配模式
 */
define([
  './custom/widgets/js/yufpExtTree.js',
  './custom/widgets/js/yufpOrgTree.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,BUSS_TYPE,MANAGER_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.appBaseService + '/api/pmafdisplaninfo/querylist',
          formdata: {},
          rule: [
            { required: true, message: '必填项' },
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          dialogVisibleTwo: false,
          pickerOptions0: {
            disabledDate: function (time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          },
          options: [],
          formDataTwo: [],
          oldData: [],
          title: '',
          formDisabledTwo: false
        };
      },
      watch: {
        dialogVisibleTwo: function (newVal) {
          var _this = this;
          _this.formDataTwo = [];
          if (newVal) {
            // 获取方案配置数据
            var model = {};
            model.orgNo = _this.$refs.refTable.selections[0].orgNo;
            model.bussType = _this.$refs.refTable.selections[0].bussType;
            yufp.service.request({
              method: 'GET',
              url: backend.appBaseService + '/api/pmafdisplandetail/querylist',
              data: {condition: JSON.stringify(model)},
              callback: function (code, message, response) {
                _this.formDataTwo = response.data;
              }
            });
          }
        }
      },
      mounted: function () {
        // 获取客户类型码值
        var _this = this;
        yufp.lookup.bind('MANAGER_TYPE', function (data) {
          _this.options = data;
        });
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
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (model.effectDate > model.expirateDate) {
            _this.$message({message: '失效日期不能小于生效日期！', type: 'warning'});
            return;
          }
          model.effectDate = yufp.util.dateFormat(model.effectDate, '{y}{m}{d}');
          model.expirateDate = yufp.util.dateFormat(model.expirateDate, '{y}{m}{d}');
          var url = '/api/pmafdisplaninfo/add';
          if (_this.formdata.id) {
            url = '/api/pmafdisplaninfo/edit';
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.appBaseService + url,
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.$refs.refTable.remoteData();
                _this.dialogVisible = false;
                _this.$message({ message: response.message });
              } else {
                _this.$refs.refTable.remoteData();
                _this.dialogVisible = false;
                _this.$message({ message: response.message, type: 'warning' });
              }
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
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
            _this.formdata.effectDate = new Date(obj.effectDate.substr(0, 4) + '/' + obj.effectDate.substr(4, 2) + '/' + obj.effectDate.substr(6, 2));
            _this.formdata.expirateDate = new Date(obj.expirateDate.substr(0, 4) + '/' + obj.expirateDate.substr(4, 2) + '/' + obj.expirateDate.substr(6, 2));
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
          _this.title = '方案分配查看';
          _this.formDisabledTwo = true;
          _this.dialogVisibleTwo = true;
        },
        settingFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.title = '方案分配配置';
          _this.formDisabledTwo = false;
          _this.dialogVisibleTwo = true;
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
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafdisplaninfo/delete',
                  data: arr.join(','),
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        addTwoFn: function () {
          var _this = this;
          var obj = {
            managerType: '',
            distrRate: '',
            orgNo: _this.$refs.refTable.selections[0].orgNo,
            orgName: _this.$refs.refTable.selections[0].orgName
          };
          _this.formDataTwo.push(obj);
        },
        /**
         * 保存修改前数据
         */
        saveOld: function (event) {
          this.oldData = JSON.parse(JSON.stringify(this.formDataTwo));
        },
        changeRatio: function (index) {
          var distrRate = 100;
          var olddistrRate = this.oldData[index].distrRate;
          var obj = this.formDataTwo[index];
          var re = /^[0-9]+$/;
          if (!re.test(obj.distrRate)) {
            this.formDataTwo[index].distrRate = olddistrRate;
            this.$message({ message: '请输入正整数', type: 'warning' });
            return;
          }
          if (olddistrRate == obj.distrRate) {
            return;
          }
          var distrRateall = 0;
          for (var i = 0; i < this.formDataTwo.length; i++) {
            distrRateall += parseInt(this.formDataTwo[i].distrRate);
          }
          if (distrRateall > 100) {
            this.formDataTwo[index].distrRate = olddistrRate;
            this.$message({ message: '方案分配比例和不能超出' + distrRate + '!', type: 'warning' });
            return;
          }
        },
        handleDelete: function (index, row) {
          this.formDataTwo.splice(index, 1);
        },
        saveTwoFn: function () {
          var _this = this;
          var radioAll = 0;
          for (var i = 0; i < _this.formDataTwo.length; i++) {
            if (_this.formDataTwo[i].managerId == '') {
              this.$message({ message: '分配信息中客户经理类型不能为空!', type: 'warning' });
              return;
            }
            if (_this.formDataTwo[i].distrRate == '') {
              this.$message({ message: '分配信息中分配比例不能为空!', type: 'warning' });
              return;
            }
            radioAll += parseInt(this.formDataTwo[i].distrRate);
          }
          if (radioAll != 100) {
            this.$message({ message: '分配比例总和请为100!', type: 'warning' });
            return;
          }
          _this.$confirm('是否确定要保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                // 向后台发送保存请求
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafdisplandetail/add',
                  data: {
                    list: JSON.stringify(_this.formDataTwo),
                    bussType: _this.$refs.refTable.selections[0].bussType,
                    orgNo: _this.$refs.refTable.selections[0].orgNo,
                    orgName: _this.$refs.refTable.selections[0].orgName
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.code == 0) {
                      _this.$refs.refTable.remoteData();
                      _this.dialogVisibleTwo = false;
                      _this.$message({ message: response.message});
                    } else {
                      _this.$refs.refTable.remoteData();
                      _this.dialogVisibleTwo = false;
                      _this.$message({ message: response.message, type: 'warning' });
                    }
                  }
                });
              }
            }
          });
        },
        orgSelectFn: function (data) {
          this.formdata.orgNo = data.orgId;
          this.formdata.orgName = data.orgName;
        }
      }
    });
  };
});