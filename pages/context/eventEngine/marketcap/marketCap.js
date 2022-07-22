/**
 * Created by yangxiao2 2018-12-17
 * 清单整合封顶参数配置
 */
define(['./custom/widgets/js/yufpProdCatlTree.js'],function (require, exports) {
	// page加载完成后调用ready方法
	exports.ready = function (hashCode, data, cite) {
		yufp.custom.vue({
			el: cite.el,
			data: function () {
				var _self = this;
				return {
					queryFields: [
						{ placeholder: '产品类别', field: 'catlCode', type: 'custom', is: 'yufp-prod-tree' }
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
						{ label: '产品类别', prop: 'catlName' },
						{ label: '周期天数', prop: 'cycleTime' },
						{ label: '封顶次数', prop: 'capTime' }
					],
					// 维护界面
					updateFields: [
						{
							columnCount: 1,
							fields: [
								{
									field: 'catlCode', label: '产品类别', type: 'custom', is: 'yufp-prod-tree',
									rules: [{ required: true, message: '必填项' }]
                                }
							]
						},
						{
							columnCount: 2,
							fields: [
                                {
									field: 'cycleTime', label: '周期天数', type: 'input',
									rules: [{ required: true, message: '必填项' }]
                                },
                                {
									field: 'capTime', label: '封顶次数', type: 'input',
									rules: [{ required: true, message: '必填项' }]
								}
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
										url: backend.adminService + '/api/cmfrcmarketcap/insertlist',
										data: model,
										callback: function (code, message, response) {
											if (code == 0 && response.code == 0) {
												_self.dialogVisible = false;
												_self.$message({ message: response.message });
												_self.$refs.reftable.remoteData();
											} else {
												_self.$message({ message: response.message, type: 'warning' });
											}
										}
									});
								} else if (_self.viewType == 'EDIT') {
									// 更新
									yufp.service.request({
										method: 'POST',
										url: backend.adminService + '/api/cmfrcmarketcap/updatelist',
										data: model,
										callback: function (code, message, response) {
											if (code == 0 && response.code == 0) {
												_self.dialogVisible = false;
												_self.$message({ message: response.message });
												_self.$refs.reftable.remoteData();
											} else {
												_self.$message({ message: response.message, type: 'warning' });
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
						// 将分类置灰
						this.$refs.reform.switch('catlCode', 'disabled', true);
					});
				},
				deleteFn: function () {
					var _self = this;
					if (_self.$refs.reftable.selections.length < 1) {
						_self.$message({ message: '请先选择一条记录', type: 'warning' });
						return;
					}
					var model = _self.$refs.reftable.selections[0];
					_self.$confirm('确认删除?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(function () {
						yufp.service.request({
							method: 'POST',
							url: backend.adminService + '/api/cmfrcmarketcap/deletelist',
							data: model,
							callback: function (code, message, response) {
								if (code == 0 && response.code == 0) {
									_self.$message({ message: response.message });
									_self.$refs.reftable.remoteData();
								} else {
									_self.$message({ message: response.message, type: 'warning' });
								}
							}
						});
					});
				},
			}
		});
	};
});