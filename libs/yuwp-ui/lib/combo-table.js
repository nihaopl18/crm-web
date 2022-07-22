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
/******/ 	return __webpack_require__(__webpack_require__.s = 186);
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

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/combo-table/src/combo-table.vue?vue&type=template&id=0969f950&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "el-combo-table el-select" },
    [
      _c(
        "el-popover",
        {
          ref: "selectPopover",
          attrs: {
            placement: "bottom-start",
            trigger: "click",
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
          _c("el-table-x", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.visible,
                expression: "visible"
              }
            ],
            ref: "selectTableX",
            attrs: {
              "default-load": _vm.defaultLoad,
              pageable: _vm.pageable,
              "data-url": _vm.dataUrl,
              "base-params": _vm.baseParams,
              checkbox: _vm.multiple,
              "row-index": _vm.rowIndex,
              "table-columns": _vm.tableColumns,
              "table-filters": _vm.tableFilters,
              height: _vm.tableHeight,
              "max-height": _vm.tableMaxHeight,
              stripe: _vm.stripe,
              border: _vm.border,
              fit: _vm.fit,
              "show-header": _vm.showHeader,
              "highlight-current-row": _vm.highlightCurrentRow,
              "hide-column": _vm.hideColumn,
              "empty-text": _vm.emptyText,
              "default-sort": _vm.defaultSort,
              "request-type": _vm.requestType,
              async: _vm.async,
              "json-data": _vm.jsonData,
              "json-total": _vm.jsonTotal,
              "page-key": _vm.pageKey,
              "size-key": _vm.sizeKey,
              "condition-key": _vm.conditionKey,
              "current-row-key": _vm.currentRowKey,
              "row-key": _vm.dataId
            },
            on: {
              loaded: _vm.loaded,
              "selection-change": _vm.selectionsChange,
              "row-click": _vm.rowClickFn,
              "row-dblclick": _vm.rowClickFn
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
        : _c("el-input", {
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


// CONCATENATED MODULE: ./packages/combo-table/src/combo-table.vue?vue&type=template&id=0969f950&

// EXTERNAL MODULE: external "@/lib/utils/dom"
var dom_ = __webpack_require__(2);

// EXTERNAL MODULE: external "@/lib/locale"
var locale_ = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/combo-table/src/combo-table.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var combo_tablevue_type_script_lang_js_ = ({
  name: 'ElComboTable',
  xtype: 'YuComboTable',

  props: {
    value: {
      required: true
    },
    dataId: {
      type: String,
      default: 'id',
      required: true
    },
    dataLabel: {
      type: String,
      default: 'label',
      required: true
    },
    placeholder: {
      type: String,
      default: function _default() {
        return Object(locale_["t"])('el.combotable.placeholder');
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
    /* 表格组件参数*/
    defaultLoad: {
      type: Boolean,
      default: true
    },
    pageable: {
      type: Boolean,
      default: true
    },
    dataUrl: String,
    baseParams: Object,
    rowIndex: Boolean,
    tableColumns: Array,
    hideColumn: Boolean,
    tableFilters: Object,
    tableHeight: [String, Number],
    tableMaxHeight: [String, Number],
    border: Boolean,
    fit: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    showHeader: Boolean,
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    emptyText: String,
    defaultSort: Object,
    requestType: String,
    async: Boolean,
    jsonData: String,
    jsonTotal: String,
    pageKey: String,
    sizeKey: String,
    conditionKey: String,
    details: Boolean
  },
  data: function data() {
    var selValue = this.multiple ? [] : '';
    selValue = this.value ? this.value : selValue;
    return {
      inputHovering: false,
      tempSelVal: selValue,
      selectedLabel: '',
      visible: false,
      tableSelections: [],
      currentRowKey: ''
    };
  },
  watch: {
    tableSelections: function tableSelections(selections) {
      if (selections.length > 0) {
        var tempArryVal = [];
        var tempArryLabel = [];
        for (var i = 0, length = selections.length; i < length; i++) {
          tempArryVal.push(selections[i][this.dataId]);
          tempArryLabel.push(selections[i][this.dataLabel]);
        }
        this.tempSelVal = this.multiple ? tempArryVal : tempArryVal[0];
        this.selectedLabel = this.multiple ? tempArryLabel.join(',') : tempArryLabel[0];
      } else {
        var blankVal = this.multiple ? [] : '';
        this.tempSelVal = blankVal;
        this.selectedLabel = '';
      }
    },
    value: function value(val) {
      if (val === undefined) {
        this.clear();
      }
      if (this.tempSelVal !== val) {
        this.tempSelVal = val;
      }
      this.$nextTick(function () {
        this.setSelected();
      });
    },
    tempSelVal: function tempSelVal(val, oldVal) {
      this.$emit('input', val);
      this.$emit('change', val, oldVal);
    },
    visible: function visible(val) {
      if (!val) {
        this.handleIconHide();
      } else {
        this.handleIconShow();
      }
      this.$emit('visible-change', val);
    }
  },
  computed: {
    iconClass: function iconClass() {
      var criteria = this.clearable && !this.disabled && this.inputHovering && this.value !== undefined && (this.multiple ? this.value.length > 0 : this.value !== '');
      return criteria ? 'circle-close is-show-close' : 'caret-top';
    }
  },
  methods: {
    // :popper-options="{onUpdate: changeTop}"
    // changeTop: function(data) {
    //   var poperDom = this.getDom('.el-popover');
    //   var select = this.getDom('.is-clickable');
    //   var poperTop = data && data.offsets.popper.top;
    //   var selectTop = this.getTop(select);
    //   var top = selectTop - poperTop;
    //   if (top > 10) {
    //     poperDom.style.top = `${poperDom.style.top + top}px`;
    //   }
    // },
    // getDom: function(selector) {
    //   return document.querySelector(selector);
    // },
    // getTop: function(e) {
    //   var offset = e.offsetTop;
    //   if (e.offsetParent != null) {
    //     offset = offset + this.getTop(e.offsetParent);
    //   }
    //   return offset;
    // },
    loaded: function loaded() {
      this.setSelected();
    },
    selectionsChange: function selectionsChange(selections) {
      this.tableSelections = selections;
    },
    rowClickFn: function rowClickFn(row, event, column) {
      if (!this.multiple) {
        this.tableSelections = this.$refs.selectTableX.selections;
        if (this.tableSelections.length > 0) {
          this.visible = false;
        }
      }
    },
    setSelected: function setSelected() {
      var tableData = this.$refs.selectTableX.data;
      var vals = this.tempSelVal;
      var dataId = this.dataId;
      var rows = [];
      if (this.multiple) {
        if (vals.length > 0) {
          for (var j = 0, length2 = vals.length; j < length2; j++) {
            for (var i = 0, length = tableData.length; i < length; i++) {
              if (vals[j] === tableData[i][dataId]) {
                rows.push(tableData[i]);
                break;
              }
            }
          }
        }
      } else {
        if (vals) {
          for (var n = 0, len = tableData.length; n < len; n++) {
            if (vals === tableData[n][dataId]) {
              rows.push(tableData[n]);
              break;
            }
          }
        }
      }
      this.$nextTick(function () {
        if (!this.multiple) {
          // this.$refs.selectTableX.clearSelection();
          // for (var i = 0, length = rows.length; i < length; i++) {
          //   this.$refs.selectTableX.toggleRowSelection(rows[i]);
          // }
          // } else {
          this.currentRowKey = vals;
        }
        this.setSelectedLabel(rows);
      });
    },
    setSelectedLabel: function setSelectedLabel(selections) {
      this.$nextTick(function () {
        if (selections.length > 0) {
          var tempArryLabel = [];
          for (var i = 0, length = selections.length; i < length; i++) {
            tempArryLabel.push(selections[i][this.dataLabel]);
          }
          this.selectedLabel = this.multiple ? tempArryLabel.join(',') : tempArryLabel[0];
        } else {
          this.selectedLabel = '';
        }
      });
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
    getSelectedObjs: function getSelectedObjs() {
      var _this = this;
      var resultObj;
      if (_this.multiple) {
        // 多选
        resultObj = _this.tableSelections;
      } else {
        // 单选
        resultObj = _this.tableSelections[0];
      }
      return resultObj;
    },
    clear: function clear() {
      if (this.multiple) {
        this.$refs.selectTableX.clearSelection();
      } else {
        this.$refs.selectTableX.setCurrentRow();
        this.tempSelVal = '';
        this.selectedLabel = '';
      }
      this.visible = false;
      this.$emit('clear');
    }
  },
  mounted: function mounted() {
    //    if(this.tempSelVal || this.tempSelVal.length>0){
    //         this.setSelected();
    //     }
  }
});
// CONCATENATED MODULE: ./packages/combo-table/src/combo-table.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_combo_tablevue_type_script_lang_js_ = (combo_tablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/combo-table/src/combo-table.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_combo_tablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/combo-table/src/combo-table.vue"
/* harmony default export */ var combo_table = (component.exports);
// CONCATENATED MODULE: ./packages/combo-table/index.js


/* istanbul ignore next */
combo_table.install = function (Vue) {
  Vue.component(combo_table.name, combo_table);
};

/* harmony default export */ var packages_combo_table = __webpack_exports__["default"] = (combo_table);

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/dom");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ })

/******/ });