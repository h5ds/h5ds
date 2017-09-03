import g from '../conf/global';

g.$doc.on('click.selectdiy', '.mt-select-diy', function (e) {
    let $body = $(this).find('.mt-select-body');
    if ($(e.target).closest('.mt-select-body')[0]) {
        return
    }
    if ($body.is(':hidden')) {
        $body.show()
    } else {
        $body.hide()
    }
}).on('click.selectdiy', function (e) {
    if (!$(e.target).closest('.mt-select-diy')[0]) {
        $('.mt-select-body').hide()
    }
});

g.$doc.on('click', '.mt-select', function (e) {
    e.stopPropagation();
    console.log('aa')
    $(this).find('select')[0].click();
});