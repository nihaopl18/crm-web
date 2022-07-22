/**
 * Created by yangxiao2 2018-10-16
 * 渠道营销模板关键字管理
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
						{ placeholder: '关怀标题', field: 'careName', type: 'input' },
						{ placeholder: '关怀类型', field: 'careType', type: 'select', dataCode: 'CARE_TYPE' },
						{ placeholder: '关怀等级', field: 'careLevel', type: 'select', dataCode: 'CARE_LEVEL' }
						// { placeholder: '关怀方式', field: 'careWay', type: 'input' }
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
						{ label: '关怀标题', prop: 'careName', width: '100' },
						{ label: '关怀类型', prop: 'careType', dataCode: 'CARE_TYPE', width: '90' },
						{ label: '关怀等级', prop: 'careLevel', dataCode: 'CARE_LEVEL', width: '70' },
						{ label: '关怀方式', prop: 'careWay', width: '150' },
						{ label: '关怀内容', prop: 'careContent', width: '200' },
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
									field: 'careName', label: '关怀标题', type: 'input',
									rules: [{ required: true, message: '必填项', trigger: 'blur' }] 
								},
								{ field: 'careType', label: '关怀类型', type: 'select', dataCode: 'CARE_TYPE' },
								{ field: 'careLevel', label: '关怀等级', type: 'select', dataCode: 'CARE_LEVEL' },
								{ field: 'careWay', label: '关怀方式', type: 'input' },
							]
						}, {
							columnCount: 1,
							fields: [
								{ field: 'careContent', label: '关怀内容', type: 'textarea', rows: 4, }
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
								if(_self.viewType == 'ADD') {
									// 新增
									yufp.service.request({
										method: 'POST',
										url: backend.adminService + '/api/cmfrccare/insertlist',
										data: model,
										callback: function (code, message, response) {
											if (code == 0) {
												_self.dialogVisible = false;
												_self.$message({ message: '新增成功' });
												_self.$refs.reftable.remoteData();
											}
										}
									});
								} else if(_self.viewType == 'EDIT') {
									// 更新模板
									yufp.service.request({
										method: 'POST',
										url: backend.adminService + '/api/cmfrccare/updatelist',
										data: model,
										callback: function (code, message, response) {
											if (code == 0) {
												_self.dialogVisible = false;
												_self.$message({ message: '修改成功' });
												_self.$refs.reftable.remoteData();
											}
										}
									});
								} else {
									_self.$message({message: '操作错误', type: 'warning' });
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
							arr[i] = _self.$refs.reftable.selections[i].careId;
						}
						selection.careId = arr.join(',');
						yufp.service.request({
							method: 'POST',
							url: backend.adminService + '/api/cmfrccare/deletelist',
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