/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-4 11:51:03.
 * @updated by
 * @description 客户授权
 */
define(['custom/widgets/js/yufpViewTree.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('ACCREDIT_TYPE,CD0032,CD0011,CD0016,CD0019,CD0243');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          // 后端服务接口
          // dataUrl: backend.adminService + '/api/grantapply/list',
          dataUrl: backend.adminService + '/api/grantapply/mycustlist',
          // dataUrl: '/trade/example/list',
          historyDataUrl: backend.adminService + '/api/grantapply/custgrantlist',
          grantListdataUrl: backend.adminService + '/api/grantapply/grantlist',
          grantCustUrl: backend.adminService + '/api/grantapply/grantcust',
          grantListVisible: false,
          grantCustVisible: false,
          grantListFormdata: {},
          grantCustParams: {condition: JSON.stringify({userId: yufp.session.userId})},
          forqueryFormdata: {},
          formdata: {},
          dialogVisible: false,
          histroyAccreditdialogVisible: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          parambusiType: '',
          // 零售客户视图树参数
          retaiCustViewParams: {
            placeholder: '请选择授权的视图项',
            // 是否支持复选
            needCheckbox: true,
            width: 250,
            dataId: 'id',
            dataLabel: 'name',
            dataPid: 'parentId',
            dataParams: {
              sysId: yufp.session.logicSys.id
            },
            // 请求数据接口
            dataUrl: '/api/ocrmfsysviewmanager/getsysviewTree'
          },
          // 客户经理放大镜
          custManagerParams: {
            user: {
              dataUrl: '/api/grantapply/getcm'
            }
          },
          selectCustParams: {
            rowIndex: true,
            width: '1100px',
            user: {
              fieldColumns: 4,
              fieldData: [
                { label: '客户类型', field: 'custType', width: '80px', type: 'select', dataCode: 'CD0016'},
                { label: '客户状态', field: 'custStatus', width: '80px', type: 'select', dataCode: 'CD0019'}
              ]
            }
          },
          // 授权客户表格数据
          custAccreditData: [],
          filterPerNodeids: '',
          filterOrgNodeids: '',
          // 零售视图节点id
          perVNodeId: 'f38c540fa3a842f1a9bebe5fbe881dda',
          // 对公视图节点id
          orgVNodeId: '1510d10391f64514b833c0d12d39a824'
        };
      },
      mounted: function () {
        var _this = this;
        _this.forqueryFormdata.grantStutas = '1';
        yufp.service.request({
          method: 'GET',
          url: backend.custgroupService + '/api/allcust/mybusitype',
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.data.busiType == '2') {
                _this.forqueryFormdata.custType = '2';
              } else {
                _this.forqueryFormdata.custType = '1';
              }
            }
          }
        });
      },
      methods: {
        grantListInfoFn: function () {
          var _this = this;
          var selection = _this.$refs.grantListrefTable.selections;
          if (selection.length != 1) {
            this.$message({
              type: 'warning',
              message: '请选择一条客户数据'
            });
            return;
          }
          this.grantCustVisible = true;
          this.$nextTick(function () {
            var param = {
              condition: JSON.stringify({applyId: selection[0].applyId})
            };
            _this.$refs.grantCustTable.remoteData(param);
          });
        },
        grantListSearchFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.grantListSearchForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.grantListFormdata, model);
          var param = {
            condition: JSON.stringify(model)
          };
          this.$nextTick(function () {
            _this.$refs.grantListrefTable.remoteData(param);
          });
        },
        grantListResetFn: function () {
          this.$nextTick(function () {
            this.$refs.grantListSearchForm.resetFields();
          });
        },
        /**
        * 查询——搜索按钮
        */
        searchFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.custforSearchForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.forqueryFormdata, model);
          model.userId = yufp.session.userId;
          model.orgId = yufp.session.org.code;
          model.oneOrg = _this.oneOrg;
          var param = {
            condition: JSON.stringify(model)
          };
          _this.$refs.forrefTable.remoteData(param);
        },
        /**
  * 查询——重置按钮
 */
        resetMainFn: function () {
          this.$refs.custforSearchForm.resetFields();
        },
        /**
        * 时间格式化
        */
        timeFormatter: function (row, column, cellValue) {
          var datetime = cellValue;
          if (!datetime) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d} {h}:{mi}:{s}');
        },
        /**
        * 日期格式化
        */
        dateFormatter: function (row, column, cellValue) {
          var datetime = cellValue;
          if (!datetime) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
        },
        /**
        * 零售树节点数据加载完成后
        */
        pertreeLodedFn: function () {
          this.filterPerNodeids = ',' + this.perVNodeId + ',';
          this.$refs.perrefTree.$refs.perrefTree.$refs.orgTree.filter(this.perVNodeId);
        },
        /**
        * 筛选零售客户视图树节点，深度优先遍历树节点
        * @param value 调用yufp-org-tree中的yufp-ext-tree组件的filter()方法传的参数，用于匹配筛选树节点
        * @param {Array} data 树节点数据对象
        * return Boolean 返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
        */
        filterPerFn: function (value, data, node) {
          if (this.filterPerNodeids.indexOf(',' + data.id + ',') >= 0 || this.filterPerNodeids.indexOf(',' + data.parentId + ',') >= 0) {
            this.filterPerNodeids += data.id + ',';
            return true;
          } else {
            return false;
          }
        },
        /**
        * 对公树节点数据加载完成后
        */
        orgtreeLodedFn: function () {
          this.filterOrgNodeids = ',' + this.orgVNodeId + ',';
          this.$refs.orgrefTree.$refs.orgrefTree.$refs.orgTree.filter(this.orgVNodeId);
        },
        /**
      * 筛选对公客户视图树节点，深度优先遍历树节点
      * @param value 调用yufp-org-tree中的yufp-ext-tree组件的filter()方法传的参数，用于匹配筛选树节点
      * @param {Array} data 树节点数据对象
      * return Boolean 返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
      */
        filterOrgFn: function (value, data, node) {
          if (this.filterOrgNodeids.indexOf(',' + data.id + ',') >= 0 || this.filterOrgNodeids.indexOf(',' + data.parentId + ',') >= 0) {
            this.filterOrgNodeids += data.id + ',';
            return true;
          } else {
            return false;
          }
        },
        activeFn: function (activeNames) {
          this.name = activeNames;
        },
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
        saveFn: function (formmodel) {
          var _this = this;
          var model = {};
          var selections = _this.$refs.forrefTable.selections;
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 获得选择的视图节点
          // TODO 法人从哪里取？
          // model.corpOrgCode = selections[0].corpOrgCode;
          // 转换托管有效期
          model.deadLine = model.deadLine.toJSON();
          // TODO 客户经理编号，应该从哪里取？
          model.mgrId = yufp.session.userId;
          // 客户经理名称
          model.mgrName = yufp.session.userName;
          // TODO 授权视图类型
          // 对私
          // if (model.custType == '1') {
          //   // 对应零售视图
          //   model.grantViewType = '';
          // } else if (model.custType == '2') {
          //   // 对应对公视图
          //   model.grantViewType = model.custType;
          // }
          model.grantViewType = model.custType;
          // TODO 授权视图项
          // TODO 授权状态，后台服务设置
          // model.grantStat = selections[0].grantStat;
          // TODO 设置人id，是yufp.session.userId还是userCode
          model.setUserId = yufp.session.userId;
          // 设置人名称
          model.setUserName = yufp.session.userName;
          var custIdArray = [], custNameArray = [];
          for (var i = 0, len = selections.length; i < len; i++) {
            custIdArray.push(selections[i].custId);
            custNameArray.push(selections[i].custName);
          }
          // // 客户编号
          model.custId = custIdArray.join(',');
          // // 客户名称
          model.custName = custNameArray.join(',');
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: '/api/grantapply/add',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.$refs.forrefTable.remoteData();
                _this.$message('授权成功');
                _this.dialogVisible = false;
              } else {
                _this.$message.error('授权失败');
              }
            }
          });
        },
        /**
         * 授权
         */
        grantFn: function () {
          var _this = this;
          var selections = _this.$refs.forrefTable.selections;
          if (selections == 0) {
            this.$message({
              type: 'warning',
              message: '请至少选择一条客户数据'
            });
            return;
          }
          _this.dialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
          });
        },
        /**
         * 授权
         */
        accreditFn: function () {
          var _this = this;
          _this.dialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var len = _this.custAccreditData.length;
            _this.custAccreditData.splice(0, len);
            _this.$refs.perrefTree.$refs.perrefTree.$refs.orgTree.setCheckedKeys([]);
          });
        },
        grantCustFn: function () {
          var _this = this;
          _this.grantListVisible = true;
          this.$nextTick(function () {
            _this.$refs.grantListSearchForm.resetFields();
            var model = {};
            yufp.clone(_this.grantListFormdata, model);
            var param = {
              condition: JSON.stringify(model)
            };
            _this.$refs.grantListrefTable.remoteData(param);
          });
        },
        /**
         * 回收授权
         */
        recycleGranteFn: function () {
          var _this = this;
          var selections = _this.$refs.grantListrefTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          // TODO 后台接口出来后，改变存储的属性
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].applyId);
          }
          _this.$confirm('是否确认回收授权?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/grantapply/recover',
                  data: {
                    'applyId': arr.join(',')
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.code === 0) {
                      // var model = {};
                      // yufp.clone(_this.trustListFormdata, model);
                      // var param = {
                      //   condition: JSON.stringify(model)
                      // };
                      _this.$nextTick(function () {
                        _this.$refs.grantListrefTable.remoteData();
                      });
                      if (response.message) {
                        _this.$message(response.message);
                      } else {
                        _this.$message('回收成功');
                      }
                    } else {
                      if (response.message) {
                        _this.$message(response.message);
                      } else {
                        _this.$message.error('操作失败');
                      }
                    }
                  }
                });
              }
            }
          });
        },
        /**
        * 授权客户清单 按钮
        */
        accreditCustListFn: function () {
          var selections = this.$refs.refTable.selections;
          if (selections.length != 1) {
            this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          this.histroyAccreditdialogVisible = true;
          var param = {condition: JSON.stringify({applyNo: selections[0].applyId})};
          this.$nextTick(function () {
            this.$refs.refCustHistoryTable.remoteData(param);
          });
        },
        /**
        * 客户经理选择
        */
        mgrSelectFn: function (data) {
          this.formdata.grantMgrName = data[0].userName;
        },
        /**
         * 新增
         */
        addCustFn: function () {
          var _this = this;
          if (!_this.formdata.custType) {
            _this.$message({
              message: '请先选择客户类型',
              type: 'warning'
            });
            return;
          }
          _this.$refs.selectCust.dialogVisible = true;
          this.$nextTick(function () {
            var userTableRef = _this.$refs.selectCust.$refs.usertable;
            // 重置放大镜中的查询项
            this.$refs.selectCust.$refs.queryCondition.$children[0].resetFields();
            _this.$refs.selectCust.$refs.queryCondition.fm.custType = _this.formdata.custType;
            // 将放大镜中的客户类型置灰
            _this.$refs.selectCust.$refs.queryCondition.switch('custType', 'disabled', true);
          });
        },
        /**
         * 删除客户数据
         */
        deleteCustFn: function () {
          var selections = this.$refs.refCustTable.selections;
          for (var i = 0, len = selections.length; i < len; i++) {
            for (var j = 0; j < this.custAccreditData.length; j++) {
              if (selections[i].custId === this.custAccreditData[j].custId) {
                this.custAccreditData.splice(j, 1);
              }
            }
          }
        },
        /**
         * 授权发起弹出框——新增客户——选择客户后触发
         * @param {Array} data 选择的客户数据
         */
        custSeletFn: function (data) {
          var _this = this;
          for (var k = 0, len = data.length; k < len; k++) {
            _this.custAccreditData.push(data[k]);
          }
          // 去重操作
          for (var i = _this.custAccreditData.length - 1; i > 0; i--) {
            for (var j = 0; j < _this.custAccreditData.length; j++) {
              if (j != i && _this.custAccreditData[i].custId == _this.custAccreditData[j].custId) {
                _this.custAccreditData.splice(i, 1);
              }
            }
          }
        }
      }
    });
  };
});