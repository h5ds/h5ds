/**
*	简单的数据联动绑定，针对 slider的
*	mt-bind="id" 数据将联动到 对应的ID上去
*	mt-filter="*360" 表示 当前的值 val * 360 为绑定的值
*	mt-fixed="2" 表示保留小数点
*/
import g from '../conf/global.js';

// 数据过滤
function filterVal($this, val) {
    let filter = $this.attr('mt-filter');
    let fixed = $this.attr('mt-fixed') || 0;
    if (filter !== undefined) {
        if (filter.indexOf('/') !== -1) {
            val = val / filter.split('/')[1];
        }
        if (filter.indexOf('+') !== -1) {
            val = val + --filter.split('+')[1];
        }
        if (filter.indexOf('-') !== -1) {
            val = val - filter.split('-')[1];
        }
        if (filter.indexOf('*') !== -1) {
            val = val * filter.split('*')[1];
        }
    }
    if (parseFloat(val) < 1 && fixed === 0) {
        fixed = 1;
    }
    return (val === 0 ? 0 : parseFloat(val).toFixed(fixed));
}

// 数据联动
g.$doc.on('change input', '[mt-bind]', function (e, val) {

    let id = $(this).attr('mt-bind');
    let $bind = $('#' + id);
    let type = $bind.attr('mt-type') || '';
    if (val) { // 如果是slider ，或者是其他自定义表单返回的值。
        val = filterVal($(this), val);
        $bind.val(val + type);
    } else { // 如果是表单，input 等返回的值
        val = $(this).val();
        // console.log(val);
        val = filterVal($(this), val);
        $bind.attr('data-val', val > 1 ? 1 : val);
        //设置slider
        // console.log(val);
        setSilderVal($bind);
    }
});