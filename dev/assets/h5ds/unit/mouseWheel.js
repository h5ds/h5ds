// 自定义鼠标滚动事件
import g from '../conf/global';

g.$doc.on('mousewheel.wheel', '[mt-wheel]', function(e) {
    e.preventDefault();
    let val = parseFloat($(this).val());
    let arr = $(this).attr('mt-wheel').split(',');
    let num = parseFloat(arr[1]);
    // 往下加
    if(e.originalEvent.deltaY > 0) {
        val = val.add(num);
    }else {
        val = val.sub(num);
    }
    if(val < parseFloat(arr[0])) {
        val = parseFloat(arr[0]);
    }
    if(val > parseFloat(arr[2])) {
        val = parseFloat(arr[2]);
    }
    $(this).val(val);
    $(this).trigger('change');
    // $(this).trigger('changes', val);
    // $(this).trigger('input');
});