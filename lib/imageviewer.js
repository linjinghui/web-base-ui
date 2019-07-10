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
/******/ 	return __webpack_require__(__webpack_require__.s = 269);
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

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _viewerMin = __webpack_require__(63);

var _viewerMin2 = _interopRequireDefault(_viewerMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ImageViewer',
  data: function data() {
    return {
      id: 'imageViewer_' + new Date().getTime() + parseInt(Math.random() * 100),
      // 目标元素对象
      slotDom: {}
    };
  },
  props: {
    opt: {
      default: function _default() {
        return {};
      }
    }
  },
  // 1、构造目标元素
  render: function render(createElement) {
    var dom = function (children) {
      return children && children.filter(function (c) {
        return c && c.tag;
      })[0];
    }(this.$slots.default);

    this.$nextTick(function () {
      if (dom.elm) {
        this.slotDom = { dom: dom.elm };
      }
    });
    return dom;
  },
  beforeDestroy: function beforeDestroy() {
    // 
  },
  destroyed: function destroyed() {
    // 
  },
  watch: {
    // 
  },
  mounted: function mounted() {
    this.$nextTick(function () {
      var dom = this.slotDom.dom;
      var isonlyone = dom.querySelectorAll('img').length === 0;

      this.viewer = new _viewerMin2.default(dom, Object.assign({
        inline: false,
        // 显示右上角关闭按钮（jQuery 版本无效）
        button: true,
        // 显示缩略图导航
        navbar: !isonlyone,
        // 显示当前图片的标题（现实 alt 属性及图片尺寸）
        title: !isonlyone,
        // 显示工具栏
        toolbar: true,
        // 显示缩放百分比
        tooltip: true,
        // 图片是否可移动
        movable: true,
        // 图片是否可缩放
        zoomable: true,
        // 图片是否可旋转
        rotatable: true,
        // 图片是否可翻转
        scalable: true,
        // 使用 CSS3 过度
        transition: true,
        // 播放时是否全屏
        fullscreen: true,
        // 是否支持键盘
        keyboard: true,
        // 播放间隔，单位为毫秒
        interval: 5000,
        // 鼠标滚动时的缩放比例
        zoomRatio: 0.1,
        // 最小缩放比例
        minZoomRatio: 0.01,
        // 最大缩放比例
        maxZoomRatio: 100,
        // 设置图片查看器 modal 模式时的 z-index
        zIndex: 2015,
        // 设置图片查看器 inline 模式时的 z-index
        zIndexInline: 0,
        // url 字符串/函数 src 设置大图片的 url
        build: function build() {
          // 
        },
        built: function built() {
          // 
        },
        show: function show() {
          // 
        },
        shown: function shown() {
          // 
        },
        hide: function hide() {
          // 
        },
        hidden: function hidden() {
          // 
        },
        view: function view() {
          // 
        },
        viewed: function viewed() {
          // 
        }
      }, this.opt));
    });
  },
  methods: {
    // 
  }
}; //
//
//
//
//
//
//
//

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 114:
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

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

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(270);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_main2.default.install = function (Vue) {
  Vue.component(_main2.default.name, _main2.default);
};

exports.default = _main2.default;

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(2);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(271)
}
/* script */


/* template */
var __vue_render__, __vue_static_render_fns__
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default.a,
  __vue_render__,
  __vue_static_render_fns__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "packages\\imageViewer\\src\\main.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5a8415d1", Component.options)
  } else {
    hotAPI.reload("data-v-5a8415d1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(272);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(1).default
var update = add("93584eb2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.viewer-container, .viewer-navbar {\n  background-color: #000;\n  overflow: hidden;\n}\n.viewer-canvas, .viewer-container, .viewer-footer, .viewer-player {\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.viewer-button, .viewer-canvas, .viewer-container, .viewer-footer, .viewer-list, .viewer-navbar, .viewer-open, .viewer-title, .viewer-toolbar, .viewer-toolbar > li {\n  overflow: hidden;\n}\n.viewer-close:before, .viewer-flip-horizontal:before, .viewer-flip-vertical:before, .viewer-fullscreen-exit:before, .viewer-fullscreen:before, .viewer-next:before, .viewer-one-to-one:before, .viewer-play:before, .viewer-prev:before, .viewer-reset:before, .viewer-rotate-left:before, .viewer-rotate-right:before, .viewer-zoom-in:before, .viewer-zoom-out:before {\n  font-size: 0;\n  line-height: 0;\n  display: block;\n  width: 20px;\n  height: 20px;\n  color: transparent;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAAUCAYAAABWOyJDAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAQPSURBVHic7Zs/iFxVFMa/0U2UaJGksUgnIVhYxVhpjDbZCBmLdAYECxsRFBTUamcXUiSNncgKQbSxsxH8gzAP3FU2jY0kKKJNiiiIghFlccnP4p3nPCdv3p9778vsLOcHB2bfveeb7955c3jvvNkBIMdxnD64a94GHMfZu3iBcRynN7zAOI7TG15gHCeeNUkr8zaxG2lbYDYsdgMbktBsP03jdQwljSXdtBhLOmtjowC9Mg9L+knSlcD8TNKpSA9lBpK2JF2VdDSR5n5J64m0qli399hNFMUlpshQii5jbXTbHGviB0nLNeNDSd9VO4A2UdB2fp+x0eCnaXxWXGA2X0au/3HgN9P4LFCjIANOJdrLr0zzZ+BEpNYDwKbpnQMeAw4m8HjQtM6Z9qa917zPQwFr3M5KgA6J5rTJCdFZJj9/lyvGhsDvwFNVuV2MhhjrK6b9bFiE+j1r87eBl4HDwCF7/U/k+ofAX5b/EXBv5JoLMuILzf3Ap6Z3EzgdqHMCuF7hcQf4HDgeoHnccncqdK/TvSDWffFXI/exICY/xZyqc6XLWF1UFZna4gJ7q8BsRvgd2/xXpo6P+D9dfT7PpECtA3cnWPM0GXGFZh/wgWltA+cDNC7X+AP4GzjZQe+k5dRxuYPeiuXU7e1qwLpDz7dFjXKRaSwuMLvAlG8zZlG+YmiK1HoFqT7wP2z+4Q45TfEGcMt01xLoNZEBTwRqD4BLpnMLeC1A41UmVxsXgXeBayV/Wx20rpTyrpnWRft7p6O/FdqzGrDukPNtkaMoMo3FBdBSQMOnYBCReyf05s126fU9ytfX98+mY54Kxnp7S9K3kj6U9KYdG0h6UdLbkh7poFXMfUnSOyVvL0h6VtIXHbS6nOP+s/Zm9mvyXW1uuC9ohZ72E9uDmXWLJOB1GxsH+DxPftsB8B6wlGDN02TAkxG6+4D3TWsbeC5CS8CDFce+AW500LhhOW2020TRjK3b21HEmgti9m0RonxbdMZeVzV+/4tF3cBpP7E9mKHNL5q8h5g0eYsCMQz0epq8gQrwMXAgcs0FGXGFRcB9wCemF9PkbYqM/Bas7fxLwNeJPdTdpo4itQti8lPMqTpXuozVRVXPpbHI3KkNTB1NfkL81j2mvhDp91HgV9MKuRIqrykj3WPq4rHyL+axj8/qGPmTqi6F9YDlHOvJU6oYcTsh/TYSzWmTE6JT19CtLTJt32D6CmHe0eQn1O8z5AXgT4sx4Vcu0/EQecMydB8z0hUWkTd2t4CrwNEePqMBcAR4mrBbwyXLPWJa8zrXmmLEhNBmfpkuY2102xxrih+pb+ieAb6vGhuA97UcJ5KR8gZ77K+99xxeYBzH6Q3/Z0fHcXrDC4zjOL3hBcZxnN74F+zlvXFWXF9PAAAAAElFTkSuQmCC);\n  background-repeat: no-repeat;\n}\n.viewer-zoom-in:before {\n  content: 'Zoom In';\n  background-position: 0 0;\n}\n.viewer-zoom-out:before {\n  content: 'Zoom Out';\n  background-position: -20px 0;\n}\n.viewer-one-to-one:before {\n  content: 'One to One';\n  background-position: -40px 0;\n}\n.viewer-reset:before {\n  content: 'Reset';\n  background-position: -60px 0;\n}\n.viewer-prev:before {\n  content: 'Previous';\n  background-position: -80px 0;\n}\n.viewer-play:before {\n  content: 'Play';\n  background-position: -100px 0;\n}\n.viewer-next:before {\n  content: 'Next';\n  background-position: -120px 0;\n}\n.viewer-rotate-left:before {\n  content: 'Rotate Left';\n  background-position: -140px 0;\n}\n.viewer-rotate-right:before {\n  content: 'Rotate Right';\n  background-position: -160px 0;\n}\n.viewer-flip-horizontal:before {\n  content: 'Flip Horizontal';\n  background-position: -180px 0;\n}\n.viewer-flip-vertical:before {\n  content: 'Flip Vertical';\n  background-position: -200px 0;\n}\n.viewer-fullscreen:before {\n  content: 'Enter Full Screen';\n  background-position: -220px 0;\n}\n.viewer-fullscreen-exit:before {\n  content: 'Exit Full Screen';\n  background-position: -240px 0;\n}\n.viewer-close:before {\n  content: 'Close';\n  background-position: -260px 0;\n}\n.viewer-container {\n  font-size: 0;\n  line-height: 0;\n  position: absolute;\n  top: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-color: rgba(0, 0, 0, 0.5);\n  direction: ltr !important;\n  -ms-touch-action: none;\n  touch-action: none;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n.viewer-container ::-moz-selection, .viewer-container::-moz-selection {\n  background-color: transparent;\n}\n.viewer-container ::selection, .viewer-container::selection {\n  background-color: transparent;\n}\n.viewer-container img {\n  display: block;\n  width: 100%;\n  min-width: 0 !important;\n  max-width: none !important;\n  height: auto;\n  min-height: 0 !important;\n  max-height: none !important;\n}\n.viewer-player, .viewer-tooltip {\n  display: none;\n  position: absolute;\n}\n.viewer-canvas {\n  position: absolute;\n  top: 0;\n}\n.viewer-canvas > img {\n  width: auto;\n  max-width: 90% !important;\n  height: auto;\n  margin: 15px auto;\n}\n.viewer-footer {\n  position: absolute;\n  text-align: center;\n}\n.viewer-navbar {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.viewer-list {\n  box-sizing: content-box;\n  height: 50px;\n  margin: 0;\n  padding: 1px 0;\n}\n.viewer-list > li {\n  font-size: 0;\n  line-height: 0;\n  float: left;\n  overflow: hidden;\n  width: 30px;\n  height: 50px;\n  cursor: pointer;\n  opacity: .5;\n  color: transparent;\n  filter: alpha(opacity=50);\n}\n.viewer-list > li + li {\n  margin-left: 1px;\n}\n.viewer-list > .viewer-active {\n  opacity: 1;\n  filter: alpha(opacity=100);\n}\n.viewer-player {\n  top: 0;\n  cursor: none;\n  background-color: #000;\n}\n.viewer-player > img {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.viewer-toolbar {\n  width: 280px;\n  margin: 0 auto 5px;\n  padding: 3px 0;\n}\n.viewer-toolbar > li {\n  float: left;\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  border-radius: 50%;\n  background-color: #000;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.viewer-toolbar > li:hover {\n  background-color: #000;\n  background-color: rgba(0, 0, 0, 0.8);\n}\n.viewer-toolbar > li:before {\n  margin: 2px;\n}\n.viewer-toolbar > li + li {\n  margin-left: 1px;\n}\n.viewer-toolbar > .viewer-play {\n  width: 30px;\n  height: 30px;\n  margin-top: -3px;\n  margin-bottom: -3px;\n}\n.viewer-toolbar > .viewer-play:before {\n  margin: 5px;\n}\n.viewer-tooltip {\n  font-size: 12px;\n  line-height: 20px;\n  top: 50%;\n  left: 50%;\n  width: 50px;\n  height: 20px;\n  margin-top: -10px;\n  margin-left: -25px;\n  text-align: center;\n  color: #fff;\n  border-radius: 10px;\n  background-color: #000;\n  background-color: rgba(0, 0, 0, 0.8);\n}\n.viewer-title {\n  height: 18px;\n  font-size: 12px;\n  line-height: 1;\n  display: inline-block;\n  max-width: 90%;\n  margin: 0 5% 5px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  opacity: .8;\n  color: #fff;\n  filter: alpha(opacity=80);\n}\n.viewer-title:hover {\n  opacity: 1;\n  filter: alpha(opacity=100);\n}\n.viewer-button {\n  position: absolute;\n  top: -40px;\n  right: -40px;\n  width: 80px;\n  height: 80px;\n  cursor: pointer;\n  border-radius: 50%;\n  background-color: #000;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.viewer-button:before {\n  position: absolute;\n  bottom: 15px;\n  left: 15px;\n}\n.viewer-fixed {\n  position: fixed;\n}\n.viewer-show {\n  display: block;\n}\n.viewer-hide {\n  display: none;\n}\n.viewer-invisible {\n  visibility: hidden;\n}\n.viewer-move {\n  cursor: move;\n  cursor: grab;\n}\n.viewer-fade {\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.viewer-in {\n  opacity: 1;\n  filter: alpha(opacity=100);\n}\n.viewer-transition {\n  transition: all .3s ease-out;\n}\n@media (max-width: 767px) {\n.viewer-hide-xs-down {\n    display: none;\n}\n}\n@media (max-width: 991px) {\n.viewer-hide-sm-down {\n    display: none;\n}\n}\n@media (max-width: 1199px) {\n.viewer-hide-md-down {\n    display: none;\n}\n}\n", ""]);

// exports


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

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Viewer.js v0.3.1
 * https://github.com/fengyuanchen/viewerjs
 *
 * Copyright (c) 2015-2016 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2016-02-02T11:35:52.542Z
 */
!function (e, t) {
  "object" == ( false ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document) throw new Error("Viewer requires a window with a document");return t(e);
  } : t(e);
}("undefined" != typeof window ? window : undefined, function (e, t) {
  "use strict";
  function i(e) {
    return Ae.call(e).slice(8, -1).toLowerCase();
  }function n(e) {
    return "string" == typeof e;
  }function a(e) {
    return "number" == typeof e && !isNaN(e);
  }function o(e) {
    return "undefined" == typeof e;
  }function r(e) {
    return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e;
  }function s(e) {
    var t, i;if (!r(e)) return !1;try {
      return t = e.constructor, i = t.prototype, t && i && Ce.call(i, "isPrototypeOf");
    } catch (n) {
      return !1;
    }
  }function l(e) {
    return "function" === i(e);
  }function u(e) {
    return Array.isArray ? Array.isArray(e) : "array" === i(e);
  }function c(e, t) {
    return t = t >= 0 ? t : 0, Array.from ? Array.from(e).slice(t) : _e.call(e, t);
  }function d(e, t) {
    var i = -1;return t.indexOf ? t.indexOf(e) : (f(t, function (t, n) {
      return t === e ? (i = n, !1) : void 0;
    }), i);
  }function m(e) {
    return n(e) && (e = e.trim ? e.trim() : e.replace(Le, "1")), e;
  }function f(e, t) {
    var i, n;if (e && l(t)) if (u(e) || a(e.length)) for (n = 0, i = e.length; i > n && t.call(e, e[n], n, e) !== !1; n++) {} else if (r(e)) for (n in e) {
      if (e.hasOwnProperty(n) && t.call(e, e[n], n, e) === !1) break;
    }return e;
  }function h(e) {
    var t;if (arguments.length > 1) {
      if (t = c(arguments), Object.assign) return Object.assign.apply(Object, t);t.shift(), f(t, function (t) {
        f(t, function (t, i) {
          e[i] = t;
        });
      });
    }return e;
  }function v(e, t) {
    var i = c(arguments, 2);return function () {
      return e.apply(t, i.concat(c(arguments)));
    };
  }function g(e, t) {
    var i = e.style;f(t, function (e, t) {
      Ie.test(t) && a(e) && (e += "px"), i[t] = e;
    });
  }function w(t) {
    return e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle;
  }function p(e, t) {
    return e.classList ? e.classList.contains(t) : e.className.indexOf(t) > -1;
  }function b(e, t) {
    var i;if (t) {
      if (a(e.length)) return f(e, function (e) {
        b(e, t);
      });if (e.classList) return e.classList.add(t);i = m(e.className), i ? i.indexOf(t) < 0 && (e.className = i + " " + t) : e.className = t;
    }
  }function y(e, t) {
    return t ? a(e.length) ? f(e, function (e) {
      y(e, t);
    }) : e.classList ? e.classList.remove(t) : void (e.className.indexOf(t) >= 0 && (e.className = e.className.replace(t, ""))) : void 0;
  }function x(e, t, i) {
    return a(e.length) ? f(e, function (e) {
      x(e, t, i);
    }) : void (i ? b(e, t) : y(e, t));
  }function z(e, t) {
    return r(e[t]) ? e[t] : e.dataset ? e.dataset[t] : e.getAttribute("data-" + t);
  }function D(e, t, i) {
    r(i) && o(e[t]) ? e[t] = i : e.dataset ? e.dataset[t] = i : e.setAttribute("data-" + t, i);
  }function E(e, t) {
    r(e[t]) ? delete e[t] : e.dataset ? delete e.dataset[t] : e.removeAttribute("data-" + t);
  }function k(e, t, _i, n) {
    var a = m(t).split(Te),
        o = _i;return a.length > 1 ? f(a, function (t) {
      k(e, t, _i);
    }) : (n && (_i = function i() {
      return I(e, t, _i), o.apply(e, arguments);
    }), void (e.addEventListener ? e.addEventListener(t, _i, !1) : e.attachEvent && e.attachEvent("on" + t, _i)));
  }function I(e, t, i) {
    var n = m(t).split(Te);return n.length > 1 ? f(n, function (t) {
      I(e, t, i);
    }) : void (e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent && e.detachEvent("on" + t, i));
  }function L(e, t) {
    var i;return e.dispatchEvent ? (l(H) ? i = new H(t, { bubbles: !0, cancelable: !0 }) : (i = W.createEvent("Event"), i.initEvent(t, !0, !0)), e.dispatchEvent(i)) : e.fireEvent ? e.fireEvent("on" + t) : void 0;
  }function T(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = !1;
  }function Y(t) {
    var i,
        n = t || e.event;return n.target || (n.target = n.srcElement || W), a(n.pageX) || (i = W.documentElement, n.pageX = n.clientX + (e.scrollX || i && i.scrollLeft || 0) - (i && i.clientLeft || 0), n.pageY = n.clientY + (e.scrollY || i && i.scrollTop || 0) - (i && i.clientTop || 0)), n;
  }function F(t) {
    var i = W.documentElement,
        n = t.getBoundingClientRect();return { left: n.left + (e.scrollX || i && i.scrollLeft || 0) - (i && i.clientLeft || 0), top: n.top + (e.scrollY || i && i.scrollTop || 0) - (i && i.clientTop || 0) };
  }function X(e) {
    var t = e.length,
        i = 0,
        n = 0;return t && (f(e, function (e) {
      i += e.pageX, n += e.pageY;
    }), i /= t, n /= t), { pageX: i, pageY: n };
  }function S(e, t) {
    return e.getElementsByTagName(t);
  }function V(e, t) {
    return e.getElementsByClassName ? e.getElementsByClassName(t) : e.querySelectorAll("." + t);
  }function N(e, t) {
    return t.length ? f(t, function (t) {
      N(e, t);
    }) : void e.appendChild(t);
  }function P(e) {
    e.parentNode && e.parentNode.removeChild(e);
  }function A(e) {
    for (; e.firstChild;) {
      e.removeChild(e.firstChild);
    }
  }function C(e, t) {
    o(e.textContent) ? e.innerText = t : e.textContent = t;
  }function _(e) {
    return e.offsetWidth;
  }function R(e) {
    return n(e) ? e.replace(/^.*\//, "").replace(/[\?&#].*$/, "") : "";
  }function q(e, t) {
    var i;return e.naturalWidth ? t(e.naturalWidth, e.naturalHeight) : (i = W.createElement("img"), i.onload = function () {
      t(this.width, this.height);
    }, void (i.src = e.src));
  }function M(e) {
    var t = [],
        i = e.rotate,
        n = e.scaleX,
        o = e.scaleY;return a(i) && t.push("rotate(" + i + "deg)"), a(n) && a(o) && t.push("scale(" + n + "," + o + ")"), t.length ? t.join(" ") : "none";
  }function B(e) {
    switch (e) {case 2:
        return G;case 3:
        return J;case 4:
        return Q;}
  }function O(e, t) {
    var i = this;i.element = e, i.options = h({}, O.DEFAULTS, s(t) && t), i.isImg = !1, i.isBuilt = !1, i.isShown = !1, i.isViewed = !1, i.isFulled = !1, i.isPlayed = !1, i.wheeling = !1, i.playing = !1, i.fading = !1, i.tooltiping = !1, i.transitioning = !1, i.action = !1, i.target = !1, i.timeout = !1, i.index = 0, i.length = 0, i.init();
  }var W = e.document,
      H = e.Event,
      j = "viewer",
      U = j + "-fixed",
      Z = j + "-open",
      K = j + "-show",
      $ = j + "-hide",
      G = "viewer-hide-xs-down",
      J = "viewer-hide-sm-down",
      Q = "viewer-hide-md-down",
      ee = j + "-fade",
      te = j + "-in",
      ie = j + "-move",
      ne = j + "-active",
      ae = j + "-invisible",
      oe = j + "-transition",
      re = j + "-fullscreen",
      se = j + "-fullscreen-exit",
      le = j + "-close",
      ue = "mousedown touchstart pointerdown MSPointerDown",
      ce = "mousemove touchmove pointermove MSPointerMove",
      de = "mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel",
      me = "wheel mousewheel DOMMouseScroll",
      fe = "transitionend",
      he = "load",
      ve = "keydown",
      ge = "click",
      we = "resize",
      pe = "build",
      be = "built",
      ye = "show",
      xe = "shown",
      ze = "hide",
      De = "hidden",
      Ee = "view",
      ke = "viewed",
      Ie = /width|height|left|top|marginLeft|marginTop/,
      Le = /^\s+(.*)\s+$/,
      Te = /\s+/,
      Ye = "undefined" != typeof W.createElement(j).style.transition,
      Fe = Math.min,
      Xe = Math.max,
      Se = Math.abs,
      Ve = Math.sqrt,
      Ne = Math.round,
      Pe = Object.prototype,
      Ae = Pe.toString,
      Ce = Pe.hasOwnProperty,
      _e = Array.prototype.slice;O.prototype = { constructor: O, init: function init() {
      var e = this,
          t = e.options,
          i = e.element,
          n = "img" === i.tagName.toLowerCase(),
          a = n ? [i] : S(i, "img"),
          o = a.length,
          r = v(e.ready, e);z(i, j) || (D(i, j, e), o && (l(t.build) && k(i, pe, t.build, !0), L(i, pe) !== !1 && (Ye || (t.transition = !1), e.isImg = n, e.length = o, e.count = 0, e.images = a, e.body = W.body, t.inline ? (k(i, be, function () {
        e.view();
      }, !0), f(a, function (e) {
        e.complete ? r() : k(e, he, r, !0);
      })) : k(i, ge, e._start = v(e.start, e)))));
    }, ready: function ready() {
      var e = this;e.count++, e.count === e.length && e.build();
    }, build: function build() {
      var e,
          t,
          i,
          n,
          a,
          o,
          r,
          s,
          u = this,
          c = u.options,
          d = u.element;u.isBuilt || (e = W.createElement("div"), e.innerHTML = O.TEMPLATE, u.parent = t = d.parentNode, u.viewer = i = V(e, "viewer-container")[0], u.canvas = V(i, "viewer-canvas")[0], u.footer = V(i, "viewer-footer")[0], u.title = r = V(i, "viewer-title")[0], u.toolbar = a = V(i, "viewer-toolbar")[0], u.navbar = o = V(i, "viewer-navbar")[0], u.button = n = V(i, "viewer-button")[0], u.tooltipBox = V(i, "viewer-tooltip")[0], u.player = V(i, "viewer-player")[0], u.list = V(i, "viewer-list")[0], b(r, c.title ? B(c.title) : $), b(a, c.toolbar ? B(c.toolbar) : $), b(o, c.navbar ? B(c.navbar) : $), x(n, $, !c.button), x(a.querySelectorAll("li[class*=zoom]"), ae, !c.zoomable), x(a.querySelectorAll("li[class*=flip]"), ae, !c.scalable), c.rotatable || (s = a.querySelectorAll("li[class*=rotate]"), b(s, ae), N(a, s)), c.inline ? (b(n, re), g(i, { zIndex: c.zIndexInline }), "static" === w(t).position && g(t, { position: "relative" })) : (b(n, le), b(i, U), b(i, ee), b(i, $), g(i, { zIndex: c.zIndex })), t.insertBefore(i, d.nextSibling), c.inline && (u.render(), u.bind(), u.isShown = !0), u.isBuilt = !0, l(c.built) && k(d, be, c.built, !0), L(d, be));
    }, unbuild: function unbuild() {
      var e = this;e.isBuilt && (e.isBuilt = !1, P(e.viewer));
    }, bind: function bind() {
      var t = this,
          i = t.options,
          n = t.element,
          a = t.viewer;l(i.view) && k(n, Ee, i.view), l(i.viewed) && k(n, ke, i.viewed), k(a, ge, t._click = v(t.click, t)), k(a, me, t._wheel = v(t.wheel, t)), k(t.canvas, ue, t._mousedown = v(t.mousedown, t)), k(W, ce, t._mousemove = v(t.mousemove, t)), k(W, de, t._mouseup = v(t.mouseup, t)), k(W, ve, t._keydown = v(t.keydown, t)), k(e, we, t._resize = v(t.resize, t));
    }, unbind: function unbind() {
      var t = this,
          i = t.options,
          n = t.element,
          a = t.viewer;l(i.view) && I(n, Ee, i.view), l(i.viewed) && I(n, ke, i.viewed), I(a, ge, t._click), I(a, me, t._wheel), I(t.canvas, ue, t._mousedown), I(W, ce, t._mousemove), I(W, de, t._mouseup), I(W, ve, t._keydown), I(e, we, t._resize);
    }, render: function render() {
      var e = this;e.initContainer(), e.initViewer(), e.initList(), e.renderViewer();
    }, initContainer: function initContainer() {
      var t = this;t.containerData = { width: e.innerWidth, height: e.innerHeight };
    }, initViewer: function initViewer() {
      var e,
          t = this,
          i = t.options,
          n = t.parent;i.inline && (t.parentData = e = { width: Xe(n.offsetWidth, i.minWidth), height: Xe(n.offsetHeight, i.minHeight) }), (t.isFulled || !e) && (e = t.containerData), t.viewerData = h({}, e);
    }, renderViewer: function renderViewer() {
      var e = this;e.options.inline && !e.isFulled && g(e.viewer, e.viewerData);
    }, initList: function initList() {
      var e = this,
          t = e.options,
          i = e.element,
          a = e.list,
          o = [];f(e.images, function (a, r) {
        var s = a.src,
            u = a.alt || R(s),
            c = t.url;s && (n(c) ? c = a.getAttribute(c) : l(c) && (c = c.call(i, e)), o.push('<li><img src="' + s + '" data-action="view" data-index="' + r + '" data-original-url="' + (c || s) + '" alt="' + u + '"></li>'));
      }), a.innerHTML = o.join(""), f(S(a, "img"), function (t) {
        D(t, "filled", !0), k(t, he, v(e.loadImage, e), !0);
      }), e.items = S(a, "li"), t.transition && k(i, ke, function () {
        b(a, oe);
      }, !0);
    }, renderList: function renderList(e) {
      var t = this,
          i = e || t.index,
          n = t.items[i].offsetWidth || 30,
          a = n + 1;g(t.list, { width: a * t.length, marginLeft: (t.viewerData.width - n) / 2 - a * i });
    }, resetList: function resetList() {
      var e = this;A(e.list), y(e.list, oe), g({ marginLeft: 0 });
    }, initImage: function initImage(e) {
      var t = this,
          i = t.options,
          n = t.image,
          a = t.viewerData,
          o = t.footer.offsetHeight,
          r = a.width,
          s = Xe(a.height - o, o),
          u = t.imageData || {};q(n, function (n, a) {
        var o,
            c,
            d = n / a,
            m = r,
            f = s;s * d > r ? f = r / d : m = s * d, m = Fe(.9 * m, n), f = Fe(.9 * f, a), c = { naturalWidth: n, naturalHeight: a, aspectRatio: d, ratio: m / n, width: m, height: f, left: (r - m) / 2, top: (s - f) / 2 }, o = h({}, c), i.rotatable && (c.rotate = u.rotate || 0, o.rotate = 0), i.scalable && (c.scaleX = u.scaleX || 1, c.scaleY = u.scaleY || 1, o.scaleX = 1, o.scaleY = 1), t.imageData = c, t.initialImageData = o, l(e) && e();
      });
    }, renderImage: function renderImage(e) {
      var t = this,
          i = t.image,
          n = t.imageData,
          a = M(n);g(i, { width: n.width, height: n.height, marginLeft: n.left, marginTop: n.top, WebkitTransform: a, msTransform: a, transform: a }), l(e) && (t.transitioning ? k(i, fe, e, !0) : e());
    }, resetImage: function resetImage() {
      var e = this;e.image && (P(e.image), e.image = null);
    }, start: function start(e) {
      var t = this,
          i = Y(e),
          n = i.target;"img" === n.tagName.toLowerCase() && (t.target = n, t.show());
    }, click: function click(e) {
      var t = this,
          i = Y(e),
          n = i.target,
          a = z(n, "action"),
          o = t.imageData;switch (a) {case "mix":
          t.isPlayed ? t.stop() : t.options.inline ? t.isFulled ? t.exit() : t.full() : t.hide();break;case "view":
          t.view(z(n, "index"));break;case "zoom-in":
          t.zoom(.1, !0);break;case "zoom-out":
          t.zoom(-.1, !0);break;case "one-to-one":
          t.toggle();break;case "reset":
          t.reset();break;case "prev":
          t.prev();break;case "play":
          t.play();break;case "next":
          t.next();break;case "rotate-left":
          t.rotate(-90);break;case "rotate-right":
          t.rotate(90);break;case "flip-horizontal":
          t.scaleX(-o.scaleX || -1);break;case "flip-vertical":
          t.scaleY(-o.scaleY || -1);break;default:
          t.isPlayed && t.stop();}
    }, load: function load() {
      var e = this,
          t = e.options,
          i = e.image,
          n = e.viewerData;e.timeout && (clearTimeout(e.timeout), e.timeout = !1), y(i, ae), i.style.cssText = "width:0;height:0;margin-left:" + n.width / 2 + "px;margin-top:" + n.height / 2 + "px;max-width:none!important;visibility:visible;", e.initImage(function () {
        x(i, oe, t.transition), x(i, ie, t.movable), e.renderImage(function () {
          e.isViewed = !0, L(e.element, ke);
        });
      });
    }, loadImage: function loadImage(e) {
      var t = Y(e),
          i = t.target,
          n = i.parentNode,
          a = n.offsetWidth || 30,
          o = n.offsetHeight || 50,
          r = !!z(i, "filled");q(i, function (e, t) {
        var n = e / t,
            s = a,
            l = o;o * n > a ? r ? s = o * n : l = a / n : r ? l = a / n : s = o * n, g(i, { width: s, height: l, marginLeft: (a - s) / 2, marginTop: (o - l) / 2 });
      });
    }, resize: function resize() {
      var e = this;e.initContainer(), e.initViewer(), e.renderViewer(), e.renderList(), e.isViewed && e.initImage(function () {
        e.renderImage();
      }), e.isPlayed && f(S(e.player, "img"), function (t) {
        k(t, he, v(e.loadImage, e), !0), L(t, he);
      });
    }, wheel: function wheel(e) {
      var t = this,
          i = Y(e),
          n = Number(t.options.zoomRatio) || .1,
          a = 1;t.isViewed && (T(i), t.wheeling || (t.wheeling = !0, setTimeout(function () {
        t.wheeling = !1;
      }, 50), i.deltaY ? a = i.deltaY > 0 ? 1 : -1 : i.wheelDelta ? a = -i.wheelDelta / 120 : i.detail && (a = i.detail > 0 ? 1 : -1), t.zoom(-a * n, !0, i)));
    }, keydown: function keydown(e) {
      var t = this,
          i = Y(e),
          n = t.options,
          a = i.keyCode || i.which || i.charCode;if (t.isFulled && n.keyboard) switch (a) {case 27:
          t.isPlayed ? t.stop() : n.inline ? t.isFulled && t.exit() : t.hide();break;case 32:
          t.isPlayed && t.stop();break;case 37:
          t.prev();break;case 38:
          T(i), t.zoom(n.zoomRatio, !0);break;case 39:
          t.next();break;case 40:
          T(i), t.zoom(-n.zoomRatio, !0);break;case 48:case 49:
          (i.ctrlKey || i.shiftKey) && (T(i), t.toggle());}
    }, mousedown: function mousedown(e) {
      var t,
          i,
          n = this,
          a = n.options,
          o = Y(e),
          r = a.movable ? "move" : !1,
          s = o.touches;if (n.isViewed) {
        if (s) {
          if (t = s.length, t > 1) {
            if (!a.zoomable || 2 !== t) return;i = s[1], n.startX2 = i.pageX, n.startY2 = i.pageY, r = "zoom";
          } else n.isSwitchable() && (r = "switch");i = s[0];
        }r && (T(o), n.action = r, n.startX = i ? i.pageX : o.pageX, n.startY = i ? i.pageY : o.pageY);
      }
    }, mousemove: function mousemove(e) {
      var t,
          i,
          n = this,
          a = n.options,
          o = Y(e),
          r = n.action,
          s = n.image,
          l = o.touches;if (n.isViewed) {
        if (l) {
          if (t = l.length, t > 1) {
            if (!a.zoomable || 2 !== t) return;i = l[1], n.endX2 = i.pageX, n.endY2 = i.pageY;
          }i = l[0];
        }r && (T(o), "move" === r && a.transition && p(s, oe) && y(s, oe), n.endX = i ? i.pageX : o.pageX, n.endY = i ? i.pageY : o.pageY, n.change(o));
      }
    }, mouseup: function mouseup(e) {
      var t = this,
          i = Y(e),
          n = t.action;n && (T(i), "move" === n && t.options.transition && b(t.image, oe), t.action = !1);
    }, show: function show() {
      var e,
          t = this,
          i = t.options,
          n = t.element;return i.inline || t.transitioning ? t : (t.isBuilt || t.build(), e = t.viewer, l(i.show) && k(n, ye, i.show, !0), L(n, ye) === !1 ? t : (b(t.body, Z), y(e, $), k(n, xe, function () {
        t.view(t.target ? d(t.target, c(t.images)) : t.index), t.target = !1;
      }, !0), i.transition ? (t.transitioning = !0, b(e, oe), _(e), k(e, fe, v(t.shown, t), !0), b(e, te)) : (b(e, te), t.shown()), t));
    }, hide: function hide() {
      var e = this,
          t = e.options,
          i = e.element,
          n = e.viewer;return t.inline || e.transitioning || !e.isShown ? e : (l(t.hide) && k(i, ze, t.hide, !0), L(i, ze) === !1 ? e : (e.isViewed && t.transition ? (e.transitioning = !0, k(e.image, fe, function () {
        k(n, fe, v(e.hidden, e), !0), y(n, te);
      }, !0), e.zoomTo(0, !1, !1, !0)) : (y(n, te), e.hidden()), e));
    }, view: function view(e) {
      var t,
          i,
          n,
          a,
          o,
          r = this,
          s = r.element,
          l = r.title,
          u = r.canvas;return e = Number(e) || 0, !r.isShown || r.isPlayed || 0 > e || e >= r.length || r.isViewed && e === r.index ? r : L(s, Ee) === !1 ? r : (i = r.items[e], n = S(i, "img")[0], a = z(n, "originalUrl"), o = n.getAttribute("alt"), t = W.createElement("img"), t.src = a, t.alt = o, r.image = t, r.isViewed && y(r.items[r.index], ne), b(i, ne), r.isViewed = !1, r.index = e, r.imageData = null, b(u, ae), A(u), N(u, t), r.renderList(), A(l), k(s, ke, function () {
        var e = r.imageData,
            t = e.naturalWidth,
            i = e.naturalHeight;C(l, o + " (" + t + " * " + i + ")");
      }, !0), t.complete ? r.load() : (k(t, he, v(r.load, r), !0), r.timeout && clearTimeout(r.timeout), r.timeout = setTimeout(function () {
        y(t, ae), r.timeout = !1;
      }, 1e3)), r);
    }, prev: function prev() {
      var e = this;return e.view(Xe(e.index - 1, 0)), e;
    }, next: function next() {
      var e = this;return e.view(Fe(e.index + 1, e.length - 1)), e;
    }, move: function move(e, t) {
      var i = this,
          n = i.imageData;return i.moveTo(o(e) ? e : n.left + Number(e), o(t) ? t : n.top + Number(t)), i;
    }, moveTo: function moveTo(e, t) {
      var i = this,
          n = i.imageData,
          r = !1;return o(t) && (t = e), e = Number(e), t = Number(t), i.isViewed && !i.isPlayed && i.options.movable && (a(e) && (n.left = e, r = !0), a(t) && (n.top = t, r = !0), r && i.renderImage()), i;
    }, zoom: function zoom(e, t, i) {
      var n = this,
          a = n.imageData;return e = Number(e), e = 0 > e ? 1 / (1 - e) : 1 + e, n.zoomTo(a.width * e / a.naturalWidth, t, i), n;
    }, zoomTo: function zoomTo(e, t, i, n) {
      var o,
          r,
          s,
          l,
          u = this,
          c = u.options,
          d = .01,
          m = 100,
          f = u.imageData;return e = Xe(0, e), a(e) && u.isViewed && !u.isPlayed && (n || c.zoomable) && (n || (d = Xe(d, c.minZoomRatio), m = Fe(m, c.maxZoomRatio), e = Fe(Xe(e, d), m)), e > .95 && 1.05 > e && (e = 1), o = f.naturalWidth * e, r = f.naturalHeight * e, i ? (s = F(u.viewer), l = i.touches ? X(i.touches) : { pageX: i.pageX, pageY: i.pageY }, f.left -= (o - f.width) * ((l.pageX - s.left - f.left) / f.width), f.top -= (r - f.height) * ((l.pageY - s.top - f.top) / f.height)) : (f.left -= (o - f.width) / 2, f.top -= (r - f.height) / 2), f.width = o, f.height = r, f.ratio = e, u.renderImage(), t && u.tooltip()), u;
    }, rotate: function rotate(e) {
      var t = this;return t.rotateTo((t.imageData.rotate || 0) + Number(e)), t;
    }, rotateTo: function rotateTo(e) {
      var t = this,
          i = t.imageData;return e = Number(e), a(e) && t.isViewed && !t.isPlayed && t.options.rotatable && (i.rotate = e, t.renderImage()), t;
    }, scale: function scale(e, t) {
      var i = this,
          n = i.imageData,
          r = !1;return o(t) && (t = e), e = Number(e), t = Number(t), i.isViewed && !i.isPlayed && i.options.scalable && (a(e) && (n.scaleX = e, r = !0), a(t) && (n.scaleY = t, r = !0), r && i.renderImage()), i;
    }, scaleX: function scaleX(e) {
      var t = this;return t.scale(e, t.imageData.scaleY), t;
    }, scaleY: function scaleY(e) {
      var t = this;return t.scale(t.imageData.scaleX, e), t;
    }, play: function play() {
      var _e2,
          t = this,
          i = t.options,
          n = t.player,
          o = v(t.loadImage, t),
          r = [],
          s = 0,
          l = 0;return !t.isShown || t.isPlayed ? t : (i.fullscreen && t.requestFullscreen(), t.isPlayed = !0, b(n, K), f(t.items, function (e, t) {
        var a = S(e, "img")[0],
            u = W.createElement("img");u.src = z(a, "originalUrl"), u.alt = a.getAttribute("alt"), s++, b(u, ee), x(u, oe, i.transition), p(e, ne) && (b(u, te), l = t), r.push(u), k(u, he, o, !0), N(n, u);
      }), a(i.interval) && i.interval > 0 && (_e2 = function e() {
        t.playing = setTimeout(function () {
          y(r[l], te), l++, l = s > l ? l : 0, b(r[l], te), _e2();
        }, i.interval);
      }, s > 1 && _e2()), t);
    }, stop: function stop() {
      var e = this,
          t = e.player;return e.isPlayed ? (e.options.fullscreen && e.exitFullscreen(), e.isPlayed = !1, clearTimeout(e.playing), y(t, K), A(t), e) : e;
    }, full: function full() {
      var e = this,
          t = e.options,
          i = e.viewer,
          n = e.image,
          a = e.list;return !e.isShown || e.isPlayed || e.isFulled || !t.inline ? e : (e.isFulled = !0, b(e.body, Z), b(e.button, se), t.transition && (y(n, oe), y(a, oe)), b(i, U), i.setAttribute("style", ""), g(i, { zIndex: t.zIndex }), e.initContainer(), e.viewerData = h({}, e.containerData), e.renderList(), e.initImage(function () {
        e.renderImage(function () {
          t.transition && setTimeout(function () {
            b(n, oe), b(a, oe);
          }, 0);
        });
      }), e);
    }, exit: function exit() {
      var e = this,
          t = e.options,
          i = e.viewer,
          n = e.image,
          a = e.list;return e.isFulled ? (e.isFulled = !1, y(e.body, Z), y(e.button, se), t.transition && (y(n, oe), y(a, oe)), y(i, U), g(i, { zIndex: t.zIndexInline }), e.viewerData = h({}, e.parentData), e.renderViewer(), e.renderList(), e.initImage(function () {
        e.renderImage(function () {
          t.transition && setTimeout(function () {
            b(n, oe), b(a, oe);
          }, 0);
        });
      }), e) : e;
    }, tooltip: function tooltip() {
      var e = this,
          t = e.options,
          i = e.tooltipBox,
          n = e.imageData;return e.isViewed && !e.isPlayed && t.tooltip ? (C(i, Ne(100 * n.ratio) + "%"), e.tooltiping ? clearTimeout(e.tooltiping) : t.transition ? (e.fading && L(i, fe), b(i, K), b(i, ee), b(i, oe), _(i), b(i, te)) : b(i, K), e.tooltiping = setTimeout(function () {
        t.transition ? (k(i, fe, function () {
          y(i, K), y(i, ee), y(i, oe), e.fading = !1;
        }, !0), y(i, te), e.fading = !0) : y(i, K), e.tooltiping = !1;
      }, 1e3), e) : e;
    }, toggle: function toggle() {
      var e = this;return 1 === e.imageData.ratio ? e.zoomTo(e.initialImageData.ratio, !0) : e.zoomTo(1, !0), e;
    }, reset: function reset() {
      var e = this;return e.isViewed && !e.isPlayed && (e.imageData = h({}, e.initialImageData), e.renderImage()), e;
    }, update: function update() {
      var e,
          t = this,
          i = [];return t.isImg && !t.element.parentNode ? t.destroy() : (t.length = t.images.length, t.isBuilt && (f(t.items, function (e, n) {
        var a = S(e, "img")[0],
            o = t.images[n];o ? o.src !== a.src && i.push(n) : i.push(n);
      }), g(t.list, { width: "auto" }), t.initList(), t.isShown && (t.length ? t.isViewed && (e = d(t.index, i), e >= 0 ? (t.isViewed = !1, t.view(Xe(t.index - (e + 1), 0))) : b(t.items[t.index], ne)) : (t.image = null, t.isViewed = !1, t.index = 0, t.imageData = null, A(t.canvas), A(t.title)))), t);
    }, destroy: function destroy() {
      var e = this,
          t = e.element;return e.options.inline ? e.unbind() : (e.isShown && e.unbind(), I(t, ge, e._start)), e.unbuild(), E(t, j), e;
    }, shown: function shown() {
      var e = this,
          t = e.options,
          i = e.element;e.transitioning = !1, e.isFulled = !0, e.isShown = !0, e.isVisible = !0, e.render(), e.bind(), l(t.shown) && k(i, xe, t.shown, !0), L(i, xe);
    }, hidden: function hidden() {
      var e = this,
          t = e.options,
          i = e.element;e.transitioning = !1, e.isViewed = !1, e.isFulled = !1, e.isShown = !1, e.isVisible = !1, e.unbind(), y(e.body, Z), b(e.viewer, $), e.resetList(), e.resetImage(), l(t.hidden) && k(i, De, t.hidden, !0), L(i, De);
    }, requestFullscreen: function requestFullscreen() {
      var e = this,
          t = W.documentElement;!e.isFulled || W.fullscreenElement || W.mozFullScreenElement || W.webkitFullscreenElement || W.msFullscreenElement || (t.requestFullscreen ? t.requestFullscreen() : t.msRequestFullscreen ? t.msRequestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen && t.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT));
    }, exitFullscreen: function exitFullscreen() {
      var e = this;e.isFulled && (W.exitFullscreen ? W.exitFullscreen() : W.msExitFullscreen ? W.msExitFullscreen() : W.mozCancelFullScreen ? W.mozCancelFullScreen() : W.webkitExitFullscreen && W.webkitExitFullscreen());
    }, change: function change(e) {
      var t = this,
          i = t.endX - t.startX,
          n = t.endY - t.startY;switch (t.action) {case "move":
          t.move(i, n);break;case "zoom":
          t.zoom(function (e, t, i, n) {
            var a = Ve(e * e + t * t),
                o = Ve(i * i + n * n);return (o - a) / a;
          }(Se(t.startX - t.startX2), Se(t.startY - t.startY2), Se(t.endX - t.endX2), Se(t.endY - t.endY2)), !1, e), t.startX2 = t.endX2, t.startY2 = t.endY2;break;case "switch":
          t.action = "switched", Se(i) > Se(n) && (i > 1 ? t.prev() : -1 > i && t.next());}t.startX = t.endX, t.startY = t.endY;
    }, isSwitchable: function isSwitchable() {
      var e = this,
          t = e.imageData,
          i = e.viewerData;return t.left >= 0 && t.top >= 0 && t.width <= i.width && t.height <= i.height;
    } }, O.DEFAULTS = { inline: !1, button: !0, navbar: !0, title: !0, toolbar: !0, tooltip: !0, movable: !0, zoomable: !0, rotatable: !0, scalable: !0, transition: !0, fullscreen: !0, keyboard: !0, interval: 5e3, minWidth: 200, minHeight: 100, zoomRatio: .1, minZoomRatio: .01, maxZoomRatio: 100, zIndex: 2015, zIndexInline: 0, url: "src", build: null, built: null, show: null, shown: null, hide: null, hidden: null, view: null, viewed: null }, O.TEMPLATE = '<div class="viewer-container"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><ul class="viewer-toolbar"><li class="viewer-zoom-in" data-action="zoom-in"></li><li class="viewer-zoom-out" data-action="zoom-out"></li><li class="viewer-one-to-one" data-action="one-to-one"></li><li class="viewer-reset" data-action="reset"></li><li class="viewer-prev" data-action="prev"></li><li class="viewer-play" data-action="play"></li><li class="viewer-next" data-action="next"></li><li class="viewer-rotate-left" data-action="rotate-left"></li><li class="viewer-rotate-right" data-action="rotate-right"></li><li class="viewer-flip-horizontal" data-action="flip-horizontal"></li><li class="viewer-flip-vertical" data-action="flip-vertical"></li></ul><div class="viewer-navbar"><ul class="viewer-list"></ul></div></div><div class="viewer-tooltip"></div><div class="viewer-button" data-action="mix"></div><div class="viewer-player"></div></div>';var Re = e.Viewer;return O.noConflict = function () {
    return e.Viewer = Re, O;
  }, O.setDefaults = function (e) {
    h(O.DEFAULTS, e);
  }, "function" == "function" && __webpack_require__(114) && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return O;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)), t || (e.Viewer = O), O;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(113)(module)))

/***/ })

/******/ });
});