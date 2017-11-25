import g from '../conf/global'; //
import { bgColorTpl, initBgColor } from '../templete/bgColorTpl'; //背景色模版
import { basicTpl, basicEvent } from '../templete/basicTpl'; //基础模版
import { basicMoreTpl, baiscMoreEvent } from '../templete/basicMoreTpl'; // 拓展模版
import { initUeSet, setUeEvent } from '../ue/layerSetUeTpl'; // 交互
import { boxshadowFilter, borderFilter, getOpacity } from '../unit/cssFilter';
import { initControl } from '../common/layerFun'; // layer 的公用函数
import { AppDataChange, getViewDom } from '../common/AppDataFun.js';
import { setAnimateList, animateEvent } from '../templete/layerAnimateTpl';

//图层
class Layer {
    constructor(layer){
        this.className = 'layer';
        this.$selectAnimateDom = null; // 当前选中的animate
        // 方便修改layer 参数
        this.layer = layer;
    }

    // 获取当前的layer 类
    getLayer() {
        return this.layer;
    }

    // 获取当前的操作对象
    getDom() {
        return AppData.edit.layerDom;
    }

    // 获取当前的 viewDom
    getViewDom() {
        return getViewDom();
    }

    // 获取 index ...
    getIndex() {
        return $('.layerlist').find('.active').index();
    }

    //渲染layer，这里只设置 style
    _renderLayer() {
        AppData.edit.layerDom.setStyle({
            style: this.layer.style, 
            estyle: this.layer.estyle,
            animate: this.layer.animate
        });
        AppDataChange();
    }

    //公用的 set区域 模板
    _getSetBoxTpl() {
        let self = this;
        let { estyle, style } = this.layer;
        let bcolor = estyle['background-color'] || '';
        let transform = style['transform'] || '';
        
        // 背景模板
        let bgColorTpls = bgColorTpl({
            color: bcolor ? bcolor.colorHex() : 'initial',
            opacity: bcolor ? bcolor.colorOpacity() : 1
        }) 

        // x, y, height, width 模板
        let basicTpls = basicTpl({
            x: style.left,
            y: style.top,
            height: style.height,
            width: style.width,
            id: this.layer.id || ''
        });

        // 拓展模板 - 滚动条
        let boxshadow = boxshadowFilter(estyle['box-shadow']);
        let border = borderFilter(estyle['border']);
        let opacity = getOpacity(estyle['opacity']);
        let basicMoreTpls = basicMoreTpl({
            rotate: transform.transformValue('rotate'),
            opacity: opacity,
            display: (!style.display || style.display === 'block') ? 'block' : 'none',
            radius: estyle['border-radius'],
            boxshadow: boxshadow.size,
            boxshadowColor: boxshadow.color,
            boxshadowOpacity: boxshadow.opacity,
            borderSize: border.size,
            borderType: border.type,
            borderColor: border.color,
            borderOpacity: border.opacity
        })

        return {
            basicTpls: basicTpls,
            bgColorTpls: bgColorTpls,
            basicMoreTpls: basicMoreTpls
        }
    }

    //事件绑定
    _initEvent() {

        // ui 组件方法重新实例化
        initSlider();
        initSelectOne();

        // 绑定basic事件
        basicEvent(this);

        // 绑定拓展事件
        baiscMoreEvent(this);

        // 设置 背景色
        initBgColor( this, $('#setLayerBox'), () => {
            this._renderLayer();
        });

    }

    // 初始化
    _init() {

        // 设置名字
        $('#setLayerType').html(this.layer.typename + (AppData.edit.layerIndex + 1));

        // console.log('layer::layer 169 =>', this);
        // 动画设置区域
        setAnimateList(this);

        // ue 设置
        // 默认隐藏面板
        $('.setue-set-hide').removeClass('setue-set-show');
        initUeSet(this);
        
        // 事件绑定
        setUeEvent(this);

        // 动画列表事件
        animateEvent(this);

        // 实例化控制器
        initControl(this);
        
    }

}
export default Layer;