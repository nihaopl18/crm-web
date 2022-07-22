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
/******/ 	return __webpack_require__(__webpack_require__.s = 196);
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

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("@/lib/input");

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/input-number/src/input-number.vue?vue&type=template&id=42f8cf66&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "el-input-number",
      class: [
        _vm.inputNumberSize ? "el-input-number--" + _vm.inputNumberSize : "",
        { "is-disabled": _vm.inputNumberDisabled },
        { "is-without-controls": !_vm.controls }
      ]
    },
    [
      _vm.controls
        ? _c("i", {
            directives: [
              {
                name: "repeat-click",
                rawName: "v-repeat-click",
                value: _vm.decrease,
                expression: "decrease"
              }
            ],
            staticClass: "el-input-number__decrease el-icon-caret-bottom",
            class: { "is-disabled": _vm.minDisabled }
          })
        : _vm._e(),
      _vm.controls
        ? _c("i", {
            directives: [
              {
                name: "repeat-click",
                rawName: "v-repeat-click",
                value: _vm.increase,
                expression: "increase"
              }
            ],
            staticClass: "el-input-number__increase el-icon-caret-top",
            class: { "is-disabled": _vm.maxDisabled }
          })
        : _vm._e(),
      _c(
        "el-input",
        {
          ref: "input",
          attrs: {
            value: _vm.displayValue,
            disabled: _vm.inputNumberDisabled,
            placeholder: _vm.placeholder,
            size: _vm.inputNumberSize,
            max: _vm.max,
            min: _vm.min,
            name: _vm.name,
            label: _vm.label
          },
          on: {
            blur: _vm.handleBlur,
            focus: _vm.handleFocus,
            input: _vm.handleInput
          },
          nativeOn: {
            keydown: [
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "up", 38, $event.key, [
                    "Up",
                    "ArrowUp"
                  ])
                ) {
                  return null
                }
                $event.preventDefault()
                return _vm.increase($event)
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "down", 40, $event.key, [
                    "Down",
                    "ArrowDown"
                  ])
                ) {
                  return null
                }
                $event.preventDefault()
                return _vm.decrease($event)
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                $event.preventDefault()
                return _vm.handleInputEnter($event)
              }
            ]
          }
        },
        [
          _vm.$slots.prepend
            ? _c("template", { slot: "prepend" }, [_vm._t("prepend")], 2)
            : _vm._e(),
          _vm.$slots.append
            ? _c("template", { slot: "append" }, [_vm._t("append")], 2)
            : _vm._e()
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/input-number/src/input-number.vue?vue&type=template&id=42f8cf66&

// EXTERNAL MODULE: external "@/lib/input"
var input_ = __webpack_require__(10);
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// EXTERNAL MODULE: external "@/lib/utils/dom"
var dom_ = __webpack_require__(2);

// EXTERNAL MODULE: external "@/lib/mixins/focus"
var focus_ = __webpack_require__(37);
var focus_default = /*#__PURE__*/__webpack_require__.n(focus_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/input-number/src/input-number.vue?vue&type=script&lang=js&
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



// import debounce from 'throttle-debounce/debounce';


/* harmony default export */ var input_numbervue_type_script_lang_js_ = ({
  name: 'ElInputNumber',
  xtype: 'YuInputNumber',
  mixins: [focus_default()('input')],
  directives: {
    repeatClick: {
      bind: function bind(el, binding, vnode) {
        var interval = null;
        var startTime = void 0;
        var handler = function handler() {
          return vnode.context[binding.expression].apply();
        };
        var clear = function clear() {
          if (new Date() - startTime < 100) {
            handler();
          }
          clearInterval(interval);
          interval = null;
        };
        el.unbindEventListener = function () {
          Object(dom_["off"])(el, 'mousedown', clear);
        };
        Object(dom_["on"])(el, 'mousedown', function () {
          startTime = new Date();
          Object(dom_["once"])(document, 'mouseup', clear);
          clearInterval(interval);
          interval = setInterval(handler, 100);
        });
      },
      unbind: function unbind(el) {
        if (el.unbindEventListener) {
          el.unbindEventListener();
        }
      }
    }
  },
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  components: {
    ElInput: input_default.a
  },
  props: {
    step: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      default: 0
    },
    disabled: Boolean,
    size: String,
    controls: {
      type: Boolean,
      default: true
    },
    debounce: {
      type: Number,
      default: 300
    },
    stepStrictly: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number,
      validator: function validator(val) {
        return val >= 0 && val === parseInt(val, 10);
      }
    },
    name: String,
    label: String,
    placeholder: String
  },
  data: function data() {
    return {
      currentValue: 0,
      userInput: null
    };
  },

  watch: {
    value: {
      immediate: true,
      handler: function handler(value) {
        var newVal = value === undefined ? value : Number(value);
        if (newVal !== undefined) {
          if (isNaN(newVal)) {
            return;
          }

          if (this.stepStrictly) {
            var stepPrecision = this.getPrecision(this.step);
            var precisionFactor = Math.pow(10, stepPrecision);
            newVal = Math.round(newVal / this.step) * precisionFactor * this.step / precisionFactor;
          }

          if (this.precision !== undefined) {
            newVal = this.toPrecision(newVal, this.precision);
          }
        }
        if (newVal >= this.max) newVal = this.max;
        if (newVal <= this.min) newVal = this.min;
        this.currentValue = newVal;
        this.userInput = null;
        this.$emit('input', newVal);
      }
    }
  },
  computed: {
    minDisabled: function minDisabled() {
      return this._decrease(this.value, this.step) < this.min;
    },
    maxDisabled: function maxDisabled() {
      return this._increase(this.value, this.step) > this.max;
    },
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    inputNumberSize: function inputNumberSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputNumberDisabled: function inputNumberDisabled() {
      return this.disabled;
    },
    numPrecision: function numPrecision() {
      var value = this.value,
          step = this.step,
          getPrecision = this.getPrecision,
          precision = this.precision;

      var stepPrecision = getPrecision(step);
      if (precision !== undefined) {
        if (stepPrecision > precision) {
          console.warn('[Element Warn][InputNumber]precision should not be less than the decimal places of step');
        }
        return precision;
      } else {
        return Math.max(getPrecision(value), stepPrecision);
      }
    },
    displayValue: function displayValue() {
      if (this.userInput !== null) {
        return this.userInput;
      }

      var currentValue = this.currentValue;

      if (typeof currentValue === 'number') {
        if (this.stepStrictly) {
          var stepPrecision = this.getPrecision(this.step);
          var precisionFactor = Math.pow(10, stepPrecision);
          currentValue = Math.round(currentValue / this.step) * precisionFactor * this.step / precisionFactor;
        }
        if (this.precision !== undefined) {
          currentValue = currentValue.toFixed(this.precision);
        }
      }

      return currentValue;
    }
  },
  methods: {
    toPrecision: function toPrecision(num, precision) {
      if (precision === undefined) precision = this.numPrecision;
      return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision));
    },
    getPrecision: function getPrecision(value) {
      if (value === undefined) return 0;
      var valueString = value.toString();
      var dotPosition = valueString.indexOf('.');
      var precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    },
    _increase: function _increase(val, step) {
      if (typeof val !== 'number' && val !== undefined) return this.currentValue;

      var precisionFactor = Math.pow(10, this.numPrecision);
      // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
      return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
    },
    _decrease: function _decrease(val, step) {
      if (typeof val !== 'number' && val !== undefined) return this.currentValue;

      var precisionFactor = Math.pow(10, this.numPrecision);

      return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
    },
    increase: function increase() {
      if (this.disabled || this.maxDisabled) return;
      var value = this.value || 0;
      var newVal = this._increase(value, this.step);
      this.setCurrentValue(newVal);
    },
    decrease: function decrease() {
      if (this.disabled || this.minDisabled) return;
      var value = this.value || 0;
      var newVal = this._decrease(value, this.step);
      this.setCurrentValue(newVal);
    },
    handleBlur: function handleBlur(event) {
      this.handleInputEnter();
      this.$emit('blur', event);
    },
    handleFocus: function handleFocus(event) {
      this.$emit('focus', event);
    },
    setCurrentValue: function setCurrentValue(newVal) {
      var oldVal = this.currentValue;
      if (newVal >= this.max) newVal = this.max;
      if (newVal <= this.min) newVal = this.min;
      if (oldVal === newVal) {
        this.$refs.input.setCurrentValue(this.currentValue);
        return;
      }
      this.userInput = null;
      this.$emit('change', newVal, oldVal);
      this.$emit('input', newVal);
      this.currentValue = newVal;
    },
    handleInput: function handleInput(value) {
      this.userInput = value;
    },

    // 输入框失去焦点或用户按下回车时触发
    handleInputEnter: function handleInputEnter() {
      var newVal = this.displayValue === '' ? undefined : Number(this.displayValue);
      if (!isNaN(newVal) || this.displayValue === '') {
        this.setCurrentValue(newVal);
      }
      this.userInput = null;
    },
    select: function select() {
      this.$refs.input.select();
    }
  },
  created: function created() {
    // this.debounceHandleInput = debounce(this.debounce, value => {
    //   this.handleInput(value);
    // });
  }
});
// CONCATENATED MODULE: ./packages/input-number/src/input-number.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_input_numbervue_type_script_lang_js_ = (input_numbervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/input-number/src/input-number.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_input_numbervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/input-number/src/input-number.vue"
/* harmony default export */ var input_number = (component.exports);
// CONCATENATED MODULE: ./packages/input-number/index.js


/* istanbul ignore next */
input_number.install = function (Vue) {
  Vue.component(input_number.name, input_number);
};

/* harmony default export */ var packages_input_number = __webpack_exports__["default"] = (input_number);

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/dom");

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/focus");

/***/ })

/******/ });