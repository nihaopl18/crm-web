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
/******/ 	return __webpack_require__(__webpack_require__.s = 158);
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

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/dialog/src/component.vue?vue&type=template&id=60140e62&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "dialog-fade" },
      on: { "after-enter": _vm.afterEnter, "after-leave": _vm.afterLeave }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "drag",
              rawName: "v-drag",
              value: _vm.draggable,
              expression: "draggable"
            },
            {
              name: "resize",
              rawName: "v-resize",
              value: _vm.resizeable,
              expression: "resizeable"
            },
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "el-dialog__wrapper",
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
              key: _vm.key,
              ref: "dialog",
              staticClass: "el-dialog",
              class: [
                _vm.sizeClass,
                _vm.customClass,
                { "el-dialog--center": _vm.center }
              ],
              style: _vm.style
            },
            [
              _c(
                "div",
                { ref: "header", staticClass: "el-dialog__header" },
                [
                  _vm._t("title", [
                    _c("span", { staticClass: "el-dialog__title" }, [
                      _vm._v(_vm._s(_vm.title))
                    ])
                  ]),
                  _vm.showClose
                    ? _c(
                        "button",
                        {
                          staticClass: "el-dialog__headerbtn",
                          attrs: { type: "button", "aria-label": "Close" },
                          on: { click: _vm.handleClose }
                        },
                        [
                          _c("i", {
                            staticClass:
                              "el-dialog__close el-icon el-icon-close"
                          })
                        ]
                      )
                    : _vm._e(),
                  _vm._l(_vm.headerCustomBtns, function(item, index) {
                    return _c(
                      "button",
                      {
                        key: index,
                        class: item.btnClass,
                        attrs: { type: "button", "aria-label": item.btnClass },
                        on: {
                          click: function($event) {
                            return item.click($event)
                          }
                        }
                      },
                      [_c("i", { class: item.iClass })]
                    )
                  })
                ],
                2
              ),
              _vm.rendered
                ? _c(
                    "div",
                    { staticClass: "el-dialog__body", style: _vm.styleBody },
                    [_vm._t("default")],
                    2
                  )
                : _vm._e(),
              _vm.$slots.footer
                ? _c(
                    "div",
                    { ref: "footer", staticClass: "el-dialog__footer" },
                    [_vm._t("footer")],
                    2
                  )
                : _vm._e()
            ]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/dialog/src/component.vue?vue&type=template&id=60140e62&

// EXTERNAL MODULE: external "@/lib/utils/popup"
var popup_ = __webpack_require__(27);
var popup_default = /*#__PURE__*/__webpack_require__.n(popup_);

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// CONCATENATED MODULE: ./packages/dialog/src/directive.js
/* harmony default export */ var directive = ({
  bind: function bind(el, binding, vnode, oldVnode) {
    if (!binding.value) {
      return;
    }
    var headerEl = el.querySelector('.el-dialog__header');
    var dragEl = el.querySelector('.el-dialog');
    headerEl.style.cursor = 'move';
    vnode.context.initDragLeft = dragEl.style.left + '';
    vnode.context.initDragTop = dragEl.style.top + '';
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    var currStyle = dragEl.currentStyle || window.getComputedStyle(dragEl, null);
    headerEl.onmousedown = function (e) {
      // 鼠标按下，计算当前元素距离可视区的距离
      dragEl.className += ' el-dialog--move';
      var disX = e.clientX - headerEl.offsetLeft;
      var disY = e.clientY - headerEl.offsetTop;

      // 获取到的值带px 正则匹配替换
      var styL = void 0,
          styT = void 0,
          minL = void 0,
          maxL = void 0,
          minT = void 0,
          maxT = void 0,
          marginL = void 0;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (currStyle.left.indexOf('%') > -1) {
        styL = +document.body.clientWidth * (+currStyle.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+currStyle.top.replace(/\%/g, '') / 100);
      } else {
        styL = +currStyle.left.replace(/\px/g, '');
        styT = +currStyle.top.replace(/\px/g, '');
      };
      marginL = Math.abs(currStyle.marginLeft.replace(/\px/g, ''));
      // 边距10px
      var mg = 10;
      minL = marginL + mg;
      minT = mg;
      maxL = document.body.clientWidth - dragEl.clientWidth - mg + marginL;
      maxT = document.body.clientHeight - dragEl.clientHeight - mg;
      document.onmousemove = function (e) {
        // 移动时禁止文本选中
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 通过事件委托，计算移动的距离
        var l = e.clientX - disX + styL;
        var t = e.clientY - disY + styT;
        // window.console.log('3:' + l + ':' + t);
        // window.console.log('4:' + disX + ':' + disY);
        // 移动当前元素
        if (l >= minL && l <= maxL) {
          dragEl.style.left = l + 'px';
        }
        if (t >= minT && t <= maxT) {
          dragEl.style.top = t + 'px';
        }
        vnode.context.updatePopper();
        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      };

      document.onmouseup = function (e) {
        dragEl.className = dragEl.className.replace(' el-dialog--move', '');
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});
// CONCATENATED MODULE: ./packages/dialog/src/directive2.js
/* harmony default export */ var directive2 = ({
  bind: function bind(el, binding, vnode, oldVnode) {
    if (!binding.value) {
      return;
    }
    var resizeEl = el.querySelector('.el-dialog');
    // 设置与上边框2个像素的边距，避免弹出框标题可拖拽时的影响
    var headerEl = el.querySelector('.el-dialog__header');
    headerEl.style.marginTop = '2px';
    headerEl.style.marginRight = '2px';
    headerEl.style.marginLeft = '2px';
    // 默认属性
    var defaultOptions = {
      minHeight: vnode.context.minHeight, // 判断窗口最小高度
      minWidth: vnode.context.minWidth, // 判断窗口最小宽度
      edge: 5, // 鼠标与边框距离多少时出现调整指针
      maxWidth: document.body.clientWidth,
      maxHeight: document.body.clientHeight,
      mg: 10
    };
    vnode.context.initResizing = false; // 是否处于拉伸调整中
    vnode.context.resizeAviliable = false; // 鼠标指针是否处于边框位置允许可调整
    // 弹出框-鼠标移动事件
    function handleMouseMove(event) {
      var target = resizeEl;
      if (!target) {
        return;
      }
      if (!vnode.context.initResizing) {
        var rect = target.getBoundingClientRect();
        var bodyStyle = document.body.style;
        var scrollTop = window.scrollTop ? window.scrollTop : window.pageYOffset;
        // 判断鼠标所在方位
        if (Math.abs(rect.right - event.pageX) < defaultOptions.edge) {
          bodyStyle.cursor = 'col-resize';
          target.style.cursor = 'col-resize';
          vnode.context.dir = 'e';
          vnode.context.resizeAviliable = true;
        } else if (Math.abs(rect.left - event.pageX) < defaultOptions.edge) {
          bodyStyle.cursor = 'col-resize';
          target.style.cursor = 'col-resize';
          vnode.context.dir = 'w';
          vnode.context.resizeAviliable = true;
        } else if (Math.abs(rect.top - (event.pageY - scrollTop)) < defaultOptions.edge) {
          bodyStyle.cursor = 'row-resize';
          target.style.cursor = 'row-resize';
          vnode.context.dir = 'n';
          vnode.context.resizeAviliable = true;
        } else if (Math.abs(rect.bottom - (event.pageY - scrollTop)) < defaultOptions.edge) {
          bodyStyle.cursor = 'row-resize';
          target.style.cursor = 'row-resize';
          vnode.context.dir = 's';
          vnode.context.resizeAviliable = true;
        } else {
          bodyStyle.cursor = '';
          target.style.cursor = '';
          vnode.context.dir = '';
          vnode.context.resizeAviliable = false;
        }
      }
    };
    // 弹出框-鼠标点击【按下】事件
    function handleMouseDown(event) {
      if (!vnode.context.resizeAviliable) {
        return;
      }
      // 重新获取窗口最小尺寸，以支持最小尺寸的动态修改
      defaultOptions.minHeight = vnode.context.minHeight;
      defaultOptions.minWidth = vnode.context.minWidth;
      vnode.context.initResizing = true;
      // 初始值
      var currStyle = resizeEl.currentStyle || window.getComputedStyle(resizeEl, null);
      var resizeElStyle = resizeEl.getBoundingClientRect();
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      var startLeft, startTop;
      if (currStyle.left.indexOf('%') > -1) {
        startLeft = +document.body.clientWidth * (+currStyle.left.replace(/\%/g, '') / 100);
        startTop = +document.body.clientHeight * (+currStyle.top.replace(/\%/g, '') / 100);
      } else {
        startLeft = +currStyle.left.replace(/\px/g, '');
        startTop = +currStyle.top.replace(/\px/g, '');
      };
      var startPositons = {
        pageX: event.pageX,
        pageY: event.pageY,
        left: startLeft,
        top: startTop,
        width: resizeElStyle.width,
        height: resizeElStyle.height
      };
      // 文档-鼠标移动事件
      var handleDocMouseMove = function handleDocMouseMove(event) {
        var target = resizeEl;
        if (!target) {
          return;
        };
        // 与浏览器可视窗口距离defaultOptions.mg以下时不再允许放大
        if (event.clientX < defaultOptions.mg || event.clientY < defaultOptions.mg || event.clientX > defaultOptions.maxWidth - defaultOptions.mg || event.clientY > defaultOptions.maxHeight - defaultOptions.mg) {
          return;
        }
        // 移动时禁止文本选中
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

        var deltaX = event.pageX - startPositons.pageX; // X方向变化
        var deltaY = event.pageY - startPositons.pageY; // Y方向变化
        // 根据初始与当前位置调整弹出框
        if (vnode.context.dir === 'e') {
          var _width = startPositons.width + deltaX;
          _width = Math.min(Math.max(_width, defaultOptions.minWidth), defaultOptions.maxWidth - 2 * defaultOptions.mg);
          resizeEl.style.width = _width + 'px';
        }
        if (vnode.context.dir === 'w') {
          var _width2 = startPositons.width - deltaX;
          if (_width2 >= defaultOptions.minWidth && _width2 <= defaultOptions.maxWidth) {
            resizeEl.style.width = _width2 + 'px';
            resizeEl.style.left = startPositons.left + deltaX + 'px';
          }
        }
        if (vnode.context.dir === 's') {
          var _height = startPositons.height + deltaY;
          _height = Math.min(Math.max(_height, defaultOptions.minHeight), defaultOptions.maxHeight - 2 * defaultOptions.mg);
          resizeEl.style.height = _height + 'px';
          if (resizeEl.querySelector('.el-dialog__footer')) {
            resizeEl.querySelector('.el-dialog__body').style.height = _height - 131 + 'px';
          } else {
            resizeEl.querySelector('.el-dialog__body').style.height = _height - 70 + 'px';
          }
        }
        if (vnode.context.dir === 'n') {
          var _height2 = startPositons.height - deltaY;
          if (_height2 >= defaultOptions.minHeight && _height2 <= defaultOptions.maxHeight) {
            resizeEl.style.height = _height2 + 'px';
            if (resizeEl.querySelector('.el-dialog__footer')) {
              resizeEl.querySelector('.el-dialog__body').style.height = _height2 - 131 + 'px';
            } else {
              resizeEl.querySelector('.el-dialog__body').style.height = _height2 - 70 + 'px';
            }
            resizeEl.style.top = startPositons.top + deltaY + 'px';
          }
        }
      };
      // 文档-鼠标点击【弹起】事件
      var handleDocMouseUp = function handleDocMouseUp(e) {
        if (vnode.context.initResizing) {
          document.body.style.cursor = '';
          vnode.context.dir = '';
          vnode.context.initResizing = false;
          // table.resizeProxyVisible = false;
        }
        // 文档-解绑事件
        document.removeEventListener('mousemove', handleDocMouseMove);
        document.removeEventListener('mouseup', handleDocMouseUp);
      };
      // 文档-绑定事件
      document.addEventListener('mousemove', handleDocMouseMove);
      document.addEventListener('mouseup', handleDocMouseUp);
    }
    // 弹出框-鼠标移出事件
    function handleMouseOut(event) {
      document.body.style.cursor = '';
    }
    // 弹出框-绑定事件
    resizeEl.addEventListener('mousemove', handleMouseMove);
    resizeEl.addEventListener('mousedown', handleMouseDown);
    resizeEl.addEventListener('mouseout', handleMouseOut);
  }
});
// EXTERNAL MODULE: ./src/utils/event-bus.js
var event_bus = __webpack_require__(48);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/dialog/src/component.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





// 弹出框内，若包含使用popver的组件，例如：下拉框，日期框，下拉树等。使用event-bus传递事件，拖动时更新位置。event-bus非特殊情况，误乱用。


/* harmony default export */ var componentvue_type_script_lang_js_ = ({
  name: 'ElDialog',
  xtype: 'YuDialog',

  mixins: [popup_default.a, emitter_default.a],

  directives: {
    drag: directive,
    resize: directive2
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: false
    },

    closeOnPressEscape: {
      type: Boolean,
      default: false
    },

    showClose: {
      type: Boolean,
      default: true
    },

    size: {
      type: String,
      default: 'small'
    },

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15%'
    },
    beforeClose: Function,
    draggable: {
      type: Boolean,
      default: true
    },
    resizeable: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: Number,
      default: 200
    },
    minWidth: {
      type: Number,
      default: 300
    },
    center: {
      type: Boolean,
      default: false
    },
    // 默认关闭弹框时，销毁子组件实例
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    // 弹出框是否垂直居中
    middle: {
      type: Boolean,
      default: true
    },
    headerCustomBtns: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },

  data: function data() {
    return {
      key: 0,
      adjustHeight: 0
    };
  },


  watch: {
    visible: function visible(val) {
      var _this2 = this;

      var _this = this;
      this.$emit('update:visible', val);
      if (val) {
        this.$emit('open');
        this.$el.addEventListener('scroll', this.updatePopper);
        this.$nextTick(function () {
          var ml = -_this2.$refs.dialog.clientWidth / 2 + 'px';
          if (_this2.size !== 'full') {
            _this2.$refs.dialog.style.marginLeft = ml;
          }
          _this2.$refs.dialog.scrollTop = 0;
          if (_this2.draggable) {
            _this2.$el.style.position = '';
          }
          if (_this2.middle) {
            setTimeout(function () {
              var height = document.body.clientHeight;
              var adjust = _this.$refs.dialog.clientHeight;
              var headerHeight = _this.$refs.header.clientHeight;
              var footerHeight = _this.$refs.footer ? _this.$refs.footer.clientHeight : 0;
              if (adjust > height) {
                _this.adjustHeight = height - headerHeight - footerHeight - 50;
                _this.$refs.dialog.style.top = '10px';
              } else {
                var top = height / 2 - adjust / 2;
                _this.$refs.dialog.style.top = top + 'px';
                _this.adjustHeight = 0;
              }
            }, 0);
          }
        });
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        this.adjustHeight = 0;
        if (this.draggable) {
          this.$el.style.position = '';
          var dragEl = this.$refs.dialog;
          dragEl.style.left = this.initDragLeft;
          dragEl.style.top = this.initDragTop;
        }

        this.$el.removeEventListener('scroll', this.updatePopper);
        this.$emit('close');
        if (this.appendToBody && this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el);
        }
        if (this.destroyOnClose) {
          this.$nextTick(function () {
            _this2.key++;
          });
        }
      }
    }
  },

  computed: {
    sizeClass: function sizeClass() {
      return 'el-dialog--' + this.size;
    },
    style: function style() {
      return this.size === 'full' ? { position: 'static' } : { 'top': this.top };
    },
    styleBody: function styleBody() {
      return this.adjustHeight ? { height: this.adjustHeight + 'px', overflow: 'hidden', overflowY: 'auto' } : {};
    }
  },

  methods: {
    handleWrapperClick: function handleWrapperClick() {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose: function handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide: function hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('visible-change', false);
      }
    },
    updatePopper: function updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper');
      this.broadcast('ElDropdownMenu', 'updatePopper');
      event_bus["a" /* EventBus */].$emit('updatePopper');
    },
    afterEnter: function afterEnter() {
      this.$emit('opened');
    },
    afterLeave: function afterLeave() {
      this.$emit('closed');
    }
  },

  mounted: function mounted() {
    if (this.visible) {
      this.rendered = true;
      this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.removeEventListener('scroll', this.updatePopper);
  },
  destroyed: function destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
});
// CONCATENATED MODULE: ./packages/dialog/src/component.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_componentvue_type_script_lang_js_ = (componentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/dialog/src/component.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_componentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/dialog/src/component.vue"
/* harmony default export */ var src_component = (component.exports);
// CONCATENATED MODULE: ./packages/dialog/index.js


/* istanbul ignore next */
src_component.install = function (Vue) {
  Vue.component(src_component.name, src_component);
};

/* harmony default export */ var dialog = __webpack_exports__["default"] = (src_component);

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/popup");

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventBus; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
// event-bus.js

var EventBus = new vue__WEBPACK_IMPORTED_MODULE_0___default.a();

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ })

/******/ });