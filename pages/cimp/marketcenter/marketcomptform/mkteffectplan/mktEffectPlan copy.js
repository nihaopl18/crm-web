/**
 * @created by zhuly6 on 2018/11/16.
 * @description 营销组件FORM表单-分析组件-营销成效指标策划
 */
define([
  './custom/widgets/js/yufpCmSelector.js',
  './custom/widgets/js/yufpTargetSelector.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE', 'ASSEMBLY_OBJ_TYPE');
    yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        var _self = this;
        return {
          activeNames: ['1', '2', '3'],
          dialogVisibleAdd: false,
          currentRow: null,
          queryFields: [
            //选择栏
            { placeholder: '对象类型', field: 'distributionType', type: 'select', dataCode: 'ASSEMBLY_OBJ_TYPE' }
          ],
          queryButtons: [],
          customersColumns: [
            { label: '客户ID', prop: 'custId', width: '80', hidden: true },
            { label: '客户名称', prop: 'custName', width: '100' },
            { label: '客户类型', prop: 'custType', width: '100', dataCode: 'CUST_TYPE', resizable: true },
            { label: '客户状态', prop: 'custStat', width: '100', dataCode: 'CUST_STAT', resizable: true },
            { label: '证件类型', prop: 'identType', dataCode: 'IDENT_TYPE', resizable: true },
            { label: '证件号码', prop: 'identNo', resizable: true },
            { label: '归属机构', prop: 'belongOrg', resizable: true },
            { label: '归属客户经理', prop: 'belongMgr', resizable: true }
          ],
          // 营销成效指标维护表格栏位
          tableColumnsTarget: [
            { label: '指标状态', prop: 'targetState', width: '100', dataCode: 'START_DATE' },
            { label: '产品编号', prop: 'productId', wigth: '100' },
            { label: '指标标号', prop: 'targetId', width: '100' },
            { label: '指标名称', prop: 'targetName', width: '150' },
            { label: '指标描述', prop: 'targetDesc', width: '200' },
            { label: '统计频率', prop: 'checkFreq', width: '100', dataCode: 'CHECK_FREQ' },
            { label: '生效日期', prop: 'startDate', width: '100' },
            { label: '失效日期', prop: 'endDate', width: '100' },
            { label: '最近维护人', prop: 'lastUpdateUserName', width: '100' },
            { label: '最近维护机构', prop: 'orgName', width: '100' },
            { label: '最近维护日期', prop: 'lastUpdataDate', width: '100' }
          ],
          productColumns: [
            { label: '产品编号', prop: 'productId', width: '100' },
            { label: '产品名称', prop: 'prodName', width: '200' },
            { label: '产品分类名称', prop: 'catlName', width: '120' },
            { label: '币种', prop: 'money', width: '80' },
            { label: '产品发布日期', prop: 'prodStartDate', width: '160' },
            { label: '产品截止日期', prop: 'prodEndDate', width: '160' },
            { label: '利率（%）', prop: 'rate', width: '120' },
            { label: '费率（%）', prop: 'costRate', width: '120' },
            { label: '期限', prop: 'limitTime', width: '80' },
            { label: '目标客户描述', prop: 'objCustDisc', width: '200' },
            { label: '产品特点', prop: 'prodCharact', width: '200' },
            { label: '风险等级', prop: 'riskLevel', width: '100', dataCode: 'RISK-LEVEL' },
            { label: '风险提示描述', prop: 'dangerDisc', width: '200' },
            { label: '担保要求描述', prop: 'assureDisc', width: '200' },
            { label: '产品描述', prop: 'prodDesc', width: '200' },
            { label: '其他说明', prop: 'otherInfo', width: '200' }
          ],
          channelColumns: [
            { label: '渠道组件名称', prop: 'nodeName', width: '250' }
          ],
          updateFieldsAdd: {
            fields: [
              {
                columnCount: 2,
                fields: [{
                  field: '',
                  label: '类型'
                }, {
                  field: '',
                  label: '指标初期值1'
                }, {
                  field: '',
                  label: '指标目标值1'
                },
                {
                  field: '',
                  label: '指标初期值2'
                }, {
                  field: '',
                  label: '指标目标值2'
                }]
              }
            ],
            addButtons: [{
              label: '保存',
              op: 'submit',
              type: 'primary',
              icon: 'check',
              click: function (model, valid) { }

            }, {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo',
              click: function (model, valid) {
                _self.dialogVisibleAdd = false;
              }

            }]
          },
          Url: undefined,
          cUrl: backend.adminService + '/api/indexplan/custquery',
          pUrl: backend.adminService + '/api/indexplan/proquery',
          uUrl: backend.adminService + '/api/indexplan/chaquery',
          tabName: 'customer',
          tableColumns: [],
          addColumns: [],
          par: '',
          tabdata: [],
          map: {},
          delList: [],
          delRow: '',
          orgData: [],
          customerData: [],
          chaList: [],
          target: 'true',
          targetDialogVisible: false

        };
      },
      created: function () {
        var _this = this;
        var nodeId = _this.$options.ncmpobj.instanceObj.flowId;
        var chabox = [];
        yufp.service.request({
          method: 'post',
          // async: false,
          //查询流程中渠道信息,展示到前端页面 渠道当中
          url: backend.adminService + '/api/indexplan/chabox?nodeId=' + nodeId,
          callback: function (code, message, response) {
            if (code == 0) {
              var chaData = response.data;
              if (chaData.length > 0) {
                for (var index = 0; index < chaData.length; index++) {
                  var map = {};
                  var element = chaData[index];
                  map['key'] = element.nodeId;
                  map.value = element.nodeName;
                  chabox.push(map);
                  _this.chaList.push(map);
                }
                yufp.clone({ 'chaList': chabox }, yufp.lookup.lookupMgr);
              }
            }
          }
        });

        yufp.service.request({
          method: 'post',
          async: false,
          url: backend.adminService + '/api/indexplan/proIndexList?nodeId=' + nodeId,
          // data: prdId,
          callback: function (code, message, response) {
            if (code == 0 && response.data.length > 0) {
              var s = _this.tree(response.data);
              _this.tableColumns.push({ label: '对象类型', prop: 'objType', width: 110, headerAlign: 'center', dataCode: 'ASSEMBLY_OBJ_TYPE' });
              _this.tableColumns.push({
                label: '对象名称',
                prop: 'objId',
                width: 110,
                headerAlign: 'center',
                ctype: 'input',
                dataCode: '',
                formatter: function name(row, column, cellValue) {
                  if (row.objType == '02') {
                    for (var index = 0; index < _this.orgData.length; index++) {
                      var s = _this.orgData[index];
                      if (s.orgCode == cellValue) {
                        return s.orgName;
                      }
                    }
                  } else if (row.objType == '01') {
                    for (var index = 0; index < _this.customerData.length; index++) {
                      var s = _this.customerData[index];
                      if (s.loginCode == cellValue) {
                        return s.userName;
                      }
                    }
                  } else if (row.objType == '03') {
                    for (var index = 0; index < _this.chaList.length; index++) {
                      var s = _this.chaList[index];
                      if (s.key == cellValue) {
                        return s.value;
                      }
                    }
                  }
                }
              });
              for (var i = 0; i < s.length; i++) {
                //console.log("s[" + i + "]:" + s[i]);
                _this.tableColumns.push(s[i]);
              }

              _this.addColumns = _this.tableColumns;

              var p = [];
              for (var d = 0; d < response.data.length; d++) {
                var element = response.data[d];
                if (element.index) {
                  for (var f = 0; f < element.index.length; f++) {
                    var tar = element.index[f];
                    _this.map = {
                      productId: tar.productId,
                      targetId: tar.targetId
                    };
                    p.push(_this.map);
                  }
                } else {
                  _this.target = 'false';
                }
              }
              _this.par = p;
            }
          }
        });
        // 查询前面流程中属于客户筛选、产品筛选、渠道的组件nodeID
      },
      mounted: function () {
        var _this = this;
        var nodId = _this.$options.ncmpobj.instanceObj.nodeId;
        var flowId = _this.$options.ncmpobj.instanceObj.flowId;
        _this.Url = backend.adminService + '/api/indexplan/targetquery';
        if (_this.$options.ncmpobj.instanceObj.nodeId && _this.$options.ncmpobj.instanceObj.nodeId != '') {
          _this.par.nodeId = nodId;
          if (this.target == 'true') {
            var param = { condition: JSON.stringify({ name: _this.par, nodeId: nodId }) };
            // console.log("name:" + _this.par + "--------" + "nodeId:" + nodId)
            _this.$nextTick(function () {
              _this.$refs.reftable.remoteData(param);
            });
          }
          var paramCust = { condition: JSON.stringify({ flowId: flowId }) };
          _this.$nextTick(function () {
            // _this.$refs.custreftable.remoteData(paramCust);
            // _this.$refs.proreftable.remoteData(paramCust);
            // _this.$refs.qreftable.remoteData(paramCust);
          });
        }

        yufp.service.request({
          method: 'GET',
          // async: false,
          //查询机构信息
          url: backend.adminService + '/api/indexplan/orgquery',
          callback: function (code, message, response) {
            if (code == 0) {
              _this.orgData = response.data;
            }
          }
        });
        yufp.service.request({
          method: 'GET',
          // async: false,
          //查询客户经理信息
          url: backend.adminService + '/api/indexplan/customerquery',
          callback: function (code, message, response) {
            if (code == 0) {
              _this.customerData = response.data;
            }
          }
        });
      },
      methods: {
        //添加指标
        addTargetFn: function () {
          this.targetDialogVisible = true;
        },
        cancelFn: function () {
          // console.log(1231321);
          this.targetDialogVisible = false;
        },
        confirmFn: function () {
          var me = this;
          var data = this.$refs.reftableTarget.selections;
          if (data.length == 0) {
            this.$message('请至少选择一条数据!', '提示');
            return false;
          }
          if (data.length > 1) {
            this.$message('你只能选择一条数据!', '提示');
            return;
          }
          //var key = Object.keys(data);
          //console.log("key:" + key)
          this.targetDialogVisible = false;
        },
        tree: function (a) {
          var arr = [];
          for (var i = 0; i < a.length; i++) {
            var element = a[i];
            var dt;
            if (element.index && element.index.length > 0) {
              var x = this.tree(element.index);
              dt = { label: this.choiceName(element), prop: this.choiceProp(element), width: 110, ctype: 'input', headerAlign: 'center', children: x };
            } else {
              dt = {
                label: this.choiceName(element),
                prop: this.choiceId(element),
                width: 110,
                headerAlign: 'center',
                children: [
                  { label: '期初值', prop: 'sta_' + this.choiceProp(element), width: 110, ctype: 'input' },
                  { label: '目标值', prop: 'tar_' + this.choiceProp(element), width: 110, ctype: 'input' }
                ]
              };
            }
            arr.push(dt);
          }
          return arr;
        },
        // tree: function (a) {
        //   //a=response.data
        //   var arr = [];
        //   for (var i = 0; i < a.length; i++) {
        //     var element = a[i];
        //     var dt;
        //     if (element.index && element.index.length > 0) {
        //       var x = this.tree(element.index);
        //       dt = { label: this.choiceName(element), prop: this.choiceProp(element), width: 110, ctype: 'input', headerAlign: 'center', children: x };
        //       //dt = {label:};
        //     } else {
        //       dt = {
        //         label: this.choiceName(element),
        //         prop: this.choiceId(element),
        //         width: 110,
        //         headerAlign: 'center',
        //         children: [
        //           { label: '期初值', prop: 'sta_' + this.choiceProp(element), width: 110, ctype: 'input' },
        //           { label: '目标值', prop: 'tar_' + this.choiceProp(element), width: 110, ctype: 'input' }
        //         ]
        //       };
        //     }
        //     arr.push(dt);
        //   }
        //   return arr;
        // },
        choiceName: function (arr) {
          if (arr.prodName) {
            return arr.prodName;
          } else if (arr.targetName) {
            return arr.targetName;
          } else {
            return '';
          }
        },
        choiceId: function (arr) {
          if (arr.prodName) {
            return arr.productId;
          } else if (arr.targetName) {
            return arr.targetId;
          } else {
            return '';
          }
        },
        choiceProp: function (arr) {
          if (arr.prodName) {
            return arr.productId;
          } else if (arr.targetName) {
            var s = arr.productId + '_' + arr.targetId;
            var a = s.split('_');
            var o = a[0].slice(0, 1).toUpperCase() + a[0].slice(1);
            for (var i = 1; i < a.length; i++) {
              o = o + '_' + a[i].slice(0, 1).toUpperCase() + a[i].slice(1);
            }
            return o;
          } else {
            return '';
          }
        },
        addFn: function () {
          var _self = this;
          var col = _self.tableColumns;
          //tableColumns
          // for (let i = 0; i < col.length; i++) {
          //   console.log("col[" + i + "]:" + col[i]);
          // }
          this.$refs.refFormQ.fm.distributionType;
          var objType = this.$refs.refFormQ.fm.distributionType;
          //console.log("obj:" + objType);
          if (!objType || objType == '') {
            _self.$message('请选择对象类型！');
            return;
          }
          var map = {};
          for (var i = 0; i < col.length; i++) {
            var element = col[i];
            //元素
            //console.log("element[" + i + "]:" + element);
            if (element.children && element.children.length > 0) {
              //console.log("element.children:" + element.children);
              for (var d = 0; d < element.children.length; d++) {
                var index = element.children[d];
                //console.log("index:" + index);
                for (var f = 0; f < index.length; f++) {
                  var chi = index[f];
                  if (chi.prop == 'objType') {
                    if (objType == '01') {
                      //元素类型
                      chi.ctype = 'yufp-cm-selector';
                    } else if (objType == '02') {
                      chi.ctype = 'yufp-org-tree';
                    } else if (objType == '03') {

                    }
                  }
                  //console.log("chi.prop:" + chi.prop);
                  map[chi.prop] = '';
                }
              }
            } else {
              //console.log("element.prop:" + element.prop);
              map[element.prop] = '';
            }
          }
          map.objType = objType;
          _self.tabdata.push(map);
          // this.currentRow.edit = true;
        },
        devareFn: function () {
        },
        saveFn: function () {
          var _this = this;
          var proList = [];
          var coul = this.$refs.reftable.tableColumns;
          for (var i = 0; i < coul.length; i++) {
            var currentCol = coul[i];
            if (currentCol.children && currentCol.children.length > 0) {
              for (var s = 0; s < currentCol.children.length; s++) {
                var element = currentCol.children[s];

                var ids = {};
                ids.productId = currentCol.prop;
                ids.targetId = element.prop;
                proList.push(ids);
              }
            }
          }

          var pm = [];
          var map = {};
          var fData = _this.tabdata;
          if (!_this.$options.ncmpobj.instanceObj.nodeId || _this.$options.ncmpobj.instanceObj.nodeId == '') {
            _this.$message('只能在流程中保存数据！');
            return;
          }
          var nodId = _this.$options.ncmpobj.instanceObj.nodeId;
          pm.push(fData);
          map.tabData = fData;
          map.piId = proList;
          map.nodId = nodId;
          yufp.service.request({
            method: 'post',
            // async:false,
            url: backend.adminService + '/api/indexplan/save',
            data: map,
            piId: proList,
            callback: function (code, message, response) {
              if (code == 0) {
                var param = { condition: JSON.stringify({ name: _this.par, nodeId: nodId }) };
                _this.$nextTick(function () {
                  _this.$refs.reftable.remoteData(param);
                });
                _this.$message('操作成功');
              }
            }
          });
        },
        tabload: function (data) {
          var _this = this;
          _this.tabdata = data;
        },
        clickFn: function name(row, event, column, index) {
          var _this = this;
          _this.delList.push(index);
          _this.delRow = index;
          var s = this.tableColumns;
          var objType = row.objType;
          for (var index = 0; index < s.length; index++) {
            var element = s[index];
            if (element.prop == 'objId') {
              if (objType == '01') {
                s[index].ctype = 'yufp-cm-selector';
                //s[index].ctype = 'yufp-target-selector';
              } else if (objType == '02') {
                s[index].ctype = 'yufp-org-tree';
              } else if (objType == '03') {
                s[index].ctype = 'select';
                s[index].dataCode = 'chaList';
              }
            }
          }
          this.tableColumns = s;
        },
        deleteFn: function (params) {
          var _this = this;
          var s = _this.tabdata;
          _this.tabdata = s.splice(_this.delRow, 2);
          _this.$message('操作成功,点击保存后生效！');
          _this.delRow = '';
        }
      }
    });
  };
});