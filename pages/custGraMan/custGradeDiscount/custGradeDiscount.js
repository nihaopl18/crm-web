/**
 * @Created by 张成龙 zhangcl3@yusys.com.cn on 2019-2-12 18:17:36.
 * @updated by
 * @description 客户等级优惠方案
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/yufpExtTree.js',
  'libs/js-xlsx/xlsx.full.min.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0032,CD0016,CD0238');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custgradeService + '/api/custgradediscountscheme/querylist',
          dataUrlDetail: backend.custgradeService + '/api/custgradediscountscheme/detail',
          formdata: {},
          gradeValue: [],
          table: {
            gradeLevel: 'input',
            preferentStr: 'input'
          },
          SERV_LEV: [
            // {key: '0', value: '0星'},
            // {key: '1', value: '1星'},
            // {key: '2', value: '2星'},
            // {key: '3', value: '3星'},
            // {key: '4', value: '4星'},
            // {key: '5', value: '5星'},
            // {key: '6', value: '6星'},
            // {key: '7', value: '7星'}
          ],

          rule: [
            { required: true, message: '必填项' },
            { max: 500, message: '500个字符以内', trigger: 'blur'},
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          dialogVisible: false,
          formDisabled: false,
          formHidden: true,
          readonlyShow: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true
        };
      },
      computed: {
        gradeTableData: function () {
          return this.$refs.refCustTable.tableData;
        }
      },
      mounted: function () {
        var _this = this;
        yufp.lookup.bind('CD0032', function (options) {
          _this.SERV_LEV = options;
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

          if (model.id != undefined && model.id != null && model.id != '') {
            var allmodel = {};
            allmodel.model = model;
            if (_this.gradeValue != null && _this.gradeValue.length != 0) {
              allmodel.gradeValue = _this.gradeValue;
            }
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.custgradeService + '/api/custgradediscountscheme/updatepre',
              data: allmodel,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            });
          } else {
            if (_this.gradeValue != null) {
              model.gradeValue = _this.gradeValue;
            }
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.custgradeService + '/api/custgradediscountscheme/insert',
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
          if (viewType === 'DETAIL') {
            _this.table.gradeLevel = '';
            _this.table.preferentStr = '';
            _this.formHidden = false;
            _this.readonlyShow = true;
          } else {
            _this.table.gradeLevel = 'input';
            _this.table.preferentStr = 'input';
            _this.formHidden = true;
            _this.readonlyShow = false;
          }
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            // _this.$refs.refCustTable.tableData = [];
            _this.formdata.id = '';
            _this.formdata.useChannl = '';
            _this.formdata.remark = '';
            _this.formdata.preferentEndData = '';
            _this.gradeValue = [];
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
          if (_this.$refs.refTable.selections[0].createUserId != yufp.session.userCode) {
            _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
            _this.seacherGL(_this.$refs.refTable.selections[0].preferentId);
            // _this.$refs.refCustTable.remoteData(param);
          });
        },

        rowDblClick: function (row, event) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(row, _this.formdata);
            _this.seacherGL(row.preferentId);
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
            yufp.clone(selectionsAry[0], _this.formdata);
            _this.seacherGL(_this.$refs.refTable.selections[0].preferentId);
            // var param = {
            //   condition: JSON.stringify({
            //     preferentId: _this.$refs.refTable.selections[0].preferentId
            //   })
            // };
            // _this.$refs.refCustTable.remoteData(param);
          });
        },

        /**
         * 查询关系列表
         *
         */
        seacherGL: function (preferentId) {
          var _this = this;
          var param = {
            condition: JSON.stringify({
              preferentId: preferentId
            })
          };
          yufp.service.request({
            method: 'GET',
            url: _this.dataUrlDetail,
            data: param,
            callback: function (code, message, response) {
              if (code == 0) {
                _this.gradeValue = response.data;
              }
            }
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
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            if (selections[i].createUserId != yufp.session.userCode) {
              _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
              return;
            }
            arr.push(selections[i].preferentId);
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
                  url: backend.custgradeService + '/api/custgradediscountscheme/delete',
                  data: {
                    preferentId: arr.join(',')
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
        * 格式化 时间
        */
        formData: function (row, column, cellValue) {
          if (cellValue == '' || cellValue == undefined) {
            return '';
          }
          var dateee = new Date(cellValue).toJSON();
          var date = new Date(+new Date(dateee) + (8 * 3600 * 1000)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          return date.split(' ')[0];
        },
        addGradeFn: function () {
          var data = {'gradeLevel': '', 'preferentStr': ''};
          this.gradeValue.push(data);
        },
        deleteGradeFn: function () {
          var selections = this.$refs.refCustTable.selections;
          for (var i = 0, len = selections.length; i < len; i++) {
            for (var j = 0, lenc = this.gradeValue.length; j < lenc; j++) {
              if (selections[i].gradeLevel === this.gradeValue[j].gradeLevel) {
                this.gradeValue.splice(j, 1);
              }
            }
          }
        },
        deleteRow: function (index, rows) { // 删除改行
          rows.splice(index, 1);
        }

      }
    });
  };
});