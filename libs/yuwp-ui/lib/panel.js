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
/******/ 	return __webpack_require__(__webpack_require__.s = 224);
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

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("babel-helper-vue-jsx-merge-props");

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "babel-helper-vue-jsx-merge-props"
var external_babel_helper_vue_jsx_merge_props_ = __webpack_require__(14);
var external_babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(external_babel_helper_vue_jsx_merge_props_);

// EXTERNAL MODULE: external "@/lib/locale"
var locale_ = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/panel/src/panel.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * @created by wangyin 2019-07-14
 * @update by luyq1 2020-05-09 添加标题自定义，
 * @param title [String -标题
 * @param isCollapse [Boolean] -是否支持首站展开 默认false
 * @param collapse [Boolean] -收起展开状态 默认false
 * @param collapseIcon [Array] -收起展开图标 默认
 * @param collapseTitle [Array] -收起展开文字 默认
 * @param showSearchInput [Boolean] -是否展示搜索框 默认false
 * @param searchKey [String] -搜索框 搜索关键字
 * @param searchVal [String] -搜索框 搜索默认值
 * @param placeholder [String] -搜索框 搜索占位字符
 * @param float [Boolean] -浮动下拉展开 默认false
 * @param noPadding [Boolean] -内容块去掉左右边距
 * @param noPaddingTop [Boolean] -内容块去掉上边距
 * @param paddingTop [Boolean] -内容块保留上边距
 * @param panelType [String] -面板类行 default 正常 | small 小) // 废弃
 * @description panel 组件
 */

/* harmony default export */ var panelvue_type_script_lang_js_ = ({
  name: 'YuPanel',
  xtype: 'YuPanel',
  props: {
    // 标题
    title: String,
    // 标题图标
    titleIcon: String,
    // 是否支持查询
    isFilter: {
      type: Boolean,
      default: false
    },
    // 是否支持收缩展开
    isCollapse: {
      default: false,
      type: Boolean
    },
    // 收缩展开状态
    collapse: {
      default: false,
      type: Boolean
    },
    // 隐藏查询域
    hideFilter: {
      default: true,
      type: Boolean
    },
    // 收起展开图标
    collapseIcon: {
      type: Array,
      default: function _default() {
        return ['yu-icon-arr-up', 'yu-icon-arr-down'];
      }
    },
    // 收起展开文字
    collapseTitle: {
      type: Array,
      default: function _default() {
        return ['展开', '收起'];
      }
    },
    placeholder: String,
    // 是否展示搜索框
    showSearchInput: {
      type: Boolean,
      default: false
    },
    // 搜索关键字
    searchKey: String,
    // 搜索默认值
    searchVal: String,
    // 收缩展开状态
    margin: {
      default: true,
      type: Boolean
    },
    // 内容面板默认左右边距
    noPadding: {
      default: false,
      type: Boolean
    },
    // 没有顶部内边距
    noPaddingTop: {
      default: false,
      type: Boolean
    },
    // 有顶部内边距
    paddingTop: {
      default: false,
      type: Boolean
    },
    // 面板类型
    // panelType: {
    //   type: String,
    //   default: 'default'
    // },
    // 是否浮动展示
    float: Boolean,
    // 是否吸顶
    cupping: {
      type: Boolean,
      default: false
    },
    // 吸顶元素选择器
    cuppingEl: {
      type: String,
      default: ''
    },
    showVnode: null,
    titleFontSize: Number,
    collapseHide: {
      type: Boolean,
      default: true
    },
    // panel 容器类型 simple-简单 normal-高级 combination-组合
    panelType: {
      type: String,
      default: 'combination' // simple  normal
    },
    // 展开高级查询的按钮名称
    collaspaseText: {
      type: String,
      default: function _default() {
        return Object(locale_["t"])('el.panel.collaspaseText');
      }
    }
  },
  data: function data() {
    return {
      hide: true,
      showCollapseTitle: true,
      expandIcon: 'yu-icon-arr-up',
      expandTitle: '收起',
      inputVal: '',
      contentHide: false,
      posiStyles: '',
      cuppingDom: null, // 吸顶事件宿主
      titleDom: null, // 要吸顶的元素
      filterTop: 40 // #TODO 此处需要根据是否紧凑模式调整值
    };
  },
  computed: {
    panelClas: function panelClas() {
      // 没有右侧操作按钮不显示
      return this.$slots.right || this.$slots.filter || this.isFilter ? '' : 'default';
    },
    showFilter: function showFilter() {
      return this.$slots.filter;
    }
  },
  watch: {
    collapse: {
      handler: function handler(val) {
        this.contentHide = val;
        this.toggleIcon(val);
      },
      immediate: true
    },
    hideFilter: {
      handler: function handler(val) {
        this.hide = this.panelType === 'normal' || val;
      },
      immediate: true
    },
    float: {
      handler: function handler(val) {
        // this.shadow = !val;
      },
      immediate: true
    },
    searchVal: {
      handler: function handler(val) {
        this.inputVal = val;
      },
      immediate: true
    },
    collapseIcon: {
      handler: function handler(val) {
        this.expandIcon = this.collapseIcon[0];
        this.showCollapseTitle = this.expandTitle.length > 0;
      },
      immediate: true
    }
  },
  methods: {
    toggleFn: function toggleFn(type) {
      if (type === 'filter') {
        this.hide = !this.hide;
      } else {
        this.contentHide = !this.contentHide;
        this.toggleIcon(this.contentHide);
      }
      this.$emit('toggle-fn', !this.hide);
    },
    toggleIcon: function toggleIcon(expand) {
      this.expandIcon = expand ? this.collapseIcon[1] : this.collapseIcon[0];
      if (this.showCollapseTitle) {
        this.expandTitle = expand ? this.collapseTitle[0] : this.collapseTitle[1];
      }
      this.$emit('toggle-fn', expand);
    },
    search: function search(event) {
      this.$emit('search', {
        key: this.searchKey || '',
        value: this.inputVal || ''
      });
    },
    change: function change() {
      this.$emit('input', this.inputVal);
    },
    resetScrollFn: function resetScrollFn() {
      // 当前激活页签才执行,当前标签激活时才处理
      if (this.cuppingDom && this.cuppingDom.className.indexOf('ck') > -1) {
        var width = this.cuppingDom.querySelector('.yu-base-panel').clientWidth;
        var top = this.cuppingDom.getBoundingClientRect().top;
        var fixedClass = 'fixed-top';
        var className = this.titleDom.getAttribute('class');
        if (className.indexOf(fixedClass) > -1) {
          this.titleDom.style.width = width + 'px';
          this.titleDom.style.top = top + 'px';
        }
      }
    },
    // 吸顶处理
    scrollFn: function scrollFn() {
      var _this = this;
      var timer = null;
      var height = 24;
      var dom = this.titleDom;
      var fixedClass = 'fixed-top';
      var fixedTop = function fixedTop(e) {
        var width = _this.cuppingDom.querySelector('.yu-base-panel').clientWidth;
        var top = _this.cuppingDom.getBoundingClientRect().top;
        // 获取元素宽度及高度
        var className = dom.getAttribute('class');
        if (e.target.scrollTop > height) {
          if (className.indexOf(fixedClass) === -1) {
            className = className + ' ' + fixedClass;
            // 增加宽度和距顶高度值
            dom.style.width = width + 'px';
            dom.style.top = top + 'px';
            dom.setAttribute('class', className);
          }
        } else {
          if (className.indexOf(fixedClass) > -1) {
            // 删除自定设置的宽度和高度值
            dom.style.cssText = dom.style.cssText.replace(/width:\s\d+px;\stop:\s\d+px;/gi, '');
            className = className.replace(fixedClass, '').trim();
            dom.setAttribute('class', className);
          }
        }
      };
      return function (e) {
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
          fixedTop(e);
        }, 10);
      };
    }
  },
  render: function render(h) {
    var _this2 = this;

    var _this = this;
    if (this.showVnode) {
      var dom = this.showVnode.$el;
      var target = this.$el.getElementsByClassName('yu-base-panel-filter')[0];
      target.appendChild(dom);
    }
    var nativeOn = {
      keyup: function keyup(event) {
        if (event.keyCode !== 13) {
          return;
        }
        return _this.search(event);
      }
    };
    var panel = h(
      'div',
      { 'class': ['yu-base-panel', this.panelClas] },
      [this.title || this.$slots.right || this.$slots.filter ? h(
        'div',
        { 'class': 'yu-base-panel-title' },
        [this.title ? h('h1', [this.titleIcon ? h('i', { 'class': 'titleIcon' }) : '', h(
          'span',
          { style: { fontSize: this.titleFontSize + 'px' } },
          [this.title]
        )]) : '', h(
          'div',
          { 'class': 'yu-base-panel-right-content' },
          [this.$slots.right ? this.$slots.right : '', this.hide && this.panelType !== 'normal' ? h(
            'div',
            { 'class': 'panel-custom-search' },
            [this.$slots.search ? this.$slots.search : '']
          ) : '', this.showSearchInput && this.hide && this.panelType !== 'normal' ? h(
            'el-input',
            external_babel_helper_vue_jsx_merge_props_default()([{
              attrs: { maxlength: '32', placeholder: this.placeholder, value: _this2.inputVal
              },
              on: {
                'input': function input($$v) {
                  _this2.inputVal = $$v;
                }
              }
            }, {
              directives: [{
                name: 'model',
                value: _this2.inputVal
              }]
            }, {
              on: {
                'input': function input() {
                  return _this2.change();
                }
              }
            }, { nativeOn: nativeOn }]),
            [h('i', { slot: 'suffix', 'class': 'el-input__icon yu-icon-search1', on: {
                'click': function click() {
                  return _this2.search();
                }
              }
            })]
          ) : '', this.collapseHide ? h(
            'span',
            { 'class': 'yu-base-panel-collapse' },
            [this.panelType === 'combination' ? h(
              'yu-button',
              {
                on: {
                  'click': function click() {
                    return _this2.toggleFn('filter');
                  }
                },
                attrs: { type: 'text' },
                'class': { 'active': !this.hide } },
              [this.collaspaseText, h('i', { 'class': this.hide ? 'el-icon-arrow-down' : 'el-icon-arrow-up' })]
            ) : '', this.isCollapse ? h(
              'label',
              {
                on: {
                  'click': function click() {
                    return _this2.toggleFn('collpase');
                  }
                },
                'class': 'el-xcollapse__icon__expand' },
              [h('i', { 'class': this.expandIcon }), this.showCollapseTitle ? h('span', [this.expandTitle]) : '']
            ) : '']
          ) : '']
        )]
      ) : '', h(
        'div',
        { style: { display: !this.contentHide || this.panelType === 'combination' ? 'block' : 'none' } },
        [h(
          'transition',
          {
            attrs: { name: 'el-zoom-in-top' }
          },
          [!this.hide && this.panelType !== 'simple' ? h(
            'div',
            { 'class': ['yu-base-panel-filter', { 'no-margin': !this.margin, 'float': this.float }], style: this.posiStyles },
            [this.$slots.filter]
          ) : h(
            'div',
            { 'class': ['yu-base-panel-filter', { 'no-margin': !this.margin, 'float': this.float }], style: [this.posiStyles, { display: this.panelType === 'normal' || this.contentHide ? 'block' : 'none' }] },
            [this.$slots.filter]
          )]
        ), h(
          'transition',
          {
            attrs: { name: 'el-zoom-in-top' }
          },
          [this.$slots.default ? h(
            'div',
            { 'class': ['yu-base-panel-content', { 'no-margin': !this.margin, 'no-padding': this.noPadding, 'padding-top': this.paddingTop, 'no-padding-top': !this.hide || this.noPaddingTop }] },
            [this.$slots.default]
          ) : '']
        )]
      )]
    );
    return panel;
  },
  mounted: function mounted() {
    var titleEl = this.$el.querySelector('.yu-base-panel-title');
    if (this.float && titleEl) {
      this.filterTop = titleEl.offsetHeight;
      this.posiStyles = 'position:absolute;width:100%;top:' + this.filterTop + 'px;';
    }
    if (this.cupping && (this.cuppingEl || this.$el.offsetParent)) {
      var el = this.cuppingEl && document.querySelector(this.cuppingEl);
      if (!el) {
        el = this.$el.offsetParent.parentNode;
      }
      this.titleDom = titleEl;
      this.cuppingDom = el;
      this.cuppingDom.addEventListener('scroll', this.scrollFn);
      // 监听事件
      yufp.util && yufp.util.globalVm && yufp.util.globalVm.$on('pickup', this.resetScrollFn);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.cuppingDom) {
      this.cuppingDom.removeEventListener('scroll', this.scrollFn);
      this.cuppingDom = null;
    }
  }
});
// CONCATENATED MODULE: ./packages/panel/src/panel.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_panelvue_type_script_lang_js_ = (panelvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/panel/src/panel.vue
var panel_render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_panelvue_type_script_lang_js_,
  panel_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/panel/src/panel.vue"
/* harmony default export */ var src_panel = (component.exports);
// CONCATENATED MODULE: ./packages/panel/index.js


/* istanbul ignore next */
src_panel.install = function (Vue) {
  Vue.component(src_panel.name, src_panel);
};

/* harmony default export */ var packages_panel = __webpack_exports__["default"] = (src_panel);

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ })

/******/ });