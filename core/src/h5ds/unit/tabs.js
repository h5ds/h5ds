import g from '../conf/global';

g.$doc.on('click.tabs', '.mt-tab-head', function(e) {
    var $this = $(this)
    var $tab = $this.closest('.mt-tab');
    var index = $this.index();
    $this.addClass('mt-active').siblings('.mt-tab-head').removeClass('mt-active');
    $tab.find('>.mt-tab-body').find('>.mt-tab-box').removeClass('mt-active').eq(index).addClass('mt-active');
    $tab.trigger('changes', {
        dom: $this,
        index: index
    });
});