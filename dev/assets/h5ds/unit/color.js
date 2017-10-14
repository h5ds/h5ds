//颜色选择
import g from '../conf/global';

/*RGBA颜色转换为16进制*/
String.prototype.colorHex = function() {
    if(!this) {
        return 'initial';
    }
    if(this.indexOf('#') !== -1) {
        return this;
    }
    var aColor = this.replace(/(rgba\()(\d+,\d+,\d+),(((1|0)?\.)?\d+)\)/g, "$2").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
        var hex = Number(aColor[i]).toString(16);
        if (hex === "0") {
            hex += hex;
        }
        strHex += hex;
    }
    if (strHex.length !== 7) {
        strHex = this;
    }
    return strHex;
};

//rgba 获取透明度
String.prototype.colorOpacity = function() {
    if(!this) {
        return 1;
    }
    if(this.indexOf('rgba') === -1) {
        return 1;
    }
    return this.replace(/rgba\(\d+,\d+,\d+,(((0|1)?\.)?\d+)\)/g, '$1');
}

/* 16进制颜色转为RGBA格式 dot 表示透明度， 如果传入 mark = true, 返回一个颜色数组 */
String.prototype.colorRgba = function(dot, mark) {
    
    let sColor = this.toLowerCase();
    let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值  
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2), 16));
        }

        if (mark) {
            return sColorChange;
        }
        return "rgba(" + sColorChange.join(",") + "," + dot + ")";
    } else {
        return sColor;
    }
};

//清理颜色
g.$doc.on('click.color', '.mt-color-clear', function(e) {
    e.stopPropagation();
    var $color = $(this).closest('.mt-color').find('input[type=color]');
    var $slider = $(this).closest('.mt-color').find('.mt-slider-bar');
    $color.val('initial');
    $slider.attr('data-val', 1);
    $slider.find('.mt-slider-active').width('100%')
    $(this).closest('.mt-color').trigger('change', 'initial');
});

//颜色操作监听
g.$doc.on('change', '.mt-color input[type="color"]', function(e) {
    e.stopPropagation();
    var val = $(this).val();
    var dot = $(this).closest('.mt-color').find('.mt-slider-bar').attr('data-val') || 1;
    $(this).closest('.mt-color').trigger('change', val.colorRgba(dot))
});

//滑动条监听
g.$doc.on('change', '.mt-color .mt-slider-bar', function(e) {
    e.stopPropagation();
    var $color = $(this).closest('.mt-color').find('input[type="color"]');
    var dot = $(this).attr('data-val') || 1;
    var val = $color.val();
    $(this).closest('.mt-color').trigger('change', val.colorRgba(dot))
});