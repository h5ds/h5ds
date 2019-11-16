import tinycolor from 'tinycolor2';
import { util } from './util';

/**
 * @desc 将颜色转化成rgba格式
 * @param {string} color 需要转换的颜色
 * @param {string} defaultColor 默认的颜色，这里要rgba格式
 */
export function toRgba(color, defaultColor = 'rgba(255,255,255,1)') {
  if (color) {
    let c = tinycolor(color);
    let alpha = c.getAlpha();
    color = c.setAlpha(alpha).toRgbString();
  } else {
    color = defaultColor;
  }
  return color;
}

/**
 * @desc css 工具类。拆分了css, 提供了以下方法
 * 可以解析和设置 transform, border, box-shadow, animate 字符串
 */
class CssTool {
  /**
   * @desc 获取border对象。
   * @param {string} val eg: 1px solid rgba(0, 0, 0, 1)
   * @return {object} size, type, color
   */
  getBorder(val) {
    let size = null,
      type = null,
      color = null;
    if (val && val !== 'none') {
      let arr = val.split(' ');
      return {
        size: parseInt(arr[0], 10),
        type: arr[1],
        color: toRgba(val.replace(/.+(rgba.+)/, '$1'))
      };
    }
    return { size, type, color };
  }

  /**
   * @desc 设置border
   * @param {string} oval 之前的样式，eg: 1px solid rgba(0,0,0,1)
   * @param {object} data 当前数据 {size, type, color }
   * @return {string} 返回最新的样式
   */
  setBorder(oval, data) {
    let { size, type, color } = this.getBorder(oval);
    if (!util.isEmpty(data.size)) {
      size = data.size;
    }
    if (!util.isEmpty(data.type)) {
      type = data.type;
    }
    if (!util.isEmpty(data.color)) {
      color = toRgba(data.color);
    }
    return `${size}px ${type} ${color}`;
  }

  /**
   * @desc 获取boxshadow对象。 css获取到的数据是这样的：rgba(0, 0, 0, 0.5) 0px 0px 10px 0px
   * @param {string} val eg: 0 0 5px rgba(0,0,0,.5) 这个数据是layer.style 里面的
   * @return {object} size, color
   */
  getBoxshadow(val) {
    let size = null,
      color = null;
    if (val && val !== 'none') {
      let arr = val.split(' ');
      size = parseInt(arr[2], 10);
      color = toRgba(val.replace(/.+(rgba.+)/, '$1'));
    }
    return { size, color };
  }

  /**
   * @desc 设置boxshadow
   * @param {string} oval 之前的样式，eg: 1px solid rgba(0,0,0,1)
   * @param {object} data 当前数据 {size, color }
   * @return {string} 返回最新的样式
   */
  setBoxshadow(oval, data) {
    let { size, color } = this.getBoxshadow(oval);
    if (!util.isEmpty(data.size)) {
      size = data.size;
    }
    if (!util.isEmpty(data.color)) {
      color = toRgba(data.color);
    }
    return `0 0 ${size}px ${color}`;
  }

  /**
   * @desc 过滤animation  animation: name duration timing-function delay iteration-count direction fill-mode play-state;
   * @param {string} val
   * @return {object} {name, duration, timing, delay, count, direction: 'normal', fillMode: 'forwards', playState: 'running'}
   */
  getAnimation(val) {
    // fadeIn 1s ease 0s 1 normal forwards running
    let name = null, // 动画名称
      duration = null, // 动画执行时间
      timing = null, // 动画速度曲线 linear,ease,ease-in,ease-out,ease-in-out, cubic-bezier(n,n,n,n) 贝塞尔
      delay = null, // 延迟执行
      count = null, // 播放次数
      direction = null, // 是否循环交替反向播放动画 normal: 正常播放， reverse：反向播放，alternate/alternate-reverse：动画在奇数/偶数次正向播放，在偶数/奇数次反向播放。
      fillMode = null, // 动画停留 none，forwards，backwards，both
      playState = null; // 控制播放状态 paused，running
    if (val && val !== 'none') {
      let arr = val.split(' ');
      // console.log(arr);
      name = arr[0];
      duration = util.toFixed(arr[1], 1);
      timing = arr[2]; // 动画速度曲线
      delay = util.toFixed(arr[3], 1);
      count = isNaN(parseInt(arr[4], 10)) ? Infinity : parseInt(arr[4], 10);
      direction = arr[5] || 'normal';
      fillMode = arr[6] || 'forwards';
      playState = arr[7] || 'running';
    }
    return {
      name,
      duration,
      timing,
      delay,
      count,
      direction,
      fillMode,
      playState
    };
  }

  /**
   * @desc 设置animation
   * @param {string} oval 之前的样式，animation: name duration timing-function delay iteration-count direction fill-mode play-state;
   * @param {object} data 当前数据 { name, duration, timing, delay, count, direction, fillMode, playState}
   * @return {string} 返回最新的样式
   */
  setAnimation(oval, data) {
    let { name, duration, timing, delay, count, direction, fillMode, playState } = this.getAnimation(oval);
    if (!util.isEmpty(data.name)) {
      name = data.name;
    }
    if (!util.isEmpty(data.duration)) {
      duration = data.duration;
    }
    if (!util.isEmpty(data.timing)) {
      timing = data.timing;
    }
    if (!util.isEmpty(data.delay)) {
      delay = data.delay;
    }
    if (!util.isEmpty(data.count)) {
      count = isNaN(parseInt(data.count, 10)) ? Infinity : parseInt(data.count, 10);
    }
    if (!util.isEmpty(data.direction)) {
      direction = data.direction;
    }
    if (!util.isEmpty(data.fillMode)) {
      fillMode = data.fillMode;
    }
    if (!util.isEmpty(data.playState)) {
      playState = data.playState;
    }
    return `${name} ${util.toFixed(duration, 1)}s ${timing} ${util.toFixed(delay, 1)}s ${count === Infinity ? 'infinite' : count} ${direction} ${fillMode} ${playState}`;
  }

  /**
   * @desc 获取对应的值
   * @param {string} key eg: rotate
   * @param {string} transform transform eg: 'rotate(10deg) translate(100, 100) scale(2,2) skew(0,30deg)'
   */
  getTransformVal(transform, key) {
    let val = '';
    if (transform.indexOf(key) !== -1) {
      let exp = RegExp('.*' + key + '\\((.+?)\\).*');
      val = transform.replace(exp, '$1');
    }
    val = val.replace(/\s+/g, '');

    if (val === '') {
      switch (key) {
        case 'rotate':
          val = 0;
          break;
        case 'translate':
          val = '0,0';
          break;
        case 'scale':
          val = '1,1';
          break;
        case 'skew':
          val = '0,0';
          break;
      }
    }

    if (typeof val !== 'object') {
      val = util.toFixed(val, 2);
    } else {
      const [x, y] = val.split(',');
      val = [parseFloat(x), parseFloat(y)];
    }
    return val;
  }
  /**
   * @desc 获取Transform对象。 transform获取到的数据是这样的：rotate(10deg) translate(100, 100) scale(2) skew(0,30deg)
   * @param {string} val eg: rotate(10deg) translate(100px, 100px) scale(2)
   * @return {object} 对象
   */
  getTransform(val = '') {
    let rotate = null,
      translate = null,
      scale = null,
      skew = null;
    if (val && val !== 'none') {
      rotate = this.getTransformVal(val, 'rotate');
      translate = this.getTransformVal(val, 'translate');
      scale = this.getTransformVal(val, 'scale');
      skew = this.getTransformVal(val, 'skew');
    }
    if (typeof scale === 'number') {
      scale = [scale, scale];
    }
    return {
      rotate: rotate || 0,
      translate: translate || [0, 0],
      scale: scale || [1, 1],
      skew: skew || [0, 0]
    };
  }

  /**
   * @desc 设置 transform
   */
  setTransform(oval, data) {
    let { rotate, translate, scale, skew } = this.getTransform(oval);
    if (!util.isEmpty(data.rotate)) {
      rotate = data.rotate;
    }
    if (!util.isEmpty(data.translate)) {
      translate = data.translate;
    }
    if (!util.isEmpty(data.scale)) {
      scale = data.scale;
    }
    if (!util.isEmpty(data.skew)) {
      skew = data.skew;
    }

    let arr = [];
    if (!util.isEmpty(rotate)) {
      arr.push(`rotate(${rotate}deg)`);
    }
    if (!util.isEmpty(translate)) {
      arr.push(`translate(${translate.map(d => d + 'px').join(',')})`);
    }
    if (!util.isEmpty(scale)) {
      arr.push(`scale(${scale.join(',')})`);
    }
    if (!util.isEmpty(skew)) {
      arr.push(`skew(${skew.map(d => d + 'deg').join(',')})`);
    }
    return arr.join(' ');
  }

  /**
   * @desc 给target add transform
   * @param {jquery} target jquery对象
   * @param {object} styles {rotate: '10deg'} // 要带单位
   */
  resetTransform(target, styles) {
    try {
      let cstr = [];
      for (let key in styles) {
        cstr.push(`${key}(${styles[key]})`);
      }
      cstr = cstr.join(' ');
      target.css({
        '-webkit-transform': cstr,
        transform: cstr
      });
    } catch (e) {
      console.error('function:addTransform error！', e);
    }
  }
}

export const csstool = new CssTool();
