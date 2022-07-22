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
/******/ 	return __webpack_require__(__webpack_require__.s = 203);
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

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("@/lib/input");

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/num/src/num.vue?vue&type=template&id=990ddc84&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "el-input-num" },
    [
      _c(
        "el-input",
        _vm._g(
          _vm._b(
            {
              attrs: { "limit-char": _vm.varlimitChar },
              on: {
                blur: function($event) {
                  return _vm.blurFn($event)
                },
                input: _vm.changeFn,
                focus: function($event) {
                  return _vm.focusFn($event)
                }
              },
              model: {
                value: _vm.numValue,
                callback: function($$v) {
                  _vm.numValue = $$v
                },
                expression: "numValue"
              }
            },
            "el-input",
            _vm.$attrs,
            false
          ),
          _vm.$listeners
        )
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/num/src/num.vue?vue&type=template&id=990ddc84&

// EXTERNAL MODULE: external "@/lib/input"
var input_ = __webpack_require__(10);
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// EXTERNAL MODULE: external "@/lib/utils/util"
var util_ = __webpack_require__(4);

// EXTERNAL MODULE: external "mathjs"
var external_mathjs_ = __webpack_require__(83);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/num/src/num.vue?vue&type=script&lang=js&
//
//
//
//
//





/* harmony default export */ var numvue_type_script_lang_js_ = ({
  name: 'ElNum',
  xtype: 'YuNum',
  components: {
    ElInput: input_default.a
  },
  props: {
    value: [String, Number],
    sign: {
      default: '%'
    },
    multiple: {
      type: Number,
      default: 100
    },
    precision: {
      type: Number,
      default: 2
    },
    numberFormatter: String,
    limitChar: RegExp,
    isRounding: {
      type: Boolean,
      default: true
    },
    // 格式化利率，默认不格式化
    formatRate: Boolean
  },
  data: function data() {
    return {
      numValue: this.value === undefined || this.value === null ? '' : this.value,
      inputFlag: false, // 用于判断value 变化的标志
      varlimitChar: this.limitChar,
      varPrecision: this.precision
    };
  },

  watch: {
    value: function value(val) {
      // 没有配置格式化或者配置了格式化且formatRate 为true 才进入利率逻辑
      if (!this.numberFormatter || this.numberFormatter && this.formatRate === true) {
        if (this.inputFlag) {
          this.inputFlag = false;
        } else {
          var currentVal = void 0;
          if (val) {
            // 数字转换为字符串
            currentVal = val + '';
          } else {
            currentVal = val;
          }
          var num = '';
          if (this.isNumber(currentVal)) {
            num = Number(currentVal);
            // 判断是否有格式化
            var frmdt = this.getFixedData(this.formatPrecis(external_mathjs_["multiply"](num, this.multiple)));
            this.numberFormatter ? this.format(frmdt, this.sign) : this.numValue = frmdt + this.sign;
          } else {
            num = this.setValueFormat(currentVal);
            if (num) {
              // 判断是否有格式化
              if (this.numberFormatter) {
                this.format(Number(num), this.sign);
              } else {
                this.numValue = Number(num) + this.sign;
              }
            } else {
              this.numValue = num;
            }
          }
          // if (num) {
          //   this.$emit('change-num', Number(num));
          //   this.$emit('input', Number(num));
          // } else {
          //   this.$emit('change-num', '', '');
          //   this.$emit('input', '');
          // }
        }
      } else {
        if (this.inputFlag) {
          this.inputFlag = false;
          return;
        }
        if (this.isNumber(val)) {
          this.$emit('input', this.getFixedData(val));
          this.format(this.getFixedData(val));
        }
      }
    }
  },
  methods: {
    blurFn: function blurFn(event) {
      this.inputFlag = false;
      // 配置格式化且formatRate 为false 表示进入数字格式化逻辑，否则进入利率逻辑
      if (this.numberFormatter && this.formatRate === false) {
        if (this.isNumber(this.numValue)) {
          this.format(Number(this.numValue));
          this.$emit('num-blur', event);
          this.$emit('input', this.getFixedData(this.value));
        } else {
          if (this.numValue) {
            this.$emit('input', this.numValue);
            this.inputFlag = false;
          } else {
            this.$emit('input', '');
          }
          this.$emit('num-blur', event);
        }
      } else {
        // 利率模式逻辑
        // 有值
        if (this.numValue + '' !== undefined && (this.numValue + '').length > 0 && this.isNumber(this.numValue)) {
          var num = this.numValue;
          if (num) {
            num = this.getFixedData(num);
            // 配置了格式化就格式利率格式数据
            this.numberFormatter ? this.format(Number(num), this.sign) : this.numValue = num + this.sign;
          }
          this.$emit('num-blur', event);
          this.$emit('input', this.formatPrecis(external_mathjs_["divide"](num, this.multiple)));
        } else {
          this.$emit('num-blur', event);
          this.$emit('input', this.numValue);
        }
      }
    },
    changeFn: function changeFn(val) {
      this.inputFlag = true;
      if (!this.numberFormatter) {
        if (val && this.isNumber(val)) {
          this.$emit('change-num', this.formatPrecis(external_mathjs_["divide"](val, this.multiple)));
        } else {
          this.$emit('change-num', val);
        }
      } else {
        if (val && this.isNumber(val)) {
          this.$emit('change-num', this.getFixedData(this.value));
        } else {
          this.$emit('change-num', val);
        }
      }
    },
    focusFn: function focusFn(event) {
      // 配置格式化且formatRate 为false 表示进入数字格式化逻辑，否则进入利率逻辑
      if (this.numberFormatter && this.formatRate === false) {
        this.numValue = this.value;
      } else {
        this.inputFlag = true;
        this.numValue = this.setSplitSign(this.numValue);
      }
      this.$emit('focus', event);
    },
    setValueFormat: function setValueFormat(val) {
      var formatVal = '';
      if (val) {
        val = this.setSplitSign(val);
        if (this.isNumber(val)) {
          formatVal = this.formatPrecis(external_mathjs_["multiply"](val, this.multiple));
        } else {
          formatVal = val + '';
        }
      } else {
        formatVal = '';
      }
      return formatVal;
    },
    /**
    * 去掉数字中的分隔符和其他利率类符号
    */
    setSplitSign: function setSplitSign(val) {
      // 数据为字符串
      val = val + '';
      if (this.numberFormatter) {
        // 匹配出格式化中的,号或其他符号,并替换掉(有可能分隔符不是逗号)
        var reg = new RegExp([this.numberFormatter.replace(/[0-9.]/g, '')], 'g');
        val = val.replace(reg, '');
      }
      var idx = val.indexOf(this.sign);
      if (idx > -1) {
        return val.substr(0, idx);
      }
      return val;
    },

    /**
    * 判断是不是数字
    */
    isNumber: function isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/; // 非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    /**
    * 格式化数字并赋值给input框
    * @param val 待格式化的数据
    * @param sign 格式化后数据带符号（利率类符号）
    */
    format: function format(val, sign) {
      this.numValue = Object(util_["numberFormatter"])(Number(val), this.numberFormatter) + (sign ? sign : '');
    },
    formatPrecis: function formatPrecis(val) {
      return Number(external_mathjs_["format"](val, { precision: 14 }));
    },
    // 获取格式化时，小数点后的长度，（通过逗号判断）
    getDot: function getDot() {
      var dot = this.numberFormatter.split('.');
      if (dot[1]) {
        this.varPrecision = dot[1].length;
      } else {
        this.varPrecision = 0;
      }
    },
    /**
    * 精确小数位数据，根据isRounding 属性判断是否四舍五入
    */
    getFixedData: function getFixedData(val) {
      // 四舍五入
      if (this.isRounding === true) {
        return Number(val).toFixed(this.precision);
      } else {
        // 非四舍五入
        var tmp = (val + '').split('.');
        // 包含小数
        if (tmp[1]) {
          return Number(tmp[0] + '.' + tmp[1].substr(0, this.precision));
        } else {
          // 不包含小数
          return Number(val).toFixed(this.precision);
        }
      }
    }
  },
  created: function created() {
    if (!this.varlimitChar) {
      this.varlimitChar = /[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\u2030\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\、\——\；\，\。\·\“\”\<\>\！\？\：\【\】]{1,}/g;
    }
    // 没有配置格式化或者配置了格式化且formatRate 为true 才进入利率逻辑
    if (!this.numberFormatter || this.numberFormatter && this.formatRate === true) {
      if (this.multiple <= 0 || this.multiple % 10 !== 0) {
        throw new Error('请输入正确的倍数值!');
      }
      // 单独初始化数据的时候需要格式处理
      if (this.value) {
        var relNum = this.setValueFormat(this.value);
        // 有配置格式化就格式化数据
        this.numberFormatter ? this.format(relNum, this.sign) : this.numValue = relNum + this.sign;
      }
    } else {
      this.getDot();
      this.format(this.value);
    }
    if (this.precision < 0 || this.precision % 1 !== 0 || this.precision >= 8) {
      throw new Error('请输入正确的小数位数!');
    }
  }
});
// CONCATENATED MODULE: ./packages/num/src/num.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_numvue_type_script_lang_js_ = (numvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/num/src/num.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_numvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/num/src/num.vue"
/* harmony default export */ var src_num = (component.exports);
// CONCATENATED MODULE: ./packages/num/index.js


/* istanbul ignore next */
src_num.install = function (Vue) {
  Vue.component(src_num.name, src_num);
};

/* harmony default export */ var packages_num = __webpack_exports__["default"] = (src_num);

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/util");

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

module.exports = require("mathjs");

/***/ })

/******/ });