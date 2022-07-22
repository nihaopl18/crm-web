/**
 * @created by taoting1 on 2019-1-14
 * @updated by
 * @description 所辖客户查询
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/yufpRoleSelector.js',
  './custom/widgets/js/YufpUserSelector.js',
  'custom/widgets/js/yufpCustGroup.js',
  'custom/widgets/js/YufpMgrSelector.js',
  'custom/widgets/js/yufpOrgTree.js',
  './custom/plugins/yufp.watermark.js'
  // './custom/plugins/yufp.watermark.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  var custids = '';
  var tags1 = [];
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0340,ATTENT_TYP_TST,CD0016,CD0019,CD0348,CD0349,CD0011,CD0350,CD0351,CD0243,CD0032,CD0238,CD0342,ADD_GROUP_TYPE,CD0337,CD0339,KHQLX');
    var dataparam;
    var dashboard = data;
    if (data == null || data == '') {
      dataparam = {};
    } else {
      dataparam = { queryAll: data.queryAll, custType: data.custType };
    }
    var orgWidth = 250;
    var perWidth = 100;
    var vm = yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          // 查询表单数据
          queryFormdata: {},
          url: backend.custpubService + '/api/governedcust/listper',
          async: false,
          name: 'asdsad',
          param: { groupNo: '0', levelunit: '1' },
          list: [], // 选择的标签组数据
          dataParams: { condition: JSON.stringify(dataparam) },
          qryUrl: backend.custpubService + '/api/cimftagcusttags/getlistbytags',
          treeqryUrl: backend.custpubService + '/api/cimfmmftagGrop/getGroupTree',
          selectList: [], // 选中的作为查询条件的标签
          settinglist: [],
          setselectList: [], // 选中的作为查询条件的标签
          qryList: [], // 查询条件
          setlist: [], // 查询条件
          custtagList: [],
          dashcustType: data.custType,
          tags1: tags1,
          tagTemp: { custName: '', definedTag: '' },
          dialogTagForm: false,
          buttonsDisabled: false,
          custgroupvisible: false,
          height: yufp.frame.size().height - 103,
          custWidth: perWidth,
          // 关注类型弹出框
          attentTypevisible: false,
          // 关注类型表格数据
          attentFormdata: {},
          // 创建客户群弹出框
          addCustGroupDialogVisible: false,
          // 客户群表单数据
          custGroupformdata: {},
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          // 客户群表单
          formdata: {},
          paramOrgId: '',
          parambusiType: '',
          paramorgIdAuth: '',
          opencustViewBtn: !yufp.session.checkCtrl('view'),
          joinGroupBtn: !yufp.session.checkCtrl('group'),
          setMyAttentionCustBtn: !yufp.session.checkCtrl('attention')
        };
      },
      computed: {
        status: function () {
          // 判断加入方式是否是加入已有客户群
          return this.formdata.addType === '1';
        }
      },

      mounted: function () {
        console.log(yufp.session.checkCtrl('view'));
        var _this = this;
        // var ceshi=document.getElementById('ceshi');
        // yufp.service.request({
        //   method: 'GET',
        //   url: backend.custpubService + '/api/adminsmuser/queryuserorg',
        //   data: {
        //     condition: JSON.stringify({paramId: yufp.session.userId})
        //   },
        //   callback: function (code, message, response) {
        //     if (code == 0 && response.code === 0) {
        //       if (response.data) {
        //         var data = response.data;
        //         var strArr = [];
        //         for (var i = 0, len = data.length; i < len; i++) {
        //           strArr.push(data[i].orgId);
        //         }
        //         _this.paramOrgId = strArr.join(',');
        yufp.service.request({
          method: 'GET',
          url: backend.custpubService + '/api/governedcust/getbusitype',
          data: {
            condition: JSON.stringify({userId: yufp.session.userId})
          },
          callback: function (code, message, response) {
            if (code == 0 && response.code === 0) {
              if (response.data) {
                var data = response.data;
                _this.parambusiType = data.busiType;
                _this.paramorgIdAuth = data.orgIdAuth;
                if (data.userCustType == '2') {
                  _this.queryFormdata.custType = '2';
                  _this.queryFormdata.isAdmitEnter = '1';
                } else {
                  _this.queryFormdata.custType = '1';
                  _this.queryFormdata.isAdmitEnter = '1';
                };
                if (_this.dashcustType != '' && _this.dashcustType != undefined) {
                  var model = {};
                  model.userId = yufp.session.userId;
                  model.orgCode = yufp.session.org.code;
                  model.orgId = _this.paramOrgId;
                  // 条线
                  model.busiType = _this.parambusiType;
                  // 授权机构
                  model.orgIdAuth = _this.paramorgIdAuth;
                  _this.queryFormdata.custType = _this.dashcustType;
                  // 零售
                  if (_this.dashcustType == '1') {
                    _this.url = '/api/governedcust/listper';
                    model.custType = '1';
                    model.queryAll = dashboard.queryAll;
                    model.isAdmitEnter = '1';
                  } else if (_this.dashcustType == '2') {
                    _this.url = '/api/governedcust/listorg';
                    model.custType = '2';
                    model.isAdmitEnter = '1';
                    model.queryAll = dashboard.queryAll;
                  }
                  var param = {
                    condition: JSON.stringify(model)
                  };
                  _this.$refs.reftable.remoteData(param);
                }
              }
            } else {
              _this.$message.error('查询失败');
            }
          }
        });
        // }
        //     } else {
        //       _this.$message.error('查询失败');
        //     }
        //   }
        // });
      },
      methods: {
        /**
        * 查询表单-客户类型切换后重置证件类型、价值等级
        */
        custTpChangeFn: function () {
          this.queryFormdata.certType = '';
          this.queryFormdata.valueLev = '';
        },
        /**
        * 客户查询——搜索按钮
        */
        searchFn: function () {
          var _this = this;

          var validate = false;
          _this.url = '';
          _this.$refs.custSearchForm.validate(function (valid) {
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
          model.userId = yufp.session.userId;
          model.orgCode = yufp.session.org.code;
          model.orgId = _this.paramOrgId;
          // 条线
          model.busiType = _this.parambusiType;
          // 授权机构
          model.orgIdAuth = _this.paramorgIdAuth;
          var param = {
            condition: JSON.stringify(model)
          };
          // 零售
          if (_this.queryFormdata.custType == '1') {
            // if (_this.queryFormdata.isAdmitEnter == '0') {
            //   // 非准入客户处理逻辑
            //   _this.url = '/api/governedcust/listperNoAdmit';
            // } else if (_this.queryFormdata.isAdmitEnter == '1') {
            //   // 准入客户直接调用
            //   _this.url = '/api/governedcust/listper';
            // }
            _this.url = '/api/governedcust/listper';
            _this.custWidth = perWidth;
          } else if (_this.queryFormdata.custType == '2') {
            // if (_this.queryFormdata.isAdmitEnter == '0') {
            //   // 非准入客户处理逻辑
            //   _this.url = '/api/governedcust/listorgNoAdmit';
            // } else if (_this.queryFormdata.isAdmitEnter == '1') {
            //   // 准入客户直接调用
            //   _this.url = '/api/governedcust/listorg';
            // }
            _this.url = '/api/governedcust/listorg';
            _this.custWidth = orgWidth;
          }
          _this.$nextTick(function () {
            _this.$refs.reftable.remoteData(param);
            ld1.close();
          });
        },
        /**
         * 客户查询——重置按钮
         */
        resetMainFn: function () {
          this.$refs.custSearchForm.resetFields();
        },
        // 打开客户视图的方法
        opencustViewFn: function () {
          var selections = this.$refs.reftable.selections;
          if (selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          // 客户状态为“潜在”，则跳转到潜在客户视图
          if (selections[0].custStatus === 'Q1' || selections[0].custStatus === 'Q2') {
            var customKey = 'custom_view' + selections[0].custId; // 请以custom_view前缀开头，并且全局唯一
            // var routeId = 'custView' + selections[0].custType; // 模板示例->普通查询的路由ID
            var custType = selections[0].custType;
            yufp.frame.addTab({
              // id: custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView', // 菜单功能ID（路由ID）
              id: 'customer360View', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户360视图:' + selections[0].custName, // 页签名称
              data: {
                id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
                cust: selections[0],
                custId: selections[0].custId,
                custName: selections[0].custName
              } // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              // routeId: custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView', // 对公, // 菜单功能ID（路由ID）
              routeId: 'customer360View', // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的key
              title: '客户360视图:' + selections[0].custName, // 页签名称
              data: {
                id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
                cust: selections[0],
                custId: selections[0].custId,
                custName: selections[0].custName
              } // 传递的业务数据，可选配置
            });
            return;
          } else if (selections[0].powerLev === '1' || selections[0].powerLev === '2' ||
            selections[0].powerLev === '3' || selections[0].powerLev === '4') {
            var customKey = 'custom_view' + selections[0].custId; // 请以custom_view前缀开头，并且全局唯一
            var custType = selections[0].custType;
            yufp.frame.addTab({
              id: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户360视图:' + selections[0].custName, // 页签名称
              data: {
                id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
                cust: selections[0],
                custId: selections[0].custId,
                custName: selections[0].custName
              } // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              // routeId: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 对公, // 菜单功能ID（路由ID）
              routeId: 'customer360View', // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的
              title: '客户360视图:' + selections[0].custName, // 页签名称
              data: {
                id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
                cust: selections[0],
                custId: selections[0].custId,
                custName: selections[0].custName
              } // 传递的业务数据，可选配置
            });
          }

          // if (selections[0].custType == '1') {
          //   // 如果客户类型是“个人”
          //   yufp.frame.addTab({
          //     id: 'personalCustView', // 菜单功能ID（路由ID）
          //     key: 'personalCustView', // 自定义唯一页签key
          //     title: '零售客户视图', // 页签名称
          //     data: {id: 'f38c540fa3a842f1a9bebe5fbe881dda'}
          //   });
          //   // 在打开tab页后，刷新页签
          //   // 刷新页签
          //   yufp.frame.refreshTab({
          //     routeId: 'personalCustView', // 菜单功能ID（路由ID）
          //     menuId: 'personalCustView', // 菜单ID，同addTab方法中的
          //     data: {id: 'f38c540fa3a842f1a9bebe5fbe881dda'} // 传递的业务数据，可选配置
          //   });
          // } else if (selections[0].custType == '2') {
          //   // 如果客户类型是“对公”
          //   yufp.frame.addTab({
          //     id: 'publicStanCustView', // 菜单功能ID（路由ID）
          //     key: 'publicStanCustView', // 自定义唯一页签key
          //     title: '对公客户视图', // 页签名称
          //     data: {id: '1510d10391f64514b833c0d12d39a824'}
          //   });
          //   // 在打开tab页后，刷新页签
          //   // 刷新页签
          //   yufp.frame.refreshTab({
          //     routeId: 'publicStanCustView', // 菜单功能ID（路由ID）
          //     menuId: 'publicStanCustView', // 菜单ID，同addTab方法中的
          //     data: {id: '1510d10391f64514b833c0d12d39a824'}// 传递的业务数据，可选配置
          //   });
        },
        rowDblclickFn: function (row, event) {
          // var customKey = 'custom_view' + row.custName; // 请以custom_view前缀开头，并且全局唯一
          // var routeId = 'custView' + row.custType; // 模板示例->普通查询的路由ID
          // yufp.frame.addTab({
          //   id: routeId, // 菜单功能ID（路由ID）
          //   key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
          //   title: '客户视图:' + row.custName, // 页签名称
          //   data: { cust: row } // 传递的业务数据，可选配置
          // });
          // var _this = this;
          // _this.opencustViewFn();
          // var selections = this.$refs.reftable.selections;
          // if (selections.length != 1) {
          //   this.$message({ message: '请先选择一条记录', type: 'warning' });
          //   return;
          // }
          // 客户状态为“潜在”，则跳转到潜在客户视图
          if (row.custStatus === 'Q1' || row.custStatus === 'Q2') {
            var customKey = 'custom_view' + row.custId; // 请以custom_view前缀开头，并且全局唯一
            // var routeId = 'custView' + selections[0].custType; // 模板示例->普通查询的路由ID
            var custType = row.custType;
            yufp.frame.addTab({
              // id: custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView', // 菜单功能ID（路由ID）
              id: 'customer360View', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户360视图:' + row.custName, // 页签名称
              data: {
                id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
                cust: row,
                custId: row.custId,
                custName: row.custName
              } // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              // routeId: custType == '1' ? 'personalPotentialCustView' : 'publicPotentialCustView', // 对公, // 菜单功能ID（路由ID）
              routeId: 'customer360View', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的key
              title: '客户360视图:' + row.custName, // 页签名称
              data: {
                id: custType == '1' ? '87ad23b67f1f4d12b927b1230563aeda' : 'b57629a38b34450e89717c4db1661e01', // 对公
                cust: row,
                custId: row.custId,
                custName: row.custName
              } // 传递的业务数据，可选配置
            });
            return;
          } else if (row.powerLev === '1' || row.powerLev === '2' ||
            row.powerLev === '3' || row.powerLev === '4') {
            var customKey = 'custom_view' + row.custId; // 请以custom_view前缀开头，并且全局唯一
            var custType = row.custType;
            yufp.frame.addTab({
              // id: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 菜单功能ID（路由ID）
              id: 'customer360View', // 菜单功能ID（路由ID）
              key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
              title: '客户360视图:' + row.custName, // 页签名称
              data: {
                id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
                cust: row,
                custId: row.custId,
                custName: row.custName
              } // 传递的业务数据，可选配置
            });
            yufp.frame.refreshTab({
              // routeId: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 对公, // 菜单功能ID（路由ID）
              routeId: 'customer360View', // 对公, // 菜单功能ID（路由ID）
              menuId: customKey, // 菜单ID，同addTab方法中的
              title: '客户360视图:' + row.custName, // 页签名称
              data: {
                id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
                cust: row,
                custId: row.custId,
                custName: row.custName
              } // 传递的业务数据，可选配置
            });
          }
        },
        /**
         * 加入客户群——取消
         */
        cancelFn: function () {
          var _this = this;
          _this.custgroupvisible = false;
        },
        /**
         * 点击“加入客户群”按钮执行
         */
        joinGroup: function () {
          var _this = this;
          var custIds = '';
          var selections = _this.$refs.reftable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
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
          custids = custIds;
          _this.custgroupvisible = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
          });
        },
        /**
        * 选择客户群后执行
        */
        selectGroupFn: function (data) {
          this.formdata.groupMemberType = data.groupMemberType;
        },
        /**
         * 新建客户群表单——取消
         */
        custGroupCancelFn: function () {
          var _this = this;
          _this.addCustGroupDialogVisible = false;
        },
        /**
         * 新建客户群表单——保存
         */
        custGroupSaveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.custGroupformdata, model);
          var validate = false;
          _this.$refs.addCustGrouprefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var custSelections = _this.$refs.reftable.selections;
          var custsAry = [];
          for (var i = 0, len = custSelections.length; i < len; i++) {
            custsAry.push(custSelections[i].custId);
          }
          model.createOrgan = yufp.session.org.name;
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: '/api/ocrmfcicgbase/add',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0 && response.data) {
                // 将选择的客户添加到客户群
                var joingroups = {
                  condition: JSON.stringify({
                    custGroupNo: response.data.custGroupId,
                    custId: custsAry.join(','),
                    custMemberType: response.data.custMemberType
                  })
                };
                yufp.service.request({
                  method: 'POST',
                  url: '/api/ocrmfcicgmember/joingroup',
                  data: joingroups,
                  callback: function (code, message, response) {
                    if (code == 0 && response.code === 0) {
                      _this.$refs.reftable.remoteData();
                      _this.addCustGroupDialogVisible = false;
                      _this.$message('操作成功');
                    } else {
                      _this.$message('操作失败');
                    }
                  }
                });
              } else {
                _this.$message(response.message);
              }
            }
          });
        },
        /** 标签树单击事件 */
        nodeClickFn: function (nodeData, node, self) {
          // if(node.isLeaf){
          this.addTabInfoFn(nodeData);
          // }
        },
        nodeClickFnofset: function (nodeData, node, self) {
          //        if(node.isLeaf){
          this.addTabInfoFnofset(nodeData);
          //        }
        },
        // 设置标签取消按钮
        detailResetRule: function () {
          this.dialogTagForm = false;
          this.setselectList = [];
          this.settinglist = [];
          this.setlist = [];
          this.custtagList = [];
          vm.tagTemp.definedTag = '';
        },
        // 关闭按钮
        dialogClose: function () {
          this.setselectList = [];
          this.settinglist = [];
          this.setlist = [];
          this.custtagList = [];
          vm.tagTemp.definedTag = '';
        },
        // 设置标签提交
        settingSubFn: function () {
          var me = this;
          var definedTag = vm.tagTemp.definedTag;// 自定义标签
          console.log('me.setlist==' + JSON.stringify(me.setlist));
          var tagsmodel = new Object();
          tagsmodel.custId = me.$refs.reftable.selections[0].custId;// 客户编号
          var tagNos = me.setlist.join(',').toString();
          tagsmodel.tagNo = tagNos;
          console.log('tagNos==' + tagsmodel.tagNo);
          // 标签库更新标签
          yufp.service.request({
            method: 'POST',
            data: tagsmodel,
            url: backend.custpubService + '/api/cimftagcusttags/updateTags',
            callback: function (code, message, response) {
              if (code == 0) {
                if (definedTag != '') {
                  me.adddefinedTag(definedTag);
                } else {
                  if (response.code == 0) {
                    vm.$message({ message: '设置标签成功', type: 'info' });
                    vm.dialogTagForm = false;
                  } else {
                    vm.$message({ message: response.message, type: 'warning' });
                    vm.dialogTagForm = false;
                  }
                }
              } else {
                vm.$message({ message: '操作失败', type: 'warning' });
                vm.dialogTagForm = false;
              }
            }
          });
        },
        /** 设置标签中添加查询标签 */
        addTabInfoFnofset: function (node) {
          var _set = this;
          if (node) {
            var dataList = {};
            dataList.name = node.groupName;
            dataList.id = node.groupNo;
            var flag = false;// 判断是否已经添加
            for (var i = 0; i < _set.settinglist.length; i++) {
              if (_set.settinglist[i].id == node.groupNo) {
                flag = true;
                break;
              }
            }
            if (!flag) {
              var param = { condition: JSON.stringify({ groupNo: node.groupNo }) };
              // 获取分组下的标签
              yufp.service.request({
                method: 'GET',
                data: param,
                url: backend.custpubService + '/api/cimfmmtagtagsinfo/getTagByGroupNo',
                callback: function (code, message, response) {
                  if (code === 0) {
                    var instu = response.data;
                    var tags = [];
                    for (var i = 0; i < instu.length; i++) {
                      var info = {};
                      info.name = instu[i].tagName;
                      info.id = instu[i].tagNo;
                      info.processMode = instu[i].processMode;
                      info.tagLifecycle = instu[i].tagLifecycle;
                      info.groupNo = instu[i].groupNo;
                      info.state = true;
                      tags.push(info);
                    }
                    dataList.stu = tags;
                    if (tags.length > 0) { // 当有分组有标签的时候才添加到右侧
                      _set.settinglist.push(dataList);
                    }
                  }
                }
              });
              console.log('settinglist==' + JSON.stringify(_set.settinglist));
            }
          }
        },
        // 设置标签 点击标签增加到您已经选择区域
        addsetTabQuryFn: function (info, infoindex, index) {
          var me = this;
          // 判断如果加工方式是统计或者挖掘 那么属于自动标签 就不允许操作添加
          if (info.processMode == 'MINING' || info.processMode == 'STATISTICS') {
            me.$message({ message: '不允许操作统计或者挖掘方式的标签！', type: 'warning' });
            return false;
          }
          // 判断非执行中状态的标签不允许操作添加
          if (info.tagLifecycle != 'RUNNING') {
            me.$message({ message: '不允许操作非执行中状态的标签！', type: 'warning' });
            return false;
          }
          if (info.groupNo != '1705') {
            // 判断是否为总行 总行不限制权限问题
            var orgparam = {
              condition: JSON.stringify({
                id: yufp.session.org.id
              })
            };
            yufp.service.request({
              method: 'POST',
              url: backend.custpubService + '/api/cimfmmtagtagsinfo/getorglevel',
              data: orgparam,
              callback: function (code, message, response) {
                if (code == 0) {
                  var json = response.data;
                  me.orgLevel = json.orgLevel;
                  if (me.orgLevel > '2') { // 不是总行
                    // 判断非自定义标签权限问题
                    var model = new Object();
                    model.instu = vm.instuCode;
                    model.org = vm.orgId;
                    model.user = vm.userId;
                    model.roles = new Array();
                    for (var i = 0; i < vm.roles.length; i++) {
                      model.roles[i] = vm.roles[i].code;
                    };
                    model.tagNo = info.id;
                    var param = {
                      condition: JSON.stringify(model)
                    };
                    yufp.service.request({
                      method: 'GET',
                      data: param,
                      url: backend.custpubService + '/api/cimftagcusttags/getAuthData',
                      callback: function (code, message, response) {
                        if (code === 0) {
                          if (response.data.length == 0) {
                            me.$message({ message: '没有权限不允许操作！', type: 'warning' });
                            return false;
                          } else {
                            var flag = false;// 条件中是否已经存在
                            // 添加到已选择标签
                            for (var j = 0; j < me.setselectList.length; j++) {
                              if (me.setselectList[j].id == info.id) {
                                info.state = true;
                                me.setselectList.splice(j, 1);
                                me.setlist.splice(j, 1);
                                flag = true;
                                break;
                              }
                            }
                            if (!flag) {
                              info.state = false;
                              info.prototypeindex = index;
                              info.index = infoindex;
                              me.setselectList.push(info);
                              // 拼接标签tagno给此客户新增标签
                              me.setlist.push(info.id);
                              console.log('treeme.setselectList==' + JSON.stringify(me.setselectList));
                            }
                          }
                        }
                      }
                    });
                    // 判断权限问题
                  } else {
                    var flag = false;// 条件中是否已经存在
                    // 添加到已选择标签
                    for (var j = 0; j < me.setselectList.length; j++) {
                      if (me.setselectList[j].id == info.id) {
                        info.state = true;
                        me.setselectList.splice(j, 1);
                        me.setlist.splice(j, 1);
                        flag = true;
                        break;
                      }
                    }
                    if (!flag) {
                      info.state = false;
                      info.prototypeindex = index;
                      info.index = infoindex;
                      me.setselectList.push(info);
                      // 拼接标签tagno给此客户新增标签
                      me.setlist.push(info.id);
                      console.log('treeme.setselectList==' + JSON.stringify(me.setselectList));
                    }
                  }
                }
              }
            });
          } else {
            var flag = false;// 条件中是否已经存在
            // 添加到已选择标签
            for (var j = 0; j < me.setselectList.length; j++) {
              if (me.setselectList[j].id == info.id) {
                info.state = true;
                me.setselectList.splice(j, 1);
                me.setlist.splice(j, 1);
                flag = true;
                break;
              }
            }
            if (!flag) {
              info.state = false;
              info.prototypeindex = index;
              info.index = infoindex;
              me.setselectList.push(info);
              // 拼接标签tagno给此客户新增标签
              me.setlist.push(info.id);
              console.log('treeme.setselectList==' + JSON.stringify(me.setselectList));
            }
          }
        },
        /** 设置标签删除选中的标签 */
        deleteSeTagFnofset: function (tag) {
          var me = this;
          // 判断如果加工方式是统计或者挖掘 那么属于自动标签 就不允许操作添加
          if (tag.processMode == 'MINING' || tag.processMode == 'STATISTICS') {
            me.$message({ message: '不允许操作统计或者挖掘方式的标签！', type: 'warning' });
            return false;
          }
          if (tag.groupNo != '1705') {
            // 判断是否为总行
            var orgparam = {
              condition: JSON.stringify({
                id: yufp.session.org.id
              })
            };
            yufp.service.request({
              method: 'POST',
              url: backend.custpubService + '/api/cimfmmtagtagsinfo/getorglevel',
              data: orgparam,
              callback: function (code, message, response) {
                if (code == 0) {
                  var json = response.data;

                  me.orgLevel = json.orgLevel;
                  if (me.orgLevel > '2') { // 不是总行
                    // 判断非自定义标签权限问题
                    var model = new Object();
                    model.instu = vm.instuCode;
                    model.org = vm.orgId;
                    model.user = vm.userId;
                    model.roles = new Array();
                    for (var i = 0; i < vm.roles.length; i++) {
                      model.roles[i] = vm.roles[i].code;
                    };
                    model.tagNo = tag.id;
                    var param = {
                      condition: JSON.stringify(model)
                    };
                    yufp.service.request({
                      method: 'GET',
                      data: param,
                      url: backend.custpubService + '/api/cimftagcusttags/getAuthData',
                      callback: function (code, message, response) {
                        if (code === 0) {
                          if (response.data.length == 0) {
                            me.$message({ message: '没有权限不允许操作！', type: 'warning' });
                            return false;
                          } else {
                            console.log('shit11==' + JSON.stringify(tag));
                            var f = 0;
                            for (var i = 0; i < me.setselectList.length; i++) {
                              if (me.setselectList[i].id == tag.id) {
                                f = i;
                                break;
                              }
                            }
                            for (var i = 0; i < me.setlist.length; i++) {
                              if (me.setlist[i].id == tag.id) {
                                f = i;
                                break;
                              }
                            }
                            me.setlist.splice(f, 1);
                            me.setselectList.splice(f, 1);
                            console.log('333====' + JSON.stringify(me.settinglist[tag.prototypeindex]));

                            me.settinglist[tag.prototypeindex].stu[tag.index].state = true;
                          }
                        }
                      }
                    });
                  } else { // 是总行
                    var f = 0;
                    for (var i = 0; i < me.setselectList.length; i++) {
                      if (me.setselectList[i].id == tag.id) {
                        f = i;
                        break;
                      }
                    }
                    for (var i = 0; i < me.setlist.length; i++) {
                      if (me.setlist[i].id == tag.id) {
                        f = i;
                        break;
                      }
                    }
                    me.setlist.splice(f, 1);
                    me.setselectList.splice(f, 1);
                    me.settinglist[tag.prototypeindex].stu[tag.index].state = true;
                  }
                }
              }
            });
          } else {
            var f = 0;
            for (var i = 0; i < me.setselectList.length; i++) {
              if (me.setselectList[i].id == tag.id) {
                f = i;
                break;
              }
            }
            for (var i = 0; i < me.setlist.length; i++) {
              if (me.setlist[i].id == tag.id) {
                f = i;
                break;
              }
            }
            me.setlist.splice(f, 1);
            me.setselectList.splice(f, 1);
            me.settinglist[tag.prototypeindex].stu[tag.index].state = true;
          }
        },
        /**
         * 加入客户群——保存
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
          // 如果“加入群”选择的是 “加入已创建”
          if (model.addType == '1') {
            var custSelections = _this.$refs.reftable.selections;
            var custsAry = [];
            for (var i = 0, len = custSelections.length; i < len; i++) {
              custsAry.push(custSelections[i].custId);
            }
            var joingroups = {
              condition: JSON.stringify({
                custGroupNo: model.custGroupId,
                custId: custsAry.join(','),
                custMemberType: model.groupMemberType
              })
            };
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: '/api/ocrmfcicgmember/joingroup',
              data: joingroups,
              callback: function (code, message, response) {
                if (code == 0 && response.code === 0) {
                  _this.$refs.reftable.remoteData();
                  _this.$message('操作成功');
                  _this.custgroupvisible = false;
                } else {
                  _this.$message.error('操作失败');
                }
              }
            });
          } else if (model.addType == '2') {
            // 加入群方式为“新建群”
            _this.addCustGroupDialogVisible = true;
            _this.$nextTick(function () {
              _this.$refs.addCustGrouprefForm.resetFields();
              _this.custgroupvisible = false;
              // 设置客户来源为“手动添加”
              _this.custGroupformdata.custOrigin = '1';
            });
          }
        },
        /**
         * 客户群表单——重置
         */
        resetFn: function () {
          yufp.clone({}, this.formdata);
        },
        /**
         * 设为我的关注客户——打开关注类型选择
         */
        setMyAttentionCustFn: function () {
          var _this = this;
          var selections = _this.$refs.reftable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请选择至少一条记录', type: 'warning' });
            return;
          }
          _this.attentTypevisible = true;
          _this.$nextTick(function () {
            _this.$refs.attentFormRef.resetFields();
          });
        },
        /**
        * 设置为我的关注客户——保存
        */
        saveMyAttentionCustFn: function () {
          var _this = this;
          var selections = _this.$refs.reftable.selections;
          var custIdarr = [];
          for (var i = 0, len = selections.length; i < len; i++) {
            custIdarr.push(selections[i].custId);
          }
          // 获取关注类型
          var attentType = _this.attentFormdata.attentType;
          _this.$confirm('设置为我的关注客户?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                _this.attentTypevisible = false;
                _this.$refs.reftable.remoteData();
                yufp.service.request({
                  method: 'POST',
                  url: '/api/ocrmfciattencust/join',
                  data: {
                    condition: JSON.stringify({
                      custIds: custIdarr.join(','),
                      attentType: attentType,
                      userId: yufp.session.userId
                    })
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.code === 0) {
                      _this.$message('操作成功');
                    } else {
                      _this.$message.error('操作失败');
                    }
                  }
                });
              }
            }
          });
        }

        // 打开对公客户图谱视图
        // openCompanyCustomersGraphical: function () {
        //   if (this.$refs.reftable.selections.length != 1) {
        //     this.$message({ message: '请先选择一条记录', type: 'warning' });
        //     return;
        //   }
        //   var customKey = 'custom_' + this.$refs.reftable.selections[0].custName; // 请以custom_前缀开头，并且全局唯一
        //   var routeId = 'companyCustomersGraphical'; // 模板示例->普通查询的路由ID
        //   yufp.frame.addTab({
        //     id: routeId, // 菜单功能ID（路由ID）
        //     key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
        //     title: '图谱视图:' + this.$refs.reftable.selections[0].custName, // 页签名称
        //     data: { cust: this.$refs.reftable.selections[0] } // 传递的业务数据，可选配置
        //   });
        // },
        // 打开零售客户图谱视图
        // openPersonalCustomersGraphical: function () {
        //   if (this.$refs.reftable.selections.length != 1) {
        //     this.$message({ message: '请先选择一条记录', type: 'warning' });
        //     return;
        //   }
        //   var customKey = 'custom_' + this.$refs.reftable.selections[0].custName; // 请以custom_前缀开头，并且全局唯一
        //   var routeId = 'personalCustomersGraphical'; // 模板示例->普通查询的路由ID
        //   yufp.frame.addTab({
        //     id: routeId, // 菜单功能ID（路由ID）
        //     key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
        //     title: '图谱视图:' + this.$refs.reftable.selections[0].custName, // 页签名称
        //     data: { custId: this.$refs.reftable.selections[0].custId } // 传递的业务数据，可选配置
        //   });
        // }
      }
    });
  };
});