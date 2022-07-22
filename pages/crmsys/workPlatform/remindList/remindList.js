/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2019-1-23 15:09:19.
 * @updated by
 * @description 信息提醒
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  'libs/js-xlsx/xlsx.full.min.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CUST_GRADE,DY0009,DY0007');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          readButton: !yufp.session.checkCtrl('read'),
          viewButton: !yufp.session.checkCtrl('view'),
          sendButton: !yufp.session.checkCtrl('send'),
          dataUrl: backend.remindService + '/api/inforeminder/querylist',
          formdata: {},
          baseParams: {
            condition: JSON.stringify({
              receUser: yufp.session.userId
            })
          },
          rule: [
            { required: true, message: '必填项', trigger: 'blur' },
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          // 以下是 信息发送 功能需要的参数
          connectVisible: false,
          mesDialogVisible: false,
          curInfoId: '',
          curCustId: '',
          curCustName: '',
          typeId: '',
          typeName: '',
          curMessageInfo: '',
          active: 1,
          formTwoHide: true,
          formThreeHide: true,
          telDataUrl: '',
          finishFormData: {},
          tableEditFormdata: {}
        };
      },
      methods: {
        custSort(a, b) {
          var data1 = a.amt != '-' ? parseFloat(a.amt) : 0;
          var data2 = b.amt != '-' ? parseFloat(b.amt) : 0;
          return data1 - data2;
        },
        rowDblClick: function (row, event) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(row, _this.formdata);
          });
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 设置 信息发送 参数值
         */
        switchMesStatus: function (active, formTwoHide, formThreeHide) {
          var _this = this;
          _this.active = active;
          _this.formTwoHide = formTwoHide;
          _this.formThreeHide = formThreeHide;
        },
        // 清空obj对象 -- common
        clearObj: function (obj) {
          for (var key in obj) {
            obj[key] = null;
          }
          return obj;
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          if (_this.formdata.isRead == '0') {
            yufp.service.request({
              method: 'POST',
              url: backend.remindService + '/api/inforeminder/read',
              data: {
                userId: yufp.session.user.loginCode,
                infoIds: _this.formdata.infoId
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                }
              }
            });
          }
          _this.dialogVisible = false;
        },
        /**
         * 设为已读
         */
        readFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            if (selections[i].isRead == '1') {
              _this.$message({ message: '选中的部分存在已读的数据，请重新选择', type: 'warning' });
              return;
            }
            arr.push(selections[i].infoId);
          }
          _this.$confirm('此操作将选中数据设为已读, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.remindService + '/api/inforeminder/read',
                  data: {
                    userId: yufp.session.user.loginCode,
                    infoIds: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$message('操作成功');
                      _this.$refs.refTable.remoteData();
                    }
                  }
                });
              }
            }
          });
        },
        /**
         * 批量修改
         */
        changeCustomerStateMul: function (val) {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          var infoIds = '';
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          for (var i = 0; i < selections.length; i++) {
            if (i == 0) {
              infoIds += selections[i].infoId;
            } else {
              infoIds = infoIds + ',' + selections[i].infoId;
            }
          }
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/inforeminder/updateStat',
            data: {
              infoId: infoIds,
              operation: val
            },
            callback: function (code, message, response) {
              if (code === 0) {
                _this.$refs.refTable.remoteData();
                _this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                yufp.util.butLogInfo(hashCode, '异动提醒', '批量跟进');

              }
            }
          });
        },
        /**
         * 批量导出
         */
        exportMulFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var con = {};
          var infoIds = [];
          for (var i = 0; i < selections.length; i++) {
            infoIds.push(selections[i].infoId);
          }
          con.infoIds = infoIds;
          var url = '/api/inforeminder/export?' + 'condition=' + encodeURI(JSON.stringify(con));
          yufp.util.download(url);
          yufp.util.butLogInfo(hashCode, '异动提醒', '批量导出');
        },
        /**
         * 信息发送
         */
        mesSendFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          }
          /**
          // 选中多条数据，使用默认联系方式发送短信
          if (selections.length > 1) {
             _this.$confirm('选中多条数据,将使用客户默认联系方式立即发送短信, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true,
              callback: function (action) {
                if (action === 'confirm') {
                  var len = selections.length, arr = [];
                  for (var i = 0; i < len; i++) {
                    if (selections[i].haveSend == '1') {
                      _this.$message({ message: '选择的数据中存在不能发送短信的数据，请重新选择', type: 'warning' });
                      return;
                    }
                    var obj = {};
                    obj.infoId = selections[i].infoId;
                    obj.sendContent = selections[i].messageInfo;
                    obj.custId = selections[i].custId;
                    obj.custName = selections[i].custName;
                    obj.typeId = selections[i].typeId;
                    obj.typeName = selections[i].typeName;
                    arr.push(obj);
                  }
                  yufp.service.request({
                    method: 'POST',
                    url: backend.remindService + '/api/inforeminder/sendbatch',
                    data: JSON.stringify(arr),
                    callback: function (code, message, response) {
                      if (code == 0) {
                        _this.$message('总数:' + response.data.totalNum + '; 发送成功:' + response.data.successNum +
                          '; 发送失败:' + response.data.failNum + '; 手机号错误:' + response.data.telErrNum);
                        _this.$refs.refTable.remoteData();
                      }
                    }
                  });
                }
              }
            });**/
          // if (selections.length == 1) {
          // 选择一条数据发送信息，显示信息发送dialog
          var _this = this;
          _this.mesDialogVisible = true;
          _this.switchMesStatus(1, false, true);
          // 设置当前选中的信息编号、客户编号、短信内容， 用于信息发送dialog
          _this.curInfoId = selections[0].infoId;
          _this.curCustId = selections[0].custId;
          _this.curCustName = selections[0].custName;
          _this.typeId = selections[0].typeId;
          _this.typeName = selections[0].typeName;
          _this.curMessageInfo = selections[0].messageInfo;
          // 目前只有短信渠道，后续增加其他渠道时，需查询选中的规则对应的发送渠道
          // yufp.service.request({
          //   method: 'GET',
          //   data: {
          //     ruleId: selections[0].ruleId
          //   },
          //   url: backend.remindService + '/api/inforeminder/querysendchls',
          //   callback: function (code, message, response) {
          //     if (code == 0) {
          //       _this.sendChls = response.data;
          //     }
          //   }
          // });
        },
        backFn: function () {
          var _this = this;
          if (_this.active == 2) {
            _this.switchMesStatus(1, false, true);
          }
        },
        nextFn: function () {
          var _this = this;
          if (_this.active == 1) {
            var selections = _this.$refs.telTable.selections;
            // 验证选择一种联系方式
            if (selections.length != 1) {
              _this.$message({ message: '请选择一个联系方式', type: 'warning' });
              return;
            }
            // 如果发送渠道选择短信，联系方式必须选择手机
            var reg = /^1[3-9][0-9]\d{8}$/;
            var phone = selections[0].contMeth;
            if (phone && !reg.test(phone)) {
              _this.$message({ message: '渠道是短信，只能选择手机号码发送', type: 'warning' });
              return;
            }
            // 将选中的数据绑定到确认表单中
            _this.clearObj(_this.finishFormData);
            _this.finishFormData.sendChlName = '短信'; // tips: 默认展示短信数据，后续增加新渠道，需更改
            _this.finishFormData.rcvNum = selections[0].contMeth;
            _this.finishFormData.sendContent = _this.curMessageInfo;
            _this.switchMesStatus(2, true, false);
          }
        },
        finishFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.refFormThree.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 调用短信发送接口-单条
          yufp.service.request({
            method: 'POST',
            data: {
              infoId: _this.curInfoId,
              custId: _this.curCustId,
              rcvNum: _this.finishFormData.rcvNum,
              sendDate: yufp.util.dateFormat(_this.finishFormData.sendDate, '{y}-{m}-{d}'),
              sendTime: yufp.util.dateFormat(_this.finishFormData.sendTime),
              sendContent: _this.finishFormData.sendContent,
              custName: _this.curCustName,
              typeId: _this.typeId,
              typeName: _this.typeName
            },
            url: backend.remindService + '/api/inforeminder/send',
            callback: function (code, message, response) {
              if (code == 0 && response.data == 1) {
                _this.$message('发送信息成功');
                _this.mesDialogVisible = false;
                _this.$refs.refTable.remoteData();
              } else {
                _this.$message('发送信息失败');
                _this.mesDialogVisible = false;
              }
            }
          });
        },
        // 当操作打开时暂存当前行数据
        handleOptionVisibleChange: function (data) {
          if (data) {
            yufp.clone(data, this.tableEditFormdata);
          }
        },
        // table 选项操作点击
        handleOptionSelect: function (command) {
          switch (command) {
            case 'messageSend':
              this.connectCustomer();
              break;
            case 'noTrack':
              this.changeCustomerState();
              break;
            case 'alreadyDeal':
              this.changeCustomerState();
              break;
          }
        },
        // 联系客户
        connectCustomer: function () {
          this.connectVisible = true;
        },

        handleConnectClose: function () {
          this.connectVisible = false;
        },

        sendMessage: function () { },

        changeCustomerState: function (data, val) {
          let _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/inforeminder/updateStat',
            data: {
              infoId: data.infoId,
              operation: val
            },
            callback: function (code, message, response) {
              if (code === 0) {
                _this.$refs.refTable.remoteData();
                _this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                yufp.util.butLogInfo(hashCode, '异动提醒', '单个跟进');
              }
            }
          });
        },
        formJE: function (row, column, cellValue) {
          if (cellValue) {
            cellValue = yufp.util.dateFormat(cellValue, '{y}-{m}-{d}');
          }
          return cellValue;
        },
        // 去某个客户360视图
        toCustomer360View: function (data) {
          var _this = this;
          yufp.util.valid2jump(data.custId, function (val) {
            if (val) {
              var customKey = 'custom_view' + data.custId; // 请以custom_view前缀开头，并且全局唯一
              // var custType = row.custType;
              yufp.frame.addTab({
                // id: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 菜单功能ID（路由ID）
                id: 'customer360View', // 菜单功能ID（路由ID）
                key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                title: '客户360视图:' + data.custName, // 页签名称
                data: {
                  // id: custType == '1' ? 'f38c540fa3a842f1a9bebe5fbe881dda' : '1510d10391f64514b833c0d12d39a824', // 对公
                  cust: data,
                  custId: data.custId,
                  custName: data.custName
                } // 传递的业务数据，可选配置
              });
            } else {
              _this.$message.warning('该客户不能查看客户360视图');
            }
          });
        }
      },
      watch: {
        curCustId: function (val) {
          this.telDataUrl = backend.custpubService + '/api/acrmfcicontactinfo/querycontacklist/' + val;
        }
      }
    });
  };
});