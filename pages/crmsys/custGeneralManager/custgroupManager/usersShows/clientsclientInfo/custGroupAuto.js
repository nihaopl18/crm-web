/**
 * @created by zhangxs4 on 2019/01/14.
 * @description 客户灵活查询
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/yufpOrgTree.js',
  'custom/widgets/js/yufpCustGroup.js',
  './custom/widgets/js/yufpRoleSelector.js',
  './custom/widgets/js/YufpUserSelector.js',
  './libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/yufpUploadTable.js',
  './libs/echarts/echarts.min.js',
  './libs/jquery/jquery.min.js',
  './libs/echarts/echarts-3.8.5.min.js', './libs/echarts/echarts-3.8.5.patch.js',
  'custom/widgets/js/YufpEchart.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  var tags1 = [];
  exports.ready = function (hashCode, data, cite) {
    var cust = data.clientInfo;
    var columnOptions = [];
    var chartTagOptions = [];
    var xchartTagOptions = [];
    var chartTargetOptions = [];
    var ychartTargetOptions = [];
    var customersColumnOptions = [];
    var firstOptions = [];
    var secondOptions = [];
    var thirdOptions = [];
    var fourOptions = [];
    var fiveOptions = [];
    var comboSelectOptions = [];
    var typeOptions = [];
    var numDataOptions = [];
    var countSumOptions = [];
    var textOptions = [];
    var radioComboOptions = [];
    var querysql = '';
    var sumNamesOptions = [];
    yufp.lookup.reg('CD0016,CUST_STAT,CD0011');
    var vm = yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          collapse: true,
          widthsol: '0px',
          colv: {
            solcol: 1,
            spanTree: 4,
            spanS: 14
          },
          pageHeight: yufp.frame.size().height + 'px',
          rptButton: !yufp.session.checkCtrl('rptPub'), // 发布报表选择按钮控制
          graphButton: !yufp.session.checkCtrl('graphPub'), // 发布报表选择按钮控制
          echartData: {}, // 图表预览
          formdata: {},
          async: false,
          formDisabled: false,
          name: 'asdsad',
          param: { groupNo: '0', levelunit: '1' },
          list: [], // 选择的标签组数据
          // qryUrl: backend.adminService + '/api/cimftagcusttags/getlistbytags',
          // treeqryUrl: backend.adminService + '/api/cimfmmftagGrop/getGroupTree',
          selectList: [], // 选中的作为查询条件的标签
          settinglist: [],
          setselectList: [], // 选中的作为查询条件的标签
          qryList: [], // 查询条件
          setlist: [], // 查询条件
          custtagList: [],
          pageData: {
            total: 0,
            page: 1,
            size: 10,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageKey: 'page',
            sizeKey: 'size'
          },
          tags1: tags1,
          opRule: [{ required: true, message: '操作符不能为空' }],
          signvRule: [{ required: true, message: '属性不能为空' }],
          tagTemp: { custName: '', definedTag: '' },
          dialogTagForm: false,
          buttonsDisabled: false,
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          queryFields: [
            { placeholder: '客户群编号', field: 'clientsNO', type: 'input' },
            { placeholder: '客户群名称', field: 'clientsName', type: 'input' },
            { placeholder: '群成员类型', field: 'clientsType', type: 'input' }
          ],
          optionData: [],
          // 分组汇总统计表格数据
          summTableData: [],
          // 分组统计汇总结果页列表列数据
          resultTableColumns: [{ label: '序号', width: '60', type: 'index' }],
          tableColumns: [
            { label: '客户群编号', prop: 'clientsNO', width: '150', resizable: true },
            { label: '客户群名称', prop: 'clientsName', width: '150', resizable: true },
            { label: '客户来源', prop: 'clientOrigin', width: '150', resizable: true, dataCode: 'CLIENT_ORIGIN' },
            { label: '群成员类型', prop: 'clientsType', width: '150', resizable: true, dataCode: 'CLIENT_TYPE' },
            { label: '共享范围', prop: 'sharedScope', width: '120', resizable: true, dataCode: 'SHARED_SCOPE' },
            { label: '成员数', prop: 'clientNum', resizable: true },
            { label: '创建人', prop: 'founder', resizable: true },
            { label: '创建日期', prop: 'creationDate', resizable: true },
            { label: '创建机构', prop: 'createInstitutions', resizable: true },
            { label: '最近更新日期', prop: 'lastUpdateDate', resizable: true }
          ],
          ssolutiontableColumns: [
            { label: '方案名称', prop: 'ssName', resizable: true }
            // { label: '创建人', prop: 'userName', resizable: true },
            // { label: '创建机构', prop: 'orgName', resizable: true }
          ],
          queryFieldss: [
            {
              placeholder: '客户群名称', field: 'custGroupIds', type: 'custom', is: 'yufp-custGroup'
            }
          ],
          queryButtonss: [],
          clientsView1: [
            { prop: 'custId', label: '客户号', type: 'input' },
            { prop: 'custName', label: '客户名称', type: 'input' },
            { prop: 'certType', label: '证件类型', type: 'input', dataCode: 'IDENT_TYPE' },
            { prop: 'certNo', label: '证件号码', type: 'input' },
            { prop: 'custType', label: '客户类型', type: 'input', dataCode: 'CUST_TYPE' }
          ],
          joinUrl: '/trade/cust/custNoJoin?clientsNO=0',
          ssolutionUrl: backend.adminService + '/api/ocrmfcifqssolution/list',
          options: [{
            value: '1',
            label: '客户高级查询'
          }],
          firstOptions: firstOptions,
          secondOptions: secondOptions,
          thirdOptions: thirdOptions,
          fourOptions: fourOptions,
          fiveOptions: fiveOptions,
          columnOptions: columnOptions,
          chartTagOptions: chartTagOptions,
          xchartTagOptions: xchartTagOptions,
          chartTargetOptions: chartTargetOptions,
          ychartTargetOptions: ychartTargetOptions,
          customersColumnOptions: customersColumnOptions,
          countSumOptions: countSumOptions,
          comboSelectOptions: comboSelectOptions,
          numDataOptions: numDataOptions,
          textOptions: textOptions,
          radioComboOptions: radioComboOptions,
          sumNamesOptions: sumNamesOptions,
          typeOptions: typeOptions,

          value: '1', // 下拉框默认值
          orderOptions: [{ key: '1', value: '不排序' }, { key: '2', value: '正序' }, { key: '3', value: '逆序' }],
          chartTypeOptions: [{ key: 'pie', value: '饼图' }, { key: 'line', value: '趋势图' }, { key: 'bar', value: '柱状图' }],
          chartSizeOptions: [{ key: '1', value: '[2*2]' }, { key: '2', value: '[2*3]' }, { key: '3', value: '[3*2]' }, { key: '3', value: '[3*3]' }],
          customersOptions: [{ key: '1', value: '普通客户群' }, { key: '2', value: '商圈客户群' }, { key: '3', value: '链式客户群' }, { key: '3', value: '族群' }, { key: '3', value: '集团' }],
          membersOptions: [{ key: '1', value: '对公客户群' }, { key: '2', value: '对私客户群' }, { key: '3', value: '公私联动客户群' }],
          sharerangeOptions: [{ key: '1', value: '私有' }, { key: '2', value: '全行共享' }, { key: '3', value: '本机构共享' }, { key: '4', value: '辖内机构共享' }],
          batchTypeOptions: [{ key: '1', value: '跑批一次' }, { key: '2', value: '每天跑批' }],
          dataSqlTemp: {
            ID: {
              signOp: ''
            }
          },
          incustomersTemp: {
            incustomers: ''
          },
          dataTemp: {},
          groupform: {
            firstgroup: '',
            secondgroup: '',
            thirdgroup: '',
            fourgroup: '',
            fivegroup: ''
          },
          chartTemp: {
            chartName: '',
            chartSize: '',
            chartType: ''
          },
          chartTagTemp: {
            chartTag: '',
            chartTarget: ''
          },
          ychartNameTemp: {
            ychartName: '',
            ychartBegin: '',
            xchartTag: '',
            ychartTarget: '',
            chartType: ''
          },
          itemssTemp: {
            ssName: ''
          },
          reportTemp: {
            reportName: ''
          },

          groupTemp: {
          },
          customersTemp: {
            custGroupName: '',
            custGroupType: '',
            customersColumn: '',
            groupMemberType: '',
            batchType: '',
            shareScope: '',
            remark: ''
          },
          ruless: {
            custGroupName: [{ required: true, message: '必填项', trigger: 'blur' }],
            custGroupType: [{ required: true, message: '必填项', trigger: 'blur' }],
            // customersColumn:[{required: true, message: '必填项', trigger: 'blur'}],
            groupMemberType: [{ required: true, message: '必填项', trigger: 'blur' }],
            batchType: [{ required: true, message: '必填项', trigger: 'blur' }]
          },
          chartrule: {
            chartName: [{ required: true, message: '必填项', trigger: 'blur' }],
            chartType: [{ required: true, message: '必填项', trigger: 'blur' }]
          },
          charttagrule: {
            chartTag: [{ required: true, message: '必填项', trigger: 'blur' }],
            chartTarget: [{ required: true, message: '必填项', trigger: 'blur' }]
          },
          ychartrule: {
            ychartName: [{ required: true, message: '必填项', trigger: 'blur' }],
            ychartBegin: [{ required: true, message: '必填项', trigger: 'blur' }],
            xchartTag: [{ required: true, message: '必填项', trigger: 'blur' }],
            ychartTarget: [{ required: true, message: '必填项', trigger: 'blur' }]
          },
          // list: [],
          data: [],
          conditionAttrs: [],
          busiTypeFlag: [],
          qryarr: [],
          results: [],
          grouplist: [],
          groupnamelist: [],
          conlist: [],
          colunmNamelist: [{ 'name': '主表客户编号', 'id': '', 'ename': 'custIdBase' }, { 'name': '主表客户名称', 'id': '', 'ename': 'custNameBase' }],
          fieldDatas: [],
          qrylist: [],
          treedata: [],
          solutionlist: [],
          activeName: 'first', // tab默认显示值
          limitNum: '', // 查询条数
          height: yufp.frame.size().height - 140,
          groupHeight: yufp.frame.size().height - 360,
          dialogVisible: false,
          dialogFormVisible1: false,
          dialogFormVisible2: false,
          showPrise: false,
          addcustomersdialogVisible: false,
          showRentPrise: false,
          pubbuttonsDisabled: false,
          closebuttonsDisabled: false,
          reportdialogVisible: false,
          casedialogVisible: false,
          savebuttonsDisabled: false,
          closecasebuttonsDisabled: false,
          customersdialogVisible: false,
          customersbuttonsDisabled: false,
          closecustbuttonsDisabled: false,
          incustomersdialogVisible: false,
          customersqrydialogVisible: false,
          solutionformVisible: false,
          viewType: 'DETAIL',
          // async: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          radioshow: true,
          dragnode: '',
          radio2: '',
          saveBtnShow: true,
          qryresultSelections: [],
          filterGrid: {
            // 系统参数当前行
            currentRow: null,
            // 系统参数多选ID
            multipleSelection: '',
            data: null,
            subdata: null,
            total: null,
            loading: true,
            subloading: true
          },
          tableData: [{
            summColumnId: '',
            summTypeId: '',
            summNameId: '',
            summColumn: '',
            summType: '',
            summName: ''
          }, {
            summColumn: '',
            summType: '',
            summName: ''
          }, {
            summColumn: '',
            summType: '',
            summName: ''
          }, {
            summColumn: '',
            summType: '',
            summName: ''
          }, {
            summColumn: '',
            summType: '',
            summName: ''
          }]
        };
      },
      mounted: function () {
        var me = this;
        me.resetconditionFn();
        yufp.service.request({
          method: 'GET',
          url: backend.adminService + '/api/ocrmfcifqscol/getscol',
          async: false,
          data: {
            ssId: cust.custGroupId
          },
          callback: function (code, message, response) {
            if (response.data != null) {
              for (var i = 0; i < response.data.length; i++) {
                var collist = {};
                collist.id = response.data[i].ssColItem;
                // 根据后台id遍历树对应名称
                var tempTreeData = me.treedata;
                for (var j = 0; j < tempTreeData.length; j++) {
                  if (tempTreeData[j].nodeid == collist.id) {
                    collist.name = tempTreeData[j].name;
                    collist.tabname = tempTreeData[j].value;
                    collist.fieldname = tempTreeData[j].ename;
                    collist.colType = tempTreeData[j].ctype;
                    // 将字段转为驼峰形式
                    var foos = tempTreeData[j].ename;
                    var ename = foos.toLowerCase().split('_');
                    for (var k = 1; k < ename.length; k++) {
                      ename[k] = ename[k].charAt(0).toUpperCase() + ename[k].substring(1);
                    }
                    collist.ename = ename.join('');
                  }
                }
                // 根据后台id遍历树对应名称
                var item = {};
                var selection = {};
                item.ctype = 'input';
                item.unit = '';
                item.options = [];
                selection.ctype = 'select';
                if (collist.colType == 'VARCHAR2') { // 文本框
                  selection.options = me.textOptions;
                } else if (collist.colType == 'NUMBER' || collist.colType == 'DECIMAL' || collist.colType == 'INTEGER') { // 数字框
                  selection.options = me.numDataOptions;
                } else if (collist.colType == 'DATE' || collist.colType == 'TIMESTMP') { // 日期框
                  selection.options = me.numDataOptions;
                }
                collist.items = item;
                collist.section = selection;
                collist.signOp = response.data[i].ssColOp;
                collist.signVal = response.data[i].ssColValue;
                if (response.data[i].ssColJoin == undefined) {
                  collist.radio2 = response.data[i].ssColGjoin;
                } else if (response.data[i].ssColJoin != undefined && response.data[i].ssColJoin != '') { // children节点
                  collist.radio2 = response.data[i].ssColJoin;
                }
                collist.and = '并';
                collist.or = '或';
                if (collist.radio2 == 'and') {
                  collist.radio2 = '并';
                } else if (collist.radio2 == 'or') {
                  collist.radio2 = '或';
                } else {
                  collist.radio2 = '';
                }
                var len = Object.keys(me.dataSqlTemp);
                collist.index = len.length;
                // collist.index = i;
                me.$set(me.dataSqlTemp, collist.index, {
                  radio2: collist.radio2,
                  proPer: collist.name,
                  signOp: collist.signOp,
                  signVal: collist.signVal
                });
                var optionsTmp = [];
                var indexss = me.list.length - 1;
                if (response.data[i].ssColJoin == undefined) {
                  me.list.push(collist);
                  // optionsTmp.push(vm.list);
                } else if (response.data[i].ssColJoin != undefined && response.data[i].ssColJoin != '') { // children节点
                  me.list[indexss].children = [];
                  me.list[indexss].children.push(collist);
                  // optionsTmp.push(vm.list[indexss].children);
                }
              }
              for (var i = 0, len = me.list.length; i < len; i++) {
                optionsTmp.push(me.list[i]);
                if (me.list[i].children) {
                  var chd = me.list[i].children;
                  for (var j = 0, lenchd = chd.length; j < lenchd; j++) {
                    optionsTmp.push(chd[j]);
                  }
                }
              }
            }
          }
        });
        yufp.lookup.bind('CONDITION_FUNC', function (data) {
          me.signOptions = data;
        });
        yufp.lookup.bind('TYPE_OPTION', function (data) { // 汇总类型
          me.typeOptions = data;
        });
        // 设置字段属性值样式
        yufp.lookup.bind('COMBO_SELECTBOX', function (data) {
          me.comboSelectOptions = data;
        });
        yufp.lookup.bind('NUM_DATABOX', function (data) {
          me.numDataOptions = data;
        });
        yufp.lookup.bind('TEXTBOX', function (data) {
          me.textOptions = data;
        });
        yufp.lookup.bind('RADIO_COMBOBOX', function (data) {
          me.radioComboOptions = data;
        });
      },
      methods: {
        filterNode: function (value, data) {
          if (!value) {
            return true;
          }
          return data.name.indexOf(value) != -1;
        },
        expandFn: function () {
          this.collapse = false;
          this.widthsol = '200px';
          this.colv.solcol = 4;
          this.colv.spanTree = 3;
          this.colv.spanS = 11;
        },
        mgrpageChangeFn: function (val) {
          var _this = this;
          _this.pageData.page = val;
          if (_this.repeatTrigger) {
            _this.repeatTrigger = false;
          } else {
            _this.queryInfoFn();
          }
        },
        mgrsizeChangeFn: function (size) {
          var _this = this;
          _this.pageData.size = size;
          if (_this.repeatTrigger) {
            _this.repeatTrigger = false;
          } else {
            if (_this.pageData.page !== 1) {
              _this.pageData.page = 1;
              _this.repeatTrigger = true;
            }
            _this.queryInfoFn();
          }
        },
        /**
        * 收缩方案列表
        */
        shrinkFn: function () {
          this.collapse = true;
          this.widthsol = '0px';
          this.colv.solcol = 1;
          this.colv.spanTree = 4;
          this.colv.spanS = 14;
        },
        getdata: function (value) {
          this.treedata = value;
        },
        // 双击方案列表回显示方案
        dblclick: function (row, event) {
          var _this = this;
          this.resetconditionFn();
          var fieldId = row.id;
          var ssResult = row.ssResult.split(',');// 取出显示列3354,3346
          var ssSort = row.ssSort.split(',');// 取出排序1,1
          for (var i = 0; i < ssResult.length; i++) {
            var sslist = {};
            sslist.id = ssResult[i];
            sslist.orderType = ssSort[i];
            // 根据后台id遍历树对应名称
            var tempTreeData = _this.treedata;
            for (var j = 0; j < tempTreeData.length; j++) {
              if (tempTreeData[j].nodeid == sslist.id) {
                sslist.name = tempTreeData[j].name;
                sslist.fieldname = tempTreeData[j].ename;
                sslist.tabname = tempTreeData[j].value;
                // 将字段转为驼峰形式
                var foos = sslist.fieldname;
                var ename = foos.toLowerCase().split('_');
                for (var k = 1; k < ename.length; k++) {
                  ename[k] = ename[k].charAt(0).toUpperCase() + ename[k].substring(1);
                }
                sslist.ename = ename.join('');
              }
            }
            // 根据后台id遍历树对应名称
            sslist.indexs = i;
            _this.$set(_this.dataTemp, sslist.indexs, {
              proPer: sslist.name,
              orderType: sslist.orderType
            });
            _this.conlist.push(sslist);
            _this.colunmNamelist.push(sslist);
            _this.solutionlist.push(sslist);
          }
          // 查询条件回显示
          // vm.list=[];
          // var collist = {};
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/ocrmfcifqscol/getscol',
            async: false,
            data: {
              ssId: fieldId
            },
            callback: function (code, message, response) {
              if (response.data != null) {
                for (var i = 0; i < response.data.length; i++) {
                  var collist = {};
                  collist.id = response.data[i].ssColItem;
                  // 根据后台id遍历树对应名称
                  var tempTreeData = vm.treedata;
                  for (var j = 0; j < tempTreeData.length; j++) {
                    if (tempTreeData[j].nodeid == collist.id) {
                      collist.name = tempTreeData[j].name;
                      collist.tabname = tempTreeData[j].value;
                      collist.fieldname = tempTreeData[j].ename;
                      collist.colType = tempTreeData[j].ctype;
                      // 将字段转为驼峰形式
                      var foos = tempTreeData[j].ename;
                      var ename = foos.toLowerCase().split('_');
                      for (var k = 1; k < ename.length; k++) {
                        ename[k] = ename[k].charAt(0).toUpperCase() + ename[k].substring(1);
                      }
                      collist.ename = ename.join('');
                    }
                  }
                  // 根据后台id遍历树对应名称
                  var item = {};
                  var selection = {};
                  item.ctype = 'input';
                  item.unit = '';
                  item.options = [];
                  selection.ctype = 'select';
                  if (collist.colType == 'VARCHAR2') { // 文本框
                    selection.options = vm.textOptions;
                  } else if (collist.colType == 'NUMBER' || collist.colType == 'DECIMAL' || collist.colType == 'INTEGER') { // 数字框
                    selection.options = vm.numDataOptions;
                  } else if (collist.colType == 'DATE' || collist.colType == 'TIMESTMP') { // 日期框
                    selection.options = vm.numDataOptions;
                  }
                  collist.items = item;
                  collist.section = selection;
                  collist.signOp = response.data[i].ssColOp;
                  collist.signVal = response.data[i].ssColValue;
                  if (response.data[i].ssColJoin == undefined) {
                    collist.radio2 = response.data[i].ssColGjoin;
                  } else if (response.data[i].ssColJoin != undefined && response.data[i].ssColJoin != '') { // children节点
                    collist.radio2 = response.data[i].ssColJoin;
                  }
                  collist.and = '并';
                  collist.or = '或';
                  if (collist.radio2 == 'and') {
                    collist.radio2 = '并';
                  } else if (collist.radio2 == 'or') {
                    collist.radio2 = '或';
                  } else {
                    collist.radio2 = '';
                  }
                  var len = Object.keys(vm.dataSqlTemp);
                  collist.index = len.length;
                  // collist.index = i;
                  vm.$set(vm.dataSqlTemp, collist.index, {
                    radio2: collist.radio2,
                    proPer: collist.name,
                    signOp: collist.signOp,
                    signVal: collist.signVal
                  });
                  var optionsTmp = [];
                  var indexss = vm.list.length - 1;
                  if (response.data[i].ssColJoin == undefined) {
                    vm.list.push(collist);
                    // optionsTmp.push(vm.list);
                  } else if (response.data[i].ssColJoin != undefined && response.data[i].ssColJoin != '') { // children节点
                    vm.list[indexss].children = [];
                    vm.list[indexss].children.push(collist);
                    // optionsTmp.push(vm.list[indexss].children);
                  }
                }
                for (var i = 0, len = vm.list.length; i < len; i++) {
                  optionsTmp.push(vm.list[i]);
                  if (vm.list[i].children) {
                    var chd = vm.list[i].children;
                    for (var j = 0, lenchd = chd.length; j < lenchd; j++) {
                      optionsTmp.push(chd[j]);
                    }
                  }
                }
                vm.firstOptions = optionsTmp;
                vm.secondOptions = optionsTmp;
                vm.thirdOptions = optionsTmp;
                vm.fourOptions = optionsTmp;
                vm.fiveOptions = optionsTmp;
                vm.columnOptions = optionsTmp;
                vm.chartTagOptions = optionsTmp;
                vm.xchartTagOptions = optionsTmp;
              }
            }
          });
        },
        /**
   * 点击查询条件行的删除按钮执行
   */
        queryCondelTableRow: function (index, rows) {
          for (var i = 0; i < this.optionData.length; i++) {
            if (this.optionData[i].id == rows[index].id) {
              this.optionData.splice(i, 1);
            }
          }
          // 清除分组汇总表单中对应的字段
          if (this.groupform.firstgroup == rows[index].id) {
            this.groupform.firstgroup = '';
          }
          if (this.groupform.secondgroup == rows[index].id) {
            this.groupform.secondgroup = '';
          }
          if (this.groupform.thirdgroup == rows[index].id) {
            this.groupform.thirdgroup = '';
          }
          if (this.groupform.fourgroup == rows[index].id) {
            this.groupform.fourgroup = '';
          }
          if (this.groupform.fivegroup == rows[index].id) {
            this.groupform.fivegroup = '';
          }
          this.list.splice(index, 1);
          // 重置选项
          this.list = [];
          this.list = rows;
          this.firstOptions = [];
          this.firstOptions = rows;
          this.secondOptions = [];
          this.secondOptions = rows;
          this.thirdOptions = [];
          this.thirdOptions = rows;
          this.fourOptions = [];
          this.fourOptions = rows;
          this.fiveOptions = [];
          this.fiveOptions = rows;
          this.columnOptions = [];
          this.columnOptions = rows;
        },
        allowDroprow: function () {
          return false;
        },
        handleDragStart: function (node, ev) {
          this.dragnode = node;
        },
        allowDrop: function (event) {
          if (this.dragnode.childNodes.length == 0) {
            this.addTabInfoFn(this.dragnode.data);
          }
        },
        allowDrop1: function (event) {
          if (this.dragnode.childNodes.length == 0) {
            this.addTabInfoFns(this.dragnode.data);
          }
        },
        allowDropover: function (event) {
          event.preventDefault();
        },
        /**
   * 查询条件插入子节点
   */
        childrenallowDrop: function (event, index) {
          event.stopPropagation();
          if (this.dragnode.childNodes.length == 0) {
            this.addChildInfoFn(this.dragnode.data, index);
            // this.list[index].children.push('1');
          }
        },
        Dragover: function (event) {
          event.preventDefault();
        },
        /**
   * 添加节点数据
   */
        addTabInfoFn: function (node) {
          var _set = this;

          if (node) {
            var dataList = {};
            // dataList.index = _set.list.length;
            var len = Object.keys(_set.dataSqlTemp);
            dataList.index = len.length;
            dataList.indexs = _set.conlist.length;
            dataList.name = node.name;
            dataList.id = node.nodeid;
            // 将字段转为驼峰形式
            var foo = node.ename;
            var ename = foo.toLowerCase().split('_');
            for (var i = 1; i < ename.length; i++) {
              ename[i] = ename[i].charAt(0).toUpperCase() + ename[i].substring(1);
            }
            dataList.ename = ename.join('');
            dataList.children = [];
            if (_set.list.length == 0) {
              dataList.and = '';
              dataList.or = '';
              _set.radio2 = '0';
            } else {
              dataList.and = '并';
              dataList.or = '或';
              _set.radio2 = '2';
            }
            // 查询拖拽的字段类型
            var param = {
              condition: JSON.stringify({
                id: dataList.id
              })
            };
            _set.conditionField = [];
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/ocrmfcifqdbcol/showcoltype',
              data: param,
              callback: function (code, message, response) {
                var data = response.data;
                // 数据类型
                dataList.colType = data[0].colType;
                _set.getConditionField(_set.conditionField, data[0]);
                dataList.section = _set.conditionField[0].section;
                dataList.items = _set.conditionField[0].item;
                _set.$set(_set.dataSqlTemp, dataList.index, {
                  radio2: '',
                  proPer: dataList.name,
                  signOp: '',
                  signVal: ''
                });
                _set.$set(_set.dataTemp, dataList.indexs, {
                  proPer: dataList.name,
                  orderType: ''
                });
                vm.dataTemp[dataList.indexs].orderType = '1';
                vm.dataSqlTemp[dataList.index].signVal = response.data[0].fName;
                vm.dataSqlTemp[dataList.index].radio2 = '并';
                // 判断当拖拽的查询条件中在列里有的情况下不push
                var flag1 = false;// 是否已经添加
                for (var i = 0; i < _set.conlist.length; i++) {
                  if (_set.conlist[i].id == dataList.id) {
                    flag1 = true;
                    break;
                  }
                }
                if (!flag1) {
                  _set.list.push(dataList);
                  _set.conlist.push(dataList);
                  _set.solutionlist.push(dataList);
                  var optionsTmp = [];
                  for (var i = 0, len = _set.list.length; i < len; i++) {
                    optionsTmp.push(_set.list[i]);
                    if (_set.list[i].children) {
                      var chd = _set.list[i].children;
                      for (var j = 0, lenchd = chd.length; j < lenchd; j++) {
                        optionsTmp.push(chd[j]);
                      }
                    }
                  }
                  _set.columnOptions = optionsTmp;
                  _set.chartTagOptions = optionsTmp;
                  _set.xchartTagOptions = optionsTmp;
                  _set.colunmNamelist.push(dataList);
                  _set.customersColumnOptions = optionsTmp;
                  _set.firstOptions = optionsTmp;
                  _set.secondOptions = optionsTmp;
                  _set.thirdOptions = optionsTmp;
                  _set.fourOptions = optionsTmp;
                  _set.fiveOptions = optionsTmp;
                }
                //          }
              }
            });
          }
        },
        /**
   * 拖拽释放查询条件child行
   */
        addChildInfoFn: function (node, index) {
          var _set = this;

          if (node) {
            var dataList = {};
            // dataList.index = _set.list.length;
            var len = Object.keys(_set.dataSqlTemp);
            dataList.index = len.length;
            dataList.indexs = _set.conlist.length;
            dataList.name = node.name;
            dataList.id = node.nodeid;
            // 将字段转为驼峰形式
            var foo = node.ename;
            var ename = foo.toLowerCase().split('_');
            for (var i = 1; i < ename.length; i++) {
              ename[i] = ename[i].charAt(0).toUpperCase() + ename[i].substring(1);
            }
            dataList.ename = ename.join('');
            if (_set.list.length == 0) {
              dataList.and = '';
              dataList.or = '';
              _set.radio2 = '0';
            } else {
              dataList.and = '并';
              dataList.or = '或';
              _set.radio2 = '2';
            }
            // 查询拖拽的字段类型
            var param = {
              condition: JSON.stringify({
                id: dataList.id
              })
            };
            _set.conditionField = [];
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/ocrmfcifqdbcol/showcoltype',
              data: param,
              callback: function (code, message, response) {
                var data = response.data;
                // 数据类型
                dataList.colType = data[0].colType;
                _set.getConditionField(_set.conditionField, data[0]);
                dataList.section = _set.conditionField[0].section;
                dataList.items = _set.conditionField[0].item;
                _set.$set(_set.dataSqlTemp, dataList.index, {
                  radio2: '',
                  proPer: dataList.name,
                  signOp: '',
                  signVal: ''
                });
                // _set.$set(_set.list[index], 'children', []);
                _set.$set(_set.dataTemp, dataList.indexs, {
                  proPer: dataList.name,
                  orderType: ''
                });
                vm.dataTemp[dataList.indexs].orderType = '1';
                vm.dataSqlTemp[dataList.index].signVal = response.data[0].fName;
                // 判断当拖拽的查询条件中在列里有的情况下不push
                var flag1 = false;// 是否已经添加
                for (var i = 0; i < _set.conlist.length; i++) {
                  if (_set.conlist[i].id == dataList.id) {
                    flag1 = true;
                    break;
                  }
                }
                if (!flag1) {
                  _set.list[index].children.push(dataList);
                  _set.conlist.push(dataList);
                  _set.solutionlist.push(dataList);
                  var optionsTmp = [];
                  for (var i = 0, len = _set.list.length; i < len; i++) {
                    optionsTmp.push(_set.list[i]);
                    if (_set.list[i].children) {
                      var chd = _set.list[i].children;
                      for (var j = 0, lenchd = chd.length; j < lenchd; j++) {
                        optionsTmp.push(chd[j]);
                      }
                    }
                  }
                  _set.columnOptions = optionsTmp;
                  _set.chartTagOptions = optionsTmp;
                  // _set.chartTargetOptions = _set.list;
                  _set.xchartTagOptions = optionsTmp;
                  // _set.ychartTargetOptions = _set.list;
                  _set.colunmNamelist.push(dataList);
                  _set.customersColumnOptions = optionsTmp;
                  _set.firstOptions = optionsTmp;
                  _set.secondOptions = optionsTmp;
                  _set.thirdOptions = optionsTmp;
                  _set.fourOptions = optionsTmp;
                  _set.fiveOptions = optionsTmp;
                } else {
                  _set.list[index].children.push(dataList);
                  _set.solutionlist.push(dataList);
                }
                //          }
              }
            });
          }
        },
        // 获取字段并设置属性
        getConditionField: function (arr, field) {
          var selection = {};
          var obj = {};
          var itempart = [[]];
          var item = {};
          selection.ctype = 'select';
          item.type = '';
          item.options = '';
          item.unit = '';
          if (field.colType == 'VARCHAR2') { // 文本框
            selection.options = this.textOptions;
          } else if (field.colType == 'NUMBER' || field.colType == 'DECIMAL' || field.colType == 'INTEGER') { // 数字框
            selection.options = this.numDataOptions;
          } else if (field.colType == 'DATE' || field.colType == 'TIMESTMP') { // 日期框
            selection.options = this.numDataOptions;
          }
          if (field.fieldType == '1') { // 文本框
            item.ctype = 'input';
          } else if (field.fieldType == '2') { // 数字框
            item.ctype = 'input';
            item.unit = '';
            itempart[0].push(item);
          } else if (field.fieldType == '3') { // 日期框
            item.ctype = 'datepicker';
            item.type = 'date';// daterange
            itempart[0].push(item);
          } else if (field.fieldType == '4') { // 下拉框
            // selection.options = this.radioComboOptions;
            item.ctype = 'select';
            yufp.lookup.bind(field.notes, function (data) {
              item.options = data;
            });
          } else if (field.fieldType == '5') { // 单选框
            // selection.options = this.radioComboOptions;
            item.ctype = 'select';
            yufp.lookup.bind(field.notes, function (data) {
              item.options = data;
            });
          } else if (field.fieldType == '6') { // 多选框
            // selection.options = this.comboSelectOptions;
            item.ctype = 'select';
            yufp.lookup.bind(field.notes, function (data) {
              item.options = data;
            });
          } else if (field.fieldType == '7') { // 放大镜
            // selection.options = this.comboSelectOptions;
            item.ctype = field.fName;
            // item.ctype ='yufp-duty-selector';
          }
          obj.section = selection;
          obj.item = item;
          arr.push(obj);
        },
        rowClickFn: function (selection, row) {
          this.selections = selection;
          // 用于单个修改
          this.filterGrid.currentRow = row;
        },
        /**
* 选择查询结果的表格数据
*/
        selectionChange: function (selection) {
          this.qryresultSelections = selection;
        },
        rowClick: function (row, event, column) {
          this.qryresultSelections = row;
        },
        resetcustomersFn: function () {

        },

        closedialog: function () {
          this.reportdialogVisible = false;
        },
        /** 查询结果 */
        queryInfoFn: function () {
          var _set = this;
          if (_set.list.length == 0) {
            vm.$message({ message: '请先选择查询条件', type: 'warning' });
            return;
          }
          _set.conditionAttrs = [];
          _set.groupAttrs = [];
          _set.results = [];
          _set.qryarr = [];
          // 拼接参数
          for (var i = 0; i < _set.list.length; i++) {
            _set.qryarr = [];
            var info = {};
            var groupAttr = {};
            if (vm.dataSqlTemp[_set.list[i].index].signOp == null || vm.dataSqlTemp[_set.list[i].index].signOp === '' || vm.dataSqlTemp[_set.list[i].index].signOp == undefined) {
              _set.$message('操作符不能为空');
              return;
            }
            if (vm.dataSqlTemp[_set.list[i].index].signVal == null || vm.dataSqlTemp[_set.list[i].index].signVal === '' || vm.dataSqlTemp[_set.list[i].index].signVal == undefined) {
              _set.$message('属性值不能为空');
              return;
            }
            info.SS_COL_ITEM = _set.list[i].id;
            info.SS_COL_OP = vm.dataSqlTemp[_set.list[i].index].signOp;
            info.SS_COL_VALUE = vm.dataSqlTemp[_set.list[i].index].signVal;
            info.SS_COL_GJOIN = vm.dataSqlTemp[_set.list[i].index].radio2;
            info.SS_COL_JOIN = '';
            info.SS_COL_GORDER = i;
            info.SS_COL_ORDER = '0';
            if (info.SS_COL_GJOIN == '并') {
              info.SS_COL_GJOIN = 'and';
            } else if (info.SS_COL_GJOIN == '或') {
              info.SS_COL_GJOIN = 'or';
            }
            _set.qryarr.push(info);
            groupAttr.ssColItem = _set.list[i].id;
            groupAttr.ssColOp = vm.dataSqlTemp[_set.list[i].index].signOp;
            groupAttr.ssColValue = vm.dataSqlTemp[_set.list[i].index].signVal;
            groupAttr.ssColGjoin = vm.dataSqlTemp[_set.list[i].index].radio2;
            groupAttr.ssColJoin = '';
            groupAttr.ssColGorder = i;
            groupAttr.ssColOrder = '0';
            groupAttr.ssId = cust.custGroupId;
            if (groupAttr.ssColGjoin == '并') {
              groupAttr.ssColGjoin = 'and';
            } else if (groupAttr.ssColGjoin == '或') {
              groupAttr.ssColGjoin = 'or';
            }
            _set.groupAttrs.push(groupAttr);
            var childinfo = {};
            if (_set.list[i].children && _set.list[i].children.length > 0) {
              for (var j = 0; j < _set.list[i].children.length; j++) {
                if (vm.dataSqlTemp[_set.list[i].children[j].index].signVal == null || vm.dataSqlTemp[_set.list[i].children[j].index].signVal === '' || vm.dataSqlTemp[_set.list[i].children[j].index].signVal == undefined) {
                  _set.$message('属性值不能为空');
                  return;
                }
                if (vm.dataSqlTemp[_set.list[i].children[j].index].signOp == null || vm.dataSqlTemp[_set.list[i].children[j].index].signOp === '' || vm.dataSqlTemp[_set.list[i].children[j].index].signOp == undefined) {
                  _set.$message('操作符不能为空');
                  return;
                }
                childinfo.SS_COL_ITEM = _set.list[i].children[j].id;
                childinfo.SS_COL_OP = vm.dataSqlTemp[_set.list[i].children[j].index].signOp;
                childinfo.SS_COL_VALUE = vm.dataSqlTemp[_set.list[i].children[j].index].signVal;
                childinfo.SS_COL_GJOIN = '';
                childinfo.SS_COL_GORDER = i;
                childinfo.SS_COL_ORDER = j + 1;
                childinfo.SS_COL_JOIN = vm.dataSqlTemp[_set.list[i].children[j].index].radio2;
                if (childinfo.SS_COL_JOIN == '并') {
                  childinfo.SS_COL_JOIN = 'and';
                } else if (childinfo.SS_COL_JOIN == '或') {
                  childinfo.SS_COL_JOIN = 'or';
                }
              }
              _set.qryarr.push(childinfo);
            }
            _set.conditionAttrs.push(_set.qryarr);
          }
          for (var i = 0; i < _set.list.length; i++) {
            var resultinfo = {};
            resultinfo.columnId = _set.list[i].id;
            resultinfo.sortType = '1';
            resultinfo.columnTotle = '0';
            _set.results.push(resultinfo);
          }
          var param = {
            condition: JSON.stringify({
              conditionAttrs: _set.conditionAttrs,
              results: _set.results,
              topNum: _set.limitNum,
              isexport: '1'
            })
          };
          _set.data = [];
          // 查询当前机构级别
          yufp.service.request({
            method: 'GET',
            url: backend.custflexService + '/api/ocrmfcifqscol/getUuid',
            data: { orgCode: yufp.session.org.code },
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                if (response.data.orgLevel == 1) {
                  // 表示总行级用户
                  param = {
                    condition: JSON.stringify({
                      conditionAttrs: _set.conditionAttrs,
                      results: _set.results,
                      topNum: _set.limitNum,
                      isexport: '1',
                      busiTypeFlag: '1'
                    })
                  };
                }
                // 调用查询结果接口
                yufp.service.request({
                  method: 'GET',
                  data: param,
                  url: backend.adminService + '/api/ocrmfcifqdbcol/querysql',
                  callback: function (code, message, response) {
                    if (code == 0) {
                      var groupAuto = {};
                      groupAuto.custGroupId = cust.custGroupId;
                      groupAuto.sql = response.data.sql;
                      yufp.service.request({
                        method: 'POST',
                        data: groupAuto,
                        url: backend.adminService + '/api/ocrmfcicgbase/updateAuto',
                        callback: function (code, message, response) {
                          if (code == 0) {

                          }
                        }
                      });
                      yufp.service.request({
                        method: 'POST',
                        data: {groupData: _set.groupAttrs},
                        url: backend.adminService + '/api/ocrmfcifqssolution/savegroupscol',
                        callback: function (code, message, response) {
                          if (code == 0) {

                          }
                        }
                      });
                      // if (response.code == 0) {
                      //   _set.dialogFormVisible1 = true;
                      //   var responsedata = response.data;
                      //   _set.pageData.total = response.total;
                      //   if (responsedata.length > 0) {
                      //     querysql = responsedata[0].sql;
                      //   }
                      //   var showdata = [];// 展示数据
                      //   for (var i = 0; i < response.data.length; i++) {
                      //     var aaa = {};
                      //     for (var k in response.data[i]) {
                      //       // 转换时间格式
                      //       if (k.indexOf('Date') != -1) {
                      //         response.data[i][k] = _set.utc2beijing(response.data[i][k]);
                      //       }
                      //       for (var a = 0; a < _set.conlist.length; a++) {
                      //         if (k.indexOf(_set.conlist[a].ename) != -1) {
                      //           aaa[_set.conlist[a].ename] = response.data[i][k];
                      //         }
                      //         aaa['custIdBase'] = response.data[i].custIdBase;
                      //         aaa['custNameBase'] = response.data[i].custNameBase;
                      //       }
                      //     }
                      //     showdata.push(aaa);
                      //   }
                      //   _set.data = showdata;
                      // } else {
                      //   vm.$message({ message: response.message, type: 'warning' });
                      //   _set.dialogFormVisible1 = false;
                      // }
                    }
                  }
                });
                // 调用查询结果接口
              }
            }
          });
        },
        getValueByPath: function (object, prop) {
          prop = prop || '';
          var paths = prop.split('.');
          var current = object;
          var result = null;
          for (var i = 0, j = paths.length; i < j; i++) {
            var path = paths[i];
            if (!current) {
              break;
            }
            if (i === j - 1) {
              result = current[path];
              break;
            }
            current = current[path];
          }
          return result;
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
        },

        /** 报表发布 */
        reportPubFn: function () {
          this.reportdialogVisible = true;
          vm.reportTemp.reportName = '';
        },
        /** 保存为客户群 */
        saveAsCustGroupFn: function () {
          // if (querysql == '') {
          //   vm.$message({ message: '请先执行查询结果！', type: 'warning' });
          //   return;
          // }
          this.addcustomersdialogVisible = true;
          this.$nextTick(function () {
            this.resetForm();
          });
        },
        resetForm: function () {
          vm.customersTemp.custGroupName = '';
          vm.customersTemp.custGroupType = '';
          vm.customersTemp.customersColumn = '';
          vm.customersTemp.groupMemberType = '';
          vm.customersTemp.batchType = '';
          vm.customersTemp.remark = '';
        },
        // 保存为客户群 保存
        savecustomers: function () {
          var _set = this;
          if (_set.list.length == 0) {
            vm.$message({ message: '请先选择查询条件', type: 'warning' });
            return;
          }
          _set.conditionAttrs = [];
          _set.results = [];
          _set.qryarr = [];
          // 拼接参数
          for (var i = 0; i < _set.list.length; i++) {
            _set.qryarr = [];
            var info = {};
            if (vm.dataSqlTemp[_set.list[i].index].signOp == null || vm.dataSqlTemp[_set.list[i].index].signOp === '' || vm.dataSqlTemp[_set.list[i].index].signOp == undefined) {
              _set.$message('操作符不能为空');
              return;
            }
            if (vm.dataSqlTemp[_set.list[i].index].signVal == null || vm.dataSqlTemp[_set.list[i].index].signVal === '' || vm.dataSqlTemp[_set.list[i].index].signVal == undefined) {
              _set.$message('属性值不能为空');
              return;
            }
            info.SS_COL_ITEM = _set.list[i].id;
            info.SS_COL_OP = vm.dataSqlTemp[_set.list[i].index].signOp;
            info.SS_COL_VALUE = vm.dataSqlTemp[_set.list[i].index].signVal;
            info.SS_COL_GJOIN = vm.dataSqlTemp[_set.list[i].index].radio2;
            info.SS_COL_JOIN = '';
            info.SS_COL_GORDER = i;
            info.SS_COL_ORDER = '0';
            if (info.SS_COL_GJOIN == '并') {
              info.SS_COL_GJOIN = 'and';
            } else if (info.SS_COL_GJOIN == '或') {
              info.SS_COL_GJOIN = 'or';
            }
            _set.qryarr.push(info);
            var childinfo = {};
            if (_set.list[i].children && _set.list[i].children.length > 0) {
              for (var j = 0; j < _set.list[i].children.length; j++) {
                childinfo.SS_COL_ITEM = _set.list[i].children[j].id;
                if (vm.dataSqlTemp[_set.list[i].children[j].index].signVal == null || vm.dataSqlTemp[_set.list[i].children[j].index].signVal === '' || vm.dataSqlTemp[_set.list[i].children[j].index].signVal == undefined) {
                  _set.$message('属性值不能为空');
                  return;
                }
                if (vm.dataSqlTemp[_set.list[i].children[j].index].signOp == null || vm.dataSqlTemp[_set.list[i].children[j].index].signOp === '' || vm.dataSqlTemp[_set.list[i].children[j].index].signOp == undefined) {
                  _set.$message('操作符不能为空');
                  return;
                }
                childinfo.SS_COL_OP = vm.dataSqlTemp[_set.list[i].children[j].index].signOp;
                childinfo.SS_COL_VALUE = vm.dataSqlTemp[_set.list[i].children[j].index].signVal;
                childinfo.SS_COL_GJOIN = '';
                childinfo.SS_COL_GORDER = i;
                childinfo.SS_COL_ORDER = j + 1;
                childinfo.SS_COL_JOIN = vm.dataSqlTemp[_set.list[i].children[j].index].radio2;
                if (childinfo.SS_COL_JOIN == '并') {
                  childinfo.SS_COL_JOIN = 'and';
                } else if (childinfo.SS_COL_JOIN == '或') {
                  childinfo.SS_COL_JOIN = 'or';
                }
              }
              _set.qryarr.push(childinfo);
            }
            _set.conditionAttrs.push(_set.qryarr);
          }
          for (var i = 0; i < _set.conlist.length; i++) {
            var resultinfo = {};
            resultinfo.columnId = _set.conlist[i].id;
            resultinfo.sortType = vm.dataTemp[_set.conlist[i].indexs].orderType;
            resultinfo.columnTotle = '0';
            _set.results.push(resultinfo);
          }

          var param = {
            condition: JSON.stringify({
              conditionAttrs: _set.conditionAttrs,
              results: _set.results,
              topNum: _set.limitNum,
              isexport: '1'
            })
          };
          yufp.service.request({
            method: 'GET',
            data: param,
            url: backend.adminService + '/api/ocrmfcifqdbcol/queryresult',
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                querysql = response.data[0].sql;
                _set.$refs.customersTemp.validate(function (valid) {
                  if (valid) {
                    var model = {};
                    yufp.extend(model, _set.$refs.customersTemp.model);
                    model.custOrigin = '2';
                    model.sql = querysql;
                    yufp.service.request({
                      method: 'POST',
                      url: backend.adminService + '/api/ocrmfcicgbase/add',
                      data: model,
                      callback: function (code, message, response) {
                        if (code == '0') {
                          vm.$message({ message: '保存成功!', type: 'info' });
                          vm.addcustomersdialogVisible = false;
                        } else {
                          vm.$message({ message: '保存失败!', type: 'warning' });
                          vm.addcustomersdialogVisible = false;
                        }
                      }
                    });
                  }
                });
              }
            }
          });
        },
        onAfterCloseFn: function () {

        },
        closecustomers: function () {
          this.customersdialogVisible = false;
        },
        closesave: function () {
          this.solutionformVisible = false;
        },
        closeaddcustomers: function () {
          this.addcustomersdialogVisible = false;
        },
        /** 手动标签 */
        manulTagFn: function () {

        },
        /** 保存方案*/
        saveSetFn: function () {
          if (this.list.length == 0) {
            vm.$message({ message: '请先选择查询条件', type: 'warning' });
            return;
          }
          this.solutionformVisible = true;
          this.$nextTick(function () {
            vm.itemssTemp.ssName = '';
          });
        },
        saveSolutionsub: function () {
          var _set = this;
          if (vm.itemssTemp.ssName == '') {
            vm.$message({ message: '请填写方案名称！', type: 'warning' });
            return;
          }
          // 拼接参数begin
          _set.conditionAttrs = [];
          _set.solution = [];
          for (var i = 0; i < _set.list.length; i++) {
            _set.qryarr = [];
            var info = {};
            info.ssColItem = _set.list[i].id;
            if (vm.dataSqlTemp[_set.list[i].index].signOp == null || vm.dataSqlTemp[_set.list[i].index].signOp === '' || vm.dataSqlTemp[_set.list[i].index].signOp == undefined) {
              _set.$message('操作符不能为空');
              return;
            }
            if (vm.dataSqlTemp[_set.list[i].index].signVal == null || vm.dataSqlTemp[_set.list[i].index].signVal === '' || vm.dataSqlTemp[_set.list[i].index].signVal == undefined) {
              _set.$message('属性值不能为空');
              return;
            }
            info.ssColOp = vm.dataSqlTemp[_set.list[i].index].signOp;
            info.ssColValue = vm.dataSqlTemp[_set.list[i].index].signVal;
            info.ssColGjoin = vm.dataSqlTemp[_set.list[i].index].radio2;
            info.ssColJoin = '';
            info.ssColGorder = i;
            info.ssColOrder = '0';
            info.ssId = '1';
            if (info.ssColGjoin == '并') {
              info.ssColGjoin = 'and';
            } else if (info.ssColGjoin == '或') {
              info.ssColGjoin = 'or';
            }
            _set.conditionAttrs.push(info);
            var childinfo = {};
            if (_set.list[i].children && _set.list[i].children.length > 0) {
              for (var j = 0; j < _set.list[i].children.length; j++) {
                if (vm.dataSqlTemp[_set.list[i].children[j].index].signVal == null || vm.dataSqlTemp[_set.list[i].children[j].index].signVal === '' || vm.dataSqlTemp[_set.list[i].children[j].index].signVal == undefined) {
                  _set.$message('属性值不能为空');
                  return;
                }
                if (vm.dataSqlTemp[_set.list[i].children[j].index].signOp == null || vm.dataSqlTemp[_set.list[i].children[j].index].signOp === '' || vm.dataSqlTemp[_set.list[i].children[j].index].signOp == undefined) {
                  _set.$message('操作符不能为空');
                  return;
                }
                childinfo.ssColItem = _set.list[i].children[j].id;
                childinfo.ssColOp = vm.dataSqlTemp[_set.list[i].children[j].index].signOp;
                childinfo.ssColValue = vm.dataSqlTemp[_set.list[i].children[j].index].signVal;
                childinfo.ssColGjoin = '';
                childinfo.ssColOrder = j + 1;
                childinfo.ssColGorder = i;
                childinfo.ssColJoin = vm.dataSqlTemp[_set.list[i].children[j].index].radio2;
                if (childinfo.ssColJoin == '并') {
                  childinfo.ssColJoin = 'and';
                } else if (childinfo.ssColJoin == '或') {
                  childinfo.ssColJoin = 'or';
                }
              }
              _set.conditionAttrs.push(childinfo);
            }
          }
          var resultinfo = {};
          var ssResult = '';
          var ssSort = '';
          for (var i = 0; i < _set.solutionlist.length; i++) {
            ssResult += _set.solutionlist[i].id;
            ssSort += vm.dataTemp[_set.solutionlist[i].indexs].orderType;
            if (i != _set.solutionlist.length - 1) {
              ssResult += ',';
              ssSort += ',';
            }
          }
          resultinfo.ssResult = ssResult;
          resultinfo.ssSort = ssSort;
          resultinfo.ssType = '1';
          resultinfo.ssName = vm.itemssTemp.ssName;
          resultinfo.id = '1';
          resultinfo.topNum = _set.limitNum;
          _set.solution.push(resultinfo);
          // 拼接参数end
          // 校验方案名称是否存在
          yufp.service.request({
            url: backend.adminService + '/api/ocrmfcifqssolution/checkssolution/',
            method: 'get',
            data: {
              ssName: vm.itemssTemp.ssName
            },
            callback: function (code, message, response) {
              if (code == '0') {
                if (response.data.length != 0) {
                  // ssId = response.data[0].ssId;
                  vm.$confirm('该方案已经存在，是否更新当前方案?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                  }).then(function () { // 是的情况 更新当前方案
                    yufp.service.request({
                      url: backend.adminService + '/api/ocrmfcifqssolution/updatescol',
                      method: 'POST',
                      data: {
                        nodeData: JSON.stringify(_set.conditionAttrs),
                        connData: JSON.stringify(_set.solution)
                      },
                      async: false,
                      callback: function (code, message, response) {
                        if (code == '0') {
                          vm.$message({ message: '更新方案成功!', type: 'info' });
                          vm.solutionformVisible = false;
                        }
                      }
                    });
                  }).catch(function () { // 否的情况 新增
                    vm.$message({ message: '该方案已经存在，请修改方案名称!', type: 'warning' });
                  });
                } else {
                  _set.savescol(_set.conditionAttrs, _set.solution);
                }
              } else {
                vm.$message({ message: '校验方案名称是否存在失败!', type: 'warning' });
              }
            }
          });
        },

        savescol: function (conditionAttrs, solution) {
          yufp.service.request({
            url: backend.adminService + '/api/ocrmfcifqssolution/savescol/',
            method: 'POST',
            data: {
              nodeData: JSON.stringify(conditionAttrs),
              connData: JSON.stringify(solution)
            },
            callback: function (code, message, response) {
              if (code == '0') {
                vm.$message({ message: '新增方案成功!', type: 'info' });
                vm.solutionformVisible = false;
              } else {
                vm.$message({ message: '新增方案失败!', type: 'warning' });
                vm.solutionformVisible = false;
              }
            }
          });
        },
        closecase: function () {
          this.casedialogVisible = false;
        },
        choosecustomers: function () {
        },
        closechoose: function () {
        },
        /** 重置 */
        resetconditionFn: function () {
          this.list = [];
          this.colunmNamelist = [{ 'name': '主表客户编号', 'id': '', 'ename': 'custIdBase' }, { 'name': '主表客户名称', 'id': '', 'ename': 'custNameBase' }];
          this.conlist = [];
          this.columnOptions = [];
          this.firstOptions = [];
          this.secondOptions = [];
          this.thirdOptions = [];
          this.fourOptions = [];
          this.fiveOptions = [];
          this.chartTagOptions = [];
          this.chartTargetOptions = [];
          this.xchartTagOptions = [];
          this.ychartTargetOptions = [];
        }
      }
    });
  };
});