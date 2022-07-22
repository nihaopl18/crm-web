/**
 * @created by luoshun
 * @updated by
 * @description 积分累积贡献度比例设置
 */
define(['libs/yufp/widgets/js/YufpWfInit.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('WF_APP_STATUS,STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          rules: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '字段必须为数字' }],
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          // 查询url
          dataUrl: backend.yuspClimpBparamService + '/api/loybpcontributionratio/querycontributionratiolist',
          // 表单数据
          formdata: {},
          // 弹窗是否可见
          dialogVisible: false,
          // 弹窗标题
          viewTitle: ''
        };
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
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var model = {};
          yufp.clone(_this.formdata, model);
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: _this.viewTitle === '修改' ? backend.yuspClimpBparamService + '/api/loybpcontributionratio/updatecontributionratio' : backend.yuspClimpBparamService + '/api/loybpcontributionratio/addcontributionratio',
            data: model,
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$message('操作成功');
              _this.dialogVisible = false;
            }
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
          } else if (selections[0].wfApprSts !== '000' && selections[0].wfApprSts !== '998') {
            _this.$message({ message: '只能修改待发起和否决状态数据', type: 'warning' });
            return;
          }
          _this.dialogVisible = true;
          _this.viewTitle = '修改';
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
          });
        },
        /**
         * 提交
         */
        commitFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          } else if (selections[0].wfApprSts !== '000') {
            _this.$message({ message: '不能提交该状态的数据', type: 'warning' });
            return;
          }
          var commintData = {};
          commintData.bizSeqNo = selections[0].contributionRatioId;// 流程主键
          commintData.applType = 'JFLJGXBL';// 模型版本申请类型字典项
          commintData.custName = '积分累积贡献度比例设置';
          commintData.custId = '0';
          commintData.paramMap = yufp.clone(selections[0], {});
          var load = _this.$loading();
          _this.$refs.yufpWfInit.wfInit(commintData, load);
        },
        onAfterClose: function () {
          var _this = this;
          _this.$refs.refTable.remoteData();
        },
        onAfterInit: function (data) {
        },
        /**
         * 新增
         */
        addFn: function () {
          var _this = this;
          // var tabData = {};
          // yufp.clone(tabData, _this.$refs.refTable.tabledata);
          // for (var i = 0; i < _this.$refs.refTable.tabledata.length; i++) {
          //   if (_this.$refs.refTable.tabledata[i].wfApprSts === '000' || _this.$refs.refTable.tabledata[i].wfApprSts === '998' || _this.$refs.refTable.tabledata[i].wfApprSts === '111') {
          //     _this.$message({ message: '已有记录为待发起、审批中或者否决状态，无法进行新增操作', type: 'warning' });
          //     return;
          //   }
          // }
          // _this.dialogVisible = true;
          // _this.viewTitle = '新增';
          // _this.$nextTick(function () {
          //   _this.$refs.refForm.resetFields();
          // });
          yufp.service.request({
            method: 'GET',
            url: backend.yuspClimpBparamService + '/api/loybpcontributionratio/wflist',
            callback: function (code, message, response) {
              if (response.data.length != 0) {
                _this.$message({message: '已有记录为待发起、审批中或者否决状态，无法进行新增操作', type: 'warning' });
              } else {
                _this.dialogVisible = true;
                _this.viewTitle = '新增';
                _this.$nextTick(function () {
                  _this.$refs.refForm.resetFields();
                });
              }
            }
          });
        }
      }
    });
  };
});