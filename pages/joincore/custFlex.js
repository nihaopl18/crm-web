
define(['./libs/js-xlsx/xlsx.full.min.js', './custom/widgets/js/yufpUploadTable.js'], function (require, exports) {
  exports.ready = function (hashCode, data, cite) {
    var bizseqno = data.bizSeqNo;
    var params;
    yufp.lookup.reg('CUSTFLEX_SPSTATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          expandCollapseName: ['base'],
          exportDisabled: '',
          form: {
            instanceid: data.instanceId,
            bizseqno: data.bizSeqNo,
            wfSign: data.wfSign,
            wfName: data.wfName,
            spstatus: data.spStatus,
            nodeId: data.nodeId,
            nodeName: data.nodeName
          },
          colunmNamelist: [],
          data: [],
          StatusOptions: [
            { key: '0', value: '审批中' },
            { key: '1', value: '同意' },
            { key: '2', value: '否决' }
          ]
          // form:{}
        };
      },
      mounted: function () {
        this.initPageData();
      },
      methods: {
        initPageData: function () {
          var _this = this;
          if (data.spStatus == '1' && data.wfStatus == '1') { // 导出同意
            _this.exportDisabled = false;
            yufp.service.request({
              method: 'GET',
              url: backend.example + '/api/ocrmAciReportApply/getNode?instanceid=' + data.instanceId,
              callback: function (code, message, response) {
                // 如果流程还未开始，则不能导出
                if (response.data.prenodeid == 'WFBEGIN') {
                  _this.exportDisabled = true;
                }
              }
            });
          }
          yufp.service.request({
            method: 'GET',
            url: backend.example + '/api/ocrmAciReportApply/getParams?bizseqno=' + bizseqno,
            callback: function (code, message, response) {
              var paramMap = JSON.parse(response.data[0].params);
              _this.colunmNamelist = paramMap.colunmNamelist;
              _this.data = paramMap.datalist;
              params = paramMap;
            }
          });
        },
        exportFn: function () {
          if (params == null || params == undefined) {
            alert('数据库存储失败');
            return;
          }
          var parambizseqno = {
            bizseqno: bizseqno
          };
          var param = {};
          param.url = backend.appOcaService + '/api/ocrmfcifqdbcol/export';
          param.url = yufp.service.getUrl(param);
          param.url += '?access_token=' + yufp.service.getToken();
          param.url += '&condition=' + encodeURI(JSON.stringify(parambizseqno));
          yufp.util.download(param.url);
        }
      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});