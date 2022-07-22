/**
 * @Created by zhuly6 zhuly6@yusys.com.cn on 2019-1-15
 * @updated by
 * @description 系统参数管理-公共参数管理-产品基础数据定义
 */
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
  * 页面加载完成时触发
  * @param hashCode 路由ID
  * @param data 传递数据对象
  * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('PUB_STS, ALGIN_TYPE, TAB_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          propDataUrl: backend.adminService + '/api/ocrmfpdprodtable/gettableinfo',
          dataUrl: backend.adminService + '/api/ocrmfpdprodtable/getprodtable',
          handFormVisible: false,
          handFormdata: [],
          viewTitle: ['新增', '详情', '表属性定义'],
          addFlag: true,
          infoFormVisible: false,
          infoFormdata: [],
          tabPopDefVisible: false,
          tableOptions: [],
          tableName: { condition: JSON.stringify({ tableName: '' }) },
          tem: {},
          getTableData: [],
          editDsiabled: false
        };
      },
      /**
          *初始化新增表信息
          */
      mounted: function () {
        var _this = this;
        var data;
        yufp.service.request({
          method: 'get',
          url: backend.adminService + '/api/ocrmfpdprodtable/gettablename',
          callback: function (code, message, response) {
            data = response.data;
            for (var i = 0; i < data.length; i++) {
              var tableArr = {};
              tableArr.key = data[i].tableName;
              tableArr.value = data[i].tableName;
              _this.tableOptions.push(tableArr);
            }
          }
        });
      },
      methods: {
        /**
        * 详情
        */
        infoFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.infoFormVisible = true;
          _this.$nextTick(function () {
            _this.$refs.infoForm.resetFields();
            yufp.clone(selections[0], _this.infoFormdata);
          });
        },
        /**
        * 新增 修改
        */
        handFn: function (handTitle) {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (handTitle == 'edit') {
            _this.addFlag = false;
            if (selections.length != 1) {
              _this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            _this.viewTitle[0] = '修改';
            _this.editDsiabled = true;
            _this.handFormVisible = true;
            _this.$nextTick(function () {
              _this.$refs.handForm.resetFields();
              yufp.clone(selections[0], _this.handFormdata);
            });
          }
          if (handTitle == 'add') {
            _this.$nextTick(function () {
              _this.$refs.handForm.resetFields();
            });
            _this.editDsiabled = false;
            _this.addFlag = true;
            _this.viewTitle[0] = '新增';
            _this.handFormVisible = true;
          }
        },
        /**
        * 表名校验
        */
        tableNameValidateFn: function () {
          var _this = this;
          // 新增 表名校验
          if (_this.addFlag) {
            var model = {condition: JSON.stringify({tableName: _this.handFormdata.tableName})};
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/ocrmfpdprodtable/checktablename',
              data: model,
              callback: function (code, message, response) {
                if (response.data == 1) {
                  _this.$message({ message: '表名称已存在', type: 'warning' });
                }
              }
            });
          }
          // 修改 表名校验

          if (!_this.addFlag) {
            var model = {condition: JSON.stringify({tableName: _this.handFormdata.tableName, tableId: _this.handFormdata.tableId})};
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/ocrmfpdprodshowplan/checkplanname',
              data: model,
              callback: function (code, message, response) {
                if (response.data == 1) {
                  _this.$message({ message: '表名称已存在', type: 'warning' });
                }
              }
            });
          }
        },
        /**
        * 表别名校验
        */
        tableOthNameValFn: function () {
          var _this = this;
          // 新增 表别名校验
          if (_this.addFlag) {
            var model = {condition: JSON.stringify({tableOthName: _this.handFormdata.tableOthName})};
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/ocrmfpdprodtable/checktableothname',
              data: model,
              callback: function (code, message, response) {
                if (response.data == 1) {
                  _this.$message({ message: '表名称已存在', type: 'warning' });
                }
              }
            });
          }
          // 修改 表别名校验
          if (!_this.addFlag) {
            var model = {condition: JSON.stringify({tableOthName: _this.handFormdata.tableOthName, tableId: _this.handFormdata.tableId})};
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/ocrmfpdprodtable/checktableothname',
              data: model,
              callback: function (code, message, response) {
                if (response.data == 1) {
                  _this.$message({ message: '表名称已存在', type: 'warning' });
                }
              }
            });
          }
        },
        /**
        * 保存新增 修改
        */
        saveHandFn: function () {
          var _this = this;
          var validate = false;
          var addMessage;
          var model;
          _this.$refs.handForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          model = yufp.clone(_this.handFormdata, model);
          if (_this.addFlag) {
            // 新增
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/ocrmfpdprodtable/add',
              data: model,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _this.$message({ message: response.message });
                  _this.$refs.refTable.remoteData();
                  _this.handFormVisible = false;
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          } else if (!_this.addFlag) {
            // 修改
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/ocrmfpdprodtable/updatefun',
              data: model,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _this.handFormVisible = false;
                  _this.$message({ message: response.message });
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          } else {
            _this.$message({ message: addMessage, type: 'warning' });
          }
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var ids;
          var selections = this.$refs.refTable.selections;
          if (selections.length < 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].tableId);
          }
          ids = { condition: JSON.stringify({ ids: arr.join(',') }) };

          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmfpdprodtable/del',
            data: ids,
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$message('操作成功');
            }
          });
        },
        /**
         * 表属性定义
         */
        tabPropDefFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.tabPopDefVisible = true;
          _this.tem = selections[0];
          _this.tableName = { condition: JSON.stringify({ tableName: selections[0].tableName }) };
        },
        /**
         * 获取表格数据
         */
        getTableDataFn: function (data) {
          var _this = this;
          _this.getTableData = data;
        },
        /**
         * 保存表属性定义
         */
        saveTabPropDefFn: function () {
          var _this = this;
          var model = [];
          for (var i = 0; i < _this.getTableData.length; i++) {
            _this.getTableData[i].tableId = _this.tem.tableId;
            _this.getTableData[i].tableOthName = _this.tem.tableOthName;
            _this.getTableData[i].tableChName = _this.tem.tableChName;
          }
          yufp.clone(_this.getTableData, model);
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmfpdprodcolumn/save',
            data: JSON.stringify(model),
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.$message({ message: response.message });
                _this.$refs.tablePropTable.remoteData();
                _this.tabPopDefVisible = false;
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
        },
        /**
      * 取消按钮
      */
        cancleFn: function (cancleTit) {
          var _this = this;
          if (cancleTit == 'hand') {
            _this.handFormVisible = false;
          }
          if (cancleTit == 'info') {
            _this.infoFormVisible = false;
          }
          if (cancleTit == 'tablePropTable') {
            _this.tabPopDefVisible = false;
          }
        }
      }
    });
  };
});