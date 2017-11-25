/**
 * 获取css 从 style 中
*/
export function getStyle(style, key) {
    let val = false;
    if(style) {
        let arr = style.split(';');
        arr.forEach(function(elem, index) {
            if(elem.indexOf(key) !== -1) {
                val = elem.split(':')[1];
                val = $.trim(val);
            }
        });
    }
    return val;
}