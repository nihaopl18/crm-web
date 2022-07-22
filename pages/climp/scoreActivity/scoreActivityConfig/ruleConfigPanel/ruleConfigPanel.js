/**
 * @Created by panglx panglx@yusys.com.cn on 2018-12-28 17:06:48.
 * @updated by
 * @description 积分活动冲突详情
 */
define([
  'pages/climp/scoreActivity/ruleConfig/ruleConfig.css'
], function (require, exports) {
  /**
  * 页面加载完成时触发
  * @param hashCode 路由ID
  * @param data 传递数据对象
  * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    var activityId = data.conflictActivityId;
    var ruleId = data.conflictRuleId;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          fields: [], // 规则化字段（交易流水表）
          transactionCode: '',
          ruleParams: [], // 引用参数字段
          isScoreToDisabled: false,
          height: yufp.frame.size().height,
          ruleInfoFormdata: {}, // 规则信息表单数据
          formulaWayFormdata: {}, // 计算方式表单数据
          actionConfigFormdata: {}, // 动作配置表单数据
          expandCollapseName: ['ruleInfo', 'scoreCondition', 'formulaWay', 'actionConfig'], // 折叠面板展开项目
          activeName: 'referenceParam',
          tableDataUrl: backend.yuspClimpActyService + '/api/ruleinfo/list', // 活动规则查询url
          transactionCodeDataUrl: backend.yuspClimpActyService + '/api/transactioncategory/searchtranscode', // 交易类型下拉选项接口
          baseParams: {
            condition: JSON.stringify({
              activityId: activityId
            })
          }, // 活动规则查询参数,
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
          isHiddenByFixedScore: true, // 是否在按固定分值计算方式时隐藏
          isHiddenByAccount: true, // 是否按金额计算方式的时隐藏
          isHiddenBySection: true, // 是否按区间计算方式的时隐藏
          isHiddenByFormula: false, // 是否按公式计算方式的时隐藏
          sectionTableData: [], // 按区间计算方式的表格数据
          sectionTableRule: [{ required: true, message: '字段不能为空' }, { validator: yufp.validator.number, message: '字段必须为不超过15位的数字'}],
          buttonList: [['<—', '清空', '字段选择', '/'], ['1', '2', '3', '+'], ['4', '5', '6', '-'], ['7', '8', '9', '*'], ['.', '0', '(', ')']],
          fieldSelectDialogVisible: false, // 字段选择弹框是否显示
          fieldSelectDataUrl: backend.yuspClimpActyService + '/api/ruleinfo/querynumtranscode', // 字段选择查询url
          fieldOptions: [], // 字段列表
          accountNoDataUrl: backend.yuspClimpActyService + '/api/ruleinfo/queryscoreaccount', // 积分账户查询url
          accountNoOptions: [], // 积分账户查
          fixedRule: '',
          accountRule: '',
          sectionRule: '',
          formulaWayRule: ''
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.yuspClimpActyService + '/api/activity/list',
          data: _this.baseParams,
          callback: function (code, message, response) {
            _this.transactionCode = response.data[0].transactionCode;
            _this.querySelectFn();
            _this.queryFieldParams(); // 加载规则化字段及引用参数
            _this.$nextTick(function () {
              yufp.service.request({
                method: 'GET',
                url: backend.yuspClimpActyService + '/api/ruleinfo/list',
                data: _this.baseParams,
                callback: function (code, message, response) {
                  var listData = response.data || [];
                  if (listData.length) {
                    for (var i = 0, len = listData.length; i < len; i++) {
                      if (listData[i].id == ruleId) {
                        yufp.clone(listData[i], _this.ruleInfoFormdata); // 回显规则信息表单数据
                        yufp.clone(listData[i], _this.actionConfigFormdata); // 回显动作配置表单数据
                        // 处理计算方式数据
                        _this.setFormulaWayForm(listData[i]);
                        // 处理积分条件数据反显
                        _this.setConditions(listData[i].id, true);
                      }
                    }
                  }
                }
              });
            });
          }
        });
      },
      methods: {
        // 生成下拉选项框
        querySelectFn: function () {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: _this.fieldSelectDataUrl,
            data: {
              transactionCode: _this.transactionCode
            },
            callback: function (code, message, response) {
              if (code == 0) {
                var data = response.data;
                var len = data.length && data.length;
                if (len) {
                  for (var i = 0; i < len; i++) {
                    _this.fieldOptions.push({
                      key: data[i].fieldEName,
                      value: data[i].fieldCName
                    });
                  }
                }
              }
            }
          });
          yufp.service.request({
            method: 'GET',
            url: _this.accountNoDataUrl,
            data: {
              transactionCode: _this.transactionCode
            },
            callback: function (code, message, response) {
              if (code == 0) {
                var data = response.data;
                var len = data.length && data.length;
                if (len) {
                  for (var i = 0; i < len; i++) {
                    _this.accountNoOptions.push(data[i]);
                  }
                }
              }
            }
          });
        },
        /**
         * 查询条件字段及引用参数
         * @param _this.transactionCode 此参数必须先设置
         */
        queryFieldParams: function () {
          var _this = this;
          // 字段查询
          yufp.service.request({
            method: 'GET',
            url: backend.yuspClimpActyService + '/api/ruleinfo/querytranscode',
            data: {
              transactionCode: _this.transactionCode
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
            url: backend.yuspClimpActyService + '/api/ruleinfo/queryruleparams',
            callback: function (code, message, response) {
              if (code == 0) {
                _this.ruleParams = response.data;
              }
            }
          });
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
                option.disabled = true;
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
       * 回显计算方式表单的值
       * @param row 所选择行的数据
       */
        setFormulaWayForm: function (row) {
          var formulaWay = row.formulaWay;
          var formulaMean = row.formulaMean;
          this.formulaWayFormdata.formulaWay = formulaWay;
          this.formulaWayFormdata.maxScore = row.maxScore;
          this.formulaWayFormdata.maxScoreType = row.maxScoreType;
          this.formulaWayChangeFn(formulaWay);
          if (formulaWay == '1') {
            this.formulaWayFormdata.fixedValue = formulaMean;
          } else if (formulaWay == '2') {
            var valueArr = formulaMean.split('#@#');
            var tempArr = valueArr[1].split('/');
            if (tempArr[1] == undefined) {
              tempArr[1] = 10000;
            };
            this.formulaWayFormdata.perField = valueArr[0];
            this.formulaWayFormdata.perValue = tempArr[0];
            this.formulaWayFormdata.denoValue = tempArr[1];
          } else if (formulaWay == 3) {
            var valArr = formulaMean.split('#@#');
            var valArr1 = valArr[0].split(':');
            this.formulaWayFormdata.betweenField = valArr1[0];
            this.formulaWayFormdata.scoreType = valArr1[1];
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
              this.sectionTableData.push(obj);
            }
          } else if (formulaWay == 4) {
            var valArray = formulaMean.split('#@#');
            this.formulaWayFormdata.formulaEditorVal = valArray[0];
            this.formulaWayFormdata.formulaEditorValMean = valArray[1];
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
            url: backend.yuspClimpActyService + '/api/rulecomparison/queryrulecondition',
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
         * 监听操作符值的改变
         *  @param ref属性表示当前表单对象ref
         *  @param field表示动态表单字段数据
         *  @param groupfield表示组内的字段对象
         *  @param xdynamicfield表示表单类的字段对象
         */
        operatorChangeFn: function (ref, field, groupfield, xdynamicfield) {
          for (var i = 0, len = Math.ceil(groupfield.length / 3); i < len; i++) {
            var index1 = 3 * i;
            var index3 = (3 * i) + 2;
            if (groupfield[index1] && groupfield[index1].dataCode && groupfield[index1].dataCode == 'NUMDATE_STORE') {
              if (Number(field[groupfield[index1].field]) > 6) {
                ref.$set(groupfield, index3, { field: groupfield[index3].field, label: groupfield[index3].label, colspan: groupfield[index3].colspan, ctype: groupfield[index3].ctype, labelWidth: groupfield[index3].labelWidth, hidden: groupfield[index3].hidden, disabled: false });
              } else {
                ref.$set(groupfield, index3, { field: groupfield[index3].field, label: groupfield[index3].label, colspan: groupfield[index3].colspan, ctype: groupfield[index3].ctype, labelWidth: groupfield[index3].labelWidth, hidden: groupfield[index3].hidden, disabled: true });
                ref.formdata[groupfield[index3].field] = '';
              }
            }
          }
        },
        /**
         * 监听计算方式值改变
          */
        formulaWayChangeFn: function (val) {
          if (val == '1') {
            this.isHiddenByFixedScore = false;
            this.isHiddenByAccount = true;
            this.isHiddenBySection = true;
            this.isHiddenByFormula = true;
            this.fixedRule = 'required';
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
         * 增加区间
         */
        addSectionFn: function () {
          var tabData = {
            scoreLow: 0,
            scoreValue: 0
          };
          this.sectionTableData.push(tabData);
        },
        /**
         * 区间表格中取消按钮点击
        */
        deleteRow: function (index, rows) {
          rows.splice(index, 1);
        },
        /**
         * 返回
         */
        backFn: function () {
          yufp.router.to('scoreActivityConfig', '', cite.rootId);
        },
        /**
         * 字段列表选择字段
         */
        checkFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refFieldSelectTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.fieldSelectDialogVisible = false;
          _this.insertFormulaVal('@' + selectionsAry[0].fieldEName);
          _this.insertFormulaEditorValMean('【' + selectionsAry[0].fieldCName + '】');
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
        insertFormulaVal: function (value) {
          var formulaEditorVal = this.formulaWayFormdata.formulaEditorVal || '';
          this.formulaWayFormdata.formulaEditorVal = formulaEditorVal + value;
        },
        /**
         * 公式解释显示的值
         */
        insertFormulaEditorValMean: function (value) {
          var formulaEditorValMean = this.formulaWayFormdata.formulaEditorValMean || '';
          this.formulaWayFormdata.formulaEditorValMean = formulaEditorValMean + value;
        },
        /**
       * 计算器输入
       */
        onClick: function (val) {
          var _this = this;
          if (val == '<—') {
            _this.deleteCusorPreChar();
          } else if (val == '字段选择') {
            _this.fieldSelectDialogVisible = true;
          } else if (val == '清空') {
            this.formulaWayFormdata.formulaEditorValMean = '';
            this.formulaWayFormdata.formulaEditorVal = '';
          } else {
            _this.insertFormulaEditorValMean(val);
            _this.insertFormulaVal(val);
          }
        },
        /**
       * 计算器退格键
       */
        deleteCusorPreChar: function () {
          var formulaEditorVal = this.formulaWayFormdata.formulaEditorVal;
          var formulaEditorValMean = this.formulaWayFormdata.formulaEditorValMean;
          formulaEditorVal.length > 0 && (this.formulaWayFormdata.formulaEditorVal = formulaEditorVal.substr(0, formulaEditorVal.length - 1));
          formulaEditorValMean.length > 0 && (this.formulaWayFormdata.formulaEditorValMean = formulaEditorVal.substr(0, formulaEditorValMean.length - 1));
        }
      }
    });
  };
});