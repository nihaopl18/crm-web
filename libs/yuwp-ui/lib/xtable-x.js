module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 129);
/******/ })
/************************************************************************/
/******/ ({

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_xtable_x__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(57);


/* istanbul ignore next */
_src_xtable_x__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_xtable_x__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_xtable_x__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_xtable_x__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/util");

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_utils_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _src_utils_util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_utils_util__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_mixins_locale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _src_mixins_locale__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_mixins_locale__WEBPACK_IMPORTED_MODULE_1__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };




function noop() {}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ElTableX',
  xtype: 'YuXtableX',
  mixins: [_src_mixins_locale__WEBPACK_IMPORTED_MODULE_1___default.a],

  template: '<div></div>',
  props: {
    tableData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 单选项名称
    radiolabel: String,
    // 序号项名称
    indexlabel: String,
    height: [String, Number],
    maxHeight: [String, Number],
    fit: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    rowKey: [String, Function],
    reserveSelection: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    // 默认参数
    baseParams: Object,
    // 是否开启隐藏列
    hideColumn: {
      type: Boolean,
      default: false
    },
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    spanMethod: Function,
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    currentRowKey: [String, Number],
    emptyText: String,
    expandRowKeys: Array,
    defaultExpandAll: Boolean,
    defaultSort: Object,
    tooltipEffect: String,
    defaultLoad: {
      type: Boolean,
      default: true
    },
    pageable: {
      type: Boolean,
      default: true
    },
    dataUrl: String,
    /** 请求类型 */
    requestType: {
      type: String,
      default: 'GET'
    },
    rowIndex: Boolean,
    radiobox: Boolean,
    checkbox: Boolean,
    tableColumns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    tableFilters: Object,
    jsonData: {
      type: String,
      default: 'data'
    },
    jsonTotal: {
      type: String,
      default: 'total'
    },
    pageKey: {
      type: String,
      default: 'page'
    },
    sizeKey: {
      type: String,
      default: 'size'
    },
    pageSize: {
      type: Number,
      default: 10
    },
    conditionKey: {
      type: String,
      default: 'condition'
    },
    parseResponse: {
      type: Function,
      default: noop
    },
    autoSortable: Boolean,
    requestLoadOption: {
      type: Object,
      default: function _default() {
        return {
          // 是否展示加载loading
          show: false,
          // 局部loading 作用的/覆盖的 DOM 对象，
          // 如果不配置，则显示全局loading
          target: null,
          // loading的自定义option
          option: {}
        };
      }
    },
    encode: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      radiolabelValue: '',
      indexlabelValue: '',
      radio: '',
      data: [],
      total: 0,
      queryParam: {},
      page: 1,
      size: this.pageSize,
      // loading: false,
      selections: [],
      _tc: [],
      tableKey: 0,
      repeatTrigger: false,
      contextMenuId: 'c_menu_id_' + new Date().getTime(),
      // 是否已查询过，解决未查询直接翻页情况
      queryFlag: false
    };
  },

  methods: {
    pageChangeFn: function pageChangeFn(val) {
      var _this = this;
      _this.$emit('page-change', _this.selections, val);
      _this.page = val;
      if (_this.repeatTrigger) {
        _this.repeatTrigger = false;
      } else {
        // 未发请求是，不能直接翻页发请求
        if (this.dataUrl && this.queryFlag === false) {
          return;
        }
        _this.privateRemoteData(_this.queryParam, 'pageGo');
      }
    },
    sizeChangeFn: function sizeChangeFn(val) {
      var _this = this;
      _this.size = val;
      if (_this.repeatTrigger) {
        _this.repeatTrigger = false;
      } else {
        if (_this.page !== 1) {
          _this.page = 1;
          _this.repeatTrigger = true;
        }
        // 未发请求是，不能直接翻页发请求
        if (this.dataUrl && this.queryFlag === false) {
          return;
        }
        _this.privateRemoteData(_this.queryParam, 'pageGo');
      }
    },

    /**
      * 外部调用，请使用remoteData方法
      * privateRemoteDate仅供组件内部使用
      */
    privateRemoteData: function privateRemoteData(queryParam, type) {
      var me = this;
      this.queryFlag = true;
      me.radio = '';
      me.data = [];
      // me.loading = true;
      if (!this.reserveSelection && !this.$refs.table.store.states.reserveSelection || type !== 'pageGo') {
        me.selections = [];
        me.$refs.table.store.states.selection = [];
        me.$refs.table.store.states.selectionIds = [];
        me.$refs.table.store.states.isAllSelected = false;
      }
      if (!me.dataUrl) {
        throw new Error(this.t('el.xtablex.noDataUrl'));
      }
      var loadOption = yufp.clone(me.requestLoadOption, {});
      if (!loadOption.show) {
        var ld = this.$loading({
          target: me.$el,
          body: false
        });
      } else {
        loadOption.option = loadOption.option || {};
        yufp.clone({
          target: me.$el,
          body: false
        }, loadOption.option);
      }
      me.queryParam = queryParam ? queryParam : me.queryParam;

      queryParam = yufp.extend(true, {}, me.queryParam);
      var baseParams = yufp.extend(true, {}, me.baseParams);

      var bCondition = baseParams[me.conditionKey];
      var qCondition = queryParam[me.conditionKey];
      if (bCondition) {
        if (qCondition) {
          bCondition = (typeof bCondition === 'undefined' ? 'undefined' : _typeof(bCondition)) === 'object' ? bCondition : JSON.parse(bCondition);
          qCondition = (typeof qCondition === 'undefined' ? 'undefined' : _typeof(qCondition)) === 'object' ? qCondition : JSON.parse(qCondition);
          yufp.extend(true, bCondition, qCondition);
        }
        queryParam[me.conditionKey] = (typeof bCondition === 'undefined' ? 'undefined' : _typeof(bCondition)) === 'object' ? JSON.stringify(bCondition) : bCondition;
      } else if (qCondition) {
        queryParam[me.conditionKey] = (typeof qCondition === 'undefined' ? 'undefined' : _typeof(qCondition)) === 'object' ? JSON.stringify(qCondition) : qCondition;
      }
      delete baseParams[me.conditionKey];
      queryParam = yufp.extend(baseParams, queryParam);

      if (me.pageable) {
        var pageObj = {};
        pageObj[me.pageKey] = me.page;
        pageObj[me.sizeKey] = me.size;
        yufp.extend(queryParam, pageObj);
      }
      yufp.service.request({
        url: me.dataUrl,
        data: queryParam,
        method: me.requestType,
        loadingUi: loadOption,
        encode: me.encode,
        callback: function callback(code, message, response) {
          if (me.parseResponse && typeof me.parseResponse === 'function') {
            var rest = me.parseResponse(code, message, response);
            if (rest === false) {
              me.$nextTick(function () {
                ld && ld.close();
              });
              return;
            }
          }
          me.data = Object(_src_utils_util__WEBPACK_IMPORTED_MODULE_0__["getValueByPath"])(response, me.jsonData) || [];
          me.total = Object(_src_utils_util__WEBPACK_IMPORTED_MODULE_0__["getValueByPath"])(response, me.jsonTotal) || 0;
          me.$nextTick(function () {
            ld && ld.close();
            ld = null;
            me.$emit('loaded', me.data, me.total, response, type);
          });
        }
      });
    },
    remoteData: function remoteData(queryParam) {
      var _this = this;
      if (_this.page !== 1) {
        _this.page = 1;
        _this.repeatTrigger = true;
      }
      _this.privateRemoteData(queryParam);
    },
    clearSelection: function clearSelection(selection) {
      return this.$refs.table.clearSelection(selection);
    },
    toggleRowSelection: function toggleRowSelection(row, selected) {
      return this.$refs.table.toggleRowSelection(row, selected);
    },
    setCurrentRow: function setCurrentRow(row) {
      if (this.radiobox) {
        this.radio = row.$index;
      }
      return this.$refs.table.setCurrentRow(row);
    },

    // 触发event类型方法
    select: function select(selection, row) {
      this.$emit('select', selection, row);
    },
    selectAll: function selectAll(selection) {
      this.$emit('select-all', selection);
    },
    selectionChange: function selectionChange(selection) {
      this.selections = selection;
      this.$emit('selection-change', selection);
    },
    cellMouseEnter: function cellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event);
    },
    cellMouseLeave: function cellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event);
    },
    cellClick: function cellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event);
    },
    cellDblclick: function cellDblclick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event);
    },
    rowClick: function rowClick(row, event, column) {
      if (!this.checkbox) {
        this.setCurrentRow(row);
        this.radio = row.$index;
        this.selections = [row];
      } else {
        this.$refs.table.toggleRowSelection(row);
      }
      this.$emit('row-click', row, event, column);
    },
    rowContextmenu: function rowContextmenu(row, event) {
      this.$emit('row-contextmenu', row, event);
    },
    rowDblclick: function rowDblclick(row, event) {
      if (!this.checkbox) {
        this.selections = [row];
      }
      this.$emit('row-dblclick', row, event);
    },
    headerClick: function headerClick(column, event) {
      this.$emit('header-click', column, event);
    },
    sortChange: function sortChange(obj) {
      if (!obj.column) {
        return;
      }
      var st = obj.column.sortable;
      if (st && st === 'custom') {
        var order = obj.order.replace('ending', '');
        this.remoteData({
          sort: obj.prop + ' ' + order
        });
      } else {
        this.$emit('sort-change', obj);
      }
    },
    currentChange: function currentChange(currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow);
    },

    /**
      * 表头右键菜单选项改变
      * @param {Object} e
      */
    headerContextChange: function headerContextChange(e) {
      var _this2 = this;

      this.$nextTick(function () {
        var ex = e.target.parentElement.parentElement;
        var label = ex.getAttribute('labels');
        var flag = ex.childNodes[0].className.indexOf('is-checked');
        flag = flag > 0 ? !0 : false;
        var tc = _this2.tableColumns;
        for (var i = 0; i < tc.length; i++) {
          if (tc[i].label === label) {
            // 找到和多选对应的列
            _this2.tableColumns[i].hidden = !flag;
            _this2.tableKey++;
            return;
          }
          // 判断二级
          if (tc[i].children) {
            for (var j = 0; j < tc[i].children.length; j++) {
              if (tc[i].children[j].label === label) {
                // 找到和多选对应的列
                _this2.tableColumns[i].children[j].hidden = !flag;
                // 循环此节点的所有子节点都已取消
                for (var m = 0; m < _this2.tableColumns[i].children.length; m++) {
                  if (_this2.tableColumns[i].children[m].hidden === false) {
                    _this2.tableColumns[i].hidden = false;
                    break;
                  }
                  _this2.tableColumns[i].hidden = true;
                }
                _this2.tableKey++;
                return;
              }
            }
          }
        }
      });
    },

    /**
      * 表头右键监听
      * @param e:鼠标事件
      * @param v:vue
      */
    contextMenuFun: function contextMenuFun(e, v) {
      var contextmenuTab = v.$parent.$el.querySelector('#' + v.contextMenuId);
      v.openMenu(contextmenuTab, e);
      contextmenuTab.removeEventListener('mouseleave', function (e) {
        v.closeMenu(contextmenuTab);
      });
      contextmenuTab.addEventListener('mouseleave', function (e) {
        v.closeMenu(contextmenuTab);
      });
    },
    openMenu: function openMenu(contextmenuTab, e) {
      contextmenuTab.style.left = e.clientX + 'px';
      contextmenuTab.style.top = e.clientY + 'px';
      contextmenuTab.style.display = 'block';
      contextmenuTab.style.position = 'fixed';
    },
    closeMenu: function closeMenu(contextmenuTab) {
      contextmenuTab.style.display = 'none';
    },

    /**
      * 外部自定义事件方法
      * deprecated, 反对使用，请直接使用$emit即可
      * @param eventName
      * @param scope
      * @param other
      */
    _$event: function _$event(eventName, scope, params) {
      this.$emit(eventName, scope, params);
    }
  },
  watch: {
    tableColumns: function tableColumns(val, old) {
      // 增加if判断，解决table嵌套闪烁问题。
      if (JSON.stringify(val) !== JSON.stringify(old)) {
        this.tableKey++;
      };
    },
    baseParams: function baseParams(val) {
      var _this = this;
      if (_this.page !== 1) {
        _this.page = 1;
        _this.repeatTrigger = true;
      }
      _this.privateRemoteData();
    },
    dataUrl: function dataUrl(val) {
      var _this = this;
      if (_this.page !== 1) {
        _this.page = 1;
        _this.repeatTrigger = true;
      }
      _this.privateRemoteData();
    },
    tableData: function tableData(val) {
      this.data = val;
    }
  },
  // render(h) {
  //   debugger;
  //   let template = <div></div>;
  //   return template;
  // },
  created: function created() {
    var renderFormatter = function renderFormatter(tableColumns) {
      var formatterFn = function formatterFn(dataCode, fn) {
        return function (row, column) {
          var val = yufp.lookup.convertKey(dataCode, row[column.property]);
          return typeof fn === 'function' ? fn(row, column, val) : val;
        };
      };
      if (tableColumns) {
        for (var i = 0, len = tableColumns.length; i < len; i++) {
          var tc = tableColumns[i];
          if (tc.dataCode) {
            tc.formatter = formatterFn(tc.dataCode, tc.formatter);
          }
        }
      }
    };
    var renderXtemplate = function renderXtemplate(tableColumns) {
      if (!tableColumns) {
        return h('div', { 'class': 'el-table-x' });
      }
      var props = ['type', 'column-key', 'label', 'prop', 'width', 'hidden', 'min-width', 'fixed', 'render-header', 'sortable', 'sort-method', 'resizable', 'formatter', 'show-overflow-tooltip', 'align', 'header-align', 'class-name', 'label-class-name', 'selectable', 'reserve-selection', 'filters', 'filter-placement', 'filter-multiple', 'filter-method', 'filtered-value', 'data-code'];
      var joinProp = function joinProp(varPrefix, tc, flag, index) {
        var str = ' :key="' + index + '"';
        varPrefix += '.';
        for (var i = 0, len = props.length; i < len; i++) {
          var key = props[i];
          var value = key.replace(/\-(\w)/g, function (all, letter) {
            return letter.toUpperCase();
          });
          if (tc.hasOwnProperty(value)) {
            // && (!flag || (flag && key != 'prop'))此代码影响排序prop获取
            if (value !== 'hidden') {
              str += ' :' + key + '="' + varPrefix + value + '"';
            } else {
              str += ' v-if="!' + varPrefix + value + '"';
            }
          }
        }
        return str;
      };
      var menuTpl = '<div class="yu-gridContextMenu" :id="contextMenuId" style="display:none;">';
      for (var i = 0; i < tableColumns.length; i++) {
        var hidden = tableColumns[i].label;
        if (!tableColumns[i].children) {
          menuTpl += '<el-checkbox style="display:block;line-height:25px;" @change="headerContextChange" :checked=!' + tableColumns[i].hidden + ' labels="' + tableColumns[i].label + '">' + hidden + '</el-checkbox>';
        }
        // 二级表头
        if (tableColumns[i].children) {
          for (var j = 0; j < tableColumns[i].children.length; j++) {
            menuTpl += '<el-checkbox style="display:block;line-height:25px;" @change="headerContextChange" :checked=!' + tableColumns[i].hidden + ' labels="' + tableColumns[i].children[j].label + '">' + tableColumns[i].children[j].label + '</el-checkbox>';
          }
        }
      }
      menuTpl += '</div>';
      var prefixTpl = '<div class="el-table-x">';
      // #TODO 修改自定义事件cell-mouse-enter、cell-mouse-leave添加的.stop属性，自定义事件不能直接调用.stop
      prefixTpl += '<el-table ref="table" :key="tableKey" :data="data" :height="pageable?(height-48):height" :max-height="pageable?(maxHeight-48):maxHeight" :fit="fit"\
            :stripe="stripe" :border="border" :row-key="rowKey" :show-header="showHeader"\
            :show-summary="showSummary" :sum-text="sumText" :summary-method="summaryMethod" :span-method="spanMethod"\
            :row-class-name="rowClassName" :row-style="rowStyle" :highlight-current-row="checkbox?false:highlightCurrentRow"\
            :current-row-key="currentRowKey" :empty-text="emptyText" :expand-row-keys="expandRowKeys"\
            :default-expand-all="defaultExpandAll" :default-sort="defaultSort" :tooltip-effect="tooltipEffect" :auto-sortable="autoSortable"\
            @select="select" @select-all="selectAll" @selection-change="selectionChange" @cell-dblclick="cellDblclick"\
            @cell-mouse-enter="cellMouseEnter" @cell-mouse-leave="cellMouseLeave" @cell-click="cellClick"\
            @row-click="rowClick" @row-contextmenu="rowContextmenu" @row-dblclick="rowDblclick" @header-click="headerClick"\
            @sort-change="sortChange" @current-change="currentChange">';

      if (this.checkbox) {
        prefixTpl += this.reserveSelection ? '<el-table-column type="selection" reserve-selection width="48"></el-table-column>' : '<el-table-column type="selection" width="48"></el-table-column>';
      } else if (this.radiobox) {
        this.radiolabelValue = !this.radiolabel ? '' : this.radiolabel;
        prefixTpl += '<el-table-column width="44" :label="radiolabelValue">\
            <template scope="scope">\
              <el-radio v-model="radio" :label="scope.row.$index = scope.$index">&nbsp;</el-radio>\
            </template>\
          </el-table-column>';
      }
      if (this.rowIndex) {
        this.indexlabelValue = !this.indexlabel ? this.t('el.xtablex.headerIndex') : this.indexlabel;
        prefixTpl += '<el-table-column type="index" width="55" :label="indexlabelValue"></el-table-column>';
      }
      var suffixTpl = '</el-table>';
      suffixTpl += menuTpl;
      suffixTpl += '<el-pagination v-show="pageable" :total="total" :current-page.sync="page" :page-size="size"\
            @size-change="sizeChangeFn" @current-change="pageChangeFn"\
            layout="total, sizes, prev, pager, next, jumper">\
          </el-pagination>\
          </div>';
      // 循环一级表头
      var middleTpl = '';
      i = 0;
      var ilen = tableColumns.length;
      for (; i < ilen; i++) {
        var tc = tableColumns[i];
        var flag = typeof tc.template === 'function';
        middleTpl += '<el-table-column ';
        middleTpl += joinProp('tableColumns[' + i + ']', tc, flag, i);
        middleTpl += '>';
        middleTpl += flag ? tc.template() : '';
        if (tc.children) {
          // 循环二级表头
          j = 0;
          var jlen = tc.children.length;
          for (; j < jlen; j++) {
            var tc1 = tc.children[j];
            var flag1 = typeof tc1.template === 'function';
            middleTpl += '<el-table-column ';
            middleTpl += joinProp('tableColumns[' + i + '].children[' + j + ']', tc1, flag1, i + j);
            middleTpl += '>';
            middleTpl += flag1 ? tc1.template() : '';
            if (tc1.children) {
              // 循环三级表头
              for (var k = 0, klen = tc1.children.length; k < klen; k++) {
                var tc2 = tc1.children[k];
                var flag2 = typeof tc2.template === 'function';
                middleTpl += '<el-table-column ';
                middleTpl += joinProp('tableColumns[' + i + '].children[' + j + '].children[' + k + ']', tc2, flag2, i + j + k);
                middleTpl += '>';
                middleTpl += flag2 ? tc2.template() : '';
                middleTpl += '</el-table-column>';
              }
            }
            middleTpl += '</el-table-column>';
          }
        }
        middleTpl += '</el-table-column>';
      }
      return prefixTpl + middleTpl + suffixTpl;
    };
    // 初始化是否显示
    var tableColumns = this.$options.propsData.tableColumns;
    for (var i = 0; i < tableColumns.length; i++) {
      if (!tableColumns[i].hidden) {
        tableColumns[i].hidden = false;
      }
      // 初始化二级
      if (tableColumns[i].children) {
        for (var j = 0; j < tableColumns[i].children.length; j++) {
          if (!tableColumns[i].children[j].hidden) {
            tableColumns[i].children[j].hidden = false;
          }
        }
      }
    }
    renderFormatter.call(this, tableColumns);
    this.$options.template = renderXtemplate.call(this, tableColumns);
    this.$options.filters = this.$options.propsData.tableFilters;
  },
  updated: function updated() {
    var _this = this;
    if (_this.hideColumn) {
      var thead = this.$el.querySelector('.el-table__header-wrapper');
      thead.removeEventListener('contextmenu', function (e) {
        e.preventDefault();
        _this.contextMenuFun(e, _this);
      });
      thead.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        _this.contextMenuFun(e, _this);
      });
    }
  },
  mounted: function mounted() {
    if (this.defaultLoad && this.dataUrl) {
      this.privateRemoteData();
    } else {
      this.data = this.tableData;
    }
  }
});

/***/ })

/******/ });