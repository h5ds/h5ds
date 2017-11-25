import './link.scss';
import { AppDataChange } from '../../common/AppDataFun.js';

/**
 * @desc 超链接
 */
export function linkTpl(self) {
    let { data, name, fun } = self.layer.ue.link;
    return `
        <div class="uebox uebox-links">
            <div class="uebox-links-txt">
                <textarea placeholder="请输入带http的链接地址" id="ueBoxLinksTextArea">${data || ''}</textarea>
            </div>
        </div>
        <div class="uebox-tips">
            <h5>交互说明：</h5>
            <div class="uebox-content">
                在输入框中输入要跳转到的链接地址就可以了
            </div>
        </div>
    `;
}

/**
 * @desc 事件。。
*/
export function linkEvent(self) {
    $('#ueBoxLinksTextArea').off('change').on('change', function(){
        let val = $(this).val();
        self.layer.ue.link.data = val;
        AppDataChange();
    });
}