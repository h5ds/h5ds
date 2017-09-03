/**
 * @desc loading 设置
 */
$.fn.loading = function(setting) {
    let defaults = {
        tip: 'loading',
        center: true,
        window: false
    };
    let set = $.extend(defaults, setting);
    let $this = $(this);
    if(!set.center) {
        $this.html(`<div class="mt-loading">${set.tip}</div>`);
    }else {
        $this.html(`<div class="mt-loading mt-loading-center">${set.tip}</div>`);
    }
}

$.loading = function(setting) {
    let defaults = {
        tip: 'loading...'
    };
    let set = $.extend(defaults, setting);
    let id = 'mt_loading_' + +new Date();
    $('body').append(`<div class="mt-loading-window" id="${id}" >
        <div class="mt-loading-center">${set.tip}</div>
    </div>`);

    this.close = () => {
        $('#' + id).remove();
    }

    return this;
}