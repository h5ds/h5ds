import { drawWave } from './h5ds.wave.js';

let obj = {
    color: 'rgba(0,0,0,0)'
};
/**
 * @desc 初始化pc 页面
*/
export function initPc() {
    let allHtml = $('body').html();
    $('body').html(`
        <div class="pc-body">
            <div class="pc-phone"></div>
            <div class="pc-infos">
                <h1 class="pc-title">页面标题名称</h1>
                <h2 class="pc-desc">页面对应的描述信息在这里展示...</h2>
                <div class="pc-btns">
                    <a class="pc-prev">上一页</a>
                    <a class="pc-next">下一页</a>
                </div>
                <div class="pc-pages">
                    <ul class="pc-dots">
                        <li class="pc-dots-active"></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div class="pc-qrcode"></div>
            </div>
        </div>
        <div class="pc-wave">
            <canvas id="wave"></canvas>
        </div>
        <div class="pc-powerby">
            power by <a target="_blank" href="http://www.h5ds.com">h5ds.com</a>
        </div>
    `);
    $('.pc-phone').html(allHtml);
    drawWave(obj);
    iniQrcode();
}

/**
 * @desc 添加点
*/
function addDots(len) {
    let str = '';
    for (let i = 0; i < len; i++) {
        str += '<li></li>';
    }
    $('.pc-dots').html(str);
    setDots(0);
}

/**
 * @desc 设置点颜色
*/
function setDots(index) {
    $('.pc-dots').find('li')
        .eq(index)
        .addClass('pc-dots-active')
        .siblings('.pc-dots-active')
        .removeClass('pc-dots-active');

    // 显示文字
    let $current = $('#h5dsSwiper').find('.h5ds-swiper-page').eq(index);
    let title = unescape($current.attr('data-title'));
    let desc = unescape($current.attr('data-desc'));
    $('.pc-title').html(title);
    $('.pc-desc').html(desc);

    // 设置波纹背景
    let color = $current.find('.h5ds-swiper-pageinner').css('background-color');
    obj.color = color;
    if(obj.color === 'rgba(0, 0, 0, 0)') {
        obj.color = $('#h5dsSwiper').css('background-color');
    }
    $('.pc-qrcode').css('border-color', obj.color);
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
export function initPcEvent(swiper) {
    let len = $('#h5dsSwiper').find('.h5ds-swiper-page').length;
    let index = 0;
    // 事件监听
    $('#h5dsSwiper').on('h5ds_up h5ds_right', function (e, data) {
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
        swiper.toPage(index);
        setDots(index);
    }).on('click', '.pc-prev', function () {
        index--;
        if (index < 0) {
            index = len - 1;
        }
        swiper.toPage(index);
        setDots(index);
    }).on('click', '.pc-dots li', function(e) {
        index = $(this).index();
        swiper.toPage(index);
        setDots(index);
    });
}