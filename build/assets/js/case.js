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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 560);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var scale = 1;
var winWidth = $(window).width();
if (winWidth >= 1920) {
    scale = 1.5;
} else if (winWidth >= 1600) {
    scale = 1.2;
} else {}
// ...


// 全局方法
var g = {
    $doc: $(document), // 存成变量，方便打包压缩
    scale: scale, // 默认phone 的缩放
    defaultWidth: 320, // 默认宽度
    defaultHeight: 486 // 默认高度，这个会在长页判断用到
};

exports.default = g;

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(59);

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = __webpack_require__(82);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.addNewPageData = addNewPageData;
exports.getViewDom = getViewDom;
exports.getPageListDom = getPageListDom;
exports.copyPageData = copyPageData;
exports.pushLayerData = pushLayerData;
exports.setPageClass = setPageClass;
exports.getPageClass = getPageClass;
exports.setLayerClass = setLayerClass;
exports.getLayerClass = getLayerClass;
exports.getDataLayers = getDataLayers;
exports.getDataLayer = getDataLayer;
exports.getDataPage = getDataPage;
exports.getNowPage = getNowPage;
exports.removeDataPage = removeDataPage;
exports.removeDataLayer = removeDataLayer;
exports.setDataApp = setDataApp;
exports.setAppDataEdit = setAppDataEdit;
exports.AppDataChange = AppDataChange;
exports.saveHistory = saveHistory;

var _localStorage = __webpack_require__(156);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 添加新的页面
// obj.index 插入位置， obj.page 插入页面， obj.pageName 页面名字
function addNewPageData(obj) {
    if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object') {
        return;
    }
    var index = obj['index'] || AppData.data[AppData.edit.pageType].length + 1;

    // slider 继承上一次
    var page = obj.page;
    AppData.data[AppData.edit.pageType].splice(index, 0, page);
    AppDataChange();
}

// 获取view 对象
// 获取当前的 view 区域对象
function getViewDom() {
    var $view = null;
    if (AppData.edit.pageType === 'pages') {
        $view = $('#pageView');
    } else if (AppData.edit.pageType === 'popups') {
        $view = $('#pageViewPopup');
    } else if (AppData.edit.pageType === 'fixeds') {
        var index = $('#fixedsList').find('.active').index();
        $view = $('.pageViewFixed').eq(index);
    } else {
        // ... 其他
    }
    return $view;
}

// 获取当前的 getPageListDom
function getPageListDom() {
    var $list = null;
    if (AppData.edit.pageType === 'pages') {
        $list = $('#pagesList');
    } else if (AppData.edit.pageType === 'popups') {
        $list = $('#popupsList');
    } else if (AppData.edit.pageType === 'fixeds') {
        $list = $('#fixedsList');
    } else {
        // ... 其他
    }
    return $list;
}

// 复制页面
function copyPageData(index) {
    var page = JSON.parse((0, _stringify2.default)(AppData.data[AppData.edit.pageType][index - 1]));
    AppData.data[AppData.edit.pageType].splice(index, 0, page);
    AppDataChange();
}

// 插入layer
function pushLayerData(obj, Page) {
    var layers = getDataLayers(); // 数组

    // 如果 layers 没有
    if (!layers) {
        $.tip({
            msg: '请先新建页面', //
            type: 'danger', //success,danger,warning
            time: 3000 //
        });
        return;
    }

    // 在前面插入
    layers.splice(0, 0, obj);
    // console.log(layers, AppData.edit.pageIndex)
    // 重置layers
    Page[Page.className].layers = layers;
    AppDataChange();
}

// 设置 page 类
function setPageClass(self) {
    console.log('setPageClass', self.className);
    AppData.edit.pageClass = self;
    AppData.edit.pageType = self.className + 's'; // 设置类型
}

// 获取当前编辑的页面的 类
function getPageClass() {
    return AppData.edit.pageClass;
}

// 设置 layer 类
function setLayerClass(self) {
    AppData.edit.layerClass = self;
}

function getLayerClass() {
    return AppData.edit.layerClass;
}

//获取 当前页面的 layers
function getDataLayers() {
    var page = AppData.data[AppData.edit.pageType][AppData.edit.pageIndex] || [];
    return page.layers;
}

//获取 当前页面的 layer
function getDataLayer() {
    return AppData.data[AppData.edit.pageType][AppData.edit.pageIndex].layers[AppData.edit.layerIndex];
}

//获取 index  页面
function getDataPage(index) {
    return AppData.data[AppData.edit.pageType][index];
}

// 获取当前page
function getNowPage() {
    var page = null;
    if (AppData.edit.pageIndex !== null) {
        page = getDataPage(AppData.edit.pageIndex);
    }
    return page;
}

// 删除 index 的 页面
function removeDataPage(index) {
    AppData.data[AppData.edit.pageType].remove(index);
    AppDataChange();
}

// 删除 对应 page 下面的 index
function removeDataLayer(index) {
    var cName = AppData.edit.pageType;
    AppData.data[cName][AppData.edit.pageIndex].layers.remove(index);
    AppDataChange();
}

// 设置 app 其他参数 name, info, img
function setDataApp(obj) {
    if (obj.name) {
        AppData.data.name = obj.name;
    }
    if (obj.info) {
        AppData.data.info = obj.info;
    }
    if (obj.img) {
        AppData.data.img = obj.img;
    }
    AppDataChange();
}

// 设置 AppData.edit
function setAppDataEdit(obj, change) {
    for (var key in obj) {
        AppData.edit[key] = obj[key];
    }
    if (change === true) {
        AppDataChange();
    }
}

// 变化监听
function AppDataChange() {
    (0, _localStorage.setStorage)('APP_DATA', AppData.data);
    $(document).trigger('appDataChange', true);
    console.log('app data 改变, 设置缓存');
}

// 存个历史记录，自动监听了输入框，表单的历史记录，其他历史记录需要手动加入
function saveHistory() {
    var cName = AppData.edit.pageType;
    var index = AppData.edit.pageIndex;
    var page = AppData.data[cName][index];
    // 删除之前先存个历史记录
    AppData.edit.history.push((0, _stringify2.default)({
        page: page,
        index: index
    }));
}

// // 
// window.AppData = new Proxy(AppData, {
//   set: function (target, key, value, receiver) {
//     console.log(`setting ${key}!`);
//     return Reflect.set(target, key, value, receiver);
//   }
// });

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(80)('wks');
var uid = __webpack_require__(61);
var Symbol = __webpack_require__(14).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 14 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(14);
var core = __webpack_require__(13);
var ctx = __webpack_require__(41);
var hide = __webpack_require__(27);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(22);
var IE8_DOM_DEFINE = __webpack_require__(112);
var toPrimitive = __webpack_require__(84);
var dP = Object.defineProperty;

exports.f = __webpack_require__(23) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(28);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(46)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(21);
var createDesc = __webpack_require__(60);
module.exports = __webpack_require__(23) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(69);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(153);
var defined = __webpack_require__(71);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 44 */,
/* 45 */,
/* 46 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(163), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(21).f;
var has = __webpack_require__(32);
var TAG = __webpack_require__(11)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(259);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(80)('keys');
var uid = __webpack_require__(61);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(28);
var document = __webpack_require__(14).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(22);
var dPs = __webpack_require__(166);
var enumBugKeys = __webpack_require__(81);
var IE_PROTO = __webpack_require__(73)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(77)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(115).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(70);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(14);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 81 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(228);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(230);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(72);
var $export = __webpack_require__(20);
var redefine = __webpack_require__(113);
var hide = __webpack_require__(27);
var has = __webpack_require__(32);
var Iterators = __webpack_require__(42);
var $iterCreate = __webpack_require__(165);
var setToStringTag = __webpack_require__(62);
var getPrototypeOf = __webpack_require__(116);
var ITERATOR = __webpack_require__(11)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(28);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(114);
var enumBugKeys = __webpack_require__(81);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(71);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initControl = initControl;
exports.layerShow = layerShow;
exports.uniqendLayer = uniqendLayer;

var _basicTpl = __webpack_require__(152);

var _basicMoreTpl = __webpack_require__(175);

var _AppDataFun = __webpack_require__(10);

//初始化控制器
// 通过 AppData里面的 参数 自动实例化
//基础模版
function initControl(self) {

    var $pageView = (0, _AppDataFun.getViewDom)();
    var $nowlayer = $pageView.find('.layer').eq(AppData.edit.layerIndex);

    var $control = $pageView.find('.mt-control');
    var style = self[self.className].style;

    //先注销之前的控制器
    if ($control[0]) {
        $control.remove();
        $control = null;
    }

    //初始化当前的控制器
    $nowlayer.control({
        movex: true,
        movey: true,
        rotate: true,
        autosize: true,
        fixedsize: true
    });

    //控制器事件绑定
    $nowlayer.off('change').on('change', function (e, data) {
        // 如果data没值，说明是点击事件，直接跳过
        if (!data) {
            return;
        }

        // 设置 style 对象
        for (var key in data) {
            if (key === 'rotate') {
                // 迭代中可能出现BUG，如果 transform 用了其他的值，比如 scale , translate 等 这里就不能这样处理
                style['transform'] = 'rotate(' + data[key] + ')';
            } else {
                style[key] = parseInt(data[key], 10) + 'px';
            }
        }

        // 如果是旋转
        if (data['rotate']) {
            // 同步 transform
            (0, _basicMoreTpl.asyncRotate)(style);
        } else {
            // 同步基本设置
            (0, _basicTpl.asyncBasic)(style);
        }

        // 监听变化
        (0, _AppDataFun.AppDataChange)();
    });
}

/**
 * 控制layer 设置区域的隐藏，显示
 */
// 拓展模版
function layerShow(dom) {
    //显示layer or 隐藏app设区域
    $('.setlayer').hide();
    // if(dom === '#setAppBox') {
    //     // 清空AppData.edit
    //     AppData.edit = Object.assign(AppData.edit, {
    //         pageIndex: null, // 默认编辑页面 index
    //         pageClass: null, //当前编辑的 page 类
    //         layerIndex: null, // 默认选中的layer index
    //         layerDom: null, // 当前编辑的layer Dom对象
    //         layerClass: null // 当前编辑的layer 类
    //     });
    // }
    $(dom).show();
}

/**
 * @desc layer 排序
 * @param self 当前的page 类
 * @param data {from: 0, to: 2}
*/
function uniqendLayer(self, data) {
    console.log('排序', data);

    // 存个历史记录
    (0, _AppDataFun.saveHistory)();

    //交换layers。需要重新排序 from 变成了 to， 但是 from - to 中间这段，都加了1
    var arr = self[self.className].layers;
    var fromData = arr[data.from];

    // 从下往上
    if (data.from > data.to) {
        for (var _i = 0; _i < data.from - data.to; _i++) {
            var index = data.from - _i;
            arr[index] = arr[index - 1];
            console.log('排序次数', index, index - 1);
        }
    } else {
        // 从上往下
        for (var _i2 = 0; _i2 < data.to - data.from; _i2++) {
            var _index = data.from + _i2;
            arr[_index] = arr[_index + 1];
            console.log('排序次数', _index, _index + 1);
        }
    }
    console.log('排序次数', data.from, data.to);
    arr[data.to] = fromData;

    //设置z-index 属性 . 备注：这里 z-index 最大为9999
    for (var i = 0; i < arr.length; i++) {
        arr[i].style['z-index'] = 9999 - i;
    }

    //重新渲染viewPage， 重新渲染必须在 self.newLayer 之前，因为 newLayer 里面会设置 AppData.edit.layerDom 
    self.initPageDom();

    //渲染控制器
    var $active = $('#layerlist').find('.active');
    if ($active[0]) {
        var _index2 = $active.index();
        //new layer
        self.newLayer(_index2);
    }

    // 重新渲染列表
    // self.initLayerList();

    (0, _AppDataFun.AppDataChange)();
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(164)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(83)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(177);

var _promise2 = _interopRequireDefault(_promise);

exports.openDB = openDB;
exports.deleteDB = deleteDB;
exports.closeDB = closeDB;
exports.addData = addData;
exports.putData = putData;
exports.getDataByKey = getDataByKey;
exports.getAllData = getAllData;
exports.deleteData = deleteData;
exports.clearData = clearData;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 关系型数据库 
// @param INDEXEDDB_DB : 全局的数据库实例化对象
var conf = {
    name: 'H5DS', // 数据库名字
    version: 1, // 版本
    ojstore: {
        "img": { keyPath: "id" // 主健id
        } }
};

/**
 * 打开数据库
 */
function openDB() {

    return new _promise2.default(function (resolve, reject) {
        var indexedDB = window.indexedDB || window.webkitindexedDB;
        var request = indexedDB.open(conf.name);

        request.onerror = function (e) {
            console.error(e.currentTarget.error.message);
            reject(false);
        };
        request.onsuccess = function (e) {
            window.INDEXEDDB_DB_RET = e.target.result;
            console.log('成功建立并打开数据库:' + conf.name + ' version' + conf.version);
            resolve(true);
        };
        request.onupgradeneeded = function (e) {
            var db = e.target.result;
            var transaction = e.target.transaction;

            for (var key in conf.ojstore) {
                if (!db.objectStoreNames.contains(key)) {
                    //没有该对象空间时创建该对象空间
                    db.createObjectStore(key, conf.ojstore[key]);
                    console.log('成功建立对象存储空间：' + key);
                }
            }
        };
        window.INDEXEDDB_DB = indexedDB;
    });
}

/**
 * 删除数据库
 */
function deleteDB(dbname) {
    var self = this;
    INDEXEDDB_DB.deleteDatabase(dbname);
    console.log(dbname + '数据库已删除');
}

//关闭数据库
function closeDB() {
    INDEXEDDB_DB_RET.close();
    console.log('数据库已关闭');
}

//添加数据，重复添加会报错
function addData(storename, data, callback) {
    var store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    for (var i = 0; i < data.length; i++) {
        var request = store.add(data[i]);
        request.onerror = function () {
            console.error('add添加数据库中已有该数据');
        };
        request.onsuccess = function () {
            console.log('add添加数据已存入数据库');
            callback();
        };
    }
}

// 添加数据，重复添加会更新原有数据
function putData(storename, data) {
    console.log(data);
    var store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    for (var i = 0; i < data.length; i++) {
        var request = store.put(data[i]);
        request.onerror = function () {
            console.error('put添加数据库中已有该数据');
        };
        request.onsuccess = function () {
            console.log('put添加数据已存入数据库');
        };
    }
}

//根据存储空间的键找到对应数据
function getDataByKey(storename, key, callback) {
    var store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    var request = store.get(key);
    request.onerror = function () {
        console.error('getDataByKey error');
    };
    request.onsuccess = function (e) {
        var result = e.target.result;
        console.log('查找数据成功');
        console.log(result);
        $(document).off('event_getDataByKey').on('event_getDataByKey', result);
        if (callback) {
            callback(result);
        }
    };
}

// 获取全部数据 ，根据 storename
function getAllData(storename, callback) {
    var store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    var request = store.openCursor();
    var data = [];
    request.onerror = function () {
        console.error('getDataByKey error');
    };
    request.onsuccess = function (e) {
        var result = e.target.result;
        if (result && result !== null) {
            data.push(result.value);
            result.continue();
        } else {
            if (callback) {
                console.log('全部查找数据成功');
                callback(data);
            }
        }
    };
}

//删除某一条记录
function deleteData(storename, key) {
    var store = store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    store.delete(key);
    console.log('已删除存储空间' + storename + '中' + key + '记录');
}

//删除存储空间全部记录
function clearData(storename) {

    var store = INDEXEDDB_DB_RET.transaction(storename, 'readwrite').objectStore(storename);
    store.clear();
    console.log('已删除存储空间' + storename + '全部记录');
}

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(47);
var TAG = __webpack_require__(11)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(41);
var call = __webpack_require__(158);
var isArrayIter = __webpack_require__(159);
var anObject = __webpack_require__(22);
var toLength = __webpack_require__(79);
var getIterFn = __webpack_require__(160);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(263), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(82);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(266);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(270);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(82);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSysImgTypes = getSysImgTypes;
exports.saveData = saveData;
exports.getSysTpls = getSysTpls;
exports.getSysTplsTypes = getSysTplsTypes;
exports.getUserTpls = getUserTpls;
exports.addUserTpls = addUserTpls;
exports.delUserTpls = delUserTpls;
exports.getSysImgs = getSysImgs;
exports.getAppData = getAppData;
exports.getUserImgs = getUserImgs;
exports.getMp3 = getMp3;
exports.uploadImgBase64 = uploadImgBase64;
exports.delImg = delImg;
// 获取图片素材分类
function getSysImgTypes() {
    return $.ajax({
        type: 'post',
        url: '/api/getSysImgTypes',
        dataType: 'json'
    });
}

// 保存APP
// obj : { name: '', pageSize: 20, pageNum: 1 }
function saveData(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/saveData',
        data: obj,
        dataType: 'json'
    });
}

// 获取模板素材
// obj : { name: '', pageSize: 20, pageNum: 1 }
function getSysTpls(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/getSysTpls',
        data: obj,
        dataType: 'json'
    });
}

// 获取模板素材分类
function getSysTplsTypes() {
    return $.ajax({
        type: 'post',
        url: '/api/getSysTplsTypes',
        dataType: 'json'
    });
}

// 获取我的模板
function getUserTpls(data) {
    return $.ajax({
        data: data,
        type: 'post',
        url: '/api/getUserTpls',
        dataType: 'json'
    });
}

// 添加我的模板
function addUserTpls(data) {
    return $.ajax({
        data: data,
        type: 'post',
        url: '/api/addUserTpls',
        dataType: 'json'
    });
}

// 删除我的模板
function delUserTpls(data) {
    return $.ajax({
        data: data,
        type: 'post',
        url: '/api/delUserTpls',
        dataType: 'json'
    });
}

// 获取图片素材
// obj : { name: '', pageSize: 20, pageNum: 1 }
function getSysImgs(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/getSysImgs',
        data: obj,
        dataType: 'json'
    });
}

// 获取app json
// obj : { appid: 1 }
function getAppData(obj) {
    //获取APP对象
    return $.ajax({
        type: 'post',
        url: '/api/getUserApp',
        data: obj,
        dataType: 'json'
    });
}

// 获取我的图片
// obj : { pageSize: 20, pageNum: 1 }
function getUserImgs(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/getUserImgs',
        data: obj,
        dataType: 'json'
    });
}

// 获取音乐
// obj : { pageSize: 20, pageNum: 1 }
function getMp3(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/getMp3',
        data: obj,
        dataType: 'json'
    });
}

// 上传图片
// obj : { imgData: xx}
function uploadImgBase64(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/uploadBase64',
        data: obj,
        dataType: 'json'
    });
}

/**
 * @desc 删除用户图片
 * @param id 图片ID
*/
function delImg(obj) {
    return $.ajax({
        type: 'post',
        url: '/api/delUserImgs',
        data: obj,
        dataType: 'json'
    });
}

/***/ }),
/* 110 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 111 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(23) && !__webpack_require__(46)(function () {
  return Object.defineProperty(__webpack_require__(77)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(27);


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(32);
var toIObject = __webpack_require__(43);
var arrayIndexOf = __webpack_require__(167)(false);
var IE_PROTO = __webpack_require__(73)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(14).document;
module.exports = document && document.documentElement;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(32);
var toObject = __webpack_require__(86);
var IE_PROTO = __webpack_require__(73)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(169);
var global = __webpack_require__(14);
var hide = __webpack_require__(27);
var Iterators = __webpack_require__(42);
var TO_STRING_TAG = __webpack_require__(11)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(11);


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(14);
var core = __webpack_require__(13);
var LIBRARY = __webpack_require__(72);
var wksExt = __webpack_require__(118);
var defineProperty = __webpack_require__(21).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 120 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 121 */
/***/ (function(module, exports) {



/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.arrToObj = arrToObj;
exports.isNull = isNull;
// 数组 [{key1: val1}, {key2: val2}] => {key1: val1, key2: val2}
function arrToObj(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Object) {
            if (obj[arr[i]['id']] === undefined) {
                obj[arr[i]['id']] = arr[i]['value'];
            }
        }
    }
    return obj;
}

// 判断是否是 null, '', undefined
function isNull(val) {
    if (val === null || val === '' || val === undefined) {
        return true;
    } else {
        return false;
    }
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(69);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isPC = isPC;
exports.lazyLoad = lazyLoad;
exports.svgLazy = svgLazy;
exports.autoPlayMusic = autoPlayMusic;
exports.resizeWindow = resizeWindow;
exports.initMap = initMap;
exports.langPage = langPage;
var MAPS = []; // 缓存地图资源.

/**
 * @desc 数组去重
*/
function uniqueArr(arr) {
    var obj = {};
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        var d = arr[i];
        if (!obj[d]) {
            obj[d] = true;
            newArr.push(d);
        }
    }
    return newArr;
}

/**
 * @desc 判断是否是PC
 * @return boolen
*/
function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

/**
 * @desc 图片进行预加载
*/
function lazyLoad() {

    // 进度条，绑定事件
    var $h5dsProgress = $('#h5dsProgress');
    $('#h5dsLoading').on('loadbar', function (e, pre) {
        $h5dsProgress.text(pre.toFixed(2) * 100 + '%');
        if (pre === 1) {
            $(this).hide();
            // 自动播放音乐
            autoPlayMusic();
        }
    });

    // ...
    var maxLoad = 10; // 默认加载10个
    var imgSource = [];
    try {
        if ($.isArray(IMG_SOURCE)) {
            imgSource = IMG_SOURCE;
        } else {
            imgSource = JSON.parse(IMG_SOURCE);
        }
        imgSource = uniqueArr(imgSource); // 去重，重复图片不再加载
    } catch (e) {
        // IMG_SOURCE 未定义
    }
    var len = imgSource.length;
    var $loading = $('#h5dsLoading');

    // 完成
    if (len === 0) {
        $loading.trigger('loadbar', 1);
    } else {
        var num = 0;
        // 默认加载前20个图
        imgSource.forEach(function (elem, index) {
            num++;
            if (index > maxLoad) {
                return;
            }
            var img = new Image();
            img.src = elem;
            if (img.complete) {
                // 如果图片已经存在于浏览器缓存 或者加载失败
                $loading.trigger('loadbar', num / len);
            } else {
                img.onload = function () {
                    $loading.trigger('loadbar', num / len);
                };
                img.onerror = function () {
                    $loading.trigger('loadbar', num / len);
                };
            }
        });
    }
}

/**
 * @desc svg 预加载
 */
function svgLazy() {
    // svg 预处理
    $('#h5dsSwiper').find('.layer-svg').each(function () {
        var $this = $(this).find('.element');
        var src = $this.attr('data-svglazy');
        var color = $this.attr('data-color').split('@');
        $.get(src).done(function (svg) {
            // 预设SVG颜色
            var $svg = $(svg);
            color.forEach(function (elem, index) {
                $svg.find('path').eq(index).attr('fill', elem);
            });
            var str = $svg.find('svg').prop('outerHTML');
            $this.html(str);
        });
    });
}

/**
 * @desc 音乐播放
*/
function autoPlayMusic() {
    var $audio = $('#h5dsBgMusic');
    var $icon = $('.h5ds-video-icon');
    if ($audio[0]) {
        $audio[0].play();
        $(document).one('WeixinJSBridgeReady', function () {
            $audio[0].play();
        });
        $icon.addClass('h5ds-video-iconing');
    }

    // 控制音乐
    $icon.swipe({
        tap: function tap(e) {
            if ($(this).hasClass('h5ds-video-iconing')) {
                $audio[0].pause();
                $(this).removeClass('h5ds-video-iconing');
            } else {
                $audio[0].play();
                $(this).addClass('h5ds-video-iconing');
            }
        }
    });
}

/**
 * @desc 屏幕变化
*/
function resizeWindow() {
    $(window).resize(function () {
        if (!isPC()) {
            var scaleNew = 1;
            try {
                scaleNew = h5dsScreen();
            } catch (e) {
                // ...
            }
            $('meta[name="viewport"]').attr('content', 'width=320, initial-scale=' + scaleNew + ', maximum-scale=' + scaleNew + ', user-scalable=no');
            // 计算出当前宽度
            $('.h5ds-swiper-layers').css({
                left: LAYER_LEFT,
                top: LAYER_TOP
            });
        }
    });
}

/**
 * @desc 初始化地图, 滑动到某页之后，直接渲染对应的地图
*/
function initMap($in) {

    // 先销毁之前的地图，释放内存
    for (var i = 0; i < MAPS.length; i++) {
        MAPS[i].destroy();
        // $('.amap-sug-result').remove();
    }

    $in.find('.layer-map').each(function () {
        var $dom = $(this);
        var data = $dom.attr('data-map');
        try {
            data = JSON.parse(unescape(data));
        } catch (e) {
            data = null;
            console.warn('data-uefun 格式错误！具体见：', unescape(data), this);
        }
        if (!data) {
            return;
        }

        var map = new AMap.Map($dom.find('.element')[0], {
            resizeEnable: true,
            zoom: data.zoom || 10,
            center: data.position
        });

        // 加载自定义 信息框 插件
        map.plugin(['AMap.AdvancedInfoWindow'], function () {
            var maker = new AMap.Marker({
                map: map,
                position: data.position,
                icon: "http://webapi.amap.com/images/0.png"
            });

            // 显示信息
            var mapInfo = new AMap.AdvancedInfoWindow({
                content: '<div class="amap-infos" contenteditable="true">' + data.infos || '输入描述内容' + '</div>',
                offset: new AMap.Pixel(0, -30),
                asOrigin: false,
                asDestination: false,
                transit: false,
                driving: false,
                placeSearch: false
            });

            if (data.status) {
                mapInfo.open(map, data.position);
            }

            // 点击标记事件
            AMap.event.addListener(maker, 'click', function (e) {
                mapInfo.open(map, [e.target.F.position.lng, e.target.F.position.lat]);
            });
        });

        MAPS.push(map);
    });
}

/**
 * @desc 监听 长页
*/
function langPage() {

    var winHei = window.innerHeight;
    $('[data-noswiper="noSwiper"]').parent().on('scroll', function (e) {
        var $noSwiper = $(this).find('[data-noswiper="noSwiper"]');
        var hei = $noSwiper.height();
        var scrollTop = $(this).scrollTop();
        var sctop = parseInt(scrollTop + winHei, 10);
        var lock = $(this).attr('data-lock');
        if (lock === 'true') {
            return;
        }
        if (scrollTop >= 0 && scrollTop <= 10) {
            $noSwiper.removeClass('noSwiper downSwiper').addClass('upSwiper');
        } else if (hei >= sctop - 10 && hei <= sctop + 10) {
            $noSwiper.removeClass('noSwiper upSwiper').addClass('downSwiper');
        } else {
            $noSwiper.addClass('noSwiper').removeClass('upSwiper downSwiper');
        }
    });
}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//提示信息
$.tip = function (setting) {
    var defaults = {
        msg: '操作成功', //
        type: 'success', //success,danger,warning
        time: 3000, //
        callback: null //
    };
    var set = $.extend(defaults, setting || {});
    tipsMsg(set);
};

function tipsMsg(obj) {
    var id = 'mt_' + new Date().getTime();
    var type = 'mt-tip-' + obj.type + ' animated fadeInDown';
    if (!$('body').find('.mt-tip-group')[0]) {
        $('body').append('<div class="mt-tip-group"></div>');
    }
    $('.mt-tip-group').append('<div class="mt-tip-inner"><div class="' + type + '" id="' + id + '">' + obj.msg + '</div></div>');
    if (!obj.time) {
        obj.time = 3000;
    }
    setTimeout(function () {
        var $id = $('#' + id);
        $id.removeClass('fadeInDown').addClass('fadeOutUp');
        setTimeout(function () {
            $id.remove();
            if (obj.callback) {
                obj.callback($id);
            }
        }, 800);
    }, obj.time);
}

/***/ }),
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.basicTpl = basicTpl;
exports.asyncBasic = asyncBasic;
exports.domDataBindSelf = domDataBindSelf;
exports.basicEvent = basicEvent;

var _AppDataFun = __webpack_require__(10);

// 基础set的模板
function basicTpl(obj) {
    return '\n    <div class="set-baisc">\n        <div class="tr set-basic-tips">\n            <span><em>\u56FE\u5C42ID</em> <input id="basicTpl_set_id" class="mt-input" value="' + obj.id + '" type="" placeholder="\u5B57\u6BCD" ></span>\n            <span><i>\uFF08id\u7528\u4E8E\u8BBE\u7F6E\u4EA4\u4E92\uFF0C\u9ED8\u8BA4\u4E3A\u7A7A\uFF09</i></span>\n        </div>\n\t\t<div class="tr">\n\t\t\t<span><em>x\u5750\u6807</em> <input mt-wheel="0,1,10000" id="basicTpl_set_x" mt-type="px" class="mt-input" value="' + obj.x + '" type="" placeholder="x\u5750\u6807"></span>\n\t\t\t<span><em>y\u5750\u6807</em> <input mt-wheel="0,1,10000" id="basicTpl_set_y" mt-type="px" class="mt-input" value="' + obj.y + '" type="" placeholder="y\u5750\u6807"></span>\n\t\t</div>\n\t\t<div class="tr">\n\t\t\t<span><em>\u5BBD\u5EA6</em> <input mt-wheel="0,1,10000" id="basicTpl_set_width" mt-type="px" mt-min="0" class="mt-input" value="' + obj.width + '" type="" placeholder="\u5BBD" ></span>\n\t\t\t<span><em>\u9AD8\u5EA6</em> <input mt-wheel="0,1,10000" id="basicTpl_set_height" mt-type="px" mt-min="0" class="mt-input" value="' + obj.height + '" type="" placeholder="\u9AD8" ></span>\n        </div>\n\t</div>\n';
}

// 给set模板赋值
function asyncBasic(style) {
    var top = style.top,
        left = style.left,
        height = style.height,
        width = style.width;

    $('#basicTpl_set_x').val(left);
    $('#basicTpl_set_y').val(top);
    $('#basicTpl_set_height').val(height);
    $('#basicTpl_set_width').val(width);
}

// 同时设置 DOM，self 的值
function domDataBindSelf(obj, self) {
    if (!AppData.edit.layerDom) {
        return false;
    }
    for (var key in obj) {
        self.layer.style[key] = obj[key];
    }
    AppData.edit.layerDom.css(obj);
    (0, _AppDataFun.AppDataChange)();
}

// 事件绑定
function basicEvent(self) {

    // 设置 id
    $('#basicTpl_set_id').off('change').on('change', function (e) {
        var val = $(this).val();
        if (val && !/^[a-zA-Z_]\w+$/.test(val)) {
            $.tip({
                msg: 'id格式错误，id必须是字母开头且由字母，下划线组成', //
                type: 'danger', //success,danger,warning
                time: 3000 //
            });
            return;
        }
        if (!AppData.edit.layerDom) {
            return false;
        }
        self.layer.id = val;
        (0, _AppDataFun.AppDataChange)();
    });

    // 设置 x
    $('#basicTpl_set_x').off('changes').on('changes', function (e) {
        var val = $(this).val();
        domDataBindSelf({
            left: parseInt(val, 10) + 'px'
        }, self);
    });

    // 设置 y
    $('#basicTpl_set_y').off('changes').on('changes', function (e) {
        var val = $(this).val();
        domDataBindSelf({
            top: parseInt(val, 10) + 'px'
        }, self);
    });

    // 设置 width
    $('#basicTpl_set_width').off('changes').on('changes', function (e) {
        var val = $(this).val();
        domDataBindSelf({
            width: parseInt(val, 10) + 'px'
        }, self);
    });

    // 设置 height
    $('#basicTpl_set_height').off('changes').on('changes', function (e) {
        var val = $(this).val();
        domDataBindSelf({
            height: parseInt(val, 10) + 'px'
        }, self);
    });
}

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(47);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(61)('meta');
var isObject = __webpack_require__(28);
var has = __webpack_require__(32);
var setDesc = __webpack_require__(21).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(46)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(59);

var _stringify2 = _interopRequireDefault(_stringify);

exports.setStorage = setStorage;
exports.getStorage = getStorage;
exports.clearStorage = clearStorage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 设置  本地缓存
 */
function setStorage(key, obj) {
    if (typeof obj === 'string') {
        localStorage.setItem(key, obj);
    } else {
        localStorage.setItem(key, (0, _stringify2.default)(obj));
    }
}

/**
 * 获取
 */
function getStorage(key) {
    var val = localStorage.getItem(key);
    try {
        return JSON.parse(val);
    } catch (e) {
        return val;
    }
}

/**
 * 删除， 如果不传值，删除所有
 */
function clearStorage(key) {
    if (key) {
        localStorage.removeItem(key);
    } else {
        localStorage.clear();
    }
}

/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(22);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(42);
var ITERATOR = __webpack_require__(11)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(104);
var ITERATOR = __webpack_require__(11)('iterator');
var Iterators = __webpack_require__(42);
module.exports = __webpack_require__(13).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(27);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imgTpl = imgTpl;
exports.convertBase64UrlToBlob = convertBase64UrlToBlob;
exports.base64ToUrl = base64ToUrl;
exports.initCrop = initCrop;

var _indexedDB = __webpack_require__(103);

var db = _interopRequireWildcard(_indexedDB);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// indexedDB

var imgNullTpl = '<div class="a-selectimg img-null">选择图片</div>';

function imgTpl(obj) {
    if (!obj || !obj.src) {
        return '\n        <div class="set-img set_img">\n            <div class="set_img_crop">' + imgNullTpl + '</div>\n        </div>\n        ';
    }
    if (obj.src.indexOf('#') !== -1) {
        obj.src = obj.src.split('#')[0];
    }
    // $crop 对象是 set_img_crop
    return '\n    <div class="set-img set_img">\n        <div data-oldsrc="' + obj.src + '" data-src="' + obj.src + '" class="set_img_crop"></div>\n    </div>';
}

/**  
 * 将以base64的图片url数据转换为Blob  
 * @param urlData  
 *        用url方式表示的base64图片数据  
 */
function convertBase64UrlToBlob(urlData) {
    var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte  
    //处理异常,将ascii码小于0的转换为大于0  
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

/**
 * base64 to url
 * @param base64
 * @param temp 时间戳
 * @return url
 */
function base64ToUrl(base64, temp) {
    var URL = window.URL || window.webkitURL;
    // 通过 file 生成目标 url
    return URL.createObjectURL(convertBase64UrlToBlob(base64)) + ('#' + temp);
}

/**
 *	图片剪切方法的初始化
 *	$crop: set_img_crop 对象
 *	set: crop 插件的参数
 *	self: 当前操作的类
 *	callback: 执行完成后的回调函数
 *  selectImgBack 选择图片的回调函数
 */
function initCrop(self, $crop, set, callback) {

    var obj = self[self.className];
    // 裁剪函数
    $crop.empty(); // 如果原来有对象，先清空DOM，和事件

    set.wh = set.wh || ['100%', '100%'];

    // 如果没图
    if (!$crop.crop(set)) {
        $crop.html(imgNullTpl);
    }

    // 绑定剪切事件
    $crop.off('crop').on('crop', function (e, data) {
        // 还原图片
        if (typeof data === 'string') {
            if (obj.type === 'img') {
                obj.data.src = data;
            } else {
                // 背景
                obj.style['background-image'] = data;
            }
            callback('reset');
        } else {
            // 图片上传

            var temp = +new Date();
            var imgURL = base64ToUrl(data.imgData, temp);

            // 存储图片到本地，提交的时候，再统一上传到服务器
            db.addData('img', [{
                id: temp,
                value: data.imgData
            }], function () {
                // 图片特殊处理
                if (obj.type === 'img') {
                    obj.data.src = imgURL;
                } else {
                    // 背景
                    obj.style['background-image'] = imgURL;
                }
                callback('crop');
            });
        }
    });

    // 清除背景图
    $crop.off('cropDel.' + self.className).on('cropDel.' + self.className, function (e) {
        $crop.attr({
            'data-oldsrc': '',
            'data-src': ''
        }).html(imgNullTpl);

        // 图片特殊处理, 这里只是清除图片。并没有删除图层
        if (obj.type === 'img') {
            obj.data.src = '';
        } else {
            // 背景
            obj.style['background-image'] = '';
        }
        callback('delete');
    });

    // 换图
    // $crop.off('cropNew.' + self.className).on('cropNew.' + self.className, function(e, val) {
    //     // console.log('换图', val);
    // })

    // 选择图片, 这里感觉右侧的编辑区域，判断当前应该调用哪个事件
    var evName = 'layer';
    if (!$('#setAppBox').is(':hidden')) {
        evName = 'app';
    } else if (!$('#setPageBox').is(':hidden')) {
        evName = AppData.edit.pageType;
    } else if (!$('#setLayerBox').is(':hidden')) {
        evName = 'layer';
    } else {}
    // ...


    // console.log('初始化选择图片的方法');
    $crop.off('selectImg.' + evName).on('selectImg.' + evName, function (e, val) {
        $crop.attr({
            'data-oldsrc': val,
            'data-src': val
        });
        if ($crop.find('.img-null')[0]) {
            $crop.crop(set);
        } else {
            //事件触发, 还原
            $crop.find('.mt-cropbtn-init').trigger('click'); // true : 不重新设置尺寸
        }
        // 选择后的回调函数
        $crop.trigger('selectImgBack', val);
        callback('select', val);
    });

    return $crop;
}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(13);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(70);
var defined = __webpack_require__(71);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(78);
var descriptor = __webpack_require__(60);
var setToStringTag = __webpack_require__(62);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(27)(IteratorPrototype, __webpack_require__(11)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(21);
var anObject = __webpack_require__(22);
var getKeys = __webpack_require__(85);

module.exports = __webpack_require__(23) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(43);
var toLength = __webpack_require__(79);
var toAbsoluteIndex = __webpack_require__(168);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(70);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(170);
var step = __webpack_require__(154);
var Iterators = __webpack_require__(42);
var toIObject = __webpack_require__(43);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(83)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 170 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 171 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(47);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(114);
var hiddenKeys = __webpack_require__(81).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(120);
var createDesc = __webpack_require__(60);
var toIObject = __webpack_require__(43);
var toPrimitive = __webpack_require__(84);
var has = __webpack_require__(32);
var IE8_DOM_DEFINE = __webpack_require__(112);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(23) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.basicMoreTpl = basicMoreTpl;
exports.asyncRotate = asyncRotate;
exports.setLayerDomAndObj = setLayerDomAndObj;
exports.baiscMoreEvent = baiscMoreEvent;

var _cssFilter = __webpack_require__(176);

var _funs = __webpack_require__(122);

var _AppDataFun = __webpack_require__(10);

/* 拓展参数 */
var radiusMax = 500; // 圆角最大参数

function basicMoreTpl(obj) {
    return '\n\t<div class="set-baiscmore">\n\t\t<div class="tr">\n\t\t\t<h5>\u65CB\u8F6C\u89D2\u5EA6</h5>\n\t\t\t<div mt-bind="basicMoreTpl_rotate_input" id="basicMoreTpl_rotate" mt-filter="*360" class="mt-slider-bar" data-val="' + (parseInt(obj.rotate || 0, 10) / 360 || 0) + '"></div>\n\t\t\t<input mt-wheel="0,1,360" mt-bind="basicMoreTpl_rotate" id="basicMoreTpl_rotate_input" mt-filter="/360" mt-min="0" mt-max="360" mt-type="deg" mt-fixed="4" class="mt-input" value="' + (obj.rotate || 0) + '" placeholder="\u5EA6\u6570">\n\t\t</div>\n\t\t<div class="tr">\n\t\t\t<h5>\u5706\u89D2</h5>\n\t\t\t<div mt-bind="basicMoreTpl_radius_input" mt-filter="*' + radiusMax + '" id="basicMoreTpl_radius" class="mt-slider-bar" data-val="' + (parseInt(obj.radius || 0, 10) / radiusMax || 0) + '"></div>\n\t\t\t<input mt-wheel="0,1,' + radiusMax + '" mt-fixed="5" mt-bind="basicMoreTpl_radius" mt-filter="/' + radiusMax + '" id="basicMoreTpl_radius_input" class="mt-input" mt-type="px" mt-min="0" mt-max="' + radiusMax + '" value="' + (obj.radius || 0) + '">\n\t\t</div>\n\t\t<div class="tr">\n\t\t\t<h5>\u900F\u660E\u5EA6</h5>\n\t\t\t<div mt-bind="basicMoreTpl_opacity_input" id="basicMoreTpl_opacity" class="mt-slider-bar" data-val="' + ((0, _funs.isNull)(obj.opacity) ? 1 : obj.opacity) + '"></div>\n\t\t\t<input mt-wheel="0,0.1,1" mt-bind="basicMoreTpl_opacity" id="basicMoreTpl_opacity_input" class="mt-input" mt-type="" mt-min="0" mt-max="1" value="' + obj.opacity + '">\n        </div>\n        <div class="tr">\n            <h5>\u9690\u85CF\u5143\u7D20</h5>\n            <div id="basicMoreTpl_hide_layer" class="mt-switch" data-val="' + (obj.display === 'none' ? 'on' : 'off') + '">\n                <a class="mt-switch-btn"></a>\n            </div>\n        </div>\n\t\t<div class="tr">\n\t\t\t<h5>\u5F00\u542F\u9634\u5F71</h5>\n\t\t\t<div id="basicMoreTpl_boxshadow_switch" data-toggle=\'[{"dom":"#basicMoreTpl_boxshadowStyleId","class":"show"}]\' class="mt-switch" data-val="' + ((0, _funs.isNull)(obj.boxshadow) ? 'off' : 'on') + '">\n\t\t\t\t<a class="mt-switch-btn"></a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="tr' + (!(0, _funs.isNull)(obj.boxshadow) ? ' show' : ' ') + '" id="basicMoreTpl_boxshadowStyleId" style="display: none;">\n\t\t\t<h5>\u9634\u5F71\u8BBE\u7F6E</h5>\n\t\t\t<div mt-bind="basicMoreTpl_boxshadow_input" mt-filter="*100" id="basicMoreTpl_boxshadow" class="mt-slider-bar" data-val="' + parseInt((0, _funs.isNull)(obj.boxshadow) ? 10 : obj.boxshadow, 10) / 100 + '"></div>\n\t\t\t<input mt-wheel="0,1,100" mt-fixed="2" mt-bind="basicMoreTpl_boxshadow" mt-filter="/100" id="basicMoreTpl_boxshadow_input" class="mt-input" mt-type="px" mt-min="0" mt-max="100" value="' + ((0, _funs.isNull)(obj.boxshadow) ? '10px' : obj.boxshadow) + '">\n\t\t\t<div class="tr">\n\t\t\t\t<h5>\u9634\u5F71\u989C\u8272</h5>\n\t\t\t\t<div class="mt-color" id="basicMoreTpl_boxshadowColor">\n\t\t\t\t\t<input id="basicMoreTpl_boxshadowColor_input" type="color" value="' + (obj.boxshadowColor || '#000') + '"/>\n\t\t\t\t\t\u900F\u660E\u5EA6\uFF1A<div id="basicMoreTpl_boxshadowOpactity" style="width:95px" class="mt-slider-bar" data-val="' + ((0, _funs.isNull)(obj.boxshadowOpacity) ? 1 : obj.boxshadowOpacity) + '"></div>\n\t\t\t\t\t<a class="mt-color-clear"><i class="iconfont icon-eraser"></i>\u6E05\u9664</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="tr">\n\t\t\t<h5>\u5F00\u542F\u8FB9\u6846</h5>\n\t\t\t<div id="basicMoreTpl_border_switch" data-toggle=\'[{"dom":"#basicMoreTpl_borderStyleId","class":"show"}]\' class="mt-switch" data-val="' + ((0, _funs.isNull)(obj.borderSize) ? 'off' : 'on') + '">\n\t\t\t\t<a class="mt-switch-btn"></a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="tr' + (!(0, _funs.isNull)(obj.borderSize) ? ' show' : ' ') + '" id="basicMoreTpl_borderStyleId" style="display:none">\n\t\t\t<h5>\u8FB9\u6846\u7C7B\u578B</h5>\n\t\t\t<div class="mt-select">\n\t\t\t\t<select id="basicMoreTpl_borderStyle" value="' + (obj.borderType || 'solid') + '" placeholder="\u4E0B\u62C9\u9009\u62E9">\n\t\t\t\t\t<option value="solid">\u5B9E\u7EBF</option>\n\t\t\t\t\t<option value="double">\u53CC\u7EBF</option>\n\t\t\t\t\t<option value="dashed">\u865A\u7EBF</option>\n\t\t\t\t\t<option value="dotted">\u70B9\u7EBF</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t\t&nbsp;&nbsp;&nbsp;&nbsp;\n\t\t\t<h5>\u8FB9\u6846\u5927\u5C0F</h5>\n\t\t\t<input mt-wheel="1,1,10000" id="basicMoreTpl_borderSize" class="mt-input" mt-type="px" mt-min="1" value="' + (obj.borderSize || '10px') + '" type="" name="">\n\t\t\t<div class="tr">\n\t\t\t\t<h5>\u8FB9\u6846\u989C\u8272</h5>\n\t\t\t\t<div class="mt-color">\n\t\t\t\t\t<input id="basicMoreTpl_borderColor" type="color" value="' + (obj.borderColor || '#000') + '"/>\n\t\t\t\t\t\u900F\u660E\u5EA6\uFF1A<div style="width:95px" id="basicMoreTpl_borderOpactiy" class="mt-slider-bar" data-val="' + ((0, _funs.isNull)(obj.borderOpacity) ? 1 : obj.borderOpacity) + '"></div>\n\t\t\t\t\t<a class="mt-color-clear"><i class="iconfont icon-eraser"></i>\u6E05\u9664</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n';
}

// 设置 set 里面的 rotate 滚动条和输入框参数
function asyncRotate(style) {
    console.log(style);
    var rotate = $.getTransform(style.transform, 'rotate');
    var $rotate = $('#basicMoreTpl_rotate').attr('data-val', parseInt(rotate, 10) / 360);
    $('#basicMoreTpl_rotate_input').val(rotate + 'deg');
    setSilderVal($rotate);
}

// dom: layer, element 对应设置的对象
function setLayerDomAndObj(dom, obj, self, nochange) {

    // 特殊情况不设置layerDom
    if (!AppData.edit.layerDom) {
        return;
    }

    // 先设置 self 属性
    for (var key in obj) {
        if (obj[key] !== '') {
            if (dom === 'element') {
                self.layer.estyle[key] = obj[key];
            } else {
                self.layer.style[key] = obj[key];
            }
        } else {
            // 删除对应的 self.style[key]
            // self.style['configurable'] = true; // 严格模式下需要设置
            if (dom === 'element') {
                delete self.layer.estyle[key];
            } else {
                delete self.layer.style[key];
            }
        }
    }

    // 设置 dom
    if (dom === 'element') {
        AppData.edit.layerDom.find('.element').css(obj);
    } else {
        AppData.edit.layerDom.css(obj);
    }

    //监听变化
    if (!nochange) {
        (0, _AppDataFun.AppDataChange)();
    }
}

// 事件
function baiscMoreEvent(self) {

    // 旋转的 slider
    $('#basicMoreTpl_rotate').off('change').on('change', function (e, val) {

        // 迭代中可能出现BUG，如果 transform 用了其他的值，比如 scale , translate 等 这里就不能这样处理.需要用到矩阵
        // 设置 dom
        setLayerDomAndObj('layer', {
            transform: 'rotate(' + val * 360 + 'deg)'
        }, self);
    });

    // 旋转的 input
    $('#basicMoreTpl_rotate_input').off('change input').on('change input', function (e) {

        var val = parseInt($(this).val(), 10);

        // 迭代到后面，如果要对transform 进行扩展，中可能出现BUG，如果 transform 用了其他的值，比如 scale , translate 等 这里就不能这样处理 可以使用 矩阵
        // 设置 dom
        setLayerDomAndObj('layer', {
            transform: 'rotate(' + val + 'deg)'
        }, self);
    });

    // 圆角的 slider
    $('#basicMoreTpl_radius').off('change').on('change', function (e, val) {
        // console.log('~~~~~', val);
        // 设置 dom
        setLayerDomAndObj('element', {
            'border-radius': val * radiusMax + 'px'
        }, self);
    });

    // 圆角的 Input
    $('#basicMoreTpl_radius_input').off('change input').on('change input', function (e) {
        var val = parseInt($(this).val(), 10);
        // console.log('>>>>', val);
        // 设置 DOM
        setLayerDomAndObj('element', {
            'border-radius': val + 'px'
        }, self);
    });

    // 透明度 slider
    $('#basicMoreTpl_opacity').off('change').on('change', function (e, val) {
        // 设置 DOM
        setLayerDomAndObj('element', {
            'opacity': val
        }, self);
    });

    // 透明度 Input
    $('#basicMoreTpl_opacity_input').off('change input').on('change input', function (e) {
        var val = $(this).val();

        setLayerDomAndObj('element', {
            'opacity': val
        }, self);
    });

    // 开启阴影
    $('#basicMoreTpl_boxshadow_switch').off('change').on('change', function (e, val) {
        if (val) {
            val = '0 0 10px rgba(0,0,0,0.5)';
            setLayerDomAndObj('element', {
                'box-shadow': val
            }, self);
        } else {
            setLayerDomAndObj('element', {
                'box-shadow': ''
            }, self);
        }
    });

    // 阴影 slider - size
    $('#basicMoreTpl_boxshadow').off('change').on('change', function (e, val) {

        // 数据过滤
        val = parseInt(val * 100, 10);
        val = (0, _cssFilter.setBoxshadow)(self.layer.estyle['box-shadow'], { size: val + 'px' });

        setLayerDomAndObj('element', {
            'box-shadow': val
        }, self);
    });

    // 阴影  Input
    $('#basicMoreTpl_boxshadow_input').off('change').on('change', function (e) {

        var val = $(this).val();
        val = parseInt(val, 10);
        val = (0, _cssFilter.setBoxshadow)(self.layer.estyle['box-shadow'], { size: val + 'px' });

        setLayerDomAndObj('element', {
            'box-shadow': val
        }, self);
    });

    // 阴影 颜色
    $('#basicMoreTpl_boxshadowColor_input').off('change').on('change', function (e) {
        var val = $(this).val();
        val = (0, _cssFilter.setBoxshadow)(self.layer.estyle['box-shadow'], { color: val });

        setLayerDomAndObj('element', {
            'box-shadow': val
        }, self);
    });

    // 阴影 透明度
    $('#basicMoreTpl_boxshadowOpactity').off('change').on('change', function (e, val) {
        val = (0, _cssFilter.setBoxshadow)(self.layer.estyle['box-shadow'], { opacity: val });

        setLayerDomAndObj('element', {
            'box-shadow': val
        }, self);
    });

    // 开启边框
    $('#basicMoreTpl_border_switch').off('change').on('change', function (e, val) {
        if (val) {
            val = '10px solid rgba(0,0,0,1)';
            setLayerDomAndObj('element', {
                'border': val
            }, self);
        } else {
            setLayerDomAndObj('element', {
                'border': ''
            }, self);
        }
    });

    // 边框 大小 input
    $('#basicMoreTpl_borderSize').off('change').on('change', function (e) {

        var val = $(this).val();
        val = parseInt(val, 10);
        val = (0, _cssFilter.setBorder)(self.layer.estyle['border'], { size: val + 'px' });

        setLayerDomAndObj('element', {
            'border': val
        }, self);
    });

    // 边框 颜色
    $('#basicMoreTpl_borderColor').off('change').on('change', function (e) {
        var val = $(this).val();
        val = (0, _cssFilter.setBorder)(self.layer.estyle['border'], { color: val });

        setLayerDomAndObj('element', {
            'border': val
        }, self);
    });

    // 边框类型
    $('#basicMoreTpl_borderStyle').off('change').on('change', function (e) {
        var val = $(this).val();
        val = (0, _cssFilter.setBorder)(self.layer.estyle['border'], { type: val });
        setLayerDomAndObj('element', {
            'border': val
        }, self);
    });

    // 边框 透明度
    $('#basicMoreTpl_borderOpactiy').off('change').on('change', function (e, val) {

        val = (0, _cssFilter.setBorder)(self.layer.estyle['border'], { opacity: val });

        setLayerDomAndObj('element', {
            'border': val
        }, self);
    });

    // 隐藏元素
    $('#basicMoreTpl_hide_layer').off('change').on('change', function (e, val) {
        setLayerDomAndObj('layer', {
            display: val ? 'none' : 'block'
        }, self);
    });
}

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.borderFilter = borderFilter;
exports.setBorder = setBorder;
exports.boxshadowFilter = boxshadowFilter;
exports.setBoxshadow = setBoxshadow;
exports.animationFilter = animationFilter;
exports.getOpacity = getOpacity;
// 过滤 border  1px solid rgba(0,0,0,0.5)
function borderFilter(border) {
    if (border) {
        var arr = border.split(' ');
        return {
            size: arr[0],
            type: arr[1],
            color: arr[2].colorHex() || '#000000',
            opacity: arr[2].colorOpacity() || 1
        };
    } else {
        // 如果没有 border
        // console.log('cssFilter.js borderFilter() => ', border);
        return {
            size: null,
            type: null,
            color: null,
            opacity: null
        };
    }
}

// 设置 border 
function setBorder(target, obj) {
    var exg = /(\d+(px)?\s)(\w+\s)(rgba\((\w+),(\w+),(\w+),(((1|0)?\.)?\d+)\))/;
    if (obj.size !== undefined) {
        target = target.replace(exg, obj.size + ' $3$4');
    }
    if (obj.color !== undefined) {
        // 颜色转换
        var color = obj.color.colorRgba(1, true);
        target = target.replace(exg, '$1$3rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',$8)');
    }
    if (obj.opacity !== undefined) {
        target = target.replace(exg, '$1$3rgba($5,$6,$7,' + obj.opacity + ')');
    }
    if (obj.type !== undefined) {
        target = target.replace(exg, '$1' + obj.type + ' rgba($5,$6,$7,$8)');
    }
    return target;
}

// 过滤 box-shadow 0 0 5px rgba(0,0,0,.5)
function boxshadowFilter(boxshadow) {
    if (boxshadow) {
        var arr = boxshadow.split(' ');
        return {
            size: arr[2],
            color: arr[3].colorHex() || '#000000',
            opacity: arr[3].colorOpacity() || 1
        };
    } else {
        // console.log('cssFilter.js boxshadowFilter() => ', boxshadow);
        return {
            size: null,
            color: null,
            opacity: null
        };
    }
}

// 添加 boxshadow 属性  /(\d+(px)?\s){2}(\d+(px)?\s)((rgba\()(\w+)(,)(\w+)(,)(\w+)(,)((0\.)?\d+)\))/
// color传入 #000000 格式
function setBoxshadow(target, obj) {
    var exg = /(\d+(px)?\s)(\d+(px)?\s)(\d+(px)?\s)(rgba\((\d+),(\d+),(\d+),(((1|0)?\.)?\d+)\))/;
    if (obj.size !== undefined) {
        target = target.replace(exg, '$1$3' + obj.size + ' $7');
    }
    if (obj.color !== undefined) {
        // 颜色转换
        var color = obj.color.colorRgba(1, true);
        target = target.replace(exg, '$1$3$5rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',$11)');
    }
    if (obj.opacity !== undefined) {
        target = target.replace(exg, '$1$3$5rgba($8,$9,$10,' + obj.opacity + ')');
    }
    return target;
}

// 过滤 animation  animation: name duration timing-function delay iteration-count direction fill-mode play-state;
function animationFilter(animation) {
    if (animation) {
        var arr = animation.split(' ');
    } else {
        return {
            name: null, // 动画名称
            duration: null, // 动画执行时间
            timing: null, // 动画速度曲线 linear,ease,ease-in,ease-out,ease-in-out, cubic-bezier(n,n,n,n) 贝塞尔
            delay: null, // 延迟执行
            count: null, // 播放次数
            direction: null, // 是否循环交替反向播放动画 normal: 正常播放， reverse：反向播放，alternate/alternate-reverse：动画在奇数/偶数次正向播放，在偶数/奇数次反向播放。
            fillMode: null, // 动画停留 none，forwards，backwards，both
            playState: null // 控制播放状态 paused，running
        };
    }
}

/**
 * 获取 opacity 透明度
*/
function getOpacity(val) {
    if (val === undefined) {
        val = 1;
    }
    return val;
}

// export { borderFilter, boxshadowFilter, setBoxshadow , setBorder };

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(237), __esModule: true };

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(22);
var aFunction = __webpack_require__(69);
var SPECIES = __webpack_require__(11)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(41);
var invoke = __webpack_require__(239);
var html = __webpack_require__(115);
var cel = __webpack_require__(77);
var global = __webpack_require__(14);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(47)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(22);
var isObject = __webpack_require__(28);
var newPromiseCapability = __webpack_require__(123);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(14);
var core = __webpack_require__(13);
var dP = __webpack_require__(21);
var DESCRIPTORS = __webpack_require__(23);
var SPECIES = __webpack_require__(11)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(11)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 确认弹窗
*/
$.confirms = function (setting) {
    var _this = this;

    if (!$('.mt-modal-bg')[0]) {
        $('body').append('<div class="mt-modal-bg"></div>');
    }

    var defaults = {
        title: '系统提示',
        content: '内容...',
        width: 300, // 宽度
        callback: null // 回调函数
    };
    var set = $.extend(defaults, setting || {});
    var id = 'confirm_' + +new Date();
    var tpl = '\n        <div class="mt-confirm" id="' + id + '">\n            <div class="mt-modal-box" style="width: ' + set.width + 'px;">\n                <a class="mt-modal-close">\n                    <i class="iconfont icon-close"></i>\n                </a>\n                <div class="mt-modal-title">' + set.title + '</div>\n                <div class="mt-modal-content">' + set.content + '</div>\n                <div class="mt-modal-btns">\n                    <a class="mt-btn-cancel">\u53D6\u6D88</a>\n                    <a class="mt-btn-ok">\u786E\u5B9A</a>\n                </div>\n            </div>\n        </div>\n    ';
    $('body').append(tpl);
    var $confirm = $('#' + id);
    var $bg = $('.mt-modal-bg');
    var $close = $confirm.find('.mt-modal-close');

    // 绑定事件
    this.bindEvent = function () {
        var self = _this;
        $confirm.on('click', '.mt-btn-cancel', function (e) {
            self.hide(false);
        });
        $confirm.on('click', '.mt-btn-ok', function (e) {
            self.hide(true);
        });
        $confirm.on('click', '.mt-modal-close', function (e) {
            self.hide(null);
        });

        // 监听回车
        $(document).on('keydown.' + id, function (e) {
            if (e.keyCode == 13) {
                self.hide(true);
            }
        });
    };

    // 显示
    this.show = function () {
        $confirm.removeClass('zoomOut').addClass('animated zoomIn').show();
        $bg.show();
        _this.bindEvent();
    };

    // 隐藏
    this.hide = function (mark) {
        $confirm.removeClass('zoomIn').addClass('zoomOut');
        setTimeout(function () {
            $confirm.hide();
            $bg.hide();
            $confirm.off('click').remove();
            $(document).off('keydown.' + id);
        }, 500);
        if (set.callback) {
            set.callback(mark);
        }
    };

    return this;
};

/***/ }),
/* 185 */,
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//设置html，如果mark = true，不重置 mt-active
function setHtml(page, showpage, maxpage, mark) {
    page = page ? page : 1;
    var shtml = '<div class="mt-pagelist">\n        <ul class="clearfix">\n            <li><a class="iconfont icon-a3left mt-pageprev"></a></li>\n            {{pageli}}\n            <li><a class="iconfont icon-a3right mt-pagenext"></a></li>\n        </ul>\n    </div>';
    var pageli = '';
    var addCls = function addCls(num) {
        var className = '';
        if (!mark && num == page) {
            className = 'mt-active';
        }
        return className;
    };
    if (maxpage == 0) {
        shtml = '';
    } else if (maxpage <= showpage + 1) {
        for (var i = 0; i < maxpage; i++) {
            pageli += '<li><a class="' + addCls(i + 1) + '">' + (i + 1) + '</a></li>';
        }
    } else {
        //如果是大于maxpage
        var size = showpage - 2; //中间显示size个
        // 分三种情况： 1234...9   1...345...9  1...6789
        if (page < size + 1) {
            //1234...9
            for (var _i = 0; _i < size + 1; _i++) {
                pageli += '<li><a class="' + addCls(_i + 1) + '">' + (_i + 1) + '</a></li>';
            }
            pageli += '<li><a class="mt-pagelist-next">...</a></li>';
            pageli += '<li><a>' + maxpage + '</a></li>';
        } else if (page >= size + 1 && page <= maxpage - size) {
            //1...567...9    			
            pageli += '<li><a>1</a></li>';
            pageli += '<li><a class="mt-pagelist-prev">...</a></li>';
            for (var _i2 = page - 1; _i2 < size + page - 1; _i2++) {
                pageli += '<li><a class="' + addCls(_i2) + '">' + _i2 + '</a></li>';
            }
            pageli += '<li><a class="mt-pagelist-next">...</a></li>';
            pageli += '<li><a>' + maxpage + '</a></li>';
        } else {
            //1...6789
            pageli += '<li><a>1</a></li>';
            pageli += '<li><a class="mt-pagelist-prev">...</a></li>';
            for (var _i3 = 0; _i3 < size + 1; _i3++) {
                var nowp = maxpage - (size + 1 - _i3) + 1;
                pageli += '<li><a class="' + addCls(nowp) + '">' + nowp + '</a></li>';
            }
        }
    }
    addCls = null;
    shtml = shtml.replace('{{pageli}}', pageli);
    return shtml;
}

/**
 * 分页插件
 */
$.fn.pagelist = function (setting) {

    var defaults = {
        refresh: false,
        page: 9, //当前第几页
        pagesize: 20, //20条每页
        count: 0, //总共多少条数据
        showpage: 5 //最大显示多少页 .. >= 4
    };
    var _this = this;
    var set = $.extend(defaults, setting);
    var maxpage = Math.ceil(set.count / set.pagesize);

    // 避免重复渲染
    if ($(this).find('.mt-pagelist')[0]) {
        $(this).html(setHtml(set.page, set.showpage, maxpage));
        return;
    }

    if (set.showpage < 4) {
        console.error('showpage最小为4');
        return;
    }

    //页面跳转
    var toPage = function toPage(page, mark) {
        $(_this).html(setHtml(page, set.showpage, maxpage, mark));
    };

    //自定义page事件
    var pageEvent = function pageEvent(nowpage) {
        $(_this).trigger('page', {
            page: nowpage,
            count: set.count,
            pagesize: set.pagesize
        });
    };

    //上一页
    var nextPage = function nextPage() {
        var nowpage = $(_this).find('.mt-active').html();
        nowpage++;
        if (nowpage > maxpage) {
            nowpage = maxpage;
        }
        pageEvent(nowpage);
        toPage(nowpage);
    };

    //下一页
    var prevPage = function prevPage() {
        var nowpage = $(_this).find('.mt-active').html();
        nowpage--;
        if (nowpage <= 0) {
            nowpage = 1;
        }
        pageEvent(nowpage);
        toPage(nowpage);
    };

    //上一段
    var prevSize = function prevSize() {
        var nowpage = $(_this).find('.mt-pagelist-prev').parent().next().text();
        var size = set.showpage - Math.ceil(set.showpage / 2);
        nowpage = parseInt(nowpage, 10);
        nowpage -= size;
        if (nowpage < 1) {
            nowpage = 1;
        }
        toPage(nowpage, true);
    };

    //下一段
    var nextSize = function nextSize() {
        var nowpage = $(_this).find('.mt-pagelist-next').parent().prev().text();
        nowpage = parseInt(nowpage, 10);
        nowpage += 2;
        if (nowpage > maxpage) {
            nowpage = maxpage;
        }
        toPage(nowpage, true);
    };

    //init
    var init = function init() {
        $(_this).html(setHtml(set.page, set.showpage, maxpage));
    };

    //事件驱动
    $(_this).off('click.pagelist').on('click.pagelist', '.mt-pagelist', function (e) {
        var cls = e.target.className ? e.target.className : '';
        if (cls.indexOf('mt-pagenext') != -1) {
            //下一页
            nextPage();
        } else if (cls.indexOf('mt-pageprev') != -1) {
            //上一页
            prevPage();
        } else if (cls.indexOf('mt-pagelist-next') != -1) {
            //下一段
            nextSize();
        } else if (cls.indexOf('mt-pagelist-prev') != -1) {
            //上一段
            prevSize();
        } else {
            //页码
            var nowpage = parseInt(e.target.text, 10);
            pageEvent(nowpage);
            toPage(nowpage);
        }
    });

    init();

    // 刷新当前页面
    _this.refresh = function () {
        $(_this).html(setHtml(set.page, set.showpage, maxpage));
    }.bind(_this);

    return _this;
}; //END fn

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bgColorTpl = bgColorTpl;
exports.initBgColor = initBgColor;

var _AppDataFun = __webpack_require__(10);

var _funs = __webpack_require__(122);

function bgColorTpl(obj) {
    // console.log('==>', obj);
    return '\n    <div class="set-bgcolor">\n        <div class="tr">\n            \u80CC\u666F\u5E95\u8272:\n            <div class="mt-color set_bg_color">\n                <input class="set_bg_color_input" type="color" value="' + obj.color + '"/>\n                \u900F\u660E\u5EA6\uFF1A<div style="width:95px" class="mt-slider-bar set_bg_opacity" data-val="' + (obj.opacity ? obj.opacity : 0) + '"></div>\n                <a class="mt-color-clear"><i class="iconfont icon-eraser"></i>\u6E05\u9664</a>\n            </div>\n        </div>\n    </div>\n';
}

// 设置背景颜色
function initBgColor(self, $parent, callback) {

    // 选择颜色， 颜色+透明度 已经封装 在 unit/color.js
    $parent.find('.set_bg_color').off('change').on('change', function (e, data) {
        var key = self.className !== 'layer' ? 'style' : 'estyle';
        self[self.className][key]['background-color'] = data;
        callback();
    });
}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLayerDom = getLayerDom;
exports.addLayer = addLayer;
exports.layerTypeSelect = layerTypeSelect;

var _index = __webpack_require__(262);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(286);

var _index4 = _interopRequireDefault(_index3);

var _AppDataFun = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc 根据 layer 设置 对于的 phone 里面的 layer DOM
 * @param layer new Layer() 的对象
*/
function getLayerDom(layer) {
    // console.log('获取图层', layer);
    var dom = '';
    switch (layer.type) {
        case 'img':
            dom = (0, _index.imgDom)(layer);break;
        case 'text':
            dom = (0, _index3.textDom)(layer);break;
        default:
            break;
    }
    return dom;
}

// 添加 layer ，添加新的layer
// 设置 layer
function addLayer(type) {
    console.log('添加图层', type);
    switch (type) {
        case 'img':
            addLayerBack(new _index.ImgLayer());break;
        case 'text':
            addLayerBack(new _index3.TextLayer());break;
        default:
            break;
    }
}

/**
 * @author Mantou
 * @desc 判断不同的图层类型，去 new 不同的图层类， 选择图层后
 * @param {object} layer - 页面对象
 */
function layerTypeSelect(layer) {
    console.log('选择图层->', layer);
    if (!layer) {
        return;
    }
    switch (layer.type) {
        case 'img':
            new _index2.default(layer).init();break;
        case 'text':
            new _index4.default(layer).init();break;
        default:
            break;
    }
}

//////////////////////////////////////////////////////////////////////////////
// 添加 layer 后，需要重新实例化一些 page方法
function addLayerBack(obj) {
    // 获取当前编辑的页面类
    var Page = (0, _AppDataFun.getPageClass)();
    if (!Page) {
        $.tip({
            msg: '请先新建页面', //
            type: 'danger', //success,danger,warning
            time: 3000 //
        });
        return;
    }
    (0, _AppDataFun.pushLayerData)(obj, Page);
    // 更新 list
    Page.initLayerList();
    // 更新 layer 的 dom
    Page.initPageDom();
    // 选择第一个layer
    // AppData.edit.layerIndex = null;
    Page.selectFirstLayer();

    // svg 预加载
    Page.lazySvg();
}

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(64);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(63);

var _createClass3 = _interopRequireDefault(_createClass2);

var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

var _bgColorTpl = __webpack_require__(187);

var _basicTpl = __webpack_require__(152);

var _basicMoreTpl = __webpack_require__(175);

var _layerSetUeTpl = __webpack_require__(273);

var _cssFilter = __webpack_require__(176);

var _layerFun = __webpack_require__(101);

var _AppDataFun = __webpack_require__(10);

var _layerAnimateTpl = __webpack_require__(284);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//图层
// layer 的公用函数
// 交互
//基础模版
//
var Layer = function () {
    function Layer(layer) {
        (0, _classCallCheck3.default)(this, Layer);

        this.className = 'layer';
        this.$selectAnimateDom = null; // 当前选中的animate
        // 方便修改layer 参数
        this.layer = layer;
    }

    // 获取当前的layer 类


    (0, _createClass3.default)(Layer, [{
        key: 'getLayer',
        value: function getLayer() {
            return this.layer;
        }

        // 获取当前的操作对象

    }, {
        key: 'getDom',
        value: function getDom() {
            return AppData.edit.layerDom;
        }

        // 获取当前的 viewDom

    }, {
        key: 'getViewDom',
        value: function getViewDom() {
            return (0, _AppDataFun.getViewDom)();
        }

        // 获取 index ...

    }, {
        key: 'getIndex',
        value: function getIndex() {
            return $('.layerlist').find('.active').index();
        }

        //渲染layer，这里只设置 style

    }, {
        key: '_renderLayer',
        value: function _renderLayer() {
            AppData.edit.layerDom.setStyle({
                style: this.layer.style,
                estyle: this.layer.estyle,
                animate: this.layer.animate
            });
            (0, _AppDataFun.AppDataChange)();
        }

        //公用的 set区域 模板

    }, {
        key: '_getSetBoxTpl',
        value: function _getSetBoxTpl() {
            var self = this;
            var _layer = this.layer,
                estyle = _layer.estyle,
                style = _layer.style;

            var bcolor = estyle['background-color'] || '';
            var transform = style['transform'] || '';

            // 背景模板
            var bgColorTpls = (0, _bgColorTpl.bgColorTpl)({
                color: bcolor ? bcolor.colorHex() : 'initial',
                opacity: bcolor ? bcolor.colorOpacity() : 1
            });

            // x, y, height, width 模板
            var basicTpls = (0, _basicTpl.basicTpl)({
                x: style.left,
                y: style.top,
                height: style.height,
                width: style.width,
                id: this.layer.id || ''
            });

            // 拓展模板 - 滚动条
            var boxshadow = (0, _cssFilter.boxshadowFilter)(estyle['box-shadow']);
            var border = (0, _cssFilter.borderFilter)(estyle['border']);
            var opacity = (0, _cssFilter.getOpacity)(estyle['opacity']);
            var basicMoreTpls = (0, _basicMoreTpl.basicMoreTpl)({
                rotate: transform.transformValue('rotate'),
                opacity: opacity,
                display: !style.display || style.display === 'block' ? 'block' : 'none',
                radius: estyle['border-radius'],
                boxshadow: boxshadow.size,
                boxshadowColor: boxshadow.color,
                boxshadowOpacity: boxshadow.opacity,
                borderSize: border.size,
                borderType: border.type,
                borderColor: border.color,
                borderOpacity: border.opacity
            });

            return {
                basicTpls: basicTpls,
                bgColorTpls: bgColorTpls,
                basicMoreTpls: basicMoreTpls
            };
        }

        //事件绑定

    }, {
        key: '_initEvent',
        value: function _initEvent() {
            var _this = this;

            // ui 组件方法重新实例化
            initSlider();
            initSelectOne();

            // 绑定basic事件
            (0, _basicTpl.basicEvent)(this);

            // 绑定拓展事件
            (0, _basicMoreTpl.baiscMoreEvent)(this);

            // 设置 背景色
            (0, _bgColorTpl.initBgColor)(this, $('#setLayerBox'), function () {
                _this._renderLayer();
            });
        }

        // 初始化

    }, {
        key: '_init',
        value: function _init() {

            // 设置名字
            $('#setLayerType').html(this.layer.typename + (AppData.edit.layerIndex + 1));

            // console.log('layer::layer 169 =>', this);
            // 动画设置区域
            (0, _layerAnimateTpl.setAnimateList)(this);

            // ue 设置
            // 默认隐藏面板
            $('.setue-set-hide').removeClass('setue-set-show');
            (0, _layerSetUeTpl.initUeSet)(this);

            // 事件绑定
            (0, _layerSetUeTpl.setUeEvent)(this);

            // 动画列表事件
            (0, _layerAnimateTpl.animateEvent)(this);

            // 实例化控制器
            (0, _layerFun.initControl)(this);
        }
    }]);
    return Layer;
}(); // 拓展模版
//背景色模版


exports.default = Layer;

/***/ }),
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @desc 翻页动画集合, 翻页动画CSS3 ： build/assets/plugins/animations.css
*/
var sliderAnimate = exports.sliderAnimate = {
    1: {
        name: '上下平滑',
        inNext: 'pt-page-moveFromBottom', // 进入动画
        outNext: 'pt-page-moveToTop', // 出去动画
        inPrev: 'pt-page-moveFromTop', // 进入动画
        outPrev: 'pt-page-moveToBottom' // 出去动画
    },
    2: {
        name: '上下隐藏',
        inNext: 'pt-page-moveFromBottomFade', // 进入动画
        outNext: 'pt-page-moveToTopFade', // 出去动画
        inPrev: 'pt-page-moveFromTopFade', // 进入动画
        outPrev: 'pt-page-moveToBottomFade' // 出去动画
    },
    3: {
        name: '上下移动缓动',
        inNext: 'pt-page-moveFromBottom', // 进入动画
        outNext: 'pt-page-moveToTopEasing', // 出去动画
        inPrev: 'pt-page-moveFromTop', // 进入动画
        outPrev: 'pt-page-moveToBottomEasing' // 出去动画
    },
    4: {
        name: '上下3D盒子切换',
        inNext: 'pt-page-rotateCubeTopIn3', // 进入动画
        outNext: 'pt-page-rotateCubeTopOut3', // 出去动画
        inPrev: 'pt-page-rotateCubeDownIn3', // 进入动画
        outPrev: 'pt-page-rotateCubeDownOut3' // 出去动画
    },
    5: {
        name: '上下放大',
        outNext: 'pt-page-scaleDownUp', // 出去动画
        inNext: 'pt-page-scaleUpCenter', // 进入动画
        outPrev: 'pt-page-scaleDownUp', // 出去动画
        inPrev: 'pt-page-scaleUpCenter' // 进入动画
    },
    6: {
        name: '旋转风车',
        outNext: 'pt-page-rotateOutNewspaper', // 出去动画
        inNext: 'pt-page-rotateInNewspaper', // 进入动画
        outPrev: 'pt-page-rotateOutNewspaper', // 出去动画
        inPrev: 'pt-page-rotateInNewspaper' // 进入动画
    },
    7: {
        name: '上下弹出效果',
        outNext: 'pt-page-rotateCarouselTopOut', // 出去动画
        inNext: 'pt-page-rotateCarouselTopIn', // 进入动画
        outPrev: 'pt-page-rotateCarouselBottomOut', // 出去动画
        inPrev: 'pt-page-rotateCarouselBottomIn' // 进入动画
    },
    8: {
        name: '上下翻牌效果',
        outNext: 'pt-page-flipOutTop', // 出去动画
        inNext: 'pt-page-flipInTop', // 进入动画
        outPrev: 'pt-page-flipOutBottom', // 出去动画
        inPrev: 'pt-page-flipInBottom' // 进入动画
    },
    9: {
        name: '上下股罗密效果',
        outNext: 'pt-page-rotatePushTop', // 出去动画
        inNext: 'pt-page-rotatePullTop', // 进入动画
        outPrev: 'pt-page-rotatePushBottom', // 出去动画
        inPrev: 'pt-page-rotatePullBottom' // 进入动画
    },
    10: {
        name: '3D盒子效果',
        outNext: 'pt-page-rotateCubeTopOut', // 出去动画
        inNext: 'pt-page-rotateCubeTopIn', // 进入动画
        outPrev: 'pt-page-rotateCubeBottomOut', // 出去动画
        inPrev: 'pt-page-rotateCubeBottomIn' // 进入动画
    }
};

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadHTML = loadHTML;
/**
 * @desc loading 模板
*/
var loadArr = exports.loadArr = ['<div class="timer"></div>', '<div class="typing_loader"></div>', '<div class="location_indicator"></div>', '<div class="dashboard"></div>', '<div class="battery"></div>', '<div class="magnifier"></div>', '<div class="help"></div>', '<div class="cloud"></div>', '<div class="eye"></div>', '<div class="coffee_cup"></div>', '<div class="square"></div>', '<div class="circle"></div>'];

// loading 
function loadHTML(self) {
    var loadIndex = self.app.loading;
    return '\n    <div class="loaders">\n        ' + loadArr.map(function (elem, index) {
        return '<div class="loader ' + (index == loadIndex ? 'active' : '') + '">\n                ' + elem + '     \n            </div>';
    }).join('') + '\n    </div>\n    ';
}

/***/ }),
/* 227 */,
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(229), __esModule: true };

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
__webpack_require__(117);
module.exports = __webpack_require__(118).f('iterator');


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(231), __esModule: true };

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(232);
__webpack_require__(121);
__webpack_require__(235);
__webpack_require__(236);
module.exports = __webpack_require__(13).Symbol;


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(14);
var has = __webpack_require__(32);
var DESCRIPTORS = __webpack_require__(23);
var $export = __webpack_require__(20);
var redefine = __webpack_require__(113);
var META = __webpack_require__(155).KEY;
var $fails = __webpack_require__(46);
var shared = __webpack_require__(80);
var setToStringTag = __webpack_require__(62);
var uid = __webpack_require__(61);
var wks = __webpack_require__(11);
var wksExt = __webpack_require__(118);
var wksDefine = __webpack_require__(119);
var enumKeys = __webpack_require__(233);
var isArray = __webpack_require__(172);
var anObject = __webpack_require__(22);
var toIObject = __webpack_require__(43);
var toPrimitive = __webpack_require__(84);
var createDesc = __webpack_require__(60);
var _create = __webpack_require__(78);
var gOPNExt = __webpack_require__(234);
var $GOPD = __webpack_require__(174);
var $DP = __webpack_require__(21);
var $keys = __webpack_require__(85);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(173).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(120).f = $propertyIsEnumerable;
  __webpack_require__(171).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(72)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(27)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(85);
var gOPS = __webpack_require__(171);
var pIE = __webpack_require__(120);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(43);
var gOPN = __webpack_require__(173).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(119)('asyncIterator');


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(119)('observable');


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(121);
__webpack_require__(102);
__webpack_require__(117);
__webpack_require__(238);
__webpack_require__(241);
__webpack_require__(242);
module.exports = __webpack_require__(13).Promise;


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(72);
var global = __webpack_require__(14);
var ctx = __webpack_require__(41);
var classof = __webpack_require__(104);
var $export = __webpack_require__(20);
var isObject = __webpack_require__(28);
var aFunction = __webpack_require__(69);
var anInstance = __webpack_require__(157);
var forOf = __webpack_require__(105);
var speciesConstructor = __webpack_require__(178);
var task = __webpack_require__(179).set;
var microtask = __webpack_require__(240)();
var newPromiseCapabilityModule = __webpack_require__(123);
var perform = __webpack_require__(180);
var promiseResolve = __webpack_require__(181);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(11)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(161)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(62)($Promise, PROMISE);
__webpack_require__(182)(PROMISE);
Wrapper = __webpack_require__(13)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(183)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 239 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(14);
var macrotask = __webpack_require__(179).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(47)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(20);
var core = __webpack_require__(13);
var global = __webpack_require__(14);
var speciesConstructor = __webpack_require__(178);
var promiseResolve = __webpack_require__(181);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(20);
var newPromiseCapability = __webpack_require__(123);
var perform = __webpack_require__(180);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 243 */,
/* 244 */,
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(82);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc 对象 to obj
*/
$.toStyle = function (obj, animate) {
    var style = [];
    if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object') {
        for (var key in obj) {
            if (key === 'background-image') {
                style.push(key + ': url(' + obj[key] + ')');
            } else {
                style.push(key + ': ' + obj[key]);
            }
        }
    }

    // 设置动画
    if (animate && animate.length > 0) {
        var arr = [];
        for (var i = 0; i < animate.length; i++) {
            arr.push(animate[i].style);
        }
        style.push('animation: ' + arr.join(',') + '; -webkit-animation: ' + arr.join(','));
        // 默认 动画暂停
        // style.push('animation-play-state: paused');
    }
    return style.join(';');
};

/***/ }),
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(260), __esModule: true };

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(261);
var $Object = __webpack_require__(13).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(20);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(23), 'Object', { defineProperty: __webpack_require__(21).f });


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImgLayer = undefined;

var _getPrototypeOf = __webpack_require__(106);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = __webpack_require__(63);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(107);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(108);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__(64);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.imgDom = imgDom;

var _layer = __webpack_require__(189);

var _layer2 = _interopRequireDefault(_layer);

var _imgTpl = __webpack_require__(162);

var _AppDataFun = __webpack_require__(10);

var _set = __webpack_require__(285);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// layer 模板
//图片模版 。。
function imgDom(obj) {
    return '\n    <div id="' + (obj.id || '') + '" data-uefun="' + (obj.ue ? $.escape(obj.ue) : '') + '" class="layer layer-img" style="' + $.toStyle(obj.style) + '">\n        <div class="element" style="' + $.toStyle(obj.estyle, obj.animate) + '"><img src="' + (obj.data.src || 'none') + '" /></div>\n    </div>';
}

// layer 原始数据, 用于保存在 AppData里面的数据

var ImgLayer = exports.ImgLayer = function ImgLayer(animate, data, estyle, style, type, typename) {
    (0, _classCallCheck3.default)(this, ImgLayer);

    this.animate = animate || [];
    this.data = data || {
        src: _set.blankImg
    };
    this.estyle = estyle || {};
    this.style = style || {
        width: '200px',
        height: '160px',
        top: '10px',
        left: '10px',
        'z-index': 9999
    };
    this.type = type || 'img';
    this.color = 'none';
    this.ue = null;
    this.typename = typename || '图片';
};

// Img 类，主要是一些方法实现


var Img = function (_Layer) {
    (0, _inherits3.default)(Img, _Layer);

    function Img(layer) {
        (0, _classCallCheck3.default)(this, Img);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Img.__proto__ || (0, _getPrototypeOf2.default)(Img)).call(this, layer));

        _this.$crop = null;
        return _this;
    }

    (0, _createClass3.default)(Img, [{
        key: 'cropBack',
        value: function cropBack(method, val) {
            console.log(method, val);

            // 控制重新设置尺寸的参数
            var imgDom = false;
            if (AppData.edit.layerDom.find('img').attr('src').indexOf('imgDom') !== -1) {
                imgDom = true;
            }

            if (method === 'crop') {
                // 剪切后 重新设置 img 的src
                AppData.edit.layerDom.find('img').attr('src', this.layer.data.src);
            } else if (method === 'reset') {
                // ... 重置图片
                AppData.edit.layerDom.find('img').attr('src', this.layer.data.src);
            } else if (method === 'delete') {
                // 删除图片，在 initCrop 里面已经做了处理了
            } else if (method === 'select') {
                // 重新设置尺寸, 如果第一次是替代图片，选中图片后，自动设置尺寸，如果是已有的图，不设置尺寸
                if (imgDom) {
                    var img = new Image();
                    img.src = val;
                    AppData.edit.layerDom.css({
                        width: img.naturalWidth,
                        height: img.naturalHeight
                    });
                    $('#basicTpl_set_width').val(img.naturalWidth + 'px');
                    $('#basicTpl_set_height').val(img.naturalHeight + 'px');
                    this.layer.style.width = img.naturalWidth + 'px';
                    this.layer.style.height = img.naturalHeight + 'px';
                }

                AppData.edit.layerDom.find('img').attr('src', val);

                // 重新设置layer 对象
                this.layer.data.src = val;
            }
            // 重新渲染页面
            (0, _AppDataFun.AppDataChange)();
        }

        // 事件绑定

    }, {
        key: 'initEvent',
        value: function initEvent() {
            // 图片剪切, 因为事件绑定，被外部函数所引用，形成闭包，内存无法释放。以后这里需要做优化
            this.$crop = (0, _imgTpl.initCrop)(this, $('#setStyle').find('.set_img_crop'), {}, this.cropBack.bind(this));
        }

        // 模板

    }, {
        key: 'render',
        value: function render() {

            var self = this;

            // 图片模板
            var imgTpls = (0, _imgTpl.imgTpl)({
                src: self[self.className].data.src || ''
            });

            var _getSetBoxTpl = this._getSetBoxTpl(),
                basicTpls = _getSetBoxTpl.basicTpls,
                bgColorTpls = _getSetBoxTpl.bgColorTpls,
                basicMoreTpls = _getSetBoxTpl.basicMoreTpls;

            // 编辑区域


            $('#setStyle').html(basicTpls + imgTpls + bgColorTpls + basicMoreTpls);
        }

        // 初始化

    }, {
        key: 'init',
        value: function init() {

            // 初始化 公用模块
            this._init();

            // 控制tab head 显示隐藏
            // this.setLayerTabHead();

            // 初始化设置区域
            this.render();

            // 设置区域事件绑定，事件绑定在 render 之后执行
            this._initEvent();
            this.initEvent();

            // console.log('layer::img 11 =>', this);
            (0, _AppDataFun.setLayerClass)(this);
        }
    }]);
    return Img;
}(_layer2.default);

exports.default = Img;

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(264);
module.exports = __webpack_require__(13).Object.getPrototypeOf;


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(86);
var $getPrototypeOf = __webpack_require__(116);

__webpack_require__(265)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(20);
var core = __webpack_require__(13);
var fails = __webpack_require__(46);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(267), __esModule: true };

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(268);
module.exports = __webpack_require__(13).Object.setPrototypeOf;


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(20);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(269).set });


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(28);
var anObject = __webpack_require__(22);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(41)(Function.call, __webpack_require__(174).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(271), __esModule: true };

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(272);
var $Object = __webpack_require__(13).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(20);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(78) });


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setUeEvent = setUeEvent;
exports.initUeSet = initUeSet;

var _linkTpl = __webpack_require__(274);

var _toPageTpl = __webpack_require__(276);

var _telTpl = __webpack_require__(278);

var _msgTpl = __webpack_require__(280);

var _hideShowTpl = __webpack_require__(282);

var _AppDataFun = __webpack_require__(10);

/**
 * @desc layer 的交互
*/
/**
 * @desc 交互模块及功能，在页面上全是 JS控制，为了不加太多属性，之用一个属性控制, 所有函数名字前面加个 ueOf
 * <div class="layer" data-ue='{"name":"超链接", "fun": "ueOflink", "data": "http://www.h5ds.com"}'></div>
 * 多个存放到数组
 */
function switchUeTpl(self, fun) {
    // if(!self.layer.ue.data) {
    //     self.layer.ue.data = {};
    // }
    var tpl = '';

    console.log(self.layer.ue);

    switch (fun) {
        case 'link':
            tpl = (0, _linkTpl.linkTpl)(self);break;
        case 'toPage':
            tpl = (0, _toPageTpl.toPageTpl)(self);break;
        case 'tel':
            tpl = (0, _telTpl.telTpl)(self);break;
        case 'msg':
            tpl = (0, _msgTpl.msgTpl)(self);break;
        case 'hideShow':
            tpl = (0, _hideShowTpl.hideShowTpl)(self);break;
    }

    $('#setUeSetBox').html(tpl);
    // return tpl;
}

/**
 * @desc layer 的交互
*/
function switchUeEvent(self, fun) {
    switch (fun) {
        case 'link':
            (0, _linkTpl.linkEvent)(self);break;
        case 'toPage':
            (0, _toPageTpl.toPageEvent)(self);break;
        case 'tel':
            (0, _telTpl.telEvent)(self);break;
        case 'msg':
            (0, _msgTpl.msgEvent)(self);break;
        case 'hideShow':
            (0, _hideShowTpl.hideShowEvent)(self);break;
    }
}

// 以下非配置项 ////////////////////////////////////////////////////////////////////////////////////////

/**
 * @desc 设置交互名字
*/
function setUeName(self) {
    var name = '';
    var layer = self.layer;
    var ue = layer.ue;
    if (ue) {
        name = ue.name;
    }
    $('#setUeSetName').html(name);
}

/**
 * @desc 事件
 */
function setUeEvent(self) {

    var toggleSet = function toggleSet() {
        if ($('.setue-set-show')[0]) {
            $('.setue-set-show').removeClass('setue-set-show');
        } else {
            $('#setUeSet').addClass('setue-set-show');
        }
    };

    // 选择 列表
    $('#setUeList').off('click').on('click', '.fun', function (e) {
        var fun = $(this).attr('data-fun');
        var name = $(this).find('span').text();

        // 设置参数
        if (!self.layer.ue) {
            self.layer.ue = {};
        }
        // 设置参数 fun 作为 key
        if (!self.layer.ue[fun]) {
            self.layer.ue[fun] = {
                name: name,
                fun: fun,
                data: null
            };
        }

        // 重新设置列表 样式
        initUeSet(self);
        toggleSet(); // 显示面板

        // 设置模板
        switchUeTpl(self, fun);
        // 添加事件
        switchUeEvent(self, fun);

        $('.clear-setue').attr('data-fun', fun);
    });

    // 功能模块 - 关闭面板
    $(document).off('click.setUeClose').on('click.setUeClose', '.close-setue', function (e) {
        // 设置参数
        toggleSet();
    });

    // 清除功能
    $(document).off('click.setUeClear').on('click.setUeClear', '.clear-setue', function (e) {
        // 设置参数
        var fun = $(this).attr('data-fun');
        delete self.layer.ue[fun];
        initUeSet(self);
        (0, _AppDataFun.AppDataChange)();
        toggleSet();
    });
}

/**
 * @desc 交互区域设置
*/
function initUeSet(self) {

    // 设置交互名字
    setUeName(self);

    // 设置模板，显示or 隐藏 设置区域
    var $setUeList = $('#setUeList');
    $setUeList.find('.fun').removeClass('active');
    if (self.layer.ue) {
        for (var key in self.layer.ue) {
            var ue = self.layer.ue[key];
            $setUeList.find('.fun[data-fun="' + ue.fun + '"]').addClass('active');
        }
    }
}

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.linkTpl = linkTpl;
exports.linkEvent = linkEvent;

__webpack_require__(275);

var _AppDataFun = __webpack_require__(10);

/**
 * @desc 超链接
 */
function linkTpl(self) {
    var _self$layer$ue$link = self.layer.ue.link,
        data = _self$layer$ue$link.data,
        name = _self$layer$ue$link.name,
        fun = _self$layer$ue$link.fun;

    return '\n        <div class="uebox uebox-links">\n            <div class="uebox-links-txt">\n                <textarea placeholder="\u8BF7\u8F93\u5165\u5E26http\u7684\u94FE\u63A5\u5730\u5740" id="ueBoxLinksTextArea">' + (data || '') + '</textarea>\n            </div>\n        </div>\n        <div class="uebox-tips">\n            <h5>\u4EA4\u4E92\u8BF4\u660E\uFF1A</h5>\n            <div class="uebox-content">\n                \u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u8981\u8DF3\u8F6C\u5230\u7684\u94FE\u63A5\u5730\u5740\u5C31\u53EF\u4EE5\u4E86\n            </div>\n        </div>\n    ';
}

/**
 * @desc 事件。。
*/
function linkEvent(self) {
    $('#ueBoxLinksTextArea').off('change').on('change', function () {
        var val = $(this).val();
        self.layer.ue.link.data = val;
        (0, _AppDataFun.AppDataChange)();
    });
}

/***/ }),
/* 275 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toPageTpl = toPageTpl;
exports.toPageEvent = toPageEvent;

__webpack_require__(277);

var _AppDataFun = __webpack_require__(10);

/**
 * @desc 页面跳转
 */
function toPageTpl(self) {
    var _self$layer$ue$toPage = self.layer.ue.toPage,
        data = _self$layer$ue$toPage.data,
        name = _self$layer$ue$toPage.name,
        fun = _self$layer$ue$toPage.fun;

    var shtml = '';
    for (var i = 0; i < AppData.data.pages.length; i++) {
        var d = AppData.data.pages[i];
        shtml += '<li title="' + d.name + '" data-page="' + i + '" class="' + (data === i ? 'active' : '') + '">\n            <span class="num">' + (i + 1) + '</span>\n            <span class="name">' + d.name + '</span>\n        </li>';
    }
    return '\n        <div class="uebox uebox-topages">\n            <div class="uebox-topages">\n                <h4>\u8BF7\u9009\u62E9\u60A8\u8981\u8DF3\u8F6C\u7684\u9875\u9762\uFF1A</h4>\n                <ul id="ueBoxToPage">\n                    ' + shtml + '\n                </ul>\n            </div>\n        </div>\n        <div class="uebox-tips">\n            <h5>\u4EA4\u4E92\u8BF4\u660E\uFF1A</h5>\n            <div class="uebox-content">\n                \u9009\u62E9\u4E00\u4E2A\u8981\u8DF3\u8F6C\u7684\u9875\u9762\uFF0C\u70B9\u51FB\u4F1A\u89E6\u53D1\u4EA4\u4E92\u6548\u679C\uFF0C\u8DF3\u8F6C\u5230\u6307\u5B9A\u7684\u9875\u9762\n            </div>\n        </div>\n    ';
}

/**
 * @desc 事件
*/
function toPageEvent(self) {
    $('#ueBoxToPage').off('click').on('click', 'li', function () {
        var val = $(this).attr('data-page');
        $(this).addClass('active').siblings('li').removeClass('active');
        self.layer.ue.toPage.data = parseInt(val, 10);
        (0, _AppDataFun.AppDataChange)();
    });
}

/***/ }),
/* 277 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.telTpl = telTpl;
exports.telEvent = telEvent;

__webpack_require__(279);

var _AppDataFun = __webpack_require__(10);

/**
 * @desc 超链接
 */
function telTpl(self) {
    var _self$layer$ue$tel = self.layer.ue.tel,
        data = _self$layer$ue$tel.data,
        name = _self$layer$ue$tel.name,
        fun = _self$layer$ue$tel.fun;

    return '\n        <div class="uebox uebox-tel">\n            <div class="uebox-tel-input">\n                <input placeholder="\u8BF7\u8F93\u5165\u7535\u8BDD\u53F7\u7801" id="ueBoxLinksTel" value="' + (data || '') + '"/>\n            </div>\n        </div>\n        <div class="uebox-tips">\n            <h5>\u4EA4\u4E92\u8BF4\u660E\uFF1A</h5>\n            <div class="uebox-content">\n                \u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u8981\u7535\u8BDD\u53F7\u7801\u5373\u53EF\n            </div>\n        </div>\n    ';
}

/**
 * @desc 事件
*/
function telEvent(self) {
    $('#ueBoxLinksTel').off('change').on('change', function () {
        var val = $(this).val();
        self.layer.ue.tel.data = val;
        (0, _AppDataFun.AppDataChange)();
    });
}

/***/ }),
/* 279 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.msgTpl = msgTpl;
exports.msgEvent = msgEvent;

__webpack_require__(281);

var _AppDataFun = __webpack_require__(10);

/**
 * @desc 发短信
 */
function msgTpl(self) {
    var _self$layer$ue$msg = self.layer.ue.msg,
        data = _self$layer$ue$msg.data,
        name = _self$layer$ue$msg.name,
        fun = _self$layer$ue$msg.fun;

    return '\n        <div class="uebox uebox-tel">\n            <div class="uebox-tel-input">\n                <input placeholder="\u8BF7\u8F93\u5165\u7535\u8BDD\u53F7\u7801" id="ueBoxMsg" value="' + (data || '') + '"/>\n            </div>\n        </div>\n        <div class="uebox-tips">\n            <h5>\u4EA4\u4E92\u8BF4\u660E\uFF1A</h5>\n            <div class="uebox-content">\n                \u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u8981\u53D1\u77ED\u4FE1\u7684\u7535\u8BDD\u53F7\u7801\u5373\u53EF\n            </div>\n        </div>\n    ';
}

/**
 * @desc 事件
*/
function msgEvent(self) {
    $('#ueBoxMsg').off('change').on('change', function () {
        var val = $(this).val();
        self.layer.ue.msg.data = val;
        (0, _AppDataFun.AppDataChange)();
    });
}

/***/ }),
/* 281 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hideShowTpl = hideShowTpl;
exports.hideShowEvent = hideShowEvent;

__webpack_require__(283);

var _AppDataFun = __webpack_require__(10);

/**
 * @desc 超链接
 */
function hideShowTpl(self) {
    if (!self.layer.ue.hideShow.data) {
        self.layer.ue.hideShow.data = {};
    }
    var _self$layer$ue$hideSh = self.layer.ue.hideShow,
        data = _self$layer$ue$hideSh.data,
        name = _self$layer$ue$hideSh.name,
        fun = _self$layer$ue$hideSh.fun;

    return '\n        <div class="uebox uebox-hideshow">\n            <div class="uebox-hideshow-box">\n                <ul id="ueBoxShowHideCheckbox" class="mt-checkbox-group">\n                    <li class="mt-checkbox-item ' + (data.type === 'show' ? 'mt-checkbox-active' : '') + '" data-val="show">\u53EA\u663E\u793A</li>\n                    <li class="mt-checkbox-item ' + (data.type === 'hide' ? 'mt-checkbox-active' : '') + '" data-val="hide">\u53EA\u9690\u85CF</li>\n                    <li class="mt-checkbox-item ' + (data.type === 'showhide' ? 'mt-checkbox-active' : '') + '" data-val="showhide">\u663E\u9690\u5207\u6362</li>\n                </ul>\n                <textarea placeholder="\u8BF7\u8F93\u5165\u76EE\u6807\u5143\u7D20\u7684id, \u591A\u4E2Aid\u7528,\u5206\u9694" id="ueBoxHideShowTextArea">' + (data.ids || '') + '</textarea>\n            </div>\n        </div>\n        <div class="uebox-tips">\n            <h5>\u4EA4\u4E92\u8BF4\u660E\uFF1A</h5>\n            <div class="uebox-content">\n                \u9009\u62E9\u663E\u9690\u85CF\u7684\u4EA4\u4E92\u65B9\u5F0F\uFF0C\u8BBE\u7F6E\u76EE\u6807\u5143\u7D20\u7684id\uFF0C\u591A\u4E2Aid\u7528,\u5206\u9694\n            </div>\n        </div>\n    ';
}

/**
 * @desc 事件
*/
function hideShowEvent(self) {
    $('#ueBoxShowHideCheckbox').off('changes').on('changes', function (e, data) {
        self.layer.ue.hideShow.data.type = data.val;
        (0, _AppDataFun.AppDataChange)();
    });

    $('#ueBoxHideShowTextArea').off('change').on('change', function (e) {
        var val = $(this).val();
        if (/[a-zA-z_0-9,]+/.test(val)) {
            self.layer.ue.hideShow.data.ids = val;
            (0, _AppDataFun.AppDataChange)();
        } else {
            $.tip({
                msg: 'id格式填写错误', //
                type: 'danger',
                time: 3000
            });
        }
    });
}

/***/ }),
/* 283 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setAnimateList = setAnimateList;
exports.animateEvent = animateEvent;

var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

var _AppDataFun = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 动画类型转换
function animateType(type) {
    console.log(type);
    switch (type) {
        case 'in':
            type = '进入';
            break;
        case 'out':
            type = '离开';
            break;
        default:
            type = '强调';
            break;
    }
    return type;
}

// 动画类型转换 反
//
function animateTypeUn(type) {
    switch (type) {
        case '进入':
            type = 'in';
            break;
        case '离开':
            type = 'out';
            break;
        default:
            type = 'em';
            break;
    }
    return type;
}

// 设置layer 的动画的 列表
function tplAnimateHTML(obj) {
    if (obj === undefined) {
        // 添加动画，默认设置的动画
        obj = { // 添加动画，默认的动画
            animate: 'fadeIn',
            name: 'fade in',
            type: 'in',
            time: '1s',
            delay: '0s',
            count: '1',
            fun: 'ease'
        };
    }

    obj.type = animateType(obj.type);
    return '<li class="animation-item" data-animate="' + obj.animate + '" data-type="' + obj.type + '" data-name="' + obj.name + '">\n                <span class="tname">\n                    <span data-title="' + obj.type + '\uFF1A' + obj.name + '" class="animation-name">' + obj.type + ':' + obj.name + '</span>\n                </span>\n                <span class="ttime">\n                    <input mt-wheel="0,0.1,10000" data-type="time" class="animation-time mt-input" mt-type="s" type="text" value="' + obj.time + '">\n                </span>\n                <span class="tdelay">\n                    <input mt-wheel="0,0.1,10000" data-type="delay" class="animation-delay mt-input" mt-type="s" type="text" value="' + obj.delay + '"> \n                </span>\n                <span class="tcount">\n                    <input data-type="count" class="animation-count mt-input" mt-type="" type="text" mt-wheel="1,1,10000" value="' + obj.count + '"> \n                </span>\n                <span class="tfun">\n                    <div class="mt-select">\n                        <select class="animation-fun" data-type="fun" placeholder="\u51FD\u6570">\n                            <option ' + (obj.fun === 'ease' ? 'selected' : '') + ' value="ease">\u9ED8\u8BA4</option>\n                            <option ' + (obj.fun === 'linear' ? 'selected' : '') + ' value="linear">\u5300\u901F</option>\n                            <option ' + (obj.fun === 'ease-in' ? 'selected' : '') + ' value="ease-in">\u52A0\u901F</option>\n                            <option ' + (obj.fun === 'ease-out' ? 'selected' : '') + ' value="ease-out">\u51CF\u901F</option>\n                            <option ' + (obj.fun === 'ease-in-out' ? 'selected' : '') + ' value="ease-in-out">\u8D77\u59CB\u6162</option>\n                        </select>\n                    </div>\n                </span>\n                <!--<input data-type="fun" class="animation-fun mt-input" mt-type="" type="text" value="' + obj.fun + '">-->\n                <a class="animation-delete"><i class="iconfont icon-close"></i></a>\n            </li>';
}

// 设置动画
function setAnimate(self) {
    // 设置 layer 动画属性
    // animation: name duration timing-function delay iteration-count direction fill-mode play-state;
    var arr = [];
    $('#animationList').find('li').each(function () {
        var $that = $(this);
        var obj = {};
        var $name = $that.find('.animation-name');

        // 设置点击对象的值
        obj['animate'] = $that.attr('data-animate');
        obj['name'] = $that.attr('data-name');
        obj['type'] = $that.attr('data-type');
        obj['time'] = $that.find('.animation-time').val();
        obj['delay'] = $that.find('.animation-delay').val();
        obj['count'] = $that.find('.animation-count').val();
        obj['fun'] = $that.find('.animation-fun').val();

        arr.push({
            name: obj.name,
            type: animateTypeUn(obj.type),
            style: obj.animate + ' ' + obj.time + ' ' + obj.fun + ' ' + obj.delay + ' ' + obj.count + ' normal forwards running'
        });
    });

    // table 标题显示
    if (arr.length === 0) {
        $('.animate-title').hide();
    } else {
        $('.animate-title').show();
    }

    // 设置 edit 对象里面的临时变量 -> 动画
    if (AppData.edit.layerDom) {
        AppData.edit.layerDom.addStyle({
            animate: arr
        });
    }

    // 设置 layer 对象
    self.layer.animate = arr;
    (0, _AppDataFun.AppDataChange)();
}

// 设置动画 的设置区域
function setAnimateList(self) {
    var $animationList = $('#animationList');
    var timeMax = 0; // 动画时间加上延时时间
    var anim = self.layer.animate;
    // console.log('>>>>',anim);
    if ($.isArray(anim) && anim.length > 0) {
        var shtml = '';
        for (var i = 0; i < anim.length; i++) {
            var d = anim[i];
            var style = d.style.replace(/\s+/, ' ');
            var name = d.name;
            var type = d.type;
            // zoomIn 1s ease 2s 1 normal forwards running
            var sArr = style.split(' ');
            var animate = sArr[0],
                time = sArr[1],
                fun = sArr[2],
                delay = sArr[3],
                count = sArr[4];

            var timeAll = parseInt(time, 10) + parseInt(delay, 10);
            if (timeMax < timeAll) {
                timeMax = timeAll;
            }

            shtml += tplAnimateHTML({
                animate: animate,
                name: name,
                type: type,
                fun: fun,
                time: time,
                delay: delay,
                count: count
            });
        } // end for	
        $('.animate-title').show();
        $animationList.html(shtml);
    } else {
        $('.animate-title').hide();
        $animationList.empty();
    }
}

// 动画列表 的事件
function animateEvent(self) {
    var $animationList = $('#animationList');

    // 动画排序 uniqend
    $animationList.off('uniqend').on('uniqend', function (e, obj) {
        // console.log('>>>>>>>>>', obj);
        setAnimate(self);
    });

    // 选中动画 li标签
    $animationList.off('click.animationItem').on('click.animationItem', '.animation-item', function (e) {
        e.stopPropagation();
        var $this = $(this);

        $this.addClass('active').siblings().removeClass('active');
        // // 设置点击对象的值
        self.$selectAnimateDom = $this;
    });

    // 删除动画
    $animationList.off('click.animationDelete').on('click.animationDelete', '.animation-delete', function (e) {
        e.stopPropagation();
        $(this).closest('.animation-item').remove();
        // 重新设置 layer动画 dom, obj
        setAnimate(self);
    });

    // 选择动画
    $('#animatesList').off('click.liDataAniamte').on('click.liDataAniamte', "li[data-animate]", function (e) {
        e.stopPropagation();
        if (!self.$selectAnimateDom) {
            $.tip({
                msg: '请先添加动画，或选择动画列表！',
                type: 'danger'
            });
            return;
        }

        // 保留原来的时间，延迟，次数
        var old = {};
        old.time = self.$selectAnimateDom.find('.animation-time').val();
        old.delay = self.$selectAnimateDom.find('.animation-delay').val();
        old.count = self.$selectAnimateDom.find('.animation-count').val();
        old.fun = self.$selectAnimateDom.find('.animation-fun').val();

        var animate = $(this).data('animate');
        var name = $(this).data('name');
        var type = $(this).data('type');
        var time = $(this).data('time');
        var delay = $(this).data('delay');
        var count = $(this).data('count');
        var fun = $(this).data('fun');

        // 初始化 动画 li 区域
        self.$selectAnimateDom.attr('data-animate', animate);
        self.$selectAnimateDom.attr('data-name', name);
        self.$selectAnimateDom.attr('data-type', type);
        self.$selectAnimateDom.find('.animation-time').val(old.time || time);
        self.$selectAnimateDom.find('.animation-delay').val(old.delay || delay);
        self.$selectAnimateDom.find('.animation-count').val(old.count || count);
        self.$selectAnimateDom.find('.animation-fun').val(old.fun || fun);

        // 设置名字
        type = animateType(type);
        self.$selectAnimateDom.find('.animation-name').attr('data-title', type + ':' + name).html(type + ':' + name);

        // 重新设置 layer动画 dom, obj
        setAnimate(self);
    });

    // 修改动画参数
    $animationList.off('changes.input').on('changes.input', 'input', function (e, val) {
        e.stopPropagation();
        setAnimate(self);
    });

    // 选择动画函数
    $animationList.off('change.animateFun').on('change.animateFun', '.animation-fun', function (e, val) {
        e.stopPropagation();
        setAnimate(self);
    });

    // 添加动画
    $('#animationAdd').off('click').on('click', function (e) {
        e.stopPropagation();
        $('#animationList').append(tplAnimateHTML());
        $('#animationList').find('li').last().trigger('click.animationItem');
        setAnimate(self);
    });
}

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var blankImg = exports.blankImg = '/assets/images/imgDom.jpg'; // 默认替代图片

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextLayer = undefined;

var _getPrototypeOf = __webpack_require__(106);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = __webpack_require__(63);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(107);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(108);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__(64);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.textDom = textDom;

__webpack_require__(287);

var _layer = __webpack_require__(189);

var _layer2 = _interopRequireDefault(_layer);

var _setTpl = __webpack_require__(288);

var _fun = __webpack_require__(290);

var font = _interopRequireWildcard(_fun);

var _filterTxt = __webpack_require__(291);

var _AppDataFun = __webpack_require__(10);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// layer 模板
// 设置文本样式
function textDom(obj) {
    var shtml = '';
    var d = obj.data;
    if (d.data) {
        shtml = '<div class="el-text" style="' + d.fontStyle + '">' + d.data + '</div>';
    }
    return '\n    <div id="' + (obj.id || '') + '" data-uefun="' + (obj.ue ? $.escape(obj.ue) : '') + '" class="layer layer-text" style="' + $.toStyle(obj.style) + '">\n        <div class="element" style="' + $.toStyle(obj.estyle, obj.animate) + '">\n            ' + (shtml || '<div>请输入文本内容</div>') + '\n        </div>\n    </div>';
}

// layer 原始数据
// 图片模版 。。

var TextLayer = exports.TextLayer = function TextLayer(animate, data, estyle, style, type, typename) {
    (0, _classCallCheck3.default)(this, TextLayer);

    this.animate = animate || [];
    this.data = {
        data: '<div>请输入文本内容</div>',
        fontStyle: ''
    };
    this.estyle = estyle || {};
    this.style = style || {
        width: '200px',
        height: '160px',
        top: '10px',
        left: '10px',
        'z-index': 9999
    };
    this.ue = null;
    this.type = type || 'text';
    this.typename = typename || '文本';
};

var Text = function (_Layer) {
    (0, _inherits3.default)(Text, _Layer);

    function Text(layer) {
        (0, _classCallCheck3.default)(this, Text);
        return (0, _possibleConstructorReturn3.default)(this, (Text.__proto__ || (0, _getPrototypeOf2.default)(Text)).call(this, layer));
    }

    // 事件绑定


    (0, _createClass3.default)(Text, [{
        key: 'initEvent',
        value: function initEvent() {
            var self = this;
            var $exTextEdit = $('#exTextEdit');

            // 自定义事件
            $exTextEdit.off('keyup').on('keyup', function (e) {
                // 复制内
                if (e.ctrlKey && e.keyCode === 86) {
                    e.stopPropagation();
                    $(this).trigger('edit', 'copy');
                } else {
                    $(this).trigger('edit');
                }
            });

            // 变化事件监听
            // console.log('绑定');
            $exTextEdit.off('edit').on('edit', function (e, copy) {
                var $this = $(this);
                var style = $this.attr('style');
                var sHtml = '';

                // 如果是复制内容, 自动清除格式
                if (copy) {
                    $this.removeAttr('style').find('span').removeAttr('style');
                }
                sHtml = $this.html();
                var eHtml = '<div style="' + style + '" class="el-text">' + sHtml + '</div>';
                // console.log('$$$$', style);
                // 重新设置layer 对象
                self.layer.data.data = sHtml;
                self.layer.data.fontStyle = style;
                // 设置 self
                AppData.edit.layerDom.find('.element').html(eHtml);
                (0, _AppDataFun.AppDataChange)();
            });

            // 字体颜色
            $('#exZiTiYanSe').off('change').on('change', function (e) {
                $exTextEdit.css('color', e.target.value);
                $exTextEdit.trigger('edit');
            });

            // 字体背景色
            // $('#exFontBg').off('change').on('change', function(e) {
            //     // 字体
            //     $exTextEdit.find('.txt').css('background-color', e.target.value);
            //     $exTextEdit.trigger('edit');
            // });

            // 字体大小
            $('#exFontSize').off('changes').on('changes', function (e) {
                // 字体
                $exTextEdit.css('font-size', e.target.value);
                $exTextEdit.trigger('edit');
            });

            // 字体间距
            $('#exFontSpace').off('changes').on('changes', function (e) {
                $exTextEdit.css('letter-spacing', e.target.value);
                $exTextEdit.trigger('edit');
            });

            // 字体行高
            $('#exFontLineHeight').off('changes').on('changes', function (e) {
                $exTextEdit.css('line-height', e.target.value);
                $exTextEdit.trigger('edit');
            });

            // 样式调试
            $('#exTextBtns').off('click').on('click', '.ex-btn', function (e) {
                var key = $(this).attr('data-fun');
                var $el = $exTextEdit;
                switch (key) {
                    case 'bold':
                        font.setBold($el);break;
                    case 'italic':
                        font.setOblique($el);break;
                    case 'strikethrough':
                        font.setFontLine($el, 'line-through');break;
                    case 'underline':
                        font.setFontLine($el, 'underline');break;
                    case 'indent':
                        font.fontDent($el, 'indent');break;
                    case 'dedent':
                        font.fontDent($el, 'dedent');break;
                    case 'alignright':
                        font.fontAlign($el, 'right');break;
                    case 'aligncenter':
                        font.fontAlign($el, 'center');break;
                    case 'alignleft':
                        font.fontAlign($el, 'left');break;
                    case 'eraser':
                        font.clearStyle($el);break;
                }
                $exTextEdit.trigger('edit');
            });
        }

        // 模板

    }, {
        key: 'render',
        value: function render() {
            // 图片模板
            var tpls = (0, _setTpl.setTpl)(this);

            var _getSetBoxTpl = this._getSetBoxTpl(),
                basicTpls = _getSetBoxTpl.basicTpls,
                bgColorTpls = _getSetBoxTpl.bgColorTpls,
                basicMoreTpls = _getSetBoxTpl.basicMoreTpls;

            // 编辑区域


            $('#setStyle').empty().html(basicTpls + tpls + bgColorTpls + basicMoreTpls);
        }

        // 初始化

    }, {
        key: 'init',
        value: function init() {

            // 初始化 公用模块
            this._init();

            // 初始化设置区域
            this.render();

            // 设置区域事件绑定，事件绑定在 render 之后执行
            this._initEvent();
            this.initEvent();

            // console.log('layer::img 11 =>', this);
            (0, _AppDataFun.setLayerClass)(this);
        }
    }]);
    return Text;
}(_layer2.default);

exports.default = Text;

/***/ }),
/* 287 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setTpl = setTpl;

var _getCssInStyle = __webpack_require__(289);

/**
 * 设置模板
*/
function setTpl(self) {
    var obj = self.layer;
    var str = '<div class="ex-set-text">\n        <div class="ex-btns" id="exTextBtns">\n            <a class="ex-btn" data-fun="bold"><i class="iconfont icon-bold"></i></a>\n            <a class="ex-btn" data-fun="italic"><i class="iconfont icon-italic"></i></a>\n            <a class="ex-btn" data-fun="strikethrough"><i class="iconfont icon-strikethrough"></i></a>\n            <a class="ex-btn" data-fun="underline"><i class="iconfont icon-underline"></i></a>\n            <a class="line"></a>\n            <a class="ex-btn" data-fun="indent"><i class="iconfont icon-indent"></i></a>\n            <a class="ex-btn" data-fun="dedent"><i class="iconfont icon-dedent"></i></a>\n            <a class="line"></a>\n            <a class="ex-btn" data-fun="alignright"><i class="iconfont icon-alignright"></i></a>\n            <a class="ex-btn" data-fun="aligncenter"><i class="iconfont icon-aligncenter"></i></a>\n            <a class="ex-btn" data-fun="alignleft"><i class="iconfont icon-alignleft"></i></a>\n            <a class="line"></a>\n            <!-- <a class="ex-btn" data-fun="chain"><i class="iconfont icon-chain"></i></a>\n            <a class="ex-btn" data-fun="chainbroken"><i class="iconfont icon-chainbroken"></i></a>\n            <a class="ex-btn" data-fun="eraser"><i class="iconfont icon-eraser"></i></a><br/> -->\n\n            <!-- <div class="mt-select-diy">\n                <div class="mt-select-title">\u5B57\u4F53\u9009\u62E9</div>\n                <div class="mt-select-body" style="display: none;">\n                    \u8FD9\u91CC\u968F\u4FBF\u5199\u70B9\u4EC0\u4E48...\n                </div>\n            </div> -->\n            \n            <a title="\u6587\u5B57\u989C\u8272" class="ex-btn ex-btn-fontcolor" data-fun="zitiyanse">\n                <input class="mt-color-hidden" id="exZiTiYanSe" type="color" />\n                <i class="iconfont icon-zitiyanse"></i>\n            </a>\n            <!-- <a title="\u6587\u5B57\u80CC\u666F" class="ex-btn ex-btn-fontcolor" data-fun="a">\n            <input class="mt-color-hidden" id="exFontBg" type="color" />\n                <i class="iconfont icon-a"></i>\n            </a> -->\n            <br/>\n\n            <a title="\u5B57\u4F53\u5927\u5C0F" class="ex-btn"><i class="iconfont icon-zitidaxiao"></i></a>\n            <input mt-wheel="12,1,60" id="exFontSize" class="mt-input" mt-type=\'px\' type="text" value="' + ((0, _getCssInStyle.getStyle)(obj.data.fontStyle, 'font-size') || '14px') + '" placeholder="\u5B57\u4F53\u5927\u5C0Fpx" name="">\n\n            <a title="\u6587\u5B57\u95F4\u8DDD" class="ex-btn"><i class="iconfont icon-textwidth"></i></a>\n            <input mt-wheel="0,1,100" id="exFontSpace" class="mt-input" mt-type=\'px\' type="text" value="' + ((0, _getCssInStyle.getStyle)(obj.data.fontStyle, 'letter-spacing') || 0) + '" placeholder="\u6587\u5B57\u95F4\u8DDD" name="">\n\n            <a title="\u6587\u5B57\u884C\u9AD8" class="ex-btn"><i class="iconfont icon-textheight"></i></a>\n            <input mt-wheel="0,1,1000" id="exFontLineHeight" class="mt-input" mt-type=\'px\' type="text" value="' + ((0, _getCssInStyle.getStyle)(obj.data.fontStyle, 'line-height') || '21px') + '" placeholder="\u6587\u5B57\u884C\u9AD8" name="">\n        </div>\n        <div class="ex-text-edit">\n            <div style="' + obj.data.fontStyle + '" id="exTextEdit" contenteditable="true">\n                ' + obj.data.data + '\n            </div>\n        </div>\n    </div>';
    return str;
}

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStyle = getStyle;
/**
 * 获取css 从 style 中
*/
function getStyle(style, key) {
    var val = false;
    if (style) {
        var arr = style.split(';');
        arr.forEach(function (elem, index) {
            if (elem.indexOf(key) !== -1) {
                val = elem.split(':')[1];
                val = $.trim(val);
            }
        });
    }
    return val;
}

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setBold = setBold;
exports.setOblique = setOblique;
exports.setFontLine = setFontLine;
exports.fontDent = fontDent;
exports.fontAlign = fontAlign;
exports.setLink = setLink;
exports.clearStyle = clearStyle;
exports.getCurPos = getCurPos;
exports.setCurPos = setCurPos;
/**
 * @desc 设置字体加粗
 * @param $el 文本框对象
*/
function setBold($el) {
    var bold = $el.css('font-weight');
    if (bold == '400') {
        $el.css('font-weight', 'bolder');
    } else {
        $el.css('font-weight', '400');
    }
}

/**
 * @desc 设置字体倾斜
 * @param $el 文本框对象
*/
function setOblique($el) {
    var style = $el.css('font-style');
    if (style == 'oblique') {
        $el.css('font-style', 'normal');
    } else {
        $el.css('font-style', 'oblique');
    }
}

/**
 * @desc 设置文字线条
 * @param $el 文本框对象
 * @param val 线的位置 line-through, underline
*/
function setFontLine($el, val) {
    var style = $el.css('text-decoration');
    if (style.indexOf(val) === -1) {
        $el.css('text-decoration', val);
    } else {
        $el.css('text-decoration', 'none');
    }
}

/**
 * @desc 设置字缩进
 * @param $el 文本框对象
 * @param val 缩进方向 indent，dedent
 */
function fontDent($el, val) {
    var style = parseInt($el.css('text-indent'), 10);
    var fontSize = parseInt($el.css('font-size'), 10);
    if (val === 'indent') {
        style += fontSize;
    } else if (val === 'dedent') {
        style -= fontSize;
    } else {
        // ...
    }
    $el.css('text-indent', style);
}

/**
 * @desc 文本对齐方式
 * @param $el 文本框对象
 * @param val 对齐方向 left, center, right
*/
function fontAlign($el, val) {
    var style = $el.css('text-align');
    // console.log(style);
    $el.css('text-align', val);
}

/**
 * @desc 超链接
 * @param $el 文本框对象
 * @param val 对齐方向 left, center, right
*/
function setLink($el, val) {
    var style = $el.attr('mt-exa-link') || false;
}

/**
 * @desc 清除样式
 * @param $el 文本框对象
*/
function clearStyle($el) {
    $el.attr('style', '');
}

// 获取光标位置
function getCurPos(textDom) {
    var cursorPos = 0;
    if (document.selection) {
        // IE Support
        textDom.focus();
        var selectRange = document.selection.createRange();
        selectRange.moveStart('character', -textDom.value.length);
        cursorPos = selectRange.text.length;
    } else if (textDom.selectionStart || textDom.selectionStart == '0') {
        // Firefox support
        cursorPos = textDom.selectionStart;
    }
    return cursorPos;
}

// 设置光标位置
function setCurPos(textDom, pos) {
    if (textDom.setSelectionRange) {
        // IE Support
        textDom.focus();
        textDom.setSelectionRange(pos, pos);
    } else if (textDom.createTextRange) {
        // Firefox support
        var range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filterTxt = filterTxt;
/**
 * @desc 过滤 txt 文本
 * @param $this 文本box jquery对象
 * @return shtml 新的文本
*/
function filterTxt($this) {
    // 设置 sHtml ，给每个文字加个 class txt, 给每行加 txt-line
    var shtml = '';
    $this.find('div').each(function (index, elem) {
        var str = $(this).html();
        var arr = []; // 存放拆分的字符串
        var code = '<div class="txt-line">';
        // console.log(str);
        // 如果是换行
        if (str.indexOf('<br>') !== -1) {
            arr = [str];
        } else {
            // 先去掉 <span class="txt"></span> 标签
            str = str.replace(/<span class="txt"( style=".+")?>/g, '');
            str = str.replace(/<\/span>/g, '');
            // 去掉空格
            str = str.replace(/&nbsp;/g, ' ');
            // 拆分数组
            arr = str.split('');
        }

        arr.forEach(function (elem, index) {
            // console.log(elem);
            if (elem === ' ') {
                code += '&nbsp;';
            } else if (elem === '<br>') {
                code += '<br>';
            } else {
                code += '<span class="txt">' + elem + '</span>';
            }
        });

        code += '</div>';
        shtml += code;
    });

    return shtml;
}

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(177);

var _promise2 = _interopRequireDefault(_promise);

var _stringify = __webpack_require__(59);

var _stringify2 = _interopRequireDefault(_stringify);

exports.appToHtmlFile = appToHtmlFile;
exports.eventAppViewShow = eventAppViewShow;
exports.appToHTML = appToHTML;

var _indexedDB = __webpack_require__(103);

var db = _interopRequireWildcard(_indexedDB);

var _ajax = __webpack_require__(109);

var _AppDataFun = __webpack_require__(10);

var _loading = __webpack_require__(226);

var _sliderAnimate = __webpack_require__(225);

var _totalLayerType = __webpack_require__(293);

var _saveAppHtml = __webpack_require__(294);

var _h5dsUtils = __webpack_require__(124);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc 将AppData里面的 img 单独拿出来
 * @param data 也就是 传入一个 app 对象
*/
function getAppDataImgs(data) {
    var arr = [];
    var pages = data.pages;

    if (data.style['background-image']) {
        arr.push(data.style['background-image']);
    }
    pages.forEach(function (page) {
        if (page.style['background-image']) {
            arr.push(page.style['background-image']);
        }
        page.layers.forEach(function (layer) {
            if (layer.type === 'img') {
                arr.push(layer.data.src);
            }
        });
    });

    return arr;
}

// app 页面的数据
/**
 * @desc 传入一个 app 对象，生成对应的 html 文件，这个方法必须是一个纯方法
 * 因为这个方法被案例中心，新建app的时候调用
*/
// indexedDB
function appToHtmlFile(app) {
    var types = (0, _totalLayerType.totalLayerType)(app);
    var fixedUp = app.fixeds[0];
    var fixedDown = app.fixeds[1];

    return '\n        <!doctype html>\n        <html>\n        <head>\n            <title>' + app.name + '</title>\n            <meta name="description" content="' + app.info + '">\n            <meta name="keywords" content="' + app.info + '">\n            <meta http-equiv="X-UA-Compatible" content="IE=edge">\n            <meta name="format-detection" content="telephone=no" />\n            <meta name="format-detection" content="email=no" />\n            <meta name="apple-mobile-web-app-capable" content="yes" />\n            <meta name="apple-mobile-web-app-status-bar-style" content="black" />\n            <meta http-equiv="Cache-Control" content="no-cache" />\n            <meta name="x5-fullscreen" content="true">\n            <meta name="x5-orientation" content="portrait">\n            <meta name="x5-page-mode" content="app">\n            <meta charset="utf-8">\n            <script src="/assets/plugin/h5ds.screen.js"></script>\n            <meta name="apple-mobile-web-app-capable" content="yes" />\n            <!-- Set render engine for 360 browser -->\n            <meta name="renderer" content="webkit">\n            <!-- No Baidu Siteapp-->\n            <meta http-equiv="Cache-Control" content="no-siteapp" />\n            <link rel="stylesheet" type="text/css" href="/assets/css/app.css">\n            <link rel="stylesheet" type="text/css" href="/assets/font/iconfont.css">\n            <link rel="stylesheet" type="text/css" href="/assets/plugin/h5ds.app.css">\n            <!--js-->\n            <script src="/assets/plugin/jquery-2.1.1.js"></script>\n            ' + (types.map ? '<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.4.0&key=b10045abfc1d4d22446efdc74f85c238"></script>' : '') + '\n            <script src="/assets/plugin/jquery.touchSwipe.min.js"></script>\n            <script>\n            var IMG_SOURCE = ' + ((0, _stringify2.default)(getAppDataImgs(app)) || '[]') + ';\n            var sliderAnimate = ' + ((0, _stringify2.default)(_sliderAnimate.sliderAnimate[app.slider.animate]) || '{}') + ';\n            </script>\n            <script src="/assets/js/app.js"></script>\n        </head>\n        <body ondragstart="return false">\n            ' + (app.mp3.url ? '<div class="h5ds-video-icon"><i></i><i></i><i></i><i></i></div>' : '') + '\n            ' + (app.mp3.url ? '<audio style="display:none; height:0;" autoplay="autoplay" id="h5dsBgMusic" preload="auto" src="' + app.mp3.url + '" loop="loop"></audio>' : '') + '\n            <div id="h5dsPopups">' + (0, _saveAppHtml.popupHtml)(app.popups) + '</div>\n            <div id="h5dsFixedsUp">' + (0, _saveAppHtml.fixedUpHtml)(fixedUp) + '</div>\n            <div id="h5dsFixedsDown">' + (0, _saveAppHtml.fixedDownHtml)(fixedDown) + '</div>\n            <div class="h5ds-loading" id="h5dsLoading">\n                <div class="h5ds-loadinner">\n                    ' + _loading.loadArr[app.loading] + '\n                    <div class="h5ds-progress" id="h5dsProgress">0</div>\n                </div>\n            </div>\n            <div id="h5dsSwiper" pages-length="' + app.pages.length + '" class="h5ds-swiper" style="' + $.toStyle(app.style) + '">' + (0, _saveAppHtml.pageHtml)(app.pages) + '</div>\n        </body>\n        </html>';
}

/**
 * @desc 设置弹窗的预览数据
*/
function appHTML(app) {
    var fixedUp = app.fixeds[0];
    var fixedDown = app.fixeds[1];
    return '\n        <div class="view-phone">\n            <div class="change-page">\n                <a class="prev" id="pageToPrev"><i class="iconfont icon-a3top"></i></a>\n                <p><span id="nowPageNum">1</span>/' + app.pages.length + '</p>\n                <a class="next" id="pageToNext"><i class="iconfont icon-a3down"></i></a>\n            </div>\n            <div class="view-phone-window">\n                ' + (app.mp3.url ? '<audio style="display:none; height:0;" autoplay="autoplay" id="h5dsBgMusic" preload="auto" src="' + app.mp3.url + '" loop="loop"></audio>' : '') + '\n                ' + (app.mp3.url ? '<div class="h5ds-video-icon"><i></i><i></i><i></i><i></i></div>' : '') + '\n                <div id="h5dsPopups">' + (0, _saveAppHtml.popupHtml)(app.popups) + '</div>\n                <div id="h5dsFixedsUp">' + (0, _saveAppHtml.fixedUpHtml)(fixedUp) + '</div>\n                <div id="h5dsFixedsDown">' + (0, _saveAppHtml.fixedDownHtml)(fixedDown) + '</div>\n                <div id="h5dsSwiper" pages-length="' + app.pages.length + '" class="h5ds-swiper" style="' + $.toStyle(app.style) + '">' + (0, _saveAppHtml.pageHtml)(app.pages) + '</div>\n            </div>\n        </div>\n        <div class="other-info">\n            <div class="infos clearfix">\n                <h2>\u57FA\u672C\u53C2\u6570</h2>\n                <div class="qrcode-box box-left">\n                    <img class="mainpic" src="' + app.img + '"/>\n                </div>\n                <div class="box-right">\n                    <input class="app-name-input" type="text" value="' + app.name + '"/>\n                    <textarea class="app-info-textarea">' + app.info + '</textarea>\n                </div>\n            </div>\n            <div class="qrcode clearfix">\n                <h2>\u4E8C\u7EF4\u7801</h2>\n                <div class="qrcode-box box-left" id="qrcode">\n                    <span class="qrcode-tips">\u53D1\u5E03\u540E\u751F\u6210</span>\n                </div>\n                <div class="box-right qrcode-url-box">\n                    <span class="qrcode-tips">\u53D1\u5E03\u540E\u751F\u6210</span>\n                </div>\n            </div>\n            <div class="btns">\n                <a id="continueEdit" class="btn-edit">\u7EE7\u7EED\u7F16\u8F91</a>\n                <a id="publishApp" class="btn-publish">\u53D1\u5E03</a>\n            </div>\n        </div>\n    ';
}

// 生成二维码
function newQrcode() {
    // 生成二维码
    var owner = $.getUrlData('owner');
    var id = $.getUrlData('id');
    var path = location.origin + '/apps/' + owner + '/' + id + '/index.html';
    $('.qrcode-url-box').html(path);
    var $qrcode = $('#qrcode').empty();
    new QRCode($qrcode[0], {
        text: path,
        width: 140,
        height: 140,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// 事件初始化， 在app.js 里面初始化
var animated = false;
function eventAppViewShow(self) {

    // 切换按钮
    $('#appViewShow').on('click', '#pageToPrev, #pageToNext', function () {

        // 动画中，不能继续点
        if (animated) {
            return;
        }

        var cls = $(this).attr('class');
        var $out = $('#h5dsSwiper').find('.h5ds-swiper-current');
        var outIndex = $out.index();
        if (cls === 'prev') {
            $('#h5dsSwiper').trigger('h5ds_down', {
                $out: $out,
                outIndex: outIndex
            }).trigger('h5ds_left', {
                $out: $out,
                outIndex: outIndex
            });
        } else {
            $('#h5dsSwiper').trigger('h5ds_up', {
                $out: $out,
                outIndex: outIndex
            }).trigger('h5ds_right', {
                $out: $out,
                outIndex: outIndex
            });
        }
    });

    // 继续编辑
    $('#appViewShow').on('click', '#continueEdit', function () {
        $('#appViewShow').trigger('closeModal');
    });

    // 发布
    $('#appViewShow').on('click', '#publishApp', function () {

        var load = $.loading({
            tip: 'H5生成中，请耐心等待！'
        });

        var appid = $.getUrlData('id');
        if (appid === null) {
            $.tip({
                msg: '操作失败！APP的id不见了', //
                type: 'danger' //success,danger,warning
            });
            return;
        }
        (0, _ajax.saveData)({
            id: appid,
            name: AppData.data.name,
            pic: AppData.data.img,
            des: AppData.data.info,
            data: (0, _stringify2.default)(AppData.data),
            shtml: appToHtmlFile(AppData.data)
        }).done(function (res) {
            if (res.success) {
                $.tip();
                load.close();

                newQrcode();
            }
        });
    });

    // 修改名字
    $('#appViewShow').on('change', '.app-name-input', function () {
        var name = $(this).val();
        self.app.name = name;
        $('.a-setname').html(name);
        $('#appSetName').val(name);
        (0, _AppDataFun.AppDataChange)();
    });

    // 修改描述
    $('#appViewShow').on('change', '.app-info-textarea', function () {
        var info = $(this).val();
        self.app.info = info;
        $('#appSetInfo').val(info);
        (0, _AppDataFun.AppDataChange)();
    });
}

// 获取 blob 图片, 约定 arr#index 表示数组
function getBlobImg() {
    // let keys = []; // 记录 AppData.data[key] 中，有blob图片的 key 集合
    var blobObj = [];
    var app = AppData.data;

    // app 主图
    if (app.img.isBlob()) {
        blobObj[app.img.blobId()] = ['img'];
    }

    // app 背景
    if (app.style['background-image'].isBlob()) {
        blobObj[app.style['background-image'].blobId()] = ['style', 'background-image'];
    }

    // pages, layers 背景 layer 的 data.src // 如果还有其他的，都在这里添加
    app.pages.forEach(function (page, i) {
        var pageBg = page.style['background-image'] || '';
        if (pageBg.isBlob()) {
            blobObj[pageBg.blobId()] = ['pages#' + i, 'background-image'];
        }

        // layers
        page.layers.forEach(function (layer, j) {
            var layerBg = layer.style['background-image'] || '';
            var src = '';
            if (layer.data && layer.data.src) {
                src = layer.data.src;
            }
            if (layerBg.isBlob()) {
                blobObj[layerBg.blobId()] = ['pages#' + i, 'layers#' + j, 'background-image'];
            }
            if (src.isBlob()) {
                blobObj[src.blobId()] = ['pages#' + i, 'layers#' + j, 'data', 'src'];
            }
        });
    });

    return blobObj;
}

// 重新设置 AppData.data 重置img，然后渲染弹窗
/**
 * @desc 在替换完二进制地址的照片后，将html渲染到弹窗里面。显示弹窗里面的内容
 * @param objs getBlobImg() 返回的数据，二进制图片 { id: 记录的AppData.data里面的路径}
 * @param allRes indexedDb里面查询到的base64图片。[{id: base64}]
*/
function resetAppData(objs, allRes) {
    var app = AppData.data;
    // 重置img

    var _loop = function _loop(i) {
        var d = allRes[i];
        var keysArr = objs[d.id];
        var point = app; // 临时指针
        keysArr.forEach(function (elem) {
            if (elem === 'background-image' || elem === 'src') {
                point[elem] = d.src;
            } else {
                if (elem.indexOf('#') !== -1) {
                    var arr = elem.split('#');
                    point = point[arr[0]][arr[1]];
                } else {
                    point = point[elem];
                }
            }
        });
    };

    for (var i = 0; i < allRes.length; i++) {
        _loop(i);
    }

    // 替换地址后，保存一次local 避免二次上传图片
    (0, _AppDataFun.AppDataChange)();

    // console.log('img 已经转换 ****', app);
    var html = appHTML(app);
    // console.log(html);

    // render 弹窗
    $('#appViewShowBtn').trigger('click');

    // 关闭弹窗事件
    $('#appViewShow').on('closeBack', function () {
        $(this).find('.mt-modal-full').html('');
    }).find('.mt-modal-full').html('' + html);

    // 自动播放音乐
    (0, _h5dsUtils.autoPlayMusic)();

    // 滑动
    var $h5dsSwiper = $('#h5dsSwiper');
    $h5dsSwiper.h5dsSwiper($.extend(_sliderAnimate.sliderAnimate[app.slider.animate] || {}, {
        len: app.pages.length
    }));
    $h5dsSwiper.off('animateStart animateEnd').on('animateStart', function (e, index) {
        // 切换编号
        $('#nowPageNum').html(index + 1);
        animated = true;
    }).on('animateEnd', function () {
        animated = false;
    });
}

/**
 * AppData.data 组合成HTML代码
 */
function appToHTML() {
    console.log(AppData.data);

    return new _promise2.default(function (resolve1, reject1) {

        // 上传 blob 图片
        db.getAllData('img', function (res) {
            // console.log(res);
            if (!res) {
                // ...
                reject1(false);
                return;
            }

            // 找出 blob 图片
            var objs = getBlobImg();
            // console.log(objs);
            // 如果有图
            var arr = [];

            var _loop2 = function _loop2(i) {
                var d = res[i];
                if (objs[d.id]) {
                    var p = new _promise2.default(function (resolve) {
                        (0, _ajax.uploadImgBase64)({
                            imgData: d.value,
                            name: 'crop_' + d.id
                        }).done(function (res) {
                            if (res.success) {
                                resolve({
                                    id: d.id,
                                    src: res.data.src
                                });
                            }
                        });
                    });
                    arr.push(p);
                }
            };

            for (var i = 0; i < res.length; i++) {
                _loop2(i);
            }
            _promise2.default.all(arr).then(function (allRes) {
                resetAppData(objs, allRes);
                resolve1(true);
            });
        });
    });
}

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.totalLayerType = totalLayerType;
/**
 * @desc 统计app 的layer 种类
*/
function totalLayerType(app) {
    var pages = app.pages;

    var keys = {};
    pages.forEach(function (page) {
        page.layers.forEach(function (layer) {
            if (!keys[layer.type]) {
                keys[layer.type] = 1;
            } else {
                keys[layer.type]++;
            }
        });
    });
    console.log(keys);
    return keys;
}

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.popupHtml = popupHtml;
exports.fixedUpHtml = fixedUpHtml;
exports.fixedDownHtml = fixedDownHtml;
exports.pageHtml = pageHtml;

var _layerSwitch = __webpack_require__(188);

/**
 * @desc 合作HTML字符串的方法集合
*/
function popupHtml(popups) {
    return popups.map(function (popup, index) {
        var noSwiper = '';
        if (popup.style.height && parseInt(popup.style.height, 10) > 486) {
            noSwiper = 'noSwiper';
        }
        return '<div class="h5ds-swiper-page" id="' + (popup.id || '') + '">\n                    <div data-noSwiper="' + noSwiper + '" class="h5ds-swiper-pageinner ' + noSwiper + '" style="' + $.toStyle(popup.style) + '">\n                        <div class="h5ds-swiper-layers">\n                        ' + popup.layers.map(function (layer, index) {
            return (0, _layerSwitch.getLayerDom)(layer);
        }).join('') + '\n                        </div>\n                    </div>\n                </div>';
    }).join('');
}

function fixedUpHtml(fixedUp) {
    return '<div id="' + (fixedUp.id || '') + '" class="h5ds-swiper-page" style="' + $.toStyle(fixedUp.style) + '">\n        <div class="h5ds-swiper-layers">\n        ' + fixedUp.layers.map(function (layer, index) {
        return (0, _layerSwitch.getLayerDom)(layer);
    }).join('') + '\n        </div>\n    </div>';
}

function fixedDownHtml(fixedDown) {
    return '<div id="' + (fixedDown.id || '') + '" class="h5ds-swiper-page" style="' + $.toStyle(fixedDown.style) + '">\n        <div class="h5ds-swiper-layers">\n        ' + fixedDown.layers.map(function (layer, index) {
        return (0, _layerSwitch.getLayerDom)(layer);
    }).join('') + '\n        </div>\n    </div>';
}

function pageHtml(pages) {
    return pages.map(function (page, index) {
        var noSwiper = '';
        if (page.style.height && parseInt(page.style.height, 10) > 486) {
            noSwiper = 'noSwiper';
        }
        return '\n                <div id="' + (page.id || '') + '" data-autoplay="' + (page.slider.autoplay ? page.slider.time : false) + '" data-lock="' + page.slider.lock + '" class="h5ds-swiper-page">\n                    <div data-noSwiper="' + noSwiper + '" class="h5ds-swiper-pageinner ' + noSwiper + '" style="' + $.toStyle(page.style) + '">\n                        <div class="h5ds-swiper-layers">\n                        ' + page.layers.map(function (layer, index) {
            return (0, _layerSwitch.getLayerDom)(layer);
        }).join('') + '\n                        </div>\n                    </div>\n                </div>';
    }).join('');
}

/***/ }),
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(561);


/***/ }),
/* 561 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(59);

var _stringify2 = _interopRequireDefault(_stringify);

__webpack_require__(111);

__webpack_require__(110);

__webpack_require__(245);

__webpack_require__(184);

__webpack_require__(186);

__webpack_require__(125);

var _saveApp = __webpack_require__(292);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//分页
// object 变成 style top:10px; left: 20px; // ... 
function initPage(num) {
    $.ajax({
        type: 'post',
        url: '/api/getUserApps',
        data: { name: '', pageSize: 19, pageNum: num }
    }).done(function (res) {
        var str = '<li class="item" id="addNew"><i class="iconfont icon-jia1"></i></li>';
        if (res.success) {
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                str += '<li class="item' + (num === 1 && i === 0 ? ' active' : '') + '">\n                    <a href="' + (d.url ? d.url : 'javascript:;') + '" target="_blank"><img src="' + d.pic + '"/></a>\n                    <div class="date">' + d.date + '</div>\n                    <div class="info">\n                        <div class="name">' + d.name + '</div>\n                        <div class="desc">' + d.des + '</div>\n                        <a href="/edit?id=' + d.id + '&owner=' + d.owner + '">\u7F16\u8F91</a>\n                        <a class="to-del" data-name="' + d.name + '" data-id="' + d.id + '">\u5220\u9664</a>\n                    </div>\n                </li>';
            }
            $('#applist').html(str);
            // 设置分页
            $('.pagelist').pagelist({
                page: num,
                count: res.count,
                pagesize: 19,
                showpage: 10
            });
        }
    });
}

// 删除
//

// object 变成 style top:10px; left: 20px; // ... 
/**
 * 案例
*/
function delPage() {
    $(document).on('click', '.to-del', function () {
        var id = $(this).attr('data-id');
        $.confirms({
            title: '系统提示',
            content: '\u662F\u5426\u8981\u5220\u9664 ' + $(this).attr('data-name') + '\uFF0C\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D\uFF01',
            width: 300, // 宽度
            callback: function callback(mark) {
                // 回调函数
                if (mark) {
                    $.ajax({
                        type: 'post',
                        url: '/api/delApp',
                        data: {
                            id: id
                        },
                        dataType: 'json'
                    }).done(function (res) {
                        if (res.success) {
                            initPage(1);
                        }
                    });
                }
            }
        }).show();
    });
}

// 添加页面
function addNewPage() {
    $(document).on('click', '#addNew', function () {

        var data = {
            img: '/assets/images/app.png',
            info: '点石H5，官方网站h5ds.com',
            loading: '1',
            mp3: {
                name: '',
                url: ''
            },
            name: '点石H5',
            fixeds: [{
                id: '',
                name: '浮动层上',
                style: {},
                layers: []
            }, {
                id: '',
                name: '浮动层下',
                style: {},
                layers: []
            }],
            popups: [],
            pages: [],
            pagesize: 0,
            slider: {
                animate: 1,
                lock: false,
                autoplay: false,
                time: 5
            },
            style: {
                'background-image': '',
                'background-color': '',
                'background-repeat': '',
                'background-size': ''
            }
        };
        $.ajax({
            type: 'post',
            url: '/api/addData',
            data: {
                name: data.name,
                pic: data.img,
                des: data.info,
                data: (0, _stringify2.default)(data),
                shtml: (0, _saveApp.appToHtmlFile)(data)
            },
            dataType: 'json'
        }).done(function (res) {
            if (res.success) {
                initPage(1);
            } else {
                $.tip({
                    msg: res.msg,
                    type: 'danger',
                    time: 3000
                });
            }
        });
    });
}

$(function () {

    $('[data-name="logout"]').css('display', 'inline-block');

    initPage(1, 19);
    addNewPage();
    delPage();

    $('.pagelist').on('page', function (e, obj) {
        console.log(obj);
        initPage(obj.page);
    });
});

/***/ })
/******/ ]);