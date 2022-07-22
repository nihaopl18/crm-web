
define(function (require, exports) {
    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        var vm =  yufp.custom.vue({
            el: "#cacheDemo",
            data: function(){
            	var em=this;
                return {             
                    groupFields: [{
                        columnCount: 2,
                        fields: [
                            {label:'主键',field:'logicSeq',type:'input',value:'aef63e8c874a4ecebf2ef901bf341bda' }
                        ]
                    },{
                        columnCount: 2,
                        fields: [
                            {label:'值',field:'custId',type:'input',disabled:true},
                        ]
                    }],
                    buttons:[
                        {label:'获取',op:'submit',type:'primary',click:function (model, valid) {
                            em.generate(model.logicSeq);
                        }},
                        {label:'清除缓存',op:'submit',type:'primary',click:function (model, valid) {
                            em.clean(model.logicSeq);
                        }}
                    ]
                }
            },
            methods: {
                generate:function(logicSeq){//删除
                    var me=this;
                    if (logicSeq&&logicSeq!='') {
                        yufp.service.request({
                            method: 'get',
                            data:{
                                logicSeq:logicSeq
                            },
                            url: backend.example+"/api/cachedemo/select",
                            callback: function (code, message, response) {
                                if (response.data) {                                
                                    me.$message({message: '成功', type: 'success'});
                                    me.$refs.cacheFrom.formModel.custId=response.data.custId;
                                }else{
                                    me.$message({message: '失败', type: 'error'});
                                }
                            }
                        });
                    } else {
                        this.$message({message: '主键不能为空', type: 'warning'});
                        return false;
                    }
                },
                clean:function(logicSeq){//删除
                    var me=this;
                    if (logicSeq&&logicSeq!='') {
                        yufp.service.request({
                            method: 'get',
                            data:{
                                logicSeq:logicSeq
                            },
                            url: backend.example+"/api/cachedemo/clean",
                            callback: function (code, message, response) {
                                if (response.data==0) {
                                    me.$message({message: '清除成功，请点击【获取】按钮', type: 'success'});
                                }else{
                                    me.$message({message: '失败', type: 'error'});
                                }
                            }
                        });
                    } else {
                        this.$message({message: '主键不能为空', type: 'warning'});
                        return false;
                    }
                }
            }
        });
    };

    //消息处理
    exports.onmessage = function (type, message) {

    };

    //page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});