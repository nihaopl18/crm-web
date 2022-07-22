/**
 * @created by liujie on 2018/11/16.
 * @description 查询
 */
define(function (require, exports) {
  /**
  * 页面加载完成时触发
  *@param hashCode 路由ID
  * @param data 传递数据对象
  * @param cite 页面站点信息
  */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          height: yufp.custom.viewSize().height - 10,
          eventName: '',
          activeNames: ['1', '2', '3', '4'], // 条件字段
          activeNames1: ['1', '2', '3', '4'], // 规则配置
          // height: yufp.custom.viewSize().height,
          conditionlist: [], // 条件字段
          parameterlist: [], // 引用参数
          continuitylist: [], // 连续动作
          actionlist: [], // 营销动作
          title: '', // 拖拽当前条件字段title
          field: '', // 拖拽当前条件字段Field
          variableType: '', // 变量类型
          conditionpart: '',
          titleparameter: '', // 拖拽当前引用参数title
          titlemaction: '', // 拖拽当前营销动作title
          radio: '1',
          conditionSection: '',
          conditionState: '0', // 判断条件字段是否可拖拽 默认不可 获取title值才为1
          parameterState: '0', // 判断规则配置是否可拖拽 默认不可 获取title值才为1
          actionState: '0', // 判断连续动作是否可拖拽 默认不可 获取title值才为1
          dropshow: false, // 隐藏条件字段一级拖拽框
          dropparametershow: false, // 隐藏引用参数一级拖拽框
          dropactionshow: false, // 隐藏连续动作一级拖拽框
          productsShow: false,
          risksShow: false,
          customercaresShow: false,
          conditionField: [], // 条件字段标签
          parameterField: [], // 引用参数
          continuityactionField: [], // 连续动作
          actionField: [// 营销动作标签
            {title: '营销产品', state: '0'},
            {title: '关注风险', state: '0'},
            {title: '客户关怀', state: '0'}
          ],
          viewDialogVisible: false,
          modelViewTitle: '', // 模板dialog标题
          applType: '', // 动作类型
          modelqueryFields: [
            { placeholder: '模板名称', field: 'modelName', type: 'input' }
          ],
          modelqueryButtons: [
            {
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  model.applyType = _self.applType;
                  var param = { condition: JSON.stringify(model) };
                  _self.$refs.modeltable.remoteData(param);
                }
              }
            },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],
          modeltableColumns: [
            { label: '模板名称', prop: 'modelName', width: '150' },
            { label: '模板内容', prop: 'modelInfo', width: '300' },
            { label: '是否启用', prop: 'isEnable', width: '70' },
            { label: '类别名称', prop: 'catlName', width: '90' },
            { label: '创建人', prop: 'creatUserName', width: '90' }
          ],
          tableColumns: [
            {label: '产品名称', prop: 'modelName'},
            {label: '操作',
              width: 150,
              template: function () {
                return '<template slot-scope="scope">\
                                <el-button type="text" size="small" @click="_$event(\'custom-row-op\', scope, \'delete\')">删除</el-button>\
                            </template>';
              }
            }
          ],
          tableColumns1: [
            {label: '风险介绍', prop: 'modelName'},
            {label: '操作',
              width: 150,
              template: function () {
                return '<template slot-scope="scope">\
                                <el-button type="text" size="small" @click="_$event(\'custom-row-op\', scope, \'delete\')">删除</el-button>\
                            </template>';
              }
            }
          ],
          tableColumns2: [
            {label: '关怀介绍', prop: 'modelName'},
            {label: '操作',
              width: 150,
              template: function () {
                return '<template slot-scope="scope">\
                                <el-button type="text" size="small" @click="_$event(\'custom-row-op\', scope, \'delete\')">删除</el-button>\
                            </template>';
              }
            }
          ],
          productsdata: [],
          caresdata: [],
          risksdata: []
        };
      },
      methods: {
        addsectionFun: function (itempart) { // 新增区间
          // var _this = this;
          var itemPart = yufp.clone(itempart[0], []);
          itempart.push(itemPart);
        },
        customRowOpProducts: function (scope, op) {
          this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.id, '提示');
        },
        customRowOpRisks: function (scope, op) {
          this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.id, '提示');
        },
        customRowOpCaresdata: function (scope, op) {
          this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.id, '提示');
        },
        allowDropover: function (event) {
          event.preventDefault();
        },
        //           条件字段
        drag: function (ev, i, array) { // 拖拽开始获取节点名称 条件字段  左侧标签
          var _this = this;
          _this.title = ev.target.innerText;
          _this.field = i.field;
          _this.variableType = i.variableType;
          _this.conditionpart = i.itempart;
          _this.conditionSection = i.section;
          if (array == _this.conditionField) {
            _this.dropshow = true; // 拖拽一级字段状态是否展示 -是-
            _this.conditionState = '1';
            _this.dropactionshow = true; // 拖拽一级字段状态是否展示 -是-
            _this.actionState = '1';
          } else if (array == _this.parameterField) {
            _this.dropparametershow = true; // 拖拽一级字段状态是否展示 -是-
            _this.parameterState = '1';
          } /* else if (array == _this.continuityactionField) {
            _this.dropactionshow = true; // 拖拽一级字段状态是否展示 -是-
            _this.actionState = '1';
          } */
          // console.log(_this.actionState);
        },
        dragend: function (ev, i, array) { // 拖拽节点结束  条件字段  左侧标签
          var _this = this;
          if (array == _this.conditionField) {
            _this.dropshow = false;// 拖拽一级字段状态是否展示 -否-
            _this.dropactionshow = false;// 拖拽一级字段状态是否展示 -否-
          } else if (array == _this.parameterField) {
            _this.dropparametershow = false;// 拖拽一级字段状态是否展示 -否-
          } /* else if (array == _this.continuityactionField) {
            _this.dropactionshow = false;// 拖拽一级字段状态是否展示 -否-
          } */
        },
        drag1: function (i, array) { // 拖拽字段   右侧字段容器
          var _this = this;
          _this.title = i.title;// 获取一级字段的title值
          _this.field = i.field;
          _this.variableType = i.variableType;
          _this.conditionSection = i.section;
          _this.conditionpart = i.itempart;
          if (array == _this.conditionlist) {
            _this.dropshow = true;// 拖拽一级字段状态是否展示 -是-
            _this.conditionState = '1';
            _this.actionState = '1';
          } else if (array == _this.parameterlist) {
            _this.dropparametershow = true;// 拖拽一级字段状态是否展示 -是-
            _this.parameterState = '1';
          } else if (array == _this.continuitylist) {
            _this.dropactionshow = true;
            _this.actionState = '1';
          }
        },
        allowDrop: function (event, array, arrayname) { // 拖拽生成一级字段节点
          var _this = this;
          if (arrayname == _this.conditionlist) {
            _this.parameterState = '0';
            // _this.actionState = '0';
          } else if (arrayname == _this.parameterlist) {
            _this.conditionState = '0';
            _this.actionState = '0';
          } else if (arrayname == _this.continuitylist) {
            _this.parameterState = '0';
            _this.conditionState = '0';
          }
          // console.log(_this.actionState, _this.conditionState, _this.parameterState);
          if (_this.conditionState == '1' && _this.parameterState == '0' && _this.actionState == '1') {
            _this.dropfun(array);
            for (var b in _this.conditionField) {
              if (_this.conditionField[b].title == _this.title) {
                _this.conditionField[b].state = '1'; // 生成节点同时给左侧标点给点亮状态
              }
            }
            _this.conditionState = '0';
            _this.actionState = '0';
          } else if (_this.parameterState == '1' && _this.conditionState == '0' && _this.actionState == '0') {
            _this.dropfun(array);
            for (var b in _this.parameterField) {
              if (_this.parameterField[b].title == _this.title) {
                _this.parameterField[b].state = '1'; // 生成节点同时给左侧标点给点亮状态
              }
            }
            _this.parameterState = '0';
          } else if (_this.actionState == '1' && _this.parameterState == '0' && _this.conditionState == '0') {
            _this.dropActionFun(array);
            for (var b in _this.continuityactionField) {
              if (_this.continuityactionField[b].title == _this.title) {
                _this.continuityactionField[b].state = '1'; // 生成节点同时给左侧标点给点亮状态
              }
            }
            _this.actionState = '0';
            // console.log(00000);
          }
        },
        dropActionFun: function (array) { // 连续动作条件
          if (this.continuitylist.length > 0) {
            this.$message({message: '只能设置一个连续条件！', type: 'warning'});
            return;
          }
          var _this = this;
          var selections = {};
          selections.ctype = 'select';
          selections.options = _this.countSumOptions;
          var item = {};
          item.ctype = 'input';
          item.type = '';
          item.options = '';
          var itempart = [[]];
          if (_this.variableType == 2) {
            item.unit = '万元';
            itempart[0].push(item);
            var item = {};
            item.ctype = 'input';
            item.type = '';
            item.options = '';
            item.unit = '天';
            itempart[0].push(item);
            _this.conditionpart = itempart;
            var itempt = yufp.clone(_this.conditionpart, []);
            selections.value = 'SUM';
            _this.conditionSection = selections;
            var conditionSection = yufp.clone(_this.conditionSection, {});
            array.push({'title': _this.title, 'field': _this.field, 'variableType': _this.variableType, 'radio': '3', 'children': [], 'section': conditionSection, 'itempart': itempt});
          } else {
            item.unit = '次';
            itempart[0].push(item);
            var item = {};
            item.ctype = 'input';
            item.type = '';
            item.options = '';
            item.unit = '天';
            itempart[0].push(item);
            _this.conditionpart = itempart;
            var itempt = yufp.clone(_this.conditionpart, []);
            selections.value = 'COUNT';
            _this.conditionSection = selections;
            var conditionSection = yufp.clone(_this.conditionSection, {});
            array.push({'title': _this.title, 'field': _this.field, 'variableType': _this.variableType, 'radio': '3', 'children': [], 'section': conditionSection, 'itempart': itempt});
          }
        },
        dropfun: function (array) {
          var _this = this;
          var conditionSection = yufp.clone(_this.conditionSection, {});
          var itempt = yufp.clone(_this.conditionpart, []);
          array.push({'title': _this.title, 'field': _this.field, 'variableType': _this.variableType, 'radio': '3', 'children': [], 'section': conditionSection, 'itempart': itempt});
        },
        delfirstitem: function (item, i, title, array) { // 删除第一级节点
          var _this = this;
          if (array == _this.conditionlist) {
            _this.dropshow = false;
          } else if (array == _this.parameterlist) {
            _this.dropparametershow = false;
          } else if (array == _this.continuitylist) {
            _this.dropactionshow = false;
          }
          if (item.children.length == '0') {
            array.splice(i, 1);
          } else {
            item.title = '';
            item.field = '';
            item.variableType = '';
            item.section = '';
            item.itempart = '';
            delete item.children[0].radio;
          };
          _this.dislodgestylefun(title, array);
        },
        delItemfun: function (index, c, i1, title, array) { // 删除第二级节点
          var _this = this;
          if (array == _this.conditionlist) {
            _this.dropshow = false;
          } else if (array == _this.parameterlist) {
            _this.dropparametershow = false;
          } else if (array == _this.continuitylist) {
            _this.dropactionshow = false;
          }
          if (c.children[index].children.length == '0') {
            if (c.title == '') {
              if (c.children.length == '1') {
                array.splice(i1, 1);
              } else {
                if (index == '0') {
                  c.children.splice(index, 1);
                  delete c.children[0].radio;
                } else {
                  c.children.splice(index, 1);
                }
              }
            } else {
              c.children.splice(index, 1);
            };
          } else {
            c.children[index].title = '';
            c.children[index].field = '';
            c.children[index].variableType = '';
            c.children[index].section = '';
            c.children[index].itempart = '';
            delete c.children[index].children[0].radio;
          }
          _this.dislodgestylefun(title, array);
        },
        delItem: function (c, i, index, ci, title, array) { // 删除第三级节点
          var _this = this;
          if (array == _this.conditionlist) {
            _this.dropshow = false;
          } else if (array == _this.parameterlist) {
            _this.dropparametershow = false;
          } else if (array == _this.continuitylist) {
            _this.dropactionshow = false;
          }
          if (i.title == '') {
            if (i.children.length == '1') {
              if (c.children[0] == i && c.title == '') {
                if (c.children.length > '1') {
                  c.children.splice(i, 1);
                  delete c.children[0].radio;
                } else {
                  array.splice(ci, 1);
                }
              } else {
                c.children.splice(i, 1);
              }
            } else {
              if (index == '0') {
                i.children.splice(index, 1);
                delete i.children[0].radio;
              } else {
                i.children.splice(index, 1);
              }
            }
          } else {
            i.children.splice(index, 1);
          }
          _this.dislodgestylefun(title, array);
        },
        dislodgestylefun: function (title, array) { // 清除左侧标签样式
          var _this = this;
          var str;
          if (array == _this.conditionlist) {
            str = JSON.stringify(_this.conditionlist);
            if (str.indexOf(title) == '-1') {
              for (var b in _this.conditionField) {
                if (_this.conditionField[b].title == title) {
                  _this.conditionField[b].state = '0';
                }
              }
            }
          } else if (array == _this.parameterlist) {
            str = JSON.stringify(_this.parameterlist);
            if (str.indexOf(title) == '-1') {
              for (var b in _this.parameterField) {
                if (_this.parameterField[b].title == title) {
                  _this.parameterField[b].state = '0';
                }
              }
            }
          } else if (array == _this.continuitylist) {
            str = JSON.stringify(_this.continuitylist);
            if (str.indexOf(title) == '-1') {
              for (var b in _this.continuityactionField) {
                if (_this.continuityactionField[b].title == title) {
                  _this.continuityactionField[b].state = '0';
                }
              }
            }
          }
        },
        lastdrop: function () {
          this.$message({
            message: '条件字段只支持三级',
            type: 'warning'
          });
        },
        //          条件字段

        //          营销动作
        dragmarketingaction: function (ev, i) {
          var _this = this;
          _this.titlemaction = ev.target.innerText;
        },
        dragendmarketingaction: function (ev, i) {

        },
        allowDropMarketingaction: function (event) {
          var _this = this;
          _this.actionlist.push({'title': _this.titlemaction});
          switch (_this.titlemaction) {
          case '营销产品':
            _this.productsShow = true;
            _this.productsdata = [];
            break;
          case '关注风险':
            _this.risksShow = true;
            _this.risksdata = [];
            break;
          case '客户关怀':
            _this.customercaresShow = true;
            _this.caresdata = [];
            break;
          }
          for (var b in _this.actionField) {
            if (_this.actionField[b].title == _this.titlemaction) {
              _this.actionField[b].state = '1'; // 生成节点同时给左侧标点给点亮状态
            }
          }
        },
        queryModelGridFn: function (applType) { // 模板查询
          var me = this;
          var param = {
            condition: JSON.stringify({
              applyType: applType
            })
          };
        },
        selectModel: function (type) { // 弹出模板
          if (type == 'CARE') {
            this.modelViewTitle = '客户关怀';
            this.applType = 'CARE';
          } else if (type == 'RISK') {
            this.modelViewTitle = '关注风险';
            this.applType = 'RISK';
          } else if (type == 'PRODUCT') {
            this.modelViewTitle = '营销产品';
            this.applType = 'PRODUCT';
          }
          this.$nextTick(function () {
            this.queryModelGridFn(this.applType);
          });
          this.viewDialogVisible = true;
        },
        delproducts: function () { // 删除营销产品
          var _this = this;
          _this.actionField[0].state = '0';
          for (var a in _this.actionlist) {
            if (_this.actionlist[a].title == '营销产品') {
              _this.actionlist.splice(a, 1); // 从actionlist数组中删除营销产品
              _this.productsShow = false; // 把表格隐藏
            }
          }
        },
        delrisks: function () { // 删除关注风险
          var _this = this;
          _this.actionField[1].state = '0';
          for (var a in _this.actionlist) {
            if (_this.actionlist[a].title == '关注风险') {
              _this.actionlist.splice(a, 1); // 从actionlist数组中删除关注风险
              _this.risksShow = false; // 把表格隐藏
            }
          }
        },
        delcares: function () { // 删除客户关怀
          var _this = this;
          _this.actionField[2].state = '0';
          for (var a in _this.actionlist) {
            if (_this.actionlist[a].title == '客户关怀') {
              _this.actionlist.splice(a, 1); // 从actionlist数组中删除客户关怀
              _this.customercaresShow = false; // 把表格隐藏
            }
          }
        },
        getSaveListFn: function (savelist, rulelist, comparisionType) { // 获取要保存的list的公共方法
          var condition = '';
          var eventId = this.$refs.eventTable.selections[0].eventId;
          for (var i = 0; i < rulelist.length; i++) {
            var saveobj = {};
            if (rulelist[i].field == '') {
              break;
            }
            saveobj.variableName = rulelist[i].field;// 变量名
            saveobj.operator = rulelist[i].section.value;// 运算符
            saveobj.variableType = rulelist[i].variableType;// 变量类型
            saveobj.comparisionType = comparisionType;// 类型（条件字段、引用参数）
            saveobj.colOrder = i;
            saveobj.colGorder = i;
            saveobj.eventId = eventId;
            if (rulelist[i].children.length > 0) {
              saveobj.colJoin = '';// 内连接
              saveobj.colGjoin = rulelist[i].radio == '3' ? '' : rulelist[i].radio;// 外连接
            } else {
              saveobj.colJoin = rulelist[i].radio == '3' ? '' : rulelist[i].radio;// 内连接
              saveobj.colGjoin = '';// 外连接
            }
            if (!condition == '') {
              if (saveobj.colGjoin == '2') {
                condition += ' ' + 'OR' + ' ';
              } else if (saveobj.colGjoin == '1') {
                condition += ' ' + 'AND' + ' ';
              } else {
                if (saveobj.colJoin == '2') {
                  condition += ' ' + 'OR' + ' ';
                } else if (saveobj.colJoin == '1') {
                  condition += ' ' + 'AND' + ' ';
                }
              }
            }
            var value = '';
            for (var a = 0; a < rulelist[i].itempart.length; a++) {
              var values = '';
              for (var b = 0; b < rulelist[i].itempart[a].length; b++) {
                if (values != '') {
                  values = values + '#@#' + rulelist[i].itempart[a][b].value;
                } else {
                  if (Array.isArray(rulelist[i].itempart[a][b].value)) {
                    for (var ab = 0; ab < rulelist[i].itempart[a][b].value.length; ab++) {
                      if (ab == 0) {
                        values = rulelist[i].itempart[a][b].value[ab];
                      } else {
                        values = values + '#@#' + rulelist[i].itempart[a][b].value[ab];
                      }
                    }
                  } else {
                    values = rulelist[i].itempart[a][b].value;
                  }
                }
              }
              if (value != '') {
                value = value + ',' + values;
              } else {
                value = values;
              }
            }
            saveobj.comparisionValue = value;// 比较值
            savelist.push(saveobj);
            condition += '(' + ' ' + this.getOperator(saveobj.variableName, saveobj.operator, saveobj.variableType, value); // saveobj.variableName + ' ' + saveobj.operator + ' ' + value;
            var secCondi = '';
            for (var c = 0; c < rulelist[i].children.length; c++) {
              var saveobj = {};
              saveobj.variableName = rulelist[i].children[c].field;// 变量名
              saveobj.operator = rulelist[i].children[c].section.value;// 运算符
              saveobj.variableType = rulelist[i].children[c].variableType;// 变量类型
              saveobj.comparisionType = comparisionType;// 类型（条件字段、引用参数）
              saveobj.colOrder = c;
              saveobj.colGorder = i;
              saveobj.eventId = eventId;
              if (rulelist[i].children[c].children.length > 0) {
                saveobj.colJoin = rulelist[i].radio == '3' ? '' : rulelist[i].radio;// 内连接
                saveobj.colGjoin = rulelist[i].children[c].radio;// 外连接
                if (saveobj.colGjoin == '2') {
                  secCondi += ' ' + 'OR' + ' ( ';
                } else if (saveobj.colGjoin == '1') {
                  secCondi += ' ' + 'AND' + ' ( ';
                }
              } else {
                saveobj.colJoin = rulelist[i].children[c].radio;// 内连接
                saveobj.colGjoin = rulelist[i].radio == '3' ? '' : rulelist[i].radio;// 外连接
                if (saveobj.colJoin == '2') {
                  secCondi += ' ' + 'OR' + ' ';
                } else if (saveobj.colJoin == '1') {
                  secCondi += ' ' + 'AND' + ' ';
                }
              }
              var value = '';
              for (var a = 0; a < rulelist[i].children[c].itempart.length; a++) {
                var values = '';
                for (var b = 0; b < rulelist[i].children[c].itempart[a].length; b++) {
                  if (values != '') {
                    values = values + '#@#' + rulelist[i].children[c].itempart[a][b].value;
                  } else {
                    if (Array.isArray(rulelist[i].children[c].itempart[a][b].value)) {
                      for (var ab = 0; ab < rulelist[i].children[c].itempart[a][b].value.length; ab++) {
                        if (ab == 0) {
                          values = rulelist[i].children[c].itempart[a][b].value[ab];
                        } else {
                          values = values + '#@#' + rulelist[i].children[c].itempart[a][b].value[ab];
                        }
                      }
                    } else {
                      values = rulelist[i].children[c].itempart[a][b].value;
                    }
                  }
                }
                if (value != '') {
                  value = value + ',' + values;
                } else {
                  value = values;
                }
              }
              saveobj.comparisionValue = value;// 比较值
              savelist.push(saveobj);
              secCondi += ' ' + this.getOperator(saveobj.variableName, saveobj.operator, saveobj.variableType, value);// saveobj.variableName + ' ' + saveobj.operator + ' ' + value;
              var innerCondi = '';
              for (var a = 0; a < rulelist[i].children[c].children.length; a++) {
                var saveobj = {};
                saveobj.variableName = rulelist[i].children[c].children[a].field;// 变量名
                saveobj.operator = rulelist[i].children[c].children[a].section.value;// 运算符
                saveobj.variableType = rulelist[i].children[c].children[a].variableType;// 变量类型
                saveobj.comparisionType = comparisionType;// 类型（条件字段、引用参数）
                saveobj.colJoin = rulelist[i].children[c].children[a].radio;// 内连接
                saveobj.colGjoin = rulelist[i].children[c].radio;// 外连接
                saveobj.colOrder = a;
                saveobj.colGorder = c;
                saveobj.eventId = eventId;
                var value = '';
                for (var d = 0; d < rulelist[i].children[c].children[a].itempart.length; d++) {
                  var values = '';
                  for (var b = 0; b < rulelist[i].children[c].children[a].itempart[d].length; b++) {
                    if (values != '') {
                      values = values + '#@#' + rulelist[i].children[c].children[a].itempart[d][b].value;
                    } else {
                      if (Array.isArray(rulelist[i].children[c].children[a].itempart[d][b].value)) {
                        for (var ab = 0; ab < rulelist[i].children[c].children[a].itempart[d][b].value.length; ab++) {
                          if (ab == 0) {
                            values = rulelist[i].children[c].children[a].itempart[d][b].value[ab];
                          } else {
                            values = values + '#@#' + rulelist[i].children[c].children[a].itempart[d][b].value[ab];
                          }
                        }
                      } else {
                        values = rulelist[i].children[c].children[a].itempart[d][b].value;
                      }
                    }
                  }
                  if (value != '') {
                    value = value + ',' + values;
                  } else {
                    value = values;
                  }
                }
                if (!innerCondi == '') {
                  if (saveobj.colJoin == '2') {
                    innerCondi += ' ' + 'OR' + ' ';
                  } else if (saveobj.colJoin == '1') {
                    innerCondi += ' ' + 'AND' + ' ';
                  }
                }
                if (saveobj.colJoin !== '') {
                  if (saveobj.colJoin == '2') {
                    innerCondi += ' ' + 'OR' + ' ';
                  } else if (saveobj.colJoin == '1') {
                    innerCondi += ' ' + 'AND' + ' ';
                  }
                } else {
                  if (saveobj.colGjoin == '2') {
                    innerCondi += ' ' + 'OR' + ' ';
                  } else if (saveobj.colGjoin == '1') {
                    innerCondi += ' ' + 'AND' + ' ';
                  }
                }
                saveobj.comparisionValue = value;// 比较值
                savelist.push(saveobj);
                innerCondi += ' ' + this.getOperator(saveobj.variableName, saveobj.operator, saveobj.variableType, value);// saveobj.variableName + ' ' + saveobj.operator + ' ' + value;
              }
              condition += secCondi;
              if (innerCondi != '') {
                condition += innerCondi + ')';
              }
            }
            condition += ')';
          }
          return condition;
        },
        // 拼接表达式
        getOperator: function (field, operator, variableType, value) {
          var expression = '';
          if (variableType == 1) {
            if (operator == 1) {
              expression = '@' + field + ' = ' + '\'' + value + '\'';
            } else if (operator == 2) {
              expression = '@' + field + ' != ' + '\'' + value + '\'';
            } else if (operator == 3) {
              expression = '@' + field + ' like ' + '\'%' + value + '%\'';
            } else if (operator == 4) {
              expression = '@' + field + ' not like ' + '\'%' + value + '%\'';
            }
          } else if (variableType == 2) {
            if (operator == 1) {
              expression = '@' + field + ' = ' + value;
            } else if (operator == 2) {
              expression = '@' + field + ' != ' + value;
            } else if (operator == 3) {
              expression = '@' + field + ' > ' + value;
            } else if (operator == 4) {
              expression = '@' + field + ' >= ' + value;
            } else if (operator == 5) {
              expression = '@' + field + ' < ' + value;
            } else if (operator == 6) {
              expression = '@' + field + ' <= ' + value;
            } else if (operator == 7) {
              var values = value.split('#@#');
              expression = '(' + '@' + field + ' >= ' + values[0] + ' && ' + '@' + field + ' <= ' + values[1] + ')';
            } else if (operator == 8) {
              var values = value.split('#@#');
              expression = '(' + '@' + field + ' > ' + values[0] + ' && ' + '@' + field + ' < ' + values[1] + ')';
            } else if (operator == 9) {
              var values = value.split('#@#');
              expression = '(' + '@' + field + ' <= ' + values[0] + ' || ' + '@' + field + ' >= ' + values[1] + ')';
            } else if (operator == 10) {
              var values = value.split('#@#');
              expression = '(' + '@' + field + ' < ' + values[0] + ' || ' + '@' + field + ' > ' + values[1] + ')';
            }
          } else if (variableType == 3) {
            if (operator == 1) {
              expression = '@' + field + ' = ' + value;
            } else if (operator == 2) {
              expression = '@' + field + ' != ' + value;
            } else if (operator == 3) {
              expression = '@' + field + ' > ' + value;
            } else if (operator == 4) {
              expression = '@' + field + ' >= ' + value;
            } else if (operator == 5) {
              expression = '@' + field + ' < ' + value;
            } else if (operator == 6) {
              expression = '@' + field + ' <= ' + value;
            } else if (operator == 7) {
              var values = value.split('#@#');
              expression = '(' + '@' + field + ' >= ' + values[0] + ' && ' + '@' + field + ' <= ' + values[1] + ')';
            } else if (operator == 8) {
              var values = value.split('#@#');
              expression = '(' + '@' + field + ' > ' + values[0] + ' && ' + '@' + field + ' < ' + values[1] + ')';
            } else if (operator == 9) {
              var values = value.split('#@#');
              expression = '(' + '@' + field + ' <= ' + values[0] + ' || ' + '@' + field + ' >= ' + values[1] + ')';
            } else if (operator == 10) {
              var values = value.split('#@#');
              expression = '(' + '@' + field + ' < ' + values[0] + ' || ' + '@' + field + ' > ' + values[1] + ')';
            }
          } else if (variableType == 4) {
            if (operator == 1) {
              expression = '@' + field + ' = ' + value;
            }
          } else if (variableType == 5) {
            if (operator == 1) {
              expression = '@' + field + ' = ' + value;
            }
          } else if (variableType == 6) {
            var values = value.split('#@#');
            var val = '';
            if (Array.isArray(values)) {
              for (var a = 0; a < values.length; a++) {
                if (a == 0) {
                  val = '\'' + values[a] + '\'';
                } else {
                  val = val + ',' + '\'' + values[a] + '\'';
                }
              }
            }
            if (operator == 1) {
              expression = '@' + field + ' in ' + '(' + val + ')';
            } else if (operator == 2) {
              expression = '@' + field + ' not in ' + '(' + val + ')';
            }
          } else if (variableType == 7) {
            if (operator == 1) {
              expression = '@' + field + ' like ' + '\'%' + value + '%\'';
            } else if (operator == 2) {
              expression = '@' + field + ' not like ' + '\'%' + value + '%\'';
            }
          }
          return expression;
        },
        savefun: function () { // 保存事件规则配置
          var _this = this;
          this.getOperator(1, 2);
          var _this = this;
          var savelist = [];
          var saveCondi = '';
          var condi = '', paramCondi = '';
          if (_this.conditionlist.length > 0) {
            condi = _this.getSaveListFn(savelist, _this.conditionlist, '1');// 要保存的list、需要取值的list、类型
          }
          if (_this.parameterlist.length > 0) {
            paramCondi = _this.getSaveListFn(savelist, _this.parameterlist, '2');
          }
          if (condi != '' && paramCondi == '') {
            saveCondi = condi;
          } else if (paramCondi != '' && condi == '') {
            saveCondi = paramCondi;
          } else if (condi != '' && paramCondi != '') {
            saveCondi = '(' + condi + ') AND (' + paramCondi + ')';
          }
          if (savelist.length == 0) {
            _this.$message({message: '请先设置规则', type: 'warning'});
          } else {
            var conlist = [];
            for (var i = 0; i < _this.continuitylist.length; i++) {
              var saveobj = {};
              if (_this.continuitylist[i].field == '') {
                break;
              }
              saveobj.variableName = _this.continuitylist[i].field;// 变量名
              saveobj.operator = _this.continuitylist[i].section.value;// 运算符
              saveobj.variableType = _this.continuitylist[i].variableType;// 变量类型
              saveobj.eventId = _this.$refs.eventTable.selections[0].eventId;// 事件编号
              var value = '';
              for (var a = 0; a < _this.continuitylist[i].itempart.length; a++) {
                var values = '';
                for (var b = 0; b < _this.continuitylist[i].itempart[a].length; b++) {
                  if (values != '') {
                    values = values + '#@#' + _this.continuitylist[i].itempart[a][b].value;
                  } else {
                    values = _this.continuitylist[i].itempart[a][b].value;
                  }
                }
                if (value != '') {
                  value = value + ',' + values;
                } else {
                  value = values;
                }
              }
              saveobj.statisticalMethod = _this.continuitylist[i].section.value;
              saveobj.cycleType = '1';
              saveobj.comparisionValue = value;
              conlist.push(saveobj);
            }
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cmfrceventconfig/savecomparison',
              data: JSON.stringify(savelist),
              callback: function (code, message, response) {
              }
            });
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cmfrceventconfig/upeventinfo',
              data: {
                eventId: _this.$refs.eventTable.selections[0].eventId,
                condition: saveCondi
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  if (conlist.length < 1) {
                    _this.$refs.eventTable.remoteData();
                    _this.resetRullConfig();
                    _this.ruleDialogVisible = false;
                    _this.$message({message: '操作保存成功', type: 'success'});
                  }
                }
              }
            });
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cmfrceventconfig/saveconcom',
              data: JSON.stringify(conlist),
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.eventTable.remoteData();
                  _this.resetRullConfig();
                  _this.ruleDialogVisible = false;
                  _this.$message({message: '操作保存成功', type: 'success'});
                }
              }
            });
            _this.saveAction();
          }
          // alert(saveCondi);
          // // 循环取引用参数
          // alert(JSON.stringify(savelist));
          // alert(JSON.stringify(_this.parameterlist));
        },
        saveAction: function () { // 保存动作
          var _this = this;
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/cmfrceventconfig/deleteaction/',
            data: {
              eventId: _this.$refs.eventTable.selections[0].eventId
            },
            callback: function (code, message, response) {
            }
          });
          if (_this.customercaresShow && _this.caresdata.length > 0) {
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cmfrceventconfig/savecare/' + _this.$refs.eventTable.selections[0].eventId,
              data: JSON.stringify(_this.caresdata),
              callback: function (code, message, response) {
              }
            });
          }
          if (_this.risksShow && _this.risksdata.length > 0) {
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cmfrceventconfig/saverisk/' + _this.$refs.eventTable.selections[0].eventId,
              data: JSON.stringify(_this.risksdata),
              callback: function (code, message, response) {
              }
            });
          }
          if (_this.productsShow && _this.productsdata.length > 0) {
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cmfrceventconfig/savepro/' + _this.$refs.eventTable.selections[0].eventId,
              data: JSON.stringify(_this.productsdata),
              callback: function (code, message, response) {
              }
            });
          }
        },
        closeDialog: function () { // dialog关闭动作
          this.resetRullConfig();
        },
        // 重置规则配置
        resetRullConfig: function () {
          this.conditionlist = [];
          this.parameterlist = []; // 引用参数
          this.continuitylist = []; // 连续动作
          this.productsShow = false;
          this.risksShow = false;
          this.customercaresShow = false;
          this.productsdata = [];
          this.caresdata = [];
          this.risksdata = [];
        },
        // 取消方法
        returnFn: function () {
          this.resetRullConfig();
          this.ruleDialogVisible = false;
        },
        checkModel: function () { // 选择模板
          if (this.$refs.modeltable.selections[0]) {
            if (this.applType == 'CARE') {
              for (var i = 0; i < this.$refs.modeltable.selections.length; i++) {
                var obj = {};
                obj.modelName = this.$refs.modeltable.selections[i].modelName;
                obj.careId = this.$refs.modeltable.selections[i].id;
                obj.tempType = '2';
                this.caresdata.push(obj);
              }
            } else if (this.applType == 'RISK') {
              for (var i = 0; i < this.$refs.modeltable.selections.length; i++) {
                var obj = {};
                obj.modelName = this.$refs.modeltable.selections[i].modelName;
                obj.riskId = this.$refs.modeltable.selections[i].id;
                obj.tempType = '2';
                this.risksdata.push(obj);
              }
            } else if (this.applType == 'PRODUCT') {
              for (var i = 0; i < this.$refs.modeltable.selections.length; i++) {
                var obj = {};
                obj.modelName = this.$refs.modeltable.selections[i].modelName;
                obj.proId = this.$refs.modeltable.selections[i].id;
                obj.tempType = '2';
                this.productsdata.push(obj);
              }
            }
            this.viewDialogVisible = false;
          } else {
            this.$message({message: '请选择一条数据', type: 'warning'});
          }
        },
        cancelModelfn: function () {
          this.viewDialogVisible = false;
        }
      },
      destroyed: function () {

      }
    });
  };

  /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
  exports.destroy = function (id, cite) {

  };
});