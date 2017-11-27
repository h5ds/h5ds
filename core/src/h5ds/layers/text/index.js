import './style.scss';
import Layer from '../../core/layer';
import { setTpl } from './setTpl'; // 图片模版 。。
import * as font from './fun'; // 设置文本样式
import { filterTxt } from '../../unit/filterTxt';
import { AppDataChange, setLayerClass } from '../../common/AppDataFun.js';

// layer 模板
export function textDom(obj) {
    let shtml = '';
    let d = obj.data;
    if(d.data) {
        shtml = `<div class="el-text" style="${d.fontStyle}">${d.data}</div>`
    }
    return `
    <div id="${obj.id || ''}" data-uefun="${obj.ue ? $.escape(obj.ue) : ''}" class="layer layer-text" style="${$.toStyle(obj.style)}">
        <div class="element" style="${$.toStyle(obj.estyle, obj.animate)}">
            ${shtml || '<div>请输入文本内容</div>'}
        </div>
    </div>`;
}

// layer 原始数据
export class TextLayer {
    constructor(animate, data, estyle, style, type, typename) {
        this.animate = animate || [];
        this.data = {
            data: '<div>请输入文本内容</div>',
            fontStyle: ''
        };
        this.estyle = estyle || {};
        this.style = style || {
            width: '200px',
            height: '160px',
            top: '10px',
            left: '10px',
            'z-index': 9999
        };
        this.ue = null;
        this.type = type || 'text';
        this.typename = typename || '文本';
    }
}

export default class Text extends Layer {
    constructor(layer) {
        super(layer);
    }

    // 事件绑定
    initEvent() {
        let self = this;
        let $exTextEdit = $('#exTextEdit');

        // 自定义事件
        $exTextEdit.off('keyup').on('keyup', function (e) {
            // 复制内
            if(e.ctrlKey && e.keyCode === 86) {
                e.stopPropagation();
                $(this).trigger('edit', 'copy');
            }else {
                $(this).trigger('edit');
            }
        });

        // 变化事件监听
        // console.log('绑定');
        $exTextEdit.off('edit').on('edit', function (e, copy) {
            let $this = $(this);
            let style = $this.attr('style');
            let sHtml = '';

            // 如果是复制内容, 自动清除格式
            if(copy) {
                $this.removeAttr('style').find('span').removeAttr('style');
            }
            sHtml = $this.html();
            let eHtml = `<div style="${style}" class="el-text">${sHtml}</div>`;
            // console.log('$$$$', style);
            // 重新设置layer 对象
            self.layer.data.data = sHtml;
            self.layer.data.fontStyle = style;
            // 设置 self
            AppData.edit.layerDom.find('.element').html(eHtml);
            AppDataChange();
        });

        // 字体颜色
        $('#exZiTiYanSe').off('change').on('change', function(e) {
            $exTextEdit.css('color', e.target.value);
            $exTextEdit.trigger('edit');
        });

        // 字体背景色
        // $('#exFontBg').off('change').on('change', function(e) {
        //     // 字体
        //     $exTextEdit.find('.txt').css('background-color', e.target.value);
        //     $exTextEdit.trigger('edit');
        // });

        // 字体大小
        $('#exFontSize').off('changes').on('changes', function(e) {
            // 字体
            $exTextEdit.css('font-size', e.target.value);
            $exTextEdit.trigger('edit');
        });

        // 字体间距
        $('#exFontSpace').off('changes').on('changes', function(e) {
            $exTextEdit.css('letter-spacing', e.target.value);
            $exTextEdit.trigger('edit');
        });

        // 字体行高
        $('#exFontLineHeight').off('changes').on('changes', function(e) {
            $exTextEdit.css('line-height', e.target.value);
            $exTextEdit.trigger('edit');
        });

        // 样式调试
        $('#exTextBtns').off('click').on('click', '.ex-btn', function (e) {
            let key = $(this).attr('data-fun');
            let $el = $exTextEdit;
            switch (key) {
                case 'bold': font.setBold($el); break;
                case 'italic': font.setOblique($el); break;
                case 'strikethrough': font.setFontLine($el, 'line-through'); break;
                case 'underline': font.setFontLine($el, 'underline'); break;
                case 'indent': font.fontDent($el, 'indent'); break;
                case 'dedent': font.fontDent($el, 'dedent'); break;
                case 'alignright': font.fontAlign($el, 'right'); break;
                case 'aligncenter': font.fontAlign($el, 'center'); break;
                case 'alignleft': font.fontAlign($el, 'left'); break;
                case 'eraser': font.clearStyle($el); break;
            }
            $exTextEdit.trigger('edit');
        });

    }

    // 模板
    render() {
        // 图片模板
        let tpls = setTpl(this);
        let { basicTpls, bgColorTpls, basicMoreTpls } = this._getSetBoxTpl();

        // 编辑区域
        $('#setStyle').empty().html(basicTpls + tpls + bgColorTpls + basicMoreTpls);
    }

    // 初始化
    init() {

        // 初始化 公用模块
        this._init();

        // 初始化设置区域
        this.render();

        // 设置区域事件绑定，事件绑定在 render 之后执行
        this._initEvent();
        this.initEvent();

        // console.log('layer::img 11 =>', this);
        setLayerClass(this);

    }

}