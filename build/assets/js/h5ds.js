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
/******/ 	return __webpack_require__(__webpack_require__.s = 507);
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


    // 资源路径，因为资源是后台上传的
};var sourceHome = exports.sourceHome =  false ? 'http://localhost:8200' : 'http://mtsee.h5ds.com';

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
/* 110 */,
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
                var $path = $svg.find('path').eq(index);
                if ($path.attr('style') !== undefined) {
                    $path.attr('style', 'fill:' + elem);
                } else {
                    $path.attr('fill', elem);
                }
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
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//transform过滤器

//用法
// var rotate = $dom.transform('rotate')
// $dom.transform({'rotate','10deg'})

$.fn.transform = function (obj) {
    var transform = $(this).attr('style') || '';
    //获取
    if (typeof obj == 'string') {
        if (transform.indexOf('transform') != -1) {
            return $.getTransform(transform, obj);
        } else {
            return false;
        }
    } else {
        //设置
        var cls = [];

        //保留原来的参数
        var saveOld = function saveOld(str) {
            var val = $.getTransform(transform, str);
            if (val) {
                cls.push(str + '(' + val + ')');
            }
        };
        var arr = ['translate', 'rotate', 'scale', 'skew'];
        for (var i = 0; i < arr.length; i++) {
            if (obj[arr[i]]) {
                cls.push(arr[i] + '(' + obj[arr[i]] + ')');
            } else {
                saveOld(arr[i]);
            }
        }

        cls = cls.join(' ');
        $(this).css({
            '-webkit-transform': cls,
            'transform': cls
        });
    }
};

//获取对应的参数
$.getTransform = function (transform, str) {
    transform = transform || '';
    if (transform.indexOf(str) != -1) {
        var exp = RegExp('.*' + str + '\\((.+?)\\).*');
        return parseFloat(transform.replace(exp, '$1'));
    } else {
        return false;
    }
};

// 获取transform 值
String.prototype.transformValue = function (name) {
    if (this.indexOf(name) != -1) {
        var exp = RegExp('.*' + name + '\\((.+?)\\).*');
        return this.replace(exp, '$1');
    } else {
        return false;
    }
};

/***/ }),
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
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//左侧伸缩
$(function () {

    var $phone = $('#phone');
    $('#flod-btn').on('click', function (e) {
        var left = 330;
        var $temps = $('#temps');
        var $iconfont = $(this).find('.iconfont');
        if ($temps.attr('data-status') == 'show') {
            $temps.attr('data-status', 'hide');
            $iconfont.removeClass('icon-a3left').addClass('icon-a3right');
            $phone.css({
                'left': 0
            });
        } else {
            $temps.attr('data-status', 'show');
            $iconfont.removeClass('icon-a3right').addClass('icon-a3left');
            $phone.css({
                'left': left
            });
        }
    });
});

/***/ }),
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
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _initH5dsSwiperUeFun = __webpack_require__(244);

var _h5dsUtils = __webpack_require__(124);

/**
 * @desc 滑动函数
*/
$.fn.h5dsSwiper = function (setting) {
    var $this = $(this);
    var defaults = {
        inNext: 'pt-page-moveFromBottom', // 进入动画 , 进入是 from , 出去是 to
        outNext: 'pt-page-moveToTop', // 出去动画
        inPrev: 'pt-page-moveFromTop', // 进入动画
        outPrev: 'pt-page-moveToBottom', // 出去动画
        direction: 'up', // 上下， left  设置自动翻页的时候，首页的效果
        loop: true, // 是否循环
        animated: false, // 是否在动
        pageTime: 800, // 页面动画间隔 500 ms
        len: 0 // page length
    };

    var set = $.extend(defaults, setting);

    // 添加，删除 class
    var pageInOut = function pageInOut($in, $out, direc) {

        // 如果只有一页，不翻页
        if (set.len <= 1) {
            return;
        }
        set.animated = true;
        $this.trigger('animateStart', $in.index());
        $in.addClass(set['in' + direc] + ' h5ds-swiper-current');
        $out.addClass(set['out' + direc] + ' h5ds-swiper-current');

        // scroll
        var $noSwiper = $in.find('[data-noSwiper="noSwiper"]');
        if ($noSwiper[0]) {
            $noSwiper.addClass('noSwiper');
        }

        // 初始化地图
        (0, _h5dsUtils.initMap)($in);

        setTimeout(function () {

            $in.find('.h5ds-swiper-layers').css('display', 'block');
            $out.find('.h5ds-swiper-layers').css('display', 'none');

            // 离开后隐藏
            $in.removeClass(set['in' + direc]);
            $out.removeClass(set['out' + direc]);
            $out.removeClass('h5ds-swiper-current');
            set.animated = false;
            $this.trigger('animateEnd');
            autoplayFun();
        }, set.pageTime);
    };

    // 自动翻页
    var autoplayFun = function autoplayFun() {
        var $current = $this.find('.h5ds-swiper-current');
        var autoplay = $current.attr('data-autoplay');
        if (autoplay !== 'false') {
            // 自动翻页
            set.animated = true;
            $this.trigger('animateStart', $current.index());
            setTimeout(function () {
                $this.trigger('h5ds_' + set.direction, {
                    $out: $current,
                    outIndex: $current.index()
                });
            }, autoplay * 1000);
        }
        return autoplay;
    };

    // 默认显示第一页
    var $first = $this.find('.h5ds-swiper-page').eq(0);
    $first.addClass('h5ds-swiper-current');
    $first.find('.h5ds-swiper-layers').css('display', 'block');
    (0, _h5dsUtils.initMap)($first);

    // 自动翻页
    autoplayFun();

    // 监听touch 事件
    var $out = void 0,
        oldY = void 0,
        winHei = $(window).height(),
        pageHei = 0,
        speed = 0,
        tmp = null,
        isBottom = false,
        isTop = false;

    $this.swipe({
        excludedElements: '.noSwiper',
        swipe: function swipe(e, direction, distance, duration, fingerCount, fingerData) {
            // console.log("你用" + fingerCount + "个手指以" + duration + "ms的时间，向" + direction + "滑动了" + distance + "像素 " + $(e.target).attr('class'));
            var $target = $(e.target);
            var $out = $target.closest('.h5ds-swiper-page');
            var $noSwiper = $target.closest('[data-noswiper="noSwiper"]');
            var outIndex = $out.index();
            var lock = $out.attr('data-lock');
            var autoplay = $out.attr('data-autoplay');

            if ($noSwiper[0]) {
                // 如果有noSwiper
                if (direction === 'down' && $noSwiper.hasClass('upSwiper')) {
                    // console.log('上一页');
                    $noSwiper.removeClass('upSwiper');
                } else if (direction === 'up' && $noSwiper.hasClass('downSwiper')) {
                    // console.log('下一页');
                    $noSwiper.removeClass('downSwiper');
                } else {
                    $noSwiper.removeClass('upSwiper downSwiper').addClass('noSwiper');
                    return;
                }
            }

            // 锁定翻页
            if (set.animated) {
                return;
            } else if (lock === 'true') {
                return;
            } else if (autoplay !== 'false') {
                // 自动翻页
                return;
            } else {
                // 执行翻页
                $this.trigger('h5ds_' + direction, {
                    $out: $out,
                    outIndex: outIndex
                });
            }
        }
    }).off('h5ds_up h5ds_down h5ds_right h5ds_left').on('h5ds_up h5ds_right', function (e, obj) {
        var $out = obj.$out;
        var outIndex = obj.outIndex;
        var inIndex = 0;
        if (outIndex === set.len - 1) {
            // 不循环展示
            if (!set.loop) {
                return;
            }
        } else {
            inIndex = outIndex + 1;
        }
        var $in = $this.find('.h5ds-swiper-page').eq(inIndex);
        pageInOut($in, $out, 'Next');
    }).on('h5ds_down h5ds_left', function (e, obj) {
        var $out = obj.$out;
        var outIndex = obj.outIndex;
        var inIndex = 0;
        if (outIndex === 0) {
            // 不循环展示
            if (!set.loop) {
                return;
            }
            inIndex = set.len - 1;
        } else {
            inIndex = outIndex - 1;
        }
        var $in = $this.find('.h5ds-swiper-page').eq(inIndex);
        pageInOut($in, $out, 'Prev');
    });

    // 页面跳转
    this.toPage = function (index) {
        var $out = $('.h5ds-swiper-current');
        var nowIndex = $out.index();
        var $in = $this.find('.h5ds-swiper-page').eq(index);
        if ($in[0]) {
            if (nowIndex === index) {
                console.warn('已经是当前页面！');
                return;
            }
            pageInOut($in, $out, nowIndex < index ? 'Next' : 'Prev');
        } else {
            console.warn('您要跳转的页面不存在！请重新设置');
        }
    };

    // 实例化交互方法
    (0, _initH5dsSwiperUeFun.initH5dsSwiperUeFun)(this);

    // svg 预加载
    (0, _h5dsUtils.svgLazy)();

    return this;
};

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initH5dsSwiperUeFun = initH5dsSwiperUeFun;
//////////////////////////////////////////////////////////////////////////////////////////
// 交互事件
function initH5dsSwiperUeFun(swiper) {

    $(document).find('[data-uefun]').each(function () {
        var $this = $(this);
        var obj = $this.attr('data-uefun'); // 
        if (obj) {
            try {
                obj = JSON.parse(unescape(obj));
            } catch (e) {
                obj = null;
                console.warn('data-uefun 格式错误！具体见：', unescape(obj), this);
            }
            if (obj) {
                // 监听点击事件
                $this.swipe({
                    tap: function tap(e) {
                        if ($(e.target).css('opacity') == 0) {
                            return;
                        }
                        for (var key in obj) {
                            console.log(obj, key);
                            switch (key) {
                                case 'link':
                                    toLink(obj[key], $this, swiper);break;
                                case 'toPage':
                                    toPage(obj[key], $this, swiper);break;
                                case 'tel':
                                    toTel(obj[key], $this, swiper);break;
                                case 'msg':
                                    toMsg(obj[key], $this, swiper);break;
                                case 'hideShow':
                                    toHideShow(obj[key], $this, swiper);break;
                            }
                        }
                    }
                });
            }
        }
    });
}window;

// 超链接
function toLink(obj, $layer, swiper) {
    location.href = obj.data;
}

// 发短信
function toMsg(obj, $layer, swiper) {
    location.href = 'sms:' + obj.data;
}

// 打电话
function toTel(obj, $layer, swiper) {
    location.href = 'tel:' + obj.data;
}

// 页面跳转
function toPage(obj, $layer, swiper) {
    swiper.toPage(obj.data);
}

// 隐藏显示元素
function toHideShow(obj, $layer, swiper) {
    var ids = [];
    try {
        ids = obj.data.ids.split(',');
    } catch (e) {
        // ...
        console.warn('obj.data.ids 为 null');
    }
    if (obj.data.type === 'hide') {
        ids.forEach(function (elem, index) {
            $('#' + elem).hide();
        });
    } else if (obj.data.type === 'show') {
        ids.forEach(function (elem, index) {
            $('#' + elem).show();
        });
    } else if (obj.data.type === 'showhide') {
        ids.forEach(function (elem, index) {
            var $dom = $('#' + elem);
            if ($dom.is(':hidden')) {
                $dom.show();
            } else {
                $dom.hide();
            }
        });
    } else {
        // ...
    }
}

/***/ }),
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
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!$('.mt-modal-bg')[0]) {
    $('body').append('<div class="mt-modal-bg"></div>');
}
_global2.default.$doc.on('click.modal', '[mt-modal]', function (e) {
    var domName = $(this).attr('mt-modal');
    var $modal = $(domName);
    var $bg = $('.mt-modal-bg');
    var $close = $modal.find('.mt-modal-close');

    // 显示弹窗
    var showModal = function showModal() {
        $modal.removeClass('zoomOut').addClass('animated zoomIn').show();
        $bg.show();
    };

    showModal();

    // 关闭事件绑定
    $close.off('click').on('click', function () {
        $modal.removeClass('zoomIn').addClass('zoomOut');
        $modal.trigger('closeBack');
        setTimeout(function () {
            $modal.hide();
            $bg.hide();
            $close.off('click');
            $modal.off('closeModal');
        }, 800);
    });

    // 对外部提供的关闭事件
    $modal.off('closeModal').on('closeModal', function (a) {
        $close.trigger('click');
    });

    // 对外提供显示事件
    $modal.off('showModal').on('showModal', function () {
        showModal();
    });
});

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('mousewheel.wheel', '[mt-wheel]', function (e) {
    e.preventDefault();
    var val = parseFloat($(this).val());
    var arr = $(this).attr('mt-wheel').split(',');
    var num = parseFloat(arr[1]);
    // 往下加
    if (e.originalEvent.deltaY > 0) {
        val = val.add(num);
    } else {
        val = val.sub(num);
    }
    if (val < parseFloat(arr[0])) {
        val = parseFloat(arr[0]);
    }
    if (val > parseFloat(arr[2])) {
        val = parseFloat(arr[2]);
    }
    $(this).val(val);
    $(this).trigger('change');
    // $(this).trigger('changes', val);
    // $(this).trigger('input');
}); // 自定义鼠标滚动事件

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('click.selectdiy', '.mt-select-diy', function (e) {
    var $body = $(this).find('.mt-select-body');
    if ($(e.target).closest('.mt-select-body')[0]) {
        return;
    }
    if ($body.is(':hidden')) {
        $body.show();
    } else {
        $body.hide();
    }
}).on('click.selectdiy', function (e) {
    if (!$(e.target).closest('.mt-select-diy')[0]) {
        $('.mt-select-body').hide();
    }
});

_global2.default.$doc.on('click', '.mt-select', function (e) {
    e.stopPropagation();
    console.log('aa');
    $(this).find('select')[0].click();
});

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//提示信息
_global2.default.$doc.off("click.toggle").on("click.toggle", "[data-toggle]", function () {
    var $this = $(this);
    var data = JSON.parse($this.attr("data-toggle"));
    for (var i = 0; i < data.length; i++) {
        $(data[i].dom).toggleClass(data[i].class);
    }
});

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('mousedown.uniqlist', '.mt-uniqlist', function (e) {

    var xd = e.pageX,
        yd = e.pageY,
        _this = this,
        $this = $(this);

    $this.trigger('uniqstart');

    //点击其他区域，不拖动
    if (e.target.className == 'mt-uniqlist') {
        return;
    }

    //处理 二次拖动clone的BUG
    if ($(e.target).closest('.mt-uniq-clone')[0]) {
        return;
    }

    var $li = $(e.target).closest('li');

    if (!$li[0]) {
        return;
    }

    var left = parseInt($li.position().left, 10),
        top = parseInt($li.position().top, 10),
        liHei = $li.height();
    var startIndex = $li.index();

    var $clone = null;

    //使用clone 方法
    var cloneDom = function cloneDom() {
        $li.addClass('mt-uniq-start').siblings('li').removeClass('mt-uniq-start');
        //使用clone
        $clone = $($li.clone());
        $clone.addClass('mt-uniq-clone').css({
            left: left,
            top: top,
            width: $li.width(),
            height: $li.height(),
            position: 'absolute'
        });
        $this.append($clone.prop('outerHTML'));
        $clone = $('.mt-uniq-clone');
    };

    //这里只能上下拖动
    var outHei = parseInt($li.css('margin-top'), 10) + parseInt($li.css('margin-bottom'), 10);
    var maxHei = liHei + outHei;

    var litop = $li.css('top');
    litop = litop != 'auto' ? parseInt(litop, 10) : 0;

    //处理click事件
    var clickMark = true;
    var initCloneMark = false;

    _global2.default.$doc.on('mousemove.uniqlist', function (em) {
        var move = litop + (em.pageY - yd);

        //允许2px的误差
        if (Math.abs(move) > 3) {
            clickMark = false;
            //只执行一次
            if (!initCloneMark) {
                initCloneMark = true;
                cloneDom();
                cloneDom = null;
            }
            $clone.css({
                left: left + (em.pageX - xd),
                top: top + (em.pageY - yd)
            });

            if (move > 0 && move > maxHei) {
                if ($li.next()[0]) {
                    litop -= maxHei;
                    $li.before($li.next());
                }
            } else if (move < 0 && -move > maxHei) {
                if ($li.prev()[0]) {
                    litop += maxHei;
                    $li.after($li.prev());
                }
            }
        }
    }).on('mouseup.uniqlist', function (e) {
        var endleft = parseInt($li.position().left, 10),
            endtop = parseInt($li.position().top, 10);

        //click事件
        if (clickMark) {
            $li.removeClass('mt-uniq-start');
            $this = null;
            $li = null;
        } else {
            $clone.animate({
                left: endleft,
                top: endtop
            }, 500, function () {
                $clone.remove();
                $li.removeClass('mt-uniq-start');
                var endIndx = $li.index();
                if (endIndx >= 0 && startIndex != endIndx) {
                    $this.trigger('uniqend', {
                        from: startIndex,
                        to: endIndx
                    });
                }
                $clone = null;
                $this = null;
                $li = null;
            });
        }
        _global2.default.$doc.off('mousemove.uniqlist');
        _global2.default.$doc.off('mouseup.uniqlist');
    });
});

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('click.tabs', '.mt-tab-head', function (e) {
    var $this = $(this);
    var $tab = $this.closest('.mt-tab');
    var index = $this.index();
    $this.addClass('mt-active').siblings('.mt-tab-head').removeClass('mt-active');
    $tab.find('>.mt-tab-body').find('>.mt-tab-box').removeClass('mt-active').eq(index).addClass('mt-active');
    $tab.trigger('changes', {
        dom: $this,
        index: index
    });
});

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('mouseover.title', '[data-title]', function (e) {
    var title = $(this).attr('data-title'),
        divstr = '',
        left = $(this).offset().left,
        top = $(this).offset().top,
        hei = $(this).height(),
        wid = $(this).width();
    divstr = '<div class="mt-title mt-title-animated animated zoomIn" style="left:' + left + 'px; top:' + (top + hei + 2) + 'px;">' + title + '</div>';
    $('body').append(divstr);
}).on('mouseout.title', function (e) {
    $('.mt-title').remove();
});

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

__webpack_require__(185);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//transform 方法

//控制杆 \u8be5\u8f6f\u4ef6\u7531\u8463\u6d9b\u72ec\u7acb\u5f00\u53d1
$.fn.crop = function (setting) {
    var defaults = {
        movex: true,
        movey: true,
        borderWidth: -500,
        callback: null,
        delBtn: false,
        defaultWidth: 323, // 默认的图片框宽度
        defaultHeight: 218, // 默认的图片框高度
        wh: ['100%', '100%'] // 如果设置 100% 就表示默认 全屏显示，也可以设置 1,2 表示比例
    };
    var set = $.extend(defaults, setting);

    // 剪切区域宽度和高度，这里定义的全局变量，不做参数传递
    set['width'] = 0;
    set['height'] = 0;

    var _this = this;
    var $crop = $(this);
    var $this = $(this).empty(); // 渲染前，先清空内容，解除事件
    var srcOld = $this.data('src');

    if (!srcOld) {
        return false;
    }

    var idname = +new Date(); // 时间戳做事件别名
    var shtml = '<div class="mt-crop">\n                    <div class="mt-crop-bg">\n                        <div class="mt-crop-box">\n                            <div class="mt-crop-controlbox">\n                                <div class="mt-crop-control">\n                                    <span class="mt-control-center"></span>\n                                    <span class="mt-control-top"></span>\n                                    <span class="mt-control-left"></span>\n                                    <span class="mt-control-right"></span>\n                                    <span class="mt-control-bottom"></span>\n                                    <span class="mt-control-topleft"></span>\n                                    <span class="mt-control-topright"></span>\n                                    <span class="mt-control-bottomleft"></span>\n                                    <span class="mt-control-bottomright"></span>\n                                </div>\n                            </div>\n                            <img class="mt-crop-img" src="' + srcOld + '" alt="">\n                        </div>\n                    </div>\n                    <div class="mt-crop-fun">\n                        <a class="mt-crop-100">100%</a><!--\n                        --><a class="mt-crop-11">1:1</a><!--\n                        --><a class="mt-crop-23">2:3</a><!--\n                        --><a class="mt-crop-34">3:4</a><!--\n                        --><a class="mt-crop-35">3:5</a>\n                    </div>\n                    <div class="mt-crop-btns">\n                           <a class="mt-cropbtn-change a-selectimg"><i class="iconfont icon-icoreset"></i> \u6362\u56FE</a><!--\n                        --><a class="mt-cropbtn-crop"><i class="iconfont icon-icocrop"></i> \u88C1\u526A</a><!--\n                        --><a class="mt-cropbtn-init"><i class="iconfont icon-icoinit"></i> \u8FD8\u539F</a><!--\n                        -->' + (set.delBtn ? '<a class="mt-cropbtn-del"><i class="iconfont icon-icodel"></i> 删除</a>' : '') + '\n                    </div>\n                </div>';

    $this.find('.mt-crop').remove();
    $this = $this.empty().html(shtml).find('.mt-crop');

    var swid, shei; //选区大小
    var $bg = $this.find('.mt-crop-bg');
    var bg = {
        wid: parseInt($bg.width(), 10),
        hei: parseInt($bg.height(), 10)
    };
    var img = null;
    var x = set.borderWidth,
        y = set.borderWidth; //移动位置
    //初始化图片
    var $img = $this.find('.mt-crop-img');

    //移动
    var moveFun = function moveFun(e, _this) {
        var down = {
            x: e.pageX,
            y: e.pageY
        };
        var $box = $(_this).parent();
        var box = {
            left: parseInt($box.css('left'), 10),
            top: parseInt($box.css('top'), 10)
        };
        _global2.default.$doc.on('mousemove.crop_move', function (em) {
            var left = box.left + (em.pageX - down.x) / _global2.default.scale - set.borderWidth;
            var top = box.top + (em.pageY - down.y) / _global2.default.scale - set.borderWidth;
            if (top + shei > set.height) {
                top = set.height - shei - 2;
            }
            if (top < 0) {
                top = 0;
            }
            if (left + swid > set.width) {
                left = set.width - swid - 2;
            }
            if (left < 0) {
                left = 0;
            }
            top += set.borderWidth;
            left += set.borderWidth;

            y = top;
            x = left;

            var style = {
                left: left,
                top: top
            };
            if (!set.movex) {
                delete style.left;
            }
            if (!set.movey) {
                delete style.top;
            }
            $box.css(style);
            style = null;
        }).on('mouseup.crop_move', function (e) {
            _global2.default.$doc.off('mousemove.crop_move mouseup.crop_move');
        });
    };

    //缩放
    var resizeFun = function resizeFun(e, _this, type) {
        var down = {
            x: e.pageX,
            y: e.pageY
        };
        var $box = $(_this).parent();
        var box = {
            wid: parseInt($box.width(), 10),
            hei: parseInt($box.height(), 10),
            left: parseInt($box.css('left'), 10),
            top: parseInt($box.css('top'), 10)
        };
        var scale = $box.transform('scale');

        swid = box.wid;
        shei = box.hei;

        _global2.default.$doc.on('mousemove.crop_resize', function (em) {

            var val = {
                x: em.pageX - down.x,
                y: em.pageY - down.y
            };
            var hei, wid;
            if (type == 'top') {
                hei = box.hei - val.y;
                y = box.top + val.y;

                //超出top
                if (y - set.borderWidth < 0) {
                    y = set.borderWidth;
                }
                if (hei > img.hei) {
                    hei = img.hei - 2;
                } else if (y - set.borderWidth > img.hei) {
                    y = set.borderWidth + img.hei - 2;
                }

                $box.css({
                    height: hei,
                    top: y
                });
            } else if (type == 'bottom') {
                hei = box.hei + val.y;

                //超出底部
                if (y - set.borderWidth + hei > img.hei) {
                    hei = img.hei - (y - set.borderWidth) - 2;
                }

                $box.css({
                    height: hei
                });
            } else if (type == 'left') {
                wid = box.wid - val.x;
                x = box.left + val.x;

                //左边超出
                if (x - set.borderWidth < 0) {
                    x = set.borderWidth;
                }
                if (wid > img.wid) {
                    wid = img.wid - 2;
                }

                $box.css({
                    width: wid,
                    left: x
                });
            } else if (type == 'right') {
                wid = box.wid + val.x;

                //右边超出
                if (x - set.borderWidth + wid > img.wid) {
                    wid = img.wid - (x - set.borderWidth) - 2;
                }

                $box.css({
                    width: wid
                });
            } else if (type == 'topleft') {
                wid = box.wid - val.x;
                hei = box.hei / box.wid * wid;
                x = box.left + val.x;
                y = box.top + box.hei - hei;

                //超出
                if (x - set.borderWidth < 0) {
                    x = set.borderWidth;
                }
                if (wid > img.wid) {
                    wid = img.wid - 2;
                }
                if (y - set.borderWidth < 0) {
                    y = set.borderWidth;
                } else if (y - set.borderWidth > img.hei) {
                    y = set.borderWidth + img.hei - 2;
                }
                if (hei > img.hei) {
                    hei = img.hei - 2;
                }

                $box.css({
                    height: hei,
                    width: wid,
                    top: y,
                    left: x
                });
            } else if (type == 'topright') {
                wid = box.wid + val.x;
                hei = box.hei / box.wid * wid;
                y = box.top + box.hei - hei;

                //超出
                if (x - set.borderWidth + wid > img.wid) {
                    wid = img.wid - (x - set.borderWidth) - 2;
                }
                if (y - set.borderWidth < 0) {
                    y = set.borderWidth;
                } else if (y - set.borderWidth > img.hei) {
                    y = set.borderWidth + img.hei - 2;
                }
                if (hei > img.hei) {
                    hei = img.hei - 2;
                }

                $box.css({
                    height: hei,
                    width: wid,
                    top: y
                });
            } else if (type == 'bottomleft') {
                wid = box.wid - val.x;
                hei = box.hei / box.wid * wid;
                x = box.left + val.x;

                //超出
                if (x - set.borderWidth < 0) {
                    x = set.borderWidth;
                }
                if (wid > img.wid) {
                    wid = img.wid - 2;
                }
                if (y - set.borderWidth + hei > img.hei) {
                    hei = img.hei - (y - set.borderWidth) - 2;
                }

                $box.css({
                    width: wid,
                    height: hei,
                    left: x
                });
            } else if (type == 'bottomright') {
                wid = box.wid + val.x;
                hei = box.hei / box.wid * wid;

                //超出
                if (x - set.borderWidth + wid > img.wid) {
                    wid = img.wid - (x - set.borderWidth) - 2;
                }
                if (y - set.borderWidth + hei > img.hei) {
                    hei = img.hei - (y - set.borderWidth) - 2;
                }

                $box.css({
                    height: hei,
                    width: wid
                });
            }

            if (wid) {
                swid = wid;
            }
            if (hei) {
                shei = hei;
            }
        }).on('mouseup.crop_resize', function (e) {
            _global2.default.$doc.off('mousemove.crop_resize mouseup.crop_resize');
        });
    };

    //图片预加载
    var loadImage = function loadImage(url, callback) {
        var imgs = new Image();
        imgs.src = url;
        imgs.onload = function () {
            //图片下载完毕时异步调用callback函数。 
            callback(imgs); // 将callback函数this指针切换为img。
            // imgs.onload = null;
        };
    };

    //获取参数
    var getValue = function getValue() {
        var scale = img.wid / img.width;
        return {
            x: (x - set.borderWidth) / scale,
            y: (y - set.borderWidth) / scale,
            width: swid / scale,
            height: shei / scale,
            realWidth: img.width,
            realHeight: img.height,
            src: img.src
        };
    };

    //设置比例
    var setSize = function setSize(a, b) {

        if (a == '100%') {
            swid = img.wid;
            shei = img.hei;
        } else {
            //设置宽度
            if (img.wid > img.hei) {
                swid = img.hei * a / b;
                shei = img.hei;
            } else {
                swid = img.wid;
                shei = img.wid * b / a;
            }
        }

        var $controlbox = $this.find('.mt-crop-controlbox');

        $controlbox.css({
            display: 'block',
            width: swid - 2,
            height: shei - 2,
            top: set.borderWidth,
            left: set.borderWidth
        });

        //保留原来属性
        if (!$controlbox.attr('data-old')) {
            $controlbox.attr('data-old', $controlbox.attr('style'));
        }
    };

    //设置参数 - 图片预加载后，设置一些参数
    var reSet = function reSet(_img) {
        img = {
            width: _img.width,
            height: _img.height,
            wid: parseInt($img.width(), 10),
            hei: parseInt($img.height(), 10),
            src: _img.src

            // 如果图片是隐藏的。需要手动去计算wid,hei， 默认的宽高是323px * 218px
        };if ($img.is(':hidden')) {

            //
            if (img.width < set.defaultWidth && img.height < set.defaultHeight) {
                img.wid = img.width;
                img.hei = img.height;
            } else {
                // 如果真实图片的 宽度比较小
                if (img.width / img.height >= set.defaultWidth / set.defaultHeight) {
                    img.wid = set.defaultWidth;
                    img.hei = img.wid * (img.height / img.width);
                } else {
                    // 如果高度比较小
                    img.hei = set.defaultHeight;
                    img.wid = img.hei * (img.width / img.height);
                }
            }
        }

        console.log('reSet Crop');

        //设置移动范围
        set.width = img.wid;
        set.height = img.hei;
        swid = img.wid;
        shei = img.hei;

        //设置区域
        $this.find('.mt-crop-box').css({
            width: img.wid,
            height: img.hei,
            top: (bg.hei - img.hei) / 2
        });

        //初始化剪切区域
        setSize(set.wh[0], set.wh[1]);
    };

    //销毁
    _this.distory = function () {
        $crop.off('mousedown.crop_' + idname);
        $crop.off('click.crop_' + idname);
        $crop.off('click.cropset_' + idname);
        $crop.off('click.cropinit_' + idname);
        $crop.off('click.cropchang_' + idname);
        $crop.off('click.cropdel_' + idname);
        $this.find('.mt-crop').remove();
    };

    //事件绑定
    var initEvent = function initEvent() {

        //事件绑定
        $crop.off('mousedown.crop_' + idname).on('mousedown.crop_' + idname, '.mt-crop-control', function (e) {
            switch (e.target.className) {
                case 'mt-crop-control':
                    moveFun(e, this);
                    break;
                case 'mt-control-top':
                    resizeFun(e, this, 'top');
                    break;
                case 'mt-control-topleft':
                    resizeFun(e, this, 'topleft');
                    break;
                case 'mt-control-topright':
                    resizeFun(e, this, 'topright');
                    break;
                case 'mt-control-bottom':
                    resizeFun(e, this, 'bottom');
                    break;
                case 'mt-control-bottomleft':
                    resizeFun(e, this, 'bottomleft');
                    break;
                case 'mt-control-bottomright':
                    resizeFun(e, this, 'bottomright');
                    break;
                case 'mt-control-left':
                    resizeFun(e, this, 'left');
                    break;
                case 'mt-control-right':
                    resizeFun(e, this, 'right');
                    break;
            }
        });

        //裁剪
        $crop.off('click.crop_' + idname).on('click.crop_' + idname, '.mt-cropbtn-crop', function (e) {
            var obj = getValue();
            var image = new Image();
            image.src = obj.src;
            var canvas = $('<canvas width="' + obj.width + '" height="' + obj.height + '"></canvas>')[0],
                ctx = canvas.getContext('2d');

            ctx.drawImage(image, obj.x, obj.y, obj.width, obj.height, 0, 0, obj.width, obj.height);
            var data = canvas.toDataURL();

            //console.log(data)
            _this.distory();
            $crop.data('src', data);
            $crop.crop(set);

            //事件触发
            $crop.trigger('crop', {
                imgData: data,
                crop: obj,
                name: 'crop_' + idname
            });
        });

        //设置比例
        $crop.off('click.cropset_' + idname).on('click.cropset_' + idname, '.mt-crop-fun', function (e) {
            switch (e.target.className) {
                case 'mt-crop-100':
                    setSize('100%', '100%');break;
                case 'mt-crop-11':
                    setSize(1, 1);break;
                case 'mt-crop-23':
                    setSize(2, 3);break;
                case 'mt-crop-34':
                    setSize(3, 4);break;
                case 'mt-crop-35':
                    setSize(3, 5);break;
            }
        });

        //还原
        $crop.off('click.cropinit_' + idname).on('click.cropinit_' + idname, '.mt-cropbtn-init', function (e) {
            console.log('还原');
            _this.distory();
            var src = $crop.attr('data-oldsrc');
            $crop.data('src', src);
            $crop.crop(set);
            //事件触发
            $crop.trigger('crop', src);
        });

        //换图
        $crop.off('click.cropchang_' + idname).on('click.cropchang_' + idname, '.mt-cropbtn-change', function (e) {
            //_this.distory();
            //事件触发 , _this 是当前操作的 DOM 。 
            $crop.trigger('cropNew', _this);
        });

        //删除
        $crop.off('click.cropdel_' + idname).on('click.cropdel_' + idname, '.mt-cropbtn-del', function (e) {
            _this.distory();
            //$this.remove();
            //事件触发
            // $(_this).find('.mt-crop').hide();
            $crop.trigger('cropDel');
        });
    };

    //图片预加载
    var mark = true;
    loadImage($img.attr('src'), function (_img) {
        //设置参数
        reSet(_img);
        if (mark) {
            mark = false;
            initEvent();
        }
    });

    return _this;
};

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 设置值
function setSilderVal($this) {
    $this.empty().html('<div class="mt-slider-active"><a class="mt-slider-btn"></a></div>');
    var defaultVal = $this.attr('data-val'),
        wid = $this.width();
    $this.find('.mt-slider-active').width(defaultVal * wid);
}

//初始化值
function initSlider() {
    $('.mt-slider-bar').each(function () {
        setSilderVal($(this));
    });
}

// 事件 change,start, end
_global2.default.$doc.on('mousedown.slider', '.mt-slider-btn', function (e) {
    e.stopPropagation();
    var xs = e.pageX,
        $slider = $(this).closest('.mt-slider-bar'),
        $active = $slider.find('.mt-slider-active'),
        max = parseInt($slider.width(), 10),
        defaultVal = $slider.attr('data-val'),
        wid = max * defaultVal,
        val = null;
    $slider.trigger('start', (defaultVal / max).toFixed(2));
    _global2.default.$doc.on('mousemove.slider', function (e) {
        e.stopPropagation();
        var mx = e.pageX;
        val = wid + (mx - xs);
        if (val < 0) {
            val = 0;
        } else if (val > max) {
            val = max;
        }
        $active.width(val);
        $slider.attr('data-val', (val / max).toFixed(2));
        $slider.trigger('change', (val / max).toFixed(2));
    }).on('mouseup.slider', function (e) {
        e.stopPropagation();
        var dval = (val / max).toFixed(2);
        $slider.attr('data-val', dval);
        $slider.trigger('end', dval);
        _global2.default.$doc.off('mousemove.slider mouseup.slider');
    });
});

window.initSlider = initSlider;
window.setSilderVal = setSilderVal;

$(function () {
    initSlider();
});

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('click', '.mt-switch', function (e) {
    var $this = $(this);
    if ($this.attr('data-val') == 'on') {
        $this.attr('data-val', 'off');
        $this.trigger('change', false);
    } else {
        $this.attr('data-val', 'on');
        $this.trigger('change', true);
    }
});

$.fn.switch = function (val) {
    if (val) {
        return $(this).attr('data-val');
    } else {
        $(this).attr('data-val', val).trigger('change', val);
    }
};

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($) {
    $.fn.upload = function (opts) {
        var itemTpl = '<div class="mt-upload-item">\n\t\t\t\t\t\t<div class="mt-upload-progress">\n\t\t\t\t\t\t\t<div class="mt-upload-progress-bar"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<span class="mt-upload-filename">{{fileName}}</span>\n\t\t\t\t\t\t<span class="delfilebtn">\u5220\u9664</span>\n\t\t\t\t\t</div>';
        var defaults = {
            type: 'jpg,png,gif,jpeg', //允许上传的文件类型，格式'jpg,png,gif'
            url: '', //文件提交的地址
            auto: true, //是否开启自动上传
            method: 'post', //发送请求的方式，get或post
            multi: true, //是否允许选择多个文件,如果是单图上传，imgbox 设置为img对象
            data: null, //发送给服务端的参数，格式：{key:value}
            fileName: 'file', //在后端接受文件的参数名称，如PHP中的$_FILES['file']
            limit: 2048, //允许上传的文件大小，单位KB
            imgbox: null,
            itemTpl: itemTpl, //上传队列显示的模板
            uploadStart: null, //上传开始时的动作
            uploadSuccess: null, //上传成功的动作
            uploadComplete: null, //上传完成的动作
            uploadError: null, //上传失败的动作
            init: null, //初始化时的动作
            cancel: null //删除掉某个文件后的回调函数
        };

        var set = $.extend(defaults, opts);
        var _this = this;

        //设置BTN_HTML
        function setBtnHTML() {
            var shtml = $(_this).html();
            $(_this).html(shtml + '<input class="mt-upload-input" type="file" ' + (set.multi ? 'multiple="true"' : '') + ' />');
        }

        //将文件的单位由bytes转换
        function bytesToSize(bytes) {
            if (bytes === 0) return '0 B';
            var k = 1024;
            var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return bytes / Math.pow(k, i) + '' + sizes[i];
            //toPrecision(3) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];  
        }

        //数据过滤
        function fileFilter(file) {

            var type = file.type.split('/');
            var size = file.size;
            if (set.type.indexOf(type[1]) == -1) {
                //alert('文件格式错误！');
                $.tip({
                    msg: '文件格式错误！',
                    type: 'danger'
                });
                return false;
            }
            if (size > set.limit * 1024) {
                $.tip({
                    msg: '文件尺寸不能超过' + bytesToSize(set.limit * 1024),
                    type: 'danger'
                });
                return false;
            }
            return true;
        }

        //上传
        function uploadFun(file) {

            //上传开始
            // $(_this).trigger('uploadStart', file);
            if (set.uploadStart) {
                set.uploadStart(file);
            }

            var xhr = new XMLHttpRequest();
            if (xhr.upload) {
                //上传进度条
                xhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        var percentage = Math.round(e.loaded * 100 / e.total);
                        console.log(percentage);
                    }
                }, false);

                xhr.upload.addEventListener("load", function (e) {
                    //console.log("上传完毕...",e)
                    //完成
                    if (set.uploadComplete) {
                        set.uploadComplete(e);
                    }
                }, false);

                xhr.open(set.method, set.url, true);
                xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
                xhr.overrideMimeType("text/plain; charset=utf-8");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            var obj = JSON.parse(xhr.responseText);

                            //设置HTML
                            var tpl = set.itemTpl.replace('{{fileName}}', obj.data.name);

                            //单图上传
                            if (!set.multi) {
                                if (set.imgbox) {
                                    $(set.imgbox).attr('src', obj.data.url);
                                } else {
                                    // $(_this).append(tpl)
                                }
                            } else {
                                if (set.imgbox) {
                                    $(set.imgbox).append(tpl);
                                } else {
                                    // $(_this).append(tpl)
                                }
                            }
                            //成功！
                            if (set.uploadSuccess) {
                                set.uploadSuccess(obj, xhr);
                            }
                            // $(_this).trigger('uploadSuccess', obj, xhr);
                        } else {
                            //失败！
                            if (set.uploadError) {
                                set.uploadError(xhr);
                            }
                            // $(_this).trigger('uploadError', xhr);
                        }
                    }
                };
                var fd = new FormData();
                fd.append(file.name, file);
                if (set.data) {
                    for (var key in set.data) {
                        fd.append(key, set.data[key]);
                    }
                }
                xhr.send(fd);
            } else {
                // $(_this).trigger('uploadError', xhr);
                if (set.uploadError) {
                    set.uploadError(xhr);
                }
            }
        }

        //事件方法
        function eventFun() {
            //事件绑定, 如果采用事件委托，会导致 uploadFun 暴露给window对象，这样形成闭包函数，upload函数被新的upload覆盖
            $(_this).find('.mt-upload-input').off('change.upload').on('change.upload', function (e) {
                // 获取文件列表对象
                var files = e.target.files;
                for (var i = 0; i < files.length; i++) {
                    //上传图片
                    if (fileFilter(files[i])) {
                        uploadFun(files[i]);
                    }
                }
            });
        }

        //init
        function initFun() {
            setBtnHTML();
            eventFun();
        }

        initFun();

        return $(this);
    };
})(jQuery);

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('mousedown.drag', '.mt-drag', function (e) {
    var xd = e.pageX,
        yd = e.pageY,
        _this = this,
        $this = $(this),
        left = $this.offset().left,
        top = $this.offset().top;

    var set = {
        limit: true, //边界限制
        undrag: []
    };
    var dragset = $this.attr('data-dragset');
    dragset = dragset ? JSON.parse(dragset) : {};
    set = $.extend(set, dragset);

    //undrag 区域设置,不拖动
    if (set.undrag.length != 0) {
        for (var i = 0; i < set.undrag.length; i++) {
            if ($(e.target).closest(set.undrag[i])[0]) {
                return;
            }
        }
    }

    //限制边界
    if (set.limit) {
        var wid = $this.width(),
            hei = $this.height(),
            outLeft = $this.parent().offset().left,
            outTop = $this.parent().offset().top,
            outWid = $this.parent().width(),
            outHei = $this.parent().height();
    }

    _global2.default.$doc.on('mousemove.drag', function (em) {

        var x = left + (em.pageX - xd),
            y = top + (em.pageY - yd);

        //区域限制
        if (set.limit) {
            if (x < outLeft) {
                x = outLeft;
            } else if (x > outWid - wid) {
                x = outWid - wid;
            }

            if (y < outTop) {
                y = outTop;
            } else if (y > outHei - hei) {
                y = outHei - hei;
            }
        }

        $this.css({
            left: x,
            top: y
        });
    }).on('mouseup.drag', function (e) {
        _global2.default.$doc.off('mousemove.drag mouseup.drag');
    });
});

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

__webpack_require__(185);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//transform 方法

//控制杆
$.fn.control = function (setting) {
    var defaults = {
        movex: true, //x方向移动
        movey: true, //y方向移动
        autosize: true, //任意拉伸
        fixedsize: true, //固定比例拉伸
        rotate: true //旋转
    };
    var $this = $(this);
    var set = $.extend(defaults, setting);
    var shtml = '<div class="mt-control">\n\t\t\t\t\t{{rotate}}\n\t\t\t\t\t{{autosize}}\n\t\t\t\t\t{{fixedsize}}\n\t\t\t\t\t<span class="mt-control-center"></span>\n\t\t\t\t</div>';

    //如果没有旋转
    if (set.rotate) {
        shtml = shtml.replace('{{rotate}}', '<span class="mt-control-rotate"></span>');
    } else {
        shtml = shtml.replace('{{rotate}}', '');
    }

    //自动缩放
    if (set.autosize) {
        shtml = shtml.replace('{{autosize}}', '<span class="mt-control-top"></span>\n\t\t\t\t\t<span class="mt-control-left"></span>\n\t\t\t\t\t<span class="mt-control-right"></span>\n\t\t\t\t\t<span class="mt-control-bottom"></span>');
    } else {
        shtml = shtml.replace('{{autosize}}', '');
    }

    //如果没有缩放
    if (set.fixedsize) {
        shtml = shtml.replace('{{fixedsize}}', '<span class="mt-control-topleft"></span>\n\t\t\t\t\t<span class="mt-control-topright"></span>\n\t\t\t\t\t<span class="mt-control-bottomleft"></span>\n\t\t\t\t\t<span class="mt-control-bottomright"></span>');
    } else {
        shtml = shtml.replace('{{fixedsize}}', '');
    }

    var $controlDom = $this.find('.mt-control');
    if ($controlDom[0]) {
        $controlDom.remove();
        $controlDom = null;
    }

    $this.append(shtml);

    //移动
    var moveFun = function moveFun(e, _this) {
        var down = {
            x: e.pageX,
            y: e.pageY
        };
        var $box = $(_this).parent();
        var scale = _global2.default.scale;
        try {
            scale = AppData.edit.phoneScale;
        } catch (e) {
            // ...
        }
        var box = {
            left: parseInt($box.css('left'), 10) * scale,
            top: parseInt($box.css('top'), 10) * scale
        };
        var style = null;
        _global2.default.$doc.on('mousemove.control_move', function (em) {
            em.stopPropagation();
            style = {
                left: (box.left + (em.pageX - down.x)) / scale,
                top: (box.top + (em.pageY - down.y)) / scale
            };
            if (!set.movex) {
                delete style.left;
            }
            if (!set.movey) {
                delete style.top;
            }
            $box.css(style);
        }).on('mouseup.control_move', function (e) {
            _global2.default.$doc.off('mousemove.control_move mouseup.control_move');
            $this.trigger('change', style);
            style = null;
        });
    };

    //旋转
    var rotateFun = function rotateFun(e, _this) {
        var $target = $(e.target);
        var $center = $(_this).find('.mt-control-center');
        var $box = $(_this).parent();
        var center = {
            x: parseInt($center.offset().left, 10),
            y: parseInt($center.offset().top, 10)
        };
        var pi = 180 / Math.PI;
        var du = null;
        _global2.default.$doc.on('mousemove.control_rotate', function (em) {
            var x = em.pageX - center.x;
            var y = center.y - em.pageY;
            du = Math.atan(x / y);
            du = du * pi;
            du = parseInt(du, 10);

            //判断向限
            if (x >= 0 && y >= 0) {//1
                //...
            } else if (x >= 0 && y < 0) {
                //4
                du = Math.abs(du);
                du = 180 - du;
            } else if (x < 0 && y >= 0) {
                //2
                du = du + 360;
            } else {
                //3
                du = du + 180;
            }
            //旋转的时候，固定中心点
            $box.transform({
                'rotate': du + 'deg'
            });
        }).on('mouseup.control_rotate', function (e) {
            e.stopPropagation();
            _global2.default.$doc.off('mousemove.control_rotate mouseup.control_rotate');
            $this.trigger('change', {
                'rotate': du + 'deg'
            });
            du = null;
        });
    };

    //缩放
    var resizeFun = function resizeFun(e, _this, type) {
        var down = {
            x: e.pageX,
            y: e.pageY
        };
        var scale = _global2.default.scale;
        try {
            scale = AppData.edit.phoneScale;
        } catch (e) {
            // ...
        }
        var $box = $(_this).parent();
        var box = {
            wid: parseInt($box.width(), 10),
            hei: parseInt($box.height(), 10),
            left: parseInt($box.css('left'), 10),
            top: parseInt($box.css('top'), 10)
            // let scale = $box.transform('scale');
        };var hei = null,
            wid = null,
            top = null,
            left = null;

        _global2.default.$doc.on('mousemove.control_resize', function (em) {
            var val = {
                x: (em.pageX - down.x) / scale,
                y: (em.pageY - down.y) / scale
            };
            if (type == 'top') {
                hei = box.hei - val.y;
                top = box.top + val.y;
            } else if (type == 'bottom') {
                hei = box.hei + val.y;
            } else if (type == 'left') {
                wid = box.wid - val.x;
                left = box.left + val.x;
            } else if (type == 'right') {
                wid = box.wid + val.x;
            } else if (type == 'topleft') {
                wid = box.wid - val.x;
                hei = box.hei / box.wid * wid;
                top = box.top + box.hei - hei;
                left = box.left + val.x;
            } else if (type == 'topright') {
                wid = box.wid + val.x;
                hei = box.hei / box.wid * wid;
                top = box.top + box.hei - hei;
            } else if (type == 'bottomleft') {
                wid = box.wid - val.x;
                hei = box.hei / box.wid * wid;
                left = box.left + val.x;
            } else if (type == 'bottomright') {
                wid = box.wid + val.x;
                hei = box.hei / box.wid * wid;
            }

            $box.css({
                height: hei || box.hei,
                width: wid || box.wid,
                top: top || box.top,
                left: left || box.left
            });
        }).on('mouseup.control_resize', function (e) {
            _global2.default.$doc.off('mousemove.control_resize mouseup.control_resize');
            $this.trigger('change', {
                height: hei || box.hei,
                width: wid || box.wid,
                top: top || box.top,
                left: left || box.left
            });
        });
    };

    //销毁
    this.distory = function () {
        $('.mt-control').remove();
        moveFun = null;
        rotateFun = null;
        resizeFun = null;
    };

    //事件绑定
    _global2.default.$doc.off('mousedown.control').on('mousedown.control', '.mt-control', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // 专门给 group 提供的，如果正在编辑器组合，原来的方法都失效
        var groupMark = false;
        try {
            if (AppData.edit.group) {
                groupMark = true;
            }
        } catch (e) {
            // ...
        }
        if (groupMark) {
            return;
        }

        switch (e.target.className) {
            case 'mt-control':
                moveFun(e, this);
                break;
            case 'mt-control-rotate':
                rotateFun(e, this);
                break;
            case 'mt-control-top':
                resizeFun(e, this, 'top');
                break;
            case 'mt-control-topleft':
                resizeFun(e, this, 'topleft');
                break;
            case 'mt-control-topright':
                resizeFun(e, this, 'topright');
                break;
            case 'mt-control-bottom':
                resizeFun(e, this, 'bottom');
                break;
            case 'mt-control-bottomleft':
                resizeFun(e, this, 'bottomleft');
                break;
            case 'mt-control-bottomright':
                resizeFun(e, this, 'bottomright');
                break;
            case 'mt-control-left':
                resizeFun(e, this, 'left');
                break;
            case 'mt-control-right':
                resizeFun(e, this, 'right');
                break;
        }
    });

    return this;
};

/***/ }),
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
            console.log(method, val, this.layer.data.src);

            // if(!val) {
            //     return;
            // }

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
        self.layer.ue.hideShow.data = {
            type: 'show'
        };
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

    return '\n        <!doctype html>\n        <html>\n        <head>\n            <title>' + app.name + '</title>\n            <meta name="description" content="' + app.info + '">\n            <meta name="keywords" content="' + app.info + '">\n            <meta http-equiv="X-UA-Compatible" content="IE=edge">\n            <meta name="format-detection" content="telephone=no" />\n            <meta name="format-detection" content="email=no" />\n            <meta name="apple-mobile-web-app-capable" content="yes" />\n            <meta name="apple-mobile-web-app-status-bar-style" content="black" />\n            <meta http-equiv="Cache-Control" content="no-cache" />\n            <meta name="x5-fullscreen" content="true">\n            <meta name="x5-orientation" content="portrait">\n            <meta name="x5-page-mode" content="app">\n            <meta charset="utf-8">\n            <script src="/assets/plugin/h5ds.screen.js"></script>\n            <meta name="apple-mobile-web-app-capable" content="yes" />\n            <!-- Set render engine for 360 browser -->\n            <meta name="renderer" content="webkit">\n            <!-- No Baidu Siteapp-->\n            <meta http-equiv="Cache-Control" content="no-siteapp" />\n            <link rel="stylesheet" type="text/css" href="/assets/css/app.css">\n            <link rel="stylesheet" type="text/css" href="/assets/font/iconfont.css">\n            <link rel="stylesheet" type="text/css" href="/assets/plugin/h5ds.app.css">\n            <!--js-->\n            <script src="/assets/plugin/jquery-2.1.1.js"></script>\n            <script src="/assets/plugin/jquery.qrcode.min.js"></script>\n            ' + (types.map ? '<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.4.0&key=b10045abfc1d4d22446efdc74f85c238"></script>' : '') + '\n            <script src="/assets/plugin/jquery.touchSwipe.min.js"></script>\n            <script>\n            var IMG_SOURCE = ' + ((0, _stringify2.default)(getAppDataImgs(app)) || '[]') + ';\n            var sliderAnimate = ' + ((0, _stringify2.default)(_sliderAnimate.sliderAnimate[app.slider.animate]) || '{}') + ';\n            </script>\n            <script src="/assets/js/app.js"></script>\n        </head>\n        <body ondragstart="return false">\n            ' + (app.mp3.url ? '<div class="h5ds-video-icon"><i></i><i></i><i></i><i></i></div>' : '') + '\n            ' + (app.mp3.url ? '<audio style="display:none; height:0;" autoplay="autoplay" id="h5dsBgMusic" preload="auto" src="' + app.mp3.url + '" loop="loop"></audio>' : '') + '\n            <div id="h5dsPopups">' + (0, _saveAppHtml.popupHtml)(app.popups) + '</div>\n            <div id="h5dsFixedsUp">' + (0, _saveAppHtml.fixedUpHtml)(fixedUp) + '</div>\n            <div id="h5dsFixedsDown">' + (0, _saveAppHtml.fixedDownHtml)(fixedDown) + '</div>\n            <div class="h5ds-loading" id="h5dsLoading">\n                <div class="h5ds-loadinner">\n                    ' + _loading.loadArr[app.loading] + '\n                    <div class="h5ds-progress" id="h5dsProgress">0</div>\n                </div>\n            </div>\n            <div id="h5dsSwiper" pages-length="' + app.pages.length + '" class="h5ds-swiper" style="' + $.toStyle(app.style) + '">' + (0, _saveAppHtml.pageHtml)(app.pages) + '</div>\n        </body>\n        </html>';
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
/**
{
    // render method: 'canvas', 'image' or 'div'
    render: 'canvas',

    // version range somewhere in 1 .. 40
    minVersion: 1,
    maxVersion: 40,

    // error correction level: 'L', 'M', 'Q' or 'H'
    ecLevel: 'L',

    // offset in pixel if drawn onto existing canvas
    left: 0,
    top: 0,

    // size in pixel
    size: 200,

    // code color or image element
    fill: '#000',

    // background color or image element, null for transparent background
    background: null,

    // content
    text: 'no text',

    // corner radius relative to module width: 0.0 .. 0.5
    radius: 0,

    // quiet zone in modules
    quiet: 0,

    // modes
    // 0: normal
    // 1: label strip
    // 2: label box
    // 3: image strip
    // 4: image box
    mode: 0,

    mSize: 0.1,
    mPosX: 0.5,
    mPosY: 0.5,

    label: 'no label',
    fontname: 'sans',
    fontcolor: '#000',

    image: null
}
*/
function newQrcode() {
    // 生成二维码
    var owner = $.getUrlData('owner');
    var id = $.getUrlData('id');
    var path = location.origin + '/apps/' + owner + '/' + id + '/index.html';
    $('.qrcode-url-box').html(path);
    var $qrcode = $('#qrcode').empty();
    $qrcode.qrcode({
        text: path,
        size: 140,
        ecLevel: 'L',
        background: '#fff'
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
            uid: $.getUrlData('owner'),
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
        return '\n                <div data-title="' + escape(page.name) + '" data-desc="' + (page.desc ? escape(page.desc) : '') + '" id="' + (page.id || '') + '" data-autoplay="' + (page.slider.autoplay ? page.slider.time : false) + '" data-lock="' + page.slider.lock + '" class="h5ds-swiper-page">\n                    <div data-noSwiper="' + noSwiper + '" class="h5ds-swiper-pageinner ' + noSwiper + '" style="' + $.toStyle(page.style) + '">\n                        <div class="h5ds-swiper-layers">\n                        ' + page.layers.map(function (layer, index) {
            return (0, _layerSwitch.getLayerDom)(layer);
        }).join('') + '\n                        </div>\n                    </div>\n                </div>';
    }).join('');
}

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(59);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(64);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(63);

var _createClass3 = _interopRequireDefault(_createClass2);

var _basicTpl = __webpack_require__(152);

var _imgTpl = __webpack_require__(162);

var _bgTpl = __webpack_require__(499);

var _bgColorTpl = __webpack_require__(187);

var _layerSwitch = __webpack_require__(188);

var _layerFun = __webpack_require__(101);

var _appSliderTypeTpl = __webpack_require__(500);

var _layerListTpl = __webpack_require__(501);

var _AppDataFun = __webpack_require__(10);

var _initPageLayerFun2 = __webpack_require__(543);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 所有页面，弹窗，浮动层，都继承这个类，提供一些公用方法
 */
//layer list
// layer 的公用函数
//背景色模版
//图片模版
var PageClass = function () {
    function PageClass(props) {
        (0, _classCallCheck3.default)(this, PageClass);

        this.layerListTpl = _layerListTpl.layerListTpl;
        this.pagesList = props.pagesList || 'pagesList'; // pagesList 的 id
        this.className = props.className || 'page'; // 类名字
        this[props.className || 'page'] = props[props.className]; // 直接编辑当前page 对象 app里面的page ，不是new Page() 对象
    }

    // 选择第一个layer


    (0, _createClass3.default)(PageClass, [{
        key: 'selectFirstLayer',
        value: function selectFirstLayer() {
            var $layer = $('#layerlist').find('.layer-item');
            if ($layer[0]) {
                $layer.eq(0).trigger('click.select');
            }
        }

        // 初始化layerlist

    }, {
        key: 'initLayerList',
        value: function initLayerList(indexActive) {

            // 因为要设置重新选中，这里必须设置 layerIndex = null, 列表发生了变化
            AppData.edit.layerIndex = null;

            var shtml = '';
            var layers = this[this.className].layers;

            if (layers.length == 0) {
                shtml = '<li><span>\u6682\u65E0\u56FE\u5C42</span></li>';
            } else {
                var zIndex = 9999;
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    // 重置z-index
                    layer.style['z-index'] = zIndex - i;
                    shtml += this.layerListTpl({
                        type: layer.typename,
                        active: indexActive === i ? true : false
                    });
                }
            }
            $('#layerlist').html(shtml);
        }

        // 渲染页面样式

    }, {
        key: 'renderPage',
        value: function renderPage() {
            var style = this[this.className].style;
            (0, _AppDataFun.getViewDom)().setStyle({
                style: style
            }).show();

            var height = parseInt(style.height, 10);
            if (height && height !== 486) {
                $('.phonebox').height(height);
            } else {
                $('.phonebox').height(486);
            }
            (0, _AppDataFun.AppDataChange)();
        }

        // 包含了剪切图片的所有方法

    }, {
        key: 'initCropFun',
        value: function initCropFun() {
            var self = this;
            var style = this[this.className].style;

            var $crop = (0, _imgTpl.initCrop)(self, $('#setPageStyle').find('.set_img_crop'), { delBtn: true }, function (type, val) {
                // 剪切后，this.style 发生变化，重新渲染可视区域, delete 里面做了处理了
                if (type === 'select') {
                    style['background-image'] = val;
                }
                // AppDataChange();
                self.renderPage();
            });
        }

        // 初始化设置区域,设置page样式

    }, {
        key: 'initSetBox',
        value: function initSetBox() {

            var self = this;
            var $setPageStyle = $('#setPageStyle');
            var _className = this[this.className],
                style = _className.style,
                slider = _className.slider;


            console.log('当前page', this.className, this[this.className]);

            // 设置背景参数
            var bgTpls = (0, _bgTpl.bgTpl)({
                repeat: style['background-repeat'] || 'initial',
                color: style['background-color'] || 'none',
                size: style['background-size'] || 'initial'
            });

            // 设置背景色
            var bcolor = style['background-color'];
            var bgColorTpls = (0, _bgColorTpl.bgColorTpl)({
                color: bcolor ? bcolor.colorHex() : 'initial',
                opacity: bcolor ? bcolor.colorOpacity() : 1
            });

            // 翻页模式, app 整体可以设置翻页，每个page可以单独设置

            var appSliderTypeTpls = ''; // _page 作为不同的ID使用

            if (this.className === 'page') {
                appSliderTypeTpls = '<div class="set-slider">' + (0, _appSliderTypeTpl.appSliderTypeTpl)({
                    lock: slider['lock'],
                    autoplay: slider['autoplay'],
                    time: slider['time']
                }, '_page') + '</div>';
            }

            // 如果page没有背景，初始化一个空的模版
            var allTpls = '';
            if (!style) {
                style = {};
                allTpls = (0, _imgTpl.imgTpl)() + bgTpls + bgColorTpls + appSliderTypeTpls;
            } else {
                // 如果page有背景图
                if (style['background-image']) {
                    var imgTpls = (0, _imgTpl.imgTpl)({
                        src: style['background-image'] || ''
                    });
                    allTpls = imgTpls + bgTpls + bgColorTpls + appSliderTypeTpls;
                } else {
                    // 只有背景色
                    allTpls = (0, _imgTpl.imgTpl)() + bgTpls + bgColorTpls + appSliderTypeTpls;
                }
            }
            $setPageStyle.html(allTpls);

            // 初始化图片剪切功能
            this.initCropFun();

            // 设置样式
            this.renderPage();
        }

        // 重置z-index

    }, {
        key: 'resetZIndex',
        value: function resetZIndex() {
            (0, _AppDataFun.getViewDom)().find('.layer').each(function (ind, elem) {
                $(this).css('z-index', 9999 - ind);
            });
        }

        // 事件

    }, {
        key: 'initEvent',
        value: function initEvent() {
            var self = this;
            var $setPageStyle = $('#setPageStyle');
            var $layerlist = $('#layerlist');

            //初始化方法
            initSlider();
            initSelectOne();

            // 删除layer
            $layerlist.off('click.dellayer').on('click.dellayer', '.dellayer', function (e) {
                e.stopPropagation();

                var $li = $(this).parent();
                var index = $li.index();
                (0, _AppDataFun.getViewDom)().find('.layer').eq(index).remove();
                $li.remove();

                // 存个历史记录
                (0, _AppDataFun.saveHistory)();

                // 删除 AppData.data[cName][xx].layers[index] 
                (0, _AppDataFun.removeDataLayer)(index);

                AppData.edit.layerIndex = null;
                AppData.edit.layerDom = null;

                // 重新设置 z-index
                self.resetZIndex();

                // 默认选择第一layer
                var $li0 = $('#layerlist').find('.layer-item').eq(0);
                if ($li0[0]) {
                    // 重置选择状态
                    $li0.trigger('click');
                } else {
                    // 删除完之后，什么都不干
                    return;
                }
            });

            // 复制layer
            $layerlist.off('click.copylayer').on('click.copylayer', '.copylayer', function (e) {
                e.stopPropagation();

                var $li = $(this).parent();
                var index = $li.index();

                // console.log('**************', self, index);
                var obj = self[self.className].layers[index];
                // 拷贝一份
                obj = JSON.parse((0, _stringify2.default)(obj));

                // 复制内容存放到 copyLayer 里面
                delete obj['z-index'];
                AppData.edit.copyLayer = obj;

                $.tip({
                    msg: '复制成功！ctrl + v 粘贴',
                    type: 'success',
                    time: 3000
                });
            });

            // 粘贴
            $(document).off('pastelayer').on('pastelayer', function (e) {

                if (!AppData.edit.copyLayer) {
                    $.tip({
                        msg: '请先复制图层！',
                        type: 'error',
                        time: 3000
                    });
                    return;
                }

                // 存个历史记录
                (0, _AppDataFun.saveHistory)();

                // e.stopPropagation();
                var $li = $('#layerlist').find('.active');
                var index = 0;
                if ($li[0]) {
                    index = $li.index();
                }

                // 前面插入
                var layer = JSON.parse((0, _stringify2.default)(AppData.edit.copyLayer)); // 拷贝对象
                self[self.className].layers.splice(index, 0, layer);

                // 重新渲染列表
                self.initLayerList();
                // 重新渲染viewPage
                self.initPageDom();

                (0, _AppDataFun.AppDataChange)();

                // 设置选中
                $('#layerlist').find('.layer-item').eq(index).trigger('click');
            });

            // 显示隐藏
            $layerlist.off('click.showlayer').on('click.showlayer', '.showlayer', function (e) {
                e.stopPropagation();
                var $li = $(this).parent();
                var index = $li.index();
                var $layer = (0, _AppDataFun.getViewDom)().find('.layer').eq(index);
                if ($layer.is(':hidden')) {
                    $layer.show();
                    $(this).removeClass('showlayer_hide');
                } else {
                    $layer.hide();
                    $(this).addClass('showlayer_hide');
                }
            });

            //选择layer 通过 浮动的 列表
            $layerlist.off('click.select').on('click.select', '.layer-item', function (e, val) {
                var index = $(this).index();
                $('#layerlist').find('.layer-item').eq(index).addClass('active').siblings('.layer-item').removeClass('active');
                //new layer
                self.newLayer(index);
            });

            //排序 layer列表
            $layerlist.off('uniqend').on('uniqend', function (e, data) {

                // 排序
                (0, _layerFun.uniqendLayer)(self, data);

                // 排序不能撤销操作
            });

            //选择layer 通过 layer
            (0, _AppDataFun.getViewDom)().off('click.layer contextmenu.layer').on('click.layer contextmenu.layer', '.layer', function (e) {

                // 取消焦点
                $(':focus').blur();

                // 如果在组合模式下，不选择单个layer
                if (AppData.edit.group) {
                    return;
                }

                var index = $(this).index();
                $('#layerlist').find('li').removeClass('active').eq(index).addClass('active');
                //new layer
                self.newLayer(index);
            });

            // 设置 背景
            (0, _bgTpl.initBg)(this, $setPageStyle, function () {
                self.renderPage();
            });

            // 设置 背景色
            (0, _bgColorTpl.initBgColor)(this, $setPageStyle, function () {
                self.renderPage();
            });

            // 锁定翻页
            if (self.className === 'page') {
                (0, _appSliderTypeTpl.initAppSliderType)(self, '_page');
            }

            // 播放该页动画
            $('.play-animation-do').trigger('click');
        }

        //初始化页面对象 , phone 里面的内容

    }, {
        key: 'initPageDom',
        value: function initPageDom() {
            var layers = this[this.className].layers;
            var $pageView = (0, _AppDataFun.getViewDom)();
            var arr = [];
            for (var i = 0; i < layers.length; i++) {
                arr.push((0, _layerSwitch.getLayerDom)(layers[i]));
            }
            $pageView.html(arr.join(''));
            arr = null;

            // 初始化JS 方法，地图什么的
            this.initPageLayerFun();
        }

        // 有的页面 初始化JS 方法，地图什么的

    }, {
        key: 'initPageLayerFun',
        value: function initPageLayerFun() {
            var layers = this[this.className].layers;
            (0, _initPageLayerFun2.initPageLayerFun)(layers, (0, _AppDataFun.getViewDom)());
        }

        // 选择layer 之后，需要重新渲染 layer 对象 AppData.edit.layerDom 这个对象，在排序，复制之后，得重新设置

    }, {
        key: 'newLayer',
        value: function newLayer(index) {

            //显示layer设置
            (0, _layerFun.layerShow)('#setLayerBox');

            var pageIndex = 0;
            try {
                pageIndex = $('#' + this.pagesList).find('.active').index();
            } catch (e) {
                pageIndex = undefined;
            }
            // active 是哪个，就实例化哪个
            var layer = this[this.className].layers[index];

            /**
             * 如果选择同一个page的同一个layer ，不再重复渲染set区域
             * 这里因为会添加，删除layer, layerIndex 在变化中。如果没有控制器，只单独初始化控制器
            */
            if (index === AppData.edit.layerIndex && pageIndex === AppData.edit.pageIndex) {
                if (!(0, _AppDataFun.getViewDom)().find('.mt-control')[0]) {
                    // 实例化控制器
                    (0, _layerFun.initControl)({
                        layer: layer,
                        selectAnimateDom: null,
                        className: 'layer'
                    });
                }
            } else {
                // 给layer 容器设置值, 设置 AppData.edit.layerDom, layerIndex
                AppData.edit.layerIndex = index;
                (0, _AppDataFun.getViewDom)().find('.layer').each(function () {
                    if ($(this).css('z-index') == 9999 - index) {
                        AppData.edit.layerDom = $(this);
                    }
                });

                // 添加之前，先存个历史记录
                (0, _AppDataFun.saveHistory)();

                // new 对应的 layer, 这里是layer 的入口
                (0, _layerSwitch.layerTypeSelect)(layer);
            }
        }

        // svg 预加载

    }, {
        key: 'lazySvg',
        value: function lazySvg() {
            $('#phoneApp').find('.layer-svg').each(function () {
                var $this = $(this).find('.element');
                var src = $this.attr('data-svglazy');
                var color = $this.attr('data-color').split('@') || [];
                $.get(src).done(function (svg) {
                    // 预加载成功
                    var $svg = $(svg);
                    color.forEach(function (elem, index) {
                        if (elem) {
                            var $path = $svg.find('path');
                            if ($path.attr('style') !== undefined) {
                                $path.eq(index).attr('style', 'fill:' + elem);
                            } else {
                                $path.eq(index).attr('fill', elem);
                            }
                        }
                    });
                    var str = $svg.find('svg').prop('outerHTML');
                    $this.html(str);
                });
            });
        }

        //初始化方法

    }, {
        key: '_init',
        value: function _init() {
            console.log(this);
            $('#setPageName').html(this[this.className].name);
            this.initLayerList();
            this.initSetBox();
            this.initPageDom();
            this.initEvent();

            (0, _AppDataFun.setPageClass)(this);

            this.lazySvg();

            return this;
        }
    }]);
    return PageClass;
}(); //设置翻页模式，锁定，自动
// 渲染 不同类型的 layer dom
//背景模版
//坐标，尺寸基础模块


exports.default = PageClass;

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PAGE_SIZE = undefined;
exports.newPage = newPage;
exports.getImgSysTypes = getImgSysTypes;
exports.sysImg = sysImg;
exports.myImg = myImg;

var _ajax = __webpack_require__(109);

var _global = __webpack_require__(6);

var PAGE_SIZE = exports.PAGE_SIZE = 20;

// 系统图片的分页
// ajax
function newPage(count, $dom, callback) {
    // 初始化分页
    $dom.pagelist({
        page: 1,
        pagesize: PAGE_SIZE,
        count: count
    }).on('page', function (e, p) {
        callback(p);
    });
}

// 获取图片素材
function getSysImgsFun(p) {
    $('#imgSysList').loading();
    (0, _ajax.getSysImgs)({ name: '', type: p.type, pageSize: p.pagesize, pageNum: p.page }).done(function (res) {
        if (res.success) {
            // console.log(res.data);
            var tpl = '';
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                tpl += '<li><div class="imgbox"><img src="' + (_global.sourceHome + d.url) + '" alt=""></div></li>';
            }
            // 设置 素材列表
            $('#imgSysList').html(tpl);

            // 分页
            var $imgPagelist = $('#imgPagelist');
            if (!$imgPagelist.find('.mt-pagelist')[0]) {
                // 初始化分页
                newPage(res.count, $imgPagelist, getSysImgsFun);
            }
        }
    });
}

// 获取图片素材分类
function getImgSysTypes() {
    $('#imgSysTypesList').loading();
    (0, _ajax.getSysImgTypes)().done(function (res) {
        if (res.success) {
            var tpl = '<li class="item active" data-id=""><a href="javascript:;">全部</a></li>';
            for (var i = 0; i < res.data.length; i++) {
                tpl += '<li class="item" data-id="' + res.data[i].id + '"><a href="javascript:;">' + res.data[i].name + '</a></li>';
            }
            $('#imgSysTypesList').html(tpl);
        }
    });
}

// 我的图片
function userImgTpl(data) {
    data.url = data.url.replace(/\\/g, '/');
    return '<li>\n                <div class="imgbox"><!--\n                    --><img src="' + data.url + '"><!--\n                    --><a class="del-my-img" data-id="' + data.id + '"><i class="iconfont icon-close"></i></a><!--\n                --></div>\n            </li>';
}

// 系统图片
function sysImg() {

    // 获取系统图片
    getSysImgsFun({
        type: '',
        pagesize: PAGE_SIZE,
        page: 1
    });

    // 获取图片素材分类
    getImgSysTypes();

    // 图片上传 **
    $('#uploadImg').upload({
        auto: true,
        method: 'post',
        multi: true, //多文件上传
        fileName: 'file', //表单名字
        data: {}, //附带表单
        url: '/api/upload',
        uploadStart: function uploadStart() {
            // 切换到我的图库
            $('#sysOrMyImgs').find('li[data-type="my"]').trigger('click');
        },
        uploadSuccess: function uploadSuccess(res) {
            //...
            console.log('上传成功！重新获取用户图片', res);
            getUserImgsFun({
                pagesize: PAGE_SIZE,
                page: 1
            });
            // $('#imgMyList').prepend(userImgTpl(res.data));
        },
        uploadError: function uploadError(res) {
            console.error('图片上传失败！', res);
        }
    });

    // 选择图分类
    $('#imgSysTypesList').on('click', '.item', function (e) {
        $(this).addClass('active').siblings('.item').removeClass('active');
        var id = $(this).attr('data-id');
        getSysImgsFun({
            type: id,
            pagesize: PAGE_SIZE,
            page: 1
        });
    });
}

// 获取用户的图片
function getUserImgsFun(p) {
    (0, _ajax.getUserImgs)({ pageSize: p.pagesize, pageNum: p.page }).done(function (res) {
        if (res.success) {
            // console.log('用户图片=>', res);
            var str = '';
            for (var i = 0; i < res.data.length; i++) {
                str += userImgTpl(res.data[i]);
            }
            $('#imgMyList').html(str);

            // 分页
            var $imgPagelist = $('#imgUserPagelist');
            if ($imgPagelist.data('count') != res.count) {
                // 初始化分页
                newPage(res.count, $imgPagelist, getUserImgsFun);
            }
            $imgPagelist.data('count', res.count);
        } else {
            console.error('获取用户图片失败！');
        }
    });
}

// 我的图片
function myImg() {
    getUserImgsFun({
        pagesize: PAGE_SIZE,
        page: 1
    });

    // 删除我的图片
    $('#imgMyList').on('click', '.del-my-img', function (e) {
        var _this = this;

        var id = $(this).attr('data-id');
        (0, _ajax.delImg)({
            id: id
        }).done(function (res) {
            if (res.success) {
                $(_this).closest('li').remove();
            }
        });
    });
}

/***/ }),
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
/* 499 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bgTpl = bgTpl;
exports.initBg = initBg;
/**
 * 背景模板
*/
function bgTpl(obj) {
    return '\n    <div class="set-bg">\n        <div class="tr">\n            \u80CC\u666F\u6A21\u5F0F:\n            <div class="mt-selectone set_bg_repeat" data-val="' + obj.repeat + '">\n                <a data-val="no-repeat" class="option">\u9ED8\u8BA4</a>\n                <a data-val="repeat-x" class="option">X\u5E73\u94FA</a>\n                <a data-val="repeat-y" class="option">Y\u5E73\u94FA</a>\n                <a data-val="repeat" class="option">\u5E73\u94FA</a>\n            </div>\n        </div>\n        <div class="tr">\n            \u80CC\u666F\u5C3A\u5BF8:\n            <div class="mt-selectone set_bg_size" data-val="' + obj.size + '">\n                <a data-val="initial" class="option">\u9ED8\u8BA4</a>\n                <a data-val="contain" class="option">\u9002\u914D</a>\n                <a data-val="cover" class="option">\u62C9\u4F38</a>\n            </div>\n        </div>\n    </div>';
}

// 设置 bg
function initBg(self, $parent, callback) {
    var obj = self[self.className];
    // 选择背景模式
    $parent.find('.set_bg_repeat').off('change').on('change', function (e, data) {
        obj.style['background-repeat'] = data;
        callback();
    });

    // 选择背景尺寸
    $parent.find('.set_bg_size').off('change').on('change', function (e, data) {
        obj.style['background-size'] = data;
        callback();
    });
}

/***/ }),
/* 500 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appSliderTypeTpl = appSliderTypeTpl;
exports.initAppSliderType = initAppSliderType;

var _AppDataFun = __webpack_require__(10);

var _funs = __webpack_require__(122);

// 自动翻页最大时间 ,d 单位秒
var AppSliderMaxTime = 30;

// 模板
function appSliderTypeTpl(obj, id) {
    id = id ? id : '';
    return '\n\t\t<div class="tr">\n\t\t\t\u9501\u5B9A\u7FFB\u9875:\n\t\t\t<div id="app_lock' + id + '" class="mt-switch" data-val="' + (obj.lock ? 'on' : 'off') + '">\n\t\t\t\t<a class="mt-switch-btn"></a>\n\t\t\t</div>\n\t\t\t<i data-title="\u5F00\u542F\u540E\uFF0C\u6ED1\u52A8\u9875\u9762\u4E0D\u80FD\u89E6\u53D1\u7FFB\u9875\u6548\u679C\uFF01" class="iconfont icon-bangzhu"></i>\n\t\t</div>\n\t\t<div class="tr">\n\t\t\t\u81EA\u52A8\u7FFB\u9875:\n\t\t\t<div id="app_auto_play' + id + '" data-toggle=\'[{"dom":"#app_auto_play_div' + id + '", "class":"show"}]\' class="mt-switch" data-val="' + (obj.autoplay ? 'on' : 'off') + '">\n\t\t\t\t<a class="mt-switch-btn"></a>\n\t\t\t</div>\n\t\t\t<i data-title="\u5F00\u542F\u540E\uFF0C\u9875\u9762\u4F1A\u81EA\u52A8\u64AD\u653E\uFF01"  class="iconfont icon-bangzhu"></i>\n\t\t</div>\n\t\t<div class="tr' + (obj.autoplay ? ' show' : '') + '" id="app_auto_play_div' + id + '" style="display:none;">\n\t\t\t\u7FFB\u9875\u65F6\u95F4:\n\t\t\t<div id="app_auto_play_time' + id + '" class="mt-slider-bar" mt-bind="app_auto_play_time_input' + id + '" mt-filter="*' + AppSliderMaxTime + '" data-val="' + obj.time / AppSliderMaxTime + '"></div>\n\t\t\t<input mt-wheel="1,1,10000" id="app_auto_play_time_input' + id + '" class="mt-input" mt-bind="app_auto_play_time' + id + '" mt-filter="/' + AppSliderMaxTime + '" mt-min="0" mt-max="' + AppSliderMaxTime + '" mt-type="" type="" value="' + parseInt((0, _funs.isNull)(obj.time) ? 0 : obj.time, 10) + '" name=""> \u79D2\n\t\t</div>';
}

// 设置翻页类型，锁定 或者 自动翻页
function initAppSliderType(self, id) {
    id = id ? id : '';
    var obj = self[self.className];
    //锁定翻页
    $('#app_lock' + id).off('change').on('change', function (e, data) {
        obj.slider.lock = data;
        (0, _AppDataFun.AppDataChange)();
    });

    //自动翻页
    $('#app_auto_play' + id).off('change').on('change', function (e, data) {
        obj.slider.autoplay = data;
        (0, _AppDataFun.AppDataChange)();
    });

    // 翻页时间
    $('#app_auto_play_time' + id).off('change').on('change', function (e, data) {
        obj.slider.time = Math.round(data * AppSliderMaxTime);
        (0, _AppDataFun.AppDataChange)();
    });

    // 翻页时间
    $('#app_auto_play_time_input' + id).off('changes').on('changes', function (e, data) {
        obj.slider.time = data;
        (0, _AppDataFun.AppDataChange)();
    });
}

/***/ }),
/* 501 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.layerListTpl = layerListTpl;
// layer 列表
function layerListTpl(obj) {
				return '<li class="layer-item ' + (obj.active ? 'active' : '') + '">\n\t\t\t\t<a class="showlayer"><i class="iconfont icon-yanjing"></i></a>\n\t\t\t\t<span>' + obj.type + '</span>\n\t\t\t\t<a class="dellayer" title="\u5220\u9664\u56FE\u5C42"><i class="iconfont icon-icodel"></i></a>\n\t\t\t\t<a class="copylayer" title="\u590D\u5236\u56FE\u5C42"><i class="iconfont icon-fuzhi"></i></a>\n\t\t\t</li>';
}

/***/ }),
/* 502 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * 进入动画
*/
var animatesIn = exports.animatesIn = [{ name: '弹入', type: 'in', animate: 'bounceIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '上弹入', type: 'in', animate: 'bounceInDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左弹入', type: 'in', animate: 'bounceInLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右弹入', type: 'in', animate: 'bounceInRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '下弹入', type: 'in', animate: 'bounceInUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '渐显', type: 'in', animate: 'fadeIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '上渐显', type: 'in', animate: 'fadeInDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '上远渐显', type: 'in', animate: 'fadeInDownBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左渐显', type: 'in', animate: 'fadeInLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左远渐显', type: 'in', animate: 'fadeInLeftBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右渐入', type: 'in', animate: 'fadeInRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右远渐入', type: 'in', animate: 'fadeInRightBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '下渐入', type: 'in', animate: 'fadeInUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '下远渐入', type: 'in', animate: 'fadeInUpBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'X翻牌', type: 'in', animate: 'flipInX', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'Y翻牌', type: 'in', animate: 'flipInY', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '光速入', type: 'in', animate: 'lightSpeedIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '滚入', type: 'in', animate: 'rotateIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左上滚入', type: 'in', animate: 'rotateInDownLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右上滚入', type: 'in', animate: 'rotateInDownRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左下滚入', type: 'in', animate: 'rotateInUpLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右下滚入', type: 'in', animate: 'rotateInUpRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '下滑入', type: 'in', animate: 'slideInUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '上滑入', type: 'in', animate: 'slideInDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左滑入', type: 'in', animate: 'slideInLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右滑入', type: 'in', animate: 'slideInRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '放大', type: 'in', animate: 'zoomIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '从上放大', type: 'in', animate: 'zoomInDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '从左放大', type: 'in', animate: 'zoomInLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '从右放大', type: 'in', animate: 'zoomInRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '从下放大', type: 'in', animate: 'zoomInUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左滚入', type: 'in', animate: 'rollIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }];

/**
 * 离开动画
*/
var animatesOut = exports.animatesOut = [{ name: '弹走', type: 'out', animate: 'bounceOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '下弹走', type: 'out', animate: 'bounceOutDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左弹走', type: 'out', animate: 'bounceOutLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右弹走', type: 'out', animate: 'bounceOutRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '上弹走', type: 'out', animate: 'bounceOutUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '渐隐', type: 'out', animate: 'fadeOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '下渐隐', type: 'out', animate: 'fadeOutDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '下渐隐快', type: 'out', animate: 'fadeOutDownBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左渐隐', type: 'out', animate: 'fadeOutLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左渐隐快', type: 'out', animate: 'fadeOutLeftBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右渐隐', type: 'out', animate: 'fadeOutRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右渐隐快', type: 'out', animate: 'fadeOutRightBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '上渐隐', type: 'out', animate: 'fadeOutUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '上渐隐快', type: 'out', animate: 'fadeOutUpBig', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'X翻牌隐', type: 'out', animate: 'flipOutX', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: 'Y翻牌隐', type: 'out', animate: 'flipOutY', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '光速离开', type: 'out', animate: 'lightSpeedOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '滚隐', type: 'out', animate: 'rotateOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左下滚出', type: 'out', animate: 'rotateOutDownLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右下滚出', type: 'out', animate: 'rotateOutDownRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左上滚出', type: 'out', animate: 'rotateOutUpLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右上滚出', type: 'out', animate: 'rotateOutUpRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '上滑出', type: 'out', animate: 'slideOutUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '下滑出', type: 'out', animate: 'slideOutDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左滑出', type: 'out', animate: 'slideOutLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右滑出', type: 'out', animate: 'slideOutRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '缩小', type: 'out', animate: 'zoomOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '下缩小', type: 'out', animate: 'zoomOutDown', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '左缩小', type: 'out', animate: 'zoomOutLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右缩小', type: 'out', animate: 'zoomOutRight', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '上缩小', type: 'out', animate: 'zoomOutUp', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '掉链子', type: 'out', animate: 'hinge', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '右滚走', type: 'out', animate: 'rollOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }];

/**
 * 强调动画
*/
var animatesEm = exports.animatesEm = [{ name: '跳动', type: 'em', animate: 'bounce', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '闪动', type: 'em', animate: 'flash', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '呼吸', type: 'em', animate: 'pulse', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '弹性', type: 'em', animate: 'rubberBand', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '震动', type: 'em', animate: 'shake', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '摇摆', type: 'em', animate: 'swing', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '嘚瑟', type: 'em', animate: 'tada', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '晃动', type: 'em', animate: 'wobble', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '拉扯', type: 'em', animate: 'jello', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '翻转', type: 'em', animate: 'flip', time: '1s', delay: '0s', count: 1, fun: 'ease' }, { name: '旋转', type: 'em', animate: 'rollOneCount', time: '1s', delay: '0s', count: 1, fun: 'linear' }];

/***/ }),
/* 503 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(59);

var _stringify2 = _interopRequireDefault(_stringify);

exports.iniFastEvent = iniFastEvent;
exports.setPhoneScale = setPhoneScale;

var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

var _AppDataFun = __webpack_require__(10);

var _ajax = __webpack_require__(109);

var _tplSource = __webpack_require__(504);

var _localStorage = __webpack_require__(156);

var _layerFun = __webpack_require__(101);

var _appFunLayerGroup = __webpack_require__(505);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * APP 函数集合
*/
// 放大画布
function fastToMax() {
    $('#fastToMax').off('click').on('click', function (e) {
        var $phonebox = $('.phonebox');
        var scale = $phonebox.transform('scale') || 1;
        AppData.edit.phoneScale = scale;
        scale += 0.2;
        if (scale > 2) {
            scale = 2;
        }
        $phonebox.transform({
            scale: scale
        });
    });
}

// 缩小画布
function fastToMin() {
    $('#fastToMin').off('click').on('click', function (e) {
        var $phonebox = $('.phonebox');
        var scale = $phonebox.transform('scale') || 1;
        scale -= 0.2;
        if (scale < 0.5) {
            scale = 0.5;
        }
        AppData.edit.phoneScale = scale;
        $phonebox.transform({
            scale: scale
        });
    });
}

/**
 * 鼠标滚动缩放页面
*/
function mouseWheelPhone() {
    $('.phonebox').on('mousewheel.phone', function (e) {
        e.preventDefault();
        // 往下加
        if (e.originalEvent.deltaY > 0) {
            $('#fastToMax').trigger('click');
        } else {
            $('#fastToMin').trigger('click');
        }
    });
}

/**
 * 复制页面
*/
function copyPage(self) {
    $('.add-page-do').on('click', function () {
        self.copyPage(AppData.edit.pageIndex);
    });
}

/**
 * 删除页面
*/
function delPage(self) {
    $('.del-page-do').on('click', function () {
        self.delPage(AppData.edit.pageIndex);
    });
}

/**
 * 新增页面
*/
function addPage(self) {
    $('#fastAddNewPage').on('click', function () {
        self.addPage(AppData.edit.pageIndex);
    });
}

/**
 * 长页设置
*/
function changePage(self) {

    // 最大高度 486px
    $('#setPageHeight').on('mousedown', function (e) {
        e.stopPropagation();
        var y0 = e.pageY;
        var $phonebox = $('.phonebox');
        var oldHei = $phonebox.height();
        var nowHei = 0;
        _global2.default.$doc.on('mousemove', function (e) {
            nowHei = oldHei + (e.pageY - y0) / AppData.edit.phoneScale;
            if (nowHei < _global2.default.defaultHeight) {
                nowHei = _global2.default.defaultHeight;
            }
            $phonebox.css({
                height: nowHei
            });
        }).on('mouseup', function (e) {
            _global2.default.$doc.off('mousemove mouseup');
            var page = AppData.edit.pageClass[AppData.edit.pageClass.className];
            page.style.height = nowHei + 'px';
            (0, _AppDataFun.AppDataChange)();
        });
    });
}

/**
 * 保存当前模板
*/
function savePage(self) {
    $('.save-page-do').on('click', function () {
        if (AppData.edit.pageIndex !== null) {
            var page = (0, _AppDataFun.getNowPage)();
            page = JSON.parse((0, _stringify2.default)(page));
            delete page['index'];

            var load = $.loading();
            $('#phoneApp').addClass('element-show');
            html2canvas($('#pageView')[0], {
                height: _global2.default.defaultHeight,
                width: _global2.default.defaultWidth
            }).then(function (canvas) {
                $('#phoneApp').removeClass('element-show');
                (0, _ajax.uploadImgBase64)({
                    imgData: canvas.toDataURL("image/jpeg", 0.5)
                }).done(function (res) {
                    // console.log(res);
                    load.close();
                    if (!res.success) {
                        return;
                    }
                    (0, _ajax.addUserTpls)({
                        name: page.name,
                        data: (0, _stringify2.default)(page),
                        pic: res.data.src
                    }).done(function (result) {
                        if (result.success) {
                            $.tip({});
                            // 重新加载用户模板列表
                            (0, _tplSource.getUserTplsFun)({
                                type: '',
                                pagesize: 20,
                                page: 1
                            });
                        }
                    });
                });
            });
        }
    });
}

// 撤销，next
function unRedoFun(self) {
    var appPageHistory = '';
    var appHistoryIndex = 0; // 记录当前的下标
    var appHistoryLock = false; // 点击撤销，恢复按钮的时候，不记录操作

    var historyFun = function historyFun(e, mark) {

        if (appHistoryLock) {
            return;
        }

        var index = AppData.edit.pageIndex;
        var page = AppData.data[AppData.edit.pageType][index];
        var pageStr = (0, _stringify2.default)(page);
        if (mark && appPageHistory !== pageStr) {
            console.log('发生变化，进行缓存记录');
            // 缓存记录 
            AppData.edit.history.push((0, _stringify2.default)({
                page: page,
                index: index
            }));
            // 只存20条记录
            if (AppData.edit.history.length > 20) {
                AppData.edit.history.shift();
            }
            appHistoryIndex = AppData.edit.history.length - 1;
            appPageHistory = pageStr;
        }
    };

    // 绑定历史操作监听
    $(document).on('mouseup.history keyup.history appDataChange.history', historyFun);

    // 点击撤销，下一步之后的操作
    var unRedo = function unRedo() {
        // console.log(appHistoryIndex);
        if (appHistoryIndex < 0) {
            appHistoryIndex = 0;
            return;
        }
        appHistoryLock = true;
        var history = AppData.edit.history;
        if (history.length > 0) {
            var his = history[appHistoryIndex];
            if (his) {
                var obj = JSON.parse(his);
                AppData.data[AppData.edit.pageType][obj.index] = obj.page;
                $('#pagesList').find('.page-item').eq(obj.index).trigger('click', true);
            }
        }
        appHistoryLock = false;
    };

    // 撤销， 撤销的时候，不记录缓存
    $('#fastToNext').on('click', function (e) {
        e.stopPropagation();
        appHistoryIndex--;
        unRedo(appHistoryIndex);
    });

    // 下一步
    $('#fastToPrev').on('click', function (e) {
        e.stopPropagation();
        appHistoryIndex++;
        unRedo(appHistoryIndex);
    });
}

// 设置 x,y 坐标
/**
 * @desc 坐标添加或者删除
 * @param d 方向 x, y
 * @param type 添加或者减少 add, del
 * @param num 每次添加减少的值
*/
function setXYPoint(xy, num) {
    // ...
    var $dom = null;
    var val = null;
    if (xy === 'x') {
        $dom = $('#basicTpl_set_x');
    } else {
        $dom = $('#basicTpl_set_y');
    }
    val = parseInt($dom.val(), 10) + num;
    $dom.val(val + 'px');
    $dom.trigger('changes', val);
}

// 移动层级
function layerFromTo(data) {
    if (data.to < 0 || data.to > AppData.edit.pageClass.page.layers.length) {
        console.log('不能移动了', data.to);
        return;
    }
    (0, _layerFun.uniqendLayer)(AppData.edit.pageClass, data);
    AppData.edit.pageClass.initLayerList(data.to);
}

// 鼠标右键操作
function mouseRightBtn(self) {
    $(document).on('contextmenu', '#phone', function (e) {
        e.preventDefault();
    });
    $(document).on('contextmenu.menu', '.page-view .layer, .mt-contextmenu', function (e) {
        e.preventDefault();
        // ...
        $.contextMenu({
            x: e.pageX,
            y: e.pageY,
            vals: [{ name: '<i class="iconfont icon-dingceng"></i> 置顶层', val: 'top' }, { name: '<i class="iconfont icon-diceng"></i> 置底层', val: 'bottom' }, { name: '<i class="iconfont icon-shangyiyiceng"></i> 上移一层', val: 'prev' }, { name: '<i class="iconfont icon-xiayiyiceng"></i> 下移一层', val: 'next' }, { name: '<i class="iconfont icon-fuzhi"></i> 复制图层', val: 'copy' }, { name: '<i class="iconfont icon-niantie"></i> 粘贴图层', val: 'paste' }, { name: '<i class="iconfont icon-shoucang"></i> 收藏图层', val: 'save' }, { name: '<i class="iconfont icon-icodel"></i> 删除图层', val: 'del' }],
            callback: function callback(val, $layer) {
                var activeIndex = $('#layerlist').find('.active').index();
                switch (val) {
                    // 置顶
                    case 'top':
                        layerFromTo({
                            from: activeIndex,
                            to: 0
                        });break;

                    // 置底
                    case 'bottom':
                        layerFromTo({
                            from: activeIndex,
                            to: AppData.edit.pageClass.page.layers.length - 1
                        });break;

                    // 上移一层
                    case 'prev':
                        layerFromTo({
                            from: activeIndex,
                            to: activeIndex - 1
                        });break;

                    // 下移一层
                    case 'next':
                        layerFromTo({
                            from: activeIndex,
                            to: activeIndex + 1
                        });break;

                    // 复制图层
                    case 'copy':
                        $('#layerlist').find('.active .copylayer').trigger('click');break;

                    // 粘贴图层
                    case 'paste':
                        $(document).trigger('pastelayer');break;

                    // 收藏图层
                    case 'save':
                        $('.save-page-do').trigger('click');break;

                    // 删除图层
                    case 'del':
                        $('#layerlist').find('.active .dellayer').trigger('click');break;
                }
            }
        });
    });
}

// 快捷按钮操作
function shortcuts() {

    $(document).on("keydown.shortcuts", function (ev) {
        // var ev = window.event || e;
        var code = ev.keyCode;
        //ctrl+s + code
        // console.log(code, ev.ctrlKey, ev.shiftKey);

        // 这里加个锁吧
        if ($(':focus').length !== 0) {
            // console.log('不监听');
            return;
        }

        if (ev.ctrlKey && [83, 90, 89, 189, 187, 80, 75, 72, 67, 86].indexOf(code) !== -1) {
            ev.preventDefault();
            var copyDo = function copyDo() {
                var $active = $('#layerlist').find('.active');
                if ($active[0]) {
                    $active.find('.copylayer').trigger('click');
                }
            };
            switch (code) {
                case 83:
                    $('#appPublish').trigger('click');break; // ctrl+s 保存预览APP
                case 90:
                    $('#fastToNext').trigger('click');break; // ctrl+z 撤销
                case 89:
                    $('#fastToPrev').trigger('click');break; // ctrl+y 恢复
                case 189:
                    $('#fastToMin').trigger('click');break; // ctrl+ - 缩小画布
                case 187:
                    $('#fastToMax').trigger('click');break; // ctrl+ + 放大画布
                case 80:
                    $('.play-animation-do').trigger('click');break; // ctrl+ p 播放动画
                case 75:
                    $('.close-animation-do').trigger('click');break; // ctrl+ k 元素可见
                case 72:
                    $('#gridBoxBtn').trigger('click');break; // ctrl+ h 显示网格
                case 86:
                    $(document).trigger('pastelayer');break; // ctrl+ v 粘贴
                case 67:
                    copyDo();break; // ctrl+ c 复制
            }
        }

        // 删除
        if (code === 46) {
            ev.preventDefault();
            $('#layerlist').find('.active .dellayer').trigger('click'); // delete 删除layer
        }

        // 上下左右切换
        if ([38, 40, 37, 39].indexOf(code) !== -1) {
            ev.preventDefault();

            var num = 1;
            if (ev.shiftKey) {
                num = 20;
            }

            if (AppData.edit.layerIndex !== null) {
                switch (code) {
                    case 38:
                        setXYPoint('y', -num);break; // 上
                    case 37:
                        setXYPoint('x', -num);break; // 左
                    case 39:
                        setXYPoint('x', num);break; // 右
                    case 40:
                        setXYPoint('y', num);break; // 下
                }
            } else if ((0, _AppDataFun.getViewDom)().find('.mt-control').length > 1) {
                // 选择组
                var arr = (0, _appFunLayerGroup.getLayerGroupArr)();
                switch (code) {
                    case 38:
                        (0, _appFunLayerGroup.changeLayerGroupArr)(arr, null, -num);break; // 上
                    case 37:
                        (0, _appFunLayerGroup.changeLayerGroupArr)(arr, -num, null);break; // 左
                    case 39:
                        (0, _appFunLayerGroup.changeLayerGroupArr)(arr, num, null);break; // 右
                    case 40:
                        (0, _appFunLayerGroup.changeLayerGroupArr)(arr, null, num);break; // 下
                }
                (0, _appFunLayerGroup.setLayerGroupArr)(arr);
            }
        }
    });
}

/**
 * 初始化事件
 */
function iniFastEvent(self) {
    fastToMax();
    fastToMin();
    copyPage(self);
    delPage(self);
    addPage(self);
    savePage(self);
    unRedoFun(self);
    shortcuts(); // 快捷键
    changePage(); // 改变长页
    mouseRightBtn(self); // 鼠标右键
}

/**
 * 初始化的时候，默认设置phone 的 缩放
*/
function setPhoneScale() {
    $('.phonebox').transform({
        "scale": _global2.default.scale
    });
}

/***/ }),
/* 504 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserTplsFun = getUserTplsFun;
exports.sysTpls = sysTpls;

var _ajax = __webpack_require__(109);

var _imgSource = __webpack_require__(296);

var _global = __webpack_require__(6);

var _null = __webpack_require__(548);

var _null2 = _interopRequireDefault(_null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取系统模板分类
function getSysTplsTypesFun() {
    $('#imgSysList').loading();
    (0, _ajax.getSysTplsTypes)().done(function (res) {
        if (res.success) {
            // console.log(res.data);
            var tpl = '<h5>HOT:</h5> <a data-id="">All</a>';
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                tpl += '<a data-id="' + d.id + '">' + d.name + '</a>';
            }
            // 设置 素材列表
            $('#sysTplsTypesList').html(tpl);
        }
    });
}

// 获取系统模板 
// ajax
function getSysTplsFun(p) {
    $('#sysTplsList').loading();
    (0, _ajax.getSysTpls)({ name: p.name || '', type: p.type, pageSize: p.pagesize, pageNum: p.page }).done(function (res) {
        if (res.success) {
            // console.log(res.data);
            var arr = res.data;
            arr.unshift({
                data: '{"name": "空白页面", "style": {}, "layers": [], "slider": {"animate": 1, "autoplay": false, "lock": false, "time": 5}}',
                name: '空白页面',
                pic: _null2.default
            });
            var tpl = '<li>\n                <div class="name">\u7A7A\u767D\u9875\u9762</div>\n                <div class="imgbox"><img src="' + _null2.default + '" alt=""></div>\n            </li>';
            for (var i = 1; i < arr.length; i++) {
                var d = arr[i];
                tpl += '<li>\n                    <div class="name">' + d.name + '</div>\n                    <div class="imgbox"><img src="' + (_global.sourceHome + d.pic) + '" alt=""></div>\n                </li>';
            }
            // 设置 素材列表
            $('#sysTplsList').html(tpl);
            $('#sysTplsList').find('li').each(function (index, elem) {
                $(elem).data('val', arr[index].data);
            });

            // 分页
            var $pagelist = $('#sysTplsPagelist');
            if (!$pagelist.find('.mt-pagelist')[0]) {
                // 初始化分页
                (0, _imgSource.newPage)(res.count, $pagelist, getSysTplsFun);
            }
        }
    });
}

// 获取用户模板
function getUserTplsFun(p) {
    $('#myTplsList').loading();
    (0, _ajax.getUserTpls)({
        name: '',
        pageSize: p.pagesize,
        pageNum: p.page
    }).done(function (res) {
        if (res.success) {
            var tpl = '';
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                tpl += '<li data-id="' + d.id + '">\n                    <div class="name">' + d.name + '</div>\n                    <a data-id="' + d.id + '" class="del"><i class="iconfont icon-close"></i></a>\n                    <div class="imgbox"><img src="' + d.pic + '" alt=""></div>\n                </li>';
            }
            // 设置 素材列表
            $('#myTplsList').html(tpl);
            $('#myTplsList').find('li').each(function (index, elem) {
                $(elem).data('val', res.data[index].data);
            });

            // 分页
            var $pagelist = $('#myTplsPageList');
            if (!$pagelist.find('.mt-pagelist')[0]) {
                // 初始化分页
                (0, _imgSource.newPage)(res.count, $pagelist, getUserTplsFun);
            }
        }
    });
}

// 选择系统模板分类事件
function eventSysTpls() {
    // 选择模板分类
    $('#sysTplsTypesList').on('click', 'a', function (e) {
        $(this).addClass('active').siblings('a').removeClass('active');
        var id = $(this).attr('data-id');
        getSysTplsFun({
            type: id,
            pagesize: _imgSource.PAGE_SIZE,
            page: 1
        });
    });

    // 选择系统模板
    $('#sysTplsList, #myTplsList').on('click', 'li', function (e) {
        var val = $(this).data('val');

        // 根据不同的类型，选择不同的 id 
        var $list = null;
        switch (AppData.edit.pageType) {
            case 'pages':
                $list = $('#pagesList');break;
            case 'popups':
                $list = $('#popupsList');break;
            case 'fixeds':
                $list = $('#fixedsList');break;
        }
        if (!$list) {
            console.error('未知页面类型...');
            return;
        }

        var $item = $list.find('.active');
        var index = $item.index();
        AppData.edit.appClass.addPage(index, JSON.parse(val));
    });

    // 删除用户模板
    $('#myTplsList').on('click', '.del', function (e) {
        e.stopPropagation();
        var id = $(this).attr('data-id');
        (0, _ajax.delUserTpls)({
            id: id
        }).done(function (res) {
            if (res.success) {
                $.tip();
                getUserTplsFun({
                    type: '',
                    pagesize: _imgSource.PAGE_SIZE,
                    page: 1
                });
            }
        });
    });

    // 搜索
    $('#searchSysTpl').on('click', '.mt-search-btn', function () {
        var name = $('#searchSysTplInput').val();
        var $active = $('#sysTplsTypesList').find('.active');
        var id = $active[0] ? $active.attr('data-id') : '';
        getSysTplsFun({
            name: name,
            type: id,
            pagesize: _imgSource.PAGE_SIZE,
            page: 1
        });
    });
}

// 系统图片
function sysTpls() {

    // 获取系统图片
    getSysTplsFun({
        type: '',
        pagesize: _imgSource.PAGE_SIZE,
        page: 1
    });

    // 获取用户图片
    getUserTplsFun({
        type: '',
        pagesize: _imgSource.PAGE_SIZE,
        page: 1
    });

    // 获取模板分类
    getSysTplsTypesFun();

    // 系统模板事件
    eventSysTpls();
}

/***/ }),
/* 505 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLayerGroupArr = getLayerGroupArr;
exports.changeLayerGroupArr = changeLayerGroupArr;
exports.setLayerGroupArr = setLayerGroupArr;
exports.groupLayers = groupLayers;

var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

var _layerFun = __webpack_require__(101);

var _AppDataFun = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// layer 组的操作
// 同步保存 组的数据
function saveGroupData() {
    (0, _AppDataFun.getViewDom)().find('.mt-control').each(function () {
        var $layer = $(this).closest('.layer');
        var index = 9999 - $layer.css('z-index');
        var layer = AppData.data[AppData.edit.pageType][AppData.edit.pageIndex].layers[index];
        layer.style.left = $layer.css('left');
        layer.style.top = $layer.css('top');
    });
    (0, _AppDataFun.AppDataChange)();
}

// 获取layer 组的参数
function getLayerGroupArr() {
    var arr = [];
    (0, _AppDataFun.getViewDom)().find('.mt-control').each(function () {
        var $this = $(this).closest('.layer');
        var oleft = parseInt($this.css('left'), 10);
        var otop = parseInt($this.css('top'), 10);
        arr.push({
            nleft: oleft,
            ntop: otop,
            dom: $this,
            left: oleft,
            top: otop
        });
    });

    return arr;
}

// 变化layer 组的位置, 新的x,y 坐标 是叠加的值
function changeLayerGroupArr(arr, x, y) {
    var scale = AppData.edit.phoneScale || _global2.default.scale;
    arr.forEach(function (elem) {
        // 记录当前的位置
        if (x) {
            elem.nleft = elem.left + x / scale;
        } else {
            elem.nleft = elem.left;
        }
        if (y) {
            elem.ntop = elem.top + y / scale;
        } else {
            elem.ntop = elem.top;
        }
        elem.dom.css({
            left: elem.nleft,
            top: elem.ntop
        });
    });
}

// 设置 layer 组的 值
function setLayerGroupArr(arr) {
    arr.forEach(function (elem) {
        var index = 9999 - elem.dom.css('z-index');
        var layer = AppData.data[AppData.edit.pageType][AppData.edit.pageIndex].layers[index];
        layer.style.left = elem.nleft + 'px';
        layer.style.top = elem.ntop + 'px';
    });
    (0, _AppDataFun.AppDataChange)();
    arr = null;
}

/**
 * @desc 组合图层 事件, app.js 里面调用一次
*/
function groupLayers(self) {

    // $(document).trigger('appDataChange.history');

    // 通过旋转后的DIV，获取到外部DIV的坐标和尺寸
    /**              w
     *     ------------------------
     *     |                      |
     *     |     倾斜的矩形形      |  h
     *     |                      |
     *     ------------------------    
     */
    var rectParam = function rectParam($dom) {
        var rotate = $dom.transform('rotate') % 90;
        var ro = rotate * (Math.PI / 180);
        var dw = parseInt($dom.css('width'), 10),
            dh = parseInt($dom.css('height'), 10);
        var dLeft = parseInt($dom.css('left'), 10),
            dTop = parseInt($dom.css('top'), 10);
        var center = {
            left: dLeft + dw / 2,
            top: dTop + dh / 2
        };
        if (rotate == 0) {
            return {
                top: dTop,
                left: dLeft,
                wid: dw,
                hei: dh,
                dw: dw,
                dh: dh,
                center: center
            };
        }
        var a = Math.cos(ro) * dw,
            b = Math.sin(ro) * dw,
            c = Math.cos(Math.PI / 2 - ro) * dh,
            d = Math.sin(Math.PI / 2 - ro) * dh;
        var wid = Math.ceil(c + a),
            hei = Math.ceil(b + d);
        return {
            top: center.top - hei / 2, // 外壳的 top
            left: center.left - wid / 2, // 外壳 的 left
            wid: wid, // 外壳宽
            hei: hei, // 外壳高
            dw: dw, // 真实宽
            dh: dh, // 真实高
            center: center
        };
    };

    // 快捷键功能, 左对齐
    $('#groupAlignLeft').on('click', function () {

        var min = Infinity;
        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var val = rectParam($layer).left;
            if (val < min) {
                min = val;
            }
        });
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            // 已知 外壳 left = min; 求left
            var domLeft = min + p.wid / 2 - p.dw / 2;
            // 这里要单独写个方法
            $layer.css('left', domLeft + 'px');
        });
        saveGroupData();
    });

    // 上对齐
    $('#groupAlignUpDown').on('click', function () {

        var min = Infinity;
        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var val = rectParam($layer).top;
            if (val < min) {
                min = val;
            }
        });
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            // 已知 外壳 left = min; 求left
            var domTop = min + p.hei / 2 - p.dh / 2;
            // 这里要单独写个方法
            $layer.css('top', domTop + 'px');
        });
        saveGroupData();
    });

    // 右对齐
    $('#groupAlignRight').on('click', function () {

        var max = 0;
        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            var val = p.left + p.wid;
            if (val > max) {
                max = val;
            }
        });
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            // 已知 外壳 left + wid = max; 求 left
            var domLeft = max - p.wid / 2 - p.dw / 2;
            // 这里要单独写个方法
            $layer.css('left', domLeft + 'px');
        });
        saveGroupData();
    });

    // 下对齐
    $('#groupAlignDown').on('click', function () {

        var max = 0;
        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            var val = p.top + p.hei;
            if (val > max) {
                max = val;
            }
        });
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            // 已知 外壳 left + wid = max; 求 left
            var domTop = max - p.hei / 2 - p.dh / 2;
            // 这里要单独写个方法
            $layer.css('top', domTop + 'px');
        });
        saveGroupData();
    });

    // 水平居中对齐
    $('#groupAlignLeftRightCenter').on('click', function () {

        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        var len = $controls.length;
        var val = 0;
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            val += p.center.top;
        });
        val = val / len; // 获取平均高度
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            // 已知 外壳 pianYi = val - p.center.top; 求 top
            var domTop = val - p.dh / 2;
            // 这里要单独写个方法
            $layer.css('top', domTop + 'px');
        });
        saveGroupData();
    });

    // 垂直居中对齐
    $('#groupAlignUpDownCenter').on('click', function () {

        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        var len = $controls.length;
        var val = 0;
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            val += p.center.left;
        });
        val = val / len; // 获取平均高度
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            // 已知 外壳 pianYi = val - p.center.top; 求 top
            var domLeft = val - p.dw / 2;
            // 这里要单独写个方法
            $layer.css('left', domLeft + 'px');
        });
        saveGroupData();
    });

    // 垂直均分
    $('#groupAlignUpDownEven').on('click', function () {

        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        var len = $controls.length;
        var min = Infinity,
            max = 0;
        var all = 0; // 所有宽
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            if (p.top < min) {
                min = p.top;
            }
            if (p.top + p.hei > max) {
                max = p.top + p.hei;
            }
            all += p.hei;
        });
        var eachSize = (max - min - all) / (len - 1); // 获取平均 间隔
        var prev = 0;
        $controls.each(function (index) {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            if (index !== 0) {
                var val = eachSize + prev;
                // 这里要单独写个方法
                $layer.css('top', val + 'px');
                prev = val + p.hei;
            } else {
                prev = p.hei + p.top;
            }
        });
        saveGroupData();
    });

    // 水平均分
    $('#groupAlignRightLeftEven').on('click', function () {

        var $controls = (0, _AppDataFun.getViewDom)().find('.mt-control');
        var len = $controls.length;
        var min = Infinity,
            max = 0;
        var all = 0; // 所有宽
        $controls.each(function () {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            if (p.left < min) {
                min = p.left;
            }
            if (p.left + p.wid > max) {
                max = p.left + p.wid;
            }
            all += p.wid;
        });
        var eachSize = (max - min - all) / (len - 1); // 获取平均 间隔
        var prev = 0;
        $controls.each(function (index) {
            var $layer = $(this).closest('.layer');
            var p = rectParam($layer);
            if (index !== 0) {
                var val = eachSize + prev;
                // 这里要单独写个方法
                $layer.css('left', val + 'px');
                prev = val + p.wid;
            } else {
                prev = p.wid + p.left;
            }
        });
        saveGroupData();
    });

    // 拖动事件
    var initGroupEvent = function initGroupEvent() {
        // 让图层可拖动
        _global2.default.$doc.off('mousedown.group').on('mousedown.group', '.mt-control', function (ed) {
            ed.preventDefault();
            var arr = getLayerGroupArr(); // 获取layer 组的数据
            _global2.default.$doc.on('mousemove.group', function (em) {
                var x = em.pageX - ed.pageX;
                var y = em.pageY - ed.pageY;
                // 变化位置
                changeLayerGroupArr(arr, x, y);
            }).on('mouseup.group', function (eu) {
                // 数据缓存到 AppData, 设置组的值
                setLayerGroupArr(arr);
                _global2.default.$doc.off('mousemove.group mouseup.group');
            });
        });
    };

    // 鼠标右键功能， 慢慢开发
    // g.$doc.off('contextmenu.group').on('contextmenu.group', '.mt-control', function (e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     $.contextMenu({
    //         x: e.pageX,
    //         y: e.pageY,
    //         vals: [
    //             { name: '<i class="iconfont icon-fuzhi"></i> 复制图层', val: 'copy' },
    //             { name: '<i class="iconfont icon-icodel"></i> 删除图层', val: 'del' }
    //         ],
    //         callback: (val, $layer) => {
    //             console.log(val);
    //             if (val === 'copy') {
    //                 console.log('复制图层！');
    //             } else if (val === 'del') {
    //                 console.log('删除图层！');
    //             }
    //         }
    //     });
    // });

    // 拖动选择一组layer
    $('#phone').off('mousedown.layerGroup').on('mousedown.layerGroup', function (ed) {
        if (!$(ed.target).closest('.layer')[0]) {

            // 控制器的代码
            var controlBox = '<div class="mt-control">\n                <span class="mt-control-top"></span>\n                <span class="mt-control-left"></span>\n                <span class="mt-control-right"></span>\n                <span class="mt-control-bottom"></span>\n                <span class="mt-control-topleft"></span>\n                <span class="mt-control-topright"></span>\n                <span class="mt-control-bottomleft"></span>\n                <span class="mt-control-bottomright"></span>\n                <span class="mt-control-center"></span>\n            </div>';

            // 获取当前的layer 位置, 获取中心点。
            var arr = [];
            (0, _AppDataFun.getViewDom)().find('.layer').each(function () {
                var $this = $(this);
                var rotate = $this.transform('rotate');
                $this.transform({ 'rotate': '0deg' });
                var obj = {
                    left: $this.offset().left,
                    top: $this.offset().top,
                    width: $this.width(),
                    height: $this.height(),
                    dom: $this
                };
                if (rotate) {
                    $this.transform({ 'rotate': rotate + 'deg' });
                }
                obj.center = {
                    x: obj.left + obj.width / 2,
                    y: obj.top + obj.height / 2
                };
                arr.push(obj);
            });

            // 写入选中框
            if (!$('.layer-group-select')[0]) {
                $('body').append('<div class="layer-group-select"></div>');
            }

            // 拖动的时候，时刻监听，然后给对应的layer 设置好 样式
            var $selectGroup = $('.layer-group-select');
            var wid = void 0,
                hei = void 0,
                top = void 0,
                left = void 0;
            _global2.default.$doc.on('mousemove.layerGroup', function (em) {

                wid = Math.abs(em.pageX - ed.pageX);
                hei = Math.abs(em.pageY - ed.pageY);

                // 拉动鼠标
                em.pageX > ed.pageX ? left = ed.pageX : left = em.pageX;
                em.pageY > ed.pageY ? top = ed.pageY : top = em.pageY;

                $selectGroup.css({
                    top: top,
                    left: left,
                    width: wid,
                    height: hei
                });

                // 设置 控制器
                arr.forEach(function (elem, index) {
                    var _elem$center = elem.center,
                        x = _elem$center.x,
                        y = _elem$center.y;

                    if (x > left && x < left + wid && y > top && y < top + hei) {
                        // console.log('中心了', index);
                        if (!elem.dom.find('.mt-control')[0]) {
                            elem.dom.append(controlBox);
                        }
                    } else {
                        elem.dom.find('.mt-control').remove();
                    }
                });
            }).on('mouseup.layerGroup', function (eu) {
                _global2.default.$doc.off('mousemove.layerGroup mouseup.layerGroup');
                // console.log(wid, hei, top, left);

                // 调出拖动组的浮动层，选中之后，接下来就要，对选中的进行操作了
                var $control = (0, _AppDataFun.getViewDom)().find('.mt-control');
                if ($control.length > 1) {
                    console.log('触发图层集合的操作');
                    // 显示 设置区域
                    (0, _layerFun.layerShow)('#setLayerGroupBox');

                    // 启用组合模式 , 这时候，设置个 group 参数，如果在点击 layer 的时候，发现有 group 参数，就统一操作
                    AppData.edit.group = true;

                    // 初始化图层组的事件，拖动移动位置
                    initGroupEvent();
                } else if ($control.length === 1) {
                    // 只选中一个，就选择这个图层
                    $control.closest('.layer').trigger('click');
                } else {}
                // ...


                // 释放内存
                arr = null;
                $selectGroup.remove();
            });
        }
    });
}

/***/ }),
/* 506 */,
/* 507 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(508);


/***/ }),
/* 508 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(111);

__webpack_require__(509);

__webpack_require__(510);

__webpack_require__(227);

__webpack_require__(520);

__webpack_require__(521);

__webpack_require__(243);

__webpack_require__(522);

__webpack_require__(523);

__webpack_require__(524);

__webpack_require__(525);

__webpack_require__(526);

__webpack_require__(527);

__webpack_require__(528);

__webpack_require__(529);

__webpack_require__(245);

__webpack_require__(530);

__webpack_require__(531);

__webpack_require__(184);

__webpack_require__(246);

__webpack_require__(247);

__webpack_require__(532);

__webpack_require__(125);

__webpack_require__(533);

__webpack_require__(534);

__webpack_require__(535);

__webpack_require__(248);

__webpack_require__(536);

__webpack_require__(249);

__webpack_require__(250);

__webpack_require__(251);

__webpack_require__(252);

__webpack_require__(253);

__webpack_require__(254);

__webpack_require__(255);

__webpack_require__(256);

__webpack_require__(186);

__webpack_require__(257);

__webpack_require__(258);

var _indexedDB = __webpack_require__(103);

var db = _interopRequireWildcard(_indexedDB);

var _app = __webpack_require__(537);

var _app2 = _interopRequireDefault(_app);

var _localStorage = __webpack_require__(156);

var _imgURLClear = __webpack_require__(550);

var _ajax = __webpack_require__(109);

var _imgSource = __webpack_require__(296);

var _tplSource = __webpack_require__(504);

var _otherSource = __webpack_require__(551);

var _appFun = __webpack_require__(503);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// 数据容器
// 模板资源
// ajax
//..
//控制器

//分页
//开关
//图片剪切
//tabs
//触发器
//选
//设置样式
//简单的模版引擎
// 滚轮事件
// 确认
// 获取浏览器url 数据
// json转码escape
// 帮助提示
// 浮点数计算
//import './unit/Matrix.js'; // 矩阵算法

//插件
// 数据双向绑定
//设置app参数


//事件 ....
(function (window) {
    window.AppData = {
        data: null, //缓存APP数据
        edit: {
            pageType: 'pages', // 当前编辑的类型，pages, popups, fixeds 对应 data里面的 key
            copyLayer: null, // 复制layer内容
            history: [], // 历史记录
            setapp: true, // 我喜欢就加上咯，任性！
            phoneScale: null, // 手机缩放比例
            appClass: null, // appClass
            pageIndex: null, // 默认编辑页面 index
            pageClass: null, //当前编辑的 page 类
            layerIndex: null, // 默认选中的layer index
            layerDom: null, // 当前编辑的layer Dom对象
            layerClass: null // 当前编辑的layer 类
        }
    };
})(window);

// 初始化App
// 图片资源
// indexedDB

//APP 类
//drag
//文件上传
// 滚动条
//title提示 
//列表排序
//单选
//颜色
//添加样式
//简单的模版引擎
// 弹框
// loading
// object 变成 style top:10px; left: 20px; // ... 
// 右键菜单初始化
// 复选框
//自动控制单位
// js 原生对象继承的方法集合
//资源库事件 //

// 全局方法
//点击右侧


// 模板初始化
function iniApp(res) {

    // 新增扩展, 浮动层, 弹窗层，兼容老版本.ss
    if (!res.fixeds) {
        res.fixeds = [{
            id: '',
            name: '浮动层上',
            style: {},
            layers: []
        }, {
            id: '',
            name: '浮动层下',
            style: {},
            layers: []
        }];
    } else if (res.fixeds.length === 1) {
        res.fixeds.push({
            id: '',
            name: '浮动层下',
            style: {},
            layers: []
        });
    }

    // 弹窗扩展，兼容老版本
    if (!res.popups) {
        res.popups = [];
    }

    AppData.data = res;

    var app = new _app2.default(res);
    app.init();

    // 如果pages 没有列表， 展开页面选择框
    if (res.pages.length === 0) {
        $('#flod-btn').trigger('click');
    }
}

// 获取数据
function getData() {
    // 获取缓存数据
    var uid_id = (0, _localStorage.getStorage)('UID_ID');
    var uid = $.getUrlData('owner');
    var id = $.getUrlData('id');

    if (uid === null && id === null) {
        $.tip({
            msg: '操作失败，请先选择APP', //
            type: 'danger', //success,danger,warning
            time: 30000 //
        });
        return;
    }

    // 如果有缓存， 且当前打开的 appid 
    if (uid_id === uid + '_' + id) {
        var APP_DATA = (0, _localStorage.getStorage)('APP_DATA');

        // 数据清洗 - 将 缓存的图片进行数据清洗，因为刷新后，二进制缓存更新了。
        (0, _imgURLClear.imgURLClear)(APP_DATA, function () {
            iniApp(APP_DATA);
        });
    } else {
        //获取APP对象
        (0, _ajax.getAppData)({ appid: $.getUrlData('id'), owner: $.getUrlData('owner') }).done(function (res) {
            // console.log("main.js 43 =>",res);
            // 初始化编辑器方法，入口
            if (res.success && res.data) {
                (0, _localStorage.setStorage)('UID_ID', uid + '_' + id);
                iniApp(JSON.parse(res.data.data));
            } else {
                $.tip({
                    msg: '非法获取数据！',
                    type: 'danger'
                });
            }
        });
    }
}

// 主函数入口
$(function () {

    // 系统图片
    (0, _imgSource.sysImg)();

    // 系统模板
    (0, _tplSource.sysTpls)();

    // 我的图片
    (0, _imgSource.myImg)();

    // 音乐
    (0, _otherSource.sysMp3)();

    // 设置缩放
    (0, _appFun.setPhoneScale)();

    // 创建数据库, 这个方法是异步的
    db.openDB().then(function (res) {
        // 获取数据， 渲染app
        if (res) {
            getData();
        }
    });
});

/***/ }),
/* 509 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 510 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _center = __webpack_require__(511);

var _center2 = _interopRequireDefault(_center);

var _fastbtns = __webpack_require__(512);

var _fastbtns2 = _interopRequireDefault(_fastbtns);

var _header = __webpack_require__(513);

var _header2 = _interopRequireDefault(_header);

var _layerlist = __webpack_require__(514);

var _layerlist2 = _interopRequireDefault(_layerlist);

var _left = __webpack_require__(515);

var _left2 = _interopRequireDefault(_left);

var _right = __webpack_require__(516);

var _right2 = _interopRequireDefault(_right);

var _source = __webpack_require__(517);

var _source2 = _interopRequireDefault(_source);

var _exSource = __webpack_require__(518);

var _exSource2 = _interopRequireDefault(_exSource);

var _view = __webpack_require__(519);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
    $('body').html(_header2.default + _left2.default + _source2.default + _exSource2.default + _center2.default + _right2.default + _layerlist2.default + _fastbtns2.default + _view2.default);
}); // tpls 模板

/***/ }),
/* 511 */
/***/ (function(module, exports) {

module.exports = "<div class=\"center\">\r\n\r\n\t<!--模版选择-->\r\n\t<div class=\"temps\" id=\"temps\" data-status=\"hide\">\r\n\t\t<a id=\"flod-btn\" class=\"flod-btn\">\r\n\t\t\t<i class=\"iconfont icon-a3right\"></i>\r\n\t\t</a>\r\n\t\t<!--tab-->\r\n\t\t<div class=\"mt-tab mt-tab-style1 a-tpls\">\r\n\t\t\t<div class=\"mt-tab-header\">\r\n\t\t\t\t<ul>\r\n\t\t\t\t\t<li class=\"mt-tab-head mt-active\">模版中心</li>\r\n\t\t\t\t\t<!--\r\n\t\t\t\t -->\r\n\t\t\t\t\t<li class=\"mt-tab-head\">我的模版</li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"mt-tab-body\">\r\n\t\t\t\t<div class=\"mt-tab-box mt-active tpls-center\">\r\n\t\t\t\t\t<div class=\"mt-input-search\" id=\"searchSysTpl\">\r\n\t\t\t\t\t\t<input class=\"\" type=\"\" name=\"\" id=\"searchSysTplInput\">\r\n\t\t\t\t\t\t<a class=\"mt-search-btn iconfont icon-unie664\"></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"tpl-type\" id=\"sysTplsTypesList\">\r\n\t\t\t\t\t\t<!-- <h5>HOT:</h5>\r\n\t\t\t\t\t\t<a>节日</a> <a>商务</a> <a>祝贺</a> <a>活动</a> <a>婚庆</a> <a>招聘</a>\r\n\t\t\t\t\t\t<a>规则</a> <a>请帖</a> <a>美女</a> <a>获得促销</a> <a>贺卡</a> <a>培训</a>\r\n\t\t\t\t\t\t<a class=\"mt-more\">more</a> -->\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"tpl-list\">\r\n\t\t\t\t\t\t<ul id=\"sysTplsList\"></ul>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"tpl-pagelist\" id=\"sysTplsPageList\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"mt-tab-box tpls-my\">\r\n\t\t\t\t\t<div class=\"tpl-list\">\r\n\t\t\t\t\t\t<ul id=\"myTplsList\"></ul>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"tpl-pagelist\" id=\"myTplsPageList\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<!--手机设置区域-->\r\n\t<div class=\"phone\" id=\"phone\">\r\n\r\n\t\t<div class=\"phonebox\">\r\n\t\t\t<!--app区域-->\r\n\t\t\t<div class=\"phone-app\" id=\"phoneApp\">\r\n\t\t\t\t<div class=\"grid-box hide\" id=\"gridBox\">\r\n\t\t\t\t\t<ul class=\"row\">\r\n\t\t\t\t\t\t<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>\r\n\t\t\t\t\t\t<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>\r\n\t\t\t\t\t\t<li></li><li></li><li></li><li></li><li></li><li></li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t\t<ul class=\"col\">\r\n\t\t\t\t\t\t<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>\r\n\t\t\t\t\t\t<li></li><li></li><li></li><li></li><li></li><li></li><li></li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"set-page-height show\" id=\"setPageHeight\">\r\n\t\t\t\t\t<a class=\"set-page-height-btn\" id=\"setPageHeightBtn\"><i class=\"iconfont icon-shangxiawen\"></i></a>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"page-viewup\" id=\"pageViewPopup\"></div>\r\n\t\t\t\t<div class=\"page-viewup pageViewFixed\" id=\"pageViewFixedUp\"></div>\r\n\t\t\t\t<div class=\"page-viewup pageViewFixed\" id=\"pageViewFixedDown\"></div>\r\n\t\t\t\t<div class=\"page-view\" id=\"pageView\"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ }),
/* 512 */
/***/ (function(module, exports) {

module.exports = "<!--快捷按钮-->\r\n<div class=\"fastbtns mt-drag\" data-dragset='{\"limit\":true}'>\r\n    <h5><i class=\"iconfont icon-caidan\"></i> 快捷按钮</h5>\r\n    <!--左边快捷按钮-->\r\n    <div class=\"left-btns\" id=\"fastLeftBtns\">\r\n        <ul>\r\n            <li class=\"play-animation-do\">\r\n                <a><i class=\"iconfont icon-bofang\"></i></a>\r\n                <span>播放动画</span>\r\n            </li>\r\n            <li class=\"close-animation-do\" data-toggle='[{\"dom\":\"#phoneApp\",\"class\":\"element-show\"}]'>\r\n                <a><i class=\"iconfont icon-kejian\"></i></a>\r\n                <span>元素可见</span>\r\n            </li>\r\n            <li id=\"gridBoxBtn\" data-toggle='[{\"dom\":\"#gridBox\",\"class\":\"hide\"}]'>\r\n                <a><i class=\"iconfont icon-wangge\"></i></a>\r\n                <span>显示网格</span>\r\n            </li>\r\n            <li class=\"add-page-do\">\r\n                <a><i class=\"iconfont icon-fuzhihuihua\"></i></a>\r\n                <span>复制页面</span>\r\n            </li>\r\n            <li class=\"save-page-do\">\r\n                <a><i class=\"iconfont icon-shoucang\"></i></a>\r\n                <span>收藏页面</span>\r\n            </li>\r\n            <li class=\"del-page-do\">\r\n                <a><i class=\"iconfont icon-icon54\"></i></a>\r\n                <span>删除页面</span>\r\n            </li>\r\n            <!-- <li class=\"change-page-do\" data-toggle='[{\"dom\":\"#setPageHeight\",\"class\":\"hide\"}]'>\r\n                <a><i class=\"iconfont icon-shangxiafanye-\"></i></a>\r\n                <span>改变长页</span>\r\n            </li> -->\r\n        </ul>\r\n\r\n\r\n\r\n    </div>\r\n    <!--右边快捷按钮-->\r\n    <div class=\"bottom-btns\" id=\"fastRightBtns\">\r\n        <ul>\r\n            <li id=\"fastToNext\">\r\n                <a><i class=\"iconfont icon-chexiao2\"></i></a>\r\n                <span>撤销</span>\r\n            </li>\r\n            <li id=\"fastToPrev\">\r\n                <a><i class=\"iconfont icon-chexiao1\"></i></a>\r\n                <span>前进</span>\r\n            </li>\r\n            <li id=\"fastToMax\">\r\n                <a><i class=\"iconfont icon-fangda\"></i></a>\r\n                <span>放大画布</span>\r\n            </li>\r\n            <li id=\"fastToMin\">\r\n                <a><i class=\"iconfont icon-suoxiao\"></i></a>\r\n                <span>缩小画布</span>\r\n            </li>\r\n            <li id=\"fastAddNewPage\">\r\n                <a class=\"add\"><i class=\"iconfont icon-jia1\"></i></a>\r\n                <span>添加页面</span>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>";

/***/ }),
/* 513 */
/***/ (function(module, exports) {

module.exports = "<!--头部-->\r\n<div class=\"header\">\r\n\t<!--logo-->\r\n\t<div class=\"logo\"><a target=\"_blank\" href=\"/\">H5<span>DS</span><i>html5 design software</i></a></div>\r\n\t\r\n\t<!--app-->\r\n\t<div class=\"appset\">\r\n\t\t<div class=\"appname\">\r\n\t\t\t<div class=\"input a-setname\"></div>\r\n\t\t\t<a class=\"setapp\"><i class=\"iconfont icon-ordinaryset\"></i></a>\r\n\t\t</div>\r\n\t\t<a class=\"bg set-btn\"><i class=\"iconfont icon-beijing\"></i>基本设置</a>\r\n\t\t<a class=\"music set-btn\"><i class=\"iconfont icon-yinle\"></i>背景音乐</a>\r\n\t\t<a class=\"loading set-btn\"><i class=\"iconfont icon-loading\"></i>加载效果</a>\r\n\t\t<a class=\"helpinfo set-btn\"><i class=\"iconfont icon-bangzhu\"></i>帮助说明</a>\r\n\t</div>\r\n\r\n\t<!--left-->\r\n\t<div class=\"publish\">\r\n\t\t<a class=\"mt-btn-yellow\" id=\"clearLocalSave\">清除缓存</a> &nbsp;\r\n\t\t<a id=\"appPublish\" class=\"mt-btn-yellow\">预览/发布</a>\r\n\t\t<a href=\"/api/logout\" class=\"logout\"><i class=\"iconfont icon-tuichu\"></i> 退出</a>\r\n\t</div>\r\n\r\n</div>";

/***/ }),
/* 514 */
/***/ (function(module, exports) {

module.exports = "<div class=\"layerlist mt-drag\" data-dragset='{\"limit\":true, \"undrag\":[\"#layerlist\"]}'>\r\n    <h1 class=\"clearfix\">\r\n        <i class=\"iconfont icon-caidan\"></i>\r\n        <span>图层列表</span>\r\n        <a data-toggle='[{\"dom\":\"#layerlist\",\"class\":\"hide\"},{\"dom\":\"#layerlistIcon\",\"class\":\"layerlist-icon\"}]'><i id=\"layerlistIcon\" class=\"iconfont icon-a1down\"></i></a>\r\n    </h1>\r\n    <ul id=\"layerlist\" class=\"mt-uniqlist hide\"></ul>\r\n</div>";

/***/ }),
/* 515 */
/***/ (function(module, exports) {

module.exports = "<div class=\"left\">\r\n    <div class=\"mt-tab\" id=\"leftPagesList\">\r\n        <div class=\"mt-tab-header left-btn\">\r\n            <ul>\r\n                <li data-name=\"pages\" class=\"mt-tab-head mt-active\">页面</li>\r\n                <li data-name=\"popups\" class=\"mt-tab-head\">弹窗</li>\r\n                <li data-name=\"fixeds\" class=\"mt-tab-head\">浮动</li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"mt-tab-body left-pages\">\r\n            <div id=\"a_pages\" class=\"mt-tab-box mt-active\">\r\n                <ul id=\"pagesList\" class=\"a-pages mt-uniqlist\">\r\n                </ul>\r\n            </div>\r\n            <div id=\"a_popup\" class=\"mt-tab-box\">\r\n                <ul id=\"popupsList\" class=\"a-pages mt-uniqlist\">\r\n                </ul>\r\n            </div>\r\n            <div id=\"a_fixed\" class=\"mt-tab-box\">\r\n                <ul id=\"fixedsList\" class=\"a-pages\">\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),
/* 516 */
/***/ (function(module, exports) {

module.exports = "<div class=\"right\">\r\n    <!--功能按钮-->\r\n    <div class=\"fastMenu\" id=\"fastMenu\">\r\n        <h5>常用</h5>\r\n        <ul>\r\n            <li class=\"fun\" data-fun=\"text\"><a><i class=\"iconfont icon-wenben\"></i></a></li>\r\n            <li class=\"fun\" data-fun=\"img\"><a><i class=\"iconfont icon-beijing\"></i></a></li>\r\n            <li onclick=\"javascript:alert('请联系QQ676015863购买该功能')\" class=\"fun\" data-fun=\"svg\"><a><i class=\"iconfont icon-xingzhuang\"></i></a></li>\r\n            <li onclick=\"javascript:alert('请联系QQ676015863购买该功能')\" class=\"fun\" data-fun=\"map\"><a><i class=\"iconfont icon-ditu\"></i></a></li>\r\n            <!-- \r\n            <li class=\"fun\" data-fun=\"video\"><a><i class=\"iconfont icon-shipin\"></i></a></li>\r\n            <li class=\"fun\" data-fun=\"form\"><a><i class=\"iconfont icon-biaodan\"></i></a></li>\r\n            <li class=\"fun\" data-fun=\"effect\"><a><i class=\"iconfont icon-xiaoguo\"></i></a></li>\r\n            -->\r\n            <li><a class=\"more\" data-toggle='[{\"dom\":\".fastlist\",\"class\":\"show\"},{\"dom\":\".more\",\"class\":\"active\"}]'><i class=\"iconfont icon-more\"></i></a></li>\r\n        </ul>\r\n        <div class=\"fastlist\">\r\n            <h4>页面模块</h4>\r\n            <ul class=\"clearfix\">\r\n                <li class=\"fun\" data-fun=\"text\"><i class=\"iconfont icon-wenben\"></i><span>文本</span></li>\r\n                <li class=\"fun\" data-fun=\"img\"><i class=\"iconfont icon-beijing\"></i><span>图片</span></li>\r\n                <li onclick=\"javascript:alert('请联系QQ676015863购买该功能')\" class=\"fun\" data-fun=\"svg\"><i class=\"iconfont icon-xingzhuang\"></i><span>SVG</span></li>\r\n                <li onclick=\"javascript:alert('请联系QQ676015863购买该功能')\" class=\"fun\" data-fun=\"map\"><i class=\"iconfont icon-ditu\"></i><span>地图</span></li>\r\n            <!-- <li class=\"fun\" data-fun=\"effect\"><i class=\"iconfont icon-xiaoguo\"></i><span>效果</span></li>\r\n            <li class=\"fun\" data-fun=\"slider\"><i class=\"iconfont icon-huandengpian\"></i><span>图集</span></li>\r\n            <li class=\"fun\" data-fun=\"video\"><i class=\"iconfont icon-shipin\"></i><span>视频</span></li>\r\n            \r\n            <li class=\"fun\" data-fun=\"iframe\"><i class=\"iconfont icon-linkurl\"></i><span>嵌入</span></li>\r\n            <li class=\"fun\" data-fun=\"form\"><i class=\"iconfont icon-biaodan\"></i><span>表单</span></li>\r\n            <li class=\"fun\" data-fun=\"chart\"><i class=\"iconfont icon-tubiao\"></i><span>图表</span></li>\r\n            <li class=\"fun\" data-fun=\"turntable\"><i class=\"iconfont icon-dazhuanpan\"></i><span>转盘</span></li>\r\n            <li class=\"fun\" data-fun=\"vr\"><i class=\"iconfont icon-quanjing\"></i><span>全景</span></li>\r\n            <li class=\"fun\" data-fun=\"wipe\"><i class=\"iconfont icon-cachu\"></i><span>擦一擦</span></li>\r\n            <li class=\"fun\" data-fun=\"img3d\"><i class=\"iconfont icon-quanjing360\"></i><span>3D展示</span></li>\r\n            <li class=\"fun\" data-fun=\"article\"><i class=\"iconfont icon-wenzhang\"></i><span>文章</span></li>\r\n            <li class=\"fun\" data-fun=\"goods\"><i class=\"iconfont icon-shangpin-copy\"></i><span>商品</span></li> -->\r\n            </ul>\r\n            <!-- <h4>弹窗模块</h4>\r\n        <ul class=\"clearfix\">\r\n            <li class=\"fun\"><i class=\"iconfont icon-fenxiang1\"></i><span>分享</span></li>\r\n        </ul>\r\n        <h4>浮动模块</h4>\r\n        <ul class=\"clearfix\">\r\n            <li class=\"fun\"><i class=\"iconfont icon-caidan\"></i><span>导航1</span></li>\r\n            <li class=\"fun\"><i class=\"iconfont icon-caidan\"></i><span>导航2</span></li>\r\n        </ul> -->\r\n        </div>\r\n    </div>\r\n\r\n    <!--设置layer-->\r\n    <div id=\"setLayerBox\" class=\"setlayer\">\r\n        <div class=\"setname\">当前选中：<span id=\"setLayerType\"> </span></div>\r\n        <div class=\"tabsbox\">\r\n            <div class=\"mt-tab mt-tab-style2\">\r\n                <div class=\"mt-tab-header\">\r\n                    <ul id=\"setLayerTabHead\">\r\n                        <li class=\"mt-tab-head mt-active\">样式</li>\r\n                        <li class=\"mt-tab-head\">动画</li>\r\n                        <li class=\"mt-tab-head\">交互</li>\r\n                    </ul>\r\n                </div>\r\n                <div class=\"mt-tab-body\">\r\n                    <!--设置样式-->\r\n                    <div id=\"setStyle\" class=\"mt-tab-box mt-active\">\r\n\r\n                    </div>\r\n                    <!--设置动画-->\r\n                    <div id=\"setAnimate\" class=\"mt-tab-box\">\r\n                        <div class=\"add-animate-btn\">\r\n                            <a id=\"animationAdd\" class=\"mt-btn-animate add-animation\"><i class=\"iconfont icon-jia\"></i> 添加动画</a>\r\n                            <a class=\"mt-btn-animate play-animation play-nowlayer-animation-do\"><i class=\"iconfont icon-bofang\"></i> 播放动画</a>\r\n                        </div>\r\n                        <div class=\"animation-list\">\r\n                            <div class=\"animate-title\">\r\n                                <span class=\"tname\">动画类型/名称</span>\r\n                                <span class=\"ttime\">时间</span>\r\n                                <span class=\"tdelay\">延迟</span>\r\n                                <span class=\"tcount\">次数</span>\r\n                                <span class=\"tfun\">缓动函数</span>\r\n                            </div>\r\n                            <ul id=\"animationList\" class=\"mt-uniqlist\"></ul>\r\n                        </div>\r\n                        <div class=\"mt-tab mt-tab-style1\">\r\n                            <div class=\"mt-tab-header\">\r\n                                <ul>\r\n                                    <li class=\"mt-tab-head mt-active\">进入动画</li>\r\n                                    <li class=\"mt-tab-head\">离开动画</li>\r\n                                    <li class=\"mt-tab-head\">强调动画</li>\r\n                                </ul>\r\n                            </div>\r\n                            <div class=\"mt-tab-body\" id=\"animatesList\">\r\n                                <div id=\"animationIn\" class=\"mt-tab-box mt-active\">1</div>\r\n                                <div id=\"animationOut\" class=\"mt-tab-box\">2</div>\r\n                                <div id=\"animationEm\" class=\"mt-tab-box\">3</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <!--设置交互-->\r\n                    <div id=\"setUe\" class=\"mt-tab-box\">\r\n                        <div class=\"setue-list\" id=\"setUeList\">\r\n                            <ul class=\"set-layer-ue clearfix\">\r\n                                <li class=\"fun\" data-fun=\"link\"><i class=\"iconfont icon-lianjie\"></i><span>超链接</span></li>\r\n                                <li class=\"fun\" data-fun=\"toPage\"><i class=\"iconfont icon-tiaozhuan\"></i><span>页面跳转</span></li>\r\n                                <li class=\"fun\" data-fun=\"tel\"><i class=\"iconfont icon-shoujidadianhua\"></i><span>打电话</span></li>\r\n                                <li class=\"fun\" data-fun=\"msg\"><i class=\"iconfont icon-duanxin\"></i><span>发短信</span></li>\r\n                                <li class=\"fun\" data-fun=\"hideShow\"><i class=\"iconfont icon-duanxin\"></i><span>隐显切换</span></li>\r\n                                <li class=\"fun\" data-fun=\"touch\"><i class=\"iconfont icon-zhiwen06\"></i><span>指纹</span></li>\r\n                                <li class=\"fun\" data-fun=\"shake\"><i class=\"iconfont icon-yaoyiyao\"></i><span>摇一摇</span></li>\r\n                            </ul>\r\n                        </div>\r\n                        <div class=\"setue-set setue-set-hide\" id=\"setUeSet\">\r\n                            <h3 class=\"setue-title\">交互名称：<span id=\"setUeSetName\"></span></h3>\r\n                            <a class=\"clear-setue\"><i class=\"iconfont icon-icodel\"></i> 清除事件</a>\r\n                            <a data-title=\"关闭面板\" class=\"close-setue\"><i class=\"iconfont icon-a3right\"></i></a>\r\n                            <div class=\"setue-set-box\" id=\"setUeSetBox\">\r\n                                loading\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- layer 组合 -->\r\n    <div id=\"setLayerGroupBox\" class=\"setlayer\">\r\n        <div class=\"setname\">当前选中：<span id=\"setLayerGroup\"> 多个图层</span></div>\r\n        <div class=\"tabsbox\">\r\n            <div class=\"mt-tab mt-tab-style2\">\r\n                <div class=\"mt-tab-header\">\r\n                    <ul id=\"setLayerGroupTabHead\">\r\n                        <li class=\"mt-tab-head mt-active\">组合设置</li>\r\n                    </ul>\r\n                </div>\r\n                <div class=\"mt-tab-body\">\r\n                    <!--设置参数-->\r\n                    <div id=\"setGroupSet\" class=\"mt-tab-box mt-active\">\r\n                        <ul>\r\n                            <li id=\"groupAlignLeft\"><i class=\"iconfont icon-duiqi\"></i> <span>左对齐</span></li>\r\n                            <li id=\"groupAlignRight\"><i class=\"iconfont icon-duiqi_youduiqi\"></i> <span>右对齐</span></li>\r\n                            <li id=\"groupAlignUpDown\"><i class=\"iconfont icon-duiqi_xiangxia\"></i> <span>上对齐</span></li>\r\n                            <li id=\"groupAlignDown\"><i class=\"iconfont icon-duiqi_xiangshang\"></i> <span>下对齐</span></li>\r\n                            <li id=\"groupAlignLeftRightCenter\"><i class=\"iconfont icon-duiqi_hengxiangjuzhong\"></i> <span>水平居中</span></li>\r\n                            <li id=\"groupAlignUpDownCenter\"><i class=\"iconfont icon-duiqi_juzhong\"></i> <span>垂直居中</span></li>\r\n                            <li id=\"groupAlignUpDownEven\"><i class=\"iconfont icon-meun\"></i> <span>垂直均分</span></li>\r\n                            <li id=\"groupAlignRightLeftEven\"><i class=\"iconfont icon-caidan1\"></i> <span>水平均分</span></li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!--设置page-->\r\n    <div id=\"setPageBox\" class=\"setlayer\">\r\n        <div class=\"setname\">当前选中：<span id=\"setPageName\"> </span></div>\r\n        <div class=\"tabsbox\">\r\n            <div class=\"mt-tab mt-tab-style2\">\r\n                <div class=\"mt-tab-header\">\r\n                    <ul>\r\n                        <li class=\"mt-tab-head mt-active\">样式</li>\r\n                    </ul>\r\n                </div>\r\n                <div class=\"mt-tab-body\">\r\n                    <!--设置页面样式-->\r\n                    <div id=\"setPageStyle\" class=\"mt-tab-box mt-active\">\r\n                        loading\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!--设置app-->\r\n    <div id=\"setAppBox\" class=\"setlayer\">\r\n        <div class=\"setname\">当前选中：<span class=\"a-setname\"> </span></div>\r\n        <div class=\"tabsbox\">\r\n            <div class=\"mt-tab mt-tab-style2\">\r\n                <div class=\"mt-tab-header\">\r\n                    <ul>\r\n                        <li class=\"mt-tab-head mt-active tab-appbasic\">基本设置</li>\r\n                        <li class=\"mt-tab-head tab-appmusic\">背景音乐</li>\r\n                        <li class=\"mt-tab-head tab-apploading\">加载动画</li>\r\n                    </ul>\r\n                </div>\r\n                <div class=\"mt-tab-body\">\r\n                    <div id=\"setAppBg\" class=\"mt-tab-box mt-active\">\r\n\r\n                    </div>\r\n                    <div id=\"setAppMp3\" class=\"mt-tab-box\">\r\n                        <audio style=\"display: none;\" src=\"\" id=\"appMp3Audio\"></audio>\r\n                        <h2 class=\"now-use\">\r\n                            <span class=\"label\">当前使用：</span>\r\n                            <div class=\"now-use-mp3 clearfix\">\r\n                                <span class=\"name\" id=\"nowappName\"></span>\r\n                                <span class=\"try\">试听</span>\r\n                                <span class=\"del\">删除</span>\r\n                            </div>\r\n                        </h2>\r\n                        <ul id=\"mp3list\"></ul>\r\n                        <div id=\"mp3pagelist\"></div>\r\n                    </div>\r\n                    <div id=\"setAppLoading\" class=\"mt-tab-box\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>";

/***/ }),
/* 517 */
/***/ (function(module, exports) {

module.exports = "<div class=\"source\" id=\"source\">\r\n    <div class=\"source-header\">\r\n        <h1>图片库 <em>（图片来源网络，如有侵权请及时与管理员联系）</em></h1>\r\n        <a class=\"close-source\"><i class=\"iconfont icon-close\"></i></a>\r\n    </div>\r\n    <div class=\"source-body\">\r\n        <div class=\"source-menu\">\r\n            <ul id=\"sysOrMyImgs\">\r\n                <li data-type=\"my\" class=\"active\"><a href=\"#\">我的图库</a></li>\r\n                <li data-type=\"sys\"><a href=\"#\">系统图库</a></li>\r\n                <li><a id=\"uploadImg\" class=\"mt-btn-yellow mt-upload-btn\">图片上传</a></li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"source-content\">\r\n\r\n            <div data-type=\"sys\" class=\"sourceitem\">\r\n                <div class=\"source-type imgsys-type\">\r\n                    <ul id=\"imgSysTypesList\" class=\"clearfix\">\r\n                        <!-- <li class=\"more\"><a class=\"source-type-more\" href=\"javascript:;\">更多</a></li> -->\r\n                    </ul>\r\n                </div>\r\n                <div class=\"source-list imgsys-list\">\r\n                    <ul id=\"imgSysList\" class=\"clearfix\">\r\n                    </ul>\r\n                </div>\r\n                <div id=\"imgPagelist\" class=\"source-pagelist img-pagelist\">\r\n                </div>\r\n            </div>\r\n\r\n            <div data-type=\"my\" class=\"sourceitem show\">\r\n                <div class=\"source-list imgsys-list\">\r\n                    <ul data-type=\"my\" id=\"imgMyList\" class=\"clearfix show\">\r\n                    </ul>\r\n                </div>\r\n                <div id=\"imgUserPagelist\" class=\"source-pagelist img-pagelist\">\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),
/* 518 */
/***/ (function(module, exports) {

module.exports = "<div class=\"source\" id=\"exSvgSource\">\r\n    拓展资源库\r\n</div>\r\n<div class=\"source\" id=\"exMapSource\">\r\n    拓展资源库\r\n</div>";

/***/ }),
/* 519 */
/***/ (function(module, exports) {

module.exports = "<!--预览1-->\r\n<a id=\"appViewShowBtn\" mt-modal='#appViewShow'></a>\r\n<div class=\"mt-modal\" id=\"appViewShow\">\r\n    <div class=\"mt-modal-box\">\r\n        <a class=\"mt-modal-close\">\r\n           <i class=\"iconfont icon-close\"></i> \r\n        </a>\r\n        <div class=\"mt-modal-full\">\r\n            ....\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),
/* 520 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _layerFun = __webpack_require__(101);

var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

var _indexedDB = __webpack_require__(103);

var _localStorage = __webpack_require__(156);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 所有的 全局事件均用 -do 结尾

// 切换右侧面板的 tab
$(function () {
    $('.appset .appname').on('click', function (e) {
        (0, _layerFun.layerShow)('#setAppBox');
    });
});

// 选择音乐，loading, 背景快速入口
//控制编辑区域显示隐藏的方法
$(function () {
    $('.appset').on('click', '.bg', function () {
        (0, _layerFun.layerShow)('#setAppBox');
        $('.tab-appbasic').trigger('click'); //
    });

    $('.appset').on('click', '.music', function () {
        (0, _layerFun.layerShow)('#setAppBox');
        $('.tab-appmusic').trigger('click');
    });

    $('.appset').on('click', '.loading', function () {
        (0, _layerFun.layerShow)('#setAppBox');
        $('.tab-apploading').trigger('click');
    });

    $('.appset').on('click', '.helpinfo', function () {

        // 展开
        if ($('#temps').attr('data-status') !== 'show') {
            $('.flod-btn').trigger('click');
        }
        // 切换到主要区域
        $('.appset .bg').trigger('click');

        // 帮助
        $.helps({
            show: true,
            data: [{ dom: '.appset', content: '【整体设置】点击此处设置H5页面的整体内容：背景，主图，介绍, 背景音乐，加载效果等', pos: 'bottom' }, { dom: '#clearLocalSave', content: '【清除缓存】这里清除本地缓存', pos: 'bottom' }, { dom: '#appPublish', content: '【预览/发布】做好之后，发布应用点击这里发布应用或者预览应用，全部OK后生成二维码', pos: 'bottom' }, { dom: '.left', content: '【页面列表】此处主要展示页面的列表，也可以在【模板中心】中选择模板进行页面添加', pos: 'right' }, { dom: '.a-tpls', content: '【模板中心】所有页面模板都在这里了，你可以选择系统提供的模板，也可以选择自己保存的模板', pos: 'right' }, { dom: '#fastMenu', content: '【图层】页面里面所有的元素叫做图层，你可以在这里选择需要创建的图层，也可以点击“。。。”展开图层，选择更多图层', pos: 'left' }, { dom: '#setAppBox', content: '【设置区域】只需要记住，页面，图层，动画，交互等任何设置相关的操作都在这里进行就可以了。顶部会显示：当前选中的对象', pos: 'left' }, { dom: '.phonebox', content: '【可视化区域】页面的可视化界面，所见即所得', pos: 'left' }, { dom: '.layerlist', content: '【图层列表】可以展开图层列表，这里有图层相关的一些操作！', pos: 'bottom' }, { dom: '.fastbtns', content: '【快捷操作】这里有一些快捷操作的方法 <br/>【ctrl+s 保存预览APP】<br/>【ctrl+z 撤销】<br/>【ctrl+y 恢复】<br/>【ctrl+ - 缩小画布】<br/>【ctrl+ + 放大画布】<br/>【ctrl+ p 播放动画】<br/>【ctrl+ k 元素可见】<br/>【ctrl+ h 显示网格】<br/>【ctrl + d 删除】<br/>【上，下，左，右 微调距离】<br/>【shift + 上，下，左，右 大幅度调距离】', pos: 'left' }]
        });
    });
});

$(function () {
    // 清除缓存
    $('#clearLocalSave').on('click', function () {
        (0, _localStorage.clearStorage)();
        (0, _indexedDB.deleteDB)('H5DS');
        // $.tip({
        //     msg: '清除本地缓存成功！',
        //     callback: function() {
        //         window.location.reload();
        //     }
        // })
        window.location.reload();
    });
});

// 播放页面动画
$(function () {

    // 播放动画
    _global2.default.$doc.on('click', '.play-animation-do', function (e) {
        var $phoneApp = $('#phoneApp');
        $phoneApp.removeClass('element-show').find('.element').each(function (elem, index) {
            $(this).css('animation-play-state', 'running');
        });
        $phoneApp.hide(0).show(0);
    });

    // 关闭动画
    // g.$doc.on('click', '.close-animation-do', function(e) {
    //     let $phoneApp = $('#phoneApp');
    //     $phoneApp.addClass('animation-disabled').find('.element').each(function(elem, index) {
    //         $(this).css('animation-play-state', 'paused');
    //     });
    //     $phoneApp.hide(0).show(0);
    // });

    // 播放当前对象的动画
    _global2.default.$doc.on('click', '.play-nowlayer-animation-do', function (e) {
        $('#phoneApp').removeClass('animation-disabled');
        AppData.edit.layerDom.find('.element').css('animation-play-state', 'running').hide(0).show(0);
    });

    // 显示网格
    // g.$doc.on('click', '.show-grid-do', function(e) {
    //     let $grid = $('#phoneApp').find('.gridbox');
    //     if($grid.is(':hidden')) {
    //        $grid.show(); 
    //     }
    // });
});

/***/ }),
/* 521 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
    _global2.default.$doc.on('click', '.close-source', function (e) {
        $(this).closest('.source').hide();
    });

    _global2.default.$doc.on('click', '.a-selectimg', function (e) {
        $('#source').show();
    });
});

// 切换我的图库和系统图库
//控制source面板的显示隐藏

$(function () {
    var $sysOrMyImgs = $('#sysOrMyImgs');
    var $source = $('#source');
    $sysOrMyImgs.on('click', '[data-type]', function () {
        var mark = $(this).attr('data-type');
        $(this).addClass('active').siblings('[data-type]').removeClass('active');
        $source.find('.sourceitem[data-type="' + mark + '"]').addClass('show').siblings('[data-type]').removeClass('show');
    });
});

// 选择图片，然后换图
$(function () {
    $('.source-list').on('click', 'img', function (e) {
        // 如果设置APP的面板打开
        if (!$('#setAppBox').is(':hidden')) {
            $('#setAppBox').find('.set_img_crop').trigger('selectImg.app', $(this).attr('src'));
        }
        // page 设置
        if (!$('#setPageBox').is(':hidden')) {
            $('#setPageBox').find('.set_img_crop').trigger('selectImg.' + AppData.edit.pageType, $(this).attr('src'));
        }
        // layer 设置
        if (!$('#setLayerBox').is(':hidden')) {
            console.log('xxx' + AppData.edit.pageType);
            $('#setLayerBox').find('.set_img_crop').trigger('selectImg.layer', $(this).attr('src'));
        }
        // 关闭弹窗
        $('.close-source').trigger('click');
    });
});

/***/ }),
/* 522 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 从数组中移除 obj 这里的 obj 是同样的引用地址
Array.prototype.remove = function (obj) {
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp === obj) {
            for (var j = i; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
};

// 判断是否是二进制
String.prototype.isBlob = function () {
    if (!this) {
        return false;
    }
    if (this.indexOf('blob:http') !== -1) {
        return true;
    } else {
        return false;
    }
};

// 获取blob id
String.prototype.blobId = function () {
    if (this.isBlob()) {
        return this.split('#')[1];
    } else {
        return null;
    }
};

/***/ }),
/* 523 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 数据过滤
function filterVal($this, val) {
    var filter = $this.attr('mt-filter');
    var fixed = $this.attr('mt-fixed') || 0;
    if (filter !== undefined) {
        if (filter.indexOf('/') !== -1) {
            val = val / filter.split('/')[1];
        }
        if (filter.indexOf('+') !== -1) {
            val = val + --filter.split('+')[1];
        }
        if (filter.indexOf('-') !== -1) {
            val = val - filter.split('-')[1];
        }
        if (filter.indexOf('*') !== -1) {
            val = val * filter.split('*')[1];
        }
    }
    if (parseFloat(val) < 1 && fixed === 0) {
        fixed = 1;
    }
    return val === 0 ? 0 : parseFloat(val).toFixed(fixed);
}

// 数据联动
/**
*	简单的数据联动绑定，针对 slider的
*	mt-bind="id" 数据将联动到 对应的ID上去
*	mt-filter="*360" 表示 当前的值 val * 360 为绑定的值
*	mt-fixed="2" 表示保留小数点
*/
_global2.default.$doc.on('change input', '[mt-bind]', function (e, val) {

    var id = $(this).attr('mt-bind');
    var $bind = $('#' + id);
    var type = $bind.attr('mt-type') || '';
    if (val) {
        // 如果是slider ，或者是其他自定义表单返回的值。
        val = filterVal($(this), val);
        $bind.val(val + type);
    } else {
        // 如果是表单，input 等返回的值
        val = $(this).val();
        // console.log(val);
        val = filterVal($(this), val);
        $bind.attr('data-val', val > 1 ? 1 : val);
        //设置slider
        // console.log(val);
        setSilderVal($bind);
    }
});

/***/ }),
/* 524 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('change', '[mt-type]', function (e) {

    // 设置单位
    var danwei = $(this).attr('mt-type');
    var val = $(this).val();
    var reg = /(^[-+]?\d+(\.\d+)?$)/;
    if (reg.test(val)) {
        val = val.replace(reg, '$1');
    } else {
        val = parseInt(val, 10) || 0;
    }

    // 设置范围
    var min = $(this).attr('mt-min') || null;
    var max = $(this).attr('mt-max') || null;
    if (min !== null && parseInt(val, 10) < parseInt(min, 10)) {
        val = min;
    }
    if (max !== null && parseInt(val, 10) > parseInt(max, 10)) {
        val = max;
    }

    val += danwei;

    $(this).val(val).trigger('changes', val);
}); /**
    *	设置input 单位， 设置 min max 后，需要通过 changs 拿到val
    */

/***/ }),
/* 525 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};

//减法函数，用来得到精确的减法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
//调用：accSub(arg1,arg2)
//返回值：arg1减去arg2的精确结果
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.sub = function (arg) {
    return accSub(this, arg);
};

/***/ }),
/* 526 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @desc 选择框
 */
$(document).on('click', '.mt-checkbox-item', function () {
    var $this = $(this);
    var $group = $this.closest('.mt-checkbox-group');
    $this.addClass('mt-checkbox-active').siblings('.mt-checkbox-item').removeClass('mt-checkbox-active');
    $group.trigger('changes', {
        val: $this.attr('data-val'),
        text: $this.html()
    });
});

/***/ }),
/* 527 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @desc 帮助提示
 * data 传入一个 数组 [ {dom: '#id1', content: '内容...'} ]
*/
$.helps = function (setting) {
    var defaults = {
        data: [] // 提示列队
    };
    var set = $.extend(defaults, setting);

    // 如果没有，就初始化一个
    if (!$('.mt-helps')[0]) {
        $('body').append('\n        <div class="mt-helps">\n            <div class="mt-helps-content">\n                <a class="mt-helps-close"><i class="iconfont icon-close"></i></a>\n                <div class="mt-helps-info"></div>\n                <div class="mt-helps-btns">\n                    <a class="mt-helps-prev">\u4E0A\u4E00\u6B65</a>\n                    <a class="mt-helps-next">\u4E0B\u4E00\u6B65</a>\n                    <a class="mt-helps-end">\u5B8C\u6210</a>\n                </div>\n            </div>\n        </div>\n        ');
    }

    var $help = $('.mt-helps');
    var $content = $help.find('.mt-helps-content');

    // 显示DOM
    var showDom = function showDom(index) {
        if (index === 0) {
            $('.mt-helps-prev').hide();
            $('.mt-helps-next').show();
            $('.mt-helps-end').hide();
        } else if (index === set.data.length - 1) {
            $('.mt-helps-next').hide();
            $('.mt-helps-end').show();
            $('.mt-helps-prev').show();
        } else {
            $('.mt-helps-end').hide();
            $('.mt-helps-next').show();
            $('.mt-helps-prev').show();
        }
        var obj = set.data[index];
        var $target = $(obj.dom);
        var size = {
            width: $target.outerWidth(),
            height: $target.outerHeight(),
            left: $target.offset().left,
            top: $target.offset().top
        };
        $help.css(size);
        var cls = '';
        $content.removeClass().addClass('mt-helps-content mt-helps-' + obj.pos);
        $help.find('.mt-helps-info').html(obj ? obj.content : '');
    };

    // 默认显示第一个
    var activeIndex = 0;
    showDom(activeIndex);
    if (set.data.length === 1) {
        $('.mt-helps-next').hide();
        $('.mt-helps-end').show();
    }

    // 事件绑定
    $help.on('click', '.mt-helps-next', function () {
        activeIndex++;
        if (activeIndex < set.data.length) {
            showDom(activeIndex);
        }
    });

    $help.on('click', '.mt-helps-prev', function () {
        activeIndex--;
        if (activeIndex >= 0) {
            showDom(activeIndex);
        }
    });

    $help.on('click', '.mt-helps-close, .mt-helps-end', function () {
        $help.off('click');
        $help.remove();
    });
};

/***/ }),
/* 528 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @desc 鼠标右键触发的弹窗, 这种右键菜单，只能同时出现一个， 这个方法只会在页面上初始化个contextMenu
*/
$.contextMenu = function (setting) {
    var defaults = {
        x: 0, // 必须是个数
        y: 0,
        vals: [], // { name: xx, val: xxx }
        callback: null // 点击后的回调函数，返回 obj
    };
    var set = $.extend(defaults, setting);
    if (!$('.mt-contextmenu')[0]) {
        var tpl = '<div class="mt-contextmenu" style="left: ' + set.x + 'px; top: ' + set.y + 'px;">\n            <ul>\n                ' + set.vals.map(function (elem) {
            return '<li class="mt-contextmenu-item" data-val="' + elem.val + '">' + elem.name + '</li>';
        }).join('') + '\n            </ul>\n        </div>';
        $('body').append(tpl);
    }

    // 设置
    var $box = $('.mt-contextmenu');
    var size = {
        height: $box.height(),
        width: $box.width(),
        win_width: $(window).width(),
        win_height: $(window).height(),
        new_x: set.x,
        new_y: set.y
    };
    // x 超出window
    if (set.x + size.width > size.win_width) {
        size.new_x = size.win_width - size.width - 10;
    }
    // y 超出 window
    if (set.y + size.height > size.win_height) {
        size.new_y = size.win_height - size.height - 10;
    }
    $box.css({
        left: size.new_x,
        top: size.new_y
    });

    // 事件绑定
    $(document).off('click.contextmenu').on('click.contextmenu', function (e) {
        var $context = $(e.target).closest('.mt-contextmenu-item');
        if ($context[0] && set.callback) {
            set.callback($context.attr('data-val'), $context);
        }
        $('.mt-contextmenu').remove();
    });
};

/***/ }),
/* 529 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(59);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$.escape = function (obj) {
    var str = '';
    try {
        str = escape((0, _stringify2.default)(obj));
    } catch (e) {
        str = false;
    }
    return str;
};

/***/ }),
/* 530 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.getUrlData = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    var data = null;
    if (r != null) {
        data = unescape(r[2]);
    }
    return data;
};

/***/ }),
/* 531 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @desc loading 设置
 */
$.fn.loading = function (setting) {
    var defaults = {
        tip: 'loading',
        center: true,
        window: false
    };
    var set = $.extend(defaults, setting);
    var $this = $(this);
    if (!set.center) {
        $this.html('<div class="mt-loading">' + set.tip + '</div>');
    } else {
        $this.html('<div class="mt-loading mt-loading-center">' + set.tip + '</div>');
    }
};

$.loading = function (setting) {
    var defaults = {
        tip: 'loading...'
    };
    var set = $.extend(defaults, setting);
    var id = 'mt_loading_' + +new Date();
    $('body').append('<div class="mt-loading-window" id="' + id + '" >\n        <div class="mt-loading-center">' + set.tip + '</div>\n    </div>');

    this.close = function () {
        $('#' + id).remove();
    };

    return this;
};

/***/ }),
/* 532 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//自定义模版引擎
$.tpl = function (tpl, data, fixed) {
    var tpl2 = tpl;
    for (var key in data) {
        var reg = new RegExp("{{" + key + "}}", "gm");
        tpl2 = tpl2.replace(reg, data[key]);
    }

    return tpl2;
};

/***/ }),
/* 533 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//设置样式

// 将原来的style转换成 object
function styleToObject(style) {
    if (!style) {
        return {};
    }
    var oldArr = style.split(';');
    style = {};
    for (var i = 0; i < oldArr.length; i++) {
        var keys = oldArr[i].split(':');
        keys[0] = keys[0].trim();
        // animation-play-state 是后面控制动画设置上去的
        if (keys[0] !== 'animation-play-state' && keys[0] !== '') {
            style[keys[0]] = keys[1];
        }
    }
    return style;
}

// style 设置给 $dom  estyle 设置 给 $dom.find('.element')
$.fn.addStyle = function (obj) {

    // 将原来的style转换成 object
    var oldStyle = styleToObject($(this).attr('style'));
    var oldEStyle = styleToObject($(this).find('.element').attr('style'));
    // 新添加的style
    var style = obj.style;
    var estyle = obj.estyle;
    var animate = obj.animate;

    // 设置dom 样式
    if (style) {
        // 设置 dom
        for (var key in style) {
            if (style[key]) {
                if (key == 'background-image') {
                    // 如果是裁剪的图片还没有上传到服务器，用#控制分割的
                    if (style[key].indexOf('#') !== -1) {
                        oldStyle[key] = 'url(' + style[key].split('#')[0] + ')';
                    } else {
                        oldStyle[key] = 'url(' + style[key] + ')';
                    }
                } else {
                    oldStyle[key] = style[key];
                }
            }
        }
    }

    // 设置 element 样式
    for (var _key in estyle) {
        if (estyle[_key]) {
            if (_key == 'background-image') {
                // 如果是裁剪的图片还没有上传到服务器，用#控制分割的
                if (style[_key].indexOf('#') !== -1) {
                    oldEStyle[_key] = 'url(' + estyle[_key].split('#')[0] + ')';
                } else {
                    oldEStyle[_key] = 'url(' + estyle[_key] + ')';
                }
            } else {
                if (_key !== '') {
                    oldEStyle[_key] = estyle[_key];
                }
            }
        }
    }

    // 设置动画 
    if (animate && animate.length > 0) {
        var arr = [];
        for (var i = 0; i < animate.length; i++) {
            arr.push(animate[i].style);
        }
        oldEStyle['animation'] = arr.join(',');
    } else {
        if (oldEStyle['animation']) {
            delete oldEStyle.animation;
        }
    }

    $(this).attr('style', '').css(oldStyle);
    $(this).find('.element').attr('style', '').css(oldEStyle);
};

/***/ }),
/* 534 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//设置样式
// style 设置给 $dom  estyle 设置 给 $dom.find('.element')
$.fn.setStyle = function (obj) {

    if (!obj) {
        console.warn('obj不存在', obj);
        return;
    }

    var style = obj.style;
    var estyle = obj.estyle;
    var animate = obj.animate;

    // 设置dom 样式
    if (style) {
        // 设置 dom
        var _obj = {};
        for (var key in style) {
            if (style[key]) {
                if (key == 'background-image') {
                    // 如果是裁剪的图片还没有上传到服务器，用#控制分割的
                    if (style[key].indexOf('#') !== -1) {
                        _obj[key] = 'url(' + style[key].split('#')[0] + ')';
                    } else {
                        _obj[key] = 'url(' + style[key] + ')';
                    }
                } else {
                    _obj[key] = style[key];
                }
            }
        }
        $(this).attr('style', '').css(_obj);
    }

    // 如果 estyle 有才设置
    if (estyle) {
        // 设置 element 样式
        var elementObj = {};
        var $element = $(this).find('.element');
        for (var _key in estyle) {
            if (estyle[_key]) {
                if (_key == 'background-image') {
                    // 如果是裁剪的图片还没有上传到服务器，用#控制分割的
                    if (style[_key].indexOf('#') !== -1) {
                        elementObj[_key] = 'url(' + estyle[_key].split('#')[0] + ')';
                    } else {
                        elementObj[_key] = 'url(' + estyle[_key] + ')';
                    }
                } else {
                    elementObj[_key] = estyle[_key];
                }
            }
        }

        // 设置动画 
        if (animate && animate.length > 0) {
            var arr = [];
            for (var i = 0; i < animate.length; i++) {
                arr.push(animate[i].style);
            }
            elementObj['animation'] = arr.join(',');
        }

        $element.attr('style', '').css(elementObj);
    }

    return this;
};

/***/ }),
/* 535 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*RGBA颜色转换为16进制*/
String.prototype.colorHex = function () {
    if (!this) {
        return 'initial';
    }
    if (this.indexOf('#') !== -1) {
        return this;
    }
    var aColor = this.replace(/(rgba\()(\d+,\d+,\d+),(((1|0)?\.)?\d+)\)/g, "$2").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
        var hex = Number(aColor[i]).toString(16);
        if (hex === "0") {
            hex += hex;
        }
        strHex += hex;
    }
    if (strHex.length !== 7) {
        strHex = this;
    }
    return strHex;
};

//rgba 获取透明度
//颜色选择
String.prototype.colorOpacity = function () {
    if (!this) {
        return 1;
    }
    if (this.indexOf('rgba') === -1) {
        return 1;
    }
    return this.replace(/rgba\(\d+,\d+,\d+,(((0|1)?\.)?\d+)\)/g, '$1');
};

/* 16进制颜色转为RGBA格式 dot 表示透明度， 如果传入 mark = true, 返回一个颜色数组 */
String.prototype.colorRgba = function (dot, mark) {

    var sColor = this.toLowerCase();
    var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值  
        var sColorChange = [];
        for (var _i = 1; _i < 7; _i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2), 16));
        }

        if (mark) {
            return sColorChange;
        }
        return "rgba(" + sColorChange.join(",") + "," + dot + ")";
    } else {
        return sColor;
    }
};

//清理颜色
_global2.default.$doc.on('click.color', '.mt-color-clear', function (e) {
    e.stopPropagation();
    var $color = $(this).closest('.mt-color').find('input[type=color]');
    var $slider = $(this).closest('.mt-color').find('.mt-slider-bar');
    $color.val('initial');
    $slider.attr('data-val', 1);
    $slider.find('.mt-slider-active').width('100%');
    $(this).closest('.mt-color').trigger('change', 'initial');
});

//颜色操作监听
_global2.default.$doc.on('change', '.mt-color input[type="color"]', function (e) {
    e.stopPropagation();
    var val = $(this).val();
    var dot = $(this).closest('.mt-color').find('.mt-slider-bar').attr('data-val') || 1;
    $(this).closest('.mt-color').trigger('change', val.colorRgba(dot));
});

//滑动条监听
_global2.default.$doc.on('change', '.mt-color .mt-slider-bar', function (e) {
    e.stopPropagation();
    var $color = $(this).closest('.mt-color').find('input[type="color"]');
    var dot = $(this).attr('data-val') || 1;
    var val = $color.val();
    $(this).closest('.mt-color').trigger('change', val.colorRgba(dot));
});

/***/ }),
/* 536 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.$doc.on('click.selectone', '.mt-selectone', function (e) {
	var $option = $(e.target).closest('.option');

	// 如果点击的是是其他区域
	if (!$option[0]) {
		return;
	}

	var val = $option.attr('data-val');
	$(this).attr('data-val', val).trigger('change', val);
	$option.addClass('mt-selected').siblings('.option').removeClass('mt-selected');
});

function initSelectOne() {
	$('.mt-selectone').each(function (index, el) {
		var val = $(this).attr('data-val');
		$(this).find('.option[data-val="' + val + '"]').addClass('mt-selected');
	});
};

window.initSelectOne = initSelectOne;

initSelectOne();

/***/ }),
/* 537 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass2 = __webpack_require__(63);

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = __webpack_require__(64);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _appsetTpl = __webpack_require__(538);

var _imgTpl = __webpack_require__(162);

var _bgTpl = __webpack_require__(499);

var _bgColorTpl = __webpack_require__(187);

var _pageListTpl = __webpack_require__(539);

var _appSliderAnimateTpl = __webpack_require__(540);

var _appSliderTypeTpl = __webpack_require__(500);

var _pageFun = __webpack_require__(541);

var _layerFun = __webpack_require__(101);

var _layerSwitch = __webpack_require__(188);

var _global = __webpack_require__(6);

var _global2 = _interopRequireDefault(_global);

var _AppDataFun = __webpack_require__(10);

var _saveApp = __webpack_require__(292);

var _page = __webpack_require__(542);

var _page2 = _interopRequireDefault(_page);

var _popup = __webpack_require__(544);

var _popup2 = _interopRequireDefault(_popup);

var _fixed = __webpack_require__(545);

var _fixed2 = _interopRequireDefault(_fixed);

var _animate = __webpack_require__(546);

var _animate2 = _interopRequireDefault(_animate);

var _appFun = __webpack_require__(503);

var _appFunLayerGroup = __webpack_require__(505);

var _loading = __webpack_require__(226);

var _app2 = __webpack_require__(549);

var _app3 = _interopRequireDefault(_app2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 新建空白的APP
// layer 组的操作

//控制编辑区域显示隐藏的方法
//设置翻页模式，锁定，自动
//page 列表模版
//背景模版
//app设置模版
var AppNew = function AppNew(name, info, img, mp3, loading, slider, style, pages) {
    (0, _classCallCheck3.default)(this, AppNew);

    this.name = name || '新建APP';
    this.info = info || 'H5DS 太酷炫了';
    this.img = img || _app3.default;
    this.mp3 = mp3 || { name: '', url: '' };
    this.loading = loading || 0;
    this.slider = slider || 0;
    this.style = style || '';
    this.pages = pages || []; // 页面
    this.popups = popups || []; // 弹窗
    this.fixeds = fixeds || []; // 浮动层
};

// app 方法类
// 加载图标

// 画布的快捷操作
//选择翻页动画
//背景色模版
//图片模版


var App = function () {
    function App(res) {
        (0, _classCallCheck3.default)(this, App);

        this.app = res;
        this.className = 'app';
    }

    // 设置左侧页面列表， 内部调用


    (0, _createClass3.default)(App, [{
        key: 'setPageList',
        value: function setPageList() {
            var tpls = '';
            var pages = this.app[AppData.edit.pageType];
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                tpls += (0, _pageListTpl.pageListTpl)(page, 'page');
            }
            (0, _AppDataFun.getPageListDom)().html(tpls);
        }

        //设置左侧页面列表

    }, {
        key: 'setPagePage',
        value: function setPagePage() {
            var tpls = '';
            var pages = this.app.pages;
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                tpls += (0, _pageListTpl.pageListTpl)(page, 'page');
            }
            $('#pagesList').html(tpls);
        }

        //设置左侧弹窗列表

    }, {
        key: 'setPagePopup',
        value: function setPagePopup() {
            var tpls = '';
            var popups = this.app.popups;
            for (var i = 0; i < popups.length; i++) {
                var popup = popups[i];
                tpls += (0, _pageListTpl.pageListTpl)(popup, 'popup');
            }
            $('#popupsList').html(tpls);
        }

        //设置左侧浮动元素列表

    }, {
        key: 'setPageFlex',
        value: function setPageFlex() {
            // ...
            var tpls = '';
            var fixeds = this.app.fixeds;
            for (var i = 0; i < fixeds.length; i++) {
                var fixed = fixeds[i];
                tpls += (0, _pageListTpl.pageListTpl)(fixed, 'fixed');
            }
            $('#fixedsList').html(tpls);
        }

        // 释放组合的选择

    }, {
        key: 'destoryGroup',
        value: function destoryGroup() {
            AppData.edit.group = false;
            _global2.default.$doc.off('mousedown.group');
            _global2.default.$doc.off('contextmenu.group');
        }

        // 初始化loading

    }, {
        key: 'initLoad',
        value: function initLoad() {
            $('#setAppLoading').html((0, _loading.loadHTML)(this));
        }

        //初始化MP3

    }, {
        key: 'initMp3',
        value: function initMp3() {
            // 设置mp3
            var self = this;
            var mp3 = this.app.mp3;
            $('#nowappName').html('<span class="mp3-play-icon"><i></i><i></i><i></i><i></i></span> ' + (mp3.name || '')).attr('data-url', mp3.url || '');

            // 选择使用mp3
            $('#mp3list').on('click', '.use', function (e) {
                var $item = $(this).closest('.item');
                var url = $item.attr('data-url');
                var name = $item.find('.name').text();
                self.app.mp3 = {
                    name: name,
                    url: url
                };
                $('#nowappName').html('<span class="mp3-play-icon"><i></i><i></i><i></i><i></i></span> ' + (name || '')).attr('data-url', url || '');

                // 暂停播放
                $('.mp3-play-iconing').removeClass('mp3-play-iconing');
                if (url) {
                    $('#appMp3Audio')[0].pause();
                }

                (0, _AppDataFun.AppDataChange)();
            });

            // 清除背景音乐
            $('.now-use-mp3').on('click', '.del', function () {
                $('#nowappName').html('').attr('data-url', '');
                self.app.mp3 = {
                    name: '',
                    url: ''
                };
            });

            // 试听 选中的
            $('.now-use-mp3').on('click', '.try', function () {
                var $parent = $(this).parent();
                var url = $parent.find('.name').attr('data-url');
                $('.mp3-play-iconing').removeClass('mp3-play-iconing');
                $parent.find('.mp3-play-icon').addClass('mp3-play-iconing');
                if (url) {
                    $('#appMp3Audio').attr('src', url)[0].play();
                }
            });

            // 试听
            $('#mp3list').on('click', '.try', function () {
                var $parent = $(this).parent();
                var url = $parent.attr('data-url');
                $('.mp3-play-iconing').removeClass('mp3-play-iconing');
                $parent.find('.mp3-play-icon').addClass('mp3-play-iconing');
                if (url) {
                    $('#appMp3Audio').attr('src', url)[0].play();
                }
            });

            // 暂停
            $('#setAppMp3').on('click', '.mp3-play-iconing', function () {
                $(this).removeClass('mp3-play-iconing');
                $('#appMp3Audio')[0].pause();
            });
        }

        //设置操作区

    }, {
        key: 'initSet',
        value: function initSet() {
            var _app = this.app,
                style = _app.style,
                name = _app.name,
                info = _app.info,
                img = _app.img,
                slider = _app.slider;

            var bcolor = style['background-color'];
            var $setAppBg = $('#setAppBg');

            //app设置区域显示
            (0, _layerFun.layerShow)('#setAppBox');

            // //模版赋值，tpl,data
            var appsetTpls = (0, _appsetTpl.appsetTpl)({
                name: name,
                info: info,
                img: img
            });
            var imgTpls = (0, _imgTpl.imgTpl)({
                src: style['background-image'],
                id: 'cropimg',
                cropdom: 'appCropDom'
            });
            var bgTpls = (0, _bgTpl.bgTpl)({
                repeat: style['background-repeat'],
                size: style['background-size'],
                repeatId: 'appRepeat',
                sizeId: 'appSize'
            });
            var bgColorTpls = (0, _bgColorTpl.bgColorTpl)({
                color: bcolor ? bcolor.colorHex() : 'initial',
                opacity: bcolor ? bcolor.colorOpacity() : 1,
                colorId: 'appbgColor'
            });

            // 翻页动画选择
            var appSliderAnimateTpls = (0, _appSliderAnimateTpl.appSliderAnimateTpl)({
                playtype: slider['animate']
            });

            // 翻页模式
            // let appSliderTypeTpls = appSliderTypeTpl({
            //     lock: slider['lock'],
            //     autoplay: slider['autoplay'],
            //     time: slider['time']
            // })

            // 设置HTML
            $setAppBg.empty().html(appsetTpls + '<div class="tr">\u9875\u9762\u80CC\u666F\uFF1A</div>' + imgTpls + bgTpls + bgColorTpls + ('<div class="set-slider">' + appSliderAnimateTpls + '</div>'));
            // 设置app名字
            $('.a-setname').html(name);
        }

        // 事件

    }, {
        key: 'eventFun',
        value: function eventFun() {
            var self = this;
            var $pagesList = $('#pagesList, #popupsList, #fixedsList');

            // loading 选择
            $('#setAppLoading').on('click', '.loader', function (e) {
                self.app.loading = $(this).index();
                $(this).addClass('active').siblings('.loader').removeClass('active');
            });

            // pagelist事件, 拖动排序，选择页面
            (0, _pageListTpl.initPageListEvent)(this);

            // app 翻页动画
            (0, _appSliderAnimateTpl.initAppSliderAnimate)(this);

            // app 翻页模式
            (0, _appSliderTypeTpl.initAppSliderType)(this);

            // 点击空白，销毁layer控制器
            _global2.default.$doc.off('mousedown.destoryControl').on('mousedown.destoryControl', function (e) {
                if (!$(e.target).closest('.layer')[0] && $(e.target).closest('#phone')[0]) {
                    (0, _pageListTpl.destoryControl)();
                    // 然后默认选择page
                    (0, _AppDataFun.getPageListDom)().find('.active').trigger('click');

                    // 点击空白，重新释放 组的选择
                    self.destoryGroup();
                }
            });

            // 组合图层的相关操作
            (0, _appFunLayerGroup.groupLayers)();

            // 删除page
            $pagesList.off('click.delpage').on('click.delpage', '.del-page', function (e) {
                e.stopPropagation();
                var $item = $(this).closest('.page-item');
                var index = $item.index();
                self.delPage(index);
            });

            // 新增page
            // $pagesList.off('click.addpage').on('click.addpage', '.add-page', function (e) {
            //     e.stopPropagation();
            //     let $item = $(this).closest('.page-item');
            //     let index = $item.index();
            //     self.addPage(index);
            // });

            // 修改页面名字
            $pagesList.off('click.editpage').on('click.editpage', '.edit-page', function (e) {
                e.stopPropagation();
                var $item = $(this).closest('.page-item');
                var index = $item.index();
                var page = self.app[AppData.edit.pageType][index];
                // self.delPage(index);
                $.confirms({
                    title: '修改页面名字',
                    content: '\n                <input id="editPageInputId" class="edit-page-input" value="' + (page.id || '') + '" type="text" placeholder="\u9875\u9762ID"/>\n                <input id="editPageInput" class="edit-page-input" value="' + (page.name || '') + '" type="text" placeholder="\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0"/>\n                <textarea id="editPageInputDesc" class="edit-page-input" value="' + (page.desc || '') + '" placeholder="\u8BF7\u8F93\u5165\u9875\u9762\u63CF\u8FF0"></textarea>',
                    callback: function callback(mark) {
                        if (mark) {
                            var name = $('#editPageInput').val();
                            var id = $('#editPageInputId').val();
                            if (id && !/^[_a-zA-Z][_a-zA-Z0-9]+/.test(id)) {
                                $.tip({
                                    msg: 'id必须是字母或者下划线开头，且必须由字母，数字，或者下划线组成！', //
                                    type: 'danger', //success,danger,warning
                                    time: 5000 //
                                });
                                return;
                            }
                            page.desc = $('#editPageInputDesc').val();
                            page.name = name;
                            page.id = id;
                            $item.find('.page-content').html('\n                        <span class="page-name">' + name + '</span>\n                        ' + (!id ? '' : '<span class="page-id">ID: ' + id + '</span>') + '\n                        ');
                            $('#setPageName').html(name);
                            (0, _AppDataFun.AppDataChange)();
                        }
                    }
                }).show();
            });

            // 复制页面;
            $pagesList.off('click.copypage').on('click.copypage', '.copy-page', function (e) {
                e.stopPropagation();
                var $item = $(this).closest('.page-item');
                var index = $item.index();
                self.copyPage(index);
            });

            // 选择页面类型，切换，弹窗，浮动，页面
            $('#leftPagesList').on('changes', function (e, obj) {
                // 切换后，pageIndex 设置为 null,默认不选中，然后触发选中效果
                AppData.edit.pageIndex = null;
                AppData.edit.pageType = obj.dom.attr('data-name');

                // 如果是弹窗层，弹窗层显示
                if (AppData.edit.pageType === 'popups') {
                    $('#pageViewPopup').show();
                } else {
                    $('#pageViewPopup').hide();
                }

                // 如果是浮动层，全屏，就不能触发底层事件了
                if (AppData.edit.pageType === 'fixeds') {
                    $('.pageViewFixed').eq(0).addClass('page-viewup-full');
                    $('#pageView').css({
                        'pointer-events': 'none'
                    });
                } else {
                    $('.pageViewFixed').removeClass('page-viewup-full');
                    $('#pageView').css({
                        'pointer-events': 'initial'
                    });
                }

                // 切换后，设置默认选中
                var $active = (0, _AppDataFun.getPageListDom)().find('.active');
                if ($active[0]) {
                    $active.trigger('click');
                } else {
                    (0, _AppDataFun.getPageListDom)().find('.page-item').eq(0).trigger('click');
                }
            });
        }

        //初始化页面方法

    }, {
        key: 'initSetEvent',
        value: function initSetEvent() {
            var self = this;
            var $setAppBg = $('#setAppBg');

            // 图片剪切, 如果初始化图片没有，就不实例化图片剪切
            // 初始化图片剪切
            var $crop = (0, _imgTpl.initCrop)(this, $('#setAppBg').find('.set_img_crop'), { delBtn: true }, function (type, val) {
                // 剪切后，this.style 发生变化，重新渲染可视区域，  delete 里面做了处理了
                if (type === 'select') {
                    self.app.style['background-image'] = val;
                    $('#phoneApp').css('background-image', 'url(' + val + ')');
                }
                self.renderPhone();
            });

            // 初始化方法 slider
            initSlider();

            // 下拉
            initSelectOne();

            // 设置app 的事件绑定，主图上传，设置APP名称，设置APP信息 from '../templete/appsetTpl'
            (0, _appsetTpl.initAppset)();

            // 设置 背景
            (0, _bgTpl.initBg)(this, $setAppBg, function () {
                self.renderPhone();
            });

            // 设置 背景色
            (0, _bgColorTpl.initBgColor)(this, $setAppBg, function () {
                self.renderPhone();
            });
        }

        //设置phone区域的样式

    }, {
        key: 'renderPhone',
        value: function renderPhone() {

            //设置样式
            $('#phoneApp').setStyle({
                style: this.app.style
            });

            (0, _AppDataFun.AppDataChange)();
        }

        // 初始化选中的page, canRender 强制渲染，撤销用

    }, {
        key: 'newPage',
        value: function newPage(index, canRender) {

            //显示设置区域
            (0, _layerFun.layerShow)('#setPageBox');

            //如果选择同一个类型的同一个页面，不再重复渲染
            if (AppData.edit.pageIndex == index && !canRender) {
                return;
            }

            //设置当前选中 appData
            (0, _pageFun.setPage)(index, this);

            // console.log('app.js 183 => 设置当前选中的page', AppData.edit.pageIndex)
            var p = (0, _AppDataFun.getDataPage)(index);
            p['index'] = index;

            console.log('new ----------------------', AppData.edit.pageType, p);

            if (AppData.edit.pageType === 'pages') {
                new _page2.default({
                    className: 'page',
                    page: p,
                    pagesList: 'pagesList'
                }).init();
            } else if (AppData.edit.pageType === 'popups') {
                new _popup2.default({
                    className: 'popup',
                    popup: p,
                    pagesList: 'popupsList'
                }).init();
            } else if (AppData.edit.pageType === 'fixeds') {
                new _fixed2.default({
                    className: 'fixed',
                    fixed: p,
                    pagesList: 'fixedsList'
                }).init();
            } else {
                // ...
            }
        }

        // 初始化 动画 模块 选项

    }, {
        key: 'newAnimate',
        value: function newAnimate() {
            var animate = new _animate2.default();
            animate.init();
        }

        // 添加功能layer模块

    }, {
        key: 'addLayerModule',
        value: function addLayerModule() {
            var $fastMenu = $('#fastMenu');
            $fastMenu.off('click.fun').on('click.fun', '.fun', function () {
                var fun = $(this).data('fun');
                $fastMenu.find('.fastlist').removeClass('show');
                $fastMenu.find('.more').removeClass('active');
                (0, _layerSwitch.addLayer)(fun);
            });
        }

        //删除页面

    }, {
        key: 'delPage',
        value: function delPage(index) {

            if (AppData.edit.pageType === 'fixeds') {
                $.tip({
                    msg: '浮动层不可删除',
                    type: 'danger',
                    time: 3000
                });
                return;
            }

            $.confirms({
                content: '是否要删除当前页面？',
                callback: function callback(mark) {
                    if (mark) {
                        // 清除DOM
                        (0, _AppDataFun.getPageListDom)().find('.page-item').eq(index).remove();

                        // 移除data page 数据
                        (0, _AppDataFun.removeDataPage)(index);

                        // 默认选择第一个
                        var $page = (0, _AppDataFun.getPageListDom)().find('.page-item').eq(0);
                        if ($page[0]) {
                            AppData.edit.pageIndex = null;
                            $page.trigger('click');
                        } else {
                            $('#layerlist').html('');
                            $('.appname').trigger('click');
                            (0, _AppDataFun.getViewDom)().html('');
                        }
                    }
                }
            }).show();
        }

        //新增页面, 这里目前只能新增页面，不能新增 popup ,fixed 后期加 ，在 tplSource.js 里面调用

    }, {
        key: 'addPage',
        value: function addPage(index, page) {

            if (AppData.edit.pageType === 'fixeds') {
                $.tip({
                    msg: '浮动层只能加一个',
                    type: 'danger',
                    time: 3000
                });
                return;
            }

            if (!page) {
                console.error('App.addPage 方法，必须传入 page 对象');
                return;
            }

            // 插入pages
            (0, _AppDataFun.addNewPageData)({
                index: index + 1,
                page: page || null
            });

            // 设置左侧的 page List
            this.setPageList();

            // 默认选择新增的那一个
            (0, _AppDataFun.getPageListDom)().find('.page-item').eq(index + 1).trigger('click');
        }

        //复制页面

    }, {
        key: 'copyPage',
        value: function copyPage(index) {

            if (AppData.edit.pageType === 'fixeds') {
                $.tip({
                    msg: '浮动层不可复制',
                    type: 'danger',
                    time: 3000
                });
                return;
            }

            // 复制pages
            (0, _AppDataFun.copyPageData)(index + 1);

            // 设置左侧的 page List
            this.setPageList();

            // 默认选择新增的那一个
            (0, _AppDataFun.getPageListDom)().find('.page-item').eq(index + 1).trigger('click');
        }

        // 发布预览

    }, {
        key: 'publish',
        value: function publish() {
            $('#appPublish').on('click', function () {
                // console.log(AppData.data);
                var load = $.loading({
                    tip: 'H5生成中，请耐心等待！'
                });
                (0, _saveApp.appToHTML)().then(function (res) {
                    load.close();
                });
            });
        }

        //初始化背景参数

    }, {
        key: 'init',
        value: function init() {

            this.newAnimate();
            this.initSet();
            this.initMp3();
            this.initLoad();
            this.initSetEvent();
            this.renderPhone();

            //设置page 列表
            this.setPagePopup();
            this.setPagePage();
            this.setPageFlex();
            this.eventFun();

            // 默认选中第一页, 这里new Layer 设置了 local
            $('#leftPagesList').find('[data-name="fixeds"]').trigger('click');
            $('#fixedsList').find('.page-item').trigger('click');
            $('#leftPagesList').find('[data-name="pages"]').trigger('click');
            $('#pagesList').find('.page-item').eq(0).trigger('click');

            this.addLayerModule(); // 添加layer模块

            // 快捷图标事件
            (0, _appFun.iniFastEvent)(this);

            // 发布
            this.publish();
            // 绑定发布弹窗的各种事件
            (0, _saveApp.eventAppViewShow)(this);

            AppData.edit.appClass = this;

            AppData.edit.phoneScale = _global2.default.scale;
        }
    }]);
    return App;
}();

exports.default = App;

/***/ }),
/* 538 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appsetTpl = appsetTpl;
exports.initAppset = initAppset;

var _AppDataFun = __webpack_require__(10);

function appsetTpl(obj) {
    return '<div class="set-appinfo">\n\t\t\t\t<div class="tr">\n\t\t\t\t\t\u4E3B\u56FE: <a id="appSetUpload" class="mt-upload-btn"><img id="uploadMainImg" src="' + obj.img + '" width="100" height="100"/></a>\n\t\t\t\t</div>\n\t\t\t\t<div class="tr">\n\t\t\t\t\t\u6807\u9898: <input id="appSetName" type="text" class="mt-input" width="200" value="' + obj.name + '"/>\n\t\t\t\t</div>\n\t\t\t\t<div class="tr">\n\t\t\t\t\t\u63CF\u8FF0: <textarea id="appSetInfo" style="resize:none" type="text" class="mt-textarea">' + obj.info + '</textarea>\n\t\t\t\t</div>\n\t\t\t</div>';
}

// appset 的事件
function initAppset() {

    //设置名字
    $('#appSetName').on('input', function (e) {
        var val = $(this).val();
        var $setname = $('.a-setname');
        $setname.html(val);
        (0, _AppDataFun.setDataApp)({
            name: val
        });
    });

    //设置info
    $('#appSetInfo').on('input', function (e) {
        (0, _AppDataFun.setDataApp)({
            info: $(this).val()
        });
    });

    //图片上传 ..
    $('#appSetUpload').upload({
        auto: true,
        method: 'post',
        multi: false, //多文件上传
        fileName: 'file', //表单名字
        data: {}, //附带表单
        imgbox: '#uploadMainImg', //放图片的box
        url: '/api/upload', //上传
        uploadSuccess: function uploadSuccess(res) {
            //...
            (0, _AppDataFun.setDataApp)({
                img: res.data.url
            });
        },
        uploadError: function uploadError(res) {
            console.error('图片上传失败！', res);
        }
    });
}

/***/ }),
/* 539 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pageListTpl = pageListTpl;
exports.destoryControl = destoryControl;
exports.initPageListEvent = initPageListEvent;
/**
 * page 列表的模板
*/

function pageListTpl(obj, type) {
    return ' \n\t<li class="page-item" data-name="' + obj.name + '">\n\t\t<div class="page-content">\n            <span class="page-name">' + obj.name + '</span>\n            ' + (!obj.id ? '' : '<span class="page-id">ID: ' + obj.id + '</span>') + '\n\t\t</div>\n\t\t<div class="page-info">\n             <a class="important edit-page" data-title="\u7F16\u8F91\u9875\u9762\u4FE1\u606F"><i class="iconfont icon-bianji1"></i></a>\n             ' + (type !== 'fixed' ? '<a class="copy-page" data-title="\u590D\u5236\u9875\u9762"><i class="iconfont icon-fuzhi"></i></a>\n             <a class="del-page" data-title="\u5220\u9664\u9875\u9762"><i class="iconfont icon-icodel"></i></a>' : '') + '\n\t\t</div>\n\t</li>';
}

// 销毁 layer 控制器
function destoryControl() {
    //取消layer的选中状态
    var $control = $('#phoneApp').find('.mt-control');
    if ($control[0]) {
        $control.remove();
        $control = null;
    }
    AppData.edit.layerDom = null;
    AppData.edit.layerIndex = null;
    $('#layerlist').find('.active').removeClass('active');
}

// page 列表的事件
function initPageListEvent(self) {
    //选择page    , canRender 强行渲染
    $('#pagesList, #popupsList, #fixedsList').off('click').on('click', '.page-item', function (e, canRender) {
        e.stopPropagation();
        $(this).addClass('active').siblings('.page-item').not('.mt-uniq-clone').removeClass('active');
        var index = $(this).index();

        // 选择页面的时候，清除 AppData.edit.layerIndex 
        AppData.edit.layerIndex = null;

        // 销毁控制器
        destoryControl();
        var pageType = 'pages';
        if (e.delegateTarget.id === 'popupsList') {
            pageType = 'popups';
        } else if (e.delegateTarget.id === 'fixedsList') {
            pageType = 'fixeds';
        }
        AppData.edit.pageType = pageType;

        //new page
        self.newPage(index, canRender);
    });

    //排序回调
    $('#pagesList, #popupsList, #fixedsList').off('uniqend').on('uniqend', function (e, data) {
        //交换pages。需要重新排序 from 变成了 to， 但是 from - to 中间这段，都加了1
        var pages = self.app[AppData.edit.pageType];
        var fromData = pages[data.from];

        // 从下往上
        if (data.from > data.to) {
            for (var i = 0; i < data.from - data.to; i++) {
                var index = data.from - i;
                pages[index] = pages[index - 1];
                console.log('排序次数', index, index - 1);
            }
        } else {
            // 从上往下
            for (var _i = 0; _i < data.to - data.from; _i++) {
                var _index = data.from + _i;
                pages[_index] = pages[_index + 1];
                console.log('排序次数', _index, _index + 1);
            }
        }
        console.log('排序次数', data.from, data.to);
        pages[data.to] = fromData;

        //重新设置当前选中的下标
        var $this = $(this).find('.active');
    });
}

/***/ }),
/* 540 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appSliderAnimateTpl = appSliderAnimateTpl;
exports.initAppSliderAnimate = initAppSliderAnimate;

var _AppDataFun = __webpack_require__(10);

var _sliderAnimate = __webpack_require__(225);

function appSliderAnimateTpl(obj) {
    // console.log(obj)
    var list = '';
    for (var key in _sliderAnimate.sliderAnimate) {
        list += '<a data-val="' + key + '" class="option">' + _sliderAnimate.sliderAnimate[key].name + '</a>';
    }
    return '\n    <div class="tr">\u7FFB\u9875\u52A8\u753B:</div>\n    <div class="tr">\n        <div id="appPageSlider" class="mt-selectone" data-val="' + obj.playtype + '">\n            ' + list + '\n        </div>\n    </div>';
}

// 初始化选择页面的事件
function initAppSliderAnimate(self) {
    //翻页样式
    $('#appPageSlider').on('change', function (e, data) {
        self.app.slider.animate = parseInt(data, 10);
        // console.log('appSliderAnimateTpl =>', AppData)
        (0, _AppDataFun.AppDataChange)();
    });
}

/***/ }),
/* 541 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setPage = setPage;

var _AppDataFun = __webpack_require__(10);

/**
 * 设置 全局page 对象
 */
function setPage(index, self) {
    if (index !== null) {
        (0, _AppDataFun.setAppDataEdit)({
            pageIndex: index
        });
    }
}

/***/ }),
/* 542 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(106);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(64);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(63);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(107);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(108);

var _inherits3 = _interopRequireDefault(_inherits2);

var _pageClass = __webpack_require__(295);

var _pageClass2 = _interopRequireDefault(_pageClass);

var _layerListTpl = __webpack_require__(501);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//layer list

/**
 * 页面
 */
var Page = function (_PageClass) {
    (0, _inherits3.default)(Page, _PageClass);

    function Page(props) {
        (0, _classCallCheck3.default)(this, Page);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Page.__proto__ || (0, _getPrototypeOf2.default)(Page)).call(this, props));

        _this.page = props.page; // 直接编辑当前page 对象 app里面的page ，不是new Page() 对象
        return _this;
    }

    //初始化方法


    (0, _createClass3.default)(Page, [{
        key: 'init',
        value: function init() {
            // ...
            this._init();
        }
    }]);
    return Page;
}(_pageClass2.default);

exports.default = Page;

/***/ }),
/* 543 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPageLayerFun = initPageLayerFun;
/**
 * @desc 在渲染整个页面的视图的时候，有的layers 需要 进行一些特定的方法去初始化，比如地图
*/
function initPageLayerFun(layers, $viewDom) {
  // ...
}

/***/ }),
/* 544 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(106);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(64);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(63);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(107);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(108);

var _inherits3 = _interopRequireDefault(_inherits2);

var _pageClass = __webpack_require__(295);

var _pageClass2 = _interopRequireDefault(_pageClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 页面
 */
var Popup = function (_PageClass) {
    (0, _inherits3.default)(Popup, _PageClass);

    function Popup(props) {
        (0, _classCallCheck3.default)(this, Popup);
        return (0, _possibleConstructorReturn3.default)(this, (Popup.__proto__ || (0, _getPrototypeOf2.default)(Popup)).call(this, props));
    }

    //初始化方法


    (0, _createClass3.default)(Popup, [{
        key: 'init',
        value: function init() {
            console.log(this);
            // ...
            this._init();
        }
    }]);
    return Popup;
}(_pageClass2.default);

exports.default = Popup;

/***/ }),
/* 545 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(106);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(64);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(63);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(107);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(108);

var _inherits3 = _interopRequireDefault(_inherits2);

var _pageClass = __webpack_require__(295);

var _pageClass2 = _interopRequireDefault(_pageClass);

var _AppDataFun = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 页面
 */
var Fixed = function (_PageClass) {
    (0, _inherits3.default)(Fixed, _PageClass);

    function Fixed(props) {
        (0, _classCallCheck3.default)(this, Fixed);
        return (0, _possibleConstructorReturn3.default)(this, (Fixed.__proto__ || (0, _getPrototypeOf2.default)(Fixed)).call(this, props));
    }

    //初始化方法


    (0, _createClass3.default)(Fixed, [{
        key: 'init',
        value: function init() {

            // 切换目标
            $('.pageViewFixed').removeClass('page-viewup-full');
            (0, _AppDataFun.getViewDom)().addClass('page-viewup-full');

            console.log('Fixed 类');
            // ...
            this._init();
        }
    }]);
    return Fixed;
}(_pageClass2.default);

exports.default = Fixed;

/***/ }),
/* 546 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(64);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(63);

var _createClass3 = _interopRequireDefault(_createClass2);

var _animateTpl = __webpack_require__(547);

var _animates = __webpack_require__(502);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 动画配置

// animation: name duration timing-function delay iteration-count direction fill-mode play-state;
var Animate = function () {
    function Animate() {
        // .....

        (0, _classCallCheck3.default)(this, Animate);
    }

    (0, _createClass3.default)(Animate, [{
        key: 'render',
        value: function render() {
            $('#animationIn').html((0, _animateTpl.animtesToHtml)(_animates.animatesIn));
            $('#animationOut').html((0, _animateTpl.animtesToHtml)(_animates.animatesOut));
            $('#animationEm').html((0, _animateTpl.animtesToHtml)(_animates.animatesEm));
        }

        //初始化方法

    }, {
        key: 'init',
        value: function init() {
            this.render();
        }
    }]);
    return Animate;
}(); //动画模版


exports.default = Animate;

/***/ }),
/* 547 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.animtesToHtml = animtesToHtml;

var _animates = __webpack_require__(502);

// 动画配置

function animtesToHtml(arr) {
    var sHtml = '';
    for (var i = 0; i < arr.length; i++) {
        var _arr$i = arr[i],
            animate = _arr$i.animate,
            name = _arr$i.name,
            type = _arr$i.type,
            time = _arr$i.time,
            delay = _arr$i.delay,
            count = _arr$i.count,
            fun = _arr$i.fun;

        sHtml += '<li data-animate="' + animate + '" data-name="' + name + '" data-type="' + type + '" data-time="' + time + '" data-delay="' + delay + '" data-count="' + count + '" data-fun="' + fun + '">' + name + '</li>';
    }
    return '<div class="animates">\n                <ul class="clearfix">' + sHtml + '</ul>\n            </div>';
}

/***/ }),
/* 548 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/null.png";

/***/ }),
/* 549 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/app.png";

/***/ }),
/* 550 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imgURLClear = imgURLClear;

var _indexedDB = __webpack_require__(103);

var _funs = __webpack_require__(122);

var _imgTpl = __webpack_require__(162);

//  图片方法

// @param obj：对应层的obj对象 type:object，imgCacheObj 所有的图片缓存 type:[]
// 清理 style.background 和 data.src
function clearStyleImg(obj, imgCacheObj) {

    // 过滤背景
    if (obj['style'] && obj.style['background-image']) {
        var url = obj.style['background-image'] || '';
        if (url.isBlob()) {
            var temp = url.split('#')[1];
            obj.style['background-image'] = (0, _imgTpl.base64ToUrl)(imgCacheObj[temp], temp);
        }
    }

    // 过滤 data
    if (obj['data'] && obj.data['src']) {
        var _url = obj.data['src'] || '';
        if (_url.isBlob()) {
            var _temp = _url.split('#')[1];
            obj.data['src'] = (0, _imgTpl.base64ToUrl)(imgCacheObj[_temp], _temp);
        }
    }
}

// @param APP_DATA : APP本地缓存数据， callback: 数据清洗后的回调函数
// 数据清洗
function imgURLClear(APP_DATA, callback) {

    // 从本地数据库去拿缓存图片
    (0, _indexedDB.openDB)().then(function (res) {

        if (!res) {
            return;
        }
        // 获取全部缓存图片
        (0, _indexedDB.getAllData)('img', function (arr) {
            if (arr.length > 0) {

                // 图片的缓存对象
                var imgCacheObj = (0, _funs.arrToObj)(arr);

                // 过滤 APP
                clearStyleImg(APP_DATA, imgCacheObj);
                for (var i = 0; i < APP_DATA.pages.length; i++) {
                    // 过滤 pages
                    clearStyleImg(APP_DATA[AppData.edit.pageType][i], imgCacheObj);
                    for (var j = 0; j < APP_DATA[AppData.edit.pageType][i].layers.length; j++) {
                        // 过滤 layers
                        clearStyleImg(APP_DATA[AppData.edit.pageType][i].layers[j], imgCacheObj);
                    }
                }

                // 释放引用内存
                imgCacheObj = null;

                callback();
            } else {
                // 无缓存图片
                callback();
            }
        });
    });
}

/***/ }),
/* 551 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Mp3List = Mp3List;
exports.sysMp3 = sysMp3;

var _ajax = __webpack_require__(109);

var _imgSource = __webpack_require__(296);

// 我的图片
function Mp3List(p) {
    (0, _ajax.getMp3)({ pageSize: p.pagesize, pageNum: p.page }).done(function (res) {
        if (res.success) {
            console.log('mp3=>', res);
            var str = '';
            for (var i = 0; i < res.data.length; i++) {
                str += '<li class="item" data-url="' + res.data[i].url + '">\n                            <span class="name"><span class="mp3-play-icon"><i></i><i></i><i></i><i></i></span> ' + res.data[i].name + '</span>\n                            <span class="try">\u8BD5\u542C</span>\n                            <span class="use">\u4F7F\u7528</span>\n                        </li>';
            }
            $('#mp3list').empty().html(str);

            // 分页
            var $imgPagelist = $('#mp3pagelist');
            if (!$imgPagelist.find('.mt-pagelist')[0]) {
                // 初始化分页
                (0, _imgSource.newPage)(res.count, $imgPagelist, Mp3List);
            }
        } else {
            console.error('获取用户图片失败！');
        }
    });
}

// 我的图片
// ajax
function sysMp3() {
    Mp3List({
        pagesize: _imgSource.PAGE_SIZE,
        page: 1
    });
}

/***/ })
/******/ ]);