/**
 * @created by  on 2018-11-28 16:58:43
 * @updated by
 * @description 我的消息
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './libs/js-xlsx/xlsx.full.min.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('IS_READ,YESNO');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          typeOption: [],
          queryFields: [
            { placeholder: '规则类别', field: 'ruleId', type: 'select', options: []},
            { placeholder: '是否已读', field: 'isRead', type: 'select', dataCode: 'IS_READ'},
            { placeholder: '提醒到期日期', field: 'msgEndDate', type: 'date' },
            { placeholder: '剩余天数', field: 'lastDate', type: 'input' }
          ],
          queryButtons: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  var param = { condition: JSON.stringify(model) };
                  _this.$refs.reftable.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          tableColumns: [
            { label: '规则类别', prop: 'ruleName', width: 200, resizable: true},
            { label: '是否已读', prop: 'isread', width: 110},
            { label: '客户名称', prop: 'custName', width: 180},
            { label: '提醒到期日期',
              prop: 'msgEndDate',
              width: 100,
              formatter: function (row, column) {
                return yufp.util.dateFormat(row.msgEndDate, '{y}-{m}-{d}');
              } },
            { label: '剩余天数', prop: 'lastDate', width: 120 },
            { label: '可发送渠道', prop: 'channelValue' },
            { label: '是否已发送短信', prop: 'ifMessage', width: 120, dataCode: 'YESNO' }
          ],
          updateFields: [{
            columnCount: 2,
            fields: [
              { label: '规则类别', field: 'ruleName', type: 'select', options: []},
              { label: '是否已读', field: 'isread', type: 'select', dataCode: 'DATA_STS'},
              { label: '客户名称', field: 'custName'},
              { label: '提醒到期日期', field: 'msgEndDate', type: 'date', format: 'yyyy-MM-dd'},
              { label: '剩余天数', field: 'lastDate'},
              { label: '可发送渠道', field: 'channelValue'},
              { label: '是否已发送短信', field: 'ifMessage', type: 'select', dataCode: 'YESNO'},
              { label: '发送时间', field: 'sendTime'},
              { label: '接收号码', field: 'receiveNum'}
            ]
          }, {
            columnCount: 1,
            fields: [
              { label: '短信发送内容', field: 'messageRemark', type: 'textarea'}
            ]
          }],
          updateButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _this.dialogVisible = false;
              }
            }
          ],
          height: yufp.frame.size().height - 150,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          gridUrl: '/api/adminremind/list', // 表格查询URL
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          selectFlag: true
        };
      },
      methods: {
        /**
         * 控制保存按钮、dialog-x、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.updateButtons[0].hidden = !editable;
          _this.formDisabled = !editable;
          _this.dialogVisible = true;
        },
        addMessage: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.reform.resetFields();
          });
        },
        setRead: function () {
          var me = this;
          var selectionsAry = this.$refs.reftable.selections;
          if (selectionsAry.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var isread = selectionsAry[0].isread;
          if (isread === '已阅') {
            me.$message({message: '已经是已阅,不需要设置'});
            return;
          }
          var infoId = selectionsAry[0].infoId;

          yufp.service.request({
            method: 'post',
            url: '/api/adminremind/saveremindread',
            data: {remindId: infoId},
            callback: function (code, message, response) {
              me.$message({message: '设置已读成功'});
              me.$refs.reftable.remoteData();
            }
          });
        },
        /**
         * 详情
         */
        infoFn: function () {
          var selectionsAry = this.$refs.reftable.selections;
          if (selectionsAry.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          this.switchStatus('DETAIL', false);
          selectionsAry[0].msgEndDate = yufp.util.dateFormat(selectionsAry[0].msgEndDate, '{y}-{m}-{d}');

          this.$nextTick(function () {
            this.$refs.reform.formModel = yufp.clone(selectionsAry[0], {});
          });
        },
        // 详情页面关闭回调函数
        closeFn: function () {
          var selectionsAry = this.$refs.reftable.selections;
          var me = this;
          var isread = selectionsAry[0].isread;
          if (isread != '已阅') {
            var infoId = selectionsAry[0].infoId;
            yufp.service.request({
              method: 'post',
              url: '/api/adminremind/saveremindread',
              data: {remindId: infoId},
              callback: function (code, message, response) {
                me.$message({message: '设置已读成功'});
                me.$refs.reftable.remoteData();
              }
            });
          }
        }
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'get',
          url: '/api/adminremind/getremingruleinfo',
          callback: function (code, message, response) {
            if (code == '0') {
              var str = response.data;
              for (var i = 0; i < str.length; i++) {
                info = {};
                info.key = str[i].key;
                info.value = str[i].value;
                _this.typeOption.push(info);
              }
              _this.updateFields[0].fields[0].options = _this.typeOption;
              _this.queryFields[0].options = _this.typeOption;
            }
          }
        });
      }
    });
  };
});