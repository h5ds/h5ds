/**
 * 确认弹窗
*/
$.confirms = function(setting) {

    if(!$('.mt-modal-bg')[0]) {
        $('body').append('<div class="mt-modal-bg"></div>');
    }

    let defaults = {
        title: '系统提示',
        content: '内容...',
        width: 300, // 宽度
        callback: null // 回调函数
    };
    let set = $.extend(defaults, setting || {});
    let id = 'confirm_' + +new Date();
    let tpl = `
        <div class="mt-confirm" id="${id}">
            <div class="mt-modal-box" style="width: ${set.width}px;">
                <a class="mt-modal-close">
                    <i class="iconfont icon-close"></i>
                </a>
                <div class="mt-modal-title">${set.title}</div>
                <div class="mt-modal-content">${set.content}</div>
                <div class="mt-modal-btns">
                    <a class="mt-btn-cancel">取消</a>
                    <a class="mt-btn-ok">确定</a>
                </div>
            </div>
        </div>
    `;
    $('body').append(tpl);
    let $confirm = $('#' + id);
    let $bg = $('.mt-modal-bg');
    let $close = $confirm.find('.mt-modal-close');

    // 绑定事件
    this.bindEvent = () => {
        let self = this;
        $confirm.on('click', '.mt-btn-cancel', function (e) {
            self.hide(false);
        });
        $confirm.on('click', '.mt-btn-ok', function (e) {
            self.hide(true);
        });
        $confirm.on('click', '.mt-modal-close', function (e) {
            self.hide(null);
        });

        // 监听回车
        $(document).on('keydown.' + id, function(e) {
            if(e.keyCode == 13) {  
                self.hide(true);
            }  
        }); 
    }

    // 显示
    this.show = () => {
        $confirm.removeClass('zoomOut').addClass('animated zoomIn').show();
        $bg.show();
        this.bindEvent();
    }

    // 隐藏
    this.hide = (mark) => {
        $confirm.removeClass('zoomIn').addClass('zoomOut');
        setTimeout(() => {
            $confirm.hide();
            $bg.hide();
            $confirm.off('click').remove();
            $(document).off('keydown.' + id);
        }, 500);
        if (set.callback) {
            set.callback(mark);
        }
    }

    return this;
}
