import { AppDataChange } from '../common/AppDataFun.js';
import { isNull } from '../unit/funs';

export function bgColorTpl(obj) {
    console.log('==>', obj);
    return `
    <div class="set-bgcolor">
        <div class="tr">
            背景底色:
            <div class="mt-color set_bg_color">
                <input class="set_bg_color_input" type="color" value="${obj.color}"/>
                透明度：<div style="width:95px" class="mt-slider-bar set_bg_opacity" data-val="${ obj.opacity ? obj.opacity : 0}"></div>
                <a class="mt-color-clear"><i class="iconfont icon-eraser"></i>清除</a>
            </div>
        </div>
    </div>
`
}

// 设置背景颜色
export function initBgColor(self, $parent, callback) {

    // 选择颜色， 颜色+透明度 已经封装 在 unit/color.js
    $parent.find('.set_bg_color').off('change').on('change', function (e, data) {
        let key = (self.className !== 'layer' ? 'style' : 'estyle');
        self[self.className][key]['background-color'] = data;
        callback();
    });
    
}