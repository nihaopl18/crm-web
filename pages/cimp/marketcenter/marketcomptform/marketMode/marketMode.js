/**
 * @created by hujun3 on 2019/02/18.
 * @description 营销组件FORM表单-营销组件-营销方式
 */
define(function (require, exports) {
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE');
    yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      data: function () {
        return {
          activeNames: ['1', '2'],
          dialogVisibleAdd: false,
          currentRow: null,
          buttonHiden: true,
          imageSrc: '',
          centerDialogVisible: false,
          flowNode: {
            // 报文体
            designBody: '',
            // 组件标题
            title: ''
          },
          formdata: {
            // 报文体
            marketMode: '',
            // 组件标题
            marketUrl: ''
          },
          options: [
            {key: '01', value: '拼团'},
            {key: '02', value: '砍价'},
            {key: '03', value: '助力'},
            {key: '04', value: '抽奖'}
          ],
          value1: '{"isConfig":0,"customUrl":{"html":"pages/cimp/marketcenter/marketcomptform/marketMode/marketModeView.html","js":"pages/cimp/marketcenter/marketcomptform/marketMode/marketModeView.js"}}'
        };
      },
      methods: {
        saveFn: function () {
          var _this = this;
          var validate = false;
          this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var nodeId = this.$options.ncmpobj.instanceObj.nodeId;
          var preData = [];
          preData.push({formOperationFiled: 'marketMode', formOperationVal: _this.formdata.marketMode});
          preData.push({formOperationFiled: 'marketUrl', formOperationVal: '1'});
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
        },
        selectFn: function (val) {
          var _this = this;
          switch (val) {
          case '01':
            _this.formdata.marketUrl = '{"isConfig":0,"customUrl":{"html":"pages/cimp/marketcenter/marketcomptform/marketMode/marketModeView1.html","js":"pages/cimp/marketcenter/marketcomptform/marketMode/marketModeView1.js"}}';
            break;
          case '02':
            _this.formdata.marketUrl = '{"isConfig":0,"customUrl":{"html":"pages/cimp/marketcenter/marketcomptform/marketMode/marketModeView2.html","js":"pages/cimp/marketcenter/marketcomptform/marketMode/marketModeView2.js"}}';
            break;
          case '03':
            _this.formdata.marketUrl = '{"isConfig":0,"customUrl":{"html":"pages/cimp/marketcenter/marketcomptform/marketMode/marketModeView3.html","js":"pages/cimp/marketcenter/marketcomptform/marketMode/marketModeView3.js"}}';
            break;
          case '04':
            _this.formdata.marketUrl = '{"isConfig":0,"customUrl":{"html":"pages/cimp/marketcenter/marketcomptform/marketMode/marketModeView4.html","js":"pages/cimp/marketcenter/marketcomptform/marketMode/marketModeView4.js"}}';
            break;
          }
        },
        preview: function () {
          var _this = this;
          if (_this.formdata.marketUrl) {
            switch (_this.formdata.marketMode) {
            case '01':
              _this.imageSrc = 'pages/cimp/marketcenter/marketcomptform/marketMode/view1.jpg';
              break;
            case '02':
              _this.imageSrc = 'pages/cimp/marketcenter/marketcomptform/marketMode/view2.png';
              break;
            case '03':
              _this.imageSrc = 'pages/cimp/marketcenter/marketcomptform/marketMode/view3.jpg';
              break;
            case '04':
              _this.imageSrc = 'pages/cimp/marketcenter/marketcomptform/marketMode/view4.jpg';
              break;
            }
            // _this.imageSrc =
            _this.centerDialogVisible = true;
            // _this.flowNode.designBody = _this.formdata.marketUrl;
            // _this.$refs.ncmpRef.show();
          }
        }
      },
      mounted: function () {
        var _this = this;
        if (_this.$options.ncmpobj.instanceObj == undefined) {
          _this.buttonHiden = true;
        } else {
          _this.buttonHiden = false;
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/presentationform/getpre',
            data: {
              nodeId: _this.$options.ncmpobj.instanceObj.nodeId
            },
            callback: function (code, message, response) {
              var from = response.data;
              for (var i = 0; i < from.length; i++) {
                if (from[i].formOperationFiled == 'marketMode') {
                  _this.formdata.marketMode = from[i].formOperationVal;
                } else if (from[i].formOperationFiled == 'marketUrl') {
                  _this.formdata.marketUrl = from[i].formOperationVal;
                }
              }
            }
          });
        }
      }
    });
  };
});