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
/******/ 	return __webpack_require__(__webpack_require__.s = 136);
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

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _xform_src_form_group_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67);


_xform_src_form_group_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_xform_src_form_group_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _xform_src_form_group_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_xform_src_form_group_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("babel-helper-vue-jsx-merge-props");

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/types");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

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

/***/ 42:
/***/ (function(module, exports) {

module.exports = require("deepmerge");

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

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ElCol',
  xtype: 'YuCol',

  props: {
    span: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object]
  },

  computed: {
    gutter: function gutter() {
      var parent = this.$parent;
      while (parent && parent.$options.componentName !== 'ElRow') {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    }
  },
  render: function render(h) {
    var _this = this;

    var classList = [];
    var style = {};

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
    }

    ['span', 'offset', 'pull', 'push'].forEach(function (prop) {
      if (_this[prop]) {
        classList.push(prop !== 'span' ? 'el-col-' + prop + '-' + _this[prop] : 'el-col-' + _this[prop]);
      }
    });

    ['xs', 'sm', 'md', 'lg'].forEach(function (size) {
      if (typeof _this[size] === 'number') {
        classList.push('el-col-' + size + '-' + _this[size]);
      } else if (_typeof(_this[size]) === 'object') {
        var props = _this[size];
        Object.keys(props).forEach(function (prop) {
          classList.push(prop !== 'span' ? 'el-col-' + size + '-' + prop + '-' + props[prop] : 'el-col-' + size + '-' + props[prop]);
        });
      }
    });

    return h(this.tag, {
      class: ['el-col', classList],
      style: style
    }, this.$slots.default);
  }
});

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ElRow',
  xtype: 'YuRow',

  componentName: 'ElRow',

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },

  computed: {
    style: function style() {
      var ret = {};

      if (this.gutter) {
        ret.marginLeft = '-' + this.gutter / 2 + 'px';
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    }
  },

  render: function render(h) {
    return h(this.tag, {
      class: ['el-row', this.justify !== 'start' ? 'is-justify-' + this.justify : '', this.align !== 'top' ? 'is-align-' + this.align : '', { 'el-row--flex': this.type === 'flex' }],
      style: this.style
    }, this.$slots.default);
  }
});

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "babel-helper-vue-jsx-merge-props"
var external_babel_helper_vue_jsx_merge_props_ = __webpack_require__(14);
var external_babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(external_babel_helper_vue_jsx_merge_props_);

// EXTERNAL MODULE: ./packages/row/src/row.js
var row = __webpack_require__(56);

// EXTERNAL MODULE: ./packages/col/src/col.js
var src_col = __webpack_require__(54);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: external "deepmerge"
var external_deepmerge_ = __webpack_require__(42);
var external_deepmerge_default = /*#__PURE__*/__webpack_require__.n(external_deepmerge_);

// EXTERNAL MODULE: ./src/utils/formatter.js
var formatter = __webpack_require__(40);

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xform/src/form-group.vue?vue&type=script&lang=js&








/**
 * 业务表单-表单组
 */
/* harmony default export */ var form_groupvue_type_script_lang_js_ = ({
  name: 'YuXformGroup',
  xtype: 'YuXformGroup',

  componentName: 'YuXformGroup',
  mixins: [locale_default.a, emitter_default.a],
  component: {
    ElRow: row["a" /* default */],
    ElCol: src_col["a" /* default */]
  },
  props: {
    column: {
      default: 2,
      type: Number
    }
  },
  data: function data() {
    return {
      columns: this.column,
      moreFields: [],
      formType: '',
      relatedTableName: '',
      notice: false,
      expand: this.$parent.expand,
      moreText: this.$parent.expandText,
      moreFieldClass: 'el-icon-arrow-down',
      tableVnode: null,
      customSearchFn: this.$parent.customSearchFn,
      customResetFn: this.$parent.customResetFn,
      responsive: this.$parent.responsive
    };
  },
  watch: {
    expand: function expand(val) {
      if (val) {
        this.moreText = this.$parent.collapseText;
        this.moreFieldClass = 'el-icon-arrow-up';
      } else {
        this.moreText = this.$parent.expandText;
        this.moreFieldClass = 'el-icon-arrow-down';
      }
    }
  },
  methods: {
    searchTable: function searchTable(name) {
      var _this = this;
      var obj = this;
      // 兼容2.0版本，避免xtable ref重复时，取到的对象不匹配
      if (this.$root._vnode.tag.indexOf('App') > 0) {
        while (!obj || !(obj.$parent.$vnode.tag.indexOf('AppMain') > 0)) {
          obj = obj.$parent;
        }
      } else {
        obj = this.$root;
      }
      // 广度优先
      var searchItem = function searchItem(arr) {
        if (arr.length === 0) return;
        var newarr = [];
        for (var i = 0, l = arr.length; i < l; i++) {
          var item = arr[i];
          if (item.$vnode && item.$vnode.data.ref === name) {
            _this.tableVode = item;
          }
          var children = item.$children;
          if (children && children.length > 0) {
            newarr = newarr.concat(Array.prototype.slice.call(children, 0));
          }
        }
        searchItem(newarr);
      };
      searchItem([obj]);
    },
    openMore: function openMore() {
      this.expand = !this.expand;
      this.$emit('change', this.expand);
    },
    initSearchForm: function initSearchForm(fields) {
      var _this2 = this;

      var h = this.$createElement;

      var column = this.columns;
      var span = 24 / column;
      var sum = 0;
      for (var i = 0, l = fields.length; i < l; i++) {
        if (fields[i].data && fields[i].data.props && fields[i].data.props.span) {
          sum += fields[i].data.props.span;
        } else {
          continue;
        }
      }
      var rowNum = Math.ceil(sum / 24);
      var restSpam = rowNum * 24 - sum;
      var curSearchBtn = null;
      var searchBtn = h(
        'div',
        { 'class': 'search-btn-group', style: { paddingLeft: rowNum > 1 || sum === 24 ? this.labelWidth : '0px' } },
        [h(
          'el-button',
          {
            attrs: { type: 'primary', icon: this.$parent.searchIcon },
            on: {
              'click': function click(event) {
                return _this2.customSearchFn ? _this2.customSearchFn(event) : _this2.searchFn(event);
              }
            }
          },
          [this.$parent.searchText]
        ), h(
          'el-button',
          {
            attrs: { type: 'primary', icon: this.$parent.resetIcon },
            on: {
              'click': function click(event) {
                return _this2.customResetFn ? _this2.customResetFn(event) : _this2.resetFn(event);
              }
            }
          },
          [this.$parent.resetText]
        ), this.moreFields.length > 0 ? h(
          'span',
          {
            on: {
              'click': function click() {
                return _this2.openMore();
              }
            }
          },
          [h('i', { 'class': this.moreFieldClass }), this.moreText]
        ) : '']
      );
      if (rowNum === 1) {
        if (!(restSpam < span)) {
          curSearchBtn = searchBtn;
        } else {
          curSearchBtn = h(
            'div',
            { 'class': 'search-btn' },
            [h(
              'el-col',
              { style: 'float: right;', attrs: { span: span }
              },
              [searchBtn]
            )]
          );
        }
      } else if (rowNum > 1) {
        if (!(restSpam < span)) {
          curSearchBtn = h(
            'el-col',
            {
              attrs: { span: span },
              'class': 'adjust' },
            [searchBtn]
          );
        } else {
          curSearchBtn = h(
            'div',
            { 'class': 'search-btn' },
            [h(
              'el-col',
              { style: 'float: right;', attrs: { span: span }
              },
              [searchBtn]
            )]
          );
        }
      } else {
        return searchBtn;
      }
      return curSearchBtn;
    },

    // 高级查询render函数
    renderFormItem: function renderFormItem(h, formitem, formindex) {
      var cloneFormItem = {};
      var column = this.columns;
      var span = 24 / column;
      var col = null;
      if (this.$parent.moreFieldsFlag) {
        var curColumn1 = parseFloat(formitem.data && formitem.data.attrs.colpsan);
        var curSpan1 = curColumn1 ? curColumn1 : span;
        var curLayout1 = {
          props: {
            span: curSpan1
          }
        };
        col = h(
          src_col["a" /* default */],
          curLayout1,
          [formitem]
        );
      } else {
        cloneFormItem = external_deepmerge_default()(cloneFormItem, formitem, { clone: true });
        var curColumn = parseFloat(cloneFormItem.colspan);
        var curSpan = curColumn ? curColumn : span;
        var curLayout = {
          props: {
            span: curSpan
          }
        };
        var value = cloneFormItem.value;
        if (cloneFormItem.formatter) {
          var type = cloneFormItem.formatter;
          cloneFormItem.formatter = typeof type === 'function' ? type : formatter["a" /* formatters */][type];
        }

        delete cloneFormItem.value;
        col = h(
          src_col["a" /* default */],
          curLayout,
          [h('yu-xform-item', external_babel_helper_vue_jsx_merge_props_default()([{ props: cloneFormItem, on: formitem.events }, {
            attrs: { value: value, name: cloneFormItem.field, colspan: cloneFormItem.colspan, ctype: cloneFormItem.ctype }
          }]))]
        );
      }
      return col;
    },
    // 查询表单搜索功能
    searchFn: function searchFn(event) {
      var _this = this;
      var flag = true;
      if (_this.$parent.beforeQuery) {
        flag = _this.$parent.beforeQuery.call(_this);
      }
      if (flag) {
        _this.$parent.validate(function (valid) {
          if (valid) {
            var dt = yufp.clone(_this.$parent.formdata, {});
            if (_this.$parent.removeEmpty === true) {
              for (var item in dt) {
                if (dt[item] === '' || dt[item] === null || dt[item] === undefined || dt[item] instanceof Array && dt[item].length === 0) {
                  delete dt[item];
                }
              }
            }
            // 处理插槽 模糊查询
            if (_this.$slots.default) {
              for (var i = 0; i < _this.$slots.default.length; i++) {
                if (_this.$slots.default[i].componentOptions) {
                  var fuzzyQuery = _this.$slots.default[i].componentOptions.propsData.fuzzyQuery;
                  var name = _this.$slots.default[i].componentOptions.propsData.name;
                  if (fuzzyQuery && dt[name]) {
                    if (fuzzyQuery === 'left') {
                      dt[name] = '%' + dt[name];
                    } else if (fuzzyQuery === 'right') {
                      dt[name] = dt[name] + '%';
                    } else if (fuzzyQuery === 'both') {
                      dt[name] = '%' + dt[name] + '%';
                    }
                  }
                }
              }
            }
            // 处理moreFields 模糊查询
            for (var j = 0; j < _this.moreFields.length; j++) {
              var el = _this.moreFields[j];
              if (el.fuzzyQuery && dt[el.field]) {
                if (el.fuzzyQuery === 'left') {
                  dt[el.field] = '%' + dt[el.field];
                } else if (el.fuzzyQuery === 'right') {
                  dt[el.field] = dt[el.field] + '%';
                } else if (el.fuzzyQuery === 'both') {
                  dt[el.field] = '%' + dt[el.field] + '%';
                }
              }
            }
            if (_this.relatedTableName && _this.formType === 'search') {
              _this.searchTable(_this.relatedTableName);
            }
            var tableVode = _this.tableVode;
            if (tableVode) {
              var param = {};
              if (tableVode.conditionKey) {
                param[tableVode.conditionKey] = JSON.stringify(dt);
              } else {
                param = dt;
              }
              tableVode.remoteData(param);
            }
          } else {
            return;
          }
        });
      }
      this.dispatch('YuXform', 'el.form.search', [event]);
    },

    // 查询表单重置功能
    resetFn: function resetFn(event) {
      this.$parent.resetFields();
      this.dispatch('YuXform', 'el.form.reset', [event]);
      if (this.tableVode) {
        this.tableVode.remoteData({}); // 点击重置按钮初始化加载表格
      }
    }
    // getMoreFields(params) {
    //   var item = [];
    //   yufp.clone(params, item);
    //   if (this.$parent.moreFieldsFlag) {
    //     return item.splice(this.$parent.moreFieldsLength);
    //   } else {
    //     return this.moreFields;
    //   }
    // }

  },
  mounted: function mounted() {
    this.labelWidth = this.hasLabel ? this.$parent.labelWidth : '0px';
    if (this.responsive) {
      // 针对小屏幕，布局做降级处理。
      var conTainer = this;
      var conTainerWidth = parseFloat(this.$parent.$el.offsetWidth);
      while (!conTainerWidth) {
        conTainer = conTainer.$parent;
        conTainerWidth = conTainer.$el.offsetWidth;
      }
      var width = conTainerWidth / this.columns;
      var minWidth = this.moreFields.length > 0 ? 240 : 168;
      var basicWidth = minWidth + parseFloat(this.labelWidth);
      if (width < basicWidth) {
        this.columns = Math.floor(conTainerWidth / basicWidth);
        if (24 % this.columns !== 0) {
          this.columns--;
        }
      }
    }
    this.unwatch = this.$watch('$parent.expand', function (val, oldval) {
      this.expand = val;
    });
    if (this.expand) {
      this.moreText = this.$parent.collapseText;
      this.moreFieldClass = 'el-icon-arrow-up';
    } else {
      this.moreText = this.$parent.expandText;
      this.moreFieldClass = 'el-icon-arrow-down';
    }
  },

  created: function created() {
    if (this.$parent.$options._componentTag && this.$parent.$options._componentTag === 'yu-xform') {
      this.formType = this.$parent.formType;
      if (this.$parent.moreFieldsFlag && this.$slots.default && this.$slots.default.length > 0) {
        this.$slots.default = this.$slots.default.filter(function (item) {
          return !item.isComment && item.componentOptions;
        });
        this.moreFields = this.$slots.default.splice(this.$parent.moreFieldsLength);
      } else {
        this.moreFields = this.$parent.moreFields;
      }
      this.relatedTableName = this.$parent.relatedTableName;
    } else {
      this.moreFields = [];
    }
  },
  destroyed: function destroyed() {
    this.unwatch();
  },
  updated: function updated() {
    this.$parent.ifInit = false;
  },

  render: function render(h) {
    var _this = this;
    var column = this.columns;
    var span = 24 / column;
    var colarr = [];
    if (this.$slots.default && this.$slots.default.length > 0) {
      var item = this.$slots.default.filter(function (item) {
        return !item.isComment && item.componentOptions;
      });
      // var tempMoreFields = this.getMoreFields(item);
      if (this.$parent.moreFieldsFlag) {
        item = item.splice(0, this.$parent.moreFieldsLength);
      }
      // var layout = {
      //   props: {
      //     span: span
      //   }
      // };
      var noticeArr = item.filter(function (item) {
        return !item.isComment && item.componentOptions && !!item.componentOptions.propsData.notice;
      });
      this.notice = noticeArr.length > 0 ? 1 : 0;
      var hasLabelArr = item.filter(function (item) {
        return !item.isComment && item.componentOptions && !!item.componentOptions.propsData.label;
      });
      this.hasLabel = hasLabelArr.length > 0 ? 1 : 0;
      colarr = item.map(function (cur, index) {
        if (!cur.isComment && cur.data) {
          var curColumn = cur.data.attrs && parseFloat(cur.data.attrs.colspan);
          var curSpan = curColumn ? curColumn : span;
          var curLayout = {
            props: {
              span: curSpan
            }
          };
          return h(
            src_col["a" /* default */],
            curLayout,
            [cur]
          );
        } else {
          return h('i', { style: { display: 'none' } });
        }
      });
    }
    if (this.expand) {
      this.$parent.ifInit = false;
      var moreFields = this.moreFields.map(function (cur, index) {
        return _this.renderFormItem(h, cur, index);
      });
      colarr = colarr.concat(moreFields);
    }
    var rowarr = h(row["a" /* default */], [colarr, this.formType === 'search' ? this.initSearchForm(colarr || []) : ''
    // this.formType === 'search' ? (this.forceColumn ? (searchBtn) : <div class="center">{searchBtn}</div>) : ''
    , this.$slots.custom]);
    return h(
      'div',
      { 'class': 'yu-xform-group' },
      [rowarr]
    );
  }
});
// CONCATENATED MODULE: ./packages/xform/src/form-group.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_form_groupvue_type_script_lang_js_ = (form_groupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xform/src/form-group.vue
var form_group_render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_form_groupvue_type_script_lang_js_,
  form_group_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/xform/src/form-group.vue"
/* harmony default export */ var form_group = __webpack_exports__["a"] = (component.exports);

/***/ })

/******/ });