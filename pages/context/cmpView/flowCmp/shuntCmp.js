/**
 * @created by helin3 on 2018/07/18.
 * @description 查询
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
		var options3 = [
						{key: '选项1',value: '排序编号'},
						{key: '选项2',value: '客户编号'},
						{key: '选项3',value: '风险评分'}
					];
		yufp.custom.vue({
			el: cite.el,
			//特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
			ncmpobj: data.ncmpobj,
			data: function() {
				var _self = this;
				return {
					activeNames: ['1', '2', '3'],
					classTemp: {
						name: '',
						remark: ''
					},
					options1:[
						{input:'客户一'}
					],
					options2: [
						{sort: '排序编号',cust: '客户编号',risk:'风险评分'}
					],
					options3: options3,
					options4:[
						{group: '客户组一',where: 'where number%4=0'},
						{group: '客户组二',where: 'where number%4=1'},
						{group: '客户组三',where: 'where number%4=2'}
					],
					options5:[
						{output:'客户组一'},
						{output:'客户组二'},
						{output:'客户组三'}
					],
			      editFields: [{
			        columnCount: 3,
			        fields: [{
			          field: 'name', label: '分组名称', placeholder: '5到25个字符',
			          type: 'input', rules: [{ required: true, message: '请输入分组名称', trigger: 'blur' }]
			        },
			        { label: '客户属性', field: 'paramType', type: 'select', options: options3 },
			        {
			          field: 'where', label: '条件', placeholder: '5到25个字符',
			          type: 'input', rules: [{ required: true, message: '请输入条件', trigger: 'blur' }]
			        }]
			      }]
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