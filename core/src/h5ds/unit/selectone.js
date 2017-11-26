import g from '../conf/global';

g.$doc.on('click.selectone','.mt-selectone',function(e){
	let $option = $(e.target).closest('.option');

	// 如果点击的是是其他区域
	if(!$option[0]) {
		return
	}

	let val = $option.attr('data-val');
	$(this).attr('data-val',val).trigger('change',val);
	$option.addClass('mt-selected').siblings('.option').removeClass('mt-selected');
});

function initSelectOne(){
	$('.mt-selectone').each(function(index, el) {
	    var val = $(this).attr('data-val');
	    $(this).find('.option[data-val="'+val+'"]').addClass('mt-selected');
	});
};

window.initSelectOne = initSelectOne;

initSelectOne();