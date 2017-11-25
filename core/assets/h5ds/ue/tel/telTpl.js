import './style.scss';
import { AppDataChange } from '../../common/AppDataFun.js';

/**
 * @desc 超链接
 */
export function telTpl(self) {
    let { data, name, fun } = self.layer.ue.tel;
    return `
        <div class="uebox uebox-tel">
            <div class="uebox-tel-input">
                <input placeholder="请输入电话号码" id="ueBoxLinksTel" value="${data || ''}"/>
            </div>
        </div>
        <div class="uebox-tips">
            <h5>交互说明：</h5>
            <div class="uebox-content">
                在输入框中输入要电话号码即可
            </div>
        </div>
    `;
}

/**
 * @desc 事件
*/
export function telEvent(self) {
    $('#ueBoxLinksTel').off('change').on('change', function(){
        let val = $(this).val();
        self.layer.ue.tel.data = val;
        AppDataChange();
    });
}