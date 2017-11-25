import './style.scss';
import { AppDataChange } from '../../common/AppDataFun.js';

/**
 * @desc 发短信
 */
export function msgTpl(self) {
    let { data, name, fun } = self.layer.ue.msg;
    return `
        <div class="uebox uebox-tel">
            <div class="uebox-tel-input">
                <input placeholder="请输入电话号码" id="ueBoxMsg" value="${data || ''}"/>
            </div>
        </div>
        <div class="uebox-tips">
            <h5>交互说明：</h5>
            <div class="uebox-content">
                在输入框中输入要发短信的电话号码即可
            </div>
        </div>
    `;
}

/**
 * @desc 事件
*/
export function msgEvent(self) {
    $('#ueBoxMsg').off('change').on('change', function(){
        let val = $(this).val();
        self.layer.ue.msg.data = val;
        AppDataChange();
    });
}