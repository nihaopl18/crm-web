/**
 * @created by zhuly6 onon 2019-1-15
 * @description 统计分析-灵活报表查询
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
    var graphSql = '';
    var graphInfo;
    var sumNamesOptions = [];
    yufp.lookup.reg('CD0016,CUST_STAT,CD0011');
    var vm = yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          echartData: {}, // 图表预览
          async: false,
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
          pageData: {
            total: 0,
            page: 1,
            size: 10,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageKey: 'page',
            sizeKey: 'size'
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
            { label: '报表名称', prop: 'reportName', resizable: true }
            // { label: '创建人', prop: 'userName', resizable: true }

            // { label: '创建人', prop: 'ssUser', resizable: true },
            // { label: '创建机构', prop: 'createOrg', resizable: true }
          ],
          queryFieldss: [
            {
              placeholder: '客户群名称', field: 'custGroupIds', type: 'custom', is: 'yufp-custGroup'
              //          	,clickFn:function(){
              //           _self.$nextTick(function () {
              //			 var qrycondition = 	_self.$refs.aaa.$refs.custGroupIds[0].$refs.queryCondition;
              //            var fd = qrycondition.fieldData[1].field;
              //            var jon={};
              //            jon[fd] ='2';
              //			  yufp.clone(jon, qrycondition.fm);
              //            qrycondition.switch(fd, 'disabled', true);
              //            var param = { condition: JSON.stringify(qrycondition.fm) };
              //			 _self.$refs.aaa.$refs.custGroupIds[0].queryFn(param);
              //          })
              //          }
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
          ssolutionUrl: backend.adminService + '/api/ocrmacifqreport/getlist',
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
            remark: ''
          },
          ruless: {
            custGroupName: [{ required: true, message: '必填项', trigger: 'blur' }],
            custGroupType: [{ required: true, message: '必填项', trigger: 'blur' }],
            // customersColumn:[{required: true, message: '必填项', trigger: 'blur'}],
            groupMemberType: [{ required: true, message: '必填项', trigger: 'blur' }],
            batchType: [{ required: true, message: '必填项', trigger: 'blur' }]
          },
          list: [],
          data: [],
          conditionAttrs: [],
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
          formDisabled: false,
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
          async: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          radioshow: true,
          dragnode: '',
          radio2: '',

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
        yufp.lookup.bind('COUNT_SUM', function (data) {
          me.countSumOptions = data;
        });
        var codeModel = '';
        for (var i = 0; i < yufp.session.roles.length; i++) {
          if (yufp.session.roles[i].code != null) {
            codeModel += yufp.session.roles[i].id;
            if (i != yufp.session.roles.length - 1) {
              codeModel += ',';
            }
          }
        }
        var param = { condition: JSON.stringify({ rolesCode: codeModel }) };
        me.$refs.filterTable.remoteData(param);
      },
      methods: {
        getdata: function (value) {
          this.treedata = value;
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
        // 双击方案列表回显示方案
        dblclick: function (row, event) {
          var reportId = row.reportId;
          var ssResult = row.ssResult.split(',');// 取出显示列3354,3346
          var ssSort = row.ssSort.split(',');// 取出排序1,1
          for (var i = 0; i < ssResult.length; i++) {
            var sslist = {};
            sslist.id = ssResult[i];
            sslist.orderType = ssSort[i];
            // 根据后台id遍历树对应名称
            var tempTreeData = vm.treedata;
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
            vm.$set(vm.dataTemp, sslist.indexs, {
              proPer: sslist.name,
              orderType: sslist.orderType
            });
            vm.conlist.push(sslist);
            vm.colunmNamelist.push(sslist);
            vm.solutionlist.push(sslist);
          }
          // 查询条件回显示
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/ocrmfcifqscol/getscol',
            async: false,
            data: {
              ssId: reportId
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
        // 新增方案按钮 清空查询条件和显示列数据
        datasetaddFn: function () {
          this.list = [];
          this.conlist = [];
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
        childrenallowDrop: function (event, index) {
          event.stopPropagation();
          if (this.dragnode.childNodes.length == 0) {
            this.list[index].children.push('1');
          }
        },
        Dragover: function (event) {
          event.preventDefault();
        },
        //		nodeClickFn: function(nodeData, node, self) {
        //			if(node.isLeaf){
        //			    this.addTabInfoFn(nodeData);
        //			}
        //		},
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

                // 查询拖拽的字段类型
                //          var flag=false;//是否已经添加
                //          for (var i = 0; i < _set.list.length; i++) {
                //            if(_set.list[i].id==dataList.id){
                //                flag=true;
                //                break;
                //            }
                //          }
                //          if(!flag){
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
        addTabInfoFn: function (node) {
          var _set = this;

          if (node) {
            var dataList = {};
            dataList.index = _set.list.length;
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
                _set.getConditionField(_set.conditionField, data[0]);
                dataList.section = _set.conditionField[0].section;
                dataList.items = _set.conditionField[0].item;

                // 查询拖拽的字段类型
                //          var flag=false;//是否已经添加
                //          for (var i = 0; i < _set.list.length; i++) {
                //            if(_set.list[i].id==dataList.id){
                //                flag=true;
                //                break;
                //            }
                //          }
                //          if(!flag){
                _set.list.push(dataList);
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
                // 判断当拖拽的查询条件中在列里有的情况下不push
                var flag1 = false;// 是否已经添加
                for (var i = 0; i < _set.conlist.length; i++) {
                  if (_set.conlist[i].id == dataList.id) {
                    flag1 = true;
                    break;
                  }
                }
                if (!flag1) {
                  _set.conlist.push(dataList);
                  _set.solutionlist.push(dataList);
                  _set.columnOptions = _set.list;
                  _set.chartTagOptions = _set.list;
                  // _set.chartTargetOptions = _set.list;
                  _set.xchartTagOptions = _set.list;
                  // _set.ychartTargetOptions = _set.list;
                  _set.colunmNamelist.push(dataList);
                  _set.customersColumnOptions = _set.list;
                  _set.firstOptions = _set.list;
                  _set.secondOptions = _set.list;
                  _set.thirdOptions = _set.list;
                  _set.fourOptions = _set.list;
                  _set.fiveOptions = _set.list;
                }
                //          }
              }
            });
          }

        },
        // 显示列拖拽
        addTabInfoFns: function (node) {
          var _set = this;
          if (node) {
            var dataList = {};
            dataList.index = _set.list.length;
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
            if (_set.conlist.length == 0) {
              dataList.and = '';
              dataList.or = '';
              _set.radio2 = '0';
            } else {
              dataList.and = '并';
              dataList.or = '或';
              _set.radio2 = '2';
            }


            var flag = false;// 是否已经添加
            for (var i = 0; i < _set.conlist.length; i++) {
              if (_set.conlist[i].id == dataList.id) {
                flag = true;
                break;
              }
            }
            if (!flag) {
              _set.conlist.push(dataList);
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
              _set.columnOptions = _set.list;
              _set.chartTagOptions = _set.list;
              // _set.chartTargetOptions = _set.list;
              _set.xchartTagOptions = _set.list;
              // _set.ychartTargetOptions = _set.list;
              _set.solutionlist.push(dataList);
              _set.colunmNamelist.push(dataList);
              _set.customersColumnOptions = _set.list;
              _set.firstOptions = _set.list;
              _set.secondOptions = _set.list;
              _set.thirdOptions = _set.list;
              _set.fourOptions = _set.list;
              _set.fiveOptions = _set.list;
            }
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
            // selection.options = this.textOptions;
            item.ctype = 'input';
          } else if (field.fieldType == '2') { // 数字框
            // selection.options = this.numDataOptions;
            item.ctype = 'input';
            item.unit = '万元';
            itempart[0].push(item);
          } else if (field.fieldType == '3') { // 日期框
            // selection.options = this.numDataOptions;
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
        handleRow: function (index, rows) {
          if (rows[index].summColumn == '' || rows[index].summType == '') {
            return;
          }
          // 根据key值找到数据字典中对应的value
          var typeOption = yufp.lookup.find('TYPE_OPTION', false);
          var summTypeName = typeOption[rows[index].summType];
          for (var i = 0, len = this.columnOptions.length; i < len; i++) {
            if (this.columnOptions[i].id == rows[index].summColumn) {
              var summColumnName = this.columnOptions[i].name;
              if (this.columnOptions[i].colType == 'VARCHAR2') {
                if (rows[index].summType != '1' && rows[index].summType != '2') {
                  this.$message({ type: 'warning', message: '汇总类型只能选择"汇总数量"或"汇总数值"' });
                  return;
                }
              } else if (this.columnOptions[i].colType == 'NUMBER') {
                if (rows[index].summType == '1' || rows[index].summType == '2') {
                  this.$message({ type: 'warning', message: '汇总类型不能选择"汇总数量"或"汇总数值"' });
                  return;
                }
              } else {
                this.$message({ type: 'warning', message: '不能查询汇总信息' });
                return;
              }
              break;
            }
          }
          rows[index].summName = summColumnName + summTypeName;
          var tableDatalist = this.$refs.grouptable.data;
          tableDatalist[index].summName = rows[index].summName;
        },
        // 图表预览
        // drawImage: function () {
        //   var customerImage = document.getElementById('echartsPie');
        //   var customerImage1 = document.getElementById('echartsPie1');
        //   var myChart = echarts.init(customerImage);
        //   var myChart1 = echarts.init(customerImage1);
        //   if (this.chartTemp.chartType == 1) {
        //     document.getElementById('echartsPie1').style.display = 'none';
        //     document.getElementById('echartsPie').style.display = 'block';
        //     var option = {
        //       title: {
        //         text: '',
        //         x: 'left',
        //         textStyle: {
        //           color: '#FFFFFF',
        //           fontSize: 25
        //         }
        //       },
        //       tooltip: {
        //         trigger: 'item',
        //         formatter: '{a} <br/>{b} : {c}百分比'
        //       },
        //       legend: {
        //         orient: 'vertical',
        //         x: 'left',
        //         top: 70,
        //         itemWidth: 60,
        //         itemHeight: 30,
        //         formatter: '{name}',
        //         textStyle: {
        //           color: '#2E2E2E'
        //         },
        //         data: [{ name: '客户号00015', icon: 'rect' }, { name: '客户号00215', icon: 'rect' }]
        //       },
        //       calculable: true,
        //       series: [
        //         {
        //           name: '',
        //           type: 'pie',
        //           radius: '70%', // 饼图的半径大小
        //           center: ['60%', '60%'], // 饼图的位置
        //           label: { // 饼图图形上的文本标签
        //             normal: {
        //               show: true,
        //               position: 'inner', // 标签的位置
        //               textStyle: {
        //                 fontWeight: 300,
        //                 fontSize: 16 // 文字的字体大小
        //               },
        //               formatter: '{d}%'


        //             }
        //           },
        //           xAxis: [],
        //           yAxis: [],
        //           data: [
        //             { value: 25, name: '客户号00015', itemStyle: { normal: { color: '#EEEE00' } } },
        //             { value: 75, name: '客户号00215', itemStyle: { normal: { color: '#B0E2FF' } } }

        //           ]
        //         }
        //       ]
        //     };
        //     myChart.setOption(option);
        //   } else {
        //     document.getElementById('echartsPie1').style.display = 'block';
        //     document.getElementById('echartsPie').style.display = 'none';
        //     var option1 = {
        //       title: {
        //         text: '',
        //         subtext: ''
        //       },
        //       tooltip: {
        //         trigger: 'axis'
        //       },
        //       legend: {
        //         data: ['客户号']
        //       },
        //       toolbox: {
        //         show: true,
        //         feature: {
        //           mark: { show: true },
        //           dataView: { show: true, readOnly: false },
        //           magicType: { show: true, type: ['line', 'bar'] },
        //           restore: { show: true },
        //           saveAsImage: { show: true }
        //         }
        //       },
        //       calculable: true,
        //       xAxis: [
        //         {
        //           type: 'category',
        //           boundaryGap: false,
        //           data: ['00015', '00215', '00215']
        //         }
        //       ],
        //       yAxis: [
        //         {
        //           type: 'value',
        //           axisLabel: {
        //             formatter: '{value}'
        //           }
        //         }
        //       ],
        //       series: [
        //         {
        //           name: '',
        //           type: 'line',
        //           data: [1, 1, 3],
        //           markPoint: {
        //             data: [
        //               { type: 'max', name: '最大值' },
        //               { type: 'min', name: '最小值' }
        //             ]
        //           }
        //         }
        //       ]
        //     };
        //     myChart1.setOption(option1);
        //   }
        // },
        // 图表预览
        drawImage: function () {
          var _this = this;
          var labelColumnValue = '';
          var valueColumnValue = '';
          if (vm.chartTemp.chartType == 'pie') { // 如果图表类型是饼图
            // 遍历标签项，处理得到 labelColumnValue
            for (var i = 0, len = this.chartTagOptions.length; i < len; i++) {
              if (this.chartTagOptions[i].id == vm.chartTagTemp.chartTag) {
                labelColumnValue = this.chartTagOptions[i].name;
                break;
              }
            }
            // 遍历指标项，处理得到 valueColumnValue
            for (var j = 0, len = this.chartTargetOptions.length; j < len; j++) {
              if (this.chartTargetOptions[j].key == vm.chartTagTemp.chartTarget) {
                valueColumnValue = this.chartTargetOptions[j].name;
                break;
              }
            }
            graphInfo = {
              'labelColumnKey': vm.chartTagTemp.chartTag,
              'labelColumnValue': labelColumnValue,
              'valueColumnKey': vm.chartTagTemp.chartTarget,
              'valueColumnValue': valueColumnValue
            };
          } else if (vm.chartTemp.chartType == 'line' || vm.chartTemp.chartType == 'bar') { // 如果图表类型是其他
            for (var i = 0, len = this.xchartTagOptions.length; i < len; i++) {
              if (this.xchartTagOptions[i].id == vm.ychartNameTemp.xchartTag) {
                labelColumnValue = this.xchartTagOptions[i].name;
                break;
              }
            }
            for (var j = 0, len = this.ychartTargetOptions.length; j < len; j++) {
              if (this.ychartTargetOptions[j].key == vm.ychartNameTemp.ychartTarget) {
                valueColumnValue = this.ychartTargetOptions[j].value;
                break;
              }
            }
            graphInfo = {
              'yName': vm.ychartNameTemp.ychartName,
              'yMinValue': vm.ychartNameTemp.ychartBegin,
              'labelColumnKey': vm.ychartNameTemp.xchartTag,
              'labelColumnValue': labelColumnValue,
              'valueColumnKey': vm.ychartNameTemp.ychartTarget,
              'valueColumnValue': valueColumnValue
            };
          };
          if (!graphSql) {
            _this.$message({
              type: 'warning',
              message: '确少查询项数据信息'
            });
            return;
          }
          yufp.service.request({
            method: 'POST',
            url: '/api/ocrmfsysusertile/sql',
            data: { condition: JSON.stringify({ sql: graphSql }) },
            callback: function (code, message, response) {
              var graphType = vm.chartTemp.chartType;
              var response = response.data;
              var graphInfos = graphInfo;
              _this.creatGraph(graphType, graphInfos, response);
            }
          });
        },
        // 拼接图表
        creatGraph: function (type, infor, response) {
          var option = {};
          var series = {};
          var xAxis = {};
          var xAxisData = [];
          series.type = type;
          // var isstring = infor instanceof String;
          var nameId = infor.labelColumnKey.replace(/_(\w)/g, function (all, letter) {
            return letter.toUpperCase();
          });
          var data = [];
          for (var i = 0, l = response.length; i < l; i++) {
            var dataItem = {};
            Object.keys(response[i]).forEach(function (item, index) {
              if (item === nameId || (item.indexOf('Sum') === -1 && item.indexOf(nameId) > -1)) {
                if (type === 'pie') {
                  dataItem.name = response[i][item];
                } else {
                  xAxisData.push(response[i][item]);
                }
              } else {
                if (type === 'pie') {
                  dataItem.value = response[i][item];
                } else {
                  data.push(response[i][item]);
                }
              }
            });
            if (type === 'pie') {
              data.push(dataItem);
            } else {
              xAxis.data = data;
            }
          }
          series.data = data;
          option.series = series;
          if (type === 'line' || type === 'bar') {
            var yAxis = {};
            yAxis.min = infor.yMinValue;
            yAxis.name = infor.yName;
            option.xAxis = xAxis;
            option.yAxis = yAxis;
          }
          this.echartData = option;
        },
        // 图表发布
        graphpub: function () {
          var _set = this;
          var model = {};
          model.graphSql = graphSql;
          model.graphInfo = graphInfo;
          model.graphName = vm.chartTemp.chartName;
          model.graphType = vm.chartTemp.chartType;
          model.graphSize = vm.chartTemp.chartSize;
          yufp.service.request({
            method: 'POST',
            url: '/api/ocrmfcifqdbcol/addgraph',
            data: model,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _set.$message({ message: '发布成功！' });
              } else {
                _set.$message.error('发布失败');
              }
            }
          });
        },
        rowClickFn: function (selection, row) {
          this.selections = selection;
          // 用于单个修改
          this.filterGrid.currentRow = row;
        },
        // 批量删除方案
        datasetDeleteFn: function () {
          var ids = '';
          var filterSelecttions = this.$refs.filterTable.selections;
          if (filterSelecttions.length > 0) {
            for (var i = 0; i < filterSelecttions.length; i++) {
              // 记录多选用于多删
              if (filterSelecttions.length === 1) {
                ids = filterSelecttions[i].id;
              } else {
                ids = ids + ',' + filterSelecttions[i].id;
              }
            }
          } else {
            vm.$message({ message: '请选择需要删除的系统参数!' });
            return false;
          }
          vm.$confirm('确认批量删除该系统参数?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            yufp.service.request({
              url: backend.adminService + '/api/ocrmfcifqssolution/deletes/' + ids,
              method: 'post',
              data: vm.filterGrid.currentRow,
              callback: function (code, message, response) {
                if (code == '0') {
                  vm.$message({ message: '删除成功!' });
                  vm.$refs.filterTable.remoteData();
                } else {
                  vm.$message({ message: '删除失败!' });
                }
              }
            });
          });
        },
        /** tab点击事件*/
        handleClick: function () {

        },
        // 选择图表类型
        chartchange: function (value) {
          var vue = this;
          if (value == 'pie') {
            vue.showPrise = true;
            vue.showRentPrise = false;
          } else {
            vue.showPrise = false;
            vue.showRentPrise = true;
          }
        },

        // 打开客户视图
        opencustViewFn: function () {
          var me = this;
          var customKey = 'custom_' + new Date().getTime(); // 请以custom_前缀开头，并且全局唯一
          var qrycustId = this.$refs.qryresult.selection[0].custIdBase;
          var custType = '';
          me.$refs.qryresult.selection[0].custId = me.$refs.qryresult.selection[0].custIdBase;
          yufp.service.request({
            method: 'get',
            url: backend.adminService + '/api/acimfcicustomer/getcusttype',
            data: { custId: qrycustId },
            callback: function (code, message, response) {
              if (code == '0') {
                if (response.data.length != 0) {
                  custType = response.data[0].custType;
                  if (custType == '1') {
                    var routeId = 'custView1'; // 模板示例->普通查询的路由ID
                    yufp.frame.addTab({
                      id: routeId, // 菜单功能ID（路由ID）
                      key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                      title: '客户视图:' + me.$refs.qryresult.selection[0].custNameBase, // 页签名称徐娜
                      data: { cust: me.$refs.qryresult.selection[0] } // 传递的业务数据，可选配置
                    });
                    me.dialogFormVisible1 = false;
                  } else if (custType == '2') {
                    var routeId = 'custView2'; // 模板示例->普通查询的路由ID
                    yufp.frame.addTab({
                      id: routeId, // 菜单功能ID（路由ID）
                      key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                      title: '客户视图:' + me.$refs.qryresult.selection[0].custNameBase, // 页签名称徐娜
                      data: { cust: me.$refs.qryresult.selection[0] } // 传递的业务数据，可选配置
                    });
                    me.dialogFormVisible1 = false;
                  }
                }
              } else {
                vm.$message({ message: '查询失败!', type: 'warning' });
              }
            }
          });
        },

        resetcustomersFn: function () {

        },

        // 报表发布提交按钮
        reportPublish: function () {
          if (this.reportTemp.reportName == '') {
            this.$message({ message: '请填写报表名称！' });
            return;
          }

          var _set = this;
          if (_set.list.length == 0) {
            vm.$message({ message: '请先选择查询条件', type: 'warning' });
            return;
          }
          _set.conditionAttrs = [];
          _set.results = [];
          _set.solution = [];

          // 拼接参数
          for (var i = 0; i < _set.list.length; i++) {
            var info = {};
            info.SS_COL_ITEM = _set.list[i].id;
            info.SS_COL_OP = vm.dataSqlTemp[_set.list[i].index].signOp;
            info.SS_COL_VALUE = vm.dataSqlTemp[_set.list[i].index].signVal;
            info.SS_COL_GJOIN = vm.dataSqlTemp[_set.list[i].index].radio2;
            info.SS_COL_JOIN = '';
            if (info.SS_COL_GJOIN == '并') {
              info.SS_COL_GJOIN = 'and';
            } else if (info.SS_COL_GJOIN == '或') {
              info.SS_COL_GJOIN = 'or';
            }
            _set.conditionAttrs.push(info);
          }
          for (var i = 0; i < _set.conlist.length; i++) {
            var resultinfo = {};
            var solutionAttr = {};
            resultinfo.columnId = _set.conlist[i].id;
            resultinfo.sortType = vm.dataTemp[_set.conlist[i].indexs].orderType;
            resultinfo.columnTotle = '0';
            _set.results.push(resultinfo);
            solutionAttr.SS_RESULT = _set.conlist[i].id;
            solutionAttr.SS_SORT = vm.dataTemp[_set.conlist[i].indexs].orderType;
            solutionAttr.TOP_NUM = _set.limitNum;
            _set.solution.push(solutionAttr);
          }

          var param = {
            conditionAttrs: JSON.stringify(_set.conditionAttrs),
            results: JSON.stringify(_set.results),
            solutionAttr: JSON.stringify(_set.solution)
          };
          yufp.service.request({
            method: 'post',
            data: param,
            url: backend.adminService + '/api/ocrmfcifqdbcol/createreport/' + vm.reportTemp.reportName,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _set.$message({ message: '报表发布成功！' });
                _set.reportdialogVisible = false;
              } else {
                _set.$message.error('发布失败');
              }
            }
          });
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
          _set.results = [];
          _set.qryarr = [];
          // 拼接参数
          for (var i = 0; i < _set.list.length; i++) {
            _set.qryarr = [];
            var info = {};
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
              isexport: '1',
              page: _set.pageData.page,
              size: _set.pageData.size
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
                      busiTypeFlag: '1',
                      page: _set.pageData.page,
                      size: _set.pageData.size
                    })
                  };
                }
                // 调用查询结果接口
                yufp.service.request({
                  method: 'GET',
                  data: param,
                  url: backend.adminService + '/api/ocrmfcifqdbcol/queryresult',
                  callback: function (code, message, response) {
                    if (code == 0) {
                      if (response.code == 0) {
                        _set.dialogFormVisible1 = true;
                        var responsedata = response.data;
                        _set.pageData.total = response.total;
                        if (responsedata.length > 0) {
                          querysql = responsedata[0].sql;
                        }
                        var showdata = [];// 展示数据

                        for (var i = 0; i < response.data.length; i++) {
                          var aaa = {};
                          for (var k in response.data[i]) {
                            // 转换时间格式
                            if (k.indexOf('Date') != -1) {
                              response.data[i][k] = _set.utc2beijing(response.data[i][k]);
                            }
                            for (var a = 0; a < _set.conlist.length; a++) {
                              if (k.indexOf(_set.conlist[a].ename) != -1) {
                                aaa[_set.conlist[a].ename] = response.data[i][k];
                              }
                              aaa['custIdBase'] = response.data[i].custIdBase;
                              aaa['custNameBase'] = response.data[i].custNameBase;
                            }
                          }
                          showdata.push(aaa);
                        }

                        _set.data = showdata;
                      } else {
                        vm.$message({ message: response.message, type: 'warning' });
                        _set.dialogFormVisible1 = false;
                      }
                    }
                  }
                });
                // 调用查询结果接口
              }
            }
          });
        },
        utc2beijing: function (UTCDateString) {
          if (!UTCDateString) {
            return '-';
          }
          function formatFunc(str) { // 格式化显示
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
          var me = this;
          this.$refs.customersTemp.validate(function (valid) {
            if (valid) {
              var model = {};
              yufp.extend(model, me.$refs.customersTemp.model);
              model.custOrigin = '2';
              model.sql = querysql;
              yufp.service.request({
                method: 'POST',
                url: backend.adminService + '/api/cimpccgbaseinfo/add',
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
        },
        exportInfoFn: function () {
          var _this = this;
          // 应先判断当前用户的层级关系
          // 1表示不脱敏导出
          // console.log('*****' + JSON.stringify(_this.$refs.qryresult.selection));
          // _this.$confirm('是否不脱敏导出?', '提示', {
          //   confirmButtonText: '是',
          //   cancelButtonText: '否',
          //   type: 'warning',
          //   callback: function (action) {
          //     if (action === 'confirm') {
          //       var param = {
          //         colunmNamelist: _this.colunmNamelist,
          //         datalist: _this.data
          //       };
          //       var data = {
          //         orgCode: yufp.session.org.code
          //       };
          //       yufp.service.request({
          //         method: 'GET',
          //         url: backend.custflexService + '/api/ocrmfcifqscol/getUuid',
          //         data: data,
          //         callback: function (code, message, response) {

          //           var datas = {
          //             params: JSON.stringify(param),
          //             bizseqno: response.data.uuid
          //           };
          //           var commintData = {};
          //           commintData.applType = 'BTMDCYWLC';
          //           if (response.data.orgLevel == 1 || response.data.orgLevel == 3) {
          //             // 表示总行级用户和一级支行用户,那么下一审批人为总行综合管理员
          //             commintData.paramMap = {
          //               orgLevel: '2'
          //             };
          //           } else if (response.data.orgLevel == 4) {
          //             // 表示二级支行用户，下一审批人为一级支行综合管理员
          //             commintData.paramMap = {
          //               orgLevel: '1'
          //             };
          //           }
          //           _this.bizSeqNo = response.data.uuid;
          //           // 流程主键
          //           commintData.bizSeqNo = response.data.uuid;
          //           commintData.custId = yufp.session.userId;
          //           commintData.custName = yufp.session.userName;
          //           yufp.service.request({
          //             method: 'POST',
          //             url: backend.custflexService + '/api/ocrmAciReportApply/add',
          //             data: datas,
          //             callback: function (code, message, response) {
          //               if (code == 0) {
          //               } else {
          //                 return;
          //               }
          //             }
          //           });
          //           _this.$refs.approvalRef.wfInit(commintData);
          //         }
          //       });
          //     } else {
          // 直接导出
          var paramQuery = {
            condition: JSON.stringify({
              conditionAttrs: _this.conditionAttrs,
              results: _this.results,
              topNum: _this.limitNum
            })
          };
          yufp.service.request({
            method: 'GET',
            data: paramQuery,
            url: backend.adminService + '/api/ocrmfcifqdbcol/queryresult',
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.code == 0) {
                  var showdata = [];// 展示数据
                  for (var i = 0; i < response.data.length; i++) {
                    var aaa = {};
                    for (var k in response.data[i]) {
                      // 转换时间格式
                      if (k.indexOf('Date') != -1) {
                        response.data[i][k] = _this.utc2beijing(response.data[i][k]);
                      }
                      for (var a = 0; a < _this.conlist.length; a++) {
                        if (k.indexOf(_this.conlist[a].ename) != -1) {
                          aaa[_this.conlist[a].ename] = response.data[i][k];
                        }
                        aaa['custIdBase'] = response.data[i].custIdBase;
                        aaa['custNameBase'] = response.data[i].custNameBase;
                      }
                    }
                    showdata.push(aaa);
                  }
                  var paramExport = {
                    colunmNamelist: _this.colunmNamelist,
                    datalist: showdata
                  };
                  var bizseqno = yufp.session.userId + '%' + new Date().getTime();
                  var datas = {
                    params: JSON.stringify(paramExport),
                    bizseqno: bizseqno
                  };
                  yufp.service.request({
                    method: 'POST',
                    url: backend.custflexService + '/api/ocrmAciReportApply/add',
                    data: datas,
                    callback: function (code, message, response) {
                      if (code == 0) {
                        var params = {};
                        var parambizseqno = {
                          bizseqno: bizseqno
                        };
                        params.url = backend.appOcaService + '/api/ocrmfcifqdbcol/export';
                        params.url = yufp.service.getUrl(params);
                        params.url += '?access_token=' + yufp.service.getToken();
                        params.url += '&condition=' + encodeURI(JSON.stringify(parambizseqno));
                        yufp.util.download(params.url);
                      } else {
                        return;
                      }
                    }
                  });
                }
              }
            }
          });
          //  }
          //  }
          // });
        },
        onAfterCloseFn: function () {
          // this.bizSeqNo
          alert('流程执行成功');
        },
        // 加入客户群
        saveaddcustomers: function () {
          var me = this;
          var custIds = '';
          var custGroupIds = vm.$refs.aaa.$refs.custGroupIds[0].value;
          if (custGroupIds == '') {
            vm.$message({ message: '请选择客户群！', type: 'warning' });
            return;
          }
          var num = custGroupIds.split(',').length;
          if (num > 0 && num != 1) {
            vm.$message({ message: '请先选择一条客户群类型为手动添加或模板导入的客户群', type: 'warning' });
            return;
          }
          var istrue;
          var param = { condition: JSON.stringify({ custGroupIds: custGroupIds }) };
          yufp.service.request({
            url: backend.adminService + '/api/cimpccgbaseinfo/listcmp',
            method: 'get',
            data: param,
            async: false,
            callback: function (code, message, response) {
              if (response.data[0].custOrigin == '1' || response.data[0].custOrigin == '3') { // 判断客户来源是否为手动添加或模板导入
                istrue = true;
              } else {
                vm.$message({ message: '请先选择一条客户来源为手动添加或模板导入的客户群', type: 'warning' });
                istrue = false;
              }
            }
          });
          if (istrue == false) {
            return;
          }
          for (i = 0; i < me.$refs.qryresult.selection.length; i++) {
            if (me.$refs.qryresult.selection[i].custIdBase !== undefined) {
              custIds += me.$refs.qryresult.selection[i].custIdBase;
              if (i != me.$refs.qryresult.selection.length - 1) {
                custIds += ',';
              }
            }
          }
          if (custIds == '') {
            vm.$message({ message: '请选择客户编号！', type: 'warning' });
            return;
          }
          var joingroups = {
            condition: JSON.stringify({
              custGroupId: custGroupIds,
              custIds: custIds,
              markeProPri: ''
            })
          };
          yufp.service.request({
            url: backend.adminService + '/api/cimpccustgroupcust/joingroup',
            method: 'POST',
            data: joingroups,
            callback: function (code, message, response) {
              if (code == '0') {
                vm.$message({ message: '保存成功!', type: 'info' });
                vm.customersdialogVisible = false;
                // 保存输出
                // me.saveDisplay(custGroupIds);
              } else {
                vm.$message({ message: '保存失败!', type: 'warning' });
                vm.customersdialogVisible = false;
              }
            }
          });
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
            var info = {};
            info.ssColItem = _set.list[i].id;
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
                  ssId = response.data[0].ssId;
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
          this.resetGroupFn();
        },
        /** 分组汇总统计 */
        /**
         * 分组汇总的第一组下拉框选中值发生变化时执行
         */
        selectFirstGroup: function (key) {
          var _this = this;
          // TODO

          for (var i = 0, len = _this.firstOptions.length; i < len; i++) {
            // 找到select的option中选择的项的数据
            if (_this.firstOptions[i].id == key) {
              // 新增
              _this.optionData[0] = _this.firstOptions[i];
              break;
            }
          }
        },
        /**
        * 点击分组汇总下拉框“清除”，
        * @param index 分组的序号，从1开始
        */
        clearGroupFn: function (index) {
          this.optionData.splice(index - 1, 1);
        },
        /**
         * 分组汇总的第二组下拉框选中值发生变化时执行
         */
        selectSecondGroup: function (key) {
          var _this = this;
          for (var i = 0, len = _this.secondOptions.length; i < len; i++) {
            // 找到select的option中选择的项的数据
            if (_this.secondOptions[i].id == key) {
              // 新增
              _this.optionData[1] = _this.secondOptions[i];
              break;
            }
          }
        },
        /**
         * 分组汇总的第三组下拉框选中值发生变化时执行
         */
        selectThirdGroup: function (key) {
          var _this = this;
          for (var i = 0, len = _this.thirdOptions.length; i < len; i++) {
            // 找到select的option中选择的项的数据
            if (_this.thirdOptions[i].id == key) {
              // 新增
              _this.optionData[2] = _this.thirdOptions[i];
              break;
            }
          }
        },
        /**
         * 分组汇总的第四组下拉框选中值发生变化时执行
         */
        selectFourGroup: function (key) {
          var _this = this;
          for (var i = 0, len = _this.fourOptions.length; i < len; i++) {
            // 找到select的option中选择的项的数据
            if (_this.fourOptions[i].id == key) {
              // 新增
              _this.optionData[3] = _this.fourOptions[i];
              break;
            }
          }
        },
        /**
         * 分组汇总的第五组下拉框选中值发生变化时执行
         */
        selectFiveGroup: function (key) {
          var _this = this;
          for (var i = 0, len = _this.fiveOptions.length; i < len; i++) {
            // 找到select的option中选择的项的数据
            if (_this.fiveOptions[i].id == key) {
              // 新增
              _this.optionData[4] = _this.fiveOptions[i];
              break;
            }
          }

        },
        /**
         * 点击 “分组汇总统计” 按钮后执行
         */
        groupSummFn: function () {
          // 将所选分组和和汇总后的字段作为表格的表头展示
          var _this = this;
          // 校验查询条件列
          var refname = 'item.index';
          var refObj = this.$refs[refname];
          if (refObj instanceof Array) {
            for (var v = 0, len = refObj.length; v < len; v++) {
              var validate = false;
              refObj[v].validate(function (valid) {
                validate = valid;
              });
              if (!validate) {
                this.$message({
                  type: 'warning',
                  message: '请填写查询条件'
                });
                return;
              }
            }
          } else {
            var validate = false;
            refObj.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              this.$message({
                type: 'warning',
                message: '请填写查询条件'
              });
              return;
            }
          }
          // 分组汇总选择的字段信息
          if (_this.optionData.length == 0) {
            _this.$message({
              type: 'warning',
              message: '请至少添加一个分组字段'
            });
            return;
          }
          // 检查分组字段是否重复
          for (var i = 0, len = _this.optionData.length; i < len; i++) {
            var index = _this.optionData.indexOf(_this.optionData[i]);
            var lastindex = _this.optionData.lastIndexOf(_this.optionData[i]);
            if (index != lastindex) {
              // 说明该值在数组中有两个
              _this.$message({
                type: 'warning',
                message: '请检查分组字段是否重复'
              });
              return;
            }
          }
          // 检查汇总字段是否重复
          var tableDatalist = this.$refs.grouptable.data;
          var flagtd = tableDatalist.every(function (item) {
            return item.summColumn == '' || item.summType == '' || item.summName == '';
          });
          if (flagtd) {
            _this.$message({
              type: 'warning',
              message: '请至少添加一个汇总字段'
            });
            return;
          }
          for (var j = 0, lent = tableDatalist.length; j < lent; j++) {
            for (var k = 0, len = tableDatalist.length; k < len; k++) {
              if (k != j && tableDatalist[k].summName != '' && tableDatalist[k].summName == tableDatalist[j].summName) {
                _this.$message({
                  type: 'warning',
                  message: '请检查汇总结果是否重复'
                });
                return;
              }
            }
          }
          _this.conditionAttrs = [];
          _this.results = [];
          _this.chartTargetOptions = [];
          _this.ychartTargetOptions = [];
          _this.qryarr = [];
          // 拼接参数
          for (var i = 0; i < _this.list.length; i++) {
            _this.qryarr = [];
            var info = {};
            info.SS_COL_ITEM = _this.list[i].id;
            info.SS_COL_OP = vm.dataSqlTemp[_this.list[i].index].signOp;
            info.SS_COL_VALUE = vm.dataSqlTemp[_this.list[i].index].signVal;
            info.SS_COL_GJOIN = vm.dataSqlTemp[_this.list[i].index].radio2;
            info.SS_COL_JOIN = '';
            info.SS_COL_GORDER = i;
            info.SS_COL_ORDER = '0';
            if (info.SS_COL_GJOIN == '并') {
              info.SS_COL_GJOIN = 'and';
            } else if (info.SS_COL_GJOIN == '或') {
              info.SS_COL_GJOIN = 'or';
            }
            _this.qryarr.push(info);
            var childinfo = {};
            if (_this.list[i].children && _this.list[i].children.length > 0) {
              for (var j = 0; j < _this.list[i].children.length; j++) {
                childinfo.SS_COL_ITEM = _this.list[i].children[j].id;
                childinfo.SS_COL_OP = vm.dataSqlTemp[_this.list[i].children[j].index].signOp;
                childinfo.SS_COL_VALUE = vm.dataSqlTemp[_this.list[i].children[j].index].signVal;
                childinfo.SS_COL_GJOIN = '';
                childinfo.SS_COL_JOIN = vm.dataSqlTemp[_this.list[i].children[j].index].radio2;
                childinfo.SS_COL_GORDER = i;
                childinfo.SS_COL_ORDER = j + 1;
                if (childinfo.SS_COL_JOIN == '并') {
                  childinfo.SS_COL_JOIN = 'and';
                } else if (childinfo.SS_COL_JOIN == '或') {
                  childinfo.SS_COL_JOIN = 'or';
                }
              }
              _this.qryarr.push(childinfo);
            }
            _this.conditionAttrs.push(_this.qryarr);
          }
          for (var i = 0; i < _this.conlist.length; i++) {
            var resultinfo = {};
            resultinfo.columnId = _this.conlist[i].id;
            resultinfo.sortType = vm.dataTemp[_this.conlist[i].indexs].orderType;
            resultinfo.columnTotle = '0';
            _this.results.push(resultinfo);
          }
          // 请求参数
          var model = {};
          var groupParamsAry = [];
          var sumColumnsAry = [];
          var sumTypesAry = [];
          var sumNamesAry = [];
          _this.resultTableColumns = [];
          model.conditionAttrs = _this.conditionAttrs;
          model.results = _this.results;
          model.isexport = '1';
          _this.optionData.forEach(function (item) {
            groupParamsAry.push(item.id);
            // 生成表格表头信息
            var obj = {};
            obj.label = item.name;
            obj.prop = item.ename;
            _this.resultTableColumns.push(obj);
          });
          tableDatalist.forEach(function (item) {
            sumColumnsAry.push(item.summColumn);
            sumTypesAry.push(item.summType);
            sumNamesAry.push(item.summName);
          });

          model.groupParams = groupParamsAry.join(',');
          var aryTmp = [];
          aryTmp.push({
            sumColumns: sumColumnsAry.join(','),
            sumTypes: sumTypesAry.join(','),
            sumNames: sumNamesAry.join(',')
          });
          model.sumParams = aryTmp;
          // _this.$nextTick(function () {
          //   var params = { condition: JSON.stringify(model) };
          //   _this.$refs.qrygroup.remoteData(params);
          // });
          // 分组汇总查询
          yufp.service.request({
            method: 'GET',
            url: '/api/ocrmfcifqdbcol/queryresult',
            data: {
              condition:
                JSON.stringify(model)
            },
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                var columnName = {};
                // 处理得到分组的列
                for (var i = 0, len = _this.optionData.length; i < len; i++) {
                  for (var j = 0, lenR = _this.results.length; j < lenR; j++) {
                    if (_this.optionData[i].id == _this.results[j].columnId) {
                      columnName[_this.optionData[i].ename] = _this.optionData[i].ename + '_' + _this.results[j].columnTotle;
                      break;
                    }
                  }
                }
                // 处理得到汇总后的列
                for (var i = 0, len = sumColumnsAry.length; i < len; i++) {
                  if (sumColumnsAry[i]) {
                    // _this.columnOptions-> 列信息，即分组汇总字段可选的下拉选项
                    for (var k = 0, lenop = _this.columnOptions.length; k < lenop; k++) {
                      // 因sumColumnsAry中只存了id值，所以与所有列信息匹配，得到汇总表中的汇总字段中文信息
                      if (sumColumnsAry[i] == _this.columnOptions[k].id) {
                        for (var j = 0, lenR = _this.results.length; j < lenR; j++) {
                          if (_this.columnOptions[k].id == _this.results[j].columnId) {
                            var cln = _this.columnOptions[k].ename + 'Sum' + sumTypesAry[i];
                            var obj = {};
                            columnName[cln] = _this.columnOptions[k].ename + '_' + _this.results[j].columnTotle + 'Sum' + sumTypesAry[i];
                            obj.label = sumNamesAry[i];
                            obj.prop = cln;
                            _this.resultTableColumns.push(obj);
                            // 给图表预览赋值
                            _this.chartTargetOptions.push({ key: columnName[cln], value: sumNamesAry[i] });
                            _this.ychartTargetOptions.push({ key: columnName[cln], value: sumNamesAry[i] });
                            break;
                          }
                        }
                        break;
                      }
                    }
                  }
                }
                if (response.data && response.data.length > 0) {
                  var data = response.data;
                  var queryGroupData = [];
                  // 遍历分组汇总统计表格列信息
                  graphSql = data[0].sql;
                  for (var k = 0, lend = data.length; k < lend; k++) {
                    var objquery = {};
                    for (var j = 0, len = _this.resultTableColumns.length; j < len; j++) {
                      var propn = _this.resultTableColumns[j].prop;
                      if (propn) {
                        objquery[propn] = data[k][columnName[propn]];
                      }
                    }
                    queryGroupData.push(objquery);
                  }
                }
                _this.dialogFormVisible2 = true;
                // 获得el-table-x中的表格数据
                _this.$nextTick(function () {
                  _this.$refs.qrygroup.$refs.table.data = queryGroupData;
                  // _this.$refs.chartTemp.resetFields();// 重置form
                  // _this.$refs.chartTagTemp.resetFields();// 重置form
                  // _this.$refs.ychartNameTemp.resetFields();// 重置form
                  _this.showPrise = false;
                  _this.showRentPrise = false;
                });
              } else {
                _this.$message.error('查询失败');
              }
            }
          });
        },
        /** 分组汇总重置 */
        resetGroupFn: function () {
          this.groupform.firstgroup = '';
          this.groupform.secondgroup = '';
          this.groupform.thirdgroup = '';
          this.groupform.fourgroup = '';
          this.groupform.fivegroup = '';
          var tableDatalist = this.$refs.grouptable.data;
          if (tableDatalist.length > 0) {
            for (var i = 0; i < tableDatalist.length; i++) {
              tableDatalist[i].summName = '';
              tableDatalist[i].summColumn = '';
              tableDatalist[i].summType = '';
            }
          }
        },
        signchange: function () {

        },
        incustFn: function () {
          // this.incustomersdialogVisible=true;
          if (this.$refs.qryresult.selection.length < 1) {
            vm.$message({ message: '请至少选择一个客户!' });
            return false;
          }
          this.customersdialogVisible = true;
          this.$nextTick(function () {
            vm.$refs.aaa.fm.custGroupIds = '';
          });
        },
        /** 查询结果中的加入客户群 */
        //     handleIconClick: function(){
        //			this.customersqrydialogVisible=true;
        //     },
        closeincustomers: function () {
          this.incustomersdialogVisible = false;
        },
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
          // 清除汇总表格中已选字段
          var tableDatalist = this.$refs.grouptable.data;
          for (var i = 0; i < tableDatalist.length; i++) {
            if (tableDatalist[i].summColumn == rows[index].id) {
              tableDatalist[i].summName = '';
              tableDatalist[i].summColumn = '';
              tableDatalist[i].summType = '';
              break;
            }
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
        delTableRow: function (index) {
          this.conlist.splice(index, 1);
          this.colunmNamelist.splice(index + 2, 1);

        },
        saveincustomers: function () {
          this.$message({ message: '保存成功！' });
          this.incustomersdialogVisible = false;
        },
        // 设置为我的关注客户
        setatten: function () {
          var _this = this;
          if (this.$refs.qryresult.selection.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var attenparam = {
            condition: JSON.stringify({
              custIds: this.$refs.qryresult.selection[0].custIdBase,
              attentType: '1', // 关注类型为普通关注
              userId: yufp.session.userId
            })
          };
          yufp.service.request({
            method: 'POST',
            url: '/api/ocrmfciattencust/join',
            data: attenparam,
            callback: function (code, message, response) {
              if (code == 0 && response.code === 0) {
                _this.$message('操作成功');
              } else {
                _this.$message({ message: '操作失败', type: 'warning' });
              }
            }
          });
        },
        // 给个人设置标签
        //  setCustTags: function () {
        //         if (this.$refs.qryresult.selection.length != 1) {
        //      this.$message({ message: '请先选择一条记录', type: 'warning' });
        //      return false;
        //    }

        //         // 每次加载前清空数据
        //         this.setselectList = [];
        //         this.settinglist = [];
        //         this.setlist = [];
        //         this.custtagList = [];
        //         vm.tagTemp.definedTag = '';
        //         var me = this;
        //         var custgroupNo = '';
        //         me.dialogTagForm = true;
        //         me.buttonsDisabled = false;
        //         // 选中客户名称值带入
        //         this.$nextTick(function () {
        //      vm.tagTemp.custName = this.$refs.qryresult.selection[0].tagName;
        //           // 查询该客户下已经选择的标签数据展示
        //      yufp.service.request({
        //             method: 'GET',
        //             data: {
        //          custId: this.$refs.qryresult.selection[0].custIdBase
        //        },
        //             url: backend.adminService + '/api/cimftagcusttags/qryTags',
        //             callback: function (code, message, response) {
        //          if (code == 0) {
        //                 var Dedupliflag;
        //                 var resultArr = [];// 去重后的数组
        //                 var custtagsArr = [];

        //                 var tags = [];
        //                 var tagList = {};
        //                 var tags2 = {};
        //                 var flag = false;
        //                 var flag1 = true;
        //                 for (var i = 0; i < response.data.length; i++) {
        //                   // 展示已有标签
        //              custtagsArr.push(response.data[i]);
        //              var setselectListinfo = {};
        //              setselectListinfo.state = false;
        //                   //				          		setselectListinfo.prototypeindex=0;
        //                   //				          		setselectListinfo.index=i;
        //              setselectListinfo.id = response.data[i].tagNo;
        //              setselectListinfo.name = response.data[i].tagName;
        //              setselectListinfo.processMode = response.data[i].processMode;
        //              setselectListinfo.groupNo = response.data[i].groupNo;
        //              setselectListinfo.tagLifecycle = response.data[i].tagLifecycle;
        //              me.setselectList.push(setselectListinfo);
        //              me.setlist.push(response.data[i].tagNo);
        //                   // 过滤重复的groupNo
        //              Dedupliflag = true;
        //              var groupinfo = {};
        //              groupinfo.name = response.data[i].tagNo;
        //              tags = [{name: groupinfo.name}];
        //              tags2 = {name: groupinfo.name};
        //              if (me.custtagList.length > 0) {
        //                     for (var j = 0; j < me.custtagList.length; j++) {
        //                  var tagList1 = {};
        //                  if (response.data[i].groupNo == me.custtagList[j].name) {
        //                         me.custtagList[j].children.push(tags2);
        //                         flag = true;
        //                         flag1 = true;
        //                       } else {
        //                         tagList1.name = response.data[i].groupNo;
        //                         tagList1.children = tags;
        //                         flag = true;
        //                         flag1 = false;
        //                       }
        //                }
        //                   } else {
        //                     tagList.name = response.data[i].groupNo;
        //                     tagList.children = tags;
        //                   }
        //              tags1 += response.data[i].tagNo;
        //              if (i != response.data.length - 1) {
        //                     tags1 += ','
        //                     ;
        //                   }
        //              if (!flag) {
        //                     me.custtagList.push(tagList);
        //                   }
        //              if (!flag1) {
        //                     me.custtagList.push(tagList1);
        //                   }
        //                   // 将标签拼接成格式end
        //            }
        //                 for (var m = 0; m < me.custtagList.length; m++) {
        //                   // 展示标签分组 根据groupNo查询该分组下的所有标签
        //              var param = { condition: JSON.stringify({groupNo: me.custtagList[m].name}) };
        //              yufp.service.request({
        //                     method: 'GET',
        //                     data: param,
        //                     async: false,
        //                     url: backend.adminService + '/api/cimfmmtagtagsinfo/getTagByGroupNo',
        //                     callback: function (code, message, response) {
        //                  if (code === 0) {
        //                         if (response.data.length > 0) {
        //                      var setdataList = {};
        //                      setdataList.name = response.data[0].groupName;
        //                      setdataList.id = response.data[0].groupNo;
        //                      var setinstu = response.data;
        //                      var tags = [];
        //                      for (var k = 0; k < setinstu.length; k++) {
        //                             var ksetinfo = {};
        //                             ksetinfo.name = setinstu[k].tagName;
        //                             ksetinfo.id = setinstu[k].tagNo;
        //                             ksetinfo.state = true;
        //                             ksetinfo.prototypeindex = m;
        //                             ksetinfo.index = k;
        //                             ksetinfo.processMode = setinstu[k].processMode;
        //                             ksetinfo.groupNo = setinstu[k].groupNo;
        //                             ksetinfo.tagLifecycle = setinstu[k].tagLifecycle;
        //                             for (var j in me.setselectList) {
        //                          if (ksetinfo.name == me.setselectList[j].name) {
        //                                 ksetinfo.state = false;
        //                                 me.setselectList[j].index = ksetinfo.index;
        //                                 me.setselectList[j].prototypeindex = ksetinfo.prototypeindex;
        //                                 break;
        //                               }
        //                        }
        //                             tags.push(ksetinfo);
        //                           }
        //                      setdataList.stu = tags;
        //                      if (tags.length > 0) { // 当有分组有标签的时候才添加到右侧
        //                             me.settinglist.push(setdataList);
        //                           }
        //                    }
        //                       }
        //                }
        //                   });
        //            }
        //               }
        //        }
        //           });
        //    });
        //       },
        /** 标签树单击事件 */
        //       nodeClickFn: function (nodeData, node, self) {
        //         // if(node.isLeaf){
        //    this.addTabInfoFn(nodeData);
        //         // }
        //  },
        //  nodeClickFnofset: function (nodeData, node, self) {
        //         //        if(node.isLeaf){
        //         this.addTabInfoFnofset(nodeData);
        //         //        }
        //       },
        // 设置标签取消按钮
        detailResetRule: function () {
          this.dialogTagForm = false;
          this.setselectList = [];
          this.settinglist = [];
          this.setlist = [];
          this.custtagList = [];
          vm.tagTemp.definedTag = '';
        },
        // 关闭按钮
        dialogClose: function () {
          this.setselectList = [];
          this.settinglist = [];
          this.setlist = [];
          this.custtagList = [];
          vm.tagTemp.definedTag = '';
        },
        // 设置标签提交
        //  settingSubFn: function () {
        //         var me = this;
        //         var definedTag = vm.tagTemp.definedTag;// 自定义标签
        //         console.log('me.setlist==' + JSON.stringify(me.setlist));
        //         var tagsmodel = new Object();
        //         tagsmodel.custId = me.$refs.qryresult.selection[0].custIdBase;// 客户编号
        //         var tagNos = me.setlist.join(',').toString();
        //         tagsmodel.tagNo = tagNos;
        //         console.log('tagNos==' + tagsmodel.tagNo);
        //         // 标签库更新标签
        //         yufp.service.request({
        //      method: 'POST',
        //      data: tagsmodel,
        //      url: backend.adminService + '/api/cimftagcusttags/updateTags',
        //      callback: function (code, message, response) {
        //             if (code == 0) {
        //          if (definedTag != '') {
        //                 me.adddefinedTag(definedTag);
        //               } else {
        //                 if (response.code == 0) {
        //              vm.$message({ message: '设置标签成功', type: 'info' });
        //              vm.dialogTagForm = false;
        //            } else {
        //              vm.$message({ message: response.message, type: 'warning' });
        //              vm.dialogTagForm = false;
        //            }
        //               }
        //        } else {
        //          vm.$message({ message: '操作失败', type: 'warning' });
        //          vm.dialogTagForm = false;
        //        }
        //           }
        //    });
        //       },
        /** 设置标签中添加查询标签 */
        addTabInfoFnofset: function (node) {
          var _set = this;
          if (node) {
            var dataList = {};
            dataList.name = node.groupName;
            dataList.id = node.groupNo;
            var flag = false;// 判断是否已经添加
            for (var i = 0; i < _set.settinglist.length; i++) {
              if (_set.settinglist[i].id == node.groupNo) {
                flag = true;
                break;
              }
            }
            if (!flag) {
              var param = { condition: JSON.stringify({ groupNo: node.groupNo }) };
              // 获取分组下的标签
              yufp.service.request({
                method: 'GET',
                data: param,
                url: backend.adminService + '/api/cimfmmtagtagsinfo/getTagByGroupNo',
                callback: function (code, message, response) {
                  if (code === 0) {
                    var instu = response.data;
                    var tags = [];
                    for (var i = 0; i < instu.length; i++) {
                      var info = {};
                      info.name = instu[i].tagName;
                      info.id = instu[i].tagNo;
                      info.processMode = instu[i].processMode;
                      info.tagLifecycle = instu[i].tagLifecycle;
                      info.groupNo = instu[i].groupNo;
                      info.state = true;
                      tags.push(info);
                    }
                    dataList.stu = tags;
                    if (tags.length > 0) { // 当有分组有标签的时候才添加到右侧
                      _set.settinglist.push(dataList);
                    }
                  }
                }
              });

            }
          }
        },
        // 设置标签 点击标签增加到您已经选择区域
        addsetTabQuryFn: function (info, infoindex, index) {
          var me = this;
          // 判断如果加工方式是统计或者挖掘 那么属于自动标签 就不允许操作添加
          if (info.processMode == 'MINING' || info.processMode == 'STATISTICS') {
            me.$message({ message: '不允许操作统计或者挖掘方式的标签！', type: 'warning' });
            return false;
          }
          // 判断非执行中状态的标签不允许操作添加
          if (info.tagLifecycle != 'RUNNING') {
            me.$message({ message: '不允许操作非执行中状态的标签！', type: 'warning' });
            return false;
          }
          if (info.groupNo != '1705') {
            // 判断是否为总行 总行不限制权限问题
            var orgparam = {
              condition: JSON.stringify({
                id: yufp.session.org.id
              })
            };
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cimfmmtagtagsinfo/getorglevel',
              data: orgparam,
              callback: function (code, message, response) {
                if (code == 0) {
                  var json = response.data;
                  me.orgLevel = json.orgLevel;
                  if (me.orgLevel > '2') { // 不是总行
                    // 判断非自定义标签权限问题
                    var model = new Object();
                    model.instu = vm.instuCode;
                    model.org = vm.orgId;
                    model.user = vm.userId;
                    model.roles = new Array();
                    for (var i = 0; i < vm.roles.length; i++) {
                      model.roles[i] = vm.roles[i].code;
                    };
                    model.tagNo = info.id;
                    var param = {
                      condition: JSON.stringify(model)
                    };
                    yufp.service.request({
                      method: 'GET',
                      data: param,
                      url: backend.adminService + '/api/cimftagcusttags/getAuthData',
                      callback: function (code, message, response) {
                        if (code === 0) {
                          if (response.data.length == 0) {
                            me.$message({ message: '没有权限不允许操作！', type: 'warning' });
                            return false;
                          } else {
                            var flag = false;// 条件中是否已经存在
                            // 添加到已选择标签
                            for (var j = 0; j < me.setselectList.length; j++) {
                              if (me.setselectList[j].id == info.id) {
                                info.state = true;
                                me.setselectList.splice(j, 1);
                                me.setlist.splice(j, 1);
                                flag = true;
                                break;
                              }
                            }
                            if (!flag) {
                              info.state = false;
                              info.prototypeindex = index;
                              info.index = infoindex;
                              me.setselectList.push(info);
                              // 拼接标签tagno给此客户新增标签
                              me.setlist.push(info.id);

                            }
                          }
                        }
                      }
                    });
                    // 判断权限问题
                  } else {
                    var flag = false;// 条件中是否已经存在
                    // 添加到已选择标签
                    for (var j = 0; j < me.setselectList.length; j++) {
                      if (me.setselectList[j].id == info.id) {
                        info.state = true;
                        me.setselectList.splice(j, 1);
                        me.setlist.splice(j, 1);
                        flag = true;
                        break;
                      }
                    }
                    if (!flag) {
                      info.state = false;
                      info.prototypeindex = index;
                      info.index = infoindex;
                      me.setselectList.push(info);
                      // 拼接标签tagno给此客户新增标签
                      me.setlist.push(info.id);

                    }
                  }
                }
              }
            });
          } else {
            var flag = false;// 条件中是否已经存在
            // 添加到已选择标签
            for (var j = 0; j < me.setselectList.length; j++) {
              if (me.setselectList[j].id == info.id) {
                info.state = true;
                me.setselectList.splice(j, 1);
                me.setlist.splice(j, 1);
                flag = true;
                break;
              }
            }
            if (!flag) {
              info.state = false;
              info.prototypeindex = index;
              info.index = infoindex;
              me.setselectList.push(info);
              // 拼接标签tagno给此客户新增标签
              me.setlist.push(info.id);

            }
          }
        },
        /** 设置标签删除选中的标签 */
        deleteSeTagFnofset: function (tag) {
          var me = this;
          // 判断如果加工方式是统计或者挖掘 那么属于自动标签 就不允许操作添加
          if (tag.processMode == 'MINING' || tag.processMode == 'STATISTICS') {
            me.$message({ message: '不允许操作统计或者挖掘方式的标签！', type: 'warning' });
            return false;
          }
          if (tag.groupNo != '1705') {
            // 判断是否为总行
            var orgparam = {
              condition: JSON.stringify({
                id: yufp.session.org.id
              })
            };
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cimfmmtagtagsinfo/getorglevel',
              data: orgparam,
              callback: function (code, message, response) {
                if (code == 0) {
                  var json = response.data;

                  me.orgLevel = json.orgLevel;
                  if (me.orgLevel > '2') { // 不是总行
                    // 判断非自定义标签权限问题
                    var model = new Object();
                    model.instu = vm.instuCode;
                    model.org = vm.orgId;
                    model.user = vm.userId;
                    model.roles = new Array();
                    for (var i = 0; i < vm.roles.length; i++) {
                      model.roles[i] = vm.roles[i].code;
                    };
                    model.tagNo = tag.id;
                    var param = {
                      condition: JSON.stringify(model)
                    };
                    yufp.service.request({
                      method: 'GET',
                      data: param,
                      url: backend.adminService + '/api/cimftagcusttags/getAuthData',
                      callback: function (code, message, response) {
                        if (code === 0) {
                          if (response.data.length == 0) {
                            me.$message({ message: '没有权限不允许操作！', type: 'warning' });
                            return false;
                          } else {

                            var f = 0;
                            for (var i = 0; i < me.setselectList.length; i++) {
                              if (me.setselectList[i].id == tag.id) {
                                f = i;
                                break;
                              }
                            }
                            for (var i = 0; i < me.setlist.length; i++) {
                              if (me.setlist[i].id == tag.id) {
                                f = i;
                                break;
                              }
                            }
                            me.setlist.splice(f, 1);
                            me.setselectList.splice(f, 1);


                            me.settinglist[tag.prototypeindex].stu[tag.index].state = true;
                          }
                        }
                      }
                    });
                  } else { // 是总行
                    var f = 0;
                    for (var i = 0; i < me.setselectList.length; i++) {
                      if (me.setselectList[i].id == tag.id) {
                        f = i;
                        break;
                      }
                    }
                    for (var i = 0; i < me.setlist.length; i++) {
                      if (me.setlist[i].id == tag.id) {
                        f = i;
                        break;
                      }
                    }
                    me.setlist.splice(f, 1);
                    me.setselectList.splice(f, 1);
                    me.settinglist[tag.prototypeindex].stu[tag.index].state = true;
                  }
                }
              }
            });
          } else {
            var f = 0;
            for (var i = 0; i < me.setselectList.length; i++) {
              if (me.setselectList[i].id == tag.id) {
                f = i;
                break;
              }
            }
            for (var i = 0; i < me.setlist.length; i++) {
              if (me.setlist[i].id == tag.id) {
                f = i;
                break;
              }
            }
            me.setlist.splice(f, 1);
            me.setselectList.splice(f, 1);
            me.settinglist[tag.prototypeindex].stu[tag.index].state = true;
          }
        }
      }
    });
  };
});
