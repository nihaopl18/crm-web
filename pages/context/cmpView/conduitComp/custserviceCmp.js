/**
 * 客户价值服务
 */
define(function(require, exports) {
	/**
	 * 页面加载完成时触发
	 * @param hashCode 路由ID
	 * @param data 传递数据对象
	 * @param cite 页面站点信息
	 */
	exports.ready = function(hashCode, data, cite) {
		yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE');
		yufp.custom.vue({
			el: cite.el,
			//特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
			ncmpobj: data.ncmpobj,
			data: function() {
				var _self = this;
				return {
					activeNames: ['1', '2', '3'],
					options1:[
						{input:'集合一'},
						{input:'集合二'}
					],
					options2: [
						{sort: '字段一',cust: '字段二',risk:'字段三'}
					],
					options4: [
						{field: '冰清心科技公司',field1:'个体工商户营业执照',field2:'12312322232'},
						{field: '微星科技股份有限公司',field1:'境内组织机构代码',field2:'CN0755019'},
						{field: '73825017X',field1:'境内居民身份证',field2:'231045645598'}
					],
					options5: [
						{output: '高净值客户'},
						{output: '低净值客户'}
					],
					options6:[
						{group: '高净值客户',where: '客户等级8/7/6'},
						{group: '低净值客户',where: '客户等级5/4/3/2/1'}
					],
					editFields: [{
			            columnCount: 2,
			            fields: [
			              {label: '服务器IP', field: 'ip', type: 'input'},
			              {label: '呼叫客户群选择', field: 'cust', type: 'input'},
			              {label: '端口', field: 'duank', type: 'input'},
			              {label: '对应产品集选择', field: 'prod', type: 'input'},
			              { label: '模板', field: 'muban', type: 'input'},
			              { label: '跟踪客户经理', field: 'menage', type: 'input'}
			            ]
			          }],
		          	/** 页面 提交、更新按钮 */
		          	buttons: [
			            {
			              label: '重置', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
			                _self.dialogVisible = false;
			              }
			            },
			            {
			              label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
			                var validate = false;
			                _self.$refs.refform.validate(function (valid) {
			                  validate = valid;
			                });
			                if (!validate) {
			                  return;
			                }
			                _self.dialogVisible = false;
			                //请调用服务进行后台保存
			              }
			            }
		          	]
				}
			},
			methods: {
				close: function() {
					this.$options.ncmpobj.close();
				},
				handleEdit: function(index, row) {
			    	console.log(index, row);
			    },
			    handleDelete: function(index, row) {
			        console.log(index, row);
			    }
			},
			destroyed: function() {
				console.log('yufp.custom.vue---query.js---destroyed');
			}
		});
	};

	/**
	 * 页面销毁时触发destroy方法
	 * @param id 路由ID
	 * @param cite 页面站点信息
	 */
	exports.destroy = function(id, cite) {
		console.log('exports.destroy---query.js---destroy');
	}
});