let MAPS = []; // 缓存地图资源.

/**
 * @desc 数组去重
*/
function uniqueArr(arr) {
    let obj = {};
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        let d = arr[i];
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
export function isPC() {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
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
export function lazyLoad() {

    // 进度条，绑定事件
    let $h5dsProgress = $('#h5dsProgress');
    $('#h5dsLoading').on('loadbar', function (e, pre) {
        $h5dsProgress.text(pre.toFixed(2) * 100 + '%');
        if (pre === 1) {
            $(this).hide();
            // 自动播放音乐
            autoPlayMusic();
        }
    });

    // ...
    let maxLoad = 10; // 默认加载10个
    let imgSource = [];
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
    let len = imgSource.length;
    let $loading = $('#h5dsLoading');

    // 完成
    if (len === 0) {
        $loading.trigger('loadbar', 1);
    } else {
        let num = 0;
        // 默认加载前20个图
        imgSource.forEach(function (elem, index) {
            num++;
            if (index > maxLoad) {
                return;
            }
            let img = new Image();
            img.src = elem;
            if (img.complete) { // 如果图片已经存在于浏览器缓存 或者加载失败
                $loading.trigger('loadbar', num / len);
            } else {
                img.onload = function () {
                    $loading.trigger('loadbar', num / len);
                }
                img.onerror = function () {
                    $loading.trigger('loadbar', num / len);
                }
            }
        });
    }

}

/**
 * @desc svg 预加载
 */
export function svgLazy() {
    // svg 预处理
    $('#h5dsSwiper').find('.layer-svg').each(function () {
        let $this = $(this).find('.element');
        let src = $this.attr('data-svglazy');
        let color = $this.attr('data-color').split('@');
        $.get(src).done(function (svg) {
            // 预设SVG颜色
            let $svg = $(svg);
            color.forEach(function (elem, index) {
                $svg.find('path').eq(index).attr('fill', elem);
            })
            let str = $svg.find('svg').prop('outerHTML');
            $this.html(str);
        });
    });
}

/**
 * @desc 音乐播放
*/
export function autoPlayMusic() {
    let $audio = $('#h5dsBgMusic');
    let $icon = $('.h5ds-video-icon');
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
export function resizeWindow() {
    $(window).resize(function () {
        if (!isPC()) {
            let scaleNew = 1;
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
export function initMap($in) {

    // 先销毁之前的地图，释放内存
    for (let i = 0; i < MAPS.length; i++) {
        MAPS[i].destroy();
        // $('.amap-sug-result').remove();
    }

    $in.find('.layer-map').each(function () {
        let $dom = $(this);
        let data = $dom.attr('data-map');
        try {
            data = JSON.parse(unescape(data));
        } catch (e) {
            data = null;
            console.warn('data-uefun 格式错误！具体见：', unescape(data), this);
        }
        if (!data) {
            return;
        }

        let map = new AMap.Map($dom.find('.element')[0], {
            resizeEnable: true,
            zoom: data.zoom || 10,
            center: data.position
        });

        // 加载自定义 信息框 插件
        map.plugin(['AMap.AdvancedInfoWindow'], function () {
            let maker = new AMap.Marker({
                map: map,
                position: data.position,
                icon: "http://webapi.amap.com/images/0.png"
            });

            // 显示信息
            let mapInfo = new AMap.AdvancedInfoWindow({
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
export function langPage() {

    let winHei = window.innerHeight;
    $('[data-noswiper="noSwiper"]').parent().on('scroll', function (e) {
        let $noSwiper = $(this).find('[data-noswiper="noSwiper"]');
        let hei = $noSwiper.height();
        let scrollTop = $(this).scrollTop();
        let sctop = parseInt(scrollTop + winHei, 10);
        let lock = $(this).attr('data-lock');
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
    })
}