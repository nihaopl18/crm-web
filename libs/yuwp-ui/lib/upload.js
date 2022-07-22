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
/******/ 	return __webpack_require__(__webpack_require__.s = 147);
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

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("babel-helper-vue-jsx-merge-props");

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/upload/src/upload-list.vue?vue&type=template&id=173fedf5&
var upload_listvue_type_template_id_173fedf5_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition-group",
    {
      class: [
        "el-upload-list",
        "el-upload-list--" + _vm.listType,
        { "is-disabled": _vm.disabled }
      ],
      attrs: { tag: "ul", name: "el-list" }
    },
    _vm._l(_vm.files, function(file) {
      return _c(
        "li",
        { key: file.uid, class: ["el-upload-list__item", "is-" + file.status] },
        [
          file.status !== "uploading" &&
          ["picture-card", "picture"].indexOf(_vm.listType) > -1
            ? _c("img", {
                staticClass: "el-upload-list__item-thumbnail",
                attrs: { src: file.url, alt: "" }
              })
            : _vm._e(),
          _c(
            "a",
            {
              staticClass: "el-upload-list__item-name",
              on: {
                click: function($event) {
                  return _vm.handleClick(file)
                }
              }
            },
            [
              _c("i", { staticClass: "el-icon-document" }),
              _vm._v(_vm._s(file.name) + "\n    ")
            ]
          ),
          _c("label", { staticClass: "el-upload-list__item-status-label" }, [
            _c("i", {
              class: {
                "el-icon-upload-success": true,
                "el-icon-circle-check": _vm.listType === "text",
                "el-icon-check":
                  ["picture-card", "picture"].indexOf(_vm.listType) > -1
              }
            })
          ]),
          !_vm.disabled
            ? _c("i", {
                staticClass: "el-icon-close",
                on: {
                  click: function($event) {
                    return _vm.$emit("remove", file)
                  }
                }
              })
            : _vm._e(),
          file.status === "uploading"
            ? _c("el-progress", {
                attrs: {
                  type: _vm.listType === "picture-card" ? "circle" : "line",
                  "stroke-width": _vm.listType === "picture-card" ? 6 : 2,
                  percentage: _vm.parsePercentage(file.percentage)
                }
              })
            : _vm._e(),
          _vm.listType === "picture-card"
            ? _c("span", { staticClass: "el-upload-list__item-actions" }, [
                _vm.handlePreview && _vm.listType === "picture-card"
                  ? _c(
                      "span",
                      {
                        staticClass: "el-upload-list__item-preview",
                        on: {
                          click: function($event) {
                            return _vm.handlePreview(file)
                          }
                        }
                      },
                      [_c("i", { staticClass: "el-icon-view" })]
                    )
                  : _vm._e(),
                !_vm.disabled
                  ? _c(
                      "span",
                      {
                        staticClass: "el-upload-list__item-delete",
                        on: {
                          click: function($event) {
                            return _vm.$emit("remove", file)
                          }
                        }
                      },
                      [_c("i", { staticClass: "el-icon-delete2" })]
                    )
                  : _vm._e()
              ])
            : _vm._e()
        ],
        1
      )
    }),
    0
  )
}
var staticRenderFns = []
upload_listvue_type_template_id_173fedf5_render._withStripped = true


// CONCATENATED MODULE: ./packages/upload/src/upload-list.vue?vue&type=template&id=173fedf5&

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: external "@/lib/progress"
var progress_ = __webpack_require__(91);
var progress_default = /*#__PURE__*/__webpack_require__.n(progress_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/upload/src/upload-list.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var upload_listvue_type_script_lang_js_ = ({
  mixins: [locale_default.a],

  components: { ElProgress: progress_default.a },

  props: {
    files: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handlePreview: Function,
    listType: String
  },
  methods: {
    parsePercentage: function parsePercentage(val) {
      return parseInt(val, 10);
    },
    handleClick: function handleClick(file) {
      this.handlePreview && this.handlePreview(file);
    }
  }
});
// CONCATENATED MODULE: ./packages/upload/src/upload-list.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_upload_listvue_type_script_lang_js_ = (upload_listvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/upload/src/upload-list.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_upload_listvue_type_script_lang_js_,
  upload_listvue_type_template_id_173fedf5_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/upload/src/upload-list.vue"
/* harmony default export */ var upload_list = (component.exports);
// EXTERNAL MODULE: external "babel-helper-vue-jsx-merge-props"
var external_babel_helper_vue_jsx_merge_props_ = __webpack_require__(14);
var external_babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(external_babel_helper_vue_jsx_merge_props_);

// CONCATENATED MODULE: ./packages/upload/src/ajax.js

function getError(action, option, xhr) {
  var msg = void 0;
  if (xhr.response) {
    msg = xhr.status + ' ' + (xhr.response.error || xhr.response);
  } else if (xhr.responseText) {
    msg = xhr.status + ' ' + xhr.responseText;
  } else {
    msg = 'fail to post ' + action + ' ' + xhr.status;
  }

  var err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getBody(xhr) {
  var text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function upload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  var xhr = new (window.Mock ? window._XMLHttpRequest : XMLHttpRequest)();
  var action = option.action;
  try {
    xhr.timeout = option.timeout;
    xhr.ontimeout = function timeout(e) {
      option.onTimeout(e);
      xhr.abort();
    };
  } catch (ex) {
    console.log('IE-AJAX：' + ex);
  }

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }

  var formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach(function (key) {
      formData.append(key, option.data[key]);
    });
  }
  // formData.append(option.filename, option.file);
  formData.append(option.filename, option.file, option.encode ? encodeURIComponent(option.file.name) : option.file.name);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }

    option.onSuccess(getBody(xhr));
  };

  xhr.open('post', action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  var headers = option.headers || {};

  for (var item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.send(formData);
  return xhr;
}
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/upload/src/upload-dragger.vue?vue&type=template&id=7ebbf219&
var upload_draggervue_type_template_id_7ebbf219_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "el-upload-dragger",
      class: {
        "is-dragover": _vm.dragover
      },
      on: {
        drop: function($event) {
          $event.preventDefault()
          return _vm.onDrop($event)
        },
        dragover: function($event) {
          $event.preventDefault()
          return _vm.onDragover($event)
        },
        dragleave: function($event) {
          $event.preventDefault()
          _vm.dragover = false
        }
      }
    },
    [_vm._t("default")],
    2
  )
}
var upload_draggervue_type_template_id_7ebbf219_staticRenderFns = []
upload_draggervue_type_template_id_7ebbf219_render._withStripped = true


// CONCATENATED MODULE: ./packages/upload/src/upload-dragger.vue?vue&type=template&id=7ebbf219&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/upload/src/upload-dragger.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var upload_draggervue_type_script_lang_js_ = ({
  name: 'ElUploadDrag',
  xtype: 'YuUploadDrag',

  props: {
    disabled: Boolean
  },
  data: function data() {
    return {
      dragover: false
    };
  },

  methods: {
    onDragover: function onDragover() {
      if (!this.disabled) {
        this.dragover = true;
      }
    },
    onDrop: function onDrop(e) {
      if (!this.disabled) {
        this.dragover = false;
        this.$emit('file', e.dataTransfer.files);
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/upload/src/upload-dragger.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_upload_draggervue_type_script_lang_js_ = (upload_draggervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/upload/src/upload-dragger.vue





/* normalize component */

var upload_dragger_component = Object(componentNormalizer["a" /* default */])(
  src_upload_draggervue_type_script_lang_js_,
  upload_draggervue_type_template_id_7ebbf219_render,
  upload_draggervue_type_template_id_7ebbf219_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var upload_dragger_api; }
upload_dragger_component.options.__file = "packages/upload/src/upload-dragger.vue"
/* harmony default export */ var upload_dragger = (upload_dragger_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/upload/src/upload.vue?vue&type=script&lang=js&





/* harmony default export */ var uploadvue_type_script_lang_js_ = ({
  inject: ['uploader'],
  components: {
    UploadDragger: upload_dragger
  },
  props: {
    type: String,
    action: {
      type: String,
      required: true
    },
    timeout: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: 'file'
    },
    data: Object,
    headers: Object,
    withCredentials: Boolean,
    // 是否对文件名称进行url编码
    encode: Boolean,
    multiple: Boolean,
    accept: String,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onTimeout: Function,
    onError: Function,
    beforeUpload: Function,
    drag: Boolean,
    onPreview: {
      type: Function,
      default: function _default() {}
    },
    onRemove: {
      type: Function,
      default: function _default() {}
    },
    fileList: Array,
    autoUpload: Boolean,
    listType: String,
    httpRequest: {
      type: Function,
      default: upload
    },
    disabled: Boolean,
    limit: Number,
    onExceed: Function,
    limitNumber: {
      default: 1,
      type: Number
    }
  },

  data: function data() {
    return {
      mouseover: false,
      reqs: {}
    };
  },


  methods: {
    isImage: function isImage(str) {
      return str.indexOf('image') !== -1;
    },
    handleChange: function handleChange(ev) {
      var files = ev.target.files;

      if (!files) return;
      this.uploadFiles(files);
    },
    uploadFiles: function uploadFiles(files) {
      var _this = this;

      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }
      var postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      if (postFiles.length === 0) {
        return;
      }

      postFiles.forEach(function (rawFile) {
        _this.onStart(rawFile);
        if (_this.autoUpload) _this.upload(rawFile);
      });
    },
    upload: function upload(rawFile, file) {
      var _this2 = this;

      this.$refs.input.value = null;

      if (!this.beforeUpload) {
        return this.post(rawFile);
      }

      var before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then(function (processedFile) {
          if (Object.prototype.toString.call(processedFile) === '[object File]') {
            _this2.post(processedFile);
          } else {
            _this2.post(rawFile);
          }
        }, function () {
          _this2.onRemove(null, rawFile);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(null, rawFile);
      }
    },
    abort: function abort(file) {
      var reqs = this.reqs;

      if (file) {
        var uid = file;
        if (file.uid) uid = file.uid;
        if (reqs[uid]) {
          reqs[uid].abort();
        }
      } else {
        Object.keys(reqs).forEach(function (uid) {
          if (reqs[uid]) reqs[uid].abort();
          delete reqs[uid];
        });
      }
    },
    post: function post(rawFile) {
      var _this3 = this;

      var uid = rawFile.uid;

      var options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        encode: this.encode,
        timeout: this.timeout,
        onProgress: function onProgress(e) {
          _this3.onProgress(e, rawFile);
        },
        onTimeout: function onTimeout(e) {
          _this3.onTimeout(e, rawFile);
          clearSubReference(_this3.reqs[uid]);
          delete _this3.reqs[uid];
        },
        onSuccess: function onSuccess(res) {
          _this3.onSuccess(res, rawFile);
          clearSubReference(_this3.reqs[uid]);
          delete _this3.reqs[uid];
        },
        onError: function onError(err) {
          _this3.onError(err, rawFile);
          clearSubReference(_this3.reqs[uid]);
          delete _this3.reqs[uid];
        }
      };
      var clearSubReference = function clearSubReference(req) {
        // req.custom对象会在MockXMLHttpRequest.dispatchEvent进行解绑 // qfkong
        req && req.upload && (req.upload.onprogress = null);
        req && (req.ontimeout = req.onload = req.onerror = req = null);
      };
      var req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
      req = null; // qfkong
    },
    handleClick: function handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    getStyle: function getStyle() {
      if (this.listType === 'picture-card') {
        if (this.fileList.length < this.limitNumber) {
          return 'inline-block';
        } else {
          return 'none';
        }
      } else {
        return 'inline-block';
      }
    }
  },

  render: function render(h) {
    var handleClick = this.handleClick,
        drag = this.drag,
        name = this.name,
        handleChange = this.handleChange,
        multiple = this.multiple,
        accept = this.accept,
        listType = this.listType,
        uploadFiles = this.uploadFiles,
        disabled = this.disabled;

    var data = {
      class: {
        'el-upload': true
      },
      on: {
        click: handleClick
      }
    };
    data.class['el-upload--' + listType] = true;
    return h(
      'div',
      external_babel_helper_vue_jsx_merge_props_default()([data, { style: { display: this.getStyle() } }]),
      [drag ? h(
        'upload-dragger',
        {
          attrs: { disabled: disabled },
          on: {
            'file': uploadFiles
          }
        },
        [this.$slots.default]
      ) : this.$slots.default, h('input', { 'class': 'el-upload__input', attrs: { type: 'file', name: name, multiple: multiple, accept: accept },
        ref: 'input', on: {
          'change': handleChange
        }
      })]
    );
  }
});
// CONCATENATED MODULE: ./packages/upload/src/upload.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_uploadvue_type_script_lang_js_ = (uploadvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/upload/src/upload.vue
var upload_render, upload_staticRenderFns




/* normalize component */

var upload_component = Object(componentNormalizer["a" /* default */])(
  src_uploadvue_type_script_lang_js_,
  upload_render,
  upload_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var upload_api; }
upload_component.options.__file = "packages/upload/src/upload.vue"
/* harmony default export */ var src_upload = (upload_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/upload/src/iframe-upload.vue?vue&type=script&lang=js&



/* harmony default export */ var iframe_uploadvue_type_script_lang_js_ = ({
  components: {
    UploadDragger: upload_dragger
  },
  props: {
    type: String,
    data: {},
    action: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'file'
    },
    withCredentials: Boolean,
    accept: String,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    beforeUpload: Function,
    onPreview: {
      type: Function,
      default: function _default() {}
    },
    onRemove: {
      type: Function,
      default: function _default() {}
    },
    drag: Boolean,
    autoUpload: Boolean,
    listType: String,
    disabled: Boolean
  },

  data: function data() {
    return {
      key: 0,
      mouseover: false,
      domain: '',
      file: null,
      submitting: false
    };
  },


  methods: {
    isImage: function isImage(str) {
      return str.indexOf('image') !== -1;
    },
    handleClick: function handleClick() {
      // if (!this.disabled) {
      // IE9 不能通过程序触发文件选择框，否则form.submit()时会报拒绝访问
      // this.$refs.input.click();
      // }
    },
    handleChange: function handleChange(ev) {
      var file = ev.target.value;
      if (file) {
        if (typeof file === 'string') {
          var nameIdx = file.lastIndexOf('\\');
          var typeIdx = file.lastIndexOf('.');
          file = {
            name: file.substring(nameIdx !== -1 ? nameIdx + 1 : 0),
            type: typeIdx === -1 ? '' : file.substring(typeIdx + 1).toLowerCase(),
            size: 999,
            raw: file
          };
        }
        this.uploadFiles(file);
      }
    },
    uploadFiles: function uploadFiles(rawFile) {
      this.onStart(rawFile);
      if (this.autoUpload) this.upload(rawFile);
    },
    upload: function upload(rawFile) {
      if (!this.beforeUpload) {
        return this.post(rawFile);
      }
      var before = this.beforeUpload(rawFile);
      if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(null, rawFile);
      }
    },
    post: function post(file) {
      var filepath = this.$refs.input.value;
      if (!filepath) {
        this.onRemove(null, file);
      }
      if (this.submitting) return;
      this.submitting = true;
      this.file = file;

      var formNode = this.getFormNode();
      var dataSpan = this.getFormDataNode();
      var data = this.data;
      if (typeof data === 'function') {
        data = data(file);
      }
      var inputs = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          inputs.push('<input name="' + key + '" value="' + data[key] + '"/>');
        }
      }
      dataSpan.innerHTML = inputs.join('');
      formNode.submit();
      dataSpan.innerHTML = '';
    },
    abort: function abort(file) {
      // IE 9没有用Ajax FormData上传，因此无XHR取消
    },
    getFormNode: function getFormNode() {
      return this.$refs.form;
    },
    getFormDataNode: function getFormDataNode() {
      return this.$refs.data;
    },
    parseUrl: function parseUrl(url) {
      var r = {
        protocol: /([^\/]+:)\/\/(.*)/i,
        host: /(^[^\:\/]+)((?:\/|:|$)?.*)/,
        port: /\:?([^\/]*)(\/?.*)/,
        pathname: /([^\?#]+)(\??[^#]*)(#?.*)/
      };
      var tmp = {};
      var res = {};
      res['href'] = url;
      for (var p in r) {
        tmp = r[p].exec(url);
        res[p] = tmp[1];
        url = tmp[2];
        if (url === '') {
          url = '/';
        }
        if (p === 'pathname') {
          res['pathname'] = tmp[1];
          res['search'] = tmp[2];
          res['hash'] = tmp[3];
        }
      }
      res['origin'] = res.protocol + '//' + res.host + (res.port ? ':' + res.port : '');
      return res;
    },

    /**
     * 上传后回调，不论成功失败
     */
    onload: function onload(e) {
      if (this.file == null) {
        // 默认就会加载iframe，尽管此时URL为空
        return;
      }
      this.$refs.input.value = null;
      this.key++;
      var win = this.$refs.iframe.contentWindow;
      var response = win.document.body.innerHTML;
      try {
        response = JSON.parse(response);
        this.onSuccess(response, this.file);
      } catch (e) {
        response = {};
        this.onError(response, this.file);
      }
      this.submitting = false;
      this.file = null;
    }
  },

  created: function created() {
    this.frameName = 'frame-' + Date.now();
    this.inputId = 'input-' + Date.now();
  },
  mounted: function mounted() {},
  render: function render(h) {
    var listType = this.listType,
        frameName = this.frameName,
        inputId = this.inputId,
        disabled = this.disabled;

    var oClass = { 'el-upload': true };
    oClass['el-upload--' + listType] = true;

    return h(
      'div',
      {
        'class': oClass,
        on: {
          'click': this.handleClick
        },
        nativeOn: {
          'drop': this.onDrop,
          'dragover': this.handleDragover,
          'dragleave': this.handleDragleave
        }
      },
      [h('iframe', {
        on: {
          'load': this.onload
        },

        ref: 'iframe',
        attrs: { name: frameName
        }
      }), h(
        'form',
        { ref: 'form', attrs: { action: this.action, target: frameName, enctype: 'multipart/form-data', method: 'POST' }
        },
        [h(
          'label',
          {
            attrs: { 'for': inputId }
          },
          [this.$slots.default]
        ), h('input', {
          key: this.key,
          'class': 'el-upload__input',
          attrs: { type: 'file',
            id: inputId,

            name: this.name,

            accept: this.accept,
            disabled: disabled },
          ref: 'input', on: {
            'change': this.handleChange
          }
        }), h('input', {
          attrs: { type: 'hidden', name: 'documentDomain' },
          domProps: {
            'value': this.$isServer ? '' : document.domain
          }
        }), h('span', { ref: 'data' })]
      )]
    );
  }
});
// CONCATENATED MODULE: ./packages/upload/src/iframe-upload.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_iframe_uploadvue_type_script_lang_js_ = (iframe_uploadvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/upload/src/iframe-upload.vue
var iframe_upload_render, iframe_upload_staticRenderFns




/* normalize component */

var iframe_upload_component = Object(componentNormalizer["a" /* default */])(
  src_iframe_uploadvue_type_script_lang_js_,
  iframe_upload_render,
  iframe_upload_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var iframe_upload_api; }
iframe_upload_component.options.__file = "packages/upload/src/iframe-upload.vue"
/* harmony default export */ var iframe_upload = (iframe_upload_component.exports);
// EXTERNAL MODULE: external "@/lib/mixins/migrating"
var migrating_ = __webpack_require__(30);
var migrating_default = /*#__PURE__*/__webpack_require__.n(migrating_);

// EXTERNAL MODULE: external "@/lib/locale"
var lib_locale_ = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/upload/src/index.vue?vue&type=script&lang=js&








function noop() {}

/* harmony default export */ var srcvue_type_script_lang_js_ = ({
  name: 'ElUpload',
  xtype: 'YuUpload',

  mixins: [migrating_default.a],

  components: {
    ElProgress: progress_default.a,
    UploadList: upload_list,
    Upload: src_upload,
    IframeUpload: iframe_upload
  },

  provide: {
    uploader: undefined
  },

  props: {
    timeout: {
      type: Number,
      default: 0
    },
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    data: Object,
    multiple: Boolean,
    name: {
      type: String,
      default: 'file'
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: String,
    type: {
      type: String,
      default: 'select'
    },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onTimeout: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    fileList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'text' // text,picture,picture-card
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: noop
    },
    limitNumber: {
      default: 1,
      type: Number
    }
  },

  data: function data() {
    return {
      uploadFiles: [],
      dragOver: false,
      draging: false,
      tempIndex: 1
    };
  },


  watch: {
    fileList: {
      immediate: true,
      handler: function handler(fileList) {
        var _this = this;

        this.uploadFiles = fileList.map(function (item) {
          item.uid = item.uid || Date.now() + _this.tempIndex++;
          item.status = 'success';
          return item;
        });
      }
    }
  },

  methods: {
    handleStart: function handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      var file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };

      try {
        file.url = URL.createObjectURL(rawFile);
      } catch (err) {
        file.url = rawFile.raw;
      }

      this.uploadFiles.push(file);
      this.onChange(file, this.uploadFiles);
      file = null; // qfkong
    },
    handleProgress: function handleProgress(ev, rawFile) {
      var file = this.getFile(rawFile);
      this.onProgress(ev, file, this.uploadFiles);
      file.status = 'uploading';
      file.percentage = ev.percent || 0;
    },
    handleTimeout: function handleTimeout(e, rawFile) {
      this.onTimeout(e, file);
      this.$message('上传文件超时');
      this.abort(file);
      var file = this.getFile(rawFile);
      file.status = 'fail';
    },
    handleSuccess: function handleSuccess(res, rawFile) {
      var file = this.getFile(rawFile);

      if (file) {
        file.status = 'success';
        file.response = res;

        this.onSuccess(res, file, this.uploadFiles);
        this.onChange(file, this.uploadFiles);
      }
    },
    handleError: function handleError(err, rawFile) {
      var file = this.getFile(rawFile);
      var fileList = this.uploadFiles;

      file.status = 'fail';

      fileList.splice(fileList.indexOf(file), 1);

      this.onError(err, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
    },
    handleRemove: function handleRemove(file, raw) {
      var _this2 = this;

      if (raw) {
        file = this.getFile(raw);
      }
      var doRemove = function doRemove() {
        _this2.abort(file);
        var fileList = _this2.uploadFiles;
        fileList.splice(fileList.indexOf(file), 1);
        _this2.onRemove(file, fileList);
      };

      if (!this.beforeRemove) {
        doRemove();
      } else if (typeof this.beforeRemove === 'function') {
        var before = this.beforeRemove(file, this.uploadFiles);
        if (before && before.then) {
          before.then(function () {
            doRemove();
          }, noop);
        } else if (before !== false) {
          doRemove();
        }
      }
    },
    getFile: function getFile(rawFile) {
      var fileList = this.uploadFiles;
      var target = void 0;
      fileList.every(function (item) {
        target = rawFile.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    abort: function abort(file) {
      this.$refs['upload-inner'].abort(file);
    },
    clearFiles: function clearFiles() {
      this.uploadFiles = [];
    },
    submit: function submit() {
      var _this3 = this;

      this.uploadFiles.filter(function (file) {
        return file.status === 'ready';
      }).forEach(function (file) {
        _this3.$refs['upload-inner'].upload(file.raw);
      });
    },
    getMigratingConfig: function getMigratingConfig() {
      return {
        props: {
          'default-file-list': Object(lib_locale_["t"])('el.upload.defaultFileList'),
          'show-upload-list': Object(lib_locale_["t"])('el.upload.showUploadList'),
          'thumbnail-mode': Object(lib_locale_["t"])('el.upload.thumbnailMode')
        }
      };
    }
  },

  render: function render(h) {
    var uploadList = void 0;

    if (this.showFileList) {
      uploadList = h(upload_list, {
        attrs: {
          disabled: this.disabled,
          listType: this.listType,
          files: this.uploadFiles,

          handlePreview: this.onPreview },
        on: {
          'remove': this.handleRemove
        }
      });
    }

    var uploadData = {
      props: {
        type: this.type,
        drag: this.drag,
        timeout: this.timeout,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        'with-credentials': this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.disabled,
        limit: this.limit,
        limitNumber: this.limitNumber,
        'on-exceed': this.onExceed,
        'on-start': this.handleStart,
        'on-progress': this.handleProgress,
        'on-timeout': this.handleTimeout,
        'on-success': this.handleSuccess,
        'on-error': this.handleError,
        'on-preview': this.onPreview,
        'on-remove': this.handleRemove,
        'http-request': this.httpRequest
      },
      ref: 'upload-inner'
    };

    var trigger = this.$slots.trigger || this.$slots.default;
    var uploadComponent = typeof FormData !== 'undefined' || this.$isServer ? h(
      'upload',
      uploadData,
      [trigger]
    ) : h(
      'iframeUpload',
      uploadData,
      [trigger]
    );

    return h('div', [this.listType === 'picture-card' ? uploadList : '', this.$slots.trigger ? [uploadComponent, this.$slots.default] : uploadComponent, this.$slots.tip, this.listType !== 'picture-card' ? uploadList : '']);
  }
});
// CONCATENATED MODULE: ./packages/upload/src/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var upload_srcvue_type_script_lang_js_ = (srcvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/upload/src/index.vue
var src_render, src_staticRenderFns




/* normalize component */

var src_component = Object(componentNormalizer["a" /* default */])(
  upload_srcvue_type_script_lang_js_,
  src_render,
  src_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var src_api; }
src_component.options.__file = "packages/upload/src/index.vue"
/* harmony default export */ var src = (src_component.exports);
// CONCATENATED MODULE: ./packages/upload/index.js


/* istanbul ignore next */
src.install = function (Vue) {
  Vue.component(src.name, src);
};

/* harmony default export */ var packages_upload = __webpack_exports__["default"] = (src);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/migrating");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ }),

/***/ 91:
/***/ (function(module, exports) {

module.exports = require("@/lib/progress");

/***/ })

/******/ });