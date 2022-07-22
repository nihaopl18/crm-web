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
/******/ 	return __webpack_require__(__webpack_require__.s = 209);
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

/***/ 104:
/***/ (function(module, exports) {

module.exports = require("@/lib/xselect");

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/linkage-select/src/linkage-select.vue?vue&type=template&id=e6984a34&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "el-linkage-select" },
    [
      _vm._l(_vm.realLevel, function(item, index) {
        return _c(
          "div",
          {
            key: "linkageSelect_" + index,
            staticClass: "el-linkage-select-item",
            style: { width: _vm.itemStyle + "%", "margin-top": "1px" }
          },
          [
            _vm.labels[index]
              ? _c(
                  "label",
                  {
                    ref: "label_" + index,
                    refInFor: true,
                    staticClass: "el-linkage-select-item__label"
                  },
                  [_vm._v(_vm._s(_vm.labels[index]))]
                )
              : _vm._e(),
            _c("el-xselect", {
              ref: "xselect",
              refInFor: true,
              staticClass: "el-linkage-select-item__select",
              style: _vm.selectStyle[index],
              attrs: {
                details: _vm.details,
                placeholder: _vm.placeholder[index],
                options: _vm.currentOption[index],
                props: _vm.selectProps,
                clearable: _vm.clearable,
                disabled: _vm.disabled,
                filterable: _vm.filterable
              },
              on: {
                change: function($event) {
                  _vm.customChangeHandle
                    ? _vm.customChangeHandle($event, index)
                    : _vm.changeHandle($event, index)
                },
                "visible-change": _vm.visibleChange,
                clear: function($event) {
                  return _vm.clearHandle($event, index)
                }
              },
              model: {
                value: _vm.realValues[index],
                callback: function($$v) {
                  _vm.$set(_vm.realValues, index, $$v)
                },
                expression: "realValues[index]"
              }
            })
          ],
          1
        )
      }),
      _vm.showDetail
        ? _c(
            "div",
            {
              staticClass: "el-linkage-select-item",
              style: {
                width: _vm.itemStyle * _vm.detailWidth + "%",
                "margin-top": "1px"
              }
            },
            [
              _c("label", { ref: "labelInput" }, [
                _vm._v(_vm._s(_vm.labels[_vm.labels.length - 1]))
              ]),
              _c("yu-input", {
                style: _vm.addressStyle,
                attrs: {
                  details: _vm.details,
                  placeholder: _vm.placeholder[_vm.placeholder.length - 1]
                },
                on: { change: _vm.inputChange },
                model: {
                  value: _vm.inputValue,
                  callback: function($$v) {
                    _vm.inputValue = $$v
                  },
                  expression: "inputValue"
                }
              })
            ],
            1
          )
        : _vm._e(),
      _c("div", { staticStyle: { clear: "both" } })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/linkage-select/src/linkage-select.vue?vue&type=template&id=e6984a34&

// EXTERNAL MODULE: external "@/lib/xselect"
var xselect_ = __webpack_require__(104);
var xselect_default = /*#__PURE__*/__webpack_require__.n(xselect_);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: external "@/lib/utils/resize-event"
var resize_event_ = __webpack_require__(25);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/linkage-select/src/linkage-select.vue?vue&type=script&lang=js&
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




/* harmony default export */ var linkage_selectvue_type_script_lang_js_ = ({
  name: 'ElLinkageSelect',
  xtype: 'YuLinkageSelect',
  mixins: [locale_default.a],
  componentName: 'ElLinkageSelect',
  components: {
    ElXselect: xselect_default.a
  },
  props: {
    props: {
      type: Object,
      default: function _default() {
        return { key: 'key', value: 'value', children: 'children', parentId: 'parentId' };
      }
    },
    dataUrl: String,
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
    level: {
      type: Number,
      required: true
    },
    placeholders: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    labels: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    remoteParamName: {
      type: String,
      default: 'code'
    },
    disabled: Boolean,
    dataStructure: {
      type: String,
      default: 'tile'
    },
    // 平铺模式时,根节点的父节点默认值
    rootValue: {
      type: [String, Number],
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: false
    },
    showDetail: Boolean,
    detailWidth: {
      type: Number,
      default: 2
    },
    details: Boolean,
    customChangeHandle: Function
  },
  data: function data() {
    return {
      realOptions: [],
      placeholder: this.placeholders,
      currentOption: [],
      selectProps: {},
      realValues: this.value,
      selectFlag: false,
      selectStyle: [],
      addressStyle: '',
      // 强制调用change
      force: false,
      // 区分change事件触发的value watch 还是外部数据改变触发的value watch
      changeFlag: false,
      realLevel: this.level,
      inputValue: '',
      initDatas: []
    };
  },
  computed: {
    labelKey: function labelKey() {
      return this.props.key || 'key';
    },
    valueKey: function valueKey() {
      return this.props.value || 'value';
    },
    childrenKey: function childrenKey() {
      return this.props.children || 'children';
    },
    parentKey: function parentKey() {
      return this.props.parentId || 'parentId';
    },
    itemStyle: function itemStyle() {
      var count = this.level;
      if (this.showDetail) {
        count += this.detailWidth;
      }
      return 1 / count * 100;
    }
  },
  created: function created() {
    if (this.level <= 0) {
      throw new Error(this.t('el.linkageselect.levelError'));
    }
    this.initData();
    this.selectProps = { 'key': this.labelKey, 'value': this.valueKey };
  },
  mounted: function mounted() {
    var _this = this;
    var refs = _this.$refs;
    for (var i = 0; i < _this.realLevel; i++) {
      var obj = refs['label_' + i];
      if (obj && obj[0]) {
        Object(resize_event_["addResizeListener"])(obj[0], _this.resizeSelectWidth);
      } else {
        _this.selectStyle.push({ 'width': 'calc(100% - ' + '3px' + ')' });
      }
    }
    if (refs['labelInput']) {
      var otherWidth = refs['labelInput'].offsetWidth + 3 + 'px';
      // detail 模式的时候，无需设置额为的间隔
      if (this.details !== false) {
        otherWidth = '0px';
      }
      this.addressStyle = { 'width': 'calc(100% - ' + otherWidth + ')' };
      refs = null;
    }
  },
  methods: {
    resizeSelectWidth: function resizeSelectWidth(element) {
      var _this = this;
      if (_this.selectStyle.length < _this.level) {
        _this.selectStyle.push({ 'width': 'calc(100% - ' + (element.scrollWidth + 3) + 'px' + ')' });
      } else {
        _this.selectStyle.splice(_this.labels.indexOf(element.textContent), 1, { 'width': 'calc(100% - ' + (element.scrollWidth + 3) + 'px' + ')' });
      }
    },
    // 用于小u获取修改前，后的值，flag表示根据修改前或者后的选项匹配值。
    getText: function getText(value, flag) {
      var _this = this;
      var formatter = function formatter(arr) {
        var initDatas = [];
        for (var j = 0, len = arr.length; j < len; j++) {
          var obj = arr[j];
          initDatas.push({
            key: obj[_this.props.key],
            value: obj[_this.props.value]
          });
        }
        return initDatas;
      };
      var codes = value ? value : this.value;
      var selectRef = this.$refs.xselect;
      var text = '';
      for (var i = 0, l = 3; i < l; i++) {
        var code = codes[i];
        var options = !flag ? selectRef[i].typeOptions : formatter(this.initDatas[i]);
        var item = options.filter(function (item) {
          return item.key === code;
        });
        text += item[0] ? item[0].value : '';
      }
      if (this.showDetail) {
        text = text + (codes[3] ? codes[3] : '');
      }
      selectRef = null;
      return text;
    },
    initData: function initData(firstQuery) {
      if (this.options.length > 0) {
        // 如果是平铺数据
        if (this.dataStructure === 'tile') {
          this.realOptions = this.getJsonTree(this.options, this.rootValue);
        } else {
          this.realOptions = this.options;
        }
        this.currentOption.push(this.realOptions);
        if (this.realValues.length !== 0) {
          this.initOptions(this.realOptions, this.realValues[0], 0);
        }
      } else if (this.dataUrl) {
        // 第一个下拉框默认加载
        if (!firstQuery) {
          this.realOptions = this.query(this.rootValue);
          if (this.realOptions && this.realOptions.length > 0) {
            this.currentOption.push(this.realOptions);
            this.initDatas = [];
            this.initDatas.push(this.realOptions);
          }
        }
        for (var i = 1; i < this.realValues.length; i++) {
          this.realOptions = this.query(this.realValues[i - 1]);
          if (this.realOptions && this.realOptions.length > 0) {
            this.currentOption.push(this.realOptions);
            this.initDatas.push(this.realOptions);
          }
        }
      }
      // 设置地址input框的数据
      if (this.realValues.length > this.level) {
        this.inputValue = this.realValues[this.level];
      }
    },
    changeHandle: function changeHandle(val, index) {
      this.changeFlag = true;
      // this.selectFlag 为false 表示不是点击产生的change事件，所以就返回
      if (!this.selectFlag && !this.force) {
        if (this.showDetail) {
          // true 表示其中有个数据项有值，false 时表示所有的都没有数据
          if (!this.checkDataNotNull(this.realValues, this.inputValue)) {
            this.$emit('input', []);
          }
        }
        return;
      }
      // 移除数组之后的所有项 [长度以数据长度为准]
      var afterIndex = this.realValues.length - index;
      this.currentOption.splice(index + 1, afterIndex);
      this.realValues.splice(index + 1, afterIndex);
      var children = [];
      if (this.options && this.options.length > 0) {
        if (val !== undefined && index !== this.level - 1) {
          children = this.findChildren(this.currentOption[index], val);
        }
      } else if (this.dataUrl) {
        // undefined 表示级联清除，无需查询后台
        // 最后一级也无需发送请求
        if (val !== undefined && index !== this.level - 1) {
          children = this.query(val);
        }
      }
      if (children && children.length > 0) {
        this.currentOption.push(children);
      }
      if (this.showDetail) {
        var newData = yufp.clone(this.realValues.slice(0, this.level), []);
        while (newData.length < this.level) {
          newData.push('');
        }
        // 当valueFlag 为true 表示其中有个数据项有值，false 时表示所有的都没有数据
        if (this.checkDataNotNull(newData, this.inputValue)) {
          this.$emit('input', newData.concat(this.inputValue));
        } else {
          this.$emit('input', []);
        }
      } else {
        this.$emit('input', this.realValues);
      }
      this.$emit('change', val, index);
    },
    /**
    *检查联动下拉和地址是否有值
      */
    checkDataNotNull: function checkDataNotNull(data, other) {
      if (other) {
        return true;
      }
      var valueFlag = false;
      for (var x = 0; x < data.length; x++) {
        if (data[x]) {
          valueFlag = true;
          break;
        }
      }
      return valueFlag;
    },
    clearHandle: function clearHandle(val, index) {
      this.force = true;
      this.changeHandle(val, index);
      this.$emit('clear', val, index);
    },
    // 根据key 查询对应key中的children值
    findChildren: function findChildren(paraVal, key) {
      if (!key || !paraVal) {
        return;
      }
      for (var i = 0; i < paraVal.length; i++) {
        if (paraVal[i][this.labelKey] === key) {
          return paraVal[i][this.childrenKey];
        }
      }
      return null;
    },
    // 后台查询数据
    query: function query(key) {
      var _this = this;
      var keyV = _this.remoteParamName;
      var param = {};
      param[keyV] = key;
      var data = [];
      yufp.service.request({
        method: _this.requestType,
        name: _this.dataUrl,
        async: false,
        data: param,
        callback: function callback(code, message, response) {
          if (code === 0 && response) {
            data = _this.getObjectKey(response, _this.jsonData);
            _this.$emit('loaded', data, response);
          }
        }
      });
      return data;
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
    initOptions: function initOptions(levelVal, key, i) {
      if (this.realValues.length !== 0) {
        var children = this.findChildren(levelVal, key);
        if (children) {
          this.currentOption.push(children);
          i++;
          this.initOptions(children, this.realValues[i], i);
        }
      }
    },
    visibleChange: function visibleChange() {
      this.selectFlag = !this.selectFlag;
    },
    getJsonTree: function getJsonTree(data, parentId) {
      var itemArr = [];
      for (var i = 0; i < data.length; i++) {
        var node = data[i];
        if (node[this.parentKey] === parentId) {
          var newNode = {};
          newNode[this.labelKey] = node[this.labelKey];
          newNode[this.valueKey] = node[this.valueKey];
          var children = this.getJsonTree(data, node[this.labelKey]);
          // 没有子节点就无需添加
          if (children && children.length !== 0) {
            newNode[this.childrenKey] = children;
          }
          itemArr.push(newNode);
        }
      }
      return itemArr;
    },
    /**
    * 增加当，值长度小于level时，补齐剩余项
    * 2019.12.19
    */
    inputChange: function inputChange() {
      var newData = yufp.clone(this.realValues.slice(0, this.level), []);
      if (this.checkDataNotNull(newData, this.inputValue)) {
        // 当newData 值长度小于level时，补齐剩余项
        if (newData.length < this.level) {
          var realLength = newData.length;
          for (var i = 0; i < this.level - realLength; i++) {
            newData.push('');
          }
        }
        this.$emit('input', newData.concat(this.inputValue));
      } else {
        this.$emit('input', []);
      }
    },
    /**
    * 为了判断value watch的新，旧值是否一致。对外暴露的是完整长度的数组，但是在逻辑中存在非完整的数组
    * 例如['111','222','',''],['111','222']。从数据上讲是一致的。
    * liujie1 2019.10.29
    * 只有当length 长度大于level的时候长度才减1判空
    * liujie1 2019.12.19
    */
    checkArrayIsEqual: function checkArrayIsEqual(newVal, oldVal) {
      var length = newVal.length;
      if (this.showDetail && length > this.level) {
        length = length - 1;
      }
      // 两个值不等就返回false 。不等包括，其中一个有值，另一个没有，或两个都有值，但是不等的情况
      for (var i = 0; i < length; i++) {
        if (!newVal[i] && oldVal[i] || newVal[i] && !oldVal[i] || newVal[i] && oldVal[i] && newVal[i] !== oldVal[i]) {
          return false;
        }
      }
      return true;
    }
  },
  watch: {
    value: function value(val, oldVal) {
      this.realValues = val;
      this.force = false;
      // 只有赋值的时候val !== oldVal ，级联选择的时候都是相等的
      if (!this.checkArrayIsEqual(val, oldVal)) {
        this.currentOption = [];
        this.initData();
      }
    },
    options: function options(val) {
      if (val.length > 0) {
        this.currentOption = [];
        // 如果是平铺数据
        if (this.dataStructure === 'tile') {
          this.realOptions = this.getJsonTree(val, this.rootValue);
        } else {
          this.realOptions = val;
        }
        // 只能添加第一级数据
        this.currentOption.push(this.realOptions);
        // 增加如果下级已经有数据，就对下级赋值
        // 处理当组件已有数据后，在添加options时，需要将currentOption 每个层级都添加正确的options
        var curArray = this.realOptions;
        for (var i = 1; i < this.realLevel; i++) {
          // 如果下一级有值[显示值]（不包括第一级）
          if (this.realValues[i] !== null && this.realValues[i] !== '' && this.realValues[i] !== undefined) {
            for (var j = 0, len = curArray.length; j < len; j++) {
              // 当前字段的值为上一级的值时，就把下一级的数据添加到currentOption中
              if (curArray[j][this.labelKey] === this.realValues[i - 1]) {
                curArray = curArray[j][this.childrenKey];
                this.currentOption.push(curArray);
                break;
              }
            }
          }
        }
      }
    },
    details: function details(val) {
      var refs = this.$refs;
      if (refs['labelInput']) {
        var otherWidth = refs['labelInput'].offsetWidth + 3 + 'px';
        // detail 模式的时候，无需设置额为的间隔
        if (val !== false) {
          otherWidth = '0px';
        }
        this.addressStyle = { 'width': 'calc(100% - ' + otherWidth + ')' };
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    for (var i = 0; i < this.realLevel; i++) {
      var obj = this.$refs['label_' + i];
      if (obj && obj[0]) {
        Object(resize_event_["removeResizeListener"])(obj[0], this.resizeSelectWidth);
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/linkage-select/src/linkage-select.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_linkage_selectvue_type_script_lang_js_ = (linkage_selectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/linkage-select/src/linkage-select.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_linkage_selectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/linkage-select/src/linkage-select.vue"
/* harmony default export */ var linkage_select = (component.exports);
// CONCATENATED MODULE: ./packages/linkage-select/index.js


/* istanbul ignore next */
linkage_select.install = function (Vue) {
  Vue.component(linkage_select.name, linkage_select);
};

/* harmony default export */ var packages_linkage_select = __webpack_exports__["default"] = (linkage_select);

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/resize-event");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

/***/ })

/******/ });