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
					options3:[
						{field:'字段一'},
						{field:'字段二'},
						{field:'字段三'}
					],
					options4:[
						{field: '字段排序优先'},
						{field: '选择优先字段'},
						{field: '排序规则'}
					],
					options5:[
						{output:'集合一'},
						{output:'集合二'},
						{output:'集合三'}
					]
				}
			},
			methods: {
				close: function() {
					this.$options.ncmpobj.close();
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