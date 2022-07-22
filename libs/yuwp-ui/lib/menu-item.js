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
/******/ 	return __webpack_require__(__webpack_require__.s = 183);
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

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/menu/src/menu-item.vue?vue&type=template&id=2a5dbfea&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "li",
    {
      staticClass: "el-menu-item",
      class: {
        "is-active": _vm.active,
        "is-disabled": _vm.disabled
      },
      style: _vm.paddingStyle,
      attrs: { draggable: _vm.rootMenu.draggable },
      on: {
        click: _vm.handleClick,
        contextmenu: _vm.handleContextMenu,
        mouseleave: _vm.handleMouseleave,
        mouseup: _vm.handleMouseup,
        dragend: function($event) {
          $event.stopPropagation()
          return _vm.handleDragEnd($event)
        },
        dragover: function($event) {
          $event.stopPropagation()
          return _vm.handleDragOver($event)
        },
        drop: function($event) {
          $event.stopPropagation()
          return _vm.handleDrop($event)
        }
      }
    },
    [
      _vm.$parent === _vm.rootMenu &&
      _vm.rootMenu.collapse &&
      _vm.rootMenu.mode === "vertical"
        ? _c("el-tooltip", { attrs: { effect: "dark", placement: "right" } }, [
            _c(
              "div",
              { attrs: { slot: "content" }, slot: "content" },
              [_vm._t("title")],
              2
            ),
            _c(
              "div",
              {
                staticStyle: {
                  position: "absolute",
                  left: "0",
                  top: "0",
                  height: "100%",
                  width: "100%",
                  display: "inline-block",
                  "box-sizing": "border-box",
                  padding: "0 20px"
                }
              },
              [_vm._t("default")],
              2
            )
          ])
        : [
            _vm._t("default"),
            _vm._t("title"),
            _vm.showMenuRightList
              ? [
                  _c(
                    "ul",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.shown,
                          expression: "shown"
                        }
                      ],
                      staticClass: "menu-right-list",
                      style: {
                        top: _vm.menuRightListPos.top + "px",
                        left: _vm.menuRightListPos.left + "px"
                      }
                    },
                    [
                      _vm._t(
                        "menuRightList",
                        _vm._l(_vm.menuRightListData, function(d, index) {
                          return _c(
                            "li",
                            {
                              key: "menuRightListData_" + index,
                              on: {
                                click: function($event) {
                                  return _vm.listClcik(d.index, $event)
                                }
                              }
                            },
                            [
                              _c("i", { class: d.icon }),
                              _c("span", [_vm._v(_vm._s(d.title))])
                            ]
                          )
                        })
                      )
                    ],
                    2
                  )
                ]
              : _vm._e()
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/menu/src/menu-item.vue?vue&type=template&id=2a5dbfea&

// EXTERNAL MODULE: ./packages/menu/src/menu-mixin.js
var menu_mixin = __webpack_require__(86);

// EXTERNAL MODULE: external "@/lib/tooltip"
var tooltip_ = __webpack_require__(53);
var tooltip_default = /*#__PURE__*/__webpack_require__.n(tooltip_);

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/menu/src/menu-item.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var menu_itemvue_type_script_lang_js_ = ({
  name: 'ElMenuItem',
  xtype: 'YuMenuItem',

  componentName: 'ElMenuItem',

  components: { ElTooltip: tooltip_default.a },

  mixins: [menu_mixin["a" /* default */], emitter_default.a],

  data: function data() {
    return {
      shown: false,
      menuRightListPos: {
        top: '',
        left: ''
      }
    };
  },

  props: {
    index: {
      type: String,
      required: true
    },
    route: {
      type: Object,
      required: false
    },
    // 菜单项数据对象
    menuItemData: {
      typIe: Object
    },
    disabled: {
      type: Boolean,
      required: false
    },
    // 开始缩进层级,默认从0开始，即所有层级偏移
    startPaddingLevel: {
      type: Number,
      default: 0
    },
    // 菜单顺序号
    idx: {
      type: Number,
      default: 0
    },
    // 右键菜单，展示的列表的数据
    menuRightListData: Array,
    // 在菜单项右键，是否允许展示列表
    showMenuRightList: Boolean
  },
  computed: {
    active: function active() {
      return this.index === this.rootMenu.activeIndex;
    }
  },
  methods: {
    handleClick: function handleClick() {
      this.dispatch('ElMenu', 'item-click', this);
    },

    // 阻止浏览右键默认事件
    handleContextMenu: function handleContextMenu(e) {
      if (!e) e = window.event;
      if (this.showMenuRightList) {
        e.preventDefault();
      }
    },

    // 判断是右击事件
    handleMouseup: function handleMouseup(e) {
      if (!e) e = window.event;
      if (e.button === 2 && this.showMenuRightList) {
        // 控制右键列表的位置
        this.menuRightListPos.left = e.offsetX;
        this.menuRightListPos.top = e.offsetY;
        this.shown = true;
        this.$emit('menu-right-click', this);
      }
    },

    /**
     * 鼠标从菜单项移开时，隐藏right-list
     */
    handleMouseleave: function handleMouseleave() {
      this.shown = false;
    },

    /**
     * 右键列表项点击事件
     * @param index 列表项唯一标识
     * @param e 原生DOM事件对象
     */
    listClcik: function listClcik(index, e) {
      e = e || window.event;
      e.stopPropagation();
      this.$emit('menu-rightlist-click', index, this.menuItemData, e);
    },

    /**
     * 允许将数据/元素放置到其他元素中
     */
    handleDragOver: function handleDragOver(e) {
      if (!this.rootMenu.draggable) return;
      e = e || window.event;
      e.preventDefault();
    },

    /**
     * 触发el-menu组件实例'menu-item-drag-end'事件
     */
    handleDragEnd: function handleDragEnd(e) {
      if (!this.rootMenu.draggable) return;
      e = e || window.event;
      this.rootMenu.$emit('menu-item-drag-end', this, e);
    },

    /**
     * 拖拽放置事件处理程序，阻止drop 事件的默认行为（默认以链接形式打开）
     */
    handleDrop: function handleDrop(e) {
      if (!this.rootMenu.draggable) return;
      e = e || window.event;
      e.preventDefault();
    }
  },
  created: function created() {
    this.parentMenu.addItem(this);
    this.rootMenu.addItem(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.parentMenu.removeItem(this);
    this.rootMenu.removeItem(this);
  }
});
// CONCATENATED MODULE: ./packages/menu/src/menu-item.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_menu_itemvue_type_script_lang_js_ = (menu_itemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/menu/src/menu-item.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_menu_itemvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/menu/src/menu-item.vue"
/* harmony default export */ var menu_item = (component.exports);
// CONCATENATED MODULE: ./packages/menu-item/index.js


/* istanbul ignore next */
menu_item.install = function (Vue) {
  Vue.component(menu_item.name, menu_item);
};

/* harmony default export */ var packages_menu_item = __webpack_exports__["default"] = (menu_item);

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ }),

/***/ 53:
/***/ (function(module, exports) {

module.exports = require("@/lib/tooltip");

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* harmony default export */ __webpack_exports__["a"] = ({
  computed: {
    indexPath: function indexPath() {
      var path = [this.index];
      var parent = this.$parent;
      while (parent.$options.componentName !== 'ElMenu') {
        if (parent.index) {
          path.unshift(parent.index);
        }
        parent = parent.$parent;
      }
      return path;
    },
    rootMenu: function rootMenu() {
      var parent = this.$parent;
      while (parent && parent.$options.componentName !== 'ElMenu') {
        parent = parent.$parent;
      }
      return parent;
    },
    parentMenu: function parentMenu() {
      var parent = this.$parent;
      while (parent && ['ElMenu', 'ElSubmenu'].indexOf(parent.$options.componentName) === -1) {
        parent = parent.$parent;
      }
      return parent;
    },
    paddingStyle: function paddingStyle() {
      if (this.rootMenu.mode !== 'vertical') return {};

      var padding = 20;
      var parent = this.$parent;

      if (this.rootMenu.collapse) {
        padding = 20;
      } else {
        var startPaddingLevel = this.startPaddingLevel || 0;
        var level = 0;
        while (parent && parent.$options.componentName !== 'ElMenu') {
          if (parent.$options.componentName === 'ElSubmenu') {
            if (++level > startPaddingLevel) {
              padding += 20;
            }
          }
          parent = parent.$parent;
        }
      }
      return { paddingLeft: padding + 'px' };
    }
  },
  methods: {
    // 判断对象类型
    getType: function getType(obj) {
      var _type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
      var tmpString;
      if (_type === 'object') {
        if (obj === null) {
          tmpString = 'null';
        } else {
          tmpString = Object.prototype.toString.call(obj).slice(8, -1);
        }
      }
      return tmpString.toLowerCase();
    },

    // 返回元素的宽高属性的数值形式，如 20
    getStyleNum: function getStyleNum(el, styleName) {
      return parseInt(this.getStyle(el, styleName).replace(/px|pt|em/ig, ''), 10);
    },

    // 获取元素样式
    getStyle: function getStyle(el, styleName) {
      return el.style[styleName] ? el.style[styleName] : el.currentStyle ? el.currentStyle[styleName] : window.getComputedStyle(el, null)[styleName];
    },

    // 设置元素样式
    setStyle: function setStyle(el, obj) {
      if (this.getType(obj) === 'object') {
        for (var s in obj) {
          var cssArrt = s.split('-');
          for (var i = 1; i < cssArrt.length; i++) {
            cssArrt[i] = cssArrt[i].replace(cssArrt[i].charAt(0), cssArrt[i].charAt(0).toUpperCase());
          }
          var cssArrtnew = cssArrt.join('');
          el.style[cssArrtnew] = obj[s];
        }
      }
    },

    // 获取隐藏元素的宽高
    getSize: function getSize(el) {
      var addCss = { display: '', position: 'absolute', visibility: 'hidden' };
      var oldCss = {};
      // 将当前样式存储起来
      for (var i in addCss) {
        oldCss[i] = this.getStyle(el, i);
      }
      this.setStyle(el, addCss);
      var _width = el.clientWidth || this.getStyleNum(el, 'width');
      var _height = el.clientHeight || this.getStyleNum(el, 'height');
      for (i in oldCss) {
        this.setStyle(el, oldCss);
      }
      return { width: _width, height: _height };
    },

    // 获得元素到浏览器顶部距离
    getOffsetTop: function getOffsetTop(obj) {
      var tmp = obj.offsetTop;
      var val = obj.offsetParent;
      while (val != null) {
        tmp += val.offsetTop;
        val = val.offsetParent;
      }
      return tmp;
    },

    // 获得元素到浏览器左侧距离
    getOffsetLeft: function getOffsetLeft(obj) {
      var tmp = obj.offsetLeft;
      var val = obj.offsetParent;
      while (val != null) {
        tmp += val.offsetLeft;
        val = val.offsetParent;
      }
      return tmp;
    }
  }
});

/***/ })

/******/ });