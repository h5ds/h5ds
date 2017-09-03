//transform过滤器

//用法
// var rotate = $dom.transform('rotate')
// $dom.transform({'rotate','10deg'})

$.fn.transform = function(obj) {
    var transform = $(this).attr('style') || '';
    //获取
    if (typeof(obj) == 'string') {
        if (transform.indexOf('transform') != -1) {
            return $.getTransform(transform, obj);
        } else {
            return false;
        }
    } else { //设置
        var cls = [];

        //保留原来的参数
        var saveOld = function(str) {
            var val = $.getTransform(transform, str);
            if (val) {
                cls.push(str + '(' + val + ')')
            }
        }
        var arr = ['translate', 'rotate', 'scale', 'skew'];
        for (var i = 0; i < arr.length; i++) {
            if (obj[arr[i]]) {
                cls.push(arr[i] + '(' + obj[arr[i]] + ')')
            } else {
                saveOld(arr[i])
            }
        }

        cls = cls.join(' ');
        $(this).css({
            '-webkit-transform': cls,
            'transform': cls
        })
    }
}

//获取对应的参数
$.getTransform = function(transform, str) {
    transform = transform || '';
    if (transform.indexOf(str) != -1) {
        var exp = RegExp('.*' + str + '\\((.+?)\\).*');
        return parseFloat(transform.replace(exp, '$1'));
    } else {
        return false;
    }
}

// 获取transform 值
String.prototype.transformValue = function(name) {
    if (this.indexOf(name) != -1) {
        var exp = RegExp('.*' + name + '\\((.+?)\\).*');
        return this.replace(exp, '$1')
    } else {
        return false;
    }
}