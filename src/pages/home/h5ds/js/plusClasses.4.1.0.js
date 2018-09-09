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
/******/ 	return __webpack_require__(__webpack_require__.s = 197);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(198);


/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.H5DSPlus = exports.H5DSComponent = undefined;

var _H5DSComponent = __webpack_require__(199);

var _H5DSComponent2 = _interopRequireDefault(_H5DSComponent);

var _H5DSPlus = __webpack_require__(200);

var _H5DSPlus2 = _interopRequireDefault(_H5DSPlus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.H5DSComponent = _H5DSComponent2.default;
exports.H5DSPlus = _H5DSPlus2.default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc 插件库必须继承该方法、做一些强制性的约束
 */
var H5DSComponent = function () {
    function H5DSComponent(props) {
        (0, _classCallCheck3.default)(this, H5DSComponent);

        this.props = props || {};
        this.target = props.target;
        if (this.willUnmount) {
            this.willUnmount = this.willUnmount.bind(this);
        }
        if (this.willMount) {
            this.willMount = this.willMount.bind(this);
            this.willMount();
        }
        if (this.didMount) {
            this.didMount = this.didMount.bind(this);
            this.didMount();
        }
        // just do one
        if (this.oneDidMount) {
            var lock = $(this.target).data('componet-lock');
            this.oneDidMount = this.oneDidMount.bind(this);
            if (!lock) {
                $(this.target).data('componet-lock', true);
                this.oneDidMount();
            }
        }
    }

    // 销毁插件


    (0, _createClass3.default)(H5DSComponent, [{
        key: 'destroy',
        value: function destroy() {
            this.willUnmount && this.willUnmount();
            this.type = null;
            this.target = null;
            this.didMount = null;
            this.willMount = null;
            this.willUnmount = null;
        }
    }]);
    return H5DSComponent;
}();

exports.default = H5DSComponent;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(H5DSComponent, 'H5DSComponent', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/plusClasses/H5DSComponent.js');
}();

;
module.exports = exports['default'];

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc 载入插件的方法
 */
var H5DSPlus = function () {
    function H5DSPlus(plus) {
        (0, _classCallCheck3.default)(this, H5DSPlus);

        this.plus = this.addPlus(plus || []);
        // 开始执行插件方法
        this.eventInit = this.eventInit.bind(this);

        this.eventInit();
        // 存放实例
        this.plusInstance = {}; // 为了不乱销毁。这里的格式为 [key]: [instance]
    }

    // 装载插件


    (0, _createClass3.default)(H5DSPlus, [{
        key: 'addPlus',
        value: function addPlus(plus) {
            var data = {};
            plus.forEach(function (d) {
                if (!d.type) {
                    console.error('方法类必须指定type，eg：static type = "dom"; 错误类：', d.name, { error: d });
                    return;
                }
                data[d.type] = d;
            });
            return data;
        }

        // 生成一个不重复的id

    }, {
        key: 'getRandomID',
        value: function getRandomID() {
            var randomLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

            return 'keyId_' + Number(Math.random().toString().substr(3, randomLength || 8) + Date.now()).toString(36);
        }

        // 从class里面获取到 type

    }, {
        key: 'getType',
        value: function getType(cls) {
            return cls.replace(/layer\slayer-(\S+).*/g, '$1');
        }

        // 销毁实例，释放内存

    }, {
        key: 'destroyInstance',
        value: function destroyInstance($target) {
            if ($target && $target[0] && $target.data('keyId')) {
                var keyId = $target.data('keyId');
                // console.log('销毁实例，释放内存', this.plusInstance, keyId);
                if (this.plusInstance[keyId]) {
                    this.plusInstance[keyId].forEach(function (d) {
                        d.destroy();
                        d = null;
                    });
                    delete this.plusInstance[keyId];
                }
                $target.removeData('keyId');
            }
        }

        // 初始化实例

    }, {
        key: 'initInstance',
        value: function initInstance($target) {
            var _this = this;

            if ($target && $target[0]) {
                var keyId = this.getRandomID();
                $target.data('keyId', keyId);
                $target.find('.layer').each(function (index, target) {
                    // 当前的type
                    var type = _this.getType($(target).attr('class'));
                    if (_this.plus[type]) {
                        var Plus = _this.plus[type];
                        if (!_this.plusInstance[keyId]) {
                            _this.plusInstance[keyId] = [];
                        }
                        _this.plusInstance[keyId].push(new Plus({ target: target, type: type }));
                        // console.log('初始化实例', this.plusInstance);
                    }
                });
            }
        }

        // 初始化方法

    }, {
        key: 'eventInit',
        value: function eventInit() {
            var _this2 = this;

            // 页面进入之后执行
            $(document).off('h5ds.swiperAfter h5ds.swiperBefore').on('h5ds.swiperAfter', function (e, data) {
                var $in = data.$in,
                    $out = data.$out;
                // 离开的页面，销毁实例

                _this2.destroyInstance.bind(_this2)($out);
                // 进入的页面
                _this2.initInstance.bind(_this2)($in);
            });
        }
    }]);
    return H5DSPlus;
}();

exports.default = H5DSPlus;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(H5DSPlus, 'H5DSPlus', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/plusClasses/H5DSPlus.js');
}();

;
module.exports = exports['default'];

/***/ })

/******/ });
});