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
/******/ 	return __webpack_require__(__webpack_require__.s = 131);
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

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_xselect_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);


/* istanbul ignore next */
_src_xselect_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_xselect_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_xselect_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_xselect_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/xselect/src/xselect.vue?vue&type=template&id=7270949a&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-select",
    {
      directives: [
        {
          name: "scroll",
          rawName: "v-scroll",
          value: _vm.handleScroll,
          expression: "handleScroll"
        }
      ],
      ref: "xselect",
      attrs: {
        separator: _vm.separator,
        multiple: _vm.multiple,
        disabled: _vm.disabled,
        "multiple-limit": _vm.multipleLimit,
        size: _vm.size,
        name: _vm.name,
        clearable: _vm.clearable,
        placeholder: _vm.placeholder,
        filterable: _vm.filterable,
        "allow-create": _vm.allowCreate,
        "filter-method": _vm.defaultFilterMethod,
        "lock-height": _vm.lockHeight,
        "value-type": _vm.valueType,
        "value-key": _vm.valueKey,
        details: _vm.details,
        "collapse-tags": _vm.collapseTags,
        remote: _vm.remote,
        "remote-method": _vm.remoteMethod,
        loading: _vm.loading,
        "loading-text": _vm.loadingText,
        "no-match-text": _vm.noMatchText,
        "no-data-text": _vm.noDataText,
        "popper-class": _vm.popperClass,
        "default-first-option": _vm.defaultFirstOption,
        "popper-append-to-body": _vm.popperAppendToBody,
        text: _vm.text
      },
      on: {
        change: _vm.change,
        "visible-change": _vm.visibleChange,
        "remove-tag": _vm.removeTag,
        clear: _vm.clear,
        blur: _vm.handleBlur,
        focus: _vm.handleFocus
      },
      model: {
        value: _vm.selectedVal,
        callback: function($$v) {
          _vm.selectedVal = $$v
        },
        expression: "selectedVal"
      }
    },
    [
      _vm._l(_vm.typeOptions, function(item) {
        return _c(
          "el-option",
          {
            key: "option_" + item.key,
            attrs: {
              highlight: _vm.highlight,
              value: item.key,
              disabled: item.disabled,
              label: item.value
            }
          },
          [_vm._t("option", null, { item: item })],
          2
        )
      }),
      _vm.$slots.prefix
        ? _c("template", { slot: "prefix" }, [_vm._t("prefix")], 2)
        : _vm._e(),
      _vm.$slots.empty
        ? _c("template", { slot: "empty" }, [_vm._t("empty")], 2)
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/xselect/src/xselect.vue?vue&type=template&id=7270949a&

// CONCATENATED MODULE: ./packages/xselect/src/directive.js
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  };
};
/* harmony default export */ var directive = ({
  bind: function bind(el, binding, vnode) {
    if (vnode.parent.componentInstance.highPerformance) {
      // 获取滚动页面DOM
      var SCROLL_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
      var scrollPosition = 0;
      SCROLL_DOM.addEventListener('scroll', function () {
        var _this = this;

        var scheduledAnimationFrame;
        if (scheduledAnimationFrame) return;
        scheduledAnimationFrame = true;
        window.requestAnimationFrame(function () {
          // 当前的滚动位置 减去  上一次的滚动位置
          // 如果为true则代表向上滚动，false代表向下滚动
          var flagToDirection = _this.scrollTop - scrollPosition > 0;
          // 记录当前的滚动位置
          scrollPosition = _this.scrollTop;
          var LIMIT_BOTTOM = 50;
          // 记录滚动位置距离底部的位置
          var scrollBottom = _this.scrollHeight - (_this.scrollTop + _this.clientHeight) < LIMIT_BOTTOM;
          // 如果向下滚动 并且距离底部只有100px
          if (flagToDirection && scrollBottom) {
            // 将滚动行为告诉组件
            binding.value(flagToDirection, SCROLL_DOM, _this.scrollHeight / 2);
          }
          // 如果是向上滚动  并且距离顶部只有100px
          if (!flagToDirection && _this.scrollTop < LIMIT_BOTTOM) {
            binding.value(flagToDirection, SCROLL_DOM, _this.scrollHeight / 2);
          }
          scheduledAnimationFrame = false;
        });
      });
    }
  }
});
// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xselect/src/xselect.vue?vue&type=script&lang=js&
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




/* harmony default export */ var xselectvue_type_script_lang_js_ = ({
  name: 'ElSelectX',
  xtype: 'YuXselect',
  mixins: [locale_default.a],
  directives: { scroll: directive },
  props: {
    /** 字典类型 */
    props: {
      type: Object,
      default: function _default() {
        return { key: 'key', value: 'value' };
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
    // 下述字段为el-select组件中部分属性，配置文档参见yuwp
    name: {
      type: String,
      default: 'yu-xselect'
    },
    size: String,
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: ''
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterMethod: Function,
    datacodeFilter: Function,
    value: {
      required: true
    },
    excludeKey: String,
    lockHeight: Boolean,
    // 多选时，数据类型为字符串时的连接符
    separator: {
      type: String,
      default: ','
    },
    valueType: {
      type: String,
      default: 'array'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    // 是否为详情表单模式
    details: Boolean,
    collapseTags: Boolean,
    allowCreate: Boolean,
    remote: Boolean,
    remoteMethod: Function,
    loading: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    popperClass: String,
    defaultFirstOption: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    highlight: Boolean,
    // 大数据时使用，设置为true开启懒加载
    highPerformance: Boolean
  },
  data: function data() {
    var _this = this;
    // var selValue = this.multiple ? [] : '';
    var selValue = this.value;
    // 懒加载默认只有20个选项，故重写filterMethod，保证搜索功能正常。
    var filterMethod = function filterMethod(val) {
      if (!val) {
        _this.typeOptions = _this.getData(_this.pageIndex, 20);
      } else {
        _this.typeOptions = _this.originData.filter(function (item, index) {
          var parsedQuery = String(val).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
          return new RegExp(parsedQuery, 'i').test(item.value);
        });
      }
    };
    return {
      text: '',
      selectedVal: selValue,
      typeOptions: this.options,
      // 懒加载使用
      pageIndex: 1, // 分页中请求的页面
      pageSize: 10, // 自定义  每页的大小
      dataLength: 20,
      originData: [],
      defaultFilterMethod: this.highPerformance ? filterMethod : this.filterMethod
    };
  },
  watch: {
    selectedVal: function selectedVal(val) {
      this.$emit('input', val);
    },
    value: function value(val) {
      if (this.selectedVal !== val) {
        this.selectedVal = val;
      }
    },
    dataUrl: function dataUrl(url) {
      if (url) {
        this.query();
      }
    },
    dataParams: function dataParams(params) {
      if (params) {
        this.query();
      }
    },
    options: function options(data) {
      if (data) {
        var listData = [];
        for (var i = 0, len = data.length; i < len; i++) {
          var item = {};
          var obj = data[i];
          item['key'] = obj[this.props.key];
          item['value'] = obj[this.props.value];
          if (obj.disabled) {
            item['disabled'] = obj.disabled;
          }
          listData.push(item);
        }
        this.originData = listData;
        this.getTypeOptions();
      }
    },
    typeOptions: function typeOptions(data) {
      if (data) {
        this.typeOptions = data;
      }
      if (this.details) {
        this.getSelectdText();
      }
    },
    dataCode: function dataCode(code) {
      if (code) {
        var _this = this;
        yufp.lookup.bind(code, function (options) {
          if (_this.datacodeFilter) {
            _this.typeOptions = _this.datacodeFilter(options, code, _this.$parent && _this.$parent.name);
            _this.originData = _this.datacodeFilter(options, code, _this.$parent && _this.$parent.name);
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
            _this.originData = options;
            _this.getTypeOptions();
          }
        });
      }
    }
  },
  created: function created() {
    var _this = this;
    if (!this.dataUrl && !this.dataCode) {
      var listData = [];
      for (var i = 0, len = this.typeOptions.length; i < len; i++) {
        var item = {};
        var obj = this.typeOptions[i];
        if (obj[this.props.key] && obj[this.props.value]) {
          item['key'] = obj[this.props.key];
          item['value'] = obj[this.props.value];
          item['disabled'] = obj.disabled ? obj.disabled : false;
        }
        listData.push(item);
      }
      _this.originData = listData;
      _this.getTypeOptions();
    } else if (!this.dataUrl && this.dataCode) {
      var optionsArr = [];
      yufp.lookup.bind(_this.dataCode, function (options) {
        if (_this.datacodeFilter) {
          optionsArr = _this.datacodeFilter(options, _this.dataCode, _this.$parent && _this.$parent.name);
          _this.typeOptions = _this.formatter(optionsArr);
          _this.originData = _this.formatter(optionsArr);
          _this.getTypeOptions();
        } else {
          if (_this.excludeKey) {
            var array = _this.excludeKey.split(',');
            options = options.filter(function (item) {
              if (array.indexOf(item[_this.props.key]) > -1) {
                return false;
              }
              return true;
            });
            array = null;
          }
          _this.originData = _this.formatter(options);
          _this.getTypeOptions();
        }
      });
    } else {
      this.query();
    }
  },
  methods: {
    // 懒加载使用
    handleScroll: function handleScroll(param, el, middlePosition) {
      var pageNum = this.originData.length / this.pageSize;
      if (param) {
        if (this.typeOptions.length >= this.dataLength) {
          // 对应删除typeOptions中一页的数据量
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
          // ①删除typeOptions中最后一页的数据
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
        list.push(this.originData[i]);
      }
      return list;
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

    change: function change(val, data) {
      this.$emit('change', val, this.getSelectdText());
    },
    visibleChange: function visibleChange(val) {
      this.$emit('visible-change', val);
    },
    removeTag: function removeTag(tag) {
      this.$emit('remove-tag', tag);
    },
    getSelectdText: function getSelectdText() {
      var text = [];
      var selectedVal = this.selectedVal;
      if (this.multiple) {
        if (this.valueType === 'string' || typeof selectedVal === 'string' && this.valueType === 'array') {
          selectedVal = selectedVal.split(this.separator);
        }
      } else {
        selectedVal = [selectedVal];
      }
      for (var i = 0, len = this.typeOptions.length; i < len; i++) {
        var typeOption = this.typeOptions[i];
        for (var j = 0, lenj = selectedVal.length; j < lenj; j++) {
          var value = selectedVal[j];
          if (value === typeOption.key) {
            text.push(typeOption.value);
            break;
          }
        }
      }
      selectedVal = null;
      this.text = text.join(',');
      return text.join(',');
    },
    getSelectdValue: function getSelectdValue(value) {
      return this.selectedVal;
    },
    setSelectdByValue: function setSelectdByValue(value) {
      var isok = false;
      for (var i = 0, len = this.typeOptions.length; i < len; i++) {
        var obj = this.typeOptions[i];
        if (obj.value === value) {
          this.selectedVal = obj.key;
          isok = true;
          break;
        }
        if (obj.key === value) {
          this.selectedVal = obj.key;
          isok = true;
          break;
        }
      }
      if (!isok) {
        this.$message.error(this.t('el.xselect.noValue'));
      }
      obj = null;
    },
    setSelectdByItem: function setSelectdByItem(item) {
      if (item && !isNaN(item)) {
        if (this.typeOptions.length < item) {
          this.$message.error(this.t('el.xselect.maximumLength'));
        } else {
          this.selectedVal = this.typeOptions[item].key;
        }
      } else {
        this.$message.error(this.t('el.xselect.noValueOrNotNumber'));
      }
    },
    clear: function clear() {
      this.selectedVal = this.multiple ? [] : '';
      this.$emit('clear');
    },
    query: function query() {
      var _this = this;
      if (!_this.dataUrl) {
        throw new Error(_this.t('el.table.noDataUrl'));
      }
      yufp.service.request({
        method: _this.requestType,
        url: _this.dataUrl,
        data: _this.dataParams,
        callback: function callback(code, message, response) {
          _this.typeOptions = [];
          _this.originData = [];
          var data1 = _this.getObjectKey(response, _this.jsonData);
          data1 = data1 && data1.length > 0 ? data1 : [];
          for (var i = 0, len = data1.length; i < len; i++) {
            var obj = data1[i];
            if (obj[_this.props.key] && obj[_this.props.value]) {
              _this.originData.push({
                key: obj[_this.props.key],
                value: obj[_this.props.value]
              });
            }
          }
          data1 = null;
          obj = null;
          _this.$emit('load-all-data', _this.originData);
          _this.getTypeOptions();
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
    handleBlur: function handleBlur(event) {
      this.$emit('blur', event);
    },
    handleFocus: function handleFocus(event) {
      this.$emit('focus', event);
    },
    blur: function blur(event) {
      this.$refs.xselect.blur();
    },
    focus: function focus(event) {
      this.$refs.xselect.focus();
    },
    getTypeOptions: function getTypeOptions() {
      if (this.highPerformance) {
        this.typeOptions = this.originData.slice(0, this.dataLength);
      } else {
        this.typeOptions = this.originData;
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/xselect/src/xselect.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_xselectvue_type_script_lang_js_ = (xselectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xselect/src/xselect.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_xselectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/xselect/src/xselect.vue"
/* harmony default export */ var xselect = __webpack_exports__["a"] = (component.exports);

/***/ })

/******/ });