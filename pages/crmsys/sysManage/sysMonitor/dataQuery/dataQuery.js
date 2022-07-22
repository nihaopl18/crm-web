/**
 * @Created by zjy zhangjy14@yuys.com.cn on 2019-7-2 16:58:00.
 * @updated by
 * @description 数据查询
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  'libs/js-xlsx/xlsx.full.min.js',
  './custom/plugins/yufp.watermark.js'
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
          dataUrl: backend.adminService + '/api/ocrmfsysusertile/dataLists',
          queryFormdata: {},
          rule: [
            { required: true, message: '必填项', trigger: 'blur' },
            { message: '请输入sql', trigger: 'blur' }
          ],
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          tablelable: [],
          lableFlag: false
        };
      },
      methods: {
        /**
         * 查询
         */
        queryFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var ld1 = _this.$loading({
            target: '.div1',
            body: true,
            text: '拼命加载中'
          });
          var model = {};
          yufp.clone(_this.queryFormdata, model);
          // 取表名
          // model.sql.substring('from',);
          var sql = model.sql.split(' ');
          var position = 0;
          for (var index = 0; index < sql.length; index++) {
            var from = sql[index];
            if (from == 'from') {
              position = index;
            }
          }
          var tableName = sql[position + 1];
          var params = {
            condition: JSON.stringify({ tableName: tableName })
          };
          var param = {
            condition: JSON.stringify(model)
          };
          var tableCoumn = [];
          yufp.service.request({
            methods: 'POST',
            url: backend.adminService + '/api/ocrmfsysusertile/tableColumns',
            data: params,
            async: false,
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                if (response.data.length > 0) {
                  _this.tablelable = [];
                  for (var i = 0; i < response.data.length; i++) {
                    // 将返回的数据转为小驼峰
                    var nameArray = response.data[i].columnName.toLowerCase().split('_');
                    var name = nameArray[0];
                    if (nameArray.length > 1) {
                      for (var j = 1; j < nameArray.length; j++) {
                        var word = nameArray[j].substring(0, 1).toUpperCase() + nameArray[j].substring(1, nameArray[j].length);
                        name += word;
                      }
                    }
                    response.data[i].columnName = name;
                    // 备注没有则不显示
                    if (response.data[i].columnothname != null && response.data[i].columnothname != '') {
                      tableCoumn.push(response.data[i]);
                    }
                  }
                  _this.lableFlag = true;
                } else {
                  _this.lableFlag = false;
                }
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
          if (_this.lableFlag) {
            _this.tablelable = tableCoumn;
            _this.$nextTick(function () {
              _this.$refs.refTable.remoteData(param);
              ld1.close();
            });
          }
        },
        /**
         * 导出操作
         */
        exportFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.queryFormdata, model);
          var param = {
            condition: JSON.stringify(model)
          };
          // model.sql.substring('from',);
          var sql = model.sql.split(' ');
          var position = 0;
          for (var index = 0; index < sql.length; index++) {
            var from = sql[index];
            if (from == 'from') {
              position = index;
            }
          }
          var tableName = sql[position + 1];
          var params = {
            condition: JSON.stringify({ tableName: tableName })
          };
          var tableCoumn = [];
          yufp.service.request({
            methods: 'POST',
            url: backend.adminService + '/api/ocrmfsysusertile/tableColumns',
            data: params,
            async: false,
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.$refs.refTable.tabledata = [];
                if (response.data.length > 0) {
                  _this.tablelable = [];
                  for (var i = 0; i < response.data.length; i++) {
                    // 将返回的数据转为小驼峰
                    var nameArray = response.data[i].columnName.toLowerCase().split('_');
                    var name = nameArray[0];
                    if (nameArray.length > 1) {
                      for (var j = 1; j < nameArray.length; j++) {
                        var word = nameArray[j].substring(0, 1).toUpperCase() + nameArray[j].substring(1, nameArray[j].length);
                        name += word;
                      }
                    }
                    response.data[i].columnName = name;
                    // 备注没有则不显示
                    if (response.data[i].columnothname != null && response.data[i].columnothname != '') {
                      tableCoumn.push(response.data[i]);
                    }
                  }
                  _this.lableFlag = true;
                } else {
                  _this.lableFlag = false;
                }
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
          if (_this.lableFlag) {
            _this.tablelable = tableCoumn;
            var tables = _this.$refs.refTable.tableColumns;
            // 给tableColumns [{prop:xx,label:xx}]赋值
            for (var i = 0; i < tableCoumn.length; i++) {
              var prop = tableCoumn[i].columnName;
              var label = tableCoumn[i].columnothname;
              tables.push({ 'label': label, 'prop': prop });
            }
          }
          yufp.util.exportExcelByTable({
            fileName: '导出数据日志',
            importType: 'service', // page当前页 selected 选中的数据  service 后端数据,selected为所选择的数据
            ref: _this.$refs.refTable,
            url: backend.custpersonService + '/api/ocrmfsysusertile/exportdataLists',
            param: param
          });
        }
      }
    });
  };
});