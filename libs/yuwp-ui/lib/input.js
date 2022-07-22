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
/******/ 	return __webpack_require__(__webpack_require__.s = 110);
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

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);


/* istanbul ignore next */
_src_input__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_input__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_input__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_input__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),

/***/ 17:
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

/***/ 19:
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

/***/ 20:
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

/***/ 23:
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

/***/ 24:
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

/***/ 39:
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

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)(false);
// imports


// module
exports.push([module.i, "\n.el-input_account{position: absolute;right: 0;line-height: normal;font-size: 12px;}\n.el-input_notice{position: absolute;left: 0;line-height: normal;font-size: 12px;}\r\n", ""]);

// exports


/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_input_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)(false);
// imports


// module
exports.push([module.i, "\n.el-input__icon.el-icon{\r\n  position: absolute;\r\n  right: 2px;\n}\r\n", ""]);

// exports


/***/ })

/******/ });