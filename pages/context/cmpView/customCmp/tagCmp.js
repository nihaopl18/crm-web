/**
 * @created by zhangxs4 on 2018/10/13.
 * @description 标签客户查询+树模板
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
    var selectOptions = [
      {key: '1', value: '年'}, {key: '2', value: '季'},
		  {key: '3', value: '月'}, {key: '4', value: '天'}
    ];
    var bbb = '';

    var custggno = '';
    var custselectOptions = [];
    var tags1 = [];
    var vm = yufp.custom.vue({
      el: cite.el,
      ncmpobj: data.ncmpobj,
      data: function () {
        var _self = this;
        return {
        	  activeNames: ['1', '2', '3'],
          async: false,
          qryflag: false,
          tags1: tags1,
          selectOptions: selectOptions,
          custselectOptions: custselectOptions,
          param: {groupNo: '0', levelunit: '1'},
          custTemp: {
          	custgroup: '',
          	custgroupno: ''
          },
          itemTemp: {
          	value: '',
          	addcust: ''
          },
          list: [], // 选择的标签组数据
          qryUrl: backend.adminService + '/api/cimftagcusttags/getlistbytags',
          treeqryUrl: backend.adminService + '/api/cimfmmftagGrop/getGroupTree',
          selectList: [], // 选中的作为查询条件的标签
          qryList: [], // 查询条件
          custtagList: [],
          resultss: [],
          resultsss: [],
          inputAttrs: [],
		  /** 查询字段 */
          queryFields: [],
          querysql: '',
          setDatas: [],
          queryButtons: [
            /** 搜索按钮 */
            {label: '查询',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              hidden: false,
              click: function (model, valid) {
                if (valid) {
                  _self.qryFn(model);
                }
              }},
            {label: '保存',
              op: 'submit',
              type: 'primary',
              icon: 'check',
              hidden: true,
              click: function (model, valid) {
            	if (valid) {
                	_self.createFilter(model);
               	}
              }}
          ],
          queryFieldss: [
            {placeholder: '客户群名称',
              field: 'custGroupIds',
              type: 'custom',
              is: 'yufp-custGroup',
              clickFn: function () {
                _self.$nextTick(function () {
			 var qrycondition = 	_self.$refs.custform.$refs.custGroupIds[0].$refs.queryCondition;
                  var fd = qrycondition.fieldData[1].field;
                  var jon = {};
                  jon[fd] = '4';
			  yufp.clone(jon, qrycondition.fm);
                  qrycondition.switch(fd, 'disabled', true);
                  var param = { condition: JSON.stringify(qrycondition.fm) };
			 _self.$refs.custform.$refs.custGroupIds[0].queryFn(param);
                });
              }
            }
          ],
          queryButtonss: [],
		  /** 表格栏位 */
          tableColumns: [
            {label: '客户编号', prop: 'custId', width: '170'},
            {label: '客户名称', prop: 'custName', width: '160'},
            {label: '客户类型', prop: 'custType', width: '150', dataCode: 'CUST_TYPE'},
            {label: '客户状态', prop: 'custStat', width: '150', dataCode: 'CUST_STAT'},
            {label: '证件类型', prop: 'identType', dataCode: 'IDENT_TYPE', width: '150'},
            {label: '证件号码', prop: 'identNo', width: '200'}
          ],
		  height: yufp.frame.size().height,
		  tabHeight: yufp.frame.size().height - 103 - 130
        };
      },
      mounted: function () {
	   		var me = this;
	   		if (me.$options.ncmpobj.instanceObj == undefined) {
	   			 me.queryButtons[1].hidden = true;
	   		} else { // 回显
	   			var nodeId = me.$options.ncmpobj.instanceObj.nodeId;
	   			 me.queryButtons[1].hidden = false;
	   			 // 根据nodeid查询formid查询标签号格式：33，33，44
	   			  yufp.service.request({
			            method: 'GET',
			            url: backend.adminService + '/api/cimpcmnodesdisplay/gettagno',
			            data: {
			            	 	nodeId: nodeId
			            },
			            callback: function (code, message, response) {
			            		if (response.data.length != 0) {
			            			var tagno = '';
			            			for (var i = 0; i < response.data.length; i++) {
			            				tagno += response.data[i].formInVal;
			            				 if (i != response.data.length - 1) {
			            				 	tagno += ',';
			            				 }
			            			}
			            			var custgroup = response.data[0].condition;
			            			var sourceType = response.data[0].sourceType;
			            			vm.$refs.custform.fm.custGroupIds = custgroup;
			            			// 查询标签以及对应的分组groupno
			            			  vm.setCustTags(tagno, sourceType);
			            		}
			            }
            		});
	   		}
        yufp.lookup.bind('CLIENT_TYPE', function (data) {
          me.custselectOptions = data;
        });
      },
      methods: {
      	// 设置回显标签
      	setCustTags: function (value, item) {
	      // 每次加载前清空数据
	      	this.selectList = [];
          	this.list = [];
          	// this.setlist=[];//
          	this.custtagList = [];
        var me = this;
          var custgroupNo = '';

          this.$nextTick(function () {
          vm.itemTemp.value = item;
				 var param = {
   condition: JSON.stringify({
                tag: value
              })
 };
            // 查询已经选择的标签数据展示
				 yufp.service.request({
			          method: 'GET',
			          data: param,
			          url: backend.adminService + '/api/cimfmmtagtagsinfo/qrytag',
			          callback: function (code, message, response) {
			          	if (code == 0) {
			          		var Dedupliflag;
				            	var resultArr = [];// 去重后的数组
				            	var custtagsArr = [];
				            	 var tags = [];
			              	 var tagList = {};
			              	 var tags2 = {};
			              	 var flag = false;
			              	 var flag1 = true;
				          	for (var i = 0; i < response.data.length; i++) {
				          		// 展示已有标签
				          		custtagsArr.push(response.data[i]);
				          		var setselectListinfo = {};
				          		setselectListinfo.state = false;
				          		setselectListinfo.id = response.data[i].tagNo;
				          		setselectListinfo.name = response.data[i].tagName;
				          		// setselectListinfo.processMode=response.data[i].processMode;
				          		setselectListinfo.groupNo = response.data[i].groupNo;
				          		// setselectListinfo.tagLifecycle=response.data[i].tagLifecycle;
				            		me.selectList.push(setselectListinfo);// selectList
				            		var idlist = [];
					            idlist.push(setselectListinfo.id);
							    me.qryList.push({stu: idlist});

					            // me.setlist.push(response.data[i].tagNo);//
				            		// 过滤重复的groupNo
				            		Dedupliflag = true;

                    // 将标签拼接成格式[{"name":"1417","children":[{"name":"267496"},{"name":"286398"}]},										{"name":"267425","children":[{"name":"267487"}]}]
                    var groupinfo = {};
                      		groupinfo.name = response.data[i].tagNo;
                      		tags = [{name: groupinfo.name}];
                      		tags2 = {name: groupinfo.name};
                    if (me.custtagList.length > 0) {
						            for (var j = 0; j < me.custtagList.length; j++) {
							            	  var tagList1 = {};
							              if (response.data[i].groupNo == me.custtagList[j].name) {
							                  me.custtagList[j].children.push(tags2);
							                  flag = true;
							                  flag1 = true;
							              } else {
							              	  tagList1.name = response.data[i].groupNo;
							              	  tagList1.children = tags;
							              	  flag = true;
							              	  flag1 = false;
							              }
						            }
			                     } else {
			                     	tagList.name = response.data[i].groupNo;
						            tagList.children = tags;
			                     }
			                      tags1 += response.data[i].tagNo;
			                      if (i != response.data.length - 1) {
                        tags1 += ',';
                    }
            if (!flag) {
									  me.custtagList.push(tagList);
                    }
            if (!flag1) {
									  me.custtagList.push(tagList1);
                    }
                    console.log('isonger11==' + JSON.stringify(me.custtagList[0].name));
							 // 将标签拼接成格式end
          }
				          	console.log('me.custtagList.length==' + me.custtagList.length);
				          	for (var m = 0; m < me.custtagList.length; m++) {
				          	// 展示标签分组 根据groupNo查询该分组下的所有标签
				            		var param = { condition: JSON.stringify({groupNo: me.custtagList[m].name}) };
				            		yufp.service.request({
				                  method: 'GET',
				                  data: param,
				                  async: false,
				                  url: backend.adminService + '/api/cimfmmtagtagsinfo/getTagByGroupNo',
				                  callback: function (code, message, response) {
				                      if (code === 0) {
				                      	if (response.data.length > 0) {
				                      	 var setdataList = {};
								         setdataList.name = response.data[0].groupName;
								         setdataList.id = response.data[0].groupNo;
				                          var setinstu = response.data;
				                          var tags = [];
				                          for (var k = 0; k < setinstu.length; k++) {
				                              var ksetinfo = {};
				                              ksetinfo.name = setinstu[k].tagName;
				                              ksetinfo.id = setinstu[k].tagNo;
				                              ksetinfo.state = true;
				                              ksetinfo.prototypeindex = m;
                                      		  ksetinfo.index = k;
				                              // ksetinfo.processMode=setinstu[k].processMode;
				                              ksetinfo.groupNo = setinstu[k].groupNo;
				                              // ksetinfo.tagLifecycle=setinstu[k].tagLifecycle;
				                              console.log('children==' + me.custtagList[m].children.length);

				                              for (var j in me.selectList) {
											    if (ksetinfo.name == me.selectList[j].name) {
											      ksetinfo.state = false;
											      me.selectList[j].index = ksetinfo.index;
											      me.selectList[j].prototypeindex = ksetinfo.prototypeindex;
											      break;
											    }
								  			  }
				                              tags.push(ksetinfo);
				                          }
				                          setdataList.stu = tags;
				                          if (tags.length > 0) { // 当有分组有标签的时候才添加到右侧
				                            me.list.push(setdataList);
				                          }
				                      }
				                      }
				                  }
				                });
				          }
			          	}
			          }
         		});
         		});
	    },

        /** 标签树单击事件 */
        nodeClickFn: function (nodeData, node, self) {
          this.addTabInfoFn(nodeData);
        },

        /** 添加查询标签 */
        addTabInfoFn: function (node) {
          var _set = this;
          if (node) {
            var dataList = {};
            dataList.name = node.groupName;
            dataList.id = node.groupNo;
            var flag = false;// 判断是否已经添加
            for (var i = 0; i < _set.list.length; i++) {
              if (_set.list[i].id == node.groupNo) {
                flag = true;
                break;
              }
            }
            if (!flag) {
              var param = { condition: JSON.stringify({groupNo: node.groupNo}) };
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
                      info.state = true;
                      tags.push(info);
                    }
                    dataList.stu = tags;
                    if (tags.length > 0) { // 当有分组有标签的时候才添加到右侧
                      _set.list.push(dataList);
                    }
                  }
                }
              });
              console.log('_set.list==' + JSON.stringify(_set.list));
            }
          }
        },
        // 保存为客户群保存sql
        createFilter: function (node) {debugger
	        	var me = this;
	    		var custGroupIds = me.$refs.custform.$refs.custGroupIds[0].value;
	    		if (me.setDatas == '') {
	        		vm.$message({ message: '请先执行出查询结果！', type: 'warning' });
	        		return;
	        	}
	    		if (custGroupIds == '') {
	        		vm.$message({ message: '请选择客户群！', type: 'warning' });
	        		return;
	        	}
	        	var model = {};
	        	model.sql = me.setDatas[0].sql;
	        	yufp.service.request({
          url: backend.adminService + '/api/cimpccgbaseinfo/updatesql/' + custGroupIds,
            method: 'POST',
			    data: model,
            callback: function (code, message, response) {
				    if (code == '0') {
					     // 保存输入输出
					    me.saveDisplay(custGroupIds);
	                } else {
	                		vm.$message({ message: '保存失败!', type: 'warning' });
	                }
		        }
		    });
        },
        // 保存输入输出
        saveDisplay: function (custGroupIds) {
     		var _set = this;
     		_set.inputAttrs = [];
     		var resultinfos = {};
        		var resultinfo = {};
        		resultinfos.nodeId = _set.$options.ncmpobj.instanceObj.nodeId;
        		 _set.resultsss.push(resultinfos);
        		  resultinfo.formOutName = '客户编号,客户名称,客户类型,客户状态,证件类型,证件号码';
        		  resultinfo.formOutFiled = 'CUST_ID,CUST_NAME,CUST_TYPE,CUST_STAT,IDENT_TYPE,IDENT_NO';
        		  resultinfo.formOutVal = custGroupIds;
        		  resultinfo.condition = '';
        		 _set.resultss.push(resultinfo);

        		 for (var i = 0; i < _set.selectList.length; i++) {
	     		var info = {};
	     		info.formInTable = 'CIM_F_TAG_CUST_TAGS,ACIM_F_CI_CUSTOMER';// 表名
	            info.formInFiled = 'TAG_NO';// 字段英文名称
	            info.formInName = '标签号';
	            info.formInVal = _set.selectList[i].id;// 标签号码值
	            info.condition = custGroupIds;// 客户群编号
	            info.sourceType = vm.itemTemp.value;// 执行频率
	             _set.inputAttrs.push(info);
	          }
	        		yufp.service.request({
          url: backend.adminService + '/api/cimpcmnodesdisplay/savedisplay/',
            method: 'POST',
			    data: {
			    			nodeData: JSON.stringify(_set.resultsss), // 节点
			    			connData: JSON.stringify(_set.resultss), // 输出
	         			inputData: JSON.stringify(_set.inputAttrs)// 输入
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
        /** 添加标签到查询区域 */
        addTabQuryFn: function (info, infoindex, index) {
          var me = this;
          var flag = false;// 条件中是否已经存在
          for (var i = 0; i < me.selectList.length; i++) {
            if (me.selectList[i].id == info.id) {
              info.state = true;
              me.selectList.splice(i, 1);
              me.qryList.splice(i, 1);
              me.custtagList.splice(i, 1);
              flag = true;
              break;
            }
          }
          if (!flag) {
          	info.state = false;
          	info.prototypeindex = index;
          	info.index = infoindex;
            me.selectList.push(info);
            // 拼接标签tagno查询客户信息
            var idlist = [];
            idlist.push(info.id);
		    me.qryList.push({stu: idlist});
		    // 拼接画像标签名称
		    var idlist1 = [];
            idlist1.push(info.name);
		    me.custtagList.push({stu1: idlist1});
          }
          console.log('qryList==' + JSON.stringify(me.qryList));
        },

        valueChange: function (value) {
        		vm.custTemp.custgroup = value;
        },
        // tablex加载返回数据
        loaddata: function (value) {
        		this.setDatas = value;
        },
        // 查询结果展示
        qryFn: function (row) {
        	 	 var me = this;
        	 	 if (me.qryList.length == 0) {
        	 	 	vm.$message({ message: '请先选择标签！', type: 'warning' });
	        		return;
        	 	 }
        		 var param = {
        		 	condition: JSON.stringify({tagIdGroup: me.qryList})
        		 };
          me.$refs.reftable.remoteData(param);
        },
        /** 删除选中的标签 */
        deleteSeTagFn: function (tag) {
          var me = this;
          var f = 0;
          for (var i = 0; i < me.selectList.length; i++) {
            if (me.selectList[i].id == tag.id) {
              f = i;
              break;
            }
          }
          for (var i = 0; i < me.qryList.length; i++) {
            if (me.qryList[i].stu == tag.id) {
              f = i;
              break;
            }
          }
          for (var i = 0; i < me.custtagList.length; i++) {
            if (me.custtagList[i].stu1 == tag.name) {
              f = i;
              break;
            }
          }
          me.selectList.splice(f, 1);
          me.qryList.splice(f, 1);
          me.custtagList.splice(f, 1);
          me.list[tag.prototypeindex].stu[tag.index].state = true;
        },
        delstGroup: function (i) {
	        	var me = this;
	        	me.list.splice(i, 1);
        }
      }
    });
  };
});