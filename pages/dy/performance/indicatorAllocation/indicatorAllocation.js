/**
 * @created by 冉珣 on 2021-10-27 16:42:37
 * @updated by
 * @description 指标分配
 */
define(function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    list: [],
                    title: '',
                    personList: [],
                    triumphParams: {
                        triumphYear: ''
                    },
                    crmTriuVOList: [],
                    crmFYyTriumphVOList: [],
                    leftModifyList: [],
                    rightModifyList: [],
                    baseUrl: '/api/acrmfcmcustmgrperf',
                    roleCode: '',
                    currentYear: '',
                    currentAmount: 0,
                    changedAmount: 0,
                    unitName: '',
                    tempLeftData: {}
                };
            },
            created: function() {
                this.currentYear = new Date().getFullYear();
                this.triumphParams.triumphYear = this.currentYear.toString();
                this.getCurrentRoleCode();
                this.getAllocateList();
            },
            methods: {
                getCurrentRoleCode: function() {
                    var roles = yufp.session.roles;
                    var selectRoleId = yufp.sessionStorage.get('selectRole');
                    for (var i = 0; i < roles.length; i++) {
                        if (roles[i].id === selectRoleId) {
                            this.roleCode = roles[i].code;
                        }
                    }
                },
                canAllocate: function() {
                    var flag = false;
                    var roles = 'R006,R007,R008,R009,R010,R011,R012,R001';
                    if (roles.indexOf(this.roleCode) != -1 && Number(this.triumphParams.triumphYear) >= this.currentYear) {
                        flag = true;
                    }
                    return flag;
                },
                /**
                 * @param obj 若有参数obj代表为点击分配查询右边列表数据
                 */
                getAllocateList: function(obj) {
                    var _this = this;
                    var params = {};
                    yufp.extend(params, this.triumphParams);
                    if (obj) {
                        params.triumphId = obj.triumphId,
                            params.triumphLine = obj.triumphLine;
                        _this.tempLeftData = obj;
                    }
                    yufp.service.request({
                        url: _this.baseUrl + '/triumphlist',
                        method: 'GET',
                        data: {
                            condition: JSON.stringify(params)
                        },
                        callback: function(code, message, response) {
                            var data = response.data;
                            if (code === 0) {
                                if (obj) {
                                    _this.personList = data.crmTriuVOList;
                                    yufp.clone(data.crmTriuVOList, _this.crmTriuVOList); // 备份
                                    for (var i = 0; i < _this.personList.length; i++) {
                                        _this.personList[i].isShow = true;
                                    }
                                } else {
                                    _this.list = data.crmFYyTriumphVOList;
                                    yufp.clone(data.crmFYyTriumphVOList, _this.crmFYyTriumphVOList);
                                    for (var i = 0; i < _this.list.length; i++) {
                                        _this.list[i].isShow = true;
                                        // _this.list[i].amount = Number(_this.list[i].amount);
                                        _this.list[i].unit = _this.returnUnitName(_this.list[i].triumphName);
                                    }
                                }
                            }
                        }
                    });
                },
                returnUnitName: function(name) {
                    var unitName = '';
                    if (name.indexOf('数') === -1) {
                        unitName = '元';
                    }
                    if (name.indexOf('笔数') != -1) {
                        unitName = '笔';
                    }
                    if (name.indexOf('户数') != -1) {
                        unitName = '户';
                    }
                    return unitName;
                },
                handleYearChange: function() {
                    this.getAllocateList();
                },
                /**
                 * 存储要提交的数据
                 * @param data 需要处理的数据
                 * @param propName 作为对比的数组名称
                 * @param conditionName 需要作为判断的条件属性名称
                 * @param result 最要存储最终结果的数组名称
                 */
                pushModifyData: function(data, propName, conditionName, result) {
                    var list = this[propName];
                    if (conditionName === 'targetId') {
                        data.triumphId = this.tempLeftData.triumphId;
                        data.triumphName = this.tempLeftData.triumphName;
                        data.triumphLine = this.tempLeftData.triumphLine;
                        data.triumphYear = this.tempLeftData.triumphYear;
                        data.triumphLevel = Number(this.tempLeftData.triumphLevel) + 1;
                    }
                    list.forEach(function(item, index) {
                        if (item[conditionName] === data[conditionName] && data.amount !== item.amount) {
                            result.push(data);
                        }
                    });
                },
                /**
                 * 删除要提交的某项数据
                 * @param data 需要处理的数据
                 * @param propName 作为对比的数组名称
                 * @param conditionName 需要作为判断的条件属性名称
                 * @param result 最要存储最终结果的数组名称
                 */
                spliceModifyData: function(data, conditionName, result) {
                    result.forEach(function(item, index) {
                        if (item[conditionName] === data[conditionName]) {
                            result.splice(index, 1);
                        }
                    });
                },
                // 编辑数额
                changeCount: function(data) {
                    if (this.canAllocate()) {
                        var _this = this;
                        data.isShow = false;
                        _this.spliceModifyData(data, 'triumphId', _this.leftModifyList);
                        setTimeout(function() {
                            _this.$refs['countInput-' + data.triumphId].focus();
                        }, 0);
                    }
                },
                validAmount: function(amount) {
                    var isPass = true;
                    yufp.validator.moneyFormat(null, amount, function(data) {
                        isPass = !data;
                    });
                    return isPass;
                },
                // 左边输入框数据修改
                handleLeftCountBlur: function(data) {
                    if (!this.validAmount(data.amount)) {
                        data.amount = '';
                        this.$message.warning('请输入正确的数值');
                        return;
                    }
                    data.isShow = true;
                    if (!data.amount) {
                        data.amount = '0';
                    }
                    this.currentAmount = data.amount;
                    this.pushModifyData(data, 'crmFYyTriumphVOList', 'triumphId', this.leftModifyList);
                },
                // 分配
                allocate: function(data) {
                    if (data.amount == '0') {
                        this.$message.warning('分配指标值为0，不能分配');
                    } else {
                        this.title = data.triumphName;
                        this.currentAmount = data.amount;
                        this.unitName = data.unit;
                        this.getAllocateList(data);
                    }
                },
                changeAimCount: function(data) {
                    var _this = this;
                    data.isShow = false;
                    _this.spliceModifyData(data, 'targetId', _this.rightModifyList);
                    setTimeout(function() {
                        _this.$nextTick(function() {
                            _this.$refs['aimCountInput' + data.targetId].focus();
                        });
                    }, 0);
                },
                // 右边输入框数据修改
                handleRightCountBlur: function(data) {
                    if (!this.validAmount(data.amount)) {
                        data.amount = '';
                        this.$message.warning('请输入正确的数值');
                        return;
                    }
                    if (parseFloat(data.amount) < 0) {
                        data.amount = '';
                        this.$message.warning('数值不能为负数');
                        return;
                    }
                    data.isShow = true;
                    if (data.amount == '') {
                        data.amount = null;
                    }
                    this.pushModifyData(data, 'crmTriuVOList', 'targetId', this.rightModifyList);
                },
                changeMoneyFomate: function(money) {
                    return typeof money === 'string' ? money.replace(',', '') : money;
                },
                // 下发
                saveFn: function() {
                    var _this = this;
                    if (!_this.leftModifyList.length && !_this.rightModifyList.length) {
                        _this.$message.warning('无改动数据，无需下发');
                        return false;
                    }
                    if (_this.changeMoneyFomate(_this.currentAmount) < _this.changeMoneyFomate(_this.changedAmount)) {
                        _this.$message.warning('总计目标超过可分配数额' + _this.currentAmount + ',请重新分配');
                        return false;
                    }
                    _this.$confirm('确定修改了吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        callback: function(action) {
                            if (action === 'confirm') {
                                _this.postData();
                            }
                        }
                    });
                },
                postData: function() {
                    var _this = this;
                    var params = {};
                    params.crmFYyTriumphVOList = _this.leftModifyList;
                    params.crmFYyTriumphHVOList = _this.rightModifyList;
                    yufp.service.request({
                        method: 'POST',
                        url: _this.baseUrl + '/addtriumph',
                        data: params,
                        callback: function(code, message, response) {
                            if (code === 0) {
                                _this.$message.success('操作成功');
                                _this.getAllocateList();
                                yufp.util.butLogInfo(hashCode, '指标分配', '下发');
                            } else {
                                _this.$message.warning(message);
                            }
                        }
                    });
                },
                // 取消
                cancelFn: function() {
                    this.title = '';
                    this.personList = [];
                    this.leftModifyList = this.rightModifyList = [];
                    this.getAllocateList();
                },


                getSummaries: function(param) {
                    var columns = param.columns;
                    var data = param.data;
                    var sums = [];
                    var _this = this;
                    columns.forEach(function(column, index) {
                        if (index === 0) {
                            sums[index] = '合计';
                            return;
                        }
                        var values = data.map(function(item) {
                            return Number(item[column.property]);
                        });
                        if (!values.every(function(value) {
                                return isNaN(value);
                            })) {
                            sums[index] = values.reduce(function(prev, curr) {
                                var value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                            _this.changedAmount = sums[index];
                            sums[index] = '￥' + yufp.util.moneyFormatter(sums[index]);
                        } else {
                            sums[index] = 'N/A';
                        }
                    });
                    return sums;
                }
            }
        });
    };

    /**
     * 页面传递消息处理
     * @param type 消息类型
     * @param message 消息内容
     */
    exports.onmessage = function(type, message) {};

    /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
    exports.destroy = function(id, cite) {};
});