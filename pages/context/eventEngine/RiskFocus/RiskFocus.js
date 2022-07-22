/**
 * Created by yangxiao2 2018-11-07
 * 风险关注管理
 */
define(function (require, exports) {
	// page加载完成后调用ready方法
	exports.ready = function (hashCode, data, cite) {
		yufp.custom.vue({
			el: cite.el,
			data: function () {
				var _self = this;
				return {
					queryFields: [
						{ placeholder: '风险名称', field: 'riskName', type: 'input' },
						{ placeholder: '风险类型', field: 'riskType', type: 'select', dataCode: 'RISK_TYPE' },
						{ placeholder: '风险级别', field: 'riskLevel', type: 'select', dataCode: 'RISK-LEVEL' }
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
					tableColumns: [
						{ label: '风险名称', prop: 'riskName', width: '150' },
						{ label: '风险描述', prop: 'riskDescribe', width: '300' },
						{ label: '风险类型', prop: 'riskType', dataCode: 'RISK_TYPE', width: '90' },
						{ label: '风险级别', prop: 'riskLevel', dataCode: 'RISK-LEVEL', width: '70' },
						{ label: '预警方式', prop: 'riskWay', width: '90' },
						{ label: '创建人', prop: 'creatUserName', width: '90' },
						{ label: '创建时间', prop: 'creatDate', width: '90' },
						{ label: '最近维护人', prop: 'updataUserName', width: '90' },
						{ label: '最近维护时间', prop: 'updataDate', width: '98' }
					],
					// 维护界面
					updateFields: [
						{
							columnCount: 2,
							fields: [
								{
									field: 'riskName', label: '风险名称', type: 'input',
									rules: [{ required: true, message: '必填项', trigger: 'blur' }]
								},
								{ field: 'riskType', label: '风险类型', type: 'select', dataCode: 'RISK_TYPE' },
								{ field: 'riskLevel', label: '风险级别', type: 'select', dataCode: 'RISK-LEVEL' },
								{ field: 'riskWay', label: '预警方式', type: 'input' },
							]
						}, {
							columnCount: 1,
							fields: [
								{ field: 'riskDescribe', label: '风险描述', type: 'textarea', rows: 4 }
							]
						}
					],
					// 维护保存
					buttons: [
						{
							label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
								_self.dialogVisible = false;
							}
						},
						{
							label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
								var validate = false;
								_self.$refs.reform.validate(function (valid) {
									validate = valid;
								});
								if (!validate) {
									return;
								}
								// 判断操作类型
								if (_self.viewType == 'ADD') {
									// 新增
									yufp.service.request({
										method: 'POST',
										url: backend.adminService + '/api/cmfrcrisk/insertlist',
										data: model,
										callback: function (code, message, response) {
											if (code == 0) {
												_self.dialogVisible = false;
												_self.$message({ message: '新增成功' });
												_self.$refs.reftable.remoteData();
											}
										}
									});
								} else if (_self.viewType == 'EDIT') {
									// 更新
									yufp.service.request({
										method: 'POST',
										url: backend.adminService + '/api/cmfrcrisk/updatelist',
										data: model,
										callback: function (code, message, response) {
											if (code == 0) {
												_self.dialogVisible = false;
												_self.$message({ message: '更新成功' });
												_self.$refs.reftable.remoteData();
											}
										}
									});
								} else {
									_self.$message({ message: '操作错误', type: 'warning' });
									_self.dialogVisible = false;
								}
							}
						}
					],
					height: yufp.frame.size().height - 103,
					dialogVisible: false,
					formDisabled: false,
					viewType: 'DETAIL',
					viewTitle: yufp.lookup.find('CRUD_TYPE', false)
				}
			},
			methods: {
				/**
				* @param viewType 表单类型
				* @param editable 可编辑,默认false
				*/
				switchStatus: function (viewType, editable) {
					var _self = this;
					_self.dialogVisible = true;
					_self.viewType = viewType;
					_self.buttons[1].hidden = !editable;
					_self.formDisabled = !editable;
				},
				addFn: function () {
					var _self = this;
					_self.switchStatus('ADD', true);
					_self.$nextTick(function () {
						_self.$refs.reform.resetFields();
					});
				},
				modifyFn: function () {
					if (this.$refs.reftable.selections.length != 1) {
						this.$message({ message: '请先选择一条记录', type: 'warning' });
						return;
					}
					this.switchStatus('EDIT', true);
					this.$nextTick(function () {
						var obj = this.$refs.reftable.selections[0];
						yufp.extend(this.$refs.reform.formModel, obj);
					});
				},
				infoFn: function () {
					if (this.$refs.reftable.selections.length != 1) {
						this.$message({ message: '请先选择一条记录', type: 'warning' });
						return;
					}
					this.switchStatus('DETAIL', false);
					this.$nextTick(function () {
						yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
					});
				},
				deleteFn: function () {
					var _self = this;
					var selection = _self.$refs.reftable.selections[0];
					if (_self.$refs.reftable.selections.length < 1) {
						_self.$message({ message: '请先选择一条记录', type: 'warning' });
						return;
					}
					_self.$confirm('确认删除?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(function () {
						var arr = [];
						for (var i = 0; i < _self.$refs.reftable.selections.length; i++) {
							arr[i] = _self.$refs.reftable.selections[i].riskId;
						}
						selection.riskId = arr.join(',');
						yufp.service.request({
							method: 'POST',
							url: backend.adminService + '/api/cmfrcrisk/deletelist',
							data: selection,
							callback: function (code, message, response) {
								if (code == 0) {
									_self.dialogVisible = false;
									_self.$message({ message: '删除成功' });
									_self.$refs.reftable.remoteData();
								}
							}
						});
					});
				}
			}
		});
	};
});