import Layer from '../../core/layer';
import { imgTpl, initCrop } from '../../templete/imgTpl'; //图片模版 。。
import { AppDataChange, setLayerClass } from '../../common/AppDataFun.js';
import { blankImg } from '../../conf/set';

// layer 模板
export function imgDom(obj) {
    return `
    <div id="${obj.id || ''}" data-uefun="${obj.ue ? $.escape(obj.ue) : ''}" class="layer layer-img" style="${$.toStyle(obj.style)}">
        <div class="element" style="${$.toStyle(obj.estyle, obj.animate)}"><img src="${obj.data.src || 'none'}" /></div>
    </div>`;
}

// layer 原始数据, 用于保存在 AppData里面的数据
export class ImgLayer {
    constructor(animate, data, estyle, style, type, typename) {
        this.animate = animate || [];
        this.data = data || {
            src: blankImg
        };
        this.estyle = estyle || {};
        this.style = style || {
            width: '200px',
            height: '160px',
            top: '10px',
            left: '10px',
            'z-index': 9999
        };
        this.type = type || 'img';
        this.color = 'none';
        this.ue = null;
        this.typename = typename || '图片';
    }
}

// Img 类，主要是一些方法实现
export default class Img extends Layer {
    constructor(layer) {
        super(layer);
        this.$crop = null;
    }

    cropBack(method, val) {
        console.log(method, val);

        if(!val) {
            return;
        }

        // 控制重新设置尺寸的参数
        let imgDom = false;
        if(AppData.edit.layerDom.find('img').attr('src').indexOf('imgDom') !== -1) {
            imgDom = true;
        }

        if (method === 'crop') {
            // 剪切后 重新设置 img 的src
            AppData.edit.layerDom.find('img').attr('src', this.layer.data.src);
        } else if (method === 'reset') {
            // ... 重置图片
            AppData.edit.layerDom.find('img').attr('src', this.layer.data.src);
        } else if (method === 'delete') {
            // 删除图片，在 initCrop 里面已经做了处理了
        } else if (method === 'select') {
            // 重新设置尺寸, 如果第一次是替代图片，选中图片后，自动设置尺寸，如果是已有的图，不设置尺寸
            if(imgDom) {
                let img = new Image();
                img.src = val;
                AppData.edit.layerDom.css({
                    width: img.naturalWidth,
                    height: img.naturalHeight
                });
                $('#basicTpl_set_width').val(img.naturalWidth + 'px');
                $('#basicTpl_set_height').val(img.naturalHeight + 'px');
                this.layer.style.width = img.naturalWidth + 'px';
                this.layer.style.height = img.naturalHeight + 'px';
            }
        
            AppData.edit.layerDom.find('img').attr('src', val);

            // 重新设置layer 对象
            this.layer.data.src = val;

        }
        // 重新渲染页面
        AppDataChange();
    }

    // 事件绑定
    initEvent() {
        // 图片剪切, 因为事件绑定，被外部函数所引用，形成闭包，内存无法释放。以后这里需要做优化
        this.$crop = initCrop(this, $('#setStyle').find('.set_img_crop'), {}, this.cropBack.bind(this));

    }

    // 模板
    render() {

        let self = this;

        // 图片模板
        let imgTpls = imgTpl({
            src: self[self.className].data.src || ''
        })
        var { basicTpls, bgColorTpls, basicMoreTpls } = this._getSetBoxTpl();

        // 编辑区域
        $('#setStyle').html(basicTpls + imgTpls + bgColorTpls + basicMoreTpls);
    }

    // 初始化
    init() {

        // 初始化 公用模块
        this._init();

        // 控制tab head 显示隐藏
        // this.setLayerTabHead();

        // 初始化设置区域
        this.render();

        // 设置区域事件绑定，事件绑定在 render 之后执行
        this._initEvent();
        this.initEvent();

        // console.log('layer::img 11 =>', this);
        setLayerClass(this);

    }

}