/**
 * @desc 滑动函数
*/
$.fn.h5dsSwiper = function (setting) {
    let $this = $(this);
    let defaults = {
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

    let set = $.extend(defaults, setting);

    // 添加，删除 class
    let pageInOut = function ($in, $out, direc) {
        set.animated = true;
        $this.trigger('animateStart', $in.index());
        $in.addClass(set['in' + direc] + ' h5ds-swiper-current');
        $out.addClass(set['out' + direc] + ' h5ds-swiper-current');

        setTimeout(function () {
            // 离开后隐藏
            $in.find('.layer').fadeIn(0);
            $out.find('.layer').hide(0);
            $in.removeClass(set['in' + direc]);
            $out.removeClass(set['out' + direc]);
            $out.removeClass('h5ds-swiper-current');
            set.animated = false;
            $this.trigger('animateEnd');
            autoplayFun();
        }, set.pageTime);

    };

    // 自动翻页
    let autoplayFun = function () {
        let $current = $this.find('.h5ds-swiper-current');
        let autoplay = $current.attr('data-autoplay');
        if (autoplay !== 'false') { // 自动翻页
            set.animated = true;
            $this.trigger('animateStart', $current.index());
            setTimeout(() => {
                $this.trigger('h5ds_' + set.direction, {
                    $out: $current,
                    outIndex: $current.index()
                });
            }, autoplay * 1000);
        }
        return autoplay;
    };

    // 默认显示第一页
    let $first = $this.find('.h5ds-swiper-page').eq(0);
    $first.addClass('h5ds-swiper-current');
    $first.find('.layer').fadeIn(0);
    // $first.find('.layer').css('display', 'block');

    // 自动翻页
    autoplayFun();

    // 监听touch 事件
    $this.swipe({
        swipe: function (ev, phase, direction, distance, duration, fingerCount) {
            console.log("你用" + fingerCount + "个手指以" + duration + "秒的速度向" + direction + "滑动了" + distance + "像素 " + "你在" + phase + "中");
            let $out = $(ev.target).closest('.h5ds-swiper-page');
            let outIndex = $out.index();

            let lock = $out.attr('data-lock');
            let autoplay = $out.attr('data-autoplay');
            // 锁定翻页
            if (set.animated) {
                return;
            } else if (lock === 'true') {
                return;
            } else if (autoplay !== 'false') { // 自动翻页
                return;
            } else {
                // 执行翻页
                $this.trigger('h5ds_' + phase, {
                    $out: $out,
                    outIndex: outIndex
                });
            }
        }
    }).off('h5ds_up h5ds_down h5ds_right h5ds_left')
        .on('h5ds_up h5ds_right', function (e, { $out, outIndex }) {
            let inIndex = 0;
            if (outIndex === set.len - 1) {
                // 不循环展示
                if (!set.loop) {
                    return;
                }
            } else {
                inIndex = outIndex + 1;
            }
            let $in = $this.find('.h5ds-swiper-page').eq(inIndex);
            pageInOut($in, $out, 'Next');
        }).on('h5ds_down h5ds_left', function (e, { $out, outIndex }) {
            let inIndex = 0;
            if (outIndex === 0) {
                // 不循环展示
                if (!set.loop) {
                    return;
                }
                inIndex = set.len - 1;
            } else {
                inIndex = outIndex - 1;
            }
            let $in = $this.find('.h5ds-swiper-page').eq(inIndex);
            pageInOut($in, $out, 'Prev');
        });

    // 页面跳转
    this.toPage = function (index) {
        let $out = $('.h5ds-swiper-current');
        let nowIndex = $out.index();
        let $in = $this.find('.h5ds-swiper-page').eq(index);
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

    return this;
};

/**
 * @desc 数组去重
*/
function uniqueArr(arr) {
    var obj = {};
    var newArr = [];
    for(let i = 0; i < arr.length; i++) {
        let d = arr[i];
        if(!obj[d]) {
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
    $('#h5dsLoading').on('load', function(e, pre) {
        $h5dsProgress.text(pre.toFixed(2) * 100 + '%');
        if(pre === 1) {
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
            if(index > maxLoad) {
                return;
            }
            var img = new Image();
            img.src = elem;
            if (img.complete) { // 如果图片已经存在于浏览器缓存 或者加载失败
                num++;
                $loading.trigger('load', num / len);
            }else {
                img.onload = function () {
                    num++;
                    $loading.trigger('load', num / len);
                }
                img.onerror = function() {
                    num++;
                    $loading.trigger('load', num / len);
                }
            }
        });
    }

}

/**
 * @desc 音乐播放
*/
function autoPlayMusic() {
    var $audio = $('#h5dsBgMusic');
    var $icon = $('.h5ds-video-icon');
    if($audio[0]) {
        $audio[0].play();
        $(document).one('WeixinJSBridgeReady', function () {
            $audio[0].play();
        });
        $icon.addClass('h5ds-video-iconing');
    }

    // 控制音乐
    $icon.swipe({
        tap: function (e) {
            if($(this).hasClass('h5ds-video-iconing')) {
                $audio[0].pause();
                $(this).removeClass('h5ds-video-iconing');
            }else {
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
    $(window).resize(function() {
        if(!IsPC()) {
            var scaleNew = h5dsScreen();
            $('[name="viewport"]').attr('content', 'width=320, initial-scale=' + scaleNew + ', maximum-scale=' + scaleNew + ', user-scalable=no');
            // 计算出当前宽度
            $('.h5ds-swiper-layers').css({
                left: LAYER_LEFT,
                top: LAYER_TOP
            });
        }
    })
}

// 初始化
$(function () {

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
            var stopScrolling = function (touchEvent) {
                touchEvent.preventDefault();
            }
            document.addEventListener('touchstart', stopScrolling, false);
            document.addEventListener('touchmove', stopScrolling, false);
        } else {
            $h5dsSwiper.css({
                width: 320,
                height: 486
            });
        }

        // 初始化滚动
        var len = $h5dsSwiper.attr('pages-length');
        $h5dsSwiper.h5dsSwiper({
            len: len
        });

    }

});

//////////////////////////////////////////////////////////////////////////////////////////
// 交互事件
function initH5dsSwiperUeFun(swiper) {

    $('#h5dsSwiper').find('.layer[data-uefun]').each(function () {
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
                switch (obj.fun) {
                    case 'link': toLink(obj, $this, swiper); break;
                    case 'toPage': toPage(obj, $this, swiper); break;
                    case 'tel': toTel(obj, $this, swiper); break;
                    case 'msg': toMsg(obj, $this, swiper); break;
                }
            }
        }
    });
} (window);

// 超链接
function toLink(obj, $layer, swiper) {
    $layer.swipe({
        tap: function (e) {
            location.href = obj.data;
        }
    });
}

// 发短信
function toMsg(obj, $layer, swiper) {
    $layer.swipe({
        tap: function (e) {
            location.href = 'sms:' + obj.data;
        }
    });
}

// 打电话
function toTel(obj, $layer, swiper) {
    $layer.swipe({
        tap: function (e) {
            location.href = 'tel:' + obj.data;
        }
    });
}

// 页面跳转
function toPage(obj, $layer, swiper) {
    $layer.swipe({
        tap: function (e) {
            swiper.toPage(obj.data);
        }
    });
}