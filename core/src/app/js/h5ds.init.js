import '../style/animate.scss';
import '../style/animations.scss';
import '../style/loaders.scss';
import '../style/h5ds.app.scss';
import '../style/pc.scss';

// 加载滑动插件
import './h5ds.swiper.js';
import { langPage, resizeWindow, lazyLoad, isPC, svgLazy } from './h5ds.utils.js';
import { initPc, initPcEvent } from './h5ds.initpc.js';

// 初始化
$(function () {

    // 如果是pc 页面。修改页面结构
    try {
        AppData ? true : false;
    } catch (e) {
        if (isPC()) {
            initPc();
            // svg 预加载
            svgLazy();
        }
    }

    // 地图
    if ($('.layer-map').length === 0) {
        // 不要地图
    }

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
        let $h5dsSwiper = $('#h5dsSwiper');
        if (!isPC()) {
            // 计算出当前宽度
            $('.h5ds-swiper-layers').css({
                left: LAYER_LEFT,
                top: LAYER_TOP
            });
            // 禁用safari浏览器的 默认滚动
            let stopScrolling = function (touchEvent) {
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
        let len = $h5dsSwiper.attr('pages-length');
        try {
            sliderAnimate
        } catch (e) {
            sliderAnimate = {};
        }
        let obj = $.extend(sliderAnimate || {}, {
            len: len
        });
        let swiper = $h5dsSwiper.h5dsSwiper(obj);

        if (isPC()) {
            initPcEvent(swiper);
        }

    }

});