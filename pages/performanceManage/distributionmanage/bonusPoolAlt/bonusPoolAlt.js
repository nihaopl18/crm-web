/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2020-8-6 14:43:53.
 * @updated by
 * @description 支行绩效二次分配
 */
define([
  './custom/widgets/js/yufpOrgTree.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '/api/pmafbonuspoolinfo/querybonuspoolinfo',
          formdata: {},
          dialogVisible: false,
          formDisabled: true,
          activeNames: ['1'],
          dtlQueryModel: {},
          dtlDataUrl: '/api/pmafbonuspoolinfo/querybonusaltlist',
          userDialogVisible: false,
          userDataUrl: '/api/util/getuser',
          userDataParams: {
            roleId: '',
            dutyId: '',
            orgCode: ''
          },
          userTableColumns: [{
            label: '登陆代码',
            prop: 'loginCode',
            width: '110'
          }, {
            label: '姓名',
            prop: 'userName'
          }, {
            label: '所属机构编号',
            prop: 'orgId'
          }, {
            label: '所属部门编号',
            prop: 'dptId'
          }, {
            label: '所属部门名称',
            prop: 'dptName'
          }],
          loadingFlag: false
        };
      },
      watch: {
      },
      methods: {
        loadedHandler: function () {
          var _this = this;
          _this.loadingFlag = false;
        },
        searchFn: function () {
          var _this = this;
          _this.$refs['refQuery'].validate(function (valid) {
            if (valid) {
              _this.loadingFlag = true;
              let model = {};
              yufp.clone(_this.$refs['refQuery'].formdata, model);
              var param = { condition: JSON.stringify(model) };
              _this.$refs.refTable.remoteData(param);
            } else {
              return;
            }
          });
        },
        // 重置按钮
        resetFn: function () {
          var _this = this;
          _this.$nextTick(function () {
            _this.$refs['refQuery'].resetFields();
          });
        },
        genUUID: function (len, radix) {
          var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
          var uuid = [], i;
          radix = radix || chars.length;
          if (len) {
            for (i = 0; i < len; i++) {
              uuid[i] = chars[0 | Math.random() * radix];
            }
          } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
              if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
              }
            }
          }
          return uuid.join('');
        },
        /**
         * 绩效分配fn
         */
        bonusShareFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogVisible = true;
          _this.$nextTick(function () {
            _this.formdata.orgName = selections[0].orgName;
            _this.formdata.poolBonus = selections[0].poolBonus;
            _this.formdata.surPoolBonus = selections[0].surPoolBonus;
            var param = {};
            param.statDate = selections[0].statDate;
            param.orgId = selections[0].orgId;
            _this.dtlQueryModel = {
              condition: JSON.stringify(param)
            };
            _this.$refs.dtlRefTable.remoteData(_this.dtlQueryModel);
          });
        },
        /**
         * 新增分配人员fn
         */
        addDtlFn: function () {
          var _this = this;
          _this.userDataParams.orgCode = _this.$refs.refTable.selections[0].orgId;
          _this.userDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.userTable.remoteData(_this.userDataParams);
          });
        },
        /**
         * 删除fn
         */
        deleteDtlFn: function () {
          var _this = this;
          var selections = _this.$refs.dtlRefTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            if (selections[i].id) {
              arr.push(selections[i].id);
            }
          }
          _this.$confirm('即将删除分配明细, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                // 清空dtlRefTable中tableData数据
                for (var index in selections) {
                  for (var subIndex = _this.$refs.dtlRefTable.tabledata.length - 1; subIndex >= 0; --subIndex) {
                    if ((selections[index].id && selections[index].id == _this.$refs.dtlRefTable.tabledata[subIndex].id) ||
                      (selections[index].tempId && selections[index].tempId == _this.$refs.dtlRefTable.tabledata[subIndex].tempId)) {
                      _this.$refs.dtlRefTable.tabledata.splice(subIndex, 1);
                    }
                  }
                }
                if (arr.length > 0) { // 删除已分配明细数据
                  yufp.service.request({
                    method: 'POST',
                    url: '/api/pmafbonuspoolinfo/deletebonusaltbyids',
                    data: arr.join(','),
                    callback: function (code, message, response) {
                      if (response.code == 0) {
                        _this.$message('删除成功');
                      } else if (response.code == -9) {
                        _this.$message({ message: response.message, type: 'warning' });
                      } else {
                        _this.$message({ message: response.message, type: 'error' });
                      }
                    }
                  });
                }
              }
            }
          });
        },
        /**
         * 人员选择-确定fn
         */
        userConfirmFn: function () {
          var _this = this;
          var selections = _this.$refs.userTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少选择一条记录', type: 'warning' });
            return;
          }
          for (var index in selections) {
            var userData = {};
            userData.evlObjId = selections[index].loginCode;
            userData.evlObjName = selections[index].userName;
            userData.belongOrgId = selections[index].orgId;
            userData.belongOrgName = _this.formdata.orgName;
            userData.statDate = _this.$refs.refTable.selections[0].statDate;
            userData.operBonus = 0;
            userData.tempId = _this.genUUID(32, 36);
            _this.$refs.dtlRefTable.tabledata.push(userData);
          }
          _this.userDialogVisible = false;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          // 判断奖金池金额与分配金额总和大小，同时校验分配金额为数字
          var operBonusSum = 0; // 分配明细-分配金额总和
          for (var index in _this.$refs.dtlRefTable.tabledata) {
            var value = _this.$refs.dtlRefTable.tabledata[index].operBonus;
            var reg = /^-?\d+(\.\d+)?$/g;
            if (!reg.test(value)) {
              _this.$message({ message: '分配金额请填写数字', type: 'warning' });
              return;
            }
            operBonusSum += Number(value);
          }
          var poolBonus = _this.$refs.refTable.selections[0].poolBonus; // 奖金池金额
          if (poolBonus < operBonusSum) {
            _this.$message({ message: '分配金额总和不能大于奖金池金额', type: 'warning' });
            return;
          }
          // 构造保存数据model
          var model = {};
          model.statDate = _this.$refs.refTable.selections[0].statDate;
          model.orgId = _this.$refs.refTable.selections[0].orgId;
          model.dataList = _this.$refs.dtlRefTable.tabledata;
          yufp.service.request({
            method: 'POST',
            url: '/api/pmafbonuspoolinfo/savebonusaltlist',
            data: model,
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.$message({ message: response.message, type: 'info' });
                _this.dialogVisible = false;
                _this.$refs.refTable.remoteData();
              } else if (response.code == -1 || response.code == -3 || response.code == -9) {
                _this.$message({ message: response.message, type: 'warning' });
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
        }
      }
    });
  };
});