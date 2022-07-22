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
/******/ 	return __webpack_require__(__webpack_require__.s = 169);
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

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/city-select/src/city-select.vue?vue&type=template&id=253b8dee&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "yu-city-select" },
    [
      _c("div", { staticClass: "yu-city-dropdown" }, [
        _c(
          "span",
          { staticClass: "yu-city-name", on: { click: _vm.dropdownClick } },
          [_vm._v(_vm._s(_vm.currentCity))]
        ),
        _c("i", {
          class: [
            _vm.isDropdown
              ? "el-icon-arrow-down yu-down2up"
              : "el-icon-arrow-down yu-up2down"
          ],
          on: { click: _vm.dropdownClick }
        })
      ]),
      _c(
        "transition",
        {
          attrs: { name: "city" },
          on: { enter: _vm.enterFn, leave: _vm.leaveFn }
        },
        [
          _vm.isDropdown
            ? _c("div", { staticClass: "yu-city-container" }, [
                _vm.preCity.length > 0
                  ? _c(
                      "div",
                      { ref: "refPreCity", staticClass: "yu-pre-city" },
                      _vm._l(_vm.preCity, function(city, index) {
                        return _c(
                          "span",
                          {
                            key: "hotCity_" + index,
                            staticClass: "yu-list-content",
                            on: {
                              click: function($event) {
                                return _vm.citySelect(city)
                              }
                            }
                          },
                          [_vm._v(_vm._s(city.cityName))]
                        )
                      }),
                      0
                    )
                  : _vm._e(),
                _c(
                  "div",
                  { ref: "refCitySearch", staticClass: "yu-city-search" },
                  [
                    _c(
                      "yu-row",
                      { staticStyle: { margin: "0 10px" } },
                      [
                        _c(
                          "yu-col",
                          { attrs: { span: 10 } },
                          [
                            _c(
                              "yu-button-group",
                              [
                                _c(
                                  "yu-button",
                                  {
                                    class: {
                                      "yu-city-button": true,
                                      "yu-button-active": !_vm.isCity
                                    },
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        _vm.isCity = false
                                      }
                                    }
                                  },
                                  [_vm._v("按省份")]
                                ),
                                _c(
                                  "yu-button",
                                  {
                                    class: {
                                      "yu-city-button": true,
                                      "yu-button-active": _vm.isCity
                                    },
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        _vm.isCity = true
                                      }
                                    }
                                  },
                                  [_vm._v("按城市")]
                                )
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _c(
                          "yu-col",
                          { attrs: { span: 14 } },
                          [
                            _c("yu-xselect", {
                              ref: "citySelectRef",
                              staticClass: "yu-city-input",
                              attrs: {
                                size: "small",
                                filterable: "",
                                options: _vm.options,
                                placeholder: "输入城市名称搜索"
                              },
                              on: { change: _vm.selectFn },
                              model: {
                                value: _vm.citySearchValue,
                                callback: function($$v) {
                                  _vm.citySearchValue = $$v
                                },
                                expression: "citySearchValue"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _c(
                      "div",
                      { staticClass: "yu-city-tagContainer" },
                      _vm._l(
                        _vm.isCity
                          ? _vm.cityContainer.citytags
                          : _vm.provinceTags(_vm.cityContainer.provinces)
                              .topTags,
                        function(item, index) {
                          return _c(
                            "div",
                            {
                              key: "tag_" + index,
                              staticClass: "yu-city-tag",
                              on: {
                                click: function($event) {
                                  return _vm.cityTagClick(item)
                                }
                              }
                            },
                            [_vm._v(_vm._s(item))]
                          )
                        }
                      ),
                      0
                    ),
                    _c(
                      "div",
                      { ref: "refYuCityList", staticClass: "yu-city-list" },
                      _vm._l(
                        _vm.isCity
                          ? _vm.cityContainer.citytags
                          : _vm.cityContainer.provinces,
                        function(list, index) {
                          return _c(
                            "yu-row",
                            {
                              key: "typeTag_" + index,
                              ref: "refYucityItem",
                              refInFor: true
                            },
                            [
                              _c(
                                "p",
                                {
                                  staticClass: "yu-group-name",
                                  class: {
                                    "yu-city-list-row":
                                      _vm.provinceTags(
                                        _vm.cityContainer.provinces
                                      ).leftTags[index] === " " ||
                                      _vm.provinceTags(
                                        _vm.cityContainer.provinces
                                      ).leftTags[index] === undefined
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(
                                        _vm.isCity
                                          ? list
                                          : _vm.provinceTags(
                                              _vm.cityContainer.provinces
                                            ).leftTags[index]
                                      ) +
                                      "\n            "
                                  )
                                ]
                              ),
                              _c(
                                "div",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: !_vm.isCity,
                                      expression: "!isCity"
                                    }
                                  ],
                                  staticClass: "yu-province-tag"
                                },
                                [_vm._v(_vm._s(list.provinceName + ":"))]
                              ),
                              _c(
                                "div",
                                {
                                  class: {
                                    "yu-group-content": !_vm.isCity,
                                    "yu-group-content-city": _vm.isCity
                                  }
                                },
                                _vm._l(_vm.cityList(list), function(content) {
                                  return _c(
                                    "span",
                                    {
                                      key: content.cityCode,
                                      class: {
                                        "yu-list-content": true,
                                        "yu-list-content-multiple":
                                          _vm.multiple &&
                                          _vm.computeMultiple(content)
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.citySelect(content)
                                        }
                                      }
                                    },
                                    [_vm._v(_vm._s(content.cityName))]
                                  )
                                }),
                                0
                              )
                            ]
                          )
                        }
                      ),
                      1
                    ),
                    _vm.multiple
                      ? _c(
                          "div",
                          { staticClass: "yu_city_footer" },
                          [
                            _c(
                              "yu-button",
                              {
                                staticClass: "yu_footer_btn yu-city-button",
                                on: {
                                  click: function($event) {
                                    $event.stopPropagation()
                                    return _vm.confirmFn($event)
                                  }
                                }
                              },
                              [_vm._v("确定")]
                            ),
                            _c(
                              "yu-button",
                              {
                                staticClass: "yu_footer_btn yu-city-button",
                                on: {
                                  click: function($event) {
                                    $event.stopPropagation()
                                    return _vm.cancelFn($event)
                                  }
                                }
                              },
                              [_vm._v("取消")]
                            )
                          ],
                          1
                        )
                      : _vm._e()
                  ],
                  1
                )
              ])
            : _vm._e()
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/city-select/src/city-select.vue?vue&type=template&id=253b8dee&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/city-select/src/city-select.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var city_selectvue_type_script_lang_js_ = ({
  name: 'YuCitySelect',
  xtype: 'YuCitySelect',
  props: {
    current: {
      type: [String, Array],
      default: '1101'
    },
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    dataUrl: {
      type: String
    },
    requestType: {
      type: String,
      default: 'GET'
    },
    async: {
      type: Boolean,
      default: true
    },
    baseParams: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    hotCity: {
      type: [Array, String],
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  created: function created() {
    var _this = this;
    if (_this.dataUrl) {
      yufp.service.request({
        url: _this.dataUrl,
        method: _this.requestType,
        data: _this.baseParams,
        async: _this.async,
        callback: function callback(code, message, response) {
          if (response.data instanceof Array) {
            _this.citys = yufp.clone(response.data, []);
          }
        }
      });
    } else if (_this.$props.data instanceof Array && _this.$props.data.length > 0) {
      _this.citys = yufp.clone(_this.$props.data, []);
    }
  },
  data: function data() {
    return {
      citys: [],
      currentCity: '',
      isDropdown: false,
      cityArr: [],
      selectCityArr: [],
      spliceCityArr: [],
      isCity: false,
      citySearchValue: '',
      options: [],
      sortArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    };
  },
  beforeDestroy: function beforeDestroy() {
    document.body.removeEventListener('click', this.bodyClick);
  },

  mounted: function mounted() {
    var _this = this;
    for (var i = 0, len = _this.citys.length; i < len; i++) {
      _this.options.push({ key: _this.citys[i].cityCode, value: _this.citys[i].cityName });
    }
    _this.setCurrentFn(_this.current);
  },
  watch: {
    current: function current(val) {
      this.setCurrentFn(val);
    },
    isDropdown: function isDropdown(val) {
      var _this = this;
      if (val) {
        document.body.addEventListener('click', _this.bodyClick);
      } else {
        document.body.removeEventListener('click', _this.bodyClick);
      }
      _this.resetSelect();
      _this.isCity = false;
    },
    data: function data(val) {
      if (val instanceof Array && val.length > 0) {
        this.citys = yufp.clone(val, []);
        this.options = yufp.clone(val, []);
      }
    }
  },
  methods: {
    // 多选时对高亮城市的判断
    computeMultiple: function computeMultiple(content) {
      for (var i = 0; i < this.cityArr.length; i++) {
        if (content.cityCode === this.cityArr[i].cityCode) {
          return true;
        }
      }
      return false;
    },
    // 重置未保存的城市
    resetSelect: function resetSelect() {
      this.cityArr = this.cityArr.concat(this.spliceCityArr);
      this.spliceCityArr.splice(0);
      for (var i = 0, len = this.selectCityArr.length; i < len; i++) {
        this.cityArr.splice(this.cityArr.indexOf(this.selectCityArr[i]), 1);
      }
      this.selectCityArr.splice(0);
    },
    // 多选时取消保存
    cancelFn: function cancelFn() {
      this.resetSelect();
      this.isDropdown = false;
    },
    // 对多选城市的保存
    confirmFn: function confirmFn() {
      var oldValue = this.cityArr.concat(this.spliceCityArr);
      for (var j = 0; j < this.selectCityArr.length; j++) {
        oldValue.splice(oldValue.indexOf(this.selectCityArr[j]), 1);
      }
      this.currentCity = '';
      for (var i = 0, len = this.cityArr.length; i < len; i++) {
        this.currentCity = this.currentCity === '' ? this.cityArr[i].cityName : this.currentCity + ', ' + this.cityArr[i].cityName;
      }
      this.selectCityArr.splice(0);
      this.spliceCityArr.splice(0);
      this.$emit('city-select', this.cityArr, oldValue);
      this.isDropdown = false;
    },
    // 设置当前选中值
    setCurrentFn: function setCurrentFn(val) {
      var _this = this;
      var arr = typeof val === 'string' ? val.split(',') : val;
      _this.cityArr = [];
      _this.citys.forEach(function (city) {
        for (var i = 0, len = arr.length; i < len; i++) {
          if (city.cityCode === arr[i]) {
            _this.currentCity = _this.currentCity === '' ? city.cityName : _this.currentCity + ', ' + city.cityName;
            _this.cityArr.push(city);
          }
        }
      });
      // _this.$emit('city-select', _this.cityArr, _this.selectCityByName(_this.currentCity.split(',')));
    },
    // transition下拉关闭时事件
    leaveFn: function leaveFn(el) {
      el.style.height = '0px';
    },
    // transition下拉进入时事件
    enterFn: function enterFn(el) {
      var _this = this;
      var height = (_this.$refs.refPreCity ? _this.$refs.refPreCity.clientHeight : 0) + _this.$refs.refCitySearch.clientHeight + 5;
      el.style.height = height + 'px';
    },
    // 下拉框选中事件
    selectFn: function selectFn(val) {
      if (!val) return;
      var _this = this;
      var city = _this.selectCityByName([_this.$refs.citySelectRef.getSelectdText()])[0];
      if (_this.multiple) {
        _this.cityTagClick(_this.isCity ? city.cityKey : /^[a-zA-Z]+$/.test(city.provinceKey) ? city.provinceKey.slice(0, 1) : city.provinceKey);
        _this.citySearchValue = '';
        if (_this.cityArr.indexOf(city) > -1) {
          return;
        } else {
          _this.cityArr.push(city);
          _this.selectCityArr.push(city);
        }
      } else {
        _this.$emit('city-select', city, _this.selectCityByName(_this.currentCity.split(','))[0]);
        _this.currentCity = city.cityName;
        _this.citySearchValue = '';
        _this.cityArr = [city];
        _this.isDropdown = false;
      }
    },
    // 点击下拉框之外关闭下拉
    bodyClick: function bodyClick(evt) {
      var _this = this;
      if (!evt.target.closest('.yu-city-select')) {
        _this.isDropdown = false;
      }
    },
    // 点击分类标签进行分类
    cityTagClick: function cityTagClick(val) {
      if (this.isCity) {
        for (var j = 0; j < this.cityContainer.citytags.length; j++) {
          if (this.cityContainer.citytags[j] === val) {
            this.$refs.refYuCityList.scrollTop = this.$refs.refYucityItem[j].$el.offsetTop;
            break;
          }
        }
      } else {
        for (var i = 0; i < this.cityContainer.provinces.length; i++) {
          if (/^[a-zA-Z]+$/.test(this.cityContainer.provinces[i].provinceKey)) {
            if (this.cityContainer.provinces[i].provinceKey.slice(0, 1) === val) {
              this.$refs.refYuCityList.scrollTop = this.$refs.refYucityItem[i].$el.offsetTop;
              break;
            }
          } else {
            if (this.cityContainer.provinces[i].provinceKey === val) {
              this.$refs.refYuCityList.scrollTop = this.$refs.refYucityItem[i].$el.offsetTop;
              break;
            }
          }
        }
      }
    },
    // 选中城市列表
    citySelect: function citySelect(city) {
      var _this = this;
      if (_this.multiple) {
        if (_this.cityArr.indexOf(city) > -1) {
          _this.cityArr.splice(_this.cityArr.indexOf(city), 1);
          _this.spliceCityArr.push(city);
          return;
        }
        _this.cityArr.push(city);
        _this.selectCityArr.push(city);
      } else {
        _this.$emit('city-select', city, _this.selectCityByName(_this.currentCity.split(','))[0]);
        _this.currentCity = city.cityName;
        _this.isDropdown = false;
      }
    },
    // 切换下拉状态
    dropdownClick: function dropdownClick() {
      var _this = this;
      _this.isDropdown = !_this.isDropdown;
    },
    // 获取当前选择文本值
    getCurrent: function getCurrent() {
      var _this = this;
      return _this.currentCity;
    },
    // 获取城市信息
    selectCityByName: function selectCityByName(param) {
      var arr = param instanceof Array ? param : [];
      for (var i = 0; i < arr.length; i++) {
        return this.citys.filter(function (item) {
          return item.cityName === arr[i];
        });
      }
    }
  },
  computed: {
    // 每一行的城市列表，根据传入标签分类
    cityList: function cityList() {
      var _this = this;
      if (_this.isCity) {
        return function (city) {
          return _this.citys.filter(function (item) {
            if (city === item.cityKey) {
              return true;
            }
          });
        };
      } else {
        return function (province) {
          return _this.citys.filter(function (city) {
            if (province.provinceKey === city.provinceKey) {
              return true;
            }
          });
        };
      }
    },
    // 从数据中获取分类信息
    cityContainer: function cityContainer() {
      var _this = this;
      var provinces = [];
      var citytags = [];
      _this.citys.forEach(function (item) {
        var cityFlag = true;
        var provinceFlag = true;
        // 去除重复的分类标签
        for (var i = 0; i < provinces.length; i++) {
          if (provinces[i].provinceName === item.provinceName) {
            provinceFlag = false;
            break;
          }
        }
        for (var j = 0; j < citytags.length; j++) {
          if (citytags[j] === item.cityKey) {
            cityFlag = false;
            break;
          }
        }
        if (cityFlag) {
          citytags.push(item.cityKey);
        }
        if (provinceFlag) {
          provinces.push({ provinceName: item.provinceName, provinceKey: item.provinceKey });
        }
        // 标签排序
        citytags = _this.sortArr.filter(function (content) {
          return citytags.indexOf(content) > -1;
        });
      });
      return { provinces: provinces, citytags: citytags };
    },
    // 对分类标签进行处理
    provinceTags: function provinceTags() {
      var _this = this;
      return function (province) {
        var contents = [];
        var CN_content = [];
        if (province && province instanceof Array) {
          province.forEach(function (content) {
            /^[a-zA-Z]+$/.test(content.provinceKey) ? contents.push(content.provinceKey.slice(0, 1)) : CN_content.push(content.provinceKey);
          });
        }
        var topTags = _this.sortArr.filter(function (content) {
          return contents.filter(function (item, index, arr) {
            return arr.indexOf(item) === index;
          }).indexOf(content) > -1;
        }).concat(CN_content);
        var leftTags = [];
        _this.sortArr.forEach(function (item) {
          contents.forEach(function (content) {
            if (content === item) {
              if (leftTags.length && leftTags.indexOf(content) > -1) {
                leftTags.push(' ');
              } else {
                leftTags.push(content);
              }
            }
          });
        });
        return { topTags: topTags, leftTags: leftTags };
      };
    },
    // 热门城市
    preCity: function preCity() {
      var _this = this;
      var pre = [];
      // 优化代码 by luyq1 @2020-04-08
      var hotCity = this.hotCity instanceof Array ? this.hotCity : typeof this.hotCity === 'string' ? this.hotCity.split(',') : this.hotCity;
      // if (this.hotCity instanceof Array) {
      hotCity.forEach(function (city) {
        for (var i = 0, len = _this.citys.length; i < len; i++) {
          var curcity = _this.citys[i];
          if (+city === +curcity.cityCode) {
            pre.push(curcity);
          }
        }
      });
      // } else if (typeof this.hotCity === 'string') {
      // this.hotCity.split(',').forEach(city => {
      //   for (var i = 0, len = _this.citys.length; i < len; i++) {
      //     if (+city === +_this.citys[i].cityCode) {
      //       pre.push(_this.citys[i];);
      //     }
      //   }
      // });
      // }
      return pre;
    }
  }
});
// CONCATENATED MODULE: ./packages/city-select/src/city-select.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_city_selectvue_type_script_lang_js_ = (city_selectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/city-select/src/city-select.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_city_selectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/city-select/src/city-select.vue"
/* harmony default export */ var city_select = (component.exports);
// CONCATENATED MODULE: ./packages/city-select/index.js


/* istanbul ignore next */
city_select.install = function (Vue) {
  Vue.component(city_select.name, city_select);
};

/* harmony default export */ var packages_city_select = __webpack_exports__["default"] = (city_select);

/***/ })

/******/ });