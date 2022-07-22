/**
 * @created by 张成龙 on 2019-2-20 09:52:26
 * @updated by
 * @description 客户等级手工
 */
define(['./libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/yufpExtTree.js',
  'custom/widgets/js/YufpMgrSelector.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    // var custId = data.custId;// 获取客户id
    // CD0011 证件类型代码
    // CD0241 主协办类型
    // CD0032 客户服务等级代码  （目测更价值等级一样）
    // CD0016 客户类型代码
    yufp.lookup.reg('CD0011,CD0241,CD0032,CD0016,CD0243,CD0421');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          detailBtn: !yufp.session.checkViewCtrl('detail', data.id),
          editBtn: !yufp.session.checkViewCtrl('edit', data.id),
          dataUrl: backend.custgradeService + '/api/custgrademanualeval/querylistSingle',
          baseParams: {condition: JSON.stringify({custId: data.custId})},
          formdata: {},
          formdata5: {},
          formdata6: {},
          rule: [
            { required: true, message: '必填项' },
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          activeNames: ['2', '3'],
          // activeNames2: ['1', '2'],
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE_SERVICE_LEVEL', false),
          saveBtnShow: true,
          isCon: false,
          formdata0: {},
          APPROVE_STAT: [
            {key: '1', value: '审批中'},
            {key: '2', value: '拒绝'},
            {key: '3', value: '通过'}
          ],
          // 机构层级信息
          orglev: '',
          // 审批流组件参数
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          }
        };
      },
      methods: {
        sheacherTable: function () {
          var _this = this;
          _this.$refs.refTable.remoteData();
          // _this.$message('操作成功');
        },

        /**
          * 格式化 时间
          */
        formData: function (row, column, cellValue) {
          if (cellValue == '' || cellValue == undefined) {
            return '';
          }
          var dateee = new Date(cellValue).toJSON();
          var date = new Date(+new Date(dateee) + (8 * 3600 * 1000)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
          return date.split(' ')[0];
        },
        /**
         * 评级调整
         */
        custTz: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selectionsAry[0].approveStat == '1') {
            _this.$message({ message: '请选择不在审批中的数据', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          var param = {
            condition: JSON.stringify({
              custId: selectionsAry[0].custId
            })
          };
          // var selectData = {};
          yufp.service.request({
            method: 'GET',
            url: backend.custgradeService + '/api/custgrademanualeval/querybussinfo',
            data: param,
            callback: function (code, message, response) {
              _this.dialogVisible = true;
              if (response.data[0].custType == '1') {
                _this.isCon = false;
              } else if (response.data[0].custType == '2') {
                _this.isCon = true;
              }
              _this.$nextTick(function () {
                _this.$refs.refForm.resetFields();
                _this.$refs.refForm5.resetFields();
                _this.$refs.refForm0.resetFields();
                _this.$refs.refForm6.resetFields();
                // 使用 AJAX 后台访问赋值
                _this.formdata0.custId = selectionsAry[0].custId;
                _this.formdata0.custName = selectionsAry[0].custName;
                _this.formdata0.curSerLevel = selectionsAry[0].servLev;
                _this.formdata6.servLev = selectionsAry[0].servLev;
                _this.formdata0.servLev = selectionsAry[0].servLev;
                if (response.data.length > 0) {
                  yufp.clone(response.data[0], _this.formdata5);
                  yufp.clone(response.data[0], _this.formdata6);
                }
              });
            }
          });
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
          var model = {};
          yufp.clone(_this.formdata0, model);
          yufp.clone(_this.formdata5, model);
          yufp.clone(_this.formdata6, model);
          // yufp.clone(_this.formdata1, model);
          // yufp.clone(_this.formdata2, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var selectionsAry = _this.$refs.refTable.selections;
          var param1 = {
            condition: JSON.stringify({
              custId: selectionsAry[0].custId,
              loginCode: yufp.session.userId
            })
          };
          yufp.service.request({
            method: 'GET',
            url: backend.custgradeService + '/api/custgrademanualeval/getMgrType',
            data: param1,
            callback: function (code, message, response) {
              if (response.data != '1') {
                _this.$message('非主办客户经理不能进行评级调整');
                return;
              } else {
                yufp.service.request({
                  method: 'POST',
                  url: backend.custgradeService + '/api/custgrademanualeval/apply',
                  data: model,
                  callback: function (code, message, response) {
                    // _this.$refs.refTable.remoteData();
                    // _this.$message('操作成功');
                    if (response.code != 0) {
                      _this.$message({ message: response.message, type: 'warning' });
                      _this.sheacherTable();
                      _this.dialogVisible = false;
                      return;
                    }
                    var dataArr = response.data.split(',');
                    _this.dialogVisible = false;
                    // 通过层级判断走哪个审批流
                    var commintData = {};
                    // 服务等级手工评定    FWDJSGPD
                    commintData.applType = 'FWDJSGPD';
                    commintData.paramMap = {
                      orgLevel: dataArr[1]
                    }; // 流程主键
                    commintData.bizSeqNo = dataArr[0];
                    commintData.custId = yufp.session.userId;
                    commintData.custName = yufp.session.userName;
                    _this.$refs.approvalRef.wfInit(commintData);
                  }
                });
              }
            }
          });
          // 向后台发送保存请求
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
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
          _this.switchStatus('DETAIL', false);
          if (selectionsAry[0].custType == '1') {
            _this.isCon = false;
          } else if (selectionsAry[0].custType == '2') {
            _this.isCon = true;
          }
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.$refs.refForm5.resetFields();
            _this.$refs.refForm0.resetFields();
            _this.$refs.refForm6.resetFields();
            this.formdata0.curSerLevel = selectionsAry[0].valueLev;
            yufp.clone(selectionsAry[0], _this.formdata0);
            yufp.clone(selectionsAry[0], _this.formdata5);
            yufp.clone(selectionsAry[0], _this.formdata6);
          });
        }
      }
    });
  };
});