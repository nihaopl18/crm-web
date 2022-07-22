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
/******/ 	return __webpack_require__(__webpack_require__.s = 173);
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

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/count-down/src/main.vue?vue&type=template&id=4cfc1902&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "el-countdown" }, [
    _vm.timeLag > 0
      ? _c("div", { staticClass: "time" }, [
          _vm.day > 0 || _vm.showDay
            ? _c("span", { staticClass: "day" }, [
                _vm._v(_vm._s(_vm.day) + " : ")
              ])
            : _vm._e(),
          _c("span", { staticClass: "hour" }, [
            _vm._v(_vm._s(_vm.hours) + " : ")
          ]),
          _c("span", { staticClass: "minute" }, [
            _vm._v(_vm._s(_vm.minutes) + " : ")
          ]),
          _c("span", { staticClass: "second" }, [_vm._v(_vm._s(_vm.seconds))])
        ])
      : _c("div", [
          _c("span", { staticClass: "el-cd-error-msg" }, [
            _vm._v(_vm._s(_vm.t("el.countdown.error")))
          ])
        ])
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/count-down/src/main.vue?vue&type=template&id=4cfc1902&

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/count-down/src/main.vue?vue&type=script&lang=js&
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


/* harmony default export */ var mainvue_type_script_lang_js_ = ({
  name: 'ElCountDown',
  xtype: 'YuCountDown',
  mixins: [locale_default.a],
  props: {
    format: String,
    endTime: {
      type: [Number, String, Date]
    },
    startTime: {
      type: [Number, String, Date],
      default: new Date().getTime()
    }
  },

  data: function data() {
    return {
      timeObj: null,
      day: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      showDay: false, // 是否显示天
      timeLag: null
    };
  },

  methods: {
    start: function start() {
      var _this = this;
      if (this.time) {
        clearInterval(this.time);
      };
      this.getTimeLag();
      // 先校验开始时间结束时间是否正确
      if (this.timeLag > 0) {
        // 开始执行倒计时
        this.timeCompute();
        this.$emit('start', this.timeLag);
        // 每一秒执行一次
        this.time = setInterval(function () {
          _this.timeCompute();
        }, 1000);
      }
    },
    getTimeLag: function getTimeLag() {
      this.timeLag = (this.dateToTime(this.endTime) - this.dateToTime(this.startTime)) / 1000;
    },
    pause: function pause() {
      clearInterval(this.time);
      this.time = null;
      this.$emit('pause', this.timeLag);
    },
    end: function end() {
      this.timeObj = {
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0
      };
      this.formatTime();
      clearInterval(this.time);
      this.time = null;
      this.$emit('end', this.timeLag);
    },
    formatFn: function formatFn(unit) {
      var add = function add(num) {
        return num < 10 ? '0' + num : num;
      };
      if (unit === 'dd' || unit === '天') {
        this.showDay = true;
        this.day = '' + (add(this.timeObj.days) + unit);
      } else if (unit === 'hh' || unit === '时') {
        this.hours = '' + (add(this.timeObj.hours) + unit);
      } else if (unit === 'mm' || unit === '分') {
        this.minutes = '' + (add(this.timeObj.minutes) + unit);
      } else if (unit === 'ss' || unit === '秒') {
        this.seconds = '' + (add(this.timeObj.seconds) + unit);
      }
    },
    formatTime: function formatTime() {
      var add = function add(num) {
        return num < 10 ? '0' + num : num;
      };
      if (this.format) {
        var format = this.format.split('-');
        for (var i = 0, l = format.length; i < l; i++) {
          this.formatFn(format[i]);
        }
      } else {
        this.day = '' + add(this.timeObj.days);
        this.hours = '' + add(this.timeObj.hours);
        this.minutes = '' + add(this.timeObj.minutes);
        this.seconds = '' + add(this.timeObj.seconds);
      }
    },
    timeCompute: function timeCompute() {
      // 时间倒计时运算的方法
      var time = this.timeLag--;
      this.timeObj = { // 时间对象
        seconds: Math.floor(time % 60),
        minutes: Math.floor(time / 60) % 60,
        hours: Math.floor(time / 60 / 60) % 24,
        days: Math.floor(time / 60 / 60 / 24)
      };
      this.formatTime();
      // 当时间差小于等于0时,停止倒计时
      if (time <= 0) {
        clearInterval(this.time);
        this.time = null;
        this.$emit('end', this.timeLag);
      }
    },
    dateToTime: function dateToTime(date) {
      if (typeof date === 'number') {
        return date;
      } else if (typeof date === 'string') {
        return new Date(date).getTime();
      } else {
        return date.getTime();
      }
    }
  },
  mounted: function mounted() {
    this.getTimeLag();
    if (this.timeLag > 0) {
      this.start();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.time) {
      clearInterval(this.time);
      this.time = null;
    }
  }
});
// CONCATENATED MODULE: ./packages/count-down/src/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/count-down/src/main.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_mainvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/count-down/src/main.vue"
/* harmony default export */ var main = (component.exports);
// CONCATENATED MODULE: ./packages/count-down/index.js


/* istanbul ignore next */
main.install = function (Vue) {
  Vue.component(main.name, main);
};

/* harmony default export */ var count_down = __webpack_exports__["default"] = (main);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

/***/ })

/******/ });