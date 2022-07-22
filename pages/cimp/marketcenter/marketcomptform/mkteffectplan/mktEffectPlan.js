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
    yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE,ASSEMBLY_OBJ_TYPE');
    yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        var _self = this;
        return {
          tableData: [],
          targetNameList: [],
          activeNames: ['1', '2', '3'],
          dialogVisibleAdd: false,
          currentRow: null,
          Fields: [
            {
              columnCount: 1,
              fields: [
                {
                  field: 'targetName',
                  //label: '增加产品',
                  type: 'custom',
                  is: 'yufp-target-selector',
                  params: { tabCheckbox: true },
                },
              ]
            }
          ],
          queryFields: [
            // {
            //   fields: [
            //     {
            //       field: 'distributionType', label: '对象类型', type: 'radio', dataCode: 'ASSEMBLY_OBJ_TYPE',
            //       rules: [{ required: true, message: '必填项', trigger: 'blur' }]
            //     },
            //   ]
            // }
            //选择栏
            { placeholder: '对象类型', field: 'distributionType', type: 'select', dataCode: 'ASSEMBLY_OBJ_TYPE' }

          ],
          options: [
            { key: '01', value: '客户经理' },
            { key: '02', value: '机构' },
            { key: '03', value: '渠道' }
          ],
          queryButtons: [],
          channelColumns: [
            { label: '渠道组件名称', prop: 'nodeName', width: '250' }
          ],
          Url: backend.adminService + '/api/indexplan/targetquery',
          cUrl: backend.adminService + '/api/indexplan/custquery',
          pUrl: backend.adminService + '/api/indexplan/proquery',
          uUrl: backend.adminService + '/api/indexplan/chaquery',
          tabName: 'customer',
          tableColumns: [
          ],
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
          targetDialogVisible: false,
          index: 1,
          objType: '01',
          dialogVisibleAddTarget: false,
          Buttons: [
            {
              label: '新增', type: 'primary', icon: 'plus', click: function (model) {
                // console.log(Object.entries(model))
                // console.log(Object.keys(model));
                // console.log(Object.values(model));
                var arr = model.targetName.split(',');
                for (var i = 0; i < _self.targetNameList.length; i++) {
                  for (var j = 0; j < arr.length; j++) {
                    if (_self.targetNameList[i] == arr[j]) {
                      _self.$message(arr[j] + "--指标名称重复");
                      return;
                    }
                  }
                }
                for (var i = 0; i < arr.length; i++) {
                  var targetName = arr[i];
                  _self.tableColumns.push(
                    {
                      label: targetName, prop: targetName, width: 110, headerAlign: 'center',
                      renderHeader: function (h, { column, $index }) {

                        return h('span', {}, [
                          column.label,
                          h('yu-button', {
                            'class': 'el-icon-delete',
                            style: {
                              marginLeft: '10px'
                            },
                            attrs: {
                              type: 'text',
                              size: 'mini',
                              'data-index': $index
                            },
                            on: {
                              click: function () {
                                _self.tableColumns.splice($index - 3, 1)
                              }
                            }
                          })
                        ])
                      },
                      children: [
                        { label: '期初值', prop: 'sta' + targetName, width: 110, ctype: 'input', disabled: true },
                        { label: '目标值', prop: 'tar' + targetName, width: 110, ctype: 'input', disabled: false }
                      ],
                    });
                  _self.$refs.refTargetForm.resetFields();
                  _self.dialogVisibleAddTarget = false
                }
              }
            },
            {
              label: '取消', type: 'primary', icon: 'yx-bin', click: function (model) {
                _self.$refs.refTargetForm.resetFields();
                _self.dialogVisibleAddTarget = false
              }
            },
          ],
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
                  map['key'] = element.assemblyId;
                  map.value = element.assemblyName;
                  chabox.push(map);
                  _this.chaList.push(map);
                }
                yufp.clone({ 'chaList': chabox }, yufp.lookup.lookupMgr);
              }
            }
          }
        });

        // 查询前面流程中属于客户筛选、产品筛选、渠道的组件nodeID
      },
      mounted: function () {
        var _this = this;
        var nodeId = _this.$options.ncmpobj.instanceObj.nodeId;
        var flowId = _this.$options.ncmpobj.instanceObj.flowId;
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

        _this.getTableColumnNew(nodeId);
      },
      methods: {
        changeValue: function (lable) {
          this.objType = lable;
        },
        //添加指标
        addTargetFn: function () {
          var _this = this;
          _this.dialogVisibleAddTarget = true;
        },
        cancelFn: function () {
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
          this.targetDialogVisible = false;
        },
        addFn: function () {
          var _self = this;
          var col = _self.tableColumns;
          // this.$refs.refFormQ.fm.distributionType;
          //var objType = this.$refs.refFormQ.fm.distributionType;
          var objType = this.objType;
          if (!objType || objType == '') {
            _self.$message('请选择对象类型！');
            return;
          }
          var map = {};
          for (var i = 0; i < col.length; i++) {
            var element = col[i];
            //元素
            if (element.children && element.children.length > 0) {
              for (var d = 0; d < element.children.length; d++) {
                var index = element.children[d];
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
                  map[chi.prop] = '';
                }
              }
            } else {
              map[element.prop] = '';
            }
          }
          // if (objType == '01') {
          //   map.objType = '客户经理';
          // } else if (objType == '02') {
          //   map.objType = '机构';
          // } else if (objType == '03') {
          //   map.objType = '渠道';
          // }
          map.objType = objType;
          _self.tabdata.push(map);
          // this.currentRow.edit = true;
        },
        devareFn: function () {
        },
        deleteRow: function (index, rows) {
          rows.splice(index, 1);
          // var _this = this;
          // if (_this.$refs.reftable.selections.length != 1) {
          //   _this.$message('请选择一条数据！');
          //   return;
          // }
          // var select = _this.$refs.reftable.selections[0];
          // for (let i = 0; i < _this.tabdata.length; i++) {
          //   if (_this.tabdata[i] == select) {
          //     _this.tabdata.splice(i, 1);
          //   }
          // }
          // for (let i = 0; i < _this.tabdata.length; i++) {
          //   console.log(Object.entries(_this.tabdata[i]))
          // }
          // _this.$message('操作成功,点击保存后生效！');

        },
        getTableColumnNew: function (nodeId) {
          var _this = this;
          //_this.tableColumns.push({ label: '操作', ctype: 'button' })
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
          var param = { condition: JSON.stringify({ nodeId: nodeId }) };

          yufp.service.request({
            async: false, // 异步请求
            url: backend.adminService + '/api/indexplan/targetquery',
            method: 'get',
            data: param,
            callback: function (code, message, response) {
              //反显表头
              var indexDataDto = response.indexDataDto;
              //反显数据
              var objDataListDto = response.objDataListDto;
              //根据sort排序表头
              for (var i = 0; i < indexDataDto.length; i++) {
                for (var j = i + 1; j < indexDataDto.length; j++) {
                  if (indexDataDto[i].sort > indexDataDto[j].sort) {
                    var temp = indexDataDto[i];
                    indexDataDto[i] = indexDataDto[j];
                    indexDataDto[j] = temp;
                  }
                }
              }
              for (var i = 0; i < indexDataDto.length; i++) {
                var targetName = indexDataDto[i].indexName;
                _this.targetNameList.push(targetName)
                _this.tableColumns.push(
                  {
                    label: targetName, prop: targetName, width: 110, headerAlign: 'center',
                    renderHeader: function (h, { column, $index }) {
                      return h('span', {}, [
                        column.label,
                        h('yu-button', {
                          'class': 'el-icon-delete',
                          style: {
                            marginLeft: '10px'
                          },
                          attrs: {
                            type: 'text',
                            size: 'mini',
                            'data-index': $index
                          },
                          on: {
                            click: function () {
                              _this.tableColumns.splice($index - 3, 1)
                            }
                          }
                        })
                      ])
                    },
                    children: [
                      { label: '期初值', prop: 'sta' + targetName, width: 110, ctype: 'input', disabled: true },
                      { label: '目标值', prop: 'tar' + targetName, width: 110, ctype: 'input', disabled: false }
                    ],
                  });
              }
              var objectList = [];
              for (var i = 0; i < objDataListDto.length; i++) {
                var obj = {};
                obj = { objType: objDataListDto[i].objType, objId: objDataListDto[i].objId }
                for (var k = 0; k < indexDataDto.length; k++) {
                  for (var j = 0; j < objDataListDto[i].dataListDto.length; j++) {
                    if (indexDataDto[k].sort == objDataListDto[i].dataListDto[j].sort) {
                      targetName = indexDataDto[k].indexName;
                      var startValue = 'sta' + targetName
                      var targetValue = 'tar' + targetName
                      obj[startValue] = objDataListDto[i].dataListDto[j].initialValue;
                      obj[targetValue] = objDataListDto[i].dataListDto[j].targetValue;

                    }
                  }
                }
                objectList.push(obj);
              }
              _this.tabdata = objectList;
            }
          });
        },

        saveFn: function () {
          var _this = this;
          if (_this.tabdata.length < 1) {
            _this.$message('请填写数据！');
            return;
          }
          for (var i = 0; i < _this.tabdata.length; i++) {
            for (var j = i + 1; j < _this.tabdata.length; j++) {
              if (_this.tabdata[i].objId == _this.tabdata[j].objId) {
                _this.$message('存在重复对象名称！');
                return;
              }
            }
          }
          for (var i = 0; i < _this.tabdata.length; i++) {
            if (_this.tabdata[i].objId == undefined || _this.tabdata[i].objId == null || _this.tabdata[i].objId == '') {
              _this.$message('对象名称不能为空');
              return;
            }
          }
          //获取指标名称
          var coul = _this.tableColumns;
          var indexDataFormList = [];

          for (var i = 2; i < coul.length; i++) {
            var currentCol = coul[i];

            var param = { condition: JSON.stringify({ targetName: currentCol.prop }) };
            var ids = {};
            yufp.service.request({
              async: false, // 异步请求
              url: backend.adminService + '/api/cmfrcprodmarkettarget/queryByTargetName',
              method: 'get',
              data: param,
              callback: function (code, message, response) {
                var redata = response.data;
                ids.targetId = redata[0].targetId;
                ids.sort = '' + (i - 1);
                ids.targetName = currentCol.prop;
                indexDataFormList.push(ids)

              }
            });
          }
          var objectDataFormList = [];
          for (let i = 0; i < _this.tabdata.length; i++) {

            var objData = {};
            var data = [];
            objData.objType = _this.tabdata[i].objType;
            objData.objId = _this.tabdata[i].objId;
            for (let j = 0; j < indexDataFormList.length; j++) {
              var tempdata = {};
              tempdata.sort = indexDataFormList[j].sort;
              var stringStar = 'sta' + indexDataFormList[j].targetName;
              var stringTar = 'tar' + indexDataFormList[j].targetName;
              if (_this.tabdata[i][stringStar] == undefined) {
                // tempdata.startValue = '0';
              } else {
                tempdata.startValue = _this.tabdata[i][stringStar];
              }

              if (_this.tabdata[i][stringTar] == undefined) {
                // tempdata.targetValue = '0';
              } else {
                tempdata.targetValue = _this.tabdata[i][stringTar];
              }

              data.push(tempdata);

            }
            objData.dataList = data;
            objectDataFormList.push(objData);
          }
          var nodeId = _this.$options.ncmpobj.instanceObj.nodeId;
          var map = {};
          map.orgId = yufp.session.org.code,
            map.nodeId = nodeId;
          map.indexDataFormList = indexDataFormList;
          map.objectDataFormList = objectDataFormList
          if (map.indexDataFormList.length < 1) {
            _this.$message('请填写指标！');
            return;
          }

          yufp.service.request({
            method: 'post',
            // async:false,
            //async: true, // 异步请求
            url: backend.adminService + '/api/indexplan/datacheck',
            data: map,
            callback: function (code, message, response) {
              if (response != null && response.data === "0") {
                yufp.service.request({
                  method: 'post',
                  // async:false,
                  //async: true, // 异步请求
                  url: backend.adminService + '/api/indexplan/savewaitdistribution',
                  data: map,
                  callback: function (code, message, response) {
                    if (response != null && response === 0) {
                      _this.$message('操作成功');
                    } else {
                      _this.$message('操作失败');
                    }
                  }
                });

                yufp.service.request({
                  method: 'post',
                  // async:false,
                  async: true, // 异步请求
                  url: backend.adminService + '/api/indexplan/save',
                  data: map,
                  callback: function (code, message, response) {

                    if (response != null && response === 0) {
                      var param = { condition: JSON.stringify({ nodeId: nodeId }) };
                      _this.$nextTick(function () {
                        _this.tableColumns = [];
                        _this.getTableColumnNew(nodeId);
                        //_this.$refs.refFormQ.fm.distributionType = ''
                        //_this.$refs.reftable.remoteData(param);
                      });
                      _this.$message('操作成功');
                    } else {
                      _this.$message('操作失败');
                    }
                  }
                });
              } else {
                var message = response.data;
                _this.$message(message);
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
          if (_this.$refs.reftable.selections.length != 1) {
            _this.$message('请选择一条数据！');
            return;
          }
          var select = _this.$refs.reftable.selections[0];
          for (let i = 0; i < _this.tabdata.length; i++) {
            if (_this.tabdata[i] == select) {
              _this.tabdata.splice(i, 1);
            }
          }
          for (let i = 0; i < _this.tabdata.length; i++) {

          }
          _this.$message('操作成功,点击保存后生效！');
        }
      }
    });
  };
});