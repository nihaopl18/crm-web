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
/******/ 	return __webpack_require__(__webpack_require__.s = 230);
/******/ })
/************************************************************************/
/******/ ({

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./packages/xform-x/src/xform-x.js
/* harmony default export */ var xform_x = ({
  name: 'ElFormX',
  xtype: 'YuXformX',

  template: '<div class="el-form-x">\
  <el-form :model="formModel" :validate-on-rule-change="false" :rules="formRules" :style="{height: height,overflow: \'auto\',overflowX: \'hidden\'}"\
    :inline="inline" :label-position="labelPosition" :label-width="labelWidth"\
    :label-suffix="labelSuffix" :showMessage="showMessage">\
      <el-row v-for="(row, index) in rows" :key="\'rows_\' + index" :gutter="20">\
        <el-col v-for="(i, index) in row.field" v-show="i.hidden !== true" :key="i.field" :span="24/row.columnCount" >\
          <el-form-item :prop="i.field" :label="i.label" :label-width="i.width">\
                 <el-input :ref="i.field"\
                   v-if="!i.type || i.type==\'input\'||i.type==\'password\'||i.type==\'textarea\'" \
                   :type="i.type" v-model="formModel[i.field]" \
                   :maxlength="i.maxlength" :minlength="i.minlength" :placeholder="i.placeholder"\
                   :disabled="i.calcDisabled" :size="i.size" :icon="i.icon" :rows="i.rows" :autosize="i.autosize" \
                   :autoComplete="i.autoComplete" :name="i.name" :readonly="i.readonly" :max="i.max" :min="i.min" \
               :step="i.step" :resize="i.resize" :limit-char="i.limitChar"\
                   :autofocus="i.autofocus" :form="i.form" :on-icon-click="i.onIconClick"\
                   :validateEvent="i.validateEvent"\
                   @click="i.click&&i.click(formModel[i.field],formModel,arguments)"\
                   @blur="i.blur&&i.blur(formModel[i.field],formModel,arguments)"\
                   @focus="i.focus&&i.focus(formModel[i.field],formModel,arguments)"\
                   @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                   <el-button v-if="i.appendBtn" slot="append" :type="i.appendBtn.type" :size="i.appendBtn.size" :plain="i.appendBtn.plain" :round="i.appendBtn.round"\
                    :loading="i.appendBtn.loading" :disabled="i.appendBtn.disabled" :icon="i.appendBtn.icon" :autofocus="i.appendBtn.autofocus"\
                    @click="i.appendBtn.click" >{{i.appendBtn.label}}</el-button>\
                 </el-input>\
                 <el-input :ref="i.field"\
               v-else-if="!i.type || i.type==\'num\'" :type="i.type"  :formatter="i.formatter" :digit="i.digit"\
               v-model="formModel[i.field]" \
               :maxlength="i.maxlength" :minlength="i.minlength" :placeholder="i.placeholder"\
               :disabled="i.calcDisabled" :size="i.size" :icon="i.icon" :rows="i.rows" :autosize="i.autosize" \
               :autoComplete="i.autoComplete" :name="i.name" :readonly="i.readonly" :max="i.max" :min="i.min" \
               :step="i.step" :resize="i.resize"\
               :autofocus="i.autofocus" :form="i.form" :on-icon-click="i.onIconClick"\
               :validateEvent="i.validateEvent"\
               @click="i.click&&i.click(formModel[i.field],formModel,arguments)"\
               @blur="i.blur&&i.blur(formModel[i.field],formModel,arguments)"\
               @focus="i.focus&&i.focus(formModel[i.field],formModel,arguments)"\
               @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
             </el-input>\
             <el-color-picker :ref="i.field" v-else-if="i.type==\'colorpicker\'" v-model="formModel[i.field]" :show-alpha="i.showAlpha"\
              :color-format="i.colorFormat" @change="i.change&&i.change(formModel[i.field],formModel,arguments)"\
              @active-change=i.activeChange&&i.activeChange(formModel[i.field])></el-color-picker>\
                 <el-date-picker :ref="i.field"\
                   v-else-if="i.type==\'date\'||i.type==\'week\'||i.type==\'year\'||i.type==\'month\'\
                     ||i.type==\'datetime\'||i.type==\'datetimerange\'||i.type==\'daterange\'" \
                   :type="i.type" v-model="formModel[i.field]" :readonly="i.readonly" :disabled="i.calcDisabled"\
                   :editable="i.editable" :clearable="i.clearable" :size="i.size" :placeholder="i.placeholder" \
                   :format="i.format" :align="i.align" :popperClass="i.popperClass" :picker-options="i.pickerOptions"\
                   :range-separator="i.rangeSeparator" \
                   @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                 </el-date-picker>\
                 <el-time-select :ref="i.field"\
                   v-else-if="i.type==\'time\'"\
                   v-model="formModel[i.field]" :isRange="i.isRange" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
                   :readonly="i.readonly" :disabled="i.calcDisabled" :clearable="i.clearable" :popperClass="i.popperClass"\
                   :editable="i.editable" :align="i.align" :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
                   @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                 </el-time-select>\
                 <el-time-picker :ref="i.field"\
                   v-else-if="i.type==\'timePicker\'" \
                   v-model="formModel[i.field]" :isRange="i.isRange" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
                   :readonly="i.readonly" :disabled="i.calcDisabled" :clearable="i.clearable" :popperClass="i.popperClass"\
                   :editable="i.editable" :align="i.align" :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
                   @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                 </el-time-picker>\
                 <el-select-x :ref="i.field"\
                   v-else-if="i.type==\'select\'" :request-type="i.requestType" :data-params="i.dataParams"  :clearable="i.clearable"\
                   v-model="formModel[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl" :allow-create="i.allowCreate"\
                   :data-code="i.dataCode" :disabled="i.calcDisabled" :multiple="i.multiple" :placeholder="i.placeholder" :filterable="i.filterable" :filter-method="i.filterMethod"\
               :datacode-filter="i.datacodeFilter" @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                 </el-select-x>\
                 <el-radio-x :ref="i.field"\
                   v-else-if="i.type==\'radio\'" \
                   v-model="formModel[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl" :disabled="i.calcDisabled"\
                   :data-code="i.dataCode"\
               :option-button="i.optionButton" @change="i.change&&i.change(formModel[i.field],formModel,arguments)"">\
                 </el-radio-x>\
                 <el-checkbox-x :ref="i.field"\
                   v-else-if="i.type==\'checkbox\'"\
                   v-model="formModel[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl" :min=i.min :max=i.max \
                   :data-code="i.dataCode"\
                   :option-button="i.optionButton" :disabled="i.calcDisabled" @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                 </el-checkbox-x>\
                 <el-switch :ref="i.field"\
                   v-else-if="i.type==\'switch\'"\
                   v-model="formModel[i.field]" :on-text="i.onText" :off-text="i.offText"\
                   :disabled="i.calcDisabled" \
                   @change="i.change && i.change(formModel[i.field],formModel,arguments)">\
                 </el-switch>\
                 <component :ref="i.ref||i.field"\
                  v-else-if="i.type==\'custom\'"\
              v-model="formModel[i.field]" :params="i.params" v-bind="i.params" :placeholder="i.placeholder"\
                  :disabled="i.calcDisabled" :readonly="i.readonly" :size="i.size" :raw-value="i.rawValue" \
                  @click-fn="i.clickFn && i.clickFn(formModel[i.field],formModel,arguments)"\
                  @change="i.change && i.change(formModel[i.field],formModel,arguments)"\
                  :is="i.is" @select-fn="i.selectFn && i.selectFn(formModel[i.field],formModel,arguments)">\
                 </component>\
              </el-form-item>\
        </el-col>\
      </el-row>\
  </el-form>\
  <el-row :gutter="20" class="el-form-x-footer">\
      <el-button v-for="(i,idx) in buttons" :key="\'buttons_\' + idx" v-show="!i.hidden" :type="i.type" :size="i.size" :plain="i.plain" :round="i.round"\
        :loading="i.loading" :disabled="i.disabled" :icon="i.icon" :autofocus="i.autofocus" :native-type="i.nativeType"\
        @click="(i.click||i.op==\'reset\')&&click(i.click,i.op)" >{{i.label}}</el-button>\
  </el-row>\
 </div>',
  props: {
    groupFields: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    buttons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 是否采用分组表单
    collapse: {
      type: Boolean,
      default: false
    },
    // 分组表单默认展开项
    expand: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    hasLabel: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    height: {
      type: String,
      default: 'auto'
    },

    // ElForm自带属性
    model: Object,
    rules: Object,
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
    }
  },
  data: function data() {
    return {
      groupField: this.groupFields,
      expandCollapseName: this.expand,
      rows: [],
      formModel: {},
      formRules: []
    };
  },
  created: function created() {
    var pt = this.collapse ? this.preGroupTreat() : this.preTreat();
    pt.formRules = yufp.extend(this.rules || {}, pt.formRules);
    this.rows = pt.rows;
    this.formModel = pt.formModel;
    this.formRules = pt.formRules;
    if (this.collapse) {
      this.$options.template = '<div class="el-form-x" :collapse="collapse">\
         <el-collapse v-model="expandCollapseName" @change="change">\
         <el-collapse-item v-for="(item, index) in rows" :key="\'rows_\'+index" :title="item.title" :name="item.name">\
         <el-form :model="formModel" :validate-on-rule-change="false" :rules="formRules" :style="{height: height,overflow: \'auto\',overflowX: \'hidden\'}"\
           :inline="inline" :label-position="labelPosition" :label-width="labelWidth"\
           :label-suffix="labelSuffix" :showMessage="showMessage">\
             <el-row v-for="(row, index) in item.rows" :key="\'form_item_\'+index" :gutter="20">\
               <el-col v-for="(i, idx) in row.field" v-show="i.hidden !== true" :key="i.field +\'_\'+ idx" :span="24/row.columnCount" >\
       <el-form-item :prop="i.field" :label="i.label" :label-width="i.width">\
                        <el-input :ref="i.field" \
                          v-if="!i.type || i.type==\'input\'||i.type==\'password\'||i.type==\'textarea\'" \
                          :type="i.type" v-model="formModel[i.field]" \
                          :maxlength="i.maxlength" :minlength="i.minlength" :placeholder="i.placeholder"\
                          :disabled="i.calcDisabled" :size="i.size" :icon="i.icon" :rows="i.rows" :autosize="i.autosize" \
                          :autoComplete="i.autoComplete" :name="i.name" :readonly="i.readonly" :max="i.max" :min="i.min" \
            :step="i.step" :resize="i.resize" :limit-char="i.limitChar"\
                          :autofocus="i.autofocus" :form="i.form" :on-icon-click="i.onIconClick"\
                          :validateEvent="i.validateEvent"\
                          @click="i.click&&i.click(formModel[i.field],formModel,arguments)"\
                          @blur="i.blur&&i.blur(formModel[i.field],formModel,arguments)"\
                          @focus="i.focus&&i.focus(formModel[i.field],formModel,arguments)"\
                          @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-input>\
                        <el-input :ref="i.field"\
                   v-else-if="!i.type || i.type==\'num\'" :type="i.type"  :formatter="i.formatter" :digit="i.digit"\
                   v-model="formModel[i.field]" \
                   :maxlength="i.maxlength" :minlength="i.minlength" :placeholder="i.placeholder"\
                   :disabled="i.calcDisabled" :size="i.size" :icon="i.icon" :rows="i.rows" :autosize="i.autosize" \
                   :autoComplete="i.autoComplete" :name="i.name" :readonly="i.readonly" :max="i.max" :min="i.min" \
                   :step="i.step" :resize="i.resize"\
                   :autofocus="i.autofocus" :form="i.form" :on-icon-click="i.onIconClick"\
                   :validateEvent="i.validateEvent"\
                   @click="i.click&&i.click(formModel[i.field],formModel,arguments)"\
                   @blur="i.blur&&i.blur(formModel[i.field],formModel,arguments)"\
                   @focus="i.focus&&i.focus(formModel[i.field],formModel,arguments)"\
                   @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                   <el-button v-if="i.appendBtn" slot="append" :type="i.appendBtn.type" :size="i.appendBtn.size" :plain="i.appendBtn.plain" :round="i.appendBtn.round"\
                    :loading="i.appendBtn.loading" :disabled="i.appendBtn.disabled" :icon="i.appendBtn.icon" :autofocus="i.appendBtn.autofocus"\
                    @click="i.appendBtn.click" >{{i.appendBtn.label}}</el-button>\
                 </el-input>\
           <el-color-picker :ref="i.field" v-else-if="i.type==\'colorpicker\'" v-model="formModel[i.field]" :show-alpha="i.showAlpha"\
              :color-format="i.colorFormat" @change="i.change&&i.change(formModel[i.field],formModel,arguments)"\
              @active-change=i.activeChange&&i.activeChange(formModel[i.field])></el-color-picker>\
                        <el-date-picker :ref="i.field" \
                          v-else-if="i.type==\'date\'||i.type==\'week\'||i.type==\'year\'||i.type==\'month\'\
                            ||i.type==\'datetime\'||i.type==\'datetimerange\'||i.type==\'daterange\'" \
                          :type="i.type" v-model="formModel[i.field]" :readonly="i.readonly" :disabled="i.calcDisabled"\
                          :editable="i.editable" :clearable="i.clearable" :size="i.size" :placeholder="i.placeholder" \
                          :format="i.format" :align="i.align" :popperClass="i.popperClass" :picker-options="i.pickerOptions"\
                          :range-separator="i.rangeSeparator" \
                          @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-date-picker>\
                        <el-time-select :ref="i.field" \
                          v-else-if="i.type==\'time\'"\
                          v-model="formModel[i.field]" :isRange="i.isRange" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
                          :readonly="i.readonly" :disabled="i.calcDisabled" :clearable="i.clearable" :popperClass="i.popperClass"\
                          :editable="i.editable" :align="i.align" :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
                          @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-time-select>\
                        <el-time-picker :ref="i.field" \
                          v-else-if="i.type==\'timePicker\'" \
                          v-model="formModel[i.field]" :isRange="i.isRange" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
                          :readonly="i.readonly" :disabled="i.calcDisabled" :clearable="i.clearable" :popperClass="i.popperClass"\
                          :editable="i.editable" :align="i.align" :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
                          @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-time-picker>\
                        <el-select-x :ref="i.field" \
            v-else-if="i.type==\'select\'" :filterable="i.filterable" :filter-method="i.filterMethod"\
                          v-model="formModel[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl" :allow-create="i.allowCreate"\
            :data-code="i.dataCode" :disabled="i.calcDisabled" :multiple="i.multiple" :datacode-filter="i.datacodeFilter"\
                          @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-select-x>\
                        <el-radio-x :ref="i.field" \
                          v-else-if="i.type==\'radio\'" \
                          v-model="formModel[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl" :disabled="i.calcDisabled"\
                          :data-code="i.dataCode"\
            @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-radio-x>\
                        <el-checkbox-x :ref="i.field" \
                          v-else-if="i.type==\'checkbox\'"\
                          v-model="formModel[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl" :min=i.min :max=i.max \
                          :data-code="i.dataCode"\
            :disabled="i.calcDisabled" @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-checkbox-x>\
                        <component :ref="i.ref||i.field" v-else-if="i.type==\'custom\'"\
                         v-model="formModel[i.field]" v-bind="i.params" :params="i.params"\
                         :disabled="i.calcDisabled" :readonly="i.readonly" :size="i.size" :raw-value="i.rawValue" \
                         @click-fn="i.clickFn && i.clickFn(formModel[i.field],formModel,arguments)"\
                         @change="i.change && i.change(formModel[i.field],formModel,arguments)"\
                         :is="i.is" @select-fn="i.selectFn && i.selectFn(formModel[i.field],formModel,arguments)">\
                        </component>\
                     </el-form-item>\
               </el-col>\
             </el-row>\
         </el-form>\
         </el-collapse-item> \
         </el-collapse>\
         <el-row :gutter="20" class="el-form-x-footer">\
             <el-button v-for="(i,idx) in buttons" :key="\'buttons_\'+idx" v-show="!i.hidden" :type="i.type" :size="i.size" :plain="i.plain" :round="i.round"\
               :loading="i.loading" :disabled="i.disabled" :icon="i.icon" :autofocus="i.autofocus" :native-type="i.nativeType"\
               @click="(i.click||i.op==\'reset\')&&click(i.click,i.op)" >{{i.label}}</el-button>\
         </el-row>\
        </div>';
    }
  },
  mounted: function mounted() {
    var _this = this;
    if (this.groupField.length > 0) {
      // 针对小屏幕，布局做降级处理。
      var groupField = _this.groupField;
      _this.groupField = [];
      var conTainer = _this;
      var conTainerWidth = parseFloat(_this.$el.offsetWidth);
      while (!conTainerWidth) {
        conTainer = conTainer.$parent;
        conTainerWidth = conTainer.$el.offsetWidth;
      }
      for (var i = 0, l = groupField.length; i < l; i++) {
        var column = groupField[i].columnCount;
        var width = conTainerWidth / column;
        var basicWidth = 150 + parseFloat(_this.labelWidth);
        if (width < basicWidth) {
          groupField[i].columnCount = Math.floor(conTainerWidth / basicWidth);
          if (24 % groupField[i].columnCount !== 0) {
            groupField[i].columnCount--;
          }
        }
      }
      _this.groupField = groupField;
    }
  },

  methods: {
    rebuildFn: function rebuildFn() {
      var pt = this.collapse ? this.preGroupTreat() : this.preTreat();
      pt.formRules = yufp.extend(this.rules || {}, pt.formRules);
      this.formRules = pt.formRules;
      this.rows = pt.rows;
    },
    resetFn: function resetFn() {
      var pt = this.collapse ? this.preGroupTreat() : this.preTreat();
      pt.formRules = yufp.extend(this.rules || {}, pt.formRules);
      this.formRules = pt.formRules;
      this.formModel = pt.formModel;
      this.rows = pt.rows;
    },
    change: function change(group) {
      this.$emit('change', group);
    },
    preTreat: function preTreat() {
      var _this = this;
      var formModel = {};
      var formRules = {};
      var rows = [];
      var cols = [];
      for (var i = 0, iLen = _this.groupField.length; i < iLen; i++) {
        var gf = _this.groupField[i];
        var columnCount = gf.columnCount ? gf.columnCount : 1;
        var fields = gf.fields;
        for (var j = 0, jLen = fields.length; j < jLen; j++) {
          var f = fields[j];
          f.calcDisabled = f.disabled ? f.disabled : _this.disabled;
          if (!_this.hasLabel) {
            f.placeholder = f.placeholder ? f.placeholder : f.label;
            delete f.label;
            delete f.labelWidth;
          } else {
            f.width = f.width ? f.width : _this.labelWidth;
          }
          if (f.type === 'checkbox') {
            formModel[f.field] = f.value || [];
          } else if (f.type === 'select' && f.multiple) {
            formModel[f.field] = f.value || [];
          } else {
            formModel[f.field] = f.value || '';
          }
          if (f.rules) {
            formRules[f.field] = f.rules;
          }
          if (f.hidden !== true) {
            cols.push(f);
            if (cols.length === columnCount) {
              rows.push({
                field: cols,
                columnCount: columnCount
              });
              cols = [];
            }
          }
        }
        if (cols.length > 0) {
          rows.push({
            field: cols,
            columnCount: columnCount
          });
          cols = [];
        }
      }
      return {
        rows: rows,
        formModel: formModel,
        formRules: formRules
      };
    },
    preGroupTreat: function preGroupTreat() {
      var formModel = {};
      var formRules = {};
      var rows = [];
      var cols = [];
      var formArray = [];
      var formdata = {};
      for (var i = 0, iLen = this.groupFields.length; i < iLen; i++) {
        var gf = this.groupFields[i];
        var title = gf.title;
        var name = gf.name;
        var columnCount = gf.columnCount ? gf.columnCount : 1;
        var fields = gf.fields;
        for (var j = 0, jLen = fields.length; j < jLen; j++) {
          var f = fields[j];
          f.calcDisabled = f.disabled ? f.disabled : this.disabled;
          if (!this.hasLabel) {
            f.placeholder = f.placeholder ? f.placeholder : f.label;
            delete f.label;
            delete f.labelWidth;
          } else {
            f.width = f.width ? f.width : this.labelWidth;
          }
          if (f.type === 'checkbox') {
            formModel[f.field] = f.value || [];
          } else if (f.type === 'select' && f.multiple) {
            formModel[f.field] = f.value || [];
          } else {
            formModel[f.field] = f.value || '';
          }
          if (f.rules) {
            formRules[f.field] = f.rules;
          }
          if (f.hidden !== true) {
            cols.push(f);
            if (cols.length === columnCount) {
              rows.push({
                field: cols,
                columnCount: columnCount
              });
              cols = [];
            }
          }
        }
        if (cols.length > 0) {
          rows.push({
            field: cols,
            columnCount: columnCount
          });
          cols = [];
          rows = [];
        }
        formdata.title = title;
        formdata.name = name;
        formdata.rows = rows;
        formArray.push(formdata);
        rows = [];
        formdata = {};
      }
      return {
        rows: formArray,
        formModel: formModel,
        formRules: formRules
      };
    },
    validate: function validate(callback) {
      return this.$children[0].validate(callback);
    },
    resetFields: function resetFields() {
      this.$children[0].resetFields();
    },
    switch: function _switch(field, params, value) {
      var dataArr = this.groupField;
      this.groupField = [];
      dataArr.filter(function (cur, index, arr) {
        var fields = cur.fields;
        fields.filter(function (cur, index, arr) {
          if (cur.field === field) {
            cur[params] = value;
          }
        });
      });
      this.groupField = dataArr;
    },
    click: function click(fn, op) {
      var me = this;
      if (op === 'reset') {
        me.$children[0].resetFields();
        fn && fn(me.formModel);
      } else if (op === 'submit') {
        me.$children[0].validate(function (valid) {
          fn(me.formModel, valid);
        });
      } else {
        fn(this.formModel);
      }
    },
    subRefs: function subRefs(field) {
      var ref = this.$refs[field];
      if (ref && ref.length > 0) {
        ref = ref[0];
      }
      return ref;
    }
  },
  watch: {
    groupField: function groupField(val) {
      this.rebuildFn();
    },
    disabled: function disabled(val) {
      this.rebuildFn();
    }
  }
});
// CONCATENATED MODULE: ./packages/xform-x/index.js


/* istanbul ignore next */
xform_x.install = function (Vue) {
  Vue.component(xform_x.name, xform_x);
};

/* harmony default export */ var packages_xform_x = __webpack_exports__["default"] = (xform_x);

/***/ })

/******/ });