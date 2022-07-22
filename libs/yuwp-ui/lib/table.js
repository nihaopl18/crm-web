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
/******/ 	return __webpack_require__(__webpack_require__.s = 114);
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

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/merge");

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(70);


/* istanbul ignore next */
_src_table__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_table__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_table__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_table__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = require("throttle-debounce");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/dom");

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/date");

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/resize-event");

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = require("@/lib/checkbox");

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/popup");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/util");

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = require("@/lib/tag");

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return validators; });
/**
 * Created by jiangcheng on 2016/11/25.
 */
var validators = {

  /**
   * 必输验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'required': function required(rule, value, callback) {
    if (value === null || value === undefined || value === '' || value.length < 1) {
      callback(new Error('字段不能为空'));
    } else {
      callback();
    }
  },

  /**
   * 数字验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'number': function number(rule, value, callback) {
    var reg = /^[\d\.\,-]*$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('请输入数字'));
    } else {
      callback();
    }
  },
  /**
   * 年龄验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'age': function age(rule, value, callback) {
    var reg = /^\d+$/;
    if (value && reg.test(value)) {
      var _age = parseInt(value, 10);
      if (_age < 200) {
        callback();
      } else {
        callback(new Error('年龄不合法'));
      }
    } else if (value && !reg.test(value)) {
      callback(new Error('数字类型错误'));
    } else {
      callback();
    }
  },
  /**
   * 邮编验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'postcode': function postcode(rule, value, callback) {
    // var reg = /^[1-9]\d{5}$/;
    var reg = /^[0-9]{6}$/; // 邮编可以以0开头
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('邮编格式不正确'));
    } else {
      callback();
    }
  },
  /**
   * ip验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'ip': function ip(rule, value, callback) {
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('ip地址格式不正确'));
    } else {
      callback();
    }
  },
  /**
   * 固定电话和小灵通验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'telephone': function telephone(rule, value, callback) {
    var reg = /(^\d{3}\-\d{7,8}$)|(^\d{4}\-\d{7,8}$)|(^\d{3}\d{7,8}$)|(^\d{4}\d{7,8}$)|(^\d{7,8}$)/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('固定电话或小灵通电话格式不正确'));
    } else {
      callback();
    }
  },
  /**
   * 手机号码验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'phone': function phone(rule, value, callback) {
    var reg = /(^\d{3}\-1[3458][0-9]\d{8}$)|(^\d{2}\-1[3458][0-9]\d{8}$)/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('固定电话格式不正确'));
    } else {
      callback();
    }
  },
  /**
   * 数字和字母验证，只能接受输入项为数字和字母
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'numberAndLetter': function numberAndLetter(rule, value, callback) {
    var reg = /(^[A-Za-z0-9]+$)|([A-Za-z]+$)|([0-9]+$)/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('请输入数字和字母'));
    } else {
      callback();
    }
  },
  /**
   * 手机号码验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'mobile': function mobile(rule, value, callback) {
    var reg = /^1[3-9][0-9]\d{8}$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('手机号码不正确'));
    } else {
      callback();
    }
  },
  /**
   * 身份证号码验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'IDCard': function IDCard(rule, value, callback) {
    var ereg = new RegExp();
    if (!value) {
      callback();
    } else {
      var area = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      };
      var Y, JYM;
      var S, M;
      var idcard_array = [];
      idcard_array = value.split('');
      if (area[parseInt(value.substr(0, 2), 10)] == null) {
        callback(new Error('身份证号码地区非法'));
      }
      // 身份号码位数及格式检验
      switch (value.length) {
        case 15:
          if ((parseInt(value.substr(6, 2), 10) + 1900) % 4 === 0 || (parseInt(value.substr(6, 2), 10) + 1900) % 100 === 0 && (parseInt(value.substr(6, 2), 10) + 1900) % 4 === 0) {
            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; // 测试出生日期的合法性
          } else {
            ereg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
          }
          if (ereg.test(value)) {
            callback();
          } else {
            callback(new Error('身份证号码出生日日期有误'));
          }
          break;
        case 18:
          // 18位身份号码检测
          // 出生日期的合法性检查
          // 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
          // 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
          if (parseInt(value.substr(6, 4), 10) % 4 === 0 || parseInt(value.substr(6, 4), 10) % 100 === 0 && parseInt(value.substr(6, 4), 10) % 4 === 0) {
            ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
          } else {
            ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日期的合法性正则表达式
          }
          if (ereg.test(value)) {
            // 测试出生日期的合法性
            // 计算校验位
            S = (parseInt(idcard_array[0], 10) + parseInt(idcard_array[10], 10)) * 7 + (parseInt(idcard_array[1], 10) + parseInt(idcard_array[11], 10)) * 9 + (parseInt(idcard_array[2], 10) + parseInt(idcard_array[12], 10)) * 10 + (parseInt(idcard_array[3], 10) + parseInt(idcard_array[13], 10)) * 5 + (parseInt(idcard_array[4], 10) + parseInt(idcard_array[14], 10)) * 8 + (parseInt(idcard_array[5], 10) + parseInt(idcard_array[15], 10)) * 4 + (parseInt(idcard_array[6], 10) + parseInt(idcard_array[16], 10)) * 2 + parseInt(idcard_array[7], 10) * 1 + parseInt(idcard_array[8], 10) * 6 + parseInt(idcard_array[9], 10) * 3;
            Y = S % 11;
            M = 'F';
            JYM = '10X98765432';
            M = JYM.substr(Y, 1); // 判断校验位
            if (M === idcard_array[17]) {
              callback();
            } else {
              callback(new Error('身份证号码末位校验位校验出错,请注意x的大小写'));
            }
          } else {
            callback(new Error('身份证号码出生日期有误'));
          }
          break;
        default:
          callback(new Error('身份证号码位数不对,应该为15位或是18位'));
          break;
      }
    }
  },
  /**
   * 是否为中文验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'isChnChar': function isChnChar(rule, value, callback) {
    var reg = /[\u4E00-\u9FA5]/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('只能输入中文'));
    } else {
      callback();
    }
  },
  /**
   * 输入项收尾空格验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'trim': function trim(rule, value, callback) {
    if (value !== value.trim()) {
      callback(new Error('输入项首尾有空格'));
    } else {
      callback();
    }
  },
  /**
   * 邮箱验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'email': function email(rule, value, callback) {
    var reg = /[A-Za-z0-9_-]+[@](\S*)(net|com|cn|org|cc|tv|[0-9]{1,3})(\S*)/g;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('电子邮箱格式不正确'));
    } else {
      callback();
    }
  },
  /**
   * 小数验证，输入结果必须为小数
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'digit': function digit(rule, value, callback) {
    var reg = /^-?\d+(\.\d+)?$/g;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('请输入小数'));
    } else {
      callback();
    }
  },
  /**
   * 非零正整数
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'pInt': function pInt(rule, value, callback) {
    var reg = /^\+?[1-9][0-9]*$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('请输入非零正整数'));
    } else {
      callback();
    }
  },
  /**
   * 0 整数和浮点数
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'gZero': function gZero(rule, value, callback) {
    var reg = /^[\+]?[0-9]*\d(\.\d+)?$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('请输入非零正整数'));
    } else {
      callback();
    }
  },
  /**
   * 特殊字符
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'speChar': function speChar(rule, value, callback) {
    var reg = new RegExp("[`~!@#$^&*()=|{}':; ',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    if (value && reg.test(value)) {
      callback(new Error('输入信息包含特殊字符'));
    } else {
      callback();
    }
  }
};

/***/ }),

/***/ 53:
/***/ (function(module, exports) {

module.exports = require("@/lib/tooltip");

/***/ }),

/***/ 55:
/***/ (function(module, exports) {

module.exports = require("async-validator");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export equalDate */
/* unused harmony export toDate */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isDate; });
/* unused harmony export formatDate */
/* unused harmony export parseDate */
/* unused harmony export getDayCountOfMonth */
/* unused harmony export getFirstDayOfMonth */
/* unused harmony export DAY_DURATION */
/* unused harmony export getStartDateOfMonth */
/* unused harmony export getWeekNumber */
/* unused harmony export prevMonth */
/* unused harmony export nextMonth */
/* unused harmony export getRangeHours */
/* unused harmony export limitRange */
/* harmony import */ var _src_utils_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _src_utils_date__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_utils_date__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_locale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _src_locale__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_locale__WEBPACK_IMPORTED_MODULE_1__);



var weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
var getI18nSettings = function getI18nSettings() {
  return {
    dayNamesShort: weeks.map(function (week) {
      return Object(_src_locale__WEBPACK_IMPORTED_MODULE_1__["t"])('el.datepicker.weeks.' + week);
    }),
    dayNames: weeks.map(function (week) {
      return Object(_src_locale__WEBPACK_IMPORTED_MODULE_1__["t"])('el.datepicker.weeks.' + week);
    }),
    monthNamesShort: months.map(function (month) {
      return Object(_src_locale__WEBPACK_IMPORTED_MODULE_1__["t"])('el.datepicker.months.' + month);
    }),
    monthNames: months.map(function (month, index) {
      return Object(_src_locale__WEBPACK_IMPORTED_MODULE_1__["t"])('el.datepicker.month' + (index + 1));
    }),
    amPm: ['am', 'pm']
  };
};

var newArray = function newArray(start, end) {
  var result = [];
  for (var i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

var equalDate = function equalDate(dateA, dateB) {
  return dateA === dateB || new Date(dateA).getTime() === new Date(dateB).getTime();
};

var toDate = function toDate(date) {
  return isDate(date) ? new Date(date) : null;
};

var isDate = function isDate(date) {
  if (date === null || date === undefined) return false;
  if (date instanceof Date) {
    date = date;
  } else if (typeof val === 'string') {
    date = date.replace(/-/g, '/');
  }
  if (isNaN(new Date(date).getTime())) return false;
  return true;
};

var formatDate = function formatDate(date, format) {
  date = toDate(date);
  if (!date) return '';
  return _src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.format(date, format || 'yyyy-MM-dd', getI18nSettings());
};

var parseDate = function parseDate(string, format) {
  return _src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.parse(string, format || 'yyyy-MM-dd', getI18nSettings());
};

var getDayCountOfMonth = function getDayCountOfMonth(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};

var getFirstDayOfMonth = function getFirstDayOfMonth(date) {
  var temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

var DAY_DURATION = 86400000;

var getStartDateOfMonth = function getStartDateOfMonth(year, month) {
  var result = new Date(year, month, 1);
  var day = result.getDay();

  if (day === 0) {
    result.setTime(result.getTime() - DAY_DURATION * 7);
  } else {
    result.setTime(result.getTime() - DAY_DURATION * day);
  }

  return result;
};

var getWeekNumber = function getWeekNumber(src) {
  var date = new Date(src.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

var prevMonth = function prevMonth(src) {
  var year = src.getFullYear();
  var month = src.getMonth();
  var date = src.getDate();

  var newYear = month === 0 ? year - 1 : year;
  var newMonth = month === 0 ? 11 : month - 1;

  var newMonthDayCount = getDayCountOfMonth(newYear, newMonth);
  if (newMonthDayCount < date) {
    src.setDate(newMonthDayCount);
  }

  src.setMonth(newMonth);
  src.setFullYear(newYear);

  return new Date(src.getTime());
};

var nextMonth = function nextMonth(src) {
  var year = src.getFullYear();
  var month = src.getMonth();
  var date = src.getDate();

  var newYear = month === 11 ? year + 1 : year;
  var newMonth = month === 11 ? 0 : month + 1;

  var newMonthDayCount = getDayCountOfMonth(newYear, newMonth);
  if (newMonthDayCount < date) {
    src.setDate(newMonthDayCount);
  }

  src.setMonth(newMonth);
  src.setFullYear(newYear);

  return new Date(src.getTime());
};

var getRangeHours = function getRangeHours(ranges) {
  var hours = [];
  var disabledHours = [];

  (ranges || []).forEach(function (range) {
    var value = range.map(function (date) {
      return date.getHours();
    });

    disabledHours = disabledHours.concat(newArray(value[0], value[1]));
  });

  if (disabledHours.length) {
    for (var i = 0; i < 24; i++) {
      hours[i] = disabledHours.indexOf(i) === -1;
    }
  } else {
    for (var _i = 0; _i < 24; _i++) {
      hours[_i] = false;
    }
  }

  return hours;
};

var limitRange = function limitRange(date, ranges) {
  var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'yyyy-MM-dd HH:mm:ss';

  if (!ranges || !ranges.length) return date;

  var len = ranges.length;

  date = _src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.parse(_src_utils_date__WEBPACK_IMPORTED_MODULE_0___default.a.format(date, format), format);
  for (var i = 0; i < len; i++) {
    var range = ranges[i];
    if (date >= range[0] && date <= range[1]) {
      return date;
    }
  }

  var maxDate = ranges[0][0];
  var minDate = ranges[0][0];

  ranges.forEach(function (range) {
    minDate = new Date(Math.min(range[0], minDate));
    maxDate = new Date(Math.max(range[1], maxDate));
  });

  return date < minDate ? minDate : maxDate;
};

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/vue-popper");

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/table.vue?vue&type=template&id=493fe34e&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "el-table",
      class: [
        {
          "el-table--fit": _vm.fit,
          "el-table--striped": _vm.stripe,
          "el-table--border": _vm.border,
          "el-table--fluid-height": _vm.maxHeight,
          "el-table--scrollable-x": _vm.layout.scrollX,
          "el-table--scrollable-y":
            _vm.layout.scrollY || _vm.store.states.isMoreData,
          "el-table--enable-row-hover": !_vm.store.states.isComplex,
          "el-table--enable-row-transition":
            (_vm.store.states.data || []).length !== 0 &&
            (_vm.store.states.data || []).length < 100
        },
        _vm.tableSize ? "el-table--" + _vm.tableSize : ""
      ],
      style: {
        width: _vm.layout.bodyfixedWidth ? _vm.layout.bodyWidth + "px" : ""
      }
    },
    [
      _c(
        "div",
        { ref: "hiddenColumns", staticClass: "hidden-columns" },
        [_vm._t("default")],
        2
      ),
      _vm.showHeader
        ? _c(
            "div",
            { ref: "headerWrapper", staticClass: "el-table__header-wrapper" },
            [
              _c("table-header", {
                ref: "tableHeader",
                attrs: {
                  store: _vm.store,
                  layout: _vm.layout,
                  border: _vm.border,
                  "default-sort": _vm.defaultSort
                }
              })
            ],
            1
          )
        : _vm._e(),
      _c(
        "div",
        {
          ref: "bodyWrapper",
          staticClass: "el-table__body-wrapper",
          style: [_vm.bodyHeight],
          on: {
            "&scroll": function($event) {
              return _vm.onVirtualScroll(true)
            }
          }
        },
        [
          _c("table-body", {
            ref: "refTableBody",
            style: { width: _vm.bodyWidth },
            attrs: {
              context: _vm.context,
              store: _vm.store,
              stripe: _vm.stripe,
              layout: _vm.layout,
              "row-class-name": _vm.rowClassName,
              "row-style": _vm.rowStyle,
              highlight: _vm.highlightCurrentRow,
              "row-height": _vm.rowHeight
            }
          }),
          !_vm.data || _vm.data.length === 0
            ? _c(
                "div",
                {
                  staticClass: "el-table__empty-block",
                  style: { width: _vm.bodyWidth }
                },
                [
                  _c(
                    "span",
                    { staticClass: "el-table__empty-text" },
                    [
                      _vm._t("empty", [
                        _vm._v(
                          _vm._s(_vm.emptyText || _vm.t("el.table.emptyText"))
                        )
                      ])
                    ],
                    2
                  )
                ]
              )
            : _vm._e()
        ],
        1
      ),
      _vm.showSummary
        ? _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.data && _vm.data.length > 0,
                  expression: "data && data.length > 0"
                }
              ],
              ref: "footerWrapper",
              staticClass: "el-table__footer-wrapper"
            },
            [
              _c("table-footer", {
                style: {
                  width: _vm.layout.bodyWidth ? _vm.layout.bodyWidth + "px" : ""
                },
                attrs: {
                  store: _vm.store,
                  layout: _vm.layout,
                  border: _vm.border,
                  "sum-text": _vm.sumText || _vm.t("el.table.sumText"),
                  "summary-method": _vm.summaryMethod,
                  "default-sort": _vm.defaultSort
                }
              })
            ],
            1
          )
        : _vm._e(),
      _vm.fixedColumns.length > 0
        ? _c(
            "div",
            {
              ref: "fixedWrapper",
              staticClass: "el-table__fixed",
              style: [
                {
                  width: _vm.layout.fixedWidth
                    ? _vm.layout.fixedWidth + "px"
                    : ""
                },
                _vm.fixedHeight
              ]
            },
            [
              _vm.showHeader
                ? _c(
                    "div",
                    {
                      ref: "fixedHeaderWrapper",
                      staticClass: "el-table__fixed-header-wrapper"
                    },
                    [
                      _c("table-header", {
                        ref: "fixedTableHeader",
                        attrs: {
                          fixed: "left",
                          border: _vm.border,
                          store: _vm.store,
                          layout: _vm.layout
                        }
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _c(
                "div",
                {
                  ref: "fixedBodyWrapper",
                  staticClass: "el-table__fixed-body-wrapper",
                  style: [
                    { top: _vm.layout.headerHeight + "px" },
                    _vm.fixedBodyHeight
                  ],
                  on: {
                    "&scroll": function($event) {
                      return _vm.onVirtualScroll($event)
                    }
                  }
                },
                [
                  _c("table-body", {
                    attrs: {
                      fixed: "left",
                      store: _vm.store,
                      stripe: _vm.stripe,
                      layout: _vm.layout,
                      highlight: _vm.highlightCurrentRow,
                      "row-class-name": _vm.rowClassName,
                      "row-style": _vm.rowStyle,
                      "row-height": _vm.rowHeight,
                      hideNoFixedColumn: ""
                    }
                  })
                ],
                1
              ),
              _vm.showSummary
                ? _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.data && _vm.data.length > 0,
                          expression: "data && data.length > 0"
                        }
                      ],
                      ref: "fixedFooterWrapper",
                      staticClass: "el-table__fixed-footer-wrapper"
                    },
                    [
                      _c("table-footer", {
                        style: {
                          width: _vm.layout.fixedWidth
                            ? _vm.layout.fixedWidth + "px"
                            : ""
                        },
                        attrs: {
                          fixed: "left",
                          border: _vm.border,
                          "sum-text": _vm.sumText || _vm.t("el.table.sumText"),
                          "summary-method": _vm.summaryMethod,
                          store: _vm.store,
                          layout: _vm.layout
                        }
                      })
                    ],
                    1
                  )
                : _vm._e()
            ]
          )
        : _vm._e(),
      _vm.rightFixedColumns.length > 0
        ? _c(
            "div",
            {
              ref: "rightFixedWrapper",
              staticClass: "el-table__fixed-right",
              style: [
                // { width: layout.rightFixedWidth ? (layout.rightFixedWidth - (layout.scrollY ? layout.gutterWidth : 0)) + 'px' : '' },
                {
                  width: _vm.layout.rightFixedWidth
                    ? _vm.layout.rightFixedWidth + "px"
                    : ""
                },
                {
                  right: _vm.layout.scrollY
                    ? (_vm.layout.gutterWidth || 1) + "px"
                    : "1px"
                },
                _vm.fixedHeight
              ]
            },
            [
              _vm.showHeader
                ? _c(
                    "div",
                    {
                      ref: "rightFixedHeaderWrapper",
                      staticClass: "el-table__fixed-header-wrapper"
                    },
                    [
                      _c("table-header", {
                        ref: "rightFixedTableHeader",
                        style: {
                          width: _vm.layout.rightFixedWidth
                            ? _vm.layout.rightFixedWidth + "px"
                            : ""
                        },
                        attrs: {
                          fixed: "right",
                          border: _vm.border,
                          store: _vm.store,
                          layout: _vm.layout
                        }
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _c(
                "div",
                {
                  ref: "rightFixedBodyWrapper",
                  staticClass: "el-table__fixed-body-wrapper",
                  style: [
                    {
                      top:
                        _vm.layout.headerHeight -
                        (_vm.isMoreData ? 1 : 0) +
                        "px"
                    },
                    _vm.fixedBodyHeight
                  ],
                  on: {
                    "&scroll": function($event) {
                      return _vm.onVirtualScroll($event)
                    }
                  }
                },
                [
                  _c(
                    "table-body",
                    {
                      style: {
                        width: _vm.layout.rightFixedWidth
                          ? _vm.layout.rightFixedWidth + "px"
                          : ""
                      },
                      attrs: {
                        fixed: "right",
                        store: _vm.store,
                        stripe: _vm.stripe,
                        layout: _vm.layout,
                        "row-class-name": _vm.rowClassName,
                        "row-style": _vm.rowStyle,
                        highlight: _vm.highlightCurrentRow,
                        "row-height": _vm.rowHeight
                      }
                    },
                    [_vm._v("\n        >\n      ")]
                  )
                ],
                1
              ),
              _vm.showSummary
                ? _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.data && _vm.data.length > 0,
                          expression: "data && data.length > 0"
                        }
                      ],
                      ref: "rightFixedFooterWrapper",
                      staticClass: "el-table__fixed-footer-wrapper"
                    },
                    [
                      _c("table-footer", {
                        style: {
                          width: _vm.layout.rightFixedWidth
                            ? _vm.layout.rightFixedWidth + "px"
                            : ""
                        },
                        attrs: {
                          fixed: "right",
                          border: _vm.border,
                          "sum-text": _vm.sumText || _vm.t("el.table.sumText"),
                          "summary-method": _vm.summaryMethod,
                          store: _vm.store,
                          layout: _vm.layout
                        }
                      })
                    ],
                    1
                  )
                : _vm._e()
            ]
          )
        : _vm._e(),
      _vm.rightFixedColumns.length > 0
        ? _c("div", {
            staticClass: "el-table__fixed-right-patch",
            style: {
              width: _vm.layout.scrollY ? _vm.layout.gutterWidth + "px" : "0",
              height: _vm.layout.headerHeight + "px"
            }
          })
        : _vm._e(),
      _c("div", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.resizeProxyVisible,
            expression: "resizeProxyVisible"
          }
        ],
        ref: "resizeProxy",
        staticClass: "el-table__column-resize-proxy"
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/table/src/table.vue?vue&type=template&id=493fe34e&

// EXTERNAL MODULE: external "@/lib/checkbox"
var checkbox_ = __webpack_require__(26);
var checkbox_default = /*#__PURE__*/__webpack_require__.n(checkbox_);

// EXTERNAL MODULE: external "throttle-debounce"
var external_throttle_debounce_ = __webpack_require__(18);

// EXTERNAL MODULE: external "@/lib/utils/resize-event"
var resize_event_ = __webpack_require__(25);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(8);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: external "@/lib/utils/merge"
var merge_ = __webpack_require__(11);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge_);

// EXTERNAL MODULE: external "@/lib/utils/util"
var util_ = __webpack_require__(4);

// CONCATENATED MODULE: ./packages/table/src/util.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var getCell = function getCell(event) {
  var cell = event.target;

  while (cell && cell.tagName.toUpperCase() !== 'HTML') {
    if (cell.tagName.toUpperCase() === 'TD') {
      return cell;
    }
    cell = cell.parentNode;
  }

  return null;
};

var isObject = function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
};

var util_orderBy = function orderBy(array, sortKey, reverse, sortMethod, sortBy) {
  if (!sortKey && !sortMethod && (!sortBy || Array.isArray(sortBy) && !sortBy.length)) {
    return array;
  }
  if (typeof reverse === 'string') {
    reverse = reverse === 'descending' ? -1 : 1;
  } else {
    reverse = reverse && reverse < 0 ? -1 : 1;
  }
  var getKey = sortMethod ? null : function (value, index) {
    if (sortBy) {
      if (!Array.isArray(sortBy)) {
        sortBy = [sortBy];
      }
      return sortBy.map(function (by) {
        if (typeof by === 'string') {
          return Object(util_["getValueByPath"])(value, by);
        } else {
          return by(value, index, array);
        }
      });
    }
    if (sortKey !== '$key') {
      if (isObject(value) && '$value' in value) value = value.$value;
    }
    return [isObject(value) ? Object(util_["getValueByPath"])(value, sortKey) : value];
  };
  var compare = function compare(a, b) {
    if (sortMethod) {
      return sortMethod(a.value, b.value);
    }
    for (var i = 0, len = a.key.length; i < len; i++) {
      if (a.key[i] < b.key[i]) {
        return -1;
      }
      if (a.key[i] > b.key[i]) {
        return 1;
      }
    }
    return 0;
  };
  return array.map(function (value, index) {
    return {
      value: value,
      index: index,
      key: getKey ? getKey(value, index) : null
    };
  }).sort(function (a, b) {
    var order = compare(a, b);
    if (!order) {
      // make stable https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
      order = a.index - b.index;
    }
    return order * reverse;
  }).map(function (item) {
    return item.value;
  });
};

var getColumnById = function getColumnById(table, columnId) {
  var column = null;
  table.columns.forEach(function (item) {
    if (item.id === columnId) {
      column = item;
    }
  });
  return column;
};

var getColumnByCell = function getColumnByCell(table, cell) {
  var matches = (cell.className || '').match(/el-table_[^\s]+/gm);
  if (matches) {
    return getColumnById(table, matches[0]);
  }
  return null;
};

var isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

var mousewheel = function mousewheel(element, callback) {
  if (element && element.addEventListener) {
    element.addEventListener(isFirefox ? 'DOMMouseScroll' : 'mousewheel', callback);
  }
};

var getRowIdentity = function getRowIdentity(row, rowKey) {
  if (!row) throw new Error('row is required when get row identity');
  if (typeof rowKey === 'string') {

    if (rowKey.indexOf('.') < 0) {
      return row[rowKey];
    }
    var key = rowKey.split('.');
    var current = row;
    for (var i = 0, len = key.length; i < len; i++) {
      current = current[key[i]];
    }
    return current;
  } else if (typeof rowKey === 'function') {
    return rowKey.call(null, row);
  }
};

var getColumnByKey = function getColumnByKey(table, columnKey) {
  var column = null;
  for (var i = 0; i < table.columns.length; i++) {
    var item = table.columns[i];
    if (item.columnKey === columnKey) {
      column = item;
      break;
    }
  }
  return column;
};

var toggleRowStatus = function toggleRowStatus(statusArr, row, newVal) {
  var changed = false;
  var index = statusArr.indexOf(row);
  var included = index !== -1;

  var addRow = function addRow() {
    statusArr.push(row);
    changed = true;
  };
  var removeRow = function removeRow() {
    statusArr.splice(index, 1);
    changed = true;
  };

  if (typeof newVal === 'boolean') {
    if (newVal && !included) {
      addRow();
    } else if (!newVal && included) {
      removeRow();
    }
  } else {
    if (included) {
      removeRow();
    } else {
      addRow();
    }
  }
  return changed;
};

function parseHeight(height) {
  if (typeof height === 'number') {
    return height;
  }
  if (typeof height === 'string') {
    if (/^\d+(?:px)?$/.test(height)) {
      return parseInt(height, 10);
    } else {
      return height;
    }
  }
  return null;
}
// CONCATENATED MODULE: ./packages/table/src/table-store.js


// import debounce from 'throttle-debounce/debounce';



// import { addClass, removeClass } from '@/src/utils/dom';

var table_store_sortData = function sortData(data, states) {
  var sortingColumn = states.sortingColumn;
  if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
    return data;
  }
  if (Object.keys(states.treeData).length === 0) {
    return util_orderBy(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy);
  }
  // 存在嵌套类型的数据
  var rowKey = states.rowKey;
  var filteredData = [];
  var treeDataMap = {};
  var len = data.length;
  var index = 0;
  while (index < len) {
    var cur = data[index];
    var key = cur[rowKey];
    var treeNode = states.treeData[key];
    filteredData.push(cur);
    index++;
    if (!treeNode) {
      continue;
    }
    treeDataMap[key] = [];
    while (index < len) {
      cur = data[index];
      treeNode = states.treeData[cur[rowKey]];
      index++;
      if (treeNode && treeNode.level !== 0) {
        treeDataMap[key].push(cur);
      } else {
        filteredData.push(cur);
        break;
      }
    }
  }
  var sortedData = util_orderBy(filteredData, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy);
  return sortedData.reduce(function (prev, current) {
    var treeNodes = treeDataMap[current[rowKey]] || [];
    return prev.concat(current, treeNodes);
  }, []);
};

var table_store_getKeysMap = function getKeysMap(array, rowKey) {
  var arrayMap = {};
  (array || []).forEach(function (row, index) {
    arrayMap[getRowIdentity(row, rowKey)] = { row: row, index: index };
  });
  return arrayMap;
};

var toggleRowSelection = function toggleRowSelection(states, row, selected) {
  var changed = false;
  var selection = states.selection;
  var selectIds = states.selectionIds;
  var index = selectIds.length > 0 ? selectIds.indexOf(states.reserveSelection ? row[states.rowKey] : row.__vkey) : -1;
  var noHas = index === -1;
  var data = states.isMoreData ? states.virtualData : states._data;
  if (typeof selected === 'undefined') {
    if (noHas) {
      selection.push(row);
      selectIds.push(states.reserveSelection ? row[states.rowKey] : row.__vkey);
      changed = true;
    } else {
      selection.splice(index, 1);
      selectIds.splice(index, 1);
      changed = true;
    }
  } else {
    if (selected && noHas) {
      selection.push(row);
      selectIds.push(states.reserveSelection ? row[states.rowKey] : row.__vkey);
      changed = true;
    } else if (!selected && index > -1) {
      selection.splice(index, 1);
      selectIds.splice(index, 1);
      changed = true;
    }
  }
  states.isAllSelected = selection.length === data.length;
  var flag = selected !== undefined ? selected : noHas || selected;
  toggleSelected(states, row.__vkey, flag);
  return changed;
};

// 更新数据选中状态信息
var toggleSelected = function toggleSelected(states, key, selected) {
  var virtualData = states._data;
  var curKey = key;
  if (states.isMoreData) {
    virtualData = states.virtualData;
  }
  // 分页选中
  if (states.pageable) {
    for (var i = 0, len = virtualData.length; i < len; ++i) {
      if (virtualData[i].__vkey === key) {
        curKey = i;
        break;
      }
    }
  }
  var vObj = virtualData.filter(function (item) {
    return item.__vkey === curKey;
  })[0];
  // if (!vObj) {
  //   curKey = curKey % states.pageSize;
  //   vObj = virtualData[curKey];
  // }
  vObj.__selected = selected;
  // virtualData.splice(curKey, 1, vObj);
  // vObj = null;
};

// 获取当前选中行index
// const getCurrentRowIndex = function(states, row) {
//   let virtualData = states._data;
//   let curKey = row.__vkey;
//   if (states.isMoreData) {
//     virtualData = states.virtualData;
//   }
//   // 分页选中
//   if (states.pageable) {
//     for (var i = 0, len = virtualData.length; i < len; ++i) {
//       if (virtualData[i].__vkey === curKey) {
//         curKey = i;
//         break;
//       }
//     }
//   }
//   return {
//     key: curKey,
//     row: virtualData[curKey]
//   };
// };
var TableStore = function TableStore(table) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!table) {
    throw new Error('Table is required.');
  }
  this.table = table;

  this.states = {
    check: null,
    rowKey: null,
    _columns: [],
    originColumns: [],
    columns: [],
    fixedColumns: [],
    rightFixedColumns: [],
    isComplex: false,
    virtualData: [], // 虚拟节点数据this.store.states
    renderData: [],
    selectType: '',
    _data: null,
    filteredData: null,
    data: null,
    sortingColumn: null,
    sortProp: null,
    sortOrder: null,
    isAllSelected: false,
    selection: [], // 复选框选中数据
    selectionIds: [], // 复选框选中数据IDs
    reserveSelection: false,
    selectable: null,
    currentRow: null,
    currentEditRow: null,
    hoverRow: null,
    filters: {},
    expandRows: [],
    defaultExpandAll: false,
    _editRows: [], // 编辑后的行数据
    _uTraceData: {}, // 可编辑表格数据表更前后值
    rules: [],
    index: null, // 用户控制可编辑行
    treeData: {},
    indent: 16,
    autoSortable: false,
    pageable: false, // 用于控制分页选中
    vnodeColumn: [], // 用于右键隐藏列时，保存表格的列vode
    lazy: false,
    lazyTreeNodeMap: {},
    selectOnIndeterminate: false
  };

  for (var prop in initialState) {
    if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
      this.states[prop] = initialState[prop];
    }
  }
};

TableStore.prototype.mutations = {
  setData: function setData(states, data) {
    var _this = this;

    // const dataInstanceChanged = states._data !== data;
    states._data = data;
    states.data = table_store_sortData(data || [], states);

    // states.data.forEach((item) => {
    //   if (!item.$extra) {
    //     Object.defineProperty(item, '$extra', {
    //       value: {},
    //       enumerable: false
    //     });
    //   }
    // });

    this.updateCurrentRow();

    // if (!states.reserveSelection) {
    //   if (dataInstanceChanged) {
    //     this.clearSelection();
    //   } else {
    //     this.cleanSelection();
    //   }
    //   this.updateAllSelected();
    // } else {
    //   const rowKey = states.rowKey;
    //   if (rowKey) {
    //     const selection = states.selection;
    //     const selectedMap = getKeysMap(selection, rowKey);

    //     states.data.forEach((row) => {
    //       const rowId = getRowIdentity(row, rowKey);
    //       const rowInfo = selectedMap[rowId];
    //       if (rowInfo) {
    //         selection[rowInfo.index] = row;
    //       }
    //     });

    //     this.updateAllSelected();
    //   } else {
    //     console.warn('WARN: rowKey is required when reserve-selection is enabled.');
    //   }
    // }
    var defaultExpandAll = states.defaultExpandAll;
    if (defaultExpandAll) {
      this.states.expandRows = (states.data || []).slice(0);
    }

    external_vue_default.a.nextTick(function () {
      return _this.table.updateScrollY();
    });
  },
  changeSortCondition: function changeSortCondition(states) {
    var _this2 = this;

    if (states.sortOrder !== null) {
      states.data = table_store_sortData(states.filteredData || states._data || [], states);
    } else {
      states.data = states._data;
    }

    this.table.$emit('sort-change', {
      column: this.states.sortingColumn,
      prop: this.states.sortProp,
      order: this.states.sortOrder
    });

    external_vue_default.a.nextTick(function () {
      return _this2.table.updateScrollY();
    });
  },
  filterChange: function filterChange(states, options) {
    var _this3 = this;

    var column = options.column,
        values = options.values,
        silent = options.silent;

    if (values && !Array.isArray(values)) {
      values = [values];
    }

    var prop = column.property;
    var filters = {};

    if (prop) {
      states.filters[column.id] = values;
      filters[column.columnKey || column.id] = values;
    }

    var data = states._data;

    Object.keys(states.filters).forEach(function (columnId) {
      var values = states.filters[columnId];
      if (!values || values.length === 0) return;
      var column = getColumnById(_this3.states, columnId);
      if (column && column.filterMethod) {
        data = data.filter(function (row) {
          return values.some(function (value) {
            return column.filterMethod.call(null, value, row);
          });
        });
      }
    });

    states.filteredData = data;
    states.data = table_store_sortData(data, states);

    if (!silent) {
      this.table.$emit('filter-change', filters);
    }

    external_vue_default.a.nextTick(function () {
      return _this3.table.updateScrollY();
    });
  },
  insertColumn: function insertColumn(states, column, index, parent, isDynamicInsert) {
    var array = states._columns;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column);
    } else {
      array.push(column);
    }

    if (column.type === 'selection') {
      states.selectable = column.selectable;
      states.reserveSelection = column.reserveSelection;
    }
    this.table.curCloumn = column;
    isDynamicInsert && this.updateColumns(); // hack for dynamics insert column
  },

  /**
   * column 数据更新时 重新计算表格
    */
  updateColumns: function updateColumns(states, column) {
    var colum = states.columns;
    for (var i = 0; i < colum.length; i++) {
      var element = colum[i];
      if (element.property === column.property) {
        element.hideColumn = column.hideColumn;
      }
    }
    this.updateColumns();
  },
  updateColumnsRules: function updateColumnsRules(states, column) {
    var colum = states.columns;
    for (var i = 0; i < colum.length; i++) {
      var element = colum[i];
      if (element.property === column.property) {
        element.rules = column.rules;
      }
    }
  },
  removeColumn: function removeColumn(states, column, parent) {
    var array = states._columns;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }
    if (array) {
      array.splice(array.indexOf(column), 1);
    }
    this.updateColumns(); // hack for dynamics remove column
    // this.scheduleLayout();
  },


  // setHoverRow(states, row) {
  //   states.hoverRow = row;
  // },
  // setTableSelect(states, row, index, val) {
  //   const key = states.isMoreData ? 'renderData' : 'data';
  //   let data = [...states[key]];
  //   states[key] = [];
  //   data[index].__selected = val;
  //   states[key] = [... data];
  //   if (states.isMoreData) {
  //     states.virtualData[row.__vkey].__selected = val;
  //   } else {
  //     states._data[row.__vkey].__selected = val;
  //   }
  // },

  setCheckIndex: function setCheckIndex(states, row, index) {
    var checkIndex = states.isMoreData ? row.__vkey : index;
    states.check = checkIndex;
    states.selections = [row];
  },
  setCurrentRow: function setCurrentRow(states, row, index) {
    // 先清空处理，避免设置选中同一条数据时不生效的问题
    states.currentRow = null;
    states.currentEditRow = null;
    var _index = index;
    var column = states.columns.filter(function (item) {
      return item && item.type === 'selection';
    });
    // const oldCurrentRow = states.currentRow;
    // const rowInfo = row ? getCurrentRowIndex(states, row) : {key: -1};
    // const curRow = rowInfo.row;
    _index = states.data.indexOf(row);
    // if (_index === -1) {
    //   return;
    // }
    states.check = _index;
    states.index = _index;
    states.currentRow = row;
    states.currentEditRow = row;
    if (column.length < 1) {
      states.selection = row ? [row] : [];
      states.selectionIds = [_index];
    }
    // if (oldCurrentRow !== curRow) {
    //   this.table.$emit('current-change', curRow, oldCurrentRow);
    // }
  },
  rowSelectedChanged: function rowSelectedChanged(states, row) {
    var table = this.table;
    states.pageSize = table.$parent.pageSize;
    var changed = toggleRowSelection(states, row);
    var selection = states.selection;
    if (changed) {
      table.$emit('selection-change', selection);
      table.$emit('select', selection, row);
    }

    // this.updateAllSelected();
  },


  toggleRowExpanded: function toggleRowExpanded(states, row, expanded) {
    var expandRows = states.expandRows;
    if (typeof expanded !== 'undefined') {
      var index = expandRows.indexOf(row);
      if (expanded) {
        if (index === -1) expandRows.push(row);
      } else {
        if (index !== -1) expandRows.splice(index, 1);
      }
    } else {
      var _index2 = expandRows.indexOf(row);
      if (_index2 === -1) {
        expandRows.push(row);
      } else {
        expandRows.splice(_index2, 1);
      }
    }
    this.table.$emit('expand', row, expandRows.indexOf(row) !== -1);
  },

  toggleAllSelection: Object(external_throttle_debounce_["debounce"])(10, function (states) {
    var isMoreData = states.isMoreData;
    var _data = isMoreData ? states.virtualData : states._data;
    var selection = this.states.selection;
    var value = states.selectOnIndeterminate ? !states.isAllSelected : !(states.isAllSelected || selection.length);
    states.isAllSelected = value;
    var selectionChanged = false;
    _data.forEach(function (item, index) {
      if (states.selectable) {
        if (states.selectable.call(null, item, index) && toggleRowSelection(states, item, value)) {
          selectionChanged = true;
        }
      } else {
        if (toggleRowSelection(states, item, value)) {
          selectionChanged = true;
        }
      }
    });

    var table = this.table;
    if (selectionChanged) {
      table.$emit('selection-change', selection);
    }
    table.$emit('select-all', selection);
  }),

  sort: function sort(states, options) {
    var prop = options.prop,
        order = options.order,
        init = options.init;

    if (prop) {
      var column = Object(util_["arrayFind"])(states.columns, function (column) {
        return column.property === prop;
      });
      if (column) {
        column.order = order;
        this.updateSort(column, prop, order);
        this.commit('changeSortCondition', { init: init });
      }
    }
  }
};

var doFlattenColumns = function doFlattenColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

TableStore.prototype.updateColumns = function () {
  var states = this.states;
  var _columns = [].concat(states._columns || []);
  var fixedColumns = [];
  var rightFixedColumns = _columns.filter(function (column) {
    return column.fixed === 'right';
  });
  var noFixedCloumns = _columns.filter(function (column) {
    return !column.fixed;
  });
  fixedColumns = _columns.filter(function (column) {
    return column.fixed === true || column.fixed === 'left';
  });
  if (fixedColumns.length > 0 && _columns[1] && _columns[1].type === 'index' && !_columns[1].fixed) {
    _columns[1].fixed = true;
    fixedColumns.unshift(_columns[1]);
    if (noFixedCloumns[1] && _columns[1].type === 'index') {
      noFixedCloumns.splice(1, 1);
    }
  }
  if (fixedColumns.length > 0 && _columns[0] && (_columns[0].type === 'selection' || _columns[0].type === 'single') && !_columns[0].fixed) {
    _columns[0].fixed = true;
    fixedColumns.unshift(_columns[0]);
    if (noFixedCloumns[0] && (_columns[0].type === 'selection' || _columns[0].type === 'single')) {
      noFixedCloumns.splice(0, 1);
    }
  }
  states.fixedColumns = fixedColumns;
  states.rightFixedColumns = rightFixedColumns;
  states.originColumns = [].concat(fixedColumns).concat(noFixedCloumns).concat(rightFixedColumns);
  states.columns = doFlattenColumns(states.originColumns);
  states.isComplex = fixedColumns.length > 0 || rightFixedColumns.length > 0;
  this.table.doLayout();
};

TableStore.prototype.clearSelection = function () {
  var states = this.states;
  states.isAllSelected = false;
  states.selection = [];
  states.selectionIds = [];
  states._data.forEach(function (v, i) {
    toggleSelected(states, v.__vkey, false);
  });
  this.table.$emit('selection-change', states.selection);
};

TableStore.prototype.setExpandRowKeys = function (rowKeys) {
  var expandRows = [];
  var data = this.states.data;
  var rowKey = this.states.rowKey;
  if (!rowKey) throw new Error('[Table] prop row-key should not be empty.');
  var keysMap = table_store_getKeysMap(data, rowKey);
  rowKeys.forEach(function (key) {
    var info = keysMap[key];
    if (info) {
      expandRows.push(info.row);
    }
  });

  this.states.expandRows = expandRows;
};

TableStore.prototype.toggleRowSelection = function (row, selected) {
  var changed = toggleRowSelection(this.states, row, selected);
  if (changed) {
    this.table.$emit('selection-change', this.states.selection);
  }
};

TableStore.prototype.isRowExpanded = function (row) {
  var _states = this.states,
      _states$expandRows = _states.expandRows,
      expandRows = _states$expandRows === undefined ? [] : _states$expandRows,
      rowKey = _states.rowKey;

  if (rowKey) {
    var expandMap = table_store_getKeysMap(expandRows, rowKey);
    return !!expandMap[getRowIdentity(row, rowKey)];
  }
  return expandRows.indexOf(row) !== -1;
};

TableStore.prototype.cleanSelection = function () {
  var selection = this.states.selection || [];
  var data = this.states.data;
  var rowKey = this.states.rowKey;
  var deleted = void 0;
  if (rowKey) {
    deleted = [];
    var selectedMap = table_store_getKeysMap(selection, rowKey);
    var dataMap = table_store_getKeysMap(data, rowKey);
    for (var key in selectedMap) {
      if (selectedMap.hasOwnProperty(key) && !dataMap[key]) {
        deleted.push(selectedMap[key].row);
      }
    }
  } else {
    deleted = selection.filter(function (item) {
      return data.indexOf(item) === -1;
    });
  }

  deleted.forEach(function (deletedItem) {
    selection.splice(selection.indexOf(deletedItem), 1);
  });

  if (deleted.length) {
    this.table.$emit('selection-change', selection);
  }
};

TableStore.prototype.isSelected = function (row) {
  var selections = this.states.reserveSelection ? this.states.selectionIds : this.states.selection;
  return (selections || []).indexOf(this.states.reserveSelection ? row[this.states.rowKey] : row) > -1;
};

TableStore.prototype.updateAllSelected = function () {
  var states = this.states;
  var selection = states.selection,
      rowKey = states.rowKey,
      selectable = states.selectable,
      data = states.data;

  var dataLen = data.length;
  if (!data || dataLen === 0) {
    states.isAllSelected = false;
    return;
  }

  var selectedMap = void 0;
  if (rowKey) {
    selectedMap = table_store_getKeysMap(states.selection, rowKey);
  }

  var isSelected = function isSelected(row) {
    if (selectedMap) {
      return !!selectedMap[getRowIdentity(row, rowKey)];
    } else {
      return selection.indexOf(row) !== -1;
    }
  };

  var isAllSelected = true;
  var selectedCount = 0;
  for (var i = 0; i < dataLen; i++) {
    var item = data[i];
    if (selectable) {
      var isRowSelectable = selectable.call(null, item, i);
      if (isRowSelectable) {
        if (!isSelected(item)) {
          isAllSelected = false;
          break;
        } else {
          selectedCount++;
        }
      }
    } else {
      if (!isSelected(item)) {
        isAllSelected = false;
        break;
      } else {
        selectedCount++;
      }
    }
  }

  if (selectedCount === 0) isAllSelected = false;

  states.isAllSelected = isAllSelected;
};

TableStore.prototype.scheduleLayout = function () {
  this.table.doLayout();
};

TableStore.prototype.setCurrentRowKey = function (key) {
  var states = this.states;
  var rowKey = states.rowKey;
  if (!rowKey) throw new Error('[Table] row-key should not be empty.');
  var data = states.data || [];
  var keysMap = table_store_getKeysMap(data, rowKey);
  var info = keysMap[key];
  if (info) {
    states.currentRow = info.row;
    // 添加单选和复选时样式的同步
    if (states._columns && states._columns[0]) {
      if (states._columns[0].type === 'single') {
        var _index = states.data.indexOf(info.row);
        this.commit('setCheckIndex', info.row, _index);
      } else if (states._columns[0].type === 'selection') {
        states.selection.push(info.row);
      }
    }
  }
};

TableStore.prototype.updateCurrentRow = function () {
  var states = this.states;
  var table = this.table;
  var data = states.data || [];
  var oldCurrentRow = states.currentRow;

  if (data.indexOf(oldCurrentRow) === -1) {
    states.currentRow = null;

    if (states.currentRow !== oldCurrentRow) {
      table.$emit('current-change', null, oldCurrentRow);
    }
  }
};

TableStore.prototype.commit = function (name) {
  var mutations = this.mutations;
  if (mutations[name]) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    mutations[name].apply(this, [this.states].concat(args));
  } else {
    throw new Error('Action not found: ' + name);
  }
};
TableStore.prototype.toggleRowExpansion = function (row, expanded) {
  var changed = toggleRowStatus(this.states.expandRows, row, expanded);
  if (changed) {
    this.table.$emit('expand-change', row, this.states.expandRows.slice());
    this.scheduleLayout();
  }
};
// 展开行与 TreeTable 都要使用
TableStore.prototype.toggleRowExpansionAdapter = function (row, expanded) {
  var hasExpandColumn = this.states.columns.some(function (_ref) {
    var type = _ref.type;
    return type === 'expand';
  });
  if (hasExpandColumn) {
    this.toggleRowExpansion(row, expanded);
  } else {
    this.toggleTreeExpansion(row, expanded);
  }
};
TableStore.prototype.toggleTreeExpansion = function (rowKey) {
  var treeData = this.states.treeData;

  var node = treeData[rowKey];
  if (!node) return;
  if (typeof node.expanded !== 'boolean') {
    throw new Error('a leaf must have expanded property');
  }
  node.expanded = !node.expanded;

  var _traverse = null;
  if (node.expanded) {
    _traverse = function traverse(children, parent) {
      if (children && parent.expanded) {
        children.forEach(function (key) {
          treeData[key].display = true;
          _traverse(treeData[key].children, treeData[key]);
        });
      }
    };
    node.children.forEach(function (key) {
      treeData[key].display = true;
      _traverse(treeData[key].children, treeData[key]);
    });
  } else {
    var traverse = function traverse(children) {
      if (!children) return;
      children.forEach(function (key) {
        treeData[key].display = false;
        traverse(treeData[key].children);
      });
    };
    traverse(node.children);
  }
};
TableStore.prototype.loadData = function (row, treeNode, changeIconClass) {
  var _this4 = this;

  var table = this.table;
  var parentRowKey = treeNode.rowKey;
  if (table.lazy && table.load) {
    table.load(row, treeNode, function (data) {
      if (!Array.isArray(data)) {
        throw new Error('data must be an array');
      }
      var treeData = _this4.states.treeData;
      data.forEach(function (item) {
        var rowKey = table.getRowKey(item);
        var parent = treeData[parentRowKey];
        parent.loaded = true;
        parent.children.push(rowKey);
        var child = {
          display: true,
          level: parent.level + 1
        };
        if (item[_this4.table.treeProps.hasChildren]) {
          child.expanded = false;
          child.hasChildren = true;
          child.children = [];
        }
        external_vue_default.a.set(treeData, rowKey, child);
        external_vue_default.a.set(_this4.states.lazyTreeNodeMap, rowKey, item);
      });
      // 回调函数，加载完数据之后将icon的class切换回去
      if (typeof changeIconClass === 'function') {
        changeIconClass();
      }
      _this4.toggleTreeExpansion(parentRowKey);
    });
  }
};
TableStore.prototype.updateSort = function (column, prop, order) {
  if (this.states.sortingColumn && this.states.sortingColumn !== column) {
    this.states.sortingColumn.order = null;
  }
  this.states.sortingColumn = column;
  this.states.sortProp = prop;
  this.states.sortOrder = order;
};
TableStore.prototype.clearSort = function () {
  var states = this.states;
  if (!states.sortingColumn) return;

  this.updateSort(null, null, null);
  this.commit('changeSortCondition', {
    silent: true
  });
};
TableStore.prototype.clearFilter = function (columnKeys) {
  var states = this.states;
  var _table$$refs = this.table.$refs,
      tableHeader = _table$$refs.tableHeader,
      fixedTableHeader = _table$$refs.fixedTableHeader,
      rightFixedTableHeader = _table$$refs.rightFixedTableHeader;


  var panels = {};
  if (tableHeader) panels = merge_default()(panels, tableHeader.filterPanels);
  if (fixedTableHeader) panels = merge_default()(panels, fixedTableHeader.filterPanels);
  if (rightFixedTableHeader) panels = merge_default()(panels, rightFixedTableHeader.filterPanels);

  var keys = Object.keys(panels);
  if (!keys.length) return;

  if (typeof columnKeys === 'string') {
    columnKeys = [columnKeys];
  }

  if (Array.isArray(columnKeys)) {
    var columns = columnKeys.map(function (key) {
      return getColumnByKey(states, key);
    });
    keys.forEach(function (key) {
      var column = columns.find(function (col) {
        return col.id === key;
      });
      if (column) {
        // TODO: 优化这里的代码
        panels[key].filteredValue = [];
      }
    });
    this.commit('filterChange', {
      column: columns,
      values: [],
      silent: true,
      multi: true
    });
  } else {
    keys.forEach(function (key) {
      // TODO: 优化这里的代码
      panels[key].filteredValue = [];
    });

    states.filters = {};
    this.commit('filterChange', {
      column: {},
      values: [],
      silent: true
    });
  }
};

var calculateDomItemsMinHeight = function calculateDomItemsMinHeight(itemHeight, remainHeight, scrollTop) {
  return scrollTop > remainHeight ? Math.ceil((scrollTop - remainHeight) / itemHeight) * itemHeight : 0;
};

var calculateDomItemsMaxHeight = function calculateDomItemsMaxHeight(itemHeight, remainHeight, viewPortHeight, renderItemsHeight, scrollTop) {
  return scrollTop > remainHeight ? Math.ceil((scrollTop + remainHeight + viewPortHeight) / itemHeight) * itemHeight : renderItemsHeight;
};

TableStore.prototype.calDomItemsHeight = function (itemHeight, remainHeight, viewPortHeight, renderItemsHeight, scrollTop) {
  var minHeight = calculateDomItemsMinHeight(itemHeight, remainHeight, scrollTop);
  var maxHeight = calculateDomItemsMaxHeight(itemHeight, remainHeight, viewPortHeight, renderItemsHeight, scrollTop);
  return [minHeight, maxHeight];
};
/* harmony default export */ var table_store = (TableStore);
// EXTERNAL MODULE: external "@/lib/utils/scrollbar-width"
var scrollbar_width_ = __webpack_require__(75);
var scrollbar_width_default = /*#__PURE__*/__webpack_require__.n(scrollbar_width_);

// EXTERNAL MODULE: external "@/lib/locale"
var lib_locale_ = __webpack_require__(6);

// CONCATENATED MODULE: ./packages/table/src/table-layout.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var fontRate = {
  CHAR_RATE: 1.1, // 汉字比率
  NUM_RATE: 0.65, // 数字
  OTHER_RATE: 0.5 // 除汉字和数字以外的字符的比率
};

var table_layout_TableLayout = function () {
  function TableLayout(options) {
    _classCallCheck(this, TableLayout);

    this.observers = [];
    this.table = null;
    this.store = null;
    this.columns = null;
    this.fit = true;
    this.showHeader = true;

    this.height = null;
    this.scrollX = false;
    this._tableHeight = null; // 备份前一次高度
    this.scrollY = false;
    this.bodyWidth = null;
    this.fixedWidth = null;
    this.rightFixedWidth = null;
    this.tableHeight = null;
    this.headerHeight = 44; // Table Header Height
    this.appendHeight = 0; // Append Slot Height
    this.footerHeight = 44; // Table Footer Height
    this.viewportHeight = null; // Table Height - Scroll Bar Height
    this.bodyHeight = null; // Table Height - Table Header Height
    this.fixedBodyHeight = null; // Table Height - Table Header Height - Scroll Bar Height
    this.gutterWidth = Math.ceil(scrollbar_width_default()());
    this.isMoreData = false; // 控制大数据表格展示方式
    this.bodyfixedWidth = false; // 所有列固定宽度

    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    if (!this.table) {
      throw new Error(Object(lib_locale_["t"])('el.table.noTableLayout'));
    }
    if (!this.store) {
      throw new Error(Object(lib_locale_["t"])('el.table.noStoreLayout'));
    }
  }

  TableLayout.prototype.updateScrollY = function updateScrollY() {
    var height = this.height;
    if (height === null) return false;
    var bodyWrapper = this.table.bodyWrapper;
    if (this.table.$el && bodyWrapper && this.bodyHeight) {
      var body = bodyWrapper.querySelector('.el-table__body');
      var prevScrollY = this.scrollY;
      var scrollY = body.offsetHeight > this.bodyHeight;
      this.scrollY = scrollY;
      if (scrollY) {
        this.updateColumnsWidth();
      }
      return prevScrollY !== scrollY;
    }
    return false;
  };

  TableLayout.prototype.setHeight = function setHeight(value) {
    var _this2 = this;

    var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'height';

    if (external_vue_default.a.prototype.$isServer) return;
    var el = this.table.$el;
    value = parseHeight(value);
    this.height = value;

    if (!el && (value || value === 0)) return external_vue_default.a.nextTick(function () {
      return _this2.setHeight(value, prop);
    });

    if (typeof value === 'number' && !isNaN(value)) {
      el.style[prop] = value + 'px';
      this.updateElsHeight();
    } else if (typeof value === 'string') {
      el.style[prop] = value;
      this.updateElsHeight();
    }
  };

  TableLayout.prototype.setMaxHeight = function setMaxHeight(value) {
    this.setHeight(value, 'max-height');
  };

  TableLayout.prototype.getFlattenColumns = function getFlattenColumns() {
    var flattenColumns = [];
    var columns = this.table.columns;
    columns.forEach(function (column) {
      // 如果是隐藏列就不push到数组中(hideColumn 值来源于xtable-x.js 中columnConfig)
      if (column.hideColumn !== true) {
        if (column.isColumnGroup) {
          flattenColumns.push.apply(flattenColumns, column.columns);
        } else {
          flattenColumns.push(column);
        }
      }
    });
    return flattenColumns;
  };

  TableLayout.prototype.updateElsHeight = function updateElsHeight() {
    var _this3 = this;

    var _this = this;
    if (!this.table.$ready) return external_vue_default.a.nextTick(function () {
      return _this3.updateElsHeight();
    });
    var _table$$refs = this.table.$refs,
        headerWrapper = _table$$refs.headerWrapper,
        appendWrapper = _table$$refs.appendWrapper,
        footerWrapper = _table$$refs.footerWrapper;

    this.appendHeight = appendWrapper ? appendWrapper.offsetHeight : 0;

    if (this.showHeader && !headerWrapper) return;

    // fix issue (https://github.com/ElemeFE/element/pull/16956)
    var headerTrElm = headerWrapper ? headerWrapper.querySelector('.el-table__header .el-table__row') : null;
    var noneHeader = this.headerDisplayNone(headerTrElm);

    var headerHeight = _this.headerHeight = !_this.showHeader ? 0 : headerWrapper.offsetHeight;
    if (_this.showHeader && !noneHeader && headerWrapper.offsetWidth > 0 && (_this.table.columns || []).length > 0 && headerHeight < 2) {
      return external_vue_default.a.nextTick(function () {
        return _this.updateElsHeight();
      });
    }
    var tableHeight = this.tableHeight = this.table.$el.getBoundingClientRect()['height'];
    // #TODO fixed 在计算表格高度时，受滚动条影响会产生this.gutterWidt 差距，临时存储变量保存
    if (!this._tableHeight || Math.abs(this._tableHeight - this.tableHeight) > this.gutterWidth) {
      this._tableHeight = this.tableHeight;
    } else {
      tableHeight = Math.max(this._tableHeight, this.tableHeight);
    }
    var footerHeight = _this.footerHeight = footerWrapper ? footerWrapper.offsetHeight : 0;
    if (_this.height !== null) {
      _this.bodyHeight = tableHeight - headerHeight - footerHeight + (footerWrapper ? 1 : 0);
    }

    _this.fixedBodyHeight = _this.scrollX ? _this.bodyHeight - _this.gutterWidth : _this.bodyHeight;
    // const noData = !(_this.store.states.data && _this.store.states.data.length);
    // 直接获取表格高度
    this.viewportHeight = tableHeight;
    _this.updateScrollY();
    _this.notifyObservers('scrollable');
  };

  TableLayout.prototype.headerDisplayNone = function headerDisplayNone(elm) {
    if (!elm) return true;
    var headerChild = elm;
    while (headerChild.tagName !== 'DIV') {
      if (getComputedStyle(headerChild).display === 'none') {
        return true;
      }
      headerChild = headerChild.parentElement;
    }
    return false;
  };
  // 更新列高度


  TableLayout.prototype.updateColumnsHeight = function updateColumnsHeight(isScroll) {
    // const data  = this.table.data;
    var states = this.store.states;
    var bodyWrapper = this.table.bodyWrapper;
    var isMoreData = states.isMoreData;
    var data = isMoreData ? states.renderData : states.data;
    var _data = isMoreData ? states.virtualData : states._data;
    if (this.table.$el && bodyWrapper) {
      var rows = bodyWrapper.querySelectorAll('.el-table__body .el-table__row');
      for (var i = 0, len = rows.length; i < len; ++i) {
        var rowHeight = this.getCellHeight(rows[i]) + 1;
        var item = data[i];
        var _item = _data[i];
        item.__height = rowHeight;
        _item._height = rowHeight;
        data.splice(i, 1, item);
        _data.splice(i, 1, _item);
      }
      isMoreData && this.table.refreshRenderData();
      if (!isScroll) {
        _data = this.table.handleData(_data);
      }
    }
  };
  // 获取单元格高度


  TableLayout.prototype.getCellHeight = function getCellHeight(row) {
    var cells = row.querySelectorAll('.el-table__cell');
    var heights = [0];
    for (var i = 0, len = cells.length; i < len; ++i) {
      heights.push(cells[i].clientHeight);
    }
    return Math.max.apply(null, heights);
  };

  TableLayout.prototype.getMaxLength = function getMaxLength(arr) {
    var _this4 = this;

    return arr.reduce(function (length, item) {
      if (item) {
        var str = item.toString();
        var char = str.match(/[\u2E80-\u9FFF]/g);
        var charLength = char ? char.length : 0;
        var num = str.match(/\d|\./g);
        var numLength = num ? num.length : 0;
        var otherLength = str.length - charLength - numLength;
        var newLength = charLength * fontRate.CHAR_RATE + numLength * fontRate.NUM_RATE + otherLength * fontRate.OTHER_RATE;
        if (str.includes('\n')) newLength = _this4.getMaxLength(str.split('\n'));
        if (length < newLength) {
          length = newLength;
        }
      }
      return length;
    }, 0);
  };

  TableLayout.prototype.updateColumnsWidth = function updateColumnsWidth() {
    if (external_vue_default.a.prototype.$isServer) return;
    var column = this.table.curCloumn;
    var colData = this.table.data || [];
    var arr = colData.map(function (item) {
      return item && item[column.property];
    });
    var isFit = column.isFit || this.table.isFit;
    if (['selection', 'index', 'single', 'expand'].indexOf(column.type) === -1 && isFit && !column.width) {
      var length = this.getMaxLength(arr);
      var maxOne = Math.max(length, column.label.length * fontRate.CHAR_RATE) * 14 + 20;
      column.width = maxOne;
    }
    var fit = this.fit;
    var bodyWidth = this.table.$el.clientWidth;
    var bodyMinWidth = 0;
    var flattenColumns = this.getFlattenColumns();
    var flexColumns = flattenColumns.filter(function (column) {
      return typeof column.width !== 'number';
    });
    // 判断所有列是否宽度都已设定
    this.bodyfixedWidth = flexColumns.length === 0;
    flattenColumns.forEach(function (column) {
      // Clean those columns whose width changed from flex to unflex
      if (typeof column.width === 'number' && column.realWidth) column.realWidth = null;
    });
    if (flexColumns.length > 0 && fit) {
      flattenColumns.forEach(function (column) {
        bodyMinWidth += column.width || column.minWidth || 80;
      });

      var scrollYWidth = this.scrollY ? this.gutterWidth : 0;
      if (bodyMinWidth <= bodyWidth - scrollYWidth) {
        // DON'T HAVE SCROLL BAR
        this.scrollX = false;

        var totalFlexWidth = bodyWidth - scrollYWidth - bodyMinWidth;

        if (flexColumns.length === 1) {
          flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth;
        } else {
          var allColumnsWidth = flexColumns.reduce(function (prev, column) {
            return prev + (column.minWidth || 80);
          }, 0);
          var flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
          var noneFirstWidth = 0;

          flexColumns.forEach(function (column, index) {
            if (index === 0) return;
            var flexWidth = Math.floor((column.minWidth || 80) * flexWidthPerPixel);
            noneFirstWidth += flexWidth;
            column.realWidth = (column.minWidth || 80) + flexWidth;
          });

          flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
        }
      } else {
        // HAVE HORIZONTAL SCROLL BAR
        this.scrollX = true;
        flexColumns.forEach(function (column) {
          column.realWidth = column.minWidth;
        });
      }

      this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
      this.table.resizeState.width = this.bodyWidth;
    } else {
      flattenColumns.forEach(function (column) {
        if (!column.width && !column.minWidth) {
          column.realWidth = 80;
        } else {
          column.realWidth = column.width || column.minWidth;
        }

        bodyMinWidth += column.realWidth;
      });
      this.scrollX = bodyMinWidth > bodyWidth;

      this.bodyWidth = bodyMinWidth;
    }

    var fixedColumns = this.store.states.fixedColumns;

    if (fixedColumns.length > 0) {
      var fixedWidth = 0;
      fixedColumns.forEach(function (column) {
        fixedWidth += column.realWidth || column.width;
      });

      this.fixedWidth = fixedWidth;
    }

    var rightFixedColumns = this.store.states.rightFixedColumns;
    if (rightFixedColumns.length > 0) {
      var rightFixedWidth = 0;
      rightFixedColumns.forEach(function (column) {
        rightFixedWidth += column.realWidth || column.width;
      });

      this.rightFixedWidth = rightFixedWidth;
    }
    this.notifyObservers('columns');
  };

  TableLayout.prototype.addObserver = function addObserver(observer) {
    this.observers.push(observer);
  };

  TableLayout.prototype.removeObserver = function removeObserver(observer) {
    var index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  };

  TableLayout.prototype.notifyObservers = function notifyObservers(event) {
    var _this5 = this;

    var observers = this.observers;
    observers.forEach(function (observer) {
      switch (event) {
        case 'columns':
          observer.onColumnsChange(_this5);
          break;
        case 'scrollable':
          observer.onScrollableChange(_this5);
          break;
        default:
          throw new Error(Object(lib_locale_["t"])('el.table.layoutNotEvent', { event: event }));
      }
    });
  };

  return TableLayout;
}();

/* harmony default export */ var table_layout = (table_layout_TableLayout);
// EXTERNAL MODULE: external "@/lib/utils/dom"
var dom_ = __webpack_require__(2);

// EXTERNAL MODULE: external "@/lib/tooltip"
var tooltip_ = __webpack_require__(53);
var tooltip_default = /*#__PURE__*/__webpack_require__.n(tooltip_);

// EXTERNAL MODULE: external "async-validator"
var external_async_validator_ = __webpack_require__(55);
var external_async_validator_default = /*#__PURE__*/__webpack_require__.n(external_async_validator_);

// EXTERNAL MODULE: ./src/utils/validator.js
var utils_validator = __webpack_require__(47);

// EXTERNAL MODULE: ./packages/date-picker/src/util/index.js
var util = __webpack_require__(61);

// CONCATENATED MODULE: ./packages/table/src/layout-observer.js
/* harmony default export */ var layout_observer = ({
  created: function created() {
    this.tableLayout.addObserver(this);
  },
  destroyed: function destroyed() {
    this.tableLayout.removeObserver(this);
  },


  computed: {
    tableLayout: function tableLayout() {
      var layout = this.layout;
      if (!layout && this.table) {
        layout = this.table.layout;
      }
      if (!layout) {
        throw new Error('Can not find table layout.');
      }
      return layout;
    }
  },

  mounted: function mounted() {
    this.onColumnsChange(this.tableLayout);
    this.onScrollableChange(this.tableLayout);
  },


  methods: {
    onColumnsChange: function onColumnsChange(_this) {
      var cols = this.$el.querySelectorAll('.el-table_group > span');
      if (!cols.length) return;
      var flattenColumns = this.tableLayout.getFlattenColumns();
      var columnsMap = {};
      flattenColumns.forEach(function (column) {
        columnsMap[column.id] = column;
      });
      for (var i = 0, j = cols.length; i < j; i++) {
        var col = cols[i];
        var name = col.getAttribute('name');
        var column = columnsMap[name];
        if (column) {
          col.style.display = '';
          col.setAttribute('width', column.realWidth || column.width);
          // col.setAttribute('style', 'width:' + column.realWidth || column.width + 'px;');
        } else {
          col.style.display = 'none';
        }
      }
    },
    onScrollableChange: function onScrollableChange(layout) {
      var cols = this.$el.querySelectorAll('colgroup > col[name=gutter]');
      for (var i = 0, j = cols.length; i < j; i++) {
        var col = cols[i];
        col.setAttribute('width', layout.scrollY ? layout.gutterWidth : '0');
      }
      var ths = this.$el.querySelectorAll('th.gutter');
      for (var _i = 0, _j = ths.length; _i < _j; _i++) {
        var th = ths[_i];
        th.style.width = layout.scrollY ? layout.gutterWidth + 'px' : '0';
        th.style.display = layout.scrollY ? '' : 'none';
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/table/src/table-body.js
var table_body_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };











/* harmony default export */ var table_body = ({
  components: {
    ElCheckbox: checkbox_default.a,
    ElTooltip: tooltip_default.a,
    CustomContent: {
      props: {
        data: Object
      },
      render: function render(h) {
        var parent = this.$parent.$parent;
        var index = this.data.index;
        var cellIndex = this.data.index;
        var row = this.data.row;
        var column = this.data.column;
        return parent.renderCustomContent ? parent.renderCustomContent.call(parent._renderProxy, h, { column: column, row: row, index: index, cellIndex: cellIndex }) : '';
      }
    }
  },

  mixins: [layout_observer],

  props: {
    store: {
      required: true
    },
    stripe: Boolean,
    context: {},
    layout: {
      required: true
    },
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    fixed: String,
    rules: [Object, Array, String],
    highlight: Boolean,
    rowHeight: [String],
    hideNoFixedColumn: Boolean
  },

  render: function render(h) {
    var _this = this;

    var expandFlag = this.columns.filter(function (item, index) {
      return item.type === 'expand';
    }).length > 0;
    var isMoreData = this.store.states.isMoreData;
    var rows = isMoreData ? this.store.states.renderData : this.data;
    var columnLen = this.columns.length;
    var tooltipEffect = this.table.tooltipEffect;
    var vNodeContext = this.table.$vnode.context;
    var parentSlot = this._self.$parent.$slots;
    var lastRow = rows[rows.length - 1];
    var lastTrans = 0;
    if (lastRow) {
      lastTrans = parseInt(lastRow.__translateY, 0) + lastRow.__height;
    }
    if (this.store.states.lazy && Object.keys(this.store.states.lazyTreeNodeMap).length) {
      rows = rows.reduce(function (prev, item) {
        prev.push(item);
        var rowKey = _this.store.table.getRowKey(item);
        var parent = _this.store.states.treeData[rowKey];
        if (parent && parent.children) {
          var tmp = [];
          var traverse = function traverse(children) {
            if (!children) return;
            children.forEach(function (key) {
              tmp.push(_this.store.states.lazyTreeNodeMap[key]);
              if (_this.store.states.treeData[key]) {
                traverse(_this.store.states.treeData[key].children);
              }
            });
          };
          traverse(parent.children);
          prev = prev.concat(tmp);
        }
        return prev;
      }, []);
    }
    return h(
      'table',
      {
        'class': 'el-table__body',
        attrs: { cellspacing: '0',
          cellpadding: '0',
          border: '0'
        }
      },
      [h(
        'colgroup',
        { 'class': 'el-table_group' },
        [this._l(this.columns, function (column) {
          return !column.hideColumn ? h('col', {
            attrs: {
              name: column.id,
              width: column.realWidth || column.width
            }
          }) : '';
        })]
      ), h(
        'tbody',
        { 'class': 'el-table__tbody ' + (isMoreData ? 'el-table__more' : '') },
        [this._l(rows, function (row, $index) {
          var $cindex = $index;
          var rowKey = _this.table.rowKey ? _this.getKeyOfRow(row, $cindex) : row.__vkey;
          var treeNode = _this.treeData[rowKey];
          var rowClasses = _this.getRowClass(row, $cindex);
          var columnsLen = _this.columns.length - 1;
          if (treeNode) {
            rowClasses.push('el-table__row--level-' + treeNode.level);
          }
          var tr = h(
            'tr',
            {
              directives: [{
                name: 'show',
                value: treeNode ? treeNode.display : true
              }],
              on: {
                'mouseenter': function mouseenter($event) {
                  return _this.handleMouseEnter($event, row, $index);
                },
                'mouseleave': function mouseleave() {
                  return _this.handleMouseLeave();
                },
                'dblclick': function dblclick($event) {
                  return _this.handleDoubleClick($event, row);
                },
                'click': function click($event) {
                  _this.handleClick($event, row, $cindex, $index);
                },
                'contextmenu': function contextmenu($event) {
                  return _this.handleContextMenu($event, row);
                }
              },

              style: _this.getRowStyle(row, $cindex),
              key: rowKey,

              'class': rowClasses },
            [_this._l(_this.columns, function (column, cellIndex) {
              var _getSpan = _this.getSpan(row, column, $cindex, cellIndex),
                  rowspan = _getSpan.rowspan,
                  colspan = _getSpan.colspan;

              if (!rowspan || !colspan) {
                return '';
              } else {
                var data = {
                  store: _this.store,
                  _self: _this.context || vNodeContext,
                  cellIndex: cellIndex,
                  row: row,
                  column: column,
                  $index: $cindex
                };
                if (cellIndex === _this.firstDefaultColumnIndex && treeNode) {
                  data.treeNode = {
                    hasChildren: treeNode.hasChildren || treeNode.children && treeNode.children.length,
                    expanded: treeNode.expanded,
                    indent: treeNode.level * _this.treeIndent,
                    level: treeNode.level,
                    loaded: treeNode.loaded,
                    _self: _this.context || vNodeContext,
                    rowKey: rowKey
                  };
                }
                var td = h(
                  'td',
                  {
                    // class={[column.id, column.align, column.className || '', columnsHidden[cellIndex] ? 'is-hidden' : '', { 'current-row-edit': column.ctype && this.type === 'edit' }]}
                    style: _this.getCellStyle($cindex, cellIndex, row, column, columnsLen),
                    'class': _this.getCellClass($cindex, cellIndex, row, column),
                    attrs: { rowspan: rowspan,
                      colspan: colspan
                    },
                    on: {
                      'mouseenter': function mouseenter($event) {
                        return _this.handleCellMouseEnter($event, row);
                      },
                      'click': function click($event) {
                        return _this.cellClick($event, row, $cindex, $index, cellIndex);
                      },
                      'contextmenu': function contextmenu($event) {
                        return _this.cellHandleContextMenu($event, row, $cindex, cellIndex);
                      },
                      'mouseleave': _this.handleCellMouseLeave
                    }
                  },
                  [_this.getTableType(h, column, data, cellIndex, $cindex), _this.validateFieldsMessage && _this.index === $cindex ? h(
                    'div',
                    { 'class': 'el-table__validate-msg' },
                    [_this.validateFieldsMessage[column.property] && _this.validateFieldsMessage[column.property][0].message]
                  ) : '', _this.show && _this.$index === $cindex && _this.cellIndex === cellIndex ? h('custom-content', {
                    attrs: { data: { column: column, row: row, index: $cindex, cellIndex: cellIndex } }
                  }) : '']
                );
                return !_this.hideNoFixedColumn ? td : column.fixed === true || column.fixed === 'left' ? td : '';
              }
            })]
          );
          if (expandFlag && _this.store.isRowExpanded(row)) {
            return [tr, h(
              'tr',
              { 'class': 'el-table__row' },
              [h(
                'td',
                {
                  attrs: { colspan: columnLen },
                  'class': 'el-table__expanded-cell' },
                [_this.columns[_this.table.cellIndex ? _this.table.cellIndex : 0].renderExpanded ? _this.columns[_this.table.cellIndex ? _this.table.cellIndex : 0].renderExpanded(h, { row: row, $index: $index, store: _this.store }) : '']
              )]
            )];
          } else {
            return tr;
          }
        }).concat(lastRow && parentSlot.append ? h(
          'div',
          { 'class': 'el-table__append', style: isMoreData ? 'transform: translateY(' + lastTrans + 'px);height: ' + lastRow.__height + 'px;' : '' },
          [parentSlot.append]
        ) : parentSlot.append).concat(h('el-tooltip', {
          attrs: { effect: tooltipEffect, placement: 'top', content: this.tooltipContent },
          ref: 'tooltip' }))]
      )]
    );
  },


  watch: {
    'store.states.index': function storeStatesIndex(newVal, oldVal) {
      this.type = 'edit';
      this.index = newVal;
    }
  },

  computed: {
    table: function table() {
      return this.$parent;
    },
    data: function data() {
      return this.store.states.data;
    },
    treeData: function treeData() {
      return this.store.states.treeData;
    },
    columnsCount: function columnsCount() {
      return this.store.states.columns.length;
    },
    leftFixedCount: function leftFixedCount() {
      return this.store.states.fixedColumns.length;
    },
    rightFixedCount: function rightFixedCount() {
      return this.store.states.rightFixedColumns.length;
    },
    columns: function columns() {
      return this.store.states.columns;
    },
    treeIndent: function treeIndent() {
      return this.store.states.indent;
    },
    firstDefaultColumnIndex: function firstDefaultColumnIndex() {
      for (var index = 0; index < this.columns.length; index++) {
        if (this.columns[index].type === 'default') {
          return index;
        }
      }
      return 0;
    }
  },

  data: function data() {
    return {
      tooltipContent: '',
      type: 'default',
      index: null,
      $index: null,
      validateState: 'success',
      validateMessage: null,
      validateFieldsMessage: null,
      show: false
    };
  },
  created: function created() {
    this.activateTooltip = Object(external_throttle_debounce_["debounce"])(50, function (tooltip) {
      return tooltip.handleShowPopper();
    });
  },

  methods: {
    getTableType: function getTableType(h, column, data, cellIndex, $index) {
      var _this2 = this;

      var columnsHidden = this.columns.map(function (column, index) {
        return _this2.isColumnHidden(index);
      });
      return this.type === 'defalut' ? column.renderCell.call(this._renderProxy, h, data, columnsHidden[cellIndex]) : this.type === 'edit' && this.index === $index && column.ctype ? column.editRenderCell.renderCell.call(this._renderProxy, h, data, columnsHidden[cellIndex]) : column.renderCell.call(this._renderProxy, h, data, columnsHidden[cellIndex], cellIndex);
    },
    getKeyOfRow: function getKeyOfRow(row, index) {
      var rowKey = this.table.rowKey;
      if (rowKey) {
        return getRowIdentity(row, rowKey);
      }
      return index;
    },
    isColumnHidden: function isColumnHidden(index) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (this.fixed === 'right') {
        return index < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    },
    getSpan: function getSpan(row, column, rowIndex, columnIndex) {
      var rowspan = 1;
      var colspan = 1;

      var fn = this.table.spanMethod;
      if (typeof fn === 'function') {
        var result = fn({
          row: row,
          column: column,
          rowIndex: rowIndex,
          columnIndex: columnIndex
        });

        if (Array.isArray(result)) {
          rowspan = result[0];
          colspan = result[1];
        } else if ((typeof result === 'undefined' ? 'undefined' : table_body_typeof(result)) === 'object') {
          rowspan = result.rowspan;
          colspan = result.colspan;
        }
      }

      return {
        rowspan: rowspan,
        colspan: colspan
      };
    },
    getBodyContainerStyle: function getBodyContainerStyle(record) {
      return {
        transform: 'translateY(' + record.__translateY + ')',
        height: record.__height + 'px'
      };
    },
    handleMouseEnter: function handleMouseEnter(event, row, index) {
      var ev = event || window.event;
      ev.stopPropagation();
      this.store.states.hoverRow = index;
    },
    getRowStyle: function getRowStyle(row, rowIndex) {
      var styles = this.store.states.isMoreData ? this.getBodyContainerStyle(row) : {};
      var rowStyle = this.table.rowStyle;
      if (typeof rowStyle === 'function') {
        var rowstyle = rowStyle.call(null, {
          row: row,
          rowIndex: rowIndex
        });
        for (var key in rowstyle) {
          if (rowstyle.hasOwnProperty(key)) {
            styles.key = rowstyle[key];
          }
        }
      }
      return styles;
    },
    getRowClass: function getRowClass(row, rowIndex) {
      var classes = ['el-table__row'];
      var index = classes.indexOf('current-row');
      // if (this.highlight && row === this.store.states.currentRow) {
      //   classes.push('current-row');
      // }
      if (this.highlight && this.store.isSelected(row) && index === -1) {
        classes.push('current-row');
      }

      if (this.store.states.hoverRow === rowIndex) {
        classes.push('hover-row');
      }
      if (this.stripe && rowIndex % 2 === 1) {
        classes.push('el-table__row--striped');
      }
      var rowClassName = this.table.rowClassName;
      if (typeof rowClassName === 'string') {
        classes.push(rowClassName);
      } else if (typeof rowClassName === 'function') {
        classes.push(rowClassName.call(null, row, rowIndex) || '');
      }

      if (this.store.states.expandRows.indexOf(row) > -1) {
        classes.push('expanded');
      }
      return classes;
    },
    getCellStyle: function getCellStyle(rowIndex, columnIndex, row, column, columnsLen) {
      var gutterWidth = this.layout.gutterWidth || 0;
      var w = column.realWidth || column.width;
      w -= columnsLen === columnIndex ? gutterWidth : 0;
      var widthString = this.store.states.isMoreData || this.leftFixedCount || this.rightFixedCount ? 'width: ' + w + 'px; min-width: ' + w + 'px' : '';
      var styles = [widthString];
      var cellStyle = this.table.cellStyle;
      if (typeof cellStyle === 'function') {
        styles.push(cellStyle.call(null, { rowIndex: rowIndex, columnIndex: columnIndex, row: row, column: column }));
      }
      return styles.join(';');
    },
    getCellClass: function getCellClass(rowIndex, columnIndex, row, column) {
      var classes = [column.id, column.align, column.className];
      if (this.isColumnHidden(columnIndex)) {
        classes.push('is-hidden');
      }

      var cellClassName = this.table.cellClassName;
      if (typeof cellClassName === 'string') {
        classes.push(cellClassName);
      } else if (typeof cellClassName === 'function') {
        classes.push(cellClassName.call(null, {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        }));
      }
      // 用于表格右键隐藏控制
      if (column.hideColumn) {
        classes.push('el-table__body__column__hidden');
      }
      classes.push('el-table__cell');

      return classes.join(' ');
    },
    handleCellMouseEnter: function handleCellMouseEnter(event, row) {
      var table = this.table;
      var cell = getCell(event);
      if (cell) {
        var column = getColumnByCell(table, cell);
        var hoverState = table.hoverState = { cell: cell, column: column, row: row };
        table.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event);
      }

      // 判断是否text-overflow, 如果是就显示tooltip
      var cellChild = event.target.querySelector('.cell');

      if (Object(dom_["hasClass"])(cellChild, 'el-tooltip')) {
        var tooltip = this.$refs.tooltip;
        // TODO 会引起整个 Table 的重新渲染，需要优化
        this.tooltipContent = cell.innerText || cell.textContent;
        tooltip.referenceElm = cell;
        tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none');
        tooltip.doDestroy();
        if (event.currentTarget) {
          var span = event.currentTarget.getElementsByClassName('cell')[0];
          var paddingLeft = this.getStyle(span, 'paddingLeft');
          var paddingRight = this.getStyle(span, 'paddingRight');
          var realWidth = 0;
          paddingLeft = paddingLeft ? paddingLeft.substr(0, paddingLeft.indexOf('px')) : 0;
          paddingRight = paddingRight ? paddingRight.substr(0, paddingRight.indexOf('px')) : 0;
          realWidth = span.clientWidth - paddingLeft - paddingRight;
          if (realWidth < this.getTextWidth(this.tooltipContent, event.currentTarget)) {
            tooltip.setExpectedState(true);
            this.activateTooltip(tooltip);
          }
        }
      }
    },

    // 获取作用在元素上的样式
    getStyle: function getStyle(obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      } else {
        return document.defaultView.getComputedStyle(obj, null)[attr];
      }
    },

    /**
     *@param {获取文本内容长度} str
     */
    getTextWidth: function getTextWidth(str, target) {
      // 通过创建临时span来获取文本内容长度
      var width = 0;
      var html = document.createElement('span');
      html.innerText = str;
      html.visibility = 'hidden';
      html.className = '_tempgetTextWidth';
      // 不换行才可以获取真实宽度
      html.style.whiteSpace = 'nowrap';
      target.appendChild(html);
      width = document.getElementsByClassName('_tempgetTextWidth')[0].offsetWidth;
      target.removeChild(html);
      return width;
    },
    handleMouseLeave: function handleMouseLeave() {
      // this.index = null;
      this.store.states.hoverRow = null;
    },
    handleCellMouseLeave: function handleCellMouseLeave(event) {
      this.show = false;
      var tooltip = this.$refs.tooltip;
      if (tooltip) {
        tooltip.setExpectedState(false);
        tooltip.handleClosePopper();
      }
      var cell = getCell(event);
      if (!cell) return;

      var oldHoverState = this.table.hoverState;
      if (oldHoverState) {
        this.table.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event);
      }
    },
    cellHandleContextMenu: function cellHandleContextMenu(event, row, index, cellIndex) {
      this.show = false;
      this.cellIndex = cellIndex;
      this.$index = index;
      if (this.table.renderCustomContent) {
        event.stopPropagation();
        event.preventDefault();
        this.show = true;
      }
      this.handleEvent(event, row, 'cellcontextmenu');
    },
    handleContextMenu: function handleContextMenu(event, row) {
      this.handleEvent(event, row, 'contextmenu');
    },
    handleDoubleClick: function handleDoubleClick(event, row) {
      this.handleEvent(event, row, 'dblclick');
    },
    handleClick: function handleClick(event, row, $index, index, isProp) {
      var ev = event || window.event;
      ev.stopPropagation();
      var states = this.store.states;
      var oldRow = states.currentEditRow || states.currentRow;
      var oldIndex = states.index;
      var selected = !row.__selected;
      if (oldRow && oldRow.__vkey !== row.__vkey) {
        if (!this.validate(oldRow)) {
          // this.type = 'default';
          this.changeCurrent(row, oldRow, oldIndex, selected, isProp);
          this.table.setCurrentRow(oldRow);
          states.currentEditRow = oldRow;
          this.index = oldIndex;
          // this.type = 'edit';
          return;
        }
      }
      this.changeCurrent(row, oldRow, index, selected, isProp);
      // this.type = 'edit';
      states.currentEditRow = row;
      this.handleEvent(event, row, 'click', index);
      if (this.store.isMoreData) {
        this.table.refreshRenderData();
      }
    },
    changeCurrent: function changeCurrent(row, oldRow, index, isCurrent, isProp) {
      this.store.commit('setCheckIndex', row, index);
      this.store.states.index = index;
      this.store.states.currentRow = row;
      this.table.$emit('current-change', row, oldRow);
      try {
        this.$parent.$parent.selectionType === 'checkbox' && !isProp && this.store.toggleRowSelection(row, isCurrent);
      } catch (e) {}
    },
    cellClick: function cellClick(event, row, $index, index, cellIndex) {
      var ev = event || window.event;
      if (event.currentTarget.className.indexOf('el-table__expand-column') !== -1) {
        this.table.cellIndex = cellIndex;
      }
      ev.stopPropagation();
      // this.index = index;
      this.handleClick(event, row, $index, index, true);
    },
    handleEvent: function handleEvent(event, row, name, index) {
      var table = this.table;
      var cell = getCell(event);
      var column = void 0;
      if (cell) {
        column = getColumnByCell(table, cell);
        if (column) {
          table.$emit('cell-' + name, row, column, cell, event);
        }
      }
      table.$emit('row-' + name, row, event, column, index);
    },
    handleExpandClick: function handleExpandClick(row) {
      this.store.commit('toggleRowExpanded', row);
    },

    getRule: function getRule(str) {
      for (var key in utils_validator["a" /* validators */]) {
        if (key === str) {
          return utils_validator["a" /* validators */][key];
        }
      }
    },
    /**
     *
     * @param {*} row
     * @param {*} callback
     * @param {*} flag  是否需要在处理当前行的编辑状态
     */
    validate: function validate(row, callback, flag) {
      var _this3 = this;

      // 融合table 上的rules和column上的rules
      var tableRules = this.store.states.rules;
      var rules = {};
      for (var i = 0; i < this.columns.length; i++) {
        var element = this.columns[i];
        // 没有属性名退出
        if (!element.property) {
          continue;
        }
        var type = table_body_typeof(element.rules);
        var selfRules = type !== 'string' ? element.rules : this.getRule(element.rules);
        var tableRule = tableRules ? tableRules[element.property] : [];
        var tmpRule = [].concat(selfRules || tableRule || []);

        if (tmpRule.length > 0) {
          var tableValue = element.property;
          // 如果校验类型（type） 是date 且数据不是date 类型时，对数据进行转换校验
          if (row) {
            for (var _i = 0; _i < tmpRule.length; _i++) {
              if (tmpRule[_i].type === 'date' && Object(util["a" /* isDate */])(row[tableValue]) && typeof row[tableValue] === 'string') {
                row[tableValue] = new Date(row[tableValue]);
                break;
              }
            }
          }
          rules[tableValue] = tmpRule;
        }
      }
      if (JSON.stringify(rules) === '{}' || rules.length === 0) {
        if (callback) {
          // 增加返回值 20191031
          callback(null, true);
        }
        return true;
      }
      if (!this.store.states.currentRow) {
        if (callback) {
          // 增加返回值 20191031
          callback(null, true);
        }
        return true;
      }
      var validator = new external_async_validator_default.a(rules);
      var model = row;
      var result = true;
      validator.validate(model, { firstFields: true }, function (errors, fields) {
        _this3.validateState = !errors ? 'success' : 'error';
        _this3.validateMessage = errors ? errors[0].message : '';
        _this3.validateFieldsMessage = fields ? fields : '';
        if (_this3.validateState === 'success') {
          if (flag) {
            _this3.type = 'default';
          }
          if (callback) {
            callback(fields);
          }
          result = true;
        } else {
          _this3.type = 'edit';
          _this3.index = row.__vkey;
          if (callback) {
            callback(fields);
          }
          result = false;
        }
      });
      return result;
    },

    /**
     * 强制刷新表格的列元素
     * column 中包括columnId(单元格的td 的class 名称)，separator（分隔符）,dataCode（数据字典项）
     */
    forceUpdate: function forceUpdate(column) {
      var cell = this.$el.getElementsByClassName(column.columnId);
      var dopmClass = '';
      for (var i = 0; i < cell.length; i++) {
        var element = cell[i];
        // 获取未转义的cell的值
        var value = element.innerText && element.innerText.trim();
        if (!yufp.lookup) {
          continue;
        }
        // 转义对应的编码
        if (value instanceof Array) {
          value = yufp.lookup.convertMultiKey(column.dataCode, value.join(','));
        } else if (typeof value === 'string' && value.indexOf(column.separator) > -1) {
          value = yufp.lookup.convertMultiKey(column.dataCode, value, column.separator);
        } else {
          value = yufp.lookup.convertKey(column.dataCode, value);
        }
        // 动态获取element 的class
        var dom = element.getElementsByClassName('cell');
        if (dom) {
          dopmClass = dom[0].getAttribute('class');
        }
        // 重新显示单元格中内容
        element.innerHTML = '<div class="' + dopmClass + '">' + value + '</div>';
      }
    }
  }
});
// EXTERNAL MODULE: external "@/lib/tag"
var tag_ = __webpack_require__(46);
var tag_default = /*#__PURE__*/__webpack_require__.n(tag_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/filter-panel.vue?vue&type=template&id=7f2c919f&
var filter_panelvue_type_template_id_7f2c919f_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "el-zoom-in-top" } }, [
    _vm.multiple
      ? _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.showPopper,
                expression: "showPopper"
              }
            ],
            staticClass: "el-table-filter"
          },
          [
            _c(
              "div",
              { staticClass: "el-table-filter__content" },
              [
                _c(
                  "el-checkbox-group",
                  {
                    staticClass: "el-table-filter__checkbox-group",
                    model: {
                      value: _vm.filteredValue,
                      callback: function($$v) {
                        _vm.filteredValue = $$v
                      },
                      expression: "filteredValue"
                    }
                  },
                  _vm._l(_vm.filters, function(filter) {
                    return _c(
                      "el-checkbox",
                      { key: filter.value, attrs: { label: filter.value } },
                      [_vm._v(_vm._s(filter.text))]
                    )
                  }),
                  1
                )
              ],
              1
            ),
            _c("div", { staticClass: "el-table-filter__bottom" }, [
              _c(
                "button",
                {
                  class: { "is-disabled": _vm.filteredValue.length === 0 },
                  attrs: { disabled: _vm.filteredValue.length === 0 },
                  on: { click: _vm.handleConfirm }
                },
                [_vm._v(_vm._s(_vm.t("el.table.confirmFilter")))]
              ),
              _c("button", { on: { click: _vm.handleReset } }, [
                _vm._v(_vm._s(_vm.t("el.table.resetFilter")))
              ])
            ])
          ]
        )
      : _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.showPopper,
                expression: "showPopper"
              }
            ],
            staticClass: "el-table-filter"
          },
          [
            _c(
              "ul",
              { staticClass: "el-table-filter__list" },
              [
                _c(
                  "li",
                  {
                    staticClass: "el-table-filter__list-item",
                    class: {
                      "is-active":
                        _vm.filterValue === undefined ||
                        _vm.filterValue === null
                    },
                    on: {
                      click: function($event) {
                        return _vm.handleSelect(null)
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.t("el.table.clearFilter")))]
                ),
                _vm._l(_vm.filters, function(filter) {
                  return _c(
                    "li",
                    {
                      key: filter.value,
                      staticClass: "el-table-filter__list-item",
                      class: { "is-active": _vm.isActive(filter) },
                      attrs: { label: filter.value },
                      on: {
                        click: function($event) {
                          return _vm.handleSelect(filter.value)
                        }
                      }
                    },
                    [_vm._v(_vm._s(filter.text))]
                  )
                })
              ],
              2
            )
          ]
        )
  ])
}
var filter_panelvue_type_template_id_7f2c919f_staticRenderFns = []
filter_panelvue_type_template_id_7f2c919f_render._withStripped = true


// CONCATENATED MODULE: ./packages/table/src/filter-panel.vue?vue&type=template&id=7f2c919f&

// EXTERNAL MODULE: external "@/lib/utils/vue-popper"
var vue_popper_ = __webpack_require__(7);
var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

// EXTERNAL MODULE: external "@/lib/utils/popup"
var popup_ = __webpack_require__(27);

// EXTERNAL MODULE: external "@/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(9);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// CONCATENATED MODULE: ./packages/table/src/dropdown.js

var dropdowns = [];
var dropClick = function dropClick(event) {
  dropdowns.forEach(function (dropdown) {
    var target = event.target;
    if (!dropdown || !dropdown.$el) return;
    if (target === dropdown.$el || dropdown.$el.contains(target)) {
      return;
    }
    dropdown.handleOutsideClick && dropdown.handleOutsideClick(event);
  });
};
!external_vue_default.a.prototype.$isServer && document.addEventListener('click', dropClick);

/* harmony default export */ var dropdown = ({
  open: function open(instance) {
    if (instance) {
      dropdowns.push(instance);
    }
  },
  close: function close(instance) {
    var index = dropdowns.indexOf(instance);
    if (index !== -1) {
      dropdowns.splice(instance, 1);
    }
  },


  dropClick: dropClick
});
// EXTERNAL MODULE: external "@/lib/checkbox-group"
var checkbox_group_ = __webpack_require__(76);
var checkbox_group_default = /*#__PURE__*/__webpack_require__.n(checkbox_group_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/filter-panel.vue?vue&type=script&lang=js&
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
//
//
//
//
//
//
//
//









/* harmony default export */ var filter_panelvue_type_script_lang_js_ = ({
  name: 'ElTableFilterPanel',
  xtype: 'YuTableFilterPanel',

  mixins: [vue_popper_default.a, locale_default.a],

  directives: {
    Clickoutside: clickoutside_default.a
  },

  components: {
    ElCheckbox: checkbox_default.a,
    ElCheckboxGroup: checkbox_group_default.a
  },

  props: {
    placement: {
      type: String,
      default: 'bottom-end'
    }
  },

  customRender: function customRender(h) {
    return h(
      'div',
      { 'class': 'el-table-filter' },
      [h('div', { 'class': 'el-table-filter__content' }), h(
        'div',
        { 'class': 'el-table-filter__bottom' },
        [h(
          'button',
          {
            on: {
              'click': this.handleConfirm
            }
          },
          [this.t('el.table.confirmFilter')]
        ), h(
          'button',
          {
            on: {
              'click': this.handleReset
            }
          },
          [this.t('el.table.resetFilter')]
        )]
      )]
    );
  },


  methods: {
    isActive: function isActive(filter) {
      return filter.value === this.filterValue;
    },
    handleOutsideClick: function handleOutsideClick() {
      this.showPopper = false;
    },
    handleConfirm: function handleConfirm() {
      this.confirmFilter(this.filteredValue);
      this.handleOutsideClick();
    },
    handleReset: function handleReset() {
      this.filteredValue = [];
      this.confirmFilter(this.filteredValue);
      this.handleOutsideClick();
    },
    handleSelect: function handleSelect(filterValue) {
      this.filterValue = filterValue;

      if (typeof filterValue !== 'undefined' && filterValue !== null) {
        this.confirmFilter(this.filteredValue);
      } else {
        this.confirmFilter([]);
      }

      this.handleOutsideClick();
    },
    confirmFilter: function confirmFilter(filteredValue) {
      this.table.store.commit('filterChange', {
        column: this.column,
        values: filteredValue
      });
    }
  },

  data: function data() {
    return {
      table: null,
      cell: null,
      column: null
    };
  },


  computed: {
    filters: function filters() {
      return this.column && this.column.filters;
    },


    filterValue: {
      get: function get() {
        return (this.column.filteredValue || [])[0];
      },
      set: function set(value) {
        if (this.filteredValue) {
          if (typeof value !== 'undefined' && value !== null) {
            this.filteredValue.splice(0, 1, value);
          } else {
            this.filteredValue.splice(0, 1);
          }
        }
      }
    },

    filteredValue: {
      get: function get() {
        if (this.column) {
          return this.column.filteredValue || [];
        }
        return [];
      },
      set: function set(value) {
        if (this.column) {
          this.column.filteredValue = value;
        }
      }
    },

    multiple: function multiple() {
      if (this.column) {
        return this.column.filterMultiple;
      }
      return true;
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.popperElm = this.$el;
    this.referenceElm = this.cell;
    this.table.bodyWrapper.addEventListener('scroll', function () {
      _this.updatePopper();
    });

    this.unwatch = this.$watch('showPopper', function (value) {
      if (_this.column) _this.column.filterOpened = value;
      if (value) {
        dropdown.open(_this);
      } else {
        dropdown.close(_this);
      }
    });
  },
  destroyed: function destroyed() {
    var _this2 = this;

    this.table.bodyWrapper.removeEventListener('scroll', function () {
      _this2.updatePopper();
    });
    document.removeEventListener('click', dropdown.dropClick);
    this.unwatch();
  },

  watch: {
    showPopper: function showPopper(val) {
      if (val === true && parseInt(this.popperJS._popper.style.zIndex, 10) < popup_["PopupManager"].zIndex) {
        this.popperJS._popper.style.zIndex = popup_["PopupManager"].nextZIndex();
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/table/src/filter-panel.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_filter_panelvue_type_script_lang_js_ = (filter_panelvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/table/src/filter-panel.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_filter_panelvue_type_script_lang_js_,
  filter_panelvue_type_template_id_7f2c919f_render,
  filter_panelvue_type_template_id_7f2c919f_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/table/src/filter-panel.vue"
/* harmony default export */ var filter_panel = (component.exports);
// CONCATENATED MODULE: ./packages/table/src/table-header.js







var getAllColumns = function getAllColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.children) {
      result.push(column);
      result.push.apply(result, getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

var convertToRows = function convertToRows(originColumns) {
  var maxLevel = 1;
  var traverse = function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children) {
      var colSpan = 0;
      column.children.forEach(function (subColumn) {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach(function (column) {
    column.level = 1;
    traverse(column);
  });

  var rows = [];
  for (var i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  var allColumns = getAllColumns(originColumns);

  allColumns.forEach(function (column) {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });

  return rows;
};

/* harmony default export */ var table_header = ({
  name: 'ElTableHeader',
  xtype: 'YuTableHeader',

  mixins: [layout_observer],

  render: function render(h) {
    var _this = this;

    var originColumns = this.store.states.originColumns;
    var columnRows = convertToRows(originColumns, this.columns);
    var pnodeContext = this.$parent.$vnode.context;
    return h(
      'table',
      {
        'class': 'el-table__header',
        attrs: { cellspacing: '0',
          cellpadding: '0',
          border: '0' }
      },
      [h(
        'colgroup',
        { 'class': 'el-table_group' },
        [this._l(this.columns, function (column) {
          return h('col', {
            attrs: {
              name: column.id,
              width: column.realWidth || column.width
            }
          });
        }), !this.fixed && this.layout.gutterWidth && this.layout.scrollY ? h('col', {
          attrs: { name: 'gutter', width: this.layout.scrollY ? this.layout.gutterWidth : '' }
        }) : '']
      ), h(
        'thead',
        { 'class': 'el-table__thead' },
        [this._l(columnRows, function (columns, rowIndex) {
          return h(
            'tr',
            {
              'class': _this.getHeaderRowClass(rowIndex)
            },
            [_this._l(columns, function (column, cellIndex) {
              return (
                // width={ (column.realWidth || column.width)}
                // style={ this.getHeaderCellStyle(rowIndex, cellIndex, columns, column) }
                h(
                  'th',
                  {
                    attrs: {
                      colspan: column.colSpan,
                      rowspan: column.rowSpan
                    },
                    on: {
                      'mousemove': function mousemove($event) {
                        return _this.handleMouseMove($event, column);
                      },
                      'mouseout': _this.handleMouseOut,
                      'mousedown': function mousedown($event) {
                        return _this.handleMouseDown($event, column);
                      },
                      'click': function click($event) {
                        return _this.handleHeaderClick($event, column);
                      },
                      'contextmenu': function contextmenu($event) {
                        return _this.handleHeaderContextMenu($event, column);
                      }
                    },

                    style: _this.getHeaderCellStyle(rowIndex, cellIndex, columns, column, 'flag'),
                    'class': _this.getHeaderCellClass(rowIndex, cellIndex, columns, column) },
                  [h(
                    'div',
                    {
                      'class': ['cell', column.filteredValue && column.filteredValue.length > 0 ? 'highlight' : '', column.labelClassName],
                      style: _this.getHeaderCellStyle(rowIndex, cellIndex, columns, column) },
                    [column.renderHeader ? column.renderHeader.call(_this._renderProxy, h, { column: column, $index: cellIndex, store: _this.store, _self: pnodeContext }) : column.label, column.sortable ? h(
                      'span',
                      { 'class': 'caret-wrapper', on: {
                          'click': function click($event) {
                            return _this.handleSortClick($event, column);
                          }
                        }
                      },
                      [h('i', { 'class': 'sort-caret ascending', on: {
                          'click': function click($event) {
                            return _this.handleSortClick($event, column, 'ascending');
                          }
                        }
                      }), h('i', { 'class': 'sort-caret descending', on: {
                          'click': function click($event) {
                            return _this.handleSortClick($event, column, 'descending');
                          }
                        }
                      })]
                    ) : '', column.filterable ? h(
                      'span',
                      { 'class': 'el-table__column-filter-trigger', on: {
                          'click': function click($event) {
                            return _this.handleFilterClick($event, column);
                          }
                        }
                      },
                      [h('i', { 'class': ['el-icon-arrow-down', column.filterOpened ? 'el-icon-arrow-up' : ''] })]
                    ) : '']
                  )]
                )
              );
            }), !_this.fixed && _this.layout.gutterWidth && _this.layout.scrollY ? h('th', { 'class': 'gutter', style: { width: _this.layout.scrollY ? _this.layout.gutterWidth + 'px' : '0' } }) : '']
          );
        })]
      )]
    );
  },


  props: {
    fixed: String,
    store: {
      required: true
    },
    layout: {
      required: true
    },
    border: Boolean,
    defaultSort: {
      type: Object,
      default: function _default() {
        return {
          prop: '',
          order: ''
        };
      }
    }
  },

  components: {
    ElCheckbox: checkbox_default.a,
    ElTag: tag_default.a
  },

  computed: {
    table: function table() {
      return this.$parent;
    },
    isAllSelected: function isAllSelected() {
      return this.store.states.isAllSelected;
    },
    columnsCount: function columnsCount() {
      return this.store.states.columns.length;
    },
    leftFixedCount: function leftFixedCount() {
      return this.store.states.fixedColumns.length;
    },
    rightFixedCount: function rightFixedCount() {
      return this.store.states.rightFixedColumns.length;
    },
    columns: function columns() {
      return this.store.states.columns;
    }
  },

  created: function created() {
    this.filterPanels = {};
  },
  mounted: function mounted() {
    var _this2 = this;

    if (this.defaultSort.prop) {
      var states = this.store.states;
      states.sortProp = this.defaultSort.prop;
      states.sortOrder = this.defaultSort.order || 'ascending';
      this.$nextTick(function () {
        for (var i = 0, length = _this2.columns.length; i < length; i++) {
          var column = _this2.columns[i];
          if (column.property === states.sortProp) {
            column.order = states.sortOrder;
            states.sortingColumn = column;
            break;
          }
        }

        if (states.sortingColumn) {
          _this2.store.commit('changeSortCondition');
        }
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    var panels = this.filterPanels;
    for (var prop in panels) {
      if (panels.hasOwnProperty(prop) && panels[prop]) {
        panels[prop].$destroy(true);
      }
    }
  },


  methods: {
    getGroupCellWidth: function getGroupCellWidth(column) {
      return 'width:' + ((column.realWidth || column.width) - 1) + 'px';
    },
    isCellHidden: function isCellHidden(index, columns) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (this.fixed === 'right') {
        var before = 0;
        for (var i = 0; i < index; i++) {
          before += columns[i].colSpan;
        }
        return before < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    },
    getHeaderRowStyle: function getHeaderRowStyle(rowIndex) {
      var headerRowStyle = this.table.headerRowStyle;
      if (typeof headerRowStyle === 'function') {
        return headerRowStyle.call(null, { rowIndex: rowIndex });
      }
      return headerRowStyle;
    },
    getHeaderRowClass: function getHeaderRowClass(rowIndex) {
      var classes = ['el-table__row'];

      var headerRowClassName = this.table.headerRowClassName;
      if (typeof headerRowClassName === 'string') {
        classes.push(headerRowClassName);
      } else if (typeof headerRowClassName === 'function') {
        classes.push(headerRowClassName.call(null, { rowIndex: rowIndex }));
      }

      return classes.join(' ');
    },
    getHeaderCellStyle: function getHeaderCellStyle(rowIndex, columnIndex, row, column, flag) {
      var styles = [];
      // 如果是th标签的style就不需要获取width
      if (!flag) {
        styles.push(this.getGroupCellWidth(column));
      }
      var headerRowStyle = this.getHeaderRowStyle(rowIndex);
      // 遍历headerRowStyle中的样式
      for (var key in headerRowStyle) {
        styles.push(key + ':' + headerRowStyle[key]);
      }
      // 获取headerCellStyle中的样式，如果含有与headerRowStyle中相同的样式属性，会覆盖headerRowStyle的
      var headerCellStyle = this.table.headerCellStyle;
      if (typeof headerCellStyle === 'function') {
        headerCellStyle = headerCellStyle.call(null, {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        });
      }
      for (var _key in headerCellStyle) {
        styles.push(_key + ':' + headerCellStyle[_key]);
      }
      return styles.join(';');
    },
    getHeaderCellClass: function getHeaderCellClass(rowIndex, columnIndex, row, column) {
      var classes = ['el-table__th', column.id, column.order, column.headerAlign, column.className, column.labelClassName];

      if (rowIndex === 0 && this.isCellHidden(columnIndex, row)) {
        classes.push('is-hidden');
      }

      if (!column.children) {
        classes.push('is-leaf');
      }

      if (column.sortable) {
        classes.push('is-sortable');
      }

      var headerCellClassName = this.table.headerCellClassName;
      if (typeof headerCellClassName === 'string') {
        classes.push(headerCellClassName);
      } else if (typeof headerCellClassName === 'function') {
        classes.push(headerCellClassName.call(null, {
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          row: row,
          column: column
        }));
      }
      // 表格右键隐藏控制表头
      if (column.hideColumn) {
        classes.push('el-table__header__column__hidden');
      }
      return classes.join(' ');
    },
    toggleAllSelection: function toggleAllSelection() {
      this.store.commit('toggleAllSelection');
    },
    handleFilterClick: function handleFilterClick(event, column) {
      event.stopPropagation();
      var target = event.target;
      var cell = target.tagName === 'TH' ? target : target.parentNode;
      if (Object(dom_["hasClass"])(cell, 'noclick')) return;
      cell = cell.querySelector('.el-table__column-filter-trigger') || cell;
      var table = this.$parent;

      var filterPanel = this.filterPanels[column.id];

      if (filterPanel && column.filterOpened) {
        filterPanel.showPopper = false;
        return;
      }

      if (!filterPanel) {
        filterPanel = new external_vue_default.a(filter_panel);
        this.filterPanels[column.id] = filterPanel;
        if (column.filterPlacement) {
          filterPanel.placement = column.filterPlacement;
        }
        filterPanel.table = table;
        filterPanel.cell = cell;
        filterPanel.column = column;
        !this.$isServer && filterPanel.$mount(document.createElement('div'));
      }

      setTimeout(function () {
        filterPanel.showPopper = true;
      }, 16);
    },
    handleHeaderClick: function handleHeaderClick(event, column) {
      // 增加自动排序功能处理 20191018 liujie1
      if (this.store.states.autoSortable) {
        for (var i = 0; i < this.columns.length; i++) {
          var element = this.columns[i];
          if (element.property && element.property === column.property) {
            column.sortable = true;
          } else {
            if (element.property) {
              element.sortable = false;
            }
          }
        }
      }
      if (!column.filters && column.sortable) {
        this.handleSortClick(event, column);
      } else if (column.filters && !column.sortable) {
        this.handleFilterClick(event, column);
      }

      this.$parent.$emit('header-click', column, event);
    },
    handleHeaderContextMenu: function handleHeaderContextMenu(event, column) {
      this.$parent.$emit('header-contextmenu', column, event);
    },
    handleMouseDown: function handleMouseDown(event, column) {
      var _this3 = this;

      if (this.$isServer) return;
      if (column.children && column.children.length > 0) return;
      /* istanbul ignore if */
      if (this.draggingColumn && this.border) {
        this.dragging = true;

        this.$parent.resizeProxyVisible = true;

        var table = this.$parent;
        var tableEl = table.$el;
        var tableLeft = tableEl.getBoundingClientRect().left;
        var columnEl = this.$el.querySelector('th.' + column.id);
        var columnRect = columnEl.getBoundingClientRect();
        var minLeft = columnRect.left - tableLeft + 30;

        Object(dom_["addClass"])(columnEl, 'noclick');

        this.dragState = {
          startMouseLeft: event.clientX,
          startLeft: columnRect.right - tableLeft,
          startColumnLeft: columnRect.left - tableLeft,
          tableLeft: tableLeft
        };

        var resizeProxy = table.$refs.resizeProxy;
        resizeProxy.style.left = this.dragState.startLeft + 'px';

        document.onselectstart = function () {
          return false;
        };
        document.ondragstart = function () {
          return false;
        };

        var handleMouseMove = function handleMouseMove(event) {
          var deltaLeft = event.clientX - _this3.dragState.startMouseLeft;
          var proxyLeft = _this3.dragState.startLeft + deltaLeft;

          resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
        };

        var handleMouseUp = function handleMouseUp() {
          if (_this3.dragging) {
            var _dragState = _this3.dragState,
                startColumnLeft = _dragState.startColumnLeft,
                startLeft = _dragState.startLeft;

            var finalLeft = parseInt(resizeProxy.style.left, 10);
            var columnWidth = finalLeft - startColumnLeft;
            column.width = column.realWidth = columnWidth;
            table.$emit('header-dragend', column.width, startLeft - startColumnLeft, column, event);

            _this3.store.scheduleLayout();

            document.body.style.cursor = '';
            _this3.dragging = false;
            _this3.draggingColumn = null;
            _this3.dragState = {};

            table.resizeProxyVisible = false;
          }

          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.onselectstart = null;
          document.ondragstart = null;

          setTimeout(function () {
            Object(dom_["removeClass"])(columnEl, 'noclick');
          }, 0);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    },
    handleMouseMove: function handleMouseMove(event, column) {
      if (column.children && column.children.length > 0) return;
      var target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }
      if (!column || !column.resizable) return;

      if (!this.dragging && this.border) {
        var rect = target.getBoundingClientRect();

        var bodyStyle = document.body.style;
        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize';
          if (Object(dom_["hasClass"])(target, 'is-sortable')) {
            target.style.cursor = 'col-resize';
          }
          this.draggingColumn = column;
        } else if (!this.dragging) {
          bodyStyle.cursor = '';
          if (Object(dom_["hasClass"])(target, 'is-sortable')) {
            target.style.cursor = 'pointer';
          }
          this.draggingColumn = null;
        }
      }
    },
    handleMouseOut: function handleMouseOut() {
      if (this.$isServer) return;
      document.body.style.cursor = '';
    },
    toggleOrder: function toggleOrder(_ref) {
      var order = _ref.order,
          sortOrders = _ref.sortOrders;

      if (order === '') return sortOrders[0];
      var index = sortOrders.indexOf(order || null);
      return sortOrders[index > sortOrders.length - 2 ? 0 : index + 1];
    },
    handleSortClick: function handleSortClick(event, column, givenOrder) {
      event.stopPropagation();
      var order = column.order === givenOrder ? null : givenOrder || this.toggleOrder(column);

      var target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }

      if (target && target.tagName === 'TH') {
        if (Object(dom_["hasClass"])(target, 'noclick')) {
          Object(dom_["removeClass"])(target, 'noclick');
          return;
        }
      }

      if (!column.sortable) return;

      var states = this.store.states;
      var sortProp = states.sortProp;
      var sortOrder = void 0;
      var sortingColumn = states.sortingColumn;

      if (sortingColumn !== column || sortingColumn === column && sortingColumn.order === null) {
        if (sortingColumn) {
          sortingColumn.order = null;
        }
        states.sortingColumn = column;
        sortProp = column.property;
      }

      if (!order) {
        sortOrder = column.order = null;
      } else {
        sortOrder = column.order = order;
      }

      states.sortProp = sortProp;
      states.sortOrder = sortOrder;

      this.store.commit('changeSortCondition');
    }
  },

  data: function data() {
    return {
      draggingColumn: null,
      dragging: false,
      dragState: {}
    };
  }
});
// CONCATENATED MODULE: ./packages/table/src/table-footer.js


/* harmony default export */ var table_footer = ({
  name: 'ElTableFooter',
  xtype: 'YuTableFooter',

  mixins: [layout_observer],

  render: function render(h) {
    var _this = this;

    var sums = [];
    this.columns.forEach(function (column, index) {
      if (index === 0) {
        sums[index] = _this.sumText;
        return;
      }
      var values = _this.store.states.data.map(function (item) {
        return Number(item[column.property]);
      });
      var precisions = [];
      var notNumber = true;
      values.forEach(function (value) {
        if (!isNaN(value)) {
          notNumber = false;
          var decimal = ('' + value).split('.')[1];
          precisions.push(decimal ? decimal.length : 0);
        }
      });
      var precision = Math.max.apply(null, precisions);
      if (!notNumber) {
        sums[index] = values.reduce(function (prev, curr) {
          var value = Number(curr);
          if (!isNaN(value)) {
            return parseFloat((prev + curr).toFixed(Math.min(precision, 20)));
          } else {
            return prev;
          }
        }, 0);
      } else {
        sums[index] = '';
      }
    });

    return h(
      'table',
      {
        'class': 'el-table__footer',
        attrs: { cellspacing: '0',
          cellpadding: '0',
          border: '0' }
      },
      [h(
        'colgroup',
        { 'class': 'el-table_group' },
        [this._l(this.columns, function (column) {
          return h('col', {
            attrs: {
              name: column.id,
              width: column.realWidth || column.width
            }
          });
        }), !this.fixed && this.layout.gutterWidth ? h('col', {
          attrs: { name: 'gutter' },
          style: { width: this.layout.scrollY ? this.layout.gutterWidth : '' + 'px' } }) : '']
      ), h(
        'tbody',
        { 'class': 'el-table__tbody' },
        [h(
          'tr',
          { 'class': 'el-table__row' },
          [this._l(this.columns, function (column, cellIndex) {
            return h(
              'td',
              {
                attrs: {
                  colspan: column.colSpan,
                  rowspan: column.rowSpan
                },
                style: 'width: ' + (column.realWidth || column.width) + 'px;',
                'class': ['el-table__cell', column.id, column.headerAlign, column.className || '', _this.isCellHidden(cellIndex, _this.columns) ? 'is-hidden' : '', !column.children ? 'is-leaf' : '', column.labelClassName] },
              [h(
                'div',
                { 'class': ['cell', column.labelClassName] },
                [_this.summaryMethod ? _this.summaryMethod({ columns: _this.columns, data: _this.store.states.data })[cellIndex] : sums[cellIndex]]
              )]
            );
          }), !this.fixed && this.layout.gutterWidth ? h('td', { 'class': 'gutter el-table__cell', style: { width: this.layout.scrollY ? this.layout.gutterWidth + 'px' : '0' } }) : '']
        )]
      )]
    );
  },


  props: {
    fixed: String,
    store: {
      required: true
    },
    layout: {
      required: true
    },
    summaryMethod: Function,
    sumText: String,
    border: Boolean,
    defaultSort: {
      type: Object,
      default: function _default() {
        return {
          prop: '',
          order: ''
        };
      }
    }
  },

  computed: {
    isAllSelected: function isAllSelected() {
      return this.store.states.isAllSelected;
    },
    columnsCount: function columnsCount() {
      return this.store.states.columns.length;
    },
    leftFixedCount: function leftFixedCount() {
      return this.store.states.fixedColumns.length;
    },
    rightFixedCount: function rightFixedCount() {
      return this.store.states.rightFixedColumns.length;
    },
    columns: function columns() {
      return this.store.states.columns;
    }
  },

  methods: {
    isCellHidden: function isCellHidden(index, columns) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (this.fixed === 'right') {
        var before = 0;
        for (var i = 0; i < index; i++) {
          before += columns[i].colSpan;
        }
        return before < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/table.vue?vue&type=script&lang=js&
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


 // debounce









var tableIdSeed = 1;

/* harmony default export */ var tablevue_type_script_lang_js_ = ({
  name: 'ElTable',
  xtype: 'YuTable',

  mixins: [locale_default.a],

  props: {
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true
    },

    stripe: Boolean,

    border: Boolean,

    rowKey: [String, Function],

    context: {},

    showHeader: {
      type: Boolean,
      default: true
    },

    showSummary: Boolean,

    sumText: String,

    summaryMethod: Function,

    spanMethod: Function,

    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },

    rowClassName: [String, Function],

    rowStyle: [Object, Function],

    cellClassName: [String, Function],

    cellStyle: [Object, Function],

    headerRowClassName: [String, Function],

    headerRowStyle: [Object, Function],

    headerCellClassName: [String, Function],

    headerCellStyle: [Object, Function],

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    emptyText: String,

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    tooltipEffect: String,
    rules: [Object, Array, String],
    autoSortable: Boolean,
    renderCustomContent: Function,
    // 是否开启隐藏列(接收来源于xtable 的属性值)
    showHiddenMenu: Boolean,
    //  每个表格一个唯一的序列号
    tableSequence: String,
    treeProps: {
      type: Object,
      default: function _default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children'
        };
      }
    },

    lazy: Boolean,

    load: Function,

    size: String,

    rowHeight: [String],
    isFit: Boolean,
    // 启用性能优化数组长度
    enableLength: {
      type: Number,
      default: 500
    }
  },

  components: {
    TableHeader: table_header,
    TableFooter: table_footer,
    TableBody: table_body,
    ElCheckbox: checkbox_default.a
  },
  methods: {
    setCurrentRow: function setCurrentRow(row) {
      this.store.commit('setCurrentRow', row);
    },
    toggleRowSelection: function toggleRowSelection(row, selected) {
      this.store.toggleRowSelection(row, selected);
    },
    setSelectData: function setSelectData(row, selected) {
      if (this.store.states.isMoreData) {
        this.virtualData[row.__vkey].__selected = selected || !this.virtualData[row.__vkey].__selected;
      } else {
        this.data[row.__vkey].__selected = selected || !this.data[row.__vkey].__selected;
      }
    },
    clearSelection: function clearSelection() {
      this.store.clearSelection();
    },


    // handleMouseLeave() {
    //   this.store.commit('setHoverRow', null);
    //   if (this.hoverState) this.hoverState = null;
    // },

    updateScrollY: function updateScrollY() {
      this.layout.updateScrollY();
    },


    // bindEvents() {
    //   const { headerWrapper, footerWrapper } = this.$refs;
    //   const refs = this.$refs;
    //   this.bodyWrapper.addEventListener('scroll', function() {
    //     if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
    //     if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
    //     if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop;
    //     if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
    //   });

    //   const scrollBodyWrapper = event => {
    //     const { deltaX, deltaY } = event;

    //     if (Math.abs(deltaX) < Math.abs(deltaY)) return;

    //     if (deltaX > 0) {
    //       this.bodyWrapper.scrollLeft += 10;
    //     } else if (deltaX < 0) {
    //       this.bodyWrapper.scrollLeft -= 10;
    //     }
    //   };
    //   if (headerWrapper) {
    //     mousewheel(headerWrapper, throttle(16, scrollBodyWrapper));
    //   }
    //   if (footerWrapper) {
    //     mousewheel(footerWrapper, throttle(16, scrollBodyWrapper));
    //   }

    //   if (this.fit) {
    //     this.windowResizeListener = throttle(50, () => {
    //       if (this.$ready) this.doLayout();
    //     });
    //     addResizeListener(this.$el, this.windowResizeListener);
    //   }
    // },

    // TODO 使用 CSS transform
    syncPostion: function syncPostion() {
      var _ref = this.bodyWrapper || this.$refs.bodyWrapper,
          scrollLeft = _ref.scrollLeft,
          scrollTop = _ref.scrollTop,
          offsetWidth = _ref.offsetWidth,
          scrollWidth = _ref.scrollWidth;

      var _$refs = this.$refs,
          headerWrapper = _$refs.headerWrapper,
          footerWrapper = _$refs.footerWrapper,
          fixedBodyWrapper = _$refs.fixedBodyWrapper,
          rightFixedBodyWrapper = _$refs.rightFixedBodyWrapper;

      if (headerWrapper) headerWrapper.scrollLeft = scrollLeft;
      if (footerWrapper) footerWrapper.scrollLeft = scrollLeft;
      if (fixedBodyWrapper) fixedBodyWrapper.scrollTop = scrollTop;
      if (rightFixedBodyWrapper) rightFixedBodyWrapper.scrollTop = scrollTop;
      var maxScrollLeftPosition = scrollWidth - offsetWidth - 1;
      if (scrollLeft >= maxScrollLeftPosition) {
        this.scrollPosition = 'right';
      } else if (scrollLeft === 0) {
        this.scrollPosition = 'left';
      } else {
        this.scrollPosition = 'middle';
      }
    },

    bindEvents: function bindEvents() {
      window.addEventListener('resize', this.resizeListener);
      if (this.fit) {
        Object(resize_event_["addResizeListener"])(this.$el, this.resizeListener);
      }
    },

    unbindEvents: function unbindEvents() {
      window.removeEventListener('resize', this.resizeListener);
      if (this.fit) {
        Object(resize_event_["removeResizeListener"])(this.$el, this.resizeListener);
      }
    },
    resizeListener: function resizeListener() {
      if (!this.$ready) return;
      var shouldUpdateLayout = false;
      var el = this.$el;
      var _resizeState = this.resizeState,
          oldWidth = _resizeState.width,
          oldHeight = _resizeState.height;


      var width = el.offsetWidth;
      if (oldWidth !== width) {
        shouldUpdateLayout = true;
      }

      var height = el.offsetHeight;
      if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
        shouldUpdateLayout = true;
      }
      if (shouldUpdateLayout) {
        this.resizeState.width = width;
        this.resizeState.height = height;
        if (this.store.states.isMoreData) {
          this.layout.updateColumnsHeight();
        }
        this.doLayout();
      }
    },
    doLayout: function doLayout() {
      // this.store.updateColumns();//屏蔽数据更新时 重复调用updateCloumnsl
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight();
      }
      this.layout.updateColumnsWidth();
    },
    toggleAllSelection: function toggleAllSelection() {
      this.store.commit('toggleAllSelection');
    },
    toggleRowExpansion: function toggleRowExpansion(row, expanded) {
      this.store.toggleRowExpansionAdapter(row, expanded);
    },
    validate: function validate(callback, flag) {
      this.$refs.refTableBody.validate(this.store.states.currentRow, callback, flag);
    },

    clearValidateMessage: function clearValidateMessage() {
      this.$refs.refTableBody.validateFieldsMessage = null;
      this.$refs.refTableBody.validateMessage = null;
      this.$refs.refTableBody.validateState = 'success';
      this.store.states.currentEditRow = null;
      this.store.states.index = null;
      var _this = this;
      this.$nextTick(function () {
        _this.$refs.refTableBody.type = 'default';
      });
    },
    getRowKey: function getRowKey(row) {
      var rowKey = getRowIdentity(row, this.store.states.rowKey);
      if (!rowKey) {
        throw new Error('if there\'s nested data, rowKey is required.');
      }
      return rowKey;
    },
    getTableTreeData: function getTableTreeData(data) {
      var _this2 = this;

      var treeData = {};
      var traverse = function traverse(children, parentData, level) {
        children.forEach(function (item) {
          var rowKey = _this2.getRowKey(item);
          treeData[rowKey] = {
            display: false,
            level: level
          };
          parentData.children.push(rowKey);
          if (Array.isArray(item[_this2.treeProps.children]) && item[_this2.treeProps.children].length) {
            treeData[rowKey].children = [];
            treeData[rowKey].expanded = false;
            traverse(item[_this2.treeProps.children], treeData[rowKey], level + 1);
          }
        });
      };
      if (data) {
        data.forEach(function (item) {
          var containChildren = Array.isArray(item[_this2.treeProps.children]) && [_this2.treeProps.children].length;
          if (!(containChildren || item[_this2.treeProps.hasChildren])) return;
          var rowKey = _this2.getRowKey(item);
          var treeNode = {
            level: 0,
            expanded: false,
            display: true,
            children: []
          };
          if (containChildren) {
            treeData[rowKey] = treeNode;
            traverse(item[_this2.treeProps.children], treeData[rowKey], 1);
          } else if (item[_this2.treeProps.hasChildren] && _this2.lazy) {
            treeNode.hasChildren = true;
            treeNode.loaded = false;
            treeData[rowKey] = treeNode;
          }
        });
      }
      return treeData;
    },
    clearSort: function clearSort() {
      this.store.clearSort();
    },
    clearFilter: function clearFilter(columnKeys) {
      this.store.clearFilter(columnKeys);
    },
    sort: function sort(prop, order) {
      this.store.commit('sort', { prop: prop, order: order });
    },

    // 节点滚动
    onVirtualScroll: Object(external_throttle_debounce_["throttle"])(20, function (syncPostion) {
      var _this = this;

      var _ref2 = this.bodyWrapper || this.$refs.bodyWrapper,
          scrollTop = _ref2.scrollTop;

      _this.scrollTop = scrollTop;
      // 定位
      if (syncPostion) {
        _this.syncPostion();
      }
      if (_this.store.states.isMoreData) {
        if (!_this.itemHeight) {
          _this.setItemHeight();
        }
        // 大数据滚动更新数据
        window.requestAnimationFrame(function () {
          _this.layout.updateColumnsHeight(true);
        }, 100);
      }
    }),
    setItemHeight: function setItemHeight() {
      var rows = this.$refs[this.thisBody$refs].querySelector('.el-table__body .el-table__row');
      this.itemHeight = rows.offsetHeight;
      this.remainHeight = this.itemHeight * this.remainItems;
      var renderItems = Math.ceil(this.viewPortHeight / this.itemHeight) + 2 * this.remainItems;
      this.renderItemsHeight = renderItems * this.itemHeight;
    },
    buildRenderData: function buildRenderData(minHeight, maxHeight) {
      var minItemKey = minHeight / this.itemHeight;
      var maxItemKey = maxHeight / this.itemHeight;
      var startIndex = minItemKey > 0 ? minItemKey : -1;
      var endIndex = maxItemKey > this.virtualData.length - 1 ? this.data.length : maxItemKey;
      var renderData = [];
      var virtualData = this.store.states.virtualData;
      var translateY = this.getLastHeight(startIndex);
      for (var index = startIndex + 1; index < endIndex; index++) {
        var item = virtualData[index];
        item.__translateY = translateY + 'px';
        renderData.push(item);
        translateY += item.__height;
      }
      return renderData;
    },

    // 获取历史高度
    getLastHeight: function getLastHeight(len) {
      var translateY = 0;
      var virtualData = this.store.states.virtualData;
      for (var i = 0; i < len; i++) {
        if (i !== 0 && virtualData[i]) {
          translateY += virtualData[i].__height;
        }
      }
      return translateY;
    },
    findIndex: function findIndex(data, key) {
      var index = -1;
      data.forEach(function (item, i) {
        if (item.__vkey === key) {
          index = i;
        }
      });
      return index;
    },
    buildNewItems: function buildNewItems(newData) {
      var newItems = [];
      for (var _iterator = newData, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref3 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref3 = _i.value;
        }

        var newRecord = _ref3;

        if (this.findIndex(this.renderData, newRecord.__vkey) < 0) {
          newItems.push(newRecord);
        }
      }
      return newItems;
    },
    buildOutDateItems: function buildOutDateItems(newData) {
      var replaceItemsIndex = [];
      for (var index = 0, len = this.renderData.length; index < len; index++) {
        var record = this.renderData[index];
        if (this.findIndex(newData, record.__vkey) < 0) {
          replaceItemsIndex.push(index);
        }
      }
      return replaceItemsIndex;
    },
    refreshVirtualItems: function refreshVirtualItems(newItems, replaceItemsIndex) {
      if (newItems.length === this.renderData.length) {
        this.store.states.renderData = newItems;
        return;
      }
      for (var index = 0; index < newItems.length; index++) {
        if (index < replaceItemsIndex.length) {
          this.$set(this.store.states.renderData, replaceItemsIndex[index], newItems[index]);
          continue;
        }
        this.store.states.renderData.push(newItems[index]);
      }
    },
    updateRenderData: function updateRenderData(newData) {
      if (this.renderData.length === 0) {
        this.store.states.renderData = newData;
        return;
      }
      var newItems = this.buildNewItems(newData);
      var replaceItemsIndex = this.buildOutDateItems(newData);
      this.refreshVirtualItems(newItems, replaceItemsIndex);
    },
    refreshRenderData: function refreshRenderData() {
      var virtualScrollBody = this.$refs[this.thisBody$refs];
      var scrollTop = virtualScrollBody ? virtualScrollBody.scrollTop : 0;

      var _store$calDomItemsHei = this.store.calDomItemsHeight(this.itemHeight, this.remainHeight, this.viewPortHeight, this.renderItemsHeight, scrollTop),
          minItemHeight = _store$calDomItemsHei[0],
          maxItemHeight = _store$calDomItemsHei[1];

      this.updateRenderData(this.buildRenderData(minItemHeight, maxItemHeight));
    },

    // 处理渲染数据 ，添加__vkey, __translateY, __height
    handleData: function handleData(data, isFirst) {
      var _this3 = this;

      var _this = this;
      var keys = [];
      if (this.store.states.reserveSelection) {
        for (var i = 0, l = this.selection.length; i < l; i++) {
          keys.push(getRowIdentity(this.selection[i], this.store.states.rowKey));
        }
        var unSelect = data.filter(function (item) {
          return keys.indexOf(getRowIdentity(item, _this.store.states.rowKey)) === -1;
        });
        this.$nextTick(function () {
          if (!(unSelect.length > 0) && this.selection.length) {
            this.store.states.isAllSelected = true;
          } else {
            this.store.states.isAllSelected = false;
          }
        });
      }
      var arr = [];
      var translateY = 0;
      var selection = this.store.states.selectionIds;
      // const page = this.$parent.page || 1;
      // const size = this.$parent.pageSize || 0;
      data.forEach(function (v, i) {
        var height = isFirst ? 41 : v.__height;
        var obj = v;
        var index = i;
        // 初次渲染 添加 数据
        if (obj.__vkey === undefined) {
          obj.__vkey = index;
          obj.__translateY = translateY + 'px';
          obj.__height = height;
        } else {
          obj.__translateY = translateY + 'px';
          // if (v.__selected) {
          //   this.store.states.selection.push(v);
          // }
        }
        translateY += height;
        if (_this3.store.states.reserveSelection) {
          obj.__selected = keys.indexOf(getRowIdentity(v, _this.store.states.rowKey)) !== -1;
        } else {
          obj.__selected = selection.indexOf(index) !== -1;
        }
        arr.push(obj);
      });
      return arr;
    },

    flattenData: function flattenData(data) {
      var _this4 = this;

      if (!data) return data;
      var newData = [];
      var flatten = function flatten(arr) {
        arr.forEach(function (item) {
          newData.push(item);
          if (Array.isArray(item[_this4.treeProps.children])) {
            flatten(item[_this4.treeProps.children]);
          }
        });
      };
      flatten(data);
      if (data.length === newData.length) {
        return data;
      } else {
        return newData;
      }
    }
  },

  created: function created() {
    var _this5 = this;

    // let _this = this;
    this.tableId = 'el-table_' + tableIdSeed + '_';
    this.debouncedLayout = Object(external_throttle_debounce_["debounce"])(50, function () {
      return _this5.doLayout();
    });
  },

  computed: {
    tableSize: function tableSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },
    renderData: function renderData() {
      return this.store.states.renderData;
    },
    virtualData: function virtualData() {
      return this.store.states.virtualData;
    },
    bodyWrapper: function bodyWrapper() {
      return this.$refs.bodyWrapper;
    },
    shouldUpdateHeight: function shouldUpdateHeight() {
      return this.height || this.maxHeight || this.fixedColumns.length > 0 || this.rightFixedColumns.length > 0;
    },
    selection: function selection() {
      return this.store.states.selection;
    },
    columns: function columns() {
      return this.store.states.columns;
    },
    isMoreData: function isMoreData() {
      return this.store.states.isMoreData;
    },
    tableData: function tableData() {
      return this.store.states.isMoreData ? this.store.states.renderData : this.store.states.data;
    },
    fixedColumns: function fixedColumns() {
      return this.store.states.fixedColumns;
    },
    rightFixedColumns: function rightFixedColumns() {
      return this.store.states.rightFixedColumns;
    },
    bodyHeight: function bodyHeight() {
      var style = {};
      if (this.height) {
        style = {
          height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        var h = (this.showHeader ? this.maxHeight - this.layout.headerHeight - this.layout.footerHeight : this.maxHeight - this.layout.footerHeight) + 'px';
        style = {
          'max-height': h
          // ,
          // 'height': h
        };
      } else if (this.data.length > this.enableLength) {
        var val = 500 + 'px';
        this.store.states.isMoreData = true;
        style = {
          'max-height': val,
          'height': val
        };
      }
      return style;
    },
    bodyWidth: function bodyWidth() {
      var _layout = this.layout,
          bodyWidth = _layout.bodyWidth,
          scrollY = _layout.scrollY,
          gutterWidth = _layout.gutterWidth;

      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
    },
    fixedBodyHeight: function fixedBodyHeight() {
      var style = {};

      if (this.height) {

        style = {
          height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        var maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight;

        if (this.showHeader) {
          maxHeight -= this.layout.headerHeight;
        }

        style = {
          'max-height': maxHeight + 'px',
          'height': maxHeight + 'px'
        };
      }

      return style;
    },
    fixedHeight: function fixedHeight() {
      var style = {};

      if (this.maxHeight) {
        style = {
          bottom: this.layout.scrollX && this.data.length ? this.layout.gutterWidth + 'px' : ''
        };
      } else {
        style = {
          height: this.layout.viewportHeight ? this.layout.viewportHeight + 1 + 'px' : ''
        };
      }
      return style;
    }
  },

  watch: {
    height: {
      immediate: true,
      handler: function handler(value) {
        this.layout.setHeight(value);
      }
    },

    maxHeight: {
      immediate: true,
      handler: function handler(value) {
        this.layout.setMaxHeight(value);
      }
    },

    currentRowKey: {
      immediate: true,
      handler: function handler(value) {
        if (!value) return;
        this.$nextTick(function () {
          this.store.setCurrentRowKey(value);
        });
      }
    },

    data: {
      immediate: true,
      handler: function handler(tableVal) {
        this.viewPortHeight = this.height || this.maxHeight;
        this.store.states.isMoreData = false;
        // 判断传值类型
        if (!(tableVal instanceof Array)) {
          yufp.logger.warn('parameter error, data expected to pass value as array type');
        }
        var val = tableVal || [];
        var curData = this.handleData(val, true);
        if (val.length > this.enableLength) {
          if (!this.height || !this.maxHeight) {
            this.viewPortHeight = 500;
          }
          this.store.states.isMoreData = true;
          this.store.states.virtualData = curData;
          this.store.states.renderData = this.store.states.virtualData.slice(0, 100);
          this.refreshRenderData();
        } else {
          this.store.states.data = curData;
          this.store.states._data = curData;
        }
        this.store.states.treeData = this.getTableTreeData(val);
        val = this.flattenData(val);
        this.store.commit('setData', val);
        if (this.$ready) {
          this.doLayout();
        }
      }
    },

    expandRowKeys: function expandRowKeys(newVal) {
      this.store.setExpandRowKeys(newVal);
    }
  },

  destroyed: function destroyed() {
    this.unbindEvents();
  },
  mounted: function mounted() {
    var _this6 = this;

    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };

    // init filters
    this.store.states.columns.forEach(function (column) {
      if (column.filteredValue && column.filteredValue.length) {
        _this6.store.commit('filterChange', {
          column: column,
          values: column.filteredValue,
          silent: true
        });
      }
    });

    this.$ready = true;

    this.$nextTick(function () {
      _this6.bindEvents();
      _this6.store.states.isMoreData && _this6.layout.updateColumnsHeight();
      _this6.doLayout();
    }, 100);
  },
  data: function data() {
    var store = new table_store(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll,
      rules: this.rules,
      autoSortable: this.autoSortable,
      selectOnIndeterminate: this.selectOnIndeterminate,
      // TreeTable 的相关配置
      lazy: this.lazy
    });
    var layout = new table_layout({
      store: store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    });
    return {
      store: store,
      layout: layout,
      // renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null
      },
      timer: null,
      viewPortHeight: 0,
      itemHeight: 0,
      remainHeight: '', // 留闲高度
      remainItems: 60, // 留长条数
      thisBody$refs: 'bodyWrapper',
      scrollTope: 0,
      sequenceId: this.tableSequence ? this.tableSequence : new Date().getTime() + '_' + parseInt(Math.random() * 1000, 10)
    };
  }
});
// CONCATENATED MODULE: ./packages/table/src/table.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tablevue_type_script_lang_js_ = (tablevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/table/src/table.vue





/* normalize component */

var table_component = Object(componentNormalizer["a" /* default */])(
  src_tablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var table_api; }
table_component.options.__file = "packages/table/src/table.vue"
/* harmony default export */ var src_table = __webpack_exports__["a"] = (table_component.exports);

/***/ }),

/***/ 75:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/scrollbar-width");

/***/ }),

/***/ 76:
/***/ (function(module, exports) {

module.exports = require("@/lib/checkbox-group");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/clickoutside");

/***/ })

/******/ });