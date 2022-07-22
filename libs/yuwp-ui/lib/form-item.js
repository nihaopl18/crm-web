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
/******/ 	return __webpack_require__(__webpack_require__.s = 213);
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

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/form/src/form-item.vue?vue&type=template&id=b6f3db6c&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "el-form-item",
      class: {
        "el-form-item--feedback": _vm.elForm && _vm.elForm.statusIcon,
        "is-error": _vm.validateState === "error",
        "is-validating": _vm.validateState === "validating",
        "is-required": _vm.isRequired || _vm.required,
        "is-no-asterisk": _vm.elForm && _vm.elForm.hideRequiredAsterisk,
        "is-autowrite": _vm.autoWrite
      }
    },
    [
      _vm.label || _vm.$slots.label
        ? _c(
            "label",
            {
              staticClass: "el-form-item__label",
              style: _vm.labelStyle,
              attrs: { for: _vm.prop }
            },
            [
              _vm._t("label", [
                _vm._v(_vm._s(_vm.label + _vm.form.labelSuffix))
              ])
            ],
            2
          )
        : _vm._e(),
      _c(
        "div",
        { staticClass: "el-form-item__content", style: _vm.contentStyle },
        [
          _vm._t("default"),
          _c(
            "transition",
            { attrs: { name: "el-zoom-in-top" } },
            [
              _vm.validateState === "error" &&
              _vm.showMessage &&
              _vm.form.showMessage
                ? _vm._t(
                    "error",
                    [
                      _c(
                        "div",
                        {
                          staticClass: "el-form-item__error",
                          class: {
                            "el-form-item__error--inline":
                              typeof _vm.inlineMessage === "boolean"
                                ? _vm.inlineMessage
                                : (_vm.elForm && _vm.elForm.inlineMessage) ||
                                  false
                          }
                        },
                        [
                          _vm._v(
                            "\n          " +
                              _vm._s(_vm.validateMessage) +
                              "\n        "
                          )
                        ]
                      )
                    ],
                    { error: _vm.validateMessage }
                  )
                : _vm._e()
            ],
            2
          )
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/form/src/form-item.vue?vue&type=template&id=b6f3db6c&

// EXTERNAL MODULE: external "async-validator"
var external_async_validator_ = __webpack_require__(55);
var external_async_validator_default = /*#__PURE__*/__webpack_require__.n(external_async_validator_);

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// EXTERNAL MODULE: ./src/utils/validator.js
var utils_validator = __webpack_require__(47);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/form/src/form-item.vue?vue&type=script&lang=js&
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





function noop() {}

function getPropByPath(obj, path) {
  var tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  var keyArr = path.split('.');
  var i = 0;

  for (var len = keyArr.length; i < len - 1; ++i) {
    var key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      throw new Error('please transfer a valid prop path to form item!');
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj[keyArr[i]]
  };
}

/* harmony default export */ var form_itemvue_type_script_lang_js_ = ({
  name: 'ElFormItem',
  xtype: 'YuFormItem',

  componentName: 'ElFormItem',

  mixins: [emitter_default.a],

  provide: function provide() {
    return {
      elFormItem: this
    };
  },


  inject: ['elForm'],

  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: Boolean,
    rules: [Object, Array, String],
    error: String,
    validateStatus: String,
    showMessage: {
      type: Boolean,
      default: true
    },
    inlineMessage: {
      type: [String, Boolean],
      default: ''
    },
    size: String,
    autoWrite: Boolean
  },
  watch: {
    error: function error(value) {
      this.validateMessage = value;
      this.validateState = value ? 'error' : '';
    },
    validateStatus: function validateStatus(value) {
      this.validateState = value;
    }
  },
  computed: {
    labelStyle: function labelStyle() {
      var ret = {};
      if (this.form.labelSuffix === '') {
        ret.padding = '11px 10px 11px 0';
      }
      if (this.form.labelPosition === 'top') {
        return ret;
      }
      var labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.width = labelWidth;
      }
      return ret;
    },
    contentStyle: function contentStyle() {
      var ret = {};
      var label = this.label;
      if (this.form.labelPosition === 'top' || this.form.inline) return ret;
      if (!label && !this.labelWidth && this.isNested) return ret;
      var labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.marginLeft = labelWidth;
      }
      return ret;
    },
    form: function form() {
      var parent = this.$parent;
      var parentName = parent.$options.componentName;
      while (parentName !== 'ElForm') {
        if (parentName === 'ElFormItem') {
          this.isNested = true;
        }
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },

    fieldValue: {
      cache: false,
      get: function get() {
        var model = this.form.model;
        if (!model || !this.prop) {
          return;
        }

        var path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }

        return getPropByPath(model, path).v;
      }
    },
    isRequired: function isRequired() {
      var rules = this.getRules();
      var isRequired = false;

      if (rules && rules.length) {
        rules.every(function (rule) {
          if (rule.required) {
            isRequired = true;
            return false;
          }
          return true;
        });
      }
      return isRequired;
    },
    _formSize: function _formSize() {
      return this.elForm.size;
    },
    elFormItemSize: function elFormItemSize() {
      return this.size || this._formSize;
    },
    sizeClass: function sizeClass() {
      return this.elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },
  data: function data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isNested: false
    };
  },

  methods: {
    validate: function validate(trigger) {
      var _this2 = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      this.validateDisabled = false;
      var rules = this.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && !this._props.hasOwnProperty('required')) {
        callback();
        return true;
      }

      this.validateState = 'validating';

      var descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(function (rule) {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;
      var validator = new external_async_validator_default.a(descriptor);
      var model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, function (errors, fields) {
        _this2.validateState = !errors ? 'success' : 'error';
        _this2.validateMessage = errors ? errors[0].message : '';

        callback(_this2.validateMessage);
        _this2.elForm && _this2.elForm.$emit('validate', _this2.prop, !errors, _this2.validateMessage || null);
      });
    },
    clearValidate: function clearValidate() {
      this.validateState = '';
      this.validateMessage = '';
      this.validateDisabled = false;
    },
    resetField: function resetField() {
      this.validateState = '';
      this.validateMessage = '';

      var model = this.form.model;
      var value = this.fieldValue;
      var path = this.prop;
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }

      var prop = getPropByPath(model, path);

      if (Array.isArray(value)) {
        this.validateDisabled = true;
        prop.o[prop.k] = [].concat(this.initialValue);
      } else {
        this.validateDisabled = true;
        prop.o[prop.k] = this.initialValue;
      }
    },

    getRule: function getRule() {
      var _this = this;
      for (var key in utils_validator["a" /* validators */]) {
        if (key === _this.rules) {
          return utils_validator["a" /* validators */][key];
        }
      }
    },
    getRules: function getRules() {
      var formRules = this.form.rules;
      var type = _typeof(this.rules);
      var selfRules = type !== 'string' ? this.rules : this.getRule();
      var requiredRule = this.required !== undefined ? { required: !!this.required } : [];

      formRules = formRules ? formRules[this.prop] : [];

      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },
    getFilteredRule: function getFilteredRule(trigger) {
      var rules = this.getRules();

      return rules.filter(function (rule) {
        return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
      });
    },
    onFieldBlur: function onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange: function onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }

      this.validate('change');
    },
    addValidateEvents: function addValidateEvents() {
      var rules = this.getRules();

      if (rules.length || this.required !== undefined) {
        this.$on('el.form.blur', this.onFieldBlur);
        this.$on('el.form.change', this.onFieldChange);
      }
    },
    removeValidateEvents: function removeValidateEvents() {
      this.$off();
    }
  },
  mounted: function mounted() {
    if (this.prop) {
      this.dispatch('ElForm', 'el.form.addField', [this]);

      var initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      });

      var rules = this.getRules();

      if (rules.length || this._props.hasOwnProperty('required')) {
        this.$on('el.form.blur', this.onFieldBlur);
        this.$on('el.form.change', this.onFieldChange);
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.dispatch('ElForm', 'el.form.removeField', [this]);
  },
  destroyed: function destroyed() {
    this.$off();
  }
});
// CONCATENATED MODULE: ./packages/form/src/form-item.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_form_itemvue_type_script_lang_js_ = (form_itemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/form/src/form-item.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_form_itemvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/form/src/form-item.vue"
/* harmony default export */ var form_item = (component.exports);
// CONCATENATED MODULE: ./packages/form-item/index.js


/* istanbul ignore next */
form_item.install = function (Vue) {
  Vue.component(form_item.name, form_item);
};

/* harmony default export */ var packages_form_item = __webpack_exports__["default"] = (form_item);

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return validators; });
/**
 * Created by jiangcheng on 2016/11/25.
 */
var validators = {

  /**
   * 必输验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'required': function required(rule, value, callback) {
    if (value === null || value === undefined || value === '' || value.length < 1) {
      callback(new Error('字段不能为空'));
    } else {
      callback();
    }
  },

  /**
   * 数字验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'number': function number(rule, value, callback) {
    var reg = /^[\d\.\,-]*$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('请输入数字'));
    } else {
      callback();
    }
  },
  /**
   * 年龄验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'age': function age(rule, value, callback) {
    var reg = /^\d+$/;
    if (value && reg.test(value)) {
      var _age = parseInt(value, 10);
      if (_age < 200) {
        callback();
      } else {
        callback(new Error('年龄不合法'));
      }
    } else if (value && !reg.test(value)) {
      callback(new Error('数字类型错误'));
    } else {
      callback();
    }
  },
  /**
   * 邮编验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'postcode': function postcode(rule, value, callback) {
    // var reg = /^[1-9]\d{5}$/;
    var reg = /^[0-9]{6}$/; // 邮编可以以0开头
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('邮编格式不正确'));
    } else {
      callback();
    }
  },
  /**
   * ip验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'ip': function ip(rule, value, callback) {
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('ip地址格式不正确'));
    } else {
      callback();
    }
  },
  /**
   * 固定电话和小灵通验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'telephone': function telephone(rule, value, callback) {
    var reg = /(^\d{3}\-\d{7,8}$)|(^\d{4}\-\d{7,8}$)|(^\d{3}\d{7,8}$)|(^\d{4}\d{7,8}$)|(^\d{7,8}$)/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('固定电话或小灵通电话格式不正确'));
    } else {
      callback();
    }
  },
  /**
   * 手机号码验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'phone': function phone(rule, value, callback) {
    var reg = /(^\d{3}\-1[3458][0-9]\d{8}$)|(^\d{2}\-1[3458][0-9]\d{8}$)/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('固定电话格式不正确'));
    } else {
      callback();
    }
  },
  /**
   * 数字和字母验证，只能接受输入项为数字和字母
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'numberAndLetter': function numberAndLetter(rule, value, callback) {
    var reg = /(^[A-Za-z0-9]+$)|([A-Za-z]+$)|([0-9]+$)/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('请输入数字和字母'));
    } else {
      callback();
    }
  },
  /**
   * 手机号码验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'mobile': function mobile(rule, value, callback) {
    var reg = /^1[3-9][0-9]\d{8}$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('手机号码不正确'));
    } else {
      callback();
    }
  },
  /**
   * 身份证号码验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'IDCard': function IDCard(rule, value, callback) {
    var ereg = new RegExp();
    if (!value) {
      callback();
    } else {
      var area = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      };
      var Y, JYM;
      var S, M;
      var idcard_array = [];
      idcard_array = value.split('');
      if (area[parseInt(value.substr(0, 2), 10)] == null) {
        callback(new Error('身份证号码地区非法'));
      }
      // 身份号码位数及格式检验
      switch (value.length) {
        case 15:
          if ((parseInt(value.substr(6, 2), 10) + 1900) % 4 === 0 || (parseInt(value.substr(6, 2), 10) + 1900) % 100 === 0 && (parseInt(value.substr(6, 2), 10) + 1900) % 4 === 0) {
            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; // 测试出生日期的合法性
          } else {
            ereg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
          }
          if (ereg.test(value)) {
            callback();
          } else {
            callback(new Error('身份证号码出生日日期有误'));
          }
          break;
        case 18:
          // 18位身份号码检测
          // 出生日期的合法性检查
          // 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
          // 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
          if (parseInt(value.substr(6, 4), 10) % 4 === 0 || parseInt(value.substr(6, 4), 10) % 100 === 0 && parseInt(value.substr(6, 4), 10) % 4 === 0) {
            ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
          } else {
            ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日期的合法性正则表达式
          }
          if (ereg.test(value)) {
            // 测试出生日期的合法性
            // 计算校验位
            S = (parseInt(idcard_array[0], 10) + parseInt(idcard_array[10], 10)) * 7 + (parseInt(idcard_array[1], 10) + parseInt(idcard_array[11], 10)) * 9 + (parseInt(idcard_array[2], 10) + parseInt(idcard_array[12], 10)) * 10 + (parseInt(idcard_array[3], 10) + parseInt(idcard_array[13], 10)) * 5 + (parseInt(idcard_array[4], 10) + parseInt(idcard_array[14], 10)) * 8 + (parseInt(idcard_array[5], 10) + parseInt(idcard_array[15], 10)) * 4 + (parseInt(idcard_array[6], 10) + parseInt(idcard_array[16], 10)) * 2 + parseInt(idcard_array[7], 10) * 1 + parseInt(idcard_array[8], 10) * 6 + parseInt(idcard_array[9], 10) * 3;
            Y = S % 11;
            M = 'F';
            JYM = '10X98765432';
            M = JYM.substr(Y, 1); // 判断校验位
            if (M === idcard_array[17]) {
              callback();
            } else {
              callback(new Error('身份证号码末位校验位校验出错,请注意x的大小写'));
            }
          } else {
            callback(new Error('身份证号码出生日期有误'));
          }
          break;
        default:
          callback(new Error('身份证号码位数不对,应该为15位或是18位'));
          break;
      }
    }
  },
  /**
   * 是否为中文验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'isChnChar': function isChnChar(rule, value, callback) {
    var reg = /[\u4E00-\u9FA5]/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('只能输入中文'));
    } else {
      callback();
    }
  },
  /**
   * 输入项收尾空格验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'trim': function trim(rule, value, callback) {
    if (value !== value.trim()) {
      callback(new Error('输入项首尾有空格'));
    } else {
      callback();
    }
  },
  /**
   * 邮箱验证
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'email': function email(rule, value, callback) {
    var reg = /[A-Za-z0-9_-]+[@](\S*)(net|com|cn|org|cc|tv|[0-9]{1,3})(\S*)/g;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('电子邮箱格式不正确'));
    } else {
      callback();
    }
  },
  /**
   * 小数验证，输入结果必须为小数
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'digit': function digit(rule, value, callback) {
    var reg = /^-?\d+(\.\d+)?$/g;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('请输入小数'));
    } else {
      callback();
    }
  },
  /**
   * 非零正整数
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'pInt': function pInt(rule, value, callback) {
    var reg = /^\+?[1-9][0-9]*$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('请输入非零正整数'));
    } else {
      callback();
    }
  },
  /**
   * 0 整数和浮点数
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'gZero': function gZero(rule, value, callback) {
    var reg = /^[\+]?[0-9]*\d(\.\d+)?$/;
    if (value && reg.test(value)) {
      callback();
    } else if (value && !reg.test(value)) {
      callback(new Error('请输入非零正整数'));
    } else {
      callback();
    }
  },
  /**
   * 特殊字符
   * rule为form表单当前验证的filed对应的验证rule规则
   * value为当前输入框返回值
   * callback为回调函数,验证成功直接回调，验证失败回调函数返回一个带错误信息的Error实例
   * */
  'speChar': function speChar(rule, value, callback) {
    var reg = new RegExp("[`~!@#$^&*()=|{}':; ',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    if (value && reg.test(value)) {
      callback(new Error('输入信息包含特殊字符'));
    } else {
      callback();
    }
  }
};

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ }),

/***/ 55:
/***/ (function(module, exports) {

module.exports = require("async-validator");

/***/ })

/******/ });