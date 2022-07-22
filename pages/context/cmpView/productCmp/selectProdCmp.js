/**
 * @created by yangxiao2 on 2018/11/13.
 * @description 查询
 */
define([
    './custom/widgets/js/yufpProdCatlTree.js'
], function (require, exports) {
	/**
	 * 页面加载完成时触发
	 * @param hashCode 路由ID
	 * @param data 传递数据对象
	 * @param cite 页面站点信息
	 */
    exports.ready = function (hashCode, data, cite) {
        yufp.custom.vue({
            el: cite.el,
            //特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
            ncmpobj: data.ncmpobj,
            data: function () {
                var _self = this;
                return {
                    queryFields: [
                        { placeholder: '产品编号', field: 'productId', type: 'input', width: '60' },
                        { placeholder: '产品名称', field: 'prodName', type: 'input', width: '60' },
                        { placeholder: '产品发布日期', field: 'prodStartDate', type: 'date' },
                        { placeholder: '产品截止日期', field: 'prodEndDate', type: 'date' },
                        { placeholder: '是否在售', field: 'prodState', type: 'select', dataCode: 'PROD_STATE', width: '100' }
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
                    // 产品查询表格栏位
                    tableColumns: [
                        { label: '产品编号', prop: 'productId' },
                        { label: '产品名称', prop: 'prodName', width: '200' },
                        { label: '组合产品', prop: 'isCombination', width: '80', dataCode: 'IS_COMBINATION' },
                        { label: '产品分类名称', prop: 'catlName', width: '120' },
                        { label: '产品发布日期', prop: 'prodStartDate', width: '100' },
                        { label: '产品截止日期', prop: 'prodEndDate', width: '100' },
                        { label: '利率（%）', prop: 'rate', width: '80' },
                        { label: '费率（%）', prop: 'costRate', width: '80' },
                        { label: '期限', prop: 'limitTime', width: '50' },
                        { label: '是否在售', prop: 'prodState', width: '80' },
                        { label: '目标客户描述', prop: 'objCustDisc', width: '200' },
                        { label: '产品特点', prop: 'prodCharact', width: '200' },
                        { label: '风险等级', prop: 'riskLevel', width: '80', dataCode: 'RISK_LEVEL' },
                        { label: '风险提示描述', prop: 'dangerDisc', width: '200' },
                        { label: '担保要求描述', prop: 'assureDisc', width: '200' },
                        { label: '产品描述', prop: 'prodDesc', width: '200' },
                        { label: '其他说明', prop: 'otherInfo', width: '200' }
                    ],
                    // 产品选取表格栏位
                    tableColumnSelect: [
                        { label: '产品编号', prop: 'productId' },
                        { label: '产品名称', prop: 'prodName', width: '200' },
                        { label: '组合产品', prop: 'isCombination', width: '80', dataCode: 'IS_COMBINATION' },
                        { label: '产品分类名称', prop: 'catlName', width: '120' },
                        { label: '产品发布日期', prop: 'prodStartDate', width: '100' },
                        { label: '产品截止日期', prop: 'prodEndDate', width: '100' },
                        { label: '利率（%）', prop: 'rate', width: '80' },
                        { label: '费率（%）', prop: 'costRate', width: '80' },
                        { label: '期限', prop: 'limitTime', width: '50' },
                        { label: '是否在售', prop: 'prodState', width: '80' },
                        { label: '目标客户描述', prop: 'objCustDisc', width: '200' },
                        { label: '产品特点', prop: 'prodCharact', width: '200' },
                        { label: '风险等级', prop: 'riskLevel', width: '80', dataCode: 'RISK_LEVEL' },
                        { label: '风险提示描述', prop: 'dangerDisc', width: '200' },
                        { label: '担保要求描述', prop: 'assureDisc', width: '200' },
                        { label: '产品描述', prop: 'prodDesc', width: '200' },
                        { label: '其他说明', prop: 'otherInfo', width: '200' }
                    ],
                    async: false,
                    height: yufp.frame.size().height - 103,
                    times: 0
                }
            },
            methods: {
                // 产品分类树点击事件
                nodeClickFn: function (nodeData, node, self) {
                    _self = this;
                    // 查询产品分类下所有产品
                    var param = {
                        condition: JSON.stringify(
                            { catlCode: nodeData.catlCode }
                        )
                    };
                    _self.$refs.reftable.remoteData(param);
                },
                // 选取产品
                selectFn: function () { 
                    if (this.$refs.reftable.selections.length != 1) {
						this.$message({ message: '请先选择一条记录', type: 'warning' });
						return;
                    }
                    this.$refs.reftableSelect.selections[this.times] = this.$refs.reftable.selections[0];
                    this.times++;
                },
                close: function () {
                    this.$options.ncmpobj.close();
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
    }
});