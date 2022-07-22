/**
 * @Created by hujun3 hujun3@yusys.com.cn on 2019-6-5 10:35:29.
 * @updated by
 * @description 商户视图页面
 */
define(['pages/climp_qy/merchantInfoManager/merchantInfoMananger.css'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('IDENT_TYPE,MANAGE_A_TYPE,MANAGE_B_TYPE,DATA_STS,WF_APP_STATUS,IF_FLAG,ADDRESS_TYPE,DEM0100011,XD000037');
    var merchantInfo = data.info;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          tabName: 'base',
          tabOtherName: 'contact',
          formDisabled: true,
          contactUrl: backend.qyPoolService + '/api/loyqymerchantinfo/querycontactinfo',
          addressUrl: backend.qyPoolService + '/api/loyqymerchantinfo/queryaddressinfo',
          uploadAction: yufp.service.getUrl({url: backend.gatewayService + backend.fileService + '/api/file/provider/uploadfile?access_token=' + yufp.service.getToken()}),
          imageUrl: '',
          instuOptions: [],
          formdata: {},
          contactParams: {
            condition: JSON.stringify({
              merchantId: data.info.merchantId
            })
          },
          addressParams: {
            condition: JSON.stringify({
              merchantId: data.info.merchantId
            })
          }
        };
      },
      mounted: function () {
        var _this = this;
        _this.queryInstuFn();
        // 向后台发送保存请求
        yufp.service.request({
          method: 'GET',
          url: backend.qyPoolService + '/api/loyqymerchantinfo/detail?id=' + merchantInfo.merchantId,
          callback: function (code, message, response) {
            _this.$refs.refForm.resetFields();
            yufp.clone(response.data, _this.formdata);
            _this.imageUrl = _this.comUrlFn(response.data.merchantLogo);
            _this.$refs.contactTable.remoteData(_this.contactParams);
            _this.$refs.addressTable.remoteData(_this.addressParams);
          }
        });
      },
      methods: {
        /**
         * 图片url补全
         */
        comUrlFn: function (path) {
          let url = yufp.settings.ssl ? 'https://' : 'http://';
          url += yufp.settings.url;
          url += backend.fileService;
          url += '/api/file/provider/download?fileId=' + path;
          return yufp.util.addTokenInfo(url);
        },
        // 日期格式化(年月日)
        dateFormatterSimple: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
        },
        // 查询金融机构
        queryInstuFn: function () {
          let _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.appOcaService + '/api/adminsmorg/getinstuorg',
            callback: function (code, message, response) {
              if (code === 0 && response.code === 0) {
                if (_this.instuOptions.length > 0) {
                  _this.instuOptions.splice(0, _this.instuOptions.length);
                }
                var instu = response.data;
                for (var i = 0; i < instu.length; i++) {
                  var option = {};
                  option.key = instu[i].instuId;
                  option.value = instu[i].instuName;
                  _this.instuOptions.push(option);
                }
              }
            }
          });
        },
        /**
         * tab页签点击事件
         */
        handleClick: function (form) {
          if (form.paneName == 'goods') {
            yufp.router.to('commodityView', merchantInfo, form.paneName);
          } else if (form.paneName == 'coupon') {
            yufp.router.to('ticketView', merchantInfo, form.paneName);
          } else if (form.paneName == 'order') {
            yufp.router.to('orderView', merchantInfo, form.paneName);
          }
        }
      }
    });
  };
});