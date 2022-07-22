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
/******/ 	return __webpack_require__(__webpack_require__.s = 227);
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

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/button-drop/src/main.vue?vue&type=script&lang=js&

/**
 * 搜索输入框
 * @param buttons-按钮组数组 [Array] {text: '',type: '', className: '', disabled: '', loading: '', icon: ''}
 * @param size-按钮尺寸 [String] [large, small, mini]
 * @param showLength-展示按钮个数 [Number]
 * @param type-按钮组类型 [String] ['text'(文本类型), 'button'(按钮类型)]
 * @events  click 返回{index(索引),item（当前对象）}
 * @authors luyq1
 * @date    2020-05-09
 * @version $1.0$
 */

/* harmony default export */ var mainvue_type_script_lang_js_ = ({
  name: 'YuButtonDrop',
  xtype: 'YuButtonDrop',
  mixins: [locale_default.a],
  props: {
    buttons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    size: {
      type: String,
      default: '' // large、small、mini
    },
    showLength: {
      type: Number,
      default: 5
    },
    type: {
      type: String,
      default: 'button'
    },
    setIndex: String,
    setIndexText: String
  },
  data: function data() {
    return {
      showBtns: [],
      hideBtns: [],
      offsetTop: 0,
      btns: [],
      showDrop: false,
      showlength: this.showLength
    };
  },
  computed: {
    isText: function isText() {
      return this.type === 'text';
    }
  },
  methods: {
    handleClick: function handleClick(i, item, noMore) {
      var index = !noMore ? i + this.showlength : i;
      var itemVal = noMore ? item : this.btns[index];
      itemVal.index = index;
      this.showDrop = false;
      this.$emit('click', itemVal);
    },
    toggleShowDrop: function toggleShowDrop(val) {
      if (!this.offsetTop) {
        var btn = this.$el.querySelector('.yu-buttons-drop_button');
        btn && (this.offsetTop = btn.offsetHeight + 1);
      }
      this.showDrop = val;
    },
    setButtonText: function setButtonText() {
      var indexes = this.setIndex.split(',');
      var indexTexts = this.setIndexText.split(',');
      for (var i = 0, len = indexes.length; i < len; ++i) {
        this.btns[indexes[i]].text = indexTexts[i];
      }
      this.handleBtns();
    },
    handleBtns: function handleBtns() {
      var val = this.btns;
      var startIndex = this.showlength;
      var endIndex = val.length;
      if (this.showlength >= endIndex) {
        this.showBtns = val;
      } else {
        this.showBtns = val.slice(0, startIndex - 1);
        this.hideBtns = val.slice(startIndex - 1, endIndex);
      }
    },
    handleMenuClick: function handleMenuClick(index) {
      this.menuGroup[index].componentOptions.listeners.click();
    }
  },
  watch: {
    buttons: {
      handler: function handler(val) {
        this.btns = JSON.parse(JSON.stringify({ val: val })).val;
        this.handleBtns();
      },
      immediate: true
    },
    setIndexText: {
      handler: function handler(val) {
        val && this.setButtonText();
      },
      immediate: true
    }
  },
  mounted: function mounted() {},

  render: function render(h) {
    var dom = this.$el;
    if (dom && this.$parent.$vnode.tag.indexOf('YuPanel') !== -1) {
      var rightContent = dom.parentNode;
      var panelTitle = rightContent.parentNode;
      var panelTitleH1 = panelTitle.getElementsByTagName('h1')[0];
      var rightContentWidth = rightContent ? parseFloat(getComputedStyle(rightContent).width) : 0;
      var panelTitleWidth = panelTitle ? parseFloat(getComputedStyle(panelTitle).width) - parseFloat(getComputedStyle(panelTitle).paddingLeft) * 2 : 0;
      var panelTitleH1Width = panelTitleH1 ? parseFloat(getComputedStyle(panelTitleH1).width) : 0;
      if (rightContentWidth + panelTitleH1Width > panelTitleWidth) {
        this.showlength--;
      }
    }
    var _this = this;
    var defaultSlot = this.$slots.default ? this.$slots.default.filter(function (item, index) {
      return item.tag && item.text !== ' ';
    }) : [];
    if (defaultSlot.length > this.showlength) {
      this.bthGroup = defaultSlot.slice(0, this.showlength - 1);
      this.menuGroup = defaultSlot.slice(this.showlength - 1, defaultSlot.length);
    } else {
      this.bthGroup = defaultSlot;
      this.menuGroup = [];
    }
    var form = h('div', {
      'class': 'yu-buttons'
    }, [_this.bthGroup.length > 0 ? _this.bthGroup : _this._l(_this.showBtns, function (button, index) {
      return h('yu-button', { props: { type: _this.isText ? _this.type : button.type, size: _this.size, icon: button.icon },
        attrs: {
          class: button.class
        },
        on: { click: function click() {
            _this.handleClick(index, button, true);
          } } }, button.text);
    }), _this.menuGroup.length > 0 ? h('yu-dropdown', { props: { menuAlign: 'start', trigger: _this.isText ? 'hover' : 'click' }, on: { command: _this.handleMenuClick } }, [h('yu-button', { props: { size: _this.size, type: _this.isText ? 'text' : '' } }, [_this.t('el.form.expandText'), !_this.isText ? [h('i', { attrs: {
        class: 'el-icon-arrow-down el-icon--right'
      } })] : '']), h('yu-dropdown-menu', { slot: 'dropdown', class: 'yu-button-drop' }, [_this._l(_this.menuGroup, function (button, index) {
      return h('yu-dropdown-item', { props: { command: index } }, button.componentOptions.children[0].text);
    })])]) : _this.hideBtns.length > 0 ? h('yu-dropdown', { props: { menuAlign: 'start', trigger: _this.isText ? 'hover' : 'click' }, on: { command: _this.handleClick } }, [h('yu-button', { props: { size: _this.size, type: _this.isText ? 'text' : '' } }, [_this.t('el.form.expandText'), !_this.isText ? [h('i', { attrs: {
        class: 'el-icon-arrow-down el-icon--right'
      } })] : '']), h('yu-dropdown-menu', { slot: 'dropdown', class: 'yu-button-drop' }, [_this._l(_this.hideBtns, function (button, index) {
      return h('yu-dropdown-item', { props: { command: index } }, button.text);
    })])]) : '']);
    return form;
  }
});
// CONCATENATED MODULE: ./packages/button-drop/src/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/button-drop/src/main.vue
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
component.options.__file = "packages/button-drop/src/main.vue"
/* harmony default export */ var main = (component.exports);
// CONCATENATED MODULE: ./packages/button-drop/index.js


/* istanbul ignore next */
main.install = function (Vue) {
  Vue.component(main.name, main);
};

/* harmony default export */ var button_drop = __webpack_exports__["default"] = (main);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

/***/ })

/******/ });