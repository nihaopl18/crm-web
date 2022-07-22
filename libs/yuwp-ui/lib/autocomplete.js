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
/******/ 	return __webpack_require__(__webpack_require__.s = 152);
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

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/autocomplete/src/autocomplete.vue?vue&type=template&id=152f2ee6&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "clickoutside",
          rawName: "v-clickoutside",
          value: _vm.close,
          expression: "close"
        }
      ],
      staticClass: "el-autocomplete"
    },
    [
      _c(
        "el-input",
        _vm._b(
          {
            ref: "input",
            on: { change: _vm.handleChange, focus: _vm.handleFocus },
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
                  return _vm.highlight(_vm.highlightedIndex - 1)
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
                  return _vm.highlight(_vm.highlightedIndex + 1)
                },
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  return _vm.handleKeyEnter($event)
                },
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                  ) {
                    return null
                  }
                  return _vm.close($event)
                }
              ]
            }
          },
          "el-input",
          _vm.$props,
          false
        ),
        [
          _vm.$slots.prepend
            ? _c("template", { slot: "prepend" }, [_vm._t("prepend")], 2)
            : _vm._e(),
          _vm.$slots.append
            ? _c("template", { slot: "append" }, [_vm._t("append")], 2)
            : _vm._e(),
          _vm.$slots.prefix
            ? _c("template", { slot: "prefix" }, [_vm._t("prefix")], 2)
            : _vm._e(),
          _vm.$slots.suffix
            ? _c("template", { slot: "suffix" }, [_vm._t("suffix")], 2)
            : _vm._e()
        ],
        2
      ),
      _c("el-autocomplete-suggestions", {
        ref: "suggestions",
        class: [_vm.popperClass ? _vm.popperClass : ""],
        attrs: { props: _vm.props, suggestions: _vm.suggestions }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/autocomplete/src/autocomplete.vue?vue&type=template&id=152f2ee6&

// EXTERNAL MODULE: external "@/lib/input"
var input_ = __webpack_require__(10);
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// EXTERNAL MODULE: external "@/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(9);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/autocomplete/src/autocomplete-suggestions.vue?vue&type=template&id=cd10dcf0&
var autocomplete_suggestionsvue_type_template_id_cd10dcf0_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    { attrs: { name: "el-zoom-in-top" }, on: { "after-leave": _vm.doDestroy } },
    [
      _c(
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
          staticClass: "el-autocomplete-suggestion",
          class: { "is-loading": _vm.parent.loading },
          style: { width: _vm.dropdownWidth }
        },
        [
          _c(
            "el-scrollbar",
            {
              attrs: {
                tag: "ul",
                "wrap-class": "el-autocomplete-suggestion__wrap",
                "view-class": "el-autocomplete-suggestion__list"
              }
            },
            [
              _vm.parent.loading
                ? _c("li", [_c("i", { staticClass: "el-icon-loading" })])
                : _vm._l(_vm.suggestions, function(item, index) {
                    return [
                      !_vm.parent.customItem
                        ? _c(
                            "li",
                            {
                              key: "suggestions_" + index,
                              class: {
                                highlighted:
                                  _vm.parent.highlightedIndex === index
                              },
                              on: {
                                click: function($event) {
                                  return _vm.select(item)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n          " +
                                  _vm._s(item[_vm.props.label]) +
                                  "\n        "
                              )
                            ]
                          )
                        : _c(_vm.parent.customItem, {
                            key: index,
                            tag: "component",
                            class: {
                              highlighted: _vm.parent.highlightedIndex === index
                            },
                            attrs: { item: item, index: index },
                            on: {
                              click: function($event) {
                                return _vm.select(item)
                              }
                            }
                          })
                    ]
                  })
            ],
            2
          )
        ],
        1
      )
    ]
  )
}
var autocomplete_suggestionsvue_type_template_id_cd10dcf0_staticRenderFns = []
autocomplete_suggestionsvue_type_template_id_cd10dcf0_render._withStripped = true


// CONCATENATED MODULE: ./packages/autocomplete/src/autocomplete-suggestions.vue?vue&type=template&id=cd10dcf0&

// EXTERNAL MODULE: external "@/lib/utils/vue-popper"
var vue_popper_ = __webpack_require__(7);
var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "@/lib/scrollbar"
var scrollbar_ = __webpack_require__(15);
var scrollbar_default = /*#__PURE__*/__webpack_require__.n(scrollbar_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/autocomplete/src/autocomplete-suggestions.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var autocomplete_suggestionsvue_type_script_lang_js_ = ({
  components: { ElScrollbar: scrollbar_default.a },
  mixins: [vue_popper_default.a, emitter_default.a],

  componentName: 'ElAutocompleteSuggestions',

  data: function data() {
    return {
      parent: this.$parent,
      dropdownWidth: ''
    };
  },


  props: {
    props: Object,
    suggestions: Array,
    options: {
      default: function _default() {
        return {
          gpuAcceleration: false
        };
      }
    }
  },

  methods: {
    select: function select(item) {
      this.dispatch('ElAutocomplete', 'item-click', item);
    }
  },

  updated: function updated() {
    var _this = this;

    this.$nextTick(function () {
      _this.updatePopper();
    });
  },
  mounted: function mounted() {
    this.$parent.popperElm = this.popperElm = this.$el;
    this.referenceElm = this.$parent.$refs.input.$refs.input;
  },
  destroyed: function destroyed() {
    this.$off();
  },
  created: function created() {
    var _this2 = this;

    this.$on('visible', function (val, inputWidth) {
      _this2.dropdownWidth = inputWidth + 'px';
      _this2.showPopper = val;
    });
  }
});
// CONCATENATED MODULE: ./packages/autocomplete/src/autocomplete-suggestions.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_autocomplete_suggestionsvue_type_script_lang_js_ = (autocomplete_suggestionsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/autocomplete/src/autocomplete-suggestions.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_autocomplete_suggestionsvue_type_script_lang_js_,
  autocomplete_suggestionsvue_type_template_id_cd10dcf0_render,
  autocomplete_suggestionsvue_type_template_id_cd10dcf0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/autocomplete/src/autocomplete-suggestions.vue"
/* harmony default export */ var autocomplete_suggestions = (component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/autocomplete/src/autocomplete.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var autocompletevue_type_script_lang_js_ = ({
  name: 'ElAutocomplete',
  xtype: 'YuAutocomplete',

  mixins: [emitter_default.a, locale_default.a],

  componentName: 'ElAutocomplete',

  components: {
    ElInput: input_default.a,
    ElAutocompleteSuggestions: autocomplete_suggestions
  },

  directives: { Clickoutside: clickoutside_default.a },

  props: {
    props: {
      type: Object,
      default: function _default() {
        return {
          label: 'value',
          value: 'value'
        };
      }
    },
    popperClass: String,
    placeholder: String,
    disabled: Boolean,
    name: String,
    size: String,
    value: String,
    autofocus: Boolean,
    fetchSuggestions: Function,
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    customItem: String,
    icon: String,
    onIconClick: Function,
    selectWhenUnmatched: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      activated: false,
      isOnComposition: false,
      suggestions: [],
      loading: false,
      highlightedIndex: -1
    };
  },

  computed: {
    suggestionVisible: function suggestionVisible() {
      var suggestions = this.suggestions;
      var isValidData = Array.isArray(suggestions) && suggestions.length > 0;
      return (isValidData || this.loading) && this.activated;
    }
  },
  watch: {
    suggestionVisible: function suggestionVisible(val) {
      this.broadcast('ElAutocompleteSuggestions', 'visible', [val, this.$refs.input.$refs.input.offsetWidth]);
    }
  },
  methods: {
    getData: function getData(queryString) {
      var _this = this;

      this.loading = true;
      this.fetchSuggestions(queryString, function (suggestions) {
        _this.loading = false;
        if (Array.isArray(suggestions)) {
          _this.suggestions = suggestions;
        } else {
          console.error(_this.t('el.autocomplete.getDataError'));
        }
      });
    },
    handleComposition: function handleComposition(event) {
      if (event.type === 'compositionend') {
        this.isOnComposition = false;
        this.handleChange(event.target.value);
      } else {
        this.isOnComposition = true;
      }
    },
    handleChange: function handleChange(value) {
      this.$emit('input', value);
      if (this.isOnComposition || !this.triggerOnFocus && !value) {
        this.suggestions = [];
        return;
      }
      this.getData(value);
    },
    handleFocus: function handleFocus() {
      this.activated = true;
      if (this.triggerOnFocus) {
        this.getData(this.value);
      }
    },
    close: function close(e) {
      this.activated = false;
    },
    handleKeyEnter: function handleKeyEnter(e) {
      var _this2 = this;

      if (this.suggestionVisible && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
        e.preventDefault();
        this.select(this.suggestions[this.highlightedIndex]);
      } else if (this.selectWhenUnmatched) {
        this.$emit('select', { value: this.value });
        this.$nextTick(function () {
          _this2.suggestions = [];
          _this2.highlightedIndex = -1;
        });
      }
    },
    select: function select(item) {
      var _this3 = this;

      this.$emit('input', item[this.props.value]);
      this.$emit('select', item);
      this.$nextTick(function () {
        _this3.suggestions = [];
        _this3.highlightedIndex = -1;
      });
    },
    highlight: function highlight(index) {
      if (!this.suggestionVisible || this.loading) {
        return;
      }
      if (index < 0) {
        this.highlightedIndex = -1;
        return;
      }
      if (index >= this.suggestions.length) {
        index = this.suggestions.length - 1;
      }
      var suggestion = this.$refs.suggestions.$el.querySelector('.el-autocomplete-suggestion__wrap');
      var suggestionList = suggestion.querySelectorAll('.el-autocomplete-suggestion__list li');

      var highlightItem = suggestionList[index];
      var scrollTop = suggestion.scrollTop;
      var offsetTop = highlightItem.offsetTop;

      if (offsetTop + highlightItem.scrollHeight > scrollTop + suggestion.clientHeight) {
        suggestion.scrollTop += highlightItem.scrollHeight;
      }
      if (offsetTop < scrollTop) {
        suggestion.scrollTop -= highlightItem.scrollHeight;
      }

      this.highlightedIndex = index;
    }
  },
  mounted: function mounted() {
    var _this4 = this;

    this.$on('item-click', function (item) {
      _this4.select(item);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.suggestions.$destroy();
  },
  destroyed: function destroyed() {
    this.$off();
  }
});
// CONCATENATED MODULE: ./packages/autocomplete/src/autocomplete.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_autocompletevue_type_script_lang_js_ = (autocompletevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/autocomplete/src/autocomplete.vue





/* normalize component */

var autocomplete_component = Object(componentNormalizer["a" /* default */])(
  src_autocompletevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var autocomplete_api; }
autocomplete_component.options.__file = "packages/autocomplete/src/autocomplete.vue"
/* harmony default export */ var autocomplete = (autocomplete_component.exports);
// CONCATENATED MODULE: ./packages/autocomplete/index.js


/* istanbul ignore next */
autocomplete.install = function (Vue) {
  Vue.component(autocomplete.name, autocomplete);
};

/* harmony default export */ var packages_autocomplete = __webpack_exports__["default"] = (autocomplete);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/vue-popper");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/clickoutside");

/***/ })

/******/ });