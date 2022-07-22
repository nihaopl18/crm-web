/**
 * @created by yangxiao2 on 2018/11/19.
 * @description 产品选择
 */
define(['./custom/widgets/js/yufpProdSelector.js'], function (require, exports) {
	/**
	 * 页面加载完成时触发
	 * @param hashCode 路由ID
	 * @param data 传递数据对象
	 * @param cite 页面站点信息
	 */
	exports.ready = function (hashCode, data, cite) {
		yufp.lookup.reg('PROD_TYPE_ID,PROD_STATE,RISK-LEVEL');
		yufp.custom.vue({
			el: cite.el,
			//特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
			ncmpobj: data.ncmpobj,
			data: function () {
				var _self = this;
				return {
					model: {},
					times: 0,
					row: [],
					nowArr: [],
					load: false,
					formId: '',
					tableColumns: [
						{ label: '产品编号', prop: 'productId' },
						{ label: '产品名称', prop: 'prodName', width: '200' },
						{ label: '产品类型', prop: 'catlName', width: '120' },
						{ label: '产品分类', prop: 'prodTypeId', width: '100', dataCode: 'PROD_TYPE_ID' },
						{ label: '是否在售', prop: 'prodState', width: '80', dataCode: 'PROD_STATE' },
						// { label: '币种', prop: 'money', width: '80' },
						{ label: '风险等级', prop: 'riskLevel', width: '80', dataCode: 'RISK-LEVEL' },
						{ label: '管理部门', prop: 'prodDept', width: '80' },
						{ label: '产品经理', prop: 'prodMag', width: '100' },
						// { label: '基准利率', prop: 'rate', width: '80' },
						{ label: '可用营销渠道', prop: 'channelNum', width: '150' },
						{ label: '营销渠道模板', prop: 'modelNum', width: '150' },
						{ label: '可用成效指标', prop: 'targetNum', width: '150' }
					],
					Fields: [
						{
							columnCount: 1,
							fields: [
								{
									field: 'productId',
									label: '产品',
									type: 'custom',
									is: 'yufp-prod-selector',
									params: { tabCheckbox: true },
									change: function (val) {
										console.log(val)
										var arr = val.split(',');
										var ids = _self.nowArr.concat(arr);
										var paramIds = new Set(ids);
										_self.nowArr = Array.from(paramIds);
										var param = { condition: JSON.stringify({ ids: _self.nowArr, flag: true }) };
										_self.$refs.reftable.remoteData(param);
										// for (var i = 0; i < arr.length; i++) {
										// 	var model = {};
										// 	model.productId = arr[i];
										// 	yufp.service.request({
										// 		method: 'POST',
										// 		url: backend.adminService + '/api/cmfrcproductmanager/getprodbyid',
										// 		data: model,
										// 		callback: function (code, message, response) {
										// 			if (code == 0) {
										// 				_self.model = response.data;
										// 				var value = {
										// 					field1: _self.times,
										// 					field2: _self.model[0].productId,
										// 					field3: _self.model[0].prodName
										// 				};
										// 				_self.options3.push(value);
										// 				_self.times++;
										// 				// 刷新输出
										// 				var ids = [];
										// 				var selectFlag = true;
										// 				for (var i = 0; i < _self.options3.length; i++) {
										// 					ids[i] = _self.options3[i].field2;
										// 				}
										// 				if (ids.length == 0) {
										// 					selectFlag = false;
										// 				}
										// 				var param = { condition: JSON.stringify({ ids: ids, flag: selectFlag }) };
										// 				_self.$refs.reftable.remoteData(param);
										// 			}
										// 		}
										// 	});
										// }
									}
								},
							]
						}
					],
					options3: [],
					Buttons: [
						{
							label: '新增', type: 'primary', icon: 'plus', click: function (model) {
								
								var arr = model.productId.split(',');
								for (var i = 0; i < arr.length; i++) {
									model.productId = arr[i];
									yufp.service.request({
										method: 'POST',
										url: backend.adminService + '/api/cmfrcproductmanager/getprodbyid',
										data: model,
										callback: function (code, message, response) {
											if (code == 0) {
												_self.model = response.data;
												var value = {
													field1: _self.times,
													field2: _self.model[0].productId,
													field3: _self.model[0].prodName
												};
												_self.options3.push(value);
												_self.times++;
												// 刷新输出
												var ids = [];
												var selectFlag = true;
												for (var i = 0; i < _self.options3.length; i++) {
													ids[i] = _self.options3[i].field2;
												}
												if (ids.length == 0) {
													selectFlag = false;
												}
												var param = { condition: JSON.stringify({ ids: ids, flag: selectFlag }) };
												_self.$refs.reftable.remoteData(param);
											}
										}
									});
								}
								_self.$refs.refform.resetFields();
							}
						},
						{
							label: '移除', type: 'primary', icon: 'yx-bin', click: function (model) {
								// 反向删除多个元素
								var select = _self.$refs.prodTable.selections;
								for (var i = _self.options3.length - 1; i >= 0; i--) {
									for (var j = 0; j < select.length; j++) {
										if (_self.options3[i] != undefined) {
											if (_self.options3[i].field1 == select[j].field1) {
												_self.options3.splice(select[j].field1, 1);
											}
										}
									}
								}
								// 重置
								_self.row = [];
								_self.times = _self.options3.length;
								for (i = 0; i < _self.options3.length; i++) {
									_self.options3[i].field1 = i;
								}
								// 刷新输出
								var ids = [];
								var selectFlag = true;
								for (var i = 0; i < _self.options3.length; i++) {
									ids[i] = _self.options3[i].field2;
								}
								if (ids.length == 0) {
									selectFlag = false;
								}
								var param = { condition: JSON.stringify({ ids: ids, flag: selectFlag }) };
								_self.$refs.reftable.remoteData(param);
							}
						},
					],
					activeNames: ['1', '2', '3'],
				}
			},
			methods: {
				delFn: function () {
					var _self = this;
					var select = _self.$refs.reftable.selections;
					if (select.length < 1) {
						return;
					}
					var nowArrLength = _self.nowArr.length;
					for (var i = 0; i < nowArrLength; ) {
						for (var j = 0; j < select.length; j++) {
							if (select[j].productId == _self.nowArr[i]) {
								_self.nowArr.splice(i, 1);
								i--;
								nowArrLength--;
							}
						}
						i++;
					}
					var param = { condition: JSON.stringify({ ids: _self.nowArr, flag: true }) };
					_self.$refs.reftable.remoteData(param);
				},
				// 组件输出保存
				confirm: function () {
					_self = this;
					if (_self.$refs.reftable.total < 1) {
						_self.$message({ message: '无输出产品', type: 'warning' });
						return;
					}
					var arr = [];
					for (var i = 0; i < _self.$refs.reftable.data.length; i++) {
						// arr[i] = _self.$refs.reftable.data[i].productId + '/' + _self.$refs.reftable.data[i].prodName;
						arr[i] = _self.$refs.reftable.data[i].productId;
					}
					var input = {};
					input.flag = 'product';
					input.formInVal = arr.join(',');
					input.formId = _self.formId;
					input.nodeId = data.ncmpobj.instanceObj.nodeId;
					// 保存输入参数
					yufp.service.request({
						method: 'POST',
						url: backend.adminService + "/api/cmfrcnodeinput/insertlist",
						data: input,
						callback: function (code, message, response) {
							if (code == 0 && response.code == 0) {
								_self.formId = response.message;
								var output = {};
								output.flag = 'product';
								output.formOutVal = arr.join(',');
								output.formId = response.message;
								// 保存输出参数
								yufp.service.request({
									method: 'POST',
									url: backend.adminService + "/api/cmfrcnodeoutput/insertlist",
									data: output,
									callback: function (code, message, response) {
										if (code == 0 && response.code == 0) {
											_self.$message({ message: '上传成功' });
										} else {
											_self.$message({ message: response.message, type: 'warning' });
										}
									}
								});
							} else {
								_self.$message({ message: response.message, type: 'warning' });
							}
						}
					});
				},
				close: function () {
					this.$options.ncmpobj.close();
				}
			},
			// 数据反显
			mounted() {
				_self = this;
				// 反显参数
				var model = {};
				model.nodeId = data.ncmpobj.instanceObj.nodeId;
				console.log('nodeId', model.nodeId);
				// 反显输入参数
				yufp.service.request({
					method: 'POST',
					url: backend.adminService + "/api/cmfrcnodeinput/list",
					data: model,
					callback: function (code, message, response) {
						if (code == 0 && response.code == 0) {
							// 节点id不为空，则将该节点下的数据反显
							if (response.data.length > 0) {
								var temp;
								var data = {};
								var arr = response.data[0].formInVal.split(',');
								_self.nowArr = arr;
								var param = { condition: JSON.stringify({ ids: _self.nowArr, flag: true }) };
								_self.$refs.reftable.remoteData(param);
								// for (var j = 0; j < arr.length; j++) {
								// 	temp = arr[j].split('/');
								// 	arr[j] = temp[0];
								// }
								// for (var i = 0; i < arr.length; i++) {
								// 	data.productId = arr[i];
								// 	yufp.service.request({
								// 		method: 'POST',
								// 		url: backend.adminService + '/api/cmfrcproductmanager/getprodbyid',
								// 		data: data,
								// 		callback: function (code, message, response) {
								// 			if (code == 0) {
								// 				_self.model = response.data;
								// 				var value = {
								// 					field1: _self.times,
								// 					field2: _self.model[0].productId,
								// 					field3: _self.model[0].prodName
								// 				};
								// 				_self.options3.push(value);
								// 				_self.times++;
								// 				// 刷新输出
								// 				var ids = [];
								// 				var selectFlag = true;
								// 				for (var i = 0; i < _self.options3.length; i++) {
								// 					ids[i] = _self.options3[i].field2;
								// 				}
								// 				if (ids.length == 0) {
								// 					selectFlag = false;
								// 				}
								// 				var param = { condition: JSON.stringify({ ids: ids, flag: selectFlag }) };
								// 				_self.$refs.reftable.remoteData(param);
								// 			}
								// 		}
								// 	});
								// }
							}
						}
					}
				});
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
	}
});