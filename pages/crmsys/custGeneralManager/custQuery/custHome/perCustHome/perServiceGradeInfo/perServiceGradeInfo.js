/**
 * @Created by 马妍 mayan2@yusys.com.cn on 2019-2-16 11:31:10.
 * @updated by
 * @description 服务等级
 */
define(['./libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;
    yufp.lookup.reg('CD0032,CD0243,CD0421');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custpubService + '/api/ocrmfcgcpngrade/querygradelist/' + custId,
          formdata: {},
          adjustformdata: {},
          dialogVisible: false,
          adjustdialogVisible: false,
          formDisabled: false,
          adjustformDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          adjustviewType: 'EDIT',
          adjustviewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true
        };
      },
      methods: {
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
          _this.adjustdialogVisible = false;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {
            custId: custId
          };
          yufp.clone(_this.adjustformdata, model);
          var validate = false;
          _this.$refs.adjustrefForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }

          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpubService + '/api/ocrmfcipregradeapplyinfo/updateservicegrade',
            data: model,
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$message('操作成功');
              _this.adjustdialogVisible = false;
            }
          });
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;

          _this.dialogVisible = true;
          _this.formDisabled = !editable;
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
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        adswitchStatus: function (viewType, editable) {
          var _this = this;
          _this.adjustviewType = viewType;
          _this.saveBtnShow = editable;
          _this.adjustdialogVisible = true;
          _this.adjustformDisabled = !editable;
        },
        /**
         * 评级调整
         */
        adjustFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          // var selectData = '';
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          yufp.service.request({ // 查询业务数据
            method: 'GET',
            url: backend.custpubService + '/api/ocrmfcipregradeapplyinfo/queryservicegradelist/' + custId,
            callback: function (code, message, response) {
              response.data[0];
              if (code == 0) { // code等于0 说明成功
                // yufp.clone(response.data[0], this.adjustformdata);
                //   selectData = this.adjustformdata;
                _this.adswitchStatus('EDIT', true);
                _this.$nextTick(function () {
                  _this.$refs.adjustrefForm.resetFields();
                  yufp.clone(response.data[0], this.adjustformdata);
                });
              }
            } });
        //  _this.adswitchStatus('EDIT', true);
          //    _this.$nextTick(function () {
        //    _this.$refs.adjustrefForm.resetFields();
          //     yufp.clone(selectData, this.adjustformdata);
          //    });
        },
        /**
         * 调整信息查询
         */
        adjustSelect: function () {

        }
      }
    });
  };
});