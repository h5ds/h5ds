import { animatesIn, animatesOut, animatesEm } from '../conf/animates.js'; // 动画配置

export function animtesToHtml(arr) {
    let sHtml = '';
    for (let i = 0; i < arr.length; i++) {
        let { animate, name, type, time, delay, count, fun } = arr[i];
        sHtml += `<li data-animate="${animate}" data-name="${name}" data-type="${type}" data-time="${time}" data-delay="${delay}" data-count="${count}" data-fun="${fun}">${name}</li>`;
    }
    return `<div class="animates">
                <ul class="clearfix">${sHtml}</ul>
            </div>`;
}