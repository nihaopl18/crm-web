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
/******/ 	return __webpack_require__(__webpack_require__.s = 221);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/date-util");

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/dom");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/util");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/vue-popper");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/clickoutside");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("@/lib/input");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/merge");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/time.vue?vue&type=template&id=3d939089&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "el-zoom-in-top" },
      on: {
        "after-leave": function($event) {
          return _vm.$emit("dodestroy")
        }
      }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "el-time-panel el-popover",
          class: _vm.popperClass,
          style: { width: _vm.width + "px" }
        },
        [
          _c(
            "div",
            {
              staticClass: "el-time-panel__content",
              class: { "has-seconds": _vm.showSeconds }
            },
            [
              _c("time-spinner", {
                ref: "spinner",
                attrs: {
                  "arrow-control": _vm.useArrow,
                  "show-seconds": _vm.showSeconds,
                  "am-pm-mode": _vm.amPmMode,
                  date: _vm.date
                },
                on: {
                  change: _vm.handleChange,
                  "select-range": _vm.setSelectionRange
                }
              })
            ],
            1
          ),
          _c("div", { staticClass: "el-time-panel__footer" }, [
            _c(
              "button",
              {
                staticClass: "el-time-panel__btn cancel",
                attrs: { type: "button" },
                on: { click: _vm.handleCancel }
              },
              [_vm._v(_vm._s(_vm.t("el.datepicker.cancel")))]
            ),
            _c(
              "button",
              {
                staticClass: "el-time-panel__btn",
                class: { confirm: !_vm.disabled },
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.handleConfirm()
                  }
                }
              },
              [_vm._v(_vm._s(_vm.t("el.datepicker.confirm")))]
            )
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/panel/time.vue?vue&type=template&id=3d939089&

// EXTERNAL MODULE: external "@/lib/utils/date-util"
var date_util_ = __webpack_require__(0);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: ./packages/date-picker/src/basic/time-spinner.vue + 5 modules
var time_spinner = __webpack_require__(22);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/time.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var timevue_type_script_lang_js_ = ({
  mixins: [locale_default.a],

  components: {
    TimeSpinner: time_spinner["a" /* default */]
  },

  props: {
    visible: Boolean,
    timeArrowControl: Boolean,
    pickerWidth: Number
  },

  watch: {
    visible: function visible(val) {
      var _this = this;

      if (val) {
        this.oldValue = this.value;
        this.$nextTick(function () {
          return _this.$refs.spinner.emitSelectRange('hours');
        });
      } else {
        this.needInitAdjust = true;
      }
    },
    value: function value(newVal) {
      var _this2 = this;

      var date = void 0;
      if (newVal instanceof Date) {
        date = Object(date_util_["limitTimeRange"])(newVal, this.selectableRange, this.format);
      } else if (!newVal) {
        date = this.defaultValue ? new Date(this.defaultValue) : new Date();
      }

      this.date = date;
      if (this.visible && this.needInitAdjust) {
        this.$nextTick(function (_) {
          return _this2.adjustSpinners();
        });
        this.needInitAdjust = false;
      }
    },
    selectableRange: function selectableRange(val) {
      this.$refs.spinner.selectableRange = val;
    },
    defaultValue: function defaultValue(val) {
      if (!Object(date_util_["isDate"])(this.value)) {
        this.date = val ? new Date(val) : new Date();
      }
    },
    pickerWidth: function pickerWidth(val) {
      this.width = val;
    }
  },

  data: function data() {
    return {
      popperClass: '',
      format: 'HH:mm:ss',
      value: '',
      defaultValue: null,
      date: new Date(),
      oldValue: new Date(),
      selectableRange: [],
      selectionRange: [0, 2],
      disabled: false,
      arrowControl: false,
      needInitAdjust: true,
      width: this.pickerWidth || 0
    };
  },


  computed: {
    showSeconds: function showSeconds() {
      return (this.format || '').indexOf('ss') !== -1;
    },
    useArrow: function useArrow() {
      return this.arrowControl || this.timeArrowControl || false;
    },
    amPmMode: function amPmMode() {
      if ((this.format || '').indexOf('A') !== -1) return 'A';
      if ((this.format || '').indexOf('a') !== -1) return 'a';
      return '';
    }
  },

  methods: {
    handleCancel: function handleCancel() {
      this.$emit('pick', this.oldValue, false);
    },
    handleChange: function handleChange(date) {
      // this.visible avoids edge cases, when use scrolls during panel closing animation
      if (this.visible) {
        this.date = Object(date_util_["clearMilliseconds"])(date);
        // if date is out of range, do not emit
        if (this.isValidValue(this.date)) {
          this.$emit('pick', this.date, true);
        }
      }
    },
    setSelectionRange: function setSelectionRange(start, end) {
      this.$emit('select-range', start, end);
      this.selectionRange = [start, end];
    },
    handleConfirm: function handleConfirm() {
      var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var first = arguments[1];

      if (first) return;
      var date = Object(date_util_["clearMilliseconds"])(Object(date_util_["limitTimeRange"])(this.date, this.selectableRange, this.format));
      this.$emit('pick', date, visible, first);
    },
    handleKeydown: function handleKeydown(event) {
      var keyCode = event.keyCode;
      var mapping = { 38: -1, 40: 1, 37: -1, 39: 1 };

      // Left or Right
      if (keyCode === 37 || keyCode === 39) {
        var step = mapping[keyCode];
        this.changeSelectionRange(step);
        event.preventDefault();
        return;
      }

      // Up or Down
      if (keyCode === 38 || keyCode === 40) {
        var _step = mapping[keyCode];
        this.$refs.spinner.scrollDown(_step);
        event.preventDefault();
        return;
      }
    },
    isValidValue: function isValidValue(date) {
      return Object(date_util_["timeWithinRange"])(date, this.selectableRange, this.format);
    },
    adjustSpinners: function adjustSpinners() {
      return this.$refs.spinner.adjustSpinners();
    },
    changeSelectionRange: function changeSelectionRange(step) {
      var list = [0, 3].concat(this.showSeconds ? [6] : []);
      var mapping = ['hours', 'minutes'].concat(this.showSeconds ? ['seconds'] : []);
      var index = list.indexOf(this.selectionRange[0]);
      var next = (index + step + list.length) % list.length;
      this.$refs.spinner.emitSelectRange(mapping[next]);
    }
  },

  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick(function () {
      return _this3.handleConfirm(true, true);
    });
    this.$emit('mounted');
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/panel/time.vue?vue&type=script&lang=js&
 /* harmony default export */ var panel_timevue_type_script_lang_js_ = (timevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/date-picker/src/panel/time.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  panel_timevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/date-picker/src/panel/time.vue"
/* harmony default export */ var time = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@/lib/button");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-helper-vue-jsx-merge-props");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("@/lib/scrollbar");

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/picker.vue?vue&type=template&id=79ae069f&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.ranged
    ? _c(
        "el-input",
        _vm._b(
          {
            directives: [
              {
                name: "clickoutside",
                rawName: "v-clickoutside",
                value: _vm.handleClose,
                expression: "handleClose"
              }
            ],
            ref: "reference",
            staticClass: "el-date-editor",
            class: "el-date-editor--" + _vm.type,
            attrs: {
              readonly:
                !_vm.editable ||
                _vm.readonly ||
                _vm.type === "dates" ||
                _vm.type === "week",
              disabled: _vm.pickerDisabled,
              details: _vm.details,
              size: _vm.pickerSize,
              name: _vm.name,
              placeholder: _vm.placeholder,
              value: _vm.displayValue,
              validateEvent: false
            },
            on: {
              focus: _vm.handleFocus,
              input: function(value) {
                return (_vm.userInput = value)
              },
              change: _vm.handleChange
            },
            nativeOn: {
              keydown: function($event) {
                return _vm.handleKeydown($event)
              },
              mouseenter: function($event) {
                return _vm.handleMouseEnter($event)
              },
              mouseleave: function($event) {
                _vm.showClose = false
              }
            }
          },
          "el-input",
          _vm.firstInputId,
          false
        ),
        [
          _vm.haveTrigger
            ? _c("i", {
                staticClass: "el-input__icon",
                class: [_vm.showClose ? "" + _vm.clearIcon : ""],
                attrs: { slot: "suffix" },
                on: { click: _vm.handleClickIcon },
                slot: "suffix"
              })
            : _vm._e(),
          _c("i", {
            staticClass: "el-input__icon",
            class: _vm.triggerClass,
            attrs: { slot: "suffix" },
            on: { click: _vm.handleFocus },
            slot: "suffix"
          })
        ]
      )
    : !_vm.details
    ? _c(
        "div",
        {
          directives: [
            {
              name: "clickoutside",
              rawName: "v-clickoutside",
              value: _vm.handleClose,
              expression: "handleClose"
            }
          ],
          ref: "reference",
          staticClass: "el-date-editor el-range-editor el-input__inner",
          class: [
            "el-date-editor--" + _vm.type,
            _vm.pickerSize ? "el-range-editor--" + _vm.pickerSize : "",
            _vm.pickerDisabled ? "is-disabled" : "",
            _vm.pickerVisible ? "is-active" : ""
          ],
          on: {
            click: _vm.handleRangeClick,
            mouseenter: _vm.handleMouseEnter,
            mouseleave: function($event) {
              _vm.showClose = false
            },
            keydown: _vm.handleKeydown
          }
        },
        [
          _c(
            "input",
            _vm._b(
              {
                staticClass: "el-range-input",
                attrs: {
                  autocomplete: "off",
                  placeholder: _vm.startPlaceholder,
                  disabled: _vm.pickerDisabled,
                  readonly: !_vm.editable || _vm.readonly,
                  name: _vm.name && _vm.name[0]
                },
                domProps: { value: _vm.displayValue && _vm.displayValue[0] },
                on: {
                  input: _vm.handleStartInput,
                  change: _vm.handleStartChange,
                  focus: _vm.handleFocus
                }
              },
              "input",
              _vm.firstInputId,
              false
            )
          ),
          _vm._t("range-separator", [
            _c("span", { staticClass: "el-range-separator" }, [
              _vm._v(_vm._s(_vm.rangeSeparator))
            ])
          ]),
          _c(
            "input",
            _vm._b(
              {
                staticClass: "el-range-input",
                attrs: {
                  autocomplete: "off",
                  placeholder: _vm.endPlaceholder,
                  disabled: _vm.pickerDisabled,
                  readonly: !_vm.editable || _vm.readonly,
                  name: _vm.name && _vm.name[1]
                },
                domProps: { value: _vm.displayValue && _vm.displayValue[1] },
                on: {
                  input: _vm.handleEndInput,
                  change: _vm.handleEndChange,
                  focus: _vm.handleFocus
                }
              },
              "input",
              _vm.secondInputId,
              false
            )
          ),
          _vm.haveTrigger
            ? _c("i", {
                staticClass: "el-input__icon el-range__close-icon",
                class: [_vm.showClose ? "" + _vm.clearIcon : ""],
                on: { click: _vm.handleClickIcon }
              })
            : _vm._e(),
          _c("i", {
            class: ["el-input__icon", "el-range__icon", _vm.triggerClass]
          })
        ],
        2
      )
    : _c("span", [
        _vm._v(
          _vm._s(
            Array.isArray(_vm.displayValue)
              ? _vm.displayValue.join("-")
              : _vm.displayValue
          )
        )
      ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/picker.vue?vue&type=template&id=79ae069f&

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(8);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: external "@/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(9);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// EXTERNAL MODULE: external "@/lib/utils/date-util"
var date_util_ = __webpack_require__(0);

// EXTERNAL MODULE: external "@/lib/utils/vue-popper"
var vue_popper_ = __webpack_require__(7);
var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "@/lib/input"
var input_ = __webpack_require__(10);
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// EXTERNAL MODULE: external "@/lib/utils/merge"
var merge_ = __webpack_require__(11);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/picker.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









var NewPopper = {
  props: {
    appendToBody: vue_popper_default.a.props.appendToBody,
    offset: vue_popper_default.a.props.offset,
    boundariesPadding: vue_popper_default.a.props.boundariesPadding,
    arrowOffset: vue_popper_default.a.props.arrowOffset
  },
  methods: vue_popper_default.a.methods,
  data: function data() {
    return merge_default()({ visibleArrow: true }, vue_popper_default.a.data);
  },

  beforeDestroy: vue_popper_default.a.beforeDestroy
};

var DEFAULT_FORMATS = {
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  time: 'HH:mm:ss',
  week: 'yyyywWW',
  timerange: 'HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss',
  year: 'yyyy'
};
var HAVE_TRIGGER_TYPES = ['date', 'datetime', 'time', 'time-select', 'week', 'month', 'year', 'daterange', 'monthrange', 'timerange', 'datetimerange', 'dates'];
var pickervue_type_script_lang_js_DATE_FORMATTER = function DATE_FORMATTER(value, format) {
  if (format === 'timestamp') return value.getTime();
  return Object(date_util_["formatDate"])(value, format);
};
var pickervue_type_script_lang_js_DATE_PARSER = function DATE_PARSER(text, format) {
  if (format === 'timestamp') return new Date(Number(text));
  return Object(date_util_["parseDate"])(text, format);
};
var RANGE_FORMATTER = function RANGE_FORMATTER(value, format) {
  if (Array.isArray(value) && value.length === 2) {
    var start = value[0];
    var end = value[1];

    if (start && end) {
      return [pickervue_type_script_lang_js_DATE_FORMATTER(start, format), pickervue_type_script_lang_js_DATE_FORMATTER(end, format)];
    }
  }
  return '';
};
var RANGE_PARSER = function RANGE_PARSER(array, format, separator) {
  if (!Array.isArray(array)) {
    array = array.split(separator);
  }
  if (array.length === 2) {
    var range1 = array[0];
    var range2 = array[1];

    return [pickervue_type_script_lang_js_DATE_PARSER(range1, format), pickervue_type_script_lang_js_DATE_PARSER(range2, format)];
  }
  return [];
};
var TYPE_VALUE_RESOLVER_MAP = {
  default: {
    formatter: function formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser: function parser(text) {
      if (text === undefined || text === '') return null;
      return text;
    }
  },
  week: {
    formatter: function formatter(value, format) {
      var week = Object(date_util_["getWeekNumber"])(value);
      var month = value.getMonth();
      var trueDate = new Date(value);
      if (week === 1 && month === 11) {
        trueDate.setHours(0, 0, 0, 0);
        trueDate.setDate(trueDate.getDate() + 3 - (trueDate.getDay() + 6) % 7);
      }
      var date = Object(date_util_["formatDate"])(trueDate, format);

      date = /WW/.test(date) ? date.replace(/WW/, week < 10 ? '0' + week : week) : date.replace(/W/, week);
      return date;
    },
    parser: function parser(text, format) {
      // parse as if a normal date
      return TYPE_VALUE_RESOLVER_MAP.date.parser(text, format);
    }
  },
  date: {
    formatter: pickervue_type_script_lang_js_DATE_FORMATTER,
    parser: pickervue_type_script_lang_js_DATE_PARSER
  },
  datetime: {
    formatter: pickervue_type_script_lang_js_DATE_FORMATTER,
    parser: pickervue_type_script_lang_js_DATE_PARSER
  },
  daterange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  monthrange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  datetimerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  timerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  time: {
    formatter: pickervue_type_script_lang_js_DATE_FORMATTER,
    parser: pickervue_type_script_lang_js_DATE_PARSER
  },
  month: {
    formatter: pickervue_type_script_lang_js_DATE_FORMATTER,
    parser: pickervue_type_script_lang_js_DATE_PARSER
  },
  year: {
    formatter: pickervue_type_script_lang_js_DATE_FORMATTER,
    parser: pickervue_type_script_lang_js_DATE_PARSER
  },
  number: {
    formatter: function formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser: function parser(text) {
      var result = Number(text);

      if (!isNaN(text)) {
        return result;
      } else {
        return null;
      }
    }
  },
  dates: {
    formatter: function formatter(value, format) {
      return value.map(function (date) {
        return pickervue_type_script_lang_js_DATE_FORMATTER(date, format);
      });
    },
    parser: function parser(value, format) {
      return (typeof value === 'string' ? value.split(', ') : value).map(function (date) {
        return date instanceof Date ? date : pickervue_type_script_lang_js_DATE_PARSER(date, format);
      });
    }
  }
};
var PLACEMENT_MAP = {
  left: 'bottom-start',
  center: 'bottom',
  right: 'bottom-end'
};

var parseAsFormatAndType = function parseAsFormatAndType(value, customFormat, type) {
  var rangeSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '-';

  if (!value) return null;
  var parser = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default']).parser;
  var format = customFormat || DEFAULT_FORMATS[type];
  return parser(value, format, rangeSeparator);
};

var formatAsFormatAndType = function formatAsFormatAndType(value, customFormat, type) {
  if (!value) return null;
  var formatter = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default']).formatter;
  var format = customFormat || DEFAULT_FORMATS[type];
  return formatter(value, format);
};

/*
 * Considers:
 *   1. Date object
 *   2. date string
 *   3. array of 1 or 2
 */
var valueEquals = function valueEquals(a, b) {
  // considers Date object and string
  var dateEquals = function dateEquals(a, b) {
    var aIsDate = a instanceof Date;
    var bIsDate = b instanceof Date;
    if (aIsDate && bIsDate) {
      return a.getTime() === b.getTime();
    }
    if (!aIsDate && !bIsDate) {
      return a === b;
    }
    return false;
  };

  var aIsArray = a instanceof Array;
  var bIsArray = b instanceof Array;
  if (aIsArray && bIsArray) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every(function (item, index) {
      return dateEquals(item, b[index]);
    });
  }
  if (!aIsArray && !bIsArray) {
    return dateEquals(a, b);
  }
  return false;
};

var isString = function isString(val) {
  return typeof val === 'string' || val instanceof String;
};

var validator = function validator(val) {
  // either: String, Array of String, null / undefined
  return val === null || val === undefined || isString(val) || Array.isArray(val) && val.length === 2 && val.every(isString);
};

/* harmony default export */ var pickervue_type_script_lang_js_ = ({
  mixins: [emitter_default.a, NewPopper],

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  props: {
    size: String,
    format: String,
    valueFormat: String,
    readonly: Boolean,
    placeholder: String,
    startPlaceholder: String,
    endPlaceholder: String,
    prefixIcon: String,
    clearIcon: {
      type: String,
      default: 'el-icon-circle-close'
    },
    name: {
      default: '',
      validator: validator
    },
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    id: {
      default: '',
      validator: validator
    },
    popperClass: String,
    editable: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'left'
    },
    value: {},
    defaultValue: {},
    defaultTime: {},
    rangeSeparator: {
      default: '-'
    },
    pickerOptions: {},
    unlinkPanels: Boolean,
    validateEvent: {
      type: Boolean,
      default: true
    },
    // 是否为详情表单模式
    details: Boolean,
    separator: {
      type: String,
      default: ','
    },
    valueType: {
      type: String,
      default: 'array'
    }
  },

  components: { ElInput: input_default.a },

  directives: { Clickoutside: clickoutside_default.a },

  data: function data() {
    return {
      pickerVisible: false,
      showClose: false,
      userInput: null,
      valueOnOpen: null, // value when picker opens, used to determine whether to emit change
      unwatchPickerOptions: null
    };
  },


  watch: {
    pickerVisible: function pickerVisible(val) {
      if (this.readonly || this.pickerDisabled) return;
      if (val) {
        this.showPicker();
        this.valueOnOpen = Array.isArray(this.value) ? [].concat(this.value) : this.value;
        if (this.defaultValue && !this.value) {
          this.$emit('input', this.defaultValue);
        }
      } else {
        this.hidePicker();
        this.emitChange(this.value);
        this.userInput = null;
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.blur');
          this.dispatch('YuXformAbstractItem', 'el.form.blur');
        }
        this.$emit('blur', this);
        this.blur();
      }
    },

    parsedValue: {
      immediate: true,
      handler: function handler(val) {
        if (this.picker) {
          this.picker.value = val;
        }
      }
    },
    defaultValue: function defaultValue(val) {
      // NOTE: should eventually move to jsx style picker + panel ?
      if (this.picker) {
        this.picker.defaultValue = val;
      }
    },
    value: function value(val, oldVal) {
      this.$emit('change', val, oldVal);
      this.emitInput(val);
      if (!valueEquals(val, oldVal) && !this.pickerVisible && this.validateEvent && oldVal !== undefined) {
        this.dispatch('ElFormItem', 'el.form.change', val);
        this.dispatch('YuXformAbstractItem', 'el.form.change', val);
        this.dispatch('YuXtable', 'el.form.change');
      }
    }
  },

  computed: {
    ranged: function ranged() {
      return this.type.indexOf('range') > -1;
    },
    reference: function reference() {
      var reference = this.$refs.reference;
      return reference.$el || reference;
    },
    refInput: function refInput() {
      if (this.reference) {
        return [].slice.call(this.reference.querySelectorAll('input'));
      }
      return [];
    },
    valueIsEmpty: function valueIsEmpty() {
      var val = this.value;
      if (Array.isArray(val)) {
        for (var i = 0, len = val.length; i < len; i++) {
          if (val[i]) {
            return false;
          }
        }
      } else {
        if (val) {
          return false;
        }
      }
      return true;
    },
    triggerClass: function triggerClass() {
      return this.prefixIcon || (this.type.indexOf('time') !== -1 ? 'el-icon-time' : 'el-icon-date');
    },
    selectionMode: function selectionMode() {
      if (this.type === 'week') {
        return 'week';
      } else if (this.type === 'month') {
        return 'month';
      } else if (this.type === 'year') {
        return 'year';
      } else if (this.type === 'dates') {
        return 'dates';
      }

      return 'day';
    },
    haveTrigger: function haveTrigger() {
      if (typeof this.showTrigger !== 'undefined') {
        return this.showTrigger;
      }
      return HAVE_TRIGGER_TYPES.indexOf(this.type) !== -1;
    },
    displayValue: function displayValue() {
      var formattedValue = formatAsFormatAndType(this.parsedValue, this.format, this.type, this.rangeSeparator);
      if (Array.isArray(this.userInput)) {
        return [this.userInput[0] || formattedValue && formattedValue[0] || '', this.userInput[1] || formattedValue && formattedValue[1] || ''];
      } else if (this.userInput !== null) {
        return this.userInput;
      } else if (formattedValue) {
        return this.type === 'dates' ? formattedValue.join(', ') : formattedValue;
      } else {
        return '';
      }
    },
    parsedValue: function parsedValue() {
      if (!this.value) return this.value; // component value is not set
      if (this.type === 'time-select') return this.value; // time-select does not require parsing, this might change in next major version

      var valueIsDateObject = Object(date_util_["isDateObject"])(this.value) || Array.isArray(this.value) && this.value.every(date_util_["isDateObject"]);
      if (valueIsDateObject) {
        return this.value;
      }
      var _val = typeof this.value === 'string' && this.value.indexOf(this.separator) > 0 ? this.value.split(this.separator) : this.value;
      if (this.valueFormat) {
        return parseAsFormatAndType(_val, this.valueFormat, this.type, this.rangeSeparator) || _val;
      }

      // NOTE: deal with common but incorrect usage, should remove in next major version
      // user might provide string / timestamp without value-format, coerce them into date (or array of date)
      return Array.isArray(_val) ? _val.map(function (val) {
        return new Date(val);
      }) : new Date(_val);
    },
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    pickerSize: function pickerSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    pickerDisabled: function pickerDisabled() {
      return this.disabled;
    },
    firstInputId: function firstInputId() {
      var obj = {};
      var id = void 0;
      if (this.ranged) {
        id = this.id && this.id[0];
      } else {
        id = this.id;
      }
      if (id) obj.id = id;
      return obj;
    },
    secondInputId: function secondInputId() {
      var obj = {};
      var id = void 0;
      if (this.ranged) {
        id = this.id && this.id[1];
      }
      if (id) obj.id = id;
      return obj;
    }
  },

  created: function created() {
    // vue-popper
    this.popperOptions = {
      boundariesPadding: 0,
      gpuAcceleration: false
    };
    this.placement = PLACEMENT_MAP[this.align] || PLACEMENT_MAP.left;

    this.$on('fieldReset', this.handleFieldReset);
  },
  destroyed: function destroyed() {
    this.$off();
    this.unwatch && this.unwatch();
  },


  methods: {
    focus: function focus() {
      if (!this.ranged) {
        this.$refs.reference.focus();
      } else {
        this.handleFocus();
      }
    },
    blur: function blur() {
      this.refInput.forEach(function (input) {
        return input.blur();
      });
    },


    // {parse, formatTo} Value deals maps component value with internal Date
    parseValue: function parseValue(value) {
      var isParsed = Object(date_util_["isDateObject"])(value) || Array.isArray(value) && value.every(date_util_["isDateObject"]);
      if (this.valueFormat && !isParsed) {
        return parseAsFormatAndType(value, this.valueFormat, this.type, this.rangeSeparator) || value;
      } else {
        return value;
      }
    },
    formatToValue: function formatToValue(date) {
      var isFormattable = Object(date_util_["isDateObject"])(date) || Array.isArray(date) && date.every(date_util_["isDateObject"]);
      if (this.valueFormat && isFormattable) {
        return formatAsFormatAndType(date, this.valueFormat, this.type, this.rangeSeparator);
      } else {
        return date;
      }
    },


    // {parse, formatTo} String deals with user input
    parseString: function parseString(value) {
      var type = Array.isArray(value) ? this.type : this.type.replace('range', '');
      return parseAsFormatAndType(value, this.format, type);
    },
    formatToString: function formatToString(value) {
      var type = Array.isArray(value) ? this.type : this.type.replace('range', '');
      return formatAsFormatAndType(value, this.format, type);
    },
    handleMouseEnter: function handleMouseEnter() {
      if (this.readonly || this.pickerDisabled) return;
      if (!this.valueIsEmpty && this.clearable) {
        this.showClose = true;
      }
    },
    handleChange: function handleChange() {
      if (this.userInput) {
        var value = this.parseString(this.displayValue);
        if (value) {
          this.picker.value = value;
          if (this.isValidValue(value)) {
            this.emitInput(value);
            this.userInput = null;
          }
        }
      }
      if (this.userInput === '') {
        this.emitInput(null);
        this.emitChange(null);
        this.userInput = null;
      }
    },
    handleStartInput: function handleStartInput(event) {
      if (this.userInput) {
        this.userInput = [event.target.value, this.userInput[1]];
      } else {
        this.userInput = [event.target.value, null];
      }
    },
    handleEndInput: function handleEndInput(event) {
      if (this.userInput) {
        this.userInput = [this.userInput[0], event.target.value];
      } else {
        this.userInput = [null, event.target.value];
      }
    },
    handleStartChange: function handleStartChange(event) {
      var value = this.parseString(this.userInput && this.userInput[0]);
      if (value) {
        this.userInput = [this.formatToString(value), this.displayValue[1]];
        var newValue = [value, this.picker.value && this.picker.value[1]];
        this.picker.value = newValue;
        if (this.isValidValue(newValue)) {
          this.emitInput(newValue);
          this.userInput = null;
        }
      }
    },
    handleEndChange: function handleEndChange(event) {
      var value = this.parseString(this.userInput && this.userInput[1]);
      if (value) {
        this.userInput = [this.displayValue[0], this.formatToString(value)];
        var newValue = [this.picker.value && this.picker.value[0], value];
        this.picker.value = newValue;
        if (this.isValidValue(newValue)) {
          this.emitInput(newValue);
          this.userInput = null;
        }
      }
    },
    handleClickIcon: function handleClickIcon(event) {
      if (this.readonly || this.pickerDisabled) return;
      if (this.showClose) {
        this.valueOnOpen = this.value;
        event.stopPropagation();
        this.emitInput(null);
        this.emitChange(null);
        this.showClose = false;
        if (this.picker && typeof this.picker.handleClear === 'function') {
          this.picker.handleClear();
        }
      } else {
        this.pickerVisible = !this.pickerVisible;
      }
    },
    handleClose: function handleClose() {
      if (!this.pickerVisible) return;
      this.pickerVisible = false;

      if (this.type === 'dates') {
        // restore to former value
        var oldValue = parseAsFormatAndType(this.valueOnOpen, this.valueFormat, this.type, this.rangeSeparator) || this.valueOnOpen;
        this.emitInput(oldValue);
      }
    },
    handleFieldReset: function handleFieldReset(initialValue) {
      this.userInput = initialValue === '' ? null : initialValue;
    },
    handleFocus: function handleFocus() {
      var type = this.type;

      if (HAVE_TRIGGER_TYPES.indexOf(type) !== -1 && !this.pickerVisible) {
        this.pickerVisible = true;
      }
      this.$emit('focus', this);
    },
    handleKeydown: function handleKeydown(event) {
      var _this = this;

      var keyCode = event.keyCode;

      // ESC
      if (keyCode === 27) {
        this.pickerVisible = false;
        event.stopPropagation();
        return;
      }

      // Tab
      if (keyCode === 9) {
        if (!this.ranged) {
          this.handleChange();
          this.pickerVisible = this.picker.visible = false;
          this.blur();
          event.stopPropagation();
        } else {
          // user may change focus between two input
          setTimeout(function () {
            if (_this.refInput.indexOf(document.activeElement) === -1) {
              _this.pickerVisible = false;
              _this.blur();
              event.stopPropagation();
            }
          }, 0);
        }
        return;
      }

      // Enter
      if (keyCode === 13) {
        if (this.userInput === '' || this.isValidValue(this.parseString(this.displayValue))) {
          this.handleChange();
          this.pickerVisible = this.picker.visible = false;
          this.blur();
        }
        event.stopPropagation();
        return;
      }

      // if user is typing, do not let picker handle key input
      if (this.userInput) {
        event.stopPropagation();
        return;
      }

      // delegate other keys to panel
      if (this.picker && this.picker.handleKeydown) {
        this.picker.handleKeydown(event);
      }
    },
    handleRangeClick: function handleRangeClick() {
      var type = this.type;

      if (HAVE_TRIGGER_TYPES.indexOf(type) !== -1 && !this.pickerVisible) {
        this.pickerVisible = true;
      }
      this.$emit('focus', this);
    },
    hidePicker: function hidePicker() {
      if (this.picker) {
        this.picker.resetView && this.picker.resetView();
        this.pickerVisible = this.picker.visible = false;
        this.destroyPopper();
      }
    },
    showPicker: function showPicker() {
      var _this2 = this;

      if (this.$isServer) return;
      if (!this.picker) {
        this.mountPicker();
      }
      this.pickerVisible = this.picker.visible = true;

      this.updatePopper();

      this.picker.value = this.parsedValue;
      this.picker.resetView && this.picker.resetView();

      this.$nextTick(function () {
        _this2.picker.adjustSpinners && _this2.picker.adjustSpinners();
      });
    },
    mountPicker: function mountPicker() {
      var _this3 = this;

      this.picker = new external_vue_default.a(this.panel).$mount();
      this.picker.defaultValue = this.defaultValue;
      this.picker.defaultTime = this.defaultTime;
      this.picker.popperClass = this.popperClass;
      this.popperElm = this.picker.$el;
      this.picker.width = this.reference.getBoundingClientRect().width;
      this.picker.showTime = this.type === 'datetime' || this.type === 'datetimerange';
      this.picker.selectionMode = this.selectionMode;
      this.picker.unlinkPanels = this.unlinkPanels;
      this.picker.arrowControl = this.arrowControl || this.timeArrowControl || false;
      this.unwatch = this.$watch('format', function (format) {
        _this3.picker.format = format;
      });

      var updateOptions = function updateOptions() {
        var options = _this3.pickerOptions;

        if (options && options.selectableRange) {
          var ranges = options.selectableRange;
          var parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
          var format = DEFAULT_FORMATS.timerange;

          ranges = Array.isArray(ranges) ? ranges : [ranges];
          _this3.picker.selectableRange = ranges.map(function (range) {
            return parser(range, format, _this3.rangeSeparator);
          });
        }

        for (var option in options) {
          if (options.hasOwnProperty(option) &&
          // 忽略 time-picker 的该配置项
          option !== 'selectableRange') {
            _this3.picker[option] = options[option];
          }
        }

        // main format must prevail over undocumented pickerOptions.format
        if (_this3.format) {
          _this3.picker.format = _this3.format;
        }
      };
      updateOptions();
      this.unwatchPickerOptions = this.$watch('pickerOptions', function () {
        return updateOptions();
      }, { deep: true });
      this.$el.appendChild(this.picker.$el);
      this.picker.resetView && this.picker.resetView();

      this.picker.$on('dodestroy', this.doDestroy);
      this.picker.$on('pick', function () {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var visible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _this3.userInput = null;
        _this3.pickerVisible = _this3.picker.visible = visible;
        _this3.emitInput(date);
        _this3.picker.resetView && _this3.picker.resetView();
      });

      this.picker.$on('select-range', function (start, end, pos) {
        if (_this3.refInput.length === 0) return;
        if (!pos || pos === 'min') {
          _this3.refInput[0].setSelectionRange(start, end);
          _this3.refInput[0].focus();
        } else if (pos === 'max') {
          _this3.refInput[1].setSelectionRange(start, end);
          _this3.refInput[1].focus();
        }
      });
    },
    unmountPicker: function unmountPicker() {
      if (this.picker) {
        this.picker.$destroy();
        this.picker.$off();
        if (typeof this.unwatchPickerOptions === 'function') {
          this.unwatchPickerOptions();
        }
        this.picker.$el.parentNode && this.picker.$el.parentNode.removeChild(this.picker.$el);
      }
    },
    emitChange: function emitChange(val) {
      // determine user real change only
      if (!valueEquals(val, this.valueOnOpen)) {
        // this.$emit('change', val);
        this.valueOnOpen = val;
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', val);
          this.dispatch('YuXformAbstractItem', 'el.form.change', val);
          this.dispatch('YuXtable', 'el.form.change');
        }
      }
    },
    emitInput: function emitInput(val) {
      var formatted = this.formatToValue(val);
      if (!valueEquals(this.value, formatted)) {
        formatted = Array.isArray(formatted) && this.valueType === 'string' ? formatted.join(this.separator) : formatted;
        this.$emit('input', formatted);
      }
    },
    isValidValue: function isValidValue(value) {
      if (!this.picker) {
        this.mountPicker();
      }
      if (this.picker.isValidValue) {
        return value && this.picker.isValidValue(value);
      } else {
        return true;
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/picker.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_pickervue_type_script_lang_js_ = (pickervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/date-picker/src/picker.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_pickervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/date-picker/src/picker.vue"
/* harmony default export */ var picker = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/input/src/input.vue?vue&type=template&id=343dd774&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: [
        _vm.type === "textarea" ? "el-textarea" : "el-input",
        _vm.inputSize ? "el-input--" + _vm.inputSize : "",
        {
          "is-disabled": _vm.inputDisabled,
          "is-exceed": _vm.inputExceed,
          "el-input-group": _vm.$slots.prepend || _vm.$slots.append,
          "el-input-group--append": _vm.$slots.append,
          "el-input-group--prepend": _vm.$slots.prepend,
          "el-input--prefix": _vm.$slots.prefix || _vm.prefixIcon,
          "el-input--suffix":
            _vm.$slots.suffix ||
            _vm.suffixIcon ||
            _vm.clearable ||
            _vm.showPassword
        }
      ]
    },
    [
      !_vm.details
        ? _c(
            "div",
            {
              style: { "line-height": _vm.divStyle },
              on: {
                mouseenter: function($event) {
                  _vm.hovering = true
                },
                mouseleave: function($event) {
                  _vm.hovering = false
                }
              }
            },
            [
              _c(
                "div",
                {
                  class: [
                    {
                      "el-input-group":
                        _vm.$slots.prepend || _vm.$slots.append || _vm.unit,
                      "el-input-group--append": _vm.$slots.append || _vm.unit,
                      "el-input-group--prepend": _vm.$slots.prepend
                    }
                  ]
                },
                [
                  _vm.type !== "textarea"
                    ? [
                        _vm.$slots.prepend
                          ? _c(
                              "div",
                              { staticClass: "el-input-group__prepend" },
                              [
                                _vm._t("prepend"),
                                _vm.needPlaceholder &&
                                _vm.placeholder != "" &&
                                (_vm.value == "" || _vm.value == undefined)
                                  ? _c(
                                      "span",
                                      {
                                        staticClass:
                                          "el-placeholder el-prependPlaceholder",
                                        on: { click: _vm.placeholderClick }
                                      },
                                      [
                                        _vm._v(
                                          "\n          " +
                                            _vm._s(_vm.placeholder) +
                                            "\n        "
                                        )
                                      ]
                                    )
                                  : _vm._e()
                              ],
                              2
                            )
                          : _vm._e(),
                        _vm._t("icon", [
                          _vm.icon
                            ? _c("i", {
                                staticClass: "el-input__icon el-icon",
                                class: [
                                  _vm.icon === "search"
                                    ? "yu-icon-search1"
                                    : "el-icon-" + _vm.icon,
                                  _vm.onIconClick ? "is-clickable" : ""
                                ],
                                on: { click: _vm.handleIconClick }
                              })
                            : _vm._e()
                        ]),
                        _c(
                          "input",
                          _vm._b(
                            {
                              ref: "input",
                              staticClass: "el-input__inner",
                              attrs: {
                                type: _vm.showPassword
                                  ? _vm.passwordVisible
                                    ? "text"
                                    : "password"
                                  : _vm.type,
                                autocomplete: _vm.autoComplete,
                                tabindex: _vm.tabindex,
                                disabled: _vm.inputDisabled,
                                "aria-label": _vm.label
                              },
                              domProps: { value: _vm.currentValue },
                              on: {
                                input: function($event) {
                                  $event.stopPropagation()
                                  return _vm.handleInput($event)
                                },
                                focus: function($event) {
                                  $event.stopPropagation()
                                  return _vm.handleFocus($event)
                                },
                                blur: function($event) {
                                  $event.stopPropagation()
                                  return _vm.handleBlur($event)
                                },
                                keyup: [
                                  function($event) {
                                    if (
                                      !$event.type.indexOf("key") &&
                                      _vm._k(
                                        $event.keyCode,
                                        "delete",
                                        [8, 46],
                                        $event.key,
                                        ["Backspace", "Delete", "Del"]
                                      )
                                    ) {
                                      return null
                                    }
                                    return _vm.inputFix($event)
                                  },
                                  function($event) {
                                    if (
                                      !$event.type.indexOf("key") &&
                                      $event.keyCode !== 88
                                    ) {
                                      return null
                                    }
                                    if (!$event.ctrlKey) {
                                      return null
                                    }
                                    return _vm.inputFix($event)
                                  }
                                ]
                              }
                            },
                            "input",
                            _vm.$props,
                            false
                          )
                        ),
                        _vm.account
                          ? _c("div", { staticClass: "el-input_account" }, [
                              _c("span", [
                                _vm._v(_vm._s(_vm.currentValue.length))
                              ]),
                              _vm.maxlength ? _c("i", [_vm._v("/")]) : _vm._e(),
                              _c("span", [_vm._v(_vm._s(_vm.maxlength))])
                            ])
                          : _vm._e(),
                        _vm.notice
                          ? _c("div", { staticClass: "el-input_notice" }, [
                              _c("span", [_vm._v(_vm._s(_vm.prompt))])
                            ])
                          : _vm._e(),
                        _vm.$slots.prefix || _vm.prefixIcon
                          ? _c(
                              "span",
                              { staticClass: "el-input__prefix" },
                              [
                                _vm._t("prefix"),
                                _vm.prefixIcon
                                  ? _c("i", {
                                      staticClass: "el-input__icon",
                                      class: _vm.prefixIcon,
                                      on: { click: _vm.prefixClick }
                                    })
                                  : _vm._e()
                              ],
                              2
                            )
                          : _vm._e(),
                        _vm.getSuffixVisible()
                          ? _c("span", { staticClass: "el-input__suffix" }, [
                              _c(
                                "span",
                                { staticClass: "el-input__suffix-inner" },
                                [
                                  _vm.showClear
                                    ? _c("i", {
                                        staticClass:
                                          "el-input__icon el-icon-circle-close el-input__clear",
                                        on: { click: _vm.clear }
                                      })
                                    : _vm._e(),
                                  !_vm.showClear ||
                                  !_vm.showPwdVisible ||
                                  !_vm.isWordLimitVisible
                                    ? [
                                        _vm._t("suffix"),
                                        _vm.suffixIcon
                                          ? _c("i", {
                                              staticClass: "el-input__icon",
                                              class: _vm.suffixIcon,
                                              on: { click: _vm.suffixClick }
                                            })
                                          : _vm._e()
                                      ]
                                    : _vm._e(),
                                  _vm.showPwdVisible
                                    ? _c("i", {
                                        staticClass:
                                          "el-input__icon el-input__clear",
                                        class: _vm.passwordVisible
                                          ? "yu-icon-eye"
                                          : "yu-icon-eye-close",
                                        on: { click: _vm.handlePasswordVisible }
                                      })
                                    : _vm._e(),
                                  _vm.isWordLimitVisible
                                    ? _c(
                                        "span",
                                        { staticClass: "el-input__count" },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "el-input__count-inner"
                                            },
                                            [
                                              _vm._v(
                                                "\n            " +
                                                  _vm._s(_vm.textLength) +
                                                  "/" +
                                                  _vm._s(_vm.upperLimit) +
                                                  "\n          "
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    : _vm._e()
                                ],
                                2
                              ),
                              _vm.validateState
                                ? _c("i", {
                                    staticClass: "el-input__icon",
                                    class: [
                                      "el-input__validateIcon",
                                      _vm.validateIcon
                                    ]
                                  })
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm.unit || _vm.$slots.append
                          ? _c(
                              "div",
                              { staticClass: "el-input-group__append" },
                              [
                                _vm._t("append"),
                                _vm.unit
                                  ? _c("span", [_vm._v(_vm._s(_vm.unit))])
                                  : _vm._e()
                              ],
                              2
                            )
                          : _vm._e()
                      ]
                    : _c(
                        "textarea",
                        _vm._b(
                          {
                            ref: "textarea",
                            staticClass: "el-textarea__inner",
                            style: _vm.textareaStyle,
                            attrs: {
                              tabindex: _vm.tabindex,
                              disabled: _vm.inputDisabled,
                              "aria-label": _vm.label
                            },
                            domProps: { value: _vm.currentValue },
                            on: {
                              input: function($event) {
                                $event.stopPropagation()
                                return _vm.handleInput($event)
                              },
                              focus: function($event) {
                                $event.stopPropagation()
                                return _vm.handleFocus($event)
                              },
                              blur: function($event) {
                                $event.stopPropagation()
                                return _vm.handleBlur($event)
                              },
                              keyup: [
                                function($event) {
                                  if (
                                    !$event.type.indexOf("key") &&
                                    _vm._k(
                                      $event.keyCode,
                                      "delete",
                                      [8, 46],
                                      $event.key,
                                      ["Backspace", "Delete", "Del"]
                                    )
                                  ) {
                                    return null
                                  }
                                  return _vm.inputFix($event)
                                },
                                function($event) {
                                  if (
                                    !$event.type.indexOf("key") &&
                                    $event.keyCode !== 88
                                  ) {
                                    return null
                                  }
                                  if (!$event.ctrlKey) {
                                    return null
                                  }
                                  return _vm.inputFix($event)
                                }
                              ]
                            }
                          },
                          "textarea",
                          _vm.$props,
                          false
                        )
                      ),
                  _vm.isWordLimitVisible && _vm.type === "textarea"
                    ? _c("span", { staticClass: "el-input__count" }, [
                        _vm._v(
                          _vm._s(_vm.textLength) + "/" + _vm._s(_vm.upperLimit)
                        )
                      ])
                    : _vm._e()
                ],
                2
              ),
              _vm.needPlaceholder &&
              !_vm.$slots.prepend &&
              _vm.placeholder != "" &&
              (_vm.value == "" || _vm.value == undefined)
                ? _c(
                    "span",
                    {
                      class: [
                        _vm.type === "textarea"
                          ? "el-placeholder el-textareaPlaceholder"
                          : "el-placeholder"
                      ],
                      on: { click: _vm.placeholderClick }
                    },
                    [_vm._v("\n    " + _vm._s(_vm.placeholder) + "\n  ")]
                  )
                : _vm._e()
            ]
          )
        : _vm._e(),
      _vm.details ? _c("span", [_vm._v(_vm._s(_vm.currentValue))]) : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/input/src/input.vue?vue&type=template&id=343dd774&

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// CONCATENATED MODULE: ./packages/input/src/calcTextareaHeight.js
var hiddenTextarea = void 0;

var HIDDEN_STYLE = '\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n';

var CONTEXT_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];

function calculateNodeStyling(targetElement) {
  var style = window.getComputedStyle(targetElement);

  var boxSizing = style.getPropertyValue('box-sizing');

  var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));

  var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));

  var contextStyle = CONTEXT_STYLE.map(function (name) {
    return name + ':' + style.getPropertyValue(name);
  }).join(';');

  return { contextStyle: contextStyle, paddingSize: paddingSize, borderSize: borderSize, boxSizing: boxSizing };
}

function calcTextareaHeight(targetElement) {
  var minRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var maxRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  var _calculateNodeStyling = calculateNodeStyling(targetElement),
      paddingSize = _calculateNodeStyling.paddingSize,
      borderSize = _calculateNodeStyling.borderSize,
      boxSizing = _calculateNodeStyling.boxSizing,
      contextStyle = _calculateNodeStyling.contextStyle;

  hiddenTextarea.setAttribute('style', contextStyle + ';' + HIDDEN_STYLE);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';

  var height = hiddenTextarea.scrollHeight;
  var result = {};

  if (boxSizing === 'border-box') {
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize;
  }

  hiddenTextarea.value = '';
  var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null) {
    var minHeight = singleRowHeight * minRows;
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = minHeight + 'px';
  }
  if (maxRows !== null) {
    var maxHeight = singleRowHeight * maxRows;
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = height + 'px';
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
};
// EXTERNAL MODULE: external "@/lib/utils/merge"
var merge_ = __webpack_require__(11);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/input/src/input.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var inputvue_type_script_lang_js_ = ({
  name: 'ElInput',
  xtype: 'YuInput',

  componentName: 'ElInput',

  mixins: [emitter_default.a],

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
      focused: false,
      hasInput: false,
      hasInit: false,
      hovering: false,
      passwordVisible: false,
      prompt: this.notice,
      currentValue: this.value,
      textareaCalcStyle: {},
      needPlaceholder: !('placeholder' in document.createElement('input'))
    };
  },


  props: {
    // 输入框单位
    unit: String,
    value: [String, Number],
    placeholder: String,
    notice: String,
    limitChar: {
      type: RegExp,
      default: function _default() {
        // 中文：\u4e00-\u9fa5
        // 字母大小写、数字：A-Za-z0-9
        // \x21-\x2f：! " # $ % & ` ( ) * + , - . /、
        // \x3a-\x40：: ; < = > ? @
        // \x5b-\x60：[ \ ] ^ _ '
        // \x7B-\x7F：{ | } ~ del
        // 中文顿号: 、
        // 中文常用标点符号 ￥‘’
        // 国外/新疆人名中间的分割点: \·
        // 中文常用标点符号
        // 空格
        return (/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\、\——\；\，\。\、\￥\‘\’\·\“\”\<\>\！\？\：\【\】]{1,}/g
        );
      }
    },
    size: String,
    resize: String,
    readonly: Boolean,
    autofocus: Boolean,
    icon: String,
    account: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows: {
      type: Number,
      default: 2
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    form: String,
    maxlength: [String, Number],
    minlength: [String, Number],
    max: {},
    min: {},
    step: {},
    validateEvent: {
      type: Boolean,
      default: true
    },
    onIconClick: Function,
    formatter: Function,
    digit: Number,
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: String,
    details: Boolean,
    // 用与控制禁用时，是否触发图标点击事件
    trigerClick: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    validating: function validating() {
      return this.$parent.validateState === 'validating';
    },
    validateState: function validateState() {
      return this.elFormItem ? this.elFormItem.validateState : '';
    },
    textareaStyle: function textareaStyle() {
      return merge_default()({}, this.textareaCalcStyle, { resize: this.resize });
    },
    validateIcon: function validateIcon() {
      return {
        validating: 'el-icon-loading',
        success: 'el-icon-circle-check',
        error: 'el-icon-circle-close'
      }[this.validateState];
    },
    nativeInputValue: function nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    },
    needStatusIcon: function needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false;
    },
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    inputSize: function inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputDisabled: function inputDisabled() {
      return this.disabled;
    },
    showClear: function showClear() {
      return this.clearable && !this.inputDisabled && !this.readonly && this.nativeInputValue && (this.focused || this.hovering);
    },
    showPwdVisible: function showPwdVisible() {
      return this.showPassword && !this.inputDisabled && !this.readonly && (!!this.nativeInputValue || this.focused);
    },
    isWordLimitVisible: function isWordLimitVisible() {
      return this.showWordLimit && this.maxlength && (this.type === 'text' || this.type === 'textarea') && !this.inputDisabled && !this.readonly && !this.showPassword;
    },
    upperLimit: function upperLimit() {
      return this.maxlength;
    },
    textLength: function textLength() {
      if (typeof this.value === 'number') {
        return String(this.value).length;
      }

      return (this.value || '').length;
    },
    inputExceed: function inputExceed() {
      // show exceed style if length of initial value greater then maxlength
      return this.isWordLimitVisible && this.textLength > this.upperLimit;
    },

    // created by taoting1
    // 解决ie9中，label与 输入框append模式 不对齐的bug
    divStyle: function divStyle() {
      return this.$slots.prepend || this.$slots.append || this.unit ? 'normal' : 'inherit';
    }
  },

  watch: {
    'value': function value(val, oldValue) {
      if (val && this.limitChar && typeof val === 'string' && this.type !== 'num') {
        val = val.replace(this.limitChar, '');
      }
      // 数值类型输入框，输入不正确字符时，强制设置为输入前正确的值。但初始值为undefined时，会进入死循环。故加不等于undefined的判断。
      if (this.type === 'num' && val !== '' && !/^[-\d\.\,]*$/.test(val) && val !== undefined && val !== null) {
        this.$emit('input', oldValue);
      }
      this.setCurrentValue(val);
      if (this.type === 'num' && !this.hasInput) {
        this.formatterFn();
      }
      val === '' ? this.prompt = this.notice : this.prompt = '';
      var nVal = this.type === 'num' && val !== '' ? Number(val) : val;
      this.$emit('change', nVal, oldValue);
    }
  },

  methods: {
    prefixClick: function prefixClick(event) {
      this.$emit('prefix-click', event);
    },
    suffixClick: function suffixClick(event) {
      this.$emit('suffix-click', event);
    },
    formatterFn: function formatterFn() {
      var val = this.value;
      if (this.type === 'num' && this.value !== '' && this.value) {
        if (this.formatter) {
          if (this.digit) {
            val = this.formatter(this.value, this.digit);
          } else {
            val = this.formatter(this.value);
          }
        }
      }
      this.setCurrentValue(val);
    },
    inputFix: function inputFix(event) {
      if (!('placeholder' in document.createElement('input'))) {
        if (event.keyCode === 8 || event.keyCode === 46 || event.ctrlKey && event.keyCode === 88) {
          this.handleInput(event);
        }
      }
    },
    placeholderClick: function placeholderClick(event) {
      if (this.$parent.$el.className.indexOf('el-select') > -1 && !this.disabled || !(this.disabled || this.readonly)) {
        this.handleFocus(event);
        this.$refs.input ? this.$refs.input.focus() : this.$refs.textarea.focus();
      }
    },
    handleBlur: function handleBlur(event) {
      this.focused = false;
      this.hasInput = false;
      if (this.currentValue && this.limitChar && typeof this.currentValue === 'string') {
        event.target.value = this.currentValue.replace(this.limitChar, '');
      }
      // 去除前后空格
      var value = event.target.value === '' ? '' : event.target.value.trim();
      if (value !== event.target.value) {
        this.$emit('input', value);
      }
      // 金额格式化
      if (this.type === 'num') {
        if (value !== '' && /^[-\d\.\,]*$/.test(value)) {
          if (this.formatter) {
            if (this.digit) {
              this.$emit('input', Number(parseFloat(value + '').toFixed(this.digit)));
              value = this.formatter(value, this.digit);
            } else {
              value = this.formatter(value);
            }
          }
        } else {
          this.$emit('input', value);
        }
      }
      value === '' ? this.prompt = this.notice : this.prompt = '';
      this.setCurrentValue(value);
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.prompt = '';
        this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
        this.dispatch('YuXformAbstractItem', 'el.form.blur', [this.currentValue]);
      }
    },
    inputSelect: function inputSelect() {
      this.$refs.input.select();
    },
    resizeTextarea: function resizeTextarea() {
      if (this.$isServer) return;
      var autosize = this.autosize,
          type = this.type;

      if (type !== 'textarea') return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        };
        return;
      }
      var minRows = autosize.minRows;
      var maxRows = autosize.maxRows;

      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    },
    handleFocus: function handleFocus(event) {
      this.focused = true;
      this.hasInput = false;
      var value = event.target.value;
      if (this.type === 'num' && value !== '' && /^[-\d\.\,]*$/.test(value) && this.formatter) {
        var val = this.value;
        this.setCurrentValue(val);
      }
      this.prompt = '';
      this.$emit('focus', event);
    },
    handleInput: function handleInput(event) {
      this.hasInput = true;
      // 处理输入字符首尾去除空格不完全问题
      // var value = event.target.value.trim();
      var value = event.target.value;
      // if (this.type === 'num' && value !== '' && /^[-\d\.\,]*$/.test(value)) {
      //   value = Number(value);
      // }
      this.$emit('input', value);
      this.setCurrentValue(value);
      // 会触发watch，watch中已处理change，顾删除改处（目前情况是会触发两次change）
      // this.$emit('change', value);
    },
    iconClick: function iconClick(event) {
      if (this.onIconClick) {
        this.onIconClick(event);
      }
      this.$emit('click', event);
    },
    handleIconClick: function handleIconClick(event) {
      if (this.disabled) {
        if (this.trigerClick) {
          this.iconClick(event);
        } else {
          return;
        }
      } else {
        this.iconClick(event);
      }
    },
    setCurrentValue: function setCurrentValue(value) {
      var _this2 = this;

      if (value === this.currentValue) return;
      // 输入框多个操作可触发此设值函数,所以在此去除前后空格
      if (this.validateEvent && this.currentValue !== undefined) {
        this.prompt = '';
        this.dispatch('YuXtable', 'el.form.change');
        this.dispatch('ElFormItem', 'el.form.change', [value]);
        this.dispatch('YuXformAbstractItem', 'el.form.change', [value]);
      }
      this.$nextTick(function () {
        _this2.resizeTextarea();
      });
      this.currentValue = value;
    },
    getInput: function getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    focus: function focus() {
      this.getInput().focus();
    },
    blur: function blur() {
      this.getInput().blur();
    },
    select: function select() {
      this.getInput().select();
    },
    handlePasswordVisible: function handlePasswordVisible() {
      var _this = this;
      this.passwordVisible = !this.passwordVisible;
      // focus在这里可能是有延迟的，人工设一个为0的定时器，做延时处理
      setTimeout(function () {
        _this.focus();
      }, 0);
    },
    getSuffixVisible: function getSuffixVisible() {
      return this.$slots.suffix || this.suffixIcon || this.showClear || this.showPassword || this.isWordLimitVisible || this.validateState && this.needStatusIcon;
    },
    clear: function clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    }
  },
  destroyed: function destroyed() {
    this.$off();
  },
  created: function created() {
    this.$on('inputSelect', this.inputSelect);
  },
  mounted: function mounted() {
    if (this.value || this.value === 0) {
      this.$nextTick(function () {
        this.$emit('change', this.value);
      });
    }
    this.resizeTextarea();
    this.formatterFn();
    if (this.autofocus) {
      this.focus();
    }
  }
});
// CONCATENATED MODULE: ./packages/input/src/input.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_inputvue_type_script_lang_js_ = (inputvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/input/src/input.vue?vue&type=style&index=0&lang=css&
var inputvue_type_style_index_0_lang_css_ = __webpack_require__(49);

// EXTERNAL MODULE: ./packages/input/src/input.vue?vue&type=style&index=1&lang=css&
var inputvue_type_style_index_1_lang_css_ = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/input/src/input.vue







/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_inputvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/input/src/input.vue"
/* harmony default export */ var input = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("throttle-debounce");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(50);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(24)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(52);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(24)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/date");

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/time-spinner.vue?vue&type=template&id=1facadeb&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "el-time-spinner",
      class: { "has-seconds": _vm.showSeconds }
    },
    [
      !_vm.arrowControl
        ? [
            _c(
              "el-scrollbar",
              {
                ref: "hours",
                staticClass: "el-time-spinner__wrapper",
                attrs: {
                  "wrap-style": "max-height: inherit;",
                  "view-class": "el-time-spinner__list",
                  noresize: "",
                  tag: "ul"
                },
                nativeOn: {
                  mouseenter: function($event) {
                    return _vm.emitSelectRange("hours")
                  },
                  mousemove: function($event) {
                    return _vm.adjustCurrentSpinner("hours")
                  }
                }
              },
              _vm._l(_vm.hoursList, function(disabled, hour) {
                return _c(
                  "li",
                  {
                    key: "hours_" + hour,
                    staticClass: "el-time-spinner__item",
                    class: { active: hour === _vm.hours, disabled: disabled },
                    on: {
                      click: function($event) {
                        $event.stopPropagation()
                        return _vm.handleClick("hours", {
                          value: hour,
                          disabled: disabled
                        })
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n        " +
                        _vm._s(
                          ("0" + (_vm.amPmMode ? hour % 12 || 12 : hour)).slice(
                            -2
                          )
                        ) +
                        _vm._s(_vm.amPm(hour)) +
                        "\n      "
                    )
                  ]
                )
              }),
              0
            ),
            _c(
              "el-scrollbar",
              {
                ref: "minutes",
                staticClass: "el-time-spinner__wrapper",
                attrs: {
                  "wrap-style": "max-height: inherit;",
                  "view-class": "el-time-spinner__list",
                  noresize: "",
                  tag: "ul"
                },
                nativeOn: {
                  mouseenter: function($event) {
                    return _vm.emitSelectRange("minutes")
                  },
                  mousemove: function($event) {
                    return _vm.adjustCurrentSpinner("minutes")
                  }
                }
              },
              _vm._l(_vm.minutesList, function(enabled, key) {
                return _c(
                  "li",
                  {
                    key: "minutes_" + key,
                    staticClass: "el-time-spinner__item",
                    class: { active: key === _vm.minutes, disabled: !enabled },
                    on: {
                      click: function($event) {
                        $event.stopPropagation()
                        return _vm.handleClick("minutes", {
                          value: key,
                          disabled: false
                        })
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n        " + _vm._s(("0" + key).slice(-2)) + "\n      "
                    )
                  ]
                )
              }),
              0
            ),
            _c(
              "el-scrollbar",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.showSeconds,
                    expression: "showSeconds"
                  }
                ],
                ref: "seconds",
                staticClass: "el-time-spinner__wrapper",
                attrs: {
                  "wrap-style": "max-height: inherit;",
                  "view-class": "el-time-spinner__list",
                  noresize: "",
                  tag: "ul"
                },
                nativeOn: {
                  mouseenter: function($event) {
                    return _vm.emitSelectRange("seconds")
                  },
                  mousemove: function($event) {
                    return _vm.adjustCurrentSpinner("seconds")
                  }
                }
              },
              _vm._l(60, function(second, key) {
                return _c(
                  "li",
                  {
                    key: "second_" + key,
                    staticClass: "el-time-spinner__item",
                    class: { active: key === _vm.seconds },
                    on: {
                      click: function($event) {
                        $event.stopPropagation()
                        return _vm.handleClick("seconds", {
                          value: key,
                          disabled: false
                        })
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n        " + _vm._s(("0" + key).slice(-2)) + "\n      "
                    )
                  ]
                )
              }),
              0
            )
          ]
        : _vm._e(),
      _vm.arrowControl
        ? [
            _c(
              "div",
              {
                staticClass: "el-time-spinner__wrapper is-arrow",
                on: {
                  mouseenter: function($event) {
                    return _vm.emitSelectRange("hours")
                  }
                }
              },
              [
                _c("i", {
                  directives: [
                    {
                      name: "repeat-click",
                      rawName: "v-repeat-click",
                      value: _vm.decrease,
                      expression: "decrease"
                    }
                  ],
                  staticClass: "el-time-spinner__arrow el-icon-arrow-up"
                }),
                _c("i", {
                  directives: [
                    {
                      name: "repeat-click",
                      rawName: "v-repeat-click",
                      value: _vm.increase,
                      expression: "increase"
                    }
                  ],
                  staticClass: "el-time-spinner__arrow el-icon-arrow-down"
                }),
                _c(
                  "ul",
                  { ref: "hours", staticClass: "el-time-spinner__list" },
                  _vm._l(_vm.arrowHourList, function(hour, key) {
                    return _c(
                      "li",
                      {
                        key: "hour_" + key,
                        staticClass: "el-time-spinner__item",
                        class: {
                          active: hour === _vm.hours,
                          disabled: _vm.hoursList[hour]
                        }
                      },
                      [
                        _vm._v(
                          "\n          " +
                            _vm._s(
                              hour === undefined
                                ? ""
                                : (
                                    "0" +
                                    (_vm.amPmMode ? hour % 12 || 12 : hour)
                                  ).slice(-2) + _vm.amPm(hour)
                            ) +
                            "\n        "
                        )
                      ]
                    )
                  }),
                  0
                )
              ]
            ),
            _c(
              "div",
              {
                staticClass: "el-time-spinner__wrapper is-arrow",
                on: {
                  mouseenter: function($event) {
                    return _vm.emitSelectRange("minutes")
                  }
                }
              },
              [
                _c("i", {
                  directives: [
                    {
                      name: "repeat-click",
                      rawName: "v-repeat-click",
                      value: _vm.decrease,
                      expression: "decrease"
                    }
                  ],
                  staticClass: "el-time-spinner__arrow el-icon-arrow-up"
                }),
                _c("i", {
                  directives: [
                    {
                      name: "repeat-click",
                      rawName: "v-repeat-click",
                      value: _vm.increase,
                      expression: "increase"
                    }
                  ],
                  staticClass: "el-time-spinner__arrow el-icon-arrow-down"
                }),
                _c(
                  "ul",
                  { ref: "minutes", staticClass: "el-time-spinner__list" },
                  _vm._l(_vm.arrowMinuteList, function(minute, key) {
                    return _c(
                      "li",
                      {
                        key: "minute_" + key,
                        staticClass: "el-time-spinner__item",
                        class: { active: minute === _vm.minutes }
                      },
                      [
                        _vm._v(
                          "\n          " +
                            _vm._s(
                              minute === undefined
                                ? ""
                                : ("0" + minute).slice(-2)
                            ) +
                            "\n        "
                        )
                      ]
                    )
                  }),
                  0
                )
              ]
            ),
            _vm.showSeconds
              ? _c(
                  "div",
                  {
                    staticClass: "el-time-spinner__wrapper is-arrow",
                    on: {
                      mouseenter: function($event) {
                        return _vm.emitSelectRange("seconds")
                      }
                    }
                  },
                  [
                    _c("i", {
                      directives: [
                        {
                          name: "repeat-click",
                          rawName: "v-repeat-click",
                          value: _vm.decrease,
                          expression: "decrease"
                        }
                      ],
                      staticClass: "el-time-spinner__arrow el-icon-arrow-up"
                    }),
                    _c("i", {
                      directives: [
                        {
                          name: "repeat-click",
                          rawName: "v-repeat-click",
                          value: _vm.increase,
                          expression: "increase"
                        }
                      ],
                      staticClass: "el-time-spinner__arrow el-icon-arrow-down"
                    }),
                    _c(
                      "ul",
                      { ref: "seconds", staticClass: "el-time-spinner__list" },
                      _vm._l(_vm.arrowSecondList, function(second, key) {
                        return _c(
                          "li",
                          {
                            key: "second_" + key,
                            staticClass: "el-time-spinner__item",
                            class: { active: second === _vm.seconds }
                          },
                          [
                            _vm._v(
                              "\n          " +
                                _vm._s(
                                  second === undefined
                                    ? ""
                                    : ("0" + second).slice(-2)
                                ) +
                                "\n        "
                            )
                          ]
                        )
                      }),
                      0
                    )
                  ]
                )
              : _vm._e()
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/basic/time-spinner.vue?vue&type=template&id=1facadeb&

// EXTERNAL MODULE: external "@/lib/utils/date-util"
var date_util_ = __webpack_require__(0);

// EXTERNAL MODULE: external "@/lib/scrollbar"
var scrollbar_ = __webpack_require__(15);
var scrollbar_default = /*#__PURE__*/__webpack_require__.n(scrollbar_);

// EXTERNAL MODULE: external "@/lib/utils/dom"
var dom_ = __webpack_require__(2);

// CONCATENATED MODULE: ./src/directives/repeat-click.js


/* harmony default export */ var repeat_click = ({
  bind: function bind(el, binding, vnode) {
    var interval = null;
    var startTime = void 0;
    var handler = function handler() {
      return vnode.context[binding.expression].apply();
    };
    var clear = function clear() {
      if (Date.now() - startTime < 100) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };
    el.unbindEventListener = function () {
      Object(dom_["off"])(el, 'mousedown', clear);
    };
    Object(dom_["on"])(el, 'mousedown', function (e) {
      if (e.button !== 0) return;
      startTime = Date.now();
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
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/time-spinner.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var time_spinnervue_type_script_lang_js_ = ({
  components: { ElScrollbar: scrollbar_default.a },

  directives: {
    repeatClick: repeat_click
  },

  props: {
    date: {},
    defaultValue: {}, // reserved for future use
    showSeconds: {
      type: Boolean,
      default: true
    },
    arrowControl: Boolean,
    amPmMode: {
      type: String,
      default: '' // 'a': am/pm; 'A': AM/PM
    }
  },

  computed: {
    hours: function hours() {
      return this.date.getHours();
    },
    minutes: function minutes() {
      return this.date.getMinutes();
    },
    seconds: function seconds() {
      return this.date.getSeconds();
    },
    hoursList: function hoursList() {
      return Object(date_util_["getRangeHours"])(this.selectableRange);
    },
    minutesList: function minutesList() {
      return Object(date_util_["getRangeMinutes"])(this.selectableRange, this.hours);
    },
    arrowHourList: function arrowHourList() {
      var hours = this.hours;
      return [hours > 0 ? hours - 1 : undefined, hours, hours < 23 ? hours + 1 : undefined];
    },
    arrowMinuteList: function arrowMinuteList() {
      var minutes = this.minutes;
      return [minutes > 0 ? minutes - 1 : undefined, minutes, minutes < 59 ? minutes + 1 : undefined];
    },
    arrowSecondList: function arrowSecondList() {
      var seconds = this.seconds;
      return [seconds > 0 ? seconds - 1 : undefined, seconds, seconds < 59 ? seconds + 1 : undefined];
    }
  },

  data: function data() {
    return {
      selectableRange: [],
      currentScrollbar: null,
      // 处理中
      handleing: false
    };
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      !_this2.arrowControl && _this2.bindScrollEvent();
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.unbindScrollEvent();
  },

  methods: {
    increase: function increase() {
      !this.handleing && this.scrollDown(1);
    },
    decrease: function decrease() {
      !this.handleing && this.scrollDown(-1);
    },
    modifyDateField: function modifyDateField(type, value) {
      switch (type) {
        case 'hours':
          this.$emit('change', Object(date_util_["modifyTime"])(this.date, value, this.minutes, this.seconds));
          break;
        case 'minutes':
          this.$emit('change', Object(date_util_["modifyTime"])(this.date, this.hours, value, this.seconds));
          break;
        case 'seconds':
          this.$emit('change', Object(date_util_["modifyTime"])(this.date, this.hours, this.minutes, value));
          break;
      }
      this.handleing = false;
    },
    handleClick: function handleClick(type, _ref) {
      var value = _ref.value,
          disabled = _ref.disabled;

      if (!disabled) {
        this.modifyDateField(type, value);
        this.emitSelectRange(type);
        this.adjustSpinner(type, value);
      }
    },
    emitSelectRange: function emitSelectRange(type) {
      if (type === 'hours') {
        this.$emit('select-range', 0, 2);
      } else if (type === 'minutes') {
        this.$emit('select-range', 3, 5);
      } else if (type === 'seconds') {
        this.$emit('select-range', 6, 8);
      }
      this.currentScrollbar = type;
    },
    bindScrollEvent: function bindScrollEvent() {
      var _this3 = this;

      var bindFuntion = function bindFuntion(type) {
        _this3.$refs[type].wrap.onscroll = function (e) {
          // TODO: scroll is emitted when set scrollTop programatically
          // should find better solutions in the future!
          var _this = _this3;
          setTimeout(function () {
            !_this.handleing && _this.handleScroll(type, e);
          }, 4);
        };
      };
      bindFuntion('hours');
      bindFuntion('minutes');
      bindFuntion('seconds');
    },

    // 解绑事件
    unbindScrollEvent: function unbindScrollEvent() {
      var _this4 = this;

      var bindFuntion = function bindFuntion(type) {
        if (_this4.$refs[type] && _this4.$refs[type].wrap) {
          _this4.$refs[type].wrap.onscroll = null;
        }
      };
      bindFuntion('hours');
      bindFuntion('minutes');
      bindFuntion('seconds');
    },
    handleScroll: function handleScroll(type) {
      this.handleing = true;
      var value = Math.min(Math.floor((this.$refs[type].wrap.scrollTop - (this.scrollBarHeight(type) * 0.5 - 10) / this.typeItemHeight(type) + 3) / this.typeItemHeight(type)), type === 'hours' ? 23 : 59);
      this.modifyDateField(type, value);
    },


    // NOTE: used by datetime / date-range panel
    //       renamed from adjustScrollTop
    //       should try to refactory it
    adjustSpinners: function adjustSpinners() {
      this.adjustSpinner('hours', this.hours);
      this.adjustSpinner('minutes', this.minutes);
      this.adjustSpinner('seconds', this.seconds);
    },
    adjustCurrentSpinner: function adjustCurrentSpinner(type) {
      this.adjustSpinner(type, this[type]);
    },
    adjustSpinner: function adjustSpinner(type, value) {
      if (this.arrowControl) return;
      var el = this.$refs[type].wrap;
      if (el) {
        el.scrollTop = Math.max(0, value * this.typeItemHeight(type));
      }
    },
    scrollDown: function scrollDown(step) {
      this.handleing = true;
      if (!this.currentScrollbar) {
        this.emitSelectRange('hours');
      }

      var label = this.currentScrollbar;
      var hoursList = this.hoursList;
      var now = this[label];

      if (this.currentScrollbar === 'hours') {
        var total = Math.abs(step);
        step = step > 0 ? 1 : -1;
        var length = hoursList.length;
        while (length-- && total) {
          now = (now + step + hoursList.length) % hoursList.length;
          if (hoursList[now]) {
            continue;
          }
          total--;
        }
        if (hoursList[now]) return;
      } else {
        now = (now + step + 60) % 60;
      }

      this.modifyDateField(label, now);
      this.adjustSpinner(label, now);
    },
    amPm: function amPm(hour) {
      var shouldShowAmPm = this.amPmMode.toLowerCase() === 'a';
      if (!shouldShowAmPm) return '';
      var isCapital = this.amPmMode === 'A';
      var content = hour < 12 ? ' am' : ' pm';
      if (isCapital) content = content.toUpperCase();
      return content;
    },
    typeItemHeight: function typeItemHeight(type) {
      return this.$refs[type].$el.querySelector('li').offsetHeight;
    },
    scrollBarHeight: function scrollBarHeight(type) {
      return this.$refs[type].$el.offsetHeight;
    }
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/basic/time-spinner.vue?vue&type=script&lang=js&
 /* harmony default export */ var basic_time_spinnervue_type_script_lang_js_ = (time_spinnervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/date-picker/src/basic/time-spinner.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  basic_time_spinnervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/date-picker/src/basic/time-spinner.vue"
/* harmony default export */ var time_spinner = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 23 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(39);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/resize-event");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("@/lib/checkbox");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/popup");

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/xcheckbox/src/xcheckbox.vue?vue&type=template&id=33b89668&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      !_vm.details
        ? _c(
            "el-checkbox-group",
            {
              attrs: {
                min: _vm.min,
                max: _vm.max,
                name: _vm.name,
                size: _vm.size,
                fill: _vm.fill,
                "text-color": _vm.textColor,
                "value-type": _vm.valueType,
                separator: _vm.separator,
                disabled: _vm.disabled
              },
              model: {
                value: _vm.checklist,
                callback: function($$v) {
                  _vm.checklist = $$v
                },
                expression: "checklist"
              }
            },
            [
              !_vm.optionButton
                ? _vm._l(_vm.checkdata, function(item) {
                    return _c(
                      "el-checkbox",
                      {
                        key: "checkbox_" + item.key,
                        attrs: {
                          border: _vm.border,
                          label: item.key,
                          disabled:
                            item.disabled === undefined
                              ? _vm.disabled
                              : item.disabled
                        }
                      },
                      [_vm._v("\n      " + _vm._s(item.value) + "\n    ")]
                    )
                  })
                : _vm._l(_vm.checkdata, function(item) {
                    return _c(
                      "el-checkbox-button",
                      {
                        key: "checkbox_" + item.key,
                        attrs: {
                          label: item.key,
                          disabled:
                            item.disabled === undefined
                              ? _vm.disabled
                              : item.disabled
                        }
                      },
                      [_vm._v("\n      " + _vm._s(item.value) + "\n    ")]
                    )
                  })
            ],
            2
          )
        : _vm._e(),
      _vm.details
        ? _c("span", [_vm._v(_vm._s(_vm.getSelectdText().join(",")))])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/xcheckbox/src/xcheckbox.vue?vue&type=template&id=33b89668&

// EXTERNAL MODULE: external "@/lib/utils/util"
var util_ = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xcheckbox/src/xcheckbox.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var xcheckboxvue_type_script_lang_js_ = ({
  name: 'ElCheckboxX',
  xtype: 'YuXcheckbox',
  props: {
    min: Number,
    max: Number,
    disabled: Boolean,
    name: String,
    dataUrl: String,
    dataCode: String,
    /** 字典查询参数 */
    dataParams: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    /** 请求类型 */
    requestType: {
      type: String,
      default: 'GET'
    },
    jsonData: {
      type: String,
      default: 'data'
    },
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    datacodeFilter: Function,
    value: [Array, String],
    // 选项是否为button，默认flase
    optionButton: Boolean,
    valueType: {
      type: String,
      default: 'array'
    },
    /** 字典类型 */
    props: {
      type: Object,
      default: function _default() {
        return { key: 'key', value: 'value' };
      }
    },
    separator: {
      type: String,
      default: ','
    },
    excludeKey: String,
    details: Boolean,
    size: String,
    border: Boolean,
    fill: String,
    textColor: String
  },
  data: function data() {
    return {
      checklist: this.value ? Object.prototype.toString.call(this.value) === '[object String]' ? this.value.split(this.separator) : this.value : [],
      checkdata: this.options,
      parent: null
    };
  },
  created: function created() {
    if (!this.dataUrl && !this.dataCode) {
      // 此处代码含义有谁明白？克隆么？
      // var listData = [];
      // for (var i = 0, len = this.checkdata.length; i < len; i++) {
      //   var obj = this.checkdata[i];
      //   listData.push({ value: obj.value, key: obj.key });
      // }
      // this.checkdata = listData;
      // 重新修改一下
      var listData = [];
      this.checkdata.forEach(function (item) {
        var op = { value: item.value, key: item.key };
        if (item.disabled !== undefined) {
          op['disabled'] = item.disabled;
        }
        listData.push(op);
      });
      this.checkdata = listData;
    } else if (!this.dataUrl && this.dataCode) {
      this.setcheckData(this.dataCode);
    } else {
      this.query();
    }
  },
  methods: {
    getCheckListOfString: function getCheckListOfString() {
      return this.getSelectdText().join(this.separator);
    },

    change: function change(val, oldVal) {
      this.$emit('change', val, oldVal);
    },
    setcheckData: function setcheckData(dataCode) {
      var _this = this;
      var listData = [];
      yufp.lookup.bind(dataCode, function (options) {
        if (_this.datacodeFilter) {
          // 此处获取字段名称是不合理的，暂时先从父元素中获取
          listData = _this.datacodeFilter(options, _this.dataCode, _this.$parent && _this.$parent.name);
          _this.checkdata = _this.formatter(listData);
        } else {
          if (_this.excludeKey) {
            var array = _this.excludeKey.split(',');
            options = options.filter(function (item) {
              if (array.indexOf(item[_this.props.key]) > -1) {
                return false;
              }
              return true;
            });
          }
          _this.checkdata = _this.formatter(options);
        }
      });
    },
    formatter: function formatter(option) {
      var listData = [];
      for (var i = 0, len = option.length; i < len; i++) {
        var item = {};
        var obj = option[i];
        item['key'] = obj[this.props.key];
        item['value'] = obj[this.props.value];
        if (obj.disabled) {
          item['disabled'] = obj.disabled;
        }
        listData.push(item);
      }
      return listData;
    },

    query: function query() {
      var me = this;
      yufp.service.request({
        method: this.requestType,
        url: this.dataUrl,
        data: this.dataParams,
        callback: function callback(code, message, response) {
          var data = me.getObjectKey(response, me.jsonData) || [];
          data = data && data.length > 0 ? data : [];
          for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            if (obj[me.props.key]) {
              me.checkdata.push({
                key: obj[me.props.key],
                value: obj[me.props.value],
                disabled: obj.disabled
              });
            }
          }
          me.$emit('loaded', me.checkdata);
        }
      });
    },
    getObjectKey: function getObjectKey(obj, ns) {
      if (!ns) {
        return obj;
      }
      var keys = ns.split('.');
      for (var i = 0, len = keys.length; i < len; i++) {
        if (!obj) {
          break;
        }
        obj = obj[keys[i]];
      }
      return obj;
    },
    getSelectdText: function getSelectdText() {
      var text = [];
      for (var j = 0; j < this.checklist.length; j++) {
        for (var i = 0; i < this.checkdata.length; i++) {
          var obj = this.checkdata[i];
          if (obj.key === this.checklist[j]) {
            text.push(obj.value);
            break;
          }
        }
      }
      return text;
    },
    getVNodeParent: function getVNodeParent() {
      var parent = this.$parent;
      var parentName = parent.$options.componentName;
      while (parent.$parent && parentName !== 'YuXformAbstractItem') {
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      this.parent = parent;
    },

    // 获取复选框值处理
    _getCheckList: function _getCheckList(val) {
      if (Object.prototype.toString.call(val) === '[object Array]') {
        if (!Object(util_["looseEqual"])(this.checklist, val)) {
          return val;
        } else {
          return this.checklist;
        }
      }
      // 初始化默认值
      if (Object.prototype.toString.call(val) === '[object String]') {
        if (this.checklist.join(this.separator) !== val) {
          return val.split(this.separator);
        } else {
          return this.checklist;
        }
      }
    }
  },
  watch: {
    dataCode: function dataCode(val) {
      this.setcheckData(val);
    },
    checklist: function checklist(val) {
      if (val) {
        var returnVal = this.valueType === 'string' ? val.join(this.separator) : val;
        this.$emit('input', returnVal);
      } else {
        // 当为undefined 的时候重置数据
        this.checklist = [];
        var _returnVal = this.valueType === 'string' ? [].join(this.separator) : [];
        this.$emit('input', _returnVal);
      }
    },
    value: function value(val, oldVal) {
      this.$emit('change', val, oldVal);
      this.checklist = this._getCheckList(val);
    },
    options: function options(val) {
      this.checkdata = val;
    }
  }
});
// CONCATENATED MODULE: ./packages/xcheckbox/src/xcheckbox.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_xcheckboxvue_type_script_lang_js_ = (xcheckboxvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xcheckbox/src/xcheckbox.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_xcheckboxvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/xcheckbox/src/xcheckbox.vue"
/* harmony default export */ var xcheckbox = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/types");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/migrating");

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./packages/date-picker/src/picker.vue + 4 modules
var picker = __webpack_require__(16);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/date.vue?vue&type=template&id=2440d4ea&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "el-zoom-in-top" },
      on: { "after-enter": _vm.handleEnter, "after-leave": _vm.handleLeave }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "el-picker-panel el-date-picker el-popover",
          class: [
            {
              "has-sidebar": _vm.$slots.sidebar || _vm.shortcuts,
              "has-time": _vm.showTime
            },
            _vm.popperClass
          ]
        },
        [
          _c(
            "div",
            { staticClass: "el-picker-panel__body-wrapper" },
            [
              _vm._t("sidebar"),
              _vm.shortcuts
                ? _c(
                    "div",
                    { staticClass: "el-picker-panel__sidebar" },
                    _vm._l(_vm.shortcuts, function(shortcut, key) {
                      return _c(
                        "button",
                        {
                          key: "date_shortcut_" + key,
                          staticClass: "el-picker-panel__shortcut",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              return _vm.handleShortcutClick(shortcut)
                            }
                          }
                        },
                        [_vm._v(_vm._s(shortcut.text))]
                      )
                    }),
                    0
                  )
                : _vm._e(),
              _c("div", { staticClass: "el-picker-panel__body" }, [
                _vm.showTime
                  ? _c("div", { staticClass: "el-date-picker__time-header" }, [
                      _c(
                        "span",
                        { staticClass: "el-date-picker__editor-wrap" },
                        [
                          _c("el-input", {
                            attrs: {
                              placeholder: _vm.t("el.datepicker.selectDate"),
                              value: _vm.visibleDate,
                              size: "small"
                            },
                            on: {
                              input: function(val) {
                                return (_vm.userInputDate = val)
                              },
                              change: _vm.handleVisibleDateChange
                            }
                          })
                        ],
                        1
                      ),
                      _c(
                        "span",
                        {
                          directives: [
                            {
                              name: "clickoutside",
                              rawName: "v-clickoutside",
                              value: _vm.handleTimePickClose,
                              expression: "handleTimePickClose"
                            }
                          ],
                          staticClass: "el-date-picker__editor-wrap"
                        },
                        [
                          _c("el-input", {
                            ref: "input",
                            attrs: {
                              placeholder: _vm.t("el.datepicker.selectTime"),
                              value: _vm.visibleTime,
                              size: "small"
                            },
                            on: {
                              focus: function($event) {
                                _vm.timePickerVisible = true
                              },
                              input: function(val) {
                                return (_vm.userInputTime = val)
                              },
                              change: _vm.handleVisibleTimeChange
                            }
                          }),
                          _c("time-picker", {
                            ref: "timepicker",
                            attrs: {
                              "time-arrow-control": _vm.arrowControl,
                              "picker-width": _vm.pickerWidth,
                              visible: _vm.timePickerVisible
                            },
                            on: {
                              pick: _vm.handleTimePick,
                              mounted: _vm.proxyTimePickerDataProperties
                            }
                          })
                        ],
                        1
                      )
                    ])
                  : _vm._e(),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.currentView !== "time",
                        expression: "currentView !== 'time'"
                      }
                    ],
                    staticClass: "el-date-picker__header",
                    class: {
                      "el-date-picker__header--bordered":
                        _vm.currentView === "year" ||
                        _vm.currentView === "month"
                    }
                  },
                  [
                    _c("button", {
                      staticClass:
                        "el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left",
                      attrs: {
                        type: "button",
                        "aria-label": _vm.t("el.datepicker.prevYear")
                      },
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          return _vm.prevYear($event)
                        }
                      }
                    }),
                    _c("button", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.currentView === "date",
                          expression: "currentView === 'date'"
                        }
                      ],
                      staticClass:
                        "el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left",
                      attrs: {
                        type: "button",
                        "aria-label": _vm.t("el.datepicker.prevMonth")
                      },
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          return _vm.prevMonth($event)
                        }
                      }
                    }),
                    _c(
                      "span",
                      {
                        staticClass: "el-date-picker__header-label",
                        attrs: { role: "button" },
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.showYearPicker($event)
                          }
                        }
                      },
                      [_vm._v(_vm._s(_vm.yearLabel))]
                    ),
                    _c(
                      "span",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.currentView === "date",
                            expression: "currentView === 'date'"
                          }
                        ],
                        staticClass: "el-date-picker__header-label",
                        class: { active: _vm.currentView === "month" },
                        attrs: { role: "button" },
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.showMonthPicker($event)
                          }
                        }
                      },
                      [
                        _vm._v(
                          _vm._s(_vm.t("el.datepicker.month" + (_vm.month + 1)))
                        )
                      ]
                    ),
                    _c("button", {
                      staticClass:
                        "el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right",
                      attrs: {
                        type: "button",
                        "aria-label": _vm.t("el.datepicker.nextYear")
                      },
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          return _vm.nextYear($event)
                        }
                      }
                    }),
                    _c("button", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.currentView === "date",
                          expression: "currentView === 'date'"
                        }
                      ],
                      staticClass:
                        "el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right",
                      attrs: {
                        type: "button",
                        "aria-label": _vm.t("el.datepicker.nextMonth")
                      },
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          return _vm.nextMonth($event)
                        }
                      }
                    })
                  ]
                ),
                _c(
                  "div",
                  { staticClass: "el-picker-panel__content" },
                  [
                    _c("date-table", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.currentView === "date",
                          expression: "currentView === 'date'"
                        }
                      ],
                      attrs: {
                        "selection-mode": _vm.selectionMode,
                        "first-day-of-week": _vm.firstDayOfWeek,
                        value: _vm.value,
                        "default-value": _vm.defaultValue
                          ? new Date(_vm.defaultValue)
                          : null,
                        date: _vm.date,
                        "disabled-date": _vm.disabledDate
                      },
                      on: { pick: _vm.handleDatePick }
                    }),
                    _c("year-table", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.currentView === "year",
                          expression: "currentView === 'year'"
                        }
                      ],
                      attrs: {
                        value: _vm.value,
                        "default-value": _vm.defaultValue
                          ? new Date(_vm.defaultValue)
                          : null,
                        date: _vm.date,
                        "disabled-date": _vm.disabledDate
                      },
                      on: { pick: _vm.handleYearPick }
                    }),
                    _c("month-table", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.currentView === "month",
                          expression: "currentView === 'month'"
                        }
                      ],
                      attrs: {
                        value: _vm.value,
                        "default-value": _vm.defaultValue
                          ? new Date(_vm.defaultValue)
                          : null,
                        date: _vm.date,
                        "disabled-date": _vm.disabledDate
                      },
                      on: { pick: _vm.handleMonthPick }
                    })
                  ],
                  1
                )
              ])
            ],
            2
          ),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.footerVisible && _vm.currentView === "date",
                  expression: "footerVisible && currentView === 'date'"
                }
              ],
              staticClass: "el-picker-panel__footer"
            },
            [
              _c(
                "el-button",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.selectionMode !== "dates",
                      expression: "selectionMode !== 'dates'"
                    }
                  ],
                  staticClass: "el-picker-panel__link-btn",
                  attrs: { size: "mini", type: "text" },
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      return _vm.changeToNow($event)
                    }
                  }
                },
                [
                  _vm._v(
                    "\n        " +
                      _vm._s(_vm.t("el.datepicker.now")) +
                      "\n      "
                  )
                ]
              ),
              _c(
                "el-button",
                {
                  staticClass: "el-picker-panel__link-btn",
                  attrs: { plain: "", size: "mini" },
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      return _vm.confirm($event)
                    }
                  }
                },
                [
                  _vm._v(
                    "\n        " +
                      _vm._s(_vm.t("el.datepicker.confirm")) +
                      "\n      "
                  )
                ]
              )
            ],
            1
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/panel/date.vue?vue&type=template&id=2440d4ea&

// EXTERNAL MODULE: external "@/lib/utils/date-util"
var date_util_ = __webpack_require__(0);

// EXTERNAL MODULE: external "@/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(9);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: external "@/lib/input"
var input_ = __webpack_require__(10);
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// EXTERNAL MODULE: external "@/lib/button"
var button_ = __webpack_require__(13);
var button_default = /*#__PURE__*/__webpack_require__.n(button_);

// EXTERNAL MODULE: ./packages/date-picker/src/panel/time.vue + 4 modules
var panel_time = __webpack_require__(12);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/year-table.vue?vue&type=template&id=c86ab5e0&
var year_tablevue_type_template_id_c86ab5e0_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "table",
    { staticClass: "el-year-table", on: { click: _vm.handleYearTableClick } },
    [
      _c("tbody", [
        _c("tr", [
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 0)
            },
            [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear))])]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 1)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 1))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 2)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 2))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 3)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 3))
              ])
            ]
          )
        ]),
        _c("tr", [
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 4)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 4))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 5)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 5))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 6)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 6))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 7)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 7))
              ])
            ]
          )
        ]),
        _c("tr", [
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 8)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 8))
              ])
            ]
          ),
          _c(
            "td",
            {
              staticClass: "available",
              class: _vm.getCellStyle(_vm.startYear + 9)
            },
            [
              _c("a", { staticClass: "cell" }, [
                _vm._v(_vm._s(_vm.startYear + 9))
              ])
            ]
          ),
          _c("td"),
          _c("td")
        ])
      ])
    ]
  )
}
var year_tablevue_type_template_id_c86ab5e0_staticRenderFns = []
year_tablevue_type_template_id_c86ab5e0_render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/basic/year-table.vue?vue&type=template&id=c86ab5e0&

// EXTERNAL MODULE: external "@/lib/utils/dom"
var dom_ = __webpack_require__(2);

// EXTERNAL MODULE: external "@/lib/utils/util"
var util_ = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/year-table.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





var year_tablevue_type_script_lang_js_datesInYear = function datesInYear(year) {
  var numOfDays = Object(date_util_["getDayCountOfYear"])(year);
  var firstDay = new Date(year, 0, 1);
  return Object(date_util_["range"])(numOfDays).map(function (n) {
    return Object(date_util_["nextDate"])(firstDay, n);
  });
};

/* harmony default export */ var year_tablevue_type_script_lang_js_ = ({
  props: {
    disabledDate: {},
    value: {},
    defaultValue: {
      validator: function validator(val) {
        // null or valid Date Object
        return val === null || val instanceof Date && Object(date_util_["isDate"])(val);
      }
    },
    date: {}
  },

  computed: {
    startYear: function startYear() {
      return Math.floor(this.date.getFullYear() / 10) * 10;
    }
  },

  methods: {
    getCellStyle: function getCellStyle(year) {
      var style = {};
      var today = new Date();

      style.disabled = typeof this.disabledDate === 'function' ? year_tablevue_type_script_lang_js_datesInYear(year).every(this.disabledDate) : false;
      style.current = Object(util_["arrayFindIndex"])(Object(util_["coerceTruthyValueToArray"])(this.value), function (date) {
        return date.getFullYear() === year;
      }) >= 0;
      style.today = today.getFullYear() === year;
      style.default = this.defaultValue && this.defaultValue.getFullYear() === year;

      return style;
    },
    handleYearTableClick: function handleYearTableClick(event) {
      var target = event.target;
      if (target.tagName === 'A') {
        if (Object(dom_["hasClass"])(target.parentNode, 'disabled')) return;
        var year = target.textContent || target.innerText;
        this.$emit('pick', Number(year));
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/basic/year-table.vue?vue&type=script&lang=js&
 /* harmony default export */ var basic_year_tablevue_type_script_lang_js_ = (year_tablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/date-picker/src/basic/year-table.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  basic_year_tablevue_type_script_lang_js_,
  year_tablevue_type_template_id_c86ab5e0_render,
  year_tablevue_type_template_id_c86ab5e0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/date-picker/src/basic/year-table.vue"
/* harmony default export */ var year_table = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/month-table.vue?vue&type=template&id=654d4f42&
var month_tablevue_type_template_id_654d4f42_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "table",
    {
      staticClass: "el-month-table",
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.handleMonthTableClick($event)
        },
        mousemove: function($event) {
          $event.stopPropagation()
          return _vm.handleMouseMove($event)
        }
      }
    },
    [
      _c(
        "tbody",
        _vm._l(_vm.rows, function(row, key) {
          return _c(
            "tr",
            { key: "month-row" + key },
            _vm._l(row, function(cell, key) {
              return _c(
                "td",
                { key: "month_cell_" + key, class: _vm.getCellStyle(cell) },
                [
                  _c("div", [
                    _c("a", { staticClass: "cell" }, [
                      _vm._v(
                        _vm._s(
                          _vm.t("el.datepicker.months." + _vm.months[cell.text])
                        )
                      )
                    ])
                  ])
                ]
              )
            }),
            0
          )
        }),
        0
      )
    ]
  )
}
var month_tablevue_type_template_id_654d4f42_staticRenderFns = []
month_tablevue_type_template_id_654d4f42_render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/basic/month-table.vue?vue&type=template&id=654d4f42&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/month-table.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//






var month_tablevue_type_script_lang_js_datesInMonth = function datesInMonth(year, month) {
  var numOfDays = Object(date_util_["getDayCountOfMonth"])(year, month);
  var firstDay = new Date(year, month, 1);
  return Object(date_util_["range"])(numOfDays).map(function (n) {
    return Object(date_util_["nextDate"])(firstDay, n);
  });
};

var clearDate = function clearDate(date) {
  return new Date(date.getFullYear(), date.getMonth());
};

var getMonthTimestamp = function getMonthTimestamp(time) {
  if (typeof time === 'number' || typeof time === 'string') {
    return clearDate(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return clearDate(time).getTime();
  } else {
    return NaN;
  }
};
/* harmony default export */ var month_tablevue_type_script_lang_js_ = ({
  props: {
    disabledDate: {},
    value: {},
    selectionMode: {
      default: 'month'
    },
    minDate: {},

    maxDate: {},
    defaultValue: {
      validator: function validator(val) {
        // null or valid Date Object
        return val === null || Object(date_util_["isDate"])(val) || Array.isArray(val) && val.every(date_util_["isDate"]);
      }
    },
    date: {},
    rangeState: {
      default: function _default() {
        return {
          endDate: null,
          selecting: false
        };
      }
    }
  },

  mixins: [locale_default.a],

  watch: {
    'rangeState.endDate': function rangeStateEndDate(newVal) {
      this.markRange(this.minDate, newVal);
    },
    minDate: function minDate(newVal, oldVal) {
      if (getMonthTimestamp(newVal) !== getMonthTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    },
    maxDate: function maxDate(newVal, oldVal) {
      if (getMonthTimestamp(newVal) !== getMonthTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    }
  },

  data: function data() {
    return {
      months: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      tableRows: [[], [], []],
      lastRow: null,
      lastColumn: null
    };
  },


  methods: {
    cellMatchesDate: function cellMatchesDate(cell, date) {
      var value = new Date(date);
      return this.date.getFullYear() === value.getFullYear() && Number(cell.text) === value.getMonth();
    },
    getCellStyle: function getCellStyle(cell) {
      var _this = this;

      var style = {};
      var year = this.date.getFullYear();
      var today = new Date();
      var month = cell.text;
      var defaultValue = this.defaultValue ? Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue] : [];
      style.disabled = typeof this.disabledDate === 'function' ? month_tablevue_type_script_lang_js_datesInMonth(year, month).every(this.disabledDate) : false;
      style.current = Object(util_["arrayFindIndex"])(Object(util_["coerceTruthyValueToArray"])(this.value), function (date) {
        return date.getFullYear() === year && date.getMonth() === month;
      }) >= 0;
      style.today = today.getFullYear() === year && today.getMonth() === month;
      style.default = defaultValue.some(function (date) {
        return _this.cellMatchesDate(cell, date);
      });

      if (cell.inRange) {
        style['in-range'] = true;

        if (cell.start) {
          style['start-date'] = true;
        }

        if (cell.end) {
          style['end-date'] = true;
        }
      }
      return style;
    },
    getMonthOfCell: function getMonthOfCell(month) {
      var year = this.date.getFullYear();
      return new Date(year, month, 1);
    },
    markRange: function markRange(minDate, maxDate) {
      minDate = getMonthTimestamp(minDate);
      maxDate = getMonthTimestamp(maxDate) || minDate;
      var _ref = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
      minDate = _ref[0];
      maxDate = _ref[1];

      var rows = this.rows;
      for (var i = 0, k = rows.length; i < k; i++) {
        var row = rows[i];
        for (var j = 0, l = row.length; j < l; j++) {

          var cell = row[j];
          var index = i * 4 + j;
          var time = new Date(this.date.getFullYear(), index).getTime();

          cell.inRange = minDate && time >= minDate && time <= maxDate;
          cell.start = minDate && time === minDate;
          cell.end = maxDate && time === maxDate;
        }
      }
    },
    handleMouseMove: function handleMouseMove(event) {
      if (!this.rangeState.selecting) return;

      var target = event.target;
      if (target.tagName === 'A') {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }
      if (target.tagName !== 'TD') return;

      var row = target.parentNode.rowIndex;
      var column = target.cellIndex;
      // can not select disabled date
      if (this.rows[row][column].disabled) return;

      // only update rangeState when mouse moves to a new cell
      // this avoids frequent Date object creation and improves performance
      if (row !== this.lastRow || column !== this.lastColumn) {
        this.lastRow = row;
        this.lastColumn = column;
        this.$emit('changerange', {
          minDate: this.minDate,
          maxDate: this.maxDate,
          rangeState: {
            selecting: true,
            endDate: this.getMonthOfCell(row * 4 + column)
          }
        });
      }
    },
    handleMonthTableClick: function handleMonthTableClick(event) {
      var target = event.target;
      if (target.tagName === 'A') {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }
      if (target.tagName !== 'TD') return;
      if (Object(dom_["hasClass"])(target, 'disabled')) return;
      var column = target.cellIndex;
      var row = target.parentNode.rowIndex;
      var month = row * 4 + column;
      var newDate = this.getMonthOfCell(month);
      if (this.selectionMode === 'range') {
        if (!this.rangeState.selecting) {
          this.$emit('pick', { minDate: newDate, maxDate: null });
          this.rangeState.selecting = true;
        } else {
          if (newDate >= this.minDate) {
            this.$emit('pick', { minDate: this.minDate, maxDate: newDate });
          } else {
            this.$emit('pick', { minDate: newDate, maxDate: this.minDate });
          }
          this.rangeState.selecting = false;
        }
      } else {
        this.$emit('pick', month);
      }
    }
  },

  computed: {
    rows: function rows() {
      var _this2 = this;

      // TODO: refactory rows / getCellClasses
      var rows = this.tableRows;
      var disabledDate = this.disabledDate;
      var selectedDate = [];
      var now = getMonthTimestamp(new Date());

      for (var i = 0; i < 3; i++) {
        var row = rows[i];

        var _loop = function _loop(j) {
          var cell = row[j];
          if (!cell) {
            cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
          }

          cell.type = 'normal';

          var index = i * 4 + j;
          var time = new Date(_this2.date.getFullYear(), index).getTime();
          cell.inRange = time >= getMonthTimestamp(_this2.minDate) && time <= getMonthTimestamp(_this2.maxDate);
          cell.start = _this2.minDate && time === getMonthTimestamp(_this2.minDate);
          cell.end = _this2.maxDate && time === getMonthTimestamp(_this2.maxDate);
          var isToday = time === now;

          if (isToday) {
            cell.type = 'today';
          }
          cell.text = index;
          var cellDate = new Date(time);
          cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
          cell.selected = Object(util_["arrayFind"])(selectedDate, function (date) {
            return date.getTime() === cellDate.getTime();
          });

          _this2.$set(row, j, cell);
        };

        for (var j = 0; j < 4; j++) {
          _loop(j);
        }
      }
      return rows;
    }
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/basic/month-table.vue?vue&type=script&lang=js&
 /* harmony default export */ var basic_month_tablevue_type_script_lang_js_ = (month_tablevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/date-picker/src/basic/month-table.vue





/* normalize component */

var month_table_component = Object(componentNormalizer["a" /* default */])(
  basic_month_tablevue_type_script_lang_js_,
  month_tablevue_type_template_id_654d4f42_render,
  month_tablevue_type_template_id_654d4f42_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var month_table_api; }
month_table_component.options.__file = "packages/date-picker/src/basic/month-table.vue"
/* harmony default export */ var month_table = (month_table_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/date-table.vue?vue&type=template&id=5d1f3341&
var date_tablevue_type_template_id_5d1f3341_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "table",
    {
      staticClass: "el-date-table",
      class: { "is-week-mode": _vm.selectionMode === "week" },
      attrs: { cellspacing: "0", cellpadding: "0" },
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.handleClick($event)
        },
        mousemove: function($event) {
          $event.stopPropagation()
          return _vm.handleMouseMove($event)
        }
      }
    },
    [
      _c(
        "tbody",
        [
          _c(
            "tr",
            [
              _vm.showWeekNumber
                ? _c("th", [_vm._v(_vm._s(_vm.t("el.datepicker.week")))])
                : _vm._e(),
              _vm._l(_vm.WEEKS, function(week, key) {
                return _c("th", { key: "week_" + key }, [
                  _vm._v(_vm._s(_vm.t("el.datepicker.weeks." + week)))
                ])
              })
            ],
            2
          ),
          _vm._l(_vm.rows, function(row, key) {
            return _c(
              "tr",
              {
                key: "date_table_row_" + key,
                staticClass: "el-date-table__row",
                class: { current: _vm.isWeekActive(row[1]) }
              },
              _vm._l(row, function(cell, key) {
                return _c(
                  "td",
                  {
                    key: "date_table_row_cell_" + key,
                    class: _vm.getCellClasses(cell)
                  },
                  [
                    _c("div", [
                      _c("span", [
                        _vm._v(
                          "\n          " + _vm._s(cell.text) + "\n        "
                        )
                      ])
                    ])
                  ]
                )
              }),
              0
            )
          })
        ],
        2
      )
    ]
  )
}
var date_tablevue_type_template_id_5d1f3341_staticRenderFns = []
date_tablevue_type_template_id_5d1f3341_render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/basic/date-table.vue?vue&type=template&id=5d1f3341&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/basic/date-table.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





var _WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var date_tablevue_type_script_lang_js_getDateTimestamp = function getDateTimestamp(time) {
  if (typeof time === 'number' || typeof time === 'string') {
    return Object(date_util_["clearTime"])(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return Object(date_util_["clearTime"])(time).getTime();
  } else {
    return NaN;
  }
};

// remove the first element that satisfies `pred` from arr
// return a new array if modification occurs
// return the original array otherwise
var date_tablevue_type_script_lang_js_removeFromArray = function removeFromArray(arr, pred) {
  var idx = typeof pred === 'function' ? Object(util_["arrayFindIndex"])(arr, pred) : arr.indexOf(pred);
  return idx >= 0 ? [].concat(arr.slice(0, idx), arr.slice(idx + 1)) : arr;
};

/* harmony default export */ var date_tablevue_type_script_lang_js_ = ({
  mixins: [locale_default.a],

  props: {
    firstDayOfWeek: {
      default: 7,
      type: Number,
      validator: function validator(val) {
        return val >= 1 && val <= 7;
      }
    },

    value: {},

    defaultValue: {
      validator: function validator(val) {
        // either: null, valid Date object, Array of valid Date objects
        return val === null || Object(date_util_["isDate"])(val) || Array.isArray(val) && val.every(date_util_["isDate"]);
      }
    },

    date: {},

    selectionMode: {
      default: 'day'
    },

    showWeekNumber: {
      type: Boolean,
      default: false
    },

    disabledDate: {},

    minDate: {},

    maxDate: {},

    rangeState: {
      default: function _default() {
        return {
          endDate: null,
          selecting: false
        };
      }
    }
  },

  computed: {
    offsetDay: function offsetDay() {
      var week = this.firstDayOfWeek;
      // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
      return week > 3 ? 7 - week : -week;
    },
    WEEKS: function WEEKS() {
      var week = this.firstDayOfWeek;
      return _WEEKS.concat(_WEEKS).slice(week, week + 7);
    },
    year: function year() {
      return this.date.getFullYear();
    },
    month: function month() {
      return this.date.getMonth();
    },
    startDate: function startDate() {
      return Object(date_util_["getStartDateOfMonth"])(this.year, this.month);
    },
    rows: function rows() {
      var _this = this;

      // TODO: refactory rows / getCellClasses
      var date = new Date(this.year, this.month, 1);
      var day = Object(date_util_["getFirstDayOfMonth"])(date); // day of first day
      var dateCountOfMonth = Object(date_util_["getDayCountOfMonth"])(date.getFullYear(), date.getMonth());
      var dateCountOfLastMonth = Object(date_util_["getDayCountOfMonth"])(date.getFullYear(), date.getMonth() === 0 ? 11 : date.getMonth() - 1);

      day = day === 0 ? 7 : day;

      var offset = this.offsetDay;
      var rows = this.tableRows;
      var count = 1;

      var startDate = this.startDate;
      var disabledDate = this.disabledDate;
      var selectedDate = this.selectionMode === 'dates' ? Object(util_["coerceTruthyValueToArray"])(this.value) : [];
      var now = date_tablevue_type_script_lang_js_getDateTimestamp(new Date());

      for (var i = 0; i < 6; i++) {
        var row = rows[i];

        if (this.showWeekNumber) {
          if (!row[0]) {
            row[0] = { type: 'week', text: Object(date_util_["getWeekNumber"])(Object(date_util_["nextDate"])(startDate, i * 7 + 1)) };
          }
        }

        var _loop = function _loop(j) {
          var cell = row[_this.showWeekNumber ? j + 1 : j];
          if (!cell) {
            cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
          }

          cell.type = 'normal';

          var index = i * 7 + j;
          var time = Object(date_util_["nextDate"])(startDate, index - offset).getTime();
          cell.inRange = time >= date_tablevue_type_script_lang_js_getDateTimestamp(_this.minDate) && time <= date_tablevue_type_script_lang_js_getDateTimestamp(_this.maxDate);
          cell.start = _this.minDate && time === date_tablevue_type_script_lang_js_getDateTimestamp(_this.minDate);
          cell.end = _this.maxDate && time === date_tablevue_type_script_lang_js_getDateTimestamp(_this.maxDate);
          var isToday = time === now;

          if (isToday) {
            cell.type = 'today';
          }

          if (i >= 0 && i <= 1) {
            var numberOfDaysFromPreviousMonth = day + offset < 0 ? 7 + day + offset : day + offset;

            if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
              cell.text = count++;
            } else {
              cell.text = dateCountOfLastMonth - (numberOfDaysFromPreviousMonth - j % 7) + 1 + i * 7;
              cell.type = 'prev-month';
            }
          } else {
            if (count <= dateCountOfMonth) {
              cell.text = count++;
            } else {
              cell.text = count++ - dateCountOfMonth;
              cell.type = 'next-month';
            }
          }

          var cellDate = new Date(time);
          cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
          cell.selected = Object(util_["arrayFind"])(selectedDate, function (date) {
            return date.getTime() === cellDate.getTime();
          });

          _this.$set(row, _this.showWeekNumber ? j + 1 : j, cell);
        };

        for (var j = 0; j < 7; j++) {
          _loop(j);
        }

        if (this.selectionMode === 'week') {
          var start = this.showWeekNumber ? 1 : 0;
          var end = this.showWeekNumber ? 7 : 6;
          var isWeekActive = this.isWeekActive(row[start + 1]);

          row[start].inRange = isWeekActive;
          row[start].start = isWeekActive;
          row[end].inRange = isWeekActive;
          row[end].end = isWeekActive;
        }
      }

      return rows;
    }
  },

  watch: {
    'rangeState.endDate': function rangeStateEndDate(newVal) {
      this.markRange(this.minDate, newVal);
    },
    minDate: function minDate(newVal, oldVal) {
      if (date_tablevue_type_script_lang_js_getDateTimestamp(newVal) !== date_tablevue_type_script_lang_js_getDateTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    },
    maxDate: function maxDate(newVal, oldVal) {
      if (date_tablevue_type_script_lang_js_getDateTimestamp(newVal) !== date_tablevue_type_script_lang_js_getDateTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    }
  },

  data: function data() {
    return {
      tableRows: [[], [], [], [], [], []],
      lastRow: null,
      lastColumn: null
    };
  },


  methods: {
    cellMatchesDate: function cellMatchesDate(cell, date) {
      var value = new Date(date);
      return this.year === value.getFullYear() && this.month === value.getMonth() && Number(cell.text) === value.getDate();
    },
    getCellClasses: function getCellClasses(cell) {
      var _this2 = this;

      var selectionMode = this.selectionMode;
      var defaultValue = this.defaultValue ? Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue] : [];

      var classes = [];
      if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
        classes.push('available');
        if (cell.type === 'today') {
          classes.push('today');
        }
      } else {
        classes.push(cell.type);
      }

      if (cell.type === 'normal' && defaultValue.some(function (date) {
        return _this2.cellMatchesDate(cell, date);
      })) {
        classes.push('default');
      }

      if (selectionMode === 'day' && (cell.type === 'normal' || cell.type === 'today') && this.cellMatchesDate(cell, this.value)) {
        classes.push('current');
      }

      if (cell.inRange && (cell.type === 'normal' || cell.type === 'today' || this.selectionMode === 'week')) {
        classes.push('in-range');

        if (cell.start) {
          classes.push('start-date');
        }

        if (cell.end) {
          classes.push('end-date');
        }
      }

      if (cell.disabled) {
        classes.push('disabled');
      }

      if (cell.selected) {
        classes.push('selected');
      }

      return classes.join(' ');
    },
    getDateOfCell: function getDateOfCell(row, column) {
      var offsetFromStart = row * 7 + (column - (this.showWeekNumber ? 1 : 0)) - this.offsetDay;
      return Object(date_util_["nextDate"])(this.startDate, offsetFromStart);
    },
    isWeekActive: function isWeekActive(cell) {
      if (this.selectionMode !== 'week') return false;
      var newDate = new Date(this.year, this.month, 1);
      var year = newDate.getFullYear();
      var month = newDate.getMonth();

      if (cell.type === 'prev-month') {
        newDate.setMonth(month === 0 ? 11 : month - 1);
        newDate.setFullYear(month === 0 ? year - 1 : year);
      }

      if (cell.type === 'next-month') {
        newDate.setMonth(month === 11 ? 0 : month + 1);
        newDate.setFullYear(month === 11 ? year + 1 : year);
      }

      newDate.setDate(parseInt(cell.text, 10));

      if (Object(date_util_["isDate"])(this.value)) {
        var dayOffset = (this.value.getDay() - this.firstDayOfWeek + 7) % 7 - 1;
        var weekDate = Object(date_util_["prevDate"])(this.value, dayOffset);
        return weekDate.getTime() === newDate.getTime();
      }
      return false;
    },
    markRange: function markRange(minDate, maxDate) {
      minDate = date_tablevue_type_script_lang_js_getDateTimestamp(minDate);
      maxDate = date_tablevue_type_script_lang_js_getDateTimestamp(maxDate) || minDate;
      var _ref = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
      minDate = _ref[0];
      maxDate = _ref[1];


      var startDate = this.startDate;
      var rows = this.rows;
      for (var i = 0, k = rows.length; i < k; i++) {
        var row = rows[i];
        for (var j = 0, l = row.length; j < l; j++) {
          if (this.showWeekNumber && j === 0) continue;

          var _cell = row[j];
          var index = i * 7 + j + (this.showWeekNumber ? -1 : 0);
          var time = Object(date_util_["nextDate"])(startDate, index - this.offsetDay).getTime();

          _cell.inRange = minDate && time >= minDate && time <= maxDate;
          _cell.start = minDate && time === minDate;
          _cell.end = maxDate && time === maxDate;
        }
      }
    },
    handleMouseMove: function handleMouseMove(event) {
      if (!this.rangeState.selecting) return;

      var target = event.target;
      if (target.tagName === 'SPAN') {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }
      if (target.tagName !== 'TD') return;

      var row = target.parentNode.rowIndex - 1;
      var column = target.cellIndex;

      // can not select disabled date
      if (this.rows[row][column].disabled) return;

      // only update rangeState when mouse moves to a new cell
      // this avoids frequent Date object creation and improves performance
      if (row !== this.lastRow || column !== this.lastColumn) {
        this.lastRow = row;
        this.lastColumn = column;
        this.$emit('changerange', {
          minDate: this.minDate,
          maxDate: this.maxDate,
          rangeState: {
            selecting: true,
            endDate: this.getDateOfCell(row, column)
          }
        });
      }
    },
    handleClick: function handleClick(event) {
      var target = event.target;
      if (target.tagName === 'SPAN') {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode;
      }

      if (target.tagName !== 'TD') return;

      var row = target.parentNode.rowIndex - 1;
      var column = this.selectionMode === 'week' ? 1 : target.cellIndex;
      var cell = this.rows[row][column];

      if (cell.disabled || cell.type === 'week') return;

      var newDate = this.getDateOfCell(row, column);

      if (this.selectionMode === 'range') {
        if (!this.rangeState.selecting) {
          this.$emit('pick', { minDate: newDate, maxDate: null });
          this.rangeState.selecting = true;
        } else {
          if (newDate >= this.minDate) {
            this.$emit('pick', { minDate: this.minDate, maxDate: newDate });
          } else {
            this.$emit('pick', { minDate: newDate, maxDate: this.minDate });
          }
          this.rangeState.selecting = false;
        }
      } else if (this.selectionMode === 'day') {
        this.$emit('pick', newDate);
      } else if (this.selectionMode === 'week') {
        var weekNumber = Object(date_util_["getWeekNumber"])(newDate);
        var value = newDate.getFullYear() + 'w' + weekNumber;
        this.$emit('pick', {
          year: newDate.getFullYear(),
          week: weekNumber,
          value: value,
          date: newDate
        });
      } else if (this.selectionMode === 'dates') {
        var _value = this.value || [];
        var newValue = cell.selected ? date_tablevue_type_script_lang_js_removeFromArray(_value, function (date) {
          return date.getTime() === newDate.getTime();
        }) : [].concat(_value, [newDate]);
        this.$emit('pick', newValue);
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/basic/date-table.vue?vue&type=script&lang=js&
 /* harmony default export */ var basic_date_tablevue_type_script_lang_js_ = (date_tablevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/date-picker/src/basic/date-table.vue





/* normalize component */

var date_table_component = Object(componentNormalizer["a" /* default */])(
  basic_date_tablevue_type_script_lang_js_,
  date_tablevue_type_template_id_5d1f3341_render,
  date_tablevue_type_template_id_5d1f3341_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var date_table_api; }
date_table_component.options.__file = "packages/date-picker/src/basic/date-table.vue"
/* harmony default export */ var date_table = (date_table_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/date.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











/* harmony default export */ var datevue_type_script_lang_js_ = ({
  mixins: [locale_default.a],

  directives: { Clickoutside: clickoutside_default.a },

  watch: {
    showTime: function showTime(val) {
      var _this = this;

      /* istanbul ignore if */
      if (!val) return;
      this.$nextTick(function (_) {
        var inputElm = _this.$refs.input.$el;
        if (inputElm) {
          _this.pickerWidth = inputElm.getBoundingClientRect().width + 10;
        }
      });
    },
    value: function value(val) {
      if (this.selectionMode === 'dates' && this.value) return;
      if (Object(date_util_["isDate"])(val)) {
        this.date = new Date(val);
      } else {
        this.date = this.getDefaultValue();
      }
    },
    defaultValue: function defaultValue(val) {
      if (!Object(date_util_["isDate"])(this.value)) {
        this.date = val ? new Date(val) : new Date();
      }
    },
    timePickerVisible: function timePickerVisible(val) {
      var _this2 = this;

      if (val) this.$nextTick(function () {
        return _this2.$refs.timepicker.adjustSpinners();
      });
    },
    selectionMode: function selectionMode(newVal) {
      if (newVal === 'month') {
        /* istanbul ignore next */
        if (this.currentView !== 'year' || this.currentView !== 'month') {
          this.currentView = 'month';
        }
      } else if (newVal === 'dates') {
        this.currentView = 'date';
      }
    }
  },

  methods: {
    proxyTimePickerDataProperties: function proxyTimePickerDataProperties() {
      var _this3 = this;

      var format = function format(timeFormat) {
        _this3.$refs.timepicker.format = timeFormat;
      };
      var value = function value(_value) {
        _this3.$refs.timepicker.value = _value;
      };
      var date = function date(_date) {
        _this3.$refs.timepicker.date = _date;
      };
      var selectableRange = function selectableRange(_selectableRange) {
        _this3.$refs.timepicker.selectableRange = _selectableRange;
      };

      this.valueWatch = this.$watch('value', value);
      this.dateeWatch = this.$watch('date', date);
      this.selectWatch = this.$watch('selectableRange', selectableRange);

      format(this.timeFormat);
      value(this.value);
      date(this.date);
      selectableRange(this.selectableRange);
    },
    handleClear: function handleClear() {
      this.date = this.getDefaultValue();
      this.$emit('pick', null);
    },
    emit: function emit(value) {
      var _this4 = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!value) {
        this.$emit.apply(this, ['pick', value].concat(args));
      } else if (Array.isArray(value)) {
        var dates = value.map(function (date) {
          return _this4.showTime ? Object(date_util_["clearMilliseconds"])(date) : Object(date_util_["clearTime"])(date);
        });
        this.$emit.apply(this, ['pick', dates].concat(args));
      } else {
        this.$emit.apply(this, ['pick', this.showTime ? Object(date_util_["clearMilliseconds"])(value) : Object(date_util_["clearTime"])(value)].concat(args));
      }
      this.userInputDate = null;
      this.userInputTime = null;
    },


    // resetDate() {
    //   this.date = new Date(this.date);
    // },

    showMonthPicker: function showMonthPicker() {
      this.currentView = 'month';
    },
    showYearPicker: function showYearPicker() {
      this.currentView = 'year';
    },


    // XXX: 没用到
    // handleLabelClick() {
    //   if (this.currentView === 'date') {
    //     this.showMonthPicker();
    //   } else if (this.currentView === 'month') {
    //     this.showYearPicker();
    //   }
    // },

    prevMonth: function prevMonth() {
      this.date = Object(date_util_["prevMonth"])(this.date);
    },
    nextMonth: function nextMonth() {
      this.date = Object(date_util_["nextMonth"])(this.date);
    },
    prevYear: function prevYear() {
      if (this.currentView === 'year') {
        this.date = Object(date_util_["prevYear"])(this.date, 10);
      } else {
        this.date = Object(date_util_["prevYear"])(this.date);
      }
    },
    nextYear: function nextYear() {
      if (this.currentView === 'year') {
        this.date = Object(date_util_["nextYear"])(this.date, 10);
      } else {
        this.date = Object(date_util_["nextYear"])(this.date);
      }
    },
    handleShortcutClick: function handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },
    handleTimePick: function handleTimePick(value, visible, first) {
      if (Object(date_util_["isDate"])(value)) {
        var newDate = this.value ? Object(date_util_["modifyTime"])(this.value, value.getHours(), value.getMinutes(), value.getSeconds()) : Object(date_util_["modifyWithTimeString"])(this.getDefaultValue(), this.defaultTime);
        this.date = newDate;
        this.emit(this.date, true);
      } else {
        this.emit(value, true);
      }
      if (!first) {
        this.timePickerVisible = visible;
      }
    },
    handleTimePickClose: function handleTimePickClose() {
      this.timePickerVisible = false;
    },
    handleMonthPick: function handleMonthPick(month) {
      if (this.selectionMode === 'month') {
        this.date = Object(date_util_["modifyDate"])(this.date, this.year, month, 1);
        this.emit(this.date);
      } else {
        this.date = Object(date_util_["changeYearMonthAndClampDate"])(this.date, this.year, month);
        // TODO: should emit intermediate value ??
        // this.emit(this.date);
        this.currentView = 'date';
      }
    },
    handleDatePick: function handleDatePick(value) {
      if (this.selectionMode === 'day') {
        var newDate = this.value ? Object(date_util_["modifyDate"])(this.value, value.getFullYear(), value.getMonth(), value.getDate()) : Object(date_util_["modifyWithTimeString"])(value, this.defaultTime);
        // change default time while out of selectableRange
        if (!this.checkDateWithinRange(newDate)) {
          newDate = Object(date_util_["modifyDate"])(this.selectableRange[0][0], value.getFullYear(), value.getMonth(), value.getDate());
        }
        this.date = newDate;
        this.emit(this.date, this.showTime);
      } else if (this.selectionMode === 'week') {
        this.emit(value.date);
      } else if (this.selectionMode === 'dates') {
        this.emit(value, true); // set false to keep panel open
      }
    },
    handleYearPick: function handleYearPick(year) {
      if (this.selectionMode === 'year') {
        this.date = Object(date_util_["modifyDate"])(this.date, year, 0, 1);
        this.emit(this.date);
      } else {
        this.date = Object(date_util_["changeYearMonthAndClampDate"])(this.date, year, this.month);
        // TODO: should emit intermediate value ??
        // this.emit(this.date, true);
        this.currentView = 'month';
      }
    },
    changeToNow: function changeToNow() {
      // NOTE: not a permanent solution
      //       consider disable "now" button in the future
      if ((!this.disabledDate || !this.disabledDate(new Date())) && this.checkDateWithinRange(new Date())) {
        this.date = new Date();
        this.emit(this.date);
      }
    },
    confirm: function confirm() {
      if (this.selectionMode === 'dates') {
        this.emit(this.value);
      } else {
        // value were emitted in handle{Date,Time}Pick, nothing to update here
        // deal with the scenario where: user opens the picker, then confirm without doing anything
        var value = this.value ? this.value : Object(date_util_["modifyWithTimeString"])(this.getDefaultValue(), this.defaultTime);
        this.date = new Date(value); // refresh date
        this.emit(value);
      }
    },
    resetView: function resetView() {
      if (this.selectionMode === 'month') {
        this.currentView = 'month';
      } else if (this.selectionMode === 'year') {
        this.currentView = 'year';
      } else {
        this.currentView = 'date';
      }
    },
    handleEnter: function handleEnter() {
      document.body.addEventListener('keydown', this.handleKeydown);
    },
    handleLeave: function handleLeave() {
      this.$emit('dodestroy');
      document.body.removeEventListener('keydown', this.handleKeydown);
    },
    handleKeydown: function handleKeydown(event) {
      var keyCode = event.keyCode;
      var list = [38, 40, 37, 39];
      if (this.visible && !this.timePickerVisible) {
        if (list.indexOf(keyCode) !== -1) {
          this.handleKeyControl(keyCode);
          event.stopPropagation();
          event.preventDefault();
        }
        if (keyCode === 13 && this.userInputDate === null && this.userInputTime === null) {
          // Enter
          this.emit(this.date, false);
        }
      }
    },
    handleKeyControl: function handleKeyControl(keyCode) {
      var mapping = {
        'year': {
          38: -4, 40: 4, 37: -1, 39: 1, offset: function offset(date, step) {
            return date.setFullYear(date.getFullYear() + step);
          }
        },
        'month': {
          38: -4, 40: 4, 37: -1, 39: 1, offset: function offset(date, step) {
            return date.setMonth(date.getMonth() + step);
          }
        },
        'week': {
          38: -1, 40: 1, 37: -1, 39: 1, offset: function offset(date, step) {
            return date.setDate(date.getDate() + step * 7);
          }
        },
        'day': {
          38: -7, 40: 7, 37: -1, 39: 1, offset: function offset(date, step) {
            return date.setDate(date.getDate() + step);
          }
        }
      };
      var mode = this.selectionMode;
      var year = 3.1536e10;
      var now = this.date.getTime();
      var newDate = new Date(this.date.getTime());
      while (Math.abs(now - newDate.getTime()) <= year) {
        var map = mapping[mode];
        map.offset(newDate, map[keyCode]);
        if (typeof this.disabledDate === 'function' && this.disabledDate(newDate)) {
          continue;
        }
        this.date = newDate;
        this.$emit('pick', newDate, true);
        break;
      }
    },
    handleVisibleTimeChange: function handleVisibleTimeChange(value) {
      var time = Object(date_util_["parseDate"])(value, this.timeFormat);
      if (time && this.checkDateWithinRange(time)) {
        this.date = Object(date_util_["modifyDate"])(time, this.year, this.month, this.monthDate);
        this.userInputTime = null;
        this.$refs.timepicker.value = this.date;
        // this.timePickerVisible = false;
        this.emit(this.date, true);
      }
    },
    handleVisibleDateChange: function handleVisibleDateChange(value) {
      var date = Object(date_util_["parseDate"])(value, this.dateFormat);
      if (date) {
        if (typeof this.disabledDate === 'function' && this.disabledDate(date)) {
          return;
        }
        this.date = Object(date_util_["modifyTime"])(date, this.date.getHours(), this.date.getMinutes(), this.date.getSeconds());
        this.userInputDate = null;
        this.resetView();
        this.emit(this.date, true);
      }
    },
    isValidValue: function isValidValue(value) {
      return value && !isNaN(value) && (typeof this.disabledDate === 'function' ? !this.disabledDate(value) : true) && this.checkDateWithinRange(value);
    },
    getDefaultValue: function getDefaultValue() {
      // if default-value is set, return it
      // otherwise, return now (the moment this method gets called)
      return this.defaultValue ? new Date(this.defaultValue) : new Date();
    },
    checkDateWithinRange: function checkDateWithinRange(date) {
      return this.selectableRange.length > 0 ? Object(date_util_["timeWithinRange"])(date, this.selectableRange, this.format || 'HH:mm:ss') : true;
    }
  },

  components: {
    TimePicker: panel_time["a" /* default */], YearTable: year_table, MonthTable: month_table, DateTable: date_table, ElInput: input_default.a, ElButton: button_default.a
  },

  destroyed: function destroyed() {
    this.valueWatch && this.valueWatch();
    this.dateeWatch && this.dateeWatch();
    this.selectWatch && this.selectWatch();
  },
  data: function data() {
    return {
      popperClass: '',
      pickerWidth: 0,
      date: new Date(),
      value: '',
      defaultValue: null, // use getDefaultValue() for time computation
      defaultTime: null,
      showTime: false,
      selectionMode: 'day',
      shortcuts: '',
      visible: false,
      currentView: 'date',
      disabledDate: '',
      selectableRange: [],
      firstDayOfWeek: 7,
      showWeekNumber: false,
      timePickerVisible: false,
      format: '',
      arrowControl: false,
      userInputDate: null,
      userInputTime: null,
      width: 0
    };
  },


  computed: {
    year: function year() {
      return this.date.getFullYear();
    },
    month: function month() {
      return this.date.getMonth();
    },
    week: function week() {
      return Object(date_util_["getWeekNumber"])(this.date);
    },
    monthDate: function monthDate() {
      return this.date.getDate();
    },
    footerVisible: function footerVisible() {
      return this.showTime || this.selectionMode === 'dates';
    },
    visibleTime: function visibleTime() {
      if (this.userInputTime !== null) {
        return this.userInputTime;
      } else {
        return Object(date_util_["formatDate"])(this.value || this.defaultValue, this.timeFormat);
      }
    },
    visibleDate: function visibleDate() {
      if (this.userInputDate !== null) {
        return this.userInputDate;
      } else {
        return Object(date_util_["formatDate"])(this.value || this.defaultValue, this.dateFormat);
      }
    },
    yearLabel: function yearLabel() {
      var yearTranslation = this.t('el.datepicker.year');
      if (this.currentView === 'year') {
        var startYear = Math.floor(this.year / 10) * 10;
        if (yearTranslation) {
          return startYear + ' ' + yearTranslation + ' - ' + (startYear + 9) + ' ' + yearTranslation;
        }
        return startYear + ' - ' + (startYear + 9);
      }
      return this.year + ' ' + yearTranslation;
    },
    timeFormat: function timeFormat() {
      if (this.format) {
        return Object(date_util_["extractTimeFormat"])(this.format);
      } else {
        return 'HH:mm:ss';
      }
    },
    dateFormat: function dateFormat() {
      if (this.format) {
        return Object(date_util_["extractDateFormat"])(this.format);
      } else {
        return 'yyyy-MM-dd';
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    document.body.removeEventListener('keydown', this.handleKeydown);
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/panel/date.vue?vue&type=script&lang=js&
 /* harmony default export */ var panel_datevue_type_script_lang_js_ = (datevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/date-picker/src/panel/date.vue





/* normalize component */

var date_component = Object(componentNormalizer["a" /* default */])(
  panel_datevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var date_api; }
date_component.options.__file = "packages/date-picker/src/panel/date.vue"
/* harmony default export */ var panel_date = (date_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/date-range.vue?vue&type=template&id=2652849a&
var date_rangevue_type_template_id_2652849a_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "el-zoom-in-top" },
      on: {
        "after-leave": function($event) {
          return _vm.$emit("dodestroy")
        }
      }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "el-picker-panel el-date-range-picker el-popover",
          class: [
            {
              "has-sidebar": _vm.$slots.sidebar || _vm.shortcuts,
              "has-time": _vm.showTime
            },
            _vm.popperClass
          ]
        },
        [
          _c(
            "div",
            { staticClass: "el-picker-panel__body-wrapper" },
            [
              _vm._t("sidebar"),
              _vm.shortcuts
                ? _c(
                    "div",
                    { staticClass: "el-picker-panel__sidebar" },
                    _vm._l(_vm.shortcuts, function(shortcut, key) {
                      return _c(
                        "button",
                        {
                          key: "dateRangeCut_" + key,
                          staticClass: "el-picker-panel__shortcut",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              return _vm.handleShortcutClick(shortcut)
                            }
                          }
                        },
                        [_vm._v(_vm._s(shortcut.text))]
                      )
                    }),
                    0
                  )
                : _vm._e(),
              _c("div", { staticClass: "el-picker-panel__body" }, [
                _vm.showTime
                  ? _c(
                      "div",
                      { staticClass: "el-date-range-picker__time-header" },
                      [
                        _c(
                          "span",
                          { staticClass: "el-date-range-picker__editors-wrap" },
                          [
                            _c(
                              "span",
                              {
                                staticClass:
                                  "el-date-range-picker__time-picker-wrap"
                              },
                              [
                                _c("el-input", {
                                  ref: "minInput",
                                  staticClass: "el-date-range-picker__editor",
                                  attrs: {
                                    size: "small",
                                    disabled: _vm.rangeState.selecting,
                                    placeholder: _vm.t(
                                      "el.datepicker.startDate"
                                    ),
                                    value: _vm.minVisibleDate
                                  },
                                  on: {
                                    input: function(val) {
                                      return _vm.handleDateInput(val, "min")
                                    },
                                    change: function(val) {
                                      return _vm.handleDateChange(val, "min")
                                    }
                                  }
                                })
                              ],
                              1
                            ),
                            _c(
                              "span",
                              {
                                directives: [
                                  {
                                    name: "clickoutside",
                                    rawName: "v-clickoutside",
                                    value: _vm.handleMinTimeClose,
                                    expression: "handleMinTimeClose"
                                  }
                                ],
                                staticClass:
                                  "el-date-range-picker__time-picker-wrap"
                              },
                              [
                                _c("el-input", {
                                  staticClass: "el-date-range-picker__editor",
                                  attrs: {
                                    size: "small",
                                    disabled: _vm.rangeState.selecting,
                                    placeholder: _vm.t(
                                      "el.datepicker.startTime"
                                    ),
                                    value: _vm.minVisibleTime
                                  },
                                  on: {
                                    focus: function($event) {
                                      _vm.minTimePickerVisible = true
                                    },
                                    input: function(val) {
                                      return _vm.handleTimeInput(val, "min")
                                    },
                                    change: function(val) {
                                      return _vm.handleTimeChange(val, "min")
                                    }
                                  }
                                }),
                                _c("time-picker", {
                                  ref: "minTimePicker",
                                  attrs: {
                                    "picker-width": _vm.minPickerWidth,
                                    "time-arrow-control": _vm.arrowControl,
                                    visible: _vm.minTimePickerVisible
                                  },
                                  on: {
                                    pick: _vm.handleMinTimePick,
                                    mounted: function($event) {
                                      _vm.$refs.minTimePicker.format =
                                        _vm.timeFormat
                                    }
                                  }
                                })
                              ],
                              1
                            )
                          ]
                        ),
                        _c("span", { staticClass: "el-icon-arrow-right" }),
                        _c(
                          "span",
                          {
                            staticClass:
                              "el-date-range-picker__editors-wrap is-right"
                          },
                          [
                            _c(
                              "span",
                              {
                                staticClass:
                                  "el-date-range-picker__time-picker-wrap"
                              },
                              [
                                _c("el-input", {
                                  staticClass: "el-date-range-picker__editor",
                                  attrs: {
                                    size: "small",
                                    disabled: _vm.rangeState.selecting,
                                    placeholder: _vm.t("el.datepicker.endDate"),
                                    value: _vm.maxVisibleDate,
                                    readonly: !_vm.minDate
                                  },
                                  on: {
                                    input: function(val) {
                                      return _vm.handleDateInput(val, "max")
                                    },
                                    change: function(val) {
                                      return _vm.handleDateChange(val, "max")
                                    }
                                  }
                                })
                              ],
                              1
                            ),
                            _c(
                              "span",
                              {
                                directives: [
                                  {
                                    name: "clickoutside",
                                    rawName: "v-clickoutside",
                                    value: _vm.handleMaxTimeClose,
                                    expression: "handleMaxTimeClose"
                                  }
                                ],
                                staticClass:
                                  "el-date-range-picker__time-picker-wrap"
                              },
                              [
                                _c("el-input", {
                                  staticClass: "el-date-range-picker__editor",
                                  attrs: {
                                    size: "small",
                                    disabled: _vm.rangeState.selecting,
                                    placeholder: _vm.t("el.datepicker.endTime"),
                                    value: _vm.maxVisibleTime,
                                    readonly: !_vm.minDate
                                  },
                                  on: {
                                    focus: function($event) {
                                      _vm.minDate &&
                                        (_vm.maxTimePickerVisible = true)
                                    },
                                    input: function(val) {
                                      return _vm.handleTimeInput(val, "max")
                                    },
                                    change: function(val) {
                                      return _vm.handleTimeChange(val, "max")
                                    }
                                  }
                                }),
                                _c("time-picker", {
                                  ref: "maxTimePicker",
                                  attrs: {
                                    "picker-width": _vm.maxPickerWidth,
                                    "time-arrow-control": _vm.arrowControl,
                                    visible: _vm.maxTimePickerVisible
                                  },
                                  on: {
                                    pick: _vm.handleMaxTimePick,
                                    mounted: function($event) {
                                      _vm.$refs.maxTimePicker.format =
                                        _vm.timeFormat
                                    }
                                  }
                                })
                              ],
                              1
                            )
                          ]
                        )
                      ]
                    )
                  : _vm._e(),
                _c(
                  "div",
                  {
                    staticClass:
                      "el-picker-panel__content el-date-range-picker__content is-left"
                  },
                  [
                    _c("div", { staticClass: "el-date-range-picker__header" }, [
                      _c("button", {
                        staticClass:
                          "el-picker-panel__icon-btn el-icon-d-arrow-left",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.leftPrevYear($event)
                          }
                        }
                      }),
                      _c("button", {
                        staticClass:
                          "el-picker-panel__icon-btn el-icon-arrow-left",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.leftPrevMonth($event)
                          }
                        }
                      }),
                      _vm.unlinkPanels
                        ? _c("button", {
                            staticClass:
                              "el-picker-panel__icon-btn el-icon-d-arrow-right",
                            class: { "is-disabled": !_vm.enableYearArrow },
                            attrs: {
                              type: "button",
                              disabled: !_vm.enableYearArrow
                            },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                                return _vm.leftNextYear($event)
                              }
                            }
                          })
                        : _vm._e(),
                      _vm.unlinkPanels
                        ? _c("button", {
                            staticClass:
                              "el-picker-panel__icon-btn el-icon-arrow-right",
                            class: { "is-disabled": !_vm.enableMonthArrow },
                            attrs: {
                              type: "button",
                              disabled: !_vm.enableMonthArrow
                            },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                                return _vm.leftNextMonth($event)
                              }
                            }
                          })
                        : _vm._e(),
                      _c("div", [_vm._v(_vm._s(_vm.leftLabel))])
                    ]),
                    _c("date-table", {
                      attrs: {
                        "selection-mode": "range",
                        date: _vm.leftDate,
                        "default-value": _vm.defaultValue,
                        "min-date": _vm.minDate,
                        "max-date": _vm.maxDate,
                        "range-state": _vm.rangeState,
                        "disabled-date": _vm.disabledDate,
                        "first-day-of-week": _vm.firstDayOfWeek
                      },
                      on: {
                        changerange: _vm.handleChangeRange,
                        pick: _vm.handleRangePick
                      }
                    })
                  ],
                  1
                ),
                _c(
                  "div",
                  {
                    staticClass:
                      "el-picker-panel__content el-date-range-picker__content is-right"
                  },
                  [
                    _c("div", { staticClass: "el-date-range-picker__header" }, [
                      _vm.unlinkPanels
                        ? _c("button", {
                            staticClass:
                              "el-picker-panel__icon-btn el-icon-d-arrow-left",
                            class: { "is-disabled": !_vm.enableYearArrow },
                            attrs: {
                              type: "button",
                              disabled: !_vm.enableYearArrow
                            },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                                return _vm.rightPrevYear($event)
                              }
                            }
                          })
                        : _vm._e(),
                      _vm.unlinkPanels
                        ? _c("button", {
                            staticClass:
                              "el-picker-panel__icon-btn el-icon-arrow-left",
                            class: { "is-disabled": !_vm.enableMonthArrow },
                            attrs: {
                              type: "button",
                              disabled: !_vm.enableMonthArrow
                            },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                                return _vm.rightPrevMonth($event)
                              }
                            }
                          })
                        : _vm._e(),
                      _c("button", {
                        staticClass:
                          "el-picker-panel__icon-btn el-icon-d-arrow-right",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.rightNextYear($event)
                          }
                        }
                      }),
                      _c("button", {
                        staticClass:
                          "el-picker-panel__icon-btn el-icon-arrow-right",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.rightNextMonth($event)
                          }
                        }
                      }),
                      _c("div", [_vm._v(_vm._s(_vm.rightLabel))])
                    ]),
                    _c("date-table", {
                      attrs: {
                        "selection-mode": "range",
                        date: _vm.rightDate,
                        "default-value": _vm.defaultValue,
                        "min-date": _vm.minDate,
                        "max-date": _vm.maxDate,
                        "range-state": _vm.rangeState,
                        "disabled-date": _vm.disabledDate,
                        "first-day-of-week": _vm.firstDayOfWeek
                      },
                      on: {
                        changerange: _vm.handleChangeRange,
                        pick: _vm.handleRangePick
                      }
                    })
                  ],
                  1
                )
              ])
            ],
            2
          ),
          _vm.showTime
            ? _c(
                "div",
                { staticClass: "el-picker-panel__footer" },
                [
                  _c(
                    "el-button",
                    {
                      staticClass: "el-picker-panel__link-btn",
                      attrs: { size: "mini", type: "text" },
                      on: { click: _vm.handleClear }
                    },
                    [
                      _vm._v(
                        "\n        " +
                          _vm._s(_vm.t("el.datepicker.clear")) +
                          "\n      "
                      )
                    ]
                  ),
                  _c(
                    "el-button",
                    {
                      staticClass: "el-picker-panel__link-btn",
                      attrs: {
                        plain: "",
                        size: "mini",
                        disabled: _vm.btnDisabled
                      },
                      on: {
                        click: function($event) {
                          return _vm.handleConfirm(false)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n        " +
                          _vm._s(_vm.t("el.datepicker.confirm")) +
                          "\n      "
                      )
                    ]
                  )
                ],
                1
              )
            : _vm._e()
        ]
      )
    ]
  )
}
var date_rangevue_type_template_id_2652849a_staticRenderFns = []
date_rangevue_type_template_id_2652849a_render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/panel/date-range.vue?vue&type=template&id=2652849a&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/date-range.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









var date_rangevue_type_script_lang_js_calcDefaultValue = function calcDefaultValue(defaultValue) {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  } else if (defaultValue) {
    return [new Date(defaultValue), Object(date_util_["nextDate"])(new Date(defaultValue), 1)];
  } else {
    return [new Date(), Object(date_util_["nextDate"])(new Date(), 1)];
  }
};

/* harmony default export */ var date_rangevue_type_script_lang_js_ = ({
  mixins: [locale_default.a],

  directives: { Clickoutside: clickoutside_default.a },

  computed: {
    btnDisabled: function btnDisabled() {
      return !(this.minDate && this.maxDate && !this.selecting && this.isValidValue([this.minDate, this.maxDate]));
    },
    leftLabel: function leftLabel() {
      return this.leftDate.getFullYear() + ' ' + this.t('el.datepicker.year') + ' ' + this.t('el.datepicker.month' + (this.leftDate.getMonth() + 1));
    },
    rightLabel: function rightLabel() {
      return this.rightDate.getFullYear() + ' ' + this.t('el.datepicker.year') + ' ' + this.t('el.datepicker.month' + (this.rightDate.getMonth() + 1));
    },
    leftYear: function leftYear() {
      return this.leftDate.getFullYear();
    },
    leftMonth: function leftMonth() {
      return this.leftDate.getMonth();
    },
    leftMonthDate: function leftMonthDate() {
      return this.leftDate.getDate();
    },
    rightYear: function rightYear() {
      return this.rightDate.getFullYear();
    },
    rightMonth: function rightMonth() {
      return this.rightDate.getMonth();
    },
    rightMonthDate: function rightMonthDate() {
      return this.rightDate.getDate();
    },
    minVisibleDate: function minVisibleDate() {
      if (this.dateUserInput.min !== null) return this.dateUserInput.min;
      if (this.minDate) return Object(date_util_["formatDate"])(this.minDate, this.dateFormat);
      return '';
    },
    maxVisibleDate: function maxVisibleDate() {
      if (this.dateUserInput.max !== null) return this.dateUserInput.max;
      if (this.maxDate || this.minDate) return Object(date_util_["formatDate"])(this.maxDate || this.minDate, this.dateFormat);
      return '';
    },
    minVisibleTime: function minVisibleTime() {
      if (this.timeUserInput.min !== null) return this.timeUserInput.min;
      if (this.minDate) return Object(date_util_["formatDate"])(this.minDate, this.timeFormat);
      return '';
    },
    maxVisibleTime: function maxVisibleTime() {
      if (this.timeUserInput.max !== null) return this.timeUserInput.max;
      if (this.maxDate || this.minDate) return Object(date_util_["formatDate"])(this.maxDate || this.minDate, this.timeFormat);
      return '';
    },
    timeFormat: function timeFormat() {
      if (this.format) {
        return Object(date_util_["extractTimeFormat"])(this.format);
      } else {
        return 'HH:mm:ss';
      }
    },
    dateFormat: function dateFormat() {
      if (this.format) {
        return Object(date_util_["extractDateFormat"])(this.format);
      } else {
        return 'yyyy-MM-dd';
      }
    },
    enableMonthArrow: function enableMonthArrow() {
      var nextMonth = (this.leftMonth + 1) % 12;
      var yearOffset = this.leftMonth + 1 >= 12 ? 1 : 0;
      return this.unlinkPanels && new Date(this.leftYear + yearOffset, nextMonth) < new Date(this.rightYear, this.rightMonth);
    },
    enableYearArrow: function enableYearArrow() {
      return this.unlinkPanels && this.rightYear * 12 + this.rightMonth - (this.leftYear * 12 + this.leftMonth + 1) >= 12;
    }
  },

  data: function data() {
    return {
      minPickerWidth: 0,
      maxPickerWidth: 0,
      popperClass: '',
      value: [],
      defaultValue: null,
      defaultTime: null,
      minDate: '',
      maxDate: '',
      leftDate: new Date(),
      rightDate: Object(date_util_["nextMonth"])(new Date()),
      rangeState: {
        endDate: null,
        selecting: false,
        row: null,
        column: null
      },
      showTime: false,
      shortcuts: '',
      visible: '',
      disabledDate: '',
      firstDayOfWeek: 7,
      minTimePickerVisible: false,
      maxTimePickerVisible: false,
      format: '',
      arrowControl: false,
      unlinkPanels: false,
      dateUserInput: {
        min: null,
        max: null
      },
      timeUserInput: {
        min: null,
        max: null
      },
      width: 0
    };
  },


  watch: {
    minDate: function minDate(val) {
      var _this = this;

      this.dateUserInput.min = null;
      this.timeUserInput.min = null;
      this.$nextTick(function () {
        if (_this.$refs.maxTimePicker && _this.maxDate && _this.maxDate < _this.minDate) {
          var format = 'HH:mm:ss';
          _this.$refs.maxTimePicker.selectableRange = [[Object(date_util_["parseDate"])(Object(date_util_["formatDate"])(_this.minDate, format), format), Object(date_util_["parseDate"])('23:59:59', format)]];
        }
      });
      if (val && this.$refs.minTimePicker) {
        this.$refs.minTimePicker.date = val;
        this.$refs.minTimePicker.value = val;
      }
    },
    maxDate: function maxDate(val) {
      this.dateUserInput.max = null;
      this.timeUserInput.max = null;
      if (val && this.$refs.maxTimePicker) {
        this.$refs.maxTimePicker.date = val;
        this.$refs.maxTimePicker.value = val;
      }
    },
    minTimePickerVisible: function minTimePickerVisible(val) {
      var _this2 = this;

      if (val) {
        this.$nextTick(function () {
          _this2.$refs.minTimePicker.date = _this2.minDate;
          _this2.$refs.minTimePicker.value = _this2.minDate;
          _this2.$refs.minTimePicker.adjustSpinners();
        });
      }
    },
    maxTimePickerVisible: function maxTimePickerVisible(val) {
      var _this3 = this;

      if (val) {
        this.$nextTick(function () {
          _this3.$refs.maxTimePicker.date = _this3.maxDate;
          _this3.$refs.maxTimePicker.value = _this3.maxDate;
          _this3.$refs.maxTimePicker.adjustSpinners();
        });
      }
    },
    value: function value(newVal) {
      if (!newVal) {
        this.minDate = null;
        this.maxDate = null;
      } else if (Array.isArray(newVal)) {
        this.minDate = Object(date_util_["isDate"])(newVal[0]) ? new Date(newVal[0]) : null;
        this.maxDate = Object(date_util_["isDate"])(newVal[1]) ? new Date(newVal[1]) : null;
        if (this.minDate) {
          this.leftDate = this.minDate;
          if (this.unlinkPanels && this.maxDate) {
            var minDateYear = this.minDate.getFullYear();
            var minDateMonth = this.minDate.getMonth();
            var maxDateYear = this.maxDate.getFullYear();
            var maxDateMonth = this.maxDate.getMonth();
            this.rightDate = minDateYear === maxDateYear && minDateMonth === maxDateMonth ? Object(date_util_["nextMonth"])(this.maxDate) : this.maxDate;
          } else {
            this.rightDate = Object(date_util_["nextMonth"])(this.leftDate);
          }
        } else {
          this.leftDate = date_rangevue_type_script_lang_js_calcDefaultValue(this.defaultValue)[0];
          this.rightDate = Object(date_util_["nextMonth"])(this.leftDate);
        }
      }
    },
    defaultValue: function defaultValue(val) {
      if (!Array.isArray(this.value)) {
        var _calcDefaultValue = date_rangevue_type_script_lang_js_calcDefaultValue(val),
            left = _calcDefaultValue[0],
            right = _calcDefaultValue[1];

        this.leftDate = left;
        this.rightDate = val && val[1] && this.unlinkPanels ? right : Object(date_util_["nextMonth"])(this.leftDate);
      }
    }
  },

  methods: {
    handleClear: function handleClear() {
      this.minDate = null;
      this.maxDate = null;
      this.leftDate = date_rangevue_type_script_lang_js_calcDefaultValue(this.defaultValue)[0];
      this.rightDate = Object(date_util_["nextMonth"])(this.leftDate);
      this.$emit('pick', null);
    },
    handleChangeRange: function handleChangeRange(val) {
      this.minDate = val.minDate;
      this.maxDate = val.maxDate;
      this.rangeState = val.rangeState;
    },
    handleDateInput: function handleDateInput(value, type) {
      this.dateUserInput[type] = value;
      if (value.length !== this.dateFormat.length) return;
      var parsedValue = Object(date_util_["parseDate"])(value, this.dateFormat);

      if (parsedValue) {
        if (typeof this.disabledDate === 'function' && this.disabledDate(new Date(parsedValue))) {
          return;
        }
        if (type === 'min') {
          this.minDate = Object(date_util_["modifyDate"])(this.minDate || new Date(), parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
          this.leftDate = new Date(parsedValue);
          if (!this.unlinkPanels) {
            this.rightDate = Object(date_util_["nextMonth"])(this.leftDate);
          }
        } else {
          this.maxDate = Object(date_util_["modifyDate"])(this.maxDate || new Date(), parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
          this.rightDate = new Date(parsedValue);
          if (!this.unlinkPanels) {
            this.leftDate = Object(date_util_["prevMonth"])(parsedValue);
          }
        }
      }
    },
    handleDateChange: function handleDateChange(value, type) {
      var parsedValue = Object(date_util_["parseDate"])(value, this.dateFormat);
      if (parsedValue) {
        if (type === 'min') {
          this.minDate = Object(date_util_["modifyDate"])(this.minDate, parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
          if (this.minDate > this.maxDate) {
            this.maxDate = this.minDate;
          }
        } else {
          this.maxDate = Object(date_util_["modifyDate"])(this.maxDate, parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
          if (this.maxDate < this.minDate) {
            this.minDate = this.maxDate;
          }
        }
      }
    },
    handleTimeInput: function handleTimeInput(value, type) {
      var _this4 = this;

      this.timeUserInput[type] = value;
      if (value.length !== this.timeFormat.length) return;
      var parsedValue = Object(date_util_["parseDate"])(value, this.timeFormat);

      if (parsedValue) {
        if (type === 'min') {
          this.minDate = Object(date_util_["modifyTime"])(this.minDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          this.$nextTick(function (_) {
            return _this4.$refs.minTimePicker.adjustSpinners();
          });
        } else {
          this.maxDate = Object(date_util_["modifyTime"])(this.maxDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          this.$nextTick(function (_) {
            return _this4.$refs.maxTimePicker.adjustSpinners();
          });
        }
      }
    },
    handleTimeChange: function handleTimeChange(value, type) {
      var parsedValue = Object(date_util_["parseDate"])(value, this.timeFormat);
      if (parsedValue) {
        if (type === 'min') {
          this.minDate = Object(date_util_["modifyTime"])(this.minDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          if (this.minDate > this.maxDate) {
            this.maxDate = this.minDate;
          }
          this.$refs.minTimePicker.value = this.minDate;
          // this.minTimePickerVisible = false;
        } else {
          this.maxDate = Object(date_util_["modifyTime"])(this.maxDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          if (this.maxDate < this.minDate) {
            this.minDate = this.maxDate;
          }
          this.$refs.maxTimePicker.value = this.minDate;
          // this.maxTimePickerVisible = false;
        }
      }
    },
    handleRangePick: function handleRangePick(val) {
      var _this5 = this;

      var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var defaultTime = this.defaultTime || [];
      var minDate = Object(date_util_["modifyWithTimeString"])(val.minDate, defaultTime[0]);
      var maxDate = Object(date_util_["modifyWithTimeString"])(val.maxDate, defaultTime[1]);

      if (this.maxDate === maxDate && this.minDate === minDate) {
        return;
      }
      this.onPick && this.onPick(val);
      this.maxDate = maxDate;
      this.minDate = minDate;

      // workaround for https://github.com/ElemeFE/element/issues/7539, should remove this block when we don't have to care about Chromium 55 - 57
      setTimeout(function () {
        _this5.maxDate = maxDate;
        _this5.minDate = minDate;
      }, 10);
      if (!close || this.showTime) return;
      this.handleConfirm();
    },
    handleShortcutClick: function handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },
    handleMinTimePick: function handleMinTimePick(value, visible, first) {
      this.minDate = this.minDate || new Date();
      if (value) {
        this.minDate = Object(date_util_["modifyTime"])(this.minDate, value.getHours(), value.getMinutes(), value.getSeconds());
      }

      if (!first) {
        this.minTimePickerVisible = visible;
      }

      if (!this.maxDate || this.maxDate && this.maxDate.getTime() < this.minDate.getTime()) {
        this.maxDate = new Date(this.minDate);
      }
    },
    handleMinTimeClose: function handleMinTimeClose() {
      this.minTimePickerVisible = false;
    },
    handleMaxTimePick: function handleMaxTimePick(value, visible, first) {
      if (this.maxDate && value) {
        this.maxDate = Object(date_util_["modifyTime"])(this.maxDate, value.getHours(), value.getMinutes(), value.getSeconds());
      }

      if (!first) {
        this.maxTimePickerVisible = visible;
      }

      if (this.maxDate && this.minDate && this.minDate.getTime() > this.maxDate.getTime()) {
        this.minDate = new Date(this.maxDate);
      }
    },
    handleMaxTimeClose: function handleMaxTimeClose() {
      this.maxTimePickerVisible = false;
    },


    // leftPrev*, rightNext* need to take care of `unlinkPanels`
    leftPrevYear: function leftPrevYear() {
      this.leftDate = Object(date_util_["prevYear"])(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = Object(date_util_["nextMonth"])(this.leftDate);
      }
    },
    leftPrevMonth: function leftPrevMonth() {
      this.leftDate = Object(date_util_["prevMonth"])(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = Object(date_util_["nextMonth"])(this.leftDate);
      }
    },
    rightNextYear: function rightNextYear() {
      if (!this.unlinkPanels) {
        this.leftDate = Object(date_util_["nextYear"])(this.leftDate);
        this.rightDate = Object(date_util_["nextMonth"])(this.leftDate);
      } else {
        this.rightDate = Object(date_util_["nextYear"])(this.rightDate);
      }
    },
    rightNextMonth: function rightNextMonth() {
      if (!this.unlinkPanels) {
        this.leftDate = Object(date_util_["nextMonth"])(this.leftDate);
        this.rightDate = Object(date_util_["nextMonth"])(this.leftDate);
      } else {
        this.rightDate = Object(date_util_["nextMonth"])(this.rightDate);
      }
    },


    // leftNext*, rightPrev* are called when `unlinkPanels` is true
    leftNextYear: function leftNextYear() {
      this.leftDate = Object(date_util_["nextYear"])(this.leftDate);
    },
    leftNextMonth: function leftNextMonth() {
      this.leftDate = Object(date_util_["nextMonth"])(this.leftDate);
    },
    rightPrevYear: function rightPrevYear() {
      this.rightDate = Object(date_util_["prevYear"])(this.rightDate);
    },
    rightPrevMonth: function rightPrevMonth() {
      this.rightDate = Object(date_util_["prevMonth"])(this.rightDate);
    },
    handleConfirm: function handleConfirm() {
      var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.isValidValue([this.minDate, this.maxDate])) {
        this.$emit('pick', [this.minDate, this.maxDate], visible);
      }
    },
    isValidValue: function isValidValue(value) {
      return Array.isArray(value) && value && value[0] && value[1] && Object(date_util_["isDate"])(value[0]) && Object(date_util_["isDate"])(value[1]) && value[0].getTime() <= value[1].getTime() && (typeof this.disabledDate === 'function' ? !this.disabledDate(value[0]) && !this.disabledDate(value[1]) : true);
    },
    resetView: function resetView() {
      // NOTE: this is a hack to reset {min, max}Date on picker open.
      // TODO: correct way of doing so is to refactor {min, max}Date to be dependent on value and internal selection state
      //       an alternative would be resetView whenever picker becomes visible, should also investigate date-panel's resetView
      this.minDate = this.value && Object(date_util_["isDate"])(this.value[0]) ? new Date(this.value[0]) : null;
      this.maxDate = this.value && Object(date_util_["isDate"])(this.value[0]) ? new Date(this.value[1]) : null;
    }
  },

  components: { TimePicker: panel_time["a" /* default */], DateTable: date_table, ElInput: input_default.a, ElButton: button_default.a }
});
// CONCATENATED MODULE: ./packages/date-picker/src/panel/date-range.vue?vue&type=script&lang=js&
 /* harmony default export */ var panel_date_rangevue_type_script_lang_js_ = (date_rangevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/date-picker/src/panel/date-range.vue





/* normalize component */

var date_range_component = Object(componentNormalizer["a" /* default */])(
  panel_date_rangevue_type_script_lang_js_,
  date_rangevue_type_template_id_2652849a_render,
  date_rangevue_type_template_id_2652849a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var date_range_api; }
date_range_component.options.__file = "packages/date-picker/src/panel/date-range.vue"
/* harmony default export */ var date_range = (date_range_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/month-range.vue?vue&type=template&id=f2645fb8&
var month_rangevue_type_template_id_f2645fb8_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "el-zoom-in-top" },
      on: {
        "after-leave": function($event) {
          return _vm.$emit("dodestroy")
        }
      }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "el-picker-panel el-date-range-picker el-popover",
          class: [
            {
              "has-sidebar": _vm.$slots.sidebar || _vm.shortcuts
            },
            _vm.popperClass
          ]
        },
        [
          _c(
            "div",
            { staticClass: "el-picker-panel__body-wrapper" },
            [
              _vm._t("sidebar"),
              _vm.shortcuts
                ? _c(
                    "div",
                    { staticClass: "el-picker-panel__sidebar" },
                    _vm._l(_vm.shortcuts, function(shortcut, key) {
                      return _c(
                        "button",
                        {
                          key: "monthCut_" + key,
                          staticClass: "el-picker-panel__shortcut",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              return _vm.handleShortcutClick(shortcut)
                            }
                          }
                        },
                        [_vm._v(_vm._s(shortcut.text))]
                      )
                    }),
                    0
                  )
                : _vm._e(),
              _c("div", { staticClass: "el-picker-panel__body" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "el-picker-panel__content el-date-range-picker__content is-left"
                  },
                  [
                    _c("div", { staticClass: "el-date-range-picker__header" }, [
                      _c("button", {
                        staticClass:
                          "el-picker-panel__icon-btn el-icon-d-arrow-left",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.leftPrevYear($event)
                          }
                        }
                      }),
                      _vm.unlinkPanels
                        ? _c("button", {
                            staticClass:
                              "el-picker-panel__icon-btn el-icon-d-arrow-right",
                            class: { "is-disabled": !_vm.enableYearArrow },
                            attrs: {
                              type: "button",
                              disabled: !_vm.enableYearArrow
                            },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                                return _vm.leftNextYear($event)
                              }
                            }
                          })
                        : _vm._e(),
                      _c("div", [_vm._v(_vm._s(_vm.leftLabel))])
                    ]),
                    _c("month-table", {
                      attrs: {
                        "selection-mode": "range",
                        date: _vm.leftDate,
                        "default-value": _vm.defaultValue,
                        "min-date": _vm.minDate,
                        "max-date": _vm.maxDate,
                        "range-state": _vm.rangeState,
                        "disabled-date": _vm.disabledDate
                      },
                      on: {
                        changerange: _vm.handleChangeRange,
                        pick: _vm.handleRangePick
                      }
                    })
                  ],
                  1
                ),
                _c(
                  "div",
                  {
                    staticClass:
                      "el-picker-panel__content el-date-range-picker__content is-right"
                  },
                  [
                    _c("div", { staticClass: "el-date-range-picker__header" }, [
                      _c("button", {
                        staticClass:
                          "el-picker-panel__icon-btn el-icon-d-arrow-right",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            $event.stopPropagation()
                            return _vm.rightNextYear($event)
                          }
                        }
                      }),
                      _vm.unlinkPanels
                        ? _c("button", {
                            staticClass:
                              "el-picker-panel__icon-btn el-icon-d-arrow-left",
                            class: { "is-disabled": !_vm.enableYearArrow },
                            attrs: {
                              type: "button",
                              disabled: !_vm.enableYearArrow
                            },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                                return _vm.rightPrevYear($event)
                              }
                            }
                          })
                        : _vm._e(),
                      _c("div", [_vm._v(_vm._s(_vm.rightLabel))])
                    ]),
                    _c("month-table", {
                      attrs: {
                        "selection-mode": "range",
                        date: _vm.rightDate,
                        "default-value": _vm.defaultValue,
                        "min-date": _vm.minDate,
                        "max-date": _vm.maxDate,
                        "range-state": _vm.rangeState,
                        "disabled-date": _vm.disabledDate
                      },
                      on: {
                        changerange: _vm.handleChangeRange,
                        pick: _vm.handleRangePick
                      }
                    })
                  ],
                  1
                )
              ])
            ],
            2
          )
        ]
      )
    ]
  )
}
var month_rangevue_type_template_id_f2645fb8_staticRenderFns = []
month_rangevue_type_template_id_f2645fb8_render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/panel/month-range.vue?vue&type=template&id=f2645fb8&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/month-range.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








var month_rangevue_type_script_lang_js_calcDefaultValue = function calcDefaultValue(defaultValue) {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  } else if (defaultValue) {
    return [new Date(defaultValue), Object(date_util_["nextMonth"])(new Date(defaultValue))];
  } else {
    return [new Date(), Object(date_util_["nextMonth"])(new Date())];
  }
};
/* harmony default export */ var month_rangevue_type_script_lang_js_ = ({
  mixins: [locale_default.a],

  directives: { Clickoutside: clickoutside_default.a },

  computed: {
    btnDisabled: function btnDisabled() {
      return !(this.minDate && this.maxDate && !this.selecting && this.isValidValue([this.minDate, this.maxDate]));
    },
    leftLabel: function leftLabel() {
      return this.leftDate.getFullYear() + ' ' + this.t('el.datepicker.year');
    },
    rightLabel: function rightLabel() {
      return this.rightDate.getFullYear() + ' ' + this.t('el.datepicker.year');
    },
    leftYear: function leftYear() {
      return this.leftDate.getFullYear();
    },
    rightYear: function rightYear() {
      return this.rightDate.getFullYear() === this.leftDate.getFullYear() ? this.leftDate.getFullYear() + 1 : this.rightDate.getFullYear();
    },
    enableYearArrow: function enableYearArrow() {
      return this.unlinkPanels && this.rightYear > this.leftYear + 1;
    }
  },

  data: function data() {
    return {
      popperClass: '',
      value: [],
      defaultValue: null,
      defaultTime: null,
      minDate: '',
      maxDate: '',
      leftDate: new Date(),
      rightDate: Object(date_util_["nextYear"])(new Date()),
      rangeState: {
        endDate: null,
        selecting: false,
        row: null,
        column: null
      },
      shortcuts: '',
      visible: '',
      disabledDate: '',
      format: '',
      arrowControl: false,
      unlinkPanels: false
    };
  },


  watch: {
    value: function value(newVal) {
      if (!newVal) {
        this.minDate = null;
        this.maxDate = null;
      } else if (Array.isArray(newVal)) {
        this.minDate = Object(date_util_["isDate"])(newVal[0]) ? new Date(newVal[0]) : null;
        this.maxDate = Object(date_util_["isDate"])(newVal[1]) ? new Date(newVal[1]) : null;
        if (this.minDate) {
          this.leftDate = this.minDate;
          if (this.unlinkPanels && this.maxDate) {
            var minDateYear = this.minDate.getFullYear();
            var maxDateYear = this.maxDate.getFullYear();
            this.rightDate = minDateYear === maxDateYear ? Object(date_util_["nextYear"])(this.maxDate) : this.maxDate;
          } else {
            this.rightDate = Object(date_util_["nextYear"])(this.leftDate);
          }
        } else {
          this.leftDate = month_rangevue_type_script_lang_js_calcDefaultValue(this.defaultValue)[0];
          this.rightDate = Object(date_util_["nextYear"])(this.leftDate);
        }
      }
    },
    defaultValue: function defaultValue(val) {
      if (!Array.isArray(this.value)) {
        var _calcDefaultValue = month_rangevue_type_script_lang_js_calcDefaultValue(val),
            left = _calcDefaultValue[0],
            right = _calcDefaultValue[1];

        this.leftDate = left;
        this.rightDate = val && val[1] && left.getFullYear() !== right.getFullYear() && this.unlinkPanels ? right : Object(date_util_["nextYear"])(this.leftDate);
      }
    }
  },

  methods: {
    handleClear: function handleClear() {
      this.minDate = null;
      this.maxDate = null;
      this.leftDate = month_rangevue_type_script_lang_js_calcDefaultValue(this.defaultValue)[0];
      this.rightDate = Object(date_util_["nextYear"])(this.leftDate);
      this.$emit('pick', null);
    },
    handleChangeRange: function handleChangeRange(val) {
      this.minDate = val.minDate;
      this.maxDate = val.maxDate;
      this.rangeState = val.rangeState;
    },
    handleRangePick: function handleRangePick(val) {
      var _this = this;

      var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var defaultTime = this.defaultTime || [];
      var minDate = Object(date_util_["modifyWithTimeString"])(val.minDate, defaultTime[0]);
      var maxDate = Object(date_util_["modifyWithTimeString"])(val.maxDate, defaultTime[1]);
      if (this.maxDate === maxDate && this.minDate === minDate) {
        return;
      }
      this.onPick && this.onPick(val);
      this.maxDate = maxDate;
      this.minDate = minDate;

      // workaround for https://github.com/ElemeFE/element/issues/7539, should remove this block when we don't have to care about Chromium 55 - 57
      setTimeout(function () {
        _this.maxDate = maxDate;
        _this.minDate = minDate;
      }, 10);
      if (!close) return;
      this.handleConfirm();
    },
    handleShortcutClick: function handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },


    // leftPrev*, rightNext* need to take care of `unlinkPanels`
    leftPrevYear: function leftPrevYear() {
      this.leftDate = Object(date_util_["prevYear"])(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = Object(date_util_["prevYear"])(this.rightDate);
      }
    },
    rightNextYear: function rightNextYear() {
      if (!this.unlinkPanels) {
        this.leftDate = Object(date_util_["nextYear"])(this.leftDate);
      }
      this.rightDate = Object(date_util_["nextYear"])(this.rightDate);
    },


    // leftNext*, rightPrev* are called when `unlinkPanels` is true
    leftNextYear: function leftNextYear() {
      this.leftDate = Object(date_util_["nextYear"])(this.leftDate);
    },
    rightPrevYear: function rightPrevYear() {
      this.rightDate = Object(date_util_["prevYear"])(this.rightDate);
    },
    handleConfirm: function handleConfirm() {
      var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.isValidValue([this.minDate, this.maxDate])) {
        this.$emit('pick', [this.minDate, this.maxDate], visible);
      }
    },
    isValidValue: function isValidValue(value) {
      return Array.isArray(value) && value && value[0] && value[1] && Object(date_util_["isDate"])(value[0]) && Object(date_util_["isDate"])(value[1]) && value[0].getTime() <= value[1].getTime() && (typeof this.disabledDate === 'function' ? !this.disabledDate(value[0]) && !this.disabledDate(value[1]) : true);
    },
    resetView: function resetView() {
      // NOTE: this is a hack to reset {min, max}Date on picker open.
      // TODO: correct way of doing so is to refactor {min, max}Date to be dependent on value and internal selection state
      //       an alternative would be resetView whenever picker becomes visible, should also investigate date-panel's resetView
      this.minDate = this.value && Object(date_util_["isDate"])(this.value[0]) ? new Date(this.value[0]) : null;
      this.maxDate = this.value && Object(date_util_["isDate"])(this.value[0]) ? new Date(this.value[1]) : null;
    }
  },

  components: { MonthTable: month_table, ElInput: input_default.a, ElButton: button_default.a }
});
// CONCATENATED MODULE: ./packages/date-picker/src/panel/month-range.vue?vue&type=script&lang=js&
 /* harmony default export */ var panel_month_rangevue_type_script_lang_js_ = (month_rangevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/date-picker/src/panel/month-range.vue





/* normalize component */

var month_range_component = Object(componentNormalizer["a" /* default */])(
  panel_month_rangevue_type_script_lang_js_,
  month_rangevue_type_template_id_f2645fb8_render,
  month_rangevue_type_template_id_f2645fb8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var month_range_api; }
month_range_component.options.__file = "packages/date-picker/src/panel/month-range.vue"
/* harmony default export */ var month_range = (month_range_component.exports);
// CONCATENATED MODULE: ./packages/date-picker/src/picker/date-picker.js





var date_picker_getPanel = function getPanel(type) {
  if (type === 'daterange' || type === 'datetimerange') {
    return date_range;
  } else if (type === 'monthrange') {
    return month_range;
  }
  return panel_date;
};

/* harmony default export */ var date_picker = __webpack_exports__["a"] = ({
  mixins: [picker["a" /* default */]],

  name: 'ElDatePicker',
  xtype: 'YuDatePicker',

  props: {
    type: {
      type: String,
      default: 'date'
    },
    timeArrowControl: Boolean
  },
  beforeDestroy: function beforeDestroy() {
    this.unmountPicker();
  },

  watch: {
    type: function type(_type) {
      if (this.picker) {
        this.unmountPicker();
        this.panel = date_picker_getPanel(_type);
        this.mountPicker();
      } else {
        this.panel = date_picker_getPanel(_type);
      }
    }
  },

  created: function created() {
    this.panel = date_picker_getPanel(this.type);
  }
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./packages/date-picker/src/picker.vue + 4 modules
var picker = __webpack_require__(16);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/time-select.vue?vue&type=template&id=51ab9320&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "el-zoom-in-top" },
      on: {
        "before-enter": _vm.handleMenuEnter,
        "after-leave": function($event) {
          return _vm.$emit("dodestroy")
        }
      }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          ref: "popper",
          staticClass: "el-picker-panel time-select el-popover",
          class: _vm.popperClass,
          style: { width: _vm.width + "px" }
        },
        [
          _c(
            "el-scrollbar",
            {
              attrs: { noresize: "", "wrap-class": "el-picker-panel__content" }
            },
            _vm._l(_vm.items, function(item) {
              return _c(
                "div",
                {
                  key: item.value,
                  staticClass: "time-select-item",
                  class: {
                    selected: _vm.value === item.value,
                    disabled: item.disabled,
                    default: item.value === _vm.defaultValue
                  },
                  attrs: { disabled: item.disabled },
                  on: {
                    click: function($event) {
                      return _vm.handleClick(item)
                    }
                  }
                },
                [_vm._v(_vm._s(item.value))]
              )
            }),
            0
          )
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/panel/time-select.vue?vue&type=template&id=51ab9320&

// EXTERNAL MODULE: external "@/lib/scrollbar"
var scrollbar_ = __webpack_require__(15);
var scrollbar_default = /*#__PURE__*/__webpack_require__.n(scrollbar_);

// EXTERNAL MODULE: external "@/lib/utils/scroll-into-view"
var scroll_into_view_ = __webpack_require__(38);
var scroll_into_view_default = /*#__PURE__*/__webpack_require__.n(scroll_into_view_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/time-select.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var parseTime = function parseTime(time) {
  var values = (time || '').split(':');
  if (values.length >= 2) {
    var hours = parseInt(values[0], 10);
    var minutes = parseInt(values[1], 10);

    return {
      hours: hours,
      minutes: minutes
    };
  }
  /* istanbul ignore next */
  return null;
};

var compareTime = function compareTime(time1, time2) {
  var value1 = parseTime(time1);
  var value2 = parseTime(time2);

  var minutes1 = value1.minutes + value1.hours * 60;
  var minutes2 = value2.minutes + value2.hours * 60;

  if (minutes1 === minutes2) {
    return 0;
  }

  return minutes1 > minutes2 ? 1 : -1;
};

var formatTime = function formatTime(time) {
  return (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes);
};

var nextTime = function nextTime(time, step) {
  var timeValue = parseTime(time);
  var stepValue = parseTime(step);

  var next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  };

  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;

  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;

  return formatTime(next);
};

/* harmony default export */ var time_selectvue_type_script_lang_js_ = ({
  components: { ElScrollbar: scrollbar_default.a },

  watch: {
    value: function value(val) {
      var _this = this;

      if (!val) return;
      this.$nextTick(function () {
        return _this.scrollToOption();
      });
    }
  },

  methods: {
    handleClick: function handleClick(item) {
      if (!item.disabled) {
        this.$emit('pick', item.value);
      }
    },
    handleClear: function handleClear() {
      this.$emit('pick', null);
    },
    scrollToOption: function scrollToOption() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.selected';

      var menu = this.$refs.popper.querySelector('.el-picker-panel__content');
      scroll_into_view_default()(menu, menu.querySelector(selector));
    },
    handleMenuEnter: function handleMenuEnter() {
      var _this2 = this;

      var selected = this.items.map(function (item) {
        return item.value;
      }).indexOf(this.value) !== -1;
      var hasDefault = this.items.map(function (item) {
        return item.value;
      }).indexOf(this.defaultValue) !== -1;
      var option = selected && '.selected' || hasDefault && '.default' || '.time-select-item:not(.disabled)';
      this.$nextTick(function () {
        return _this2.scrollToOption(option);
      });
    },
    scrollDown: function scrollDown(step) {
      var items = this.items;
      var length = items.length;
      var total = items.length;
      var index = items.map(function (item) {
        return item.value;
      }).indexOf(this.value);
      while (total--) {
        index = (index + step + length) % length;
        if (!items[index].disabled) {
          this.$emit('pick', items[index].value, true);
          return;
        }
      }
    },
    isValidValue: function isValidValue(date) {
      return this.items.filter(function (item) {
        return !item.disabled;
      }).map(function (item) {
        return item.value;
      }).indexOf(date) !== -1;
    },
    handleKeydown: function handleKeydown(event) {
      var keyCode = event.keyCode;
      if (keyCode === 38 || keyCode === 40) {
        var mapping = { 40: 1, 38: -1 };
        var offset = mapping[keyCode.toString()];
        this.scrollDown(offset);
        event.stopPropagation();
        return;
      }
    }
  },

  data: function data() {
    return {
      popperClass: '',
      start: '09:00',
      end: '18:00',
      step: '00:30',
      value: '',
      defaultValue: '',
      visible: false,
      minTime: '',
      maxTime: '',
      width: 0
    };
  },


  computed: {
    items: function items() {
      var start = this.start;
      var end = this.end;
      var step = this.step;

      var result = [];

      if (start && end && step) {
        var current = start;
        while (compareTime(current, end) <= 0) {
          result.push({
            value: current,
            disabled: compareTime(current, this.minTime || '-1:-1') <= 0 || compareTime(current, this.maxTime || '100:100') >= 0
          });
          current = nextTime(current, step);
        }
      }

      return result;
    }
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/panel/time-select.vue?vue&type=script&lang=js&
 /* harmony default export */ var panel_time_selectvue_type_script_lang_js_ = (time_selectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/date-picker/src/panel/time-select.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  panel_time_selectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/date-picker/src/panel/time-select.vue"
/* harmony default export */ var time_select = (component.exports);
// CONCATENATED MODULE: ./packages/date-picker/src/picker/time-select.js



/* harmony default export */ var picker_time_select = __webpack_exports__["a"] = ({
  mixins: [picker["a" /* default */]],

  name: 'ElTimeSelect',
  xtype: 'YuTimeSelect',
  componentName: 'ElTimeSelect',

  props: {
    type: {
      type: String,
      default: 'time-select'
    }
  },

  beforeCreate: function beforeCreate() {
    this.panel = time_select;
  },
  beforeDestroy: function beforeDestroy() {
    this.panel = null;
  }
});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./packages/date-picker/src/picker.vue + 4 modules
var picker = __webpack_require__(16);

// EXTERNAL MODULE: ./packages/date-picker/src/panel/time.vue + 4 modules
var time = __webpack_require__(12);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/time-range.vue?vue&type=template&id=fb28660e&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "el-zoom-in-top" },
      on: {
        "after-leave": function($event) {
          return _vm.$emit("dodestroy")
        }
      }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "el-time-range-picker el-picker-panel el-popover",
          class: _vm.popperClass
        },
        [
          _c("div", { staticClass: "el-time-range-picker__content" }, [
            _c("div", { staticClass: "el-time-range-picker__cell" }, [
              _c("div", { staticClass: "el-time-range-picker__header" }, [
                _vm._v(_vm._s(_vm.t("el.datepicker.startTime")))
              ]),
              _c(
                "div",
                {
                  staticClass:
                    "el-time-range-picker__body el-time-panel__content",
                  class: {
                    "has-seconds": _vm.showSeconds,
                    "is-arrow": _vm.arrowControl
                  }
                },
                [
                  _c("time-spinner", {
                    ref: "minSpinner",
                    attrs: {
                      "show-seconds": _vm.showSeconds,
                      "am-pm-mode": _vm.amPmMode,
                      "arrow-control": _vm.arrowControl,
                      date: _vm.minDate
                    },
                    on: {
                      change: _vm.handleMinChange,
                      "select-range": _vm.setMinSelectionRange
                    }
                  })
                ],
                1
              )
            ]),
            _c("div", { staticClass: "el-time-range-picker__cell" }, [
              _c("div", { staticClass: "el-time-range-picker__header" }, [
                _vm._v(_vm._s(_vm.t("el.datepicker.endTime")))
              ]),
              _c(
                "div",
                {
                  staticClass:
                    "el-time-range-picker__body el-time-panel__content",
                  class: {
                    "has-seconds": _vm.showSeconds,
                    "is-arrow": _vm.arrowControl
                  }
                },
                [
                  _c("time-spinner", {
                    ref: "maxSpinner",
                    attrs: {
                      "show-seconds": _vm.showSeconds,
                      "am-pm-mode": _vm.amPmMode,
                      "arrow-control": _vm.arrowControl,
                      date: _vm.maxDate
                    },
                    on: {
                      change: _vm.handleMaxChange,
                      "select-range": _vm.setMaxSelectionRange
                    }
                  })
                ],
                1
              )
            ])
          ]),
          _c("div", { staticClass: "el-time-panel__footer" }, [
            _c(
              "button",
              {
                staticClass: "el-time-panel__btn cancel",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    $event.stopPropagation()
                    return _vm.handleCancel()
                  }
                }
              },
              [_vm._v(_vm._s(_vm.t("el.datepicker.cancel")))]
            ),
            _c(
              "button",
              {
                staticClass: "el-time-panel__btn confirm",
                attrs: { type: "button", disabled: _vm.btnDisabled },
                on: {
                  click: function($event) {
                    $event.stopPropagation()
                    return _vm.handleConfirm()
                  }
                }
              },
              [_vm._v(_vm._s(_vm.t("el.datepicker.confirm")))]
            )
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/date-picker/src/panel/time-range.vue?vue&type=template&id=fb28660e&

// EXTERNAL MODULE: external "@/lib/utils/date-util"
var date_util_ = __webpack_require__(0);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: ./packages/date-picker/src/basic/time-spinner.vue + 5 modules
var time_spinner = __webpack_require__(22);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/date-picker/src/panel/time-range.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





var MIN_TIME = Object(date_util_["parseDate"])('00:00:00', 'HH:mm:ss');
var MAX_TIME = Object(date_util_["parseDate"])('23:59:59', 'HH:mm:ss');

var time_rangevue_type_script_lang_js_minTimeOfDay = function minTimeOfDay(date) {
  return Object(date_util_["modifyDate"])(MIN_TIME, date.getFullYear(), date.getMonth(), date.getDate());
};

var time_rangevue_type_script_lang_js_maxTimeOfDay = function maxTimeOfDay(date) {
  return Object(date_util_["modifyDate"])(MAX_TIME, date.getFullYear(), date.getMonth(), date.getDate());
};

// increase time by amount of milliseconds, but within the range of day
var advanceTime = function advanceTime(date, amount) {
  return new Date(Math.min(date.getTime() + amount, time_rangevue_type_script_lang_js_maxTimeOfDay(date).getTime()));
};

/* harmony default export */ var time_rangevue_type_script_lang_js_ = ({
  mixins: [locale_default.a],

  components: { TimeSpinner: time_spinner["a" /* default */] },

  computed: {
    showSeconds: function showSeconds() {
      return (this.format || '').indexOf('ss') !== -1;
    },
    offset: function offset() {
      return this.showSeconds ? 11 : 8;
    },
    spinner: function spinner() {
      return this.selectionRange[0] < this.offset ? this.$refs.minSpinner : this.$refs.maxSpinner;
    },
    btnDisabled: function btnDisabled() {
      return this.minDate.getTime() > this.maxDate.getTime();
    },
    amPmMode: function amPmMode() {
      if ((this.format || '').indexOf('A') !== -1) return 'A';
      if ((this.format || '').indexOf('a') !== -1) return 'a';
      return '';
    }
  },

  data: function data() {
    return {
      popperClass: '',
      minDate: new Date(),
      maxDate: new Date(),
      value: [],
      oldValue: [new Date(), new Date()],
      defaultValue: null,
      format: 'HH:mm:ss',
      visible: false,
      selectionRange: [0, 2],
      arrowControl: false,
      width: 0
    };
  },


  watch: {
    value: function value(_value) {
      if (Array.isArray(_value)) {
        this.minDate = new Date(_value[0]);
        this.maxDate = new Date(_value[1]);
      } else {
        if (Array.isArray(this.defaultValue)) {
          this.minDate = new Date(this.defaultValue[0]);
          this.maxDate = new Date(this.defaultValue[1]);
        } else if (this.defaultValue) {
          this.minDate = new Date(this.defaultValue);
          this.maxDate = advanceTime(new Date(this.defaultValue), 60 * 60 * 1000);
        } else {
          this.minDate = new Date();
          this.maxDate = advanceTime(new Date(), 60 * 60 * 1000);
        }
      }
    },
    visible: function visible(val) {
      var _this = this;

      if (val) {
        this.oldValue = this.value;
        this.$nextTick(function () {
          return _this.$refs.minSpinner.emitSelectRange('hours');
        });
      }
    }
  },

  methods: {
    handleClear: function handleClear() {
      this.$emit('pick', null);
    },
    handleCancel: function handleCancel() {
      this.$emit('pick', this.oldValue);
    },
    handleMinChange: function handleMinChange(date) {
      this.minDate = Object(date_util_["clearMilliseconds"])(date);
      this.handleChange();
    },
    handleMaxChange: function handleMaxChange(date) {
      this.maxDate = Object(date_util_["clearMilliseconds"])(date);
      this.handleChange();
    },
    handleChange: function handleChange() {
      if (this.isValidValue([this.minDate, this.maxDate])) {
        this.$refs.minSpinner.selectableRange = [[time_rangevue_type_script_lang_js_minTimeOfDay(this.minDate), this.maxDate]];
        this.$refs.maxSpinner.selectableRange = [[this.minDate, time_rangevue_type_script_lang_js_maxTimeOfDay(this.maxDate)]];
        this.$emit('pick', [this.minDate, this.maxDate], true);
      }
    },
    setMinSelectionRange: function setMinSelectionRange(start, end) {
      this.$emit('select-range', start, end, 'min');
      this.selectionRange = [start, end];
    },
    setMaxSelectionRange: function setMaxSelectionRange(start, end) {
      this.$emit('select-range', start, end, 'max');
      this.selectionRange = [start + this.offset, end + this.offset];
    },
    handleConfirm: function handleConfirm() {
      var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var minSelectableRange = this.$refs.minSpinner.selectableRange;
      var maxSelectableRange = this.$refs.maxSpinner.selectableRange;

      this.minDate = Object(date_util_["limitTimeRange"])(this.minDate, minSelectableRange, this.format);
      this.maxDate = Object(date_util_["limitTimeRange"])(this.maxDate, maxSelectableRange, this.format);

      this.$emit('pick', [this.minDate, this.maxDate], visible);
    },
    adjustSpinners: function adjustSpinners() {
      this.$refs.minSpinner.adjustSpinners();
      this.$refs.maxSpinner.adjustSpinners();
    },
    changeSelectionRange: function changeSelectionRange(step) {
      var list = this.showSeconds ? [0, 3, 6, 11, 14, 17] : [0, 3, 8, 11];
      var mapping = ['hours', 'minutes'].concat(this.showSeconds ? ['seconds'] : []);
      var index = list.indexOf(this.selectionRange[0]);
      var next = (index + step + list.length) % list.length;
      var half = list.length / 2;
      if (next < half) {
        this.$refs.minSpinner.emitSelectRange(mapping[next]);
      } else {
        this.$refs.maxSpinner.emitSelectRange(mapping[next - half]);
      }
    },
    isValidValue: function isValidValue(date) {
      return Array.isArray(date) && Object(date_util_["timeWithinRange"])(this.minDate, this.$refs.minSpinner.selectableRange) && Object(date_util_["timeWithinRange"])(this.maxDate, this.$refs.maxSpinner.selectableRange);
    },
    handleKeydown: function handleKeydown(event) {
      var keyCode = event.keyCode;
      var mapping = { 38: -1, 40: 1, 37: -1, 39: 1 };

      // Left or Right
      if (keyCode === 37 || keyCode === 39) {
        var step = mapping[keyCode];
        this.changeSelectionRange(step);
        event.preventDefault();
        return;
      }

      // Up or Down
      if (keyCode === 38 || keyCode === 40) {
        var _step = mapping[keyCode];
        this.spinner.scrollDown(_step);
        event.preventDefault();
        return;
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/date-picker/src/panel/time-range.vue?vue&type=script&lang=js&
 /* harmony default export */ var panel_time_rangevue_type_script_lang_js_ = (time_rangevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/date-picker/src/panel/time-range.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  panel_time_rangevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/date-picker/src/panel/time-range.vue"
/* harmony default export */ var time_range = (component.exports);
// CONCATENATED MODULE: ./packages/date-picker/src/picker/time-picker.js




/* harmony default export */ var time_picker = __webpack_exports__["a"] = ({
  mixins: [picker["a" /* default */]],

  name: 'ElTimePicker',
  xtype: 'YuTimePicker',

  props: {
    isRange: Boolean,
    arrowControl: Boolean
  },

  data: function data() {
    return {
      type: ''
    };
  },
  beforeDestroy: function beforeDestroy() {
    this.unmountPicker();
  },

  watch: {
    isRange: function isRange(_isRange) {
      if (this.picker) {
        this.unmountPicker();
        this.type = _isRange ? 'timerange' : 'time';
        this.panel = _isRange ? time_range : time["a" /* default */];
        this.mountPicker();
      } else {
        this.type = _isRange ? 'timerange' : 'time';
        this.panel = _isRange ? time_range : time["a" /* default */];
      }
    }
  },
  created: function created() {
    this.type = this.isRange ? 'timerange' : 'time';
    this.panel = this.isRange ? time_range : time["a" /* default */];
  }
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/xselect/src/xselect.vue?vue&type=template&id=7270949a&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-select",
    {
      directives: [
        {
          name: "scroll",
          rawName: "v-scroll",
          value: _vm.handleScroll,
          expression: "handleScroll"
        }
      ],
      ref: "xselect",
      attrs: {
        separator: _vm.separator,
        multiple: _vm.multiple,
        disabled: _vm.disabled,
        "multiple-limit": _vm.multipleLimit,
        size: _vm.size,
        name: _vm.name,
        clearable: _vm.clearable,
        placeholder: _vm.placeholder,
        filterable: _vm.filterable,
        "allow-create": _vm.allowCreate,
        "filter-method": _vm.defaultFilterMethod,
        "lock-height": _vm.lockHeight,
        "value-type": _vm.valueType,
        "value-key": _vm.valueKey,
        details: _vm.details,
        "collapse-tags": _vm.collapseTags,
        remote: _vm.remote,
        "remote-method": _vm.remoteMethod,
        loading: _vm.loading,
        "loading-text": _vm.loadingText,
        "no-match-text": _vm.noMatchText,
        "no-data-text": _vm.noDataText,
        "popper-class": _vm.popperClass,
        "default-first-option": _vm.defaultFirstOption,
        "popper-append-to-body": _vm.popperAppendToBody,
        text: _vm.text
      },
      on: {
        change: _vm.change,
        "visible-change": _vm.visibleChange,
        "remove-tag": _vm.removeTag,
        clear: _vm.clear,
        blur: _vm.handleBlur,
        focus: _vm.handleFocus
      },
      model: {
        value: _vm.selectedVal,
        callback: function($$v) {
          _vm.selectedVal = $$v
        },
        expression: "selectedVal"
      }
    },
    [
      _vm._l(_vm.typeOptions, function(item) {
        return _c(
          "el-option",
          {
            key: "option_" + item.key,
            attrs: {
              highlight: _vm.highlight,
              value: item.key,
              disabled: item.disabled,
              label: item.value
            }
          },
          [_vm._t("option", null, { item: item })],
          2
        )
      }),
      _vm.$slots.prefix
        ? _c("template", { slot: "prefix" }, [_vm._t("prefix")], 2)
        : _vm._e(),
      _vm.$slots.empty
        ? _c("template", { slot: "empty" }, [_vm._t("empty")], 2)
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/xselect/src/xselect.vue?vue&type=template&id=7270949a&

// CONCATENATED MODULE: ./packages/xselect/src/directive.js
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  };
};
/* harmony default export */ var directive = ({
  bind: function bind(el, binding, vnode) {
    if (vnode.parent.componentInstance.highPerformance) {
      // 获取滚动页面DOM
      var SCROLL_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
      var scrollPosition = 0;
      SCROLL_DOM.addEventListener('scroll', function () {
        var _this = this;

        var scheduledAnimationFrame;
        if (scheduledAnimationFrame) return;
        scheduledAnimationFrame = true;
        window.requestAnimationFrame(function () {
          // 当前的滚动位置 减去  上一次的滚动位置
          // 如果为true则代表向上滚动，false代表向下滚动
          var flagToDirection = _this.scrollTop - scrollPosition > 0;
          // 记录当前的滚动位置
          scrollPosition = _this.scrollTop;
          var LIMIT_BOTTOM = 50;
          // 记录滚动位置距离底部的位置
          var scrollBottom = _this.scrollHeight - (_this.scrollTop + _this.clientHeight) < LIMIT_BOTTOM;
          // 如果向下滚动 并且距离底部只有100px
          if (flagToDirection && scrollBottom) {
            // 将滚动行为告诉组件
            binding.value(flagToDirection, SCROLL_DOM, _this.scrollHeight / 2);
          }
          // 如果是向上滚动  并且距离顶部只有100px
          if (!flagToDirection && _this.scrollTop < LIMIT_BOTTOM) {
            binding.value(flagToDirection, SCROLL_DOM, _this.scrollHeight / 2);
          }
          scheduledAnimationFrame = false;
        });
      });
    }
  }
});
// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xselect/src/xselect.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var xselectvue_type_script_lang_js_ = ({
  name: 'ElSelectX',
  xtype: 'YuXselect',
  mixins: [locale_default.a],
  directives: { scroll: directive },
  props: {
    /** 字典类型 */
    props: {
      type: Object,
      default: function _default() {
        return { key: 'key', value: 'value' };
      }
    },
    /** 字典查询参数 */
    dataParams: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    /** 字典类型查询URL */
    dataUrl: String,
    /** 字典code */
    dataCode: String,
    /** 请求类型 */
    requestType: {
      type: String,
      default: 'GET'
    },
    jsonData: {
      type: String,
      default: 'data'
    },
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 下述字段为el-select组件中部分属性，配置文档参见yuwp
    name: {
      type: String,
      default: 'yu-xselect'
    },
    size: String,
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: ''
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterMethod: Function,
    datacodeFilter: Function,
    value: {
      required: true
    },
    excludeKey: String,
    lockHeight: Boolean,
    // 多选时，数据类型为字符串时的连接符
    separator: {
      type: String,
      default: ','
    },
    valueType: {
      type: String,
      default: 'array'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    // 是否为详情表单模式
    details: Boolean,
    collapseTags: Boolean,
    allowCreate: Boolean,
    remote: Boolean,
    remoteMethod: Function,
    loading: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    popperClass: String,
    defaultFirstOption: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    highlight: Boolean,
    // 大数据时使用，设置为true开启懒加载
    highPerformance: Boolean
  },
  data: function data() {
    var _this = this;
    // var selValue = this.multiple ? [] : '';
    var selValue = this.value;
    // 懒加载默认只有20个选项，故重写filterMethod，保证搜索功能正常。
    var filterMethod = function filterMethod(val) {
      if (!val) {
        _this.typeOptions = _this.getData(_this.pageIndex, 20);
      } else {
        _this.typeOptions = _this.originData.filter(function (item, index) {
          var parsedQuery = String(val).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
          return new RegExp(parsedQuery, 'i').test(item.value);
        });
      }
    };
    return {
      text: '',
      selectedVal: selValue,
      typeOptions: this.options,
      // 懒加载使用
      pageIndex: 1, // 分页中请求的页面
      pageSize: 10, // 自定义  每页的大小
      dataLength: 20,
      originData: [],
      defaultFilterMethod: this.highPerformance ? filterMethod : this.filterMethod
    };
  },
  watch: {
    selectedVal: function selectedVal(val) {
      this.$emit('input', val);
    },
    value: function value(val) {
      if (this.selectedVal !== val) {
        this.selectedVal = val;
      }
    },
    dataUrl: function dataUrl(url) {
      if (url) {
        this.query();
      }
    },
    dataParams: function dataParams(params) {
      if (params) {
        this.query();
      }
    },
    options: function options(data) {
      if (data) {
        var listData = [];
        for (var i = 0, len = data.length; i < len; i++) {
          var item = {};
          var obj = data[i];
          item['key'] = obj[this.props.key];
          item['value'] = obj[this.props.value];
          if (obj.disabled) {
            item['disabled'] = obj.disabled;
          }
          listData.push(item);
        }
        this.originData = listData;
        this.getTypeOptions();
      }
    },
    typeOptions: function typeOptions(data) {
      if (data) {
        this.typeOptions = data;
      }
      if (this.details) {
        this.getSelectdText();
      }
    },
    dataCode: function dataCode(code) {
      if (code) {
        var _this = this;
        yufp.lookup.bind(code, function (options) {
          if (_this.datacodeFilter) {
            _this.typeOptions = _this.datacodeFilter(options, code, _this.$parent && _this.$parent.name);
            _this.originData = _this.datacodeFilter(options, code, _this.$parent && _this.$parent.name);
          } else {
            if (_this.excludeKey) {
              var array = _this.excludeKey.split(',');
              options = options.filter(function (item) {
                if (array.indexOf(item[_this.props.key]) > -1) {
                  return false;
                }
                return true;
              });
            }
            _this.originData = options;
            _this.getTypeOptions();
          }
        });
      }
    }
  },
  created: function created() {
    var _this = this;
    if (!this.dataUrl && !this.dataCode) {
      var listData = [];
      for (var i = 0, len = this.typeOptions.length; i < len; i++) {
        var item = {};
        var obj = this.typeOptions[i];
        if (obj[this.props.key] && obj[this.props.value]) {
          item['key'] = obj[this.props.key];
          item['value'] = obj[this.props.value];
          item['disabled'] = obj.disabled ? obj.disabled : false;
        }
        listData.push(item);
      }
      _this.originData = listData;
      _this.getTypeOptions();
    } else if (!this.dataUrl && this.dataCode) {
      var optionsArr = [];
      yufp.lookup.bind(_this.dataCode, function (options) {
        if (_this.datacodeFilter) {
          optionsArr = _this.datacodeFilter(options, _this.dataCode, _this.$parent && _this.$parent.name);
          _this.typeOptions = _this.formatter(optionsArr);
          _this.originData = _this.formatter(optionsArr);
          _this.getTypeOptions();
        } else {
          if (_this.excludeKey) {
            var array = _this.excludeKey.split(',');
            options = options.filter(function (item) {
              if (array.indexOf(item[_this.props.key]) > -1) {
                return false;
              }
              return true;
            });
            array = null;
          }
          _this.originData = _this.formatter(options);
          _this.getTypeOptions();
        }
      });
    } else {
      this.query();
    }
  },
  methods: {
    // 懒加载使用
    handleScroll: function handleScroll(param, el, middlePosition) {
      var pageNum = this.originData.length / this.pageSize;
      if (param) {
        if (this.typeOptions.length >= this.dataLength) {
          // 对应删除typeOptions中一页的数据量
          if (this.pageIndex < pageNum - 1) {
            this.typeOptions.splice(0, this.pageSize);
          }
        }
        ++this.pageIndex;
        if (this.pageIndex < pageNum) {
          var _typeOptions;

          // 请求下一页的数据
          (_typeOptions = this.typeOptions).push.apply(_typeOptions, this.getData(this.pageIndex));
          // 回滚到中间位置
          el.scrollTop = middlePosition;
        } else {
          this.pageIndex = pageNum - 1;
          return false;
        }
      } else {
        // 如果在向上滚动时，如果还没有到达第一页则继续加载。 如果已到达则停止加载
        if (this.pageIndex > 1) {
          // 向上滚动，取出pageMap中第一个元素值减1
          --this.pageIndex;
          // ①删除typeOptions中最后一页的数据
          this.typeOptions.splice(-this.pageSize, this.pageSize);
          // ②将新数据添加在头部位置
          this.typeOptions = [].concat(this.getData(this.pageIndex - 1), this.typeOptions);
          // 回滚到中间位置
          el.scrollTop = middlePosition;
        } else {
          return false;
        };
      }
    },
    getData: function getData(pageIndex, pagesize) {
      // 每页数量
      var pageSize = pagesize ? pagesize : 10;
      var list = [];
      for (var i = pageSize * pageIndex; i < pageSize * (pageIndex + 1); i++) {
        list.push(this.originData[i]);
      }
      return list;
    },
    formatter: function formatter(option) {
      var listData = [];
      for (var i = 0, len = option.length; i < len; i++) {
        var item = {};
        var obj = option[i];
        item['key'] = obj[this.props.key];
        item['value'] = obj[this.props.value];
        if (obj.disabled) {
          item['disabled'] = obj.disabled;
        }
        listData.push(item);
      }
      return listData;
    },

    change: function change(val, data) {
      this.$emit('change', val, this.getSelectdText());
    },
    visibleChange: function visibleChange(val) {
      this.$emit('visible-change', val);
    },
    removeTag: function removeTag(tag) {
      this.$emit('remove-tag', tag);
    },
    getSelectdText: function getSelectdText() {
      var text = [];
      var selectedVal = this.selectedVal;
      if (this.multiple) {
        if (this.valueType === 'string' || typeof selectedVal === 'string' && this.valueType === 'array') {
          selectedVal = selectedVal.split(this.separator);
        }
      } else {
        selectedVal = [selectedVal];
      }
      for (var i = 0, len = this.typeOptions.length; i < len; i++) {
        var typeOption = this.typeOptions[i];
        for (var j = 0, lenj = selectedVal.length; j < lenj; j++) {
          var value = selectedVal[j];
          if (value === typeOption.key) {
            text.push(typeOption.value);
            break;
          }
        }
      }
      selectedVal = null;
      this.text = text.join(',');
      return text.join(',');
    },
    getSelectdValue: function getSelectdValue(value) {
      return this.selectedVal;
    },
    setSelectdByValue: function setSelectdByValue(value) {
      var isok = false;
      for (var i = 0, len = this.typeOptions.length; i < len; i++) {
        var obj = this.typeOptions[i];
        if (obj.value === value) {
          this.selectedVal = obj.key;
          isok = true;
          break;
        }
        if (obj.key === value) {
          this.selectedVal = obj.key;
          isok = true;
          break;
        }
      }
      if (!isok) {
        this.$message.error(this.t('el.xselect.noValue'));
      }
      obj = null;
    },
    setSelectdByItem: function setSelectdByItem(item) {
      if (item && !isNaN(item)) {
        if (this.typeOptions.length < item) {
          this.$message.error(this.t('el.xselect.maximumLength'));
        } else {
          this.selectedVal = this.typeOptions[item].key;
        }
      } else {
        this.$message.error(this.t('el.xselect.noValueOrNotNumber'));
      }
    },
    clear: function clear() {
      this.selectedVal = this.multiple ? [] : '';
      this.$emit('clear');
    },
    query: function query() {
      var _this = this;
      if (!_this.dataUrl) {
        throw new Error(_this.t('el.table.noDataUrl'));
      }
      yufp.service.request({
        method: _this.requestType,
        url: _this.dataUrl,
        data: _this.dataParams,
        callback: function callback(code, message, response) {
          _this.typeOptions = [];
          _this.originData = [];
          var data1 = _this.getObjectKey(response, _this.jsonData);
          data1 = data1 && data1.length > 0 ? data1 : [];
          for (var i = 0, len = data1.length; i < len; i++) {
            var obj = data1[i];
            if (obj[_this.props.key] && obj[_this.props.value]) {
              _this.originData.push({
                key: obj[_this.props.key],
                value: obj[_this.props.value]
              });
            }
          }
          data1 = null;
          obj = null;
          _this.$emit('load-all-data', _this.originData);
          _this.getTypeOptions();
        }
      });
    },
    getObjectKey: function getObjectKey(obj, ns) {
      if (!ns) {
        return obj;
      }
      var keys = ns.split('.');
      for (var i = 0, len = keys.length; i < len; i++) {
        if (!obj) {
          break;
        }
        obj = obj[keys[i]];
      }
      return obj;
    },
    handleBlur: function handleBlur(event) {
      this.$emit('blur', event);
    },
    handleFocus: function handleFocus(event) {
      this.$emit('focus', event);
    },
    blur: function blur(event) {
      this.$refs.xselect.blur();
    },
    focus: function focus(event) {
      this.$refs.xselect.focus();
    },
    getTypeOptions: function getTypeOptions() {
      if (this.highPerformance) {
        this.typeOptions = this.originData.slice(0, this.dataLength);
      } else {
        this.typeOptions = this.originData;
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/xselect/src/xselect.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_xselectvue_type_script_lang_js_ = (xselectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xselect/src/xselect.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_xselectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/xselect/src/xselect.vue"
/* harmony default export */ var xselect = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/xradio/src/xradio.vue?vue&type=template&id=c5ed18f4&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      !_vm.details
        ? _c(
            "el-radio-group",
            {
              attrs: { disabled: _vm.disabled, name: _vm.name, size: _vm.size },
              model: {
                value: _vm.radio,
                callback: function($$v) {
                  _vm.radio = $$v
                },
                expression: "radio"
              }
            },
            [
              !_vm.optionButton
                ? _vm._l(_vm.radioData, function(item) {
                    return _c(
                      "el-radio",
                      {
                        key: "raido_" + item.key,
                        attrs: {
                          border: _vm.border,
                          label: item.key,
                          disabled:
                            item.disabled === undefined
                              ? _vm.disabled
                              : item.disabled
                        }
                      },
                      [_vm._v("\n        " + _vm._s(item.value) + "\n      ")]
                    )
                  })
                : _vm._l(_vm.radioData, function(item) {
                    return _c(
                      "el-radio-button",
                      {
                        key: "raido_" + item.key,
                        attrs: {
                          label: item.key,
                          disabled:
                            item.disabled === undefined
                              ? _vm.disabled
                              : item.disabled
                        }
                      },
                      [_vm._v("\n        " + _vm._s(item.value) + "\n      ")]
                    )
                  })
            ],
            2
          )
        : _vm._e(),
      _vm.details
        ? _c("span", [_vm._v(_vm._s(_vm.getSelectdText()))])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/xradio/src/xradio.vue?vue&type=template&id=c5ed18f4&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xradio/src/xradio.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var xradiovue_type_script_lang_js_ = ({
  name: 'ElRadioX',
  xtype: 'YuXradio',

  props: {
    disabled: Boolean,
    name: String,
    dataUrl: String,
    dataCode: String,
    /** 字典查询参数 */
    dataParams: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    /** 请求类型 */
    requestType: {
      type: String,
      default: 'GET'
    },
    jsonData: {
      type: String,
      default: 'data'
    },
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    value: [String, Number],
    // 选项是否为button，默认false
    optionButton: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    datacodeFilter: Function,
    /** 数据配置选项*/
    props: {
      type: Object,
      default: function _default() {
        return { key: 'key', value: 'value' };
      }
    },
    excludeKey: String,
    details: Boolean,
    size: String,
    border: Boolean
  },
  data: function data() {
    return {
      radio: this.value ? this.value : '',
      radioData: this.options
    };
  },
  mounted: function mounted() {
    // 动态表单赋初始值联动使用
    // if (this.value) {
    //   this.$nextTick(function() {
    //     this.$emit('change', this.value);
    //   });
    // }
    if (this.dataUrl) {
      this.query();
    } else if (!this.dataUrl && this.dataCode) {
      this.setDataCode(this.dataCode);
    } else {
      this.setRadioData(this.radioData);
    }
  },
  computed: {
    selectedText: function selectedText() {
      var text = '';
      for (var i = 0, len = this.radioData.length; i < len; i++) {
        var obj = this.radioData[i];
        if (obj.key === this.radio) {
          text = obj.value;
          break;
        }
      }
      return text;
    }
  },
  methods: {
    setRadioData: function setRadioData(options) {
      if (this.props.key === 'key' && this.props.value === 'value') {
        this.radioData = options;
      } else {
        var listData = [];
        for (var i = 0, len = options.length; i < len; i++) {
          var obj = options[i];
          if (obj[this.props.key] && obj[this.props.value]) {
            listData.push({
              key: obj[this.props.key],
              value: obj[this.props.value],
              disabled: obj.disabled ? obj.disabled : false
            });
          }
        }
        this.radioData = listData;
      }
    },
    query: function query() {
      var me = this;
      yufp.service.request({
        method: me.requestType,
        url: me.dataUrl,
        data: me.dataParams,
        callback: function callback(code, message, response) {
          var data = me.getObjectKey(response, me.jsonData) || [];
          var dataRes = data && data.length > 0 ? data : [];
          me.setRadioData(dataRes);
        }
      });
    },
    setDataCode: function setDataCode(dataCode) {
      var _this = this;
      var listData = [];
      yufp.lookup.bind(dataCode, function (options) {
        if (_this.datacodeFilter) {
          // 此处获取字段名称是不合理的，暂时先从父元素中获取
          var parentName = _this.$parent && _this.$parent.name;
          listData = _this.datacodeFilter(options, _this.dataCode, parentName);
          _this.setRadioData(listData);
        } else {
          if (_this.excludeKey) {
            var array = _this.excludeKey.split(',');
            options = options.filter(function (item) {
              if (array.indexOf(item[_this.props.key]) > -1) {
                return false;
              }
              return true;
            });
          }
          _this.setRadioData(options);
        }
      });
    },
    change: function change(val, oldVal) {
      this.$emit('change', val, oldVal);
    },
    getObjectKey: function getObjectKey(obj, ns) {
      if (!ns) {
        return obj;
      }
      var keys = ns.split('.');
      for (var i = 0, len = keys.length; i < len; i++) {
        if (!obj) {
          break;
        }
        obj = obj[keys[i]];
      }
      return obj;
    },
    getSelectdText: function getSelectdText() {
      var text = '';
      for (var i = 0, len = this.radioData.length; i < len; i++) {
        var obj = this.radioData[i];
        if (obj.key === this.radio) {
          text = obj.value;
          break;
        }
      }
      return text;
    }
  },
  watch: {
    dataCode: function dataCode(val) {
      if (val) {
        this.setDataCode(val);
      }
    },
    dataUrl: function dataUrl(url) {
      if (url) {
        this.query();
      }
    },
    // radioData: function(data) {
    //   if (data) {
    //     this.setRadioData(data);
    //   }
    // },
    radio: function radio(val) {
      this.$emit('input', val);
    },
    value: function value(val, oldVal) {
      this.$emit('change', val, oldVal);
      if (this.radio !== val) {
        this.radio = val;
      }
    },
    options: function options(val) {
      this.radioData = val;
    }
  }
});
// CONCATENATED MODULE: ./packages/xradio/src/xradio.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_xradiovue_type_script_lang_js_ = (xradiovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xradio/src/xradio.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_xradiovue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/xradio/src/xradio.vue"
/* harmony default export */ var xradio = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 36 */
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
/* 37 */
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/focus");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/scroll-into-view");

/***/ }),
/* 39 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 40 */
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
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./packages/input/src/input.vue + 5 modules
var input = __webpack_require__(17);

// EXTERNAL MODULE: ./packages/xradio/src/xradio.vue + 4 modules
var xradio = __webpack_require__(35);

// EXTERNAL MODULE: ./packages/xcheckbox/src/xcheckbox.vue + 4 modules
var xcheckbox = __webpack_require__(28);

// EXTERNAL MODULE: ./packages/xselect/src/xselect.vue + 5 modules
var xselect = __webpack_require__(34);

// EXTERNAL MODULE: ./packages/switch/src/component.vue + 4 modules
var component = __webpack_require__(36);

// EXTERNAL MODULE: ./packages/date-picker/src/picker/time-picker.js + 5 modules
var time_picker = __webpack_require__(33);

// EXTERNAL MODULE: ./packages/date-picker/src/picker/time-select.js + 5 modules
var time_select = __webpack_require__(32);

// EXTERNAL MODULE: ./packages/date-picker/src/picker/date-picker.js + 30 modules
var date_picker = __webpack_require__(31);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xform/src/form-item-part.vue?vue&type=script&lang=js&










/**
 * 业务表单-表单子项辅助
 */
/* harmony default export */ var form_item_partvue_type_script_lang_js_ = ({
  functional: true,
  name: 'YuXformItemPart',
  xtype: 'YuXformItemPart',

  component: {
    ElInput: input["a" /* default */],
    ElRadioX: xradio["a" /* default */],
    ElCheckboxX: xcheckbox["a" /* default */],
    ElSelectX: xselect["a" /* default */],
    ElSwitch: component["a" /* default */],
    ElTimePicker: time_picker["a" /* default */],
    ElTimeSelect: time_select["a" /* default */],
    ElDatePicker: date_picker["a" /* default */]
  },
  render: function render(createElement, context) {
    var renderComponent = function renderComponent() {
      var type = context.data.attrs.ctype;
      if (!type || type === 'input') {
        return input["a" /* default */];
      } else if (type === 'textarea') {
        context.data.attrs.type = 'textarea';
        return input["a" /* default */];
      } else if (type === 'num') {
        context.data.attrs.type = 'num';
        return input["a" /* default */];
      } else if (type === 'switch') {
        return component["a" /* default */];
      } else if (type === 'select') {
        return xselect["a" /* default */];
      } else if (type === 'timepicker') {
        return time_picker["a" /* default */];
      } else if (type === 'timeselect') {
        return time_select["a" /* default */];
      } else if (type === 'datepicker') {
        return date_picker["a" /* default */];
      } else if (type === 'radio') {
        return xradio["a" /* default */];
      } else if (type === 'checkbox') {
        return xcheckbox["a" /* default */];
      } else if (type === 'custom') {
        return 'div';
      } else {
        return type;
      }
    };
    return createElement(renderComponent(), context.data, context.children);
  }
});
// CONCATENATED MODULE: ./packages/xform/src/form-item-part.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_form_item_partvue_type_script_lang_js_ = (form_item_partvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xform/src/form-item-part.vue
var form_item_part_render, staticRenderFns




/* normalize component */

var form_item_part_component = Object(componentNormalizer["a" /* default */])(
  src_form_item_partvue_type_script_lang_js_,
  form_item_part_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
form_item_part_component.options.__file = "packages/xform/src/form-item-part.vue"
/* harmony default export */ var form_item_part = __webpack_exports__["a"] = (form_item_part_component.exports);

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("deepmerge");

/***/ }),
/* 43 */
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
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/xdialog/src/component.vue?vue&type=template&id=5546ab6f&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "dialog-fade" },
      on: { "after-enter": _vm.afterEnter, "after-leave": _vm.afterLeave }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "drag",
              rawName: "v-drag",
              value: _vm.draggable,
              expression: "draggable"
            },
            {
              name: "resize",
              rawName: "v-resize",
              value: _vm.resizeable,
              expression: "resizeable"
            },
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "el-dialog-x__wrapper",
          on: {
            click: function($event) {
              if ($event.target !== $event.currentTarget) {
                return null
              }
              return _vm.handleWrapperClick($event)
            }
          }
        },
        [
          _c(
            "div",
            {
              key: _vm.key,
              ref: "dialog",
              staticClass: "el-dialog-x",
              class: [_vm.sizeClass, _vm.customClass],
              style: _vm.styleRoot
            },
            [
              _c(
                "div",
                { ref: "header", staticClass: "el-dialog-x__header" },
                [
                  _vm._t("title", [
                    _c("span", { staticClass: "el-dialog-x__title" }, [
                      _vm._v(_vm._s(_vm.title))
                    ])
                  ]),
                  _vm.showClose
                    ? _c(
                        "button",
                        {
                          staticClass: "el-dialog-x__headerbtn",
                          attrs: { type: "button", "aria-label": "Close" },
                          on: { click: _vm.handleClose }
                        },
                        [
                          _c("i", {
                            staticClass:
                              "el-dialog-x__close el-icon el-icon-close"
                          })
                        ]
                      )
                    : _vm._e(),
                  _vm._l(_vm.headerCustomBtns, function(item, index) {
                    return _c(
                      "button",
                      {
                        key: index,
                        class: item.btnClass,
                        attrs: { type: "button", "aria-label": item.btnClass },
                        on: {
                          click: function($event) {
                            return item.click($event)
                          }
                        }
                      },
                      [_c("i", { class: item.iClass })]
                    )
                  })
                ],
                2
              ),
              _vm.rendered
                ? _c(
                    "div",
                    { staticClass: "el-dialog-x__body", style: _vm.styleBody },
                    [_vm._t("default")],
                    2
                  )
                : _vm._e(),
              _vm.$slots.footer || _vm.needBar
                ? _c(
                    "div",
                    { ref: "footer", staticClass: "el-dialog-x__footer" },
                    [
                      _vm.needBar
                        ? _c(
                            "el-button",
                            {
                              attrs: { type: "primary", icon: "check" },
                              on: { click: _vm.sureFn }
                            },
                            [_vm._v(_vm._s(_vm.sureText))]
                          )
                        : _vm._e(),
                      _vm.needBar
                        ? _c(
                            "el-button",
                            {
                              attrs: { type: "primary", icon: "yx-undo2" },
                              on: { click: _vm.handleClose }
                            },
                            [_vm._v(_vm._s(_vm.cancelText))]
                          )
                        : _vm._e(),
                      _vm._t("footer")
                    ],
                    2
                  )
                : _vm._e()
            ]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/xdialog/src/component.vue?vue&type=template&id=5546ab6f&

// EXTERNAL MODULE: external "@/lib/utils/popup"
var popup_ = __webpack_require__(27);
var popup_default = /*#__PURE__*/__webpack_require__.n(popup_);

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// CONCATENATED MODULE: ./packages/xdialog/src/directive.js
/* harmony default export */ var directive = ({
  bind: function bind(el, binding, vnode, oldVnode) {
    if (!binding.value) {
      return;
    }
    var headerEl = el.querySelector('.el-dialog-x__header');
    var dragEl = el.querySelector('.el-dialog-x');
    headerEl.style.cursor = 'move';
    vnode.context.initDragLeft = dragEl.style.left + '';
    vnode.context.initDragTop = dragEl.style.top + '';
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    var currStyle = dragEl.currentStyle || window.getComputedStyle(dragEl, null);
    headerEl.onmousedown = function (e) {
      // 鼠标按下，计算当前元素距离可视区的距离
      dragEl.className += ' el-dialog-x--move';
      var disX = e.clientX - headerEl.offsetLeft;
      var disY = e.clientY - headerEl.offsetTop;

      // 获取到的值带px 正则匹配替换
      var styL = void 0,
          styT = void 0,
          minL = void 0,
          maxL = void 0,
          minT = void 0,
          maxT = void 0,
          marginL = void 0;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (currStyle.left.indexOf('%') > -1) {
        styL = +document.body.clientWidth * (+currStyle.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+currStyle.top.replace(/\%/g, '') / 100);
      } else {
        styL = +currStyle.left.replace(/\px/g, '');
        styT = +currStyle.top.replace(/\px/g, '');
      };
      marginL = Math.abs(currStyle.marginLeft.replace(/\px/g, ''));
      // 边距10px
      var mg = 10;
      minL = marginL + mg;
      minT = mg;
      maxL = document.body.clientWidth - dragEl.clientWidth - mg + marginL;
      maxT = document.body.clientHeight - dragEl.clientHeight - mg;
      document.onmousemove = function (e) {
        // 移动时禁止文本选中
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 通过事件委托，计算移动的距离
        var l = e.clientX - disX + styL;
        var t = e.clientY - disY + styT;
        // window.console.log('3:' + l + ':' + t);
        // window.console.log('4:' + disX + ':' + disY);
        // 移动当前元素
        if (l >= minL && l <= maxL) {
          dragEl.style.left = l + 'px';
        }
        if (t >= minT && t <= maxT) {
          dragEl.style.top = t + 'px';
        }
        vnode.context.updatePopper();
        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      };

      document.onmouseup = function (e) {
        dragEl.className = dragEl.className.replace(' el-dialog-x--move', '');
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});
// CONCATENATED MODULE: ./packages/xdialog/src/directive2.js
/* harmony default export */ var directive2 = ({
  bind: function bind(el, binding, vnode, oldVnode) {
    if (!binding.value) {
      return;
    }
    var resizeEl = el.querySelector('.el-dialog-x');
    // 设置与上边框2个像素的边距，避免弹出框标题可拖拽时的影响
    var headerEl = el.querySelector('.el-dialog-x__header');
    headerEl.style.marginTop = '2px';
    headerEl.style.marginRight = '2px';
    headerEl.style.marginLeft = '2px';
    // 默认属性
    var defaultOptions = {
      minHeight: vnode.context.minHeight, // 判断窗口最小高度
      minWidth: vnode.context.minWidth, // 判断窗口最小宽度
      edge: 5, // 鼠标与边框距离多少时出现调整指针
      maxWidth: document.body.clientWidth,
      maxHeight: document.body.clientHeight,
      mg: 10
    };
    vnode.context.initResizing = false; // 是否处于拉伸调整中
    vnode.context.resizeAviliable = false; // 鼠标指针是否处于边框位置允许可调整
    // 弹出框-鼠标移动事件
    function handleMouseMove(event) {
      var target = resizeEl;
      if (!target) {
        return;
      }
      if (!vnode.context.initResizing) {
        var rect = target.getBoundingClientRect();
        var bodyStyle = document.body.style;
        var scrollTop = window.scrollTop ? window.scrollTop : window.pageYOffset;
        // 判断鼠标所在方位
        if (Math.abs(rect.right - event.pageX) < defaultOptions.edge) {
          bodyStyle.cursor = 'col-resize';
          target.style.cursor = 'col-resize';
          vnode.context.dir = 'e';
          vnode.context.resizeAviliable = true;
        } else if (Math.abs(rect.left - event.pageX) < defaultOptions.edge) {
          bodyStyle.cursor = 'col-resize';
          target.style.cursor = 'col-resize';
          vnode.context.dir = 'w';
          vnode.context.resizeAviliable = true;
        } else if (Math.abs(rect.top - (event.pageY - scrollTop)) < defaultOptions.edge) {
          bodyStyle.cursor = 'row-resize';
          target.style.cursor = 'row-resize';
          vnode.context.dir = 'n';
          vnode.context.resizeAviliable = true;
        } else if (Math.abs(rect.bottom - (event.pageY - scrollTop)) < defaultOptions.edge) {
          bodyStyle.cursor = 'row-resize';
          target.style.cursor = 'row-resize';
          vnode.context.dir = 's';
          vnode.context.resizeAviliable = true;
        } else {
          bodyStyle.cursor = '';
          target.style.cursor = '';
          vnode.context.dir = '';
          vnode.context.resizeAviliable = false;
        }
      }
    };
    // 弹出框-鼠标点击【按下】事件
    function handleMouseDown(event) {
      if (!vnode.context.resizeAviliable) {
        return;
      }
      // 重新获取窗口最小尺寸，以支持最小尺寸的动态修改
      defaultOptions.minHeight = vnode.context.minHeight;
      defaultOptions.minWidth = vnode.context.minWidth;
      vnode.context.initResizing = true;
      // 初始值
      var currStyle = resizeEl.currentStyle || window.getComputedStyle(resizeEl, null);
      var resizeElStyle = resizeEl.getBoundingClientRect();
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      var startLeft, startTop;
      if (currStyle.left.indexOf('%') > -1) {
        startLeft = +document.body.clientWidth * (+currStyle.left.replace(/\%/g, '') / 100);
        startTop = +document.body.clientHeight * (+currStyle.top.replace(/\%/g, '') / 100);
      } else {
        startLeft = +currStyle.left.replace(/\px/g, '');
        startTop = +currStyle.top.replace(/\px/g, '');
      };
      var startPositons = {
        pageX: event.pageX,
        pageY: event.pageY,
        left: startLeft,
        top: startTop,
        width: resizeElStyle.width,
        height: resizeElStyle.height
      };
      // 文档-鼠标移动事件
      var handleDocMouseMove = function handleDocMouseMove(event) {
        var target = resizeEl;
        if (!target) {
          return;
        };
        // 与浏览器可视窗口距离defaultOptions.mg以下时不再允许放大
        if (event.clientX < defaultOptions.mg || event.clientY < defaultOptions.mg || event.clientX > defaultOptions.maxWidth - defaultOptions.mg || event.clientY > defaultOptions.maxHeight - defaultOptions.mg) {
          return;
        }
        // 移动时禁止文本选中
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

        var deltaX = event.pageX - startPositons.pageX; // X方向变化
        var deltaY = event.pageY - startPositons.pageY; // Y方向变化
        // 根据初始与当前位置调整弹出框
        if (vnode.context.dir === 'e') {
          var _width = startPositons.width + deltaX;
          _width = Math.min(Math.max(_width, defaultOptions.minWidth), defaultOptions.maxWidth - 2 * defaultOptions.mg);
          resizeEl.style.width = _width + 'px';
        }
        if (vnode.context.dir === 'w') {
          var _width2 = startPositons.width - deltaX;
          if (_width2 >= defaultOptions.minWidth && _width2 <= defaultOptions.maxWidth) {
            resizeEl.style.width = _width2 + 'px';
            resizeEl.style.left = startPositons.left + deltaX + 'px';
          }
        }
        if (vnode.context.dir === 's') {
          var _height = startPositons.height + deltaY;
          _height = Math.min(Math.max(_height, defaultOptions.minHeight), defaultOptions.maxHeight - 2 * defaultOptions.mg);
          resizeEl.style.height = _height + 'px';
          if (resizeEl.querySelector('.el-dialog-x__footer')) {
            resizeEl.querySelector('.el-dialog-x__body').style.height = _height - 131 + 'px';
          } else {
            resizeEl.querySelector('.el-dialog-x__body').style.height = _height - 70 + 'px';
          }
        }
        if (vnode.context.dir === 'n') {
          var _height2 = startPositons.height - deltaY;
          if (_height2 >= defaultOptions.minHeight && _height2 <= defaultOptions.maxHeight) {
            resizeEl.style.height = _height2 + 'px';
            if (resizeEl.querySelector('.el-dialog-x__footer')) {
              resizeEl.querySelector('.el-dialog-x__body').style.height = _height2 - 131 + 'px';
            } else {
              resizeEl.querySelector('.el-dialog-x__body').style.height = _height2 - 70 + 'px';
            }
            resizeEl.style.top = startPositons.top + deltaY + 'px';
          }
        }
      };
      // 文档-鼠标点击【弹起】事件
      var handleDocMouseUp = function handleDocMouseUp(e) {
        if (vnode.context.initResizing) {
          document.body.style.cursor = '';
          vnode.context.dir = '';
          vnode.context.initResizing = false;
          // table.resizeProxyVisible = false;
        }
        // 文档-解绑事件
        document.removeEventListener('mousemove', handleDocMouseMove);
        document.removeEventListener('mouseup', handleDocMouseUp);
      };
      // 文档-绑定事件
      document.addEventListener('mousemove', handleDocMouseMove);
      document.addEventListener('mouseup', handleDocMouseUp);
    }
    // 弹出框-鼠标移出事件
    function handleMouseOut(event) {
      document.body.style.cursor = '';
    }
    // 弹出框-绑定事件
    resizeEl.addEventListener('mousemove', handleMouseMove);
    resizeEl.addEventListener('mousedown', handleMouseDown);
    resizeEl.addEventListener('mouseout', handleMouseOut);
  }
});
// EXTERNAL MODULE: external "@/lib/locale"
var locale_ = __webpack_require__(6);

// EXTERNAL MODULE: ./src/utils/event-bus.js
var event_bus = __webpack_require__(48);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xdialog/src/component.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






// 弹出框内，若包含使用popver的组件，例如：下拉框，日期框，下拉树等。使用event-bus传递事件，拖动时更新位置。event-bus非特殊情况，误乱用。


/* harmony default export */ var componentvue_type_script_lang_js_ = ({
  name: 'ElDialogX',
  xtype: 'YuXdialog',

  mixins: [popup_default.a, emitter_default.a],

  directives: {
    drag: directive,
    resize: directive2
  },
  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: false
    },

    closeOnPressEscape: {
      type: Boolean,
      default: false
    },

    showClose: {
      type: Boolean,
      default: true
    },

    size: {
      type: String,
      default: 'small'
    },

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15%'
    },

    beforeClose: Function,

    width: String,
    height: String,
    needBar: Boolean,
    sureFn: {
      type: Function,
      default: function _default() {}
    },
    cancelText: {
      type: String,
      default: function _default() {
        return Object(locale_["t"])('el.xdialog.cancelText');
      }
    },
    sureText: {
      type: String,
      default: function _default() {
        return Object(locale_["t"])('el.xdialog.sureText');
      }
    },
    draggable: {
      type: Boolean,
      default: true
    },
    resizeable: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: Number,
      default: 200
    },
    minWidth: {
      type: Number,
      default: 300
    },
    center: {
      type: Boolean,
      default: false
    },
    // 默认关闭弹框时，销毁子组件实例
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    // 弹出框是否垂直居中
    middle: {
      type: Boolean,
      default: true
    },
    headerCustomBtns: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      key: 0,
      adjustHeight: 0
    };
  },


  watch: {
    visible: function visible(val) {
      var _this2 = this;

      this.$emit('update:visible', val);
      if (val) {
        this.showDialog();
      } else {
        this.adjustHeight = 0;
        if (this.draggable) {
          this.$el.style.position = '';
          var dragEl = this.$refs.dialog;
          dragEl.style.left = this.initDragLeft;
          dragEl.style.top = this.initDragTop;
        }
        this.$el.removeEventListener('scroll', this.updatePopper);
        this.$emit('close');
        if (this.appendToBody && this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el);
        }
        if (this.destroyOnClose) {
          this.$nextTick(function () {
            _this2.key++;
          });
        }
      }
    }
  },

  computed: {
    sizeClass: function sizeClass() {
      return 'el-dialog-x--' + this.size;
    },
    styleRoot: function styleRoot() {
      return this.size === 'full' ? { position: 'static' } : this.width ? { width: this.width, 'top': this.top } : { 'top': this.top };
    },
    styleBody: function styleBody() {
      return this.size === 'full' || !this.height ? this.adjustHeight ? { height: this.adjustHeight + 'px', overflow: 'hidden', overflowY: 'auto' } : {} : { height: this.height, overflow: 'hidden', overflowY: 'auto' };
    }
  },

  methods: {
    showDialog: function showDialog() {
      var _this3 = this;

      var _this = this;
      this.$emit('open');
      this.$el.addEventListener('scroll', this.updatePopper);
      this.$nextTick(function () {
        var ml = -_this3.$refs.dialog.clientWidth / 2 + 'px';
        if (_this3.size !== 'full') {
          _this3.$refs.dialog.style.marginLeft = ml;
        }
        _this3.$refs.dialog.scrollTop = 0;
        if (_this3.draggable) {
          _this3.$el.style.position = '';
        }
        if (_this3.middle) {
          setTimeout(function () {
            var height = document.body.clientHeight;
            var adjust = _this.$refs.dialog.clientHeight;
            var headerHeight = _this.$refs.header.clientHeight;
            var footerHeight = _this.$refs.footer ? _this.$refs.footer.clientHeight : 0;
            if (adjust > height || height - adjust < 48) {
              // _this.adjustHeight = height - headerHeight - footerHeight - 20;
              // _this.$refs.dialog.style.top = '10px';
              _this.adjustHeight = height - headerHeight - footerHeight - 48;
              _this.$refs.dialog.style.top = '48px';
            } else {
              var top = height / 2 - adjust / 2;
              _this.$refs.dialog.style.top = top + 'px';
              _this.adjustHeight = 0;
            }
          }, 0);
        }
      });
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    },
    handleWrapperClick: function handleWrapperClick() {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose: function handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide: function hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('visible-change', false);
      }
    },
    updatePopper: function updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper');
      this.broadcast('ElDropdownMenu', 'updatePopper');
      event_bus["a" /* EventBus */].$emit('updatePopper');
    },
    afterEnter: function afterEnter() {
      this.$emit('opened');
    },
    afterLeave: function afterLeave() {
      this.$emit('closed');
    }
  },

  mounted: function mounted() {
    if (this.visible) {
      this.open();
      this.rendered = true;
      this.showDialog();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.removeEventListener('scroll', this.updatePopper);
  },
  destroyed: function destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
});
// CONCATENATED MODULE: ./packages/xdialog/src/component.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_componentvue_type_script_lang_js_ = (componentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xdialog/src/component.vue





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
component.options.__file = "packages/xdialog/src/component.vue"
/* harmony default export */ var src_component = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/button/src/button.vue?vue&type=template&id=ca859fb4&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      staticClass: "el-button",
      class: [
        _vm.type ? "el-button--" + _vm.type : "",
        _vm.size ? "el-button--" + _vm.size : "",
        {
          "is-disabled": _vm.varDisabled,
          "is-loading": _vm.varLoading,
          "is-plain": _vm.plain,
          "is-round": _vm.round,
          "is-circle": _vm.circle,
          "is-disabled-mask": _vm.disabledMask
        }
      ],
      attrs: {
        disabled: _vm.varDisabled,
        autofocus: _vm.autofocus,
        type: _vm.nativeType
      },
      on: { click: _vm.handleClick }
    },
    [
      _vm.varLoading
        ? _c("i", {
            staticClass: "el-icon-loading",
            on: { click: _vm.handleInnerClick }
          })
        : _vm._e(),
      _vm.icon && !_vm.varLoading
        ? _c("i", { class: _vm.realicon, on: { click: _vm.handleInnerClick } })
        : _vm._e(),
      _vm.$slots.default
        ? _c(
            "span",
            { on: { click: _vm.handleInnerClick } },
            [_vm._t("default")],
            2
          )
        : _vm._e(),
      _vm.disabledMask
        ? _c("div", {
            staticClass: "el-button-mask",
            staticStyle: {
              position: "absolute",
              top: "0px",
              bottom: "0px",
              left: "0px",
              right: "0px"
            },
            on: {
              click: [
                function($event) {
                  if (!$event.altKey) {
                    return null
                  }
                  return _vm.maskAltClickfn($event)
                },
                _vm.maskClick
              ]
            }
          })
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/button/src/button.vue?vue&type=template&id=ca859fb4&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/button/src/button.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var buttonvue_type_script_lang_js_ = ({
  name: 'ElButton',
  xtype: 'YuButton',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    logShow: {
      type: Boolean,
      default: true
    },
    // 用于不能编辑的时候也可以操作按钮的部分点击功能
    disabledMask: Boolean
  },
  data: function data() {
    return {
      varDisabled: this.disabled,
      varLoading: this.loading
    };
  },

  watch: {
    disabled: function disabled(val) {
      this.varDisabled = val;
    },
    loading: function loading(val) {
      this.varLoading = val;
    }
  },
  methods: {
    handleClick: function handleClick(evt) {
      if (this.logShow === true && this.buttonLogs) {
        this.buttonLogs(this);
      }
      this.$emit('click', evt);
    },
    handleInnerClick: function handleInnerClick(evt) {
      if (this.varDisabled) {
        evt.stopPropagation();
      }
    },

    maskAltClickfn: function maskAltClickfn(evt) {
      this.$emit('mask-altclick', evt);
    },
    maskClick: function maskClick(evt) {
      // 如果左键点击时包括alt 就不事件穿透
      if (evt.altKey === true) {
        evt.stopPropagation();
      }
    }
  },
  computed: {
    realicon: function realicon() {
      if (this.icon && (this.icon.indexOf('el-icon-') > -1 || this.icon.indexOf('yu-icon-') > -1)) {
        return this.icon;
      } else {
        return 'el-icon-' + this.icon;
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/button/src/button.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_buttonvue_type_script_lang_js_ = (buttonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/button/src/button.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_buttonvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/button/src/button.vue"
/* harmony default export */ var src_button = __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("@/lib/tag");

/***/ }),
/* 47 */
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
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventBus; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
// event-bus.js

var EventBus = new vue__WEBPACK_IMPORTED_MODULE_0___default.a();

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)(false);
// imports


// module
exports.push([module.i, "\n.el-input_account{position: absolute;right: 0;line-height: normal;font-size: 12px;}\n.el-input_notice{position: absolute;left: 0;line-height: normal;font-size: 12px;}\r\n", ""]);

// exports


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)(false);
// imports


// module
exports.push([module.i, "\n.el-input__icon.el-icon{\r\n  position: absolute;\r\n  right: 2px;\n}\r\n", ""]);

// exports


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("@/lib/tooltip");

/***/ }),
/* 54 */,
/* 55 */
/***/ (function(module, exports) {

module.exports = require("async-validator");

/***/ }),
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */
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
/* 62 */
/***/ (function(module, exports) {

module.exports = require("@/lib/radio");

/***/ }),
/* 63 */,
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _packages_checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _packages_checkbox__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_packages_checkbox__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _packages_radio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(62);
/* harmony import */ var _packages_radio__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_packages_radio__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _packages_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46);
/* harmony import */ var _packages_tag__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_packages_tag__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_utils_merge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _src_utils_merge__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_src_utils_merge__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _packages_xform_src_form_item_part__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41);
/* harmony import */ var _src_utils_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4);
/* harmony import */ var _src_utils_util__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_src_utils_util__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _src_utils_formatter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(40);
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(42);
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _src_mixins_locale__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3);
/* harmony import */ var _src_mixins_locale__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_src_mixins_locale__WEBPACK_IMPORTED_MODULE_9__);











var columnIdSeed = 1;
var defaults = {
  default: {
    order: ''
  },
  edit: {},
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
    className: 'el-table-column--selection'
  },
  single: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
    className: 'el-table-column--single'
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ''
  }
};
// 处理复选框选中判断信息
var handleCheckAndDisabled = function handleCheckAndDisabled(row, column, $index, store) {
  var disabled = column.selectable ? !column.selectable.call(null, row, $index) : false;
  var isDisabled = disabled ? ' is-disabled ' : '';
  var isChecked = store.isSelected(row) ? 'is-checked' : '';
  return {
    disabled: disabled,
    isDisabled: isDisabled,
    isChecked: isChecked
  };
};

var forced = {
  selection: {
    renderHeader: function renderHeader(h, _ref) {
      var row = _ref.row,
          column = _ref.column,
          store = _ref.store,
          $index = _ref.$index;

      var isChecked = store.states.isAllSelected ? 'is-checked' : '';
      return h(
        'label',
        { 'class': 'el-checkbox ' + isChecked },
        [h(
          'span',
          { 'class': 'el-checkbox__input ' + isChecked },
          [h('span', { 'class': 'el-checkbox__inner' }), h('input', {
            'class': 'el-checkbox__original',
            attrs: { type: 'checkbox'
            },
            on: {
              'change': this.toggleAllSelection
            }
          })]
        )]
      );
    },
    renderCell: function renderCell(h, _ref2) {
      var _this2 = this;

      var row = _ref2.row,
          column = _ref2.column,
          store = _ref2.store,
          $index = _ref2.$index;

      var checkInfo = handleCheckAndDisabled(row, column, $index, store);
      return h(
        'label',
        {
          'class': 'el-checkbox ' + checkInfo.isChecked + checkInfo.isDisabled
        },
        [h(
          'span',
          { 'class': 'el-checkbox__input ' + checkInfo.isChecked + checkInfo.isDisabled },
          [h('span', { 'class': 'el-checkbox__inner' }), h('input', babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default()([{
            attrs: {
              checked: Array.isArray(row.__selected) ? this._i(row.__selected, null) > -1 : row.__selected
            },
            on: {
              '__c': function __c($event) {
                var $$a = row.__selected,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false;

                if (Array.isArray($$a)) {
                  var $$v = null,
                      $$i = _this2._i($$a, $$v);

                  if ($$el.checked) {
                    $$i < 0 && (row.__selected = $$a.concat($$v));
                  } else {
                    $$i > -1 && (row.__selected = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                  }
                } else {
                  row.__selected = $$c;
                }
              }
            }
          }, {
            directives: [{
              name: 'model',
              value: row.__selected
            }]
          }, {
            'class': 'el-checkbox__original',
            attrs: { type: 'checkbox',
              disabled: checkInfo.disabled
            },
            on: {
              'change': function change(event) {
                var ev = event || window.event;
                ev.preventDefault();
                ev.stopPropagation();
                store.commit('rowSelectedChanged', row);
              }
            }
          }]))]
        )]
      );
    },
    sortable: false,
    resizable: false
  },
  single: {
    renderHeader: function renderHeader(h, _ref3) {
      var column = _ref3.column;

      return column.label || '';
    },
    renderCell: function renderCell(h, _ref4) {
      var row = _ref4.row,
          column = _ref4.column,
          store = _ref4.store,
          $index = _ref4.$index;

      return h('el-radio', {
        'class': 'hide-label',
        attrs: { value: store.states.check,
          label: $index,
          disabled: column.selectable ? !column.selectable.call(null, row, $index) : false
        },
        on: {
          'input': function input(event) {
            if (store.table.$refs.refTableBody.type === 'edit') {
              if (store.table.$refs.refTableBody.validateState === 'success') {
                store.commit('setCurrentRow', row, $index);
              }
            } else {
              store.commit('setCurrentRow', row, $index);
            }
          }
        }
      });
    },
    sortable: false,
    resizable: false
  },
  edit: {
    renderHeader: function renderHeader(h, _ref5) {
      var column = _ref5.column;

      return column.label || '';
    },
    renderCell: function renderCell(h, _ref6) {
      var row = _ref6.row,
          column = _ref6.column,
          cellIndex = _ref6.cellIndex,
          store = _ref6.store,
          _self = _ref6._self;

      var item = {};
      var _this = _self;
      // yu-num 的multiple 和column的冲突了，boolean的时候删除这个属性
      if (column.ctype === 'yu-num' && typeof column.multiple === 'boolean') {
        delete column.multiple;
      }
      // 绑定相关属性，事件
      item = deepmerge__WEBPACK_IMPORTED_MODULE_8___default()(item, this.$parent.tableColumnMap[cellIndex].data.attrs, { clone: true });
      var selfData = { attrs: item };
      var listeners = this.$parent.tableColumnMap[cellIndex].componentOptions.listeners;
      if (listeners && listeners.input) {
        delete listeners.input;
      }
      selfData.on = listeners;
      return h(_packages_xform_src_form_item_part__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default()([selfData, {
        attrs: {
          value: row[column.property],
          multiple: column.multiple,
          disabled: column.disabled,
          options: column.options,
          props: column.props,
          'data-code': column.dataCode,

          ctype: column.ctype },
        on: {
          'input': function input($$v) {
            if (_this.tabledata.indexOf(row) === _this.tabledata.indexOf(_this.$refs.table.store.states.currentRow)) {
              _this.saveEditUTraceData(store, row, column, row[column.property], $$v);_this.$set(row, column.property, $$v);
            }
          }
        }
      }]));
    }
  },
  index: {
    renderHeader: function renderHeader(h, _ref7) {
      var column = _ref7.column;

      return column.label || '#';
    },
    renderCell: function renderCell(h, _ref8) {
      var $index = _ref8.$index,
          _self = _ref8._self;

      return h('div', [$index + 1]);
    },
    sortable: false
  },
  expand: {
    renderHeader: function renderHeader(h, _ref9) {
      var column = _ref9.column;

      return column.label || '';
    },
    renderCell: function renderCell(h, _ref10, proxy) {
      var row = _ref10.row,
          store = _ref10.store,
          cellIndex = _ref10.cellIndex,
          _self = _ref10._self;

      var expanded = store.states.expandRows.indexOf(row) > -1 && _self.$refs.table.cellIndex === cellIndex;
      return h(
        'div',
        { 'class': 'el-table__expand-icon ' + (expanded ? 'el-table__expand-icon--expanded' : ''),
          on: {
            'click': function click() {
              return proxy.handleExpandClick(row);
            }
          }
        },
        [h('i', { 'class': 'el-icon el-icon-arrow-right' })]
      );
    },
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  }
};

var getDefaultColumn = function getDefaultColumn(type, options) {
  var column = {};
  _src_utils_merge__WEBPACK_IMPORTED_MODULE_4___default()(column, defaults[type || 'default']);

  for (var name in options) {
    if (options.hasOwnProperty(name)) {
      var value = options[name];
      if (typeof value !== 'undefined') {
        column[name] = value;
      }
    }
  }

  if (!column.minWidth) {
    column.minWidth = 80;
  }

  column.realWidth = column.width || column.minWidth;
  return column;
};

var DEFAULT_RENDER_CELL = function DEFAULT_RENDER_CELL(h, _ref11) {
  var row = _ref11.row,
      column = _ref11.column,
      store = _ref11.store;

  var property = column.property;
  var value = property && property.indexOf('.') === -1 ? row[property] : Object(_src_utils_util__WEBPACK_IMPORTED_MODULE_6__["getValueByPath"])(row, property);
  if (column && column.formatter) {
    var dt = column.formatter(row, column, value);
    // 当配置数据字典（dataCode），且翻译后的值和翻译前的值相等时，表示列数据翻译失败。然后将列信息添加到yufp.lookup.unRegArray json对象中，key为表格序列号tableSequence
    if (column.dataCode && arrayToString(dt) === arrayToString(value)) {
      if (yufp.lookup.unRegArray) {
        var tb = yufp.lookup.unRegArray[column.tableSequence];
        if (tb) {
          // 列信息是否已经存在于tb.lookupArray 中
          var inFlag = false;
          for (var i = 0; i < tb.lookupArray.length; i++) {
            var element = tb.lookupArray[i];
            if (element.columnId === column.id) {
              inFlag = true;
              break;
            }
          }
          // 列信息不存在则添加到lookupArray 中
          if (!inFlag) {
            tb.lookupArray.push({ columnId: column.id, dataCode: column.dataCode });
          }
        } else {
          // 添加表格信息tableSequence 序列号，lookupArray 列信息对象， time 添加日期流水
          yufp.lookup.unRegArray[column.tableSequence] = { tableSequence: column.tableSequence, lookupArray: [{ columnId: column.id, dataCode: column.dataCode, separator: column.separator }], time: new Date().getTime() };
          yufp.lookup.unRegArray[column.tableSequence]['fn'] = function (table) {
            return function (columnObj) {
              table && table.$refs && table.$refs.refTableBody && table.$refs.refTableBody.forceUpdate(columnObj);
            };
          }(store.table);
        }
      }
    }
    return dt;
  }
  return value;
};
/**
 * 如果值数组就返回对应的字符串，以便后续比较
 * @param {} val
 */
var arrayToString = function arrayToString(val) {
  if (val instanceof Array) {
    return val.toString();
  } else {
    return val;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'YuXtableColumn',
  xtype: 'YuXtableColumn',
  mixins: [_src_mixins_locale__WEBPACK_IMPORTED_MODULE_9___default.a],
  props: {
    multiple: Boolean,
    disabled: Boolean,
    // 可编辑变格表单控件类型
    ctype: String,
    // 可编辑表格下拉框，单选框，多选框静态数据
    options: Array,
    dataCode: String,
    type: {
      type: String,
      default: 'default'
    },
    label: String,
    className: String,
    labelClassName: String,
    property: String,
    prop: String,
    width: {},
    minWidth: {},
    renderHeader: Function,
    sortable: {
      type: [String, Boolean],
      default: false
    },
    sortBy: [String, Function, Array],
    sortMethod: Function,
    resizable: {
      type: Boolean,
      default: true
    },
    context: {},
    columnKey: String,
    align: String,
    headerAlign: String,
    showTooltipWhenOverflow: Boolean,
    showOverflowTooltip: Boolean,
    fixed: [Boolean, String],
    formatter: Function,
    selectable: Function,
    reserveSelection: Boolean,
    filterMethod: Function,
    filteredValue: Array,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      default: true
    },
    rules: [Object, Array, String],
    required: Boolean,
    utrace: {
      type: Boolean,
      default: true
    },
    separator: {
      type: String,
      default: ','
    },
    // 表格转码为options 并且配置props时
    props: Object,
    // 是否开启隐藏列
    hideColumn: Boolean,
    sortOrders: {
      type: Array,
      default: function _default() {
        return ['ascending', 'descending', null];
      },
      validator: function validator(val) {
        return val.every(function (order) {
          return ['ascending', 'descending', null].indexOf(order) > -1;
        });
      }
    },
    isFit: Boolean
  },

  data: function data() {
    return {
      isSubColumn: false,
      columns: [],
      utraceMessage: '',
      varHideColumn: this.hideColumn,
      iconClass: ['el-icon', 'el-icon-arrow-right']
    };
  },
  beforeCreate: function beforeCreate() {
    this.row = {};
    this.column = {};
    this.$index = 0;
  },


  components: {
    ElCheckbox: _packages_checkbox__WEBPACK_IMPORTED_MODULE_1___default.a,
    ElTag: _packages_tag__WEBPACK_IMPORTED_MODULE_3___default.a,
    ElRadio: _packages_radio__WEBPACK_IMPORTED_MODULE_2___default.a,
    YuXformItemPart: _packages_xform_src_form_item_part__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]
  },

  computed: {
    owner: function owner() {
      var parent = this.$parent;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    }
  },

  created: function created() {
    var _this3 = this;

    var h = this.$createElement;

    this.customRender = this.$options.render;
    this.$options.render = function (h) {
      return h('div', _this3.$slots.default);
    };
    this.columnId = (this.$parent.tableId || this.$parent.columnId + '_') + 'column_' + columnIdSeed++;

    var parent = this.$parent;
    var owner = this.owner;
    this.isSubColumn = owner !== parent;

    var type = this.type;

    var width = this.width;
    if (width !== undefined) {
      width = parseInt(width, 10);
      if (isNaN(width)) {
        width = null;
      }
    }

    var minWidth = this.minWidth;
    if (minWidth !== undefined) {
      minWidth = parseInt(minWidth, 10);
      if (isNaN(minWidth)) {
        minWidth = 80;
      }
    }

    var isColumnGroup = false;
    var formatter;
    if (this.formatter) {
      formatter = this.formatter;
    } else if (this.ctype === 'timeselect' || this.ctype === 'timepicker' || this.ctype === 'datepicker') {
      formatter = _src_utils_formatter_js__WEBPACK_IMPORTED_MODULE_7__[/* formatters */ "a"]['dateFormatter'];
    } else if (this.options || this.dataCode) {
      formatter = _src_utils_formatter_js__WEBPACK_IMPORTED_MODULE_7__[/* formatters */ "a"]['keytoValue'];
    }
    // 对指定的主键不进行小U监听
    var isUtrace = parent.ukeyField === (this.prop || this.property) ? false : this.utrace;
    var column = getDefaultColumn(type, {
      tableSequence: owner.store.table.sequenceId,
      id: this.columnId,
      separator: this.separator,
      columnKey: this.columnKey,
      label: this.label,
      className: this.className,
      labelClassName: this.labelClassName,
      property: this.prop || this.property,
      type: type,
      multiple: this.multiple,
      disabled: this.disabled,
      options: this.options,
      props: this.props,
      ctype: this.ctype,
      dataCode: this.dataCode,
      defaultRender: DEFAULT_RENDER_CELL,
      renderCell: null,
      editRenderCell: forced['edit'],
      renderHeader: this.renderHeader,
      minWidth: minWidth,
      width: width,
      isColumnGroup: isColumnGroup,
      context: this.context,
      align: this.align ? 'is-' + this.align : null,
      headerAlign: this.headerAlign ? 'is-' + this.headerAlign : this.align ? 'is-' + this.align : null,
      sortable: this.sortable === '' ? true : this.sortable,
      sortMethod: this.sortMethod,
      sortBy: this.sortBy,
      sortOrders: this.sortOrders,
      resizable: this.resizable,
      showOverflowTooltip: this.showOverflowTooltip || this.showTooltipWhenOverflow,
      formatter: formatter,
      selectable: this.selectable,
      reserveSelection: this.reserveSelection,
      fixed: this.fixed === '' ? true : this.fixed,
      filterMethod: this.filterMethod,
      filters: this.filters,
      filterable: this.filters || this.filterMethod,
      filterMultiple: this.filterMultiple,
      filterOpened: false,
      filteredValue: this.filteredValue || [],
      filterPlacement: this.filterPlacement || '',
      rules: this.rules,
      utrace: isUtrace,
      required: this.required,
      hideColumn: this.varHideColumn,
      isFit: this.isFit,
      attrs: this.$attrs
    });
    _src_utils_merge__WEBPACK_IMPORTED_MODULE_4___default()(column, forced[type] || {});
    // 传入的fixed 值为 'left' 或者 'right' 以外的其他字符串时，设置 fixed 的值为 false
    if (typeof column.fixed === 'string' && !(column.fixed === 'left') && !(column.fixed === 'right')) {
      column.fixed = false;
      console.error(this.t('el.table.fixedError'));
    }
    this.columnConfig = column;
    var renderCell = column.renderCell;
    var _self = this;
    if (type === 'expand') {
      // owner.renderExpanded = function(h, data) {
      //   return _self.$scopedSlots.default
      //     ? _self.$scopedSlots.default(data)
      //     : _self.$slots.default;
      // };
      if (column.label) {
        delete column.width;
        delete column.minWidth;
        delete column.realWidth;
      }
      column.renderExpanded = function (h, data) {
        return _self.$scopedSlots.default ? _self.$scopedSlots.default(data) : _self.$slots.default;
      };

      column.renderCell = function (h, data) {
        return h(
          'div',
          { 'class': 'cell' },
          [renderCell(h, data, this._renderProxy)]
        );
      };

      return;
    }
    column.renderCell = function (h, data) {
      // 未来版本移除
      if (_self.$vnode.data.inlineTemplate) {
        renderCell = function renderCell() {
          data._self = _self.context || data._self;
          if (Object.prototype.toString.call(data._self) === '[object Object]') {
            for (var prop in data._self) {
              if (!data.hasOwnProperty(prop)) {
                data[prop] = data._self[prop];
              }
            }
          }
          // 静态内容会缓存到 _staticTrees 内，不改的话获取的静态数据就不是内部 context
          data._staticTrees = _self._staticTrees;
          data.$options.staticRenderFns = _self.$options.staticRenderFns;
          return _self.customRender.call(data);
        };
      } else if (_self.$scopedSlots.default) {
        renderCell = function renderCell() {
          return _self.$scopedSlots.default(data);
        };
      }

      if (!renderCell) {
        renderCell = DEFAULT_RENDER_CELL;
      }
      var children = [_self.renderTreeCell(data), renderCell(h, data)];
      return _self.showOverflowTooltip || _self.showTooltipWhenOverflow ? h(
        'div',
        { 'class': 'cell el-tooltip', style: 'width:' + (data.column.realWidth || data.column.width) + 'px' },
        [children]
      ) : h(
        'div',
        { 'class': 'cell', style: { 'height': this.$parent.rowHeight, 'line-height': this.$parent.rowHeight ? this.$parent.rowHeight : '' } },
        [children, _self.$parent.$parent.utrace ? _self._showUTraceInfo(h, data) : '']
      );
    };
  },
  beforeDestroy: function beforeDestroy() {
    var cts = this.columnConfig.tableSequence;
    if (cts && yufp.lookup && yufp.lookup.unRegArray && yufp.lookup.unRegArray[cts]) {
      yufp.lookup.unRegArray[cts].fn = null;
      delete yufp.lookup.unRegArray[cts];
    }
  },
  destroyed: function destroyed() {
    // this.$parent.tableColumnMap = null;
    if (!this.$parent) return;
    var parent = this.$parent;
    // 删除vnodeColumn 中数据
    this.owner.store.states.vnodeColumn.splice(this.owner.store.states.vnodeColumn.indexOf(this), 1);
    this.owner.store.commit('removeColumn', this.columnConfig, this.isSubColumn ? parent.columnConfig : null, true);
  },


  watch: {
    options: function options(newVal) {
      if (this.columnConfig) {
        this.columnConfig.options = newVal;
      }
    },
    dataCode: function dataCode(newVal) {
      if (this.columnConfig) {
        this.columnConfig.dataCode = newVal;
      }
    },
    ctype: function ctype(newVal) {
      if (this.columnConfig) {
        this.columnConfig.ctype = newVal;
      }
    },
    multiple: function multiple(newVal) {
      if (this.columnConfig) {
        this.columnConfig.multiple = newVal;
      }
    },
    disabled: function disabled(newVal) {
      if (this.columnConfig) {
        this.columnConfig.disabled = newVal;
      }
    },
    label: function label(newVal) {
      if (this.columnConfig) {
        this.columnConfig.label = newVal;
      }
    },
    prop: function prop(newVal) {
      if (this.columnConfig) {
        this.columnConfig.property = newVal;
      }
    },
    property: function property(newVal) {
      if (this.columnConfig) {
        this.columnConfig.property = newVal;
      }
    },
    filters: function filters(newVal) {
      if (this.columnConfig) {
        this.columnConfig.filters = newVal;
      }
    },
    filterMultiple: function filterMultiple(newVal) {
      if (this.columnConfig) {
        this.columnConfig.filterMultiple = newVal;
      }
    },
    align: function align(newVal) {
      if (this.columnConfig) {
        this.columnConfig.align = newVal ? 'is-' + newVal : null;

        if (!this.headerAlign) {
          this.columnConfig.headerAlign = newVal ? 'is-' + newVal : null;
        }
      }
    },
    headerAlign: function headerAlign(newVal) {
      if (this.columnConfig) {
        this.columnConfig.headerAlign = 'is-' + (newVal ? newVal : this.align);
      }
    },
    width: function width(newVal) {
      if (this.columnConfig) {
        this.columnConfig.width = newVal;
        this.owner.store.scheduleLayout();
      }
    },
    minWidth: function minWidth(newVal) {
      if (this.columnConfig) {
        this.columnConfig.minWidth = newVal;
        this.owner.store.scheduleLayout();
      }
    },
    fixed: function fixed(newVal) {
      if (this.columnConfig) {
        this.columnConfig.fixed = newVal;
        this.owner.store.scheduleLayout();
      }
    },
    sortable: function sortable(newVal) {
      if (this.columnConfig) {
        this.columnConfig.sortable = newVal;
      }
    },
    utrace: function utrace(newVal) {
      this.utrace = newVal;
    },
    rules: function rules(newVal) {
      if (this.columnConfig) {
        this.columnConfig.rules = newVal;
        this.owner.store.commit('updateColumnsRules', this.columnConfig);
      }
    },

    /**
     * watch 列隐藏变量状态，然后同步更新表格布局
     */
    varHideColumn: function varHideColumn(newVal) {
      // if (this.owner.store.table.showHiddenMenu === true) {
      this.columnConfig.hideColumn = newVal;
      this.owner.store.commit('updateColumns', this.columnConfig);
      // 更新父节点状态
      this.setParentNodeStatus();
      this.owner.doLayout();
      // }
    }
  },

  mounted: function mounted() {
    // 针对多级表头，递归获取最后一级表头
    var getColumn = function getColumn(tableColumn) {
      var columnData = tableColumn.filter(function (item) {
        return item.tag && item.tag.indexOf('YuXtableColumn') > -1;
      });
      for (var i = 0, l = columnData.length; i < l; i++) {
        if (!columnData[i].componentOptions.children) {
          column.push(columnData[i]);
        } else {
          getColumn(columnData[i].componentOptions.children);
        }
      }
      return column;
    };
    var children = [];
    var column = [];
    var owner = this.owner;
    var parent = this.$parent;
    children = parent.$vnode.componentOptions.children;
    parent.tableColumnMap = getColumn(children);
    var columnIndex = void 0;
    if (!this.isSubColumn) {
      columnIndex = [].indexOf.call(parent.$refs.hiddenColumns.children, this.$el);
    } else {
      columnIndex = [].indexOf.call(parent.$el.children, this.$el);
    }
    // 保存vnodeColumn
    owner.store.states.vnodeColumn.push(this);
    owner.store.commit('insertColumn', this.columnConfig, columnIndex, this.isSubColumn ? parent.columnConfig : null, true);
  },


  methods: {
    renderTreeCell: function renderTreeCell(data) {
      var h = this.$createElement;

      if (!data.treeNode) return null;
      var ele = [];
      ele.push(h('span', { 'class': 'el-table__indent', style: { 'padding-left': data.treeNode.indent + 'px' } }));
      if (data.treeNode.hasChildren) {
        ele.push(h(
          'div',
          { 'class': ['el-table__expand-icon', data.treeNode.expanded ? 'el-table__expand-icon--expanded' : ''],
            on: {
              'click': this.handleTreeExpandIconClick.bind(this, data)
            }
          },
          [h('i', { 'class': this.iconClass })]
        ));
      } else {
        ele.push(h('span', { 'class': 'el-table__placeholder' }));
      }
      return ele;
    },

    // 切换icon的class方法
    changeIconClass: function changeIconClass(a) {
      this.iconClass.pop();
      if (a === 'loading') {
        this.iconClass.push('el-icon-loading');
      } else {
        this.iconClass.push('el-icon-arrow-right');
      }
    },
    handleTreeExpandIconClick: function handleTreeExpandIconClick(data, e) {
      e.stopPropagation();
      // 懒加载数据时防止连续点击一直调用loadData方法引发数据重复的问题
      if (data.store.states.lazy && !data.treeNode.loaded && this.iconClass.indexOf('el-icon-loading') === -1) {
        this.changeIconClass('loading');
        // 只要进入了这个方法，说明懒加载的数据需要加载，直接切换icon图标为加载的图标
        data.store.loadData(data.row, data.treeNode, this.changeIconClass);
      } else {
        data.store.toggleTreeExpansion(data.treeNode.rowKey);
      }
    },
    _showUTraceInfo: function _showUTraceInfo(h, data) {
      var _this = this;
      var messages = data && data.row && data.row.uTraceMessages;
      var fields = data && data.row && data.row.uTraceFidlds;
      var kv = data && data.row && _this.$parent.$parent.ukeyField && data.row[_this.$parent.$parent.ukeyField];
      return _this.resetColUTraceInfo(messages, fields, kv);
    },
    resetColUTraceInfo: function resetColUTraceInfo(messages, fields, keyvalue) {
      var h = this.$createElement;

      var _this = this;
      if (_this.utrace && messages && messages.length > 0 && fields && fields.length > 0) {
        var idx = fields.indexOf(_this.prop || _this.property);
        if (idx > -1) {
          var message = _this.$parent.$parent.showUtitleMessage ? messages[idx] : '';
          var targetProps = {
            on: {
              click: _this.btnUTraceListFn
            }
          };
          return h('span', babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default()([{ 'class': 'el-utrace' }, targetProps, {
            attrs: { ukv: keyvalue || '', title: message || '' }
          }]));
        }
      }
      return '';
    },
    btnUTraceListFn: function btnUTraceListFn(event) {
      this.$parent.$parent.showUTraceListDialog(this.prop || this.property, event.target.getAttribute('ukv'));
      event.stopPropagation();
    },

    // 如果当前节点的父节点下元素都是隐藏的则隐藏父节点
    setParentNodeStatus: function setParentNodeStatus() {
      if (this.$parent.$vnode.tag.indexOf('ElTable') > -1) {
        return;
      } else if (this.$parent.$vnode.tag.indexOf('YuXtableColumn') > -1) {
        var hiddenFlag = true;
        for (var i = 0; i < this.$parent.$children.length; i++) {
          var element = this.$parent.$children[i];
          // 只要有一个子元素的hidden 为false 则不隐藏这个列
          if (element.varHideColumn === false) {
            hiddenFlag = false;
          }
        }
        // 全部隐藏时
        if (hiddenFlag === true) {
          this.$parent.varHideColumn = true;
        } else {
          this.$parent.varHideColumn = false;
        }
      }
    }
  }
});

/***/ }),
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */
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
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/pagination/src/pager.vue?vue&type=template&id=7274f267&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ul",
    { staticClass: "el-pager", on: { click: _vm.onPagerClick } },
    [
      _vm.pageCount > 0
        ? _c(
            "li",
            { staticClass: "number", class: { active: _vm.currentPage === 1 } },
            [_vm._v("1")]
          )
        : _vm._e(),
      _vm.showPrevMore
        ? _c("li", {
            staticClass: "el-icon more btn-quickprev",
            class: [_vm.quickprevIconClass],
            on: {
              mouseenter: function($event) {
                _vm.quickprevIconClass = "el-icon-d-arrow-left"
              },
              mouseleave: function($event) {
                _vm.quickprevIconClass = "el-icon-more"
              }
            }
          })
        : _vm._e(),
      _vm._l(_vm.pagers, function(pager, index) {
        return _c(
          "li",
          {
            key: "pager+" + index,
            staticClass: "number",
            class: { active: _vm.currentPage === pager }
          },
          [_vm._v(_vm._s(pager))]
        )
      }),
      _vm.showNextMore
        ? _c("li", {
            staticClass: "el-icon more btn-quicknext",
            class: [_vm.quicknextIconClass],
            on: {
              mouseenter: function($event) {
                _vm.quicknextIconClass = "el-icon-d-arrow-right"
              },
              mouseleave: function($event) {
                _vm.quicknextIconClass = "el-icon-more"
              }
            }
          })
        : _vm._e(),
      _vm.pageCount > 1
        ? _c(
            "li",
            {
              staticClass: "number",
              class: { active: _vm.currentPage === _vm.pageCount }
            },
            [_vm._v(_vm._s(_vm.pageCount))]
          )
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/pagination/src/pager.vue?vue&type=template&id=7274f267&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/pagination/src/pager.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var pagervue_type_script_lang_js_ = ({
  name: 'ElPager',
  xtype: 'YuPager',

  props: {
    currentPage: Number,
    pageCount: Number
  },

  watch: {
    showPrevMore: function showPrevMore(val) {
      if (!val) this.quickprevIconClass = 'el-icon-more';
    },
    showNextMore: function showNextMore(val) {
      if (!val) this.quicknextIconClass = 'el-icon-more';
    }
  },

  methods: {
    onPagerClick: function onPagerClick(event) {
      var target = event.target;
      if (target.tagName === 'UL') {
        return;
      }

      var newPage = Number(event.target.textContent);
      var pageCount = this.pageCount;
      var currentPage = this.currentPage;

      if (target.className.indexOf('more') !== -1) {
        if (target.className.indexOf('quickprev') !== -1) {
          newPage = currentPage - 5;
        } else if (target.className.indexOf('quicknext') !== -1) {
          newPage = currentPage + 5;
        }
      }

      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }

        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }

      if (newPage !== currentPage) {
        this.$emit('change', newPage);
      }
    }
  },

  computed: {
    pagers: function pagers() {
      var pagerCount = 7;

      var currentPage = Number(this.currentPage);
      var pageCount = Number(this.pageCount);

      var showPrevMore = false;
      var showNextMore = false;

      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - 3) {
          showPrevMore = true;
        }

        if (currentPage < pageCount - 3) {
          showNextMore = true;
        }
      }

      var array = [];

      if (showPrevMore && !showNextMore) {
        var startPage = pageCount - (pagerCount - 2);
        for (var i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (var _i = 2; _i < pagerCount; _i++) {
          array.push(_i);
        }
      } else if (showPrevMore && showNextMore) {
        var offset = Math.floor(pagerCount / 2) - 1;
        for (var _i2 = currentPage - offset; _i2 <= currentPage + offset; _i2++) {
          array.push(_i2);
        }
      } else {
        for (var _i3 = 2; _i3 < pageCount; _i3++) {
          array.push(_i3);
        }
      }

      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;

      return array;
    }
  },

  data: function data() {
    return {
      current: null,
      showPrevMore: false,
      showNextMore: false,
      quicknextIconClass: 'el-icon-more',
      quickprevIconClass: 'el-icon-more'
    };
  }
});
// CONCATENATED MODULE: ./packages/pagination/src/pager.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_pagervue_type_script_lang_js_ = (pagervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/pagination/src/pager.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_pagervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/pagination/src/pager.vue"
/* harmony default export */ var pager = (component.exports);
// EXTERNAL MODULE: external "@/lib/select"
var select_ = __webpack_require__(84);
var select_default = /*#__PURE__*/__webpack_require__.n(select_);

// EXTERNAL MODULE: external "@/lib/option"
var option_ = __webpack_require__(85);
var option_default = /*#__PURE__*/__webpack_require__.n(option_);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// CONCATENATED MODULE: ./packages/pagination/src/pagination.js





/* harmony default export */ var pagination = __webpack_exports__["a"] = ({
  name: 'ElPagination',
  xtype: 'YuPagination',

  props: {
    pageSize: {
      type: Number,
      default: 10
    },

    small: Boolean,

    total: Number,

    pageCount: Number,

    currentPage: {
      type: Number,
      default: 1
    },

    layout: {
      default: 'prev, pager, next, jumper, ->, total'
    },

    pageSizes: {
      type: Array,
      default: function _default() {
        return [10, 20, 30, 40, 50, 100];
      }
    },
    beforePageChange: Function,
    beforeSizeChange: Function
  },

  data: function data() {
    return {
      internalCurrentPage: 1,
      internalPageSize: 0
    };
  },
  render: function render(h) {
    var template = h('div', { 'class': 'el-pagination' });
    template.children = template.children ? template.children : [];
    var layout = this.layout || '';
    if (!layout) return;
    var TEMPLATE_MAP = {
      prev: h('prev'),
      jumper: h('jumper'),
      pager: h('pager', {
        attrs: { currentPage: this.internalCurrentPage, pageCount: this.internalPageCount },
        on: {
          'change': this.handleCurrentChange
        }
      }),
      next: h('next'),
      sizes: h('sizes', {
        attrs: { pageSizes: this.pageSizes }
      }),
      slot: h('my-slot'),
      total: h('total')
    };
    var components = layout.split(',').map(function (item) {
      return item.trim();
    });
    var rightWrapper = h('div', { 'class': 'el-pagination__rightwrapper' });
    rightWrapper.children = rightWrapper.children ? rightWrapper.children : [];
    var haveRightWrapper = false;

    if (this.small) {
      template.data.class += ' el-pagination--small';
    }

    components.forEach(function (compo) {
      if (compo === '->') {
        haveRightWrapper = true;
        return;
      }

      if (!haveRightWrapper) {
        template.children.push(TEMPLATE_MAP[compo]);
      } else {
        rightWrapper.children.push(TEMPLATE_MAP[compo]);
      }
    });

    if (haveRightWrapper) {
      template.children.unshift(rightWrapper);
    }

    return template;
  },


  components: {
    MySlot: {
      render: function render(h) {
        return this.$parent.$slots.default ? this.$parent.$slots.default[0] : '';
      }
    },
    Prev: {
      render: function render(h) {
        return h(
          'button',
          {
            attrs: {
              type: 'button'
            },
            'class': ['btn-prev', { disabled: this.$parent.internalCurrentPage <= 1 }],
            on: {
              'click': this.$parent.prev
            }
          },
          [h('i', { 'class': 'el-icon el-icon-arrow-left' })]
        );
      }
    },

    Next: {
      render: function render(h) {
        return h(
          'button',
          {
            attrs: {
              type: 'button'
            },
            'class': ['btn-next', { disabled: this.$parent.internalCurrentPage === this.$parent.internalPageCount || this.$parent.internalPageCount === 0 }],
            on: {
              'click': this.$parent.next
            }
          },
          [h('i', { 'class': 'el-icon el-icon-arrow-right' })]
        );
      }
    },

    Sizes: {
      mixins: [locale_default.a],

      props: {
        pageSizes: Array,
        beforeSizeChange: Function
      },

      watch: {
        pageSizes: {
          immediate: true,
          handler: function handler(value) {
            if (Array.isArray(value)) {
              this.$parent.internalPageSize = value.indexOf(this.$parent.pageSize) > -1 ? this.$parent.pageSize : this.pageSizes[0];
            }
          }
        }
      },

      render: function render(h) {
        var _this2 = this;

        return h(
          'span',
          { 'class': 'el-pagination__sizes' },
          [h(
            'el-select',
            {
              attrs: {
                clearable: false,
                value: this.$parent.internalPageSize
              },
              on: {
                'input': this.handleChange
              }
            },
            [this.pageSizes.map(function (item) {
              return h('el-option', {
                attrs: {
                  value: item,
                  label: item + ' ' + _this2.t('el.pagination.pagesize') }
              });
            })]
          )]
        );
      },


      components: {
        ElSelect: select_default.a,
        ElOption: option_default.a
      },

      methods: {
        handleChange: function handleChange(val) {
          if (val !== this.$parent.internalPageSize) {
            var _this = this;
            this.$parent.execFunc(function () {
              _this.$parent.internalPageSize = val = parseInt(val, 10);
              _this.$parent.$emit('size-change', val);
            });
          }
        }
      }
    },

    Jumper: {
      mixins: [locale_default.a],

      data: function data() {
        return {
          oldValue: null,
          runTime: new Date().getTime()
        };
      },


      methods: {
        handleFocus: function handleFocus(event) {
          this.oldValue = event.target.value;
        },
        handleBlur: function handleBlur(_ref) {
          var target = _ref.target;

          this.reassignMaxValue(target);
        },
        handleKeyUp: function handleKeyUp(event) {
          var _this = this;
          var key = event.key || '';
          var keyCode = event.keyCode || '';
          if (key && key === 'Enter' || keyCode && keyCode === 13) {
            _this.reassignMaxValue(event.target);
            var tm = new Date().getTime();
            // 通过change的时间比对,根据时间差判断是否是change和keyup 连续执行
            if (tm - this.runTime >= 300) {
              _this.handleChange({ target: event.target });
            }
          }
        },
        handleChange: function handleChange(_ref2) {
          var target = _ref2.target;

          var _this = this;
          this.runTime = new Date().getTime();
          this.$parent.execFunc(function () {
            _this.$parent.internalCurrentPage = _this.$parent.getValidCurrentPage(target.value);
            _this.oldValue = null;
            _this.resetValueIfNeed(target);
          }, function () {
            _this.$parent.internalCurrentPage = parseInt(-1, 10);
            _this.$parent.internalCurrentPage = parseInt(_this.oldValue, 10);
          });
        },
        resetValueIfNeed: function resetValueIfNeed(target) {
          var num = parseInt(target.value, 10);
          if (!isNaN(num)) {
            if (num < 1) {
              target.value = 1;
            } else {
              this.reassignMaxValue(target);
            }
          }
        },
        reassignMaxValue: function reassignMaxValue(target) {
          if (+target.value > this.$parent.internalPageCount) {
            target.value = this.$parent.internalPageCount;
          }
        }
      },

      render: function render(h) {
        var _domProps;

        return h(
          'span',
          { 'class': 'el-pagination__jump' },
          [this.t('el.pagination.goto'), h('input', {
            'class': 'el-pagination__editor',
            attrs: { type: 'number',
              min: 1,
              max: this.$parent.internalPageCount,

              number: true },
            domProps: (_domProps = {
              'value': this.$parent.internalCurrentPage
            }, _domProps['value'] = this.$parent.internalCurrentPage, _domProps),
            on: {
              'change': this.handleChange,
              'focus': this.handleFocus,
              'blur': this.handleBlur,
              'keyup': this.handleKeyUp
            }
          }), this.t('el.pagination.pageClassifier')]
        );
      }
    },

    Total: {
      mixins: [locale_default.a],

      render: function render(h) {
        return typeof this.$parent.total === 'number' ? h(
          'span',
          { 'class': 'el-pagination__total' },
          [this.t('el.pagination.total', { total: this.$parent.total })]
        ) : '';
      }
    },

    Pager: pager
  },

  methods: {
    handleCurrentChange: function handleCurrentChange(val) {
      var _this = this;
      this.execFunc(function () {
        _this.internalCurrentPage = _this.getValidCurrentPage(val);
      });
    },
    prev: function prev() {
      // disabled 状态时点击无反应
      if (this.internalCurrentPage <= 1) {
        return;
      }
      var _this = this;
      this.execFunc(function () {
        var newVal = _this.internalCurrentPage - 1;
        _this.internalCurrentPage = _this.getValidCurrentPage(newVal);
      });
    },
    next: function next() {
      // disabled 状态时点击无反应
      if (this.internalCurrentPage === this.internalPageCount || this.internalPageCount === 0) {
        return;
      }
      var _this = this;
      this.execFunc(function () {
        var newVal = _this.internalCurrentPage + 1;
        _this.internalCurrentPage = _this.getValidCurrentPage(newVal);
      });
    },

    execFunc: function execFunc(callBack, elseFunc) {
      if (this.beforePageChange) {
        this.beforePageChange(function (flag) {
          if (flag === true) {
            callBack();
          } else {
            if (elseFunc) {
              elseFunc();
            }
          }
        });
      } else {
        callBack();
      }
    },

    getValidCurrentPage: function getValidCurrentPage(value) {
      value = parseInt(value, 10);

      var havePageCount = typeof this.internalPageCount === 'number';

      var resetValue = void 0;
      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1;
      } else {
        if (value < 1) {
          resetValue = 1;
        } else if (value > this.internalPageCount) {
          resetValue = this.internalPageCount;
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1;
      } else if (resetValue === 0) {
        resetValue = 1;
      }

      return resetValue === undefined ? value : resetValue;
    }
  },

  computed: {
    internalPageCount: function internalPageCount() {
      if (typeof this.total === 'number') {
        return Math.ceil(this.total / this.internalPageSize);
      } else if (typeof this.pageCount === 'number') {
        return this.pageCount;
      }
      return null;
    }
  },

  watch: {
    currentPage: {
      immediate: true,
      handler: function handler(val) {
        this.internalCurrentPage = val;
      }
    },

    pageSize: {
      immediate: true,
      handler: function handler(val) {
        this.internalPageSize = val;
      }
    },

    internalCurrentPage: function internalCurrentPage(newVal, oldVal) {
      var _this3 = this;

      newVal = parseInt(newVal, 10);

      /* istanbul ignore if */
      if (isNaN(newVal)) {
        newVal = oldVal || 1;
      } else {
        newVal = this.getValidCurrentPage(newVal);
      }

      if (newVal !== undefined) {
        this.$nextTick(function () {
          _this3.internalCurrentPage = newVal;
          if (oldVal !== newVal) {
            _this3.$emit('update:currentPage', newVal);
            _this3.$emit('current-change', _this3.internalCurrentPage);
          }
        });
      } else {
        this.$emit('update:currentPage', newVal);
        this.$emit('current-change', this.internalCurrentPage);
      }
    },
    internalPageCount: function internalPageCount(newVal) {
      /* istanbul ignore if */
      var oldPage = this.internalCurrentPage;
      if (newVal > 0 && oldPage === 0) {
        this.internalCurrentPage = 1;
      } else if (oldPage > newVal) {
        this.internalCurrentPage = newVal === 0 ? 1 : newVal;
      }
    }
  }
});

/***/ }),
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/scrollbar-width");

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("@/lib/checkbox-group");

/***/ }),
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */
/***/ (function(module, exports) {

module.exports = require("@/lib/select");

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("@/lib/option");

/***/ }),
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "babel-helper-vue-jsx-merge-props"
var external_babel_helper_vue_jsx_merge_props_ = __webpack_require__(14);
var external_babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(external_babel_helper_vue_jsx_merge_props_);

// EXTERNAL MODULE: external "@/lib/utils/util"
var util_ = __webpack_require__(4);

// EXTERNAL MODULE: ./packages/table/src/table.vue + 17 modules
var src_table = __webpack_require__(70);

// EXTERNAL MODULE: ./packages/pagination/src/pagination.js + 5 modules
var pagination = __webpack_require__(71);

// EXTERNAL MODULE: ./packages/xtable/src/xtable-column.js
var xtable_column = __webpack_require__(64);

// EXTERNAL MODULE: ./packages/xcheckbox/src/xcheckbox.vue + 4 modules
var xcheckbox = __webpack_require__(28);

// EXTERNAL MODULE: ./src/utils/formatter.js
var utils_formatter = __webpack_require__(40);

// EXTERNAL MODULE: external "deepmerge"
var external_deepmerge_ = __webpack_require__(42);
var external_deepmerge_default = /*#__PURE__*/__webpack_require__.n(external_deepmerge_);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: ./packages/xdialog/src/component.vue + 6 modules
var component = __webpack_require__(44);

// EXTERNAL MODULE: ./packages/button/src/button.vue + 4 modules
var src_button = __webpack_require__(45);

// CONCATENATED MODULE: ./packages/xtable/src/utrace.js




/* harmony default export */ var utrace = ({
  component: {
    YuXdialog: component["a" /* default */],
    YuButton: src_button["a" /* default */]
  },
  props: {
    utrace: {
      type: Boolean,
      default: false
    },
    utraceUsrId: String, // usrId为用户ID，为与后端接口一致，不修改成userId
    utraceOrgId: String,
    utraceMenuId: String,
    utraceTitle: {
      type: String,
      default: '修改痕迹信息'
    },
    uPkValue: String,
    traceServerName: {
      type: String,
      default: ''
    },
    traceGetInterface: {
      type: String,
      default: '/utrace/selectSModifyTrace'
    },
    traceGetListInterface: {
      type: String,
      default: '/utrace/selectSModifyTraceWithPage'
    },
    traceSaveInterface: {
      type: String,
      default: '/utrace/addSModifyTrace'
    },
    ukeyField: String,
    showByMonth: { // 是否开启按月份查询U历史痕迹
      type: Boolean,
      default: false
    },
    showUtitleMessage: { // 是否鼠标滑过小U标记显示title信息
      type: Boolean,
      default: true
    }
  },
  watch: {
    utrace: function utrace(val, oldval) {
      if (val !== oldval) {
        val ? this.loadUTrace() : this.clearUTrace();
      }
    }
  },
  data: function data() {
    return {
      utraceDialogVisible: false,
      utraceBaseParam: { 'mPkV': '' }
    };
  },

  methods: {
    saveEditUTraceData: function saveEditUTraceData(store, row, column, oldv, newv) {
      var uk = this.ukeyField;
      if (this.utrace && column.utrace && uk && row[uk] && !Object(util_["looseEqual"])(oldv, newv)) {
        var k = 'ut-$' + row[uk] + '$-' + column.property;
        var utData = store.states._uTraceData[k];
        store.states._uTraceData[k] = {
          mFieldNm: column.label,
          mNewV: newv,
          mOldV: utData ? utData['mOldV'] : oldv
        };
      }
      this.saveEditRow(store, row);
    },
    changUTraceListDialog: function changUTraceListDialog() {
      this.utraceDialogVisible = !this.utraceDialogVisible;
    },
    showUTraceListDialog: function showUTraceListDialog(name, kv) {
      var _this = this;
      _this.changUTraceListDialog();
      if (name && _this.utraceDialogVisible) {
        // 避免关闭后再次请求小U数据 20191209 lijh11
        this.utraceBaseParam['mFieldId'] = name;
        this.$nextTick(function () {
          _this.showByMonth && _this.$refs.refUTraceSearchForm && _this.$refs.refUTraceSearchForm.resetFields(); // 清空小U月份查询
          var refTable = _this.$refs.refUTraceListTable;
          var parames = { condition: JSON.stringify(kv ? { 'mPkV': [_this.uPkValue + kv], 'mFieldId': name } : _this.utraceBaseParam) }; // 点某个字段小U展示所属行内所有修改过字段的历史记录，故增加mFieldId属性 20191128 lijh11
          if (refTable) {
            refTable.remoteData(parames);
          } else if (_this.$slots.utrace) {
            // 对于自定义表格slot插槽对象处理
            refTable = _this.$slots.utrace[0].children[0].componentInstance;
            refTable && refTable.remoteData && refTable.remoteData(parames);
          }
        });
      }
    },

    // 小U按月搜索查询
    uFormSearch: function uFormSearch() {
      var refTable = this.$refs.refUTraceListTable;
      var params = {};
      var queryParam = JSON.parse(refTable.queryParam[refTable.conditionKey]);
      queryParam.month = this.$refs.refUTraceSearchForm.formdata.month || '';
      queryParam.mFieldId = this.utraceBaseParam['mFieldId'];
      var key = refTable.conditionKey;
      params[key] = JSON.stringify(queryParam);
      refTable.remoteData(params);
    },
    // 小U按月搜索form表单重置
    uSearchFormReset: function uSearchFormReset() {
      this.$refs.refUTraceSearchForm.resetFields(); // 清空小U月份查询
    },
    // 加载小U数据
    loadUTrace: function loadUTrace() {
      var _this = this;
      if (_this.utrace && _this.tabledata.length > 0) {
        if (!_this.uPkValue) {
          console.error(this.t('el.table.uTraceNoParam'));
          return;
        }
        var mPkV = [];
        for (var i = 0; i < _this.tabledata.length; i++) {
          var option = _this.uPkValue + _this.tabledata[i][_this.ukeyField];
          mPkV.push(option || '');
        }
        // 查询修改痕迹历史
        var params = null;
        if (mPkV.length > 0) {
          params = { condition: JSON.stringify({ mPkV: mPkV }) };
          _this.utraceBaseParam['mPkV'] = mPkV;
        }
        params && yufp.service && yufp.service.request({
          url: _this.traceServerName + _this.traceGetInterface,
          data: params,
          async: false,
          method: 'GET',
          callback: function callback(code, message, response) {
            if (response && response.data != null) {
              for (var _i = 0; _i < _this.tabledata.length; _i++) {
                var tData = _this.tabledata[_i];
                var ufield = [];
                var messages = [];
                for (var j = 0, reData = response.data; j < reData.length; j++) {
                  var mFieldId = reData[j].mFieldId;
                  var pk = tData[_this.ukeyField];
                  var mpk = reData[j].mPkV;
                  mpk = mpk.replace(_this.uPkValue, '');
                  if (pk === mpk) {
                    if (ufield.indexOf(mFieldId) < 0) {
                      ufield.push(mFieldId);
                      messages.push(_this.t('el.table.uTraceMessage', { time: reData[j].mDatetime, usrId: reData[j].usrId, mOldDispV: reData[j].mOldDispV, mNewDispV: reData[j].mNewDispV }));
                    }
                  }
                }
                ufield.length > 0 && (tData.uTraceFidlds = ufield);
                messages.length > 0 && (tData.uTraceMessages = messages);
              }
            }
          }
        });
      }
    },
    /**
     * 设置小U留痕信息
     */
    _setUTrace: function _setUTrace(h) {
      var _this = this;
      var dialogProps = {
        props: {
          ref: 'refUTraceXTableDialog',
          visible: _this.utraceDialogVisible,
          width: '850px',
          title: _this.utraceTitle,
          'before-close': _this.changUTraceListDialog
        }
      };
      var buttonProps = {
        props: {
          type: 'primary'
        },
        on: {
          click: _this.showUTraceListDialog
        }
      };
      var buttonList = h(
        'div',
        { slot: 'footer', attrs: { align: 'center' }
        },
        [h(
          src_button["a" /* default */],
          buttonProps,
          [this.t('el.table.uTraceTableDialogBtn')]
        )]
      );
      var yuTableTemp = _this.$slots.utrace || _this._getDefaultUTraceTableColumns(h);
      return h(
        component["a" /* default */],
        dialogProps,
        [yuTableTemp, buttonList]
      );
    },
    /**
     *  保存小U数据
     *  @param {Array} editData 编辑数据
     *  @param forceSave 强制保存（场景：不展示小U，但是要保存小U数据）
     */
    saveUTrace: function saveUTrace(editData, forceSave) {
      if (!this.utraceUsrId && !this.utraceOrgId && !this.utraceMenuId) {
        console.error(this.t('el.table.saveUTraceFailure'));
        return;
      }
      if (this.utrace || forceSave) {
        var _this = this;
        var _utraceData = this.$refs.table.store.states._uTraceData;
        var ukf = this.ukeyField;
        var temp = [];
        if (Array.isArray(editData)) {
          Object.keys(_utraceData).map(function (key) {
            var v = key.split('-')[1].replace(/\$/g, '');
            var has = false;
            editData.map(function (item) {
              if (item[ukf] === v) {
                has = true;
                return;
              }
            });
            !has && delete _utraceData[key] && (has = !has);
          });
        }
        for (var k in _utraceData) {
          var params = k.split('-');
          if (params.length > 0) {
            var id = params[1].substr(1, params[1].length - 2);
            var col = params[2];
            var op = _utraceData[k];
            var option = {};
            option['usrId'] = _this.utraceUsrId;
            option['mMenuId'] = _this.utraceMenuId;
            option['mPkV'] = _this.uPkValue + id;
            option['orgId'] = _this.utraceOrgId;
            option['mFieldId'] = col;
            option['mFieldNm'] = op.mFieldNm;
            if (op.mNewV instanceof Array) {
              option['mNewV'] = op.mNewV.join(',');
            } else {
              option['mNewV'] = op.mNewV;
            }
            if (op.mOldV instanceof Array) {
              option['mOldV'] = op.mOldV.join(',');
            } else {
              option['mOldV'] = op.mOldV;
            }

            var _this$_getDisplayText = _this._getDisplayText(col, op.mOldV, op.mNewV),
                odv = _this$_getDisplayText.odv,
                ndv = _this$_getDisplayText.ndv;

            option['mNewDispV'] = ndv;
            option['mOldDispV'] = odv;

            temp.push(option);
          }
        }
        temp.length > 0 && yufp.service && yufp.service.request({
          url: _this.traceServerName + _this.traceSaveInterface,
          data: JSON.stringify(temp),
          method: 'POST',
          callback: function callback(code, message, response) {
            _this.$emit('after-save-utrace', code, message, yufp.clone(response, {}), yufp.clone(temp, {}));
            // 保存成功后 删除处理数据
            _this.$refs.table.store.states._uTraceData = {};
            // 重新拉取小U数据,强制保存不重新加载小U
            if (forceSave !== true) {
              _this.loadUTrace();
            }
          }
        });
        temp.length === 0 && _this.$emit('after-save-utrace', -1, this.t('el.table.saveUTraceNoUpdate'), null, null);
      } else {
        console.error(this.t('el.table.noUTrace'));
      }
    },
    // 生成默认小U跟踪字段
    _getDefaultUTraceTableColumns: function _getDefaultUTraceTableColumns(h) {
      return h('div', [this.showByMonth ? h(
        'yu-xform',
        { ref: 'refUTraceSearchForm', 'class': 'utrace-search-form', attrs: { 'related-table-name': 'refUTraceListTable', 'remove-empty': true }
        },
        [h(
          'yu-xform-group',
          {
            attrs: { column: 3 }
          },
          [h('yu-xform-item', {
            attrs: { placeholder: '\u6708\u4EFD', ctype: 'datepicker', type: 'month', name: 'month' }
          }), h(
            'div',
            { slot: 'custom', 'class': 'search-btn-group' },
            [h(
              'yu-button',
              { style: 'margin-left:10px;', attrs: { type: 'primary', icon: 'search' },
                on: {
                  'click': this.uFormSearch
                }
              },
              ['\u67E5\u8BE2']
            ), h(
              'yu-button',
              {
                attrs: { type: 'primary', icon: 'edit' },
                on: {
                  'click': this.uSearchFormReset
                }
              },
              ['\u91CD\u7F6E']
            )]
          )]
        )]
      ) : '', h(
        'yu-xtable',
        { ref: 'refUTraceListTable', attrs: { 'max-height': '300', stripe: true, 'default-load': false, 'default-sort': { prop: 'mDatetime', order: 'descending' }, 'data-url': this.traceServerName + this.traceGetListInterface }
        },
        [h('yu-xtable-column', {
          attrs: { label: this.t('el.table.uTraceTableCol1'), type: 'index', width: '55' }
        }), h('yu-xtable-column', {
          attrs: { label: this.t('el.table.uTraceTableCol2'), prop: 'mFieldNm', resizable: true }
        }), h('yu-xtable-column', {
          attrs: { label: this.t('el.table.uTraceTableCol3'), prop: 'mOldDispV', resizable: true }
        }), h('yu-xtable-column', {
          attrs: { label: this.t('el.table.uTraceTableCol4'), prop: 'mNewDispV', resizable: true }
        }), h('yu-xtable-column', {
          attrs: { label: this.t('el.table.uTraceTableCol5'), prop: 'usrId', resizable: true }
        }), h('yu-xtable-column', {
          attrs: { label: this.t('el.table.uTraceTableCol6'), prop: 'mDatetime', resizable: true, sortable: true }
        })]
      )]);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xtable/src/xtable.vue?vue&type=script&lang=js&


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };











function noop() {}
/* harmony default export */ var xtablevue_type_script_lang_js_ = ({
  name: 'YuXtable',
  xtype: 'YuXtable',

  componentName: 'YuXtable',
  mixins: [locale_default.a, utrace],
  component: {
    ElTable: src_table["a" /* default */],
    ElPagination: pagination["a" /* default */],
    YuXtableColumn: xtable_column["a" /* default */],
    YuXcheckbox: xcheckbox["a" /* default */]
  },
  props: {
    rowNumber: Boolean,
    selectionType: String,
    dataUrl: String,
    defaultLoad: {
      type: Boolean,
      default: true
    },
    /** 请求类型 */
    requestType: {
      type: String,
      default: 'GET'
    },
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
    conditionKey: {
      type: String,
      default: 'condition'
    },
    // 默认参数
    baseParams: Object,
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 表格相关配置属性
    height: [String, Number],
    maxHeight: [String, Number],
    fit: {
      type: Boolean,
      default: true
    },
    stripe: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    rowKey: [String, Function],
    reserveSelection: Boolean,
    context: {},
    showHeader: {
      type: Boolean,
      default: true
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
    lazy: Boolean,
    load: Function,
    // 分页相关属性配置
    pageable: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: function _default() {
        return [10, 20, 30, 40, 50, 100];
      }
    },
    rules: [Object, Array, String],
    selectable: Function,
    showUtitleMessage: { // 是否鼠标滑过小U标记显示title信息
      type: Boolean,
      default: true
    },
    beforePageChange: Function,
    beforeSizeChange: Function,
    parseResponse: {
      type: Function,
      default: noop
    },
    autoSortable: Boolean,
    renderCustomContent: Function,
    // 是否开启隐藏列
    showHiddenMenu: Boolean, // 表格的唯一id
    tableSequence: String,

    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellClassName: [String, Function],
    headerCellStyle: [Object, Function],
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },
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
    renderCustomHeader: Function,
    rowHeight: [String],
    isFit: Boolean,
    encode: {
      type: Boolean,
      default: false
    },
    // 启用性能优化数组长度
    enableLength: {
      type: Number,
      default: 500
    },
    treeProps: {
      type: Object,
      default: function _default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children'
        };
      }
    }
  },
  data: function data() {
    var total = this.dataTotal;
    if (this.data && this.data.length > 0) {
      total = this.data.length;
    }
    return {
      key: 0,
      // 默认分页属性
      total: total,
      page: 1,
      size: this.pageSize || this.pageSizes[0] || 10,
      tableColumns: [],
      tabledata: this.data,
      queryParam: {},
      // loading: false,
      selections: [],
      olddata: [],
      repeatTrigger: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      contextMenuId: 'c_menu_id_' + new Date().getTime(),
      sequenceId: new Date().getTime() + '_' + parseInt(Math.random() * 1000, 10),
      // 是否已查询过，解决未查询直接翻页情况
      queryFlag: false,
      rownumber: this.rowNumber,
      hasborder: this.border,
      selectiontype: this.selectionType
    };
  },
  computed: {
    pageInfo: function pageInfo() {
      return {
        page: this.page,
        size: this.size,
        total: this.total
      };
    }
  },
  created: function created() {
    if (!this.dataUrl) {
      this.olddata = this._props.data;
      this.total = this.olddata.length;
      this.privateLocalData();
    }
  },

  methods: {
    pageChangeFn: function pageChangeFn(val) {
      var _this = this;
      _this.page = val;
      if (_this.repeatTrigger) {
        _this.repeatTrigger = false;
      } else {
        if (_this.dataUrl) {
          // 未发请求是，不能直接翻页发请求
          if (this.dataUrl && this.queryFlag === false) {
            return;
          }
          _this.privateRemoteData(this.queryParam, 'pageGo');
        } else {
          _this.privateLocalData('pageGo');
        }
      }
      _this.$emit('page-change', _this.selections, val, _this.pageInfo);
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
        if (_this.dataUrl) {
          // 未发请求是，不能直接翻页发请求
          if (this.dataUrl && this.queryFlag === false) {
            return;
          }
          _this.privateRemoteData(this.queryParam, 'pageGo');
        } else {
          _this.privateLocalData('pageGo');
        }
      }
      _this.$emit('size-change', _this.selections, val, _this.pageInfo);
    },

    /**
     * 外部调用，请使用remoteData方法
     * privateRemoteDate仅供组件内部使用
     */
    privateRemoteData: function privateRemoteData(queryParam, type) {
      this.$refs.table.store.states.check = null;
      this.$refs.table.store.states.currentEditRow = null;
      this.$refs.table.store.states._editRows = [];
      var _this = this;
      this.queryFlag = true;
      _this.tabledata = [];
      if (!this.reserveSelection && !this.$refs.table.store.states.reserveSelection || type !== 'pageGo') {
        _this.selections = [];
        this.$refs.table.store.states.selection = [];
        this.$refs.table.store.states.selectionIds = [];
        this.$refs.table.store.states.isAllSelected = false;
      }
      if (!_this.dataUrl) {
        throw new Error(this.t('el.table.noDataUrl'));
      }
      var loadOption = yufp.clone(_this.requestLoadOption, {});
      if (!loadOption.show) {
        var ld = this.$loading({
          target: _this.$el,
          body: false
        });
      } else {
        loadOption.option = loadOption.option || {};
        yufp.clone({
          target: _this.$el,
          body: false
        }, loadOption.option);
      }
      // _this.loading = true;
      _this.queryParam = queryParam ? queryParam : _this.queryParam;

      queryParam = yufp.extend(true, {}, _this.queryParam);
      var baseParams = yufp.extend(true, {}, _this.baseParams);

      var bCondition = baseParams[_this.conditionKey];
      var qCondition = queryParam[_this.conditionKey];
      if (bCondition) {
        if (qCondition) {
          bCondition = (typeof bCondition === 'undefined' ? 'undefined' : _typeof(bCondition)) === 'object' ? bCondition : JSON.parse(bCondition);
          qCondition = (typeof qCondition === 'undefined' ? 'undefined' : _typeof(qCondition)) === 'object' ? qCondition : JSON.parse(qCondition);
          yufp.extend(true, bCondition, qCondition);
        }
        queryParam[_this.conditionKey] = (typeof bCondition === 'undefined' ? 'undefined' : _typeof(bCondition)) === 'object' ? JSON.stringify(bCondition) : bCondition;
      } else if (qCondition) {
        queryParam[_this.conditionKey] = (typeof qCondition === 'undefined' ? 'undefined' : _typeof(qCondition)) === 'object' ? JSON.stringify(qCondition) : qCondition;
      }
      delete baseParams[_this.conditionKey];
      queryParam = yufp.extend(baseParams, queryParam);

      if (_this.pageable) {
        var pageObj = {};
        pageObj[_this.pageKey] = _this.page;
        pageObj[_this.sizeKey] = _this.size;
        this.$refs.table.store.states.pageable = true;
        yufp.extend(queryParam, pageObj);
      }
      yufp.service.request({
        url: _this.dataUrl,
        data: queryParam,
        method: _this.requestType,
        loadingUi: loadOption,
        encode: _this.encode,
        callback: function callback(code, message, response) {
          if (_this.parseResponse && typeof _this.parseResponse === 'function') {
            var rest = _this.parseResponse(code, message, response);
            if (rest === false) {
              _this.$nextTick(function () {
                ld && ld.close();
              });
              return;
            }
          }
          var tabledata = Object(util_["getValueByPath"])(response, _this.jsonData) || [];
          _this.tabledata = _this.handleData(tabledata, true);
          _this.total = Object(util_["getValueByPath"])(response, _this.jsonTotal) || 0;
          // _this.loading = false;
          if (_this.utrace) {
            _this.loadUTrace();
          }
          _this.$nextTick(function () {
            ld && ld.close();
            _this.$nextTick(function () {
              _this.$emit('loaded', _this.tabledata, _this.total, response);
            });
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
      // 使用自定义的page size
      if (queryParam) {
        _this.page = queryParam['page'] || _this.page;
        _this.size = queryParam['size'] || _this.size;
        _this.repeatTrigger = false;
      }
      this.$refs.table.store.states.isAllSelected = false;
      _this.privateRemoteData(queryParam);
    },
    privateLocalData: function privateLocalData(type) {
      this.$nextTick(function () {
        this.$refs.table.store.states.check = null;
        this.$refs.table.store.states.currentEditRow = null;
        this.$refs.table.store.states._editRows = [];
        if (!this.reserveSelection && !this.$refs.table.store.states.reserveSelection || type !== 'pageGo') {
          this.selections = [];
          this.$refs.table.store.states.selection = [];
          this.$refs.table.store.states.selectionIds = [];
          this.$refs.table.store.states.isAllSelected = false;
        }
      });
      var startIndex = (this.page - 1) * this.size;
      this.tabledata = this.olddata && this.olddata.length > 0 ? this.pageable ? this.olddata.slice(startIndex, this.page * this.size) : this.olddata : [];
      if (this.utrace) {
        this.loadUTrace();
      }
    },

    // 清空表格数据
    clearData: function clearData() {
      this.tabledata.splice(0);
      this.$refs.table.store.states.isAllSelected = false;
      this.total = 0;
      this.page = 1;
    },
    saveEditRow: function saveEditRow(store, row) {
      store.states._editRows.indexOf(row) === -1 && store.states._editRows.push(row);
    },
    toggleRowExpansion: function toggleRowExpansion(row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded);
    },
    clearSort: function clearSort() {
      this.$refs.table.clearSort();
    },
    clearFilter: function clearFilter(columnKeys) {
      this.$refs.table.clearFilter(columnKeys);
    },
    sort: function sort(prop, order) {
      this.$refs.table.sort(prop, order);
    },
    getEditRows: function getEditRows() {
      return this.$refs.table.store.states._editRows;
    },
    clearSelection: function clearSelection(selection) {
      this.selections = [];
      return this.$refs.table.clearSelection(selection);
    },
    toggleAllSelection: function toggleAllSelection(row, selected) {
      return this.$refs.table.toggleAllSelection();
    },
    toggleRowSelection: function toggleRowSelection(row, selected) {
      return this.$refs.table.toggleRowSelection(row, selected);
    },
    doLayout: function doLayout() {
      this.$refs.table.doLayout();
    },
    setCurrentRow: function setCurrentRow(row) {
      this.selections = row ? [row] : [];
      this.$nextTick(function () {
        this.$refs.table.setCurrentRow(row);
      });
    },
    scrollTo: function scrollTo() {
      var bodyWrapper = this.$el.getElementsByClassName('el-table__body-wrapper')[0];
      var tableRow = bodyWrapper.getElementsByClassName('el-table__row');
      var index = this.$refs.table.store.states.index;
      if (index > 0) {
        index--;
        var cur = tableRow[index].style.transform.replace(/[^0-9\-,]/g, '');
        bodyWrapper.scrollTo(0, cur);
        this.$refs.table.refreshRenderData();
      }
    },

    // 触发event类型方法
    select: function select(selection, row) {
      this.$emit('select', selection, row);
    },
    selectAll: function selectAll() {
      var table = this.$refs.table;
      table.store.states.data.forEach(function (item) {
        table.toggleRowSelection(item, true);
      });
    },
    selectAllEmit: function selectAllEmit(selection) {
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
    rowClick: function rowClick(row, event, column, index) {
      if (this.selectionType !== 'checkbox') {
        this.setCurrentRow(row);
        this.selections = [row];
      } else if (!this.selectable || this.selectable.call(null, row, index)) {
        // this.$refs.table.toggleRowSelection(row);
        this.selections = this.$refs.table.selection;
      }
      this.$emit('row-click', row, event, column, index);
    },
    rowDblclick: function rowDblclick(row, event) {
      if (this.selectionType !== 'checkbox') {
        this.selections = [row];
      }
      this.$emit('row-dblclick', row, event);
    },
    rowContextmenu: function rowContextmenu(row, event) {
      this.$emit('row-contextmenu', row, event);
    },
    headerClick: function headerClick(column, event) {
      this.$emit('header-click', column, event);
    },
    sortChange: function sortChange(_ref) {
      var column = _ref.column,
          prop = _ref.prop,
          order = _ref.order;

      this.$emit('sort-change', { column: column, prop: prop, order: order });
    },
    filterChange: function filterChange(filters) {
      this.$emit('filter-change', filters);
    },
    currentChange: function currentChange(currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow);
    },
    headerDragend: function headerDragend(newWidth, oldWidth, column, event) {
      this.$emit('header-dragend', newWidth, oldWidth, column, event);
    },
    headerContextmenu: function headerContextmenu(column, event) {
      if (typeof this.renderCustomHeader === 'function' || this.showHiddenMenu) {
        this.contextmenuFunc(event);
      }
      this.$emit('header-contextmenu', column, event);
    },
    expand: function expand(row, expanded) {
      this.$emit('expand', row, expanded);
    },
    validate: function validate(callback, flag) {
      this.$refs.table.validate(callback, flag);
    },
    clearValidateMessage: function clearValidateMessage() {
      this.$refs.table.clearValidateMessage();
    },

    /**
     * 设置列显示，其他列状态不变
     */
    setShowColumns: function setShowColumns(arr) {
      if (!arr) {
        return;
      }
      var vnodeColumn = this.$refs.table.store.states.vnodeColumn;
      vnodeColumn.map(function (item) {
        // 去掉多余的column无用列（没有prop的和存在子节点的）
        if (item.prop && (!item.$children || item.$children.length === 0)) {
          if (arr.indexOf(item.prop) > -1) {
            item.varHideColumn = false;
          }
        }
      });
      // 用于延迟控制表格整体样式(如果不调用，会导致设置高度后，表格收缩)
      this.$nextTick(function () {
        this.doLayout();
      });
    },

    /**
     * 设置列隐藏，其他列状态不变
     */
    setHiddenColumns: function setHiddenColumns(arr) {
      this.$nextTick(function () {
        if (!arr) {
          return;
        }
        var vnodeColumn = this.$refs.table.store.states.vnodeColumn;
        vnodeColumn.map(function (item) {
          // 去掉多余的column无用列（没有prop的和存在子节点的）
          if (item.prop && (!item.$children || item.$children.length === 0)) {
            if (arr.indexOf(item.prop) > -1) {
              item.varHideColumn = true;
            }
          }
        });
        // 用于延迟控制表格整体样式(如果不调用，会导致设置高度后，表格收缩)
        // this.$nextTick(function() {
        this.doLayout();
      });
    },

    /*  获取显示文本
     *  @param {Object} col 列对象
     *  @param {String|Array} oldv 原始数据
     *  @param {String|Array} newv 新数据
     *  @return {Object} {odv,ndv} 返回数据对象，值对应的显示文本
     */
    _getDisplayText: function _getDisplayText(col, oldv, newv) {
      var c = this.getColByName(col);
      if (c && c.dataCode) {
        var ov = oldv;
        if (ov instanceof Array) {
          ov = yufp.lookup.convertMultiKey(c.dataCode, ov.join(','));
        } else {
          ov = yufp.lookup.convertKey(c.dataCode, ov);
        }
        var nv = newv;
        if (nv instanceof Array) {
          nv = yufp.lookup.convertMultiKey(c.dataCode, nv.join(','));
        } else {
          nv = yufp.lookup.convertKey(c.dataCode, nv);
        }
        return { odv: ov, ndv: nv };
      } else if (c && c.options) {
        var formatter = utils_formatter["a" /* formatters */]['keytoValue'];
        return { odv: formatter(null, { options: c.options }, oldv), ndv: formatter(null, { options: c.options }, newv) };
      } else {
        return { odv: oldv, ndv: newv };
      }
    },

    /**
     *  根据列名获取列对象
     *  @param {String} col 列名称
     *  @return {Object} 列对象
     */
    getColByName: function getColByName(col) {
      var c = this.tableColumns.filter(function (item) {
        return item.prop === col;
      });
      return c && c.length > 0 ? c[0] : null;
    },
    checkValidate: function checkValidate() {
      var validate = false;
      var _this = this;
      this.validate(function (valid) {
        validate = valid;
      });
      if (validate) {
        _this.$message({ message: this.t('el.table.failure'), type: 'error' });
        return false;
      } else {
        return true;
      }
    },

    /**
    * 根据插槽获取子元素，包括嵌套,并转换为数组，
    数组中每一项对象值为{label，prop，hidden}
     */
    setHiddenColumn: function setHiddenColumn(h) {
      if (this.$refs.table && this.$refs.table.store && this.$refs.table.store.states.vnodeColumn) {
        var vnodeColumn = this.$refs.table.store.states.vnodeColumn;
        var hiddenColumnsChecked = [];
        var hiddenColumns = [];
        vnodeColumn.filter(function (item) {
          if (item.prop && (!item.$children || item.$children.length === 0)) {
            hiddenColumns.push({ key: item.prop, value: item.label, hidden: item.varHideColumn });
            if (item.varHideColumn !== true) {
              hiddenColumnsChecked.push(item.prop);
            }
            return true;
          } else {
            return false;
          }
        }, this);
        var checkboxProps = {
          props: {
            options: hiddenColumns,
            value: hiddenColumnsChecked,
            min: 1 // 必须选一项数据
          },
          on: {
            input: this.headerContextChange
          }
        };
        // 不能使用elcheckbox 会涉及到渲染值错误（当添加key后会出现死循环渲染）
        return h(
          'div',
          {
            attrs: { id: this.contextMenuId },
            'class': 'yu-xtable__contextMenu' },
          [h(xcheckbox["a" /* default */], checkboxProps)]
        );
      } else {
        this.key++;
      }
    },
    /**
      * 表头右键监听
      * @param e:鼠标事件
      * @param v:vue
      */
    contextMenuFun: function contextMenuFun(e, v) {
      var contextmenuTab = v.$parent.$el.querySelector('#' + v.contextMenuId);
      v.openMenu(contextmenuTab, e);
      contextmenuTab.removeEventListener('mouseleave', this.mouseleaveFunc);
      contextmenuTab.addEventListener('mouseleave', this.mouseleaveFunc);
    },

    // 跟随右键位置显示菜单
    openMenu: function openMenu(contextmenuTab, e) {
      contextmenuTab.style.left = e.clientX + 'px';
      contextmenuTab.style.top = e.clientY + 'px';
      contextmenuTab.style.display = 'block';
      contextmenuTab.style.position = 'fixed';
    },

    // 关闭右键菜单
    closeMenu: function closeMenu(contextmenuTab) {
      contextmenuTab.style.display = 'none';
      // 添加右键隐藏时的事件接口
      this.$emit('nonedisplay-rightmenu');
    },

    /**
    *表头右键中checkbox的事件
     */
    headerContextChange: function headerContextChange(e) {
      var vnodeColumn = this.$refs.table.store.states.vnodeColumn;
      vnodeColumn.map(function (item) {
        // 去掉多余的column无用列（没有prop的和存在子节点的）
        if (item.prop && (!item.$children || item.$children.length === 0)) {
          if (e.indexOf(item.prop) > -1) {
            item.varHideColumn = false;
          } else {
            item.varHideColumn = true;
          }
        }
      });
    },
    initCustomHeader: function initCustomHeader(h) {
      return h('div', { 'attrs': { 'id': this.contextMenuId, 'class': 'yu-xtable__contextMenu yu-xtable__contextMenu__customer' } }, [this.renderCustomHeader(h)]);
    },
    contextmenuFunc: function contextmenuFunc(e) {
      e.preventDefault();
      this.contextMenuFun(e, this);
    },
    mouseleaveFunc: function mouseleaveFunc(e) {
      var contextmenuTab = this.$parent.$el.querySelector('#' + this.contextMenuId);
      this.closeMenu(contextmenuTab);
    },
    // 处理渲染数据 ，添加__vkey, __translateY, __height
    handleData: function handleData(data, isFirst) {
      var arr = [];
      var translateY = 0;
      // this.store.states.selection = [];
      data.forEach(function (v, i) {
        var height = isFirst ? 41 : v.__height;
        if (i !== 0) {
          translateY += height;
        }
        // 初次渲染 添加 数据
        if (v.__vkey === undefined) {
          v.__vkey = i;
          v.__translateY = translateY + 'px';
          v.__height = height;
          v.__selected = false;
        } else {
          v.__translateY = translateY + 'px';
          // if (v.__selected) {
          //   this.store.states.selection.push(v);
          // }
        }
        arr.push(v);
      });
      return arr;
    },
    getColumnWidth: function getColumnWidth(prop) {
      var filterArr = [];
      var sumWidth = 0;
      var filterColumns = function filterColumns(columns, filterArr) {
        for (var i = 0, l = columns.length; i < l; i++) {
          var column = columns[i];
          if (column.children) {
            filterColumns(column.children, filterArr);
          } else {
            filterArr.push(column.prop);
          }
        }
        return filterArr;
      };
      var columns = this.getTableColumns(prop);
      var arr = filterColumns(columns, filterArr);
      for (var j = 0, lh = this.$refs.table.columns.length; j < lh; j++) {
        var column = this.$refs.table.columns[j];
        if (arr.indexOf(column.property) !== -1) {
          sumWidth += column.realWidth;
        }
      }
      return sumWidth;
    },

    filteTableColumns: function filteTableColumns(columns, prop, filterArr) {
      for (var i = 0, l = columns.length; i < l; i++) {
        var column = columns[i];
        if (prop.indexOf(column.prop) !== -1) {
          filterArr.push(column);
        }
        if (column.children) {
          this.filteTableColumns(column.children, prop, filterArr);
        }
      }
      return filterArr;
    },
    /**
     * 获取目前表格列的数据信息
     */
    getTableColumns: function getTableColumns(props) {
      var prop = props && typeof props === 'string' ? [props] : props;
      var defaultSlot = this.$slots.default;
      if (defaultSlot && defaultSlot.length > 0) {
        var columns = this.getTableColumn(defaultSlot);
        if (prop) {
          return this.filteTableColumns(columns, prop, []);
        } else {
          return columns;
        }
      }
      return [];
    },
    // 处理表格列插槽信息
    getTableColumn: function getTableColumn(xtableColumn) {
      var tableColumn = [];
      var columns = xtableColumn.filter(function (item) {
        return item.tag && item.tag.indexOf('YuXtableColumn') > -1;
      });
      for (var i = 0, l = columns.length; i < l; i++) {
        if (columns[i].tag && columns[i].tag.indexOf('YuXtableColumn') > -1) {
          if (columns[i].componentOptions.children) {
            tableColumn.push(columns[i].componentOptions.propsData);
            tableColumn[i].children = this.getTableColumn(columns[i].componentOptions.children);
          } else {
            // 将列状态填充
            if (columns[i].componentInstance) {
              columns[i].componentOptions.propsData.hideColumn = columns[i].componentInstance.varHideColumn;
              tableColumn.push(columns[i].componentOptions.propsData);
            } else {
              tableColumn.push(columns[i].componentOptions.propsData);
            }
          }
        }
      };
      return tableColumn;
    },
    setRowNumber: function setRowNumber(flag) {
      this.rownumber = flag;
      this.key++;
    },
    setSelectionType: function setSelectionType(type) {
      this.selectiontype = type;
      this.key++;
    },
    setBorder: function setBorder(flag) {
      this.hasborder = flag;
      this.key++;
    },
    setColumnFix: function setColumnFix(prop, direction) {
      try {
        var columns = this.$refs.table.store.states.columns;
        var column = columns.filter(function (item, index) {
          return item.property === prop;
        })[0];
        direction ? column.fixed = direction : column.fixed = true;
        this.$refs.table.store.commit('updateColumns', column);
      } catch (e) {
        console.error('\u8BF7\u786E\u8BA4\uFF0C\u662F\u5426\u6709prop\u4E3A' + prop + '\u5BF9\u5E94\u7684\u5217\uFF1F');
      }
    }
  },
  watch: {
    selectionType: function selectionType(val) {
      this.selectiontype = val;
      this.key++;
    },

    data: {
      immediate: true,
      handler: function handler(val) {
        // this.key++; // 因性能优化时，往数据中增加__selected变量，改变这个值时（选中数据），会触发此处变更，重新初始化表格，故注释掉。
        if (val.length === 0 && this.$refs.table) {
          this.$refs.table.store.states.check = null;
          this.$refs.table.store.states.currentEditRow = null;
          this.$refs.table.store.states.selection = [];
          this.$refs.table.store.states._editRows = [];
        }
        var curData = this.handleData(val, true);
        this.olddata = curData;
        this.total = curData.length;
        var startIndex = (this.page - 1) * this.size;
        this.tabledata = this.olddata && this.olddata.length > 0 ? this.pageable ? this.olddata.slice(startIndex, this.page * this.size) : this.olddata : [];
      }
    },
    dataUrl: function dataUrl(val) {
      var _this = this;
      if (_this.page !== 1) {
        _this.page = 1;
        _this.repeatTrigger = true;
      }
      _this.privateRemoteData();
    },

    baseParams: {
      handler: function handler() {
        var _this = this;
        if (_this.page !== 1) {
          _this.page = 1;
          _this.repeatTrigger = true;
        }
        _this.privateRemoteData();
      },
      immediate: false
    },
    dataTotal: function dataTotal(val) {
      this.total = val;
    }
  },
  mounted: function mounted() {
    this.tableColumns = this.getTableColumns();
    if (this.defaultLoad && this.dataUrl) {
      this.privateRemoteData();
    } else {
      this.total = this.total || 0;
    }
    this.$on('el.form.change', this.validate);
    this.$refs.table.store.states.selectType = this.selectionType;
  },
  render: function render(h) {
    // 表格属性，及事件传递
    var cloneProp = external_deepmerge_default()(this.$props, this.$options.propsData, { clone: true });
    delete cloneProp.data;
    // if (cloneProp.selectionType === 'checkbox') {
    //   cloneProp.highlightCurrentRow = false;
    // }
    cloneProp.tableSequence = this.sequenceId;
    cloneProp.border = this.hasborder;
    var propsData = {
      props: cloneProp
    };
    propsData.on = {
      'select': this.select,
      'select-all': this.selectAllEmit,
      'selection-change': this.selectionChange,
      'cell-mouse-enter': this.cellMouseEnter,
      'cell-mouse-leave': this.cellMouseLeave,
      'cell-click': this.cellClick,
      'cell-dblclick': this.cellDblclick,
      'row-click': this.rowClick,
      'row-contextmenu': this.rowContextmenu,
      'row-dblclick': this.rowDblclick,
      'header-click': this.headerClick,
      'sort-change': this.sortChange,
      'filter-change': this.filterChange,
      'current-change': this.currentChange,
      'header-dragend': this.headerDragend,
      'expand': this.expand,
      'header-contextmenu': this.headerContextmenu,
      'set-show-columns': this.setShowColumns,
      'set-hidden-columns': this.setHiddenColumns
    };
    // 分页组件属性，及事件传递
    var pageData = {
      props: {
        total: this.total,
        currentPage: this.page,
        pageSize: this.size,
        pageSizes: this.pageSizes,
        layout: this.layout,
        beforePageChange: this.beforePageChange,
        beforeSizeChange: this.beforeSizeChange,
        rowHeight: this.rowHeight
      }
    };
    pageData.on = {
      'current-change': this.pageChangeFn,
      'size-change': this.sizeChangeFn
    };
    var table = h(
      'div',
      { 'class': 'yu-xtable', key: this.key },
      [h(
        src_table["a" /* default */],
        external_babel_helper_vue_jsx_merge_props_default()([{ ref: 'table' }, propsData, {
          attrs: { data: this.tabledata }
        }]),
        [this.selectiontype === 'radio' ? h(xtable_column["a" /* default */], {
          attrs: { type: 'single', width: '48' }
        }) : '', this.selectiontype === 'checkbox' ? h(xtable_column["a" /* default */], {
          attrs: { reserveSelection: this.reserveSelection, type: 'selection', selectable: this.selectable, width: '48' }
        }) : '', this.rownumber ? h(xtable_column["a" /* default */], {
          attrs: { type: 'index', width: '55', label: this.t('el.table.order') }
        }) : '', this.$slots.default, h(
          'template',
          { slot: 'empty', directives: [{
              name: 'if',
              value: '$slots.empty'
            }]
          },
          [this.$slots.empty]
        ), h(
          'template',
          { slot: 'append', directives: [{
              name: 'if',
              value: '$slots.append'
            }]
          },
          [this.$slots.append]
        )]
      ), this.pageable ? h(pagination["a" /* default */], pageData) : '', this.utrace ? this._setUTrace(h) : '', typeof this.renderCustomHeader === 'function' ? this.initCustomHeader(h) : this.showHiddenMenu ? this.setHiddenColumn(h) : '']
    );
    return table;
  },
  // updated() {
  //   var _this = this;
  //   if (typeof this.renderCustomHeader === 'function' || _this.showHiddenMenu) {
  //     var thead = this.$el.querySelector('.el-table__header-wrapper');
  //     thead.removeEventListener('contextmenu', this.contextmenuFunc);
  //     thead.addEventListener('contextmenu', this.contextmenuFunc);
  //   }
  // },
  beforeDestroy: function beforeDestroy() {
    var thead = this.$el.querySelector('.el-table__header-wrapper');
    var contextmenuTab = this.$parent.$el.querySelector('#' + this.contextMenuId);
    var _this = this;
    this.$nextTick(function () {
      thead && thead.removeEventListener('contextmenu', _this.contextmenuFunc);
      contextmenuTab && contextmenuTab.removeEventListener('mouseleave', _this.mouseleaveFunc);
    });
    // 表格资源释放
    yufp.lookup && yufp.lookup.unRegArray && delete yufp.lookup.unRegArray[this.tableSequence];
  },

  destroyed: function destroyed() {
    this.$off();
  }
});
// CONCATENATED MODULE: ./packages/xtable/src/xtable.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_xtablevue_type_script_lang_js_ = (xtablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xtable/src/xtable.vue
var xtable_render, staticRenderFns




/* normalize component */

var xtable_component = Object(componentNormalizer["a" /* default */])(
  src_xtablevue_type_script_lang_js_,
  xtable_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
xtable_component.options.__file = "packages/xtable/src/xtable.vue"
/* harmony default export */ var xtable = (xtable_component.exports);
// CONCATENATED MODULE: ./packages/xtable/index.js


xtable.install = function (Vue) {
  Vue.component(xtable.name, xtable);
};

/* harmony default export */ var packages_xtable = __webpack_exports__["default"] = (xtable);

/***/ })
/******/ ]);