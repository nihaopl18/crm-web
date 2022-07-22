/**
 * @Created by panglx panglx@yusys.com.cn on 2018-12-28 17:06:48.
 * @updated by chenlin
 * @description 积分活动中的规则配置
 */
define([
  'pages/climp/scoreActivity/ruleConfig/ruleConfig.css',
  './custom/widgets/js/yufpGoodsSelector.js',
  './custom/widgets/js/yufpVitureSelector.js'
], function (require, exports) {
  /**
  * 页面加载完成时触发
  * @param hashCode 路由ID
  * @param data 传递数据对象
  * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    var activityModel = data;
    var activityId = data.activityId;
    var wfApprSts = data.wfApprSts;
    var checkCalculate = function (rule, value, callback) {
      var reg = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/;
      if (!value) {
        return callback(new Error('请输入分值'));
      }
      if (!reg.test(value)) {
        callback(new Error('分值必须是整数或者两位小数的数字'));
      } else {
        callback();
      }
    };
    var transactionCode = data.transactionCode;
    yufp.lookup.reg('CONFLICT_TYPE,SCORE_TYPE,MAXSCORE_TYPE,RULE_ACTION_WAY,IF_FLAG,VALID_DATE_MODE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          fields: [], // 规则化字段（交易流水表）
          props: {
            key: 'fieldEName',
            value: 'fieldCName'
          },
          loyrequired: 'required',
          ruleParams: [], // 引用参数字段
          actionType: '', // 动作类型
          isScoreToDisabled: false,
          height: yufp.frame.size().height,
          isCollapseShow: false, // 折叠面板是否显示
          ruleFlag: false, // 新增、修改、删除是否可见
          notCheckFlag: false, // 是否为查看状态
          ruleInfoFormdata: {}, // 规则信息表单数据
          formulaWayFormdata: {}, // 计算方式表单数据
          formulaWayFormdata1: {},
          formulaWayFormdata2: {},
          actionConfigFormdata: {}, // 动作配置表单数据
          scoreConditionFormdata: {}, // 积分条件表单数据
          referenceParamdata: {}, // 引用参数表单数据
          expandCollapseName: ['ruleInfo', 'scoreCondition', 'formulaWay', 'actionConfig'], // 折叠面板展开项目
          activeName: 'referenceParam',
          tableDataUrl: backend.adminService + '/api/ruleinfo/list', // 活动规则查询url
          poolDataUrl: backend.adminService + '/api/pool/activitypool', // 积分池查询接口
          transactionCodeDataUrl: backend.adminService + '/api/transactioncategory/searchtranscode', // 交易类型下拉选项接口
          transTypeItem: [],
          baseParams: {
            condition: JSON.stringify({
              activityId: activityId
            })
          }, // 活动规则查询参数,
          actyBaseParams: {
            activityId: activityId
          },
          templateDataArr1: {
            title: '积分条件',
            collapse: true,
            fields: []
          },
          templateDataArr2: {
            title: '引用参数',
            collapse: true,
            fields: []
          },
          conditionTemplateData: [], // 积分条件动态表单数据
          referenceParamTemplateData: [], // 积分条件动态表单数据
          scoreConditionFormItems: [], // 积分条件表单数据数组
          referenceParamFormItems: [], // 引用参数表单数据数组
          alreadyField: false, // 规则化字段与引用参数字段是否已经生成，默认为false
          isHiddenByFixedScore: true, // 是否在按固定分值计算方式时隐藏
          isHiddenByAccount: true, // 是否按金额计算方式的时隐藏
          isHiddenBySection: true, // 是否按区间计算方式的时隐藏
          isHiddenByFormula: false, // 是否按公式计算方式的时隐藏
          isHiddenByFixedScore1: true, // 是否在按固定分值计算方式时隐藏
          isHiddenByAccount1: true, // 是否按金额计算方式的时隐藏
          isHiddenBySection1: true, // 是否按区间计算方式的时隐藏
          isHiddenByFormula1: false, // 是否按公式计算方式的时隐藏
          isHiddenByFixedScore2: true, // 是否在按固定分值计算方式时隐藏
          isHiddenByAccount2: true, // 是否按金额计算方式的时隐藏
          isHiddenBySection2: true, // 是否按区间计算方式的时隐藏
          isHiddenByFormula2: false, // 是否按公式计算方式的时隐藏
          isHiddenByTicket: false, // 虚拟票券是否隐藏
          isHiddenByGift: false, // 实物礼品是否隐藏
          isHiddenByLoy: true, // 积分账户是否隐藏
          sectionTableData: [], // 按区间计算方式的表格数据
          sectionTableData1: [], // 按区间计算方式的表格数据
          sectionTableData2: [], // 按区间计算方式的表格数据
          sectionTableRule: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '字段必须为不超过15位的数字' }],
          buttonList: [['<—', '清空', '字段选择', '/'], ['1', '2', '3', '+'], ['4', '5', '6', '-'], ['7', '8', '9', '*'], ['.', '0', '(', ')']],
          fieldSelectDialogVisible: false, // 字段选择弹框是否显示
          fieldSelectDataUrl: backend.adminService + '/api/ruleinfo/querynumtranscode', // 字段选择查询url
          validDateDataUrl: backend.adminService + '/api/ruleinfo/validdatecode', // 有效期查询url
          actionUrl: backend.adminService + '/api/ruleinfo/getruleaction', // 多动作查询url
          fieldSelectBaseParams: {
            transactionCode: transactionCode
          }, // 字段列表选择参数
          accountNoDataUrl: backend.adminService + '/api/acct/acctstsquery', // 积分账户查询url
          accountNoDataParams: {
            acctTypeId: '1'
          }, // 积分账户查询参数
          accountNoDataParams1: {
            acctTypeId: '2'
          }, // 积分账户查询参数
          accountNoDataParams2: {
            acctTypeId: '3'
          }, // 积分账户查询参数
          options: [],
          fixedRule: '',
          accountRule: '',
          sectionRule: '',
          formulaWayRule: '',
          fixedRule1: '',
          accountRule1: '',
          sectionRule1: '',
          formulaWayRule1: '',
          fixedRule2: '',
          accountRule2: '',
          sectionRule2: '',
          formulaWayRule2: '',
          isSaveBtnDisabled: false,
          scoreCheckDialogVisible: false, // 积分校验弹框
          scoreCheckDataUrl: backend.adminService + '/api/ruleinfo/verificationactivity', // 积分校验url
          ruleCheckDialogVisible: false, // 规则校验弹框
          ruleCheckTableData: []
        };
      },
      mounted: function () {
        var _this = this;
        this.queryFieldParams(); // 加载规则化字段及引用参数
        // 交易类型查询
        yufp.service.request({
          method: 'GET',
          url: _this.transactionCodeDataUrl,
          callback: function (code, message, response) {
            if (code == 0) {
              var data = response.data;
              if (data.length) {
                for (var i = 0; i < data.length; i++) {
                  _this.transTypeItem.push(data[i]);
                }
              }
            }
          }
        });
        // 当审批状态为审批中，修改、新增、删除不可见
        if (wfApprSts == '111') {
          this.ruleFlag = false;
        } else {
          this.ruleFlag = true;
        }
      },
      methods: {
        // 日期格式化
        dateFormatter: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
        },
        // 表格中的下拉选项格式化
        selectFormatter: function (row, column) {
          var val = row[column.property];
          var len = this.transTypeItem.length;
          if (val === undefined || !len) {
            return '';
          }
          for (var i = 0; i < len; i++) {
            if (this.transTypeItem[i].key == val) {
              return this.transTypeItem[i].value;
            }
          }
        },
        /**
         * 查询条件字段及引用参数
         * @param  transactionCode 此参数必须先设置
         */
        queryFieldParams: function () {
          var _this = this;
          // 字段查询
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/ruleinfo/querytranscode',
            data: {
              transactionCode: transactionCode
            },
            callback: function (code, message, response) {
              if (code == 0) {
                _this.fields = response.data;
              }
            }
          });
          // 引用参数查询
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/ruleinfo/queryruleparams',
            callback: function (code, message, response) {
              if (code == 0) {
                _this.ruleParams = response.data;
              }
            }
          });
        },
        /**
         * 新增、修改、查看时重置ruleFormPanel的内容
         */
        resetRuleFormPanel: function () {
          var _this = this;
          _this.isCollapseShow = true;
          _this.$refs.refRuleInfoForm.resetFields();
          _this.templateDataArr1.fields = [];
          _this.templateDataArr2.fields = [];
          _this.conditionTemplateData = [];
          _this.referenceParamTemplateData = [];
          _this.scoreConditionFormItems = [];
          _this.referenceParamFormItems = [];
          _this.sectionTableData.splice(0);
          _this.sectionTableData1.splice(0);
          _this.sectionTableData2.splice(0);
          _this.$refs.refFormulaWayForm.resetFields();
          _this.$refs.refFormulaWayForm1.resetFields();
          _this.$refs.refFormulaWayForm2.resetFields();
          _this.formulaWayFormdata.formulaWay = '1';
          _this.formulaWayFormdata1.formulaWay = '1';
          _this.formulaWayFormdata2.formulaWay = '1';
          // _this.ruleActionChangeFn(['1']);
          _this.formulaWayChangeFn('1');
          _this.formulaWayChangeFn1('1');
          _this.formulaWayChangeFn2('1');
          _this.$refs.refActionConfigForm.resetFields();
          _this.actionConfigFormdata.ruleAction = ['1'];
        },
        /**
         * 保存删除成功时重置ruleFormPanel的内容
         */
        resetRuleForm: function () {
          this.$refs.refRuleInfoForm.resetFields();
          this.$refs.refFormulaWayForm.resetFields();
          this.$refs.refFormulaWayForm1.resetFields();
          this.$refs.refFormulaWayForm2.resetFields();
          this.$refs.refActionConfigForm.resetFields();
          this.formulaWayFormdata.formulaWay = '1';
          this.formulaWayFormdata1.formulaWay = '1';
          this.formulaWayFormdata2.formulaWay = '1';
          this.actionConfigFormdata.ruleAction = ['1'];
          this.formulaWayChangeFn('1');
          this.formulaWayChangeFn1('1');
          this.formulaWayChangeFn2('1');
          this.sectionTableData.splice(0);
          this.sectionTableData1.splice(0);
          this.sectionTableData2.splice(0);
          this.$refs['conditionForm'].resetFields();
          this.$refs['referenceParamForm'].resetFields();
        },
        /**
         * 生成form单个展现的字段
         * @param fieldObj对象
         * @param isFieldForm 是否积分条件表单
         */
        getConditionField: function (fieldObj, isFieldForm) {
          var option = {};
          var fieldType = fieldObj.fieldType;
          var fname = fieldObj.fname;
          var fieldEName = fieldObj.fieldEName;
          var magnifier = fieldObj.magnifier;
          var label = fieldObj.fieldCName;
          option.label = label;
          option.name = fieldEName;
          option.operatorName = '$_' + fieldEName;
          option.numberfield = fieldEName + '_GT';
          if (fieldType == '1') {
            option.ctype = 'input';
            option.isHidden = true;
            option.operatorDataCode = 'TEXT_STORE';
            option.comboSelectDataCode = '';
          } else if (fieldType == '2') {
            option.ctype = 'input';
            option.isHidden = false;
            option.operatorDataCode = 'NUMDATE_STORE';
            option.comboSelectDataCode = '';
          } else if (fieldType == '3') {
            option.ctype = 'datepicker';
            option.isHidden = false;
            option.operatorDataCode = 'NUMDATE_STORE';
            option.comboSelectDataCode = '';
          } else if (fieldType == '4') {
            option.ctype = 'select';
            option.isHidden = true;
            option.operatorDataCode = 'SELECT_STORE';
            option.comboSelectDataCode = fname;
          } else if (fieldType == '5') {
            option.ctype = 'radio';
            option.isHidden = true;
            option.operatorDataCode = 'SELECT_STORE';
            option.comboSelectDataCode = fname;
          } else if (fieldType == '6') {
            option.ctype = 'checkbox';
            option.isHidden = true;
            option.operatorDataCode = 'COMBOSELECT_STORE';
            option.comboSelectDataCode = fname;
          } else if (fieldType == '7') {
            option.ctype = magnifier;
            option.isHidden = true;
            option.operatorDataCode = 'COMBOSELECT_STORE';
          }
          isFieldForm && this.scoreConditionFormItems.push(option); // 生成积分条件表单formItem数组
          !isFieldForm && this.referenceParamFormItems.push(option); // 生成引用参数表单formItem数组
        },
        /**
         * 监听操作符值的改变
         *  @param ref属性表示当前表单对象ref
         *  @param field表示动态表单字段数据
         *  @param groupfield表示组内的字段对象
         *  @param xdynamicfield表示表单类的字段对象
         */
        operatorChangeFn: function (ref, field, groupfield, xdynamicfield) {
          for (var i = 0, len = Math.ceil(groupfield.length / 3); i < len; i++) {
            var index1 = 3 * i;
            var index2 = (3 * i) + 1;
            var index3 = (3 * i) + 2;
            if (groupfield[index1] && groupfield[index1].dataCode && groupfield[index1].dataCode == 'NUMDATE_STORE') {
              if ((Number(field[groupfield[index1].field]) > 6) || (Number(field[groupfield[index1].field]) == 0)) {
                ref.$set(groupfield, index3, { field: groupfield[index3].field, label: groupfield[index3].label, colspan: groupfield[index3].colspan, ctype: groupfield[index3].ctype, labelWidth: groupfield[index3].labelWidth, hidden: groupfield[index3].hidden, disabled: false });
              } else {
                ref.$set(groupfield, index3, { field: groupfield[index3].field, label: groupfield[index3].label, colspan: groupfield[index3].colspan, ctype: groupfield[index3].ctype, labelWidth: groupfield[index3].labelWidth, hidden: groupfield[index3].hidden, disabled: true });
                ref.formdata[groupfield[index3].field] = '';
              }
            }
            if (field.hasOwnProperty('$_IS_BIRTH_DAY') && field.hasOwnProperty('$_IS_BIRTH_MONTH')) {
              if ((field.$_IS_BIRTH_DAY && groupfield[i].field == '$_IS_BIRTH_MONTH') || (field.$_IS_BIRTH_MONTH && groupfield[i].field == '$_IS_BIRTH_DAY')) {
                ref.$set(groupfield, i, { field: groupfield[i].field, label: groupfield[i].label, colspan: groupfield[i].colspan, ctype: groupfield[i].ctype, labelWidth: groupfield[i].labelWidth, hidden: groupfield[i].hidden, linkage: groupfield[i].linkage, disabled: true });
                ref.$set(groupfield, i + 1, { field: groupfield[i + 1].field, label: groupfield[i + 1].label, colspan: groupfield[i + 1].colspan, ctype: groupfield[i + 1].ctype, labelWidth: groupfield[i + 1].labelWidth, hidden: groupfield[i + 1].hidden, disabled: true });
              }
              if ((!field.$_IS_BIRTH_DAY && groupfield[i].field == '$_IS_BIRTH_MONTH') || (!field.$_IS_BIRTH_MONTH && groupfield[i].field == '$_IS_BIRTH_DAY')) {
                ref.$set(groupfield, i, { field: groupfield[i].field, label: groupfield[i].label, colspan: groupfield[i].colspan, ctype: groupfield[i].ctype, labelWidth: groupfield[i].labelWidth, hidden: groupfield[i].hidden, linkage: groupfield[i].linkage, disabled: false });
                ref.$set(groupfield, i + 1, { field: groupfield[i + 1].field, label: groupfield[i + 1].label, colspan: groupfield[i + 1].colspan, ctype: groupfield[i + 1].ctype, labelWidth: groupfield[i + 1].labelWidth, hidden: groupfield[i + 1].hidden, disabled: false });
              }
            }

            if (groupfield[index2] && groupfield[index2].ctype == 'radio') {
              if (ref.formdata[groupfield[index1].field] == '') {
                ref.formdata[groupfield[index2].field] = '';
              };
            }
            // input,datepicker,select,radio,checkbox
            if (groupfield[index2] && (groupfield[index2].ctype != 'input' && groupfield[index2].ctype != 'datepicker' && groupfield[index2].ctype != 'select' && groupfield[index2].ctype != 'radio' && groupfield[index2].ctype != 'checkbox')) {
              if (ref.formdata[groupfield[index1].field] == '') {
                ref.formdata[groupfield[index2].field] = '';
              };
            }
          }
        },
        /**
         * 生成动态表单数据
         * @param formItems
         * @param isFieldForm 是否积分条件表单
         */
        getTemplateData: function (formItems, isFieldForm) {
          var _this = this;
          var len = formItems.length;
          if (len > 0) {
            var conditionFields = [];
            for (var i = 0; i < len; i++) {
              var formItem = [{}, {}, {}];
              formItem[0].label = formItems[i].label;
              formItem[0].field = formItems[i].operatorName;
              formItem[0].dataCode = formItems[i].operatorDataCode;
              formItem[0].ctype = 'select';
              formItem[0].labelWidth = '160px';
              formItem[0].hidden = false;
              formItem[0].linkage = _this.operatorChangeFn;
              formItem[1].label = '';
              formItem[1].field = formItems[i].name;
              formItem[1].dataCode = formItems[i].comboSelectDataCode;
              formItem[1].ctype = formItems[i].ctype;
              formItem[1].labelWidth = '20px';
              formItem[1].hidden = false;
              formItem[2].label = '至';
              formItem[2].labelWidth = '50px';
              formItem[2].field = formItems[i].numberfield;
              formItem[2].dataCode = formItems[i].comboSelectDataCode;
              formItem[2].ctype = formItems[i].ctype;
              formItem[2].hidden = formItems[i].isHidden;
              if (formItem[2].hidden) {
                formItem[0].colspan = 13;
                formItem[1].colspan = 11;
              } else {
                formItem[0].colspan = 13;
                formItem[1].colspan = 5;
                formItem[2].colspan = 6;
              }
              conditionFields.push(formItem);
            }
            for (var j = 0; j < conditionFields.length; j++) {
              for (var k = 0; k < 3; k++) {
                var option = {};
                option.label = conditionFields[j][k].label;
                option.field = conditionFields[j][k].field;
                option.dataCode = conditionFields[j][k].dataCode;
                option.ctype = conditionFields[j][k].ctype;
                option.labelWidth = conditionFields[j][k].labelWidth;
                option.hidden = conditionFields[j][k].hidden;
                option.colspan = conditionFields[j][k].colspan;
                option.linkage = conditionFields[j][k].linkage || '';
                isFieldForm && _this.templateDataArr1.fields.push(option);
                !isFieldForm && _this.templateDataArr2.fields.push(option);
              }
            }
            isFieldForm && _this.conditionTemplateData.push(_this.templateDataArr1);
            !isFieldForm && _this.referenceParamTemplateData.push(_this.templateDataArr2);
          }
        },
        /**
         * 获取积分条件——>生成条件form
         */
        getConditions: function () {
          var _this = this;
          for (var i = 0; i < _this.fields.length; i++) {
            _this.getConditionField(_this.fields[i], true);
          }
          for (var j = 0; j < _this.ruleParams.length; j++) {
            _this.getConditionField(_this.ruleParams[j], false);
          }
          _this.$nextTick(function () {
            _this.getTemplateData(_this.scoreConditionFormItems, true);
            _this.getTemplateData(_this.referenceParamFormItems, false);
          });
        },
        /**
         * 新增
         */
        addFn: function () {
          var _this = this;
          _this.resetRuleFormPanel();
          delete activityModel.id;
          yufp.clone(activityModel, _this.ruleInfoFormdata);
          delete _this.actionConfigFormdata.id;
          // 有效期查询
          yufp.service.request({
            method: 'GET',
            url: _this.validDateDataUrl,
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.data.length > 0) {
                  _this.actionConfigFormdata.validDate = response.data[0].validDate;
                } else {
                  _this.actionConfigFormdata.validDate = '';
                }
              }
            }
          });
          _this.notCheckFlag = true;
          _this.getConditions();
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.resetRuleFormPanel();
          _this.getConditions();
          _this.notCheckFlag = true;
          _this.$nextTick(function () {
            yufp.clone(selectionsAry[0], _this.ruleInfoFormdata); // 回显规则信息表单数据
            _this.setActionFrom(selectionsAry[0].id);
            // 有效期查询
            // yufp.service.request({
            //   method: 'GET',
            //   url: _this.validDateDataUrl,
            //   callback: function (code, message, response) {
            //     if (code == 0) {
            //       _this.actionConfigFormdata.validDate = response.data[0].validDate;
            //     }
            //   }
            // });
            // 处理计算方式数据
            // 处理积分条件数据反显
            _this.setConditions(selectionsAry[0].id, false);
          });
        },
        // 回显多动作
        setActionFrom: function (ruleId) {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: _this.actionUrl,
            data: {
              ruleId: ruleId
            },
            callback: function (code, message, response) {
              var actionList = response.data;
              _this.actionConfigFormdata.ruleAction = [];
              for (var i = 0; i < actionList.length; i++) {
                if (actionList[i].actionType == '1') {
                  _this.actionConfigFormdata.ruleAction.push('1');
                  yufp.clone(actionList[i], _this.formulaWayFormdata);
                  _this.setFormulaWayForm(_this.formulaWayFormdata, actionList[i]);
                } else if (actionList[i].actionType == '2') {
                  _this.actionConfigFormdata.ruleAction.push('2');
                  yufp.clone(actionList[i], _this.formulaWayFormdata1);
                  _this.setFormulaWayForm(_this.formulaWayFormdata1, actionList[i]);
                } else if (actionList[i].actionType == '3') {
                  _this.actionConfigFormdata.ruleAction.push('3');
                  yufp.clone(actionList[i], _this.formulaWayFormdata2);
                  _this.setFormulaWayForm(_this.formulaWayFormdata2, actionList[i]);
                }
              }
              _this.ruleActionChangeFn(_this.actionConfigFormdata.ruleAction);
            }
          });
        },
        /**
         * 回显计算方式表单的值
         * @param row 所选择行的数据
         */
        setFormulaWayForm: function (formData, row) {
          var formulaWay = row.formulaWay;
          var formulaMean = row.actionFormulaMean;
          formData.formulaWay = formulaWay;
          formData.ceiling = row.ceiling;
          formData.ceilingType = row.ceilingType;
          var actionType = row.actionType;
          if (actionType == '1') {
            this.formulaWayChangeFn(formulaWay);
          } else if (actionType == '2') {
            this.formulaWayChangeFn1(formulaWay);
          } else if (actionType == '3') {
            this.formulaWayChangeFn2(formulaWay);
          }

          if (formulaWay == '1') {
            formData.fixedValue = formulaMean;
          } else if (formulaWay == '2') {
            var valueArr = formulaMean.split('#@#');
            var tempArr = valueArr[1].split('/');
            if (tempArr[1] == undefined) {
              tempArr[1] = 10000;
            };
            formData.perField = valueArr[0];
            formData.perValue = tempArr[0];
            formData.denoValue = tempArr[1];
          } else if (formulaWay == 3) {
            var valArr = formulaMean.split('#@#');
            var valArr1 = valArr[0].split(':');
            formData.betweenField = valArr1[0];
            formData.scoreType = valArr1[1];
            var valArr2 = valArr[1].split(';');
            for (var i = valArr2.length - 1; i >= 0; i--) {
              if (valArr2[i] == '') {
                continue;
              }
              var valArr21 = valArr2[i].split(':');
              var obj = {
                scoreLow: valArr21[0],
                scoreValue: valArr21[1]
              };
              if (actionType == '1') {
                this.sectionTableData.push(obj);
              } else if (actionType == '2') {
                this.sectionTableData1.push(obj);
              } else if (actionType == '3') {
                this.sectionTableData2.push(obj);
              }
            }
          } else if (formulaWay == 4) {
            var valArray = formulaMean.split('#@#');
            formData.formulaEditorVal = valArray[0];
            formData.formulaEditorValMean = valArray[1];
          }
        },
        /**
         * 反显积分条件和引用参数的值
         * @param ruleId
         * @param isCheck 是否为查看状态
         */
        setConditions: function (ruleId, isCheck) {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/rulecomparison/queryrulecondition',
            data: {
              ruleId: ruleId
            },
            callback: function (code, message, response) {
              if (code == 0) {
                var data = response.data;
                if (isCheck) {
                  for (var i = 0; i < data.length; i++) {
                    var fieldName = data[i].variableName;
                    for (var a = 0; a < _this.fields.length; a++) {
                      if (_this.fields[a].fieldEName == fieldName) {
                        _this.getConditionField(_this.fields[a], true); // 点击查看时生成积分条件字段
                      };
                    };
                    for (var b = 0; b < _this.ruleParams.length; b++) {
                      if (_this.ruleParams[b].fieldEName == fieldName) {
                        _this.getConditionField(_this.ruleParams[b], false); // 点击查看时生成引用参数
                      };
                    };
                  };
                  _this.getTemplateData(_this.scoreConditionFormItems, true);
                  _this.getTemplateData(_this.referenceParamFormItems, false);
                }
                _this.$nextTick(function () {
                  for (var i = 0; i < data.length; i++) {
                    _this.setConditionForm(data[i], _this.$refs['conditionForm'].formdata);
                    _this.setConditionForm(data[i], _this.$refs['referenceParamForm'].formdata);
                  };
                });
              }
            }
          });
        },
        /**
         * 回显积分条件或者引用参数的值
         */
        setConditionForm: function (dataobj, formdata) {
          var operator = dataobj.operator;
          var variableName = dataobj.variableName;
          var variableType = dataobj.variableType;
          formdata['$_' + variableName] = operator;
          if (variableType == '2' || variableType == '3') {
            var value = dataobj.comparisionValue;
            variableType == '2' && yufp.util.dateFormat(value, '{y}-{m}-{d}');
            if (Number(operator) > 6) {
              var valArr = value.split('#@#');
              formdata[variableName] = valArr[0];
              formdata[variableName + '_GT'] = valArr[1];
            } else {
              formdata[variableName] = value;
            }
          } else if (variableType == '6') {
            var str = dataobj.comparisionValue;
            formdata[variableName] = str.split(',');
          } else {
            formdata[variableName] = dataobj.comparisionValue;
          }
        },
        /**
         * 查看
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.resetRuleFormPanel();
          _this.notCheckFlag = false;
          _this.$nextTick(function () {
            yufp.clone(selectionsAry[0], _this.ruleInfoFormdata); // 回显规则信息表单数据
            _this.setActionFrom(selectionsAry[0].id);
            // 处理积分条件数据反显
            _this.setConditions(selectionsAry[0].id, true);
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请至少选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/ruleinfo/deletebatch',
                  data: {
                    id: arr.join(','),
                    activityId: activityId,
                    nodeId: activityModel.nodeId
                  },
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.resetRuleForm();
                    _this.$message('删除成功');
                  }
                });
              }
            }
          });
        },
        /**
         * 活动校验
         */
        activityCheckFn: function () {
          this.scoreCheckDialogVisible = true;
        },
        /**
         * 活动校验关闭
         */
        scoreCheckCloseFn: function () {
          this.scoreCheckDialogVisible = false;
        },
        /**
         * 规则校验
         */
        ruleCheckFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var condition = selectionsAry[0].condition;
          var patt = /\@.*?\,/g;
          var variableNameArr = [];
          var conditionArr =	condition.match(patt);
          for (var i = 0; i < conditionArr.length; i++) {
            variableNameArr.push(conditionArr[i].substring(1, conditionArr[i].length - 1));
          }
          var param = {
            condition: JSON.stringify({
              ruleId: selectionsAry[0].id,
              accountNo: selectionsAry[0].accountNo,
              transactionCode: transactionCode,
              variableName: variableNameArr.join(',').replace(/&/g, 'transferredG')// 将&转换为transferredG
            })
          };
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/ruleinfo/verificationrule',
            data: param,
            callback: function (code, message, response) {
              if (code == 0) {
                var data = response.data;
                _this.ruleCheckTableData = [];
                if (data.length) {
                  for (var i = 0; i < data.length; i++) {
                    _this.ruleCheckTableData.push(data[i]);
                  }
                }
                _this.ruleCheckDialogVisible = true;
              }
            }
          });
        },
        /**
         * 规则校验关闭
         */
        ruleCheckCloseFn: function () {
          this.ruleCheckDialogVisible = false;
        },
        /**
         * 积分规则冲突查看
         */
        ruleCheckInfoFn: function () {
          var selections = this.$refs.refRuleCheckTable.selections;
          if (selections.length != 1) {
            this.$message({ message: '请选择一条记录', type: 'warning' });
            return;
          };
          // yufp.router.to('ruleConfigPanel', selections[0], cite.rootId);
          var customKey = 'custom_' + new Date().getTime();
          var routeId = 'ruleConfigPanel'; // 模板示例->普通查询的路由ID
          selections[0].customKey = customKey;
          yufp.frame.removeTab(routeId);
          yufp.frame.addTab({
            id: routeId, // 菜单功能ID（路由ID）
            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
            title: '规则冲突详情', // 页签名称
            data: selections[0] // 传递的业务数据，可选配置
          });
          this.ruleCheckDialogVisible = false;
        },
        /**
         * 返回
         */
        backFn: function () {
          yufp.router.to('scoreActivityConfig', '', cite.rootId);
        },
        /**
         * 获取到配置规则的条件
         * @param {} conditionForm
         * @return {Boolean}
         */
        getConditionSaveValue: function () {
          var _this = this;
          var conditionArr = [];
          for (var i = 0; i < _this.fields.length; i++) {
            var field = _this.fields[i];
            if (!_this.getSingleConditionValue(_this.$refs['conditionForm'].formdata, conditionArr, field)) {
              return;
            };
          }
          // 获取设置的引用参数值
          for (var j = 0; j < _this.ruleParams.length; j++) {
            var ruleParams = _this.ruleParams[j];
            if (!_this.getSingleConditionValue(_this.$refs['referenceParamForm'].formdata, conditionArr, ruleParams)) {
              return;
            };
          }
          // 没有配置任何积分条件，不作判断，没配置时，默认存入1=1
          return conditionArr;
        },
        /**
         * 判断值为空
         * @return {}
         */
        isEmpty: function (value) {
          if (value !== '' && value !== null && value !== undefined) {
            return false;
          }
          return true;
        },
        /**
         * 获取单个条件值，可能是引用参数也可能是条件字段
         */
        getSingleConditionValue: function (formdata, conditionArr, field) {
          var singleCondition = {
            variableName: '', // 字段或参数名
            variableType: '', // 字段类型
            operator: '', // 操作符
            comparisionValue: '' // 条件值
          };
          var fieldEname = field.fieldEName;
          var fieldCName = field.fieldCName;
          singleCondition.variableName = fieldEname;
          singleCondition.variableType = field.fieldType;
          singleCondition.operator = formdata['$_' + fieldEname];
          if (field.fieldType == '2' || field.fieldType == '3') {
            if (formdata[fieldEname]) {
              if (field.fieldType == '3') {
                // 判断日期是不是字符串类型
                if (typeof formdata[fieldEname] == 'string') {
                  // 将字符串转换为日期
                  var tempStrs = formdata[fieldEname].split(' ');
                  var dateStrs = tempStrs[0].split('-');
                  var year = parseInt(dateStrs[0], 10);
                  var month = parseInt(dateStrs[1], 10) - 1;
                  var day = parseInt(dateStrs[2], 10);
                  var datetime = new Date(year, month, day);
                  var date = yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
                } else {
                  var date = yufp.util.dateFormat(formdata[fieldEname], '{y}-{m}-{d}');
                }
                var date1 = yufp.util.dateFormat(formdata[fieldEname + '_GT'], '{y}-{m}-{d}');
                singleCondition.comparisionValue = date + '#@#' + date1;
              } else {
                singleCondition.comparisionValue = formdata[fieldEname] +
                '#@#' + formdata[fieldEname + '_GT'];
              }
            } else {
              singleCondition.comparisionValue = '';
            }
          } else if (field.fieldType == '6') {
            singleCondition.comparisionValue = formdata[fieldEname].join(',');
          } else {
            singleCondition.comparisionValue = formdata[fieldEname];
          };
          if (!this.isEmpty(singleCondition.comparisionValue) && this.isEmpty(singleCondition.operator)) {
            this.$message('【' + fieldCName + '】未选择操作符！');
            return false;
          }
          if (this.isEmpty(singleCondition.comparisionValue) && !this.isEmpty(singleCondition.operator)) {
            this.$message('【' + fieldCName + '】未输入或选择条件值！');
            return false;
          }
          if (singleCondition.operator != '' && singleCondition.comparisionValue != '') {
            conditionArr.push(singleCondition);
          }
          return true;
        },
        /**
         * 获取计算方式的保存值
         */
        getFormulaSaveValue: function (formulaWayFormdata, sectionTableData) {
          var _this = this;
          var ruleFormulaJson = {};
          var formulaWay = formulaWayFormdata.formulaWay;
          if (formulaWayFormdata.id != undefined) {
            ruleFormulaJson.id = formulaWayFormdata.id;
            ruleFormulaJson.ruleId = formulaWayFormdata.ruleId;
          }
          ruleFormulaJson.accountNo = formulaWayFormdata.accountNo;
          ruleFormulaJson.poolNo = formulaWayFormdata.poolNo;
          ruleFormulaJson.formulaWay = formulaWay;
          ruleFormulaJson.ceiling = formulaWayFormdata.ceiling;
          ruleFormulaJson.ceilingType = formulaWayFormdata.ceilingType;
          switch (Number(formulaWay)) {
          case 1:
            ruleFormulaJson.formulaValue = formulaWayFormdata.fixedValue;
            ruleFormulaJson.formulaField = '';
            ruleFormulaJson.scoreType = '';
            break;
          case 2:
            ruleFormulaJson.formulaField = formulaWayFormdata.perField;
            ruleFormulaJson.formulaValue = formulaWayFormdata.perValue;
            ruleFormulaJson.denoValue = formulaWayFormdata.denoValue;
            if (Number(ruleFormulaJson.denoValue) <= 0) {
              _this.$message('分母值必须大于0');
              return false;
            }
            ruleFormulaJson.scoreType = '';
            ruleFormulaJson.formulaValue = ruleFormulaJson.formulaValue + '/' + ruleFormulaJson.denoValue;
            break;
          case 3:
            ruleFormulaJson.formulaField = formulaWayFormdata.betweenField;
            ruleFormulaJson.scoreType = formulaWayFormdata.scoreType; ;
            ruleFormulaJson.formulaValue = sectionTableData;
            break;
          case 4:
            // 校验计算公式
            if (!_this.checkFormulaEditorVal()) {
              return;
            }
            ruleFormulaJson.formulaValue = formulaWayFormdata.formulaEditorVal + '#@#' + formulaWayFormdata.formulaEditorValMean;
            ruleFormulaJson.formulaField = '';
            ruleFormulaJson.scoreType = '';
            break;
          default:
          }
          return ruleFormulaJson;
        },
        /**
         * 检验公式编辑器
         * @return {}
         */
        checkFormulaEditorVal: function () {
          var _this = this;
          var wtValue = _this.formulaWayFormdata.formulaEditorVal;
          if (wtValue == '' || wtValue == null || wtValue == undefined) {
            _this.$message('计算方式，公式不能为空！');
            return false;
          }
          yufp.service.request({
            method: 'GET',
            url: _this.fieldSelectDataUrl,
            data: {
              transactionCode: transactionCode
            },
            callback: function (code, message, response) {
              var data = response.data;
              for (var i = 0, len = data.length; i < len; i++) {
                wtValue = wtValue.replace(new RegExp('@' + data[i].fieldEName, 'g'), '(1)');
              }
            }
          });
          return true;
        },
        /**
         * 保存
         */
        saveFn: function () { // 2019-03-26 chenlin 权益引擎改造
          var _this = this;
          var ruleInfoJson = {};
          var validate1 = false;
          var validate2 = false;
          var validate3 = false;
          _this.$refs.refFormulaWayForm.validate(function (valid) {
            validate1 = valid;
          });
          _this.$refs.refRuleInfoForm.validate(function (valid) {
            validate2 = valid;
          });
          _this.$refs.refActionConfigForm.validate(function (valid) {
            validate3 = valid;
          });
          if (!validate1 || !validate2 || !validate3) {
            _this.$message({ message: '输入有误或存在漏输项，请重新输入', type: 'warning' });
            return;
          }
          yufp.clone(_this.ruleInfoFormdata, ruleInfoJson);
          ruleInfoJson.ruleSetId = activityId;
          var conditionArr = _this.getConditionSaveValue();
          if (!conditionArr) {
            return;
          }
          var actionArr = [];
          var actionLen = _this.actionConfigFormdata.ruleAction;
          for (var i = 0; i < actionLen.length; i++) {
            var ruleFormulaJson = '';
            if (actionLen[i] == '1') {
              ruleFormulaJson = _this.getFormulaSaveValue(_this.formulaWayFormdata, _this.sectionTableData);
              ruleFormulaJson.actionType = '1';
              ruleFormulaJson.validDate = _this.formulaWayFormdata.validDate;
              ruleFormulaJson.validDateMode = _this.formulaWayFormdata.validDateMode;
            } else if (actionLen[i] == '2') {
              ruleFormulaJson = _this.getFormulaSaveValue(_this.formulaWayFormdata1, _this.sectionTableData1);
              ruleFormulaJson.actionType = '2';
              ruleFormulaJson.isUpperLimit = _this.formulaWayFormdata1.isUpperLimit;
              ruleFormulaJson.stockPool = _this.formulaWayFormdata1.stockPool;
            } else {
              ruleFormulaJson = _this.getFormulaSaveValue(_this.formulaWayFormdata2, _this.sectionTableData2);
              ruleFormulaJson.actionType = '3';
              ruleFormulaJson.modelId = _this.formulaWayFormdata2.modelId;
              ruleFormulaJson.isUpperLimit = _this.formulaWayFormdata2.isUpperLimit;
              ruleFormulaJson.stockPool = _this.formulaWayFormdata2.stockPool;
            }
            actionArr.push(ruleFormulaJson);
          }
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/ruleinfo/saverule',
            data: {
              ruleInfoJson: JSON.stringify(ruleInfoJson),
              conditionJson: JSON.stringify(conditionArr),
              ruleFormulaJson: JSON.stringify(actionArr)
              // actionConfigJson: JSON.stringify(_this.actionConfigFormdata)
            },
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.resetRuleForm();
              _this.$message('保存成功');
            }
          });
        },
        /**
         * 监听积分计算方式值改变
         */
        formulaWayChangeFn: function (val) {
          if (val == '1') {
            this.isHiddenByFixedScore = false;
            this.isHiddenByAccount = true;
            this.isHiddenBySection = true;
            this.isHiddenByFormula = true;
            this.fixedRule = [
              { required: true, message: '字段不能为空' },
              { validator: checkCalculate }
            ];
            this.accountRule = '';
            this.sectionRule = '';
            this.formulaWayRule = '';
          } else if (val == '2') {
            this.isHiddenByFixedScore = true;
            this.isHiddenByAccount = false;
            this.isHiddenBySection = true;
            this.isHiddenByFormula = true;
            this.fixedRule = '';
            this.accountRule = 'required';
            this.sectionRule = '';
            this.formulaWayRule = '';
          } else if (val == '3') {
            this.isHiddenByFixedScore = true;
            this.isHiddenByAccount = true;
            this.isHiddenBySection = false;
            this.isHiddenByFormula = true;
            this.fixedRule = '';
            this.accountRule = '';
            this.sectionRule = 'required';
            this.formulaWayRule = '';
          } else if (val == '4') {
            this.isHiddenByFixedScore = true;
            this.isHiddenByAccount = true;
            this.isHiddenBySection = true;
            this.isHiddenByFormula = false;
            this.fixedRule = '';
            this.accountRule = '';
            this.sectionRule = '';
            this.formulaWayRule = 'required';
          }
        },
        /**
         * 监听权益计算方式值改变
         */
        formulaWayChangeFn1: function (val) {
          if (val == '1') {
            this.isHiddenByFixedScore1 = false;
            this.isHiddenByAccount1 = true;
            this.isHiddenBySection1 = true;
            this.isHiddenByFormula1 = true;
            this.fixedRule1 = [
              { required: true, message: '字段不能为空' },
              { validator: checkCalculate }
            ];
            this.accountRule1 = '';
            this.sectionRule1 = '';
            this.formulaWayRule1 = '';
          } else if (val == '2') {
            this.isHiddenByFixedScore1 = true;
            this.isHiddenByAccount1 = false;
            this.isHiddenBySection1 = true;
            this.isHiddenByFormula1 = true;
            this.fixedRule1 = '';
            this.accountRule1 = 'required';
            this.sectionRule1 = '';
            this.formulaWayRule1 = '';
          } else if (val == '3') {
            this.isHiddenByFixedScore1 = true;
            this.isHiddenByAccount1 = true;
            this.isHiddenBySection1 = false;
            this.isHiddenByFormula1 = true;
            this.fixedRule1 = '';
            this.accountRule1 = '';
            this.sectionRule1 = 'required';
            this.formulaWayRule1 = '';
          } else if (val == '4') {
            this.isHiddenByFixedScore1 = true;
            this.isHiddenByAccount1 = true;
            this.isHiddenBySection1 = true;
            this.isHiddenByFormula1 = false;
            this.fixedRule1 = '';
            this.accountRule1 = '';
            this.sectionRule1 = '';
            this.formulaWayRule1 = 'required';
          }
        },
        /**
         * 监听实物计算方式值改变
         */
        formulaWayChangeFn2: function (val) {
          if (val == '1') {
            this.isHiddenByFixedScore2 = false;
            this.isHiddenByAccount2 = true;
            this.isHiddenBySection2 = true;
            this.isHiddenByFormula2 = true;
            this.fixedRule2 = [
              { required: true, message: '字段不能为空' },
              { validator: checkCalculate }
            ];
            this.accountRule2 = '';
            this.sectionRule2 = '';
            this.formulaWayRule2 = '';
          } else if (val == '2') {
            this.isHiddenByFixedScore2 = true;
            this.isHiddenByAccount2 = false;
            this.isHiddenBySection2 = true;
            this.isHiddenByFormula2 = true;
            this.fixedRule2 = '';
            this.accountRule2 = 'required';
            this.sectionRule2 = '';
            this.formulaWayRule2 = '';
          } else if (val == '3') {
            this.isHiddenByFixedScore2 = true;
            this.isHiddenByAccount2 = true;
            this.isHiddenBySection2 = false;
            this.isHiddenByFormula2 = true;
            this.fixedRule2 = '';
            this.accountRule2 = '';
            this.sectionRule2 = 'required';
            this.formulaWayRule2 = '';
          } else if (val == '4') {
            this.isHiddenByFixedScore2 = true;
            this.isHiddenByAccount2 = true;
            this.isHiddenBySection2 = true;
            this.isHiddenByFormula2 = false;
            this.fixedRule2 = '';
            this.accountRule2 = '';
            this.sectionRule2 = '';
            this.formulaWayRule2 = 'required';
          }
        },
        /**
         * 监听规则动作值改变
         */
        ruleActionChangeFn: function (val) {
          if (val.length == 1) {
            if (val[0] == '1') {
              this.isHiddenByLoy = true;
              this.isHiddenByGift = false;
              this.isHiddenByTicket = false;
              this.$refs.refFormulaWayForm1.resetFields();
              this.$refs.refFormulaWayForm2.resetFields();
              this.formulaWayFormdata1.formulaWay = '1';
              this.formulaWayFormdata2.formulaWay = '1';
            }
            if (val[0] == '2') {
              this.isHiddenByTicket = true;
              this.isHiddenByLoy = false;
              this.isHiddenByGift = false;
              this.$refs.refFormulaWayForm.resetFields();
              this.$refs.refFormulaWayForm2.resetFields();
              this.formulaWayFormdata.formulaWay = '1';
              this.formulaWayFormdata2.formulaWay = '1';
              this.fixedRule = '';
              this.loyrequired = '';
            }
            if (val[0] == '3') {
              this.isHiddenByGift = true;
              this.isHiddenByTicket = false;
              this.isHiddenByLoy = false;
              this.$refs.refFormulaWayForm.resetFields();
              this.$refs.refFormulaWayForm1.resetFields();
              this.formulaWayFormdata.formulaWay = '1';
              this.formulaWayFormdata1.formulaWay = '1';
              this.fixedRule = '';
              this.loyrequired = '';
            }
          } else if (val.length == 2) {
            if ((val[0] == '1' && val[1] == '2') || (val[0] == '2' && val[1] == '1')) {
              this.isHiddenByLoy = true;
              this.isHiddenByGift = false;
              this.isHiddenByTicket = true;
              this.$refs.refFormulaWayForm2.resetFields();
              this.formulaWayFormdata2.formulaWay = '1';
            } else if ((val[0] == '1' && val[1] == '3') || (val[0] == '3' && val[1] == '1')) {
              this.isHiddenByLoy = true;
              this.isHiddenByGift = true;
              this.isHiddenByTicket = false;
              this.$refs.refFormulaWayForm1.resetFields();
              this.formulaWayFormdata1.formulaWay = '1';
            } else if ((val[0] == '2' && val[1] == '3') || (val[0] == '3' && val[1] == '2')) {
              this.isHiddenByLoy = false;
              this.isHiddenByGift = true;
              this.isHiddenByTicket = true;
              this.$refs.refFormulaWayForm.resetFields();
              this.formulaWayFormdata.formulaWay = '1';
              this.fixedRule = '';
              this.loyrequired = '';
            }
          } else if (val.length == 0) {
            this.isHiddenByLoy = true;
            this.isHiddenByGift = false;
            this.isHiddenByTicket = false;
            this.$refs.refFormulaWayForm1.resetFields();
            this.$refs.refFormulaWayForm2.resetFields();
            this.formulaWayFormdata1.formulaWay = '1';
            this.formulaWayFormdata2.formulaWay = '1';
          } else {
            this.isHiddenByGift = true;
            this.isHiddenByTicket = true;
            this.isHiddenByLoy = true;
          }
        },
        /**
         * 积分增加区间
         */
        addSectionFn: function () {
          var tabData = {
            scoreLow: 0,
            scoreValue: 0
          };
          this.sectionTableData.push(tabData);
        },
        /**
         * 权益票券增加区间
         */
        addSectionFn1: function () {
          var tabData = {
            scoreLow: 0,
            scoreValue: 0
          };
          this.sectionTableData1.push(tabData);
        },
        /**
         * 实物礼品增加区间
         */
        addSectionFn2: function () {
          var tabData = {
            scoreLow: 0,
            scoreValue: 0
          };
          this.sectionTableData2.push(tabData);
        },
        /**
         * 区间表格中取消按钮点击
         */
        deleteRow: function (index, rows) {
          rows.splice(index, 1);
        },
        /**
         * 字段列表选择字段
         */
        checkFn: function () {
          var _this = this;
          var formData = '';
          if (_this.actionType == '1') {
            formData = _this.formulaWayFormdata;
          } else if (_this.actionType == '2') {
            formData = _this.formulaWayFormdata1;
          } else if (_this.actionType == '3') {
            formData = _this.formulaWayFormdata2;
          }
          var selectionsAry = _this.$refs.refFieldSelectTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.fieldSelectDialogVisible = false;
          _this.insertFormulaVal(formData, '@' + selectionsAry[0].fieldEName);
          _this.insertFormulaEditorValMean(formData, '【' + selectionsAry[0].fieldCName + '】');
        },
        /**
         * 关闭字段选择弹框
         */
        closeFn: function () {
          this.fieldSelectDialogVisible = false;
        },
        /**
         * 公式显示值
         */
        insertFormulaVal: function (formData, value) {
          var formulaEditorVal = formData.formulaEditorVal || '';
          formData.formulaEditorVal = formulaEditorVal + value;
        },
        /**
         * 公式解释显示的值
         */
        insertFormulaEditorValMean: function (formData, value) {
          var formulaEditorValMean = formData.formulaEditorValMean || '';
          formData.formulaEditorValMean = formulaEditorValMean + value;
        },
        /**
         * 计算器输入
         */
        onClick: function (val, actionType) {
          var _this = this;
          var formData = '';
          _this.actionType = actionType;
          if (actionType == '1') {
            formData = _this.formulaWayFormdata;
          } else if (actionType == '2') {
            formData = _this.formulaWayFormdata1;
          } else if (actionType == '3') {
            formData = _this.formulaWayFormdata2;
          }
          if (val == '<—') {
            _this.deleteCusorPreChar(formData);
          } else if (val == '字段选择') {
            _this.fieldSelectDialogVisible = true;
          } else if (val == '清空') {
            formData.formulaEditorValMean = '';
            formData.formulaEditorVal = '';
          } else {
            _this.insertFormulaEditorValMean(formData, val);
            _this.insertFormulaVal(formData, val);
          }
        },
        /**
         * 计算器退格键
         */
        deleteCusorPreChar: function (formData) {
          var formulaEditorVal = formData.formulaEditorVal;
          var formulaEditorValMean = formData.formulaEditorValMean;
          formulaEditorVal.length > 0 && (formData.formulaEditorVal = formulaEditorVal.substr(0, formulaEditorVal.length - 1));
          formulaEditorValMean.length > 0 && (formData.formulaEditorValMean = formulaEditorVal.substr(0, formulaEditorValMean.length - 1));
        },
        setGiftParam: function (commodity) {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/loyqycommmodel/modelparamquery',
            data: {
              commodityCode: commodity[0].commodityCode
            },
            callback: function (code, message, response) {
              var tab = response.data;
              _this.options = [];
              for (var i = 0; i < tab.length; i++) {
                var option = {};
                option.key = tab[i].key;
                option.value = tab[i].value;
                _this.options.push(option);
              }
            }
          });
        }
      }
    });
  };
});