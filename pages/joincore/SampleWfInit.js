
define([
  './custom/widgets/js/YufpWfInit.js'
], function (require, exports) {
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('ZB_BIZ_CATE');
    yufp.lookup.reg('SEX_TYPE');
    yufp.lookup.reg('HIGHEST_EDU');
    yufp.custom.vue({
      el: '#SampleWfInit',
      data: function () {
        return {
          height: yufp.custom.viewSize().height - 100,
          urls: {
            dataUrl: backend.example + '/api/joindemo/queryAllWfiDemo' // 流程示例列表
          },
          dialogFormVisible: false,
          dataParams: {},
          title: '流程发起',
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          tableColumns: [
            { label: '申请流水号', prop: 'logicSeq', resizable: true },
            { label: '流程实例号', prop: 'instanceId', resizable: true },
            { label: '客户ID', prop: 'custId', resizable: true },
            { label: '客户名称', prop: 'custName', resizable: true },
            { label: '性别', prop: 'sex', resizable: true, dataCode: 'SEX_TYPE'},
            { label: '贷款金额（元）', prop: 'money', resizable: true },
            { label: '最高学历', prop: 'highestEdu', resizable: true, dataCode: 'HIGHEST_EDU'},
            { label: '当前节点', prop: 'nodeId', resizable: true },
            { label: '节点处理人', prop: 'nodeUser', resizable: true},
            { label: '申请类型', prop: 'currentAction', resizable: true, dataCode: 'ZB_BIZ_CATE'}
          ],
          updateFields: [{
            columnCount: 2,
            fields: [
              {
                field: 'logicSeq', label: '申请流水号', type: 'input', disabled: true, rules: []
              },
              {
                field: 'custId',
                label: '客户ID',
                type: 'input',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' },
                  { max: 32, message: '最大长度不超过100个字符', trigger: 'blur' }
                ]
              },
              {
                field: 'custName',
                label: '客户名称',
                type: 'input',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' },
                  { max: 32, message: '最大长度不超过100个字符', trigger: 'blur' }
                ]
              },
              {
                field: 'sex',
                label: '性别',
                type: 'select',
                dataCode: 'SEX_TYPE',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }
                ]
              },
              {
                field: 'highestEdu',
                label: '最高学历',
                type: 'select',
                dataCode: 'HIGHEST_EDU',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }
                ]
              },
              {
                field: 'money',
                label: '贷款金额（元）',
                type: 'input',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' },
                  { max: 32, message: '最大长度不超过100个字符', trigger: 'blur' }
                ]
              },
              {
                field: 'currentAction',
                label: '申请类型',
                type: 'select',
                dataCode: 'ZB_BIZ_CATE',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' }
                ]
              }
            ]
          }],
          WfInitForm: {
            logicSeq: '',
            custId: '',
            custName: '',
            currentAction: '',
            instanceId: '',
            nodeId: '',
            nodeUser: '',
            sex: '',
            highestEdu: '',
            money: ''
          }
        };
      },
      mounted: function () {
      },
      methods: {
        WfInitFn: function () {
          var me = this;
          me.dialogFormVisible = true;
          var myDate = new Date();
          me.logicseq = myDate.getTime();
          me.$nextTick(function () {
            me.$refs.WfInitForm.formModel.logicSeq = me.logicseq;
          });
        },
        saveFn: function (val) { // 提交
          var me = this;
          var myform = me.$refs.WfInitForm;
          me.applType = me.$refs.WfInitForm.formModel.currentAction;
          myform.validate(function (valid) {
            if (valid) {
              var comitData = {};
              yufp.extend(comitData, myform.formModel);
              yufp.service.request({// 保存基本信息
                url: backend.example + '/api/joindemo/addWfiDemo',
                data: comitData,
                method: 'POST',
                callback: function (code, message, response) {
                  if (response.data == true) {
                    comitData.bizSeqNo = me.logicseq;
                    comitData.applType = me.applType;
                    comitData.exv10 = val;
                    me.$refs.yufpWfInit.wfInit(comitData);
                    yufp.util.butLogInfo(hashCode, '流程发起示例', '新增成功');
                  } else {
                    me.$message({ message: '提交失败', type: 'error' });
                  }
                }
              });
            } else {
              me.$message({ message: '请检查输入项是否合法', type: 'warning' });
              return false;
            }
          });
        },
        beforeClose: function () {
          this.$refs.WfInitForm.resetFields();
        },
        onAfterClose: function () {
          var me = this;
          var myDate = new Date();
          me.logicseq = myDate.getTime();
          me.$nextTick(function () {
            me.$refs.WfInitForm.formModel.logicSeq = me.logicseq;
          });
        },
        onAfterInit: function (data) {
          var me = this;
          me.$refs.WfInitForm.resetFields();
          me.dialogFormVisible = false;
          // yufp.router.to("9fd7eeb0f48a4e3f95c5c285aa12c32b", null, 'SampleWfInit');
          me.$refs.WfInitList.remoteData();
        }
      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});