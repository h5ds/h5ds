/**
 * @desc 滑动函数
*/
/**
 * @desc 滑动函数
*/
$.fn.h5dsSwiper = function (setting) {
    let $this = $(this);
    let defaults = {
        inNext: 'pt-page-rotateCubeTopIn3', // 进入动画
        outNext: 'pt-page-rotateCubeTopOut3', // 出去动画
        inPrev: 'pt-page-rotateCubeDownIn3', // 进入动画
        outPrev: 'pt-page-rotateCubeDownOut3', // 出去动画
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
        $in.addClass(set['in' + direc] + ' h5ds-swipe-current');
        $out.addClass(set['out' + direc] + ' h5ds-swipe-current');

        setTimeout(function () {
            $in.removeClass(set['in' + direc]);
            $out.removeClass(set['out' + direc]);
            $out.removeClass('h5ds-swipe-current');
            set.animated = false;
            $this.trigger('animateEnd');
            autoplayFun();
        }, set.pageTime);

    };

    // 自动翻页
    let autoplayFun = function () {
        let $current = $this.find('.h5ds-swipe-current');
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
    let $first = $this.find('.h5ds-swipe-page').eq(0);
    $first.addClass('h5ds-swipe-current');

    // 自动翻页
    autoplayFun();

    // 监听touch 事件
    $this.swipe({
        swipe: function (ev, phase, direction, distance, duration, fingerCount) {
            // console.log("你用"+fingerCount+"个手指以"+duration+"秒的速度向" + direction + "滑动了" +distance+ "像素 " +"你在"+phase+"中");
            let $out = $(ev.target).closest('.h5ds-swipe-page');
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
            let $in = $this.find('.h5ds-swipe-page').eq(inIndex);
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
            let $in = $this.find('.h5ds-swipe-page').eq(inIndex);
            pageInOut($in, $out, 'Prev');
        });
};