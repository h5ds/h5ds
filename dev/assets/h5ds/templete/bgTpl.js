/**
 * 背景模板
*/
export function bgTpl(obj) {
    return `
    <div class="set-bg">
        <div class="tr">
            背景模式:
            <div class="mt-selectone set_bg_repeat" data-val="${obj.repeat}">
                <a data-val="no-repeat" class="option">默认</a>
                <a data-val="repeat-x" class="option">X平铺</a>
                <a data-val="repeat-y" class="option">Y平铺</a>
                <a data-val="repeat" class="option">平铺</a>
            </div>
        </div>
        <div class="tr">
            背景尺寸:
            <div class="mt-selectone set_bg_size" data-val="${obj.size}">
                <a data-val="initial" class="option">默认</a>
                <a data-val="contain" class="option">适配</a>
                <a data-val="cover" class="option">拉伸</a>
            </div>
        </div>
    </div>`
}

// 设置 bg
export function initBg(self, $parent, callback) {
    let obj = self[self.className];
    // 选择背景模式
    $parent.find('.set_bg_repeat').off('change').on('change', function (e, data) {
        obj.style['background-repeat'] = data;
        callback();
    });

    // 选择背景尺寸
    $parent.find('.set_bg_size').off('change').on('change', function (e, data) {
        obj.style['background-size'] = data;
        callback();
    });
}