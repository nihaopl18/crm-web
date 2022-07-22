/**
 * @created by luoshun
 * @updated by
 * @description MCC白名单
 */
define(['libs/yufp/widgets/js/YufpWfInit.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('WF_APP_STATUS,LIST_TYPE,DISCOUNT_TYPE,CARD_TYPE,ENABLE_SIGN');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          options1: [{
            key: '01',
            value: '餐饮类'
          }, {
            key: '02',
            value: '非法类'
          }, {
            key: '03',
            value: '公益类'
          }, {
            key: '04',
            value: '民生类'
          }, {
            key: '05',
            value: '一般类'
          }, {
            key: '06',
            value: '一般类（境外）'
          }
          ],
          options2: [{
            key: '01',
            value: '服务提供商'
          }, {
            key: '02',
            value: '减免类'
          }, {
            key: '03',
            value: '优惠类'
          }
          ],
          options3: [{
            key: '01',
            value: '信用卡'
          }, {
            key: '02',
            value: '借记卡'
          }
          ],
          options4: [{
            key: '01',
            value: '是'
          }, {
            key: '02',
            value: '否'
          }
          ],
          dataUrl: backend.yuspClimpBparamService + '/api/whitelist/getlist',
          rules: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '字段必须为数字' }],
          // 表单数据
          formdata: {},
          // 弹窗是否可见
          dialogVisible: false,
          // MCC编号隐藏
          mccIdDisabled: false,
          // 弹窗标题
          viewTitle: ''
        };
      },
      methods: {
        cardTypeFormatter: function (row, column) {
          var val = row[column.property];
          if (val == undefined) {
            return '';
          }
          // var value = val.split(',');
          if (val == '1') {
            return '信用卡';
          } else if (val == '2') {
            return '借记卡';
          } else {
            return '信用卡,借记卡';
          }
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
          var validate = false;
          var orgid = yufp.session.org.id;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          };
          var model = {};
          yufp.clone(_this.formdata, model);
          if (_this.viewTitle === '新增') {
            model['createOrg'] = orgid;
            var param = {
              condition: JSON.stringify({
                mccId: model.mccId
              })
            };
            yufp.service.request({
              method: 'GET',
              url: backend.yuspClimpBparamService + '/api/whitelist/getmccid',
              data: param,
              // 新增时判断MCC编号是否重复
              callback: function (code, message, response) {
                if (response.data.length > 0) {
                  _this.$message({message: 'MCC编号已存在', type: 'warning' });
                } else {
                  // 向后台发送保存请求;
                  yufp.service.request({
                    method: 'POST',
                    url: backend.yuspClimpBparamService + '/api/whitelist/addwhite',
                    // url: _this.viewTitle === '新增' ? backend.yuspClimpBparamService + '/api/whitelist/addwhite' : backend.yuspClimpBparamService + '/api/whitelist/updatewhite',
                    data: model,
                    callback: function (code, message, response) {
                      _this.$refs.refTable.remoteData();
                      _this.$message('操作成功');
                      _this.dialogVisible = false;
                    }
                  });
                }
              }
            });
          } else {
            // 修改保存
            model['updateOrg'] = orgid;
            yufp.service.request({
              method: 'POST',
              url: backend.yuspClimpBparamService + '/api/whitelist/updatewhite',
              // url: _this.viewTitle === '新增' ? backend.yuspClimpBparamService + '/api/whitelist/addwhite' : backend.yuspClimpBparamService + '/api/whitelist/updatewhite',
              data: model,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
                _this.dialogVisible = false;
              }
            });
          }
          // var param = {
          //   condition: JSON.stringify({
          //     mccId: model.mccId
          //   })
          // };
          // yufp.service.request({
          //   method: 'GET',
          //   url: backend.yuspClimpBparamService + '/api/whitelist/getmccid',
          //   data: param,
          //   callback: function (code, message, response) {
          //     if (response.data.length > 0) {
          //       _this.$message({message: 'MCC编号已存在', type: 'warning' });
          //     } else {
          //       // 向后台发送保存请求;
          //       yufp.service.request({
          //         method: 'POST',
          //         url: _this.viewTitle === '新增' ? backend.yuspClimpBparamService + '/api/whitelist/addwhite' : backend.yuspClimpBparamService + '/api/whitelist/updatewhite',
          //         data: model,
          //         callback: function (code, message, response) {
          //           _this.$refs.refTable.remoteData();
          //           _this.$message('操作成功');
          //           _this.dialogVisible = false;
          //         }
          //       });
          //     }
          //   }
          // });
        },
        /**
         * 新增
         */
        addFn: function () {
          var _this = this;
          _this.viewTitle = '新增';
          _this.dialogVisible = true;
          _this.mccIdDisabled = false;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var wfApprSts = selections[0].wfApprSts;
          if (wfApprSts == '111') {
            _this.$message({ message: '不可修改审批中的数据！', type: 'warning' });
            return;
          }
          _this.viewTitle = '修改';
          _this.dialogVisible = true;
          _this.mccIdDisabled = true;
          selections[0].cardType = selections[0].cardType.split(',');
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = selections[0];
            yufp.clone(obj, _this.formdata);
          });
        },
        /**
         * 审批
         */
        approveFn: function () {
          var _this = this;
          _this.$refs.yufpWfInit.resetFields;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var wfApprSts = selections[0].wfApprSts;
          if (wfApprSts != '000') {
            _this.$message({ message: '只能提交状态为待发起的数据！', type: 'warning' });
            return;
          }
          // 发起审批流程
          var commintData = {};
          commintData.bizSeqNo = selections[0].id;// 流程主键
          commintData.applType = 'WHITELIST';// 模型版本申请类型字典项
          commintData.custName = 'MCC编号' + selections[0].mccId;
          commintData.custId = selections[0].mccId;
          commintData.paramMap = {
            bussOpId: selections[0].mccId,
            bussOpName: 'mcc'
          };
          var load = _this.$loading();
          _this.$refs.yufpWfInit.wfInit(commintData, load);
        },
        onAfterClose: function () {
        },
        // 提交页面关闭前
        onAfterInit: function (data) {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          var model = {};
          model.id = selections[0].id;
          model.wfApprSts = '111';
          yufp.service.request({
            method: 'POST',
            url: backend.yuspClimpBparamService + '/api/whitelist/updatests',
            data: model,
            callback: function (code, message, response) {
              if (code == 0) {
                _this.$refs.refTable.remoteData();
                _this.$message({ message: '提交成功', type: 'warning' });
              }
            }
          });
        }
      }
    });
  };
});