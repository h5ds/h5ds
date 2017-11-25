/**
 * @desc 设置字体加粗
 * @param $el 文本框对象
*/
export function setBold($el) {
    let bold = $el.css('font-weight');
    if(bold == '400') {
        $el.css('font-weight', 'bolder');
    }else {
        $el.css('font-weight', '400');
    }
}

/**
 * @desc 设置字体倾斜
 * @param $el 文本框对象
*/
export function setOblique($el) {
    let style = $el.css('font-style');
    if(style == 'oblique') {
        $el.css('font-style', 'normal');
    }else {
        $el.css('font-style', 'oblique');
    }
}

/**
 * @desc 设置文字线条
 * @param $el 文本框对象
 * @param val 线的位置 line-through, underline
*/
export function setFontLine($el, val) {
    let style = $el.css('text-decoration');
    if(style.indexOf(val) === -1) {
        $el.css('text-decoration', val);
    }else {
        $el.css('text-decoration', 'none');
    }
}

/**
 * @desc 设置字缩进
 * @param $el 文本框对象
 * @param val 缩进方向 indent，dedent
 */
export function fontDent($el, val) {
    let style = parseInt($el.css('text-indent'), 10);
    let fontSize = parseInt($el.css('font-size'), 10);
    if(val === 'indent') {
        style += fontSize;
    }else if(val === 'dedent') {
        style -= fontSize;
    }else {
        // ...
    }
    $el.css('text-indent', style);
}

/**
 * @desc 文本对齐方式
 * @param $el 文本框对象
 * @param val 对齐方向 left, center, right
*/
export function fontAlign($el, val) {
    let style = $el.css('text-align');
    // console.log(style);
    $el.css('text-align', val);
}

/**
 * @desc 超链接
 * @param $el 文本框对象
 * @param val 对齐方向 left, center, right
*/
export function setLink($el, val) {
    let style = $el.attr('mt-exa-link') || false;
}

/**
 * @desc 清除样式
 * @param $el 文本框对象
*/
export function clearStyle($el) {
    $el.attr('style', '');
}

// 获取光标位置
export function getCurPos(textDom) {
    let cursorPos = 0;
    if (document.selection) {
        // IE Support
        textDom.focus ();
        let selectRange = document.selection.createRange();
        selectRange.moveStart ('character', -textDom.value.length);
        cursorPos = selectRange.text.length;
    }else if (textDom.selectionStart || textDom.selectionStart == '0') {
        // Firefox support
        cursorPos = textDom.selectionStart;
    }
    return cursorPos;
}

// 设置光标位置
export function setCurPos(textDom, pos){
    if(textDom.setSelectionRange) {
        // IE Support
        textDom.focus();
        textDom.setSelectionRange(pos, pos);
    }else if (textDom.createTextRange) {
        // Firefox support
        var range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}