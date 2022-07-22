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
/******/ 	return __webpack_require__(__webpack_require__.s = 111);
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

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);


/* istanbul ignore next */
_src_component__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_component__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_component__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_component__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/migrating");

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/switch/src/component.vue?vue&type=template&id=2dcd8fbb&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "el-switch",
      class: {
        "is-disabled": _vm.switchDisabled,
        "el-switch--wide": _vm.hasText,
        "is-checked": _vm.checked
      },
      on: {
        click: function($event) {
          $event.preventDefault()
          return _vm.switchValue($event)
        }
      }
    },
    [
      _c("div", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.switchDisabled,
            expression: "switchDisabled"
          }
        ],
        staticClass: "el-switch__mask"
      }),
      _c("input", {
        ref: "input",
        staticClass: "el-switch__input",
        class: { "allow-focus": _vm.allowFocus },
        attrs: {
          type: "checkbox",
          name: _vm.name,
          "true-value": _vm.onValue,
          "false-value": _vm.offValue,
          disabled: _vm.switchDisabled
        },
        on: {
          change: _vm.handleChange,
          focus: _vm.handleFocus,
          blur: _vm.handleBlur
        }
      }),
      _c(
        "span",
        {
          class: [
            "el-switch__label",
            "el-switch__label--left",
            !_vm.checked ? "is-active" : ""
          ]
        },
        [
          _vm.onIconClass ? _c("i", { class: [_vm.onIconClass] }) : _vm._e(),
          !_vm.onIconClass && _vm.onText
            ? _c("span", [_vm._v(_vm._s(_vm.onText))])
            : _vm._e()
        ]
      ),
      _c(
        "span",
        {
          ref: "core",
          staticClass: "el-switch__core",
          style: { width: _vm.coreWidth + "px" },
          on: { click: _vm.setFocus }
        },
        [
          _c("span", {
            staticClass: "el-switch__button",
            style: { transform: _vm.transform }
          })
        ]
      ),
      _c(
        "span",
        {
          class: [
            "el-switch__label",
            "el-switch__label--right",
            _vm.checked ? "is-active" : ""
          ]
        },
        [
          _vm.offIconClass ? _c("i", { class: [_vm.offIconClass] }) : _vm._e(),
          !_vm.offIconClass && _vm.offText
            ? _c("span", [_vm._v(_vm._s(_vm.offText))])
            : _vm._e()
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/switch/src/component.vue?vue&type=template&id=2dcd8fbb&

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "@/lib/mixins/migrating"
var migrating_ = __webpack_require__(30);
var migrating_default = /*#__PURE__*/__webpack_require__.n(migrating_);

// EXTERNAL MODULE: external "@/lib/mixins/focus"
var focus_ = __webpack_require__(37);
var focus_default = /*#__PURE__*/__webpack_require__.n(focus_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/switch/src/component.vue?vue&type=script&lang=js&
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




// import { t } from '@/src/locale';
/* harmony default export */ var componentvue_type_script_lang_js_ = ({
  name: 'ElSwitch',
  xtype: 'YuSwitch',
  mixins: [focus_default()('input'), migrating_default.a, emitter_default.a],
  inject: {
    elForm: {
      default: ''
    }
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    onIconClass: {
      type: String,
      default: ''
    },
    offIconClass: {
      type: String,
      default: ''
    },
    onText: String,
    offText: String,
    onColor: {
      type: String,
      default: ''
    },
    offColor: {
      type: String,
      default: ''
    },
    onValue: {
      type: [Boolean, String, Number],
      default: true
    },
    offValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    allowFocus: {
      type: Boolean,
      default: false
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      coreWidth: this.width
    };
  },
  created: function created() {
    if (!~[this.onValue, this.offValue].indexOf(this.value)) {
      this.$emit('input', this.offValue);
    }
  },

  computed: {
    checked: function checked() {
      return this.value === this.onValue;
    },
    hasText: function hasText() {
      /* istanbul ignore next */
      return this.onText || this.offText;
    },
    transform: function transform() {
      return this.checked ? 'translate(' + (this.coreWidth - 20) + 'px, 2px)' : 'translate(2px, 2px)';
    },
    switchDisabled: function switchDisabled() {
      return this.disabled;
    }
  },
  watch: {
    checked: function checked() {
      this.$refs.input.checked = this.checked;
      if (this.onColor || this.offColor) {
        this.setBackgroundColor();
      }
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [this.value]);
        this.dispatch('YuXformAbstractItem', 'el.form.change', [this.value]);
      }
    }
  },
  methods: {
    handleChange: function handleChange(event) {
      var _this = this;

      this.$emit('input', !this.checked ? this.onValue : this.offValue);
      this.$emit('change', !this.checked ? this.onValue : this.offValue);
      this.$nextTick(function () {
        // set input's checked property
        // in case parent refuses to change component's value
        _this.$refs.input.checked = _this.checked;
      });
    },
    setBackgroundColor: function setBackgroundColor() {
      var newColor = this.checked ? this.onColor : this.offColor;
      this.$refs.core.style.borderColor = newColor;
      this.$refs.core.style.backgroundColor = newColor;
    },
    switchValue: function switchValue() {
      !this.switchDisabled && this.handleChange();
    },
    setFocus: function setFocus() {
      // set focus on input
      if (this.allowFocus) {
        this.$refs.input.focus();
      }
    },
    handleBlur: function handleBlur(event) {
      if (this.allowFocus) {
        this.$emit('blur', event);
      }
    },
    handleFocus: function handleFocus(event) {
      if (this.allowFocus) {
        this.$emit('focus', event);
      }
    }
  },
  mounted: function mounted() {
    /* istanbul ignore if */
    if (this.width === 0) {
      this.coreWidth = this.hasText ? 58 : 46;
    }
    if (this.onColor || this.offColor) {
      this.setBackgroundColor();
    }
    this.$refs.input.checked = this.checked;
  }
});
// CONCATENATED MODULE: ./packages/switch/src/component.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_componentvue_type_script_lang_js_ = (componentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/switch/src/component.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_componentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/switch/src/component.vue"
/* harmony default export */ var src_component = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/focus");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ })

/******/ });