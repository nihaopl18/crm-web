/**
 * @Created by panglx panglx@yusys.com.cn on 2018-12-26 15:08:03.
 * @updated by
 * @description 信息提醒
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS,IS_READ,RULE_CODE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.yuspClimpRemdService + '/api/remdinfo/getlist',
          formdata: {},
          dialogVisible: false,
          formDisabled: false
        };
      },
      methods: {
        /**
         * 设为已读
         */
        setReadFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          } else {
            for (var i = 0; i < selectionsAry.length; i++) {
              var element = selectionsAry[i];
              if (element.isread == '0') {
                _this.$message({ message: '只能选择未阅记录！', type: 'warning' });
                return;
              }
            }
          }
          var infoId = selectionsAry[0].infoId;
          // 向后台发送保存请求
          yufp.service.request({
            method: 'post',
            url: backend.yuspClimpRemdService + '/api/remdinfo/isread',
            data: {remindId: infoId},
            callback: function (code, message, response) {
              if (code === 0) {
                _this.$message('设置已读成功');
                _this.$refs.refTable.remoteData();
              }
            }
          });
        },
        /**
         * 详情关闭前
         */
        dialogClose: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (_this.formdata.isread == '1') {
            // 未阅时设置为已阅
            var infoId = selectionsAry[0].infoId;
            yufp.service.request({
              method: 'POST',
              url: backend.yuspClimpRemdService + '/api/remdinfo/isread',
              data: {remindId: infoId},
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                }
              }
            });
          }
          _this.dialogVisible = false;
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.dialogVisible = true;
          _this.formDisabled = true;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], _this.formdata);
          });
        }
      }
    });
  };
});