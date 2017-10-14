var MAPS = []; // 缓存地图资源

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
    }

    var set = $.extend(defaults, setting);

    // 添加，删除 class
    var pageInOut = function ($in, $out, direc) {

        // 如果只有一页，不翻页
        if (set.len <= 1) {
            return;
        }
        set.animated = true;
        $this.trigger('animateStart', $in.index());
        $in.addClass(set['in' + direc] + ' h5ds-swiper-current');
        $out.addClass(set['out' + direc] + ' h5ds-swiper-current');
        $in.find('.h5ds-swiper-layers').fadeIn(0);
        $out.find('.h5ds-swiper-layers').hide(0);

        // scroll
        var $noSwiper = $in.find('[data-noSwiper="noSwiper"]');
        if ($noSwiper[0]) {
            $noSwiper.addClass('noSwiper');
        }

        // 初始化地图
        initMap($in);

        setTimeout(function () {
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
    var autoplayFun = function () {
        var $current = $this.find('.h5ds-swiper-current');
        var autoplay = $current.attr('data-autoplay');
        if (autoplay !== 'false') { // 自动翻页
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
    $first.find('.h5ds-swiper-layers').fadeIn(0);
    initMap($first);
    // $first.find('.layer').css('display', 'block');

    // 自动翻页
    autoplayFun();

    // 监听touch 事件
    var $out,
        oldY,
        winHei = $(window).height(),
        pageHei = 0,
        speed = 0,
        tmp = null,
        isBottom = false,
        isTop = false;

    $this.swipe({
        excludedElements: '.noSwiper',
        swipe: function (e, direction, distance, duration, fingerCount, fingerData) {
            console.log("你用" + fingerCount + "个手指以" + duration + "ms的时间，向" + direction + "滑动了" + distance + "像素 ");
            var $out = $(e.target).closest('.h5ds-swiper-page');
            var outIndex = $out.index();
            var $noSwiper = $(e.target).closest('.noSwiper');

            var lock = $out.attr('data-lock');
            var autoplay = $out.attr('data-autoplay');

            if ($noSwiper[0]) {
                // 如果有noSwiper
                var hei = $noSwiper.height();
                var scrollTop = $noSwiper.parent().scrollTop();
                var sctop = parseInt(scrollTop + window.innerHeight, 10);
                if (direction === 'up' && scrollTop === 0) {
                    $noSwiper.addClass('noSwiper');
                    return;
                } else if (direction === 'down' && (hei >= sctop - 10 && hei <= sctop + 10)) {
                    $noSwiper.addClass('noSwiper');
                    return;
                } else {
                    $noSwiper.removeClass('noSwiper');
                }
            }
            // 锁定翻页
            if (set.animated) {
                return;
            } else if (lock === 'true') {
                return;
            } else if (autoplay !== 'false') { // 自动翻页
                return;
            } else {
                // 执行翻页
                $this.trigger('h5ds_' + direction, {
                    $out: $out,
                    outIndex: outIndex
                });
            }
        }
    }).off('h5ds_up h5ds_down h5ds_right h5ds_left')
        .on('h5ds_up h5ds_right', function (e, obj) {
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
            pageInOut($in, $out, (nowIndex < index ? 'Next' : 'Prev'));
        } else {
            console.warn('您要跳转的页面不存在！请重新设置');
        }
    };

    // 实例化交互方法
    initH5dsSwiperUeFun(this);

    // svg 预加载
    svgLazy();

    return this;
};

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
function IsPC() {
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
    $('#h5dsLoading').on('load', function (e, pre) {
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
        imgSource = JSON.parse(IMG_SOURCE);
        imgSource = uniqueArr(imgSource); // 去重，重复图片不再加载
    } catch (e) {
        // IMG_SOURCE 未定义
    }
    var len = imgSource.length;
    var $loading = $('#h5dsLoading');

    // 完成
    if (len === 0) {
        $loading.trigger('load', 1);
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
            if (img.compvare) { // 如果图片已经存在于浏览器缓存 或者加载失败
                $loading.trigger('load', num / len);
            } else {
                img.onload = function () {
                    $loading.trigger('load', num / len);
                }
                img.onerror = function () {
                    $loading.trigger('load', num / len);
                }
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
            })
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
        tap: function (e) {
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
        if (!IsPC()) {
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
    })
}

/**
 * @desc 初始化地图, 滑动到某页之后，直接渲染对应的地图
*/
function initMap($in) {

    // 先销毁之前的地图，释放内存
    for(var i = 0; i < MAPS.length; i++) {
        MAPS[i].destroy();
        $('.amap-sug-result').remove();
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
            
            if(data.status) {
                mapInfo.open(map, data.position);
            }

            // 点击标记事件
            AMap.event.addListener(maker, 'click', function(e) {
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

    $('[data-noswiper="noSwiper"]').parent().on('scroll', function (e) {
        var $noSwiper = $(this).find('.noSwiper');
        var hei = $noSwiper.height();
        var scrollTop = $(this).scrollTop();
        var sctop = parseInt(scrollTop + window.innerHeight, 10);
        console.log(hei, sctop)
        var lock = $(this).attr('data-lock');

        if(lock === 'true') {
            return;
        }
        if (scrollTop === 0 || (hei >= sctop - 20 && hei <= sctop + 20)) {
            $noSwiper.removeClass('noSwiper');
        } else {
            $noSwiper.addClass('noSwiper');
        }
    })
}

// 初始化
$(function () {

    // 长页设置
    langPage();

    // 监听屏幕变化
    resizeWindow();

    // 图片预加载
    lazyLoad();

    // 如果在编辑器页面，后面的不执行
    try {
        AppData ? true : false;
    } catch (e) {
        var $h5dsSwiper = $('#h5dsSwiper');
        // console.log('IsPC', IsPC());
        if (!IsPC()) {
            // 计算出当前宽度
            $('.h5ds-swiper-layers').css({
                left: LAYER_LEFT,
                top: LAYER_TOP
            });

            // 禁用safari浏览器的 默认滚动
            // var stopScrolling = function (touchEvent) {
            //     touchEvent.preventDefault();
            // }
            // document.addEventListener('touchstart', stopScrolling, false);
            // document.addEventListener('touchmove', stopScrolling, false);
        } else {
            $h5dsSwiper.css({
                width: 320,
                height: 486
            });
        }

        // 初始化滚动
        var len = $h5dsSwiper.attr('pages-length');
        try {
            sliderAnimate
        } catch (e) {
            sliderAnimate = {};
        }
        var obj = $.extend(sliderAnimate || {}, {
            len: len
        });
        var swiper = $h5dsSwiper.h5dsSwiper(obj);
    }

});

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
                    tap: function (e) {
                        if ($(e.target).css('opacity') == 0) {
                            return;
                        }
                        for (var key in obj) {
                            console.log(obj, key);
                            switch (key) {
                                case 'link': toLink(obj[key], $this, swiper); break;
                                case 'toPage': toPage(obj[key], $this, swiper); break;
                                case 'tel': toTel(obj[key], $this, swiper); break;
                                case 'msg': toMsg(obj[key], $this, swiper); break;
                                case 'hideShow': toHideShow(obj[key], $this, swiper); break;
                            }
                        }
                    }
                });
            }
        }
    });
} (window);

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