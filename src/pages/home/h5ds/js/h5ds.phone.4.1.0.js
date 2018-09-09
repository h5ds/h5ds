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
/******/ 	return __webpack_require__(__webpack_require__.s = 193);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @desc 其他参数配置。可能是跨平台，跨版本的参数配置
 */

var blankImg = exports.blankImg = ''; // 默认替代图片

var version = exports.version = '4.1.0'; // 版本号

var appHeight = exports.appHeight = 514;
var appWidth = exports.appWidth = 320;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(blankImg, 'blankImg', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/global.js');

  __REACT_HOT_LOADER__.register(version, 'version', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/global.js');

  __REACT_HOT_LOADER__.register(appHeight, 'appHeight', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/global.js');

  __REACT_HOT_LOADER__.register(appWidth, 'appWidth', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/core/conf/global.js');
}();

;

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.swiperAfter = swiperAfter;
/**
 * @desc 每次swiper 页面的时候调用
 */
function swiperAfter($in, $out) {
    // $in 和 $out 可能是一个layer或者一个page
    if ($in && $in[0]) {
        $(document).trigger('h5ds.swiperAfter', { $in: $in, $out: $out });
    }

    // 解决layer-表单的BUG
    $('.layer-val').each(function () {
        $(this).closest('.layer').off('mousedown touchstart');
    });
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(swiperAfter, 'swiperAfter', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/common/h5ds.swiper.after.js');
}();

;

/***/ }),

/***/ 19:
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
    // if ($out && $out[0]) {
    //     $out.find('.element').css({
    //         'will-change': 'auto'
    //     });
    // }
    if ($in && $in[0]) {
        // $in.find('.element').css({
        //     'will-change': 'transform'
        // });
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

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(194);


/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(26);

__webpack_require__(27);

var _global = __webpack_require__(15);

var _h5dsUtils = __webpack_require__(49);

var _inpc = __webpack_require__(195);

var _h5dsSwiper = __webpack_require__(16);

var _h5dsSwiper2 = __webpack_require__(19);

// 初始化

// 加载滑动插件
$(function () {
    // 长页设置
    (0, _h5dsUtils.langPage)();

    // 如果是PC的预览页面。后面都不执行
    if (!(0, _h5dsUtils.isBuild)()) {
        return;
    }

    // 如果是pc 页面。修改页面结构
    if ((0, _h5dsUtils.ispc)()) {
        (0, _inpc.initPcHtml)();
    }

    // 图片预加载
    (0, _h5dsUtils.lazyLoad)();

    // 手机端执行
    $(document).on('h5ds.loadingEnd', function () {

        // 如果在编辑器页面，后面的ispc不执行
        var $h5dsSwiper = $('#h5dsSwiper');
        if (!(0, _h5dsUtils.ispc)()) {
            // 手机端，自动做适配，设置layers的偏移
            var setlayer = function setlayer() {
                var scale = (0, _h5dsUtils.getScale)();
                $('#h5dsPopups, #h5dsSwiper').find('.h5ds-swiper-pageinner').children().each(function () {
                    (0, _h5dsUtils.setSize)($(this), scale);
                });
                $('#h5dsFixedsUp, #h5dsFixedsDown').find('.h5ds-swiper-pageinner').children().each(function () {
                    (0, _h5dsUtils.setSize)($(this), scale, true);
                });
            };

            setlayer();

            // 页面尺寸发生变化。自动适配
            $(window).resize(function () {
                setlayer();
                (0, _h5dsUtils.setAdsorbent)();
            });
        } else {
            // pc 端，设置swiper固定的宽度高度
            $h5dsSwiper.css({
                width: _global.appWidth,
                height: _global.appHeight
            });
        }
        (0, _h5dsUtils.setAdsorbent)();

        // 初始化滚动条
        var slider = null;
        try {
            slider = sliderAnimate;
        } catch (e) {
            slider = {
                name: '上下隐藏',
                inNext: 'pt-page-moveFromBottomFade',
                outNext: 'pt-page-moveToTopFade',
                inPrev: 'pt-page-moveFromTopFade',
                outPrev: 'pt-page-moveToBottomFade'
            };
        }
        var obj = $.extend(slider);
        var swiper = $h5dsSwiper.h5dsSwiper(obj);

        // 浮动层
        console.log(' >>>>>>>> 浮动层事件');
        (0, _h5dsSwiper2.swiperBefore)($('#h5dsFixedsUp').find('.h5ds-swiper-page'));
        (0, _h5dsSwiper2.swiperBefore)($('#h5dsFixedsDown').find('.h5ds-swiper-page'));
        (0, _h5dsSwiper.swiperAfter)($('#h5dsFixedsUp').find('.h5ds-swiper-page'));
        (0, _h5dsSwiper.swiperAfter)($('#h5dsFixedsDown').find('.h5ds-swiper-page'));

        // pc 上有的事件, 页面切换
        if ((0, _h5dsUtils.ispc)()) {
            (0, _inpc.initPcEvent)(swiper);
        }
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

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPcHtml = initPcHtml;
exports.initPcEvent = initPcEvent;

var _wave = __webpack_require__(196);

var obj = {
    color1: 'rgba(0,120,255,.3)',
    color2: 'rgba(0,120,255,.6)'
};
/**
 * @desc 初始化pc 页面，phone 模式下
 */
function initPcHtml() {
    var allHtml = $('body').html();
    $('body').html('\n        <div class="pc-body">\n            <div class="pc-phone"></div>\n            <div class="pc-infos">\n                <h1 class="pc-title"></h1>\n                <h2 class="pc-desc"></h2>\n                <div class="pc-btns">\n                    <a class="pc-prev">\u4E0A\u4E00\u9875</a>\n                    <a class="pc-next">\u4E0B\u4E00\u9875</a>\n                </div>\n                <div class="pc-pages">\n                    <ul class="pc-dots">\n                        <li class="pc-dots-active"></li>\n                    </ul>\n                </div>\n                <div class="pc-qrcode"></div>\n            </div>\n        </div>\n        <div class="pc-wave">\n            <canvas id="wave"></canvas>\n        </div>\n        <div class="pc-powerby">\n            power by <a target="_blank" href="http://www.h5ds.com">h5ds.com</a>\n        </div>\n    ');
    $('.pc-phone').html(allHtml);
    iniQrcode();
    (0, _wave.drawWave)(obj);
}

/**
 * @desc 添加点
 */
function addDots(len) {
    var str = '';
    for (var i = 0; i < len; i++) {
        str += '<li></li>';
    }
    $('.pc-dots').html(str);
    setDots(0);
}

/**
 * @desc 设置点颜色
 */
function setDots(index) {
    $('.pc-dots').find('li').eq(index).addClass('pc-dots-active').siblings('.pc-dots-active').removeClass('pc-dots-active');

    // 显示文字
    var $current = $('#h5dsSwiper').find('.h5ds-swiper-page').eq(index);
    var title = unescape($current.attr('data-title'));
    var desc = unescape($current.attr('data-desc'));
    if (desc === 'undefined') {
        desc = '';
    }
    $('.pc-title').html(title);
    $('.pc-desc').html(desc);
}

/**
 * @desc 初始化二维码
 */
function iniQrcode() {
    $('.pc-qrcode').qrcode({
        text: location.href,
        size: 120,
        ecLevel: 'L',
        background: '#fff'
    });
}

// PC事件
function initPcEvent(swiper) {
    var $h5dsSwiper = $('#h5dsSwiper');
    var len = $h5dsSwiper.find('.h5ds-swiper-page').length;
    var index = 0;
    // 事件监听
    $h5dsSwiper.on('h5ds_up h5ds_right', function (e, data) {
        index = data.outIndex + 1;
        if (index > len - 1) {
            index = 0;
        }
        setDots(index);
    }).on('h5ds_down h5ds_left', function (e, data) {
        index = data.outIndex - 1;
        if (index < 0) {
            index = len - 1;
        }
        setDots(index);
    });

    // 添加点
    addDots(len);

    // 下一页
    $(document).on('click', '.pc-next', function () {
        index++;
        if (index > len - 1) {
            index = 0;
        }
        if (swiper.toPage(index)) {
            setDots(index);
        }
    }).on('click', '.pc-prev', function () {
        index--;
        if (index < 0) {
            index = len - 1;
        }
        if (swiper.toPage(index)) {
            setDots(index);
        }
    }).on('click', '.pc-dots li', function (e) {
        index = $(this).index();
        if (swiper.toPage(index)) {
            setDots(index);
        }
    });
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(obj, 'obj', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/phone/inpc.js');

    __REACT_HOT_LOADER__.register(initPcHtml, 'initPcHtml', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/phone/inpc.js');

    __REACT_HOT_LOADER__.register(addDots, 'addDots', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/phone/inpc.js');

    __REACT_HOT_LOADER__.register(setDots, 'setDots', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/phone/inpc.js');

    __REACT_HOT_LOADER__.register(iniQrcode, 'iniQrcode', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/phone/inpc.js');

    __REACT_HOT_LOADER__.register(initPcEvent, 'initPcEvent', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/phone/inpc.js');
}();

;

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawWave = drawWave;
/**
 * @desc 绘制水波纹
 */
function drawWave(colorObj) {
    var canvas = document.getElementById('wave');
    var ctx = canvas.getContext('2d');
    //range控件信息
    var nowRange = 30; // 整体高度 0~100%
    //画布属性
    var mW = canvas.width = window.innerWidth;
    var mH = canvas.height = window.innerHeight;

    //画sin 曲线函数
    var drawSin = function drawSin(obj, color) {
        var points = obj.points || []; //用于存放绘制Sin曲线的点
        obj.xOffset += obj.speed;
        ctx.beginPath();

        //在整个轴长上取点
        var dY = mH * (1 - nowRange / 100);
        for (var i = 0; i < mW; i += 50) {
            //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
            var y = -Math.sin(i * obj.waveWidth + obj.xOffset);
            points.push([i, dY + y * obj.waveHeight]);
            ctx.lineTo(i, dY + y * obj.waveHeight);
        }
        // 末尾加个
        ctx.lineTo(i, dY + -Math.sin(i * obj.waveWidth + obj.xOffset) * obj.waveHeight);
        //封闭路径
        ctx.lineTo(mW, mH);
        ctx.lineTo(0, mH);
        ctx.lineTo(points[0][0], points[0][1]);
        ctx.fillStyle = color;
        ctx.fill();
    };

    // 线条
    var lines = [{
        waveWidth: 0.006, //波浪宽度,数越小越宽
        waveHeight: 40, //波浪高度,数越大越高
        speed: 0.02, //波浪速度，数越大速度越快
        xOffset: 100, //波浪x偏移量
        points: null
    }, {
        waveWidth: 0.006, //波浪宽度,数越小越宽
        waveHeight: 26, //波浪高度,数越大越高
        speed: 0.04, //波浪速度，数越大速度越快
        xOffset: 0, //波浪x偏移量
        points: null
    }];
    var render = function render() {
        ctx.clearRect(0, 0, mW, mH);
        // for (let i = 0; i < lines.length; i++) {
        //     let str = (i === 0 ? ', 0.6)' : ', 0.3)');
        //     let color = colorObj.color.replace(')', str);
        //     if(i === 0) {

        //     }
        //     drawSin(lines[i], color);
        // }
        drawSin(lines[0], colorObj.color1);
        drawSin(lines[1], colorObj.color2);
        requestAnimationFrame(render);
    };

    window.addEventListener('resize', function () {
        mW = canvas.width = window.innerWidth;
        mH = canvas.height = window.innerHeight;
    });

    render();
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(drawWave, 'drawWave', 'C:/DT/h5ds/H5DS_All/h5ds-edit-hm/src/app/phone/wave.js');
}();

;

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 27:
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

var _h5dsSwiper2 = __webpack_require__(19);

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
        excludedElements: 'button, input, select, textarea, a, .noSwiper',
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

/***/ 28:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 33:
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

/***/ 34:
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

/***/ 35:
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

/***/ 49:
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

var _global = __webpack_require__(15);

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
    var width = fixed ? _global.appWidth : $box.width(),
        height = fixed ? _global.appHeight : $box.height();
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
    var width = _global.appWidth;
    var height = _global.appHeight;
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

/***/ })

/******/ });
});