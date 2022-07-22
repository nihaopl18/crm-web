/**
 * @created by zhangxs4 on 2018/12/13.
 * @description 营销组件FORM表单-流程组件-分流
 */
define([
  'custom/widgets/js/yufpCustGroup.js'
], function (require, exports) {
  /**
* 页面加载完成时触发
* @param hashCode 路由ID
* @param data 传递数据对象
* @param cite 页面站点信息
*/
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE');
    var options3 = [
      { key: '选项1', value: '排序编号' },
      { key: '选项2', value: '客户编号' },
      { key: '选项3', value: '风险评分' }
    ];
    var querysql="";
    var childgroup="";
    var childgroupname="";
    var vm = yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        var _self = this;
        return {
          // 输入-表单
          queryFieldss: [
            {placeholder: '客户群名称', field: 'custGroupIds', type: 'custom', is: 'yufp-custGroup'}
          ],
          queryButtonss: [],
          options: [{
            value: '1',
            label: '客户高级查询'
          }],
          value: '1', // 下拉框默认值
          orderOptions: [{key: '1',value: '不排序'}, {key: '2',value: '正序'}, {key: '3',value: '逆序'}],
          customersOptions: [{key: '1',value: '普通客户群'}, {key: '2',value: '商圈客户群'}, {key: '3',value: '链式客户群'}, {key: '3',value: '族群'}, {key: '3',value: '集团'}],
          membersOptions : [{key: '1',value: '对公客户群'}, {key: '2',value: '对私客户群'}, {key: '3',value: '公私联动客户群'}],
           batchTypeOptions: [{key: '1',value: '跑批一次'}, {key: '2',value: '每天跑批'}],
          dataSqlTemp: {
            ID: {
              signOp: ''
            }
          },
          customersTemp:{
		  	custGroupName:'',
		  	custGroupType:'',
		  	groupMemberType:'',
		  	batchType:'',
		  	remark:''
          },
          dataTemp: {},
          list: [],
          data: [],
          tableData: [],
          conditionAttrs: [],
          results: [],
          fieldParamDatas:[],
          resultss: [],
          resultsss: [],
          inputAttrs: [],
          solution: [],
          treedata: [],
          grouplist: [],
          groupnamelist: [],
          conlist: [],
          solutionlist: [],
           colunmNamelist: [{"name":"主表客户编号","id":"","ename":"custIdBase"},{"name":"主表客户名称","id":"","ename":"custNameBase"}],
          fieldDatas: [],
          qrylist: [],
          activeName: 'first', // tab默认显示值
          limitNum: '', // 查询条数
          height: yufp.frame.size().height,
          groupHeight: yufp.frame.size().height - 360,
          dialogVisible: false,
          delFieldbuttonDisabled: false,
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
          buttonsDisabled: false,
          customersdialogVisible: false,
          customersbuttonsDisabled: false,
          closecustbuttonsDisabled: false,
          incustomersdialogVisible: false,
          customersqrydialogVisible: false,
          qrydialogVisible: false,
         qryTemp:{},
          viewType: 'DETAIL',
          async: false,
          createFilterbutton: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          radioshow: true,
          dragnode: '',
          radio2: '',
		 ruless:{
             	custGroupName:[{required: true, message: '必填项', trigger: 'blur'}],
             	custGroupType:[{required: true, message: '必填项', trigger: 'blur'}],
             	groupMemberType:[{required: true, message: '必填项', trigger: 'blur'}],
             	batchType:[{required: true, message: '必填项', trigger: 'blur'}]
            },
          activeNames: ['1', '2', '3'],
          classTemp: {
            name: '',
            remark: ''
          },
         
          options3: options3,
          
          editFields: [{
            columnCount: 3,
            fields: [{
              field: 'name',
              label: '分组名称',
              placeholder: '5到25个字符',
              type: 'input',
              rules: [{ required: true, message: '请输入分组名称', trigger: 'blur' }]
            },
            { label: '客户属性', field: 'paramType', type: 'select', options: options3 },
            {
              field: 'where',
              label: '条件',
              placeholder: '5到25个字符',
              type: 'input',
              rules: [{ required: true, message: '请输入条件', trigger: 'blur' }]
            }]
          }]
        };
      },
      mounted: function () {
        var me = this;
        if (me.$options.ncmpobj.instanceObj == undefined) {
          me.createFilterbutton = true;
        } else {
         me.createFilterbutton = false;
        }
        yufp.lookup.bind('CONDITION_FUNC', function (data) {
          me.signOptions = data;
        });
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
      },
      methods: {
      handleCurrentChange1: function (val) {
      childgroup=val.custGroupId;
      childgroupname=val.custGroupIdName;
      },
      //根据客户群加载客户数据
      handleCurrentChange: function (val) {
      var me=this;
      	var sql="";
        yufp.service.request({
              method: 'get',
              url: backend.adminService + '/api/cimpccgbaseinfo/getcustgroup',
              data: {
              	custGroupId:val.custGroupId
              },
              callback: function (code, message, response) {
                if (code == '0') {
					sql=response.data[0].sql;
					//请求执行此sql
					yufp.service.request({
			                  method: 'get',
			                  url: backend.adminService + '/api/cimpffqdbcol/qrycustinfo',
			                  data: {
			                   sql:sql
			                  },
			                  callback: function (code, message, response) {
			                    if (code == '0') {
			                     if(response.data.length!=0){
				                    me.tableData=response.data;
				                  }
				                } else {
				                		vm.$message({ message: '查询客户信息失败!', type: 'warning' });	
				                }
			                  }
			                });
                } else {
                		vm.$message({ message: '查询执行语句失败!', type: 'warning' });	
                }
              }
         });
      },
      saveinout: function () {
       },
      //客户群维护
	      fieldSubFn: function () {
			//if (this.$refs.fieldParamDataTable.selection.length != 1) {
						//this.$message({ message: '请先选择一条记录', type: 'warning' });
						//return false;
			 // }
			  vm.qrydialogVisible=true;
	       },
      //新增客户群
      savecustomers: function () {
      	var vue=this;
      	var custGroupId='';
      	var parmData=this.$refs.fieldParamDataTable.data;
      	//新增自动筛选客户群
    		this.$refs.customersTemp.validate(function (valid) {
	 		 if (valid) {
	        		var model={};
	        		yufp.extend(model, vue.$refs.customersTemp.model);
	        		model.custOrigin='2';
	        		yufp.service.request({
	                  method: 'POST',
	                  url: backend.adminService + '/api/cimpccgbaseinfo/add',
	                  data: model,
	                  callback: function (code, message, response) {
	                    if (code == '0') {
					    		vm.$message({ message: '保存成功!', type: 'info' });
					    		//根据name查询id
					    		yufp.service.request({
			                  method: 'get',
			                  url: backend.adminService + '/api/cimpccgbaseinfo/getid',
			                  data: {
			                   custGroupName:vm.customersTemp.custGroupName
			                  },
			                  callback: function (code, message, response) {
			                    if (code == '0') {
				                    if(response.data.length!=0){
				                    		custGroupId=response.data[0].custGroupId;
				                    }
				                    //动态增加一行新增客户群的数据
							    		var newObj = new Object();
							         newObj.custGroupName=vm.customersTemp.custGroupName;
							         newObj.custGroupId=custGroupId;
							         newObj.custGroupType="自动筛选";
							         parmData.push(newObj);
				                } else {
				                		vm.$message({ message: '保存失败!', type: 'warning' });	
				                }
			                  }
			                });
		                } else {
		                		vm.$message({ message: '保存失败!', type: 'warning' });	
		                }
	                  }
	             });
    	 		}
		})
       },
        close: function () {
          this.$options.ncmpobj.close();
        },
        handleEdit: function (index, row) {
          console.log(index, row);
        },
        handleDelete: function (index, row) {
          console.log(index, row);
        },
        handleClick: function () {

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
          var _set = this;

          if (node) {
            var dataList = {};
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
              url: backend.adminService + '/api/cimpffqdbcol/showcoltype',
              data: param,
              callback: function (code, message, response) {
                var data = response.data;
                console.log('000===' + JSON.stringify(data));
                _set.getConditionField(_set.conditionField, data[0]);
                dataList.section = _set.conditionField[0].section;
                dataList.items = _set.conditionField[0].item;
                // 查询拖拽的字段类型
                var flag = false;// 是否已经添加
                for (var i = 0; i < _set.list.length; i++) {
                  if (_set.list[i].id == dataList.id) {
                    flag = true;
                    break;
                  }
                }
                if (!flag) {
                  _set.list.push(dataList);
                  _set.$set(_set.dataSqlTemp, dataList.id, {
                    radio2: '',
                    proPer: dataList.name,
                    signOp: '',
                    signVal: ''
                  });
                  _set.$set(_set.dataTemp, dataList.id, {
                    proPer: dataList.name,
                    orderType: ''
                  });
                  // 默认给排序字段赋值 不排序
                  vm.dataTemp[dataList.id].orderType = '1';
                  vm.dataSqlTemp[dataList.id].signVal = response.data[0].fName;
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
                    //	          _set.columnOptions=_set.list;
                    //	          _set.chartTagOptions=_set.list;
                    //	          _set.chartTargetOptions=_set.list;
                    //	          _set.xchartTagOptions=_set.list;
                    //	          _set.ychartTargetOptions=_set.list;
                    _set.colunmNamelist.push(dataList);
                    //	          _set.customersColumnOptions=_set.list;
                    //	          _set.firstOptions=_set.list;
                    //	          _set.secondOptions=_set.list;
                    //	          _set.thirdOptions=_set.list;
                    //	          _set.fourOptions=_set.list;
                    //	          _set.fiveOptions=_set.list;
                  }
                }
              }
            });
          }
          console.log('addTabInfoFn==' + JSON.stringify(_set.colunmNamelist));
        },
        addTabInfoFns: function (node) {
          var _set = this;
          if (node) {
            var dataList = {};
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
	           _set.solutionlist.push(dataList);
	          _set.$set(_set.dataSqlTemp, dataList.id, {
	          	radio2: '',
	          	proPer: dataList.name,
	          	signOp: '',
	          	signVal: ''
	          });
	          _set.$set(_set.dataTemp, dataList.id, {
	          	proPer: dataList.name,
	          	orderType: ''
	          });
	          // 默认给排序字段赋值 不排序
	          vm.dataTemp[dataList.id].orderType = '1';
              //	          _set.columnOptions=_set.list;
              //	          _set.chartTagOptions=_set.list;
              //	          _set.chartTargetOptions=_set.list;
              //	          _set.xchartTagOptions=_set.list;
              //	          _set.ychartTargetOptions=_set.list;
	          _set.colunmNamelist.push(dataList);
              //	          _set.customersColumnOptions=_set.list;
              //	          _set.firstOptions=_set.list;
              //	          _set.secondOptions=_set.list;
              //	          _set.thirdOptions=_set.list;
              //	          _set.fourOptions=_set.list;
              //	          _set.fiveOptions=_set.list;
            }
          }
          console.log('addTabInfoFns==' + JSON.stringify(_set.colunmNamelist));
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
          console.log('arr=' + JSON.stringify(arr));
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
        /** 查询结果 */
        queryInfoFn: function () {
	        	var _set = this;
	        	if (_set.list.length == 0) {
	        		vm.$message({ message: '请选择查询条件！', type: 'warning' });
	        		return;
	        }
	        var custGroupIds= _set.$refs.aaa.fm.custGroupIds;
	        var groupsql=custGroupIds;
	        	 _set.conditionAttrs = [];
	        	 _set.results = [];
          console.log(_set.list);
    			// 拼接参数
    			for (var i = 0; i < _set.list.length; i++) {
	     		var info = {};
	            info.SS_COL_ITEM = _set.list[i].id;
	            info.SS_COL_OP = vm.dataSqlTemp[_set.list[i].id].signOp;
	            info.SS_COL_VALUE = vm.dataSqlTemp[_set.list[i].id].signVal;
	            info.SS_COL_GJOIN = vm.dataSqlTemp[_set.list[i].id].radio2;
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
	            resultinfo.columnId = _set.conlist[i].id;
	            resultinfo.sortType = vm.dataTemp[_set.conlist[i].id].orderType;
	            resultinfo.columnTotle = '0';

	            _set.results.push(resultinfo);
          }
    			console.log('conditionAttrs==' + JSON.stringify(_set.conditionAttrs));
    			console.log('results==' + JSON.stringify(_set.results));

    			var param = {
    				condition: JSON.stringify({
              		conditionAttrs: _set.conditionAttrs,
              		results: _set.results,
              		groupsql: groupsql
           		 })
    			};
    			_set.data=[];
            // 拼接参数
          yufp.service.request({
            method: 'GET',
            data: param,
            url: backend.adminService + '/api/cimpffqdbcol/queryresult',
            callback: function (code, message, response) {
              if (code == 0) {
			          	if (response.code == 0)	{
			          		_set.dialogFormVisible1 = true;
			          		if(response.data.length!=0){
			          		var responsedata = response.data;
			          		querysql = responsedata[0].sql;
			          		var songer = [];
			          		var ss = [];
			          		var showdata = [];// 展示数据
			          		console.log('22=' + JSON.stringify(response.data));
			          		console.log('查询结果＝＝' + JSON.stringify(_set.conlist));
			          		for (var i = 0; i < response.data.length; i++) {
			          			var aaa = {};
			          			for (var k in response.data[i]) {
                      			for (var a = 0; a < _set.conlist.length; a++) {
				          				if (k.indexOf(_set.conlist[a].ename) != -1) {
				          					aaa[_set.conlist[a].ename] = response.data[i][k];
				          				}
				          				aaa['custIdBase']=response.data[i].custIdBase;
			          					aaa['custNameBase']=response.data[i].custNameBase;
			          			   }
			          			}
			          			showdata.push(aaa);
			          		}
			          			_set.data = showdata;
			          	 }else{
			          	 	vm.$message({ message: '主客户群没有筛选条件！', type: 'warning' });
			          	 }
		       	  		} else {
			          		vm.$message({ message: response.message, type: 'warning' });
			          		_set.dialogFormVisible1 = false;
		       	  		}
	          		}
            }
          });
        },
        saveSolutionsub: function () {
        	var _set = this;
        	_set.conditionAttrs = [];
        	_set.solution = [];
        	// 保存方案 方案id为节点id
        		for (var i = 0; i < _set.list.length; i++) {
	     		var info = {};
	            info.ssColItem = _set.list[i].id;
	            info.ssColOp = vm.dataSqlTemp[_set.list[i].id].signOp;
	            info.ssColValue = vm.dataSqlTemp[_set.list[i].id].signVal;
	            info.ssColGjoin = vm.dataSqlTemp[_set.list[i].id].radio2;
	            info.ssColJoin = '';
	            info.ssColGorder = i;
	            info.ssColOrder = '0';
	            info.ssId = _set.$options.ncmpobj.instanceObj.nodeId;// nodeId
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
        		  console.log('_set.solutionlist.length==' + _set.solutionlist.length);
	          for (var i = 0; i < _set.solutionlist.length; i++) {
	            ssResult += _set.solutionlist[i].id;
	            ssSort += vm.dataTemp[_set.solutionlist[i].id].orderType;
	             if (i != _set.solutionlist.length - 1) {
	            		ssResult += ',';
	            		ssSort += ',';
	            	}
          }
        			resultinfo.ssResult = ssResult;
        			resultinfo.ssSort = ssSort;
        			resultinfo.ssType = '1';
        			// resultinfo.ssName=vm.itemssTemp.ssName;
        			resultinfo.ssName = _set.$options.ncmpobj.instanceObj.nodeId;// 组件方案名称保存为节点id
        			resultinfo.id = _set.$options.ncmpobj.instanceObj.nodeId;// nodeId
        			_set.solution.push(resultinfo);
          //      	_set.$refs.itemssTemp.validate(function (valid) {
          //			if (valid) {
	        	 	yufp.service.request({
           url: backend.adminService + '/api/cimpffqssolution/savescol/',
           method: 'POST',
				    data: {
	            			nodeData: JSON.stringify(_set.conditionAttrs),
	            			connData: JSON.stringify(_set.solution)
	            		},
           callback: function (code, message, response) {
					    if (code == '0') {
					    		_set.createFilter();
                //						    vm.$message({ message: '保存方案成功!' , type: 'info'});
                //						    vm.solutionformVisible=false;
		                } else {
		                		vm.$message({ message: '保存方案失败!', type: 'warning' });
                //		                		vm.solutionformVisible=false;
		                }
			        }
			    });
          //		    }
          //      	 })
        },
        // 保存客户群
        createFilter: function () {
        	var me = this;
          //var custGroupIds = vm.$refs.aaa.$refs.custGroupIds[0].value;
          var custGroupIds =childgroup;
          if (querysql == '') {
        		vm.$message({ message: '请先执行查询结果！', type: 'warning' });
        		return;
          }
          if (custGroupIds == '') {
        		vm.$message({ message: '请选择客户群！', type: 'warning' });
        		return;
        	}
        	var model = {};
        	model.sql = querysql;
        	yufp.service.request({
            url: backend.adminService + '/api/cimpccgbaseinfo/updatesql/' + custGroupIds,
            method: 'POST',
		    data: model,
            callback: function (code, message, response) {
			    if (code == '0') {
				    // 保存输出
				    me.saveDisplay(custGroupIds);
    } else {
                		vm.$message({ message: '保存失败!', type: 'warning' });
              }
	        }
	    });
        },
        saveDisplay: function (custGroupIds) {
        	var _set = this;
        	 _set.inputAttrs = [];
        	  _set.resultss = [];
        	  _set.resultsss = [];
        		console.log('conlist==' + JSON.stringify(_set.conlist));
        		var resultinfos = {};
        		var resultinfo = {};
        		resultinfos.nodeId = _set.$options.ncmpobj.instanceObj.nodeId; ;
        		 _set.resultsss.push(resultinfos);
        		 var formOutFiled = '';
        		 var formOutName = '';
        		 for (var i = 0; i < _set.conlist.length; i++) {
	            formOutFiled += _set.conlist[i].fieldname;
	            formOutName += _set.conlist[i].name;
	            if (i != _set.conlist.length - 1) {
	            		formOutFiled += ',';
	            		formOutName += ',';
	            }
           	}
        		  resultinfo.formOutName = formOutName;
        		  resultinfo.formOutFiled = formOutFiled;
        		  resultinfo.formOutVal =childgroup;//分群后的客户编号
        		  resultinfo.condition = childgroupname;//分群后的客户编号
	           _set.resultss.push(resultinfo);
        		console.log('_set.resultsss==' + JSON.stringify(_set.resultsss));
        		console.log('_set.resultss==' + JSON.stringify(_set.resultss));
        		for (var i = 0; i < _set.list.length; i++) {
	     		var info = {};
	     		info.formInTable = _set.list[i].tabname;// 表名
	            info.formInFiled = _set.list[i].fieldname;// 字段英文名称
	            info.formInName = _set.list[i].name;
	            info.formInType = vm.dataSqlTemp[_set.list[i].id].signOp;// 操作字典码值
	            info.formInVal = vm.dataSqlTemp[_set.list[i].id].signVal;// 值
	            info.formInType = vm.dataSqlTemp[_set.list[i].id].radio2;// and or
	            info.condition = custGroupIds;// 客户群编号
	            if (info.formInType == '并') {
	             	info.formInType = 'and';
	            } else if (info.formInType == '或') {
	            		info.formInType = 'or';
	            }
	             _set.inputAttrs.push(info);
	          }
	        	yufp.service.request({
            url: backend.adminService + '/api/cimpcmnodesdisplay/savedisplay/',
          method: 'POST',
			    data: {
            			nodeData: JSON.stringify(_set.resultsss),
            			connData: JSON.stringify(_set.resultss),
            			inputData: JSON.stringify(_set.inputAttrs)
            		},
            callback: function (code, message, response) {
				    if (code == '0') {
					    vm.$message({ message: '保存成功!', type: 'info'});
	                } else {
	                		vm.$message({ message: '保存失败!', type: 'warning' });
	                }
		        }
		    });
        },
        queryCondelTableRow: function (index, rows) {
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
	        signchange: function () {

        		},
	       delTableRow: function (index) {
	       	this.conlist.splice(index, 1);
	       	this.colunmNamelist.splice(index+2,1);
	       	this.solutionlist.splice(index, 1);
	       }

      },
      destroyed: function () {
        console.log('yufp.custom.vue---query.js---destroyed');
      }
    });
  };

  /**
	 * 页面销毁时触发destroy方法
	 * @param id 路由ID
	 * @param cite 页面站点信息
	 */
  exports.destroy = function (id, cite) {
    console.log('exports.destroy---query.js---destroy');
  };
});