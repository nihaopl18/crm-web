
define(function (require, exports) {
    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        //自定义字典
        var seqIdOptions = [];
        yufp.service.request({
            method: 'GET',
            url: backend.example + "/api/sequence/getAllSeqId",
            callback: function (code, message, response) {
                var instu = response.data;
                for(var i=0;i<instu.length;i++){
                    var option = {};
                    option.key = instu[i].seqId;
                    option.value=instu[i].seqName;
                    seqIdOptions.push(option);
                }
            }
        });
        var vm =  yufp.custom.vue({
            el: "#sequenceDemo",
            data: function(){
            	var em=this;
                return {             
                    groupFields: [{
                        columnCount: 2,
                        fields: [
                            {label:'序列号模板',field:'seqId',type: 'select',options:seqIdOptions}
                        ]
                    },{
                        columnCount: 2,
                        fields: [
                            {label:'序列号',field:'sequenceNo',type:'input',disabled:true},
                        ]
                    }],
                    buttons:[
                        {label:'生成',op:'submit',type:'primary',click:function (model, valid) {
                            em.generate(model.seqId);
                        }}
                    ]
                }
            },
            methods: {
                generate:function(seqId){//删除
                    var me=this;
                    if (seqId&&seqId!='') {
                        yufp.service.request({
                            method: 'get',
                            data:{
                                seqId:seqId
                            },
                            url: backend.example+"/api/sequence/generate",
                            callback: function (code, message, response) {
                                if (response.data) {                                
                                    me.$message({message: '成功', type: 'success'});
                                    me.$refs.sequenceFrom.formModel.sequenceNo=response.data;
                                    me.$refs.sequenceFrom.formModel.seqId.dataCode=[1,2];
                                }else{
                                    me.$message({message: '失败', type: 'error'});
                                }
                            }
                        });
                    } else {
                        this.$message({message: '序列号模板id不能为空', type: 'warning'});
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