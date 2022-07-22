/**
 * @created by yangxiao2 on 2018/11/19.
 * @description 产品目标客户
 */
define([
    './custom/widgets/js/yufpProdSelector.js',
    './custom/widgets/js/yufpCustGroup.js'
], function (require, exports) {
	/**
	 * 页面加载完成时触发
	 * @param hashCode 路由ID
	 * @param data 传递数据对象
	 * @param cite 页面站点信息
	 */
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE');
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
                    load: false,
                    inputTab: '1',
                    customIs: 'yufp-custGroup',
                    formId: '',
                    loadData: [],
                    tableColumns: [
                        { label: '产品编号', prop: 'productId', width: '120' },
                        { label: '产品名称', prop: 'prodName' },
                        { label: '客户编号', prop: 'custId', width: '120' },
                        { label: '客户名称', prop: 'custName' },
                        { label: '所在客户群编号', prop: 'custGroupId', width: '120' },
                        { label: '所在客户群名称', prop: 'custGroupName' },
                        { label: '购买概率', prop: 'buyRate', width: '100' }
                    ],
                    // 产品选择
                    prodFields: [
                        {
                            columnCount: 1,
                            fields: [
                                {
                                    field: 'productId',
                                    label: '产品',
                                    type: 'custom',
                                    is: 'yufp-prod-selector',
                                    param: {
                                        needDpt: true,
                                        tabCheckbox: true,
                                        dataUrl: backend.adminService + "/api/cmfrcproductmanager/list"
                                    },
                                },
                            ]
                        }
                    ],
                    // 产品保存
                    prodButtons: [
                        {
                            label: '添加', type: 'primary', icon: 'plus', click: function (model) {
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.adminService + '/api/cmfrcproductmanager/getprodbyid',
                                    data: model,
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            _self.model = response.data;
                                            var value = {
                                                row: _self.times,
                                                productId: _self.model[0].productId,
                                                prodName: _self.model[0].prodName,
                                                catlName: _self.model[0].catlName,
                                                customName: '',
                                                customId: '',
                                            };
                                            _self.prodTable.push(value);
                                            _self.times++;
                                            // 刷新输出
                                            var ids = [];
                                            var selectFlag = true;
                                            for (var i = 0; i < _self.prodTable.length; i++) {
                                                ids[i] = new Object();
                                                ids[i].prod = _self.prodTable[i].productId;
                                                ids[i].cust = _self.prodTable[i].customId;
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
                        },
                        {
                            label: '移除', type: 'primary', icon: 'yx-bin', click: function (model) {
                                // 反向删除多个元素
                                var select = _self.$refs.optable.selections;
                                for (var i = _self.prodTable.length - 1; i >= 0; i--) {
                                    for (var j = 0; j < select.length; j++) {
                                        if (_self.prodTable[i] != undefined) {
                                            if (_self.prodTable[i].row == select[j].row) {
                                                _self.prodTable.splice(select[j].row, 1);
                                            }
                                        }
                                    }
                                }
                                // 重置
                                for (var i = 0; i < _self.prodTable.length; i++) {
                                    _self.prodTable[i].row = i;
                                }
                                _self.times = _self.prodTable.length;
                                // 刷新输出
                                var ids = [];
                                var selectFlag = true;
                                for (var i = 0; i < _self.prodTable.length; i++) {
                                    ids[i] = new Object();
                                    ids[i].prod = _self.prodTable[i].productId;
                                    ids[i].cust = _self.prodTable[i].customId;
                                }
                                if (ids.length == 0) {
                                    selectFlag = false;
                                }
                                var param = { condition: JSON.stringify({ ids: ids, flag: selectFlag }) };
                                _self.$refs.reftable.remoteData(param);
                            }
                        }
                    ],
                    // 客户群选择
                    custFields: [
                        {
                            columnCount: 1,
                            fields: [
                                {
                                    field: 'customId',
                                    label: '客户群',
                                    type: 'custom',
                                    is: 'yufp-custGroup'
                                },
                            ]
                        }
                    ],
                    // 客户群保存
                    custButtons: [
                        {
                            label: '导入客户群', type: 'primary', icon: 'plus', click: function (model) {
                                if (_self.$refs.optable.selections.length != 1) {
                                    _self.$message({ message: '请先选择一条记录', type: 'warning' });
                                    return;
                                }
                                var customName = _self.$refs.refformCust.$refs.customId[0].getRawValue();
                                _self.prodTable[_self.$refs.optable.selections[0].row].customName = customName;
                                _self.prodTable[_self.$refs.optable.selections[0].row].customId = model.customId;
                                _self.dialogVisibleCust = false;
                                // 刷新输出
                                var ids = [];
                                var selectFlag = true;
                                for (var i = 0; i < _self.prodTable.length; i++) {
                                    ids[i] = new Object();
                                    ids[i].prod = _self.prodTable[i].productId;
                                    ids[i].cust = _self.prodTable[i].customId;
                                }
                                if (ids.length == 0) {
                                    selectFlag = false;
                                }
                                var param = { condition: JSON.stringify({ ids: ids, flag: selectFlag }) };
                                _self.$refs.reftable.remoteData(param);
                            }
                        }
                    ],
                    dialogVisibleCust: false,
                    activeNames: ['1', '2', '3'],
                    prodTable: [],
                    custTable: []
                }
            },
            methods: {
                // 反显保存数据
                loadTableData: function(data) {
                    _self = this;
                    _self.loadData = data;
                },
                // 导入客户群
                editFn: function () {
                    if (this.$refs.optable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.dialogVisibleCust = true;
                },
                // 组件输出保存
                confirm: function () {
                    _self = this;
                    if (_self.$refs.reftable.data.length < 1) {
                        _self.$message({ message: '无输出产品', type: 'warning' });
                        return;
                    }
                    var arr = [];
                    var input = {};
                    for (var i = 0; i < _self.$refs.reftable.data.length; i++) {
                        arr[i] = _self.$refs.reftable.data[i].productId;
                    }
                    input.flag = 'custprod';
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
                                var operate = {}
                                for (var i = 0; i < _self.$refs.reftable.data.length; i++) {
                                    arr[i] = _self.$refs.reftable.data[i].custGroupId;
                                }
                                operate.flag = 'custprod';
                                operate.formOperationVal = arr.join(',');
                                operate.formId = response.message;
                                // 保存操作参数
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.adminService + "/api/cmfrcnodepresent/insertlist",
                                    data: operate,
                                    callback: function (code, message, response) {
                                        if (code == 0 && response.code == 0) {
                                            _self.formId = response.message;
                                            var output = {};
                                            for (var i = 0; i < _self.$refs.reftable.data.length; i++) {
                                                arr[i] = _self.$refs.reftable.data[i].custId + '/' + _self.$refs.reftable.data[i].custName;
                                            }
                                            output.flag = 'custprod';
                                            output.formOutVal = arr.join(',');
                                            output.formId = response.message;
                                            // 保存输出参数
                                            yufp.service.request({
                                                method: 'POST',
                                                url: backend.adminService + "/api/cmfrcnodeoutput/insertlist",
                                                data: output,
                                                callback: function (code, message, response) {
                                                    if (code == 0 && response.code == 0) {
                                                        _self.formId = response.message;
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
                // 反显输入参数
                yufp.service.request({
                    method: 'POST',
                    url: backend.adminService + "/api/cmfrcnodeinput/list",
                    data: model,
                    callback: function (code, message, response) {
                        if (code == 0 && response.code == 0) {
                            // 节点不为空，则将该节点下的数据反显
                            if (response.data.length > 0) {
                                var model = {};
                                var productIdArr = response.data[0].formInVal.split(',');
                                var customIdArr = response.data[0].formOperationVal.split(',');
                                for (var i = 0; i < productIdArr.length; i++) {
                                    model.productId = productIdArr[i];
                                    yufp.service.request({
                                        method: 'POST',
                                        url: backend.adminService + '/api/cmfrcproductmanager/getprodbyid',
                                        data: model,
                                        callback: function (code, message, response) {
                                            if (code == 0) {
                                                _self.model = response.data;
                                                var value = {
                                                    row: _self.times,
                                                    productId: _self.model[0].productId,
                                                    prodName: _self.model[0].prodName,
                                                    catlName: _self.model[0].catlName,
                                                    customName: '',
                                                    customId: customIdArr[_self.times].substr(customIdArr[_self.times].length-4)
                                                };
                                                _self.prodTable.push(value);
                                                _self.times++;
                                            }
                                        }
                                    });
                                }
                                // 刷新输出
                                var ids = [];
                                var selectFlag = true;
                                for (var i = 0; i < productIdArr.length; i++) {
                                    ids[i] = new Object();
                                    ids[i].prod = productIdArr[i];
                                    ids[i].cust = customIdArr[i].substr(customIdArr[_self.times].length-4);
                                }
                                if (ids.length == 0) {
                                    selectFlag = false;
                                }
                                var param = { condition: JSON.stringify({ ids: ids, flag: selectFlag }) };
                                _self.$refs.reftable.remoteData(param);
                            }
                        }
                    }
                });
                // 反显客户群名称
                setTimeout(function () {
                    var select = _self.loadData;
                    for (i = 0; i < _self.prodTable.length; i++) {
                        for (var j = 0; j < select.length; j++) {
                            if (_self.prodTable[i].productId == select[j].productId) {
                                _self.prodTable[i].customName = select[j].custGroupName;
                                break;
                            }
                        }
                    }
                }, 2000);
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