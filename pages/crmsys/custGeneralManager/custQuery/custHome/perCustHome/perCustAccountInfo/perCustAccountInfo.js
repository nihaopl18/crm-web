/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-1-21 13:58:21.
 * @updated by
 * @description 客户账户信息
 */
define(['./custom/plugins/yufp.watermark.js', './custom/widgets/js/YufpWfInit.js'], function (require, exports) {
  /**
   * 页面加载完成时触发 尼玛
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0443,CD0357,CD0401,CD0428,CD0355,CD0011,CD0383,CD0315,CD0085,CD0358,CD0063,CD0064,CD0054,CUST_FLAG,CD0330,CD0071,CD0415,CD0416,CD0360,CD0361,CD0398,CD0426,CD0399,CD0400,CD0365,CD0433,CD0434,CD0435');
    var acctNo = '';
    var acctId = '';
    var loanAcctId = '';
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          perExportPdf: !yufp.session.checkViewCtrl('perExportPdf', data.id),
          saveDataUrl: backend.custpersonService + '/api/acrmfagsaveinfo/querylist/' + custId,
          loanDataUrl: backend.custpersonService + '/api/acrmfagloandebentinfo/querylist/' + custId,
          cardDataUrl: backend.custpersonService + '/api/acrmFagPerBankCardInfo/querylist/' + custId,
          ccdDataUrl: backend.custpersonService + '/api/acrmfagccdacct/querylist/' + custId,
          transDataUrl: backend.custpersonService + '/api/acrmfevtpresavelist/querylist',
          loanTransDataUrl: backend.custpersonService + '/api/acrmfevtloanlnsacctlist/querylist',
          ccdTransDataUrl: backend.custpersonService + '/api/acrmFevtPerCcdTrans/querylist',
          balDataUrl: backend.custpersonService + '/api/acrmfevtpresavelist/queryballist',
          queryFormdata: {},
          activeName: 'save',
          queryFormdata1: {},
          queryFormdata2: {},
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          formdata: {},
          formdata2: {},
          formdata3: {},
          formdata4: {},
          viewType: 'DETAIL',
          saveDialogVisible: false,
          loanDialogVisible: false,
          cardDialogVisible: false,
          ccdDialogVisible: false,
          transDialogVisible: false,
          loanTransDialogVisible: false,
          ccdTransDialogVisible: false,
          balDialogVisible: false,
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
         * 卡片详情返回
         */
        cardcancelFn: function () {
          var _this = this;
          _this.cardDialogVisible = false;
        },
        /**
         * 信用卡详情返回
         */
        ccdcancelFn: function () {
          var _this = this;
          _this.ccdDialogVisible = false;
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
         * 卡片信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus3: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.cardBtnShow = editable;
          _this.cardDialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 信用卡信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus4: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.ccdBtnShow = editable;
          _this.ccdDialogVisible = true;
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
         * 信用卡交易流水信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus7: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.ccdTransBtnShow = editable;
          _this.ccdTransDialogVisible = true;
          _this.formDisabled = editable;
        },
        /**
         * 存款实时余额
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus8: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.balBtnShow = editable;
          _this.balDialogVisible = true;
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
          // var param = {
          //   condition: JSON.stringify({
          //     acctId: acctId
          //   })
          // };
          // _this.$nextTick(function () {
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
        //   model.export = '1';
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
        //   var param = {
        //     condition: JSON.stringify(model)
        //   };
        //   // console.log(JSON.stringify(_this.$refs.refTable.tableColumns));
        //   yufp.util.exportExcelByTable({
        //     fileName: '个人存款交易流水',
        //     importType: 'service', // page当前页 selected 选中的数据  service 后端数据,selected为所选择的数据，此时不需要访问后台数据
        //     ref: _this.$refs.transTable,
        //     url: backend.custpersonService + '/api/acrmfevtpresavelist/querylist',
        //     param: param
        //   });
        // },
        /**
         * 导出pdf ==个人存款交易流水
         */
        exportInfoFn1: function () {
          var _this = this;
          var colunmNamelist = _this.$refs.transTable.tableColumns;
          // 导出参数
          var model = {};
          yufp.clone(_this.queryFormdata1, model);
          model.acctId = acctId;
          model.export = '1';
          // model.fileName = '个人存款交易流水';
          model.colunmNamelist = colunmNamelist;
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
          window.console.log(_this.$refs.transTable);
          var ld1 = _this.$loading({
            target: '.resultDiv',
            body: true,
            text: '拼命加载中'
          });
          yufp.service.request({
            method: 'GET',
            data: param,
            url: backend.custpersonService + '/api/acrmfevtpresavelist/querylist',
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
                        fileName: '个人存款交易流水',
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
                            // params.url = backend.appOcaService + '/api/acrmfevtpresavelist/export';
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
                  //   fileName: '个人存款交易流水',
                  //   userId: yufp.session.userId,
                  //   userName: yufp.session.userName
                  // };
                  // ld1.close();
                  // var params = {};
                  // params.url = backend.custpersonService + '/api/acrmfevtpresavelist/export';
                  // params.url = yufp.service.getUrl(params);
                  // params.url += '?access_token=' + yufp.service.getToken();
                  // params.url += '&condition=' + encodeURI(JSON.stringify(paramExport));
                  // yufp.util.download(params.url);
                }
              }
            }
          });
        },
        searchFn2: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.queryFormdata2, model);
          model.acctNo = acctNo;
          if (_this.queryFormdata2.startTM3 == '' || _this.queryFormdata2.startTM3 == undefined) {
            _this.queryFormdata2.startTM3 = null;
            _this.$message('开始时间不能为空');
            return;
          }
          if (_this.queryFormdata2.endTM3 == '' || _this.queryFormdata2.endTM3 == undefined) {
            _this.queryFormdata2.endTM3 = null;
            _this.$message('结束时间不能为空');
            return;
          }
          if (_this.queryFormdata2.endTM3 < _this.queryFormdata2.startTM3) {
            _this.$message('开始时间不能大于结束时间');
            return;
          }
          var month = (_this.queryFormdata2.startTM3.getMonth() + 1) < 10 ? '0' + (_this.queryFormdata2.startTM3.getMonth() + 1) : _this.queryFormdata2.startTM3.getMonth() + 1;
          var day = _this.queryFormdata2.startTM3.getDate() < 10 ? '0' + _this.queryFormdata2.startTM3.getDate() : _this.queryFormdata2.startTM3.getDate();
          var endTM = _this.queryFormdata2.startTM3.getFullYear() + 1 + '-' + month + '-' + day;
          var endTM1 = yufp.util.dateFormat(_this.queryFormdata2.endTM3, '{y}-{m}-{d}');
          if (endTM1 > endTM) {
            _this.$message('时间跨度最长为一年');
            return;
          }
          var param = {
            condition: JSON.stringify(model)
          };
          this.$refs.ccdTransTable.remoteData(param);
        },
        resetMainFn2: function () {
          this.$refs.ccdTransForm.resetFields();
        },
        // exportFn2: function () {
        //   var _this = this;
        //   // 导出参数
        //   var model = {};
        //   yufp.clone(_this.queryFormdata2, model);
        //   model.acctNo = acctNo;
        //   if (_this.queryFormdata2.startTM3 == '' || _this.queryFormdata2.startTM3 == undefined) {
        //     _this.queryFormdata2.startTM3 = null;
        //     _this.$message('开始时间不能为空');
        //     return;
        //   }
        //   if (_this.queryFormdata2.endTM3 == '' || _this.queryFormdata2.endTM3 == undefined) {
        //     _this.queryFormdata2.endTM3 = null;
        //     _this.$message('结束时间不能为空');
        //     return;
        //   }
        //   if (_this.queryFormdata2.endTM3 < _this.queryFormdata2.startTM3) {
        //     _this.$message('开始时间不能大于结束时间');
        //     return;
        //   }
        //   var month = (_this.queryFormdata2.startTM3.getMonth() + 1) < 10 ? '0' + (_this.queryFormdata2.startTM3.getMonth() + 1) : _this.queryFormdata2.startTM3.getMonth() + 1;
        //   var day = _this.queryFormdata2.startTM3.getDate() < 10 ? '0' + _this.queryFormdata2.startTM3.getDate() : _this.queryFormdata2.startTM3.getDate();
        //   var endTM = _this.queryFormdata2.startTM3.getFullYear() + 1 + '-' + month + '-' + day;
        //   var endTM1 = yufp.util.dateFormat(_this.queryFormdata2.endTM3, '{y}-{m}-{d}');
        //   if (endTM1 > endTM) {
        //     _this.$message('时间跨度最长为一年');
        //     return;
        //   }
        //   model.export = '1';
        //   var param = {
        //     condition: JSON.stringify(model)
        //   };
        //   // console.log(JSON.stringify(_this.$refs.refTable.tableColumns));
        //   yufp.util.exportExcelByTable({
        //     fileName: '信用卡交易流水',
        //     importType: 'service', // page当前页 selected 选中的数据  service 后端数据,selected为所选择的数据，此时不需要访问后台数据
        //     ref: _this.$refs.ccdTransTable,
        //     url: backend.custpersonService + '/api/acrmFevtPerCcdTrans/querylist',
        //     param: param
        //   });
        // },
        // exportFn2: function () {
        //   var _this = this;
        //   // 导出参数
        //   var model = {};
        //   yufp.clone(_this.queryFormdata2, model);
        //   model.acctNo = acctNo;
        //   if (_this.queryFormdata2.startTM3 == '' || _this.queryFormdata2.startTM3 == undefined) {
        //     _this.queryFormdata2.startTM3 = null;
        //     _this.$message('开始时间不能为空');
        //     return;
        //   }
        //   if (_this.queryFormdata2.endTM3 == '' || _this.queryFormdata2.endTM3 == undefined) {
        //     _this.queryFormdata2.endTM3 = null;
        //     _this.$message('结束时间不能为空');
        //     return;
        //   }
        //   if (_this.queryFormdata2.endTM3 < _this.queryFormdata2.startTM3) {
        //     _this.$message('开始时间不能大于结束时间');
        //     return;
        //   }
        //   var month = (_this.queryFormdata2.startTM3.getMonth() + 1) < 10 ? '0' + (_this.queryFormdata2.startTM3.getMonth() + 1) : _this.queryFormdata2.startTM3.getMonth() + 1;
        //   var day = _this.queryFormdata2.startTM3.getDate() < 10 ? '0' + _this.queryFormdata2.startTM3.getDate() : _this.queryFormdata2.startTM3.getDate();
        //   var endTM = _this.queryFormdata2.startTM3.getFullYear() + 1 + '-' + month + '-' + day;
        //   var endTM1 = yufp.util.dateFormat(_this.queryFormdata2.endTM3, '{y}-{m}-{d}');
        //   if (endTM1 > endTM) {
        //     _this.$message('时间跨度最长为一年');
        //     return;
        //   }
        //   model.export = '1';
        //   var param = {
        //     condition: JSON.stringify(model)
        //   };
        //   // console.log(JSON.stringify(_this.$refs.refTable.tableColumns));
        //   yufp.util.exportExcelByTable({
        //     fileName: '信用卡交易流水',
        //     importType: 'service', // page当前页 selected 选中的数据  service 后端数据,selected为所选择的数据，此时不需要访问后台数据
        //     ref: _this.$refs.ccdTransTable,
        //     url: backend.custpersonService + '/api/acrmFevtPerCcdTrans/querylist',
        //     param: param
        //   });
        // },

        /**
        * 导出pdf ==卡片交易流水
        */
        exportInfoFn2: function () {
          var _this = this;
          var colunmNamelist = _this.$refs.ccdTransTable.tableColumns;
          // _this.conlist = [];
          // for (var i = 0; i < colunmNamelist.length; i++) {
          //   _this.conlist.push(colunmNamelist[i].prop);
          // }
          // 导出参数
          var model = {};
          yufp.clone(_this.queryFormdata2, model);
          model.acctNo = acctNo;
          if (_this.queryFormdata2.startTM3 == '' || _this.queryFormdata2.startTM3 == undefined) {
            _this.queryFormdata2.startTM3 = null;
            _this.$message('开始时间不能为空');
            return;
          }
          if (_this.queryFormdata2.endTM3 == '' || _this.queryFormdata2.endTM3 == undefined) {
            _this.queryFormdata2.endTM3 = null;
            _this.$message('结束时间不能为空');
            return;
          }
          if (_this.queryFormdata2.endTM3 < _this.queryFormdata2.startTM3) {
            _this.$message('开始时间不能大于结束时间');
            return;
          }
          var month = (_this.queryFormdata2.startTM3.getMonth() + 1) < 10 ? '0' + (_this.queryFormdata2.startTM3.getMonth() + 1) : _this.queryFormdata2.startTM3.getMonth() + 1;
          var day = _this.queryFormdata2.startTM3.getDate() < 10 ? '0' + _this.queryFormdata2.startTM3.getDate() : _this.queryFormdata2.startTM3.getDate();
          var endTM = _this.queryFormdata2.startTM3.getFullYear() + 1 + '-' + month + '-' + day;
          var endTM1 = yufp.util.dateFormat(_this.queryFormdata2.endTM3, '{y}-{m}-{d}');
          if (endTM1 > endTM) {
            _this.$message('时间跨度最长为一年');
            return;
          }
          model.export = '1';
          var param = {
            condition: JSON.stringify(model)
          };
          var ld1 = _this.$loading({
            target: '.loadOfccd',
            body: true,
            text: '拼命加载中'
          });
          yufp.service.request({
            method: 'GET',
            data: param,
            url: backend.custpersonService + '/api/acrmFevtPerCcdTrans/querylist',
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.code == 0) {
                  var showdata = [];// 展示数据
                  if (response.data != null) {
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
                        fileName: '信用卡交易流水',
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
                            // params.url = backend.custpersonService + '/api/acrmFevtPerCcdTrans/export';
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
                  //   fileName: '信用卡交易流水',
                  //   userId: yufp.session.userId,
                  //   userName: yufp.session.userName
                  // };
                  // var params = {};
                  // params.url = backend.custpersonService + '/api/acrmFevtPerCcdTrans/export';
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
         * 存款实时余额
         */
        realTimeBAL: function () {
          var _this = this;
          var selectionsAry = _this.$refs.saveTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          acctId = selectionsAry[0].acctNo;
          _this.switchStatus8('BAL', false);
          var param = {condition: JSON.stringify({
            acctId: acctId
          })};
          _this.$nextTick(function () {
            // _this.$refs.balTable.resetFields();
            // F yufp.clone(selectionsAry[0], this.formdata);
            _this.$refs.balTable.remoteData(param);
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
          // var param = {
          //   condition: JSON.stringify({
          //     loanAcctId: loanAcctId
          //   })
          // };
          // _this.$nextTick(function () {
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
        //   model.export = '1';
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
        //   var param = {
        //     condition: JSON.stringify(model)
        //   };
        //   // console.log(JSON.stringify(_this.$refs.refTable.tableColumns));
        //   yufp.util.exportExcelByTable({
        //     fileName: '个人贷款交易流水',
        //     importType: 'service', // page当前页 selected 选中的数据  service 后端数据,selected为所选择的数据，此时不需要访问后台数据
        //     ref: _this.$refs.loanTransTable,
        //     url: backend.custpersonService + '/api/acrmfevtloanlnsacctlist/querylist',
        //     param: param
        //   });
        // },
        /**
         * 导出pdf ==个人贷款交易流水
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
          model.export = '1';
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
          window.console.log(_this.$refs.transTable);
          var ld1 = _this.$loading({
            target: '.resultOfload',
            body: true,
            text: '拼命加载中'
          });
          yufp.service.request({
            method: 'GET',
            data: param,
            url: backend.custpersonService + '/api/acrmfevtloanlnsacctlist/querylist',
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
                        fileName: '个人贷款交易流水',
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
                            // params.url = backend.custpersonService + '/api/acrmfevtloanlnsacctlist/export';
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
                  //   fileName: '个人贷款交易流水',
                  //   userName: yufp.session.userName
                  // };
                  // ld1.close();
                  // var params = {};
                  // params.url = backend.custpersonService + '/api/acrmfevtloanlnsacctlist/export';
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
         * 卡片详情
         */
        cardinfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.cardTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus3('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.cardrefForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata3);
          });
        },
        rowDblclick2: function (row, event) {
          var _this = this;
          _this.switchStatus3('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.cardrefForm.resetFields();
            yufp.clone(row, this.formdata3);
          });
        },
        /**
         * 信用卡详情
         */
        ccdinfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.ccdTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus4('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.ccdrefForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata4);
          });
        },
        rowdblclick3: function (row, event) {
          var _this = this;
          _this.switchStatus4('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.ccdrefForm.resetFields();
            yufp.clone(row, this.formdata4);
          });
        },
        /**
         * 信用卡交易流水
         */
        ccdTransList: function () {
          var _this = this;
          var selectionsAry = _this.$refs.ccdTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          acctNo = selectionsAry[0].acctNo;
          _this.switchStatus7('CCDTRANS', false);
          // _this.$nextTick(function () {
          //   var param = {
          //     condition: JSON.stringify({
          //       acctNo: acctNo
          //     })
          //   };
          //   _this.$refs.ccdTransTable.remoteData(param);
          // });
        },
        utc2beijing: function (UTCDateString) {
          if (!UTCDateString) {
            return '-';
          }
          function formatFunc (str) { // 格式化显示
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