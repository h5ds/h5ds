(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mobx-react");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("mobx");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(13);

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = __webpack_require__(37);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getNowFormatDate = getNowFormatDate;
exports.randomNum = randomNum;
exports.getUrlData = getUrlData;
exports.randomColor = randomColor;
exports.getExplore = getExplore;
exports.getOS = getOS;
exports.deepClone = deepClone;
exports.clone = clone;
exports.getRandomID = getRandomID;
exports.arrToObj = arrToObj;
exports.isNot = isNot;
exports.isUrl = isUrl;
exports.isPhoneNum = isPhoneNum;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc 获取当前时间
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = '/';
    var seperator2 = ':';
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
}

/**
 *
 * @desc 生成指定范围随机数
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
function randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

/**
 *
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */
function getUrlData(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    var data = null;
    if (r != null) {
        data = unescape(r[2]);
    }
    return data;
}

/**
 *
 * @desc 随机生成颜色
 * @return {String}
 */
function randomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

/**
 *
 * @desc 获取浏览器类型和版本
 * @return {String}
 */
function getExplore() {
    var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] : (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] : (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] : (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] : (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] : (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] : (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (sys.ie) return 'IE: ' + sys.ie;
    if (sys.edge) return 'EDGE: ' + sys.edge;
    if (sys.firefox) return 'Firefox: ' + sys.firefox;
    if (sys.chrome) return 'Chrome: ' + sys.chrome;
    if (sys.opera) return 'Opera: ' + sys.opera;
    if (sys.safari) return 'Safari: ' + sys.safari;
    return 'Unkonwn';
}

/**
 *
 * @desc 获取操作系统类型
 * @return {String}
 */
function getOS() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/mac/i.test(appVersion)) return 'MacOSX';
    if (/win/i.test(appVersion)) return 'windows';
    if (/linux/i.test(appVersion)) return 'linux';
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios';
    if (/android/i.test(userAgent)) return 'android';
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
}

/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 */
function deepClone(values) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == values || 'object' != (typeof values === 'undefined' ? 'undefined' : (0, _typeof3.default)(values))) return values;

    // return JSON.parse(JSON.stringify(values));

    // Handle Date
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }

    // Handle Array
    if (values instanceof Array) {
        copy = [];
        for (var i = 0, len = values.length; i < len; i++) {
            copy[i] = deepClone(values[i]);
        }
        return copy;
    }

    // Handle Object
    if (values instanceof Object) {
        copy = {};
        for (var attr in values) {
            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy values! Its type isn't supported.");
}

/**
 * @desc 对象复制
 */
function clone(obj) {
    var res = null;
    if (obj instanceof Object) {
        res = JSON.parse((0, _stringify2.default)(obj));
    }
    return res;
}

/**
 * 生成一个用不重复的ID
 */
function getRandomID() {
    var randomLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

    return Number(Math.random().toString().substr(3, randomLength || 8) + Date.now()).toString(36);
}

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
function isNot(val) {
    if (val === null || val === '' || val === undefined) {
        return true;
    } else {
        return false;
    }
}

/**
 *
 * @desc   判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */
function isUrl(str) {
    return (/http:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str)
    );
}

/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function isPhoneNum(str) {
    return (/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
    );
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(getNowFormatDate, 'getNowFormatDate', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');

    __REACT_HOT_LOADER__.register(randomNum, 'randomNum', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');

    __REACT_HOT_LOADER__.register(getUrlData, 'getUrlData', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');

    __REACT_HOT_LOADER__.register(randomColor, 'randomColor', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');

    __REACT_HOT_LOADER__.register(getExplore, 'getExplore', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');

    __REACT_HOT_LOADER__.register(getOS, 'getOS', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');

    __REACT_HOT_LOADER__.register(deepClone, 'deepClone', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');

    __REACT_HOT_LOADER__.register(clone, 'clone', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');

    __REACT_HOT_LOADER__.register(getRandomID, 'getRandomID', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');

    __REACT_HOT_LOADER__.register(arrToObj, 'arrToObj', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');

    __REACT_HOT_LOADER__.register(isNot, 'isNot', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');

    __REACT_HOT_LOADER__.register(isUrl, 'isUrl', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');

    __REACT_HOT_LOADER__.register(isPhoneNum, 'isPhoneNum', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/util.js');
}();

;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/message");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/message/style");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @desc 其他参数配置。可能是跨平台，跨版本的参数配置
 */

var blankImg = exports.blankImg = ''; // 默认替代图片

var version = exports.version = '4.0.0'; // 版本号

var appHeight = exports.appHeight = 486;
var appWidth = exports.appWidth = 320;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(blankImg, 'blankImg', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/set.js');

  __REACT_HOT_LOADER__.register(version, 'version', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/set.js');

  __REACT_HOT_LOADER__.register(appHeight, 'appHeight', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/set.js');

  __REACT_HOT_LOADER__.register(appWidth, 'appWidth', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/set.js');
}();

;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/defineProperty");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(38);

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
        img: { keyPath: 'id' // 主健id
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
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(conf, 'conf', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/indexedDB.js');

    __REACT_HOT_LOADER__.register(openDB, 'openDB', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/indexedDB.js');

    __REACT_HOT_LOADER__.register(deleteDB, 'deleteDB', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/indexedDB.js');

    __REACT_HOT_LOADER__.register(closeDB, 'closeDB', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/indexedDB.js');

    __REACT_HOT_LOADER__.register(addData, 'addData', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/indexedDB.js');

    __REACT_HOT_LOADER__.register(putData, 'putData', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/indexedDB.js');

    __REACT_HOT_LOADER__.register(getDataByKey, 'getDataByKey', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/indexedDB.js');

    __REACT_HOT_LOADER__.register(getAllData, 'getAllData', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/indexedDB.js');

    __REACT_HOT_LOADER__.register(deleteData, 'deleteData', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/indexedDB.js');

    __REACT_HOT_LOADER__.register(clearData, 'clearData', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/indexedDB.js');
}();

;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.swiperAfter = swiperAfter;

var _set = __webpack_require__(12);

/**
 * @desc 每次swiper 页面的时候调用
 */
function swiperAfter($in, $out) {
    // console.log('xxx>>>>>>>>>>>>>>>>>>>>', $in[0]);
    // $in 和 $out 可能是一个layer或者一个page
    if ($in && $in[0]) {
        $(document).trigger('h5ds.swiperAfter', { $in: $in, $out: $out });
    }

    // 解决layer-表单的BUG
    $('.layer-val').each(function () {
        $(this).closest('.layer').off('mousedown touchstart');
    });
} // import { initVideoIframe } from '@/core/layers/video/app';
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(swiperAfter, 'swiperAfter', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.swiper.after.js');
}();

;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(52);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(137);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _util = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc 自定义表单 by mantou
 */
var InputMt = function (_Component) {
    (0, _inherits3.default)(InputMt, _Component);

    function InputMt(props) {
        (0, _classCallCheck3.default)(this, InputMt);

        var _this = (0, _possibleConstructorReturn3.default)(this, (InputMt.__proto__ || (0, _getPrototypeOf2.default)(InputMt)).call(this, props));

        _this.cls = '_input_' + (0, _util.getRandomID)(6);
        return _this;
    }

    (0, _createClass3.default)(InputMt, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _props = this.props,
                wheel = _props.wheel,
                onChange = _props.onChange,
                step = _props.step;

            if (wheel) {
                $(document).on('mousewheel.' + this.cls, '.' + this.cls, function (e) {
                    e.preventDefault();
                    var val = _this2.props.value;
                    if (!step) {
                        step = 1;
                    }
                    if (e.originalEvent.deltaY > 0) {
                        val = val.add(step);
                    } else {
                        val = val.sub(step);
                    }
                    if (onChange) {
                        e.target.value = setValue(_this2.props, val);
                        // console.log(val, e.target.value);
                        onChange(e);
                    }
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $(document).off('mousewheel.' + this.cls);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                max = _props2.max,
                value = _props2.value,
                min = _props2.min,
                unit = _props2.unit,
                className = _props2.className,
                wheel = _props2.wheel,
                type = _props2.type,
                step = _props2.step,
                other = (0, _objectWithoutProperties3.default)(_props2, ['max', 'value', 'min', 'unit', 'className', 'wheel', 'type', 'step']);

            var cName = ['h5ds-input', this.cls];
            if (className) {
                cName.push(className);
            }
            if (!value) {
                value = '';
            }
            return _react2.default.createElement('input', (0, _extends3.default)({
                title: wheel ? '可滚动鼠标滚轮修改值' : null
            }, other, {
                value: type === 'text' ? value : setValue(this.props, value),
                className: cName.join(' ')
            }));
        }
    }]);
    return InputMt;
}(_react.Component);

/**
 * @desc 设置 value
 */


exports.default = InputMt;
function setValue(props, val) {
    var unit = props.unit,
        type = props.type,
        min = props.min,
        max = props.max,
        step = props.step;

    if (type === 'text') {
        return val;
    }

    if (!val) {
        val = 0;
    }

    // 最小值
    if (min !== undefined && min > val) {
        val = min;
    }

    // 最大值
    if (max !== undefined && max < val) {
        val = max;
    }

    // 最多保留1位小数
    if (val) {
        var arr = (val + '').split('.');
        if (arr[1]) {
            var dot = arr[1];
            if (dot.length > 1) {
                dot = dot.substr(0, 1);
            }
            val = parseFloat(arr[0] + '.' + dot);
        } else {
            val = parseInt(val);
        }
    }

    // 自动带单位
    if (unit) {
        val += unit;
    }

    return val;
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(InputMt, 'InputMt', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/inputmt/InputMt.jsx');

    __REACT_HOT_LOADER__.register(setValue, 'setValue', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/inputmt/InputMt.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.swiperBefore = swiperBefore;
/**
 * @desc 每次swiper 页面的前时候调用
 */
function swiperBefore($in, $out) {
    // ...
    if ($in && $in[0]) {
        $(document).trigger('h5ds.swiperBefore', { $in: $in, $out: $out });
    }
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(swiperBefore, 'swiperBefore', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.swiper.before.js');
}();

;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rectParam = rectParam;
exports.rectParamObj = rectParamObj;
// 通过旋转后的DIV，获取到外部DIV的坐标和尺寸
/**              w
 *     ------------------------
 *     |                      |
 *     |     倾斜的矩形形      |  h
 *     |                      |
 *     ------------------------
 */
function rectParam($dom) {
    if (!$dom[0]) {
        return;
    }
    var rotate = Matrix.getCurrentMatrix($dom[0]).getRotate(); // $dom.transform('rotate') % 90;
    var ro = rotate % 90 * (Math.PI / 180);
    var w = $dom.width(),
        h = $dom.height();
    var left = parseFloat($dom.css('left')),
        top = parseFloat($dom.css('top'));
    var center = {
        left: left + w / 2,
        top: top + h / 2
    };

    console.log('rotate >>>>>>>>>>>>>>>>>>>>>', rotate);

    // 如果没旋转
    if (rotate == 0) {
        return {
            rotate: rotate,
            top: top,
            left: left,
            boxWidth: w,
            boxHeight: h,
            width: w,
            height: h,
            center: center
        };
    }
    // 如果旋转了
    var r = Math.atan(h / w); // 对角线相交的小夹角
    var len = Math.sqrt(h / 2 * (h / 2) + w / 2 * (w / 2)); // 对角线一半的长度
    var boxHeight = len * Math.cos(Math.PI / 2 - (ro + r)) * 2;
    var boxWidth = len * Math.cos(ro - r) * 2;
    boxWidth = parseFloat(boxWidth);
    boxHeight = parseFloat(boxHeight);
    return {
        rotate: rotate,
        top: center.top - boxHeight / 2, // 外壳的 top
        left: center.left - boxWidth / 2, // 外壳 的 left
        boxWidth: boxWidth, // 外壳宽
        boxHeight: boxHeight, // 外壳高
        width: w, // 真实宽
        height: h, // 真实高
        center: center // 中心点坐标
    };
}

/**
 * @desc 通过对象获取外框
 */
function rectParamObj(layer) {
    var rotate = 0;
    var style = layer.style;
    if (style.transform) {
        rotate = parseInt(Matrix.transformToMatrix(style.transform).getRotate(), 10) || 0;
    }
    var ro = rotate % 90 * (Math.PI / 180);
    var w = style.width || 0,
        h = style.height || 0;
    var left = style.left || 0,
        top = style.top || 0;
    var center = {
        left: left + w / 2,
        top: top + h / 2
    };
    console.log('rotate xxxxxxxxxxxxxxxxxx', rotate);

    // 如果没旋转
    if (rotate == 0) {
        return {
            rotate: rotate,
            top: top,
            left: left,
            boxWidth: w,
            boxHeight: h,
            width: w,
            height: h,
            center: center
        };
    }
    // 如果旋转了
    var r = Math.atan(h / w); // 对角线相交的小夹角
    var len = Math.sqrt(h / 2 * (h / 2) + w / 2 * (w / 2)); // 对角线一半的长度
    var boxHeight = len * Math.cos(Math.PI / 2 - (ro + r)) * 2;
    var boxWidth = len * Math.cos(ro - r) * 2;
    boxWidth = parseFloat(boxWidth);
    boxHeight = parseFloat(boxHeight);
    return {
        rotate: rotate,
        top: center.top - boxHeight / 2, // 外壳的 top
        left: center.left - boxWidth / 2, // 外壳 的 left
        boxWidth: boxWidth, // 外壳宽
        boxHeight: boxHeight, // 外壳高
        width: w, // 真实宽
        height: h, // 真实高
        center: center // 中心点坐标
    };
}

// 通过 boxWidth,boxHeight,top,left 逆向计算left,top

;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(rectParam, 'rectParam', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/rect.js');

    __REACT_HOT_LOADER__.register(rectParamObj, 'rectParamObj', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/rect.js');
}();

;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initGroupEvent = initGroupEvent;
exports.setStaticGroup = setStaticGroup;
exports.dragGroupEvent = dragGroupEvent;

var _mobx = __webpack_require__(7);

/**
 * @desc 初始化拖动组的方法
 */
function initGroupEvent(app, edata, callback) {
    // 拖动选择一组layer
    $('#phone').off('mousedown.layerGroup').on('mousedown.layerGroup', function (ed) {
        // if (!$(ed.target).closest('.layer')[0]) {

        // 如果是选择的标线。不做处理
        if ($(ed.target).closest('.ruler-box')[0]) {
            return;
        }

        // 如果已经选择了组 或者 选择了layer ，不再执行组的拖动区域
        if (edata.selectGroup || edata.selectLayer !== null) {
            return;
        }
        // 控制器的代码
        var controlBox = '<div class="h5ds-control">\n                    <span class="h5ds-control-top"></span>\n                    <span class="h5ds-control-left"></span>\n                    <span class="h5ds-control-right"></span>\n                    <span class="h5ds-control-bottom"></span>\n                    <span class="h5ds-control-topleft"></span>\n                    <span class="h5ds-control-topright"></span>\n                    <span class="h5ds-control-bottomleft"></span>\n                    <span class="h5ds-control-bottomright"></span>\n                    <span class="h5ds-control-center"></span>\n                </div>';

        // 获取当前的layer 位置, 获取中心点。
        var arr = [];
        app.getPageDom().children().children('.layer').each(function () {
            var $this = $(this);
            // let rotate = $this.transform('rotate');
            // $this.transform({ rotate: '0deg' });
            var obj = {
                left: $this.offset().left,
                top: $this.offset().top,
                width: $this.width(),
                height: $this.height(),
                dom: $this
            };
            // if (rotate) {
            //     $this.transform({ rotate: rotate + 'deg' });
            // }
            obj.center = {
                x: obj.left + obj.width / 2,
                y: obj.top + obj.height / 2
            };
            if (!$this.hasClass('layer-temporary-lock') && !$this.closest('.layer-combinbox')[0]) {
                arr.push(obj);
            }
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
        $(document).on('mousemove.layerGroup', function (em) {
            wid = Math.abs(em.pageX - ed.pageX);
            hei = Math.abs(em.pageY - ed.pageY);

            // 拉动鼠标
            em.pageX > ed.pageX ? left = ed.pageX : left = em.pageX;
            em.pageY > ed.pageY ? top = ed.pageY : top = em.pageY;

            $selectGroup.css({
                top: top,
                left: left,
                width: wid,
                height: hei,
                display: wid + hei === 0 ? 'none' : 'block'
            });

            // 设置 控制器
            arr.forEach(function (elem) {
                var _elem$center = elem.center,
                    x = _elem$center.x,
                    y = _elem$center.y;

                if (x > left && x < left + wid && y > top && y < top + hei) {
                    // console.log('中心了', index);
                    var $cont = elem.dom.find('.h5ds-control');
                    if (!$cont[0]) {
                        elem.dom.append(controlBox);
                    }
                } else {
                    elem.dom.find('.h5ds-control').remove();
                }
            });
        }).on('mouseup.layerGroup', function (eu) {
            // 调出拖动组的浮动层，选中之后，接下来就要，对选中的进行操作了
            var $control = app.getPageDom().find('.h5ds-control');
            if ($control.length > 1) {
                console.log('触发图层集合的操作');
                callback(getLayerIndex(app));
                // dragGroupEvent();
            } else if ($control.length === 1) {
                // 只选中一个，就选择这个图层
                $control.closest('.layer').trigger('click');
            }

            // 释放内存
            arr = null;
            $(document).off('mousemove.layerGroup mouseup.layerGroup');
            $selectGroup.remove();
        });
        // }
    });
}

/**
 * @desc 获取选中的 layer 下标
 */
function getLayerIndex(app) {
    var group = [];
    app.getPageDom().find('.h5ds-control').each(function () {
        var $this = $(this).closest('.layer');
        group.push($this.index());
    });
    return group;
}

/**
 * @desc 设置静态的 control
 */
function setStaticGroup(getPageDom, indexs) {
    // 批量设置选中
    var dom = '<div class="h5ds-control">\n    <span class="h5ds-control-top"></span>\n    <span class="h5ds-control-left"></span>\n    <span class="h5ds-control-right"></span>\n    <span class="h5ds-control-bottom"></span>\n    <span class="h5ds-control-topleft"></span>\n    <span class="h5ds-control-topright"></span>\n    <span class="h5ds-control-bottomleft"></span>\n    <span class="h5ds-control-bottomright"></span>\n    <span class="h5ds-control-center"></span>\n</div>';

    var pageDom = getPageDom();

    // 先清除之前的
    pageDom.find('.h5ds-control').remove();

    indexs.forEach(function (elem, index) {
        var $layer = pageDom.children().children('.layer').eq(elem);
        if (!$layer.find('.h5ds-control')[0]) {
            $layer.append(dom);
        }
    });
}

/**
 * @desc 初始化拖动组的方法
 */
function dragGroupEvent(getLayers, edata) {
    // 让图层可拖动
    $('#phone').off('mousedown.group').on('mousedown.group', '.h5ds-control', function (ed) {
        // 如果选择的组为null，不拖动
        if (!edata.selectGroup) {
            return;
        }
        ed.stopPropagation();
        var oldsize = {};
        var layers = getLayers();
        edata.selectGroup.forEach(function (num) {
            oldsize[num] = {
                x: layers[num].style.left,
                y: layers[num].style.top
            };
        });
        // console.log('oldsize', oldsize);
        $(document).on('mousemove.group', function (em) {
            em.stopPropagation();
            var x = em.pageX - ed.pageX;
            var y = em.pageY - ed.pageY;

            (0, _mobx.transaction)(function () {
                // // 设置网格对齐
                // const { gridAdsorb, gridSize } = edata;
                // if (gridAdsorb && gridSize) {
                //     x = Math.round(x / gridSize, 10) * gridSize;
                //     y = Math.round(y / gridSize, 10) * gridSize;
                // }
                edata.selectGroup.forEach(function (num) {
                    if (layers[num]) {
                        layers[num].style.left = oldsize[num].x + x / edata.phoneScale;
                        layers[num].style.top = oldsize[num].y + y / edata.phoneScale;
                    }
                });
            });
        }).on('mouseup.group', function () {
            $(document).off('mousemove.group mouseup.group');
            $(document).trigger('h5ds.setHistory');
        });
    });
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(initGroupEvent, 'initGroupEvent', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/phone/selectGroup.js');

    __REACT_HOT_LOADER__.register(getLayerIndex, 'getLayerIndex', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/phone/selectGroup.js');

    __REACT_HOT_LOADER__.register(setStaticGroup, 'setStaticGroup', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/phone/selectGroup.js');

    __REACT_HOT_LOADER__.register(dragGroupEvent, 'dragGroupEvent', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/phone/selectGroup.js');
}();

;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/slider");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/slider/style");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28);

__webpack_require__(29);

__webpack_require__(30);

__webpack_require__(31);

__webpack_require__(32);

var _h5dsMount = __webpack_require__(33);

var _h5dsMount2 = __webpack_require__(35);

var _h5dsSwiper = __webpack_require__(16);

var _h5dsSwiper2 = __webpack_require__(21);

/**
 * @desc 滑动函数
 */
$.fn.h5dsSwiper = function (setting) {
    var _this = this;

    // 初始化前执行
    (0, _h5dsMount2.mountWill)(this);

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
        len: $this.find('.h5ds-swiper-page').length // page length
    };

    var timer = null;
    this.pageIndex = 0; // 当前的index

    var set = $.extend(defaults, setting);

    // 添加，删除 class
    var pageInOut = function pageInOut($in, $out, direc) {
        set.animated = true;

        _this.pageIndex = $in.index();

        // 执行滚动动画前
        (0, _h5dsSwiper2.swiperBefore)($in, $out);

        // 如果只有一页，不翻页
        if (set.len <= 1) {
            (0, _h5dsSwiper.swiperAfter)($in, $out);
            return;
        }

        $this.trigger('h5ds.animateStart', $in.index());
        $in.addClass(set['in' + direc] + ' h5ds-swiper-current');
        $out.addClass(set['out' + direc] + ' h5ds-swiper-current');

        // scroll
        var $noSwiper = $in.find('[data-noSwiper="noSwiper"]');
        if ($noSwiper[0]) {
            $noSwiper.addClass('noSwiper');
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(function () {
            $in.find('.h5ds-swiper-layers').css('display', 'block');
            $out.find('.h5ds-swiper-layers').css('display', 'none');

            // 离开后隐藏
            $in.removeClass(set['in' + direc]);
            $out.removeClass(set['out' + direc]);
            $out.removeClass('h5ds-swiper-current');
            set.animated = false;
            $this.trigger('h5ds.animateEnd', {
                direc: direc,
                outIndex: $in.index()
            });
            autoplayFun();

            // 执行滚动动画后
            (0, _h5dsSwiper.swiperAfter)($in, $out);
        }, set.pageTime);
    };

    // 自动翻页
    var autoplayFun = function autoplayFun() {
        var $current = $this.find('.h5ds-swiper-current');
        var autoplay = $current.attr('data-autoplay');
        if (autoplay !== 'false') {
            // 自动翻页
            set.animated = true;
            $this.trigger('h5ds.animateStart', $current.index());
            setTimeout(function () {
                $this.trigger('h5ds_' + set.direction, {
                    $out: $current,
                    outIndex: $current.index()
                });
            }, autoplay * 1000);
        }
        return autoplay;
    };

    // 自动翻页, 这里会判断是否有自动翻页功能
    autoplayFun();

    // 监听touch 事件
    $this.swipe({
        excludedElements: 'button, input, select, textarea, a, .noSwipe',
        swipe: function swipe(event, direction, distance, duration, fingerCount, fingerData) {
            // console.log("你用" + fingerCount + "个手指以" + duration + "ms的时间，向" + direction + "滑动了" + distance + "像素 " + $(e.target).attr('class'));
            var $target = $(event.target);
            var $out = $target.closest('.h5ds-swiper-page');
            // let $noSwiper = $target.closest('[data-noswiper="noSwiper"]');
            var outIndex = $out.index();
            var lock = $out.attr('data-lock');
            var autoplay = $out.attr('data-autoplay');

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
        if (set.animated) {
            console.warn('正在动画中！');
            return false;
        }

        var $out = $('.h5ds-swiper-current');
        var nowIndex = $out.index();
        var $in = $this.find('.h5ds-swiper-page').eq(index);
        // console.log(nowIndex, index);
        if ($in[0]) {
            if (nowIndex === index) {
                console.warn('已经是当前页面！');
                return false;
            }
            pageInOut($in, $out, nowIndex < index ? 'Next' : 'Prev');
            return true;
        } else {
            console.warn('您要跳转的页面不存在！请重新设置');
            return false;
        }
    };

    // 初始化swiper之后
    (0, _h5dsMount.mountDid)(this);

    return this;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mountDid = mountDid;

var _h5dsUe = __webpack_require__(34);

/**
 * @desc 渲染完成后执行
 */
function mountDid(self) {
    // 如果只有一页，默认显示第一页
    var $first = $(self).find('.h5ds-swiper-page');
    if ($first.length === 1) {
        $first.eq(0).addClass('h5ds-swiper-current');
        $first.eq(0).find('.h5ds-swiper-layers').css('display', 'block');
    }

    // 实例化交互方法
    (0, _h5dsUe.initH5dsSwiperUeFun)(self);

    // 页面切换
    $(document).on('click', '.h5ds-pagenext', function () {
        self.toPage(self.pageIndex + 1);
    }).on('click', '.h5ds-pageprev', function () {
        self.toPage(self.pageIndex - 1);
    });

    $(document).trigger('h5ds.mountDid', { self: self });
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(mountDid, 'mountDid', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.mount.did.js');
}();

;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initH5dsSwiperUeFun = initH5dsSwiperUeFun;

var _h5dsSwiper = __webpack_require__(16);

// 交互事件
function initH5dsSwiperUeFun(swiper) {
    $(document).find('[data-uefun]').each(function () {
        var $this = $(this);
        var obj = $this.attr('data-uefun'); //
        // console.log('交互事件 > ', obj, swiper);
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
                            // console.log(obj, key);
                            switch (key) {
                                case 'link':
                                    toLink(obj[key], $this, swiper);
                                    break;
                                case 'toPage':
                                    toPage(obj[key], $this, swiper);
                                    break;
                                case 'tel':
                                    toTel(obj[key], $this, swiper);
                                    break;
                                case 'msg':
                                    toMsg(obj[key], $this, swiper);
                                    break;
                                case 'hideShow':
                                    toHideShow(obj[key], $this, swiper);
                                    break;
                            }
                        }
                    }
                });
            }
        }
    });
} // import { initMap } from './h5ds.utils';

window;

// 超链接
function toLink(obj, $layer, swiper) {
    location.href = obj;
}

// 发短信
function toMsg(obj, $layer, swiper) {
    location.href = 'sms:' + obj;
}

// 打电话
function toTel(obj, $layer, swiper) {
    location.href = 'tel:' + obj;
}

// 页面跳转
function toPage(obj, $layer, swiper) {
    if (swiper) {
        swiper.toPage(obj);
    }
}

// 隐藏显示元素
function toHideShow(obj, $layer, swiper) {
    var ids = [];
    try {
        ids = obj.ids.split(',');
    } catch (e) {
        // ...
        console.warn('obj.data.ids 为 null');
    }
    console.log('ids', ids);
    if (obj.type === 'hide') {
        ids.forEach(function (elem, index) {
            $(elem).hide();
            (0, _h5dsSwiper.swiperAfter)(window.toHideShowCache, $(elem));
        });
    } else if (obj.type === 'show') {
        ids.forEach(function (elem, index) {
            $(elem).show();
            window.toHideShowCache = $layer.closest('.h5ds-swiper-page');
            (0, _h5dsSwiper.swiperAfter)($(elem), window.toHideShowCache);
        });
    } else if (obj.type === 'hideshow') {
        ids.forEach(function (elem, index) {
            var $dom = $(elem);
            if ($dom.is(':hidden')) {
                $dom.show();
                window.toHideShowCache = $layer.closest('.h5ds-swiper-page');
                (0, _h5dsSwiper.swiperAfter)($(elem), window.toHideShowCache);
            } else {
                $dom.hide();
                (0, _h5dsSwiper.swiperAfter)(window.toHideShowCache, $(elem));
            }
        });
    } else {
        // ...
    }
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(initH5dsSwiperUeFun, 'initH5dsSwiperUeFun', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.ue.js');

    __REACT_HOT_LOADER__.register(toLink, 'toLink', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.ue.js');

    __REACT_HOT_LOADER__.register(toMsg, 'toMsg', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.ue.js');

    __REACT_HOT_LOADER__.register(toTel, 'toTel', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.ue.js');

    __REACT_HOT_LOADER__.register(toPage, 'toPage', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.ue.js');

    __REACT_HOT_LOADER__.register(toHideShow, 'toHideShow', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.ue.js');
}();

;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountWill = mountWill;
/**
 * @desc 初始化swiper 之前执行
 */
function mountWill(self) {
  $(document).trigger('h5ds.mountWill', { self: self });
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(mountWill, 'mountWill', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.mount.will.js');
}();

;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toFixed = toFixed;
exports.exChangeArr = exChangeArr;
/**
 * @desc 保留n位小数
 */
function toFixed(val, num) {
    if (val) {
        var arr = (val + '').split('.');
        if (arr[1]) {
            var dot = arr[1] || '';
            if (dot.length > 2) {
                dot = dot.substr(0, 2);
            }
            val = parseFloat(arr[0] + '.' + dot);
        } else {
            val = parseInt(val);
        }
    } else {
        val = 0;
    }
    return val;
}

/**
 * @desc 交换数组位置
 */
function exChangeArr(arr, obj) {
    if (obj instanceof Object) {
        var i = obj.to,
            j = obj.from;
        var _ref = [arr[j], arr[i]];
        arr[i] = _ref[0];
        arr[j] = _ref[1];
    } else {
        console.error('exChangeArr 参数错误！');
    }
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(toFixed, 'toFixed', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/math.js');

    __REACT_HOT_LOADER__.register(exChangeArr, 'exChangeArr', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/math.js');
}();

;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/switch");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/radio");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/switch/style");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/radio/style");

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _defineProperty2 = __webpack_require__(14);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _radio = __webpack_require__(41);

var _radio2 = _interopRequireDefault(_radio);

__webpack_require__(43);

__webpack_require__(101);

var _indexedDB = __webpack_require__(15);

var db = _interopRequireWildcard(_indexedDB);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SetColor = __webpack_require__(45);

var _SetColor2 = _interopRequireDefault(_SetColor);

var _imgURLClear = __webpack_require__(47);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroup = _radio2.default.Group; // indexedDB

var RadioButton = _radio2.default.Button;

var BackGround = function (_Component) {
    (0, _inherits3.default)(BackGround, _Component);

    function BackGround(props) {
        (0, _classCallCheck3.default)(this, BackGround);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BackGround.__proto__ || (0, _getPrototypeOf2.default)(BackGround)).call(this, props));

        _this.onChange = function () {
            return _this.__onChange__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.showSourceImgs = function () {
            return _this.__showSourceImgs__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.sliderDo = function () {
            return _this.__sliderDo__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.changeColor = function () {
            return _this.__changeColor__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.cropImg = function () {
            return _this.__cropImg__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        var _ref = props.dataStyle || {},
            backgroundColor = _ref.backgroundColor,
            backgroundImage = _ref.backgroundImage,
            backgroundRepeat = _ref.backgroundRepeat,
            backgroundSize = _ref.backgroundSize;

        var opacity = 1;
        if (!backgroundColor) {
            backgroundColor = '#000000';
        } else {
            opacity = backgroundColor.colorOpacity();
            backgroundColor = backgroundColor.colorHex();
        }
        if (!backgroundRepeat) {
            backgroundRepeat = 'no-repeat';
        }
        if (!backgroundSize) {
            backgroundSize = 'initial';
        }
        if (!backgroundImage || backgroundImage === 'none') {
            backgroundImage = '';
        } else {
            backgroundImage = backgroundImage.replace(/url\((.+)\)/, '$1');
        }
        _this.state = {
            backgroundColor: backgroundColor,
            backgroundRepeat: backgroundRepeat,
            backgroundSize: backgroundSize,
            backgroundImage: backgroundImage,
            opacity: opacity
        };

        _this.cropName = 'backgroundcrop';
        _this.oldsrc = backgroundImage ? backgroundImage : '';

        if (!props.actionType) {
            console.error('BackGround 组件必须传入一个 actionType');
        }

        return _this;
    }

    (0, _createClass3.default)(BackGround, [{
        key: '__onChange__REACT_HOT_LOADER__',


        // 显示图片列表
        value: function __onChange__REACT_HOT_LOADER__(obj) {
            if (this.props.onChange) {
                this.props.onChange(obj);
            }
        }
    }, {
        key: '__showSourceImgs__REACT_HOT_LOADER__',
        value: function __showSourceImgs__REACT_HOT_LOADER__(e) {
            $(document).trigger('h5ds.showImgSource', this.props.actionType);
        }
    }, {
        key: '__sliderDo__REACT_HOT_LOADER__',


        // 颜色变化
        value: function __sliderDo__REACT_HOT_LOADER__(val, key) {
            this.setState((0, _defineProperty3.default)({}, key, val));
            this.onChange((0, _defineProperty3.default)({}, key, val));
        }
    }, {
        key: '__changeColor__REACT_HOT_LOADER__',


        // 裁剪图片
        value: function __changeColor__REACT_HOT_LOADER__(obj) {
            this.onChange({
                backgroundColor: obj.color
            });
        }
    }, {
        key: '__cropImg__REACT_HOT_LOADER__',
        value: function __cropImg__REACT_HOT_LOADER__() {
            var _this2 = this;

            this.$crop = $('#bgCrop');
            var backgroundImage = this.state.backgroundImage;

            if (backgroundImage) {
                // 实例化裁剪
                this.crop = this.$crop.crop({
                    name: this.cropName
                });
                // 绑定剪切事件
                this.$crop.on('crop.' + this.cropName, function (e, data) {
                    console.log('xxx', data);
                    // 还原图片
                    if (typeof data === 'string') {
                        // callback('reset');
                        _this2.sliderDo('url(' + data + ')', 'backgroundImage');
                    } else {
                        // 图片上传
                        var temp = +new Date();
                        var imgURL = (0, _imgURLClear.base64ToUrl)(data.imgData, temp);
                        // 存储图片到本地，提交的时候，再统一上传到服务器
                        db.addData('img', [{
                            id: temp,
                            value: data.imgData
                        }], function () {
                            _this2.sliderDo('url(' + imgURL + ')', 'backgroundImage');
                        });
                    }
                });

                // 换图
                this.$crop.off('cropchange.' + this.cropName).on('cropchange.' + this.cropName, function (e) {
                    _this2.showSourceImgs();
                });

                // 清除背景图
                this.$crop.off('cropdel.' + this.cropName).on('cropdel.' + this.cropName, function (e) {
                    // 图片特殊处理, 这里只是清除图片。并没有删除图层
                    _this2.crop && _this2.crop.distory();
                    _this2.sliderDo('', 'backgroundImage');
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.cropImg();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.crop && this.crop.distory();
            this.$crop.off('cropdel.' + this.cropName);
            this.$crop.off('cropchange.' + this.cropName);
            this.$crop.off('crop.' + this.cropName);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var imgTpl = _react2.default.createElement(
                'div',
                { className: 'a-selectimg img-null', onClick: this.showSourceImgs },
                '\u9009\u62E9\u56FE\u7247'
            );
            var _state = this.state,
                backgroundColor = _state.backgroundColor,
                backgroundRepeat = _state.backgroundRepeat,
                backgroundImage = _state.backgroundImage,
                backgroundSize = _state.backgroundSize,
                opacity = _state.opacity;

            return _react2.default.createElement(
                'div',
                { className: 'background' },
                _react2.default.createElement(
                    'div',
                    { className: 'tr' },
                    '\u9875\u9762\u80CC\u666F\uFF1A'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'set-img set_img' },
                    _react2.default.createElement(
                        'div',
                        {
                            id: 'bgCrop',
                            'data-src': backgroundImage ? backgroundImage.replace(/url\((.+)\)/g, '$1') : '',
                            'data-oldsrc': this.oldsrc,
                            className: 'set_img_crop'
                        },
                        !backgroundImage ? imgTpl : null
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'set-bg' },
                    _react2.default.createElement(
                        'div',
                        { className: 'tr' },
                        _react2.default.createElement(
                            'span',
                            { className: 'title' },
                            '\u80CC\u666F\u6A21\u5F0F:'
                        ),
                        _react2.default.createElement(
                            RadioGroup,
                            {
                                size: 'small',
                                onChange: function onChange(e) {
                                    return _this3.sliderDo(e.target.value, 'backgroundRepeat');
                                },
                                value: backgroundRepeat
                            },
                            _react2.default.createElement(
                                RadioButton,
                                { value: 'no-repeat' },
                                '\u9ED8\u8BA4'
                            ),
                            _react2.default.createElement(
                                RadioButton,
                                { value: 'repeat-x' },
                                'X\u5E73\u94FA'
                            ),
                            _react2.default.createElement(
                                RadioButton,
                                { value: 'repeat-y' },
                                'Y\u5E73\u94FA'
                            ),
                            _react2.default.createElement(
                                RadioButton,
                                { value: 'repeat' },
                                '\u5E73\u94FA'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'tr' },
                        _react2.default.createElement(
                            'span',
                            { className: 'title' },
                            '\u80CC\u666F\u5C3A\u5BF8:'
                        ),
                        _react2.default.createElement(
                            RadioGroup,
                            {
                                size: 'small',
                                onChange: function onChange(e) {
                                    return _this3.sliderDo(e.target.value, 'backgroundSize');
                                },
                                value: backgroundSize
                            },
                            _react2.default.createElement(
                                RadioButton,
                                { value: 'initial' },
                                '\u9ED8\u8BA4'
                            ),
                            _react2.default.createElement(
                                RadioButton,
                                { value: 'contain' },
                                '\u9002\u914D'
                            ),
                            _react2.default.createElement(
                                RadioButton,
                                { value: 'cover' },
                                '\u62C9\u4F38'
                            )
                        )
                    )
                ),
                _react2.default.createElement(_SetColor2.default, { color: backgroundColor, onChange: this.changeColor })
            );
        }
    }]);
    return BackGround;
}(_react.Component);

exports.default = BackGround;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(RadioGroup, 'RadioGroup', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/publicSet/BackGround.jsx');

    __REACT_HOT_LOADER__.register(RadioButton, 'RadioButton', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/publicSet/BackGround.jsx');

    __REACT_HOT_LOADER__.register(BackGround, 'BackGround', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/publicSet/BackGround.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _slider = __webpack_require__(24);

var _slider2 = _interopRequireDefault(_slider);

var _defineProperty2 = __webpack_require__(14);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(25);

__webpack_require__(102);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Colors = __webpack_require__(46);

var _Colors2 = _interopRequireDefault(_Colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SetColor = function (_Component) {
    (0, _inherits3.default)(SetColor, _Component);

    function SetColor(props) {
        (0, _classCallCheck3.default)(this, SetColor);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SetColor.__proto__ || (0, _getPrototypeOf2.default)(SetColor)).call(this, props));

        _this.onChange = function () {
            return _this.__onChange__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setColor = function () {
            return _this.__setColor__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.clearColor = function () {
            return _this.__clearColor__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.sliderDo = function () {
            return _this.__sliderDo__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        var color = props.color;

        var opacity = 1;
        if (!color || color === 'none') {
            color = '#000000';
        } else {
            opacity = color.colorOpacity();
            color = color.colorHex();
        }
        _this.state = {
            opacity: opacity,
            color: color
        };
        return _this;
    }

    // change


    (0, _createClass3.default)(SetColor, [{
        key: '__onChange__REACT_HOT_LOADER__',


        // 设置颜色
        value: function __onChange__REACT_HOT_LOADER__(obj) {
            if (this.props.onChange) {
                this.props.onChange(obj);
            }
        }
    }, {
        key: '__setColor__REACT_HOT_LOADER__',


        // 清除颜色
        value: function __setColor__REACT_HOT_LOADER__(color) {
            this.setState({
                color: color.hex
            });
            this.onChange({
                color: 'rgba(' + color.rgb.r + ', ' + color.rgb.g + ', ' + color.rgb.b + ', ' + this.state.opacity + ')'
            });
        }
    }, {
        key: '__clearColor__REACT_HOT_LOADER__',


        // sliderDo
        value: function __clearColor__REACT_HOT_LOADER__() {
            this.setState({
                color: '#000',
                opacity: 1
            });
            this.onChange({
                color: ''
            });
        }
    }, {
        key: '__sliderDo__REACT_HOT_LOADER__',
        value: function __sliderDo__REACT_HOT_LOADER__(val, key, end) {
            this.setState((0, _defineProperty3.default)({}, key, val));
            var color = this.state.color;

            this.onChange({
                color: color.colorRgba(val)
            });
            if (key === 'opacity' && end) {
                if (this.props.afterChange) {
                    this.props.afterChange({
                        color: color.colorRgba(val)
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                color = _state.color,
                opacity = _state.opacity;
            var title = this.props.title;

            return _react2.default.createElement(
                'div',
                { className: 'set-bgcolor' },
                _react2.default.createElement(
                    'div',
                    { className: 'tr' },
                    _react2.default.createElement(
                        'span',
                        { className: 'title' },
                        title || '背景底色',
                        ':'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'h5ds-color' },
                        _react2.default.createElement(_Colors2.default, { onChange: this.setColor, color: color }),
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u900F\u660E\u5EA6\uFF1A'
                        ),
                        _react2.default.createElement(_slider2.default, {
                            onAfterChange: function onAfterChange(e) {
                                return _this2.sliderDo(e, 'opacity', true);
                            },
                            style: { width: 95 },
                            onChange: function onChange(e) {
                                _this2.sliderDo(e, 'opacity');
                            },
                            tipFormatter: null,
                            step: 0.1,
                            min: 0,
                            max: 1,
                            value: opacity
                        }),
                        _react2.default.createElement(
                            'a',
                            { onClick: this.clearColor, className: 'h5ds-color-clear' },
                            _react2.default.createElement('i', { className: 'h5ds ico5-eraser' }),
                            '\u6E05\u9664'
                        )
                    )
                )
            );
        }
    }]);
    return SetColor;
}(_react.Component);

exports.default = SetColor;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(SetColor, 'SetColor', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/bgcolor/SetColor.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(103);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactColor = __webpack_require__(104);

var _util = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Colors = function (_Component) {
    (0, _inherits3.default)(Colors, _Component);

    function Colors(props) {
        (0, _classCallCheck3.default)(this, Colors);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Colors.__proto__ || (0, _getPrototypeOf2.default)(Colors)).call(this, props));

        _this.showPicker = function () {
            return _this.__showPicker__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.changeColor = function () {
            return _this.__changeColor__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {
            colorStyle: {},
            show: false,
            color: props.color || '#000'
        };
        _this.id = (0, _util.getRandomID)(6);
        return _this;
    }

    (0, _createClass3.default)(Colors, [{
        key: '__showPicker__REACT_HOT_LOADER__',
        value: function __showPicker__REACT_HOT_LOADER__(e) {
            // 获取当前对象的位置。设置colorStyle 220 * 246
            var colorStyle = {};
            if (window.innerWidth < $(e.target).offset().left + 220) {
                colorStyle.left = window.innerWidth - ($(e.target).offset().left + 220);
            }
            if (window.innerHeight < $(e.target).offset().top + 246) {
                colorStyle.top = window.innerHeight - ($(e.target).offset().top + 246 + 10);
            }
            this.setState({ show: !this.state.show, colorStyle: colorStyle });
        }
    }, {
        key: '__changeColor__REACT_HOT_LOADER__',
        value: function __changeColor__REACT_HOT_LOADER__(color) {
            var onChange = this.props.onChange;

            this.setState({
                color: color.hex
            }, function () {
                if (onChange) {
                    onChange(color);
                }
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            var color = props.color;

            this.setState({
                color: color
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            $(document).on('click.blank_' + this.id, function (e) {
                if (!$(e.target).closest('.mt-color')[0]) {
                    _this2.setState({
                        show: false
                    });
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $(document).off('click.blank_' + this.id);
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                show = _state.show,
                color = _state.color,
                colorStyle = _state.colorStyle;
            var children = this.props.children;

            return _react2.default.createElement(
                'div',
                { className: 'mt-color' },
                children ? _react2.default.createElement(
                    'span',
                    { onClick: this.showPicker },
                    children
                ) : _react2.default.createElement('span', { className: 'color-btn', style: { backgroundColor: color }, onClick: this.showPicker }),
                show ? _react2.default.createElement(
                    'div',
                    { className: 'more-colors', style: (0, _extends3.default)({}, colorStyle) },
                    _react2.default.createElement(_reactColor.SketchPicker, { presetColors: [], color: color, onChange: this.changeColor })
                ) : null
            );
        }
    }]);
    return Colors;
}(_react.Component);

exports.default = Colors;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Colors, 'Colors', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/colors/Colors.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imgURLClear = imgURLClear;
exports.convertBase64UrlToBlob = convertBase64UrlToBlob;
exports.base64ToUrl = base64ToUrl;

var _indexedDB = __webpack_require__(15);

var _util = __webpack_require__(8);

// @param obj：对应层的obj对象 type:object，imgCacheObj 所有的图片缓存 type:[]
// 清理 style.background 和 data.src
function clearStyleImg(obj, imgCacheObj) {
    // 过滤背景
    if (obj['style'] && obj.style['backgroundImage']) {
        var url = obj.style['backgroundImage'] || '';
        // console.log(url);
        if (url.isBlob()) {
            var temp = url.split('#')[1];
            obj.style['backgroundImage'] = base64ToUrl(imgCacheObj[temp], temp);
            // 这里应该有个BUG  url(xxxx);
        }
    }

    // 过滤 data
    if (obj['data'] && obj.data['src']) {
        var _url = obj.data['src'] || '';
        // console.log(url);
        if (_url.isBlob()) {
            var _temp = _url.split('#')[1];
            obj.data['src'] = base64ToUrl(imgCacheObj[_temp], _temp);
        }
    }
}

// @param data : APP本地缓存数据， callback: 数据清洗后的回调函数
// 数据清洗
function imgURLClear(data, callback) {
    // 从本地数据库去拿缓存图片
    (0, _indexedDB.openDB)().then(function (res) {
        if (!res) {
            return;
        }
        // 获取全部缓存图片
        (0, _indexedDB.getAllData)('img', function (arr) {
            if (arr.length > 0) {
                // 图片的缓存对象
                var imgCacheObj = (0, _util.arrToObj)(arr);

                // 过滤 APP
                clearStyleImg(data, imgCacheObj);
                ['pages', 'popups', 'fixeds'].forEach(function (type) {
                    for (var i = 0; i < data[type].length; i++) {
                        // 过滤 pages
                        clearStyleImg(data[type][i], imgCacheObj);
                        for (var j = 0; j < data[type][i].layers.length; j++) {
                            // 过滤 layers
                            clearStyleImg(data[type][i].layers[j], imgCacheObj);
                        }
                    }
                });

                callback();
            } else {
                // 无缓存图片
                callback();
            }
        });
    });
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
    if (!base64) {
        return false;
    }
    var URL = window.URL || window.webkitURL;
    // 通过 file 生成目标 url
    return URL.createObjectURL(convertBase64UrlToBlob(base64)) + ('#' + temp);
}
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(clearStyleImg, 'clearStyleImg', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/imgURLClear.js');

    __REACT_HOT_LOADER__.register(imgURLClear, 'imgURLClear', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/imgURLClear.js');

    __REACT_HOT_LOADER__.register(convertBase64UrlToBlob, 'convertBase64UrlToBlob', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/imgURLClear.js');

    __REACT_HOT_LOADER__.register(base64ToUrl, 'base64ToUrl', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/imgURLClear.js');
}();

;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/modal");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/modal/style");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ispc = ispc;
exports.isBuild = isBuild;
exports.lazyLoad = lazyLoad;
exports.autoPlayMusic = autoPlayMusic;
exports.setSize = setSize;
exports.getScale = getScale;
exports.isWeiXin = isWeiXin;
exports.setAdsorbent = setAdsorbent;
exports.langPage = langPage;

var _set = __webpack_require__(12);

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
function ispc() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
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
 * @desc 判断是否是生成的页面
 */
function isBuild() {
    var isbuild = false;
    try {
        IMG_SOURCE;
        isbuild = true;
    } catch (e) {
        isbuild = false;
    }
    return isbuild;
}

/**
 * @desc 图片进行预加载
 */
function lazyLoad() {
    // 进度条，绑定事件
    var settime = null;
    var $loading = $('#h5dsLoading');
    var $h5dsProgress = $('#h5dsProgress');
    $loading.show();
    $(document).on('loadbar', function (e, pre) {
        console.log('pre>>>', pre);
        $h5dsProgress.text(pre.toFixed(2) * 100 + '%');
        if (pre === 1) {
            setTimeout(function () {
                $loading.hide();
                // 自动播放音乐
                autoPlayMusic();
                $(document).trigger('h5ds.loadingEnd', '#h5dsSwiper');
            }, 200);
        }
    });

    // ...
    var maxLoad = 20; // 默认加载20个
    var imgSource = [];
    try {
        if ($.isArray(IMG_SOURCE)) {
            imgSource = IMG_SOURCE;
        } else {
            imgSource = JSON.parse(IMG_SOURCE);
        }
        imgSource = uniqueArr(imgSource); // 去重，重复图片不再加载
    } catch (e) {}
    // IMG_SOURCE 未定义


    // 完成
    if (imgSource.length === 0) {
        $(document).trigger('loadbar', 1);
    } else {
        var num = 0;
        var triggerLoad = function triggerLoad() {
            if (num / imgSource.length === 1) {
                settime && clearTimeout(settime);
            }
            $(document).trigger('loadbar', num / imgSource.length);
        };
        // 默认加载前20个图
        imgSource.forEach(function (elem, index) {
            if (index > maxLoad) {
                return;
            }
            var img = new Image();
            img.onload = function () {
                num++;
                triggerLoad();
            };
            img.onerror = function () {
                num++;
                triggerLoad();
            };
            img.src = elem;
            // img.onload = triggerLoad;
            // img.onerror = triggerLoad;
        });
    }

    // 如果5秒后，还没载入数据完成，直接显示
    settime = setTimeout(function () {
        $(document).trigger('loadbar', 1);
    }, 5000);
}

/**
 * @desc 音乐播放
 */
function autoPlayMusic() {
    var $audio = $('#h5dsBgMusic');
    var $icon = $('.h5ds-video-icon');
    var src = $audio.attr('src');
    if ($audio[0] && src !== '') {
        try {
            $audio[0].src = src;
            $audio[0].play();
            $(document).one('WeixinJSBridgeReady', function () {
                $audio[0].play();
            });
            $icon.addClass('h5ds-video-iconing');
        } catch (e) {
            console.error('音乐地址有错！');
        }
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
 * @desc 设置自动适配的尺寸
 */
function setSize($box, scale, fixed) {
    var width = fixed ? _set.appWidth : $box.width(),
        height = fixed ? _set.appHeight : $box.height();
    var _window = window,
        innerWidth = _window.innerWidth,
        innerHeight = _window.innerHeight;

    var top = (innerHeight - height * scale) / 2;
    if (top < 0) {
        top = 0;
    }
    $box.css({
        left: (innerWidth - width * scale) / 2,
        top: top,
        transform: 'scale(' + scale + ')'
    });
}

/**
 * @desc 计算sacle 和 偏移
 */
function getScale() {
    var width = _set.appWidth;
    var height = _set.appHeight;
    // 自动适配
    var _window2 = window,
        innerWidth = _window2.innerWidth,
        innerHeight = _window2.innerHeight;
    // 假设宽度适配 scale * width = innerWidth

    var scale1 = innerWidth / width;
    // 假设高度适配 scale * height = innerHeigh
    var scale2 = innerHeight / height;
    return scale1 > scale2 ? scale2 : scale1;
}

//判断是否微信登陆
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    // console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

/**
 * @desc 设置吸附效果
 */
function setAdsorbent() {
    var scale = getScale();
    var setAdsorbent = function setAdsorbent(exHeight) {
        var $this = $(this);
        var adsorbent = JSON.parse($this.attr('data-adsorbent'));

        var style = {};
        if (adsorbent.abottom !== undefined) {
            style.bottom = -exHeight / scale > 0 ? 0 : -exHeight / scale;
        }
        if (adsorbent.atop !== undefined) {
            style.top = 0;
        }
        if (adsorbent.aleft !== undefined) {
            style.left = 0;
        }
        if (adsorbent.aright !== undefined) {
            style.right = 0;
        }
        $this.css(style);
    };
    // 设置吸附效果
    var doAdsorbent = function doAdsorbent(target) {
        var $target = $(target);
        if (!$target[0]) {
            return;
        }
        var $layers = $target.children().children().children();
        var innerHeight = $layers.height() * scale;
        var exHeight = (window.innerHeight - innerHeight) / 2;
        $target.find('[data-adsorbent]').each(function () {
            setAdsorbent.bind(this)(exHeight);
        });
    };

    doAdsorbent('#h5dsSwiper');
    doAdsorbent('#h5dsFixedsUp');
    doAdsorbent('#h5dsFixedsDown');
    doAdsorbent('#h5dsPopups');
}

/**
 * @desc 监听 长页
 */
function langPage() {
    // 长页控制
    $('#h5dsSwiper').find('[data-langpage="true"]').each(function () {
        // 如果有上一页，或者下一页
        var $page = $(this).parent('.h5ds-swiper-page');
        var $layers = $(this).children();
        if ($page.prev()[0]) {
            $layers.append('<div class="h5ds-pageprev">\u4E0A</div>');
        }
        if ($page.next()[0]) {
            $layers.append('<div class="h5ds-pagenext">\u4E0B</div>');
        }
    });
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(uniqueArr, 'uniqueArr', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.utils.js');

    __REACT_HOT_LOADER__.register(ispc, 'ispc', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.utils.js');

    __REACT_HOT_LOADER__.register(isBuild, 'isBuild', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.utils.js');

    __REACT_HOT_LOADER__.register(lazyLoad, 'lazyLoad', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.utils.js');

    __REACT_HOT_LOADER__.register(autoPlayMusic, 'autoPlayMusic', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.utils.js');

    __REACT_HOT_LOADER__.register(setSize, 'setSize', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.utils.js');

    __REACT_HOT_LOADER__.register(getScale, 'getScale', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.utils.js');

    __REACT_HOT_LOADER__.register(isWeiXin, 'isWeiXin', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.utils.js');

    __REACT_HOT_LOADER__.register(setAdsorbent, 'setAdsorbent', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.utils.js');

    __REACT_HOT_LOADER__.register(langPage, 'langPage', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.utils.js');
}();

;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;

var _throttle = __webpack_require__(120);

/**
 * @desc 函数防抖 
 * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
 * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
 * @example 适用场景：如在线编辑的自动存储防抖。
 * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}  atBegin       可选，默认为false。
 *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
                                    如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
 * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                  执行去抖动功能时，，调用`callback`。
 *
 * @return {Function} 新的防抖函数。
 */
function debounce(delay, atBegin, callback) {
  return callback === undefined ? (0, _throttle.throttle)(delay, atBegin, false) : (0, _throttle.throttle)(delay, callback, atBegin !== false);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(debounce, 'debounce', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/debounce.js');
}();

;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(138);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _util = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc by Mantou tab 切换
 */
var Tabs = function (_Component) {
    (0, _inherits3.default)(Tabs, _Component);

    function Tabs(props) {
        (0, _classCallCheck3.default)(this, Tabs);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Tabs.__proto__ || (0, _getPrototypeOf2.default)(Tabs)).call(this, props));

        _this.tabChange = function () {
            return _this.__tabChange__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {
            active: props.active || 0
        };
        return _this;
    }

    // 切换


    (0, _createClass3.default)(Tabs, [{
        key: '__tabChange__REACT_HOT_LOADER__',


        // 更新视图
        value: function __tabChange__REACT_HOT_LOADER__(elem, index) {
            var onChange = this.props.onChange;
            // console.log(index);

            this.setState({
                active: index
            }, function () {
                if (onChange) {
                    onChange(elem, index);
                }
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (!(0, _util.isNot)(props.active) && props.active !== this.state.active) {
                this.setState({
                    active: props.active
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var temp = +new Date();
            var active = this.state.active;
            var _props = this.props,
                children = _props.children,
                className = _props.className;

            var cName = ['h5ds-tab'];
            if (className) {
                cName.push(className);
            }
            return _react2.default.createElement(
                'div',
                { className: cName.join(' ') },
                _react2.default.createElement(
                    'div',
                    { className: 'h5ds-tab-header' },
                    _react2.default.createElement(
                        'ul',
                        null,
                        children.map(function (elem, index) {
                            if (elem) {
                                return _react2.default.createElement(
                                    'li',
                                    {
                                        key: elem.key ? elem.key : index + temp,
                                        onClick: function onClick(e) {
                                            return _this2.tabChange(elem, index);
                                        },
                                        className: 'h5ds-tab-head' + (active === index ? ' h5ds-active' : '')
                                    },
                                    elem.props.title
                                );
                            }
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'h5ds-tab-body' },
                    children.map(function (elem, index) {
                        if (elem) {
                            return _react2.default.createElement(
                                'div',
                                {
                                    key: elem.key ? elem.key : index + temp,
                                    id: elem.props.id,
                                    className: 'h5ds-tab-box' + (active === index ? ' h5ds-active' : '')
                                },
                                elem.props.children
                            );
                        }
                    })
                )
            );
        }
    }]);
    return Tabs;
}(_react.Component);

// 自定义的item 这里只是为了定义一个标签名称


exports.default = Tabs;

var Item = function (_Component2) {
    (0, _inherits3.default)(Item, _Component2);

    // 构造函数
    function Item(props) {
        (0, _classCallCheck3.default)(this, Item);
        return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).call(this, props));
    }

    (0, _createClass3.default)(Item, [{
        key: 'render',
        value: function render() {
            return null;
        }
    }]);
    return Item;
}(_react.Component);

Tabs.Item = Item;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Tabs, 'Tabs', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/tabs/Tabs.jsx');

    __REACT_HOT_LOADER__.register(Item, 'Item', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/tabs/Tabs.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(94);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Center = function (_Component) {
    (0, _inherits3.default)(Center, _Component);

    function Center() {
        (0, _classCallCheck3.default)(this, Center);
        return (0, _possibleConstructorReturn3.default)(this, (Center.__proto__ || (0, _getPrototypeOf2.default)(Center)).apply(this, arguments));
    }

    (0, _createClass3.default)(Center, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                tips = _props.tips,
                body = _props.body;

            return _react2.default.createElement(
                'div',
                { className: 'h5ds-loading-window' },
                body ? body : _react2.default.createElement(
                    'div',
                    { className: 'h5ds-loading-center' },
                    _react2.default.createElement(
                        'div',
                        { className: 'h5ds-loadbox' },
                        tips ? tips : 'loading...'
                    )
                )
            );
        }
    }]);
    return Center;
}(_react.Component);

exports.default = Center;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Center, 'Center', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/loading/Loading.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/popover");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/popover/style");

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combin = exports.setCombinHTML = undefined;

var _layer = __webpack_require__(97);

var _CombinEditor = __webpack_require__(98);

var _CombinEditor2 = _interopRequireDefault(_CombinEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _CombinEditor2.default;
exports.default = _default;
exports.setCombinHTML = _layer.setCombinHTML;
exports.combin = _layer.combin;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/combin/index.js');
}();

;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/popconfirm");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/popconfirm/style");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/input");

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/input/style");

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _upload = __webpack_require__(116);

var _upload2 = _interopRequireDefault(_upload);

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(117);

__webpack_require__(10);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Uploads = function (_Component) {
    (0, _inherits3.default)(Uploads, _Component);

    function Uploads() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Uploads);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Uploads.__proto__ || (0, _getPrototypeOf2.default)(Uploads)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function () {
            var _this2;

            return (_this2 = _this).__handleChange__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    /**
     * @desc 上传
     */


    (0, _createClass3.default)(Uploads, [{
        key: '__handleChange__REACT_HOT_LOADER__',
        value: function __handleChange__REACT_HOT_LOADER__(info) {
            var file = info.file;
            if (file.status === 'uploading') {
                // this.setState({ loading: true });
                return;
            }
            if (file.status === 'done') {
                // let url = file.response.data.url;
                if (this.props.uploadEnd) {
                    this.props.uploadEnd(file.response);
                }
            }
        }
    }, {
        key: 'beforeUpload',
        value: function beforeUpload(file) {
            var fileType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            if (!fileType) {
                _message3.default.error('请上传格式为jpg,png,gif的图片!');
            }
            var isLt1M = file.size / 1024 / 1024 < 1;
            if (!isLt1M) {
                _message3.default.error('请上传小于1M的图片!');
            }
            return fileType && isLt1M;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                data = _props.data,
                children = _props.children,
                action = _props.action,
                _props$headers = _props.headers,
                headers = _props$headers === undefined ? {} : _props$headers;

            if (!action) {
                console.error('请正确配置上传接口');
                return null;
            }
            var set = {
                action: action,
                headers: headers,
                showUploadList: false,
                beforeUpload: this.beforeUpload,
                onChange: this.handleChange,
                data: data
            };
            return _react2.default.createElement(
                _upload2.default,
                set,
                ' ',
                children
            );
        }
    }]);
    return Uploads;
}(_react.Component);

exports.default = Uploads;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Uploads, 'Uploads', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/upload/Upload.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @desc 翻页动画集合, 翻页动画CSS3 ：
 */
var sliderAnimate = exports.sliderAnimate = [{
    name: '上下平滑',
    inNext: 'pt-page-moveFromBottom', // 进入动画
    outNext: 'pt-page-moveToTop', // 出去动画
    inPrev: 'pt-page-moveFromTop', // 进入动画
    outPrev: 'pt-page-moveToBottom' // 出去动画
}, {
    name: '上下隐藏',
    inNext: 'pt-page-moveFromBottomFade', // 进入动画
    outNext: 'pt-page-moveToTopFade', // 出去动画
    inPrev: 'pt-page-moveFromTopFade', // 进入动画
    outPrev: 'pt-page-moveToBottomFade' // 出去动画
}, {
    name: '上下移动缓动',
    inNext: 'pt-page-moveFromBottom', // 进入动画
    outNext: 'pt-page-moveToTopEasing', // 出去动画
    inPrev: 'pt-page-moveFromTop', // 进入动画
    outPrev: 'pt-page-moveToBottomEasing' // 出去动画
}, {
    name: '上下3D盒子切换',
    inNext: 'pt-page-rotateCubeTopIn3', // 进入动画
    outNext: 'pt-page-rotateCubeTopOut3', // 出去动画
    inPrev: 'pt-page-rotateCubeDownIn3', // 进入动画
    outPrev: 'pt-page-rotateCubeDownOut3' // 出去动画
}, {
    name: '上下放大',
    outNext: 'pt-page-scaleDownUp', // 出去动画
    inNext: 'pt-page-scaleUpCenter', // 进入动画
    outPrev: 'pt-page-scaleDownUp', // 出去动画
    inPrev: 'pt-page-scaleUpCenter' // 进入动画
}, {
    name: '旋转风车',
    outNext: 'pt-page-rotateOutNewspaper', // 出去动画
    inNext: 'pt-page-rotateInNewspaper', // 进入动画
    outPrev: 'pt-page-rotateOutNewspaper', // 出去动画
    inPrev: 'pt-page-rotateInNewspaper' // 进入动画
}, {
    name: '上下弹出效果',
    outNext: 'pt-page-rotateCarouselTopOut', // 出去动画
    inNext: 'pt-page-rotateCarouselTopIn', // 进入动画
    outPrev: 'pt-page-rotateCarouselBottomOut', // 出去动画
    inPrev: 'pt-page-rotateCarouselBottomIn' // 进入动画
}, {
    name: '上下翻牌效果',
    outNext: 'pt-page-flipOutTop', // 出去动画
    inNext: 'pt-page-flipInTop', // 进入动画
    outPrev: 'pt-page-flipOutBottom', // 出去动画
    inPrev: 'pt-page-flipInBottom' // 进入动画
}, {
    name: '上下股罗密效果',
    outNext: 'pt-page-rotatePushTop', // 出去动画
    inNext: 'pt-page-rotatePullTop', // 进入动画
    outPrev: 'pt-page-rotatePushBottom', // 出去动画
    inPrev: 'pt-page-rotatePullBottom' // 进入动画
}, {
    name: '3D盒子效果',
    outNext: 'pt-page-rotateCubeTopOut', // 出去动画
    inNext: 'pt-page-rotateCubeTopIn', // 进入动画
    outPrev: 'pt-page-rotateCubeBottomOut', // 出去动画
    inPrev: 'pt-page-rotateCubeBottomIn' // 进入动画
}];
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(sliderAnimate, 'sliderAnimate', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/sliderAnimate.js');
}();

;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _App = __webpack_require__(119);

var _App2 = _interopRequireDefault(_App);

var _LayerFun = __webpack_require__(121);

var _LayerFun2 = _interopRequireDefault(_LayerFun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
    app: new _App2.default(),
    layerfun: new _LayerFun2.default()
};
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(_default, 'default', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/store/index.js');
}();

;
module.exports = exports['default'];

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/define-property");

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(13);

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
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setStorage, 'setStorage', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/localStorage.js');

    __REACT_HOT_LOADER__.register(getStorage, 'getStorage', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/localStorage.js');

    __REACT_HOT_LOADER__.register(clearStorage, 'clearStorage', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/localStorage.js');
}();

;

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/set");

/***/ }),
/* 68 */
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

var _util = __webpack_require__(8);

var _math = __webpack_require__(36);

// 过滤 border  1px solid rgba(0,0,0,0.5)
function borderFilter(border) {
    if (border && border !== 'none') {
        var arr = border.split(' ');
        var opacity = arr[2].colorOpacity();
        if (opacity) {
            opacity = (0, _math.toFixed)(opacity, 2);
        }
        return {
            size: parseInt(arr[0], 10),
            type: arr[1],
            color: arr[2].colorHex() || '#000000',
            opacity: opacity || 1
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
    if (!target || target === 'none') {
        target = '1px solid rgba(0,0,0,1)';
    }
    var exg = /(\d+(px)?\s)(\w+\s)(rgba\((\w+),(\w+),(\w+),(((1|0)?\.)?\d+)\))/;
    if (obj.size !== undefined) {
        target = target.replace(exg, obj.size + 'px $3$4');
    }
    if (!(0, _util.isNot)(obj.color)) {
        // 颜色转换
        var color = obj.color.colorRgba(1, true);
        target = target.replace(exg, '$1$3rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',$8)');
    }
    if (!(0, _util.isNot)(obj.opacity)) {
        target = target.replace(exg, '$1$3rgba($5,$6,$7,' + obj.opacity + ')');
    }
    if (!(0, _util.isNot)(obj.type)) {
        target = target.replace(exg, '$1' + obj.type + ' rgba($5,$6,$7,$8)');
    }
    return target;
}

// 过滤 box-shadow 0 0 5px rgba(0,0,0,.5)
function boxshadowFilter(boxshadow) {
    if (boxshadow && boxshadow !== 'none') {
        var arr = boxshadow.split(' ');
        var opacity = arr[3].colorOpacity();
        if (opacity) {
            opacity = (0, _math.toFixed)(opacity, 2);
        }
        return {
            size: parseInt(arr[2]),
            color: arr[3].colorHex() || '#000000',
            opacity: opacity || 1
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
    if (!target || target === 'none') {
        target = '0px 0px 0px rgba(0,0,0,1)';
    }
    var exg = /(\d+(px)?\s)(\d+(px)?\s)(\d+(px)?\s)(rgba\((\d+),(\d+),(\d+),(((1|0)?\.)?\d+)\))/;
    if (!(0, _util.isNot)(obj.size)) {
        target = target.replace(exg, '$1$3' + obj.size + 'px $7');
    }
    if (!(0, _util.isNot)(obj.color)) {
        // 颜色转换
        var color = obj.color.colorRgba(1, true);
        target = target.replace(exg, '$1$3$5rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',$11)');
    }
    if (!(0, _util.isNot)(obj.opacity)) {
        target = target.replace(exg, '$1$3$5rgba($8,$9,$10,' + obj.opacity + ')');
    }
    return target;
}

// 过滤 animation  animation: name duration timing-function delay iteration-count direction fill-mode play-state;
function animationFilter(animation) {
    if (animation && animation !== 'none') {
        var sArr = animation.split(' ');
        var name = sArr[0],
            duration = (0, _math.toFixed)(sArr[1], 1),
            timing = sArr[2],
            // 动画速度曲线
        delay = (0, _math.toFixed)(sArr[3], 2),
            count = parseInt(sArr[4], 10);
        return {
            name: name,
            duration: duration,
            timing: timing,
            delay: delay,
            count: count,
            direction: 'normal',
            fillMode: 'forwards',
            playState: 'running'
        };
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

;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(borderFilter, 'borderFilter', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/cssFilter.js');

    __REACT_HOT_LOADER__.register(setBorder, 'setBorder', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/cssFilter.js');

    __REACT_HOT_LOADER__.register(boxshadowFilter, 'boxshadowFilter', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/cssFilter.js');

    __REACT_HOT_LOADER__.register(setBoxshadow, 'setBoxshadow', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/cssFilter.js');

    __REACT_HOT_LOADER__.register(animationFilter, 'animationFilter', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/cssFilter.js');

    __REACT_HOT_LOADER__.register(getOpacity, 'getOpacity', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/cssFilter.js');
}();

;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setTypeCN = setTypeCN;
function setTypeCN(type) {
    // app, page, layer, group
    // console.log('>>>>>', type);
    var name = '';
    switch (type) {
        case 'app':
            name = 'H5';
            break;
        case 'page':
            name = '页面';
            break;
        case 'layer':
            name = '图层';
            break;
        case 'group':
            name = '图层组';
            break;
    }
    return name;
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setTypeCN, 'setTypeCN', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/common.js');
}();

;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _regenerator = __webpack_require__(18);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(19);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _select = __webpack_require__(174);

var _select2 = _interopRequireDefault(_select);

__webpack_require__(10);

__webpack_require__(175);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Colors = __webpack_require__(46);

var _Colors2 = _interopRequireDefault(_Colors);

var _PopoverInput = __webpack_require__(176);

var _PopoverInput2 = _interopRequireDefault(_PopoverInput);

var _fonturl = __webpack_require__(180);

var _mobx = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _select2.default.Option;

var FontSet = function (_Component) {
    (0, _inherits3.default)(FontSet, _Component);

    function FontSet() {
        var _ref,
            _this3 = this;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, FontSet);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FontSet.__proto__ || (0, _getPrototypeOf2.default)(FontSet)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            keys: 1
        }, _this.fontArr = [], _this.loadFont = function () {
            var _this2;

            return (_this2 = _this).__loadFont__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.syncRichTxt = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var statekeys, str;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            statekeys = _this.state.keys;

                            statekeys++;
                            _context.next = 4;
                            return _this.setState({ keys: statekeys });

                        case 4:
                            str = $('.layerset-etext .fontedit').html();

                            $('#phone').find('.fontedit').html(str);

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this3);
        })), _this.setFontStyle = function () {
            var _this4;

            return (_this4 = _this).__setFontStyle__REACT_HOT_LOADER__.apply(_this4, arguments);
        }, _this.clearFontStyle = function () {
            var _this5;

            return (_this5 = _this).__clearFontStyle__REACT_HOT_LOADER__.apply(_this5, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    } // 存放已经载入的字体文件

    // 加载字体


    (0, _createClass3.default)(FontSet, [{
        key: '__loadFont__REACT_HOT_LOADER__',


        // 数据同步
        value: function __loadFont__REACT_HOT_LOADER__(name) {
            var _this6 = this;

            var url = _fonturl.fonturl[name];
            if (url && this.fontArr.indexOf(name) === -1) {
                var xhr = new XMLHttpRequest();
                xhr.open('get', url);
                xhr.responseType = 'blob';
                xhr.onprogress = function (e) {
                    if (e.lengthComputable) {
                        var percentComplete = e.loaded / e.total;
                        console.log('文字已经加载：', percentComplete);
                        //  $fontload.html('文字已加载：' + parseInt(percentComplete * 100) + '%');
                    }
                };
                xhr.onload = function (e) {
                    //加载成功！
                    if (e.target.status == 200) {
                        _this6.fontArr.push(name);
                        $('head').append('<style>\n                    @font-face {\n                        font-family: ' + name + ';\n                        src: url(\'' + url + '\') format(\'truetype\');\n                    }\n                    </style>');
                        //设置字体
                        _this6.setFontStyle(name, 'fontFamily');
                    }
                };
                xhr.ontimeout = function () {
                    _message3.default.error('请求超时！');
                };
                xhr.send();
            } else {
                //设置字体
                this.setFontStyle(name, 'fontFamily');
            }
        }

        // 设置参数

    }, {
        key: '__setFontStyle__REACT_HOT_LOADER__',


        // 清除样式
        value: function __setFontStyle__REACT_HOT_LOADER__(val, keys, e) {
            var _this7 = this;

            e && e.stopPropagation();
            (0, _mobx.transaction)(function () {
                _this7.props.layer.data.style[keys] = val;
                _this7.props.edata.keys++;
                $(document).trigger('h5ds.setHistory');
                _this7.syncRichTxt();
            });
        }
    }, {
        key: '__clearFontStyle__REACT_HOT_LOADER__',
        value: function __clearFontStyle__REACT_HOT_LOADER__() {
            var _this8 = this;

            (0, _mobx.transaction)(function () {
                _this8.props.layer.data.style = {};
                _this8.props.edata.keys++;
                $(document).trigger('h5ds.setHistory');
                _this8.syncRichTxt();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var layer = this.props.layer;
            // console.log(layer.data.style.textAlign);

            var _layer$data$style = layer.data.style,
                fontWeight = _layer$data$style.fontWeight,
                textAlign = _layer$data$style.textAlign,
                textDecoration = _layer$data$style.textDecoration,
                fontStyle = _layer$data$style.fontStyle,
                textIndent = _layer$data$style.textIndent,
                color = _layer$data$style.color,
                backgroundColor = _layer$data$style.backgroundColor,
                fontSize = _layer$data$style.fontSize,
                lineHeight = _layer$data$style.lineHeight,
                letterSpacing = _layer$data$style.letterSpacing,
                marginLeft = _layer$data$style.marginLeft,
                marginRight = _layer$data$style.marginRight,
                fontFamily = _layer$data$style.fontFamily;

            return _react2.default.createElement(
                'div',
                { className: 'fontset' },
                _react2.default.createElement(
                    'div',
                    { className: 'ex-btns' },
                    _react2.default.createElement(
                        'a',
                        {
                            className: fontWeight === 'bolder' ? 'active ex-btn' : 'ex-btn',
                            onClick: function onClick(e) {
                                return _this9.setFontStyle(fontWeight === 'bolder' ? 'normal' : 'bolder', 'fontWeight', e);
                            }
                        },
                        _react2.default.createElement('i', { className: 'h5ds ico5-bold' })
                    ),
                    _react2.default.createElement(
                        'a',
                        {
                            className: fontStyle === 'oblique' ? 'active ex-btn' : 'ex-btn',
                            onClick: function onClick(e) {
                                return _this9.setFontStyle(fontStyle === 'oblique' ? 'normal' : 'oblique', 'fontStyle', e);
                            }
                        },
                        _react2.default.createElement('i', { className: 'h5ds ico5-italic' })
                    ),
                    _react2.default.createElement(
                        'a',
                        {
                            className: textDecoration === 'line-through' ? 'active ex-btn' : 'ex-btn',
                            onClick: function onClick(e) {
                                return _this9.setFontStyle(textDecoration === 'line-through' ? 'none' : 'line-through', 'textDecoration', e);
                            }
                        },
                        _react2.default.createElement('i', { className: 'h5ds ico5-strikethrough' })
                    ),
                    _react2.default.createElement(
                        'a',
                        {
                            className: textDecoration === 'underline' ? 'active ex-btn' : 'ex-btn',
                            onClick: function onClick(e) {
                                return _this9.setFontStyle(textDecoration === 'underline' ? 'none' : 'underline', 'textDecoration', e);
                            }
                        },
                        _react2.default.createElement('i', { className: 'h5ds ico5-underline' })
                    ),
                    _react2.default.createElement('a', { className: 'line' }),
                    _react2.default.createElement(
                        'a',
                        { className: 'ex-btn' },
                        _react2.default.createElement(
                            _PopoverInput2.default,
                            {
                                title: '\u5DE6\u7F29\u8FDB\uFF08px\uFF09',
                                onChange: function onChange(n) {
                                    return _this9.setFontStyle(n + 'px', 'marginLeft');
                                },
                                value: parseInt(marginLeft || 0, 10)
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-indent' })
                        )
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'ex-btn' },
                        _react2.default.createElement(
                            _PopoverInput2.default,
                            {
                                title: '\u53F3\u7F29\u8FDB\uFF08px\uFF09',
                                onChange: function onChange(n) {
                                    return _this9.setFontStyle(n + 'px', 'marginRight');
                                },
                                value: parseInt(marginRight || 0, 10)
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-dedent' })
                        )
                    ),
                    _react2.default.createElement('a', { className: 'line' }),
                    _react2.default.createElement(
                        'a',
                        {
                            className: textAlign === 'left' ? 'active ex-btn' : 'ex-btn',
                            onClick: function onClick(e) {
                                return _this9.setFontStyle(textAlign === 'left' ? 'initial' : 'left', 'textAlign', e);
                            }
                        },
                        _react2.default.createElement('i', { className: 'h5ds ico5-alignleft' })
                    ),
                    _react2.default.createElement(
                        'a',
                        {
                            className: textAlign === 'center' ? 'active ex-btn' : 'ex-btn',
                            onClick: function onClick(e) {
                                return _this9.setFontStyle(textAlign === 'center' ? 'initial' : 'center', 'textAlign', e);
                            }
                        },
                        _react2.default.createElement('i', { className: 'h5ds ico5-aligncenter' })
                    ),
                    _react2.default.createElement(
                        'a',
                        {
                            className: textAlign === 'right' ? 'active ex-btn' : 'ex-btn',
                            onClick: function onClick(e) {
                                return _this9.setFontStyle(textAlign === 'right' ? 'initial' : 'right', 'textAlign', e);
                            }
                        },
                        _react2.default.createElement('i', { className: 'h5ds ico5-alignright' })
                    ),
                    _react2.default.createElement('a', { className: 'line' }),
                    _react2.default.createElement(
                        'a',
                        { className: 'ex-btn', onClick: this.clearFontStyle },
                        _react2.default.createElement('i', { className: 'h5ds ico5-eraser' })
                    ),
                    _react2.default.createElement(
                        'a',
                        { title: '\u6587\u5B57\u989C\u8272', className: 'ex-btn ex-btn-fontcolor' },
                        _react2.default.createElement(
                            _Colors2.default,
                            { color: color, onChange: function onChange(color) {
                                    return _this9.setFontStyle(color.hex, 'color');
                                } },
                            _react2.default.createElement('i', { className: 'h5ds ico5-zitiyanse' })
                        )
                    ),
                    _react2.default.createElement(
                        'a',
                        { title: '\u6587\u5B57\u80CC\u666F', className: 'ex-btn ex-btn-fontcolor' },
                        _react2.default.createElement(
                            _Colors2.default,
                            {
                                color: backgroundColor,
                                onChange: function onChange(color) {
                                    return _this9.setFontStyle(color.hex, 'backgroundColor');
                                }
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-a' })
                        )
                    ),
                    _react2.default.createElement(
                        'a',
                        { title: '\u5B57\u4F53\u5927\u5C0F', className: 'ex-btn' },
                        _react2.default.createElement(
                            _PopoverInput2.default,
                            {
                                title: '\u5B57\u4F53\u5927\u5C0F\uFF08px\uFF09',
                                min: 12,
                                onChange: function onChange(n) {
                                    return _this9.setFontStyle(n + 'px', 'fontSize');
                                },
                                value: parseInt(fontSize || 0, 10)
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-zitidaxiao' })
                        )
                    ),
                    _react2.default.createElement(
                        'a',
                        { title: '\u6587\u5B57\u95F4\u8DDD', className: 'ex-btn' },
                        _react2.default.createElement(
                            _PopoverInput2.default,
                            {
                                title: '\u6587\u5B57\u95F4\u8DDD\uFF08px\uFF09',
                                onChange: function onChange(n) {
                                    return _this9.setFontStyle(n + 'px', 'letterSpacing');
                                },
                                value: parseInt(letterSpacing || 0, 10)
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-textwidth' })
                        )
                    ),
                    _react2.default.createElement(
                        'a',
                        { title: '\u6587\u5B57\u884C\u9AD8', className: 'ex-btn' },
                        _react2.default.createElement(
                            _PopoverInput2.default,
                            {
                                title: '\u6587\u5B57\u884C\u9AD8\uFF08px\uFF09',
                                onChange: function onChange(n) {
                                    return _this9.setFontStyle(n + 'px', 'lineHeight');
                                },
                                value: parseInt(lineHeight || 0, 10)
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-textheight' })
                        )
                    ),
                    _react2.default.createElement('a', { className: 'line' }),
                    _react2.default.createElement(
                        _select2.default,
                        {
                            key: fontFamily,
                            onChange: function onChange(n) {
                                return _this9.loadFont(n, 'fontFamily');
                            },
                            className: 'mt-select-min',
                            size: 'small',
                            value: fontFamily,
                            style: { width: 120 }
                        },
                        _react2.default.createElement(
                            Option,
                            { value: 'Microsoft YaHei' },
                            '\u5FAE\u8F6F\u96C5\u9ED1'
                        ),
                        _react2.default.createElement(
                            Option,
                            { value: 'LiSu' },
                            '\u96B6\u4E66'
                        ),
                        _react2.default.createElement(
                            Option,
                            { value: 'KaiTi' },
                            '\u6977\u4F53'
                        ),
                        _react2.default.createElement(
                            Option,
                            { value: 'SimSun' },
                            '\u5B8B\u4F53'
                        )
                    )
                )
            );
        }
    }]);
    return FontSet;
}(_react.Component);

exports.default = FontSet;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Option, 'Option', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/etext/FontSet.jsx');

    __REACT_HOT_LOADER__.register(FontSet, 'FontSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/etext/FontSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(72);

__webpack_require__(73);

__webpack_require__(26);

__webpack_require__(74);

__webpack_require__(27);

__webpack_require__(75);

__webpack_require__(76);

__webpack_require__(77);

__webpack_require__(78);

__webpack_require__(79);

__webpack_require__(80);

__webpack_require__(81);

__webpack_require__(82);

__webpack_require__(83);

__webpack_require__(84);

__webpack_require__(85);

__webpack_require__(86);

__webpack_require__(87);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _App = __webpack_require__(88);

var _App2 = _interopRequireDefault(_App);

var _mobxReact = __webpack_require__(6);

var _store = __webpack_require__(64);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ...

// jquery插件库

// 其他资源
var H5DS = function (_Component) {
    (0, _inherits3.default)(H5DS, _Component);

    function H5DS() {
        (0, _classCallCheck3.default)(this, H5DS);
        return (0, _possibleConstructorReturn3.default)(this, (H5DS.__proto__ || (0, _getPrototypeOf2.default)(H5DS)).apply(this, arguments));
    }

    (0, _createClass3.default)(H5DS, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _mobxReact.Provider,
                _store2.default,
                _react2.default.createElement(_App2.default, this.props)
            );
        }
    }]);
    return H5DS;
}(_react.Component); // 右键菜单初始化
// import '../utils/title';


exports.default = H5DS;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(H5DS, 'H5DS', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/index.js');
}();

;
module.exports = exports['default'];

/***/ }),
/* 72 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 73 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 74 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 75 */
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
        var self = this;
        try {
            self = self.split('#')[1].replace(')', '');
        } catch (e) {
            console.error('blodId转化错误！', this);
        }
        return self;
    } else {
        return null;
    }
};

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
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
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
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
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(accAdd, 'accAdd', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/prototypes.js');

    __REACT_HOT_LOADER__.register(accSub, 'accSub', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/prototypes.js');
}();

;

/***/ }),
/* 76 */
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
    if (!$('.h5ds-contextmenu')[0]) {
        var tpl = '<div class="h5ds-contextmenu" style="left: ' + set.x + 'px; top: ' + set.y + 'px;">\n            <ul>\n                ' + set.vals.map(function (elem) {
            return '<li class="h5ds-contextmenu-item" data-val="' + elem.val + '">' + elem.name + '</li>';
        }).join('') + '\n            </ul>\n        </div>';
        $('body').append(tpl);
    }

    // 设置
    var $box = $('.h5ds-contextmenu');
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
        var $context = $(e.target).closest('.h5ds-contextmenu-item');
        if ($context[0] && set.callback) {
            set.callback($context.attr('data-val'), $context);
        }
        $('.h5ds-contextmenu').remove();
    });
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*RGBA颜色转换为16进制*/
String.prototype.colorHex = function () {
    if (!this) {
        return 'initial';
    }
    if (this.indexOf('#') !== -1) {
        return this;
    }
    var aColor = this.replace(/(rgba\()(\d+,\d+,\d+),(((1|0)?\.)?\d+)\)/g, '$2').split(',');
    var strHex = '#';
    for (var i = 0; i < aColor.length; i++) {
        var hex = Number(aColor[i]).toString(16);
        if (hex === '0') {
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
String.prototype.colorOpacity = function () {
    if (!this) {
        return 1;
    }
    if (this.indexOf('rgba') === -1) {
        return 1;
    }
    var op = this.replace(/\s/g, '').replace(/rgba\(\d+,\d+,\d+,(((0|1)?\.)?\d*)\)/, '$1');
    return parseFloat(op);
};

/* 16进制颜色转为RGBA格式 dot 表示透明度， 如果传入 mark = true, 返回一个颜色数组 */
String.prototype.colorRgba = function (dot, mark) {
    var sColor = this.toLowerCase();
    if (/rgba\(.+\)/.test(sColor)) {
        // 如果rgba的
        return this.replace(/\s/g, '').replace(/(rgba\(\d+,\d+,\d+,)(((0|1)?\.)?\d*)\)/, '$1' + dot + ')');
    }
    if (sColor && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = '#';
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var _i = 1; _i < 7; _i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(_i, _i + 2), 16));
        }

        if (mark) {
            return sColorChange;
        }
        return 'rgba(' + sColorChange.join(',') + ',' + dot + ')';
    } else {
        console.warn('colorRagb 调用出错，颜色值不正确！', sColor);
        return sColor;
    }
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    function Matrix(data) {
        if (data == null) {
            data = [];
        }

        var context = [data[0] || 1, data[1] || 0, data[2] || 0, data[3] || 1, data[4] || 0, data[5] || 0];

        context.getAngle = function () {
            return Math.atan2(this[1], this[0]);
        };

        context.getRotate = function () {
            var a = Math.round(180 * Math.asin(this[0]) / Math.PI);
            var b = Math.round(180 * Math.acos(this[1]) / Math.PI);
            var c = Math.round(180 * Math.asin(this[2]) / Math.PI);
            var d = Math.round(180 * Math.acos(this[3]) / Math.PI);
            var deg = 0;
            if (a == b || -a == b) {
                deg = d;
            } else if (-a + b == 180) {
                deg = 180 + c;
            } else if (a + b == 180) {
                deg = 360 - c || 360 - d;
            }
            return deg >= 360 ? 0 : deg;
        };

        context.concat = function (data) {
            return Matrix([this[0] * data[0] + this[2] * data[1], this[1] * data[0] + this[3] * data[1], this[0] * data[2] + this[2] * data[3], this[1] * data[2] + this[3] * data[3], this[0] * data[4] + this[2] * data[5] + this[4], this[1] * data[4] + this[3] * data[5] + this[5]]);
        };

        context.rotate = function (theta, aboutPoint) {
            return this.concat(Matrix.rotate(theta, aboutPoint));
        };

        context.setRotation = function (angle, aboutPoint) {
            return this.rotate(angle - this.getAngle(), aboutPoint);
        };

        context.scale = function (scaleX, scaleY, aboutPoint) {
            return this.concat(Matrix.scale(scaleX, scaleY, aboutPoint));
        };

        context.translate = function (translateX, translateY) {
            return this.concat(Matrix.translate(translateX, translateY));
        };

        context.toCSSTransform = function () {
            return 'matrix(' + this.join(', ') + ')';
        };

        // 获取transform
        context.getTransform = function () {
            var rotate = Math.atan2(this[1] / this[0]) * 180 / Math.PI,
                scale = this[0] / Math.cos(Math.PI / 180 * rotate),
                trans = void 0;
            // f翻译
            trans = {
                x: parseInt(this[4]),
                y: parseInt(this[5]),
                scale: scale,
                rotate: rotate
            };

            return trans;
        };

        return context;
    }

    Matrix.rotate = function (theta, aboutPoint) {
        var rotateMatrix = Matrix([Math.cos(theta), Math.sin(theta), -Math.sin(theta), Math.cos(theta), 0, 0]);

        // if (aboutPoint) {
        //     rotateMatrix = Matrix.translate(aboutPoint[0], aboutPoint[1])
        //         .concat(rotateMatrix)
        //         .concat(Matrix.translate(-aboutPoint[0], -aboutPoint[1]));
        // }

        return rotateMatrix;
    };

    Matrix.scale = function (scaleX, scaleY, aboutPoint) {
        scaleY = scaleY || scaleX;

        var scaleMatrix = Matrix([scaleX, 0, 0, scaleY, 0, 0]);

        // if (aboutPoint) {
        //     scaleMatrix = Matrix.translate(aboutPoint[0], aboutPoint[1])
        //         .concat(scaleMatrix)
        //         .concat(Matrix.translate(-aboutPoint[0], -aboutPoint[1]));
        // }

        return scaleMatrix;
    };

    Matrix.translate = function (translateX, translateY) {
        return Matrix([1, 0, 0, 1, translateX, translateY]);
    };

    Matrix.getCurrentMatrix = function (target) {
        var computedStyle = window.getComputedStyle(target, null);

        var currentMatrix = computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('-moz-transform') || computedStyle.getPropertyValue('-ms-transform') || computedStyle.getPropertyValue('-o-transform') || computedStyle.getPropertyValue('transform') || null;

        currentMatrix = String(currentMatrix).replace('matrix(', '').replace(')', '').replace(' ', '');

        currentMatrix = currentMatrix.split(',');

        return Matrix([parseFloat(currentMatrix[0], 10) || 1, parseFloat(currentMatrix[1], 10) || 0, parseFloat(currentMatrix[2], 10) || 0, parseFloat(currentMatrix[3], 10) || 1, parseFloat(currentMatrix[4], 10) || 0, parseFloat(currentMatrix[5], 10) || 0]);
    };

    Matrix.transformToMatrix = function (transforms) {
        if (String(transforms).indexOf('matrix') === -1) {
            console.warn('参数不是matrix矩阵格式！进行强制转化', transforms);
            // return;
            if (transforms.indexOf('rotate') !== -1) {
                var exp = RegExp('.*' + name + '\\((.+?)\\).*');
                var val = transforms.replace(exp, '$1');
                return Matrix.rotate(val * Math.PI / 180);
            } else {
                return Matrix([]);
            }
        }
        var currentMatrix = String(transforms).replace('matrix(', '').replace(')', '').replace(' ', '');

        currentMatrix = currentMatrix.split(',');

        return Matrix([parseFloat(currentMatrix[0], 10) || 1, parseFloat(currentMatrix[1], 10) || 0, parseFloat(currentMatrix[2], 10) || 0, parseFloat(currentMatrix[3], 10) || 1, parseFloat(currentMatrix[4], 10) || 0, parseFloat(currentMatrix[5], 10) || 0]);
    };

    window.Matrix = Matrix;
})(undefined);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(document).on('mousedown.drag', '.h5ds-drag', function (e) {
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

    $(document).on('mousemove.drag', function (em) {
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
        $(document).off('mousemove.drag mouseup.drag');
    });
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//提示信息
$(document).off('click.toggle').on('click.toggle', '[data-toggle]', function () {
    var $this = $(this);
    var data = JSON.parse($this.attr('data-toggle'));
    for (var i = 0; i < data.length; i++) {
        $(data[i].dom).toggleClass(data[i].class);
    }
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @desc 排序插件 by 馒头
 */
$(document).on('mousedown.uniqlist', '.h5ds-uniqlist', function (e) {
    var xd = e.pageX,
        yd = e.pageY,
        _this = this,
        $this = $(this);

    $this.trigger('uniqstart');

    // 点击其他区域，不拖动
    if (e.target.className == 'h5ds-uniqlist') {
        return;
    }

    //处理 二次拖动clone的BUG
    if ($(e.target).closest('.h5ds-uniq-clone')[0]) {
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

    // 使用clone 方法
    var cloneDom = function cloneDom() {
        $li.addClass('h5ds-uniq-start').siblings('li').removeClass('h5ds-uniq-start');
        // 使用clone
        $clone = $($li.clone());
        $clone.addClass('h5ds-uniq-clone').css({
            left: left,
            top: top,
            width: $li.width(),
            height: $li.height(),
            position: 'absolute'
        });
        $this.append($clone.prop('outerHTML'));
        $clone = $('.h5ds-uniq-clone');
    };

    // 这里只能上下拖动
    var outHei = parseInt($li.css('margin-top'), 10) + parseInt($li.css('margin-bottom'), 10);
    var maxHei = liHei + outHei;

    var litop = parseInt($li.css('top'), 10);
    var stop = $this.scrollTop();
    litop = litop != 'auto' ? litop : 0;

    // 处理click事件
    var clickMark = true;
    var initCloneMark = false;

    $(document).on('mousemove.uniqlist', function (em) {
        var move = litop + (em.pageY - yd);

        // 允许2px的误差
        if (Math.abs(move) > 3) {
            clickMark = false;
            // 只执行一次
            if (!initCloneMark) {
                initCloneMark = true;
                cloneDom();
                cloneDom = null;
            }
            $clone.css({
                left: left + (em.pageX - xd),
                top: top + (em.pageY - yd) + stop
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
            endtop = parseInt($li.position().top, 10) + stop;

        // click事件
        if (clickMark) {
            $li.removeClass('h5ds-uniq-start');
            $this = null;
            $li = null;
        } else {
            $clone.animate({
                left: endleft,
                top: endtop
            }, 500, function () {
                $clone.remove();
                $li.removeClass('h5ds-uniq-start');
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
        $(document).off('mousemove.uniqlist');
        $(document).off('mouseup.uniqlist');
    });
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @desc 获取url 数据
 */
$.getUrlData = function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    var data = null;
    if (r != null) {
        data = unescape(r[2]);
    }
    return data;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//transform过滤器 by Mantou

//用法
// var rotate = $dom.transform('rotate')
// $dom.transform({'rotate': '10deg'})

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
            transform: cls
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

// 设置transform 值
String.prototype.setTransfrom = function setTransfrom(name, val) {
    if (this.indexOf(name) != -1) {
        var exp = RegExp('(.*' + name + ')\\((.+?)\\)(.*)', 'g');
        return this.replace(exp, '$1(' + val + ')$3');
    } else {
        return false;
    }
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _rect = __webpack_require__(22);

var _math = __webpack_require__(36);

// 控制杆 ....
// import Matrix from './Matrix';
$.fn.control = function (setting) {
    var defaults = {
        movex: true, //x方向移动
        movey: true, //y方向移动
        autosize: true, //任意拉伸
        fixedsize: true, //固定比例拉伸
        scale: 1,
        rotate: true //旋转
    };
    var $this = $(this);
    var set = $.extend(defaults, setting);
    set.scale = $('.phonebox').transform('scale') || 1;
    var shtml = '<div class="h5ds-control">\n\t\t\t\t\t{{rotate}}\n\t\t\t\t\t{{autosize}}\n\t\t\t\t\t{{fixedsize}}\n\t\t\t\t\t<span class="h5ds-control-center"></span>\n\t\t\t\t</div>';

    //如果没有旋转
    if (set.rotate) {
        shtml = shtml.replace('{{rotate}}', '<span class="h5ds-control-rotate"></span>');
    } else {
        shtml = shtml.replace('{{rotate}}', '');
    }

    //自动缩放
    if (set.autosize) {
        shtml = shtml.replace('{{autosize}}', '<span class="h5ds-control-top"></span>\n\t\t\t\t\t<span class="h5ds-control-left"></span>\n\t\t\t\t\t<span class="h5ds-control-right"></span>\n\t\t\t\t\t<span class="h5ds-control-bottom"></span>');
    } else {
        shtml = shtml.replace('{{autosize}}', '');
    }

    //如果没有缩放
    if (set.fixedsize) {
        shtml = shtml.replace('{{fixedsize}}', '<span class="h5ds-control-topleft"></span>\n\t\t\t\t\t<span class="h5ds-control-topright"></span>\n\t\t\t\t\t<span class="h5ds-control-bottomleft"></span>\n\t\t\t\t\t<span class="h5ds-control-bottomright"></span>');
    } else {
        shtml = shtml.replace('{{fixedsize}}', '');
    }

    var $controlDom = $this.find('.h5ds-control');
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
        var scale = set.scale;
        var box = {
            width: $box.width(),
            height: $box.height(),
            left: parseInt($box.css('left'), 10) * scale,
            top: parseInt($box.css('top'), 10) * scale
        };
        var style = null;
        $(document).trigger('controlstart', {
            e: e,
            $box: $box
        });

        // 吸附效果 - 此处应该优化下
        var gridAdsorb = void 0,
            gridSize = void 0;
        var $gridBox = $('#gridBox');
        if ($gridBox[0]) {
            gridAdsorb = $gridBox.attr('data-adsorb') === 'true' ? true : false;
            gridSize = parseInt($gridBox.attr('data-size'), 10);
        }

        $(document).on('mousemove.control_move', function (em) {
            em.stopPropagation();
            style = {
                left: parseInt((box.left + (em.pageX - down.x)) / scale, 10),
                top: parseInt((box.top + (em.pageY - down.y)) / scale, 10)
            };
            if (!set.movex) {
                delete style.left;
            }
            if (!set.movey) {
                delete style.top;
            }
            $(document).trigger('controlmove', e);

            // 设置网格对齐
            if (gridAdsorb && gridSize) {
                style.left ? style.left = Math.round(style.left / gridSize, 10) * gridSize : null;
                style.top ? style.top = Math.round(style.top / gridSize, 10) * gridSize : null;
            }

            $box.css(style);

            // 设置标线。一共有6条
            $(this).trigger('controlmove', {
                e: em,
                $box: $box
            });
        }).on('mouseup.control_move', function (e) {
            $(document).trigger('controlend', e);
            // $setLine.remove();
            $(this).trigger('controlend', {
                e: e,
                $box: $(_this).parent()
            });
            $(document).off('mousemove.control_move mouseup.control_move');
            $this.trigger('change', style);
            style = null;
        });
    };

    //旋转
    var rotateFun = function rotateFun(e, _this) {
        // let $target = $(e.target);
        var $center = $(_this).find('.h5ds-control-center');
        var $box = $(_this).parent();
        var center = {
            x: parseInt($center.offset().left, 10),
            y: parseInt($center.offset().top, 10)
        };
        // let width = $box.width();
        // let height = $box.height();
        var pi = 180 / Math.PI;
        var du = null;
        $(document).on('mousemove.control_rotate', function (em) {
            var x = em.pageX - center.x;
            var y = center.y - em.pageY;
            du = Math.atan(x / y);
            du = du * pi;
            du = parseInt(du, 10);

            //判断向限
            if (x >= 0 && y >= 0) {
                //1
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
            // $box.css({
            //     transform: Matrix.getCurrentMatrix($box[0])
            //         .setRotation((du * Math.PI) / 180, [width / 2, height / 2])
            //         .toCSSTransform()
            // });
            $box.transform({ rotate: (0, _math.toFixed)(du, 1) + 'deg' });
        }).on('mouseup.control_rotate', function (e) {
            e.stopPropagation();
            $(document).off('mousemove.control_rotate mouseup.control_rotate');
            $this.trigger('change', {
                value: (0, _math.toFixed)(du, 1),
                rotate: (0, _math.toFixed)(du, 1) + 'deg',
                transform: 'rotate(' + (0, _math.toFixed)(du, 1) + 'deg)'
                // transform: Matrix.getCurrentMatrix($box[0])
                //     .setRotation((du * Math.PI) / 180, [width / 2, height / 2])
                //     .toCSSTransform()
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
        var scale = set.scale;
        var $box = $(_this).parent();
        var box = {
            width: $box[0].offsetWidth, //parseInt($box.width(), 10),
            height: $box[0].offsetHeight, //parseInt($box.height(), 10),
            left: $box[0].offsetLeft, // parseInt($box.css('left'), 10),
            top: $box[0].offsetTop // parseInt($box.css('top'), 10)
        };

        var rectbox = (0, _rect.rectParam)($box);
        var angle = rectbox.rotate * Math.PI / 180;

        $(document).on('mousemove.control_resize', function (em) {
            var move = {
                // 变化值
                x: (em.pageX - down.x) / scale,
                y: (em.pageY - down.y) / scale
            };
            var deltaX = Math.round(move.x * Math.cos(angle) + move.y * Math.sin(angle));
            var deltaY = Math.round(move.y * Math.cos(angle) - move.x * Math.sin(angle));
            var $newBox = $(_this).parent();

            var newWidth = $newBox[0].offsetWidth;
            var newHeight = $newBox[0].offsetHeight;
            var newTop = $newBox[0].offsetTop; // parseFloat($boxNew.css('top'));
            var newLeft = $newBox[0].offsetLeft; // parseFloat($boxNew.css('left'));

            // let currentMatrix = Matrix.getCurrentMatrix($box[0]);
            switch (type) {
                case 'topleft':
                    {
                        var y = deltaX * box.height / box.width;
                        newWidth -= deltaX;
                        newHeight -= y;
                        newTop += y;
                        newLeft += deltaX; // ...
                        // currentMatrix = currentMatrix.translate(deltaX, y);
                    }
                    break;
                case 'top':
                    {
                        newHeight -= deltaY;
                        newTop += deltaY;
                        // currentMatrix = currentMatrix.translate(0, deltaY);
                    }
                    break;
                case 'topright':
                    {
                        var _y = deltaX * box.height / box.width;
                        newWidth += deltaX;
                        newHeight += _y;
                        newTop -= _y;
                        // newLeft -= deltaX; // ...
                        // currentMatrix = currentMatrix.translate(0, -y);
                    }
                    break;
                case 'right':
                    {
                        newWidth += deltaX;
                    }
                    break;
                case 'left':
                    {
                        newWidth -= deltaX;
                        newLeft += deltaX;
                        // currentMatrix = currentMatrix.translate(deltaX, 0);
                    }
                    break;
                case 'bottomright':
                    {
                        newWidth += deltaX;
                        newHeight += deltaX * box.height / box.width;
                    }
                    break;
                case 'bottom':
                    {
                        newHeight += deltaY;
                    }
                    break;
                case 'bottomleft':
                    {
                        newWidth -= deltaX;
                        newHeight -= deltaX * box.height / box.width;
                        newLeft += deltaX;
                        // currentMatrix = currentMatrix.translate(deltaX, 0);
                    }
                    break;
            }
            down = {
                x: em.pageX,
                y: em.pageY
            };
            if (newWidth < 0 || newHeight < 0) {
                return;
            }
            $box.css({
                width: newWidth,
                height: newHeight,
                top: newTop,
                left: newLeft
                // transform: currentMatrix.toCSSTransform()
            });
        }).on('mouseup.control_resize', function (e) {
            $(document).off('mousemove.control_resize mouseup.control_resize');
            $box = $(_this).parent();
            var val = {
                height: parseInt($box.height(), 10),
                width: parseInt($box.width(), 10),
                top: parseInt($box.css('top'), 10),
                left: parseInt($box.css('left'), 10)
                // transform: Matrix.getCurrentMatrix($box[0]).toCSSTransform() ...
            };
            console.log('>>>>>>>>>>>', val);
            $this.trigger('change', val);
        });
    };

    //销毁
    this.distory = function () {
        $('.h5ds-control').remove();
        moveFun = null;
        rotateFun = null;
        resizeFun = null;
    };

    //事件绑定
    $(document).off('mousedown.control').on('mousedown.control', '.h5ds-control', function (e) {
        e.preventDefault();
        e.stopPropagation();
        set.scale = $('.phonebox').transform('scale') || 1;

        $(document).trigger('controlstart', e);

        // 专门给 group 提供的，如果正在编辑器组合，原来的方法都失效
        if (window.IS_GROUP) {
            return;
        }

        switch (e.target.className) {
            case 'h5ds-control':
                moveFun(e, this);
                break;
            case 'h5ds-control-rotate':
                rotateFun(e, this);
                break;
            case 'h5ds-control-top':
                resizeFun(e, this, 'top');
                break;
            case 'h5ds-control-topleft':
                resizeFun(e, this, 'topleft');
                break;
            case 'h5ds-control-topright':
                resizeFun(e, this, 'topright');
                break;
            case 'h5ds-control-bottom':
                resizeFun(e, this, 'bottom');
                break;
            case 'h5ds-control-bottomleft':
                resizeFun(e, this, 'bottomleft');
                break;
            case 'h5ds-control-bottomright':
                resizeFun(e, this, 'bottomright');
                break;
            case 'h5ds-control-left':
                resizeFun(e, this, 'left');
                break;
            case 'h5ds-control-right':
                resizeFun(e, this, 'right');
                break;
        }
    });

    return this;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(8);

$.fn.crop = function (setting) {
    var defaults = {
        name: (0, _util.getRandomID)(), // 给这个裁剪插件取个名字，确保唯一性
        movex: true,
        movey: true,
        borderWidth: -500, // 黑色区域大小
        callback: null, // 回调函数
        delBtn: true, // 删除按钮
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
    var srcOld = $this.data('src'); // 图片地址

    // 如果没有图片 ，不走下面的
    if (!srcOld) {
        return false;
    }

    var idname = set.name; // 时间戳做事件别名
    var shtml = '<div class="h5ds-crop">\n                    <div class="h5ds-crop-bg">\n                        <div class="h5ds-crop-box">\n                            <div class="h5ds-crop-controlbox">\n                                <div class="h5ds-crop-control">\n                                    <span class="h5ds-control-center"></span>\n                                    <span class="h5ds-control-top"></span>\n                                    <span class="h5ds-control-left"></span>\n                                    <span class="h5ds-control-right"></span>\n                                    <span class="h5ds-control-bottom"></span>\n                                    <span class="h5ds-control-topleft"></span>\n                                    <span class="h5ds-control-topright"></span>\n                                    <span class="h5ds-control-bottomleft"></span>\n                                    <span class="h5ds-control-bottomright"></span>\n                                </div>\n                            </div>\n                            <img class="h5ds-crop-img" src="' + srcOld + '" alt="">\n                        </div>\n                    </div>\n                    <div class="h5ds-crop-fun">\n                        <a class="h5ds-crop-100">100%</a><!--\n                        --><a class="h5ds-crop-11">1:1</a><!--\n                        --><a class="h5ds-crop-23">2:3</a><!--\n                        --><a class="h5ds-crop-34">3:4</a><!--\n                        --><a class="h5ds-crop-35">3:5</a>\n                    </div>\n                    <div class="h5ds-crop-btns">\n                           <a class="h5ds-cropbtn-change a-selectimg"><i class="h5ds ico5-icoreset"></i> \u6362\u56FE</a><!--\n                           --><a class="h5ds-cropbtn-crop"><i class="h5ds ico5-icocrop"></i> \u88C1\u526A</a><!--\n                           --><a class="h5ds-cropbtn-init"><i class="h5ds ico5-icoinit"></i> \u8FD8\u539F</a><!--\n                           ' + (set.delBtn ? '--><a class="h5ds-cropbtn-del"><i class="h5ds ico5-icodel"></i> 删除</a>' : '') + '\n                    </div>\n                </div>';

    // 如果有，先移除
    $this.find('.h5ds-crop').remove();
    $this = $this.empty().html(shtml).find('.h5ds-crop');

    var swid, shei; //选区大小
    var $bg = $this.find('.h5ds-crop-bg');
    var bg = {
        wid: parseInt($bg.width(), 10),
        hei: parseInt($bg.height(), 10)
    };
    var img = null;
    var x = set.borderWidth,
        y = set.borderWidth; //移动位置
    //初始化图片
    var $img = $this.find('.h5ds-crop-img');
    var scaleAll = 1; // 缩放比例

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
        $(document).on('mousemove.crop_move', function (em) {
            var left = box.left + (em.pageX - down.x) / scaleAll - set.borderWidth;
            var top = box.top + (em.pageY - down.y) / scaleAll - set.borderWidth;
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
            $(document).off('mousemove.crop_move mouseup.crop_move');
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
        var scale = $box.transform('scale') || 1;

        swid = box.wid;
        shei = box.hei;

        $(document).on('mousemove.crop_resize', function (em) {
            var val = {
                x: em.pageX - down.x,
                y: em.pageY - down.y
            };
            var hei = void 0,
                wid = void 0;
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
            $(document).off('mousemove.crop_resize mouseup.crop_resize');
        });
    };

    //图片预加载
    var loadImage = function loadImage(url, callback) {
        var imgs = new Image();
        imgs.src = url;
        imgs.onload = function () {
            //图片下载完毕时异步调用callback函数。
            callback(imgs); // 将callback函数this指针切换为img。
        };

        // 如果加载失败 。。。
        imgs.onerror = function () {
            console.error('图片加载失败', imgs);
            callback(imgs); // 将callback函数this指针切换为img。
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
            if (img.wid > img.hei * a / b) {
                swid = img.hei * a / b;
                shei = img.hei;
            } else {
                swid = img.wid;
                shei = img.wid * b / a;
            }
        }

        var $controlbox = $this.find('.h5ds-crop-controlbox');

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

    //设置参数 - 图片预加载后，设置一些参数 // resize 还原
    var reSet = function reSet(_img, resize) {
        $img = $this.find('.h5ds-crop-img');

        // 宽高

        img = {
            width: _img.width,
            height: _img.height,
            wid: parseInt($img.width(), 10),
            hei: parseInt($img.height(), 10),
            src: _img.src
        };

        // 如果图片是隐藏的。需要手动去计算wid,hei， 默认的宽高是323px * 218px
        if ($img.is(':hidden')) {
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

        //设置移动范围
        set.width = img.wid;
        set.height = img.hei;
        swid = img.wid;
        shei = img.hei;

        //设置区域
        $this.find('.h5ds-crop-box').css({
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
        $crop.find('.h5ds-crop').remove();
    };

    //事件绑定
    var initEvent = function initEvent() {
        //事件绑定
        $crop.off('mousedown.crop_' + idname).on('mousedown.crop_' + idname, '.h5ds-crop-control', function (e) {
            switch (e.target.className) {
                case 'h5ds-crop-control':
                    moveFun(e, this);
                    break;
                case 'h5ds-control-top':
                    resizeFun(e, this, 'top');
                    break;
                case 'h5ds-control-topleft':
                    resizeFun(e, this, 'topleft');
                    break;
                case 'h5ds-control-topright':
                    resizeFun(e, this, 'topright');
                    break;
                case 'h5ds-control-bottom':
                    resizeFun(e, this, 'bottom');
                    break;
                case 'h5ds-control-bottomleft':
                    resizeFun(e, this, 'bottomleft');
                    break;
                case 'h5ds-control-bottomright':
                    resizeFun(e, this, 'bottomright');
                    break;
                case 'h5ds-control-left':
                    resizeFun(e, this, 'left');
                    break;
                case 'h5ds-control-right':
                    resizeFun(e, this, 'right');
                    break;
            }
        });

        //裁剪
        $crop.off('click.crop_' + idname).on('click.crop_' + idname, '.h5ds-cropbtn-crop', function (e) {
            var obj = getValue();
            var img = new Image();
            img.crossOrigin = 'Anonymous'; // 允许跨域

            // 裁剪保存
            var cropData = function cropData() {
                var canvas = $('<canvas width="' + obj.width + '" height="' + obj.height + '"></canvas>')[0];
                var ctx = canvas.getContext('2d');

                ctx.drawImage(img, obj.x, obj.y, obj.width, obj.height, 0, 0, obj.width, obj.height);
                var data = canvas.toDataURL();

                //console.log(data)
                // _this.distory();
                $crop.data('src', data);

                // 重新初始化裁剪区域
                // $crop.crop(set);
                $this.find('.h5ds-crop-img').attr('src', data);
                loadImage(data, function (_img) {
                    //设置参数
                    reSet(_img);
                });

                //事件触发
                $crop.trigger('crop.' + idname, {
                    imgData: data,
                    crop: obj,
                    name: idname
                });
            };

            img.onload = function () {
                cropData();
            };
            img.src = obj.src;

            // //  确保缓存的图片也触发 load 事件
            // if (img.complete || img.complete === undefined) {
            //     img.src = obj.src;
            //     cropData();
            // }
        });

        //设置比例
        $crop.off('click.cropset_' + idname).on('click.cropset_' + idname, '.h5ds-crop-fun', function (e) {
            switch (e.target.className) {
                case 'h5ds-crop-100':
                    setSize('100%', '100%');
                    break;
                case 'h5ds-crop-11':
                    setSize(1, 1);
                    break;
                case 'h5ds-crop-23':
                    setSize(2, 3);
                    break;
                case 'h5ds-crop-34':
                    setSize(3, 4);
                    break;
                case 'h5ds-crop-35':
                    setSize(3, 5);
                    break;
            }
        });

        //还原
        $crop.off('click.cropinit_' + idname).on('click.cropinit_' + idname, '.h5ds-cropbtn-init', function (e) {
            console.log('还原');
            // _this.distory();
            var src = $crop.attr('data-oldsrc');
            $crop.data('src', src);
            // $crop.crop(set);
            $this.find('.h5ds-crop-img').attr('src', src);
            loadImage(src, function (_img) {
                //设置参数
                reSet(_img, true);
            });
            //事件触发
            $crop.trigger('crop.' + idname, src);
        });

        //换图
        $crop.off('click.cropchang_' + idname).on('click.cropchang_' + idname, '.h5ds-cropbtn-change', function (e) {
            //事件触发 , _this 是当前操作的 DOM 。
            $crop.trigger('cropchange.' + idname, _this);
        });

        //删除
        $crop.off('click.cropdel_' + idname).on('click.cropdel_' + idname, '.h5ds-cropbtn-del', function (e) {
            _this.distory();
            //$this.remove();
            //事件触发
            // $(_this).find('.h5ds-crop').hide();
            $crop.trigger('cropdel.' + idname);
        });
    };

    //图片预加载
    // var mark = true;
    var originSrc = $img.attr('src');
    if (originSrc === '' || originSrc === 'none') {
        console.warn('没有图片');
        return;
    }
    loadImage(originSrc, function (_img) {
        //设置参数
        reSet(_img);
        initEvent();
    });

    return _this;
}; //控制杆 \u8be5\u8f6f\u4ef6\u7531\u8463\u6d9b\u72ec\u7acb\u5f00\u53d1
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(13);

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = __webpack_require__(37);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$.escape = function (obj) {
    var str = '';
    try {
        if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object') {
            str = escape((0, _stringify2.default)(obj));
        } else {
            str = escape(obj);
        }
    } catch (e) {
        str = false;
    }
    return str;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 87 */
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
    if (!$('.h5ds-helps')[0]) {
        $('body').append('\n        <div class="h5ds-helps">\n            <div class="h5ds-helps-content">\n                <a class="h5ds-helps-close"><i class="h5ds ico5-close"></i></a>\n                <div class="h5ds-helps-info"></div>\n                <div class="h5ds-helps-btns">\n                    <a class="h5ds-helps-prev">\u4E0A\u4E00\u6B65</a>\n                    <a class="h5ds-helps-next">\u4E0B\u4E00\u6B65</a>\n                    <a class="h5ds-helps-end">\u5B8C\u6210</a>\n                </div>\n            </div>\n        </div>\n        ');
    }

    var $help = $('.h5ds-helps');
    var $content = $help.find('.h5ds-helps-content');

    // 显示DOM
    var showDom = function showDom(index) {
        if (index === 0) {
            $('.h5ds-helps-prev').hide();
            $('.h5ds-helps-next').show();
            $('.h5ds-helps-end').hide();
        } else if (index === set.data.length - 1) {
            $('.h5ds-helps-next').hide();
            $('.h5ds-helps-end').show();
            $('.h5ds-helps-prev').show();
        } else {
            $('.h5ds-helps-end').hide();
            $('.h5ds-helps-next').show();
            $('.h5ds-helps-prev').show();
        }
        var obj = set.data[index];
        var $target = $(obj.dom);
        var size = {
            transfrom: $target.css('transfrom'),
            width: $target.outerWidth(),
            height: $target.outerHeight(),
            left: $target.offset().left,
            top: $target.offset().top
        };
        console.log('size ->', size);
        $help.css(size);
        $content.removeClass().addClass('h5ds-helps-content h5ds-helps-' + obj.pos);
        $help.find('.h5ds-helps-info').html(obj ? obj.content : '');
    };

    // 默认显示第一个
    var activeIndex = 0;
    showDom(activeIndex);
    if (set.data.length === 1) {
        $('.h5ds-helps-next').hide();
        $('.h5ds-helps-end').show();
    }

    // 事件绑定
    $help.on('click', '.h5ds-helps-next', function () {
        activeIndex++;
        if (activeIndex < set.data.length) {
            showDom(activeIndex);
        }
    });

    $help.on('click', '.h5ds-helps-prev', function () {
        activeIndex--;
        if (activeIndex >= 0) {
            showDom(activeIndex);
        }
    });

    $help.on('click', '.h5ds-helps-close, .h5ds-helps-end', function () {
        $help.off('click');
        $help.remove();
    });
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _localeProvider = __webpack_require__(89);

var _localeProvider2 = _interopRequireDefault(_localeProvider);

var _progress = __webpack_require__(90);

var _progress2 = _interopRequireDefault(_progress);

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _promise = __webpack_require__(38);

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = __webpack_require__(17);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = __webpack_require__(39);

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = __webpack_require__(13);

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _class2, _temp; // 额外添加的svg

// components

// import TimeLine from './components/timeLine/TimeLine';

// 额外添加的svg


__webpack_require__(91);

__webpack_require__(92);

__webpack_require__(10);

var _util = __webpack_require__(8);

var _zh_CN = __webpack_require__(93);

var _zh_CN2 = _interopRequireDefault(_zh_CN);

var _mobx = __webpack_require__(7);

var _mobxReact = __webpack_require__(6);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Loading = __webpack_require__(54);

var _Loading2 = _interopRequireDefault(_Loading);

var _FastBtn = __webpack_require__(95);

var _FastBtn2 = _interopRequireDefault(_FastBtn);

var _Header = __webpack_require__(105);

var _Header2 = _interopRequireDefault(_Header);

var _LayerList = __webpack_require__(122);

var _LayerList2 = _interopRequireDefault(_LayerList);

var _Index = __webpack_require__(124);

var _Index2 = _interopRequireDefault(_Index);

var _Phone = __webpack_require__(127);

var _Phone2 = _interopRequireDefault(_Phone);

var _Setting = __webpack_require__(133);

var _Setting2 = _interopRequireDefault(_Setting);

var _combin = __webpack_require__(57);

var _combin2 = _interopRequireDefault(_combin);

var _etext = __webpack_require__(167);

var _etext2 = _interopRequireDefault(_etext);

var _img = __webpack_require__(182);

var _img2 = _interopRequireDefault(_img);

var _Layer = __webpack_require__(186);

var _Layer2 = _interopRequireDefault(_Layer);

var _data = __webpack_require__(188);

var _shortcuts = __webpack_require__(189);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = (_dec = (0, _mobxReact.inject)('app', 'layerfun'), _dec(_class = (0, _mobxReact.observer)(_class = (_temp = _class2 = function (_Component) {
    (0, _inherits3.default)(App, _Component);

    function App(props) {
        (0, _classCallCheck3.default)(this, App);

        var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

        _this.pageToHTML = function () {
            return _this.__pageToHTML__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setLayers = function () {
            return _this.__setLayers__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.shortcuts = false;
        _this.state = {
            percent: 0, // 载入进度
            success: false, // 载入成功后
            modals: [] // 合并layers插件方法
        };
        return _this;
    }

    // isPhoneView 不设置layer.id ， isMinPage 缩小页面


    (0, _createClass3.default)(App, [{
        key: '__setLayers__REACT_HOT_LOADER__',
        value: function __setLayers__REACT_HOT_LOADER__() {
            return this.__setLayers__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: '__pageToHTML__REACT_HOT_LOADER__',
        value: function __pageToHTML__REACT_HOT_LOADER__() {
            return this.__pageToHTML__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: '__pageToHTML__REACT_HOT_LOADER__',


        // 给layerfun赋值
        value: function __pageToHTML__REACT_HOT_LOADER__(page) {
            var _this2 = this;

            var isPhoneView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var isMinPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!page || (0, _stringify2.default)(page) === '{}') {
                return null;
            }
            var zIndex = 9999;
            // let tmp = +new Date();
            var layers = page.layers;
            var style = null;
            var _page$style = page.style,
                height = _page$style.height,
                width = _page$style.width;

            if (page.type === 'combin') {
                // 合并图层需要设置缩放比例
                style = { transform: 'scale(' + width / page.originstyle.width + ', ' + height / page.originstyle.height + ')' };
            } else {
                style = { height: height, width: width };
            }
            var layersSet = this.props.layerfun.layersSet;

            var JSXDOM = _react2.default.createElement(
                'div',
                { className: 'h5ds-swiper-layers', style: (0, _extends3.default)({}, style) },
                layers.map(function (layer, index) {
                    var dom = null;
                    if (layersSet[layer.type]) {
                        dom = layersSet[layer.type].layerdom(layer, index, _this2.props.layerfun, { isMinPage: isMinPage, isPhoneView: isPhoneView });
                    } else {
                        dom = _react2.default.createElement(
                            'div',
                            { className: 'layer-null' },
                            '\u8BF7\u8F7D\u5165',
                            layer.type,
                            '\u63D2\u4EF6'
                        ); //
                    }
                    // 临时兼容，后台读取的模板数据。后期保存的模板都有keyid.这句话就可以删除了
                    if (!layer.keyid) {
                        // console.log('出现 layer 没有keyid 的情况，combin可能，系统模板也可能，或者是添加的layer', layer);
                        layer.keyid = 'nokeyid_' + (0, _util.getRandomID)();
                        layer.set = {
                            lock: false, // 锁定图层
                            hide: false // 隐藏图层
                        };
                    }
                    return _react2.default.createElement(
                        _Layer2.default,
                        { isPhoneView: isPhoneView, isMinPage: isMinPage, layer: layer, zIndex: zIndex - index, key: layer.keyid },
                        dom
                    );
                })
            );
            return JSXDOM;
        }
    }, {
        key: '__setLayers__REACT_HOT_LOADER__',
        value: function __setLayers__REACT_HOT_LOADER__() {
            var _this3 = this;

            // 如果没填写插件。错误
            if (!this.props.plugins) {
                return;
            }

            // 默认有图片和文字，合并图层
            var layersSet = {
                img: {
                    type: 'img',
                    name: '图片',
                    icon: _react2.default.createElement('i', { className: 'h5ds ico5-beijing' }),
                    editor: _img2.default,
                    layerdom: _img.setImgHTML,
                    origindata: _img.img
                },
                etext: {
                    type: 'etext',
                    name: '文本',
                    icon: _react2.default.createElement('i', { className: 'h5ds ico5-wenben' }),
                    editor: _etext2.default,
                    layerdom: _etext.setEtextHTML,
                    origindata: _etext.etext
                },
                combin: {
                    type: 'combin',
                    name: '合并层',
                    icon: null,
                    editor: _combin2.default,
                    layerdom: _combin.setCombinHTML,
                    origindata: _combin.combin
                }
            };
            var modals = [];
            this.props.plugins.forEach(function (plus) {
                layersSet[plus.type] = (0, _assign2.default)(layersSet[plus.type] || {}, plus);
                if (plus.modal) {
                    modals.push(plus.modal);
                }
            });
            (0, _mobx.transaction)(function () {
                _this3.props.layerfun.pageToHTML = _this3.pageToHTML;
                _this3.props.layerfun.template = _this3.props.template || null;
                _this3.props.layerfun.savePage = _this3.props.savePage || null;
                _this3.props.layerfun.music = _this3.props.music || null;
                _this3.props.layerfun.saveApp = _this3.props.saveApp || null;
                _this3.props.layerfun.publishApp = _this3.props.publishApp || null;
                _this3.props.layerfun.uploadBase64 = _this3.props.uploadBase64 || null;
                _this3.props.layerfun.uploadSet = _this3.props.uploadSet || null;
                _this3.props.layerfun.layersSet = layersSet;
            });

            // 载入第三方库
            var scripts = [];
            console.log(layersSet);
            for (var type in layersSet) {
                var arr = layersSet[type].scripts || [];
                scripts = [].concat((0, _toConsumableArray3.default)(scripts), (0, _toConsumableArray3.default)(arr));
            }
            // 动态载入第三方库
            var maxLen = scripts.length;
            if (maxLen === 0) {
                this.setState({ success: true });
            } else {
                var scriptPromise = [];
                scripts.forEach(function (elem) {
                    var fun = new _promise2.default(function (resolve, reject) {
                        $.getScript(elem).done(function () {
                            /* 耶，没有问题，这里可以干点什么 ** */
                            console.log(elem, '载入成功！');
                            resolve(true);
                        }).fail(function () {
                            /* 靠，马上执行挽救操作 */
                            _message3.default.error('\u7B2C\u4E09\u65B9\u63D2\u4EF6\u8F7D\u5165\u5931\u8D25\uFF1A' + elem);
                            reject(false);
                            // resolve(true);
                        });
                    });
                    scriptPromise.push(fun);
                });

                _promise2.default.all(scriptPromise).then(function () {
                    scripts.forEach(function (elem) {
                        !$('head').find('[src="' + elem + '"]')[0] && $('#insertjs').before('<script src="' + elem + '"></script>');
                    });
                    _this3.loadingPercent && clearInterval(_this3.loadingPercent);
                    _this3.setState({ percent: 100 });
                    _this3.loadingSuccess = setTimeout(function () {
                        console.log('外部资源载入成功！');
                        _this3.setState({ success: true });
                    }, 500);
                }).catch(function (e) {
                    console.error('Promise.all 失败：', e);
                });
            }

            this.setState({ modals: modals });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // 如果二次修改data参数的时候
            console.log('如果二次修改data参数的时候');
            this.props.app.initApp(nextProps.data, nextProps.appset);
            this.setLayers();
            if (!this.shortcuts) {
                this.shortcuts = true;
                (0, _shortcuts.shortcuts)();
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            // 如果初次进入，data存在，就执行渲染。
            if (this.props.data) {
                console.log('如果初次进入，data存在，就执行渲染。');
                this.props.app.initApp(this.props.data, this.props.appset);
                this.setLayers();
            }
            if (!this.shortcuts) {
                this.shortcuts = true;
                (0, _shortcuts.shortcuts)();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this4 = this;

            if (this.props.data) {
                this.loadingPercent = setInterval(function () {
                    var percent = _this4.state.percent;

                    percent += parseInt(Math.random() * 10, 10);
                    if (percent > 99) {
                        percent = 99;
                        clearInterval(_this4.loadingPercent);
                    }
                    // console.log(percent);
                    _this4.setState({ percent: percent });
                }, parseInt(Math.random() * 1000, 10));
            } else {
                // message.error('请载入初始数据 data', 99999);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $(document).off('h5ds.showLoading');
            $(document).off('h5ds.hideLoading');
            this.loadingPercent && clearInterval(this.loadingPercent);
            this.loadingSuccess && clearTimeout(this.loadingSuccess);
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                modals = _state.modals,
                success = _state.success,
                percent = _state.percent;

            console.log('App.jsx 执行 render');
            return _react2.default.createElement(
                _localeProvider2.default,
                { locale: _zh_CN2.default },
                _react2.default.createElement(
                    'div',
                    { className: 'h5ds-frame' },
                    success && this.props.app.data ? _react2.default.createElement(
                        'div',
                        { className: 'frame' },
                        _react2.default.createElement(_Header2.default, null),
                        _react2.default.createElement(_Phone2.default, null),
                        _react2.default.createElement(_Index2.default, null),
                        _react2.default.createElement(_Setting2.default, null),
                        _react2.default.createElement(_FastBtn2.default, null),
                        _react2.default.createElement(_LayerList2.default, null),
                        modals.map(function (Elem, index) {
                            return _react2.default.createElement(Elem, { key: index });
                        })
                    ) : _react2.default.createElement(_Loading2.default, {
                        body: _react2.default.createElement(
                            'div',
                            { className: 'h5ds-centerbox' },
                            _react2.default.createElement(_progress2.default, {
                                strokeWidth: 1,
                                format: function format(percent) {
                                    return _react2.default.createElement(
                                        'div',
                                        { style: { color: '#fff', fontSize: 14 } },
                                        '\u5DF2\u8F7D\u5165',
                                        percent,
                                        '%'
                                    );
                                },
                                width: 200,
                                type: 'circle',
                                percent: percent
                            })
                        )
                    })
                )
            );
        }
    }]);
    return App;
}(_react.Component), _class2.defaultProps = {
    appset: { appid: (0, _util.getRandomID)() },
    plugins: [],
    data: _data.data
}, _temp)) || _class) || _class);
exports.default = App;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(App, 'App', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/App.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/locale-provider");

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/progress");

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/locale-provider/style");

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/progress/style");

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/locale-provider/zh_CN");

/***/ }),
/* 94 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _popover = __webpack_require__(55);

var _popover2 = _interopRequireDefault(_popover);

var _switch = __webpack_require__(40);

var _switch2 = _interopRequireDefault(_switch);

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _regenerator = __webpack_require__(18);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(19);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = __webpack_require__(13);

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _radio = __webpack_require__(41);

var _radio2 = _interopRequireDefault(_radio);

var _dec, _class;

__webpack_require__(56);

__webpack_require__(42);

__webpack_require__(10);

__webpack_require__(43);

__webpack_require__(96);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _selectGroup = __webpack_require__(23);

var _util = __webpack_require__(8);

var _mobxReact = __webpack_require__(6);

var _combin = __webpack_require__(57);

var _rect = __webpack_require__(22);

var _mobx = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioButton = _radio2.default.Button;
var RadioGroup = _radio2.default.Group;
var Center = (_dec = (0, _mobxReact.inject)('app', 'layerfun'), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(Center, _Component);

    function Center() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Center);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Center.__proto__ || (0, _getPrototypeOf2.default)(Center)).call.apply(_ref, [this].concat(args))), _this), _this.setScale = function () {
            var _this2;

            return (_this2 = _this).__setScale__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.savePage = function () {
            var _this3;

            return (_this3 = _this).__savePage__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _this.playAnimate = function () {
            var _this4;

            return (_this4 = _this).__playAnimate__REACT_HOT_LOADER__.apply(_this4, arguments);
        }, _this.undo = function () {
            var _this5;

            return (_this5 = _this).__undo__REACT_HOT_LOADER__.apply(_this5, arguments);
        }, _this.redo = function () {
            var _this6;

            return (_this6 = _this).__redo__REACT_HOT_LOADER__.apply(_this6, arguments);
        }, _this.showGrid = function () {
            var _this7;

            return (_this7 = _this).__showGrid__REACT_HOT_LOADER__.apply(_this7, arguments);
        }, _this.adsorbGrid = function () {
            var _this8;

            return (_this8 = _this).__adsorbGrid__REACT_HOT_LOADER__.apply(_this8, arguments);
        }, _this.pasteLayer = function () {
            var _this9;

            return (_this9 = _this).__pasteLayer__REACT_HOT_LOADER__.apply(_this9, arguments);
        }, _this.copyLayer = function () {
            var _this10;

            return (_this10 = _this).__copyLayer__REACT_HOT_LOADER__.apply(_this10, arguments);
        }, _this.delLayer = function () {
            var _this11;

            return (_this11 = _this).__delLayer__REACT_HOT_LOADER__.apply(_this11, arguments);
        }, _this.combinLayers = function () {
            var _this12;

            return (_this12 = _this).__combinLayers__REACT_HOT_LOADER__.apply(_this12, arguments);
        }, _this.uncombin = function () {
            var _this13;

            return (_this13 = _this).__uncombin__REACT_HOT_LOADER__.apply(_this13, arguments);
        }, _this.changeGridSize = function () {
            var _this14;

            return (_this14 = _this).__changeGridSize__REACT_HOT_LOADER__.apply(_this14, arguments);
        }, _this.mouseright = function () {
            var _this15;

            return (_this15 = _this).__mouseright__REACT_HOT_LOADER__.apply(_this15, arguments);
        }, _this.addPage = function () {
            var _this16;

            return (_this16 = _this).__addPage__REACT_HOT_LOADER__.apply(_this16, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    // 放大，缩小


    (0, _createClass3.default)(Center, [{
        key: '__setScale__REACT_HOT_LOADER__',


        // 保存当前页面
        value: function __setScale__REACT_HOT_LOADER__(type) {
            var $phonebox = $('.phonebox');
            var scale = $phonebox.transform('scale') || 1;
            if (type === 'add') {
                scale += 0.2;
            } else {
                scale -= 0.2;
            }
            if (scale > 2) {
                scale = 2;
            }
            if (scale < 0.5) {
                scale = 0.5;
            }
            this.props.app.setPhoneStyle(scale);
        }
    }, {
        key: '__savePage__REACT_HOT_LOADER__',


        // 播放动画
        value: function __savePage__REACT_HOT_LOADER__() {
            var page = this.props.app.getPage();
            var savePage = this.props.layerfun.savePage;

            if (savePage) {
                savePage({
                    name: page.name,
                    data: (0, _stringify2.default)(page),
                    pic: ''
                });
            }
        }
    }, {
        key: '__playAnimate__REACT_HOT_LOADER__',


        // 撤销
        value: function __playAnimate__REACT_HOT_LOADER__() {
            $(document).trigger('h5ds.playAnimate');
        }
    }, {
        key: '__undo__REACT_HOT_LOADER__',


        // 回退
        value: function __undo__REACT_HOT_LOADER__() {
            this.props.app.doHistory('undo');
        }
    }, {
        key: '__redo__REACT_HOT_LOADER__',


        // 显示网格
        value: function __redo__REACT_HOT_LOADER__() {
            this.props.app.doHistory('redo');
        }
    }, {
        key: '__showGrid__REACT_HOT_LOADER__',


        // 开启吸附
        value: function __showGrid__REACT_HOT_LOADER__() {
            if ($('#gridBox').is(':hidden')) {
                $('#gridBox').show();
            } else {
                $('#gridBox').hide();
            }
        }
    }, {
        key: '__adsorbGrid__REACT_HOT_LOADER__',


        // 粘贴图层
        value: function __adsorbGrid__REACT_HOT_LOADER__() {
            var gridAdsorb = this.props.app.edata.gridAdsorb;

            this.props.app.edata.gridAdsorb = !gridAdsorb;
        }
    }, {
        key: '__pasteLayer__REACT_HOT_LOADER__',


        // 复制图层
        value: function __pasteLayer__REACT_HOT_LOADER__() {
            var _this17 = this;

            var _props$app = this.props.app,
                getLayers = _props$app.getLayers,
                setLayer = _props$app.setLayer,
                edata = _props$app.edata,
                getPageDom = _props$app.getPageDom,
                originLayerSet = _props$app.originLayerSet;

            var layers = getLayers();
            if (window.copyData) {
                var data = null;
                try {
                    $(document).trigger('h5ds.destoryControl');
                    data = JSON.parse(window.copyData);
                    if (data.type === 'layer') {
                        // 粘贴单独的图层
                        data.data.style.top += 10;
                        data.data.style.left += 10;
                        (0, _mobx.transaction)((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                            return _regenerator2.default.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            originLayerSet(data.data);
                                            // 如果有id，需要重新设置一个id
                                            if (data.data.id) {
                                                data.data.id = 'layer_' + (0, _util.getRandomID)();
                                            }
                                            layers.unshift(data.data);
                                            _context.next = 5;
                                            return setLayer(0);

                                        case 5:
                                            $(document).trigger('h5ds.iniControl');

                                        case 6:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this17);
                        })));
                    } else if (data.type === 'group') {
                        // 粘贴组
                        (0, _mobx.transaction)((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                            var arr, i, layer;
                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            arr = [];

                                            for (i = data.data.length - 1; i >= 0; i--) {
                                                arr.push(data.data.length - 1 - i);
                                                layer = JSON.parse(unescape(data.data[i]));

                                                layer.style.top += 10;
                                                layer.style.left += 10;
                                                originLayerSet(layer);
                                                // 如果有id，需要重新设置一个id
                                                if (layer.id) {
                                                    layer.id = 'layer_' + (0, _util.getRandomID)();
                                                }
                                                layers.unshift(layer);
                                            }
                                            edata.setType = 'group';
                                            edata.selectGroup = arr; //
                                            edata.keys++;

                                            // 重新执行拖动方法
                                            _context2.next = 7;
                                            return (0, _selectGroup.dragGroupEvent)(getLayers, edata);

                                        case 7:
                                            if (edata.selectGroup) {
                                                _context2.next = 10;
                                                break;
                                            }

                                            _message3.default.error('组的选择已经取消！');
                                            return _context2.abrupt('return');

                                        case 10:
                                            _context2.next = 12;
                                            return (0, _selectGroup.setStaticGroup)(getPageDom, edata.selectGroup);

                                        case 12:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, _this17);
                        })));
                    } else {
                        _message3.default.error('复制出现未知错误！');
                    }
                    $(document).trigger('h5ds.setHistory');
                } catch (e) {
                    _message3.default.error('复制数据错误');
                }
            } else {
                _message3.default.error('请先复制图层');
            }
        }
    }, {
        key: '__copyLayer__REACT_HOT_LOADER__',


        // 删除图层
        value: function __copyLayer__REACT_HOT_LOADER__() {
            var _this18 = this;

            var _props$app2 = this.props.app,
                getLayers = _props$app2.getLayers,
                edata = _props$app2.edata;

            if ((0, _util.isNot)(edata.selectLayer)) {
                // 如果选中的是组合
                if (edata.selectGroup) {
                    // 复制组
                    (0, _mobx.transaction)((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                        var layers, groups;
                        return _regenerator2.default.wrap(function _callee3$(_context3) {
                            while (1) {
                                switch (_context3.prev = _context3.next) {
                                    case 0:
                                        layers = getLayers();
                                        groups = [];

                                        edata.selectGroup.forEach(function (num) {
                                            groups.push(escape((0, _stringify2.default)(layers[num])));
                                        });
                                        window.copyData = (0, _stringify2.default)({
                                            type: 'group',
                                            data: groups
                                        });
                                        _message3.default.success('已复制多个图层');
                                        $(document).trigger('h5ds.setHistory');

                                    case 6:
                                    case 'end':
                                        return _context3.stop();
                                }
                            }
                        }, _callee3, _this18);
                    })));
                } else {
                    _message3.default.error('请先选择图层！');
                }
            } else {
                // 如果是复制的图层
                var layers = getLayers();
                window.copyData = (0, _stringify2.default)({
                    type: 'layer',
                    data: layers[edata.selectLayer]
                });
                _message3.default.success('已复制一个图层');
            }
        }
    }, {
        key: '__delLayer__REACT_HOT_LOADER__',


        // 合并图层
        value: function __delLayer__REACT_HOT_LOADER__() {
            var _this19 = this;

            var _props$app3 = this.props.app,
                delLayer = _props$app3.delLayer,
                setLayer = _props$app3.setLayer,
                setPage = _props$app3.setPage,
                edata = _props$app3.edata,
                delGroupLayer = _props$app3.delGroupLayer;

            if ((0, _util.isNot)(edata.selectLayer)) {
                // 如果选中的是组合
                if (edata.selectGroup) {
                    // 删除组
                    (0, _mobx.transaction)((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                        return _regenerator2.default.wrap(function _callee4$(_context4) {
                            while (1) {
                                switch (_context4.prev = _context4.next) {
                                    case 0:
                                        _context4.next = 2;
                                        return delGroupLayer();

                                    case 2:
                                        $(document).trigger('h5ds.setHistory');

                                    case 3:
                                    case 'end':
                                        return _context4.stop();
                                }
                            }
                        }, _callee4, _this19);
                    })));
                } else {
                    _message3.default.error('请先选择图层！');
                }
            } else {
                (0, _mobx.transaction)((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
                    return _regenerator2.default.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _context5.next = 2;
                                    return delLayer(edata.selectLayer);

                                case 2:
                                    $(document).trigger('h5ds.setHistory');

                                case 3:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, _this19);
                })));
            }
        }
    }, {
        key: '__combinLayers__REACT_HOT_LOADER__',


        // 取消合并
        value: function __combinLayers__REACT_HOT_LOADER__() {
            var _this20 = this;

            var _props$app4 = this.props.app,
                edata = _props$app4.edata,
                getGroups = _props$app4.getGroups,
                addLayer = _props$app4.addLayer,
                delGroupLayer = _props$app4.delGroupLayer;

            if (!edata.selectGroup) {
                _message3.default.warn('请先选择一组图层！');
                return;
            }
            var arr = [];
            var tops = [],
                lefts = [],
                indexs = [];
            getGroups().forEach(function (elem) {
                var size = (0, _rect.rectParamObj)(elem.layer);
                console.log(elem.key, (0, _extends3.default)({}, size));
                indexs.push(elem.key);
                tops.push(size.top);
                tops.push(size.top + size.boxHeight);
                lefts.push(size.left);
                lefts.push(size.left + size.boxWidth);
                arr.push(JSON.parse((0, _stringify2.default)(elem.layer)));
            });
            var top = Math.min.apply(Math, tops);
            var left = Math.min.apply(Math, lefts);
            var width = Math.max.apply(Math, lefts) - left,
                height = Math.max.apply(Math, tops) - top;

            // 重新设置下子layer 的left 和 top
            arr.forEach(function (elem) {
                console.log((0, _extends3.default)({}, elem));
                elem.style.left -= left;
                elem.style.top -= top;
            });
            // arr.sort((a, b) => {
            //     return a.
            // })

            _combin.combin.style.top = top;
            _combin.combin.style.left = left;
            _combin.combin.originstyle.width = width;
            _combin.combin.originstyle.height = height;
            _combin.combin.style.width = width;
            _combin.combin.style.height = height;
            _combin.combin.layers = arr;
            (0, _mobx.transaction)((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
                var mIndex;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                mIndex = Math.min.apply(Math, indexs);
                                // 删除合并前的 layer

                                _context6.next = 3;
                                return delGroupLayer();

                            case 3:
                                _context6.next = 5;
                                return addLayer(_combin.combin, mIndex);

                            case 5:
                                edata.keys++;
                                $(document).trigger('h5ds.destoryControl');
                                $('#layerlist').find('.layer-item').eq(mIndex).trigger('click');
                                $(document).trigger('h5ds.setHistory');

                            case 9:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, _this20);
            })));
        }
    }, {
        key: '__uncombin__REACT_HOT_LOADER__',


        // 变化网格
        value: function __uncombin__REACT_HOT_LOADER__() {
            var _props$app5 = this.props.app,
                getLayer = _props$app5.getLayer,
                addLayers = _props$app5.addLayers,
                edata = _props$app5.edata;

            var layer = getLayer();
            var index = edata.selectLayer;
            addLayers(layer.layers.reverse(), index, (0, _rect.rectParamObj)(layer));
            $(document).trigger('h5ds.destoryControl');
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__changeGridSize__REACT_HOT_LOADER__',


        // 鼠标右键
        value: function __changeGridSize__REACT_HOT_LOADER__(e) {
            var val = e.target.value;
            this.props.app.edata.gridSize = val;
        }
    }, {
        key: '__mouseright__REACT_HOT_LOADER__',
        value: function __mouseright__REACT_HOT_LOADER__() {
            var _this21 = this;

            var _props$app6 = this.props.app,
                edata = _props$app6.edata,
                exChangeLayer = _props$app6.exChangeLayer,
                getLayers = _props$app6.getLayers,
                delLayer = _props$app6.delLayer,
                setLayer = _props$app6.setLayer; // this.props.app.exChangeLayer(data.from, data.to);

            $(document).on('contextmenu', '#phone', function (e) {
                e.preventDefault();
            });
            $(document).on('contextmenu.menu', '.phone-app > div > .h5ds-swiper-layers > .layer, .h5ds-contextmenu', function (e) {
                e.preventDefault();

                // 如果选择的是组合
                if (edata.selectGroup) {
                    $.contextMenu({
                        x: e.pageX,
                        y: e.pageY,
                        vals: [{ name: '<i class="h5ds ico5-fuzhi"></i> 复制图层', val: 'copy' }, { name: '<i class="h5ds ico5-icodel"></i> 删除图层', val: 'del' }, { name: '<i class="h5ds ico5-fuzhi"></i> 合并图层', val: 'combin' }],
                        callback: function callback(val) {
                            switch (val) {
                                case 'combin':
                                    _this21.combinLayers();
                                    break;
                                case 'del':
                                    $(document).trigger('h5ds.shortcuts_dellayer');
                                    break;
                                case 'copy':
                                    $(document).trigger('h5ds.shortcuts_copylayer');
                                    break;
                            }
                        }
                    });

                    return;
                }

                // 如果单纯的选择 layer
                var $layer = $(e.target).closest('.layer');
                var activeIndex = $layer.index();
                setLayer(activeIndex);
                $(document).trigger('h5ds.iniControl');
                // ...
                var vals = [{ name: '<i class="h5ds ico5-dingceng"></i> 置顶层', val: 'top' }, { name: '<i class="h5ds ico5-diceng"></i> 置底层', val: 'bottom' }, { name: '<i class="h5ds ico5-shangyiyiceng"></i> 上移一层', val: 'prev' }, { name: '<i class="h5ds ico5-xiayiyiceng"></i> 下移一层', val: 'next' }, { name: '<i class="h5ds ico5-fuzhi"></i> 复制图层', val: 'copy' }, { name: '<i class="h5ds ico5-niantie"></i> 粘贴图层', val: 'paste' }, { name: '<i class="h5ds ico5-icodel"></i> 删除图层', val: 'del' }];
                if ($layer.hasClass('layer-combin')) {
                    vals.push({ name: '<i class="h5ds ico5-fuzhi"></i> 取消合并', val: 'uncombin' });
                }
                $.contextMenu({
                    x: e.pageX,
                    y: e.pageY,
                    vals: vals,
                    callback: function callback(val) {
                        switch (val) {
                            // 取消合并
                            case 'uncombin':
                                {
                                    _this21.uncombin(activeIndex);
                                }
                                break;
                            // 置顶
                            case 'top':
                                {
                                    if (activeIndex === 0) {
                                        _message3.default.warn('已经是最顶层了');
                                    } else {
                                        exChangeLayer(activeIndex, 0);
                                        $(document).trigger('h5ds.setHistory');
                                    }
                                }
                                break;
                            // 置底
                            case 'bottom':
                                {
                                    if (activeIndex === getLayers().length - 1) {
                                        _message3.default.warn('已经是最底层了');
                                    } else {
                                        exChangeLayer(activeIndex, getLayers().length - 1);
                                        $(document).trigger('h5ds.setHistory');
                                    }
                                }
                                break;

                            // 上移一层
                            case 'prev':
                                {
                                    if (activeIndex === 0) {
                                        _message3.default.warn('已经是最顶层了');
                                    } else {
                                        exChangeLayer(activeIndex, activeIndex - 1);
                                        $(document).trigger('h5ds.setHistory');
                                    }
                                }
                                break;

                            // 下移一层
                            case 'next':
                                {
                                    if (activeIndex === getLayers().length - 1) {
                                        _message3.default.warn('已经是最底层了');
                                    } else {
                                        exChangeLayer(activeIndex, activeIndex + 1);
                                        $(document).trigger('h5ds.setHistory');
                                    }
                                }
                                break;

                            // 复制图层
                            case 'copy':
                                {
                                    _this21.copyLayer();
                                }
                                break;

                            // 粘贴图层
                            case 'paste':
                                {
                                    _this21.pasteLayer();
                                }
                                break;

                            // 删除图层
                            case 'del':
                                {
                                    delLayer(activeIndex);
                                    $(document).trigger('h5ds.setHistory');
                                }
                                break;
                        }
                    }
                });
            });
        }
    }, {
        key: '__addPage__REACT_HOT_LOADER__',
        value: function __addPage__REACT_HOT_LOADER__() {
            var template = this.props.layerfun.template;

            if (template) {
                $(document).trigger('h5ds.showPageTpls');
            } else {
                $(document).trigger('h5ds.destoryControl');
                this.props.app.addPage({
                    id: null,
                    keyid: (0, _util.getRandomID)(),
                    name: '空白页面',
                    desc: '页面描述',
                    style: { height: 486 },
                    layers: [],
                    animate: [],
                    slider: {
                        animate: 1,
                        autoplay: false,
                        lock: false,
                        time: 5
                    }
                });
                $(document).trigger('h5ds.setHistory');
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this22 = this;

            // 鼠标右键
            this.mouseright();

            // ctrl+z 撤销
            $(document).on('h5ds.shortcuts_undo', function () {
                _this22.undo();
            });

            // ctrl+g 合并图层
            $(document).on('h5ds.shortcuts_combin', function () {
                _this22.combinLayers();
            });

            // ctrl+y 恢复
            $(document).on('h5ds.shortcuts_redo', function () {
                _this22.redo();
            });

            // ctrl+ - 缩小画布
            $(document).on('h5ds.shortcuts_tomin', function () {
                _this22.setScale('del');
            });

            // ctrl+ + 放大画布
            $(document).on('h5ds.shortcuts_tomax', function () {
                _this22.setScale('add');
            });

            // ctrl+ h 显示网格
            $(document).on('h5ds.shortcuts_grid', function () {
                _this22.showGrid();
            });

            // 复制图层 ctrl + c
            $(document).on('h5ds.shortcuts_copylayer', function () {
                _this22.copyLayer();
            });

            // ctrl+ v 粘贴
            $(document).on('h5ds.shortcuts_pastelayer', function () {
                _this22.pasteLayer();
            });

            // 删除选中的图层
            $(document).on('h5ds.shortcuts_dellayer', function () {
                _this22.delLayer();
            });

            // 取消合并 ctrl + u
            $(document).on('h5ds.shortcuts_uncombin', function () {
                _this22.uncombin();
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $(document).off('contextmenu');
            $(document).off('h5ds.shortcuts_redo');
            $(document).off('h5ds.shortcuts_undo');
            $(document).off('h5ds.shortcuts_tomin');
            $(document).off('h5ds.shortcuts_tomax');
            $(document).off('h5ds.shortcuts_grid');
            $(document).off('h5ds.shortcuts_dellayer');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this23 = this;

            var edata = this.props.app.edata;

            return _react2.default.createElement(
                'div',
                { className: 'fastbtns h5ds-drag', 'data-dragset': '{"limit":true}' },
                _react2.default.createElement(
                    'h5',
                    null,
                    _react2.default.createElement('i', { className: 'h5ds ico5-caidan' }),
                    ' \u5FEB\u6377\u6309\u94AE'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'left-btns', id: 'fastLeftBtns' },
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            { className: 'play-animation-do', onClick: this.playAnimate },
                            _react2.default.createElement(
                                'a',
                                null,
                                _react2.default.createElement('i', { className: 'h5ds ico5-bofang' })
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u64AD\u653E\u52A8\u753B'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _popover2.default,
                                {
                                    placement: 'left',
                                    title: '\u7F51\u683C\u8BBE\u7F6E',
                                    content: _react2.default.createElement(
                                        'div',
                                        { className: 'gridset' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                '\u7F51\u683C\u5F00\u5173\uFF1A'
                                            ),
                                            _react2.default.createElement(_switch2.default, { defaultChecked: false, onChange: this.showGrid })
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                '\u7F51\u683C\u5BC6\u5EA6\uFF1A'
                                            ),
                                            _react2.default.createElement(
                                                RadioGroup,
                                                {
                                                    value: edata.gridSize,
                                                    onChange: this.changeGridSize,
                                                    size: 'small'
                                                },
                                                _react2.default.createElement(
                                                    RadioButton,
                                                    { value: 5 },
                                                    '5'
                                                ),
                                                _react2.default.createElement(
                                                    RadioButton,
                                                    { value: 8 },
                                                    '8'
                                                ),
                                                _react2.default.createElement(
                                                    RadioButton,
                                                    { value: 10 },
                                                    '10'
                                                ),
                                                _react2.default.createElement(
                                                    RadioButton,
                                                    { value: 16 },
                                                    '16'
                                                ),
                                                _react2.default.createElement(
                                                    RadioButton,
                                                    { value: 20 },
                                                    '20'
                                                ),
                                                _react2.default.createElement(
                                                    RadioButton,
                                                    { value: 32 },
                                                    '32'
                                                ),
                                                _react2.default.createElement(
                                                    RadioButton,
                                                    { value: 40 },
                                                    '40'
                                                ),
                                                _react2.default.createElement(
                                                    RadioButton,
                                                    { value: 80 },
                                                    '80'
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                '\u7F51\u683C\u5438\u9644\uFF1A'
                                            ),
                                            _react2.default.createElement(_switch2.default, { defaultChecked: edata.gridAdsorb, onChange: this.adsorbGrid })
                                        )
                                    ),
                                    trigger: 'click'
                                },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        _react2.default.createElement('i', { className: 'h5ds ico5-wangge' })
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        '\u663E\u793A\u7F51\u683C'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'save-page-do', onClick: this.savePage },
                            _react2.default.createElement(
                                'a',
                                null,
                                _react2.default.createElement('i', { className: 'h5ds ico5-shoucang' })
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u6536\u85CF\u9875\u9762'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'bottom-btns', id: 'fastRightBtns' },
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            { id: 'fastToNext', onClick: this.undo },
                            _react2.default.createElement(
                                'a',
                                null,
                                _react2.default.createElement('i', { className: 'h5ds ico5-chexiao2' })
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u64A4\u9500'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { id: 'fastToPrev', onClick: this.redo },
                            _react2.default.createElement(
                                'a',
                                null,
                                _react2.default.createElement('i', { className: 'h5ds ico5-chexiao1' })
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u524D\u8FDB'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { onClick: function onClick(e) {
                                    return _this23.setScale('add');
                                } },
                            _react2.default.createElement(
                                'a',
                                null,
                                _react2.default.createElement('i', { className: 'h5ds ico5-fangda' })
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u653E\u5927\u753B\u5E03'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { onClick: function onClick(e) {
                                    return _this23.setScale('del');
                                } },
                            _react2.default.createElement(
                                'a',
                                null,
                                _react2.default.createElement('i', { className: 'h5ds ico5-suoxiao' })
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u7F29\u5C0F\u753B\u5E03'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            ' ',
                            _react2.default.createElement(
                                _popover2.default,
                                {
                                    placement: 'left',
                                    title: '\u5FEB\u6377\u952E\u8BF4\u660E',
                                    content: _react2.default.createElement(
                                        'ul',
                                        null,
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'delete \u5220\u9664'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+s \u4FDD\u5B58\u9884\u89C8APP'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+c \u590D\u5236\u56FE\u5C42'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+v \u7C98\u8D34\u56FE\u5C42'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+z \u64A4\u9500'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+y \u6062\u590D'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+y \u6062\u590D'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+\'-\' \u7F29\u5C0F\u753B\u5E03'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+\'+\' \u653E\u5927\u753B\u5E03'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+p \u64AD\u653E\u52A8\u753B'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+h \u663E\u793A\u7F51\u683C'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+g \u5408\u5E76\u56FE\u5C42'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+u \u53D6\u6D88\u5408\u5E76'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            'ctrl+\u4E0A/\u4E0B/\u5DE6/\u53F3 \u5927\u8303\u56F4\u79FB\u52A8'
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            null,
                                            '\u4E0A/\u4E0B/\u5DE6/\u53F3 \u5C0F\u8303\u56F4\u79FB\u52A8'
                                        )
                                    ),
                                    trigger: 'click'
                                },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        null,
                                        _react2.default.createElement('i', { className: 'h5ds ico5-kuaijiejian' })
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        '\u5FEB\u6377\u952E'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { onClick: this.addPage },
                            _react2.default.createElement(
                                'a',
                                { className: 'add' },
                                _react2.default.createElement('i', { className: 'h5ds ico5-jia1' })
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u6DFB\u52A0\u9875\u9762'
                            )
                        )
                    )
                )
            );
        }
    }]);
    return Center;
}(_react.Component)) || _class) || _class);
exports.default = Center;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(RadioButton, 'RadioButton', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/fastbtn/FastBtn.jsx');

    __REACT_HOT_LOADER__.register(RadioGroup, 'RadioGroup', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/fastbtn/FastBtn.jsx');

    __REACT_HOT_LOADER__.register(Center, 'Center', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/fastbtn/FastBtn.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 96 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.combin = undefined;
exports.setCombinHTML = setCombinHTML;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 设置 dom
function setCombinHTML(layer, zIndex, layerfun) {
    console.log('setCombinHTML do>>>>>>>>>');
    return _react2.default.createElement(
        'div',
        { className: 'layer-combinbox' },
        layer ? layerfun.pageToHTML(layer, true) : null
    );
}

// 原始数据
var combin = exports.combin = {
    id: null,
    animate: [],
    layers: [],
    estyle: {},
    originstyle: {
        // 原始尺寸，缩放的时候会用到
        width: 0,
        height: 0
    },
    style: {
        width: 0,
        height: 0,
        top: 0,
        left: 0
    },
    type: 'combin',
    color: '',
    ue: {}
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setCombinHTML, 'setCombinHTML', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/combin/layer.jsx');

    __REACT_HOT_LOADER__.register(combin, 'combin', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/combin/layer.jsx');
}();

;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _defineProperty2 = __webpack_require__(14);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

// import 'simditor/styles/editor.less';


__webpack_require__(99);

__webpack_require__(100);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobx = __webpack_require__(7);

var _mobxReact = __webpack_require__(6);

var _BackGround = __webpack_require__(44);

var _BackGround2 = _interopRequireDefault(_BackGround);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc 倒计时
 */
var CombinEditor = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(CombinEditor, _Component);

    function CombinEditor(props) {
        (0, _classCallCheck3.default)(this, CombinEditor);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CombinEditor.__proto__ || (0, _getPrototypeOf2.default)(CombinEditor)).call(this, props));

        _this.changeColor = function () {
            return _this.__changeColor__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.backGroundChange = function () {
            return _this.__backGroundChange__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        return _this;
    }

    // 变化颜色


    (0, _createClass3.default)(CombinEditor, [{
        key: '__changeColor__REACT_HOT_LOADER__',


        // 背景 change
        value: function __changeColor__REACT_HOT_LOADER__(obj) {
            var _this2 = this;

            (0, _mobx.transaction)(function () {
                _this2.props.layer.estyle.backgroundColor = obj.color;
                _this2.props.app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__backGroundChange__REACT_HOT_LOADER__',
        value: function __backGroundChange__REACT_HOT_LOADER__(obj) {
            var edata = this.props.app.edata;

            var layer = this.props.layer;
            // console.log(obj);
            (0, _mobx.transaction)(function () {
                for (var key in obj) {
                    if (layer.estyle[key] === undefined) {
                        (0, _mobx.extendObservable)(layer.estyle, (0, _defineProperty3.default)({}, key, obj[key]));
                    } else {
                        layer.estyle[key] = obj[key];
                    }
                }
                edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var layer = this.props.layer;
            // const { data } = this.state;

            return _react2.default.createElement(
                'div',
                { className: 'set-combin' },
                _react2.default.createElement(_BackGround2.default, { onChange: this.backGroundChange, dataStyle: layer.estyle, actionType: 'layerbg' })
            );
        }
    }]);
    return CombinEditor;
}(_react.Component)) || _class) || _class);
exports.default = CombinEditor;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(CombinEditor, 'CombinEditor', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/combin/CombinEditor.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 99 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 100 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 101 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 102 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 103 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = require("react-color");

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _popconfirm = __webpack_require__(58);

var _popconfirm2 = _interopRequireDefault(_popconfirm);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(59);

__webpack_require__(106);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _LayersMenu = __webpack_require__(107);

var _LayersMenu2 = _interopRequireDefault(_LayersMenu);

var _Publish = __webpack_require__(111);

var _Publish2 = _interopRequireDefault(_Publish);

var _localStorage = __webpack_require__(66);

var _indexedDB = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Center = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(Center, _Component);

    function Center() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Center);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Center.__proto__ || (0, _getPrototypeOf2.default)(Center)).call.apply(_ref, [this].concat(args))), _this), _this.clears = function () {
            var _this2;

            return (_this2 = _this).__clears__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.setApp = function () {
            var _this3;

            return (_this3 = _this).__setApp__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _this.help = function () {
            var _this4;

            return (_this4 = _this).__help__REACT_HOT_LOADER__.apply(_this4, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    // 清除缓存


    (0, _createClass3.default)(Center, [{
        key: '__clears__REACT_HOT_LOADER__',


        // 设置type
        value: function __clears__REACT_HOT_LOADER__() {
            (0, _localStorage.clearStorage)();
            (0, _indexedDB.deleteDB)('H5DS');
            window.location.reload();
        }
    }, {
        key: '__setApp__REACT_HOT_LOADER__',
        value: function __setApp__REACT_HOT_LOADER__(index, e) {
            e.stopPropagation();
            $(document).trigger('h5ds.destoryControl');
            this.props.app.setType('app');
            this.setim = setTimeout(function () {
                $(document).trigger('h5ds.appSetTabs', index);
            }, 0);
        }
    }, {
        key: '__help__REACT_HOT_LOADER__',
        value: function __help__REACT_HOT_LOADER__() {
            // 帮助
            $.helps({
                show: true,
                data: [{
                    dom: '.publish',
                    content: '【整体设置】点击此处设置H5页面的整体内容：背景，主图，介绍, 背景音乐，加载效果等',
                    pos: 'bottom'
                }, { dom: '#clearLocalSave', content: '【清除缓存】这里清除本地缓存', pos: 'bottom' }, {
                    dom: '#appPublish',
                    content: '【预览/发布】做好之后，发布应用点击这里发布应用或者预览应用，全部OK后生成二维码',
                    pos: 'bottom'
                }, {
                    dom: '.left',
                    content: '【页面列表】此处主要展示页面的列表，也可以在【模板中心】中选择模板进行页面添加',
                    pos: 'right'
                }, {
                    dom: '.flod-btn',
                    content: '【模板中心】所有页面模板都在这里了，你可以选择系统提供的模板，也可以选择自己保存的模板',
                    pos: 'right'
                }, {
                    dom: '#fastMenu',
                    content: '【图层】页面里面所有的元素叫做图层，你可以在这里选择需要创建的图层，也可以点击“。。。”展开图层，选择更多图层',
                    pos: 'bottom'
                }, {
                    dom: '.right',
                    content: '【设置区域】只需要记住，页面，图层，动画，交互等任何设置相关的操作都在这里进行就可以了。顶部会显示：当前选中的对象',
                    pos: 'left'
                }, { dom: '.phonebox', content: '【可视化区域】页面的可视化界面，所见即所得', pos: 'left' }, {
                    dom: '.layerlist',
                    content: '【图层列表】可以展开图层列表，这里有图层相关的一些操作！',
                    pos: 'bottom'
                }, {
                    dom: '.fastbtns',
                    content: '【快捷操作】这里有一些快捷操作的方法 <br/>【ctrl+s 保存预览APP】<br/>【ctrl+z 撤销】<br/>【ctrl+y 恢复】<br/>【ctrl+ - 缩小画布】<br/>【ctrl+ + 放大画布】<br/>【ctrl+ p 播放动画】<br/>【ctrl+g 合并图层】<br/>【ctrl+u 取消合并】<br/>【ctrl+ h 显示网格】<br/>【ctrl + d 删除】<br/>【上，下，左，右 微调距离】<br/>【shift + 上，下，左，右 大幅度调距离】',
                    pos: 'left'
                }]
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.setim) {
                clearTimeout(this.setim);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var data = this.props.app.data;

            return _react2.default.createElement(
                'div',
                { className: 'h5ds-header' },
                _react2.default.createElement(
                    'div',
                    { className: 'logo' },
                    _react2.default.createElement(
                        'a',
                        { target: '_blank', href: 'http://www.h5ds.com' },
                        'H5',
                        _react2.default.createElement(
                            'span',
                            null,
                            'DS'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'pc-or-phone' },
                    _react2.default.createElement(
                        'a',
                        { className: 'tophone' + (data.type === 'phone' ? ' active' : '') },
                        'Phone'
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'topc' + (data.type === 'pc' ? ' active' : '') },
                        'PC'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'fastmenus' },
                    _react2.default.createElement(_LayersMenu2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'publish' },
                    _react2.default.createElement(
                        'div',
                        { className: 'appname appset' },
                        _react2.default.createElement(
                            'a',
                            { className: 'h5ds-btn-yellow' },
                            '\u5168\u5C40\u8BBE\u7F6E'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'appset-list' },
                            _react2.default.createElement(
                                'a',
                                { className: 'bg set-btn', onClick: function onClick(e) {
                                        return _this5.setApp(0, e);
                                    } },
                                _react2.default.createElement('i', { className: 'h5ds ico5-ordinaryset' }),
                                '\u57FA\u672C\u8BBE\u7F6E'
                            ),
                            _react2.default.createElement(
                                'a',
                                { className: 'loading set-btn', onClick: function onClick(e) {
                                        return _this5.setApp(2, e);
                                    } },
                                _react2.default.createElement('i', { className: 'h5ds ico5-loading' }),
                                '\u52A0\u8F7D\u6548\u679C'
                            ),
                            _react2.default.createElement(
                                'a',
                                { className: 'helpinfo set-btn', onClick: this.help },
                                _react2.default.createElement('i', { className: 'h5ds ico5-bangzhu' }),
                                '\u5E2E\u52A9\u8BF4\u660E'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'h5ds-btn-min', onClick: function onClick(e) {
                                return _this5.setApp(1, e);
                            } },
                        _react2.default.createElement('i', { className: 'h5ds ico5-yinle' }),
                        ' \u97F3\u4E50'
                    ),
                    '\xA0',
                    _react2.default.createElement(
                        _popconfirm2.default,
                        {
                            onConfirm: this.clears,
                            title: _react2.default.createElement(
                                'div',
                                { style: { width: 300 } },
                                '\u6E05\u9664\u7F13\u5B58\u540E\uFF0C\u5F53\u524D\u6570\u636E\u5C06\u88AB\u6E05\u7A7A\uFF0C\u7136\u540E\u4ECE\u670D\u52A1\u5668\u91CD\u65B0\u52A0\u8F7D\u6570\u636E\uFF01\u662F\u5426\u8981\u6E05\u9664\uFF1F'
                            ),
                            okText: '\u786E\u5B9A',
                            cancelText: '\u53D6\u6D88'
                        },
                        _react2.default.createElement(
                            'a',
                            { id: 'clearLocalSave', className: 'h5ds-btn-min' },
                            _react2.default.createElement('i', { className: 'h5ds ico5-Icon_huancun' }),
                            ' \u6E05\u7F13\u5B58'
                        )
                    ),
                    '\xA0',
                    _react2.default.createElement(_Publish2.default, null),
                    _react2.default.createElement(
                        'a',
                        { href: '/api/logout', className: 'logout' },
                        _react2.default.createElement('i', { className: 'h5ds ico5-tuichu' }),
                        ' \u9000\u51FA'
                    )
                )
            );
        }
    }]);
    return Center;
}(_react.Component)) || _class) || _class);
exports.default = Center;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Center, 'Center', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/header/Header.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 106 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _stringify = __webpack_require__(13);

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(10);

__webpack_require__(108);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobx = __webpack_require__(7);

var _mobxReact = __webpack_require__(6);

var _InputImgUrl = __webpack_require__(109);

var _InputImgUrl2 = _interopRequireDefault(_InputImgUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayersMenu = (_dec = (0, _mobxReact.inject)('app', 'layerfun'), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(LayersMenu, _Component);

    function LayersMenu() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, LayersMenu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LayersMenu.__proto__ || (0, _getPrototypeOf2.default)(LayersMenu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            show: false,
            fastbtns: []
        }, _this.handlerImg = function () {
            var _this2;

            return (_this2 = _this).__handlerImg__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.addLayer = function () {
            var _this3;

            return (_this3 = _this).__addLayer__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _this.showAll = function () {
            var _this4;

            return (_this4 = _this).__showAll__REACT_HOT_LOADER__.apply(_this4, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    // 选择图片


    (0, _createClass3.default)(LayersMenu, [{
        key: '__handlerImg__REACT_HOT_LOADER__',


        // 添加模块
        value: function __handlerImg__REACT_HOT_LOADER__(_ref2) {
            var url = _ref2.url,
                setType = _ref2.setType;
            var _props$app = this.props.app,
                getLayer = _props$app.getLayer,
                addLayer = _props$app.addLayer,
                getPage = _props$app.getPage,
                edata = _props$app.edata,
                data = _props$app.data;
            // let setType = this.state.actionType;

            console.log('当前操作对象：', setType);
            url = url.replace(/\\/g, '/');

            // appbg, pagebg, layerbg, addimg, changeimg 几个种类
            if (setType === 'addimg') {
                var layer = JSON.parse((0, _stringify2.default)(this.props.layerfun.layersSet.img.origindata));
                (0, _mobx.transaction)(function () {
                    // 需要修改原始尺寸
                    var _img = $('<img src="' + url + '"/>')[0];
                    layer.style.width = _img.naturalWidth / 2 || 200;
                    layer.style.height = _img.naturalHeight / 2 || 200;
                    layer.data.src = url;
                    addLayer(layer);
                    edata.keys++;

                    // 添加图片后，选中添加的图层
                    setTimeout(function () {
                        $('#layerlist').find('.layer-item').eq(0).trigger('click');
                    }, 0);
                });
            } else if (setType === 'changeimg') {
                (0, _mobx.transaction)(function () {
                    var layer = getLayer();
                    layer.data.src = url;
                    edata.keys++;
                    edata.layerKeys++;
                });
            } else if (setType === 'layerbg') {
                var _layer = getLayer();
                (0, _mobx.transaction)(function () {
                    // 如果是其他背景图片
                    _layer.estyle.backgroundImage = 'url(' + url + ')';
                    _layer.estyle.backgroundRepeat = 'no-repeat';
                    _layer.estyle.backgroundSize = 'initial';
                    _layer.estyle.backgroundColor = 'none';
                    edata.layerKeys = +new Date();
                    $(document).trigger('h5ds.changeLayerBg');
                });
            } else if (setType === 'pagebg') {
                var page = getPage();
                if (page.style.backgroundImage) {
                    page.style.backgroundImage = 'url(' + url + ')';
                } else {
                    (0, _mobx.extendObservable)(page.style, {
                        backgroundImage: 'url(' + url + ')'
                    });
                    edata.keys++;
                }
                $(document).trigger('h5ds.changePageBg');
            } else if (setType === 'appbg') {
                if (data.style.backgroundImage) {
                    data.style.backgroundImage = 'url(' + url + ')';
                } else {
                    (0, _mobx.extendObservable)(data.style, {
                        backgroundImage: 'url(' + url + ')'
                    });
                    edata.keys++;
                }
                $(document).trigger('h5ds.changeAppBg');
            }
            $(document).trigger('h5ds.setHistory');
            // this.closeModal();
            $(document).trigger('h5ds.addImageEnd');
        }
    }, {
        key: '__addLayer__REACT_HOT_LOADER__',
        value: function __addLayer__REACT_HOT_LOADER__(name) {
            // if (['img', 'text', 'svg', 'etext', 'map', 'video'].indexOf(name) === -1) {
            //     message.warn('功能暂时没有开通！试试图片');
            //     return;
            // }
            $(document).trigger('h5ds.destoryControl');
            var _props$app2 = this.props.app,
                addLayer = _props$app2.addLayer,
                setLayer = _props$app2.setLayer;
            var layersSet = this.props.layerfun.layersSet;

            var data = JSON.parse((0, _stringify2.default)(layersSet[name].origindata));
            // setlayer后，多个组件之间有个执行顺序问题。这里异步处理
            setTimeout(function () {
                // 如果是图片，打开图片资源
                if (name === 'img') {
                    $(document).trigger('h5ds.showImgSource', 'addimg');
                    // 如果没有图片资源
                    if (!layersSet.img.modal) {
                        $(document).trigger('h5ds.showImageUrlInput');
                    }
                    // 如果是其他的,selectIcon 不传的时候，默认addLayer。如果要传，需要传个promise对象
                } else {
                    var selectIcon = layersSet[name] ? layersSet[name].selectIcon : false;

                    // 如果 selectIcon 没传的情况
                    if (selectIcon === undefined) {
                        (0, _mobx.transaction)(function () {
                            addLayer(data);
                            setLayer(0);
                            setTimeout(function () {
                                $(document).trigger('h5ds.iniControl');
                            }, 0);
                        });
                        $(document).trigger('h5ds.setHistory');
                    } else {
                        try {
                            selectIcon && selectIcon(name).then(function (res) {
                                (0, _mobx.transaction)(function () {
                                    addLayer(data);
                                    setLayer(0);
                                    setTimeout(function () {
                                        $(document).trigger('h5ds.iniControl');
                                    }, 0);
                                });
                                $(document).trigger('h5ds.setHistory');
                            }).fail(function (err) {
                                console.warn('layer添加错误', err);
                                _message3.default.error('添加layer错误！');
                            });
                        } catch (e) {
                            // 如果不是promise对象。
                            // console.error('selectIcon 必须返回一个promise对象');
                            selectIcon(name);
                        }
                    }
                }
            }, 0);
            this.setState({
                show: false
            });
        }
    }, {
        key: '__showAll__REACT_HOT_LOADER__',
        value: function __showAll__REACT_HOT_LOADER__() {
            this.setState({
                show: !this.state.show
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this5 = this;

            // 点击其他区域，隐藏
            $(document).on('click.fastmenus', function (e) {
                if (!$(e.target).closest('#fastMenu')[0]) {
                    _this5.setState({
                        show: false
                    });
                }
            });

            // 选中图片资源
            $(document).on('h5ds.selectImage', function (e, data) {
                console.log('选择图片 ->', data);
                _this5.handlerImg(data);
            });

            var fastbtns = [];
            var layersSet = this.props.layerfun.layersSet;

            for (var type in layersSet) {
                var data = layersSet[type];
                if (data.icon) {
                    fastbtns.push({
                        name: data.name,
                        icon: data.icon,
                        type: data.type
                    });
                }
            }
            this.setState({ fastbtns: fastbtns });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $(document).off('click.fastmenus');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var _state = this.state,
                show = _state.show,
                fastbtns = _state.fastbtns;

            return _react2.default.createElement(
                'div',
                { className: 'fastMenu', id: 'fastMenu' },
                _react2.default.createElement(
                    'ul',
                    { className: 'moreuse' },
                    fastbtns.map(function (elem, index) {
                        if (index > 7) {
                            return null;
                        }
                        return _react2.default.createElement(
                            'li',
                            { key: elem.type, className: 'fun', onClick: function onClick(e) {
                                    return _this6.addLayer(elem.type);
                                } },
                            _react2.default.createElement(
                                'a',
                                null,
                                elem.icon,
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    elem.name
                                )
                            )
                        );
                    }),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { className: 'more', onClick: this.showAll },
                            _react2.default.createElement('i', { className: 'h5ds ico5-more' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: show ? 'fastlist show' : 'fastlist' },
                    _react2.default.createElement(
                        'h4',
                        null,
                        '\u5168\u90E8\u6A21\u5757'
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'clearfix' },
                        fastbtns.map(function (elem) {
                            return _react2.default.createElement(
                                'li',
                                { key: elem.type, className: 'fun', onClick: function onClick(e) {
                                        return _this6.addLayer(elem.type);
                                    } },
                                _react2.default.createElement(
                                    'a',
                                    null,
                                    elem.icon,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        elem.name
                                    )
                                )
                            );
                        })
                    )
                ),
                _react2.default.createElement(_InputImgUrl2.default, { handlerImg: this.handlerImg })
            );
        }
    }]);
    return LayersMenu;
}(_react.Component)) || _class) || _class);
exports.default = LayersMenu;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(LayersMenu, 'LayersMenu', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/layersmenu/LayersMenu.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 108 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _modal = __webpack_require__(48);

var _modal2 = _interopRequireDefault(_modal);

var _input = __webpack_require__(60);

var _input2 = _interopRequireDefault(_input);

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(49);

__webpack_require__(61);

__webpack_require__(10);

__webpack_require__(110);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputImgUrl = function (_Component) {
    (0, _inherits3.default)(InputImgUrl, _Component);

    function InputImgUrl() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, InputImgUrl);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = InputImgUrl.__proto__ || (0, _getPrototypeOf2.default)(InputImgUrl)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            visible: false,
            val: ''
        }, _this.handleOk = function () {
            var _this2;

            return (_this2 = _this).__handleOk__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.handleCancel = function () {
            var _this3;

            return (_this3 = _this).__handleCancel__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _this.handlerChange = function () {
            var _this4;

            return (_this4 = _this).__handlerChange__REACT_HOT_LOADER__.apply(_this4, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    // 确定URL


    (0, _createClass3.default)(InputImgUrl, [{
        key: '__handleOk__REACT_HOT_LOADER__',


        // 关闭填写image url 的窗口
        value: function __handleOk__REACT_HOT_LOADER__() {
            var val = this.state.val;


            if (val === '') {
                _message3.default.error('请填写图片url，如果图片跨域，将无法裁剪！');
            } else {
                this.props.handlerImg({
                    url: val,
                    setType: 'addimg'
                });
                this.setState({
                    visible: false
                });
            }
        }
    }, {
        key: '__handleCancel__REACT_HOT_LOADER__',


        //
        value: function __handleCancel__REACT_HOT_LOADER__() {
            this.setState({
                visible: false
            });
        }
    }, {
        key: '__handlerChange__REACT_HOT_LOADER__',
        value: function __handlerChange__REACT_HOT_LOADER__(e) {
            this.setState({
                val: e.target.value
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this5 = this;

            $(document).on('h5ds.showImageUrlInput', function () {
                _this5.setState({
                    visible: true
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _modal2.default,
                {
                    title: '\u586B\u5199\u56FE\u7247URL\uFF08\u522B\u8DE8\u57DF\uFF09',
                    visible: this.state.visible,
                    onOk: this.handleOk,
                    onCancel: this.handleCancel
                },
                _react2.default.createElement(
                    'div',
                    { className: 'h5ds-set-img-url' },
                    _react2.default.createElement(_input2.default, { value: this.state.val, onChange: this.handlerChange })
                )
            );
        }
    }]);
    return InputImgUrl;
}(_react.Component);

exports.default = InputImgUrl;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(InputImgUrl, 'InputImgUrl', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/layersmenu/InputImgUrl.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 110 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _modal = __webpack_require__(48);

var _modal2 = _interopRequireDefault(_modal);

var _icon = __webpack_require__(112);

var _icon2 = _interopRequireDefault(_icon);

var _assign = __webpack_require__(39);

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = __webpack_require__(13);

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = __webpack_require__(17);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class; // indexedDB

// import { deepClone } from '@/utils/util';

// import { loadings } from '@/core/conf/loading';


__webpack_require__(49);

__webpack_require__(113);

__webpack_require__(114);

var _indexedDB = __webpack_require__(15);

var db = _interopRequireWildcard(_indexedDB);

var _mobxReact = __webpack_require__(6);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _set = __webpack_require__(12);

var _h5dsUtils = __webpack_require__(50);

var _utils = __webpack_require__(115);

var _Loading = __webpack_require__(54);

var _Loading2 = _interopRequireDefault(_Loading);

var _Upload = __webpack_require__(62);

var _Upload2 = _interopRequireDefault(_Upload);

var _server = __webpack_require__(118);

var _sliderAnimate = __webpack_require__(63);

var _store = __webpack_require__(64);

var _store2 = _interopRequireDefault(_store);

var _mobx = __webpack_require__(7);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Publish = (_dec = (0, _mobxReact.inject)('app', 'layerfun'), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(Publish, _Component);

    function Publish() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Publish);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Publish.__proto__ || (0, _getPrototypeOf2.default)(Publish)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            visible: false,
            nowpage: 1,
            loading: false
        }, _this.toFullHtml = function () {
            var _this2;

            return (_this2 = _this).__toFullHtml__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.publish = function () {
            var _this3;

            return (_this3 = _this).__publish__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _this.save = function () {
            var _this4;

            return (_this4 = _this).__save__REACT_HOT_LOADER__.apply(_this4, arguments);
        }, _this.modalShow = function () {
            var _this5;

            return (_this5 = _this).__modalShow__REACT_HOT_LOADER__.apply(_this5, arguments);
        }, _this.closeModal = function () {
            var _this6;

            return (_this6 = _this).__closeModal__REACT_HOT_LOADER__.apply(_this6, arguments);
        }, _this.getPopupsHTML = function () {
            var _this7;

            return (_this7 = _this).__getPopupsHTML__REACT_HOT_LOADER__.apply(_this7, arguments);
        }, _this.getPagesHTML = function () {
            var _this8;

            return (_this8 = _this).__getPagesHTML__REACT_HOT_LOADER__.apply(_this8, arguments);
        }, _this.getFixedsHTML = function () {
            var _this9;

            return (_this9 = _this).__getFixedsHTML__REACT_HOT_LOADER__.apply(_this9, arguments);
        }, _this.qrcode = function () {
            var _this10;

            return (_this10 = _this).__qrcode__REACT_HOT_LOADER__.apply(_this10, arguments);
        }, _this.initSwiper = function () {
            var _this11;

            return (_this11 = _this).__initSwiper__REACT_HOT_LOADER__.apply(_this11, arguments);
        }, _this.changePage = function () {
            var _this12;

            return (_this12 = _this).__changePage__REACT_HOT_LOADER__.apply(_this12, arguments);
        }, _this.uploadEnd = function () {
            var _this13;

            return (_this13 = _this).__uploadEnd__REACT_HOT_LOADER__.apply(_this13, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Publish, [{
        key: '__toFullHtml__REACT_HOT_LOADER__',


        // 发布  mark === save 表示是单纯的保存
        value: function __toFullHtml__REACT_HOT_LOADER__() {
            var data = this.props.app.data;
            // 查找出map，等JS插件
            // let types = totalLayerType(data);

            // 载入外部JS文件

            var scripts = [];
            var layersSet = this.props.layerfun.layersSet;

            for (var type in layersSet) {
                var arr = layersSet[type].scripts || [];
                scripts = [].concat((0, _toConsumableArray3.default)(scripts), (0, _toConsumableArray3.default)(arr));
            }

            // 默认是手机版本
            if (!data.type) {
                data.type = 'phone';
            }

            console.log('scripts, ', scripts);

            var str = '\n<!doctype html>\n<html>\n<head>\n    <title>' + data.name + '</title>\n    <meta name="description" content="' + data.desc + '">\n    <meta name="keywords" content="' + data.desc + '">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="format-detection" content="telephone=no" />\n    <meta name="format-detection" content="email=no" />\n    <meta name="apple-mobile-web-app-capable" content="yes" />\n    <meta name="apple-mobile-web-app-status-bar-style" content="black" />\n    <meta http-equiv="Cache-Control" content="no-cache" />\n    <meta name="x5-fullscreen" content="true">\n    <meta name="x5-orientation" content="portrait">\n    <meta name="x5-page-mode" content="app">\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=' + _set.appWidth + ', initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">\n    <meta name="apple-mobile-web-app-capable" content="yes" />\n    <!-- Set render engine for 360 browser -->\n    <meta name="renderer" content="webkit">\n    <!-- No Baidu Siteapp-->\n    <meta http-equiv="Cache-Control" content="no-siteapp" />\n    <link rel="stylesheet" type="text/css" href="/assets/css/' + data.type + '.' + _set.version + '.css">\n    <link rel="stylesheet" type="text/css" href="/assets/css/plus.' + _set.version + '.css">\n    <!--js-->\n    <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>\n    <script src="https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>\n    <script src="http://cdn.h5ds.com/lib/plugins/jquery.qrcode.min.js"></script>\n    <script src="http://cdn.h5ds.com/lib/plugins/jquery.touchSwipe.min.js"></script>\n    ' + scripts.map(function (elem) {
                return '<script src="' + elem + '"></script>';
            }).join('') + '\n    <script>\n    var IMG_SOURCE = ' + ((0, _stringify2.default)((0, _utils.getAppDataImgs)(data)) || '[]') + ';\n    var sliderAnimate = ' + ((0, _stringify2.default)(_sliderAnimate.sliderAnimate[data.slider.animate]) || '{}') + ';\n    </script>\n    <script src="/assets/js/' + data.type + '.' + _set.version + '.js"></script>\n    <script src="/assets/js/plus.' + _set.version + '.js"></script>\n</head>\n' + (0, _server.renderToStaticMarkup)(_react2.default.createElement(
                'body',
                { className: 'h5dsapp', onDragStart: 'return false' },
                data.mp3.url ? _react2.default.createElement(
                    'div',
                    { className: 'h5ds-video-icon' },
                    _react2.default.createElement('i', null),
                    _react2.default.createElement('i', null),
                    _react2.default.createElement('i', null),
                    _react2.default.createElement('i', null)
                ) : null,
                data.mp3.url ? _react2.default.createElement('audio', { style: { display: 'none' }, id: 'h5dsBgMusic', preload: 'auto', src: data.mp3.url, loop: 'loop' }) : null,
                _react2.default.createElement(
                    _mobxReact.Provider,
                    _store2.default,
                    _react2.default.createElement(
                        'div',
                        { className: 'h5ds-full', style: (0, _extends3.default)({}, data.style) },
                        this.getPopupsHTML(data),
                        this.getFixedsHTML(data),
                        this.getPagesHTML(data)
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'h5ds-loading', id: 'h5dsLoading' },
                    _react2.default.createElement(
                        'div',
                        { className: 'h5ds-loadinner' },
                        _react2.default.createElement('div', { className: data.loading }),
                        _react2.default.createElement('div', { className: 'h5ds-progress', id: 'h5dsProgress' })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            position: 'absolute',
                            bottom: 5,
                            width: '100%',
                            color: 'rgba(0,0,0,.3)',
                            fontSize: 12,
                            textAlign: 'center',
                            zIndex: 99999999,
                            pointerEvents: 'none'
                        }
                    },
                    '\u6280\u672F\u652F\u6301\uFF1Awww.h5ds.com'
                )
            )) + '\n</html>';
            return str; // 获取shtml 数据后，清除dom
        }
    }, {
        key: '__publish__REACT_HOT_LOADER__',


        // 保存
        value: function __publish__REACT_HOT_LOADER__(mark) {
            var _this14 = this;

            if (this.saveSuccess) {
                return;
            }
            this.saveSuccess = true;
            var _props$app = this.props.app,
                data = _props$app.data,
                edata = _props$app.edata;
            var appid = edata.appid;
            // 开始loading

            this.setState({
                loading: true
            });
            (0, _utils.replaceImgSrc)(data, this.props.layerfun.uploadBase64).then(function () {
                var promiseFun = null;
                if (mark === 'save') {
                    promiseFun = _this14.props.layerfun.saveApp(appid, (0, _mobx.toJS)(data));
                } else {
                    promiseFun = _this14.props.layerfun.publishApp(appid, (0, _mobx.toJS)(data), _this14.toFullHtml());
                }
                promiseFun.then(function (res) {
                    if (res) {
                        db.clearData('img');
                    }
                    _this14.saveSuccess = false;
                    _this14.setState({
                        loading: false
                    });
                    $(document).trigger('h5ds.setHistory');
                });
            });
        }
    }, {
        key: '__save__REACT_HOT_LOADER__',


        // 预览
        value: function __save__REACT_HOT_LOADER__() {
            this.publish('save');
        }
    }, {
        key: '__modalShow__REACT_HOT_LOADER__',


        // 关闭弹窗
        value: function __modalShow__REACT_HOT_LOADER__() {
            var _this15 = this;

            var _props$app$edata = this.props.app.edata,
                owner = _props$app$edata.owner,
                appid = _props$app$edata.appid;

            console.log(owner, appid);
            this.setState({
                visible: true
            }, function () {
                (0, _utils.newQrcode)({ owner: owner, appid: appid });
                _this15.initSwiper();
            });
        }
    }, {
        key: '__closeModal__REACT_HOT_LOADER__',


        // 获取popups html
        value: function __closeModal__REACT_HOT_LOADER__() {
            $(document).trigger('h5ds.viewClose');
            this.setState({
                visible: false
            });
        }
    }, {
        key: '__getPopupsHTML__REACT_HOT_LOADER__',


        // 获取pages html
        value: function __getPopupsHTML__REACT_HOT_LOADER__(data) {
            var pageToHTML = this.props.layerfun.pageToHTML;

            var shtml = _react2.default.createElement(
                'div',
                { id: 'h5dsPopups' },
                data.popups.map(function (elem, index) {
                    var _elem$style = elem.style,
                        backgroundImage = _elem$style.backgroundImage,
                        backgroundRepeat = _elem$style.backgroundRepeat,
                        backgroundColor = _elem$style.backgroundColor,
                        backgroundSize = _elem$style.backgroundSize;

                    return _react2.default.createElement(
                        'div',
                        { id: elem.id, className: 'h5ds-swiper-page', key: index },
                        _react2.default.createElement(
                            'div',
                            {
                                style: { backgroundImage: backgroundImage, backgroundRepeat: backgroundRepeat, backgroundColor: backgroundColor, backgroundSize: backgroundSize },
                                className: 'h5ds-swiper-pageinner'
                            },
                            pageToHTML(elem)
                        )
                    );
                })
            );
            return shtml;
        }
    }, {
        key: '__getPagesHTML__REACT_HOT_LOADER__',


        // 获取fixeds html
        value: function __getPagesHTML__REACT_HOT_LOADER__(data) {
            var pageToHTML = this.props.layerfun.pageToHTML;

            var pages = data.pages;
            var shtml = _react2.default.createElement(
                'div',
                {
                    id: 'h5dsSwiper',
                    className: 'h5ds-swiper',
                    style: {
                        backgroundImage: data.style.backgroundImage,
                        backgroundRepeat: data.style.backgroundRepeat,
                        backgroundColor: data.style.backgroundColor,
                        backgroundSize: data.style.backgroundSize
                    }
                },
                pages.map(function (page, index) {
                    var name = page.name,
                        id = page.id,
                        slider = page.slider,
                        desc = page.desc;

                    var langPage = false;
                    if (page.style.height && page.style.height > _set.appHeight) {
                        langPage = true;
                    }
                    var cName = ['h5ds-swiper-pageinner'];
                    if (langPage) {
                        cName.push('noSwiper');
                    }
                    var _page$style = page.style,
                        backgroundImage = _page$style.backgroundImage,
                        backgroundRepeat = _page$style.backgroundRepeat,
                        backgroundColor = _page$style.backgroundColor,
                        backgroundSize = _page$style.backgroundSize;

                    return _react2.default.createElement(
                        'div',
                        {
                            className: 'h5ds-swiper-page',
                            'data-title': $.escape(name || ''),
                            'data-desc': $.escape(desc || ''),
                            id: id,
                            'data-autoplay': slider.autoplay ? slider.time : false,
                            'data-lock': slider.lock,
                            key: index
                        },
                        _react2.default.createElement(
                            'div',
                            {
                                'data-langpage': langPage,
                                className: cName.join(' '),
                                style: {
                                    backgroundImage: backgroundImage,
                                    backgroundRepeat: backgroundRepeat,
                                    backgroundColor: backgroundColor,
                                    backgroundSize: backgroundSize
                                }
                            },
                            pageToHTML(page)
                        )
                    );
                })
            );
            return shtml;
        }
    }, {
        key: '__getFixedsHTML__REACT_HOT_LOADER__',


        // 生成二维码
        value: function __getFixedsHTML__REACT_HOT_LOADER__(data) {
            var fixed0 = data.fixeds[0].style;
            var fixed1 = data.fixeds[1].style;
            var pageToHTML = this.props.layerfun.pageToHTML;

            var shtml = _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { id: 'h5dsFixedsUp' },
                    _react2.default.createElement(
                        'div',
                        { className: 'h5ds-swiper-page' },
                        _react2.default.createElement(
                            'div',
                            {
                                style: {
                                    backgroundImage: fixed0.backgroundImage,
                                    backgroundRepeat: fixed0.backgroundRepeat,
                                    backgroundColor: fixed0.backgroundColor,
                                    backgroundSize: fixed0.backgroundSize
                                },
                                className: 'h5ds-swiper-pageinner'
                            },
                            pageToHTML(data.fixeds[0])
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'h5dsFixedsDown' },
                    _react2.default.createElement(
                        'div',
                        { className: 'h5ds-swiper-page' },
                        _react2.default.createElement(
                            'div',
                            {
                                style: {
                                    backgroundImage: fixed1.backgroundImage,
                                    backgroundRepeat: fixed1.backgroundRepeat,
                                    backgroundColor: fixed1.backgroundColor,
                                    backgroundSize: fixed1.backgroundSize
                                },
                                className: 'h5ds-swiper-pageinner'
                            },
                            pageToHTML(data.fixeds[1])
                        )
                    )
                )
            );
            return shtml;
        }
    }, {
        key: '__qrcode__REACT_HOT_LOADER__',


        // 初始化swiper
        value: function __qrcode__REACT_HOT_LOADER__() {
            // 生成二维码
            var appid = this.props.app.edata.appid;

            var path = location.origin + '/apps/' + appid + '/index.html';
            $('.qrcode-url-box').html('<a href="' + path + '" target="_blank">' + path + '</a>');
            var $qrcode = $('#qrcode').empty();
            $qrcode.qrcode({
                text: path,
                size: 140,
                ecLevel: 'L',
                background: '#fff'
            });
        }
    }, {
        key: '__initSwiper__REACT_HOT_LOADER__',


        // 切换page
        value: function __initSwiper__REACT_HOT_LOADER__() {
            var _this16 = this;

            var data = this.props.app.data;

            var $h5dsSwiper = $('#h5dsSwiper');

            var doSwiper = function doSwiper() {
                // 滑动
                $h5dsSwiper.h5dsSwiper((0, _assign2.default)(_sliderAnimate.sliderAnimate[data.slider.animate] || {}));
                $h5dsSwiper.off('h5ds.animateStart h5ds.animateEnd').on('h5ds.animateStart', function (e, index) {
                    _this16.setState({
                        nowpage: index + 1
                    });
                    _this16.animated = true;
                }).on('h5ds.animateEnd', function (e) {
                    _this16.animated = false;
                });

                $(document).trigger('h5ds.swiperAfter', { $in: $('#h5dsFixedsUp').find('.h5ds-swiper-page'), $out: null });
                $(document).trigger('h5ds.swiperAfter', {
                    $in: $('#h5dsFixedsDown').find('.h5ds-swiper-page'),
                    $out: null
                });
            };

            // 显示loading
            $('#h5dsLoading').show();
            var num = 0;
            this.setLoadingNum = setInterval(function () {
                $('#h5dsProgress').html(num++ + '%');
                if (num > 100) {
                    clearInterval(_this16.setLoadingNum);
                }
            }, 10);
            this.setLoadingTime = setTimeout(function () {
                $('#h5dsLoading').hide();
                // 自动播放音乐
                (0, _h5dsUtils.autoPlayMusic)();
                $(document).trigger('h5ds.loadingEnd', '#h5dsSwiper');
                (0, _h5dsUtils.setAdsorbent)();
                doSwiper();
            }, 1000);
        }
    }, {
        key: '__changePage__REACT_HOT_LOADER__',


        // 文件上传OVER
        value: function __changePage__REACT_HOT_LOADER__(type) {
            var $out = $('#h5dsSwiper').find('.h5ds-swiper-current');
            var outIndex = $out.index();
            // 动画中，不能继续点
            if (this.animated) {
                return;
            }
            if (type === 'prev') {
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
        }
    }, {
        key: '__uploadEnd__REACT_HOT_LOADER__',
        value: function __uploadEnd__REACT_HOT_LOADER__(elem) {
            console.log('>>>>>>', elem);
            var data = this.props.app.data;

            data.img = elem.path;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this17 = this;

            //  ctrl+s 保存预览APP
            $(document).on('h5ds.shortcuts_save', function () {
                _this17.save();
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $(document).off('h5ds.shortcuts_save');
            this.setLoadingTime && clearTimeout(this.setLoadingTime);
            this.setLoadingNum && clearInterval(this.setLoadingNum);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this18 = this;

            var _state = this.state,
                visible = _state.visible,
                nowpage = _state.nowpage,
                keys = _state.keys,
                loading = _state.loading;
            var data = this.props.app.data;

            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'a',
                    { className: 'h5ds-btn-min', onClick: this.save },
                    loading ? _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(_icon2.default, { type: 'loading' }),
                        ' \u4FDD\u5B58\u4E2D'
                    ) : _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'h5ds ico5-baocun' }),
                        ' \u4FDD\u5B58'
                    )
                ),
                '\xA0\xA0',
                _react2.default.createElement(
                    'a',
                    { id: 'appPublish', onClick: this.modalShow, className: 'h5ds-btn-min' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-fabu' }),
                    ' \u9884\u89C8/\u53D1\u5E03'
                ),
                _react2.default.createElement(
                    _modal2.default,
                    { width: 1000, title: null, footer: null, visible: visible, onCancel: this.closeModal },
                    _react2.default.createElement(
                        'div',
                        { className: 'h5ds-modal', id: 'appViewShow' },
                        loading ? _react2.default.createElement(_Loading2.default, { tips: '\u4FDD\u5B58\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85\uFF01' }) : null,
                        visible ? _react2.default.createElement(
                            'div',
                            { className: 'h5ds-modal-box' },
                            _react2.default.createElement(
                                'div',
                                { className: 'h5ds-modal-full clearfix' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'view-phone' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'change-page' },
                                        _react2.default.createElement(
                                            'a',
                                            { className: 'prev', onClick: function onClick(e) {
                                                    return _this18.changePage('prev');
                                                } },
                                            _react2.default.createElement('i', { className: 'h5ds ico5-a3top' })
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                nowpage
                                            ),
                                            '/',
                                            data.pages.length
                                        ),
                                        _react2.default.createElement(
                                            'a',
                                            { className: 'next', onClick: function onClick(e) {
                                                    return _this18.changePage('next');
                                                } },
                                            _react2.default.createElement('i', { className: 'h5ds ico5-a3down' })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'view-phone-window' },
                                        data.mp3.url ? _react2.default.createElement('audio', {
                                            style: {
                                                display: 'none',
                                                height: 0
                                            },
                                            preload: 'auto',
                                            id: 'h5dsBgMusic',
                                            src: data.mp3.url,
                                            loop: 'loop'
                                        }) : null,
                                        data.mp3.url ? _react2.default.createElement(
                                            'div',
                                            { className: 'h5ds-video-icon' },
                                            _react2.default.createElement('i', null),
                                            _react2.default.createElement('i', null),
                                            _react2.default.createElement('i', null),
                                            _react2.default.createElement('i', null)
                                        ) : null,
                                        this.getPopupsHTML(data),
                                        this.getFixedsHTML(data),
                                        this.getPagesHTML(data),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'h5ds-loading', id: 'h5dsLoading' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'h5ds-loadinner' },
                                                _react2.default.createElement('div', { className: data.loading }),
                                                _react2.default.createElement('div', { className: 'h5ds-progress', id: 'h5dsProgress' })
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            {
                                                style: {
                                                    position: 'absolute',
                                                    bottom: 5,
                                                    width: '100%',
                                                    color: 'rgba(0,0,0,.3)',
                                                    fontSize: 12,
                                                    textAlign: 'center',
                                                    zIndex: 99999999,
                                                    pointerEvents: 'none'
                                                }
                                            },
                                            '\u6280\u672F\u652F\u6301\uFF1Awww.h5ds.com'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'other-info' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'infos clearfix' },
                                        _react2.default.createElement(
                                            'h2',
                                            null,
                                            '\u57FA\u672C\u53C2\u6570'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'qrcode-box box-left' },
                                            _react2.default.createElement(
                                                _Upload2.default,
                                                (0, _extends3.default)({}, this.props.layerfun.uploadSet, { uploadEnd: this.uploadEnd }),
                                                _react2.default.createElement(
                                                    'a',
                                                    { className: 'h5ds-upload-btn' },
                                                    _react2.default.createElement('img', { src: data.img, width: '100', height: '100' })
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'box-right' },
                                            _react2.default.createElement('input', {
                                                className: 'app-name-input',
                                                type: 'text',
                                                defaultValue: data.name
                                            }),
                                            _react2.default.createElement('textarea', { className: 'app-info-textarea', defaultValue: data.desc })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'qrcode clearfix' },
                                        _react2.default.createElement(
                                            'h2',
                                            null,
                                            '\u4E8C\u7EF4\u7801'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'qrcode-box box-left', id: 'qrcode' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'qrcode-tips' },
                                                '\u53D1\u5E03\u540E\u751F\u6210'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'box-right qrcode-url-box' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'qrcode-tips' },
                                                '\u53D1\u5E03\u540E\u751F\u6210'
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'btns' },
                                        _react2.default.createElement(
                                            'a',
                                            { onClick: this.closeModal, className: 'btn-edit' },
                                            '\u7EE7\u7EED\u7F16\u8F91'
                                        ),
                                        _react2.default.createElement(
                                            'a',
                                            { onClick: this.publish, className: 'btn-publish' },
                                            '\u53D1\u5E03'
                                        )
                                    )
                                )
                            )
                        ) : null
                    )
                )
            );
        }
    }]);
    return Publish;
}(_react.Component)) || _class) || _class);
exports.default = Publish;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Publish, 'Publish', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/publish/Publish.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/icon");

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/icon/style");

/***/ }),
/* 114 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(17);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = __webpack_require__(38);

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = __webpack_require__(37);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.extendObj = extendObj;
exports.newQrcode = newQrcode;
exports.replaceImgSrc = replaceImgSrc;
exports.totalLayerType = totalLayerType;
exports.getAppDataImgs = getAppDataImgs;

var _indexedDB = __webpack_require__(15);

var db = _interopRequireWildcard(_indexedDB);

var _mobx = __webpack_require__(7);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// object 追加属性
function extendObj(obj, obj2) {
    if ((typeof obj2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj2)) === 'object') {
        (0, _mobx.extendObservable)(obj, obj2);
    }
}

// 生成二维码
/**
{
    render: 'canvas', // render method: 'canvas', 'image' or 'div'
    minVersion: 1, // version range somewhere in 1 .. 40
    maxVersion: 40,
    ecLevel: 'L',  // error correction level: 'L', 'M', 'Q' or 'H'
    left: 0, // offset in pixel if drawn onto existing canvas
    top: 0,
    size: 200, // size in pixel
    fill: '#000', // code color or image element
    background: null, // background color or image element, null for transparent background
    text: 'no text', // content
    radius: 0, // corner radius relative to module width: 0.0 .. 0.5
    quiet: 0, // quiet zone in modules
    mode: 0, // modes 0: normal 1: label strip 2: label box 3: image strip 4: image box
    mSize: 0.1,
    mPosX: 0.5,
    mPosY: 0.5,
    label: 'no label',
    fontname: 'sans',
    fontcolor: '#000',
    image: null
}
*/
// indexedDB

function newQrcode(set) {
    var owner = set.owner,
        appid = set.appid; // ...
    // 生成二维码

    var path = location.origin + '/apps/' + appid + '/index.html';
    $('.qrcode-url-box').html('<a href="' + path + '" target="_blank">' + path + '</a>');
    var $qrcode = $('#qrcode').empty();
    $qrcode.qrcode({
        text: path,
        size: 140,
        ecLevel: 'L',
        background: '#fff'
    });
}

/**
 * 替换 data 里面的图片路径
 */
function replaceImgSrc(app, uploadImgBase64) {
    return new _promise2.default(function (resolve1, reject1) {
        // 上传 blob 图片
        db.getAllData('img', function (res) {
            if (!res) {
                reject1(false);
                return;
            }

            // 找出 blob 图片
            var objs = getBlobImg(app);
            // 如果有图
            var arr = [];

            var _loop = function _loop(i) {
                var d = res[i];
                if (objs[d.id]) {
                    var p = new _promise2.default(function (resolve) {
                        if (uploadImgBase64) {
                            uploadImgBase64({
                                imgData: d.value,
                                name: 'crop_' + d.id
                            }).then(function (res) {
                                if (!res.error) {
                                    resolve({
                                        id: d.id,
                                        src: res.path
                                    });
                                } else {
                                    console.error('图片上传失败');
                                }
                            });
                        } else {
                            console.error('请设置uploadBase64接口！return promise');
                            resolve({
                                id: d.id,
                                src: d.value
                            });
                        }
                    });
                    arr.push(p);
                }
            };

            for (var i = 0; i < res.length; i++) {
                _loop(i);
            }
            _promise2.default.all(arr).then(function (allRes) {
                resetAppData(objs, allRes, app);
                resolve1(true);
            });
        });
    });
}

// 获取 blob 图片, 约定 arr#index 表示数组
function getBlobImg(app) {
    // let keys = []; // 记录 AppData.data[key] 中，有blob图片的 key 集合
    var blobObj = [];

    // app 主图
    if (app.img && app.img.isBlob()) {
        blobObj[app.img.blobId()] = ['img'];
    }

    // app 背景
    if (app.style['backgroundImage'] && app.style['backgroundImage'].isBlob()) {
        blobObj[app.style['backgroundImage'].blobId()] = ['style', 'backgroundImage'];
    }

    // 替换路径
    var setPath = function setPath(target) {
        // pages, layers 背景 layer 的 data.src // 如果还有其他的，都在这里添加
        app[target].forEach(function (page, i) {
            var pageBg = page.style['backgroundImage'] || '';
            if (pageBg.isBlob()) {
                blobObj[pageBg.blobId()] = [target + '#' + i + '#style', 'backgroundImage'];
            }

            // layers
            page.layers.forEach(function (layer, j) {
                var layerBg = layer.style['backgroundImage'] || '';
                var src = '';
                if (layer.data && layer.data.src) {
                    src = layer.data.src;
                }
                if (layerBg.isBlob()) {
                    blobObj[layerBg.blobId()] = [target + '#' + i, 'layers#' + j, 'backgroundImage'];
                }
                if (src.isBlob()) {
                    blobObj[src.blobId()] = [target + '#' + i, 'layers#' + j, 'data', 'src'];
                }
            });
        });
    };

    setPath('pages');
    setPath('fixeds');
    setPath('popups');

    console.log('blobObj', blobObj);

    return blobObj;
}

// 重新设置 AppData.data 重置img，然后渲染弹窗
/**
 * @desc 在替换完二进制地址的照片后，将html渲染到弹窗里面。显示弹窗里面的内容
 * @param objs getBlobImg() 返回的数据，二进制图片 { id: 记录的AppData.data里面的路径}
 * @param allRes indexedDb里面查询到的base64图片。[{id: base64}]
 */
function resetAppData(objs, allRes, app) {
    console.log('替换blob img ? ', allRes);
    // 重置img

    var _loop2 = function _loop2(i) {
        var d = allRes[i];
        var keysArr = objs[d.id];
        var point = app; // 临时指针
        // console.log('这里需要注意下，可能出错=》', keysArr); & 问题已经处理
        keysArr.forEach(function (elem) {
            if (elem === 'src') {
                point[elem] = d.src;
            } else if (elem === 'backgroundImage') {
                point[elem] = 'url(' + d.src + ')';
            } else {
                if (elem.indexOf('#') !== -1) {
                    var arr = elem.split('#');
                    arr.forEach(function (elem, index) {
                        point = point[elem];
                    });
                } else {
                    point = point[elem];
                }
            }
        });
    };

    for (var i = 0; i < allRes.length; i++) {
        _loop2(i);
    }
    // console.log(JSON.stringify(app));
    // 替换地址后，保存一次local 避免二次上传图片
    // AppDataChange();
}

/**
 * @desc 统计app 的layer 种类
 */
function totalLayerType(app) {
    var pages = app.pages,
        popups = app.popups,
        fixeds = app.fixeds;

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
    popups.forEach(function (page) {
        page.layers.forEach(function (layer) {
            if (!keys[layer.type]) {
                keys[layer.type] = 1;
            } else {
                keys[layer.type]++;
            }
        });
    });
    fixeds.forEach(function (page) {
        page.layers.forEach(function (layer) {
            if (!keys[layer.type]) {
                keys[layer.type] = 1;
            } else {
                keys[layer.type]++;
            }
        });
    });
    return keys;
}

/**
 * @desc 将AppData里面的 img 单独拿出来
 * @param data 也就是 传入一个 app 对象
 */
function getAppDataImgs(data) {
    var arr = [];
    var pages = data.pages;
    var fixeds = data.fixeds || [];
    var popups = data.fixeds || [];

    var allArr = [];
    allArr = [].concat((0, _toConsumableArray3.default)(pages), (0, _toConsumableArray3.default)(fixeds), (0, _toConsumableArray3.default)(popups)); // allArr.concat(pages, fixeds, popups);
    if (data.style && data.style['backgroundImage']) {
        arr.push(data.style['backgroundImage']);
    }
    allArr.forEach(function (page) {
        if (page.style && page.style['backgroundImage']) {
            arr.push(page.style['backgroundImage']);
        }
        if (page.estyle && page.estyle['backgroundImage']) {
            arr.push(page.estyle['backgroundImage']);
        }
        page.layers && page.layers.forEach(function (layer) {
            if (layer.type === 'img') {
                arr.push(layer.data.src);
            } else if (layer.type === 'combin') {
                layer.layers.forEach(function (layerInner) {
                    if (layerInner.type === 'img') {
                        arr.push(layerInner.data.src);
                    }
                });
            }
        });
    });
    return arr;
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(extendObj, 'extendObj', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/utils.js');

    __REACT_HOT_LOADER__.register(newQrcode, 'newQrcode', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/utils.js');

    __REACT_HOT_LOADER__.register(replaceImgSrc, 'replaceImgSrc', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/utils.js');

    __REACT_HOT_LOADER__.register(getBlobImg, 'getBlobImg', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/utils.js');

    __REACT_HOT_LOADER__.register(resetAppData, 'resetAppData', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/utils.js');

    __REACT_HOT_LOADER__.register(totalLayerType, 'totalLayerType', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/utils.js');

    __REACT_HOT_LOADER__.register(getAppDataImgs, 'getAppDataImgs', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/utils.js');
}();

;

/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/upload");

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/upload/style");

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _defineProperty = __webpack_require__(65);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _stringify = __webpack_require__(13);

var _stringify2 = _interopRequireDefault(_stringify);

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _regenerator = __webpack_require__(18);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(19);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29; // indexedDB

// import { datass } from './data';


__webpack_require__(10);

var _indexedDB = __webpack_require__(15);

var db = _interopRequireWildcard(_indexedDB);

var _mobx = __webpack_require__(7);

var _util = __webpack_require__(8);

var _localStorage = __webpack_require__(66);

var _set = __webpack_require__(12);

var _debounce = __webpack_require__(51);

var _imgURLClear = __webpack_require__(47);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    (0, _defineProperty2.default)(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var App = (_class = function () {
    function App() {
        var _this = this;

        (0, _classCallCheck3.default)(this, App);

        _initDefineProp(this, 'data', _descriptor, this);

        _initDefineProp(this, 'edata', _descriptor2, this);

        this.historyIndex = 0;
        this.history = [];
        this.fpsInstance = {
            page: null, // 页面帧动画
            popup: null, // 弹窗帧动画
            fixedUp: null, // 上浮动层
            fixedDown: null // 下浮动层
        };

        _initDefineProp(this, 'initApp', _descriptor3, this);

        this.getFpsKey = function () {
            return _this.__getFpsKey__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        this.getFps = function () {
            return _this.__getFps__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        this.setFps = function () {
            return _this.__setFps__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        this.initFps = function () {
            return _this.__initFps__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        this.addSet = function () {
            return _this.__addSet__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _initDefineProp(this, 'originLayerSet', _descriptor4, this);

        _initDefineProp(this, 'setPhoneStyle', _descriptor5, this);

        _initDefineProp(this, 'setType', _descriptor6, this);

        _initDefineProp(this, 'setLayerStyle', _descriptor7, this);

        _initDefineProp(this, 'getPageNum', _descriptor8, this);

        _initDefineProp(this, 'getPage', _descriptor9, this);

        _initDefineProp(this, 'getPages', _descriptor10, this);

        _initDefineProp(this, 'getLayers', _descriptor11, this);

        _initDefineProp(this, 'getLayer', _descriptor12, this);

        _initDefineProp(this, 'addLayer', _descriptor13, this);

        _initDefineProp(this, 'addLayers', _descriptor14, this);

        _initDefineProp(this, 'getPageDom', _descriptor15, this);

        _initDefineProp(this, 'getGroups', _descriptor16, this);

        _initDefineProp(this, 'getLayerDom', _descriptor17, this);

        _initDefineProp(this, 'delLayer', _descriptor18, this);

        _initDefineProp(this, 'delGroupLayer', _descriptor19, this);

        _initDefineProp(this, 'setPage', _descriptor20, this);

        _initDefineProp(this, 'setLayer', _descriptor21, this);

        _initDefineProp(this, 'exChangePage', _descriptor22, this);

        _initDefineProp(this, 'exChangeLayer', _descriptor23, this);

        _initDefineProp(this, 'delPage', _descriptor24, this);

        _initDefineProp(this, 'addPage', _descriptor25, this);

        _initDefineProp(this, 'copyPage', _descriptor26, this);

        _initDefineProp(this, 'copyLayer', _descriptor27, this);

        _initDefineProp(this, 'doHistory', _descriptor28, this);

        _initDefineProp(this, 'setHistory', _descriptor29, this);
    } // app数据
    // 编辑数据
    // 历史数据，记录的下标，从0开始
    // 历史数据
    // 帧动画实例

    // 初始化加载数据，设置数据


    /**
     * @desc 获取当前fps的 key
     */


    (0, _createClass3.default)(App, [{
        key: '__getFpsKey__REACT_HOT_LOADER__',


        /**
         * @desc 获取当前的fps实例
         */
        value: function __getFpsKey__REACT_HOT_LOADER__() {
            var key = '';
            var distance = '';
            var _edata = this.edata,
                selectFixed = _edata.selectFixed,
                selectType = _edata.selectType;

            switch (selectType) {
                case 'pages':
                    key = 'page';
                    break;
                case 'fixeds':
                    key = 'fixed';
                    distance = selectFixed === 0 ? 'Up' : 'Down';
                    break;
                case 'popups':
                    key = 'popup';
                    break;
            }
            return key + distance;
        }
    }, {
        key: '__getFps__REACT_HOT_LOADER__',


        /**
         * @desc 设置 fps
         */
        value: function __getFps__REACT_HOT_LOADER__() {
            return this.fpsInstance['' + this.getFpsKey()];
        }
    }, {
        key: '__setFps__REACT_HOT_LOADER__',


        /**
         * @desc 实例化帧对象
         */
        value: function __setFps__REACT_HOT_LOADER__(anim) {
            this.fpsInstance['' + this.getFpsKey()] = anim;
        }
    }, {
        key: '__initFps__REACT_HOT_LOADER__',


        /**
         * @desc 添加设置数据
         */
        value: function __initFps__REACT_HOT_LOADER__() {
            try {
                // 如果存在，就remove当前页面的缓存。这里应该提前remove，不然会内存泄露。
                anime.remove('.layer-fps .element');
                this.fpsInstance[this.getFpsKey()] = anime.timeline({
                    easing: 'linear',
                    begin: function begin(anim) {
                        $(document).trigger('h5ds.fps.begin', anim);
                    },
                    update: function update(anim) {
                        $(document).trigger('h5ds.fps.change', anim);
                    },
                    complete: function complete(anim) {
                        $(document).trigger('h5ds.fps.complete', anim);
                    }
                });
                console.log('帧动画的实例 -》', this.fpsInstance);
            } catch (e) {
                console.warn('帧动画需要载入插件 https://cdn.bootcss.com/animejs/2.2.0/anime.min.js');
            }
        }
    }, {
        key: '__addSet__REACT_HOT_LOADER__',


        /**
         * @desc 原始数据过滤，强制更新数据
         */
        value: function __addSet__REACT_HOT_LOADER__(data) {
            var _this2 = this;

            var pages = data.pages,
                fixeds = data.fixeds,
                popups = data.popups;

            pages.forEach(function (page) {
                page.keyid = (0, _util.getRandomID)();
                page.layers.forEach(function (layer) {
                    _this2.originLayerSet(layer);
                });
            });
            fixeds.forEach(function (page) {
                page.keyid = (0, _util.getRandomID)();
                page.layers.forEach(function (layer) {
                    _this2.originLayerSet(layer);
                });
            });
            popups.forEach(function (page) {
                page.keyid = (0, _util.getRandomID)();
                page.layers.forEach(function (layer) {
                    _this2.originLayerSet(layer);
                });
            });

            return data;
        }

        // 设置画布样式


        // 设置style


        // 获取pageNum


        // 获取当前的page


        // 获取当前的pages


        // 获取当前page的layers


        // 获取当前layer


        // 添加layer, 如果index 存在，则插入


        // 插入多个layer，拆分combin 的时候用。size是外框的尺寸。index 表示要插入的位置


        // 获取page 的dom


        // 获取 layer 组数组


        // 获取layer 的 dom


        // 删除layer


        // 删除一组layer


        // 设置选中页面, 切换page 的时候，layer选中0


        // 设置选中页面, 切换page 的时候，layer选中0


        // 交换page数组位置


        // layer数组重新排序 从 i -> j


        // 删除page


        // 添加page


        // 复制page


        // 复制layer


        // 还原历史记录


        // 设置历史数据

    }]);
    return App;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'data', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'edata', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'initApp', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this3 = this;

        return function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(resdata, appset) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return db.openDB().then(function (res) {
                                    // 获取数据， 渲染app
                                    if (res) {
                                        getData(resdata, appset, function (d) {
                                            // console.log('ddddd', d);
                                            var tmp = +new Date();
                                            var scale = 1; // setScale(d.type);
                                            (0, _mobx.transaction)(function () {
                                                _this3.edata = {
                                                    owner: appset.owner || '',
                                                    appid: appset.appid,
                                                    phoneStyle: {
                                                        // 画布样式
                                                        transform: 'translate(-50%, 0) scale(' + scale + ')'
                                                    },
                                                    gridAdsorb: true, // 网格吸附
                                                    gridSize: 5, // 网格默认宽度
                                                    phoneScale: scale,
                                                    selectFPS: null, // 选择关键帧
                                                    animatePlay: true, // 默认有动画
                                                    setType: 'page', // 设置区域显示的类型，默认选择图层， app, page, layer, group
                                                    selectType: 'pages', // 当前选中的页面类型 pages, fixeds, popups
                                                    selectFixed: 0, // 当前选中的fixeds页面
                                                    selectPage: 0, // 当前选中的页面
                                                    selectPopup: 0, // 选择popup的标号
                                                    selectLayer: null, // 当前选中的layer
                                                    selectGroup: false, // 选择组
                                                    keys: tmp + (0, _util.getRandomID)(), // 设置渲染的，用于通知组件执行 render 函数，这个不会重新渲染整个phone，只是执行render
                                                    layerKeys: tmp + (0, _util.getRandomID)(), // 重新选择layer 使用
                                                    phoneKeys: tmp + (0, _util.getRandomID)(), // 重新渲染phone 使用
                                                    layerListKeys: tmp + (0, _util.getRandomID)(), //  重新执行layerlist 的 render
                                                    pageListKeys: tmp + (0, _util.getRandomID)() //  重新执行pagelist列表 的 render
                                                };

                                                _this3.data = _this3.addSet(d);
                                                _this3.setHistory();
                                            });
                                        });
                                    }
                                });

                            case 2:

                                // 设置历史记录
                                $(document).off('h5ds.setHistory').on('h5ds.setHistory', (0, _debounce.debounce)(500, function () {
                                    _this3.setHistory();
                                }));

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this3);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }();
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'originLayerSet', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        return function (layer) {
            layer.keyid = (0, _util.getRandomID)();
            if (layer.className === undefined) {
                layer.className = '';
            }
            // console.log('layer.keyid > ', layer.keyid);
            if (layer.set === undefined) {
                layer.set = {};
            }
            layer.set.hide = false;
            if (layer.set.lock === undefined) {
                layer.set.lock = false;
            }
        };
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'setPhoneStyle', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this4 = this;

        return function (scale) {
            _this4.edata.phoneStyle.transform = 'translate(-50%, 0) scale(' + scale + ')';
            _this4.edata.phoneScale = scale;
        };
    }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'setType', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this5 = this;

        return function (type) {
            _this5.edata.setType = type;
        };
    }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'setLayerStyle', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this6 = this;

        return function (style) {
            _this6.getLayer().style = style;
        };
    }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'getPageNum', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this7 = this;

        return function () {
            var _edata2 = _this7.edata,
                selectPage = _edata2.selectPage,
                selectPopup = _edata2.selectPopup,
                selectFixed = _edata2.selectFixed,
                selectType = _edata2.selectType;

            var pageNum = null;
            switch (selectType) {
                case 'pages':
                    pageNum = selectPage;
                    break;
                case 'fixeds':
                    pageNum = selectFixed;
                    break;
                case 'popups':
                    pageNum = selectPopup;
                    break;
            }
            return pageNum;
        };
    }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'getPage', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this8 = this;

        return function (type, index) {
            // let { pages, fixeds, popups } = this.data;
            var _edata3 = _this8.edata,
                selectPage = _edata3.selectPage,
                selectPopup = _edata3.selectPopup,
                selectFixed = _edata3.selectFixed,
                selectType = _edata3.selectType;

            var pageType = type ? type : selectType;
            var pageNum = null;
            switch (pageType) {
                case 'pages':
                    pageNum = (0, _util.isNot)(index) ? selectPage : index;
                    break;
                case 'fixeds':
                    pageNum = (0, _util.isNot)(index) ? selectFixed : index;
                    break;
                case 'popups':
                    pageNum = (0, _util.isNot)(index) ? selectPopup : index;
                    break;
            }
            // console.log('获取page => ', pageType, pageNum);
            var page = _this8.data[pageType][pageNum] || null;
            return page;
        };
    }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'getPages', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this9 = this;

        return function () {
            var selectType = _this9.edata.selectType;

            var pages = _this9.data[selectType] || [];
            return pages;
        };
    }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'getLayers', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this10 = this;

        return function () {
            var page = _this10.getPage();
            var layers = null;
            if (page) {
                layers = page.layers;
            } else {
                console.warn('page 不存在!');
            }
            return layers;
        };
    }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, 'getLayer', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this11 = this;

        return function () {
            var layers = _this11.getLayers();
            var selectLayer = _this11.edata.selectLayer;

            var layer = null;
            if (selectLayer === null) {
                console.warn('还未选择任何图层');
                return;
            }
            if (layers) {
                layer = layers[selectLayer];
            }
            return layer;
        };
    }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, 'addLayer', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this12 = this;

        return function (data, index) {
            var page = _this12.getPage();
            if (!page) {
                _message3.default.error('未选择任何页面！');
                return;
            }
            (0, _mobx.transaction)(function () {
                _this12.originLayerSet(data);
                if ((0, _util.isNot)(index)) {
                    page.layers.unshift(data);
                } else {
                    page.layers.splice(index, 0, data);
                }
                // this.setLayer(index || 0);
                _this12.edata.layerListKeys++;
            });
        };
    }
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, 'addLayers', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this13 = this;

        return function (layers, index, size) {
            var page = _this13.getPage();
            (0, _mobx.transaction)(function () {
                layers.forEach(function (layer) {
                    _this13.originLayerSet(layer);
                    layer.style.left += size.left;
                    layer.style.top += size.top;
                    page.layers.splice(index, 0, layer);
                });
                // console.log('>>>>', index);
                _this13.delLayer(index + layers.length);
                _this13.edata.layerListKeys++;
                // this.setLayer(index);
            });
        };
    }
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, 'getPageDom', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this14 = this;

        return function (type) {
            var selectType = _this14.edata.selectType;

            var $page = null;
            if (type) {
                // 强行设置
                selectType = type;
            }
            switch (selectType) {
                case 'popups':
                    $page = $('#pageViewPopup');
                    break;
                case 'fixeds':
                    $page = $('.page-viewup');
                    break;
                case 'pages':
                    $page = $('#pageView');
                    break;
            }
            return $page;
        };
    }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, 'getGroups', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this15 = this;

        return function () {
            var arr = [];
            var layers = _this15.getLayers();
            if (_this15.edata.selectGroup) {
                _this15.edata.selectGroup.forEach(function (num) {
                    arr.push({
                        key: num,
                        layer: layers[num]
                    });
                });
            }
            return arr.sort(function (a, b) {
                return a.key - b.key;
            });
        };
    }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, 'getLayerDom', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this16 = this;

        return function (index) {
            var $page = _this16.getPageDom();
            var selectLayer = _this16.edata.selectLayer;

            if (!(0, _util.isNot)(index)) {
                selectLayer = index;
            }
            if (!(0, _util.isNot)(selectLayer)) {
                return $page.children().children('.layer').eq(selectLayer);
            } else {
                return null;
            }
        };
    }
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, 'delLayer', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this17 = this;

        return function (index) {
            var selectLayer = _this17.edata.selectLayer;

            var layers = _this17.getLayers();
            (0, _mobx.transaction)(function () {
                layers.splice((0, _util.isNot)(index) ? selectLayer : index, 1);
                _this17.edata.selectLayer = null;
                _this17.edata.selectFPS = null;
                _this17.edata.keys++;
                _this17.setPage();
            });
        };
    }
}), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, 'delGroupLayer', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this18 = this;

        return function (callback) {
            var selectGroup = _this18.edata.selectGroup;

            if (selectGroup) {
                (0, _mobx.transaction)(function () {
                    var page = _this18.getPage();
                    page.layers = page.layers.filter(function (d, index) {
                        return selectGroup.indexOf(index) === -1;
                    });
                    callback && callback(page.layers.length);
                    _this18.edata.selectGroup = false;
                    _this18.edata.layerListKeys++;
                });
            } else {
                _message3.default.error('请选择多个图层！');
            }
        };
    }
}), _descriptor20 = _applyDecoratedDescriptor(_class.prototype, 'setPage', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this19 = this;

        return function (index, type) {
            console.log('setPage', index, type);
            if ((0, _util.isNot)(index)) {
                // ...
                index = _this19.getPageNum();
            }
            if (!type) {
                type = _this19.edata.selectType;
            }

            (0, _mobx.transaction)(function () {
                _this19.edata.selectType = type;
                switch (type) {
                    case 'popups':
                        {
                            if (_this19.data.popups.length === 0) {
                                _this19.edata.selectPopup = null;
                            } else {
                                _this19.edata.selectPopup = index;
                            }
                        }
                        break;
                    case 'pages':
                        {
                            if (_this19.data.pages.length === 0) {
                                _this19.edata.selectPage = null;
                            } else {
                                _this19.edata.selectPage = index;
                            }
                        }
                        break;
                    case 'fixeds':
                        _this19.edata.selectFixed = index;
                        break;
                }
                _this19.edata.selectLayer = null;
                _this19.edata.selectFPS = null;
                _this19.setType('page');
            });
        };
    }
}), _descriptor21 = _applyDecoratedDescriptor(_class.prototype, 'setLayer', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this20 = this;

        return function (index) {
            console.log('setLayer', index);
            (0, _mobx.transaction)(function () {
                _this20.edata.setType = 'layer';
                _this20.edata.selectLayer = index;
                _this20.edata.selectFPS = null;
                _this20.setType('layer');
            });
        };
    }
}), _descriptor22 = _applyDecoratedDescriptor(_class.prototype, 'exChangePage', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this21 = this;

        return function (i, j) {
            var pages = _this21.getPages();
            (0, _mobx.transaction)(function () {
                new Array(Math.abs(i - j)).fill(1).forEach(function (elem, index) {
                    // 从上往下
                    if (i < j) {
                        var _ref2 = [pages[i + 1], pages[i]];
                        pages[i] = _ref2[0];
                        pages[i + 1] = _ref2[1];

                        i++;
                    } else {
                        var _ref3 = [pages[i], pages[i - 1]];
                        pages[i - 1] = _ref3[0];
                        pages[i] = _ref3[1];

                        i--;
                    }
                });
                var selectType = _this21.edata.selectType;

                switch (selectType) {
                    case 'popups':
                        _this21.edata.selectPopup = j;
                        break;
                    case 'fixeds':
                        _this21.edata.selectFixed = j;
                        break;
                    case 'pages':
                        _this21.edata.selectPage = j;
                        break;
                }
                _this21.edata.pageListKeys++;
            });
        };
    }
}), _descriptor23 = _applyDecoratedDescriptor(_class.prototype, 'exChangeLayer', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this22 = this;

        return function (i, j) {
            var layers = _this22.getLayers();
            (0, _mobx.transaction)(function () {
                // 往下， 比如从 0 -> 2 ( 1 -> 0, 2 -> 1, 0 -> 2)  (0,1,2 -> 1,2,0)
                new Array(Math.abs(i - j)).fill(1).forEach(function () {
                    console.log('交换 i -> j', i, j);
                    // 从上往下
                    if (i < j) {
                        var _ref4 = [layers[i + 1], layers[i]];
                        layers[i] = _ref4[0];
                        layers[i + 1] = _ref4[1];

                        i++;
                    } else {
                        var _ref5 = [layers[i], layers[i - 1]];
                        layers[i - 1] = _ref5[0];
                        layers[i] = _ref5[1];

                        i--;
                    }
                });
                _this22.edata.selectLayer = j;
                _this22.edata.selectFPS = null;
                _this22.edata.keys++;
                _this22.edata.layerListKeys++;
            });
        };
    }
}), _descriptor24 = _applyDecoratedDescriptor(_class.prototype, 'delPage', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this23 = this;

        return function (index) {
            var _edata4 = _this23.edata,
                selectType = _edata4.selectType,
                selectPage = _edata4.selectPage,
                selectPopup = _edata4.selectPopup,
                selectFixed = _edata4.selectFixed;

            (0, _mobx.transaction)(function () {
                var pages = _this23.data[selectType];
                switch (selectType) {
                    case 'popups':
                        {
                            index = (0, _util.isNot)(index) ? selectPopup : index;
                            pages.splice(index, 1);
                            if (pages.length > 0) {
                                _this23.edata.selectPopup = 0;
                            } else {
                                _this23.edata.selectPopup = null;
                            }
                        }
                        break;
                    case 'pages':
                        {
                            index = (0, _util.isNot)(index) ? selectPage : index;
                            pages.splice(index, 1);
                            if (pages.length > 0) {
                                _this23.edata.selectPage = 0;
                            } else {
                                _this23.edata.selectPage = null;
                            }
                        }
                        break;
                    case 'fixeds':
                        {
                            index = (0, _util.isNot)(index) ? selectFixed : index;
                            pages.splice(index, 1);
                            if (pages.length > 0) {
                                _this23.edata.selectFixed = 0;
                            } else {
                                _this23.edata.selectFixed = null;
                            }
                        }
                        break;
                }
                _this23.edata.pageListKeys++;
            });
        };
    }
}), _descriptor25 = _applyDecoratedDescriptor(_class.prototype, 'addPage', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this24 = this;

        return function (obj) {
            // 如果obj不存在
            if (!obj) {
                obj = JSON.parse('{\n                "id": null,\n                "name": "\u7A7A\u767D\u9875\u9762",\n                "desc": "\u9875\u9762\u63CF\u8FF0",\n                "style": {"height": ' + _set.appHeight + '},\n                "layers": [],\n                "animate": [],\n                "slider": {\n                    "animate": 1,\n                    "autoplay": false,\n                    "lock": false,\n                    "time": 5\n                }\n            }');
            }
            var pages = _this24.getPages();
            (0, _mobx.transaction)(function () {
                var key = null;
                switch (_this24.edata.selectType) {
                    case 'pages':
                        key = 'selectPage';
                        break;
                    case 'fixeds':
                        key = 'selectFixed';
                        break;
                    case 'popups':
                        key = 'selectPopup';
                        break;
                }
                obj.keyid = (0, _util.getRandomID)();
                var selectNum = _this24.edata[key]; // 当前选中的pageNum
                pages.splice(selectNum + 1, 0, obj); // 在其后插入数据
                _this24.edata[key] = selectNum + 1; // 切换到插入的页面
                _this24.edata.selectLayer = null;
                _this24.edata.selectFPS = null;
                _this24.edata.keys++;
                _this24.edata.pageListKeys++;
            });
        };
    }
}), _descriptor26 = _applyDecoratedDescriptor(_class.prototype, 'copyPage', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this25 = this;

        return function (index) {
            var _edata5 = _this25.edata,
                selectType = _edata5.selectType,
                selectPage = _edata5.selectPage,
                selectPopup = _edata5.selectPopup,
                selectFixed = _edata5.selectFixed;

            var selectNum = _this25.getPageNum();
            var data = _this25.data[selectType][index || selectNum];
            data = (0, _util.deepClone)(data);
            (0, _mobx.transaction)(function () {
                data.keyid = (0, _util.getRandomID)();
                _this25.data[selectType].splice(index || selectPage, 0, data);
            });
        };
    }
}), _descriptor27 = _applyDecoratedDescriptor(_class.prototype, 'copyLayer', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this26 = this;

        return function (index) {
            var _edata6 = _this26.edata,
                selectType = _edata6.selectType,
                selectPage = _edata6.selectPage,
                selectLayer = _edata6.selectLayer,
                selectPopup = _edata6.selectPopup,
                selectFixed = _edata6.selectFixed;

            var selectNum = _this26.getPageNum();
            if (selectLayer === null && index === undefined) {
                _message3.default.error('请先选择一个图层进行复制！');
                return;
            }
            index === undefined ? index = selectLayer : null;
            var data = _this26.data[selectType][selectNum].layers[index];
            (0, _mobx.transaction)(function () {
                var layers = _this26.data[selectType][selectNum].layers;
                var d = (0, _mobx.toJS)(data);
                if (d.id) {
                    d.id = 'layer_' + (0, _util.getRandomID)();
                }

                // 帧图层有点特殊
                if (d.type === 'fps') {
                    d.data.id = (0, _util.getRandomID)(6);
                }
                d.keyid = (0, _util.getRandomID)();
                layers.splice(index, 0, d);
            });
        };
    }
}), _descriptor28 = _applyDecoratedDescriptor(_class.prototype, 'doHistory', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this27 = this;

        return function (type) {
            console.log('还原历史记录 > 游标', _this27.historyIndex, _this27.history.length);
            if (_this27.historyIndex >= 0) {
                if (type === 'undo') {
                    _this27.historyIndex--;
                    if (_this27.historyIndex < 0) {
                        _this27.historyIndex = 0;
                    }
                } else {
                    _this27.historyIndex++;
                    if (_this27.historyIndex > _this27.history.length) {
                        _this27.historyIndex = _this27.history.length - 1;
                    }
                }

                var _ref6 = _this27.history[_this27.historyIndex] || {},
                    data = _ref6.data,
                    edata = _ref6.edata;

                if (data) {
                    (0, _mobx.transaction)(function () {
                        _this27.data = JSON.parse(data);
                        edata = JSON.parse(edata);
                        for (var key in edata) {
                            _this27.edata[key] = edata[key];
                        }
                    });
                }
            }
        };
    }
}), _descriptor29 = _applyDecoratedDescriptor(_class.prototype, 'setHistory', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this28 = this;

        return function () {
            console.log('history 记录， 游标 ', _this28.historyIndex, _this28.history.length);
            (0, _mobx.transaction)(function () {
                // 下标如果不是最后一个，删除后面的，重新记录
                if (_this28.history.length !== _this28.historyIndex + 1) {
                    _this28.history.splice(_this28.history.length - 1 - _this28.historyIndex, _this28.history.length - 1);
                }

                var all = {
                    data: (0, _stringify2.default)(_this28.data),
                    edata: (0, _stringify2.default)(_this28.edata)
                };
                // 记录操作
                _this28.history.push(all);

                // 设置本地缓存
                (0, _localStorage.setStorage)('APP_DATA', all.data);
                (0, _localStorage.setStorage)('APP_EDATA', all.edata);

                // 最多记录20次，太多会内存溢出
                if (_this28.history.length > 20) {
                    _this28.history.shift();
                }

                // 重置游标
                _this28.historyIndex = _this28.history.length - 1;
            });
        };
    }
})), _class);

// 获取数据

exports.default = App;
function getData(data, appset, iniApp) {
    // 获取缓存数据
    var appStore = (0, _localStorage.getStorage)('APP_STORE');
    var appid = appset.appid;

    // if (owner === null || appid === null) {
    //     message.error('操作失败，请先选择APP，owner,id参数不能为空', 9999);
    //     return;
    // }

    // 如果有缓存， 且当前打开的 appid

    if (appid && appStore === appid) {
        var APP_DATA = (0, _localStorage.getStorage)('APP_DATA');
        // 数据清洗 - 将 缓存的图片进行数据清洗，因为刷新后，二进制缓存更新了。
        (0, _imgURLClear.imgURLClear)(APP_DATA, function () {
            iniApp(APP_DATA);
        });
    } else {
        // 如果没有 owner 和 appid 模拟一个
        if (!appid) {
            appid = +new Date();
        }
        (0, _localStorage.setStorage)('APP_STORE', appid);
        iniApp(data);
    }
}

/**
 * @desc 设置 scale
 */
function setScale(type) {
    var scale = 1;
    var winWidth = $(window).width();

    if (type === 'phone') {
        if (winWidth >= 1920) {
            scale = 1.2;
        } else if (winWidth >= 1600) {
            scale = 1;
        } else {
            // ...
        }
    } else {
        if (winWidth >= 1920) {
            scale = 1;
        } else if (winWidth >= 1600) {
            scale = 0.6;
        } else {
            scale = 0.5;
        }
    }
    return scale;
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(App, 'App', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/store/App.js');

    __REACT_HOT_LOADER__.register(getData, 'getData', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/store/App.js');

    __REACT_HOT_LOADER__.register(setScale, 'setScale', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/store/App.js');
}();

;
module.exports = exports['default'];

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.throttle = throttle;
/**
 * @desc   函数节流。
 * 适用于限制`resize`和`scroll`等函数的调用频率
 *
 * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}   noTrailing     可选，默认为false。
 *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
 *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
 *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
 * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                    执行去节流功能时，调用`callback`。
 * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
 *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
 *
 * @return {Function}  新的节流函数
 */
function throttle(delay, noTrailing, callback, debounceMode) {
    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeoutID;

    // Keep track of the last time `callback` was executed.
    var lastExec = 0;

    // `noTrailing` defaults to falsy.
    if (typeof noTrailing !== 'boolean') {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
    }

    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper() {
        var self = this;
        var elapsed = Number(new Date()) - lastExec;
        var args = arguments;

        // Execute `callback` and update the `lastExec` timestamp.
        function exec() {
            lastExec = Number(new Date());
            callback.apply(self, args);
        }

        // If `debounceMode` is true (at begin) this is used to clear the flag
        // to allow future `callback` executions.
        function clear() {
            timeoutID = undefined;
        }

        if (debounceMode && !timeoutID) {
            // Since `wrapper` is being called for the first time and
            // `debounceMode` is true (at begin), execute `callback`.
            exec();
        }

        // Clear any existing timeout.
        if (timeoutID) {
            clearTimeout(timeoutID);
        }

        if (debounceMode === undefined && elapsed > delay) {
            // In throttle mode, if `delay` time has been exceeded, execute
            // `callback`.
            exec();
        } else if (noTrailing !== true) {
            // In trailing throttle mode, since `delay` time has not been
            // exceeded, schedule `callback` to execute `delay` ms after most
            // recent execution.
            //
            // If `debounceMode` is true (at begin), schedule `clear` to execute
            // after `delay` ms.
            //
            // If `debounceMode` is false (at end), schedule `callback` to
            // execute after `delay` ms.
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
        }
    }

    // Return the wrapper function.
    return wrapper;
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(throttle, 'throttle', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/utils/throttle.js');
}();

;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _defineProperty = __webpack_require__(65);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _desc, _value, _class, _descriptor;

var _mobx = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    (0, _defineProperty2.default)(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var LayerFun = (_class = // app数据
function LayerFun() {
    (0, _classCallCheck3.default)(this, LayerFun);

    _initDefineProp(this, 'layerfun', _descriptor, this);
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'layerfun', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
})), _class);
exports.default = LayerFun;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(LayerFun, 'LayerFun', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/store/LayerFun.js');
}();

;
module.exports = exports['default'];

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = __webpack_require__(18);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _set = __webpack_require__(67);

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = __webpack_require__(17);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = __webpack_require__(19);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(123);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _selectGroup = __webpack_require__(23);

var _mobxReact = __webpack_require__(6);

var _mobx = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayerList = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(LayerList, _Component);

    function LayerList(props) {
        (0, _classCallCheck3.default)(this, LayerList);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LayerList.__proto__ || (0, _getPrototypeOf2.default)(LayerList)).call(this, props));

        _this.selectType = function () {
            return _this.__selectType__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.copyLayer = function () {
            return _this.__copyLayer__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setLayer = function () {
            return _this.__setLayer__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.delLayer = function () {
            return _this.__delLayer__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.viewLayer = function () {
            return _this.__viewLayer__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.locklayer = function () {
            return _this.__locklayer__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        return _this;
    }

    // 设置类型名称


    (0, _createClass3.default)(LayerList, [{
        key: '__selectType__REACT_HOT_LOADER__',


        // 复制layer
        value: function __selectType__REACT_HOT_LOADER__() {
            var selectType = this.props.app.edata.selectType;

            var name = '';
            switch (selectType) {
                case 'pages':
                    name = '页面';
                    break;
                case 'fixeds':
                    name = '浮动';
                    break;
                case 'popups':
                    name = '弹窗';
                    break;
            }
            return name;
        }
    }, {
        key: '__copyLayer__REACT_HOT_LOADER__',


        // 选择layer
        value: function __copyLayer__REACT_HOT_LOADER__(e, index) {
            e.stopPropagation();
            this.props.app.copyLayer(index);
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__setLayer__REACT_HOT_LOADER__',


        // 删除layer
        value: function __setLayer__REACT_HOT_LOADER__(index, e) {
            var _this2 = this;

            // 如果是点住ctrl 不放开。进入组的选择模式
            if (e && e.ctrlKey) {
                var _props$app = this.props.app,
                    edata = _props$app.edata,
                    getPageDom = _props$app.getPageDom,
                    getLayers = _props$app.getLayers;

                (0, _mobx.transaction)((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                    var $control;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!edata.selectGroup) {
                                        edata.selectGroup = [];
                                        $control = getPageDom().find('.h5ds-control');
                                        // 判断之前是否有选中一个

                                        if ($control[0]) {
                                            edata.selectGroup.push(edata.selectLayer);
                                        }
                                    }

                                    // 如果二次点击，取消选中
                                    if (edata.selectGroup.indexOf(index) === -1) {
                                        edata.selectGroup.push(index);
                                    } else {
                                        edata.selectGroup.splice(edata.selectGroup.findIndex(function (v) {
                                            return v === index;
                                        }), 1);
                                    }

                                    edata.selectGroup = [].concat((0, _toConsumableArray3.default)(new _set2.default(edata.selectGroup)));
                                    if (edata.selectGroup.length > 1) {
                                        edata.selectLayer = null;
                                        edata.setType = 'group';
                                    }
                                    _context.next = 6;
                                    return (0, _selectGroup.setStaticGroup)(getPageDom, edata.selectGroup);

                                case 6:
                                    _context.next = 8;
                                    return (0, _selectGroup.dragGroupEvent)(getLayers, edata);

                                case 8:
                                    edata.keys++;

                                case 9:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this2);
                })));
                return;
            }

            this.props.app.setLayer(index);
            $(document).trigger('h5ds.iniControl'); // 实例化控制器
        }
    }, {
        key: '__delLayer__REACT_HOT_LOADER__',


        // 隐藏，显示layer
        value: function __delLayer__REACT_HOT_LOADER__(e, index, elem) {
            var _this3 = this;

            e.stopPropagation();
            (0, _mobx.transaction)(function () {
                _this3.props.app.delLayer(index);
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__viewLayer__REACT_HOT_LOADER__',


        // lock 图层
        value: function __viewLayer__REACT_HOT_LOADER__(e, elem) {
            var _this4 = this;

            e.stopPropagation();
            (0, _mobx.transaction)(function () {
                elem.set.hide = !elem.set.hide;
                _this4.props.app.edata.layerListKeys++;
            });
        }
    }, {
        key: '__locklayer__REACT_HOT_LOADER__',
        value: function __locklayer__REACT_HOT_LOADER__(e, elem) {
            var _this5 = this;

            e.stopPropagation();
            (0, _mobx.transaction)(function () {
                elem.set.lock = !elem.set.lock;
                _this5.props.app.edata.layerListKeys++;
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this6 = this;

            $('#layerlist').on('uniqend', function (e, data) {
                console.log(data);
                _this6.props.app.exChangeLayer(data.from, data.to);
                _this6.setLayer(data.to);
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $('#layerlist').off('uniqend');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            var _props$app$edata = this.props.app.edata,
                selectLayer = _props$app$edata.selectLayer,
                selectGroup = _props$app$edata.selectGroup,
                selectPage = _props$app$edata.selectPage,
                selectPopup = _props$app$edata.selectPopup,
                selectFixed = _props$app$edata.selectFixed,
                layerListKeys = _props$app$edata.layerListKeys;

            var layers = this.props.app.getLayers() || [];
            return _react2.default.createElement(
                'div',
                { className: 'layerlist h5ds-drag', 'data-dragset': '{"limit":true, "undrag":["#layerlist"]}' },
                _react2.default.createElement(
                    'h1',
                    { className: 'clearfix' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-caidan' }),
                    _react2.default.createElement(
                        'span',
                        null,
                        this.selectType(),
                        '\uFF1A\u56FE\u5C42\u5217\u8868'
                    ),
                    _react2.default.createElement(
                        'a',
                        {
                            'data-toggle': '[{"dom":"#layerlist","class":"hide"},{"dom":"#layerlistIcon","class":"layerlist-icon"}]'
                        },
                        _react2.default.createElement('i', { id: 'layerlistIcon', className: 'h5ds ico5-a1down' })
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    { id: 'layerlist', className: 'h5ds-uniqlist' },
                    layers.length > 0 ? layers.map(function (elem, index) {
                        var vCName = ['showlayer'];
                        var lCName = ['locklayer'];
                        if (elem.set.hide) {
                            vCName.push('layer_hide');
                        }
                        if (elem.set.lock) {
                            lCName.push('layer_lock');
                        }
                        var classActive = ['layer-item'];

                        // 如果是选择多个
                        if (selectGroup) {
                            if (selectGroup.indexOf(index) !== -1) {
                                classActive.push('active');
                            }
                        } else if (selectLayer === index) {
                            classActive.push('active');
                        }
                        return _react2.default.createElement(
                            'li',
                            {
                                onClick: function onClick(e) {
                                    return _this7.setLayer(index, e);
                                },
                                'data-keyid': elem.keyid,
                                key: elem.keyid,
                                className: classActive.join(' ')
                            },
                            _react2.default.createElement(
                                'a',
                                { onClick: function onClick(e) {
                                        return _this7.viewLayer(e, elem);
                                    }, className: vCName.join(' ') },
                                _react2.default.createElement('i', { className: 'h5ds ico5-yanjing' })
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'name' },
                                elem.type
                            ),
                            _react2.default.createElement(
                                'a',
                                {
                                    onClick: function onClick(e) {
                                        return _this7.delLayer(e, index, elem);
                                    },
                                    className: 'dellayer',
                                    title: '\u5220\u9664\u56FE\u5C42'
                                },
                                _react2.default.createElement('i', { className: 'h5ds ico5-icodel' })
                            ),
                            _react2.default.createElement(
                                'a',
                                { onClick: function onClick(e) {
                                        return _this7.copyLayer(e, index);
                                    }, className: 'copylayer', title: '\u590D\u5236\u56FE\u5C42' },
                                _react2.default.createElement('i', { className: 'h5ds ico5-fuzhi' })
                            ),
                            _react2.default.createElement(
                                'a',
                                {
                                    onClick: function onClick(e) {
                                        return _this7.locklayer(e, elem);
                                    },
                                    className: lCName.join(' '),
                                    title: '\u9501\u5B9A\u56FE\u5C42'
                                },
                                _react2.default.createElement('i', { className: 'h5ds ico5-suo' })
                            )
                        );
                    }) : _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u6682\u65E0\u56FE\u5C42'
                        )
                    )
                )
            );
        }
    }]);
    return LayerList;
}(_react.Component)) || _class) || _class);
exports.default = LayerList;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(LayerList, 'LayerList', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/layerlist/LayerList.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 123 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(125);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _PageList = __webpack_require__(126);

var _PageList2 = _interopRequireDefault(_PageList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Left = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(Left, _Component);

    function Left(props) {
        (0, _classCallCheck3.default)(this, Left);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Left.__proto__ || (0, _getPrototypeOf2.default)(Left)).call(this, props));

        _this.changeTabs = function () {
            return _this.__changeTabs__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setActive = function () {
            return _this.__setActive__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {
            selected: 'pages' // popups, fixeds
        };
        return _this;
    }

    // 切换tabs


    (0, _createClass3.default)(Left, [{
        key: '__changeTabs__REACT_HOT_LOADER__',


        // 设置h5ds-active
        value: function __changeTabs__REACT_HOT_LOADER__(name) {
            this.setState({
                selected: name
            });
            this.props.app.setPage(0, name);
            $(document).trigger('h5ds.destoryControl');
        }
    }, {
        key: '__setActive__REACT_HOT_LOADER__',
        value: function __setActive__REACT_HOT_LOADER__(name) {
            var cName = ['h5ds-tab-head'];
            if (this.state.selected === name) {
                cName.push('h5ds-active');
            }
            return cName.join(' ');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'left' },
                _react2.default.createElement(
                    'div',
                    { className: 'h5ds-tab' },
                    _react2.default.createElement(
                        'div',
                        { className: 'h5ds-tab-header left-btn' },
                        _react2.default.createElement(
                            'ul',
                            null,
                            _react2.default.createElement(
                                'li',
                                { onClick: function onClick(e) {
                                        return _this2.changeTabs('pages');
                                    }, className: this.setActive('pages') },
                                '\u9875\u9762'
                            ),
                            _react2.default.createElement(
                                'li',
                                { onClick: function onClick(e) {
                                        return _this2.changeTabs('popups');
                                    }, className: this.setActive('popups') },
                                '\u5F39\u7A97'
                            ),
                            _react2.default.createElement(
                                'li',
                                { onClick: function onClick(e) {
                                        return _this2.changeTabs('fixeds');
                                    }, className: this.setActive('fixeds') },
                                '\u6D6E\u52A8'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'h5ds-tab-body left-pages' },
                        _react2.default.createElement(
                            'div',
                            { className: 'h5ds-tab-box', style: { display: 'block' } },
                            _react2.default.createElement(_PageList2.default, null)
                        )
                    )
                )
            );
        }
    }]);
    return Left;
}(_react.Component)) || _class) || _class);
exports.default = Left;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Left, 'Left', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/pagelist/Index.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 125 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _modal = __webpack_require__(48);

var _modal2 = _interopRequireDefault(_modal);

var _popconfirm = __webpack_require__(58);

var _popconfirm2 = _interopRequireDefault(_popconfirm);

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _input = __webpack_require__(60);

var _input2 = _interopRequireDefault(_input);

var _dec, _class;

__webpack_require__(49);

__webpack_require__(59);

__webpack_require__(10);

__webpack_require__(61);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _mobx = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextArea = _input2.default.TextArea;
var PageList = (_dec = (0, _mobxReact.inject)('app', 'layerfun'), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(PageList, _Component);

    function PageList() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, PageList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PageList.__proto__ || (0, _getPrototypeOf2.default)(PageList)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            visible: false,
            info: {}
            // pagesArr: [],
            // fixedsArr: [],
            // popupsArr: []
        }, _this.copyPage = function () {
            var _this2;

            return (_this2 = _this).__copyPage__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.delPage = function () {
            var _this3;

            return (_this3 = _this).__delPage__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _this.savePage = function () {
            var _this4;

            return (_this4 = _this).__savePage__REACT_HOT_LOADER__.apply(_this4, arguments);
        }, _this.setPage = function () {
            var _this5;

            return (_this5 = _this).__setPage__REACT_HOT_LOADER__.apply(_this5, arguments);
        }, _this.editInfo = function () {
            var _this6;

            return (_this6 = _this).__editInfo__REACT_HOT_LOADER__.apply(_this6, arguments);
        }, _this.setInfoOk = function () {
            var _this7;

            return (_this7 = _this).__setInfoOk__REACT_HOT_LOADER__.apply(_this7, arguments);
        }, _this.changeVal = function () {
            var _this8;

            return (_this8 = _this).__changeVal__REACT_HOT_LOADER__.apply(_this8, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    // 复制页面


    (0, _createClass3.default)(PageList, [{
        key: '__copyPage__REACT_HOT_LOADER__',


        // 删除page
        value: function __copyPage__REACT_HOT_LOADER__(e, index) {
            e.stopPropagation();
            this.props.app.copyPage(index);
            this.setPage(index + 1);
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__delPage__REACT_HOT_LOADER__',


        // 收藏页面
        value: function __delPage__REACT_HOT_LOADER__(e, index) {
            this.props.app.delPage(index);
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__savePage__REACT_HOT_LOADER__',


        // 设置页面
        value: function __savePage__REACT_HOT_LOADER__(e, index) {
            // ...
            $('.save-page-do').trigger('click');
        }
    }, {
        key: '__setPage__REACT_HOT_LOADER__',


        // 设置页面id
        value: function __setPage__REACT_HOT_LOADER__(index) {
            var _this9 = this;

            var _props$app = this.props.app,
                edata = _props$app.edata,
                initFps = _props$app.initFps;
            var selectType = edata.selectType;

            // 选择页面的时候，重新实例化帧动画

            console.log('选择另外的页面, 重新实例化fps');
            initFps();

            $(document).trigger('h5ds.destoryControl', {
                pageNum: index,
                selectType: selectType
            });
            (0, _mobx.transaction)(function () {
                _this9.props.app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__editInfo__REACT_HOT_LOADER__',


        // 修改info
        value: function __editInfo__REACT_HOT_LOADER__(e, elem) {
            e.stopPropagation();
            this.setState({
                visible: true,
                info: {
                    id: elem.id,
                    name: elem.name,
                    desc: elem.desc
                }
            });
        }
    }, {
        key: '__setInfoOk__REACT_HOT_LOADER__',


        // 设置值
        value: function __setInfoOk__REACT_HOT_LOADER__() {
            var _this10 = this;

            var getPage = this.props.app.getPage;
            var _state$info = this.state.info,
                id = _state$info.id,
                name = _state$info.name,
                desc = _state$info.desc;

            var page = getPage();
            if (id && !/^[_a-zA-Z][_a-zA-Z0-9]+/.test(id)) {
                _message3.default.error('id必须是字母或者下划线开头，且必须由字母，数字，或者下划线组成！');
                return;
            }
            (0, _mobx.transaction)(function () {
                page.id = id;
                page.name = name;
                page.desc = desc;
                $(document).trigger('h5ds.setHistory');
                _this10.setState({
                    visible: false
                });
            });
        }
    }, {
        key: '__changeVal__REACT_HOT_LOADER__',
        value: function __changeVal__REACT_HOT_LOADER__(val, key) {
            var info = this.state.info;


            info[key] = val;
            this.setState({
                info: info
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this11 = this;

            $('#pagelistId').on('uniqend', function (e, data) {
                _this11.props.app.exChangePage(data.from, data.to);
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $('#pagelistId').off('uniqend');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this12 = this;

            var _props$app$edata = this.props.app.edata,
                selectType = _props$app$edata.selectType,
                selectPage = _props$app$edata.selectPage,
                selectPopup = _props$app$edata.selectPopup,
                selectFixed = _props$app$edata.selectFixed,
                pageListKeys = _props$app$edata.pageListKeys;
            var _props$app2 = this.props.app,
                getPage = _props$app2.getPage,
                getPageNum = _props$app2.getPageNum,
                data = _props$app2.data;

            var pages = data[selectType] || [];
            var cName = ['a-pages'];
            if (selectType !== 'fixeds') {
                cName.push('h5ds-uniqlist');
            }
            // 选择的页面
            var selectNum = getPageNum();
            var _state = this.state,
                visible = _state.visible,
                info = _state.info;
            var pageToHTML = this.props.layerfun.pageToHTML;

            // const { pagesArr, fixedsArr, popupsArr } = this.state;

            console.log('重新渲染pagelist，是因为 pageToHTML');

            return _react2.default.createElement(
                'ul',
                { className: cName.join(' '), id: 'pagelistId' },
                pages.map(function (elem, index) {
                    return _react2.default.createElement(
                        'li',
                        {
                            onClick: function onClick(e) {
                                return _this12.setPage(index);
                            },
                            key: elem.keyid,
                            className: 'page-item' + (selectNum === index ? ' active' : '')
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'page-content' },
                            _react2.default.createElement(
                                'div',
                                {
                                    className: 'page-min',
                                    style: {
                                        backgroundImage: elem.style.backgroundImage,
                                        backgroundColor: elem.style.backgroundColor,
                                        backgroundRepeat: elem.style.backgroundRepeat,
                                        backgroundSize: elem.style.backgroundSize
                                    }
                                },
                                pageToHTML(elem, true, true)
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'page-info' },
                            _react2.default.createElement(
                                'a',
                                {
                                    onClick: function onClick(e) {
                                        return _this12.editInfo(e, elem);
                                    },
                                    className: 'important edit-page',
                                    title: '\u7F16\u8F91\u9875\u9762\u4FE1\u606F'
                                },
                                _react2.default.createElement('i', { className: 'h5ds ico5-bianji1' })
                            ),
                            selectType !== 'fixeds' ? _react2.default.createElement(
                                'a',
                                { onClick: function onClick(e) {
                                        return _this12.copyPage(e, index);
                                    }, className: 'copy-page', title: '\u590D\u5236\u9875\u9762' },
                                _react2.default.createElement('i', { className: 'h5ds ico5-fuzhi' })
                            ) : null,
                            selectType !== 'fixeds' ? _react2.default.createElement(
                                'a',
                                { onClick: function onClick(e) {
                                        return e.stopPropagation();
                                    }, className: 'del-page', title: '\u5220\u9664\u9875\u9762' },
                                _react2.default.createElement(
                                    _popconfirm2.default,
                                    {
                                        placement: 'rightBottom',
                                        title: '\u662F\u5426\u5220\u9664\u8BE5\u9875\u9762\uFF1F',
                                        onConfirm: function onConfirm(e) {
                                            return _this12.delPage(e, index);
                                        }
                                    },
                                    _react2.default.createElement('i', { className: 'h5ds ico5-icodel' })
                                )
                            ) : null,
                            _react2.default.createElement(
                                'a',
                                { onClick: function onClick(e) {
                                        return _this12.savePage(e, index);
                                    }, className: 'save-page', title: '\u6536\u85CF\u9875\u9762' },
                                _react2.default.createElement('i', { className: 'h5ds ico5-shoucang' })
                            )
                        )
                    );
                }),
                _react2.default.createElement(
                    _modal2.default,
                    {
                        title: '\u4FEE\u6539\u9875\u9762\u53C2\u6570',
                        visible: visible,
                        width: 420,
                        onOk: this.setInfoOk,
                        className: 'set-page-info',
                        onCancel: function onCancel(e) {
                            return _this12.setState({ visible: false });
                        }
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement(
                            'label',
                            null,
                            'ID\uFF1A'
                        ),
                        _react2.default.createElement(_input2.default, { value: info.id, onChange: function onChange(e) {
                                return _this12.changeVal(e.target.value, 'id');
                            } })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement(
                            'label',
                            null,
                            '\u9875\u9762\u540D\u5B57\uFF1A'
                        ),
                        _react2.default.createElement(_input2.default, { value: info.name, onChange: function onChange(e) {
                                return _this12.changeVal(e.target.value, 'name');
                            } })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'item' },
                        _react2.default.createElement(
                            'label',
                            null,
                            '\u9875\u9762\u63CF\u8FF0\uFF1A'
                        ),
                        _react2.default.createElement(TextArea, { value: info.desc, rows: 4, onChange: function onChange(e) {
                                return _this12.changeVal(e.target.value, 'desc');
                            } })
                    )
                )
            );
        }
    }]);
    return PageList;
}(_react.Component)) || _class) || _class);
exports.default = PageList;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(TextArea, 'TextArea', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/pagelist/PageList.jsx');

    __REACT_HOT_LOADER__.register(PageList, 'PageList', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/pagelist/PageList.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(52);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _assign = __webpack_require__(39);

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

// import ControlLine from './ControlLine';

// import PageTpls from '../pageTpls/PageTpls';

// import { initLayerAction } from './initLayerAction';
// import { isNot } from '@/utils/util';


__webpack_require__(128);

__webpack_require__(129);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _set = __webpack_require__(12);

var _domUtils = __webpack_require__(130);

var _selectGroup = __webpack_require__(23);

var _mobxReact = __webpack_require__(6);

var _Grid = __webpack_require__(131);

var _Grid2 = _interopRequireDefault(_Grid);

var _Ruler = __webpack_require__(132);

var _Ruler2 = _interopRequireDefault(_Ruler);

var _rect = __webpack_require__(22);

var _mobx = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Center = (_dec = (0, _mobxReact.inject)('app', 'layerfun'), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(Center, _Component);

    function Center(props) {
        (0, _classCallCheck3.default)(this, Center);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Center.__proto__ || (0, _getPrototypeOf2.default)(Center)).call(this, props));

        _this.initLayerAction = function () {
            return _this.__initLayerAction__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setFixed = function () {
            return _this.__setFixed__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.changePanel = function () {
            return _this.__changePanel__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.iniControl = function () {
            return _this.__iniControl__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setStyle = function () {
            return _this.__setStyle__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setControlLine = function () {
            return _this.__setControlLine__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {
            showPanel: false,
            keys: +new Date()
        };
        _this.defaultHeight = _set.appHeight;
        _this.defaultWidth = _set.appWidth;
        return _this;
    }

    // 实例化一些方法，svg，地图 等。render 之后执行


    (0, _createClass3.default)(Center, [{
        key: '__initLayerAction__REACT_HOT_LOADER__',


        // 设置精度
        value: function __initLayerAction__REACT_HOT_LOADER__() {
            $(document).trigger('h5ds.centerRenderEnd');
            console.log('渲染完成！》》》》》》》》》》》》》');

            // 设置吸附效果
            $('[data-adsorbent]').each(function () {
                var $this = $(this);
                var adsorbent = JSON.parse($this.attr('data-adsorbent'));
                var style = {};
                if (adsorbent.abottom !== undefined) {
                    style.bottom = 0;
                }
                if (adsorbent.atop !== undefined) {
                    style.top = 0;
                }
                if (adsorbent.aleft !== undefined) {
                    style.left = 0;
                }
                if (adsorbent.aright !== undefined) {
                    style.right = 0;
                }
                $this.css(style);
            });
        }
    }, {
        key: '__setFixed__REACT_HOT_LOADER__',


        // 折叠面板
        value: function __setFixed__REACT_HOT_LOADER__(val) {
            // let size = this.props.app.edata.gridSize;
            // // 将 val 转化为最接近的 size 的倍数
            // val = Math.round(val / size, 10) * size;
            return val;
        }
    }, {
        key: '__changePanel__REACT_HOT_LOADER__',


        // 控制器
        value: function __changePanel__REACT_HOT_LOADER__() {
            this.setState({
                showPanel: !this.state.showPanel
            });
        }
    }, {
        key: '__iniControl__REACT_HOT_LOADER__',


        // 设置 page 的样式
        value: function __iniControl__REACT_HOT_LOADER__() {
            var _this2 = this;

            var _props$app = this.props.app,
                data = _props$app.data,
                edata = _props$app.edata,
                getLayer = _props$app.getLayer;

            edata.layerKeys = +new Date();
            var $pageView = (0, _domUtils.getPageView)(edata);
            var $nowlayer = $pageView.children().children('.layer').eq(edata.selectLayer);

            var $control = $pageView.find('.h5ds-control');

            // 先注销之前的控制器
            if ($control[0]) {
                $control.remove();
                $control = null;
            }

            if (!$nowlayer[0]) {
                console.warn('未选择layer');
                return;
            }

            var editorSet = this.props.layerfun.layersSet[getLayer().type].editorSet || {};

            // 初始化当前的控制器
            $nowlayer.control({
                movex: editorSet.x === false ? false : true,
                movey: editorSet.y === false ? false : true,
                rotate: editorSet.rotate === false ? false : true,
                autosize: true,
                fixedsize: true
            });

            // 控制器事件绑定
            $nowlayer.off('change').on('change', function (e, data) {
                // 如果data没值，说明是点击事件，直接跳过
                if (!data) {
                    return false;
                }

                console.log(data);

                (0, _mobx.transaction)(function () {
                    var layer = _this2.props.app.getLayer();
                    if (!layer) {
                        return null;
                    }
                    for (var key in data) {
                        switch (key) {
                            case 'left':
                                layer.style.left = _this2.setFixed(data[key]);
                                break;
                            case 'top':
                                layer.style.top = _this2.setFixed(data[key]);
                                break;
                            case 'width':
                                layer.style.width = data[key];
                                break;
                            case 'height':
                                layer.style.height = data[key];
                                break;
                            case 'transform':
                                layer.style.transform = data['transform'];
                                break;
                        }
                    }
                    _this2.props.app.edata.keys++;
                });
                // 保存记录
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__setStyle__REACT_HOT_LOADER__',


        // 设置对齐线
        value: function __setStyle__REACT_HOT_LOADER__(type) {
            var _props$app$edata = this.props.app.edata,
                selectType = _props$app$edata.selectType,
                selectFixed = _props$app$edata.selectFixed;

            var style = {};
            var page = this.props.app.getPage() || {};
            switch (selectType) {
                case 'popups':
                    {
                        if (type === 'popups') {
                            style.display = 'block';
                        } else {
                            style.pointerEvents = 'none';
                        }
                    }
                    break;
                case 'fixeds':
                    {
                        if (type === 'popups') {
                            style.display = 'none';
                        }
                        if (type + selectFixed === 'fixedUp0' || type + selectFixed === 'fixedDown1') {
                            style.width = '100%';
                            style.height = '100%';
                        } else {
                            style.pointerEvents = 'none';
                        }
                    }
                    break;
                case 'pages':
                    {
                        if (type === 'popups') {
                            style.display = 'none';
                        } else if (type === 'pages') {
                            // ...
                        } else {
                            style.pointerEvents = 'none';
                        }
                    }
                    break;
            }
            return (0, _assign2.default)(style, page.style || {});
        }
    }, {
        key: '__setControlLine__REACT_HOT_LOADER__',
        value: function __setControlLine__REACT_HOT_LOADER__() {
            var scale = 1,
                target = null,
                targetPx = null,
                other = null,
                otherPx = [];
            var getLayerDom = this.props.app.getLayerDom;

            $(document).on('controlstart', function (e) {
                scale = $('.phonebox').transform('scale') || 1;
                target = getLayerDom();
                if (!target) {
                    return;
                }
                other = target.siblings('.layer');
                console.log(scale, target, other);
                other.each(function () {
                    otherPx.push((0, _rect.rectParam)($(this)));
                });
            }).on('controlmove', function (e) {
                targetPx = (0, _rect.rectParam)(target);
                console.log('>>>>', targetPx);
            }).on('controlend', function (e) {});
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            console.log('重新选择页面........... fps');
            this.props.app.initFps();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            var _props$app2 = this.props.app,
                edata = _props$app2.edata,
                getPage = _props$app2.getPage,
                getPageNum = _props$app2.getPageNum,
                getLayers = _props$app2.getLayers;

            $(document).on('h5ds.showPageTpls', function (e) {
                _this3.setState({
                    showPanel: true
                });
            });

            // 点击空白，销毁layer控制器
            $(document).on('mousedown.destoryControl', function (e) {
                if (!$(e.target).closest('.layer')[0] && $(e.target).closest('#phone')[0]) {
                    // 销毁后，取消layer 的选择
                    $(document).trigger('h5ds.destoryControl');
                }
            });

            // 销毁控制器的事件 data: { pageNum, selectType }
            $(document).on('h5ds.destoryControl', function (e, data) {
                var selectType = edata.selectType;

                edata.selectGroup = false;
                (0, _domUtils.destoryControl)(function () {
                    edata.selectLayer = null;
                    var pageNum = getPageNum();
                    var stype = selectType;
                    if (data) {
                        pageNum = data.pageNum;
                        stype = data.selectType;
                    }
                    _this3.props.app.setPage(pageNum, stype);
                });
            });

            // 初始化控制器方法
            $(document).on('h5ds.iniControl', function () {
                _this3.iniControl();
            });

            // 重新渲染phone，改变key
            $(document).on('h5ds.keyPhone', function () {
                _this3.setState({
                    keys: +new Date()
                });
            });

            // 播放动画
            $(document).on('h5ds.playAnimate', function () {
                // css 动画播放
                $('#phoneApp').hide(0).show(0);

                // 帧动画执行
                var fpsInstance = _this3.props.app.fpsInstance;

                for (var key in fpsInstance) {
                    if (fpsInstance[key]) {
                        fpsInstance[key].restart();
                    }
                }
            });

            // 选择组的事件
            (0, _selectGroup.initGroupEvent)(this.props.app, edata, function (arr) {
                (0, _mobx.transaction)(function () {
                    edata.selectGroup = arr;
                    edata.setType = 'group';
                });
            });
            // 拖动组
            (0, _selectGroup.dragGroupEvent)(getLayers, edata);

            // 设置高度
            $('#setPageHeight').on('mousedown', function (e) {
                e.stopPropagation();
                var page = getPage();
                if (!page.style.height) {
                    page.style.height = _this3.defaultHeight;
                }
                var y0 = e.pageY;
                var oldHei = page.style.height; // 手机高度
                var nowHei = page.style.height;
                var phoneScale = edata.phoneStyle.transform.transformValue('scale') || 1;
                phoneScale = parseFloat(phoneScale);
                $(document).on('mousemove.setPageHeight', function (e) {
                    nowHei = oldHei + (e.pageY - y0) / phoneScale;
                    if (nowHei < _this3.defaultHeight) {
                        nowHei = _this3.defaultHeight;
                    }
                    page.style.height = parseInt(nowHei, 10);
                }).on('mouseup.setPageHeight', function (e) {
                    $(document).off('mousemove.setPageHeight mouseup.setPageHeight');
                    page.style.height = parseInt(nowHei, 10);
                });
            });

            this.initLayerAction();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            // 实例化一些方法，svg，地图 等。render 之后执行
            this.initLayerAction();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $(document).off('mousedown.destoryControl');
            $(document).off('h5ds.iniControl');
            $(document).off('h5ds.destoryControl');
            $(document).off('h5ds.keyPhone');
            $(document).off('h5ds.playAnimate');
            $('#setPageHeight').off('mousedown');
            $('#phone').off('mousedown.group');
            $('#phone').off('mousedown.layerGroup');
            $(document).off('h5ds.showPageTpls');
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$app3 = this.props.app,
                data = _props$app3.data,
                edata = _props$app3.edata,
                getPage = _props$app3.getPage;
            var _data$style = data.style,
                width = _data$style.width,
                height = _data$style.height,
                other = (0, _objectWithoutProperties3.default)(_data$style, ['width', 'height']);

            var transform = edata.phoneStyle.transform;
            var style = (0, _assign2.default)((0, _extends3.default)({}, other), { transform: transform });
            var page = getPage('pages', edata.selectPage);
            // page 样式
            var pageStyle = { width: this.defaultWidth, height: this.defaultHeight };
            if (page) {
                pageStyle = (0, _assign2.default)(pageStyle, page.style);
            }
            // 必须加
            edata.keys;

            var _props$layerfun = this.props.layerfun,
                pageToHTML = _props$layerfun.pageToHTML,
                template = _props$layerfun.template;

            console.log('render phone', data);
            return _react2.default.createElement(
                'div',
                {
                    className: edata.animatePlay ? 'center' : 'center noneAnimate',
                    onDragStart: function onDragStart(e) {
                        e.preventDefault();
                    }
                },
                template ? _react2.default.createElement(
                    'div',
                    { id: 'atpls', className: 'h5ds-temps', 'data-status': this.state.showPanel ? 'show' : 'hide' },
                    _react2.default.createElement(
                        'a',
                        { onClick: this.changePanel, className: 'flod-btn' },
                        _react2.default.createElement('i', { className: this.state.showPanel ? 'h5ds ico5-a3left' : 'h5ds ico5-a3right' })
                    ),
                    template
                ) : null,
                _react2.default.createElement(
                    'div',
                    { className: 'phone', id: 'phone', key: this.state.keys },
                    _react2.default.createElement(
                        'div',
                        { className: 'phonebox', style: (0, _extends3.default)({}, style) },
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'phone-lines',
                                style: {
                                    width: _set.appWidth + 50,
                                    height: pageStyle.height + 60
                                }
                            },
                            _react2.default.createElement('div', {
                                className: 'phone-lines-inner',
                                style: {
                                    width: _set.appWidth,
                                    height: pageStyle.height
                                }
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'phone-app', id: 'phoneApp', style: (0, _extends3.default)({}, pageStyle) },
                            _react2.default.createElement(_Grid2.default, { width: _set.appWidth, height: pageStyle.height }),
                            _react2.default.createElement(
                                'div',
                                { className: 'set-page-height' },
                                _react2.default.createElement(
                                    'span',
                                    { id: 'pageHeightNum' },
                                    pageStyle.height,
                                    'px'
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { id: 'setPageHeight', className: 'set-page-height-btn' },
                                    _react2.default.createElement('i', { className: 'h5ds ico5-shangxiawen' })
                                )
                            ),
                            edata.selectType === 'popups' ? _react2.default.createElement(
                                'div',
                                { className: 'page-viewup', id: 'pageViewPopup', style: (0, _extends3.default)({}, this.setStyle('popups')) },
                                pageToHTML(getPage('popups'), true)
                            ) : null,
                            _react2.default.createElement(
                                'div',
                                { className: 'page-viewup', id: 'pageViewFixedUp', style: (0, _extends3.default)({}, this.setStyle('fixedUp')) },
                                pageToHTML(getPage('fixeds', 0), true)
                            ),
                            _react2.default.createElement(
                                'div',
                                {
                                    className: 'page-viewup',
                                    id: 'pageViewFixedDown',
                                    style: (0, _extends3.default)({}, this.setStyle('fixedDown'))
                                },
                                pageToHTML(getPage('fixeds', 1), true)
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'page-view', id: 'pageView', style: (0, _extends3.default)({}, this.setStyle('pages')) },
                                page ? pageToHTML(page, true) : null
                            )
                        )
                    ),
                    _react2.default.createElement(_Ruler2.default, null)
                )
            );
        }
    }]);
    return Center;
}(_react.Component)) || _class) || _class);
exports.default = Center;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Center, 'Center', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/phone/Phone.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 128 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 129 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPageView = getPageView;
exports.destoryControl = destoryControl;
/**
 * @desc 获取当前选择的页面
 */
function getPageView(edata) {
    var dom = null;
    var selectType = edata.selectType,
        selectFixed = edata.selectFixed;

    switch (selectType) {
        case 'pages':
            dom = $('#pageView');
            break;
        case 'fixeds':
            {
                if (selectFixed === 0) {
                    dom = $('#pageViewFixedUp');
                } else {
                    dom = $('#pageViewFixedDown');
                }
            }
            break;
        case 'popups':
            dom = $('#pageViewPopup');
            break;
    }
    return dom;
}

/**
 * @desc 销毁 layer 控制器
 */
function destoryControl(callback) {
    var $control = $('#phoneApp').find('.h5ds-control');
    if ($control[0]) {
        $control.remove();
        $control = null;
    }

    // 取消layer的选中状态
    callback && callback();
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(getPageView, 'getPageView', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/phone/domUtils.js');

    __REACT_HOT_LOADER__.register(destoryControl, 'destoryControl', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/phone/domUtils.js');
}();

;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Grid = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(Grid, _Component);

    function Grid() {
        (0, _classCallCheck3.default)(this, Grid);
        return (0, _possibleConstructorReturn3.default)(this, (Grid.__proto__ || (0, _getPrototypeOf2.default)(Grid)).apply(this, arguments));
    }

    (0, _createClass3.default)(Grid, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                width = _props.width,
                height = _props.height;
            var _props$app$edata = this.props.app.edata,
                gridSize = _props$app$edata.gridSize,
                gridAdsorb = _props$app$edata.gridAdsorb;

            return _react2.default.createElement(
                'div',
                { className: 'grid-box', id: 'gridBox', 'data-adsorb': gridAdsorb, 'data-size': gridSize },
                _react2.default.createElement(
                    'ul',
                    { className: 'row' },
                    Array(Math.ceil(height / gridSize)).fill(1).map(function (elem, index) {
                        return _react2.default.createElement('li', {
                            key: index,
                            style: {
                                top: gridSize * index
                            }
                        });
                    })
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'col' },
                    Array(Math.ceil(width / gridSize)).fill(1).map(function (elem, index) {
                        return _react2.default.createElement('li', {
                            key: index,
                            style: {
                                left: gridSize * index
                            }
                        });
                    })
                )
            );
        }
    }]);
    return Grid;
}(_react.Component)) || _class) || _class);
exports.default = Grid;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Grid, 'Grid', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/phone/Grid.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _util = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ruler = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(Ruler, _Component);

    function Ruler() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Ruler);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Ruler.__proto__ || (0, _getPrototypeOf2.default)(Ruler)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            width: 0,
            height: 0,
            lines: []
        }, _this.filterLine = function () {
            var _this2;

            return (_this2 = _this).__filterLine__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.lineMousedown = function () {
            var _this3;

            return (_this3 = _this).__lineMousedown__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _this.rowMousedown = function () {
            var _this4;

            return (_this4 = _this).__rowMousedown__REACT_HOT_LOADER__.apply(_this4, arguments);
        }, _this.colMousedown = function () {
            var _this5;

            return (_this5 = _this).__colMousedown__REACT_HOT_LOADER__.apply(_this5, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Ruler, [{
        key: '__filterLine__REACT_HOT_LOADER__',


        // 拖动线
        value: function __filterLine__REACT_HOT_LOADER__() {
            // 小于0 的删除掉
            var newLines = [];
            this.state.lines.forEach(function (elem) {
                if (elem.type === 'row') {
                    if (elem.style.left >= 0 && elem.style.left <= $('#phone').width()) {
                        newLines.push(elem);
                    }
                } else {
                    if (elem.style.top >= 0 && elem.style.top <= $('#phone').height()) {
                        newLines.push(elem);
                    }
                }
            });
            this.setState({
                lines: newLines
            });
        }
    }, {
        key: '__lineMousedown__REACT_HOT_LOADER__',
        value: function __lineMousedown__REACT_HOT_LOADER__(e, elem) {
            var _this6 = this;

            e.stopPropagation();
            var startx = e.pageX;
            var starty = e.pageY;
            var oldleft = elem.style.left;
            var oldtop = elem.style.top;
            var lines = this.state.lines;
            $(document).on('mousemove.ruler.line', function (em) {
                elem.type === 'row' ? elem.style.left = em.pageX - startx + oldleft : elem.style.top = em.pageY - starty + oldtop;
                _this6.setState({
                    lines: lines
                });
            }).on('mouseup.ruler.line', function () {
                _this6.filterLine();
                $(document).off('mousemove.ruler.line');
                $(document).off('mouseup.ruler.line');
            });
        }
    }, {
        key: '__rowMousedown__REACT_HOT_LOADER__',
        value: function __rowMousedown__REACT_HOT_LOADER__(e) {
            var _this7 = this;

            e.stopPropagation();
            var line = {
                id: (0, _util.getRandomID)(),
                type: 'row',
                style: {
                    left: 0,
                    top: 0,
                    width: 1,
                    height: 2000
                }
            };
            var lines = this.state.lines;
            lines.push(line);
            var start = e.pageX;
            $(document).on('mousemove.ruler', function (em) {
                line.style.left = em.pageX - start;
                _this7.setState({
                    lines: lines
                });
            }).on('mouseup.ruler', function (em) {
                _this7.filterLine();
                $(document).off('mousemove.ruler');
                $(document).off('mouseup.ruler');
            });
        }
    }, {
        key: '__colMousedown__REACT_HOT_LOADER__',
        value: function __colMousedown__REACT_HOT_LOADER__(e) {
            var _this8 = this;

            e.stopPropagation();
            var line = {
                id: (0, _util.getRandomID)(),
                type: 'col',
                style: {
                    left: 0,
                    top: 0,
                    height: 1,
                    width: $('#phone').width()
                }
            };
            var lines = this.state.lines;
            lines.push(line);
            var start = e.pageY;
            $(document).on('mousemove.ruler', function (em) {
                line.style.top = em.pageY - start;
                _this8.setState({
                    lines: lines
                });
            }).on('mouseup.ruler', function (em) {
                _this8.filterLine();
                $(document).off('mousemove.ruler');
                $(document).off('mouseup.ruler');
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                width: 2000,
                height: 2000
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var _state = this.state,
                height = _state.height,
                width = _state.width,
                lines = _state.lines;

            if (!height || !width) {
                return null;
            }
            var phoneScale = this.props.app.edata.phoneScale;

            var size = 10;
            var min = 5;
            var max = 10;
            return _react2.default.createElement(
                'div',
                { className: 'ruler-box' },
                lines.map(function (elem) {
                    return _react2.default.createElement('li', {
                        onMouseDown: function onMouseDown(e) {
                            return _this9.lineMousedown(e, elem);
                        },
                        className: 'line line-' + elem.type,
                        key: elem.id,
                        style: (0, _extends3.default)({}, elem.style)
                    });
                }),
                _react2.default.createElement(
                    'ul',
                    { onMouseDown: this.rowMousedown, className: 'row', style: { height: height } },
                    Array(Math.ceil(height / size)).fill(1).map(function (elem, index) {
                        var top = index * size;
                        var width = min;
                        if (index % 5 === 0) {
                            width = max;
                        }
                        return _react2.default.createElement(
                            'li',
                            {
                                key: index,
                                style: {
                                    top: top,
                                    width: width
                                }
                            },
                            width === max ? _react2.default.createElement(
                                'span',
                                null,
                                parseInt(top, 10)
                            ) : null
                        );
                    })
                ),
                _react2.default.createElement(
                    'ul',
                    { onMouseDown: this.colMousedown, className: 'col', style: { width: width } },
                    Array(Math.ceil(width / size)).fill(1).map(function (elem, index) {
                        var left = index * size;
                        var height = min;
                        if (index % 5 === 0) {
                            height = max;
                        }
                        return _react2.default.createElement(
                            'li',
                            {
                                key: index,
                                style: {
                                    left: left,
                                    height: height
                                }
                            },
                            height === max ? _react2.default.createElement(
                                'span',
                                null,
                                parseInt(left, 10)
                            ) : null
                        );
                    })
                )
            );
        }
    }]);
    return Ruler;
}(_react.Component)) || _class) || _class);
exports.default = Ruler;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Ruler, 'Ruler', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/phone/Ruler.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(134);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _AppSet = __webpack_require__(135);

var _AppSet2 = _interopRequireDefault(_AppSet);

var _LayerSet = __webpack_require__(140);

var _LayerSet2 = _interopRequireDefault(_LayerSet);

var _LayerSetAlign = __webpack_require__(163);

var _LayerSetAlign2 = _interopRequireDefault(_LayerSetAlign);

var _PageSet = __webpack_require__(165);

var _PageSet2 = _interopRequireDefault(_PageSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Right = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(Right, _Component);

    function Right() {
        (0, _classCallCheck3.default)(this, Right);
        return (0, _possibleConstructorReturn3.default)(this, (Right.__proto__ || (0, _getPrototypeOf2.default)(Right)).apply(this, arguments));
    }

    (0, _createClass3.default)(Right, [{
        key: 'render',
        value: function render() {
            var _props$app$edata = this.props.app.edata,
                setType = _props$app$edata.setType,
                selectLayer = _props$app$edata.selectLayer;

            var dom = null;
            switch (setType) {
                case 'layer':
                    dom = _react2.default.createElement(_LayerSet2.default, null);
                    break;
                case 'group':
                    dom = _react2.default.createElement(_LayerSetAlign2.default, null);
                    break;
                case 'page':
                    dom = _react2.default.createElement(_PageSet2.default, null);
                    break;
                case 'app':
                    dom = _react2.default.createElement(_AppSet2.default, null);
                    break;
            }
            return _react2.default.createElement(
                'div',
                { className: 'right' },
                dom
            );
        }
    }]);
    return Right;
}(_react.Component)) || _class) || _class);
exports.default = Right;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Right, 'Right', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/Setting.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 134 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(14);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;
// import { mp3Data } from './mp3';


__webpack_require__(136);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _BackGround = __webpack_require__(44);

var _BackGround2 = _interopRequireDefault(_BackGround);

var _InputMt = __webpack_require__(20);

var _InputMt2 = _interopRequireDefault(_InputMt);

var _Tabs = __webpack_require__(53);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Upload = __webpack_require__(62);

var _Upload2 = _interopRequireDefault(_Upload);

var _mobx = __webpack_require__(7);

var _loading = __webpack_require__(139);

var _sliderAnimate = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppSet = (_dec = (0, _mobxReact.inject)('app', 'layerfun'), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(AppSet, _Component);

    function AppSet(props) {
        (0, _classCallCheck3.default)(this, AppSet);

        // let { data } = props.app;
        var _this = (0, _possibleConstructorReturn3.default)(this, (AppSet.__proto__ || (0, _getPrototypeOf2.default)(AppSet)).call(this, props));

        _this.backGroundChange = function () {
            return _this.__backGroundChange__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.inputDo = function () {
            return _this.__inputDo__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.clickLoader = function () {
            return _this.__clickLoader__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.selectSilder = function () {
            return _this.__selectSilder__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.uploadEnd = function () {
            return _this.__uploadEnd__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.changeTab = function () {
            return _this.__changeTab__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {
            bgKey: +new Date(),
            active: 0 // 默认选择tabs
        };
        return _this;
    }

    // 背景 change


    (0, _createClass3.default)(AppSet, [{
        key: '__backGroundChange__REACT_HOT_LOADER__',
        value: function __backGroundChange__REACT_HOT_LOADER__(obj) {
            var _props$app = this.props.app,
                data = _props$app.data,
                edata = _props$app.edata;

            for (var key in obj) {
                if (data.style[key] === undefined) {
                    (0, _mobx.extendObservable)(data.style, (0, _defineProperty3.default)({}, key, obj[key]));
                } else {
                    data.style[key] = obj[key];
                }
            }
            edata.keys = +new Date();
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__inputDo__REACT_HOT_LOADER__',


        // 选择loader
        value: function __inputDo__REACT_HOT_LOADER__(val, key) {
            var data = this.props.app.data;

            data[key] = val;
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__clickLoader__REACT_HOT_LOADER__',


        // 选择 slider
        value: function __clickLoader__REACT_HOT_LOADER__(elem, e) {
            // e.stopPropagation();
            var data = this.props.app.data;

            data.loading = elem;
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__selectSilder__REACT_HOT_LOADER__',


        // 文件上传OVER
        value: function __selectSilder__REACT_HOT_LOADER__(elem, index) {
            var data = this.props.app.data;

            data.slider.animate = index;
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__uploadEnd__REACT_HOT_LOADER__',
        value: function __uploadEnd__REACT_HOT_LOADER__(elem) {
            console.log('>>>>>>', elem);
            var data = this.props.app.data;

            data.img = elem.url;
        }
    }, {
        key: '__changeTab__REACT_HOT_LOADER__',
        value: function __changeTab__REACT_HOT_LOADER__(elem, index) {
            this.setState({
                active: index
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            $(document).on('h5ds.appSetTabs', function (e, active) {
                e.stopPropagation();
                _this2.setState({ active: active });
            });

            $(document).on('h5ds.changeAppBg', function (e) {
                e.stopPropagation();
                _this2.setState({
                    bgKey: +new Date()
                });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $('#tryMp3Audio')[0].pause();
            $('#appMp3Audio')[0].pause();
            $(document).off('h5ds.appSetTabs');
            $(document).off('h5ds.changeAppBg');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props$app2 = this.props.app,
                data = _props$app2.data,
                edata = _props$app2.edata;
            var active = this.state.active;

            edata.appSetKeys;

            console.log('active', active);
            return _react2.default.createElement(
                'div',
                { id: 'setAppBox', className: 'setlayer' },
                _react2.default.createElement(
                    'div',
                    { className: 'setname' },
                    '\u5F53\u524D\u9009\u4E2D\uFF1AAPP'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'tabsbox' },
                    _react2.default.createElement(
                        _Tabs2.default,
                        { onChange: this.changeTab, className: 'h5ds-tab-style2', active: active },
                        _react2.default.createElement(
                            _Tabs2.default.Item,
                            { title: '\u57FA\u672C\u8BBE\u7F6E', key: '1' },
                            _react2.default.createElement(
                                'div',
                                { className: 'set-appinfo' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'tr' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'name' },
                                        '\u4E3B\u56FE: '
                                    ),
                                    _react2.default.createElement(
                                        _Upload2.default,
                                        (0, _extends3.default)({}, this.props.layerfun.uploadSet, { uploadEnd: this.uploadEnd }),
                                        _react2.default.createElement(
                                            'a',
                                            { className: 'h5ds-upload-btn' },
                                            _react2.default.createElement('img', { src: data.img, width: '100', height: '100' })
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'tr' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'name' },
                                        '\u6807\u9898: '
                                    ),
                                    _react2.default.createElement(_InputMt2.default, {
                                        type: 'text',
                                        onChange: function onChange(e) {
                                            _this3.inputDo(e.target.value, 'name');
                                        },
                                        value: data.name
                                    })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'tr' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'name' },
                                        '\u63CF\u8FF0: '
                                    ),
                                    _react2.default.createElement('textarea', {
                                        style: { resize: 'none' },
                                        className: 'h5ds-textarea',
                                        onChange: function onChange(e) {
                                            return _this3.inputDo(e.target.value, 'desc');
                                        },
                                        value: data.desc
                                    })
                                )
                            ),
                            _react2.default.createElement(_BackGround2.default, {
                                key: this.state.bgKey,
                                onChange: this.backGroundChange,
                                dataStyle: data.style,
                                actionType: 'appbg'
                            }),
                            _react2.default.createElement(
                                'div',
                                { className: 'set-slider' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'tr' },
                                    '\u7FFB\u9875\u52A8\u753B:'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'tr' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'h5ds-selectone' },
                                        _sliderAnimate.sliderAnimate.map(function (elem, index) {
                                            return _react2.default.createElement(
                                                'a',
                                                {
                                                    key: index,
                                                    onClick: function onClick(e) {
                                                        return _this3.selectSilder(elem, index);
                                                    },
                                                    className: 'option' + (index === data.slider.animate ? ' h5ds-selected' : '')
                                                },
                                                _react2.default.createElement(
                                                    'span',
                                                    null,
                                                    elem.name
                                                )
                                            );
                                        })
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _Tabs2.default.Item,
                            { title: '\u80CC\u666F\u97F3\u4E50', id: 'setAppMp3', key: '2' },
                            this.props.layerfun.music
                        ),
                        _react2.default.createElement(
                            _Tabs2.default.Item,
                            { title: '\u52A0\u8F7D\u52A8\u753B', id: 'setAppLoading', key: '3' },
                            _react2.default.createElement(
                                'div',
                                { className: 'loaders' },
                                _loading.loadings.map(function (elem, index) {
                                    return _react2.default.createElement(
                                        'div',
                                        {
                                            onClick: function onClick(e) {
                                                return _this3.clickLoader(elem, e);
                                            },
                                            key: index,
                                            className: 'loader' + (elem === data.loading ? ' active' : '')
                                        },
                                        _react2.default.createElement('div', { className: elem })
                                    );
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);
    return AppSet;
}(_react.Component)) || _class) || _class);
exports.default = AppSet;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(AppSet, 'AppSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/appSet/AppSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 136 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 137 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 138 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @desc loading 模板 的class
 */
var loadings = exports.loadings = ['timer', 'typing_loader', 'location_indicator', 'dashboard', 'battery', 'magnifier', 'help', 'cloud', 'eye', 'coffee_cup', 'square', 'circle'];
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(loadings, 'loadings', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/loading.js');
}();

;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class; // 动画
// 交互
// 样式设置


__webpack_require__(141);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _Animate = __webpack_require__(142);

var _Animate2 = _interopRequireDefault(_Animate);

var _Interaction = __webpack_require__(144);

var _Interaction2 = _interopRequireDefault(_Interaction);

var _StyleSet = __webpack_require__(160);

var _StyleSet2 = _interopRequireDefault(_StyleSet);

var _Tabs = __webpack_require__(53);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _common = __webpack_require__(69);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayerSet = (_dec = (0, _mobxReact.inject)('app', 'layerfun'), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(LayerSet, _Component);

    function LayerSet() {
        (0, _classCallCheck3.default)(this, LayerSet);
        return (0, _possibleConstructorReturn3.default)(this, (LayerSet.__proto__ || (0, _getPrototypeOf2.default)(LayerSet)).apply(this, arguments));
    }

    (0, _createClass3.default)(LayerSet, [{
        key: 'render',
        value: function render() {
            var _props$app$edata = this.props.app.edata,
                setType = _props$app$edata.setType,
                layerKeys = _props$app$edata.layerKeys;

            var layer = this.props.app.getLayer();

            if (!layer) {
                return null;
            }

            var editorSet = this.props.layerfun.layersSet[layer.type].editorSet || {};
            // console.log('选择layer => setType', setType);
            console.log('layerKeys', layerKeys);
            return _react2.default.createElement(
                'div',
                { id: 'setLayerBox', className: 'setlayer' },
                _react2.default.createElement(
                    'div',
                    { key: layerKeys + 1, className: 'setname' },
                    '\u5F53\u524D\u9009\u4E2D\uFF1A',
                    (0, _common.setTypeCN)(setType)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'tabsbox' },
                    _react2.default.createElement(
                        _Tabs2.default,
                        { className: 'h5ds-tab-style2' },
                        _react2.default.createElement(
                            _Tabs2.default.Item,
                            { key: 1, title: '\u6837\u5F0F' },
                            _react2.default.createElement(_StyleSet2.default, { key: layerKeys + 2 })
                        ),
                        editorSet.animate === false ? null : _react2.default.createElement(
                            _Tabs2.default.Item,
                            { key: 2, title: '\u52A8\u753B', id: 'setAnimate' },
                            _react2.default.createElement(_Animate2.default, { key: layerKeys + 3 })
                        ),
                        editorSet.interaction === false ? null : _react2.default.createElement(
                            _Tabs2.default.Item,
                            { key: 3, title: '\u4EA4\u4E92' },
                            _react2.default.createElement(_Interaction2.default, { key: layerKeys + 4 })
                        )
                    )
                )
            );
        }
    }]);
    return LayerSet;
}(_react.Component)) || _class) || _class);
exports.default = LayerSet;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(LayerSet, 'LayerSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/layerSet/LayerSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 141 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(10);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _animates = __webpack_require__(143);

var _math = __webpack_require__(36);

var _mobxReact = __webpack_require__(6);

var _InputMt = __webpack_require__(20);

var _InputMt2 = _interopRequireDefault(_InputMt);

var _Tabs = __webpack_require__(53);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _cssFilter = __webpack_require__(68);

var _util = __webpack_require__(8);

var _mobx = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Animate = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(Animate, _Component);

    function Animate(props) {
        (0, _classCallCheck3.default)(this, Animate);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Animate.__proto__ || (0, _getPrototypeOf2.default)(Animate)).call(this, props));

        _this.setActive = function () {
            return _this.__setActive__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setAnimate = function () {
            return _this.__setAnimate__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.addAnimate = function () {
            return _this.__addAnimate__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.delAnimate = function () {
            return _this.__delAnimate__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.changeAnimate = function () {
            return _this.__changeAnimate__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.dragUniq = function () {
            return _this.__dragUniq__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {
            active: null
        };
        _this.animateKey = 1;
        return _this;
    }

    // 设置选中状态


    (0, _createClass3.default)(Animate, [{
        key: '__setActive__REACT_HOT_LOADER__',


        // 选择动画
        value: function __setActive__REACT_HOT_LOADER__(elem, index) {
            this.setState({
                active: index
            });
        }
    }, {
        key: '__setAnimate__REACT_HOT_LOADER__',


        // 添加动画
        value: function __setAnimate__REACT_HOT_LOADER__(elem) {
            var _props$app = this.props.app,
                getLayer = _props$app.getLayer,
                edata = _props$app.edata;

            var layer = getLayer();
            var active = this.state.active;

            if (active !== null) {
                // "shake 1s ease 0s 1 normal forwards running"
                (0, _mobx.transaction)(function () {
                    // let animate = layer.animate[active]; // 当前选中的动画
                    var arr = layer.animate[active].style.split(' ');
                    var time = arr[1];
                    var delay = arr[3];
                    var count = arr[4];
                    // console.log('time, delay, count', time, delay, count);
                    layer.animate[active] = {
                        name: elem.name,
                        type: elem.type,
                        style: elem.animate + ' ' + (time || elem.time) + ' ' + elem.fun + ' ' + (delay || elem.delay) + ' ' + (count || elem.count) + ' normal forwards running'
                    };
                    // 如果第一个动画是进入动画，默认设置 透明度为0
                    if (layer.animate[0].type === 'in') {
                        layer.estyle.opacity = 0;
                    } else {
                        layer.estyle.opacity = 1;
                    }
                    edata.keys = +new Date();
                    $(document).trigger('h5ds.setHistory');
                });
            } else {
                _message3.default.error('还没选择动画列表！');
            }
        }
    }, {
        key: '__addAnimate__REACT_HOT_LOADER__',


        // 删除动画
        value: function __addAnimate__REACT_HOT_LOADER__(e) {
            var elem = {
                // 添加动画，默认的动画
                animate: 'fadeIn',
                name: 'fade in',
                type: 'in',
                time: 1,
                delay: 0,
                count: 1,
                fun: 'ease'
            };
            var layer = this.props.app.getLayer();
            layer.animate.push({
                name: elem.name,
                type: elem.type,
                style: elem.animate + ' ' + elem.time + 's ' + elem.fun + ' ' + elem.delay + 's ' + elem.count + ' normal forwards running'
            });
            this.setState({
                active: layer.animate.length - 1
            });
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__delAnimate__REACT_HOT_LOADER__',


        // 修改动画
        value: function __delAnimate__REACT_HOT_LOADER__(e, index) {
            e.stopPropagation();
            var _props$app2 = this.props.app,
                getLayer = _props$app2.getLayer,
                edata = _props$app2.edata;

            var layer = getLayer();
            layer.animate.splice(index, 1);
            this.setState({
                active: null
            }, function () {
                (0, _mobx.transaction)(function () {
                    edata.keys = +new Date();
                    layer.estyle.opacity = 1;
                });
            });
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__changeAnimate__REACT_HOT_LOADER__',


        // 拖动排序
        value: function __changeAnimate__REACT_HOT_LOADER__(val, index, type, e) {
            var layer = this.props.app.getLayer();
            var elem = (0, _cssFilter.animationFilter)(layer.animate[index].style);
            elem[type] = val;
            layer.animate[index].style = elem.name + ' ' + elem.duration + 's ' + elem.timing + ' ' + elem.delay + 's ' + elem.count + ' normal forwards running';
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__dragUniq__REACT_HOT_LOADER__',
        value: function __dragUniq__REACT_HOT_LOADER__() {
            var _this2 = this;

            $('#uniqAnimate').on('uniqend', function (e, obj) {
                // console.log(obj);
                if (obj) {
                    _this2.animateKey++;
                    var layer = _this2.props.app.getLayer();
                    _this2.setState({
                        active: null
                    }, function () {
                        (0, _math.exChangeArr)(layer.animate, obj);
                        $(document).trigger('h5ds.setHistory');
                    });
                }
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // ...
            this.dragUniq();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $('#uniqAnimate').off('uniqend');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var active = this.state.active;

            var layer = this.props.app.getLayer();
            // let tmp = +new Date();
            // console.log('动画列表！');
            if (!layer) {
                return null;
            }
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'add-animate-btn' },
                    _react2.default.createElement(
                        'a',
                        { onClick: this.addAnimate, className: 'h5ds-btn-animate add-animation' },
                        _react2.default.createElement('i', { className: 'h5ds ico5-jia' }),
                        ' \u6DFB\u52A0\u52A8\u753B'
                    ),
                    _react2.default.createElement(
                        'a',
                        {
                            onClick: function onClick() {
                                $(document).trigger('h5ds.playAnimate');
                            },
                            className: 'h5ds-btn-animate play-animation'
                        },
                        _react2.default.createElement('i', { className: 'h5ds ico5-bofang' }),
                        ' \u64AD\u653E\u52A8\u753B'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'animation-list' },
                    layer.animate.length > 0 ? _react2.default.createElement(
                        'div',
                        { className: 'animate-title' },
                        _react2.default.createElement(
                            'span',
                            { className: 'tname' },
                            '\u52A8\u753B\u7C7B\u578B/\u540D\u79F0'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'ttime' },
                            '\u65F6\u95F4'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'tdelay' },
                            '\u5EF6\u8FDF'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'tcount' },
                            '\u6B21\u6570'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'tfun' },
                            '\u7F13\u52A8\u51FD\u6570'
                        )
                    ) : null,
                    _react2.default.createElement(
                        'ul',
                        { className: 'h5ds-uniqlist', id: 'uniqAnimate' },
                        layer.animate.map(function (animate, index) {
                            var elem = (0, _cssFilter.animationFilter)(animate.style);
                            return _react2.default.createElement(
                                'li',
                                {
                                    key: index + _this3.animateKey,
                                    onClick: function onClick(e) {
                                        return _this3.setActive(animate, index);
                                    },
                                    className: 'animation-item' + (active === index ? ' active' : '')
                                },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'tname' },
                                    _react2.default.createElement(
                                        'span',
                                        {
                                            title: animateType(animate.type) + ': ' + animate.name,
                                            className: 'animation-name'
                                        },
                                        animateType(animate.type),
                                        ':',
                                        animate.name
                                    )
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'ttime' },
                                    _react2.default.createElement(_InputMt2.default, {
                                        onChange: function onChange(e) {
                                            return _this3.changeAnimate(e.target.value, index, 'duration', e);
                                        },
                                        wheel: true,
                                        min: 0,
                                        max: 9999,
                                        step: 0.1,
                                        value: elem.duration,
                                        className: 'animation-time'
                                    })
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'tdelay' },
                                    _react2.default.createElement(_InputMt2.default, {
                                        onChange: function onChange(e) {
                                            return _this3.changeAnimate(e.target.value, index, 'delay', e);
                                        },
                                        wheel: true,
                                        min: 0,
                                        max: 9999,
                                        step: 0.1,
                                        value: elem.delay,
                                        className: 'animation-delay'
                                    })
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'tcount' },
                                    _react2.default.createElement(_InputMt2.default, {
                                        onChange: function onChange(e) {
                                            return _this3.changeAnimate(parseInt(e.target.value, 10), index, 'count', e);
                                        },
                                        wheel: true,
                                        min: 1,
                                        max: 9999,
                                        value: elem.count,
                                        className: 'animation-count'
                                    })
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'tfun' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'h5ds-select' },
                                        _react2.default.createElement(
                                            'select',
                                            {
                                                onChange: function onChange(e) {
                                                    return _this3.changeAnimate(e.target.value, index, 'timing', e);
                                                },
                                                className: 'animation-fun',
                                                value: elem.timing,
                                                placeholder: '\u51FD\u6570'
                                            },
                                            _react2.default.createElement(
                                                'option',
                                                { value: 'ease' },
                                                '\u9ED8\u8BA4'
                                            ),
                                            _react2.default.createElement(
                                                'option',
                                                { value: 'linear' },
                                                '\u5300\u901F'
                                            ),
                                            _react2.default.createElement(
                                                'option',
                                                { value: 'ease-in' },
                                                '\u52A0\u901F'
                                            ),
                                            _react2.default.createElement(
                                                'option',
                                                { value: 'ease-out' },
                                                '\u51CF\u901F'
                                            ),
                                            _react2.default.createElement(
                                                'option',
                                                { value: 'ease-in-out' },
                                                '\u8D77\u59CB\u6162'
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { onClick: function onClick(e) {
                                            return _this3.delAnimate(e, index);
                                        }, className: 'animation-delete' },
                                    _react2.default.createElement('i', { className: 'h5ds ico5-close' })
                                )
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    _Tabs2.default,
                    { className: 'h5ds-tab-style1' },
                    _react2.default.createElement(
                        _Tabs2.default.Item,
                        { title: '\u8FDB\u5165\u52A8\u753B' },
                        _react2.default.createElement(
                            'div',
                            { className: 'animates' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'clearfix' },
                                _animates.animatesIn.map(function (elem, index) {
                                    return _react2.default.createElement(
                                        'li',
                                        { onClick: function onClick(e) {
                                                return _this3.setAnimate(elem);
                                            }, key: index },
                                        elem.name
                                    );
                                })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _Tabs2.default.Item,
                        { title: '\u79BB\u5F00\u52A8\u753B' },
                        _react2.default.createElement(
                            'div',
                            { className: 'animates' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'clearfix' },
                                _animates.animatesOut.map(function (elem, index) {
                                    return _react2.default.createElement(
                                        'li',
                                        { onClick: function onClick(e) {
                                                return _this3.setAnimate(elem);
                                            }, key: index },
                                        elem.name
                                    );
                                })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _Tabs2.default.Item,
                        { title: '\u5F3A\u8C03\u52A8\u753B' },
                        _react2.default.createElement(
                            'div',
                            { className: 'animates' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'clearfix' },
                                _animates.animatesEm.map(function (elem, index) {
                                    return _react2.default.createElement(
                                        'li',
                                        { onClick: function onClick(e) {
                                                return _this3.setAnimate(elem);
                                            }, key: index },
                                        elem.name
                                    );
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);
    return Animate;
}(_react.Component)) || _class) || _class);

// 动画类型转换

exports.default = Animate;
function animateType(type) {
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
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Animate, 'Animate', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/layerSet/Animate.jsx');

    __REACT_HOT_LOADER__.register(animateType, 'animateType', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/layerSet/Animate.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 143 */
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
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(animatesIn, 'animatesIn', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/animates.js');

    __REACT_HOT_LOADER__.register(animatesOut, 'animatesOut', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/animates.js');

    __REACT_HOT_LOADER__.register(animatesEm, 'animatesEm', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/animates.js');
}();

;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _interaction = __webpack_require__(145);

var UE = _interopRequireWildcard(_interaction);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayerSet = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(LayerSet, _Component);

    function LayerSet(props) {
        (0, _classCallCheck3.default)(this, LayerSet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LayerSet.__proto__ || (0, _getPrototypeOf2.default)(LayerSet)).call(this, props));

        _this.selectUe = function () {
            return _this.__selectUe__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {
            select: null
        };
        return _this;
    }

    // 设置ue类型


    (0, _createClass3.default)(LayerSet, [{
        key: '__selectUe__REACT_HOT_LOADER__',
        value: function __selectUe__REACT_HOT_LOADER__(type) {
            this.setState({
                select: type
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            $(document).on('h5ds.closeUeBox', function (e) {
                $(document).trigger('h5ds.setHistory');
                _this2.setState({
                    select: null
                });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $(document).off('h5ds.closeUeBox');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var select = this.state.select;

            var JSXDOM = null;
            if (select) {
                switch (select) {
                    case 'link':
                        JSXDOM = _react2.default.createElement(UE.LinkSet, null);
                        break;
                    case 'toPage':
                        JSXDOM = _react2.default.createElement(UE.ToPageSet, null);
                        break;
                    case 'tel':
                        JSXDOM = _react2.default.createElement(UE.TelSet, null);
                        break;
                    case 'msg':
                        JSXDOM = _react2.default.createElement(UE.MsgSet, null);
                        break;
                    case 'hideShow':
                        JSXDOM = _react2.default.createElement(UE.HideShowSet, null);
                        break;
                    case 'touch':
                        JSXDOM = _react2.default.createElement(UE.TouchSet, null);
                        break;
                    case 'shake':
                        JSXDOM = _react2.default.createElement(UE.ShakeSet, null);
                        break;
                }
            }
            var layer = this.props.app.getLayer();

            if (!layer) {
                return null;
            }

            var ue = layer.ue;
            var setClass = function setClass(type) {
                var cls = ['fun'];
                if (ue[type] !== undefined) {
                    cls.push('active');
                }
                return cls.join(' ');
            };

            // console.log(JSXDOM);
            return _react2.default.createElement(
                'div',
                { className: 'ueset' },
                _react2.default.createElement(
                    'div',
                    { className: 'setue-list', id: 'setUeList' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'set-layer-ue clearfix' },
                        _react2.default.createElement(
                            'li',
                            {
                                className: setClass('link'),
                                onClick: function onClick(e) {
                                    _this3.selectUe('link');
                                }
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-lianjie' }),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u8D85\u94FE\u63A5'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            {
                                className: setClass('toPage'),
                                onClick: function onClick(e) {
                                    _this3.selectUe('toPage');
                                }
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-tiaozhuan' }),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u9875\u9762\u8DF3\u8F6C'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            {
                                className: setClass('tel'),
                                onClick: function onClick(e) {
                                    _this3.selectUe('tel');
                                }
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-shoujidadianhua' }),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u6253\u7535\u8BDD'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            {
                                className: setClass('msg'),
                                onClick: function onClick(e) {
                                    _this3.selectUe('msg');
                                }
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-duanxin' }),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u53D1\u77ED\u4FE1'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            {
                                className: setClass('hideShow'),
                                onClick: function onClick(e) {
                                    _this3.selectUe('hideShow');
                                }
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-duanxin' }),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u9690\u663E\u5207\u6362'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            {
                                className: setClass('touch'),
                                onClick: function onClick(e) {
                                    _this3.selectUe('touch');
                                }
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-zhiwen06' }),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u6307\u7EB9'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            {
                                className: setClass('shake'),
                                onClick: function onClick(e) {
                                    _this3.selectUe('shake');
                                }
                            },
                            _react2.default.createElement('i', { className: 'h5ds ico5-yaoyiyao' }),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u6447\u4E00\u6447'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'setue-set ' + (!select ? 'setue-set-hide' : 'setue-set-show') },
                    JSXDOM
                )
            );
        }
    }]);
    return LayerSet;
}(_react.Component)) || _class) || _class);
exports.default = LayerSet;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(LayerSet, 'LayerSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/layerSet/Interaction.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _LinkSet = __webpack_require__(146);

var _LinkSet2 = _interopRequireDefault(_LinkSet);

var _ToPageSet = __webpack_require__(148);

var _ToPageSet2 = _interopRequireDefault(_ToPageSet);

var _TelSet = __webpack_require__(150);

var _TelSet2 = _interopRequireDefault(_TelSet);

var _MsgSet = __webpack_require__(152);

var _MsgSet2 = _interopRequireDefault(_MsgSet);

var _HideShowSet = __webpack_require__(154);

var _HideShowSet2 = _interopRequireDefault(_HideShowSet);

var _ShakeSet = __webpack_require__(156);

var _ShakeSet2 = _interopRequireDefault(_ShakeSet);

var _TouchSet = __webpack_require__(158);

var _TouchSet2 = _interopRequireDefault(_TouchSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
    LinkSet: _LinkSet2.default,
    TelSet: _TelSet2.default,
    ToPageSet: _ToPageSet2.default,
    TouchSet: _TouchSet2.default,
    HideShowSet: _HideShowSet2.default,
    ShakeSet: _ShakeSet2.default,
    MsgSet: _MsgSet2.default
};
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(_default, 'default', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/interaction/index.js');
}();

;
module.exports = exports['default'];

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(10);

__webpack_require__(147);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _util = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 设置
var LinkSet = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(LinkSet, _Component);

    function LinkSet(props) {
        (0, _classCallCheck3.default)(this, LinkSet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LinkSet.__proto__ || (0, _getPrototypeOf2.default)(LinkSet)).call(this, props));

        _this.changeText = function () {
            return _this.__changeText__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.ok = function () {
            return _this.__ok__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.clear = function () {
            return _this.__clear__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.layer = props.app.getLayer();
        _this.state = {
            val: _this.layer.ue['link'] || ''
        };
        return _this;
    }

    (0, _createClass3.default)(LinkSet, [{
        key: '__changeText__REACT_HOT_LOADER__',
        value: function __changeText__REACT_HOT_LOADER__(e) {
            this.setState({
                val: e.target.value
            });
        }
    }, {
        key: '__ok__REACT_HOT_LOADER__',
        value: function __ok__REACT_HOT_LOADER__() {
            var val = this.state.val;

            if ((0, _util.isUrl)(val)) {
                this.layer.ue['link'] = val;
                $(document).trigger('h5ds.closeUeBox');
            } else {
                _message3.default.error('url格式不正确，格式示例：http://www.h5ds.com');
            }
        }
    }, {
        key: '__clear__REACT_HOT_LOADER__',
        value: function __clear__REACT_HOT_LOADER__() {
            if (this.layer.ue['link']) {
                delete this.layer.ue['link'];
            }
            $(document).trigger('h5ds.closeUeBox');
        }
    }, {
        key: 'render',
        value: function render() {
            var val = this.state.val;

            return _react2.default.createElement(
                'div',
                { className: 'setuebox' },
                _react2.default.createElement(
                    'a',
                    { onClick: this.ok, className: 'close-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-jia' }),
                    ' \u786E\u5B9A'
                ),
                _react2.default.createElement(
                    'a',
                    { onClick: this.clear, className: 'clear-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-icodel' }),
                    ' \u6E05\u9664'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'setue-set-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uebox' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'setue-title' },
                            '\u4EA4\u4E92\u540D\u79F0\uFF1A\u8D85\u94FE\u63A5'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-links' },
                            _react2.default.createElement(
                                'div',
                                { className: 'uebox-links-txt' },
                                _react2.default.createElement('textarea', { placeholder: '\u8BF7\u8F93\u5165\u5E26http\u7684\u94FE\u63A5\u5730\u5740', onChange: this.changeText, value: val })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-tips' },
                            _react2.default.createElement(
                                'h5',
                                null,
                                '\u4EA4\u4E92\u8BF4\u660E\uFF1A'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'uebox-content' },
                                '\u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u8981\u8DF3\u8F6C\u5230\u7684\u94FE\u63A5\u5730\u5740\u5C31\u53EF\u4EE5\u4E86'
                            )
                        )
                    )
                )
            );
        }
    }]);
    return LinkSet;
}(_react.Component)) || _class) || _class);
exports.default = LinkSet;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(LinkSet, 'LinkSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/interaction/link/LinkSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 147 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(10);

__webpack_require__(149);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _util = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToPage = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(ToPage, _Component);

    function ToPage(props) {
        (0, _classCallCheck3.default)(this, ToPage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ToPage.__proto__ || (0, _getPrototypeOf2.default)(ToPage)).call(this, props));

        _this.changeVal = function () {
            return _this.__changeVal__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.ok = function () {
            return _this.__ok__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.clear = function () {
            return _this.__clear__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.layer = props.app.getLayer();
        var toPage = _this.layer.ue['toPage'];
        if (!(0, _util.isNot)(toPage)) {
            toPage = parseInt(toPage, 10);
        }
        _this.state = {
            val: toPage
        };
        return _this;
    }

    (0, _createClass3.default)(ToPage, [{
        key: '__changeVal__REACT_HOT_LOADER__',
        value: function __changeVal__REACT_HOT_LOADER__(index) {
            this.layer.ue['toPage'] = index;
            this.setState({
                val: index
            });
        }
    }, {
        key: '__ok__REACT_HOT_LOADER__',
        value: function __ok__REACT_HOT_LOADER__() {
            var val = this.state.val;

            if (!(0, _util.isNot)(val)) {
                this.layer.ue['toPage'] = val;
                $(document).trigger('h5ds.closeUeBox');
            } else {
                _message3.default.error('url格式不正确，格式示例：http://www.h5ds.com');
            }
        }
    }, {
        key: '__clear__REACT_HOT_LOADER__',
        value: function __clear__REACT_HOT_LOADER__() {
            if (this.layer.ue['toPage']) {
                delete this.layer.ue['toPage'];
            }
            $(document).trigger('h5ds.closeUeBox');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var pages = this.props.app.data.pages;
            var val = this.state.val;

            return _react2.default.createElement(
                'div',
                { className: 'setuebox' },
                _react2.default.createElement(
                    'a',
                    { onClick: this.ok, className: 'close-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-jia' }),
                    ' \u786E\u5B9A'
                ),
                _react2.default.createElement(
                    'a',
                    { onClick: this.clear, className: 'clear-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-icodel' }),
                    ' \u6E05\u9664'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'setue-set-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uebox' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'setue-title' },
                            '\u4EA4\u4E92\u540D\u79F0\uFF1A\u8DF3\u8F6C\u9875\u9762'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-topages' },
                            _react2.default.createElement(
                                'div',
                                { className: 'uebox-topages' },
                                _react2.default.createElement(
                                    'h4',
                                    null,
                                    '\u8BF7\u9009\u62E9\u60A8\u8981\u8DF3\u8F6C\u7684\u9875\u9762\uFF1A'
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { id: 'ueBoxToPage' },
                                    pages.map(function (elem, index) {
                                        return _react2.default.createElement(
                                            'li',
                                            {
                                                key: index,
                                                onClick: function onClick(e) {
                                                    return _this2.changeVal(index);
                                                },
                                                title: elem.name,
                                                className: parseInt(val, 10) === index ? 'active' : ''
                                            },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'num' },
                                                index + 1
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'name' },
                                                elem.name
                                            )
                                        );
                                    })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-tips' },
                            _react2.default.createElement(
                                'h5',
                                null,
                                '\u4EA4\u4E92\u8BF4\u660E\uFF1A'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'uebox-content' },
                                '\u9009\u62E9\u4E00\u4E2A\u8981\u8DF3\u8F6C\u7684\u9875\u9762\uFF0C\u70B9\u51FB\u4F1A\u89E6\u53D1\u4EA4\u4E92\u6548\u679C\uFF0C\u8DF3\u8F6C\u5230\u6307\u5B9A\u7684\u9875\u9762'
                            )
                        )
                    )
                )
            );
        }
    }]);
    return ToPage;
}(_react.Component)) || _class) || _class);
exports.default = ToPage;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(ToPage, 'ToPage', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/interaction/toPage/ToPageSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 149 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(10);

__webpack_require__(151);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _util = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MegSet = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(MegSet, _Component);

    function MegSet(props) {
        (0, _classCallCheck3.default)(this, MegSet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MegSet.__proto__ || (0, _getPrototypeOf2.default)(MegSet)).call(this, props));

        _this.changeText = function () {
            return _this.__changeText__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.ok = function () {
            return _this.__ok__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.clear = function () {
            return _this.__clear__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.layer = props.app.getLayer();
        _this.state = {
            val: _this.layer.ue['tel'] || ''
        };
        return _this;
    }

    (0, _createClass3.default)(MegSet, [{
        key: '__changeText__REACT_HOT_LOADER__',
        value: function __changeText__REACT_HOT_LOADER__(e) {
            this.setState({
                val: e.target.value
            });
        }
    }, {
        key: '__ok__REACT_HOT_LOADER__',
        value: function __ok__REACT_HOT_LOADER__() {
            var val = this.state.val;

            if ((0, _util.isPhoneNum)(val)) {
                this.layer.ue['tel'] = val;
                $(document).trigger('h5ds.closeUeBox');
            } else {
                _message3.default.error('电话格式不正确，格式示例：13866688800');
            }
        }
    }, {
        key: '__clear__REACT_HOT_LOADER__',
        value: function __clear__REACT_HOT_LOADER__() {
            if (this.layer.ue['tel']) {
                delete this.layer.ue['tel'];
            }
            $(document).trigger('h5ds.closeUeBox');
        }
    }, {
        key: 'render',
        value: function render() {
            var val = this.state.val;

            return _react2.default.createElement(
                'div',
                { className: 'setuebox' },
                _react2.default.createElement(
                    'a',
                    { onClick: this.ok, className: 'close-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-jia' }),
                    ' \u786E\u5B9A'
                ),
                _react2.default.createElement(
                    'a',
                    { onClick: this.clear, className: 'clear-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-icodel' }),
                    ' \u6E05\u9664'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'setue-set-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uebox uebox-tel' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'setue-title' },
                            '\u4EA4\u4E92\u540D\u79F0\uFF1A\u6253\u7535\u8BDD'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-tel-input' },
                            _react2.default.createElement('input', { placeholder: '\u8BF7\u8F93\u5165\u7535\u8BDD\u53F7\u7801', onChange: this.changeText, value: val })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'uebox-tips' },
                        _react2.default.createElement(
                            'h5',
                            null,
                            '\u4EA4\u4E92\u8BF4\u660E\uFF1A'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-content' },
                            '\u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u7535\u8BDD\u53F7\u7801\u5373\u53EF'
                        )
                    )
                )
            );
        }
    }]);
    return MegSet;
}(_react.Component)) || _class) || _class);
exports.default = MegSet;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(MegSet, 'MegSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/interaction/tel/TelSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 151 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(10);

__webpack_require__(153);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _util = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MegSet = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(MegSet, _Component);

    function MegSet(props) {
        (0, _classCallCheck3.default)(this, MegSet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MegSet.__proto__ || (0, _getPrototypeOf2.default)(MegSet)).call(this, props));

        _this.changeText = function () {
            return _this.__changeText__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.ok = function () {
            return _this.__ok__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.clear = function () {
            return _this.__clear__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.layer = props.app.getLayer();
        _this.state = {
            val: _this.layer.ue['msg'] || ''
        };
        return _this;
    }

    (0, _createClass3.default)(MegSet, [{
        key: '__changeText__REACT_HOT_LOADER__',
        value: function __changeText__REACT_HOT_LOADER__(e) {
            this.setState({
                val: e.target.value
            });
        }
    }, {
        key: '__ok__REACT_HOT_LOADER__',
        value: function __ok__REACT_HOT_LOADER__() {
            var val = this.state.val;

            if ((0, _util.isPhoneNum)(val)) {
                this.layer.ue['msg'] = val;
                $(document).trigger('h5ds.closeUeBox');
            } else {
                _message3.default.error('电话格式不正确，格式示例：13866688800');
            }
        }
    }, {
        key: '__clear__REACT_HOT_LOADER__',
        value: function __clear__REACT_HOT_LOADER__() {
            if (this.layer.ue['msg']) {
                delete this.layer.ue['msg'];
            }
            $(document).trigger('h5ds.closeUeBox');
        }
    }, {
        key: 'render',
        value: function render() {
            var val = this.state.val;

            return _react2.default.createElement(
                'div',
                { className: 'setuebox' },
                _react2.default.createElement(
                    'a',
                    { onClick: this.ok, className: 'close-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-jia' }),
                    ' \u786E\u5B9A'
                ),
                _react2.default.createElement(
                    'a',
                    { onClick: this.clear, className: 'clear-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-icodel' }),
                    ' \u6E05\u9664'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'setue-set-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uebox uebox-tel' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'setue-title' },
                            '\u4EA4\u4E92\u540D\u79F0\uFF1A\u53D1\u77ED\u4FE1'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-tel-input' },
                            _react2.default.createElement('input', { placeholder: '\u8BF7\u8F93\u5165\u7535\u8BDD\u53F7\u7801', onChange: this.changeText, value: val })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'uebox-tips' },
                        _react2.default.createElement(
                            'h5',
                            null,
                            '\u4EA4\u4E92\u8BF4\u660E\uFF1A'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-content' },
                            '\u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u7535\u8BDD\u53F7\u7801\u5373\u53EF'
                        )
                    )
                )
            );
        }
    }]);
    return MegSet;
}(_react.Component)) || _class) || _class);
exports.default = MegSet;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(MegSet, 'MegSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/interaction/msg/MsgSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 153 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _defineProperty2 = __webpack_require__(14);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _radio = __webpack_require__(41);

var _radio2 = _interopRequireDefault(_radio);

var _dec, _class;

__webpack_require__(10);

__webpack_require__(43);

__webpack_require__(155);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _util = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroup = _radio2.default.Group;

var HideShowSet = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(HideShowSet, _Component);

    function HideShowSet(props) {
        (0, _classCallCheck3.default)(this, HideShowSet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HideShowSet.__proto__ || (0, _getPrototypeOf2.default)(HideShowSet)).call(this, props));

        _this.changeText = function () {
            return _this.__changeText__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.ok = function () {
            return _this.__ok__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.clear = function () {
            return _this.__clear__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.layer = props.app.getLayer();
        var hideshow = _this.layer.ue['hideShow'];
        _this.state = {
            ids: hideshow ? hideshow.ids : '',
            type: hideshow ? hideshow.type : ''
        };
        return _this;
    }

    (0, _createClass3.default)(HideShowSet, [{
        key: '__changeText__REACT_HOT_LOADER__',
        value: function __changeText__REACT_HOT_LOADER__(val, key) {
            this.setState((0, _defineProperty3.default)({}, key, val));
        }
    }, {
        key: '__ok__REACT_HOT_LOADER__',
        value: function __ok__REACT_HOT_LOADER__() {
            var _state = this.state,
                ids = _state.ids,
                type = _state.type;

            if (!(0, _util.isNot)(ids) && !(0, _util.isNot)(type)) {
                this.layer.ue['hideShow'] = { ids: ids, type: type };
                $(document).trigger('h5ds.closeUeBox');
            } else {
                _message3.default.error('id和显示类型必须同时填写！');
            }
        }
    }, {
        key: '__clear__REACT_HOT_LOADER__',
        value: function __clear__REACT_HOT_LOADER__() {
            if (this.layer.ue['hideShow']) {
                delete this.layer.ue['hideShow'];
            }
            $(document).trigger('h5ds.closeUeBox');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state2 = this.state,
                type = _state2.type,
                ids = _state2.ids;

            return _react2.default.createElement(
                'div',
                { className: 'setuebox' },
                _react2.default.createElement(
                    'a',
                    { onClick: this.ok, className: 'close-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-jia' }),
                    ' \u786E\u5B9A'
                ),
                _react2.default.createElement(
                    'a',
                    { onClick: this.clear, className: 'clear-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-icodel' }),
                    ' \u6E05\u9664'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'setue-set-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uebox uebox-hideshow' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'setue-title' },
                            '\u4EA4\u4E92\u540D\u79F0\uFF1A\u663E\u793A\u9690\u85CF\u5207\u6362'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-hideshow-box' },
                            _react2.default.createElement(
                                RadioGroup,
                                { value: type, onChange: function onChange(e) {
                                        return _this2.changeText(e.target.value, 'type');
                                    } },
                                _react2.default.createElement(
                                    _radio2.default,
                                    { value: 'hide' },
                                    '\u53EA\u9690\u85CF'
                                ),
                                _react2.default.createElement(
                                    _radio2.default,
                                    { value: 'show' },
                                    '\u53EA\u663E\u793A'
                                ),
                                _react2.default.createElement(
                                    _radio2.default,
                                    { value: 'hideshow' },
                                    '\u663E\u9690\u5207\u6362'
                                )
                            ),
                            _react2.default.createElement('textarea', {
                                placeholder: '\u8BF7\u8F93\u5165\u76EE\u6807\u5143\u7D20\u7684id\u6216\u8005class, \u591A\u4E2A\u7528,\u5206\u9694\uFF0C\u683C\u5F0F\uFF1Aid-xx\uFF0Cclass-xx',
                                onChange: function onChange(e) {
                                    return _this2.changeText(e.target.value, 'ids');
                                },
                                value: ids
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'uebox-tips' },
                        _react2.default.createElement(
                            'h5',
                            null,
                            '\u4EA4\u4E92\u8BF4\u660E\uFF1A'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-content' },
                            '\u9009\u62E9\u663E\u9690\u85CF\u7684\u4EA4\u4E92\u65B9\u5F0F\uFF0C\u8BBE\u7F6E\u76EE\u6807\u5143\u7D20\u7684id\uFF0C\u591A\u4E2Aid\u7528,\u5206\u9694'
                        )
                    )
                )
            );
        }
    }]);
    return HideShowSet;
}(_react.Component)) || _class) || _class);
exports.default = HideShowSet;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(RadioGroup, 'RadioGroup', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/interaction/hideShow/HideShowSet.jsx');

    __REACT_HOT_LOADER__.register(HideShowSet, 'HideShowSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/interaction/hideShow/HideShowSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 155 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(157);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 设置
var ShakeSet = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(ShakeSet, _Component);

    function ShakeSet(props) {
        (0, _classCallCheck3.default)(this, ShakeSet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ShakeSet.__proto__ || (0, _getPrototypeOf2.default)(ShakeSet)).call(this, props));

        _this.changeText = function () {
            return _this.__changeText__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.ok = function () {
            return _this.__ok__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.clear = function () {
            return _this.__clear__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.layer = props.app.getLayer();
        _this.state = {
            val: _this.layer.ue['shake'] || ''
        };
        return _this;
    }

    (0, _createClass3.default)(ShakeSet, [{
        key: '__changeText__REACT_HOT_LOADER__',
        value: function __changeText__REACT_HOT_LOADER__(e) {
            this.setState({
                val: e.target.value
            });
        }
    }, {
        key: '__ok__REACT_HOT_LOADER__',
        value: function __ok__REACT_HOT_LOADER__() {
            $(document).trigger('h5ds.closeUeBox');
        }
    }, {
        key: '__clear__REACT_HOT_LOADER__',
        value: function __clear__REACT_HOT_LOADER__() {
            if (this.layer.ue['shake']) {
                delete this.layer.ue['shake'];
            }
            $(document).trigger('h5ds.closeUeBox');
        }
    }, {
        key: 'render',
        value: function render() {
            var val = this.state.val;

            return _react2.default.createElement(
                'div',
                { className: 'setuebox' },
                _react2.default.createElement(
                    'a',
                    { onClick: this.ok, className: 'close-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-jia' }),
                    ' \u786E\u5B9A'
                ),
                _react2.default.createElement(
                    'a',
                    { onClick: this.clear, className: 'clear-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-icodel' }),
                    ' \u6E05\u9664'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'setue-set-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uebox' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'setue-title' },
                            '\u4EA4\u4E92\u540D\u79F0\uFF1A\u6447\u4E00\u6447'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-links' },
                            _react2.default.createElement(
                                'div',
                                { className: 'uebox-links-txt' },
                                _react2.default.createElement('textarea', { placeholder: '\u6D4B\u8BD5', onChange: this.changeText, value: val })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-tips' },
                            _react2.default.createElement(
                                'h5',
                                null,
                                '\u4EA4\u4E92\u8BF4\u660E\uFF1A'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'uebox-content' },
                                '\u6D4B\u8BD5\u6570\u636E...'
                            )
                        )
                    )
                )
            );
        }
    }]);
    return ShakeSet;
}(_react.Component)) || _class) || _class);
exports.default = ShakeSet;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(ShakeSet, 'ShakeSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/interaction/shake/ShakeSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 157 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(159);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 设置
var TouchSet = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(TouchSet, _Component);

    function TouchSet(props) {
        (0, _classCallCheck3.default)(this, TouchSet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TouchSet.__proto__ || (0, _getPrototypeOf2.default)(TouchSet)).call(this, props));

        _this.changeText = function () {
            return _this.__changeText__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.ok = function () {
            return _this.__ok__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.clear = function () {
            return _this.__clear__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.layer = props.app.getLayer();
        _this.state = {
            val: _this.layer.ue['shake'] || ''
        };
        return _this;
    }

    (0, _createClass3.default)(TouchSet, [{
        key: '__changeText__REACT_HOT_LOADER__',
        value: function __changeText__REACT_HOT_LOADER__(e) {
            this.setState({
                val: e.target.value
            });
        }
    }, {
        key: '__ok__REACT_HOT_LOADER__',
        value: function __ok__REACT_HOT_LOADER__() {
            $(document).trigger('h5ds.closeUeBox');
        }
    }, {
        key: '__clear__REACT_HOT_LOADER__',
        value: function __clear__REACT_HOT_LOADER__() {
            if (this.layer.ue['shake']) {
                delete this.layer.ue['shake'];
            }
            $(document).trigger('h5ds.closeUeBox');
        }
    }, {
        key: 'render',
        value: function render() {
            var val = this.state.val;

            return _react2.default.createElement(
                'div',
                { className: 'setuebox' },
                _react2.default.createElement(
                    'a',
                    { onClick: this.ok, className: 'close-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-jia' }),
                    ' \u786E\u5B9A'
                ),
                _react2.default.createElement(
                    'a',
                    { onClick: this.clear, className: 'clear-setue' },
                    _react2.default.createElement('i', { className: 'h5ds ico5-icodel' }),
                    ' \u6E05\u9664'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'setue-set-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'uebox' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'setue-title' },
                            '\u4EA4\u4E92\u540D\u79F0\uFF1A\u6307\u7EB9'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-links' },
                            _react2.default.createElement(
                                'div',
                                { className: 'uebox-links-txt' },
                                _react2.default.createElement('textarea', { placeholder: '\u6D4B\u8BD5', onChange: this.changeText, value: val })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'uebox-tips' },
                            _react2.default.createElement(
                                'h5',
                                null,
                                '\u4EA4\u4E92\u8BF4\u660E\uFF1A'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'uebox-content' },
                                '\u6D4B\u8BD5\u6570\u636E...'
                            )
                        )
                    )
                )
            );
        }
    }]);
    return TouchSet;
}(_react.Component)) || _class) || _class);
exports.default = TouchSet;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(TouchSet, 'TouchSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/interaction/touch/TouchSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 159 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _message2 = __webpack_require__(9);

var _message3 = _interopRequireDefault(_message2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(10);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _StyleBasicSet = __webpack_require__(161);

var _StyleBasicSet2 = _interopRequireDefault(_StyleBasicSet);

var _StyleMoreSet = __webpack_require__(162);

var _StyleMoreSet2 = _interopRequireDefault(_StyleMoreSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { isNot } from '@/utils/util';
var StyleSet = (_dec = (0, _mobxReact.inject)('app', 'layerfun'), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(StyleSet, _Component);

    function StyleSet() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, StyleSet);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = StyleSet.__proto__ || (0, _getPrototypeOf2.default)(StyleSet)).call.apply(_ref, [this].concat(args))), _this), _this.doRender = function () {
            var _this2;

            return (_this2 = _this).__doRender__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(StyleSet, [{
        key: '__doRender__REACT_HOT_LOADER__',
        value: function __doRender__REACT_HOT_LOADER__() {
            var dom = null;
            var layer = this.props.app.getLayer();
            var layerobj = this.props.layerfun.layersSet[layer.type];
            if (layerobj) {
                dom = layerobj.editor || null;
            } else {
                _message3.default.error('\u65E0' + layer.type + '\u56FE\u5C42\uFF01');
            }
            return dom;
        }
    }, {
        key: 'render',
        value: function render() {
            var layer = this.props.app.getLayer();
            if (!layer) {
                return null;
            }
            var Dom = this.doRender();
            console.log('StyleSet render');
            return _react2.default.createElement(
                'span',
                { key: layer.keyid },
                _react2.default.createElement(_StyleBasicSet2.default, null),
                Dom ? _react2.default.createElement(Dom, { layerfun: this.props.layerfun.layersSet, layer: layer }) : _react2.default.createElement(
                    'div',
                    null,
                    null
                ),
                _react2.default.createElement(_StyleMoreSet2.default, null)
            );
        }
    }]);
    return StyleSet;
}(_react.Component)) || _class) || _class);
exports.default = StyleSet;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(StyleSet, 'StyleSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/layerSet/StyleSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(14);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _InputMt = __webpack_require__(20);

var _InputMt2 = _interopRequireDefault(_InputMt);

var _mobx = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyleBasicSet = (_dec = (0, _mobxReact.inject)('app', 'layerfun'), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(StyleBasicSet, _Component);

    function StyleBasicSet(props) {
        (0, _classCallCheck3.default)(this, StyleBasicSet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (StyleBasicSet.__proto__ || (0, _getPrototypeOf2.default)(StyleBasicSet)).call(this, props));

        _this.reRender = function () {
            return _this.__reRender__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.onChange = function () {
            return _this.__onChange__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.filterValue = function () {
            return _this.__filterValue__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.layer = props.app.getLayer();
        return _this;
    }

    (0, _createClass3.default)(StyleBasicSet, [{
        key: '__reRender__REACT_HOT_LOADER__',


        // 表单
        value: function __reRender__REACT_HOT_LOADER__() {
            var edata = this.props.app.edata;

            edata.keys = +new Date();
        }
    }, {
        key: '__onChange__REACT_HOT_LOADER__',


        // 格式化value
        value: function __onChange__REACT_HOT_LOADER__(val, key) {
            var style = this.layer.style;

            if (key === 'id' || key === 'className') {
                this.layer[key] = val;
            } else {
                if (style[key] === undefined) {
                    (0, _mobx.extendObservable)(style, (0, _defineProperty3.default)({}, key, val));
                    this.reRender();
                } else {
                    style[key] = val;
                }
            }
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__filterValue__REACT_HOT_LOADER__',
        value: function __filterValue__REACT_HOT_LOADER__(e) {
            var val = e.target.value;
            if (val) {
                val = val.replace(/[a-z]/g, '');
            } else {
                val = 0;
            }
            return parseFloat(val);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var layersSet = this.props.layerfun.layersSet;

            $(document).on('h5ds.shortcuts_y', function (e, num) {
                var _layer = _this2.layer,
                    style = _layer.style,
                    type = _layer.type;

                if (layersSet[type].editorSet && layersSet[type].editorSet.y === false) {
                    return;
                }
                _this2.onChange((style.top || 0) + num, 'top');
            });

            $(document).on('h5ds.shortcuts_x', function (e, num) {
                var _layer2 = _this2.layer,
                    style = _layer2.style,
                    type = _layer2.type;

                if (layersSet[type].editorSet && layersSet[type].editorSet.x === false) {
                    return;
                }
                _this2.onChange((style.left || 0) + num, 'left');
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $(document).off('h5ds.shortcuts_y');
            $(document).off('h5ds.shortcuts_x');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var layer = this.props.app.getLayer();

            console.log('StyleBasicSet render');

            if (!layer) {
                return _react2.default.createElement(
                    'span',
                    null,
                    null
                );
            }
            var id = layer.id,
                className = layer.className;
            var _layer$style = layer.style,
                top = _layer$style.top,
                left = _layer$style.left,
                width = _layer$style.width,
                height = _layer$style.height;
            // 不能删除

            var state = (0, _extends3.default)({}, this.props.app.edata);
            var editorSet = this.props.layerfun.layersSet[layer.type].editorSet || {};

            // console.log('editorSet', editorSet);
            return _react2.default.createElement(
                'div',
                { className: 'set-baisc' },
                _react2.default.createElement(
                    'div',
                    { className: 'tr' },
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'em',
                            null,
                            'ID'
                        ),
                        _react2.default.createElement(_InputMt2.default, {
                            type: 'text',
                            onChange: function onChange(e) {
                                return _this3.onChange(e.target.value, 'id');
                            },
                            placeholder: 'id\u540D\u5B57',
                            value: id
                        })
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'em',
                            null,
                            'class'
                        ),
                        _react2.default.createElement(_InputMt2.default, {
                            type: 'text',
                            onChange: function onChange(e) {
                                return _this3.onChange(e.target.value, 'className');
                            },
                            placeholder: 'class\u540D\u5B57',
                            value: className
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'tr' },
                    editorSet.x === false ? null : _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'em',
                            null,
                            'x\u5750\u6807'
                        ),
                        _react2.default.createElement(_InputMt2.default, {
                            onChange: function onChange(e) {
                                return _this3.onChange(_this3.filterValue(e), 'left');
                            },
                            wheel: true,
                            placeholder: 'x\u5750\u6807',
                            value: left
                        })
                    ),
                    editorSet.y === false ? null : _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'em',
                            null,
                            'y\u5750\u6807'
                        ),
                        _react2.default.createElement(_InputMt2.default, {
                            onChange: function onChange(e) {
                                return _this3.onChange(_this3.filterValue(e), 'top');
                            },
                            wheel: true,
                            placeholder: 'y\u5750\u6807',
                            value: top
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'tr' },
                    editorSet.width === false ? null : _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'em',
                            null,
                            '\u5BBD\u5EA6'
                        ),
                        _react2.default.createElement(_InputMt2.default, {
                            onChange: function onChange(e) {
                                return _this3.onChange(_this3.filterValue(e), 'width');
                            },
                            wheel: true,
                            placeholder: '\u5BBD',
                            min: 0,
                            value: width
                        })
                    ),
                    editorSet.height === false ? null : _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'em',
                            null,
                            '\u9AD8\u5EA6'
                        ),
                        _react2.default.createElement(_InputMt2.default, {
                            onChange: function onChange(e) {
                                return _this3.onChange(_this3.filterValue(e), 'height');
                            },
                            wheel: true,
                            placeholder: '\u9AD8',
                            min: 0,
                            value: height
                        })
                    )
                )
            );
        }
    }]);
    return StyleBasicSet;
}(_react.Component)) || _class) || _class);
exports.default = StyleBasicSet;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(StyleBasicSet, 'StyleBasicSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/layerSet/StyleBasicSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _switch = __webpack_require__(40);

var _switch2 = _interopRequireDefault(_switch);

var _slider = __webpack_require__(24);

var _slider2 = _interopRequireDefault(_slider);

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(42);

__webpack_require__(25);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _cssFilter = __webpack_require__(68);

var _mobx = __webpack_require__(7);

var _mobxReact = __webpack_require__(6);

var _Colors = __webpack_require__(46);

var _Colors2 = _interopRequireDefault(_Colors);

var _InputMt = __webpack_require__(20);

var _InputMt2 = _interopRequireDefault(_InputMt);

var _debounce = __webpack_require__(51);

var _util = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyleMoreSet = (_dec = (0, _mobxReact.inject)('app', 'layerfun'), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(StyleMoreSet, _Component);

    function StyleMoreSet(props) {
        (0, _classCallCheck3.default)(this, StyleMoreSet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (StyleMoreSet.__proto__ || (0, _getPrototypeOf2.default)(StyleMoreSet)).call(this, props));

        _this.reRender = function () {
            return _this.__reRender__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.getRotate = function () {
            return _this.__getRotate__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setRotate = function () {
            return _this.__setRotate__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.sliderChange = function () {
            return _this.__sliderChange__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.filterValue = function () {
            return _this.__filterValue__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.hideLayer = function () {
            return _this.__hideLayer__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setBorder = function () {
            return _this.__setBorder__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.switchBorder = function () {
            return _this.__switchBorder__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setBorderColor = function () {
            return _this.__setBorderColor__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.changeBorderType = function () {
            return _this.__changeBorderType__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setBoxshadow = function () {
            return _this.__setBoxshadow__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.switchBoxShadow = function () {
            return _this.__switchBoxShadow__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.setBoxShadowColor = function () {
            return _this.__setBoxShadowColor__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.layer = props.app.getLayer();
        return _this;
    }

    (0, _createClass3.default)(StyleMoreSet, [{
        key: '__reRender__REACT_HOT_LOADER__',


        // rotate 值
        value: function __reRender__REACT_HOT_LOADER__() {
            var edata = this.props.app.edata;

            edata.keys++;
        }
    }, {
        key: '__getRotate__REACT_HOT_LOADER__',


        // 设置rotate
        value: function __getRotate__REACT_HOT_LOADER__(style) {
            var rotate = 0;
            var rotateStr = style.transform;
            if (rotateStr) {
                rotate = parseInt(rotateStr.transformValue('rotate'), 10);
            }
            return rotate || 0;
        }
    }, {
        key: '__setRotate__REACT_HOT_LOADER__',


        // 设置 slider 的值
        value: function __setRotate__REACT_HOT_LOADER__(value) {
            var style = this.layer.style;

            if (style.transform === undefined) {
                (0, _mobx.extendObservable)(style, {
                    transform: 'rotate(' + value + 'deg)'
                });
                this.reRender();
            } else {
                style.transform = 'rotate(' + value + 'deg)';
            }
        }
    }, {
        key: '__sliderChange__REACT_HOT_LOADER__',


        // 格式化value
        value: function __sliderChange__REACT_HOT_LOADER__(value, key) {
            var _this2 = this;

            // 设置 app.data 值
            var _layer = this.layer,
                estyle = _layer.estyle,
                style = _layer.style;

            (0, _mobx.transaction)(function () {
                switch (key) {
                    case 'rotate':
                        _this2.setRotate(value);
                        break;
                    case 'borderRadius':
                        {
                            if (estyle.borderRadius === undefined) {
                                (0, _mobx.extendObservable)(estyle, {
                                    borderRadius: value
                                });
                                _this2.reRender();
                            } else {
                                estyle['borderRadius'] = value;
                            }
                        }
                        break;
                    case 'opacity':
                        {
                            if (style.opacity === undefined) {
                                (0, _mobx.extendObservable)(style, {
                                    opacity: value
                                });
                                _this2.reRender();
                            } else {
                                style['opacity'] = value;
                            }
                        }
                        break;
                    case 'borderSize':
                        estyle['border'] = (0, _cssFilter.setBorder)(estyle.border, { size: value });
                        break;
                    case 'borderType':
                        estyle['border'] = (0, _cssFilter.setBorder)(estyle.border, { type: value });
                        break;
                    case 'borderColor':
                        estyle['border'] = (0, _cssFilter.setBorder)(estyle.border, { color: value });
                        break;
                    case 'borderOpacity':
                        estyle['border'] = (0, _cssFilter.setBorder)(estyle.border, { opacity: value });
                        break;
                    case 'boxShadowSize':
                        estyle['boxShadow'] = (0, _cssFilter.setBoxshadow)(estyle.boxShadow, { size: value });
                        break;
                    case 'boxShadowColor':
                        estyle['boxShadow'] = (0, _cssFilter.setBoxshadow)(estyle.boxShadow, { color: value });
                        break;
                    case 'boxShadowOpacity':
                        estyle['boxShadow'] = (0, _cssFilter.setBoxshadow)(estyle.boxShadow, { opacity: value });
                        break;
                }
                _this2.props.app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__filterValue__REACT_HOT_LOADER__',


        // 隐藏元素
        value: function __filterValue__REACT_HOT_LOADER__(e) {
            var val = e.target.value;
            if (val) {
                val = val.replace(/[a-z]/g, '');
            } else {
                val = 0;
            }
            return parseFloat(val);
        }
    }, {
        key: '__hideLayer__REACT_HOT_LOADER__',


        // 设置边框
        value: function __hideLayer__REACT_HOT_LOADER__(val) {
            var style = this.layer.style;

            console.log(val ? 'none' : 'block');
            if (style.display === undefined) {
                (0, _mobx.extendObservable)(style, {
                    display: val ? 'none' : 'block'
                });
                this.reRender();
            } else {
                style.display = val ? 'none' : 'block';
            }
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__setBorder__REACT_HOT_LOADER__',


        // 边框
        value: function __setBorder__REACT_HOT_LOADER__(obj) {
            var estyle = this.layer.estyle;

            estyle.border = (0, _cssFilter.setBorder)(estyle.border, (0, _extends3.default)({}, obj));
        }
    }, {
        key: '__switchBorder__REACT_HOT_LOADER__',


        // 设置边框颜色
        value: function __switchBorder__REACT_HOT_LOADER__(val) {
            var estyle = this.layer.estyle;

            if (val) {
                if (estyle.border === undefined) {
                    (0, _mobx.extendObservable)(estyle, {
                        border: '2px solid rgba(0,0,0,1)'
                    });
                    this.reRender();
                } else {
                    this.setBorder({ size: 2, type: 'solid', color: '#000', opacity: 1 });
                }
            } else {
                estyle.border = 'none';
            }
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__setBorderColor__REACT_HOT_LOADER__',


        // 设置border type
        value: function __setBorderColor__REACT_HOT_LOADER__(color) {
            this.setBorder({ color: color.hex });
        }
    }, {
        key: '__changeBorderType__REACT_HOT_LOADER__',


        // 设置阴影
        value: function __changeBorderType__REACT_HOT_LOADER__(e) {
            this.setBorder({ type: e.target.value });
        }
    }, {
        key: '__setBoxshadow__REACT_HOT_LOADER__',


        // 开启阴影
        value: function __setBoxshadow__REACT_HOT_LOADER__(obj) {
            var estyle = this.layer.estyle;

            estyle.boxShadow = (0, _cssFilter.setBoxshadow)(estyle.boxShadow, (0, _extends3.default)({}, obj));
        }
    }, {
        key: '__switchBoxShadow__REACT_HOT_LOADER__',


        // 设置阴影颜色
        value: function __switchBoxShadow__REACT_HOT_LOADER__(val) {
            var estyle = this.layer.estyle;

            if (val) {
                if (estyle.boxShadow === undefined) {
                    (0, _mobx.extendObservable)(estyle, {
                        boxShadow: '0px 0px 10px rgba(0,0,0,0.5)'
                    });
                    this.reRender();
                } else {
                    this.setBoxshadow({ size: 10, color: '#000', opacity: 0.5 });
                }
            } else {
                estyle.boxShadow = 'none';
            }
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__setBoxShadowColor__REACT_HOT_LOADER__',
        value: function __setBoxShadowColor__REACT_HOT_LOADER__(color) {
            this.setBoxshadow({ color: color.hex });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            $(document).on('h5ds.sliderChangeVal', (0, _debounce.debounce)(500, function (data) {}));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props$app = this.props.app,
                getLayer = _props$app.getLayer,
                edata = _props$app.edata;

            var layer = getLayer();
            if (!layer) {
                return null;
            }
            var style = layer.style,
                estyle = layer.estyle;

            var rotate = this.getRotate(style);
            var borderRadius = estyle.borderRadius || 0;
            var opacity = (0, _util.isNot)(style.opacity) ? 1 : style.opacity;
            // 后期添加
            var eopacity = estyle['opacity'] === undefined ? 1 : estyle['opacity'];
            var display = style['display'] === 'none' ? false : true;
            // console.log('display', display);

            // 边框
            var border = (0, _cssFilter.borderFilter)(estyle.border);
            var borderSize = border.size,
                borderType = border.type,
                borderColor = border.color,
                borderOpacity = border.opacity;

            // 阴影
            var boxShadow = (0, _cssFilter.boxshadowFilter)(estyle.boxShadow);
            var boxShadowSize = boxShadow.size,
                boxShadowColor = boxShadow.color,
                boxShadowOpacity = boxShadow.opacity;

            // 不能删除
            var state = (0, _extends3.default)({}, edata);

            var editorSet = this.props.layerfun.layersSet[layer.type].editorSet || {};

            console.log('StyleMoreSet render');

            return _react2.default.createElement(
                'div',
                { className: 'set-baiscmore' },
                editorSet.rotate === false ? null : _react2.default.createElement(
                    'div',
                    { className: 'tr' },
                    _react2.default.createElement(
                        'h5',
                        null,
                        '\u65CB\u8F6C\u89D2\u5EA6'
                    ),
                    _react2.default.createElement(_slider2.default, {
                        onChange: function onChange(e) {
                            _this3.sliderChange(e, 'rotate');
                        },
                        tipFormatter: null,
                        step: 1,
                        min: 0,
                        max: 360,
                        value: rotate
                    }),
                    _react2.default.createElement(_InputMt2.default, {
                        onChange: function onChange(e) {
                            _this3.sliderChange(_this3.filterValue(e), 'rotate');
                        },
                        wheel: true,
                        value: rotate,
                        min: 0,
                        max: 360,
                        unit: 'deg',
                        placeholder: '\u5EA6\u6570'
                    })
                ),
                editorSet.borderRadius === false ? null : _react2.default.createElement(
                    'div',
                    { className: 'tr' },
                    _react2.default.createElement(
                        'h5',
                        null,
                        '\u5706\u89D2'
                    ),
                    _react2.default.createElement(_slider2.default, {
                        onChange: function onChange(e) {
                            _this3.sliderChange(e, 'borderRadius');
                        },
                        min: 0,
                        max: 1000,
                        value: borderRadius,
                        tipFormatter: null,
                        step: 1
                    }),
                    _react2.default.createElement(_InputMt2.default, {
                        onChange: function onChange(e) {
                            _this3.sliderChange(_this3.filterValue(e), 'borderRadius');
                        },
                        min: 0,
                        max: 1000,
                        unit: 'px',
                        placeholder: 'px',
                        wheel: true,
                        value: borderRadius
                    })
                ),
                editorSet.opacity === false ? null : _react2.default.createElement(
                    'div',
                    { className: 'tr' },
                    _react2.default.createElement(
                        'h5',
                        null,
                        '\u900F\u660E\u5EA6'
                    ),
                    _react2.default.createElement(_slider2.default, {
                        onChange: function onChange(e) {
                            _this3.sliderChange(e, 'opacity');
                        },
                        tipFormatter: null,
                        step: 0.01,
                        min: 0,
                        max: 1,
                        value: opacity
                    }),
                    _react2.default.createElement(_InputMt2.default, {
                        onChange: function onChange(e) {
                            _this3.sliderChange(_this3.filterValue(e), 'opacity');
                        },
                        wheel: true,
                        step: 0.01,
                        min: 0,
                        max: 1,
                        value: opacity
                    })
                ),
                editorSet.hide === false ? null : _react2.default.createElement(
                    'div',
                    { className: 'tr' },
                    _react2.default.createElement(
                        'h5',
                        null,
                        '\u9690\u85CF\u5143\u7D20'
                    ),
                    _react2.default.createElement(_switch2.default, { onChange: this.hideLayer, checked: !display })
                ),
                editorSet.shadow === false ? null : _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'tr' },
                        _react2.default.createElement(
                            'h5',
                            null,
                            '\u5F00\u542F\u9634\u5F71'
                        ),
                        _react2.default.createElement(_switch2.default, { onChange: this.switchBoxShadow, checked: boxShadowSize ? true : false })
                    ),
                    boxShadowSize ? _react2.default.createElement(
                        'div',
                        { className: 'tr' },
                        _react2.default.createElement(
                            'h5',
                            null,
                            '\u9634\u5F71\u8BBE\u7F6E'
                        ),
                        _react2.default.createElement(_slider2.default, {
                            onChange: function onChange(e) {
                                _this3.sliderChange(e, 'boxShadowSize');
                            },
                            tipFormatter: null,
                            min: 0,
                            step: 1,
                            max: 100,
                            value: boxShadowSize
                        }),
                        _react2.default.createElement(_InputMt2.default, {
                            onChange: function onChange(e) {
                                _this3.sliderChange(_this3.filterValue(e), 'boxShadowSize');
                            },
                            min: 0,
                            max: 100,
                            unit: 'px',
                            wheel: true,
                            value: boxShadowSize
                        }),
                        _react2.default.createElement(
                            'div',
                            { className: 'tr' },
                            _react2.default.createElement(
                                'h5',
                                null,
                                '\u9634\u5F71\u989C\u8272'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'h5ds-color' },
                                _react2.default.createElement(_Colors2.default, { onChange: this.setBoxShadowColor, color: boxShadowColor }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'label' },
                                    '\u900F\u660E\u5EA6\uFF1A'
                                ),
                                _react2.default.createElement(_slider2.default, {
                                    onChange: function onChange(e) {
                                        _this3.sliderChange(e, 'boxShadowOpacity');
                                    },
                                    tipFormatter: null,
                                    min: 0,
                                    max: 1,
                                    step: 0.01,
                                    value: boxShadowOpacity,
                                    style: { width: 90 }
                                }),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'h5ds-color-clear' },
                                    _react2.default.createElement('i', { className: 'h5ds ico5-eraser' }),
                                    '\u6E05\u9664'
                                )
                            )
                        )
                    ) : null
                ),
                editorSet.border === false ? null : _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'tr' },
                        _react2.default.createElement(
                            'h5',
                            null,
                            '\u5F00\u542F\u8FB9\u6846'
                        ),
                        _react2.default.createElement(_switch2.default, { onChange: this.switchBorder, checked: borderSize ? true : false })
                    ),
                    borderSize ? _react2.default.createElement(
                        'div',
                        { className: 'tr' },
                        _react2.default.createElement(
                            'h5',
                            null,
                            '\u8FB9\u6846\u7C7B\u578B'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'h5ds-select' },
                            _react2.default.createElement(
                                'select',
                                {
                                    onChange: this.changeBorderType,
                                    value: borderType || '',
                                    placeholder: '\u4E0B\u62C9\u9009\u62E9'
                                },
                                _react2.default.createElement(
                                    'option',
                                    { value: 'solid' },
                                    '\u5B9E\u7EBF'
                                ),
                                _react2.default.createElement(
                                    'option',
                                    { value: 'double' },
                                    '\u53CC\u7EBF'
                                ),
                                _react2.default.createElement(
                                    'option',
                                    { value: 'dashed' },
                                    '\u865A\u7EBF'
                                ),
                                _react2.default.createElement(
                                    'option',
                                    { value: 'dotted' },
                                    '\u70B9\u7EBF'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'h5',
                            { style: { marginLeft: 20 } },
                            '\u8FB9\u6846\u5927\u5C0F'
                        ),
                        _react2.default.createElement(_InputMt2.default, {
                            onChange: function onChange(e) {
                                _this3.sliderChange(_this3.filterValue(e), 'borderSize');
                            },
                            wheel: true,
                            min: 0,
                            max: 100,
                            value: borderSize || 0
                        }),
                        _react2.default.createElement(
                            'div',
                            { className: 'tr' },
                            _react2.default.createElement(
                                'h5',
                                null,
                                '\u8FB9\u6846\u989C\u8272'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'h5ds-color' },
                                _react2.default.createElement(_Colors2.default, { onChange: this.setBorderColor, color: borderColor }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'label' },
                                    '\u900F\u660E\u5EA6\uFF1A'
                                ),
                                _react2.default.createElement(_slider2.default, {
                                    onChange: function onChange(e) {
                                        _this3.sliderChange(e, 'borderOpacity');
                                    },
                                    tipFormatter: null,
                                    min: 0,
                                    max: 1,
                                    step: 0.01,
                                    value: borderOpacity,
                                    style: { width: 90 }
                                }),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'h5ds-color-clear' },
                                    _react2.default.createElement('i', { className: 'h5ds ico5-eraser' }),
                                    '\u6E05\u9664'
                                )
                            )
                        )
                    ) : null
                )
            );
        }
    }]);
    return StyleMoreSet;
}(_react.Component)) || _class) || _class);
exports.default = StyleMoreSet;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(StyleMoreSet, 'StyleMoreSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/layerSet/StyleMoreSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _toConsumableArray2 = __webpack_require__(17);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class; // 获取外框

__webpack_require__(164);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _rect = __webpack_require__(22);

var _util = __webpack_require__(8);

var _mobx = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayerSetAlign = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(LayerSetAlign, _Component);

    function LayerSetAlign() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, LayerSetAlign);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LayerSetAlign.__proto__ || (0, _getPrototypeOf2.default)(LayerSetAlign)).call.apply(_ref, [this].concat(args))), _this), _this.getSortGroups = function () {
            var _this2;

            return (_this2 = _this).__getSortGroups__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.alignLeft = function () {
            var _this3;

            return (_this3 = _this).__alignLeft__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _this.alignRight = function () {
            var _this4;

            return (_this4 = _this).__alignRight__REACT_HOT_LOADER__.apply(_this4, arguments);
        }, _this.alignTop = function () {
            var _this5;

            return (_this5 = _this).__alignTop__REACT_HOT_LOADER__.apply(_this5, arguments);
        }, _this.alignDown = function () {
            var _this6;

            return (_this6 = _this).__alignDown__REACT_HOT_LOADER__.apply(_this6, arguments);
        }, _this.horizontalCenter = function () {
            var _this7;

            return (_this7 = _this).__horizontalCenter__REACT_HOT_LOADER__.apply(_this7, arguments);
        }, _this.verticalCenter = function () {
            var _this8;

            return (_this8 = _this).__verticalCenter__REACT_HOT_LOADER__.apply(_this8, arguments);
        }, _this.verticalSplit = function () {
            var _this9;

            return (_this9 = _this).__verticalSplit__REACT_HOT_LOADER__.apply(_this9, arguments);
        }, _this.horizontalSplit = function () {
            var _this10;

            return (_this10 = _this).__horizontalSplit__REACT_HOT_LOADER__.apply(_this10, arguments);
        }, _this.randomDistrib = function () {
            var _this11;

            return (_this11 = _this).__randomDistrib__REACT_HOT_LOADER__.apply(_this11, arguments);
        }, _this.randomSize = function () {
            var _this12;

            return (_this12 = _this).__randomSize__REACT_HOT_LOADER__.apply(_this12, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    // 给对应的dom排序， 根据 dire 排序。 优化：这里要通过 外框boxWidth进行排序 rectParam


    (0, _createClass3.default)(LayerSetAlign, [{
        key: '__getSortGroups__REACT_HOT_LOADER__',


        // 左对齐
        value: function __getSortGroups__REACT_HOT_LOADER__(sortfun) {
            var getGroups = this.props.app.getGroups;

            var groups = getGroups();
            var uniqs = [].concat((0, _toConsumableArray3.default)(groups));
            uniqs.forEach(function (elem) {
                elem.box = (0, _rect.rectParamObj)(elem.layer);
            });
            if (sortfun) {
                uniqs.sort(sortfun);
            }
            console.log(uniqs);
            return uniqs;
        }
    }, {
        key: '__alignLeft__REACT_HOT_LOADER__',


        // 右对齐
        value: function __alignLeft__REACT_HOT_LOADER__() {
            var _this13 = this;

            var uniqs = this.getSortGroups(function (a, b) {
                return a.box.left - b.box.left;
            });
            var minleft = 0;
            (0, _mobx.transaction)(function () {
                uniqs.forEach(function (elem, index) {
                    if (index === 0) {
                        minleft = elem.box.left;
                    } else {
                        // center.left - boxWidth / 2 = 外框的left
                        elem.layer.style.left = minleft + elem.box.boxWidth / 2 - elem.box.width / 2;
                    }
                });
                _this13.props.app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__alignRight__REACT_HOT_LOADER__',


        // 上对齐
        value: function __alignRight__REACT_HOT_LOADER__() {
            var _this14 = this;

            // 通过 left + width 排序
            var uniqs = this.getSortGroups(function (a, b) {
                return b.box.left + b.box.boxWidth - (a.box.left + a.box.boxWidth);
            });
            var maxleft = 0;
            (0, _mobx.transaction)(function () {
                uniqs.forEach(function (elem, index) {
                    if (index === 0) {
                        maxleft = elem.box.left + elem.box.boxWidth;
                    } else {
                        elem.layer.style.left = maxleft - elem.box.boxWidth / 2 - elem.box.width / 2;
                    }
                });
                _this14.props.app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__alignTop__REACT_HOT_LOADER__',


        // 下对齐
        value: function __alignTop__REACT_HOT_LOADER__() {
            var _this15 = this;

            var uniqs = this.getSortGroups(function (a, b) {
                return a.box.top - b.box.top;
            });
            var mintop = 0;
            (0, _mobx.transaction)(function () {
                uniqs.forEach(function (elem, index) {
                    if (index === 0) {
                        mintop = elem.box.top;
                    } else {
                        elem.layer.style.top = mintop + elem.box.boxHeight / 2 - elem.box.height / 2;
                    }
                });
                _this15.props.app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__alignDown__REACT_HOT_LOADER__',


        // 水平居中
        value: function __alignDown__REACT_HOT_LOADER__() {
            var _this16 = this;

            // 通过 top + height 排序
            var uniqs = this.getSortGroups(function (a, b) {
                return b.box.top + b.box.boxHeight - (a.box.top + a.box.boxHeight);
            });
            var maxtop = 0;
            (0, _mobx.transaction)(function () {
                uniqs.forEach(function (elem, index) {
                    if (index === 0) {
                        maxtop = elem.box.top + elem.box.boxHeight;
                    } else {
                        elem.layer.style.top = maxtop - elem.box.boxHeight / 2 - elem.box.height / 2;
                    }
                });
                _this16.props.app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__horizontalCenter__REACT_HOT_LOADER__',

        // 垂直居中
        value: function __horizontalCenter__REACT_HOT_LOADER__() {
            var _this17 = this;

            var uniqs = this.getSortGroups(function (a, b) {
                return a.box.left - b.box.left;
            });
            // 找到第一个dom。然后根据第一个dom进行定位
            (0, _mobx.transaction)(function () {
                var lineTop = 0; // 中线的top
                uniqs.forEach(function (elem, index) {
                    var _elem$layer$style = elem.layer.style,
                        top = _elem$layer$style.top,
                        height = _elem$layer$style.height;

                    if (index === 0) {
                        lineTop = top + height / 2;
                    } else {
                        elem.layer.style.top = lineTop - height / 2;
                    }
                });
                _this17.props.app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__verticalCenter__REACT_HOT_LOADER__',

        // 垂直均分
        value: function __verticalCenter__REACT_HOT_LOADER__() {
            var _this18 = this;

            var uniqs = this.getSortGroups(function (a, b) {
                return a.layer.style.top - b.layer.style.top;
            });
            // 找到第一个dom。然后根据第一个dom进行定位
            (0, _mobx.transaction)(function () {
                var lineLeft = 0; // 中线的left
                uniqs.forEach(function (elem, index) {
                    var _elem$layer$style2 = elem.layer.style,
                        left = _elem$layer$style2.left,
                        width = _elem$layer$style2.width;

                    if (index === 0) {
                        lineLeft = left + width / 2;
                    } else {
                        elem.layer.style.left = lineLeft - width / 2;
                    }
                });
                _this18.props.app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__verticalSplit__REACT_HOT_LOADER__',

        // 水平均分
        value: function __verticalSplit__REACT_HOT_LOADER__() {
            var _this19 = this;

            var uniqs = this.getSortGroups(function (a, b) {
                return a.layer.style.top - b.layer.style.top;
            });
            // 求出间隔多少
            var lastUniq = uniqs[uniqs.length - 1];
            // 总间距
            var totalMargin = lastUniq.layer.style.top + lastUniq.layer.style.height - uniqs[0].layer.style.top;
            // 总宽度
            var totalHeight = 0;
            uniqs.forEach(function (elem) {
                totalHeight += elem.layer.style.height;
            });
            var eachMargin = (totalMargin - totalHeight) / (uniqs.length - 1);
            (0, _mobx.transaction)(function () {
                uniqs.forEach(function (elem, index) {
                    if (index !== 0) {
                        var prevUniq = uniqs[index - 1];
                        elem.layer.style.top = prevUniq.layer.style.top + prevUniq.layer.style.height + eachMargin;
                    }
                });
                _this19.props.app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__horizontalSplit__REACT_HOT_LOADER__',


        // 随机分布
        value: function __horizontalSplit__REACT_HOT_LOADER__() {
            var _this20 = this;

            var uniqs = this.getSortGroups(function (a, b) {
                return a.layer.style.left - b.layer.style.left;
            });
            // 求出间隔多少
            var lastUniq = uniqs[uniqs.length - 1];
            // 总间距
            var totalMargin = lastUniq.layer.style.left + lastUniq.layer.style.width - uniqs[0].layer.style.left;
            // 总宽度
            var totalWidth = 0;
            uniqs.forEach(function (elem) {
                totalWidth += elem.layer.style.width;
            });
            var eachMargin = (totalMargin - totalWidth) / (uniqs.length - 1);
            (0, _mobx.transaction)(function () {
                uniqs.forEach(function (elem, index) {
                    if (index !== 0) {
                        var prevUniq = uniqs[index - 1];
                        elem.layer.style.left = prevUniq.layer.style.left + prevUniq.layer.style.width + eachMargin;
                    }
                });
                _this20.props.app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__randomDistrib__REACT_HOT_LOADER__',


        // 随机大小
        value: function __randomDistrib__REACT_HOT_LOADER__() {
            var _this21 = this;

            var uniqs = this.getSortGroups();
            var getPage = this.props.app.getPage;

            var page = getPage();
            (0, _mobx.transaction)(function () {
                uniqs.forEach(function (elem) {
                    elem.layer.style.left = (0, _util.randomNum)(-20, 340 - elem.layer.style.width);
                    elem.layer.style.top = (0, _util.randomNum)(-20, 20 + page.style.height - elem.layer.style.height);
                });
                _this21.props.app.edata.keys++;
            });
        }
    }, {
        key: '__randomSize__REACT_HOT_LOADER__',
        value: function __randomSize__REACT_HOT_LOADER__() {
            var _this22 = this;

            var uniqs = this.getSortGroups();
            (0, _mobx.transaction)(function () {
                uniqs.forEach(function (elem) {
                    var oldHeight = elem.layer.style.height;
                    var oldWidth = elem.layer.style.width;
                    elem.layer.style.height = (0, _util.randomNum)(10, 40);
                    elem.layer.style.width = elem.layer.style.height * (oldWidth / oldHeight);
                });
                _this22.props.app.edata.keys++;
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this23 = this;

            $(document).on('h5ds.shortcuts_y', function (e, num) {
                var uniqs = _this23.getSortGroups();
                (0, _mobx.transaction)(function () {
                    uniqs.forEach(function (elem) {
                        elem.layer.style.top += num;
                    });
                    $(document).trigger('h5ds.setHistory');
                });
            });

            $(document).on('h5ds.shortcuts_x', function (e, num) {
                var uniqs = _this23.getSortGroups();
                (0, _mobx.transaction)(function () {
                    uniqs.forEach(function (elem) {
                        elem.layer.style.left += num;
                    });
                    $(document).trigger('h5ds.setHistory');
                });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $(document).off('h5ds.shortcuts_y');
            $(document).off('h5ds.shortcuts_x');
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'setlayer setlayer-group' },
                _react2.default.createElement(
                    'div',
                    { className: 'setname' },
                    '\u5F53\u524D\u9009\u4E2D\uFF1A',
                    _react2.default.createElement(
                        'span',
                        null,
                        ' \u591A\u4E2A\u56FE\u5C42'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'tabsbox' },
                    _react2.default.createElement(
                        'div',
                        { className: 'h5ds-tab h5ds-tab-style2' },
                        _react2.default.createElement(
                            'div',
                            { className: 'h5ds-tab-header' },
                            _react2.default.createElement(
                                'ul',
                                null,
                                _react2.default.createElement(
                                    'li',
                                    { className: 'h5ds-tab-head h5ds-active' },
                                    '\u7EC4\u5408\u8BBE\u7F6E'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'h5ds-tab-body' },
                            _react2.default.createElement(
                                'div',
                                { className: 'setlayer-group-box h5ds-tab-box h5ds-active' },
                                _react2.default.createElement(
                                    'ul',
                                    null,
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.alignLeft },
                                        _react2.default.createElement('i', { className: 'h5ds ico5-duiqi' }),
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u5DE6\u5BF9\u9F50'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.alignRight },
                                        _react2.default.createElement('i', { className: 'h5ds ico5-duiqi_youduiqi' }),
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u53F3\u5BF9\u9F50'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.alignTop },
                                        _react2.default.createElement('i', { className: 'h5ds ico5-duiqi_xiangxia' }),
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u4E0A\u5BF9\u9F50'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.alignDown },
                                        _react2.default.createElement('i', { className: 'h5ds ico5-duiqi_xiangshang' }),
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u4E0B\u5BF9\u9F50'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.horizontalCenter },
                                        _react2.default.createElement('i', { className: 'h5ds ico5-duiqi_hengxiangjuzhong' }),
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u6C34\u5E73\u5C45\u4E2D'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.verticalCenter },
                                        _react2.default.createElement('i', { className: 'h5ds ico5-duiqi_juzhong' }),
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u5782\u76F4\u5C45\u4E2D'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.verticalSplit },
                                        _react2.default.createElement('i', { className: 'h5ds ico5-meun' }),
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u5782\u76F4\u5747\u5206'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.horizontalSplit },
                                        _react2.default.createElement('i', { className: 'h5ds ico5-caidan1' }),
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u6C34\u5E73\u5747\u5206'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.randomDistrib },
                                        _react2.default.createElement('i', { className: 'h5ds ico5-ttpodicon' }),
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u968F\u673A\u5206\u5E03'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { onClick: this.randomSize },
                                        _react2.default.createElement('i', { className: 'h5ds ico5-fenbushinengyuan' }),
                                        ' ',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u968F\u673A\u5927\u5C0F'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return LayerSetAlign;
}(_react.Component)) || _class) || _class);
exports.default = LayerSetAlign;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(LayerSetAlign, 'LayerSetAlign', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/layerSetGroup/LayerSetAlign.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 164 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _slider = __webpack_require__(24);

var _slider2 = _interopRequireDefault(_slider);

var _switch = __webpack_require__(40);

var _switch2 = _interopRequireDefault(_switch);

var _defineProperty2 = __webpack_require__(14);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(25);

__webpack_require__(42);

__webpack_require__(166);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobx = __webpack_require__(7);

var _mobxReact = __webpack_require__(6);

var _BackGround = __webpack_require__(44);

var _BackGround2 = _interopRequireDefault(_BackGround);

var _InputMt = __webpack_require__(20);

var _InputMt2 = _interopRequireDefault(_InputMt);

var _common = __webpack_require__(69);

var _debounce = __webpack_require__(51);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageSet = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(PageSet, _Component);

    function PageSet(props) {
        (0, _classCallCheck3.default)(this, PageSet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PageSet.__proto__ || (0, _getPrototypeOf2.default)(PageSet)).call(this, props));

        _this.switchDo = function () {
            return _this.__switchDo__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.filterValue = function () {
            return _this.__filterValue__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.renderPhone = (0, _debounce.debounce)(1000, function () {
            console.log('>>>>>>>>>>>>更新视图');
            _this.props.app.edata.keys++;
            $(document).trigger('h5ds.setHistory');
        });

        _this.backGroundChange = function () {
            return _this.__backGroundChange__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {
            bgKey: +new Date()
        };
        return _this;
    }

    (0, _createClass3.default)(PageSet, [{
        key: '__switchDo__REACT_HOT_LOADER__',


        // 格式化value
        value: function __switchDo__REACT_HOT_LOADER__(val, type) {
            var page = this.props.app.getPage();
            page.slider[type] = val;
            $(document).trigger('h5ds.setHistory');
        }
    }, {
        key: '__filterValue__REACT_HOT_LOADER__',


        // renderdo
        value: function __filterValue__REACT_HOT_LOADER__(e) {
            var val = e.target.value;
            if (val) {
                val = val.replace(/[a-z]/g, '');
            } else {
                val = 0;
            }
            return parseFloat(val);
        }

        // 背景 change

    }, {
        key: '__backGroundChange__REACT_HOT_LOADER__',
        value: function __backGroundChange__REACT_HOT_LOADER__(obj) {
            var _this2 = this;

            var getPage = this.props.app.getPage;

            var page = getPage();
            (0, _mobx.transaction)(function () {
                for (var key in obj) {
                    if (page.style[key] === undefined) {
                        (0, _mobx.extendObservable)(page.style, (0, _defineProperty3.default)({}, key, obj[key]));
                    } else {
                        page.style[key] = obj[key];
                    }
                }
                _this2.renderPhone();
                // edata.keys++;
                // $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            $(document).on('h5ds.changePageBg', function (e) {
                _this3.setState({
                    bgKey: +new Date()
                });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $(document).off('h5ds.changePageBg');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props$app$edata = this.props.app.edata,
                setType = _props$app$edata.setType,
                selectPage = _props$app$edata.selectPage,
                selectType = _props$app$edata.selectType,
                selectPopup = _props$app$edata.selectPopup,
                selectFixed = _props$app$edata.selectFixed;

            var page = this.props.app.getPage();

            // console.log('选择page', selectType, selectPage, selectPopup, selectFixed);

            if (page) {
                var _ref = page.slider || {},
                    lock = _ref.lock,
                    autoplay = _ref.autoplay,
                    time = _ref.time;

                return _react2.default.createElement(
                    'div',
                    { className: 'setlayer', key: selectPage },
                    _react2.default.createElement(
                        'div',
                        { className: 'setname' },
                        '\u5F53\u524D\u9009\u4E2D\uFF1A',
                        (0, _common.setTypeCN)(setType)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'tabsbox' },
                        _react2.default.createElement(
                            'div',
                            { className: 'h5ds-tab h5ds-tab-style2' },
                            _react2.default.createElement(
                                'div',
                                { className: 'h5ds-tab-header' },
                                _react2.default.createElement(
                                    'ul',
                                    null,
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'h5ds-tab-head h5ds-active' },
                                        '\u6837\u5F0F'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'h5ds-tab-body' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'h5ds-tab-box h5ds-active' },
                                    _react2.default.createElement(_BackGround2.default, {
                                        key: this.state.bgKey,
                                        onChange: this.backGroundChange,
                                        dataStyle: page.style,
                                        actionType: 'pagebg'
                                    }),
                                    page.slider ? _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'tr' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'name' },
                                                '\u9501\u5B9A\u7FFB\u9875:'
                                            ),
                                            _react2.default.createElement(_switch2.default, {
                                                onChange: function onChange(e) {
                                                    return _this4.switchDo(e, 'lock');
                                                },
                                                checked: lock ? true : false
                                            }),
                                            _react2.default.createElement('i', {
                                                title: '\u5F00\u542F\u540E\uFF0C\u6ED1\u52A8\u9875\u9762\u4E0D\u80FD\u89E6\u53D1\u7FFB\u9875\u6548\u679C\uFF01',
                                                className: 'h5ds ico5-bangzhu'
                                            })
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'tr' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'name' },
                                                '\u81EA\u52A8\u7FFB\u9875:'
                                            ),
                                            _react2.default.createElement(_switch2.default, {
                                                onChange: function onChange(e) {
                                                    return _this4.switchDo(e, 'autoplay');
                                                },
                                                checked: autoplay ? true : false
                                            }),
                                            _react2.default.createElement('i', { title: '\u5F00\u542F\u540E\uFF0C\u9875\u9762\u4F1A\u81EA\u52A8\u64AD\u653E\uFF01', className: 'h5ds ico5-bangzhu' })
                                        ),
                                        autoplay ? _react2.default.createElement(
                                            'div',
                                            { className: 'tr show' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'name' },
                                                '\u7FFB\u9875\u65F6\u95F4:'
                                            ),
                                            _react2.default.createElement(_slider2.default, {
                                                style: { width: 150 },
                                                onChange: function onChange(e) {
                                                    _this4.switchDo(e, 'time');
                                                },
                                                tipFormatter: null,
                                                step: 1,
                                                min: 0,
                                                max: 100,
                                                value: time
                                            }),
                                            _react2.default.createElement(_InputMt2.default, {
                                                onChange: function onChange(e) {
                                                    _this4.switchDo(_this4.filterValue(e), 'time');
                                                },
                                                wheel: true,
                                                min: 0,
                                                max: 100,
                                                value: time
                                            }),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'end' },
                                                '\u79D2'
                                            )
                                        ) : null
                                    ) : null
                                )
                            )
                        )
                    )
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: 'setlayer' },
                    _react2.default.createElement(
                        'div',
                        { className: 'setname' },
                        '\u5F53\u524D\u9009\u4E2D\uFF1A',
                        (0, _common.setTypeCN)(setType)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'tabsbox' },
                        '\u672A\u9009\u4E2D\u4EFB\u4F55\u9875\u9762'
                    )
                );
            }
        }
    }]);
    return PageSet;
}(_react.Component)) || _class) || _class);
exports.default = PageSet;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(PageSet, 'PageSet', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/components/setting/pageSet/PageSet.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 166 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.etext = exports.setEtextHTML = undefined;

var _layer = __webpack_require__(168);

var _EtextEditor = __webpack_require__(169);

var _EtextEditor2 = _interopRequireDefault(_EtextEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _EtextEditor2.default;
exports.default = _default;
exports.setEtextHTML = _layer.setEtextHTML;
exports.etext = _layer.etext;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/etext/index.js');
}();

;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.etext = undefined;

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

exports.setEtextHTML = setEtextHTML;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 设置 dom
function setEtextHTML(layer) {
    return _react2.default.createElement("div", { className: "layer-etext-inner", style: (0, _extends3.default)({}, layer.data.style), dangerouslySetInnerHTML: { __html: layer.data.data } });
}

// 原始数据
var etext = exports.etext = {
    "id": null,
    "animate": [],
    "data": {
        "style": {
            fontSize: '14px',
            color: '#000',
            textAlign: 'left'
        },
        "data": "<div>\u8BF7\u8F93\u5165\u6587\u672C\u5185\u5BB9</div>"
    },
    "estyle": {},
    "style": {
        "width": 200,
        "height": 30,
        "top": 10,
        "left": 10
    },
    "type": "etext",
    "color": "",
    "ue": {}
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setEtextHTML, "setEtextHTML", "C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/etext/layer.jsx");

    __REACT_HOT_LOADER__.register(etext, "etext", "C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/etext/layer.jsx");
}();

;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

__webpack_require__(170);

__webpack_require__(171);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _FontEdit = __webpack_require__(172);

var _FontEdit2 = _interopRequireDefault(_FontEdit);

var _FontSet = __webpack_require__(70);

var _FontSet2 = _interopRequireDefault(_FontSet);

var _SetColor = __webpack_require__(45);

var _SetColor2 = _interopRequireDefault(_SetColor);

var _mobx = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { base64ToUrl } from '@/utils/imgURLClear';

/**
 * @desc esay text 简称 etext 简单的文本
 */
var EtextEditor = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(EtextEditor, _Component);

    function EtextEditor(props) {
        (0, _classCallCheck3.default)(this, EtextEditor);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EtextEditor.__proto__ || (0, _getPrototypeOf2.default)(EtextEditor)).call(this, props));

        _this.changeColor = function () {
            return _this.__changeColor__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        return _this;
    }

    // 变化颜色


    (0, _createClass3.default)(EtextEditor, [{
        key: '__changeColor__REACT_HOT_LOADER__',
        value: function __changeColor__REACT_HOT_LOADER__(obj) {
            var _this2 = this;

            (0, _mobx.transaction)(function () {
                _this2.props.layer.estyle.backgroundColor = obj.color;
                _this2.props.app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                layer = _props.layer,
                app = _props.app;

            return _react2.default.createElement(
                'div',
                { className: 'ex-set' },
                _react2.default.createElement(
                    'div',
                    { className: 'layerset-etext' },
                    _react2.default.createElement(_FontSet2.default, { layer: layer, edata: app.edata }),
                    _react2.default.createElement(_FontEdit2.default, { hideExtend: this.hideExtend, layer: layer }),
                    _react2.default.createElement(_SetColor2.default, { onChange: this.changeColor, color: layer.estyle.backgroundColor })
                )
            );
        }
    }]);
    return EtextEditor;
}(_react.Component)) || _class) || _class);
exports.default = EtextEditor;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(EtextEditor, 'EtextEditor', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/etext/EtextEditor.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 170 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 171 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _reactContenteditable = __webpack_require__(173);

var _reactContenteditable2 = _interopRequireDefault(_reactContenteditable);

var _FontSet = __webpack_require__(70);

var _FontSet2 = _interopRequireDefault(_FontSet);

var _reactDom = __webpack_require__(181);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mobx = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { setFocus } from './utils';
var FontEdit = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(FontEdit, _Component);

    function FontEdit() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, FontEdit);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FontEdit.__proto__ || (0, _getPrototypeOf2.default)(FontEdit)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            keys: 1
        }, _this.htmlToI = function () {
            var _this2;

            return (_this2 = _this).__htmlToI__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.handleChange = function () {
            var _this3;

            return (_this3 = _this).__handleChange__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _this.intEditor = function () {
            var _this4;

            return (_this4 = _this).__intEditor__REACT_HOT_LOADER__.apply(_this4, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    // 文字加上i标签


    (0, _createClass3.default)(FontEdit, [{
        key: '__htmlToI__REACT_HOT_LOADER__',
        value: function __htmlToI__REACT_HOT_LOADER__(str) {
            str = str.replace(/<i>|<\/i>/g, '');
            var shtml = '';
            if (str[0] === '<') {
                var p = str.split('<div>')[0];
                p.split('').map(function (chart) {
                    shtml += '<i>' + chart + '</i>';
                });
            }

            // 匹配
            var divArr = str.match(/<div>(.+?)<\/div>/g) || [];
            divArr.forEach(function (str) {
                var p = str.replace(/<div>(.+?)<\/div>/, '$1');
                shtml += '<div>';
                p.split('').map(function (chart) {
                    shtml += '<i>' + chart + '</i>';
                });
                shtml += '</div>';
            });
            return shtml;
        }
    }, {
        key: '__handleChange__REACT_HOT_LOADER__',
        value: function __handleChange__REACT_HOT_LOADER__(e) {
            var _this5 = this;

            // console.log(e.target.value);
            (0, _mobx.transaction)(function () {
                // let hei = $('.layerset-etext .font-layer').height();
                // this.props.layer.style.height = hei + 30;
                _this5.props.layer.data.data = e.target.value;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: '__intEditor__REACT_HOT_LOADER__',
        value: function __intEditor__REACT_HOT_LOADER__() {
            var _this6 = this;

            var _props = this.props,
                app = _props.app,
                layer = _props.layer;

            this.$layer = app.getLayerDom();
            if (this.$layer && !this.$layer.find('.temporary-editor')[0]) {
                this.$layer.find('.element').hide();
                this.$layer.append('<div class="temporary-editor"></div>');
                this.div = $('.temporary-editor')[0];
                _reactDom2.default.render(_react2.default.createElement(
                    'div',
                    { className: 'fontbox' },
                    _react2.default.createElement(_FontSet2.default, { layer: layer, edata: app.edata }),
                    _react2.default.createElement(
                        'div',
                        { className: 'fontedit' },
                        _react2.default.createElement(
                            'div',
                            { className: 'fontbox', style: (0, _extends3.default)({}, layer.data.style) },
                            _react2.default.createElement(_reactContenteditable2.default, {
                                id: 'temporaryEditor',
                                className: 'font-layer',
                                html: layer.data.data // innerHTML of the editable div
                            })
                        )
                    )
                ), this.div);

                $('#temporaryEditor').on('input', function () {
                    _this6.handleChange({
                        target: { value: $('#temporaryEditor').html() }
                    });
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this7 = this;

            $('.font-layer').focus();

            // 双击文本框，可编辑
            $('#phone').on('dblclick.etexteditor', '.h5ds-control', function (e) {
                _this7.intEditor();
            });

            $('.layerset-etext').on('mousedown', function (e) {
                // 销毁 xx
                _this7.div && _this7.div.remove();
                _this7.div && _reactDom2.default.unmountComponentAtNode(_this7.div);
                if (_this7.$layer) {
                    _this7.$layer.find('.element').show();
                    _this7.$layer = null;
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $('#phone').off('dblclick.etexteditor');
            $('#temporaryEditor').off('input');
            if (this.$layer) {
                this.$layer.find('.element').show();
                this.$layer = null;
            }
            $('.layerset-etext').off('mousedown');
            this.div && this.div.remove();
            this.div && _reactDom2.default.unmountComponentAtNode(this.div);
        }
    }, {
        key: 'render',
        value: function render() {
            var layer = this.props.layer;

            this.props.app.edata.keys;
            return _react2.default.createElement(
                'div',
                { className: 'fontedit' },
                _react2.default.createElement(
                    'div',
                    { className: 'fontbox', style: (0, _extends3.default)({}, layer.data.style) },
                    _react2.default.createElement(_reactContenteditable2.default, {
                        className: 'font-layer',
                        html: layer.data.data // innerHTML of the editable div
                        , onChange: this.handleChange // handle innerHTML change
                    })
                )
            );
        }
    }]);
    return FontEdit;
}(_react.Component)) || _class) || _class);
exports.default = FontEdit;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(FontEdit, 'FontEdit', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/etext/FontEdit.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 173 */
/***/ (function(module, exports) {

module.exports = require("react-contenteditable");

/***/ }),
/* 174 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/select");

/***/ }),
/* 175 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/select/style");

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _popover = __webpack_require__(55);

var _popover2 = _interopRequireDefault(_popover);

var _inputNumber = __webpack_require__(177);

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _slider = __webpack_require__(24);

var _slider2 = _interopRequireDefault(_slider);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(56);

__webpack_require__(178);

__webpack_require__(25);

__webpack_require__(179);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoverInput = function (_Component) {
    (0, _inherits3.default)(PopoverInput, _Component);

    function PopoverInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, PopoverInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PopoverInput.__proto__ || (0, _getPrototypeOf2.default)(PopoverInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            keys: 1
        }, _this.onChange = function () {
            var _this2;

            return (_this2 = _this).__onChange__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(PopoverInput, [{
        key: '__onChange__REACT_HOT_LOADER__',
        value: function __onChange__REACT_HOT_LOADER__(val) {
            this.props.onChange(val);
            var keys = this.state.keys;
            keys++;
            this.setState({ keys: keys });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                value = _props.value,
                title = _props.title,
                min = _props.min,
                max = _props.max;

            this.state.keys;
            var content = _react2.default.createElement(
                'div',
                { className: 'mt-popover-input' },
                _react2.default.createElement(
                    'div',
                    { className: 'title' },
                    title || '标题'
                ),
                _react2.default.createElement(_slider2.default, { tipFormatter: null, min: min || 0, max: max || 100, value: value, onChange: this.onChange }),
                _react2.default.createElement(_inputNumber2.default, { onChange: this.onChange, min: min || 0, max: max || 100, value: value })
            );
            return _react2.default.createElement(
                _popover2.default,
                { content: content, title: null, trigger: 'click' },
                children
            );
        }
    }]);
    return PopoverInput;
}(_react.Component);

exports.default = PopoverInput;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(PopoverInput, 'PopoverInput', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/common/popoverinput/PopoverInput.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/input-number");

/***/ }),
/* 178 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/input-number/style");

/***/ }),
/* 179 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var fonturl = exports.fonturl = {
    wawa: '/assets/images/wawa.ttf',
    dd: '/assets/images/dd.otf'
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(fonturl, 'fonturl', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/etext/fonturl.js');
}();

;

/***/ }),
/* 181 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.img = exports.setImgHTML = undefined;

var _layer = __webpack_require__(183);

var _ImgEditor = __webpack_require__(184);

var _ImgEditor2 = _interopRequireDefault(_ImgEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _ImgEditor2.default;
exports.default = _default;
exports.setImgHTML = _layer.setImgHTML;
exports.img = _layer.img;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/img/index.js');
}();

;

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.img = undefined;
exports.setImgHTML = setImgHTML;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 设置 dom
function setImgHTML(layer, zIndex) {
    return _react2.default.createElement('img', { src: layer.data.src || 'http://cdn.h5ds.com/lib/images/imgDom.jpg' });
}

// 原始数据
var img = exports.img = {
    id: null,
    animate: [],
    data: { src: 'http://cdn.h5ds.com/lib/images/imgDom.jpg' },
    estyle: {},
    style: {
        width: 200,
        height: 150,
        top: 10,
        left: 10
    },
    type: 'img',
    color: 'none',
    ue: {}
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setImgHTML, 'setImgHTML', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/img/layer.jsx');

    __REACT_HOT_LOADER__.register(img, 'img', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/img/layer.jsx');
}();

;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class; // indexedDB

__webpack_require__(185);

var _indexedDB = __webpack_require__(15);

var db = _interopRequireWildcard(_indexedDB);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(6);

var _SetColor = __webpack_require__(45);

var _SetColor2 = _interopRequireDefault(_SetColor);

var _imgURLClear = __webpack_require__(47);

var _mobx = __webpack_require__(7);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc 图片
 */
var ImgEditor = (_dec = (0, _mobxReact.inject)(['app']), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(ImgEditor, _Component);

    function ImgEditor(props) {
        (0, _classCallCheck3.default)(this, ImgEditor);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ImgEditor.__proto__ || (0, _getPrototypeOf2.default)(ImgEditor)).call(this, props));

        _this.cropImg = function () {
            return _this.__cropImg__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.showSourceImgs = function () {
            return _this.__showSourceImgs__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.changeColor = function () {
            return _this.__changeColor__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {};
        _this.cropName = 'imgcrop';
        _this.oldsrc = _this.props.layer.data.src;
        return _this;
    }

    // 裁剪图片


    (0, _createClass3.default)(ImgEditor, [{
        key: '__cropImg__REACT_HOT_LOADER__',


        // 显示图片列表
        value: function __cropImg__REACT_HOT_LOADER__() {
            var _this2 = this;

            var layer = this.props.layer;

            this.$crop = $('#imgCrop');

            if (layer.data.src) {
                // 实例化裁剪
                this.crop = this.$crop.crop({
                    name: this.cropName
                });
                // 绑定剪切事件
                this.$crop.on('crop.' + this.cropName, function (e, data) {
                    console.log('xxx', data);
                    // 还原图片
                    if (typeof data === 'string') {
                        layer.data.src = data;
                        $(document).trigger('h5ds.setHistory');
                        // callback('reset');
                    } else {
                        // 图片上传
                        var temp = +new Date();
                        var imgURL = (0, _imgURLClear.base64ToUrl)(data.imgData, temp);
                        // 存储图片到本地，提交的时候，再统一上传到服务器
                        db.addData('img', [{
                            id: temp,
                            value: data.imgData
                        }], function () {
                            layer.data.src = imgURL;
                            $(document).trigger('h5ds.setHistory');
                        });
                    }
                });

                // 换图
                this.$crop.off('cropchange.' + this.cropName).on('cropchange.' + this.cropName, function (e) {
                    _this2.showSourceImgs();
                });

                // 清除背景图
                this.$crop.off('cropdel.' + this.cropName).on('cropdel.' + this.cropName, function (e) {
                    // 图片特殊处理, 这里只是清除图片。并没有删除图层
                    layer.data.src = '';
                    $(document).trigger('h5ds.setHistory');
                });
            }
        }
    }, {
        key: '__showSourceImgs__REACT_HOT_LOADER__',
        value: function __showSourceImgs__REACT_HOT_LOADER__(e) {
            $(document).trigger('h5ds.showImgSource', 'changeimg');
        }
    }, {
        key: '__changeColor__REACT_HOT_LOADER__',
        value: function __changeColor__REACT_HOT_LOADER__(obj) {
            var _props = this.props,
                layer = _props.layer,
                app = _props.app;

            (0, _mobx.transaction)(function () {
                layer.estyle.backgroundColor = obj.color;
                app.edata.keys++;
                $(document).trigger('h5ds.setHistory');
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            this.cropImg();
            // 双击换图，可编辑
            $('#phone').on('dblclick.imgeditor', '.h5ds-control', function (e) {
                _this3.showSourceImgs();
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.crop && this.crop.distory();
            this.$crop.off('cropdel.' + this.cropName);
            this.$crop.off('cropchange.' + this.cropName);
            this.$crop.off('crop.' + this.cropName);
            $('#phone').off('dblclick.imgeditor');
        }
    }, {
        key: 'render',
        value: function render() {
            var imgNullTpl = _react2.default.createElement(
                'div',
                { className: 'a-selectimg img-null', onClick: this.showSourceImgs },
                '\u9009\u62E9\u56FE\u7247'
            );
            var layer = this.props.layer;

            return _react2.default.createElement(
                'div',
                { className: 'set-img set_img' },
                _react2.default.createElement(
                    'div',
                    { id: 'imgCrop', 'data-src': layer.data.src || '', 'data-oldsrc': this.oldsrc, className: 'set_img_crop' },
                    layer.data.src ? null : imgNullTpl
                ),
                _react2.default.createElement(_SetColor2.default, { color: layer.style.backgroundColor || 'rgba(0,0,0,1)', onChange: this.changeColor })
            );
        }
    }]);
    return ImgEditor;
}(_react.Component)) || _class) || _class);
exports.default = ImgEditor;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(ImgEditor, 'ImgEditor', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/img/ImgEditor.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 185 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _stringify = __webpack_require__(13);

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = __webpack_require__(11);

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = __webpack_require__(52);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = __webpack_require__(18);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _set = __webpack_require__(67);

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = __webpack_require__(17);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = __webpack_require__(19);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(5);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;
// import { message } from 'antd';


__webpack_require__(187);

var _util = __webpack_require__(8);

var _mobx = __webpack_require__(7);

var _mobxReact = __webpack_require__(6);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _selectGroup = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc layer DOM 公用
 */
var Layer = (_dec = (0, _mobxReact.inject)('app', 'layerfun'), _dec(_class = (0, _mobxReact.observer)(_class = function (_Component) {
    (0, _inherits3.default)(Layer, _Component);

    function Layer() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Layer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Layer.__proto__ || (0, _getPrototypeOf2.default)(Layer)).call.apply(_ref, [this].concat(args))), _this), _this.control = function () {
            var _this2;

            return (_this2 = _this).__control__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
    // 初始化控制器


    (0, _createClass3.default)(Layer, [{
        key: '__control__REACT_HOT_LOADER__',
        value: function __control__REACT_HOT_LOADER__(index, e) {
            var _this3 = this;

            e.stopPropagation();
            e.preventDefault();
            if (!this.props.isPhoneView) {
                return;
            }

            var _props$app = this.props.app,
                edata = _props$app.edata,
                getPageDom = _props$app.getPageDom,
                getLayers = _props$app.getLayers;

            // 如果是点住ctrl 不放开。进入组的选择模式

            if (e.ctrlKey) {
                (0, _mobx.transaction)((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                    var $control;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!edata.selectGroup) {
                                        edata.selectGroup = [];
                                        $control = getPageDom().find('.h5ds-control');
                                        // 判断之前是否有选中一个

                                        if ($control[0]) {
                                            edata.selectGroup.push(edata.selectLayer);
                                        }
                                    }
                                    // 如果二次点击，取消选中
                                    if (edata.selectGroup.indexOf(index) === -1) {
                                        edata.selectGroup.push(index);
                                    } else {
                                        edata.selectGroup.splice(edata.selectGroup.findIndex(function (v) {
                                            return v === index;
                                        }), 1);
                                    }
                                    // 去重
                                    edata.selectGroup = [].concat((0, _toConsumableArray3.default)(new _set2.default(edata.selectGroup)));
                                    if (edata.selectGroup.length > 1) {
                                        edata.selectLayer = null;
                                        edata.setType = 'group';
                                    }
                                    _context.next = 6;
                                    return (0, _selectGroup.setStaticGroup)(getPageDom, edata.selectGroup);

                                case 6:
                                    _context.next = 8;
                                    return (0, _selectGroup.dragGroupEvent)(getLayers, edata);

                                case 8:
                                    edata.keys++;

                                case 9:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this3);
                })));
                return;
            }

            // 如果拖动是组，且，点击的有选择框 就不往后面走了
            if (edata.selectGroup && (0, _util.isNot)(edata.selectLayer) && $(e.currentTarget).find('.h5ds-control')[0]) {
                return;
            } else {
                edata.selectGroup = null;
            }

            // console.log('选择layer.....', index, edata.selectLayer);

            if (index !== edata.selectLayer) {
                this.props.app.setLayer(index);
                $(document).trigger('h5ds.iniControl');
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var layersSet = this.props.layerfun.layersSet;

            var layer = this.props.layer;
            var _props = this.props,
                isMinPage = _props.isMinPage,
                isPhoneView = _props.isPhoneView;

            var obj = layersSet[layer.type];
            if (obj && obj.willMount) {
                obj.willMount.bind(this)(layer, { isMinPage: isMinPage, isPhoneView: isPhoneView });
            }
        }

        // layer 渲染后执行

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var layersSet = this.props.layerfun.layersSet;

            var layer = this.props.layer;
            var _props2 = this.props,
                isMinPage = _props2.isMinPage,
                isPhoneView = _props2.isPhoneView;
            // 初始化layer 附带的方法

            var obj = layersSet[layer.type];
            if (obj && obj.didMount) {
                obj.didMount.bind(this)(this.layerRef, layer, { isMinPage: isMinPage, isPhoneView: isPhoneView });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var layersSet = this.props.layerfun.layersSet;

            var layer = this.props.layer;
            var _props3 = this.props,
                isMinPage = _props3.isMinPage,
                isPhoneView = _props3.isPhoneView;
            // 初始化layer 附带的方法

            var obj = layersSet[layer.type];
            if (obj && obj.willUnmount) {
                obj.willUnmount.bind(this)(this.layerRef, layer, { isMinPage: isMinPage, isPhoneView: isPhoneView });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props4 = this.props,
                layer = _props4.layer,
                zIndex = _props4.zIndex,
                children = _props4.children,
                isPhoneView = _props4.isPhoneView,
                isMinPage = _props4.isMinPage;

            var cName = ['layer'];
            var _layer$style = layer.style,
                abottom = _layer$style.abottom,
                atop = _layer$style.atop,
                aleft = _layer$style.aleft,
                aright = _layer$style.aright,
                other = (0, _objectWithoutProperties3.default)(_layer$style, ['abottom', 'atop', 'aleft', 'aright']);

            var style = (0, _extends3.default)({
                zIndex: zIndex
            }, other);
            cName.push('layer-' + layer.type);

            // 添加class
            if (layer.className) {
                cName.push(layer.className);
            }

            if (layer.set && layer.set.hide) {
                cName.push('layer-temporary-hide');
            }

            if (layer.set && layer.set.lock) {
                cName.push('layer-temporary-lock');
            }

            // 设置动画
            var animateArr = [];
            if (layer.animate && layer.animate.length > 0) {
                layer.animate.forEach(function (elem) {
                    animateArr.push(elem.style);
                });
            }
            // 设置其他 element 上面的样式
            var estyle = layer.estyle || {};

            // fps 图层需要单独处理
            var effectId = null;
            if (layer.type === 'fps') {
                effectId = 'fps_' + layer.data.id + (isPhoneView ? '_phoneview' : '') + (isMinPage ? '_min' : '');
            }
            return _react2.default.createElement(
                'div',
                {
                    'data-adsorbent': (0, _stringify2.default)({ abottom: abottom, atop: atop, aleft: aleft, aright: aright }),
                    id: isPhoneView ? null : layer.id,
                    'data-uefun': layer.ue ? (0, _stringify2.default)(layer.ue) : '',
                    onClick: function onClick(e) {
                        return _this4.control(9999 - zIndex, e);
                    },
                    className: cName.join(' '),
                    style: style
                },
                _react2.default.createElement(
                    'div',
                    {
                        ref: function ref(c) {
                            return _this4.layerRef = c;
                        },
                        className: 'element',
                        id: effectId,
                        style: (0, _extends3.default)({
                            WebkitAnimation: animateArr.join(','),
                            animation: animateArr.join(',')
                        }, estyle)
                    },
                    children
                )
            );
        }
    }]);
    return Layer;
}(_react.Component)) || _class) || _class);
exports.default = Layer;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Layer, 'Layer', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/layers/Layer.jsx');
}();

;
module.exports = exports['default'];

/***/ }),
/* 187 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// 模拟数据
var data = exports.data = {
    img: '/assets/images/app.png', // 主图
    desc: '点石H5，官方网站h5ds.com', // 描述
    name: '点石H5', // 标题名称
    loading: '1', // 加载动画
    set: {}, // 配置参数
    type: 'phone', // h5类型
    mp3: {
        // mp3
        name: ' 10000电音冲刺游戏',
        url: 'http://pic.ibaotu.com/00/23/30/17E888piCgGs.mp3'
    },
    slider: {
        // 翻页设置
        animate: 1, // 翻页动画
        lock: false, // 是否取消翻页
        autoplay: false, // 是否自动翻页
        time: 5 // 自动翻页时间
    },
    style: {
        // body的样式
        width: 320,
        height: 486
    },
    fixeds: [
    // 浮动层
    {
        id: null,
        name: '浮动层上',
        style: {
            height: 486
        },
        layers: [],
        index: 0
    }, {
        id: null,
        name: '浮动层下',
        style: {
            height: 486
        },
        layers: [],
        index: 1
    }],
    popups: [],
    pages: [{
        id: null,
        name: '空白页面',
        desc: '页面描述',
        style: { height: 486 },
        layers: [],
        animate: [],
        slider: {
            animate: 1,
            autoplay: false,
            lock: false,
            time: 5
        }
    }]
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(data, 'data', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/data.js');
}();

;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shortcuts = shortcuts;
// import {
//     message
// } from 'antd';

// 快捷按钮操作
function shortcuts() {
    $(document).on('keydown.shortcuts', function (ev) {
        // var ev = window.event || e;
        var code = ev.keyCode;
        // ctrl+s + code
        // console.log(code, ev.ctrlKey, ev.shiftKey);

        // 这里加个锁吧
        if ($(':focus').length !== 0) {
            // console.log('不监听');
            return;
        }

        if (ev.ctrlKey && [83, 90, 89, 189, 187, 80, 75, 71, 72, 67, 85, 86].indexOf(code) !== -1) {
            ev.preventDefault();
            ev.stopPropagation();
            switch (code) {
                case 83:
                    $(document).trigger('h5ds.shortcuts_save');
                    break; // ctrl+s 保存APP
                case 90:
                    $(document).trigger('h5ds.shortcuts_undo');
                    break; // ctrl+z 撤销
                case 89:
                    $(document).trigger('h5ds.shortcuts_redo');
                    break; // ctrl+y 恢复
                case 189:
                    $(document).trigger('h5ds.shortcuts_tomin');
                    break; // ctrl+ - 缩小画布
                case 187:
                    $(document).trigger('h5ds.shortcuts_tomax');
                    break; // ctrl+ + 放大画布
                case 80:
                    $(document).trigger('h5ds.shortcuts_play');
                    break; // ctrl+ p 播放动画
                case 71:
                    $(document).trigger('h5ds.shortcuts_combin');
                    break; // ctrl+ g 合并图层
                case 72:
                    $(document).trigger('h5ds.shortcuts_grid');
                    break; // ctrl+ h 显示网格
                case 85:
                    $(document).trigger('h5ds.shortcuts_uncombin');
                    break; // ctrl+ v 粘贴
                case 86:
                    $(document).trigger('h5ds.shortcuts_pastelayer');
                    break; // ctrl+ v 粘贴
                case 67:
                    $(document).trigger('h5ds.shortcuts_copylayer');
                    break; // ctrl+ c 复制
            }
        }

        // 删除
        if (code === 46) {
            ev.preventDefault();
            $(document).trigger('h5ds.shortcuts_dellayer');
        }

        // 上下左右切换
        if ([38, 40, 37, 39].indexOf(code) !== -1) {
            ev.preventDefault();
            ev.stopPropagation();

            var num = 1;
            if (ev.shiftKey) {
                num = 20;
            }

            switch (code) {
                case 38:
                    $(document).trigger('h5ds.shortcuts_y', -num);
                    break; // 上
                case 37:
                    $(document).trigger('h5ds.shortcuts_x', -num);
                    break; // 左
                case 39:
                    $(document).trigger('h5ds.shortcuts_x', num);
                    break; // 右
                case 40:
                    $(document).trigger('h5ds.shortcuts_y', num);
                    break; // 下
            }
        }
    });
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(shortcuts, 'shortcuts', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/tools/shortcuts.js');
}();

;

/***/ })
/******/ ]);
});