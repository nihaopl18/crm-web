/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-4 11:43:28.
 * @updated by
 * @description 客户托管
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0016,CD0011,CD0345,CD0019,CD0032,CD0241,CD0243');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          trustListFormdata: {},
          forqueryFormdata: {},
          trustListVisible: false,
          dataUrl: backend.custpubService + '/api/trusteeship/mycustlist',
          // dataUrl: backend.adminService + '/api/trusteeship/list',
          trustListdataUrl: backend.adminService + '/api/trusteeship/trustlist',
          historyDataUrl: backend.adminService + '/api/trusteeship/custtrustlist',
          trustCustUrl: backend.adminService + '/api/trusteeship/trustcust',
          trustCustParams: {condition: JSON.stringify({userId: yufp.session.userId})},
          trustCustVisible: false,
          formdata: {},
          trustCustFormdata: {},
          dialogVisible: false,
          formDisabled: false,
          histroyTrusteedialogVisible: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          // 客户经理放大镜
          custManagerParams: {
            user: {
              dataUrl: '/api/grantapply/getcm'
            }
          },
          // 全行客户选择组件参数
          // selectAllCustParams: {
          //   rowIndex: true,
          //   user: {
          //     fieldData: [
          //       { label: '客户类型', field: 'custType', type: 'select', dataCode: 'CD0016'},
          //       { label: '客户状态', field: 'custStatus', type: 'select', dataCode: 'CD0019'},
          //       { label: '客户号', field: 'custId', type: 'input'},
          //       { label: '客户名称', field: 'custName', type: 'input'},
          //       { label: '证件类型', field: 'certType', type: 'select', dataCode: 'CD0011'},
          //       { label: '证件号码', field: 'certNo', type: 'input'}
          //     ],
          //     majTableColumns: [
          //       { label: '客户类型', prop: 'custType', width: '120', resizable: true, dataCode: 'CD0016' },
          //       { label: '客户状态', prop: 'custStatus', width: '150', resizable: true, dataCode: 'CD0019' },
          //       { label: '客户号', prop: 'custId', width: '100', resizable: true},
          //       { label: '客户名称', prop: 'custName', width: '120', resizable: true },
          //       { label: '证件类型', prop: 'certType', width: '120', resizable: true, dataCode: 'CD0011' },
          //       { label: '证件号码', prop: 'certNo', width: '100', resizable: true},
          //       { label: '主办机构', prop: 'belongBrch', width: '100', resizable: true},
          //       { label: '主办客户经理', prop: 'belongMgr', width: '100', resizable: true},
          //       { label: '价值等级', prop: 'valueLev', resizable: true, dataCode: '' },
          //       { label: '服务等级', prop: 'servLev', resizable: true, dataCode: 'CD0032' }
          //     ],
          //     // 是佛默认加载数据
          //     load: true,
          //     dataUrl: backend.adminService + '/api/allcust/list'
          //   }
          // },

          // 所辖客户选择组件参数
          selectCustParams: {
            rowIndex: true,
            width: '1100px'
            // user: {
            //   fieldColumns: 4
            // }
          },
          // 托管客户表格数据
          custTrusteeData: []
        };
      },
      mounted: function () {
        var _this = this;
        _this.forqueryFormdata.trustStutas = '1';
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
        trusteListInfoFn: function () {
          var _this = this;
          var selection = _this.$refs.trustListrefTable.selections;
          if (selection.length != 1) {
            this.$message({
              type: 'warning',
              message: '请选择一条客户数据'
            });
            return;
          }
          this.trustCustVisible = true;
          this.$nextTick(function () {
            var param = {
              condition: JSON.stringify({applyId: selection[0].applyId})
            };
            _this.$refs.trustCustTable.remoteData(param);
          });
        },
        /**
         * 查询托管中客户
         */
        trusteCustFn: function () {
          var _this = this;
          _this.trustListVisible = true;
          this.$nextTick(function () {
            _this.$refs.trustListSearchForm.resetFields();
            var model = {};
            yufp.clone(_this.trustListFormdata, model);
            var param = {
              condition: JSON.stringify(model)
            };
            _this.$refs.trustListrefTable.remoteData(param);
          });
        },
        trustListSearchFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.trustListSearchForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.trustListFormdata, model);
          var param = {
            condition: JSON.stringify(model)
          };
          this.$nextTick(function () {
            _this.$refs.trustListrefTable.remoteData(param);
          });
        },
        trustListResetFn: function () {
          this.$nextTick(function () {
            this.$refs.trustListSearchForm.resetFields();
          });
        },
        // trustCustSearchFn: function () {
        //   var _this = this;
        //   var validate = false;
        //   _this.$refs.trustCustSearchForm.validate(function (valid) {
        //     validate = valid;
        //   });
        //   if (!validate) {
        //     return;
        //   }
        //   var model = {};
        //   yufp.clone(_this.trustCustFormdata, model);
        //   var param = {
        //     condition: JSON.stringify(model)
        //   };
        //   this.$nextTick(function () {
        //     _this.$refs.trustCustTable.remoteData(param);
        //   });
        // },
        // trustCustResetFn: function () {
        //   this.$nextTick(function () {
        //     this.$refs.trustCustSearchForm.resetFields();
        //   });
        // },
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
          var selections = _this.$refs.forrefTable.selections;
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // TODO 客户经理编号，应该从哪里取？
          model.mgrId = yufp.session.userId;
          // 客户经理名称,应该从哪里取？
          model.mgrName = yufp.session.userName;
          // // TODO 托管状态，如何设置--在后台处理
          model.trustStat = selections[0].trustStat;
          // // TODO 设置人id，是yufp.session.userId还是userCode
          // model.setUserId = yufp.session.userId;
          // // 设置人名称
          // model.setUserName = yufp.session.userName;
          // // TODO 托管时间,是否需要？
          // // model.setDate = new Date().toJSON();
          // // 转换托管有效期
          model.deadLine = model.deadLine.toJSON();
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
            url: backend.adminService + '/api/trusteeship/add',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.$refs.forrefTable.remoteData();
                _this.$message('托管成功');
                _this.dialogVisible = false;
              } else {
                _this.$message.error('托管失败');
              }
            }
          });
        },
        /**
         * 托管按钮
         */
        trusteFn: function () {
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
         * 托管回收
         */
        recycleTrusteFn: function () {
          var _this = this;
          var selections = _this.$refs.trustListrefTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          // TODO 后台接口出来后，改变存储的属性
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].applyId);
          }
          _this.$confirm('是否确认回收托管?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/trusteeship/recover',
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
                        _this.$refs.trustListrefTable.remoteData();
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
        // 托管客户清单 按钮
        /**
         * 新增
         */
        addCustFn: function () {
          var _this = this;
          _this.$refs.selectCust.dialogVisible = true;
          // var param = {
          //   condition: JSON.stringify({
          //     custType: '1',
          //     // userId
          //     userId: yufp.session.userId,
          //     // orgCode
          //     orgCode: yufp.session.org.code
          //   })
          // };
          this.$nextTick(function () {
            var userTableRef = _this.$refs.selectCust.$refs.usertable;
            this.$refs.selectCust.$refs.queryCondition.$children[0].resetFields();
            // 设置form中form-item的值
            // _this.$refs.selectCust.$refs.queryCondition.fm.custType = '1';
            // userTableRef.remoteData();
            // 设置已选择的客户为选中状态
            // setTimeout(function () {
            //   userTableRef.data.filter(function (item) {
            //     for (var i = 0, len = _this.custTrusteeData.length; i < len; i++) {
            //       if (item.custId == _this.custTrusteeData[i].custId) {
            //         userTableRef.toggleRowSelection(item, true);
            //       }
            //     }
            //   });
            // }, 300);
          });
        },
        /**
        * 客户经理选择
        */
        mgrSelectFn: function (data) {
          this.formdata.trustMgrName = data[0].userName;
          this.formdata.trustMgrId = data[0].userId;
        },
        /**
         * 托管发起弹出框——新增客户——选择客户后触发
         * @param {Array} data 选择的客户数据
         */
        custSeletFn: function (data) {
          var _this = this;
          for (var k = 0, len = data.length; k < len; k++) {
            _this.custTrusteeData.push(data[k]);
          }
          // 去重操作
          for (var i = _this.custTrusteeData.length - 1; i > 0; i--) {
            for (var j = 0; j < _this.custTrusteeData.length; j++) {
              if (j != i && _this.custTrusteeData[i].custId == _this.custTrusteeData[j].custId) {
                _this.custTrusteeData.splice(i, 1);
              }
            }
          }
        },
        /**
         * 删除客户数据
         */
        deleteCustFn: function () {
          var selections = this.$refs.refCustTable.selections;
          for (var i = 0, len = selections.length; i < len; i++) {
            for (var j = 0, lenc = this.custTrusteeData.length; j < lenc; j++) {
              if (selections[i].custId === this.custTrusteeData[j].custId) {
                this.custTrusteeData.splice(j, 1);
              }
            }
          }
        },
        /**
         * 客户托管历史清单
         */
        trusteHistoryFn: function () {
          var selections = this.$refs.refTable.selections;
          if (selections.length != 1) {
            this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          this.histroyTrusteedialogVisible = true;
          var param = {condition: JSON.stringify({applyNo: selections[0].applyId})};
          this.$nextTick(function () {
            this.$refs.refCustHistoryTable.remoteData(param);
          });
        }
      }
    });
  };
});