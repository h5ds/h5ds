import { initH5dsSwiperUeFun } from './initH5dsSwiperUeFun';
import { initMap, svgLazy } from './h5ds.utils.js';

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

        // 如果只有一页，不翻页
        if (set.len <= 1) {
            return;
        }
        set.animated = true;
        $this.trigger('animateStart', $in.index());
        $in.addClass(set['in' + direc] + ' h5ds-swiper-current');
        $out.addClass(set['out' + direc] + ' h5ds-swiper-current');

        // scroll
        let $noSwiper = $in.find('[data-noSwiper="noSwiper"]');
        if ($noSwiper[0]) {
            $noSwiper.addClass('noSwiper');
        }

        // 初始化地图
        initMap($in);

        setTimeout( () => {

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
    let autoplayFun = () => {
        let $current = $this.find('.h5ds-swiper-current');
        let autoplay = $current.attr('data-autoplay');
        if (autoplay !== 'false') { // 自动翻页
            set.animated = true;
            $this.trigger('animateStart', $current.index());
            setTimeout( () => {
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
    $first.find('.h5ds-swiper-layers').css('display', 'block');
    initMap($first);

    // 自动翻页
    autoplayFun();

    // 监听touch 事件
    let $out,
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
            // console.log("你用" + fingerCount + "个手指以" + duration + "ms的时间，向" + direction + "滑动了" + distance + "像素 " + $(e.target).attr('class'));
            let $target = $(e.target);
            let $out = $target.closest('.h5ds-swiper-page');
            let $noSwiper = $target.closest('[data-noswiper="noSwiper"]');
            let outIndex = $out.index();
            let lock = $out.attr('data-lock');
            let autoplay = $out.attr('data-autoplay');

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
            let $out = obj.$out;
            let outIndex = obj.outIndex;
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
        }).on('h5ds_down h5ds_left', function (e, obj) {
            let $out = obj.$out;
            let outIndex = obj.outIndex;
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

    // svg 预加载
    svgLazy();

    return this;
};

