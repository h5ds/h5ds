import './style.scss';
import Layer from '../../core/layer';
import { setTpl } from './setTpl'; // 图片模版 。。
import * as font from './fun'; // 设置文本样式
import { filterTxt } from '../../unit/filterTxt';
import { AppDataChange, setLayerClass } from '../../common/AppDataFun.js';

// layer 模板
export function videoDom(obj) {
    let shtml = '';
    let d = obj.data;
    return `
    <div id="${obj.id || ''}" data-uefun="${obj.ue ? $.escape(obj.ue) : ''}" class="layer layer-text" style="${$.toStyle(obj.style)}">
        <div class="element" style="${$.toStyle(obj.estyle, obj.animate)}">
            ${obj.data}
        </div>
    </div>`;
}

// layer 原始数据
export class VideoLayer {
    constructor(animate, data, estyle, style, type, typename) {
        this.animate = animate || [];
        this.data = null;
        this.estyle = estyle || {};
        this.style = style || {
            width: '200px',
            height: '160px',
            top: '10px',
            left: '10px',
            'z-index': 9999
        };
        this.ue = null;
        this.type = type || 'video';
        this.typename = typename || '视频';
    }
}

export default class Video extends Layer {
    constructor(layer) {
        super(layer);
    }

    // 事件绑定
    initEvent() {
        let self = this;

        $('#videoUrl').on('change', function() {
            self.layer.data = $(this).val()
            AppData.edit.layerDom.find('.element').html($(this).val());
            AppDataChange();
        });
    }

    // 模板
    render() {
        // 模板
        let tpls = setTpl(this);
        let { basicTpls, bgColorTpls, basicMoreTpls } = this._getSetBoxTpl();

        // 编辑区域
        $('#setStyle').html(basicTpls + tpls + bgColorTpls + basicMoreTpls);
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