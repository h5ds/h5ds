/**
 * @desc 帮助提示
 * data 传入一个 数组 [ {dom: '#id1', content: '内容...'} ]
*/
$.helps = function(setting) {
    let defaults = {
        data: [] // 提示列队
    }
    let set = $.extend(defaults, setting);

    // 如果没有，就初始化一个
    if(!$('.mt-helps')[0]) {
        $('body').append(`
        <div class="mt-helps">
            <div class="mt-helps-content">
                <a class="mt-helps-close"><i class="iconfont icon-close"></i></a>
                <div class="mt-helps-info"></div>
                <div class="mt-helps-btns">
                    <a class="mt-helps-prev">上一步</a>
                    <a class="mt-helps-next">下一步</a>
                    <a class="mt-helps-end">完成</a>
                </div>
            </div>
        </div>
        `);
    }

    let $help = $('.mt-helps');
    let $content = $help.find('.mt-helps-content');

    // 显示DOM
    let showDom = function(index) {
        if(index === 0) {
            $('.mt-helps-prev').hide();
            $('.mt-helps-next').show();
            $('.mt-helps-end').hide();
        }else if(index === set.data.length - 1){
            $('.mt-helps-next').hide();
            $('.mt-helps-end').show();
            $('.mt-helps-prev').show();
        }else {
            $('.mt-helps-end').hide();
            $('.mt-helps-next').show();
            $('.mt-helps-prev').show();
        }
        let obj = set.data[index];
        let $target = $(obj.dom);
        let size = {
            width: $target.outerWidth(),
            height: $target.outerHeight(),
            left: $target.offset().left,
            top: $target.offset().top
        }
        $help.css(size);
        let cls = '';
        $content.removeClass().addClass('mt-helps-content mt-helps-' + obj.pos)
        $help.find('.mt-helps-info').html(obj ? obj.content : '');

    }

    // 默认显示第一个
    let activeIndex = 0;
    showDom(activeIndex);
    if(set.data.length === 1) {
        $('.mt-helps-next').hide();
        $('.mt-helps-end').show();
    }

    // 事件绑定
    $help.on('click', '.mt-helps-next', function() {
        activeIndex++;
        if(activeIndex < set.data.length) {
            showDom(activeIndex);
        }
    });

    $help.on('click', '.mt-helps-prev', function() {
        activeIndex--;
        if(activeIndex >= 0) {
            showDom(activeIndex);
        }
    });

    $help.on('click', '.mt-helps-close, .mt-helps-end', function() {
        $help.off('click');
        $help.remove();
    });

}