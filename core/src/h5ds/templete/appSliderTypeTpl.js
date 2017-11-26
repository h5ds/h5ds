import { AppDataChange } from '../common/AppDataFun.js';
import { isNull } from '../unit/funs';

// 自动翻页最大时间 ,d 单位秒
const AppSliderMaxTime = 30;

// 模板
export function appSliderTypeTpl(obj, id) {
    id = id ? id : ''; 
    return `
		<div class="tr">
			锁定翻页:
			<div id="app_lock${id}" class="mt-switch" data-val="${obj.lock ? 'on' : 'off'}">
				<a class="mt-switch-btn"></a>
			</div>
			<i data-title="开启后，滑动页面不能触发翻页效果！" class="iconfont icon-bangzhu"></i>
		</div>
		<div class="tr">
			自动翻页:
			<div id="app_auto_play${id}" data-toggle='[{"dom":"#app_auto_play_div${id}", "class":"show"}]' class="mt-switch" data-val="${obj.autoplay ? 'on' : 'off'}">
				<a class="mt-switch-btn"></a>
			</div>
			<i data-title="开启后，页面会自动播放！"  class="iconfont icon-bangzhu"></i>
		</div>
		<div class="tr${ obj.autoplay ? ' show' : ''}" id="app_auto_play_div${id}" style="display:none;">
			翻页时间:
			<div id="app_auto_play_time${id}" class="mt-slider-bar" mt-bind="app_auto_play_time_input${id}" mt-filter="*${AppSliderMaxTime}" data-val="${ obj.time / AppSliderMaxTime}"></div>
			<input mt-wheel="1,1,10000" id="app_auto_play_time_input${id}" class="mt-input" mt-bind="app_auto_play_time${id}" mt-filter="/${AppSliderMaxTime}" mt-min="0" mt-max="${AppSliderMaxTime}" mt-type="" type="" value="${ parseInt( isNull(obj.time) ? 0 : obj.time, 10) }" name=""> 秒
		</div>`;
}

// 设置翻页类型，锁定 或者 自动翻页
export function initAppSliderType(self, id) {
    id = (id ? id : '');
    let obj = self[self.className];
    //锁定翻页
    $('#app_lock' + id).off('change').on('change', function(e, data) {
        obj.slider.lock = data;
        AppDataChange();
    });

    //自动翻页
    $('#app_auto_play' + id).off('change').on('change', function(e, data) {
        obj.slider.autoplay = data;
        AppDataChange();
    });

    // 翻页时间
    $('#app_auto_play_time' + id).off('change').on('change', function(e, data) {
        obj.slider.time = Math.round(data * AppSliderMaxTime);
        AppDataChange();
    });

    // 翻页时间
    $('#app_auto_play_time_input' + id).off('changes').on('changes', function(e, data) {
        obj.slider.time = data;
        AppDataChange();
    });
}