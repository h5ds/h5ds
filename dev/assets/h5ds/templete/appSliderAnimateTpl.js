import { AppDataChange } from '../common/AppDataFun.js';

export function appSliderAnimateTpl(obj) {
    // console.log(obj)
    return `
    <div class="tr">翻页动画:</div>
    <div class="tr">
        <div id="appPageSlider" class="mt-selectone" data-val="${obj.playtype}">
            <a data-val="1" class="option">1</a>
            <a data-val="2" class="option">2</a>
            <a data-val="3" class="option">3</a>
            <a data-val="4" class="option">4</a>
            <a data-val="5" class="option">5</a>
            <a data-val="6" class="option">6</a>
        </div>
    </div>`
}

// 初始化选择页面的事件
export function initAppSliderAnimate(self) {
    //翻页样式
    $('#appPageSlider').on('change', function(e, data) {
        self.app.slider.animate = parseInt(data, 10);
        // console.log('appSliderAnimateTpl =>', AppData)
        AppDataChange();
    });
}