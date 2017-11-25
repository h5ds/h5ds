/**
 * @desc 交互模块及功能，在页面上全是 JS控制，为了不加太多属性，之用一个属性控制, 所有函数名字前面加个 ueOf
 * <div class="layer" data-ue='{"name":"超链接", "fun": "ueOflink", "data": "http://www.h5ds.com"}'></div>
 * 多个存放到数组
 */
import { linkTpl, linkEvent } from './links/linkTpl';
import { toPageTpl, toPageEvent } from './toPage/toPageTpl';
import { telTpl, telEvent } from './tel/telTpl';
import { msgTpl, msgEvent } from './msg/msgTpl';
import { hideShowTpl, hideShowEvent } from './hideShow/hideShowTpl';
import { AppDataChange } from '../common/AppDataFun.js';

/**
 * @desc layer 的交互
*/
function switchUeTpl(self, fun) {
    // if(!self.layer.ue.data) {
    //     self.layer.ue.data = {};
    // }
    let tpl = '';

    console.log(self.layer.ue);

    switch (fun) {
        case 'link': tpl = linkTpl(self); break;
        case 'toPage': tpl = toPageTpl(self); break;
        case 'tel': tpl = telTpl(self); break;
        case 'msg': tpl = msgTpl(self); break;
        case 'hideShow': tpl = hideShowTpl(self); break;
    }

    $('#setUeSetBox').html(tpl);
    // return tpl;
}

/**
 * @desc layer 的交互
*/
function switchUeEvent(self, fun) {
    switch (fun) {
        case 'link': linkEvent(self); break;
        case 'toPage': toPageEvent(self); break;
        case 'tel': telEvent(self); break;
        case 'msg': msgEvent(self); break;
        case 'hideShow': hideShowEvent(self); break;
    }
}

// 以下非配置项 ////////////////////////////////////////////////////////////////////////////////////////

/**
 * @desc 设置交互名字
*/
function setUeName(self) {
    let name = '';
    let layer = self.layer;
    let ue = layer.ue;
    if (ue) {
        name = ue.name;
    }
    $('#setUeSetName').html(name);
}

/**
 * @desc 事件
 */
export function setUeEvent(self) {

    let toggleSet = function () {
        if ($('.setue-set-show')[0]) {
            $('.setue-set-show').removeClass('setue-set-show');
        } else {
            $('#setUeSet').addClass('setue-set-show');
        }
    }

    // 选择 列表
    $('#setUeList').off('click').on('click', '.fun', function (e) {
        let fun = $(this).attr('data-fun');
        let name = $(this).find('span').text();

        // 设置参数
        if (!self.layer.ue) {
            self.layer.ue = {};
        }
        // 设置参数 fun 作为 key
        if(!self.layer.ue[fun]) {
            self.layer.ue[fun] = {
                name: name,
                fun: fun,
                data: null
            };
        }
        
        // 重新设置列表 样式
        initUeSet(self);
        toggleSet(); // 显示面板

        // 设置模板
        switchUeTpl(self, fun);
        // 添加事件
        switchUeEvent(self, fun);

        $('.clear-setue').attr('data-fun', fun);

    });

    // 功能模块 - 关闭面板
    $(document).off('click.setUeClose').on('click.setUeClose', '.close-setue', function (e) {
        // 设置参数
        toggleSet();
    });

    // 清除功能
    $(document).off('click.setUeClear').on('click.setUeClear', '.clear-setue', function (e) {
        // 设置参数
        let fun = $(this).attr('data-fun');
        delete self.layer.ue[fun];
        initUeSet(self);
        AppDataChange();
        toggleSet();
    });
}

/**
 * @desc 交互区域设置
*/
export function initUeSet(self) {

    // 设置交互名字
    setUeName(self);

    // 设置模板，显示or 隐藏 设置区域
    let $setUeList = $('#setUeList');
    $setUeList.find('.fun').removeClass('active');
    if (self.layer.ue) {
        for (let key in self.layer.ue) {
            let ue = self.layer.ue[key];
            $setUeList.find(`.fun[data-fun="${ue.fun}"]`).addClass('active');
        }
    }
}