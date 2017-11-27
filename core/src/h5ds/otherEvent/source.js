//控制source面板的显示隐藏

import g from '../conf/global';

$(function() {
    g.$doc.on('click', '.close-source', function(e) {
        $(this).closest('.source').hide()
    });

    g.$doc.on('click', '.a-selectimg', function(e) {
        $('#source').show()
    });
})

// 切换我的图库和系统图库
$(function() {
    let $sysOrMyImgs = $('#sysOrMyImgs');
    let $source = $('#source');
    $sysOrMyImgs.on('click', '[data-type]', function() {
        let mark = $(this).attr('data-type');
        $(this).addClass('active').siblings('[data-type]').removeClass('active');
        $source.find(`.sourceitem[data-type="${mark}"]`).addClass('show').siblings('[data-type]').removeClass('show');
    });
});

// 选择图片，然后换图
$(function() {
    $('.source-list').on('click', 'img', function (e) {
        // 如果设置APP的面板打开
        if(!$('#setAppBox').is(':hidden')) {
            $('#setAppBox').find('.set_img_crop').trigger('selectImg.app', $(this).attr('src'));
        }
        // page 设置
        if(!$('#setPageBox').is(':hidden')) {
            $('#setPageBox').find('.set_img_crop').trigger('selectImg.' + AppData.edit.pageType, $(this).attr('src'));
        }
        // layer 设置
        if(!$('#setLayerBox').is(':hidden')) {
            console.log('xxx' + AppData.edit.pageType);
            $('#setLayerBox').find('.set_img_crop').trigger('selectImg.layer', $(this).attr('src'));
        }
        // 关闭弹窗
        $('.close-source').trigger('click');
    })
})