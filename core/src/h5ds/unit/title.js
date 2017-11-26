import g from '../conf/global';

g.$doc.on('mouseover.title', '[data-title]', function (e) {
    let title = $(this).attr('data-title'),
        divstr = '',
        left = $(this).offset().left,
        top = $(this).offset().top,
        hei = $(this).height(),
        wid = $(this).width();
    divstr = '<div class="mt-title mt-title-animated animated zoomIn" style="left:' + left + 'px; top:' + (top + hei + 2) + 'px;">' + title + '</div>'
    $('body').append(divstr);
}).on('mouseout.title', function (e) {
    $('.mt-title').remove()
});