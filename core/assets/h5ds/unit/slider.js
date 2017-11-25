import g from '../conf/global';

// 设置值
function setSilderVal($this) {
    $this.empty().html(`<div class="mt-slider-active"><a class="mt-slider-btn"></a></div>`);
    let defaultVal = $this.attr('data-val'),
        wid = $this.width();
    $this.find('.mt-slider-active').width(defaultVal * wid);
}

//初始化值
function initSlider() {
    $('.mt-slider-bar').each(function () {
        setSilderVal($(this));
    })
}

// 事件 change,start, end
g.$doc.on('mousedown.slider', '.mt-slider-btn', function (e) {
    e.stopPropagation();
    let xs = e.pageX,
        $slider = $(this).closest('.mt-slider-bar'),
        $active = $slider.find('.mt-slider-active'),
        max = parseInt($slider.width(), 10),
        defaultVal = $slider.attr('data-val'),
        wid = max * defaultVal,
        val = null;
    $slider.trigger('start', (defaultVal / max).toFixed(2));
    g.$doc.on('mousemove.slider', function (e) {
        e.stopPropagation();
        let mx = e.pageX;
        val = wid + (mx - xs);
        if (val < 0) {
            val = 0;
        } else if (val > max) {
            val = max;
        }
        $active.width(val);
        $slider.attr('data-val', (val / max).toFixed(2));
        $slider.trigger('change', (val / max).toFixed(2));
    }).on('mouseup.slider', function (e) {
        e.stopPropagation();
        let dval = (val / max).toFixed(2);
        $slider.attr('data-val', dval);
        $slider.trigger('end', dval);
        g.$doc.off('mousemove.slider mouseup.slider')
    })
})

window.initSlider = initSlider;
window.setSilderVal = setSilderVal;

$(function () {
    initSlider();
})