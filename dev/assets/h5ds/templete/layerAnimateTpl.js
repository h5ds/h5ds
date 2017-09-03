import g from '../conf/global'; //
import { AppDataChange } from '../common/AppDataFun.js';

// 动画类型转换
function animateType(type){
    console.log(type)
    switch(type) {
        case 'in':
            type = '进入';
            break;
        case 'out':
            type = '离开';
            break;
        default:
            type = '强调';
            break;
    }
    return type;
}

// 动画类型转换 反
function animateTypeUn(type) {
    switch(type) {
        case '进入':
            type = 'in';
            break;
        case '离开':
            type = 'out';
            break;
        default:
            type = 'em';
            break;
    }
    return type;
}

// 设置layer 的动画的 列表
function tplAnimateHTML( obj ) {
    if( obj === undefined ) {
        // 添加动画，默认设置的动画
        obj = {  // 添加动画，默认的动画
            animate: 'fadeIn',
            name: 'fade in',
            type: 'in',
            time: '1s',
            delay: '0s',
            count: '1',
            fun: 'ease'
        };
    }

    obj.type = animateType(obj.type);
    return `<li class="animation-item" data-animate="${obj.animate}" data-type="${obj.type}" data-name="${obj.name}">
                <span class="tname">
                    <span data-title="${obj.type}：${obj.name}" class="animation-name">${obj.type}:${obj.name}</span>
                </span>
                <span class="ttime">
                    <input mt-wheel="0,0.1,10000" data-type="time" class="animation-time mt-input" mt-type="s" type="text" value="${obj.time}">
                </span>
                <span class="tdelay">
                    <input mt-wheel="0,0.1,10000" data-type="delay" class="animation-delay mt-input" mt-type="s" type="text" value="${obj.delay}"> 
                </span>
                <span class="tcount">
                    <input data-type="count" class="animation-count mt-input" mt-type="" type="text" mt-wheel="1,1,10000" value="${obj.count}"> 
                </span>
                <span class="tfun">
                    <div class="mt-select">
                        <select class="animation-fun" data-type="fun" placeholder="函数">
                            <option ${obj.fun === 'ease' ? 'selected' : ''} value="ease">默认</option>
                            <option ${obj.fun === 'linear' ? 'selected' : ''} value="linear">匀速</option>
                            <option ${obj.fun === 'ease-in' ? 'selected' : ''} value="ease-in">加速</option>
                            <option ${obj.fun === 'ease-out' ? 'selected' : ''} value="ease-out">减速</option>
                            <option ${obj.fun === 'ease-in-out' ? 'selected' : ''} value="ease-in-out">起始慢</option>
                        </select>
                    </div>
                </span>
                <!--<input data-type="fun" class="animation-fun mt-input" mt-type="" type="text" value="${obj.fun}">-->
                <a class="animation-delete"><i class="iconfont icon-close"></i></a>
            </li>`;
}

// 设置动画
function setAnimate(self) {
    // 设置 layer 动画属性
    // animation: name duration timing-function delay iteration-count direction fill-mode play-state;
    let arr = [];
    $('#animationList').find('li').each( function() {
        let $that = $(this);
        let obj = {};
        let $name = $that.find('.animation-name');

        // 设置点击对象的值
        obj['animate'] = $that.attr('data-animate');
        obj['name'] = $that.attr('data-name');
        obj['type'] = $that.attr('data-type');
        obj['time'] = $that.find('.animation-time').val();
        obj['delay'] = $that.find('.animation-delay').val();
        obj['count'] = $that.find('.animation-count').val();
        obj['fun'] = $that.find('.animation-fun').val();

        arr.push({
            name: obj.name,
            type: animateTypeUn(obj.type),
            style: `${obj.animate} ${obj.time} ${obj.fun} ${obj.delay} ${obj.count} normal forwards running`
        });
    });

    // table 标题显示
    if(arr.length === 0) {
        $('.animate-title').hide();
    }else {
        $('.animate-title').show();
    }

    // 设置 edit 对象里面的临时变量 -> 动画
    if(AppData.edit.layerDom) {
        AppData.edit.layerDom.addStyle({
            animate: arr
        });
    }

    // 设置 layer 对象
    self.layer.animate = arr;
    AppDataChange();
}

// 设置动画 的设置区域
export function setAnimateList(self) {
    let $animationList = $('#animationList');
    let timeMax = 0; // 动画时间加上延时时间
    let anim = self.layer.animate;
    // console.log('>>>>',anim);
    if( $.isArray(anim) && anim.length > 0 ) {
        let shtml = '';
        for( let i = 0; i < anim.length; i++) {
            let d = anim[i];
            let style = d.style.replace(/\s+/, ' ');
            let name = d.name;
            let type = d.type;
            // zoomIn 1s ease 2s 1 normal forwards running
            let sArr = style.split(' ');
            let animate = sArr[0], 
                time = sArr[1], 
                fun = sArr[2], 
                delay = sArr[3], 
                count = sArr[4];

            let timeAll = parseInt(time, 10) + parseInt(delay, 10);
            if( timeMax < timeAll) {
                timeMax = timeAll;
            }

            shtml += tplAnimateHTML({
                animate: animate, 
                name: name, 
                type: type, 
                fun: fun, 
                time: time, 
                delay: delay, 
                count: count
            });

        } // end for	
        $('.animate-title').show();
        $animationList.html(shtml);
    }else {
        $('.animate-title').hide();
        $animationList.empty();
    }
}

// 动画列表 的事件
export function animateEvent(self) {
    let $animationList = $('#animationList');

    // 动画排序 uniqend
    $animationList.off('uniqend').on('uniqend', function(e, obj) {
        // console.log('>>>>>>>>>', obj);
        setAnimate(self);
    });

    // 选中动画 li标签
    $animationList.off('click.animationItem').on('click.animationItem', '.animation-item', function(e) {
        e.stopPropagation();
        let $this = $(this);

        $this.addClass('active').siblings().removeClass('active');
        // // 设置点击对象的值
        self.$selectAnimateDom = $this;

    });

    // 删除动画
    $animationList.off('click.animationDelete').on('click.animationDelete', '.animation-delete', function(e) {
        e.stopPropagation();
        $(this).closest('.animation-item').remove();
        // 重新设置 layer动画 dom, obj
        setAnimate(self);
    });

    // 选择动画
    $('#animatesList').off('click.liDataAniamte').on('click.liDataAniamte', "li[data-animate]", function(e){
        e.stopPropagation();
        if( !self.$selectAnimateDom ) {
            $.tip({
                msg: '请先添加动画，或选择动画列表！',
                type: 'danger'
            });
            return;
        }

        // 保留原来的时间，延迟，次数
        let old = {};
        old.time = self.$selectAnimateDom.find('.animation-time').val();
        old.delay = self.$selectAnimateDom.find('.animation-delay').val();
        old.count = self.$selectAnimateDom.find('.animation-count').val();
        old.fun = self.$selectAnimateDom.find('.animation-fun').val();

        let animate = $(this).data('animate');
        let name = $(this).data('name');
        let type = $(this).data('type');
        let time = $(this).data('time');
        let delay = $(this).data('delay');
        let count = $(this).data('count');
        let fun = $(this).data('fun');

        // 初始化 动画 li 区域
        self.$selectAnimateDom.attr('data-animate', animate);
        self.$selectAnimateDom.attr('data-name', name);
        self.$selectAnimateDom.attr('data-type', type);
        self.$selectAnimateDom.find('.animation-time').val( old.time || time);
        self.$selectAnimateDom.find('.animation-delay').val( old.delay || delay);
        self.$selectAnimateDom.find('.animation-count').val( old.count || count);
        self.$selectAnimateDom.find('.animation-fun').val( old.fun || fun);

        // 设置名字
        type = animateType(type);
        self.$selectAnimateDom.find('.animation-name').attr('data-title', type + ':' + name).html(type + ':' + name);

        // 重新设置 layer动画 dom, obj
        setAnimate(self);

    });

    // 修改动画参数
    $animationList.off('changes.input').on('changes.input', 'input', function(e, val) {
        e.stopPropagation();
        setAnimate(self);
    });

    // 选择动画函数
    $animationList.off('change.animateFun').on('change.animateFun', '.animation-fun', function(e, val) {
        e.stopPropagation();
        setAnimate(self);
    });

    // 添加动画
    $('#animationAdd').off('click').on('click', function(e) {
        e.stopPropagation();
        $('#animationList').append(tplAnimateHTML());
        $('#animationList').find('li').last().trigger('click.animationItem');
        setAnimate(self);
    });
}