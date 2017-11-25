import { getStyle } from '../../unit/getCssInStyle';
/**
 * 设置模板
*/
export function setTpl(self) {
    let obj = self.layer;
    let str = `<div class="ex-set-text">
        <div class="ex-btns" id="exTextBtns">
            <a class="ex-btn" data-fun="bold"><i class="iconfont icon-bold"></i></a>
            <a class="ex-btn" data-fun="italic"><i class="iconfont icon-italic"></i></a>
            <a class="ex-btn" data-fun="strikethrough"><i class="iconfont icon-strikethrough"></i></a>
            <a class="ex-btn" data-fun="underline"><i class="iconfont icon-underline"></i></a>
            <a class="line"></a>
            <a class="ex-btn" data-fun="indent"><i class="iconfont icon-indent"></i></a>
            <a class="ex-btn" data-fun="dedent"><i class="iconfont icon-dedent"></i></a>
            <a class="line"></a>
            <a class="ex-btn" data-fun="alignright"><i class="iconfont icon-alignright"></i></a>
            <a class="ex-btn" data-fun="aligncenter"><i class="iconfont icon-aligncenter"></i></a>
            <a class="ex-btn" data-fun="alignleft"><i class="iconfont icon-alignleft"></i></a>
            <a class="line"></a>
            <!-- <a class="ex-btn" data-fun="chain"><i class="iconfont icon-chain"></i></a>
            <a class="ex-btn" data-fun="chainbroken"><i class="iconfont icon-chainbroken"></i></a>
            <a class="ex-btn" data-fun="eraser"><i class="iconfont icon-eraser"></i></a><br/> -->

            <!-- <div class="mt-select-diy">
                <div class="mt-select-title">字体选择</div>
                <div class="mt-select-body" style="display: none;">
                    这里随便写点什么...
                </div>
            </div> -->
            
            <a title="文字颜色" class="ex-btn ex-btn-fontcolor" data-fun="zitiyanse">
                <input class="mt-color-hidden" id="exZiTiYanSe" type="color" />
                <i class="iconfont icon-zitiyanse"></i>
            </a>
            <!-- <a title="文字背景" class="ex-btn ex-btn-fontcolor" data-fun="a">
            <input class="mt-color-hidden" id="exFontBg" type="color" />
                <i class="iconfont icon-a"></i>
            </a> -->
            <br/>

            <a title="字体大小" class="ex-btn"><i class="iconfont icon-zitidaxiao"></i></a>
            <input mt-wheel="12,1,60" id="exFontSize" class="mt-input" mt-type='px' type="text" value="${getStyle(obj.data.fontStyle, 'font-size') || '14px'}" placeholder="字体大小px" name="">

            <a title="文字间距" class="ex-btn"><i class="iconfont icon-textwidth"></i></a>
            <input mt-wheel="0,1,100" id="exFontSpace" class="mt-input" mt-type='px' type="text" value="${getStyle(obj.data.fontStyle, 'letter-spacing') || 0}" placeholder="文字间距" name="">

            <a title="文字行高" class="ex-btn"><i class="iconfont icon-textheight"></i></a>
            <input mt-wheel="0,1,1000" id="exFontLineHeight" class="mt-input" mt-type='px' type="text" value="${getStyle(obj.data.fontStyle, 'line-height') || '21px'}" placeholder="文字行高" name="">
        </div>
        <div class="ex-text-edit">
            <div style="${obj.data.fontStyle}" id="exTextEdit" contenteditable="true">
                ${obj.data.data}
            </div>
        </div>
    </div>`;
    return str;
}