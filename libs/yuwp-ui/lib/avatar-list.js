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
/******/ 	return __webpack_require__(__webpack_require__.s = 189);
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

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/avatar-list/src/main.vue?vue&type=template&id=4a8418b6&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "el-avatar-list" },
    [
      _vm._t("default", [
        _vm._l(_vm.avatarList, function(item, index) {
          return index < _vm.max && item.content
            ? _c(
                "yu-tooltip",
                {
                  key: "avatarList_" + index,
                  attrs: { placement: "top", content: item.content }
                },
                [
                  _c("el-avatar", {
                    attrs: {
                      src: item.src,
                      size: item.size || _vm.size,
                      shape: _vm.shape
                    }
                  })
                ],
                1
              )
            : index < _vm.max && !item.content
            ? _c("el-avatar", {
                attrs: {
                  src: item.src,
                  size: item.size || _vm.size,
                  shape: _vm.shape
                }
              })
            : _vm._e()
        }),
        _vm.extra > 0
          ? _c(
              "el-avatar",
              { staticClass: "extra", attrs: { shape: _vm.shape } },
              [_vm._v("+" + _vm._s(_vm.extra))]
            )
          : _vm._e()
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/avatar-list/src/main.vue?vue&type=template&id=4a8418b6&

// EXTERNAL MODULE: ./packages/avatar/src/main.vue + 2 modules
var main = __webpack_require__(79);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/avatar-list/src/main.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var mainvue_type_script_lang_js_ = ({
  name: 'ElAvatarList',
  xtype: 'YuAvatarList',

  component: main["a" /* default */],

  props: {
    max: {
      type: Number,
      default: 5
    },
    shape: {
      type: String,
      default: 'circle',
      validator: function validator(val) {
        return ['circle', 'square'].includes(val);
      }
    },
    size: {
      type: [Number, String],
      validator: function validator(val) {
        if (typeof val === 'string') {
          return ['large', 'medium', 'small'].includes(val);
        }
        return typeof val === 'number';
      }
    },
    avatarList: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },

  computed: {
    extra: function extra() {
      return this.avatarList.length - this.max;
    }
  },

  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./packages/avatar-list/src/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/avatar-list/src/main.vue





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
component.options.__file = "packages/avatar-list/src/main.vue"
/* harmony default export */ var src_main = (component.exports);
// CONCATENATED MODULE: ./packages/avatar-list/index.js


/* istanbul ignore next */
src_main.install = function (Vue) {
  Vue.component(src_main.name, src_main);
};

/* harmony default export */ var avatar_list = __webpack_exports__["default"] = (src_main);

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/util");

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "@/lib/utils/util"
var util_ = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/avatar/src/main.vue?vue&type=script&lang=js&


/* harmony default export */ var mainvue_type_script_lang_js_ = ({
  name: 'ElAvatar',
  xtype: 'YuAvatar',

  props: {
    size: {
      type: [Number, String],
      validator: function validator(val) {
        if (typeof val === 'string') {
          return ['large', 'medium', 'small'].includes(val);
        }
        return typeof val === 'number';
      }
    },
    shape: {
      type: String,
      default: 'circle',
      validator: function validator(val) {
        return ['circle', 'square'].includes(val);
      }
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    error: Function,
    fit: {
      type: String,
      default: 'cover'
    }
  },

  data: function data() {
    return {
      isImageExist: true,
      imgId: 'avatar_' + Object(util_["getRandomID"])(16)
    };
  },


  computed: {
    avatarClass: function avatarClass() {
      var size = this.size,
          icon = this.icon,
          shape = this.shape;

      var classList = ['el-avatar'];

      if (size && typeof size === 'string') {
        classList.push('el-avatar--' + size);
      }

      if (icon) {
        classList.push('el-avatar--icon');
      }

      if (shape === 'circle') {
        classList.push('el-avatar--' + shape);
      }

      return classList.join(' ');
    }
  },

  methods: {
    handleError: function handleError() {
      var error = this.error;

      var errorFlag = error ? error() : undefined;
      if (errorFlag !== false) {
        this.isImageExist = false;
      } else {
        // 移除图像
        var dom = document.getElementById(this.imgId);
        dom && dom.parentNode.removeChild(dom);
      }
    },
    renderAvatar: function renderAvatar() {
      var h = this.$createElement;
      var icon = this.icon,
          src = this.src,
          alt = this.alt,
          isImageExist = this.isImageExist,
          srcSet = this.srcSet,
          fit = this.fit;

      if (isImageExist && src) {
        return h('img', {
          attrs: {
            src: src,

            alt: alt,
            srcSet: srcSet
          },
          on: {
            'error': this.handleError
          },
          style: { 'object-fit': fit } });
      }

      if (icon) {
        return h('i', { 'class': icon });
      }

      return this.$slots.default;
    }
  },

  render: function render() {
    var h = arguments[0];
    var avatarClass = this.avatarClass,
        size = this.size,
        imgId = this.imgId;


    var sizeStyle = typeof size === 'number' ? {
      height: size + 'px',
      width: size + 'px',
      lineHeight: size + 'px'
    } : {};

    return h(
      'span',
      {
        attrs: { id: imgId },
        'class': avatarClass, style: sizeStyle },
      [this.renderAvatar()]
    );
  }
});
// CONCATENATED MODULE: ./packages/avatar/src/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/avatar/src/main.vue
var render, staticRenderFns




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
component.options.__file = "packages/avatar/src/main.vue"
/* harmony default export */ var main = __webpack_exports__["a"] = (component.exports);

/***/ })

/******/ });