// 过滤 border  1px solid rgba(0,0,0,0.5)
export function borderFilter(border) {
    if(border) {
        let arr = border.split(' ');
        return {
            size: arr[0],
            type: arr[1],
            color: arr[2].colorHex() || '#000000',
            opacity: arr[2].colorOpacity() || 1
        }
    }else {
        // 如果没有 border
        // console.log('cssFilter.js borderFilter() => ', border);
        return {
            size: null,
            type: null,
            color: null,
            opacity: null
        }
    }
}

// 设置 border 
export function setBorder(target, obj) {
    let exg = /(\d+(px)?\s)(\w+\s)(rgba\((\w+),(\w+),(\w+),(((1|0)?\.)?\d+)\))/;
    if(obj.size !== undefined) {
        target = target.replace(exg, obj.size + ' $3$4');
    }
    if(obj.color !== undefined){
        // 颜色转换
        let color = obj.color.colorRgba(1, true);
        target = target.replace(exg, '$1$3rgba('+color[0]+','+color[1]+','+color[2]+',$8)');
    }
    if(obj.opacity !== undefined){
        target = target.replace(exg, '$1$3rgba($5,$6,$7,'+obj.opacity+')');
    }
    if(obj.type !== undefined){
        target = target.replace(exg, '$1'+obj.type+' rgba($5,$6,$7,$8)');
    }
    return target;
}

// 过滤 box-shadow 0 0 5px rgba(0,0,0,.5)
export function boxshadowFilter(boxshadow){
    if(boxshadow) {
        let arr = boxshadow.split(' ');
        return {
            size: arr[2],
            color: arr[3].colorHex() || '#000000',
            opacity: arr[3].colorOpacity() || 1
        }
    }else {
        // console.log('cssFilter.js boxshadowFilter() => ', boxshadow);
        return {
            size: null,
            color: null,
            opacity: null
        }
    }
}

// 添加 boxshadow 属性  /(\d+(px)?\s){2}(\d+(px)?\s)((rgba\()(\w+)(,)(\w+)(,)(\w+)(,)((0\.)?\d+)\))/
// color传入 #000000 格式
export function setBoxshadow(target, obj) {
    let exg = /(\d+(px)?\s)(\d+(px)?\s)(\d+(px)?\s)(rgba\((\d+),(\d+),(\d+),(((1|0)?\.)?\d+)\))/;
    if(obj.size !== undefined) {
        target = target.replace(exg, '$1$3'+obj.size+' $7');
    }
    if(obj.color !== undefined){
        // 颜色转换
        let color = obj.color.colorRgba(1, true);
        target = target.replace(exg, '$1$3$5rgba('+color[0]+','+color[1]+','+color[2]+',$11)');
    }
    if(obj.opacity !== undefined){
        target = target.replace(exg, '$1$3$5rgba($8,$9,$10,'+obj.opacity+')');
    }
    return target;
}

// 过滤 animation  animation: name duration timing-function delay iteration-count direction fill-mode play-state;
export function animationFilter(animation) {
    if(animation) {
        var arr = animation.split(' ');
    }else {
        return {
            name: null, // 动画名称
            duration: null, // 动画执行时间
            timing: null, // 动画速度曲线 linear,ease,ease-in,ease-out,ease-in-out, cubic-bezier(n,n,n,n) 贝塞尔
            delay: null, // 延迟执行
            count: null, // 播放次数
            direction: null, // 是否循环交替反向播放动画 normal: 正常播放， reverse：反向播放，alternate/alternate-reverse：动画在奇数/偶数次正向播放，在偶数/奇数次反向播放。
            fillMode: null, // 动画停留 none，forwards，backwards，both
            playState: null // 控制播放状态 paused，running
        }
    }
}

/**
 * 获取 opacity 透明度
*/
export function getOpacity(val) {
    if(val === undefined) {
        val = 1;
    }
    return val;
}

// export { borderFilter, boxshadowFilter, setBoxshadow , setBorder };