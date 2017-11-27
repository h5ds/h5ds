import { AppDataChange } from '../common/AppDataFun.js';
import { sliderAnimate } from '../conf/sliderAnimate';

export function appSliderAnimateTpl(obj) {
    // console.log(obj)
    let list = '';
    for(let key in sliderAnimate) {
        list += `<a data-val="${key}" class="option">${sliderAnimate[key].name}</a>`;
    }
    return `
    <div class="tr">翻页动画:</div>
    <div class="tr">
        <div id="appPageSlider" class="mt-selectone" data-val="${obj.playtype}">
            ${list}
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