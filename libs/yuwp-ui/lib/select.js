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
/******/ 	return __webpack_require__(__webpack_require__.s = 153);
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

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("@/lib/scrollbar");

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/select.vue?vue&type=template&id=0e4aade6&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "el-select" }, [
    !_vm.details
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
            ]
          },
          [
            _vm.multiple
              ? _c(
                  "div",
                  {
                    ref: "tags",
                    class: [
                      _vm.lockHeight
                        ? "el-select__tags el-select__tags__inline"
                        : "el-select__tags"
                    ],
                    style: { "max-width": _vm.inputWidth - 32 + "px" },
                    on: {
                      click: function($event) {
                        $event.stopPropagation()
                        return _vm.toggleMenu($event)
                      }
                    }
                  },
                  [
                    _vm.collapseTags && _vm.selected.length
                      ? _c(
                          "span",
                          [
                            _c(
                              "el-tag",
                              {
                                attrs: {
                                  closable: !_vm.selectDisabled,
                                  size: _vm.collapseTagSize,
                                  hit: _vm.selected[0].hitState,
                                  type: "info",
                                  "disable-transitions": ""
                                },
                                on: {
                                  close: function($event) {
                                    return _vm.deleteTag(
                                      $event,
                                      _vm.selected[0]
                                    )
                                  }
                                }
                              },
                              [
                                _c(
                                  "span",
                                  { staticClass: "el-select__tags-text" },
                                  [_vm._v(_vm._s(_vm.selected[0].currentLabel))]
                                )
                              ]
                            ),
                            _vm.selected.length > 1
                              ? _c(
                                  "el-tag",
                                  {
                                    attrs: {
                                      closable: false,
                                      size: _vm.collapseTagSize,
                                      type: "info",
                                      "disable-transitions": ""
                                    }
                                  },
                                  [
                                    _c(
                                      "span",
                                      { staticClass: "el-select__tags-text" },
                                      [
                                        _vm._v(
                                          "+ " + _vm._s(_vm.selected.length - 1)
                                        )
                                      ]
                                    )
                                  ]
                                )
                              : _vm._e()
                          ],
                          1
                        )
                      : _vm._e(),
                    !_vm.collapseTags
                      ? _c(
                          "transition-group",
                          { on: { "after-leave": _vm.resetInputHeight } },
                          _vm._l(_vm.selected, function(item) {
                            return _c(
                              "el-tag",
                              {
                                key: _vm.getValueKey(item),
                                attrs: {
                                  closable: !_vm.selectDisabled,
                                  size: _vm.collapseTagSize,
                                  hit: item.hitState,
                                  type: "primary",
                                  "close-transition": ""
                                },
                                on: {
                                  close: function($event) {
                                    return _vm.deleteTag($event, item)
                                  }
                                }
                              },
                              [
                                _c(
                                  "span",
                                  { staticClass: "el-select__tags-text" },
                                  [_vm._v(_vm._s(item.currentLabel))]
                                )
                              ]
                            )
                          }),
                          1
                        )
                      : _vm._e(),
                    _vm.filterable
                      ? _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.query,
                              expression: "query"
                            }
                          ],
                          ref: "input",
                          staticClass: "el-select__input",
                          class: "is-" + _vm.size,
                          style: {
                            width: _vm.inputLength + "px",
                            "max-width": _vm.inputWidth - 42 + "px"
                          },
                          attrs: {
                            type: "text",
                            disabled: _vm.disabled,
                            "auto-complete": _vm.autoComplete,
                            debounce: _vm.remote ? 300 : 0
                          },
                          domProps: { value: _vm.query },
                          on: {
                            focus: function($event) {
                              _vm.visible = true
                            },
                            keyup: _vm.managePlaceholder,
                            keydown: [
                              _vm.resetInputState,
                              function($event) {
                                if (
                                  !$event.type.indexOf("key") &&
                                  _vm._k(
                                    $event.keyCode,
                                    "down",
                                    40,
                                    $event.key,
                                    ["Down", "ArrowDown"]
                                  )
                                ) {
                                  return null
                                }
                                $event.preventDefault()
                                return _vm.navigateOptions("next")
                              },
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
                                return _vm.navigateOptions("prev")
                              },
                              function($event) {
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
                                $event.preventDefault()
                                return _vm.selectOption($event)
                              },
                              function($event) {
                                if (
                                  !$event.type.indexOf("key") &&
                                  _vm._k(
                                    $event.keyCode,
                                    "esc",
                                    27,
                                    $event.key,
                                    ["Esc", "Escape"]
                                  )
                                ) {
                                  return null
                                }
                                $event.stopPropagation()
                                $event.preventDefault()
                                _vm.visible = false
                              },
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
                                return _vm.deletePrevTag($event)
                              }
                            ],
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.query = $event.target.value
                            }
                          }
                        })
                      : _vm._e()
                  ],
                  1
                )
              : _vm._e(),
            _c(
              "el-input",
              {
                ref: "reference",
                attrs: {
                  type: "text",
                  placeholder: _vm.currentPlaceholder,
                  name: _vm.name,
                  size: _vm.size,
                  id: _vm.id,
                  disabled: _vm.disabled,
                  readonly: !_vm.filterable || _vm.multiple,
                  "validate-event": false,
                  details: _vm.details
                },
                on: {
                  focus: _vm.handleFocus,
                  blur: _vm.handleBlur,
                  click: _vm.handleIconClick
                },
                nativeOn: {
                  mousedown: function($event) {
                    return _vm.handleMouseDown($event)
                  },
                  keyup: function($event) {
                    return _vm.debouncedOnInputChange($event)
                  },
                  keydown: [
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
                      return _vm.navigateOptions("next")
                    },
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
                      return _vm.navigateOptions("prev")
                    },
                    function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      $event.preventDefault()
                      return _vm.selectOption($event)
                    },
                    function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "esc", 27, $event.key, [
                          "Esc",
                          "Escape"
                        ])
                      ) {
                        return null
                      }
                      $event.stopPropagation()
                      $event.preventDefault()
                      _vm.visible = false
                    },
                    function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                      ) {
                        return null
                      }
                      _vm.visible = false
                    }
                  ],
                  paste: function($event) {
                    return _vm.debouncedOnInputChange($event)
                  },
                  mouseenter: function($event) {
                    _vm.inputHovering = true
                  },
                  mouseleave: function($event) {
                    _vm.inputHovering = false
                  }
                },
                model: {
                  value: _vm.selectedLabel,
                  callback: function($$v) {
                    _vm.selectedLabel = $$v
                  },
                  expression: "selectedLabel"
                }
              },
              [
                _vm.$slots.prefix
                  ? _c("template", { slot: "prefix" }, [_vm._t("prefix")], 2)
                  : _vm._e(),
                _c("template", { slot: "suffix" }, [
                  _c("i", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !_vm.showClose,
                        expression: "!showClose"
                      }
                    ],
                    class: [
                      "el-select__caret",
                      "el-input__icon",
                      "el-icon-" + _vm.iconClass
                    ],
                    on: { click: _vm.handleIconCaret }
                  }),
                  _vm.showClose
                    ? _c("i", {
                        staticClass:
                          "el-select__caret el-input__icon el-icon-circle-close",
                        on: { click: _vm.handleClearClick }
                      })
                    : _vm._e()
                ])
              ],
              2
            ),
            _c(
              "transition",
              {
                attrs: { name: "el-zoom-in-top" },
                on: {
                  "before-enter": _vm.handleMenuEnter,
                  "after-leave": _vm.doDestroy
                }
              },
              [
                _c(
                  "el-select-menu",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.visible && _vm.emptyText !== false,
                        expression: "visible && emptyText !== false"
                      }
                    ],
                    ref: "popper",
                    attrs: { "append-to-body": _vm.popperAppendToBody }
                  },
                  [
                    _c(
                      "el-scrollbar",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.options.length > 0 && !_vm.loading,
                            expression: "options.length > 0 && !loading"
                          }
                        ],
                        class: {
                          "is-empty":
                            !_vm.allowCreate && _vm.filteredOptionsCount === 0
                        },
                        attrs: {
                          tag: "ul",
                          "no-horizontal-scroll": true,
                          "wrap-class": "el-select-dropdown__wrap",
                          "view-class": "el-select-dropdown__list"
                        }
                      },
                      [
                        _vm.showNewOption
                          ? _c("el-option", {
                              attrs: { value: _vm.query, created: "" }
                            })
                          : _vm._e(),
                        _vm._t("default")
                      ],
                      2
                    ),
                    _vm.emptyText &&
                    (!_vm.allowCreate ||
                      _vm.loading ||
                      (_vm.allowCreate && _vm.options.length === 0))
                      ? [
                          _vm.$slots.empty
                            ? _vm._t("empty")
                            : _c(
                                "p",
                                { staticClass: "el-select-dropdown__empty" },
                                [
                                  _vm._v(
                                    "\n          " +
                                      _vm._s(_vm.emptyText) +
                                      "\n        "
                                  )
                                ]
                              )
                        ]
                      : _vm._e()
                  ],
                  2
                )
              ],
              1
            )
          ],
          1
        )
      : _vm._e(),
    _vm.details ? _c("span", [_vm._v(_vm._s(_vm.selectValue))]) : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/select/src/select.vue?vue&type=template&id=0e4aade6&

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "@/lib/input"
var input_ = __webpack_require__(10);
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/select-dropdown.vue?vue&type=template&id=06828748&
var select_dropdownvue_type_template_id_06828748_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "el-select-dropdown",
      class: [{ "is-multiple": _vm.$parent.multiple }, _vm.popperClass],
      style: { minWidth: _vm.minWidth }
    },
    [_vm._t("default")],
    2
  )
}
var select_dropdownvue_type_template_id_06828748_staticRenderFns = []
select_dropdownvue_type_template_id_06828748_render._withStripped = true


// CONCATENATED MODULE: ./packages/select/src/select-dropdown.vue?vue&type=template&id=06828748&

// EXTERNAL MODULE: external "@/lib/utils/vue-popper"
var vue_popper_ = __webpack_require__(7);
var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/select-dropdown.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//



/* harmony default export */ var select_dropdownvue_type_script_lang_js_ = ({
  name: 'ElSelectDropdown',
  xtype: 'YuSelectDropdown',

  componentName: 'ElSelectDropdown',

  mixins: [vue_popper_default.a],

  props: {
    placement: {
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default: function _default() {
        return {
          gpuAcceleration: false,
          preventOverflowOrder: ['left', 'top', 'bottom']
        };
      }
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      minWidth: ''
    };
  },


  computed: {
    popperClass: function popperClass() {
      return this.$parent.popperClass;
    }
  },

  watch: {
    '$parent.inputWidth': function $parentInputWidth() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.referenceElm = this.$parent.$refs.reference.$el;
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on('updatePopper', function () {
      if (_this.$parent.visible) _this.updatePopper();
    });
    this.$on('destroyPopper', this.destroyPopper);
  },
  destroyed: function destroyed() {
    this.$off();
  }
});
// CONCATENATED MODULE: ./packages/select/src/select-dropdown.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_select_dropdownvue_type_script_lang_js_ = (select_dropdownvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/select/src/select-dropdown.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_select_dropdownvue_type_script_lang_js_,
  select_dropdownvue_type_template_id_06828748_render,
  select_dropdownvue_type_template_id_06828748_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/select/src/select-dropdown.vue"
/* harmony default export */ var select_dropdown = (component.exports);
// EXTERNAL MODULE: ./packages/select/src/option.vue + 4 modules
var src_option = __webpack_require__(78);

// EXTERNAL MODULE: external "@/lib/tag"
var tag_ = __webpack_require__(46);
var tag_default = /*#__PURE__*/__webpack_require__.n(tag_);

// EXTERNAL MODULE: external "@/lib/scrollbar"
var scrollbar_ = __webpack_require__(15);
var scrollbar_default = /*#__PURE__*/__webpack_require__.n(scrollbar_);

// EXTERNAL MODULE: external "throttle-debounce"
var external_throttle_debounce_ = __webpack_require__(18);

// EXTERNAL MODULE: external "@/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(9);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// EXTERNAL MODULE: external "@/lib/utils/dom"
var dom_ = __webpack_require__(2);

// EXTERNAL MODULE: external "@/lib/utils/resize-event"
var resize_event_ = __webpack_require__(25);

// EXTERNAL MODULE: external "@/lib/locale"
var locale_ = __webpack_require__(6);

// EXTERNAL MODULE: external "@/lib/utils/scroll-into-view"
var scroll_into_view_ = __webpack_require__(38);
var scroll_into_view_default = /*#__PURE__*/__webpack_require__.n(scroll_into_view_);

// EXTERNAL MODULE: external "@/lib/utils/util"
var util_ = __webpack_require__(4);

// EXTERNAL MODULE: external "@/lib/mixins/focus"
var focus_ = __webpack_require__(37);
var focus_default = /*#__PURE__*/__webpack_require__.n(focus_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/select.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


// import Locale from '@/src/mixins/locale';





// import debounce from 'throttle-debounce/debounce';








// import { truncateSync } from 'fs';

var sizeMap = {
  'large': 42,
  'small': 30,
  'mini': 22
};

/* harmony default export */ var selectvue_type_script_lang_js_ = ({
  mixins: [emitter_default.a, focus_default()('reference')],

  name: 'ElSelect',
  xtype: 'YuSelect',

  inject: {
    elForm: {
      default: ''
    },

    elFormItem: {
      default: ''
    }
  },

  provide: function provide() {
    return {
      'select': this
    };
  },


  componentName: 'ElSelect',

  computed: {
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    showClose: function showClose() {
      var hasValue = this.multiple ? Array.isArray(this.value) && this.value.length > 0 : this.value !== undefined && this.value !== null && this.value !== '';
      var criteria = this.clearable && !this.selectDisabled && this.inputHovering && hasValue;
      return criteria;
    },
    selectValue: function selectValue() {
      if (this.multiple) {
        var value = [];
        for (var i = 0, l = this.selected.length; i < l; i++) {
          var item = this.selected[i];
          value.push(item.label);
        }
        return value.join(',');
      } else {
        return this.text; // 修复details模式下，数据字典不翻译的问题
        // return this.selectedLabel;
      }
    },
    iconClass: function iconClass() {
      var criteria = this.clearable && !this.disabled && this.inputHovering && !this.multiple && this.value !== undefined && this.value !== '';
      return criteria ? 'circle-close is-show-close' : this.remote && this.filterable ? '' : 'caret-top';
    },
    debounce: function debounce() {
      return this.remote ? 300 : 0;
    },
    emptyText: function emptyText() {
      if (this.loading) {
        return this.loadingText || Object(locale_["t"])('el.select.loading');
      } else {
        // if (this.remote && this.query === '' && this.options.length === 0) return false;
        if (this.filterable && this.options.length > 0 && this.filteredOptionsCount === 0) {
          return this.noMatchText || Object(locale_["t"])('el.select.noMatch');
        }
        if (this.options.length === 0) {
          return this.noDataText || Object(locale_["t"])('el.select.noData');
        }
      }
      return null;
    },
    showNewOption: function showNewOption() {
      var _this = this;

      var hasExistingOption = this.options.filter(function (option) {
        return !option.created;
      }).some(function (option) {
        return option.currentLabel === _this.query;
      });
      return this.filterable && this.allowCreate && this.query !== '' && !hasExistingOption;
    },
    selectSize: function selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    selectDisabled: function selectDisabled() {
      return this.disabled;
    },
    collapseTagSize: function collapseTagSize() {
      return ['small', 'mini'].indexOf(this.selectSize) > -1 ? 'mini' : 'small';
    }
  },

  components: {
    ElInput: input_default.a,
    ElSelectMenu: select_dropdown,
    ElOption: src_option["a" /* default */],
    ElTag: tag_default.a,
    ElScrollbar: scrollbar_default.a
  },

  directives: { Clickoutside: clickoutside_default.a },

  props: {
    text: String,
    name: String,
    value: {
      required: true
    },
    id: String,
    size: String,
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    lockHeight: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: function _default() {
        return Object(locale_["t"])('el.select.placeholder');
      }
    },
    defaultFirstOption: Boolean,
    valueType: {
      type: String,
      default: 'array'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    // 多选时，数据类型为字符串时的连接符
    separator: {
      type: String,
      default: ','
    },
    collapseTags: Boolean,
    autoComplete: {
      type: String,
      default: 'off'
    },
    reserveKeyword: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    // 是否为详情表单模式
    details: Boolean
  },

  data: function data() {
    return {
      options: [],
      cachedOptions: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      isSelect: true,
      inputLength: 20,
      inputWidth: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      optionsAllDisabled: false,
      inputHovering: false,
      currentPlaceholder: '',
      softFocus: false
    };
  },


  watch: {
    multiple: function multiple(val, oldVal) {
      if (oldVal === false) {
        this.selected = [];
      }
    },
    disabled: function disabled() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.resetInputHeight();
      });
    },
    placeholder: function placeholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },
    value: function value(val, oldVal) {
      // 避免xform初始化时执行change 事件
      if (oldVal === undefined && (val === '' || val === [])) {
        return;
      }
      if (this.multiple) {
        this.resetInputHeight();
        if (val && val.length > 0 || this.$refs.input && this.query !== '') {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
      }
      this.setSelected();
      if (this.filterable && !this.multiple) {
        this.inputLength = 20;
      }
      var opText = this.getSelectdText(val);
      this.$emit('change', val, opText);
      // 嵌套在xform中时会赋默认值，初始值时不希望触发校验
      if ((Array.isArray(val) && val.length === 0 || val === '') && oldVal === undefined || Array.isArray(val) && val.length === 0 && Array.isArray(oldVal) && oldVal.length === 0) {
        return;
      }
      this.dispatch('YuXtable', 'el.form.change');
      this.dispatch('ElFormItem', 'el.form.change', [val, opText]);
      this.dispatch('YuXformAbstractItem', 'el.form.change', [val, opText]);
    },
    query: function query(val) {
      var _this3 = this;

      if (val === null || val === undefined) return;
      this.$nextTick(function () {
        if (_this3.visible) _this3.broadcast('ElSelectDropdown', 'updatePopper');
      });
      this.hoverIndex = -1;
      if (this.multiple && this.filterable) {
        this.inputLength = this.$refs.input.value.length * 15 + 20;
        this.managePlaceholder();
        this.resetInputHeight();
      }
      if (this.remote && typeof this.remoteMethod === 'function') {
        if (val === '') this.options = [];
        this.hoverIndex = -1;
        this.remoteMethod(val);
        this.broadcast('ElOption', 'resetIndex');
      } else if (typeof this.filterMethod === 'function') {
        this.filterMethod(val);
        this.broadcast('ElOptionGroup', 'queryChange');
      } else {
        this.filteredOptionsCount = this.optionsCount;
        this.broadcast('ElOption', 'queryChange', val);
        this.broadcast('ElOptionGroup', 'queryChange');
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    },
    visible: function visible(val) {
      var _this4 = this;

      if (!val) {
        this.$refs.reference.$el.querySelector('input').blur();
        this.handleIconHide();
        this.broadcast('ElSelectDropdown', 'destroyPopper');
        if (this.$refs.input) {
          this.$refs.input.blur();
        }
        this.query = '';
        this.selectedLabel = '';
        this.inputLength = 20;
        this.resetHoverIndex();
        this.$nextTick(function () {
          if (_this4.$refs.input && _this4.$refs.input.value === '' && _this4.selected.length === 0) {
            _this4.currentPlaceholder = _this4.cachedPlaceHolder;
          }
        });
        if (!this.multiple) {
          if (this.selected) {
            if (this.filterable && this.allowCreate && this.createdSelected && this.createdOption) {
              this.selectedLabel = this.createdLabel;
            } else {
              this.selectedLabel = this.selected.currentLabel;
            }
            if (this.filterable) this.query = this.selectedLabel;
          }
        }
      } else {
        this.handleIconShow();
        this.resetInputWidth();
        this.broadcast('ElSelectDropdown', 'updatePopper');
        if (this.filterable) {
          this.query = this.selectedLabel;
          if (this.multiple) {
            this.$refs.input.focus();
          } else {
            if (!this.remote) {
              this.broadcast('ElOption', 'queryChange', '');
              this.broadcast('ElOptionGroup', 'queryChange');
            }
            this.broadcast('ElInput', 'inputSelect');
          }
        }
      }
      this.$emit('visible-change', val);
    },
    options: function options(val) {
      if (this.$isServer) return;
      this.optionsAllDisabled = val.length === val.filter(function (item) {
        return item.disabled === true;
      }).length;
      if (this.multiple) {
        this.resetInputHeight();
      }
      var inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected();
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    }
  },

  methods: {
    updatePopper: function updatePopper() {
      if (this.visible) {
        this.broadcast('ElSelectDropdown', 'updatePopper');
      }
    },
    handleClearClick: function handleClearClick(event) {
      this.deleteSelected(event);
    },
    getParent: function getParent(className) {
      var dom = this.$el.parentElement;
      var domClass = dom.getAttribute('class');
      while (!domClass || domClass.indexOf(className) === -1) {
        dom = dom.parentElement;
        if (dom === null) {
          return null;
        } else {
          domClass = dom.getAttribute('class');
        }
      }
      return dom;
    },

    // handleChange: function(val) {
    //   this.$emit('change', val);
    // },
    handleIconHide: function handleIconHide() {
      var icon = this.$el.querySelector('.el-input__icon');
      if (icon) {
        Object(dom_["removeClass"])(icon, 'is-reverse');
      }
    },
    handleIconShow: function handleIconShow() {
      var icon = this.$el.querySelector('.el-input__icon');
      if (icon && !Object(dom_["hasClass"])(icon, 'el-icon-circle-close')) {
        Object(dom_["addClass"])(icon, 'is-reverse');
      }
    },
    scrollToOption: function scrollToOption(option) {
      var target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      if (this.$refs.popper && target) {
        var menu = this.$refs.popper.$el.querySelector('.el-select-dropdown__wrap');
        scroll_into_view_default()(menu, target);
      }
    },
    handleMenuEnter: function handleMenuEnter() {
      var _this5 = this;

      this.$nextTick(function () {
        return _this5.scrollToOption(_this5.selected);
      });
    },
    getOption: function getOption(value) {
      var option = void 0;
      var isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      for (var i = this.cachedOptions.length - 1; i >= 0; i--) {
        var cachedOption = this.cachedOptions[i];
        var isEqual = isObject ? Object(util_["getValueByPath"])(cachedOption.value, this.valueKey) === Object(util_["getValueByPath"])(value, this.valueKey) : cachedOption.value === value;
        if (isEqual) {
          option = cachedOption;
          break;
        }
      }
      if (option) return option;
      var label = !isObject ? value : '';
      var newOption = {
        value: value,
        currentLabel: label
      };
      if (this.multiple) {
        newOption.hitState = false;
      }
      return newOption;
    },

    getSelectdText: function getSelectdText(val) {
      var op = this.getOption(val || this.value);
      return op ? op.label : '';
    },
    setSelected: function setSelected() {
      var _this6 = this;

      if (!this.multiple) {
        var option = this.getOption(this.value);
        if (option.created) {
          this.createdLabel = option.currentLabel;
          this.createdSelected = true;
        } else {
          this.createdSelected = false;
        }
        this.selectedLabel = option.currentLabel;
        this.selected = option;
        if (this.filterable) this.query = this.selectedLabel;
        return;
      }
      var result = [];
      var val;
      if (Array.isArray(this.value)) {
        val = this.value;
      } else {
        val = this.value === '' || this.value === undefined ? '' : this.value.split(this.separator);
      }
      if (Array.isArray(val)) {
        val.forEach(function (value) {
          result.push(_this6.getOption(value));
        });
      }
      this.selected = result;
      this.$nextTick(function () {
        _this6.resetInputHeight();
      });
    },
    handleFocus: function handleFocus(event) {
      if (this.selectedLabel && this.filterable) {
        // this.currentPlaceholder = this.selectedLabel; 解决placeholder会变成选项的问题。
        this.query = '';
        this.selectedLabel = '';
      }
      this.visible = true;
      this.$emit('focus', event);
    },
    handleBlur: function handleBlur(event) {
      this.$emit('blur', event);
    },
    handleIconCaret: function handleIconCaret(event) {
      this.toggleMenu();
    },
    blur: function blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },
    handleIconClick: function handleIconClick(event) {
      if (this.iconClass.indexOf('circle-close') > -1) {
        this.deleteSelected(event);
      } else {
        this.toggleMenu();
      }
    },
    handleMouseDown: function handleMouseDown(event) {
      if (event.target.tagName !== 'INPUT') return;
      if (this.visible) {
        this.handleClose();
        event.preventDefault();
      }
    },
    doDestroy: function doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
      this.dropdownUl = null;
    },
    handleClose: function handleClose() {
      this.visible = false;
    },
    toggleLastOptionHitState: function toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return;
      var option = this.selected[this.selected.length - 1];
      if (!option) return;

      if (hit === true || hit === false) {
        option.hitState = hit;
        return hit;
      }

      option.hitState = !option.hitState;
      return option.hitState;
    },
    deletePrevTag: function deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        var value = this.value.slice();
        value.pop();
        this.$emit('input', value);
      }
    },
    managePlaceholder: function managePlaceholder() {
      if (this.currentPlaceholder !== '') {
        this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
      }
    },
    resetInputState: function resetInputState(e) {
      if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
      this.inputLength = this.$refs.input.value.length * 15 + 20;
      this.resetInputHeight();
    },
    resetInputHeight: function resetInputHeight() {
      var _this7 = this;

      this.$nextTick(function () {
        if (!_this7.$refs.reference) return;
        // 由于调整input输入框在IE9上对齐兼容,在input组件上增加了一层div结构，导致childNodes获取的不是子对象
        // 新增方法,得到div子层元素
        // let inputChildNodes = this.$refs.reference.$el.childNodes;
        var inputChildNodes = _this7.getElInputChildNodes();
        var input = [].filter.call(inputChildNodes, function (item) {
          return item.tagName === 'INPUT';
        })[0];
        var tags = _this7.$refs.tags;
        if (input) {
          input.style.height = _this7.selected.length === 0 ? (sizeMap[_this7.selectSize] || 36) + 'px' : Math.max(tags ? tags.clientHeight + 6 : 0, sizeMap[_this7.size] || 36) + 'px';
        }
        if (_this7.visible && _this7.emptyText !== false) {
          _this7.broadcast('ElSelectDropdown', 'updatePopper');
        }
      });
    },

    // 获取子层节点
    getElInputChildNodes: function getElInputChildNodes() {
      var nodes = [];
      // forEach,可能和childNodes 返回值类型有关系 在郑州银行chrome 49 时 报错 liujie1 20191113
      // this.$refs.reference.$el.childNodes.forEach(item => {
      //   if (item.childNodes && item.childNodes.length > 0) {
      //     nodes = nodes.concat(Array.prototype.slice.call(item.childNodes, 0));
      //   }
      // });
      // 20191123 由于zhangkun 在input.vue中增加了外部div，所以原取组件的层级发生变化。顾重新调整取childNodes[0].children（使用场景为下拉多选换行时）
      // 20200408 优化逻辑 by luyq1
      var childs = this.$refs.reference.$el.childNodes[0].children;
      for (var i = 0, len = childs.length; i < len; i++) {
        var item = childs[i];
        if (item.childNodes && item.childNodes.length > 0) {
          nodes = nodes.concat(Array.prototype.slice.call(item.childNodes, 0));
        }
      }
      return nodes;
    },
    resetHoverIndex: function resetHoverIndex() {
      var _this8 = this;

      setTimeout(function () {
        if (!_this8.multiple) {
          _this8.hoverIndex = _this8.options.indexOf(_this8.selected);
        } else {
          if (_this8.selected.length > 0) {
            _this8.hoverIndex = Math.min.apply(null, _this8.selected.map(function (item) {
              return _this8.options.indexOf(item);
            }));
          } else {
            _this8.hoverIndex = -1;
          }
        }
      }, 300);
    },

    setValue: function setValue(val, option) {
      var value = val;
      var optionIndex = this.getValueIndex(value, option.value);
      if (optionIndex > -1) {
        value.splice(optionIndex, 1);
      } else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
        value.push(option.value);
      }
      return value;
    },
    handleOptionSelect: function handleOptionSelect(option) {
      var _this9 = this;

      if (this.multiple) {
        this.selectedLabel = '';
        var value = [];
        // 单选切换为复选时做处理
        if (this.valueType === 'array') {
          typeof this.value === 'string' ? value.push(this.value) : value = this.value.slice();
          var val = this.setValue(value, option);
          this.$emit('input', val);
        } else if (this.valueType === 'string') {
          if (this.value === '') {
            value = [];
          } else {
            // 20191128 xform 高级功能 ，重置后 this.value 获取到的是undefined, 顾增加判断 liujie1
            value = typeof this.value === 'string' ? this.value.split(this.separator) : this.value === undefined ? [] : this.value;
          }
          var val1 = this.setValue(value, option);
          this.$emit('input', val1.join(this.separator));
        }
        if (option.created) {
          this.query = '';
          this.inputLength = 20;
        }
        if (this.filterable) this.$refs.input.focus();
      } else {
        this.$emit('input', option.value);
        this.visible = false;
      }
      this.$nextTick(function () {
        return _this9.scrollToOption(option);
      });
    },
    getValueIndex: function getValueIndex() {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var value = arguments[1];

      var isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      if (!isObject) {
        return arr.indexOf(value);
      } else {
        var valueKey = this.valueKey;
        var index = -1;
        arr.some(function (item, i) {
          if (Object(util_["getValueByPath"])(item, valueKey) === Object(util_["getValueByPath"])(value, valueKey)) {
            index = i;
            return true;
          }
          return false;
        });
        return index;
      }
    },
    toggleMenu: function toggleMenu() {
      if (this.filterable && this.query === '' && this.visible) {
        return;
      }
      if (!this.disabled) {
        this.visible = !this.visible;
      }
      if (this.visible) {
        (this.$refs.input || this.$refs.reference).focus();
      }
    },
    navigateOptions: function navigateOptions(direction) {
      var _this10 = this;

      if (!this.visible) {
        this.visible = true;
        return;
      }
      if (this.options.length === 0 || this.filteredOptionsCount === 0) return;
      this.optionsAllDisabled = this.options.length === this.options.filter(function (item) {
        return item.disabled === true;
      }).length;
      if (!this.optionsAllDisabled) {
        if (direction === 'next') {
          this.hoverIndex++;
          if (this.hoverIndex === this.options.length) {
            this.hoverIndex = 0;
          }
          if (this.options[this.hoverIndex].disabled === true || this.options[this.hoverIndex].groupDisabled === true || !this.options[this.hoverIndex].visible) {
            this.navigateOptions('next');
          }
        }
        if (direction === 'prev') {
          this.hoverIndex--;
          if (this.hoverIndex < 0) {
            this.hoverIndex = this.options.length - 1;
          }
          if (this.options[this.hoverIndex].disabled === true || this.options[this.hoverIndex].groupDisabled === true || !this.options[this.hoverIndex].visible) {
            this.navigateOptions('prev');
          }
        }
      }
      this.$nextTick(function () {
        return _this10.scrollToOption(_this10.options[_this10.hoverIndex]);
      });
    },
    selectOption: function selectOption() {
      if (this.options[this.hoverIndex]) {
        this.handleOptionSelect(this.options[this.hoverIndex]);
      }
    },
    deleteSelected: function deleteSelected(event) {
      event.stopPropagation();
      var deleteVal = this.multiple ? [] : '';
      this.$emit('input', deleteVal);
      this.visible = false;
      this.$emit('clear');
    },
    deleteTag: function deleteTag(event, tag) {
      var index = this.selected.indexOf(tag);
      if (index > -1 && !this.disabled) {
        var value = Array.isArray(this.value) ? this.value.slice() : this.value.split(this.separator);
        value.splice(index, 1);
        this.valueType === 'array' ? this.$emit('input', value) : this.$emit('input', value.join(this.separator));
        this.$emit('remove-tag', tag);
      }
      event.stopPropagation();
    },
    onInputChange: function onInputChange() {
      if (this.filterable) {
        this.query = this.selectedLabel;
      }
    },
    onOptionDestroy: function onOptionDestroy(option) {
      this.optionsCount--;
      this.filteredOptionsCount--;
      var index = this.options.indexOf(option);
      if (index > -1) {
        this.options.splice(index, 1);
      }
      this.broadcast('ElOption', 'resetIndex');
    },
    resetInputWidth: function resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
      this.$refs.popper.minWidth = this.inputWidth + 'px';
    },
    handleResize: function handleResize() {
      if (!this.details) {
        this.resetInputWidth();
        if (this.multiple) this.resetInputHeight();
      }
    },
    checkDefaultFirstOption: function checkDefaultFirstOption() {
      this.hoverIndex = -1;
      for (var i = 0; i !== this.options.length; ++i) {
        var option = this.options[i];
        if (this.query) {
          // pick first options that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible) {
            this.hoverIndex = i;
            break;
          }
        } else {
          // pick currently selected option
          if (option.itemSelected) {
            this.hoverIndex = i;
            break;
          }
        }
      }
    },
    getValueKey: function getValueKey(item) {
      if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
        return item.value;
      } else {
        return Object(util_["getValueByPath"])(item.value, this.valueKey);
      }
    }
  },

  created: function created() {
    var _this11 = this;

    this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;
    if (this.multiple && !this.value && this.valueType === 'string') {
      this.$emit('input', '');
    } else if (this.multiple && !this.value && this.valueType === 'array') {
      this.$emit('input', []);
    }
    if (!this.multiple && !this.value && Array.isArray(this.value)) {
      this.$emit('input', '');
    }

    this.debouncedOnInputChange = Object(external_throttle_debounce_["debounce"])(this.debounce, function () {
      _this11.onInputChange();
    });

    this.$on('handleOptionClick', this.handleOptionSelect);
    // this.$on('onOptionDestroy', this.onOptionDestroy);
    this.$on('setSelected', this.setSelected);
  },
  mounted: function mounted() {
    var _this12 = this;

    // 兼容平台router.to方式，弹出框中的下拉框位置不变动问题
    this.dom = this.getParent('el-dialog__wrapper');
    this.dom1 = this.getParent('el-dialog-x__wrapper');
    if (this.dom) {
      this.dom.addEventListener('scroll', Object(external_throttle_debounce_["debounce"])(200, this.updatePopper));
    }
    if (this.dom1) {
      this.dom1.addEventListener('scroll', Object(external_throttle_debounce_["debounce"])(200, this.updatePopper));
    }
    if (this.value && this.value !== []) {
      this.$nextTick(function () {
        _this12.$emit('change', _this12.value);
      });
    }
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = '';
    }
    Object(resize_event_["addResizeListener"])(this.$el, this.handleResize);
    if (this.remote && this.multiple) {
      this.resetInputHeight();
    }
    this.$nextTick(function () {
      if (_this12.$refs.reference && _this12.$refs.reference.$el) {
        _this12.inputWidth = _this12.$refs.reference.$el.getBoundingClientRect().width;
      }
    });
    this.setSelected();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el && this.handleResize) Object(resize_event_["removeResizeListener"])(this.$el, this.handleResize);
    if (this.dom) this.dom.removeEventListener('scroll', Object(external_throttle_debounce_["debounce"])(200, this.updatePopper));
    if (this.dom1) this.dom1.removeEventListener('scroll', Object(external_throttle_debounce_["debounce"])(200, this.updatePopper));
  },
  destroyed: function destroyed() {
    this.$off();
  }
});
// CONCATENATED MODULE: ./packages/select/src/select.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_selectvue_type_script_lang_js_ = (selectvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/select/src/select.vue





/* normalize component */

var select_component = Object(componentNormalizer["a" /* default */])(
  src_selectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var select_api; }
select_component.options.__file = "packages/select/src/select.vue"
/* harmony default export */ var src_select = (select_component.exports);
// CONCATENATED MODULE: ./packages/select/index.js


/* istanbul ignore next */
src_select.install = function (Vue) {
  Vue.component(src_select.name, src_select);
};

/* harmony default export */ var packages_select = __webpack_exports__["default"] = (src_select);

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = require("throttle-debounce");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/dom");

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/resize-event");

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/focus");

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/scroll-into-view");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/util");

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = require("@/lib/tag");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/vue-popper");

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/option.vue?vue&type=template&id=7a44c642&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "li",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.visible,
          expression: "visible"
        }
      ],
      staticClass: "el-select-dropdown__item",
      class: {
        selected: _vm.itemSelected,
        "is-disabled": _vm.disabled || _vm.groupDisabled || _vm.limitReached,
        hover: _vm.parent.hoverIndex === _vm.index
      },
      on: {
        mouseenter: _vm.hoverItem,
        click: function($event) {
          $event.stopPropagation()
          return _vm.selectOptionClick($event)
        }
      }
    },
    [
      _vm._t("default", [
        _c("span", { domProps: { innerHTML: _vm._s(_vm.highlightText) } })
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/select/src/option.vue?vue&type=template&id=7a44c642&

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "@/lib/utils/util"
var util_ = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/select/src/option.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
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
  mixins: [emitter_default.a],

  name: 'ElOption',
  xtype: 'YuOption',

  componentName: 'ElOption',

  props: {
    value: {
      required: true
    },
    label: [String, Number],
    created: Boolean,
    highlight: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      keyWord: ''
    };
  },


  computed: {
    isObject: function isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
    },
    currentLabel: function currentLabel() {
      return this.label || (this.isObject ? '' : this.value);
    },
    currentValue: function currentValue() {
      return this.value || this.label || '';
    },
    highlightText: function highlightText() {
      var textStr = this.currentLabel;
      if (this.keyWord && this.highlight) {
        var keyWord = this.keyWord.replace(/\[/g, '[[]');
        keyWord = keyWord.replace(/\]/g, '[]]');
        keyWord = keyWord.replace(/\(/g, '[(]');
        keyWord = keyWord.replace(/\)/g, '[)]');
        var replaceReg = new RegExp(keyWord, 'g');
        var replaceStr = '<span class="key-word">' + this.keyWord + '</span>';
        textStr = textStr.replace(replaceReg, replaceStr);
      }
      return textStr;
    },
    parent: function parent() {
      var result = this.$parent;
      while (!result.isSelect) {
        result = result.$parent;
      }
      return result;
    },
    itemSelected: function itemSelected() {
      if (!this.parent.multiple) {
        return this.isEqual(this.value, this.parent.value);
      } else {
        return this.contains(this.parent.value, this.value);
      }
    },
    limitReached: function limitReached() {
      this.$nextTick(function () {
        if (this.parent.multiple) {
          return !this.itemSelected && this.parent.value.length >= this.parent.multipleLimit && this.parent.multipleLimit > 0;
        } else {
          return false;
        }
      });
    }
  },

  watch: {
    currentLabel: function currentLabel() {
      if (!this.created && !this.parent.remote) this.dispatch('ElSelect', 'setSelected');
    },
    value: function value() {
      if (!this.created && !this.parent.remote) this.dispatch('ElSelect', 'setSelected');
    }
  },

  created: function created() {
    this.parent.options.push(this);
    this.parent.cachedOptions.push(this);
    this.parent.optionsCount++;
    this.parent.filteredOptionsCount++;
    this.index = this.parent.options.indexOf(this);

    this.$on('queryChange', this.queryChange);
    this.$on('handleGroupDisabled', this.handleGroupDisabled);
    this.$on('resetIndex', this.resetIndex);
  },
  destroyed: function destroyed() {
    this.$off();
  },


  methods: {
    isEqual: function isEqual(a, b) {
      if (!this.isObject) {
        return a === b;
      } else {
        var valueKey = this.parent.valueKey;
        return Object(util_["getValueByPath"])(a, valueKey) === Object(util_["getValueByPath"])(b, valueKey);
      }
    },
    contains: function contains() {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var target = arguments[1];

      if (!this.isObject) {
        return arr.indexOf(target) > -1;
      } else {
        var valueKey = this.parent.valueKey;
        return arr.some(function (item) {
          return Object(util_["getValueByPath"])(item, valueKey) === Object(util_["getValueByPath"])(target, valueKey);
        });
      }
    },
    handleGroupDisabled: function handleGroupDisabled(val) {
      this.groupDisabled = val;
    },
    hoverItem: function hoverItem() {
      if (!this.disabled && !this.groupDisabled) {
        this.parent.hoverIndex = this.parent.options.indexOf(this);
      }
    },
    selectOptionClick: function selectOptionClick() {
      if (this.disabled !== true && this.groupDisabled !== true) {
        this.dispatch('ElSelect', 'handleOptionClick', this);
      }
    },
    queryChange: function queryChange(query) {
      // query 里如果有正则中的特殊字符，需要先将这些字符转义
      this.keyWord = query;
      var parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
      this.visible = new RegExp(parsedQuery, 'i').test(this.currentLabel) || this.created;
      if (!this.visible) {
        this.parent.filteredOptionsCount--;
      }
    },
    resetIndex: function resetIndex() {
      var _this = this;

      this.$nextTick(function () {
        _this.index = _this.parent.options.indexOf(_this);
      });
    }
  },

  beforeDestroy: function beforeDestroy() {
    var _parent = this.parent,
        selected = _parent.selected,
        multiple = _parent.multiple;

    var selectedOptions = multiple ? selected : [selected];
    var index = this.parent.cachedOptions.indexOf(this);
    var selectedIndex = selectedOptions.indexOf(this);

    // if option is not selected, remove it from cache
    if (index > -1 && selectedIndex < 0) {
      this.parent.cachedOptions.splice(index, 1);
    }
    if (this.parent.visible) {
      this.parent.onOptionDestroy(this.parent.options.indexOf(this));
    }
  }
});
// CONCATENATED MODULE: ./packages/select/src/option.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_optionvue_type_script_lang_js_ = (optionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/select/src/option.vue





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
component.options.__file = "packages/select/src/option.vue"
/* harmony default export */ var src_option = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/clickoutside");

/***/ })

/******/ });