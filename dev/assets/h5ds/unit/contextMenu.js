/**
 * @desc 鼠标右键触发的弹窗, 这种右键菜单，只能同时出现一个， 这个方法只会在页面上初始化个contextMenu
*/
$.contextMenu = function (setting) {
    let defaults = {
        x: 0, // 必须是个数
        y: 0,
        vals: [], // { name: xx, val: xxx }
        callback: null // 点击后的回调函数，返回 obj
    };
    let set = $.extend(defaults, setting);
    if (!$('.mt-contextmenu')[0]) {
        let tpl = `<div class="mt-contextmenu" style="left: ${set.x}px; top: ${set.y}px;">
            <ul>
                ${
                set.vals.map(elem => {
                    return `<li class="mt-contextmenu-item" data-val="${elem.val}">${elem.name}</li>`;
                }).join('')
                }
            </ul>
        </div>`;
        $('body').append(tpl);
    }
    
    // 设置
    let $box = $('.mt-contextmenu');
    let size = {
        height: $box.height(),
        width: $box.width(),
        win_width: $(window).width(),
        win_height: $(window).height(),
        new_x: set.x,
        new_y: set.y
    };
    // x 超出window
    if(set.x + size.width > size.win_width) {
        size.new_x = size.win_width - size.width - 10;
    }
    // y 超出 window
    if(set.y + size.height > size.win_height) {
        size.new_y = size.win_height - size.height - 10;
    }
    $box.css({
        left: size.new_x,
        top: size.new_y
    });

    // 事件绑定
    $(document).off('click.contextmenu').on('click.contextmenu', function (e) {
        let $context = $(e.target).closest('.mt-contextmenu-item');
        if ($context[0] && set.callback) {
            set.callback($context.attr('data-val'), $context);
        }
        $('.mt-contextmenu').remove();
    });
}