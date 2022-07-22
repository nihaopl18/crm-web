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
/******/ 	return __webpack_require__(__webpack_require__.s = 133);
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

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_xcheckbox_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);


/* istanbul ignore next */
_src_xcheckbox_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_xcheckbox_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_xcheckbox_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_xcheckbox_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/xcheckbox/src/xcheckbox.vue?vue&type=template&id=33b89668&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      !_vm.details
        ? _c(
            "el-checkbox-group",
            {
              attrs: {
                min: _vm.min,
                max: _vm.max,
                name: _vm.name,
                size: _vm.size,
                fill: _vm.fill,
                "text-color": _vm.textColor,
                "value-type": _vm.valueType,
                separator: _vm.separator,
                disabled: _vm.disabled
              },
              model: {
                value: _vm.checklist,
                callback: function($$v) {
                  _vm.checklist = $$v
                },
                expression: "checklist"
              }
            },
            [
              !_vm.optionButton
                ? _vm._l(_vm.checkdata, function(item) {
                    return _c(
                      "el-checkbox",
                      {
                        key: "checkbox_" + item.key,
                        attrs: {
                          border: _vm.border,
                          label: item.key,
                          disabled:
                            item.disabled === undefined
                              ? _vm.disabled
                              : item.disabled
                        }
                      },
                      [_vm._v("\n      " + _vm._s(item.value) + "\n    ")]
                    )
                  })
                : _vm._l(_vm.checkdata, function(item) {
                    return _c(
                      "el-checkbox-button",
                      {
                        key: "checkbox_" + item.key,
                        attrs: {
                          label: item.key,
                          disabled:
                            item.disabled === undefined
                              ? _vm.disabled
                              : item.disabled
                        }
                      },
                      [_vm._v("\n      " + _vm._s(item.value) + "\n    ")]
                    )
                  })
            ],
            2
          )
        : _vm._e(),
      _vm.details
        ? _c("span", [_vm._v(_vm._s(_vm.getSelectdText().join(",")))])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/xcheckbox/src/xcheckbox.vue?vue&type=template&id=33b89668&

// EXTERNAL MODULE: external "@/lib/utils/util"
var util_ = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xcheckbox/src/xcheckbox.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var xcheckboxvue_type_script_lang_js_ = ({
  name: 'ElCheckboxX',
  xtype: 'YuXcheckbox',
  props: {
    min: Number,
    max: Number,
    disabled: Boolean,
    name: String,
    dataUrl: String,
    dataCode: String,
    /** 字典查询参数 */
    dataParams: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    /** 请求类型 */
    requestType: {
      type: String,
      default: 'GET'
    },
    jsonData: {
      type: String,
      default: 'data'
    },
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    datacodeFilter: Function,
    value: [Array, String],
    // 选项是否为button，默认flase
    optionButton: Boolean,
    valueType: {
      type: String,
      default: 'array'
    },
    /** 字典类型 */
    props: {
      type: Object,
      default: function _default() {
        return { key: 'key', value: 'value' };
      }
    },
    separator: {
      type: String,
      default: ','
    },
    excludeKey: String,
    details: Boolean,
    size: String,
    border: Boolean,
    fill: String,
    textColor: String
  },
  data: function data() {
    return {
      checklist: this.value ? Object.prototype.toString.call(this.value) === '[object String]' ? this.value.split(this.separator) : this.value : [],
      checkdata: this.options,
      parent: null
    };
  },
  created: function created() {
    if (!this.dataUrl && !this.dataCode) {
      // 此处代码含义有谁明白？克隆么？
      // var listData = [];
      // for (var i = 0, len = this.checkdata.length; i < len; i++) {
      //   var obj = this.checkdata[i];
      //   listData.push({ value: obj.value, key: obj.key });
      // }
      // this.checkdata = listData;
      // 重新修改一下
      var listData = [];
      this.checkdata.forEach(function (item) {
        var op = { value: item.value, key: item.key };
        if (item.disabled !== undefined) {
          op['disabled'] = item.disabled;
        }
        listData.push(op);
      });
      this.checkdata = listData;
    } else if (!this.dataUrl && this.dataCode) {
      this.setcheckData(this.dataCode);
    } else {
      this.query();
    }
  },
  methods: {
    getCheckListOfString: function getCheckListOfString() {
      return this.getSelectdText().join(this.separator);
    },

    change: function change(val, oldVal) {
      this.$emit('change', val, oldVal);
    },
    setcheckData: function setcheckData(dataCode) {
      var _this = this;
      var listData = [];
      yufp.lookup.bind(dataCode, function (options) {
        if (_this.datacodeFilter) {
          // 此处获取字段名称是不合理的，暂时先从父元素中获取
          listData = _this.datacodeFilter(options, _this.dataCode, _this.$parent && _this.$parent.name);
          _this.checkdata = _this.formatter(listData);
        } else {
          if (_this.excludeKey) {
            var array = _this.excludeKey.split(',');
            options = options.filter(function (item) {
              if (array.indexOf(item[_this.props.key]) > -1) {
                return false;
              }
              return true;
            });
          }
          _this.checkdata = _this.formatter(options);
        }
      });
    },
    formatter: function formatter(option) {
      var listData = [];
      for (var i = 0, len = option.length; i < len; i++) {
        var item = {};
        var obj = option[i];
        item['key'] = obj[this.props.key];
        item['value'] = obj[this.props.value];
        if (obj.disabled) {
          item['disabled'] = obj.disabled;
        }
        listData.push(item);
      }
      return listData;
    },

    query: function query() {
      var me = this;
      yufp.service.request({
        method: this.requestType,
        url: this.dataUrl,
        data: this.dataParams,
        callback: function callback(code, message, response) {
          var data = me.getObjectKey(response, me.jsonData) || [];
          data = data && data.length > 0 ? data : [];
          for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            if (obj[me.props.key]) {
              me.checkdata.push({
                key: obj[me.props.key],
                value: obj[me.props.value],
                disabled: obj.disabled
              });
            }
          }
          me.$emit('loaded', me.checkdata);
        }
      });
    },
    getObjectKey: function getObjectKey(obj, ns) {
      if (!ns) {
        return obj;
      }
      var keys = ns.split('.');
      for (var i = 0, len = keys.length; i < len; i++) {
        if (!obj) {
          break;
        }
        obj = obj[keys[i]];
      }
      return obj;
    },
    getSelectdText: function getSelectdText() {
      var text = [];
      for (var j = 0; j < this.checklist.length; j++) {
        for (var i = 0; i < this.checkdata.length; i++) {
          var obj = this.checkdata[i];
          if (obj.key === this.checklist[j]) {
            text.push(obj.value);
            break;
          }
        }
      }
      return text;
    },
    getVNodeParent: function getVNodeParent() {
      var parent = this.$parent;
      var parentName = parent.$options.componentName;
      while (parent.$parent && parentName !== 'YuXformAbstractItem') {
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      this.parent = parent;
    },

    // 获取复选框值处理
    _getCheckList: function _getCheckList(val) {
      if (Object.prototype.toString.call(val) === '[object Array]') {
        if (!Object(util_["looseEqual"])(this.checklist, val)) {
          return val;
        } else {
          return this.checklist;
        }
      }
      // 初始化默认值
      if (Object.prototype.toString.call(val) === '[object String]') {
        if (this.checklist.join(this.separator) !== val) {
          return val.split(this.separator);
        } else {
          return this.checklist;
        }
      }
    }
  },
  watch: {
    dataCode: function dataCode(val) {
      this.setcheckData(val);
    },
    checklist: function checklist(val) {
      if (val) {
        var returnVal = this.valueType === 'string' ? val.join(this.separator) : val;
        this.$emit('input', returnVal);
      } else {
        // 当为undefined 的时候重置数据
        this.checklist = [];
        var _returnVal = this.valueType === 'string' ? [].join(this.separator) : [];
        this.$emit('input', _returnVal);
      }
    },
    value: function value(val, oldVal) {
      this.$emit('change', val, oldVal);
      this.checklist = this._getCheckList(val);
    },
    options: function options(val) {
      this.checkdata = val;
    }
  }
});
// CONCATENATED MODULE: ./packages/xcheckbox/src/xcheckbox.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_xcheckboxvue_type_script_lang_js_ = (xcheckboxvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xcheckbox/src/xcheckbox.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_xcheckboxvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/xcheckbox/src/xcheckbox.vue"
/* harmony default export */ var xcheckbox = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/util");

/***/ })

/******/ });