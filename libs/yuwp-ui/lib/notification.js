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
/******/ 	return __webpack_require__(__webpack_require__.s = 159);
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

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(8);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/notification/src/main.vue?vue&type=template&id=43dbc3d8&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "el-notification-fade" } }, [
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
        class: ["el-notification", _vm.customClass, _vm.horizontalClass],
        style: _vm.positionStyle,
        on: {
          mouseenter: function($event) {
            return _vm.clearTimer()
          },
          mouseleave: function($event) {
            return _vm.startTimer()
          },
          click: _vm.click
        }
      },
      [
        _vm.special
          ? _c("div", { staticClass: "el-notification__special" }, [
              _vm.picUrl
                ? _c("img", { attrs: { src: _vm.picUrl } })
                : _c(
                    "svg",
                    {
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        "xmlns:xlink": "http://www.w3.org/1999/xlink",
                        viewBox: "0 0 121.23 180.02"
                      }
                    },
                    [
                      _c("defs", [
                        _c(
                          "mask",
                          {
                            attrs: {
                              id: "a",
                              x: "15.49",
                              y: "24.47",
                              width: "72.51",
                              height: "66.26",
                              maskUnits: "userSpaceOnUse"
                            }
                          },
                          [
                            _c(
                              "g",
                              { attrs: { transform: "translate(0 3.37)" } },
                              [
                                _c("path", {
                                  staticStyle: { fill: "#fff" },
                                  attrs: {
                                    d: "M52.23,21.12a33,33,0,1,0,.73,0h-.73"
                                  }
                                })
                              ]
                            )
                          ]
                        ),
                        _c(
                          "mask",
                          {
                            attrs: {
                              id: "b",
                              x: "19.81",
                              y: "24.47",
                              width: "66.27",
                              height: "66.26",
                              maskUnits: "userSpaceOnUse"
                            }
                          },
                          [
                            _c(
                              "g",
                              { attrs: { transform: "translate(0 3.37)" } },
                              [
                                _c("path", {
                                  staticStyle: { fill: "#fff" },
                                  attrs: {
                                    d: "M52.23,21.12a33,33,0,1,0,.73,0h-.73"
                                  }
                                })
                              ]
                            )
                          ]
                        ),
                        _c(
                          "mask",
                          {
                            attrs: {
                              id: "c",
                              x: "19.81",
                              y: "19.37",
                              width: "66.27",
                              height: "71.36",
                              maskUnits: "userSpaceOnUse"
                            }
                          },
                          [
                            _c(
                              "g",
                              { attrs: { transform: "translate(0 3.37)" } },
                              [
                                _c("path", {
                                  staticStyle: { fill: "#fff" },
                                  attrs: {
                                    d: "M52.23,21.12a33,33,0,1,0,.73,0h-.73"
                                  }
                                })
                              ]
                            )
                          ]
                        ),
                        _c(
                          "mask",
                          {
                            attrs: {
                              id: "d",
                              x: "10.91",
                              y: "0",
                              width: "82.31",
                              height: "90.73",
                              maskUnits: "userSpaceOnUse"
                            }
                          },
                          [
                            _c(
                              "g",
                              { attrs: { transform: "translate(0 3.37)" } },
                              [
                                _c("path", {
                                  staticStyle: { fill: "#fff" },
                                  attrs: {
                                    d: "M52.23,21.12a33,33,0,1,0,.73,0h-.73"
                                  }
                                })
                              ]
                            )
                          ]
                        ),
                        _c(
                          "mask",
                          {
                            attrs: {
                              id: "e",
                              x: "13.65",
                              y: "3.59",
                              width: "76.76",
                              height: "87.14",
                              maskUnits: "userSpaceOnUse"
                            }
                          },
                          [
                            _c(
                              "g",
                              { attrs: { transform: "translate(0 3.37)" } },
                              [
                                _c("path", {
                                  staticStyle: { fill: "#fff" },
                                  attrs: {
                                    d: "M52.23,21.12a33,33,0,1,0,.73,0h-.73"
                                  }
                                })
                              ]
                            )
                          ]
                        ),
                        _c(
                          "mask",
                          {
                            attrs: {
                              id: "f",
                              x: "19.81",
                              y: "22.46",
                              width: "66.27",
                              height: "68.27",
                              maskUnits: "userSpaceOnUse"
                            }
                          },
                          [
                            _c(
                              "g",
                              { attrs: { transform: "translate(0 3.37)" } },
                              [
                                _c("path", {
                                  staticStyle: { fill: "#fff" },
                                  attrs: {
                                    d: "M52.23,21.12a33,33,0,1,0,.73,0h-.73"
                                  }
                                })
                              ]
                            )
                          ]
                        )
                      ]),
                      _c("title", [_vm._v("yu-doll")]),
                      _c("path", {
                        staticStyle: { fill: "#717171" },
                        attrs: {
                          d:
                            "M121.23,166.24c0,5.75-22.86,10.41-51,10.41S19.12,172,19.12,166.24,42,155.83,70.18,155.83s51.05,4.66,51.05,10.41",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f9e4db" },
                        attrs: {
                          d:
                            "M116.8,68.93c.81-2.27,1.43-3.86,1.77-5.23,1.06-4.23-1.89-3.78-1.89-3.78l-3.59,6.87c-1.58,2.65-3.19,2.45-4.6,3.72-3,2.71-2.82,4.78-3.35,5.6L87,84.88l1.84,2.36,3.41,7.15,16.13-11.11s6.86,1.7,9-1.31a13.68,13.68,0,0,0,2-9.49c-.11-1.07-2.59-3.3-2.51-3.55",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M116.8,68.93l1.68.59c.79-2.25,1.42-3.84,1.81-5.39a8.42,8.42,0,0,0,.29-2.06,4.5,4.5,0,0,0-.38-1.89,3.38,3.38,0,0,0-1.73-1.73,3.8,3.8,0,0,0-1.56-.32,3.08,3.08,0,0,0-.5,0l-.89.13-4,7.67,1.58.82-1.53-.91a5.19,5.19,0,0,1-.88,1.14,5.08,5.08,0,0,1-1.33.86,9.11,9.11,0,0,0-2,1.3,11.28,11.28,0,0,0-3.07,4.17,13.22,13.22,0,0,0-.48,1.43c0,.17-.08.3-.11.37l0,.06.34.15-.32-.2,0,0,.34.15-.32-.2,1.5,1-.77-1.6L84.21,84.23l3.08,4L91.51,97l17.85-12.3-1-1.46L107.92,85a20.63,20.63,0,0,0,4.5.54,11.43,11.43,0,0,0,3.32-.45,6.52,6.52,0,0,0,1.64-.75A5.26,5.26,0,0,0,118.79,83a14.38,14.38,0,0,0,2.42-8.39,22.12,22.12,0,0,0-.13-2.33,3.28,3.28,0,0,0-.3-1A7.45,7.45,0,0,0,120,70c-.43-.56-.89-1.08-1.24-1.47-.17-.19-.31-.35-.37-.43l0,0-.63.46.69-.37-.06-.09-.63.46.69-.37-1.3.69,1.39-.47c0-.11-.07-.17-.09-.22l-1.3.69,1.39-.47-1.58.54h1.67a1.92,1.92,0,0,0-.09-.54l-1.58.54h-.07l1.62.63a1.7,1.7,0,0,0,.12-.63h-1.74l1.62.63v-.06l-1.68-.59-1.65-.65A1.9,1.9,0,0,0,115,69a1.84,1.84,0,0,0,.11.61,2.24,2.24,0,0,0,.23.47,3.51,3.51,0,0,0,.34.45c.37.45.89,1,1.31,1.52a7.84,7.84,0,0,1,.48.66l.09.16h0l.63-.22-.66.07,0,.15.63-.22-.66.07a17.88,17.88,0,0,1,.11,1.94A10.89,10.89,0,0,1,115.88,81a1.46,1.46,0,0,1-.44.41,3.7,3.7,0,0,1-1.26.47,9.7,9.7,0,0,1-1.76.15,16.6,16.6,0,0,1-2.55-.22c-.35-.05-.63-.11-.82-.15l-.21,0h-.06l-.78-.19L92.93,91.75l-2.6-5.45-.61-.78,16.65-8,.28-.42a5.22,5.22,0,0,0,.52-1.31,7.21,7.21,0,0,1,.63-1.66,8.38,8.38,0,0,1,1.87-2.27,3.76,3.76,0,0,1,.75-.5,16.09,16.09,0,0,0,1.92-1.09,8.08,8.08,0,0,0,2.27-2.54l0,0,3.61-6.91-1.57-.82.27,1.76-.13-.82.07.82H117l-.13-.82.07.82H117l0-.11-.07.09,0,0,0-.11-.07.09.13-.17-.17.14,0,0,.13-.17-.17.14.06,0-.07,0v0l.06,0-.07,0a1.16,1.16,0,0,1,.06.44,4.79,4.79,0,0,1-.18,1.2c-.29,1.19-.9,2.77-1.71,5.07l1.67.59-1.65-.65Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f9e4db" },
                        attrs: {
                          d:
                            "M110.88,70.63l6.33,3.07s-.73,2.68-5.2,1.66c0,0,.32,3.46-3.84,3.4",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M110.1,72.23l6.34,3.07.77-1.6-1.71-.47.85.23-.83-.31,0,.08.85.23-.83-.31a.78.78,0,0,1-.27.32,2.16,2.16,0,0,1-1.37.34,7.07,7.07,0,0,1-1.47-.18L110,73.08l.21,2.44.75-.07-.75,0v0l.75-.07-.75,0v0a2.61,2.61,0,0,1,0,.4,1.24,1.24,0,0,1-.37.66,1.39,1.39,0,0,1-.47.26,3.68,3.68,0,0,1-1.08.15h-.09a1.78,1.78,0,1,0,0,3.56h.13a6.43,6.43,0,0,0,2.84-.59,4.6,4.6,0,0,0,2.28-2.43,5.51,5.51,0,0,0,.4-2,1.81,1.81,0,0,0,0-.32l-1.77.16-.39,1.73a10.16,10.16,0,0,0,2.26.28,6.31,6.31,0,0,0,2.37-.43,4.63,4.63,0,0,0,2.09-1.61,3.69,3.69,0,0,0,.59-1.16l.38-1.43L111.66,69a1.79,1.79,0,0,0-2.38.83,1.77,1.77,0,0,0,.82,2.37",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f9e4db" },
                        attrs: {
                          d:
                            "M61.06,138,50.2,145.92l-1,12.53S35,165.82,38.5,155c.74-2.32-.4-16.58,1.51-17.89,10.87-7.47,14-6.56,14-6.56l2.52.26Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1a2451" },
                        attrs: {
                          d:
                            "M61.06,138l-1-1.44L48.49,145l-1.05,13.34,1.78.14-.82-1.58,0,0c-.23.11-1.39.69-2.84,1.23a14,14,0,0,1-4.35,1,3.42,3.42,0,0,1-.81-.09c-.3-.09-.38-.16-.45-.25a1.42,1.42,0,0,1-.18-.87,7.89,7.89,0,0,1,.46-2.39,5.55,5.55,0,0,0,.19-.86,39.81,39.81,0,0,0,.19-4.24c0-2.55,0-5.63.12-8.13a24.69,24.69,0,0,1,.31-3.1,4.72,4.72,0,0,1,.21-.79l0-.06h0l-.35-.2.3.26,0-.06-.35-.2.3.26-.73-.62.54.79.19-.17-.73-.62.54.79a53.06,53.06,0,0,1,9.35-5.38,9.75,9.75,0,0,1,3.29-.91h.07l.12-1-.28,1,.16,0,.12-1-.28,1,.15,0,1.81.19,4,6.47,1.5-.94-1-1.44,1,1.44,1.51-.94-5-7.95-3.38-.35L54,130.53l.49-1.71a3.23,3.23,0,0,0-.88-.1A12.61,12.61,0,0,0,49,129.9a56.12,56.12,0,0,0-10,5.73,2.67,2.67,0,0,0-.87,1,6.49,6.49,0,0,0-.63,1.94,31.71,31.71,0,0,0-.4,4.29c-.09,2.39-.07,5.06-.08,7.29,0,1.12,0,2.12-.07,2.9,0,.39,0,.72-.08,1a1.82,1.82,0,0,1,0,.3l0,.08v0a11.47,11.47,0,0,0-.64,3.48,5.41,5.41,0,0,0,.39,2.1,4.11,4.11,0,0,0,2,2.14,6,6,0,0,0,2.59.52,13,13,0,0,0,3.1-.43A30.41,30.41,0,0,0,50,160l.88-.45,1-12.69,11.54-8.42-.87-1.4Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M29.05,162.71l21.84-2.42a22.81,22.81,0,0,1-.28,2.75c-.48,2.47-3,2.15-4.73,3.35-1.13.81-2.16,1.8-3.29,2.61-3.61,2.11-12.43,2.8-15.59-.4-1-1.28-.72-3.39,0-4.75.51-.87,1.21-.55,2.05-1.14",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M50.09,162.13c.08,1.36-.54,2.28-2.64,2.84-1.86.5-2.89,1.63-4.33,2.79-2.22,1.78-5.16,2.23-7.94,2.38-2.19.05-7.49-.16-8.1-2.91-.16-.84,0-3,.92-3.41a4.52,4.52,0,0,0,1.26-.49l21-2.32c0,.38-.07.76-.12,1.12",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#c8c8c9" },
                        attrs: {
                          d:
                            "M50.09,162.13a5.23,5.23,0,0,1,0,.56c-1,1.07-2.77,1-4.15,1.92-1.13.81-2.34,2-3.47,2.83-3.58,2.12-12.16,2.94-15.39-.19v0c-.16-.84,0-3,.92-3.41a4.52,4.52,0,0,0,1.26-.49l21-2.32c0,.38-.07.76-.12,1.12",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M48.23,163.11c-2.81,1-1.53.23-5.24,3.31-4.14,3.45-19,3.53-16.25-3.85,1.21-3.2,3.18-2.4,8.2-8.11a5.8,5.8,0,0,0,.11-.85c.2-2.32.32-2.76,1-3.17a7.83,7.83,0,0,1,8.36.63,3.25,3.25,0,0,1,1.22,3.52l-1.73,1.15c.86,2.17,2.22,4.14,4.34,7.37",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M41.55,166.59C38,168.3,31.18,169,27.94,166.26a3.65,3.65,0,0,1,.18-4.85,7.3,7.3,0,0,1,4.21-1.18c4.16.07,8.23,2,9.69,6.1Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M32.63,159.6A20.62,20.62,0,0,0,34.42,156,23.31,23.31,0,0,1,30,159.88a9,9,0,0,1,2.66-.28",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M33.29,159.64A17.46,17.46,0,0,0,35,156a26.61,26.61,0,0,0,.76-3.65c.08-.55-.11-2,3.8-2.27,3.32-.21,5,1.71,5.43,2.7s.15,1.32.15,1.32a8.51,8.51,0,0,0-3.47,2.39,25.53,25.53,0,0,0-2.71,5,12.05,12.05,0,0,0-4.78-1.7,5.32,5.32,0,0,0-.88-.12",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M33.29,159.64A17.46,17.46,0,0,0,35,156a1.69,1.69,0,0,1,.1-.34,12.65,12.65,0,0,1-.86,3.54,15.24,15.24,0,0,1,2.31.2,4,4,0,0,1,1.92.8,33.89,33.89,0,0,1,3.69-5.82,4.55,4.55,0,0,1,3-1.28,1.36,1.36,0,0,1,0,1,8.51,8.51,0,0,0-3.47,2.39,25.53,25.53,0,0,0-2.71,5,12.05,12.05,0,0,0-4.78-1.7,5.32,5.32,0,0,0-.88-.12",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M47.56,156.43s-.43-1.84-1.22-2.33-2.23-.54-4.32,1.69a20.71,20.71,0,0,0-3.27,5.53,9.12,9.12,0,0,1,2.92,2.83Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M47.19,156.72s-.38-1.61-1.06-2-1.94-.46-3.76,1.47a19.26,19.26,0,0,0-3.1,5.5,9.36,9.36,0,0,1,2.28,2.3l.06.06Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M48.23,163.11c-2.81,1-1.53.23-5.24,3.31l-.21.17a9.48,9.48,0,0,0-2.52-4.12c1.19-2.18,3.27-5.42,5-6.09s2.69-.08,3.46-.16c.59.06,1.06-.61,1.22-1.07a13.24,13.24,0,0,0,.16-3,9.34,9.34,0,0,1,1.11,5.65c-.28,3.6-.18,4.3-3,5.29",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M50.45,154s.13,2.06-1,2.54-2.75-.83-5,1a16.34,16.34,0,0,0-3.76,5.33,9.63,9.63,0,0,1,1.85,3,23,23,0,0,0,2.25-1.9c1-1.07,2-1.12,3.57-1.64s2-1.06,2.31-3.13a18.58,18.58,0,0,0,.08-4,4,4,0,0,0-.32-1.27",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#c8c8c9" },
                        attrs: {
                          d:
                            "M41.55,166.59C38,168.3,31.18,169,27.94,166.26a3.26,3.26,0,0,1-.66-1.1,15.5,15.5,0,0,0,7,1.89,13,13,0,0,0,7.37-1.67,10,10,0,0,1,.39,1Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M42.17,165c.14.3.28.6.39.9a23,23,0,0,0,2.25-1.9c1-1.07,2-1.12,3.57-1.64a2.67,2.67,0,0,0,2-1.57c-.34.13-.7.23-1.13.36-1.72.52-4,.85-5.71,2.66A12,12,0,0,1,42.17,165",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M48.58,162.34l.43-.18a36.89,36.89,0,0,0,1.3-4.24c.2-.84.35-1.62.5-2.34l0-.27a2.9,2.9,0,0,0-.2-.94,35.26,35.26,0,0,1-2,8",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M44,167.51a11,11,0,0,0,.25-1.22c0-.51.15-.84.26-.29a3,3,0,0,1,0,1.15Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M50.11,162.09c-.06,1.14-.76,1.95-2.64,2.46a7.8,7.8,0,0,0-3.14,1.79,1.4,1.4,0,0,0,0-.36,8,8,0,0,1,3.16-1.81c1.69-.45,2.41-1.15,2.59-2.1Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M37.46,151.82c-.28.93-1.19,4.19-1.41,5.49s.41,3.09,2.28.42,3.22-4.54,3.63-5.29.06-1.91-1.76-1.93-2.46.39-2.74,1.31",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#dadbdb" },
                        attrs: {
                          d:
                            "M37.18,151.39c1.06-.81,5.58-.73,5.94.7.15.6-1.39,2.16-2,3-1.12-.89-4-1-5-.61,0,0,.24-1,.44-1.72s.24-1,.68-1.34",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M37.87,151.1a8,8,0,0,1,4,.06,1.21,1.21,0,0,1,.07,1.28c-.23.41-.76,1.2-1.5,2.28a8.51,8.51,0,0,0-3.69-.42c.26-1.05.55-2,.69-2.48a1.75,1.75,0,0,1,.41-.72",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M46.05,157.72a7.66,7.66,0,0,0-3.13,3.1c-.77,1.46-.52,2.91,1.37,1.53a8.1,8.1,0,0,1,3.93-1.57c.52-.11.66-.74.87-1.95s-1.65-2-3-1.11",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M40.87,159.89c.25.13.3.54.1.91s-.57.56-.82.42-.3-.54-.1-.91.57-.56.82-.42",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M41.94,158.25a.7.7,0,0,1,.08.95c-.23.38-.61.53-.86.4s-.3-.58-.1-1a.72.72,0,0,1,.88-.39",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M42.92,156.9a.68.68,0,0,1,0,.93.66.66,0,0,1-.88.31.65.65,0,0,1-.05-.91.68.68,0,0,1,.88-.33",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M44.13,155.58a.64.64,0,0,1,0,.91.58.58,0,1,1-.93-.64.69.69,0,0,1,.9-.27",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M33.08,157.43c.17.11.13.52,0,.89s-.48.56-.63.42-.13-.53.07-.88.47-.56.61-.43",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M34,155.83c.17.13.13.56-.07.91s-.5.53-.65.4-.1-.57.1-.93.48-.53.62-.38",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#9e9d9f" },
                        attrs: {
                          d:
                            "M32.64,158.5a12.23,12.23,0,0,1,4.18.66,9.45,9.45,0,0,1,3.4,1.77c.29.26.78-.57.52-.88,0,0-.19-.73-3.49-1.85s-4.41-.5-4.41-.5c-.26.05-.43.9-.2.8",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M40.45,160.49c.34-.84-3.16-2-3.58-2.15s-4-1.11-4-.13a9.2,9.2,0,0,1,1.17.08,14,14,0,0,1,6.37,2.32Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#9e9d9f" },
                        attrs: {
                          d:
                            "M33.65,156.92a12.29,12.29,0,0,1,4.18.66,9.56,9.56,0,0,1,3.4,1.77c.26.26.78-.57.51-.88,0,0-.18-.73-3.48-1.83s-4.42-.52-4.42-.52c-.25.06-.43.9-.19.8",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M41.45,158.91c.35-.84-3.16-2-3.58-2.13s-3.74-1-4-.19a5.81,5.81,0,0,1,1,0A13.8,13.8,0,0,1,41.34,159Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#9e9d9f" },
                        attrs: {
                          d:
                            "M34.4,155.44a13.27,13.27,0,0,1,4.32.67,9.12,9.12,0,0,1,3.4,1.76c.29.26.79-.57.54-.85,0,0-.21-.75-3.5-1.85a9.39,9.39,0,0,0-3.94-.3c-.87.18-.93.61-.82.57",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M38.37,155.29a8.78,8.78,0,0,0-2.8-.13,12.55,12.55,0,0,1,6.69,2.4c.33-.4-.06-.64-.4-.87a11.16,11.16,0,0,0-3.49-1.4",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#9e9d9f" },
                        attrs: {
                          d:
                            "M43.42,156.55a10,10,0,0,0-5.32-2.2c-2.88-.12-3.39.44-3.39.44s0-.28.49-.75,3.35-1,5.73-.07,3,1.82,3,1.82a.6.6,0,0,1,0,.53c-.13.22-.39.32-.49.23",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M35.82,154.06a8.26,8.26,0,0,1,6.59.91c.08.05,1.85,1.06,1.12,1.33a9.67,9.67,0,0,0-8.08-2.08,1.22,1.22,0,0,1,.37-.16",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f9e4db" },
                        attrs: {
                          d:
                            "M86.14,140.86l13.32,17.89s13.2,2.17,7.79-7.85C101.14,139.58,91,128.23,91,128.23l-8.54,7.48Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1a2451" },
                        attrs: {
                          d:
                            "M86.14,140.86l-1.42,1.07,13.74,18.45.71.12a20.42,20.42,0,0,0,3,.22,12.29,12.29,0,0,0,4.9-.87,5.65,5.65,0,0,0,2.26-1.76,5.09,5.09,0,0,0,1-3.06,10.65,10.65,0,0,0-1.52-5,119.82,119.82,0,0,0-10.58-15.83c-3.34-4.3-5.9-7.16-5.92-7.19l-1.17-1.31-11.08,9.71,4.64,6.47,0,0,1.42-1.07,1.45-1L84.83,136l7.33-6.43L91,128.23l-1.33,1.18.11.12c1.09,1.24,10.33,11.85,15.91,22.22a7.28,7.28,0,0,1,1.09,3.28,1.48,1.48,0,0,1-.26.95,1.66,1.66,0,0,1-.57.48,5,5,0,0,1-1.65.55,12.15,12.15,0,0,1-2.08.16,16.75,16.75,0,0,1-1.78-.09l-.52-.06-.13,0h0l-.28,1.76,1.42-1.06L87.57,139.8l-1.43,1.06,1.45-1Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M116.83,161.69,95,159.25a23.24,23.24,0,0,0,.28,2.75c.48,2.46,3,2.15,4.72,3.35,1.13.81,2.16,1.8,3.29,2.61,3.61,2.12,12.43,2.82,15.6-.37,1-1.29.72-3.4,0-4.76-.52-.87-1.21-.55-2-1.14",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M95.79,161.09c-.08,1.36.54,2.27,2.63,2.84,1.86.5,2.9,1.63,4.33,2.8,2.22,1.77,5.16,2.23,8,2.38,2.18.06,7.48-.15,8.09-2.9.17-.83,0-3-.91-3.41a4.58,4.58,0,0,1-1.27-.49L95.67,160c0,.38.07.76.12,1.12",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#c8c8c9" },
                        attrs: {
                          d:
                            "M95.79,161.09a5,5,0,0,0,0,.55c1,1.07,2.76,1,4.15,1.93,1.13.81,2.33,2,3.46,2.84,3.59,2.11,12.16,3,15.39-.18v0c.17-.83,0-3-.91-3.41a4.58,4.58,0,0,1-1.27-.49L95.67,160c0,.38.07.76.12,1.12",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M97.65,162.07c2.8,1,1.53.23,5.23,3.32,4.14,3.45,19,3.54,16.26-3.84-1.21-3.2-3.17-2.4-8.19-8.12a5.67,5.67,0,0,1-.11-.84c-.2-2.33-.32-2.77-1-3.17a7.84,7.84,0,0,0-8.36.61,3.25,3.25,0,0,0-1.22,3.52l1.73,1.16a44.66,44.66,0,0,1-4.35,7.36",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M104.33,165.55c3.57,1.72,10.36,2.38,13.61-.31a3.65,3.65,0,0,0-.18-4.85,7.27,7.27,0,0,0-4.21-1.19c-4.16.07-8.23,2-9.7,6.09Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M113.25,158.58a21.4,21.4,0,0,1-1.78-3.59,23.16,23.16,0,0,0,4.44,3.86,9.39,9.39,0,0,0-2.66-.27",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M112.6,158.62a17.83,17.83,0,0,1-1.71-3.64,26.23,26.23,0,0,1-.74-3.64c-.09-.55.1-2-3.81-2.28-3.31-.22-5,1.7-5.43,2.69s-.15,1.32-.15,1.32a8.62,8.62,0,0,1,3.47,2.39,26.33,26.33,0,0,1,2.7,5,12.21,12.21,0,0,1,4.78-1.7,6.76,6.76,0,0,1,.89-.11",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M112.6,158.62a17.83,17.83,0,0,1-1.71-3.64,1.06,1.06,0,0,0-.09-.33,12.81,12.81,0,0,0,.85,3.53,15.24,15.24,0,0,0-2.31.2,4,4,0,0,0-1.92.8,33.62,33.62,0,0,0-3.68-5.82,4.51,4.51,0,0,0-2.95-1.29,1.34,1.34,0,0,0,0,1,8.62,8.62,0,0,1,3.47,2.39,26.33,26.33,0,0,1,2.7,5,12.21,12.21,0,0,1,4.78-1.7,6.76,6.76,0,0,1,.89-.11",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M98.33,155.39s.43-1.84,1.22-2.33,2.23-.53,4.32,1.69a20.71,20.71,0,0,1,3.26,5.54,9.12,9.12,0,0,0-2.92,2.83Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M98.7,155.68s.37-1.61,1.06-2,1.94-.46,3.76,1.48a19.76,19.76,0,0,1,3.1,5.5,9.21,9.21,0,0,0-2.29,2.29l-.06.07Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M97.65,162.07c2.8,1,1.53.23,5.23,3.32l.22.16a9.36,9.36,0,0,1,2.52-4.11c-1.19-2.19-3.26-5.43-5-6.1s-2.7-.08-3.46-.17c-.6.06-1.06-.6-1.22-1.06a16.62,16.62,0,0,0-1.6-2.76s0,1.85.32,5.43.18,4.3,3,5.29",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M95.43,153s-.12,2.06,1,2.54,2.76-.83,5,1a16.33,16.33,0,0,1,3.75,5.33,9.56,9.56,0,0,0-1.86,3,24.83,24.83,0,0,1-2.24-1.91c-1-1.07-2-1.12-3.57-1.64s-2-1.07-2.31-3.14a20.12,20.12,0,0,1-.08-4,4.34,4.34,0,0,1,.32-1.26",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#c8c8c9" },
                        attrs: {
                          d:
                            "M104.33,165.55c3.57,1.72,10.36,2.38,13.61-.31a3.62,3.62,0,0,0,.66-1.1,15.54,15.54,0,0,1-7,1.89,13,13,0,0,1-7.37-1.68c-.14.3-.28.62-.4.94Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M103.71,164c-.14.31-.28.61-.4.91a24.83,24.83,0,0,1-2.24-1.91c-1-1.07-2-1.12-3.57-1.64a2.64,2.64,0,0,1-2-1.58c.34.14.7.24,1.13.37,1.72.52,4,.85,5.71,2.67a11.05,11.05,0,0,0,1.33,1.18",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M97.3,161.3l-.43-.18a36.89,36.89,0,0,1-1.29-4.24c-.2-.85-.35-1.62-.5-2.34l0-.28a3,3,0,0,1,.21-.94,34.62,34.62,0,0,0,2,8",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M101.92,166.48a7.8,7.8,0,0,1-.25-1.22c0-.51-.16-.85-.27-.29a3,3,0,0,0,0,1.14Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M95.77,161.05c.06,1.14.76,1.95,2.64,2.46a7.7,7.7,0,0,1,3.13,1.79,2.1,2.1,0,0,1,0-.36,7.91,7.91,0,0,0-3.15-1.81c-1.69-.46-2.41-1.16-2.59-2.1Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M108.43,150.8c.28.92,1.19,4.18,1.4,5.49s-.41,3.08-2.28.41-3.21-4.55-3.62-5.3-.06-1.91,1.77-1.92,2.45.39,2.73,1.32",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#dadbdb" },
                        attrs: {
                          d:
                            "M108.72,150.36c-1.07-.81-5.59-.74-5.94.69-.16.6,1.38,2.17,2,3,1.12-.88,4-1,5-.6,0,0-.25-1-.44-1.72s-.24-1-.67-1.34",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M108,150.07a8,8,0,0,0-4,.06,1.19,1.19,0,0,0-.07,1.27c.23.42.76,1.21,1.49,2.29a8.42,8.42,0,0,1,3.7-.41c-.26-1.06-.55-2-.69-2.48a1.82,1.82,0,0,0-.4-.73",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M99.83,156.68a7.62,7.62,0,0,1,3.13,3.11c.77,1.46.52,2.91-1.37,1.52a8.1,8.1,0,0,0-3.93-1.57c-.52-.11-.66-.75-.87-2s1.66-2,3-1.11",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M105,158.85c-.25.14-.3.54-.1.92s.57.55.82.42.3-.54.1-.92-.57-.55-.82-.42",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M103.94,157.21a.71.71,0,0,0-.07,1,.72.72,0,0,0,.86.4.71.71,0,0,0,.09-1,.73.73,0,0,0-.88-.4",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M103,155.86a.7.7,0,0,0-.06.94.67.67,0,0,0,.88.31.66.66,0,0,0,.06-.91.69.69,0,0,0-.88-.34",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M101.76,154.54a.66.66,0,0,0,0,.92.67.67,0,0,0,.88.27.66.66,0,0,0,.06-.92.7.7,0,0,0-.9-.27",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M112.8,156.41c-.16.11-.13.51,0,.89s.49.55.63.42.13-.53-.07-.89-.46-.55-.61-.42",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M111.84,154.8c-.16.14-.13.56.07.91s.51.54.65.41.11-.58-.09-.93-.48-.54-.63-.39",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#9e9d9f" },
                        attrs: {
                          d:
                            "M113.24,157.47a12.4,12.4,0,0,0-4.18.67,9.36,9.36,0,0,0-3.4,1.75c-.29.27-.78-.57-.52-.87,0,0,.19-.73,3.49-1.85s4.42-.5,4.42-.5c.25.06.43.9.19.8",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M105.43,159.46c-.34-.84,3.17-2,3.58-2.15s4-1.1,4-.13a11.3,11.3,0,0,0-1.16.08,14.07,14.07,0,0,0-6.38,2.32Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#9e9d9f" },
                        attrs: {
                          d:
                            "M112.24,155.89a12.52,12.52,0,0,0-4.18.66,9.35,9.35,0,0,0-3.4,1.76c-.27.27-.79-.57-.52-.87,0,0,.19-.73,3.49-1.83s4.41-.52,4.41-.52c.26.06.43.9.2.8",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M104.43,157.87c-.34-.83,3.16-2,3.58-2.12s3.75-1,4-.19a5.7,5.7,0,0,0-1,.05,13.8,13.8,0,0,0-6.44,2.39Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#9e9d9f" },
                        attrs: {
                          d:
                            "M111.49,154.41a13.67,13.67,0,0,0-4.33.67,9.31,9.31,0,0,0-3.4,1.75c-.29.27-.78-.56-.53-.85,0,0,.21-.75,3.5-1.84a9.39,9.39,0,0,1,3.94-.3c.87.19.93.61.82.57",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M107.52,154.26a8.78,8.78,0,0,1,2.8-.13,12.57,12.57,0,0,0-6.7,2.39c-.33-.39.07-.64.4-.86a11.08,11.08,0,0,1,3.5-1.4",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#9e9d9f" },
                        attrs: {
                          d:
                            "M102.47,155.52a9.88,9.88,0,0,1,5.32-2.2c2.88-.11,3.39.44,3.39.44s0-.27-.5-.74-3.34-1.05-5.72-.08-3,1.81-3,1.81a.63.63,0,0,0,0,.53c.14.23.4.33.5.24",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M110.07,153a8.26,8.26,0,0,0-6.59.91c-.08,0-1.85,1.05-1.13,1.33a9.7,9.7,0,0,1,8.09-2.08,1.22,1.22,0,0,0-.37-.16",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M98.65,135.74s-3.85,9.28-16.76,9.5l-11.77-7.92-11.55,8.6c-6.56,0-11.54-3.17-16.52-12.22,0,0,3.62-2.72,12-5.66,0,0,22,7.94,36.44-1.81,0,0,4.31,2.49,8.16,9.51",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1a2451" },
                        attrs: {
                          d:
                            "M98.65,135.74,97,135.06l.92.37-.91-.38h0l.92.37-.91-.38,0,.08a13.81,13.81,0,0,1-3.62,4.45,17.94,17.94,0,0,1-11.49,3.89l0,1.77,1-1.47-12.81-8.63L57.51,144.5l1.06,1.42v-1.77a12.82,12.82,0,0,1-7.82-2.39c-2.38-1.7-4.73-4.53-7.15-8.92l-1.55.86,1.06,1.42-.2-.27.2.27h0l-.2-.27.2.27c.08-.06,3.58-2.61,11.52-5.4L54.05,128l-.61,1.67a61.66,61.66,0,0,0,18.89,3.15c6.27,0,13.23-1.17,19.16-5.16l-1-1.47-.89,1.54.35-.6-.35.59h0l.35-.6-.35.59c.05,0,3.94,2.36,7.49,8.83l1.56-.85L97,135.06l1.65.68,1.55-.86c-4-7.36-8.6-10.07-8.81-10.19l-1-.56-.92.63c-5.09,3.43-11.33,4.56-17.17,4.55a57.13,57.13,0,0,1-12.44-1.48c-1.63-.37-3-.74-3.86-1l-1-.33-.26-.09-.07,0h0l-.6-.22-.59.21c-8.55,3-12.34,5.81-12.48,5.92l-1.23.92.74,1.35c2.57,4.67,5.2,7.95,8.19,10.1a16.41,16.41,0,0,0,9.89,3h.59l11-8.2L81.36,147h.56a21.3,21.3,0,0,0,14.38-5.3,16.52,16.52,0,0,0,4-5.3l.32-.79-.41-.75Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f9e4db" },
                        attrs: {
                          d:
                            "M49.17,92.64s-8.47,5-11,6.67-16.59,15.3-21,17-12.1,2.42-12.1,2.42-1.25,2.53,3.38,2.61c11.55.21,13.46.65,16.83,3.09,1.37,1,3.72,2.6,5.38,1,0,0-2-3.15-2.87-5a131.06,131.06,0,0,1,10-8.51c4.72-3.51,14.39-8.09,14.39-8.09Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M49.17,92.64l-.9-1.53-4.56,2.72c-2.44,1.47-5.18,3.13-6.5,4-.44.3-.94.71-1.6,1.26-2.27,1.92-6.17,5.5-10,8.79-1.91,1.64-3.79,3.21-5.4,4.44-.81.61-1.55,1.14-2.18,1.54a9.09,9.09,0,0,1-1.43.79,39.27,39.27,0,0,1-7.32,1.75c-1.21.19-2.29.33-3.07.42l-.91.11L5,117l-1,.09-.44.89a3.47,3.47,0,0,0-.34,1.51,3.13,3.13,0,0,0,.3,1.35,3.59,3.59,0,0,0,1.85,1.74,8.13,8.13,0,0,0,3.13.58,74.33,74.33,0,0,1,11.18.68,10.19,10.19,0,0,1,2.5.76,12.74,12.74,0,0,1,2.14,1.31,15.2,15.2,0,0,0,1.93,1.24,6.38,6.38,0,0,0,2.82.77,4.11,4.11,0,0,0,1.51-.28,4.22,4.22,0,0,0,1.4-.91l1-1-.77-1.22-.31-.51c-.3-.47-.76-1.23-1.23-2s-.94-1.64-1.24-2.25l-1.59.79,1.22,1.29.23-.21a123.28,123.28,0,0,1,9.59-8.17,74.12,74.12,0,0,1,8.72-5.21c1.49-.78,2.83-1.45,3.8-1.93l1.15-.56.41-.2,1.35-.63-4-14.92-2,1.18.9,1.53-1.71.47,3,11.23,1.71-.47-.76-1.6S49,103.43,46,105a76.09,76.09,0,0,0-9.2,5.5c-4.84,3.61-10.11,8.63-10.14,8.65l-.94.91.58,1.17c.49,1,1.21,2.24,1.83,3.27s1.12,1.83,1.12,1.83l1.51-.94-1.24-1.27-.22.14-.21,0a2.81,2.81,0,0,1-1.18-.38,12.94,12.94,0,0,1-1.49-1,16.49,16.49,0,0,0-2.72-1.66A16.69,16.69,0,0,0,18.22,120c-2.31-.25-5.32-.35-9.66-.44a6.72,6.72,0,0,1-1.41-.15,1.78,1.78,0,0,1-.43-.16l0,0h0l-.22.22.29-.11-.07-.11-.22.22.29-.11-.29.12h.32l0-.12-.29.12h.32l-.64-.23.61.3,0-.07-.64-.23.61.3-1.6-.78.17,1.76s2-.18,4.53-.59A42.16,42.16,0,0,0,17.89,118a13.55,13.55,0,0,0,2.39-1.32c1.51-1,3.29-2.41,5.18-4,2.83-2.35,5.9-5.08,8.47-7.36,1.28-1.14,2.43-2.17,3.36-3,.46-.4.86-.75,1.19-1s.59-.46.7-.54c1.18-.79,3.94-2.46,6.36-3.92L48.72,95l1.36-.81-.91-1.53-1.71.47Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M44.23,92.65,79.4,85l12-5a20.2,20.2,0,0,1,3.85,7.25c.64,2.14,1.77,7.52.68,10-5.21,2.94-10.64,5.88-10.64,5.88l6.1,23.16A63.94,63.94,0,0,1,75,133h0l-.42.09-.42.1h0C65.1,135,49.74,129,49.74,129s1.36-11.1.83-13.81c-1.64-8.45-6.34-22.49-6.34-22.49",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1a2451" },
                        attrs: {
                          d:
                            "M44.23,92.65l.38,1.74,35.32-7.65,12.15-5-.68-1.65-1.31,1.2.42-.38-.42.38h0l.42-.38-.42.38a18.68,18.68,0,0,1,3.46,6.56,26.7,26.7,0,0,1,1.06,6.62,5.66,5.66,0,0,1-.3,2.1l1.62.73-.88-1.55c-2.59,1.47-5.25,2.94-7.25,4l-2.43,1.33-.93.5-1.23.66,6.46,24.51,1.72-.45-.93-1.52h0a62.28,62.28,0,0,1-15.84,6.44l-1.8.43.51,1.79L75,133l-.39-1.73-.41.09h0l-.42.1.39,1.73L76,132.9h0L75.68,131l-1.85.37a18.23,18.23,0,0,1-3.52.31,51.93,51.93,0,0,1-13.18-2.2c-2-.56-3.66-1.11-4.85-1.53l-1.4-.5-.37-.14-.12,0L49.74,129l1.77.21s.24-2,.48-4.45.48-5.48.48-7.66a12.78,12.78,0,0,0-.15-2.25c-.85-4.34-2.44-10-3.83-14.58s-2.57-8.12-2.57-8.13l-1.69.56.38,1.74-.38-1.74-1.68.57.2.61c.46,1.39,1.63,5,2.86,9.16s2.52,8.9,3.22,12.49a9.55,9.55,0,0,1,.09,1.57c0,1.93-.23,4.89-.47,7.32-.12,1.22-.24,2.31-.32,3.1s-.15,1.26-.15,1.26l-.17,1.36,1.28.51s3,1.17,7.08,2.33a55.53,55.53,0,0,0,14.14,2.34,20.87,20.87,0,0,0,4.23-.39l-.35-1.74-1.76.25h0l.27,1.9,1.87-.42.42-.09h0l.43-.09,1.84-.41-.52-1.82L75,133l.42,1.72a65.36,65.36,0,0,0,16.87-6.87l1.13-.69L87,102.69l-1.71.45.84,1.56s5.45-2.94,10.67-5.9l.51-.28.24-.54a8.89,8.89,0,0,0,.61-3.55A29.84,29.84,0,0,0,97,86.79a21.8,21.8,0,0,0-4.24-7.94l-.84-.91-13,5.39-36.95,8,.63,1.88Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M103.92,63.91a3.57,3.57,0,0,1-3.71,3.42l-4.95-.2a3.58,3.58,0,0,1-3.42-3.71l1.09-26.58a3.57,3.57,0,0,1,3.71-3.42l5,.21A3.57,3.57,0,0,1,105,37.34Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M101.05,34l-1.32-.05a3.57,3.57,0,0,1,3.42,3.71l-1.09,26.57a3.57,3.57,0,0,1-3.71,3.42l1.33.05a3.57,3.57,0,0,0,3.71-3.42l1.09-26.57A3.58,3.58,0,0,0,101.05,34",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M.75,59.7a3.57,3.57,0,0,0,3.42,3.71l4.95.21a3.57,3.57,0,0,0,3.71-3.42l1.09-26.58a3.57,3.57,0,0,0-3.42-3.71l-4.95-.2a3.57,3.57,0,0,0-3.71,3.42Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M5.52,30.46a2.82,2.82,0,0,0-2.93,2.7L1.5,59.73a2.82,2.82,0,0,0,2.7,2.93l5,.21a2.82,2.82,0,0,0,2.93-2.7l1.09-26.58a2.83,2.83,0,0,0-2.7-2.93ZM9.09,64.37l-4.95-.21A4.32,4.32,0,0,1,0,59.67L1.09,33.1A4.32,4.32,0,0,1,5.58,29l4.95.2a4.33,4.33,0,0,1,4.14,4.49L13.58,60.23A4.32,4.32,0,0,1,9.09,64.37Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M96.61,34.17a2.82,2.82,0,0,0-2.93,2.7L92.59,63.45a2.83,2.83,0,0,0,2.71,2.93l4.94.2a2.82,2.82,0,0,0,2.93-2.7l1.09-26.57a2.83,2.83,0,0,0-2.7-2.94Zm3.57,33.91-5-.2a4.33,4.33,0,0,1-4.14-4.49l1.09-26.58a4.33,4.33,0,0,1,4.49-4.14l5,.21a4.32,4.32,0,0,1,4.14,4.48l-1.09,26.58A4.32,4.32,0,0,1,100.18,68.08Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M98.52,48A45.5,45.5,0,1,1,54.91.66,45.49,45.49,0,0,1,98.52,48",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M54.62,7.84A45.51,45.51,0,0,1,97,42.44c1.21-3.8,1.13,12.1,1.3,7.93a45.5,45.5,0,0,0-90.93-3.7c-.17,4.38,1.09-11.27,2.08-7.21A45.53,45.53,0,0,1,54.62,7.84",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#63a9dc" },
                        attrs: {
                          d:
                            "M54.84,2.48A45.5,45.5,0,0,1,98.47,49c0-.27,0-.54,0-.81A45.5,45.5,0,0,0,7.59,44.45c0,.27,0,.54,0,.82A45.49,45.49,0,0,1,54.84,2.48",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M54.77,1.59A44.74,44.74,0,0,0,20,76.62,44.74,44.74,0,1,0,85.85,16,44.47,44.47,0,0,0,54.77,1.59M51.06,92.5A46.24,46.24,0,0,1,21.6,12.29a46.25,46.25,0,1,1,62.69,68A46,46,0,0,1,51.06,92.5",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#63a9dc" },
                        attrs: {
                          d:
                            "M102,53.29a.27.27,0,0,1-.29.27.27.27,0,0,1-.26-.29l.4-9.75a.28.28,0,0,1,.55,0Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#63a9dc" },
                        attrs: {
                          d:
                            "M102.54,42.25a.36.36,0,1,1-.71,0,.36.36,0,1,1,.71,0",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#63a9dc" },
                        attrs: {
                          d:
                            "M3.41,49.28a.28.28,0,0,1-.29.26.27.27,0,0,1-.27-.29l.4-9.75a.27.27,0,0,1,.29-.26.27.27,0,0,1,.26.29Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#63a9dc" },
                        attrs: {
                          d:
                            "M3.93,38.23a.34.34,0,0,1-.36.34.37.37,0,0,1-.35-.37.37.37,0,0,1,.37-.34.36.36,0,0,1,.34.37",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M89.53,15.89s-1.84-2.47-3.85-2.71-2.38,4.08-2.38,4.08Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#63a9dc" },
                        attrs: {
                          d:
                            "M85,13.31a1.53,1.53,0,0,1,.43-.13,9.62,9.62,0,0,1,2,3.18l-2,.44A10.43,10.43,0,0,1,85,13.31",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M83.3,17.26c-.48,1.77.4,8.4,1.67,8.86s5,0,5.59-1.41.22-8.63-1.3-9-5.63.36-6,1.6",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M83.44,17.4c-.46,1.7.39,8.09,1.6,8.53s4.84,0,5.39-1.36.22-8.31-1.25-8.72-5.42.35-5.74,1.55",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M84.09,18.05c-.37,1.4.32,6.67,1.33,7s4,0,4.44-1.12.34-6.46-.86-6.8-4.64-.1-4.91.89",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M85.09,19.12c-.24.89.2,4.21.83,4.44s2.52,0,2.8-.71.22-4.08-.54-4.28-2.93-.07-3.09.55",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M89.6,19.44s.08-1.16-.42-1.52-1.37-.54-1.42,0,.69.16,1.26.46a1.33,1.33,0,0,1,.58,1.1",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M87.13,17.8a.28.28,0,0,1-.26.31.27.27,0,1,1-.08-.52.28.28,0,0,1,.34.21",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M85.25,25.6a2.81,2.81,0,0,0,.77.11h0c1.66.07,3.59-.49,3.84-1.11a13.77,13.77,0,0,0,.1-4.3c-.24-2.72-.78-3.65-.94-3.76l-.22-.19a6.08,6.08,0,0,0-3.22-2.26h0c-.77,0-1.37,2-1.49,3.41l0,.13A13.83,13.83,0,0,0,84.18,22c.34,2.24.83,3.38,1.07,3.59M86,27.21A4.23,4.23,0,0,1,84.7,27c-.32-.12-1.3-.48-2-4.52a16.56,16.56,0,0,1-.18-5.17c.07-.73.58-4.82,3-4.72h.17c1.84.23,3.44,1.9,4.12,2.71.8.57,1.33,2.18,1.57,4.77a14.67,14.67,0,0,1-.2,5.08c-.65,1.62-3.59,2.12-5.29,2.05",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d: "M19.08,13s2-2.31,4.06-2.39,2,4.26,2,4.26Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#63a9dc" },
                        attrs: {
                          d:
                            "M23.83,10.82a1.54,1.54,0,0,0-.42-.17,9.82,9.82,0,0,0-2.24,3l2,.6a10.47,10.47,0,0,0,.7-3.44",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M25.18,14.89c.33,1.81-1.08,8.34-2.38,8.7s-5-.41-5.46-1.86.48-8.63,2-8.92,5.58.82,5.81,2.08",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M25,15c.32,1.73-1,8-2.29,8.37S17.91,23,17.48,21.6s.46-8.31,1.95-8.59,5.38.79,5.6,2",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M24.33,15.61c.26,1.43-.87,6.62-1.9,6.91s-4-.33-4.34-1.48.19-6.47,1.42-6.71,4.63.27,4.82,1.28",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M23.25,16.6c.16.9-.54,4.18-1.19,4.36s-2.51-.21-2.74-.94.11-4.08.89-4.23,2.93.18,3,.81",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M18.73,16.55s0-1.16.54-1.48,1.4-.42,1.42.07-.7.11-1.3.36a1.32,1.32,0,0,0-.66,1.05",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M21.32,15.12a.31.31,0,0,0,.59.14.31.31,0,0,0-.59-.14",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M23.22,11.55h0a6,6,0,0,0-3.39,2l-.24.17c-.17.09-.78,1-1.25,3.67a13.6,13.6,0,0,0-.24,4.29c.2.64,2.08,1.36,3.73,1.42a3,3,0,0,0,.78,0,8.62,8.62,0,0,0,1.36-3.5,14.1,14.1,0,0,0,.52-4.35v-.13c0-1.42-.45-3.49-1.21-3.52m-1.5,13c-1.7-.07-4.59-.8-5.11-2.47A14.63,14.63,0,0,1,16.83,17c.45-2.57,1.11-4.12,2-4.63.74-.75,2.48-2.29,4.33-2.36h.17c2.46.1,2.64,4.22,2.65,4.95a16.31,16.31,0,0,1-.61,5.14c-1,4-2,4.25-2.33,4.35a4.38,4.38,0,0,1-1.27.1",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M62.22,103a4.77,4.77,0,0,1,4.4-2.53c3.27,0,3.26,2.89,2.69,3.27a1.86,1.86,0,0,1-2.74-.38c-1.08-1.3-3.95-.64-4.35-.36",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M68.84,101a4.77,4.77,0,0,1,4.46,2.41c1.73,2.79-.74,4.3-1.36,4a1.86,1.86,0,0,1-1.12-2.54c.54-1.59-1.53-3.69-2-3.88",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M74,106a4.77,4.77,0,0,1-.37,5.06c-1.83,2.72-4.22,1.09-4.22.41a1.88,1.88,0,0,1,1.86-2.07c1.68-.16,2.74-2.91,2.73-3.4",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M72.26,112.72A4.77,4.77,0,0,1,67.71,115c-3.27-.2-3.07-3.09-2.48-3.43a1.85,1.85,0,0,1,2.71.55c1,1.36,3.9.89,4.32.63",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M65.46,114.38a4.76,4.76,0,0,1-4.32-2.66c-1.58-2.88,1-4.25,1.58-3.93a1.87,1.87,0,0,1,1,2.6c-.63,1.56,1.32,3.77,1.76,4",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M60.28,109.42a4.76,4.76,0,0,1,.48-5c1.89-2.67,4.24-1,4.23-.3a1.87,1.87,0,0,1-1.9,2c-1.69.13-2.81,2.84-2.81,3.33",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M67.19,107.22s-.81.13-.62.7a1.55,1.55,0,0,0,2.48.77,2.28,2.28,0,0,1-2.8.82c-1.63-.84-1-3.54.94-2.29",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M65.51,106.72a1.29,1.29,0,0,1,1.53-.3c.84.47,1.1,1.62.23,1.71a1.13,1.13,0,0,0,1.86-.13c.88-1.21-2-3.69-3.62-1.28",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M61.86,117.67l.31-.19.22.3.1.16-.27.16,2-.38.15.78-.33.07-.09-.47-3.14.61.09.46-.35.07-.15-.78,1.82-.35A2.85,2.85,0,0,0,61.86,117.67Zm-1.28,2.64,2-.39-.12-.65-1.43.27-.06-.31,3.09-.6.06.31-1.33.26.12.66,1.81-.35,0,.3-1.8.34.16.82c.09.35-.07.57-.49.65l-.59.12c0-.08-.06-.18-.11-.29l0-.06.6-.1c.23,0,.32-.15.27-.36l-.14-.71-2,.38Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M66.88,119.62l.14.72,1.74-.34-.14-.71Zm-.38-.23,2.39-.46.29,1.51-.33.06,0-.24-1.74.34.05.24-.33.06Zm-.17-.67,2.46-.47.06.29-2.46.48Zm-.13-.67,2.46-.48.06.3-2.46.47Zm.7-1.31.25-.19.19.22.17.23-.17.13,1.45-.28.06.29-3,.57,0-.29,1.38-.27C67.12,117,67,116.88,66.9,116.74Zm-2,2.37a6.7,6.7,0,0,0,.54-2.21l.35,0,0,.15a7.45,7.45,0,0,1-.18.93l.59,3-.32.06-.46-2.37a6.33,6.33,0,0,1-.29.72Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M71.08,116.49l.17-.25.24.14.62.34-.17.29C71.72,116.86,71.43,116.69,71.08,116.49Zm0,1.05.15-.24.32.17.55.29-.18.29-.53-.33Zm1.07-1.91.33-.06.5,2.56.64-.2.1.29-.69.21.24,1.21-.33.06-.23-1.18-1.58.46-.1-.29,1.62-.48Zm-2.87,1.83.7-.13-.12-.63-.33.1-.27.09-.14-.3c.54-.15,1.07-.32,1.57-.5l.18.29-.5.15-.21.08.13.66.68-.14,0,.3-.67.13.1.52.17-.23.33.21.3.19-.19.27a5.2,5.2,0,0,0-.6-.4l.38,2-.31.06-.36-1.87a4.5,4.5,0,0,1-.38,1.22c-.07-.11-.14-.22-.22-.33a5,5,0,0,0,.45-1.57l-.68.14Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M77.25,116.59l-1.33.26a2.91,2.91,0,0,0,.86,1A2.88,2.88,0,0,0,77.25,116.59Zm-1.94.38,0-.28,1.07-.21-.12-.64-1.1.21,0-.29,1.09-.21-.13-.68.33-.06.13.67,1.15-.22.05.29-1.14.23.12.64.9-.18,0,.26a4.15,4.15,0,0,1-.55,1.51,3.25,3.25,0,0,0,1.25.3l-.06.08c-.07.14-.11.23-.13.28a5.82,5.82,0,0,1-1.28-.38,5.39,5.39,0,0,1-1.18.93l-.29-.25a4.59,4.59,0,0,0,1.2-.88,3.35,3.35,0,0,1-1-1.18Zm-1.5.61.57-.31-.17-.88-.56.11-.05-.3.55-.11-.16-.81.33-.06.16.81.49-.09,0,.29-.48.09.15.8.44-.24c0,.13.06.24.08.32l-.13.06-.32.19.25,1.29a.41.41,0,0,1-.38.57l-.34.09-.07-.17-.09-.18a2.1,2.1,0,0,0,.38-.06c.15,0,.2-.09.16-.23l-.22-1.14-.54.3Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("polygon", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          points:
                            "62.56 125.84 62.15 126.78 62.26 127.35 62.1 127.38 61.99 126.81 61.28 126.09 61.45 126.06 61.96 126.58 62.02 126.64 62.05 126.67 62.07 126.61 62.09 126.55 62.36 125.88 62.56 125.84"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M63.44,122.69l.14,0,.2,1-.15,0,0-.14a.45.45,0,0,1-.31.24c-.23,0-.37-.06-.42-.31l-.12-.66.14,0,.13.64c0,.18.13.26.29.24a.32.32,0,0,0,.24-.35Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M64.21,122.65c-.14,0-.2.1-.2.2s.12.13.32.13.4.07.43.23-.09.31-.36.37a.4.4,0,0,1-.49-.21l.14-.07a.26.26,0,0,0,.33.17c.17,0,.24-.11.22-.22s-.11-.14-.29-.14-.42-.06-.45-.23.09-.3.32-.36a.37.37,0,0,1,.44.2l-.15.07a.22.22,0,0,0-.26-.14",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M65.45,123.42c0,.23-.12.34-.26.35H65v-.1h.1l.15-.17,0-.15-.58-.9.16,0,.42.71,0,0,0,0h0v-.07l.14-.84.16,0c-.13.67-.2,1.06-.22,1.16",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M66.18,122.27c-.14,0-.2.1-.2.2s.12.13.32.13.4.07.42.23-.08.31-.35.37a.4.4,0,0,1-.49-.21l.14-.07a.27.27,0,0,0,.33.17c.16,0,.24-.11.22-.22s-.11-.14-.29-.14-.43-.06-.45-.23.09-.3.31-.36a.37.37,0,0,1,.45.2l-.15.07a.22.22,0,0,0-.26-.14",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("polygon", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          points:
                            "68.25 124.74 68.28 124.87 67.8 124.96 68.05 126.22 67.89 126.25 67.64 125 67.17 125.09 67.14 124.96 68.25 124.74"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M68.69,122.12l.6-.11a.31.31,0,1,0-.6.11m.65.15h.16a.39.39,0,0,1-.38.39.47.47,0,0,1-.58-.42.49.49,0,0,1,.36-.64c.3,0,.49.11.57.46v0l-.78.15c.06.23.18.33.39.3a.28.28,0,0,0,.25-.28",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M70,121.53c-.2,0-.27.2-.22.47s.18.38.38.34.23-.13.21-.31h.16a.37.37,0,0,1-.36.43c-.29.05-.48-.09-.55-.43s.06-.55.34-.62a.41.41,0,0,1,.48.22l-.14.07a.28.28,0,0,0-.3-.17",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M71.45,121.52l.12.64-.15,0-.12-.62c0-.19-.13-.27-.29-.24a.3.3,0,0,0-.23.35l.12.62-.15,0-.27-1.39.15,0,.1.53a.39.39,0,0,1,.29-.24c.24,0,.38,0,.43.32",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M72.52,121.31l.12.65-.14,0-.12-.63q-.06-.27-.3-.24a.32.32,0,0,0-.24.35l.12.62-.14,0-.2-1,.15,0,0,.15a.38.38,0,0,1,.29-.24c.24,0,.38.06.43.32",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M73.14,120.92q-.31.06-.24.48c0,.26.19.38.4.34s.27-.2.23-.47-.2-.37-.39-.35m.18.94a.48.48,0,0,1-.58-.42c-.06-.36.07-.57.38-.64s.49.1.57.44-.06.55-.37.62",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("polygon", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          points:
                            "73.72 123.68 73.86 123.66 74.13 125.04 73.98 125.06 73.72 123.68"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M74.63,120.63c-.21,0-.3.21-.25.49s.19.37.41.33.27-.2.22-.46-.19-.38-.38-.36m.17.94a.48.48,0,0,1-.57-.42c-.06-.36.07-.57.38-.64s.49.1.56.44a.46.46,0,0,1-.37.62",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M76.06,120.81l0-.15a.27.27,0,0,0-.33-.24c-.2,0-.28.2-.24.46s.18.35.37.32S76.1,121,76.06,120.81Zm0-.57.17.88c.09.33,0,.52-.38.57a.46.46,0,0,1-.41-.07l.05-.09a.53.53,0,0,0,.33,0,.3.3,0,0,0,.27-.39l0-.1c0,.12-.13.19-.31.23s-.43-.1-.5-.41.06-.53.34-.6a.38.38,0,0,1,.34.1l0-.14Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M76.37,120.19l.15,0,.19,1-.14,0Zm-.07-.38.14,0,0,.18-.15,0Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M77,120.52l.6-.12a.3.3,0,0,0-.36-.26.31.31,0,0,0-.24.38m.65.15h.16a.41.41,0,0,1-.38.39.47.47,0,0,1-.58-.43c-.06-.35.07-.56.37-.63s.48.1.56.45v0l-.77.15a.33.33,0,0,0,.38.3.27.27,0,0,0,.25-.28",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M78.22,119.94c-.13,0-.19.09-.19.19s.12.13.32.13.4.07.42.24-.08.31-.35.37a.39.39,0,0,1-.49-.22l.14-.07a.28.28,0,0,0,.33.18c.16,0,.24-.12.22-.23s-.11-.14-.29-.13-.43-.06-.45-.24.09-.3.31-.35.37,0,.44.19l-.14.07a.22.22,0,0,0-.27-.13",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M79.4,83.9a2.15,2.15,0,0,1,1.47,3.31c-.54,1-3.47,3.88-8.72,5.64S56,96.72,52.79,96.68c-4.5-.05-7-.92-8.29-1.94-.79-.64-1.48-2.3-.89-3.12s7.93,1.47,17.39-.78c15.21-3.62,17.8-7.06,18.4-6.94",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#2669b2" },
                        attrs: {
                          d:
                            "M52.47,95.37c3.29,0,14.64-2.2,20.09-4A21.09,21.09,0,0,0,81,86.45l-.05.09c-.54,1-3.47,3.88-8.72,5.63S56.05,96,52.87,96c-4.49-.05-7-.93-8.28-1.94a2.36,2.36,0,0,1-.31-.32c1.4.9,3.93,1.61,8.19,1.62",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M51.89,94c3.28,0,14.61-2.27,20.07-4.06a21.91,21.91,0,0,0,8.48-4.78l0,.08c-.55,1-3.51,3.74-8.77,5.48s-16.18,3.88-19.35,3.88c-4.48,0-7-.79-8.23-1.75a1.79,1.79,0,0,1-.32-.3c1.39.84,3.91,1.49,8.16,1.45",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#19274f" },
                        attrs: {
                          d:
                            "M79.72,85.14l-.22-.21a2.19,2.19,0,0,0-.41-.17l-.43.27c-1.61,1-5.88,3.78-17.81,6.62l-.23.06a44.39,44.39,0,0,1-14.55.69,17.6,17.6,0,0,0-2.24-.12,2.54,2.54,0,0,0,.82,2c.79.64,2.87,1.72,7.82,1.77,2,0,7.69-.91,13-2.12,2.49-.58,4.63-1.16,6.17-1.67,5.11-1.71,7.87-4.47,8.29-5.28A1.78,1.78,0,0,0,80,85.37ZM52.45,97.51c-4.06,0-7.09-.77-8.74-2.1-1-.76-1.83-2.66-1.17-3.93l.14-.26.17-.14a1.26,1.26,0,0,1,.52-.25,11.12,11.12,0,0,1,2.83.07,43,43,0,0,0,14.08-.66l.22,0c11.68-2.78,15.8-5.43,17.34-6.42a3.25,3.25,0,0,1,1-.51,1,1,0,0,1,.42,0,3.67,3.67,0,0,1,1.11.43h0a2.92,2.92,0,0,1,.85,4c-.61,1.16-3.65,4.16-9.15,6-1.58.53-3.76,1.12-6.31,1.71C60.31,96.61,54.6,97.54,52.45,97.51Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f9e4db" },
                        attrs: {
                          d:
                            "M86.08,53.92a33.13,33.13,0,1,1-33.84-32.4,33.13,33.13,0,0,1,33.84,32.4",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("g", { staticStyle: { mask: "url(#a)" } }, [
                        _c("path", {
                          staticStyle: { fill: "#f9e4db" },
                          attrs: {
                            d:
                              "M19.49,62.73a1.55,1.55,0,0,0-2.31-.54c-1.55.92-2.22,4.33-1.2,6.47s2.85,8.15,11.86,7.2a20.54,20.54,0,0,0,12.28,8.52c6.35,1.49,7.7,1.49,10.45,1.48.88,0,1.92,0,3.3,0,5.7.2,18.91-.51,24.18-10.19,0,0,8.41-1.42,9.37-7s.9-7-1.33-7.59-3.63-3-5.33.44c0,0,2.78-15.6-5.5-18.27S38.06,28.42,31.34,38,19.49,62.73,19.49,62.73",
                            transform: "translate(0 3.37)"
                          }
                        })
                      ]),
                      _c("g", { staticStyle: { mask: "url(#b)" } }, [
                        _c("path", {
                          staticStyle: { fill: "#edcabe" },
                          attrs: {
                            d:
                              "M21.14,61.74l4.05,5.33s.58.19.12-2.3-1.74-8.62-1.74-8.62l1.19,0s-.55-1.79,0-1.35a4.6,4.6,0,0,1,.82.94l8-5.68,1.26-2.29,0,1.61,3.32-.82S41,46,41.4,45.41l-1.11,2.22s23.31-.85,26-1.71,4.89-1.35,3.7-.73a20.51,20.51,0,0,1-2.43,1.06,4.53,4.53,0,0,0,3.21.72l-.73.67s.42,1.15,3,1.55l1.27.3,2.57,2.11,2.51,2.2.73,2.08L80.17,61l-1.26,6.3,1.48-.82S84.66,54.29,81.6,49s-4.15-9.88-15.19-8.79a46.89,46.89,0,0,1-12-.78c-6.28-1-12.23-2-18.26,1.44-9.75,5.46-15.18,9-15,12.9s-1.76,6.59.07,8",
                            transform: "translate(0 3.37)"
                          }
                        })
                      ]),
                      _c("g", { staticStyle: { mask: "url(#c)" } }, [
                        _c("path", {
                          staticStyle: { fill: "#9d8b7a" },
                          attrs: {
                            d:
                              "M28.67,24s2.83-6.53,12.65-8l0,2.43S50.6,15,59.55,17l-.62,2.31",
                            transform: "translate(0 3.37)"
                          }
                        })
                      ]),
                      _c("g", { staticStyle: { mask: "url(#d)" } }, [
                        _c("path", {
                          staticStyle: { fill: "#2a1711" },
                          attrs: {
                            d:
                              "M72.41,7.24A27.81,27.81,0,0,0,43.87-2.6c-18.77,4.14-32.76,21.69-33,45.91l1.84-3.37s-1.08,5.87.15,8.44l.7-2.05a14,14,0,0,0,5,10.65s5.81,8,6.55,9c0,0-2.66-10.24-2.25-11.22l1.24.19s-1.13-1.24-.89-1.83,1.74.44,2.12,1.74c0,0,6.72-5.43,8-5.72,0,0,.66-2.61,1.48-3l0,2.28,3-.89S41.5,43.6,43,43.21L40.85,46.4s19.24-.47,23.66-1,6.19-2.35,7.55-3.21.6,1.66-3.72,3.6a6.81,6.81,0,0,0,3.53.3,7.66,7.66,0,0,1-1.4,1.53,4.46,4.46,0,0,0,4,.27s1,.41.07.85c0,0,5.62,2.82,6.21,5.71s-.33,10.94-.91,12.12c0,0,9.31-11.5,9.72-20.08,0,0,.76-1.29,1.2.86,0,0,3.43-10.18,2.19-17.84S85.55,6.46,72.41,7.24",
                            transform: "translate(0 3.37)"
                          }
                        })
                      ]),
                      _c("g", { staticStyle: { mask: "url(#e)" } }, [
                        _c("path", {
                          staticStyle: { fill: "#3d1f15" },
                          attrs: {
                            d:
                              "M69.09,7.84S55-5.26,38.42,2.89,13.55,29,13.65,35.39c0-1,3.58-4.61,3.58-4.61s-3.46,9.63-3,12.88c0,0,2.67-6.65,3.61-7.61,0,0-3.61,7.57-.29,14.81s3.83,6.73,3.83,6.73-1.37-7.65.74-10l1.47,2.78s6-2.19,9.06-5.46l2.53-1.07.7,1.59s4.31-3.35,6.92-4l2-.9L44.12,44s16.3,1,21-.54a87.16,87.16,0,0,0,8.18-3s.78,2.37-.41,3.47a20,20,0,0,0,2.44-.31c.55-.17-1.65,2-1.65,2a4.76,4.76,0,0,0,2.85-.46c1.7-.76,4,5.32,4,5.32s2.19,3.88,1.51,6.75c0,0,6.32-8.78,5.56-12.14,0,0,1-1.72,1.84-.77,0,0,7.48-31-20.4-36.45",
                            transform: "translate(0 3.37)"
                          }
                        })
                      ]),
                      _c("g", { staticStyle: { mask: "url(#f)" } }, [
                        _c("path", {
                          staticStyle: { fill: "#492f29" },
                          attrs: {
                            d:
                              "M49.14,19.09S37.05,28.67,36.32,35.84c0,0,8.59-12.26,12.82-16.75",
                            transform: "translate(0 3.37)"
                          }
                        })
                      ]),
                      _c("g", { staticStyle: { mask: "url(#b)" } }, [
                        _c("path", {
                          staticStyle: { fill: "#492f29" },
                          attrs: {
                            d:
                              "M57.31,29S45.76,36.6,45.73,39.17c0,0,2.11-7.52,11.58-10.22",
                            transform: "translate(0 3.37)"
                          }
                        })
                      ]),
                      _c("path", {
                        staticStyle: { fill: "#452b1e" },
                        attrs: {
                          d:
                            "M39.21,62.18a5.11,5.11,0,1,1-5.22-5,5.11,5.11,0,0,1,5.22,5",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#301d15" },
                        attrs: {
                          d:
                            "M37,62.16a2.75,2.75,0,1,1-2.8-2.69A2.74,2.74,0,0,1,37,62.16",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M35,60.85a2.16,2.16,0,1,1-2.2-2.11A2.15,2.15,0,0,1,35,60.85",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M36.68,64.91a.91.91,0,1,1-.92-.88.91.91,0,0,1,.92.88",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M37.48,64.15a.25.25,0,0,1-.5,0,.25.25,0,0,1,.25-.25.24.24,0,0,1,.25.24",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#452b1e" },
                        attrs: {
                          d:
                            "M70.45,61.51a5.11,5.11,0,1,1-5.22-5,5.11,5.11,0,0,1,5.22,5",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#301d15" },
                        attrs: {
                          d:
                            "M68.25,61.49a2.75,2.75,0,1,1-2.8-2.69,2.74,2.74,0,0,1,2.8,2.69",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M66.28,60.18a2.16,2.16,0,1,1-2.2-2.11,2.16,2.16,0,0,1,2.2,2.11",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M67.92,64.24a.91.91,0,1,1-.92-.88.9.9,0,0,1,.92.88",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M68.72,63.48a.25.25,0,0,1-.25.25.25.25,0,0,1,0-.5.26.26,0,0,1,.26.25",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f5babb" },
                        attrs: {
                          d:
                            "M35.71,71.62a2.92,2.92,0,1,1-3-2.85,2.92,2.92,0,0,1,3,2.85",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f5babb" },
                        attrs: {
                          d:
                            "M77.31,70.73a2.92,2.92,0,1,1-3-2.86,2.91,2.91,0,0,1,3,2.86",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#452b1e" },
                        attrs: {
                          d:
                            "M30.62,53.16a2.84,2.84,0,0,1,1.76-3.11c2.24-1.14,7.15-.23,7.28,2.54s-2.22,1.73-3.32,1.76-5.84.18-5.72-1.19",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#452b1e" },
                        attrs: {
                          d:
                            "M62.37,52.47a2.83,2.83,0,0,1,1.76-3.1c2.24-1.15,7.15-.23,7.28,2.54s-2.22,1.73-3.32,1.75-5.84.19-5.72-1.19",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#dc616b" },
                        attrs: {
                          d:
                            "M57.82,71.55c5.1-4.68,8,3.9.29,6.48-5.25,1.76-12-.19-10.91-2,.55-.89,4.19.79,10.62-4.43",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1a2451" },
                        attrs: {
                          d:
                            "M57.82,71.55l.8.87a3.21,3.21,0,0,1,2-1.06.82.82,0,0,1,.69.32,1.75,1.75,0,0,1,.33,1.1c0,1.23-.9,3.1-3.93,4.13a13,13,0,0,1-4.11.63,12.71,12.71,0,0,1-4.17-.65,3.86,3.86,0,0,1-1.08-.55l-.13-.13-.27.17h.31l0-.17-.27.17H47.9l.33.19.05-.19H47.9l.33.19-1-.59,1,.62-.62-.38.39.62.23-.24-.62-.38.39.62-.2-.33.11.37.09,0-.2-.33.11.37a2.3,2.3,0,0,1,.31,0A17.23,17.23,0,0,0,52,76.18a19.52,19.52,0,0,0,6.55-3.72l0,0,0,0-.8-.87-.75-.92a15.81,15.81,0,0,1-7,3.6,19.29,19.29,0,0,1-2,.24,4.66,4.66,0,0,0-.86.14,2,2,0,0,0-.52.24,1.53,1.53,0,0,0-.5.51h0l0,0a2.09,2.09,0,0,0-.26,1,2,2,0,0,0,.31,1.06,3.41,3.41,0,0,0,1.25,1.14,9.39,9.39,0,0,0,2.7,1,16.17,16.17,0,0,0,3.45.36,15.59,15.59,0,0,0,4.87-.75c3.76-1.25,5.55-4,5.54-6.38a4.11,4.11,0,0,0-.86-2.6A3.23,3.23,0,0,0,60.64,69,5.57,5.57,0,0,0,57,70.67l.8.88-.75-.92Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M53.64,86.45a33.13,33.13,0,0,1-33.75-30.6c0,.6,0,1.2,0,1.81a33.13,33.13,0,0,0,66.25-1.43c0-.61,0-1.21-.09-1.81a33.12,33.12,0,0,1-32.4,32",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f8f6f4" },
                        attrs: {
                          d:
                            "M77.1,71.89a2.93,2.93,0,0,1-1.35,1.49,27.59,27.59,0,0,1-10.56,8,.3.3,0,0,0,.12.58h0l.11,0a28.13,28.13,0,0,0,11.85-9.53.31.31,0,0,0-.07-.42l-.11,0",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f8f2f0" },
                        attrs: {
                          d:
                            "M77,71.88a.31.31,0,0,0-.24.13c-.33.47-.68.93-1,1.37a2.93,2.93,0,0,0,1.35-1.49H77",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f8f8f7" },
                        attrs: {
                          d:
                            "M78.35,70.46l-.19-.06A.3.3,0,0,1,78.1,70c.55-.75,1.06-1.53,1.53-2.32a.29.29,0,0,1,.41-.1.31.31,0,0,1,.11.41c-.48.8-1,1.6-1.57,2.36Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f8f6f4" },
                        attrs: {
                          d:
                            "M33,76.5a.42.42,0,0,0-.28.1.45.45,0,0,0-.08.63,16.63,16.63,0,0,0,7.24,5.32l.17,0a.46.46,0,0,0,.15-.88,15.68,15.68,0,0,1-6.85-5A.44.44,0,0,0,33,76.5",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#f8f8f7" },
                        attrs: {
                          d:
                            "M43.33,83.89l-.13,0c-.53-.15-1.06-.33-1.58-.53a.45.45,0,1,1,.32-.84c.5.19,1,.36,1.51.5a.45.45,0,0,1,.31.56.46.46,0,0,1-.43.33",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#05407d" },
                        attrs: {
                          d:
                            "M52.26,22.42A33.13,33.13,0,0,1,86,53c0-.59,0-1.2,0-1.8a33.13,33.13,0,0,0-66.25,1.42c0,.61,0,1.21.09,1.81a33.13,33.13,0,0,1,32.4-32",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M37,24.91a.64.64,0,1,1-.65-.63.63.63,0,0,1,.65.63",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M34.57,26.4a.64.64,0,1,1-.7-.57.63.63,0,0,1,.7.57",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M32.28,28.09a.63.63,0,0,1-.51.75.64.64,0,1,1,.51-.75",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M30.15,30a.64.64,0,1,1-.79-.44.63.63,0,0,1,.79.44",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M28.19,32a.64.64,0,1,1-.83-.37.65.65,0,0,1,.83.37",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M26.42,34.27a.64.64,0,1,1-.86-.3.65.65,0,0,1,.86.3",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M24.84,36.65a.63.63,0,0,1-.22.88.64.64,0,0,1-.88-.23.65.65,0,0,1,.22-.88.64.64,0,0,1,.88.23",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M23.48,39.15a.64.64,0,0,1-.14.9.65.65,0,1,1-.75-1,.64.64,0,0,1,.89.15",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M22.35,41.76a.65.65,0,0,1-.07.91.65.65,0,0,1-.84-1,.65.65,0,0,1,.91.07",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M82.65,40.19a.64.64,0,0,1-.59-.68.65.65,0,0,1,.69-.6.65.65,0,0,1,.59.69.63.63,0,0,1-.69.59",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M81.38,37.65A.65.65,0,1,1,82,37a.65.65,0,0,1-.64.66",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M79.9,35.22a.64.64,0,1,1-.13-1.28.64.64,0,0,1,.13,1.28",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M78.2,32.93A.64.64,0,0,1,78,31.67a.64.64,0,1,1,.24,1.26",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M76.32,30.79a.64.64,0,1,1,.44-.79.63.63,0,0,1-.44.79",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M74.25,28.83a.64.64,0,0,1-.83-.37.64.64,0,1,1,1.2-.45.63.63,0,0,1-.37.82",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d: "M72,27.06a.64.64,0,0,1-.86-.3.64.64,0,1,1,.86.3",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M69.65,25.49a.64.64,0,0,1-.66-1.1.64.64,0,0,1,.88.22.65.65,0,0,1-.22.88",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M67.14,24.13a.64.64,0,0,1-.75-1,.65.65,0,0,1,.9.14.64.64,0,0,1-.15.9",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M64.53,23a.63.63,0,0,1-.9-.06.64.64,0,0,1,.06-.91.65.65,0,0,1,.91.07.64.64,0,0,1-.07.9",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M61.83,22.09a.64.64,0,1,1,0-.91.65.65,0,0,1,0,.91",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M59.06,21.42a.64.64,0,1,1-1-.81.65.65,0,0,1,.9-.09.63.63,0,0,1,.09.9",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M56.24,21a.63.63,0,0,1-.89.17.64.64,0,0,1-.17-.89.65.65,0,0,1,.9-.17.63.63,0,0,1,.16.89",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M53.4,20.83a.63.63,0,0,1-.87.24.64.64,0,0,1-.25-.87.65.65,0,0,1,.88-.25.64.64,0,0,1,.24.88",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M50.56,20.9a.64.64,0,0,1-.85.32.63.63,0,0,1-.33-.84.64.64,0,0,1,1.18.52",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M47.73,21.22a.65.65,0,1,1-.4-.81.64.64,0,0,1,.4.81",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M44.93,21.79a.63.63,0,0,1-.78.46.63.63,0,0,1-.46-.78.64.64,0,0,1,1.24.32",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M42.2,22.6a.63.63,0,0,1-.73.53.64.64,0,0,1-.53-.74.64.64,0,0,1,.73-.53.64.64,0,0,1,.53.74",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#fefefe" },
                        attrs: {
                          d:
                            "M39.55,23.64a.64.64,0,0,1-.68.6.65.65,0,0,1-.6-.69A.65.65,0,0,1,39,23a.65.65,0,0,1,.59.69",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1954a0" },
                        attrs: {
                          d:
                            "M51.89,108.38s-6.62,4.72-8.48,6.22c-.75.6-4.24-1.11-7.63-5.12C31.2,104,32.2,99.82,32.2,99.82L42.75,93s1.57,2.91,6.77,3.59",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#1a2451" },
                        attrs: {
                          d:
                            "M50.85,106.94l-3.55,2.55-2.84,2.08c-.89.66-1.66,1.23-2.17,1.64l.69.86v-1.13a1.1,1.1,0,0,0-.69.27l.69.86v-.84l0-.29h0v.29l0-.29h0a3.67,3.67,0,0,1-.83-.33,17.66,17.66,0,0,1-5-4.26c-2.92-3.48-3.25-6.2-3.26-7.43,0-.27,0-.47,0-.58l0-.11h0l-1-.22,1,.24v0l-1-.22,1,.24-1.73-.41,1,1.5L43.71,94.5l-1-1.49-1.56.84a7.14,7.14,0,0,0,1.9,2.1,12.53,12.53,0,0,0,6.2,2.41,1.77,1.77,0,1,0,.46-3.52,9,9,0,0,1-4.47-1.69,4.83,4.83,0,0,1-.82-.79l-.15-.2v0l-.75.44.76-.41v0l-.75.44.76-.41-.91-1.69L30.63,98.72l-.16.69a6.67,6.67,0,0,0-.14,1.5c0,2,.63,5.63,4.1,9.71A23.29,23.29,0,0,0,39,114.87a11.83,11.83,0,0,0,2,1.14,4.74,4.74,0,0,0,1.93.48,2.38,2.38,0,0,0,1.54-.51c.42-.34,1.18-.91,2-1.56,1.32-1,2.9-2.12,4.16-3l2.19-1.57a1.78,1.78,0,1,0-2.07-2.89",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#c7a398" },
                        attrs: {
                          d:
                            "M49.87,67.86l-.21-.14-.8-2a.22.22,0,0,1,.12-.29.22.22,0,0,1,.29.12l.81,2a.24.24,0,0,1-.13.3Z",
                          transform: "translate(0 3.37)"
                        }
                      }),
                      _c("path", {
                        staticStyle: { fill: "#c7a398" },
                        attrs: {
                          d:
                            "M51.58,67.82l-.21-.13-.81-2a.24.24,0,0,1,.13-.3.23.23,0,0,1,.29.13l.8,2a.22.22,0,0,1-.12.3Z",
                          transform: "translate(0 3.37)"
                        }
                      })
                    ]
                  )
            ])
          : _vm._e(),
        _vm.type || _vm.iconClass
          ? _c("i", {
              staticClass: "el-notification__icon",
              class: [_vm.typeIconClass, _vm.iconClass, _vm.type]
            })
          : _vm._e(),
        _c(
          "div",
          {
            staticClass: "el-notification__group",
            class: [
              _vm.typeClass,
              { "is-with-icon": _vm.typeClass || _vm.iconClass }
            ]
          },
          [
            _c("h2", {
              class: ["el-notification__title", _vm.type],
              domProps: { textContent: _vm._s(_vm.title) }
            }),
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.message,
                    expression: "message"
                  }
                ],
                staticClass: "el-notification__content"
              },
              [
                _vm._t("default", [
                  !_vm.dangerouslyUseHTMLString
                    ? _c("p", [_vm._v(_vm._s(_vm.message))])
                    : _c("p", { domProps: { innerHTML: _vm._s(_vm.message) } })
                ])
              ],
              2
            ),
            _vm.showClose
              ? _c("div", {
                  staticClass: "el-notification__closeBtn el-icon-close",
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      return _vm.close($event)
                    }
                  }
                })
              : _vm._e(),
            _vm.special
              ? _c(
                  "el-button",
                  {
                    attrs: { type: _vm.buttonType },
                    on: {
                      click: function($event) {
                        $event.stopPropagation()
                        return _vm.close($event)
                      }
                    }
                  },
                  [_vm._v("确定")]
                )
              : _vm._e()
          ],
          1
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/notification/src/main.vue?vue&type=template&id=43dbc3d8&

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/notification/src/main.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var typeMap = {
  info: 'el-icon-information',
  success: 'el-icon-circle-check',
  warning: 'el-icon-warning',
  error: 'el-icon-circle-cross'
};

/* harmony default export */ var mainvue_type_script_lang_js_ = ({
  mixins: [locale_default.a],
  data: function data() {
    return {
      visible: false,
      title: '',
      message: '',
      duration: 4500,
      type: '',
      customClass: '',
      iconClass: '',
      onClose: null,
      onClick: null,
      closed: false,
      top: null,
      timer: null,
      special: false,
      picUrl: undefined,
      showClose: true,
      dangerouslyUseHTMLString: false,
      position: 'top-right',
      verticalOffset: 0
    };
  },


  computed: {
    typeIconClass: function typeIconClass() {
      return this.type && typeMap[this.type] ? typeMap[this.type] : '';
    },
    typeClass: function typeClass() {
      return this.type && typeMap[this.type] ? 'el-' + typeMap[this.type] : '';
    },
    buttonType: function buttonType() {
      if (this.type === '') {
        return 'primary';
      }
      if (this.type === 'error') {
        return 'danger';
      }
      return this.type;
    },
    horizontalClass: function horizontalClass() {
      return this.position.indexOf('right') > -1 ? 'right' : 'left';
    },
    verticalProperty: function verticalProperty() {
      return (/^top-/.test(this.position) ? 'top' : 'bottom'
      );
    },
    positionStyle: function positionStyle() {
      var _ref;

      return _ref = {
        overflow: this.special ? 'visible' : 'hidden'
      }, _ref[this.verticalProperty] = this.verticalOffset + 'px', _ref;
    }
  },

  watch: {
    closed: function closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  },

  methods: {
    destroyElement: function destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
    },
    click: function click() {
      if (typeof this.onClick === 'function') {
        this.onClick();
      }
    },
    close: function close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },
    clearTimer: function clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer: function startTimer() {
      var _this = this;

      if (this.duration > 0) {
        this.timer = setTimeout(function () {
          if (!_this.closed) {
            _this.close();
          }
        }, this.duration);
      }
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    if (this.special) {
      this.duration = 0;
    }
    if (this.duration > 0) {
      this.timer = setTimeout(function () {
        if (!_this2.closed) {
          _this2.close();
        }
      }, this.duration);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.addEventListener('transitionend', this.destroyElement);
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
  }
});
// CONCATENATED MODULE: ./packages/notification/src/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/notification/src/main.vue





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
component.options.__file = "packages/notification/src/main.vue"
/* harmony default export */ var main = (component.exports);
// EXTERNAL MODULE: external "@/lib/utils/popup"
var popup_ = __webpack_require__(27);

// EXTERNAL MODULE: external "@/lib/utils/vdom"
var vdom_ = __webpack_require__(58);

// CONCATENATED MODULE: ./packages/notification/src/main.js




var NotificationConstructor = external_vue_default.a.extend(main);

var instance = void 0;
var instances = [];
var seed = 1;

var main_Notification = function Notification(options) {
  if (external_vue_default.a.prototype.$isServer) return;
  options = options || {};
  var userOnClose = options.onClose;
  var id = 'notification_' + seed++;
  var position = options.position || 'top-right';

  options.onClose = function () {
    Notification.close(id, userOnClose);
  };

  instance = new NotificationConstructor({
    data: options
  });

  if (Object(vdom_["isVNode"])(options.message)) {
    instance.$slots.default = [options.message];
    options.message = 'REPLACED_BY_VNODE';
  }
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = popup_["PopupManager"].nextZIndex();

  var verticalOffset = options.offset || 0;
  instances.filter(function (item) {
    return item.position === position;
  }).forEach(function (item) {
    var offset = item.offset ? item.offset : 0;
    verticalOffset += item.$el.offsetHeight + offset + 16;
  });
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  return instance.vm;
};

['success', 'warning', 'info', 'error'].forEach(function (type) {
  main_Notification[type] = function (options) {
    if (typeof options === 'string' || Object(vdom_["isVNode"])(options)) {
      options = {
        message: options
      };
    }
    options.type = type;
    return main_Notification(options);
  };
});

main_Notification.close = function (id, userOnClose) {
  var index = -1;
  var len = instances.length;
  var instance = instances.filter(function (instance, i) {
    if (instance.id === id) {
      index = i;
      return true;
    }
    return false;
  })[0];
  if (!instance) return;

  if (typeof userOnClose === 'function') {
    userOnClose(instance);
  }
  instances.splice(index, 1);

  if (len <= 1) return;
  var position = instance.position;
  var removedHeight = instance.dom.offsetHeight;
  for (var i = index; i < len - 1; i++) {
    if (instances[i].position === position) {
      instances[i].dom.style[instance.verticalProperty] = parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removedHeight - 16 + 'px';
    }
  }
};

/* harmony default export */ var src_main = (main_Notification);
// CONCATENATED MODULE: ./packages/notification/index.js

/* harmony default export */ var notification = __webpack_exports__["default"] = (src_main);

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

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ })

/******/ });