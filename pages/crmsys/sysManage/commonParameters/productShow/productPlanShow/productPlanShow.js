/**
 * @Created by zhuly6 zhuly6@yusys.com.cn on 2019-1-15
 * @updated by
 * @description 系统参数管理-公共参数管理-产品方案展示
 */
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
 * 页面加载完成时触发
 * @param hashCode 路由ID
 * @param data 传递数据对象
 * @param cite 页面站点信息
 */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('PUB_STS, MEASURE,PLAN_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.adminService + '/api/ocrmfpdprodshowplan/getprodtable',
          tabRelDefTableUrl: backend.adminService + '/api/ocrmfpdprodshowtable/list',
          tabDataUrl: backend.adminService + '/api/ocrmfpdprodshowcolumn/listno',
          propDataUrl: backend.adminService + '/api/ocrmfpdprodshowcolumn/list',
          proTabAddVisible: false,
          busOprHandVisible: false,
          viewType: 'DETAIL',
          proTabInfoVisible: false,
          editDisabled: false,
          handFormVisible: false,
          viewTitle: ['新增', '详情', '表关联定义', '表属性定义'],
          addFlag: false,
          proTabFormdata: [],
          proTabInfoFormdata: [],
          tabPropDefVisible: false,
          tabRelDefVisible: false,
          tabRelDefFormdata: [],
          tabRelDefTabledata: [],
          refTableTem: [],
          getPropTabledata: [],
          addPropTabledata: [],
          proHidden: false,
          planId: { condition: JSON.stringify({ planId: '' }) },
          // 关联表选择器参数
          selectTabParams: {
            selectTit: '关联表放大镜',
            width: '1000px',
            rowIndex: true,
            user: {
              // 表查询参数
              dataParams: { condition: JSON.stringify({ planId: '' }) },
              fieldData: [{ label: '引用表名', field: 'tableChName', type: 'input' }],
              majTableColumns: [
                { label: '引用表', prop: 'tableName', resizable: true },
                { label: '引用表中文名', prop: 'tableChName', resizable: true },
                { label: '引用表别名', prop: 'tableOthName', resizable: true }
              ],
              dataUrl: backend.adminService + '/api/ocrmfpdprodshowtable/listno'
            }
          }
        };
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
          _this.proTabInfoVisible = true;
          _this.$nextTick(function () {
            _this.$refs.proTabInfoForm.resetFields();
            yufp.clone(selections[0], _this.proTabInfoFormdata);
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
            if (selections.length < 1) {
              _this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            _this.viewTitle[0] = '修改';
            _this.proTabAddVisible = true;
            _this.$nextTick(function () {
              _this.$refs.proTabForm.resetFields();
              yufp.clone(selections[0], _this.proTabFormdata);
            });
          }
          if (handTitle == 'add') {
            _this.proTabAddVisible = true;
            _this.$nextTick(function () {
              _this.$refs.proTabForm.resetFields();
            });
            _this.addFlag = true;
            _this.viewTitle[0] = '新增';
          }
        },
        /**
       * 方案名称校验
       */
        planNameValidateFn: function () {
          var _this = this;
          if (_this.addFlag) {
            var model = {condition: JSON.stringify({planName: _this.proTabFormdata.planName})};
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/ocrmfpdprodshowplan/checkplanname',
              data: model,
              callback: function (code, message, response) {
                if (response.data == 1) {
                  _this.$message({ message: '方案名称已存在', type: 'warning' });
                }
              }
            });
          }
          if (!_this.addFlag) {
            var model = {condition: JSON.stringify({planName: _this.proTabFormdata.planName, planId: _this.proTabFormdata.planId})};
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/ocrmfpdprodshowplan/checkplanname',
              data: model,
              callback: function (code, message, response) {
                if (response.data == 1) {
                  _this.$message({ message: '方案名称已存在', type: 'warning' });
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
          _this.$refs.proTabForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          model = yufp.clone(_this.proTabFormdata, model);
          if (_this.addFlag) {
            // 新增
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/ocrmfpdprodshowplan/add',
              data: model,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _this.$message({ message: response.message });
                  _this.$refs.refTable.remoteData();
                  _this.proTabAddVisible = false;
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          } else if (!_this.addFlag) {
            // 修改
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/ocrmfpdprodshowplan/updatefun',
              data: model,
              callback: function (code, message, response) {
                if (code == 0 && response.code == 0) {
                  _this.proTabAddVisible = false;
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
            arr.push(selections[i].planId);
          }
          ids = { condition: JSON.stringify({ ids: arr.join(',') }) };

          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmfpdprodshowplan/del',
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
          _this.refTableTem = selections[0];
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.tabPropDefVisible = true;
          _this.planId = { condition: JSON.stringify({ planId: selections[0].planId }) };
        },
        /**
        * 获取属性表数据
        */
        addPropTabledataFn: function (data) {
          var _this = this;
          // yufp.clone(data, _this.addPropTabledata);
          _this.addPropTabledata = data;
        },
        /**
        * 保存表属性定义
        */
        saveTabPropDefFn: function () {
          var _this = this;
          var model = [];
          for (var i = 0; i < _this.addPropTabledata.length; i++) {
            var obj = {};
            obj.planId = _this.refTableTem.planId;
            obj.rtableId = _this.addPropTabledata[i].rTableId;
            obj.columnId = _this.addPropTabledata[i].columnId;
            obj.cloumnSquence = _this.addPropTabledata[i].cloumnSquence;
            obj.rcloumnId = _this.addPropTabledata[i].rCloumnId;
            model.push(obj);
          }
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmfpdprodshowcolumn/save',
            data: JSON.stringify(model),
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.$message({ message: response.message });
                _this.$refs.propTable.remoteData();
                var params = this.user.dataParams;
                _this.$refs.addPropTable.remoteData(params);
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
        },
        /**
        * 移除表属性定义
        */
        tabPropDefDelFn: function () {
          var _this = this;
          var ids;
          var selections = this.$refs.addPropTable.selections;
          if (selections.length < 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].rCloumnId);
          }
          ids = { condition: JSON.stringify({ rCloumnIds: arr.join(',') }) };
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmfpdprodshowcolumn/out',
            data: ids,
            callback: function (code, message, response) {
              _this.$refs.addPropTable.remoteData();
              _this.$refs.propTable.remoteData();
              _this.$message('操作成功');
            }
          });
        },
        /**
        * 增加表属性定义
        */
        tabPropDefAddFn: function () {
          var _this = this;
          var selections = _this.$refs.propTable.selections;
          var model = [];
          if (selections.length < 1) {
            _this.$message({ message: '至少选择一条记录', type: 'warning' });
            return;
          }
          for (var i = 0; i < selections.length; i++) {
            var obj = {};
            obj.planId = _this.refTableTem.planId;
            obj.rTableId = selections[i].rTableId;
            obj.columnId = selections[i].columnId;
            model.push(obj);
          }
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmfpdprodshowcolumn/join',
            data: JSON.stringify(model),
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.$message({ message: response.message });
                _this.$refs.propTable.remoteData();
                _this.$refs.addPropTable.remoteData();
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
        },
        /**
        * 表关联定义
        */
        tabRelDefFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          _this.refTableTem = selections[0];
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.planId = { condition: JSON.stringify({ planId: selections[0].planId }) };
          _this.$set(_this.selectTabParams.user.dataParams, 'condition', JSON.stringify({ planId: selections[0].planId}));
          _this.tabRelDefVisible = true;
          _this.$nextTick(function () {
            _this.$refs.tabRelDefForm.resetFields();
          });
          if (selections[0].planType == '2') {
            _this.proHidden = true;
          }
          yufp.service.request({
            method: 'get',
            data: _this.planId,
            url: backend.adminService + '/api/ocrmfpdprodshowr/list',
            callback: function (code, message, response) {
              yufp.clone(response.data, _this.tabRelDefFormdata);
            }
          });
        },
        /**
        * 增加关联表信息
        */
        getTableFn: function (data) {
          var _this = this;
          var tableIds = [];
          var model = {};
          yufp.clone(_this.tabRelDefTabledata.selections, data);
          for (var i = 0; i < data.length; i++) {
            tableIds.push(data[i].tableId);
          }
          tableIds = tableIds.toString(',');
          model = {planId: _this.refTableTem.planId, planName: _this.refTableTem.planName, tableIds: tableIds};
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmfpdprodshowtable/save',
            data: { condition: JSON.stringify(model)},
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.$message({ message: response.message });
                _this.$refs.tabRelDefTable.remoteData();
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
        },
        getTabRelDefTabledataFn: function (data) {
          var _this = this;
          yufp.clone(data, _this.tabRelDefTabledata);
        },
        /**
        * 试查询表关联定义
        */
        saveTableRelDefFn: function () {
          var _this = this;
          var validate;
          var flag = false;
          _this.$refs.tabRelDefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {planId: _this.refTableTem.planId, planName: _this.refTableTem.planName};
          yufp.clone(_this.tabRelDefFormdata, model);
          model.rwhere = _this.tabRelDefFormdata.rwhere;
          model.rfrom = _this.tabRelDefFormdata.rfrom;
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmfpdprodshowr/trialquery',
            data: model,
            async: false,
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                flag = true;
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
          if (flag) {
            _this.$confirm('试查询成功，是否保存', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              showCancelButton: true,
              type: 'success',
              center: true,
              callback: function (action) {
                if (action == 'confirm') {
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/ocrmfpdprodshowr/save',
                    data: model,
                    callback: function (code, message, response) {
                      _this.$message({ message: response.message, type: code == 0 && response.code == 0 ? 'success' : 'warning' });
                      code == 0 && response.code == 0 ? _this.tabRelDefVisible = false : null;
                    }
                  });
                }
              }
            });
          }
        },
        /**
        * 删除表关联定义
        */
        deleteRelFn: function () {
          var _this = this;
          var ids;
          var selections = this.$refs.tabRelDefTable.selections;
          if (selections.length < 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].rTableId);
          }
          ids = { condition: JSON.stringify({ ids: arr.join(',') }) };

          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmfpdprodshowtable/del',
            data: ids,
            callback: function (code, message, response) {
              _this.$refs.tabRelDefTable.remoteData();
              _this.$message('操作成功');
            }
          });
        },
        /**
     * 取消按钮
     */
        cancleFn: function (cancleTit) {
          var _this = this;
          if (cancleTit == 'hand') {
            _this.proTabForm = false;
          }
          if (cancleTit == 'proTabInfoForm') {
            _this.proTabInfoVisible = false;
          }
          if (cancleTit == 'proTabForm') {
            _this.proTabAddVisible = false;
          }
          if (cancleTit == 'tabRelDefFrom') {
            _this.tabRelDefVisible = false;
          }
          if (cancleTit == 'tabPropDefFrom') {
            _this.tabPropDefVisible = false;
          }
        }
      }
    });
  };
});
