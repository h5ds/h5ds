/**
 * @desc 交互模块及功能，在页面上全是 JS控制，为了不加太多属性，之用一个属性控制, 所有函数名字前面加个 ueOf
 * <div class="layer" data-ue='{"name":"超链接", "fun": "ueOflink", "data": "http://www.h5ds.com"}'></div>
 * 多个存放到数组
 */
import { linkTpl, linkEvent } from './links/linkTpl';
import { toPageTpl, toPageEvent } from './toPage/toPageTpl';
import { telTpl, telEvent } from './tel/telTpl';
import { msgTpl, msgEvent } from './msg/msgTpl';

/**
 * @desc layer 的交互
*/
function switchUeTpl(self) {
    let ue = self.layer.ue;
    let tpl = '';
    switch(ue.fun) {
        case 'link': tpl = linkTpl(self); break;
        case 'toPage': tpl = toPageTpl(self); break;
        case 'tel': tpl = telTpl(self); break;
        case 'msg': tpl = msgTpl(self); break;
    }
    return tpl;
}

/**
 * @desc layer 的交互
*/
function switchUeEvent(self) {
    let ue = self.layer.ue;

    switch(ue.fun) {
        case 'link': linkEvent(self); break;
        case 'toPage': toPageEvent(self); break;
        case 'tel': telEvent(self); break;
        case 'msg': msgEvent(self); break;
    }
}

/**
 * @desc 设置交互名字
*/
function setUeName(self) {
    let name = '';
    let layer = self.layer;
    let ue = layer.ue;
    if(ue){
        name = ue.name;
    }
    $('#setUeSetName').html(name);
}

/**
 * @desc 事件
 */
export function setUeEvent(self) {
    
    let toggleSet = function() {
        if($('.setue-set-hide')[0]) {
            $('.setue-set-hide').removeClass('setue-set-hide');
        }else{
            $('#setUeSet').addClass('setue-set-hide');
        }
    }

    // 选择 列表
    $('#setUeList').off('click').on('click', '.fun', function(e) {
        let fun = $(this).attr('data-fun');
        let name = $(this).find('span').text();
        toggleSet();

        // 设置参数
        self.layer.ue = {
            name: name,
            fun: fun,
            data: null
        };

        // 重新设置tpl
        initUeSet(self);

    });

    // 功能模块
    $(document).off('click.setUeClose').on('click.setUeClose', '.close-setue', function(e) {
        // 设置参数
        self.layer.ue = null;
        toggleSet();
    });
}

/**
 * @desc 交互区域设置
*/
export function initUeSet(self) {
    let tpl = '';
    let $setUeSet = $('#setUeSet');

    // 设置交互名字
    setUeName(self);

    // 设置模板，显示or 隐藏 设置区域
    if(self.layer.ue) {
        tpl = switchUeTpl(self);
        $setUeSet.removeClass('setue-set-hide');
    }else {
        $setUeSet.addClass('setue-set-hide');
    }

    // 设置模板
    $('#setUeSetBox').html(tpl);

    // 实例化事件
    if(self.layer.ue) {
        switchUeEvent(self);
    }
}