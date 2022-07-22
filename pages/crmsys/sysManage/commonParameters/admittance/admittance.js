/**
 * @created by  on 2019-1-15 10:42:22
 * @updated by
 * @description admittance
 */
define(function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        var conditionOption = ['21', '22', '23', '24', '25'];
        var conditionOption2 = ['11', '12', '13', '15', '16', '17', '18'];
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                return {
                    conditions: conditionOption,
                    checkAll: [],
                    checkConditions: ['22', '24'],
                    input13: '',
                    input15: '',
                    input16: '',
                    input18: '',
                    input23: '',
                    input24: '',
                    input25: '',
                    conditions2: conditionOption2,
                    checkAll2: [],
                    checkConditions2: ['12']
                };
            },
            methods: {
                handleCheckAllChange: function(val) {
                    this.checkConditions = val ? conditionOption : [];
                },
                handleChecked: function(value) {
                    // var checkCount = value.length;
                    var choseRule = value.filter(function(val) {
                        return val != undefined || val != '';
                    });
                    this.checkAll = choseRule.sort().toString() == this.conditions.toString();
                },
                handleCheckAllChange2: function(val) {
                    this.checkConditions2 = val ? conditionOption2 : [];
                },
                handleChecked2: function(value) {
                    // var checkCount = value.length;
                    var choseRule = value.filter(function(val) {
                        return val != undefined || val != '';
                    });
                    this.checkAll2 = choseRule.sort().toString() == this.conditions2.toString();
                    //      this.isIndeterminate2 = checkCount > 0 && checkCount < this.conditions2.length;
                },
                saveFn: function() {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: backend.remindService + '/api/admttancetarget/save',
                        data: {
                            condition: JSON.stringify({
                                orgArr: _this.checkConditions,
                                perArr: _this.checkConditions2,
                                target13: _this.input13,
                                target15: _this.input15,
                                target16: _this.input16,
                                target18: _this.input18,
                                target23: _this.input23,
                                target24: _this.input24,
                                target25: _this.input25,
                                lastChgUserId: yufp.session.userCode,
                                lastChgUserName: yufp.session.userName
                            })
                        },
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.$message('保存成功');
                                yufp.util.butLogInfo(hashCode, '客户准入规则', '保存');
                            } else {
                                _this.$message.error('保存失败');
                            }
                        }
                    });
                }
            },
            mounted: function() {
                var _this = this;
                yufp.service.request({
                    method: 'GET',
                    url: backend.remindService + '/api/admttancetarget/queryList',
                    data: null,
                    callback: function(code, message, response) {
                        if (code == 0) {
                            var arr = response.data;
                            var perArr = new Array(6);
                            var orgArr = new Array(4);
                            for (var item in arr) {
                                var str = arr[item].targetId.substring(0, 1);
                                if (str.match('1')) {
                                    perArr.push(arr[item].targetId);
                                } else if (str.match('2')) {
                                    orgArr.push(arr[item].targetId);
                                }
                                if (arr[item].targetId === '13') {
                                    _this.input13 = arr[item].targetValue;
                                }
                                if (arr[item].targetId === '15') {
                                    _this.input15 = arr[item].targetValue;
                                }
                                if (arr[item].targetId === '16') {
                                    _this.input16 = arr[item].targetValue;
                                }
                                if (arr[item].targetId === '18') {
                                    _this.input18 = arr[item].targetValue;
                                }
                                if (arr[item].targetId === '23') {
                                    _this.input23 = arr[item].targetValue;
                                }
                                if (arr[item].targetId === '24') {
                                    _this.input24 = arr[item].targetValue;
                                }
                                if (arr[item].targetId === '25') {
                                    _this.input25 = arr[item].targetValue;
                                }
                            }
                            _this.checkConditions = orgArr;
                            _this.checkConditions2 = perArr;
                        } else {
                            _this.$message('查询失败');
                        }
                    }
                });
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