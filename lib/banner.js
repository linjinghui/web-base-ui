(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ComponentBaseUI"] = factory();
	else
		root["ComponentBaseUI"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 333);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(3);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webJsTool = __webpack_require__(64);

exports.default = {
  name: 'Banner',
  data: function data() {
    return {
      id: 'banner_' + new Date().getTime() + parseInt(Math.random() * 100),
      active: -1,
      // 状态 scrolling|end
      status: 'end'
      // nav: this.nav
    };
  },
  props: {
    nav: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 导航类型 circle: 圆圈-默认， point：点
    navType: {
      default: ''
    },
    // hor: 横向， 默认纵向
    direction: {
      default: ''
    }
  },
  watch: {},
  computed: {},
  beforeDestroy: function beforeDestroy() {
    // 
  },
  mounted: function mounted() {
    var _this = this;

    this.turnPage('next');
    this.$refs.wrapScrollFullPage.addEventListener('wheel', function (e) {
      (e || window.event).stopPropagation();
      _this.turnPage(e.deltaY > 0 ? 'next' : 'prev');
    }, false);
  },
  methods: {
    // 页面切换
    turnPage: (0, _webJsTool.debounce)(function (index) {
      var _this = this;

      if (index === 'prev') {
        index = this.active - 1;
      } else if (index === 'next') {
        index = this.active + 1;
      }
      if (index < 0) {
        index = 0;
      } else if (index >= this.nav.length) {
        index = this.nav.length - 1;
      }
      this.status = 'scrolling';
      this.active = index;
      setTimeout(function () {
        _this.status = 'end';
        _this.$emit('callback', index);
      }, 800);
    }, 100, true)
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalizeComponent;
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
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    scriptExports = scriptExports.default
  }

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
    options._scopeId = scopeId
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
      // register for functioal component in vue file
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

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(334);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_main2.default.install = function (Vue) {
  Vue.component(_main2.default.name, _main2.default);
};

exports.default = _main2.default;

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_388e4200_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(2);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(335)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-388e4200"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_388e4200_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_388e4200_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "packages\\banner\\src\\main.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-388e4200", Component.options)
  } else {
    hotAPI.reload("data-v-388e4200", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(336);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(1).default
var update = add("94a54330", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-388e4200\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-388e4200\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n.wrap-banner[data-v-388e4200] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  /* 导航样式 */\n  /* 主体样式 */\n  /* 实心点 */\n}\n.wrap-banner > nav[data-v-388e4200] {\n    position: absolute;\n    top: 0;\n    right: 2%;\n    bottom: 0;\n    margin: auto;\n    width: 22px;\n    height: 100%;\n    color: #fff;\n    font-size: 18px;\n    z-index: 2;\n    text-align: center;\n    -ms-writing-mode: tb-rl;\n        writing-mode: tb-rl;\n}\n.wrap-banner > nav > a[data-v-388e4200] {\n    position: relative;\n    display: inline-block;\n    margin-bottom: 16px;\n    width: 18px;\n    height: 18px;\n    line-height: 18px;\n    border-width: 1px inherit;\n    border-style: solid;\n    border-radius: 50%;\n    white-space: nowrap;\n    cursor: pointer;\n}\n.wrap-banner > nav > a[data-v-388e4200]:hover, .wrap-banner > nav > a.active[data-v-388e4200] {\n    background-color: #fff;\n}\n.wrap-banner > nav > a[data-v-388e4200]:after {\n    content: '';\n    position: absolute;\n    top: -3px;\n    right: calc(100% + 10px);\n    transform: translate(10px, 0);\n    transition: transform .3s;\n}\n.wrap-banner > nav > a[data-v-388e4200]:hover:after, .wrap-banner > nav > a.active[data-v-388e4200]:after {\n    content: attr(data-text);\n    transform: translate(0, 0);\n    -ms-writing-mode: lr-tb;\n        writing-mode: lr-tb;\n}\n.wrap-banner > .wrap-main[data-v-388e4200] {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    transform: translateY(0%);\n    transition-property: transform;\n    transition-duration: 0.8s;\n    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    z-index: 1;\n}\n.wrap-banner > .wrap-main > .page[data-v-388e4200] {\n    position: relative;\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n.wrap-banner > nav > a.point[data-v-388e4200] {\n    width: 8px;\n    height: 8px;\n    transition-property: all;\n    transition-duration: 0.3s;\n    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    border-radius: 10px;\n    background-color: #fff;\n}\n.wrap-banner > nav > .point.active[data-v-388e4200] {\n    height: 22px;\n}\n/* 水平方向 */\n.wrap-banner.hor > .wrap-main[data-v-388e4200] {\n  font-size: 0;\n  transform: translateX(0%);\n  white-space: nowrap;\n  word-wrap: break-word;\n  word-break: normal;\n}\n.wrap-banner.hor > .wrap-main > .page[data-v-388e4200] {\n    display: inline-block;\n    font-size: 14px;\n}\n.wrap-banner.hor > nav[data-v-388e4200] {\n  top: unset;\n  right: 0;\n  bottom: 2%;\n  width: 100%;\n  height: 22px;\n  -ms-writing-mode: unset;\n      writing-mode: unset;\n}\n.wrap-banner.hor > nav > a[data-v-388e4200] {\n    margin-left: 16px;\n    margin-bottom: 0;\n}\n.wrap-banner.hor > nav > .point.active[data-v-388e4200] {\n    width: 22px;\n    height: 8px;\n}\n.wrap-banner.hor > nav > a[data-v-388e4200]:hover:after, .wrap-banner.hor > nav > a.active[data-v-388e4200]:after {\n    content: '';\n}\n", ""]);

// exports


/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "wrapScrollFullPage",
      staticClass: "wrap-banner",
      class: _vm.direction + " " + _vm.status
    },
    [
      _c(
        "nav",
        _vm._l(_vm.nav, function(item, index) {
          return _c("a", {
            key: "nav_a_" + index,
            class: {
              active: index === _vm.active,
              point: _vm.navType === "point"
            },
            attrs: { "data-text": item.title },
            on: {
              click: function($event) {
                return _vm.turnPage(index)
              }
            }
          })
        }),
        0
      ),
      _c(
        "div",
        {
          staticClass: "wrap-main",
          style: {
            transform:
              "translate" +
              (_vm.direction === "hor" ? "X" : "Y") +
              "(" +
              _vm.active * -100 +
              "%)"
          }
        },
        [_vm._t("page")],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-388e4200", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getUrlParamt"] = getUrlParamt;
/* harmony export (immutable) */ __webpack_exports__["dataFormat"] = dataFormat;
/* harmony export (immutable) */ __webpack_exports__["dataIntelligentFormat"] = dataIntelligentFormat;
/* harmony export (immutable) */ __webpack_exports__["strToData"] = strToData;
/* harmony export (immutable) */ __webpack_exports__["getLastDay"] = getLastDay;
/* harmony export (immutable) */ __webpack_exports__["ssgSaveData"] = ssgSaveData;
/* harmony export (immutable) */ __webpack_exports__["ssgGetData"] = ssgGetData;
/* harmony export (immutable) */ __webpack_exports__["ssgGetDataDel"] = ssgGetDataDel;
/* harmony export (immutable) */ __webpack_exports__["ssgDeleteData"] = ssgDeleteData;
/* harmony export (immutable) */ __webpack_exports__["lsgSaveData"] = lsgSaveData;
/* harmony export (immutable) */ __webpack_exports__["lsgGetData"] = lsgGetData;
/* harmony export (immutable) */ __webpack_exports__["lsgGetDataDel"] = lsgGetDataDel;
/* harmony export (immutable) */ __webpack_exports__["lsgDeleteData"] = lsgDeleteData;
/* harmony export (immutable) */ __webpack_exports__["unique"] = unique;
/* harmony export (immutable) */ __webpack_exports__["debounce"] = debounce;
/* harmony export (immutable) */ __webpack_exports__["once"] = once;
/* harmony export (immutable) */ __webpack_exports__["getAbsoluteUrl"] = getAbsoluteUrl;
/* harmony export (immutable) */ __webpack_exports__["getAbsoluteUrlByWebsite"] = getAbsoluteUrlByWebsite;
/* harmony export (immutable) */ __webpack_exports__["downloadFile"] = downloadFile;
/* harmony export (immutable) */ __webpack_exports__["downloadFileByBlob"] = downloadFileByBlob;
/* harmony export (immutable) */ __webpack_exports__["data2blob"] = data2blob;
/* harmony export (immutable) */ __webpack_exports__["browerVersion"] = browerVersion;
/* harmony export (immutable) */ __webpack_exports__["isEmail"] = isEmail;
/* harmony export (immutable) */ __webpack_exports__["isWebsite"] = isWebsite;
/* harmony export (immutable) */ __webpack_exports__["isMobilePhone"] = isMobilePhone;
/* harmony export (immutable) */ __webpack_exports__["isNumber"] = isNumber;
/* harmony export (immutable) */ __webpack_exports__["isChinese"] = isChinese;
/* harmony export (immutable) */ __webpack_exports__["checkPassword"] = checkPassword;
/* harmony export (immutable) */ __webpack_exports__["clearAllSeletion"] = clearAllSeletion;
/* harmony export (immutable) */ __webpack_exports__["selectElement"] = selectElement;
/* harmony export (immutable) */ __webpack_exports__["getRandomColor"] = getRandomColor;
/* harmony export (immutable) */ __webpack_exports__["parseFileSize"] = parseFileSize;
/* harmony export (immutable) */ __webpack_exports__["getImageSourceSize"] = getImageSourceSize;
/* harmony export (immutable) */ __webpack_exports__["removeHtmlTag"] = removeHtmlTag;
/* harmony export (immutable) */ __webpack_exports__["getFileSuffix"] = getFileSuffix;
/* harmony export (immutable) */ __webpack_exports__["guid"] = guid;
/* harmony export (immutable) */ __webpack_exports__["parseUrlStr"] = parseUrlStr;
/* harmony export (immutable) */ __webpack_exports__["formatUrl"] = formatUrl;
/* harmony export (immutable) */ __webpack_exports__["isVisible"] = isVisible;
/* harmony export (immutable) */ __webpack_exports__["isNull"] = isNull;
/* harmony export (immutable) */ __webpack_exports__["arrSwap"] = arrSwap;
/* harmony export (immutable) */ __webpack_exports__["moveArray"] = moveArray;
/* harmony export (immutable) */ __webpack_exports__["addDomChildChange"] = addDomChildChange;
/* harmony export (immutable) */ __webpack_exports__["isEmpty"] = isEmpty;

/**
* 获取地址栏参数
* @param {string} name - 参数名称
*/
function getUrlParamt (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var search = window.location.href.split('?');
  search = search && search.length > 1 ? search[1] : '';
  var r = search.match(reg);

  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/**
* 日期转换为指定格式的字符串
* @param {date} date 日期
* @param {string} fmt 日期格式 yyyy-MM-dd HH:mm:ss
*/
function dataFormat (date, fmt) {
  if (!date || (date + '' === 'Invalid Date') || !fmt) {
    return "";
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

/**
* 日期智能转换为字符串
* @param {date} date 日期
*/
function dataIntelligentFormat (date) {
  var year = date.getFullYear(),
  month = date.getMonth() + 1,
  day = date.getDate(),
  hours = date.getHours(),
  minutes = date.getMinutes(),
  seconds = date.getSeconds();
  var curYear = new Date().getFullYear(),
  curMonth = new Date().getMonth() + 1,
  curDay = new Date().getDate();
  var dateStr = '';

  if (year === curYear && month === curMonth && day === curDay) {
    dateStr = '';
  } else if (year === curYear && month === curMonth && curDay-day === 1) {
    dateStr = '昨天 ';
  } else if (year === curYear && month === curMonth && curDay-day === 2) {
    dateStr = '前天 ';
  } else {
    month = month < 10 ? ('0' + month) : month;
    day = day < 10 ? ('0' + day) : day;

    dateStr = month + '-' + day + ' ';
    if (year !== curYear) {
      dateStr = year + '-' + dateStr;
    }
  }
  hours = hours < 10 ? ('0' + hours) : hours;
  minutes = minutes < 10 ? ('0' + minutes) : minutes;
  return dateStr + hours + ':' + minutes;
}

/**
* 字符串转换成日期
* @param {string} strDate 字符串日期
*/
function strToData (strDate) {
  var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
  function(a) {
    return parseInt(a, 10) - 1;
  }).match(/\d+/g) + ')');
  return date;
}

/**
* 获取最近七天
* @param {number} dayNum 最近几天，负数表示往前
* @param {string} fmt 格式化日期
*/
function getLastDay (dayNum, fmt) {
  dayNum = dayNum ? dayNum : -7;
  var today = new Date().getTime();
  var oneDay = 24* 60* 60* 1000;
  var result = [];

  for (var i = 0;i < Math.abs(dayNum);i++) {
    var day = '';

    if (dayNum > 0) {
      day = today + i* oneDay;
    } else {
      day = today - i* oneDay;
    }

    if (fmt) {
      day = this.dataFormat(new Date(day), fmt);
    }
    result[result.length] = day;
  }
  return result;
}

/**
* 保存数据到sessionStorage
* @param {string} key 键
* @param {object} data 值
*/
function ssgSaveData (key, data) {
  if (!key || !data) {
    return;
  }
  data = JSON.stringify(data);
  sessionStorage.setItem(key, data);
}

/**
* 从sessionStorage获取数据
* @param {string} key 键
*/
function ssgGetData (key) {
  if (!key) {
    return;
  }
  var data = sessionStorage.getItem(key);

  return JSON.parse(data);
}

/**
* 从sessionStorage获取数据后删除记录
* @param {string} key 键
*/
function ssgGetDataDel (key, time) {
  if (!key) {
    return;
  }
  if (!time) {
    time = 0;
  }
  var data = ssgGetData(key);

  setTimeout(function () {
    ssgDeleteData(key);
  }, time);
  return data;
}

/**
* 删除 sessionStorage 中的数据 key 为空则清空 sessionStorage
* @param {string} key 键
*/
function ssgDeleteData (key) {
  if (!key) {
    sessionStorage.clear();
  } else {
    sessionStorage.removeItem(key);
  }
}

/**
* 保存数据到localStorage, 可设置时间
* @param {string} key 键
* @param {object} data 值
* @param {int} timeOut 超时时间，毫秒
*/
function lsgSaveData (key, data, timeOut) {
  if (!key || !data) {
    return;
  }
  data = {
    value: data
  };
  if (timeOut) {
    data.time = new Date().getTime();
    data.timeOut = timeOut;
  }
  data = JSON.stringify(data);
  localStorage.setItem(key, data);
}

/**
* 从 localStorage 获取数据
* @param {string} key 键
*/
function lsgGetData (key) {
  if (!key) {
    return;
  }
  var data = JSON.parse(localStorage.getItem(key));
  if (data) {
    var time = data.time;
    var timeOut = data.timeOut;
    if (timeOut && ((new Date().getTime() - time) > timeOut)) {
      // 时长失效了
      data =  '';
      localStorage.removeItem(key);
    } else {
      data = data.value;
    }
  }
  return data;
}

/**
* 从 localStorage 获取数据后删除记录
* @param {string} key 键
*/
function lsgGetDataDel (key, time) {
  if (!key) {
    return;
  }
  if (!time) {
    time = 0;
  }
  var data = lsgGetData(key);

  setTimeout(function () {
    lsgDeleteData(key);
  }, time);
  return data;
}

/**
* 删除 localStorage 中的数据 key 为空则清空 localStorage
* @param {string} key 键
*/
function lsgDeleteData (key) {
  if (!key) {
    localStorage.clear();
  } else {
    localStorage.removeItem(key);
  }
}

/**
* 去除数组中的重复的数据
* @param {array} arr 例如 ['zhangsan' 'lisi' 'wangmazi' 'zhangsan']
*/
function unique(arr) {
  var result = [];
  var hash = {};

  for (var i = 0, elem; (elem = arr[i]) != null; i++) {
    if (!hash[elem]) {
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result;
}

/**
* 一段时间内防止高频率调用
* @param {export function} func 函数体
* @param {number} wait 时间-单位毫秒
* @param {boolean} immediate 是否立即执行-可不传，默认false
*/
function debounce (func, wait, immediate) {
  var timeout;

  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if(!immediate) {
        func.apply(context, args);
      }
    }
    var callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  }
}

/**
* 使函数只执行一次
* @param {export function} func 函数体
* @param {object} context 上下文-可不传
*/
function once (func, context) {
  var result = '';

  return function () {
    if(func) {
      result = func.apply(context || this.arguments);
      func = null;
    }
    return result;
  };
}

/**
* 获取url绝对路径
* @param {string} url 路径名 - ./index.html
*/
function getAbsoluteUrl (url) {
  var a = document.createElement('a');

  a.href = url;
  return a.href;
}

/**
* url - 指定域名地址 如：http://www.baidu.com/page/roote/
* rpath - 相对路径地址 如：../index
*/
function getAbsoluteUrlByWebsite (url, rpath) {
  var str = '';

  if (!url) {
    str = '';
  } else if (!rpath) {
    str = url;
  } else {
    // 解析url
    var spt_1 = '://';
    var spt_2 = '/';

    // 检测并去除末尾的斜杠
    if (url.lastIndexOf(spt_2) === url.length - 1) {
      url = url.substr(0, url.length - 1);
    }

    var temp = url.split(spt_1);
    var prefix = (temp.length > 1) && temp[0];
    var pcontent = temp[temp.length - 1] || '';
    var temp_2 = pcontent.split(spt_2);

    // 解析rpath
    var preLayer = 0;
    var spt_3 = '/';
    var spt_4 = './';
    var spt_5 = '../';

    if (rpath.indexOf(spt_3) === 0) {
      // 当前层级
      preLayer = 0;
      rpath = rpath.substr(1);
    } else if (rpath.indexOf(spt_4) === 0) {
      // 当前层级
      preLayer = 0;
      rpath = rpath.replace(/\.\//g, '');
    } else if (rpath.indexOf(spt_5) === 0) {
      // 最少是上一层级
      // 计算 ../ 出现的次数
      var regex = new RegExp(spt_5, 'g');
      var result = rpath.match(regex);

      preLayer = !result ? 0 : result.length;
      rpath = rpath.replace(/\.\.\//g, '');
    }
    str = temp_2.slice(0, temp_2.length - preLayer);
    str = prefix + spt_1 + str.join(spt_3) + spt_3 + rpath;
  }
  return str;
}

/**
* 下载文件
* @param {string} url 文件地址
*/
function downloadFile (url) {
  var id = 'download_frame';
  var iframe = document.getElementById(id);

  if (iframe) {
    document.body.removeChild(iframe);
  }
  iframe = document.createElement('iframe');
  iframe.id = id;
  iframe.style.display = 'none';
  iframe.src = url;
  document.body.appendChild(iframe);
}

/**
* 下载文件通过blob数据
* @param {blob} blobData 文件数据
* @param {string} fileName 文件名称
*/
function downloadFileByBlob (blobData, fileName) {
  var urlCreator = window.URL || window.webkitURL;
  var event = document.createEvent('MouseEvents');
  var link = document.createElement('a');
  var blob = new Blob([blobData]);
  var url = urlCreator.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  link.dispatchEvent(event);
}

/**
 * database64文件格式转换为2进制
 *
 * @param  {[String]} data dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
 * @param  {[String]} mime [description]
 * @return {[blob]}      [description]
 */
function data2blob (data, mime) {
	data = data.split(',')[1];
	data = window.atob(data);
  var ia = new Uint8Array(data.length);
  
	for (var i = 0;i < data.length;i++) {
		ia[i] = data.charCodeAt(i);
	}
	// canvas.toDataURL 返回的默认格式就是 image/png
	return new Blob([ia], {
		type: mime
	});
}

/**
* 判断设置类型
*/
function browerVersion () {
  var u = navigator.userAgent, app = navigator.appVersion;
  return {
    // IE内核
    trident: u.indexOf('Trident') > -1,
    // opera内核
    presto: u.indexOf('Presto') > -1,
    // 苹果、谷歌内核
    webKit: u.indexOf('AppleWebKit') > -1,
    // 火狐内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
    // 是否为移动终端
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
    // ios终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    // android终端或者uc浏览器
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    // 是否为iPhone或者QQHD浏览器
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
    // 是否iPad
    iPad: u.indexOf('iPad') > -1,
    // 是否web应该程序，没有头部与底部
    webApp: u.indexOf('Safari') == -1,
    // 加mobile和这个属性一起，可以判断uc浏览器
    linux: u.indexOf('linux') > -1,
    // trident IE内核 并且包含WP7标示 windows phone7手机
    wp7: (u.indexOf('WP7') > -1) || (u.indexOf('Windows Phone OS') > -1)
  }
}

/**
* 是否邮箱
*/
function isEmail (str) {
  var reg = "^[a-zA-Z0-9-_.*]+@[a-zA-Z0-9-_.*]+$";

  return new RegExp(reg).test(str);
}

/**
* 是否网址
*/
function isWebsite (str) {
  var reg = "^(http|https)://[\\S]+$";

  return new RegExp(reg).test(str);
}

/**
* 是否手机
*/
function isMobilePhone (str) {
  var reg = "^1[0-9]{10}$";

  return new RegExp(reg).test(str);
}

/**
* 是否纯数字
*/
function isNumber (str) {
  var reg = "^[0-9]+$";

  return new RegExp(reg).test(str);
}

/**
* 是否纯汉字
*/
function isChinese (str) {
  var reg = "^[\u4e00-\u9fa5]+$";

  return new RegExp(reg).test(str);
}

/**
* 密码校验, 最少6位，包括至少1个数字，1个大写字母，1个小写字母，1个特殊字符
*/
function checkPassword (str) {
  var reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

  return reg.test(str);
}

/**
* 清除所有选中状态
*/
function clearAllSeletion () {
  if ("getSelection" in window) {
    window.getSelection().removeAllRanges();
  } else {
    document.selection.empty();
  }
}

/**
* 选中元素文本
* target: document.getElementById('p1')
*/
function selectElement (target) {
  if (document.selection && target) {
    var range = document.body.createTextRange();

    range.moveToElementText(target);
    range.select();
  } else if (window.getSelection && target) {
    var range = document.createRange();

    range.selectNode(target);
    var selection = window.getSelection();

    selection.setAnchorNode = null;
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

/**
* 随机颜色
*/
function getRandomColor () {
  return  '#' + (function (color) {
    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*15)]) && (color.length == 6) ? color : arguments.callee(color);
  })('');
}

/**
* 容量单位转换
* size: 容量大小
* initUnit: 初始单位
* decimals: 保留小数点位数
* targetUnit: 转换后的单位 - 可不传
*/
function parseFileSize (size, initUnit, decimals, targetUnit) {
  size = parseInt(size);
  var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  var initUnitIndex = units.indexOf(initUnit);

  while (size >= 1024) {
    size = size / 1024;
    ++initUnitIndex;
    if(units[initUnitIndex]==targetUnit)break;
  }
  return (size.toFixed(decimals) + ' ' + units[initUnitIndex]);
}

/**
*获取图片原始宽高
*/
function getImageSourceSize (imgeUrl, callback) {
  if (imgeUrl) {
    var img = new Image();

    img.src = imgeUrl;
    img.onload = function () {
      callback({
        'width': img.width,
        'height': img.height
      });
    };
  }
}

/**
*去除html标签
*/
function removeHtmlTag (str) {
  //去除HTML tag
  str = str.replace(/<\/?[^>]*>/g, '');
  //去除行尾空白
  str = str.replace(/[ | ]*\n/g, '');
  //去掉尾部空格
  str = str.replace(/&nbsp;/ig, '');
  return str;
}

/**
*根据文件名称，返回后缀，不识别的后缀返回 other
*/
function getFileSuffix (fileName) {
  var result = '';

  if (fileName) {
    var suffixes = ['folder', 'txt', 'exe', 'dll', 'jpg', 'gif', 'bmp', 'png', 'rar', 'zip', 'iso', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'mp3', 'wav', 'mid', 'wmv', 'wma', 'avi', 'mpg', 'mkv', 'rmv', 'mp4', 'htm', 'html', 'pdf'];
    var suffix = (fileName.split('.').length === 1) ? 'folder' : (fileName.split('.')[fileName.split('.').length - 1]);

    suffix = suffix.toLowerCase();
    var a = suffixes.indexOf(suffix);

    if(a >= 0) {
      result = suffix;
    } else {
      result = 'other';
    }
  }
  return result;
}

/**
*生成唯一ID
*/
function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

/**
*解析类似地址栏Url格式的字符串
*/
function parseUrlStr (str) {
  str = str.split('://');
  str = str[str.length - 1];
  str = str.split('?');
  var hostname = str[0] || '';
  var search = str[1] || '';
  var query = '';
  if (search) {
    query = search.replace(/=/g, '":"').replace(/&/g, '","');
    query = '{"' + query + '"}';
    try { query = JSON.parse(query); } catch (e) { query = ''; }
  }
  return {
    hostname: hostname,
    search: search,
    query: query
  };
}

/**
*组装地址栏Url
*@paramObj - 地址栏参数对象
*/
function formatUrl (url, paramObj) {
  for (var key in paramObj) {
    var value = paramObj[key];
    var symbol = url.indexOf('?') < 0 ? '?' : '&';
    if (url.indexOf('?' + key + '=') < 0 && url.indexOf('&' + key + '=') < 0) {
      url += symbol + key + '=' + value;
    }
  }
  return url;
}

/**
*计算dom元素是否在可见范围之内
*/
function isVisible (dom, parantDom) {
  var result = '';

  if (dom && parantDom) {
    result = !(parantDom.scrollTop >= (dom.offsetTop + dom.offsetHeight) || (parantDom.scrollTop + parantDom.offsetHeight) <= (dom.offsetTop + dom.offsetHeight));
  }
  // console.log('(parantDom.scrollTop >= (dom.offsetTop + dom.offsetHeight) || (parantDom.scrollTop + parantDom.offsetHeight) <= (dom.offsetTop + dom.offsetHeight))');
  // console.log('(' + parantDom.scrollTop + '>=(' + dom.offsetTop + '+' + dom.offsetHeight + ') || (' + parantDom.scrollTop + '+' + parantDom.offsetHeight + ') <= (' + dom.offsetTop + '+' + dom.offsetHeight + '))');
  return result;
}

/**
*是否为空
*/
function isNull (data) {
  var result = data + '';
  return result === '{}' || result === '' || result === 'undefined' || result === 'null';
}

/**
* 数组中2个元素位置对调
*/
function arrSwap (arr, index1, index2) {
  return arr.splice(index1, 1, arr.splice(index2, 1, arr[index1]));
}

/**
* 数组中移动元素到指定位置
* @param {int} moveInd - 目标位置下标
* @param {int} moveToInd - 移动到指定位置下标
* @param {int} isBeforAfter - 0：前面插入、1：后面插入（默认）
*/
function moveArray (arr, moveInd, moveToInd, isBeforAfter) {
  var item = arr.splice(moveInd, 1);
  if (isBeforAfter === 0) {
      moveToInd -= 1;
  }
  arr.splice(moveToInd, 0, item[0]);
}

/**
* 监听元素子节点变化
* @param {Dom} dom - 监听的目标 - document.getElementById(this.id)
* @param {function} cbk - 回调
*/
function addDomChildChange (dom, cbk) {
  var callback = function (records) {
    records.map(function (record) {
      cbk && cbk();
    });
  };
  var mo = new MutationObserver(callback);
  var option = {
    'childList': true,
    'subtree': true
  };

  mo.observe(dom, option);
}

/**
* 判断参数是否为空， []|{}|''|null|undefined 都为空
* @param {Object} obj -  参数
*/
function isEmpty (obj) {
  var objstr = JSON.stringify(obj);
  
  return typeof obj === 'undefined' || obj === null || obj === '' || objstr === '{}';
}


/***/ })

/******/ });
});