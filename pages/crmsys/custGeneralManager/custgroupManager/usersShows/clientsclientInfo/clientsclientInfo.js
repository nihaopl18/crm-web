/**
* @author houyx3
* @since 2018/07/13.
* @description 客户群成员—添加成员
*/
define([
  'custom/widgets/js/yufpProdSelector.js',
  'custom/widgets/js/YufpMgrSelector.js'
], function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  var proid = '';
  var Ids = '';
  var pro = [];
  exports.ready = function (hashCode, data, cite) {
    var custGroup = data;
    var vm = yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          /** 未入群查询字段 */
          queryFieldsnojion: [
            {placeholder: '客户号', field: 'custId', type: 'input'},
            {placeholder: '客户名称', field: 'custName', type: 'input'},
            {placeholder: '证件类型', field: 'identType', type: 'select', dataCode: 'IDENT_TYPE'},
            {placeholder: '证件号码', field: 'identNo', type: 'input'},
            {placeholder: '所属客户经理', field: 'belongMgr', type: 'custom', is: 'yufp-mgr-selector'}
          ],
          /** 未入群客户搜索按钮 */
          queryButtonsnojion: [
            {label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _self.$refs.nojoin.remoteData(param);
                }
              }},
            {label: '重置',
              op: 'reset',
              type: 'primary',
              icon: 'yx-loop2',
              click: function (model, valid) {
                _self.$refs.nojoinform.$refs.belongMgr[0].value = '';
              } }
          ],
          // 入群客户查询字段
          queryFieldsjoin: [
            {placeholder: '客户号', field: 'custId', type: 'input'},
            {placeholder: '客户名称', field: 'custName', type: 'input'},
            {placeholder: '证件类型', field: 'identType', type: 'select', dataCode: 'IDENT_TYPE'},
            {placeholder: '证件号码', field: 'identNo', type: 'input'},
            {placeholder: '所属客户经理', field: 'belongMgr', type: 'custom', is: 'yufp-mgr-selector'}
          ],
          // 入群客户搜索
          queryButtonsjoin: [
            {label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _self.$refs.join.remoteData(param);
                }
              }},
            {label: '重置',
              op: 'reset',
              type: 'primary',
              icon: 'yx-loop2',
              click: function (model, valid) {
                if (valid) {
                  _self.$refs.joinform.$refs.belongMgr[0].value = '';
                }
              } }
          ],
          // 产品选择
          productButtons: [
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' },
            {label: '确定',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  proid = model.markePro;
                  _self.provisible = false;
                }
              }}
          ],
          // 修改产品选择
          productButtonsupd: [
            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' },
            {label: '确定',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var parampro = {
                    condition: JSON.stringify({
                      ids: Ids,
                      proids: model.markePro
                    })
                  };
                  yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + '/api/cimpccustgroupcust/updpro',
                    data: parampro,
                    callback: function (code, message, response) {
                      if (code == 0) {
                        _self.$refs.nojoin.remoteData();
                        _self.$refs.join.remoteData();
                        _self.$message(response.message);
                      }
                    }
                  });
                  _self.provisibleupd = false;
                }
              }}
          ],
          // 群成员信息
          clientsView: [
            { prop: 'custId', label: '客户号', type: 'input'},
            { prop: 'custName', label: '客户名称', type: 'input'},
            { label: '证件类型', prop: 'identType', dataCode: 'IDENT_TYPE', resizable: true },
            { label: '证件号码', prop: 'identNo', resizable: true },
            { prop: 'custType', label: '客户类型', type: 'input', dataCode: 'CUST_TYPE'}
          ],
          joinclientsView: [
            { prop: 'custId', label: '客户号', type: 'input'},
            { prop: 'custName', label: '客户名称', type: 'input'},
            { label: '证件类型', prop: 'identType', dataCode: 'IDENT_TYPE', resizable: true },
            { label: '证件号码', prop: 'identNo', resizable: true },
            { prop: 'custType', label: '客户类型', type: 'input', dataCode: 'CUST_TYPE'},
            {label: '营销产品',
              prop: 'markeProPri',
              resizable: true,
              formatter: function (row, column, cellValue) {
                if (cellValue == null) {
                  return;
                }
                var productnames = '';
                var cellvalues = cellValue.split(',');
                for (var num = 0; num < cellvalues.length; num++) {
                  for (var i = 0; i < pro.length; i++) {
                    if (cellvalues[num] == pro[i].productId) {
                      if (num == 0) {
                        productnames = pro[i].prodName;
                      } else {
                        productnames += ',' + pro[i].prodName;
                      }
                    }
                  }
                }
                return productnames;
              }
            }
          ],
          // productFields: [{
          //   fields: [
          //     {label: '选择营销产品', field: 'markePro', type: 'custom', is: 'yufp-prod-selector', params: { tabCheckbox: true }
          //     }
          //   ]
          // }],
          productFieldsupd: [{
            fields: [
              {label: '选择营销产品', field: 'markePro', type: 'custom', is: 'yufp-prod-selector', params: { tabCheckbox: true }
              }
            ]
          }],
          uploadTitle: 'Excel表导入客户',
          fileList: [],
          uploadDialog: false,
          // action: backend.adminService + '/api/cimpccgbaseinfo/uploadtable',
          action: yufp.service.getUrl({
            url: backend.adminService + '/api/cimpccgbaseinfo/uploadtable'
          }),
          headers: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          uploaddata: {
            custGroupId: '',
            flag: '0'
          },
          // 未加入客户查询URL
          provisible: false,
          provisibleupd: false,
          noJoinUrl: backend.adminService + '/api/cimpccgbaseinfo/nojionlist',
          joinUrl: backend.adminService + '/api/cimpccgbaseinfo/jionlist',
          baseParams: {
            condition: JSON.stringify({
              custGroupId: custGroup.clientInfo.custGroupId,
              custType: custGroup.clientInfo.groupMemberType
            })
          }
          // 加入客户查询URL
        };
      },
      mounted: function () {
        yufp.service.request({
          url: backend.adminService + '/api/cmfrcproductmanager/getpro',
          method: 'get',
          async: false,
          callback: function (code, message, response) {
            pro = response.data;
          }
        });
      },
      methods: {
        // 导入客户
        uplodTable: function (row, event) {
          var _this = this;
          _this.uploaddata.custGroupId = custGroup.clientInfo.custGroupId;
          _this.uploadDialog = true;
        },
        // 上传之前判断文件格式
        beforeAvatarUpload: function (file) {
          var regex = /^.*\.(?:xls|xlsx)$/i;
          if (!regex.test(file.name)) {
            this.$message.error('只能导入xls或xlsx格式文件!');
            return false;
          }
          return file.name;
        },
        submitUpload: function () {
          this.$refs.verUpload.submit();
          this.uploadDialog = false;
        },
        // 文件上传成功处理逻辑
        onSuccess: function (response, file, fileList) {
          // console.log('上传文件', response);
          // alert(response.code);
          if (response.code == -1) {
            this.$message('文件导入失败!', '提示');
            vm.$refs.verUpload.clearFiles();
            // vm.$refs.accessTables.remoteData();
          } else {
            this.$message('文件导入成功!', '提示');
            var _this = this;
            _this.$refs.join.remoteData();
            vm.$refs.verUpload.clearFiles();

            // vm.$refs.accessTables.remoteData();
          }
        },
        onError: function () {
          this.$message('文件导入失败!', '提示');
          vm.$refs.verUpload.clearFiles();
          // vm.$refs.accessTables.remoteData();
        },
        // 下载模板
        downTable: function (row, event) {
          var url = backend.fileService + '/api/file/provider/download?fileId=' + 'group1/M00/00/0E/wKj7l1v_uDGAVAGFAAAnAFKpvYE33.xlsx';
          yufp.util.download(url);
        },
        // 打开客户视图
        opencustViewFn: function () {
          if (this.$refs.join.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var customKey = 'custom_view' + this.$refs.join.selections[0].custName; // 请以custom_view前缀开头，并且全局唯一
          var routeId = 'custView' + this.$refs.join.selections[0].custType; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '客户视图:' + this.$refs.join.selections[0].custName, // 页签名称
            data: { cust: this.$refs.join.selections[0] } // 传递的业务数据，可选配置
          });
        },
        // 加入客户群方法
        clientjoin: function () {
          var _self = this;
          var custIds = '';
          var selections = _self.$refs.nojoin.selections;
          if (selections.length < 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          } else if (selections.length > 1) {
            for (var i = 0; i < selections.length; i++) {
              if (i == 0) {
                custIds = selections[0].custId;
              } else {
                custIds += ',' + selections[i].custId;
              }
            }
          } else {
            custIds = selections[0].custId;
          }
          var joingroups = {
            condition: JSON.stringify({
              custGroupId: custGroup.clientInfo.custGroupId,
              custIds: custIds,
              markeProPri: proid
            })
          };
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ocrmfcicgmember/joingroup',
            data: joingroups,
            callback: function (code, message, response) {
              if (code == 0) {
                proid = '';
                _self.$refs.nojoin.remoteData();
                _self.$refs.join.remoteData();
                _self.$message(response.message);
              }
            }
          });
        },
        // 选择营销产品
        // checkPro: function () {
        //   var _self = this;
        //   this.provisible = true;
        //   _self.$nextTick(function () {
        //     _self.$refs.productref.resetFn();
        //   });
        //   proid = '';
        // },
        // 修改营销产品
        updPro: function () {
          var _self = this;
          var selections = _self.$refs.join.selections;
          if (selections.length < 1) {
            _self.$message({ message: '请先选择至少一条记录', type: 'warning' });
            return;
          } else if (selections.length > 1) {
            for (var i = 0; i < selections.length; i++) {
              if (i == 0) {
                Ids = selections[0].id;
              } else {
                Ids += ',' + selections[i].id;
              }
            }
          } else {
            Ids = selections[0].id;
          }
          this.provisibleupd = true;
          _self.$nextTick(function () {
            _self.$refs.productref.resetFields();
          });
        },
        // 移出客户群方法
        clientremove: function () {
          var _self = this;
          var custIds = '';
          var selections = _self.$refs.join.selections;
          if (selections.length < 1) {
            _self.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          } else if (selections.length > 1) {
            for (var i = 0; i < selections.length; i++) {
              if (i == 0) {
                custIds = selections[0].custId;
              } else {
                custIds += ',' + selections[i].custId;
              }
            }
          } else {
            custIds = selections[0].custId;
          }
          var outgroups = {
            condition: JSON.stringify({
              custGroupId: custGroup.clientInfo.custGroupId,
              custIds: custIds
            })
          };
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/cimpccustgroupcust/outgroup',
            data: outgroups,
            callback: function (code, message, response) {
              if (code == 0) {
                _self.$refs.nojoin.remoteData();
                _self.$refs.join.remoteData();
                _self.$message(response.message);
              }
            }
          });
        }
      }
    });
  };
});