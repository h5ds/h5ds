import './style.scss';
import { AppDataChange } from '../../common/AppDataFun.js';

/**
 * @desc 超链接
 */
export function hideShowTpl(self) {
    if(!self.layer.ue.hideShow.data) {
        self.layer.ue.hideShow.data = {};
    }
    let { data, name, fun } = self.layer.ue.hideShow;
    return `
        <div class="uebox uebox-hideshow">
            <div class="uebox-hideshow-box">
                <ul id="ueBoxShowHideCheckbox" class="mt-checkbox-group">
                    <li class="mt-checkbox-item ${data.type === 'show' ? 'mt-checkbox-active' : ''}" data-val="show">只显示</li>
                    <li class="mt-checkbox-item ${data.type === 'hide' ? 'mt-checkbox-active' : ''}" data-val="hide">只隐藏</li>
                    <li class="mt-checkbox-item ${data.type === 'showhide' ? 'mt-checkbox-active' : ''}" data-val="showhide">显隐切换</li>
                </ul>
                <textarea placeholder="请输入目标元素的id, 多个id用,分隔" id="ueBoxHideShowTextArea">${data.ids || ''}</textarea>
            </div>
        </div>
        <div class="uebox-tips">
            <h5>交互说明：</h5>
            <div class="uebox-content">
                选择显隐藏的交互方式，设置目标元素的id，多个id用,分隔
            </div>
        </div>
    `;
}

/**
 * @desc 事件
*/
export function hideShowEvent(self) {
    $('#ueBoxShowHideCheckbox').off('changes').on('changes', function(e, data){
        self.layer.ue.hideShow.data.type = data.val;
        AppDataChange();
    });

    $('#ueBoxHideShowTextArea').off('change').on('change', function(e){
        let val = $(this).val();
        if(/[a-zA-z_0-9,]+/.test(val)) {
            self.layer.ue.hideShow.data.ids = val;
            AppDataChange();
        }else {
            $.tip({
                msg: 'id格式填写错误', //
                type: 'danger',
                time: 3000
            });
        }
        
    });
}