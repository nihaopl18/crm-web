/**
 * @created by 闫天一 yanty1@yusys.com.cn on 2019-3-5 10:27:02.
 * @description 产品准入限制
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var prodId = data.prodId;
    yufp.lookup.reg('CD0016,CUST_STAT,CD0011');
    var vm = yufp.custom.vue({
      el: '#accessRestrictions',
      data: function () {
        return {
          async: false,
          name: 'asdsad',
          param: { groupNo: '0', levelunit: '1' },
          list: [], // 选择的标签组数据
          optionData: [],
          options: [{
            value: '1',
            label: '产品查询'
          }],
          value: '1', // 下拉框默认值
          dataSqlTemp: {
            ID: {
              signOp: ''
            }
          },
          dataTemp: {},
          data: [],
          conditionAttrs: [],
          results: [],
          grouplist: [],
          groupnamelist: [],
          conlist: [],
          colunmNamelist: [{ 'name': '主表客户编号', 'id': '', 'ename': 'custIdBase' }, { 'name': '主表客户名称', 'id': '', 'ename': 'custNameBase' }],
          fieldDatas: [],
          treedata: [],
          // opRule: [{ required: true, message: '操作符不能为空' }],
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
          viewType: 'DETAIL',
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

        me.$nextTick(function () {
          me.dblclick();
        });
      },
      methods: {
        getdata: function (value) {
          this.treedata = value;
        },

        savecol: function () {
          var _set = this;
          // 拼接参数begin
          _set.conditionAttrs = [];
          for (var i = 0; i < _set.list.length; i++) {
            _set.qryarr = [];
            var info = {};
            info.proId = prodId;
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
            // var childinfo = {};
            // if (_set.list[i].children && _set.list[i].children.length > 0) {
            //   for (var j = 0; j < _set.list[i].children.length; j++) {
            //     childinfo.prodId = prodId;
            //     childinfo.ssColItem = _set.list[i].children[j].id;
            //     childinfo.ssColOp = vm.dataSqlTemp[_set.list[i].children[j].index].signOp;
            //     childinfo.ssColValue = vm.dataSqlTemp[_set.list[i].children[j].index].signVal;
            //     childinfo.ssColGjoin = '';
            //     childinfo.ssColOrder = j + 1;
            //     childinfo.ssColGorder = i;
            //     childinfo.ssColJoin = vm.dataSqlTemp[_set.list[i].children[j].index].radio2;
            //     if (childinfo.ssColJoin == '并') {
            //       childinfo.ssColJoin = 'and';
            //     } else if (childinfo.ssColJoin == '或') {
            //       childinfo.ssColJoin = 'or';
            //     }
            //   }
            //   _set.conditionAttrs.push(childinfo);
            // }
          }
          yufp.service.request({
            url: backend.adminService + '/api/ocrmfsyssscol/savecustcol/',
            method: 'POST',
            data: {
              nodeData: _set.conditionAttrs,
              pordId: prodId
            },
            callback: function (code, message, response) {
              if (code == '0') {
                _set.$message('保存成功');
              }
            }
          });
        },

        // 查询反显
        dblclick: function (row, event) {
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/ocrmfsyssscol/getcustscol',
            async: false,
            data: {
              prodId: prodId
            },
            callback: function (code, message, response) {
              if (response.data != null) {
                for (var i = 0; i < response.data.length; i++) {
                  var collist = {};
                  collist.id = response.data[i].ssColItem;
                  // 根据后台id遍历树对应名称
                  var tempTreeData = vm.treedata;
                  for (var j = 0; j < tempTreeData.length; j++) {
                    if (tempTreeData[j].id == collist.id) {
                      collist.name = tempTreeData[j].colNameC;
                      collist.tabname = tempTreeData[j].value;
                      collist.fieldname = tempTreeData[j].colNameE;
                      collist.colType = tempTreeData[j].colType;

                      // 将字段转为驼峰形式
                      var foos = tempTreeData[j].colNameE;
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
        allowDropover: function (event) {
          event.preventDefault();
        },
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
        addTabInfoFn: function (node) {
          var _set = this;
          if (node) {
            var dataList = {};
            dataList.index = _set.list.length + 1;
            dataList.indexs = _set.conlist.length;
            dataList.name = node.colNameC;
            dataList.id = node.id;
            // 将字段转为驼峰形式
            var foo = node.colNameE;
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
              url: backend.adminService + '/api/ocrmfsyssscol/showcoltype',
              data: param,
              callback: function (code, message, response) {
                var data = response.data;
                _set.getConditionField(_set.conditionField, data[0]);
                dataList.section = _set.conditionField[0].section;
                dataList.items = _set.conditionField[0].item;
                _set.$set(_set.dataSqlTemp, dataList.index, {
                  radio2: '',
                  proPer: dataList.colNameC,
                  signOp: '',
                  signVal: ''
                });
                _set.$set(_set.dataTemp, dataList.indexs, {
                  proPer: dataList.colNameC,
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
                  _set.list.push(dataList);
                  _set.conlist.push(dataList);
                  _set.solutionlist.push(dataList);
                  _set.columnOptions = _set.list;
                  _set.chartTagOptions = _set.list;
                  _set.xchartTagOptions = _set.list;
                  _set.colunmNamelist.push(dataList);
                  _set.customersColumnOptions = _set.list;
                  _set.firstOptions = _set.list;
                  _set.secondOptions = _set.list;
                  _set.thirdOptions = _set.list;
                  _set.fourOptions = _set.list;
                  _set.fiveOptions = _set.list;
                } else {
                  _set.list.push(dataList);
                  _set.solutionlist.push(dataList);
                }
                //          }
              }
            });
          }
        },
        // 获取字段并设置属性
        getConditionField: function (arr, field) {
          var _this = this;
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
          // _this.conditionField.push(obj);
        },
        /** tab点击事件*/
        handleClick: function () {

        },
        /** 重置-yanty */
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
          this.xchartTagOptions = [];
          this.ychartTargetOptions = [];
          // this.resetGroupFn();
        },
        //  指标右侧删除按钮
        queryCondelTableRow: function (index, rows) {
          this.list.splice(index, 1);
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
        }
      }
    });
  };
});