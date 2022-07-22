/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-1-21 13:58:21.
 * @updated by
 * @description 客户信息提醒
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发 尼玛
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0016,CD0258');
    var custId = data.custId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          sendBtn: !yufp.session.checkViewCtrl('send', data.id),
          detailBtn: !yufp.session.checkViewCtrl('detail', data.id),
          dataUrl: backend.custpersonService + '/api/ocrmfwpremindinfo/queryList/' + custId,

          activeName: 'remind',
          treeParams: {
            placeholder: '提醒类别',
            needCheckbox: true,
            dataUrl: backend.remindService + '/api/inforeminderrule/querytree',
            dataId: 'typeId',
            dataLabel: 'typeName',
            dataPid: 'upTypeId'
          },
          formdata: {},
          viewType: 'DETAIL',
          dialogVisible: false,
          formDisabled: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          remindBtnShow: true,
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
          telDataUrl: backend.custpubService + '/api/acrmfcicontactinfo/querycontacklist/' + custId,
          finishFormData: {}
        };
      },
      methods: {
        /**
         * 信息提醒详情返回
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        handleClick: function () {

        },
        /**
         * 信息提醒
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.remindBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },

        rowDblClick: function (row, event) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.remindForm.resetFields();
            yufp.clone(row, _this.formdata);
          });
        },
        switchMesStatus: function (active, formTwoHide, formThreeHide) {
          var _this = this;
          _this.active = active;
          _this.formTwoHide = formTwoHide;
          _this.formThreeHide = formThreeHide;
        },
        clearObj: function (obj) {
          for (var key in obj) {
            obj[key] = null;
          }
          return obj;
        },
        checkDate: function () {
          var _this = this;
          // alert(_this.$refs.seachForm.formdata.startTM);
          // alert(_this.$refs.seachForm.formdata.endTM);
          if (_this.$refs.seachForm.formdata.startTM > _this.$refs.seachForm.formdata.endTM && _this.$refs.seachForm.formdata.endTM != '') {
            _this.$message('提醒到期日不能小于提醒生成日期！');
          }
        },
        /**
         * 信息提醒详情
         */
        remindinfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.remindTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.remindForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        },
        mesSendFn: function () {
          var _this = this;
          var selections = _this.$refs.remindTable.selections;
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
                    if (selections[i].haveSend === '1') {
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
                        _this.$refs.remindTable.remoteData();
                      }
                    }
                  });
                }
              }
            });
            */

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
        backFn: function () {
          var _this = this;
          if (_this.active == 2) {
            _this.switchMesStatus(1, false, true);
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
                _this.$refs.remindTable.remoteData();
              } else {
                _this.$message('发送信息失败');
                _this.mesDialogVisible = false;
              }
            }
          });
        }
      }
    });
  };
});