
define(function (require, exports) {
    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        var vm =  yufp.custom.vue({
            el: "#persistencedemo",
            data: function(){
                var me=this;
                return {
                    height: yufp.custom.viewSize().height,
                    tableColumns: [
           						{ label: '主键', prop: 'logicSeq',resizable: true },
           						{ label: '操作码', prop: 'currentAction',resizable: true},
           						{ label: '用户码', prop: 'custId',resizable: true },
           						{ label: '用户名称', prop: 'custName',resizable: true}
                    ],
                    urls:{
                        dataUrl:backend.example+ '/api/wfidemo/',
                        createSaveUrl:backend.example+ '/api/wfidemo/',
                        updateSaveUrl:backend.example+ '/api/wfidemo/update/',
                        authDemoUrl:backend.example+ '/api/wfidemo/dataAuthDemo'
                    },
                    queryButtons:[
                                  {label:'搜索',op:'submit',type: 'primary', icon: "search",show: true, click: function (model, valid) {
                                          if (valid) {
                                              var param = {
                                                  condition: JSON.stringify(model),
                                              };
                                              me.$refs.demoTable.remoteData(param);

                                          }
                                      }
                                  },
                                  {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }
                    ],
                    queryFields: [
                        {placeholder: '用户码', field: 'custId', type: 'input'},
                        {placeholder: '用户名', field: 'custName', type: 'input'}
                    ],
                    dialogFormVisible: false,
                    dialogStatus: '',
                    formDisabled:false,
                    textMap: {
                        update: '修改',
                        creat:'新增',
                        detail:'查看'
                    },
                    updateFields: [
                      {
                        columnCount: 2,
                        fields: [
                            { field: 'custId', label: '用户号',type:'input',rules: [{required: true, message: '必填项', trigger: 'blur'}] },
                            { field: 'custName', label: '用户或名称',type: 'input',rules:[{required: true, message: '必填项', trigger: 'blur'}]},
                            {field: 'logicSeq', label: '',type: 'input',hidden:true}
                        ]
                      },
                      {
                        columnCount: 1,
                        fields: [{field: 'currentAction', label: '操作码',type: 'input'}]
                      }
                    ]        
                }
            },
            methods: {
            	opType:function(type,disabled){
                    this.dialogFormVisible = true;
                    this.dialogStatus = type;
                    this.formDisabled=disabled;
                },
            	beforeClose:function(){
                    this.$refs.WfTaskPoolForm.resetFields();
                },
                openCreateFn: function () {//打开新增页面
                    this.opType('creat',false);
                    this.$nextTick(function () {
                        this.$refs.WfTaskPoolForm.resetFields();
                    });
                },
                openEditFn: function () {//打开修改页面
                    if (this.$refs.demoTable.selections.length!==1){
                        this.$message({message: '请选择一条数据!', type: 'warning'});
                        return false;
                    }
                    var row =this.$refs.demoTable.selections[0];
                    this.opType('update',false);
                    this.$nextTick(function () {
                        this.$refs.WfTaskPoolForm.resetFields();
                        yufp.extend(this.$refs.WfTaskPoolForm.formModel, row);
                    });

                },
                openDetailFn:function(){//查看详情
                    if (this.$refs.demoTable.selections.length!==1){
                        this.$message({message: '请选择一条数据!', type: 'warning'});
                        return false;
                    }
                    var row =this.$refs.demoTable.selections[0];
                    this.opType('detail',true);
                    this.$nextTick(function () {
                        this.$refs.WfTaskPoolForm.resetFields();
                        yufp.extend(this.$refs.WfTaskPoolForm.formModel, row);
                    });
                },
               
                saveCreateFn: function () {//新增保存
                    var me = this;
                    var myform = me.$refs.WfTaskPoolForm;                
                    myform.validate(function(valid) {
                        if (valid) {
                            var comitData = {};
                            myform.formModel.logicSeq=null;
                            yufp.extend(comitData, myform.formModel);
                            var saveUrl = me.urls.createSaveUrl;                        
                            yufp.service.request({
                                url: saveUrl,
                                data: comitData,
                                method: 'POST',
                                callback: function (code, message, response) {
                                     if (response.data) {
                                         me.dialogFormVisible = false;
                                         me.$message({message: '新增成功', type: 'success'});
                                         me.$refs.demoTable.remoteData();
                                      }else{
                                         me.$message({message: '新增失败', type: 'error'});
                                     }
                                }
                            });                         
                        }else {
                            me.$message({message: '请检查输入项是否合法', type: 'warning'});
                            return false;
                        }
                    })

                },
                saveEditFn:function(){//修改保存
                    var me = this;
                    var myform = me.$refs.WfTaskPoolForm;
                    myform.validate(function(valid) {
                        if (valid) {
                            var comitData = {};
                            yufp.extend(comitData, myform.formModel);
                            var saveUrl = me.urls.updateSaveUrl;
                       
                            yufp.service.request({
	                            url: saveUrl,
	                            data: comitData,
	                            method: 'POST',
	                            callback: function (code, message, response) {
	                                if (response.data) {
	                                      me.dialogFormVisible = false;
	                                      me.$message({message: '修改成功', type: 'success'});
	                                      me.$refs.WfTaskPoolList.remoteData();
	                                 }else{
	                                      me.$message({message: '修改失败', type: 'error'});
	                                 }
	                            }
	                          });                        
	                        }else {
	                            me.$message({message: '请检查输入项是否合法', type: 'warning'});
	                            return false;
                        }
                    })
                },
                deleteFn:function(){//删除
                    if (this.$refs.demoTable.selections.length>0) {
                        var row =this.$refs.demoTable.selections[0];
                        var id='';
                        for (var i=0;i< this.$refs.demoTable.selections.length;i++) {
                            var row=this.$refs.demoTable.selections[i];
                            id=id+row.logicSeq+',';
                        }
                        var me=this;
                        this.$confirm('您确定需要删除记录吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(function(){
                            yufp.service.request({
                                method: 'POST',
                                url: backend.example+"/api/wfidemo/batchdelete/"+id,
                                callback: function (code, message, response) {
                                    if (response.data) {
                                        me.$message({message: '删除成功', type: 'success'});
                                        me.$refs.demoTable.remoteData();
                                    }else{
                                        me.$message({message: '删除失败', type: 'error'});
                                    }
                                }
                            });
                        })
                    } else {
                        this.$message({message: '请先选择要删除的数据', type: 'warning'});
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