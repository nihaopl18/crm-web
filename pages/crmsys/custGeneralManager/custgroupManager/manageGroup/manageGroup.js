/**
* @author houyx3
* @since 2018/07/06.
* @description 客户群管理功能，有增删改查方法以及打开客户群视图方法
*/

/** 引入相关JS文件 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/yufpUploadTable.js',
  'custom/widgets/js/yufpCustGroup.js',
  './custom/widgets/js/yufpUploadTable.js',
  'custom/widgets/js/YufpUserSelector.js',
  'custom/widgets/js/yufpProdSelector.js',
  'custom/widgets/js/YufpMgrSelector.js',
  'custom/widgets/js/yufpOrgTree.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('KHLY,MAR_ACT_TYPE,MAR_CHANEL,EXE_OBJ_TYPE,BUS_FITCUST,BUS_TYPE,CD0016,CD0019,CD0339,CD0340,CD0337');
    var vm = yufp.custom.vue({
      el: '#exampleEdit',
      data: function () {
        var _this = this;
        var checkName = function (rule, value, callback) {
          var isExist = false;
          var param = {
            condition: JSON.stringify({
              custGroupName: value
            })
          };
          yufp.service.request({
            url: backend.adminService + '/api/ocrmfcicgbase/checkName',
            method: 'get',
            data: param,
            async: false,
            callback: function (code, message, response) {
              if (response.data == 0) {
                isExist = true;
              }
              if (isExist) {
                callback();
              } else {
                callback(new Error('用户名已经存在!'));
              }
            }
          });
        }; 
        return {
          groupviewButton: !yufp.session.checkCtrl('groupview'),
          addButton: !yufp.session.checkCtrl('add'),
          delButton: !yufp.session.checkCtrl('del'),
          createButton: !yufp.session.checkCtrl('create'),
          genbopButton: !yufp.session.checkCtrl('genbop'),
          active: 0,
          step: true,
          step1: false,
          step2: false,
          dialogVisible: false,
          uploadDialog: false,
          // 生成商机功能参数
          busOprHandVisible: false,
          custDisabled: true,
          busOprHandFormdata: {},
          prodDataUrl: backend.adminService + '/api/mkt/actiprodlistquery',
          // 目标客户信息
          custDataUrl: backend.adminService + '/api/ocrmfcicgmember/memberlist',
          atcDataUrl: backend.adminService + '/api/mkt/actifilelistquery',
          taskDataUrl: backend.adminService + '/api/mkt/actitargetlistquery',
          taskOrgDataUrl: backend.adminService + '/api/adminsmorg/querypage',
          attachDataUrl: backend.adminService + '/api/mkt/actifilelistquery',
          fprodParams: { condition: JSON.stringify({ actiId: '' }) },
          custParams: {},
          actModel: {},
          OrgParams: { condition: JSON.stringify({ unitOrgId: '' }) },
          prodParams: { condition: JSON.stringify({ actiId: '' }) },
          isAcitiveAdd: true,
          isProductAdd: false,
          isTaskAllot: false,
          isCustomAdd: false,
          isAttachmentAdd: false,
          showType: 'isAcitiveAdd',
          infoDisabled: false,
          activeAddFormdata: {},
          editDisabled: false,
          // tableLoading: false,
          showTask: '',
          // 目标客户数据
          custTableData: [],
          taskAllotFormdata: [],
          taskManTabledata: [],
          taskOrgTabledata: [],
          attchTableData: [],
          taskManTableSec: [],
          taskAllotTable2Data: [],
          actiModeOptions: [
            {
              'key': '0',
              'value': '厅堂营销'
            },
            {
              'value': '扫街活动',
              'key': '1'
            }, {
              'value': '重点客户拜访',
              'key': '2'
            }, {
              'value': '户外活动（进市场、进厂企、进学校）',
              'key': '3'
            }, {
              'value': '慈善公益',
              'key': '4'
            }, {
              'value': '金融宣传教育',
              'key': '5'
            }, {
              'value': '客户答谢会',
              'key': '6'
            }, {
              'value': '客户交流会',
              'key': '7'
            }, {
              'value': '跨业联盟',
              'key': '8'
            }, {
              'value': '沙龙',
              'key': '9'
            }, {
              'value': '讲座',
              'key': '10'
            }, {
              'value': '产品营销会',
              'key': '11'
            },
            {
              'value': '积分活动',
              'key': '12'
            }, {
              'value': '沙龙',
              'key': '13'
            }, {
              'value': '社区活动',
              'key': '14'
            }, {
              'value': '其它',
              'key': '15'
            }
          ],
          /** 营销活动相关 */
          activeName: 'first',
          selectProdInfo: '', // 产品选择组件选中的产品信息
          prodParam: {tabCheckbox: true}, // 设置产品管理组件是否可以复选
          selectCustInfo: '', // 客户组件选中信息
          selectCustGroup: '', // 客户群组件选中信息
          taskInfo: [], // 选中的指标信息
          orgtargetParams: { condition: JSON.stringify({ actiId: '' }) },
          tableKey: 0, // 指标选择中的key
          taskUserTabledat: [], // 客户经理指标值
          usertargetParams: { condition: JSON.stringify({ actiId: '' }) },
          pstartDate: { // 有效期开始日期小于结束日期
            disabledDate: function (time) {
              var beginDateVal = _this.activeAddFormdata.pendDate;
              if (time.getTime() < Date.now() - 8.64e7) {
                return true;
              }
              if (beginDateVal) {
                return time.getTime() > beginDateVal;
              }
            }
          },
          pendDate: { // 有效期结束日期大于开始日期
            disabledDate: function (time) {
              var beginDateVal = _this.activeAddFormdata.pstartDate;
              if (time.getTime() < Date.now() - 8.64e7) {
                return true;
              }
              if (beginDateVal) {
                return time.getTime() < beginDateVal;
              }
            }
          },
          pendDate1: { // 有效期结束日期大于开始日期
            disabledDate: function (time) {
              if (time.getTime() < Date.now() - 8.64e7) {
                return true;
              }
            }
          },
          numberType: [{ required: true, message: '字段不能为空' }, {max: 12, message: '长度不能超过12个字符', trigger: 'blur'},
            { validator: yufp.validator.number, message: '字段只能为数字', trigger: 'change'}],
          params: {tabCheckbox: false}, // 设置用户管理组件是否可以复选
          ifFile: false, // 是否客户操作附件信息
          fileParams: { condition: JSON.stringify({ busNo: '' }) },
          fileDataParams: {}, // 附件上传时候的参数
          prodTaskInfoUrl: backend.adminService + '/api/mkt/getindexinfobyprod', // 查询指标信息根据产品编号
          prodIndexParams: { condition: JSON.stringify({ prodId: '' }) },
          taskInfoVisible: false, // 指标选择框弹出控制
          /** 查询字段 */
          queryFields: [
            {placeholder: '客户群分类', field: 'custGroupType', type: 'select', dataCode: 'KHQLX'},
            {placeholder: '客户来源', field: 'custOrigin', type: 'select', dataCode: 'CD0340'},
            {placeholder: '客户群名称', field: 'custGroupName', type: 'input'},
            {placeholder: '群成员类型', field: 'groupMemberType', type: 'select', dataCode: 'CD0339'},
            {placeholder: '共享范围', field: 'shareScope', type: 'select', dataCode: 'CD0337'},
            {placeholder: '客户号', field: 'custId', type: 'input'},
            {placeholder: '客户名称', field: 'custName', type: 'input'},
            {placeholder: '客户证件类型', field: 'identType', type: 'select', dataCode: 'CD0011'},
            {placeholder: '客户证件号码', field: 'identNo', type: 'input'},
            {placeholder: '创建机构', field: 'createBrchNo', type: 'custom', is: 'yufp-org-tree'},
            {placeholder: '客户经理',
              field: 'belongMgr',
              type: 'custom',
              is: 'yufp-mgr-selector'},
            {placeholder: '创建起始日', field: 'createDate', type: 'date'},
            {placeholder: '创建截止日', field: 'endDate', type: 'date'}
          ],
          /** 搜索重置按钮 */
          queryButtons: [
            {label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
              /** 校验有效性，必填项不能为空 */
                if (valid) {
                  var ld1 = _this.$loading({
                    target: '.test',
                    body: true,
                    text: '拼命加载中'
                  });
                  // model.oneOrg = _this.oneOrg;
                  // _this.$refs.reftable.tableLoading = true;
                  model.oneOrg = yufp.session.org.id;
                  model.userId = yufp.session.userId;
                  model.orgCode = yufp.session.org.id;
                  var param = { condition: JSON.stringify(model) };
                  yufp.service.request({
                    method: 'GET',
                    url: _this.Url,
                    data: param,
                    callback: function (code, message, response) {
                      // _this.$refs.reftable.tableColumns = _this.tableColumns;
                      // _this.$refs.reftable.data = response.data;
                      // _this.$refs.reftable.total = response.total;
                      ld1.close();
                    }
                  });
                  _this.$refs.reftable.remoteData(param);
                }
              }
            },
            {label: '重置',
              op: 'reset',
              type: 'primary',
              icon: 'yx-loop2',
              click: function (model, valid) {
                _this.$refs.myform.$refs.belongMgr[0].value = '';
              } }
          ],
          /** 页面显示字段 */
          tableColumns: [ 
            {label: '客户群编号', prop: 'custGroupId', width: '100', resizable: true},
            {label: '客户群名称', prop: 'custGroupName', width: '120', resizable: true},
            {label: '客户群分类', prop: 'custGroupType', width: '100', resizable: true, dataCode: 'KHQLX'},
            {label: '客户来源', prop: 'custOrigin', width: '100', resizable: true, dataCode: 'CD0340'},
            {label: '群成员类型', prop: 'groupMemberType', width: '120', resizable: true, dataCode: 'CD0339'},
            {label: '共享范围', prop: 'shareScope', width: '100', resizable: true, dataCode: 'CD0337'},
            {label: '成员数', prop: 'memNum', resizable: true,width:'80'},
            {label: '创建日期', prop: 'createDate', resizable: true,width:'140'},
            {label: '创建人', prop: 'userName', resizable: true},
            { label: '创建人ID', prop: 'userId', hidden: true },
            {label: '创建机构', prop: 'orgName', resizable: true,width:'120'},
            {label: '最近修改日期', prop: 'updateDate', resizable: true,width:'140'}
          ],
          // 新增展示字段
          addFields: [{
            columnCount: 2,
            fields: [
              {label: '客户群分类',
                field: 'custGroupType',
                dataCode: 'KHQLX',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur' }],
                type: 'select'
              },
              {label: '客户来源',
                field: 'custOrigin',
                dataCode: 'KHLY',
                // type: 'custom',
                // is: 'yufp-user-selector'
                rules: [
                  {required: true, message: '必填项', trigger: 'blur' }],
                type: 'select',
                change: function (value, model, c) {
                  // 当客户来源字段选择为“自动筛选”时
                  _this.$refs.refformAdd.switch('groupMemberType', 'disabled', false);
                  if (value == '2') {
                    // 设置群成员类型为“公私联动”，并且不可操作
                    model.groupMemberType = '3';
                    _this.$refs.refformAdd.switch('groupMemberType', 'disabled', true);
                  }
                }
              },
              {label: '客户群名称',
                field: 'custGroupName',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur' },
                  { validator: checkName, trigger: 'blur' },
                  {max: 50, message: '长度超出50个字符', trigger: 'blur'}],
                type: 'input'
                // type: 'custom',
                // is: 'yufp-custGroup'
              },
              {label: '群成员类型',
                field: 'groupMemberType',
                dataCode: 'CD0339',
                disabled: false,
                rules: [
                  {required: true, message: '必填项', trigger: 'blur' }],
                type: 'select'
              },
              {label: '共享范围',
                field: 'shareScope',
                dataCode: 'CD0337',
                type: 'select',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur' }],
                params: { tabCheckbox: true }
              }
            ]
          }, {
            columnCount: 1,
            fields: [
              { label: '客户群描述', field: 'remark', type: 'textarea', rows: 2 }
            ]
          }],
          /** 详情展示字段 */
          viewFields: [{
            columnCount: 2,
            fields: [
              {label: '客户群编号',
                field: 'custGroupId',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur' }],
                type: 'input'
              },
              {label: '客户群名称',
                field: 'custGroupName',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur' }],
                type: 'input'
              },
              {label: '客户来源',
                field: 'custOrigin',
                dataCode: 'CD0340',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur' }],
                type: 'select'
              },
              {label: '群成员类型',
                field: 'groupMemberType',
                dataCode: 'CD0339',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur' }],
                type: 'select'
              },
              {label: '成员数',
                field: 'custNum',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur' }],
                type: 'input'
              },
              {label: '创建人',
                field: 'createUser',
                rules: [
                  {required: true, message: '必填项', trigger: 'blur' }],
                type: 'input'
              },
              {label: '创建日期',
                field: 'createDate',
                type: 'date'
              },
              {label: '创建机构',
                field: 'createOrgan',
                type: 'input'
              },
              {label: '最近更新日期',
                field: 'lastChgDt',
                type: 'date'
              }
            ]
          }],
          /** 新增返回保存 */
          addButtons: [
            {label: '返回',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _this.$refs.refformAdd.resetFn();
                _this.dialogVisibleAdd = false;
              }},
            {label: '下一步',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model, valid) {
                var validate = false;
                _this.$refs.refformAdd.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                // _this.step = false;
                // _this.step1 = true;
                // _this.step2 = true;
                // _this.active++;
                model.createOrgan = yufp.session.org.name;

                yufp.service.request({
                  method: 'POST',
                  url: backend.custgroupService + '/api/ocrmfcicgbase/add',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$refs.reftable.remoteData();
                      // _this.dialogVisibleAdd = false;
                      // var customKey = 'custom_' + response.data.custGroupId; // 请以custom_前缀开头，并且全局唯一
                      // 客户群成员-添加成员功能的路由
                      var routeId = 'clientsclientInfo'; // 模板示例->普通查询的路由ID
                      // yufp.router.to('clientsclientInfo1', '1057', _this.Div);
                      if (response.data.custOrigin == 3) {
                        _this.uploadDialog = true;
                        _this.dialogVisibleAdd = false;
                        _this.uploaddata.custGroupId = response.data.custGroupId;
                        return;
                      };
                      if (response.data.custOrigin == 2) {
                        routeId = 'clientsclienauto';
                      };
                      yufp.router.to(routeId, {clientInfo: response.data}, _this.Div);
                      _this.step = false;
                      _this.step1 = true;
                      _this.step2 = true;
                      _this.active++;
                      // yufp.frame.addTab({
                      //   id: routeId, // 菜单功能ID（路由ID）
                      //   key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                      //   title: response.data.custGroupName, // 页签名称为客户群名称
                      //   data: { clientInfo: response.data } // 传递的业务数据，可选配置
                      // });
                    }
                  }
                });
              }}
          ],
          infoButton: [
            {label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function () {
                _this.dialogVisibleView = false;
              }}
          ],
          /** 设置弹出框属性，高度，是否显示，显示类型，标题 */
          uploadTitle: 'Excel表导入客户',
          fileList: [],
          uploadDialog: false,
          // action: backend.adminService + '/api/cimpccgbaseinfo/uploadtable',
          action: yufp.service.getUrl({
            url: backend.adminService + '/api/ocrmfcicgmember/uploadtableper'
          }),
          headers: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          uploaddata: {
            custGroupId: '',
            flag: '0'
          },
          columns: [{
            label: '文件名称',
            prop: 'fileName'
          }, {
            label: '文件路径',
            prop: 'filePath'
          }, {
            label: '文件大小 /kb',
            prop: 'fileSize'
          }, {
            label: '上传时间',
            prop: 'uploadTime'
          }, {
            label: '文件备注',
            prop: 'fileRemark'
          }],
          ceshishangshuan: false,
          Div: 'iddiv',
          ActionUrl: backend.fileService + '/api/file/provider/uploadfile',
          Url: backend.custgroupService + '/api/ocrmfcicgbase/list',
          // Url: '/trade/example/list',
          height: yufp.frame.size().height - 103,
          dialogVisibleView: false,
          dialogVisibleAdd: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          noticeUpLoadBusNo: {},
          uploadVisible: true,
          downloadVisible: true,
          deleteVisible: true,
          uploadInfoVisible: false,
          oneOrg: ''
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.custgroupService + '/api/ocrmfcicgbase/getlevel',
          data: {
            orgId: yufp.session.org.code
          },
          callback: function (code, message, response) {
            if (code == 0) {
              _this.oneOrg = response.data.oneOrg;
            }
          }
        });
      },
      methods: {
        /**
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        /** 新增方法 */
        downTable: function (row, event) {
          var url = backend.fileService + '/api/file/provider/download?fileId=' + 'group.xlsx';
          yufp.util.download(url);
        },
        addFn: function () {
          var _this = this;
          _this.viewType = 'ADD';
          _this.dialogVisibleAdd = true;
          _this.addFlag = true;
          _this.addDisabled = true;
          _this.infoDisabled = false;
          _this.activeName = 'first';
          _this.activeAddFormdata = {};
          _this.taskInfo = [];// 初始化变量
          _this.selectProdInfo = '';
          _this.selectCustGroup = '';
          _this.selectCustInfo = '';
          _this.$nextTick(function () {
            _this.active = 0;
            _this.step = true;
            _this.step1 = false;
            _this.step2 = false;
            _this.$refs.refformAdd.resetFields();
            _this.activeAddFormdata.mktRespPerson = yufp.session.userCode;
            _this.editDisabled = false;
          });
          _this.fprodParams = { condition: JSON.stringify({ actiId: '' }) };
          _this.custParams = { condition: JSON.stringify({ actiId: '' }) };
          _this.fileParams = { condition: JSON.stringify({ busNo: '' }) };
        },
        /** 详情方法 */
        infoFn: function () {
          var _this = this;
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.viewType = 'DETAIL';
          _this.formDisabled = true;
          _this.dialogVisibleView = true;
          this.$nextTick(function () {
            yufp.extend(this.$refs.refform.formModel, this.$refs.reftable.selections[0]);
          });
        },
        /** 删除方法 */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.reftable.selections;
          var ids = '';
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          } else if (selections.length > 1) {
            for (var i = 0; i < selections.length; i++) {
              ids = selections[i].custGroupId + ',' + ids;
            }
            // 判断群创建人是否为当前用户，是，才可删除所选群
            var flag = selections.every(function (item) {
              return item.userId == yufp.session.userId;
            });
            if (!flag) {
              _this.$message({
                message: '所选客户群中，存在无权限操作的客户群',
                type: 'warning'
              });
              return;
            }
          } else {
            ids = selections[0].custGroupId;
            if (selections[0].userId != yufp.session.userId) {
              _this.$message({
                message: '无权限操作该客户群',
                type: 'warning'
              });
              return;
            }
          }
          _this.$confirm('确认删除?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                var param = {
                  condition: JSON.stringify({
                    custGroupId: ids
                  })
                };
                yufp.service.request({
                  method: 'POST',
                  url: backend.custgroupService + '/api/ocrmfcicgbase/del',
                  data: param,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$refs.reftable.remoteData();
                      _this.$message('操作成功');
                    }
                  }
                });
              }
            }
          });
        },
        // 关闭新增弹出框
        clickPrimary: function (row, event) {
          var _this = this;
          _this.step2 = false;
          _this.dialogVisibleAdd = false;
          _this.$nextTick(function () {
            _this.$refs.reftable.remoteData();
          });
        },
        /**
         * 创建营销活动
         */
        createFn: function (row, event) {
          var _this = this;
          var selections = _this.$refs.reftable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var custGroupId = selections[0].custGroupId;
          var groupMemberType = selections[0].groupMemberType;
          _this.dialogVisible = true;
          _this.activeAddFormdata = {};
          _this.taskInfo = [];// 初始化变量
          _this.selectProdInfo = '';
          _this.selectCustGroup = '';
          _this.selectCustInfo = '';
          _this.activeName = 'first';
          _this.$nextTick(function () {
            var param = {condition: JSON.stringify({
              custGroupId: custGroupId,
              custType: groupMemberType
            })};
            _this.$refs.OCRM_F_MK_ACTI_CUST.remoteData(param);
            _this.$refs.activeAddForm.resetFields();
            _this.activeAddFormdata.actiMode = [];
            _this.activeAddFormdata.mktRespPerson = yufp.session.userCode;
            _this.editDisabled = false;
          });
          _this.fprodParams = { condition: JSON.stringify({ actiId: '' }) };
          _this.custParams = { condition: JSON.stringify({ actiId: '' }) };
          _this.fileParams = { condition: JSON.stringify({ busNo: '' }) };
        },
        // 上传之前判断文件格式
        beforeAvatarUpload: function (file) {
          var regex = /^.*\.(?:xls|xlsx)$/i;
          if (!regex.test(file.name)) {
            this.$message.error('只能导入xls或xlsx格式文件!');
            return false;
          }
          return file.name;
        },
        submitUpload: function () {
          this.$refs.verUpload.submit();
          this.uploadDialog = false;
        },
        // 文件上传成功处理逻辑
        onSuccess: function (response, file, fileList) {
          // console.log('上传文件', response);
          // alert(response.code);
          if (response.code == -1) {
            this.$message('文件导入失败!', '提示');
            vm.$refs.verUpload.clearFiles();
            // vm.$refs.accessTables.remoteData();
          } else {
            this.$message('文件导入成功!', '提示');
            vm.$refs.verUpload.clearFiles();
            this.$refs.reftable.remoteData();
            // vm.$refs.accessTables.remoteData();
          }
        },
        onError: function () {
          this.$message('文件导入失败!', '提示');
          vm.$refs.verUpload.clearFiles();
          // vm.$refs.accessTables.remoteData();
        },
        // 双击打开客户群视图
        rowDblclickFn: function (row, event) {
          var customKey = 'custom_' + row.custGroupId; // 请以custom_前缀开头，并且全局唯一
          var routeId = 'custGroupView'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: row.custGroupName + '群视图', // 页签名称为客户群名称
            data: { id: '60d04040b3234ac789894d01d0c07571', clientInfo: row }
          });
        },
        /**
         * 生成商机
         */
        genBopFn: function () {
          var _this = this;
          var selections = _this.$refs.reftable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var custGroupId = selections[0].custGroupId;
          var groupMemberType = selections[0].groupMemberType;
          _this.busOprHandVisible = true;
          _this.$nextTick(function () {
            var param = {condition: JSON.stringify({
              custGroupId: custGroupId,
              custType: groupMemberType
            })};
            _this.$refs.custGrouprefTable.remoteData(param);
          });
        },
        upTable: function (row, event) {
          var _self = this;
          // _self.deleteVisible = false;
          _self.uploadInfoVisible = true;
          this.$nextTick(function () {
            // var obj = _self.$refs[refTable].selections[0];
            // this.uploadInfoform = Object.assign(this.uploadInfoform, obj);
            // 初始化查询上传附件
            // return yufp.service.getUrl({url: me.uploadAction});
            // 获取附件列表
            // vm.$refs.filesTable.queryFn(files);
            // 设置附件列表组件传入NOTICEID
            vm.noticeUpLoadBusNo = {
              busNo: '00000000'
            };
          });
        },
        /** 打开客户群视图 */
        clickFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var customKey = 'custom_' + this.$refs.reftable.selections[0].custGroupId; // 请以custom_前缀开头，并且全局唯一
          // var routeId = 'usersShows'; // 模板示例->普通查询的路由ID
          var routeId = 'custGroupView';
          // yufp.frame.addTab({
          //   id: routeId, // 菜单功能ID（路由ID）
          //   key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
          //   title: this.$refs.reftable.selections[0].custGroupName, // 页签名称为客户群名称
          //   data: { clientInfo: this.$refs.reftable.selections[0] } // 传递的业务数据，可选配置
          // });
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: this.$refs.reftable.selections[0].custGroupName + '群视图', // 页签名称为客户群名称
            data: { id: '60d04040b3234ac789894d01d0c07571', clientInfo: this.$refs.reftable.selections[0] } // 传递的业务数据，可选配置
          });
          // 在打开tab页后，刷新页签
          // 刷新页签
          yufp.frame.refreshTab({
            routeId: routeId, // 菜单功能ID（路由ID）
            menuId: routeId, // 菜单ID，同addTab方法中的
            data: { id: '60d04040b3234ac789894d01d0c07571', clientInfo: this.$refs.reftable.selections[0] } // 传递的业务数据，可选配置
          });
        },
        /**
        * 切换详情table
        */
        changeInfoFn: function (tableInfo) {
          var _this = this;
          _this.showType = tableInfo;
          if (tableInfo == 'isProductAdd') {
            _this.showType = 'isProductAdd';
          }
          if (tableInfo == 'isCustomAdd') {
            _this.showType = 'isCustomAdd';
          }
          if (tableInfo == 'isTaskAllot') {
            _this.showType = 'isTaskAllot';
          }
          if (tableInfo == 'isAttachmentAdd') {
            _this.showType = 'isAttachmentAdd';
          }
          if (tableInfo == 'isAcitiveAdd') {
            _this.showType = 'isAcitiveAdd';
          }
        },
        /**
        * 新增关联产品
        */
        addProdFn: function (data) {
          var _this = this;
          for (var i = 0; i < data.length; i++) {
            var info = {
              productId: data[i].productId,
              productName: data[i].prodName,
              createUser: yufp.session.userCode,
              createName: yufp.session.userName,
              createDate: new Date()
            };
            _this.ocrmFMkActiProductdata.push(info);
          }
        },
        /**
        * 删除关联产品
        */
        deleteProdFn: function () {
          var _this = this;
          var selections = _this.$refs.ocrmFMkActiProduct.selections;
          var len = _this.ocrmFMkActiProductdata.length;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          for (var i = 0; i < len; i++) {
            if (selections[0].productId == _this.ocrmFMkActiProductdata[i].productId) {
              _this.ocrmFMkActiProductdata.splice(i, 1);
            }
          }
        },
        /**
        * 获取关联表信息
        */
        getTableDataFn: function (data) {
          this.ocrmFMkActiProductdata = data;
        },
        /**
        * 添加客户
        */
        addCustFn: function (data) {
          var _this = this;
          for (var i = 0; i < data.length; i++) {
            var obj = {
              custId: data[i].custId,
              custName: data[i].custName,
              custStatus: data[i].custStatus,
              custManager: data[i].mgrId,
              custManagerOrg: data[i].orgId,
              custManagerName: data[i].mgrName,
              custManagerOrgName: data[i].orgName,
              aimCustSource: '01',
              progressStep: '0',
              relationUser: yufp.session.userCode,
              relationUserName: yufp.session.userName,
              relationDate: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}')
            };
            _this.custTableData.push(obj);
          }
        },
        /**
        * 添加客户群的客户
        */
        addCustGroupFn: function (data) {
          var _this = this;
          var groupid = [];
          for (var i = _this.custTableData.length - 1; i >= 0; i--) { // 循环删除以前客户群引入的客户数据
            if (_this.custTableData[i].aimCustSource == '02') {
              _this.custTableData.splice(i, 1);
            }
          }
          // for (var i = 0; i < data.length; i++) {
          groupid.push(data.custGroupId);
          // }
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/mkt/groupcustinfo?groupIds=' + groupid.join(','),
            data: '',
            callback: function (code, message, response) {
              if (response.data) {
                var infos = response.data;
                for (var i = 0; i < infos.length; i++) {
                  let info = infos[i];
                  var obj = {
                    custId: info.custId,
                    custName: info.custName,
                    custStatus: info.custStatus,
                    custManager: info.mgrId,
                    custManagerOrg: info.orgId,
                    custManagerName: info.mgrName,
                    custManagerOrgName: info.orgName,
                    aimCustSource: '02',
                    progressStep: '0',
                    relationUser: yufp.session.userCode,
                    relationUserName: yufp.session.userName,
                    relationDate: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}')
                  };
                  _this.custTableData.push(obj);
                // _this.custGroupCustInfo.push(obj);
                }
              }
            }
          });
        },
        /**
         * 数组去重
         */
        uniq: function (array, type) {
          var temp = [];
          var index = [];
          var l = array.length;
          if (type == '1') { // 机构
            for (let i = 0; i < l; i++) {
              for (let j = i + 1; j < l; j++) {
                if (array[i].custManagerOrg == array[j].custManagerOrg) {
                  i++;
                  j = i;
                }
              }
              temp.push(array[i]);
              index.push(i);
            }
          } else if (type == '0') { // 客户经理
            for (let i = 0; i < l; i++) {
              for (let j = i + 1; j < l; j++) {
                if (array[i].custManager == array[j].custManager) {
                  i++;
                  j = i;
                }
              }
              temp.push(array[i]);
              index.push(i);
            }
          }

          return temp;
        },
        /**
        * 删除关联客户
        */
        deleteCustFn: function () {
          var _this = this;
          var selections = _this.$refs.OCRM_F_MK_ACTI_CUST.selections;
          var len = _this.custTableData.length;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          for (var i = 0; i < len; i++) {
            if (selections[0].custId == _this.custTableData[i].custId) {
              _this.custTableData.splice(i, 1);
            }
          }
        },
        /**
        * 获取客户表信息
        */
        getCustTableDataFn: function (data) {
          var _this = this;
          _this.custTableData = data;
        },
        /**
        * 切换对象
        */
        changeExetypeFn: function (val) {
          var _this = this;
          if (val == '0') { // 客户经理
            _this.showTask = 'taskManerger';
          } else if (val == '1') { // 机构
            _this.showTask = 'taskOrg';
          }
        },
        /**
        * 指标选择
        */
        selectIndexFn: function () {
          var _this = this;
          var selections = _this.$refs.taskinfoTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          for (var i = 0; i < selections.length; i++) {
            _this.taskInfo.push({
              targetName: selections[i].targetName,
              targetCode: selections[i].targetId,
              orignalVal: 'orignalVal' + selections[i].targetId,
              targetValue: 'targetValue' + selections[i].targetId,
              valueCondition: selections[i].valueCondition
            });
          }
          _this.taskInfoVisible = false;
        },
        /**
         * 指标选择取消按钮方法
         */
        cancelSelectIndexFn: function () {
          this.taskInfoVisible = false;
        },
        /**
        * 新增指标
        */
        addTask: function () {
          var _this = this;
          _this.taskInfoVisible = true;
          let prodIds = [];
          for (let i = 0; i < _this.ocrmFMkActiProductdata.length; i++) {
            let info = _this.ocrmFMkActiProductdata[i];
            prodIds.push(info.productId);
          }
          var param = { condition: JSON.stringify({ prodId: prodIds.join(',') }) };
          _this.$nextTick(function () {
            _this.$refs.taskinfoTable.remoteData(param);
          });
        },
        selectCustbackFn: function (data) {
          var _this = this;
          var selections = _this.$refs.ocrmFMkActiProduct.selections[0];
          for (var i = 0; i < _this.ocrmFMkActiProductdata.length; i++) {
            var info = _this.ocrmFMkActiProductdata[i];
            if (info.prudName == selections.productName) {
              _this.ocrmFMkActiProductdata[i].createUser = data.loginCode;
              break;
            }
          }
        },
        // 日期格式化(年月日)
        dateFormatterSimple: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
        },
        /**
        * 删除指标
        */
        deleteTaskFn: function () {
          var _this = this;
          var selections = [];
          selections = _this.$refs.OCRM_F_MK_ACTI_TARGET.selections;
          var len = _this.taskAllotTable2Data.length;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          for (var i = 0; i < len; i++) {
            if (selections[0].targetCode == _this.taskAllotTable2Data[i].targetCode) {
              _this.taskAllotTable2Data.splice(i, 1);
            }
          }
        },
        /**
        * 附件上传
        */
        fileUpSuccessFn: function (response) {
          var _this = this;
          _this.fileTem = response.data;
        },
        /**
        * 判断新增 修改 保存
        */
        temSaveFn: function () {
          var _this = this;
          _this.saveAddFn();
        },
        /**
        * 下一步
        */
        nextStepFn: function (formThis) {
          var _this = this;
          var validate = false;
          _this.$refs.activeAddForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 营销活动信息暂存
          if (formThis == 'activeAddForm') {
            _this.activeAddFormdata.actiMode = typeof _this.activeAddFormdata.actiMode == 'string' ? _this.activeAddFormdata.actiMode : _this.activeAddFormdata.actiMode.join(',');
            yufp.clone(_this.activeAddFormdata, _this.actModel);
            _this.activeName = 'second';
          }
          // 关联产品暂存
          if (formThis == 'isProductAdd') {
            _this.ocrmFMkActiProductdata;
            var size = _this.ocrmFMkActiProductdata.length;
            if (size > 0) { // 查询产品的目标客户
              var prodIds = [];
              for (var i = 0; i < size; i++) {
                let info = _this.ocrmFMkActiProductdata[i];
                prodIds.push(info.productId);
              }
              yufp.service.request({
                method: 'GET',
                url: backend.adminService + '/api/mkt/prodfitcust?prodIds=' + prodIds.join(','),
                data: '',
                callback: function (code, message, response) {
                  if (response.data) {
                    var infos = response.data;
                    for (var i = 0; i < infos.length; i++) {
                      let info = infos[i];
                      var obj = {
                        custId: info.custId,
                        custName: info.custName,
                        custStatus: info.custStatus,
                        custManager: info.mgrId,
                        custManagerOrg: info.orgId,
                        custManagerName: info.mgrName,
                        custManagerOrgName: info.orgName,
                        aimCustSource: '03',
                        progressStep: '0',
                        relationUser: yufp.session.userCode,
                        relationUserName: yufp.session.userName,
                        relationDate: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}')
                      };
                      _this.custTableData.push(obj);
                    }
                  }
                }
              });
              _this.activeName = 'third';
            } else {
              _this.$message({ message: '请添加目标产品', type: 'warning' });
              return;
            }
          }
          // 关联客户暂存
          if (formThis == 'isCustomAdd') {
            let custInfoOrg = _this.uniq(_this.custTableData, '1');
            let custInfoUser = _this.uniq(_this.custTableData, '0');
            if (_this.viewType == 'ADD') { // 新增
              _this.taskOrgTabledata = [];
              _this.taskUserTabledat = [];
              for (let i = 0; i < custInfoUser.length; i++) {
                _this.taskUserTabledat.push({
                  exeObjCode: custInfoUser[i].custManager,
                  exeObjName: custInfoUser[i].custManagerName
                });
              }

              for (let i = 0; i < custInfoOrg.length; i++) {
                _this.taskOrgTabledata.push({
                  exeObjCode: custInfoOrg[i].custManagerOrg,
                  exeObjName: custInfoOrg[i].custManagerOrgName
                });
              }
            } else if (_this.viewType == 'EDIT') { // 修改
              let usertask = _this.taskUserTabledat;
              for (let i = 0; i < custInfoUser.length; i++) {
                if (usertask.length == 0) {
                  _this.taskUserTabledat.push({
                    exeObjCode: custInfoUser[i].custManager,
                    exeObjName: custInfoUser[i].custManagerName
                  });
                } else {
                  let flag = false;
                  for (let j = 0; j < usertask.length; j++) {
                    if (custInfoUser[i].custManager == usertask[j].exeObjCode) {
                      flag = true;
                      break;
                    }
                  }
                  if (!flag) {
                    _this.taskUserTabledat.push({
                      exeObjCode: custInfoUser[i].custManager,
                      exeObjName: custInfoUser[i].custManagerName
                    });
                  }
                }
              }
              let orgtask = _this.taskOrgTabledata;
              for (let i = 0; i < custInfoOrg.length; i++) {
                if (orgtask.length == 0) {
                  _this.taskOrgTabledata.push({
                    exeObjCode: custInfoOrg[i].custManagerOrg,
                    exeObjName: custInfoOrg[i].custManagerOrgName
                  });
                } else {
                  let flag = false;
                  for (let j = 0; j < orgtask.length; j++) { // 判断是否重复
                    if (custInfoOrg[i].custManagerOrg == orgtask[j].exeObjCode) {
                      flag = true;
                      break;
                    }
                  }
                  if (!flag) {
                    _this.taskOrgTabledata.push({
                      exeObjCode: custInfoOrg[i].custManagerOrg,
                      exeObjName: custInfoOrg[i].custManagerOrgName
                    });
                  }
                }
              }
            }
            _this.tableKey++;
            _this.activeName = 'fourth';
          }
          if (formThis == 'taskAllotDiv') {
            _this.activeName = 'fifth';
          }
        },
        /**
        * 上一步
        */
        backStepFn: function (formThis) {
          var _this = this;
          if (formThis == 'isProductAdd') {
            _this.activeAddFormdata.actiMode = _this.activeAddFormdata.actiMode.split(',');
            _this.activeName = 'first';
          }
          if (formThis == 'isCustomAdd') {
            _this.activeName = 'second';
          }
          if (formThis == 'taskAllotDiv') {
            _this.activeName = 'third';
          }
          if (formThis == 'attachmentTable') {
            _this.activeName = 'fourth';
          }
        },
        /**
        * 取消
        */
        cancelFn: function (formThis) {
          var _this = this;
          if (formThis == 'activeAddForm') {
            _this.dialogVisible = false;
          }
          if (formThis == 'turnActivetyForm') {
            _this.turnVisible = false;
          }
          if (formThis == 'taskTransOrgForm') {
            _this.taskOrgVisible = false;
          }
          if (formThis == 'taskTransUserForm') {
            _this.taskUserVisible = false;
          }
          if (formThis == 'setActEndDtForm') {
            _this.setActEndDtVisible = false;
          }
        },
        /**
         * 删除选择的指标数据
         */
        deleteSeTagFn: function (item) {
          var _this = this;
          for (var i = _this.taskInfo.length - 1; i >= 0; i--) {
            if (item.targetCode == _this.taskInfo[i].targetCode) {
              _this.taskInfo.splice(i, 1);
              break;
            }
          }
          _this.tableKey += 1;
        },
        /**
        * 保存营销活动
        */
        saveAddFn: function () {
          var _this = this;
          var saveData = {};// 活动数据内容
          saveData.baseInfo = JSON.stringify(_this.actModel);
          saveData.prodInfo = JSON.stringify(_this.ocrmFMkActiProductdata);
          saveData.custInfo = JSON.stringify(_this.custTableData);
          // 新增附件信息
          var fileData = [];
          fileData.push(_this.fileData);
          _this.ifFile = false;
          saveData.fileInfo = JSON.stringify(fileData);
          // 保存新增的指标信息
          for (let i = 0; i < _this.taskUserTabledat.length; i++) {
            _this.taskUserTabledat[i].exeObjType = '0';
          }
          for (let i = 0; i < _this.taskOrgTabledata.length; i++) {
            _this.taskOrgTabledata[i].exeObjType = '1';
          }
          if (_this.taskOrgTabledata.length > _this.taskUserTabledat.length) {
            let taskinfo = _this.taskOrgTabledata.concat(_this.taskUserTabledat);// 合并数组
            saveData.taskInfo = JSON.stringify(taskinfo);
          } else {
            let taskinfo = _this.taskUserTabledat.concat(_this.taskOrgTabledata);// 合并数组
            saveData.taskInfo = JSON.stringify(taskinfo);
          }
          saveData.selectTaskInfo = JSON.stringify(_this.taskInfo);
          // 保存新增营销活动请求
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/mkt/actiinsert',
            data: saveData,
            async: false,
            callback: function (code, message, response) {
            // _this.$refs.OCRM_F_MK_ACTIVITY.remoteData();
              if (response.code != -1) {
                _this.$message('操作成功');
                _this.ifFile = true;
                _this.fileParams = { condition: JSON.stringify({ busNo: response.data + ''}) };
                _this.fileDataParams = {
                  busNo: response.data
                };
              // _this.dialogVisible = false;
              }
              if (response.code == -1) {
                _this.$message({ message: response.message, type: 'warning'});
              }
            }
          });
        },
        /**
        * 添加客户信息
        */
        getCustDataFn: function (data) {
          var _this = this;
          _this.busOprHandFormdata.custId = data[0].custId;
          _this.busOprHandFormdata.custType = data[0].custType;
          _this.busOprHandFormdata.custStatus = data[0].custStatus;
        },
        /**
        * 保存商机
        */
        saveBopFn: function () {
          var _this = this;
          var validate = false;
          var nowDate = new Date();
          nowDate.setHours(0);
          nowDate.setMinutes(0);
          nowDate.setSeconds(0);
          _this.$refs.busOprHandForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (_this.busOprHandFormdata.businessEndDate > _this.busOprHandFormdata.businessValidDate) {
            _this.$message({ message: '商机结束日期不能大于商机有效期', type: 'warning' });
            return;
          }
          if (_this.busOprHandFormdata.businessStartDate < nowDate) {
            if (_this.busOprHandFormdata.businessStartDate.toString() != nowDate.toString()) {
              _this.$message({message: '商机开始日期不能晚于当前日期', type: 'warning'});
              return;
            }
          }
          if (_this.busOprHandFormdata.businessStartDate > _this.busOprHandFormdata.businessEndDate) {
            _this.$message({message: '商机开始日期不能晚于商机结束日期', type: 'warning'});
            return;
          }
          var model = {};
          var selections = _this.$refs.reftable.selections;
          var custGroupId = selections[0].custGroupId;
          var groupMemberType = selections[0].groupMemberType;
          // TODO 向后台传递客户群编号
          model = yufp.clone(_this.busOprHandFormdata, model);
          // 新增
          yufp.service.request({
            method: 'POST',
            url: backend.mktsalesopporService + '/api/salesoppor/opporinsert',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code == 0) {
                _this.busOprHandVisible = false;
                _this.$message({ message: response.message });
                _this.$refs.OCRM_F_MK_MKT_SALESOPPOR.remoteData();
              } else {
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
        },
        /**
          * 生成商机弹出框取消按钮
          */
        cancleFn: function (cancleTit) {
          var _this = this;
          if (cancleTit == 'ADD' || cancleTit == 'edit') {
            _this.busOprHandVisible = false;
          }
          if (cancleTit == 'eleDisForm') {
            _this.eleDisVisible = false;
          }
        }
      }
    });
  };
});