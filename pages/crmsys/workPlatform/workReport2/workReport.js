/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2019-1-17 16:45:15.
 * @updated by
 * @description 工作报告
 */
define([
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/YufpMgrSelector.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0335,CRUD_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          addButton: !yufp.session.checkCtrl('add'),
          updButton: !yufp.session.checkCtrl('upd'),
          delButton: !yufp.session.checkCtrl('del'),
          viewButton: !yufp.session.checkCtrl('view'),
          dataUrl: backend.workreportService + '/api/infoworkreport/querylist',
          listdata: [],
          formdata: {},
          dateDisabled: true,
          rule: {
            workReportBusiType: [
              {required: true, message: '字段不能为空', trigger: 'change'}
            ],
            reportDate: 'required',
            max300Len: [
              {max: 300, message: '最大长度不超过300个字符', trigger: 'blur' }
            ],
            max50Len: [
              {max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
            ]
          },
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          isAddDialog: false,
          isModifyDialog: false,
          isInfoDialog: false,
          isDayType: true,
          isWeekType: false,
          isMonthType: false,
          isRepeat: false, // 新增报告时， 报告人 报告周期内是否已存在工作报告
          isOld: false
        };
      },
      methods: {
        /**
         * 公共方法：清空obj对象
         */
        formJE: function (row, column, cellValue) {
          cellValue = yufp.util.dateFormat(cellValue, '{y}-{m}-{d}');
          return cellValue;
        },
        clearObj: function (obj) {
          for (var key in obj) {
            obj[key] = null;
          }
          return obj;
        },
        /**
         * 公共方法：设置 业务类型 参数值
         */
        setBusiTypeParam: function (isDayType, isWeekType, isMonthType) {
          this.isDayType = isDayType;
          this.isWeekType = isWeekType;
          this.isMonthType = isMonthType;
        },
        /**
         * 公共方法：设置 弹窗类型 参数值
         */
        setDialogTypeParam: function (isAddDialog, isModifyDialog, isInfoDialog) {
          this.isAddDialog = isAddDialog;
          this.isModifyDialog = isModifyDialog;
          this.isInfoDialog = isInfoDialog;
        },
        /**
         * 格式化日期：yyyy-MM-dd
         */
        formatDate: function (date) {
          var myyear = date.getFullYear();
          var mymonth = date.getMonth() + 1;
          var myweekday = date.getDate();
          if (mymonth < 10) {
            mymonth = '0' + mymonth;
          }
          if (myweekday < 10) {
            myweekday = '0' + myweekday;
          }
          return myyear + '-' + mymonth + '-' + myweekday;
        },
        /**
         * date所在周的周一、周日 日期
         * dateStr : yyyy-MM-dd
         */
        getMonDayAndSunDay: function (dateStr) {
          if (!dateStr) {
            return;
          }
          var dateValue = dateStr;
          var arr = dateValue.split('-');
          // 月份-1 因为月份从0开始 构造一个Date对象
          var date = new Date(arr[0], arr[1] - 1, arr[2]);
          var dateOfWeek = date.getDay();// 返回当前日期的在当前周的某一天（0～6--周日到周一）
          var dateOfWeekInt = parseInt(dateOfWeek, 10);// 转换为整型
          if (dateOfWeekInt == 0) { // 如果是周日
            dateOfWeekInt = 7;
          }
          var aa = 7 - dateOfWeekInt;// 当前于周末相差的天数
          var temp2 = parseInt(arr[2], 10);// 按10进制转换，以免遇到08和09的时候转换成0
          var sunDay = temp2 + aa;// 当前日期的周日的日期
          var monDay = sunDay - 6;// 当前日期的周一的日期
          var startDate = new Date(arr[0], arr[1] - 1, monDay);
          var endDate = new Date(arr[0], arr[1] - 1, sunDay);
          var sm = parseInt(startDate.getMonth()) + 1;// 月份+1 因为月份从0开始
          var em = parseInt(endDate.getMonth()) + 1;
          if (sm < 10) {
            sm = '0' + sm;
          }
          if (em < 10) {
            em = '0' + em;
          }
          var smDate = startDate.getDate();
          var emDate = endDate.getDate();
          if (smDate < 10) {
            smDate = '0' + smDate;
          }
          if (emDate < 10) {
            emDate = '0' + emDate;
          }
          var start = startDate.getFullYear() + '-' + sm + '-' + smDate;
          var end = endDate.getFullYear() + '-' + em + '-' + emDate;
          var result = [];
          result.push(start);
          result.push(end);
          return result;
        },
        /**
         * date所在月的开始日期、结束日期
         * params: date 日期类型 或 yyyy-MM-dd字符串
         */
        getStatDayAndEndDayInMonth: function (date) {
          if (!date) {
            return;
          }
          if (!(date instanceof Date)) {
            if (date.length != 10) {
              return;
            } else {
              var arr = date.split('-');
              date = new Date(arr[0], arr[1] - 1, arr[2]);
            }
          }
          var selYear = date.getFullYear();
          var selMonth = date.getMonth();
          var nextMonDate = new Date(selYear, selMonth + 1, 1);
          var start = new Date(selYear, selMonth, 1);
          var days = (nextMonDate - start) / (1000 * 60 * 60 * 24);
          var end = new Date(selYear, selMonth, days);
          var result = [];
          result.push(this.formatDate(start));
          result.push(this.formatDate(end));
          return result;
        },
        /**
         * 更改 查询项 报告业务类型 值
         */
        chgSelBusiType: function (val) {
          var _this = this;
          var result = [];
          if (val == '2') { // 周报
            _this.setBusiTypeParam(false, true, false);
            if (_this.formdata.reportDate) {
              result = _this.getMonDayAndSunDay(_this.formatDate(_this.formdata.reportDate));
              _this.formdata.startDate = result[0];
              _this.formdata.endDate = result[1];
            }
          } else if (val == '3') { // 月报
            _this.setBusiTypeParam(false, false, true);
            if (_this.formdata.reportDate) {
              result = _this.getStatDayAndEndDayInMonth(_this.formdata.reportDate);
              _this.formdata.startDate = result[0];
              _this.formdata.endDate = result[1];
            }
          } else { // 默认 日报
            _this.setBusiTypeParam(true, false, false);
            if (_this.formdata.reportDate) {
              result.push(_this.formatDate(_this.formdata.reportDate));
              result.push(_this.formatDate(_this.formdata.reportDate));
              _this.formdata.startDate = _this.formatDate(_this.formdata.reportDate);
              _this.formdata.endDate = _this.formatDate(_this.formdata.reportDate);
            }
          }
        },
        /**
         * 更改 dialog 报告业务类型 值
         */
        chgBusiType: function (val) {
          var _this = this;
          var result = [];
          var nowDate = new Date();
          nowDate = _this.formatDate(nowDate);
          if (val == '2') { // 周报
            _this.setBusiTypeParam(false, true, false);
            _this.dateDisabled = false;
            if (_this.formdata.reportDate) {
              result = _this.getMonDayAndSunDay(_this.formdata.reportDate instanceof Date ? _this.formatDate(_this.formdata.reportDate) : _this.formatDate(new Date(_this.formdata.reportDate)));
              _this.formdata.startDate = result[0];
              _this.formdata.endDate = result[1];
              if (nowDate > result[1]) {
                _this.isOld = true;
              } else {
                _this.isOld = false;
              }
            }
          } else if (val == '3') { // 月报
            _this.setBusiTypeParam(false, false, true);
            _this.dateDisabled = false;
            if (_this.formdata.reportDate) {
              result = _this.getStatDayAndEndDayInMonth(_this.formdata.reportDate);
              _this.formdata.startDate = result[0];
              _this.formdata.endDate = result[1];
              if (nowDate > result[1]) {
                _this.isOld = true;
              } else {
                _this.isOld = false;
              }
            }
          } else { // 默认 日报
            _this.setBusiTypeParam(true, false, false);
            /** if (_this.formdata.reportDate) {
              result.push(_this.formdata.reportDate instanceof Date ? _this.formatDate(_this.formdata.reportDate) : _this.formdata.reportDate);
              result.push(_this.formdata.reportDate instanceof Date ? _this.formatDate(_this.formdata.reportDate) : _this.formdata.reportDate);
              _this.formdata.startDate = _this.formdata.reportDate instanceof Date ? _this.formatDate(_this.formdata.reportDate) : _this.formdata.reportDate;
              _this.formdata.endDate = _this.formdata.reportDate instanceof Date ? _this.formatDate(_this.formdata.reportDate) : _this.formdata.reportDate;
            }**/
            _this.formdata.startDate = _this.formdata.reportDate instanceof Date ? _this.formatDate(_this.formdata.reportDate) : _this.formdata.reportDate;
            _this.formdata.endDate = _this.formdata.reportDate instanceof Date ? _this.formatDate(_this.formdata.reportDate) : _this.formdata.reportDate;
            _this.dateDisabled = true;
          }
          // 新增工作报告， 需校验是否存在相同报告周期内的报告
          if ((_this.formdata.workReportId == null || _this.formdata.workReportId == '') &&
              _this.formdata.reportDate != null) {
            yufp.service.request({
              method: 'GET',
              url: backend.workreportService + '/api/infoworkreport/chkdata',
              data: {
                reporterId: yufp.session.user.loginCode,
                workReportBusiType: _this.formdata.workReportBusiType != null ? _this.formdata.workReportBusiType : '',
                reportDate: _this.formdata.reportDate instanceof Date ? _this.formatDate(_this.formdata.reportDate) : _this.formdata.reportDate
              },
              callback: function (code, message, response) {
                if (response.code == 0) {
                  if (response.data > 0) {
                    _this.isRepeat = true;
                    _this.$message({ message: '已存在相同报告周期的报告，请重新选择！', type: 'warning' });
                    return;
                  } else {
                    _this.isRepeat = false;
                  }
                }
              }
            });
          }
        },
        /**
         * 报告生成日期 更改
         */
        chgRptDate: function (val) {
          if (val && this.formdata.workReportBusiType == null) {
            this.$message({ message: '请先选择报告业务类型', type: 'warning' });
            return;
          }
          this.chgBusiType(this.formdata.workReportBusiType);
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 针对 周报，将周一~周日工作内容合并到workContent字段中
          if (model.workReportBusiType == '2') {
            model.workContent = (model.monContent == null ? '' : model.monContent) + '$' +
                                (model.tuesContent == null ? '' : model.tuesContent) + '$' +
                                (model.wedContent == null ? '' : model.wedContent) + '$' +
                                (model.thurContent == null ? '' : model.thurContent) + '$' +
                                (model.friContent == null ? '' : model.friContent) + '$' +
                                (model.satContent == null ? '' : model.satContent) + '$' +
                                (model.sunContent == null ? '' : model.sunContent);
          }
          if (model.workReportId != null && model.workReportId != '') {
            // 修改请求
            yufp.service.request({
              method: 'POST',
              url: backend.workreportService + '/api/infoworkreport/updatecontent',
              data: {
                workReportId: model.workReportId,
                workContent: model.workContent,
                workDifficulty: model.workDifficulty,
                workSummary: model.workSummary
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                  _this.dialogVisible = false;
                }
              }
            });
          } else {
            if (_this.isRepeat) {
              _this.$message({ message: '已存在相同报告周期的报告，请重新选择！', type: 'warning' });
              return;
            }
            if (_this.isOld) {
              _this.$message({ message: '不能新增本周或本月之前的工作报告，请重新选择！', type: 'warning' });
              return;
            }
            // 生成 报告人 报告人机构 报告周期 是否删除 法人 数据
            model.reporterId = yufp.session.user.loginCode;
            model.reporterName = yufp.session.userName;
            model.reporterOrg = yufp.session.org.code;
            model.reporterOrgName = yufp.session.org.name;
            model.reporterCycle = model.startDate + '$' + model.endDate;
            model.isDelete = 'N';
            model.reportDate = _this.formdata.reportDate instanceof Date ? _this.formatDate(_this.formdata.reportDate) : _this.formdata.reportDate;
            // 新增请求
            yufp.service.request({
              method: 'POST',
              url: backend.workreportService + '/api/infoworkreport/add',
              data: model,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                  _this.dialogVisible = false;
                }
              }
            });
          }
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.setBusiTypeParam(true, false, false);
          _this.setDialogTypeParam(true, false, false);
          var nowDate = new Date();
          nowDate = _this.formatDate(nowDate);
          _this.formdata.startDate = '';
          _this.formdata.endDate = '';
          _this.isRepeat = false;
          _this.$nextTick(function () {
            _this.clearObj(_this.formdata);
            _this.$refs.refForm.resetFields();
            _this.formdata.reportDate = nowDate;
            _this.formdata.workReportBusiType = '1';
            _this.formdata.startDate = nowDate;
            _this.formdata.endDate = nowDate;
          });
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].reporterId != yufp.session.user.loginCode) {
            _this.$message({ message: '只能修改报告人是自己的数据', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);
          _this.setDialogTypeParam(false, true, false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            var obj = selections[0];
            if (obj.workReportBusiType == '2' &&
                obj.workContent != null && obj.workContent != '') {
              var workContents = obj.workContent.split('$');
              if (workContents.length == 7) {
                _this.formdata.monContent = workContents[0];
                _this.formdata.tuesContent = workContents[1];
                _this.formdata.wedContent = workContents[2];
                _this.formdata.thurContent = workContents[3];
                _this.formdata.friContent = workContents[4];
                _this.formdata.satContent = workContents[5];
                _this.formdata.sunContent = workContents[6];
              }
            }
            yufp.clone(obj, _this.formdata);
            // _this.chgBusiType(obj.workReportBusiType);
          });
        },

        rowDblClick: function (row, event) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.setDialogTypeParam(false, false, true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(row, _this.formdata);
            if (row.workReportBusiType == '2' &&
            row.workContent != null && row.workContent != '') {
              var workContents = row.workContent.split('$');
              if (workContents.length == 7) {
                _this.formdata.monContent = workContents[0];
                _this.formdata.tuesContent = workContents[1];
                _this.formdata.wedContent = workContents[2];
                _this.formdata.thurContent = workContents[3];
                _this.formdata.friContent = workContents[4];
                _this.formdata.satContent = workContents[5];
                _this.formdata.sunContent = workContents[6];
              }
            }
            _this.chgBusiType(row.workReportBusiType);
          });
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
          _this.setDialogTypeParam(false, false, true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], _this.formdata);
            if (selectionsAry[0].workReportBusiType == '2' &&
            selectionsAry[0].workContent != null && selectionsAry[0].workContent != '') {
              var workContents = selectionsAry[0].workContent.split('$');
              if (workContents.length == 7) {
                _this.formdata.monContent = workContents[0];
                _this.formdata.tuesContent = workContents[1];
                _this.formdata.wedContent = workContents[2];
                _this.formdata.thurContent = workContents[3];
                _this.formdata.friContent = workContents[4];
                _this.formdata.satContent = workContents[5];
                _this.formdata.sunContent = workContents[6];
              }
            }
            _this.chgBusiType(selectionsAry[0].workReportBusiType);
            /**   yufp.service.request({
              method: 'GET',
              url: backend.workreportService + '/api/infoworkreport/querydetail',
              data: { workReportId: selectionsAry[0].workReportId },
              callback: function (code, message, response) {
                if (response.code == 0) {
                  if (response.data[0].workReportBusiType == '2' &&
                    response.data[0].workContent != null && response.data[0].workContent != '') {
                    var workContents = response.data[0].workContent.split('$');
                    if (workContents.length == 7) {
                      _this.formdata.monContent = workContents[0];
                      _this.formdata.tuesContent = workContents[1];
                      _this.formdata.wedContent = workContents[2];
                      _this.formdata.thurContent = workContents[3];
                      _this.formdata.friContent = workContents[4];
                      _this.formdata.satContent = workContents[5];
                      _this.formdata.sunContent = workContents[6];
                    }
                  }
                  yufp.clone(response.data[0], _this.formdata);
                  _this.chgBusiType(selectionsAry[0].workReportBusiType);
                }
              }
            });**/
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            if (selections[i].reporterId != yufp.session.user.loginCode) {
              _this.$message({ message: '只能删除报告人是自己的数据', type: 'warning' });
              return;
            }
            arr.push(selections[i].workReportId);
          }
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.workreportService + '/api/infoworkreport/delete',
                  data: arr.join(','),
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _this.$refs.refTable.remoteData();
                      _this.$message('操作成功');
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
  };
});