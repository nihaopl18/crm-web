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
/******/ 	return __webpack_require__(__webpack_require__.s = 164);
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

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/xcascader/src/xcascader.vue?vue&type=template&id=28f97dc4&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("el-cascader", {
    ref: "xcascader",
    attrs: {
      "show-all-levels": _vm.showAllLevels,
      props: _vm.props,
      options: _vm.typeOptions,
      disabled: _vm.disabled,
      placeholder: _vm.placeholder,
      filterable: _vm.filterable,
      clearable: _vm.clearable,
      size: _vm.size,
      "collapse-tags": _vm.collapseTags,
      separator: _vm.separator,
      "filter-method": _vm.filterMethod,
      debounce: _vm.debounce,
      "before-filter": _vm.beforeFilter,
      "popper-class": _vm.popperClass,
      "change-on-select": _vm.changeOnSelect
    },
    on: {
      "active-item-change": _vm.activeItemChange,
      change: _vm.change,
      blur: _vm.handleBlur,
      focus: _vm.handleFocus,
      "visible-change": _vm.visibleChange,
      "remove-tag": _vm.removeTag
    },
    model: {
      value: _vm.selectedVal,
      callback: function($$v) {
        _vm.selectedVal = $$v
      },
      expression: "selectedVal"
    }
  })
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/xcascader/src/xcascader.vue?vue&type=template&id=28f97dc4&

// EXTERNAL MODULE: external "@/lib/locale"
var locale_ = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xcascader/src/xcascader.vue?vue&type=script&lang=js&
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


/* harmony default export */ var xcascadervue_type_script_lang_js_ = ({
  name: 'ElCascaderX',
  xtype: 'YuXcascader',
  componentName: 'ElCascaderX',
  props: {
    /** 数据配置选项 */
    props: {
      type: Object,
      default: function _default() {
        return { value: 'value', label: 'label', children: 'children' };
      }
    },
    /** 字典查询参数 */
    dataParams: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    /** 字典类型查询URL */
    dataUrl: String,
    /** 字典code */
    dataCode: String,
    dataCodeProp: {
      type: Object,
      default: function _default() {
        return { value: 'key', label: 'value' };
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
    // 下述字段为el-cascader组件中部分属性，配置文档参见yuwp
    name: {
      type: String,
      default: 'yu-xcascader'
    },
    size: String,
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: function _default() {
        return Object(locale_["t"])('el.xcascader.placeholder');
      }
    },
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    showAllLevels: {
      type: Boolean,
      default: false
    },
    hangeOnSelect: {
      type: Boolean,
      default: true
    },
    value: {
      required: true
    },
    changeOnSelect: {
      type: Boolean,
      default: false
    },
    collapseTags: Boolean,
    separator: {
      type: String,
      default: ' / '
    },
    filterMethod: Function,
    debounce: {
      type: Number,
      default: 300
    },
    beforeFilter: {
      type: Function,
      default: function _default() {
        return function () {};
      }
    },
    popperClass: String,
    highPerformance: Boolean
  },

  data: function data() {
    return {
      selectedVal: [],
      active: '',
      item: '',
      // 懒加载使用
      pageIndex: 1, // 分页中请求的页面
      pageSize: 10, // 自定义  每页的大小
      dataLength: 20,
      typeOptions: []
    };
  },
  watch: {
    selectedVal: function selectedVal(val) {
      if (val && val.length === 0) {
        this.clearSelectionNodes();
      }
      this.$emit('input', val);
    },
    value: {
      handler: function handler(val) {
        if (this.selectedVal !== val) {
          this.selectedVal = val;
        }
        if (val && val.length === 0) {
          this.clearSelectionNodes();
        }
      },
      immediate: true
    },
    dataUrl: function dataUrl(url) {
      if (url) {
        this.query();
      }
    },
    options: function options(data) {
      if (data) {
        this.optionsData = data;
        this.getTypeOptions();
      }
    },
    dataCode: function dataCode(code) {
      if (code) {
        this.setDateCode(code);
      }
    }
  },
  created: function created() {
    var _this2 = this;

    this.optionsData = [];
    if (this.dataUrl) {
      this.query();
    } else if (!this.dataUrl && this.dataCode) {
      this.setDateCode(this.dataCode);
    } else {
      this.optionsData = this.options;
      this.getTypeOptions();
    }
    this.$on('el.cascader.scroll', function (param, el, middlePosition) {
      _this2.handleScroll(param, el, middlePosition);
    });
  },
  methods: {
    clearSelectionNodes: function clearSelectionNodes() {
      this.$nextTick(function () {
        this.$refs.xcascader.panel.activePath = [];
      });
    },
    handleScroll: function handleScroll(param, el, middlePosition) {
      this.$refs.xcascader.panel.activePath = [];
      var pageNum = this.optionsData.length / this.pageSize;
      if (param) {
        if (this.typeOptions.length >= this.dataLength) {
          // 对应删除renderNodes中一页的数据量
          if (this.pageIndex < pageNum - 1) {
            this.typeOptions.splice(0, this.pageSize);
          }
        }
        ++this.pageIndex;
        if (this.pageIndex < pageNum) {
          var _typeOptions;

          // 请求下一页的数据
          (_typeOptions = this.typeOptions).push.apply(_typeOptions, this.getData(this.pageIndex));
          // 回滚到中间位置
          el.scrollTop = middlePosition;
        } else {
          this.pageIndex = pageNum - 1;
          return false;
        }
      } else {
        // 如果在向上滚动时，如果还没有到达第一页则继续加载。 如果已到达则停止加载
        if (this.pageIndex > 1) {
          // 向上滚动，取出pageMap中第一个元素值减1
          --this.pageIndex;
          // ①删除renderNodes中最后一页的数据
          this.typeOptions.splice(-this.pageSize, this.pageSize);
          // ②将新数据添加在头部位置
          this.typeOptions = [].concat(this.getData(this.pageIndex - 1), this.typeOptions);
          // 回滚到中间位置
          el.scrollTop = middlePosition;
        } else {
          return false;
        };
      }
    },
    getData: function getData(pageIndex, pagesize) {
      // 每页数量
      var pageSize = pagesize ? pagesize : 10;
      var list = [];
      for (var i = pageSize * pageIndex; i < pageSize * (pageIndex + 1); i++) {
        list.push(this.optionsData[i]);
      }
      return list;
    },
    getTypeOptions: function getTypeOptions() {
      if (this.highPerformance) {
        this.typeOptions = this.optionsData.slice(0, this.dataLength);
      } else {
        this.typeOptions = this.optionsData;
      }
    },

    setDateCode: function setDateCode(dataCode) {
      var _this = this;
      yufp.lookup.bind(dataCode, function (options) {
        var listData = [];
        for (var i = 0, len = options.length; i < len; i++) {
          var obj = options[i];
          listData.push({
            value: obj[_this.dataCodeProp.value],
            label: obj[_this.dataCodeProp.label]
          });
        }
        _this.optionsData = listData;
        _this.getTypeOptions();
      });
    },
    change: function change(val, oldVal) {
      this.$emit('change', val, oldVal);
    },
    activeItemChange: function activeItemChange(val) {
      this.$emit('active-item-change', val);
    },
    getTxt: function getTxt(text, arr) {
      var _this = this;
      var text1 = '';
      for (var i = 0; i < arr.length; i++) {
        var ele = arr[i];
        if (ele[_this.props.value] === text) {
          return ele[this.props.label];
        }
        if (Array.isArray(ele[_this.props.children])) {
          text1 = _this.getTxt(text, ele[_this.props.children]);
          if (text1) {
            return text1;
          }
        }
      }
      return text1;
    },
    getSelectdText: function getSelectdText() {
      var lis = this.selectedVal;
      var res = [];
      var optionsData = this.optionsData;
      if (Array.isArray(lis)) {
        for (var i = 0; i < lis.length; i++) {
          var txt = this.getTxt(lis[i], optionsData);
          if (txt) {
            res.push(txt);
          }
        }
      }
      return res;
    },
    getSelectdValue: function getSelectdValue(value) {
      return this.selectedVal;
    },
    setSelectdByValue: function setSelectdByValue(list) {
      this.selectedVal = list;
    },
    clear: function clear() {
      this.selectedVal = [];
    },
    query: function query(val, para) {
      var _this = this;
      if (!val) {
        _this.optionsData = [];
      }
      var params;
      if (para) {
        params = para;
      } else {
        params = _this.dataParams;
      }
      yufp.service.request({
        method: _this.requestType,
        url: _this.dataUrl,
        data: params,
        callback: function callback(code, message, response) {
          var data1 = _this.getObjectKey(response, _this.jsonData);
          data1 = data1 && data1.length > 0 ? data1 : [];
          if (data1.length > 0 && !val) {
            _this.optionsData = data1;
          } else if (data1.length > 0 && val) {
            if (val.length === 1) {
              for (var i = 0, leni = _this.optionsData.length; i < leni; i++) {
                var value1 = _this.optionsData[i][_this.props.value];
                if (val[0] === value1) {
                  _this.optionsData[i][_this.props.children] = data1;
                  break;
                }
              }
            } else if (val.length === 2) {
              for (var k = 0, lenk = _this.optionsData.length; k < lenk; k++) {
                var value2 = _this.optionsData[k][_this.props.value];
                if (val[0] === value2) {
                  var child_ = _this.optionsData[k][_this.props.children];
                  for (var j = 0, lenj = child_.length; j < lenj; j++) {
                    var value3 = child_[j][_this.props.value];
                    if (val[1] === value3) {
                      child_[j][_this.props.children] = data1;
                      break;
                    }
                  }
                }
              }
            }
          }
          _this.$emit('load-all-data', _this.optionsData);
          _this.getTypeOptions();
        }
      });
    },
    loadCascaderData: function loadCascaderData(para) {
      if (para.dataUrl) {
        this.dataUrl = para.dataUrl;
      }
      this.query(para.value, para.para);
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
    handleBlur: function handleBlur(e) {
      this.$emit('blur', e);
    },
    handleFocus: function handleFocus(e) {
      this.$emit('focus', e);
    },
    visibleChange: function visibleChange(visible) {
      this.$emit('visible-change', visible);
    },
    removeTag: function removeTag(val) {
      this.$emit('remove-tag', val);
    },
    getCheckedNodes: function getCheckedNodes(leafOnly) {
      return this.$refs.xcascader.getCheckedNodes(leafOnly);
    }
  }
});
// CONCATENATED MODULE: ./packages/xcascader/src/xcascader.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_xcascadervue_type_script_lang_js_ = (xcascadervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xcascader/src/xcascader.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_xcascadervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/xcascader/src/xcascader.vue"
/* harmony default export */ var xcascader = (component.exports);
// CONCATENATED MODULE: ./packages/xcascader/index.js


/* istanbul ignore next */
xcascader.install = function (Vue) {
  Vue.component(xcascader.name, xcascader);
};

/* harmony default export */ var packages_xcascader = __webpack_exports__["default"] = (xcascader);

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ })

/******/ });