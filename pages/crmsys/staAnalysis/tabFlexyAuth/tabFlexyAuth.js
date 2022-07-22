/**
 * @Created by zhuly6 zhuly6@yusys.com.cn on 2019-1-21
 * @updated by
 * @description 统计分析-灵活图标授权
 */
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
* 页面加载完成时触发
* @param hashCode 路由ID
* @param data 传递数据对象
* @param cite 页面站点信息
*/
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('PUB_STS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: '',
          editableTabsValue: '',
          pageable: true,
          notAutDataUrl: backend.adminService + '/api/ocrmacifqgraphauth/getlist',
          autDataUrl: backend.adminService + '/api/ocrmacifqgraphauth/getauthlist',
          rolesDataUrl: backend.adminService + '/api/adminsmrole/querybyrolests',
          roleCode: { roleCode: '' },
          load: false,
          autTabledata: [],
          notAutTabledata: [],
          selectTem: [],
          roleTem: [],
          roleHeight: yufp.frame.size().height - 103 - 92 + 36, // 默认103+两行标题36*2
          height: yufp.frame.size().height - 103 - 92 // 默认103+两行标题36*2


        };
      },
      methods: {
        /**
     * 详情
     */
        deleteFn: function () {
          var _this = this;
          var ids = [];
          var selections1 = _this.$refs.notAutTable.selections;
          var selections2 = _this.$refs.autTable.selections;
          var deleteTem = [];
          var comitData = {};
          comitData.roleCode = _this.roleTem.roleId;
          if (selections1.length < 1 && selections2.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections1.length > 0) {
            deleteTem = selections1;
          } else {
            deleteTem = selections2;
          }
          for (var i = 0; i < deleteTem.length; i++) {
            ids.push(deleteTem[i].graphId);
          }
          ids = ids.join(',');
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmacifqgraphauth/deletegraph/' + ids,
            data: comitData,
            callback: function (code, message, response) {
              _this.$refs.notAutTable.remoteData();
              _this.$refs.autTable.remoteData();
              _this.$message('操作成功');
            }
          });
        },
        /**
     * 选择角色
     */
        getTableFn: function () {
          var _this = this;
          var selections = _this.$refs.rolesTable.selections;
          _this.roleCode = { roleCode: selections[0].roleId };
          _this.roleTem = selections[0];
        },
        /**
     *获取已授权列表信息
     */
        getAutTabledataFn: function (data) {
          var _this = this;
          _this.autTabledata = data;
        },

        /**
     *获取未授权列表信息
     */
        getnotAutTabledataFn: function (data) {
          var _this = this;
          _this.notAutTabledata = data;
        },
        /**
     *添加未授权列表
     */
        addLeftFn: function () {
          var _this = this;
          var selections = _this.$refs.autTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少选择一条记录', type: 'warning' });
            return;
          }
          _this.selectTem = selections;
          for (var i = 0; i < selections.length; i++) {
            _this.notAutTabledata.push(selections[i]);
          }
          for (var j = 0; j < _this.autTabledata.length; j++) {
            for (i = 0; i < selections.length; i++) {
              if (_this.autTabledata[j].graphId == selections[i].graphId) {
                _this.autTabledata.splice(j, 1);
              }
            }
          }
        },
        /**
     *添加所有到未授权列表
     */
        addAllLeftFn: function () {
          var _this = this;
          for (var i = 0; i < _this.autTabledata.length; i++) {
            _this.notAutTabledata.push(_this.autTabledata[i]);
          }
          _this.autTabledata.splice(0);
        },
        /**
     *添加已授权列表
     */
        addRightFn: function () {
          var _this = this;
          var selections = _this.$refs.notAutTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少选择一条记录', type: 'warning' });
            return;
          }
          _this.selectTem = selections;
          for (var i = 0; i < selections.length; i++) {
            _this.autTabledata.push(selections[i]);
          }
          for (var j = 0; j < _this.notAutTabledata.length; j++) {
            for (i = 0; i < selections.length; i++) {
              if (_this.notAutTabledata[j].graphId == selections[i].graphId) {
                _this.notAutTabledata.splice(j, 1);
              }
            }
          }
        },
        /**
     *添加所有到已授权列表
     */
        addaAllRightFn: function () {
          var _this = this;
          for (var i = 0; i < _this.notAutTabledata.length; i++) {
            _this.autTabledata.push(_this.notAutTabledata[i]);
          }
          _this.notAutTabledata.splice(0);
        },
        saveFn: function () {
          var _this = this;
          var model = [];
          if (_this.roleTem.length < 1) {
            _this.$message({ message: '请至少选择一个角色', type: 'warning' });
            return;
          }
          yufp.clone(_this.autTabledata, model);
          for (var i = 0; i < model.length; i++) {
            model[i].roleCode = _this.roleTem.roleId;
          }
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmacifqgraphauth/savegraph',
            data: JSON.stringify(model),
            callback: function (code, message, response) {
              _this.$refs.notAutTable.remoteData();
              _this.$refs.autTable.remoteData();
              _this.$message('操作成功');
            }
          });
        }
      }
    });
  };
});