import g from '../conf/global.js';

if(!$('.mt-modal-bg')[0]) {
    $('body').append('<div class="mt-modal-bg"></div>');
}
g.$doc.on('click.modal', '[mt-modal]', function(e) {
    let domName = $(this).attr('mt-modal');
    let $modal = $(domName);
    let $bg = $('.mt-modal-bg');
    let $close = $modal.find('.mt-modal-close');
    
    // 显示弹窗
    let showModal = function(){
        $modal.removeClass('zoomOut').addClass('animated zoomIn').show();
        $bg.show();
    };

    showModal();

    // 关闭事件绑定
    $close.off('click').on('click', function(){
        $modal.removeClass('zoomIn').addClass('zoomOut');
        $modal.trigger('closeBack');
        setTimeout(function(){
            $modal.hide();
            $bg.hide();
            $close.off('click');
            $modal.off('closeModal');
        }, 800);
    });

    // 对外部提供的关闭事件
    $modal.off('closeModal').on('closeModal', function(a){
        $close.trigger('click');
    });

    // 对外提供显示事件
    $modal.off('showModal').on('showModal', function(){
        showModal();
    });

});