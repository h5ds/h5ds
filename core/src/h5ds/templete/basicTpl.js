import { AppDataChange } from '../common/AppDataFun.js';

// 基础set的模板
export function basicTpl(obj) {
    return `
    <div class="set-baisc">
        <div class="tr set-basic-tips">
            <span><em>图层ID</em> <input id="basicTpl_set_id" class="mt-input" value="${obj.id}" type="" placeholder="字母" ></span>
            <span><i>（id用于设置交互，默认为空）</i></span>
        </div>
		<div class="tr">
			<span><em>x坐标</em> <input mt-wheel="0,1,10000" id="basicTpl_set_x" mt-type="px" class="mt-input" value="${obj.x}" type="" placeholder="x坐标"></span>
			<span><em>y坐标</em> <input mt-wheel="0,1,10000" id="basicTpl_set_y" mt-type="px" class="mt-input" value="${obj.y}" type="" placeholder="y坐标"></span>
		</div>
		<div class="tr">
			<span><em>宽度</em> <input mt-wheel="0,1,10000" id="basicTpl_set_width" mt-type="px" mt-min="0" class="mt-input" value="${obj.width}" type="" placeholder="宽" ></span>
			<span><em>高度</em> <input mt-wheel="0,1,10000" id="basicTpl_set_height" mt-type="px" mt-min="0" class="mt-input" value="${obj.height}" type="" placeholder="高" ></span>
        </div>
	</div>
`
}

// 给set模板赋值
export function asyncBasic(style) {
    let { top, left, height, width } = style;
    $('#basicTpl_set_x').val(left);
    $('#basicTpl_set_y').val(top);
    $('#basicTpl_set_height').val(height);
    $('#basicTpl_set_width').val(width);
}

// 同时设置 DOM，self 的值
export function domDataBindSelf(obj, self) {
    if(!AppData.edit.layerDom) {
        return false;
    }
    for (var key in obj) {
        self.layer.style[key] = obj[key];
    }
    AppData.edit.layerDom.css(obj);
    AppDataChange();
}

// 事件绑定
export function basicEvent(self) {

    // 设置 id
    $('#basicTpl_set_id').off('change').on('change', function(e) {
        let val = $(this).val();
        if(val && !/^[a-zA-Z_]\w+$/.test(val)) {
            $.tip({
                msg: 'id格式错误，id必须是字母开头且由字母，下划线组成', //
                type: 'danger', //success,danger,warning
                time: 3000 //
            });
            return;
        }
        if(!AppData.edit.layerDom) {
            return false;
        }
        self.layer.id = val;
        AppDataChange();
    });

    // 设置 x
    $('#basicTpl_set_x').off('changes').on('changes', function(e) {
        let val = $(this).val();
        domDataBindSelf({
            left: parseInt(val, 10) + 'px'
        }, self);
    });

    // 设置 y
    $('#basicTpl_set_y').off('changes').on('changes', function(e) {
        let val = $(this).val();
        domDataBindSelf({
            top: parseInt(val, 10) + 'px'
        }, self);
    });

    // 设置 width
    $('#basicTpl_set_width').off('changes').on('changes', function(e) {
        let val = $(this).val();
        domDataBindSelf({
            width: parseInt(val, 10) + 'px'
        }, self);
    });

    // 设置 height
    $('#basicTpl_set_height').off('changes').on('changes', function(e) {
        let val = $(this).val();
        domDataBindSelf({
            height: parseInt(val, 10) + 'px'
        }, self);
    });
}