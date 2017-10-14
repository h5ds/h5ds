import { borderFilter, boxshadowFilter, setBoxshadow, setBorder } from '../unit/cssFilter';
import { isNull } from '../unit/funs';
import { AppDataChange } from '../common/AppDataFun.js';

/* 拓展参数 */
const radiusMax = 500; // 圆角最大参数

export function basicMoreTpl(obj) {
    return `
	<div class="set-baiscmore">
		<div class="tr">
			<h5>旋转角度</h5>
			<div mt-bind="basicMoreTpl_rotate_input" id="basicMoreTpl_rotate" mt-filter="*360" class="mt-slider-bar" data-val="${parseInt(obj.rotate || 0, 10) / 360 || 0}"></div>
			<input mt-wheel="0,1,360" mt-bind="basicMoreTpl_rotate" id="basicMoreTpl_rotate_input" mt-filter="/360" mt-min="0" mt-max="360" mt-type="deg" mt-fixed="4" class="mt-input" value="${obj.rotate || 0}" placeholder="度数">
		</div>
		<div class="tr">
			<h5>圆角</h5>
			<div mt-bind="basicMoreTpl_radius_input" mt-filter="*${radiusMax}" id="basicMoreTpl_radius" class="mt-slider-bar" data-val="${parseInt(obj.radius || 0, 10) / radiusMax || 0}"></div>
			<input mt-wheel="0,1,${radiusMax}" mt-fixed="5" mt-bind="basicMoreTpl_radius" mt-filter="/${radiusMax}" id="basicMoreTpl_radius_input" class="mt-input" mt-type="px" mt-min="0" mt-max="${radiusMax}" value="${obj.radius || 0}">
		</div>
		<div class="tr">
			<h5>透明度</h5>
			<div mt-bind="basicMoreTpl_opacity_input" id="basicMoreTpl_opacity" class="mt-slider-bar" data-val="${ isNull(obj.opacity) ? 1 : obj.opacity }"></div>
			<input mt-wheel="0,0.1,1" mt-bind="basicMoreTpl_opacity" id="basicMoreTpl_opacity_input" class="mt-input" mt-type="" mt-min="0" mt-max="1" value="${obj.opacity}">
        </div>
        <div class="tr">
            <h5>隐藏元素</h5>
            <div id="basicMoreTpl_hide_layer" class="mt-switch" data-val="${ obj.display === 'none' ? 'on' : 'off'}">
                <a class="mt-switch-btn"></a>
            </div>
        </div>
		<div class="tr">
			<h5>开启阴影</h5>
			<div id="basicMoreTpl_boxshadow_switch" data-toggle='[{"dom":"#basicMoreTpl_boxshadowStyleId","class":"show"}]' class="mt-switch" data-val="${ isNull(obj.boxshadow) ? 'off' : 'on'}">
				<a class="mt-switch-btn"></a>
			</div>
		</div>
		<div class="tr${ !isNull(obj.boxshadow) ? ' show' : ' '}" id="basicMoreTpl_boxshadowStyleId" style="display: none;">
			<h5>阴影设置</h5>
			<div mt-bind="basicMoreTpl_boxshadow_input" mt-filter="*100" id="basicMoreTpl_boxshadow" class="mt-slider-bar" data-val="${parseInt( isNull(obj.boxshadow) ? 10 : obj.boxshadow, 10) / 100}"></div>
			<input mt-wheel="0,1,100" mt-fixed="2" mt-bind="basicMoreTpl_boxshadow" mt-filter="/100" id="basicMoreTpl_boxshadow_input" class="mt-input" mt-type="px" mt-min="0" mt-max="100" value="${ isNull(obj.boxshadow) ? '10px' : obj.boxshadow}">
			<div class="tr">
				<h5>阴影颜色</h5>
				<div class="mt-color" id="basicMoreTpl_boxshadowColor">
					<input id="basicMoreTpl_boxshadowColor_input" type="color" value="${obj.boxshadowColor || '#000'}"/>
					透明度：<div id="basicMoreTpl_boxshadowOpactity" style="width:95px" class="mt-slider-bar" data-val="${ isNull(obj.boxshadowOpacity) ? 1 : obj.boxshadowOpacity}"></div>
					<a class="mt-color-clear"><i class="iconfont icon-eraser"></i>清除</a>
				</div>
			</div>
		</div>
		<div class="tr">
			<h5>开启边框</h5>
			<div id="basicMoreTpl_border_switch" data-toggle='[{"dom":"#basicMoreTpl_borderStyleId","class":"show"}]' class="mt-switch" data-val="${ isNull(obj.borderSize) ? 'off' : 'on'}">
				<a class="mt-switch-btn"></a>
			</div>
		</div>
		<div class="tr${ !isNull(obj.borderSize) ? ' show' : ' '}" id="basicMoreTpl_borderStyleId" style="display:none">
			<h5>边框类型</h5>
			<div class="mt-select">
				<select id="basicMoreTpl_borderStyle" value="${obj.borderType || 'solid'}" placeholder="下拉选择">
					<option value="solid">实线</option>
					<option value="double">双线</option>
					<option value="dashed">虚线</option>
					<option value="dotted">点线</option>
				</select>
			</div>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<h5>边框大小</h5>
			<input mt-wheel="1,1,10000" id="basicMoreTpl_borderSize" class="mt-input" mt-type="px" mt-min="1" value="${obj.borderSize || '10px'}" type="" name="">
			<div class="tr">
				<h5>边框颜色</h5>
				<div class="mt-color">
					<input id="basicMoreTpl_borderColor" type="color" value="${obj.borderColor || '#000'}"/>
					透明度：<div style="width:95px" id="basicMoreTpl_borderOpactiy" class="mt-slider-bar" data-val="${isNull(obj.borderOpacity) ? 1 : obj.borderOpacity}"></div>
					<a class="mt-color-clear"><i class="iconfont icon-eraser"></i>清除</a>
				</div>
			</div>
		</div>
	</div>
`
}

// 设置 set 里面的 rotate 滚动条和输入框参数
export function asyncRotate(style) {
    console.log(style);
    let rotate = $.getTransform(style.transform, 'rotate');
    let $rotate = $('#basicMoreTpl_rotate').attr('data-val', parseInt(rotate, 10) / 360);
    $('#basicMoreTpl_rotate_input').val(rotate + 'deg');
    setSilderVal($rotate);
}

// dom: layer, element 对应设置的对象
export function setLayerDomAndObj(dom, obj, self, nochange) {

    // 特殊情况不设置layerDom
    if(!AppData.edit.layerDom) {
        return;
    }

    // 先设置 self 属性
    for (let key in obj) {
        if (obj[key] !== '') {
            if (dom === 'element') {
                self.layer.estyle[key] = obj[key];
            } else {
                self.layer.style[key] = obj[key];
            }
        } else { // 删除对应的 self.style[key]
            // self.style['configurable'] = true; // 严格模式下需要设置
            if (dom === 'element') {
                delete self.layer.estyle[key];
            } else {
                delete self.layer.style[key];
            }
        }
    }

    // 设置 dom
    if (dom === 'element') {
        AppData.edit.layerDom.find('.element').css(obj);
    } else {
        AppData.edit.layerDom.css(obj);
    }

    //监听变化
    if (!nochange) {
        AppDataChange();
    }

}

// 事件
export function baiscMoreEvent(self) {

    // 旋转的 slider
    $('#basicMoreTpl_rotate').off('change').on('change', function(e, val) {

        // 迭代中可能出现BUG，如果 transform 用了其他的值，比如 scale , translate 等 这里就不能这样处理.需要用到矩阵
        // 设置 dom
        setLayerDomAndObj('layer', {
            transform: `rotate(${val * 360}deg)`
        }, self);

    });

    // 旋转的 input
    $('#basicMoreTpl_rotate_input').off('change input').on('change input', function(e) {

        let val = parseInt($(this).val(), 10);

        // 迭代到后面，如果要对transform 进行扩展，中可能出现BUG，如果 transform 用了其他的值，比如 scale , translate 等 这里就不能这样处理 可以使用 矩阵
        // 设置 dom
        setLayerDomAndObj('layer', {
            transform: `rotate(${val}deg)`
        }, self)
    });

    // 圆角的 slider
    $('#basicMoreTpl_radius').off('change').on('change', function(e, val) {
        // console.log('~~~~~', val);
        // 设置 dom
        setLayerDomAndObj('element', {
            'border-radius': val * radiusMax + 'px'
        }, self);

    });

    // 圆角的 Input
    $('#basicMoreTpl_radius_input').off('change input').on('change input', function(e) {
        let val = parseInt($(this).val(), 10);
        // console.log('>>>>', val);
        // 设置 DOM
        setLayerDomAndObj('element', {
            'border-radius': val + 'px'
        }, self)

    });

    // 透明度 slider
    $('#basicMoreTpl_opacity').off('change').on('change', function(e, val) {
        // 设置 DOM
        setLayerDomAndObj('element', {
            'opacity': val
        }, self)

    });

    // 透明度 Input
    $('#basicMoreTpl_opacity_input').off('change input').on('change input', function(e) {
        let val = $(this).val();

        setLayerDomAndObj('element', {
            'opacity': val
        }, self)

    });

    // 开启阴影
    $('#basicMoreTpl_boxshadow_switch').off('change').on('change', function(e, val) {
        if (val) {
            val = '0 0 10px rgba(0,0,0,0.5)';
            setLayerDomAndObj('element', {
                'box-shadow': val
            }, self)
        } else {
            setLayerDomAndObj('element', {
                'box-shadow': ''
            }, self)
        }
    });

    // 阴影 slider - size
    $('#basicMoreTpl_boxshadow').off('change').on('change', function(e, val) {

        // 数据过滤
        val = parseInt(val * 100, 10);
        val = setBoxshadow(self.layer.estyle['box-shadow'], { size: val + 'px' });

        setLayerDomAndObj('element', {
            'box-shadow': val
        }, self)

    });

    // 阴影  Input
    $('#basicMoreTpl_boxshadow_input').off('change').on('change', function(e) {

        let val = $(this).val();
        val = parseInt(val, 10);
        val = setBoxshadow(self.layer.estyle['box-shadow'], { size: val + 'px' });

        setLayerDomAndObj('element', {
            'box-shadow': val
        }, self)

    });

    // 阴影 颜色
    $('#basicMoreTpl_boxshadowColor_input').off('change').on('change', function(e) {
        let val = $(this).val();
        val = setBoxshadow(self.layer.estyle['box-shadow'], { color: val });

        setLayerDomAndObj('element', {
            'box-shadow': val
        }, self)

    });

    // 阴影 透明度
    $('#basicMoreTpl_boxshadowOpactity').off('change').on('change', function(e, val) {
        val = setBoxshadow(self.layer.estyle['box-shadow'], { opacity: val });

        setLayerDomAndObj('element', {
            'box-shadow': val
        }, self)
    });

    // 开启边框
    $('#basicMoreTpl_border_switch').off('change').on('change', function(e, val) {
        if (val) {
            val = '10px solid rgba(0,0,0,1)';
            setLayerDomAndObj('element', {
                'border': val
            }, self)
        } else {
            setLayerDomAndObj('element', {
                'border': ''
            }, self)
        }
    });

    // 边框 大小 input
    $('#basicMoreTpl_borderSize').off('change').on('change', function(e) {

        let val = $(this).val();
        val = parseInt(val, 10);
        val = setBorder(self.layer.estyle['border'], { size: val + 'px' });

        setLayerDomAndObj('element', {
            'border': val
        }, self)

    });

    // 边框 颜色
    $('#basicMoreTpl_borderColor').off('change').on('change', function(e) {
        let val = $(this).val();
        val = setBorder(self.layer.estyle['border'], { color: val });

        setLayerDomAndObj('element', {
            'border': val
        }, self)

    });

    // 边框类型
    $('#basicMoreTpl_borderStyle').off('change').on('change', function(e) {
        let val = $(this).val();
        val = setBorder(self.layer.estyle['border'], { type: val });
        setLayerDomAndObj('element', {
            'border': val
        }, self)

    });

    // 边框 透明度
    $('#basicMoreTpl_borderOpactiy').off('change').on('change', function(e, val) {

        val = setBorder(self.layer.estyle['border'], { opacity: val });

        setLayerDomAndObj('element', {
            'border': val
        }, self)

    });

    // 隐藏元素
    $('#basicMoreTpl_hide_layer').off('change').on('change', function(e, val) {
        setLayerDomAndObj('layer', {
            display: val ? 'none' : 'block'
        }, self)
    });

}