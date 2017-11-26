//左侧伸缩
$(function() {

    var $phone = $('#phone');
    $('#flod-btn').on('click', function(e) {
        var left = 330;
        var $temps = $('#temps');
        var $iconfont = $(this).find('.iconfont');
        if ($temps.attr('data-status') == 'show') {
            $temps.attr('data-status', 'hide');
            $iconfont.removeClass('icon-a3left').addClass('icon-a3right');
            $phone.css({
                'left': 0
            })
        } else {
            $temps.attr('data-status', 'show');
            $iconfont.removeClass('icon-a3right').addClass('icon-a3left');
            $phone.css({
                'left': left
            })
        }
    });
})