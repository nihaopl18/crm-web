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
/******/ 	return __webpack_require__(__webpack_require__.s = 185);
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

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_combo_tree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_combo_tree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_combo_tree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_combo_tree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)(false);
// imports


// module
exports.push([module.i, "\n.el-combo-tree.el-popover {\n  overflow: auto;\n}\n.el-combo-tree.el-popover .el-tree {\n  border: none;\n}\n", ""]);

// exports


/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/combo-tree/src/combo-tree.vue?vue&type=template&id=e773ae74&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "el-combo-tree el-select" },
    [
      _c(
        "el-popover",
        {
          ref: "selectPopover",
          attrs: {
            "popper-class": "el-combo-tree",
            placement: "bottom-start",
            "append-to-body": true,
            height: _vm.height,
            "max-height": _vm.maxHeight,
            trigger: "manual",
            "visible-arrow": false
          },
          model: {
            value: _vm.visible,
            callback: function($$v) {
              _vm.visible = $$v
            },
            expression: "visible"
          }
        },
        [
          _c("el-tree-x", {
            ref: "selectTreeX",
            attrs: {
              "empty-text": _vm.emptyText,
              "current-node-key": _vm.currentNodeKey,
              "show-checkbox": _vm.multiple,
              "node-key": _vm.dataId,
              indent: _vm.indent,
              draggable: _vm.draggable,
              "render-content": _vm.renderContent,
              "filter-node-method": _vm.filterNodeMethod,
              async: _vm.async,
              "root-visible": _vm.rootVisible,
              "data-url": _vm.dataUrl,
              "data-params": _vm.dataParams,
              "check-strictly": _vm.checkStrictly,
              "json-data": _vm.jsonData,
              "expand-on-click-node": _vm.expandOnClickNode,
              "request-type": _vm.requestType,
              "data-id": _vm.dataId,
              "data-label": _vm.dataLabel,
              "data-pid": _vm.dataPid,
              "data-child": _vm.dataChild,
              "data-root": _vm.dataRoot,
              lazy: _vm.lazy,
              "local-data": _vm.localData,
              "highlight-current": _vm.highlightCurrent,
              "remote-param-name": _vm.remoteParamName,
              "force-node-type": _vm.forceNodeType,
              "allow-drag": _vm.allowDrag,
              "allow-drop": _vm.allowDrop
            },
            on: {
              "node-dbclick": _vm.nodeDbClick,
              "current-change": _vm.currentChange,
              "node-expand": _vm.nodeExpand,
              "node-collapse": _vm.nodeCollapse,
              "node-drag-start": _vm.nodeDragStart,
              "node-drag-enter": _vm.nodeDragEnter,
              "node-drag-leave": _vm.nodeDragLeave,
              "node-drag-over": _vm.nodeDragOver,
              "node-drag-end": _vm.nodeDragEnd,
              "node-drop": _vm.nodeDrop,
              "node-contextmenu": _vm.nodeContextmenu,
              "check-change": _vm.checkChangeFn,
              "node-click": _vm.nodeClickFn,
              "load-all-data": _vm.loaded
            }
          })
        ],
        1
      ),
      !_vm.disabled
        ? _c("el-input", {
            directives: [
              {
                name: "popover",
                rawName: "v-popover:selectPopover",
                arg: "selectPopover"
              }
            ],
            ref: "input",
            attrs: {
              placeholder: _vm.placeholder,
              readonly: !_vm.editable,
              details: _vm.details,
              icon: _vm.iconClass,
              disabled: _vm.disabled || _vm.details,
              "on-icon-click": _vm.handleIconClick
            },
            on: { input: _vm.handleInput, focus: _vm.handleFocus },
            nativeOn: {
              mouseenter: function($event) {
                _vm.inputHovering = true
              },
              mouseleave: function($event) {
                _vm.inputHovering = false
              }
            },
            model: {
              value: _vm.selectedLabel,
              callback: function($$v) {
                _vm.selectedLabel = $$v
              },
              expression: "selectedLabel"
            }
          })
        : _c("el-input", {
            ref: "input",
            attrs: {
              placeholder: _vm.placeholder,
              readonly: true,
              details: _vm.details,
              icon: _vm.iconClass,
              disabled: _vm.disabled || _vm.details,
              "on-icon-click": _vm.handleIconClick
            },
            nativeOn: {
              mouseenter: function($event) {
                _vm.inputHovering = true
              },
              mouseleave: function($event) {
                _vm.inputHovering = false
              }
            },
            model: {
              value: _vm.selectedLabel,
              callback: function($$v) {
                _vm.selectedLabel = $$v
              },
              expression: "selectedLabel"
            }
          })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/combo-tree/src/combo-tree.vue?vue&type=template&id=e773ae74&

// EXTERNAL MODULE: external "@/lib/utils/dom"
var dom_ = __webpack_require__(2);

// EXTERNAL MODULE: external "@/lib/utils/util"
var util_ = __webpack_require__(4);

// EXTERNAL MODULE: external "@/lib/locale"
var locale_ = __webpack_require__(6);

// EXTERNAL MODULE: external "@/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(9);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/combo-tree/src/combo-tree.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var combo_treevue_type_script_lang_js_ = ({
  name: 'ElComboTree',
  xtype: 'YuComboTree',
  directives: { Clickoutside: clickoutside_default.a },
  props: {
    draggable: {
      type: Boolean,
      defaul: false
    },
    renderContent: Function,
    filterNodeMethod: Function,
    allowDrag: Function,
    allowDrop: Function,
    // 单选时是否支持路径的方式显示值
    pathValue: Boolean,
    value: {
      required: true
    },
    placeholder: {
      type: String,
      default: function _default() {
        return Object(locale_["t"])('el.combotree.placeholder');
      }
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: function _default() {
        return Object(locale_["t"])('el.tree.emptyText');
      }
    },
    requestType: String,
    lazy: Boolean,
    dataUrl: String,
    dataId: String,
    dataLabel: String,
    dataPid: String,
    dataChild: String,
    dataRoot: [String, Object],
    async: Boolean,
    rootVisible: {
      type: Boolean,
      default: true
    },
    highlightCurrent: {
      type: Boolean,
      default: true
    },
    localData: Array,
    indent: Number,
    dataParams: Object,
    jsonData: {
      type: String,
      default: 'data'
    },
    remoteParamName: String,
    contentRemoteParamName: String,
    allNodeValue: Boolean,
    details: Boolean,
    forceNodeType: Function,
    checkStrictly: Boolean,
    rootChecked: Boolean,
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    height: Number,
    maxHeight: Number,
    editable: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    var selValue = this.multiple ? [] : '';
    selValue = this.value ? this.value : selValue;
    return {
      inputHovering: false,
      tempSelVal: selValue,
      selectedLabel: '',
      oldSelectedLabel: '',
      currentNodeKey: '',
      visible: false,
      nodePath: [],
      inputIng: false
    };
  },
  computed: {
    iconClass: function iconClass() {
      var criteria = this.clearable && !this.disabled && this.inputHovering && this.value !== undefined && (this.multiple ? this.value.length > 0 : this.value !== '');
      return criteria ? 'circle-close is-show-close' : 'caret-top';
    }
  },
  watch: {
    value: function value(val) {
      if (val === undefined) {
        this.clear();
      }
      if (this.tempSelVal !== val && !this.inputIng) {
        this.tempSelVal = val;
        if (this.lazy === true && this.dataUrl) {
          this.remoteData(val);
        }
      }
    },
    tempSelVal: function tempSelVal(val, oldVal) {
      this.setSelected();
      this.$emit('input', val);
      this.$emit('change', val, oldVal);
    },
    visible: function visible(val) {
      if (!val) {
        this.handleIconHide();
        this.selectedLabel = this.oldSelectedLabel;
      } else {
        this.handleIconShow();
        this.filterNodeMethod && this.filter(this.selectedLabel);
      }
      this.$emit('visible-change', val);
    }
  },
  mounted: function mounted() {
    this.setSelected();
    this.resetInputWidth();
    Object(dom_["on"])(document.body, 'click', this.handleHide);
  },
  destroyed: function destroyed() {
    Object(dom_["off"])(document.body, 'click', this.handleHide);
  },

  methods: {
    // xtree方法
    filter: function filter(value) {
      return this.$refs.selectTreeX.filter(value);
    },
    getCheckedNodes: function getCheckedNodes(leafOnly) {
      return this.$refs.selectTreeX.getCheckedNodes(leafOnly);
    },
    getCheckedKeys: function getCheckedKeys(leafOnly) {
      return this.$refs.selectTreeX.getCheckedKeys(leafOnly);
    },
    setCheckedNodes: function setCheckedNodes(nodes, leafOnly) {
      this.$refs.selectTreeX.setCheckedNodes(nodes, leafOnly);
    },
    setCheckedKeys: function setCheckedKeys(keys, leafOnly) {
      this.$refs.selectTreeX.setCheckedKeys(keys, leafOnly);
    },
    setChecked: function setChecked(data, checked, deep) {
      this.$refs.selectTreeX.setChecked(data, checked, deep);
    },
    getHalfCheckedNodes: function getHalfCheckedNodes() {
      return this.$refs.selectTreeX.getHalfCheckedNodes();
    },
    getHalfCheckedKeys: function getHalfCheckedKeys() {
      return this.$refs.selectTreeX.getHalfCheckedKeys();
    },
    getCurrentNode: function getCurrentNode() {
      return this.$refs.selectTreeX.getCurrentNode();
    },
    getCurrentKey: function getCurrentKey() {
      return this.$refs.selectTreeX.getCurrentKey();
    },
    setCurrentKey: function setCurrentKey(key) {
      this.$refs.selectTreeX.setCurrentKey(key);
    },
    setCurrentNode: function setCurrentNode(node) {
      this.$refs.selectTreeX.setCurrentNode(node);
    },
    getNode: function getNode(data) {
      return this.$refs.selectTreeX.getNode(data);
    },
    remove: function remove(data) {
      this.$refs.selectTreeX.remove(data);
    },
    append: function append(data, parentNode) {
      this.$refs.selectTreeX.append(data, parentNode);
    },
    insertBefore: function insertBefore(data, refNode) {
      this.$refs.selectTreeX.insertBefore(data, refNode);
    },
    insertAfter: function insertAfter(data, refNode) {
      this.$refs.selectTreeX.insertAfter(data, refNode);
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
    handleInput: function handleInput(value) {
      this.inputIng = true;
      this.$emit('input', value);
      if (this.multiple && value === '') {
        this.$refs.selectTreeX.setCheckedKeys([]);
      } else {
        this.currentNodeKey = '';
      }
    },
    handleFocus: function handleFocus() {
      this.visible = true;
    },
    handleHide: function handleHide(e) {
      // 判断失去焦点时，点击的当前元素是不是popver中的，如果不是，则隐藏popver
      if (!e.target || e.target.offsetParent !== this.$refs.selectPopover.$refs.popper && e.target.offsetParent !== this.$refs.input.$el) {
        this.visible = false;
      }
    },
    handleClose: function handleClose() {
      this.visible = false;
    },

    loaded: function loaded() {
      this.setSelected();
    },
    setSelected: function setSelected() {
      if (this.multiple) {
        this.$refs.selectTreeX.setCheckedKeys(this.tempSelVal);
      } else {
        this.currentNodeKey = this.tempSelVal;
      }
      this.setSelectedLabel();
    },
    checkChangeFn: function checkChangeFn(nodeData, checked, indeterminate) {
      // 底层控件选择事件触发
      if (this.multiple) {
        this.tempSelVal = this.$refs.selectTreeX.getCheckedKeys();
        this.setSelectedLabel();
      }
      if (this.editable) {
        this.$refs.input.focus();
      }
    },
    nodeClickFn: function nodeClickFn(nodeData, node, self) {
      this.inputIng = false;
      if (this.nodePath.length > 0) {
        this.nodePath = [];
      }
      if (!this.multiple) {
        var val = '';
        if (this.pathValue) {
          this.getNodePathValue(node);
          for (var i = 0; i < this.nodePath.length; i++) {
            var ele = this.nodePath[i];
            if (i === 0) {
              val += ele[this.dataLabel];
            } else {
              val += '/' + ele[this.dataLabel];
            }
          }
        } else {
          val = nodeData[this.dataLabel];
        }
        if (this.allNodeValue) {
          this.tempSelVal = nodeData[this.dataId];
          this.selectedLabel = val;
          this.oldSelectedLabel = val;
          this.visible = false;
        } else {
          var flag = this.rootChecked ? true : node.isLeaf;
          if (flag) {
            this.tempSelVal = nodeData[this.dataId];
            this.selectedLabel = val;
            this.oldSelectedLabel = val;
            this.visible = false;
          }
        }
      }
      this.$emit('node-click', nodeData, node, self);
    },
    handleIconClick: function handleIconClick(event) {
      event.stopPropagation();
      if (this.iconClass.indexOf('circle-close') > -1) {
        this.clear();
      } else {
        this.toggleMenu(event);
      }
    },
    toggleMenu: function toggleMenu() {
      if (!this.disabled) {
        this.visible = !this.visible;
      }
    },
    getSelectedObjs: function getSelectedObjs() {
      var _this = this;
      var resultObj;
      if (_this.multiple) {
        // 多选
        resultObj = _this.$refs.selectTreeX.getCheckedNodes();
      } else {
        // 单选
        resultObj = {};
        var treeData = _this.$refs.selectTreeX.orginalData;
        for (var i = 0; i < treeData.length; i++) {
          if (treeData[i][_this.dataId] === _this.tempSelVal) {
            resultObj = treeData[i];
            break;
          }
        }
      }
      return resultObj;
    },
    clear: function clear() {
      if (this.multiple) {
        this.tempSelVal = [];
      } else {
        this.tempSelVal = '';
      }
      this.selectedLabel = '';
      this.oldSelectedLabel = '';
      this.visible = false;
      this.$emit('clear');
    },
    getNodePathValue: function getNodePathValue(node) {
      if (node[this.dataLabel]) {
        var have = false;
        for (var i = 0; i < this.nodePath.length; i++) {
          var ele = this.nodePath[i];
          if (node[this.dataId] === ele[this.dataId]) {
            ele[this.dataLabel] += ',' + node[this.dataLabel];
            have = true;
            break;
          }
        }
        if (!have) {
          this.nodePath.unshift({ id: node[this.dataId], label: node[this.dataLabel] });
        }
      }
      if (node.parent) {
        this.getNodePathValue(node.parent);
      }
    },
    setSelectedLabel: function setSelectedLabel() {
      this.$nextTick(function () {
        // 填充输入框内容
        if (this.multiple) {
          // 多选
          var checkedNodes = this.$refs.selectTreeX.getCheckedNodes();
          if (checkedNodes.length > 0) {
            var _this = this;
            this.selectedLabel = checkedNodes.reduce(function (arr, cur) {
              arr.push(cur[_this.dataLabel]);
              return arr;
            }, []).join('/');
            this.oldSelectedLabel = this.selectedLabel;
          } else {
            this.selectedLabel = '';
            this.oldSelectedLabel = '';
          }
        } else {
          var node = this.$refs.selectTreeX.getCurrentNode();
          this.selectedLabel = node && node[this.dataLabel] ? node[this.dataLabel] : '';
          this.oldSelectedLabel = this.selectedLabel;
        }
      });
    },
    handleIconHide: function handleIconHide() {
      var icon = this.$el.querySelector('.el-input__icon');
      if (icon) {
        Object(dom_["removeClass"])(icon, 'is-reverse');
      }
    },
    handleIconShow: function handleIconShow() {
      var icon = this.$el.querySelector('.el-input__icon');
      if (icon && !Object(dom_["hasClass"])(icon, 'el-icon-circle-close')) {
        Object(dom_["addClass"])(icon, 'is-reverse');
      }
    },
    /**
    *lazy模式时查询对应的文本框内容
    */
    remoteData: function remoteData(id) {
      var _this = this;
      var params = {};
      yufp.extend(params, _this.dataParams);
      var dataId = _this.contentRemoteParamName ? _this.contentRemoteParamName : _this.dataId;
      params[dataId] = id;
      yufp.service.request({
        url: _this.dataUrl,
        method: _this.requestType,
        data: params,
        async: _this.async,
        callback: function callback(code, message, response) {
          var data = Object(util_["getValueByPath"])(response, _this.jsonData) || [];
          // 返回结果是否为数组，数组就取第一项
          if (data instanceof Array) {
            _this.selectedLabel = data[0] && data[0][_this.dataLabel];
            _this.oldSelectedLabel = _this.selectedLabel;
          } else {
            _this.selectedLabel = data[_this.dataLabel];
            _this.oldSelectedLabel = _this.selectedLabel;
          }
        }
      });
    },
    resetInputWidth: function resetInputWidth() {
      var inputWidth = this.$refs.input.$el.getBoundingClientRect().width;
      this.$refs.selectTreeX.$el.style.minWidth = inputWidth - 24 + 'px';
    }
  }
});
// CONCATENATED MODULE: ./packages/combo-tree/src/combo-tree.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_combo_treevue_type_script_lang_js_ = (combo_treevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/combo-tree/src/combo-tree.vue?vue&type=style&index=0&lang=css&
var combo_treevue_type_style_index_0_lang_css_ = __webpack_require__(125);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/combo-tree/src/combo-tree.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_combo_treevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/combo-tree/src/combo-tree.vue"
/* harmony default export */ var combo_tree = (component.exports);
// CONCATENATED MODULE: ./packages/combo-tree/index.js


/* istanbul ignore next */
combo_tree.install = function (Vue) {
  Vue.component(combo_tree.name, combo_tree);
};

/* harmony default export */ var packages_combo_tree = __webpack_exports__["default"] = (combo_tree);

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/dom");

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(39);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 39:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/util");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(126);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(24)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/clickoutside");

/***/ })

/******/ });