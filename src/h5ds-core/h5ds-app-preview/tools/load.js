/**
 * @desc 加载资源的方法
 * 使用方法：
 *
 * // 加载多个资源，支持（js, 图片，音频，css）
 * var loadsource = new LoadSource();
 *
 * // 批量加载资源
 * loadsource.setSource([]); // 数据分类重组
 * loadsource.load(); // 开始加载数据
 *
 * // 支持事件
 * loadsource.on('progress', (d) => {}) // 加载进度
 * loadsource.on('complete', (d) => {}) // 加载进度
 * loadsource.on('error', (d) => {}) // 加载进度
 * loadsource.on('success', (d) => {}) // 加载进度
 *
 * // 单独使用
 * loadsource.loadLazy(src);
 * loadsource.soundLazy(src);
 * loadsource.jsLazy(src);
 * loadsource.cssLazy(src);
 *
 */
export class LoadSource {
  constructor(sources) {
    this.progress = null;
    if (sources) {
      this.manifest = this.setSource(sources);
    }
    this.sources = sources;
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
        console.error('图片加载失败', img);
        reject(img);
      };
    });
  }

  /**
   * @desc 音乐预加载
   */
  soundLazy(src) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(src);
      audio.onloadedmetadata = () => {
        resolve(audio);
      };
      audio.onerror = () => {
        console.error('sound加载失败', src);
        reject(src);
      };
      audio.src = src;
    });
  }

  /**
   * @desc js预加载，异步加载js
   */
  jsLazy(src, id) {
    return new Promise((resolve, reject) => {
      // 加载之前先判断是否存在，如果存在，就不加载了
      if (id && document.getElementById(id)) {
        console.log('已经存在js资源', src, ' id:', id);
        resolve(true);
      } else {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = 'async';
        script.id = id;
        script.src = src; // 防止缓存数据
        document.head.appendChild(script);
        script.onload = () => {
          resolve(script);
        };
        script.onerror = () => {
          console.error('js加载失败', src);
          reject(src);
        };
      }
    });
  }

  /**
   * 动态加载CSS,加载前要先判断下，是否存在
   * @param {string} url 样式地址
   */
  async cssLazy(url, id) {
    if (!url) {
      return false;
    }
    // 加载之前先判断是否存在，如果存在，就不加载了
    if (id && document.getElementById(id)) {
      console.log('已经存在css资源', url, ' id:', id);
      return;
    }
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = id;
    link.href = url;
    head.appendChild(link);
  }

  /**
   * @desc 开始执行载入
   * @return promise
   */
  load() {
    const sources = this.manifest;
    return new Promise(async (resolve, reject) => {
      const error = [];
      const success = [];
      for (let i = 0; i < sources.length; i++) {
        let { src, id, type } = sources[i];
        switch (type) {
          case 'image':
            await this.imgLazy(src)
              .then(() => {
                success.push({ src, id, type });
                this.progress && this.progress({ src, id, type, success: true, loaded: (i + 1) / sources.length });
              })
              .catch(() => {
                error.push({ src, id, type });
                this.progress && this.progress({ src, id, type, success: false, loaded: (i + 1) / sources.length });
              });
            break;
          case 'js':
            await this.jsLazy(src, id)
              .then(() => {
                success.push({ src, id, type });
                this.progress && this.progress({ src, id, type, success: true, loaded: (i + 1) / sources.length });
              })
              .catch(() => {
                error.push({ src, id, type });
                this.progress && this.progress({ src, id, type, success: false, loaded: (i + 1) / sources.length });
              });
            break;
          case 'sound':
            await this.soundLazy(src)
              .then(() => {
                success.push({ src, id, type });
                this.progress && this.progress({ src, id, type, success: true, loaded: (i + 1) / sources.length });
              })
              .catch(() => {
                error.push({ src, id, type });
                this.progress && this.progress({ src, id, type, success: false, loaded: (i + 1) / sources.length });
              });
            break;
          case 'css':
            this.cssLazy(src, id);
            break;
        }
      }
      this.complete && this.complete({ error, success });
      if (success.length === sources.length) {
        this.success && this.success();
        resolve({ error, success });
      } else {
        this.error && this.error();
        reject({ error, success });
      }
    });
  }

  /**
   * @desc 事件绑定
   */
  on(eventName, func) {
    switch (eventName) {
      case 'progress':
        this.progress = func;
        break;
      case 'error':
        this.error = func;
        break;
      case 'complete':
        this.complete = func;
        break;
      case 'success':
        this.success = func;
        break;
    }
  }

  /**
   * @desc 设置需要载入的数据
   */
  setSource(sources) {
    if (!sources) {
      return;
    }
    // const temp = util.randomID();
    const manifest = sources.map((d, i) => {
      let type = '*';
      let suffix = d.replace(/.+\.(.+)/, '$1');
      if (['jpg', 'gif', 'png', 'jpeg'].indexOf(suffix) !== -1) {
        type = 'image';
      } else if (['mp3', 'wav', 'ogg', 'acc', 'webm'].indexOf(suffix) !== -1) {
        type = 'sound';
      } else if (['js', 'es'].indexOf(suffix) !== -1) {
        type = 'js';
      } else if (['css'].indexOf(suffix) !== -1) {
        type = 'css';
      }
      return {
        src: d,
        id: 'source_' + i,
        type
      };
    });
    this.manifest = manifest;
    return manifest;
  }
}
