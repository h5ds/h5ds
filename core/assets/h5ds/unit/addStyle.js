//设置样式

// 将原来的style转换成 object
function styleToObject(style) {
    if (!style) {
        return {};
    }
    let oldArr = style.split(';');
    style = {};
    for (let i = 0; i < oldArr.length; i++) {
        let keys = oldArr[i].split(':');
        keys[0] = keys[0].trim();
        // animation-play-state 是后面控制动画设置上去的
        if (keys[0] !== 'animation-play-state' && keys[0] !== '') {
            style[keys[0]] = keys[1];
        }
    }
    return style;
}

// style 设置给 $dom  estyle 设置 给 $dom.find('.element')
$.fn.addStyle = function (obj) {

    // 将原来的style转换成 object
    let oldStyle = styleToObject($(this).attr('style'));
    let oldEStyle = styleToObject($(this).find('.element').attr('style'));
    // 新添加的style
    let style = obj.style;
    let estyle = obj.estyle;
    let animate = obj.animate;

    // 设置dom 样式
    if (style) {
        // 设置 dom
        for (let key in style) {
            if (style[key]) {
                if (key == 'background-image') {
                    // 如果是裁剪的图片还没有上传到服务器，用#控制分割的
                    if (style[key].indexOf('#') !== -1) {
                        oldStyle[key] = 'url(' + style[key].split('#')[0] + ')';
                    } else {
                        oldStyle[key] = 'url(' + style[key] + ')';
                    }
                } else {
                    oldStyle[key] = style[key]
                }
            }
        }
    }

    // 设置 element 样式
    for (let key in estyle) {
        if (estyle[key]) {
            if (key == 'background-image') {
                // 如果是裁剪的图片还没有上传到服务器，用#控制分割的
                if (style[key].indexOf('#') !== -1) {
                    oldEStyle[key] = 'url(' + estyle[key].split('#')[0] + ')';
                } else {
                    oldEStyle[key] = 'url(' + estyle[key] + ')';
                }
            } else {
                if (key !== '') {
                    oldEStyle[key] = estyle[key];
                }
            }
        }
    }

    // 设置动画 
    if (animate && animate.length > 0) {
        let arr = [];
        for (let i = 0; i < animate.length; i++) {
            arr.push(animate[i].style);
        }
        oldEStyle['animation'] = arr.join(',');
    } else {
        if (oldEStyle['animation']) {
            delete oldEStyle.animation;
        }
    }

    $(this).attr('style', '').css(oldStyle);
    $(this).find('.element').attr('style', '').css(oldEStyle);

}