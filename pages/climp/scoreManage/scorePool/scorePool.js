/**
 * @created by luoshun
 * @updated by
 * @description 积分池定义
 */
define(['custom/widgets/js/YufpWfInit.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('UPPER_LIMIT,WF_APP_STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var checkNum = function (rule, value, callback) {
          if (!value) {
            return callback(new Error('字段不能为空'));
          }
          if (Number(value) > 100 || Number(value) < 0) {
            callback(new Error('字段的值必须在0-100之间'));
          } else {
            callback();
          }
        };
        return {
          dataUrl: '/api/pool/poolquery',
          // 表单数据
          formdata: {},
          // 弹窗是否可见
          dialogVisible: false,
          // 弹窗标题
          viewTitle: '',
          // 是否详情窗口
          // isInfo: false,
          // 保存按钮是否可见
          saveBtnShow: true,
          // 表单项是否隐藏
          isHidden: true,
          // 编号是否显示
          isAdjust: true,
          options: [{
            key: '01',
            value: '审批通过'
          }, {
            key: '02',
            value: '审批不通过'
          }, {
            key: '03',
            value: '审批中'
          }, {
            key: '04',
            value: '暂存'
          }],
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          // 积分池下拉框
          poolList: [],
          // 表单禁用
          formDisabled: false,
          // 提交按钮式否显示
          // commitBtnShow: false,
          poolUrl: '/api/pool/poolparentid',
          rules: {
            poolName: [{ required: true, message: '字段不能为空' }, {max: 100, message: '长度不能超过100个字符', trigger: 'blur'}],
            remark: [ {max: 1024, message: '长度不能超过1024个字符', trigger: 'blur'}],
            warnThreshold: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '字段必须为数字' }, { validator: checkNum }],
            poolScoreInitial: [{max: 10, message: '长度不能超过10个字符', trigger: 'blur'},
              { required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '字段必须为数字' }],
            warnPhoneNo: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.mobile, message: '字段必须是手机号码' }]
          }
        };
      },
      created: function () {
        var _this = this;
        // 父积分池查询
        yufp.service.request({
          method: 'GET',
          url: '/api/pool/poolparentid',
          callback: function (code, message, response) {
            if (code == 0) {
              var data = response.data;
              if (data.length) {
                for (var i = 0; i < data.length; i++) {
                  _this.poolList.push(data[i]);
                }
              }
            }
          }
        });
      },
      methods: {
        // 日期格式化
        dateFormatter: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d} {h}:{i}:{s}');
        },
        selectFormatter: function (row, column) {
          var val = row[column.property];
          if (val === undefined || !this.poolList.length) {
            return '';
          }
          for (var i = 0; i < this.poolList.length; i++) {
            if (this.poolList[i].key == val) {
              return this.poolList[i].value;
            }
          }
        },
        // 监听父积分池的改变
        poolChange: function (val) {
          var _this = this;
          if (val) {
            yufp.service.request({
              method: 'POST',
              url: '/api/pool/getlimitscore',
              data: { poolId: val },
              callback: function (code, message, response) {
                if (code == 0) {
                  var data = response.data[0];
                  data && (_this.formdata.surplusScore = data.surplusscore);
                  // data && (_this.formdata.upperLimit = data.upperLimit);
                }
              }
            });
          }
        },
        /**
         * 控制保存按钮、提交按钮、xdialog、表单的状态
         * @param viewTitle 表单名称
         * @param isInfo 可编辑,默认false
         */
        switchStatus: function (viewTitle, isInfo) {
          var _this = this;
          _this.dialogVisible = true;
          // _this.isInfo = isInfo;
          _this.isAdjust = true;
          _this.isHidden = !isInfo;
          _this.rule = '';
          _this.rule1 = 'required';
          _this.saveBtnShow = !isInfo;
          _this.viewTitle = viewTitle;
          _this.formDisabled = isInfo;
        },
        /**
         * 新增
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('新增', false);
          _this.rule1 = '';
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var wfApprSts = selectionsAry[0].wfApprSts;
          if (wfApprSts == '111') {
            _this.$message({ message: '不能修改审批中的数据！', type: 'warning' });
            return;
          }
          _this.switchStatus('修改', false);
          _this.isAdjust = false;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = selectionsAry[0];
            obj.poolParentId && _this.poolChange(obj.poolParentId);
            yufp.clone(obj, _this.formdata);
          });
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('详情', true);
          _this.isAdjust = false;
          _this.rule = 'required';
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = selectionsAry[0];
            obj.poolParentId && _this.poolChange(obj.poolParentId);
            yufp.clone(obj, _this.formdata);
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          var wfApprSts = selectionsAry[0].wfApprSts;
          // 未选中则返回
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (wfApprSts != '000' && wfApprSts != '998') {
            _this.$message({ message: '不能删除审批中/通过的数据！', type: 'warning' });
            return;
          }
          var len = selectionsAry.length, arr = [];
          var arr2 = [];
          for (var i = 0; i < len; i++) {
            arr.push(selectionsAry[i].poolNo);
            arr2.push(selectionsAry[i].poolId);
          }
          yufp.service.request({
            method: 'POST',
            async: false,
            url: '/api/pool/delcheck',
            data: {
              poolNo: arr.join(',')
            },
            callback: function (code, message, response) {
              var num = response.data[0].num;
              if (num == 0) {
                // 确认是否删除
                _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  center: true,
                  callback: function (action) {
                    if (action === 'confirm') {
                      yufp.service.request({
                        method: 'POST',
                        url: '/api/pool/delpool',
                        data: {
                          ids: arr2.join(',')
                        },
                        callback: function (code, message, response) {
                          _this.$refs.refTable.remoteData();
                          _this.$message('操作成功');
                        }
                      });
                    }
                  }
                });
              } else {
                _this.$message('积分池已被引用不能删除！');
                return;
              }
            }
          });
        },
        /**
         * 工具按钮中的提交
         */
        commitFn: function () {
          var _this = this;
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
          // 提交流程参数
          var commintData = {};
          commintData.bizSeqNo = selections[0].poolId;// 流程主键
          commintData.applType = 'SCPOOL';// 模型版本申请类型字典项
          commintData.custName = selections[0].poolName;
          commintData.custId = selections[0].poolNo;
          commintData.paramMap = {
            bussOpId: selections[0].poolNo,
            bussOpName: 'scorepool'
          };
          var load = _this.$loading();
          _this.$refs.yufpWfInit.wfInit(commintData, load);
        },
        /**
         * 修改表单时提交
         */
        commitAllFn: function () {
          var _this = this;
          // 提交流程参数
          var commintData = {};
          commintData.bizSeqNo = _this.formdata.poolId;// 流程主键
          commintData.applType = 'SCPOOL';// 模型版本申请类型字典项
          commintData.custName = '0';
          commintData.custId = '0';
          commintData.paramMap = {
            bussOpId: _this.formdata.poolNo,
            bussOpName: 'scorepool'
          };
          var load = _this.$loading();
          _this.$refs.yufpWfInit.wfInit(commintData, load);
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
          var repeat = false;
          // 是否达到上限
          var limit = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          // 表单校验未通过直接返回
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.formdata, model);
          if (_this.viewTitle === '新增') {
            model['createOrg'] = orgid;
          } else {
            model['updateOrg'] = orgid;
          }
          if (model.poolParentId) {
            yufp.service.request({
              method: 'POST',
              async: false,
              url: '/api/pool/checkpool',
              data: model,
              callback: function (code, message, response) {
                var num = response.data[0].num;
                if (num == 0) {
                  limit = true;
                };
              }
            });
          }
          // 校验积分池名字是否存在
          yufp.service.request({
            method: 'POST',
            async: false,
            url: '/api/pool/checkpoolname',
            data: model,
            callback: function (code, message, response) {
              var num = response.data[0].num;
              if (num != 0) {
                repeat = true;
              };
            }
          });
          if (limit == true) {
            _this.$message('超出父积分池上限！');
            return;
          } else if (repeat == true) {
            _this.$message('积分池名字已存在！');
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: _this.viewTitle === '新增' ? '/api/pool/addpool' : '/api/pool/updatepool',
            data: model,
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$message('操作成功');
              _this.dialogVisible = false;
            }
          });
        },
        onAfterClose: function () {
        },
        // 提交页面关闭前
        onAfterInit: function (data) {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          var model = {};
          model.poolId = selections[0].poolId;
          model.wfApprSts = '111';
          yufp.service.request({
            method: 'POST',
            url: '/api/pool/updatests',
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