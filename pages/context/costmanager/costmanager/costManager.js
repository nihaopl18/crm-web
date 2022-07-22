/**
 * @Created by   on 2019-4-23 11:06:47.
 * @updated by
 * @description 成本管理
 */
define(['pages/context/costmanager/costmanager/costManager.css'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('COST_TYPE,TRANSACTION_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          treeUrl: '/api/tabletype/list', // 表类别Url,
          tableDataUrl: '/api/tableecname/tablelist', // 表名列表查询接口
          tableCostUrl: '/api/fieldcost/list',
          transactionName: '',
          baseParams: {},
          fieldOptions: [],
          disabledField: false,
          height: yufp.frame.size().height,
          formdata: {
            legalperson: '本法人'
          },
          async: false,
          org: '2',
          legalperson: '本法人',
          orgOptions: [{ key: '1', value: '业务发生机构' }, { key: '2', value: '归属机构' }],
          tableId: '',
          orghide: true,
          orgoptionhide: true,
          prodhide: true,
          personhide: true
        };
      },
      methods: {
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.$refs.refFromTable.resetFields();
          _this.prodhide = true;
          _this.orghide = true;
          _this.orgoptionhide = true;
          _this.personhide = true;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          model.tableId = _this.tableId;
          yufp.service.request({
            method: 'POST',
            url: '/api/fieldcost/costinsert',
            data: model,
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.dialogVisible = false;
                _this.$message({ message: response.message });
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
        },
        /**
         * 刷新
         */
        nodeClickFn: function (nodeData, node, self) {
          var _this = this;
          var typeId = node.data.typeId;
          if (node.typeParentId == 'P000') {
            typeId = node.data.typeParentId;
          }
          _this.baseParams.typeId = typeId;
          yufp.service.request({
            method: 'GET',
            url: _this.tableDataUrl,
            data: _this.baseParams,
            callback: function (code, message, response) {
              if (response.code == 0) {
                var data = response.data;
                _this.transactionName = data[0].transactionName;
                _this.tableId = data[0].tableId;
                yufp.service.request({
                  method: 'GET',
                  url: '/api/fieldcost/costfield',
                  data: { tableId: data[0].tableId },
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      var data = response.data;
                      _this.fieldOptions.splice(0, _this.fieldOptions.length);
                      for (var index = 0; index < data.length; index++) {
                        _this.fieldOptions.push(data[index]);
                      }
                    }
                  }
                });
                // 反显分摊模式
                yufp.service.request({
                  method: 'get',
                  url: '/api/fieldcost/getcostlist',
                  data: { tableId: data[0].tableId },
                  callback: function (code, message, response) {
                    if (response.code == 0 && response.data.length != undefined) {
                      var list = response.data;
                      // 重置分摊表单
                      _this.cancelFn();
                      var checkType = [];
                      // 反显分摊表单
                      for (var i = 0; i < list.length; i++) {
                        checkType.push(list[i].costType);
                        if (list[i].costType == '1') {
                          // 显示机构分摊表单
                          _this.orgoptionhide = false;
                          if (list[i].costField == yufp.session.org.id) {
                            // 归属机构
                            _this.orghide = true;
                            _this.$refs.refFromTable.formdata.org = '2';
                          } else {
                            // 业务发生机构展示归属字段
                            _this.formdata.costField = list[i].costField;
                            _this.$refs.refFromTable.formdata.org = '1';
                            _this.orghide = false;
                          }
                        } else if (list[i].costType == '3') {
                          // 显示产品分摊表单
                          _this.prodhide = false;
                          _this.formdata.product = list[i].costField;
                        } else if (list[i].costType == '4') {
                          _this.personhide = false;
                        }
                      }
                      _this.$refs.refFromTable.formdata.costType = checkType;
                    } else {
                      // 重置分摊表单
                      _this.cancelFn();
                    }
                  }
                });
              }
            }
          });
        },
        /**
         * 选择归属类别
         */
        changeFn: function (data) {
          var _this = this;
          _this.personhide = true;
          _this.orghide = true;
          _this.orgoptionhide = true;
          _this.prodhide = true;
          for (var i = 0; i < data.length; i++) {
            if (data[i] == '1') {
              _this.orgoptionhide = false;
              if (_this.org == '1') {
                _this.orghide = false;
              }
            } else if (data[i] == '3') {
              _this.prodhide = false;
            } else if (data[i] == '4') {
              _this.personhide = false;
            }
          }
        },
        /**
         * 选择归属机构类别
         */
        changeOrgFn: function (data) {
          var _this = this;
          if (data == '1') {
            _this.disabledField = false;
            _this.formdata.costField = _this.fieldOptions[0];
            _this.orghide = false;
            _this.orgoptionhide = false;
          } else {
            _this.disabledField = true;
            _this.formdata.costField = '';
            _this.orghide = true;
            // _this.orgoptionhide = false;
          }
        }
      }
    });
  };
});