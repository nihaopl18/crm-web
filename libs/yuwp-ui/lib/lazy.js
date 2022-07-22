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
/******/ 	return __webpack_require__(__webpack_require__.s = 187);
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

/***/ 124:
/***/ (function(module, exports) {

module.exports = require("intersection-observer");

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "intersection-observer"
var external_intersection_observer_ = __webpack_require__(124);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/lazy/src/lazy.vue?vue&type=template&id=3b668666&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "el-lazy" }, [
    _vm.isInit
      ? _c(
          "div",
          { staticClass: "el-lazy__comp" },
          [_vm._t("default", null, { loading: _vm.compLoading })],
          2
        )
      : _vm.$slots.skeleton
      ? _c("div", { staticClass: "el-lazy__skeleton" }, [_vm._t("skeleton")], 2)
      : _c("div", {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.waitLoading,
              expression: "waitLoading"
            }
          ],
          staticClass: "el-lazy__wait",
          style: _vm.waitStyle
        })
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/lazy/src/lazy.vue?vue&type=template&id=3b668666&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/lazy/src/lazy.vue?vue&type=script&lang=js&
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

/* harmony default export */ var lazyvue_type_script_lang_js_ = ({
  name: 'ElLazy',
  xtype: 'YuLazy',

  props: {
    timeout: {
      type: Number,
      default: 0
    },
    viewport: {
      type: typeof window !== 'undefined' ? window.HTMLElement : Object,
      default: function _default() {
        return null;
      }
    },
    threshold: {
      type: String,
      default: '0px'
    },
    direction: {
      type: String,
      default: 'vertical'
    },
    maxWaitingTime: {
      type: Number,
      default: 50
    },
    waitAreaHeight: {
      type: String,
      default: '0'
    }
  },
  data: function data() {
    return {
      isInit: false,
      timer: null,
      io: null,
      compLoading: false
    };
  },
  created: function created() {
    var _this = this;

    // 如果指定timeout则无论可见与否都是在timeout之后初始化
    if (this.timeout > 0) {
      this.timer = setTimeout(function () {
        _this.init();
      }, this.timeout);
    }
  },
  mounted: function mounted() {
    if (this.timeout <= 0) {
      // 根据滚动方向来构造视口外边距，用于提前加载
      var rootMargin = void 0;
      switch (this.direction) {
        case 'vertical':
          rootMargin = this.threshold + ' 0px';
          break;
        case 'horizontal':
          rootMargin = '0px ' + this.threshold;
          break;
      }
      // 观察视口与组件容器的交叉情况
      this.io = new window.IntersectionObserver(this.intersectionHandler, {
        rootMargin: rootMargin,
        root: this.viewport,
        threshold: [0, Number.MIN_VALUE, 0.01]
      });
      this.io.observe(this.$el);
    }
  },
  beforeDestroy: function beforeDestroy() {
    // 在组件销毁前取消观察
    if (this.io) {
      this.io.unobserve(this.$el);
      this.io.disconnect();
      this.io = null;
    }
  },

  methods: {
    // 交叉情况变化处理函数
    intersectionHandler: function intersectionHandler(entries) {
      // 正在交叉 或者 交叉率大于0
      if (entries[0].isIntersecting || entries[0].intersectionRatio) {
        this.init();
        this.io.unobserve(this.$el);
      }
    },

    // 处理组件和骨架组件的切换
    init: function init() {
      var _this2 = this;

      // 此时说明骨架组件即将被切换
      this.$emit('before-init');
      // 此时可以准备加载懒加载组件的资源
      this.compLoading = true;
      // 由于函数会在主线程中执行，加载懒加载组件非常耗时，容易卡顿
      // 所以在requestAnimationFrame回调中延后执行
      this.requestAnimationFrame(function () {
        _this2.isInit = true;
        _this2.$emit('init');
      });
    },
    requestAnimationFrame: function requestAnimationFrame(callback) {
      var _this3 = this;

      // 防止等待太久没有执行回调
      // 设置最大等待时间
      setTimeout(function () {
        if (_this3.isInit) return;
        callback();
      }, this.maxWaitingTime);
      // 兼容不支持requestAnimationFrame 的浏览器
      return (window.requestAnimationFrame || function (callback) {
        return setTimeout(callback, 1000 / 60);
      })(callback);
    }
  },
  computed: {
    waitStyle: function waitStyle() {
      return {
        height: this.waitAreaHeight
      };
    },
    waitLoading: function waitLoading() {
      return this.waitAreaHeight !== '0' && !this.compLoading;
    }
  }
});
// CONCATENATED MODULE: ./packages/lazy/src/lazy.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_lazyvue_type_script_lang_js_ = (lazyvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/lazy/src/lazy.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_lazyvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/lazy/src/lazy.vue"
/* harmony default export */ var lazy = (component.exports);
// CONCATENATED MODULE: ./packages/lazy/index.js



/* istanbul ignore next */
lazy.install = function (Vue) {
  Vue.component(lazy.name, lazy);
};

/* harmony default export */ var packages_lazy = __webpack_exports__["default"] = (lazy);

/***/ })

/******/ });