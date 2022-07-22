/**
 * @created by zhangxs4 on 2018/07/09.
 * @description 客户灵活查询
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  'custom/widgets/js/yufpCustGroup.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/yufpRoleSelector.js',
  './custom/widgets/js/YufpUserSelector.js',
  './libs/echarts/echarts.min.js',
  './libs/jquery/jquery.min.js',
  './libs/echarts/echarts-3.8.5.min.js', './libs/echarts/echarts-3.8.5.patch.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE,CUST_LEVEL');
    var selectOptions = [
      { key: '1', value: '年' }, { key: '2', value: '季' },
      { key: '3', value: '月' }, { key: '4', value: '天' }
    ];
    var custselectOptions = [];
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
    var numDataOptions = [];
    var countSumOptions = [];
    var textOptions = [];
    var radioComboOptions = [];
    // var columnvalue;
    var querysql = '';
    yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE');
    var vm = yufp.custom.vue({
      el: cite.el,
      ncmpobj: data.ncmpobj,
      data: function () {
        var _self = this;
        return {
          data1: [],
          tableColumns1: [],
          groupParams: { clientOrigin: '2' },
          activeNames: ['1', '2', '3'],
          queryFields: [
            { placeholder: '客户群编号', field: 'clientsNO', type: 'input' },
            { placeholder: '客户群名称', field: 'clientsName', type: 'input' },
            { placeholder: '群成员类型', field: 'clientsType', type: 'input' }
          ],
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
          clientsView1: [
            { prop: 'custId', label: '客户号', type: 'input' },
            { prop: 'custName', label: '客户名称', type: 'input' },
            { prop: 'certType', label: '证件类型', type: 'input', dataCode: 'IDENT_TYPE' },
            { prop: 'certNo', label: '证件号码', type: 'input' },
            { prop: 'custType', label: '客户类型', type: 'input', dataCode: 'CUST_TYPE' }
          ],
          custGroupParams: [
            { label: '客户状态', field: 'custStatus', type: 'select', dataCode: 'CD0019' },
            { label: '客户号', field: 'custId', type: 'input' },
            { label: '客户名称', field: 'custName', type: 'input' },
            { label: '证件类型', field: 'certType', type: 'select', dataCode: 'CD0011' },
            { label: '证件类型', field: 'certType', type: 'select', hidden: true, dataCode: 'CD0348' },
            { label: '证件类型', field: 'certType', type: 'select', hidden: true, dataCode: 'CD0349' },
            { label: '证件号码', field: 'certNo', type: 'input' },
            { label: '', field: 'oneOrg', type: 'input', value: '', hidden: true }
          ],
          queryFieldss: [
            {
              placeholder: '客户群名称',
              field: 'custGroupIds',
              type: 'custom',
              is: 'yufp-custGroup',
              clickFn: function () {
                _self.$nextTick(function () {
                  var qrycondition = _self.$refs.aaa.$refs.custGroupIds[0].$refs.queryCondition;
                  var fd = qrycondition.fieldData[1].field;
                  var jon = {};
                  yufp.clone(jon, qrycondition.fm);
                  qrycondition.switch(fd, 'disabled', true);
                  var param = { condition: JSON.stringify(qrycondition.fm) };
                  _self.$refs.aaa.$refs.custGroupIds[0].queryFn(param);
                });
              }
            }
          ],
          queryButtonss: [],
          joinUrl: '/trade/cust/custNoJoin?clientsNO=0',
          options: [{
            value: '1',
            label: '客户高级查询'
          }],
          custTemp: {
            custgroup: '',
            custgroupno: ''
          },
          itemTemp: {
            value: '',
            addcust: ''
          },
          groupAttrs: [],
          objOptions: [{ key: '646', value: '高级客户查询' }],
          selectOptions: selectOptions,
          custselectOptions: custselectOptions,
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
          value: '1', // 下拉框默认值
          orderOptions: [{ key: '1', value: '不排序' }, { key: '2', value: '正序' }, { key: '3', value: '逆序' }],
          typeOptions: [{ key: '1', value: '汇总数值' }, { key: '2', value: '汇总数量' }, { key: '3', value: '最大值' }, { key: '4', value: '最小值' },
          { key: '5', value: '总值' }, { key: '6', value: '平均值' }],
          chartTypeOptions: [{ key: '1', value: '饼图' }, { key: '2', value: '趋势图' }, { key: '3', value: '柱状图' }],
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
          reportTemp: {
            reportName: ''
          },
          caseTemp: {
            caseName: ''
          },
          groupTemp: {
          },
          itemssTemp: {
            ssName: ''
          },
          rules: {
            ssName: [{ required: true, message: '必填项', trigger: 'blur' }]
          },
          customersTemp: {
            customersName: '',
            customersType: '',
            customersColumn: '',
            membersType: '',
            shareRange: '',
            batchType: '',
            discribe: ''
          },
          groupparam: { condition: JSON.stringify({ queryTytpe: '464' }) },
          list: [],
          data: [],
          signOptions: [],
          objValue: { key: '646', value: '高级客户查询' },
          conditionAttrs: [],
          results: [],
          resultss: [],
          resultsss: [],
          inputAttrs: [],
          solution: [],
          treedata: [],
          grouplist: [],
          groupnamelist: [],
          conlist: [],
          solutionlist: [],
          colunmNamelist: [],
          fieldDatas: [],
          qrylist: [],
          activeName: 'first', // tab默认显示值
          limitNum: '', // 查询条数
          height: yufp.frame.size().height,
          groupHeight: yufp.frame.size().height - 360,
          dialogVisible: false,
          dialogFormVisible1: false,
          dialogFormVisible2: false,
          formDisabled: false,
          showPrise: false,
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
          //        solutionformVisible:false,
          viewType: 'DETAIL',
          async: false,
          // saveSolutionbutton:false,
          createFilterbutton: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          radioshow: true,
          dragnode: '',
          radio2: '',
          fieldDatas: [
            {
              grouplist:
                [
                  {
                    key: '00015',
                    value: '00015'
                  },
                  {
                    key: '12223',
                    value: '52131319870213432'
                  }
                ],
              groupnamelist:
                [
                  {
                    key: '00025',
                    value: '00015'
                  },
                  {
                    key: '12223',
                    value: '2'
                  }
                ]
            },
            {
              grouplist:
                [
                  {
                    key: '002154',
                    value: '00215'
                  },
                  {
                    key: '12223',
                    value: '52131319870210987'
                  }
                ],
              groupnamelist:
                [
                  {
                    key: '000156',
                    value: '00015'
                  },
                  {
                    key: '12223',
                    value: '3'
                  }
                ]
            }
          ],
          tableData: [{
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
        this.groupparam = { condition: JSON.stringify({ queryTytpe: '464' }) };
        if (me.$options.ncmpobj.instanceObj == undefined) {
          // me.saveSolutionbutton = true;
          me.createFilterbutton = true;
        } else {
          // me.saveSolutionbutton = false;
          me.createFilterbutton = false;
          // 查询该节点下的方案
          var nodeId = me.$options.ncmpobj.instanceObj.nodeId;
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/ocrmfcifqssolution/getssresult',
            data: {
              id: nodeId
            },
            callback: function (code, message, response) {
              if (response.data.length != 0) {
                var ssResult = response.data[0].ssResult.split(',');// 取出显示列3354,3346
                var ssSort = response.data[0].ssSort.split(',');// 取出排序1,1
                // 查询回显条件
                yufp.service.request({
                  method: 'GET',
                  url: backend.adminService + '/api/ocrmfcifqscol/getscol',
                  async: false,
                  data: {
                    ssId: nodeId
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
                          }
                        }
                        // 根据后台id遍历树对应名称
                        var item = {};
                        item.ctype = 'input';
                        item.unit = '';
                        item.options = [];
                        collist.items = item;
                        collist.signOp = response.data[i].ssColOp;
                        collist.signVal = response.data[i].ssColValue;
                        collist.radio2 = response.data[i].ssColGjoin;
                        collist.and = '并';
                        collist.or = '或';
                        if (collist.radio2 == 'and') {
                          collist.radio2 = '并';
                        } else if (collist.radio2 == 'or') {
                          collist.radio2 = '或';
                        } else {
                          collist.radio2 = '';
                        }
                        // console.log('list4==' + JSON.stringify(vm.list));
                        collist.index = i;
                        vm.$set(vm.dataSqlTemp, collist.index, {
                          radio2: collist.radio2,
                          proPer: collist.name,
                          signOp: collist.signOp,
                          signVal: collist.signVal
                        });
                        vm.list.push(collist);
                      }
                      // console.log('回显==' + JSON.stringify(vm.list));
                    }
                  }
                });
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
                  // console.log('conlist4==' + JSON.stringify(vm.conlist));
                  sslist.indexs = i;
                  vm.$set(vm.dataTemp, sslist.indexs, {
                    proPer: sslist.name,
                    orderType: sslist.orderType
                  });
                  vm.conlist.push(sslist);
                  vm.colunmNamelist.push(sslist);
                  vm.solutionlist.push(sslist);
                }
                // console.log('回显==' + JSON.stringify(vm.conlist));
                // 回显示客户群编号
                vm.showcustgroup();
              }
            }
          });
        }
        yufp.lookup.bind('CONDITION_FUNC', function (data) {
          me.signOptions = data;
        });
        var me = this;
        yufp.lookup.bind('CLIENT_TYPE', function (data) {
          me.custselectOptions = data;
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
        // yufp.service.request({
        //   method: 'GET',
        //   async: false,
        //   url: backend.adminService + '/api/ocrmfcifqobj/getobj',
        //   callback: function (code, message, response) {
        //     var resdata = response.data;
        //     for (var i = 0; i < response.data.length; i++) {
        //       if (i === 0) {
        //         me.objValue.key = resdata[i].id;
        //         me.objValue.value = resdata[i].objName;
        //       }
        //       var op = {};
        //       op.key = resdata[i].id;
        //       op.value = resdata[i].objName;
        //       me.objOptions.push(op);
        //     }
        //   }
        // });
      },
      methods: {

        pageChage: function (val) {

        },
        // 变换对象选项加载分组
        // objchange: function (objvalue) {
        //   this.flag = false;
        //   this.groupval = '';
        //   // 存储当前选择的值
        //   this.objType = objvalue.key;
        //   if (typeof objvalue.key === 'number') {
        //     this.groupparam = {condition: JSON.stringify({ queryTytpe: objvalue.key.toString() })};
        //     this.$refs.flexytree.remoteData();
        //   }
        // },
        // 反显
        showcustgroup: function () {
          var nodeId = this.$options.ncmpobj.instanceObj.nodeId;
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/cimpcmnodesdisplay/gettagno',
            data: {
              nodeId: nodeId
            },
            callback: function (code, message, response) {
              if (response.data.length != 0) {
                var custgroup = response.data[0].condition;
                var sourceType = response.data[0].sourceType;
                vm.$refs.aaa.fm.custGroupIds = custgroup;
                vm.itemTemp.value = sourceType;
              }
            }
          });
        },
        valueChange: function (value) {
          vm.custTemp.custgroup = value;
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
        getdata: function (value) {
          this.treedata = value;
        },

        addTabInfoFn: function (node) {
          var _this = this;

          if (node) {
            var dataList = {};
            dataList.dataCode = node.notes;
            if (dataList.dataCode) {
              yufp.lookup.reg(dataList.dataCode);
            }
            dataList.index = _this.list.length;
            dataList.indexs = _this.conlist.length;
            dataList.name = node.name;
            dataList.id = node.nodeid;
            dataList.fieldname = node.ename;
            dataList.tabname = node.value;
            // 将字段转为驼峰形式
            var foo = node.ename;
            var ename = foo.toLowerCase().split('_');
            for (var i = 1; i < ename.length; i++) {
              ename[i] = ename[i].charAt(0).toUpperCase() + ename[i].substring(1);
            }

            dataList.ename = ename.join('');
            dataList.children = [];
            if (_this.list.length == 0) {
              dataList.and = '';
              dataList.or = '';
              _this.radio2 = '0';
            } else {
              dataList.and = '并';
              dataList.or = '或';
              _this.radio2 = '2';
            }
            // 查询拖拽的字段类型
            var param = {
              condition: JSON.stringify({
                id: dataList.id
              })
            };
            _this.conditionField = [];
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/ocrmfcifqdbcol/showcoltype',
              data: param,
              callback: function (code, message, response) {
                var data = response.data;
                // console.log('000===' + JSON.stringify(data));
                _this.getConditionField(_this.conditionField, data[0]);
                dataList.section = _this.conditionField[0].section;
                dataList.items = _this.conditionField[0].item;
                // 查询拖拽的字段类型
                //          var flag=false;//是否已经添加
                //          for (var i = 0; i < _this.list.length; i++) {
                //            if(_this.list[i].id==dataList.id){
                //                flag=true;
                //                break;
                //            }
                //          }
                //          if(!flag){
                _this.list.push(dataList);
                _this.$set(_this.dataSqlTemp, dataList.index, {
                  radio2: '',
                  proPer: dataList.name,
                  signOp: '',
                  signVal: ''
                });
                _this.$set(_this.dataTemp, dataList.indexs, {
                  proPer: dataList.name,
                  orderType: ''
                });
                // 默认给排序字段赋值 不排序
                vm.dataTemp[dataList.indexs].orderType = '1';
                vm.dataSqlTemp[dataList.index].signVal = response.data[0].fName;
                // 判断当拖拽的查询条件中在列里有的情况下不push
                var flag1 = false;// 是否已经添加
                for (var i = 0; i < _this.conlist.length; i++) {
                  if (_this.conlist[i].id == dataList.id) {
                    flag1 = true;
                    break;
                  }
                }
                if (!flag1) {
                  _this.conlist.push(dataList);
                  _this.solutionlist.push(dataList);
                  _this.colunmNamelist.push(dataList);
                }
              }
            });
          }
          // console.log('addTabInfoFn==' + JSON.stringify(_this.colunmNamelist));
        },
        addTabInfoFns: function (node) {
          var _this = this;
          if (node) {
            var dataList = {};
            dataList.dataCode = node.ename;
            if (dataList.dataCode) {
              yufp.lookup.reg(dataList.dataCode);
            }
            dataList.index = _this.list.length;
            dataList.indexs = _this.conlist.length;
            dataList.name = node.name;
            dataList.id = node.nodeid;
            dataList.fieldname = node.ename;
            dataList.tabname = node.value;
            // 将字段转为驼峰形式
            var foo = node.ename;
            var ename = foo.toLowerCase().split('_');
            for (var i = 1; i < ename.length; i++) {
              ename[i] = ename[i].charAt(0).toUpperCase() + ename[i].substring(1);
            }

            dataList.ename = ename.join('');
            dataList.children = [];
            if (_this.conlist.length == 0) {
              dataList.and = '';
              dataList.or = '';
              _this.radio2 = '0';
            } else {
              dataList.and = '并';
              dataList.or = '或';
              _this.radio2 = '2';
            }


            var flag = false;// 是否已经添加
            for (var i = 0; i < _this.conlist.length; i++) {
              if (_this.conlist[i].id == dataList.id) {
                flag = true;
                break;
              }
            }
            if (!flag) {
              _this.conlist.push(dataList);
              _this.solutionlist.push(dataList);
              _this.$set(_this.dataSqlTemp, dataList.index, {
                radio2: '',
                proPer: dataList.name,
                signOp: '',
                signVal: ''
              });
              _this.$set(_this.dataTemp, dataList.indexs, {
                proPer: dataList.name,
                orderType: ''
              });
              // 默认给排序字段赋值 不排序
              vm.dataTemp[dataList.indexs].orderType = '1';
              _this.colunmNamelist.push(dataList);
            }
          }
          // console.log('addTabInfoFns==' + JSON.stringify(_this.colunmNamelist));
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
          // console.log('arr=' + JSON.stringify(arr));
        },
        handleRow: function (index, rows) {
          rows[index].summName = rows[index].summColumn + rows[index].summType;
          var tableDatalist = this.$refs.grouptable.data;
          tableDatalist[index].summName = rows[index].summName;
        },
        // 图表预览
        drawImage: function () {
          var customerImage = document.getElementById('echartsPie');
          var customerImage1 = document.getElementById('echartsPie1');
          var myChart = echarts.init(customerImage);
          var myChart1 = echarts.init(customerImage1);
          if (this.chartTemp.chartType == 1) {
            document.getElementById('echartsPie1').style.display = 'none';
            document.getElementById('echartsPie').style.display = 'block';
            var option = {
              title: {
                text: '',
                x: 'left',
                textStyle: {
                  color: '#FFFFFF',
                  fontSize: 25
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}百分比'
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                top: 70,
                itemWidth: 60,
                itemHeight: 30,
                formatter: '{name}',
                textStyle: {
                  color: '#2E2E2E'
                },
                data: [{ name: '客户号00015', icon: 'rect' }, { name: '客户号00215', icon: 'rect' }]
              },
              calculable: true,
              series: [
                {
                  name: '',
                  type: 'pie',
                  radius: '70%', // 饼图的半径大小
                  center: ['60%', '60%'], // 饼图的位置
                  label: { // 饼图图形上的文本标签
                    normal: {
                      show: true,
                      position: 'inner', // 标签的位置
                      textStyle: {
                        fontWeight: 300,
                        fontSize: 16 // 文字的字体大小
                      },
                      formatter: '{d}%'


                    }
                  },
                  xAxis: [],
                  yAxis: [],
                  data: [
                    { value: 25, name: '客户号00015', itemStyle: { normal: { color: '#EEEE00' } } },
                    { value: 75, name: '客户号00215', itemStyle: { normal: { color: '#B0E2FF' } } }

                  ]
                }
              ]
            };
            myChart.setOption(option);
          } else {
            document.getElementById('echartsPie1').style.display = 'block';
            document.getElementById('echartsPie').style.display = 'none';
            var option1 = {
              title: {
                text: '',
                subtext: ''
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['客户号']
              },
              toolbox: {
                show: true,
                feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  magicType: { show: true, type: ['line', 'bar'] },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              calculable: true,
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: ['00015', '00215', '00215']
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  axisLabel: {
                    formatter: '{value}'
                  }
                }
              ],
              series: [
                {
                  name: '',
                  type: 'line',
                  data: [1, 1, 3],
                  markPoint: {
                    data: [
                      { type: 'max', name: '最大值' },
                      { type: 'min', name: '最小值' }
                    ]
                  }
                }
              ]
            };
            myChart1.setOption(option1);
          }
        },

        /** tab点击事件*/
        handleClick: function () {

        },
        // 选择图表类型
        chartchange: function (value) {
          var vue = this;
          if (value == 1) {
            vue.showPrise = true;
            vue.showRentPrise = false;
          } else {
            vue.showPrise = false;
            vue.showRentPrise = true;
          }
        },

        // 打开客户视图
        opencustViewFn: function () {
          this.dialogFormVisible1 = false;
          var customKey = 'custom_' + new Date().getTime(); // 请以custom_前缀开头，并且全局唯一
          var routeId = 'companyCustomersGraphical'; // 模板示例->普通查询的路由ID
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            //            title: '客户视图:'+this.$refs.reftable.selections[0].custName,   //页签名称徐娜
            title: '客户视图',
            //            data: { custId: this.$refs.reftable.selections[0].custId }   //传递的业务数据，可选配置
            data: { custId: 52131319870213432 }
          });
        },

        resetcustomersFn: function () {

        },
        reportPublish: function () {
          if (this.reportTemp.reportName == '') {
            this.$message({ message: '请填写名称！' });
            return;
          }
          this.$message({ message: '报表发布成功！' });
          this.reportdialogVisible = false;
        },

        closedialog: function () {
          this.reportdialogVisible = false;
        },

        //  /** 查询结果 */
        //  queryInfoFn: function () {
        //   	var _this = this;
        //   	if (_this.list.length == 0) {
        //   		vm.$message({ message: '请选择查询条件！', type: 'warning' });
        //   		return;
        //   }
        //   	 _this.conditionAttrs = [];
        //   	 _this.results = [];
        //    console.log(_this.list);
        // // 拼接参数
        // for (var i = 0; i < _this.list.length; i++) {
        // 	var info = {};
        //       info.SS_COL_ITEM = _this.list[i].id;
        //       info.SS_COL_OP = vm.dataSqlTemp[_this.list[i].index].signOp;
        //       info.SS_COL_VALUE = vm.dataSqlTemp[_this.list[i].index].signVal;
        //       info.SS_COL_GJOIN = vm.dataSqlTemp[_this.list[i].index].radio2;
        //       info.SS_COL_JOIN = '';
        //       if (info.SS_COL_GJOIN == '并') {
        //        	info.SS_COL_GJOIN = 'and';
        //       } else if (info.SS_COL_GJOIN == '或') {
        //       		info.SS_COL_GJOIN = 'or';
        //       }
        //        _this.conditionAttrs.push(info);
        //     }
        //       for (var i = 0; i < _this.conlist.length; i++) {
        //       var resultinfo = {};
        //       resultinfo.columnId = _this.conlist[i].id;
        //       resultinfo.sortType = vm.dataTemp[_this.conlist[i].indexs].orderType;
        //       resultinfo.columnTotle = '0';

        //       _this.results.push(resultinfo);
        //    }
        // console.log('conditionAttrs==' + JSON.stringify(_this.conditionAttrs));
        // console.log('results==' + JSON.stringify(_this.results));

        // var param = {
        // 	condition: JSON.stringify({
        //        		conditionAttrs: _this.conditionAttrs,
        //        		results: _this.results
        //     		 })
        // };
        // _this.data = [];
        //    // 拼接参数
        //    yufp.service.request({
        //      method: 'GET',
        //      data: param,
        //      url: backend.adminService + '/api/cimpffqdbcol/queryresult',
        //      callback: function (code, message, response) {
        //        if (code == 0) {
        //       	if (response.code == 0)	{
        //       		_this.dialogFormVisible1 = true;
        //       		var responsedata = response.data;
        //       		querysql = responsedata[0].sql;
        //       		var songer = [];
        //       		var ss = [];
        //       		var showdata = [];// 展示数据
        //       		console.log('22=' + JSON.stringify(response.data));
        //       		console.log('查询结果＝＝' + JSON.stringify(_this.conlist));
        //       		for (var i = 0; i < response.data.length; i++) {
        //       			var aaa = {};
        //       			for (var k in response.data[i]) {
        //       				// 转换时间格式
        //       				if (k.indexOf('Date') != -1) {
        //                  response.data[i][k] = _this.utc2beijing(response.data[i][k]);
        //                }
        //      for (var a = 0; a < _this.conlist.length; a++) {
        //        				if (k.indexOf(_this.conlist[a].ename) != -1) {
        //        					aaa[_this.conlist[a].ename] = response.data[i][k];
        //        				}
        //        				aaa['custIdBase'] = response.data[i].custIdBase;
        //       					aaa['custNameBase'] = response.data[i].custNameBase;
        //       			   }
        //       			}
        //       			showdata.push(aaa);
        //       		}
        //       			_this.data = showdata;
        //   	  		} else {
        //       		vm.$message({ message: response.message, type: 'warning' });
        //       		_this.dialogFormVisible1 = false;
        //   	  		}
        //     		}
        //      }
        //    });
        //  },
        /** 查询结果 */
        queryInfoFn: function () {
          this.dialogVisible = true;
          var _this = this;
          if (_this.list.length == 0) {
            vm.$message({ message: '请先选择查询条件', type: 'warning' });
            return;
          }
          _this.conditionAttrs = [];
          _this.results = [];
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
                childinfo.SS_COL_GORDER = i;
                childinfo.SS_COL_ORDER = j + 1;
                childinfo.SS_COL_JOIN = vm.dataSqlTemp[_this.list[i].children[j].index].radio2;
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
          // console.log('conditionAttrs==' + JSON.stringify(_this.conditionAttrs));
          // console.log('results==' + JSON.stringify(_this.results));

          var param = {
            condition: JSON.stringify({
              conditionAttrs: _this.conditionAttrs,
              results: _this.results,
              topNum: _this.limitNum,
              isexport: '1'
            })
          };
          _this.data = [];
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
                      conditionAttrs: _this.conditionAttrs,
                      results: _this.results,
                      topNum: _this.limitNum,
                      isexport: '1',
                      busiTypeFlag: '1'
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
                        _this.dialogFormVisible1 = true;
                        var responsedata = response.data;
                        if (responsedata.length > 0) {
                          querysql = responsedata[0].sql;
                        }
                        var showdata = [];// 展示数据

                        // console.log('查询结果＝＝' + JSON.stringify(_this.conlist));
                        // console.log('colunmNamelist==' + JSON.stringify(_this.colunmNamelist));
                        // for (let j = 0; j < _this.colunmNamelist.length; j++) {
                        //   if (_this.colunmNamelist[j].name == '客户类型') {
                        //     _this.colunmNamelist[j].dataCode = 'CUST_TYPE';
                        //   }
                        // }
                        // console.log('~~~~~~~~~colunmNamelist==' + JSON.stringify(_this.colunmNamelist));
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
                              // aaa['custIdBase'] = response.data[i].custIdBase;
                              // aaa['custNameBase'] = response.data[i].custNameBase;
                            }
                          }
                          showdata.push(aaa);
                        }
                        // console.log('showdata==' + JSON.stringify(showdata));
                        _this.data = showdata;
                        _this.$refs.yuxtable.total = _this.data.length;
                        _this.data1 = [];
                        var _self = _this.$refs.yuxtable;
                        var b = _self.size;
                        // for (var i = 0; i < b; i++) {
                        //   _this.data1.push(_this.data[i]);
                        // }
                        b = b < _this.data.length ? b : _this.data.length;
                        for (var i = 0; i < b; i++) {
                          _this.data1.push(_this.data[i]);
                        }
                        // console.log('_this.data1', _this.data1);
                      } else {
                        vm.$message({ message: response.message, type: 'warning' });
                        _this.dialogFormVisible1 = false;
                      }
                    }
                  }
                });
                // 调用查询结果接口
              }
            }
          });
        },
        pageChange: function () {
          var _this = this;
          _this.data1 = [];
          var _self = _this.$refs.yuxtable;
          var a = _self.size * (_self.page - 1);
          var b = _self.size;
          var c = b + a > _this.data.length ? _this.data.length : b + a;
          for (var i = a; i < c; i++) {
            _this.data1.push(_this.data[i]);
          }
        },
        sizeChange: function (callBackFunc) {
          var _this = this;
        },
        beforeSizeChange: function (callBackFunc) {
          var _this = this;
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
        //      saveSolution: function(){
        //      	 	var _this=this;
        //	        	if(	_this.list.length==0|| _this.solutionlist.length==0){
        //	        		vm.$message({ message: '请选择查询条件！', type: 'warning' });
        //	        		return;
        //	        }
        //      		vm.solutionformVisible=true;
        //      },
        saveSolutionsub: function () {
          var _this = this;
          if (querysql == '') {
            _this.$message({ message: '请先执行查询结果！', type: 'warning' });
            return;
          }
          yufp.service.request({
            url: '/api/cimpccgbaseinfo/listcmp',
            method: 'GET',
            data: { condition: JSON.stringify({ custGroupIds: _this.$refs.aaa.fm.custGroupIds }) },
            callback: function (code, message, response) {
              if (code == '0') {
                var re = response.data;
                for (var j = 0; j < re.length; j++) {
                  if (re[j].custOrigin === '2') {
                    if (_this.list.length == 0) {
                      vm.$message({ message: '请先选择查询条件', type: 'warning' });
                      return;
                    }
                    _this.groupAttrs = [];
                    // 拼接参数
                    for (var i = 0; i < _this.list.length; i++) {
                      _this.qryarr = [];
                      var info = {};
                      var groupAttr = {};
                      if (vm.dataSqlTemp[_this.list[i].index].signOp == null || vm.dataSqlTemp[_this.list[i].index].signOp === '' || vm.dataSqlTemp[_this.list[i].index].signOp == undefined) {
                        _this.$message('操作符不能为空');
                        return;
                      }
                      if (vm.dataSqlTemp[_this.list[i].index].signVal == null || vm.dataSqlTemp[_this.list[i].index].signVal === '' || vm.dataSqlTemp[_this.list[i].index].signVal == undefined) {
                        _this.$message('属性值不能为空');
                        return;
                      }
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
                      groupAttr.ssColItem = _this.list[i].id;
                      groupAttr.ssColOp = vm.dataSqlTemp[_this.list[i].index].signOp;
                      groupAttr.ssColValue = vm.dataSqlTemp[_this.list[i].index].signVal;
                      groupAttr.ssColGjoin = vm.dataSqlTemp[_this.list[i].index].radio2;
                      groupAttr.ssColJoin = '';
                      groupAttr.ssColGorder = i;
                      groupAttr.ssColOrder = '0';
                      groupAttr.ssId = re[j].custGroupId;
                      if (groupAttr.ssColGjoin == '并') {
                        groupAttr.ssColGjoin = 'and';
                      } else if (groupAttr.ssColGjoin == '或') {
                        groupAttr.ssColGjoin = 'or';
                      }
                      _this.groupAttrs.push(groupAttr);
                    }
                    var groupAuto = {};
                    groupAuto.custGroupId = re[j].custGroupId;
                    groupAuto.sql = querysql;
                    yufp.service.request({
                      method: 'POST',
                      data: groupAuto,
                      url: backend.adminService + '/api/cimpccgbaseinfo/updateAuto',
                      callback: function (code, message, response) {
                        if (code == 0) {

                        }
                      }
                    });
                    yufp.service.request({
                      method: 'POST',
                      data: { groupData: _this.groupAttrs },
                      url: backend.adminService + '/api/ocrmfcifqssolution/savegroupscol',
                      callback: function (code, message, response) {
                        if (code == 0) {
                          _this.$message('操作成功');
                        }
                      }
                    });
                  } else {
                    var groupCustId = '';
                    var custData = _this.data;
                    // console.log('custData', custData)
                    if (custData.length < 1 || custData[0].custId == undefined) {
                      _this.$message('请先查询出客户');
                    }
                    for (var l = 0; l < custData.length; l++) {
                      if (l == 0) {
                        groupCustId = custData[l].custId;
                      } else {
                        groupCustId += ',' + custData[l].custId;
                      }
                    };
                    yufp.service.request({
                      method: 'POST',
                      data: { condition: JSON.stringify({ custIds: groupCustId, custGroupId: re[j].custGroupId }) },
                      url: backend.adminService + '/api/cimpccustgroupcust/joingroup',
                      callback: function (code, message, response) {
                        if (code == 0) {
                          _this.$message('操作成功');
                        }
                      }
                    });
                  }
                }
              }
            }
          });

          var _this = this;
          // if(vm.itemssTemp.ssName==''){
          // vm.$message({ message: '请填写方案名称！', type: 'warning' });
          //  return;
          //  }
          _this.conditionAttrs = [];
          _this.solution = [];
          // 保存方案 方案id为节点id
          for (var i = 0; i < _this.list.length; i++) {
            var info = {};
            info.ssColItem = _this.list[i].id;
            info.ssColOp = vm.dataSqlTemp[_this.list[i].index].signOp;
            info.ssColValue = vm.dataSqlTemp[_this.list[i].index].signVal;
            info.ssColGjoin = vm.dataSqlTemp[_this.list[i].index].radio2;
            info.ssColJoin = '';
            info.ssColGorder = i;
            info.ssColOrder = '0';
            info.ssId = _this.$options.ncmpobj.instanceObj.nodeId;// nodeId
            if (info.ssColGjoin == '并') {
              info.ssColGjoin = 'and';
            } else if (info.ssColGjoin == '或') {
              info.ssColGjoin = 'or';
            }
            _this.conditionAttrs.push(info);
          }
          var resultinfo = {};
          var ssResult = '';
          var ssSort = '';
          // console.log('_this.solutionlist.length==' + _this.solutionlist.length);
          for (var i = 0; i < _this.solutionlist.length; i++) {
            ssResult += _this.solutionlist[i].id;
            ssSort += vm.dataTemp[_this.solutionlist[i].indexs].orderType;
            if (i != _this.solutionlist.length - 1) {
              ssResult += ',';
              ssSort += ',';
            }
          }
          resultinfo.ssResult = ssResult;
          resultinfo.ssSort = ssSort;
          resultinfo.ssType = '1';
          // resultinfo.ssName=vm.itemssTemp.ssName;
          resultinfo.ssName = '组件保存方案';// 组件方案名称保存为节点id
          resultinfo.id = _this.$options.ncmpobj.instanceObj.nodeId;// nodeId
          _this.solution.push(resultinfo);
          // _this.$refs.itemssTemp.validate(function (valid) {
          // if (valid) {
          yufp.service.request({
            url: backend.adminService + '/api/ocrmfcifqssolution/savescol/',
            method: 'POST',
            data: {
              nodeData: JSON.stringify(_this.conditionAttrs),
              connData: JSON.stringify(_this.solution)
            },
            callback: function (code, message, response) {
              if (code == '0') {
                _this.saveDisplay(_this.$refs.aaa.fm.custGroupIds);
                // _this.createFilter();
                // vm.$message({ message: '保存方案成功!' , type: 'info'});
                // vm.solutionformVisible=false;
              } else {
                vm.$message({ message: '保存方案失败!', type: 'warning' });
              }
            }
          });
        },
        // 保存客户群
        // createFilter: function () {
        // 	var me = this;
        //   var custGroupIds = vm.$refs.aaa.$refs.custGroupIds[0].value;
        //   if (querysql == '') {
        // 		vm.$message({ message: '请先执行查询结果！', type: 'warning' });
        // 		return;
        //   }
        //   if (custGroupIds == '') {
        //     vm.$message({ message: '请选择客户群！', type: 'warning' });
        //     return;
        //   }
        //   var model = {};
        //   model.sql = querysql;
        //   yufp.service.request({
        //     url: backend.adminService + '/api/cimpccgbaseinfo/updatesql/' + custGroupIds,
        //     method: 'POST',
        //     data: model,
        //     callback: function (code, message, response) {
        //       if (code == '0') {
        //         // 保存输出
        //         me.saveDisplay(custGroupIds);
        //       } else {
        //         vm.$message({ message: '保存失败!', type: 'warning' });
        //       }
        //     }
        //   });
        // },
        saveDisplay: function (custGroupIds) {
          var _this = this;
          _this.inputAttrs = [];
          _this.resultss = [];
          _this.resultsss = [];
          // console.log('conlist==' + JSON.stringify(_this.conlist));
          var resultinfos = {};
          var resultinfo = {};
          resultinfos.nodeId = _this.$options.ncmpobj.instanceObj.nodeId;;
          _this.resultsss.push(resultinfos);
          var formOutFiled = '';
          var formOutName = '';
          for (var i = 0; i < _this.conlist.length; i++) {
            formOutFiled += _this.conlist[i].fieldname;
            formOutName += _this.conlist[i].name;
            if (i != _this.conlist.length - 1) {
              formOutFiled += ',';
              formOutName += ',';
            }
          }
          resultinfo.formOutName = formOutName;
          resultinfo.formOutFiled = formOutFiled;
          resultinfo.formOutVal = custGroupIds;
          _this.resultss.push(resultinfo);
          // console.log('_this.resultsss==' + JSON.stringify(_this.resultsss));
          // console.log('_this.resultss==' + JSON.stringify(_this.resultss));
          for (var i = 0; i < _this.list.length; i++) {
            var info = {};
            info.formInTable = _this.list[i].tabname;// 表名
            info.formInFiled = _this.list[i].fieldname;// 字段英文名称
            info.formInName = _this.list[i].name;
            info.formInType = vm.dataSqlTemp[_this.list[i].index].signOp;// 操作字典码值
            info.formInVal = vm.dataSqlTemp[_this.list[i].index].signVal;// 值
            info.formInType = vm.dataSqlTemp[_this.list[i].index].radio2;// and or
            info.condition = custGroupIds;// 客户群编号
            info.sourceType = vm.itemTemp.value;// 执行频率
            if (info.formInType == '并') {
              info.formInType = 'and';
            } else if (info.formInType == '或') {
              info.formInType = 'or';
            }
            _this.inputAttrs.push(info);
          }
          // console.log('_this.resultss==' + JSON.stringify(_this.inputAttrs));
          yufp.service.request({
            url: backend.adminService + '/api/cimpcmnodesdisplay/savedisplay/',
            method: 'POST',
            data: {
              nodeData: JSON.stringify(_this.resultsss),
              connData: JSON.stringify(_this.resultss),
              inputData: JSON.stringify(_this.inputAttrs)
            },
            callback: function (code, message, response) {
              if (code == '0') {
                vm.$message({ message: '保存成功!', type: 'info' });
              } else {
                vm.$message({ message: '保存失败!', type: 'warning' });
              }
            }
          });
        },

        /** 报表发布 */
        reportPubFn: function () {
          this.reportdialogVisible = true;
        },
        /** 保存为客户群 */
        saveAsCustGroupFn: function () {
          this.customersdialogVisible = true;
        },
        savecustomers: function () {
          this.$message({ message: '保存成功！' });
          this.customersdialogVisible = false;
        },
        closecustomers: function () {
          this.customersdialogVisible = false;
        },
        /** 手动标签 */
        manulTagFn: function () {

        },
        /** 保存 */
        saveSetFn: function () {
          this.casedialogVisible = true;
        },
        savecase: function () {
          if (this.caseTemp.caseName == '') {
            this.$message({ message: '请填写名称！' });
            return;
          }
          this.$message({ message: '保存成功！' });
          this.casedialogVisible = false;
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
          this.colunmNamelist = [];
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
        groupSummFn: function () {
          var summColumn = '';
          var summName = '';
          var grouptableOption = [];
          var groupnametableOption = [];
          var grouptablelist = {};
          var grouptablelist1 = {};
          this.dialogFormVisible2 = true;
          var tableDatalist = this.$refs.grouptable.data;
          if (tableDatalist.length > 0) {
            for (var i = 0; i < tableDatalist.length; i++) {
              if (tableDatalist[i].summName != '') {
                summColumn = tableDatalist[i].summColumn;
                grouptableOption[i] = { key: summColumn, value: summColumn };
                summName = tableDatalist[i].summName;
                groupnametableOption[i] = { key: summName, value: summName };
              }
            }
            this.grouplist = grouptableOption;
            this.groupnamelist = groupnametableOption;
          }
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
          this.incustomersdialogVisible = true;
        },
        /** 查询结果中的加入客户群 */
        handleIconClick: function () {
          this.customersqrydialogVisible = true;
        },
        closeincustomers: function () {
          this.incustomersdialogVisible = false;
        },
        queryCondelTableRow: function (index, rows) {
          this.list.splice(index, 1);
          // 重置选项
          //			this.firstOptions= [];
          //			this.firstOptions=rows;
          //			this.secondOptions= [];
          //			this.secondOptions=rows;
          //			this.thirdOptions= [];
          //			this.thirdOptions=rows;
          //			this.fourOptions= [];
          //			this.fourOptions=rows;
          //			this.fiveOptions= [];
          //			this.fiveOptions=rows;
          //			this.columnOptions= [];
          //			this.columnOptions=rows;
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
          this.colunmNamelist.splice(index, 1);
          this.colunmNamelist.splice(index + 2, 1);
          this.solutionlist.splice(index, 1);
        },
        saveincustomers: function () {
          this.$message({ message: '保存成功！' });
          this.incustomersdialogVisible = false;
        }
      }
    });
  };
});