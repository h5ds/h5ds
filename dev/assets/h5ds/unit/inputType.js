/**
*	设置input 单位， 设置 min max 后，需要通过 changs 拿到val
*/
import g from '../conf/global.js';

g.$doc.on('change', '[mt-type]', function(e) {

    // 设置单位
    let danwei = $(this).attr('mt-type');
    let val = $(this).val();
    let reg = /(^[-+]?\d+(\.\d+)?$)/;
    if(reg.test(val)){
        val = val.replace(reg, '$1');
    }else{
        val = parseInt(val, 10) || 0;
    }

    // 设置范围
    let min = $(this).attr('mt-min') || null;
    let max = $(this).attr('mt-max') || null;
    if(min !== null && parseInt(val, 10) < parseInt(min, 10)){
        val = min;
    }
    if(max !== null && parseInt(val, 10) > parseInt(max, 10)){
        val = max;
    }

    val += danwei;

    $(this).val( val ).trigger('changes', val);

});