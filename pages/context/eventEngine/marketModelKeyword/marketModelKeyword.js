/**
 * Created by yangxiao2 2018-10-16
 * 渠道营销模板关键字管理
 */
define(function (require, exports) {
	// page加载完成后调用ready方法
	exports.ready = function (hashCode, data, cite) {
		// 源表英文名
		var eNameOptions = [];
		// 源表中文名
		var cNameOptions = [];
		// 源表字段英文名
		var eFieldOptions = [];
		// 源表字段中文名
		var cFieldOptions = [];
		// 设置表名注入select控件，设置延时为1毫秒
		setTimeout(function () {
			// 表英文名
			yufp.service.request({
				method: 'GET',
				url: backend.adminService + '/api/cmfrcmodelkeyword/gettabename',
				callback: function (code, message, response) {
					if (code == 0) {
						for (var i = 0; i < response.data.length; i++) {
							eNameOptions.push({
								key: i.toString(),
								value: response.data[i].sourceTabEname
							})
						}
					}
				}
			});
			// 表中文名
			yufp.service.request({
				method: 'GET',
				url: backend.adminService + '/api/cmfrcmodelkeyword/gettabcname',
				callback: function (code, message, response) {
					if (code == 0) {
						for (var i = 0; i < response.data.length; i++) {
							cNameOptions.push({
								key: i.toString(),
								value: response.data[i] ? response.data[i].SOURCE_TAB_CNAME : '无中文表名'
							})
						}
					}
				}
			});
		}, 0);
		yufp.lookup.reg('KEYWORD_SOURCE,ACTIVITY_CORE_TYPE');
		yufp.custom.vue({
			el: cite.el,
			data: function () {
				var _self = this;
				return {
					chinaTableName: '',
					chinaFieldName: '',
					optionValue: '',
					eNameOptions: [],
					cNameOptions: cNameOptions,
					eFieldOptions: eFieldOptions,
					cFieldOptions: cFieldOptions,
					aliasName: '',
					//搜索栏
					queryFields: [
						{ placeholder: '源表英文名', field: 'sourceTabEname', type: 'input' },
						{ placeholder: '源表中文名', field: 'sourceTabCname', type: 'input' },
						{ placeholder: '源字段英文名', field: 'sourceFieldEname', type: 'input' },
						{ placeholder: '源字段中文名', field: 'sourceFieldCname', type: 'input' }
					],
					queryButtons: [
						{
							label: '搜索', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
								if (valid) {
									var param = { condition: JSON.stringify(model) };
									_self.$refs.reftable.remoteData(param);
								}
							}
						},
						{ label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
					],
					//显示的数据
					tableColumns: [
						{ label: '源表英文名', prop: 'sourceTabEname', width: 200 },
						{ label: '源表中文名', prop: 'sourceTabCname', width: 160 },
						{ label: '源字段英文名', prop: 'sourceFieldEname' },
						{ label: '源字段中文名', prop: 'sourceFieldCname', width: 120 },
						{ label: '关联关键字', prop: 'keywordConnect', width: 120, disabled: true },
						{ label: '描述', prop: 'adescribe', width: 120 },
						{ label: '别名', prop: 'aliasName', width: 120 }
					],
					// 新增界面
					updateFieldsAdd: [
						{
							columnCount: 1,
							fields: []
						},
						{
							columnCount: 2,
							fields: [
								{
									field: 'sourceTabEname', label: '源表英文名', type: 'select', options: eNameOptions, filterable: true,
									rules: [{ required: true, message: '必填项', trigger: 'blur' }],
									change: function (model) {
										var sourceTabEname
										if (!isNaN(parseInt(model))) {
											sourceTabEname = eNameOptions[parseInt(model)].value;
										}
										var json = {};
										json.sourceTabEname = sourceTabEname;
										var _this = _self;

										if (json.sourceTabEname) {
											yufp.service.request({
												method: 'POST',
												url: backend.adminService + '/api/cmfrcmodelkeyword/getmainfield',
												data: json,
												callback: function (code, message, response) {
													console.log('response', response);
													_this.$refs.reformAdd.formModel.keywordConnect = response.data[0].columnName;
												}
											});
										}

										// 获取表内字段加入select控件，设置延时为1毫秒
										setTimeout(function () {
											yufp.service.request({
												method: 'POST',
												url: backend.adminService + '/api/cmfrcmodelkeyword/getfield',
												data: json,
												callback: function (code, message, response) {

													if (code == 0 && response.data.length > 0) {
														var fieldData = response.data;
														var eFieldOptions = [];
														var cFieldOptions = [];
														// 清空上次查询产生的字段
														_this.updateFieldsAdd[1].fields[2].options = [];
														for (var i = 0; i < fieldData.length; i++) {
															eFieldOptions[i] = new Object();
															eFieldOptions[i].key = i.toString();
															eFieldOptions[i].value = fieldData[i].sourceFieldEname;
															cFieldOptions[i] = new Object();
															cFieldOptions[i].key = i.toString();
															cFieldOptions[i].value = fieldData[i].sourceFieldCname;
														}
														_this.$refs.reformAdd.switch('sourceFieldEname', 'options', eFieldOptions);
														//_this.$refs.reformAdd.switch('keywordConnect', 'options', eFieldOptions);
														// if (eFieldOptions.length > 0) {
														// 	_this.$refs.reformAdd.formModel.keywordConnect = eFieldOptions[0].value;
														// }
														_this.eFieldOptions = eFieldOptions;
														_this.cFieldOptions = cFieldOptions;
													}
												}
											});
										}, 1000);
										// 设置对应的表中文名
										if (!isNaN(parseInt(model))) {
											_this.chinaTableName = _this.cNameOptions[parseInt(model)].value;
											_this.$refs.reformAdd.formModel.sourceTabCname = _this.cNameOptions[parseInt(model)].value;
										} else {
											_this.$refs.reformAdd.formModel.sourceTabCname = _this.chinaTableName;
										}

									},
									focus: function(event) {
										console.log(event)
									}
								},
								{ field: 'sourceTabCname', label: '源表中文名', type: 'input', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
								{
									field: 'sourceFieldEname', label: '源字段英文名', type: 'select', options: [], filterable: true,
									rules: [{ required: true, message: '必填项', trigger: 'blur' }], change: function (model) {
										// 设置对应的表字段中文名

										var _this = _self;
										if (!isNaN(parseInt(model))) {
											console.log("this.options------>>", this.options)
											_this.optionValue = this.options[parseInt(model)].value;
										}
										if (!isNaN(parseInt(model))) {
											_this.chinaFieldName = _this.cFieldOptions[parseInt(model)].value;
											sourceFieldCname = _this.cFieldOptions[parseInt(model)].value;
										}
										_this.$refs.reformAdd.formModel.sourceFieldCname = _this.chinaFieldName;
										_this.$refs.reformAdd.formModel.aliasName = '@' + _this.optionValue + '@'
									}
								},
								{ field: 'sourceFieldCname', label: '源字段中文名', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
								// {
								// 	field: 'keywordSource', label: '关键字来源', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'ACTIVITY_CORE_TYPE', change: function (model) {
								// 		var _this = _self;
								// 		if (!isNaN(parseInt(model))) {
								// 			if (parseInt(model) == 0) {
								// 				_this.$refs.reformAdd.formModel.keywordConnect = 'PRODUCT_ID';
								// 			}
								// 			if (parseInt(model) == 1) {
								// 				_this.$refs.reformAdd.formModel.keywordConnect = 'CUST_ID';
								// 			}
								// 		}
								// 	}
								// },
								{
									field: 'keywordSource', label: '关键字来源', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'ACTIVITY_CORE_TYPE'
								},
								//{ field: 'keywordSource', label: '关键字来源', rules: [{ required: true, message: '必填项', trigger: 'blur' }], value: '表', disabled: true },
								{ field: 'keywordConnect', label: '关联关键字', rules: [{ required: true, message: '必填项', trigger: 'blur' }], disabled: true },
								//{ field: 'adescribe', label: '描述', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
								{ field: 'aliasName', label: '别名', rules: [{ required: true, message: '必填项', trigger: 'blur' }] }
							]
						},
						{
							columnCount: 1,
							fields: [
								{ field: 'adescribe', label: '描述', type: 'textarea', rows: 4, rules: [{ required: true, message: '必填项', trigger: 'blur' }] }
							]
						},
					],
					// 修改界面
					updateFieldsSet: [
						{
							columnCount: 1,
							fields: []
						},
						{
							columnCount: 2,
							fields: [
								// {
								// 	field: 'sourceTabEname', label: '源表英文名', type: 'select', options: eNameOptions, filterable: true,
								// 	rules: [{ required: true, message: '必填项', trigger: 'blur' }], change: function (model) {
								// 		var sourceTabEname;
								// 		if (!isNaN(parseInt(model))) {
								// 			sourceTabEname = eNameOptions[parseInt(model)].value;
								// 		}
								// 		var json = {};
								// 		json.sourceTabEname = sourceTabEname;
								// 		var _this = _self;
								// 		// 获取表内字段加入select控件
								// 		yufp.service.request({
								// 			method: 'POST',
								// 			url: backend.adminService + '/api/cmfrcmodelkeyword/getfield',
								// 			data: json,
								// 			callback: function (code, message, response) {
								// 				if (code == 0) {
								// 					var fieldData = response.data;
								// 					for (var i = 0; i < fieldData.length; i++) {
								// 						eFieldOptions[i] = new Object();
								// 						eFieldOptions[i].key = i.toString();
								// 						eFieldOptions[i].value = fieldData[i].sourceFieldEname;
								// 						cFieldOptions[i] = new Object();
								// 						cFieldOptions[i].key = i.toString();
								// 						cFieldOptions[i].value = fieldData[i].sourceFieldCname;
								// 					}
								// 					_this.$refs.reformSet.switch('sourceFieldEname', 'options', eFieldOptions);
								// 					_this.eFieldOptions = eFieldOptions;
								// 					_this.cFieldOptions = cFieldOptions;
								// 				}
								// 			}
								// 		});
								// 		// 设置对应的表中文名
								// 		if (!isNaN(parseInt(model))) {
								// 			_this.$refs.reformSet.formModel.sourceTabCname = _this.cNameOptions[parseInt(model)].value;
								// 		}
								// 	}
								// },
								// { field: 'sourceTabCname', label: '源表中文名' },
								// {
								// 	field: 'sourceFieldEname', label: '源字段英文名', type: 'select', options: [], filterable: true,
								// 	rules: [{ required: true, message: '必填项', trigger: 'blur' }], change: function (key) {
								// 		// 设置对应的表字段中文名
								// 		var _this = _self;
								// 		var sourceFieldCname;
								// 		if (!isNaN(parseInt(key))) {
								// 			sourceFieldCname = cFieldOptions[parseInt(key)].value;
								// 		}
								// 		_this.$refs.reformSet.formModel.sourceFieldCname = sourceFieldCname;
								// 	}
								// },
								// { field: 'sourceFieldCname', label: '源字段中文名' },
								// { field: 'keywordSource', label: '关键字来源', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'KEYWORD_SOURCE' },
								// { field: 'keywordConnect', label: '关联关键字', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
								// //{ field: 'adescribe', label: '描述', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
								// { field: 'aliasName', label: '别名', rules: [{ required: true, message: '必填项', trigger: 'blur' }] }
								{
									field: 'sourceTabEname', label: '源表英文名', type: 'select', options: eNameOptions, filterable: true,
									rules: [{ required: true, message: '必填项', trigger: 'blur' }], change: function (model) {
										var _this = _self;
										var sourceTabEname
										if (isNaN(parseInt(model))) {
											sourceTabEname = _this.$refs.reformSet.formModel.sourceTabEname
										}

										if (!isNaN(parseInt(model))) {
											sourceTabEname = eNameOptions[parseInt(model)].value;
										}
										var json = {};
										json.sourceTabEname = sourceTabEname;
										if (json.sourceTabEname) {
											yufp.service.request({
												method: 'POST',
												url: backend.adminService + '/api/cmfrcmodelkeyword/getmainfield',
												data: json,
												callback: function (code, message, response) {
													console.log('response', response);
													_this.$refs.reformSet.formModel.keywordConnect = response.data[0].columnName;
												}
											});
										}
										// 获取表内字段加入select控件，设置延时为1毫秒
										setTimeout(function () {
											yufp.service.request({
												method: 'POST',
												url: backend.adminService + '/api/cmfrcmodelkeyword/getfield',
												data: json,
												callback: function (code, message, response) {

													if (code == 0 && response.data.length > 0) {
														var fieldData = response.data;
														var eFieldOptions = [];
														var cFieldOptions = [];
														// 清空上次查询产生的字段
														_this.updateFieldsAdd[1].fields[2].options = [];
														for (var i = 0; i < fieldData.length; i++) {
															eFieldOptions[i] = new Object();
															eFieldOptions[i].key = i.toString();
															eFieldOptions[i].value = fieldData[i].sourceFieldEname;
															cFieldOptions[i] = new Object();
															cFieldOptions[i].key = i.toString();
															cFieldOptions[i].value = fieldData[i].sourceFieldCname;
														}
														_this.$refs.reformSet.switch('sourceFieldEname', 'options', eFieldOptions);
														//_this.$refs.reformAdd.switch('keywordConnect', 'options', eFieldOptions);
														// if (eFieldOptions.length > 0) {
														// 	_this.$refs.reformSet.formModel.keywordConnect = eFieldOptions[0].value;
														// }
														_this.eFieldOptions = eFieldOptions;
														_this.cFieldOptions = cFieldOptions;
													}
												}
											});
										}, 1000);
										// 设置对应的表中文名
										if (!isNaN(parseInt(model))) {
											_this.chinaTableName = _this.cNameOptions[parseInt(model)].value;
											_this.$refs.reformSet.formModel.sourceTabCname = _this.cNameOptions[parseInt(model)].value;
										} else {
											// _this.$refs.reformSet.formModel.sourceTabCname = _this.chinaTableName;
										}

									}
								},
								{ field: 'sourceTabCname', label: '源表中文名', type: 'input', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
								{
									field: 'sourceFieldEname', label: '源字段英文名', type: 'select', options: [], filterable: true,
									rules: [{ required: true, message: '必填项', trigger: 'blur' }], change: function (model) {
										// 设置对应的表字段中文名

										var _this = _self;
										console.log("parseInt(model)", parseInt(model));
										if (!isNaN(parseInt(model)) && this.options.length > 0) {
											console.log("this.options", this.options);
											_this.optionValue = this.options[parseInt(model)].value;
											_this.$refs.reformSet.formModel.aliasName = '@' + _this.optionValue + '@'
										}
										var sourceFieldCname;
										if (!isNaN(parseInt(model)) && _this.cFieldOptions.length > 0) {
											_this.chinaFieldName = _this.cFieldOptions[parseInt(model)].value
											sourceFieldCname = _this.cFieldOptions[parseInt(model)].value;
											_this.$refs.reformSet.formModel.sourceFieldCname = sourceFieldCname;
											_this.$refs.reformSet.formModel.sourceFieldEname = _this.eFieldOptions[parseInt(model)].value;
											console.log(_this.$refs.reformSet.formModel.sourceFieldEname);
										}

										//_this.$refs.reformSet.formModel.sourceFieldCname = _this.chinaFieldName;
										//_this.$refs.reformSet.formModel.aliasName = '@' + _this.optionValue + '@'
									}
								},
								{ field: 'sourceFieldCname', label: '源字段中文名', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
								// {
								// 	field: 'keywordSource', label: '关键字来源', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'ACTIVITY_CORE_TYPE', change: function (model) {
								// 		var _this = _self;
								// 		if (!isNaN(parseInt(model))) {
								// 			if (parseInt(model) == 0) {
								// 				_this.$refs.reformSet.formModel.keywordConnect = 'PRODUCT_ID';
								// 			}
								// 			if (parseInt(model) == 1) {
								// 				_this.$refs.reformSet.formModel.keywordConnect = 'CUST_ID';
								// 			}
								// 		}
								// 	}
								// },
								{
									field: 'keywordSource', label: '关键字来源', rules: [{ required: true, message: '必填项', trigger: 'blur' }], type: 'select', dataCode: 'ACTIVITY_CORE_TYPE'
								},
								//{ field: 'keywordSource', label: '关键字来源', rules: [{ required: true, message: '必填项', trigger: 'blur' }], value: '表', disabled: true },
								{ field: 'keywordConnect', label: '关联关键字', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
								//{ field: 'adescribe', label: '描述', rules: [{ required: true, message: '必填项', trigger: 'blur' }] },
								{ field: 'aliasName', label: '别名', rules: [{ required: true, message: '必填项', trigger: 'blur' }] }
							]
						},
						{
							columnCount: 1,
							fields: [
								{ field: 'adescribe', label: '描述', type: 'textarea', rows: 4, rules: [{ required: true, message: '必填项', trigger: 'blur' }] }
							]
						},
					],
					// 详情界面
					updateFieldsInfo: [
						{
							columnCount: 1,
							fields: []
						},
						{
							columnCount: 2,
							fields: [
								{ field: 'sourceTabEname', label: '源表英文名' },
								{ field: 'sourceTabCname', label: '源表中文名' },
								{ field: 'sourceFieldEname', label: '源字段英文名' },
								{ field: 'sourceFieldCname', label: '源字段中文名' },
								{ field: 'keywordSource', label: '关键字来源', dataCode: 'ACTIVITY_CORE_TYPE' },
								{ field: 'keywordConnect', label: '关联关键字', disabled: true },
								// { field: 'adescribe', label: '描述' },
								{ field: 'aliasName', label: '别名' }
							]
						},
						{
							columnCount: 1,
							fields: [
								{ field: 'adescribe', label: '描述', type: 'textarea', rows: 4 }
							]
						}
					],
					// 新增保存
					addButtons: [
						{
							label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
								_self.$refs.reformAdd.resetFields();
								_self.dialogVisibleAdd = false;
							}
						},
						{
							label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
								var validate = false;
								_self.$refs.reformAdd.validate(function (valid) {
									validate = valid;
								});
								if (!validate) {
									return;
								}
								if (model.aliasName[0] != '@' || model.aliasName[model.aliasName.length - 1] != '@') {
									_self.$message('别名必须以@开头,以@结尾');
								} else {
									if (!isNaN(parseInt(model.sourceTabEname)) && !isNaN(parseInt(model.sourceFieldEname))) {
										var num = parseInt(model.sourceTabEname);
										model.sourceTabEname = _self.eNameOptions[parseInt(model.sourceTabEname)].value;
										//model.sourceTabCname = _self.cNameOptions[num].value;
										model.sourceFieldEname = _self.eFieldOptions[parseInt(model.sourceFieldEname)].value;

										//model.sourceFieldCname = _self.cFieldOptions[num].value;
									}
									//model.keywordConnect = _self.eFieldOptions[parseInt(model.keywordConnect)].value;
									yufp.service.request({
										method: 'POST',
										url: backend.adminService + '/api/cmfrcmodelkeyword/addmodelkeyword',
										data: model,
										callback: function (code, message, response) {
											if (code == 0 && response.code == 0) {
												_self.$refs.reftable.remoteData();
												_self.$message('操作成功');
												_self.$refs.reformAdd.resetFields();
												_self.dialogVisibleAdd = false;
											} else {
												_self.$message({ message: response.message, type: 'warning' });
											}
										}
									});
								}

							}
						}
					],
					// 修改保存
					updateButtons: [
						{
							label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
								_self.dialogVisibleSet = false;
							}
						},
						{
							label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
								var validate = false;
								_self.$refs.reformSet.validate(function (valid) {
									validate = valid;
								});
								if (!validate) {
									return;
								}
								if (model.aliasName[0] != '@' || model.aliasName[model.aliasName.length - 1] != '@') {
									_self.$message('别名必须以@开头，以@结尾');
								} else {
									console.log("model.sourceFieldEname--->", model.sourceFieldEname);
									if (!isNaN(parseInt(model.sourceTabEname))) {
										model.sourceTabEname = _self.eNameOptions[parseInt(model.sourceTabEname)].value;
										//model.sourceFieldEname = _self.eFieldOptions[parseInt(model.sourceFieldEname)].value;
										console.log("model.sourceFieldEname<-----", model.sourceFieldEname);
									}
									yufp.service.request({
										method: 'POST',
										url: backend.adminService + '/api/cmfrcmodelkeyword/setmodelkeyword',
										data: model,
										callback: function (code, message, response) {
											if (code == 0 && response.code == 0) {
												_self.$refs.reformSet.resetFields();
												_self.$refs.reftable.remoteData();
												_self.$message('操作成功');
												_self.dialogVisibleSet = false;
											} else {
												_self.$message({ message: response.message, type: 'warning' });
											}
										}
									});
								}
							}
						}
					],
					// 详情保存
					infoButtons: [
						{
							label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
								_self.dialogVisibleInfo = false;
							}
						},
						{
							label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
							}
						}
					],
					height: yufp.frame.size().height - 103,
					dialogVisibleAdd: false,
					dialogVisibleSet: false,
					dialogVisibleInfo: false,
					formDisabled: false,
					viewType: 'DETAIL',
					viewTitle: yufp.lookup.find('CRUD_TYPE', false)
				}
			},
			mounted:function() {
				var _this = this;
				this.$nextTick(function() {
					yufp.clone(eNameOptions, _this.eNameOptions)
				})
			},
			methods: {
				handleAddClose: function() {
					this.$refs.reformAdd.resetFields();
					this.dialogVisibleAdd = false;
				},
				// 向select控件注入数据
				selectInput: function () {
					var _self = this;
					yufp.service.request({
						method: 'GET',
						url: backend.adminService + '/api/cmfrcmodelkeyword/gettabename',
						callback: function (code, message, response) {
							if (code == 0) {
								for (var i = 0; i < response.data.length; i++) {
									eNameOptions[i] = new Object();
									eNameOptions[i].key = i.toString();
									eNameOptions[i].value = response.data[i].sourceTabEname;
								}
								_self.updateFieldsAdd[0].fields[0].options = eNameOptions;
								// _self.updateFieldsSet[0].fields[0].options = eNameOptions;
							}
						}
					});
				},
				/**
				* @param viewType 表单类型
				* @param editable 可编辑,默认false
				*/
				switchStatus: function (viewType, editable) {
					var _self = this;
					_self.viewType = viewType;
					// _self.updateButtons[0].hidden = !editable;
					_self.infoButtons[1].hidden = !editable;
					_self.formDisabled = !editable;
				},
				addFn: function () {
					var _self = this;

					_self.switchStatus('ADD', true);
					_self.dialogVisibleAdd = true;
					_self.$nextTick(function () {
						_self.$refs.reformAdd.resetFields();

					});
				},
				modifyFn: function () {
					if (this.$refs.reftable.selections.length != 1) {
						this.$message({ message: '请先选择一条记录', type: 'warning' });
						return;
					}
					this.switchStatus('EDIT', true);
					this.dialogVisibleSet = true;
					this.$nextTick(function () {
						var obj = this.$refs.reftable.selections[0];
						yufp.extend(this.$refs.reformSet.formModel, obj);


					});
				},
				infoFn: function () {
					if (this.$refs.reftable.selections.length != 1) {
						this.$message({ message: '请先选择一条记录', type: 'warning' });
						return;
					}
					this.switchStatus('DETAIL', false);
					this.dialogVisibleInfo = true;
					this.$nextTick(function () {
						yufp.extend(this.$refs.reformInfo.formModel, this.$refs.reftable.selections[0]);
					});
				},
				deleteFn: function () {
					var _self = this;
					var selection = {};
					if (_self.$refs.reftable.selections.length < 1) {
						_self.$message({ message: '请先选择一条记录', type: 'warning' });
						return;
					}
					_self.$confirm('确认删除?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(function () {
						// 设置ids
						var arr = [];
						for (var i = 0; i < _self.$refs.reftable.selections.length; i++) {
							arr[i] = _self.$refs.reftable.selections[i].id;
						}
						selection.id = arr.join(',');
						yufp.service.request({
							method: 'POST',
							url: backend.adminService + '/api/cmfrcmodelkeyword/delmodelkeyword',
							data: selection,
							callback: function (code, message, response) {
								if (code == 0) {
									_self.$refs.reftable.remoteData();
									_self.$message('操作成功');
								}
							}
						});
					});
				}
			}
		});
	};
});