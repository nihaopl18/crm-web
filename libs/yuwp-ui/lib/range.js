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
/******/ 	return __webpack_require__(__webpack_require__.s = 171);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 105:
/***/ (function(module, exports) {

module.exports = require("@/lib/row");

/***/ }),

/***/ 106:
/***/ (function(module, exports) {

module.exports = require("@/lib/col");

/***/ }),

/***/ 107:
/***/ (function(module, exports) {

module.exports = require("@/lib/date-picker");

/***/ }),

/***/ 142:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 143:
/***/ (function(module, exports) {

module.exports = require("setimmediate");

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/range/src/range.vue?vue&type=template&id=57c1e06c&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "el-range" },
    [
      _vm.type === "date"
        ? _c(
            "yu-row",
            [
              _c(
                "yu-col",
                { attrs: { span: 11 } },
                [
                  _c(
                    "yu-date-picker",
                    _vm._g(
                      _vm._b(
                        {
                          attrs: {
                            type: "date",
                            placeholder: _vm.minDatePlaceText
                          },
                          on: {
                            change: function($event) {
                              return _vm.dateChange($event, 0)
                            }
                          },
                          model: {
                            value: _vm.minDate,
                            callback: function($$v) {
                              _vm.minDate = $$v
                            },
                            expression: "minDate"
                          }
                        },
                        "yu-date-picker",
                        _vm.$attrs,
                        false
                      ),
                      _vm.$listeners
                    )
                  )
                ],
                1
              ),
              _c(
                "yu-col",
                { staticClass: "el-range_col", attrs: { span: 2 } },
                [_c("div", { staticClass: "el-range_seprator" })]
              ),
              _c(
                "yu-col",
                { attrs: { span: 11 } },
                [
                  _c(
                    "yu-date-picker",
                    _vm._g(
                      _vm._b(
                        {
                          attrs: {
                            type: "date",
                            placeholder: _vm.maxDatePlaceText
                          },
                          on: {
                            change: function($event) {
                              return _vm.dateChange($event, 1)
                            }
                          },
                          model: {
                            value: _vm.maxDate,
                            callback: function($$v) {
                              _vm.maxDate = $$v
                            },
                            expression: "maxDate"
                          }
                        },
                        "yu-date-picker",
                        _vm.$attrs,
                        false
                      ),
                      _vm.$listeners
                    )
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm.type === "number"
        ? _c(
            "yu-row",
            [
              _c(
                "yu-col",
                { attrs: { span: 11 } },
                [
                  _c(
                    "yu-input",
                    _vm._g(
                      _vm._b(
                        {
                          attrs: {
                            type: "num",
                            formatter: _vm.moneyFormatter,
                            placeholder: _vm.minNumPlaceText
                          },
                          on: {
                            change: function($event) {
                              return _vm.debounceChange($event, 0)
                            }
                          },
                          model: {
                            value: _vm.minNumber,
                            callback: function($$v) {
                              _vm.minNumber = $$v
                            },
                            expression: "minNumber"
                          }
                        },
                        "yu-input",
                        _vm.$attrs,
                        false
                      ),
                      _vm.$listeners
                    )
                  )
                ],
                1
              ),
              _c(
                "yu-col",
                { staticClass: "el-range_col", attrs: { span: 2 } },
                [_c("div", { staticClass: "el-range_seprator" })]
              ),
              _c(
                "yu-col",
                { attrs: { span: 11 } },
                [
                  _c(
                    "yu-input",
                    _vm._g(
                      _vm._b(
                        {
                          attrs: {
                            type: "num",
                            formatter: _vm.moneyFormatter,
                            placeholder: _vm.maxNumPlaceText
                          },
                          on: {
                            change: function($event) {
                              return _vm.debounceChange($event, 1)
                            }
                          },
                          model: {
                            value: _vm.maxNumber,
                            callback: function($$v) {
                              _vm.maxNumber = $$v
                            },
                            expression: "maxNumber"
                          }
                        },
                        "yu-input",
                        _vm.$attrs,
                        false
                      ),
                      _vm.$listeners
                    )
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/range/src/range.vue?vue&type=template&id=57c1e06c&

// EXTERNAL MODULE: external "@/lib/row"
var row_ = __webpack_require__(105);
var row_default = /*#__PURE__*/__webpack_require__.n(row_);

// EXTERNAL MODULE: external "@/lib/col"
var col_ = __webpack_require__(106);
var col_default = /*#__PURE__*/__webpack_require__.n(col_);

// EXTERNAL MODULE: external "@/lib/date-picker"
var date_picker_ = __webpack_require__(107);
var date_picker_default = /*#__PURE__*/__webpack_require__.n(date_picker_);

// EXTERNAL MODULE: ./src/utils/formatter.js
var utils_formatter = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/timers-browserify/main.js
var main = __webpack_require__(95);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/range/src/range.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var rangevue_type_script_lang_js_ = ({
  name: 'ElRange',
  xtype: 'YuRange',
  components: {
    YuRow: row_default.a,
    YuCol: col_default.a,
    YuDatePicker: date_picker_default.a
  },
  props: {
    value: {
      type: String
    },
    type: {
      // 展示日期区间还是数字(金额)区间
      type: String,
      default: 'date' // 默认日期区间
    },
    valueType: {
      type: String,
      default: 'string'
    },
    minDatePlaceText: {
      // 日期区间展示的placeholder文字
      type: String,
      default: '起始日期'
    },
    maxDatePlaceText: {
      // 日期区间展示的placeholder文字
      type: String,
      default: '终止日期'
    },
    minNumPlaceText: {
      // 数字区间展示的placeholder文字
      type: String,
      default: '起始金额'
    },
    maxNumPlaceText: {
      // 数字区间展示的placeholder文字
      type: String,
      default: '终止金额'
    },
    digit: {
      type: Number,
      default: 2
    },
    allowEqual: {
      type: Boolean,
      defalut: false
    }
  },
  data: function data() {
    return {
      minDate: '', // 日期左区间
      maxDate: '', // 日期右区间
      minNumber: '', // 数字左区间
      maxNumber: '', // 数字右区间
      returnVal: '', // 传给后端值,必须为string类型
      debounceChange: null // 数字区间change函数
    };
  },
  created: function created() {
    this.debounceChange = this._debounce(this.numChange); // 函数防抖
  },

  methods: {
    // 把一个方法变为防抖函数
    _debounce: function _debounce(fn, delay) {
      delay = delay || 600;
      var me = this;
      var timer;
      return function () {
        var args = arguments;
        if (timer) {
          Object(main["clearTimeout"])(timer);
        }
        timer = Object(main["setTimeout"])(function () {
          fn.apply(me, args);
          timer = null;
        }, delay);
      };
    },

    // 日期选择改变
    dateChange: function dateChange(val, index) {
      if (this.valueType === 'string') {
        // 返回值为string
        if (!this.minDate && !this.maxDate) {
          // 两个值都不存在则赋值空string
          this.returnVal = '';
          this.$emit('input', this.returnVal);
        } else {
          // 任意一个值存在则逗号隔开
          if (!Array.isArray(this.returnVal)) {
            this.returnVal = ['', ''];
          }
          if (this.compare()) {
            return;
          }
          this.$set(this.returnVal, index, val || '');
          this.$emit('input', this.returnVal.join(','));
        }
      } else {
        // 返回值为array
        if (!this.minDate && !this.maxDate) {
          // 两个值都不存在则赋值空[]
          this.returnVal = [];
          this.$emit('input', this.returnVal);
        } else {
          if (this.returnVal.length === 0) {
            this.returnVal = ['', ''];
          }
          if (this.compare()) {
            return;
          }
          this.$set(this.returnVal, index, val || '');
          this.$emit('input', this.returnVal);
        }
      }
    },

    // 数字(金额)输入改变
    numChange: function numChange(val, index) {
      if (this.valueType === 'string') {
        // 返回值字符串
        if (!this.minNumber && !this.maxNumber) {
          // 两个值都不存在则赋值空string
          this.returnVal = '';
          this.$emit('input', this.returnVal);
        } else {
          // 任意一个值存在则逗号隔开
          if (!Array.isArray(this.returnVal)) {
            this.returnVal = ['', ''];
          }
          if (this.compare()) {
            return;
          }
          this.$set(this.returnVal, index, val || '');
          this.$emit('input', this.returnVal.join(','));
        }
      } else {
        // 返回值数组
        if (!this.minNumber && !this.maxNumber) {
          // 两个值都不存在则赋值空[]
          this.returnVal = [];
          this.$emit('input', this.returnVal);
        } else {
          if (this.returnVal.length === 0) {
            this.returnVal = ['', ''];
          }
          if (this.compare()) {
            return;
          }
          this.$set(this.returnVal, index, val || '');
          this.$emit('input', this.returnVal);
        }
      }
    },

    // 比较区间左右两侧的值大小
    compare: function compare() {
      var bool = this.minNumber && this.maxNumber;
      var expression = this.minNumber - this.maxNumber;
      var message = this.minNumPlaceText + '\u4E0D\u80FD\u5927\u4E8E' + this.maxNumPlaceText + '!';
      if (this.type === 'date') {
        bool = this.minDate && this.maxDate;
        expression = new Date(this.minDate).getTime() - new Date(this.maxDate).getTime();
        message = this.minDatePlaceText + '\u4E0D\u80FD\u665A\u4E8E' + this.maxDatePlaceText + '!';
      }
      if (bool) {
        // 判断区间两侧值均存在
        if (expression < 0) {
          return false;
        } else {
          if (expression === 0) {
            if (this.allowEqual) {
              return false;
            } else {
              this.warnAndReset(message);
              return true;
            }
          }
          this.warnAndReset(message);
          return true;
        }
      }
      return false;
    },
    warnAndReset: function warnAndReset(msg) {
      this.$message({ message: msg, type: 'warning' });
      this.type === 'date' ? this.maxDate = '' : this.maxNumber = '';
    },

    // 金额格式化
    moneyFormatter: function moneyFormatter(val) {
      var formatter = utils_formatter["a" /* formatters */]['moneyFormatter'];
      return formatter(val, this.digit);
    }
  },
  watch: {
    value: function value(val) {
      // 重置后清空组件显示值
      if (!val || Array.isArray(val) && val.length === 0) {
        if (this.type === 'date') {
          this.minDate = '';
          this.maxDate = '';
        } else {
          this.minNumber = '';
          this.maxNumber = '';
        }
        this.$emit('input', '');
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/range/src/range.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_rangevue_type_script_lang_js_ = (rangevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/range/src/range.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_rangevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/range/src/range.vue"
/* harmony default export */ var range = (component.exports);
// CONCATENATED MODULE: ./packages/range/index.js


/* istanbul ignore next */
range.install = function (Vue) {
  Vue.component(range.name, range);
};

/* harmony default export */ var packages_range = __webpack_exports__["default"] = (range);

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/types");

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatters; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by zhangkun on 2018/09/17.
 */


var formatters = {

  'moneyFormatter': function moneyFormatter(money, num) {
    /*
      * 参数说明：
      * money：要格式化的数字
      * num：保留几位小数
      * */
    num = num > 0 && num <= 20 ? num : 2;
    money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
    var l = money.split('.')[0].split('').reverse();
    var r = money.split('.')[1];
    var t = '';
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
    }
    return t.split('').reverse().join('') + '.' + r;
  },

  'toPercent': function toPercent(money, num) {
    /*
      * 参数说明：
      * money：要格式化的数字
      * */
    //      num = num > 0 && num <= 20 ? num : 2;
    money = parseFloat(money + '') + '%';
    return money;
  },

  // 表格格式化单元格使用
  'dateFormatter': function dateFormatter(row, column, time) {
    var format;
    if (column.ctype === 'timeselect' || column.ctype === 'timepicker') {
      format = '{h}:{i}:{s}';
    } else {
      format = '{y}-{m}-{d}';
    }
    var date;
    if (!time || time === '') {
      return time;
    }
    if ((typeof time === 'undefined' ? 'undefined' : _typeof(time)) === 'object') {
      date = time;
    } else if (typeof time === 'string') {
      return time;
    } else {
      if (('' + time).length === 10) {
        time = parseInt(time, 10) * 1000;
      }
      date = new Date(time);
    }
    var formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
      var value = formatObj[key];
      if (key === 'a') {
        return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }
      return value || 0;
    });
    return time_str;
  },

  // 表格格式化单元格使用
  'keytoValue': function keytoValue(row, column, val) {
    var arr = [].concat(val);
    var returnValue = '';
    if (column.dataCode) {
      var value = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* getValueByPath */ "a"])(row, column.property) || val;
      if (value instanceof Array) {
        value = yufp.lookup.convertMultiKey(column.dataCode, value.join(','));
      } else if (typeof value === 'string' && value.indexOf(column.separator) > -1) {
        value = yufp.lookup.convertMultiKey(column.dataCode, value, column.separator);
      } else {
        value = yufp.lookup.convertKey(column.dataCode, value);
      }
      if (column.attrs['allow-create'] !== false && value === '') {
        return val;
      } else {
        return value;
      }
    } else if (column.options) {
      var options = column.options;
      for (var i = 0, l = options.length; i < l; i++) {
        for (var j = 0, lh = arr.length; j < lh; j++) {
          // 当有设置props时也进行转换 liujie1 20191028
          if (column.props && options[i][column.props.key] === arr[j]) {
            returnValue = returnValue + options[i][column.props.value] + '，';
          } else if (options[i].key === arr[j]) {
            returnValue = returnValue + options[i].value + '，';
          }
        }
      }
      if (column.attrs['allow-create'] !== false && returnValue === '') {
        return val;
      } else {
        return returnValue.slice(0, -1);
      }
    } else {
      return val;
    }
  }
};

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export noop */
/* unused harmony export hasOwn */
/* unused harmony export isObject */
/* unused harmony export toObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getValueByPath; });
/* unused harmony export array2tree */
/* unused harmony export transformTozTreeFormat */
/* unused harmony export obj2str */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return str2obj; });
/* unused harmony export arrayFindIndex */
/* unused harmony export arrayFind */
/* unused harmony export looseEqual */
/* unused harmony export numberFormatter */
/* unused harmony export rafThrottle */
/* unused harmony export coerceTruthyValueToArray */
/* unused harmony export kebabCase */
/* unused harmony export autoprefixer */
/* unused harmony export arrayEquals */
/* unused harmony export capitalize */
/* unused harmony export generateId */
/* unused harmony export isEmpty */
/* unused harmony export isEqual */
/* unused harmony export valueEquals */
/* unused harmony export getRandomID */
/* harmony import */ var _src_utils_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var _src_utils_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_utils_types__WEBPACK_IMPORTED_MODULE_0__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


var hasOwnProperty = Object.prototype.hasOwnProperty;

function noop() {};

/**
 * 有无自身属性
 * @param {*} obj 待检查对象
 * @param {*} key 待检查key
 */
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};
/**
 * 快速对象检查-主要用于当我们知道原始值是符合JSON的类型。
 * @param {*} obj 检查值
 * @returns {Boolean}
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}
/**
 * private
 * 浅复制,没有export，请不要在外部使用
 * @param {*} to 目标对象
 * @param {*} _from 源对象
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
};

/**
 * 将数组对象转换为对象
 * @param {*} arr 待转换数组
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

/**
 * 从指定对象获取指定路径的值
 * @param {*} object 对象
 * @param {*} prop 路径
 */
var getValueByPath = function getValueByPath(object, prop) {
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = null;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

/**
 * 数组转换为树结构
 * @param {*} obj object
 * data: '数组数据',
 * id: 'id字段名',
 * pid: '父id字段名',
 * label: '文本字段名',
 * root: '根id值/或根对象'
 */
var array2tree = function array2tree(obj) {
  var data = obj.data;
  var idField = obj.id;
  var pidField = obj.pid;
  var labelField = obj.label;
  var root = {};
  var iconStr = obj.icon;
  data.forEach(function (node) {
    if (node[iconStr]) {
      node.icon = node[iconStr];
    }
  });
  if (_typeof(obj.root) === 'object') {
    root = obj.root;
  } else {
    var tempObj = {};
    tempObj[idField] = obj.root;
    root = tempObj;
  }
  var children = [];
  var rId = '' + root[idField];
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    if (rId === '' + d[idField]) {
      root = d;
    } else if (rId === '' + d[pidField]) {
      children.push(d);
    }
  }
  // root.id = root[idField];
  root.label = root[labelField];
  root.children = children;
  for (var j = 0; j < root.children.length; j++) {
    root.children[j] = array2tree({
      data: data,
      id: idField,
      pid: pidField,
      label: labelField,
      root: root.children[j]
    });
  }
  return root;
};

var nodeChildren = function nodeChildren(setting, node, newChildren) {
  if (!node) {
    return null;
  }
  // var key = 'children' || setting.children;
  var key = 'children';
  if (typeof newChildren !== 'undefined') {
    node[key] = newChildren;
  }
  return node[key];
};

var transformTozTreeFormat = function transformTozTreeFormat(setting, sNodes) {
  var i;
  var l;
  var key = setting.id;
  var parentKey = setting.pid;
  if (!key || key === '' || !sNodes) return [];

  if (Array.isArray(sNodes)) {
    var r = [];
    var tmpMap = {};
    for (i = 0, l = sNodes.length; i < l; i++) {
      sNodes[i].label = sNodes[i][setting.label];
      sNodes[i].id = sNodes[i][setting.id];
      sNodes[i].pid = sNodes[i][setting.pid];
      tmpMap[sNodes[i][key]] = sNodes[i];
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      var p = tmpMap[sNodes[i][parentKey]];
      if (p && sNodes[i][key] !== sNodes[i][parentKey]) {
        var children = nodeChildren(setting, p);
        if (!children) {
          children = nodeChildren(setting, p, []);
        }
        children.push(sNodes[i]);
      } else {
        r.push(sNodes[i]);
      }
    }
    return r;
  } else {
    return [sNodes];
  }
};

/**
 * private
 * 对象转字符串，支持function转源码
 */
var obj2str = function obj2str(obj) {
  var str = JSON.stringify(obj, function (k, v) {
    if (typeof v === 'function') {
      return v.toString();
    }
    return v;
  });
  return str.replace(/\\n\s+/g, '\\n ');
};
/**
 * private
 * 字符串转对象，支持源码转function
 */
var str2obj = function str2obj(str) {
  if (str.indexOf && str.indexOf('function') > -1) {
    return eval('(function(){return ' + str + ' })()');
  } else {
    return eval(str);
  }
};
var arrayFindIndex = function arrayFindIndex(arr, pred) {
  for (var i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
};

var arrayFind = function arrayFind(arr, pred) {
  var idx = arrayFindIndex(arr, pred);
  return idx !== -1 ? arr[idx] : undefined;
};
/**
 * 检查两个值是否松散相等-即，如果它们是普通对象，是否有相同的属性值
 * @param {*} a 比较值a
 * @param {*} b 比较值b
 */
function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
};
/**
 * Formats the number according to the format string.
 * examples (123456.789):
 * 0 - (123456) show only digits, no precision<br>
 * 0.00 - (123456.78) show only digits, 2 precision<br>
 * 0.0000 - (123456.7890) show only digits, 4 precision<br>
 * 0,000 - (123,456) show comma and digits, no precision<br>
 * 0,000.00 - (123,456.78) show comma and digits, 2 precision<br>
 * 0,0.00 - (123,456.78) shortcut method, show comma and digits, 2 precision<br>
 * To reverse the grouping (,) and decimal (.) for international numbers, add /i to the end.
 * For example: 0.000,00/i
 * @param {Number} v The number to format.
 * @param {String} format The way you would like to format this text.
 * @return {String} The formatted number.
 */
function numberFormatter(v, format) {
  if (!format) {
    return v;
  }
  if (isNaN(v)) {
    return '';
  }
  var comma = ',';
  var dec = '.';
  var i18n = false;
  var neg = v < 0;

  v = Math.abs(v);
  if (format.substr(format.length - 2) === '/i') {
    format = format.substr(0, format.length - 2);
    i18n = true;
    comma = '.';
    dec = ',';
  }

  var hasComma = format.indexOf(comma) !== -1;
  var psplit = (i18n ? format.replace(/[^\d,]/g, '') : format.replace(/[^\d.]/g, '')).split(dec);

  if (psplit.length > 1) {
    v = v.toFixed(psplit[1].length);
  } else if (psplit.length > 2) {
    throw new Error('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
  } else {
    v = v.toFixed(0);
  }

  var fnum = v.toString();

  psplit = fnum.split('.');

  if (hasComma) {
    var cnum = psplit[0];
    var parr = [];
    var j = cnum.length;
    var m = Math.floor(j / 3);
    var n = cnum.length % 3 || 3;
    var i = void 0;

    for (i = 0; i < j; i += n) {
      if (i !== 0) {
        n = 3;
      }
      parr[parr.length] = cnum.substr(i, n);
      m = m - 1;
    }
    fnum = parr.join(comma);
    if (psplit[1]) {
      fnum += dec + psplit[1];
    }
  } else {
    if (psplit[1]) {
      fnum = psplit[0] + dec + psplit[1];
    }
  }

  return (neg ? '-' : '') + format.replace(/[\d,?.?]+/, fnum);
};

function rafThrottle(fn) {
  var locked = false;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (locked) return;
    locked = true;
    window.requestAnimationFrame(function (_) {
      fn.apply(_this, args);
      locked = false;
    });
  };
}

// coerce truthy value to array
var coerceTruthyValueToArray = function coerceTruthyValueToArray(val) {
  if (Array.isArray(val)) {
    return val;
  } else if (val) {
    return [val];
  } else {
    return [];
  }
};

var kebabCase = function kebabCase(str) {
  var hyphenateRE = /([^-])([A-Z])/g;
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
};

var autoprefixer = function autoprefixer(style) {
  if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) !== 'object') return style;
  var rules = ['transform', 'transition', 'animation'];
  var prefixes = ['ms-', 'webkit-'];
  rules.forEach(function (rule) {
    var value = style[rule];
    if (rule && value) {
      prefixes.forEach(function (prefix) {
        style[prefix + rule] = value;
      });
    }
  });
  return style;
};

var arrayEquals = function arrayEquals(arrayA, arrayB) {
  arrayA = arrayA || [];
  arrayB = arrayB || [];

  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (var i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false;
    }
  }

  return true;
};

var capitalize = function capitalize(str) {
  if (!Object(_src_utils_types__WEBPACK_IMPORTED_MODULE_0__["isString"])(str)) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var generateId = function generateId() {
  return Math.floor(Math.random() * 10000);
};

var isEmpty = function isEmpty(val) {
  // null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]':
      {
        return !val.size;
      }
    // Plain Object
    case '[object Object]':
      {
        return !Object.keys(val).length;
      }
  }

  return false;
};

var isEqual = function isEqual(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2);
  }
  return looseEqual(value1, value2);
};

var valueEquals = function valueEquals(a, b) {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
/**
 * 生成随机数
 * @param {Number} len 生成随机长度
 */
var getRandomID = function getRandomID(len) {
  return Number(Math.random().toString().substr(3, len) + Date.now()).toString(36);
};

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(143);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(142)))

/***/ })

/******/ });