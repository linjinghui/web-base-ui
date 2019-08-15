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
/******/ 	return __webpack_require__(__webpack_require__.s = 153);
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

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(154);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_main2.default.install = function (Vue) {
  Vue.component(_main2.default.name, _main2.default);
};

exports.default = _main2.default;

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c96bd92a_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(2);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(155)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c96bd92a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c96bd92a_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c96bd92a_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "packages\\slider\\src\\main.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c96bd92a", Component.options)
  } else {
    hotAPI.reload("data-v-c96bd92a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(156);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(1).default
var update = add("5cef4622", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-c96bd92a\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-c96bd92a\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.slider[data-v-c96bd92a] {\n  position: relative;\n  width: 100%;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  overflow: hidden;\n  opacity: 1!important;\n}\n.slider > .runway[data-v-c96bd92a] {\n  position: relative;\n  margin: 16px;\n  height: 6px;\n  border-radius: 4px;\n  background-color: #e4e7ed;\n}\n.slider:not([disabled]) > .runway[data-v-c96bd92a] {\n  cursor: pointer;\n}\n.slider > .runway > .bar[data-v-c96bd92a] {\n  position: relative;\n  height: 6px;\n  border-style: solid;\n  border-width: 0;\n  border-radius: inherit;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.slider > .runway > .bar > .btn[data-v-c96bd92a] {\n  position: absolute;\n  top: -16px;\n  right: 0;\n  height: 36px;\n  width: 36px;\n  transform: translateX(50%);\n  border: inherit;\n  /*border-width: 1px;*/\n  cursor: pointer;\n  z-index: 1;\n}\n.slider > .runway > .bar > .btn[data-v-c96bd92a]:after {\n  content: '';\n  position: absolute;\n  margin: auto;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 16px;\n  height: 16px;\n  border: inherit;\n  border-width: 2px;\n  background-color: #fff;\n  border-radius: 50%;\n  transition: .2s;\n  cursor: grab;\n}\n.slider > .runway > .bar > .btn[data-v-c96bd92a]:active:after {\n  cursor: grabbing;\n}\n.slider[disabled] > .runway > .bar > .btn[data-v-c96bd92a]:after {\n  cursor: not-allowed;\n}\n", ""]);

// exports


/***/ }),

/***/ 157:
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
    { staticClass: "slider", attrs: { disabled: _vm.disabled } },
    [
      _c(
        "div",
        {
          ref: "runway",
          staticClass: "runway",
          on: { click: _vm.setPositionByMouse }
        },
        [
          _c(
            "div",
            {
              staticClass: "bar",
              style: {
                width: _vm.value + "%",
                "border-color": _vm.ctheme,
                "background-color": _vm.ctheme
              }
            },
            [
              _c(
                "cmp-tooltip",
                {
                  ref: "ttp",
                  attrs: {
                    text: _vm.tipText,
                    model: "hover",
                    position: "bottom"
                  }
                },
                [
                  _c("span", {
                    staticClass: "btn theme-c",
                    on: {
                      mousedown: function($event) {
                        return _vm.toggleWindowEvent("add")
                      },
                      touchstart: function($event) {
                        return _vm.toggleWindowEvent("add")
                      }
                    }
                  })
                ]
              )
            ],
            1
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c96bd92a", { render: render, staticRenderFns: staticRenderFns })
  }
}

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

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

exports.default = {
  name: 'Tooltip',
  data: function data() {
    return {
      id: 'tooltip_' + new Date().getTime() + parseInt(Math.random() * 100),
      pstns: ['top', 'right', 'bottom', 'left'],
      markNum: 0,
      // 目标元素对象
      slotDom: {},
      // 提示框对象
      tooltipDom: {},
      // 箭头对象
      triangleDom: {}
    };
  },
  props: {
    text: '',
    theme: {
      default: '#303133'
    },
    position: {
      default: 'top'
    },
    model: {
      default: 'hover'
    }
  },
  // 1、构造目标元素 并 获取目标元素长、宽、相对位置left、top
  render: function render(createElement) {
    var dom = function (children) {
      return children && children.filter(function (c) {
        return c && c.tag;
      })[0];
    }(this.$slots.default);

    this.$nextTick(function () {
      if (dom.elm) {
        this.slotDom = { dom: dom.elm };
        // 获取slotDom 位置信息
        this.getSlotDomAttr();
      }
    });
    return dom;
  },
  beforeDestroy: function beforeDestroy() {
    if (this.model === 'click') {
      window.removeEventListener('click', this.doToggleTooltip);
    }
  },
  destroyed: function destroyed() {
    this.removeTooltipDom();
  },
  watch: {
    text: function text() {
      this.resetToopText();
    }
  },
  mounted: function mounted() {
    // 2、构造出tooltip dom节点 并 获取text dom节点长、宽
    this.$nextTick(function () {
      this.rendTooltipDom();
      this.slotDomEvent();
    });
  },
  methods: {
    // 手动渲染提示 DOM
    rendTooltipDom: function rendTooltipDom() {
      var dom = document.createElement('p');
      var triangle = '';
      var font = '';

      dom.setAttribute('id', this.id);
      dom.setAttribute('class', 'tooltip');
      dom.setAttribute('style', 'background-color: ' + this.theme);

      font = document.createElement('span');
      font.setAttribute('class', 'text');
      font.innerHTML = this.text;
      dom.appendChild(font);

      triangle = document.createElement('i');
      triangle.setAttribute('class', 'cicon-triangle-right');
      triangle.setAttribute('style', 'color: ' + this.theme);
      dom.appendChild(triangle);

      triangle = document.createElement('i');
      triangle.setAttribute('class', 'cicon-triangle-bottom');
      triangle.setAttribute('style', 'color: ' + this.theme);
      dom.appendChild(triangle);

      triangle = document.createElement('i');
      triangle.setAttribute('class', 'cicon-triangle-left');
      triangle.setAttribute('style', 'color: ' + this.theme);
      dom.appendChild(triangle);

      triangle = document.createElement('i');
      triangle.setAttribute('class', 'cicon-triangle-top');
      triangle.setAttribute('style', 'color: ' + this.theme);
      dom.appendChild(triangle);

      document.body.appendChild(dom);
      // 获取提示 DOM的基本属性
      this.tooltipDom = {
        dom: dom,
        width: dom.offsetWidth,
        height: dom.offsetHeight
      };
      this.update();
      this.doToggleTooltip();
    },
    // 获取slot元素
    getTooltipDom: function getTooltipDom() {
      return this.tooltipDom.dom;
    },
    // 手动移除提示 DOM
    removeTooltipDom: function removeTooltipDom() {
      var dom = this.getTooltipDom();

      dom && document.body.removeChild(dom);
    },
    // 给目标元素添加事件
    slotDomEvent: function slotDomEvent() {
      var _this = this;

      if (this.model === 'hover') {
        this.$el.addEventListener('mouseenter', function () {
          // 获取slotDom 位置信息
          _this.getSlotDomAttr();
          _this.update();
          _this.doToggleTooltip('show');
        });
        this.$el.addEventListener('mouseleave', function () {
          _this.doToggleTooltip();
        });
      } else if (this.model === 'click') {
        this.$el.addEventListener('click', function (e) {
          (e || window.event).stopPropagation();
          // 获取slotDom 位置信息
          _this.getSlotDomAttr();
          _this.update();
          _this.doToggleTooltip('show');
        });
        window.addEventListener('click', this.doToggleTooltip);
      }
    },
    // 显示、隐藏text dom节点 - type: show(显示)，其他(隐藏)
    doToggleTooltip: function doToggleTooltip(type) {
      this.getTooltipDom().style.display = type === 'show' ? '' : 'none';
    },
    getSlotDomAttr: function getSlotDomAttr() {
      var dom = this.slotDom.dom;
      var bdcr = dom.getBoundingClientRect();

      this.slotDom.left = bdcr.left;
      this.slotDom.top = bdcr.top;
      this.slotDom.bottom = document.body.offsetHeight - dom.offsetHeight - bdcr.top;
      this.slotDom.right = document.body.offsetWidth - dom.offsetWidth - bdcr.left;
      this.slotDom.width = dom.offsetWidth;
      this.slotDom.height = dom.offsetHeight;
    },
    setTooltipPstn: function setTooltipPstn(type) {
      var dom = this.getTooltipDom();
      var arrow = 12;
      var left = 200;
      var top = 200;
      var max = this.pstns.length;
      var bodyHeight = document.body.offsetHeight;
      var bodyWidth = document.body.offsetWidth;
      var nextPosnIndex = function (_this) {
        var index = _this.pstns.indexOf(type);

        return index >= max - 1 ? 0 : index + 1;
      }(this);

      if (type === 'top') {
        top = this.slotDom.top - this.tooltipDom.height - arrow;
        left = this.slotDom.left + (this.slotDom.width - this.tooltipDom.width) / 2;
      } else if (type === 'right') {
        top = this.slotDom.top + (this.slotDom.height - this.tooltipDom.height) / 2;
        left = this.slotDom.left + this.slotDom.width + arrow;
      } else if (type === 'bottom') {
        top = this.slotDom.top + this.slotDom.height + arrow;
        left = this.slotDom.left + (this.slotDom.width - this.tooltipDom.width) / 2;
      } else if (type === 'left') {
        top = this.slotDom.top + (this.slotDom.height - this.tooltipDom.height) / 2;
        left = this.slotDom.left - this.tooltipDom.width - arrow;
      }
      if (this.markNum < max && (top < 0 || left < 0 || top + this.tooltipDom.height > bodyHeight || left + this.tooltipDom.width > bodyWidth)) {
        this.markNum += 1;
        this.setTooltipPstn(this.pstns[nextPosnIndex]);
      } else {
        dom.style.left = left + 'px';
        dom.style.top = top + 'px';
        this.setTooltipArrowPstn(type);
      }
    },
    setTooltipArrowPstn: function setTooltipArrowPstn(type) {
      var dom = this.getTooltipDom();

      dom.setAttribute('class', 'tooltip ' + type);
    },
    resetToopText: function resetToopText() {
      var dom = this.tooltipDom.dom.querySelector('.text');

      dom.innerHTML = this.text;
    },
    update: function update() {
      this.markNum = 0;
      this.setTooltipPstn(this.position);
    }
  }
};

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(68);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_main2.default.install = function (Vue) {
  Vue.component(_main2.default.name, _main2.default);
};

exports.default = _main2.default;

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(2);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(69)
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
Component.options.__file = "packages\\tooltip\\src\\main.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e7f095b", Component.options)
  } else {
    hotAPI.reload("data-v-4e7f095b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(1).default
var update = add("e2e0b79e", content, false, {});
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

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.tooltip {\n  position: fixed;\n  top: 100px;\n  left: 100px;\n  padding: 8px 10px;\n  color: #fff;\n  border-radius: 4px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  z-index: 101;\n}\n.tooltip > [class^=cicon-triangle] {\n    display: none;\n    position: absolute;\n    margin: auto;\n    font-size: 26px;\n}\n.tooltip > .cicon-triangle-right {\n    right: -16px;\n    top: 0;\n    bottom: 0;\n}\n.tooltip > .cicon-triangle-bottom {\n    bottom: -16px;\n    left: 0;\n    right: 0;\n}\n.tooltip > .cicon-triangle-left {\n    left: -16px;\n    top: 0;\n    bottom: 0;\n}\n.tooltip > .cicon-triangle-top {\n    top: -16px;\n    left: 0;\n    right: 0;\n}\n.tooltip.top > .cicon-triangle-bottom {\n  display: inherit;\n}\n.tooltip.right > .cicon-triangle-left {\n  display: inherit;\n}\n.tooltip.bottom > .cicon-triangle-top {\n  display: inherit;\n}\n.tooltip.left > .cicon-triangle-right {\n  display: inherit;\n}\n", ""]);

// exports


/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(57);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Slider',
  components: {
    'cmpTooltip': _index2.default
  },
  props: {
    value: {
      default: 0
    },
    disabled: {
      default: false
    },
    max: {
      default: 0
    },
    theme: {
      default: 'var(--theme)'
    }
  },
  data: function data() {
    return {
      //
    };
  },

  computed: {
    tipText: function tipText() {
      var maxData = 0;

      try {
        maxData = parseInt(this.max);
      } catch (e) {
        //
      }
      return maxData ? parseInt(this.value / 100 * maxData) : this.value;
    },
    ctheme: function ctheme() {
      return this.disabled ? '#c0c4cc' : this.theme;
    }
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('mouseup', this.toggleWindowEvent);
    window.removeEventListener('touchend', this.toggleWindowEvent);
  },
  mounted: function mounted() {
    window.addEventListener('mouseup', this.toggleWindowEvent);
    window.addEventListener('touchend', this.toggleWindowEvent);
  },
  methods: {
    /* 根据鼠标位置设置滑块位置 */
    setPositionByMouse: function setPositionByMouse(e) {
      var p = this.getMousexOnBar(e);

      this.setPosition(p);
    },
    /* 设置滑块位置 */
    setPosition: function setPosition(percent) {
      if (!this.disabled) {
        this.$emit('input', percent);
        this.$refs.ttp.update();
      }
    },
    /* 获取跑道相对位置 */
    getRunwayPosition: function getRunwayPosition() {
      var domRunway = this.$refs.runway;

      return {
        left: domRunway.offsetLeft,
        top: domRunway.offsetTop
      };
    },
    /* 获取鼠标所在位置所占目标区域的百分比 */
    getMousexOnBar: function getMousexOnBar(event) {
      var domRunway = this.$refs.runway;
      var rwp = this.getRunwayPosition();
      var mp = this.mousePosition(event);
      var runwayWidth = domRunway.offsetWidth;
      var percent = (mp.x - rwp.left) / runwayWidth * 100;

      percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;
      return Math.round(percent);
    },
    /* 获取鼠标坐标 */
    mousePosition: function mousePosition(event) {
      var e = event || window.event;

      if (e.type === 'touchmove') {
        e.clientY = e.touches[0].clientY;
        e.clientX = e.touches[0].clientX;
      }
      return {
        x: e.clientX || e.pageX || e.x,
        y: e.clientY || e.pageY || e.y
      };
    },
    toggleWindowEvent: function toggleWindowEvent(type) {
      if (type === 'add') {
        window.addEventListener('mousemove', this.setPositionByMouse);
        window.addEventListener('touchmove', this.setPositionByMouse);
      } else {
        window.removeEventListener('mousemove', this.setPositionByMouse);
        window.removeEventListener('touchmove', this.setPositionByMouse);
      }
    }
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
//
//
//
//
//

/***/ })

/******/ });
});