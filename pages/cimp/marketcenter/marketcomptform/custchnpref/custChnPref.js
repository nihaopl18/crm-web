/**
 * @created by 罗顺 on 2018/11/16.
 * @description 营销组件FORM表单-渠道智能分发-客户渠道偏好
 */
define(function (require, exports) {
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
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        return {
          activeNames: ['1', '2', '3'],
          custTableData:[],
          custTableData1:[]
        };
      },
      methods: {
        // TODO
        close: function () {
          this.$options.ncmpobj.close();
        },
        fomatData:function(row, column, cellValue){//表格数据转码
          if(column.property=='custType'){
            return yufp.lookup.convertKey('CUST_TYPE',cellValue);
          }else if(column.property=='custStat'){
            return yufp.lookup.convertKey('CUST_STAT',cellValue);
          }else if(column.property=='identType'){
            return yufp.lookup.convertKey('IDENT_TYPE',cellValue);
          }
        }
      },
      mounted: function(){
        var _this=this;
        if (_this.$options.ncmpobj.instanceObj != undefined) {
          var nodeId = _this.$options.ncmpobj.instanceObj.nodeId;
          var flowId = _this.$options.ncmpobj.instanceObj.flowId;
          // 模型应用
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/presentationform/getcustchennlperiteminout',
            data: {
              flowId: flowId,
              nodeId: nodeId
            },
            callback: function (code, message, response) {
              if (response.data != null) {
                var info = response.data;
                _this.custTableData = info.inCust;
                _this.custTableData1 = info.outCust;
              };
            }
          });
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
  };
});