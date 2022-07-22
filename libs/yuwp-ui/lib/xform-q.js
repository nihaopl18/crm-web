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
/******/ 	return __webpack_require__(__webpack_require__.s = 231);
/******/ })
/************************************************************************/
/******/ ({

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@/lib/locale"
var locale_ = __webpack_require__(6);

// CONCATENATED MODULE: ./packages/xform-q/src/xform-q.js

/* harmony default export */ var xform_q = ({
  name: 'ElFormQ',
  xtype: 'YuXformQ',

  template: '<div></div>',
  props: {
    fieldData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    buttons: Array,
    columns: {
      type: Number,
      default: 4
    },
    forceColumn: {
      type: Boolean,
      default: true
    },
    moreData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    searchTable: String,
    buttonAdhere: Boolean,
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: String,
    labelSuffix: {
      type: String,
      default: ''
    },
    inline: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    thrift: Boolean,
    floatSearch: Boolean,
    resetButton: {
      type: Boolean,
      default: true
    },
    size: String,
    title: String,
    removeEmpty: Boolean

  },

  data: function data() {
    var _this = this;
    return {
      fm: {},
      layoutColumns: this.columns,
      rules: {},
      _fd: [],
      fieldDatas: this.fieldData,
      showSearch: false,
      consButtons: [{
        label: this.thrift ? '' : Object(locale_["t"])('el.xformq.btnSearchText'), op: 'submit', type: 'primary', icon: 'search', show: true, click: function click(model, valid, me) {
          var mod = yufp.clone(model, mod);
          var allDt = [];
          allDt = yufp.clone(_this.fieldDatas, []);
          allDt = allDt.concat(yufp.clone(_this.moreData, []));
          for (var i = 0; i < allDt.length; i++) {
            var el = allDt[i];
            if (el.fuzzyQuery && mod[el.field]) {
              if (el.fuzzyQuery === 'left') {
                mod[el.field] = '%' + mod[el.field];
              } else if (el.fuzzyQuery === 'right') {
                mod[el.field] = mod[el.field] + '%';
              } else if (el.fuzzyQuery === 'both') {
                mod[el.field] = '%' + mod[el.field] + '%';
              }
            }
          }
          if (_this.removeEmpty === true) {
            for (var item in mod) {
              if (mod[item] === '' || mod[item] === null || mod[item] === undefined || mod[item] instanceof Array && mod[item].length === 0) {
                delete mod[item];
              }
            }
          }
          if (valid) {
            var param = { condition: JSON.stringify(mod) };
            if (me.searchTable) {
              me.$root.$refs[me.searchTable].remoteData(param);
            } else {
              me.$emit('search-click', mod, valid, me);
            }
          }
        }
      }, { label: Object(locale_["t"])('el.xformq.btnResetText'), op: 'reset', type: 'primary', icon: 'yx-loop2', show: this.resetButton }, { label: Object(locale_["t"])('el.xformq.btnMoreText'), op: 'switch', type: 'text', icon: 'caret-bottom', show: this.moreData && this.moreData.length > 0 }],
      moreSearchClass: this.floatSearch ? 'yu-formQFloat' : '',
      fitButton: this.forceColumn ? 'yu-formQButton' : 'yu-formQButton yu-right',
      span: parseInt(24 / this.columns, 0)
    };
  },

  methods: {
    click: function click(fn, op) {
      var me = this;
      if (me.buttons) {
        // 配置了默认的按钮，兼容之前的代码
        if (op === 'reset') {
          this.$children[0].resetFields();
          fn && fn(me.fm);
        } else if (op === 'submit') {
          this.$children[0].validate(function (valid) {
            fn(me.fm, valid);
          });
        } else {
          fn(me.fm);
        }
      } else {
        if (op === 'reset') {
          this.$children[0].resetFields();
          fn && fn(me.fm);
        } else if (op === 'submit') {
          this.$children[0].validate(function (valid) {
            fn(me.fm, valid, me);
          });
        } else if (op === 'switch') {
          this.showSearch = !this.showSearch;
          if (this.consButtons[2].icon === 'caret-bottom') {
            this.consButtons[2].icon = 'caret-top';
          } else {
            this.consButtons[2].icon = 'caret-bottom';
          }
        }
      }
    },
    subRefs: function subRefs(field) {
      var ref = this.$refs[field];
      if (ref && ref.length > 0) {
        ref = ref[0];
      }
      return ref;
    },
    rebuildFn: function rebuildFn() {
      var model = {};
      var rules = {};
      // var t = {};
      for (var i = 0, len = this.fieldDatas.length; i < len; i++) {
        var tmp = this.fieldDatas[i];
        model[tmp.field] = tmp.value || '';
        if (tmp.rules) {
          rules[tmp.field] = tmp.rules;
        }
      }
      this._fd = this.fieldDatas;
      this.rules = rules;
      this._thrift = this.thrift;
    },
    preTreat: function preTreat() {
      var model = {};
      var rules = {};
      // var t = {};
      for (var i = 0, len = this.fieldDatas.length; i < len; i++) {
        var tmp = this.fieldDatas[i];
        model[tmp.field] = tmp.value || '';
        if (tmp.rules) {
          rules[tmp.field] = tmp.rules;
        }
      }
      this.fm = model;
      this._fd = this.fieldDatas;
      this.rules = rules;
      this._thrift = this.thrift;
    },
    switch: function _switch(field, params, value) {
      var dataArr = this.fieldDatas;
      this.fieldDatas = [];
      dataArr.filter(function (cur, index, arr) {
        if (cur.field === field) {
          cur[params] = value;
        }
      });
      this.fieldDatas = dataArr;
    }
  },
  mounted: function mounted() {
    // if (this.buttons) {
    //   return; // 兼容之前的代码
    // }
    // var bthItem = this.$refs.btnCol;
    // var bthItemWidth = bthItem.$el.offsetWidth;
    // if (bthItemWidth < 170) {
    //   this.layoutColumns = this.layoutColumns - 1;
    //   this.span = parseInt(24 / this.layoutColumns, 0);
    // }
    if (this.fieldData.length > 0) {
      // 针对小屏幕，布局做降级处理。
      var conTainer = this;
      var conTainerWidth = parseFloat(this.$el.offsetWidth);
      while (!conTainerWidth && conTainer.$parent) {
        conTainer = conTainer.$parent;
        conTainerWidth = conTainer.$el.offsetWidth;
      }
      var width = conTainerWidth / this.layoutColumns;
      var basicWidth = 150 + parseFloat(this.labelWidth);
      if (width < basicWidth) {
        this.layoutColumns = Math.floor(conTainerWidth / basicWidth);
        if (24 % this.layoutColumns !== 0) {
          this.layoutColumns--;
        }
      }
      this.span = parseInt(24 / this.layoutColumns, 0);
    }
  },
  created: function created() {
    var renderXtemplate = function renderXtemplate() {
      if (this.buttons) {
        // 如果配置了按钮，兼容之前的配置
        var tmplate = '<div class="yu-search">\
            <h2 v-if="title">{{title}}</h2>\
              <el-form :model="fm" :validate-on-rule-change="false" :label-width="labelWidth" :rules="rules" :inline="inline" :showMessage="showMessage" :size="size" :columns="layoutColumns" defaultQueryField>\
              <el-row :gutter="10">\
              <el-col :span="span" v-for="(i,idx) in _fd" v-show="i.hidden!== true" :key="\'span_\' + idx">\
              <el-form-item :prop="i.field" :label="i.label">\
              <el-input :ref="i.field" v-if="i.type==\'input\'||i.type==\'password\'||i.type==\'textarea\'" \
              v-model="fm[i.field]" :placeholder="i.placeholder" :icon="i.icon" :type="i.type" :limit-char="i.limitChar"\
              :maxlength="i.maxlength" :minlength="i.minlength" :disabled="i.disabled" :max="i.max" :min="i.min"\
              @focus="i.focus&&i.focus(fm[i.field],fm,arguments)"\
              @click="i.click&&i.click(fm[i.field],fm,arguments)" \
              @blur="i.blur&&i.blur(fm[i.field],fm,arguments)"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)">\
              </el-input>\
              <el-input v-else-if="i.type==\'num\'" :type="i.type" :disabled="i.disabled" :formatter="i.formatter" :digit="i.digit"\
              v-model.number="fm[i.field]" :placeholder="i.placeholder" :icon="i.icon"\
              :maxlength="i.maxlength" :minlength="i.minlength" :max="i.max" :min="i.min"\
              @focus="i.focus&&i.focus(fm[i.field],fm,arguments)"\
              @click="i.click&&i.click(fm[i.field],fm,arguments)" \
              @blur="i.blur&&i.blur(fm[i.field],fm,arguments)"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)">\
              </el-input>\
              <el-select-x :ref="i.field" v-else-if="i.type==\'select\'" :disabled="i.disabled" :multiple="i.multiple" :placeholder="i.placeholder" v-model="fm[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl" :clearable="i.clearable" :request-type="i.requestType" :data-params="i.dataParams" \
              :data-code="i.dataCode" :filterable="i.filterable" :filter-method="i.filterMethod" :allow-create="i.allowCreate" :datacode-filter="i.datacodeFilter"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)">\
              </el-select-x>\
              <el-radio-x :ref="i.field" v-else-if="i.type==\'radio\'" v-model="fm[i.field]" :data-url="i.dataUrl" :disabled="i.disabled" :props="i.props" :options="i.options" :data-code="i.dataCode"\
              :option-button="i.optionButton" @change="i.change&&i.change(fm[i.field],fm,arguments)"></el-radio-x>\
              <el-checkbox-x :ref="i.field" v-else-if="i.type==\'checkbox\'" v-model="fm[i.field]" :data-url="i.dataUrl" :props="i.props" :min=i.min :max=i.max :options="i.options" :data-code="i.dataCode"\
              :option-button="i.optionButton" :disabled="i.disabled"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)">\
              </el-checkbox-x>\
              <el-date-picker :ref="i.field" v-else-if="i.type==\'date\'||i.type==\'week\'||i.type==\'year\'||i.type==\'month\'||i.type==\'datetime\'||i.type==\'datetimerange\'||i.type==\'daterange\'" \
              v-model="fm[i.field]" :type="i.type" :disabled="i.disabled" :editable="i.editable" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
              :clearable="i.clearable" :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)"></el-date-picker>\
              <el-time-select :ref="i.field" v-else-if="i.type==\'time\'" :disabled="i.disabled" v-model="fm[i.field]" :isRange="i.isRange" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
              ::clearable="i.clearable"  :range-separator="i.rangeSeparator" :editable="i.editable" :picker-options="i.pickerOptions"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)"></el-time-select>\
              <el-time-picker :ref="i.field" v-else-if="i.type==\'timePicker\'" :editable="i.editable" :disabled="i.disabled" v-model="fm[i.field]" :isRange="i.isRange" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
              :clearable="i.clearable" :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)"></el-time-picker>\
              <component :ref="i.ref||i.field" v-else-if="i.type==\'custom\'"\
              v-model="fm[i.field]" :params="i.params" :placeholder="i.placeholder"\
              @click-fn="i.clickFn && i.clickFn(fm[i.field],fm,arguments)"\
              @change="i.change && i.change(fm[i.field],fm,arguments)"\
              :disabled="i.disabled" :readonly="i.readonly" :size="i.size" :raw-value="i.rawValue"\
              :is="i.is" @select-fn="i.selectFn&&i.selectFn(fm[i.field],fm,arguments)">\
              </component>\
              </el-form-item>\
              </el-col>\
              <el-col ref="btnCol" :span="span">\
              <div class="bth-group" ref="btnGroup">\
              <el-button v-for="(i,idx)  in buttons" :key="\'btn_\' + idx" :type="i.type"  :plain="i.plain" :round="i.round" :icon="i.icon" \
              @click="(i.click||i.op==\'reset\')&&click(i.click,i.op)" >{{i.label}}</el-button>\
              </div>\
              </el-col>\
              </el-row>\
              </el-form>\
              </div>';
        return tmplate;
      } else {
        // var queryButtons = this.consButtons;
        var forceColumn = this.forceColumn;
        var fieldData = this.fieldData;
        var moreData = this.moreData;
        var columns = this.layoutColumns; // 控制列排版
        // var thrift = this.thrift;// 节俭显示，不显示中文只显示图标
        var count = (fieldData.length + 1) % columns;
        count = count === 0 ? 0 : columns - count;
        tmplate = '<div class="yu-search">\
              <h2 v-if="title">{{title}}</h2>\
              <el-form :model="fm" :validate-on-rule-change="false" :label-width="labelWidth" :rules="rules" :inline="inline" :showMessage="showMessage" :size="size" :columns="columns" defaultQueryField>\
              <el-row :gutter="10">\
              <el-col :span="span" v-for="(i,idx) in _fd" :key="\'span_\' + idx" v-show="i.hidden!== true">\
              <el-form-item :prop="i.field" :label="i.label">\
              <el-input :ref="i.field" v-if="i.type==\'input\'||i.type==\'password\'||i.type==\'textarea\'" :disabled="i.disabled"\
              v-model="fm[i.field]" :placeholder="i.placeholder" :icon="i.icon" :type="i.type" :limit-char="i.limitChar"\
              :maxlength="i.maxlength" :minlength="i.minlength" :max="i.max" :min="i.min"\
              @focus="i.focus&&i.focus(fm[i.field],fm,arguments)"\
              @click="i.click&&i.click(fm[i.field],fm,arguments)" \
              @blur="i.blur&&i.blur(fm[i.field],fm,arguments)"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)">\
              </el-input>\
              <el-input v-else-if="i.type==\'num\'" :type="i.type" :formatter="i.formatter" :digit="i.digit" :disabled="i.disabled"\
              v-model.number="fm[i.field]" :placeholder="i.placeholder" :icon="i.icon"\
              :maxlength="i.maxlength" :minlength="i.minlength" :max="i.max" :min="i.min"\
              @focus="i.focus&&i.focus(fm[i.field],fm,arguments)"\
              @click="i.click&&i.click(fm[i.field],fm,arguments)" \
              @blur="i.blur&&i.blur(fm[i.field],fm,arguments)"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)">\
              </el-input>\
              <el-select-x :ref="i.field" v-else-if="i.type==\'select\'" :disabled="i.disabled" :multiple="i.multiple" :placeholder="i.placeholder" v-model="fm[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl"\
              :data-code="i.dataCode" :request-type="i.requestType" :data-params="i.dataParams" :clearable="i.clearable" :allow-create="i.allowCreate"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)" :filterable="i.filterable" :filter-method="i.filterMethod" :datacode-filter="i.datacodeFilter">\
              </el-select-x>\
              <el-radio-x :ref="i.field" v-else-if="i.type==\'radio\'" v-model="fm[i.field]" :data-url="i.dataUrl" :disabled="i.disabled" :props="i.props" :options="i.options" :data-code="i.dataCode"\
              :option-button="i.optionButton" @change="i.change&&i.change(fm[i.field],fm,arguments)"></el-radio-x>\
              <el-checkbox-x :ref="i.field" v-else-if="i.type==\'checkbox\'" v-model="fm[i.field]" :data-url="i.dataUrl" :props="i.props" :min=i.min :max=i.max :options="i.options" :data-code="i.dataCode"\
              :option-button="i.optionButton" :disabled="i.disabled"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)">\
              </el-checkbox-x>\
              <el-date-picker :ref="i.field" v-else-if="i.type==\'date\'||i.type==\'week\'||i.type==\'year\'||i.type==\'month\'||i.type==\'datetime\'||i.type==\'datetimerange\'||i.type==\'daterange\'" \
              v-model="fm[i.field]" :type="i.type" :disabled="i.disabled" :editable="i.editable" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
              :clearable="i.clearable" :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)"></el-date-picker>\
              <el-time-select :ref="i.field" v-else-if="i.type==\'time\'" v-model="fm[i.field]" :editable="i.editable" :isRange="i.isRange" :disabled="i.disabled" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
              ::clearable="i.clearable"  :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)"></el-time-select>\
              <el-time-picker :ref="i.field" v-else-if="i.type==\'timePicker\'" v-model="fm[i.field]" :editable="i.editable" :isRange="i.isRange" :disabled="i.disabled" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
              :clearable="i.clearable" :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
              @change="i.change&&i.change(fm[i.field],fm,arguments)"></el-time-picker>\
              <component :ref="i.ref||i.field" v-else-if="i.type==\'custom\'"\
              v-model="fm[i.field]" :params="i.params"\
              @click-fn="i.clickFn && i.clickFn(fm[i.field],fm,arguments)"\
              @change="i.change && i.change(fm[i.field],fm,arguments)"\
              :disabled="i.disabled" :readonly="i.readonly" :size="i.size" :raw-value="i.rawValue"\
              :is="i.is" @select-fn="i.selectFn&&i.selectFn(fm[i.field],fm,arguments)">\
              </component>\
              </el-form-item>\
              </el-col>';
        var fillHtml = '';
        if (!forceColumn) {
          // 不强制紧随其后
          for (var i = 0; i < count; i++) {
            fillHtml += '<el-col :span="span" >\
                            <el-form-item>\
                            </el-form-item>\
                          </el-col>';
          }
        }
        tmplate += fillHtml;
        tmplate += '<el-col ref="btnCol" :span="span" :class="fitButton" v-if="!(showSearch)" >\
                    <div ref="btnGroup" class="bth-group">\
                    <el-button v-for="(i,idx)  in consButtons" v-if="i.show" :key="\'btn_\' + idx" :type="i.type"  :plain="i.plain" :round="i.round" :icon="i.icon" \
                    @click="(i.click||i.op==\'reset\'||i.op==\'switch\')&&click(i.click,i.op)" ><b v-show="!_thrift">{{i.label}}</b><b v-show="_thrift"></b></el-button>\
                    </div>\
                    </el-col>\
                    </el-row>';
        if (moreData) {
          var sCount = (moreData.length + 1) % columns;
          sCount = sCount === 0 ? 0 : columns - sCount;
          var moreSearch = '<transition name="el-zoom-in-top"><el-row :gutter="10" v-if="showSearch" :class="moreSearchClass">\
                          <el-col :span="span" v-for="(j,idx) in moreData" :key="\'moreData_\' + idx" v-show="j.hidden!== true">\
                          <el-form-item :prop="j.field" :label="j.label">\
                            <el-input :ref="j.field" v-if="j.type==\'input\'||j.type==\'password\'||j.type==\'textarea\'" :disabled="j.disabled" \
                            v-model="fm[j.field]" :placeholder="j.placeholder" :icon="j.icon" :type="j.type" :limit-char="j.limitChar"\
                            :maxlength="j.maxlength" :minlength="j.minlength" :max="j.max" :min="j.min"\
                            @focus="j.focus&&j.focus(fm[j.field],fm,arguments)"\
                            @click="j.click&&j.click(fm[j.field],fm,arguments)" \
                            @blur="j.blur&&j.blur(fm[j.field],fm,arguments)"\
                            @change="j.change&&j.change(fm[j.field],fm,arguments)">\
                            </el-input>\
                            <el-input v-else-if="j.type==\'num\'" :type="j.type" :formatter="j.formatter" :digit="j.digit" :disabled="j.disabled"\
                            v-model.number="fm[j.field]" :placeholder="j.placeholder" :icon="j.icon"\
                            :maxlength="j.maxlength" :minlength="j.minlength" :max="j.max" :min="j.min"\
                            @focus="j.focus&&j.focus(fm[j.field],fm,arguments)"\
                            @click="j.click&&j.click(fm[j.field],fm,arguments)" \
                            @blur="j.blur&&j.blur(fm[j.field],fm,arguments)"\
                            @change="j.change&&j.change(fm[j.field],fm,arguments)">\
                            </el-input>\
                            <el-select-x :ref="j.field" v-else-if="j.type==\'select\'" :disabled="j.disabled" :multiple="j.multiple" :placeholder="j.placeholder" v-model="fm[j.field]" :options="j.options" :props="j.props" :data-url="j.dataUrl"\
                            :data-code="j.dataCode" :filterable="j.filterable" :filter-method="j.filterMethod" :allow-create="j.allowCreate" :datacode-filter="j.datacodeFilter"\
                            @change="j.change&&j.change(fm[j.field],fm,arguments)">\
                            </el-select-x>\
                            <el-radio-x :ref="j.field" v-else-if="j.type==\'radio\'" v-model="fm[j.field]" :data-url="j.dataUrl" :disabled="j.disabled" :props="j.props" :options="i.options" :data-code="i.dataCode"\
                            :option-button="j.optionButton" @change="j.change&&j.change(fm[j.field],fm,arguments)"></el-radio-x>\
                            <el-checkbox-x :ref="j.field" v-else-if="j.type==\'checkbox\'" v-model="fm[j.field]" :data-url="j.dataUrl" :props="j.props" :min=j.min :max=j.max :options="i.options" :data-code="i.dataCode"\
                            :option-button="j.optionButton" :disabled="j.disabled"\
                            @change="j.change&&j.change(fm[j.field],fm,arguments)">\
                            </el-checkbox-x>\
                            <el-date-picker :ref="j.field" v-else-if="j.type==\'date\'||j.type==\'week\'||j.type==\'year\'||j.type==\'month\'||j.type==\'datetime\'||j.type==\'datetimerange\'||j.type==\'daterange\'" \
                            v-model="fm[j.field]" :type="j.type" :disabled="j.disabled" :editable="j.editable" :placeholder="j.placeholder" :size="j.size" :format="j.format"\
                            :clearable="j.clearable" :range-separator="j.rangeSeparator" :picker-options="j.pickerOptions"\
                            @change="j.change&&j.change(fm[j.field],fm,arguments)"></el-date-picker>\
                            <el-time-select :ref="j.field" v-else-if="j.type==\'time\'" :disabled="j.disabled" :editable="j.editable" v-model="fm[j.field]" :isRange="j.isRange" :placeholder="j.placeholder" :size="j.size" :format="j.format"\
                            ::clearable="j.clearable"  :range-separator="j.rangeSeparator" :picker-options="j.pickerOptions"\
                            @change="j.change&&j.change(fm[j.field],fm,arguments)"></el-time-select>\
                            <el-time-picker :ref="j.field" v-else-if="j.type==\'timePicker\'" v-model="fm[j.field]" :editable="j.editable" :disabled="j.disabled" :isRange="j.isRange" :placeholder="j.placeholder" :size="j.size" :format="j.format"\
                            :clearable="j.clearable" :range-separator="j.rangeSeparator" :picker-options="j.pickerOptions"\
                            @change="j.change&&j.change(fm[j.field],fm,arguments)"></el-time-picker>\
                            <component :ref="j.ref||j.field" v-else-if="j.type==\'custom\'"\
                            v-model="fm[j.field]" :params="j.params"\
                            @click-fn="j.clickFn && j.clickFn(fm[j.field],fm,arguments)"\
                            @change="j.change && j.change(fm[j.field],fm,arguments)"\
                            :disabled="j.disabled" :readonly="j.readonly" :size="j.size" :raw-value="j.rawValue"\
                            :is="j.is" @select-fn="j.selectFn&&j.selectFn(fm[j.field],fm,arguments)">\
                            </component>\
                          </el-form-item>\
                        </el-col>';
          var searchFill = '';
          if (!forceColumn) {
            // 不强制紧随其后
            for (var ii = 0; ii < sCount; ii++) {
              searchFill += '<el-col :span="span" >\
                              <el-form-item>\
                              </el-form-item>\
                              </el-col>';
            }
          }
          moreSearch += searchFill;
          moreSearch += '<el-col ref="btnCol" :span="span" :class="fitButton" >' + '<div ref="btnGroup" class="bth-group">' + '<el-button v-for="(i,idx)  in consButtons" v-if="i.show" :key="\'consButtons_\' + idx" :type="i.type"  :plain="i.plain" :round="i.round" :icon="i.icon" @click="(i.click||i.op==\'reset\'||i.op==\'switch\')&&click(i.click,i.op)" ><b v-show="!_thrift">{{i.label}}</b><b v-show="_thrift"></b></el-button>' + '</div>' + '</el-col>\
            </el-row>\
            </transition>';
          tmplate += moreSearch;
        }

        tmplate += ' </el-form></div>';

        return tmplate;
      }
    };
    this.$options.template = renderXtemplate.call(this);
    this.preTreat();
  },

  watch: {
    fieldData: function fieldData(val) {
      this.rebuildFn();
    }
  }
});
// CONCATENATED MODULE: ./packages/xform-q/index.js


/* istanbul ignore next */
xform_q.install = function (Vue) {
  Vue.component(xform_q.name, xform_q);
};

/* harmony default export */ var packages_xform_q = __webpack_exports__["default"] = (xform_q);

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ })

/******/ });