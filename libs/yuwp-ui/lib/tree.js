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
/******/ 	return __webpack_require__(__webpack_require__.s = 150);
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

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/merge");

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/tree/src/tree.vue?vue&type=template&id=547575a6&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "el-tree",
      class: {
        "el-tree--highlight-current": _vm.highlightCurrent,
        "is-dragging": !!_vm.dragState.draggingNode,
        "is-drop-not-allow": !_vm.dragState.allowDrop,
        "is-drop-inner": _vm.dragState.dropType === "inner"
      },
      attrs: { role: "tree" }
    },
    [
      _vm._l(_vm.root.childNodes, function(child) {
        return _c("el-tree-node", {
          key: _vm.getNodeKey(child),
          attrs: {
            node: child,
            props: _vm.props,
            "render-after-expand": _vm.renderAfterExpand,
            disabled: _vm.disabled,
            "render-content": _vm.renderContent,
            "render-custom-content": _vm.renderCustomContent
          },
          on: { "node-expand": _vm.handleNodeExpand }
        })
      }),
      !_vm.root.childNodes ||
      _vm.root.childNodes.length === 0 ||
      _vm.store.allHidden
        ? _c("div", { staticClass: "el-tree__empty-block" }, [
            _c("span", { staticClass: "el-tree__empty-text" }, [
              _vm._v(_vm._s(_vm.emptyText))
            ])
          ])
        : _vm._e(),
      _c("div", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.dragState.showDropIndicator,
            expression: "dragState.showDropIndicator"
          }
        ],
        ref: "dropIndicator",
        staticClass: "el-tree__drop-indicator"
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/tree/src/tree.vue?vue&type=template&id=547575a6&

// EXTERNAL MODULE: external "@/lib/utils/merge"
var merge_ = __webpack_require__(11);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge_);

// CONCATENATED MODULE: ./packages/tree/src/model/util.js
var NODE_KEY = '$treeNodeId';

var markNodeData = function markNodeData(node, data) {
  if (data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};

var util_getNodeKey = function getNodeKey(key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};
var findNearestComponent = function findNearestComponent(element, componentName) {
  var target = element;
  while (target && target.tagName !== 'BODY') {
    if (target.__vue__ && target.__vue__.$options.name === componentName) {
      return target.__vue__;
    }
    target = target.parentNode;
  }
  return null;
};
// CONCATENATED MODULE: ./packages/tree/src/model/node.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var getChildState = function getChildState(node) {
  var all = true;
  var none = true;
  var allWithoutDisable = true;
  for (var i = 0, j = node.length; i < j; i++) {
    var n = node[i];
    if (n.checked !== true || n.indeterminate) {
      all = false;
      if (!n.disabled) {
        allWithoutDisable = false;
      }
    }
    if (n.checked !== false || n.indeterminate) {
      none = false;
    }
  }

  return { all: all, none: none, allWithoutDisable: allWithoutDisable, half: !all && !none };
};

var reInitChecked = function reInitChecked(node) {
  var _getChildState = getChildState(node.childNodes),
      all = _getChildState.all,
      none = _getChildState.none,
      half = _getChildState.half;

  if (all) {
    node.checked = true;
    node.indeterminate = false;
  } else if (half) {
    node.checked = false;
    node.indeterminate = true;
  } else if (none) {
    node.checked = false;
    node.indeterminate = false;
  }

  var parent = node.parent;
  if (!parent || parent.level === 0) return;

  if (!node.store.checkStrictly) {
    reInitChecked(parent);
  }
};

var initLazyLoadChild = function initLazyLoadChild(node) {
  var childNodes = node.childNodes;
  if (node.checked) {
    for (var i = 0, j = childNodes.length; i < j; i++) {
      var child = childNodes[i];
      if (!child.disabled) {
        child.checked = true;
      }
    }
  }

  var parent = node.parent;
  if (!parent || parent.level === 0) return;
  reInitChecked(parent);
};

var getPropertyFromData = function getPropertyFromData(node, prop) {
  var props = node.store.props;
  var data = node.data || {};
  var config = props[prop];

  if (typeof config === 'function') {
    return config(data, node);
  } else if (typeof config === 'string') {
    return data[config];
  } else if (typeof config === 'undefined') {
    var dataProp = data[prop];
    return dataProp === undefined ? '' : dataProp;
  }
};

var nodeIdSeed = 0;

var node_Node = function () {
  function Node(options) {
    _classCallCheck(this, Node);

    this.id = nodeIdSeed++;
    this.text = null;
    this.checked = false;
    this.indeterminate = false;
    this.data = null;
    this.expanded = false;
    this.parent = null;
    this.visible = true;
    this.isCurrent = false;

    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    // internal
    this.level = 0;
    this.loaded = false;
    this.childNodes = [];
    this.loading = false;

    if (this.parent) {
      this.level = this.parent.level + 1;
    }

    var store = this.store;
    if (!store) {
      throw new Error('[Node]store is required!');
    }
    store.registerNode(this);

    var props = store.props;
    if (props && typeof props.isLeaf !== 'undefined') {
      var isLeaf = getPropertyFromData(this, 'isLeaf');
      if (typeof isLeaf === 'boolean') {
        this.isLeafByUser = isLeaf;
      }
    }

    if (store.lazy !== true && this.data) {
      this.setData(this.data);

      if (store.defaultExpandAll) {
        this.expanded = true;
      }
    } else if (this.level > 0 && store.lazy && store.defaultExpandAll) {
      this.expand();
    }

    if (!this.data) return;
    var defaultExpandedKeys = store.defaultExpandedKeys;
    var key = store.key;
    if (key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
      this.expand(null, store.autoExpandParent);
    }

    if (key && store.currentNodeKey !== undefined && this.key === store.currentNodeKey) {
      store.currentNode = this;
      store.currentNode.isCurrent = true;
    }

    if (store.lazy) {
      store._initDefaultCheckedNode(this);
    }

    this.updateLeafState();
  }

  Node.prototype.setData = function setData(data) {
    if (!Array.isArray(data)) {
      markNodeData(this, data);
    }

    this.data = data;
    this.childNodes = [];

    var children = void 0;
    if (this.level === 0 && this.data instanceof Array) {
      children = this.data;
    } else {
      children = getPropertyFromData(this, 'children') || [];
    }

    for (var i = 0, j = children.length; i < j; i++) {
      this.insertChild({ data: children[i] });
    }
  };

  Node.prototype.contains = function contains(target) {
    var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var walk = function walk(parent) {
      var children = parent.childNodes || [];
      var result = false;
      for (var i = 0, j = children.length; i < j; i++) {
        var child = children[i];
        if (child === target || deep && walk(child)) {
          result = true;
          break;
        }
      }
      return result;
    };

    return walk(this);
  };

  Node.prototype.remove = function remove() {
    var parent = this.parent;
    if (parent) {
      parent.removeChild(this);
    }
  };

  Node.prototype.insertChild = function insertChild(child, index, batch) {
    if (!child) throw new Error('insertChild error: child is required.');

    if (!(child instanceof Node)) {
      if (!batch) {
        var children = this.getChildren(true) || [];
        if (children.indexOf(child.data) === -1) {
          if (typeof index === 'undefined' || index < 0) {
            children.push(child.data);
          } else {
            children.splice(index, 0, child.data);
          }
        }
      }
      merge_default()(child, {
        parent: this,
        store: this.store
      });
      child = new Node(child);
    }

    child.level = this.level + 1;
    // 懒加载是时候最后一级配合后端数据,是否是最后一级,返回true表示强制显示为叶子节点 liujie1 20191222
    if (this.store.lazy === true && this.loaded === true && typeof this.store.forceNodeType === 'function') {
      child.isLeaf = this.store.forceNodeType(child.data);
    }
    if (typeof index === 'undefined' || index < 0) {
      this.childNodes.push(child);
    } else {
      this.childNodes.splice(index, 0, child);
    }

    this.updateLeafState();
  };

  Node.prototype.insertBefore = function insertBefore(child, ref) {
    var index = void 0;
    if (ref) {
      index = this.childNodes.indexOf(ref);
    }
    this.insertChild(child, index);
  };

  Node.prototype.insertAfter = function insertAfter(child, ref) {
    var index = void 0;
    if (ref) {
      index = this.childNodes.indexOf(ref);
      if (index !== -1) index += 1;
    }
    this.insertChild(child, index);
  };

  Node.prototype.removeChild = function removeChild(child) {
    var children = this.getChildren() || [];
    var dataIndex = children.indexOf(child.data);
    if (dataIndex > -1) {
      children.splice(dataIndex, 1);
    }
    var index = this.childNodes.indexOf(child);

    if (index > -1) {
      this.store && this.store.deregisterNode(child);
      child.parent = null;
      this.childNodes.splice(index, 1);
    }

    this.updateLeafState();
  };

  Node.prototype.removeChildByData = function removeChildByData(data) {
    var targetNode = null;
    this.childNodes.forEach(function (node) {
      if (node.data === data) {
        targetNode = node;
      }
    });

    if (targetNode) {
      this.removeChild(targetNode);
    }
  };

  Node.prototype.expand = function expand(callback, expandParent) {
    var _this = this;

    var done = function done() {
      if (expandParent) {
        var parent = _this.parent;
        while (parent.level > 0) {
          parent.expanded = true;
          parent = parent.parent;
        }
      }
      _this.expanded = true;
      if (callback) callback();
    };

    if (this.shouldLoadData()) {
      this.loadData(function (data) {
        if (data instanceof Array) {
          initLazyLoadChild(_this);
          done();
        }
      });
    } else {
      done();
    }
  };

  Node.prototype.doCreateChildren = function doCreateChildren(array) {
    var _this2 = this;

    var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    array.forEach(function (item) {
      _this2.insertChild(merge_default()({ data: item }, defaultProps), undefined, true);
    });
  };

  Node.prototype.collapse = function collapse() {
    this.expanded = false;
  };

  Node.prototype.shouldLoadData = function shouldLoadData() {
    return this.store.lazy === true && this.store.load && !this.loaded;
  };

  Node.prototype.updateLeafState = function updateLeafState() {
    if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
      this.isLeaf = this.isLeafByUser;
      return;
    }
    var childNodes = this.childNodes;
    if (!this.store.lazy || this.store.lazy === true && this.loaded === true) {
      this.isLeaf = !childNodes || childNodes.length === 0;
      return;
    }
    this.isLeaf = false;
  };

  Node.prototype.setChecked = function setChecked(value, deep, recursion, passValue) {
    var _this3 = this;

    this.indeterminate = value === 'half';
    this.checked = value === true;

    var _getChildState2 = getChildState(this.childNodes),
        all = _getChildState2.all,
        allWithoutDisable = _getChildState2.allWithoutDisable;

    if (this.childNodes.length && !all && allWithoutDisable) {
      this.checked = false;
      value = false;
    }

    var handleDescendants = function handleDescendants(lazy) {
      if (deep && !lazy) {
        var childNodes = _this3.childNodes;
        for (var i = 0, j = childNodes.length; i < j; i++) {
          var child = childNodes[i];
          passValue = passValue || value !== false;
          var isCheck = child.disabled ? child.checked : passValue;
          child.setChecked(isCheck, deep, true, passValue);
        }

        var _getChildState3 = getChildState(childNodes),
            half = _getChildState3.half,
            _all = _getChildState3.all;

        if (!_all) {
          _this3.checked = _all;
          _this3.indeterminate = half;
        }
      }
    };

    if (!this.store.checkStrictly && this.shouldLoadData()) {
      // Only work on lazy load data.
      this.loadData(function () {
        handleDescendants(true);
      }, {
        checked: value !== false
      });
    } else {
      handleDescendants();
    }
    var parent = this.parent;
    if (!parent || parent.level === 0) return;

    if (!this.store.checkStrictly && !recursion) {
      reInitChecked(parent);
    }
  };

  Node.prototype.getChildren = function getChildren() {
    var forceInit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    // this is data
    var data = this.data;
    if (!data) return null;

    var props = this.store.props;
    var children = 'children';
    if (props) {
      children = props.children || 'children';
    }

    if (data[children] === undefined) {
      data[children] = null;
    }
    if (forceInit && !data[children]) {
      data[children] = [];
    }
    return data[children];
  };

  Node.prototype.updateChildren = function updateChildren() {
    var _this4 = this;

    var newData = this.getChildren() || [];
    var oldData = this.childNodes.map(function (node) {
      return node.data;
    });

    var newDataMap = {};
    var newNodes = [];

    newData.forEach(function (item, index) {
      if (item[NODE_KEY]) {
        newDataMap[item[NODE_KEY]] = { index: index, data: item };
      } else {
        newNodes.push({ index: index, data: item });
      }
    });

    oldData.forEach(function (item) {
      if (!newDataMap[item[NODE_KEY]]) _this4.removeChildByData(item);
    });

    newNodes.forEach(function (_ref) {
      var index = _ref.index,
          data = _ref.data;

      _this4.insertChild({ data: data }, index);
    });

    this.updateLeafState();
  };

  Node.prototype.loadData = function loadData(callback) {
    var _this5 = this;

    var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.store.lazy === true && this.store.load && !this.loaded && (!this.loading || Object.keys(defaultProps).length)) {
      this.loading = true;

      var resolve = function resolve(children) {
        _this5.loaded = true;
        _this5.loading = false;
        _this5.childNodes = [];

        _this5.doCreateChildren(children, defaultProps);

        _this5.updateLeafState();
        if (callback) {
          callback.call(_this5, children);
        }
      };

      this.store.load(this, resolve);
    } else {
      if (callback) {
        callback.call(this);
      }
    }
  };

  _createClass(Node, [{
    key: 'label',
    get: function get() {
      return getPropertyFromData(this, 'label');
    }
  }, {
    key: 'icon',
    get: function get() {
      return getPropertyFromData(this, 'icon');
    }
  }, {
    key: 'key',
    get: function get() {
      var nodeKey = this.store.key;
      if (this.data) return this.data[nodeKey];
      return null;
    }
  }, {
    key: 'disabled',
    get: function get() {
      return getPropertyFromData(this, 'disabled');
    }
  }, {
    key: 'nextSibling',
    get: function get() {
      var parent = this.parent;
      if (parent) {
        var index = parent.childNodes.indexOf(this);
        if (index > -1) {
          return parent.childNodes[index + 1];
        }
      }
      return null;
    }
  }, {
    key: 'previousSibling',
    get: function get() {
      var parent = this.parent;
      if (parent) {
        var index = parent.childNodes.indexOf(this);
        if (index > -1) {
          return index > 0 ? parent.childNodes[index - 1] : null;
        }
      }
      return null;
    }
  }]);

  return Node;
}();

/* harmony default export */ var model_node = (node_Node);
// CONCATENATED MODULE: ./packages/tree/src/model/tree-store.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function tree_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var tree_store_TreeStore = function () {
  function TreeStore(options) {
    var _this2 = this;

    tree_store_classCallCheck(this, TreeStore);

    this.currentNode = null;
    this.currentNodeKey = null;
    this.allHidden = false;

    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }

    this.nodesMap = {};

    this.root = new model_node({
      data: this.data,
      store: this
    });

    if (this.lazy && this.load) {
      var loadFn = this.load;
      loadFn(this.root, function (data) {
        _this2.root.doCreateChildren(data);
        _this2._initDefaultCheckedNodes();
      });
    } else {
      this._initDefaultCheckedNodes();
    }
  }

  TreeStore.prototype.filter = function filter(value) {
    var _this = this;
    var filterNodeMethod = this.filterNodeMethod;
    var lazy = this.lazy;
    var traverse = function traverse(node) {
      var childNodes = node.root ? node.root.childNodes : node.childNodes;

      childNodes.forEach(function (child) {
        child.visible = filterNodeMethod.call(child, value, child.data, child);

        traverse(child);
      });

      if (!node.visible && childNodes.length) {
        _this.allHidden = true;
        _this.allHidden = !childNodes.some(function (child) {
          return child.visible;
        });

        if (node.root) {
          node.root.visible = _this.allHidden === false;
        } else {
          node.visible = _this.allHidden === false;
        }
      }
      if (!value) return;

      if (node.visible && !node.isLeaf && !lazy) node.expand();
    };

    traverse(this);
  };

  TreeStore.prototype.setData = function setData(newVal) {
    var instanceChanged = newVal !== this.root.data;
    if (instanceChanged) {
      this.root.setData(newVal);
      this._initDefaultCheckedNodes();
    } else {
      this.root.updateChildren();
    }
  };

  TreeStore.prototype.getNode = function getNode(data) {
    var key = (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' ? data : util_getNodeKey(this.key, data);
    return this.nodesMap[key];
  };

  TreeStore.prototype.insertBefore = function insertBefore(data, refData) {
    var refNode = this.getNode(refData);
    refNode.parent.insertBefore({ data: data }, refNode);
  };

  TreeStore.prototype.insertAfter = function insertAfter(data, refData) {
    var refNode = this.getNode(refData);
    refNode.parent.insertAfter({ data: data }, refNode);
  };

  TreeStore.prototype.remove = function remove(data) {
    var node = this.getNode(data);
    if (node) {
      node.parent.removeChild(node);
    }
  };

  TreeStore.prototype.append = function append(data, parentData) {
    var parentNode = parentData ? this.getNode(parentData) : this.root;

    if (parentNode) {
      parentNode.insertChild({ data: data });
    }
  };

  TreeStore.prototype._initDefaultCheckedNodes = function _initDefaultCheckedNodes() {
    var _this3 = this;

    var defaultCheckedKeys = this.defaultCheckedKeys || [];
    var nodesMap = this.nodesMap;

    defaultCheckedKeys.forEach(function (checkedKey) {
      var node = nodesMap[checkedKey];

      if (node) {
        node.setChecked(true, !_this3.checkStrictly);
      }
    });
  };

  TreeStore.prototype._initDefaultCheckedNode = function _initDefaultCheckedNode(node) {
    var defaultCheckedKeys = this.defaultCheckedKeys || [];

    if (defaultCheckedKeys.indexOf(node.key) !== -1) {
      node.setChecked(true, !this.checkStrictly);
    }
  };

  TreeStore.prototype.setDefaultCheckedKey = function setDefaultCheckedKey(newVal) {
    if (newVal !== this.defaultCheckedKeys) {
      this.defaultCheckedKeys = newVal;
      this._initDefaultCheckedNodes();
    }
  };

  TreeStore.prototype.registerNode = function registerNode(node) {
    var key = this.key;
    if (!key || !node || !node.data) return;

    var nodeKey = node.key;
    if (nodeKey !== undefined) this.nodesMap[node.key] = node;
  };

  TreeStore.prototype.deregisterNode = function deregisterNode(node) {
    var key = this.key;
    if (!key || !node || !node.data) return;

    delete this.nodesMap[node.key];
  };

  TreeStore.prototype.getCheckedNodes = function getCheckedNodes() {
    var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var checkedNodes = [];
    var traverse = function traverse(node) {
      var childNodes = node.root ? node.root.childNodes : node.childNodes;

      childNodes.forEach(function (child) {
        if (!leafOnly && child.checked || leafOnly && child.isLeaf && child.checked) {
          checkedNodes.push(child.data);
        }

        traverse(child);
      });
    };

    traverse(this);

    return checkedNodes;
  };

  TreeStore.prototype.getCheckedKeys = function getCheckedKeys() {
    var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var key = this.key;
    var allNodes = this._getAllNodes();
    var keys = [];
    allNodes.forEach(function (node) {
      if (!leafOnly || leafOnly && node.isLeaf) {
        if (node.checked) {
          keys.push((node.data || {})[key]);
        }
      }
    });
    return keys;
  };

  TreeStore.prototype.getHalfCheckedNodes = function getHalfCheckedNodes() {
    var nodes = [];
    var traverse = function traverse(node) {
      var childNodes = node.root ? node.root.childNodes : node.childNodes;

      childNodes.forEach(function (child) {
        if (child.indeterminate) {
          nodes.push(child.data);
        }

        traverse(child);
      });
    };

    traverse(this);

    return nodes;
  };

  TreeStore.prototype.getHalfCheckedKeys = function getHalfCheckedKeys() {
    var _this4 = this;

    return this.getHalfCheckedNodes().map(function (data) {
      return (data || {})[_this4.key];
    });
  };

  TreeStore.prototype._getAllNodes = function _getAllNodes() {
    var allNodes = [];
    var nodesMap = this.nodesMap;
    for (var nodeKey in nodesMap) {
      if (nodesMap.hasOwnProperty(nodeKey)) {
        allNodes.push(nodesMap[nodeKey]);
      }
    }

    return allNodes;
  };

  TreeStore.prototype.updateChildren = function updateChildren(key, data) {
    var node = this.nodesMap[key];
    if (!node) return;
    var childNodes = node.childNodes;
    for (var i = childNodes.length - 1; i >= 0; i--) {
      var child = childNodes[i];
      this.remove(child.data);
    }
    for (var _i = 0, j = data.length; _i < j; _i++) {
      var _child = data[_i];
      this.append(_child, node.data);
    }
  };

  TreeStore.prototype._setCheckedKeys = function _setCheckedKeys(key) {
    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var checkedKeys = arguments[2];

    var allNodes = this._getAllNodes().sort(function (a, b) {
      return b.level - a.level;
    });
    var cache = Object.create(null);
    var keys = Object.keys(checkedKeys);
    allNodes.forEach(function (node) {
      return node.setChecked(false, false);
    });
    for (var i = 0, j = allNodes.length; i < j; i++) {
      var node = allNodes[i];
      var nodeKey = node.data[key].toString();
      var checked = keys.indexOf(nodeKey) > -1;
      if (!checked) {
        if (node.checked && !cache[nodeKey]) {
          node.setChecked(false, false);
        }
        continue;
      }

      var parent = node.parent;
      while (parent && parent.level > 0) {
        cache[parent.data[key]] = true;
        parent = parent.parent;
      }

      if (node.isLeaf || this.checkStrictly) {
        node.setChecked(true, false);
        continue;
      }
      node.setChecked(true, true);

      if (leafOnly) {
        (function () {
          node.setChecked(false, false);
          var traverse = function traverse(node) {
            var childNodes = node.childNodes;
            childNodes.forEach(function (child) {
              if (!child.isLeaf) {
                child.setChecked(false, false);
              }
              traverse(child);
            });
          };
          traverse(node);
        })();
      }
    }
  };

  TreeStore.prototype.setCheckedNodes = function setCheckedNodes(array) {
    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var key = this.key;
    var checkedKeys = {};
    array.forEach(function (item) {
      checkedKeys[(item || {})[key]] = true;
    });

    this._setCheckedKeys(key, leafOnly, checkedKeys);
  };

  TreeStore.prototype.setCheckedKeys = function setCheckedKeys(keys) {
    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    this.defaultCheckedKeys = keys;
    var key = this.key;
    var checkedKeys = {};
    keys.forEach(function (key) {
      checkedKeys[key] = true;
    });

    this._setCheckedKeys(key, leafOnly, checkedKeys);
  };

  TreeStore.prototype.setDefaultExpandedKeys = function setDefaultExpandedKeys(keys) {
    var _this5 = this;

    keys = keys || [];
    this.defaultExpandedKeys = keys;

    keys.forEach(function (key) {
      var node = _this5.getNode(key);
      if (node) node.expand(null, _this5.autoExpandParent);
    });
  };

  TreeStore.prototype.setChecked = function setChecked(data, checked, deep) {
    var node = this.getNode(data);

    if (node) {
      node.setChecked(!!checked, deep);
    }
  };

  TreeStore.prototype.getCurrentNode = function getCurrentNode() {
    return this.currentNode;
  };

  TreeStore.prototype.setUserCurrentNode = function setUserCurrentNode(node) {
    var key = node[this.key];
    var currNode = this.nodesMap[key];
    this.setCurrentNode(currNode);
  };

  TreeStore.prototype.setCurrentNode = function setCurrentNode(currentNode) {
    var nodes = this._getAllNodes();
    nodes.forEach(function (node) {
      node.isCurrent = false;
    });
    currentNode.isCurrent = true;
    this.currentNode = currentNode;
  };

  TreeStore.prototype.setCurrentNodeKey = function setCurrentNodeKey(key) {
    if (!key) {
      this.currentNode = null;
    } else {
      var node = this.getNode(key);
      if (node) {
        this.setCurrentNode(node);
      }
    }
  };

  return TreeStore;
}();

/* harmony default export */ var tree_store = (tree_store_TreeStore);
;
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/tree/src/tree-node.vue?vue&type=template&id=3ba3ef0e&
var tree_nodevue_type_template_id_3ba3ef0e_render = function() {
  var this$1 = this
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.node.visible,
          expression: "node.visible"
        }
      ],
      ref: "node",
      staticClass: "el-tree-node",
      class: {
        "is-expanded": _vm.childNodeRendered && _vm.expanded,
        "is-current": _vm.node.isCurrent,
        "is-hidden": !_vm.node.visible
      },
      attrs: {
        role: "treeitem",
        tabindex: "-1",
        "aria-expanded": _vm.expanded,
        "aria-disabled": _vm.node.disabled,
        "aria-checked": _vm.node.checked,
        draggable: _vm.tree.draggable
      },
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.handleClick($event)
        },
        dblclick: function($event) {
          $event.stopPropagation()
          return _vm.handleDbClick($event)
        },
        contextmenu: function($event) {
          return this$1.handleContextMenu($event)
        },
        dragstart: function($event) {
          $event.stopPropagation()
          return _vm.handleDragStart($event)
        },
        dragover: function($event) {
          $event.stopPropagation()
          return _vm.handleDragOver($event)
        },
        dragend: function($event) {
          $event.stopPropagation()
          return _vm.handleDragEnd($event)
        },
        drop: function($event) {
          $event.stopPropagation()
          return _vm.handleDrop($event)
        }
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "el-tree-node__content",
          style: {
            "padding-left": (_vm.node.level - 1) * _vm.tree.indent + "px"
          }
        },
        [
          _c("span", {
            class: [
              {
                "is-leaf": _vm.node.isLeaf,
                expanded: !_vm.node.isLeaf && _vm.expanded
              },
              "el-tree-node__expand-icon",
              _vm.tree.iconClass ? _vm.tree.iconClass : "el-icon-caret-right"
            ],
            attrs: {
              title:
                !_vm.node.isLeaf && _vm.expanded
                  ? _vm.t("el.tree.expanded")
                  : _vm.t("el.tree.notExpanded")
            },
            on: {
              click: function($event) {
                $event.stopPropagation()
                return _vm.handleExpandIconClick($event)
              }
            }
          }),
          _vm.node.loading
            ? _c("span", {
                staticClass: "el-tree-node__loading-icon el-icon-loading"
              })
            : _vm._e(),
          _vm.tree.showCheckbox
            ? _c("el-checkbox", {
                attrs: {
                  indeterminate: _vm.node.indeterminate,
                  disabled: _vm.disabled || !!_vm.node.disabled
                },
                on: { change: _vm.handleCheckChange },
                nativeOn: {
                  click: function($event) {
                    $event.stopPropagation()
                  }
                },
                model: {
                  value: _vm.node.checked,
                  callback: function($$v) {
                    _vm.$set(_vm.node, "checked", $$v)
                  },
                  expression: "node.checked"
                }
              })
            : _vm._e(),
          _vm.nodeIconObj.length > 0
            ? _c("span", { staticClass: "node-icon", class: _vm.nodeIconObj })
            : _vm._e(),
          _c("node-content", { attrs: { node: _vm.node } }),
          _vm.show
            ? _c("custom-content", {
                directives: [
                  {
                    name: "clickoutside",
                    rawName: "v-clickoutside",
                    value: _vm.handleClose,
                    expression: "handleClose"
                  }
                ],
                attrs: { node: _vm.node }
              })
            : _vm._e()
        ],
        1
      ),
      !_vm.renderAfterExpand || _vm.childNodeRendered
        ? _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.expanded,
                  expression: "expanded"
                }
              ],
              staticClass: "el-tree-node__children"
            },
            _vm._l(_vm.node.childNodes, function(child) {
              return _c("el-tree-node", {
                key: _vm.getNodeKey(child),
                attrs: {
                  "render-content": _vm.renderContent,
                  "render-custom-content": _vm.renderCustomContent,
                  node: child,
                  disabled: _vm.disabled
                },
                on: { "node-expand": _vm.handleChildNodeExpand }
              })
            }),
            1
          )
        : _vm._e()
    ]
  )
}
var tree_nodevue_type_template_id_3ba3ef0e_staticRenderFns = []
tree_nodevue_type_template_id_3ba3ef0e_render._withStripped = true


// CONCATENATED MODULE: ./packages/tree/src/tree-node.vue?vue&type=template&id=3ba3ef0e&

// EXTERNAL MODULE: external "@/lib/transitions/collapse-transition"
var collapse_transition_ = __webpack_require__(60);
var collapse_transition_default = /*#__PURE__*/__webpack_require__.n(collapse_transition_);

// EXTERNAL MODULE: external "@/lib/checkbox"
var checkbox_ = __webpack_require__(26);
var checkbox_default = /*#__PURE__*/__webpack_require__.n(checkbox_);

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: external "@/lib/utils/clickoutside"
var clickoutside_ = __webpack_require__(9);
var clickoutside_default = /*#__PURE__*/__webpack_require__.n(clickoutside_);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/tree/src/tree-node.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var tree_nodevue_type_script_lang_js_ = ({
  name: "ElTreeNode",
  xtype: "YuTreeNode",

  componentName: "ElTreeNode",

  mixins: [emitter_default.a, locale_default.a],

  directives: { Clickoutside: clickoutside_default.a },

  props: {
    node: {
      default: function _default() {
        return {};
      }
    },
    props: {},
    disabled: Boolean,
    renderContent: Function,
    renderCustomContent: Function,
    renderAfterExpand: {
      type: Boolean,
      default: true
    }
  },
  components: {
    ElCollapseTransition: collapse_transition_default.a,
    ElCheckbox: checkbox_default.a,
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render: function render(h) {
        var parent = this.$parent;
        var node = this.node;
        var data = node.data;
        var store = node.store;
        return parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, {
          _self: parent.tree.$vnode.context,
          node: node,
          data: data,
          store: store
        }) : h(
          "span",
          { "class": "el-tree-node__label" },
          [node.label]
        );
      }
    },
    CustomContent: {
      props: {
        node: {
          required: true
        }
      },
      render: function render(h) {
        var parent = this.$parent;
        var node = this.node;
        var data = node.data;
        var store = node.store;
        return parent.renderCustomContent ? parent.renderCustomContent.call(parent._renderProxy, h, {
          _self: parent.tree.$vnode.context,
          node: node,
          data: data,
          store: store
        }) : "";
      }
    }
  },

  data: function data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      showCheckbox: false,
      oldChecked: null,
      oldIndeterminate: null,
      show: false
    };
  },


  watch: {
    "node.indeterminate": function nodeIndeterminate(val) {
      this.handleSelectChange(this.node.checked, val);
    },
    "node.checked": function nodeChecked(val) {
      this.handleSelectChange(val, this.node.indeterminate);
    },
    "node.expanded": function nodeExpanded(val) {
      var _this = this;

      this.$nextTick(function () {
        return _this.expanded = val;
      });
      if (val) {
        this.childNodeRendered = true;
      }
    }
  },
  computed: {
    nodeIconObj: {
      get: function get() {
        var obj = [];
        if (this.tree.props && this.tree.props.icon && this.node.data[this.tree.props.icon]) {
          obj = [this.node.data[this.tree.props.icon]];
        } else if (this.node.data.icon) {
          obj = [this.node.data.icon];
        }
        return obj;
      }
    }
  },
  methods: {
    handleClose: function handleClose() {
      this.show = false;
    },
    getNodeKey: function getNodeKey(node) {
      return util_getNodeKey(this.tree.nodeKey, node.data);
    },
    handleSelectChange: function handleSelectChange(checked, indeterminate) {
      if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
        this.tree.$emit("check-change", this.node.data, checked, indeterminate);
      }
      this.oldChecked = checked;
      this.indeterminate = indeterminate;
    },
    handleClick: function handleClick() {
      var store = this.tree.store;
      store.setCurrentNode(this.node);
      this.tree.$emit("current-change", store.currentNode ? store.currentNode.data : null, store.currentNode);
      this.tree.currentNode = this;
      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick();
      }
      this.tree.$emit("node-click", this.node.data, this.node, this);
    },
    handleContextMenu: function handleContextMenu(event) {
      if (this.tree._events["node-contextmenu"] && this.tree._events["node-contextmenu"].length > 0) {
        event.stopPropagation();
        event.preventDefault();
      }
      if (this.tree.renderCustomContent) {
        event.stopPropagation();
        event.preventDefault();
        this.show = true;
      }
      this.tree.$emit("node-contextmenu", event, this.node.data, this.node, this);
    },
    handleDbClick: function handleDbClick() {
      this.tree.$emit("node-dbclick", this.node.data, this.node, this);
    },
    handleExpandIconClick: function handleExpandIconClick() {
      if (this.node.isLeaf) return;
      if (this.expanded) {
        this.tree.$emit("node-collapse", this.node.data, this.node, this);
        this.node.collapse();
      } else {
        this.node.expand();
        this.$emit("node-expand", this.node.data, this.node, this);
      }
    },
    handleCheckChange: function handleCheckChange(ev, value) {
      var _this2 = this;

      this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);
      this.$nextTick(function () {
        var store = _this2.tree.store;
        _this2.tree.$emit("check", _this2.node.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys()
        });
      });
    },
    handleChildNodeExpand: function handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast("ElTreeNode", "tree-node-expand", node);
      this.tree.$emit("node-expand", nodeData, node, instance);
    },
    handleDragStart: function handleDragStart(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit("tree-node-drag-start", event, this);
    },
    handleDragOver: function handleDragOver(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit("tree-node-drag-over", event, this);
      event.preventDefault();
    },
    handleDrop: function handleDrop(event) {
      event.preventDefault();
    },
    handleDragEnd: function handleDragEnd(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit("tree-node-drag-end", event, this);
    }
  },

  created: function created() {
    var _this3 = this;

    var parent = this.$parent;

    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }

    var tree = this.tree;
    if (!tree) {
      console.warn("Can not find node's tree.");
    }

    var props = tree.props || {};
    var childrenKey = props["children"] || "children";

    this.unwatch = this.$watch("node.data." + childrenKey, function () {
      _this3.node.updateChildren();
    });

    // this.showCheckbox = tree.showCheckbox;

    if (this.node.expanded) {
      this.expanded = true;
      this.childNodeRendered = true;
    }

    if (this.tree.accordion) {
      this.$on("tree-node-expand", function (node) {
        if (_this3.node !== node) {
          _this3.node.collapse();
        }
      });
    }
  },
  destroyed: function destroyed() {
    this.$off();
    this.unwatch();
  }
});
// CONCATENATED MODULE: ./packages/tree/src/tree-node.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tree_nodevue_type_script_lang_js_ = (tree_nodevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/tree/src/tree-node.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_tree_nodevue_type_script_lang_js_,
  tree_nodevue_type_template_id_3ba3ef0e_render,
  tree_nodevue_type_template_id_3ba3ef0e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/tree/src/tree-node.vue"
/* harmony default export */ var tree_node = (component.exports);
// EXTERNAL MODULE: external "@/lib/utils/dom"
var dom_ = __webpack_require__(2);

// EXTERNAL MODULE: external "@/lib/locale"
var lib_locale_ = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/tree/src/tree.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var treevue_type_script_lang_js_ = ({
  name: 'ElTree',
  xtype: 'YuTree',

  mixins: [emitter_default.a],

  components: {
    ElTreeNode: tree_node
  },

  data: function data() {
    return {
      store: null,
      root: null,
      currentNode: null,
      dragState: {
        showDropIndicator: false,
        draggingNode: null,
        dropNode: null,
        allowDrop: true
      }
    };
  },


  props: {
    data: {
      type: Array
    },
    emptyText: {
      type: String,
      default: function _default() {
        return Object(lib_locale_["t"])('el.tree.emptyText');
      }
    },
    renderAfterExpand: {
      type: Boolean,
      default: true
    },
    checkOnClickNode: Boolean,
    nodeKey: String,
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
    renderCustomContent: Function,
    showCheckbox: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    allowDrag: Function,
    allowDrop: Function,
    props: {
      default: function _default() {
        return {
          children: 'children',
          label: 'label',
          icon: 'icon',
          disabled: 'disabled'
        };
      }
    },
    lazy: {
      type: Boolean,
      default: false
    },
    highlightCurrent: Boolean,
    currentNodeKey: [String, Number],
    load: Function,
    filterNodeMethod: Function,
    accordion: Boolean,
    indent: {
      type: Number,
      default: 16
    },
    disabled: Boolean,
    forceNodeType: Function,
    iconClass: String
  },

  computed: {
    children: {
      set: function set(value) {
        this.data = value;
      },
      get: function get() {
        return this.data;
      }
    }
  },

  watch: {
    defaultCheckedKeys: function defaultCheckedKeys(newVal) {
      this.store.defaultCheckedKeys = newVal;
      this.store.setDefaultCheckedKey(newVal);
    },
    defaultExpandedKeys: function defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal;
      this.store.setDefaultExpandedKeys(newVal);
    },
    currentNodeKey: function currentNodeKey(newVal) {
      this.store.setCurrentNodeKey(newVal);
      this.store.currentNodeKey = newVal;
    },
    data: function data(newVal) {
      this.store.setData(newVal);
    }
  },

  methods: {
    filter: function filter(value) {
      if (!this.filterNodeMethod) throw new Error(this.t('el.tree.noFilterNodeMethodFn'));
      this.store.filter(value);
    },
    getNodeKey: function getNodeKey(node) {
      return util_getNodeKey(this.nodeKey, node.data);
    },
    getCheckedNodes: function getCheckedNodes(leafOnly) {
      return this.store.getCheckedNodes(leafOnly);
    },
    getCheckedKeys: function getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly);
    },
    setCheckedNodes: function setCheckedNodes(nodes, leafOnly) {
      if (!this.nodeKey) throw new Error(this.t('el.tree.noSetCheckedNodes'));
      this.store.setCheckedNodes(nodes, leafOnly);
    },
    setCheckedKeys: function setCheckedKeys(keys, leafOnly) {
      if (!this.nodeKey) throw new Error(this.t('el.tree.noSetCheckedKeys'));
      this.store.setCheckedKeys(keys, leafOnly);
    },
    setChecked: function setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep);
    },
    getHalfCheckedNodes: function getHalfCheckedNodes() {
      return this.store.getHalfCheckedNodes();
    },
    getHalfCheckedKeys: function getHalfCheckedKeys() {
      return this.store.getHalfCheckedKeys();
    },
    getCurrentNode: function getCurrentNode() {
      var currentNode = this.store.getCurrentNode();
      return currentNode ? currentNode.data : null;
    },
    getCurrentKey: function getCurrentKey() {
      if (!this.nodeKey) throw new Error(this.t('el.tree.noGetCurrentKey'));
      var currentNode = this.getCurrentNode();
      return currentNode ? currentNode[this.nodeKey] : null;
    },
    setCurrentKey: function setCurrentKey(key) {
      if (!this.nodeKey) throw new Error(this.t('el.tree.noSetCurrentKey'));
      this.store.setCurrentNodeKey(key);
    },
    setCurrentNode: function setCurrentNode(node) {
      if (!this.nodeKey) throw new Error(this.t('el.tree.noSetCurrentNode'));
      this.store.setUserCurrentNode(node);
    },
    getNode: function getNode(data) {
      return this.store.getNode(data);
    },
    remove: function remove(data) {
      this.store.remove(data);
    },
    append: function append(data, parentNode) {
      this.store.append(data, parentNode);
    },
    insertBefore: function insertBefore(data, refNode) {
      this.store.insertBefore(data, refNode);
    },
    insertAfter: function insertAfter(data, refNode) {
      this.store.insertAfter(data, refNode);
    },
    handleNodeExpand: function handleNodeExpand(nodeData, node, instance) {
      this.broadcast('ElTreeNode', 'tree-node-expand', node);
      this.$emit('node-expand', nodeData, node, instance);
    },
    updateKeyChildren: function updateKeyChildren(key, data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild');
      this.store.updateChildren(key, data);
    }
  },

  created: function created() {
    var _this = this;

    this.isTree = true;

    this.store = new tree_store({
      key: this.nodeKey,
      data: this.data,
      lazy: this.lazy,
      props: this.props,
      load: this.load,
      currentNodeKey: this.currentNodeKey,
      checkStrictly: this.checkStrictly,
      defaultCheckedKeys: this.defaultCheckedKeys,
      defaultExpandedKeys: this.defaultExpandedKeys,
      autoExpandParent: this.autoExpandParent,
      defaultExpandAll: this.defaultExpandAll,
      filterNodeMethod: this.filterNodeMethod,
      forceNodeType: this.forceNodeType
    });

    this.root = this.store.root;
    var dragState = this.dragState;
    this.$on('tree-node-drag-start', function (event, treeNode) {
      if (typeof _this.allowDrag === 'function' && !_this.allowDrag(treeNode.node)) {
        event.preventDefault();
        return false;
      }
      event.dataTransfer.effectAllowed = 'move';

      // wrap in try catch to address IE's error when first param is 'text/plain'
      try {
        // setData is required for draggable to work in FireFox
        // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
        event.dataTransfer.setData('text/plain', '');
      } catch (e) {}
      dragState.draggingNode = treeNode;
      _this.$emit('node-drag-start', treeNode.node, event);
    });

    this.$on('tree-node-drag-over', function (event, treeNode) {
      var dropNode = findNearestComponent(event.target, 'ElTreeNode');
      var oldDropNode = dragState.dropNode;
      if (oldDropNode && oldDropNode !== dropNode) {
        Object(dom_["removeClass"])(oldDropNode.$el, 'is-drop-inner');
      }
      var draggingNode = dragState.draggingNode;
      if (!draggingNode || !dropNode) return;

      var dropPrev = true;
      var dropInner = true;
      var dropNext = true;
      var userAllowDropInner = true;
      if (typeof _this.allowDrop === 'function') {
        dropPrev = _this.allowDrop(draggingNode.node, dropNode.node, 'prev');
        userAllowDropInner = dropInner = _this.allowDrop(draggingNode.node, dropNode.node, 'inner');
        dropNext = _this.allowDrop(draggingNode.node, dropNode.node, 'next');
      }
      event.dataTransfer.dropEffect = dropInner ? 'move' : 'none';
      if ((dropPrev || dropInner || dropNext) && oldDropNode !== dropNode) {
        if (oldDropNode) {
          _this.$emit('node-drag-leave', draggingNode.node, oldDropNode.node, event);
        }
        _this.$emit('node-drag-enter', draggingNode.node, dropNode.node, event);
      }

      if (dropPrev || dropInner || dropNext) {
        dragState.dropNode = dropNode;
      }

      if (dropNode.node.nextSibling === draggingNode.node) {
        dropNext = false;
      }
      if (dropNode.node.previousSibling === draggingNode.node) {
        dropPrev = false;
      }
      if (dropNode.node.contains(draggingNode.node, false)) {
        dropInner = false;
      }
      if (draggingNode.node === dropNode.node || draggingNode.node.contains(dropNode.node)) {
        dropPrev = false;
        dropInner = false;
        dropNext = false;
      }

      var targetPosition = dropNode.$el.getBoundingClientRect();
      var treePosition = _this.$el.getBoundingClientRect();

      var dropType = void 0;
      var prevPercent = dropPrev ? dropInner ? 0.25 : dropNext ? 0.45 : 1 : -1;
      var nextPercent = dropNext ? dropInner ? 0.75 : dropPrev ? 0.55 : 0 : 1;

      var indicatorTop = -9999;
      var distance = event.clientY - targetPosition.top;
      if (distance < targetPosition.height * prevPercent) {
        dropType = 'before';
      } else if (distance > targetPosition.height * nextPercent) {
        dropType = 'after';
      } else if (dropInner) {
        dropType = 'inner';
      } else {
        dropType = 'none';
      }

      var dropIndicator = _this.$refs.dropIndicator;
      if (dropType === 'before') {
        indicatorTop = targetPosition.top - treePosition.top;
      } else if (dropType === 'after') {
        indicatorTop = targetPosition.bottom - treePosition.top;
      }
      dropIndicator.style.top = indicatorTop + 'px';
      dropIndicator.style.left = targetPosition.right - treePosition.left + 'px';

      if (dropType === 'inner') {
        Object(dom_["addClass"])(dropNode.$el, 'is-drop-inner');
      } else {
        Object(dom_["removeClass"])(dropNode.$el, 'is-drop-inner');
      }

      dragState.showDropIndicator = dropType === 'before' || dropType === 'after';
      dragState.allowDrop = dragState.showDropIndicator || userAllowDropInner;
      dragState.dropType = dropType;
      _this.$emit('node-drag-over', draggingNode.node, dropNode.node, event);
    });

    this.$on('tree-node-drag-end', function (event) {
      var draggingNode = dragState.draggingNode,
          dropType = dragState.dropType,
          dropNode = dragState.dropNode;

      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';

      if (draggingNode && dropNode) {
        var data = draggingNode.node.data;
        if (dropType === 'before') {
          draggingNode.node.remove();
          dropNode.node.parent.insertBefore({ data: data }, dropNode.node);
        } else if (dropType === 'after') {
          draggingNode.node.remove();
          dropNode.node.parent.insertAfter({ data: data }, dropNode.node);
        } else if (dropType === 'inner') {
          dropNode.node.insertChild({ data: data });
          draggingNode.node.remove();
        }
        Object(dom_["removeClass"])(dropNode.$el, 'is-drop-inner');

        _this.$emit('node-drag-end', draggingNode.node, dropNode.node, dropType, event);
        if (dropType !== 'none') {
          _this.$emit('node-drop', draggingNode.node, dropNode.node, dropType, event);
        }
      }
      if (draggingNode && !dropNode) {
        _this.$emit('node-drag-end', draggingNode.node, null, dropType, event);
      }

      dragState.showDropIndicator = false;
      dragState.draggingNode = null;
      dragState.dropNode = null;
      dragState.allowDrop = true;
    });
  },
  destroyed: function destroyed() {
    this.$off();
  }
});
// CONCATENATED MODULE: ./packages/tree/src/tree.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_treevue_type_script_lang_js_ = (treevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/tree/src/tree.vue





/* normalize component */

var tree_component = Object(componentNormalizer["a" /* default */])(
  src_treevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var tree_api; }
tree_component.options.__file = "packages/tree/src/tree.vue"
/* harmony default export */ var tree = (tree_component.exports);
// CONCATENATED MODULE: ./packages/tree/index.js


/* istanbul ignore next */
tree.install = function (Vue) {
  Vue.component(tree.name, tree);
};

/* harmony default export */ var packages_tree = __webpack_exports__["default"] = (tree);

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/dom");

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = require("@/lib/checkbox");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

module.exports = require("@/lib/transitions/collapse-transition");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/clickoutside");

/***/ })

/******/ });