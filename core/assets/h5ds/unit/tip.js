//提示信息
$.tip = function(setting) {
    var defaults = {
        msg: '操作成功', //
        type: 'success', //success,danger,warning
        time: 3000, //
        callback: null //
    }
    var set = $.extend(defaults, setting || {});
    tipsMsg(set)
};

function tipsMsg(obj) {
    const id = 'mt_' + new Date().getTime();
    const type = 'mt-tip-' + obj.type + ' animated fadeInDown';
    if(!$('body').find('.mt-tip-group')[0]) {
        $('body').append('<div class="mt-tip-group"></div>');
    }
    $('.mt-tip-group').append('<div class="mt-tip-inner"><div class="' + type + '" id="' + id + '">' + obj.msg + '</div></div>');
    if (!obj.time) {
        obj.time = 3000;
    }
    setTimeout(function() {
        const $id = $('#' + id);
        $id.removeClass('fadeInDown').addClass('fadeOutUp');
        setTimeout(function() {
            $id.remove();
            if (obj.callback) {
                obj.callback($id);
            }
        }, 800)
    }, obj.time)
}