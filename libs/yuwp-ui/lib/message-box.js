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
/******/ 	return __webpack_require__(__webpack_require__.s = 162);
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

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/merge");

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@/lib/button");

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(8);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/message-box/src/main.vue?vue&type=template&id=6b29b012&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "msgbox-fade" } }, [
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
        staticClass: "el-message-box__wrapper",
        attrs: {
          tabindex: "-1",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": _vm.title || "dialog"
        },
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
            staticClass: "el-message-box",
            class: [_vm.customClass, _vm.center && "el-message-box--center"]
          },
          [
            _vm.title !== undefined
              ? _c("div", { staticClass: "el-message-box__header" }, [
                  _c("div", { staticClass: "el-message-box__title" }, [
                    _vm.icon && _vm.center
                      ? _c("div", {
                          class: ["el-message-box__status", _vm.icon]
                        })
                      : _vm._e(),
                    _c("span", [_vm._v(_vm._s(_vm.title))])
                  ]),
                  _vm.showClose
                    ? _c(
                        "button",
                        {
                          staticClass: "el-message-box__headerbtn",
                          attrs: { type: "button", "aria-label": "Close" },
                          on: {
                            click: function($event) {
                              return _vm.handleAction(
                                _vm.distinguishCancelAndClose
                                  ? "close"
                                  : "cancel"
                              )
                            },
                            keydown: function($event) {
                              if (
                                !$event.type.indexOf("key") &&
                                _vm._k(
                                  $event.keyCode,
                                  "enter",
                                  13,
                                  $event.key,
                                  "Enter"
                                )
                              ) {
                                return null
                              }
                              return _vm.handleAction(
                                _vm.distinguishCancelAndClose
                                  ? "close"
                                  : "cancel"
                              )
                            }
                          }
                        },
                        [
                          _c("i", {
                            staticClass: "el-message-box__close el-icon-close"
                          })
                        ]
                      )
                    : _vm._e()
                ])
              : _vm._e(),
            _vm.message !== ""
              ? _c("div", { staticClass: "el-message-box__content" }, [
                  _vm.icon && !_vm.center && _vm.message !== ""
                    ? _c("div", { class: ["el-message-box__status", _vm.icon] })
                    : _vm._e(),
                  _c(
                    "div",
                    {
                      staticClass: "el-message-box__message",
                      style: { "margin-left": _vm.typeClass ? "50px" : "0" }
                    },
                    [
                      _vm._t("default", [
                        !_vm.dangerouslyUseHTMLString
                          ? _c("p", [_vm._v(_vm._s(_vm.message))])
                          : _c("p", {
                              domProps: { innerHTML: _vm._s(_vm.message) }
                            })
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
                          value: _vm.showInput,
                          expression: "showInput"
                        }
                      ],
                      staticClass: "el-message-box__input"
                    },
                    [
                      _c("el-input", {
                        ref: "input",
                        attrs: {
                          type: _vm.inputType,
                          placeholder: _vm.inputPlaceholder
                        },
                        nativeOn: {
                          compositionstart: function($event) {
                            return _vm.handleComposition($event)
                          },
                          compositionupdate: function($event) {
                            return _vm.handleComposition($event)
                          },
                          compositionend: function($event) {
                            return _vm.handleComposition($event)
                          },
                          keydown: function($event) {
                            if (
                              !$event.type.indexOf("key") &&
                              _vm._k(
                                $event.keyCode,
                                "enter",
                                13,
                                $event.key,
                                "Enter"
                              )
                            ) {
                              return null
                            }
                            return _vm.handleInputEnter($event)
                          }
                        },
                        model: {
                          value: _vm.inputValue,
                          callback: function($$v) {
                            _vm.inputValue = $$v
                          },
                          expression: "inputValue"
                        }
                      }),
                      _c(
                        "div",
                        {
                          staticClass: "el-message-box__errormsg",
                          style: {
                            visibility: !!_vm.editorErrorMessage
                              ? "visible"
                              : "hidden"
                          }
                        },
                        [_vm._v(_vm._s(_vm.editorErrorMessage))]
                      )
                    ],
                    1
                  )
                ])
              : _vm._e(),
            _c(
              "div",
              { staticClass: "el-message-box__btns" },
              [
                _vm.buttons.length > 1
                  ? _vm._l(_vm.buttons, function(item, index) {
                      return _c(
                        "el-button",
                        {
                          key: "cstbtn_" + index,
                          class: [item.class],
                          attrs: { type: item.type, loading: item.loading },
                          nativeOn: {
                            click: function($event) {
                              _vm.handleAction(item.key || index + 1)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n          " + _vm._s(item.text) + "\n          "
                          )
                        ]
                      )
                    })
                  : _vm._e(),
                _c(
                  "el-button",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.showConfirmButton,
                        expression: "showConfirmButton"
                      }
                    ],
                    ref: "confirm",
                    class: [_vm.confirmButtonClasses],
                    attrs: {
                      loading: _vm.confirmButtonLoading,
                      round: _vm.roundButton,
                      type: "primary"
                    },
                    nativeOn: {
                      click: function($event) {
                        return _vm.handleAction("confirm")
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n          " +
                        _vm._s(
                          _vm.confirmButtonText ||
                            _vm.t("el.messagebox.confirm")
                        ) +
                        "\n        "
                    )
                  ]
                ),
                _c(
                  "el-button",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.showCancelButton,
                        expression: "showCancelButton"
                      }
                    ],
                    class: [_vm.cancelButtonClasses],
                    attrs: {
                      loading: _vm.cancelButtonLoading,
                      round: _vm.roundButton
                    },
                    nativeOn: {
                      click: function($event) {
                        return _vm.handleAction("cancel")
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n          " +
                        _vm._s(
                          _vm.cancelButtonText || _vm.t("el.messagebox.cancel")
                        ) +
                        "\n        "
                    )
                  ]
                )
              ],
              2
            )
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/message-box/src/main.vue?vue&type=template&id=6b29b012&

// EXTERNAL MODULE: external "@/lib/utils/popup"
var popup_ = __webpack_require__(27);
var popup_default = /*#__PURE__*/__webpack_require__.n(popup_);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: external "@/lib/input"
var input_ = __webpack_require__(10);
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// EXTERNAL MODULE: external "@/lib/button"
var button_ = __webpack_require__(13);
var button_default = /*#__PURE__*/__webpack_require__.n(button_);

// EXTERNAL MODULE: external "@/lib/utils/dom"
var dom_ = __webpack_require__(2);

// EXTERNAL MODULE: external "@/lib/locale"
var lib_locale_ = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/message-box/src/main.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







// import Dialog from '@/src/utils/aria-dialog';

var typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

/* harmony default export */ var mainvue_type_script_lang_js_ = ({
  mixins: [popup_default.a, locale_default.a],

  props: {
    modal: {
      default: true
    },
    lockScroll: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    },
    closeOnHashChange: {
      default: true
    },
    center: {
      default: false,
      type: Boolean
    },
    roundButton: {
      default: false,
      type: Boolean
    },
    // 自定义弹出框按钮
    buttons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 是否显示消息框在根部window
    showTopWindow: Boolean
  },

  components: {
    ElInput: input_default.a,
    ElButton: button_default.a
  },

  computed: {
    typeClass: function typeClass() {
      return this.type && typeMap[this.type] && !this.center ? 'el-icon-' + typeMap[this.type] : '';
    },
    confirmButtonClasses: function confirmButtonClasses() {
      return '' + this.confirmButtonClass;
    },
    cancelButtonClasses: function cancelButtonClasses() {
      return '' + this.cancelButtonClass;
    },
    icon: function icon() {
      var type = this.type,
          iconClass = this.iconClass;

      return iconClass || (type && typeMap[type] ? 'el-icon-' + typeMap[type] : '');
    }
  },

  methods: {
    handleComposition: function handleComposition(event) {
      var _this = this;

      if (event.type === 'compositionend') {
        setTimeout(function () {
          _this.isOnComposition = false;
        }, 100);
      } else {
        this.isOnComposition = true;
      }
    },
    handleInputEnter: function handleInputEnter() {
      if (this.inputType !== 'textarea') {
        return this.handleAction('confirm');
      }
    },
    getSafeClose: function getSafeClose() {
      var _this2 = this;

      var currentId = this.uid;
      return function () {
        _this2.$nextTick(function () {
          if (currentId === _this2.uid) _this2.doClose();
        });
      };
    },
    doClose: function doClose() {
      if (!this.visible) return;
      this.visible = false;
      this._closing = true;

      this.onClose && typeof this.onClose === 'function' && this.onClose();
      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200);
      }
      this.opened = false;

      if (!this.transition) {
        this.doAfterClose();
      }
      // 顺序问题导致$confirm弹框中需要弹出类似$alert的弹框提示信息时，弹框被移除只留下灰色背景层
      this.showTopWindow ? self.top.window.document.body.removeChild(this.$el) : document.body.removeChild(this.$el);
      if (this.action && typeof this.callback === 'function') {
        this.callback(this.action, this);
      }
    },
    handleWrapperClick: function handleWrapperClick() {
      if (this.closeOnClickModal) {
        this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel');
      }
    },
    handleAction: function handleAction(action) {
      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
        return;
      }
      this.action = action;
      if (typeof this.beforeClose === 'function') {
        this.close = this.getSafeClose();
        this.beforeClose(action, this, this.close);
      } else {
        this.doClose();
      }
    },
    validate: function validate() {
      if (this.$type === 'prompt') {
        var inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage = this.inputErrorMessage || Object(lib_locale_["t"])('el.messagebox.error');
          Object(dom_["addClass"])(this.$refs.input.$el.querySelector('input'), 'invalid');
          return false;
        }
        var inputValidator = this.inputValidator;
        if (typeof inputValidator === 'function') {
          var validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || Object(lib_locale_["t"])('el.messagebox.error');
            Object(dom_["addClass"])(this.$refs.input.$el.querySelector('input'), 'invalid');
            return false;
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult;
            return false;
          }
        }
      }
      this.editorErrorMessage = '';
      Object(dom_["removeClass"])(this.$refs.input.$el.querySelector('input'), 'invalid');
      return true;
    },
    getFirstFocus: function getFirstFocus() {
      var btn = this.$el.querySelector('.el-message-box__btns .el-button');
      var title = this.$el.querySelector('.el-message-box__btns .el-message-box__title');
      return btn || title;
    },
    getInputElement: function getInputElement() {
      var inputRefs = this.$refs.input.$refs;
      return inputRefs.input || inputRefs.textarea;
    }
  },

  watch: {
    inputValue: {
      immediate: true,
      handler: function handler(val) {
        var _this3 = this;

        this.$nextTick(function () {
          if (_this3.$type === 'prompt' && val !== null) {
            _this3.validate();
          }
        });
      }
    },

    visible: function visible(val) {
      var _this4 = this;

      if (val) this.uid++;
      if (this.$type === 'alert' || this.$type === 'confirm' || this.$type === 'customConfirm') {
        this.$nextTick(function () {
          _this4.$refs.confirm.$el.focus();
        });
        this.focusAfterClosed = document.activeElement;
        // messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus());
      }
      if (this.$type !== 'prompt') return;
      if (val) {
        setTimeout(function () {
          if (_this4.$refs.input && _this4.$refs.input.$el) {
            _this4.getInputElement().focus();
          }
        }, 500);
      } else {
        this.editorErrorMessage = '';
        Object(dom_["removeClass"])(this.getInputElement(), 'invalid');
      }
    }
  },
  created: function created() {
    // var l = this.lineBreak;
    // console.log('参数信息', this, l, this.lineBreak);
    if (this.lineBreak) {
      var h = this.$createElement;
      var msg = this.message.split('\n');
      // console.log('自定换行', msg);
      var tmpMsg = [];
      for (var i in msg) {
        tmpMsg.push(h('p', null, msg[i]));
      }
      // console.log('自定换行', tmpMsg);
      this.message = h('div', null, tmpMsg);
    }
  },
  beforeMount: function beforeMount() {
    // console.log('beforeMount 参数', this.lineBreak);
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.close);
    }
    // setTimeout(() => {
    //   messageBox.closeDialog();
    // });
  },
  mounted: function mounted() {
    var _this5 = this;

    // console.log('messagebox 参数', this, this.lineBreak);
    this.$nextTick(function () {
      if (_this5.closeOnHashChange) {
        window.addEventListener('hashchange', _this5.close);
      }
    });
  },
  data: function data() {
    return {
      uid: 1,
      title: undefined,
      message: '',
      type: '',
      customClass: '',
      showInput: false,
      inputValue: null,
      inputPlaceholder: '',
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      action: '',
      confirmButtonText: '',
      cancelButtonText: '',
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',
      editorErrorMessage: null,
      lineBreak: false,
      dangerouslyUseHTMLString: false,
      callback: null,
      isOnComposition: false,
      focusAfterClosed: null,
      inputType: 'text',
      iconClass: '',
      distinguishCancelAndClose: false
    };
  }
});
// CONCATENATED MODULE: ./packages/message-box/src/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/message-box/src/main.vue





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
component.options.__file = "packages/message-box/src/main.vue"
/* harmony default export */ var main = (component.exports);
// EXTERNAL MODULE: external "@/lib/utils/merge"
var merge_ = __webpack_require__(11);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge_);

// EXTERNAL MODULE: external "@/lib/utils/vdom"
var vdom_ = __webpack_require__(58);

// CONCATENATED MODULE: ./packages/message-box/src/main.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var defaults = {
  title: undefined,
  message: '',
  type: '',
  iconClass: '',
  showInput: false,
  showClose: true,
  modalFade: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  closeOnHashChange: true,
  inputValue: null,
  inputPlaceholder: '',
  inputPattern: null,
  inputValidator: null,
  inputErrorMessage: '',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonPosition: 'right',
  confirmButtonHighlight: false,
  cancelButtonHighlight: false,
  confirmButtonText: '',
  cancelButtonText: '',
  confirmButtonClass: '',
  cancelButtonClass: '',
  customClass: '',
  beforeClose: null,
  lineBreak: false,
  dangerouslyUseHTMLString: false,
  inputType: 'text',
  center: false,
  roundButton: false,
  distinguishCancelAndClose: false,
  buttons: [],
  showTopWindow: false
};






var MessageBoxConstructor = external_vue_default.a.extend(main);

var currentMsg = void 0,
    instance = void 0;
var msgQueue = [];

var defaultCallback = function defaultCallback(action) {
  if (currentMsg) {
    var callback = currentMsg.callback;
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action);
      } else {
        callback(action);
      }
    }
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        if (instance.showInput) {
          currentMsg.resolve({ value: instance.inputValue, action: action });
        } else {
          currentMsg.resolve(action);
        }
      } else if ((action === 'cancel' || action === 'close') && currentMsg.reject) {
        currentMsg.reject(action);
      }
    }
  }
};

var initInstance = function initInstance(ins) {
  instance = new MessageBoxConstructor({
    el: ins.showTopWindow ? self.top.window.document.createElement('div') : document.createElement('div')
  });

  instance.callback = defaultCallback;
};

var main_showNextMsg = function showNextMsg(ins) {
  // if (!instance) {
  initInstance(ins);
  // }
  instance.action = '';

  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();

      var options = currentMsg.options;
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }

      var oldCb = instance.callback;
      instance.callback = function (action, instance) {
        oldCb(action, instance);
        showNextMsg(instance);
      };
      if (Object(vdom_["isVNode"])(instance.message)) {
        instance.$slots.default = [instance.message];
        instance.message = null;
      } else {
        delete instance.$slots.default;
      }
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape', 'closeOnHashChange'].forEach(function (prop) {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });
      instance.showTopWindow ? self.top.window.document.body.appendChild(instance.$el) : document.body.appendChild(instance.$el);
      instance.visible = true;
      // 因延迟导致，messageBox无法嵌套使用
      // Vue.nextTick(() => {
      //   instance.visible = true;
      // });
    }
  }
};

var main_MessageBox = function MessageBox(options, callback) {
  if (external_vue_default.a.prototype.$isServer) return;
  if (typeof options === 'string') {
    options = {
      message: options
    };
    if (arguments[1]) {
      options.title = arguments[1];
    }
    if (arguments[2]) {
      options.type = arguments[2];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }

  if (typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      // eslint-disable-line
      msgQueue.push({
        options: merge_default()({}, defaults, MessageBox.defaults, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      });
      main_showNextMsg(options);
    });
  } else {
    msgQueue.push({
      options: merge_default()({}, defaults, MessageBox.defaults, options),
      callback: callback
    });

    main_showNextMsg(options);
  }
};

main_MessageBox.setDefaults = function (defaults) {
  main_MessageBox.defaults = defaults;
};

main_MessageBox.alert = function (message, title, options) {
  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
    options = title;
    title = '';
  } else if (title === undefined) {
    title = '';
  }
  return main_MessageBox(merge_default()({
    title: title,
    message: message,
    $type: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options));
};

main_MessageBox.confirm = function (message, title, options) {
  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
    options = title;
    title = '';
  } else if (title === undefined) {
    title = '';
  }
  return main_MessageBox(merge_default()({
    title: title,
    message: message,
    $type: 'confirm',
    showCancelButton: true
  }, options));
};
main_MessageBox.customConfirm = function (message, title, options) {
  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
    options = title;
    title = '';
  } else if (title === undefined) {
    title = '';
  }
  return main_MessageBox(merge_default()({
    title: title,
    message: message,
    $type: 'customConfirm',
    showConfirmButton: false
  }, options));
};

main_MessageBox.prompt = function (message, title, options) {
  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
    options = title;
    title = '';
  } else if (title === undefined) {
    title = '';
  }
  return main_MessageBox(merge_default()({
    title: title,
    message: message,
    showCancelButton: true,
    showInput: true,
    $type: 'prompt'
  }, options));
};

main_MessageBox.close = function () {
  instance.visible = false;
  msgQueue = [];
  currentMsg = null;
  instance = null;
};

/* harmony default export */ var src_main = (main_MessageBox);

// CONCATENATED MODULE: ./packages/message-box/index.js

/* harmony default export */ var message_box = __webpack_exports__["default"] = (src_main);

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/dom");

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/popup");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/vdom");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ })

/******/ });