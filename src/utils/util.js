import { cloneDeep, debounce, isObject, throttle, uniq } from 'lodash';

import dayjs from 'dayjs';

const dateFormatPreset = {
  datetime: 'YYYY/MM/DD HH:mm:ss',
  date: 'YYYY/MM/DD',
  time: 'HH:mm:ss'
};

class Util {
  /**
   *
   * @desc   判断是否为URL地址
   * @param  {String} str
   * @return {Boolean}
   */
  isUrl(str) {
    return /https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
  }

  /**
   *
   * @desc   判断是否为手机号
   * @param  {String|Number} str
   * @return {Boolean}
   */
  isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
  }

  /**
   *
   * @desc   url参数转对象
   * @param  {String} url  default: window.location.href
   * @return {Object}
   */
  getUrlData(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    let data = null;
    if (r != null) {
      data = unescape(r[2]);
    }
    return data;
  }

  /**
   * @desc 数组去重
   */
  uniq(arr, param) {
    return uniq(arr, param);
  }

  /**
   * 深拷贝对象
   * @param {*} value 要拷贝的对象
   */
  cloneDeep(value) {
    return cloneDeep(value);
  }

  /**
   * @desc toJS
   * @param {object}
   * @return obj
   */
  toJS(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * 防抖函数，延迟一定时间后执行fn
   * @param {Function} func 实际要执行的方法
   * @param {number} wait 要延迟的毫秒数
   */
  debounce(func, wait) {
    return debounce(func, wait);
  }

  /**
   * 节流函数，保证func在一定时间内只执行1次。（如：水龙头，起到限速作用）
   * @param {Function} func 实际要执行的方法
   * @param {number} wait 限制在多少毫秒内执行一次
   */
  throttle(func, wait) {
    return throttle(func, wait);
  }

  /**
   * 将对象使用escape进行编码（支持对象和字符串）
   * @param {*} value
   */
  escape(value) {
    try {
      const str = isObject(value) ? JSON.stringify(value) : value;
      return window.escape(str);
    } catch (e) {
      return '';
    }
  }

  /**
   * 设置  本地缓存
   */
  setStorage(key, obj) {
    if (typeof obj === 'string') {
      window.localStorage.setItem(key, obj);
    } else {
      window.localStorage.setItem(key, JSON.stringify(obj));
    }
  }

  /**
   * 获取
   */
  getStorage(key) {
    let val = window.localStorage.getItem(key);
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }

  /**
   * 删除， 如果不传值，删除所有
   */
  clearStorage(key) {
    if (key) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.clear();
    }
  }

  /**
   * 设置  本地缓存
   */
  setSession(key, obj) {
    if (typeof obj === 'string') {
      window.sessionStorage.setItem(key, obj);
    } else {
      window.sessionStorage.setItem(key, JSON.stringify(obj));
    }
  }

  /**
   * 获取
   */
  getSession(key) {
    let val = window.sessionStorage.getItem(key);
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }

  /**
   * 删除， 如果不传值，删除所有
   */
  clearSession(key) {
    if (key) {
      window.sessionStorage.removeItem(key);
    } else {
      window.sessionStorage.clear();
    }
  }

  /**
   * 保留 n 位小数
   * @param {string|number} val 要处理的文本或数字
   * @param {number} n 要保留的小数位数
   */
  toFixed(value, n = 2) {
    if (value) {
      value = parseFloat(value);
      value = parseFloat(value.toFixed(n));
    } else {
      value = 0;
    }
    return value;
  }

  /**
   * 交换数组元素
   * @param {Array} arr 要交换元素的数组
   * @param {number} fromIdx 元素索引 1
   * @param {number} toIdx 元素索引 2
   */
  exchageArrayElem(arr, from, to) {
    [arr[to], arr[from]] = [arr[from], arr[to]];
  }

  /**
   * 移除数组元素（会在原数组上移除，并返回新数组）
   * @param {Array} arr 要移除元素的数组
   * @param {*} elem 要移除的元素
   * @returns 返回移除后新数组
   */
  removeArrayElement(arr, elem) {
    const idx = arr.indexOf(elem);
    if (idx >= 0) {
      arr.splice(idx, 1);
    }
    return this.cloneDeep(arr);
  }

  /**
   * 计算两个数字的加法，相对精确值
   * @param {number} num1
   * @param {number} num2
   */
  plus(num1, num2) {
    return +(num1 + num2).toFixed(10);
  }

  /**
   * 计算两个数字的减法，相对精确值
   * @param {*} num1
   * @param {*} num2
   */
  minus(num1, num2) {
    return +(num1 - num2).toFixed(10);
  }

  /**
   * 格式化日期时间
   * @param {Date} date 要格式化的日期，默认为当期时间
   * @param {string} format 具体的format，提供datetime, date, time三个预设，其他格式请参考 dayjs / momentjs
   */
  formatDate(date = new Date(), format = 'datetime') {
    return dayjs(date).format(dateFormatPreset[format] || format);
  }

  /**
   * 生成随机数字
   * @param {number} min 最小值（包含）
   * @param {number} max 最大值（不包含）
   */
  randomNumber(min = 0, max = 100) {
    return Math.min(Math.floor(min + Math.random() * (max - min)), max);
  }

  /**
   * 生成随机颜色
   */
  randomColor() {
    return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
  }

  /**
   * 随机id ,长度默认是8
   */
  randomID(randomLength = 8) {
    return Number(
      Math.random()
        .toString()
        .substr(3, randomLength) + Date.now()
    ).toString(36);
  }

  /**
   * @desc 获取图片64 data， 和 imgLazy 配合使用
   * @param {string} src 图片资源地址
   * @param {object} obj 设置裁剪
   */
  getBase64(src, { width, height, x, y }) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // 允许跨域
      img.onload = () => {
        const canvas = $('<canvas width="' + width + '" height="' + height + '"></canvas>')[0];
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
      img.onerror = err => {
        console.error('图片转base64失败！');
        reject(err);
      };
      img.src = src + '?t=' + this.randomID();
    });
  }

  /**
   * @desc 将对象数组转换为对象
   * @param {*} arr 要处理的对象数组
   * @param {boolean} cover 是否覆盖，默认false
   */
  arrayToObject(arr, cover = false) {
    const result = {};
    arr.forEach(item => {
      Object.keys(item).forEach(key => {
        const value = item[key];
        // 如果允许覆盖，直接设置值，否则，检查没有设置过该属性
        if (cover || !result.hasOwnProperty(key)) {
          result[key] = value;
        }
      });
    });
    return result;
  }

  /**
   * @desc 判断是否是空，null, undefined, '', 不包含0
   * @param {*} value
   */
  isEmpty(value) {
    if (value === null || value === undefined || value === '') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @desc 替换背景字符串中的图片地址
   * @param {string} 背景图url，eg: url('http://xxx.jpg')
   */
  getBackGroundImageUrl(url = '') {
    url = url.replace(/url\((.*)\)/, '$1');
    return url.replace(/["']/g, '');
  }

  /**
   * @desc 图片预加载
   * @param 预加载src
   */
  imgLazy(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = function() {
        resolve(img);
      };
      img.onerror = function() {
        console.error('图片加载失败', null);
        reject(null);
      };
    });
  }

  /**
   * @desc 编码
   * @param {string} code 需要编码的代码
   */
  compile(code) {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
  }

  /**
   * @desc 解码
   * @param {string} code 需要解码的代码
   */
  uncompile(code) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
  }
}

export const util = new Util();
