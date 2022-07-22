/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-09 09:{{ baseInfo.contact2 }}6:44
 * @update by:
 * @description:
 */

(function (vue, name) {
  vue.component(name, {
    template: ' <div class="touch-history">\
    <div class="history-cards">\
      <div class="card-item">\
        <p>本月线下拜访总次数</p>\
        <p>{{ baseInfo.contact1 }}</p>\
        <p>\
          <span>月同比</span>\
          <span>\
            <i :class="returnUpOrDown(baseInfo.contact2)"></i>{{ baseInfo.contact2 }}%</span>\
        </p>\
      </div>\
      <div class="card-item">\
        <p>本月通话次数</p>\
        <p>{{ baseInfo.contact3 }}</p>\
        <p>\
          <span>月同比</span>\
          <span>\
            <i :class="returnUpOrDown(baseInfo.contact4)"></i>{{ baseInfo.contact4 }}%</span>\
        </p>\
      </div>\
      <div class="card-item">\
        <p>本月短信触达次数</p>\
        <p>{{ baseInfo.contact5 }}</p>\
        <p>\
          <span>月同比</span>\
          <span>\
            <i :class="returnUpOrDown(baseInfo.contact6)"></i>{{ baseInfo.contact6 }}%</span>\
        </p>\
      </div>\
      <div class="card-item">\
        <p>本月客户反馈次数</p>\
        <p>{{ baseInfo.contact7 }}</p>\
        <p>\
          <span>月同比</span>\
          <span>\
            <i :class="returnUpOrDown(baseInfo.contact8)"></i>{{ baseInfo.contact8 }}%</span>\
        </p>\
      </div>\
    </div>\
    <yu-panel title="接触历史" panel-type="simple">\
      <div style="width: 100%">\
        <history-echart :visit-info="visitInfo"></history-echart>\
      </div>\
    </yu-panel>\
    <yu-panel title="接触历史详情" panel-type="simple">\
    <yu-button-group>\
      <yu-button icon="plus" @click="addFn">新增接触</yu-button>\
    </yu-button-group>\
      <yu-xtable ref="tableQ" :data-url="requestUrl" :base-params="baseParams" :border="false" style="width: 100%">\
        <yu-xtable-column prop="contactDate" label="接触日期"></yu-xtable-column>\
        <yu-xtable-column prop="contactType" label="接触类型" data-code="DY0006"></yu-xtable-column>\
        <yu-xtable-column prop="creatorName" label="管户经理"></yu-xtable-column>\
        <yu-xtable-column prop="contactGoal" label="接触目的" data-code="DY0005"></yu-xtable-column>\
        <yu-xtable-column prop="product" label="产品"></yu-xtable-column>\
        <yu-xtable-column prop="contactBack" label="接触反馈"></yu-xtable-column>\
        <yu-xtable-column label="操作" width="200">\
          <template slot-scope="scope">\
          <yu-button type="text" :disabled="scope.row.sourceTable != \'2\'" icon="yu-icon-details" @click="modify(scope.row)">编辑</yu-button>\
          <yu-button type="text" :disabled="scope.row.sourceTable != \'2\'" icon="yu-icon-details" @click="deleteRow(scope.row.customerContactId)">删除</yu-button>\
            <yu-button type="text" :disabled="scope.row.sourceTable != \'0\' && !scope.row.workReportId" icon="yu-icon-details" @click="handleClick(scope.row.workReportId)">查看工作报告</yu-button>\
          </template>\
        </yu-xtable-column>\
      </yu-xtable>\
    </yu-panel>\
    <el-dialog-x title="新增接触" :visible.sync="dialogVisibleAdd" width="800px" height="450px">\
      <el-form-x ref="refformAdd" label-position="top" :group-fields="addFields" :buttons="addButtons" label-width="120px">\
      </el-form-x>\
    </el-dialog-x>\
    <el-dialog-x title="修改接触" :visible.sync="dialogVisibleUpdate" width="800px" height="450px">\
      <el-form-x ref="refformUpdate" label-position="top" :group-fields="updateFields" :buttons="updateButtons" label-width="120px">\
      </el-form-x>\
    </el-dialog-x>\
  </div>',
    data: function () {
      yufp.lookup.reg('DY0006,DY0005');
      var _this = this;
      return {
        baseInfo: {},
        visitInfoDetail: [],
        visitInfo: {
          contactDate1: [], // 线下拜访
          contactData2: [], // 营销通话
          contactData3: [], // 短信触达
          contactData4: [] // 客户反馈
        },
        requestUrl: '/api/touchinfoworkreport/detail',
        baseParams: { condition: JSON.stringify({ custId: yufp.localStorage.get('custInfo').custId }) },
        dialogVisibleAdd: false,
        addFields: [{
          columnCount: 2,
          fields: [{
            label: '接触日期',
            field: 'contactDate',
            rules: [{ required: true, message: '必填项', trigger: 'blur' }],
            type: 'date',
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              }
            }
          },
          {
            label: '接触类型',
            field: 'contactType',
            rules: [
              { required: true, message: '必填项', trigger: 'blur' },
            ],
            type: 'select',
            dataCode: 'DY0006'
          }
          ]
        }, {
          columnCount: 2,
          fields: [{
            label: '接触目的',
            field: 'contactGoal',
            rules: [{ required: true, message: '必填项', trigger: 'blur' }],
            type: 'select',
            dataCode: 'DY0005'
          },
          {
            label: '产品',
            field: 'product',
            type: 'input'
          }
          ]
        }, {
          columnCount: 1,
          fields: [{
            label: '接触反馈',
            field: 'contactBack',
            type: 'textarea'
          }
          ]
        }
        ],
        addButtons: [{
          label: '取消',
          type: 'primary',
          icon: 'yx-undo2',
          hidden: false,
          click: function (model) {
            _this.dialogVisibleAdd = false;
          }
        },
        {
          label: '保存',
          type: 'primary',
          icon: 'check',
          hidden: false,
          click: function (model) {
            var validate;
            _this.$refs.refformAdd.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            model.contactCustId = yufp.localStorage.get('custInfo').custId;
            model.contactCustName = yufp.localStorage.get('custInfo').custName;
            model.sourceTable = '2';
            model.contactDate = model.contactDate instanceof Date ? yufp.util.dateFormat(model.contactDate, '{y}-{m}-{d}') : yufp.util.dateFormat(new Date(model.contactDate), '{y}-{m}-{d}');
            yufp.service.request({
              method: 'POST',
              url: '/api/infoworkreport/addCustContact',
              data: model,
              callback: function (code, message, response) {
                if (code === 0) {
                  _this.dialogVisibleAdd = false;
                  _this.$emit('butLog', '客户360:接触历史:' + yufp.localStorage.get('custInfo').custId, '手工新增接触历史');
                  _this.$message('操作成功');
                  _this.getTouchHistoryInfo();
                  _this.$refs.tableQ.remoteData();
                }
              }
            });
          }
        }
        ],
        dialogVisibleUpdate: false,
        updateFields: [{
          columnCount: 2,
          fields: [{
            label: '接触日期',
            field: 'contactDate',
            rules: [{ required: true, message: '必填项', trigger: 'blur' }],
            type: 'date',
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              }
            }
          },
          {
            label: '接触类型',
            field: 'contactType',
            rules: [
              { required: true, message: '必填项', trigger: 'blur' },
            ],
            type: 'select',
            dataCode: 'DY0006'
          }
          ]
        }, {
          columnCount: 2,
          fields: [{
            label: '接触目的',
            field: 'contactGoal',
            rules: [{ required: true, message: '必填项', trigger: 'blur' }],
            type: 'select',
            dataCode: 'DY0005'
          },
          {
            label: '产品',
            field: 'product',
            type: 'input'
          }
          ]
        }, {
          columnCount: 1,
          fields: [{
            label: '接触反馈',
            field: 'contactBack',
            type: 'textarea'
          }
          ]
        }
        ],
        updateButtons: [{
          label: '取消',
          type: 'primary',
          icon: 'yx-undo2',
          hidden: false,
          click: function (model) {
            _this.dialogVisibleUpdate = false;
          }
        },
        {
          label: '保存',
          type: 'primary',
          icon: 'check',
          hidden: false,
          click: function (model) {
            var validate;
            _this.$refs.refformUpdate.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            model.contactCustId = yufp.localStorage.get('custInfo').custId;
            model.contactCustName = yufp.localStorage.get('custInfo').custName;
            model.contactDate = model.contactDate instanceof Date ? yufp.util.dateFormat(model.contactDate, '{y}-{m}-{d}') : yufp.util.dateFormat(new Date(model.contactDate), '{y}-{m}-{d}');
            yufp.service.request({
              method: 'POST',
              url: '/api/infoworkreport/updateCustContact',
              data: model,
              callback: function (code, message, response) {
                if (code === 0) {
                  _this.dialogVisibleUpdate = false;
                  _this.$emit('butLog', '客户360:接触历史:' + yufp.localStorage.get('custInfo').custId, '手工编辑接触历史');
                  _this.$message('操作成功');
                  _this.getTouchHistoryInfo();
                  _this.$refs.tableQ.remoteData();
                }
              }
            });
          }
        }
        ]
      };
    },

    created: function () {
      this.getTouchHistoryInfo();
    },

    methods: {
      getTouchHistoryInfo: function () {
        let _this = this;
        let custId = yufp.localStorage.get('custInfo').custId;
        yufp.service.request({
          method: 'GET',
          url: backend.adminService + '/api/touchinfoworkreport/querylist',
          data: {
            condition: JSON.stringify({ custId: custId })
            // condition: JSON.stringify({userId: 1070515349})
          },
          callback: function (code, message, response) {
            if (code === 0) {
              let data = response.data;
              // for (let key in data.baseInfo) {
              //   if (!baseInfo[key]) {
              //     baseInfo[key] = '-';
              //   }
              // }
              _this.baseInfo = data.baseInfo;
              _this.visitInfoDetail = data.visitInfoDetail;
              _this.visitInfo = data.visitInfo;
            }
          }
        });
      },

      returnUpOrDown: function (data) {
        if (data) {
          return parseInt(data) > 0 ? 'el-icon-caret-top red' : 'el-icon-caret-bottom green';
        }
      },

      handleClick: function (data) {
        this.$emit('detail-touch', data);
      },

      addFn: function () {
        var _this = this;
        _this.dialogVisibleAdd = true;
      },

      modify: function (data) {
        var _this = this;
        _this.dialogVisibleUpdate = true;
        _this.$nextTick(function () {
          yufp.extend(_this.$refs.refformUpdate.formModel, data);
        })
      },

      deleteRow: function (customerContactId) {
        var _this = this;
        _this.$confirm('此操作将永久删除1条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
          callback: function (action) {
            if (action === 'confirm') {
              yufp.service.request({
                method: 'GET',
                url: '/api/infoworkreport/deleteCustContact',
                data: { customerContactId: customerContactId },
                callback: function (code, message, response) {
                  if (code === 0) {
                    _this.$emit('butLog', '客户360:接触历史:' + yufp.localStorage.get('custInfo').custId, '删除接触历史');
                    _this.$message('操作成功');
                    _this.getTouchHistoryInfo();
                    _this.$refs.tableQ.remoteData();
                  }
                }
              });
            }
          }
        })
      }
    }
  });
}(Vue, 'touch-history'));