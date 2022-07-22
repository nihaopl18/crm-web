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
/******/ 	return __webpack_require__(__webpack_require__.s = 135);
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

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66);


/* istanbul ignore next */
_src_form__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = function (Vue) {
  Vue.component(_src_form__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].name, _src_form__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
};

/* harmony default export */ __webpack_exports__["default"] = (_src_form__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

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

/***/ 27:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/popup");

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports = require("@/lib/utils/types");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/locale");

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

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatters; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by zhangkun on 2018/09/17.
 */


var formatters = {

  'moneyFormatter': function moneyFormatter(money, num) {
    /*
      * 参数说明：
      * money：要格式化的数字
      * num：保留几位小数
      * */
    num = num > 0 && num <= 20 ? num : 2;
    money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
    var l = money.split('.')[0].split('').reverse();
    var r = money.split('.')[1];
    var t = '';
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
    }
    return t.split('').reverse().join('') + '.' + r;
  },

  'toPercent': function toPercent(money, num) {
    /*
      * 参数说明：
      * money：要格式化的数字
      * */
    //      num = num > 0 && num <= 20 ? num : 2;
    money = parseFloat(money + '') + '%';
    return money;
  },

  // 表格格式化单元格使用
  'dateFormatter': function dateFormatter(row, column, time) {
    var format;
    if (column.ctype === 'timeselect' || column.ctype === 'timepicker') {
      format = '{h}:{i}:{s}';
    } else {
      format = '{y}-{m}-{d}';
    }
    var date;
    if (!time || time === '') {
      return time;
    }
    if ((typeof time === 'undefined' ? 'undefined' : _typeof(time)) === 'object') {
      date = time;
    } else if (typeof time === 'string') {
      return time;
    } else {
      if (('' + time).length === 10) {
        time = parseInt(time, 10) * 1000;
      }
      date = new Date(time);
    }
    var formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
      var value = formatObj[key];
      if (key === 'a') {
        return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }
      return value || 0;
    });
    return time_str;
  },

  // 表格格式化单元格使用
  'keytoValue': function keytoValue(row, column, val) {
    var arr = [].concat(val);
    var returnValue = '';
    if (column.dataCode) {
      var value = Object(_util__WEBPACK_IMPORTED_MODULE_0__[/* getValueByPath */ "a"])(row, column.property) || val;
      if (value instanceof Array) {
        value = yufp.lookup.convertMultiKey(column.dataCode, value.join(','));
      } else if (typeof value === 'string' && value.indexOf(column.separator) > -1) {
        value = yufp.lookup.convertMultiKey(column.dataCode, value, column.separator);
      } else {
        value = yufp.lookup.convertKey(column.dataCode, value);
      }
      if (column.attrs['allow-create'] !== false && value === '') {
        return val;
      } else {
        return value;
      }
    } else if (column.options) {
      var options = column.options;
      for (var i = 0, l = options.length; i < l; i++) {
        for (var j = 0, lh = arr.length; j < lh; j++) {
          // 当有设置props时也进行转换 liujie1 20191028
          if (column.props && options[i][column.props.key] === arr[j]) {
            returnValue = returnValue + options[i][column.props.value] + '，';
          } else if (options[i].key === arr[j]) {
            returnValue = returnValue + options[i].value + '，';
          }
        }
      }
      if (column.attrs['allow-create'] !== false && returnValue === '') {
        return val;
      } else {
        return returnValue.slice(0, -1);
      }
    } else {
      return val;
    }
  }
};

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export noop */
/* unused harmony export hasOwn */
/* unused harmony export isObject */
/* unused harmony export toObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getValueByPath; });
/* unused harmony export array2tree */
/* unused harmony export transformTozTreeFormat */
/* unused harmony export obj2str */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return str2obj; });
/* unused harmony export arrayFindIndex */
/* unused harmony export arrayFind */
/* unused harmony export looseEqual */
/* unused harmony export numberFormatter */
/* unused harmony export rafThrottle */
/* unused harmony export coerceTruthyValueToArray */
/* unused harmony export kebabCase */
/* unused harmony export autoprefixer */
/* unused harmony export arrayEquals */
/* unused harmony export capitalize */
/* unused harmony export generateId */
/* unused harmony export isEmpty */
/* unused harmony export isEqual */
/* unused harmony export valueEquals */
/* unused harmony export getRandomID */
/* harmony import */ var _src_utils_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var _src_utils_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_utils_types__WEBPACK_IMPORTED_MODULE_0__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


var hasOwnProperty = Object.prototype.hasOwnProperty;

function noop() {};

/**
 * 有无自身属性
 * @param {*} obj 待检查对象
 * @param {*} key 待检查key
 */
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};
/**
 * 快速对象检查-主要用于当我们知道原始值是符合JSON的类型。
 * @param {*} obj 检查值
 * @returns {Boolean}
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}
/**
 * private
 * 浅复制,没有export，请不要在外部使用
 * @param {*} to 目标对象
 * @param {*} _from 源对象
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
};

/**
 * 将数组对象转换为对象
 * @param {*} arr 待转换数组
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

/**
 * 从指定对象获取指定路径的值
 * @param {*} object 对象
 * @param {*} prop 路径
 */
var getValueByPath = function getValueByPath(object, prop) {
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = null;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

/**
 * 数组转换为树结构
 * @param {*} obj object
 * data: '数组数据',
 * id: 'id字段名',
 * pid: '父id字段名',
 * label: '文本字段名',
 * root: '根id值/或根对象'
 */
var array2tree = function array2tree(obj) {
  var data = obj.data;
  var idField = obj.id;
  var pidField = obj.pid;
  var labelField = obj.label;
  var root = {};
  var iconStr = obj.icon;
  data.forEach(function (node) {
    if (node[iconStr]) {
      node.icon = node[iconStr];
    }
  });
  if (_typeof(obj.root) === 'object') {
    root = obj.root;
  } else {
    var tempObj = {};
    tempObj[idField] = obj.root;
    root = tempObj;
  }
  var children = [];
  var rId = '' + root[idField];
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    if (rId === '' + d[idField]) {
      root = d;
    } else if (rId === '' + d[pidField]) {
      children.push(d);
    }
  }
  // root.id = root[idField];
  root.label = root[labelField];
  root.children = children;
  for (var j = 0; j < root.children.length; j++) {
    root.children[j] = array2tree({
      data: data,
      id: idField,
      pid: pidField,
      label: labelField,
      root: root.children[j]
    });
  }
  return root;
};

var nodeChildren = function nodeChildren(setting, node, newChildren) {
  if (!node) {
    return null;
  }
  // var key = 'children' || setting.children;
  var key = 'children';
  if (typeof newChildren !== 'undefined') {
    node[key] = newChildren;
  }
  return node[key];
};

var transformTozTreeFormat = function transformTozTreeFormat(setting, sNodes) {
  var i;
  var l;
  var key = setting.id;
  var parentKey = setting.pid;
  if (!key || key === '' || !sNodes) return [];

  if (Array.isArray(sNodes)) {
    var r = [];
    var tmpMap = {};
    for (i = 0, l = sNodes.length; i < l; i++) {
      sNodes[i].label = sNodes[i][setting.label];
      sNodes[i].id = sNodes[i][setting.id];
      sNodes[i].pid = sNodes[i][setting.pid];
      tmpMap[sNodes[i][key]] = sNodes[i];
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      var p = tmpMap[sNodes[i][parentKey]];
      if (p && sNodes[i][key] !== sNodes[i][parentKey]) {
        var children = nodeChildren(setting, p);
        if (!children) {
          children = nodeChildren(setting, p, []);
        }
        children.push(sNodes[i]);
      } else {
        r.push(sNodes[i]);
      }
    }
    return r;
  } else {
    return [sNodes];
  }
};

/**
 * private
 * 对象转字符串，支持function转源码
 */
var obj2str = function obj2str(obj) {
  var str = JSON.stringify(obj, function (k, v) {
    if (typeof v === 'function') {
      return v.toString();
    }
    return v;
  });
  return str.replace(/\\n\s+/g, '\\n ');
};
/**
 * private
 * 字符串转对象，支持源码转function
 */
var str2obj = function str2obj(str) {
  if (str.indexOf && str.indexOf('function') > -1) {
    return eval('(function(){return ' + str + ' })()');
  } else {
    return eval(str);
  }
};
var arrayFindIndex = function arrayFindIndex(arr, pred) {
  for (var i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
};

var arrayFind = function arrayFind(arr, pred) {
  var idx = arrayFindIndex(arr, pred);
  return idx !== -1 ? arr[idx] : undefined;
};
/**
 * 检查两个值是否松散相等-即，如果它们是普通对象，是否有相同的属性值
 * @param {*} a 比较值a
 * @param {*} b 比较值b
 */
function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
};
/**
 * Formats the number according to the format string.
 * examples (123456.789):
 * 0 - (123456) show only digits, no precision<br>
 * 0.00 - (123456.78) show only digits, 2 precision<br>
 * 0.0000 - (123456.7890) show only digits, 4 precision<br>
 * 0,000 - (123,456) show comma and digits, no precision<br>
 * 0,000.00 - (123,456.78) show comma and digits, 2 precision<br>
 * 0,0.00 - (123,456.78) shortcut method, show comma and digits, 2 precision<br>
 * To reverse the grouping (,) and decimal (.) for international numbers, add /i to the end.
 * For example: 0.000,00/i
 * @param {Number} v The number to format.
 * @param {String} format The way you would like to format this text.
 * @return {String} The formatted number.
 */
function numberFormatter(v, format) {
  if (!format) {
    return v;
  }
  if (isNaN(v)) {
    return '';
  }
  var comma = ',';
  var dec = '.';
  var i18n = false;
  var neg = v < 0;

  v = Math.abs(v);
  if (format.substr(format.length - 2) === '/i') {
    format = format.substr(0, format.length - 2);
    i18n = true;
    comma = '.';
    dec = ',';
  }

  var hasComma = format.indexOf(comma) !== -1;
  var psplit = (i18n ? format.replace(/[^\d,]/g, '') : format.replace(/[^\d.]/g, '')).split(dec);

  if (psplit.length > 1) {
    v = v.toFixed(psplit[1].length);
  } else if (psplit.length > 2) {
    throw new Error('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
  } else {
    v = v.toFixed(0);
  }

  var fnum = v.toString();

  psplit = fnum.split('.');

  if (hasComma) {
    var cnum = psplit[0];
    var parr = [];
    var j = cnum.length;
    var m = Math.floor(j / 3);
    var n = cnum.length % 3 || 3;
    var i = void 0;

    for (i = 0; i < j; i += n) {
      if (i !== 0) {
        n = 3;
      }
      parr[parr.length] = cnum.substr(i, n);
      m = m - 1;
    }
    fnum = parr.join(comma);
    if (psplit[1]) {
      fnum += dec + psplit[1];
    }
  } else {
    if (psplit[1]) {
      fnum = psplit[0] + dec + psplit[1];
    }
  }

  return (neg ? '-' : '') + format.replace(/[\d,?.?]+/, fnum);
};

function rafThrottle(fn) {
  var locked = false;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (locked) return;
    locked = true;
    window.requestAnimationFrame(function (_) {
      fn.apply(_this, args);
      locked = false;
    });
  };
}

// coerce truthy value to array
var coerceTruthyValueToArray = function coerceTruthyValueToArray(val) {
  if (Array.isArray(val)) {
    return val;
  } else if (val) {
    return [val];
  } else {
    return [];
  }
};

var kebabCase = function kebabCase(str) {
  var hyphenateRE = /([^-])([A-Z])/g;
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
};

var autoprefixer = function autoprefixer(style) {
  if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) !== 'object') return style;
  var rules = ['transform', 'transition', 'animation'];
  var prefixes = ['ms-', 'webkit-'];
  rules.forEach(function (rule) {
    var value = style[rule];
    if (rule && value) {
      prefixes.forEach(function (prefix) {
        style[prefix + rule] = value;
      });
    }
  });
  return style;
};

var arrayEquals = function arrayEquals(arrayA, arrayB) {
  arrayA = arrayA || [];
  arrayB = arrayB || [];

  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (var i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false;
    }
  }

  return true;
};

var capitalize = function capitalize(str) {
  if (!Object(_src_utils_types__WEBPACK_IMPORTED_MODULE_0__["isString"])(str)) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var generateId = function generateId() {
  return Math.floor(Math.random() * 10000);
};

var isEmpty = function isEmpty(val) {
  // null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]':
      {
        return !val.size;
      }
    // Plain Object
    case '[object Object]':
      {
        return !Object.keys(val).length;
      }
  }

  return false;
};

var isEqual = function isEqual(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2);
  }
  return looseEqual(value1, value2);
};

var valueEquals = function valueEquals(a, b) {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
/**
 * 生成随机数
 * @param {Number} len 生成随机长度
 */
var getRandomID = function getRandomID(len) {
  return Number(Math.random().toString().substr(3, len) + Date.now()).toString(36);
};

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/xdialog/src/component.vue?vue&type=template&id=5546ab6f&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "dialog-fade" },
      on: { "after-enter": _vm.afterEnter, "after-leave": _vm.afterLeave }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "drag",
              rawName: "v-drag",
              value: _vm.draggable,
              expression: "draggable"
            },
            {
              name: "resize",
              rawName: "v-resize",
              value: _vm.resizeable,
              expression: "resizeable"
            },
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "el-dialog-x__wrapper",
          on: {
            click: function($event) {
              if ($event.target !== $event.currentTarget) {
                return null
              }
              return _vm.handleWrapperClick($event)
            }
          }
        },
        [
          _c(
            "div",
            {
              key: _vm.key,
              ref: "dialog",
              staticClass: "el-dialog-x",
              class: [_vm.sizeClass, _vm.customClass],
              style: _vm.styleRoot
            },
            [
              _c(
                "div",
                { ref: "header", staticClass: "el-dialog-x__header" },
                [
                  _vm._t("title", [
                    _c("span", { staticClass: "el-dialog-x__title" }, [
                      _vm._v(_vm._s(_vm.title))
                    ])
                  ]),
                  _vm.showClose
                    ? _c(
                        "button",
                        {
                          staticClass: "el-dialog-x__headerbtn",
                          attrs: { type: "button", "aria-label": "Close" },
                          on: { click: _vm.handleClose }
                        },
                        [
                          _c("i", {
                            staticClass:
                              "el-dialog-x__close el-icon el-icon-close"
                          })
                        ]
                      )
                    : _vm._e(),
                  _vm._l(_vm.headerCustomBtns, function(item, index) {
                    return _c(
                      "button",
                      {
                        key: index,
                        class: item.btnClass,
                        attrs: { type: "button", "aria-label": item.btnClass },
                        on: {
                          click: function($event) {
                            return item.click($event)
                          }
                        }
                      },
                      [_c("i", { class: item.iClass })]
                    )
                  })
                ],
                2
              ),
              _vm.rendered
                ? _c(
                    "div",
                    { staticClass: "el-dialog-x__body", style: _vm.styleBody },
                    [_vm._t("default")],
                    2
                  )
                : _vm._e(),
              _vm.$slots.footer || _vm.needBar
                ? _c(
                    "div",
                    { ref: "footer", staticClass: "el-dialog-x__footer" },
                    [
                      _vm.needBar
                        ? _c(
                            "el-button",
                            {
                              attrs: { type: "primary", icon: "check" },
                              on: { click: _vm.sureFn }
                            },
                            [_vm._v(_vm._s(_vm.sureText))]
                          )
                        : _vm._e(),
                      _vm.needBar
                        ? _c(
                            "el-button",
                            {
                              attrs: { type: "primary", icon: "yx-undo2" },
                              on: { click: _vm.handleClose }
                            },
                            [_vm._v(_vm._s(_vm.cancelText))]
                          )
                        : _vm._e(),
                      _vm._t("footer")
                    ],
                    2
                  )
                : _vm._e()
            ]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/xdialog/src/component.vue?vue&type=template&id=5546ab6f&

// EXTERNAL MODULE: external "@/lib/utils/popup"
var popup_ = __webpack_require__(27);
var popup_default = /*#__PURE__*/__webpack_require__.n(popup_);

// EXTERNAL MODULE: external "@/lib/mixins/emitter"
var emitter_ = __webpack_require__(5);
var emitter_default = /*#__PURE__*/__webpack_require__.n(emitter_);

// CONCATENATED MODULE: ./packages/xdialog/src/directive.js
/* harmony default export */ var directive = ({
  bind: function bind(el, binding, vnode, oldVnode) {
    if (!binding.value) {
      return;
    }
    var headerEl = el.querySelector('.el-dialog-x__header');
    var dragEl = el.querySelector('.el-dialog-x');
    headerEl.style.cursor = 'move';
    vnode.context.initDragLeft = dragEl.style.left + '';
    vnode.context.initDragTop = dragEl.style.top + '';
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    var currStyle = dragEl.currentStyle || window.getComputedStyle(dragEl, null);
    headerEl.onmousedown = function (e) {
      // 鼠标按下，计算当前元素距离可视区的距离
      dragEl.className += ' el-dialog-x--move';
      var disX = e.clientX - headerEl.offsetLeft;
      var disY = e.clientY - headerEl.offsetTop;

      // 获取到的值带px 正则匹配替换
      var styL = void 0,
          styT = void 0,
          minL = void 0,
          maxL = void 0,
          minT = void 0,
          maxT = void 0,
          marginL = void 0;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (currStyle.left.indexOf('%') > -1) {
        styL = +document.body.clientWidth * (+currStyle.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+currStyle.top.replace(/\%/g, '') / 100);
      } else {
        styL = +currStyle.left.replace(/\px/g, '');
        styT = +currStyle.top.replace(/\px/g, '');
      };
      marginL = Math.abs(currStyle.marginLeft.replace(/\px/g, ''));
      // 边距10px
      var mg = 10;
      minL = marginL + mg;
      minT = mg;
      maxL = document.body.clientWidth - dragEl.clientWidth - mg + marginL;
      maxT = document.body.clientHeight - dragEl.clientHeight - mg;
      document.onmousemove = function (e) {
        // 移动时禁止文本选中
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 通过事件委托，计算移动的距离
        var l = e.clientX - disX + styL;
        var t = e.clientY - disY + styT;
        // window.console.log('3:' + l + ':' + t);
        // window.console.log('4:' + disX + ':' + disY);
        // 移动当前元素
        if (l >= minL && l <= maxL) {
          dragEl.style.left = l + 'px';
        }
        if (t >= minT && t <= maxT) {
          dragEl.style.top = t + 'px';
        }
        vnode.context.updatePopper();
        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      };

      document.onmouseup = function (e) {
        dragEl.className = dragEl.className.replace(' el-dialog-x--move', '');
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});
// CONCATENATED MODULE: ./packages/xdialog/src/directive2.js
/* harmony default export */ var directive2 = ({
  bind: function bind(el, binding, vnode, oldVnode) {
    if (!binding.value) {
      return;
    }
    var resizeEl = el.querySelector('.el-dialog-x');
    // 设置与上边框2个像素的边距，避免弹出框标题可拖拽时的影响
    var headerEl = el.querySelector('.el-dialog-x__header');
    headerEl.style.marginTop = '2px';
    headerEl.style.marginRight = '2px';
    headerEl.style.marginLeft = '2px';
    // 默认属性
    var defaultOptions = {
      minHeight: vnode.context.minHeight, // 判断窗口最小高度
      minWidth: vnode.context.minWidth, // 判断窗口最小宽度
      edge: 5, // 鼠标与边框距离多少时出现调整指针
      maxWidth: document.body.clientWidth,
      maxHeight: document.body.clientHeight,
      mg: 10
    };
    vnode.context.initResizing = false; // 是否处于拉伸调整中
    vnode.context.resizeAviliable = false; // 鼠标指针是否处于边框位置允许可调整
    // 弹出框-鼠标移动事件
    function handleMouseMove(event) {
      var target = resizeEl;
      if (!target) {
        return;
      }
      if (!vnode.context.initResizing) {
        var rect = target.getBoundingClientRect();
        var bodyStyle = document.body.style;
        var scrollTop = window.scrollTop ? window.scrollTop : window.pageYOffset;
        // 判断鼠标所在方位
        if (Math.abs(rect.right - event.pageX) < defaultOptions.edge) {
          bodyStyle.cursor = 'col-resize';
          target.style.cursor = 'col-resize';
          vnode.context.dir = 'e';
          vnode.context.resizeAviliable = true;
        } else if (Math.abs(rect.left - event.pageX) < defaultOptions.edge) {
          bodyStyle.cursor = 'col-resize';
          target.style.cursor = 'col-resize';
          vnode.context.dir = 'w';
          vnode.context.resizeAviliable = true;
        } else if (Math.abs(rect.top - (event.pageY - scrollTop)) < defaultOptions.edge) {
          bodyStyle.cursor = 'row-resize';
          target.style.cursor = 'row-resize';
          vnode.context.dir = 'n';
          vnode.context.resizeAviliable = true;
        } else if (Math.abs(rect.bottom - (event.pageY - scrollTop)) < defaultOptions.edge) {
          bodyStyle.cursor = 'row-resize';
          target.style.cursor = 'row-resize';
          vnode.context.dir = 's';
          vnode.context.resizeAviliable = true;
        } else {
          bodyStyle.cursor = '';
          target.style.cursor = '';
          vnode.context.dir = '';
          vnode.context.resizeAviliable = false;
        }
      }
    };
    // 弹出框-鼠标点击【按下】事件
    function handleMouseDown(event) {
      if (!vnode.context.resizeAviliable) {
        return;
      }
      // 重新获取窗口最小尺寸，以支持最小尺寸的动态修改
      defaultOptions.minHeight = vnode.context.minHeight;
      defaultOptions.minWidth = vnode.context.minWidth;
      vnode.context.initResizing = true;
      // 初始值
      var currStyle = resizeEl.currentStyle || window.getComputedStyle(resizeEl, null);
      var resizeElStyle = resizeEl.getBoundingClientRect();
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      var startLeft, startTop;
      if (currStyle.left.indexOf('%') > -1) {
        startLeft = +document.body.clientWidth * (+currStyle.left.replace(/\%/g, '') / 100);
        startTop = +document.body.clientHeight * (+currStyle.top.replace(/\%/g, '') / 100);
      } else {
        startLeft = +currStyle.left.replace(/\px/g, '');
        startTop = +currStyle.top.replace(/\px/g, '');
      };
      var startPositons = {
        pageX: event.pageX,
        pageY: event.pageY,
        left: startLeft,
        top: startTop,
        width: resizeElStyle.width,
        height: resizeElStyle.height
      };
      // 文档-鼠标移动事件
      var handleDocMouseMove = function handleDocMouseMove(event) {
        var target = resizeEl;
        if (!target) {
          return;
        };
        // 与浏览器可视窗口距离defaultOptions.mg以下时不再允许放大
        if (event.clientX < defaultOptions.mg || event.clientY < defaultOptions.mg || event.clientX > defaultOptions.maxWidth - defaultOptions.mg || event.clientY > defaultOptions.maxHeight - defaultOptions.mg) {
          return;
        }
        // 移动时禁止文本选中
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

        var deltaX = event.pageX - startPositons.pageX; // X方向变化
        var deltaY = event.pageY - startPositons.pageY; // Y方向变化
        // 根据初始与当前位置调整弹出框
        if (vnode.context.dir === 'e') {
          var _width = startPositons.width + deltaX;
          _width = Math.min(Math.max(_width, defaultOptions.minWidth), defaultOptions.maxWidth - 2 * defaultOptions.mg);
          resizeEl.style.width = _width + 'px';
        }
        if (vnode.context.dir === 'w') {
          var _width2 = startPositons.width - deltaX;
          if (_width2 >= defaultOptions.minWidth && _width2 <= defaultOptions.maxWidth) {
            resizeEl.style.width = _width2 + 'px';
            resizeEl.style.left = startPositons.left + deltaX + 'px';
          }
        }
        if (vnode.context.dir === 's') {
          var _height = startPositons.height + deltaY;
          _height = Math.min(Math.max(_height, defaultOptions.minHeight), defaultOptions.maxHeight - 2 * defaultOptions.mg);
          resizeEl.style.height = _height + 'px';
          if (resizeEl.querySelector('.el-dialog-x__footer')) {
            resizeEl.querySelector('.el-dialog-x__body').style.height = _height - 131 + 'px';
          } else {
            resizeEl.querySelector('.el-dialog-x__body').style.height = _height - 70 + 'px';
          }
        }
        if (vnode.context.dir === 'n') {
          var _height2 = startPositons.height - deltaY;
          if (_height2 >= defaultOptions.minHeight && _height2 <= defaultOptions.maxHeight) {
            resizeEl.style.height = _height2 + 'px';
            if (resizeEl.querySelector('.el-dialog-x__footer')) {
              resizeEl.querySelector('.el-dialog-x__body').style.height = _height2 - 131 + 'px';
            } else {
              resizeEl.querySelector('.el-dialog-x__body').style.height = _height2 - 70 + 'px';
            }
            resizeEl.style.top = startPositons.top + deltaY + 'px';
          }
        }
      };
      // 文档-鼠标点击【弹起】事件
      var handleDocMouseUp = function handleDocMouseUp(e) {
        if (vnode.context.initResizing) {
          document.body.style.cursor = '';
          vnode.context.dir = '';
          vnode.context.initResizing = false;
          // table.resizeProxyVisible = false;
        }
        // 文档-解绑事件
        document.removeEventListener('mousemove', handleDocMouseMove);
        document.removeEventListener('mouseup', handleDocMouseUp);
      };
      // 文档-绑定事件
      document.addEventListener('mousemove', handleDocMouseMove);
      document.addEventListener('mouseup', handleDocMouseUp);
    }
    // 弹出框-鼠标移出事件
    function handleMouseOut(event) {
      document.body.style.cursor = '';
    }
    // 弹出框-绑定事件
    resizeEl.addEventListener('mousemove', handleMouseMove);
    resizeEl.addEventListener('mousedown', handleMouseDown);
    resizeEl.addEventListener('mouseout', handleMouseOut);
  }
});
// EXTERNAL MODULE: external "@/lib/locale"
var locale_ = __webpack_require__(6);

// EXTERNAL MODULE: ./src/utils/event-bus.js
var event_bus = __webpack_require__(48);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xdialog/src/component.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






// 弹出框内，若包含使用popver的组件，例如：下拉框，日期框，下拉树等。使用event-bus传递事件，拖动时更新位置。event-bus非特殊情况，误乱用。


/* harmony default export */ var componentvue_type_script_lang_js_ = ({
  name: 'ElDialogX',
  xtype: 'YuXdialog',

  mixins: [popup_default.a, emitter_default.a],

  directives: {
    drag: directive,
    resize: directive2
  },
  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: false
    },

    closeOnPressEscape: {
      type: Boolean,
      default: false
    },

    showClose: {
      type: Boolean,
      default: true
    },

    size: {
      type: String,
      default: 'small'
    },

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15%'
    },

    beforeClose: Function,

    width: String,
    height: String,
    needBar: Boolean,
    sureFn: {
      type: Function,
      default: function _default() {}
    },
    cancelText: {
      type: String,
      default: function _default() {
        return Object(locale_["t"])('el.xdialog.cancelText');
      }
    },
    sureText: {
      type: String,
      default: function _default() {
        return Object(locale_["t"])('el.xdialog.sureText');
      }
    },
    draggable: {
      type: Boolean,
      default: true
    },
    resizeable: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: Number,
      default: 200
    },
    minWidth: {
      type: Number,
      default: 300
    },
    center: {
      type: Boolean,
      default: false
    },
    // 默认关闭弹框时，销毁子组件实例
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    // 弹出框是否垂直居中
    middle: {
      type: Boolean,
      default: true
    },
    headerCustomBtns: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      key: 0,
      adjustHeight: 0
    };
  },


  watch: {
    visible: function visible(val) {
      var _this2 = this;

      this.$emit('update:visible', val);
      if (val) {
        this.showDialog();
      } else {
        this.adjustHeight = 0;
        if (this.draggable) {
          this.$el.style.position = '';
          var dragEl = this.$refs.dialog;
          dragEl.style.left = this.initDragLeft;
          dragEl.style.top = this.initDragTop;
        }
        this.$el.removeEventListener('scroll', this.updatePopper);
        this.$emit('close');
        if (this.appendToBody && this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el);
        }
        if (this.destroyOnClose) {
          this.$nextTick(function () {
            _this2.key++;
          });
        }
      }
    }
  },

  computed: {
    sizeClass: function sizeClass() {
      return 'el-dialog-x--' + this.size;
    },
    styleRoot: function styleRoot() {
      return this.size === 'full' ? { position: 'static' } : this.width ? { width: this.width, 'top': this.top } : { 'top': this.top };
    },
    styleBody: function styleBody() {
      return this.size === 'full' || !this.height ? this.adjustHeight ? { height: this.adjustHeight + 'px', overflow: 'hidden', overflowY: 'auto' } : {} : { height: this.height, overflow: 'hidden', overflowY: 'auto' };
    }
  },

  methods: {
    showDialog: function showDialog() {
      var _this3 = this;

      var _this = this;
      this.$emit('open');
      this.$el.addEventListener('scroll', this.updatePopper);
      this.$nextTick(function () {
        var ml = -_this3.$refs.dialog.clientWidth / 2 + 'px';
        if (_this3.size !== 'full') {
          _this3.$refs.dialog.style.marginLeft = ml;
        }
        _this3.$refs.dialog.scrollTop = 0;
        if (_this3.draggable) {
          _this3.$el.style.position = '';
        }
        if (_this3.middle) {
          setTimeout(function () {
            var height = document.body.clientHeight;
            var adjust = _this.$refs.dialog.clientHeight;
            var headerHeight = _this.$refs.header.clientHeight;
            var footerHeight = _this.$refs.footer ? _this.$refs.footer.clientHeight : 0;
            if (adjust > height || height - adjust < 48) {
              // _this.adjustHeight = height - headerHeight - footerHeight - 20;
              // _this.$refs.dialog.style.top = '10px';
              _this.adjustHeight = height - headerHeight - footerHeight - 48;
              _this.$refs.dialog.style.top = '48px';
            } else {
              var top = height / 2 - adjust / 2;
              _this.$refs.dialog.style.top = top + 'px';
              _this.adjustHeight = 0;
            }
          }, 0);
        }
      });
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    },
    handleWrapperClick: function handleWrapperClick() {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose: function handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide: function hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('visible-change', false);
      }
    },
    updatePopper: function updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper');
      this.broadcast('ElDropdownMenu', 'updatePopper');
      event_bus["a" /* EventBus */].$emit('updatePopper');
    },
    afterEnter: function afterEnter() {
      this.$emit('opened');
    },
    afterLeave: function afterLeave() {
      this.$emit('closed');
    }
  },

  mounted: function mounted() {
    if (this.visible) {
      this.open();
      this.rendered = true;
      this.showDialog();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.removeEventListener('scroll', this.updatePopper);
  },
  destroyed: function destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
});
// CONCATENATED MODULE: ./packages/xdialog/src/component.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_componentvue_type_script_lang_js_ = (componentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xdialog/src/component.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_componentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/xdialog/src/component.vue"
/* harmony default export */ var src_component = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/button/src/button.vue?vue&type=template&id=ca859fb4&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      staticClass: "el-button",
      class: [
        _vm.type ? "el-button--" + _vm.type : "",
        _vm.size ? "el-button--" + _vm.size : "",
        {
          "is-disabled": _vm.varDisabled,
          "is-loading": _vm.varLoading,
          "is-plain": _vm.plain,
          "is-round": _vm.round,
          "is-circle": _vm.circle,
          "is-disabled-mask": _vm.disabledMask
        }
      ],
      attrs: {
        disabled: _vm.varDisabled,
        autofocus: _vm.autofocus,
        type: _vm.nativeType
      },
      on: { click: _vm.handleClick }
    },
    [
      _vm.varLoading
        ? _c("i", {
            staticClass: "el-icon-loading",
            on: { click: _vm.handleInnerClick }
          })
        : _vm._e(),
      _vm.icon && !_vm.varLoading
        ? _c("i", { class: _vm.realicon, on: { click: _vm.handleInnerClick } })
        : _vm._e(),
      _vm.$slots.default
        ? _c(
            "span",
            { on: { click: _vm.handleInnerClick } },
            [_vm._t("default")],
            2
          )
        : _vm._e(),
      _vm.disabledMask
        ? _c("div", {
            staticClass: "el-button-mask",
            staticStyle: {
              position: "absolute",
              top: "0px",
              bottom: "0px",
              left: "0px",
              right: "0px"
            },
            on: {
              click: [
                function($event) {
                  if (!$event.altKey) {
                    return null
                  }
                  return _vm.maskAltClickfn($event)
                },
                _vm.maskClick
              ]
            }
          })
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/button/src/button.vue?vue&type=template&id=ca859fb4&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/button/src/button.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var buttonvue_type_script_lang_js_ = ({
  name: 'ElButton',
  xtype: 'YuButton',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    logShow: {
      type: Boolean,
      default: true
    },
    // 用于不能编辑的时候也可以操作按钮的部分点击功能
    disabledMask: Boolean
  },
  data: function data() {
    return {
      varDisabled: this.disabled,
      varLoading: this.loading
    };
  },

  watch: {
    disabled: function disabled(val) {
      this.varDisabled = val;
    },
    loading: function loading(val) {
      this.varLoading = val;
    }
  },
  methods: {
    handleClick: function handleClick(evt) {
      if (this.logShow === true && this.buttonLogs) {
        this.buttonLogs(this);
      }
      this.$emit('click', evt);
    },
    handleInnerClick: function handleInnerClick(evt) {
      if (this.varDisabled) {
        evt.stopPropagation();
      }
    },

    maskAltClickfn: function maskAltClickfn(evt) {
      this.$emit('mask-altclick', evt);
    },
    maskClick: function maskClick(evt) {
      // 如果左键点击时包括alt 就不事件穿透
      if (evt.altKey === true) {
        evt.stopPropagation();
      }
    }
  },
  computed: {
    realicon: function realicon() {
      if (this.icon && (this.icon.indexOf('el-icon-') > -1 || this.icon.indexOf('yu-icon-') > -1)) {
        return this.icon;
      } else {
        return 'el-icon-' + this.icon;
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/button/src/button.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_buttonvue_type_script_lang_js_ = (buttonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/button/src/button.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_buttonvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/button/src/button.vue"
/* harmony default export */ var src_button = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventBus; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
// event-bus.js

var EventBus = new vue__WEBPACK_IMPORTED_MODULE_0___default.a();

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@/lib/mixins/emitter");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@/lib/locale");

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./packages/xdialog/src/component.vue + 6 modules
var component = __webpack_require__(44);

// EXTERNAL MODULE: ./packages/button/src/button.vue + 4 modules
var src_button = __webpack_require__(45);

// EXTERNAL MODULE: external "@/lib/mixins/locale"
var locale_ = __webpack_require__(3);
var locale_default = /*#__PURE__*/__webpack_require__.n(locale_);

// EXTERNAL MODULE: external "@/lib/locale"
var lib_locale_ = __webpack_require__(6);

// EXTERNAL MODULE: external "@/lib/utils/util"
var util_ = __webpack_require__(4);

// EXTERNAL MODULE: ./src/utils/formatter.js
var utils_formatter = __webpack_require__(40);

// CONCATENATED MODULE: ./packages/xform/src/utrace.js





/* harmony default export */ var utrace = ({
  component: {
    YuXdialog: component["a" /* default */],
    YuButton: src_button["a" /* default */]
  },
  props: {
    utrace: {
      type: [Boolean, Object],
      default: false
    },
    utraceUsrId: String, // usrId为用户ID，为与后端接口一致，不修改成userId
    utraceOrgId: String,
    utraceMenuId: String,
    utraceTitle: {
      type: String,
      default: '修改痕迹信息'
    },
    uPkValue: String,
    showByMonth: { // 是否开启按月份查询U历史痕迹
      type: Boolean,
      default: false
    },
    showUtitleMessage: { // 是否鼠标滑过小U标记显示title信息
      type: Boolean,
      default: true
    },
    traceServerName: {
      type: String,
      default: ''
    },
    traceGetInterface: {
      type: String,
      default: '/utrace/selectSModifyTrace'
    },
    traceSaveInterface: {
      type: String,
      default: '/utrace/addSModifyTrace'
    },
    traceGetListInterface: {
      type: String,
      default: '/utrace/selectSModifyTraceWithPage'
    },
    ukeyField: String
  },
  watch: {
    utrace: function utrace(val, oldval) {
      if (val !== oldval) {
        val ? this.loadUTrace() : this.clearUTrace();
      }
    }
  },
  data: function data() {
    return {
      utraceDialogVisible: false,
      utraceBaseParam: { 'mPkV': '' }
    };
  },
  destroyed: function destroyed() {
    this.$off();
  },
  created: function created() {
    var _this2 = this;

    this.$on('utrace-click', function (data, event) {
      _this2.utraceDialogVisible = !_this2.utraceDialogVisible;
      if (_this2.utraceDialogVisible) {
        _this2.utraceBaseParam['mFieldId'] = data.name;
        _this2.$nextTick(function () {
          this.showByMonth && this.$refs.refUTraceSearchForm && this.$refs.refUTraceSearchForm.resetFields(); // 清空小U月份查询
          var refTable = this.$refs.refUTraceListTable;
          var parames = { condition: JSON.stringify(this.utraceBaseParam) };
          if (refTable) {
            refTable.remoteData(parames);
          } else if (this.$slots.utrace) {
            // 对于自定义表格slot插槽对象处理
            refTable = this.$slots.utrace[0].children[0].componentInstance;
            refTable && refTable.remoteData && refTable.remoteData(parames);
          }
        });
      }
    });
  },

  methods: {
    utraceClickFn: function utraceClickFn(data, event) {
      this.$emit('utrace-click', data, event);
    },

    traceDialogClose: function traceDialogClose() {
      this.utraceDialogVisible = !this.utraceDialogVisible;
    },
    // 设置小U留痕信息
    _setUTrace: function _setUTrace(h) {
      var _this = this;
      var dialogProps = {
        props: {
          ref: 'refUTraceXFormDialog',
          visible: _this.utraceDialogVisible,
          width: '70%',
          title: _this.utraceTitle || this.t('el.form.uTraceDialogTitle'),
          'before-close': _this.traceDialogClose
        }
      };
      var buttonProps = {
        props: {
          type: 'primary'
        },
        on: {
          click: _this.traceDialogClose
        }
      };
      var elButton = h(
        src_button["a" /* default */],
        buttonProps,
        [this.t('el.form.uTraceTableDialogBtn')]
      );
      var buttonList = h(
        'div',
        { slot: 'footer', attrs: { align: 'center' }
        },
        [elButton]
      );
      var yuTable = _this.$slots.utrace || _this._getDefaultUTraceTableColumns(h);
      return h(
        component["a" /* default */],
        dialogProps,
        [yuTable, buttonList]
      );
    },
    // 小U按月搜索查询
    uFormSearch: function uFormSearch() {
      var refTable = this.$refs.refUTraceListTable;
      var params = {};
      var queryParam = JSON.parse(refTable.queryParam[refTable.conditionKey]);
      queryParam.month = this.$refs.refUTraceSearchForm.formdata.month || '';
      queryParam.mFieldId = this.utraceBaseParam['mFieldId'];
      var key = refTable.conditionKey;
      params[key] = JSON.stringify(queryParam);
      refTable.remoteData(params);
    },
    // 小U按月搜索form表单重置
    uSearchFormReset: function uSearchFormReset() {
      this.$refs.refUTraceSearchForm.resetFields(); // 清空小U月份查询
    },
    // 加载小U数据
    loadUTrace: function loadUTrace() {
      var _this = this;
      if (_this.utrace) {
        if (!_this.uPkValue) {
          console.error(this.t('el.form.uTraceNoParam'));
          return;
        }
        var ufield = [];
        var mPkV = [];
        var option = _this.uPkValue + _this.formdata[_this.ukeyField];
        mPkV.push(option || '');
        // 查询修改痕迹历史
        var params = null;
        if (mPkV.length > 0) {
          params = { condition: JSON.stringify({ mPkV: mPkV }) };
          _this.utraceBaseParam['mPkV'] = mPkV;
        };
        params && yufp.service && yufp.service.request({
          url: _this.traceServerName + _this.traceGetInterface,
          data: params,
          async: false,
          method: 'GET',
          callback: function callback(code, message, response) {
            if (response.data != null) {
              for (var i = 0; i < _this.fields.length; i++) {
                var field = _this.fields[i];
                for (var j = 0, reData = response.data; j < reData.length; j++) {
                  var mFieldId = reData[j].mFieldId;
                  if (field.name === mFieldId) {
                    if (ufield.indexOf(mFieldId) < 0) {
                      ufield.push(mFieldId);
                      field.message = reData[j].mDatetime + ':被用户' + reData[j].usrId + '从[' + reData[j].mOldDispV + ']修改为[' + reData[j].mNewDispV + ']';
                    }
                  }
                }
              }
            }
            _this.$emit('load-utrace', [code, message, response]);
          }
        });
      }
    },
    // 清除界面上的小U标记
    clearUTrace: function clearUTrace() {
      // 清空小U标记提示
      for (var i = 0; i < this.fields.length; i++) {
        this.fields[i].message = '';
      }
    },

    /**
     *  保存小U数据
     *  @param {Array} oldFormModel 旧表单数据
     *  @param forceSave 强制保存（场景：不展示小U，但是要保存小U数据）
     */
    saveUTrace: function saveUTrace(oldFormModel, forceSave) {
      if (!this.utraceUsrId && !this.utraceOrgId && !this.utraceMenuId) {
        console.error(this.t('el.form.saveUTraceFailure'));
        return;
      }
      if (this.utrace || forceSave) {
        var _this = this;
        var newForm = _this.formdata;
        var temp = [];
        for (var k = 0, fields = _this.fields; k < fields.length; k++) {
          var field = fields[k].name;
          var label = fields[k].label;
          if (!Object(util_["looseEqual"])(oldFormModel[field], newForm[field]) && fields[k].utrace !== false) {
            var option = {};
            option['usrId'] = _this.utraceUsrId;
            option['mMenuId'] = _this.utraceMenuId;
            option['mPkV'] = _this.uPkValue + newForm[_this.ukeyField];
            option['orgId'] = _this.utraceOrgId;
            option['mFieldId'] = field;
            option['mFieldNm'] = label;
            if (fields[k] && fields[k].$children[0]) {
              if (fields[k].$children[0].dataCode) {
                // 字段翻译
                if (newForm[field] instanceof Array) {
                  // 新表单数据为数组
                  option['mNewV'] = newForm[field].join(',');
                  option['mNewDispV'] = yufp.lookup.convertMultiKey(fields[k].$children[0].dataCode, newForm[field]);
                  if (oldFormModel[field] instanceof Array) {
                    // 旧表单数据为数组
                    option['mOldV'] = oldFormModel[field].join(',');
                    option['mOldDispV'] = yufp.lookup.convertMultiKey(fields[k].$children[0].dataCode, oldFormModel[field]);
                  } else {
                    option['mOldV'] = oldFormModel[field];
                    var arrayFields = oldFormModel[field].split(',');
                    option['mOldDispV'] = yufp.lookup.convertMultiKey(fields[k].$children[0].dataCode, arrayFields);
                  }
                } else {
                  option['mNewV'] = newForm[field];
                  option['mOldV'] = oldFormModel[field];
                  option['mNewDispV'] = yufp.lookup.convertKey(fields[k].$children[0].dataCode, newForm[field]);
                  option['mOldDispV'] = yufp.lookup.convertKey(fields[k].$children[0].dataCode, oldFormModel[field]);
                }
              } else if (fields[k].$children[0].options) {
                // 下拉选项翻译
                var ops = fields[k].$children[0].options;
                var formatter = utils_formatter["a" /* formatters */]['keytoValue'];
                if (newForm[field] instanceof Array) {
                  // 新表单数据为数组
                  option['mNewV'] = newForm[field].join(',');
                  option['mNewDispV'] = formatter(null, { options: ops }, newForm[field]);
                  if (oldFormModel[field] instanceof Array) {
                    // 旧表单数据为数组
                    option['mOldV'] = oldFormModel[field].join(',');
                    option['mOldDispV'] = formatter(null, { options: ops }, oldFormModel[field]);
                  } else {
                    option['mOldV'] = oldFormModel[field];
                    var _arrayFields = oldFormModel[field].split(',');
                    option['mOldDispV'] = formatter(null, { options: ops }, _arrayFields);
                  }
                } else {
                  option['mNewV'] = newForm[field];
                  option['mOldV'] = oldFormModel[field];
                  option['mNewDispV'] = formatter(null, { options: ops }, newForm[field]);
                  option['mOldDispV'] = formatter(null, { options: ops }, oldFormModel[field]);
                }
              } else {
                option['mNewDispV'] = newForm[field];
                option['mOldDispV'] = oldFormModel[field];
                option['mNewV'] = newForm[field];
                option['mOldV'] = oldFormModel[field];
              }
            } else {
              option['mNewDispV'] = newForm[field];
              option['mOldDispV'] = oldFormModel[field];
              option['mNewV'] = newForm[field];
              option['mOldV'] = oldFormModel[field];
            }
            temp.push(option);
          }
        }
        temp.length > 0 && yufp.service && yufp.service.request({
          url: _this.traceServerName + _this.traceSaveInterface,
          data: JSON.stringify(temp),
          method: 'POST',
          callback: function callback(code, message, response) {
            _this.$emit('after-save-utrace', code, message, response);
            // 重新拉取小U数据,强制保存不重新加载小U
            if (forceSave !== true) {
              _this.loadUTrace();
            }
          }
        });
        temp.length === 0 && _this.$emit('after-save-utrace', -1, '没有变更数据', null);
      } else {
        console.error(this.t('el.form.noUTrace'));
      }
    },
    // 生成默认小U跟踪字段
    _getDefaultUTraceTableColumns: function _getDefaultUTraceTableColumns(h) {
      return h('div', [this.showByMonth ? h(
        'yu-xform',
        { ref: 'refUTraceSearchForm', 'class': 'utrace-search-form', attrs: { 'related-table-name': 'refUTraceListTable', 'remove-empty': true }
        },
        [h(
          'yu-xform-group',
          {
            attrs: { column: 3 }
          },
          [h('yu-xform-item', {
            attrs: { placeholder: '\u6708\u4EFD', ctype: 'datepicker', type: 'month', name: 'month' }
          }), h(
            'div',
            { slot: 'custom', 'class': 'search-btn-group' },
            [h(
              'yu-button',
              { style: 'margin-left:10px;', attrs: { type: 'primary', icon: 'search' },
                on: {
                  'click': this.uFormSearch
                }
              },
              ['\u67E5\u8BE2']
            ), h(
              'yu-button',
              {
                attrs: { type: 'primary', icon: 'edit' },
                on: {
                  'click': this.uSearchFormReset
                }
              },
              ['\u91CD\u7F6E']
            )]
          )]
        )]
      ) : '', h(
        'yu-xtable',
        { ref: 'refUTraceListTable', attrs: { 'max-height': '300', stripe: true, 'default-sort': { prop: 'mDatetime', order: 'descending' }, 'default-load': false, 'data-url': this.traceServerName + this.traceGetListInterface }
        },
        [h('yu-xtable-column', {
          attrs: { label: this.t('el.form.uTraceTableCol1'), type: 'index', width: '55' }
        }), h('yu-xtable-column', {
          attrs: { label: this.t('el.form.uTraceTableCol2'), prop: 'mFieldNm', resizable: true }
        }), h('yu-xtable-column', {
          attrs: { label: this.t('el.form.uTraceTableCol3'), prop: 'mOldDispV', resizable: true }
        }), h('yu-xtable-column', {
          attrs: { label: this.t('el.form.uTraceTableCol4'), prop: 'mNewDispV', resizable: true }
        }), h('yu-xtable-column', {
          attrs: { label: this.t('el.form.uTraceTableCol5'), prop: 'usrId', resizable: true }
        }), h('yu-xtable-column', {
          attrs: { label: this.t('el.form.uTraceTableCol6'), prop: 'mDatetime', resizable: true, sortable: true }
        })]
      )]);
    }
  },
  mounted: function mounted() {
    if (this.utrace) {
      this.loadUTrace();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/xform/src/form.vue?vue&type=script&lang=js&
//
//
//
//
//
//







/**
 * 业务表单
 */
/* harmony default export */ var formvue_type_script_lang_js_ = ({
  name: 'YuXform',
  xtype: 'YuXform',

  componentName: 'YuXform',

  model: {
    prop: 'model',
    event: 'input'
  },
  mixins: [locale_default.a, utrace],
  component: {
    YuXdialog: component["a" /* default */],
    YuButton: src_button["a" /* default */]
  },
  provide: function provide() {
    return {
      elForm: this
    };
  },

  props: {
    hiddenDelVal: Boolean,
    moreFieldsFlag: Boolean,
    moreFieldsLength: {
      type: Number,
      default: 3
    },
    //  高级查询时配置此属性
    moreFields: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    relatedTableName: String,
    disabled: Boolean,
    dynamic: Boolean,
    mode: String,
    formType: String,
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: {
      type: String,
      default: '100px'
    },
    hiddenRule: {
      type: Boolean,
      default: false
    },
    labelSuffix: {
      type: String,
      default: '：'
    },
    inline: Boolean,
    beforeQuery: Function,
    showMessage: {
      type: Boolean,
      default: true
    },
    searchIcon: {
      type: String,
      default: 'search'
    },
    resetIcon: {
      type: String,
      default: 'edit'
    },
    removeEmpty: Boolean,
    customSearchFn: Function,
    customResetFn: Function,
    // 高级查询功能
    expandText: {
      type: String,
      default: function _default() {
        return Object(lib_locale_["t"])('el.form.expandText');
      }
    },
    collapseText: {
      type: String,
      default: function _default() {
        return Object(lib_locale_["t"])('el.form.collapseText');
      }
    },
    searchText: {
      type: String,
      default: function _default() {
        return Object(lib_locale_["t"])('el.form.search');
      }
    },
    resetText: {
      type: String,
      default: function _default() {
        return Object(lib_locale_["t"])('el.form.reset');
      }
    },
    // 是否默认展开
    expand: {
      type: Boolean,
      default: false
    },
    // 是否开启布局自适应（根据屏幕尺寸改变xform的列数）
    responsive: Boolean,
    statusIcon: Boolean,
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
    },
    size: String
  },
  watch: {
    rules: function rules() {
      // remove then add event listeners on form-item after form rules change
      this.fields.forEach(function (field) {
        field.removeValidateEvents();
        field.addValidateEvents();
      });

      if (this.validateOnRuleChange) {
        this.validate(function () {});
      }
    }
  },
  data: function data() {
    return {
      ifInit: true,
      fields: [],
      formdata: this.model,
      notice: false
    };
  },
  created: function created() {
    var _this2 = this;

    this.$on('el.form.addField', function (field) {
      if (field) {
        _this2.fields.push(field);
        if (!_this2.ifInit) {
          _this2.$nextTick(function () {
            var name = field.name;
            var type = field.ctype;
            var multiple = field.$parent.$attrs.multiple;
            if (name && name !== 'custom') {
              var aval = type === 'checkbox' || type === 'select' && multiple || multiple === '' ? [] : '';
              var value = field.$options.parent.$options.propsData.value;
              var val = value ? value : aval;
              val = type === 'num' && val !== '' ? Number(val) : val;
              this.$set(this.formdata, name, val);
            }
          });
        }
      }
    });
    this.$on('el.form.checkbox.change', function (field, val) {
      if (field) {
        _this2.formdata[field] = val;
      }
    });
    /* istanbul ignore next */
    this.$on('el.form.removeField', function (field) {
      if (field.name) {
        _this2.fields.splice(_this2.fields.indexOf(field), 1);
        delete _this2.formdata[field.name];
      }
    });
    this.$on('el.form.item.blur', function (field, value) {
      if (field) {
        _this2.formdata[field] = value;
      }
    });
    this.$on('el.form.item.click', function (name) {
      _this2.$emit('form-click', name);
    });
    this.$on('el.form.search', function (event) {
      _this2.$emit('form-search', event);
    });
    this.$on('el.form.reset', function (event) {
      _this2.$emit('form-reset', event);
    });
  },

  methods: {
    // copyObj 为浅克隆, (因数组类型数据用深克隆赋值的方式监听不到)
    setFormData: function setFormData(data) {
      this.resetFields();
      yufp.extend(this.formdata, data);
    },
    cancel: function cancel(event) {
      this.$emit('cancel', event);
    },
    save: function save(event) {
      this.$emit('cancel', event);
    },
    resetFields: function resetFields(isclear) {
      if (!this.formdata) {
         false && false;
        return;
      }
      for (var key in this.formdata) {
        var hasThisKey = false;
        this.fields.forEach(function (field) {
          field.resetField(isclear);
          if (key === field.name) {
            hasThisKey = true;
          }
        });
        if (!hasThisKey) {
          delete this.formdata[key];
        }
      }
    },
    clearValidate: function clearValidate() {
      var names = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var fields = names.length ? typeof names === 'string' ? this.fields.filter(function (field) {
        return names === field.name;
      }) : this.fields.filter(function (field) {
        return names.indexOf(field.name) > -1;
      }) : this.fields;
      fields.forEach(function (field) {
        field.clearValidate();
      });
    },
    validate: function validate(callback) {
      var _this3 = this;

      if (!this.formdata) {
        console.warn('[Element Warn][Form]model is required for validate to work!');
        return;
      }
      var valid = true;
      var count = 0;
      // let i = 0;
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true);
      }
      this.fields.forEach(function (field, index) {
        if (!_this3.hiddenRule && field.$parent && field.$parent.hidden) {
          count++;
          // 当时最后一个的时候也调用回调
          if (typeof callback === 'function' && count === _this3.fields.length) {
            callback(valid);
          }
        } else {
          field.validate('', function (errors) {
            if (errors) {
              valid = false;
            }
            if (typeof callback === 'function' && ++count === _this3.fields.length) {
              callback(valid);
            }
          });
        }
      });
    },
    validateField: function validateField(prop, cb) {
      var field = this.fields.filter(function (field) {
        return field.name === prop;
      })[0];
      if (!field) {
        throw new Error('must call validateField with valid name string!');
      }

      field.validate('', cb);
    },

    setNoticeClass: function setNoticeClass(group) {
      var noticeArr = group.filter(function (item) {
        return !!item.notice;
      });
      this.notice = noticeArr.length > 0 ? 1 : 0;
    },
    // 动态表单含折叠时调用
    // getFormGroup: function() {
    //   var formgroup = [];
    //   if (this.$children.length > 0) {
    //     let children = this.$children[0].$children;
    //     for (var i = 0, l = children.length; i < l; i++) {
    //       var childrenName = children[i].$options.componentName;
    //       while (childrenName !== 'YuXformGroup') {
    //         var child = children[i].$children[0];
    //         childrenName = child.$options.componentName;
    //       }
    //       formgroup.push(child);
    //     };
    //   }
    //   this.setNoticeClass(formgroup);
    //   return formgroup;
    // },
    // 双向绑定表单数据
    setModel: function setModel() {
      var fields = this.fields;
      this.setNoticeClass(fields);
      var data = {};
      for (var i = 0; i < fields.length; i++) {
        var name = fields[i].name;
        var type = fields[i].ctype;
        var multiple = fields[i].$parent.$attrs.multiple;
        var valueType = fields[i].$parent.valueType;
        if (name && name !== 'custom') {
          var aval = (type === 'checkbox' || type === 'select' && multiple || multiple === '') && valueType === 'array' ? [] : '';
          var value = fields[i].$options.parent.$options.propsData.value;
          var val = value !== undefined ? value : aval;
          val = type === 'num' && val !== '' ? Number(val) : val;
          data[name] = val;
        }
      }
      // }
      this.formdata = data;
      this.$emit('input', this.formdata);
      // };
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.setModel();
    this.unwatch = this.$watch('$parent.templateData', function (oldval, newval) {
      _this.setModel();
    });
  },

  destroyed: function destroyed() {
    this.unwatch();
    this.$off();
  },


  render: function render(h) {
    var _this = this;
    return h(
      'div',
      {
        'class': ['yu-xform', 'el-form', _this.labelPosition ? 'el-form--label-' + _this.labelPosition : '', _this.inline ? 'el-form--inline' : '', _this.notice ? 'yu-form-notice' : '', _this.utrace ? 'yu-form-utrace' : '', { 'el-form-search': _this.formType === 'search' }, { 'el-form-details': _this.formType === 'details' }]
      },
      [_this.$slots.default, _this.$slots.button, _this.utrace ? _this._setUTrace(h) : '']
    );
  }
});
// CONCATENATED MODULE: ./packages/xform/src/form.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_formvue_type_script_lang_js_ = (formvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/xform/src/form.vue?vue&type=style&index=0&lang=css&
var formvue_type_style_index_0_lang_css_ = __webpack_require__(93);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./packages/xform/src/form.vue
var render, staticRenderFns





/* normalize component */

var form_component = Object(componentNormalizer["a" /* default */])(
  src_formvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
form_component.options.__file = "packages/xform/src/form.vue"
/* harmony default export */ var src_form = __webpack_exports__["a"] = (form_component.exports);

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(94);

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

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)(false);
// imports


// module
exports.push([module.i, "\n.el-form-search .el-form-item {\r\n  padding-right: 10px;\n}\r\n", ""]);

// exports


/***/ })

/******/ });