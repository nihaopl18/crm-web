/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-1-22 10:18:07.
 * @updated by
 * @description 交易渠道信息
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发 尼玛
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0067');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custpersonService + '/api/acrmfagchannelanalysis/querychannellist/' + custId,
          activeName: 'channelInfo',
          formdata: {},
          viewType: 'DETAIL',
          channelDialogVisible: false,
          formDisabled: false,
          channelBtnShow: true
        };
      },
      methods: {
        /**
         * 交易渠道详情返回
         */
        channelcancelFn: function () {
          var _this = this;
          _this.saveDialogVisible = false;
        },
        handleClick: function () {

        },
        /**
         * 存款信息
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.channelBtnShow = editable;
          _this.channelDialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 交易渠道详情
         */
        channelInfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.channelTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.channelForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        }
      }
    });
  };
});