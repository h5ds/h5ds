import './toPage.scss';
import { AppDataChange } from '../../common/AppDataFun.js';

/**
 * @desc 超链接
 */
export function toPageTpl(self) {
    let { data, name, fun } = self.layer.ue;
    let shtml = '';
    for(let i = 0; i < AppData.data.pages.length; i++) {
        let d = AppData.data.pages[i];
        shtml += `<li title="${d.name}" data-page="${i}" class="${data === i ? 'active' : ''}">
            <span class="num">${i + 1}</span>
            <span class="name">${d.name}</span>
        </li>`;
    }
    return `
        <div class="uebox uebox-topages">
            <div class="uebox-topages">
                <h4>请选择您要跳转的页面：</h4>
                <ul id="ueBoxToPage">
                    ${shtml}
                </ul>
            </div>
        </div>
        <div class="uebox-tips">
            <h5>交互说明：</h5>
            <div class="uebox-content">
                选择一个要跳转的页面，点击会触发交互效果，跳转到指定的页面
            </div>
        </div>
    `;
}

/**
 * @desc 事件
*/
export function toPageEvent(self) {
    $('#ueBoxToPage').off('click').on('click', 'li', function(){
        let val = $(this).attr('data-page');
        $(this).addClass('active').siblings('li').removeClass('active');
        self.layer.ue.data = parseInt(val, 10);
        AppDataChange();
    });
}