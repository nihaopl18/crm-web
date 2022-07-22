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
/******/ 	return __webpack_require__(__webpack_require__.s = 166);
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

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/xtree/src/xtree.vue?vue&type=template&id=3f97d9de&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("el-tree", {
    ref: "elTree",
    staticClass: "el-tree-x",
    style: _vm.styleObj,
    attrs: {
      "node-key": _vm.nodeKey,
      lazy: _vm.lazy,
      load: _vm.load,
      data: _vm.data,
      indent: _vm.indent,
      draggable: _vm.draggable,
      props: _vm.treeProps,
      disabled: _vm.disabled,
      "render-content": _vm.renderContent,
      "render-custom-content": _vm.renderCustomContent,
      "highlight-current": _vm.highlightCurrent,
      "current-node-key": _vm.currentNodeKey,
      "default-expand-all": _vm.defaultExpandAll,
      "expand-on-click-node": _vm.expandOnClickNode,
      "auto-expand-parent": _vm.autoExpandParent,
      "default-expanded-keys": _vm.defaultExpandedKeys,
      "show-checkbox": _vm.showCheckbox,
      "check-strictly": _vm.checkStrictly,
      "default-checked-keys": _vm.defaultCheckedKeys,
      "filter-node-method": _vm.filterNodeMethod,
      accordion: _vm.accordion,
      "allow-drag": _vm.allowDrag,
      "allow-drop": _vm.allowDrop,
      "empty-text": _vm.emptyText,
      "force-node-type": _vm.forceNodeType
    },
    on: {
      "node-click": _vm.nodeClick,
      "node-dbclick": _vm.nodeDbClick,
      "check-change": _vm.checkChange,
      "current-change": _vm.currentChange,
      "node-expand": _vm.nodeExpand,
      "node-collapse": _vm.nodeCollapse,
      "node-drag-start": _vm.nodeDragStart,
      "node-drag-enter": _vm.nodeDragEnter,
      "node-drag-leave": _vm.nodeDragLeave,
      "node-drag-over": _vm.nodeDragOver,
      "node-drag-end": _vm.nodeDragEnd,
      "node-drop": _vm.nodeDrop,
      "node-contextmenu": _vm.nodeContextmenu
    }
  })
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/xtree/src/xtree.vue?vue&type=template&id=3f97d9de&

// EXTERNAL MODULE: external "@/lib/locale"
var locale_ = __webpack_require__(6);

// EXTERNAL MODULE: external "@/lib/utils/util"
var util_ = __webpack_require__(4);

// EXTERNAL MODULE: external "deepmerge"
var external_deepmerge_ = __webpack_require__(42);
var external_deepmerge_default = /*#__PURE__*/__webpack_require__.n(external_deepmerge_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xtree/src/xtree.vue?vue&type=script&lang=js&
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





/* harmony default export */ var xtreevue_type_script_lang_js_ = ({
  name: 'ElTreeX',
  xtype: 'YuXtree',

  props: {
    draggable: {
      type: Boolean,
      defaul: false
    },
    emptyText: {
      type: String,
      default: function _default() {
        return Object(locale_["t"])('el.tree.emptyText');
      }
    },
    checkStrictly: Boolean,
    defaultExpandAll: Boolean,
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    autoExpandParent: {
      type: Boolean,
      default: true
    },
    defaultCheckedKeys: Array,
    defaultExpandedKeys: Array,
    renderContent: Function,
    showCheckbox: Boolean,
    highlightCurrent: {
      type: Boolean,
      default: true
    },
    currentNodeKey: [String, Number],
    filterNodeMethod: Function,
    accordion: Boolean,
    indent: {
      type: Number,
      default: 16
    },

    disabled: Boolean,
    lazy: Boolean,
    dataUrl: String,
    dataId: {
      type: String,
      default: 'id'
    },
    dataLabel: {
      type: String,
      default: 'label'
    },
    dataPid: {
      type: String,
      default: 'pid'
    },
    dataChild: {
      type: String,
      default: 'children'
    },
    icon: {
      type: String,
      default: 'icon'
    },
    dataLeaf: {
      type: String,
      default: 'ISLEAF'
    },
    dataRoot: [String, Object],
    height: Number,
    maxHeight: Number,
    rootVisible: {
      type: Boolean,
      default: true
    },
    dataParams: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    requestType: {
      type: String,
      default: 'GET'
    },
    jsonData: {
      type: String,
      default: 'data'
    },
    localData: Array,
    // 是否异步请求
    async: {
      type: Boolean,
      defaul: true
    },
    allowDrag: Function,
    allowDrop: Function,
    renderCustomContent: Function,
    beforeLoad: Function, // 加载数据前置方法
    removeEmpty: { // load查询条件中是否移除空属性
      type: Boolean,
      default: false
    },
    remoteParamName: String,
    forceNodeType: Function,
    nodeKey: {
      type: String,
      default: function _default() {
        return this.dataId;
      }
    },
    props: {
      default: function _default() {
        return {
          children: this.dataChild,
          label: this.dataLabel,
          icon: this.icon,
          disabled: 'disabled'
        };
      }
    },
    // 组件初始化数据类型，树形或者数组类型
    dataType: {
      default: 'tree',
      validator: function validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['array', 'tree'].indexOf(value) !== -1;
      }
    },
    defaultLoad: {
      type: Boolean,
      default: true
    }
  },

  data: function data() {
    return {
      orginalData: [],
      data: []
    };
  },

  methods: {
    filter: function filter(value) {
      return this.$children[0].filter(value);
    },
    getCheckedNodes: function getCheckedNodes(leafOnly) {
      return this.$children[0].getCheckedNodes(leafOnly);
    },
    getCheckedKeys: function getCheckedKeys(leafOnly) {
      return this.$children[0].getCheckedKeys(leafOnly);
    },
    setCheckedNodes: function setCheckedNodes(nodes, leafOnly) {
      this.$children[0].setCheckedNodes(nodes, leafOnly);
    },
    setCheckedKeys: function setCheckedKeys(keys, leafOnly) {
      this.$children[0].setCheckedKeys(keys, leafOnly);
    },
    setChecked: function setChecked(data, checked, deep) {
      this.$children[0].setChecked(data, checked, deep);
    },
    getHalfCheckedNodes: function getHalfCheckedNodes() {
      return this.$children[0].getHalfCheckedNodes();
    },
    getHalfCheckedKeys: function getHalfCheckedKeys() {
      return this.$children[0].getHalfCheckedKeys();
    },
    getCurrentNode: function getCurrentNode() {
      return this.$children[0].getCurrentNode();
    },
    getCurrentKey: function getCurrentKey() {
      return this.$children[0].getCurrentKey();
    },
    setCurrentKey: function setCurrentKey(key) {
      this.$children[0].setCurrentKey(key);
    },
    setCurrentNode: function setCurrentNode(node) {
      this.$children[0].setCurrentNode(node);
    },
    getNode: function getNode(data) {
      return this.$children[0].getNode(data);
    },
    remove: function remove(data) {
      this.$children[0].remove(data);
    },
    append: function append(data, parentNode) {
      this.$children[0].append(data, parentNode);
    },
    insertBefore: function insertBefore(data, refNode) {
      this.$children[0].insertBefore(data, refNode);
    },
    insertAfter: function insertAfter(data, refNode) {
      this.$children[0].insertAfter(data, refNode);
    },

    // 触发事件类型、私有方法
    nodeClick: function nodeClick(nodeData, node, self) {
      this.$emit('node-click', nodeData, node, self);
    },
    nodeDbClick: function nodeDbClick(nodeData, node, self) {
      this.$emit('node-dbclick', nodeData, node, self);
    },
    checkChange: function checkChange(nodeData, checked, indeterminate) {
      this.$emit('check-change', nodeData, checked, indeterminate);
    },
    currentChange: function currentChange(nodeData, node, self) {
      this.$emit('current-change', nodeData, node, self);
    },
    nodeExpand: function nodeExpand(nodeData, node, instance) {
      this.$emit('node-expand', nodeData, node, instance);
    },
    nodeCollapse: function nodeCollapse(nodeData, node, self) {
      this.$emit('node-collapse', nodeData, node, self);
    },
    nodeDragStart: function nodeDragStart(node, event) {
      this.$emit('node-drag-start', node, event);
    },
    nodeDragEnter: function nodeDragEnter(node, enode, event) {
      this.$emit('node-drag-enter', node, enode, event);
    },
    nodeDragLeave: function nodeDragLeave(node, lnode, event) {
      this.$emit('node-drag-leave', node, lnode, event);
    },
    nodeDragOver: function nodeDragOver(node, cnode, event) {
      this.$emit('node-drag-over', node, cnode, event);
    },
    nodeDragEnd: function nodeDragEnd(node, enode, position, event) {
      this.$emit('node-drag-end', node, enode, position, event);
    },
    nodeDrop: function nodeDrop(node, enode, position, event) {
      this.$emit('node-drop', node, enode, position, event);
    },
    nodeContextmenu: function nodeContextmenu(event, nodeData, node, instance) {
      event.stopPropagation();
      this.$emit('node-contextmenu', event, nodeData, node, instance);
    },
    load: function load(node, resolve) {
      var _this = this;
      var params = {};
      yufp.extend(params, _this.dataParams);
      var dataId = _this.remoteParamName ? _this.remoteParamName : _this.dataId;
      var clickData = node.data;
      var qps = dataId.split(','); // 支持多个字段属性参数
      for (var i = 0; i < qps.length; i++) {
        if (qps[i] === _this.dataId) {
          if (clickData[_this.dataId]) {
            // 非加载根节点
            params[qps[i]] = clickData[_this.dataId];
          } else {
            // 加载根节点,注若是懒加载，则此属性自动表示根节点父id值
            params[qps[i]] = _this.dataRoot;
          }
        } else {
          params[qps[i]] = clickData[qps[i]] || '';
        }
      }
      if (this.removeEmpty === true) {
        for (var item in params) {
          if (params[item] === '' || params[item] === null || params[item] === undefined || params[item] instanceof Array && params[item].length === 0) {
            delete params[item];
          }
        }
      }
      if (!this.beforeLoad || this.beforeLoad && this.beforeLoad(clickData, params)) {
        yufp.service.request({
          url: _this.dataUrl,
          method: _this.requestType,
          data: params,
          callback: function callback(code, message, response) {
            var data = Object(util_["getValueByPath"])(response, _this.jsonData) || [];
            var nodeArray = [];
            for (var i = 0; i < data.length; i++) {
              data[i].id = data[i][_this.dataId];
              data[i].label = data[i][_this.dataLabel];
              data[i].pid = data[i][_this.dataPid];
              data[i].icon = data[i][_this.icon];
              nodeArray.push(data[i]);
            }
            _this.orginalData = _this.orginalData.concat(nodeArray);
            return resolve(nodeArray);
          }
        });
      }
    },

    remoteData: function remoteData() {
      var _this = this;
      yufp.service.request({
        url: _this.dataUrl,
        method: _this.requestType,
        data: _this.dataParams,
        async: _this.async,
        callback: function callback(code, message, response) {
          var data = Object(util_["getValueByPath"])(response, _this.jsonData) || [];
          _this.orginalData = external_deepmerge_default()([], data, { clone: true });
          var transData = _this.genTreeData(data);
          _this.data = _this.rootVisible ? transData : transData[0].children;
          _this.expandRootNode();
          _this.$emit('load-all-data', _this.orginalData, response);
          // Deprecated 下述事件名反对使用
          _this.$emit('get-tree-datas', _this.orginalData, response);
        }
      });
    },
    /**
     * 将数组数据转换为树结构数据
     */
    genTreeData: function genTreeData(data) {
      var _this = this;
      if (this.dataType === 'tree') {
        return data;
      } else {
        var cloneData = external_deepmerge_default()([], data, { clone: true });
        var attr = { data: cloneData, id: _this.dataId, label: _this.dataLabel, pid: _this.dataPid, root: _this.dataRoot, icon: _this.icon };
        // return [array2tree(attr)];
        return Object(util_["transformTozTreeFormat"])(attr, cloneData);
      }
    },

    /**
     * 一级节点只有一个时，才默认展开一级节点
     */
    expandRootNode: function expandRootNode() {
      var _this = this;
      setTimeout(function () {
        var root = _this.$children[0].root;
        if (!_this.defaultExpandAll && root.childNodes.length === 1) {
          root.childNodes[0].expanded = true;
        }
      }, 1);
    }
  },
  mounted: function mounted() {
    if (!this.lazy && !this.localData && this.dataUrl && this.defaultLoad) {
      this.remoteData();
    }
    if (this.localData) {
      if (this.localData.length > 0) {
        var data = this.genTreeData(this.localData);
        this.orginalData = this.localData;
        this.data = this.rootVisible ? data : data[0].children;
      } else {
        this.data = [];
      }
      this.expandRootNode();
    }
  },

  computed: {
    styleObj: function styleObj() {
      return {
        height: this.height - 2 + 'px',
        maxHeight: this.maxHeight - 2 + 'px',
        overflow: 'auto'
      };
    },
    treeProps: function treeProps() {
      return this.dataLeaf ? yufp.extend(this.props, { isLeaf: this.dataLeaf }) : this.props;
    }
  },
  watch: {
    dataUrl: function dataUrl(val) {
      this.remoteData();
    },
    dataParams: function dataParams(val) {
      this.remoteData();
    },
    localData: function localData(val) {
      this.orginalData = val;
      var data = this.genTreeData(val);
      this.data = this.rootVisible ? data : data[0].children;
      this.expandRootNode();
    }
  }
});
// CONCATENATED MODULE: ./packages/xtree/src/xtree.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_xtreevue_type_script_lang_js_ = (xtreevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xtree/src/xtree.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_xtreevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/xtree/src/xtree.vue"
/* harmony default export */ var xtree = (component.exports);
// CONCATENATED MODULE: ./packages/xtree/index.js


/* istanbul ignore next */
xtree.install = function (Vue) {
  Vue.component(xtree.name, xtree);
};

/* harmony default export */ var packages_xtree = __webpack_exports__["default"] = (xtree);

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/util");

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

module.exports = require("deepmerge");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ })

/******/ });