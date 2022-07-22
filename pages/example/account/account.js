define(function(require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function(hashCode, data, cite) {
        var vm = yufp.custom.vue({
            el : "#accountdemo",
            data : {
                account:{
                    targetAcctId:'2001',
                    sourceAcctId1:'1000',
                    amount1:0,
                    isSleep:false
                },
                tableData: [],
                moneyData:{
                    "账号-A[2001]": 92,
                    "账号-B[1001]": 108
                },
                transfUrl:backend.compositeService+'/api/transfer',
                refreshUrl:backend.compositeService+'/api/query'
            },
            methods : {
                transf : function() {
                    var me = this;
                    var myform = me.$refs['form0'];
                    myform.validate(function(valid) {
                        var parameter= '';
                        for (var key in me.account){
                            var keyT = key;
                            var valueT = me.account[key];
                            parameter = parameter + '&'+keyT+'='+valueT;
                        }
                        if(parameter!='')
                            parameter = parameter.substring(1);
                        if (valid) {
                            var comitData = me.account;
                            yufp.service.request({
                                url: me.transfUrl+'?'+parameter,
                                method: 'POST',
                                callback: function (code, message, response) {
                                    if (response.code==0) {
                                        me.$message({message: '转账成功', type: 'success'});
                                        me.refresh();
                                    }else{
                                        me.$message({message: '转账失败', type: 'error'});
                                    }
                                }
                            });
                        }else {
                            me.$message({message: '请检查输入项是否合法', type: 'warning'});
                            return false;
                        }
                    })
                },
                refresh : function() {
                    var me = this;
                    yufp.service.request({
                        url: me.refreshUrl,
                        method: 'GET',
                        callback: function (code, message, response) {
                            if (response) {

                                var dataMoney = response;
                                me.tableData = [];
                                for (var key in dataMoney){
                                    if(key.endsWith("-Frozen"))
                                        continue;

                                    var value = dataMoney[key];
                                    var valueF = dataMoney[key+"-Frozen"];
                                    var row = {account:key,money:value,forzen:valueF};
                                    me.tableData.push(row);
                                }
                            }else{
                                me.tableData = [];
                                //me.$message({message: '表格数据', type: 'error'});
                            }
                        }
                    });
                }
            }
        });
    };

    // 消息处理
    exports.onmessage = function(type, message) {

    };

    // page销毁时触发destroy方法
    exports.destroy = function(id, cite) {

    }

});