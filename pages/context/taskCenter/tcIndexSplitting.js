/**
 * @created by jiating on 2022/03/10.
 * @description 普通查询模板
 */
define([
  './custom/widgets/js/yufpCmSelector.js',
  './custom/widgets/js/yufpTargetSelector.js',
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('TASK_TYPE,CUST_TYPE,CUST_STAT,IDENT_TYPE,ASSEMBLY_OBJ_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          /** 查询字段 */
          queryFields: [
            { placeholder: '对象名称', field: 'objName', type: 'input' },
          ],
          /** 搜索按钮 */
          queryButtons: [
            {
              label: '搜索', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                if (valid) {
                  _self.residualIndex.objName = model.objName;
                  _self.getTableList();
                  model.objName = '';
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          loading: false,
          dialogVisible: false,
          tableData: [
          ],
          ruleForm: {},
          multipleSelection: [],
          selectActivity: {},
          // formInline: {
          //   user: '',
          //   region: ''
          // },
          keyword: '',
          activityList: [],
          // 查询活动对象参数
          activityForm: {
            tempId: '',
            activityName: '',
            activityType: '',
            keyword: ''
          },
          indexState: {
            activityId: '',
            activityName: '',
            // state: '0'//0 未分配，1 未分配完毕，2 分配完
            state: ''
          },
          //查询剩余指标参数 /列表参数
          residualIndex: {
            objName: '',
            objType: '01',
            tempId: '',//必填
            orgId: yufp.session.org.code,//必填
            page: 1,//必填（列表）
            size: 10,//必填（列表）
          },
          activityPagination: {
            page: 1,//必填（列表）
            size: 10,//必填（列表）
          },

          chosedTempId: '',
          residualIndexList: [],
          indexTips: '该活动未查询相关指标信息！',
          activeId: '',
          formData: {
            tabdata: [],
            tableColumns: [],
          },
          // tabdata: [],
          // tableColumns: [],
          tabTips: '',
          indexLoading: false,
          initTableColumns: [],
          targetNameList: [],
          chaList: [],
          orgData: [],
          customerData: [],
          pageInfo: {
            total: 0
          },
          activityPageInfo: {
            total: 0
          },
          old_objType: '01',
          oldPage: 1,
          targetValue: 0,
          old_targetValue: 0,
          // initCurrentIndexRemain:0,
          current_indexRemain: 0,
          startValue: 0,
          cellClickNum: 0,
          columnName: null,
          targetMinValue: 0,
          isSave: false,
          validatorSign: {
            targetBoole: false,
            indexRemainBoole: false
          },
        }
      },
      computed: {
        difference() {
          let old_targetValue = parseInt(sessionStorage.getItem('old_targetValue'));
          let targetVal = parseInt(this.targetValue);
          let initCurrentIndexRemain = parseInt(sessionStorage.getItem('initCurrentIndexRemain'));
          // console.log('initCurrentIndexRemain', initCurrentIndexRemain)
          // console.log('新值：'+targetVal,'旧值：'+old_targetValue,'上次剩余指标：'+initCurrentIndexRemain)
          if (!targetVal) {
            targetVal = 0;
            return targetVal - old_targetValue
          } else {
            if (initCurrentIndexRemain == 0) {
              if (targetVal > old_targetValue) {
                this.targetVal = old_targetValue;
                return 0
              } else {
                return targetVal - old_targetValue
              }
            } else {
              if (targetVal <= parseInt(this.startValue)) {
                return 0
              } else {
                if (old_targetValue != targetVal) {
                  return targetVal - old_targetValue
                } else {
                  return 0
                }
              }
            }
          }
        },
        currentIndexRemain() {
          let initCurrentIndexRemain = parseInt(sessionStorage.getItem('initCurrentIndexRemain'));
          // console.log('上次的剩余指标：'+initCurrentIndexRemain,'当前差值：'+this.difference)
          if ((initCurrentIndexRemain - this.difference) < 0) {
            this.isSave = true;
            this.$message({
              message: '已经超出可配置指标数！',
              type: 'warning'
            });
            return initCurrentIndexRemain - this.difference;
          }
          return initCurrentIndexRemain - this.difference
        }
      },
      created: function () {
        sessionStorage.setItem('oldObjType', this.old_objType)
        sessionStorage.setItem('oldPage', this.oldPage)
      },
      mounted: function () {
        var _this = this;
        _this.getActivity();
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

        yufp.service.request({
          method: 'post',
          //查询渠道信息 
          url: backend.adminService + '/api/indexplan/chabox',
          callback: function (code, message, response) {
            if (code == 0) {
              var chaData = response.data;
              if (chaData.length > 0) {
                for (var index = 0; index < chaData.length; index++) {
                  var map = {};
                  var element = chaData[index];
                  map['key'] = element.assemblyId;
                  map.value = element.assemblyName;
                  _this.chaList.push(map);
                }
              }
            }
          }
        });
        _this.getTableColumnNew();
      },
      methods: {
        confirmButton() {
          var _this = this;
          _this.saveFn();
        },
        getActivity() {
          var _this = this;
          var req = {
            orgId: yufp.session.org.code,
            indexState: _this.indexState.state,
            page: _this.activityPagination.page,
            size: _this.activityPagination.size,
            activityId: _this.indexState.activityId,
            activityName: _this.indexState.activityName,
          }
          yufp.service.request({
            method: 'POST',
            // async: false,
            //查询机构信息
            data: req,
            url: backend.adminService + '/api/marketplan/indexstate',
            callback: function (code, message, response) {
              if (code == 0) {
                _this.tableData = response.data;
                _this.activityPageInfo.total = response.total;
              }
            }
          });
        },
        onSubmit() {
          var _this = this;
          _this.getActivity();
          // console.log(this.indexState)
        },
        infoFn() {
          var _this = this;
          // if (this.selectActivity.length < 1) {
          //   this.$message({
          //     message: '只能选取一个活动',
          //     type: 'warning'
          //   });
          //   return;
          // }
          if (this.multipleSelection.length != 1) {
            this.$message({
              message: '请选取一个活动',
              type: 'warning'
            });
            return;
          }
          this.selectActivity = this.multipleSelection[0]
          _this.dialogVisible = true
          var activityInfo = this.selectActivity
          console.log('activityInfo', activityInfo)
          _this.residualIndex.tempId = activityInfo.activityId;
          _this.getResidualIndexList();

        },
        resetForm(formName) {
          var _this = this;
          //console.log('formName', formName)

          // console.log(_this.$refs.ruleForm)
          _this.$refs[formName].resetFields();
          //_this.$refs.ruleForm.resetFields();
        },
        handleSelectionChange(val) {
          var _this = this;
          // console.log('val', val)
          this.multipleSelection = val;
          // if (this.multipleSelection.length != 1) {
          //   this.$message({
          //     message: '请选取一个活动',
          //     type: 'warning'
          //   });
          //   return;
          // }
          // this.selectActivity = this.multipleSelection[0];

        },
        // 对象类型选择
        changeObjType(val) {
          let oldObjType = sessionStorage.getItem('oldObjType');
          this.confirmFun('请确认当前页面数据是否已经保存?', () => {
            this.residualIndex.objType = val;
            this.residualIndex.objName = '';
            sessionStorage.setItem('oldObjType', val)
            this.getTableList();
          }, () => {
            this.residualIndex.objType = oldObjType;
          })
        },
        // 左侧活动对象模糊查询
        remoteMethod(query) {
          var _this = this;
          if (query) {
            _this.loading = true;
            setTimeout(function () {
              _this.loading = false;
              _this.activityForm.keyword = '';
              _this.activityForm.keyword = query;
              var url = backend.adminService + '/api/marketplan/result';
              yufp.service.request({
                method: 'POST',
                url: url,
                data: _this.activityForm,
                callback: function (code, message, response) {
                  _this.activityList = [];
                  var data = response.data;
                  for (let i = 0; i < data.length; i++) {
                    const singleObj = data[i];
                    var activity = {};
                    activity.id = singleObj.tempId;
                    activity.name = singleObj.activityName;
                    activity.type = singleObj.activityType;
                    _this.activityList.push(activity);
                  }
                }
              })
            }, 200);
          } else {
            _this.activityList = [];
          }
        },
        //选择活动对象查询相关指标信息 
        choseActiveObj(val) {
          var _this = this;
          let activityArr = _this.activityList;
          activityArr.forEach(item => {
            if (item.name === val) {
              _this.residualIndex.tempId = item.id;
              _this.chosedTempId = item.id;
            }
          });
          _this.getResidualIndexList();
        },
        //查询剩余指标信息 
        getResidualIndexList() {
          var _this = this;
          var url = backend.adminService + '/api/indexplan/indexremainquery'
          _this.residualIndexList = [];
          yufp.service.request({
            method: 'POST',
            url: url,
            data: _this.residualIndex,
            callback: function (code, message, response) {
              if (response.code === 0) {
                let data = response.data;
                if (data && data.length > 0) {
                  _this.residualIndexList = data;
                  _this.nodeId = data[0].nodeId;
                  _this.getTableList();
                } else {
                  _this.indexTips = '该活动下暂无相关指标信息'
                }
              }
            }
          });
        },
        //查询右侧table列表
        getTableList() {
          var _this = this;
          var url = backend.adminService + 'api/indexplan/indexdistributionquery'
          _this.formData.tabdata = [];
          _this.formData.tableColumns = [];
          _this.formData.tableColumns = _this.formData.tableColumns.concat(_this.initTableColumns);
          _this.indexLoading = true;
          yufp.service.request({
            method: 'POST',
            url: url,
            data: _this.residualIndex,
            callback: function (code, message, response) {
              _this.pageInfo.total = response.total;
              if (response.code == 0) {
                let data = response.data
                _this.indexLoading = false;
                //反显表头
                var indexDataDto = data.indexDataDto;
                //反显数据
                var objDataListDto = data.objDataListDto;
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
                  var sort = indexDataDto[i].sort
                  _this.targetNameList.push(targetName)
                  _this.formData.tableColumns.push(
                    {
                      label: targetName, prop: targetName, width: 110, headerAlign: 'center',
                      renderHeader: function (h, { column, $index }) {
                        return h('span', {}, [
                          column.label,
                          h()
                        ])
                      },
                      children: [
                        { label: '期初值', prop: 'sta' + targetName, width: 110, ctype: 'input', disabled: true },
                        {
                          label: '目标值', prop: 'tar' + targetName, width: 110, ctype: 'input', disabled: false,
                          rules: [
                            { validator: _this.createValidator(i, 'tar' + targetName), trigger: 'change' }
                          ]
                        }
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
                _this.formData.tabdata = objectList;
              } else {
                _this.indexLoading = false;
                _this.tabTips = '暂无相关数据！'
              }
            }
          });
        },
        // 表单验证数据
        createValidator(index, targetName) {
          return validator = (rule, value, callback) => {
            // 拿到当前行数据
            const row = this.formData.tabdata[index];
            if (targetName == this.columnName) {
              if (value == "") {
                callback();
              } else {
                console.log(callback())
                let switchVal = parseInt(value)
                var r = /^\+?[1-9][0-9]*$/;　　//正整数
                if (r.test(switchVal)) {
                  let old_targetValue = parseInt(sessionStorage.getItem('old_targetValue'));
                  if (this.startValue >= switchVal) {
                    console.log('目标值必须大于期初值')
                    callback(new Error('目标值必须大于期初值'))
                  }
                  if (this.current_indexRemain == 0 && (switchVal > old_targetValue)) {
                    // console.log(callback())
                    console.log('当前没有可配置指标了！')
                    console.log(callback())
                    callback(new Error('当前没有可配置指标了！'))
                    return false
                  }
                  callback();
                } else {
                  callback(new Error('请输入正整数！'))
                }
              }
              callback();
            }
          }
        },
        //table列表添加固定列内容 
        getTableColumnNew() {
          var _this = this;
          _this.initTableColumns = [];
          _this.initTableColumns.push({ label: '对象类型', prop: 'objType', width: 110, headerAlign: 'center', dataCode: 'ASSEMBLY_OBJ_TYPE' });
          _this.initTableColumns.push({
            label: '对象名称',
            prop: 'objId',
            width: 110,
            headerAlign: 'center',
            // ctype: 'input',
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
            },
          });
        },
        // 保存
        saveFn: function () {
          var _this = this;
          if (_this.isSave) {
            this.$message({
              message: '存在指标可配置数据为负，请修改对象的目标值',
              type: 'warning'
            });
            return
          }
          // _this.$refs['formDom'].validate((valid) => {})
          if (_this.validatorSign.targetBoole) {
            this.$message({
              message: '目标值必须大于期初值，请检查！',
              type: 'warning'
            });
            return
          }
          if (_this.validatorSign.indexRemainBoole) {
            this.$message({
              message: '有指标剩余可配置数据为0，已无法配置，请检查！',
              type: 'warning'
            });
            return
          }
          //获取指标名称
          var coul = _this.formData.tableColumns;
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
          let tableDataArr = _this.formData.tabdata;
          for (let i = 0; i < tableDataArr.length; i++) {
            var objData = {};
            var data = [];
            objData.objType = tableDataArr[i].objType;
            objData.objId = tableDataArr[i].objId;
            for (let j = 0; j < indexDataFormList.length; j++) {
              var tempdata = {};
              tempdata.sort = indexDataFormList[j].sort;
              var stringStar = 'sta' + indexDataFormList[j].targetName;
              var stringTar = 'tar' + indexDataFormList[j].targetName;
              if (tableDataArr[i][stringStar] == undefined) {
                // tempdata.startValue = '0';
              } else {
                tempdata.startValue = tableDataArr[i][stringStar];
              }

              if (tableDataArr[i][stringTar] == undefined) {
                // tempdata.targetValue = '0';
              } else {
                tempdata.targetValue = tableDataArr[i][stringTar];
              }
              data.push(tempdata);
            }
            objData.dataList = data;
            objectDataFormList.push(objData);
          }
          var nodeId = _this.nodeId;
          var map = {};
          map.nodeId = nodeId;
          map.indexDataFormList = indexDataFormList;
          map.objectDataFormList = objectDataFormList;
          map.activityId = _this.selectActivity.activityId;
          map.activityName = _this.selectActivity.activityName;
          map.orgId = yufp.session.org.code;
          yufp.service.request({
            method: 'post',
            async: true, // 异步请求
            url: backend.adminService + '/api/indexplan/saveindex',
            data: map,
            callback: function (code, message, response) {
              if (response != null && response === 0) {
                _this.indexTips = '指标信息更新中，请等待！'
                _this.getResidualIndexList();
                _this.$message('操作成功');
              } else {
                _this.$message('操作失败');
              }
              yufp.service.request({
                method: 'post',
                async: true, // 异步请求
                url: backend.adminService + '/api/indexplan/editindex',
                data: map,
                callback: function (code, message, response) {
                  if (response != null && response === 0) {
                    _this.indexTips = '指标信息更新中，请等待！'
                    _this.getResidualIndexList();
                    _this.$message('操作成功');
                  } else {
                    _this.$message('操作失败');
                  }
                }
              });
            }
          });

        },
        tabload: function (data, total, response) {
          var _this = this;
          _this.formData.tabdata = data;
        },
        clickFn: function name(row, event, column) {
        },
        // 目标值改变函数
        changeTarget(val, item) {
          let prop = item.prop;
          let residualIndexList = this.residualIndexList;
          let old_targetValue = parseInt(sessionStorage.getItem('old_targetValue'))
          for (let i = 0; i < residualIndexList.length; i++) {
            if (prop == this.columnName && prop.indexOf('tar') != -1 && prop.indexOf(residualIndexList[i].indexName) != -1) {
              if (parseInt(val) <= parseInt(this.startValue)) {
                this.$set(this.validatorSign, 'targetBoole', true)
              } else {
                this.$set(this.validatorSign, 'targetBoole', false)
              }
              if (this.current_indexRemain == 0 && (parseInt(val) > old_targetValue)) {
                this.$set(this.validatorSign, 'indexRemainBoole', true)
              } else {
                this.$set(this.validatorSign, 'indexRemainBoole', false)
              }
              this.targetValue = val ? val : 0;
              residualIndexList[i].indexRemain = this.currentIndexRemain
            }
          }
        },
        // 单元格点击事件
        cellClickFun(row, column, cell, event) {
          this.columnName = column.property
          let columnName = this.columnName
          let residualIndexList = this.residualIndexList;
          if (columnName && columnName.indexOf('tar') != -1) {
            for (let i = 0; i < residualIndexList.length; i++) {
              for (let key in row) {
                if (key.indexOf(columnName.split('tar')[1]) != -1) {
                  if (key.indexOf('sta') != -1) {
                    this.startValue = parseInt(row[key])
                  }
                  if (key.indexOf('tar') != -1 && key.indexOf(residualIndexList[i].indexName) != -1) {
                    this.targetValue = parseInt(row[key]);
                    // console.log('this.startValue~~~~', this.startValue)

                    if (isNaN(this.startValue)) {
                      this.startValue = 0;
                    }

                    let current_targetValue = parseInt(row[key]);
                    this.current_indexRemain = parseInt(residualIndexList[i].indexRemain);
                    if (current_targetValue && current_targetValue > this.startValue) {
                      sessionStorage.setItem('old_targetValue', current_targetValue)
                    } else {
                      sessionStorage.setItem('old_targetValue', 0)
                    }
                    this.current_indexRemain ? sessionStorage.setItem('initCurrentIndexRemain', this.current_indexRemain) : sessionStorage.setItem('initCurrentIndexRemain', 0);
                  }
                }
              }
            }
          }
        },
        // 分页方法
        handleSizeChange(val) {
          this.residualIndex.size = val;
          this.getTableList();
        },
        activitySizeChange(val) {
          this.activityPagination.size = val
          this.getActivity();
        },
        handleCurrentChange(val) {
          let oldPage = parseInt(sessionStorage.getItem('oldPage'));
          this.residualIndex.page = oldPage;
          this.confirmFun('请确认当前页面数据是否已经保存?', () => {
            sessionStorage.setItem('oldPage', val)
            this.residualIndex.page = val;
            this.getTableList();
          }, () => {
            this.residualIndex.page = oldPage;
          })
        },
        activityCurrentChange(val) {
          this.activityPagination.page = val;
          this.getActivity();
        },
        //切换页面提示函数 
        confirmFun(title, successFun, catchFun) {
          this.$confirm(title, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.saveFn();
            successFun()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消'
            });
            catchFun()
          });
        },
      }
    });
  };
});