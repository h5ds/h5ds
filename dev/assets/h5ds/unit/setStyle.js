//设置样式
// style 设置给 $dom  estyle 设置 给 $dom.find('.element')
$.fn.setStyle = function (obj) {

    if(!obj) {
        console.warn('obj不存在', obj);
        return;
    }

    let style = obj.style;
    let estyle = obj.estyle;
    let animate = obj.animate;

    // 设置dom 样式
    if (style) {
        // 设置 dom
        let obj = {};
        for (var key in style) {
            if (style[key]) {
                if (key == 'background-image') {
                    // 如果是裁剪的图片还没有上传到服务器，用#控制分割的
                    if (style[key].indexOf('#') !== -1) {
                        obj[key] = 'url(' + style[key].split('#')[0] + ')';
                    } else {
                        obj[key] = 'url(' + style[key] + ')';
                    }
                } else {
                    obj[key] = style[key]
                }
            }
        }
        $(this).attr('style', '').css(obj);
    }

    // 如果 estyle 有才设置
    if (estyle) {
        // 设置 element 样式
        let elementObj = {};
        let $element = $(this).find('.element');
        for (let key in estyle) {
            if (estyle[key]) {
                if (key == 'background-image') {
                    // 如果是裁剪的图片还没有上传到服务器，用#控制分割的
                    if (style[key].indexOf('#') !== -1) {
                        elementObj[key] = 'url(' + estyle[key].split('#')[0] + ')';
                    } else {
                        elementObj[key] = 'url(' + estyle[key] + ')';
                    }
                } else {
                    elementObj[key] = estyle[key]
                }
            }
        }

        // 设置动画 
        if (animate && animate.length > 0) {
            let arr = [];
            for (let i = 0; i < animate.length; i++) {
                arr.push(animate[i].style);
            }
            elementObj['animation'] = arr.join(',');
        }

        $element.attr('style', '').css(elementObj);
    }

    return this;

}