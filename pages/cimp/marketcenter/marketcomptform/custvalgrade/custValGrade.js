/**
 * @created by helin3 on 2018/07/18.
 * @description 营销组件FORM表单-渠道智能分发-客户价值等级
 */
define([
  "./libs/vuedraggble/sortable.js",
  "./libs/vuedraggble/vuedraggable.min.js"
],function (require, exports) {
	/**
	 * 页面加载完成时触发
	 * @param hashCode 路由ID
	 * @param data 传递数据对象
	 * @param cite 页面站点信息
	 */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE,CUST_LEVEL');
    yufp.custom.vue({
      el: cite.el,
      //特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        var _self = this;
        return {
          activeNames: ['1', '2', '3'],
          editFields: [{
            columnCount: 2,
            fields: [
              { label: '拜访时间', field: 'ip', type: 'timePicker' }
            ]
          }],
          model: { time: ['', ''] },
          channeldata: [],
          gradeData:[],
          channelHvalue: [],
          channelLvalue: [],
          gradeHvalue: [],
          gradeLvalue: [],
          buttonHiden:false,
          custTableData:[],
          custTableData1:[],
          checkedchannel: [],
          checkedchannel1: [],
          checkedchannel2:[],
          checkedGrade:[],
          checkedGrade1:[],
          checkedGrade2:[],
          /** 页面 提交、更新按钮 */
        };
      },
      methods: {
        close: function () {
          this.$options.ncmpobj.close();
        },
        //高等级价值change方法
        changeGradeFn1:function(flag){
          var _this=this;
          if(flag=='right'){
            var key=_this.checkedGrade;
            for(var s=0;s<key.length;s++){
              for(var i=0;i<_this.gradeData.length;i++){
                var info=_this.gradeData[i];
                if(info.key==key[s]){
                  _this.gradeHvalue.push(info);
                  _this.gradeData.splice(i, 1);
                  break;
                }
              } 
            }
            _this.checkedGrade=[];
          }else{
            var key=_this.checkedGrade1;
            for(var s=0;s<key.length;s++){
              for(var i=0;i<_this.gradeHvalue.length;i++){
                var info=_this.gradeHvalue[i];
                if(info.key==key[s]){
                  _this.gradeData.push(info);
                  _this.gradeHvalue.splice(i, 1);
                  break;
                }
              } 
            }
            _this.checkedGrade1=[];
          }
        },
        //低等级价值change方法
        changeGradeFn2:function(flag){
          var _this=this;
          if(flag=='right'){
            var key=_this.checkedGrade;
            for(var s=0;s<key.length;s++){
              for(var i=0;i<_this.gradeData.length;i++){
                var info=_this.gradeData[i];
                if(info.key==key[s]){
                  _this.gradeLvalue.push(info);
                  _this.gradeData.splice(i, 1);
                  break;
                }
              }
            }
            _this.checkedGrade=[];
          }else{
            var key =_this.checkedGrade2;
            for(var s=0;s<key.length;s++){
              for(var i=0;i<_this.gradeLvalue.length;i++){
                var info=_this.gradeLvalue[i];
                if(info.key==key[s]){
                    _this.gradeData.push(info);
                    _this.gradeLvalue.splice(i, 1);
                  break;
                }
              } 
            }
            _this.checkedGrade2=[];
          }
        },
        //高价值渠道change方法
        changeChannelFn1:function(flag){
          var _this=this;
          if(flag=='right'){
            var key=_this.checkedchannel;
            for(var s=0;s<key.length;s++){
              for(var i=0;i<_this.channeldata.length;i++){
                var info=_this.channeldata[i];
                if(info.key==key[s]){
                  _this.channelHvalue.push(info);
                  _this.channeldata.splice(i, 1);
                  break;
                }
              }
            }
            _this.checkedchannel=[];
          }else{
            var key=_this.checkedchannel1;
            for(var s=0;s<key.length;s++){
              for(var i=0;i<_this.channelHvalue.length;i++){
                var info=_this.channelHvalue[i];
                if(info.key==key[s]){
                   _this.channeldata.push(info);
                    _this.channelHvalue.splice(i,1);
                  break;
                }
              }
            }
            _this.checkedchannel1=[];
          }
        },
        //低价值渠道change方法
        changeChannelFn2:function(flag){
          var _this=this;
          if(flag=='right'){
            var key=_this.checkedchannel;
            for(var s=0;s<key.length;s++){
              for(var i=0;i<_this.channeldata.length;i++){
                var info=_this.channeldata[i];
                if(info.key==key[s]){
                  _this.channelLvalue.push(info);
                  _this.channeldata.splice(i, 1);
                  break;
                }
              }
            }
            _this.checkedchannel=[];
          }else{
            var key=_this.checkedchannel2;
            for(var s=0;s<key.length;s++){
              for(var i=0;i<_this.channelLvalue.length;i++){
                var info=_this.channelLvalue[i];
                if(info.key==key[s]){
                   _this.channeldata.push(info);
                    _this.channelLvalue.splice(i,1);
                  break;
                }
              }
            }
            _this.checkedchannel2=[];
          }
        },
        fomatData:function(row, column, cellValue){//表格数据转码
          if(column.property=='custType'){
            return yufp.lookup.convertKey('CUST_TYPE',cellValue);
          }else if(column.property=='custStat'){
            return yufp.lookup.convertKey('CUST_STAT',cellValue);
          }else if(column.property=='custLevel'){
            return yufp.lookup.convertKey('CUST_LEVEL',cellValue);
          }
        },
        queryCustByInfoFn: function(){
          var _this=this;
          var channelHvalue="";
          var nodeId = _this.$options.ncmpobj.instanceObj.nodeId;
          var flowId = _this.$options.ncmpobj.instanceObj.flowId;
          for(var i=0;i<_this.channelHvalue.length;i++){
              let info=_this.channelHvalue[i];
              if(i==0){
                channelHvalue=info.label;
              }else{
                channelHvalue=channelHvalue+','+info.label;
              }
          }
          var channelLvalue= "";
          for(var i=0;i<_this.channelLvalue.length;i++){
            let info=_this.channelLvalue[i];
            if(i==0){
              channelLvalue=info.label;
            }else{
              channelLvalue=channelLvalue+','+info.label;
            }
          }
          var gradeHvalue= "";
          for(var i=0;i<_this.gradeHvalue.length;i++){
            let info=_this.gradeHvalue[i];
            if(i==0){
              gradeHvalue=info.key;
            }else{
              gradeHvalue=gradeHvalue+','+info.key;
            }
          }
          var gradeLvalue="";
          for(var i=0;i<_this.gradeLvalue.length;i++){
            let info=_this.gradeLvalue[i];
            if(i==0){
              gradeLvalue=info.key;
            }else{
              gradeLvalue=gradeLvalue+','+info.key;
            }
          }
          if(channelHvalue !="">0&&channelLvalue !=""&&gradeHvalue !=""&&gradeLvalue !=""){
            var preData={
              channelHvalue: channelHvalue,
              channelLvalue: channelLvalue,
              gradeHvalue: gradeHvalue,
              gradeLvalue: gradeLvalue
            };
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/presentationform/getcustvaloutother',
              data: {
                flowId: flowId,
                nodeId: nodeId,
                preData: JSON.stringify(preData)
              },
              callback: function (code, message, response) {
                if (response.data != null) {
                  var info = response.data;
                  _this.custTableData1 = info;
                };
              }
            });
          }
        },
        //保存方法
        save: function () {
          var _this = this;
          var validate = false;
          var channelHvalue="";
          for(var i=0;i<_this.channelHvalue.length;i++){
              let info=_this.channelHvalue[i];
              if(i==0){
                channelHvalue=info.key;
              }else{
                channelHvalue=channelHvalue+','+info.key;
              }
          }
          var channelLvalue= "";
          for(var i=0;i<_this.channelLvalue.length;i++){
            let info=_this.channelLvalue[i];
            if(i==0){
              channelLvalue=info.key;
            }else{
              channelLvalue=channelLvalue+','+info.key;
            }
          }
          var gradeHvalue= "";
          for(var i=0;i<_this.gradeHvalue.length;i++){
            let info=_this.gradeHvalue[i];
            if(i==0){
              gradeHvalue=info.key;
            }else{
              gradeHvalue=gradeHvalue+','+info.key;
            }
          }
          var gradeLvalue="";
          for(var i=0;i<_this.gradeLvalue.length;i++){
            let info=_this.gradeLvalue[i];
            if(i==0){
              gradeLvalue=info.key;
            }else{
              gradeLvalue=gradeLvalue+','+info.key;
            }
          }
          if(channelHvalue !="">0&&channelLvalue !=""&&gradeHvalue !=""&&gradeLvalue !=""){
            var nodeId = this.$options.ncmpobj.instanceObj.nodeId;
            var preData = [];
            preData.push({
              formOperationFiled:'channelHvalue',
              formOperationVal: channelHvalue
            });
            preData.push({
              formOperationFiled:'channelLvalue',
              formOperationVal: channelLvalue
            });
            preData.push({
              formOperationFiled:'gradeHvalue',
              formOperationVal: gradeHvalue
            });
            preData.push({
              formOperationFiled:'gradeLvalue',
              formOperationVal: gradeLvalue
            });
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/presentationform/savepre',
              data: {
                preData: JSON.stringify(preData),
                nodeId: nodeId
              },
              callback: function (code, message, response) {
                _this.$message({message: '操作保存成功', type: 'success'});
              }
            });
          }else{
            _this.$message({ message: '请配置完相关信息', type: 'warning' });
            return false;
          }
        },
      },
      mounted: function () {
        var _this = this;
     
        yufp.lookup.bind('CUST_LEVEL', function (data) {//客户等级
            for(var s=0;s<data.length;s++){
                  _this.gradeData.push({
                      key:data[s].key,
                      label:data[s].value
                  });
            }
        });
        yufp.service.request({
          method: 'GET',
          url: backend.adminService + '/api/presentationform/getchannelinfo',
          callback: function (code, message, response) {
            var channeldata = response.data;
            for(var s=0;s<channeldata.length;s++){
              var d=channeldata[s];
                  _this.channeldata.push({
                      key:d.key,
                      label:d.label
                  });
            }
          }
        });
        if (_this.$options.ncmpobj.instanceObj == undefined) {
          _this.buttonHiden = true;
        } else {
          _this.buttonHiden = false;
          
          var nodeId = _this.$options.ncmpobj.instanceObj.nodeId;
          var flowId = _this.$options.ncmpobj.instanceObj.flowId;
          // 模型应用
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/presentationform/getcustvaliteminout',
            data: {
              flowId: flowId,
              nodeId: nodeId
            },
            callback: function (code, message, response) {
              if (response.data != null) {
                var info = response.data;
                _this.custTableData = info.cust;
                if(info.opera !=null){
                  var data=info.opera;
                  for(var i=0;i<data.length;i++){
                      var str=data[i];
                      if(str.formOperationFiled=='gradeHvalue'){
                          var key=str.formOperationVal.split(',');
                          for(let s=0;s<key.length;s++){
                            for(let i=0;i<_this.gradeData.length;i++){
                              var info=_this.gradeData[i];
                              if(info.key==key[s]){
                                _this.gradeHvalue.push(info);
                                _this.gradeData.splice(i, 1);
                                break;
                              }
                            }
                          }
                      }else if(str.formOperationFiled=='gradeLvalue'){
                        var key=str.formOperationVal.split(',');
                        for(let s=0;s<key.length;s++){
                          for(let i=0;i<_this.gradeData.length;i++){
                            var info=_this.gradeData[i];
                            if(info.key==key[s]){
                              _this.gradeLvalue.push(info);
                             _this.gradeData.splice(i, 1);
                              break;
                            }
                          }
                        }
                      }else if(str.formOperationFiled=='channelHvalue'){
                        var key=str.formOperationVal.split(',');
                        for(let s=0;s<key.length;s++){
                          for(let i=0;i<_this.channeldata.length;i++){
                            var info=_this.channeldata[i];
                            if(info.key==key[s]){
                              _this.channelHvalue.push(info);
                             _this.channeldata.splice(i, 1);
                              break;
                            }
                          }
                        }
                      }else if(str.formOperationFiled=='channelLvalue'){
                        var key=str.formOperationVal.split(',');
                        for(let s=0;s<key.length;s++){
                          for(let i=0;i<_this.channeldata.length;i++){
                            var info=_this.channeldata[i];
                            if(info.key==key[s]){
                              _this.channelLvalue.push(info);
                             _this.channeldata.splice(i, 1);
                              break;
                            }
                          }
                        }
                      }
                  }
                }
              };
            }
          });
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/presentationform/getcustvalout',
            data: {
              flowId: flowId,
              nodeId: nodeId
            },
            callback: function (code, message, response) {
              if (response.data != null) {
                var info = response.data;
                _this.custTableData1 = info;
              };
            }
          });
        }
      },
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