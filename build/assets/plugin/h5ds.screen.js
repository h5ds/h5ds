//手机独有 320 * 486 自动适配算法
(function (window) {
    window.h5dsScreen = function () {
        // 320 * 486， 全局参数 提供给设置 h5ds-swiper-layers 的left 使用
        var oHei = 486,
            oWid = 320,
            sHei = window.screen.height - 64, // 微信 head bar 的高度 64px
            sWid = window.screen.width,
            scale = 1;

        window.LAYER_LEFT = 0;
        window.LAYER_TOP = 0;
        window.LAYER_HEI = oHei;
        window.LAYER_WID = oWid;
        // 如果盒子宽度较大，自动适配高度, 高度100%，重新计算宽度
        if (sWid / sHei > oWid / oHei) {
            LAYER_HEI = sHei;
            LAYER_WID = sHei * (oWid / oHei);
            // left 偏移
            LAYER_LEFT = (sWid - LAYER_WID) / 2;

            scale = LAYER_WID / oWid;

        } else {
            // 宽度自动适应， 宽度100%
            LAYER_WID = sWid;
            LAYER_HEI = sWid * (oHei / oWid);
            // top 偏移
            LAYER_TOP = (sHei - LAYER_HEI) / 2;

            scale = LAYER_HEI / oHei;
        }
        LAYER_LEFT = LAYER_LEFT / scale;
        LAYER_TOP = LAYER_TOP / scale;

        // scale = 1;
        // if(IsPC()) {
        //     scale = 1;
        // }
        return scale;
        // 高度适配
        // document.write('<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" name="viewport">');
    };
    
    var scaleNew = h5dsScreen();
    document.write('<meta name="viewport" content="width=320, initial-scale=' + scaleNew + ', maximum-scale=' + scaleNew + ', minimum-scale=' + scaleNew + ', user-scalable=no">');
})(window);