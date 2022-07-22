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
/******/ 	return __webpack_require__(__webpack_require__.s = 218);
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

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/tag-select/src/option.vue?vue&type=template&id=18f910ec&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    {
      staticClass: "el-tag-option",
      class: [
        _vm.type ? "el-tag--" + _vm.type : "",
        {
          "is-hit": _vm.hit,
          "is-checked": !_vm.isGroup ? _vm.ischecked : _vm.isChecked,
          "is-disabled": _vm.isDisabled
        }
      ],
      style: { backgroundColor: _vm.color },
      on: { click: _vm.handleCheck }
    },
    [_vm._t("default", [_vm._v(_vm._s(_vm.label))])],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/tag-select/src/option.vue?vue&type=template&id=18f910ec&

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/tag-select/src/option.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//



/* harmony default export */ var optionvue_type_script_lang_js_ = ({
  name: 'ElTagOption',
  xtype: 'YuTagOption',

  mixins: [emitter_default.a],

  componentName: 'ElTagOption',

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data: function data() {
    return {
      ischecked: this.value
    };
  },


  computed: {
    isChecked: {
      get: function get() {
        if ({}.toString.call(this.store) === '[object Boolean]') {
          return this.store;
        } else if (typeof this.store === 'number') {
          return this.store;
        } else if (Array.isArray(this.store)) {
          return this.store.indexOf(this.label) > -1;
        } else if (this.store !== null && this.store !== undefined) {
          return this.store === this.trueLabel;
        }
      }
    },
    isGroup: function isGroup() {
      var parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'ElTagSelect') {
          parent = parent.$parent;
        } else {
          this._tagSelect = parent;
          return true;
        }
      }
      return false;
    },
    store: function store() {
      return this.isGroup ? this._tagSelect.value : this.value;
    },


    /* used to make the isDisabled judgment under max/min props */
    isLimitDisabled: function isLimitDisabled() {
      var _tagSelect = this._tagSelect,
          max = _tagSelect.max,
          min = _tagSelect.min;

      return !!(max || min) && this.store.length >= max && !this.isChecked || this.store.length <= min && this.isChecked;
    },
    isDisabled: function isDisabled() {
      return this.isGroup ? this._tagSelect.disabled || this.disabled || this.isLimitDisabled : this.disabled;
    }
  },
  watch: {
    value: function value(val, oldVal) {
      this.ischecked = val;
      this.$emit('change', val, oldVal);
    }
  },
  props: {
    value: {},
    label: {},
    disabled: Boolean,
    type: String,
    hit: Boolean,
    color: String
  },

  methods: {
    handleChange: function handleChange(value) {
      var _this2 = this;

      if (this.isGroup) {
        this.$nextTick(function () {
          _this2.dispatch('ElTagSelect', 'change', [value]);
        });
      }
    },
    handleCheck: function handleCheck() {
      var _this = this;
      if (!this.isDisabled) {
        this.ischecked = !this.ischecked;
        if (this.isGroup) {
          if (!Array.isArray(this.store)) {
            console.error('tag-select 复选时值必须为数组类型');
          } else {
            var value = this.store;
            if (this.ischecked && value.indexOf(this.label) === -1) {
              value.push(this.label);
            } else if (!this.ischecked && value.indexOf(this.label) !== -1) {
              value = value.filter(function (item, index) {
                return item !== _this.label;
              });
            }
            this.handleChange(value);
            this.dispatch('ElTagSelect', 'input', [value]);
          }
        } else {
          this.$emit('input', this.ischecked);
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/tag-select/src/option.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_optionvue_type_script_lang_js_ = (optionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/tag-select/src/option.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_optionvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/tag-select/src/option.vue"
/* harmony default export */ var src_option = (component.exports);
// CONCATENATED MODULE: ./packages/tag-option/index.js


/* istanbul ignore next */
src_option.install = function (Vue) {
  Vue.component(src_option.name, src_option);
};

/* harmony default export */ var tag_option = __webpack_exports__["default"] = (src_option);

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ })

/******/ });