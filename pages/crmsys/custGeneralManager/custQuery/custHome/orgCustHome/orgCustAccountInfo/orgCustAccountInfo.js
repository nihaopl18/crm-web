/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-1-21 13:58:21.
 * @updated by
 * @description 客户账户信息
 */
define(['custom/plugins/yufp.util.js', './custom/plugins/yufp.watermark.js'], function (require, exports) {
  /**
   * 页面加载完成时触发 尼玛
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0444,CD0443,CD0357,CD0428,CD0435,CD0355,CD0401,CD0011,CD0179,CD0315,CD0085,CD0358,CD0063,CD0064,CD0054,CUST_FLAG,CD0330,CD0071,CD0415,CD0416,CD0360,CD0361,CD0398,CD0399,CD0400,CD0365');
    var acctId = '';
    var loanAcctId = '';
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          orgExportPdf: !yufp.session.checkViewCtrl('orgExportPdf', data.id),
          saveDataUrl: backend.custpersonService + '/api/unitAcrmFagSaveInfo/querylist/' + custId,
          loanDataUrl: backend.custpersonService + '/api/unitacrmfagloandebentinfo/querylist/' + custId,
          transDataUrl: backend.custpersonService + '/api/unitAcrmFevtPreSaveList/querylist',
          loanTransDataUrl: backend.custpersonService + '/api/unitacrmfevtloanlnsacctlist/querylist',
          queryFormdata: {},
          queryFormdata1: {},
          activeName: 'save',
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          formdata: {},
          formdata2: {},
          viewType: 'DETAIL',
          saveDialogVisible: false,
          loanDialogVisible: false,
          transDialogVisible: false,
          loanTransDialogVisible: false,
          formDisabled: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true
        };
      },
      methods: {
        handleClick: function () {

        },
        onAfterCloseFn: function () {

        },
        /**
         * 存款详情返回
         */
        savecancelFn: function () {
          var _this = this;
          _this.saveDialogVisible = false;
        },
        /**
         * 贷款详情返回
         */
        loancancelFn: function () {
          var _this = this;
          _this.loanDialogVisible = false;
        },
        /**
         * 存款信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this.saveDialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 贷款信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus2: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.loanBtnShow = editable;
          _this.loanDialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 存款交易流水信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus5: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.transBtnShow = editable;
          _this.transDialogVisible = true;
          _this.formDisabled = editable;
        },
        /**
         * 贷款交易流水信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus6: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.loanTransBtnShow = editable;
          _this.loanTransDialogVisible = true;
          _this.formDisabled = editable;
        },
        /**
         * 存款详情
         */
        saveinfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.saveTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.saverefForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        },
        rowDblclick: function (row, event) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.saverefForm.resetFields();
            yufp.clone(row, this.formdata);
          });
        },
        /**
         * 存款交易流水
         */
        transList: function () {
          var _this = this;
          var selectionsAry = _this.$refs.saveTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          acctId = selectionsAry[0].acctId;
          _this.switchStatus5('TRANS', false);
          // _this.$nextTick(function () {
          //   var param = {
          //     condition: JSON.stringify({
          //       acctId: acctId
          //     })
          //   };
          //   _this.$refs.transTable.remoteData(param);
          // });
        },
        searchFn1: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.queryFormdata1, model);
          model.acctId = acctId;
          if (_this.queryFormdata1.startTM == '' || _this.queryFormdata1.startTM == undefined) {
            _this.queryFormdata1.startTM = null;
            _this.$message('开始时间不能为空');
            return;
          }
          if (_this.queryFormdata1.endTM == '' || _this.queryFormdata1.endTM == undefined) {
            _this.queryFormdata1.endTM = null;
            _this.$message('结束时间不能为空');
            return;
          }
          if (_this.queryFormdata1.endTM < _this.queryFormdata1.startTM) {
            _this.$message('开始时间不能大于结束时间');
            return;
          }
          var month = (_this.queryFormdata1.startTM.getMonth() + 1) < 10 ? '0' + (_this.queryFormdata1.startTM.getMonth() + 1) : _this.queryFormdata1.startTM.getMonth() + 1;
          var day = _this.queryFormdata1.startTM.getDate() < 10 ? '0' + _this.queryFormdata1.startTM.getDate() : _this.queryFormdata1.startTM.getDate();
          var endTM = _this.queryFormdata1.startTM.getFullYear() + 1 + '-' + month + '-' + day;
          var endTM1 = yufp.util.dateFormat(_this.queryFormdata1.endTM, '{y}-{m}-{d}');
          if (endTM1 > endTM) {
            _this.$message('时间跨度最长为一年');
            return;
          }
          var param = {
            condition: JSON.stringify(model)
          };
          _this.$refs.transTable.remoteData(param);
        },
        resetMainFn1: function () {
          this.$refs.transForm.resetFields();
        },
        // exportFn1: function () {
        //   var _this = this;
        //   // 导出参数
        //   var model = {};
        //   yufp.clone(_this.queryFormdata1, model);
        //   model.acctId = acctId;
        //   if (_this.queryFormdata1.startTM == '' || _this.queryFormdata1.startTM == undefined) {
        //     _this.queryFormdata1.startTM = null;
        //     _this.$message('开始时间不能为空');
        //     return;
        //   }
        //   if (_this.queryFormdata1.endTM == '' || _this.queryFormdata1.endTM == undefined) {
        //     _this.queryFormdata1.endTM = null;
        //     _this.$message('结束时间不能为空');
        //     return;
        //   }
        //   if (_this.queryFormdata1.endTM < _this.queryFormdata1.startTM) {
        //     _this.$message('开始时间不能大于结束时间');
        //     return;
        //   }
        //   var month = (_this.queryFormdata1.startTM.getMonth() + 1) < 10 ? '0' + (_this.queryFormdata1.startTM.getMonth() + 1) : _this.queryFormdata1.startTM.getMonth() + 1;
        //   var day = _this.queryFormdata1.startTM.getDate() < 10 ? '0' + _this.queryFormdata1.startTM.getDate() : _this.queryFormdata1.startTM.getDate();
        //   var endTM = _this.queryFormdata1.startTM.getFullYear() + 1 + '-' + month + '-' + day;
        //   var endTM1 = yufp.util.dateFormat(_this.queryFormdata1.endTM, '{y}-{m}-{d}');
        //   if (endTM1 > endTM) {
        //     _this.$message('时间跨度最长为一年');
        //     return;
        //   }
        //   model.export = '1';
        //   var param = {
        //     condition: JSON.stringify(model)
        //   };
        //   yufp.util.exportExcelByTable({
        //     fileName: '对公存款交易流水',
        //     importType: 'service', // page当前页 selected 选中的数据  service 后端数据,selected为所选择的数据，此时不需要访问后台数据
        //     ref: _this.$refs.transTable,
        //     url: backend.custpersonService + '/api/unitAcrmFevtPreSaveList/querylist',
        //     param: param
        //   });
        // },
        /**
        * 导出pdf ==对公存款交易流水
        */
        exportInfoFn1: function () {
          var _this = this;
          var colunmNamelist = _this.$refs.transTable.tableColumns;
          // _this.conlist = [];
          // for (var i = 0; i < colunmNamelist.length; i++) {
          //   _this.conlist.push(colunmNamelist[i].prop);
          // }
          // window.console.log(_this.conlist);
          // 导出参数
          var model = {};
          yufp.clone(_this.queryFormdata1, model);
          model.acctId = acctId;
          if (_this.queryFormdata1.startTM == '' || _this.queryFormdata1.startTM == undefined) {
            _this.queryFormdata1.startTM = null;
            _this.$message('开始时间不能为空');
            return;
          }
          if (_this.queryFormdata1.endTM == '' || _this.queryFormdata1.endTM == undefined) {
            _this.queryFormdata1.endTM = null;
            _this.$message('结束时间不能为空');
            return;
          }
          if (_this.queryFormdata1.endTM < _this.queryFormdata1.startTM) {
            _this.$message('开始时间不能大于结束时间');
            return;
          }
          var month = (_this.queryFormdata1.startTM.getMonth() + 1) < 10 ? '0' + (_this.queryFormdata1.startTM.getMonth() + 1) : _this.queryFormdata1.startTM.getMonth() + 1;
          var day = _this.queryFormdata1.startTM.getDate() < 10 ? '0' + _this.queryFormdata1.startTM.getDate() : _this.queryFormdata1.startTM.getDate();
          var endTM = _this.queryFormdata1.startTM.getFullYear() + 1 + '-' + month + '-' + day;
          var endTM1 = yufp.util.dateFormat(_this.queryFormdata1.endTM, '{y}-{m}-{d}');
          if (endTM1 > endTM) {
            _this.$message('时间跨度最长为一年');
            return;
          }
          model.export = '1';
          var param = {
            condition: JSON.stringify(model)
          };
          // window.console.log(_this.$refs.transTable);
          var ld1 = _this.$loading({
            target: '.resultDiv',
            body: true,
            text: '拼命加载中'
          });
          yufp.service.request({
            method: 'GET',
            data: param,
            url: backend.custpersonService + '/api/unitAcrmFevtPreSaveList/querylist',
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.code == 0) {
                  var showdata = [];// 展示数据
                  for (var i = 0; i < response.data.length; i++) {
                    var aaa = {};

                    for (var k in response.data[i]) {
                      window.console.log(k);
                      // 转换时间格式
                      if (k.indexOf('Date') != -1) {
                        response.data[i][k] = _this.utc2beijing(response.data[i][k]);
                      }

                      for (var a = 0; a < colunmNamelist.length; a++) {
                        // 值为null则存字符串
                        if (response.data[i][colunmNamelist[a].prop] == 'undefined' || response.data[i][colunmNamelist[a].prop] == null) {
                          aaa[colunmNamelist[a].prop] = '';
                        }
                        if (k.indexOf(colunmNamelist[a].prop) != -1) {
                          // 列中含有dataCode则将value惠存
                          if (colunmNamelist[a].dataCode != 'undefined' && colunmNamelist[a].dataCode != null && colunmNamelist[a].dataCode != '') {
                            var dataCode = yufp.lookup.lookupMgr[colunmNamelist[a].dataCode];
                            for (var t = 0; t < dataCode.length; t++) {
                              if (dataCode[t].key == response.data[i][k]) {
                                response.data[i][k] = dataCode[t].value;
                              }
                            }
                          }
                          aaa[colunmNamelist[a].prop] = response.data[i][k];
                        }
                        // aaa['custIdBase'] = response.data[i].custIdBase;
                        // aaa['custNameBase'] = response.data[i].custNameBase;
                      }
                    }
                    showdata.push(aaa);
                  }
                  ld1.close();
                  yufp.service.request({
                    method: 'GET',
                    url: backend.custflexService + '/api/ocrmfcifqscol/getUuid',
                    data: {orgCode: yufp.session.org.code},
                    callback: function (code, message, response) {
                      var param = {
                        colunmNamelist: colunmNamelist,
                        datalist: showdata,
                        fileName: '对公存款交易流水',
                        userId: yufp.session.userId,
                        userName: yufp.session.userName
                      };
                      var datas = {
                        params: JSON.stringify(param),
                        bizseqno: response.data.uuid
                      };
                      var commintData = {};
                      commintData.applType = 'JYLSDCSP';
                      _this.bizSeqNo = response.data.uuid;
                      // 流程主键
                      commintData.bizSeqNo = response.data.uuid;
                      commintData.custId = yufp.session.userId;
                      commintData.custName = yufp.session.userName;
                      yufp.service.request({
                        method: 'POST',
                        url: backend.custflexService + '/api/ocrmAciReportApply/add',
                        data: datas,
                        callback: function (code, message, response) {
                          if (code == 0) {
                            // var params = {};
                            // var parambizseqno = {
                            //   bizseqno: _this.bizSeqNo
                            // };
                            // params.url = backend.custpersonService + '/api/unitAcrmFevtPreSaveList/export';
                            // params.url = yufp.service.getUrl(params);
                            // params.url += '?access_token=' + yufp.service.getToken();
                            // params.url += '&condition=' + encodeURI(JSON.stringify(parambizseqno));
                            // yufp.util.download(params.url);
                            _this.$refs.approvalRef.wfInit(commintData);
                          } else {
                            return;
                          }
                        }
                      });
                    }
                  });
                  // var paramExport = {
                  //   // colunmNamelist: _this.colunmNamelist,
                  //   colunmNamelist: colunmNamelist,
                  //   datalist: showdata,
                  //   fileName: '对公存款交易流水',
                  //   userId: yufp.session.userId,
                  //   userName: yufp.session.userName
                  // };
                  // ld1.close();
                  // var params = {};
                  // params.url = backend.custpersonService + '/api/unitAcrmFevtPreSaveList/export';
                  // params.url = yufp.service.getUrl(params);
                  // params.url += '?access_token=' + yufp.service.getToken();
                  // params.url += '&condition=' + encodeURI(JSON.stringify(paramExport));
                  // yufp.util.download(params.url);
                }
              }
            }
          });
        },
        /**
         * 贷款详情
         */
        loaninfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.loanTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus2('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.loanrefForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata2);
          });
        },
        rowDblclick1: function (row, event) {
          var _this = this;
          _this.switchStatus2('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.loanrefForm.resetFields();
            yufp.clone(row, this.formdata2);
          });
        },
        /**
         * 贷款交易流水
         */
        loanTransList: function () {
          var _this = this;
          var selectionsAry = _this.$refs.loanTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          loanAcctId = selectionsAry[0].loanAcctId;
          _this.switchStatus6('LOANTRANS', false);
          // _this.$nextTick(function () {
          //   var param = {
          //     condition: JSON.stringify({
          //       loanAcctId: loanAcctId
          //     })
          //   };
          //   _this.$refs.loanTransTable.remoteData(param);
          // });
        },
        searchFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.queryFormdata, model);
          model.loanAcctId = loanAcctId;
          if (_this.queryFormdata.startTM2 == '' || _this.queryFormdata.startTM2 == undefined) {
            _this.queryFormdata.startTM2 = null;
            _this.$message('开始时间不能为空');
            return;
          }
          if (_this.queryFormdata.endTM2 == '' || _this.queryFormdata.endTM2 == undefined) {
            _this.queryFormdata.endTM2 = null;
            _this.$message('结束时间不能为空');
            return;
          }
          if (_this.queryFormdata.endTM2 < _this.queryFormdata.startTM2) {
            _this.$message('开始时间不能大于结束时间');
            return;
          }
          var month = (_this.queryFormdata.startTM2.getMonth() + 1) < 10 ? '0' + (_this.queryFormdata.startTM2.getMonth() + 1) : _this.queryFormdata.startTM2.getMonth() + 1;
          var day = _this.queryFormdata.startTM2.getDate() < 10 ? '0' + _this.queryFormdata.startTM2.getDate() : _this.queryFormdata.startTM2.getDate();
          var endTM = _this.queryFormdata.startTM2.getFullYear() + 1 + '-' + month + '-' + day;
          var endTM1 = yufp.util.dateFormat(_this.queryFormdata.endTM2, '{y}-{m}-{d}');
          if (endTM1 > endTM) {
            _this.$message('时间跨度最长为一年');
            return;
          }
          var param = {
            condition: JSON.stringify(model)
          };
          _this.$refs.loanTransTable.remoteData(param);
        },
        resetMainFn: function () {
          this.$refs.loanTransForm.resetFields();
        },
        // exportFn: function () {
        //   var _this = this;
        //   // 导出参数
        //   var model = {};
        //   yufp.clone(_this.queryFormdata, model);
        //   model.loanAcctId = loanAcctId;
        //   if (_this.queryFormdata.startTM2 == '' || _this.queryFormdata.startTM2 == undefined) {
        //     _this.queryFormdata.startTM2 = null;
        //     _this.$message('开始时间不能为空');
        //     return;
        //   }
        //   if (_this.queryFormdata.endTM2 == '' || _this.queryFormdata.endTM2 == undefined) {
        //     _this.queryFormdata.endTM2 = null;
        //     _this.$message('结束时间不能为空');
        //     return;
        //   }
        //   if (_this.queryFormdata.endTM2 < _this.queryFormdata.startTM2) {
        //     _this.$message('开始时间不能大于结束时间');
        //     return;
        //   }
        //   var month = (_this.queryFormdata.startTM2.getMonth() + 1) < 10 ? '0' + (_this.queryFormdata.startTM2.getMonth() + 1) : _this.queryFormdata.startTM2.getMonth() + 1;
        //   var day = _this.queryFormdata.startTM2.getDate() < 10 ? '0' + _this.queryFormdata.startTM2.getDate() : _this.queryFormdata.startTM2.getDate();
        //   var endTM = _this.queryFormdata.startTM2.getFullYear() + 1 + '-' + month + '-' + day;
        //   var endTM1 = yufp.util.dateFormat(_this.queryFormdata.endTM2, '{y}-{m}-{d}');
        //   if (endTM1 > endTM) {
        //     _this.$message('时间跨度最长为一年');
        //     return;
        //   }
        //   model.export = '1';
        //   var param = {
        //     condition: JSON.stringify(model)
        //   };
        //   yufp.util.exportExcelByTable({
        //     fileName: '对公贷款交易流水',
        //     importType: 'service', // page当前页 selected 选中的数据  service 后端数据,selected为所选择的数据，此时不需要访问后台数据
        //     ref: _this.$refs.loanTransTable,
        //     url: backend.custpersonService + '/api/unitacrmfevtloanlnsacctlist/querylist',
        //     param: param
        //   });
        // },
        /**
         * 导出pdf ==对公贷款交易流水
        */
        exportInfoFn: function () {
          var _this = this;
          var colunmNamelist = _this.$refs.loanTransTable.tableColumns;
          // _this.conlist = [];
          // for (var i = 0; i < colunmNamelist.length; i++) {
          //   _this.conlist.push(colunmNamelist[i].prop);
          // }
          // window.console.log(_this.conlist);
          // 导出参数
          var model = {};
          yufp.clone(_this.queryFormdata, model);
          model.loanAcctId = loanAcctId;
          if (_this.queryFormdata.startTM2 == '' || _this.queryFormdata.startTM2 == undefined) {
            _this.queryFormdata.startTM2 = null;
            _this.$message('开始时间不能为空');
            return;
          }
          if (_this.queryFormdata.endTM2 == '' || _this.queryFormdata.endTM2 == undefined) {
            _this.queryFormdata.endTM2 = null;
            _this.$message('结束时间不能为空');
            return;
          }
          if (_this.queryFormdata.endTM2 < _this.queryFormdata.startTM2) {
            _this.$message('开始时间不能大于结束时间');
            return;
          }
          var month = (_this.queryFormdata.startTM2.getMonth() + 1) < 10 ? '0' + (_this.queryFormdata.startTM2.getMonth() + 1) : _this.queryFormdata.startTM2.getMonth() + 1;
          var day = _this.queryFormdata.startTM2.getDate() < 10 ? '0' + _this.queryFormdata.startTM2.getDate() : _this.queryFormdata.startTM2.getDate();
          var endTM = _this.queryFormdata.startTM2.getFullYear() + 1 + '-' + month + '-' + day;
          var endTM1 = yufp.util.dateFormat(_this.queryFormdata.endTM2, '{y}-{m}-{d}');
          if (endTM1 > endTM) {
            _this.$message('时间跨度最长为一年');
            return;
          }
          model.export = '1';
          var param = {
            condition: JSON.stringify(model)
          };
          // window.console.log(_this.$refs.transTable);
          var ld1 = _this.$loading({
            target: '.resultOfload',
            body: true,
            text: '拼命加载中'
          });
          yufp.service.request({
            method: 'GET',
            data: param,
            url: backend.custpersonService + '/api/unitacrmfevtloanlnsacctlist/querylist',
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.code == 0) {
                  var showdata = [];// 展示数据
                  for (var i = 0; i < response.data.length; i++) {
                    var aaa = {};

                    for (var k in response.data[i]) {
                      window.console.log(k);
                      // 转换时间格式
                      if (k.indexOf('Date') != -1) {
                        response.data[i][k] = _this.utc2beijing(response.data[i][k]);
                      }
                      for (var a = 0; a < colunmNamelist.length; a++) {
                        // 值为null则存字符串
                        if (response.data[i][colunmNamelist[a].prop] == 'undefined' || response.data[i][colunmNamelist[a].prop] == null) {
                          aaa[colunmNamelist[a].prop] = '';
                        }
                        if (k.indexOf(colunmNamelist[a].prop) != -1) {
                          // 列中含有dataCode则将value惠存
                          if (colunmNamelist[a].dataCode != 'undefined' && colunmNamelist[a].dataCode != null && colunmNamelist[a].dataCode != '') {
                            var dataCode = yufp.lookup.lookupMgr[colunmNamelist[a].dataCode];
                            for (var t = 0; t < dataCode.length; t++) {
                              if (dataCode[t].key == response.data[i][k]) {
                                response.data[i][k] = dataCode[t].value;
                              }
                            }
                          }
                          aaa[colunmNamelist[a].prop] = response.data[i][k];
                        }
                        // aaa['custIdBase'] = response.data[i].custIdBase;
                        // aaa['custNameBase'] = response.data[i].custNameBase;
                      }
                    }
                    showdata.push(aaa);
                  }
                  ld1.close();
                  yufp.service.request({
                    method: 'GET',
                    url: backend.custflexService + '/api/ocrmfcifqscol/getUuid',
                    data: { orgCode: yufp.session.org.code },
                    callback: function (code, message, response) {
                      var param = {
                        colunmNamelist: colunmNamelist,
                        datalist: showdata,
                        fileName: '对公贷款交易流水',
                        userId: yufp.session.userId,
                        userName: yufp.session.userName
                      };
                      var datas = {
                        params: JSON.stringify(param),
                        bizseqno: response.data.uuid
                      };
                      var commintData = {};
                      commintData.applType = 'JYLSDCSP';
                      _this.bizSeqNo = response.data.uuid;
                      // 流程主键
                      commintData.bizSeqNo = response.data.uuid;
                      commintData.custId = yufp.session.userId;
                      commintData.custName = yufp.session.userName;
                      yufp.service.request({
                        method: 'POST',
                        url: backend.custflexService + '/api/ocrmAciReportApply/add',
                        data: datas,
                        callback: function (code, message, response) {
                          if (code == 0) {
                            // var params = {};
                            // var parambizseqno = {
                            //   bizseqno: _this.bizSeqNo
                            // };
                            // params.url = backend.custpersonService + '/api/unitacrmfevtloanlnsacctlist/export';
                            // params.url = yufp.service.getUrl(params);
                            // params.url += '?access_token=' + yufp.service.getToken();
                            // params.url += '&condition=' + encodeURI(JSON.stringify(parambizseqno));
                            // yufp.util.download(params.url);
                            _this.$refs.approvalRef.wfInit(commintData);
                          } else {
                            return;
                          }
                        }
                      });
                    }
                  });
                  // var paramExport = {
                  //   // colunmNamelist: _this.colunmNamelist,
                  //   colunmNamelist: colunmNamelist,
                  //   datalist: showdata,
                  //   fileName: '对公贷款交易流水',
                  //   userId: yufp.session.userId,
                  //   userName: yufp.session.userName
                  // };
                  // var params = {};
                  // params.url = backend.custpersonService + '/api/unitacrmfevtloanlnsacctlist/export';
                  // params.url = yufp.service.getUrl(params);
                  // params.url += '?access_token=' + yufp.service.getToken();
                  // params.url += '&condition=' + encodeURI(JSON.stringify(paramExport));
                  // yufp.util.download(params.url);
                }
              }
            }
          });
        },
        utc2beijing: function (UTCDateString) {
          if (!UTCDateString) {
            return '-';
          }
          function formatFunc(str) { // 格式化显示
            return str > 9 ? str : '0' + str;
          }
          var date2 = new Date(UTCDateString); // 这步是关键
          var year = date2.getFullYear();
          var mon = formatFunc(date2.getMonth() + 1);
          var day = formatFunc(date2.getDate());
          var hour = date2.getHours();
          var noon = hour >= 12 ? 'PM' : 'AM';
          hour = hour >= 12 ? hour - 12 : hour;
          hour = formatFunc(hour);
          var min = formatFunc(date2.getMinutes());
          var secon = formatFunc(date2.getSeconds());
          var dateStr = year + '-' + mon + '-' + day + ' ' + noon + ' ' + hour + ':' + min + ':' + secon;
          return dateStr;
        }
      }
    });
  };
});