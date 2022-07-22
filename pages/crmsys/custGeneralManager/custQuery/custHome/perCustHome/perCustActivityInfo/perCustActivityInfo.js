/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-1-21 13:58:21.
 * @updated by
 * @description 营销活动信息
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
    yufp.lookup.reg('CD0238,CD0330,CD0333,CD0334,CD0066,CD0071,OCRM_MKT_ACTI_STAT,MAR_ACT_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.custpersonService + '/api/ocrmfmkactivity/queryList/' + custId,
          excDataUrl: backend.custpersonService + '/api/ocrmfmkactiexcrecord/queryList/' + custId,

          activeName: 'activity',

          formdata: {},
          viewType: 'DETAIL',
          actiModeOptions: [
            {
              'key': '0',
              'value': '厅堂营销'
            },
            {
              'value': '扫街活动',
              'key': '1'
            }, {
              'value': '重点客户拜访',
              'key': '2'
            }, {
              'value': '户外活动（进市场、进厂企、进学校）',
              'key': '3'
            }, {
              'value': '慈善公益',
              'key': '4'
            }, {
              'value': '金融宣传教育',
              'key': '5'
            }, {
              'value': '客户答谢会',
              'key': '6'
            }, {
              'value': '客户交流会',
              'key': '7'
            }, {
              'value': '跨业联盟',
              'key': '8'
            }, {
              'value': '沙龙',
              'key': '9'
            }, {
              'value': '讲座',
              'key': '10'
            }, {
              'value': '产品营销会',
              'key': '11'
            },
            {
              'value': '积分活动',
              'key': '12'
            }, {
              'value': '沙龙',
              'key': '13'
            }, {
              'value': '社区活动',
              'key': '14'
            }, {
              'value': '其它',
              'key': '15'
            }
          ],
          dialogVisible: false,
          excDialogVisible: false,
          formDisabled: false,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          activityBtnShow: true
        };
      },
      methods: {
        /**
         * 营销活动详情返回
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 营销活动
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.activityBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 营销活动
         */
        activityinfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.activityTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.activityForm.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        },
        /**
         * 营销活动执行明细
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus2: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.excBtnShow = editable;
          _this.excDialogVisible = true;
          _this.formDisabled = editable;
        },
        /**
         * 营销活动执行明细
         */
        excList: function () {
          var _this = this;
          var selectionsAry = _this.$refs.activityTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus2('EXCLIST', false);
          _this.$nextTick(function () {
            _this.$refs.excTable.resetFields();
            yufp.clone(selectionsAry[0], this.formdata);
          });
        }
      }
    });
  };
});