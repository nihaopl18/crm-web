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
/******/ 	return __webpack_require__(__webpack_require__.s = 176);
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

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/menu/src/submenu.vue?vue&type=template&id=51054bf0&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "li",
    {
      ref: "subMenu",
      class: {
        "el-submenu": true,
        "is-active": _vm.active,
        "is-opened": _vm.opened
      },
      on: { mouseenter: _vm.handleMouseenter, mouseleave: _vm.handleMouseleave }
    },
    [
      _c(
        "div",
        {
          ref: "submenu-title",
          staticClass: "el-submenu__title",
          style: _vm.paddingStyle,
          on: { click: _vm.handleClick }
        },
        [
          _vm._t("title"),
          _c("i", {
            class: [
              {
                "el-submenu__icon-arrow": true,
                // 'el-icon-caret-bottom': rootMenu.mode === 'horizontal',
                "el-icon-arrow-down":
                  _vm.rootMenu.mode === "horizontal" ||
                  (_vm.rootMenu.mode === "vertical" && !_vm.rootMenu.collapse),
                "el-icon-arrow-right":
                  _vm.rootMenu.mode === "vertical" && _vm.rootMenu.collapse
              },
              _vm.className
            ]
          })
        ],
        2
      ),
      _vm.rootMenu.mode === "horizontal" ||
      (_vm.rootMenu.mode === "vertical" && _vm.rootMenu.collapse)
        ? [
            _c("transition", { attrs: { name: _vm.menuTransitionName } }, [
              _c(
                "ul",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.opened,
                      expression: "opened"
                    }
                  ],
                  ref: "menuList",
                  staticClass: "el-menu",
                  style: {
                    top: _vm.menuUlPosition.top + "px",
                    left: _vm.menuUlPosition.left + "px"
                  }
                },
                [_vm._t("default")],
                2
              )
            ])
          ]
        : _c("el-collapse-transition", [
            _c(
              "ul",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.opened,
                    expression: "opened"
                  }
                ],
                staticClass: "el-menu"
              },
              [_vm._t("default")],
              2
            )
          ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/menu/src/submenu.vue?vue&type=template&id=51054bf0&

// EXTERNAL MODULE: external "@/lib/transitions/collapse-transition"
var collapse_transition_ = __webpack_require__(60);
var collapse_transition_default = /*#__PURE__*/__webpack_require__.n(collapse_transition_);

// EXTERNAL MODULE: ./packages/menu/src/menu-mixin.js
var menu_mixin = __webpack_require__(86);

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/menu/src/submenu.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var submenuvue_type_script_lang_js_ = ({
  name: 'ElSubmenu',
  xtype: 'YuSubmenu',

  componentName: 'ElSubmenu',

  mixins: [menu_mixin["a" /* default */], emitter_default.a],

  components: { ElCollapseTransition: collapse_transition_default.a },

  props: {
    index: {
      type: String,
      required: true
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
    // 二级菜单最大宽度
    maxWidth: {
      type: Number,
      default: 180
    },
    // 增加自定义样式
    className: String
  },

  data: function data() {
    return {
      timeout: null,
      items: {},
      submenus: {},
      // 菜单的位置
      menuUlPosition: {
        top: '',
        left: ''
      },
      offset: {
        offsetTop: '',
        offsetLeft: ''
      }
    };
  },

  computed: {
    menuTransitionName: function menuTransitionName() {
      return this.rootMenu.collapse ? 'el-zoom-in-left' : 'el-zoom-in-top';
    },
    opened: function opened() {
      return this.rootMenu.openedMenus.indexOf(this.index) > -1;
    },

    active: {
      cache: false,
      get: function get() {
        var isActive = false;
        var submenus = this.submenus;
        var items = this.items;

        Object.keys(items).forEach(function (index) {
          if (items[index].active) {
            isActive = true;
          }
        });

        Object.keys(submenus).forEach(function (index) {
          if (submenus[index].active) {
            isActive = true;
          }
        });

        return isActive;
      }
    }
  },
  methods: {
    addItem: function addItem(item) {
      this.$set(this.items, item.index, item);
    },
    removeItem: function removeItem(item) {
      delete this.items[item.index];
    },
    addSubmenu: function addSubmenu(item) {
      this.$set(this.submenus, item.index, item);
    },
    removeSubmenu: function removeSubmenu(item) {
      delete this.submenus[item.index];
    },
    handleClick: function handleClick() {
      var rootMenu = this.rootMenu;

      if (rootMenu.menuTrigger === 'hover' && rootMenu.mode === 'horizontal' || rootMenu.collapse && rootMenu.mode === 'vertical') {
        return;
      }
      this.dispatch('ElMenu', 'submenu-click', this);
    },
    handleMouseenter: function handleMouseenter() {
      var _this = this;

      var rootMenu = this.rootMenu;

      if (rootMenu.mode === 'horizontal') {
        this.computePosition();
      }
      if (rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal' || !rootMenu.collapse && rootMenu.mode === 'vertical') {
        return;
      }
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        _this.rootMenu.openMenu(_this.index, _this.indexPath);
      }, 300);
    },
    handleMouseleave: function handleMouseleave() {
      var _this2 = this;

      var rootMenu = this.rootMenu;

      if (rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal' || !rootMenu.collapse && rootMenu.mode === 'vertical') {
        return;
      }
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        _this2.rootMenu.closeMenu(_this2.index);
      }, 300);
    },

    /**
     * created by taoting1 2018-9-26
     * 找到当前submenu到el-menu的层数
     * @param level 层数
     */
    getLevel: function getLevel() {
      var parent = this.$parent;
      var level = 0;
      while (parent && parent.$options.componentName !== 'ElMenu') {
        if (parent.$options.componentName === 'ElSubmenu') {
          level++;
        }
        parent = parent.$parent;
      }
      return level;
    },

    /**
     * 计算ul的位置,使生成的菜单列表位置自适应页面
     */
    computePosition: function computePosition() {
      var distW;
      var subMenu = this.$refs.subMenu;
      // 当前subMenu到浏览器顶部的距离
      var offsetTop = this.getOffsetTop(subMenu);
      // 当前subMenu到浏览器左边的距离
      var offsetLeft = this.getOffsetLeft(subMenu);
      // 当前subMenu中的ul
      var menuList = this.$refs.menuList;
      // 获得当前subMenu中的ul的宽高属性
      var menuSize = this.getSize(menuList);
      // ul的宽度
      var menuWidth = menuSize.width;
      // ul的高度
      var menuHeight = menuSize.height + 24; // 增加底部高度差
      // 获取当前菜单在列表中得顺序号
      var marginTop = this.idx * 36;
      var distH = offsetTop + menuHeight - window.innerHeight;
      // 设置元素子元素最大高度
      var dom = subMenu.querySelector('.el-submenu>.el-menu').lastChild;
      if (dom) {
        dom.style.maxHeight = window.innerHeight - 64 - 48 - 24 + 'px';
      }
      // 超出时计算偏移量
      if (distH > 0) {
        if (marginTop > 0 && marginTop < distH) {
          this.menuUlPosition.top = 0 - marginTop - 5;
        } else {
          this.menuUlPosition.top = 0 - distH;
        }
      }
      if (this.getLevel() > 1) {
        var left = this.getStyle(this.parentMenu.$refs.menuList, 'left');
        var index = left.lastIndexOf('px');
        if (index !== -1) {
          left = left.slice(0, index);
        }
        this.menuUlPosition.left = left;
        return;
      }
      if (this.parentMenu.$options.componentName !== 'ElMenu') {
        distW = offsetLeft + menuWidth + this.$refs.subMenu.clientWidth - window.innerWidth;
      } else {
        distW = offsetLeft + menuWidth - window.innerWidth;
      }
      if (distW > 0) {
        if (this.parentMenu.$options.componentName !== 'ElMenu') {
          this.menuUlPosition.left = 0 - this.$refs.subMenu.clientWidth;
        } else {
          // 菜单项加上下级菜单宽度超出屏幕时，调整对齐右边 this.maxWidth为二级菜单宽度 ,26边距
          if (this.$refs.subMenu.offsetLeft + this.maxWidth + 26 > window.innerWidth) {
            this.menuUlPosition.left = window.innerWidth - (this.$refs.subMenu.offsetLeft + this.maxWidth + 26);
          }
          // this.menuUlPosition.left = 0 - distW;
        }
      }
    }
  },
  created: function created() {
    this.parentMenu.addSubmenu(this);
    this.rootMenu.addSubmenu(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.parentMenu.removeSubmenu(this);
    this.rootMenu.removeSubmenu(this);
  }
});
// CONCATENATED MODULE: ./packages/menu/src/submenu.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_submenuvue_type_script_lang_js_ = (submenuvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/menu/src/submenu.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_submenuvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/menu/src/submenu.vue"
/* harmony default export */ var submenu = (component.exports);
// CONCATENATED MODULE: ./packages/submenu/index.js


/* istanbul ignore next */
submenu.install = function (Vue) {
  Vue.component(submenu.name, submenu);
};

/* harmony default export */ var packages_submenu = __webpack_exports__["default"] = (submenu);

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

module.exports = require("@/lib/transitions/collapse-transition");

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