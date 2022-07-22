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
/******/ 	return __webpack_require__(__webpack_require__.s = 193);
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

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/anchor/src/anchor.vue?vue&type=template&id=7d28e046&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    _vm.wrapperComponent,
    {
      tag: "component",
      attrs: { "offset-top": _vm.offsetTop, "offset-bottom": _vm.offsetBottom },
      on: { "on-change": _vm.handleAffixStateChange }
    },
    [
      _c("div", { class: _vm.prefix + "__wrapper", style: _vm.wrapperStyle }, [
        _c(
          "div",
          { class: "" + _vm.prefix },
          [
            _c("div", { class: _vm.prefix + "__ink" }, [
              _c("span", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.showInk && !_vm.fillFullInk,
                    expression: "showInk && !fillFullInk"
                  }
                ],
                class: _vm.prefix + "__ink__ball",
                style: { top: _vm.inkTop + "px" }
              })
            ]),
            _vm._t("default")
          ],
          2
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/anchor/src/anchor.vue?vue&type=template&id=7d28e046&

// EXTERNAL MODULE: external "@/lib/utils/assist"
var assist_ = __webpack_require__(82);

// EXTERNAL MODULE: external "@/lib/utils/dom"
var dom_ = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/anchor/src/anchor.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var anchorvue_type_script_lang_js_ = ({
  name: 'ElAnchor',
  xtype: 'YuAnchor',
  provide: function provide() {
    return {
      anchorCom: this
    };
  },
  data: function data() {
    return {
      prefix: 'el-anchor',
      isAffixed: false, // current affixed state
      inkTop: 0,
      animating: false, // if is scrolling now
      currentLink: '', // current show link =>  #href -> currentLink = #href
      currentId: '', // current show title id =>  #href -> currentId = href
      scrollContainer: null,
      scrollElement: null,
      titlesOffsetArr: [],
      wrapperTop: 0,
      upperFirstTitle: true
    };
  },

  props: {
    affix: {
      type: Boolean,
      default: true
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: Number,
    bounds: {
      type: Number,
      default: 5
    },
    // container: [String, HTMLElement],  // HTMLElement 在 SSR 下不支持
    container: null,
    showInk: {
      type: Boolean,
      default: false
    },
    fillFullInk: Boolean,
    scrollOffset: {
      type: Number,
      default: 0
    },
    activeRoute: String
  },
  computed: {
    wrapperComponent: function wrapperComponent() {
      return this.affix ? 'YuAffix' : 'div';
    },
    wrapperStyle: function wrapperStyle() {
      return {
        maxHeight: this.offsetTop ? 'calc(100vh - ' + this.offsetTop + 'px)' : '100vh'
      };
    },
    containerIsWindow: function containerIsWindow() {
      return this.scrollContainer === window;
    }
  },
  methods: {
    handleAffixStateChange: function handleAffixStateChange(state) {
      this.isAffixed = this.affix && state;
    },
    handleScroll: function handleScroll(e) {
      this.upperFirstTitle = e.target.scrollTop < this.titlesOffsetArr[0].offset;
      if (this.animating) return;
      this.updateTitleOffset();
      var scrollTop = e.target.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
      this.getCurrentScrollAtTitleId(scrollTop);
    },

    // handleHashChange() {
    //   const url = window.location.href;
    //   const sharpLinkMatch = sharpMatcherRegx.exec(url);
    //   if (!sharpLinkMatch) return;
    //   this.currentLink = sharpLinkMatch[0];
    //   this.currentId = sharpLinkMatch[1];
    // },
    handleScrollTo: function handleScrollTo() {
      var _this = this;

      // const anchor = document.getElementById(this.currentId);
      var anchor = this.currentId !== '' ? this.scrollElement.querySelector('#' + this.currentId) : null;
      var currentLinkElementA = this.$el.querySelector('span[data-route=\'' + this.currentLink + '\']');
      var offset = this.scrollOffset;
      if (currentLinkElementA) {
        offset = parseFloat(currentLinkElementA.getAttribute('data-scroll-offset'));
      }

      if (!anchor) return;
      var offsetTop = anchor.offsetTop - this.wrapperTop - offset;
      this.animating = true;
      Object(assist_["scrollTop"])(this.scrollContainer, this.scrollElement.scrollTop, offsetTop, 600, function () {
        _this.animating = false;
      });
      this.handleSetInkTop();
    },
    handleSetInkTop: function handleSetInkTop() {
      var currentLinkElementA = this.$el.querySelector('span[data-route=\'' + this.currentLink + '\']');
      if (!currentLinkElementA) return;
      var elementATop = currentLinkElementA.offsetTop;
      var top = elementATop < 0 ? this.offsetTop : elementATop;
      this.inkTop = top;
    },
    updateTitleOffset: function updateTitleOffset() {
      var _this2 = this;

      var links = Object(assist_["findComponentsDownward"])(this, 'ElAnchorLink').map(function (link) {
        return link.route;
      });
      var idArr = links.map(function (link) {
        return link.split('#')[1];
      });
      var offsetArr = [];
      idArr.forEach(function (id) {
        // const titleEle = document.getElementById(id);
        var titleEle = _this2.scrollElement.querySelector('#' + id);
        if (titleEle) {
          offsetArr.push({
            link: '#' + id,
            offset: titleEle.offsetTop - _this2.scrollElement.offsetTop
          });
        }
      });
      this.titlesOffsetArr = offsetArr;
    },
    getCurrentScrollAtTitleId: function getCurrentScrollAtTitleId(scrollTop) {
      var i = -1;
      var len = this.titlesOffsetArr.length;
      var titleItem = {
        link: '#',
        offset: 0
      };
      scrollTop += this.bounds;
      while (++i < len) {
        var currentEle = this.titlesOffsetArr[i];
        var nextEle = this.titlesOffsetArr[i + 1];
        if (scrollTop >= currentEle.offset && scrollTop < (nextEle && nextEle.offset || Infinity)) {
          titleItem = this.titlesOffsetArr[i];
          break;
        }
      }
      this.currentLink = titleItem.link;
      this.handleSetInkTop();
    },
    getContainer: function getContainer() {
      this.scrollContainer = this.container ? typeof this.container === 'string' ? document.querySelector(this.container) : this.container : window;
      this.scrollElement = this.container ? this.scrollContainer : document.documentElement || document.body;
    },
    removeListener: function removeListener() {
      Object(dom_["off"])(this.scrollContainer, 'scroll', this.handleScroll);
      // off(window, 'hashchange', this.handleHashChange);
    },
    init: function init() {
      var _this3 = this;

      // const anchorLink = findComponentDownward(this, 'AnchorLink');
      // this.handleHashChange();
      this.$nextTick(function () {
        _this3.removeListener();
        _this3.getContainer();
        try {
          _this3.wrapperTop = _this3.containerIsWindow ? 0 : _this3.scrollElement.offsetTop;
        } catch (e) {
          throw new Error('Invalid container, can not find the element');
        }
        _this3.handleScrollTo();
        _this3.handleSetInkTop();
        _this3.updateTitleOffset();
        if (_this3.titlesOffsetArr[0]) {
          _this3.upperFirstTitle = _this3.scrollElement.scrollTop < _this3.titlesOffsetArr[0].offset;
        }
        Object(dom_["on"])(_this3.scrollContainer, 'scroll', _this3.handleScroll);
        // on(window, 'hashchange', this.handleHashChange);
      });
    }
  },
  watch: {
    // $route() {
    //   this.handleHashChange();
    //   this.$nextTick(() => {
    //     this.handleScrollTo();
    //   });
    // },
    container: function container() {
      this.init();
    },
    currentLink: function currentLink(newHref, oldHref) {
      this.$emit('on-change', newHref, oldHref);
    }
  },
  mounted: function mounted() {
    if (this.activeRoute) {
      var sharpLinkMatch = assist_["sharpMatcherRegx"].exec(this.activeRoute);
      this.currentLink = sharpLinkMatch[0];
      this.currentId = sharpLinkMatch[1];
    }
    this.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.removeListener();
    // this.$watch('$route', (newVal, oldVal) => {})();
  }
});
// CONCATENATED MODULE: ./packages/anchor/src/anchor.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_anchorvue_type_script_lang_js_ = (anchorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/anchor/src/anchor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_anchorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/anchor/src/anchor.vue"
/* harmony default export */ var src_anchor = (component.exports);
// CONCATENATED MODULE: ./packages/anchor/index.js


/* istanbul ignore next */
src_anchor.install = function (Vue) {
  Vue.component(src_anchor.name, src_anchor);
};

/* harmony default export */ var packages_anchor = __webpack_exports__["default"] = (src_anchor);

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/dom");

/***/ }),

/***/ 82:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/assist");

/***/ })

/******/ });