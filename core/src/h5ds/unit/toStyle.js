/**
 * @desc 对象 to obj
*/
$.toStyle = function(obj, animate) {
    let style = [];
    if(typeof obj === 'object') {
        for(let key in obj) {
            if(key === 'background-image') {
                style.push(`${key}: url(${obj[key]})`);
            }else{
                style.push(`${key}: ${obj[key]}`);
            }
        }
    }

    // 设置动画
    if(animate && animate.length > 0) {
        let arr = [];
        for(let i = 0; i < animate.length; i++) {
            arr.push(animate[i].style);
        }
        style.push(`animation: ${arr.join(',')}; -webkit-animation: ${arr.join(',')}`);
        // 默认 动画暂停
        // style.push('animation-play-state: paused');
    }
    return style.join(';');
}