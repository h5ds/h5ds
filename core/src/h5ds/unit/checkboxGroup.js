/**
 * @desc 选择框
 */
$(document).on('click', '.mt-checkbox-item', function() {
    let $this = $(this);
    let $group = $this.closest('.mt-checkbox-group');
    $this.addClass('mt-checkbox-active').siblings('.mt-checkbox-item').removeClass('mt-checkbox-active');
    $group.trigger('changes', {
        val: $this.attr('data-val'),
        text: $this.html()
    });
});